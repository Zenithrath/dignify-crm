import { useState } from 'react';
import { Calendar, Clock, User, FileText, Upload, Image, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface ContentItem {
  id: string;
  title: string;
  type: 'Instagram Post' | 'Instagram Story' | 'TikTok' | 'Blog';
  copywriter: string;
  designer: string;
  scheduledDate: string;
  status: 'Draft' | 'Writing' | 'Designing' | 'Review' | 'Scheduled' | 'Published';
  caption?: string;
}

const mockContent: ContentItem[] = [
  { id: 'CT-001', title: 'Product Showcase - UMKM Bakery', type: 'Instagram Post', copywriter: 'Ignas', designer: 'Daniel', scheduledDate: '2026-08-28', status: 'Scheduled', caption: 'Sweet moments with our latest creation...' },
  { id: 'CT-002', title: 'Behind the Scenes - PT Berkah', type: 'Instagram Story', copywriter: 'Ignas', designer: 'Ignas', scheduledDate: '2026-08-29', status: 'Designing' },
  { id: 'CT-003', title: 'Client Testimonial - Klinik Sehat', type: 'Instagram Post', copywriter: 'Ignas', designer: 'Daniel', scheduledDate: '2026-09-01', status: 'Writing' },
  { id: 'CT-004', title: 'Tips & Tricks - Digital Marketing', type: 'Blog', copywriter: 'Ignas', designer: 'Daniel', scheduledDate: '2026-09-03', status: 'Draft' },
  { id: 'CT-005', title: 'Announcement - New Service Launch', type: 'Instagram Post', copywriter: 'Ignas', designer: 'Ignas', scheduledDate: '2026-09-05', status: 'Draft' },
];

const typeIcon: Record<string, typeof Image> = {
  'Instagram Post': Image, 'Instagram Story': Image, TikTok: Upload, Blog: FileText,
};

const statusColor: Record<string, string> = {
  Draft: 'badge-gray', Writing: 'badge-sky', Designing: 'badge-lav', Review: 'badge-gold', Scheduled: 'badge-orange', Published: 'badge-lime',
};

const statusDot: Record<string, string> = {
  Draft: 'bg-dark-400', Writing: 'bg-sky-400', Designing: 'bg-purple-400', Review: 'bg-gold', Scheduled: 'bg-orange-500', Published: 'bg-emerald-500',
};

export function ContentSchedulePage() {
  const [filter, setFilter] = useState<string>('all');
  const [showNewContent, setShowNewContent] = useState(false);

  const filtered = filter === 'all' ? mockContent : mockContent.filter((c) => c.status === filter);

  const groupedByWeek = filtered.reduce<Record<string, ContentItem[]>>((acc, item) => {
    const date = new Date(item.scheduledDate);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const key = weekStart.toISOString().split('T')[0];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-4 max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Content Schedule</h1>
          <p className="text-[13px] text-dark-400 mt-0.5">Jadwal konten, copywriting, dan design rotation</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowNewContent(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Content
        </Button>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-1.5">
        {['all', 'Draft', 'Writing', 'Designing', 'Review', 'Scheduled', 'Published'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
              filter === s
                ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                : 'bg-foreground/[0.04] text-dark-400 border border-border hover:text-foreground'
            }`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {Object.entries(groupedByWeek).map(([week, items]) => (
          <div key={week} className="card glass p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span className="text-[13px] font-bold text-foreground">
                Week of {new Date(week).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </span>
            </div>
            <div className="space-y-2">
              {items.map((item) => {
                const Icon = typeIcon[item.type] || FileText;
                return (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-foreground/[0.03] border border-border hover:border-border transition-all">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.type.includes('Instagram') ? 'bg-pink-500/10 border border-pink-500/20' :
                      item.type === 'TikTok' ? 'bg-dark-700 border border-border' :
                      'bg-orange-500/10 border border-orange-500/20'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        item.type.includes('Instagram') ? 'text-pink-400' :
                        item.type === 'TikTok' ? 'text-foreground' :
                        'text-orange-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-[13px] truncate">{item.title}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-[11px] text-dark-500">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{item.copywriter}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.scheduledDate}</span>
                      </div>
                    </div>
                    <span className={statusColor[item.status]}>{item.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="card glass p-4">
        <h3 className="text-[13px] font-bold text-foreground mb-3">Status Legend</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(statusDot).map(([status, dot]) => (
            <div key={status} className="flex items-center gap-2 text-[12px] text-dark-300">
              <span className={`w-2 h-2 rounded-sm ${dot}`} />
              {status}
            </div>
          ))}
        </div>
      </div>

      {/* New Content Modal */}
      <Modal
        isOpen={showNewContent}
        onClose={() => setShowNewContent(false)}
        title="New Content"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowNewContent(false)}>Cancel</Button>
            <Button size="sm">Save Content</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Title</label>
            <input type="text" placeholder="Product Showcase - UMKM Bakery" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Type</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select type</option>
                {['Instagram Post', 'Instagram Story', 'TikTok', 'Blog'].map((t) => (
                  <option key={t} value={t} className="bg-dark-800">{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Status</label>
              <select className="select" defaultValue="Draft">
                {['Draft', 'Writing', 'Designing', 'Review', 'Scheduled', 'Published'].map((s) => (
                  <option key={s} value={s} className="bg-dark-800">{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Copywriter</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select copywriter</option>
                <option value="Daniel" className="bg-dark-800">Daniel</option>
                <option value="Ignas" className="bg-dark-800">Ignas</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Designer</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select designer</option>
                <option value="Daniel" className="bg-dark-800">Daniel</option>
                <option value="Ignas" className="bg-dark-800">Ignas</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Scheduled Date</label>
            <input type="date" className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Caption</label>
            <textarea rows={3} placeholder="Write caption..." className="input !rounded-xl" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
