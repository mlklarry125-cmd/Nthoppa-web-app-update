"use client";

// app/admin/agents/components/AgentForm.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Agent } from "@/lib/api";

interface AgentFormData {
  name: string;
  email: string;
  loginEmail: string;
  loginPassword: string;
  territory: string;
  isActive: boolean;
}

interface AgentFormProps {
  open: boolean;
  agent?: Agent | null; // null = create mode
  isSaving: boolean;
  onClose: () => void;
  onCreate: (data: AgentFormData) => Promise<void>;
  onUpdate: (id: string, data: Partial<AgentFormData>) => Promise<void>;
}

const EMPTY: AgentFormData = {
  name: "",
  email: "",
  loginEmail: "",
  loginPassword: "",
  territory: "",
  isActive: true,
};

export function AgentForm({
  open,
  agent,
  isSaving,
  onClose,
  onCreate,
  onUpdate,
}: AgentFormProps) {
  const [form, setForm] = useState<AgentFormData>(EMPTY);
  const isEdit = !!agent;

  // Populate form when editing
  useEffect(() => {
    if (agent) {
      setForm({
        name: agent.name,
        email: agent.email,
        loginEmail: agent.loginEmail,
        loginPassword: "", // never pre-fill password
        territory: agent.territory,
        isActive: agent.isActive,
      });
    } else {
      setForm(EMPTY);
    }
  }, [agent]);

  const set = (field: keyof AgentFormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (isEdit && agent) {
      // Only send password if the user typed a new one
      const payload: Partial<AgentFormData> = {
        name: form.name,
        email: form.email,
        loginEmail: form.loginEmail,
        territory: form.territory,
        isActive: form.isActive,
      };
      if (form.loginPassword) payload.loginPassword = form.loginPassword;
      await onUpdate(agent.id, payload);
    } else {
      await onCreate(form);
    }
  };

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.loginEmail.trim() &&
    form.territory.trim() &&
    (isEdit || form.loginPassword.trim()); // password required only on create

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Agent" : "Add New Agent"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the agent's details. Leave password blank to keep the current one."
              : "Fill in all fields to create a new agent account."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="John Doe"
                className="border-gray-200"
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">Contact Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="john@nthoppa.com"
                className="border-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">Login Email</Label>
              <Input
                type="email"
                value={form.loginEmail}
                onChange={(e) => set("loginEmail", e.target.value)}
                placeholder="john.login@nthoppa.com"
                className="border-gray-200"
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                {isEdit ? "New Password (optional)" : "Password"}
              </Label>
              <Input
                type="password"
                value={form.loginPassword}
                onChange={(e) => set("loginPassword", e.target.value)}
                placeholder={isEdit ? "Leave blank to keep current" : "Min. 8 characters"}
                className="border-gray-200"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1 block text-sm font-medium text-gray-700">Territory</Label>
            <Input
              value={form.territory}
              onChange={(e) => set("territory", e.target.value)}
              placeholder="e.g. Gaborone Central"
              className="border-gray-200"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">Active Account</Label>
            <Switch
              checked={form.isActive}
              onCheckedChange={(v) => set("isActive", v)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSaving || !isValid}
            className="bg-[#FF6B35] hover:bg-[#d4471a] text-white"
          >
            {isSaving ? "Saving…" : isEdit ? "Save Changes" : "Create Agent"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
