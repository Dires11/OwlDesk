import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/calendar(.*)",
  "/sessions(.*)",
  "/students(.*)",
  "/tutors(.*)",
  "/payments(.*)",
  "/api/dashboard(.*)",
  "/api/students(.*)",
  "/api/tutors(.*)",
  "/api/sessions(.*)",
  "/api/payments(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/(.*)"],
};
