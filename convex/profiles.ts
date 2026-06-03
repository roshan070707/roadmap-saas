import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserProfile = query({
  args: { 
    identifier: v.string()
  },
  handler: async (ctx, args) => {
    let targetUserId = null;

    // First try to match by username
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_username", q => q.eq("username", args.identifier))
      .first();
    
    if (profile) {
      targetUserId = profile.userId;
    } else {
      // If no profile found by username, assume identifier is userId
      // Check if it's a valid ID format roughly (let ctx.db.get validate it, but we can't catch easily in query)
      // Convex db.get requires a valid ID. We can use ctx.db.normalizeId("users", args.identifier)
      targetUserId = ctx.db.normalizeId("users", args.identifier);
    }

    if (!targetUserId) return null;

    const user = await ctx.db.get(targetUserId);
    if (!user) return null;

    const profileData = await ctx.db
      .query("profiles")
      .withIndex("by_user", q => q.eq("userId", targetUserId))
      .first();

    const stats = await ctx.db
      .query("leaderboardStats")
      .withIndex("by_user", q => q.eq("userId", targetUserId))
      .first();

    const roadmaps = await ctx.db
      .query("userRoadmaps")
      .withIndex("by_user", q => q.eq("userId", targetUserId))
      .collect();

    const achievements = await ctx.db
      .query("userAchievements")
      .withIndex("by_user", q => q.eq("userId", targetUserId))
      .collect();

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_user", q => q.eq("userId", targetUserId))
      .collect();

    const populatedAchievements = await Promise.all(
      achievements.map(async (a) => {
        const detail = await ctx.db.get(a.achievementId);
        return { ...a, detail };
      })
    );

    return {
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        _creationTime: user._creationTime,
      },
      profile: profileData,
      stats: {
        studyTime: stats?.studyTime || 0,
        streak: stats?.streak || 0,
        roadmapCompletion: stats?.roadmapCompletion || 0,
        roadmapsCount: roadmaps.length
      },
      achievements: populatedAchievements,
      projects
    };
  }
});

export const updateProfile = mutation({
  args: {
    username: v.optional(v.string()),
    bio: v.optional(v.string()),
    location: v.optional(v.string()),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    portfolioUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if username is taken
    if (args.username) {
      const existing = await ctx.db
        .query("profiles")
        .withIndex("by_username", q => q.eq("username", args.username))
        .first();
      if (existing && existing.userId !== userId) {
        throw new Error("Username already taken");
      }
    }

    const currentProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user", q => q.eq("userId", userId))
      .first();

    if (currentProfile) {
      await ctx.db.patch(currentProfile._id, args);
    } else {
      await ctx.db.insert("profiles", {
        userId,
        ...args
      });
    }
  }
});
