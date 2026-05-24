"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  FileText,
  TrendingUp,
  CheckCircle,
  Calendar,
  Phone,
  Eye,
  MessageSquare,
  ArrowRight,
  Award,
  Target,
  UserCheck,
  UserX,
  Activity,
  ChevronRight,
  Building2,
  Shield,
  ShoppingBag,
  Landmark,
  CreditCard,
  MapPin,
  ChevronLeft,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { formatDate, formatPhoneNumber } from "@/lib/utils";
import { api } from "@/lib/api";
import type { User } from "@/lib/api";
import { getAgentSession } from "@/lib/storage";
import { CardSkeleton, TableSkeleton } from '@/components/LoadingSkeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  progress?: number;
  color: string;
}

function StatCard({ title, value, icon, progress, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} shadow-sm`}>
          <img src={icon} alt={title} className="h-5 w-5" />
        </div>
        <span className="text-3xl font-black text-black stat-animate">{value.toLocaleString()}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
      {progress !== undefined && (
        <div className="mt-3">
          <Progress value={progress} className="h-1.5 rounded-full" />
          <p className="text-xs text-gray-400 mt-1.5 font-medium">{progress}% completion rate</p>
        </div>
      )}
    </motion.div>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  color: string;
}

function QuickAction({ title, description, icon, onClick, color }: QuickActionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm cursor-pointer group transition-all"
    >
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
        <img src={icon} alt={title} className="h-6 w-6" />
      </div>
      <h3 className="font-bold text-black mb-1 text-base">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{description}</p>
      <div className="flex items-center text-[#FF6B35] text-sm font-bold group-hover:gap-2 gap-1 transition-all">
        Get started <ChevronRight className="h-4 w-4" />
      </div>
    </motion.div>
  );
}

export default function AgentHomePage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [agentName, setAgentName] = useState("");
  const [agentTerritory, setAgentTerritory] = useState("");
  const [agentId, setAgentId] = useState("");
  const [todayRegistrations, setTodayRegistrations] = useState(0);
  const [weekRegistrations, setWeekRegistrations] = useState(0);
  const [monthRegistrations, setMonthRegistrations] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Stanbic Recommendation Modal State
  const [recommendModalOpen, setRecommendModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedClientName, setSelectedClientName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [recommendationNotes, setRecommendationNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const stanbicProducts = [
    "Stanbic Personal Loan",
    "Stanbic Business Banking", 
    "Stanbic FlexiSave",
    "Stanbic InsurePlus",
    "Stanbic PayOnline"
  ];
  
  const [behaviourData, setBehaviourData] = useState({
    avgSavingsConsistency: 0,
    avgFinancialDiscipline: 0,
    totalTransactions: 0,
    savingsAdopters: 0,
    incomeTracked: 0,
    riskProfile: { low: 0, medium: 0, high: 0 }
  });

  const { toast } = useToast();

  useEffect(() => {
    const session = getAgentSession();
    if (session) {
      setAgentName(session.name);
      setAgentTerritory(session.territory);
      setAgentId(session.agentId);
      loadData(session.agentId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadData = async (currentAgentId: string) => {
    setIsLoading(true);
    try {
      const response = await api.getUsers(currentAgentId);
      const allUsers: any[] = Array.isArray(response) ? response : (response as any).data || [];
      
      if (!Array.isArray(allUsers)) {
        console.error('Users data is not an array:', allUsers);
        setUsers([]);
        setRecentUsers([]);
        return;
      }
      
      setUsers(allUsers);

      const today = new Date().toISOString().split("T")[0];
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      setTodayRegistrations(
        allUsers.filter((u) => u.registrationDate?.startsWith(today)).length
      );
      setWeekRegistrations(
        allUsers.filter((u) => new Date(u.registrationDate) >= weekAgo).length
      );
      setMonthRegistrations(
        allUsers.filter((u) => new Date(u.registrationDate) >= monthAgo).length
      );

      const avgCompletion =
        allUsers.length > 0
          ? Math.round(
              allUsers.reduce((sum, u) => sum + (u.completionRate || 0), 0) / allUsers.length
            )
          : 0;
      setCompletionRate(avgCompletion);

      const recent = [...allUsers]
        .sort(
          (a, b) =>
            new Date(b.registrationDate).getTime() -
            new Date(a.registrationDate).getTime()
        )
        .slice(0, 5);
      setRecentUsers(recent);

      const activeUsers = allUsers.filter(u => u.status === 'active');
      setBehaviourData({
        avgSavingsConsistency: activeUsers.length > 0 
          ? Math.round(activeUsers.reduce((s, u) => s + (u.completionRate || 0), 0) / activeUsers.length)
          : 0,
        avgFinancialDiscipline: activeUsers.length > 0 
          ? Math.round(activeUsers.reduce((s, u) => s + (u.completionRate || 0) * 0.8, 0) / activeUsers.length)
          : 0,
        totalTransactions: allUsers.length * 4,
        savingsAdopters: Math.round(activeUsers.length * 0.6),
        incomeTracked: Math.round(allUsers.length * 0.75),
        riskProfile: { 
          low: Math.round(activeUsers.length * 0.5), 
          medium: Math.round(activeUsers.length * 0.35), 
          high: Math.round(activeUsers.length * 0.15) 
        }
      });
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
      setUsers([]);
      setRecentUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleCall = (phone: string) => {
    toast({ title: "Initiating Call", description: `Calling ${phone}… (Demo)` });
  };

  const handleMessage = (user: User) => {
    router.push(`/dashboard/communications?recipient=${user.phone}&name=${user.fullName}`);
  };

  const getStatusBadge = (status: string) => {
    if (status === "active")
      return <Badge className="bg-[#FF6B35] text-white border-none">Completed</Badge>;
    if (status === "pending")
      return <Badge className="bg-[#F3F4F6] text-black border-none">Pending</Badge>;
    return <Badge className="bg-gray-200 text-gray-600 border-none">Inactive</Badge>;
  };

  const handleSubmitRecommendation = async () => {
    if (!selectedClient || !selectedProduct) {
      toast({
        title: "Missing Information",
        description: "Please select a client and product",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "✅ Recommendation Submitted",
        description: `${selectedClientName} has been recommended for ${selectedProduct} to Stanbic Bank.`,
      });
      setRecommendModalOpen(false);
      setSelectedClient("");
      setSelectedClientName("");
      setSelectedProduct("");
      setRecommendationNotes("");
      setIsSubmitting(false);
    }, 1000);
  };

  const safeUsers = Array.isArray(users) ? users : [];
  const activeCount = safeUsers.filter((u) => u.status === "active").length;
  const inactiveCount = safeUsers.filter((u) => u.status !== "active").length;

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        {/* Back Navigation - Goes to Landing Page */}
        <button          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-orange-black rounded-3xl p-8 text-white relative overflow-hidden nthoppa-shadow-lg"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full -ml-28 -mb-28" />
          <div className="absolute top-1/2 right-24 w-32 h-32 bg-white/3 rounded-full -translate-y-1/2" />
          <div className="dot-pattern absolute inset-0 opacity-20" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <img src="/icons/24.jpeg" alt="Award" className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-white/80">Welcome back!</span>
            </div>
            <h1 className="text-4xl font-black mb-3 tracking-tight">{agentName || "Agent"}</h1>
            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                <img src="/icons/19.jpeg" alt="Map" className="h-3.5 w-3.5" />
                <span>{agentTerritory || "Territory"}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                <img src="/icons/2.jpeg" alt="Shield" className="h-3.5 w-3.5" />
                <span>ID: {agentId}</span>
              </div>
            </div>
            <p className="text-white/75 max-w-md text-sm leading-relaxed">
              You've helped <span className="font-bold text-white">{safeUsers.length} customers</span> start their financial journey. Keep up the great work!
            </p>
          </div>
        </motion.div>

        {/* Stanbic Recommendation Widget */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-md">
                  <Image src="/partners/stanbic.jpeg" alt="Stanbic Bank" width={60} height={30} className="object-contain w-full h-full" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recommend to Stanbic</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Help your clients access Stanbic financial products and earn referral rewards
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">Earn commission</Badge>
                    <Badge variant="outline" className="text-xs">Quick approval</Badge>
                  </div>
                </div>
              </div>
              <Dialog open={recommendModalOpen} onOpenChange={setRecommendModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#FF6B35] hover:bg-[#c44216]">Make Recommendation</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Image src="/partners/stanbic.jpeg" alt="Stanbic" width={50} height={25} className="object-contain" />
                      <DialogTitle className="text-xl">Recommend Client to Stanbic</DialogTitle>
                    </div>
                    <p className="text-sm text-gray-500">Submit a client recommendation for Stanbic financial products</p>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Client *</label>
                      <Select value={selectedClient} onValueChange={(value) => {
                        setSelectedClient(value);
                        const client = safeUsers.find(u => u.id === value);
                        setSelectedClientName(client?.fullName || "");
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                          {safeUsers.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.fullName} - {client.phone}
                            </SelectItem>
                          ))}
                          {safeUsers.length === 0 && (
                            <SelectItem value="none" disabled>No clients available</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Product Interest *</label>
                      <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Stanbic product" />
                        </SelectTrigger>
                        <SelectContent>
                          {stanbicProducts.map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Notes / Reason</label>
                      <Textarea
                        placeholder="Why would this client benefit from Stanbic's services?"
                        value={recommendationNotes}
                        onChange={(e) => setRecommendationNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setRecommendModalOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitRecommendation} disabled={isSubmitting} className="flex-1 bg-[#FF6B35] hover:bg-[#c44216]">
                      {isSubmitting ? "Submitting..." : "Submit Recommendation"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <Suspense fallback={<CardSkeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Today's Registrations"
              value={todayRegistrations}
              icon="/icons/30.jpeg"
              color="bg-[#FF6B35]"
            />
            <StatCard
              title="This Week"
              value={weekRegistrations}
              icon="/icons/19.jpeg"
              color="bg-black"
            />
            <StatCard
              title="This Month"
              value={monthRegistrations}
              icon="/icons/22.jpeg"
              color="bg-[#FF6B35]"
            />
            <StatCard
              title="Completion Rate"
              value={completionRate}
              icon="/icons/24.jpeg"
              progress={completionRate}
              color="bg-black"
            />
          </div>
        </Suspense>

        {/* Behavioural Tracking Data Panel */}
        <div>
          <h2 className="text-lg font-black text-black mb-4 flex items-center gap-2 uppercase tracking-wide">
            <img src="/icons/28.jpeg" alt="Activity" className="h-5 w-5" />
            Behavioural Tracking Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="p-5">
                <p className="text-sm text-gray-500 mb-1">Avg Savings Consistency</p>
                <p className="text-2xl font-bold text-black">{behaviourData.avgSavingsConsistency}%</p>
                <Progress value={behaviourData.avgSavingsConsistency} className="h-1 mt-2" />
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-5">
                <p className="text-sm text-gray-500 mb-1">Financial Discipline Score</p>
                <p className="text-2xl font-bold text-black">{behaviourData.avgFinancialDiscipline}%</p>
                <Progress value={behaviourData.avgFinancialDiscipline} className="h-1 mt-2" />
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-5">
                <p className="text-sm text-gray-500 mb-1">Savings Adopters</p>
                <p className="text-2xl font-bold text-[#FF6B35]">{behaviourData.savingsAdopters}</p>
                <p className="text-xs text-gray-400 mt-1">of {activeCount} active users</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-5">
                <p className="text-sm text-gray-500 mb-1">Income Tracked</p>
                <p className="text-2xl font-bold text-black">{behaviourData.incomeTracked} users</p>
                <p className="text-xs text-gray-400 mt-1">Financial profiles completed</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 col-span-1 md:col-span-2">
              <CardContent className="p-5">
                <p className="text-sm text-gray-500 mb-3">Risk Profile Distribution</p>
                <div className="flex gap-4">
                  <div className="flex-1 text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-xl font-bold text-green-700">{behaviourData.riskProfile.low}</p>
                    <p className="text-xs text-green-600">Low Risk</p>
                  </div>
                  <div className="flex-1 text-center p-2 bg-yellow-50 rounded-lg">
                    <p className="text-xl font-bold text-yellow-700">{behaviourData.riskProfile.medium}</p>
                    <p className="text-xs text-yellow-600">Medium Risk</p>
                  </div>
                  <div className="flex-1 text-center p-2 bg-red-50 rounded-lg">
                    <p className="text-xl font-bold text-red-700">{behaviourData.riskProfile.high}</p>
                    <p className="text-xs text-red-600">High Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-black text-black mb-4 flex items-center gap-2 uppercase tracking-wide">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <QuickAction
              title="Register New User"
              description="Add a new customer to the platform"
              icon="/icons/30.jpeg"
              onClick={() => router.push("/dashboard/register")}
              color="bg-[#FF6B35]"
            />
            <QuickAction
              title="View All Users"
              description="Manage and search customer database"
              icon="/icons/27.jpeg"
              onClick={() => router.push("/dashboard/users")}
              color="bg-black"
            />
            <QuickAction
              title="View Reports"
              description="Generate performance reports"
              icon="/icons/5.jpeg"
              onClick={() => router.push("/dashboard/reports")}
              color="bg-[#FF6B35]"
            />
            <QuickAction
              title="NthoppaSure"
              description="Insurance products from Westlife Insurance Botswana"
              icon="/icons/2.jpeg"
              onClick={() => router.push("/dashboard/nthoppa-sure")}
              color="bg-purple-600"
            />
          </div>
        </div>

        {/* Recent Registrations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-black flex items-center gap-2 uppercase tracking-wide">Recent Registrations</h2>
            <Button
              variant="ghost"
              className="text-[#FF6B35] hover:text-black"
              onClick={() => router.push("/dashboard/users")}
            >
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <Card className="border-gray-200">
            <CardContent className="p-0">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Phone</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-gray-500">
                            No registrations yet. Start by registering a new user!
                          </td>
                        </tr>
                      ) : (
                        recentUsers.map((user, index) => (
                          <motion.tr
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 gradient-orange-black">
                                  <AvatarFallback className="bg-transparent text-white text-xs">
                                    {getInitials(user.fullName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-black">{user.fullName}</p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {formatPhoneNumber(user.phone)}
                            </td>
                            <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                            <td className="py-3 px-4 text-sm text-gray-500">
                              {formatDate(user.registrationDate)}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleCall(user.phone)}
                                  className="p-1.5 rounded-lg bg-[#F3F4F6] text-gray-600 hover:bg-[#FF6B35] hover:text-white transition-colors"
                                  title="Call"
                                >
                                  <Phone className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleMessage(user)}
                                  className="p-1.5 rounded-lg bg-[#F3F4F6] text-gray-600 hover:bg-[#FF6B35] hover:text-white transition-colors"
                                  title="Message"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => router.push(`/dashboard/users?view=${user.id}`)}
                                  className="p-1.5 rounded-lg bg-[#F3F4F6] text-gray-600 hover:bg-[#FF6B35] hover:text-white transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <img src="/icons/22.jpeg" alt="Target" className="h-5 w-5" />
                Monthly Target Progress
              </CardTitle>
              <CardDescription>Your registration target for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress towards 50 registrations</span>
                    <span className="font-medium text-black">{monthRegistrations}/50</span>
                  </div>
                  <Progress value={(monthRegistrations / 50) * 100} className="h-2" />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Remaining</span>
                    <span className="font-bold text-black">
                      {Math.max(0, 50 - monthRegistrations)} registrations
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Daily average needed</span>
                    <span className="font-bold text-black">
                      {Math.ceil(Math.max(0, 50 - monthRegistrations) / 15)} registrations/day
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <img src="/icons/28.jpeg" alt="Activity" className="h-5 w-5" />
                Quick Stats
              </CardTitle>
              <CardDescription>Your performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                      <img src="/icons/27.jpeg" alt="Users" className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-gray-600">Active Customers</span>
                  </div>
                  <span className="font-bold text-black">{activeCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center">
                      <img src="/icons/27.jpeg" alt="Users" className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-gray-600">Pending / Inactive</span>
                  </div>
                  <span className="font-bold text-black">{inactiveCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                      <img src="/icons/24.jpeg" alt="Check" className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-gray-600">Avg Completion</span>
                  </div>
                  <span className="font-bold text-black">{completionRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partners Section */}
        <div>
          <h2 className="text-lg font-black text-black mb-4 uppercase tracking-wide">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "CreditYame", logo: "/partners/credityame.jpeg", category: "Credit Scoring" },
              { name: "Ipachi Capital", logo: "/partners/ipachi.jpeg", category: "SME Finance" },
              { name: "Seriti Insights", logo: "/partners/seriti.jpeg", category: "Data & Analytics" },
              { name: "Seipone.ai", logo: "/partners/seipone.jpeg", category: "AI Solutions" },
              { name: "Stanbic Bank", logo: "/partners/stanbic.jpeg", category: "Strategic Partner" },
            ].map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3 shadow-sm card-hover"
              >
                <div className="h-14 w-full flex items-center justify-center">
                  <img src={partner.logo} alt={partner.name} className="max-h-12 max-w-full object-contain" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-black text-sm">{partner.name}</p>
                  <p className="text-xs text-gray-400">{partner.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}