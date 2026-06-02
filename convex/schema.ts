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
    roadmapId: v.optional(v.id("userRoadmaps")),
    startTime: v.number(),
    endTime: v.number(),
    duration: v.number(),
    sessionType: v.string(),
    topicName: v.optional(v.string()), // Added for granular tracking
  }).index("by_user", ["userId"]),

  activities: defineTable({
    userId: v.id("users"),
    type: v.optional(v.string()),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    // Legacy fields to allow schema to pass validation
    action: v.optional(v.string()),
    details: v.optional(v.string()),
    timestamp: v.optional(v.number()),
  }).index("by_user", ["userId"]),

  achievements: defineTable({
    title: v.string(),
    description: v.string(),
    type: v.string(),
    threshold: v.number(),
    icon: v.optional(v.string()),
  }),

  userAchievements: defineTable({
    userId: v.id("users"),
    achievementId: v.id("achievements"),
    unlockedAt: v.number(),
  }).index("by_user", ["userId"]).index("by_user_achievement", ["userId", "achievementId"]),

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
  }).index("by_studyTime", ["studyTime"]).index("by_user", ["userId"]),
  friendRequests: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),
    status: v.string(), // pending, accepted, rejected
    createdAt: v.number(),
  }).index("by_receiver", ["receiverId"]).index("by_sender", ["senderId"]),

  friends: defineTable({
    userId: v.id("users"),
    friendId: v.id("users"),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  sharedRoadmaps: defineTable({
    roadmapId: v.id("userRoadmaps"),
    ownerId: v.id("users"),
    shareCode: v.string(),
    isPublic: v.boolean(),
    createdAt: v.number(),
  }).index("by_shareCode", ["shareCode"]).index("by_roadmapId", ["roadmapId"]),

  roadmapMembers: defineTable({
    roadmapId: v.id("userRoadmaps"),
    userId: v.id("users"),
    role: v.string(), // owner, editor, viewer
    joinedAt: v.number(),
  }).index("by_roadmapId", ["roadmapId"]).index("by_userId", ["userId"]),

  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(),
    message: v.string(),
    read: v.boolean(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  topicVerifications: defineTable({
    userId: v.id("users"),
    roadmapId: v.id("userRoadmaps"),
    topicName: v.string(),
    submissionType: v.string(), // "github", "notes", "quiz"
    submissionContent: v.string(),
    verifiedAt: v.number(),
  }).index("by_user", ["userId"]).index("by_roadmapId", ["roadmapId"]),

  mockTests: defineTable({
    userId: v.id("users"),
    testName: v.string(),
    score: v.number(),
    maxScore: v.number(),
    takenAt: v.number(),
  }).index("by_user", ["userId"]),
});
