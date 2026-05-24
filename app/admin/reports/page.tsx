"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  Download, FileText, TrendingUp, Users, DollarSign,
  BarChart3, Calendar, Filter, ChevronLeft, ArrowUp, ArrowDown,
  Shield, Building2, CreditCard, Award,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ORANGE = "#FF6B35";

// ── Mock data ─────────────────────────────────────────────────────────────────
const monthlyGrowth = [
  { month: "Oct", users: 18200, agents: 980, revenue: 198 },
  { month: "Nov", users: 19400, agents: 1040, revenue: 215 },
  { month: "Dec", users: 20100, agents: 1090, revenue: 224 },
  { month: "Jan", users: 21300, agents: 1140, revenue: 241 },
  { month: "Feb", users: 22800, agents: 1190, revenue: 261 },
  { month: "Mar", users: 24891, agents: 1245, revenue: 284 },
];

const registrationsByRole = [
  { month: "Oct", clients: 820, agents: 42, merchants: 18 },
  { month: "Nov", month2: "Nov", clients: 910, agents: 48, merchants: 22 },
  { month: "Dec", clients: 870, agents: 38, merchants: 19 },
  { month: "Jan", clients: 1020, agents: 55, merchants: 28 },
  { month: "Feb", clients: 1140, agents: 61, merchants: 31 },
  { month: "Mar", clients: 1280, agents: 72, merchants: 38 },
];

const creditDistribution = [
  { name: "Excellent (750+)", value: 22, color: "#22c55e" },
  { name: "Good (650–749)", value: 38, color: ORANGE },
  { name: "Fair (500–649)", value: 28, color: "#eab308" },
  { name: "Poor (<500)", value: 12, color: "#ef4444" },
];

const smePipelineData = [
  { stage: "Informal Traders", count: 12480, color: ORANGE },
  { stage: "Qualified Skills", count: 5240, color: "#fb923c" },
  { stage: "Business Banking Ready", count: 863, color: "#fbbf24" },
  { stage: "Enterprise", count: 218, color: "#a3e635" },
];

const revenueBreakdown = [
  { name: "Insurance Premiums", value: 142, color: ORANGE },
  { name: "Stanbic Referrals", value: 68, color: "#3b82f6" },
  { name: "Marketplace Fees", value: 44, color: "#8b5cf6" },
  { name: "Platform Services", value: 30, color: "#22c55e" },
];

const kpis = [
  { label: "Total Users", value: "24,891", change: "+18%", up: true, icon: Users, color: "bg-orange-500" },
  { label: "Platform Revenue", value: "BWP 284K", change: "+23%", up: true, icon: DollarSign, color: "bg-blue-500" },
  { label: "Active Agents", value: "1,245", change: "+12%", up: true, icon: Award, color: "bg-green-500" },
  { label: "SME Pipeline", value: "863", change: "+34%", up: true, icon: Building2, color: "bg-purple-500" },
  { label: "Credit Profiles", value: "6,120", change: "+9%", up: true, icon: CreditCard, color: "bg-amber-500" },
  { label: "Avg Credit Score", value: "712", change: "+5pts", up: true, icon: BarChart3, color: "bg-teal-500" },
  { label: "NthoppaSure Policies", value: "3,240", change: "+15%", up: true, icon: Shield, color: "bg-rose-500" },
  { label: "Stanbic Conversions", value: "25", change: "+4 this month", up: true, icon: TrendingUp, color: "bg-indigo-500" },
];

const reportTypes = [
  { id: "user-growth", label: "User Growth Report", desc: "Monthly registrations by role and region", icon: "👥" },
  { id: "revenue", label: "Revenue Report", desc: "Platform revenue breakdown by product category", icon: "💰" },
  { id: "credit", label: "Credit Scoring Report", desc: "Alternative data scoring distribution and trends", icon: "📊" },
  { id: "sme", label: "SME Pipeline Report", desc: "Informal trader to business banking conversion", icon: "🏦" },
  { id: "stanbic", label: "Stanbic Partnership Report", desc: "Referrals, conversions, and pipeline metrics", icon: "🤝" },
  { id: "agents", label: "Agent Performance Report", desc: "Agent registrations, activity, and commissions", icon: "🏆" },
];

export default function AdminReportsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [period, setPeriod] = useState("6months");
  const [activeTab, setActiveTab] = useState("overview");

  const handleExport = (type: string) => {
    toast({
      title: "Export Started",
      description: `${type} is being generated and will download shortly.`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Platform Reports</h1>
            <p className="text-gray-400 text-sm mt-1">Analytics, exports and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-600 bg-white focus:outline-none focus:border-[#FF6B35]"
            >
              <option value="30days">Last 30 days</option>
              <option value="3months">Last 3 months</option>
              <option value="6months">Last 6 months</option>
              <option value="1year">Last year</option>
            </select>
            <button
              onClick={() => handleExport("Full Platform Report")}
              className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#c44216] text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
            >
              <Download className="h-4 w-4" />
              Export All
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {["overview", "growth", "revenue", "exports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                activeTab === tab
                  ? "bg-white text-[#FF6B35] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kpis.map((kpi, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-xl ${kpi.color} bg-opacity-10`}>
                      <kpi.icon className={`h-4 w-4 ${kpi.color.replace("bg-", "text-")}`} />
                    </div>
                    <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${kpi.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                      {kpi.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-xl font-black text-gray-900">{kpi.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{kpi.label}</p>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* User growth */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">User Growth</h3>
                    <p className="text-gray-400 text-xs">Total registered users over time</p>
                  </div>
                  <button onClick={() => handleExport("User Growth CSV")} className="text-xs text-[#FF6B35] hover:underline flex items-center gap-1"><Download className="h-3 w-3" />Export</button>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={monthlyGrowth}>
                    <defs>
                      <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={ORANGE} stopOpacity={0.15} />
                        <stop offset="95%" stopColor={ORANGE} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [v.toLocaleString(), "Users"]} />
                    <Area type="monotone" dataKey="users" stroke={ORANGE} strokeWidth={2} fill="url(#userGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Revenue (BWP K)</h3>
                    <p className="text-gray-400 text-xs">Monthly platform revenue</p>
                  </div>
                  <button onClick={() => handleExport("Revenue CSV")} className="text-xs text-[#FF6B35] hover:underline flex items-center gap-1"><Download className="h-3 w-3" />Export</button>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}K`} />
                    <Tooltip formatter={(v: number) => [`BWP ${v}K`, "Revenue"]} />
                    <Bar dataKey="revenue" fill={ORANGE} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Credit + SME row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Credit distribution */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm mb-1">Credit Score Distribution</h3>
                <p className="text-gray-400 text-xs mb-4">6,120 active credit profiles</p>
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie data={creditDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                        {creditDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {creditDistribution.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-800">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SME pipeline funnel */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm mb-1">SME Pipeline Funnel</h3>
                <p className="text-gray-400 text-xs mb-4">Informal to business banking conversion</p>
                <div className="space-y-3">
                  {smePipelineData.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-600">{item.stage}</span>
                        <span className="text-xs font-bold text-gray-800">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${(item.count / 12480) * 100}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Overall conversion: <span className="font-bold text-[#FF6B35]">6.9%</span> informal → business banking</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── GROWTH TAB ── */}
        {activeTab === "growth" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">Registrations by Role</h3>
                  <p className="text-gray-400 text-xs">Monthly breakdown of new users per role</p>
                </div>
                <button onClick={() => handleExport("Registrations CSV")} className="flex items-center gap-1.5 text-xs text-[#FF6B35] hover:underline">
                  <Download className="h-3 w-3" /> Export CSV
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={registrationsByRole}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="clients" name="Clients" fill={ORANGE} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="agents" name="Agents" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="merchants" name="Merchants" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">Agent Network Growth</h3>
                  <p className="text-gray-400 text-xs">Active agents registered on the platform</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: number) => [v.toLocaleString(), "Agents"]} />
                  <Line type="monotone" dataKey="agents" stroke={ORANGE} strokeWidth={3} dot={{ fill: ORANGE, strokeWidth: 2, r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── REVENUE TAB ── */}
        {activeTab === "revenue" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-1">Revenue by Product (BWP K)</h3>
                <p className="text-gray-400 text-xs mb-4">March 2026 breakdown</p>
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                        {revenueBreakdown.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-3">
                    {revenueBreakdown.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-xs font-bold">BWP {item.value}K</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-xs font-bold text-gray-700">Total</span>
                        <span className="text-xs font-black text-[#FF6B35]">BWP 284K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-1">Revenue Trend</h3>
                <p className="text-gray-400 text-xs mb-4">6-month platform revenue</p>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={monthlyGrowth}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={ORANGE} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={ORANGE} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}K`} />
                    <Tooltip formatter={(v: number) => [`BWP ${v}K`, "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke={ORANGE} strokeWidth={2.5} fill="url(#revGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stanbic partnership summary */}
            <div className="bg-[#0a0a0a] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white">Stanbic Partnership Revenue</h3>
                  <p className="text-white/40 text-xs">Referral conversions and estimated lifetime value</p>
                </div>
                <button onClick={() => handleExport("Stanbic Report PDF")} className="flex items-center gap-1.5 text-xs bg-[#FF6B35] text-white px-3 py-1.5 rounded-lg hover:bg-[#c44216] transition-colors">
                  <Download className="h-3 w-3" /> PDF
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "SME Pipeline Ready", value: "863", sub: "clients" },
                  { label: "Referrals Made", value: "45", sub: "this quarter" },
                  { label: "Conversions", value: "25", sub: "opened accounts" },
                  { label: "Conversion Rate", value: "54%", sub: "referral → account" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-2xl font-black text-[#FF6B35]">{s.value}</p>
                    <p className="text-white/70 text-xs font-semibold mt-0.5">{s.label}</p>
                    <p className="text-white/30 text-xs">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── EXPORTS TAB ── */}
        {activeTab === "exports" && (
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Generate and download specific reports for sharing with stakeholders.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {reportTypes.map((report) => (
                <div key={report.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:border-[#FF6B35]/30 hover:shadow-md transition-all group">
                  <div className="text-3xl flex-shrink-0">{report.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm">{report.label}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{report.desc}</p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleExport(`${report.label} (CSV)`)}
                      className="flex items-center gap-1.5 text-xs border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] px-3 py-1.5 rounded-lg transition-colors text-gray-600"
                    >
                      <FileText className="h-3 w-3" /> CSV
                    </button>
                    <button
                      onClick={() => handleExport(`${report.label} (PDF)`)}
                      className="flex items-center gap-1.5 text-xs bg-[#FF6B35] text-white px-3 py-1.5 rounded-lg hover:bg-[#c44216] transition-colors"
                    >
                      <Download className="h-3 w-3" /> PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Scheduled reports */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-[#FF6B35]" />
                <h3 className="font-bold text-gray-900 text-sm">Scheduled Reports</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Weekly User Growth", schedule: "Every Monday 8:00 AM", next: "May 19, 2026", status: "Active" },
                  { name: "Monthly Revenue Summary", schedule: "1st of each month", next: "Jun 1, 2026", status: "Active" },
                  { name: "Stanbic Partnership Report", schedule: "Last Friday of month", next: "May 29, 2026", status: "Active" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.schedule} · Next: {s.next}</p>
                    </div>
                    <span className="text-xs font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full">{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
