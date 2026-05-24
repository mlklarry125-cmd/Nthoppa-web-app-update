"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Receipt,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock data
const monthlyCashFlow = [
  { month: "Jan", inflows: 12500, outflows: 8900, net: 3600 },
  { month: "Feb", inflows: 13800, outflows: 9200, net: 4600 },
  { month: "Mar", inflows: 14200, outflows: 10100, net: 4100 },
  { month: "Apr", inflows: 15600, outflows: 11000, net: 4600 },
  { month: "May", inflows: 16800, outflows: 11500, net: 5300 },
  { month: "Jun", inflows: 17500, outflows: 12200, net: 5300 },
];

const profitLossData = [
  { month: "Jan", revenue: 12500, cogs: 4500, grossProfit: 8000, operatingExpenses: 3900, netProfit: 4100 },
  { month: "Feb", revenue: 13800, cogs: 4900, grossProfit: 8900, operatingExpenses: 4100, netProfit: 4800 },
  { month: "Mar", revenue: 14200, cogs: 5200, grossProfit: 9000, operatingExpenses: 4600, netProfit: 4400 },
  { month: "Apr", revenue: 15600, cogs: 5800, grossProfit: 9800, operatingExpenses: 5000, netProfit: 4800 },
  { month: "May", revenue: 16800, cogs: 6200, grossProfit: 10600, operatingExpenses: 5400, netProfit: 5200 },
  { month: "Jun", revenue: 17500, cogs: 6500, grossProfit: 11000, operatingExpenses: 5700, netProfit: 5300 },
];

const salesByCategory = [
  { name: "Plates", value: 8500, units: 189, percentage: 48 },
  { name: "Drinks", value: 4200, units: 350, percentage: 24 },
  { name: "Sweets", value: 2800, units: 280, percentage: 16 },
  { name: "Airtime", value: 1500, units: 125, percentage: 8 },
  { name: "Groceries", value: 700, units: 35, percentage: 4 },
];

const expenseBreakdown = [
  { category: "Rent", amount: 5000, percentage: 35 },
  { category: "Staff Wages", amount: 4000, percentage: 28 },
  { category: "Utilities", amount: 1200, percentage: 8 },
  { category: "Raw Materials", amount: 2500, percentage: 17 },
  { category: "Transport", amount: 900, percentage: 6 },
  { category: "Marketing", amount: 800, percentage: 6 },
];

const COLORS = ["#FF6B35", "#FF8F5E", "#FFB08C", "#FFD1BA", "#FFE8DE", "#10b981", "#8b5cf6", "#f59e0b"];

export default function MerchantAnalytics() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState("Jun");

  const handleExportCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {}).join(",");
    const rows = data.map(row => Object.values(row).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export Started", description: "CSV file is being downloaded." });
  };

  const handleExportPDF = () => {
    toast({ title: "Coming Soon", description: "PDF export will be available in the next update." });
  };

  const currentMonthData = profitLossData.find(d => d.month === selectedMonth) || profitLossData[5];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#FF6B35] hover:text-[#e55a2b] hover:bg-orange-50 -ml-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-500 mt-1">Track your business performance with detailed reports</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">P{currentMonthData.revenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Costs</p>
                <p className="text-2xl font-bold text-gray-900">P{(currentMonthData.cogs + currentMonthData.operatingExpenses).toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Net Profit</p>
                <p className="text-2xl font-bold text-[#FF6B35]">P{currentMonthData.netProfit.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#FF6B35]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Profit Margin</p>
                <p className="text-2xl font-bold text-gray-900">{((currentMonthData.netProfit / currentMonthData.revenue) * 100).toFixed(1)}%</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Reports */}
      <Tabs defaultValue="cashflow" className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
            <TabsTrigger value="pnl">Profit & Loss</TabsTrigger>
            <TabsTrigger value="categories">Sales by Category</TabsTrigger>
            <TabsTrigger value="expenses">Expense Summary</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExportCSV(monthlyCashFlow, "cash_flow_report")}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Cash Flow Tab */}
        <TabsContent value="cashflow" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Cash Flow Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyCashFlow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`P${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="inflows" name="Inflows" fill="#10b981" />
                    <Bar dataKey="outflows" name="Outflows" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500">Total Inflows</p>
                  <p className="text-2xl font-bold text-green-600">
                    P{monthlyCashFlow.reduce((sum, m) => sum + m.inflows, 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-500">Total Outflows</p>
                  <p className="text-2xl font-bold text-red-600">
                    P{monthlyCashFlow.reduce((sum, m) => sum + m.outflows, 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-[#FF6B35]/10 rounded-lg">
                  <p className="text-sm text-gray-500">Net Cash Position</p>
                  <p className="text-2xl font-bold text-[#FF6B35]">
                    P{monthlyCashFlow.reduce((sum, m) => sum + m.net, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profit & Loss Tab */}
        <TabsContent value="pnl" className="space-y-4">
          <div className="flex justify-end items-center gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => {
              const index = profitLossData.findIndex(d => d.month === selectedMonth);
              if (index > 0) setSelectedMonth(profitLossData[index - 1].month);
            }}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold">{selectedMonth}</span>
            <Button variant="outline" size="sm" onClick={() => {
              const index = profitLossData.findIndex(d => d.month === selectedMonth);
              if (index < profitLossData.length - 1) setSelectedMonth(profitLossData[index + 1].month);
            }}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Profit & Loss Statement - {selectedMonth}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 font-semibold">Revenue</td>
                      <td className="py-3 px-4 text-right font-bold text-green-600">P{currentMonthData.revenue.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 pl-8 text-gray-600">Cost of Goods Sold (COGS)</td>
                      <td className="py-3 px-4 text-right text-red-600">-P{currentMonthData.cogs.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 font-semibold">Gross Profit</td>
                      <td className="py-3 px-4 text-right font-bold text-[#FF6B35]">P{currentMonthData.grossProfit.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 pl-8 text-gray-600">Operating Expenses</td>
                      <td className="py-3 px-4 text-right text-red-600">-P{currentMonthData.operatingExpenses.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-gray-100 font-bold">
                      <td className="py-3 px-4">Net Profit</td>
                      <td className="py-3 px-4 text-right text-[#FF6B35]">P{currentMonthData.netProfit.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="h-80 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[currentMonthData]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`P${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#10b981" />
                    <Bar dataKey="cogs" name="COGS" fill="#ef4444" />
                    <Bar dataKey="operatingExpenses" name="Operating Expenses" fill="#f59e0b" />
                    <Bar dataKey="netProfit" name="Net Profit" fill="#FF6B35" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales by Category Tab */}
        <TabsContent value="categories" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Sales by Product Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`P${value.toLocaleString()}`, "Revenue"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-3 text-sm">Category</th>
                        <th className="text-right py-2 px-3 text-sm">Units Sold</th>
                        <th className="text-right py-2 px-3 text-sm">Revenue</th>
                        <th className="text-right py-2 px-3 text-sm">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesByCategory.map((cat, idx) => (
                        <tr key={cat.name} className="border-b border-gray-100">
                          <td className="py-2 px-3">
                            <Badge style={{ backgroundColor: COLORS[idx % COLORS.length], color: "white" }}>
                              {cat.name}
                            </Badge>
                          </td>
                          <td className="py-2 px-3 text-right">{cat.units}</td>
                          <td className="py-2 px-3 text-right font-semibold">P{cat.value.toLocaleString()}</td>
                          <td className="py-2 px-3 text-right">{cat.percentage}%</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-bold">
                        <td className="py-3 px-3">Total</td>
                        <td className="py-3 px-3 text-right">{salesByCategory.reduce((sum, c) => sum + c.units, 0)}</td>
                        <td className="py-3 px-3 text-right">P{salesByCategory.reduce((sum, c) => sum + c.value, 0).toLocaleString()}</td>
                        <td className="py-3 px-3 text-right">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expense Summary Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`P${value.toLocaleString()}`, "Amount"]} />
                    <Bar dataKey="amount" name="Amount (P)" fill="#FF6B35" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3 text-sm">Expense Category</th>
                      <th className="text-right py-2 px-3 text-sm">Amount (P)</th>
                      <th className="text-right py-2 px-3 text-sm">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseBreakdown.map((expense) => (
                      <tr key={expense.category} className="border-b border-gray-100">
                        <td className="py-2 px-3">{expense.category}</td>
                        <td className="py-2 px-3 text-right font-semibold">P{expense.amount.toLocaleString()}</td>
                        <td className="py-2 px-3 text-right">{expense.percentage}%</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-bold">
                      <td className="py-3 px-3">Total Expenses</td>
                      <td className="py-3 px-3 text-right">P{expenseBreakdown.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</td>
                      <td className="py-3 px-3 text-right">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}