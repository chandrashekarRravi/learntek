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

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-red-100 text-red-700",
      "bg-green-100 text-green-700",
      "bg-purple-100 text-purple-700",
      "bg-yellow-100 text-yellow-700",
      "bg-pink-100 text-pink-700",
    ];
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-16 w-96 bg-background border-l shadow-lg z-50 max-h-[calc(100vh-4rem)] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between bg-background">
          <h2 className="text-lg font-semibold">
            Notifications ({unreadNotifications.length})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {unreadNotifications.map((notification) => (
            <div key={notification.id} className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className={getAvatarColor(notification.from)}>
                  {notification.from
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-relaxed">
                  {notification.from} ({notification.fromRole}) messaged to{" "}
                  {notification.to} ({notification.toRole})
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.timestamp} | {notification.courseCode}
                </p>
                <p className="text-sm text-foreground mt-2">
                  {notification.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-background flex justify-end">
          <Link to="/notifications" onClick={onClose}>
            <Button variant="link" className="text-primary font-semibold">
              VIEW ALL
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
