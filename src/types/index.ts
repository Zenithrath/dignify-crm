export type LeadCategory = 
  | 'Student Organization' 
  | 'Community' 
  | 'Personal Brand' 
  | 'UMKM Small' 
  | 'UMKM Medium' 
  | 'UMKM Large' 
  | 'Startup' 
  | 'Company' 
  | 'Education' 
  | 'Other';

export type LeadSource = 
  | 'Instagram' 
  | 'WhatsApp' 
  | 'Referral' 
  | 'Website' 
  | 'LinkedIn' 
  | 'Campus' 
  | 'Cold Outreach' 
  | 'Event' 
  | 'Other';

export type Priority = 'Low' | 'Medium' | 'High';

export type PipelineStage = 
  | 'Prospect' 
  | 'Contacted' 
  | 'Responded' 
  | 'Qualified' 
  | 'Meeting' 
  | 'Proposal' 
  | 'Negotiation' 
  | 'Won' 
  | 'Lost';

export type ActivityType = 
  | 'WhatsApp' 
  | 'Email' 
  | 'Phone Call' 
  | 'Meeting' 
  | 'Follow-up' 
  | 'Proposal' 
  | 'Internal Note' 
  | 'Status Change';

export type FollowUpStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Overdue';

export type ProjectStage = 
  | 'Waiting Brief' 
  | 'Discovery' 
  | 'Wireframe' 
  | 'UI Design' 
  | 'Development' 
  | 'Testing' 
  | 'Revision' 
  | 'Deployment' 
  | 'Completed';

export type ProjectStatus = 'Not Started' | 'On Track' | 'At Risk' | 'Delayed' | 'Completed';

export type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Completed' | 'Blocked';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type PaymentType = 'DP' | 'Milestone' | 'Final Payment' | 'Maintenance' | 'Other';

export type PaymentStatus = 'Pending' | 'Partial' | 'Paid' | 'Overdue' | 'Cancelled';

export type UserRole = 'Admin' | 'Member' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface Lead {
  id: string;
  businessName: string;
  contactPerson: string;
  whatsapp: string;
  email: string;
  instagramWebsite: string;
  category: LeadCategory;
  leadSource: LeadSource;
  interestedService: string;
  pic: string;
  estimatedValue: number;
  priority: Priority;
  pipelineStage: PipelineStage;
  lastContact: string;
  nextFollowUp: string;
  nextAction: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  leadId?: string;
  clientId?: string;
  type: ActivityType;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  leadId: string;
  date: string;
  time: string;
  action: string;
  pic: string;
  status: FollowUpStatus;
  notes: string;
}

export interface Client {
  id: string;
  businessName: string;
  contactPerson: string;
  whatsapp: string;
  email: string;
  industry: string;
  pic: string;
  clientSince: string;
  totalProjectValue: number;
  notes: string;
}

export interface Project {
  id: string;
  projectName: string;
  clientId: string;
  service: string;
  pic: string;
  teamMembers: string[];
  startDate: string;
  deadline: string;
  stage: ProjectStage;
  status: ProjectStatus;
  progress: number;
  projectValue: number;
  driveLink: string;
  notes: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export interface Service {
  id: string;
  category: string;
  serviceName: string;
  level: string;
  minimumPrice: number;
  maximumPrice: number;
  estimatedDuration: string;
  description: string;
  active: boolean;
}

export interface Payment {
  id: string;
  projectId: string;
  clientId: string;
  type: PaymentType;
  amount: number;
  dueDate: string;
  paidDate: string;
  status: PaymentStatus;
  paymentMethod: string;
  notes: string;
}

export interface DashboardData {
  totalLeads: number;
  qualifiedLeads: number;
  dealsWon: number;
  conversionRate: number;
  pipelineValue: number;
  activeProjects: number;
  revenueReceived: number;
  outstandingPayment: number;
  followUpsToday: number;
  overdueFollowUps: number;
  pipelineByStage: Record<PipelineStage, number>;
  monthlyRevenue: { month: string; revenue: number }[];
  leadBySource: Record<LeadSource, number>;
  upcomingActions: {
    type: string;
    title: string;
    date: string;
    leadId?: string;
    clientId?: string;
    projectId?: string;
  }[];
}

export interface AuditLog {
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  recordId: string;
  details: string;
}
