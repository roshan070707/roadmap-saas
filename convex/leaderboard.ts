import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import type { Id } from "./_generated/dataModel";

export async function syncLeaderboardStats(ctx: any, userId: Id<"users">) {
  const sessions = await ctx.db
    .query("studySessions")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .collect();

  const roadmaps = await ctx.db
    .query("userRoadmaps")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .collect();

  let totalTime = 0;
  for (const s of sessions) {
    totalTime += s.duration;
  }

  let totalTopicsCompleted = 0;
  for (const r of roadmaps) {
    totalTopicsCompleted += (r.completedTopics?.length || 0);
  }

  // Calculate streak
  let currentStreak = 0;
  if (sessions.length > 0) {
    const sortedSessions = sessions.sort((a: any, b: any) => b.endTime - a.endTime);
    let streakDays = 0;
    let lastDate = new Date();
    lastDate.setHours(0, 0, 0, 0);
    const msPerDay = 24 * 60 * 60 * 1000;

    for (const session of sortedSessions) {
      const sessionDate = new Date(session.endTime);
      sessionDate.setHours(0, 0, 0, 0);
      const diffDays = Math.round((lastDate.getTime() - sessionDate.getTime()) / msPerDay);

      if (diffDays === 0 || diffDays === 1) {
        if (diffDays === 1 || streakDays === 0) {
          streakDays++;
        }
        lastDate = sessionDate;
      } else if (diffDays > 1) {
        break; 
      }
    }
    currentStreak = streakDays;
  }

  const existingStat = await ctx.db
    .query("leaderboardStats")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .first();

  if (existingStat) {
    await ctx.db.patch(existingStat._id, {
      studyTime: totalTime,
      roadmapCompletion: totalTopicsCompleted,
      streak: currentStreak,
      sessions: sessions.length,
      lastUpdated: Date.now()
    });
  } else {
    await ctx.db.insert("leaderboardStats", {
      userId,
      studyTime: totalTime,
      roadmapCompletion: totalTopicsCompleted,
      streak: currentStreak,
      sessions: sessions.length,
      lastUpdated: Date.now()
    });
  }
}

export const getGlobalLeaderboard = query({
  args: { metric: v.string() }, // studyTime, streak, roadmapCompletion
  handler: async (ctx, args) => {
    // Convex doesn't support dynamic index sorting easily without multiple indexes,
    // For small apps, we can fetch top 50 by studyTime or fetch all and sort.
    const allStats = await ctx.db.query("leaderboardStats").collect();
    
    let sorted = allStats;
    if (args.metric === "streak") {
      sorted = allStats.sort((a, b) => b.streak - a.streak);
    } else if (args.metric === "roadmapCompletion") {
      sorted = allStats.sort((a, b) => b.roadmapCompletion - a.roadmapCompletion);
    } else if (args.metric === "reputation") {
      sorted = allStats.sort((a, b) => (b.reputation || 0) - (a.reputation || 0));
    } else {
      sorted = allStats.sort((a, b) => b.studyTime - a.studyTime);
    }

    const top50 = sorted.slice(0, 50);

    return await Promise.all(
      top50.map(async (stat) => {
        const user = await ctx.db.get(stat.userId);
        return { ...stat, user };
      })
    );
  }
});

export const getFriendsLeaderboard = query({
  args: { metric: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const friendships = await ctx.db
      .query("friends")
      .withIndex("by_user", q => q.eq("userId", userId))
      .collect();

    const friendIds = friendships.map(f => f.friendId);
    friendIds.push(userId); // include self

    const allStats = await ctx.db.query("leaderboardStats").collect();
    const friendsStats = allStats.filter(stat => friendIds.includes(stat.userId));

    let sorted = friendsStats;
    if (args.metric === "streak") {
      sorted = friendsStats.sort((a, b) => b.streak - a.streak);
    } else if (args.metric === "roadmapCompletion") {
      sorted = friendsStats.sort((a, b) => b.roadmapCompletion - a.roadmapCompletion);
    } else if (args.metric === "reputation") {
      sorted = friendsStats.sort((a, b) => (b.reputation || 0) - (a.reputation || 0));
    } else {
      sorted = friendsStats.sort((a, b) => b.studyTime - a.studyTime);
    }

    return await Promise.all(
      sorted.map(async (stat) => {
        const user = await ctx.db.get(stat.userId);
        return { ...stat, user };
      })
    );
  }
});
