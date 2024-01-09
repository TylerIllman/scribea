import { authRouter } from "~/server/api/routers/auth";
import { createTRPCRouter } from "~/server/api/trpc";
import { filesRouter } from "./routers/files";
import { messagesRouter } from "./routers/messages";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  file: filesRouter,
  messages: messagesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
