import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nthoppa-super-secret-jwt-key-2026-minimum-32-chars';

function getAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('nthoppa_token')?.value;
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as any;
  } catch { return null; }
}

export async function GET(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (auth.role !== 'agent' && auth.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  // Return empty list — no reports generated yet
  return NextResponse.json([]);
}

export async function POST(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (auth.role !== 'agent' && auth.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { type, dateFrom, dateTo } = body;
    const from = dateFrom || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const to = dateTo || new Date().toISOString();

    const report = {
      id: `report-${Date.now()}`,
      agentId: auth.id,
      type: type || 'registration',
      generatedAt: new Date().toISOString(),
      data: {
        type,
        dateRange: { from, to },
        totalUsers: 0,
        activeUsers: 0,
        pendingUsers: 0,
        inactiveUsers: 0,
        averageCompletion: 0,
        message: 'No data available for the selected period.',
      },
    };

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error('Reports POST error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
