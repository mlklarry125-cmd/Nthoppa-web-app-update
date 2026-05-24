import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/jwt';

const DEMO_CREDENTIALS: Record<string, { email: string; password: string; name: string; id: string; role: string; extra?: object }> = {
  admin:    { email: 'admin@nthoppa.com',    password: 'admin123',    name: 'System Administrator', id: 'admin-001', role: 'admin' },
  agent:    { email: 'agent@nthoppa.com',    password: 'agent123',    name: 'John Motsumi',          id: 'agent-001', role: 'agent', extra: { territory: 'Gaborone Central' } },
  user:     { email: 'client@nthoppa.com',   password: 'client123',   name: 'Josephine Morolong',    id: 'client-001', role: 'client' },
  client:   { email: 'client@nthoppa.com',   password: 'client123',   name: 'Josephine Morolong',    id: 'client-001', role: 'client' },
  hr:       { email: 'hr@nthoppa.com',       password: 'hr123',       name: 'Thabo Molefe',          id: 'hr-001', role: 'hr' },
  merchant: { email: 'merchant@nthoppa.com', password: 'merchant123', name: 'Kgabo General Store',   id: 'merchant-001', role: 'merchant' },
};

const REDIRECT_MAP: Record<string, string> = {
  admin:    '/admin/dashboard',
  agent:    '/dashboard/main',
  user:     '/client/dashboard',
  client:   '/client/dashboard',
  hr:       '/hr/dashboard',
  merchant: '/merchant/dashboard',
};

// Map frontend role names to database role values
const roleMap: Record<string, string> = {
  user: 'client',
  client: 'client',
  agent: 'agent',
  admin: 'admin',
  hr: 'hr',
  merchant: 'merchant',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Email, password and role are required' }, { status: 400 });
    }

    const isProduction = process.env.NODE_ENV === 'production';
    
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // true on Vercel (HTTPS), false on localhost
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    };

    // First try demo credentials
    const demo = DEMO_CREDENTIALS[role];
    if (demo && email === demo.email && password === demo.password) {
      const tokenPayload = { 
        id: demo.id, 
        email: demo.email, 
        role: demo.role, 
        name: demo.name, 
        ...(demo.extra || {}) 
      };
      
      const token = signToken(tokenPayload, '7d');
      const redirectUrl = REDIRECT_MAP[role] || '/';

      const response = NextResponse.json({ 
        success: true, 
        redirectUrl, 
        user: tokenPayload, 
        token 
      });

      response.cookies.set('nthoppa_token', token, cookieOptions);
      response.cookies.set('user_role', demo.role, { ...cookieOptions, httpOnly: false });
      if (role === 'admin') response.cookies.set('admin_session', token, cookieOptions);

      console.log('✅ Login successful for demo user:', email);
      return response;
    }

    // Map the frontend role to database role value
    const dbRole = roleMap[role] || role;
    
    // For database authentication, try to find user by email only first
    // Then check if the role matches (users can have role 'client' while frontend sends 'user')
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user || !user.password) {
      console.log('❌ User not found:', email);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('❌ Invalid password for:', email);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check if user has the requested role (or if role is 'user' and user role is 'client')
    const userRole = user.role || 'client';
    const requestedRole = role === 'user' ? 'client' : role === 'client' ? 'client' : role;
    
    if (userRole !== requestedRole && userRole !== role) {
      console.log('❌ Role mismatch - User role:', userRole, 'Requested:', role);
      return NextResponse.json({ error: `Invalid role. You are logged in as ${userRole}.` }, { status: 403 });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: userRole,
      name: user.fullName,
    };

    const token = signToken(tokenPayload, '7d');
    const redirectPath = REDIRECT_MAP[role] || '/';

    const response = NextResponse.json({
      success: true,
      redirectUrl: redirectPath,
      user: tokenPayload,
      token,
    });

    response.cookies.set('nthoppa_token', token, cookieOptions);
    response.cookies.set('user_role', userRole, { ...cookieOptions, httpOnly: false });

    console.log('✅ Login successful for DB user:', email, 'Role:', userRole);
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}