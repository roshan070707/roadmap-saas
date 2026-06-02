import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getRecentActivities = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const activities = await ctx.db
      .query("activities")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(15);

    return activities;
  }
});
