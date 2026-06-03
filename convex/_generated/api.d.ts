/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as achievements from "../achievements.js";
import type * as activities from "../activities.js";
import type * as auth from "../auth.js";
import type * as collaboration from "../collaboration.js";
import type * as friends from "../friends.js";
import type * as http from "../http.js";
import type * as intelligence from "../intelligence.js";
import type * as leaderboard from "../leaderboard.js";
import type * as notifications from "../notifications.js";
import type * as profiles from "../profiles.js";
import type * as projects from "../projects.js";
import type * as roadmaps from "../roadmaps.js";
import type * as study from "../study.js";
import type * as users from "../users.js";
import type * as waitlist from "../waitlist.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  achievements: typeof achievements;
  activities: typeof activities;
  auth: typeof auth;
  collaboration: typeof collaboration;
  friends: typeof friends;
  http: typeof http;
  intelligence: typeof intelligence;
  leaderboard: typeof leaderboard;
  notifications: typeof notifications;
  profiles: typeof profiles;
  projects: typeof projects;
  roadmaps: typeof roadmaps;
  study: typeof study;
  users: typeof users;
  waitlist: typeof waitlist;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
