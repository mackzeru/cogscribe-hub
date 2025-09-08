import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

// Mock data
const projects = [
  {
    id: 1,
    name: "Project Alpha",
    description: "Next-generation mobile app development",
    teamLead: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/32/32",
      initials: "SC"
    },
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    status: "active",
    progress: 65,
    tasks: 24,
    completedTasks: 16,
  },
  {
    id: 2,
    name: "Project Beta",
    description: "Customer portal redesign and optimization",
    teamLead: {
      name: "Mike Johnson",
      avatar: "/api/placeholder/32/32",
      initials: "MJ"
    },
    startDate: "2024-02-01",
    endDate: "2024-05-15",
    status: "planning",
    progress: 20,
    tasks: 18,
    completedTasks: 4,
  },
  {
    id: 3,
    name: "Project Gamma",
    description: "AI integration and automation suite",
    teamLead: {
      name: "Emma Wilson",
      avatar: "/api/placeholder/32/32",
      initials: "EW"
    },
    startDate: "2024-03-01",
    endDate: "2024-08-30",
    status: "active",
    progress: 45,
    tasks: 32,
    completedTasks: 14,
  },
  {
    id: 4,
    name: "Project Delta",
    description: "Security enhancement and compliance",
    teamLead: {
      name: "David Rodriguez",
      avatar: "/api/placeholder/32/32",
      initials: "DR"
    },
    startDate: "2024-01-01",
    endDate: "2024-04-30",
    status: "completed",
    progress: 100,
    tasks: 15,
    completedTasks: 15,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "icog-status-progress";
    case "completed":
      return "icog-status-done";
    case "planning":
      return "icog-status-todo";
    case "blocked":
      return "icog-status-blocked";
    default:
      return "icog-status-todo";
  }
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 icog-animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects in one place
          </p>
        </div>
        <Button 
          className="icog-button-primary"
          onClick={() => navigate("/projects/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
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

      {/* Projects Grid - Mobile/Tablet View */}
      <div className="grid gap-6 md:grid-cols-2 lg:hidden">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="icog-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/edit`)}>
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
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={project.teamLead.avatar} alt={project.teamLead.name} />
                    <AvatarFallback>{project.teamLead.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{project.teamLead.name}</p>
                    <p className="text-xs text-muted-foreground">Team Lead</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {project.completedTasks}/{project.tasks} tasks
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects Table - Desktop View */}
      <Card className="icog-card hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Team Lead</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.teamLead.avatar} alt={project.teamLead.name} />
                      <AvatarFallback>{project.teamLead.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{project.teamLead.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{project.startDate}</p>
                    <p className="text-muted-foreground">to {project.endDate}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{project.progress}%</span>
                      <span className="text-muted-foreground">
                        {project.completedTasks}/{project.tasks}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/edit`)}>
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

      {filteredProjects.length === 0 && (
        <Card className="icog-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first project"
                }
              </p>
              {!searchTerm && (
                <Button 
                  className="icog-button-primary"
                  onClick={() => navigate("/projects/new")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}