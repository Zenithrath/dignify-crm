import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, CalendarDays, ChevronRight, ExternalLink,
  Pencil, User, Users,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { WORK_STAGES } from '../types';
import type { Work, WorkType } from '../types';
import { useWorks } from '../hooks/useData';
import { Button } from '../components/ui/Button';
import { WorkFormModal } from '../components/work/WorkFormModal';

const typeBadge: Record<WorkType, string> = {
  'Paid Outbound': 'badge badge-orange',
  'Paid Inbound': 'badge badge-sky',
  Collab: 'badge badge-lav',
};

const todayIso = () => new Date().toISOString().slice(0, 10);

function formatDate(iso: string): string {
  if (!iso) return '-';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
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

export function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useWorks();
  const [mutated, setMutated] = useState<Work[] | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const scope = useRef<HTMLDivElement>(null);

  const works = mutated ?? data;
  const work = works?.find((w) => w.id === id);

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
    { scope, dependencies: [loading] }
  );

  const updateWork = (updated: Work) => {
    setMutated((prev) => (prev ?? data ?? []).map((w) => (w.id === updated.id ? updated : w)));
  };

  const setStage = (stage: string) => {
    if (!work || stage === work.stage) return;
    updateWork({ ...work, stage, updatedAt: todayIso() });
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
      <div ref={scope} className="space-y-4 max-w-[1400px]" aria-busy="true" aria-label="Memuat detail work">
        <div className="h-[52px]" />
        <div className="h-20 rounded-lg glass animate-pulse" />
        <div className="h-64 rounded-lg glass animate-pulse" />
      </div>
    );
  }

  if (!work) {
    return (
      <div ref={scope} className="max-w-[1400px]">
        <div className="card p-10 text-center">
          <p className="text-sm font-semibold text-foreground">Work tidak ditemukan</p>
          <p className="text-[13px] text-dark-400 mt-1">Work tidak ditemukan atau sudah dihapus.</p>
          <Link
            to="/work"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-3 h-7 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Kembali ke Work
          </Link>
        </div>
      </div>
    );
  }

  const stages = WORK_STAGES[work.type];
  const urgent = work.deadline !== '' && daysUntil(work.deadline) < 7;

  return (
    <div ref={scope} className="space-y-4 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/work" className="icon-btn" aria-label="Kembali ke Work">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-extrabold text-foreground">{work.name}</h1>
            <span className={typeBadge[work.type]}>{work.type}</span>
          </div>
          <p className="text-[13px] text-dark-400 mt-0.5">{work.partner}</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setShowEdit(true)}>
          <Pencil className="w-3.5 h-3.5 mr-1" /> Ubah
        </Button>
      </div>

      {/* Stage stepper */}
      <nav className="gs-card card p-5" aria-label="Tahapan work">
        <h2 className="text-lg font-extrabold text-foreground mb-4">Tahapan</h2>
        <ol className="flex flex-wrap items-center gap-1.5">
          {stages.map((stage, i) => {
            const active = stage === work.stage;
            return (
              <li key={stage} className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setStage(stage)}
                  aria-current={active ? 'step' : undefined}
                  title={`Set tahap ${stage}`}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-foreground'
                  }`}
                >
                  <span className="tabular-nums opacity-70">{i + 1}</span>
                  {stage}
                </button>
                {i < stages.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-dark-600" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
        <p className="text-[11px] text-dark-500 mt-3">Klik tahap untuk memperbarui posisi work ini.</p>
      </nav>

      {/* Info card */}
      <section className="gs-card card p-5">
        <h2 className="text-lg font-extrabold text-foreground mb-4">Informasi Work</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs font-semibold text-dark-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 shrink-0" /> PIC
            </dt>
            <dd className="text-sm font-bold text-foreground truncate">{work.pic || '-'}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs font-semibold text-dark-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 shrink-0" /> Tim
            </dt>
            <dd className="text-sm font-bold text-foreground truncate">
              {work.teamMembers.length > 0 ? work.teamMembers.join(', ') : '-'}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs font-semibold text-dark-400">{work.type === 'Collab' ? 'Benefit' : 'Nilai'}</dt>
            <dd className="text-sm font-bold text-foreground tabular-nums truncate">
              {work.type === 'Collab' ? (work.benefit || '-') : rupiahJt(work.value)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs font-semibold text-dark-400">Tanggal Mulai</dt>
            <dd className="text-sm font-bold text-foreground tabular-nums">{formatDate(work.startDate)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs font-semibold text-dark-400 flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 shrink-0" /> Deadline
            </dt>
            <dd>
              <span
                className={`${urgent ? 'badge badge-coral' : 'badge badge-gray'} tabular-nums`}
                title={`Deadline ${formatDate(work.deadline)}`}
              >
                {formatDate(work.deadline)}
              </span>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-xs font-semibold text-dark-400">Link Drive</dt>
            <dd className="truncate">
              {work.driveLink ? (
                <a
                  href={work.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                >
                  Buka Drive <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              ) : (
                <span className="text-sm font-bold text-foreground">-</span>
              )}
            </dd>
          </div>
        </dl>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-dark-400 mb-1">Catatan</p>
          <p className="text-sm font-medium text-foreground">{work.notes || '-'}</p>
        </div>
      </section>

      {/* Modal Ubah Work */}
      <WorkFormModal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        initial={work}
        onSubmit={updateWork}
      />
    </div>
  );
}
