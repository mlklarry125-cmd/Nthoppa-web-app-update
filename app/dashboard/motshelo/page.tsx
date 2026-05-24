"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Search,
  Eye,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Download,
  Flag,
  Clock,
  Wallet,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  Plus,
  UserPlus,
  UserMinus,
  Pause,
  Play,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface MotsheloGroup {
  id: number;
  name: string;
  description: string;
  contributionAmount: number;
  frequency: string;
  maxMembers: number;
  memberCount: number;
  payoutOrderMethod: string;
  inviteCode: string;
  potTotal: number;
  currentCycle: number;
  nextPayoutRecipient: string;
  nextPayoutDate: string;
  status: string;
  createdAt: string;
  members?: any[];
  contributions?: any[];
  payouts?: any[];
  isMember?: boolean;
}

interface DashboardStats {
  totalGroups: number;
  totalMembers: number;
  totalPot: number;
  payingOutThisMonth: number;
}

export default function AgentMotsheloPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [groups, setGroups] = useState<MotsheloGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<MotsheloGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState<MotsheloGroup | null>(null);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    contributionAmount: 100,
    frequency: "monthly",
    maxMembers: 10,
    payoutOrderMethod: "rotation",
  });
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalGroups: 0,
    totalMembers: 0,
    totalPot: 0,
    payingOutThisMonth: 0,
  });

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/motshelo");
      const data = await response.json();
      
      if (data.success) {
        const allGroups = [...(data.userGroups || []), ...(data.availableGroups || [])];
        setGroups(allGroups);
        setFilteredGroups(allGroups);
        
        // Calculate stats
        const totalMembers = allGroups.reduce((sum, g) => sum + ((g.memberCount ?? g.members?.length) || 0), 0);
        const totalPot = allGroups.reduce((sum, g) => sum + (g.potTotal || 0), 0);
        const today = new Date();
        const payingOutThisMonth = allGroups.filter(g => {
          const payoutDate = new Date(g.nextPayoutDate);
          return payoutDate.getMonth() === today.getMonth() && payoutDate.getFullYear() === today.getFullYear();
        }).length;
        
        setStats({
          totalGroups: allGroups.length,
          totalMembers,
          totalPot,
          payingOutThisMonth,
        });
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error);
      toast({ title: "Error", description: "Failed to load Motshelo groups", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setAvailableUsers(Array.isArray(data) ? data : data.users || []);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const fetchGroupDetails = async (groupId: number) => {
    try {
      const response = await fetch(`/api/motshelo/${groupId}`);
      const data = await response.json();
      if (data.success) {
        setSelectedGroup(data.group);
        setShowGroupDialog(true);
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to load group details", variant: "destructive" });
    }
  };

  const createGroup = async () => {
    if (!newGroup.name || newGroup.contributionAmount <= 0) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch('/api/motshelo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup)
      });
      
      if (response.ok) {
        toast({ title: "Success", description: "Motshelo group created successfully" });
        setShowCreateDialog(false);
        setNewGroup({ name: "", description: "", contributionAmount: 100, frequency: "monthly", maxMembers: 10, payoutOrderMethod: "rotation" });
        fetchGroups();
      } else {
        const error = await response.json();
        toast({ title: "Error", description: error.error || "Failed to create group", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create group", variant: "destructive" });
    }
  };

  const addMember = async (userId: string) => {
    if (!selectedGroup) return;
    
    try {
      const response = await fetch(`/api/motshelo/${selectedGroup.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteCode: selectedGroup.inviteCode })
      });
      
      if (response.ok) {
        toast({ title: "Success", description: "Member added successfully" });
        fetchGroupDetails(selectedGroup.id);
        fetchGroups();
      } else {
        const error = await response.json();
        toast({ title: "Error", description: error.error || "Failed to add member", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to add member", variant: "destructive" });
    }
  };

  const removeMember = async (userId: string) => {
    if (!selectedGroup) return;
    
    try {
      const response = await fetch(`/api/motshelo/${selectedGroup.id}/members?userId=${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast({ title: "Success", description: "Member removed successfully" });
        fetchGroupDetails(selectedGroup.id);
        fetchGroups();
      } else {
        const error = await response.json();
        toast({ title: "Error", description: error.error || "Failed to remove member", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to remove member", variant: "destructive" });
    }
  };

  const handleContribute = async (groupId: number, amount: number, agentAssisted: boolean = false) => {
    try {
      const response = await fetch(`/api/motshelo/${groupId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, agentAssisted }),
      });
      const data = await response.json();
      if (data.success) {
        toast({ title: "Success", description: data.message });
        fetchGroups();
        if (selectedGroup) fetchGroupDetails(groupId);
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to record contribution", variant: "destructive" });
    }
  };

  const updateGroupStatus = async (groupId: number, status: string) => {
    try {
      const response = await fetch(`/api/motshelo/${groupId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        toast({ title: "Success", description: `Group ${status} successfully` });
        fetchGroups();
        if (selectedGroup) fetchGroupDetails(groupId);
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const handleFlagGroup = (groupId: number, groupName: string) => {
    toast({
      title: "Group Flagged",
      description: `${groupName} has been flagged for review. An admin will investigate.`,
    });
  };

  const handleExportCSV = (group: MotsheloGroup) => {
    const headers = ["Member", "Contribution Amount", "Cycle", "Date", "Status"];
    const rows = (group.contributions || []).map((c: any) => [
      c.userName,
      c.amount,
      c.cycleNumber,
      new Date(c.date).toLocaleDateString(),
      "Completed",
    ]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${group.name}_contributions.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export Started", description: "CSV file is being downloaded." });
  };

  useEffect(() => {
    let filtered = groups;
    if (searchTerm) {
      filtered = filtered.filter(g => 
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter(g => g.status === statusFilter);
    }
    setFilteredGroups(filtered);
  }, [searchTerm, statusFilter, groups]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-700">Archived</Badge>;
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-700">Paused</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "weekly": return "Weekly";
      case "fortnightly": return "Fortnightly";
      case "monthly": return "Monthly";
      default: return frequency;
    }
  };

  return (
    <DashboardLayout type="agent">
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
            <h1 className="text-2xl font-bold text-gray-900">Motshelo Management</h1>
            <p className="text-gray-500 mt-1">Manage community savings groups across the platform</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} className="bg-[#FF6B35] hover:bg-[#e55a2b]">
            <Plus className="h-4 w-4 mr-2" />
            Create New Group
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Groups</p>
                  <p className="text-2xl font-bold">{stats.totalGroups}</p>
                </div>
                <Users className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Members</p>
                  <p className="text-2xl font-bold">{stats.totalMembers}</p>
                </div>
                <Users className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Pot Value</p>
                  <p className="text-2xl font-bold">P{stats.totalPot.toLocaleString()}</p>
                </div>
                <Wallet className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Paying Out This Month</p>
                  <p className="text-2xl font-bold">{stats.payingOutThisMonth}</p>
                </div>
                <Calendar className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search groups by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="archived">Archived</option>
          </select>
          <Button variant="outline" onClick={fetchGroups}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => fetchGroupDetails(group.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[#FF6B35]/10 rounded-lg">
                  <Users className="h-5 w-5 text-[#FF6B35]" />
                </div>
                {getStatusBadge(group.status)}
              </div>
              
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{group.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{group.description || "No description"}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Contribution:</span>
                  <span className="font-medium text-[#FF6B35]">P{group.contributionAmount}/{getFrequencyLabel(group.frequency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pot Balance:</span>
                  <span className="font-medium text-gray-900">P{group.potTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Members:</span>
                  <span className="font-medium text-gray-900">{group.memberCount ?? group.members?.length ?? 0}/{group.maxMembers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Payout:</span>
                  <span className="text-sm text-gray-600">{new Date(group.nextPayoutDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => { e.stopPropagation(); fetchGroupDetails(group.id); }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {group.status === 'active' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                    onClick={(e) => { e.stopPropagation(); updateGroupStatus(group.id, 'paused'); }}
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                )}
                {group.status === 'paused' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-600 hover:bg-green-50"
                    onClick={(e) => { e.stopPropagation(); updateGroupStatus(group.id, 'active'); }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={(e) => { e.stopPropagation(); handleFlagGroup(group.id, group.name); }}
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGroups.length === 0 && !loading && (
          <Card className="border-gray-200">
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No Motshelo groups found</p>
              <Button onClick={() => setShowCreateDialog(true)} variant="link" className="text-[#FF6B35] mt-2">
                Create your first group
              </Button>
            </CardContent>
          </Card>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B35] mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading groups...</p>
          </div>
        )}
      </div>

      {/* Create Group Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Motshelo Group</DialogTitle>
            <DialogDescription>
              Start a community savings group for your territory
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Group Name</Label>
              <Input
                placeholder="e.g., Women's Empowerment Group"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Describe the purpose of this motshelo..."
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Contribution Amount (P)</Label>
              <Input
                type="number"
                placeholder="100"
                value={newGroup.contributionAmount}
                onChange={(e) => setNewGroup({ ...newGroup, contributionAmount: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label>Frequency</Label>
              <select
                className="w-full border border-gray-200 rounded-lg p-2"
                value={newGroup.frequency}
                onChange={(e) => setNewGroup({ ...newGroup, frequency: e.target.value })}
              >
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <Label>Maximum Members</Label>
              <Input
                type="number"
                placeholder="10"
                value={newGroup.maxMembers}
                onChange={(e) => setNewGroup({ ...newGroup, maxMembers: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label>Payout Order Method</Label>
              <select
                className="w-full border border-gray-200 rounded-lg p-2"
                value={newGroup.payoutOrderMethod}
                onChange={(e) => setNewGroup({ ...newGroup, payoutOrderMethod: e.target.value })}
              >
                <option value="rotation">Rotation (Fixed Order)</option>
                <option value="random">Random (Fair Lottery)</option>
                <option value="bidding">Bidding (Member Voting)</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={createGroup} className="bg-[#FF6B35] hover:bg-[#e55a2b]">
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Group Details Dialog - keep existing but ensure members?.length ?? 0 uses totalMembers */}
      <Dialog open={showGroupDialog} onOpenChange={setShowGroupDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedGroup?.name}</span>
              {selectedGroup && (
                <Button size="sm" variant="outline" onClick={() => handleExportCSV(selectedGroup)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedGroup && (
            <div className="space-y-6">
              {/* Group Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Contribution</p>
                  <p className="text-xl font-bold text-[#FF6B35]">P{selectedGroup.contributionAmount}</p>
                  <p className="text-xs text-gray-500">{getFrequencyLabel(selectedGroup.frequency)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Members</p>
                  <p className="text-xl font-bold">{selectedGroup.memberCount ?? selectedGroup.members?.length ?? 0}/{selectedGroup.maxMembers}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Pot Total</p>
                  <p className="text-xl font-bold text-[#FF6B35]">P{selectedGroup.potTotal.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Cycle</p>
                  <p className="text-xl font-bold">{selectedGroup.currentCycle}</p>
                </div>
              </div>

              {/* Invite Code */}
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Invite Code</p>
                <p className="text-lg font-mono font-bold text-[#FF6B35]">{selectedGroup.inviteCode}</p>
              </div>

              <Tabs defaultValue="members" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="contributions">Contributions</TabsTrigger>
                  <TabsTrigger value="payouts">Payouts</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                  <TabsTrigger value="add">Add Member</TabsTrigger>
                </TabsList>

                <TabsContent value="members" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    {selectedGroup.members?.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-500">Joined: {new Date(member.joinedDate).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">Role: {member.role || "member"}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {member.hasPaidCurrentCycle ? (
                            <Badge className="bg-green-100 text-green-700">Paid Current Cycle</Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
                          )}
                          <span className="text-sm text-gray-600">Total: P{member.totalContributed.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="contributions" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    {selectedGroup.contributions?.slice(0, 20).map((contribution: any) => (
                      <div key={contribution.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{contribution.userName}</p>
                          <p className="text-xs text-gray-500">Cycle {contribution.cycleNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#FF6B35]">P{contribution.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{new Date(contribution.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="payouts" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    {selectedGroup.payouts?.map((payout: any) => (
                      <div key={payout.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{payout.userName}</p>
                          <p className="text-xs text-gray-500">Cycle {payout.cycleNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">P{payout.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{new Date(payout.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4 mt-4">
                  <Card className="border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-sm">Record Contribution (Agent Assisted)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Record a contribution on behalf of a member who is unable to pay digitally.
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Note: The member will NOT receive Nthoppa Coins for this contribution.
                      </p>
                      <Button
                        className="w-full bg-[#FF6B35]"
                        onClick={() => handleContribute(selectedGroup.id, selectedGroup.contributionAmount, true)}
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        Record Contribution (P{selectedGroup.contributionAmount})
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add" className="space-y-4 mt-4">
                  <Card className="border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-sm">Add Member to Group</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Share this invite code with potential members: <strong className="text-[#FF6B35]">{selectedGroup.inviteCode}</strong>
                        </p>
                        <div className="border-t pt-4">
                          <Label>Or add existing user</Label>
                          <div className="flex gap-2 mt-1">
                            <Select onValueChange={addMember}>
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select a user" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableUsers.map((user) => (
                                  <SelectItem key={user.id} value={user.id}>
                                    {user.fullName || user.firstName} {user.lastName || ""} - {user.phone || user.email}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}