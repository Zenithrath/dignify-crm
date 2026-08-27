import { useState } from 'react';
import {
  SidebarSimple,
  Clock,
  Lightning,
  WarningCircle,
  CalendarCheck,
  CheckCircle,
  Circle,
  Timer,
  CaretDown,
} from '@phosphor-icons/react';
import { useDashboard } from '../../contexts/DashboardContext';

const priorityDot: Record<string, string> = {
  Urgent: 'bg-[#FF5A5A]',
  High: 'bg-[#FF5A5A]',
  Medium: 'bg-[#FFD043]',
  Low: 'bg-[#4CD7E0]',
};

const statusIcon: Record<string, { icon: typeof Circle; color: string }> = {
  Todo: { icon: Circle, color: 'text-white/40' },
  'In Progress': { icon: Timer, color: 'text-[#FFD043]' },
  Review: { icon: Clock, color: 'text-[#A89AE8]' },
  Completed: { icon: CheckCircle, color: 'text-[#4CD7E0]' },
};

function getDaysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDeadline(dateStr: string): string {
  const days = getDaysUntil(dateStr);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `${days}d left`;
}

function deadlineColor(dateStr: string): string {
  const days = getDaysUntil(dateStr);
  if (days < 0) return 'text-[#FF5A5A]';
  if (days <= 1) return 'text-[#FF5A5A]';
  if (days <= 3) return 'text-[#FFD043]';
  return 'text-white/50';
}

export function WorklistSidebar() {
  const { leadList, todos, sidebarOpen, setSidebarOpen, toggleTodo } = useDashboard();
  const [tab, setTab] = useState<'worklist' | 'todos'>('worklist');
  const [showDone, setShowDone] = useState(false);

  const urgentTodos = todos.filter((t) => !t.done && (t.priority === 'Urgent' || t.priority === 'High'));
  const upcomingDeadlines = todos
    .filter((t) => !t.done)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);
  const pendingTodos = todos.filter((t) => !t.done);
  const doneTodos = todos.filter((t) => t.done);

  if (!sidebarOpen) {
    return (
      <aside className="hidden lg:flex flex-col items-center w-[68px] flex-shrink-0 h-full py-4 bg-[#121318]/90 border-r border-white/[0.05] backdrop-blur-xl z-20 gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 rounded-full bg-[#D8FF3F] text-black flex items-center justify-center shadow-[0_0_15px_rgba(216,255,63,0.3)] hover:scale-105 transition-transform"
          aria-label="Open sidebar"
        >
          <SidebarSimple className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-2 mt-2">
          {leadList.slice(0, 4).map((lead) => (
            <img
              key={lead.id}
              src={lead.avatar}
              alt={lead.name}
              title={`${lead.name} — ${lead.statusText}`}
              className="w-8 h-8 rounded-full object-cover border border-white/10 hover:border-[#D8FF3F] transition-colors cursor-pointer"
            />
          ))}
        </div>

        {urgentTodos.length > 0 && (
          <div className="mt-auto flex flex-col items-center gap-1">
            <span className="text-[9px] font-bold text-[#FF5A5A] bg-[#FF5A5A]/15 px-1.5 py-0.5 rounded-full">
              {urgentTodos.length}
            </span>
            <Lightning className="w-4 h-4 text-[#FF5A5A]" />
          </div>
        )}
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex flex-col w-[340px] flex-shrink-0 h-full bg-[#121318]/90 border-r border-white/[0.05] backdrop-blur-xl z-20 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#D8FF3F]/10 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5 text-[#D8FF3F]" />
          </div>
          <h2 className="text-[13px] font-bold text-white">Workspace</h2>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-white/40 hover:text-white transition-all"
          aria-label="Collapse sidebar"
        >
          <SidebarSimple className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="px-4 pb-3">
        <div className="flex bg-[#1C1E26]/60 border border-white/[0.05] rounded-full p-0.5">
          <button
            onClick={() => setTab('worklist')}
            className={`flex-1 py-1.5 rounded-full text-[11px] font-bold transition-all ${
              tab === 'worklist'
                ? 'bg-[#D8FF3F] text-black shadow-[0_2px_8px_rgba(216,255,63,0.25)]'
                : 'text-white/50 hover:text-white'
            }`}
          >
            Worklist
          </button>
          <button
            onClick={() => setTab('todos')}
            className={`flex-1 py-1.5 rounded-full text-[11px] font-bold transition-all relative ${
              tab === 'todos'
                ? 'bg-[#D8FF3F] text-black shadow-[0_2px_8px_rgba(216,255,63,0.25)]'
                : 'text-white/50 hover:text-white'
            }`}
          >
            Todos
            {pendingTodos.length > 0 && (
              <span className="ml-1 text-[9px] bg-black/20 px-1.5 py-0.5 rounded-full">
                {pendingTodos.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-3 custom-scrollbar">
        {tab === 'worklist' ? (
          <>
            {/* Urgent Alert Banner */}
            {urgentTodos.length > 0 && (
              <div className="bg-[#FF5A5A]/10 border border-[#FF5A5A]/20 rounded-[14px] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <WarningCircle className="w-3.5 h-3.5 text-[#FF5A5A]" />
                  <span className="text-[11px] font-bold text-[#FF5A5A]">Urgent ({urgentTodos.length})</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {urgentTodos.slice(0, 2).map((t) => (
                    <div key={t.id} className="flex items-center gap-2 text-[11px] text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5A] flex-shrink-0" />
                      <span className="truncate">{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearest Deadlines */}
            {upcomingDeadlines.length > 0 && (
              <div className="bg-[#1C1E26]/50 border border-white/[0.05] rounded-[14px] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarCheck className="w-3.5 h-3.5 text-[#FFD043]" />
                  <span className="text-[11px] font-bold text-white/70">Upcoming Deadlines</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {upcomingDeadlines.map((t) => (
                    <div key={t.id} className="flex items-center justify-between">
                      <span className="text-[11px] text-white/60 truncate max-w-[160px]">{t.title}</span>
                      <span className={`text-[10px] font-bold ${deadlineColor(t.dueDate)}`}>
                        {formatDeadline(t.dueDate)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lead Cards */}
            <div className="flex flex-col gap-1.5">
              {leadList.map((lead) => {
                const isActive = lead.id === 'lead-1';
                return (
                  <div
                    key={lead.id}
                    className={`rounded-[14px] p-2.5 flex items-center gap-3 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#D8FF3F]/10 border border-[#D8FF3F]/30'
                        : 'bg-[#1C1E26]/40 border border-white/[0.04] hover:bg-white/[0.04]'
                    }`}
                  >
                    <img src={lead.avatar} alt={lead.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isActive ? 'text-[#D8FF3F]' : 'text-white'}`}>{lead.name}</p>
                      <p className="text-[10px] text-white/40 truncate">{lead.statusText}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      lead.priority === 'High' ? 'bg-[#FF5A5A]/15 text-[#FF5A5A]' :
                      lead.priority === 'Mid' ? 'bg-[#FFD043]/15 text-[#FFD043]' :
                      'bg-[#4CD7E0]/15 text-[#4CD7E0]'
                    }`}>
                      {lead.dealValue}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Todos Tab */}
            {urgentTodos.length > 0 && (
              <div className="bg-[#FF5A5A]/10 border border-[#FF5A5A]/20 rounded-[14px] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Lightning className="w-3.5 h-3.5 text-[#FF5A5A]" />
                  <span className="text-[11px] font-bold text-[#FF5A5A]">Needs Action</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {urgentTodos.map((t) => {
                    const { icon: SIcon, color } = statusIcon[t.status] || statusIcon.Todo;
                    return (
                      <div key={t.id} className="flex items-center gap-2 bg-[#1C1E26]/40 rounded-[10px] px-2.5 py-2 border border-white/[0.04]">
                        <button onClick={() => toggleTodo(t.id)} className="flex-shrink-0">
                          <Circle className="w-3.5 h-3.5 text-[#FF5A5A]" />
                        </button>
                        <span className="text-[11px] text-white/80 truncate flex-1">{t.title}</span>
                        <SIcon className={`w-3 h-3 ${color} flex-shrink-0`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upcoming Deadlines in Todos */}
            {upcomingDeadlines.length > 0 && (
              <div className="bg-[#1C1E26]/50 border border-white/[0.05] rounded-[14px] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarCheck className="w-3.5 h-3.5 text-[#FFD043]" />
                  <span className="text-[11px] font-bold text-white/70">Deadline</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {upcomingDeadlines.map((t) => (
                    <div key={t.id} className="flex items-center justify-between bg-[#1C1E26]/40 rounded-[10px] px-2.5 py-2 border border-white/[0.04]">
                      <span className="text-[11px] text-white/60 truncate max-w-[160px]">{t.title}</span>
                      <span className={`text-[10px] font-bold ${deadlineColor(t.dueDate)}`}>
                        {formatDeadline(t.dueDate)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* To Do Section */}
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-1 mb-1.5">To Do</p>
              <div className="flex flex-col gap-1.5">
                {pendingTodos.filter((t) => t.priority !== 'Urgent' && t.priority !== 'High').map((t) => {
                  const { icon: SIcon, color } = statusIcon[t.status] || statusIcon.Todo;
                  return (
                    <div key={t.id} className="flex items-center gap-2 bg-[#1C1E26]/40 rounded-[12px] px-2.5 py-2 border border-white/[0.04] hover:bg-white/[0.03] transition-all">
                      <button onClick={() => toggleTodo(t.id)} className="flex-shrink-0">
                        <Circle className="w-3.5 h-3.5 text-white/30 hover:text-[#D8FF3F] transition-colors" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] text-white/80 truncate block">{t.title}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[t.priority]}`} />
                          <span className="text-[9px] text-white/30">{t.assignee}</span>
                        </div>
                      </div>
                      <SIcon className={`w-3 h-3 ${color} flex-shrink-0`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Done Section */}
            {doneTodos.length > 0 && (
              <div>
                <button
                  onClick={() => setShowDone(!showDone)}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 uppercase tracking-wider px-1 mb-1.5 hover:text-white/60 transition-colors"
                >
                  <CaretDown className={`w-3 h-3 transition-transform ${showDone ? '' : '-rotate-90'}`} />
                  Done ({doneTodos.length})
                </button>
                {showDone && (
                  <div className="flex flex-col gap-1">
                    {doneTodos.map((t) => (
                      <div key={t.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-[12px] opacity-40">
                        <CheckCircle className="w-3.5 h-3.5 text-[#4CD7E0] flex-shrink-0" />
                        <span className="text-[11px] text-white/60 line-through truncate">{t.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
