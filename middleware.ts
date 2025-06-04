// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Import the specific client for middleware from Supabase auth helpers
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// The middleware function MUST be async if you're using await inside it.
export async function middleware(req: NextRequest) {
  // Initialize NextResponse.next() to allow modifying headers/cookies later.
  // This is crucial for Supabase to set/refresh auth cookies.
  const res = NextResponse.next();

  // Create a Supabase client specifically for middleware.
  // This client handles refreshing the user's session and setting/getting cookies
  // based on the incoming request (req) and the outgoing response (res).
  const supabase = createMiddlewareClient({ req, res });

  // IMPORTANT: This line attempts to refresh the session and will set cookies in 'res'
  // if a valid refresh token is found or a new session is established.
  const {
    data: { session }, // Destructure the session object
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // --- Debugging Logs ---
  console.log(`[Middleware] Path: ${pathname}, Session Exists: ${!!session}`);
  // --- End Debugging Logs ---

  // Define paths that are considered "public" or "authentication-related".
  // Users who are NOT signed in can access these.
  // Users who ARE signed in will be redirected away from these to the dashboard.
  const publicAuthRoutes = [ '/login', '/auth/callback', '/', "/verify"]; // Add any other public/auth-related paths

  // Scenario 1: User IS authenticated (session exists)
  if (session) {
    // If the authenticated user tries to access an auth-related route,
    // redirect them to the dashboard.
    if (publicAuthRoutes.includes(pathname)) {
      console.log(`[Middleware] Authenticated user on auth route (${pathname}), redirecting to /dashboard`);
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // If authenticated user is on a non-auth route (protected route), allow access.
    console.log(`[Middleware] Authenticated user on protected route (${pathname}), allowing access.`);
    return res; // Allow access to protected routes
  }
  // Scenario 2: User is NOT authenticated (no session)
  else {
    // If the unauthenticated user tries to access a protected route (not in publicAuthRoutes),
    // redirect them to the signup page.
    if (!publicAuthRoutes.includes(pathname)) {
      console.log(`[Middleware] Unauthenticated user on protected route (${pathname}), redirecting to /signup`);
      return NextResponse.redirect(new URL('/login', req.url));
    }
    // If unauthenticated user is on a public/auth route, allow access.
    console.log(`[Middleware] Unauthenticated user on public/auth route (${pathname}), allowing access.`);
    return res; // Allow access to signup/login/callback
  }
}

// Configure which paths the middleware should run on.
// This matcher will run the middleware on all routes except:
// - Next.js internal files (`/_next/`)
// - API routes (`/api/`)
// - Static files like favicon (`/favicon.ico`)
// - Any other static asset directories (e.g., `/images`, `/fonts`, `/public`)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts|public).*)',
  ],
};
