import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// --- Career Paths ---

export const seedCareerPaths = mutation({
  args: {},
  handler: async (ctx) => {
    const paths = [
      {
        title: "MCA via NIMCET",
        difficulty: "High",
        duration: "12 Months",
        description: "Comprehensive preparation for MCA entrance exams focusing on mathematics and logical reasoning.",
        roadmapSteps: [
          { phase: "Phase 1", title: "Algebra & Trigonometry", description: "Mastering the fundamentals of pure math." },
          { phase: "Phase 2", title: "Calculus", description: "Differential and integral calculus mastery." },
          { phase: "Phase 3", title: "Logical Reasoning", description: "Aptitude and problem-solving patterns." },
          { phase: "Phase 4", title: "Computer Awareness", description: "Basic computer architecture and data representation." },
          { phase: "Phase 5", title: "Mock Tests & Revision", description: "Full-length timed exams and performance analysis." }
        ]
      },
      {
        title: "Full Stack Developer",
        difficulty: "Medium",
        duration: "8 Months",
        description: "End-to-end web application development using modern JavaScript frameworks.",
        roadmapSteps: [
          { phase: "Phase 1", title: "HTML, CSS & JS Fundamentals", description: "Building responsive static websites." },
          { phase: "Phase 2", title: "React & State Management", description: "Building dynamic single-page applications." },
          { phase: "Phase 3", title: "Node.js & Express", description: "Creating RESTful APIs and server logic." },
          { phase: "Phase 4", title: "Database Integration", description: "Working with SQL and NoSQL databases." },
          { phase: "Phase 5", title: "Deployment & CI/CD", description: "Hosting and automating deployments." }
        ]
      },
      {
        title: "Cyber Security",
        difficulty: "High",
        duration: "10 Months",
        description: "Protecting systems, networks, and programs from digital attacks.",
        roadmapSteps: [
          { phase: "Phase 1", title: "Networking Fundamentals", description: "TCP/IP, OSI model, routing and switching." },
          { phase: "Phase 2", title: "System Administration", description: "Linux and Windows OS mastery." },
          { phase: "Phase 3", title: "Network Security", description: "Firewalls, IDS/IPS, VPNs, and packet analysis." },
          { phase: "Phase 4", title: "Ethical Hacking", description: "Penetration testing and vulnerability assessment." },
          { phase: "Phase 5", title: "Incident Response", description: "Threat hunting and digital forensics." }
        ]
      },
      {
        title: "Data Analyst",
        difficulty: "Medium",
        duration: "6 Months",
        description: "Translating data into actionable business insights.",
        roadmapSteps: [
          { phase: "Phase 1", title: "Excel & Statistics", description: "Data manipulation and descriptive statistics." },
          { phase: "Phase 2", title: "SQL Mastery", description: "Advanced querying and database management." },
          { phase: "Phase 3", title: "Data Visualization", description: "Creating dashboards with Tableau or PowerBI." },
          { phase: "Phase 4", title: "Python for Data", description: "Pandas, NumPy, and scripting for automation." },
          { phase: "Phase 5", title: "Capstone Project", description: "End-to-end data analysis portfolio project." }
        ]
      },
      {
        title: "AI Engineer",
        difficulty: "Very High",
        duration: "14 Months",
        description: "Building intelligent systems using machine learning and deep learning.",
        roadmapSteps: [
          { phase: "Phase 1", title: "Python & Linear Algebra", description: "Mathematical foundations for machine learning." },
          { phase: "Phase 2", title: "Machine Learning Basics", description: "Supervised and unsupervised learning algorithms." },
          { phase: "Phase 3", title: "Deep Learning & Neural Nets", description: "PyTorch/TensorFlow and network architectures." },
          { phase: "Phase 4", title: "Natural Language Processing", description: "Working with LLMs and text data." },
          { phase: "Phase 5", title: "MLOps", description: "Deploying and scaling machine learning models." }
        ]
      },
      {
        title: "Software Engineer",
        difficulty: "High",
        duration: "12 Months",
        description: "Generalist backend-heavy software engineering.",
        roadmapSteps: [
          { phase: "Phase 1", title: "Programming Fundamentals", description: "Data structures and algorithms in Java/C++." },
          { phase: "Phase 2", title: "Object-Oriented Design", description: "Design patterns and SOLID principles." },
          { phase: "Phase 3", title: "System Design", description: "Architecting scalable distributed systems." },
          { phase: "Phase 4", title: "API Development", description: "Building robust backend services." },
          { phase: "Phase 5", title: "Cloud Infrastructure", description: "AWS/GCP fundamentals and containerization." }
        ]
      }
    ];

    for (const path of paths) {
      await ctx.db.insert("careerPaths", path);
    }
  }
});

export const getCareerPaths = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("careerPaths").collect();
  }
});

// --- User Roadmaps ---

export const getUserRoadmaps = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    
    const userRoadmaps = await ctx.db
      .query("userRoadmaps")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Join with careerPaths to get full details
    const populatedRoadmaps = await Promise.all(
      userRoadmaps.map(async (ur) => {
        const careerPath = await ctx.db.get(ur.careerPathId);
        return { ...ur, careerPath };
      })
    );

    return populatedRoadmaps.sort((a, b) => b.createdAt - a.createdAt);
  }
});

export const getRoadmapById = query({
  args: { id: v.id("userRoadmaps") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const roadmap = await ctx.db.get(args.id);
    if (!roadmap || roadmap.userId !== userId) return null;

    const careerPath = await ctx.db.get(roadmap.careerPathId);
    return { ...roadmap, careerPath };
  }
});

export const generateRoadmap = mutation({
  args: {
    targetCareer: v.string(),
    degree: v.string(),
    semester: v.string(),
    skills: v.string(),
    studyHours: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Find the corresponding career path template
    const paths = await ctx.db.query("careerPaths").filter(q => q.eq(q.field("title"), args.targetCareer)).collect();
    
    let pathId;
    if (paths.length > 0) {
      pathId = paths[0]._id;
    } else {
      throw new Error("Career path not found");
    }

    // Create the user roadmap
    const roadmapId = await ctx.db.insert("userRoadmaps", {
      userId,
      careerPathId: pathId,
      progress: 0,
      completedSteps: [],
      createdAt: Date.now(),
    });

    return roadmapId;
  }
});

export const toggleStepCompletion = mutation({
  args: {
    roadmapId: v.id("userRoadmaps"),
    stepTitle: v.string(),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const roadmap = await ctx.db.get(args.roadmapId);
    if (!roadmap || roadmap.userId !== userId) throw new Error("Roadmap not found");

    const careerPath = await ctx.db.get(roadmap.careerPathId);
    if (!careerPath) throw new Error("Career path not found");

    let newCompletedSteps = [...roadmap.completedSteps];
    if (args.isCompleted && !newCompletedSteps.includes(args.stepTitle)) {
      newCompletedSteps.push(args.stepTitle);
    } else if (!args.isCompleted) {
      newCompletedSteps = newCompletedSteps.filter(s => s !== args.stepTitle);
    }

    // Calculate progress
    const totalSteps = careerPath.roadmapSteps.length;
    const progress = totalSteps > 0 ? Math.round((newCompletedSteps.length / totalSteps) * 100) : 0;

    await ctx.db.patch(args.roadmapId, {
      completedSteps: newCompletedSteps,
      progress,
    });

    return { progress, newCompletedSteps };
  }
});
