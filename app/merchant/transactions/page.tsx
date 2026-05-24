"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Search,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Payment methods with icons and colors
const paymentMethods = [
  { id: "orange", name: "Orange Money", icon: "📱", badgeColor: "bg-orange-100 text-orange-700" },
  { id: "myzaka", name: "Mascom MyZaka", icon: "💳", badgeColor: "bg-blue-100 text-blue-700" },
  { id: "smega", name: "BTC Smega", icon: "📲", badgeColor: "bg-green-100 text-green-700" },
  { id: "instantmoney", name: "Stanbic Instant Money", icon: "🏦", badgeColor: "bg-red-100 text-red-700" },
  { id: "cash", name: "Cash", icon: "💵", badgeColor: "bg-gray-100 text-gray-700" },
  { id: "card", name: "Card (POS)", icon: "💳", badgeColor: "bg-purple-100 text-purple-700" },
];

// Mock transaction data
const mockTransactions = [
  { id: "TXN001", date: "2026-05-20T14:30:00", customer: "Tshepo Molefe", items: ["Beef Stew Plate", "Coke"], total: 57, paymentMethod: "orange", status: "completed" },
  { id: "TXN002", date: "2026-05-20T12:15:00", customer: "Keitumetse Nkosi", items: ["Chicken Plate", "Fanta", "Chocolate Bar"], total: 60, paymentMethod: "cash", status: "completed" },
  { id: "TXN003", date: "2026-05-19T18:45:00", customer: "Modisa Radipabe", items: ["Beef Stew Plate", "Beef Stew Plate", "Coke", "Coke"], total: 114, paymentMethod: "card", status: "completed" },
  { id: "TXN004", date: "2026-05-19T11:00:00", customer: "Boitumelo Sebego", items: ["Chicken Plate"], total: 40, paymentMethod: "myzaka", status: "completed" },
  { id: "TXN005", date: "2026-05-18T16:20:00", customer: "Kagiso Modise", items: ["Beef Stew Plate", "Fanta"], total: 57, paymentMethod: "smega", status: "completed" },
  { id: "TXN006", date: "2026-05-18T09:30:00", customer: "Onalenna Masire", items: ["Chicken Plate", "Coke", "Chocolate Bar"], total: 60, paymentMethod: "instantmoney", status: "completed" },
  { id: "TXN007", date: "2026-05-17T13:00:00", customer: "Tshepo Molefe", items: ["Beef Stew Plate"], total: 45, paymentMethod: "orange", status: "completed" },
  { id: "TXN008", date: "2026-05-17T10:15:00", customer: "Keitumetse Nkosi", items: ["Coke", "Fanta", "Chocolate Bar"], total: 32, paymentMethod: "cash", status: "completed" },
];

export default function MerchantTransactions() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("all");
  const [dateRange, setDateRange] = useState<"today" | "week" | "month" | "all">("all");

  const getPaymentMethodBadge = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (!method) return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>;
    return (
      <Badge className={`${method.badgeColor} flex items-center gap-1`}>
        <span>{method.icon}</span>
        {method.name}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter transactions
  const filteredTransactions = mockTransactions.filter(t => {
    const matchesSearch = searchTerm === "" || 
      t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.items.join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayment = selectedPaymentMethod === "all" || t.paymentMethod === selectedPaymentMethod;
    
    let matchesDate = true;
    const now = new Date();
    const txDate = new Date(t.date);
    if (dateRange === "today") {
      matchesDate = txDate.toDateString() === now.toDateString();
    } else if (dateRange === "week") {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      matchesDate = txDate >= weekAgo;
    } else if (dateRange === "month") {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      matchesDate = txDate >= monthAgo;
    }
    
    return matchesSearch && matchesPayment && matchesDate;
  });

  // Calculate totals by payment method
  const totalsByPayment = paymentMethods.map(method => ({
    name: method.name,
    total: filteredTransactions
      .filter(t => t.paymentMethod === method.id)
      .reduce((sum, t) => sum + t.total, 0),
    count: filteredTransactions.filter(t => t.paymentMethod === method.id).length,
    icon: method.icon,
  })).filter(m => m.total > 0);

  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = filteredTransactions.length;

  const handleExportCSV = () => {
    const headers = ["Transaction ID", "Date", "Customer", "Items", "Total (BWP)", "Payment Method", "Status"];
    const rows = filteredTransactions.map(t => [
      t.id,
      formatDate(t.date),
      t.customer,
      t.items.join(", "),
      t.total,
      paymentMethods.find(m => m.id === t.paymentMethod)?.name || t.paymentMethod,
      t.status,
    ]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export Started", description: "CSV file is being downloaded." });
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        <p className="text-gray-500 mt-1">View and manage all your sales transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white border-0">
          <CardContent className="p-4">
            <p className="text-white/80 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">P{totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Average Transaction</p>
            <p className="text-2xl font-bold text-gray-900">
              P{totalTransactions ? (totalRevenue / totalTransactions).toFixed(2) : 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method Breakdown */}
      {totalsByPayment.length > 0 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#FF6B35]" />
              Revenue by Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {totalsByPayment.map((method) => (
                <div key={method.name} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">{method.icon}</div>
                  <p className="font-semibold text-gray-900 text-sm">{method.name}</p>
                  <p className="text-[#FF6B35] font-bold">P{method.total.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{method.count} transactions</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer, transaction ID, or items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              >
                <option value="all">All Payment Methods</option>
                {paymentMethods.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Transaction ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date & Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Items</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment Method</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{formatDate(transaction.date)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{transaction.customer}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {transaction.items.map((item, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#FF6B35]">P{transaction.total}</td>
                      <td className="py-3 px-4">{getPaymentMethodBadge(transaction.paymentMethod)}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-700">Completed</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t border-gray-200 font-bold">
                  <tr>
                    <td className="py-3 px-4" colSpan={4}>Total</td>
                    <td className="py-3 px-4 text-right text-[#FF6B35]">P{totalRevenue.toLocaleString()}</td>
                    <td className="py-3 px-4" colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}