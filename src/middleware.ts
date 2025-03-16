import { NextConfig } from "next";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const session = req.nextauth?.token;
    const pathname = req.nextUrl.pathname;
    const hasSesssion = session;

    const isInAuthRoute = pathname.includes("/auth");
    const isProtectedRoute = pathname.includes("/admin");

    if (isInAuthRoute && hasSesssion) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    console.log("Session", session);
    console.log("Pathname", pathname);
    console.log("Has Session", hasSesssion);
    console.log("Is in Auth Route", isInAuthRoute);
    console.log("Is Protected Route", isProtectedRoute);
    console.log("req.url", req.url);

    if (isProtectedRoute && !hasSesssion) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
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
