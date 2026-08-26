import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, GitBranch, Briefcase,
  FolderKanban, CheckSquare, CreditCard, Settings,
  Search, ChevronRight, Menu as MenuIcon, X,
  House, LogOut, Layers, Calendar,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface LayoutProps {
  children: React.ReactNode;
}

const navSections = [
  {
    items: [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/leads', label: 'Leads', icon: Users },
      { path: '/pipeline', label: 'Pipeline', icon: GitBranch },
      { path: '/clients', label: 'Clients', icon: Briefcase },
      { path: '/projects', label: 'Projects', icon: FolderKanban },
      { path: '/tasks', label: 'Tasks', icon: CheckSquare },
      { path: '/content', label: 'Content', icon: Calendar },
    ],
  },
  {
    items: [
      { path: '/payments', label: 'Payments', icon: CreditCard },
      { path: '/services', label: 'Services', icon: Layers },
      { path: '/team', label: 'Team', icon: Users },
    ],
  },
];

const pageTitles: Record<string, string> = {
  '/': 'Overviews',
  '/leads': 'Leads',
  '/pipeline': 'Pipeline',
  '/clients': 'Clients',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/content': 'Content Schedule',
  '/payments': 'Payments',
  '/services': 'Services',
  '/team': 'Team',
  '/settings': 'Settings',
};

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(() => {
    gsap.from('.gs-sidebar-item', {
      opacity: 0,
      x: -14,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.out',
    });
  });

  const currentTitle = pageTitles[location.pathname] ?? location.pathname.split('/')[1] ?? 'Overviews';

  const sidebar = (
    <TooltipProvider delay={200}>
      <div className="flex flex-col h-full items-center py-4 gap-1">
        {/* Logo */}
        <Link to="/" className="mb-4" aria-label="Dignify CRM home">
          <img src="/logo.png" alt="Dignify" className="w-9 h-9 object-contain rounded-xl" />
        </Link>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center gap-1.5" aria-label="Main navigation">
          {navSections.map((section, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              {idx > 0 && <div className="w-6 h-px bg-white/10 my-1" aria-hidden="true" />}
              {section.items.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger
                      render={
                        <Link
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          aria-current={isActive ? 'page' : undefined}
                          aria-label={item.label}
                          className={`gs-sidebar-item flex w-10 h-10 items-center justify-center rounded-full transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-[oklch(0.985_0_0)] hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
                        </Link>
                      }
                    />
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom: settings + logout */}
        <div className="flex flex-col items-center gap-1.5 mt-4 pt-4 border-t border-white/10">
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  to="/settings"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Settings"
                  className={`gs-sidebar-item flex w-10 h-10 items-center justify-center rounded-full transition-colors ${
                    location.pathname.startsWith('/settings')
                      ? 'bg-primary text-primary-foreground'
                      : 'text-[oklch(0.985_0_0)] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Settings className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </Link>
              }
            />
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  className="gs-sidebar-item flex w-10 h-10 items-center justify-center rounded-full text-[oklch(0.985_0_0)] hover:bg-white/10 hover:text-red-400 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </button>
              }
            />
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
          <button
            className="mt-1 w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-muted flex items-center justify-center flex-shrink-0"
            aria-label="Profile"
          >
            <img src="/logo.png" alt="Daniel" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </TooltipProvider>
  );

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex w-[72px] flex-shrink-0 border-r border-white/10 bg-[oklch(0.145_0_0)] text-[oklch(0.985_0_0)] items-center justify-center">
        {sidebar}
      </aside>

      {/* Sidebar — mobile drawer */}
      {mobileOpen && (
        <aside className="fixed lg:hidden inset-y-0 left-0 z-50 w-[72px] bg-[oklch(0.145_0_0)] text-[oklch(0.985_0_0)] border-r border-white/10 shadow-dark-lift flex items-center justify-center">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-3 right-1.5 icon-btn !w-6 !h-6 border-white/10 text-[oklch(0.985_0_0)]"
            aria-label="Close menu"
          >
            <X className="w-3 h-3" />
          </button>
          {sidebar}
        </aside>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center gap-4 h-14 px-4 lg:px-5 flex-shrink-0 border-b border-border">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden icon-btn"
            aria-label="Open menu"
          >
            <MenuIcon className="w-4 h-4" />
          </button>

          {/* Breadcrumb */}
          <nav className="hidden sm:flex items-center gap-1.5 text-[13px]" aria-label="Breadcrumb">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Home"
            >
              <House className="w-4 h-4" strokeWidth={1.8} />
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span className="font-semibold text-foreground">{currentTitle}</span>
          </nav>

          {/* Search */}
          <div className="relative flex-1 max-w-md mx-auto">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none"
              strokeWidth={1.8}
            />
            <input
              type="search"
              placeholder="Search..."
              aria-label="Search"
              className="input !pl-10"
            />
          </div>

          {/* User */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg border border-border overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
              <img src="/logo.png" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:block leading-tight">
              <p className="text-[13px] font-bold text-foreground">Daniel</p>
              <p className="text-[11px] text-muted-foreground">@dignify</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-5 pb-6">{children}</main>
      </div>
    </div>
  );
}
