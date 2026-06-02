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
  }
});

export const getCommunityPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("communityPosts")
      .order("desc")
      .take(50);
      
    return await Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db.get(post.userId);
        return {
          ...post,
          user: user?.name || "Unknown User",
          avatar: user?.name?.charAt(0) || "U",
          role: "Learner",
        };
      })
    );
  }
});
