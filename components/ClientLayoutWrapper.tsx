"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X, ChevronRight } from "lucide-react";

const roles = [
  { value: "agent",    label: "Agent",      badge: "🏃", email: "agent@nthoppa.com",    password: "agent123" },
  { value: "client",   label: "Client",     badge: "👤", email: "client@nthoppa.com",   password: "client123" },
  { value: "hr",       label: "HR Manager", badge: "🏢", email: "hr@nthoppa.com",       password: "hr123" },
  { value: "merchant", label: "Merchant",   badge: "🏪", email: "merchant@nthoppa.com", password: "merchant123" },
  { value: "admin",    label: "Admin",      badge: "👑", email: "admin@nthoppa.com",    password: "admin123" },
];

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => { setIsClient(true); }, []);

  const handleRoleSwitch = async (role: typeof roles[0]) => {
    setLoading(role.value);
    setIsExpanded(false);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: role.email, password: role.password, role: role.value }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push(data.redirectUrl);
      } else {
        alert("Demo login failed: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      alert("Demo login error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  if (pathname === "/login") return <>{children}</>;

  return (
    <>
      {children}
      {isClient && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`bg-[#1A1A1A] border border-gray-700 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${isExpanded ? "w-64" : "w-auto"}`}>
            {!isExpanded ? (
              <button
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:text-[#FF6B35] transition-colors"
              >
                <span>🔀</span>
                <span>Switch Role</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            ) : (
              <div>
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                  <span className="text-xs font-semibold text-gray-400">DEMO MODE</span>
                  <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="p-2">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      onClick={() => handleRoleSwitch(role)}
                      disabled={loading === role.value}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-left hover:bg-gray-800 transition-colors group"
                    >
                      <span className="text-lg">{role.badge}</span>
                      <span className="flex-1 text-gray-300 group-hover:text-white">
                        {loading === role.value ? "Signing in..." : role.label}
                      </span>
                      <ChevronRight className="h-3 w-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
