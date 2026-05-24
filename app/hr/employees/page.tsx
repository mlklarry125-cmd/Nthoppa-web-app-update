"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HREmployeesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const employees = [
    { id: 1, name: "Josephine Morolong", email: "josephine@nthoppa.com", phone: "+267 71 234 567", department: "Sales", status: "active", joined: "Jan 2024" },
    { id: 2, name: "Tshepo Kgosi", email: "tshepo@nthoppa.com", phone: "+267 72 345 678", department: "Operations", status: "active", joined: "Feb 2024" },
    { id: 3, name: "Mpho Sebina", email: "mpho@nthoppa.com", phone: "+267 73 456 789", department: "Finance", status: "active", joined: "Mar 2024" },
    { id: 4, name: "Boitumelo Phiri", email: "boitumelo@nthoppa.com", phone: "+267 74 567 890", department: "HR", status: "onboarding", joined: "Apr 2024" },
  ];

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
          <h1 className="text-2xl font-bold text-black">Employees</h1>
          <p className="text-gray-500 text-sm mt-1">Manage employee accounts and financial profiles</p>
        </div>
        <Button className="bg-[#FF6B35] text-white hover:bg-black" onClick={() => toast({ title: "Coming Soon", description: "Employee onboarding form" })}>
          + Add Employee
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 border-gray-200"
        />
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(emp => (
          <Card key={emp.id} className="border-gray-200">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-black">{emp.name}</h3>
                  <p className="text-xs text-gray-500">{emp.department}</p>
                </div>
                <Badge className={emp.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                  {emp.status}
                </Badge>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{emp.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{emp.phone}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => toast({ title: "View Profile", description: `Viewing ${emp.name}'s profile` })}>
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white">
                  Wellness Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}