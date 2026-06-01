import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  
  careerPaths: defineTable({
    title: v.string(),
    difficulty: v.string(),
    duration: v.string(),
    description: v.string(),
    roadmapSteps: v.array(v.object({
      phase: v.string(),
      title: v.string(),
      description: v.string()
    })),
  }),
  
  userRoadmaps: defineTable({
    userId: v.id("users"),
    careerPathId: v.id("careerPaths"),
    progress: v.number(),
    completedSteps: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
