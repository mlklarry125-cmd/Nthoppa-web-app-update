"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  DollarSign,
  Calendar as CalendarIcon,
  CreditCard,
  Smartphone,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SalaryAdvance {
  id: number;
  employeeId: number;
  employeeName: string;
  role: string;
  requestedAmount: number;
  approvedAmount?: number;
  disbursementMethod?: string;
  payDate?: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestDate: string;
}

const mockAdvances: SalaryAdvance[] = [
  { id: 1, employeeId: 1, employeeName: "Josephine Morolong", role: "HR Manager", requestedAmount: 5000, reason: "Emergency medical expenses", status: "pending", requestDate: "2026-05-20" },
  { id: 2, employeeId: 2, employeeName: "Tshepo Kgosi", role: "Finance Officer", requestedAmount: 3000, reason: "School fees", status: "pending", requestDate: "2026-05-19" },
  { id: 3, employeeId: 3, employeeName: "Mpho Sebina", role: "Recruitment Specialist", requestedAmount: 2000, approvedAmount: 2000, disbursementMethod: "Bank Transfer", payDate: "2026-05-15", reason: "Car repair", status: "approved", requestDate: "2026-05-10" },
  { id: 4, employeeId: 4, employeeName: "Boitumelo Phiri", role: "Training Coordinator", requestedAmount: 1500, reason: "Home appliance repair", status: "rejected", requestDate: "2026-05-08" },
];

const disbursementMethods = [
  { id: "orange", name: "Orange Money", icon: "📱" },
  { id: "myzaka", name: "Mascom MyZaka", icon: "💳" },
  { id: "smega", name: "BTC Smega", icon: "📲" },
  { id: "bank", name: "Bank Transfer", icon: "🏦" },
  { id: "wallet", name: "Nthoppa Wallet", icon: "👛" },
];

export default function SalaryAdvancesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [advances, setAdvances] = useState(mockAdvances);
  const [selectedAdvance, setSelectedAdvance] = useState<SalaryAdvance | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [approveAmount, setApproveAmount] = useState(0);
  const [disbursementMethod, setDisbursementMethod] = useState("");
  const [payDate, setPayDate] = useState(new Date().toISOString().split("T")[0]);

  const handleApproveClick = (advance: SalaryAdvance) => {
    setSelectedAdvance(advance);
    setApproveAmount(advance.requestedAmount);
    setDisbursementMethod("");
    setPayDate(new Date().toISOString().split("T")[0]);
    setShowApproveDialog(true);
  };

  const handleConfirmApproval = () => {
    if (!selectedAdvance) return;
    if (!disbursementMethod) {
      toast({ title: "Error", description: "Please select a disbursement method", variant: "destructive" });
      return;
    }
    
    setAdvances(prev => prev.map(a => 
      a.id === selectedAdvance.id 
        ? { ...a, status: "approved", approvedAmount: approveAmount, disbursementMethod, payDate }
        : a
    ));
    
    setShowApproveDialog(false);
    toast({ 
      title: "Advance Approved", 
      description: `P${approveAmount} approved for ${selectedAdvance.employeeName}. Disbursement via ${disbursementMethod} on ${payDate}.` 
    });
  };

  const handleReject = (advanceId: number) => {
    setAdvances(prev => prev.map(a => a.id === advanceId ? { ...a, status: "rejected" } : a));
    toast({ title: "Advance Rejected", description: "The salary advance request has been rejected." });
  };

  const handleViewDetails = (advance: SalaryAdvance) => {
    toast({ title: "Request Details", description: `Request #${advance.id}: ${advance.reason}` });
  };

  const pendingAdvances = advances.filter(a => a.status === "pending");
  const approvedAdvances = advances.filter(a => a.status === "approved");
  const totalApproved = approvedAdvances.reduce((sum, a) => sum + (a.approvedAmount || 0), 0);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending": return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "approved": return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected": return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default: return null;
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
        <h1 className="text-2xl font-bold text-gray-900">Salary Advances</h1>
        <p className="text-gray-500 mt-1">Review and approve employee salary advance requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardContent className="p-4">
            <p className="text-white/80 text-sm">Pending Requests</p>
            <p className="text-2xl font-bold">{pendingAdvances.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <p className="text-white/80 text-sm">Total Approved (MTD)</p>
            <p className="text-2xl font-bold">P{totalApproved.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white border-0">
          <CardContent className="p-4">
            <p className="text-white/80 text-sm">Average Approval</p>
            <p className="text-2xl font-bold">
              P{approvedAdvances.length ? Math.round(totalApproved / approvedAdvances.length).toLocaleString() : 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingAdvances.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No pending requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingAdvances.map((advance) => (
                <div key={advance.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-semibold text-gray-900">{advance.employeeName}</p>
                    <p className="text-sm text-gray-600">{advance.role}</p>
                    <p className="text-sm text-gray-600">Requested: P{advance.requestedAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Reason: {advance.reason}</p>
                    <p className="text-xs text-gray-500">Requested: {new Date(advance.requestDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveClick(advance)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(advance.id)}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Requests Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Employee</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Requested</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Approved</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Reason</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {advances.map((advance) => (
                  <tr key={advance.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{advance.employeeName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{advance.role}</td>
                    <td className="py-3 px-4 text-right font-semibold text-[#FF6B35]">P{advance.requestedAmount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{advance.approvedAmount ? `P${advance.approvedAmount.toLocaleString()}` : "-"}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{advance.reason}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{new Date(advance.requestDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{getStatusBadge(advance.status)}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(advance)}>
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

      {/* Approve Confirmation Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Salary Advance</DialogTitle>
          </DialogHeader>
          {selectedAdvance && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Employee: <span className="font-semibold text-gray-900">{selectedAdvance.employeeName}</span></p>
                <p className="text-sm text-gray-600">Requested Amount: <span className="font-semibold">P{selectedAdvance.requestedAmount.toLocaleString()}</span></p>
              </div>
              
              <div>
                <Label>Approve Amount (P)</Label>
                <Input
                  type="number"
                  value={approveAmount}
                  onChange={(e) => setApproveAmount(parseFloat(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Disbursement Method</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {disbursementMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setDisbursementMethod(method.name)}
                      className={`p-3 rounded-lg border transition-all ${
                        disbursementMethod === method.name
                          ? "border-[#FF6B35] bg-orange-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{method.icon}</span>
                        <span className="text-sm">{method.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Pay Date</Label>
                <Input
                  type="date"
                  value={payDate}
                  onChange={(e) => setPayDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowApproveDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1 bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleConfirmApproval}>
                  Confirm Approval
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}