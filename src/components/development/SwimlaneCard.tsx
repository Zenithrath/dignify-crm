import { useState } from 'react';
import {
  Check,
  Circle,
  User,
  NotePencil,
  CaretDown,
} from '@phosphor-icons/react';
import type { DevSwimlane, DevStatus } from '../../types';

interface SwimlaneCardProps {
  swimlane: DevSwimlane;
  projectId: string;
  projectName: string;
  clientName: string;
  deadline: string;
  onToggleTask: (projectId: string, swimlaneRole: string, taskId: string) => void;
  onUpdateSwimlane: (projectId: string, swimlaneRole: string, updates: Partial<{ status: DevStatus; pic: string; catatanTerakhir: string }>) => void;
}

const statusColor: Record<DevStatus, string> = {
  'Belum mulai': 'bg-white/8 text-white/45 border border-white/10',
  Progress: 'bg-[#4CD7E0]/12 text-[#4CD7E0] border border-[#4CD7E0]/25',
  Review: 'bg-[#FFD043]/12 text-[#FFD043] border border-[#FFD043]/25',
  Selesai: 'bg-[#D8FF3F]/12 text-[#D8FF3F] border border-[#D8FF3F]/25',
};

const progressColor = (p: number) => {
  if (p >= 80) return 'bg-[#D8FF3F]';
  if (p >= 40) return 'bg-[#4CD7E0]';
  if (p > 0) return 'bg-[#FFD043]';
  return 'bg-white/10';
};

export function SwimlaneCard({ swimlane, projectId, projectName, clientName, deadline, onToggleTask, onUpdateSwimlane }: SwimlaneCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [editingCatatan, setEditingCatatan] = useState(false);
  const [catatanText, setCatatanText] = useState(swimlane.catatanTerakhir);
  const doneCount = swimlane.tasks.filter((t) => t.done).length;

  function handleStatusCycle(e: React.MouseEvent) {
    e.stopPropagation();
    const order: DevStatus[] = ['Belum mulai', 'Progress', 'Review', 'Selesai'];
    const idx = order.indexOf(swimlane.status);
    const next = order[(idx + 1) % order.length];
    onUpdateSwimlane(projectId, swimlane.role, { status: next });
  }

  function handleSaveCatatan() {
    onUpdateSwimlane(projectId, swimlane.role, { catatanTerakhir: catatanText });
    setEditingCatatan(false);
  }

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/[0.08] transition-colors">
      {/* ── Card Header (always visible) ── */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-5 py-4 cursor-pointer text-left"
      >
        {/* Chevron */}
        <CaretDown
          size={16}
          weight="bold"
          className={`text-white/25 transition-transform duration-200 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
        />

        {/* Project info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="text-[13px] font-bold text-white/80 truncate">{projectName}</span>
            <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full flex-shrink-0">{clientName}</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[10px] text-white/25">Deadline {deadline}</span>
          </div>
        </div>

        {/* Status chip */}
        <button
          onClick={handleStatusCycle}
          className={`text-[10px] font-semibold px-3 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 ${statusColor[swimlane.status]}`}
        >
          {swimlane.status}
        </button>

        {/* PIC */}
        <div className="flex items-center gap-1.5 text-[11px] text-white/40 min-w-[60px] flex-shrink-0">
          <User size={11} weight="fill" className="text-white/25" />
          <span>{swimlane.pic}</span>
        </div>

        {/* Progress mini */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-14 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${progressColor(swimlane.progress)}`}
              style={{ width: `${swimlane.progress}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-white/50 w-7 text-right">{swimlane.progress}%</span>
        </div>

        {/* Tasks */}
        <div className="flex items-center gap-1 text-[10px] text-white/30 flex-shrink-0">
          <Check size={10} weight="bold" className={doneCount === swimlane.tasks.length ? 'text-[#D8FF3F]' : 'text-white/20'} />
          <span>{doneCount}/{swimlane.tasks.length}</span>
        </div>
      </button>

      {/* ── Expanded Detail ── */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-white/[0.04]">
          {/* Checklist */}
          <div className="flex flex-col gap-1 mt-4 mb-4">
            {swimlane.tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onToggleTask(projectId, swimlane.role, task.id)}
                className="flex items-center gap-2.5 py-1.5 cursor-pointer group/task text-left"
              >
                {task.done ? (
                  <div className="w-4 h-4 rounded-md bg-[#D8FF3F] flex items-center justify-center flex-shrink-0">
                    <Check size={10} weight="bold" className="text-black" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-md border border-white/15 flex items-center justify-center flex-shrink-0 group-hover/task:border-white/30 transition-colors">
                    <Circle size={10} className="text-transparent" />
                  </div>
                )}
                <span className={`text-[12px] ${task.done ? 'text-white/30 line-through' : 'text-white/55'}`}>
                  {task.title}
                </span>
              </button>
            ))}
          </div>

          {/* Catatan */}
          <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-white/35 uppercase tracking-wider">
                <NotePencil size={11} weight="bold" />
                <span>Catatan terakhir</span>
              </div>
              {!editingCatatan && (
                <button
                  onClick={() => setEditingCatatan(true)}
                  className="text-[10px] text-white/25 hover:text-white/50 transition-colors cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
            {editingCatatan ? (
              <>
                <textarea
                  value={catatanText}
                  onChange={(e) => setCatatanText(e.target.value)}
                  className="input !h-16 !py-2.5 resize-none text-[12px] leading-relaxed"
                  placeholder="Tulis catatan..."
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => { setEditingCatatan(false); setCatatanText(swimlane.catatanTerakhir); }}
                    className="text-[11px] text-white/30 hover:text-white/50 px-3 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveCatatan}
                    className="text-[11px] font-semibold text-[#D8FF3F] hover:text-[#D8FF3F]/80 px-3 py-1 rounded-lg hover:bg-[#D8FF3F]/5 transition-colors cursor-pointer"
                  >
                    Simpan
                  </button>
                </div>
              </>
            ) : (
              <p className="text-[12px] text-white/40 leading-relaxed">
                {swimlane.catatanTerakhir || 'Belum ada catatan'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
