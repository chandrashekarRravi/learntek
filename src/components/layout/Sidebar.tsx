import { NavLink } from "react-router-dom";
import { LayoutGrid, GraduationCap, Users, BookOpen, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", path: "/" },
  { icon: GraduationCap, label: "Students", path: "/students" },
  { icon: Users, label: "Faculty", path: "/", active: true },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-[210px] bg-card border-r min-h-screen sticky top-16 self-start">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path + item.label}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                (isActive && item.active) || (item.path === "/" && item.label === "Faculty")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
