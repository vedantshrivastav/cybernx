// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
 
// export default clerkMiddleware({
//   // Public routes that don't require authentication
//   publicRoutes: [
//     "/sign-in(.*)", // Add the catch-all pattern for sign-in
//     "/sign-up(.*)", // Also do the same for sign-up
//     "/api/webhook"
//   ],
//   afterAuth(auth: { userId: string | null; isPublicRoute: boolean }, req: NextRequest) {
//     // Handle users who aren't authenticated
//     if (!auth.userId && !auth.isPublicRoute) {
//       return NextResponse.redirect(new URL("/sign-in", req.url));
//     }
//     // Allow users to access protected routes
//     return NextResponse.next();
//   }
// } as any);
 
// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };