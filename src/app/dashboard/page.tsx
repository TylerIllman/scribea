import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

export default async function Page() {
  const user = await currentUser();

  if (!user || !user.id) redirect("/auth-callback?origin=/dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=/dashboard");

  return <div>Dashboard</div>;
}
