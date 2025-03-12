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

    const isInAuthRoute = pathname.includes("/auth");
    const isProtectedRoute = pathname.includes("/admin");

    if (isInAuthRoute && hasSesssion) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (
      isProtectedRoute &&
      !hasSesssion &&
      !session &&
      !authorizedUsers.includes(userEmail as string)
    ) {
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
