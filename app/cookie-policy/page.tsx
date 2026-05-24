"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-8 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-500">
            Coming Soon
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Document Under Development
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            This document is being finalised. Please contact our support team for any urgent inquiries regarding our cookie usage and tracking policies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@nthoppa.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-xl hover:bg-[#e55a2b] transition-colors"
            >
              Contact Support
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>

        {/* Cookie Categories Preview */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cookie Categories</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800">Essential Cookies</h4>
              <p className="text-sm text-gray-500 mt-1">Required for core functionality like authentication and security. Cannot be disabled.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Functional Cookies</h4>
              <p className="text-sm text-gray-500 mt-1">Enable enhanced features like remembering preferences and settings.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Analytics Cookies</h4>
              <p className="text-sm text-gray-500 mt-1">Help us understand how users interact with our platform to improve performance.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Nthoppa (Pty) Ltd | info@nthoppa.com | +267 75 736 600
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2026 Nthoppa Financial Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}