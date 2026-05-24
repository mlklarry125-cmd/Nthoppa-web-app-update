// AI-powered financial recommendation engine
// Note: This uses rule-based system initially, can be upgraded to ML later

export interface UserFinancialProfile {
  userId: string;
  monthlyIncome: number;
  employmentStatus: string;
  savingsGoal?: number;
  riskTolerance: 'low' | 'medium' | 'high';
  financialLiteracyScore: number; // 0-100
  existingProducts: string[];
  spendingPatterns?: SpendingPattern[];
}

export interface SpendingPattern {
  category: string;
  percentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface FinancialRecommendation {
  type: 'savings' | 'investment' | 'insurance' | 'credit' | 'education';
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  estimatedReturn?: string;
  riskLevel?: string;
  actionUrl: string;
}

export class AIFinancialAdvisor {
  
  static async getPersonalizedRecommendations(
    profile: UserFinancialProfile
  ): Promise<FinancialRecommendation[]> {
    const recommendations: FinancialRecommendation[] = [];
    
    // Rule-based recommendation engine
    // 1. Savings recommendations
    if (profile.savingsGoal && profile.monthlyIncome > 0) {
      const savingsPotential = profile.monthlyIncome * 0.2;
      if (savingsPotential > 0) {
        recommendations.push({
          type: 'savings',
          title: 'Automated Savings Plan',
          description: `Save ${this.formatCurrency(savingsPotential)} monthly to reach your goal of ${this.formatCurrency(profile.savingsGoal)}`,
          impact: 'Build emergency fund and achieve financial goals',
          priority: 'high',
          estimatedReturn: '5-8% annual interest',
          actionUrl: '/dashboard/savings/goal-setting'
        });
      }
    }
    
    // 2. Investment recommendations based on risk tolerance
    if (profile.riskTolerance === 'high') {
      recommendations.push({
        type: 'investment',
        title: 'Growth Investment Portfolio',
        description: 'High-growth stocks and ETFs for long-term wealth building',
        impact: 'Potential 12-15% annual returns',
        priority: 'medium',
        riskLevel: 'High',
        estimatedReturn: '12-15%',
        actionUrl: '/dashboard/investments/growth'
      });
    } else if (profile.riskTolerance === 'medium') {
      recommendations.push({
        type: 'investment',
        title: 'Balanced Investment Fund',
        description: 'Mix of stocks and bonds for steady growth',
        impact: '8-10% annual returns with moderate risk',
        priority: 'medium',
        riskLevel: 'Medium',
        estimatedReturn: '8-10%',
        actionUrl: '/dashboard/investments/balanced'
      });
    } else {
      recommendations.push({
        type: 'investment',
        title: 'Conservative Savings Bonds',
        description: 'Government bonds and fixed deposits',
        impact: '5-7% guaranteed returns',
        priority: 'medium',
        riskLevel: 'Low',
        estimatedReturn: '5-7%',
        actionUrl: '/dashboard/investments/conservative'
      });
    }
    
    // 3. Financial education based on literacy score
    if (profile.financialLiteracyScore < 50) {
      recommendations.push({
        type: 'education',
        title: 'Financial Literacy Course',
        description: 'Learn budgeting, saving, and investing basics',
        impact: 'Improve financial decision-making',
        priority: 'high',
        actionUrl: '/dashboard/education/basics'
      });
    }
    
    // 4. Insurance recommendations
    if (!profile.existingProducts.includes('insurance')) {
      recommendations.push({
        type: 'insurance',
        title: 'Affordable Life Insurance',
        description: 'Protect your family with our low-cost coverage',
        impact: 'Financial security for dependents',
        priority: 'medium',
        actionUrl: '/dashboard/insurance/life'
      });
    }
    
    // 5. Credit building
    if (profile.financialLiteracyScore > 60 && profile.monthlyIncome > 3000) {
      recommendations.push({
        type: 'credit',
        title: 'Credit Builder Loan',
        description: 'Build credit history while saving',
        impact: 'Improve credit score for future loans',
        priority: 'low',
        estimatedReturn: 'Builds credit history',
        actionUrl: '/dashboard/credit/builder'
      });
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
  
  static async analyzeSpendingHabits(
    patterns: SpendingPattern[] = []
  ): Promise<string[]> {
    const insights: string[] = [];
    
    for (const pattern of patterns) {
      if (pattern.percentage > 40 && pattern.trend === 'increasing') {
        insights.push(`Your ${pattern.category} spending is high and increasing. Consider setting a budget limit.`);
      } else if (pattern.percentage < 10 && pattern.category === 'savings') {
        insights.push(`You're saving less than 10% of income. Aim for 20% to build wealth faster.`);
      }
    }
    
    if (insights.length === 0) {
      insights.push('Your spending habits look healthy. Keep up the good work!');
    }
    
    return insights;
  }
  
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-BW', {
      style: 'currency',
      currency: 'BWP'
    }).format(amount);
  }
}