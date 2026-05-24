import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware-safe JWT decode (no jsonwebtoken - Edge Runtime compatible)
function decodeToken(token: string): { id: string; email: string; role: string; name: string; territory?: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

const PUBLIC_PATHS = [
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
];

const ROLE_DASHBOARDS: Record<string, string> = {
  admin:    '/admin/dashboard',
  agent:    '/dashboard/main',
  client:   '/client/dashboard',
  hr:       '/hr/dashboard',
  merchant: '/merchant/dashboard',
};

const ROLE_PATHS: Record<string, string[]> = {
  admin:    ['/admin'],
  agent:    ['/dashboard'],
  client:   ['/client'],
  hr:       ['/hr'],
  merchant: ['/merchant'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(png|jpg|jpeg|svg|ico|pdf|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Always allow login and home
  if (pathname === '/' || pathname === '/login') {
    return NextResponse.next();
  }

  // Allow all public paths
  const isPublic = PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));
  if (isPublic) return NextResponse.next();

  // Get token
  const token = request.cookies.get('nthoppa_token')?.value
             || request.cookies.get('admin_session')?.value;

  // No token → redirect to login
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Decode token
  const decoded = decodeToken(token);

  // Bad token → clear cookies and redirect to login
  if (!decoded || !decoded.id) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('nthoppa_token');
    response.cookies.delete('admin_session');
    response.cookies.delete('user_role');
    return response;
  }

  const userRole = decoded.role;

  // API routes — just validate token, let the route handle the rest
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Role-based path protection
  const allowedPaths = ROLE_PATHS[userRole] || [];
  const isAllowed = allowedPaths.some(p => pathname.startsWith(p)) || isPublic;

  if (!isAllowed) {
    const dashboard = ROLE_DASHBOARDS[userRole] || '/login';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|pdf|css|js)$).*)',
  ],
};
