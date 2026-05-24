"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  QrCode,
  BarChart3,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Shield,
  Lock,
  Activity,
  Bell,
  Settings,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { CoinsIcon, NthoppaLogoMark } from "@/components/ui/NthoppaIcons";

const navItems = [
  { name: "Dashboard", href: "/merchant/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/merchant/transactions", icon: CreditCard },
  { name: "QR Payments", href: "/merchant/qr-payments", icon: QrCode },
  { name: "Analytics", href: "/merchant/analytics", icon: BarChart3 },
  { name: "Settings", href: "/merchant/settings", icon: Settings },
];

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [merchantName, setMerchantName] = useState("");
  const [merchantEmail, setMerchantEmail] = useState("");
  const [lastLoginDate, setLastLoginDate] = useState<string>("");
  const [coinBalance, setCoinBalance] = useState(500);
  const [notifications, setNotifications] = useState(2);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const checkAuth = async (retries = 3): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/check', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setMerchantName(data.name || "Merchant");
        setMerchantEmail(data.email || "");
        return true;
      } else if (retries > 0) {
        await new Promise(r => setTimeout(r, 800));
        return checkAuth(retries - 1);
      } else {
        router.push("/login");
        return false;
      }
    } catch (error) {
      if (retries > 0) {
        await new Promise(r => setTimeout(r, 800));
        return checkAuth(retries - 1);
      }
      router.push("/login");
      return false;
    }
  };

  useEffect(() => {
    setLastLoginDate(new Date().toLocaleDateString());
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {}
    localStorage.removeItem("nthoppa_token");
    localStorage.removeItem("nthoppa_role");
    localStorage.removeItem("nthoppa_user_id");
    toast({ title: "Logged out", description: "You have been successfully logged out." });
    router.push("/login");
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-center mb-6">
        <NthoppaLogoMark className="h-10 w-10" />
        <span className="ml-2 font-bold text-lg text-[#FF6B35]">Nthoppa</span>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-[#FF6B35] text-white"
                  : "text-gray-400 hover:bg-white/8 hover:text-white"
              )}
            >
              <IconComponent className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Profile Bar */}
      <div className="profile-bar">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href="/merchant/dashboard" className="flex items-center gap-2">
            <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-8 w-auto" />
            <span className="font-bold text-xl text-[#FF6B35] hidden sm:inline">Nthoppa Merchant</span>
          </Link>

          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              {navItems.find(nav => nav.href === pathname)?.name || 'Merchant Portal'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => router.push('/merchant/dashboard')}
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
              <CoinsIcon className="h-4 w-4" />
              <span className="text-sm font-semibold text-[#FF6B35]">{coinBalance} Nthoppa Coins</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#FF6B35] text-white">
                      {getInitials(merchantName || "Merchant")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{merchantName || "Merchant"}</p>
                    <Badge variant="secondary" className="text-xs">Merchant</Badge>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Merchant Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/merchant/settings')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - always visible, no animation */}
      <aside className="hidden lg:flex fixed left-0 top-[64px] z-40 h-[calc(100vh-64px)] w-64 bg-[#0a0a0a] text-white flex-col overflow-y-auto">
        <div className="p-4">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar - animated slide in/out */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="lg:hidden fixed left-0 top-[64px] z-40 h-[calc(100vh-64px)] w-64 bg-[#0a0a0a] text-white overflow-y-auto"
      >
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mt-8">
            <SidebarContent />
          </div>
        </div>
      </motion.aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden bg-[#FF6B35] text-white p-3 rounded-full shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
          
          <footer className="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <span>© 2026 Nthoppa Financial. All rights reserved.</span>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> AES-256 Encrypted</span>
              <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> OAuth 2.0</span>
              <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> Real-time Monitoring</span>
              <button className="text-[#FF6B35] hover:underline">Support</button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}