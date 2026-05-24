import { signToken, verifyToken, TokenPayload } from './jwt';

export interface RefreshTokenPayload {
  id: string;
  refreshVersion: number;
  iat?: number;
  exp?: number;
}

export function generateRefreshToken(userId: string, version: number): string {
  return signToken({ id: userId, refreshVersion: version }, '30d');
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  const decoded = verifyToken<RefreshTokenPayload>(token);
  if (!decoded) {
    return null;
  }
  return decoded;
}

// Store refresh token versions in memory (in production, use Redis or database)
const refreshTokenVersions: Map<string, number> = new Map();

export function getRefreshTokenVersion(userId: string): number {
  return refreshTokenVersions.get(userId) || 0;
}

export function incrementRefreshTokenVersion(userId: string): void {
  const current = getRefreshTokenVersion(userId);
  refreshTokenVersions.set(userId, current + 1);
}

export function revokeAllUserTokens(userId: string): void {
  incrementRefreshTokenVersion(userId);
}

// Helper to validate refresh token version
export function isRefreshTokenValid(userId: string, tokenVersion: number): boolean {
  const currentVersion = getRefreshTokenVersion(userId);
  return tokenVersion >= currentVersion;
}