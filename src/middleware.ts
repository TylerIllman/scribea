import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isTenantRoute = createRouteMatcher([
  '/organization-selector(.*)',
  '/orgid/(.*)'
])

const isTenantAdminRoute = createRouteMatcher([
  '/orgId/(.*)/memberships',
  '/orgId/(.*)/domain',
]);


export default clerkMiddleware((auth, req) => {
  // Restrict admin routes to users with specific permissions
  if (isTenantAdminRoute(req)) {
    auth().protect(has => {
      return (
        has({ permission: 'org:sys_memberships:manage' }) ||
        has({ permission: 'org:sys_domains_manage' })
      )
    })
  }
  // Restrict organization routes to signed in users
  if (isTenantRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
  '/dashboard(.*)',

    export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
  '/ferum(.*)',
]);mport { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
import { loggerLink } from "@trpc/client";
import { createRouteMatcher } from "node_modules/@clerk/nextjs/dist/types/server/authMiddleware";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/sign-in/(.*)",
    "/sign-up/(.*)",
    "/api/(.*)",
    "/api/message",
    "/pricing",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

