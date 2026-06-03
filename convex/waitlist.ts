import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const join = mutation({
  args: {
    featureName: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("waitlist", {
      featureName: args.featureName,
      name: args.name,
      email: args.email,
      createdAt: Date.now(),
    });
  },
});

export const getWaitlist = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("waitlist").order("desc").collect();
  }
});
