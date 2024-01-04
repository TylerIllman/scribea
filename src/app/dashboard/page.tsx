import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
    console.log("Dashboard");
    const user = await currentUser();

    if (!user || !user?.id) {
        redirect("/auth-callback?origin=dashboard");
    }

    return <div>Dashboard</div>;
}
