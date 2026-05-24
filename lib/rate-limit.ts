import { NextRequest, NextResponse } from 'next/server';

interface RateLimitRecord {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
  blockedUntil?: number;
}

interface RateLimitStore {
  [key: string]: RateLimitRecord;
}

const store: RateLimitStore = {};
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const BLOCK_DURATION_MS = 30 * 60 * 1000; // 30 minutes

export async function checkRateLimit(request: NextRequest, email?: string): Promise<NextResponse | null> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const identifier = email ? `${ip}:${email.toLowerCase()}` : ip;
  const now = Date.now();
  const record = store[identifier];

  // Check if currently blocked
  if (record?.blockedUntil && now < record.blockedUntil) {
    const remainingMinutes = Math.ceil((record.blockedUntil - now) / 60000);
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${remainingMinutes} minutes.` },
      { status: 429 }
    );
  }

  // No record exists - first attempt
  if (!record) {
    store[identifier] = { count: 1, firstAttempt: now, lastAttempt: now };
    return null;
  }

  // Window expired - reset counter
  if (now - record.firstAttempt > WINDOW_MS) {
    store[identifier] = { count: 1, firstAttempt: now, lastAttempt: now };
    return null;
  }

  // Increment counter
  record.count++;
  record.lastAttempt = now;

  // Block if exceeded max attempts
  if (record.count >= MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    return NextResponse.json(
      { error: `Account temporarily locked. Try again in ${BLOCK_DURATION_MS / 60000} minutes.` },
      { status: 429 }
    );
  }

  return null;
}

// Clean up old records periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of Object.entries(store)) {
      if (record.blockedUntil && now > record.blockedUntil + WINDOW_MS) {
        delete store[key];
      } else if (!record.blockedUntil && now - record.firstAttempt > WINDOW_MS * 2) {
        delete store[key];
      }
    }
  }, 60 * 60 * 1000);
}