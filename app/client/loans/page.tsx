"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Building2, ShoppingBag, CheckCircle, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClientLoansPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [applied, setApplied] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/partners/products').then(r => r.json()).then(d => setProducts(d.products?.filter((p: any) => p.type === 'loan') || []));
  }, []);

  const creditScore = 612;

  const handleApply = (productId: string) => {
    setApplied(productId);
    toast({ title: "Application Submitted", description: "Your loan application has been submitted for review." });
  };

  return (
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

      <div>
        <h1 className="text-2xl font-bold text-black flex items-center gap-2"><CreditCard className="h-6 w-6 text-[#FF6B35]" />Loan Products</h1>
        <p className="text-gray-500 text-sm mt-1">Your credit score: <span className="font-semibold text-[#FF6B35]">{creditScore}</span> · Medium eligibility</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p: any) => (
          <Card key={p.id} className="border-gray-200">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${p.provider === 'CreditYame' ? 'bg-green-100' : 'bg-orange-100'}`}>
                  {p.provider === 'CreditYame' ? <Building2 className="h-5 w-5 text-green-700" /> : <ShoppingBag className="h-5 w-5 text-orange-700" />}
                </div>
                <Badge className={p.provider === 'CreditYame' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>{p.provider === 'CreditYame' ? 'Formal' : 'Informal / SME'}</Badge>
              </div>
              <h3 className="font-semibold text-black mb-1">{p.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{p.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2 bg-gray-50 rounded"><p className="text-gray-400">Amount</p><p className="font-medium">BWP {p.minAmount?.toLocaleString()} – {p.maxAmount?.toLocaleString()}</p></div>
                <div className="p-2 bg-gray-50 rounded"><p className="text-gray-400">Interest</p><p className="font-medium">{p.interestRate}% p.a.</p></div>
              </div>
              {applied === p.id ? (
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium"><CheckCircle className="h-4 w-4" />Application Submitted</div>
              ) : (
                <Button onClick={() => handleApply(p.id)} className="w-full bg-[#FF6B35] text-white hover:bg-black text-sm">Apply Now</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}