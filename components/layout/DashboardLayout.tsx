"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ChevronDown,
  Coins,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShieldCheck,
  Store,
  TrendingUp,
  Trophy,
  UserCircle,
  UserPlus,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { clearAdminSession, clearAgentSession } from "@/lib/storage";

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: string;
};

type Notification = {
  id: string;
  read: boolean;
};

const agentNavItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard/main", icon: LayoutDashboard },
  { name: "Register User", href: "/dashboard/register", icon: UserPlus },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Motshelo", href: "/dashboard/motshelo", icon: UsersRound },
  { name: "Education", href: "/dashboard/education", icon: BookOpen },
  { name: "AI Advisor", href: "/dashboard/ai-advisor", icon: Brain, badge: "AI" },
  { name: "Rewards", href: "/dashboard/gamification", icon: Trophy },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Credit Scoring", href: "/dashboard/credit-scoring", icon: TrendingUp },
  { name: "SMME Pipeline", href: "/dashboard/smme-pipeline", icon: BriefcaseBusiness },
  { name: "Merchant", href: "/dashboard/merchant", icon: Store },
  { name: "NthoppaSure", href: "/dashboard/nthoppa-sure", icon: ShieldCheck },
  { name: "Territory", href: "/dashboard/territory", icon: MapPin },
  { name: "Communications", href: "/dashboard/communications", icon: MessageSquare },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "agent" | "admin";
}

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [coinBalance] = useState(2500);
  const sidebarRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const navItems = agentNavItems;

  useEffect(() => {
    let active = true;

    const initialise = async () => {
      try {
        const response = await fetch("/api/auth/check", { credentials: "include" });
        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();
        if (!active) return;
        setDisplayName(data.name || (type === "agent" ? "Agent" : "Admin"));

        if (type === "agent") {
          const notificationsResponse = await fetch("/api/notifications", { credentials: "include" });
          if (notificationsResponse.ok && active) {
            const notifications = (await notificationsResponse.json()) as Notification[];
            setNotificationCount(Array.isArray(notifications) ? notifications.filter((item) => !item.read).length : 0);
          }
        }
      } catch {
        if (active) router.push("/login");
      }
    };

    initialise();
    return () => {
      active = false;
    };
  }, [router, type]);

  useEffect(() => {
    setMobileOpen(false);
    const savedPosition = sessionStorage.getItem("sidebarScrollPosition");
    if (sidebarRef.current && savedPosition) {
      sidebarRef.current.scrollTop = Number(savedPosition);
      sessionStorage.removeItem("sidebarScrollPosition");
    }
  }, [pathname]);

  const handleNavClick = () => {
    if (sidebarRef.current) {
      sessionStorage.setItem("sidebarScrollPosition", String(sidebarRef.current.scrollTop));
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {
      // Local session cleanup still completes when the network request fails.
    }

    if (type === "agent") clearAgentSession();
    else clearAdminSession();

    localStorage.removeItem("nthoppa_role");
    localStorage.removeItem("nthoppa_token");
    toast({ title: "Logged out", description: "You have been successfully logged out." });
    router.push(type === "agent" ? "/login" : "/admin");
  };

  const initials = (displayName || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const currentPage = navItems.find((item) => item.href === pathname)?.name || (type === "agent" ? "Agent Portal" : "Admin Portal");

  const SidebarNavigation = ({ compact = false }: { compact?: boolean }) => (
    <nav className="space-y-1.5" aria-label="Dashboard navigation">
      {navItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleNavClick}
            title={compact ? item.name : undefined}
            className={cn(
              "group flex min-h-10 items-center rounded-xl text-sm font-medium transition-colors",
              compact ? "justify-center px-2" : "gap-3 px-3",
              active
                ? "bg-[#FF6B35] text-white"
                : "text-white/55 hover:bg-white/[0.06] hover:text-white",
            )}
          >
            <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.8} />
            {!compact && <span className="flex-1 truncate">{item.name}</span>}
            {!compact && item.badge && (
              <span className="rounded-full border border-white/10 bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="flex h-full items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" strokeWidth={1.8} />
          </button>

          <Link href={type === "agent" ? "/dashboard/main" : "/admin/dashboard"} className="flex items-center gap-2.5">
            <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-8 w-8 rounded-lg object-cover" />
            <span className="hidden text-base font-bold text-gray-950 sm:inline">Nthoppa</span>
          </Link>

          <div className="min-w-0 flex-1 text-center">
            <h1 className="truncate text-sm font-semibold text-gray-900 sm:text-base">{currentPage}</h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard/notifications")}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {notificationCount > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#FF6B35] ring-2 ring-white" aria-label={`${notificationCount} unread notifications`} />
              )}
            </button>

            <div className="hidden items-center gap-1.5 rounded-lg border border-orange-100 bg-orange-50 px-2.5 py-1.5 md:flex">
              <Coins className="h-4 w-4 text-[#FF6B35]" strokeWidth={1.8} />
              <span className="text-xs font-semibold text-[#c94e1e]">{coinBalance.toLocaleString()} Coins</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 gap-2 rounded-lg px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#FF6B35] text-xs font-bold text-white">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <p className="max-w-32 truncate text-sm font-medium text-gray-900">{displayName || "User"}</p>
                    <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-medium">
                      {type === "agent" ? "Agent" : "Admin"}
                    </Badge>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-gray-400 md:block" strokeWidth={1.8} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(type === "agent" ? "/dashboard/profile" : "/admin/profile")}>
                  <UserCircle className="mr-2 h-4 w-4" strokeWidth={1.8} />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(type === "agent" ? "/dashboard/settings" : "/admin/settings")}>
                  <Settings className="mr-2 h-4 w-4" strokeWidth={1.8} />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" strokeWidth={1.8} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <aside
        ref={sidebarRef}
        className={cn(
          "fixed bottom-0 left-0 top-16 z-40 hidden overflow-y-auto border-r border-white/5 bg-[#0a0a0a] text-white transition-[width] duration-200 lg:block",
          collapsed ? "w-[72px]" : "w-64",
        )}
      >
        <div className="p-3">
          <div className={cn("mb-4 flex h-10 items-center", collapsed ? "justify-center" : "justify-between px-1")}>
            {!collapsed && <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">Workspace</span>}
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/45 transition hover:bg-white/[0.06] hover:text-white"
              aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            >
              {collapsed ? <PanelLeftOpen className="h-4 w-4" strokeWidth={1.8} /> : <PanelLeftClose className="h-4 w-4" strokeWidth={1.8} />}
            </button>
          </div>
          <SidebarNavigation compact={collapsed} />
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/45 lg:hidden"
              aria-label="Close navigation overlay"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed bottom-0 left-0 top-0 z-[60] w-72 overflow-y-auto bg-[#0a0a0a] p-4 text-white lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-8 w-8 rounded-lg object-cover" />
                  <span className="font-bold">Nthoppa</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/55 transition hover:bg-white/[0.06] hover:text-white"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" strokeWidth={1.8} />
                </button>
              </div>
              <SidebarNavigation />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className={cn("min-h-screen pt-16 transition-[margin] duration-200", collapsed ? "lg:ml-[72px]" : "lg:ml-64")}>
        <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          {children}

          <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-400 sm:flex-row">
            <span className="font-medium">© 2026 Nthoppa Financial Technologies. All rights reserved.</span>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.8} />
                AES-256 encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <LockKeyhole className="h-3.5 w-3.5" strokeWidth={1.8} />
                Secure access
              </span>
              <span className="flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5" strokeWidth={1.8} />
                Live monitoring
              </span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
