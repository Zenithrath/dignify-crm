import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Phone, Mail, Globe, MessageSquare,
  Calendar, Clock, Plus, ChevronRight,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Activity } from '../types';

const mockLead = {
  id: 'LEAD-2026-0001',
  businessName: 'PT Maju Jaya',
  contactPerson: 'Budi Santoso',
  whatsapp: '628123456789',
  email: 'budi@majujaya.com',
  instagramWebsite: 'majujaya.com',
  category: 'Company',
  leadSource: 'Instagram',
  interestedService: 'Website Development',
  pic: 'Daniel',
  estimatedValue: 75000000,
  priority: 'High',
  pipelineStage: 'Proposal',
  lastContact: '2026-08-25',
  nextFollowUp: '2026-08-26T14:00',
  nextAction: 'Send proposal document',
  notes: 'Interested in corporate website',
  createdAt: '2026-08-20',
  updatedAt: '2026-08-25',
};

const mockActivities: Activity[] = [
  {
    id: 'ACT-2026-0001',
    leadId: 'LEAD-2026-0001',
    type: 'WhatsApp',
    description: 'Sent company profile portfolio.',
    createdBy: 'Daniel',
    createdAt: '2026-08-25',
  },
  {
    id: 'ACT-2026-0002',
    leadId: 'LEAD-2026-0001',
    type: 'Internal Note',
    description: 'Lead interested in a company profile website.',
    createdBy: 'Daniel',
    createdAt: '2026-08-24',
  },
  {
    id: 'ACT-2026-0003',
    leadId: 'LEAD-2026-0001',
    type: 'Meeting',
    description: 'Initial discovery call — discussed requirements.',
    createdBy: 'Daniel',
    createdAt: '2026-08-22',
  },
  {
    id: 'ACT-2026-0004',
    leadId: 'LEAD-2026-0001',
    type: 'Email',
    description: 'Sent introduction email with service catalog.',
    createdBy: 'Daniel',
    createdAt: '2026-08-20',
  },
];

const activityBadge: Record<string, string> = {
  WhatsApp: 'badge-mint',
  Email: 'badge-sky',
  'Phone Call': 'badge-lav',
  Meeting: 'badge-lime',
  'Follow-up': 'badge-mint',
  Proposal: 'badge-coral',
  'Internal Note': 'badge-gray',
  'Status Change': 'badge-lav',
};

export function LeadDetailPage() {
  const [showAddActivity, setShowAddActivity] = useState(false);

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/leads" className="icon-btn" aria-label="Back">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-extrabold text-ink dark:text-foreground">
              {mockLead.businessName}
            </h1>
            <span className="badge-lime">{mockLead.pipelineStage}</span>
            <span className="badge-coral">{mockLead.priority}</span>
          </div>
          <p className="text-sm font-medium text-ink/40 dark:text-dark-400 mt-0.5">
            {mockLead.id} · {mockLead.contactPerson}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" size="sm">
            <Calendar className="w-4 h-4 mr-1.5" />
            Schedule Follow-up
          </Button>
          <Button size="sm">
            <MessageSquare className="w-4 h-4 mr-1.5" />
            Add Activity
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Pastel summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-xl rounded-[22px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#D8FF3F]" />
                <p className="text-[11px] font-medium text-white/70">Estimated Value</p>
              </div>
              <p className="text-xl font-extrabold text-white tracking-tight">Rp {(mockLead.estimatedValue / 1000000).toFixed(0)}M</p>
            </div>
            <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-xl rounded-[22px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#4CD7E0]" />
                <p className="text-[11px] font-medium text-white/70">PIC</p>
              </div>
              <p className="text-xl font-extrabold text-white tracking-tight">{mockLead.pic}</p>
            </div>
            <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-xl rounded-[22px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#FF5A5A]" />
                <p className="text-[11px] font-medium text-white/70">Source</p>
              </div>
              <p className="text-xl font-extrabold text-white tracking-tight">{mockLead.leadSource}</p>
            </div>
            <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-xl rounded-[22px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#A89AE8]" />
                <p className="text-[11px] font-medium text-white/70">Category</p>
              </div>
              <p className="text-xl font-extrabold text-white tracking-tight">{mockLead.category}</p>
            </div>
          </div>

          {/* Next action */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-extrabold text-foreground">Next Action</h2>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-[20px] bg-[#1C1E26]/50 border border-white/[0.05]">
              <div>
                <p className="font-bold text-foreground">{mockLead.nextAction}</p>
                <p className="text-xs font-semibold text-dark-300 mt-0.5">
                  {new Date(mockLead.nextFollowUp).toLocaleString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Button size="sm" variant="primary">
                Mark Complete
              </Button>
            </div>
          </div>

          {/* Activity timeline */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold text-foreground">Activity Timeline</h2>
              <button
                onClick={() => setShowAddActivity(!showAddActivity)}
                className="text-sm font-bold text-[#D8FF3F] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Activity
              </button>
            </div>

            {showAddActivity && (
              <div className="mb-5 p-4 rounded-[18px] bg-[#1C1E26]/50 border border-white/[0.05]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <select className="select" defaultValue="WhatsApp">
                    {['WhatsApp', 'Email', 'Phone Call', 'Meeting', 'Internal Note'].map((t) => (
                      <option key={t} className="bg-dark-800">{t}</option>
                    ))}
                  </select>
                  <input type="text" placeholder="Description" className="input" />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowAddActivity(false)}
                    className="px-4 py-2 text-sm font-bold text-white/60 hover:bg-white/[0.05] rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button size="sm">Save Activity</Button>
                </div>
              </div>
            )}

            <div className="space-y-1">
              {mockActivities.map((activity, idx) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-extrabold text-white/80">
                        {activity.createdBy.charAt(0)}
                      </span>
                    </div>
                    {idx < mockActivities.length - 1 && (
                      <div className="w-0.5 flex-1 bg-white/[0.06] my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-5">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-foreground text-sm">{activity.createdBy}</span>
                      <span className={activityBadge[activity.type]}>{activity.type}</span>
                      <span className="text-xs font-semibold text-dark-500">
                        {new Date(activity.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-dark-200">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Contact */}
          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-4">Contact Information</h3>
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/${mockLead.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-[18px] bg-[#1C1E26]/50 border border-white/[0.05] hover:bg-white/[0.04] transition-colors cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-full bg-[#D8FF3F] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-black" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">WhatsApp</p>
                  <p className="text-xs font-medium text-dark-400 truncate">{mockLead.whatsapp}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-dark-500 group-hover:text-teal-400" />
              </a>
              <a
                href={`mailto:${mockLead.email}`}
                className="flex items-center gap-3 p-3.5 rounded-[18px] bg-[#1C1E26]/50 border border-white/[0.05] hover:bg-white/[0.04] transition-colors cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-full bg-[#4CD7E0] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-black" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">Email</p>
                  <p className="text-xs font-medium text-dark-400 truncate">{mockLead.email}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-dark-500 group-hover:text-sky-400" />
              </a>
              <a
                href={`https://${mockLead.instagramWebsite}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-[18px] bg-[#1C1E26]/50 border border-white/[0.05] hover:bg-white/[0.04] transition-colors cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-full bg-[#A89AE8] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-black" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">Website</p>
                  <p className="text-xs font-medium text-dark-400 truncate">{mockLead.instagramWebsite}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-dark-500 group-hover:text-purple-400" />
              </a>
            </div>
          </div>

          {/* Details */}
          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-4">Details</h3>
            <div className="space-y-3">
              {[
                { label: 'Interested Service', value: mockLead.interestedService },
                { label: 'Last Contact', value: new Date(mockLead.lastContact).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) },
                { label: 'Created', value: new Date(mockLead.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-dark-400">{row.label}</span>
                  <span className="text-sm font-bold text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-3">Notes</h3>
            <p className="text-sm font-medium text-dark-200">{mockLead.notes}</p>
          </div>

          {/* Actions */}
          <div className="card p-3.5 space-y-2">
            <Button variant="secondary" className="w-full justify-start !rounded-2xl">
              Change Stage
            </Button>
            <Button variant="secondary" className="w-full justify-start !rounded-2xl">
              Edit Lead
            </Button>
            <Button variant="mint" className="w-full justify-start !rounded-2xl">
              Convert to Client
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
