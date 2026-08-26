import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Plus, FolderKanban, DollarSign, ChevronRight, Wallet } from 'lucide-react';
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

const stageBadge: Record<string, string> = {
  'Development': 'badge-lime',
  'Completed': 'badge-mint',
};

const statusBadge: Record<string, string> = {
  'On Track': 'badge-mint',
  'At Risk': 'badge-coral',
};

const paymentBadge: Record<string, string> = {
  Paid: 'badge-mint',
  Pending: 'badge-lime',
  Overdue: 'badge-coral',
};

export function ClientDetailPage() {
  const outstanding = mockPayments.filter((p) => p.status !== 'Paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/clients" className="icon-btn" aria-label="Back">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-lg font-extrabold flex items-center justify-center flex-shrink-0">
            {mockClient.businessName.charAt(0)}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold text-foreground truncate">
              {mockClient.businessName}
            </h1>
            <p className="text-sm font-medium text-dark-400">
              {mockClient.id} · {mockClient.contactPerson}
            </p>
          </div>
        </div>
        <Button variant="secondary" size="sm">Edit Client</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Pastel stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="pastel-mint !p-5">
              <div className="flex items-start justify-between">
                <p className="text-xs font-bold text-teal-400/60">Total Value</p>
                <DollarSign className="w-4 h-4 text-teal-400/40" />
              </div>
              <p className="text-2xl font-extrabold text-foreground mt-4">
                Rp {(mockClient.totalProjectValue / 1000000).toFixed(0)}M
              </p>
            </div>
            <div className="pastel-sky !p-5">
              <div className="flex items-start justify-between">
                <p className="text-xs font-bold text-sky-400/60">Projects</p>
                <FolderKanban className="w-4 h-4 text-sky-400/40" />
              </div>
              <p className="text-2xl font-extrabold text-foreground mt-4">{mockProjects.length}</p>
            </div>
            <div className="pastel-coral !p-5">
              <div className="flex items-start justify-between">
                <p className="text-xs font-bold text-red-400/60">Outstanding</p>
                <Wallet className="w-4 h-4 text-red-400/40" />
              </div>
              <p className="text-2xl font-extrabold text-foreground mt-4">Rp {(outstanding / 1000000).toFixed(0)}M</p>
            </div>
          </div>

          {/* Projects */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold text-foreground">Projects</h2>
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
                  className="block p-4 rounded-2xl bg-dark-900 border border-border hover:bg-dark-750 hover:border-border transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <h3 className="font-bold text-foreground">{project.projectName}</h3>
                    <div className="flex items-center gap-2">
                      <span className={stageBadge[project.stage] || 'badge-gray'}>{project.stage}</span>
                      <span className={statusBadge[project.status] || 'badge-gray'}>{project.status}</span>
                      <ChevronRight className="w-4 h-4 text-dark-500 group-hover:text-teal-400" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-dark-400">
                    <span>{project.service}</span>
                    <span>·</span>
                    <span className="font-extrabold text-foreground">
                      Rp {(project.projectValue / 1000000).toFixed(0)}M
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-dark-400">Progress</span>
                      <span className="text-[11px] font-extrabold text-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 h-1.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold text-foreground">Payments</h2>
              <Button size="sm" variant="secondary">
                <Plus className="w-4 h-4 mr-1.5" />
                Record Payment
              </Button>
            </div>
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="table-header !px-0">Payment</th>
                  <th className="table-header">Amount</th>
                  <th className="table-header">Due</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {mockPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="table-cell !px-0">
                      <p className="font-bold text-foreground">{payment.type}</p>
                      <p className="text-xs font-medium text-dark-400">{payment.id}</p>
                    </td>
                    <td className="table-cell font-extrabold text-foreground">
                      Rp {(payment.amount / 1000000).toFixed(0)}M
                    </td>
                    <td className="table-cell text-dark-300">
                      {new Date(payment.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="table-cell">
                      <span className={paymentBadge[payment.status] || 'badge-gray'}>{payment.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-4">Contact Information</h3>
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/${mockClient.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/15 hover:bg-teal-500/15 transition-colors cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-foreground" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">WhatsApp</p>
                  <p className="text-xs font-medium text-dark-400 truncate">{mockClient.whatsapp}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-dark-500" />
              </a>
              <a
                href={`mailto:${mockClient.email}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/15 hover:bg-sky-500/15 transition-colors cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-foreground" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">Email</p>
                  <p className="text-xs font-medium text-dark-400 truncate">{mockClient.email}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-dark-500" />
              </a>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-4">Details</h3>
            <div className="space-y-3">
              {[
                { label: 'Industry', value: mockClient.industry },
                { label: 'PIC', value: mockClient.pic },
                {
                  label: 'Client Since',
                  value: new Date(mockClient.clientSince).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }),
                },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-dark-400">{row.label}</span>
                  <span className="text-sm font-bold text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-3">Notes</h3>
            <p className="text-sm font-medium text-dark-200">{mockClient.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
