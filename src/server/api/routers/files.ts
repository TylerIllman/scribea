import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { INFINITE_QUERY_LIMIT } from "~/config/infinit-query";

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
    getFile: protectedProcedure.input(z.object({key: z.string()})).mutation(async ({ctx,input}) => {
        const userId = ctx.user.id

        const file = await db.file.findFirst({
            where: {
                key: input.key,
                userId,
            },
        })

        if (!file) throw new TRPCError({code:"NOT_FOUND", message: "File not found"})

        return file
    }),
    getFileUploadStatus: protectedProcedure.input(z.object({fileId: z.string()})).query(async ({ctx, input}) => { 
        const file = await db.file.findFirst({
            where: {
                id: input.fileId,
                userId: ctx.user.id
            }
        })

        if (!file) return {status: "PENDING" as const}   
        
        return {status: file.uploadStatus}
    }),

    getFileMessages: protectedProcedure.input(
        z.object({
            limit: z.number().min(1).max(100).nullish(),
            cursor: z.string().nullish(),
            fileId: z.string(),
    })).query(async ({ctx,input}) => {
        const userId = ctx.user.id
        const {fileId, cursor} = input
        const limit = input.limit ?? INFINITE_QUERY_LIMIT

        const file = await db.file.findFirst({
            where: {
                id: fileId,
                userId,
            }
        })

        if (!file) throw new TRPCError({code: "NOT_FOUND", message: "File not found"})

        const messages = await db.message.findMany({
            take: limit + 1, 
            where: {
                fileId
            },
            orderBy: {
                createdAt: "desc"
            },
            cursor: cursor ? {id: cursor} : undefined,
            select: {
                id: true,
                isUserMessage: true,
                createdAt: true,
                text: true,
            }
        })

        let nextCursor: typeof cursor | undefined = undefined
        if (messages.length > limit) {
            const nextItem = messages.pop()
            nextCursor = nextItem?.id
        }

        return {
            messages,
            nextCursor,
        }
    })
});

