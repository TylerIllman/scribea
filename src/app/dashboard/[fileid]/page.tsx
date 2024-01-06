import { currentUser, useUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
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
      userId: user?.id,
    },
  });

  if (!file) notFound();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <div className="max-w-8xl mx-auto w-full grow lg:flex xl:px-2">
        {file.name}
      </div>
    </div>
  );
};

export default Page;
