import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/auth/getSession";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (
    !session &&
    !publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (session && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

const publicRoutes = ["/auth", "/_next", "/favicon.ico"];
