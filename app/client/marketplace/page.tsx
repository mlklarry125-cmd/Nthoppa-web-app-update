"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  Heart,
  Users,
  Building2,
  FileText,
  Umbrella,
  Star,
  ChevronRight,
  Info,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { NthoppaSureIcon } from "@/components/ui/NthoppaIcons";

interface InsuranceProduct {
  id: string;
  name: string;
  icon: any;
  description: string;
  fromPrice: number;
  isPercentage?: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
  popular?: boolean;
}

const products: InsuranceProduct[] = [
  {
    id: "funeral",
    name: "Funeral Cover",
    icon: Heart,
    description: "Dignified funeral cover for you and your loved ones with tiered options",
    fromPrice: 45,
    rating: 4.8,
    reviewCount: 1234,
    features: ["Individual, Family, or Extended Family", "Freeze premiums at any age", "24/7 claims support", "No medical exam required"],
    popular: true,
  },
  {
    id: "personal-all-risk",
    name: "Personal All-Risk Insurance",
    icon: Shield,
    description: "Comprehensive cover for personal belongings, electronics, and valuables",
    fromPrice: 65,
    rating: 4.7,
    reviewCount: 892,
    features: ["Covers theft and damage", "Worldwide protection", "New-for-old replacement", "No excess on small claims"],
    popular: false,
  },
  {
    id: "group-life",
    name: "Group Life Cover",
    icon: Users,
    description: "Employer-sponsored group life insurance for your workforce",
    fromPrice: 35,
    rating: 4.9,
    reviewCount: 445,
    features: ["Coverage for entire staff", "Affordable group rates", "Flexible benefit levels", "Fast claims processing"],
    popular: false,
  },
  {
    id: "hospital-cash",
    name: "Hospital Cash Plan",
    icon: Building2,
    description: "Daily cash benefit during hospitalisation to cover extra expenses",
    fromPrice: 55,
    rating: 4.6,
    reviewCount: 678,
    features: ["Daily cash payout", "No receipts needed", "Paid directly to you", "Covers up to 30 days per year"],
    popular: false,
  },
  {
    id: "credit-life",
    name: "Credit Life",
    icon: FileText,
    description: "Protects your loan repayments in case of death or disability",
    fromPrice: 0.5,
    isPercentage: true,
    rating: 4.8,
    reviewCount: 1123,
    features: ["Covers outstanding loan balance", "Premiums as low as 0.5%", "No health questions", "Automatic coverage with loans"],
    popular: false,
  },
  {
    id: "income-protection",
    name: "Income Protection",
    icon: Umbrella,
    description: "Replaces your income if you're unable to work due to illness or injury",
    fromPrice: 150,
    rating: 4.9,
    reviewCount: 567,
    features: ["Up to 75% of salary covered", "Short-term and long-term options", "Return to work support", "Tax-free benefits"],
    popular: false,
  },
];

export default function MarketplacePage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleGetQuote = (product: InsuranceProduct) => {
    toast({
      title: "Quote Requested",
      description: `A representative will contact you about ${product.name} within 24 hours.`,
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-[#FF6B35] text-[#FF6B35]' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#FF6B35] hover:text-[#e55a2b] hover:bg-orange-50 -ml-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Header with NthoppaSure Branding */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="bg-[#FF6B35]/10 p-3 rounded-2xl">
            <NthoppaSureIcon className="h-10 w-10 text-[#FF6B35]" />
          </div>
          <div>
            <span className="text-3xl font-bold text-[#FF6B35]">NthoppaSure</span>
            <p className="text-sm text-gray-500 mt-1">Insurance by Nthoppa</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Insurance Marketplace</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Protect what matters most with Botswana's most trusted insurance products
        </p>
      </div>

      {/* Products Grid - In Correct Order */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full hover:shadow-xl transition-all duration-300 overflow-hidden ${product.popular ? 'ring-2 ring-[#FF6B35] shadow-lg' : 'border border-gray-100'}`}>
              {product.popular && (
                <div className="bg-[#FF6B35] text-white text-center py-1.5 text-xs font-semibold">
                  MOST POPULAR
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <product.icon className="h-6 w-6 text-[#FF6B35]" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                
                {/* Prominent Pricing */}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[#FF6B35]">
                    From P{product.fromPrice}
                  </span>
                  {!product.isPercentage && <span className="text-gray-500 text-sm ml-1">/month</span>}
                  {product.isPercentage && <span className="text-gray-500 text-sm ml-1">% of loan</span>}
                </div>
                
                <div className="space-y-2 mb-6">
                  {product.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle className="h-3 w-3 text-[#FF6B35]" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={() => handleGetQuote(product)}
                  className="w-full bg-[#FF6B35] hover:bg-[#e55a2b] text-white"
                >
                  Get Quote
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 rounded-xl p-6 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: "🔒", label: "Secure & Encrypted" },
            { icon: "⚡", label: "24/7 Claims Support" },
            { icon: "📱", label: "Manage on Mobile" },
            { icon: "🤝", label: "Trusted Partners" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-xs text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}