import { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import type { Service } from '../types';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

const mockServices: Service[] = [
  { id: 'SRV-001', category: 'Web Development', serviceName: 'Company Profile Website', level: 'Standard', minimumPrice: 50000000, maximumPrice: 150000000, estimatedDuration: '2-4 weeks', description: 'Professional company profile website', active: true },
  { id: 'SRV-002', category: 'Web Development', serviceName: 'E-Commerce Website', level: 'Premium', minimumPrice: 100000000, maximumPrice: 300000000, estimatedDuration: '4-8 weeks', description: 'Full-featured online store', active: true },
  { id: 'SRV-003', category: 'Design', serviceName: 'Instagram Content Package', level: 'Starter', minimumPrice: 5000000, maximumPrice: 15000000, estimatedDuration: '1 month', description: '12 posts + 20 stories per month', active: true },
  { id: 'SRV-004', category: 'Design', serviceName: 'Brand Identity', level: 'Standard', minimumPrice: 15000000, maximumPrice: 40000000, estimatedDuration: '2-3 weeks', description: 'Logo, colors, typography guide', active: true },
  { id: 'SRV-005', category: 'Automation', serviceName: 'N8N Workflow Setup', level: 'Custom', minimumPrice: 10000000, maximumPrice: 50000000, estimatedDuration: '1-2 weeks', description: 'Custom automation workflows', active: false },
  { id: 'SRV-006', category: 'Consulting', serviceName: 'Digital Strategy', level: 'Premium', minimumPrice: 20000000, maximumPrice: 50000000, estimatedDuration: '1 week', description: 'Business digital transformation plan', active: true },
];

const categoryBadge: Record<string, string> = {
  'Web Development': 'badge-orange', Design: 'badge-lav', Automation: 'badge-sky', Consulting: 'badge-gold',
};

export function ServicesPage() {
  const [showNewService, setShowNewService] = useState(false);

  return (
    <div className="space-y-4 max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-xl font-extrabold text-foreground">Services</h1>
        <Button variant="primary" size="sm" onClick={() => setShowNewService(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Service
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {mockServices.map((s) => (
          <div key={s.id} className="card glass p-4 group hover:border-border transition-all">
            <div className="flex items-start justify-between mb-2">
              <span className={categoryBadge[s.category] || 'badge-gray'}>{s.category}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="icon-btn !w-6 !h-6 !rounded" aria-label="Edit"><Edit className="w-3 h-3" /></button>
                <button className="icon-btn !w-6 !h-6 !rounded hover:!border-red-500/30 hover:!text-red-400" aria-label="Delete"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-foreground text-[14px] mb-1">{s.serviceName}</h3>
            <p className="text-[12px] text-dark-400 mb-3 line-clamp-2">{s.description}</p>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-dark-400">{s.level}</span>
              <span className="font-bold text-orange-400">Rp {(s.minimumPrice / 1e6).toFixed(0)}-{(s.maximumPrice / 1e6).toFixed(0)}jt</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border text-[11px] text-dark-500">
              <span>{s.estimatedDuration}</span>
              <span className={s.active ? 'text-emerald-400' : 'text-dark-500'}>{s.active ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Service Modal */}
      <Modal
        isOpen={showNewService}
        onClose={() => setShowNewService(false)}
        title="New Service"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowNewService(false)}>Cancel</Button>
            <Button size="sm">Save Service</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Service Name</label>
            <input type="text" placeholder="Company Profile Website" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Category</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select category</option>
                {['Web Development', 'Design', 'Automation', 'Consulting'].map((c) => (
                  <option key={c} value={c} className="bg-dark-800">{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Level</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select level</option>
                {['Starter', 'Standard', 'Premium', 'Custom'].map((l) => (
                  <option key={l} value={l} className="bg-dark-800">{l}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Min Price (IDR)</label>
              <input type="number" placeholder="5000000" className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Max Price (IDR)</label>
              <input type="number" placeholder="150000000" className="input" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Estimated Duration</label>
            <input type="text" placeholder="2-4 weeks" className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Description</label>
            <textarea rows={3} placeholder="Service description..." className="input !rounded-xl" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
