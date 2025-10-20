import { Bell, User } from "lucide-react";
import { Badge } from "../global/badge";

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
        <button className="relative p-2 hover:bg-accent/10 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
            2
          </Badge>
        </button>

        <button className="p-2 hover:bg-accent/10 rounded-full transition-colors border border-border">
          <User className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
};
