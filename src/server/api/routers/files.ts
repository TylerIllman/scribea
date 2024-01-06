import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const filesRouter = createTRPCRouter({
    getUserFiles: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.user.id

        return await db.file.findMany({
            where: {
                userId
            }
        })
    }),
    deleteFile: protectedProcedure.input(
        z.object({id: z.string()})
    ).mutation(async ({ctx, input}) => {
        const userId = ctx.user.id
        
        const file = await db.file.findFirst({
            where: {
                id: input.id,
                userId,
            }
        })

        if (!file) throw new TRPCError({ code: "NOT_FOUND", message: "File not found" })
        
        await db.file.delete({
            where: {
                id: input.id,
            }
        })

        return file
    }),
});

