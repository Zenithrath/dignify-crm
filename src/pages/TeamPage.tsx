import { useState } from 'react';
import { Edit, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

const mockTeam = [
  { id: 'USR-001', name: 'Daniel', email: 'daniel@dignify.id', role: 'Admin', active: true },
  { id: 'USR-002', name: 'Ignas', email: 'ignas@dignify.id', role: 'Member', active: true },
];

const roleBadge: Record<string, string> = { Admin: 'badge-orange', Member: 'badge-sky', Viewer: 'badge-gray' };

export function TeamPage() {
  const [showNewMember, setShowNewMember] = useState(false);

  return (
    <div className="space-y-4 max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-xl font-extrabold text-foreground">Team</h1>
        <Button variant="primary" size="sm" onClick={() => setShowNewMember(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Member
        </Button>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-t border-white/[0.05]">
              <th className="table-header">Member</th>
              <th className="table-header">Email</th>
              <th className="table-header">Role</th>
              <th className="table-header">Status</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody>
            {mockTeam.map((m) => (
              <tr key={m.id} className="table-row">
                <td className="table-cell">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-bold text-orange-400">{m.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-[13px]">{m.name}</p>
                      <p className="text-[11px] text-dark-500">{m.id}</p>
                    </div>
                  </div>
                </td>
                <td className="table-cell text-dark-300">{m.email}</td>
                <td className="table-cell"><span className={roleBadge[m.role]}>{m.role}</span></td>
                <td className="table-cell">
                  <span className={`flex items-center gap-1.5 text-[12px] ${m.active ? 'text-emerald-400' : 'text-dark-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${m.active ? 'bg-emerald-400' : 'bg-dark-500'}`} />
                    {m.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="table-cell">
                  <button className="icon-btn !w-7 !h-7" aria-label="Edit"><Edit className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Member Modal */}
      <Modal
        isOpen={showNewMember}
        onClose={() => setShowNewMember(false)}
        title="Add Team Member"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowNewMember(false)}>Cancel</Button>
            <Button size="sm">Save Member</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Name</label>
            <input type="text" placeholder="John Doe" className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Email</label>
            <input type="email" placeholder="john@dignify.id" className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Role</label>
            <select className="select" defaultValue="">
              <option value="" disabled className="bg-dark-800">Select role</option>
              {['Admin', 'Member', 'Viewer'].map((r) => (
                <option key={r} value={r} className="bg-dark-800">{r}</option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
