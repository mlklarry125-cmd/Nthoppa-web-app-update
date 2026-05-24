"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, CheckCircle2, ChevronDown, ChevronUp, Send, Info, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const subtypeColorMap: Record<string, string> = {
  motor_local: 'bg-blue-900',
  motor_import: 'bg-blue-800',
  household: 'bg-purple-900',
  house_owners_standard: 'bg-green-900',
  house_owners_thatch: 'bg-yellow-900',
  personal_all_risks: 'bg-orange-900',
  group_life: 'bg-green-800',
};

const stanbicProducts = [
  { name: "Stanbic Personal Loan", description: "Quick personal loans with competitive rates" },
  { name: "Stanbic Business Banking", description: "Business accounts and working capital solutions" },
  { name: "Stanbic FlexiSave", description: "Flexible savings account with tiered interest" },
  { name: "Stanbic InsurePlus", description: "Bundled insurance and banking product" },
  { name: "Stanbic PayOnline", description: "Digital payments and merchant acquiring" },
];

export default function NthoppaSureAgentPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [referrals, setReferrals] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/partners/products')
      .then(r => r.json())
      .then(d => { setProducts(d.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmitReferral = () => {
    if (!selectedProduct) return toast({ title: "Select a product first", variant: "destructive" });
    if (!clientName.trim()) return toast({ title: "Enter client name", variant: "destructive" });
    if (!clientPhone.trim()) return toast({ title: "Enter client phone number", variant: "destructive" });

    const newReferral = {
      id: Date.now(),
      product: selectedProduct.name,
      client: clientName,
      phone: clientPhone,
      date: new Date().toLocaleDateString(),
      status: 'Pending',
    };
    setReferrals(prev => [newReferral, ...prev]);
    setClientName('');
    setClientPhone('');
    setSelectedProduct(null);
    toast({
      title: "✅ Referral Submitted",
      description: `${clientName} has been referred for ${newReferral.product}. Westlife will follow up within 24 hours.`,
    });
  };

  const handleStanbicInterest = (productName: string) => {
    toast({
      title: "✅ Stanbic Interest Recorded",
      description: `Your interest in ${productName} has been noted. A Stanbic representative will contact you within 48 hours.`,
    });
  };

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        {/* Back Navigation */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        {/* Header */}
        <div className="gradient-orange-black rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium opacity-80">Westlife Insurance Botswana (Pty) Ltd</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">NthoppaSure — Agent Referral Tool</h1>
            <p className="text-white/70 max-w-lg">
              Select an insurance product and submit a referral for your client. Westlife will contact them directly within 24 hours.
            </p>
          </div>
        </div>

        {/* Stanbic Services Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-sm">
              <Image src="/partners/stanbic.jpeg" alt="Stanbic Bank" width={40} height={20} className="object-contain w-full h-full" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Stanbic Financial Services</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Exclusive banking products available through Nthoppa</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stanbicProducts.map((product, idx) => (
              <Card key={idx} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      <Image src="/partners/stanbic.jpeg" alt="Stanbic" width={25} height={12} className="object-contain" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{product.description}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white text-xs"
                    onClick={() => handleStanbicInterest(product.name)}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Product Selection */}
          <div className="space-y-3">
            <h2 className="font-bold text-black text-lg">1. Select Insurance Product</h2>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B35]" />
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {products.map(product => {
                  const bg = subtypeColorMap[product.subtype] || 'bg-gray-800';
                  const isSelected = selectedProduct?.id === product.id;
                  return (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(isSelected ? null : product)}
                      className={`rounded-xl p-4 cursor-pointer border-2 transition-all ${
                        isSelected
                          ? 'border-[#FF6B35] bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${bg} rounded-full p-2 flex-shrink-0`}>
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-black text-sm leading-tight">{product.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{product.providerFullName}</p>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="h-5 w-5 text-[#FF6B35] flex-shrink-0" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right — Client Details + Submit */}
          <div className="space-y-4">
            <h2 className="font-bold text-black text-lg">2. Enter Client Details</h2>

            {selectedProduct && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Selected Product</p>
                <p className="font-semibold text-black">{selectedProduct.name}</p>
                <p className="text-xs text-gray-500">{selectedProduct.providerFullName}</p>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-black block mb-1">Client Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Kagiso Setlhabi"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#FF6B35] bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black block mb-1">Client Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. +267 71 234 567"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#FF6B35] bg-white"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700">
                By submitting, you confirm the client has consented to being contacted by Westlife Insurance Botswana regarding this product.
              </p>
            </div>

            <Button
              onClick={handleSubmitReferral}
              className="w-full bg-[#FF6B35] hover:bg-black text-white py-3 text-base font-semibold"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Referral
            </Button>

            {/* Referral History */}
            {referrals.length > 0 && (
              <div>
                <h3 className="font-bold text-black mb-3">Referrals This Session</h3>
                <div className="space-y-2">
                  {referrals.map(r => (
                    <div key={r.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                      <div>
                        <p className="text-sm font-medium text-black">{r.client}</p>
                        <p className="text-xs text-gray-500">{r.product} · {r.date}</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">{r.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}