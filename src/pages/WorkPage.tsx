import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Banknote, CalendarDays, ChevronRight, Plus, User } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { WORK_STAGES, WORK_TYPES } from '../types';
import type { Work, WorkType } from '../types';
import { useWorks } from '../hooks/useData';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

type Filter = 'Semua' | WorkType;

const typeBadge: Record<WorkType, string> = {
  'Paid Outbound': 'badge badge-orange',
  'Paid Inbound': 'badge badge-sky',
  Collab: 'badge badge-lav',
};

const todayIso = () => new Date().toISOString().slice(0, 10);

function formatDate(iso: string): string {
  if (!iso) return '-';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

function daysUntil(iso: string): number {
  if (!iso) return Infinity;
  const target = new Date(`${iso}T00:00:00`).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today.getTime()) / 86400000);
}

function rupiahJt(value: number): string {
  return `Rp ${Math.round(value / 1e6)} jt`;
}

function nextWorkId(list: Work[]): string {
  const max = list.reduce((acc, w) => {
    const match = /^WORK-\d{4}-(\d+)$/.exec(w.id);
    return match ? Math.max(acc, Number(match[2])) : acc;
  }, 0);
  return `WORK-${new Date().getFullYear()}-${String(max + 1).padStart(4, '0')}`;
}

const emptyForm = {
  name: '',
  type: 'Paid Outbound' as WorkType,
  partner: '',
  pic: '',
  value: '',
  startDate: '',
  deadline: '',
  notes: '',
};

function WorkCard({ work, onAdvance }: { work: Work; onAdvance: (id: string) => void }) {
  const stages = WORK_STAGES[work.type];
  const idx = stages.indexOf(work.stage);
  const isLast = idx === -1 || idx >= stages.length - 1;
  const nextStage = isLast ? null : stages[idx + 1];
  const urgent = work.deadline !== '' && daysUntil(work.deadline) < 7;

  return (
    <div className="gs-card card glass p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-foreground text-[13px] leading-snug">{work.name}</p>
        <button
          type="button"
          onClick={() => onAdvance(work.id)}
          disabled={isLast}
          title={nextStage ? `Lanjut ke tahap ${nextStage}` : 'Tahap akhir'}
          aria-label={nextStage ? `Lanjutkan ${work.name} ke tahap ${nextStage}` : `${work.name} sudah di tahap akhir`}
          className="shrink-0 p-1 rounded-md text-dark-500 transition-colors hover:text-primary hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-[11px] text-dark-400 mb-2 truncate">{work.partner}</p>
      <div className="flex items-center gap-1.5 text-[11px] text-dark-400">
        <User className="w-3 h-3" />
        {work.pic}
      </div>
      <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-border">
        <span className="text-[11px] font-bold text-foreground tabular-nums truncate">
          {work.type === 'Collab' ? 'Collab' : rupiahJt(work.value)}
        </span>
        <span
          className={`${urgent ? 'badge badge-coral' : 'badge badge-gray'} shrink-0`}
          title={`Deadline ${formatDate(work.deadline)}`}
        >
          <CalendarDays className="w-3 h-3" />
          {formatDate(work.deadline)}
        </span>
      </div>
    </div>
  );
}

export function WorkPage() {
  const { data, loading, error } = useWorks();
  const [mutated, setMutated] = useState<Work[] | null>(null);
  const [filter, setFilter] = useState<Filter>('Semua');
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const scope = useRef<HTMLDivElement>(null);

  const works = mutated ?? data;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.from('.gs-card', {
        y: reduced ? 0 : 14,
        opacity: reduced ? 1 : 0,
        duration: reduced ? 0 : 0.45,
        stagger: 0.05,
        ease: 'power2.out',
      });
    },
    { scope, dependencies: [loading, filter] }
  );

  const setField =
    (key: keyof typeof emptyForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const advanceStage = (id: string) => {
    setMutated(
      (prev) =>
        (prev ?? data ?? []).map((w) => {
          if (w.id !== id) return w;
          const stages = WORK_STAGES[w.type];
          const idx = stages.indexOf(w.stage);
          if (idx === -1 || idx >= stages.length - 1) return w;
          return { ...w, stage: stages[idx + 1], updatedAt: todayIso() };
        })
    );
  };

  const handleSubmit = () => {
    if (!works || !data) return;
    const item: Work = {
      id: nextWorkId(works),
      name: form.name.trim(),
      type: form.type,
      partner: form.partner.trim(),
      pic: form.pic.trim(),
      teamMembers: [],
      value: form.type === 'Collab' ? 0 : Number(form.value) || 0,
      benefit: '',
      startDate: form.startDate,
      deadline: form.deadline,
      stage: WORK_STAGES[form.type][0],
      driveLink: '',
      notes: form.notes.trim(),
      createdAt: todayIso(),
      updatedAt: todayIso(),
    };
    setMutated([item, ...works]);
    setForm(emptyForm);
    setShowNew(false);
  };

  if (error) {
    return (
      <div ref={scope} role="alert" className="max-w-[1400px]">
        <div className="card p-8 text-center">
          <p className="text-sm font-semibold text-red-400">Gagal memuat data work</p>
          <p className="text-xs text-dark-400 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (loading || !works) {
    return (
      <div ref={scope} className="space-y-4 max-w-[1400px]" aria-busy="true" aria-label="Memuat work">
        <div className="h-[52px]" />
        <div className="h-10 w-fit rounded-lg glass animate-pulse" />
        <div className="flex gap-3 overflow-x-auto pb-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="min-w-[260px] w-[260px] h-[300px] rounded-lg glass animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const filtered = filter === 'Semua' ? works : works.filter((w) => w.type === filter);

  return (
    <div ref={scope} className="space-y-4 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Work</h1>
          <p className="text-[13px] text-dark-400 mt-0.5">Tracking semua pekerjaan paid &amp; collab dari awal sampai deal.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => { setForm(emptyForm); setShowNew(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Work Baru
        </Button>
      </div>

      {/* Filter tipe */}
      <div className="toggle-group w-fit">
        {(['Semua', ...WORK_TYPES] as Filter[]).map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} className={filter === f ? 'toggle-pill-active' : 'toggle-pill'}>
            {f}
          </button>
        ))}
      </div>

      {works.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm font-semibold text-foreground">Belum ada work</p>
          <p className="text-[13px] text-dark-400 mt-1">Belum ada work — klik Work Baru untuk mencatat pekerjaan pertamamu.</p>
        </div>
      ) : filter === 'Semua' ? (
        /* Ringkasan per tipe */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {WORK_TYPES.map((t) => {
            const items = works.filter((w) => w.type === t);
            const total = items.reduce((sum, w) => sum + w.value, 0);
            const nearest = items.map((w) => w.deadline).filter(Boolean).sort()[0];
            return (
              <button key={t} type="button" onClick={() => setFilter(t)} className="gs-card card card-hover p-4 text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className={typeBadge[t]}>{t}</span>
                  <ChevronRight className="w-4 h-4 text-dark-600" />
                </div>
                <p className="text-2xl font-extrabold text-foreground tabular-nums">{items.length}</p>
                <p className="text-[12px] text-dark-400">work aktif</p>
                <div className="mt-3 pt-3 border-t border-border space-y-1.5 text-[11px] text-dark-400">
                  <p className="flex items-center gap-1.5">
                    <Banknote className="w-3 h-3 shrink-0" />
                    Total nilai: {total > 0 ? rupiahJt(total) : '-'}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="w-3 h-3 shrink-0" />
                    {nearest ? `Deadline terdekat: ${formatDate(nearest)}` : 'Belum ada deadline'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Board kolom per tahap */
        <div className="flex gap-3 overflow-x-auto pb-4">
          {WORK_STAGES[filter].map((stage, i, arr) => {
            const items = filtered.filter((w) => w.stage === stage);
            return (
              <div key={stage} className="flex flex-col min-w-[260px] w-[260px]">
                <div className="flex items-center gap-2 mb-2.5 px-1">
                  <span className={`w-2 h-2 rounded-sm ${i === arr.length - 1 ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                  <h3 className="text-[13px] font-bold text-foreground">{stage}</h3>
                  <span className="text-[10px] font-bold text-dark-500 bg-foreground/[0.04] rounded px-1.5 py-0.5">{items.length}</span>
                </div>
                <div className="flex-1 rounded-lg p-2 space-y-2 min-h-[200px] bg-foreground/[0.03] border border-border">
                  {items.map((w) => (
                    <WorkCard key={w.id} work={w} onAdvance={advanceStage} />
                  ))}
                  {items.length === 0 && (
                    <div className="flex items-center justify-center h-20 text-[11px] text-dark-600">Kosong</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Work Baru */}
      <Modal isOpen={showNew} onClose={() => setShowNew(false)} title="Work Baru">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label htmlFor="work-name" className="block text-sm font-bold text-foreground">Nama Work</label>
            <input id="work-name" type="text" required placeholder="Contoh: PT Maju Jaya - Company Profile" className="input" value={form.name} onChange={setField('name')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="work-type" className="block text-sm font-bold text-foreground">Tipe</label>
              <select id="work-type" className="select input" value={form.type} onChange={setField('type')}>
                {WORK_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-card">{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="work-partner" className="block text-sm font-bold text-foreground">Partner</label>
              <input id="work-partner" type="text" required placeholder="Nama partner/klien" className="input" value={form.partner} onChange={setField('partner')} />
            </div>
          </div>
          <div className={form.type === 'Collab' ? '' : 'grid grid-cols-2 gap-3'}>
            <div className="space-y-1.5">
              <label htmlFor="work-pic" className="block text-sm font-bold text-foreground">PIC</label>
              <input id="work-pic" type="text" required placeholder="Nama PIC" className="input" value={form.pic} onChange={setField('pic')} />
            </div>
            {form.type !== 'Collab' && (
              <div className="space-y-1.5">
                <label htmlFor="work-value" className="block text-sm font-bold text-foreground">Nilai (Rp)</label>
                <input id="work-value" type="number" min={0} step={1000000} placeholder="35000000" className="input tabular-nums" value={form.value} onChange={setField('value')} />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="work-start" className="block text-sm font-bold text-foreground">Tanggal Mulai</label>
              <input id="work-start" type="date" className="input" value={form.startDate} onChange={setField('startDate')} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="work-deadline" className="block text-sm font-bold text-foreground">Deadline</label>
              <input id="work-deadline" type="date" required className="input" value={form.deadline} onChange={setField('deadline')} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="work-notes" className="block text-sm font-bold text-foreground">Catatan</label>
            <textarea id="work-notes" rows={3} placeholder="Catatan tambahan..." className="input !rounded-xl !h-auto py-2" value={form.notes} onChange={setField('notes')} />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="secondary" size="sm" onClick={() => setShowNew(false)}>Batal</Button>
            <Button type="submit" size="sm">Simpan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
