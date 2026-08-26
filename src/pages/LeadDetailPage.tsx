import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Phone, Mail, Globe, 
  MessageSquare, Calendar, Clock, Plus, ChevronRight
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
    description: 'Sent company profile portfolio',
    createdBy: 'Daniel',
    createdAt: '2026-08-25',
  },
  {
    id: 'ACT-2026-0002',
    leadId: 'LEAD-2026-0001',
    type: 'Internal Note',
    description: 'Lead interested in a company profile website. Budget around 75M.',
    createdBy: 'Daniel',
    createdAt: '2026-08-24',
  },
  {
    id: 'ACT-2026-0003',
    leadId: 'LEAD-2026-0001',
    type: 'Meeting',
    description: 'Initial discovery call - discussed requirements',
    createdBy: 'Daniel',
    createdAt: '2026-08-22',
  },
  {
    id: 'ACT-2026-0004',
    leadId: 'LEAD-2026-0001',
    type: 'Email',
    description: 'Sent introduction email with service catalog',
    createdBy: 'Daniel',
    createdAt: '2026-08-20',
  },
];

const activityTypeColors: Record<string, string> = {
  WhatsApp: 'bg-green-100 text-green-700',
  Email: 'bg-blue-100 text-blue-700',
  'Phone Call': 'bg-purple-100 text-purple-700',
  Meeting: 'bg-amber-100 text-amber-700',
  'Follow-up': 'bg-cyan-100 text-cyan-700',
  Proposal: 'bg-orange-100 text-orange-700',
  'Internal Note': 'bg-gray-100 text-gray-700',
  'Status Change': 'bg-indigo-100 text-indigo-700',
};

export function LeadDetailPage() {
  void useParams();
  const [showAddActivity, setShowAddActivity] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/leads" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">{mockLead.businessName}</h1>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
              {mockLead.pipelineStage}
            </span>
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
              {mockLead.priority}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{mockLead.id} · {mockLead.contactPerson}</p>
        </div>
        <div className="flex items-center gap-2">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Estimated Value</p>
              <p className="text-lg font-semibold text-gray-900">
                Rp {(mockLead.estimatedValue / 1000000).toFixed(0)}M
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">PIC</p>
              <p className="text-lg font-semibold text-gray-900">{mockLead.pic}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Source</p>
              <p className="text-lg font-semibold text-gray-900">{mockLead.leadSource}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Category</p>
              <p className="text-lg font-semibold text-gray-900">{mockLead.category}</p>
            </div>
          </div>

          {/* Next Action */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-medium text-gray-900">Next Action</h2>
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{mockLead.nextAction}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(mockLead.nextFollowUp).toLocaleString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Button size="sm" variant="secondary">Mark Complete</Button>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Activity Timeline</h2>
              <button
                onClick={() => setShowAddActivity(!showAddActivity)}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Activity
              </button>
            </div>

            {showAddActivity && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                    <option>WhatsApp</option>
                    <option>Email</option>
                    <option>Phone Call</option>
                    <option>Meeting</option>
                    <option>Internal Note</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowAddActivity(false)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <Button size="sm">Save Activity</Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {mockActivities.map((activity, idx) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {activity.createdBy.charAt(0)}
                      </span>
                    </div>
                    {idx < mockActivities.length - 1 && (
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{activity.createdBy}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${activityTypeColors[activity.type]}`}>
                        {activity.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleDateString('en-GB', { 
                          day: 'numeric', month: 'short', year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${mockLead.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-500">{mockLead.whatsapp}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
              <a
                href={`mailto:${mockLead.email}`}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-xs text-gray-500">{mockLead.email}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
              {mockLead.instagramWebsite && (
                <a
                  href={`https://${mockLead.instagramWebsite}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Globe className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Website</p>
                    <p className="text-xs text-gray-500">{mockLead.instagramWebsite}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </a>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Interested Service</span>
                <span className="text-sm text-gray-900">{mockLead.interestedService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Contact</span>
                <span className="text-sm text-gray-900">
                  {new Date(mockLead.lastContact).toLocaleDateString('en-GB', { 
                    day: 'numeric', month: 'short', year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Created</span>
                <span className="text-sm text-gray-900">
                  {new Date(mockLead.createdAt).toLocaleDateString('en-GB', { 
                    day: 'numeric', month: 'short', year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Notes</h3>
            <p className="text-sm text-gray-700">{mockLead.notes}</p>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="secondary">
                Change Stage
              </Button>
              <Button className="w-full justify-start" variant="secondary">
                Edit Lead
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                Convert to Client
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
