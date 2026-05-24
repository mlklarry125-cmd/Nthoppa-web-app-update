"use client";

// app/admin/agents/components/AgentsTable.tsx
"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Eye, MapPin, Mail } from "lucide-react";
import type { Agent } from "@/lib/api";

interface AgentsTableProps {
  agents: Agent[];
  onEdit: (agent: Agent) => void;
  onDelete: (agent: Agent) => void;
  onView: (agent: Agent) => void;
}

export function AgentsTable({ agents, onEdit, onDelete, onView }: AgentsTableProps) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (agents.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No agents found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Agent</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Territory</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Login Email</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <motion.tr
              key={agent.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 gradient-orange-black">
                    <AvatarFallback className="bg-transparent text-white text-xs">
                      {getInitials(agent.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-black">{agent.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {agent.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-3.5 w-3.5 text-[#FF6B35]" />
                  {agent.territory}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">{agent.loginEmail}</td>
              <td className="py-3 px-4">
                {agent.isActive ? (
                  <Badge className="bg-green-100 text-green-700 border-none">Active</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-500 border-none">Inactive</Badge>
                )}
              </td>
              <td className="py-3 px-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(agent)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(agent)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(agent)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
