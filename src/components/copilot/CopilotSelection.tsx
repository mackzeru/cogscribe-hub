import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Code, Briefcase, MessageSquare, LineChart } from "lucide-react";

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
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {copilots.map((copilot) => {
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
      })}
    </div>
  );
};
