"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, CreditCard, QrCode, TrendingUp, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MerchantPage() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const { toast } = useToast();

  const handleApply = () => {
    toast({ title: "Application Submitted", description: "Your merchant account application is under review. You'll be notified within 2 business days." });
    setStep(3);
  };

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2 flex items-center gap-2">
            <Store className="h-8 w-8 text-[#FF6B35]" />
            Merchant Account
          </h1>
          <p className="text-gray-600">Enable your users to accept digital payments and grow their business</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: <QrCode className="h-6 w-6 text-[#FF6B35]" />, title: 'QR Payments', desc: 'Accept payments via QR code instantly' },
            { icon: <CreditCard className="h-6 w-6 text-[#FF6B35]" />, title: 'Card Acceptance', desc: 'Accept Visa, Mastercard and mobile money' },
            { icon: <TrendingUp className="h-6 w-6 text-[#FF6B35]" />, title: 'Sales Analytics', desc: 'Track revenue and business trends' },
            { icon: <CheckCircle className="h-6 w-6 text-[#FF6B35]" />, title: 'Instant Settlement', desc: 'Funds in your account same day' },
          ].map(f => (
            <Card key={f.title} className="border-gray-200">
              <CardContent className="p-5">
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold text-black mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Application Form */}
        {step === 1 && (
          <Card className="border-gray-200 max-w-xl">
            <CardHeader><CardTitle className="text-black">Apply for a Merchant Account</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Business Name</Label><Input placeholder="e.g. Kabelo's General Store" value={businessName} onChange={e => setBusinessName(e.target.value)} /></div>
              <div><Label>Business Type</Label>
                <select className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm" value={businessType} onChange={e => setBusinessType(e.target.value)}>
                  <option value="">Select type...</option>
                  <option>Retail / General Trade</option>
                  <option>Food & Beverage</option>
                  <option>Services</option>
                  <option>Agriculture</option>
                  <option>Transport</option>
                </select>
              </div>
              <div><Label>Business Registration No. (if available)</Label><Input placeholder="Optional" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} /></div>
              <Button onClick={() => setStep(2)} disabled={!businessName || !businessType} className="w-full bg-[#FF6B35] text-white hover:bg-black">Continue</Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-gray-200 max-w-xl">
            <CardHeader><CardTitle className="text-black">Review & Submit</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Business Name</span><span className="font-medium">{businessName}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Business Type</span><span className="font-medium">{businessType}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Reg Number</span><span className="font-medium">{registrationNumber || 'Not provided'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Account Type</span><Badge className="bg-[#FF6B35] text-white">Nthoppa Merchant</Badge></div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={handleApply} className="flex-1 bg-[#FF6B35] text-white hover:bg-black">Submit Application</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-green-200 bg-green-50 max-w-xl">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Application Submitted!</h3>
              <p className="text-gray-600 mb-4">Your merchant account application for <strong>{businessName}</strong> is under review. We'll notify you within 2 business days.</p>
              <Badge className="bg-green-100 text-green-700">Under Review</Badge>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}