"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-[#FF6B35]" />
        </div>
        <h1 className="text-2xl font-bold text-black mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          An unexpected error occurred. Please try refreshing the page or
          returning to the home screen.
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-[#FF6B35] text-white hover:bg-black flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/login")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Login
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <p className="text-xs text-red-400 mt-6 text-left bg-red-50 p-3 rounded-lg">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}