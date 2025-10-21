import React, { useMemo, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  User,
  Moon,
  Sun,
  LogOut,
  KeyRound,
  Sparkles,
} from "lucide-react";
import logoLight from "@/assets/logo.png";
import { useTheme } from "next-themes";

// Import your navigation config
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
} from "lucide-react";

const navigation = [
  { segment: "dashboard", title: "Dashboard", icon: LayoutDashboard },
  { segment: "users", title: "Users", icon: Users },
  { segment: "roles", title: "Roles", icon: UserCog },
  { segment: "permissions", title: "Permissions", icon: Shield },
  { segment: "state", title: "State", icon: MapPin },
  { segment: "promotion-type", title: "Promotion Type", icon: Megaphone },
  { segment: "roommate", title: "Roommate", icon: Users2 },
  { segment: "roommate-setting", title: "Roommate Settings", icon: Home },
  { segment: "room", title: "Room", icon: DoorOpen },
  { segment: "room-setting", title: "Room Settings", icon: DoorClosed },
  { segment: "job", title: "Job", icon: Briefcase },
  { segment: "job-setting", title: "Job Setting", icon: BriefcaseBusiness },
  { segment: "services", title: "Services", icon: Server },
  { segment: "business", title: "Business", icon: Briefcase },
  { segment: "busi-serv-setting", title: "Business Services Setting", icon: ServerCog },
  { segment: "contact-us", title: "Contact Us", icon: Mail },
  { segment: "mychat", title: "Chat", icon: MessageSquare },
  { segment: "settings", title: "Settings", icon: Settings },
  { segment: "cms", title: "CMS", icon: Clipboard },
];

const PrivateLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("drawer");
    return saved ? saved === "true" : false;
  });
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleDrawerToggle = () => {
    const newOpen = !sidebarOpen;
    setSidebarOpen(newOpen);
    localStorage.setItem("drawer", newOpen.toString());
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActiveRoute = (segment: string) => {
    return location.pathname.includes(segment);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-background">
        {/* Modern Header with Glass Effect */}
        <header className="modern-header sticky top-0 z-50">
          <div className="flex h-16 items-center px-6">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDrawerToggle}
                className="hover-glow h-9 w-9 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {!sidebarOpen && (
                <div
                  className="flex items-center space-x-2 cursor-pointer group"
                  onClick={() => navigate("/")}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl icog-gradient-bg shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
                    <span className="text-sm font-bold text-white">iC</span>
                  </div>
                  <span className="text-xl font-bold icog-text-gradient hidden sm:block">
                    iCog Sync
                  </span>
                </div>
              )}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover-glow h-9 w-9 rounded-lg"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full hover-glow"
                  >
                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                      <AvatarFallback className="icog-gradient-bg text-white text-sm font-semibold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-effect" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/profile?tab=password")}
                      className="cursor-pointer"
                    >
                      <KeyRound className="mr-2 h-4 w-4" />
                      <span>Change Password</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={() => setLogoutDialogOpen(true)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Modern Sidebar with Gradient Background */}
          <aside
            className={cn(
              "modern-sidebar sticky top-16 h-[calc(100vh-4rem)] border-r transition-all duration-300 ease-in-out overflow-y-auto",
              sidebarOpen ? "w-64" : "w-16"
            )}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              {sidebarOpen && (
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <div
                    className="flex items-center space-x-2 cursor-pointer group"
                    onClick={() => navigate("/")}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl icog-gradient-bg shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
                      <span className="text-sm font-bold text-white">iC</span>
                    </div>
                    <span className="text-lg font-bold icog-text-gradient">
                      iCog Sync
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDrawerToggle}
                    className="h-8 w-8 rounded-lg hover:bg-accent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Navigation */}
              <nav className="flex-1 p-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = isActiveRoute(item.segment);
                  const IconComponent = item.icon;

                  return (
                    <Tooltip key={item.title}>
                      <TooltipTrigger asChild>
                        <button
                          className={cn(
                            "sidebar-nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                            sidebarOpen ? "justify-start" : "justify-center",
                            isActive
                              ? "bg-primary text-primary-foreground active shadow-[var(--shadow-active)]"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )}
                          onClick={() => navigate(item.segment)}
                        >
                          <IconComponent
                            className={cn(
                              "h-5 w-5 transition-all duration-200",
                              isActive && "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                            )}
                          />
                          {sidebarOpen && (
                            <span className="truncate">{item.title}</span>
                          )}
                          {isActive && sidebarOpen && (
                            <Sparkles className="ml-auto h-3.5 w-3.5 opacity-70" />
                          )}
                        </button>
                      </TooltipTrigger>
                      {!sidebarOpen && (
                        <TooltipContent side="right" className="glass-effect">
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </nav>

              {/* Expand Button for Collapsed State */}
              {!sidebarOpen && (
                <div className="p-2 border-t border-border/50">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDrawerToggle}
                        className="w-full h-10 rounded-xl hover:bg-accent hover-glow"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="glass-effect">
                      Expand sidebar
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {/* AI Assistant Hint (when expanded) */}
              {sidebarOpen && (
                <div className="p-4 m-3 rounded-xl icog-gradient-subtle border border-primary/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold text-primary">
                      AI Assistant
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Ready to help with smart automation and insights
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6 max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Logout Dialog */}
        <AlertDialog
          open={isLogoutDialogOpen}
          onOpenChange={setLogoutDialogOpen}
        >
          <AlertDialogContent className="glass-effect">
            <AlertDialogHeader>
              <AlertDialogTitle>Log Out</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out? This will end your current session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Log Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};

export default PrivateLayout;
