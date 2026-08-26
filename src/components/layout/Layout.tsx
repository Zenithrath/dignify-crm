import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  House,
  Clock,
  Briefcase,
  Calendar,
  CheckSquare,
  FileText,
  Bookmark,
  Bell,
  Menu as MenuIcon,
  X,
  CreditCard,
  Settings,
  Users,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'Overview', icon: House },
  { path: '/leads', label: 'Leads & Timeline', icon: Clock },
  { path: '/work', label: 'Work & Projects', icon: Briefcase },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/content', label: 'Content Schedule', icon: FileText },
  { path: '/services', label: 'Services', icon: Bookmark },
  { path: '/payments', label: 'Payments', icon: CreditCard },
  { path: '/team', label: 'Team', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isNavActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <TooltipProvider delay={150}>
      <div className="flex h-screen bg-[#0E0F13] text-[#F4F6FA] overflow-hidden select-none font-sans relative">
        {/* Subtle Ambient Glowing Mesh Backgrounds */}
        <div
          className="pointer-events-none absolute -top-40 left-20 w-[500px] h-[500px] rounded-full bg-[#D8FF3F]/[0.025] blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-[#A89AE8]/[0.035] blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-[#FF5A5A]/[0.02] blur-[130px]"
          aria-hidden="true"
        />

        {/* Mobile menu overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile Drawer */}
        {mobileOpen && (
          <aside className="fixed lg:hidden inset-y-0 left-0 z-50 w-[260px] bg-[#121318] border-r border-white/10 p-5 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#D8FF3F] flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(216,255,63,0.4)]">
                    ✻
                  </div>
                  <div>
                    <h2 className="font-extrabold text-lg tracking-tight text-white">Dignify CRM</h2>
                    <p className="text-[11px] text-white/50">Next-gen Workflow</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="icon-btn !w-8 !h-8 text-white/70 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = isNavActive(item.path);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-[#D8FF3F] text-black font-bold shadow-[0_0_15px_rgba(216,255,63,0.3)]'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="User"
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">Jessie Caballero</p>
                <p className="text-xs text-white/50 truncate">jessie@microsoft.com</p>
              </div>
            </div>
          </aside>
        )}

        {/* Desktop Mini Icon Sidebar Rail */}
        <aside className="hidden lg:flex flex-col items-center justify-between w-[70px] flex-shrink-0 h-full py-5 bg-[#121318]/90 border-r border-white/[0.07] backdrop-blur-xl z-20">
          {/* Top: Starburst/Asterisk Logo */}
          <div className="flex flex-col items-center gap-6">
            <Link
              to="/"
              className="w-10 h-10 rounded-2xl bg-transparent hover:bg-white/5 transition-all flex items-center justify-center group"
              aria-label="Home"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[#D8FF3F] hover:scale-110 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 fill-[#D8FF3F] stroke-[#D8FF3F]"
                  strokeWidth="1.5"
                >
                  {/* 8-pointed star flower */}
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
            </Link>

            {/* Navigation icon buttons */}
            <nav className="flex flex-col items-center gap-3">
              {/* App Overview / Grid */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to="/"
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        location.pathname === '/app-grid'
                          ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)]'
                          : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <LayoutGrid className="w-[19px] h-[19px]" strokeWidth={1.8} />
                    </Link>
                  }
                />
                <TooltipContent side="right">Apps</TooltipContent>
              </Tooltip>

              {/* Main Home / CRM Dashboard */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to="/"
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        location.pathname === '/'
                          ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)] font-bold'
                          : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <House className="w-[19px] h-[19px]" strokeWidth={2} />
                    </Link>
                  }
                />
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>

              {/* Leads / History */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to="/leads"
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        isNavActive('/leads')
                          ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)] font-bold'
                          : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <Clock className="w-[19px] h-[19px]" strokeWidth={1.8} />
                    </Link>
                  }
                />
                <TooltipContent side="right">Leads & History</TooltipContent>
              </Tooltip>

              {/* Work / Deals */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to="/work"
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        isNavActive('/work')
                          ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)]'
                          : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <Briefcase className="w-[19px] h-[19px]" strokeWidth={1.8} />
                    </Link>
                  }
                />
                <TooltipContent side="right">Work & Pipeline</TooltipContent>
              </Tooltip>

              {/* Calendar */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to="/calendar"
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        isNavActive('/calendar')
                          ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)]'
                          : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <Calendar className="w-[19px] h-[19px]" strokeWidth={1.8} />
                    </Link>
                  }
                />
                <TooltipContent side="right">Calendar</TooltipContent>
              </Tooltip>

              {/* Tasks */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to="/tasks"
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        isNavActive('/tasks')
                          ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)]'
                          : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <CheckSquare className="w-[19px] h-[19px]" strokeWidth={1.8} />
                    </Link>
                  }
                />
                <TooltipContent side="right">Tasks</TooltipContent>
              </Tooltip>

              {/* Content / Documents */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to="/content"
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        isNavActive('/content')
                          ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)]'
                          : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <FileText className="w-[19px] h-[19px]" strokeWidth={1.8} />
                    </Link>
                  }
                />
                <TooltipContent side="right">Content & Documents</TooltipContent>
              </Tooltip>

              {/* Services / Saved */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to="/services"
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        isNavActive('/services')
                          ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)]'
                          : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <Bookmark className="w-[19px] h-[19px]" strokeWidth={1.8} />
                    </Link>
                  }
                />
                <TooltipContent side="right">Services & Bookmarks</TooltipContent>
              </Tooltip>
            </nav>
          </div>

          {/* Bottom Icons: Notification bell + User avatar */}
          <div className="flex flex-col items-center gap-3">
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all relative"
                    aria-label="Notifications"
                  >
                    <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF5A5A] ring-2 ring-[#121318]" />
                  </button>
                }
              />
              <TooltipContent side="right">Notifications</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Link
                    to="/settings"
                    className="w-10 h-10 rounded-full overflow-hidden border border-white/20 hover:border-[#D8FF3F] transition-all p-0.5"
                    aria-label="Profile Settings"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                      alt="User avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </Link>
                }
              />
              <TooltipContent side="right">Profile Settings</TooltipContent>
            </Tooltip>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Mobile Top Header */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#121318] border-b border-white/10 flex-shrink-0 z-10">
            <button
              onClick={() => setMobileOpen(true)}
              className="icon-btn text-white"
              aria-label="Open menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#D8FF3F] text-black font-black text-xs flex items-center justify-center">
                ✻
              </div>
              <span className="font-bold text-sm tracking-tight">Dignify CRM</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover border border-white/20"
            />
          </div>

          {/* Children Page View */}
          <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden p-3 sm:p-4 lg:p-5">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
