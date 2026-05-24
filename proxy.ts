import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from './lib/jwt';

// Define public paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/privacy-policy',
  '/terms',
  '/cookie-policy',
  '/disclaimer',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
  '/api/auth/check',
  '/api/waitlist',
  '/api/subscribe',
  '/api/ussd',
  '/_next',
  '/favicon.ico',
  '/nthoppa-logo.png',
  '/app-screen-home.jpg',
  '/app-screen-coins.jpg',
  '/partners',
];

// Define role-based redirect paths
const roleRedirects: Record<string, string> = {
  admin: '/admin/dashboard',
  agent: '/dashboard/main',
  client: '/client/dashboard',
  hr: '/hr/dashboard',
  merchant: '/merchant/dashboard',
};

// Define role-based path prefixes
const rolePaths: Record<string, string[]> = {
  admin: ['/admin'],
  agent: ['/dashboard'],
  client: ['/client'],
  hr: ['/hr'],
  merchant: ['/merchant'],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ALWAYS allow login and root pages — no redirects, no checks
  if (pathname === '/login' || pathname === '/') {
    return NextResponse.next();
  }

  // Check if the path is public (no authentication needed)
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // Get token from cookies
  const token = request.cookies.get('nthoppa_token')?.value || 
                request.cookies.get('admin_session')?.value;
  
  const userRole = request.cookies.get('user_role')?.value;

  // If not authenticated and trying to access protected route
  if (!token && !isPublicPath) {
    // Redirect to login page
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated, check role-based access for non-API routes
  if (token && userRole && !pathname.startsWith('/api/')) {
    const allowedPaths = rolePaths[userRole] || [];
    const isAllowedPath = allowedPaths.some(path => pathname.startsWith(path)) || isPublicPath;

    if (!isAllowedPath && pathname !== '/') {
      // User doesn't have permission to access this path
      // Redirect to their appropriate dashboard
      const redirectPath = roleRedirects[userRole] || '/';
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  // Check for admin-specific access for non-API routes
  if (token && userRole !== 'admin' && pathname.startsWith('/admin') && !pathname.startsWith('/api/')) {
    const redirectPath = roleRedirects[userRole || 'client'] || '/';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // For API routes: verify token validity without database lookup
  // The database check belongs in the API route itself, not in middleware
  if (token && pathname.startsWith('/api/') && !isPublicPath) {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.id) {
      // Invalid token, clear cookies and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('nthoppa_token');
      response.cookies.delete('admin_session');
      response.cookies.delete('user_role');
      return response;
    }
    // Token is valid - let it through. Don't check the database here.
    return NextResponse.next();
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which paths the proxy runs on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/client/:path*',
    '/hr/:path*',
    '/merchant/:path*',
    '/api/:path*',
  ],
};