"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft, Wallet, PiggyBank, CreditCard,
  Building2, CheckCircle, ArrowRight, Zap, Shield,
  TrendingUp, Lock, Star, Info, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ORANGE = "#FF6B35";
const NAVY = "#0f4c8a";

// User readiness (mock — would come from API)
const userReadiness = {
  literacyScore: 78,
  creditScore: 712,
  kycTier: 2,
  savingsStreak: 62,
  monthsActive: 8,
};

const products = [
  {
    id: "instant-money",
    name: "Instant Money Wallet",
    provider: "Nthoppa",
    providerLogo: "🟠",
    tag: "Available Now",
    tagColor: "bg-green-100 text-green-700",
    icon: Wallet,
    iconBg: "bg-[#FF6B35]/10",
    iconColor: "text-[#FF6B35]",
    description: "Send and receive money instantly across Botswana. No bank account required.",
    features: [
      "Zero monthly fees",
      "Instant P2P transfers",
      "QR code payments",
      "USSD access — no smartphone needed",
    ],
    requirements: { kycTier: 1, literacyScore: 0 },
    unlocked: true,
    cta: "Activate Wallet",
    stanbicPathway: false,
  },
  {
    id: "transact-account",
    name: "Low-Cost Transactional Account",
    provider: "Stanbic Bank",
    providerLogo: "🏦",
    tag: "Stanbic Partner",
    tagColor: "bg-[#0f4c8a]/10 text-[#0f4c8a]",
    icon: CreditCard,
    iconBg: "bg-[#0f4c8a]/10",
    iconColor: "text-[#0f4c8a]",
    description: "A formal, low-cost bank account designed for first-time and previously excluded users.",
    features: [
      "BWP 5/month account fee",
      "Free first 3 transactions",
      "Linked to Nthoppa wallet",
      "Access to Stanbic branch & ATM network",
    ],
    requirements: { kycTier: 2, literacyScore: 50 },
    unlocked: userReadiness.kycTier >= 2 && userReadiness.literacyScore >= 50,
    cta: "Open Account",
    stanbicPathway: true,
  },
  {
    id: "basic-savings",
    name: "Basic Savings Product",
    provider: "Stanbic Bank",
    providerLogo: "🏦",
    tag: "Stanbic Partner",
    tagColor: "bg-[#0f4c8a]/10 text-[#0f4c8a]",
    icon: PiggyBank,
    iconBg: "bg-[#0f4c8a]/10",
    iconColor: "text-[#0f4c8a]",
    description: "Start earning interest on your savings with a Stanbic-backed account, accessible from the Nthoppa app.",
    features: [
      "5.2% interest p.a.",
      "No minimum balance",
      "Withdraw anytime",
      "Savings behaviour tracked for credit scoring",
    ],
    requirements: { kycTier: 2, literacyScore: 60 },
    unlocked: userReadiness.kycTier >= 2 && userReadiness.literacyScore >= 60,
    cta: "Start Saving",
    stanbicPathway: true,
  },
  {
    id: "flexi-save",
    name: "Stanbic FlexiSave",
    provider: "Stanbic Bank",
    providerLogo: "🏦",
    tag: "Stanbic Partner",
    tagColor: "bg-[#0f4c8a]/10 text-[#0f4c8a]",
    icon: TrendingUp,
    iconBg: "bg-[#0f4c8a]/10",
    iconColor: "text-[#0f4c8a]",
    description: "Higher-yield savings with flexible terms. Unlocks after 3 months of consistent saving behaviour.",
    features: [
      "Up to 7.8% interest p.a.",
      "1, 3, or 6-month terms",
      "Credit score boost",
      "Pathway to unsecured lending",
    ],
    requirements: { kycTier: 2, literacyScore: 70, savingsStreak: 90 },
    unlocked: userReadiness.kycTier >= 2 && userReadiness.literacyScore >= 70 && userReadiness.savingsStreak >= 90,
    cta: "Unlock FlexiSave",
    stanbicPathway: true,
  },
];

const pathway = [
  { step: 1, label: "Instant Money Wallet", done: true, active: false },
  { step: 2, label: "KYC Tier 2 Verified", done: true, active: false },
  { step: 3, label: "Transactional Account", done: false, active: true },
  { step: 4, label: "Basic Savings", done: false, active: false },
  { step: 5, label: "FlexiSave / Lending", done: false, active: false },
];

type Product = typeof products[0];

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { toast } = useToast();
  const Icon = product.icon;

  const handleApply = () => {
    toast({
      title: product.unlocked ? "Application Started" : "Requirements Not Met",
      description: product.unlocked
        ? `Your ${product.name} application has been submitted. You'll hear back within 24 hours.`
        : "Complete the listed requirements first to unlock this product.",
    });
    if (product.unlocked) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        <div className={`p-6 ${product.stanbicPathway ? "bg-gradient-to-r from-[#0f4c8a] to-[#1a5fa8]" : "bg-gradient-to-r from-[#FF6B35] to-[#d44a18]"} text-white`}>
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-white/20 text-white border-0 text-xs">{product.provider}</Badge>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black">{product.name}</h2>
              <p className="text-white/70 text-xs mt-0.5">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Features</p>
            <div className="space-y-2">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {!product.unlocked && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-amber-600" />
                <p className="text-xs font-bold text-amber-700">Requirements to unlock</p>
              </div>
              {product.requirements.kycTier && (
                <p className="text-xs text-amber-600">• KYC Tier {product.requirements.kycTier} (yours: {userReadiness.kycTier})</p>
              )}
              {(product.requirements as any).literacyScore > 0 && (
                <p className="text-xs text-amber-600">• Literacy Score {(product.requirements as any).literacyScore}% (yours: {userReadiness.literacyScore}%)</p>
              )}
              {(product.requirements as any).savingsStreak && (
                <p className="text-xs text-amber-600">• Savings Streak {(product.requirements as any).savingsStreak} days (yours: {userReadiness.savingsStreak})</p>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              className={`flex-1 rounded-xl font-bold ${product.unlocked
                ? product.stanbicPathway ? "bg-[#0f4c8a] hover:bg-[#0a3a6e] text-white" : "bg-[#FF6B35] hover:bg-[#d44a18] text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              onClick={handleApply}
              disabled={!product.unlocked}
            >
              {product.unlocked ? product.cta : <><Lock className="w-3.5 h-3.5 mr-1.5" /> Locked</>}
            </Button>
            <Button variant="outline" className="border-gray-200 rounded-xl" onClick={onClose}>Close</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function BankingPathwayPage() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const unlockedCount = products.filter((p) => p.unlocked).length;

  return (
    <div className="space-y-6 pb-10">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm group transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </div>
        Back
      </button>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <span className="text-xs font-semibold text-[#FF6B35] uppercase tracking-widest">Banking Pathway</span>
        </div>
        <h1 className="text-2xl font-black text-black">Entry-Level Banking</h1>
        <p className="text-gray-500 text-sm mt-1">Your personalised pathway into formal banking — starting where you are</p>
      </div>

      {/* Readiness summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Literacy Score", value: `${userReadiness.literacyScore}%`, icon: "📚", color: "text-blue-600", ok: userReadiness.literacyScore >= 50 },
          { label: "KYC Tier", value: `Tier ${userReadiness.kycTier}`, icon: "🛡️", color: "text-green-600", ok: userReadiness.kycTier >= 2 },
          { label: "Savings Streak", value: `${userReadiness.savingsStreak}d`, icon: "🔥", color: "text-orange-600", ok: userReadiness.savingsStreak >= 90 },
        ].map((s) => (
          <Card key={s.label} className={`border rounded-2xl shadow-sm ${s.ok ? "border-green-100 bg-green-50/30" : "border-gray-100"}`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className={`text-lg font-black ${s.ok ? "text-green-700" : s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              {s.ok && <CheckCircle className="w-3.5 h-3.5 text-green-500 mx-auto mt-1" />}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pathway progress strip */}
      <Card className="border border-gray-100 shadow-sm rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-gray-900">Your Banking Pathway</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-100 z-0" />
            <div className="absolute left-0 top-5 h-0.5 bg-[#FF6B35] z-0" style={{ width: "40%" }} />
            {pathway.map((s, i) => (
              <div key={s.step} className="flex flex-col items-center gap-2 z-10 flex-1">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  s.done ? "bg-[#FF6B35] border-[#FF6B35]" :
                  s.active ? "bg-white border-[#FF6B35] shadow-md" :
                  "bg-white border-gray-200"
                }`}>
                  {s.done ? <CheckCircle className="w-5 h-5 text-white" /> :
                   s.active ? <div className="w-3 h-3 rounded-full bg-[#FF6B35] animate-pulse" /> :
                   <Lock className="w-4 h-4 text-gray-300" />}
                </div>
                <p className={`text-[10px] font-semibold text-center leading-tight ${s.done ? "text-gray-600" : s.active ? "text-[#FF6B35]" : "text-gray-300"}`}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            {unlockedCount} of {products.length} products unlocked based on your profile
          </p>
        </CardContent>
      </Card>

      {/* Product cards */}
      <div>
        <h2 className="text-base font-black text-black mb-3">Available Products</h2>
        <div className="space-y-3">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card
                  className={`border rounded-2xl shadow-sm cursor-pointer transition-all hover:shadow-md ${
                    product.unlocked
                      ? "border-gray-100 hover:border-[#FF6B35]/30"
                      : "border-gray-100 opacity-70"
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl ${product.iconBg} flex items-center justify-center shrink-0 relative`}>
                        <Icon className={`w-6 h-6 ${product.iconColor}`} />
                        {!product.unlocked && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                            <Lock className="w-2.5 h-2.5 text-gray-500" />
                          </div>
                        )}
                        {product.unlocked && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{product.description}</p>
                          </div>
                          <Badge className={`shrink-0 text-[10px] px-2 py-0.5 border-0 ${product.tagColor}`}>
                            {product.tag}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">{product.provider}</span>
                          <span className="text-gray-200">·</span>
                          <span className={`text-xs font-semibold ${product.unlocked ? "text-green-600" : "text-gray-400"}`}>
                            {product.unlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info note */}
      <Card className="border border-[#0f4c8a]/20 rounded-2xl bg-gradient-to-r from-[#0f4c8a]/5 to-white shadow-sm">
        <CardContent className="p-5 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#0f4c8a] shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            Your Nthoppa behaviour data — savings consistency, financial literacy progress, and transaction history — is shared with Stanbic Bank to support faster account opening and better product matching. You stay in control of what's shared.
          </p>
        </CardContent>
      </Card>

      {/* Product modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
