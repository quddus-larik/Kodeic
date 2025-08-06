import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/']);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId } = auth();
    if (!userId) {
      // Redirect to sign-in page if user is not authenticated
      return NextResponse.redirect(new URL('/auth/sign-in', '/dashboard'));
    }
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
