import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Plus, FolderKanban, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Client, Project, Payment } from '../types';

const mockClient: Client = {
  id: 'CLI-2026-0001',
  businessName: 'PT Berkah Sejahtera',
  contactPerson: 'Rudi Hartono',
  whatsapp: '6281111222333',
  email: 'rudi@berkah.co.id',
  industry: 'Manufacturing',
  pic: 'Daniel',
  clientSince: '2026-07-15',
  totalProjectValue: 85000000,
  notes: 'Long-term client, multiple projects',
};

const mockProjects: Project[] = [
  {
    id: 'PRJ-2026-0001',
    projectName: 'PT Berkah - Company Profile',
    clientId: 'CLI-2026-0001',
    service: 'Website Development',
    pic: 'Daniel',
    teamMembers: ['Daniel', 'Ignas'],
    startDate: '2026-07-20',
    deadline: '2026-09-15',
    stage: 'Development',
    status: 'On Track',
    progress: 65,
    projectValue: 85000000,
    driveLink: 'https://drive.google.com/folder/berkah',
    notes: 'Corporate website with 5 pages',
  },
];

const mockPayments: Payment[] = [
  {
    id: 'PAY-2026-0001',
    projectId: 'PRJ-2026-0001',
    clientId: 'CLI-2026-0001',
    type: 'DP',
    amount: 25000000,
    dueDate: '2026-07-25',
    paidDate: '2026-07-24',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    notes: 'DP received via BCA',
  },
  {
    id: 'PAY-2026-0002',
    projectId: 'PRJ-2026-0001',
    clientId: 'CLI-2026-0001',
    type: 'Milestone',
    amount: 30000000,
    dueDate: '2026-08-30',
    paidDate: '',
    status: 'Pending',
    paymentMethod: '',
    notes: 'Second milestone after design approval',
  },
];

const stageColors: Record<string, string> = {
  'Waiting Brief': 'bg-gray-100 text-gray-700',
  'Discovery': 'bg-blue-100 text-blue-700',
  'Wireframe': 'bg-purple-100 text-purple-700',
  'UI Design': 'bg-pink-100 text-pink-700',
  'Development': 'bg-amber-100 text-amber-700',
  'Testing': 'bg-cyan-100 text-cyan-700',
  'Revision': 'bg-orange-100 text-orange-700',
  'Deployment': 'bg-green-100 text-green-700',
  'Completed': 'bg-green-500 text-white',
};

const statusColors: Record<string, string> = {
  'Not Started': 'bg-gray-100 text-gray-600',
  'On Track': 'bg-green-100 text-green-700',
  'At Risk': 'bg-amber-100 text-amber-700',
  'Delayed': 'bg-red-100 text-red-700',
  'Completed': 'bg-green-500 text-white',
};

const paymentStatusColors: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Partial: 'bg-blue-100 text-blue-700',
  Paid: 'bg-green-100 text-green-700',
  Overdue: 'bg-red-100 text-red-700',
  Cancelled: 'bg-gray-100 text-gray-600',
};

export function ClientDetailPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/clients" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{mockClient.businessName}</h1>
          <p className="text-sm text-gray-500 mt-1">{mockClient.id} · {mockClient.contactPerson}</p>
        </div>
        <Button variant="secondary" size="sm">Edit Client</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Value</p>
                  <p className="text-lg font-semibold text-gray-900">
                    Rp {(mockClient.totalProjectValue / 1000000).toFixed(0)}M
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <FolderKanban className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Projects</p>
                  <p className="text-lg font-semibold text-gray-900">{mockProjects.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Outstanding</p>
                  <p className="text-lg font-semibold text-gray-900">
                    Rp {(mockPayments.filter(p => p.status !== 'Paid').reduce((sum, p) => sum + p.amount, 0) / 1000000).toFixed(0)}M
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Projects</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                New Project
              </Button>
            </div>
            <div className="space-y-3">
              {mockProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{project.projectName}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[project.stage] || ''}`}>
                        {project.stage}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status] || ''}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{project.service}</span>
                    <span>·</span>
                    <span>Rp {(project.projectValue / 1000000).toFixed(0)}M</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gray-900 h-1.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Payments</h2>
              <Button size="sm" variant="secondary">
                <Plus className="w-4 h-4 mr-1.5" />
                Record Payment
              </Button>
            </div>
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase pb-2">Payment</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase pb-2">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase pb-2">Due</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="py-3">
                      <p className="text-sm font-medium text-gray-900">{payment.type}</p>
                      <p className="text-xs text-gray-500">{payment.id}</p>
                    </td>
                    <td className="py-3 text-sm text-gray-700">
                      Rp {(payment.amount / 1000000).toFixed(0)}M
                    </td>
                    <td className="py-3 text-sm text-gray-700">
                      {new Date(payment.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentStatusColors[payment.status] || ''}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${mockClient.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-500">{mockClient.whatsapp}</p>
                </div>
              </a>
              <a
                href={`mailto:${mockClient.email}`}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-xs text-gray-500">{mockClient.email}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Industry</span>
                <span className="text-sm text-gray-900">{mockClient.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">PIC</span>
                <span className="text-sm text-gray-900">{mockClient.pic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Client Since</span>
                <span className="text-sm text-gray-900">
                  {new Date(mockClient.clientSince).toLocaleDateString('en-GB', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Notes</h3>
            <p className="text-sm text-gray-700">{mockClient.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
