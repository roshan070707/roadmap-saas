import { mutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export async function checkAndUnlockAchievements(
  ctx: any,
  userId: Id<"users">
) {
  // 1. Get user's completed topics across all roadmaps
  const roadmaps = await ctx.db
    .query("userRoadmaps")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .collect();

  let totalCompletedTopics = 0;
  for (const r of roadmaps) {
    if (r.completedTopics) {
      totalCompletedTopics += r.completedTopics.length;
    }
  }

  // 2. Get user's study streak (we calculate this dynamically based on studySessions)
  const sessions = await ctx.db
    .query("studySessions")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .collect();

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

  const conditions = {
    'topics_completed': totalCompletedTopics,
    'streak': currentStreak,
  };

  const achievements = await ctx.db.query("achievements").collect();
  
  const unlocked = await ctx.db
    .query("userAchievements")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .collect();
  const unlockedIds = new Set(unlocked.map((u: any) => u.achievementId.toString()));

  for (const achievement of achievements) {
    if (!unlockedIds.has(achievement._id.toString())) {
      const currentValue = conditions[achievement.type as keyof typeof conditions] || 0;
      
      if (currentValue >= achievement.threshold) {
        await ctx.db.insert("userAchievements", {
          userId,
          achievementId: achievement._id,
          unlockedAt: Date.now()
        });

        await ctx.db.insert("activities", {
          userId,
          type: "Achievement Unlocked",
          title: "Achievement Unlocked!",
          description: `You unlocked: ${achievement.title}`,
          createdAt: Date.now()
        });
      }
    }
  }
}

export const seedAchievements = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("achievements").collect();
    if (existing.length > 0) return;

    const initialAchievements = [
      { title: "First Steps", description: "First Topic Completed", type: "topics_completed", threshold: 1, icon: "Star" },
      { title: "Explorer", description: "10 Topics Completed", type: "topics_completed", threshold: 10, icon: "Compass" },
      { title: "Master", description: "50 Topics Completed", type: "topics_completed", threshold: 50, icon: "Crown" },
      { title: "Dedicated", description: "7 Day Streak", type: "streak", threshold: 7, icon: "Flame" },
      { title: "Unstoppable", description: "30 Day Streak", type: "streak", threshold: 30, icon: "Zap" },
    ];

    for (const ach of initialAchievements) {
      await ctx.db.insert("achievements", ach);
    }
  }
});
