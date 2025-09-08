import { useState } from "react";
import { Plus, Search, Filter, Mail, Phone, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Developer",
    department: "Engineering",
    avatar: "/api/placeholder/64/64",
    initials: "SC",
    status: "active",
    projects: ["Project Alpha", "Project Gamma"],
    joinDate: "2023-01-15",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "+1 (555) 234-5678",
    role: "Product Manager",
    department: "Product",
    avatar: "/api/placeholder/64/64",
    initials: "MJ",
    status: "active",
    projects: ["Project Beta", "Project Alpha"],
    joinDate: "2022-08-20",
    skills: ["Product Strategy", "Analytics", "Agile"],
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.wilson@company.com",
    phone: "+1 (555) 345-6789",
    role: "UX Designer",
    department: "Design",
    avatar: "/api/placeholder/64/64",
    initials: "EW",
    status: "active",
    projects: ["Project Gamma", "Project Beta"],
    joinDate: "2023-03-10",
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david.rodriguez@company.com",
    phone: "+1 (555) 456-7890",
    role: "DevOps Engineer",
    department: "Engineering",
    avatar: "/api/placeholder/64/64",
    initials: "DR",
    status: "active",
    projects: ["Project Delta"],
    joinDate: "2022-11-05",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
];

const getRoleColor = (role: string) => {
  switch (role.toLowerCase()) {
    case "senior developer":
    case "developer":
      return "bg-primary/10 text-primary border-primary/20";
    case "product manager":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "ux designer":
    case "designer":
      return "bg-success/10 text-success border-success/20";
    case "devops engineer":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function Team() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 icog-animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members and their roles
          </p>
        </div>
        <Button className="icog-button-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
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

      {/* Team Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="icog-card">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-end mb-2">
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
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-lg icog-gradient-bg text-white">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <Badge className={getRoleColor(member.role)}>
                {member.role}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    {member.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    {member.phone}
                  </div>
                </div>

                {/* Department */}
                <div>
                  <p className="text-sm font-medium mb-1">Department</p>
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                </div>

                {/* Projects */}
                <div>
                  <p className="text-sm font-medium mb-2">Active Projects</p>
                  <div className="flex flex-wrap gap-1">
                    {member.projects.map((project, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-sm font-medium mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Join Date */}
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Joined {member.joinDate}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="mr-1 h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="mr-1 h-3 w-3" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card className="icog-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">No team members found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Add your first team member to get started"
                }
              </p>
              {!searchTerm && (
                <Button className="icog-button-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}