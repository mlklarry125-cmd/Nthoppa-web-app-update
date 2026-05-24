import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'nthoppa-2026-$tr0ng-jwt-s3cr3t-k3y-b0tswana-fin0s';

export interface JWTPayload {
  id: string;
  email: string;
  role: 'admin' | 'agent' | 'client' | 'hr' | 'merchant';
  name?: string;
  territory?: string;
}

export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    // Silent fail - just return null
    return null;
  }
}

export async function verifyAuth(request: NextRequest): Promise<JWTPayload | null> {
  try {
    // Get cookies from the request - NextRequest has direct cookie access
    const agentToken = request.cookies.get('agent_session')?.value;
    const adminToken = request.cookies.get('admin_session')?.value;
    
    // Check for agent session first (used for all roles except admin)
    let token = agentToken;
    
    // If not found, check for admin session
    if (!token) {
      token = adminToken;
    }
    
    if (!token) {
      return null;
    }
    
    const payload = verifyJWT(token);
    return payload;
  } catch (error) {
    console.error('Auth verification failed:', error);
    return null;
  }
}

// For server components and API routes that need to verify from cookie string
export function verifyAuthFromCookieString(cookieHeader: string | null): JWTPayload | null {
  if (!cookieHeader) return null;
  
  // Parse cookies manually
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach(cookie => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) {
      cookies[key] = value;
    }
  });

  // Check for agent session first
  let token = cookies['agent_session'];
  
  // If not found, check for admin session
  if (!token) {
    token = cookies['admin_session'];
  }
  
  if (!token) {
    return null;
  }
  
  return verifyJWT(token);
}