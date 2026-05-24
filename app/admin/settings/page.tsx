"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Settings as SettingsIcon, Shield, Bell, Globe, Save, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [platform, setPlatform] = useState({
    appName: "Nthoppa",
    supportEmail: "support@nthoppa.com",
    maintenanceMode: false,
  });
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });
  const [notifications, setNotifications] = useState({
    adminAlerts: true,
    userReports: true,
    systemUpdates: true,
  });

  const handlePlatformSave = () => {
    toast({ title: "Success", description: "Platform settings updated" });
  };

  const handleSecuritySave = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({ title: "Error", description: "New passwords do not match", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: "Security settings updated" });
    setSecurity({ ...security, currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleNotificationSave = () => {
    toast({ title: "Success", description: "Notification settings updated" });
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
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-500 mt-1">Manage platform configuration and preferences</p>
      </div>

      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-[#FF6B35]" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>App Name</Label>
                <Input
                  value={platform.appName}
                  onChange={(e) => setPlatform({ ...platform, appName: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Support Email</Label>
                <Input
                  type="email"
                  value={platform.supportEmail}
                  onChange={(e) => setPlatform({ ...platform, supportEmail: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Maintenance Mode</p>
                  <p className="text-sm text-gray-500">Put the platform in maintenance mode</p>
                </div>
                <Switch
                  checked={platform.maintenanceMode}
                  onCheckedChange={(checked) => setPlatform({ ...platform, maintenanceMode: checked })}
                />
              </div>
              <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handlePlatformSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Platform Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#FF6B35]" />
                Security Settings
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
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={security.twoFactorEnabled}
                  onCheckedChange={(checked) => setSecurity({ ...security, twoFactorEnabled: checked })}
                />
              </div>
              <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleSecuritySave}>
                <Lock className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#FF6B35]" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Admin Alerts</p>
                  <p className="text-sm text-gray-500">Get notified about important admin events</p>
                </div>
                <Switch
                  checked={notifications.adminAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, adminAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">User Reports</p>
                  <p className="text-sm text-gray-500">Get notified about user reports</p>
                </div>
                <Switch
                  checked={notifications.userReports}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, userReports: checked })}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">System Updates</p>
                  <p className="text-sm text-gray-500">Get notified about system updates</p>
                </div>
                <Switch
                  checked={notifications.systemUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                />
              </div>
              <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleNotificationSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}