// app/dashboard/communications/components/CommunicationsList.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, Clock, XCircle, MessageSquare, Mail, Phone, Smartphone } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import type { Communication, User } from "@/lib/api";

interface CommunicationsListProps {
  communications: Communication[];
  users: User[];
}

function getTypeIcon(type: string) {
  switch (type) {
    case "email": return <Mail className="h-4 w-4" />;
    case "sms": return <Smartphone className="h-4 w-4" />;
    case "call": return <Phone className="h-4 w-4" />;
    case "whatsapp": return <MessageSquare className="h-4 w-4" />;
    default: return <MessageSquare className="h-4 w-4" />;
  }
}

function getStatusBadge(status: string) {
  if (status === "sent" || status === "delivered") {
    return (
      <Badge className="bg-green-100 text-green-700 border-none flex items-center gap-1">
        <CheckCircle className="h-3 w-3" /> {status}
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge className="bg-yellow-100 text-yellow-700 border-none flex items-center gap-1">
        <Clock className="h-3 w-3" /> Pending
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-100 text-red-700 border-none flex items-center gap-1">
      <XCircle className="h-3 w-3" /> Failed
    </Badge>
  );
}

export function CommunicationsList({ communications, users }: CommunicationsListProps) {
  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.fullName : "Unknown User";
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (communications.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="font-medium">No communications yet</p>
        <p className="text-sm mt-1">Send your first message using the button above</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {communications.map((comm, index) => {
          const recipientName = getUserName(comm.toUserId);
          return (
            <motion.div
              key={comm.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {/* Avatar */}
              <Avatar className="h-10 w-10 shrink-0 gradient-orange-black">
                <AvatarFallback className="bg-transparent text-white text-xs">
                  {getInitials(recipientName)}
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="font-medium text-black truncate">{recipientName}</p>
                  {getStatusBadge(comm.status)}
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{comm.message}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    {getTypeIcon(comm.type)}
                    <span className="capitalize">{comm.type}</span>
                  </span>
                  <span>{formatDateTime(comm.timestamp)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
