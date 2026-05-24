"use client";

// app/admin/agents/components/AgentFilters.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RefreshCw } from "lucide-react";

export type AgentStatusFilter = "all" | "active" | "inactive";

interface AgentFiltersProps {
  search: string;
  statusFilter: AgentStatusFilter;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: AgentStatusFilter) => void;
  onRefresh: () => void;
}

export function AgentFilters({
  search,
  statusFilter,
  isLoading,
  onSearchChange,
  onStatusChange,
  onRefresh,
}: AgentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search agents by name, email, or territory…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 border-gray-200"
        />
      </div>

      <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as AgentStatusFilter)}>
        <SelectTrigger className="w-full sm:w-44 border-gray-200">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        className="border-gray-200"
        onClick={onRefresh}
        disabled={isLoading}
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      </Button>
    </div>
  );
}
