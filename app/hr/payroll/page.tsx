"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  DollarSign,
  CreditCard,
  Calendar,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Wallet,
  Plus,
  ChevronRight,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface EmployeePayroll {
  id: number;
  name: string;
  role: string;
  grossSalary: number;
  insuranceDeductions: InsuranceDeduction[];
  bankDetails: { bank: string; accountNumber: string };
  mobileWallet: { provider: string; number: string };
}

interface InsuranceDeduction {
  productId: string;
  productName: string;
  premium: number;
}

interface PayrollRun {
  id: number;
  period: string;
  date: string;
  employeeCount: number;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  paymentMethod: string;
  status: "processed" | "pending" | "failed";
}

const insuranceProducts = [
  { id: "funeral", name: "Funeral Cover", premium: 85 },
  { id: "personal-all-risk", name: "Personal All-Risk", premium: 110 },
  { id: "group-life", name: "Group Life Cover", premium: 65 },
  { id: "hospital-cash", name: "Hospital Cash Plan", premium: 75 },
  { id: "credit-life", name: "Credit Life", premium: 45 },
  { id: "income-protection", name: "Income Protection", premium: 150 },
];

const mockEmployees: EmployeePayroll[] = [
  {
    id: 1,
    name: "Josephine Morolong",
    role: "HR Manager",
    grossSalary: 15000,
    insuranceDeductions: [{ productId: "funeral", productName: "Funeral Cover", premium: 85 }],
    bankDetails: { bank: "First National Bank", accountNumber: "0123456789" },
    mobileWallet: { provider: "Orange Money", number: "71234567" },
  },
  {
    id: 2,
    name: "Tshepo Kgosi",
    role: "Finance Officer",
    grossSalary: 12000,
    insuranceDeductions: [],
    bankDetails: { bank: "Stanbic Bank", accountNumber: "9876543210" },
    mobileWallet: { provider: "Mascom MyZaka", number: "71234568" },
  },
  {
    id: 3,
    name: "Mpho Sebina",
    role: "Recruitment Specialist",
    grossSalary: 10000,
    insuranceDeductions: [{ productId: "group-life", productName: "Group Life Cover", premium: 65 }],
    bankDetails: { bank: "Stanbic Bank", accountNumber: "5555555555" },
    mobileWallet: { provider: "Orange Money", number: "71234569" },
  },
  {
    id: 4,
    name: "Boitumelo Phiri",
    role: "Training Coordinator",
    grossSalary: 11000,
    insuranceDeductions: [
      { productId: "funeral", productName: "Funeral Cover", premium: 85 },
      { productId: "group-life", productName: "Group Life Cover", premium: 65 },
    ],
    bankDetails: { bank: "First National Bank", accountNumber: "4444444444" },
    mobileWallet: { provider: "BTC Smega", number: "71234570" },
  },
];

const mockPayrollHistory: PayrollRun[] = [
  { id: 1, period: "May 2026", date: "2026-05-25", employeeCount: 4, totalGross: 48000, totalDeductions: 300, totalNet: 47700, paymentMethod: "Bank Transfer", status: "processed" },
  { id: 2, period: "April 2026", date: "2026-04-25", employeeCount: 4, totalGross: 48000, totalDeductions: 300, totalNet: 47700, paymentMethod: "Bank Transfer", status: "processed" },
  { id: 3, period: "March 2026", date: "2026-03-25", employeeCount: 3, totalGross: 37000, totalDeductions: 150, totalNet: 36850, paymentMethod: "Orange Money", status: "processed" },
];

export default function PayrollPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [employees, setEmployees] = useState(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeePayroll | null>(null);
  const [showDeductionsDialog, setShowDeductionsDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [payrollPeriod, setPayrollPeriod] = useState({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showRunPayrollDialog, setShowRunPayrollDialog] = useState(false);
  const [viewingPayslip, setViewingPayslip] = useState<{ employee: EmployeePayroll; payrollRun: PayrollRun } | null>(null);
  const [showPayslipDialog, setShowPayslipDialog] = useState(false);

  const handleUpdateDeductions = () => {
    if (!selectedEmployee) return;
    
    const updatedDeductions = insuranceProducts
      .filter(p => selectedProducts.includes(p.id))
      .map(p => ({ productId: p.id, productName: p.name, premium: p.premium }));
    
    setEmployees(employees.map(e => 
      e.id === selectedEmployee.id ? { ...e, insuranceDeductions: updatedDeductions } : e
    ));
    
    setShowDeductionsDialog(false);
    toast({ title: "Deductions Updated", description: `Insurance deductions for ${selectedEmployee.name} have been updated.` });
  };

  const calculateNetPay = (employee: EmployeePayroll) => {
    const totalDeductions = employee.insuranceDeductions.reduce((sum, d) => sum + d.premium, 0);
    return employee.grossSalary - totalDeductions;
  };

  const getTotalGross = () => employees.reduce((sum, e) => sum + e.grossSalary, 0);
  const getTotalDeductions = () => employees.reduce((sum, e) => sum + e.insuranceDeductions.reduce((s, d) => s + d.premium, 0), 0);
  const getTotalNet = () => getTotalGross() - getTotalDeductions();

  const handleRunPayroll = () => {
    if (!selectedPaymentMethod) {
      toast({ title: "Error", description: "Please select a payment method", variant: "destructive" });
      return;
    }
    
    const newPayrollRun: PayrollRun = {
      id: mockPayrollHistory.length + 1,
      period: `${new Date(payrollPeriod.year, payrollPeriod.month - 1).toLocaleString('default', { month: 'long' })} ${payrollPeriod.year}`,
      date: new Date().toISOString(),
      employeeCount: employees.length,
      totalGross: getTotalGross(),
      totalDeductions: getTotalDeductions(),
      totalNet: getTotalNet(),
      paymentMethod: selectedPaymentMethod,
      status: "processed",
    };
    
    mockPayrollHistory.unshift(newPayrollRun);
    setShowRunPayrollDialog(false);
    toast({ title: "Payroll Processed!", description: `Payroll for ${newPayrollRun.period} has been processed successfully.` });
  };

  const handleViewPayslip = (employee: EmployeePayroll, payrollRun: PayrollRun) => {
    setViewingPayslip({ employee, payrollRun });
    setShowPayslipDialog(true);
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
        <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
        <p className="text-gray-500 mt-1">Process payroll, manage insurance deductions, and view history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <p className="text-white/80 text-sm">Total Employees</p>
            <p className="text-2xl font-bold">{employees.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <p className="text-white/80 text-sm">Total Gross Salary</p>
            <p className="text-2xl font-bold">P{getTotalGross().toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardContent className="p-4">
            <p className="text-white/80 text-sm">Total Deductions</p>
            <p className="text-2xl font-bold">P{getTotalDeductions().toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white border-0">
          <CardContent className="p-4">
            <p className="text-white/80 text-sm">Total Net Pay</p>
            <p className="text-2xl font-bold">P{getTotalNet().toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Actions */}
      <div className="flex justify-between items-center">
        <Button
          className="bg-[#FF6B35] hover:bg-[#e55a2b]"
          onClick={() => setShowRunPayrollDialog(true)}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Run Payroll
        </Button>
      </div>

      {/* Employee Payroll List */}
      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="employees">Employee Payroll</TabsTrigger>
          <TabsTrigger value="history">Payroll History</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Gross Salary</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Insurance Deductions</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Net Pay</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment Details</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => {
                      const netPay = calculateNetPay(employee);
                      const hasDeductions = employee.insuranceDeductions.length > 0;
                      return (
                        <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{employee.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{employee.role}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-900">P{employee.grossSalary.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            {hasDeductions ? (
                              <div className="space-y-1">
                                {employee.insuranceDeductions.map(d => (
                                  <Badge key={d.productId} variant="secondary" className="text-xs">
                                    {d.productName}: P{d.premium}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">None</span>
                            )}
                            <Button
                              variant="link"
                              size="sm"
                              className="text-[#FF6B35] p-0 h-auto mt-1"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setSelectedProducts(employee.insuranceDeductions.map(d => d.productId));
                                setShowDeductionsDialog(true);
                              }}
                            >
                              Manage Deductions                            </Button>
                           </td>
                          <td className="py-3 px-4 text-right font-bold text-[#FF6B35]">P{netPay.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {employee.bankDetails ? `${employee.bankDetails.bank}` : employee.mobileWallet.provider}
                           </td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const currentRun = mockPayrollHistory[0];
                                if (currentRun) handleViewPayslip(employee, currentRun);
                              }}
                              className="text-[#FF6B35]"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                           </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Pay Period</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date Processed</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Employees</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Total Gross</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Total Deductions</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Total Net</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment Method</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPayrollHistory.map((run) => (
                      <tr key={run.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{run.period}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{new Date(run.date).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-center">{run.employeeCount}</td>
                        <td className="py-3 px-4 text-right">P{run.totalGross.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">P{run.totalDeductions.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-bold text-[#FF6B35]">P{run.totalNet.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{run.paymentMethod}</td>
                        <td className="py-3 px-4">
                          <Badge className={run.status === "processed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                            {run.status}
                          </Badge>
                         </td>
                       </tr>
                    ))}
                  </tbody>
                 </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Deductions Dialog */}
      <Dialog open={showDeductionsDialog} onOpenChange={setShowDeductionsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Insurance Deductions</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Select insurance products for <strong>{selectedEmployee.name}</strong>. Premiums will be deducted from gross salary.
              </p>
              <div className="space-y-2">
                {insuranceProducts.map((product) => (
                  <label key={product.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">P{product.premium}/month</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts([...selectedProducts, product.id]);
                        } else {
                          setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                        }
                      }}
                      className="w-5 h-5 text-[#FF6B35] rounded border-gray-300"
                    />
                  </label>
                ))}
              </div>
              <Button className="w-full bg-[#FF6B35]" onClick={handleUpdateDeductions}>
                Save Deductions
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Run Payroll Dialog */}
      <Dialog open={showRunPayrollDialog} onOpenChange={setShowRunPayrollDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run Payroll</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Pay Period</Label>
              <div className="flex gap-2 mt-1">
                <select
                  className="flex-1 border border-gray-200 rounded-lg p-2"
                  value={payrollPeriod.month}
                  onChange={(e) => setPayrollPeriod({ ...payrollPeriod, month: parseInt(e.target.value) })}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                    <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}</option>
                  ))}
                </select>
                <input
                  type="number"
                  className="w-24 border border-gray-200 rounded-lg p-2"
                  value={payrollPeriod.year}
                  onChange={(e) => setPayrollPeriod({ ...payrollPeriod, year: parseInt(e.target.value) })}
                />
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-gray-900">Payroll Summary</h4>
              <div className="flex justify-between text-sm">
                <span>Total Employees:</span>
                <span className="font-semibold">{employees.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Gross Salary:</span>
                <span>P{getTotalGross().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Deductions:</span>
                <span className="text-red-600">-P{getTotalDeductions().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total Net Pay:</span>
                <span className="text-[#FF6B35]">P{getTotalNet().toLocaleString()}</span>
              </div>
            </div>

            <div>
              <Label>Payment Method</Label>
              <select
                className="w-full border border-gray-200 rounded-lg p-2 mt-1"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              >
                <option value="">Select payment method</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Orange Money">Orange Money</option>
                <option value="Mascom MyZaka">Mascom MyZaka</option>
                <option value="BTC Smega">BTC Smega</option>
              </select>
            </div>

            <Button className="w-full bg-[#FF6B35]" onClick={handleRunPayroll}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Process Payroll
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payslip Dialog */}
      <Dialog open={showPayslipDialog} onOpenChange={setShowPayslipDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payslip</DialogTitle>
          </DialogHeader>
          {viewingPayslip && (
            <div className="space-y-4">
              <div className="text-center border-b pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-8 w-auto" />
                  <span className="font-bold text-[#FF6B35] text-xl">Nthoppa</span>
                </div>
                <p className="font-semibold text-gray-900">{viewingPayslip.employee.name}</p>
                <p className="text-sm text-gray-500">{viewingPayslip.employee.role}</p>
                <p className="text-sm text-gray-500">Pay Period: {viewingPayslip.payrollRun.period}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Salary:</span>
                  <span className="font-semibold">P{viewingPayslip.employee.grossSalary.toLocaleString()}</span>
                </div>
                {viewingPayslip.employee.insuranceDeductions.map(d => (
                  <div key={d.productId} className="flex justify-between text-sm pl-4">
                    <span className="text-gray-500">{d.productName}:</span>
                    <span className="text-red-600">-P{d.premium}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Net Pay:</span>
                    <span className="text-[#FF6B35]">P{calculateNetPay(viewingPayslip.employee).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-500">
                <p>Payment Method: {viewingPayslip.payrollRun.paymentMethod}</p>
                <p>Payment Date: {new Date(viewingPayslip.payrollRun.date).toLocaleDateString()}</p>
              </div>
              
              <Button className="w-full" variant="outline" onClick={() => setShowPayslipDialog(false)}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}