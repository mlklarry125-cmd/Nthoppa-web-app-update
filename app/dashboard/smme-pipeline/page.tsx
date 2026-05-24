"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  TrendingUp, Users, Building2, Store, Briefcase, ArrowRight,
  CheckCircle, Target, Calendar, Activity, ChevronLeft
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const pipelineData = [
  { stage: "Informal Traders", count: 12480, pct: 100, color: "bg-[#FF6B35]" },
  { stage: "Qualified Skills", count: 5240, pct: 42, color: "bg-orange-400" },
  { stage: "Business Banking Ready", count: 863, pct: 7, color: "bg-amber-400" },
  { stage: "Enterprise", count: 218, pct: 2, color: "bg-yellow-300" },
];

const recentTraders = [
  { id: 1, name: "Modisa Spaza", type: "Retail", revenue: "P 8,200", status: "Qualified", initials: "MS" },
  { id: 2, name: "Kgabo Hardware", type: "Construction", revenue: "P 12,400", status: "Ready", initials: "KH" },
  { id: 3, name: "Lebo Fashion", type: "Clothing", revenue: "P 4,100", status: "Registered", initials: "LF" },
  { id: 4, name: "Thabo Mechanics", type: "Auto Services", revenue: "P 6,800", status: "Qualified", initials: "TM" },
  { id: 5, name: "Botsalano Farm", type: "Agriculture", revenue: "P 15,200", status: "Ready", initials: "BF" },
];

export default function SMMEPipelinePage() {
  const router = useRouter();
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    if (status === "Ready") return <Badge className="bg-green-100 text-green-700">Ready for Banking</Badge>;
    if (status === "Qualified") return <Badge className="bg-blue-100 text-blue-700">Qualified</Badge>;
    return <Badge className="bg-gray-100 text-gray-600">Registered</Badge>;
  };

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
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
          <h1 className="text-2xl font-black text-black">SMME Pipeline</h1>
          <p className="text-gray-500 mt-1">Track informal traders transitioning to formal business banking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Total Traders", value: "12,480", change: "+234", icon: Users, color: "bg-orange-500" },
            { title: "Qualified", value: "5,240", change: "+112", icon: CheckCircle, color: "bg-blue-500" },
            { title: "Ready for Banking", value: "863", change: "+45", icon: Target, color: "bg-green-500" },
            { title: "Enterprise", value: "218", change: "+12", icon: Building2, color: "bg-purple-500" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-5 w-5 ${stat.color.replace("bg-", "text-")}`} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  +{stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#FF6B35]" />
              iPachi Integration — SMME Pipeline
            </CardTitle>
            <CardDescription>Informal sector traders progressing toward formal banking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pipelineData.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                      <span className="text-xs text-gray-400">{item.pct}%</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Pipeline Progress</CardTitle>
              <CardDescription>Movement through the qualification stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                      <Store className="h-5 w-5 text-[#FF6B35]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Identification</p>
                      <p className="text-xs text-gray-500">Informal traders onboarded</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-black">12,480</p>
                    <p className="text-xs text-green-600">+18% this month</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Qualification</p>
                      <p className="text-xs text-gray-500">Skills and readiness assessed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-black">5,240</p>
                    <p className="text-xs text-green-600">+12% this month</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Graduation</p>
                      <p className="text-xs text-gray-500">Ready for business banking</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-black">863</p>
                    <p className="text-xs text-green-600">+45 this month</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Recent Qualified Traders</CardTitle>
              <CardDescription>Latest traders ready for business banking</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentTraders.map((trader, idx) => (
                  <div key={trader.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#c44216] text-white">
                          {trader.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-black text-sm">{trader.name}</p>
                        <p className="text-xs text-gray-500">{trader.type} • Revenue: {trader.revenue}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(trader.status)}
                      <Button variant="ghost" size="sm" className="text-[#FF6B35]">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200 bg-gradient-to-r from-orange-50 to-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-black text-lg">iPachi Partnership</h3>
                <p className="text-gray-500 text-sm max-w-md">
                  iPachi Capital provides alternative credit scoring and working capital access for informal traders transitioning to formal business banking.
                </p>
              </div>
              <Button className="bg-[#FF6B35] hover:bg-black text-white px-6">
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}