import { useState } from 'react';
import {
  Users,
  CaretDown,
  CheckCircle,
  Clock,
  Warning,
  ListChecks,
  CalendarBlank,
  Code,
  Play,
} from '@phosphor-icons/react';
import { useTeam } from '../hooks/useTeam';
import type { TeamMember } from '../types';

function getModuleIcon(module: string) {
  if (module.startsWith('Dev')) return <Code size={11} weight="fill" className="text-[#4CD7E0]" />;
  return <Play size={11} weight="fill" className="text-[#E1306C]" />;
}

const statusColor: Record<string, string> = {
  'Selesai': 'text-[#D8FF3F]',
  'Published': 'text-[#D8FF3F]',
  'Progress': 'text-[#4CD7E0]',
  'Desain': 'text-[#A89AE8]',
  'Review': 'text-[#FF8A3D]',
  'Terjadwal': 'text-[#4CD7E0]',
  'Draft copy': 'text-[#4CD7E0]',
  'Menunggu ACC Ignas': 'text-[#FFD043]',
  'Ide': 'text-white/40',
  'Belum mulai': 'text-white/35',
};

export function TeamPage() {
  const { members, loading } = useTeam();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = members.find((m) => m.id === selectedId) || null;

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
        <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#A89AE8]/[0.03] blur-[80px]" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#A89AE8]/10 flex items-center justify-center">
            <Users size={20} weight="bold" className="text-[#A89AE8]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Team</h1>
            <p className="text-[11px] text-white/40">{members.length} anggota</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-4">
        {/* Member Directory */}
        <div className="flex-1 flex flex-col gap-3">
          {members.map((member) => {
            const totalItems = member.projects.length + member.tasks.length + member.contents.length;
            const isSelected = selectedId === member.id;
            return (
              <button
                key={member.id}
                onClick={() => setSelectedId(isSelected ? null : member.id)}
                className={`w-full bg-[#17181F]/70 border backdrop-blur-2xl rounded-[18px] px-5 py-4 text-left transition-all cursor-pointer ${
                  isSelected ? 'border-white/[0.12] bg-white/[0.03]' : 'border-white/[0.07] hover:border-white/[0.1]'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-[15px] font-bold flex-shrink-0"
                    style={{ backgroundColor: `${member.color}15`, color: member.color }}
                  >
                    {member.avatar}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-white/80">{member.nama}</span>
                      <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{member.role}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-white/30">
                      <span>{member.projects.length} project</span>
                      <span>·</span>
                      <span>{member.tasks.length} task</span>
                      <span>·</span>
                      <span>{member.contents.length} konten</span>
                    </div>
                  </div>
                  {/* Total */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[20px] font-extrabold text-white/60">{totalItems}</span>
                    <span className="text-[10px] text-white/25">item</span>
                  </div>
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`text-white/20 transition-transform ${isSelected ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Workload Detail */}
        {selected && (
          <div className="w-[480px] flex-shrink-0 bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] p-5 flex flex-col gap-4 max-h-[700px] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-[14px] font-bold"
                style={{ backgroundColor: `${selected.color}15`, color: selected.color }}
              >
                {selected.avatar}
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-white/80">{selected.nama}</h3>
                <p className="text-[10px] text-white/35">{selected.role}</p>
              </div>
            </div>

            {/* Projects */}
            {selected.projects.length > 0 && (
              <Section title="Projects" count={selected.projects.length} icon={<Code size={13} weight="bold" className="text-[#4CD7E0]" />}>
                {selected.projects.map((item, i) => (
                  <WorkloadRow key={i} item={item} />
                ))}
              </Section>
            )}

            {/* Tasks */}
            {selected.tasks.length > 0 && (
              <Section title="Tasks" count={selected.tasks.length} icon={<ListChecks size={13} weight="bold" className="text-[#FFD043]" />}>
                {selected.tasks.map((item, i) => (
                  <WorkloadRow key={i} item={item} />
                ))}
              </Section>
            )}

            {/* Contents */}
            {selected.contents.length > 0 && (
              <Section title="Konten" count={selected.contents.length} icon={<Play size={13} weight="bold" className="text-[#E1306C]" />}>
                {selected.contents.map((item, i) => (
                  <WorkloadRow key={i} item={item} />
                ))}
              </Section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, count, icon, children }: { title: string; count: number; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[12px] font-bold text-white/60">{title}</span>
        <span className="text-[10px] text-white/20 bg-white/5 px-1.5 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function WorkloadRow({ item }: { item: { module: string; title: string; status: string; deadline?: string } }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.015] border border-white/[0.03]">
      {getModuleIcon(item.module)}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-white/60 truncate">{item.title}</p>
        <p className="text-[9px] text-white/25">{item.module}</p>
      </div>
      <span className={`text-[9px] font-semibold ${statusColor[item.status] || 'text-white/35'}`}>
        {item.status}
      </span>
      {item.deadline && (
        <span className="flex items-center gap-1 text-[9px] text-white/25 flex-shrink-0">
          <CalendarBlank size={9} weight="fill" />
          {item.deadline}
        </span>
      )}
    </div>
  );
}
