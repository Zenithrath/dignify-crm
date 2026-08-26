import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useContentItems, useRotation } from '../hooks/useData';
import type { ContentItem, ContentStatus } from '../types';

const STATUS_ORDER: ContentStatus[] = ['Draft', 'Designing', 'Review', 'Scheduled', 'Published'];

const statusBadgeClass: Record<ContentStatus, string> = {
  Draft: 'badge-gray',
  Designing: 'badge-lav',
  Review: 'badge-gold',
  Scheduled: 'badge-orange',
  Published: 'badge-lime',
};

const platformBadgeClass: Record<string, string> = {
  Instagram: 'badge-sky',
  TikTok: 'badge-gray',
  LinkedIn: 'badge-mint',
  YouTube: 'badge-coral',
  Other: 'badge-gray',
};

function formatDateId(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getWeekRange(weekStart: string): string {
  const start = new Date(weekStart + 'T00:00:00');
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${start.getDate()}–${end.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`;
}

function nextContentId(list: ContentItem[]): string {
  const max = list.reduce((acc, w) => {
    const match = /^CONTENT-\d{4}-(\d+)$/.exec(w.id);
    return match ? Math.max(acc, Number(match[2])) : acc;
  }, 0);
  return `CONTENT-${new Date().getFullYear()}-${String(max + 1).padStart(4, '0')}`;
}

export function ContentSchedulePage() {
  const { data: contentItems, loading: contentLoading, error: contentError, addContentItem } = useContentItems();
  const { data: rotation, loading: rotationLoading, error: rotationError } = useRotation();
  const [mutated, setMutated] = useState<ContentItem[] | null>(null);
  const [showNewContent, setShowNewContent] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    platform: '' as ContentItem['platform'],
    designPic: '',
    editorPic: '',
    copywriter: 'Ignas',
    status: 'Draft' as ContentStatus,
    publishDate: '',
    isLive: false,
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const items = mutated ?? contentItems ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const newItem: Omit<ContentItem, 'id'> = {
      title: formData.title,
      platform: formData.platform,
      designPic: formData.designPic,
      editorPic: formData.editorPic,
      copywriter: formData.copywriter,
      status: formData.status,
      publishDate: formData.publishDate,
      isLive: formData.isLive,
      notes: formData.notes,
    };
    addContentItem(newItem);
    setMutated((prev) => {
      const base = prev ?? contentItems ?? [];
      const newId = nextContentId(base);
      const fullItem: ContentItem = { ...newItem, id: newId };
      return [fullItem, ...base];
    });
    setShowNewContent(false);
    setFormData({
      title: '',
      platform: '' as ContentItem['platform'],
      designPic: '',
      editorPic: '',
      copywriter: 'Ignas',
      status: 'Draft',
      publishDate: '',
      isLive: false,
      notes: '',
    });
    setSubmitting(false);
  };

  if (contentLoading || rotationLoading) {
    return (
      <div className="space-y-4 max-w-[1400px]" aria-busy="true" aria-label="Loading content schedule">
        <div className="h-32 rounded-xl glass animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-64 rounded-xl glass animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (contentError || rotationError) {
    return (
      <div className="max-w-[1400px]">
        <div role="alert" className="card p-8 text-center">
          <p className="text-sm font-semibold text-red-400">Failed to load content</p>
          <p className="text-xs text-muted-foreground mt-1">{contentError || rotationError}</p>
        </div>
      </div>
    );
  }

  const grouped = STATUS_ORDER.reduce<Record<ContentStatus, ContentItem[]>>((acc, status) => {
    acc[status] = items.filter((item) => item.status === status);
    return acc;
  }, {} as Record<ContentStatus, ContentItem[]>);

  const publishedThisWeek = items.filter((item) => {
    if (item.status !== 'Published' || !rotation) return false;
    const pubDate = new Date(item.publishDate + 'T00:00:00');
    const weekStart = new Date(rotation.editorWeekStart + 'T00:00:00');
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return pubDate >= weekStart && pubDate <= weekEnd;
  }).length;

  const quotaProgress = rotation ? Math.min(100, (publishedThisWeek / rotation.weeklyTarget) * 100) : 0;

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Header + Primary Action */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Content Schedule</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Jadwal konten, rotasi PIC, dan kuota mingguan</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowNewContent(true)}>
          <Plus className="w-4 h-4 mr-1" /> Konten Baru
        </Button>
      </div>

      {/* Rotation Panel */}
      {rotation && (
        <div className="card glass p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Design PIC</p>
              <p className="font-medium text-foreground">{rotation.designPic} · {rotation.designQuarter}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Editor PIC</p>
              <p className="font-medium text-foreground">{rotation.editorPic} · Minggu {getWeekRange(rotation.editorWeekStart)}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-[12px] mb-1">
              <span className="font-medium text-foreground">Kuota Mingguan</span>
              <span className="text-muted-foreground">{publishedThisWeek}/{rotation.weeklyTarget} konten</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${quotaProgress}%` }} />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Minggu ini: {publishedThisWeek}/{rotation.weeklyTarget} konten</p>
          </div>
        </div>
      )}

      {/* Content List Grouped by Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {STATUS_ORDER.map((status) => {
          const statusItems = grouped[status];
          if (statusItems.length === 0) return null;
          return (
            <div key={status} className="card glass p-3 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground text-sm">{status}</h3>
                <span className="badge badge-gray">{statusItems.length}</span>
              </div>
              <div className="space-y-2">
                {statusItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-foreground text-sm line-clamp-1">{item.title}</h4>
                      <span className={`badge ${statusBadgeClass[item.status]} flex-shrink-0`}>{item.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className={`badge ${platformBadgeClass[item.platform]}`}>{item.platform}</span>
                      <span className="badge badge-gray">Design: {item.designPic}</span>
                      <span className="badge badge-gray">Edit: {item.editorPic}</span>
                      <span className="badge badge-sky">Copy: {item.copywriter}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDateId(item.publishDate)}
                      </span>
                      {item.isLive && (
                        <span className="flex items-center gap-1 text-emerald-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Content Modal */}
      <Modal
        isOpen={showNewContent}
        onClose={() => setShowNewContent(false)}
        title="Konten Baru"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowNewContent(false)}>Batal</Button>
            <Button size="sm" disabled={submitting} onClick={handleSubmit}>
              {submitting ? 'Menyimpan...' : 'Simpan Konten'}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-foreground">Judul</label>
            <input
              type="text"
              placeholder="Tips UMKM: Branding Murah yang Terasa Mahal"
              className="input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Platform</label>
              <select
                className="select input"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as ContentItem['platform'] })}
                required
              >
                <option value="" disabled>Pilih platform</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
                <option value="Other">Lainnya</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Status</label>
              <select
                className="select input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
              >
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Design PIC</label>
              <input
                type="text"
                placeholder="Daniel"
                className="input"
                value={formData.designPic}
                onChange={(e) => setFormData({ ...formData, designPic: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Editor PIC</label>
              <input
                type="text"
                placeholder="Ignas"
                className="input"
                value={formData.editorPic}
                onChange={(e) => setFormData({ ...formData, editorPic: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Copywriter</label>
              <input
                type="text"
                className="input bg-muted"
                value={formData.copywriter}
                readOnly
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">Tanggal Publikasi</label>
              <input
                type="date"
                className="input"
                value={formData.publishDate}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.isLive}
                onChange={(e) => setFormData({ ...formData, isLive: e.target.checked })}
              />
              <span className="text-sm text-foreground">Sudah Live (published)</span>
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-foreground">Catatan</label>
            <textarea
              rows={3}
              placeholder="Catatan tambahan..."
              className="input !rounded-xl resize-none"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}