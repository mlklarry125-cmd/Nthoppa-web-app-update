import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const leaders = await prisma.agent.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        territory: true,
        nthoppaCoins: true,
      },
      orderBy: {
        nthoppaCoins: 'desc',
      },
      take: 50,
    });
    
    return NextResponse.json(leaders);
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}