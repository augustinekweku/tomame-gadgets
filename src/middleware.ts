import { NextConfig } from "next";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { authorizedUsers } from "./lib/authOptions";

export default withAuth(
  function middleware(req) {
    const session = req.nextauth?.token;
    const pathname = req.nextUrl.pathname;
    const hasSesssion = session;
    const userEmail = session?.email;
    const isUserAuthrized = authorizedUsers.includes(userEmail as string);
    const isInAuthRoute = pathname.includes("/auth");
    const isProtectedRoute = pathname.includes("/admin");

    if (isInAuthRoute && hasSesssion && isUserAuthrized) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (isProtectedRoute && !hasSesssion) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (isProtectedRoute && hasSesssion && !isUserAuthrized) {
      return NextResponse.redirect(new URL("/auth/access-denied", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        return true;
      },
    },
  }
);

export const config: NextConfig = {
  matcher: ["/", "/auth/:path*", "/admin"],
};
