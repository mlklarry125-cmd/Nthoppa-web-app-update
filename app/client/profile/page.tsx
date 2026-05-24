"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, IdCard, Shield, Coins, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export default function ClientProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Tshepo Molefe",
    email: "tshepo@example.com",
    phone: "+267 71 234 567",
    idNumber: "ID-123456789",
    kycStatus: "verified" as "verified" | "pending" | "unverified",
    nthoppaCoins: 1240,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Success", description: "Profile updated successfully" });
      setLoading(false);
    }, 500);
  };

  const getKYCColor = () => {
    switch (profile.kycStatus) {
      case "verified": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getKYCStatusText = () => {
    switch (profile.kycStatus) {
      case "verified": return "Verified";
      case "pending": return "Pending";
      default: return "Not Started";
    }
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
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information</p>
      </div>

      {/* Profile Overview */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-[#FF6B35]/20">
                <AvatarFallback className="bg-[#FF6B35] text-white text-2xl">
                  {getInitials(profile.fullName)}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-200">
                <Camera className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{profile.fullName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getKYCColor()}>{getKYCStatusText()}</Badge>
              <Badge className="bg-[#FF6B35]/10 text-[#FF6B35]">
                <Coins className="h-3 w-3 mr-1" />
                {profile.nthoppaCoins} Nthoppa Coins
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#FF6B35]" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-400" />
              Full Name
            </Label>
            <Input
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              Email Address
            </Label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              Phone Number
            </Label>
            <Input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-gray-400" />
              ID Number
            </Label>
            <Input
              value={profile.idNumber}
              onChange={(e) => setProfile({ ...profile, idNumber: e.target.value })}
              className="mt-1"
            />
          </div>
          <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}