import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Task, TaskStatus, TaskPriority } from '../types';

const mockTasks: Task[] = [
  {
    id: 'TASK-2026-0001',
    title: 'Design homepage wireframe',
    description: 'Create wireframe for PT Berkah homepage',
    projectId: 'PRJ-2026-0001',
    assignedTo: 'Ignas',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-08-28',
    createdAt: '2026-08-20',
  },
  {
    id: 'TASK-2026-0002',
    title: 'Setup development environment',
    description: 'Configure Vite and React project',
    projectId: 'PRJ-2026-0001',
    assignedTo: 'Daniel',
    priority: 'Medium',
    status: 'Completed',
    dueDate: '2026-08-22',
    createdAt: '2026-08-20',
  },
  {
    id: 'TASK-2026-0003',
    title: 'Client review meeting',
    description: 'Review design with Klinik Sehat team',
    projectId: 'PRJ-2026-0002',
    assignedTo: 'Ignas',
    priority: 'High',
    status: 'Todo',
    dueDate: '2026-08-30',
    createdAt: '2026-08-25',
  },
  {
    id: 'TASK-2026-0004',
    title: 'API integration',
    description: 'Connect backend API endpoints',
    projectId: 'PRJ-2026-0001',
    assignedTo: 'Daniel',
    priority: 'Medium',
    status: 'Todo',
    dueDate: '2026-09-05',
    createdAt: '2026-08-25',
  },
];

const statusColumns: { status: TaskStatus; color: string }[] = [
  { status: 'Todo', color: 'bg-gray-400 dark:bg-gray-500' },
  { status: 'In Progress', color: 'bg-blue-500' },
  { status: 'Review', color: 'bg-amber-500' },
  { status: 'Completed', color: 'bg-accent-teal' },
  { status: 'Blocked', color: 'bg-red-500' },
];

const priorityColors: Record<TaskPriority, string> = {
  Low: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  Medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  High: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  Urgent: 'bg-red-500 text-white',
};

export function TasksPage() {
  const [view, setView] = useState<'board' | 'list'>('board');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockTasks.length} tasks</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-dark-800 rounded-lg p-1">
            <button
              onClick={() => setView('board')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'board' 
                  ? 'bg-white dark:bg-dark-700 shadow text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Board
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'list' 
                  ? 'bg-white dark:bg-dark-700 shadow text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              List
            </button>
          </div>
          <Button className="bg-gradient-to-r from-accent-teal to-accent-green hover:from-accent-teal/90 hover:to-accent-green/90 text-white border-0">
            <Plus className="w-4 h-4 mr-1.5" />
            New Task
          </Button>
        </div>
      </div>

      {view === 'board' ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {statusColumns.map((col) => (
            <div key={col.status} className="flex flex-col min-w-[280px] w-[280px]">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{col.status}</h3>
                <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-dark-700 px-2 py-0.5 rounded-full">
                  {mockTasks.filter(t => t.status === col.status).length}
                </span>
              </div>
              <div className="flex-1 bg-gray-50 dark:bg-dark-900/50 rounded-xl p-2 space-y-2 min-h-[200px] border border-gray-100 dark:border-dark-800">
                {mockTasks
                  .filter((task) => task.status === col.status)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-3 cursor-grab hover:shadow-md dark:hover:shadow-dark-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{task.title}</h4>
                        <span className={`badge ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{task.assignedTo}</span>
                        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Task</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Assigned</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {mockTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{task.description}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{task.assignedTo}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{task.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
