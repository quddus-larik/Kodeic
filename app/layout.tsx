import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import type { Metadata } from "next";

// Clerk imports
import { ClerkProvider } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: "Kodeic",
  description: "Dashboard Ai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkHeaders = headers(); // for SSR

  return (
    <ClerkProvider headers={clerkHeaders}>
      <html suppressHydrationWarning lang="en">
        <head />
        <body
          className={clsx(
            "min-h-screen text-foreground bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers>
            <div>
              <main className="container">{children}</main>
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
