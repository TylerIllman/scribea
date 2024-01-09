import { currentUser, useUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import ChatWrapper from "~/components/chat/ChatWrapper";
import PdfRenderer from "~/components/PdfRenderer";
import { db } from "~/server/db";

interface FileChatPageProps {
  params: {
    fileid: string;
  };
}

const Page = async ({ params }: FileChatPageProps) => {
  const { fileid } = params;
  const user = await currentUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`);

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <div className="max-w-8xl mx-auto w-full grow lg:flex xl:px-2">
        {/* PDF Render */}

        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={file.url} />
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper fileId={fileid} />
        </div>
      </div>
    </div>
  );
};

export default Page;
