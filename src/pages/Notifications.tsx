import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, Check, CheckCheck, Filter, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notification } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data generator
const generateMockNotifications = (page: number): Notification[] => {
  const types = ["message", "task", "meeting", "alert"];
  const titles = [
    "New Message",
    "Task Assigned",
    "Meeting Reminder",
    "System Alert",
  ];

  return Array.from({ length: 10 }, (_, i) => ({
    id: `${page}-${i}`,
    data: {
      title: titles[Math.floor(Math.random() * titles.length)],
      type: types[Math.floor(Math.random() * types.length)],
      message: {
        chat_id: `chat_${page}_${i}`,
        created_at: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      image: null,
    },
    read_at: Math.random() > 0.5 ? new Date().toISOString() : null,
    created_at: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(
    generateMockNotifications(0)
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastNotificationRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newPage = page + 1;
      const newNotifications = generateMockNotifications(newPage);

      if (newPage >= 5) {
        // Stop after 5 pages for demo
        setHasMore(false);
      }

      setNotifications((prev) => [...prev, ...newNotifications]);
      setPage(newPage);
      setLoading(false);
    }, 1000);
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore();
      }
    });

    if (lastNotificationRef.current) {
      observerRef.current.observe(lastNotificationRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, loading, loadMore]);

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read_at)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read_at: new Date().toISOString() }))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return "💬";
      case "task":
        return "📋";
      case "meeting":
        return "📅";
      case "alert":
        return "⚠️";
      default:
        return "🔔";
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                Stay updated with your latest activities
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <Button
              onClick={handleMarkAllAsRead}
              className="gap-2 hover-glow"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card className="p-4 glass-effect">
          <div className="flex items-center justify-between">
            <Tabs
              value={filter}
              onValueChange={(v) => setFilter(v as "all" | "unread")}
            >
              <TabsList className="grid w-[250px] grid-cols-2">
                <TabsTrigger value="all" className="gap-2">
                  All
                  <Badge variant="secondary" className="text-xs">
                    {notifications.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="gap-2">
                  Unread
                  {unreadCount > 0 && (
                    <Badge variant="default" className="text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="p-12 text-center glass-effect">
            <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              {filter === "unread"
                ? "You're all caught up!"
                : "You don't have any notifications yet"}
            </p>
          </Card>
        ) : (
          filteredNotifications.map((notification, index) => (
            <Card
              key={notification.id}
              ref={
                index === filteredNotifications.length - 1
                  ? lastNotificationRef
                  : null
              }
              className={cn(
                "group p-4 transition-all duration-200 hover:shadow-lg glass-effect",
                !notification.read_at &&
                  "bg-primary/5 border-l-4 border-primary hover:bg-primary/10"
              )}
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xl">
                    {getNotificationIcon(notification.data.type)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base">
                        {notification.data.title}
                      </h3>
                      {!notification.read_at && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read_at && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="h-8 hover:text-primary"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Mark read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(notification.id)}
                        className="h-8 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge
                      variant="secondary"
                      className="text-xs capitalize mb-2"
                    >
                      {notification.data.type}
                    </Badge>

                    <p className="text-sm text-muted-foreground">
                      Chat ID: {notification.data.message.chat_id}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}

        {/* Loading indicator */}
        {loading && (
          <Card className="p-8 text-center glass-effect">
            <div className="flex items-center justify-center gap-3">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">
                Loading more notifications...
              </p>
            </div>
          </Card>
        )}

        {/* End of list */}
        {!hasMore && filteredNotifications.length > 0 && (
          <div className="text-center py-8">
            <Separator className="mb-4" />
            <p className="text-sm text-muted-foreground">
              You've reached the end
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
