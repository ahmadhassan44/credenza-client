import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

// Define which paths are protected (require authentication)
const protectedPaths: string[] = [];

// Define which paths are auth-only (only for non-authenticated users)
const authOnlyPaths = ["/login", "/signup", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is protected or auth-only
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isAuthOnlyPath = authOnlyPaths.some((path) => pathname === path);

  // Get the token from the cookies
  const hasToken = request.cookies.has("accessToken");

  // If the path is protected and there's no token, redirect to login
  if (isProtectedPath && !hasToken) {
    const url = new URL("/login", request.url);

    url.searchParams.set("callbackUrl", encodeURI(pathname));

    return NextResponse.redirect(url);
  }

  // If the path is auth-only and there is a token, redirect to dashboard
  if (isAuthOnlyPath && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Otherwise, continue normally
  return NextResponse.next();
}

// Configure the paths that this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /favicon.ico, /robots.txt (SEO files)
     */
    "/((?!api|_next|static|favicon.ico|robots.txt).*)",
  ],
};
