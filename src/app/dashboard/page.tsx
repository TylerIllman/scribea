import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import Dashboard from "../components/Dashboard";

export default async function Page() {
  const user = await currentUser();

  console.log("IN dashboard parent page");

  if (!user || !user.id) {
    console.log("QWHERQQWERQWER");
    redirect("/auth-callback?origin=/dashboard");
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=/dashboard");

  return <Dashboard />;
}
