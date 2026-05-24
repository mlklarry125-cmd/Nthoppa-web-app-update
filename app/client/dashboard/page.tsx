"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  PiggyBank,
  Shield,
  TrendingUp,
  Award,
  ChevronRight,
  Search,
  Building2,
  CheckCircle,
  X,
  Bell,
  Star,
  Zap,
  Target,
  Calendar,
  Clock,
  Users,
  Gift,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CoinsIcon, SavingsIcon, NthoppaSureIcon } from "@/components/ui/NthoppaIcons";

// Types
interface SavingsGoal {
  id: number;
  name: string;
  current: number;
  target: number;
  deadline: string;
  color: string;
}

interface ActiveLoan {
  id: number;
  amount: number;
  remaining: number;
  nextPayment: string;
  status: string;
}

interface InsuranceProduct {
  id: number;
  name: string;
  status: string;
  premium: number;
}

interface MotsheloGroup {
  id: number;
  name: string;
  role: string;
  contribution: number;
}

interface Employer {
  id: number;
  name: string;
  code: string;
  industry: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  nthoppaCoins: number;
  walletBalance: number;
  savingsGoals: SavingsGoal[];
  activeLoans: ActiveLoan[];
  insuranceProducts: InsuranceProduct[];
  motsheloGroups: MotsheloGroup[];
  linkedEmployer: Employer | null;
}

// Mock user data
const mockUser: User = {
  id: "user_123",
  name: "Tshepo Molefe",
  email: "tshepo@example.com",
  nthoppaCoins: 1240,
  walletBalance: 3450,
  savingsGoals: [
    { id: 1, name: "Business Startup", current: 12500, target: 25000, deadline: "2026-08-01", color: "#FF6B35" },
    { id: 2, name: "Emergency Fund", current: 8000, target: 15000, deadline: "2026-12-01", color: "#10b981" },
  ],
  activeLoans: [
    { id: 1, amount: 5000, remaining: 3200, nextPayment: "2026-06-15", status: "active" },
  ],
  insuranceProducts: [
    { id: 1, name: "Funeral Cover", status: "active", premium: 85 },
  ],
  motsheloGroups: [
    { id: 1, name: "Gaborone Women's Group", role: "member", contribution: 200 },
  ],
  linkedEmployer: null,
};

// Rotating motivational messages
const motivationalMessages = [
  { icon: "🎯", message: "Save P100 today and earn 25 Nthoppa Coins!" },
  { icon: "⭐", message: "Complete your next module to earn 50 Nthoppa Coins!" },
  { icon: "🏆", message: "You're just P2,000 away from your Business Startup goal!" },
  { icon: "📚", message: "Financial literacy = financial freedom. Keep learning!" },
  { icon: "🤝", message: "Invite a friend to join Nthoppa and earn 100 Nthoppa Coins!" },
  { icon: "🔄", message: "Consistent saving builds wealth. You've got this!" },
];

// Employer search results mock
const mockEmployers: Employer[] = [
  { id: 1, name: "Botswana Telecommunications Corporation", code: "BTC001", industry: "Telecommunications" },
  { id: 2, name: "First National Bank Botswana", code: "FNBB002", industry: "Banking" },
  { id: 3, name: "Debswana Diamond Company", code: "DEB003", industry: "Mining" },
  { id: 4, name: "Choppies Supermarket", code: "CHP004", industry: "Retail" },
  { id: 5, name: "Botswana Insurance Company", code: "BIC005", industry: "Insurance" },
];

export default function ClientDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User>(mockUser);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Employer[]>(mockEmployers);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const [hrCode, setHrCode] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setSearchResults(
        mockEmployers.filter(
          (emp) =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.code.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setSearchResults(mockEmployers);
    }
  }, [searchTerm]);

  const handleLinkEmployer = () => {
    if (!selectedEmployer && !hrCode) {
      toast({
        title: "Error",
        description: "Please search for your employer or enter an HR code",
        variant: "destructive",
      });
      return;
    }

    const employer = selectedEmployer || mockEmployers.find(e => e.code === hrCode);
    if (employer) {
      setUser({ ...user, linkedEmployer: employer });
      setShowLinkDialog(false);
      toast({
        title: "Success!",
        description: `You have successfully linked to ${employer.name}. Your employer can now see your financial wellness profile.`,
      });
    } else {
      toast({
        title: "Not Found",
        description: "We couldn't find an employer with that code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getGoalProgress = (current: number, target: number) => (current / target) * 100;

  const getDaysRemaining = (deadline: string) => {
    const diff = new Date(deadline).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-2 group transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </div>
        Back
      </button>

      {/* Rotating Motivational Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#FF6B35]/10 via-orange-50 to-[#FF6B35]/10 rounded-xl p-4 border border-[#FF6B35]/20"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{motivationalMessages[currentMessageIndex].icon}</span>
            <p className="flex-1 text-gray-800 font-medium">
              {motivationalMessages[currentMessageIndex].message}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#FF6B35]"
              onClick={() => router.push("/client/savings")}
            >
              Take Action →
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-[#FF6B35] to-[#FF8F5e] text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Nthoppa Coins</p>
                <p className="text-3xl font-bold">{user.nthoppaCoins}</p>
              </div>
              <CoinsIcon className="h-10 w-10 text-white/80" />
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={() => router.push("/client/rewards")}
            >
              Redeem Coins →
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Wallet Balance</p>
              <Wallet className="h-5 w-5 text-[#FF6B35]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">P{user.walletBalance.toLocaleString()}</p>
            <Button variant="link" className="p-0 mt-2 text-[#FF6B35]" onClick={() => router.push("/client/transactions")}>
              View Transactions →
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Active Savings Goals</p>
              <SavingsIcon className="h-5 w-5 text-[#FF6B35]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{user.savingsGoals.length}</p>
            <Button variant="link" className="p-0 mt-2 text-[#FF6B35]" onClick={() => router.push("/client/savings")}>
              Manage Goals →
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Insurance Active</p>
              <NthoppaSureIcon className="h-5 w-5 text-[#FF6B35]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{user.insuranceProducts.length}</p>
            <Button variant="link" className="p-0 mt-2 text-[#FF6B35]" onClick={() => router.push("/client/marketplace")}>
              Browse More →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Savings Goals Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Savings Goals</span>
            <Button variant="outline" size="sm" onClick={() => router.push("/client/savings")}>
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.savingsGoals.map((goal) => {
            const progress = getGoalProgress(goal.current, goal.target);
            const daysLeft = getDaysRemaining(goal.deadline);
            const remaining = goal.target - goal.current;
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{goal.name}</span>
                  <span className="text-gray-500">
                    P{goal.current.toLocaleString()} / P{goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{progress.toFixed(0)}% complete</span>
                  <span>{daysLeft} days left</span>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-sm border border-orange-100">
                  <p className="text-gray-700">
                    💡 <strong>Motivation:</strong> Save P{Math.min(remaining, 100)} today and earn{" "}
                    <span className="text-[#FF6B35] font-semibold">25 Nthoppa Coins</span> — you'll reach your goal in{" "}
                    <strong>{Math.ceil(daysLeft / 2)} months</strong> instead of{" "}
                    <strong>{daysLeft} months</strong>!
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: "/icons/24.jpeg", label: "Start Saving", href: "/client/savings" },
          { icon: "/icons/2.jpeg", label: "Get Insurance", href: "/client/marketplace" },
          { icon: "/icons/22.jpeg", label: "Apply for Loan", href: "/client/loans" },
          { icon: "/icons/24.jpeg", label: "Earn Coins", href: "/client/education" },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => router.push(action.href)}
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <img src={action.icon} alt={action.label} className="h-6 w-6" />
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Motshelo Groups Preview */}
      {user.motsheloGroups.length > 0 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>My Motshelo Groups</span>
              <Button variant="outline" size="sm" onClick={() => router.push("/client/motshelo")}>
                Manage Groups
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.motsheloGroups.map((group) => (
              <div key={group.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{group.name}</p>
                  <p className="text-sm text-gray-500">Contribution: P{group.contribution}/month</p>
                </div>
                <Badge variant="secondary">{group.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* My Workplace Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#FF6B35]" />
            My Workplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.linkedEmployer ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-semibold text-gray-900">Linked to {user.linkedEmployer.name}</p>
                    <p className="text-sm text-gray-600">
                      Your employer can now see your financial wellness progress and offer you salary advances.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUser({ ...user, linkedEmployer: null });
                    toast({ title: "Unlinked", description: "You have unlinked from your employer." });
                  }}
                >
                  Unlink                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Link your workplace to access exclusive benefits like salary advances, group insurance rates,
                and employer-sponsored financial wellness programs.
              </p>
              <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]">Link Your Employer</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Find Your Employer</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by company name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="text-center text-gray-500 text-sm">or</div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter HR Code"
                        value={hrCode}
                        onChange={(e) => setHrCode(e.target.value.toUpperCase())}
                      />
                      <p className="text-xs text-gray-500">
                        Ask your HR department for your company's unique HR code.
                      </p>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {searchResults.map((employer) => (
                        <div
                          key={employer.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedEmployer?.id === employer.id
                              ? "bg-[#FF6B35]/10 border border-[#FF6B35]"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedEmployer(employer)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{employer.name}</p>
                              <p className="text-xs text-gray-500">Code: {employer.code}</p>
                            </div>
                            {selectedEmployer?.id === employer.id && (
                              <CheckCircle className="h-5 w-5 text-[#FF6B35]" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleLinkEmployer}>
                      Link Employer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}