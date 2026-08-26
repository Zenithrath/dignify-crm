import { Plus, Edit2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { User, UserRole } from '../types';

const mockTeam: User[] = [
  {
    id: 'USR-001',
    name: 'Daniel',
    email: 'daniel@dignify.id',
    role: 'Admin',
    active: true,
  },
  {
    id: 'USR-002',
    name: 'Ignas',
    email: 'ignas@dignify.id',
    role: 'Member',
    active: true,
  },
];

const roleColors: Record<UserRole, string> = {
  Admin: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  Member: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Viewer: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
};

export function TeamPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Team</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockTeam.length} team members</p>
        </div>
        <Button className="bg-gradient-to-r from-accent-teal to-accent-green hover:from-accent-teal/90 hover:to-accent-green/90 text-white border-0">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Member
        </Button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Member</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
            {mockTeam.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-teal to-accent-green rounded-full flex items-center justify-center">
                      <span className="font-medium text-white">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{member.email}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${roleColors[member.role]}`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-medium ${member.active ? 'text-accent-teal' : 'text-gray-400 dark:text-gray-500'}`}>
                    {member.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg text-gray-500 dark:text-gray-400">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
