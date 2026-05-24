"use client";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, Users, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HRReportsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const reports = [
    { name: "Employee Financial Wellness Report", type: "PDF", icon: <FileText className="h-5 w-5" /> },
    { name: "Salary Advance Summary", type: "Excel", icon: <TrendingUp className="h-5 w-5" /> },
    { name: "Department Literacy Scores", type: "PDF", icon: <Users className="h-5 w-5" /> },
    { name: "Savings Goal Progress Report", type: "CSV", icon: <DollarSign className="h-5 w-5" /> },
  ];

  const handleDownload = (report: { name: string; type: string }) => {
    if (report.type === 'PDF') {
      window.print();
      toast({ title: "Print Preview", description: `${report.name} is ready for printing.` });
    } else {
      toast({ title: "Export Started", description: `${report.name} downloading as ${report.type}...` });
    }
  };

  return (
    <div className="space-y-6">
      <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#FF6B35] hover:text-[#e55a2b] font-medium mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
        <h1 className="text-2xl font-bold text-black">Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Generate and download HR reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, i) => (
          <Card key={i} className="border-gray-200 hover:shadow-md transition-all">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                  {report.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-black">{report.name}</h3>
                  <p className="text-xs text-gray-500">{report.type} · Last updated: Apr 2026</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
                onClick={() => handleDownload(report)}
              >
                <Download className="h-4 w-4 mr-2" />
                {report.type === 'PDF' ? 'Print / PDF' : 'Download'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Schedule Reports */}
      <Card className="border-gray-200">
        <CardContent className="p-5">
          <h3 className="font-semibold text-black mb-3">Schedule Automated Reports</h3>
          <p className="text-sm text-gray-500 mb-4">Get regular reports delivered to your inbox</p>
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" onClick={() => toast({ title: "Weekly Report", description: "Weekly report scheduled for Mondays" })}>
              Weekly Summary
            </Button>
            <Button variant="outline" onClick={() => toast({ title: "Monthly Report", description: "Monthly report scheduled for 1st of month" })}>
              Monthly Report
            </Button>
            <Button className="bg-[#FF6B35] text-white hover:bg-black" onClick={() => toast({ title: "Configure", description: "Report settings" })}>
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}