import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getProjects = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .collect();
  }
});

export const addProject = mutation({
  args: {
    roadmapId: v.optional(v.id("userRoadmaps")),
    topicName: v.optional(v.string()),
    title: v.string(),
    description: v.string(),
    githubUrl: v.optional(v.string()),
    liveDemoUrl: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("projects", {
      userId,
      ...args,
      createdAt: Date.now(),
    });
  }
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.storage.generateUploadUrl();
  }
});

export const deleteProject = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== userId) {
      throw new Error("Unauthorized");
    }

    if (project.storageId) {
      await ctx.storage.delete(project.storageId);
    }

    await ctx.db.delete(args.projectId);
  }
});
