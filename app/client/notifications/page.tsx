"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, CheckCircle, Circle, Trash2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "savings" | "motshelo" | "insurance" | "coin";
}

export default function ClientNotificationsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "Savings Goal Alert", message: "You're 75% close to your 'Business Startup' goal! Keep going!", timestamp: "2026-05-22T10:30:00", read: false, type: "savings" },
    { id: 2, title: "Motshelo Contribution Due", message: "Your contribution for Gaborone Women's Group is due in 3 days.", timestamp: "2026-05-21T14:15:00", read: false, type: "motshelo" },
    { id: 3, title: "Nthoppa Coins Earned!", message: "You earned 25 Nthoppa Coins for completing a financial literacy module.", timestamp: "2026-05-20T09:00:00", read: true, type: "coin" },
    { id: 4, title: "NthoppaSure Reminder", message: "Your Funeral Cover premium of P85 is due on June 1st.", timestamp: "2026-05-19T16:45:00", read: false, type: "insurance" },
    { id: 5, title: "Savings Streak!", message: "You've saved consistently for 30 days! +50 Nthoppa Coins awarded.", timestamp: "2026-05-18T08:00:00", read: true, type: "savings" },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast({ title: "Marked as read", description: "Notification marked as read." });
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    toast({ title: "All marked as read", description: "All notifications have been marked as read." });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({ title: "Deleted", description: "Notification has been deleted." });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "savings": return "💰";
      case "motshelo": return "👥";
      case "insurance": return "🛡️";
      case "coin": return "🪙";
      default: return "📢";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated with your financial activity</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <Badge className="bg-[#FF6B35] text-white">
          {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
        </Badge>
      )}

      {/* Notifications List */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#FF6B35]" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">No notifications yet</p>
              <p className="text-sm text-gray-400">Check back later for updates</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all ${!notification.read ? "bg-orange-50 border-[#FF6B35]/30" : "bg-white border-gray-200"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <span className="text-xs text-gray-400">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-[#FF6B35]"
                          title="Mark as read"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}