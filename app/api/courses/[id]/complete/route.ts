import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function POST(
  request: NextRequest,
  { params }: Params
) {
  try {
    const auth = await verifyAuth(request);
    if (!auth || auth.role !== 'agent') {
      return NextResponse.json({ error: 'Unauthorized — agents only' }, { status: 401 });
    }

    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: { id }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if already completed (stored in UserCourseProgress using agentId in userId field)
    const existingProgress = await prisma.userCourseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: auth.id,
          courseId: id
        }
      }
    });

    if (existingProgress?.completedAt) {
      return NextResponse.json({
        error: 'Course already completed',
        coinsEarned: existingProgress.coinsEarned
      }, { status: 400 });
    }

    // Upsert course progress (userId field stores agentId for agent courses)
    await prisma.userCourseProgress.upsert({
      where: {
        userId_courseId: {
          userId: auth.id,
          courseId: id
        }
      },
      update: {
        completedAt: new Date(),
        score: 100,
        coinsEarned: course.coinsReward
      },
      create: {
        userId: auth.id,
        courseId: id,
        completedAt: new Date(),
        score: 100,
        coinsEarned: course.coinsReward
      }
    });

    // Award coins directly to the Agent record
    const updatedAgent = await prisma.agent.update({
      where: { id: auth.id },
      data: {
        nthoppaCoins: { increment: course.coinsReward }
      }
    });

    return NextResponse.json({
      success: true,
      coinsEarned: course.coinsReward,
      totalCoins: updatedAgent.nthoppaCoins
    });
  } catch (error) {
    console.error('POST /api/courses/[id]/complete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}