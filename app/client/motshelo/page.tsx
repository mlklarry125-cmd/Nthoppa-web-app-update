"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Plus,
  Wallet,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  MessageCircle,
  History,
  TrendingUp,
  Copy,
  ChevronRight,
  UserPlus,
  Gift,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MotsheloIcon, CoinsIcon } from "@/components/ui/NthoppaIcons";

interface MotsheloMember {
  id: string;
  name: string;
  avatar: string;
  joinedDate: string;
  contributions: Contribution[];
}

interface Contribution {
  cycleId: number;
  amount: number;
  date: string;
  status: "paid" | "pending" | "late";
}

interface PayoutCycle {
  cycleNumber: number;
  nextMemberId: string;
  nextMemberName: string;
  potAmount: number;
  payoutDate: string;
  startDate: string;
  endDate: string;
}

interface MotsheloGroup {
  id: number;
  name: string;
  description: string;
  contributionAmount: number;
  frequency: "weekly" | "biweekly" | "monthly";
  maxMembers: number;
  currentMembers: number;
  inviteCode: string;
  payoutOrder: "random" | "fixed" | "voting";
  status: "active" | "pending" | "completed";
  currentCycle: PayoutCycle;
  members: MotsheloMember[];
  totalPot: number;
  createdBy: string;
  createdAt: string;
}

interface Activity {
  id: number;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

// Mock data
const mockGroups: MotsheloGroup[] = [
  {
    id: 1,
    name: "Gaborone Women's Group",
    description: "Supporting women entrepreneurs in Gaborone",
    contributionAmount: 200,
    frequency: "monthly",
    maxMembers: 12,
    currentMembers: 8,
    inviteCode: "WOMEN-GAB-2024",
    payoutOrder: "random",
    status: "active",
    currentCycle: {
      cycleNumber: 3,
      nextMemberId: "user_456",
      nextMemberName: "Keitumetse Nkosi",
      potAmount: 1600,
      payoutDate: "2026-06-15",
      startDate: "2026-05-16",
      endDate: "2026-06-15",
    },
    members: [
      { id: "user_123", name: "Tshepo Molefe", avatar: "TM", joinedDate: "2026-01-15", contributions: [] },
      { id: "user_456", name: "Keitumetse Nkosi", avatar: "KN", joinedDate: "2026-01-15", contributions: [] },
    ],
    totalPot: 1600,
    createdBy: "user_123",
    createdAt: "2026-01-15",
  },
];

const mockActivities: Activity[] = [
  { id: 1, userId: "user_123", userName: "Tshepo Molefe", action: "contributed", details: "Paid P200 contribution for Cycle 3", timestamp: "2026-05-20T10:30:00" },
  { id: 2, userId: "user_456", userName: "Keitumetse Nkosi", action: "joined", details: "Joined the group", timestamp: "2026-05-18T14:20:00" },
  { id: 3, userId: "user_123", userName: "Tshepo Molefe", action: "created", details: "Created the group", timestamp: "2026-05-15T09:00:00" },
];

export default function MotsheloPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [groups, setGroups] = useState<MotsheloGroup[]>(mockGroups);
  const [selectedGroup, setSelectedGroup] = useState<MotsheloGroup | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    contributionAmount: 200,
    frequency: "monthly" as "weekly" | "biweekly" | "monthly",
    maxMembers: 10,
    payoutOrder: "random" as "random" | "fixed" | "voting",
  });
  const [chatMessage, setChatMessage] = useState("");
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  const handleCreateGroup = () => {
    if (!newGroup.name || newGroup.contributionAmount <= 0) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const inviteCodeGen = `${newGroup.name.toUpperCase().slice(0, 4)}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const newGroupObj: MotsheloGroup = {
      id: groups.length + 1,
      name: newGroup.name,
      description: newGroup.description,
      contributionAmount: newGroup.contributionAmount,
      frequency: newGroup.frequency,
      maxMembers: newGroup.maxMembers,
      currentMembers: 1,
      inviteCode: inviteCodeGen,
      payoutOrder: newGroup.payoutOrder,
      status: "active",
      currentCycle: {
        cycleNumber: 1,
        nextMemberId: "user_123",
        nextMemberName: "Tshepo Molefe",
        potAmount: 0,
        payoutDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
      members: [{ id: "user_123", name: "Tshepo Molefe", avatar: "TM", joinedDate: new Date().toISOString().split("T")[0], contributions: [] }],
      totalPot: 0,
      createdBy: "user_123",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setGroups([...groups, newGroupObj]);
    setShowCreateDialog(false);
    setNewGroup({ name: "", description: "", contributionAmount: 200, frequency: "monthly", maxMembers: 10, payoutOrder: "random" });
    toast({ title: "Success!", description: `Group created! Invite code: ${inviteCodeGen}` });
  };

  const handleJoinGroup = () => {
    const foundGroup = groups.find(g => g.inviteCode === inviteCode);
    if (foundGroup) {
      if ((foundGroup.members?.length ?? foundGroup.currentMembers) >= foundGroup.maxMembers) {
        toast({ title: "Group Full", description: "This group has reached its maximum members.", variant: "destructive" });
        return;
      }
      
      const updatedGroups = groups.map(g => {
        if (g.id === foundGroup.id) {
          return {
            ...g,
            currentMembers: g.members.length + 1,
            members: [...g.members, { id: "user_new", name: "New Member", avatar: "NM", joinedDate: new Date().toISOString().split("T")[0], contributions: [] }],
          };
        }
        return g;
      });
      
      setGroups(updatedGroups);
      setShowJoinDialog(false);
      setInviteCode("");
      toast({ title: "Joined Successfully!", description: `You've joined ${foundGroup.name}` });
    } else {
      toast({ title: "Invalid Code", description: "No group found with that invite code.", variant: "destructive" });
    }
  };

  const handleContribute = (groupId: number, amount: number) => {
    const updatedGroups = groups.map(g => {
      if (g.id === groupId) {
        const newPot = g.totalPot + amount;
        return { ...g, totalPot: newPot, currentCycle: { ...g.currentCycle, potAmount: newPot } };
      }
      return g;
    });
    setGroups(updatedGroups);
    
    setActivities([{
      id: activities.length + 1,
      userId: "user_123",
      userName: "Tshepo Molefe",
      action: "contributed",
      details: `Paid P${amount} contribution`,
      timestamp: new Date().toISOString(),
    }, ...activities]);
    
    toast({ title: "Contribution Successful!", description: `You paid P${amount}. You earned 25 Nthoppa Coins!` });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatTimeAgo = (timestamp: string) => {
    const diff = new Date().getTime() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours} hours ago`;
    return formatDate(timestamp);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => selectedGroup ? setSelectedGroup(null) : router.back()}
        className="flex items-center gap-2 text-[#FF6B35] hover:text-[#e55a2b] hover:bg-orange-50 -ml-2"
      >
        <ArrowLeft className="h-4 w-4" />
        {selectedGroup ? "Back to Groups" : "Back"}
      </Button>

      {!selectedGroup ? (
        // Groups List View
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Motshelo Groups</h1>
              <p className="text-gray-500 mt-1">Join community savings groups and build wealth together</p>
            </div>
            <div className="flex gap-3">
              <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join a Motshelo Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Label>Enter Invite Code</Label>
                    <Input
                      placeholder="e.g., WOMEN-GAB-2024"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    />
                    <Button className="w-full bg-[#FF6B35]" onClick={handleJoinGroup}>
                      Join Group
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Motshelo Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Group Name</Label>
                      <Input
                        placeholder="e.g., Gaborone Women's Group"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description (Optional)</Label>
                      <Textarea
                        placeholder="Describe your group's purpose"
                        value={newGroup.description}
                        onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Contribution Amount (P)</Label>
                      <Input
                        type="number"
                        value={newGroup.contributionAmount}
                        onChange={(e) => setNewGroup({ ...newGroup, contributionAmount: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Frequency</Label>
                      <select
                        className="w-full rounded-lg border border-gray-200 p-2"
                        value={newGroup.frequency}
                        onChange={(e) => setNewGroup({ ...newGroup, frequency: e.target.value as any })}
                      >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <Label>Maximum Members</Label>
                      <Input
                        type="number"
                        value={newGroup.maxMembers}
                        onChange={(e) => setNewGroup({ ...newGroup, maxMembers: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Payout Order Method</Label>
                      <select
                        className="w-full rounded-lg border border-gray-200 p-2"
                        value={newGroup.payoutOrder}
                        onChange={(e) => setNewGroup({ ...newGroup, payoutOrder: e.target.value as any })}
                      >
                        <option value="random">Random (Fair Lottery)</option>
                        <option value="fixed">Fixed Order</option>
                        <option value="voting">Member Voting</option>
                      </select>
                    </div>
                    <Button className="w-full bg-[#FF6B35]" onClick={handleCreateGroup}>
                      Create Group
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="cursor-pointer"
                onClick={() => setSelectedGroup(group)}
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                          <MotsheloIcon className="h-6 w-6 text-[#FF6B35]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{group.name}</h3>
                          <p className="text-xs text-gray-500">{group.members?.length ?? group.currentMembers}/{group.maxMembers} members</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">{group.status}</Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Contribution</span>
                        <span className="font-semibold text-[#FF6B35]">P{group.contributionAmount}/{group.frequency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Pot</span>
                        <span className="font-semibold">P{group.totalPot}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Next Payout</span>
                        <span className="text-sm">{group.currentCycle.nextMemberName}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" onClick={() => setSelectedGroup(group)}>
                      View Group
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {groups.length === 0 && (
            <div className="text-center py-12">
              <MotsheloIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Motshelo groups yet</h3>
              <p className="text-gray-500 mb-4">Create or join a group to start saving together!</p>
            </div>
          )}
        </>
      ) : (
        // Single Group Detail View
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#FF6B35]/10 to-orange-50 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedGroup.name}</h2>
                <p className="text-gray-600 mt-1">{selectedGroup.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Invite Code</div>
                <code className="bg-white px-3 py-1 rounded-lg text-[#FF6B35] font-mono text-sm">
                  {selectedGroup.inviteCode}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedGroup.inviteCode);
                    toast({ title: "Copied!", description: "Invite code copied to clipboard" });
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500">Total Pot</div>
                <div className="text-xl font-bold text-[#FF6B35]">P{selectedGroup.totalPot}</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500">Members</div>
                <div className="text-xl font-bold">{selectedGroup.members?.length ?? selectedGroup.currentMembers}/{selectedGroup.maxMembers}</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500">Next Payout</div>
                <div className="text-sm font-semibold">{selectedGroup.currentCycle.nextMemberName}</div>
                <div className="text-xs text-gray-400">{formatDate(selectedGroup.currentCycle.payoutDate)}</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500">Your Contribution</div>
                <div className="text-xl font-bold">P{selectedGroup.contributionAmount}</div>
                <div className="text-xs text-gray-400">per {selectedGroup.frequency}</div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Current Cycle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Next Payout Recipient</p>
                      <p className="font-bold text-lg">{selectedGroup.currentCycle.nextMemberName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Payout Amount</p>
                      <p className="font-bold text-2xl text-[#FF6B35]">P{selectedGroup.currentCycle.potAmount}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Cycle Period</p>
                      <p className="font-medium">{formatDate(selectedGroup.currentCycle.startDate)} - {formatDate(selectedGroup.currentCycle.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payout Date</p>
                      <p className="font-medium text-[#FF6B35]">{formatDate(selectedGroup.currentCycle.payoutDate)}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-[#FF6B35]" onClick={() => handleContribute(selectedGroup.id, selectedGroup.contributionAmount)}>
                    <Gift className="h-4 w-4 mr-2" />
                    Pay Contribution (P{selectedGroup.contributionAmount})
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="members" className="mt-4">
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {selectedGroup.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">Joined {formatDate(member.joinedDate)}</p>
                          </div>
                        </div>
                        {member.id === selectedGroup.createdBy && (
                          <Badge variant="secondary" className="text-xs">Creator</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-[#FF6B35]" />
                    Group Activity Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-[#FF6B35]">
                          {activity.userName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold">{activity.userName}</span> {activity.action}:
                            <span className="text-gray-600 ml-1">{activity.details}</span>
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Write a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && chatMessage.trim()) {
                          setActivities([{
                            id: activities.length + 1,
                            userId: "user_123",
                            userName: "Tshepo Molefe",
                            action: "said",
                            details: chatMessage,
                            timestamp: new Date().toISOString(),
                          }, ...activities]);
                          setChatMessage("");
                          toast({ title: "Message Sent", description: "Your message has been posted to the group" });
                        }
                      }}
                    />
                    <Button size="icon" className="bg-[#FF6B35]" onClick={() => {
                      if (chatMessage.trim()) {
                        setActivities([{
                          id: activities.length + 1,
                          userId: "user_123",
                          userName: "Tshepo Molefe",
                          action: "said",
                          details: chatMessage,
                          timestamp: new Date().toISOString(),
                        }, ...activities]);
                        setChatMessage("");
                        toast({ title: "Message Sent", description: "Your message has been posted to the group" });
                      }
                    }}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-4">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Contribution & Payout History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-green-800">Cycle 2 Payout</p>
                          <p className="text-xs text-green-600">Paid to Keitumetse Nkosi</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-800">P1,400</p>
                          <p className="text-xs text-green-600">15 May 2026</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Cycle 1 Payout</p>
                          <p className="text-xs text-gray-600">Paid to Tshepo Molefe</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">P1,200</p>
                          <p className="text-xs text-gray-500">15 Apr 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}