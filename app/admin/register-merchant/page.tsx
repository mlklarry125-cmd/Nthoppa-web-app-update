"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  Save,
  Trash2,
  CheckCircle,
  Briefcase,
  Banknote,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FormData {
  // Business Info
  businessName: string;
  businessType: string;
  businessRegNumber: string;
  taxId: string;
  
  // Contact & Banking
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  bankName: string;
  accountNumber: string;
  branchCode: string;
  
  // Credentials
  loginEmail: string;
  password: string;
  confirmPassword: string;
}

const businessTypes = [
  "Retail",
  "Restaurant",
  "Services",
  "Salon",
  "Pharmacy",
  "Hardware",
  "Supermarket",
  "Electronics",
  "Clothing",
  "Other",
];

const banks = [
  "First National Bank (FNB)",
  "Stanbic Bank",
  "Barclays Bank (Absa)",
  "Standard Chartered",
  "Bank Gaborone",
  "First Capital Bank",
  "Bank of Baroda",
];

export default function RegisterMerchantPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessType: "",
    businessRegNumber: "",
    taxId: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "Gaborone",
    bankName: "",
    accountNumber: "",
    branchCode: "",
    loginEmail: "",
    password: "",
    confirmPassword: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        if (!formData.businessName || !formData.businessType) {
          toast({ title: "Missing Fields", description: "Please fill in all business information fields.", variant: "destructive" });
          return false;
        }
        break;
      case 2:
        if (!formData.ownerName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.bankName || !formData.accountNumber) {
          toast({ title: "Missing Fields", description: "Please fill in all contact and banking fields.", variant: "destructive" });
          return false;
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
          return false;
        }
        if (!formData.phone.match(/^\+267 \d{7,8}$|^\d{8}$/)) {
          toast({ title: "Invalid Phone", description: "Please enter a valid Botswana phone number (+267 71 234 567).", variant: "destructive" });
          return false;
        }
        break;
      case 3:
        if (!formData.loginEmail || !formData.password || !formData.confirmPassword) {
          toast({ title: "Missing Fields", description: "Please fill in all login credentials.", variant: "destructive" });
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast({ title: "Password Mismatch", description: "Passwords do not match.", variant: "destructive" });
          return false;
        }
        if (formData.password.length < 6) {
          toast({ title: "Weak Password", description: "Password must be at least 6 characters.", variant: "destructive" });
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

  const saveDraft = () => {
    localStorage.setItem("merchant_registration_draft", JSON.stringify(formData));
    toast({ title: "Draft Saved", description: "Merchant registration draft has been saved." });
  };

  const clearDraft = () => {
    localStorage.removeItem("merchant_registration_draft");
    setFormData({
      businessName: "",
      businessType: "",
      businessRegNumber: "",
      taxId: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "Gaborone",
      bankName: "",
      accountNumber: "",
      branchCode: "",
      loginEmail: "",
      password: "",
      confirmPassword: "",
    });
    setStep(1);
    toast({ title: "Draft Cleared", description: "Registration draft has been cleared." });
  };

  const loadDraft = () => {
    const draft = localStorage.getItem("merchant_registration_draft");
    if (draft) {
      setFormData(JSON.parse(draft));
      toast({ title: "Draft Loaded", description: "Previously saved draft has been loaded." });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSaving(true);
    
    try {
      const response = await fetch("/api/merchants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.removeItem("merchant_registration_draft");
        setShowSuccess(true);
        toast({ title: "Success!", description: "Merchant account created successfully." });
        
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2000);
      } else {
        toast({ title: "Error", description: data.error || "Failed to create merchant account.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const getProgress = () => (step / 3) * 100;

  if (showSuccess) {
    return (
      <AdminLayout>
        <div className="max-w-2xl mx-auto">
          <Card className="border-gray-200">
            <CardContent className="pt-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#c44216] rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-black mb-2">Merchant Registered!</h2>
              <p className="text-gray-600 mb-6">
                {formData.businessName} has been successfully registered as a merchant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.reload()} className="bg-[#FF6B35] text-white hover:bg-black">
                  Register Another Merchant
                </Button>
                <Button variant="outline" onClick={() => router.push("/admin/dashboard")} className="border-black text-black hover:bg-[#FF6B35] hover:text-white">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Register New Merchant</h1>
          <p className="text-gray-600">Collect business information to create a merchant account</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className={cn(step >= 1 ? "text-[#FF6B35]" : "text-gray-400")}>Business Info</span>
            <span className={cn(step >= 2 ? "text-[#FF6B35]" : "text-gray-400")}>Contact & Banking</span>
            <span className={cn(step >= 3 ? "text-[#FF6B35]" : "text-gray-400")}>Credentials</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        <div className="flex justify-end gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={loadDraft} className="border-gray-200">
            Load Draft
          </Button>
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
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-[#FF6B35]" />
                    Business Information
                  </CardTitle>
                  <CardDescription>Legal and operational details of the business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input id="businessName" value={formData.businessName} onChange={(e) => updateFormData("businessName", e.target.value)} placeholder="e.g., Kgabo General Store" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select value={formData.businessType} onValueChange={(v) => updateFormData("businessType", v)}>
                        <SelectTrigger><SelectValue placeholder="Select business type" /></SelectTrigger>
                        <SelectContent>{businessTypes.map(type => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessRegNumber">Business Registration Number</Label>
                      <Input id="businessRegNumber" value={formData.businessRegNumber} onChange={(e) => updateFormData("businessRegNumber", e.target.value)} placeholder="e.g., BW202400123" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID / BURS Number</Label>
                      <Input id="taxId" value={formData.taxId} onChange={(e) => updateFormData("taxId", e.target.value)} placeholder="e.g., 123456789" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-[#FF6B35]" />
                    Contact & Banking Information
                  </CardTitle>
                  <CardDescription>Owner details and banking information for payouts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner Full Name *</Label>
                      <Input id="ownerName" value={formData.ownerName} onChange={(e) => updateFormData("ownerName", e.target.value)} placeholder="e.g., Thabo Motsumi" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} placeholder="business@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} placeholder="+267 71 234 567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Physical Address *</Label>
                      <Input id="address" value={formData.address} onChange={(e) => updateFormData("address", e.target.value)} placeholder="123 Main Street" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City/Town *</Label>
                      <Input id="city" value={formData.city} onChange={(e) => updateFormData("city", e.target.value)} placeholder="Gaborone" />
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-black mb-4 flex items-center gap-2"><Banknote className="h-4 w-4 text-[#FF6B35]" />Banking Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name *</Label>
                        <Select value={formData.bankName} onValueChange={(v) => updateFormData("bankName", v)}>
                          <SelectTrigger><SelectValue placeholder="Select bank" /></SelectTrigger>
                          <SelectContent>{banks.map(bank => (<SelectItem key={bank} value={bank}>{bank}</SelectItem>))}</SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number *</Label>
                        <Input id="accountNumber" value={formData.accountNumber} onChange={(e) => updateFormData("accountNumber", e.target.value)} placeholder="e.g., 1234567890" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branchCode">Branch Code</Label>
                        <Input id="branchCode" value={formData.branchCode} onChange={(e) => updateFormData("branchCode", e.target.value)} placeholder="e.g., 123456" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Lock className="h-5 w-5 text-[#FF6B35]" />
                    Login Credentials
                  </CardTitle>
                  <CardDescription>Create secure login credentials for the merchant portal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Login Email *</Label>
                    <Input id="loginEmail" type="email" value={formData.loginEmail} onChange={(e) => updateFormData("loginEmail", e.target.value)} placeholder="merchant@nthoppa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => updateFormData("password", e.target.value)} placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input id="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => updateFormData("confirmPassword", e.target.value)} placeholder="••••••••" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          {step > 1 && <Button variant="outline" onClick={prevStep} className="border-gray-200"><ChevronLeft className="h-4 w-4 mr-2" />Previous</Button>}
          <div className="flex-1" />
          {step < 3 ? <Button onClick={nextStep} className="bg-[#FF6B35] text-white hover:bg-black">Next<ChevronRight className="h-4 w-4 ml-2" /></Button> : <Button onClick={handleSubmit} disabled={isSaving} className="bg-[#FF6B35] text-white hover:bg-black">{isSaving ? (<><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />Registering...</>) : (<><CheckCircle className="h-4 w-4 mr-2" />Create Merchant Account</>)}</Button>}
        </div>
      </div>
    </AdminLayout>
  );
}