import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);
const isInProtectedRoute = createRouteMatcher(["/admin"]);

export default clerkMiddleware(async (auth, request) => {
  const user = await auth();

  if (
    user.userId !== "user_2u5KuPqnawktVsRsDGJhiAHk8N3" &&
    isInProtectedRoute(request) &&
    user.userId
  ) {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }
  if (isInProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
