import { User } from "lucide-react";
import { NotificationDrawer } from "../Notifications/NotificationDrawer";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white rounded-sm transform rotate-45" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">LEARNTEK</h1>
          <p className="text-xs text-muted-foreground">Stay Ahead</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <NotificationDrawer />

        <button className="p-2 hover:bg-accent/10 rounded-full transition-colors border border-border">
          <User className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
};
