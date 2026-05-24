"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Bell, DollarSign, Shield, Building2, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function HRSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Company Profile State
  const [companyProfile, setCompanyProfile] = useState({
    companyName: "Nthoppa Financial",
    hrEmail: "hr@nthoppa.com",
    hrPhone: "+267 71 234 567",
    registrationNumber: "NTH-2024-001",
  });

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    salaryAdvances: true,
    leaveRequests: true,
    wellnessAlerts: true,
    payrollReminders: true,
  });

  // Payroll Settings State
  const [payrollSettings, setPayrollSettings] = useState({
    defaultPayDay: 25,
    defaultPaymentMethod: "Bank Transfer",
    currency: "BWP",
  });

  // Security State
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleCompanySave = () => {
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Success", description: "Company profile updated successfully" });
      setLoading(false);
    }, 500);
  };

  const handleNotificationSave = () => {
    toast({ title: "Success", description: "Notification preferences updated" });
  };

  const handlePayrollSave = () => {
    toast({ title: "Success", description: "Payroll settings updated" });
  };

  const handlePasswordChange = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({ title: "Error", description: "New passwords do not match", variant: "destructive" });
      return;
    }
    if (security.newPassword.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: "Password changed successfully" });
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
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
        <h1 className="text-2xl font-bold text-gray-900">HR Settings</h1>
        <p className="text-gray-500 mt-1">Manage company settings and preferences</p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Company Profile Tab */}
        <TabsContent value="company" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#FF6B35]" />
                Company Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  value={companyProfile.companyName}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, companyName: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    HR Email
                  </Label>
                  <Input
                    type="email"
                    value={companyProfile.hrEmail}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, hrEmail: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    HR Phone
                  </Label>
                  <Input
                    value={companyProfile.hrPhone}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, hrPhone: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label>Company Registration Number</Label>
                <Input
                  value={companyProfile.registrationNumber}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, registrationNumber: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleCompanySave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#FF6B35]" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Salary Advance Requests</p>
                  <p className="text-sm text-gray-500">Get notified when employees request salary advances</p>
                </div>
                <Switch
                  checked={notifications.salaryAdvances}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, salaryAdvances: checked })}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Leave Requests</p>
                  <p className="text-sm text-gray-500">Get notified when employees submit leave requests</p>
                </div>
                <Switch
                  checked={notifications.leaveRequests}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, leaveRequests: checked })}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Financial Wellness Alerts</p>
                  <p className="text-sm text-gray-500">Get alerts for at-risk employees</p>
                </div>
                <Switch
                  checked={notifications.wellnessAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, wellnessAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Payroll Reminders</p>
                  <p className="text-sm text-gray-500">Get reminders for upcoming payroll runs</p>
                </div>
                <Switch
                  checked={notifications.payrollReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, payrollReminders: checked })}
                />
              </div>
              <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleNotificationSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payroll Settings Tab */}
        <TabsContent value="payroll" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#FF6B35]" />
                Payroll Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Pay Day (of month)</Label>
                <Input
                  type="number"
                  min={1}
                  max={31}
                  value={payrollSettings.defaultPayDay}
                  onChange={(e) => setPayrollSettings({ ...payrollSettings, defaultPayDay: parseInt(e.target.value) })}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Payroll will be processed on this day each month</p>
              </div>
              <div>
                <Label>Default Payment Method</Label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2 mt-1"
                  value={payrollSettings.defaultPaymentMethod}
                  onChange={(e) => setPayrollSettings({ ...payrollSettings, defaultPaymentMethod: e.target.value })}
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Orange Money">Orange Money</option>
                  <option value="Mascom MyZaka">Mascom MyZaka</option>
                  <option value="BTC Smega">BTC Smega</option>
                  <option value="Nthoppa Wallet">Nthoppa Wallet</option>
                </select>
              </div>
              <div>
                <Label>Currency</Label>
                <Input value="BWP (Botswana Pula)" disabled className="mt-1 bg-gray-50" />
                <p className="text-xs text-gray-500 mt-1">All payroll amounts are in Botswana Pula</p>
              </div>
              <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handlePayrollSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Payroll Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#FF6B35]" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  value={security.currentPassword}
                  onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={security.newPassword}
                  onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handlePasswordChange}>
                <Shield className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}