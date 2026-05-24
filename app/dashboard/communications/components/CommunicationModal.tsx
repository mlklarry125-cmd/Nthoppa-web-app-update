"use client";

// app/dashboard/communications/components/CommunicationModal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import type { User } from "@/lib/api";

interface CommunicationModalProps {
  open: boolean;
  users: User[];
  defaultUserId?: string;
  isSending: boolean;
  onClose: () => void;
  onSend: (toUserId: string, message: string, type: string) => Promise<void>;
}

const MESSAGE_TEMPLATES = [
  { label: "Welcome", body: "Welcome to Nthoppa! Complete your profile to get started." },
  { label: "Reminder", body: "Don't forget to complete your registration!" },
  { label: "Follow-up", body: "We noticed you haven't finished your profile. Can we help?" },
  { label: "Completion", body: "Congratulations! Your financial education module is complete!" },
];

export function CommunicationModal({
  open,
  users,
  defaultUserId = "",
  isSending,
  onClose,
  onSend,
}: CommunicationModalProps) {
  const [toUserId, setToUserId] = useState(defaultUserId);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("sms");

  const handleSend = async () => {
    if (!toUserId || !message.trim()) return;
    await onSend(toUserId, message, type);
    // Reset form on success
    setMessage("");
    setToUserId(defaultUserId);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Communication</DialogTitle>
          <DialogDescription>
            Send a message to a registered customer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Recipient */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">Recipient</Label>
            <Select value={toUserId} onValueChange={setToUserId}>
              <SelectTrigger className="border-gray-200">
                <SelectValue placeholder="Select a customer…" />
              </SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.fullName} — {u.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Channel */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">Channel</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="call">Call Log</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick templates */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">
              Templates (optional)
            </Label>
            <div className="flex flex-wrap gap-2">
              {MESSAGE_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.label}
                  type="button"
                  onClick={() => setMessage(tpl.body)}
                  className="text-xs px-3 py-1 rounded-full border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message body */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">Message</Label>
            <Textarea
              placeholder="Type your message here…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="border-gray-200 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{message.length} chars</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSending}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={isSending || !toUserId || !message.trim()}
            className="bg-[#FF6B35] hover:bg-[#d4471a] text-white"
          >
            {isSending ? (
              "Sending…"
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
