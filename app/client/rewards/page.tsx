"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Coins, Gift, History, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CoinTransaction {
  id: number;
  amount: number;
  type: "earned" | "spent" | "redeemed";
  description: string;
  date: string;
}

export default function ClientRewardsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [coinBalance, setCoinBalance] = useState(1240);
  const [transactions, setTransactions] = useState<CoinTransaction[]>([
    { id: 1, amount: 50, type: "earned", description: "Completed Financial Literacy Module", date: "2026-05-20" },
    { id: 2, amount: 25, type: "earned", description: "Motshelo Contribution", date: "2026-05-18" },
    { id: 3, amount: 100, type: "earned", description: "Savings Milestone", date: "2026-05-15" },
    { id: 4, amount: 50, type: "spent", description: "Spin the Wheel", date: "2026-05-14" },
    { id: 5, amount: 200, type: "earned", description: "Referral Bonus", date: "2026-05-10" },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "earned": return "🎉";
      case "spent": return "🎡";
      case "redeemed": return "🎁";
      default: return "💰";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "earned": return "text-green-600 bg-green-50";
      case "spent": return "text-red-600 bg-red-50";
      case "redeemed": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Nthoppa Coins & Rewards</h1>
        <p className="text-gray-500 mt-1">Earn coins and redeem them for exciting prizes</p>
      </div>

      {/* Coin Balance Card */}
      <Card className="bg-gradient-to-r from-[#FF6B35] to-[#e55a2b] text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Your Balance</p>
              <p className="text-4xl font-bold">{coinBalance}</p>
              <p className="text-white/70 text-sm mt-1">Nthoppa Coins</p>
            </div>
            <Coins className="h-16 w-16 text-white/80" />
          </div>
          <Button
            className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white"
            onClick={() => router.push("/dashboard/gamification")}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Spin the Wheel!
          </Button>
        </CardContent>
      </Card>

      {/* Ways to Earn */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-[#FF6B35]" />
            Ways to Earn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "📚", label: "Complete Courses", reward: "+50 coins" },
              { icon: "💰", label: "Meet Savings Goals", reward: "+100 coins" },
              { icon: "👥", label: "Refer a Friend", reward: "+200 coins" },
              { icon: "🔄", label: "Motshelo Contributions", reward: "+25 coins" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-xs font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-[#FF6B35] font-semibold mt-1">{item.reward}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-[#FF6B35]" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(tx.type)}`}>
                    <span>{getTypeIcon(tx.type)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.description}</p>
                    <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className={`font-semibold ${tx.type === "earned" ? "text-green-600" : "text-red-600"}`}>
                  {tx.type === "earned" ? "+" : "-"}{tx.amount}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}