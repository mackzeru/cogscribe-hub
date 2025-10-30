import { BarChart3, Calendar, CheckCircle, FolderOpen, Plus, TrendingUp, Bell, AlertCircle, Info, CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const stats = [
  {
    title: "Total Projects",
    value: "12",
    change: "+2 this month",
    icon: FolderOpen,
    gradient: "icog-gradient-bg",
  },
  {
    title: "Active Tasks",
    value: "34",
    change: "+8 this week",
    icon: CheckCircle,
    gradient: "bg-success",
  },
  {
    title: "Meetings This Week",
    value: "8",
    change: "3 completed",
    icon: Calendar,
    gradient: "bg-secondary",
  },
  {
    title: "Pending Actions",
    value: "6",
    change: "2 overdue",
    icon: TrendingUp,
    gradient: "bg-warning",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "Project Alpha launched",
    user: "Sarah Chen",
    avatar: "/api/placeholder/32/32",
    time: "2 hours ago",
    type: "project",
  },
  {
    id: 2,
    action: "Task 'Fix login issues' completed",
    user: "Mike Johnson",
    avatar: "/api/placeholder/32/32",
    time: "4 hours ago",
    type: "task",
  },
  {
    id: 3,
    action: "Weekly standup scheduled",
    user: "AI Assistant",
    avatar: null,
    time: "6 hours ago",
    type: "meeting",
  },
  {
    id: 4,
    action: "New team member added",
    user: "Emma Wilson",
    avatar: "/api/placeholder/32/32",
    time: "1 day ago",
    type: "team",
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: "Review project proposal",
    project: "Project Alpha",
    dueDate: "Today",
    status: "urgent",
  },
  {
    id: 2,
    title: "Update documentation",
    project: "Project Beta",
    dueDate: "Tomorrow",
    status: "normal",
  },
  {
    id: 3,
    title: "Client presentation prep",
    project: "Project Gamma",
    dueDate: "This week",
    status: "normal",
  },
];

const recentMeetings = [
  {
    id: 1,
    title: "Weekly Team Sync",
    date: "Today, 10:00 AM",
    attendees: 5,
    summary: "Discussed project progress and upcoming deadlines",
  },
  {
    id: 2,
    title: "Project Alpha Review",
    date: "Yesterday, 2:00 PM",
    attendees: 3,
    summary: "Reviewed deliverables and next steps",
  },
  {
    id: 3,
    title: "Client Feedback Session",
    date: "Monday, 11:00 AM",
    attendees: 7,
    summary: "Gathered feedback on latest features",
  },
];

export default function Dashboard() {
  const { toast } = useToast();
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === "granted") {
        toast({
          title: "Notifications Enabled",
          description: "You will now receive browser notifications.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Notifications Blocked",
          description: "Please enable notifications in your browser settings.",
        });
      }
    }
  };

  const showBrowserNotification = (title: string, options: NotificationOptions) => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(title, options);
      } else if (Notification.permission === "default") {
        toast({
          title: "Permission Required",
          description: "Please enable browser notifications first.",
          action: (
            <Button size="sm" onClick={requestNotificationPermission}>
              Enable
            </Button>
          ),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Notifications Blocked",
          description: "Please enable notifications in your browser settings.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Your browser doesn't support notifications.",
      });
    }
  };

  const showSuccessNotification = () => {
    showBrowserNotification("Success!", {
      body: "Your changes have been saved successfully.",
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "success",
    });
  };

  const showErrorNotification = () => {
    showBrowserNotification("Error Occurred", {
      body: "Failed to complete the operation. Please try again.",
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "error",
      requireInteraction: true,
    });
  };

  const showInfoNotification = () => {
    showBrowserNotification("Information", {
      body: "You have 3 new messages and 5 pending tasks to review.",
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "info",
    });
  };

  const showWarningNotification = () => {
    showBrowserNotification("Warning", {
      body: "Your subscription will expire in 3 days. Please renew to continue.",
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "warning",
      requireInteraction: true,
    });
  };

  const showActionNotification = () => {
    const notification = new Notification("New Update Available", {
      body: "Version 2.0 is ready to install. Click to update now.",
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "update",
      requireInteraction: true,
    });

    notification.onclick = () => {
      window.focus();
      toast({
        title: "Installing Update...",
        description: "The update will be installed shortly.",
      });
      notification.close();
    };
  };

  const showCustomNotification = () => {
    showBrowserNotification("🎉 Achievement Unlocked!", {
      body: "You've completed 100 tasks this month. Great work!",
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "achievement",
    });
  };

  return (
    <div className="space-y-6 icog-animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <Button className="icog-button-primary">
          <Plus className="mr-2 h-4 w-4" />
          Quick Start
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="icog-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.gradient}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Feed */}
        <Card className="icog-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    {activity.avatar ? (
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                    ) : (
                      <AvatarFallback className="icog-gradient-bg text-white text-xs">
                        AI
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="icog-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.project}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={task.status === "urgent" ? "destructive" : "secondary"}
                    >
                      {task.dueDate}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View All Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Meetings */}
      <Card className="icog-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Recent Meetings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMeetings.map((meeting) => (
              <div key={meeting.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{meeting.title}</h3>
                  <Badge variant="outline">{meeting.attendees} attendees</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {meeting.date}
                </p>
                <p className="text-sm">{meeting.summary}</p>
                <Button variant="ghost" size="sm" className="mt-2 text-primary">
                  View Summary
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Demo Section */}
      <Card className="icog-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Browser Notification Examples
          </CardTitle>
          <CardDescription>
            {notificationPermission === "granted" 
              ? "Click the buttons below to trigger browser notifications"
              : notificationPermission === "denied"
              ? "Browser notifications are blocked. Please enable them in your browser settings."
              : "Click 'Enable Notifications' to start receiving browser notifications"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notificationPermission !== "granted" && (
            <div className="mb-6 p-4 bg-muted rounded-lg border">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2">
                    Browser notifications are {notificationPermission === "denied" ? "blocked" : "not enabled"}
                  </p>
                  {notificationPermission === "default" && (
                    <Button onClick={requestNotificationPermission} size="sm">
                      <Bell className="mr-2 h-4 w-4" />
                      Enable Notifications
                    </Button>
                  )}
                  {notificationPermission === "denied" && (
                    <p className="text-sm text-muted-foreground">
                      Go to your browser settings to enable notifications for this site.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button
              onClick={showSuccessNotification}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Success Notification
            </Button>
            
            <Button
              onClick={showErrorNotification}
              variant="destructive"
              className="w-full"
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Error Notification
            </Button>
            
            <Button
              onClick={showInfoNotification}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Info className="mr-2 h-4 w-4" />
              Info Notification
            </Button>
            
            <Button
              onClick={showWarningNotification}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Warning Notification
            </Button>
            
            <Button
              onClick={showActionNotification}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Zap className="mr-2 h-4 w-4" />
              Notification with Action
            </Button>
            
            <Button
              onClick={showCustomNotification}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Bell className="mr-2 h-4 w-4" />
              Custom Style Notification
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}