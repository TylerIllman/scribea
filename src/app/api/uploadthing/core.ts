import { currentUser, useUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "~/server/db";
 
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
      console.log("file url", file.url);
      return {};
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;