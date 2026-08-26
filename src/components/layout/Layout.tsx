import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, GitBranch, Briefcase, 
  FolderKanban, CheckSquare, CreditCard, Settings,
  ChevronLeft, Search, Bell, Plus, Menu, X, Moon, Sun
} from 'lucide-react';
import { Button } from '../ui/Button';

interface LayoutProps {
  children: React.ReactNode;
}

const navSections = [
  {
    label: '',
    items: [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    label: 'SALES',
    items: [
      { path: '/leads', label: 'Leads', icon: Users },
      { path: '/pipeline', label: 'Pipeline', icon: GitBranch },
      { path: '/clients', label: 'Clients', icon: Briefcase },
    ]
  },
  {
    label: 'WORK',
    items: [
      { path: '/projects', label: 'Projects', icon: FolderKanban },
      { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    ]
  },
  {
    label: 'FINANCE',
    items: [
      { path: '/payments', label: 'Payments', icon: CreditCard },
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      { path: '/services', label: 'Services', icon: Settings },
      { path: '/team', label: 'Team', icon: Users },
      { path: '/settings', label: 'Settings', icon: Settings },
    ]
  },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-950">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-white dark:bg-dark-900 border-r border-gray-200 dark:border-dark-700
        transition-all duration-200
        ${sidebarOpen ? 'w-64' : 'w-20'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-dark-700">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-teal to-accent-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              {sidebarOpen && (
                <span className="font-semibold text-gray-900 dark:text-white">DIGNIFY CRM</span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400"
            >
              <ChevronLeft className={`w-5 h-5 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {navSections.map((section, idx) => (
              <div key={idx} className="mb-6">
                {section.label && sidebarOpen && (
                  <div className="px-3 mb-2 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {section.label}
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                          transition-colors duration-150
                          ${isActive 
                            ? 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-800 hover:text-gray-900 dark:hover:text-white'}
                        `}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span>{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-accent-teal/30 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Button variant="primary" size="sm" className="bg-gradient-to-r from-accent-teal to-accent-green hover:from-accent-teal/90 hover:to-accent-green/90 text-white border-0">
              <Plus className="w-4 h-4 mr-1.5" />
              New Lead
            </Button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-dark-700">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-teal to-accent-green rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">D</span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">Daniel</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-dark-950">
          {children}
        </main>
      </div>
    </div>
  );
}
