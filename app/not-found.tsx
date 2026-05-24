"use client";

import { useRouter } from "next/navigation";
import { Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-black mb-2">404</h1>
        <h2 className="text-xl font-semibold text-black mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button
          onClick={() => router.push("/login")}
          className="bg-[#FF6B35] text-white hover:bg-black flex items-center gap-2 mx-auto"
        >
          <Home className="h-4 w-4" />
          Back to Login
        </Button>
      </div>
    </div>
  );
}