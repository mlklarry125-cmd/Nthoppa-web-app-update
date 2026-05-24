"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, TrendingUp, Users, Building2, Briefcase,
  ArrowRight, Search, X, CheckCircle, Clock, Star,
  BarChart3, Target, Calendar, Download, Filter
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Area, AreaChart
} from "recharts";

const ORANGE = "#FF6B35";
const NAVY = "#0f4c8a";
const ORANGE_FAINT = "#fde8e0";

// Pipeline funnel data
const funnelData = [
  { stage: "Informal Traders", count: 12480, pct: 100, color: ORANGE, icon: Users, description: "Registered users, no formal business" },
  { stage: "Micro-Entrepreneurs", count: 5240, pct: 42, color: "#d44a18", icon: TrendingUp, description: "Recurring transactions, using Nthoppa products" },
  { stage: "SME Ready", count: 863, pct: 7, color: NAVY, icon: Target, description: "Eligible for Stanbic Business Banking referral" },
  { stage: "Business Banking", count: 218, pct: 2, color: "#0a3a6e", icon: Building2, description: "Referred and onboarded by Stanbic" },
];

// Monthly pipeline movement
const movementData = [
  { month: "Oct", informal: 9200, micro: 3800, smeReady: 580, banking: 140 },
  { month: "Nov", informal: 10100, micro: 4100, smeReady: 640, banking: 160 },
  { month: "Dec", informal: 10800, micro: 4400, smeReady: 700, banking: 175 },
  { month: "Jan", informal: 11200, micro: 4700, smeReady: 740, banking: 190 },
  { month: "Feb", informal: 11900, micro: 5000, smeReady: 810, banking: 205 },
  { month: "Mar", informal: 12480, micro: 5240, smeReady: 863, banking: 218 },
];

// Referral conversion data
const referralData = [
  { month: "Oct", referred: 28, converted: 14 },
  { month: "Nov", referred: 32, converted: 16 },
  { month: "Dec", referred: 30, converted: 15 },
  { month: "Jan", referred: 38, converted: 20 },
  { month: "Feb", referred: 41, converted: 22 },
  { month: "Mar", referred: 45, converted: 25 },
];

// SME-ready clients for referral
const smeReadyClients = [
  {
    id: 1, name: "Kgabo Hardware Supplies", initials: "KH", type: "Construction & Hardware",
    revenue: "P 18,400/mo", employees: 6, monthsActive: 14, products: ["Insurance", "Motshelo", "Micro-loan"],
    score: 94, status: "Pending Referral", timeInTier: "3 months"
  },
  {
    id: 2, name: "Botsalano Fresh Farm", initials: "BF", type: "Agriculture",
    revenue: "P 15,200/mo", employees: 4, monthsActive: 18, products: ["Insurance", "Savings"],
    score: 88, status: "Pending Referral", timeInTier: "5 months"
  },
  {
    id: 3, name: "Lebo Fashion House", initials: "LF", type: "Retail & Fashion",
    revenue: "P 11,800/mo", employees: 3, monthsActive: 10, products: ["Insurance", "Micro-loan"],
    score: 81, status: "Referred", timeInTier: "1 month"
  },
  {
    id: 4, name: "Thabo Auto Services", initials: "TA", type: "Automotive",
    revenue: "P 9,600/mo", employees: 2, monthsActive: 8, products: ["Insurance"],
    score: 76, status: "Pending Referral", timeInTier: "2 months"
  },
  {
    id: 5, name: "Modisa Spaza Centre", initials: "MS", type: "Retail",
    revenue: "P 7,200/mo", employees: 2, monthsActive: 12, products: ["Motshelo", "Insurance"],
    score: 72, status: "Converted", timeInTier: "—"
  },
];

// Sector breakdown
const sectorData = [
  { sector: "Retail & Trade", count: 3840, pct: 31 },
  { sector: "Food & Hospitality", count: 2620, pct: 21 },
  { sector: "Construction", count: 1870, pct: 15 },
  { sector: "Agriculture", count: 1500, pct: 12 },
  { sector: "Automotive", count: 1120, pct: 9 },
  { sector: "Fashion & Beauty", count: 870, pct: 7 },
  { sector: "Other", count: 660, pct: 5 },
];

// Business profile modal data
type Client = typeof smeReadyClients[0];

function BusinessProfileModal({ client, onClose }: { client: Client; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#d44a18] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium opacity-80">Business Profile</span>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-black">
              {client.initials}
            </div>
            <div>
              <h2 className="text-xl font-black">{client.name}</h2>
              <p className="opacity-80 text-sm">{client.type}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Score */}
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div>
              <p className="text-sm text-gray-500">Stanbic Readiness Score</p>
              <p className="text-3xl font-black text-[#FF6B35]">{client.score}<span className="text-base font-medium text-gray-400">/100</span></p>
            </div>
            <div className="w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fde8e0" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={ORANGE} strokeWidth="3"
                  strokeDasharray={`${client.score} 100`} strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Monthly Revenue", value: client.revenue },
              { label: "Employees", value: `${client.employees} staff` },
              { label: "Months Active", value: `${client.monthsActive} months` },
            ].map((m) => (
              <div key={m.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                <p className="text-sm font-bold text-gray-900">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Products used */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Nthoppa Products Used</p>
            <div className="flex flex-wrap gap-2">
              {client.products.map((p) => (
                <span key={p} className="px-3 py-1 bg-orange-50 text-[#FF6B35] text-xs font-semibold rounded-full border border-orange-100">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-navy-50 rounded-xl border border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Pipeline Status</p>
              <p className="text-sm font-bold text-gray-900">{client.status}</p>
              {client.timeInTier !== "—" && (
                <p className="text-xs text-gray-400 mt-0.5">In SME Ready tier for {client.timeInTier}</p>
              )}
            </div>
            {client.status === "Converted" && <CheckCircle className="w-6 h-6 text-green-500" />}
            {client.status === "Referred" && <Clock className="w-6 h-6 text-blue-500" />}
            {client.status === "Pending Referral" && <Star className="w-6 h-6 text-[#FF6B35]" />}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {client.status === "Pending Referral" && (
              <Button className="flex-1 bg-[#0f4c8a] hover:bg-[#0a3a6e] text-white rounded-xl">
                Refer to Stanbic
              </Button>
            )}
            <Button variant="outline" className="flex-1 border-gray-200 rounded-xl" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminSMEPipelinePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Pending Referral", "Referred", "Converted"];

  const filteredClients = smeReadyClients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || c.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const getStatusBadge = (status: string) => {
    if (status === "Converted") return <Badge className="bg-green-100 text-green-700 border-0 text-xs">Converted</Badge>;
    if (status === "Referred") return <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">Referred</Badge>;
    return <Badge className="bg-orange-100 text-[#FF6B35] border-0 text-xs">Pending Referral</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-10">
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
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black text-black">SME Pipeline</h1>
            <p className="text-gray-500 mt-1">Tracking informal traders → Stanbic Business Banking</p>
          </div>
          <Button variant="outline" className="border-gray-200 rounded-xl flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Funnel KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {funnelData.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.stage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tier.color}18` }}>
                        <Icon className="w-4 h-4" style={{ color: tier.color }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-400">{tier.pct}%</span>
                    </div>
                    <p className="text-2xl font-black text-gray-900">{tier.count.toLocaleString()}</p>
                    <p className="text-xs font-semibold text-gray-600 mt-0.5">{tier.stage}</p>
                    <p className="text-xs text-gray-400 mt-1 leading-tight">{tier.description}</p>
                    {/* Mini funnel bar */}
                    <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${tier.pct}%`, backgroundColor: tier.color }} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pipeline movement over time */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-900">Pipeline Movement — 6 Months</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={movementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="informal" stroke={ORANGE} fill={ORANGE_FAINT} strokeWidth={2} name="Informal" />
                  <Area type="monotone" dataKey="micro" stroke="#d44a18" fill="#fbd0c4" strokeWidth={2} name="Micro" />
                  <Area type="monotone" dataKey="smeReady" stroke={NAVY} fill="#dbeafe" strokeWidth={2} name="SME Ready" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                {[{ label: "Informal", color: ORANGE }, { label: "Micro", color: "#d44a18" }, { label: "SME Ready", color: NAVY }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="text-xs text-gray-500">{l.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Referral conversion */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-900">Stanbic Referral Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={referralData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="referred" fill={ORANGE_FAINT} stroke={ORANGE} strokeWidth={1} radius={[4, 4, 0, 0]} name="Referred" />
                  <Bar dataKey="converted" fill={ORANGE} radius={[4, 4, 0, 0]} name="Converted" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fde8e0] border border-[#FF6B35]" />
                    <span className="text-xs text-gray-500">Referred</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
                    <span className="text-xs text-gray-500">Converted</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0f4c8a]">Avg conversion: 54%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sector breakdown + SME-ready clients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sector breakdown */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-900">Sector Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sectorData.map((s) => (
                <div key={s.sector}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-700">{s.sector}</span>
                    <span className="text-xs font-bold text-gray-900">{s.count.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#FF6B35] transition-all" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SME-ready clients table */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl md:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-900">SME-Ready Clients</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8 h-8 text-xs rounded-lg border-gray-200 w-36"
                    />
                  </div>
                </div>
              </div>
              {/* Filter tabs */}
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${activeFilter === f
                      ? "bg-[#FF6B35] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#FF6B35]/30 hover:bg-orange-50/30 cursor-pointer transition-all group"
                >
                  <Avatar className="w-9 h-9 rounded-xl bg-[#FF6B35]/10 shrink-0">
                    <AvatarFallback className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold rounded-xl">
                      {client.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{client.name}</p>
                    <p className="text-xs text-gray-400">{client.type} · {client.revenue}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-black text-[#FF6B35]">{client.score}</p>
                      <p className="text-xs text-gray-400">score</p>
                    </div>
                    {getStatusBadge(client.status)}
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#FF6B35] transition-colors" />
                  </div>
                </div>
              ))}
              {filteredClients.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-6">No clients found</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stanbic reporting summary */}
        <Card className="border border-[#0f4c8a]/20 shadow-sm rounded-2xl bg-gradient-to-r from-[#0f4c8a]/5 to-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f4c8a]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#0f4c8a]" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-gray-900">Stanbic Partnership Report — March 2026</CardTitle>
                <p className="text-xs text-gray-500">Summary for sharing with Stanbic Business Banking team</p>
              </div>
              <Button size="sm" className="ml-auto bg-[#0f4c8a] hover:bg-[#0a3a6e] text-white rounded-xl text-xs">
                <Download className="w-3 h-3 mr-1.5" /> Export PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {[
                { label: "Pipeline-Ready Clients", value: "863", sub: "eligible for referral" },
                { label: "Referrals This Month", value: "45", sub: "+10% vs Feb" },
                { label: "Conversions This Month", value: "25", sub: "54% conversion rate" },
                { label: "Avg Time to Referral", value: "4.2 mo", sub: "from Nthoppa signup" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-2xl font-black text-[#0f4c8a]">{s.value}</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{s.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Profile Modal */}
      <AnimatePresence>
        {selectedClient && (
          <BusinessProfileModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
