import { Link } from 'react-router-dom';
import { Search, Plus, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Client } from '../types';

const mockClients: Client[] = [
  {
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
  },
  {
    id: 'CLI-2026-0002',
    businessName: 'Klinik Sehat Plus',
    contactPerson: 'Dr. Maya',
    whatsapp: '6284444555666',
    email: 'maya@sehatplus.id',
    industry: 'Healthcare',
    pic: 'Ignas',
    clientSince: '2026-08-01',
    totalProjectValue: 45000000,
    notes: 'Website redesign project',
  },
];

export function ClientsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Clients</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockClients.length} active clients</p>
        </div>
        <Button className="bg-gradient-to-r from-accent-teal to-accent-green hover:from-accent-teal/90 hover:to-accent-green/90 text-white border-0">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Client
        </Button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search clients..."
            className="input pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockClients.map((client) => (
          <Link
            key={client.id}
            to={`/clients/${client.id}`}
            className="card-hover p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{client.businessName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{client.contactPerson}</p>
              </div>
              <span className="text-xs bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                {client.industry}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 text-green-500" />
                {client.whatsapp}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-blue-500" />
                {client.email}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Projects: Rp {(client.totalProjectValue / 1000000).toFixed(0)}M</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">Since {new Date(client.clientSince).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
