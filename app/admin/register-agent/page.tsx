"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  DollarSign,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  Save,
  Trash2,
  CheckCircle,
  X,
  Users,
  Award,
  Calendar,
  Shield,
  BadgeCheck,
  FileText,
  CreditCard,
  Globe,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { saveAgent, saveAgentDraft, getAgentDraft, clearAgentDraft, generateId, type Agent } from "@/lib/storage";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  territory: string;
  commissionRate: number;
  loginEmail: string;
  loginPassword: string;
  confirmPassword: string;
  status: "active" | "pending" | "inactive";
}

const territories = [
  "Gaborone Central",
  "Gaborone North",
  "Gaborone South",
  "Francistown",
  "Maun",
  "Serowe",
  "Palapye",
  "Molepolole",
  "Kanye",
  "Lobatse",
];

export default function RegisterAgentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    territory: "",
    commissionRate: 5,
    loginEmail: "",
    loginPassword: "",
    confirmPassword: "",
    status: "pending",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredAgentId, setRegisteredAgentId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const draft = getAgentDraft();
    if (draft) {
      setFormData(draft);
      toast({
        title: "Draft Loaded",
        description: "Previously saved agent draft has been loaded.",
      });
    }
  }, []);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveDraft = () => {
    saveAgentDraft(formData);
    toast({
      title: "Draft Saved",
      description: "Agent registration draft has been saved.",
    });
  };

  const clearDraft = () => {
    clearAgentDraft();
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      territory: "",
      commissionRate: 5,
      loginEmail: "",
      loginPassword: "",
      confirmPassword: "",
      status: "pending",
    });
    setStep(1);
    toast({
      title: "Draft Cleared",
      description: "Agent registration draft has been cleared.",
    });
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
          toast({ title: "Missing Fields", description: "Please fill in all personal information fields.", variant: "destructive" });
          return false;
        }
        if (!formData.email.includes("@")) {
          toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
          return false;
        }
        break;
      case 2:
        if (!formData.territory) {
          toast({ title: "Missing Fields", description: "Please select a territory.", variant: "destructive" });
          return false;
        }
        break;
      case 3:
        if (!formData.loginEmail || !formData.loginPassword || !formData.confirmPassword) {
          toast({ title: "Missing Fields", description: "Please fill in all login credentials.", variant: "destructive" });
          return false;
        }
        if (formData.loginPassword !== formData.confirmPassword) {
          toast({ title: "Passwords Don't Match", description: "Password and confirmation do not match.", variant: "destructive" });
          return false;
        }
        if (formData.loginPassword.length < 6) {
          toast({ title: "Password Too Short", description: "Password must be at least 6 characters.", variant: "destructive" });
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
    if (!validateStep(3)) return;
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const agentId = generateId();
    
    const newAgent: Agent = {
      id: agentId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      territory: formData.territory,
      commissionRate: formData.commissionRate,
      status: formData.status,
      registrations: 0,
      completionRate: 0,
      address: formData.address,
      loginEmail: formData.loginEmail,
      loginPassword: formData.loginPassword,
    };
    
    saveAgent(newAgent);
    clearAgentDraft();
    setRegisteredAgentId(agentId);
    setShowSuccess(true);
    
    toast({
      title: "Agent Registered Successfully",
      description: `${formData.name} has been added as a field agent.`,
    });
    
    setIsSaving(false);
  };

  const getProgress = () => {
    return (step / 3) * 100;
  };

  if (showSuccess) {
    return (
      <AdminLayout>
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
                className="w-20 h-20 bg-gradient-to-r from-[#FF6B35] to-black rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-black mb-2">Agent Registered Successfully!</h2>
              <p className="text-gray-600 mb-6">
                {formData.name} has been added as a field agent.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-black mb-2">Agent Details</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-500">Agent ID:</span> {registeredAgentId.slice(-8).toUpperCase()}</p>
                  <p><span className="text-gray-500">Name:</span> {formData.name}</p>
                  <p><span className="text-gray-500">Email:</span> {formData.email}</p>
                  <p><span className="text-gray-500">Territory:</span> {formData.territory}</p>
                  <p><span className="text-gray-500">Login Email:</span> {formData.loginEmail}</p>
                  <p><span className="text-gray-500">Default Password:</span> {formData.loginPassword}</p>
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
                  Register Another Agent
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin/agents")}
                  className="border-black text-black hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35]"
                >
                  View All Agents
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Register New Agent</h1>
          <p className="text-gray-600">Add a new field agent to the Nthoppa platform</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className={step >= 1 ? "text-[#FF6B35]" : "text-gray-400"}>Personal Info</span>
            <span className={step >= 2 ? "text-[#FF6B35]" : "text-gray-400"}>Professional</span>
            <span className={step >= 3 ? "text-[#FF6B35]" : "text-gray-400"}>Credentials</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>
        
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
                  <CardDescription>Basic information about the agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        placeholder="e.g., John Motsumi"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="agent@nthoppa.com"
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
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Physical Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        placeholder="Street address, city, postal code"
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
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
                    <Building2 className="h-5 w-5 text-[#FF6B35]" />
                    Professional Information
                  </CardTitle>
                  <CardDescription>Assignment and compensation details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="territory">Assigned Territory *</Label>
                      <Select value={formData.territory} onValueChange={(v) => updateFormData("territory", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select territory" />
                        </SelectTrigger>
                        <SelectContent>
                          {territories.map(t => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                      <Input
                        id="commissionRate"
                        type="number"
                        value={formData.commissionRate}
                        onChange={(e) => updateFormData("commissionRate", parseInt(e.target.value))}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Initial Status</Label>
                      <Select value={formData.status} onValueChange={(v) => updateFormData("status", v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending Verification</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg mt-4">
                    <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4 text-[#FF6B35]" />
                      Commission Structure
                    </h3>
                    <p className="text-sm text-gray-600">
                      Agents earn {formData.commissionRate}% commission on each successful registration.
                      Estimated earnings: P{formData.commissionRate * 5} per registration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
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
                    <Lock className="h-5 w-5 text-[#FF6B35]" />
                    Login Credentials
                  </CardTitle>
                  <CardDescription>Set up agent portal access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Login Email *</Label>
                    <Input
                      id="loginEmail"
                      type="email"
                      value={formData.loginEmail}
                      onChange={(e) => updateFormData("loginEmail", e.target.value)}
                      placeholder="agent.username@nthoppa.com"
                    />
                    <p className="text-xs text-gray-500">This email will be used for agent portal login</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">Password *</Label>
                    <div className="relative">
                      <Input
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.loginPassword}
                        onChange={(e) => updateFormData("loginPassword", e.target.value)}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Minimum 6 characters</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-[#FF6B35] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-black">Important</p>
                        <p className="text-xs text-gray-600 mt-1">
                          The agent will receive their login credentials via email. 
                          They should change their password upon first login.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep} className="border-gray-200">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
          <div className="flex-1" />
          {step < 3 ? (
            <Button onClick={nextStep} className="bg-[#FF6B35] text-white hover:bg-black">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSaving} className="bg-[#FF6B35] text-white hover:bg-black">
              {isSaving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Registering Agent...
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
    </AdminLayout>
  );
}