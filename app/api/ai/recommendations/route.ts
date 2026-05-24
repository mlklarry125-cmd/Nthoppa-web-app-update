import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, TokenPayload } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { AIFinancialAdvisor, UserFinancialProfile } from '@/lib/ai-financial-advisor';

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

    // For agents: look up the agent and their users' aggregate profile
    if (payload.role === 'agent') {
      const agent = await prisma.agent.findFirst({
        where: { loginEmail: payload.email },
        include: {
          users: {
            include: {
              financialProfile: true,
              transactions: { take: 10, orderBy: { date: 'desc' } }
            }
          }
        }
      });

      if (!agent) {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
      }

      // Use the first user's financial profile for recommendations, or defaults
      const firstUserWithProfile = agent.users.find((u: any) => u.financialProfile);
      const profile = firstUserWithProfile?.financialProfile;
      const transactions = firstUserWithProfile?.transactions || [];

      // Parse products if it's a string (JSON), otherwise use empty array
      let existingProducts: string[] = [];
      if (profile?.products) {
        if (typeof profile.products === 'string') {
          try {
            existingProducts = JSON.parse(profile.products);
          } catch {
            existingProducts = [];
          }
        } else if (Array.isArray(profile.products)) {
          existingProducts = profile.products;
        }
      }

      const financialProfile: UserFinancialProfile = {
        userId: payload.id,
        monthlyIncome: profile?.monthlyIncome ?? 0,
        employmentStatus: profile?.employmentStatus ?? 'unknown',
        savingsGoal: profile?.savingsGoal ?? undefined,
        riskTolerance: (profile?.riskTolerance as 'low' | 'medium' | 'high') || 'medium',
        financialLiteracyScore: profile?.literacyScore ?? 30,
        existingProducts: existingProducts,
        spendingPatterns: transactions.map((t: any) => ({
          category: t.category || 'other',
          percentage: t.percentageOfIncome || 0,
          trend: (t.trend as 'increasing' | 'decreasing' | 'stable') || 'stable'
        }))
      };

      const recommendations = await AIFinancialAdvisor.getPersonalizedRecommendations(financialProfile);
      const insights = await AIFinancialAdvisor.analyzeSpendingHabits(financialProfile.spendingPatterns);

      return NextResponse.json({
        success: true,
        recommendations,
        insights,
        literacyScore: financialProfile.financialLiteracyScore
      });
    }

    // For client role: get client data
    if (payload.role === 'client') {
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
        include: {
          financialProfile: true,
          transactions: { take: 10, orderBy: { date: 'desc' } }
        }
      });

      if (user && user.financialProfile) {
        let existingProducts: string[] = [];
        if (user.financialProfile.products) {
          if (typeof user.financialProfile.products === 'string') {
            try {
              existingProducts = JSON.parse(user.financialProfile.products);
            } catch {
              existingProducts = [];
            }
          } else if (Array.isArray(user.financialProfile.products)) {
            existingProducts = user.financialProfile.products;
          }
        }

        const financialProfile: UserFinancialProfile = {
          userId: user.id,
          monthlyIncome: user.financialProfile.monthlyIncome ?? 0,
          employmentStatus: user.financialProfile.employmentStatus ?? 'unknown',
          savingsGoal: user.financialProfile.savingsGoal ?? undefined,
          riskTolerance: (user.financialProfile.riskTolerance as 'low' | 'medium' | 'high') || 'medium',
          financialLiteracyScore: user.financialProfile.literacyScore ?? 30,
          existingProducts: existingProducts,
          spendingPatterns: user.transactions.map((t: any) => ({
            category: t.category || 'other',
            percentage: t.percentageOfIncome || 0,
            trend: (t.trend as 'increasing' | 'decreasing' | 'stable') || 'stable'
          }))
        };

        const recommendations = await AIFinancialAdvisor.getPersonalizedRecommendations(financialProfile);
        const insights = await AIFinancialAdvisor.analyzeSpendingHabits(financialProfile.spendingPatterns);

        return NextResponse.json({
          success: true,
          recommendations,
          insights,
          literacyScore: financialProfile.financialLiteracyScore
        });
      }
    }

    // For other roles or fallback: return generic recommendations
    const genericProfile: UserFinancialProfile = {
      userId: payload.id,
      monthlyIncome: 0,
      employmentStatus: 'unknown',
      savingsGoal: undefined,
      riskTolerance: 'medium',
      financialLiteracyScore: 30,
      existingProducts: [],
      spendingPatterns: []
    };

    const recommendations = await AIFinancialAdvisor.getPersonalizedRecommendations(genericProfile);
    const insights = await AIFinancialAdvisor.analyzeSpendingHabits([]);

    return NextResponse.json({
      success: true,
      recommendations,
      insights,
      literacyScore: genericProfile.financialLiteracyScore
    });
  } catch (error) {
    console.error('🔴 GET /api/ai/recommendations error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}