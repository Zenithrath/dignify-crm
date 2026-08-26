import { z } from 'zod';

export const leadSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  whatsapp: z.string().min(1, 'WhatsApp is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  instagramWebsite: z.string().optional(),
  category: z.enum([
    'Student Organization',
    'Community',
    'Personal Brand',
    'UMKM Small',
    'UMKM Medium',
    'UMKM Large',
    'Startup',
    'Company',
    'Education',
    'Other',
  ]),
  leadSource: z.enum([
    'Instagram',
    'WhatsApp',
    'Referral',
    'Website',
    'LinkedIn',
    'Campus',
    'Cold Outreach',
    'Event',
    'Other',
  ]),
  interestedService: z.string().optional(),
  pic: z.string().min(1, 'PIC is required'),
  estimatedValue: z.number().min(0, 'Value must be positive'),
  priority: z.enum(['Low', 'Medium', 'High']),
  pipelineStage: z.enum([
    'Prospect',
    'Contacted',
    'Responded',
    'Qualified',
    'Meeting',
    'Proposal',
    'Negotiation',
    'Won',
    'Lost',
  ]),
  nextFollowUp: z.string().optional(),
  nextAction: z.string().optional(),
  notes: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const clientSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  whatsapp: z.string().min(1, 'WhatsApp is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  industry: z.string().min(1, 'Industry is required'),
  pic: z.string().min(1, 'PIC is required'),
  notes: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

export const projectSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  clientId: z.string().min(1, 'Client is required'),
  service: z.string().min(1, 'Service is required'),
  pic: z.string().min(1, 'PIC is required'),
  teamMembers: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  deadline: z.string().min(1, 'Deadline is required'),
  stage: z.enum([
    'Waiting Brief',
    'Discovery',
    'Wireframe',
    'UI Design',
    'Development',
    'Testing',
    'Revision',
    'Deployment',
    'Completed',
  ]),
  status: z.enum(['Not Started', 'On Track', 'At Risk', 'Delayed', 'Completed']),
  projectValue: z.number().min(0, 'Value must be positive'),
  driveLink: z.string().optional(),
  notes: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  projectId: z.string().optional(),
  assignedTo: z.string().min(1, 'Assignee is required'),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  status: z.enum(['Todo', 'In Progress', 'Review', 'Completed', 'Blocked']),
  dueDate: z.string().min(1, 'Due date is required'),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const paymentSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  clientId: z.string().min(1, 'Client is required'),
  type: z.enum(['DP', 'Milestone', 'Final Payment', 'Maintenance', 'Other']),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  dueDate: z.string().min(1, 'Due date is required'),
  paidDate: z.string().optional(),
  status: z.enum(['Pending', 'Partial', 'Paid', 'Overdue', 'Cancelled']),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

export const activitySchema = z.object({
  leadId: z.string().optional(),
  clientId: z.string().optional(),
  type: z.enum([
    'WhatsApp',
    'Email',
    'Phone Call',
    'Meeting',
    'Follow-up',
    'Proposal',
    'Internal Note',
    'Status Change',
  ]),
  description: z.string().min(1, 'Description is required'),
});

export type ActivityFormData = z.infer<typeof activitySchema>;

export const followUpSchema = z.object({
  leadId: z.string().min(1, 'Lead is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().optional(),
  action: z.string().min(1, 'Action is required'),
  pic: z.string().min(1, 'PIC is required'),
  status: z.enum(['Scheduled', 'Completed', 'Cancelled', 'Overdue']),
  notes: z.string().optional(),
});

export type FollowUpFormData = z.infer<typeof followUpSchema>;
