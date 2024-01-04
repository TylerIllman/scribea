import { getAuth } from '@clerk/nextjs/server';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  authCallback: publicProcedure.query(({ctx}) => {
    
    const {userID } = getAuth(ctx.req);
    
  })
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;