// This file is for server-side only (not middleware)
import jwt, { Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as Secret;

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  name: string;
  territory?: string;
  refreshVersion?: number;
  iat?: number;
  exp?: number;
}

export function validateJwtSecret(): void {
  if (!JWT_SECRET) {
    throw new Error('❌ JWT_SECRET is not defined in environment variables');
  }
  
  if (typeof JWT_SECRET === 'string' && JWT_SECRET.length < 32) {
    throw new Error('❌ JWT_SECRET must be at least 32 characters long');
  }
  
  if (JWT_SECRET === 'nthoppa-super-secret-jwt-key-2026-minimum-32-chars') {
    console.warn('⚠️ WARNING: Using default JWT_SECRET. Generate a secure random secret for production!');
  }
}

export function signToken(payload: object, expiresIn: string | number = '7d'): string {
  validateJwtSecret();
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

// For server-side API routes - with generic support
export function verifyToken<T = TokenPayload>(token: string): T | null {
  try {
    validateJwtSecret();
    const decoded = jwt.verify(token, JWT_SECRET) as T;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// For middleware - manual JWT decode without verification (Edge compatible)
export function decodeToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const payload = Buffer.from(parts[1], 'base64').toString();
    return JSON.parse(payload) as TokenPayload;
  } catch (error) {
    console.error('Token decode failed:', error);
    return null;
  }
}