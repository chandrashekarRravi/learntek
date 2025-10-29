import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { NotificationsPanel } from "./NotificationsPanel";

export const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = 2;

  return (
    <>
      <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-primary border-r-[12px] border-r-transparent transform rotate-45"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LEARNTEK</h1>
              <p className="text-xs text-muted-foreground">Stay Ahead</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </header>

      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};
