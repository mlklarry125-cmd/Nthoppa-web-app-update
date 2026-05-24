"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  PiggyBank,
  TrendingUp,
  Shield,
  GraduationCap,
  CreditCard,
  Lightbulb,
  Target,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Recommendation {
  type: string;
  title: string;
  description: string;
  impact: string;
  priority: string;
  estimatedReturn?: string;
  riskLevel?: string;
  actionUrl: string;
}

interface AIAdvisorData {
  recommendations: Recommendation[];
  insights: string[];
  literacyScore: number;
}

// Fallback data when API fails
const fallbackData: AIAdvisorData = {
  literacyScore: 65,
  insights: [
    "You're saving consistently! Consider increasing your monthly savings by 10% to reach your goals faster.",
    "Your credit score has room for improvement. Paying bills on time could boost it by 15-20 points.",
    "Based on your spending pattern, you could save an additional P500 per month by reducing dining out."
  ],
  recommendations: [
    {
      type: "savings",
      title: "Increase Emergency Fund",
      description: "Build a 3-6 month emergency fund to protect against unexpected expenses.",
      impact: "High",
      priority: "high",
      estimatedReturn: "P5,000 - P15,000",
      riskLevel: "Low",
      actionUrl: "/client/savings"
    },
    {
      type: "investment",
      title: "Start Micro-Investing",
      description: "Begin investing with small amounts to build long-term wealth.",
      impact: "Medium",
      priority: "medium",
      estimatedReturn: "8-12% annually",
      riskLevel: "Medium",
      actionUrl: "/client/investments"
    },
    {
      type: "insurance",
      title: "Review Insurance Coverage",
      description: "Ensure you have adequate protection for your family and assets.",
      impact: "High",
      priority: "high",
      estimatedReturn: "Peace of mind",
      riskLevel: "Low",
      actionUrl: "/client/marketplace"
    },
    {
      type: "credit",
      title: "Improve Credit Score",
      description: "Take steps to build your credit history for better loan terms.",
      impact: "Medium",
      priority: "medium",
      estimatedReturn: "Better interest rates",
      riskLevel: "Low",
      actionUrl: "/client/credit-scoring"
    }
  ]
};

const typeIcons: Record<string, any> = {
  savings: PiggyBank,
  investment: TrendingUp,
  insurance: Shield,
  education: GraduationCap,
  credit: CreditCard,
};

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

export default function AIAdvisorPage() {
  const router = useRouter();
  const [data, setData] = useState<AIAdvisorData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const response = await fetch('/api/ai/recommendations');
      const result = await response.json();
      // Check if the response has the expected structure
      if (result && typeof result === 'object') {
        setData({
          literacyScore: result.literacyScore || 65,
          insights: Array.isArray(result.insights) ? result.insights : fallbackData.insights,
          recommendations: Array.isArray(result.recommendations) ? result.recommendations : fallbackData.recommendations
        });
      } else {
        console.warn('API returned invalid data, using fallback');
        setData(fallbackData);
      }
    } catch (error) {
      console.error('Failed to load AI recommendations:', error);
      setData(fallbackData);
      toast({
        title: "Using Demo Data",
        description: "AI recommendations are currently in demo mode with sample data.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout type="agent">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mx-auto"></div>
            <p className="mt-4 text-gray-600">AI Advisor is analyzing your financial profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const displayData = data || fallbackData;

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2 flex items-center gap-2">
              <Brain className="h-8 w-8 text-[#FF6B35]" />
              AI Financial Advisor
            </h1>
            <p className="text-gray-600">Personalized recommendations powered by artificial intelligence</p>
          </div>
        </div>

        {/* Financial Literacy Score */}
        <Card className="border-gray-200 bg-gradient-to-r from-[#FF6B35]/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-semibold text-black">Your Financial Literacy Score</h3>
                <p className="text-sm text-gray-500">Based on your activity and assessments</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#FF6B35]">{displayData.literacyScore}%</div>
                  <p className="text-xs text-gray-500">Proficiency Level</p>
                </div>
                <div className="w-32">
                  <Progress value={displayData.literacyScore} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        {displayData.insights && displayData.insights.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-[#FF6B35]" />
              AI Insights
            </h2>
            <div className="space-y-2">
              {displayData.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800"
                >
                  💡 {insight}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div>
          <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-[#FF6B35]" />
            Personalized Recommendations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {displayData.recommendations && displayData.recommendations.length > 0 ? (
              displayData.recommendations.map((rec, index) => {
                const Icon = typeIcons[rec.type] || TrendingUp;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => window.location.href = rec.actionUrl}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-[#FF6B35]/10 rounded-lg">
                            <Icon className="h-6 w-6 text-[#FF6B35]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-black">{rec.title}</h3>
                              <Badge className={priorityColors[rec.priority]}>
                                {rec.priority.toUpperCase()} Priority
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                            <div className="flex items-center gap-3 text-xs">
                              {rec.estimatedReturn && (
                                <span className="text-green-600">📈 {rec.estimatedReturn}</span>
                              )}
                              {rec.riskLevel && (
                                <span className="text-orange-600">⚠️ {rec.riskLevel} Risk</span>
                              )}
                              <span className="text-[#FF6B35]">💪 Impact: {rec.impact}</span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                <Brain className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No recommendations available at this time.</p>
                <p className="text-sm">Complete more financial activities to get personalized advice.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}