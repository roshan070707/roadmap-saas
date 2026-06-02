import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserNotifications = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("notifications")
      .withIndex("by_user", q => q.eq("userId", userId))
      .order("desc")
      .take(20);
  }
});

export const markAsRead = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const notification = await ctx.db.get(args.notificationId);
    if (notification && notification.userId === userId) {
      await ctx.db.patch(args.notificationId, { read: true });
    }
  }
});

export const markAllAsRead = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_user", q => q.eq("userId", userId))
      .filter(q => q.eq(q.field("read"), false))
      .collect();

    for (const notification of unread) {
      await ctx.db.patch(notification._id, { read: true });
    }
  }
});
