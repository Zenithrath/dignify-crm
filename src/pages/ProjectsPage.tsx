import { Link } from 'react-router-dom';
import { Search, Plus, Calendar, Users, FolderKanban } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Project, ProjectStage, ProjectStatus } from '../types';

const mockProjects: Project[] = [
  {
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
  },
  {
    id: 'PRJ-2026-0002',
    projectName: 'Klinik Sehat - Website Redesign',
    clientId: 'CLI-2026-0002',
    service: 'UI/UX Design',
    pic: 'Ignas',
    teamMembers: ['Ignas'],
    startDate: '2026-08-05',
    deadline: '2026-08-30',
    stage: 'UI Design',
    status: 'At Risk',
    progress: 40,
    projectValue: 45000000,
    driveLink: 'https://drive.google.com/folder/sehat',
    notes: 'Modern clinic website',
  },
];

const stageColors: Record<ProjectStage, string> = {
  'Waiting Brief': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  'Discovery': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  'Wireframe': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  'UI Design': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
  'Development': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  'Testing': 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
  'Revision': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  'Deployment': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  'Completed': 'bg-accent-teal/20 text-accent-teal',
};

const statusColors: Record<ProjectStatus, string> = {
  'Not Started': 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  'On Track': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  'At Risk': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  'Delayed': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  'Completed': 'bg-accent-teal/20 text-accent-teal',
};

export function ProjectsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockProjects.length} active projects</p>
        </div>
        <Button className="bg-gradient-to-r from-accent-teal to-accent-green hover:from-accent-teal/90 hover:to-accent-green/90 text-white border-0">
          <Plus className="w-4 h-4 mr-1.5" />
          New Project
        </Button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            className="input pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block card-hover p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{project.projectName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.service}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge ${stageColors[project.stage] || ''}`}>
                  {project.stage}
                </span>
                <span className={`badge ${statusColors[project.status] || ''}`}>
                  {project.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {project.pic}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(project.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-1.5">
                <FolderKanban className="w-4 h-4" />
                Rp {(project.projectValue / 1000000).toFixed(0)}M
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-dark-900 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-accent-teal to-accent-green h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
