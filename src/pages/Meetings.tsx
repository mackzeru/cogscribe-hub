import { useState } from "react";
import { Plus, Calendar, Clock, Users, MessageSquare, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

// Mock data
const meetings = [
  {
    id: 1,
    title: "Weekly Team Sync",
    type: "recurring",
    project: "Project Alpha",
    date: "2024-01-22",
    time: "10:00 AM",
    duration: 30,
    attendees: [
      { name: "Sarah Chen", avatar: "/api/placeholder/32/32", initials: "SC" },
      { name: "Mike Johnson", avatar: "/api/placeholder/32/32", initials: "MJ" },
      { name: "Emma Wilson", avatar: "/api/placeholder/32/32", initials: "EW" },
    ],
    status: "completed",
    summary: "Discussed project progress, identified blockers, and planned next sprint.",
    actionItems: 5,
    decisions: 2,
  },
  {
    id: 2,
    title: "Project Alpha Review",
    type: "one-time",
    project: "Project Alpha",
    date: "2024-01-21",
    time: "2:00 PM",
    duration: 60,
    attendees: [
      { name: "Sarah Chen", avatar: "/api/placeholder/32/32", initials: "SC" },
      { name: "David Rodriguez", avatar: "/api/placeholder/32/32", initials: "DR" },
      { name: "Lisa Park", avatar: "/api/placeholder/32/32", initials: "LP" },
    ],
    status: "completed",
    summary: "Reviewed deliverables, discussed client feedback, and planned improvements.",
    actionItems: 8,
    decisions: 4,
  },
  {
    id: 3,
    title: "Client Feedback Session",
    type: "one-time",
    project: "Project Beta",
    date: "2024-01-20",
    time: "11:00 AM",
    duration: 45,
    attendees: [
      { name: "Mike Johnson", avatar: "/api/placeholder/32/32", initials: "MJ" },
      { name: "Emma Wilson", avatar: "/api/placeholder/32/32", initials: "EW" },
      { name: "Tom Wilson", avatar: "/api/placeholder/32/32", initials: "TW" },
      { name: "Anna Davis", avatar: "/api/placeholder/32/32", initials: "AD" },
    ],
    status: "completed",
    summary: "Gathered valuable feedback on the new features and UX improvements.",
    actionItems: 6,
    decisions: 3,
  },
  {
    id: 4,
    title: "Sprint Planning",
    type: "recurring",
    project: "Project Gamma",
    date: "2024-01-23",
    time: "9:00 AM",
    duration: 90,
    attendees: [
      { name: "Emma Wilson", avatar: "/api/placeholder/32/32", initials: "EW" },
      { name: "David Rodriguez", avatar: "/api/placeholder/32/32", initials: "DR" },
    ],
    status: "scheduled",
    summary: null,
    actionItems: 0,
    decisions: 0,
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "recurring":
      return "bg-primary/10 text-primary border-primary/20";
    case "one-time":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "instant":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "icog-status-done";
    case "scheduled":
      return "icog-status-progress";
    case "cancelled":
      return "icog-status-blocked";
    default:
      return "icog-status-todo";
  }
};

export default function Meetings() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 icog-animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">
            AI-powered meeting management and summaries
          </p>
        </div>
        <Button 
          className="icog-button-primary"
          onClick={() => navigate("/meetings/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search meetings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* AI Features Banner */}
      <Card className="icog-card icog-gradient-subtle border-primary/20">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">AI-Powered Meeting Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Automatic summaries, action items, and follow-up reminders
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Ready</span>
          </div>
        </CardContent>
      </Card>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => (
          <Card key={meeting.id} className="icog-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <CardTitle className="text-lg">{meeting.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{meeting.project}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getTypeColor(meeting.type)}>
                      {meeting.type}
                    </Badge>
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/meetings/${meeting.id}`)}
                >
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Meeting Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {meeting.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {meeting.time} ({meeting.duration}min)
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {meeting.attendees.length} attendees
                  </div>
                </div>

                {/* Attendees */}
                <div>
                  <p className="text-sm font-medium mb-2">Attendees</p>
                  <div className="flex -space-x-2">
                    {meeting.attendees.slice(0, 4).map((attendee, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={attendee.avatar} alt={attendee.name} />
                        <AvatarFallback className="text-xs">{attendee.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                    {meeting.attendees.length > 4 && (
                      <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-medium">
                          +{meeting.attendees.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Meeting Results */}
                {meeting.status === "completed" && (
                  <div>
                    <p className="text-sm font-medium mb-2">Meeting Results</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Action Items:</span>
                        <span className="font-medium">{meeting.actionItems}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Decisions:</span>
                        <span className="font-medium">{meeting.decisions}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {meeting.summary && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">{meeting.summary}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <Card className="icog-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No meetings found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Schedule your first AI-powered meeting"
                }
              </p>
              {!searchTerm && (
                <Button 
                  className="icog-button-primary"
                  onClick={() => navigate("/meetings/new")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}