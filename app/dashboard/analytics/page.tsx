"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle,
  Target,
  Calendar,
  Award,
  Medal,
  Crown,
  Star,
  Clock,
  Activity,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  PieChart,
  LineChart,
  UserCheck,
  UserPlus,
  UserX,
  Zap,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getUsers, getAgents, getAgentSession, type User, type Agent } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DailyStat {
  date: string;
  registrations: number;
  completions: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  registrations: number;
  completionRate: number;
  avatar: string;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [monthlyTarget, setMonthlyTarget] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [weeklyPerformance, setWeeklyPerformance] = useState<{ day: string; count: number }[]>([]);
  const [territoryBreakdown, setTerritoryBreakdown] = useState<{ name: string; count: number }[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("month");
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const session = getAgentSession();
    const allUsers = getUsers();
    const agentUsers = allUsers.filter(u => u.agentId === session?.agentId);
    const allAgents = getAgents();
    
    setUsers(agentUsers);
    setAgents(allAgents);
    
    setTotalRegistrations(agentUsers.length);
    const avgCompletion = agentUsers.length > 0
      ? Math.round(agentUsers.reduce((sum, u) => sum + (u.completion || u.completionRate || 0), 0) / agentUsers.length)
      : 0;
    setCompletionRate(avgCompletion);
    setActiveUsers(agentUsers.filter(u => u.status === "active").length);
    setMonthlyTarget(Math.round(agentUsers.length * 1.2));
    
    generateDailyStats(agentUsers);
    generateWeeklyPerformance(agentUsers);
    generateTerritoryBreakdown(agentUsers);
    generateLeaderboard(allAgents);
  };

  const generateDailyStats = (users: User[]) => {
    const stats: DailyStat[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayUsers = users.filter(u => u.registrationDate === dateStr);
      const registrations = dayUsers.length;
      const completions = dayUsers.filter(u => (u.completion || u.completionRate || 0) >= 80).length;
      
      stats.push({
        date: dateStr,
        registrations,
        completions,
      });
    }
    
    setDailyStats(stats);
  };

  const generateWeeklyPerformance = (users: User[]) => {
    const weekly = [0, 0, 0, 0, 0, 0, 0];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    users.forEach(user => {
      const date = new Date(user.registrationDate);
      const dayOfWeek = date.getDay();
      weekly[dayOfWeek]++;
    });
    
    const weeklyData = dayNames.map((day, index) => ({
      day: day,
      count: weekly[index]
    }));
    
    setWeeklyPerformance(weeklyData);
  };

  const generateTerritoryBreakdown = (users: User[]) => {
    const territoryMap = new Map<string, number>();
    users.forEach(user => {
      territoryMap.set(user.territory || user.city || "Unknown", (territoryMap.get(user.territory || user.city || "Unknown") || 0) + 1);
    });
    
    const breakdown = Array.from(territoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    setTerritoryBreakdown(breakdown);
  };

  const generateLeaderboard = (agents: Agent[]) => {
    const sorted = [...agents]
      .sort((a, b) => (b.registrations || 0) - (a.registrations || 0))
      .slice(0, 5)
      .map((agent, index) => ({
        rank: index + 1,
        name: agent.name,
        registrations: agent.registrations || 0,
        completionRate: agent.completionRate || 0,
        avatar: agent.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      }));
    
    setLeaderboard(sorted);
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-[#FF6B35] text-white";
      case 2: return "bg-black text-white";
      case 3: return "bg-gray-500 text-white";
      default: return "bg-gray-200 text-black";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-4 w-4" />;
      case 2: return <Medal className="h-4 w-4" />;
      case 3: return <Award className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const areaChartData = dailyStats.map(stat => ({
    date: formatDate(stat.date),
    registrations: stat.registrations,
    completions: stat.completions,
  }));

  const territoryData = territoryBreakdown.map(t => ({
    name: t.name,
    users: t.count,
  }));

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        {/* Back Navigation */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Analytics</h1>
            <p className="text-gray-600">Track your performance and insights</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={(v: any) => setSelectedPeriod(v)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-200">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Registrations</p>
                    <p className="text-2xl font-bold text-black">{totalRegistrations}</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <ArrowUp className="h-3 w-3" />
                      +12% from last month
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-[#FF6B35]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-2xl font-bold text-black">{completionRate}%</p>
                    <Progress value={completionRate} className="h-1 mt-2" />
                  </div>
                  <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-black" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Monthly Target</p>
                    <p className="text-2xl font-bold text-black">{monthlyTarget}</p>
                    <p className="text-xs text-gray-500 mt-1">Goal: {Math.round(monthlyTarget * 0.8)} achieved</p>
                  </div>
                  <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-[#FF6B35]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Users</p>
                    <p className="text-2xl font-bold text-black">{activeUsers}</p>
                    <p className="text-xs text-gray-500 mt-1">{Math.round((activeUsers / (totalRegistrations || 1)) * 100)}% of total</p>
                  </div>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="daily">Daily Stats</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-[#FF6B35]" />
                  Registrations & Completions Trend
                </CardTitle>
                <CardDescription>Last 7 days performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={areaChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="registrations" name="Registrations" stackId="1" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="completions" name="Completions" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#FF6B35]" />
                  Weekly Performance
                </CardTitle>
                <CardDescription>Registrations by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value} registrations`, 'Count']} />
                    <Bar dataKey="count" name="Registrations" fill="#FF6B35" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#FF6B35]" />
                  Territory Breakdown
                </CardTitle>
                <CardDescription>Registrations by territory</CardDescription>
              </CardHeader>
              <CardContent>
                {territoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={territoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                      <Bar dataKey="users" name="Users" fill="#000000" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 py-8">No territory data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="daily" className="space-y-4">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#FF6B35]" />
                  Daily Registration Statistics
                </CardTitle>
                <CardDescription>Last 7 days performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Registrations</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Completions</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Conversion Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyStats.map((stat, index) => {
                        const conversionRate = stat.registrations > 0 
                          ? Math.round((stat.completions / stat.registrations) * 100)
                          : 0;
                        return (
                          <motion.tr
                            key={stat.date}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4 text-sm text-gray-600">{formatDate(stat.date)}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-black">{stat.registrations}</span>
                                {stat.registrations > 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    {stat.registrations} new
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-green-600 font-medium">{stat.completions}</span>
                              <span className="text-gray-400 text-xs ml-1">/ {stat.registrations}</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Progress value={conversionRate} className="h-2 w-20" />
                                <span className="text-sm font-medium text-black">{conversionRate}%</span>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#FF6B35]" />
                  Top Performing Agents
                </CardTitle>
                <CardDescription>Ranked by total registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((agent) => (
                    <motion.div
                      key={agent.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: agent.rank * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRankColor(agent.rank)}`}>
                          {agent.rank}
                        </div>
                        <Avatar className="h-12 w-12 bg-gradient-to-r from-[#FF6B35] to-black">
                          <AvatarFallback className="bg-transparent text-white">
                            {getInitials(agent.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-black">{agent.name}</p>
                          <p className="text-sm text-gray-500">Completion Rate: {agent.completionRate}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[#FF6B35]">
                          {getRankIcon(agent.rank)}
                          <span className="text-2xl font-bold text-black">{agent.registrations}</span>
                        </div>
                        <p className="text-xs text-gray-500">registrations</p>
                      </div>
                    </motion.div>
                  ))}
                  {leaderboard.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No agent data available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#FF6B35]" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-[#FF6B35]">
                      {Math.round((totalRegistrations / (agents.length || 1)) * 10) / 10}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Avg Registrations per Agent</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-black">{completionRate}%</div>
                    <p className="text-sm text-gray-600 mt-1">Average Completion Rate</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-[#FF6B35]">{agents.filter(a => a.status === "active").length}</div>
                    <p className="text-sm text-gray-600 mt-1">Active Agents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-gray-200 bg-gradient-to-r from-orange-50 to-gray-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <Zap className="h-6 w-6 text-[#FF6B35] mx-auto mb-2" />
                <div className="text-2xl font-bold text-black">{Math.round((totalRegistrations / 30) * 10) / 10}</div>
                <p className="text-xs text-gray-500">Daily Average</p>
              </div>
              <div>
                <Clock className="h-6 w-6 text-black mx-auto mb-2" />
                <div className="text-2xl font-bold text-black">
                  {Math.round((dailyStats.filter(s => s.registrations > 0).length / 7) * 100)}%
                </div>
                <p className="text-xs text-gray-500">Active Days</p>
              </div>
              <div>
                <TrendingUp className="h-6 w-6 text-[#FF6B35] mx-auto mb-2" />
                <div className="text-2xl font-bold text-black">+12%</div>
                <p className="text-xs text-gray-500">Growth Rate</p>
              </div>
              <div>
                <Users className="h-6 w-6 text-black mx-auto mb-2" />
                <div className="text-2xl font-bold text-black">{Math.round((activeUsers / (totalRegistrations || 1)) * 100)}%</div>
                <p className="text-xs text-gray-500">Retention Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}