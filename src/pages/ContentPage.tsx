import { useState } from 'react';
import {
  Calendar,
  Star,
  ArrowsClockwise,
  Plus,
  X,
  Check as CheckIcon,
  NotePencil,
  Funnel,
} from '@phosphor-icons/react';
import { useContent } from '../hooks/useContent';
import { ContentCalendarView } from '../components/content/ContentCalendarView';
import { PerformanceTabs } from '../components/content/PerformanceTabs';
import type { ContentItem, ContentKanbanStage, ContentPlatform, ContentType } from '../types';
import { CONTENT_PLATFORMS, CONTENT_TYPES, CONTENT_KANBAN_STAGES } from '../types';

const platformColor: Record<ContentPlatform, string> = {
  Instagram: '#E1306C',
  TikTok: '#00F2EA',
  LinkedIn: '#0A66C2',
  YouTube: '#FF0000',
};

const stageColor: Record<ContentKanbanStage, string> = {
  Ide: 'bg-white/8 text-white/45 border border-white/10',
  'Draft copy': 'bg-[#4CD7E0]/12 text-[#4CD7E0] border border-[#4CD7E0]/25',
  'Menunggu ACC Ignas': 'bg-[#FFD043]/12 text-[#FFD043] border border-[#FFD043]/25',
  Desain: 'bg-[#A89AE8]/12 text-[#A89AE8] border border-[#A89AE8]/25',
  Review: 'bg-[#FF8A3D]/12 text-[#FF8A3D] border border-[#FF8A3D]/25',
  Terjadwal: 'bg-[#4CD7E0]/12 text-[#4CD7E0] border border-[#4CD7E0]/25',
  Published: 'bg-[#D8FF3F]/12 text-[#D8FF3F] border border-[#D8FF3F]/25',
};

export function ContentPage() {
  const { data: contents, loading, performance, updateContent, addContent, deleteContent } = useContent();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<ContentPlatform | 'Semua'>('Semua');
  const [filterStatus, setFilterStatus] = useState<ContentKanbanStage | 'Semua'>('Semua');
  const [showAdd, setShowAdd] = useState(false);

  const selected = contents?.find((c) => c.id === selectedId) || null;

  const filtered = (contents || []).filter((c) => {
    if (filterPlatform !== 'Semua' && c.platform !== filterPlatform) return false;
    if (filterStatus !== 'Semua' && c.stage !== filterStatus) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#D8FF3F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 pb-6">
      {/* Header */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] px-6 py-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#E1306C]/[0.03] blur-[80px]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E1306C]/10 flex items-center justify-center">
              <Calendar size={20} weight="bold" className="text-[#E1306C]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Progress Content</h1>
              <p className="text-[11px] text-white/40">{contents?.length || 0} konten</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/5 rounded-lg p-0.5">
              <button
                onClick={() => setView('list')}
                className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer ${view === 'list' ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/50'}`}
              >
                List
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer ${view === 'calendar' ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/50'}`}
              >
                Kalender
              </button>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 bg-[#D8FF3F] hover:bg-[#D8FF3F]/90 text-black text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <Plus size={14} weight="bold" />
              <span>Tambah</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rotation Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[18px] px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#D8FF3F]/10 flex items-center justify-center flex-shrink-0">
            <Star size={18} weight="fill" className="text-[#D8FF3F]" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-white/35 uppercase tracking-wider mb-0.5">Giliran posting minggu ini</p>
            <p className="text-[14px] font-bold text-white/80">Rina (Instagram, TikTok)</p>
          </div>
          <span className="text-[10px] font-semibold text-[#D8FF3F] bg-[#D8FF3F]/10 px-2.5 py-1 rounded-full">Minggu 4</span>
        </div>
        <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[18px] px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#A89AE8]/10 flex items-center justify-center flex-shrink-0">
            <ArrowsClockwise size={18} weight="bold" className="text-[#A89AE8]" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-white/35 uppercase tracking-wider mb-0.5">Giliran ganti template</p>
            <p className="text-[14px] font-bold text-white/80">Ignas (Desain)</p>
          </div>
          <span className="text-[10px] font-semibold text-[#A89AE8] bg-[#A89AE8]/10 px-2.5 py-1 rounded-full">Q3 2026</span>
        </div>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="flex gap-4">
          {/* Table */}
          <div className="flex-1 bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] overflow-hidden flex flex-col">
            {/* Filters */}
            <div className="px-5 py-3 border-b border-white/[0.05] flex items-center gap-3">
              <Funnel size={13} weight="bold" className="text-white/25" />
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value as ContentPlatform | 'Semua')}
                className="input select !h-7 !text-[11px] !w-[130px]"
              >
                <option value="Semua">Semua Platform</option>
                {CONTENT_PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ContentKanbanStage | 'Semua')}
                className="input select !h-7 !text-[11px] !w-[170px]"
              >
                <option value="Semua">Semua Status</option>
                {CONTENT_KANBAN_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="text-[10px] text-white/20 ml-auto">{filtered.length} hasil</span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[1fr_100px_90px_100px_100px_110px_90px] gap-2 px-5 py-2.5 border-b border-white/[0.04] text-[10px] font-semibold text-white/30 uppercase tracking-wider">
              <span>Judul</span>
              <span>Platform</span>
              <span>Tipe</span>
              <span>Copywriter</span>
              <span>Designer</span>
              <span>Status</span>
              <span>Tgl Post</span>
            </div>

            {/* Table Rows */}
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-[12px] text-white/20">Tidak ada konten</div>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full grid grid-cols-[1fr_100px_90px_100px_100px_110px_90px] gap-2 px-5 py-3 text-left border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer ${selectedId === item.id ? 'bg-white/[0.03]' : ''}`}
                  >
                    <span className="text-[12px] font-medium text-white/70 truncate">{item.title}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: platformColor[item.platform] }} />
                      <span className="text-[11px] text-white/45">{item.platform}</span>
                    </span>
                    <span className="text-[11px] text-white/40">{item.tipe || '-'}</span>
                    <span className="text-[11px] text-white/40">{item.captionWriter || '-'}</span>
                    <span className="text-[11px] text-white/40">{item.designer || '-'}</span>
                    <span>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${stageColor[(item.stage || 'Ide') as ContentKanbanStage]}`}>
                        {item.stage || 'Ide'}
                      </span>
                    </span>
                    <span className="text-[11px] text-white/30">{item.publishDate || '-'}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Detail Panel */}
          {selected && (
            <DetailPanel
              item={selected}
              onClose={() => setSelectedId(null)}
              onUpdate={(updates) => { updateContent(selected.id, updates); }}
              onDelete={() => { deleteContent(selected.id); setSelectedId(null); }}
            />
          )}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && contents && (
        <ContentCalendarView contents={contents} />
      )}

      {/* Performance */}
      <div className="mt-2">
        <h3 className="text-[13px] font-bold text-white/70 mb-3 px-1">Performance per Platform</h3>
        <PerformanceTabs
          performance={performance}
          contents={contents?.map((c) => ({ platform: c.platform, stage: c.stage || 'Ide' })) || []}
        />
      </div>

      {/* Add Modal */}
      {showAdd && (
        <AddContentModal
          onAdd={(item) => { addContent(item); setShowAdd(false); }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

function DetailPanel({
  item,
  onClose,
  onUpdate,
  onDelete,
}: {
  item: ContentItem;
  onClose: () => void;
  onUpdate: (updates: Partial<ContentItem>) => void;
  onDelete: () => void;
}) {
  const [caption, setCaption] = useState(item.caption || '');
  const [stage, setStage] = useState<ContentKanbanStage>(item.stage || 'Ide');
  const [publishDate, setPublishDate] = useState(item.publishDate || '');
  const [notes, setNotes] = useState(item.notes || '');
  const [editing, setEditing] = useState(false);

  function handleSave() {
    onUpdate({ caption, stage, publishDate, notes });
    setEditing(false);
  }

  return (
    <div className="w-[360px] flex-shrink-0 bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] p-5 flex flex-col gap-4 max-h-[600px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-bold text-white/80 truncate">{item.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: platformColor[item.platform] }} />
            <span className="text-[11px] text-white/40">{item.platform} · {item.tipe || '-'}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!editing ? (
            <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/50 cursor-pointer">
              <NotePencil size={14} weight="bold" />
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="p-1.5 rounded-lg hover:bg-[#D8FF3F]/10 text-[#D8FF3F] cursor-pointer">
                <CheckIcon size={14} weight="bold" />
              </button>
              <button onClick={() => { setEditing(false); setCaption(item.caption || ''); setStage(item.stage || 'Ide'); setPublishDate(item.publishDate || ''); setNotes(item.notes || ''); }} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 cursor-pointer">
                <X size={14} weight="bold" />
              </button>
            </>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white cursor-pointer">
            <X size={14} weight="bold" />
          </button>
        </div>
      </div>

      {/* PIC */}
      <div className="flex gap-4 text-[11px] text-white/40">
        <span>✍️ {item.captionWriter || '-'}</span>
        <span>🎨 {item.designer || '-'}</span>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] text-white/30 uppercase tracking-wider">Status</label>
        {editing ? (
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as ContentKanbanStage)}
            className="input select !h-8 !text-[11px]"
          >
            {CONTENT_KANBAN_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        ) : (
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit ${stageColor[stage]}`}>{stage}</span>
        )}
      </div>

      {/* Publish Date */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] text-white/30 uppercase tracking-wider">Tanggal Post</label>
        {editing ? (
          <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="input !h-8 !text-[11px]" />
        ) : (
          <span className="text-[12px] text-white/50">{publishDate || 'Belum dijadwalkan'}</span>
        )}
      </div>

      {/* Caption */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] text-white/30 uppercase tracking-wider">Caption / Copywriting</label>
        {editing ? (
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="input !h-24 !py-2.5 resize-none text-[12px] leading-relaxed"
            placeholder="Tulis caption..."
          />
        ) : (
          <p className="text-[12px] text-white/50 leading-relaxed bg-white/[0.02] rounded-xl px-3.5 py-2.5 min-h-[60px]">
            {caption || 'Belum ada caption'}
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] text-white/30 uppercase tracking-wider">Catatan</label>
        {editing ? (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input !h-16 !py-2.5 resize-none text-[12px] leading-relaxed"
            placeholder="Catatan internal..."
          />
        ) : (
          <p className="text-[12px] text-white/40 leading-relaxed">
            {notes || '-'}
          </p>
        )}
      </div>

      {/* Delete */}
      {editing && (
        <button
          onClick={() => { if (window.confirm('Hapus konten ini?')) onDelete(); }}
          className="text-[11px] text-[#FF5A5A]/60 hover:text-[#FF5A5A] transition-colors cursor-pointer mt-2"
        >
          Hapus konten ini
        </button>
      )}
    </div>
  );
}

function AddContentModal({
  onAdd,
  onClose,
}: {
  onAdd: (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<ContentPlatform>('Instagram');
  const [tipe, setTipe] = useState<ContentType>('Feed');
  const [captionWriter, setCaptionWriter] = useState('');
  const [designer, setDesigner] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      platform,
      tipe,
      captionWriter: captionWriter.trim() || '-',
      designer: designer.trim() || '-',
      stage: 'Ide',
      caption: '',
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#17181F] border border-white/[0.07] rounded-[22px] w-full max-w-md p-6 flex flex-col gap-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-white">Tambah Konten</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white cursor-pointer">
            <X size={16} weight="bold" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wider">Judul</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Judul konten..." autoFocus />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] text-white/40 uppercase tracking-wider">Platform</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value as ContentPlatform)} className="input select">
                {CONTENT_PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] text-white/40 uppercase tracking-wider">Tipe</label>
              <select value={tipe} onChange={(e) => setTipe(e.target.value as ContentType)} className="input select">
                {CONTENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] text-white/40 uppercase tracking-wider">Copywriter</label>
              <input value={captionWriter} onChange={(e) => setCaptionWriter(e.target.value)} className="input" placeholder="Nama copywriter" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] text-white/40 uppercase tracking-wider">Designer</label>
              <input value={designer} onChange={(e) => setDesigner(e.target.value)} className="input" placeholder="Nama designer" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-1">
            <button type="button" onClick={onClose} className="text-[12px] text-white/40 hover:text-white/60 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">Batal</button>
            <button type="submit" disabled={!title.trim()} className="flex items-center gap-2 bg-[#D8FF3F] hover:bg-[#D8FF3F]/90 disabled:opacity-30 text-black text-[12px] font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer">
              <Plus size={14} weight="bold" />
              <span>Tambah</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
