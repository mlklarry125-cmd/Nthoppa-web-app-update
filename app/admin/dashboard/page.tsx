"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  ChevronRight, DollarSign, Eye,
  ChevronLeft
} from "lucide-react";
import {
  LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";

const statsData = [
  { title: "Total Users", value: "12,480", change: "+18%", icon: "/icons/27.jpeg", color: "bg-orange-500" },
  { title: "Active Agents", value: "1,245", change: "+12%", icon: "/icons/30.jpeg", color: "bg-blue-500" },
  { title: "Today's Registrations", value: "47", change: "+8%", icon: "/icons/19.jpeg", color: "bg-green-500" },
  { title: "Platform Revenue", value: "BWP 284K", change: "+23%", icon: "/icons/28.jpeg", color: "bg-purple-500" },
];

const weeklyData = [
  { day: "Mon", registrations: 32, activeUsers: 284 },
  { day: "Tue", registrations: 28, activeUsers: 312 },
  { day: "Wed", registrations: 35, activeUsers: 298 },
  { day: "Thu", registrations: 42, activeUsers: 356 },
  { day: "Fri", registrations: 38, activeUsers: 389 },
  { day: "Sat", registrations: 25, activeUsers: 234 },
  { day: "Sun", registrations: 18, activeUsers: 187 },
];

const recentUsers = [
  { id: 1, name: "Thabo Molefe", email: "thabo@example.com", role: "Agent", status: "Active", date: "Apr 25, 2026", initials: "TM" },
  { id: 2, name: "Josephine Morolong", email: "josephine@example.com", role: "Client", status: "Active", date: "Apr 24, 2026", initials: "JM" },
  { id: 3, name: "Kgabo Trading", email: "kgabo@example.com", role: "Merchant", status: "Pending", date: "Apr 23, 2026", initials: "KT" },
  { id: 4, name: "Sarah Johnson", email: "sarah@example.com", role: "Client", status: "Active", date: "Apr 22, 2026", initials: "SJ" },
  { id: 5, name: "Michael Modise", email: "michael@example.com", role: "Agent", status: "Inactive", date: "Apr 21, 2026", initials: "MM" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUsers, setTotalUsers] = useState(12480);
  const { toast } = useToast();

  const filteredUsers = recentUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "Active") return <Badge className="bg-green-100 text-green-700 border-0">Active</Badge>;
    if (status === "Pending") return <Badge className="bg-amber-100 text-amber-700 border-0">Pending</Badge>;
    return <Badge className="bg-gray-100 text-gray-600 border-0">Inactive</Badge>;
  };

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => {
        if (data?.users?.length) {
          setTotalUsers(data.users.length);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back Navigation - Goes to Landing Page */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Platform overview, partner integrations, and performance metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color} bg-opacity-10`}>
                  <img src={stat.icon} alt={stat.title} className="h-5 w-5" />
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

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Registrations This Week</CardTitle>
              <CardDescription>Daily user signups over the past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      formatter={(value) => [`${value} users`, "Registrations"]}
                    />
                    <Area type="monotone" dataKey="registrations" stroke="#FF6B35" fill="url(#orangeGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Active Users Trend</CardTitle>
              <CardDescription>Daily active users over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      formatter={(value) => [`${value} users`, "Active Users"]}
                    />
                    <Line type="monotone" dataKey="activeUsers" stroke="#FF6B35" strokeWidth={2} dot={{ fill: "#FF6B35", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partner Logos Section - WITH STANBIC ADDED */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900 text-sm">Ecosystem Partners</h3>
            <span className="text-xs text-gray-400">Active Integrations</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'CreditYame', logo: '/partners/credityame.jpeg', role: 'Credit Scoring — Formal', status: 'Live' },
              { name: 'iPachi Capital', logo: '/partners/ipachi.jpeg', role: 'SMME Pipeline — Informal', status: 'Live' },
              { name: 'Seriti Insights', logo: '/partners/seriti.jpeg', role: 'Data & Analytics', status: 'Live' },
              { name: 'Seipone.ai', logo: '/partners/seipone.jpeg', role: 'AI Solutions', status: 'Beta' },
              { name: 'Stanbic Bank', logo: '/partners/stanbic.jpeg', role: 'Strategic Banking Partner', status: 'Live' },
            ].map((partner, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-orange-50 border border-transparent hover:border-[#FF6B35]/20 transition-all group">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 flex-shrink-0 relative">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={56} 
                    height={56} 
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-xs">{partner.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{partner.role}</div>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${partner.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {partner.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavioural Tracking Data */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Behavioural Tracking Data</h3>
              <p className="text-gray-400 text-xs mt-0.5">User financial behaviour patterns across the platform</p>
            </div>
            <button className="text-xs text-[#FF6B35] font-semibold hover:underline">Export Data →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Avg Savings Streak', value: '47 days', icon: '🔥', trend: '+12%' },
              { label: 'Module Completion', value: '68%', icon: '📚', trend: '+5%' },
              { label: 'Active Learners', value: '14,230', icon: '🎯', trend: '+8%' },
              { label: 'Behaviour Score Avg', value: '72/100', icon: '📊', trend: '+3%' },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="text-xl mb-2">{stat.icon}</div>
                <div className="font-bold text-gray-900 text-lg">{stat.value}</div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
                <div className="text-green-600 text-xs font-semibold mt-1">{stat.trend} this month</div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[
              { label: 'Savings Consistency', pct: 82 },
              { label: 'Income Patterns Tracked', pct: 74 },
              { label: 'Financial Discipline Score', pct: 68 },
              { label: 'Transaction History Complete', pct: 66 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-gray-500 text-xs w-48 flex-shrink-0">{item.label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF6B35] rounded-full transition-all duration-1000" style={{width: `${item.pct}%`}} />
                </div>
                <span className="text-[#FF6B35] font-bold text-xs w-10 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Scoring Data */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* CreditYame — Formal */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
                <img src="/partners/credityame.jpeg" alt="CreditYame" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">CreditYame Integration</h3>
                <p className="text-gray-400 text-xs">Formal Sector Credit Scoring</p>
              </div>
              <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Live</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Profiles', value: '4,230' },
                { label: 'Avg Score', value: '703' },
                { label: 'Approval Rate', value: '68%' },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="font-bold text-gray-900 text-base">{s.value}</div>
                  <div className="text-gray-400 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { band: 'Excellent (750+)', pct: 22, color: 'bg-green-500' },
                { band: 'Good (650-749)', pct: 38, color: 'bg-blue-400' },
                { band: 'Fair (500-649)', pct: 28, color: 'bg-amber-400' },
                { band: 'Poor (<500)', pct: 12, color: 'bg-red-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-36 flex-shrink-0">{item.band}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{width: `${item.pct}%`}} />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-8 text-right">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* iPachi — Informal */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
                <img src="/partners/ipachi.jpeg" alt="iPachi" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">iPachi Integration</h3>
                <p className="text-gray-400 text-xs">Informal Sector — SMME Pipeline</p>
              </div>
              <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Live</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Traders', value: '8,940' },
                { label: 'Avg Score', value: '477' },
                { label: 'Payment Ready', value: '42%' },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="font-bold text-gray-900 text-base">{s.value}</div>
                  <div className="text-gray-400 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { stage: 'Informal Traders', count: '12,480', pct: 100, color: 'bg-[#FF6B35]' },
                { stage: 'Qualified Skills', count: '5,240', pct: 42, color: 'bg-orange-400' },
                { stage: 'Business Banking', count: '863', pct: 7, color: 'bg-amber-400' },
                { stage: 'Enterprise', count: '218', pct: 2, color: 'bg-yellow-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-36 flex-shrink-0">{item.stage}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{width: `${item.pct}%`}} />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-14 text-right">{item.count}</span>
                </div>
              ))}
            </div>
            <Link
              href="/admin/sme-pipeline"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 text-xs text-[#FF6B35] font-semibold border border-[#FF6B35]/30 px-3 py-2 rounded-lg hover:bg-[#FF6B35]/10 transition-colors"
            >
              View SME Pipeline Dashboard <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* NthoppaSure Section */}
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl p-6 shadow-sm border border-[#FF6B35]/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img src="/icons/2.jpeg" alt="NthoppaSure" className="h-5 w-5" />
                <h3 className="font-semibold text-white text-base">NthoppaSure</h3>
                <span className="px-2 py-0.5 bg-[#FF6B35]/20 text-[#FF6B35] text-xs font-semibold rounded-full border border-[#FF6B35]/30">Fintech Marketplace</span>
              </div>
              <p className="text-white/40 text-xs">Insurance & financial products marketplace division</p>
            </div>
            <Link 
              href="/admin/nthoppa-sure" 
              className="text-xs text-[#FF6B35] font-semibold border border-[#FF6B35]/30 px-3 py-1.5 rounded-lg hover:bg-[#FF6B35]/10 transition-colors inline-block"
            >
              View Dashboard →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Active Policies', value: '3,240', icon: '🛡️', color: 'text-blue-400' },
              { label: 'Total Premiums', value: 'P 892K', icon: '💰', color: 'text-green-400' },
              { label: 'Claims This Month', value: '47', icon: '📋', color: 'text-amber-400' },
              { label: 'Partner Products', value: '24', icon: '🏪', color: 'text-[#FF6B35]' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-xl mb-2">{stat.icon}</div>
                <div className={`font-bold text-lg ${stat.color}`}>{stat.value}</div>
                <div className="text-white/40 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { cat: 'Motor Insurance', products: 2, icon: '🚗', active: 1240 },
              { cat: 'Property', products: 4, icon: '🏠', active: 890 },
              { cat: 'Life & Funeral', products: 3, icon: '💙', active: 670 },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-[#FF6B35]/20 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.cat}</div>
                    <div className="text-white/40 text-xs">{item.products} products</div>
                  </div>
                </div>
                <div className="font-bold text-[#FF6B35] text-xl">{item.active.toLocaleString()}</div>
                <div className="text-white/30 text-xs">active policies</div>
              </div>
            ))}
          </div>
        </div>

        {/* Merchant Accounts Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Merchant Accounts</h3>
              <p className="text-gray-400 text-xs mt-0.5">Business accounts and QR payment merchants on the platform</p>
            </div>
            <button 
              onClick={() => router.push('/admin/register-merchant')}
              className="text-xs bg-[#FF6B35] text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-[#c44216] transition-colors"
            >
              + Add Merchant
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            {[
              { label: 'Active Merchants', value: '342', trend: '+18 this month' },
              { label: 'Monthly Revenue', value: 'P 128K', trend: '+22% vs last' },
              { label: 'Avg Transaction', value: 'P 374', trend: 'per merchant' },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="font-bold text-gray-900 text-xl">{stat.value}</div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
                <div className="text-green-600 text-xs font-medium mt-1">{stat.trend}</div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs text-gray-400 font-medium pb-3">Merchant</th>
                  <th className="text-left text-xs text-gray-400 font-medium pb-3">Category</th>
                  <th className="text-left text-xs text-gray-400 font-medium pb-3">Monthly Vol.</th>
                  <th className="text-left text-xs text-gray-400 font-medium pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Kgabo Trading', cat: 'Retail', vol: 'P 12,400', status: 'Active' },
                  { name: 'Moagi Spaza', cat: 'Food & Bev', vol: 'P 8,200', status: 'Active' },
                  { name: 'Thabo Mechanics', cat: 'Auto Services', vol: 'P 6,800', status: 'Pending' },
                  { name: 'Lebo Fashion', cat: 'Clothing', vol: 'P 4,100', status: 'Active' },
                ].map((merchant, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium text-gray-900 text-xs">{merchant.name}</td>
                    <td className="py-3 text-gray-500 text-xs">{merchant.cat}</td>
                    <td className="py-3 font-bold text-gray-900 text-xs">{merchant.vol}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${merchant.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {merchant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users Table */}
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-black">Recent Users</CardTitle>
              <CardDescription>Latest platform registrations</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 rounded-xl"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-gray-100 hover:bg-orange-50/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#c44216] text-white text-xs">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-black text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="rounded-full text-xs">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{user.date}</td>
                      <td className="py-3 px-4">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                          <Eye className="h-4 w-4 text-gray-400" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}