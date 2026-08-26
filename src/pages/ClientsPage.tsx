import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
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
  const [showNewClient, setShowNewClient] = useState(false);

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Clients</h1>
          <p className="text-[13px] text-dark-400 mt-1">
            {mockClients.length} active clients
          </p>
        </div>
        <Button onClick={() => setShowNewClient(true)}>
          <Plus className="w-4 h-4 mr-1.5" />
          Add Client
        </Button>
      </div>

      <div className="card p-3.5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input type="text" placeholder="Search clients..." className="input !pl-11" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockClients.map((client) => (
          <Link key={client.id} to={`/clients/${client.id}`} className="card-hover group p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#A89AE8]/20 border border-[#A89AE8]/30 text-[#A89AE8] font-extrabold flex items-center justify-center">
                  {client.businessName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground">{client.businessName}</h3>
                  <p className="text-xs font-medium text-dark-400">{client.contactPerson}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#D8FF3F] transition-colors" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <Phone className="w-4 h-4 text-[#D8FF3F]" />
                {client.whatsapp}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <Mail className="w-4 h-4 text-[#4CD7E0]" />
                {client.email}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm font-extrabold text-foreground">
                Rp {(client.totalProjectValue / 1000000).toFixed(0)}M
              </span>
              <span className="badge-lav">{client.industry}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* New Client Modal */}
      <Modal
        isOpen={showNewClient}
        onClose={() => setShowNewClient(false)}
        title="Add Client"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowNewClient(false)}>Cancel</Button>
            <Button size="sm">Save Client</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Business Name</label>
            <input type="text" placeholder="PT Berkah Sejahtera" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Contact Person</label>
              <input type="text" placeholder="Rudi Hartono" className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Industry</label>
              <input type="text" placeholder="Manufacturing" className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">WhatsApp</label>
              <input type="text" placeholder="6281111222333" className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Email</label>
              <input type="email" placeholder="rudi@berkah.co.id" className="input" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">PIC</label>
            <select className="select" defaultValue="">
              <option value="" disabled className="bg-dark-800">Select PIC</option>
              <option value="Daniel" className="bg-dark-800">Daniel</option>
              <option value="Ignas" className="bg-dark-800">Ignas</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Notes</label>
            <textarea rows={3} placeholder="Client notes..." className="input !rounded-xl" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
