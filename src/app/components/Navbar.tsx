import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href="/" className="flex z-40 font-semibold">
                        Scribea.
                    </Link>

                    <div className="hidden items-center space-x-4 sm:flex">
                        <>
                            <Link
                                className={buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                })}
                                href="/pricing"
                            >
                                Pricing
                            </Link>
                            <Link
                                className={buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                })}
                                href="/sign-in"
                            >
                                Sign in
                            </Link>
                            <Link
                                className={buttonVariants({
                                    size: "sm",
                                })}
                                href="/sign-up"
                            >
                                Get Started{" "}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
