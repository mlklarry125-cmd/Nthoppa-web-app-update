"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Users,
  Plus,
  CheckCircle,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface LeaveBalance {
  annual: { entitled: number; taken: number; remaining: number };
  sick: { entitled: number; taken: number; remaining: number };
  maternity: { entitled: number; taken: number; remaining: number };
  unpaid: { taken: number };
}

interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveType: "annual" | "sick" | "maternity" | "unpaid";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface EmployeeLeave {
  id: number;
  name: string;
  role: string;
  balances: LeaveBalance;
}

const mockEmployees: EmployeeLeave[] = [
  { id: 1, name: "Josephine Morolong", role: "HR Manager", balances: { annual: { entitled: 20, taken: 5, remaining: 15 }, sick: { entitled: 12, taken: 2, remaining: 10 }, maternity: { entitled: 90, taken: 0, remaining: 90 }, unpaid: { taken: 0 } } },
  { id: 2, name: "Tshepo Kgosi", role: "Finance Officer", balances: { annual: { entitled: 20, taken: 8, remaining: 12 }, sick: { entitled: 12, taken: 3, remaining: 9 }, maternity: { entitled: 90, taken: 0, remaining: 90 }, unpaid: { taken: 2 } } },
  { id: 3, name: "Mpho Sebina", role: "Recruitment Specialist", balances: { annual: { entitled: 20, taken: 12, remaining: 8 }, sick: { entitled: 12, taken: 1, remaining: 11 }, maternity: { entitled: 90, taken: 0, remaining: 90 }, unpaid: { taken: 0 } } },
];

const mockLeaveRequests: LeaveRequest[] = [
  { id: 1, employeeId: 2, employeeName: "Tshepo Kgosi", leaveType: "annual", startDate: "2026-06-01", endDate: "2026-06-05", days: 5, reason: "Family vacation", status: "pending", createdAt: "2026-05-20" },
  { id: 2, employeeId: 3, employeeName: "Mpho Sebina", leaveType: "sick", startDate: "2026-05-25", endDate: "2026-05-26", days: 2, reason: "Flu", status: "pending", createdAt: "2026-05-24" },
];

const getLeaveTypeColor = (type: string) => {
  switch (type) {
    case "annual": return "bg-green-100 text-green-700";
    case "sick": return "bg-blue-100 text-blue-700";
    case "maternity": return "bg-purple-100 text-purple-700";
    case "unpaid": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getLeaveTypeName = (type: string) => {
  switch (type) {
    case "annual": return "Annual Leave";
    case "sick": return "Sick Leave";
    case "maternity": return "Maternity/Paternity Leave";
    case "unpaid": return "Unpaid Leave";
    default: return type;
  }
};

export default function LeaveManagementPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [employees] = useState(mockEmployees);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [newRequest, setNewRequest] = useState({
    employeeId: 0,
    leaveType: "annual" as "annual" | "sick" | "maternity" | "unpaid",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleApproveRequest = (requestId: number) => {
    setLeaveRequests(requests => requests.map(r => 
      r.id === requestId ? { ...r, status: "approved" } : r
    ));
    toast({ title: "Request Approved", description: "Leave request has been approved." });
  };

  const handleRejectRequest = (requestId: number) => {
    setLeaveRequests(requests => requests.map(r => 
      r.id === requestId ? { ...r, status: "rejected" } : r
    ));
    toast({ title: "Request Rejected", description: "Leave request has been rejected." });
  };

  const handleSubmitRequest = () => {
    if (!newRequest.employeeId || !newRequest.startDate || !newRequest.endDate) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    
    const employee = employees.find(e => e.id === newRequest.employeeId);
    if (!employee) return;
    
    const start = new Date(newRequest.startDate);
    const end = new Date(newRequest.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const request: LeaveRequest = {
      id: leaveRequests.length + 1,
      employeeId: newRequest.employeeId,
      employeeName: employee.name,
      leaveType: newRequest.leaveType,
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      days,
      reason: newRequest.reason,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    
    setLeaveRequests([request, ...leaveRequests]);
    setShowRequestDialog(false);
    setNewRequest({ employeeId: 0, leaveType: "annual", startDate: "", endDate: "", reason: "" });
    toast({ title: "Request Submitted", description: "Leave request has been submitted for approval." });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getLeaveOnDate = (date: Date) => {
    const approvedRequests = leaveRequests.filter(r => r.status === "approved");
    const dateStr = date.toISOString().split("T")[0];
    const leaveOnDay = approvedRequests.filter(r => r.startDate <= dateStr && r.endDate >= dateStr);
    return leaveOnDay.map(r => ({ employeeName: r.employeeName, type: r.leaveType }));
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 rounded-lg"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const leaveEntries = getLeaveOnDate(date);
      days.push(
        <div key={day} className="h-24 border border-gray-100 rounded-lg p-1 overflow-y-auto">
          <span className="text-sm font-medium text-gray-600">{day}</span>
          {leaveEntries.map((leave, idx) => (
            <div key={idx} className="mt-1">
              <Badge className={`${getLeaveTypeColor(leave.type)} text-xs w-full justify-start`}>
                {leave.employeeName}
              </Badge>
            </div>
          ))}
        </div>
      );
    }
    
    return days;
  };

  const pendingRequests = leaveRequests.filter(r => r.status === "pending");

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
        <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
        <p className="text-gray-500 mt-1">Track employee leave balances, requests, and calendars</p>
      </div>

      {/* Leave Balances Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#FF6B35]" />
              Leave Balances
            </span>
            <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Leave Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Leave Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Employee</Label>
                    <select
                      className="w-full border border-gray-200 rounded-lg p-2 mt-1"
                      value={newRequest.employeeId}
                      onChange={(e) => setNewRequest({ ...newRequest, employeeId: parseInt(e.target.value) })}
                    >
                      <option value={0}>Select employee</option>
                      {employees.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Leave Type</Label>
                    <select
                      className="w-full border border-gray-200 rounded-lg p-2 mt-1"
                      value={newRequest.leaveType}
                      onChange={(e) => setNewRequest({ ...newRequest, leaveType: e.target.value as any })}
                    >
                      <option value="annual">Annual Leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="maternity">Maternity/Paternity Leave</option>
                      <option value="unpaid">Unpaid Leave</option>
                    </select>
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={newRequest.startDate}
                      onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={newRequest.endDate}
                      onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Reason (Optional)</Label>
                    <Textarea
                      placeholder="Enter reason for leave"
                      value={newRequest.reason}
                      onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                    />
                  </div>
                  <Button className="w-full bg-[#FF6B35]" onClick={handleSubmitRequest}>
                    Submit Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Employee</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Annual Leave</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Sick Leave</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Maternity/Paternity</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Unpaid Leave</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{employee.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{employee.role}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className="bg-green-50">
                        {employee.balances.annual.remaining}/{employee.balances.annual.entitled} days
                      </Badge>
                     </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className="bg-blue-50">
                        {employee.balances.sick.remaining}/{employee.balances.sick.entitled} days
                      </Badge>
                     </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className="bg-purple-50">
                        {employee.balances.maternity.remaining}/{employee.balances.maternity.entitled} days
                      </Badge>
                     </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className="bg-gray-50">
                        {employee.balances.unpaid.taken} days taken
                      </Badge>
                     </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-semibold text-gray-900">{request.employeeName}</p>
                    <p className="text-sm text-gray-600">{getLeaveTypeName(request.leaveType)} • {request.days} days</p>
                    <p className="text-xs text-gray-500">{request.startDate} to {request.endDate}</p>
                    <p className="text-xs text-gray-500 mt-1">Reason: {request.reason || "Not specified"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveRequest(request.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleRejectRequest(request.id)}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar View */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-[#FF6B35]" />
              Leave Calendar
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>
        </CardContent>
      </Card>

      {/* Leave History */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaveRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{request.employeeName}</p>
                  <p className="text-sm text-gray-600">{getLeaveTypeName(request.leaveType)} • {request.days} days</p>
                  <p className="text-xs text-gray-500">{request.startDate} to {request.endDate}</p>
                </div>
                <Badge className={request.status === "approved" ? "bg-green-100 text-green-700" : request.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}>
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}