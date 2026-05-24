"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, LayoutDashboard, UserPlus, Users, BarChart3,
  FileText, LogOut, Bell, ChevronDown,
  Shield, TrendingUp, Activity, ChevronRight, Sparkles, Lock,
  Building2, Settings, UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { CoinsIcon, NthoppaLogoMark, SMEIcon, NthoppaSureIcon } from "@/components/ui/NthoppaIcons";

const adminNavItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Register Agent", href: "/admin/register-agent", icon: UserPlus },
  { name: "Manage Agents", href: "/admin/agents", icon: Users },
  { name: "Register Merchant", href: "/admin/register-merchant", icon: Building2 },
  { name: "NthoppaSure", href: "/admin/nthoppa-sure", icon: NthoppaSureIcon },
  { name: "SME Pipeline", href: "/admin/sme-pipeline", icon: SMEIcon },
  { name: "Investor View", href: "/admin/investor", icon: TrendingUp },
  { name: "Reports", href: "/admin/reports", icon: FileText },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [lastLoginDate, setLastLoginDate] = useState<string>("");
  const [coinBalance, setCoinBalance] = useState(5000);
  const [notifications, setNotifications] = useState(5);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setLastLoginDate(new Date().toLocaleDateString());
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/check', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setAdminName(data.name || "Administrator");
          setAdminEmail(data.email || "");
        } else {
          router.push('/login');
        }
      } catch {
        setAdminName("Administrator");
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {}
    localStorage.removeItem("nthoppa_role");
    localStorage.removeItem("nthoppa_token");
    toast({ title: "Logged out", description: "You have been successfully logged out." });
    router.push('/login');
  };

  const getInitials = (name: string) =>
    name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const sidebarWidth = collapsed ? "w-16" : "w-64";

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Profile Bar */}
      <div className="profile-bar">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-8 w-auto" />
            <span className="font-bold text-xl text-[#FF6B35] hidden sm:inline">Nthoppa Admin</span>
          </Link>

          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              {adminNavItems.find(nav => nav.href === pathname)?.name || 'Admin Portal'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => router.push('/admin/dashboard')}
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
                      {getInitials(adminName || "Admin")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{adminName || "Administrator"}</p>
                    <Badge variant="secondary" className="text-xs">Admin</Badge>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
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

      {/* Sidebar */}
      <div className="flex">
        <motion.aside
          animate={{ width: collapsed ? 64 : 256 }}
          className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-[#0a0a0a] text-white border-r border-[#FF6B35]/20 overflow-y-auto transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
        >
          <div className="p-4">
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-6`}>
              <div className={`flex items-center gap-2 ${collapsed ? 'hidden' : 'flex'}`}>
                <NthoppaLogoMark className="h-8 w-8" />
                <span className="font-bold text-lg text-[#FF6B35]">Nthoppa</span>
              </div>
              {!collapsed && (
                <button
                  onClick={() => setCollapsed(true)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="flex items-center justify-center w-full mb-6 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
            )}

            <nav className="space-y-1">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      collapsed ? "justify-center" : "",
                      isActive
                        ? "bg-[#FF6B35] text-white"
                        : "text-gray-400 hover:bg-white/8 hover:text-white"
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    <IconComponent className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </motion.aside>

        <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'} p-6`}>
          <div className="max-w-7xl mx-auto">
            {children}
            
            <footer className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
              <span className="font-medium">© 2026 Nthoppa Financial Technologies. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><Shield className="h-3 w-3 text-green-500" />AES-256 Encrypted</span>
                <span className="flex items-center gap-1.5"><Lock className="h-3 w-3 text-blue-500" />OAuth 2.0</span>
                <span className="flex items-center gap-1.5"><Activity className="h-3 w-3 text-[#FF6B35]" />Live Monitoring</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}