import { useState } from 'react';
import { LayoutGrid, List, Calendar, User, Plus } from 'lucide-react';
import type { Task, TaskStatus, TaskPriority } from '../types';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

const mockTasks: Task[] = [
  { id: 'TASK-001', title: 'Design homepage wireframe', description: 'Create wireframe for PT Berkah', projectId: 'PRJ-001', assignedTo: 'Ignas', priority: 'High', status: 'In Progress', dueDate: '2026-08-28', createdAt: '2026-08-20' },
  { id: 'TASK-002', title: 'Write copy for IG content', description: 'Caption + hashtags for product showcase', projectId: 'PRJ-001', assignedTo: 'Ignas', priority: 'Medium', status: 'Todo', dueDate: '2026-08-30', createdAt: '2026-08-22' },
  { id: 'TASK-003', title: 'Client meeting prep', description: 'Prepare presentation slides', projectId: 'PRJ-002', assignedTo: 'Daniel', priority: 'High', status: 'Review', dueDate: '2026-08-27', createdAt: '2026-08-21' },
  { id: 'TASK-004', title: 'Upload Instagram content', description: 'Post scheduled content for UMKM Bakery', projectId: 'PRJ-003', assignedTo: 'Ignas', priority: 'Medium', status: 'Completed', dueDate: '2026-08-25', createdAt: '2026-08-20' },
];

const columns: { status: TaskStatus; label: string; dot: string }[] = [
  { status: 'Todo', label: 'To Do', dot: 'bg-dark-400' },
  { status: 'In Progress', label: 'In Progress', dot: 'bg-orange-500' },
  { status: 'Review', label: 'Review', dot: 'bg-gold' },
  { status: 'Completed', label: 'Completed', dot: 'bg-emerald-500' },
  { status: 'Blocked', label: 'Blocked', dot: 'bg-red-500' },
];

const priorityBadge: Record<TaskPriority, string> = {
  High: 'badge-orange', Medium: 'badge-gold', Low: 'badge-gray', Urgent: 'badge-coral',
};

export function TasksPage() {
  const [view, setView] = useState<'board' | 'list'>('board');
  const [showNewTask, setShowNewTask] = useState(false);

  return (
    <div className="space-y-4 max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Tasks</h1>
          <p className="text-[13px] text-dark-400 mt-0.5">{mockTasks.length} tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={() => setShowNewTask(true)}>
            <Plus className="w-4 h-4 mr-1" /> New Task
          </Button>
          <div className="toggle-group">
          <button onClick={() => setView('board')} className={view === 'board' ? 'toggle-pill-active' : 'toggle-pill'}>
            <LayoutGrid className="w-3.5 h-3.5 mr-1 inline" /> Board
          </button>
          <button onClick={() => setView('list')} className={view === 'list' ? 'toggle-pill-active' : 'toggle-pill'}>
            <List className="w-3.5 h-3.5 mr-1 inline" /> List
          </button>
        </div>
        </div>
      </div>

      {view === 'board' ? (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {columns.map((col) => {
            const tasks = mockTasks.filter((t) => t.status === col.status);
            return (
              <div key={col.status} className="flex flex-col min-w-[260px] w-[260px]">
                <div className="flex items-center gap-2 mb-2.5 px-1">
                  <span className={`w-2 h-2 rounded-sm ${col.dot}`} />
                  <h3 className="text-[13px] font-bold text-foreground">{col.label}</h3>
                  <span className="text-[10px] font-bold text-dark-500 bg-foreground/[0.04] rounded px-1.5 py-0.5">{tasks.length}</span>
                </div>
                <div className="flex-1 rounded-lg p-2 space-y-2 min-h-[200px] bg-foreground/[0.03] border border-border">
                  {tasks.map((task) => (
                    <div key={task.id} className="card glass p-3">
                      <p className="font-semibold text-foreground text-[13px] mb-1">{task.title}</p>
                      <p className="text-[11px] text-dark-400 mb-2 line-clamp-2">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={priorityBadge[task.priority]}>{task.priority}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-dark-500">
                          <Calendar className="w-3 h-3" />
                          {task.dueDate}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border text-[11px] text-dark-400">
                        <User className="w-3 h-3" />
                        {task.assignedTo}
                      </div>
                    </div>
                  ))}
                  {tasks.length === 0 && (
                    <div className="flex items-center justify-center h-20 text-[11px] text-dark-600">No tasks</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border">
                <th className="table-header">Task</th>
                <th className="table-header">Assignee</th>
                <th className="table-header">Priority</th>
                <th className="table-header">Status</th>
                <th className="table-header">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {mockTasks.map((task) => (
                <tr key={task.id} className="table-row">
                  <td className="table-cell">
                    <p className="font-semibold text-foreground">{task.title}</p>
                    <p className="text-[11px] text-dark-500">{task.description}</p>
                  </td>
                  <td className="table-cell text-dark-300">{task.assignedTo}</td>
                  <td className="table-cell"><span className={priorityBadge[task.priority]}>{task.priority}</span></td>
                  <td className="table-cell"><span className="badge-gray">{task.status}</span></td>
                  <td className="table-cell text-dark-400">{task.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Task Modal */}
      <Modal
        isOpen={showNewTask}
        onClose={() => setShowNewTask(false)}
        title="New Task"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowNewTask(false)}>Cancel</Button>
            <Button size="sm">Save Task</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Title</label>
            <input type="text" placeholder="Design homepage wireframe" className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-foreground">Description</label>
            <textarea rows={3} placeholder="Task description..." className="input !rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Assign To</label>
              <select className="select" defaultValue="">
                <option value="" disabled className="bg-dark-800">Select member</option>
                <option value="Daniel" className="bg-dark-800">Daniel</option>
                <option value="Ignas" className="bg-dark-800">Ignas</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Priority</label>
              <select className="select" defaultValue="Medium">
                <option value="Low" className="bg-dark-800">Low</option>
                <option value="Medium" className="bg-dark-800">Medium</option>
                <option value="High" className="bg-dark-800">High</option>
                <option value="Urgent" className="bg-dark-800">Urgent</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Status</label>
              <select className="select" defaultValue="Todo">
                {columns.map((c) => (
                  <option key={c.status} value={c.status} className="bg-dark-800">{c.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-foreground">Due Date</label>
              <input type="date" className="input" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
