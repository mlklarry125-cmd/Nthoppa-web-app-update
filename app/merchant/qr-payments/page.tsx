"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Copy, Download, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MerchantQRPaymentsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({ title: "Error", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }
    setGenerated(true);
    toast({ title: "QR Code Generated", description: `QR code for BWP ${amount} created successfully` });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://nthoppa.com/pay?amount=${amount}&ref=${reference}`);
    toast({ title: "Copied!", description: "Payment link copied to clipboard" });
  };

  const qrCodes = [
    { name: "Store Counter", amount: "Variable", scans: 245, revenue: 45200, status: "active" },
    { name: "Delivery Service", amount: "Variable", scans: 89, revenue: 18200, status: "active" },
    { name: "Special Offer", amount: "BWP 500", scans: 34, revenue: 17000, status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#FF6B35] hover:text-[#e55a2b] font-medium mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
        <h1 className="text-2xl font-bold text-black flex items-center gap-2"><QrCode className="h-6 w-6 text-[#FF6B35]" />QR Payments</h1>
        <p className="text-gray-500 text-sm mt-1">Generate QR codes for instant customer payments</p>
      </div>

      {/* Generate QR Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-black mb-4">Generate Payment QR</h3>
            <div className="space-y-4">
              <div>
                <Label>Amount (BWP)</Label>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Reference (Optional)</Label>
                <Input 
                  placeholder="Order #, Customer name, etc." 
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button 
                className="w-full bg-[#FF6B35] text-white hover:bg-black"
                onClick={handleGenerate}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Display */}
        {generated && (
          <Card className="border-[#FF6B35] border-2">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-48 h-48 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
                  <QrCode className="h-16 w-16 text-[#FF6B35]" />
                  <p className="text-xs text-gray-500 mt-2">Payment QR Code</p>
                  <p className="text-sm font-bold text-black mt-1">BWP {amount}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4">Customer scans to pay instantly via Nthoppa Wallet</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Active QR Codes */}
      <Card className="border-gray-200">
        <CardContent className="p-5">
          <h3 className="font-semibold text-black mb-4">Your Active QR Codes</h3>
          <div className="space-y-3">
            {qrCodes.map(qr => (
              <div key={qr.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-black">{qr.name}</p>
                    <p className="text-xs text-gray-500">{qr.amount} · {qr.scans} scans</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-black">BWP {qr.revenue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-green-600 text-xs">
                    <CheckCircle className="h-3 w-3" />
                    <span>{qr.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}