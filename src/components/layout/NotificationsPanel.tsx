import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockNotifications } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  if (!isOpen) return null;

  const unreadNotifications = mockNotifications.filter((n) => !n.isRead);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-16 w-96 bg-card border-l shadow-lg z-50 max-h-[calc(100vh-4rem)] overflow-auto">
        <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-card">
          <h2 className="text-lg font-semibold">
            Notifications ({unreadNotifications.length})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {unreadNotifications.map((notification) => (
            <div key={notification.id} className="space-y-2">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {notification.from
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {notification.from} ({notification.fromRole}) messaged to{" "}
                    {notification.to} ({notification.toRole})
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp} | {notification.courseCode}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t sticky bottom-0 bg-card">
          <Link to="/notifications" onClick={onClose}>
            <Button variant="link" className="w-full text-primary">
              VIEW ALL
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
