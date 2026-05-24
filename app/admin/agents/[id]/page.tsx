"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Users, TrendingUp, Edit, Power, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  territory: string;
  status: "active" | "inactive";
  joinDate: string;
  totalUsers: number;
  activeUsers: number;
  collectionsThisMonth: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  registeredDate: string;
  status: string;
}

export default function AgentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [agent, setAgent] = useState<Agent>({
    id: params.id as string,
    name: "Tshepo Molefe",
    email: "tshepo@nthoppa.com",
    phone: "+267 71 234 567",
    region: "South",
    territory: "Gaborone",
    status: "active",
    joinDate: "2026-01-15",
    totalUsers: 124,
    activeUsers: 98,
    collectionsThisMonth: 45600,
  });
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Josephine Morolong", email: "josephine@example.com", registeredDate: "2026-05-01", status: "active" },
    { id: "2", name: "Keitumetse Nkosi", email: "keitumetse@example.com", registeredDate: "2026-04-28", status: "active" },
    { id: "3", name: "Modisa Radipabe", email: "modisa@example.com", registeredDate: "2026-04-20", status: "inactive" },
  ]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Success", description: "Agent details updated" });
      setEditing(false);
      setLoading(false);
    }, 500);
  };

  const handleToggleStatus = () => {
    const newStatus = agent.status === "active" ? "inactive" : "active";
    setAgent({ ...agent, status: newStatus });
    toast({ title: "Status Updated", description: `Agent ${newStatus === "active" ? "activated" : "suspended"}` });
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Profile</h1>
          <p className="text-gray-500 mt-1">View and manage agent details</p>
        </div>
        <div className="flex gap-2">
          {!editing && (
            <Button variant="outline" onClick={() => setEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={agent.status === "active" ? "destructive" : "default"} className={agent.status === "active" ? "bg-red-600" : "bg-green-600"}>
                <Power className="h-4 w-4 mr-2" />
                {agent.status === "active" ? "Suspend" : "Activate"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{agent.status === "active" ? "Suspend Agent?" : "Activate Agent?"}</AlertDialogTitle>
                <AlertDialogDescription>
                  {agent.status === "active" 
                    ? "This agent will no longer be able to access the platform." 
                    : "This agent will regain access to the platform."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleToggleStatus}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Agent Info */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#FF6B35]" />
            Agent Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {editing ? (
            <>
              <div><Label>Full Name</Label><Input value={agent.name} onChange={(e) => setAgent({ ...agent, name: e.target.value })} className="mt-1" /></div>
              <div><Label>Email</Label><Input value={agent.email} onChange={(e) => setAgent({ ...agent, email: e.target.value })} className="mt-1" /></div>
              <div><Label>Phone</Label><Input value={agent.phone} onChange={(e) => setAgent({ ...agent, phone: e.target.value })} className="mt-1" /></div>
              <div><Label>Region</Label><Input value={agent.region} onChange={(e) => setAgent({ ...agent, region: e.target.value })} className="mt-1" /></div>
              <div><Label>Territory</Label><Input value={agent.territory} onChange={(e) => setAgent({ ...agent, territory: e.target.value })} className="mt-1" /></div>
              <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2"><User className="h-4 w-4 text-gray-400" /><span className="font-medium">Name:</span> {agent.name}</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" /><span className="font-medium">Email:</span> {agent.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400" /><span className="font-medium">Phone:</span> {agent.phone}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-400" /><span className="font-medium">Region:</span> {agent.region}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-400" /><span className="font-medium">Territory:</span> {agent.territory}</div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-400" /><span className="font-medium">Joined:</span> {new Date(agent.joinDate).toLocaleDateString()}</div>
              <div className="flex items-center gap-2"><Badge className={agent.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>Status: {agent.status}</Badge></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-white/80 text-sm">Total Users</p><p className="text-2xl font-bold">{agent.totalUsers}</p></div><Users className="h-8 w-8 text-white/80" /></div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-white/80 text-sm">Active Users</p><p className="text-2xl font-bold">{agent.activeUsers}</p></div><Users className="h-8 w-8 text-white/80" /></div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white">
          <CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-white/80 text-sm">Collections (MTD)</p><p className="text-2xl font-bold">P{agent.collectionsThisMonth.toLocaleString()}</p></div><TrendingUp className="h-8 w-8 text-white/80" /></div></CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-[#FF6B35]" />Registered Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div><p className="font-medium text-gray-900">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></div>
                <div className="text-right"><p className="text-xs text-gray-500">Registered: {new Date(user.registeredDate).toLocaleDateString()}</p><Badge className={user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>{user.status}</Badge></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}