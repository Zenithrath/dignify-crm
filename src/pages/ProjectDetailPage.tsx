import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ExternalLink, Plus, CheckSquare } from 'lucide-react';
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

const stageColors: Record<ProjectStage, string> = {
  'Waiting Brief': 'bg-gray-100 text-gray-700',
  'Discovery': 'bg-blue-100 text-blue-700',
  'Wireframe': 'bg-purple-100 text-purple-700',
  'UI Design': 'bg-pink-100 text-pink-700',
  'Development': 'bg-amber-100 text-amber-700',
  'Testing': 'bg-cyan-100 text-cyan-700',
  'Revision': 'bg-orange-100 text-orange-700',
  'Deployment': 'bg-green-100 text-green-700',
  'Completed': 'bg-green-500 text-white',
};

const statusColors: Record<ProjectStatus, string> = {
  'Not Started': 'bg-gray-100 text-gray-600',
  'On Track': 'bg-green-100 text-green-700',
  'At Risk': 'bg-amber-100 text-amber-700',
  'Delayed': 'bg-red-100 text-red-700',
  'Completed': 'bg-green-500 text-white',
};

const priorityColors: Record<TaskPriority, string> = {
  Low: 'bg-gray-100 text-gray-600',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-red-100 text-red-700',
  Urgent: 'bg-red-500 text-white',
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/projects" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">{mockProject.projectName}</h1>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${stageColors[mockProject.stage]}`}>
              {mockProject.stage}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[mockProject.status]}`}>
              {mockProject.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{mockProject.id} · {mockProject.service}</p>
        </div>
        <Button variant="secondary" size="sm">Edit Project</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stage Progress */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Stage Progress</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-medium text-gray-900">{mockProject.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
              <div 
                className="bg-gray-900 h-3 rounded-full transition-all"
                style={{ width: `${mockProject.progress}%` }}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {stages.map((stage, idx) => (
                <div key={stage} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium
                    ${idx <= currentStageIndex 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-500'}
                  `}>
                    {idx + 1}
                  </div>
                  {idx < stages.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      idx < currentStageIndex ? 'bg-gray-900' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              {stages.map((stage) => (
                <span key={stage} className="text-xs text-gray-500 min-w-[60px] text-center">
                  {stage}
                </span>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Task
              </Button>
            </div>
            <div className="space-y-3">
              {mockTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    task.status === 'Completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {task.status === 'Completed' && (
                      <CheckSquare className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">{task.assignedTo} · Due {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Project Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Client</span>
                <Link to={`/clients/${mockProject.clientId}`} className="text-sm text-gray-900 hover:text-gray-700">
                  PT Berkah Sejahtera
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Value</span>
                <span className="text-sm font-medium text-gray-900">
                  Rp {(mockProject.projectValue / 1000000).toFixed(0)}M
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">PIC</span>
                <span className="text-sm text-gray-900">{mockProject.pic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Team</span>
                <span className="text-sm text-gray-900">{mockProject.teamMembers.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="text-sm text-gray-900">
                    {new Date(mockProject.startDate).toLocaleDateString('en-GB', { 
                      day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="text-sm text-gray-900">
                    {new Date(mockProject.deadline).toLocaleDateString('en-GB', { 
                      day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Drive Link */}
          {mockProject.driveLink && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Resources</h3>
              <a
                href={mockProject.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Google Drive</p>
                  <p className="text-xs text-gray-500">Project files</p>
                </div>
              </a>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Notes</h3>
            <p className="text-sm text-gray-700">{mockProject.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
