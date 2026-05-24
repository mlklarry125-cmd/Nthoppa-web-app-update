"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building2, CreditCard, Bell, Shield, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MerchantSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("Kgabo General Store");
  const [businessType, setBusinessType] = useState("Retail");
  const [phone, setPhone] = useState("+267 71 234 567");
  const [email, setEmail] = useState("info@kgabostore.com");
  const [notifications, setNotifications] = useState({
    emailReceipts: true,
    dailySummary: true,
    lowBalance: false,
  });

  const handleSave = () => {
    toast({ title: "Settings Saved", description: "Your merchant settings have been updated." });
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
        <h1 className="text-2xl font-bold text-black">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your merchant account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Info */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-[#FF6B35]" />
                <h3 className="font-semibold text-black">Business Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Business Name</Label>
                  <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label>Business Type</Label>
                  <Input value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-[#FF6B35]" />
                <h3 className="font-semibold text-black">Payment Settings</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label>Settlement Account</Label>
                  <Input placeholder="Bank Account Number" defaultValue="**** **** **** 4521" className="mt-1" />
                  <p className="text-xs text-gray-400 mt-1">Stanbic Bank · Current Account</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">Auto-settle daily</p>
                    <p className="text-xs text-gray-500">Automatically settle funds to your bank account</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-[#FF6B35]" />
                <h3 className="font-semibold text-black">Notification Preferences</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">Email Receipts</p>
                    <p className="text-xs text-gray-500">Send receipts to customers via email</p>
                  </div>
                  <Switch 
                    checked={notifications.emailReceipts}
                    onCheckedChange={(v) => setNotifications({ ...notifications, emailReceipts: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">Daily Summary</p>
                    <p className="text-xs text-gray-500">Receive daily sales summary via email</p>
                  </div>
                  <Switch 
                    checked={notifications.dailySummary}
                    onCheckedChange={(v) => setNotifications({ ...notifications, dailySummary: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">Low Balance Alert</p>
                    <p className="text-xs text-gray-500">Get notified when wallet balance is low</p>
                  </div>
                  <Switch 
                    checked={notifications.lowBalance}
                    onCheckedChange={(v) => setNotifications({ ...notifications, lowBalance: v })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="bg-[#FF6B35] text-white hover:bg-black">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* Security Sidebar */}
        <div>
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-[#FF6B35]" />
                <h3 className="font-semibold text-black">Security</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-black">API Keys</p>
                  <p className="text-xs text-gray-500 mb-2">Manage your API integration keys</p>
                  <Button variant="outline" size="sm" className="w-full">Generate New Key</Button>
                </div>
                <div>
                  <p className="text-sm font-medium text-black">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-500 mb-2">Add an extra layer of security</p>
                  <Button variant="outline" size="sm" className="w-full">Enable 2FA</Button>
                </div>
                <div>
                  <p className="text-sm font-medium text-black">Session Management</p>
                  <p className="text-xs text-gray-500 mb-2">View and manage active sessions</p>
                  <Button variant="outline" size="sm" className="w-full">View Sessions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}