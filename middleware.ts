import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define which paths are protected (require authentication)
const protectedPaths: string[] = []; // Add paths like '/dashboard', '/profile' if they need server-side protection

// Define which paths are auth-only (only for non-authenticated users)
const authOnlyPaths = ["/login", "/signup", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthOnlyPath = authOnlyPaths.some((path) => pathname === path);

  const authHeader = request.headers.get("Authorization");
  const hasToken = authHeader && authHeader.startsWith("Bearer ");

  if (isProtectedPath && !hasToken) {
    const url = new URL("/login", request.url);

    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  if (isAuthOnlyPath && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

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
