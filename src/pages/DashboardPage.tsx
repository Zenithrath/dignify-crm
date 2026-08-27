import {
  Users,
  Briefcase,
  CheckSquare,
  Clock,
  Phone,
  Envelope,
  Calendar,
  ChartLineUp,
  Pen,
  Globe,
  Video,
} from '@phosphor-icons/react';
import { useDashboard } from '../contexts/DashboardContext';

const statusColor: Record<string, string> = {
  'Planning': 'bg-[#A89AE8]/15 text-[#A89AE8]',
  'In Progress': 'bg-[#FFD043]/15 text-[#FFD043]',
  'Review': 'bg-[#4CD7E0]/15 text-[#4CD7E0]',
  'Completed': 'bg-[#D8FF3F]/15 text-[#D8FF3F]',
  'On Hold': 'bg-[#FF5A5A]/15 text-[#FF5A5A]',
};

const clientStatusColor: Record<string, string> = {
  Active: 'bg-[#D8FF3F]/15 text-[#D8FF3F]',
  Lead: 'bg-[#FFD043]/15 text-[#FFD043]',
  Inactive: 'bg-white/10 text-white/40',
};

const stepColor: Record<string, string> = {
  Done: 'bg-[#D8FF3F] text-black',
  'In Progress': 'bg-[#FFD043] text-black',
  Todo: 'bg-white/10 text-white/40',
  '—': 'bg-white/5 text-white/20',
};

const platformIcon: Record<string, typeof Globe> = {
  Instagram: Globe,
  TikTok: Video,
  LinkedIn: Globe,
};

const socialStatusColor: Record<string, string> = {
  Good: 'bg-[#D8FF3F]/15 text-[#D8FF3F]',
  'Needs Attention': 'bg-[#FFD043]/15 text-[#FFD043]',
  Low: 'bg-[#FF5A5A]/15 text-[#FF5A5A]',
};

export function DashboardPage() {
  const { user, analytics, projects, contentWeek, contentMonth, socialMedia, clientContacts } = useDashboard();

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 pb-6">
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* TOP: USER PROFILE BAR (full-width)                                        */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] px-6 py-4 flex items-center justify-between relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#D8FF3F]/[0.04] blur-[80px]" />
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/15 shadow-lg" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#D8FF3F] border-2 border-[#17181F] flex items-center justify-center">
              <CheckSquare size={10} weight="bold" className="text-black" />
            </span>
          </div>
          <div>
            <h1 className="text-base font-bold text-white">{user.name}</h1>
            <p className="text-[11px] text-white/50">{user.role} · {user.department}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-white/40">
          <span className="flex items-center gap-1.5"><Envelope size={12} />{user.email}</span>
          <span className="flex items-center gap-1.5"><Phone size={12} />{user.phone}</span>
          <span className="bg-white/5 px-2.5 py-1 rounded-full text-[10px] text-white/30">{user.employeeId}</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* WEEKLY OVERVIEW + CONTENT STATUS                                         */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Overview Big Card */}
        <div className="bg-[#D8FF3F] text-black rounded-[22px] p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-black/[0.05] blur-[40px]" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-black/50 uppercase tracking-wider">Monthly Overview</span>
            <ChartLineUp size={20} weight="bold" className="text-black/40" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-black/5 rounded-[14px] p-3">
              <p className="text-2xl font-extrabold tracking-tight">{analytics.projectsAccepted}</p>
              <span className="text-[10px] font-bold text-black/50">Project Diterima</span>
            </div>
            <div className="bg-black/5 rounded-[14px] p-3">
              <p className="text-2xl font-extrabold tracking-tight">{analytics.projectsCompleted}</p>
              <span className="text-[10px] font-bold text-black/50">Project Selesai</span>
            </div>
            <div className="bg-black/5 rounded-[14px] p-3">
              <p className="text-2xl font-extrabold tracking-tight">{analytics.contentPublished}</p>
              <span className="text-[10px] font-bold text-black/50">Konten Publish</span>
            </div>
            <div className="bg-black/5 rounded-[14px] p-3">
              <p className="text-2xl font-extrabold tracking-tight">{analytics.newClients}</p>
              <span className="text-[10px] font-bold text-black/50">Client Baru</span>
            </div>
          </div>
        </div>

        {/* Content Status 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Konten Publish', value: analytics.contentPublished, icon: CheckSquare, color: 'text-[#D8FF3F]', bg: 'bg-[#D8FF3F]/10' },
            { label: 'Belum Publish', value: analytics.contentPending, icon: Clock, color: 'text-[#FFD043]', bg: 'bg-[#FFD043]/10' },
            { label: 'Tasks Selesai', value: analytics.tasksDone, icon: CheckSquare, color: 'text-[#4CD7E0]', bg: 'bg-[#4CD7E0]/10' },
            { label: 'Follow-up Pending', value: analytics.followUpsPending, icon: Clock, color: 'text-[#FF5A5A]', bg: 'bg-[#FF5A5A]/10' },
          ].map((item) => (
            <div key={item.label} className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-xl rounded-[18px] p-4 flex flex-col gap-2 hover:bg-white/[0.03] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">{item.label}</span>
                <div className={`w-7 h-7 rounded-full ${item.bg} flex items-center justify-center`}>
                  <item.icon size={14} weight="bold" className={item.color} />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <p className="text-2xl font-extrabold text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* PROJECTS LIST                                                             */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] p-5 flex flex-col gap-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-16 left-1/4 w-56 h-56 rounded-full bg-[#A89AE8]/[0.04] blur-[80px]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase size={16} weight="bold" className="text-[#A89AE8]" />
            <h2 className="text-sm font-bold text-white">Projects</h2>
          </div>
          <span className="text-[10px] text-white/30 bg-white/5 px-2.5 py-1 rounded-full">{projects.length} total</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#1C1E26]/50 border border-white/[0.05] rounded-[16px] p-4 hover:bg-white/[0.03] transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-white truncate">{project.name}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{project.client}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor[project.status]}`}>
                  {project.status}
                </span>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D8FF3F] rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-sm font-extrabold text-[#D8FF3F] w-10 text-right">{project.progress}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/30 flex items-center gap-1">
                  <CheckSquare size={10} />
                  {project.tasksDone}/{project.tasksTotal} tasks
                </span>
                <span className="text-[10px] text-white/30 flex items-center gap-1">
                  <Calendar size={10} />
                  {project.deadline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* CONTENT SCHEDULE + SOCIAL MEDIA                                           */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Content This Week */}
        <div className="lg:col-span-2 bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] p-5 flex flex-col gap-4 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-16 right-1/3 w-48 h-48 rounded-full bg-[#FFD043]/[0.04] blur-[70px]" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pen size={16} weight="bold" className="text-[#FFD043]" />
              <h2 className="text-sm font-bold text-white">Content This Week</h2>
            </div>
            <span className="text-[10px] text-white/30 bg-white/5 px-2.5 py-1 rounded-full">{contentWeek.length} items</span>
          </div>

          {/* Header */}
          <div className="grid grid-cols-[1fr_80px_80px_80px_90px] items-center text-[9px] font-bold text-white/30 uppercase tracking-wider px-4">
            <span>Content</span>
            <span className="text-center">Writing</span>
            <span className="text-center">Editing</span>
            <span className="text-center">Upload</span>
            <span className="text-right">Date</span>
          </div>

          <div className="flex flex-col gap-1.5">
            {contentWeek.map((item) => (
              <div key={item.id} className="bg-[#1C1E26]/50 border border-white/[0.05] rounded-[14px] px-4 py-3 grid grid-cols-[1fr_80px_80px_80px_90px] items-center hover:bg-white/[0.03] transition-all cursor-pointer group">
                <div className="min-w-0 pr-3">
                  <p className="text-[12px] font-bold text-white truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-white/40">{item.platform}</span>
                    <span className="text-[10px] text-white/20">·</span>
                    <span className="text-[10px] text-white/40 truncate">{item.project}</span>
                  </div>
                </div>

                {['writing', 'editing', 'uploading'].map((step) => (
                  <div key={step} className="flex justify-center">
                    <span className={`text-[9px] font-bold px-3 py-1 rounded-full w-full max-w-[72px] text-center ${stepColor[item[step as keyof typeof item] as string]}`}>
                      {item[step as keyof typeof item] as string}
                    </span>
                  </div>
                ))}

                <span className="text-[10px] text-white/30 text-right">{item.scheduledDate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] p-5 flex flex-col gap-4 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-16 left-10 w-40 h-40 rounded-full bg-[#FF5A5A]/[0.04] blur-[60px]" />
          <div className="flex items-center gap-2">
            <ChartLineUp size={16} weight="bold" className="text-[#FF5A5A]" />
            <h2 className="text-sm font-bold text-white">Social Media</h2>
          </div>

          <div className="flex flex-col gap-3">
            {socialMedia.map((sm) => {
              const Icon = platformIcon[sm.platform] || Globe;
              return (
                <div key={sm.id} className="bg-[#1C1E26]/50 border border-white/[0.05] rounded-[16px] p-4 hover:bg-white/[0.03] transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
                        <Icon size={16} weight="bold" className="text-white/60" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-white">{sm.platform}</p>
                        <p className="text-[10px] text-white/40">{sm.handle}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${socialStatusColor[sm.status]}`}>
                      {sm.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/[0.03] rounded-[10px] py-2">
                      <p className="text-sm font-extrabold text-white">{sm.followers}</p>
                      <p className="text-[9px] text-white/30">Followers</p>
                    </div>
                    <div className="bg-white/[0.03] rounded-[10px] py-2">
                      <p className="text-sm font-extrabold text-[#D8FF3F]">{sm.engagement}</p>
                      <p className="text-[9px] text-white/30">Engagement</p>
                    </div>
                    <div className="bg-white/[0.03] rounded-[10px] py-2">
                      <p className="text-sm font-extrabold text-white">{sm.postsThisWeek}</p>
                      <p className="text-[9px] text-white/30">Posts/Week</p>
                    </div>
                  </div>

                  {sm.pendingPosts > 0 && (
                    <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-[#FFD043]">
                      <Clock size={10} />
                      <span>{sm.pendingPosts} posts pending</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* CONTENT THIS MONTH                                                        */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] p-5 flex flex-col gap-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-16 left-1/3 w-48 h-48 rounded-full bg-[#A89AE8]/[0.04] blur-[70px]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={16} weight="bold" className="text-[#A89AE8]" />
            <h2 className="text-sm font-bold text-white">Content This Month</h2>
          </div>
          <span className="text-[10px] text-white/30 bg-white/5 px-2.5 py-1 rounded-full">{contentMonth.length} items</span>
        </div>

        {/* Header */}
        <div className="grid grid-cols-[1fr_100px_100px_90px_100px] items-center text-[9px] font-bold text-white/30 uppercase tracking-wider px-4">
          <span>Content</span>
          <span className="text-center">Platform</span>
          <span className="text-center">PIC</span>
          <span className="text-center">Status</span>
          <span className="text-right">Due Date</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {contentMonth.map((item) => {
            const monthStatusColor: Record<string, string> = {
              Published: 'bg-[#D8FF3F] text-black',
              'In Design': 'bg-[#FFD043] text-black',
              Drafting: 'bg-[#A89AE8] text-black',
              Scheduled: 'bg-[#4CD7E0] text-black',
              Todo: 'bg-white/10 text-white/50',
            };
            return (
              <div key={item.id} className="bg-[#1C1E26]/50 border border-white/[0.05] rounded-[14px] px-4 py-3 grid grid-cols-[1fr_100px_100px_90px_100px] items-center hover:bg-white/[0.03] transition-all cursor-pointer group">
                <div className="min-w-0 pr-3">
                  <p className="text-[12px] font-bold text-white truncate">{item.title}</p>
                </div>

                <div className="flex justify-center">
                  <span className="text-[10px] text-white/50">{item.platform}</span>
                </div>

                <div className="flex justify-center">
                  <span className="text-[10px] text-white/70 font-medium">{item.pic}</span>
                </div>

                <div className="flex justify-center">
                  <span className={`text-[9px] font-bold px-3 py-1 rounded-full w-full max-w-[80px] text-center ${monthStatusColor[item.status]}`}>
                    {item.status}
                  </span>
                </div>

                <span className="text-[10px] text-white/30 text-right">{item.dueDate}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* CLIENT CONTACTS + FOLLOW-UP                                               */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] p-5 flex flex-col gap-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-16 right-1/4 w-48 h-48 rounded-full bg-[#4CD7E0]/[0.04] blur-[70px]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} weight="bold" className="text-[#4CD7E0]" />
            <h2 className="text-sm font-bold text-white">Client Contacts & Follow-up</h2>
          </div>
          <span className="text-[10px] text-white/30 bg-white/5 px-2.5 py-1 rounded-full">{clientContacts.length} clients</span>
        </div>

        {/* Header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center text-[9px] font-bold text-white/30 uppercase tracking-wider px-1">
          <span className="w-10" />
          <span>Client</span>
          <span className="w-28">Follow-up</span>
          <span className="w-20 text-center">Status</span>
          <span className="w-24 text-right">Last Contact</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {clientContacts.map((client) => (
            <div key={client.id} className="bg-[#1C1E26]/50 border border-white/[0.05] rounded-[14px] px-4 py-3 flex items-center gap-4 hover:bg-white/[0.03] transition-all cursor-pointer group">
              <div className="relative">
                <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#1C1E26] ${
                  client.status === 'Active' ? 'bg-[#D8FF3F]' : client.status === 'Lead' ? 'bg-[#FFD043]' : 'bg-white/30'
                }`} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-bold text-white truncate">{client.name}</p>
                <p className="text-[10px] text-white/40">{client.role} · {client.company}</p>
              </div>

              <div className="w-28 min-w-0">
                <p className="text-[11px] text-white/60 truncate">{client.followUp}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Calendar size={10} className="text-white/25" />
                  <span className="text-[9px] text-white/30">{client.followUpDate}</span>
                </div>
              </div>

              <span className={`w-20 text-center text-[9px] font-bold px-2 py-0.5 rounded-full ${clientStatusColor[client.status]}`}>
                {client.status}
              </span>

              <span className="w-24 text-[10px] text-white/25 text-right">{client.lastContact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
