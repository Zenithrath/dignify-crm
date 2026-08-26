import { Save, Database, Shield, Bell } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Application configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="card p-4">
          <nav className="space-y-1">
            {[
              { label: 'General', icon: Database },
              { label: 'Security', icon: Shield },
              { label: 'Notifications', icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="card p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company Name</label>
                <input
                  type="text"
                  defaultValue="DIGNIFY"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Google Sheet ID</label>
                <input
                  type="text"
                  placeholder="Enter your Google Sheet ID"
                  className="input"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">The spreadsheet that stores your CRM data</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Apps Script Web App URL</label>
                <input
                  type="text"
                  placeholder="https://script.google.com/macros/s/xxx/exec"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Allowed Emails</label>
                <textarea
                  rows={3}
                  placeholder="Enter one email per line"
                  className="input resize-none"
                  defaultValue="daniel@dignify.id
ignas@dignify.id"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Only these emails can access the CRM</p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Follow-up Reminder</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Send email summary of today's follow-ups</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-teal"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Deadline Alert</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Alert when project deadline is approaching</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-teal"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Due Reminder</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Remind when payment is due or overdue</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-teal"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-accent-teal to-accent-green hover:from-accent-teal/90 hover:to-accent-green/90 text-white border-0">
              <Save className="w-4 h-4 mr-1.5" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
