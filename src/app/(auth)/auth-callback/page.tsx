import { trpc } from "@/app/_trpc/client";
import { useRouter, useSearchParams } from "next/navigation";

const Page = async () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const origin = searchParams.get("origin");

    const {} = trpc.post;
};

export default Page;
