import { Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, ExternalLink, Plus,
  CheckCircle2, Circle, Wallet,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Project, Task, ProjectStage, ProjectStatus, TaskPriority } from '../types';

const mockProject: Project = {
  id: 'PRJ-2026-0001',
  projectName: 'PT Berkah - Company Profile',
  clientId: 'CLI-2026-0001',
  service: 'Website Development',
  pic: 'Daniel',
  teamMembers: ['Daniel', 'Ignas'],
  startDate: '2026-07-20',
  deadline: '2026-09-15',
  stage: 'Development',
  status: 'On Track',
  progress: 65,
  projectValue: 85000000,
  driveLink: 'https://drive.google.com/folder/berkah',
  notes: 'Corporate website with 5 pages',
};

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

const stageBadge: Record<ProjectStage, string> = {
  'Waiting Brief': 'badge-gray',
  'Discovery': 'badge-sky',
  'Wireframe': 'badge-lav',
  'UI Design': 'badge-lav',
  'Development': 'badge-lime',
  'Testing': 'badge-mint',
  'Revision': 'badge-coral',
  'Deployment': 'badge-mint',
  'Completed': 'badge bg-mint-deep text-foreground',
};

const statusBadge: Record<ProjectStatus, string> = {
  'Not Started': 'badge-gray',
  'On Track': 'badge-mint',
  'At Risk': 'badge-coral',
  'Delayed': 'badge bg-coral-deep text-foreground',
  'Completed': 'badge bg-mint-deep text-foreground',
};

const priorityBadge: Record<TaskPriority, string> = {
  Low: 'badge-gray',
  Medium: 'badge-lime',
  High: 'badge-coral',
  Urgent: 'badge bg-coral-deep text-foreground',
};

const stages: ProjectStage[] = [
  'Waiting Brief',
  'Discovery',
  'Wireframe',
  'UI Design',
  'Development',
  'Testing',
  'Revision',
  'Deployment',
  'Completed',
];

export function ProjectDetailPage() {
  const currentStageIndex = stages.indexOf(mockProject.stage);
  const completedTasks = mockTasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/projects" className="icon-btn" aria-label="Back">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-extrabold text-foreground truncate">
              {mockProject.projectName}
            </h1>
            <span className={stageBadge[mockProject.stage]}>{mockProject.stage}</span>
            <span className={statusBadge[mockProject.status]}>{mockProject.status}</span>
          </div>
          <p className="text-sm font-medium text-dark-400 mt-0.5">
            {mockProject.id} · {mockProject.service}
          </p>
        </div>
        <Button variant="secondary" size="sm">Edit Project</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stage progress */}
          <div className="card p-5">
            <h2 className="text-lg font-extrabold text-foreground mb-5">Stage Progress</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-dark-400">Overall Progress</span>
              <span className="text-sm font-extrabold text-foreground">{mockProject.progress}%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-3 mb-7">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${mockProject.progress}%` }}
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {stages.map((stage, idx) => (
                <div key={stage} className="flex items-center flex-shrink-0 last:flex-1">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-extrabold flex-shrink-0 ${
                      idx <= currentStageIndex
                        ? 'bg-teal-500 text-foreground'
                        : 'bg-dark-700 text-dark-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  {idx < stages.length - 1 && (
                    <div className={`w-6 h-0.5 ${idx < currentStageIndex ? 'bg-teal-500' : 'bg-dark-700'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto mt-2">
              {stages.map((stage, idx) => (
                <div key={stage} className="flex items-center flex-shrink-0 last:flex-1">
                  <span className={`text-[9px] font-bold text-center min-w-[52px] ${
                    idx <= currentStageIndex ? 'text-foreground' : 'text-dark-500'
                  }`}>
                    {stage}
                  </span>
                  {idx < stages.length - 1 && <span className="w-6" />}
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-extrabold text-foreground">Tasks</h2>
                <span className="badge-mint">
                  {completedTasks}/{mockTasks.length} done
                </span>
              </div>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Task
              </Button>
            </div>
            <div className="space-y-2.5">
              {mockTasks.map((task) => {
                const done = task.status === 'Completed';
                return (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900 border border-white/[0.04]"
                  >
                    {done ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-dark-500 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${done ? 'text-dark-500 line-through' : 'text-foreground'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs font-medium text-dark-400 mt-0.5">
                        {task.assignedTo} · Due{' '}
                        {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                    <span className={priorityBadge[task.priority]}>{task.priority}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-4">Project Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-dark-400">Client</span>
                <Link
                  to={`/clients/${mockProject.clientId}`}
                  className="text-sm font-bold text-teal-400 hover:underline"
                >
                  PT Berkah Sejahtera
                </Link>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-dark-400">Value</span>
                <span className="text-sm font-extrabold text-foreground inline-flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5 text-teal-400" />
                  Rp {(mockProject.projectValue / 1000000).toFixed(0)}M
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-dark-400">PIC</span>
                <span className="text-sm font-bold text-foreground">{mockProject.pic}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-dark-400">Team</span>
                <div className="flex -space-x-1.5">
                  {mockProject.teamMembers.map((member, i) => (
                    <span
                      key={member}
                      className={`w-7 h-7 rounded-full ring-2 ring-dark-800 flex items-center justify-center text-[10px] font-extrabold ${
                        ['bg-teal-500/20 text-teal-400', 'bg-emerald-500/20 text-emerald-400', 'bg-orange-500/20 text-orange-400'][i % 3]
                      }`}
                    >
                      {member.charAt(0)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-4">Timeline</h3>
            <div className="space-y-3">
              {[
                { label: 'Start Date', value: mockProject.startDate },
                { label: 'Deadline', value: mockProject.deadline },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-sky-500/15 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-sky-400" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-dark-400">{row.label}</p>
                    <p className="text-sm font-bold text-foreground">
                      {new Date(row.value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drive */}
          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-4">Resources</h3>
            <a
              href={mockProject.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/15 hover:bg-purple-500/15 transition-colors cursor-pointer group"
            >
              <span className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-4 h-4 text-foreground" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">Google Drive</p>
                <p className="text-xs font-medium text-dark-400">Project files</p>
              </div>
            </a>
          </div>

          {/* Notes */}
          <div className="card p-5">
            <h3 className="font-extrabold text-foreground mb-3">Notes</h3>
            <p className="text-sm font-medium text-dark-200">{mockProject.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
