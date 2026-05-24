"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Briefcase,
  ShoppingBag,
  Shield,
  Users,
  ChevronRight,
  ChevronLeft,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Role = "agent" | "user" | "hr" | "merchant" | "admin";

const roleConfig = {
  agent: { 
    label: "Agent", 
    icon: User, 
    dashboard: "/dashboard/main", 
    demoEmail: "agent@nthoppa.com", 
    demoPassword: "agent123"
  },
  user: { 
    label: "User", 
    icon: Users, 
    dashboard: "/client/dashboard", 
    demoEmail: "client@nthoppa.com", 
    demoPassword: "client123"
  },
  hr: { 
    label: "HR Manager", 
    icon: Briefcase, 
    dashboard: "/hr/dashboard", 
    demoEmail: "hr@nthoppa.com", 
    demoPassword: "hr123"
  },
  merchant: { 
    label: "Merchant", 
    icon: ShoppingBag, 
    dashboard: "/merchant/dashboard", 
    demoEmail: "merchant@nthoppa.com", 
    demoPassword: "merchant123"
  },
  admin: { 
    label: "Admin", 
    icon: Shield, 
    dashboard: "/admin/dashboard", 
    demoEmail: "admin@nthoppa.com", 
    demoPassword: "admin123"
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<Role>("agent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Registration form state
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState<Role>("user");
  const [regIsLoading, setRegIsLoading] = useState(false);

  // REMOVED: Auto-redirect useEffect - users must always see the login form
  // They will only be redirected after successful login submission

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use relative URL - CORRECT
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: selectedRole }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Welcome back!",
          description: `Logged in as ${roleConfig[selectedRole].label}`,
        });

        router.push(roleConfig[selectedRole].dashboard);
      } else {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: regFullName,
          email: regEmail,
          phone: regPhone,
          password: regPassword,
          role: regRole,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Account Created! 🎉",
          description: "You have been automatically logged in.",
        });
        
        const roleRoutes: Record<string, string> = {
          user: "/client/dashboard",
          hr: "/hr/dashboard",
          merchant: "/merchant/dashboard",
        };
        
        router.push(roleRoutes[regRole] || "/client/dashboard");
      } else {
        toast({
          title: "Registration Failed",
          description: data.error || "Could not create account",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRegIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: Role) => {
    const config = roleConfig[role];
    setSelectedRole(role);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: config.demoEmail,
          password: config.demoPassword,
          role: role,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: `Welcome! Logged in as ${config.label}`,
          description: "Redirecting to your dashboard...",
        });
        router.push(config.dashboard);
      } else {
        toast({
          title: "Demo Login Failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Fixed bottom-left logo */}
      <div className="fixed bottom-4 left-4 z-50 w-10 h-10 rounded-xl overflow-hidden bg-black border border-[#FF6B35]/20 shadow-lg">
        <img src="/nthoppa-logo.png" alt="Nthoppa" className="w-full h-full object-cover" />
      </div>

      {/* LEFT PANEL - Dark Gradient */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#2a0e00] via-[#1a0800] to-[#0a0300] relative overflow-hidden flex flex-col p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF6B35]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-[#FF6B35]/20 shadow-lg">
              <img src="/nthoppa-logo.png" alt="Nthoppa" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-white text-2xl tracking-tight">Nthoppa</span>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              Financial freedom <br />for everyone.
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Empowering underserved communities in Botswana with smart financial tools, insurance, savings, and education.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#FF6B35]/30 transition-all">
                <div className="text-2xl font-black text-white">10,234+</div>
                <div className="text-white/40 text-sm">Users Served</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#FF6B35]/30 transition-all">
                <div className="text-2xl font-black text-white">BWP 2.4M</div>
                <div className="text-white/40 text-sm">Million Pula</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#FF6B35]/30 transition-all">
                <div className="text-2xl font-black text-[#FF6B35]">89pts↑</div>
                <div className="text-white/40 text-sm">Credit Score</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#FF6B35]/30 transition-all">
                <div className="text-2xl font-black text-white">1,245</div>
                <div className="text-white/40 text-sm">Active Agents</div>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full px-4 py-2 w-fit">
              <Globe className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-[#FF6B35] text-sm font-semibold">Botswana's #1 Fintech Platform</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - White */}
      <div className="lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!showRegister && !showForgotPassword ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back to home */}
                <a href="/" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#FF6B35] text-xs font-medium mb-6 transition-colors group">
                  <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  Back to home
                </a>

                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900">Sign in to your account</h2>
                  <p className="text-gray-500 mt-2">Access your Nthoppa dashboard</p>
                </div>

                {/* Role Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Object.entries(roleConfig) as [Role, typeof roleConfig.agent][]).map(([key, config]) => {
                    const Icon = config.icon;
                    const isSelected = selectedRole === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedRole(key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/20"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {config.label}
                      </button>
                    );
                  })}
                </div>

                {/* One-Click Demo Buttons */}
                <div className="bg-gradient-to-br from-[#FF6B35]/5 to-orange-50 border border-[#FF6B35]/20 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">⚡ Quick Demo — One-Click Login</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(roleConfig).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => handleDemoLogin(key as Role)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] rounded-lg text-xs font-semibold text-gray-600 transition-all shadow-sm hover:shadow-md"
                      >
                        <config.icon className="h-3 w-3" />
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 py-6 rounded-xl border-gray-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</Label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[#FF6B35] text-sm font-semibold hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 py-6 rounded-xl border-gray-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#FF6B35] hover:bg-[#e55a2b] text-white rounded-xl py-6 font-bold text-base transition-all shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto" />
                    ) : (
                      <>Sign In as {roleConfig[selectedRole].label} <ChevronRight className="h-4 w-4 ml-2" /></>
                    )}
                  </Button>

                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => setShowRegister(true)}
                      className="text-gray-600 hover:text-[#FF6B35] text-sm transition-colors"
                    >
                      Don't have an account? <span className="font-semibold">Get Started</span>
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">🔒 AES-256 Encryption</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">OAuth 2.0</span>
                    <span>•</span>
                    <span>© 2026 Nthoppa</span>
                  </div>
                </div>
              </motion.div>
            ) : showForgotPassword ? (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md mx-auto"
              >
                {!resetSent ? (
                  <>
                    <button
                      onClick={() => { setShowForgotPassword(false); setResetEmail(""); }}
                      className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] text-sm font-medium mb-8 group transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </div>
                      Back to Sign In
                    </button>

                    <h2 className="text-3xl font-black text-gray-900 mb-2">Reset Password</h2>
                    <p className="text-gray-500 text-sm mb-8">
                      Enter the email address linked to your account and we'll send you a password reset link.
                    </p>

                    <div className="mb-6">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        if (!resetEmail) return;
                        setResetLoading(true);
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        setResetLoading(false);
                        setResetSent(true);
                      }}
                      disabled={resetLoading || !resetEmail}
                      className="w-full bg-[#FF6B35] text-white font-bold py-4 rounded-xl hover:bg-[#e55a2b] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B35]/30"
                    >
                      {resetLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Reset Link...
                        </>
                      ) : (
                        'Send Reset Link →'
                      )}
                    </button>

                    <p className="text-center text-gray-400 text-xs mt-6">
                      Remember your password?{' '}
                      <button
                        onClick={() => setShowForgotPassword(false)}
                        className="text-[#FF6B35] font-semibold hover:underline"
                      >
                        Sign In
                      </button>
                    </p>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-3">Check Your Email</h2>
                    <p className="text-gray-500 text-sm mb-2">
                      We've sent a password reset link to:
                    </p>
                    <p className="font-bold text-gray-900 text-sm mb-8">{resetEmail}</p>
                    <p className="text-gray-400 text-xs mb-8">
                      Didn't receive the email? Check your spam folder or try again with a different email address.
                    </p>
                    <button
                      onClick={() => { setResetSent(false); setResetEmail(""); }}
                      className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all text-sm mb-4"
                    >
                      Try a different email
                    </button>
                    <button
                      onClick={() => { setShowForgotPassword(false); setResetSent(false); setResetEmail(""); }}
                      className="w-full bg-[#FF6B35] text-white font-bold py-3.5 rounded-xl hover:bg-[#e55a2b] transition-all text-sm"
                    >
                      Back to Sign In
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
                  <p className="text-gray-500 mt-2">Join the Nthoppa community</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="regFullName" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="regFullName"
                        placeholder="Thabo Motsumi"
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        className="pl-10 py-6 rounded-xl border-gray-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regEmail" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="regEmail"
                        type="email"
                        placeholder="you@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="pl-10 py-6 rounded-xl border-gray-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regPhone" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="regPhone"
                        placeholder="+267 71 234 567"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="pl-10 py-6 rounded-xl border-gray-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regPassword" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="regPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="pl-10 pr-10 py-6 rounded-xl border-gray-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">I want to join as</Label>
                    <div className="flex flex-wrap gap-2">
                      {(["user", "hr", "merchant"] as Role[]).map((key) => {
                        const config = roleConfig[key];
                        const Icon = config.icon;
                        const isSelected = regRole === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setRegRole(key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                              isSelected
                                ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/20"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {config.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={regIsLoading}
                    className="w-full bg-[#FF6B35] hover:bg-[#e55a2b] text-white rounded-xl py-6 font-bold text-base transition-all shadow-lg hover:shadow-xl mt-6"
                  >
                    {regIsLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => setShowRegister(false)}
                      className="text-gray-600 hover:text-[#FF6B35] text-sm transition-colors"
                    >
                      Already have an account? <span className="font-semibold">Sign In</span>
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">🔒 AES-256 Encryption</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">OAuth 2.0</span>
                    <span>•</span>
                    <span>© 2026 Nthoppa</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}