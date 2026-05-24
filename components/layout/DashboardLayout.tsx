"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, LayoutDashboard, UserPlus, Users, BarChart3, MapPin,
  MessageSquare, FileText, LogOut, Bell, ChevronDown,
  User, Trophy, Brain, BookOpen, TrendingUp, CreditCard,
  ShoppingBag, Store, Shield, Lock, Activity, ChevronRight, Sparkles,
  Settings, UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getAgentSession, clearAgentSession, getAdminSession, clearAdminSession } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { CoinsIcon, NthoppaLogoMark, MotsheloIcon, SMEIcon, NthoppaSureIcon } from "@/components/ui/NthoppaIcons";

interface NavItem { name: string; href: string; icon: any; badge?: string; }
interface Notification { id: string; message: string; type: string; read: boolean; createdAt: string; }

const agentNavItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard/main", icon: LayoutDashboard },
  { name: "Register User", href: "/dashboard/register", icon: UserPlus },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Motshelo", href: "/dashboard/motshelo", icon: MotsheloIcon },
  { name: "Education", href: "/dashboard/education", icon: BookOpen },
  { name: "AI Advisor", href: "/dashboard/ai-advisor", icon: Brain, badge: "AI" },
  { name: "Rewards", href: "/dashboard/gamification", icon: Trophy },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Credit Scoring", href: "/dashboard/credit-scoring", icon: TrendingUp },
  { name: "SMME Pipeline", href: "/dashboard/smme-pipeline", icon: SMEIcon },
  { name: "Merchant", href: "/dashboard/merchant", icon: Store },
  { name: "NthoppaSure", href: "/dashboard/nthoppa-sure", icon: NthoppaSureIcon },
  { name: "Territory", href: "/dashboard/territory", icon: MapPin },
  { name: "Communications", href: "/dashboard/communications", icon: MessageSquare },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface DashboardLayoutProps { children: React.ReactNode; type: "agent" | "admin"; }

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentTerritory, setAgentTerritory] = useState("");
  const [agentId, setAgentId] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState<string>("");
  const [coinBalance, setCoinBalance] = useState(2500);
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const navItems = agentNavItems;

  // Save scroll position before navigation
  const handleNavClick = () => {
    if (sidebarRef.current) {
      sessionStorage.setItem('sidebarScrollPosition', String(sidebarRef.current.scrollTop));
    }
  };

  // Restore scroll position after navigation
  useEffect(() => {
    if (sidebarRef.current) {
      const savedPosition = sessionStorage.getItem('sidebarScrollPosition');
      if (savedPosition) {
        sidebarRef.current.scrollTop = parseInt(savedPosition, 10);
        sessionStorage.removeItem('sidebarScrollPosition');
      }
    }
  }, [pathname]);

  useEffect(() => {
    setLastLoginDate(new Date().toLocaleDateString());
    const loadUserData = async () => {
      try {
        const response = await fetch('/api/auth/check', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setAgentName(data.name || (type === "agent" ? "Agent" : "Admin"));
          setAgentEmail(data.email || "");
          setAgentTerritory(data.territory || (type === "agent" ? "Gaborone" : "Admin Portal"));
          setAgentId(data.id || "");
          
          if (type === "agent" && data.id) {
            loadNotifications();
          }
        } else {
          if (type === "agent") {
            const session = getAgentSession();
            if (session) {
              setAgentName(session.name);
              setAgentTerritory(session.territory);
              setAgentId(session.agentId);
              loadNotifications();
            } else {
              router.push('/login');
            }
          } else {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
        setAgentName(type === "agent" ? "Agent" : "Admin");
        if (type === "agent") {
          setAgentTerritory("Gaborone");
        }
      }
    };
    
    const loadNotifications = async () => {
      try {
        const response = await fetch('/api/notifications', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          const unread = Array.isArray(data) ? data.filter((n: Notification) => !n.read) : [];
          setNotifications(unread);
          setNotificationCount(unread.length);
        }
      } catch {}
    };

    const loadAll = async () => {
      await Promise.all([loadUserData(), loadNotifications()]);
    };
    loadAll();
  }, [type, router]);

  const markAllAsRead = async () => {
    try {
      const ids = notifications.map(n => n.id);
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
        credentials: 'include',
      });
      setNotifications([]);
      setNotificationCount(0);
    } catch {}
  };

  const handleLogout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); } catch {}
    if (type === "agent") clearAgentSession(); else clearAdminSession();
    localStorage.removeItem("nthoppa_role");
    localStorage.removeItem("nthoppa_token");
    toast({ title: "Logged out", description: "You have been successfully logged out." });
    router.push(type === "agent" ? "/login" : "/admin");
  };

  const getInitials = (name: string) =>
    name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Profile Bar */}
      <div className="profile-bar">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href={type === "agent" ? "/dashboard/main" : "/admin/dashboard"} className="flex items-center gap-2">
            <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-8 w-auto" />
            <span className="font-bold text-xl text-[#FF6B35] hidden sm:inline">
              {type === "agent" ? "Nthoppa Agent" : "Nthoppa Admin"}
            </span>
          </Link>

          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              {navItems.find(nav => nav.href === pathname)?.name || (type === "agent" ? "Agent Portal" : "Admin Portal")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => router.push('/dashboard/notifications')}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {notificationCount}
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
                      {getInitials(agentName || "User")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{agentName || "User"}</p>
                    <Badge variant="secondary" className="text-xs">{type === "agent" ? "Agent" : "Admin"}</Badge>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(type === "agent" ? "/dashboard/profile" : "/admin/profile")}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(type === "agent" ? "/dashboard/settings" : "/admin/settings")}>
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
          style={{ overflowY: 'auto', scrollBehavior: 'auto' }}
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

            <nav ref={sidebarRef} className="space-y-1" style={{ overflowY: 'auto', scrollBehavior: 'auto' }}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleNavClick}
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
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FF6B35] text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
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