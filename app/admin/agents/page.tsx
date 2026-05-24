"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPlus, Users, Shield, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import type { Agent } from "@/lib/api";
import { AgentsTable } from "./components/AgentsTable";
import { AgentFilters, type AgentStatusFilter } from "./components/AgentFilters";
import { AgentForm } from "./components/AgentForm";

export default function AdminAgentsPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Agent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AgentStatusFilter>("all");

  const { toast } = useToast();

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAgents();
      // Safety guard: ensure data is an array
      setAgents(Array.isArray(data) ? data : []);
    } catch (err: any) {
      if (err.message?.includes("401") || err.message?.includes("Unauthorized")) {
        router.push("/admin");
        return;
      }
      toast({ title: "Error", description: "Failed to load agents.", variant: "destructive" });
      setAgents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: {
    name: string;
    email: string;
    loginEmail: string;
    loginPassword: string;
    territory: string;
    isActive: boolean;
  }) => {
    setIsSaving(true);
    try {
      const newAgent = await api.createAgent(data);
      setAgents((prev) => [newAgent, ...(Array.isArray(prev) ? prev : [])]);
      setFormOpen(false);
      toast({ title: "Agent Created", description: `${newAgent.name} has been added.` });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create agent.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Agent & { loginPassword?: string }>) => {
    setIsSaving(true);
    try {
      const updated = await api.updateAgent(id, data);
      setAgents((prev) => (Array.isArray(prev) ? prev.map((a) => (a.id === id ? updated : a)) : [updated]));
      setFormOpen(false);
      setSelectedAgent(null);
      toast({ title: "Agent Updated", description: "Changes saved successfully." });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update agent.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await api.deleteAgent(deleteTarget.id);
      setAgents((prev) => (Array.isArray(prev) ? prev.filter((a) => a.id !== deleteTarget.id) : []));
      setDeleteTarget(null);
      toast({ title: "Agent Deleted", description: `${deleteTarget.name} has been removed.` });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete agent.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openCreate = () => {
    setSelectedAgent(null);
    setFormOpen(true);
  };

  const openEdit = (agent: Agent) => {
    setSelectedAgent(agent);
    setFormOpen(true);
  };

  // Client-side filtering with safety guard
  const filtered = useMemo(() => {
    const agentsArray = Array.isArray(agents) ? agents : [];
    return agentsArray.filter((a) => {
      const matchSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        a.territory.toLowerCase().includes(search.toLowerCase()) ||
        a.loginEmail.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && a.isActive) ||
        (statusFilter === "inactive" && !a.isActive);
      return matchSearch && matchStatus;
    });
  }, [agents, search, statusFilter]);

  const agentsArray = Array.isArray(agents) ? agents : [];
  const activeCount = agentsArray.filter((a) => a.isActive).length;

  return (
    <AdminLayout>
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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-black">Agent Management</h1>
            <p className="text-gray-500 mt-1">Manage field agents and their access</p>
          </div>
          <Button
            onClick={openCreate}
            className="bg-[#FF6B35] hover:bg-[#d4471a] text-white"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Agent
          </Button>
        </motion.div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Agents", value: agentsArray.length, icon: <Users className="h-5 w-5 text-white" />, bg: "bg-black" },
            { label: "Active", value: activeCount, icon: <Shield className="h-5 w-5 text-white" />, bg: "bg-[#FF6B35]" },
            { label: "Inactive", value: agentsArray.length - activeCount, icon: <Users className="h-5 w-5 text-white" />, bg: "bg-gray-400" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm"
            >
              <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <AgentFilters
          search={search}
          statusFilter={statusFilter}
          isLoading={isLoading}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onRefresh={loadAgents}
        />

        {/* Table */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Agents</CardTitle>
            <CardDescription>
              {filtered.length} agent{filtered.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-10 text-gray-500">Loading…</div>
            ) : (
              <AgentsTable
                agents={filtered}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
                onView={(a) => router.push(`/admin/agents/${a.id}`)}
              />
            )}
          </CardContent>
        </Card>

        {/* Create / Edit form modal */}
        <AgentForm
          open={formOpen}
          agent={selectedAgent}
          isSaving={isSaving}
          onClose={() => { setFormOpen(false); setSelectedAgent(null); }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />

        {/* Delete confirmation dialog */}
        <Dialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Agent</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This will
                also remove all their users, communications, and reports. This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={isDeleting}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting…" : "Delete Agent"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}