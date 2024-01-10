import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";

import Navbar from "../components/Navbar";
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Scribea",
  description: "Chat with your documents in seconds.",
  icons: [{ rel: "icon", url: "/icon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "grainy min-h-screen font-sans antialiased",
            inter.className,
          )}
        >
          <TRPCReactProvider cookies={cookies().toString()}>
            <Toaster />
            <Navbar />
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
