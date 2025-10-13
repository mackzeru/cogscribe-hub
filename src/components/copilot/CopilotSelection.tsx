import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Bot, Code, Briefcase, MessageSquare, LineChart, Search } from "lucide-react";

interface Copilot {
  id: string;
  name: string;
  description: string;
  specialties: string[];
  icon: any;
  color: string;
}

const copilots: Copilot[] = [
  {
    id: "dev-assistant",
    name: "Dev Assistant",
    description: "Helps with coding challenges, debugging, and technical architecture",
    specialties: ["Coding", "Debugging", "Architecture"],
    icon: Code,
    color: "text-blue-500",
  },
  {
    id: "project-manager",
    name: "Project Manager",
    description: "Assists with project planning, task management, and team coordination",
    specialties: ["Planning", "Management", "Coordination"],
    icon: Briefcase,
    color: "text-purple-500",
  },
  {
    id: "communication",
    name: "Communication Coach",
    description: "Improves team communication and meeting effectiveness",
    specialties: ["Communication", "Meetings", "Collaboration"],
    icon: MessageSquare,
    color: "text-green-500",
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Provides insights from data and helps with analytics",
    specialties: ["Analytics", "Insights", "Reporting"],
    icon: LineChart,
    color: "text-orange-500",
  },
  {
    id: "general",
    name: "General Assistant",
    description: "All-purpose AI copilot for various tasks and questions",
    specialties: ["General", "Versatile", "Adaptive"],
    icon: Bot,
    color: "text-indigo-500",
  },
];

interface CopilotSelectionProps {
  onSelect: (copilotId: string) => void;
}

export const CopilotSelection = ({ onSelect }: CopilotSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredCopilots = useMemo(() => {
    return copilots.filter((copilot) =>
      copilot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      copilot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      copilot.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredCopilots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCopilots = filteredCopilots.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search copilots..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-9"
        />
      </div>

      {/* Copilot Grid */}
      <div className="grid gap-4 md:grid-cols-2 min-h-[400px]">
        {paginatedCopilots.length > 0 ? (
          paginatedCopilots.map((copilot) => {
            const Icon = copilot.icon;
            return (
              <Card key={copilot.id} className="hover:border-primary transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className={`h-8 w-8 ${copilot.color}`} />
                    <div>
                      <CardTitle className="text-lg">{copilot.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>{copilot.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {copilot.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    onClick={() => onSelect(copilot.id)}
                    className="w-full"
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-2 flex items-center justify-center py-12 text-muted-foreground">
            No copilots found matching your search
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
