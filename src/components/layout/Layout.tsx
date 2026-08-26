import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, KanbanSquare, Briefcase,
  CheckSquare, CreditCard, Settings,
  Search, ChevronRight, Menu as MenuIcon, X,
  House, LogOut, Layers, Calendar, CalendarDays,
  PanelLeftClose, PanelLeftOpen,
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
      { path: '/work', label: 'Work', icon: KanbanSquare },
      { path: '/clients', label: 'Clients', icon: Briefcase },
      { path: '/tasks', label: 'Tasks', icon: CheckSquare },
      { path: '/content', label: 'Content', icon: Calendar },
      { path: '/calendar', label: 'Calendar', icon: CalendarDays },
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
  '/work': 'Work',
  '/clients': 'Clients',
  '/tasks': 'Tasks',
  '/content': 'Content Schedule',
  '/calendar': 'Calendar',
  '/payments': 'Payments',
  '/services': 'Services',
  '/team': 'Team',
  '/settings': 'Settings',
};

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem('dignify-sidebar-collapsed') !== '0'
  );

  useEffect(() => {
    localStorage.setItem('dignify-sidebar-collapsed', collapsed ? '1' : '0');
  }, [collapsed]);

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

  const renderSidebar = (expanded: boolean, showToggle: boolean) => {
    const rowClass = (active: boolean) =>
      `gs-sidebar-item flex items-center transition-colors ${
        expanded
          ? 'w-full justify-start gap-3 px-3 h-10 rounded-lg'
          : 'w-10 h-10 justify-center rounded-full'
      } ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-[oklch(0.985_0_0)] hover:bg-white/10 hover:text-white'
      }`;

    const settingsLink = (
      <Link
        to="/settings"
        onClick={() => setMobileOpen(false)}
        aria-label="Settings"
        className={rowClass(location.pathname.startsWith('/settings'))}
      >
        <Settings className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.8} />
        {expanded && <span className="text-sm font-medium whitespace-nowrap">Settings</span>}
      </Link>
    );

    const logoutButton = (
      <button
        type="button"
        aria-label="Logout"
        className={`gs-sidebar-item flex items-center transition-colors text-[oklch(0.985_0_0)] hover:bg-white/10 hover:text-red-400 ${
          expanded
            ? 'w-full justify-start gap-3 px-3 h-10 rounded-lg'
            : 'w-10 h-10 justify-center rounded-full'
        }`}
      >
        <LogOut className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.8} />
        {expanded && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
      </button>
    );

    return (
      <TooltipProvider delay={200}>
        <div className={`flex flex-col h-full w-full py-4 gap-1 ${expanded ? 'px-3' : 'items-center'}`}>
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`mb-4 flex items-center gap-3 flex-shrink-0 ${expanded ? 'px-3' : 'justify-center'}`}
            aria-label="Dignify CRM home"
          >
            <img src="/logo.png" alt="Dignify" className="w-9 h-9 object-contain rounded-xl" />
            {expanded && <span className="text-base font-bold tracking-tight">Dignify</span>}
          </Link>

          {/* Navigation */}
          <nav
            className={`flex-1 flex flex-col gap-1.5 ${expanded ? 'w-full' : 'items-center'}`}
            aria-label="Main navigation"
          >
            {navSections.map((section, idx) => (
              <div key={idx} className={`flex flex-col gap-1.5 ${expanded ? 'w-full' : 'items-center'}`}>
                {idx > 0 && (
                  <div
                    className={`${expanded ? 'w-full my-2' : 'w-6'} h-px bg-white/10`}
                    aria-hidden="true"
                  />
                )}
                {section.items.map((item) => {
                  const isActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path);
                  const Icon = item.icon;
                  const link = (
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={item.label}
                      className={rowClass(isActive)}
                    >
                      <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.8} />
                      {expanded && (
                        <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                      )}
                    </Link>
                  );
                  if (expanded) {
                    return <Fragment key={item.path}>{link}</Fragment>;
                  }
                  return (
                    <Tooltip key={item.path}>
                      <TooltipTrigger render={link} />
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Collapse toggle */}
          {showToggle && (
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              className={`flex items-center mt-2 transition-colors text-[oklch(0.985_0_0)] hover:bg-white/10 hover:text-white ${
                expanded
                  ? 'w-full justify-start gap-3 px-3 h-10 rounded-lg'
                  : 'w-10 h-10 justify-center rounded-full'
              }`}
            >
              {collapsed ? (
                <PanelLeftOpen className="w-[18px] h-[18px]" strokeWidth={1.8} />
              ) : (
                <PanelLeftClose className="w-[18px] h-[18px]" strokeWidth={1.8} />
              )}
              {expanded && <span className="text-sm font-medium whitespace-nowrap">Collapse</span>}
            </button>
          )}

          {/* Bottom: settings + logout + profile */}
          <div
            className={`flex flex-col gap-1.5 mt-4 pt-4 border-t border-white/10 ${
              expanded ? 'w-full' : 'items-center'
            }`}
          >
            {expanded ? (
              settingsLink
            ) : (
              <Tooltip>
                <TooltipTrigger render={settingsLink} />
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            )}
            {expanded ? (
              logoutButton
            ) : (
              <Tooltip>
                <TooltipTrigger render={logoutButton} />
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            )}
            {expanded ? (
              <button
                type="button"
                aria-label="Profile"
                className="mt-1 w-full flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <img
                  src="/logo.png"
                  alt=""
                  className="w-9 h-9 rounded-full object-cover border border-white/10 bg-muted flex-shrink-0"
                />
                <span className="text-left leading-tight">
                  <span className="block text-sm font-bold">Daniel</span>
                  <span className="block text-[11px] opacity-60">@dignify</span>
                </span>
              </button>
            ) : (
              <button
                type="button"
                aria-label="Profile"
                className="mt-1 w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-muted flex items-center justify-center flex-shrink-0"
              >
                <img src="/logo.png" alt="Daniel" className="w-full h-full object-cover" />
              </button>
            )}
          </div>
        </div>
      </TooltipProvider>
    );
  };

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
      <aside
        className={`hidden lg:flex flex-shrink-0 border-r border-white/10 bg-[oklch(0.145_0_0)] text-[oklch(0.985_0_0)] overflow-hidden transition-[width] duration-200 ${
          collapsed ? 'w-[72px]' : 'w-[240px]'
        }`}
      >
        {renderSidebar(!collapsed, true)}
      </aside>

      {/* Sidebar — mobile drawer */}
      {mobileOpen && (
        <aside className="fixed lg:hidden inset-y-0 left-0 z-50 w-[240px] bg-[oklch(0.145_0_0)] text-[oklch(0.985_0_0)] border-r border-white/10 shadow-dark-lift flex">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-3 right-1.5 icon-btn !w-6 !h-6 border-white/10 text-[oklch(0.985_0_0)]"
            aria-label="Close menu"
          >
            <X className="w-3 h-3" />
          </button>
          {renderSidebar(true, false)}
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
