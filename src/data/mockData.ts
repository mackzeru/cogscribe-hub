import { User, Team, Project, Task, Meeting, Update, ActionItem } from "@/types";

// Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@icog.com",
    avatar: "/api/placeholder/32/32",
    initials: "SC",
    role: "Project Manager",
    department: "Engineering",
    status: "active",
    joinDate: "2023-01-15",
    skills: ["Project Management", "Agile", "Leadership", "Strategic Planning"]
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.johnson@icog.com",
    avatar: "/api/placeholder/32/32",
    initials: "MJ",
    role: "Senior Developer",
    department: "Engineering",
    status: "active",
    joinDate: "2022-08-20",
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"]
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.wilson@icog.com",
    avatar: "/api/placeholder/32/32",
    initials: "EW",
    role: "UI/UX Designer",
    department: "Design",
    status: "active",
    joinDate: "2023-03-10",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"]
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david.rodriguez@icog.com",
    avatar: "/api/placeholder/32/32",
    initials: "DR",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "active",
    joinDate: "2022-11-05",
    skills: ["Docker", "Kubernetes", "CI/CD", "Monitoring", "Security"]
  },
  {
    id: "5",
    name: "Lisa Park",
    email: "lisa.park@icog.com",
    avatar: "/api/placeholder/32/32",
    initials: "LP",
    role: "Product Manager",
    department: "Product",
    status: "active",
    joinDate: "2023-02-01",
    skills: ["Product Strategy", "Analytics", "User Stories", "Roadmapping"]
  }
];

// Teams
export const mockTeams: Team[] = [
  {
    id: "1",
    name: "Alpha Team",
    description: "Mobile app development team focused on next-generation features",
    leadId: "1",
    memberIds: ["1", "2", "3"],
    projectIds: ["1", "2"],
    status: "active",
    createdDate: "2023-01-01"
  },
  {
    id: "2",
    name: "Beta Team",
    description: "Web platform team handling customer portal and dashboard",
    leadId: "5",
    memberIds: ["5", "4", "3"],
    projectIds: ["3"],
    status: "active",
    createdDate: "2023-02-01"
  },
  {
    id: "3",
    name: "Gamma Team",
    description: "AI and automation specialists working on intelligent features",
    leadId: "2",
    memberIds: ["2", "4"],
    projectIds: ["4"],
    status: "active",
    createdDate: "2023-03-01"
  }
];

// Projects
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Project Alpha",
    description: "Next-generation mobile app development",
    teamLeadId: "1",
    teamId: "1",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    status: "active",
    progress: 65,
    tasks: 24,
    completedTasks: 16,
    priority: "high",
    budget: 150000,
    tags: ["mobile", "react-native", "ios", "android"]
  },
  {
    id: "2",
    name: "Project Beta",
    description: "Customer portal redesign and optimization",
    teamLeadId: "5",
    teamId: "2",
    startDate: "2024-02-01",
    endDate: "2024-05-15",
    status: "planning",
    progress: 20,
    tasks: 18,
    completedTasks: 4,
    priority: "medium",
    budget: 80000,
    tags: ["web", "react", "redesign", "ux"]
  },
  {
    id: "3",
    name: "Project Gamma",
    description: "AI integration and automation suite",
    teamLeadId: "2",
    teamId: "3",
    startDate: "2024-03-01",
    endDate: "2024-08-30",
    status: "active",
    progress: 45,
    tasks: 32,
    completedTasks: 14,
    priority: "high",
    budget: 200000,
    tags: ["ai", "automation", "machine-learning", "api"]
  },
  {
    id: "4",
    name: "Project Delta",
    description: "Security enhancement and compliance",
    teamLeadId: "4",
    teamId: "3",
    startDate: "2024-01-01",
    endDate: "2024-04-30",
    status: "completed",
    progress: 100,
    tasks: 15,
    completedTasks: 15,
    priority: "high",
    budget: 60000,
    tags: ["security", "compliance", "audit", "infrastructure"]
  }
];

// Tasks
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Implement user authentication",
    description: "Set up OAuth2 login system with Google and Microsoft",
    assigneeId: "1",
    projectId: "1",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-25",
    createdDate: "2024-01-15",
    tags: ["backend", "security", "auth"],
    estimatedHours: 16,
    actualHours: 12
  },
  {
    id: "2",
    title: "Design onboarding flow",
    description: "Create wireframes and mockups for new user onboarding",
    assigneeId: "3",
    projectId: "2",
    priority: "medium",
    status: "todo",
    dueDate: "2024-01-28",
    createdDate: "2024-01-18",
    tags: ["design", "ux", "wireframes"],
    estimatedHours: 20
  },
  {
    id: "3",
    title: "Fix API response caching",
    description: "Resolve performance issues with cached API responses",
    assigneeId: "2",
    projectId: "1",
    priority: "high",
    status: "blocked",
    dueDate: "2024-01-24",
    createdDate: "2024-01-10",
    tags: ["backend", "performance", "caching"],
    estimatedHours: 8,
    actualHours: 6
  },
  {
    id: "4",
    title: "Update documentation",
    description: "Update API documentation with latest endpoints",
    assigneeId: "4",
    projectId: "3",
    priority: "low",
    status: "done",
    dueDate: "2024-01-20",
    createdDate: "2024-01-12",
    completedDate: "2024-01-19",
    tags: ["documentation", "api"],
    estimatedHours: 4,
    actualHours: 3
  },
  {
    id: "5",
    title: "Mobile responsive testing",
    description: "Test and fix mobile responsiveness across different devices",
    assigneeId: "3",
    projectId: "2",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-01-30",
    createdDate: "2024-01-16",
    tags: ["frontend", "testing", "mobile"],
    estimatedHours: 12,
    actualHours: 8
  }
];

// Action Items
export const mockActionItems: ActionItem[] = [
  {
    id: "1",
    description: "Follow up with client on feature requirements",
    assigneeId: "1",
    dueDate: "2024-01-26",
    status: "pending",
    meetingId: "1"
  },
  {
    id: "2",
    description: "Update project timeline based on new scope",
    assigneeId: "5",
    dueDate: "2024-01-28",
    status: "pending",
    meetingId: "1"
  },
  {
    id: "3",
    description: "Review security audit recommendations",
    assigneeId: "4",
    dueDate: "2024-01-25",
    status: "completed",
    meetingId: "2"
  }
];

// Meetings
export const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Weekly Team Sync",
    description: "Regular team sync to discuss progress and blockers",
    type: "recurring",
    projectId: "1",
    organizerId: "1",
    attendeeIds: ["1", "2", "3", "4", "5"],
    date: "2024-01-24T10:00:00Z",
    duration: 60,
    agenda: ["Project updates", "Blocker review", "Sprint planning"],
    status: "completed",
    summary: "Discussed project progress and upcoming deadlines. Identified two blockers that need immediate attention.",
    decisions: ["Move sprint demo to Friday", "Increase testing phase by 2 days"],
    actionItems: mockActionItems.filter(item => item.meetingId === "1"),
    blockers: ["API integration delays", "Waiting for design approval"]
  },
  {
    id: "2",
    title: "Project Alpha Review",
    description: "Monthly project review and stakeholder update",
    type: "one-time",
    projectId: "1",
    organizerId: "1",
    attendeeIds: ["1", "2", "5"],
    date: "2024-01-23T14:00:00Z",
    duration: 90,
    agenda: ["Progress review", "Budget update", "Risk assessment"],
    status: "completed",
    summary: "Reviewed deliverables and next steps. Project is on track with minor adjustments needed.",
    decisions: ["Approved additional resources for Q2", "Extended testing phase"],
    actionItems: mockActionItems.filter(item => item.meetingId === "2"),
    blockers: []
  },
  {
    id: "3",
    title: "Client Feedback Session",
    description: "Gather feedback on latest prototype",
    type: "one-time",
    organizerId: "5",
    attendeeIds: ["5", "3", "1"],
    date: "2024-01-22T11:00:00Z",
    duration: 120,
    agenda: ["Demo latest features", "Collect feedback", "Discuss next iteration"],
    status: "completed",
    summary: "Gathered feedback on latest features. Overall positive response with some minor UI adjustments requested.",
    decisions: ["Implement suggested UI changes", "Schedule follow-up demo"],
    actionItems: [],
    blockers: []
  },
  {
    id: "4",
    title: "Sprint Planning",
    description: "Plan tasks for upcoming sprint",
    type: "recurring",
    projectId: "2",
    organizerId: "5",
    attendeeIds: ["5", "3", "4"],
    date: "2024-01-25T09:00:00Z",
    duration: 90,
    agenda: ["Review backlog", "Estimate tasks", "Assign work"],
    status: "scheduled",
    summary: "",
    decisions: [],
    actionItems: [],
    blockers: []
  }
];

// Updates
export const mockUpdates: Update[] = [
  {
    id: "1",
    title: "Project Alpha Progress Update",
    content: "Completed user authentication module and started work on dashboard redesign. On track for Q1 delivery.",
    authorId: "1",
    entityType: "project",
    entityId: "1",
    createdDate: "2024-01-24T09:00:00Z",
    type: "progress"
  },
  {
    id: "2",
    title: "Task Completed: API Documentation",
    content: "Successfully updated all API documentation with the latest endpoints and examples.",
    authorId: "4",
    entityType: "task",
    entityId: "4",
    createdDate: "2024-01-19T16:30:00Z",
    type: "status"
  },
  {
    id: "3",
    title: "Team Alpha Milestone",
    content: "Team successfully delivered the authentication system ahead of schedule.",
    authorId: "1",
    entityType: "team",
    entityId: "1",
    createdDate: "2024-01-23T14:15:00Z",
    type: "milestone"
  },
  {
    id: "4",
    title: "Design Review Comments",
    content: "Initial feedback on the onboarding flow designs. Overall direction looks good, suggest minor adjustments to the color scheme.",
    authorId: "5",
    entityType: "task",
    entityId: "2",
    createdDate: "2024-01-22T11:45:00Z",
    type: "comment"
  },
  {
    id: "5",
    title: "Weekly Meeting Summary",
    content: "Key decisions made: Sprint extension approved, additional resources allocated for testing phase.",
    authorId: "1",
    entityType: "meeting",
    entityId: "1",
    createdDate: "2024-01-24T11:00:00Z",
    type: "progress"
  }
];