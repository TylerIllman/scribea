import { currentUser, useUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {

      const {user} = useUser()
      
      if (!user || !user.id) throw new Error("Unauthorized")

      return {userId: user.id}
    })
    .onUploadComplete(async ({ metadata, file }) => {
 
      console.log("file url", file.url);
      return {};
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;