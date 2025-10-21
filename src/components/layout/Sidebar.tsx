import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Shield,
  MapPin,
  Megaphone,
  DoorOpen,
  DoorClosed,
  Users2,
  MessageSquare,
  Settings,
  Home,
  Mail,
  Briefcase,
  BriefcaseBusiness,
  Server,
  ServerCog,
  Clipboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
  },
  {
    name: "Roles",
    href: "/roles",
    icon: UserCog,
  },
  {
    name: "Permissions",
    href: "/permissions",
    icon: Shield,
  },
  {
    name: "State",
    href: "/state",
    icon: MapPin,
  },
  {
    name: "Promotion Type",
    href: "/promotion-type",
    icon: Megaphone,
  },
  {
    name: "Roommate",
    href: "/roommate",
    icon: Users2,
  },
  {
    name: "Roommate Settings",
    href: "/roommate-setting",
    icon: Home,
  },
  {
    name: "Room",
    href: "/room",
    icon: DoorOpen,
  },
  {
    name: "Room Settings",
    href: "/room-setting",
    icon: DoorClosed,
  },
  {
    name: "Job",
    href: "/job",
    icon: Briefcase,
  },
  {
    name: "Job Setting",
    href: "/job-setting",
    icon: BriefcaseBusiness,
  },
  {
    name: "Services",
    href: "/services",
    icon: Server,
  },
  {
    name: "Business",
    href: "/business",
    icon: Briefcase,
  },
  {
    name: "Business Services Setting",
    href: "/busi-serv-setting",
    icon: ServerCog,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    icon: Mail,
  },
  {
    name: "Chat",
    href: "/mychat",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "CMS",
    href: "/cms",
    icon: Clipboard,
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("drawer");
    return saved ? saved === "true" : false;
  });
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("drawer", collapsed.toString());
  }, [collapsed]);

  return (
    <div
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] bg-muted/30 border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* AI Assistant Hint */}
        {!collapsed && (
          <div className="p-4 m-2 rounded-lg icog-gradient-subtle border">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">
                AI Assistant
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Ready to help with meeting summaries and task automation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};