// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    const isProduction = process.env.NODE_ENV === 'production';
    
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // true on Vercel (HTTPS), false on localhost
      sameSite: 'lax' as const,
      maxAge: 0,
      path: '/',
    };

    const nonHttpCookieOptions = {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'lax' as const,
      maxAge: 0,
      path: '/',
    };

    // Clear ALL session cookies that might exist
    // Agent session cookie
    response.cookies.set('agent_session', '', cookieOptions);

    // Admin session cookie
    response.cookies.set('admin_session', '', cookieOptions);

    // Main auth token cookie (used by most portals)
    response.cookies.set('nthoppa_token', '', cookieOptions);

    // User role cookie (used for role-based redirects)
    response.cookies.set('user_role', '', nonHttpCookieOptions);

    console.log('✅ Logout successful - all cookies cleared');
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}