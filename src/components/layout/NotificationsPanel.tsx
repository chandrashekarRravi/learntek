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
      "bg-cyan-100 text-cyan-700",
      "bg-red-100 text-red-700",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 w-[400px] h-full bg-white dark:bg-gray-950 border-l shadow-xl z-50 flex flex-col">
        <div className="px-6 py-5 border-b flex items-center justify-between bg-white dark:bg-gray-950">
          <h2 className="text-xl font-semibold text-foreground">
            Notifications ({unreadNotifications.length})
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto px-6 py-4">
          <div className="space-y-6">
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
                  <p className="text-sm font-medium text-foreground leading-snug">
                    {notification.from} ({notification.fromRole}) messaged to{" "}
                    {notification.to} ({notification.toRole})
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {notification.timestamp} | {notification.courseCode}
                  </p>
                  <p className="text-sm text-foreground mt-2 leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-white dark:bg-gray-950 flex justify-end">
          <Link to="/notifications" onClick={onClose}>
            <Button variant="link" className="text-primary font-semibold px-0 hover:no-underline">
              VIEW ALL
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
