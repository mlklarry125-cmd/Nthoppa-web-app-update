"use client";

// app/dashboard/reports/components/ReportsTable.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Report } from "@/lib/api";

interface ReportsTableProps {
  reports: Report[];
  onView: (report: Report) => void;
}

export function ReportsTable({ reports, onView }: ReportsTableProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-black flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#FF6B35]" />
          Recent Reports
        </CardTitle>
        <CardDescription>Previously generated reports</CardDescription>
      </CardHeader>

      <CardContent>
        {reports.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No reports generated yet</p>
            <p className="text-sm">Use the options above to generate your first report</p>
          </div>
        ) : (
          <div className="space-y-2">
            {reports.map((report, index) => {
              const data =
                typeof report.data === "string" ? JSON.parse(report.data) : report.data;

              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-black capitalize">{report.type} Report</p>
                    <p className="text-xs text-gray-500">
                      {data?.dateRange
                        ? `${formatDate(data.dateRange.from)} – ${formatDate(data.dateRange.to)}`
                        : formatDate(report.generatedAt)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Generated {formatDate(report.generatedAt)}
                    </p>
                  </div>

                  <Button size="sm" variant="ghost" onClick={() => onView(report)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
