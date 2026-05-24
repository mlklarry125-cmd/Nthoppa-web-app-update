"use client";

// app/dashboard/reports/components/ReportsFilters.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, RefreshCw, FileBarChart } from "lucide-react";

export type ReportType = "registration" | "performance" | "territory" | "commission" | "activity";

interface QuickReportOption {
  id: string;
  label: string;
}

const QUICK_OPTIONS: QuickReportOption[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "year", label: "This Year" },
];

interface ReportsFiltersProps {
  reportType: ReportType;
  dateFrom: string;
  dateTo: string;
  isGenerating: boolean;
  onReportTypeChange: (value: ReportType) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onGenerate: () => void;
  onQuickSelect: (id: string) => void;
}

export function ReportsFilters({
  reportType,
  dateFrom,
  dateTo,
  isGenerating,
  onReportTypeChange,
  onDateFromChange,
  onDateToChange,
  onGenerate,
  onQuickSelect,
}: ReportsFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#FF6B35]" />
            Report Options
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Quick date presets */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Quick Select
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {QUICK_OPTIONS.map((opt) => (
                <Button
                  key={opt.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onQuickSelect(opt.id)}
                  className="border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35]"
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Report type */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Report Type
            </Label>
            <Select value={reportType} onValueChange={(v) => onReportTypeChange(v as ReportType)}>
              <SelectTrigger className="border-gray-200">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="registration">Registration Report</SelectItem>
                <SelectItem value="performance">Performance Report</SelectItem>
                <SelectItem value="territory">Territory Report</SelectItem>
                <SelectItem value="commission">Commission Report</SelectItem>
                <SelectItem value="activity">Activity Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">From</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">To</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
                className="border-gray-200"
              />
            </div>
          </div>

          {/* Generate button */}
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full bg-[#FF6B35] hover:bg-[#d4471a] text-white"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <FileBarChart className="h-4 w-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
