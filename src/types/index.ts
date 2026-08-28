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

export type WorkType = 'Paid Outbound' | 'Paid Inbound' | 'Collab';

export const WORK_TYPES: WorkType[] = ['Paid Outbound', 'Paid Inbound', 'Collab'];

export const WORK_STAGES: Record<WorkType, string[]> = {
  'Paid Outbound': ['Analisis', 'Riset Bisnis', 'Approval Team', 'Development', 'Penawaran', 'Deal'],
  'Paid Inbound': ['Request', 'Brief', 'Development', 'Deploy'],
  Collab: ['Cari Potensi', 'Ajakan Kerja Sama', 'Brief & Meeting', 'Agreement', 'Production'],
};

export interface Work {
  id: string;
  name: string;
  type: WorkType;
  partner: string;
  pic: string;
  teamMembers: string[];
  value: number;
  benefit: string;
  startDate: string;
  deadline: string;
  stage: string;
  driveLink: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ── Pipeline & Deal ───────────────────────────────────────────────────────────

export type DealType = 'Paid Outbound' | 'Paid Inbound' | 'Kerjasama-Engagement';

export type DealStage =
  | 'Prospecting'
  | 'Approval Internal'
  | 'Development'
  | 'Review'
  | 'Deploy';

export type InvoiceStatus = 'Belum ditagih' | 'Ditagih' | 'Lunas';

export type TestimonialStatus = 'Belum diminta' | 'Diminta' | 'Diterima';

export interface DealInvoice {
  nominal: number;
  status: InvoiceStatus;
  jatuhTempo: string;
}

export interface DealMaintenance {
  active: boolean;
  catatanRequest: string;
}

export interface DealTestimonial {
  status: TestimonialStatus;
  linkOrText: string;
}

export interface DealActivity {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface Deal {
  id: string;
  namaKlien: string;
  tipe: DealType;
  estimasiValue: number;
  pic: string;
  deadline: string;
  nextAction: string;
  stage: DealStage;
  briefFile?: string;
  catatan: string;
  invoice?: DealInvoice;
  maintenance?: DealMaintenance;
  testimonial?: DealTestimonial;
  activities: DealActivity[];
  createdAt: string;
  updatedAt: string;
}

export const DEAL_STAGES: DealStage[] = [
  'Prospecting',
  'Approval Internal',
  'Development',
  'Review',
  'Deploy',
];

export const DEAL_TYPES: DealType[] = [
  'Paid Outbound',
  'Paid Inbound',
  'Kerjasama-Engagement',
];

// ── Progress Development ─────────────────────────────────────────────────────

export type DevRole = 'Web Dev' | 'UI/UX' | 'n8n Automation' | 'SEO';

export type DevStatus = 'Belum mulai' | 'Progress' | 'Review' | 'Selesai';

export interface DevTask {
  id: string;
  title: string;
  done: boolean;
}

export interface DevSwimlane {
  role: DevRole;
  status: DevStatus;
  pic: string;
  progress: number;
  tasks: DevTask[];
  catatanTerakhir: string;
}

export interface DevProject {
  id: string;
  namaProject: string;
  namaKlien: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  swimlanes: DevSwimlane[];
}

export const DEV_ROLES: DevRole[] = ['Web Dev', 'UI/UX', 'n8n Automation', 'SEO'];

export const DEV_STATUSES: DevStatus[] = ['Belum mulai', 'Progress', 'Review', 'Selesai'];

// ── Progress Content ─────────────────────────────────────────────────────────

export type ContentPlatform = 'Instagram' | 'TikTok' | 'LinkedIn' | 'YouTube';

export type ContentKanbanStage =
  | 'Ide'
  | 'Draft copy'
  | 'Menunggu ACC Ignas'
  | 'Desain'
  | 'Review'
  | 'Terjadwal'
  | 'Published';

export type ContentType = 'Feed' | 'Reels' | 'Story' | 'Carousel' | 'Video' | 'Article';

export interface ContentComment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export interface ContentItem {
  id: string;
  title: string;
  platform: ContentPlatform;
  tipe?: ContentType;
  captionWriter?: string;
  designer?: string;
  stage?: ContentKanbanStage;
  publishDate?: string;
  caption?: string;
  comments?: ContentComment[];
  createdAt?: string;
  updatedAt?: string;
  designPic?: string;
  editorPic?: string;
  copywriter?: string;
  status?: string;
  notes?: string;
  isLive?: boolean;
}

export interface Rotation {
  designPic: string;
  designQuarter: string;
  editorPic: string;
  editorWeekStart: string;
  weeklyTarget: number;
}

export interface PlatformPerformance {
  platform: ContentPlatform;
  followers: number;
  engagement: number;
  postsPerWeek: number;
  postsPending: number;
  growth: number;
}

export const CONTENT_PLATFORMS: ContentPlatform[] = ['Instagram', 'TikTok', 'LinkedIn', 'YouTube'];

export const CONTENT_KANBAN_STAGES: ContentKanbanStage[] = [
  'Ide',
  'Draft copy',
  'Menunggu ACC Ignas',
  'Desain',
  'Review',
  'Terjadwal',
  'Published',
];

export const CONTENT_TYPES: ContentType[] = ['Feed', 'Reels', 'Story', 'Carousel', 'Video', 'Article'];

// ── Follow-up WhatsApp ──────────────────────────────────────────────────────

export type WAStatus = 'Nunggu respon' | 'Sudah dibalas' | 'Perlu follow-up';

export interface WAMessage {
  id: string;
  sender: 'client' | 'humas';
  text: string;
  timestamp: string;
}

export interface WAConversation {
  id: string;
  namaKlien: string;
  nomorWA: string;
  lastMessage: string;
  status: WAStatus;
  picHumas: string;
  lastChatAt: string;
  unread: number;
  messages: WAMessage[];
}

export const WA_STATUSES: WAStatus[] = ['Nunggu respon', 'Sudah dibalas', 'Perlu follow-up'];
