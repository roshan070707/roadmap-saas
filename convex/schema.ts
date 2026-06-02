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
    userId: v.optional(v.id("users")),
    roadmapSteps: v.array(v.object({
      phase: v.string(),
      title: v.string(),
      description: v.string(),
      duration: v.optional(v.string()),
      topics: v.optional(v.array(v.string())),
      resources: v.optional(v.array(v.object({
        name: v.string(),
        type: v.string(),
        url: v.optional(v.string())
      })))
    })),
  }),
  
  userRoadmaps: defineTable({
    userId: v.id("users"),
    careerPathId: v.id("careerPaths"),
    progress: v.number(),
    completedTopics: v.optional(v.array(v.string())),
    completedSteps: v.optional(v.array(v.string())),
    isPublic: v.optional(v.boolean()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  studySessions: defineTable({
    userId: v.id("users"),
    mode: v.string(), // pomodoro, deepWork, custom
    durationMinutes: v.number(),
    completedAt: v.number(),
  }).index("by_user", ["userId"]),

  activities: defineTable({
    userId: v.id("users"),
    action: v.string(),
    details: v.string(),
    timestamp: v.number(),
  }).index("by_user", ["userId"]),

  communityPosts: defineTable({
    userId: v.id("users"),
    content: v.string(),
    likes: v.number(),
    timestamp: v.number(),
  }).index("by_user", ["userId"]),

  invites: defineTable({
    inviterId: v.id("users"),
    code: v.string(),
    email: v.optional(v.string()),
    status: v.string(),
  }).index("by_code", ["code"]),

  leaderboardStats: defineTable({
    userId: v.id("users"),
    studyTime: v.number(),
    roadmapCompletion: v.number(),
    streak: v.number(),
    sessions: v.number(),
    lastUpdated: v.number(),
  }).index("by_studyTime", ["studyTime"]),
});
