import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Debug: Log all cookies being received
    const allCookies = request.cookies.getAll();
    console.log('🔍 Auth check - Cookies received:', allCookies.map(c => c.name));
    
    const token = request.cookies.get('nthoppa_token')?.value 
               || request.cookies.get('admin_session')?.value;

    console.log('🔍 Auth check - Token present:', !!token);

    if (!token) {
      console.log('❌ Auth check - No token found');
      const response = NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    // Use verifyToken from lib/jwt.ts for consistent verification
    const decoded = verifyToken<{
      id: string;
      email: string;
      role: string;
      name: string;
      territory?: string;
    }>(token);

    if (!decoded) {
      console.log('❌ Auth check - Token verification failed');
      const response = NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    console.log('✅ Auth check - Token verified for:', decoded.email, 'Role:', decoded.role);

    // First try to find user in User table
    let user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
      },
    });

    // Fallback: Check Agent table for agent role (agents may not have User records)
    if (!user && decoded.role === 'agent') {
      console.log('🔍 Auth check - User not found, checking Agent table for:', decoded.email);
      
      const agent = await prisma.agent.findFirst({
        where: { 
          loginEmail: decoded.email 
        },
        select: { 
          id: true, 
          loginEmail: true, 
          name: true, 
          isActive: true,
          territory: true,
        },
      });
      
      if (agent && agent.isActive) {
        console.log('✅ Auth check - Agent found and active:', agent.name);
        
        const res = NextResponse.json({
          authenticated: true,
          id: agent.id,
          name: agent.name,
          email: agent.loginEmail,
          role: 'agent',
          territory: agent.territory || decoded.territory || null,
        });
        res.headers.set('Cache-Control', 'no-store');
        return res;
      }
    }

    // Check if user exists and is active
    if (!user || user.status === 'inactive') {
      console.log('❌ Auth check - User not found or inactive:', decoded.email);
      const response = NextResponse.json({ error: 'User not found or inactive' }, { status: 401 });
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    // Return the real database ID instead of the token's fake ID
    const res = NextResponse.json({
      authenticated: true,
      id: user.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      territory: decoded.territory || null,
    });
    
    // Cache-Control: no-store prevents Vercel CDN from caching the auth check response
    res.headers.set('Cache-Control', 'no-store');
    
    console.log('✅ Auth check successful for:', decoded.email, 'Real ID:', user.id);
    return res;
  } catch (error) {
    console.error('❌ Auth check error:', error);
    const response = NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }
}