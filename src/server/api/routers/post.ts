import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  authCallback: publicProcedure.query(({ctx}) => {
    const user = ctx.user

  }),
});

