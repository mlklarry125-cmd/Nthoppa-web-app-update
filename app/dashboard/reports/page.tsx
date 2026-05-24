"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { getAgentSession } from "@/lib/storage";
import { api } from "@/lib/api";
import type { Report } from "@/lib/api";
import { ReportsFilters } from "./components/ReportsFilters";
import type { ReportType } from "./components/ReportsFilters";
import { ReportsSummaryCard } from "./components/ReportsSummaryCard";
import { ReportsTable } from "./components/ReportsTable";
import { ChevronLeft } from "lucide-react";

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [reportType, setReportType] = useState<ReportType>("registration");
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split("T")[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split("T")[0]);
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentId, setAgentId] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const session = getAgentSession();
    const id = session?.agentId ?? "";
    setAgentId(id);
    loadReports(id);
  }, []);

  const loadReports = async (id: string) => {
    try {
      const data = await api.getReports(id || undefined);
      setReports(data.slice(0, 10));
    } catch {
      toast({ title: "Error", description: "Failed to load reports.", variant: "destructive" });
    }
  };

  const handleQuickSelect = (preset: string) => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (preset === "today") {
      setDateFrom(today);
      setDateTo(today);
    } else if (preset === "week") {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      setDateFrom(weekAgo.toISOString().split("T")[0]);
      setDateTo(today);
    } else if (preset === "month") {
      const monthAgo = new Date(now);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      setDateFrom(monthAgo.toISOString().split("T")[0]);
      setDateTo(today);
    } else if (preset === "year") {
      const yearAgo = new Date(now);
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      setDateFrom(yearAgo.toISOString().split("T")[0]);
      setDateTo(today);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const report = await api.generateReport({
        type: reportType,
        agentId: agentId || undefined,
        dateFrom,
        dateTo,
      });
      setActiveReport(report);
      setReports((prev) => [report, ...prev].slice(0, 10));
      toast({ title: "Report Generated", description: "Your report is ready." });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to generate report.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewReport = (report: Report) => {
    setActiveReport(report);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const normalizedData = activeReport
    ? typeof activeReport.data === "string"
      ? JSON.parse(activeReport.data)
      : activeReport.data
    : null;

  return (
    <DashboardLayout type="agent">
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

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-black">Reports</h1>
          <p className="text-gray-500 mt-1">Generate and review performance reports</p>
        </motion.div>

        {/* Filters */}
        <ReportsFilters
          reportType={reportType}
          dateFrom={dateFrom}
          dateTo={dateTo}
          isGenerating={isGenerating}
          onReportTypeChange={setReportType}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onGenerate={handleGenerate}
          onQuickSelect={handleQuickSelect}
        />

        {/* Active report summary */}
        {activeReport && normalizedData && (
          <ReportsSummaryCard
            report={{
              type: activeReport.type,
              generatedAt: activeReport.generatedAt,
              dateRange: normalizedData.dateRange ?? { from: dateFrom, to: dateTo },
              totalUsers: normalizedData.totalUsers ?? 0,
              activeUsers: normalizedData.activeUsers ?? 0,
              pendingUsers: normalizedData.pendingUsers ?? 0,
              inactiveUsers: normalizedData.inactiveUsers ?? 0,
              averageCompletion: normalizedData.averageCompletion ?? 0,
            }}
          />
        )}

        {/* Report history table */}
        <ReportsTable reports={reports} onView={handleViewReport} />
      </div>
    </DashboardLayout>
  );
}