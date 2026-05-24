"use client";

import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Shield, Globe, Building2, Target, Zap, Award, DollarSign, BarChart3 } from "lucide-react";

export default function InvestorOverviewPage() {
  const router = useRouter();
  const metrics = [
    { label: "Total Addressable Market", value: "1.2M", sub: "Unbanked adults in Botswana", icon: <Globe className="h-5 w-5 text-white" />, bg: "bg-blue-600" },
    { label: "Users Onboarded (Demo)", value: "847", sub: "Across 3 territories", icon: <Users className="h-5 w-5 text-white" />, bg: "bg-[#FF6B35]" },
    { label: "Active Field Agents", value: "24", sub: "Gaborone, Francistown, Serowe", icon: <Award className="h-5 w-5 text-white" />, bg: "bg-green-600" },
    { label: "Financial Products Live", value: "9", sub: "Via 5 partner integrations", icon: <Zap className="h-5 w-5 text-white" />, bg: "bg-purple-600" },
  ];

  const pillars = [
    { title: "Financial Literacy Engine", desc: "Gamified financial education with measurable literacy score improvement. 68% avg score vs 42% baseline.", progress: 68, color: "bg-blue-500" },
    { title: "Behavioural Data Layer", desc: "Proprietary savings consistency, income tracking, and risk profiling data unavailable from traditional lenders.", progress: 74, color: "bg-[#FF6B35]" },
    { title: "Credit Scoring Pipeline", desc: "CreditYame (formal) + iPachi (informal) integration providing credit access to 115 eligible users.", progress: 55, color: "bg-green-500" },
    { title: "SMME Development", desc: "211 users tracked across 5 pipeline stages from unbanked to enterprise banking ready.", progress: 42, color: "bg-purple-500" },
    { title: "Community Savings (Motshelo)", desc: "Digital transformation of traditional savings groups with real-time tracking and payout management.", progress: 81, color: "bg-yellow-500" },
    { title: "Partner Ecosystem", desc: "Liberty, Hollard, CreditYame, iPachi, Stanbic, Old Mutual — 6 active partners, more in pipeline.", progress: 60, color: "bg-teal-500" },
  ];

  const stanbicPillars = [
    { title: "Customer Readiness", desc: "Upstream financial literacy layer prepares users for Instant Money Wallet and transactional accounts." },
    { title: "Alternative Credit Data", desc: "Savings consistency + income patterns supplement formal credit scoring for unsecured lending." },
    { title: "SMME Pipeline", desc: "Informal traders tracked and graduated toward Stanbic Business Banking over time." },
    { title: "Accelerate Incubator", desc: "Pre-qualifies entrepreneurs with financial discipline metrics before programme entry." },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#FF6B35] hover:text-[#e55a2b] font-medium mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
        {/* Header */}
        <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35]/10 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10">
            <Badge className="bg-[#FF6B35] text-white mb-4">Investor Overview</Badge>
            <h1 className="text-4xl font-bold mb-2">Nthoppa Financial</h1>
            <p className="text-gray-300 text-lg max-w-2xl">A financial operating system for the underserved — combining financial literacy, behavioural data, credit scoring, and a fintech marketplace to bank the unbanked in Botswana and beyond.</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map(m => (
            <Card key={m.label} className="border-gray-200">
              <CardContent className="p-5">
                <div className={`w-10 h-10 ${m.bg} rounded-lg flex items-center justify-center mb-3`}>{m.icon}</div>
                <p className="text-3xl font-bold text-black">{m.value}</p>
                <p className="text-sm font-medium text-black mt-1">{m.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 6 Strategic Pillars */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-4">6 Strategic Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map(p => (
              <Card key={p.title} className="border-gray-200">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-black mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{p.desc}</p>
                  <div className="flex items-center gap-2">
                    <Progress value={p.progress} className="h-2 flex-1" />
                    <span className="text-xs font-medium text-gray-600">{p.progress}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stanbic Partnership */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            Stanbic Bank Partnership — 4 Strategic Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stanbicPillars.map(p => (
              <Card key={p.title} className="border-blue-200 bg-blue-50">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">{p.title}</h3>
                      <p className="text-sm text-gray-600">{p.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Revenue Model */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-[#FF6B35]" />Revenue Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { stream: "Agent Subscription", desc: "Monthly SaaS fee per active agent", model: "BWP 250/agent/month", stage: "Active" },
                { stream: "Partner Referral Commission", desc: "Commission on successful product referrals (insurance, loans, savings)", model: "5–15% per conversion", stage: "Active" },
                { stream: "Data Insights API", desc: "Anonymised behavioural data sold to financial institutions", model: "BWP 5–20 per user/month", stage: "Pipeline" },
              ].map(r => (
                <div key={r.stream} className="p-4 bg-gray-50 rounded-xl">
                  <Badge className={r.stage === 'Active' ? 'bg-green-100 text-green-700 mb-2' : 'bg-yellow-100 text-yellow-700 mb-2'}>{r.stage}</Badge>
                  <h3 className="font-semibold text-black">{r.stream}</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-2">{r.desc}</p>
                  <p className="text-sm font-medium text-[#FF6B35]">{r.model}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Metrics */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-[#FF6B35]" />Growth Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { metric: "User Growth (MoM)", value: "+18%", target: "+25%" },
                { metric: "Literacy Improvement", value: "+12pts", target: "+15pts" },
                { metric: "Partner Integration", value: "6/10", target: "10 by Q4" },
                { metric: "Revenue Growth", value: "+22%", target: "+30%" },
              ].map(g => (
                <div key={g.metric} className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">{g.metric}</p>
                  <p className="text-xl font-bold text-[#FF6B35]">{g.value}</p>
                  <p className="text-xs text-gray-400">Target: {g.target}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}