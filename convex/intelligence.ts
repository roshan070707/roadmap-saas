import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const NIMCET_SYLLABUS = [
  {
    phase: "Phase 1: Foundation",
    title: "Mathematics & Basic Logic",
    description: "Building the core mathematical foundation required for NIMCET.",
    duration: "1 Month",
    topics: ["Set Theory", "Algebra Basics", "Trigonometry Fundamentals", "Number Systems"],
    resources: [{ name: "NCERT Class 11 & 12 Math", type: "Book" }]
  },
  {
    phase: "Phase 2: Core Mathematics",
    title: "Calculus & Geometry",
    description: "Advanced topics carrying the highest weightage.",
    duration: "2 Months",
    topics: ["Differential Calculus", "Integral Calculus", "Coordinate Geometry", "Vectors"],
    resources: [{ name: "RD Sharma Objective", type: "Book" }]
  },
  {
    phase: "Phase 3: Aptitude & Computer",
    title: "Logical Reasoning & Computer Awareness",
    description: "Scoring sections to maximize your rank.",
    duration: "1.5 Months",
    topics: ["Puzzles & Seating Arrangement", "Syllogism", "Data Representation", "Boolean Algebra", "Computer Architecture"],
    resources: [{ name: "RS Aggarwal Reasoning", type: "Book" }]
  },
  {
    phase: "Phase 4: Revision & Mock Tests",
    title: "Full Syllabus Mocks",
    description: "Time management and exam temperament.",
    duration: "1 Month",
    topics: ["Previous Year Questions (2010-2025)", "Mock Test Analysis", "Speed Math", "Weakness Remediation"],
    resources: [{ name: "NIMCET PYQ Book", type: "Book" }]
  }
];

export const generateSmartRoadmap = mutation({
  args: {
    targetCareer: v.string(),
    degree: v.string(),
    semester: v.string(),
    skills: v.string(),
    studyHours: v.string(),
    examDate: v.optional(v.string()) // For NIMCET
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    let customSteps: any[] = [];
    let customTitle = args.targetCareer;
    let totalDurationMonths = 6;

    if (args.targetCareer === "MCA via NIMCET") {
      // Specialized NIMCET procedural generation
      customSteps = [...NIMCET_SYLLABUS];
      if (args.examDate) {
        // Calculate months till exam date
        const targetDate = new Date(args.examDate);
        const today = new Date();
        const diffTime = Math.abs(targetDate.getTime() - today.getTime());
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        totalDurationMonths = diffMonths > 0 ? diffMonths : 1;
        
        // Scale the durations to fit the months exactly
        const totalBaseMonths = 5.5; // From template
        const scaleFactor = totalDurationMonths / totalBaseMonths;
        
        customSteps = customSteps.map(step => {
          const baseDurationMatches = step.duration.match(/([\d.]+)/);
          if (baseDurationMatches) {
            const num = parseFloat(baseDurationMatches[1]);
            let newNum = (num * scaleFactor).toFixed(1);
            if (newNum.endsWith(".0")) newNum = newNum.slice(0, -2);
            return { ...step, duration: `${newNum} Month${newNum === "1" ? "" : "s"}` };
          }
          return step;
        });
      }
    } else {
      // Standard Roadmap lookup
      const paths = await ctx.db.query("careerPaths").filter(q => q.eq(q.field("title"), args.targetCareer)).collect();
      if (paths.length === 0) throw new Error("Base career path not found");
      const basePath = paths[0];
      
      customSteps = [...basePath.roadmapSteps];
      totalDurationMonths = parseInt(basePath.duration) || 6;

      // Intelligence: Skill Level Adaptation
      if (args.skills === "Absolute Beginner") {
        customSteps.unshift({
          phase: "Phase 0",
          title: "Absolute Fundamentals",
          description: "A gentle introduction to the very basics.",
          duration: "2 Weeks",
          topics: ["Computer Basics", "Internet Fundamentals", "Command Line 101", "How Code Works"],
          resources: [{ name: "Crash Course Computer Science", type: "Video" }]
        });
        totalDurationMonths += 1;
      }

      // Intelligence: Study Hours Scaling
      let multiplier = 1;
      if (args.studyHours === "1 - 2 Hours") multiplier = 1.5;
      else if (args.studyHours === "5 - 6 Hours") multiplier = 0.75;
      else if (args.studyHours === "8+ Hours") multiplier = 0.5;

      totalDurationMonths = Math.ceil(totalDurationMonths * multiplier);

      customSteps = customSteps.map((step, index) => {
        const matches = step.duration.match(/(\d+)/);
        if (matches) {
          const weeks = parseInt(matches[1]);
          const newWeeks = Math.ceil(weeks * multiplier);
          return { ...step, phase: `Phase ${index + 1}`, duration: `${newWeeks} Week${newWeeks > 1 ? "s" : ""}` };
        }
        return { ...step, phase: `Phase ${index + 1}` };
      });
    }

    // Create a new customized career path for this user
    const customPathId = await ctx.db.insert("careerPaths", {
      title: customTitle,
      difficulty: args.skills === "Absolute Beginner" ? "Beginner Friendly" : "Adaptive",
      duration: `${totalDurationMonths} Months`,
      description: `Intelligently scaled roadmap based on ${args.studyHours}/day.`,
      userId: userId,
      roadmapSteps: customSteps,
    });

    const roadmapId = await ctx.db.insert("userRoadmaps", {
      userId,
      careerPathId: customPathId,
      progress: 0,
      completedTopics: [],
      isPublic: false,
      createdAt: Date.now(),
    });

    await ctx.db.insert("activities", {
      userId,
      type: "Created Roadmap",
      title: "Generated Smart Roadmap",
      description: args.targetCareer,
      createdAt: Date.now()
    });

    return roadmapId;
  }
});

export const getDashboardIntelligence = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    // Get Active Roadmaps
    const roadmaps = await ctx.db
      .query("userRoadmaps")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Determine "Today's Tasks" (Smart Study Planner)
    let dailyPlan: { roadmapId: string; roadmapTitle: string; topics: string[] } | null = null;
    
    if (roadmaps.length > 0) {
      // Find the most recently active or lowest progress roadmap
      const activeRoadmap = roadmaps.find(r => r.progress < 100) || roadmaps[0];
      const careerPath = await ctx.db.get(activeRoadmap.careerPathId);
      
      if (careerPath && activeRoadmap.progress < 100) {
        const completed = activeRoadmap.completedTopics || [];
        let upcomingTopics: string[] = [];
        
        for (const step of careerPath.roadmapSteps) {
          if (step.topics) {
            for (const topic of step.topics) {
              if (!completed.includes(topic)) {
                upcomingTopics.push(topic);
                if (upcomingTopics.length >= 2) break; // limit to 2 tasks for today
              }
            }
          }
          if (upcomingTopics.length >= 2) break;
        }

        if (upcomingTopics.length > 0) {
          dailyPlan = {
            roadmapId: activeRoadmap._id,
            roadmapTitle: careerPath.title,
            topics: upcomingTopics
          };
        }
      }
    }

    // Get Stats for Motivation & Health Score
    let streak = 0;
    
    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
      
    const sessionsCount = sessions.length;
    
    if (sessions.length > 0) {
      const sortedSessions = sessions.sort((a, b) => b.endTime - a.endTime);
      let streakDays = 0;
      let lastDate = new Date();
      lastDate.setHours(0, 0, 0, 0);

      for (const session of sortedSessions) {
        const sessionDate = new Date(session.endTime);
        sessionDate.setHours(0, 0, 0, 0);
        const diffDays = Math.round((lastDate.getTime() - sessionDate.getTime()) / (24 * 60 * 60 * 1000));

        if (diffDays === 0 || diffDays === 1) {
          if (diffDays === 1 || streakDays === 0) {
            streakDays++;
          }
          lastDate = sessionDate;
        } else if (diffDays > 1) {
          break; // Streak broken
        }
      }
      streak = streakDays;
    }

    // Calculate Motivation Message
    let motivationMessage = "Ready to start your journey?";
    let motivationType: 'streak_recovery' | 'ahead' | 'consistent' | 'neutral' = 'neutral';
    
    if (streak === 0 && sessionsCount > 0) {
      motivationMessage = "Just 15 minutes today will reignite your momentum.";
      motivationType = 'streak_recovery';
    } else if (streak >= 3) {
      motivationMessage = `You're on a ${streak}-day hot streak. You're building an incredible habit.`;
      motivationType = 'consistent';
    } else if (sessionsCount > 10) {
      motivationMessage = "You're consistently putting in the work. Keep trusting the process.";
      motivationType = 'ahead';
    }

    // Calculate Health Score (0-100)
    // Formula: Streak cap at 10 (* 4 = 40) + Sessions cap at 50 (* 1.2 = 60)
    let healthScore = Math.min(streak * 4, 40) + Math.min(sessionsCount * 1.2, 60);
    if (healthScore === 0 && sessionsCount > 0) healthScore = 20; // baseline if returning

    return {
      dailyPlan,
      motivation: { message: motivationMessage, type: motivationType },
      healthScore: Math.round(healthScore)
    };
  }
});

export const getRecommendations = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const roadmaps = await ctx.db
      .query("userRoadmaps")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const activePaths = await Promise.all(
      roadmaps.map(async r => {
        const p = await ctx.db.get(r.careerPathId);
        return p?.title || "";
      })
    );

    // Simple procedural recommendation engine
    const suggestions = [
      { title: "Full Stack Developer", reason: "Highly demanded in the market." },
      { title: "Data Scientist", reason: "Great synergy with analytical skills." },
      { title: "Cyber Security", reason: "Excellent pivot for advanced engineers." },
      { title: "AI Engineer", reason: "The future of software." }
    ];

    // Filter out paths they already have
    return suggestions.filter(s => !activePaths.includes(s.title)).slice(0, 2);
  }
});
