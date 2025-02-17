import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSession } from "../lib/auth/getSession";
import { SignOutButton } from "./SignOutButton";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Master Notes",
  description: "A place to keep your game master notes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-xl">
            <h1 className="py-2 px-4 font-bold">Game Master Notes</h1>
            <div className="border-l border-white h-8"></div>
            <Link
              href="/stories"
              className="py-2 px-4 rounded-sm hover:bg-gray-700"
            >
              Stories
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {session && (
              <>
                <span>{session.login}</span>
                <SignOutButton />
              </>
            )}
          </div>
        </header>

        <div className="container mx-auto max-w-(--breakpoint-md) p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
