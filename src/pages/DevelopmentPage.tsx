import { useState } from 'react';
import {
  Code,
  Plus,
  Folder,
  Link as LinkIcon,
  X,
  Check as CheckIcon,
  Pencil,
  Trash,
} from '@phosphor-icons/react';
import { useDevelopment } from '../hooks/useDevelopment';
import { SwimlaneCard } from '../components/development/SwimlaneCard';
import type { DevRole } from '../types';
import { DEV_ROLES } from '../types';

const roleMeta: Record<DevRole, { color: string }> = {
  'Web Dev':        { color: '#4CD7E0' },
  'UI/UX':          { color: '#A89AE8' },
  'n8n Automation': { color: '#FF8A3D' },
  SEO:              { color: '#FFD043' },
};

export function DevelopmentPage() {
  const {
    data: projects, loading,
    addProject, updateProject, deleteProject,
    toggleTask, addTask, deleteTask, editTaskTitle, updateSwimlane,
  } = useDevelopment();

  const [activeRole, setActiveRole] = useState<DevRole>('Web Dev');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState({ namaProject: '', namaKlien: '', deadline: '' });

  const projectsForRole = (projects || []).filter((p) =>
    p.swimlanes.some((sl) => sl.role === activeRole)
  );

  function handleAddProject(namaProject: string, namaKlien: string, deadline: string) {
    addProject(namaProject, namaKlien, deadline);
    setShowAddModal(false);
  }

  function startEditProject(projectId: string) {
    const p = projects?.find((pr) => pr.id === projectId);
    if (!p) return;
    setEditingProjectId(projectId);
    setEditFields({ namaProject: p.namaProject, namaKlien: p.namaKlien, deadline: p.deadline });
  }

  function saveEditProject() {
    if (editingProjectId) {
      updateProject(editingProjectId, editFields);
      setEditingProjectId(null);
    }
  }

  function handleDeleteProject(projectId: string, name: string) {
    if (window.confirm(`Hapus project "${name}"?`)) {
      deleteProject(projectId);
    }
  }

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
        <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#4CD7E0]/[0.03] blur-[80px]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4CD7E0]/10 flex items-center justify-center">
              <Code size={20} weight="bold" className="text-[#4CD7E0]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Progress Development</h1>
              <p className="text-[11px] text-white/40">{projects?.length || 0} project aktif</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#D8FF3F] hover:bg-[#D8FF3F]/90 text-black text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Plus size={14} weight="bold" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] px-2 py-0 flex">
        {DEV_ROLES.map((role) => {
          const rm = roleMeta[role];
          const isActive = role === activeRole;
          return (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`
                relative flex-1 flex items-center justify-center gap-2 py-3.5 text-[13px] font-medium transition-colors cursor-pointer
                ${isActive ? 'text-white' : 'text-white/30 hover:text-white/50'}
              `}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0 transition-opacity"
                style={{ backgroundColor: rm.color, opacity: isActive ? 1 : 0.3 }}
              />
              {role}
              {isActive && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{ backgroundColor: rm.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: roleMeta[activeRole].color }} />
            <h2 className="text-[14px] font-bold text-white/80">{activeRole}</h2>
            <span className="text-[11px] text-white/25 bg-white/5 px-2.5 py-0.5 rounded-full">
              {projectsForRole.length} project
            </span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/50 transition-colors cursor-pointer"
          >
            <Plus size={12} weight="bold" />
            <span>Tambah</span>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2.5">
          {projectsForRole.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-white/20">
              <Folder size={28} weight="light" />
              <span className="text-[12px]">Belum ada project di section ini</span>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-2 flex items-center gap-1.5 text-[11px] text-[#D8FF3F]/60 hover:text-[#D8FF3F] transition-colors cursor-pointer"
              >
                <Plus size={12} weight="bold" />
                <span>Tambah project pertama</span>
              </button>
            </div>
          ) : (
            projectsForRole.map((project) => {
              const sl = project.swimlanes.find((s) => s.role === activeRole)!;
              const isEditing = editingProjectId === project.id;
              return (
                <div key={`${project.id}-${activeRole}`} className="flex flex-col gap-2">
                  {/* Project meta row */}
                  <div className="flex items-center gap-2 px-2">
                    {isEditing ? (
                      <>
                        <input
                          value={editFields.namaProject}
                          onChange={(e) => setEditFields((f) => ({ ...f, namaProject: e.target.value }))}
                          className="input !h-7 !text-[11px] w-40"
                          autoFocus
                        />
                        <input
                          value={editFields.namaKlien}
                          onChange={(e) => setEditFields((f) => ({ ...f, namaKlien: e.target.value }))}
                          className="input !h-7 !text-[11px] w-36"
                        />
                        <input
                          type="date"
                          value={editFields.deadline}
                          onChange={(e) => setEditFields((f) => ({ ...f, deadline: e.target.value }))}
                          className="input !h-7 !text-[11px] w-36"
                        />
                        <button onClick={saveEditProject} className="p-1 rounded-md hover:bg-[#D8FF3F]/10 text-[#D8FF3F] cursor-pointer">
                          <CheckIcon size={13} weight="bold" />
                        </button>
                        <button onClick={() => setEditingProjectId(null)} className="p-1 rounded-md hover:bg-white/5 text-white/30 cursor-pointer">
                          <X size={13} weight="bold" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-[11px] text-white/30">{project.namaProject} · {project.namaKlien}</span>
                        <button
                          onClick={() => startEditProject(project.id)}
                          className="p-1 rounded-md hover:bg-white/5 text-white/20 hover:text-white/50 cursor-pointer"
                        >
                          <Pencil size={10} weight="bold" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id, project.namaProject)}
                          className="p-1 rounded-md hover:bg-[#FF5A5A]/10 text-white/20 hover:text-[#FF5A5A] cursor-pointer"
                        >
                          <Trash size={10} weight="bold" />
                        </button>
                      </>
                    )}
                  </div>
                  <SwimlaneCard
                    swimlane={sl}
                    projectId={project.id}
                    projectName={project.namaProject}
                    clientName={project.namaKlien}
                    deadline={project.deadline}
                    onToggleTask={toggleTask}
                    onUpdateSwimlane={updateSwimlane}
                    onAddTask={addTask}
                    onDeleteTask={deleteTask}
                    onEditTaskTitle={editTaskTitle}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-2 text-[11px] text-white/20">
        <LinkIcon size={12} weight="fill" />
        <span>Project akan terhubung dengan Pipeline & Deal secara otomatis</span>
      </div>

      {/* ── Add Project Modal ── */}
      {showAddModal && (
        <AddProjectModal
          onAdd={handleAddProject}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

function AddProjectModal({
  onAdd,
  onClose,
}: {
  onAdd: (namaProject: string, namaKlien: string, deadline: string) => void;
  onClose: () => void;
}) {
  const [namaProject, setNamaProject] = useState('');
  const [namaKlien, setNamaKlien] = useState('');
  const [deadline, setDeadline] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (namaProject.trim() && namaKlien.trim()) {
      onAdd(namaProject.trim(), namaKlien.trim(), deadline);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#17181F] border border-white/[0.07] rounded-[22px] w-full max-w-md p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-white">Add Project Baru</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white cursor-pointer">
            <X size={16} weight="bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wider">Nama Project</label>
            <input
              value={namaProject}
              onChange={(e) => setNamaProject(e.target.value)}
              className="input"
              placeholder="Contoh: Company Profile Website"
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wider">Nama Klien</label>
            <input
              value={namaKlien}
              onChange={(e) => setNamaKlien(e.target.value)}
              className="input"
              placeholder="Contoh: PT Maju Jaya"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wider">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="input"
            />
          </div>
          <div className="flex justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-[12px] text-white/40 hover:text-white/60 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!namaProject.trim() || !namaKlien.trim()}
              className="flex items-center gap-2 bg-[#D8FF3F] hover:bg-[#D8FF3F]/90 disabled:opacity-30 disabled:cursor-not-allowed text-black text-[12px] font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <Plus size={14} weight="bold" />
              <span>Tambah Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
