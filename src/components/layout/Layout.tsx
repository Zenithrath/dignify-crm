import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  House,
  Bell,
  List,
  X,
  ListPlus,
  Code,
  Calendar,
} from '@phosphor-icons/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { DashboardProvider } from '../../contexts/DashboardContext';
import { WorklistSidebar } from '../sidebar/WorklistSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <TooltipProvider delay={150}>
      <DashboardProvider>
        <div className="flex h-screen bg-[#0E0F13] text-[#F4F6FA] overflow-hidden select-none font-sans relative">
          {/* Ambient Glowing Mesh Backgrounds */}
          <div className="pointer-events-none absolute -top-40 left-20 w-[500px] h-[500px] rounded-full bg-[#D8FF3F]/[0.025] blur-[120px]" aria-hidden="true" />
          <div className="pointer-events-none absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-[#A89AE8]/[0.035] blur-[140px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-[#FF5A5A]/[0.02] blur-[130px]" aria-hidden="true" />

          {/* Mobile overlay */}
          {mobileOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          )}

          {/* Mobile Drawer */}
          {mobileOpen && (
            <aside className="fixed lg:hidden inset-y-0 left-0 z-50 w-[260px] bg-[#121318] border-r border-white/10 p-5 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#D8FF3F] flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(216,255,63,0.4)]">✻</div>
                    <div>
                      <h2 className="font-extrabold text-lg tracking-tight text-white">Dignify CRM</h2>
                      <p className="text-[11px] text-white/50">Next-gen Workflow</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="icon-btn !w-8 !h-8 text-white/70 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <nav className="flex flex-col gap-2">
                  <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all bg-[#D8FF3F] text-black font-bold shadow-[0_0_15px_rgba(216,255,63,0.3)]">
                    <House className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/pipeline" onClick={() => setMobileOpen(false)} className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-white/60 hover:text-white hover:bg-white/[0.06]">
                    <ListPlus className="w-4 h-4" />
                    <span>Pipeline & Deal</span>
                  </Link>
                  <Link to="/development" onClick={() => setMobileOpen(false)} className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-white/60 hover:text-white hover:bg-white/[0.06]">
                    <Code className="w-4 h-4" />
                    <span>Progress Dev</span>
                  </Link>
                  <Link to="/content" onClick={() => setMobileOpen(false)} className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-white/60 hover:text-white hover:bg-white/[0.06]">
                    <Calendar className="w-4 h-4" />
                    <span>Progress Content</span>
                  </Link>
                </nav>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" alt="User" className="w-10 h-10 rounded-full object-cover border border-white/20" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">Jessie Caballero</p>
                  <p className="text-xs text-white/50 truncate">jessie@microsoft.com</p>
                </div>
              </div>
            </aside>
          )}

          {/* Desktop Icon Sidebar */}
          <aside className="hidden lg:flex flex-col items-center justify-between w-[70px] flex-shrink-0 h-full py-5 bg-[#121318]/90 border-r border-white/[0.07] backdrop-blur-xl z-20">
            <div className="flex flex-col items-center gap-6">
              {/* Logo */}
              <Link to="/" className="w-10 h-10 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center group" aria-label="Home">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[#D8FF3F] hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#D8FF3F] stroke-[#D8FF3F]" strokeWidth="1.5">
                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
              </Link>

              {/* Nav */}
              <nav className="flex flex-col items-center gap-3">
                <Tooltip>
                  <TooltipTrigger render={
                    <Link to="/" className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${location.pathname === '/' ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)] font-bold' : 'text-white/40 hover:text-white hover:bg-white/[0.06]'}`}>
                      <House className="w-[19px] h-[19px]" strokeWidth={2} />
                    </Link>
                  } />
                  <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={
                    <Link to="/pipeline" className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${location.pathname === '/pipeline' ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)] font-bold' : 'text-white/40 hover:text-white hover:bg-white/[0.06]'}`}>
                      <ListPlus className="w-[19px] h-[19px]" strokeWidth={2} />
                    </Link>
                  } />
                  <TooltipContent side="right">Pipeline & Deal</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={
                    <Link to="/development" className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${location.pathname === '/development' ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)] font-bold' : 'text-white/40 hover:text-white hover:bg-white/[0.06]'}`}>
                      <Code className="w-[19px] h-[19px]" strokeWidth={2} />
                    </Link>
                  } />
                  <TooltipContent side="right">Progress Dev</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={
                    <Link to="/content" className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${location.pathname === '/content' ? 'bg-[#D8FF3F] text-black shadow-[0_0_20px_rgba(216,255,63,0.4)] font-bold' : 'text-white/40 hover:text-white hover:bg-white/[0.06]'}`}>
                      <Calendar className="w-[19px] h-[19px]" strokeWidth={2} />
                    </Link>
                  } />
                  <TooltipContent side="right">Progress Content</TooltipContent>
                </Tooltip>
              </nav>
            </div>

            {/* Bottom */}
            <div className="flex flex-col items-center gap-3">
              <Tooltip>
                <TooltipTrigger render={
                  <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all relative" aria-label="Notifications">
                    <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF5A5A] ring-2 ring-[#121318]" />
                  </button>
                } />
                <TooltipContent side="right">Notifications</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={
                  <Link to="/" className="w-10 h-10 rounded-full overflow-hidden border border-white/20 hover:border-[#D8FF3F] transition-all p-0.5" aria-label="Profile">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" alt="User avatar" className="w-full h-full object-cover rounded-full" />
                  </Link>
                } />
                <TooltipContent side="right">Profile</TooltipContent>
              </Tooltip>
            </div>
          </aside>

          {/* Worklist Sidebar */}
          <WorklistSidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#121318] border-b border-white/10 flex-shrink-0 z-10">
              <button onClick={() => setMobileOpen(true)} className="icon-btn text-white" aria-label="Open menu">
                <List className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#D8FF3F] text-black font-black text-xs flex items-center justify-center">✻</div>
                <span className="font-bold text-sm tracking-tight">Dignify CRM</span>
              </div>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" alt="Profile" className="w-7 h-7 rounded-full object-cover border border-white/20" />
            </div>

            {/* Children */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden p-3 sm:p-4 lg:p-5">
              {children}
            </main>
          </div>
        </div>
      </DashboardProvider>
    </TooltipProvider>
  );
}
