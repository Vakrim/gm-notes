import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/auth/getSession";
import { match } from "path-to-regexp";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (
    !session &&
    !publicRoutes.some((route) => route(request.nextUrl.pathname))
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (session && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

const publicRoutes = [
  match("/stories/:storyId/public"),
  match("/auth", { end: false }),
  match("/_next", { end: false }),
  match("/favicon.ico"),
];
