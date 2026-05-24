"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, MapPin, Award, Coins, Save, Camera } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export default function AgentProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "Tshepo Molefe",
    email: "tshepo@nthoppa.com",
    phone: "+267 71 234 567",
    region: "South",
    territory: "Gaborone",
    agentCode: "AGT-001",
    usersRegistered: 124,
    nthoppaCoins: 3250,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Success", description: "Profile updated successfully" });
      setLoading(false);
    }, 500);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <DashboardLayout type="agent">
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
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your agent profile information</p>
        </div>

        {/* Profile Overview */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-[#FF6B35]/20">
                  <AvatarFallback className="bg-[#FF6B35] text-white text-2xl">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-200">
                  <Camera className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">{profile.name}</h2>
              <Badge className="mt-2 bg-[#FF6B35] text-white">Agent Code: {profile.agentCode}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div><p className="text-white/80 text-sm">Users Registered</p><p className="text-2xl font-bold">{profile.usersRegistered}</p></div>
                <Award className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div><p className="text-white/80 text-sm">Nthoppa Coins</p><p className="text-2xl font-bold">{profile.nthoppaCoins}</p></div>
                <Coins className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-[#FF6B35]" />Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Full Name</Label><Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1" /></div>
            <div><Label>Email</Label><Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="mt-1" /></div>
            <div><Label>Phone</Label><Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-1" /></div>
            <div><Label>Region</Label><Input value={profile.region} onChange={(e) => setProfile({ ...profile, region: e.target.value })} className="mt-1" /></div>
            <div><Label>Territory</Label><Input value={profile.territory} onChange={(e) => setProfile({ ...profile, territory: e.target.value })} className="mt-1" /></div>
            <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleSave} disabled={loading}>
              <Save className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}