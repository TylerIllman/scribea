import { trpc } from "@/app/_trpc/client";
import { useRouter, useSearchParams } from "next/navigation";

const Page = async () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const origin = searchParams.get("origin");

    const { data } = trpc.test.useQuery();
};

export default Page;
