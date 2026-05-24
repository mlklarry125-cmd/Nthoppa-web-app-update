"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/login");
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-10 h-10 animate-spin rounded-full border-4 border-[#FF6B35] border-t-transparent mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Redirecting to login...</p>
      </div>
    </div>
  );
}