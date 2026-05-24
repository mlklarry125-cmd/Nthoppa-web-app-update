"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  PiggyBank,
  Target,
  Calendar,
  TrendingUp,
  Gift,
  Zap,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CoinsIcon, SavingsIcon } from "@/components/ui/NthoppaIcons";

interface SavingsGoal {
  id: number;
  name: string;
  current: number;
  target: number;
  deadline: string;
  monthlyContribution: number;
  color: string;
}

// Mock data
const mockGoals: SavingsGoal[] = [
  { id: 1, name: "Business Startup", current: 12500, target: 25000, deadline: "2026-08-01", monthlyContribution: 2000, color: "#FF6B35" },
  { id: 2, name: "Emergency Fund", current: 8000, target: 15000, deadline: "2026-12-01", monthlyContribution: 1500, color: "#10b981" },
  { id: 3, name: "School Fees", current: 3500, target: 8000, deadline: "2027-01-15", monthlyContribution: 1000, color: "#8b5cf6" },
];

export default function SavingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [goals, setGoals] = useState(mockGoals);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: 0,
    monthlyContribution: 0,
    deadline: "",
  });

  const getProgress = (current: number, target: number) => (current / target) * 100;
  
  const getDaysRemaining = (deadline: string) => {
    const diff = new Date(deadline).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  
  const getMonthsRemaining = (deadline: string) => {
    const diff = new Date(deadline).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24 * 30));
  };
  
  const getAmountNeeded = (current: number, target: number) => target - current;
  
  const calculateProjectedCompletion = (goal: SavingsGoal, extraSave: number) => {
    const remaining = getAmountNeeded(goal.current, goal.target);
    const newRemaining = remaining - extraSave;
    const currentMonths = Math.ceil(remaining / goal.monthlyContribution);
    const newMonths = Math.ceil(newRemaining / goal.monthlyContribution);
    return { currentMonths, newMonths };
  };

  const handleAddGoal = () => {
    if (!newGoal.name || newGoal.target <= 0 || newGoal.monthlyContribution <= 0 || !newGoal.deadline) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    
    const newId = Math.max(...goals.map(g => g.id)) + 1;
    setGoals([...goals, { ...newGoal, id: newId, current: 0, color: "#FF6B35" }]);
    setShowAddDialog(false);
    setNewGoal({ name: "", target: 0, monthlyContribution: 0, deadline: "" });
    toast({ title: "Success", description: "Savings goal created!" });
  };

  const handleContribute = (goalId: number, amount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = goal.current + amount;
        toast({
          title: "Contribution Added!",
          description: `You added P${amount} to "${goal.name}". You earned 25 Nthoppa Coins!`,
        });
        return { ...goal, current: newCurrent };
      }
      return goal;
    }));
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals(goals.filter(g => g.id !== goalId));
    toast({ title: "Goal Deleted", description: "Your savings goal has been removed." });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Savings Goals</h1>
          <p className="text-gray-500 mt-1">Track your progress and earn Nthoppa Coins for every contribution</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]">
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Savings Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Goal Name</Label>
                <Input
                  placeholder="e.g., New Car, House Deposit, Vacation"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Target Amount (P)</Label>
                <Input
                  type="number"
                  placeholder="Enter target amount"
                  value={newGoal.target || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, target: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label>Monthly Contribution (P)</Label>
                <Input
                  type="number"
                  placeholder="How much can you save monthly?"
                  value={newGoal.monthlyContribution || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label>Target Date</Label>
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
              <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleAddGoal}>
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        {goals.map((goal) => {
          const progress = getProgress(goal.current, goal.target);
          const daysLeft = getDaysRemaining(goal.deadline);
          const monthsLeft = getMonthsRemaining(goal.deadline);
          const amountNeeded = getAmountNeeded(goal.current, goal.target);
          const extraSave = Math.min(amountNeeded, 100);
          const { currentMonths, newMonths } = calculateProjectedCompletion(goal, extraSave);
          const coinReward = Math.floor(extraSave / 4);
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                      <PiggyBank className="h-6 w-6 text-[#FF6B35]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{goal.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {daysLeft} days left
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          P{goal.monthlyContribution}/month
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">
                      P{goal.current.toLocaleString()} / P{goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{progress.toFixed(1)}% complete</span>
                    <span>P{amountNeeded.toLocaleString()} to go</span>
                  </div>
                </div>

                {/* Dynamic Motivational Message */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-4 border border-orange-100">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-800">
                        <strong>💡 Quick Win:</strong> Save{" "}
                        <span className="font-bold text-[#FF6B35]">P{extraSave}</span> today toward "
                        <strong>{goal.name}</strong>" and earn{" "}
                        <span className="font-bold text-[#FF6B35]">{coinReward} Nthoppa Coins</span>!
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        You'll reach your goal in <strong>{newMonths} months</strong> instead of{" "}
                        <strong>{currentMonths} months</strong> — that's {currentMonths - newMonths} months sooner!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleContribute(goal.id, extraSave)}
                    className="flex-1 bg-[#FF6B35] hover:bg-[#e55a2b]"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Save P{extraSave} Today
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/client/transactions")}
                    className="flex-1"
                  >
                    View History
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-12">
          <SavingsIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No savings goals yet</h3>
          <p className="text-gray-500 mb-4">Create your first savings goal to start building wealth!</p>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]">
                <Plus className="h-4 w-4 mr-2" />
                Create Goal
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      )}

      {/* Tips Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Savings Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "Set up automatic monthly transfers to stay on track",
            "Every P100 you save earns you 25 Nthoppa Coins",
            "Share your goal progress to earn bonus coins when friends save with you",
            "Complete financial literacy modules for extra coin rewards",
          ].map((tip, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-[#FF6B35]" />
              {tip}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}