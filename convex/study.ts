import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const saveSession = mutation({
  args: {
    mode: v.string(),
    durationMinutes: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.insert("studySessions", {
      userId,
      mode: args.mode,
      durationMinutes: args.durationMinutes,
      completedAt: Date.now(),
    });
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

    let totalTime = 0;
    let dailyTime = 0;
    let weeklyTime = 0;

    for (const session of sessions) {
      totalTime += session.durationMinutes;
      
      if (now - session.completedAt < oneDay) {
        dailyTime += session.durationMinutes;
      }
      
      if (now - session.completedAt < oneWeek) {
        weeklyTime += session.durationMinutes;
      }
    }

    return {
      totalTime,
      dailyTime,
      weeklyTime,
      sessionsCount: sessions.length
    };
  }
});
