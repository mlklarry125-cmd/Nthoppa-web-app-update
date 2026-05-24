"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  PiggyBank,
  TrendingUp as CreditIcon,
  DollarSign,
  Calendar,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface EmployeeWellness {
  id: number;
  name: string;
  role: string;
  department: string;
  financialLiteracy: { completed: number; total: number; score: number };
  savingsGoals: { onTrack: number; total: number; score: number };
  creditScoreBand: { band: string; score: number };
  debtToIncome: { ratio: string; score: number };
  savingsConsistency: { level: string; score: number };
  overallScore: number;
  trend: "up" | "down" | "stable";
  trendValue: number;
}

// Mock data
const mockEmployees: EmployeeWellness[] = [
  {
    id: 1,
    name: "Josephine Morolong",
    role: "Senior Manager",
    department: "Operations",
    financialLiteracy: { completed: 8, total: 10, score: 16 },
    savingsGoals: { onTrack: 2, total: 2, score: 20 },
    creditScoreBand: { band: "Excellent", score: 20 },
    debtToIncome: { ratio: "Low", score: 15 },
    savingsConsistency: { level: "Always", score: 20 },
    overallScore: 91,
    trend: "up",
    trendValue: 5,
  },
  {
    id: 2,
    name: "Tshepo Kgosi",
    role: "Team Lead",
    department: "Sales",
    financialLiteracy: { completed: 6, total: 10, score: 12 },
    savingsGoals: { onTrack: 1, total: 2, score: 10 },
    creditScoreBand: { band: "Good", score: 16 },
    debtToIncome: { ratio: "Medium", score: 10 },
    savingsConsistency: { level: "Often", score: 16 },
    overallScore: 64,
    trend: "up",
    trendValue: 3,
  },
  {
    id: 3,
    name: "Mpho Sebina",
    role: "Associate",
    department: "Marketing",
    financialLiteracy: { completed: 4, total: 10, score: 8 },
    savingsGoals: { onTrack: 0, total: 1, score: 0 },
    creditScoreBand: { band: "Fair", score: 12 },
    debtToIncome: { ratio: "High", score: 5 },
    savingsConsistency: { level: "Sometimes", score: 10 },
    overallScore: 35,
    trend: "down",
    trendValue: 2,
  },
  {
    id: 4,
    name: "Boitumelo Phiri",
    role: "Intern",
    department: "Finance",
    financialLiteracy: { completed: 9, total: 10, score: 18 },
    savingsGoals: { onTrack: 1, total: 1, score: 20 },
    creditScoreBand: { band: "Good", score: 16 },
    debtToIncome: { ratio: "No Advances", score: 20 },
    savingsConsistency: { level: "Often", score: 16 },
    overallScore: 90,
    trend: "up",
    trendValue: 8,
  },
  {
    id: 5,
    name: "Lerato Kgosiemang",
    role: "Specialist",
    department: "IT",
    financialLiteracy: { completed: 3, total: 10, score: 6 },
    savingsGoals: { onTrack: 0, total: 2, score: 0 },
    creditScoreBand: { band: "Poor", score: 8 },
    debtToIncome: { ratio: "High", score: 5 },
    savingsConsistency: { level: "Rarely", score: 5 },
    overallScore: 24,
    trend: "down",
    trendValue: 4,
  },
];

const getTrendIcon = (trend: string) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
  return <div className="h-4 w-4 rounded-full bg-gray-400" />;
};

export default function FinancialWellnessPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeWellness | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const overallCompanyScore = Math.round(
    mockEmployees.reduce((sum, e) => sum + e.overallScore, 0) / mockEmployees.length
  );

  const handleViewDetails = (employee: EmployeeWellness) => {
    setSelectedEmployee(employee);
    setShowDetailDialog(true);
  };

  const getRecommendedActions = (employee: EmployeeWellness) => {
    const actions = [];
    if (employee.financialLiteracy.score < 14) {
      actions.push(`Complete ${10 - employee.financialLiteracy.completed} more financial literacy modules (+${(10 - employee.financialLiteracy.completed) * 2} points)`);
    }
    if (employee.savingsGoals.score < 20) {
      actions.push(`Set up a savings goal and contribute consistently (+${20 - employee.savingsGoals.score} points)`);
    }
    if (employee.debtToIncome.score < 15) {
      actions.push("Request a salary advance consolidation plan to lower your debt-to-income ratio");
    }
    if (employee.savingsConsistency.score < 16) {
      actions.push("Join a Motshelo group to improve savings consistency");
    }
    return actions;
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
        <h1 className="text-2xl font-bold text-gray-900">Financial Wellness</h1>
        <p className="text-gray-500 mt-1">Track employee financial health and well-being metrics</p>
      </div>

      {/* Overall Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white border-0">
          <CardContent className="p-6 text-center">
            <p className="text-white/80 text-sm mb-2">Company Average</p>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallCompanyScore / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 64 64)"
                />
              </svg>
              <div className="absolute">
                <span className="text-3xl font-bold">{overallCompanyScore}</span>
                <span className="text-sm">/100</span>
              </div>
            </div>
            <p className="text-white/80 text-sm mt-4">Overall Financial Wellness Score</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Wellness Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Excellent (80-100)</span>
                  <span className="font-semibold">{mockEmployees.filter(e => e.overallScore >= 80).length}</span>
                </div>
                <Progress value={mockEmployees.filter(e => e.overallScore >= 80).length / mockEmployees.length * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Good (60-79)</span>
                  <span className="font-semibold">{mockEmployees.filter(e => e.overallScore >= 60 && e.overallScore < 80).length}</span>
                </div>
                <Progress value={mockEmployees.filter(e => e.overallScore >= 60 && e.overallScore < 80).length / mockEmployees.length * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Needs Improvement (40-59)</span>
                  <span className="font-semibold">{mockEmployees.filter(e => e.overallScore >= 40 && e.overallScore < 60).length}</span>
                </div>
                <Progress value={mockEmployees.filter(e => e.overallScore >= 40 && e.overallScore < 60).length / mockEmployees.length * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>At Risk (&lt;40)</span>
                  <span className="font-semibold">{mockEmployees.filter(e => e.overallScore < 40).length}</span>
                </div>
                <Progress value={mockEmployees.filter(e => e.overallScore < 40).length / mockEmployees.length * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sub-scores Explanation */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Wellness Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Financial Literacy</p>
              <p className="text-lg font-bold text-blue-600">0-20</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <PiggyBank className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Savings Goals</p>
              <p className="text-lg font-bold text-green-600">0-20</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <CreditIcon className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Credit Score</p>
              <p className="text-lg font-bold text-purple-600">0-20</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Debt-to-Income</p>
              <p className="text-lg font-bold text-red-600">0-20</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Savings Consistency</p>
              <p className="text-lg font-bold text-orange-600">0-20</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#FF6B35]" />
            Employee Wellness Scores
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Employee</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Literacy</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Savings</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Credit</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">DTI</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Consistency</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Overall</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Trend</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{employee.name}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{employee.role}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-blue-100 text-blue-700">{employee.financialLiteracy.score}/20</Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-green-100 text-green-700">{employee.savingsGoals.score}/20</Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-purple-100 text-purple-700">{employee.creditScoreBand.score}/20</Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-red-100 text-red-700">{employee.debtToIncome.score}/20</Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-orange-100 text-orange-700">{employee.savingsConsistency.score}/20</Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-[#FF6B35]">{employee.overallScore}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(employee.trend)}
                        <span className="text-xs text-gray-500">{employee.trendValue > 0 ? `+${employee.trendValue}` : `-${employee.trendValue}`}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(employee)}
                        className="text-[#FF6B35]"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Employee Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Financial Wellness Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FF6B35]">{selectedEmployee.overallScore}/100</p>
                <p className="text-sm text-gray-500">Overall Score</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Financial Literacy ({selectedEmployee.financialLiteracy.completed}/{selectedEmployee.financialLiteracy.total} modules)</span>
                    <span className="font-bold">{selectedEmployee.financialLiteracy.score}/20</span>
                  </div>
                  <Progress value={selectedEmployee.financialLiteracy.score / 20 * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Savings Goals ({selectedEmployee.savingsGoals.onTrack}/{selectedEmployee.savingsGoals.total} on track)</span>
                    <span className="font-bold">{selectedEmployee.savingsGoals.score}/20</span>
                  </div>
                  <Progress value={selectedEmployee.savingsGoals.score / 20 * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Credit Score Band ({selectedEmployee.creditScoreBand.band})</span>
                    <span className="font-bold">{selectedEmployee.creditScoreBand.score}/20</span>
                  </div>
                  <Progress value={selectedEmployee.creditScoreBand.score / 20 * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Debt-to-Income Ratio ({selectedEmployee.debtToIncome.ratio})</span>
                    <span className="font-bold">{selectedEmployee.debtToIncome.score}/20</span>
                  </div>
                  <Progress value={selectedEmployee.debtToIncome.score / 20 * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Savings Consistency ({selectedEmployee.savingsConsistency.level})</span>
                    <span className="font-bold">{selectedEmployee.savingsConsistency.score}/20</span>
                  </div>
                  <Progress value={selectedEmployee.savingsConsistency.score / 20 * 100} className="h-2" />
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">Recommended Actions</p>
                <ul className="space-y-2">
                  {getRecommendedActions(selectedEmployee).map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                  {getRecommendedActions(selectedEmployee).length === 0 && (
                    <li className="text-sm text-green-600">Excellent! All metrics are on track.</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}