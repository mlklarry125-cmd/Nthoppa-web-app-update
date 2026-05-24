"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  TrendingUp,
  Heart,
  Calendar,
  FileText,
  Wallet,
  Plus,
  Eye,
  ArrowUpRight,
  CheckCircle,
  Clock,
  ChevronLeft,
  Download,
  Activity,
  Award,
  PieChart as PieChartIcon,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const wellnessData = [
  { name: "Healthy", value: 342, color: "#22c55e" },
  { name: "At-Risk", value: 156, color: "#eab308" },
  { name: "Critical", value: 42, color: "#ef4444" },
];

const employees = [
  { id: 1, name: "Thabo M.", wellness: 92, status: "Healthy", department: "Sales", initials: "TM" },
  { id: 2, name: "Josephine K.", wellness: 78, status: "At-Risk", department: "Customer Support", initials: "JK" },
  { id: 3, name: "Michael L.", wellness: 45, status: "Critical", department: "Operations", initials: "ML" },
  { id: 4, name: "Sarah P.", wellness: 88, status: "Healthy", department: "Finance", initials: "SP" },
  { id: 5, name: "David M.", wellness: 62, status: "At-Risk", department: "IT", initials: "DM" },
];

interface CompanyWalletTransaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  balance: number;
}

const mockTransactions: CompanyWalletTransaction[] = [
  { id: 1, date: "2026-05-25", description: "Payroll - May 2026", amount: 47700, type: "debit", balance: 152300 },
  { id: 2, date: "2026-05-20", description: "Salary Advance - Tshepo Kgosi", amount: 3000, type: "debit", balance: 200000 },
  { id: 3, date: "2026-05-15", description: "Bank Transfer Top-up", amount: 50000, type: "credit", balance: 203000 },
  { id: 4, date: "2026-04-25", description: "Payroll - April 2026", amount: 47700, type: "debit", balance: 153000 },
];

export default function HRDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [totalEmployees, setTotalEmployees] = useState(540);
  const [walletBalance, setWalletBalance] = useState(152300);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [showTopUpDialog, setShowTopUpDialog] = useState(false);
  const [showLedgerDialog, setShowLedgerDialog] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [topUpSource, setTopUpSource] = useState("");

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => {
        if (data?.users?.length) {
          setTotalEmployees(data.users.length);
        }
      })
      .catch(() => {});
  }, []);

  const handleTopUp = () => {
    if (topUpAmount <= 0) {
      toast({ title: "Error", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }
    if (!topUpSource) {
      toast({ title: "Error", description: "Please select a source bank", variant: "destructive" });
      return;
    }
    
    const newBalance = walletBalance + topUpAmount;
    const newTransaction: CompanyWalletTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split("T")[0],
      description: `Top-up from ${topUpSource}`,
      amount: topUpAmount,
      type: "credit",
      balance: newBalance,
    };
    
    setWalletBalance(newBalance);
    setTransactions([newTransaction, ...transactions]);
    setShowTopUpDialog(false);
    setTopUpAmount(0);
    setTopUpSource("");
    toast({ title: "Top-up Successful", description: `P${topUpAmount.toLocaleString()} has been added to the company wallet.` });
  };

  const handleExport = () => {
    toast({ title: "Export Started", description: "Your report is being generated" });
  };

  const getWellnessBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-700 border-0">Healthy</Badge>;
    if (score >= 60) return <Badge className="bg-amber-100 text-amber-700 border-0">At-Risk</Badge>;
    return <Badge className="bg-red-100 text-red-700 border-0">Critical</Badge>;
  };

  const getWellnessColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </div>
        Back
      </button>

      {/* Company Wallet Card */}
      <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-white/80" />
              <h3 className="font-semibold">Company Wallet</h3>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white"
                onClick={() => setShowTopUpDialog(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Top Up
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white"
                onClick={() => setShowLedgerDialog(true)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Transaction Ledger
              </Button>
            </div>
          </div>
          <div>
            <p className="text-white/80 text-sm">Available Balance</p>
            <p className="text-4xl font-bold">P{walletBalance.toLocaleString()}</p>
            <p className="text-white/70 text-sm mt-2">Last updated: Today</p>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Total Employees", value: totalEmployees, change: "+12", icon: Users, color: "bg-orange-500" },
          { title: "Wellness Score", value: "74", change: "+5", icon: Activity, color: "bg-green-500", suffix: "%" },
          { title: "Salary Advances", value: "P1.2M", change: "+18%", icon: TrendingUp, color: "bg-blue-500" },
          { title: "Avg Engagement", value: "82%", change: "+7%", icon: Award, color: "bg-purple-500" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-5 w-5 ${stat.color.replace("bg-", "text-")}`} />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}{stat.suffix || ""}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/hr/financial-wellness")}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Financial Wellness</p>
              <p className="text-sm text-gray-500">View employee scores</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#FF6B35]" />
          </CardContent>
        </Card>
        <Card className="border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/hr/salary-advances")}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Salary Advances</p>
              <p className="text-sm text-gray-500">2 pending requests</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#FF6B35]" />
          </CardContent>
        </Card>
        <Card className="border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/hr/leave")}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Leave Management</p>
              <p className="text-sm text-gray-500">3 employees on leave</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#FF6B35]" />
          </CardContent>
        </Card>
      </div>

      {/* Wellness Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-[#FF6B35]" />
              Wellness Distribution
            </CardTitle>
            <CardDescription>Employee financial health breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wellnessData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {wellnessData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {wellnessData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Wellness Trends</CardTitle>
            <CardDescription>Monthly average wellness score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Wellness Score</span>
                  <span className="font-bold text-gray-900">74%</span>
                </div>
                <Progress value={74} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Financial Literacy</span>
                  <span className="font-bold text-gray-900">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Savings Engagement</span>
                  <span className="font-bold text-gray-900">71%</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Debt Management</span>
                  <span className="font-bold text-gray-900">59%</span>
                </div>
                <Progress value={59} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Wellness Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Employee Financial Wellness Summary</CardTitle>
          <CardDescription>Current wellness scores by employee</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Department</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Wellness Score</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-100 hover:bg-orange-50/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white text-xs">
                            {emp.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900 text-sm">{emp.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{emp.department}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${getWellnessColor(emp.wellness)}`}>{emp.wellness}%</span>
                        <Progress value={emp.wellness} className="w-16 h-1.5" />
                      </div>
                    </td>
                    <td className="py-3 px-4">{getWellnessBadge(emp.wellness)}</td>
                    <td className="py-3 px-4">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                        <ArrowUpRight className="h-4 w-4 text-gray-400" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Up Dialog */}
      <Dialog open={showTopUpDialog} onOpenChange={setShowTopUpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Top Up Company Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Amount (P)</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={topUpAmount || ""}
                onChange={(e) => setTopUpAmount(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label>Source Bank</Label>
              <select
                className="w-full border border-gray-200 rounded-lg p-2 mt-1"
                value={topUpSource}
                onChange={(e) => setTopUpSource(e.target.value)}
              >
                <option value="">Select source bank</option>
                <option value="Stanbic Bank">Stanbic Bank</option>
                <option value="First National Bank">First National Bank</option>
                <option value="Barclays Botswana">Barclays Botswana</option>
              </select>
            </div>
            <Button className="w-full bg-[#FF6B35]" onClick={handleTopUp}>
              Confirm Top Up
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction Ledger Dialog */}
      <Dialog open={showLedgerDialog} onOpenChange={setShowLedgerDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Ledger</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{tx.description}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {tx.type === "credit" ? "+" : "-"}P{tx.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">P{tx.balance.toLocaleString()}</p>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t">
              <div className="flex justify-between font-bold">
                <span>Current Balance:</span>
                <span className="text-[#FF6B35]">P{walletBalance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}