import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Calendar, DollarSign, Plus } from 'lucide-react';
import type { Project } from '../types';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

const mockProjects: Project[] = [
  { id: 'PRJ-001', projectName: 'PT Berkah - Company Profile', clientId: 'CLI-001', service: 'Website Development', pic: 'Daniel', teamMembers: ['Daniel', 'Ignas'], startDate: '2026-07-20', deadline: '2026-09-15', stage: 'Development', status: 'On Track', progress: 65, projectValue: 85000000, driveLink: '', notes: '' },
  { id: 'PRJ-002', projectName: 'UMKM Bakery - Instagram Package', clientId: 'CLI-002', service: 'Content Creation', pic: 'Ignas', teamMembers: ['Ignas'], startDate: '2026-08-01', deadline: '2026-08-31', stage: 'UI Design', status: 'On Track', progress: 40, projectValue: 15000000, driveLink: '', notes: '' },
];

const statusBadge: Record<string, string> = {
  'On Track': 'badge-lime', 'At Risk': 'badge-orange', Delayed: 'badge-coral', Completed: 'badge-mint',
};

export function ProjectsPage() {
  const [showNewProject, setShowNewProject] = useState(false);

  return (
    <div className="space-y-4 max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Projects</h1>
          <p className="text-[13px] text-dark-400 mt-0.5">{mockProjects.length} active projects</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowNewProject(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {mockProjects.map((p) => (
          <Link key={p.id} to={`/projects/${p.id}`} className="card glass p-4 hover:border-border transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <FolderKanban className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-[13px] group-hover:text-orange-400 transition-colors">{p.projectName}</p>
                  <p className="text-[11px] text-dark-500">{p.service}</p>
                </div>
              </div>
              <span className={statusBadge[p.status] || 'badge-gray'}>{p.status}</span>
            </div>
            <div className="progress-bar mb-3">
              <div className="progress-fill" style={{ width: `${p.progress}%` }} />
            </div>
            <div className="flex items-center justify-between text-[11px] text-dark-400">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.deadline}</span>
              <span className="flex items-center gap-1 font-semibold text-foreground"><DollarSign className="w-3 h-3 text-orange-400" />Rp {(p.projectValue / 1e6).toFixed(0)}jt</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border">
              <span className="text-[11px] text-dark-500">PIC:</span>
              <span className="text-[11px] font-semibold text-foreground">{p.pic}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* New Project Modal */}
      <Modal
        isOpen={showNewProject}
        onClose={() => setShowNewProject(false)}
        title="New Project"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowNewProject(false)}>Cancel</Button>
            <Button size="sm">Save Project</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Project Name</label>
            <input type="text" placeholder="PT Berkah - Company Profile" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Service</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select service</option>
                {['Website Development', 'Content Creation', 'Brand Identity', 'Instagram Design', 'Mobile App Design', 'Consulting'].map((s) => (
                  <option key={s} value={s} className="bg-dark-800">{s}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">PIC</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select PIC</option>
                <option value="Daniel" className="bg-dark-800">Daniel</option>
                <option value="Ignas" className="bg-dark-800">Ignas</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Start Date</label>
              <input type="date" className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Deadline</label>
              <input type="date" className="input" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Project Value (IDR)</label>
            <input type="number" placeholder="85000000" className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Google Drive Link</label>
            <input type="url" placeholder="https://drive.google.com/..." className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Notes</label>
            <textarea rows={3} placeholder="Project notes..." className="input !rounded-xl" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
