// app/dashboard/reports/components/ReportsSummaryCard.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
} from "lucide-react";

interface ReportData {
  type: string;
  dateRange: { from: string; to: string };
  generatedAt: string;
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  inactiveUsers: number;
  averageCompletion: number;
  [key: string]: any;
}

interface ReportsSummaryCardProps {
  report: ReportData;
}

export function ReportsSummaryCard({ report }: ReportsSummaryCardProps) {
  const stats = [
    {
      label: "Total Users",
      value: report.totalUsers,
      icon: <Users className="h-5 w-5 text-[#FF6B35]" />,
      color: "text-[#FF6B35]",
    },
    {
      label: "Active",
      value: report.activeUsers,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      color: "text-green-600",
    },
    {
      label: "Pending",
      value: report.pendingUsers,
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      color: "text-yellow-600",
    },
    {
      label: "Inactive",
      value: report.inactiveUsers,
      icon: <XCircle className="h-5 w-5 text-gray-400" />,
      color: "text-gray-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#FF6B35]" />
            Report Summary — {report.type}
          </CardTitle>
          <p className="text-sm text-gray-500">
            Generated on {new Date(report.generatedAt).toLocaleString()}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg text-center"
              >
                {s.icon}
                <span className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</span>
                <span className="text-xs text-gray-500 mt-1">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Completion rate */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Average Completion Rate</span>
              <span className="font-bold text-black">{report.averageCompletion}%</span>
            </div>
            <Progress value={report.averageCompletion} className="h-2" />
          </div>

          {/* Active vs total bar */}
          {report.totalUsers > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Active Users</span>
                <span className="font-bold text-black">
                  {report.activeUsers} / {report.totalUsers}
                </span>
              </div>
              <Progress
                value={(report.activeUsers / report.totalUsers) * 100}
                className="h-2"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
