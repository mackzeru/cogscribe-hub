export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
  skills: string[];
}

export interface Team {
  id: string;
  name: string;
  description: string;
  leadId: string;
  memberIds: string[];
  projectIds: string[];
  status: 'active' | 'inactive';
  createdDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamLeadId: string;
  teamId: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'blocked';
  progress: number;
  tasks: number;
  completedTasks: number;
  priority: 'low' | 'medium' | 'high';
  budget?: number;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  projectId: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  dueDate: string;
  createdDate: string;
  completedDate?: string;
  tags: string[];
  estimatedHours?: number;
  actualHours?: number;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  type: 'recurring' | 'one-time' | 'instant';
  projectId?: string;
  organizerId: string;
  attendeeIds: string[];
  date: string;
  duration: number; // in minutes
  agenda: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  summary?: string;
  decisions: string[];
  actionItems: ActionItem[];
  blockers: string[];
}

export interface ActionItem {
  id: string;
  description: string;
  assigneeId: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'blocked';
  meetingId: string;
}

export interface Update {
  id: string;
  title: string;
  content: string;
  authorId: string;
  entityType: 'project' | 'task' | 'meeting' | 'team';
  entityId: string;
  createdDate: string;
  type: 'progress' | 'status' | 'comment' | 'milestone';
  attachments?: string[];
}

// Form types for creating/editing
export interface CreateUserForm {
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
  skills: string[];
}

export interface CreateProjectForm {
  name: string;
  description: string;
  teamLeadId: string;
  teamId: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  tasks: number;
  completedTasks: number;
  budget?: number;
  tags: string[];
}

export interface CreateTaskForm {
  title: string;
  description: string;
  assigneeId: string;
  projectId: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  dueDate: string;
  createdDate: string;
  tags: string[];
  estimatedHours?: number;
}

export interface CreateMeetingForm {
  title: string;
  description: string;
  type: 'recurring' | 'one-time' | 'instant';
  projectId?: string;
  organizerId: string;
  attendeeIds: string[];
  date: string;
  duration: number;
  agenda: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  summary?: string;
  decisions: string[];
  actionItems: ActionItem[];
  blockers: string[];
}

export interface CreateTeamForm {
  name: string;
  description: string;
  leadId: string;
  memberIds: string[];
  projectIds: string[];
  status: 'active' | 'inactive';
  createdDate: string;
}

export interface CreateUpdateForm {
  title: string;
  content: string;
  authorId: string;
  entityType: 'project' | 'task' | 'meeting' | 'team';
  entityId: string;
  type: 'progress' | 'status' | 'comment' | 'milestone';
  attachments?: string[];
}