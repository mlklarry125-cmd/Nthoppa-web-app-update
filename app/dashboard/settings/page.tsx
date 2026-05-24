"use client";
import { useRouter } from "next/navigation";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  Globe,
  Lock,
  Key,
  Smartphone,
  Mail,
  MapPin,
  Building2,
  CreditCard,
  Save,
  Camera,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Moon,
  Sun,
  Laptop,
  Globe2,
  Languages,
  Clock,
  DollarSign,
  Percent,
  Phone,
  AtSign,
  Map,
  Home,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getAgentSession, getAgents, updateAgent, type Agent } from "@/lib/storage";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  agentId: string;
  territory: string;
  address: string;
  commissionRate: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  dailyDigest: boolean;
  marketingEmails: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    agentId: "",
    territory: "",
    address: "",
    commissionRate: 5,
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    dailyDigest: false,
    marketingEmails: false,
  });
  const [language, setLanguage] = useState("english");
  const [theme, setTheme] = useState("light");
  const [timezone, setTimezone] = useState("Africa/Gaborone");
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const session = getAgentSession();
    if (session) {
      const agents = getAgents();
      const agent = agents.find(a => a.id === session.agentId);
      
      setProfileData({
        name: agent?.name || session.name,
        email: agent?.email || session.email,
        phone: agent?.phone || "+267 71234567",
        agentId: session.agentId,
        territory: session.territory,
        address: agent?.address || "123 Agent Street, Gaborone, Botswana",
        commissionRate: agent?.commissionRate || 5,
      });
    }
    // Load saved notification settings
    const savedNotifications = localStorage.getItem("notification_settings");
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }
    // Load saved preferences
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) setLanguage(savedLanguage);
    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  };

  const handleProfileSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const session = getAgentSession();
    if (session) {
      const agents = getAgents();
      const agentIndex = agents.findIndex(a => a.id === session.agentId);
      
      if (agentIndex !== -1) {
        const updatedAgent: Agent = {
          ...agents[agentIndex],
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
          commissionRate: profileData.commissionRate,
        };
        updateAgent(updatedAgent);
        
        // Update session
        session.name = profileData.name;
        session.email = profileData.email;
        localStorage.setItem("agent_session", JSON.stringify(session));
      }
    }
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsSaving(false);
  };

  const handleNotificationSave = () => {
    localStorage.setItem("notification_settings", JSON.stringify(notificationSettings));
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handlePreferencesSave = () => {
    localStorage.setItem("language", language);
    localStorage.setItem("theme", theme);
    
    // Apply theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    toast({
      title: "Preferences Updated",
      description: "Your language and theme preferences have been saved.",
    });
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    
    setShowPasswordDialog(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEnable2FA = () => {
    toast({
      title: "2FA Setup",
      description: "Two-factor authentication setup would be configured here. (Demo)",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        {/* Header */}
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
          <h1 className="text-3xl font-bold text-black mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-gray-100 w-full justify-start overflow-x-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-black flex items-center gap-2">
                      <User className="h-5 w-5 text-[#FF6B35]" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="agentId">Agent ID</Label>
                        <Input id="agentId" value={profileData.agentId} disabled className="bg-gray-50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="territory">Territory</Label>
                        <Input id="territory" value={profileData.territory} disabled className="bg-gray-50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                        <Input
                          id="commissionRate"
                          type="number"
                          value={profileData.commissionRate}
                          onChange={(e) => setProfileData({ ...profileData, commissionRate: parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleProfileSave}
                      disabled={isSaving}
                      className="bg-[#FF6B35] text-white hover:bg-black"
                    >
                      {isSaving ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-black">Profile Photo</CardTitle>
                    <CardDescription>Your avatar image</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="relative inline-block">
                      <Avatar className="h-24 w-24 bg-gradient-to-r from-[#FF6B35] to-black mx-auto">
                        <AvatarFallback className="bg-transparent text-white text-2xl">
                          {getInitials(profileData.name)}
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full border border-gray-200 hover:bg-gray-50">
                        <Camera className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      Click the camera icon to upload a new photo
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Agent since 2024
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 mt-4">
                  <CardHeader>
                    <CardTitle className="text-black">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-green-700">Active</p>
                        <p className="text-xs text-green-600">Your account is verified</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Lock className="h-5 w-5 text-[#FF6B35]" />
                    Password
                  </CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setShowPasswordDialog(true)}
                    className="w-full border-gray-200 bg-white text-black hover:bg-[#FF6B35] hover:text-white"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#FF6B35]" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Add an extra layer of security</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleEnable2FA}
                    className="w-full bg-[#FF6B35] text-white hover:bg-black"
                  >
                    Enable 2FA
                  </Button>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Protect your account with two-factor authentication
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gray-200 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-black">Session Management</CardTitle>
                  <CardDescription>Manage your active sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-black">Current Session</p>
                        <p className="text-xs text-gray-500">Chrome on Windows • Gaborone, Botswana</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active Now</Badge>
                    </div>
                    <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                      Logout All Other Devices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#FF6B35]" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive text message alerts</p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">Push Notifications</p>
                    <p className="text-sm text-gray-500">Real-time browser notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">Weekly Reports</p>
                    <p className="text-sm text-gray-500">Get weekly performance summary</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">Daily Digest</p>
                    <p className="text-sm text-gray-500">Daily summary of activities</p>
                  </div>
                  <Switch
                    checked={notificationSettings.dailyDigest}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, dailyDigest: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">Marketing Emails</p>
                    <p className="text-sm text-gray-500">News and promotional offers</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                    }
                  />
                </div>
                <Button onClick={handleNotificationSave} className="w-full bg-[#FF6B35] text-white hover:bg-black">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Languages className="h-5 w-5 text-[#FF6B35]" />
                    Language
                  </CardTitle>
                  <CardDescription>Choose your preferred language</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="setswana">Setswana</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    {theme === "light" ? <Sun className="h-5 w-5 text-[#FF6B35]" /> : theme === "dark" ? <Moon className="h-5 w-5 text-[#FF6B35]" /> : <Laptop className="h-5 w-5 text-[#FF6B35]" />}
                    Theme
                  </CardTitle>
                  <CardDescription>Choose your preferred theme</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#FF6B35]" />
                    Timezone
                  </CardTitle>
                  <CardDescription>Your current timezone</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Gaborone">Africa/Gaborone (CAT)</SelectItem>
                      <SelectItem value="Africa/Johannesburg">Africa/Johannesburg (SAST)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">
                    Current time: {new Date().toLocaleTimeString("en-BW", { timeZone: "Africa/Gaborone" })}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#FF6B35]" />
                    Currency
                  </CardTitle>
                  <CardDescription>Display currency preference</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select defaultValue="bwp">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bwp">Botswana Pula (BWP)</SelectItem>
                      <SelectItem value="zar">South African Rand (ZAR)</SelectItem>
                      <SelectItem value="usd">US Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handlePreferencesSave} className="bg-[#FF6B35] text-white hover:bg-black">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Change Password Dialog */}
      {showPasswordDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">Change Password</h3>
              <button onClick={() => setShowPasswordDialog(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowPasswordDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleChangePassword} className="flex-1 bg-[#FF6B35] text-white hover:bg-black">
                Update Password
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}