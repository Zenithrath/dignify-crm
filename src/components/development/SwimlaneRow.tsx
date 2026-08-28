import { useState } from 'react';
import {
  Check,
  Circle,
  User,
  NotePencil,
} from '@phosphor-icons/react';
import type { DevSwimlane, DevStatus } from '../../types';

interface SwimlaneRowProps {
  swimlane: DevSwimlane;
  projectId: string;
  onToggleTask: (projectId: string, swimlaneRole: string, taskId: string) => void;
  onUpdateSwimlane: (projectId: string, swimlaneRole: string, updates: Partial<{ status: DevStatus; pic: string; catatanTerakhir: string }>) => void;
}

const statusColor: Record<DevStatus, string> = {
  'Belum mulai': 'bg-white/8 text-white/45 border border-white/10',
  Progress: 'bg-[#4CD7E0]/12 text-[#4CD7E0] border border-[#4CD7E0]/25',
  Review: 'bg-[#FFD043]/12 text-[#FFD043] border border-[#FFD043]/25',
  Selesai: 'bg-[#D8FF3F]/12 text-[#D8FF3F] border border-[#D8FF3F]/25',
};

const roleColor: Record<string, string> = {
  'Web Dev': 'bg-[#4CD7E0]',
  'UI/UX': 'bg-[#A89AE8]',
  'n8n Automation': 'bg-[#FF8A3D]',
  SEO: 'bg-[#FFD043]',
};

const progressColor = (p: number) => {
  if (p >= 80) return 'bg-[#D8FF3F]';
  if (p >= 40) return 'bg-[#4CD7E0]';
  if (p > 0) return 'bg-[#FFD043]';
  return 'bg-white/10';
};

export function SwimlaneRow({ swimlane, projectId, onToggleTask, onUpdateSwimlane }: SwimlaneRowProps) {
  const [editingCatatan, setEditingCatatan] = useState(false);
  const [catatanText, setCatatanText] = useState(swimlane.catatanTerakhir);
  const doneCount = swimlane.tasks.filter((t) => t.done).length;

  function handleStatusCycle() {
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
    <div className="flex flex-col gap-0">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.015]">
        {/* Role badge */}
        <div className="flex items-center gap-2 min-w-[140px]">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${roleColor[swimlane.role]}`} />
          <span className="text-[13px] font-bold text-white/70">{swimlane.role}</span>
        </div>

        {/* Status */}
        <button
          onClick={handleStatusCycle}
          className={`text-[10px] font-semibold px-3 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity ${statusColor[swimlane.status]}`}
        >
          {swimlane.status}
        </button>

        {/* PIC */}
        <div className="flex items-center gap-1.5 text-xs text-white/50 min-w-[80px]">
          <User size={12} weight="fill" className="text-white/30" />
          <span>{swimlane.pic}</span>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2.5 flex-1 min-w-[120px]">
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden max-w-[160px]">
            <div
              className={`h-full rounded-full transition-all ${progressColor(swimlane.progress)}`}
              style={{ width: `${swimlane.progress}%` }}
            />
          </div>
          <span className="text-[12px] font-bold text-white/60 w-8 text-right">{swimlane.progress}%</span>
        </div>

        {/* Task count */}
        <div className="flex items-center gap-1.5 text-[11px] text-white/40 min-w-[70px] justify-end">
          <Check size={11} weight="bold" className={doneCount === swimlane.tasks.length ? 'text-[#D8FF3F]' : 'text-white/25'} />
          <span>{doneCount}/{swimlane.tasks.length}</span>
        </div>

        {/* Catatan toggle */}
        <button
          onClick={() => setEditingCatatan(!editingCatatan)}
          className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-white/30 hover:text-white/50 cursor-pointer"
        >
          <NotePencil size={14} weight="bold" />
        </button>
      </div>

      {/* ── Checklist ── */}
      <div className="px-5 pb-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {swimlane.tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onToggleTask(projectId, swimlane.role, task.id)}
            className="flex items-center gap-2 py-1 cursor-pointer group/task"
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

      {/* ── Catatan ── */}
      {editingCatatan && (
        <div className="px-5 pb-3">
          <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-3 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[10px] text-white/35 uppercase tracking-wider">
              <NotePencil size={11} weight="bold" />
              <span>Catatan terakhir</span>
            </div>
            <textarea
              value={catatanText}
              onChange={(e) => setCatatanText(e.target.value)}
              className="input !h-14 !py-2.5 resize-none text-[12px] leading-relaxed"
              placeholder="Tulis catatan..."
              autoFocus
            />
            <div className="flex justify-end">
              <button
                onClick={handleSaveCatatan}
                className="text-[11px] font-semibold text-[#D8FF3F] hover:text-[#D8FF3F]/80 px-3 py-1 rounded-lg hover:bg-[#D8FF3F]/5 transition-colors cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {!editingCatatan && swimlane.catatanTerakhir && (
        <div className="px-5 pb-3">
          <div className="flex items-start gap-2 text-[11px] text-white/30 bg-white/[0.015] rounded-xl px-3.5 py-2.5">
            <NotePencil size={11} weight="bold" className="text-white/15 mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed">{swimlane.catatanTerakhir}</span>
          </div>
        </div>
      )}
    </div>
  );
}
