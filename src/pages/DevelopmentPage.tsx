import { useState } from 'react';
import {
  Code,
  Plus,
  CaretDown,
  Folder,
  Link as LinkIcon,
} from '@phosphor-icons/react';
import { useDevelopment } from '../hooks/useDevelopment';
import { SwimlaneCard } from '../components/development/SwimlaneCard';
import type { DevProject, DevRole, DevStatus } from '../types';
import { DEV_ROLES } from '../types';

const roleMeta: Record<DevRole, { color: string; bgColor: string; label: string }> = {
  'Web Dev':         { color: '#4CD7E0', bgColor: 'bg-[#4CD7E0]', label: 'Web Dev' },
  'UI/UX':           { color: '#A89AE8', bgColor: 'bg-[#A89AE8]', label: 'UI/UX' },
  'n8n Automation':  { color: '#FF8A3D', bgColor: 'bg-[#FF8A3D]', label: 'n8n Automation' },
  SEO:               { color: '#FFD043', bgColor: 'bg-[#FFD043]', label: 'SEO' },
};

export function DevelopmentPage() {
  const { data: projects, loading, toggleTask, updateSwimlane } = useDevelopment();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(DEV_ROLES.map((r) => [r, true]))
  );

  function toggleSection(role: DevRole) {
    setOpenSections((prev) => ({ ...prev, [role]: !prev[role] }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#D8FF3F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-5 pb-6">
      {/* Header */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] px-6 py-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#4CD7E0]/[0.03] blur-[80px]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4CD7E0]/10 flex items-center justify-center">
              <Code size={20} weight="bold" className="text-[#4CD7E0]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Progress Development</h1>
              <p className="text-[11px] text-white/40">
                {projects?.length || 0} project · {DEV_ROLES.length} role sections
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#D8FF3F] hover:bg-[#D8FF3F]/90 text-black text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
            <Plus size={14} weight="bold" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Role Sections */}
      {DEV_ROLES.map((role) => {
        const meta = roleMeta[role];
        const projectsWithRole = (projects || []).filter((p) =>
          p.swimlanes.some((sl) => sl.role === role)
        );
        const isOpen = openSections[role];

        const roleStats = projectsWithRole.reduce(
          (acc, p) => {
            const sl = p.swimlanes.find((s) => s.role === role);
            if (sl) {
              acc.totalTasks += sl.tasks.length;
              acc.doneTasks += sl.tasks.filter((t) => t.done).length;
              acc.statusCounts[sl.status] = (acc.statusCounts[sl.status] || 0) + 1;
            }
            return acc;
          },
          { totalTasks: 0, doneTasks: 0, statusCounts: {} as Record<string, number> }
        );

        return (
          <div key={role} className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(role)}
              className="w-full flex items-center gap-4 px-6 py-4 cursor-pointer text-left hover:bg-white/[0.015] transition-colors"
            >
              <div className={`w-3 h-3 rounded-full ${meta.bgColor} flex-shrink-0`} />
              <h2 className="text-[14px] font-bold text-white/80 flex-shrink-0">{meta.label}</h2>

              <div className="flex-1" />

              {/* Stats */}
              <div className="flex items-center gap-3">
                {(['Belum mulai', 'Progress', 'Review', 'Selesai'] as DevStatus[]).map((s) => {
                  const count = roleStats.statusCounts[s] || 0;
                  if (count === 0) return null;
                  return (
                    <span key={s} className="text-[10px] font-medium text-white/35 bg-white/5 px-2 py-0.5 rounded-full">
                      {s}: {count}
                    </span>
                  );
                })}
                <span className="text-[10px] text-white/25">
                  {roleStats.doneTasks}/{roleStats.totalTasks} tasks
                </span>
              </div>

              <CaretDown
                size={16}
                weight="bold"
                className={`text-white/25 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Project Cards */}
            {isOpen && (
              <div className="px-4 pb-4 flex flex-col gap-2.5">
                {projectsWithRole.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-8 text-white/20">
                    <Folder size={24} weight="light" />
                    <span className="text-[12px]">Belum ada project di section ini</span>
                  </div>
                ) : (
                  projectsWithRole.map((project) => {
                    const sl = project.swimlanes.find((s) => s.role === role)!;
                    return (
                      <SwimlaneCard
                        key={`${project.id}-${role}`}
                        swimlane={sl}
                        projectId={project.id}
                        projectName={project.namaProject}
                        clientName={project.namaKlien}
                        deadline={project.deadline}
                        onToggleTask={toggleTask}
                        onUpdateSwimlane={updateSwimlane}
                      />
                    );
                  })
                )}

                {/* Add to section */}
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 hover:border-white/20 text-white/25 hover:text-white/40 text-[12px] transition-colors cursor-pointer">
                  <Plus size={13} weight="bold" />
                  <span>Tambah project ke {meta.label}</span>
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Link to Pipeline hint */}
      <div className="flex items-center justify-center gap-2 py-3 text-[11px] text-white/20">
        <LinkIcon size={12} weight="fill" />
        <span>Project akan terhubung dengan Pipeline & Deal secara otomatis</span>
      </div>
    </div>
  );
}
