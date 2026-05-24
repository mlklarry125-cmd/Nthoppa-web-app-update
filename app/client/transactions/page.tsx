"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, History, ChevronLeft } from "lucide-react";

export default function ClientTransactionsPage() {
  const router = useRouter();
  const transactions = [
    { type: "credit", description: "Salary Deposit", amount: 3500, date: "Apr 20, 2026", category: "Income", balance: 4250 },
    { type: "debit", description: "Rent Payment", amount: 1200, date: "Apr 19, 2026", category: "Housing", balance: 750 },
    { type: "credit", description: "Motshelo Payout", amount: 800, date: "Apr 15, 2026", category: "Motshelo", balance: 1950 },
    { type: "debit", description: "Groceries - Choppies", amount: 350, date: "Apr 14, 2026", category: "Food", balance: 1150 },
    { type: "debit", description: "Electricity - BPC", amount: 180, date: "Apr 12, 2026", category: "Utilities", balance: 1500 },
    { type: "credit", description: "Freelance Payment", amount: 600, date: "Apr 10, 2026", category: "Income", balance: 1680 },
    { type: "debit", description: "Motshelo Contribution", amount: 250, date: "Apr 5, 2026", category: "Motshelo", balance: 1080 },
    { type: "debit", description: "Transport - BTC Bus", amount: 85, date: "Apr 3, 2026", category: "Transport", balance: 1330 },
  ];

  const total_in = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const total_out = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);

  return (
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

      <div>
        <h1 className="text-2xl font-bold text-black flex items-center gap-2"><History className="h-6 w-6 text-[#FF6B35]" />Transaction History</h1>
        <p className="text-gray-500 text-sm mt-1">April 2026</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-green-200 bg-green-50"><CardContent className="p-4"><p className="text-xs text-gray-500">Total In</p><p className="text-2xl font-bold text-green-700">+BWP {total_in.toLocaleString()}</p></CardContent></Card>
        <Card className="border-red-200 bg-red-50"><CardContent className="p-4"><p className="text-xs text-gray-500">Total Out</p><p className="text-2xl font-bold text-red-600">-BWP {total_out.toLocaleString()}</p></CardContent></Card>
      </div>
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {tx.type === 'credit' ? <ArrowUpRight className="h-4 w-4 text-green-600" /> : <ArrowDownRight className="h-4 w-4 text-red-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">{tx.description}</p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.type === 'credit' ? '+' : '-'}BWP {tx.amount.toLocaleString()}
                  </p>
                  <Badge className="bg-gray-100 text-gray-600 text-xs">{tx.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}