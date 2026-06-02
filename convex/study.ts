import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { checkAndUnlockAchievements } from "./achievements";
import { syncLeaderboardStats } from "./leaderboard";

export const saveSession = mutation({
  args: {
    roadmapId: v.optional(v.id("userRoadmaps")),
    startTime: v.number(),
    endTime: v.number(),
    duration: v.number(),
    sessionType: v.string(),
    topicName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.insert("studySessions", {
      userId,
      roadmapId: args.roadmapId,
      startTime: args.startTime,
      endTime: args.endTime,
      duration: args.duration,
      sessionType: args.sessionType,
      topicName: args.topicName,
    });

    await ctx.db.insert("activities", {
      userId,
      type: "Completed Study Session",
      title: "Completed a Study Session",
      description: `Studied for ${args.duration} minutes (${args.sessionType})`,
      createdAt: Date.now()
    });

    await checkAndUnlockAchievements(ctx, userId);
    await syncLeaderboardStats(ctx, userId);
  }
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    let totalTime = 0;
    let dailyTime = 0;
    let weeklyTime = 0;
    let monthlyTime = 0;

    for (const session of sessions) {
      totalTime += session.duration;
      
      if (now - session.endTime < oneDay) {
        dailyTime += session.duration;
      }
      
      if (now - session.endTime < oneWeek) {
        weeklyTime += session.duration;
      }

      if (now - session.endTime < oneMonth) {
        monthlyTime += session.duration;
      }
    }

    // Calculate streak
    let streak = 0;
    if (sessions.length > 0) {
      const sortedSessions = sessions.sort((a, b) => b.endTime - a.endTime);
      let streakDays = 0;
      let lastDate = new Date();
      lastDate.setHours(0, 0, 0, 0);

      for (const session of sortedSessions) {
        const sessionDate = new Date(session.endTime);
        sessionDate.setHours(0, 0, 0, 0);
        const diffDays = Math.round((lastDate.getTime() - sessionDate.getTime()) / oneDay);

        if (diffDays === 0 || diffDays === 1) {
          if (diffDays === 1 || streakDays === 0) {
            streakDays++;
          }
          lastDate = sessionDate;
        } else if (diffDays > 1) {
          break; // Streak broken
        }
      }
      streak = streakDays;
    }

    return {
      totalTime,
      dailyTime,
      weeklyTime,
      monthlyTime,
      sessionsCount: sessions.length,
      streak
    };
  }
});

export const getTimeByTopic = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const topicMap: Record<string, number> = {};

    for (const session of sessions) {
      if (session.topicName) {
        topicMap[session.topicName] = (topicMap[session.topicName] || 0) + session.duration;
      } else {
        topicMap["General/Unknown"] = (topicMap["General/Unknown"] || 0) + session.duration;
      }
    }

    return Object.entries(topicMap)
      .map(([topic, duration]) => ({ topic, duration }))
      .sort((a, b) => b.duration - a.duration);
  }
});
