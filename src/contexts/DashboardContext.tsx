import { createContext, useContext, useState, type ReactNode } from 'react';

// ─── User Profile ───────────────────────────────────────────────────────────────
export interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  employeeId: string;
  department: string;
}

const defaultUser: UserProfile = {
  name: 'Ignas Prasetyo',
  role: 'Creative Director',
  email: 'ignas@dignify.co.id',
  phone: '+62 812-3456-7890',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  employeeId: 'DGN-001',
  department: 'Creative & Design',
};

// ─── Analytics ──────────────────────────────────────────────────────────────────
export interface AnalyticsData {
  projectsAccepted: number;
  projectsCompleted: number;
  contentPublished: number;
  contentPending: number;
  tasksDone: number;
  tasksPending: number;
  newClients: number;
  followUpsPending: number;
}

const mockAnalytics: AnalyticsData = {
  projectsAccepted: 3,
  projectsCompleted: 2,
  contentPublished: 12,
  contentPending: 8,
  tasksDone: 18,
  tasksPending: 12,
  newClients: 4,
  followUpsPending: 6,
};

// ─── Projects ───────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold';
  progress: number;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  tasksTotal: number;
  tasksDone: number;
}

const mockProjects: Project[] = [
  { id: 'p-1', name: 'Website Redesign', client: 'PT Maju Jaya', status: 'In Progress', progress: 65, deadline: '2026-09-15', priority: 'High', tasksTotal: 24, tasksDone: 16 },
  { id: 'p-2', name: 'Brand Identity Pack', client: 'Lumina Studio', status: 'Review', progress: 90, deadline: '2026-09-01', priority: 'Medium', tasksTotal: 12, tasksDone: 11 },
  { id: 'p-3', name: 'Social Media Content', client: 'Nike Indonesia', status: 'In Progress', progress: 40, deadline: '2026-09-30', priority: 'High', tasksTotal: 30, tasksDone: 12 },
  { id: 'p-4', name: 'Mobile App UI/UX', client: 'Arasaka Corp', status: 'Planning', progress: 10, deadline: '2026-10-20', priority: 'Low', tasksTotal: 40, tasksDone: 4 },
  { id: 'p-5', name: 'Product Photography', client: 'ACME Industries', status: 'Completed', progress: 100, deadline: '2026-08-20', priority: 'Medium', tasksTotal: 8, tasksDone: 8 },
];

// ─── Content Schedule (This Week) ───────────────────────────────────────────────
export interface ContentWeekItem {
  id: string;
  title: string;
  platform: string;
  project: string;
  writing: 'Done' | 'In Progress' | 'Todo';
  editing: 'Done' | 'In Progress' | 'Todo' | '—';
  uploading: 'Done' | 'In Progress' | 'Todo' | '—';
  scheduledDate: string;
}

const mockContentWeek: ContentWeekItem[] = [
  { id: 'cw-1', title: 'Tips Productivity WFH', platform: 'Instagram', project: 'Social Media Content', writing: 'Done', editing: 'Done', uploading: 'In Progress', scheduledDate: '2026-08-28' },
  { id: 'cw-2', title: 'Behind the Scene Office', platform: 'Instagram', project: 'Social Media Content', writing: 'Done', editing: 'In Progress', uploading: '—', scheduledDate: '2026-08-29' },
  { id: 'cw-3', title: 'Client Testimonial Video', platform: 'TikTok', project: 'Brand Identity Pack', writing: 'In Progress', editing: '—', uploading: '—', scheduledDate: '2026-08-30' },
  { id: 'cw-4', title: 'Carousel Design Process', platform: 'LinkedIn', project: 'Website Redesign', writing: 'Todo', editing: '—', uploading: '—', scheduledDate: '2026-09-01' },
  { id: 'cw-5', title: 'Product Launch Announcement', platform: 'Instagram', project: 'Nike Indonesia', writing: 'Done', editing: 'Done', uploading: 'Done', scheduledDate: '2026-08-27' },
];

// ─── Content Schedule (This Month) ──────────────────────────────────────────────
export interface ContentMonthItem {
  id: string;
  title: string;
  platform: string;
  pic: string;
  status: 'Published' | 'In Design' | 'Drafting' | 'Scheduled' | 'Todo';
  dueDate: string;
}

const mockContentMonth: ContentMonthItem[] = [
  { id: 'cm-1', title: 'Instagram Feed August', platform: 'Instagram', pic: 'Ignas', status: 'Published', dueDate: '2026-08-31' },
  { id: 'cm-2', title: 'TikTok Reels Series', platform: 'TikTok', pic: 'Daniel', status: 'In Design', dueDate: '2026-09-07' },
  { id: 'cm-3', title: 'LinkedIn Article', platform: 'LinkedIn', pic: 'Ignas', status: 'Drafting', dueDate: '2026-09-10' },
  { id: 'cm-4', title: 'Brand Guidelines Update', platform: 'Instagram', pic: 'Sarah', status: 'Scheduled', dueDate: '2026-09-15' },
  { id: 'cm-5', title: 'Monthly Report Design', platform: 'LinkedIn', pic: 'Daniel', status: 'Todo', dueDate: '2026-09-30' },
  { id: 'cm-6', title: 'Client Portfolio Carousel', platform: 'Instagram', pic: 'Ignas', status: 'In Design', dueDate: '2026-09-12' },
];

// ─── Social Media ───────────────────────────────────────────────────────────────
export interface SocialMedia {
  id: string;
  platform: string;
  handle: string;
  followers: string;
  engagement: string;
  postsThisWeek: number;
  pendingPosts: number;
  status: 'Good' | 'Needs Attention' | 'Low';
}

const mockSocial: SocialMedia[] = [
  { id: 'sm-1', platform: 'Instagram', handle: '@dignify.co', followers: '12.4K', engagement: '4.8%', postsThisWeek: 5, pendingPosts: 2, status: 'Good' },
  { id: 'sm-2', platform: 'TikTok', handle: '@dignify', followers: '8.2K', engagement: '6.1%', postsThisWeek: 3, pendingPosts: 4, status: 'Needs Attention' },
  { id: 'sm-3', platform: 'LinkedIn', handle: 'Dignify Creative', followers: '3.1K', engagement: '2.4%', postsThisWeek: 2, pendingPosts: 1, status: 'Low' },
];

// ─── Client Contacts ────────────────────────────────────────────────────────────
export interface ClientContact {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'Active' | 'Lead' | 'Inactive';
  lastContact: string;
  followUp: string;
  followUpDate: string;
}

const mockClients: ClientContact[] = [
  { id: 'c-1', name: 'Jessie Caballero', company: 'Microsoft', role: 'Product Manager', email: 'jessie@microsoft.com', phone: '(205) 555-0100', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', status: 'Active', lastContact: '2 hours ago', followUp: 'Send final proposal', followUpDate: '2026-08-28' },
  { id: 'c-2', name: 'Jane Doe', company: 'Nike', role: 'Marketing Manager', email: 'jane@nike.com', phone: '(415) 555-0199', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80', status: 'Active', lastContact: '1 day ago', followUp: 'Schedule technical demo', followUpDate: '2026-08-30' },
  { id: 'c-3', name: 'Jack Donovan', company: 'ACME', role: 'CEO', email: 'jack@acme-corp.io', phone: '(312) 555-8832', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80', status: 'Lead', lastContact: '3 days ago', followUp: 'Follow up after call', followUpDate: '2026-08-29' },
  { id: 'c-4', name: 'Barry White', company: 'Arasaka', role: 'CEO', email: 'barry@arasaka.corp', phone: '(212) 555-7741', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80', status: 'Active', lastContact: '5 days ago', followUp: 'Review contract draft', followUpDate: '2026-09-01' },
  { id: 'c-5', name: 'Lisa Gun', company: 'Lumina Studio', role: 'Creative Director', email: 'lisa@lumina.design', phone: '(310) 555-9012', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80', status: 'Lead', lastContact: '1 week ago', followUp: 'Send product catalog', followUpDate: '2026-09-02' },
];

// ─── Todos ──────────────────────────────────────────────────────────────────────
export interface TodoItem {
  id: string;
  title: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed';
  dueDate: string;
  done: boolean;
}

const mockTodos: TodoItem[] = [
  { id: 'td-1', title: 'Design homepage wireframe', assignee: 'Ignas', priority: 'High', status: 'In Progress', dueDate: '2026-08-28', done: false },
  { id: 'td-2', title: 'Write copy for IG content', assignee: 'Ignas', priority: 'Medium', status: 'Todo', dueDate: '2026-08-30', done: false },
  { id: 'td-3', title: 'Client meeting prep', assignee: 'Daniel', priority: 'High', status: 'Review', dueDate: '2026-08-27', done: false },
  { id: 'td-4', title: 'Send proposal to PT Maju Jaya', assignee: 'Daniel', priority: 'Urgent', status: 'Todo', dueDate: '2026-08-26', done: false },
  { id: 'td-5', title: 'Upload Instagram content', assignee: 'Ignas', priority: 'Medium', status: 'Completed', dueDate: '2026-08-25', done: true },
];

// ─── Leads (kept for sidebar worklist) ──────────────────────────────────────────
export interface LeadItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  priority: 'High' | 'Mid' | 'Low';
  temperature: 'Warm' | 'Hot' | 'Cold';
  dealValue: string;
  statusText: string;
}

const mockLeads: LeadItem[] = [
  { id: 'lead-1', name: 'Jessie Caballero', role: 'Product Manager', company: 'Microsoft', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', priority: 'High', temperature: 'Warm', dealValue: '$25,000', statusText: 'Awaiting proposal' },
  { id: 'lead-2', name: 'Jane Doe', role: 'Marketing Manager', company: 'Nike', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', priority: 'High', temperature: 'Hot', dealValue: '$48,000', statusText: 'Schedule demo' },
  { id: 'lead-3', name: 'Jack Donovan', role: 'CEO', company: 'ACME', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80', priority: 'Mid', temperature: 'Warm', dealValue: '$18,500', statusText: 'Phone call' },
  { id: 'lead-4', name: 'Barry White', role: 'CEO', company: 'Arasaka', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80', priority: 'Low', temperature: 'Cold', dealValue: '$72,000', statusText: 'Follow up' },
  { id: 'lead-5', name: 'Lisa Gun', role: 'Creative Director', company: 'Lumina Studio', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80', priority: 'Mid', temperature: 'Warm', dealValue: '$12,400', statusText: 'Schedule meeting' },
];

// ─── Context ────────────────────────────────────────────────────────────────────
interface DashboardContextType {
  user: UserProfile;
  analytics: AnalyticsData;
  projects: Project[];
  contentWeek: ContentWeekItem[];
  contentMonth: ContentMonthItem[];
  socialMedia: SocialMedia[];
  clientContacts: ClientContact[];
  leadList: LeadItem[];
  selectedLeadId: string;
  setSelectedLeadId: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  toggleTodo: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedLeadId, setSelectedLeadId] = useState('lead-1');
  const [leadList] = useState<LeadItem[]>(mockLeads);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [todos, setTodos] = useState<TodoItem[]>(mockTodos);

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        user: defaultUser,
        analytics: mockAnalytics,
        projects: mockProjects,
        contentWeek: mockContentWeek,
        contentMonth: mockContentMonth,
        socialMedia: mockSocial,
        clientContacts: mockClients,
        leadList,
        selectedLeadId,
        setSelectedLeadId,
        sidebarOpen,
        setSidebarOpen,
        todos,
        setTodos,
        toggleTodo,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
