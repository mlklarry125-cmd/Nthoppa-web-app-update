"use client";

// app/dashboard/communications/components/CommunicationFilters.tsx
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

export type CommTypeFilter = "all" | "sms" | "email" | "whatsapp" | "call";
export type CommStatusFilter = "all" | "sent" | "delivered" | "pending" | "failed";

interface CommunicationFiltersProps {
  search: string;
  typeFilter: CommTypeFilter;
  statusFilter: CommStatusFilter;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: CommTypeFilter) => void;
  onStatusChange: (value: CommStatusFilter) => void;
  onRefresh: () => void;
}

export function CommunicationFilters({
  search,
  typeFilter,
  statusFilter,
  isLoading,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onRefresh,
}: CommunicationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search messages or recipients…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 border-gray-200"
        />
      </div>

      {/* Type filter */}
      <Select value={typeFilter} onValueChange={(v) => onTypeChange(v as CommTypeFilter)}>
        <SelectTrigger className="w-full sm:w-40 border-gray-200">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="sms">SMS</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="whatsapp">WhatsApp</SelectItem>
          <SelectItem value="call">Call</SelectItem>
        </SelectContent>
      </Select>

      {/* Status filter */}
      <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as CommStatusFilter)}>
        <SelectTrigger className="w-full sm:w-40 border-gray-200">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="sent">Sent</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>

      {/* Refresh */}
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
