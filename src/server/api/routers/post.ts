import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({

  test: publicProcedure.query(({ ctx }) => {
    return "hello"
  }),

  newRoute: publicProcedure.query(({ ctx }) => {
    const name = ctx.auth?.user?.lastName;
    const result = {
      name: name
    };
    console.log(result);
    console.log("I AM HERE")
    return result;
  }),

});
