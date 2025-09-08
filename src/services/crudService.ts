import { 
  User, Team, Project, Task, Meeting, Update, 
  CreateUserForm, CreateProjectForm, CreateTaskForm, 
  CreateMeetingForm, CreateTeamForm, CreateUpdateForm 
} from "@/types";
import { 
  mockUsers, mockTeams, mockProjects, mockTasks, 
  mockMeetings, mockUpdates 
} from "@/data/mockData";

// In-memory storage (in a real app, this would be API calls)
let users = [...mockUsers];
let teams = [...mockTeams];
let projects = [...mockProjects];
let tasks = [...mockTasks];
let meetings = [...mockMeetings];
let updates = [...mockUpdates];

// Generic CRUD operations
export class CrudService<T extends { id: string }, C> {
  constructor(private data: T[]) {}

  // Create
  create(item: C): T {
    const id = Math.random().toString(36).substr(2, 9);
    const newItem = { id, ...item } as unknown as T;
    this.data.push(newItem);
    return newItem;
  }

  // Read
  getAll(): T[] {
    return [...this.data];
  }

  getById(id: string): T | undefined {
    return this.data.find(item => item.id === id);
  }

  // Update
  update(id: string, updates: Partial<T>): T | null {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    this.data[index] = { ...this.data[index], ...updates };
    return this.data[index];
  }

  // Delete
  delete(id: string): boolean {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this.data.splice(index, 1);
    return true;
  }

  // Search
  search(query: string, fields: (keyof T)[]): T[] {
    if (!query.trim()) return this.getAll();
    
    const lowerQuery = query.toLowerCase();
    return this.data.filter(item =>
      fields.some(field => {
        const value = item[field];
        return String(value).toLowerCase().includes(lowerQuery);
      })
    );
  }

  // Filter
  filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }
}

// Service instances
export const userService = new CrudService<User, CreateUserForm>(users);
export const teamService = new CrudService<Team, CreateTeamForm>(teams);
export const projectService = new CrudService<Project, CreateProjectForm>(projects);
export const taskService = new CrudService<Task, CreateTaskForm>(tasks);
export const meetingService = new CrudService<Meeting, CreateMeetingForm>(meetings);
export const updateService = new CrudService<Update, CreateUpdateForm>(updates);

// Utility functions
export const getUserById = (id: string): User | undefined => userService.getById(id);
export const getTeamById = (id: string): Team | undefined => teamService.getById(id);
export const getProjectById = (id: string): Project | undefined => projectService.getById(id);

// Enhanced queries
export const getTasksByProject = (projectId: string): Task[] => 
  taskService.filter(task => task.projectId === projectId);

export const getTasksByAssignee = (assigneeId: string): Task[] => 
  taskService.filter(task => task.assigneeId === assigneeId);

export const getMeetingsByProject = (projectId: string): Meeting[] => 
  meetingService.filter(meeting => meeting.projectId === projectId);

export const getUpdatesByEntity = (entityType: string, entityId: string): Update[] => 
  updateService.filter(update => update.entityType === entityType && update.entityId === entityId);

export const getTeamMembers = (teamId: string): User[] => {
  const team = getTeamById(teamId);
  if (!team) return [];
  return team.memberIds.map(id => getUserById(id)).filter(Boolean) as User[];
};

export const getUserTasks = (userId: string): Task[] => 
  taskService.filter(task => task.assigneeId === userId);

export const getUserMeetings = (userId: string): Meeting[] => 
  meetingService.filter(meeting => 
    meeting.organizerId === userId || meeting.attendeeIds.includes(userId)
  );

// Statistics
export const getProjectStats = (projectId: string) => {
  const project = getProjectById(projectId);
  const projectTasks = getTasksByProject(projectId);
  const projectMeetings = getMeetingsByProject(projectId);
  
  return {
    project,
    totalTasks: projectTasks.length,
    completedTasks: projectTasks.filter(t => t.status === 'done').length,
    inProgressTasks: projectTasks.filter(t => t.status === 'in-progress').length,
    blockedTasks: projectTasks.filter(t => t.status === 'blocked').length,
    totalMeetings: projectMeetings.length,
    completedMeetings: projectMeetings.filter(m => m.status === 'completed').length,
  };
};

export const getUserStats = (userId: string) => {
  const userTasks = getUserTasks(userId);
  const userMeetings = getUserMeetings(userId);
  
  return {
    totalTasks: userTasks.length,
    completedTasks: userTasks.filter(t => t.status === 'done').length,
    pendingTasks: userTasks.filter(t => t.status !== 'done').length,
    totalMeetings: userMeetings.length,
    upcomingMeetings: userMeetings.filter(m => 
      m.status === 'scheduled' && new Date(m.date) > new Date()
    ).length,
  };
};

// Custom create functions with validation
export const createProject = (data: Omit<CreateProjectForm, 'status' | 'progress' | 'tasks' | 'completedTasks'>): Project => {
  const newProject = projectService.create({
    ...data,
    status: 'planning' as const,
    progress: 0,
    tasks: 0,
    completedTasks: 0,
  });
  
  // Add activity update
  updateService.create({
    title: `Project Created: ${data.name}`,
    content: `New project "${data.name}" has been created and assigned to team.`,
    authorId: data.teamLeadId,
    entityType: 'project',
    entityId: newProject.id,
    type: 'status'
  });
  
  return newProject;
};

export const createTask = (data: Omit<CreateTaskForm, 'status' | 'createdDate'>): Task => {
  const newTask = taskService.create({
    ...data,
    status: 'todo' as const,
    createdDate: new Date().toISOString(),
  });
  
  // Update project task count
  const project = getProjectById(data.projectId);
  if (project) {
    projectService.update(project.id, {
      tasks: project.tasks + 1
    });
  }
  
  // Add activity update
  updateService.create({
    title: `Task Created: ${data.title}`,
    content: `New task "${data.title}" has been assigned to ${getUserById(data.assigneeId)?.name}.`,
    authorId: data.assigneeId,
    entityType: 'task',
    entityId: newTask.id,
    type: 'status'
  });
  
  return newTask;
};

export const updateTaskStatus = (taskId: string, status: Task['status']): Task | null => {
  const task = taskService.getById(taskId);
  if (!task) return null;
  
  const wasCompleted = task.status === 'done';
  const isNowCompleted = status === 'done';
  
  const updatedTask = taskService.update(taskId, { 
    status,
    completedDate: isNowCompleted ? new Date().toISOString() : undefined
  });
  
  if (!updatedTask) return null;
  
  // Update project completed task count
  const project = getProjectById(task.projectId);
  if (project) {
    let completedTasks = project.completedTasks;
    if (!wasCompleted && isNowCompleted) {
      completedTasks += 1;
    } else if (wasCompleted && !isNowCompleted) {
      completedTasks -= 1;
    }
    
    const progress = Math.round((completedTasks / project.tasks) * 100);
    projectService.update(project.id, { completedTasks, progress });
  }
  
  // Add activity update
  updateService.create({
    title: `Task Status Updated: ${task.title}`,
    content: `Task status changed to "${status}".`,
    authorId: task.assigneeId,
    entityType: 'task',
    entityId: taskId,
    type: 'status'
  });
  
  return updatedTask;
};