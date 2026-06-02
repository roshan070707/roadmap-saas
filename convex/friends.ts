import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const sendFriendRequest = mutation({
  args: { receiverId: v.id("users") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    if (userId === args.receiverId) {
      throw new Error("Cannot send friend request to yourself");
    }

    // Check if request already exists
    const existingSender = await ctx.db
      .query("friendRequests")
      .withIndex("by_sender", q => q.eq("senderId", userId))
      .filter(q => q.eq(q.field("receiverId"), args.receiverId))
      .collect();

    const existingReceiver = await ctx.db
      .query("friendRequests")
      .withIndex("by_receiver", q => q.eq("receiverId", userId))
      .filter(q => q.eq(q.field("senderId"), args.receiverId))
      .collect();

    if (existingSender.length > 0 || existingReceiver.length > 0) {
      throw new Error("Friend request already exists");
    }

    // Check if already friends
    const existingFriend = await ctx.db
      .query("friends")
      .withIndex("by_user", q => q.eq("userId", userId))
      .filter(q => q.eq(q.field("friendId"), args.receiverId))
      .collect();
      
    if (existingFriend.length > 0) {
      throw new Error("Already friends");
    }

    const requestId = await ctx.db.insert("friendRequests", {
      senderId: userId,
      receiverId: args.receiverId,
      status: "pending",
      createdAt: Date.now()
    });

    // Fetch sender info for notification
    const sender = await ctx.db.get(userId);

    await ctx.db.insert("notifications", {
      userId: args.receiverId,
      type: "Friend Request",
      message: `${sender?.name || 'Someone'} sent you a friend request.`,
      read: false,
      metadata: { requestId },
      createdAt: Date.now()
    });
  }
});

export const acceptFriendRequest = mutation({
  args: { requestId: v.id("friendRequests") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const request = await ctx.db.get(args.requestId);
    if (!request || request.receiverId !== userId || request.status !== "pending") {
      throw new Error("Invalid friend request");
    }

    await ctx.db.patch(args.requestId, { status: "accepted" });

    // Create bi-directional friendship
    await ctx.db.insert("friends", {
      userId: request.senderId,
      friendId: request.receiverId,
      createdAt: Date.now()
    });

    await ctx.db.insert("friends", {
      userId: request.receiverId,
      friendId: request.senderId,
      createdAt: Date.now()
    });

    // Fetch receiver info for notification
    const receiver = await ctx.db.get(userId);

    // Notify sender
    await ctx.db.insert("notifications", {
      userId: request.senderId,
      type: "Friend Request Accepted",
      message: `${receiver?.name || 'Someone'} accepted your friend request!`,
      read: false,
      metadata: { friendId: userId },
      createdAt: Date.now()
    });

    // Activity feed
    await ctx.db.insert("activities", {
      userId: request.senderId,
      type: "Friend Joined",
      title: "New Friend",
      description: `You are now friends with ${receiver?.name || 'someone'}`,
      createdAt: Date.now()
    });

    const sender = await ctx.db.get(request.senderId);
    await ctx.db.insert("activities", {
      userId: request.receiverId,
      type: "Friend Joined",
      title: "New Friend",
      description: `You are now friends with ${sender?.name || 'someone'}`,
      createdAt: Date.now()
    });
  }
});

export const rejectFriendRequest = mutation({
  args: { requestId: v.id("friendRequests") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const request = await ctx.db.get(args.requestId);
    if (!request || request.receiverId !== userId || request.status !== "pending") {
      throw new Error("Invalid friend request");
    }

    await ctx.db.patch(args.requestId, { status: "rejected" });
  }
});

export const removeFriend = mutation({
  args: { friendId: v.id("users") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const friendLink1 = await ctx.db
      .query("friends")
      .withIndex("by_user", q => q.eq("userId", userId))
      .filter(q => q.eq(q.field("friendId"), args.friendId))
      .collect();

    const friendLink2 = await ctx.db
      .query("friends")
      .withIndex("by_user", q => q.eq("userId", args.friendId))
      .filter(q => q.eq(q.field("friendId"), userId))
      .collect();

    for (const link of friendLink1) {
      await ctx.db.delete(link._id);
    }
    for (const link of friendLink2) {
      await ctx.db.delete(link._id);
    }
  }
});

export const getFriends = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const friendships = await ctx.db
      .query("friends")
      .withIndex("by_user", q => q.eq("userId", userId))
      .collect();

    return await Promise.all(
      friendships.map(async (f) => {
        const user = await ctx.db.get(f.friendId);
        return { ...f, friend: user };
      })
    );
  }
});

export const getPendingRequests = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const requests = await ctx.db
      .query("friendRequests")
      .withIndex("by_receiver", q => q.eq("receiverId", userId))
      .filter(q => q.eq(q.field("status"), "pending"))
      .collect();

    return await Promise.all(
      requests.map(async (r) => {
        const sender = await ctx.db.get(r.senderId);
        return { ...r, sender };
      })
    );
  }
});

export const getSentRequests = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const requests = await ctx.db
      .query("friendRequests")
      .withIndex("by_sender", q => q.eq("senderId", userId))
      .filter(q => q.eq(q.field("status"), "pending"))
      .collect();

    return await Promise.all(
      requests.map(async (r) => {
        const receiver = await ctx.db.get(r.receiverId);
        return { ...r, receiver };
      })
    );
  }
});
