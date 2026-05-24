import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const progress = await prisma.userCourseProgress.findMany({
      where: { userId: auth.id },
      select: {
        courseId: true,
        completedAt: true,
        score: true,
        coinsEarned: true
      }
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('GET /api/user/courses error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}