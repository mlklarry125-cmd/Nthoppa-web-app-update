"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3, TrendingUp, Users, CheckCircle, Shield,
  CreditCard, Building2, Store, Target, ChevronLeft
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// iPachi spelling fixed throughout
const iPachiData = {
  totalProfiles: 8940,
  avgScore: 477,
  paymentReady: 42,
  distribution: [
    { band: "Low Risk", pct: 28, count: 2503, color: "bg-green-500" },
    { band: "Medium Risk", pct: 35, count: 3129, color: "bg-yellow-500" },
    { band: "High Risk", pct: 37, count: 3308, color: "bg-red-500" },
  ]
};

const creditYameData = {
  totalProfiles: 4230,
  avgScore: 703,
  approvalRate: 68,
  distribution: [
    { band: "Excellent (750+)", pct: 22, count: 931, color: "bg-green-500" },
    { band: "Good (650-749)", pct: 38, count: 1607, color: "bg-blue-500" },
    { band: "Fair (500-649)", pct: 28, count: 1184, color: "bg-yellow-500" },
    { band: "Poor (<500)", pct: 12, count: 508, color: "bg-red-500" },
  ]
};

const behaviourMetrics = [
  { label: "Savings Consistency", pct: 82, icon: "🏦" },
  { label: "Income Patterns", pct: 74, icon: "📊" },
  { label: "Financial Discipline", pct: 68, icon: "🎯" },
  { label: "Transaction History", pct: 66, icon: "💳" },
];

export default function CreditScoringPage() {
  const router = useRouter();
  const { toast } = useToast();

  const getScoreColor = (score: number) => {
    if (score >= 700) return "text-green-600";
    if (score >= 600) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        <div>
          <h1 className="text-2xl font-black text-black">Credit Scoring</h1>
          <p className="text-gray-500 mt-1">Alternative credit assessment for underserved segments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Credit Profiles", value: "13,170", change: "+8%", icon: Users, color: "bg-orange-500" },
            { title: "Formal Avg Score", value: "703", change: "+12", icon: Building2, color: "bg-blue-500" },
            { title: "Informal Avg Score", value: "477", change: "+23", icon: Store, color: "bg-purple-500" },
            { title: "Loan Eligibility", value: "42%", change: "+5%", icon: Target, color: "bg-green-500" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-5 w-5 ${stat.color.replace("bg-", "text-")}`} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#FF6B35]" />
                CreditYame — Formal Sector
              </CardTitle>
              <CardDescription>Traditional credit scoring for salaried employees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-[#FF6B35]">{creditYameData.totalProfiles.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Profiles</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className={`text-2xl font-bold ${getScoreColor(creditYameData.avgScore)}`}>{creditYameData.avgScore}</p>
                  <p className="text-xs text-gray-500">Average Score</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{creditYameData.approvalRate}%</p>
                  <p className="text-xs text-gray-500">Approval Rate</p>
                </div>
              </div>
              <div className="space-y-3">
                {creditYameData.distribution.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{item.band}</span>
                      <span className="font-medium">{item.pct}% ({item.count.toLocaleString()})</span>
                    </div>
                    <Progress value={item.pct} className={`h-2 ${item.color}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Store className="h-5 w-5 text-[#FF6B35]" />
                iPachi — Informal Sector
              </CardTitle>
              <CardDescription>Alternative data scoring for informal traders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-[#FF6B35]">{iPachiData.totalProfiles.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Traders</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className={`text-2xl font-bold ${getScoreColor(iPachiData.avgScore)}`}>{iPachiData.avgScore}</p>
                  <p className="text-xs text-gray-500">Average Score</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{iPachiData.paymentReady}%</p>
                  <p className="text-xs text-gray-500">Payment Ready</p>
                </div>
              </div>
              <div className="space-y-3">
                {iPachiData.distribution.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{item.band}</span>
                      <span className="font-medium">{item.pct}% ({item.count.toLocaleString()})</span>
                    </div>
                    <Progress value={item.pct} className={`h-2 ${item.color}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#FF6B35]" />
              Behavioural Credit Metrics
            </CardTitle>
            <CardDescription>Alternative data points used for credit assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {behaviourMetrics.map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{metric.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    </div>
                    <span className="text-sm font-bold text-[#FF6B35]">{metric.pct}%</span>
                  </div>
                  <Progress value={metric.pct} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gradient-to-r from-blue-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-black text-lg">Small-Ticket Lending</h3>
                <p className="text-gray-600 text-sm max-w-md">
                  Combined credit assessment from CreditYame and iPachi enables responsible unsecured lending to previously excluded segments.
                </p>
              </div>
              <Badge className="bg-[#FF6B35] text-white px-4 py-2">Coming Soon</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}