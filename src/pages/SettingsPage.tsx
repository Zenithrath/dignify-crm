import { useState } from 'react';
import { Settings, Shield, Bell } from 'lucide-react';
import { Button } from '../components/ui/Button';

const tabs = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });

  return (
    <div className="space-y-4 max-w-[1400px]">
      <h1 className="text-xl font-extrabold text-foreground">Settings</h1>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-foreground/[0.04] text-foreground border border-border'
                    : 'text-dark-400 hover:text-foreground hover:bg-foreground/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.8} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 card glass p-5">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-foreground mb-4">General Settings</h2>
              <div>
                <label className="block text-[12px] font-semibold text-dark-300 mb-1.5">Company Name</label>
                <input type="text" defaultValue="Dignify" className="input" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-dark-300 mb-1.5">Google Sheet ID</label>
                <input type="text" placeholder="Enter Sheet ID" className="input" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-dark-300 mb-1.5">Apps Script URL</label>
                <input type="text" placeholder="Enter Apps Script URL" className="input" />
              </div>
              <Button size="sm">Save Changes</Button>
            </div>
          )}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-foreground mb-4">Security</h2>
              <div>
                <label className="block text-[12px] font-semibold text-dark-300 mb-1.5">Allowed Emails</label>
                <textarea rows={4} placeholder="Enter emails, one per line" className="input !rounded-lg" />
              </div>
              <Button size="sm">Save</Button>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-foreground mb-4">Notifications</h2>
              {(['email', 'push', 'weekly'] as const).map((key) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <span className="text-[13px] text-dark-200 capitalize">{key} notifications</span>
                  <button
                    onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                    className={`toggle-switch ${notifications[key] ? 'toggle-switch-active' : ''}`}
                    aria-label={`${key} notifications`}
                  />
                </div>
              ))}
              <Button size="sm">Save</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
