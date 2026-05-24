"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Globe,
  Calendar,
  MapPin,
  Building2,
  GraduationCap,
  Briefcase,
  DollarSign,
  CheckSquare,
  Bell,
  ChevronRight,
  ChevronLeft,
  Save,
  Trash2,
  CheckCircle,
  X,
  Download,
  Eye,
  EyeOff,
  Home,
  CreditCard,
  Users,
  Heart,
  Shield,
  Award,
  Star,
  QrCode,
  TrendingUp,
  Calculator,
  UserPlus,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getAgentSession, saveUser, saveRegistrationDraft, getRegistrationDraft, clearRegistrationDraft, generateId } from "@/lib/storage";
import { cn, formatPhoneNumber } from "@/lib/utils";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  country: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  city: string;
  postalCode: string;
  employmentStatus: string;
  educationLevel: string;
  industry: string;
  monthlyIncome: string;
  interests: string[];
  notifications: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
}

interface Consents {
  data_sharing: boolean;
  marketing: boolean;
  partner_referral: boolean;
}

const interestOptions = [
  { id: "Financial Education", label: "Financial Education", icon: GraduationCap },
  { id: "Insurance Products", label: "Insurance Products", icon: Shield },
  { id: "Investment Opportunities", label: "Investment Opportunities", icon: TrendingUp },
  { id: "Savings Plans", label: "Savings Plans", icon: CreditCard },
  { id: "Budgeting Tools", label: "Budgeting Tools", icon: Calculator },
  { id: "Rewards & Coins", label: "Rewards & Coins", icon: Award },
];

export default function RegisterUserPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    country: "Botswana",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    postalCode: "",
    employmentStatus: "",
    educationLevel: "",
    industry: "",
    monthlyIncome: "",
    interests: [],
    notifications: { sms: true, email: true, push: false },
  });
  const [consents, setConsents] = useState<Consents>({
    data_sharing: false,
    marketing: false,
    partner_referral: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredUserId, setRegisteredUserId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const draft = getRegistrationDraft();
    if (draft) {
      setFormData(draft);
      toast({
        title: "Draft Loaded",
        description: "Previously saved draft has been loaded.",
      });
    }
  }, []);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof FormData] as any, [field]: value }
    }));
  };

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const saveDraft = () => {
    saveRegistrationDraft(formData);
    toast({
      title: "Draft Saved",
      description: "Your registration draft has been saved.",
    });
  };

  const clearDraft = () => {
    clearRegistrationDraft();
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      country: "Botswana",
      gender: "",
      dateOfBirth: "",
      address: "",
      city: "",
      postalCode: "",
      employmentStatus: "",
      educationLevel: "",
      industry: "",
      monthlyIncome: "",
      interests: [],
      notifications: { sms: true, email: true, push: false },
    });
    setConsents({
      data_sharing: false,
      marketing: false,
      partner_referral: false,
    });
    setStep(1);
    toast({
      title: "Draft Cleared",
      description: "Registration draft has been cleared.",
    });
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        if (!formData.fullName || !formData.phone || !formData.email || !formData.country || !formData.gender || !formData.dateOfBirth || !formData.address || !formData.city) {
          toast({ title: "Missing Fields", description: "Please fill in all personal information fields.", variant: "destructive" });
          return false;
        }
        if (!formData.phone.match(/^\+267 \d{7,8}$|^267\d{7,8}$|\d{8}$/)) {
          toast({ title: "Invalid Phone", description: "Please enter a valid Botswana phone number (+267 XXXX XXXX).", variant: "destructive" });
          return false;
        }
        break;
      case 2:
        if (!formData.employmentStatus || !formData.educationLevel || !formData.monthlyIncome) {
          toast({ title: "Missing Fields", description: "Please fill in all professional information fields.", variant: "destructive" });
          return false;
        }
        break;
      case 3:
        if (formData.interests.length === 0) {
          toast({ title: "No Interests Selected", description: "Please select at least one interest area.", variant: "destructive" });
          return false;
        }
        break;
      case 4:
        if (!consents.data_sharing || !consents.marketing || !consents.partner_referral) {
          toast({ title: "Consent Required", description: "Please agree to all privacy and data consent terms to continue.", variant: "destructive" });
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const session = getAgentSession();
    const userId = generateId();
    
    const newUser = {
      id: userId,
      ...formData,
      status: "pending" as const,
      completion: 45,
      completionRate: 45,
      registrationDate: new Date().toISOString().split("T")[0],
      territory: session?.territory || "Unknown",
      agentId: session?.agentId || "UNKNOWN",
    };
    
    saveUser(newUser);
    
    const consentTypes = ['data_sharing', 'marketing', 'partner_referral'] as const;
    for (const consentType of consentTypes) {
      if (consents[consentType]) {
        try {
          await fetch(`/api/users/${userId}/consent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consentType, granted: true }),
          });
        } catch (error) {
          console.error(`Failed to save consent for ${consentType}:`, error);
        }
      }
    }
    
    clearRegistrationDraft();
    setRegisteredUserId(userId);
    setShowSuccess(true);
    
    toast({
      title: "Registration Successful",
      description: `${formData.fullName} has been registered successfully.`,
    });
    
    setIsSaving(false);
  };

  const getProgress = () => {
    return (step / 4) * 100;
  };

  if (showSuccess) {
    return (
      <DashboardLayout type="agent">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-gray-200">
            <CardContent className="pt-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 gradient-orange-black rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-black mb-2">Registration Complete!</h2>
              <p className="text-gray-600 mb-6">
                {formData.fullName} has been successfully registered.
              </p>
              
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                  <QrCode className="h-16 w-16 text-gray-400" />
                  <p className="text-xs text-gray-500 mt-2">QR Code Placeholder</p>
                  <p className="text-xs text-gray-400">User ID: {registeredUserId.slice(-8)}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setShowSuccess(false);
                    clearDraft();
                    setStep(1);
                  }}
                  className="bg-[#FF6B35] text-white hover:bg-black"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register Another
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard/main")}
                  className="border-black text-black hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35]"
                >
                  Back to Dashboard
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="agent">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Register New User</h1>
          <p className="text-gray-600">Collect customer information to create their financial profile</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className={cn(step >= 1 ? "text-[#FF6B35]" : "text-gray-400")}>Personal Info</span>
            <span className={cn(step >= 2 ? "text-[#FF6B35]" : "text-gray-400")}>Professional</span>
            <span className={cn(step >= 3 ? "text-[#FF6B35]" : "text-gray-400")}>Interests</span>
            <span className={cn(step >= 4 ? "text-[#FF6B35]" : "text-gray-400")}>Review</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        {/* Draft Actions */}
        <div className="flex justify-end gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={saveDraft} className="border-gray-200">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm" onClick={clearDraft} className="border-red-200 text-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Draft
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <User className="h-5 w-5 text-[#FF6B35]" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Basic information about the customer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => updateFormData("fullName", e.target.value)}
                        placeholder="e.g., Kabelo Motsumi"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+267 71 234 567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="customer@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select value={formData.country} onValueChange={(v) => updateFormData("country", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Botswana">Botswana</SelectItem>
                          <SelectItem value="South Africa">South Africa</SelectItem>
                          <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select value={formData.gender} onValueChange={(v) => updateFormData("gender", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City/Town *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        placeholder="Gaborone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => updateFormData("postalCode", e.target.value)}
                        placeholder="0000"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Professional Info */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-[#FF6B35]" />
                    Professional Information
                  </CardTitle>
                  <CardDescription>Employment and financial background</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employmentStatus">Employment Status *</Label>
                      <Select value={formData.employmentStatus} onValueChange={(v) => updateFormData("employmentStatus", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed (Full-time)</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="educationLevel">Education Level *</Label>
                      <Select value={formData.educationLevel} onValueChange={(v) => updateFormData("educationLevel", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary School</SelectItem>
                          <SelectItem value="secondary">Secondary School</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="degree">Bachelor's Degree</SelectItem>
                          <SelectItem value="postgraduate">Postgraduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => updateFormData("industry", e.target.value)}
                        placeholder="e.g., Retail, Technology, Finance"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome">Monthly Income (BWP) *</Label>
                      <Select value={formData.monthlyIncome} onValueChange={(v) => updateFormData("monthlyIncome", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select income range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="P0-2000">P0 - P2,000</SelectItem>
                          <SelectItem value="P2000-5000">P2,000 - P5,000</SelectItem>
                          <SelectItem value="P5000-10000">P5,000 - P10,000</SelectItem>
                          <SelectItem value="P10000-20000">P10,000 - P20,000</SelectItem>
                          <SelectItem value="P20000-50000">P20,000 - P50,000</SelectItem>
                          <SelectItem value="P50000+">P50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Heart className="h-5 w-5 text-[#FF6B35]" />
                    Areas of Interest
                  </CardTitle>
                  <CardDescription>Select the financial products the customer is interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {interestOptions.map((interest) => {
                      const Icon = interest.icon;
                      const isSelected = formData.interests.includes(interest.id);
                      return (
                        <div
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                            isSelected
                              ? "border-[#FF6B35] bg-[#FF6B35]/5"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            isSelected ? "bg-[#FF6B35]" : "bg-gray-100"
                          )}>
                            <Icon className={cn("h-5 w-5", isSelected ? "text-white" : "text-gray-500")} />
                          </div>
                          <span className={cn("font-medium", isSelected ? "text-[#FF6B35]" : "text-black")}>
                            {interest.label}
                          </span>
                          {isSelected && <CheckCircle className="h-5 w-5 text-[#FF6B35] ml-auto" />}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Review & Consent */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-[#FF6B35]" />
                    Review & Consent
                  </CardTitle>
                  <CardDescription>Review the information and provide consent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Review Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-black">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="text-black font-medium">{formData.fullName}</span>
                      <span className="text-gray-600">Phone:</span>
                      <span className="text-black font-medium">{formData.phone}</span>
                      <span className="text-gray-600">Email:</span>
                      <span className="text-black font-medium">{formData.email}</span>
                      <span className="text-gray-600">Country:</span>
                      <span className="text-black font-medium">{formData.country}</span>
                      <span className="text-gray-600">City:</span>
                      <span className="text-black font-medium">{formData.city}</span>
                    </div>
                    
                    <h3 className="font-semibold text-black mt-4">Professional Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-gray-600">Employment:</span>
                      <span className="text-black font-medium">{formData.employmentStatus}</span>
                      <span className="text-gray-600">Education:</span>
                      <span className="text-black font-medium">{formData.educationLevel}</span>
                      <span className="text-gray-600">Monthly Income:</span>
                      <span className="text-black font-medium">{formData.monthlyIncome}</span>
                    </div>
                    
                    <h3 className="font-semibold text-black mt-4">Areas of Interest</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map(interest => (
                        <Badge key={interest} className="bg-[#FF6B35] text-white">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Notification Preferences */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-black flex items-center gap-2">
                      <Bell className="h-4 w-4 text-[#FF6B35]" />
                      Notification Preferences
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-black">SMS Notifications</p>
                          <p className="text-xs text-gray-500">Receive updates via text message</p>
                        </div>
                        <Switch
                          checked={formData.notifications.sms}
                          onCheckedChange={(v) => updateNestedFormData("notifications", "sms", v)}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-black">Email Notifications</p>
                          <p className="text-xs text-gray-500">Receive updates via email</p>
                        </div>
                        <Switch
                          checked={formData.notifications.email}
                          onCheckedChange={(v) => updateNestedFormData("notifications", "email", v)}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-black">Push Notifications</p>
                          <p className="text-xs text-gray-500">Receive real-time alerts</p>
                        </div>
                        <Switch
                          checked={formData.notifications.push}
                          onCheckedChange={(v) => updateNestedFormData("notifications", "push", v)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy & Data Consent */}
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-black flex items-center gap-2">
                      <Shield className="h-4 w-4 text-[#FF6B35]" />
                      Privacy & Data Consent *
                    </h3>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consents.data_sharing}
                        onChange={(e) => setConsents({ ...consents, data_sharing: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35]"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to Nthoppa collecting and using my financial behaviour data to improve my experience
                      </span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consents.marketing}
                        onChange={(e) => setConsents({ ...consents, marketing: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35]"
                      />
                      <span className="text-sm text-gray-600">
                        I consent to receive marketing communications from Nthoppa and its partners
                      </span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consents.partner_referral}
                        onChange={(e) => setConsents({ ...consents, partner_referral: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35]"
                      />
                      <span className="text-sm text-gray-600">
                        I allow Nthoppa to share my anonymised data with financial partners for product matching
                      </span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep} className="border-gray-200">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <Button onClick={nextStep} className="bg-[#FF6B35] text-white hover:bg-black">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSaving} className="bg-[#FF6B35] text-white hover:bg-black">
              {isSaving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Registering...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Registration
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}