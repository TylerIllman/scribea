import { currentUser, useUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "~/server/db";
import {PDFLoader} from "langchain/document_loaders/fs/pdf"

import { pinecone } from "~/lib/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  PdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {

      const user = await currentUser()
      
      if (!user || !user.id) throw new Error("Unauthorized")

      return {userId: user.id}
    })
    .onUploadComplete(async ({ metadata, file }) => {
 
      const createdFile = await db.file.create({
        data: {
           key: file.key,
           name: file.name,
           userId: metadata.userId,
           url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
           uploadStatus: "PROCESSING",
        }
      })

      try {
        const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)
        const blob = await response.blob()

        const loader = new PDFLoader(blob)
        const pageLevelDocs = await loader.load()
        const pagesAmt = pageLevelDocs.length

        //Vecotrise and index doc
        const pineconeIndex = pinecone.Index("scribea")
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        })

        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {pineconeIndex, namespace: createdFile.id})

        await db.file.update({
          where: {
            id: createdFile.id,
          },
          data: {
            uploadStatus: "SUCCESS",
          }
        })

      } catch (e) {
        console.log(e)
        await db.file.update({
          where: {
            id: createdFile.id,
          },
          data: {
            uploadStatus: "FAILED",
          }
        })
      }
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;