"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Gift,
  Send,
  Car,
  Coins,
  ShoppingBag,
  RefreshCw,
  Award,
  BookOpen,
  Users,
  PiggyBank,
  CheckCircle,
  History,
  Sparkles,
  Wallet,
  Zap,
  X,
  ChevronRight,
  UserPlus,
  Shield,
  TrendingUp,
  Trophy,
  Medal,
  Star,
  Crown,
  Lock,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CoinsIcon } from "@/components/ui/NthoppaIcons";

// Prize Wheel Segments
const SEGMENTS = [
  { name: "Airtime", value: "P10 Airtime", icon: "📱", color: "#FF6B35", prizeValue: 10, prizeType: "airtime" },
  { name: "InDrive Ride Credit", value: "P50 Ride Credit", icon: "🚗", color: "#2DD4BF", prizeValue: 50, prizeType: "indrive" },
  { name: "Cash Back", value: "P20 Cash", icon: "💰", color: "#FF6B35", prizeValue: 20, prizeType: "cash" },
  { name: "Nthoppa Merch", value: "T-Shirt", icon: "👕", color: "#8B5CF6", prizeValue: 0, prizeType: "merch" },
  { name: "Bonus Nthoppa Coins", value: "100 Coins", icon: "🪙", color: "#FF6B35", prizeValue: 100, prizeType: "coins" },
  { name: "NthoppaSure Discount", value: "20% Off", icon: "🛡️", color: "#EC4899", prizeValue: 20, prizeType: "discount" },
  { name: "Mystery Prize", value: "Surprise!", icon: "🎁", color: "#FF6B35", prizeValue: 0, prizeType: "mystery" },
  { name: "Try Again", value: "No Prize", icon: "😢", color: "#6B7280", prizeValue: 0, prizeType: "none" },
];

const SPIN_COST = 50;

interface SpinHistory {
  id: number;
  date: string;
  prizeName: string;
  prizeValue: string;
  status: "collected" | "sent" | "pending";
  recipient?: string;
}

interface Prize {
  id: number;
  prizeName: string;
  prizeValue: string;
  prizeType: string;
  wonDate: string;
  status: "pending" | "collected" | "sent";
  recipient?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  coinsReward: number;
  badge: string;
  unlocked: boolean;
}

interface LeaderboardEntry {
  id: number;
  name: string;
  territory: string;
  nthoppaCoins: number;
}

// Earn More Coins Actions
const earnActions = [
  { action: "Complete a savings goal", reward: 100, icon: PiggyBank, href: "/client/savings", color: "#FF6B35" },
  { action: "Finish a financial literacy module", reward: 50, icon: BookOpen, href: "/client/education", color: "#10b981" },
  { action: "Refer a friend", reward: 200, icon: UserPlus, href: "/client/refer", color: "#8b5cf6" },
  { action: "Make a contribution to Motshelo", reward: 25, icon: Users, href: "/client/motshelo", color: "#f59e0b" },
  { action: "Complete KYC verification", reward: 150, icon: Shield, href: "/client/profile", color: "#06b6d4" },
];

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { id: 1, name: "Tshepo Molefe", territory: "Gaborone", nthoppaCoins: 3250 },
  { id: 2, name: "Keitumetse Nkosi", territory: "Francistown", nthoppaCoins: 2890 },
  { id: 3, name: "Modisa Radipabe", territory: "Maun", nthoppaCoins: 2450 },
  { id: 4, name: "Boitumelo Sebego", territory: "Gaborone", nthoppaCoins: 2100 },
  { id: 5, name: "Kagiso Modise", territory: "Gaborone", nthoppaCoins: 1890 },
];

export default function GamificationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [coinBalance, setCoinBalance] = useState(1240);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<typeof SEGMENTS[0] | null>(null);
  const [showPrizeDialog, setShowPrizeDialog] = useState(false);
  const [prizeBox, setPrizeBox] = useState<Prize[]>([
    {
      id: 1,
      prizeName: "Airtime",
      prizeValue: "P10 Airtime",
      prizeType: "airtime",
      wonDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
    },
  ]);
  const [spinHistory, setSpinHistory] = useState<SpinHistory[]>([
    {
      id: 1,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      prizeName: "Airtime",
      prizeValue: "P10 Airtime",
      status: "pending",
    },
    {
      id: 2,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      prizeName: "Bonus Nthoppa Coins",
      prizeValue: "100 Coins",
      status: "collected",
    },
  ]);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [selectedPrizeForSend, setSelectedPrizeForSend] = useState<Prize | null>(null);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "1", name: "First Spin", description: "Spin the wheel for the first time", coinsReward: 25, badge: "🎡", unlocked: true },
    { id: "2", name: "Lucky Winner", description: "Win any prize from the wheel", coinsReward: 50, badge: "🍀", unlocked: true },
    { id: "3", name: "Jackpot!", description: "Win the Bonus Coins prize", coinsReward: 100, badge: "💰", unlocked: false },
    { id: "4", name: "Generous Giver", description: "Send a prize as a gift", coinsReward: 75, badge: "🎁", unlocked: false },
    { id: "5", name: "Coin Collector", description: "Reach 500 Nthoppa Coins", coinsReward: 150, badge: "🪙", unlocked: coinBalance >= 500 },
    { id: "6", name: "Spin Master", description: "Spin the wheel 10 times", coinsReward: 200, badge: "👑", unlocked: false },
  ]);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadLeaderboard();
    updateAchievements();
  }, [coinBalance, spinHistory.length]);

  const loadLeaderboard = async () => {
    try {
      const response = await fetch('/api/gamification/leaderboard');
      const data = await response.json();
      // Ensure data is an array before setting
      if (Array.isArray(data)) {
        setLeaderboard(data);
      } else {
        console.warn('Leaderboard API returned non-array data, using mock data');
        setLeaderboard(mockLeaderboard);
      }
    } catch (error) {
      console.error('Failed to load leaderboard, using mock data:', error);
      setLeaderboard(mockLeaderboard);
    }
  };

  const updateAchievements = () => {
    setAchievements(prev => prev.map(ach => {
      if (ach.name === "Coin Collector" && coinBalance >= 500 && !ach.unlocked) {
        toast({ title: "Achievement Unlocked!", description: `You earned "${ach.name}" and +${ach.coinsReward} Nthoppa Coins!` });
        setCoinBalance(prevBalance => prevBalance + ach.coinsReward);
        return { ...ach, unlocked: true };
      }
      return ach;
    }));
  };

  const getRandomSegment = () => {
    const random = Math.random();
    // Weighted: lower chance for "Try Again"
    if (random < 0.7) {
      const nonTryAgain = SEGMENTS.filter(s => s.name !== "Try Again");
      return nonTryAgain[Math.floor(Math.random() * nonTryAgain.length)];
    }
    return SEGMENTS[7]; // Try Again
  };

  const spinWheel = () => {
    if (coinBalance < SPIN_COST) {
      toast({
        title: "Insufficient Nthoppa Coins",
        description: `You need ${SPIN_COST} Nthoppa Coins to spin. Complete actions below to earn more!`,
        variant: "destructive",
      });
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    setCoinBalance(prev => prev - SPIN_COST);

    const segment = getRandomSegment();
    setSelectedSegment(segment);

    const segmentAngle = 360 / SEGMENTS.length;
    const segmentIndex = SEGMENTS.findIndex(s => s.name === segment.name);
    const targetAngle = (360 - (segmentIndex * segmentAngle)) + (Math.random() * segmentAngle);
    const spins = 360 * 5; // 5 full rotations
    const newRotation = rotation + spins + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      
      // Check for First Spin achievement
      if (spinHistory.length === 0) {
        const firstSpinAch = achievements.find(a => a.name === "First Spin");
        if (firstSpinAch && !firstSpinAch.unlocked) {
          setAchievements(prev => prev.map(a => 
            a.name === "First Spin" ? { ...a, unlocked: true } : a
          ));
          setCoinBalance(prev => prev + 25);
          toast({ title: "Achievement Unlocked!", description: "You earned 'First Spin' and +25 Nthoppa Coins!" });
        }
      }
      
      // Add to prize box if not "Try Again"
      if (segment.name !== "Try Again") {
        const newPrize: Prize = {
          id: Date.now(),
          prizeName: segment.name,
          prizeValue: segment.value,
          prizeType: segment.prizeType,
          wonDate: new Date().toISOString(),
          status: "pending",
        };
        setPrizeBox(prev => [newPrize, ...prev]);
        
        // Add to history
        setSpinHistory(prev => [{
          id: Date.now(),
          date: new Date().toISOString(),
          prizeName: segment.name,
          prizeValue: segment.value,
          status: "pending",
        }, ...prev]);
        
        // Check for Lucky Winner achievement
        const luckyWinnerAch = achievements.find(a => a.name === "Lucky Winner");
        if (luckyWinnerAch && !luckyWinnerAch.unlocked) {
          setAchievements(prev => prev.map(a => 
            a.name === "Lucky Winner" ? { ...a, unlocked: true } : a
          ));
          setCoinBalance(prev => prev + 50);
          toast({ title: "Achievement Unlocked!", description: "You earned 'Lucky Winner' and +50 Nthoppa Coins!" });
        }
        
        // Check for Jackpot achievement
        if (segment.name === "Bonus Nthoppa Coins") {
          const jackpotAch = achievements.find(a => a.name === "Jackpot!");
          if (jackpotAch && !jackpotAch.unlocked) {
            setAchievements(prev => prev.map(a => 
              a.name === "Jackpot!" ? { ...a, unlocked: true } : a
            ));
            setCoinBalance(prev => prev + 100);
            toast({ title: "Achievement Unlocked!", description: "You earned 'Jackpot!' and +100 Nthoppa Coins!" });
          }
        }
        
        // Check for Spin Master achievement
        if (spinHistory.length + 1 >= 10) {
          const spinMasterAch = achievements.find(a => a.name === "Spin Master");
          if (spinMasterAch && !spinMasterAch.unlocked) {
            setAchievements(prev => prev.map(a => 
              a.name === "Spin Master" ? { ...a, unlocked: true } : a
            ));
            setCoinBalance(prev => prev + 200);
            toast({ title: "Achievement Unlocked!", description: "You earned 'Spin Master' and +200 Nthoppa Coins!" });
          }
        }
        
        setShowPrizeDialog(true);
      } else {
        toast({
          title: "Try Again!",
          description: "Better luck next time! Spin again for another chance to win.",
        });
        // Add to history
        setSpinHistory(prev => [{
          id: Date.now(),
          date: new Date().toISOString(),
          prizeName: "Try Again",
          prizeValue: "No Prize",
          status: "collected",
        }, ...prev]);
      }
    }, 4000);
  };

  const handleCollectPrize = (prize: Prize) => {
    // Update based on prize type
    if (prize.prizeType === "coins") {
      const coinValue = parseInt(prize.prizeValue.split(" ")[0]);
      setCoinBalance(prev => prev + coinValue);
      toast({ title: "Prize Collected!", description: `You received ${prize.prizeValue}!` });
    } else if (prize.prizeType === "cash") {
      toast({ title: "Prize Collected!", description: `${prize.prizeValue} has been added to your wallet.` });
    } else if (prize.prizeType === "airtime") {
      toast({ title: "Airtime Added!", description: `${prize.prizeValue} has been sent to your phone.` });
    } else if (prize.prizeType === "indrive") {
      toast({ title: "InDrive Credit Added!", description: `${prize.prizeValue} has been credited to your linked InDrive account.` });
    } else if (prize.prizeType === "discount") {
      toast({ title: "Discount Applied!", description: `${prize.prizeValue} off your next NthoppaSure purchase.` });
    } else if (prize.prizeType === "merch") {
      toast({ title: "Merchandise Claimed!", description: "Our team will contact you for shipping details." });
    } else if (prize.prizeType === "mystery") {
      toast({ title: "Mystery Prize!", description: "You've won a surprise gift! Check your email for details." });
    }

    setPrizeBox(prev => prev.map(p => 
      p.id === prize.id ? { ...p, status: "collected" } : p
    ));
    setSpinHistory(prev => prev.map(h => 
      h.id === prize.id ? { ...h, status: "collected" } : h
    ));
  };

  const handleSendAsGift = (prize: Prize) => {
    setSelectedPrizeForSend(prize);
    setShowSendDialog(true);
  };

  const confirmSendGift = () => {
    if (!recipientUsername.trim()) {
      toast({ title: "Error", description: "Please enter a username or phone number", variant: "destructive" });
      return;
    }

    toast({
      title: "Gift Sent!",
      description: `Your ${selectedPrizeForSend?.prizeName} prize has been sent to ${recipientUsername}.`,
    });

    // Check for Generous Giver achievement
    const generousGiverAch = achievements.find(a => a.name === "Generous Giver");
    if (generousGiverAch && !generousGiverAch.unlocked) {
      setAchievements(prev => prev.map(a => 
        a.name === "Generous Giver" ? { ...a, unlocked: true } : a
      ));
      setCoinBalance(prev => prev + 75);
      toast({ title: "Achievement Unlocked!", description: "You earned 'Generous Giver' and +75 Nthoppa Coins!" });
    }

    setPrizeBox(prev => prev.map(p => 
      p.id === selectedPrizeForSend?.id ? { ...p, status: "sent", recipient: recipientUsername } : p
    ));
    setSpinHistory(prev => prev.map(h => 
      h.id === selectedPrizeForSend?.id ? { ...h, status: "sent", recipient: recipientUsername } : h
    ));
    setShowSendDialog(false);
    setRecipientUsername("");
    setSelectedPrizeForSend(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  const getPrizeStatusBadge = (status: string) => {
    switch (status) {
      case "collected":
        return <Badge className="bg-green-100 text-green-700">Collected</Badge>;
      case "sent":
        return <Badge className="bg-blue-100 text-blue-700">Sent</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
    }
  };

  const level = Math.floor(coinBalance / 500) + 1;
  const nextLevelCoins = level * 500;
  const progress = (coinBalance / nextLevelCoins) * 100;
  // Safely calculate leaderboard rank - ensure leaderboard is an array
  const leaderboardRank = Array.isArray(leaderboard) && leaderboard.length > 0 
    ? (leaderboard.findIndex(l => l.id === 1) + 1) || 1
    : 1;

  // Ensure leaderboard is always an array for rendering
  const safeLeaderboard = Array.isArray(leaderboard) ? leaderboard : mockLeaderboard;

  return (
    <DashboardLayout type="agent">
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
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nthoppa Rewards</h1>
            <p className="text-gray-500 mt-1">Spin the wheel, win prizes, and earn Nthoppa Coins</p>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#FF6B35]/10 to-orange-50 px-5 py-3 rounded-full border border-[#FF6B35]/20">
            <CoinsIcon className="h-6 w-6 text-[#FF6B35]" />
            <span className="text-2xl font-bold text-[#FF6B35]">{coinBalance}</span>
            <span className="text-sm text-gray-600">Nthoppa Coins</span>
          </div>
        </div>

        {/* Coins and Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-gray-200 bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Your Nthoppa Coins</p>
                  <p className="text-4xl font-bold mt-2">{coinBalance}</p>
                  <p className="text-white/70 text-sm mt-1">
                    Rank #{leaderboardRank} on leaderboard
                  </p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500 text-sm">Level {level}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {coinBalance} / {nextLevelCoins} coins
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-[#FF6B35]" />
                </div>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">
                {nextLevelCoins - coinBalance} coins until next level
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Spin Section */}
        <Card className="border-gray-200 overflow-hidden">
          <CardContent className="p-6">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Prize Wheel */}
              <div className="relative flex flex-col items-center">
                <div className="relative w-80 h-80">
                  {/* Fixed Pointer */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-[#FF6B35]" />
                  </div>
                  
                  {/* Wheel */}
                  <div
                    ref={wheelRef}
                    className="w-full h-full rounded-full transition-transform duration-4000 ease-out"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: isSpinning ? "transform 4s cubic-bezier(0.25, 0.1, 0.15, 1)" : "none",
                    }}
                  >
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {SEGMENTS.map((segment, index) => {
                        const startAngle = (index * 360) / SEGMENTS.length;
                        const endAngle = ((index + 1) * 360) / SEGMENTS.length;
                        const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                        const startX = 100 + 90 * Math.cos((startAngle - 90) * Math.PI / 180);
                        const startY = 100 + 90 * Math.sin((startAngle - 90) * Math.PI / 180);
                        const endX = 100 + 90 * Math.cos((endAngle - 90) * Math.PI / 180);
                        const endY = 100 + 90 * Math.sin((endAngle - 90) * Math.PI / 180);
                        const textAngle = startAngle + (360 / SEGMENTS.length) / 2;
                        const textX = 100 + 65 * Math.cos((textAngle - 90) * Math.PI / 180);
                        const textY = 100 + 65 * Math.sin((textAngle - 90) * Math.PI / 180);
                        
                        return (
                          <g key={segment.name}>
                            <path
                              d={`M 100 100 L ${startX} ${startY} A 90 90 0 ${largeArc} 1 ${endX} ${endY} Z`}
                              fill={segment.color}
                              stroke="#fff"
                              strokeWidth="2"
                            />
                            <text
                              x={textX}
                              y={textY}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="#fff"
                              fontSize="10"
                              fontWeight="bold"
                            >
                              {segment.icon}
                            </text>
                          </g>
                        );
                      })}
                      <circle cx="100" cy="100" r="20" fill="#fff" stroke="#FF6B35" strokeWidth="3" />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Spin costs <span className="font-bold text-[#FF6B35]">{SPIN_COST} Nthoppa Coins</span>
                  </p>
                  <Button
                    onClick={spinWheel}
                    disabled={isSpinning || coinBalance < SPIN_COST}
                    className={`bg-[#FF6B35] hover:bg-[#e55a2b] text-white px-8 py-6 text-lg ${
                      isSpinning ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSpinning ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Spinning...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Spin Now!
                      </>
                    )}
                  </Button>
                  {coinBalance < SPIN_COST && (
                    <p className="text-xs text-red-500 mt-2">
                      You need {SPIN_COST - coinBalance} more Nthoppa Coins to spin
                    </p>
                  )}
                </div>
              </div>

              {/* Prize Box */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-[#FF6B35]" />
                  Your Prize Box
                  <Badge className="bg-[#FF6B35] text-white">{prizeBox.filter(p => p.status === "pending").length}</Badge>
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {prizeBox.filter(p => p.status === "pending").length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Gift className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No pending prizes</p>
                      <p className="text-xs">Spin the wheel to win prizes!</p>
                    </div>
                  )}
                  {prizeBox.filter(p => p.status === "pending").map((prize) => (
                    <div key={prize.id} className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {prize.prizeName === "Airtime" && "📱"}
                            {prize.prizeName === "InDrive Ride Credit" && "🚗"}
                            {prize.prizeName === "Cash Back" && "💰"}
                            {prize.prizeName === "Nthoppa Merch" && "👕"}
                            {prize.prizeName === "Bonus Nthoppa Coins" && "🪙"}
                            {prize.prizeName === "NthoppaSure Discount" && "🛡️"}
                            {prize.prizeName === "Mystery Prize" && "🎁"}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-900">{prize.prizeName}</p>
                            <p className="text-xs text-gray-500">{prize.prizeValue}</p>
                          </div>
                        </div>
                        {getPrizeStatusBadge(prize.status)}
                      </div>
                      {prize.prizeType === "indrive" && (
                        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                          <Car className="h-3 w-3" />
                          Will be credited to your linked InDrive account
                        </p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleCollectPrize(prize)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Collect
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleSendAsGift(prize)}
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Send as Gift
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-[#FF6B35]" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl border p-4 transition-shadow ${
                  achievement.unlocked ? "border-[#FF6B35]/30 shadow-md" : "border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{achievement.badge}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-[#FF6B35] text-white">
                        +{achievement.coinsReward} Nthoppa Coins
                      </Badge>
                      {achievement.unlocked && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {!achievement.unlocked && (
                        <Lock className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spin History */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-[#FF6B35]" />
              Spin History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {spinHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No spins yet</p>
                <p className="text-xs">Spin the wheel to start winning!</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-gray-500 pb-2 border-b border-gray-100">
                  <span>Date</span>
                  <span>Prize</span>
                  <span>Value</span>
                  <span>Status</span>
                </div>
                {spinHistory.map((history) => (
                  <div key={history.id} className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-500">{formatDate(history.date)}</span>
                    <span className="font-medium text-gray-900">{history.prizeName}</span>
                    <span className="text-gray-600">{history.prizeValue}</span>
                    <span>{getPrizeStatusBadge(history.status)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#FF6B35]" />
            Leaderboard
          </h2>
          <Card className="border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rank</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Agent</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Territory</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Nthoppa Coins</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeLeaderboard.length > 0 ? (
                      safeLeaderboard.map((agent, index) => (
                        <tr key={agent.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                            {index === 1 && <Medal className="h-5 w-5 text-gray-400" />}
                            {index === 2 && <Medal className="h-5 w-5 text-amber-600" />}
                            {index > 2 && <span className="text-gray-600">#{index + 1}</span>}
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">{agent.name}</td>
                          <td className="py-3 px-4 text-gray-600">{agent.territory}</td>
                          <td className="py-3 px-4 text-right font-bold text-[#FF6B35]">{agent.nthoppaCoins}</td>
                          <td className="py-3 px-4 text-right text-gray-600">Lvl {Math.floor(agent.nthoppaCoins / 500) + 1}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-gray-500">
                          <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                          <p>No leaderboard data available</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earn More Nthoppa Coins Section */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CoinsIcon className="h-5 w-5 text-[#FF6B35]" />
              Earn More Nthoppa Coins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnActions.map((action, index) => (
                <motion.div
                  key={action.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => router.push(action.href)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                      <action.icon className="h-5 w-5" style={{ color: action.color }} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{action.action}</p>
                      <p className="text-xs text-gray-500">+{action.reward} Nthoppa Coins</p>
                    </div>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-[#FF6B35] text-sm">
                    Complete Action →
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prize Won Dialog */}
      <Dialog open={showPrizeDialog} onOpenChange={setShowPrizeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">🎉 You Won! 🎉</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="text-6xl mb-4">
              {selectedSegment?.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedSegment?.name}</h3>
            <p className="text-3xl font-bold text-[#FF6B35] mb-4">{selectedSegment?.value}</p>
            <p className="text-sm text-gray-500 mb-6">
              Your prize has been added to your Prize Box. Collect it now or send it as a gift!
            </p>
            <Button
              className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]"
              onClick={() => setShowPrizeDialog(false)}
            >
              View in Prize Box
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send as Gift Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Prize as Gift</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Sending:</p>
              <p className="font-bold text-lg text-[#FF6B35]">{selectedPrizeForSend?.prizeName}</p>
              <p className="text-sm">{selectedPrizeForSend?.prizeValue}</p>
            </div>
            <div>
              <Label>Recipient Username or Phone Number</Label>
              <Input
                placeholder="e.g., @tshepo_m or +267 71 234 567"
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
              />
            </div>
            <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={confirmSendGift}>
              <Send className="h-4 w-4 mr-2" />
              Send Gift
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}