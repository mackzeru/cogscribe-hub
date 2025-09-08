import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const tasks = [
  {
    id: 1,
    title: "Implement user authentication",
    description: "Set up OAuth2 login system with Google and Microsoft",
    assignee: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/32/32",
      initials: "SC"
    },
    project: "Project Alpha",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-25",
    createdDate: "2024-01-15",
    tags: ["backend", "security"],
  },
  {
    id: 2,
    title: "Design onboarding flow",
    description: "Create wireframes and mockups for new user onboarding",
    assignee: {
      name: "Emma Wilson",
      avatar: "/api/placeholder/32/32",
      initials: "EW"
    },
    project: "Project Beta",
    priority: "medium",
    status: "todo",
    dueDate: "2024-01-28",
    createdDate: "2024-01-18",
    tags: ["design", "ux"],
  },
  {
    id: 3,
    title: "Fix API response caching",
    description: "Resolve performance issues with cached API responses",
    assignee: {
      name: "Mike Johnson",
      avatar: "/api/placeholder/32/32",
      initials: "MJ"
    },
    project: "Project Alpha",
    priority: "high",
    status: "blocked",
    dueDate: "2024-01-24",
    createdDate: "2024-01-10",
    tags: ["backend", "performance"],
  },
  {
    id: 4,
    title: "Update documentation",
    description: "Update API documentation with latest endpoints",
    assignee: {
      name: "David Rodriguez",
      avatar: "/api/placeholder/32/32",
      initials: "DR"
    },
    project: "Project Gamma",
    priority: "low",
    status: "done",
    dueDate: "2024-01-20",
    createdDate: "2024-01-12",
    tags: ["documentation"],
  },
  {
    id: 5,
    title: "Mobile responsive testing",
    description: "Test and fix mobile responsiveness across different devices",
    assignee: {
      name: "Emma Wilson",
      avatar: "/api/placeholder/32/32",
      initials: "EW"
    },
    project: "Project Beta",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-01-30",
    createdDate: "2024-01-16",
    tags: ["frontend", "testing"],
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    case "low":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "todo":
      return "icog-status-todo";
    case "in-progress":
      return "icog-status-progress";
    case "done":
      return "icog-status-done";
    case "blocked":
      return "icog-status-blocked";
    default:
      return "icog-status-todo";
  }
};

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 icog-animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Track and manage all project tasks
          </p>
        </div>
        <Button className="icog-button-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
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

      {/* Tasks Grid - Mobile View */}
      <div className="grid gap-4 lg:hidden">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="icog-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {task.description}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                      <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{task.assignee.name}</span>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status.replace('-', ' ')}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Due {task.dueDate}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {task.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground">
                  {task.project}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tasks Table - Desktop View */}
      <Card className="icog-card hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="max-w-md">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                      <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{task.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{task.project}</span>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{task.dueDate}</span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredTasks.length === 0 && (
        <Card className="icog-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Create your first task to get started"
                }
              </p>
              {!searchTerm && (
                <Button className="icog-button-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}