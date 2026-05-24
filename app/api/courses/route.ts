import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, TokenPayload } from '@/lib/jwt';
import type { UserCourseProgress } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken<TokenPayload>(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = payload.id;
    const userRole = payload.role;

    // Fetch all courses
    const courses = await prisma.course.findMany({
      orderBy: { order: 'asc' }
    });
    
    // Fetch user's course progress if logged in as client
    let userProgress: UserCourseProgress[] = [];
    if (userRole === 'client') {
      userProgress = await prisma.userCourseProgress.findMany({
        where: { userId: userId }
      });
    }

    // Combine courses with user progress
    const coursesWithProgress = courses.map(course => {
      const progress = userProgress.find(p => p.courseId === course.id);
      return {
        id: course.id,
        title: course.title,
        description: course.description,
        content: course.content,
        coinsReward: course.coinsReward,
        requiredScore: course.requiredScore,
        order: course.order,
        createdAt: course.createdAt,
        progress: progress ? {
          completed: !!progress.completedAt,
          score: progress.score,
          completedAt: progress.completedAt,
          coinsEarned: progress.coinsEarned
        } : null
      };
    });
    
    return NextResponse.json({ 
      success: true, 
      courses: coursesWithProgress 
    });
  } catch (error) {
    console.error('🔴 GET /api/courses error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken<TokenPayload>(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = payload.id;
    const body = await request.json();
    const { courseId, score } = body;

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // Get course details
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if already completed
    const existingProgress = await prisma.userCourseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId
        }
      }
    });

    if (existingProgress?.completedAt) {
      return NextResponse.json({ 
        success: true, 
        message: "Course already completed",
        alreadyCompleted: true 
      });
    }

    // Calculate coins earned
    const meetsRequirement = score >= course.requiredScore;
    const coinsEarned = meetsRequirement ? course.coinsReward : Math.floor(course.coinsReward / 2);

    // Update or create progress
    const progress = await prisma.userCourseProgress.upsert({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId
        }
      },
      update: {
        completedAt: new Date(),
        score: score,
        coinsEarned: coinsEarned
      },
      create: {
        userId: userId,
        courseId: courseId,
        completedAt: new Date(),
        score: score,
        coinsEarned: coinsEarned
      }
    });

    // Update user's coin balance
    await prisma.user.update({
      where: { id: userId },
      data: {
        nthoppaCoins: {
          increment: coinsEarned
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: meetsRequirement ? "Course completed! Coins awarded." : "Course completed with partial score.",
      coinsEarned: coinsEarned,
      completed: true
    });
  } catch (error) {
    console.error('🔴 POST /api/courses error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}