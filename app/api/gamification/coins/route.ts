import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, TokenPayload } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { GamificationEngine, ACHIEVEMENTS } from '@/lib/gamification';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken<TokenPayload>(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (payload.role !== 'agent') {
      // For client role, get user coins
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
        select: {
          nthoppaCoins: true,
          fullName: true,
          courseProgress: {
            where: { coinsEarned: { gt: 0 } },
            orderBy: { completedAt: 'desc' },
            take: 20
          }
        }
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const coinHistory = user.courseProgress.map(progress => ({
        id: progress.id,
        amount: progress.coinsEarned,
        type: 'course_completion',
        description: 'Completed a course',
        createdAt: progress.completedAt,
        metadata: { courseId: progress.courseId, score: progress.score }
      }));

      return NextResponse.json({
        success: true,
        balance: user.nthoppaCoins || 0,
        history: coinHistory,
        userRole: 'client'
      });
    }

    // Agent role
    const agent = await prisma.agent.findFirst({
      where: { loginEmail: payload.email },
      include: {
        achievements: true,
        users: true,
        communications: true,
        gamificationEvents: {
          orderBy: { createdAt: 'desc' },
          take: 20
        }
      }
    });
    
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    
    // Calculate stats
    const stats = {
      usersRegistered: agent.users.length,
      completionRate: agent.users.reduce((sum: number, u: any) => sum + (u.completionRate || 0), 0) / (agent.users.length || 1),
      streakDays: agent.streakDays || 0,
      totalSavings: agent.totalSavingsGenerated || 0
    };
    
    const newAchievements = await GamificationEngine.checkAchievements(agent.id, stats);
    const levelInfo = GamificationEngine.calculateLevel(agent.nthoppaCoins || 0);
    
    // Format coin history
    const coinHistory = (agent.gamificationEvents || []).map(event => ({
      id: event.id,
      amount: event.coinsEarned,
      type: event.eventType,
      description: getEventDescription(event.eventType),
      createdAt: event.createdAt,
      metadata: event.metadata ? JSON.parse(event.metadata) : null
    }));
    
    return NextResponse.json({
      success: true,
      coins: agent.nthoppaCoins || 0,
      level: levelInfo.level,
      nextLevelCoins: levelInfo.nextLevelCoins,
      progress: levelInfo.progress,
      achievements: agent.achievements,
      newAchievements,
      leaderboardRank: agent.leaderboardRank || 0,
      history: coinHistory,
      userRole: 'agent'
    });
  } catch (error) {
    console.error('🔴 Gamification GET error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken<TokenPayload>(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    
    const { action, coins, reason } = await request.json();
    
    if (!action || !coins) {
      return NextResponse.json({ error: "Action and coins are required" }, { status: 400 });
    }

    let newBalance = 0;

    if (payload.role === 'agent') {
      const agent = await prisma.agent.findFirst({
        where: { loginEmail: payload.email }
      });

      if (!agent) {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
      }

      if (action === 'earn') {
        newBalance = (agent.nthoppaCoins || 0) + coins;
        await prisma.agent.update({
          where: { id: agent.id },
          data: {
            nthoppaCoins: newBalance,
            gamificationEvents: {
              create: {
                eventType: reason || 'manual_earn',
                coinsEarned: coins,
                metadata: JSON.stringify({ reason, timestamp: new Date().toISOString() })
              }
            }
          }
        });
      } else if (action === 'redeem') {
        if ((agent.nthoppaCoins || 0) < coins) {
          return NextResponse.json({ error: "Insufficient coins" }, { status: 400 });
        }
        newBalance = (agent.nthoppaCoins || 0) - coins;
        await prisma.agent.update({
          where: { id: agent.id },
          data: {
            nthoppaCoins: newBalance,
            gamificationEvents: {
              create: {
                eventType: 'redeem',
                coinsEarned: -coins,
                metadata: JSON.stringify({ reason, timestamp: new Date().toISOString() })
              }
            }
          }
        });
      }
    } else {
      // Client role
      const user = await prisma.user.findUnique({
        where: { email: payload.email }
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      if (action === 'earn') {
        newBalance = (user.nthoppaCoins || 0) + coins;
        await prisma.user.update({
          where: { id: user.id },
          data: { nthoppaCoins: newBalance }
        });
      } else if (action === 'redeem') {
        if ((user.nthoppaCoins || 0) < coins) {
          return NextResponse.json({ error: "Insufficient coins" }, { status: 400 });
        }
        newBalance = (user.nthoppaCoins || 0) - coins;
        await prisma.user.update({
          where: { id: user.id },
          data: { nthoppaCoins: newBalance }
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      newBalance: newBalance,
      action: action,
      amount: coins
    });
  } catch (error) {
    console.error('🔴 Gamification POST error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Helper function to get event descriptions
function getEventDescription(eventType: string): string {
  const descriptions: Record<string, string> = {
    user_registered: "Registered a new user",
    completion_milestone: "Reached completion milestone",
    streak_bonus: "Daily streak bonus",
    manual_earn: "Bonus coins earned",
    redeem: "Coins redeemed for reward",
    course_completion: "Completed a course",
    manual_add: "Coins added manually"
  };
  return descriptions[eventType] || "Coin transaction";
}