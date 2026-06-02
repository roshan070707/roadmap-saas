import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserProfile = query({
  args: { profileId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.profileId);
    if (!user) return null;

    const stats = await ctx.db
      .query("leaderboardStats")
      .withIndex("by_user", q => q.eq("userId", args.profileId))
      .first();

    const roadmaps = await ctx.db
      .query("userRoadmaps")
      .withIndex("by_user", q => q.eq("userId", args.profileId))
      .collect();

    const achievements = await ctx.db
      .query("userAchievements")
      .withIndex("by_user", q => q.eq("userId", args.profileId))
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
      stats: {
        studyTime: stats?.studyTime || 0,
        streak: stats?.streak || 0,
        roadmapCompletion: stats?.roadmapCompletion || 0,
        roadmapsCount: roadmaps.length
      },
      achievements: populatedAchievements
    };
  }
});
