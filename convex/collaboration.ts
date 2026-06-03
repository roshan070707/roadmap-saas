import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

function generateShareCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const createShareCode = mutation({
  args: { roadmapId: v.id("userRoadmaps") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const roadmap = await ctx.db.get(args.roadmapId);
    if (!roadmap || roadmap.userId !== userId) throw new Error("Unauthorized");

    // Check if already shared
    const existing = await ctx.db
      .query("sharedRoadmaps")
      .withIndex("by_roadmapId", q => q.eq("roadmapId", args.roadmapId))
      .first();

    if (existing) {
      return existing.shareCode;
    }

    const shareCode = generateShareCode();

    await ctx.db.insert("sharedRoadmaps", {
      roadmapId: args.roadmapId,
      ownerId: userId,
      shareCode,
      isPublic: true,
      createdAt: Date.now()
    });

    await ctx.db.insert("roadmapMembers", {
      roadmapId: args.roadmapId,
      userId,
      role: "owner",
      joinedAt: Date.now()
    });

    await ctx.db.insert("activities", {
      userId,
      type: "Roadmap Shared",
      title: "Shared a Roadmap",
      description: `Generated a share code for roadmap`,
      createdAt: Date.now()
    });

    return shareCode;
  }
});

export const joinRoadmap = mutation({
  args: { shareCode: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const shared = await ctx.db
      .query("sharedRoadmaps")
      .withIndex("by_shareCode", q => q.eq("shareCode", args.shareCode))
      .first();

    if (!shared) throw new Error("Invalid share code");

    if (shared.ownerId === userId) {
      throw new Error("You already own this roadmap");
    }

    // Check if already joined
    const existingMember = await ctx.db
      .query("roadmapMembers")
      .withIndex("by_roadmapId", q => q.eq("roadmapId", shared.roadmapId))
      .filter(q => q.eq(q.field("userId"), userId))
      .first();

    if (existingMember) {
      throw new Error("Already a member of this roadmap");
    }

    await ctx.db.insert("roadmapMembers", {
      roadmapId: shared.roadmapId,
      userId,
      role: "viewer",
      joinedAt: Date.now()
    });

    const joiner = await ctx.db.get(userId);

    // Notify Owner
    await ctx.db.insert("notifications", {
      userId: shared.ownerId,
      type: "Roadmap Invite Accepted",
      message: `${joiner?.name || 'Someone'} joined your roadmap!`,
      read: false,
      metadata: { roadmapId: shared.roadmapId, joinerId: userId },
      createdAt: Date.now()
    });
  }
});

export const getSharedRoadmaps = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const memberships = await ctx.db
      .query("roadmapMembers")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .collect();

    return await Promise.all(
      memberships.map(async (m) => {
        const roadmap = await ctx.db.get(m.roadmapId);
        const careerPath = roadmap ? await ctx.db.get(roadmap.careerPathId) : null;
        return { ...m, roadmap: { ...roadmap, careerPath } };
      })
    );
  }
});

export const getRoadmapMembers = query({
  args: { roadmapId: v.id("userRoadmaps") },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("roadmapMembers")
      .withIndex("by_roadmapId", q => q.eq("roadmapId", args.roadmapId))
      .collect();

    return await Promise.all(
      memberships.map(async (m) => {
        const user = await ctx.db.get(m.userId);
        return { ...m, user };
      })
    );
  }
});

export async function incrementReputation(ctx: any, userId: any, amount: number) {
  const stats = await ctx.db
    .query("leaderboardStats")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .first();
  
  if (stats) {
    await ctx.db.patch(stats._id, {
      reputation: (stats.reputation || 0) + amount
    });
  } else {
    // Initialize if doesn't exist
    await ctx.db.insert("leaderboardStats", {
      userId,
      studyTime: 0,
      roadmapCompletion: 0,
      streak: 0,
      sessions: 0,
      lastUpdated: Date.now(),
      reputation: amount > 0 ? amount : 0,
    });
  }
}

export const createCommunityPost = mutation({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.insert("communityPosts", {
      userId,
      content: args.content,
      likes: 0,
      timestamp: Date.now()
    });

    await incrementReputation(ctx, userId, 2); // +2 for post created
  }
});

export const editCommunityPost = mutation({
  args: { postId: v.id("communityPosts"), content: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const post = await ctx.db.get(args.postId);
    if (!post || post.userId !== userId) throw new Error("Unauthorized");

    await ctx.db.patch(args.postId, {
      content: args.content,
      updatedAt: Date.now()
    });
  }
});

export const deleteCommunityPost = mutation({
  args: { postId: v.id("communityPosts") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const post = await ctx.db.get(args.postId);
    if (!post || post.userId !== userId) throw new Error("Unauthorized");

    // Clean up likes and replies
    const likes = await ctx.db.query("postLikes").withIndex("by_post", q => q.eq("postId", args.postId)).collect();
    for (const like of likes) await ctx.db.delete(like._id);

    const replies = await ctx.db.query("postReplies").withIndex("by_post", q => q.eq("postId", args.postId)).collect();
    for (const reply of replies) await ctx.db.delete(reply._id);

    await ctx.db.delete(args.postId);
  }
});

export const likePost = mutation({
  args: { postId: v.id("communityPosts") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("postLikes")
      .withIndex("by_user_post", q => q.eq("userId", userId).eq("postId", args.postId))
      .first();

    if (existing) return; // Already liked

    await ctx.db.insert("postLikes", {
      postId: args.postId,
      userId
    });

    const post = await ctx.db.get(args.postId);
    if (post) {
      await ctx.db.patch(args.postId, { likes: post.likes + 1 });
      if (post.userId !== userId) {
        await incrementReputation(ctx, post.userId, 1); // +1 for like received
      }
    }
  }
});

export const unlikePost = mutation({
  args: { postId: v.id("communityPosts") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("postLikes")
      .withIndex("by_user_post", q => q.eq("userId", userId).eq("postId", args.postId))
      .first();

    if (!existing) return;

    await ctx.db.delete(existing._id);

    const post = await ctx.db.get(args.postId);
    if (post) {
      await ctx.db.patch(args.postId, { likes: Math.max(0, post.likes - 1) });
      if (post.userId !== userId) {
        await incrementReputation(ctx, post.userId, -1);
      }
    }
  }
});

export const replyToPost = mutation({
  args: { postId: v.id("communityPosts"), content: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.insert("postReplies", {
      postId: args.postId,
      userId,
      content: args.content,
      timestamp: Date.now()
    });

    await incrementReputation(ctx, userId, 1); // +1 for reply
  }
});

export const getCommunityPosts = query({
  args: {},
  handler: async (ctx) => {
    const currentUserId = await getAuthUserId(ctx);
    
    const posts = await ctx.db
      .query("communityPosts")
      .order("desc")
      .take(50);
      
    return await Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db.get(post.userId);
        
        let hasLiked = false;
        if (currentUserId) {
          const like = await ctx.db
            .query("postLikes")
            .withIndex("by_user_post", q => q.eq("userId", currentUserId).eq("postId", post._id))
            .first();
          hasLiked = !!like;
        }

        const rawReplies = await ctx.db
          .query("postReplies")
          .withIndex("by_post", q => q.eq("postId", post._id))
          .collect();

        const replies = await Promise.all(
          rawReplies.map(async (reply) => {
            const replyUser = await ctx.db.get(reply.userId);
            return {
              ...reply,
              user: replyUser?.name || "Unknown",
              avatar: replyUser?.name?.charAt(0) || "U"
            };
          })
        );

        return {
          ...post,
          user: user?.name || "Unknown User",
          avatar: user?.name?.charAt(0) || "U",
          role: "Learner",
          hasLiked,
          replies,
          isOwner: currentUserId === post.userId,
          ownerId: post.userId
        };
      })
    );
  }
});

export const reportPost = mutation({
  args: { postId: v.id("communityPosts"), reason: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existingReport = await ctx.db
      .query("reportedPosts")
      .withIndex("by_post", q => q.eq("postId", args.postId))
      .filter(q => q.eq(q.field("reporterId"), userId))
      .first();

    if (existingReport) return; // Already reported

    await ctx.db.insert("reportedPosts", {
      postId: args.postId,
      reporterId: userId,
      reason: args.reason,
      timestamp: Date.now()
    });
  }
});
