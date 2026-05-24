"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Shield, Calendar, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export default function AdminProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@nthoppa.com",
    role: "Administrator",
    lastLogin: "2026-05-23 10:30 AM",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Success", description: "Profile updated successfully" });
      setLoading(false);
    }, 500);
  };

  const handlePasswordChange = () => {
    if (password.new !== password.confirm) {
      toast({ title: "Error", description: "New passwords do not match", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: "Password changed successfully" });
    setPassword({ current: "", new: "", confirm: "" });
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
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
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-gray-500 mt-1">Manage your administrator profile</p>
      </div>

      {/* Profile Overview */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 border-4 border-[#FF6B35]/20">
              <AvatarFallback className="bg-[#FF6B35] text-white text-2xl">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{profile.name}</h2>
            <Badge className="mt-2 bg-[#FF6B35] text-white">{profile.role}</Badge>
            <p className="text-sm text-gray-500 mt-2">Last login: {profile.lastLogin}</p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-[#FF6B35]" />Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Full Name</Label><Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1" /></div>
          <div><Label>Email Address</Label><Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="mt-1" /></div>
          <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-[#FF6B35]" />Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Current Password</Label><Input type="password" placeholder="Enter current password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} className="mt-1" /></div>
          <div><Label>New Password</Label><Input type="password" placeholder="Enter new password" value={password.new} onChange={(e) => setPassword({ ...password, new: e.target.value })} className="mt-1" /></div>
          <div><Label>Confirm New Password</Label><Input type="password" placeholder="Confirm new password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} className="mt-1" /></div>
          <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handlePasswordChange}>
            <Shield className="h-4 w-4 mr-2" /> Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}