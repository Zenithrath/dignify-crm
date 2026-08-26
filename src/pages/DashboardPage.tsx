import { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Plus,
  ArrowUpRight,
  ChevronDown,
  Check,
  X,
  Send,
  Paperclip,
  Image as ImageIcon,
  Download,
  Filter,
  Search,
  CheckCircle2,
  FileText,
  MoreHorizontal,
  Briefcase,
} from 'lucide-react';

interface LeadItem {
  id: string;
  name: string;
  role: string;
  company: string;
  employees: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
  statusText: string;
  priority: 'High' | 'Mid' | 'Low';
  priorityColor: string;
  dealId: string;
  dealName: string;
  dealStage: 'Negotiation' | 'Close';
  dealValue: string;
  manager: string;
  managerAvatar: string;
  temperature: 'Warm' | 'Hot' | 'Cold';
  checklist: { text: string; checked: boolean }[];
  taskTitle: string;
  taskFile: string;
  competitors: { name: string; isUs: boolean }[];
  prosCons: { text: string; positive: boolean }[];
  timeline: {
    id: string;
    date: string;
    icon: 'phone' | 'chat' | 'email';
    title: string;
    description: string;
    manager: string;
    tag: string;
    tagColor: string;
  }[];
  messages: {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    time: string;
    isNeonLime?: boolean;
  }[];
}

const mockLeads: LeadItem[] = [
  {
    id: 'lead-1',
    name: 'Jessie Caballero',
    role: 'Product manager',
    company: 'Microsoft',
    employees: '221.000 employs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    phone: '(205) 555-0100',
    email: 'michelle.rivera@example.com',
    address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    statusText: 'Awaiting our proposal',
    priority: 'High',
    priorityColor: '#FF5A5A',
    dealId: 'Deal #32636276',
    dealName: 'Intrested in Burr Grinder',
    dealStage: 'Negotiation',
    dealValue: '$ 25,000',
    manager: 'Marty C.',
    managerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    temperature: 'Warm',
    checklist: [
      { text: "Client's portrait", checked: true },
      { text: 'Successful similar cases', checked: true },
      { text: 'Low budget', checked: false },
    ],
    taskTitle: 'Send our proposal',
    taskFile: 'Proposal.pdf',
    competitors: [
      { name: 'Us', isUs: true },
      { name: "Alberto's", isUs: false },
    ],
    prosCons: [
      { text: 'Trusted name, Good support', positive: true },
      { text: 'Inflexible Price, Long delivery', positive: false },
    ],
    timeline: [
      {
        id: 't-1',
        date: '12 May',
        icon: 'phone',
        title: 'Information Provided to Customer',
        description: 'Checked customer and product information. Create follow-up.',
        manager: 'Marty C.',
        tag: 'Discovery',
        tagColor: '#4CD7E0',
      },
      {
        id: 't-2',
        date: '15 May',
        icon: 'chat',
        title: 'Gathering additional information from the client',
        description: 'The client has confirmed interest and is awaiting our Proposal',
        manager: 'Marty C.',
        tag: 'Negotiation',
        tagColor: '#A89AE8',
      },
    ],
    messages: [
      {
        id: 'm-1',
        sender: 'agent',
        text: 'Hey, how are you?',
        time: '9:25 am',
      },
      {
        id: 'm-2',
        sender: 'agent',
        text: 'We discussed your wishes with the guys in the production department and prepared a proposal',
        time: '9:28 am',
      },
      {
        id: 'm-3',
        sender: 'agent',
        text: 'Sending it to you, I hope it meets your wishes.',
        time: '9:30 am',
      },
      {
        id: 'm-4',
        sender: 'user',
        text: "Great, looking forward to it. I'll talk to our finance guy and give you an answer.",
        time: '9:31 am',
        isNeonLime: true,
      },
    ],
  },
  {
    id: 'lead-2',
    name: 'Jane Doe',
    role: 'Marketing manager',
    company: 'Nike',
    employees: '79.100 employs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    phone: '(415) 555-0199',
    email: 'jane.doe@nike.com',
    address: 'One Bowerman Dr. Beaverton, Oregon 97005',
    statusText: 'Awaiting our proposal',
    priority: 'High',
    priorityColor: '#FF5A5A',
    dealId: 'Deal #88419201',
    dealName: 'Commercial Espresso Batch',
    dealStage: 'Negotiation',
    dealValue: '$ 48,000',
    manager: 'Marty C.',
    managerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    temperature: 'Hot',
    checklist: [
      { text: 'Enterprise tier requirements', checked: true },
      { text: 'Quarterly payment cycle', checked: true },
      { text: 'Custom branding requested', checked: true },
    ],
    taskTitle: 'Schedule Technical Demo',
    taskFile: 'Nike_Specs_v2.pdf',
    competitors: [
      { name: 'Us', isUs: true },
      { name: 'Baratza Pro', isUs: false },
    ],
    prosCons: [
      { text: 'Faster deployment, Dedicated support', positive: true },
      { text: 'Higher setup retainer', positive: false },
    ],
    timeline: [
      {
        id: 't-21',
        date: '18 May',
        icon: 'email',
        title: 'Initial Enterprise Inquiry',
        description: 'Received RFQ for 15 regional office hub installations.',
        manager: 'Marty C.',
        tag: 'Inquiry',
        tagColor: '#FFD043',
      },
      {
        id: 't-22',
        date: '20 May',
        icon: 'chat',
        title: 'Drafted Custom Architecture',
        description: 'Presented technical overview to Jane Doe.',
        manager: 'Marty C.',
        tag: 'Proposal',
        tagColor: '#A89AE8',
      },
    ],
    messages: [
      {
        id: 'm-21',
        sender: 'user',
        text: 'Hi Marty, does your proposal include on-site maintenance in Portland?',
        time: '11:15 am',
        isNeonLime: true,
      },
      {
        id: 'm-22',
        sender: 'agent',
        text: 'Yes Jane! All Pacific Northwest locations include 24/7 priority on-site support.',
        time: '11:18 am',
      },
    ],
  },
  {
    id: 'lead-3',
    name: 'Jack Donovan',
    role: 'CEO',
    company: 'ACME',
    employees: '1.200 employs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    phone: '(312) 555-8832',
    email: 'j.donovan@acme-corp.io',
    address: '442 Michigan Ave. Chicago, Illinois 60611',
    statusText: 'Phone call',
    priority: 'Mid',
    priorityColor: '#A89AE8',
    dealId: 'Deal #11928472',
    dealName: 'Roastery Industrial Hardware',
    dealStage: 'Negotiation',
    dealValue: '$ 18,500',
    manager: 'Sarah W.',
    managerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    temperature: 'Warm',
    checklist: [
      { text: 'Budget approved by board', checked: true },
      { text: 'Ready for prototype testing', checked: false },
    ],
    taskTitle: 'Follow up after call',
    taskFile: 'ACME_Quote.pdf',
    competitors: [
      { name: 'Us', isUs: true },
      { name: 'La Marzocco', isUs: false },
    ],
    prosCons: [
      { text: 'Modular repair system, Low maintenance', positive: true },
      { text: 'Lead time 3 weeks', positive: false },
    ],
    timeline: [
      {
        id: 't-31',
        date: '22 May',
        icon: 'phone',
        title: 'Exploratory Call with CEO',
        description: 'Discussed volume discounts for 8 locations.',
        manager: 'Sarah W.',
        tag: 'Call',
        tagColor: '#4CD7E0',
      },
    ],
    messages: [
      {
        id: 'm-31',
        sender: 'user',
        text: 'Thanks for the quick response. Can we speak again this Friday?',
        time: '2:15 pm',
        isNeonLime: true,
      },
    ],
  },
  {
    id: 'lead-4',
    name: 'Barry White',
    role: 'CEO',
    company: 'Arasaka',
    employees: '50.000 employs',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    phone: '(212) 555-7741',
    email: 'barry@arasaka.corp',
    address: 'Night City Plaza, Sector 4',
    statusText: 'Follow up',
    priority: 'Low',
    priorityColor: '#4CD7E0',
    dealId: 'Deal #44910283',
    dealName: 'Cyber Cafeteria Automation',
    dealStage: 'Close',
    dealValue: '$ 72,000',
    manager: 'Marty C.',
    managerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    temperature: 'Cold',
    checklist: [
      { text: 'Security clearance verified', checked: true },
      { text: 'NDA signed', checked: true },
    ],
    taskTitle: 'Send contract agreement',
    taskFile: 'Master_Contract.pdf',
    competitors: [
      { name: 'Us', isUs: true },
      { name: 'Militech Solutions', isUs: false },
    ],
    prosCons: [
      { text: 'High security compliance', positive: true },
      { text: 'Strict auditing requirement', positive: false },
    ],
    timeline: [
      {
        id: 't-41',
        date: '24 May',
        icon: 'email',
        title: 'Contract Draft Sent',
        description: 'Sent final revision for legal department review.',
        manager: 'Marty C.',
        tag: 'Legal',
        tagColor: '#A89AE8',
      },
    ],
    messages: [
      {
        id: 'm-41',
        sender: 'user',
        text: 'Our legal counsel is reviewing clause 8. Will revert by Monday.',
        time: '4:45 pm',
        isNeonLime: true,
      },
    ],
  },
  {
    id: 'lead-5',
    name: 'Lisa Gun',
    role: 'Creative Director',
    company: 'Lumina Studio',
    employees: '45 employs',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    phone: '(310) 555-9012',
    email: 'lisa@lumina.design',
    address: '8800 Wilshire Blvd. Beverly Hills, California',
    statusText: 'Schedule meeting',
    priority: 'Mid',
    priorityColor: '#FFD043',
    dealId: 'Deal #55829103',
    dealName: 'Studio Boutique Equipment',
    dealStage: 'Negotiation',
    dealValue: '$ 12,400',
    manager: 'Marty C.',
    managerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    temperature: 'Warm',
    checklist: [
      { text: 'Design aesthetics critical', checked: true },
      { text: 'Matte black finish required', checked: true },
    ],
    taskTitle: 'Send product catalog',
    taskFile: 'Lumina_Catalog.pdf',
    competitors: [
      { name: 'Us', isUs: true },
      { name: 'Fellow Ode', isUs: false },
    ],
    prosCons: [
      { text: 'Award-winning minimalist design', positive: true },
      { text: 'Custom color lead time', positive: false },
    ],
    timeline: [
      {
        id: 't-51',
        date: '25 May',
        icon: 'chat',
        title: 'Design Consultation Completed',
        description: 'Selected matte obsidian finish for 4 studio kitchens.',
        manager: 'Marty C.',
        tag: 'Design',
        tagColor: '#D8FF3F',
      },
    ],
    messages: [
      {
        id: 'm-51',
        sender: 'user',
        text: 'The sample looks stunning! Can you provide the custom laser engraving mockup?',
        time: '5:10 pm',
        isNeonLime: true,
      },
    ],
  },
];

export function DashboardPage() {
  const [selectedLeadId, setSelectedLeadId] = useState<string>('lead-1');
  const [activeTab, setActiveTab] = useState<string>('Summary');
  const [commMode, setCommMode] = useState<'phone' | 'email' | 'chat' | 'task' | 'calendar' | 'doc'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [dealStage, setDealStage] = useState<'Negotiation' | 'Close'>('Negotiation');
  const [selectedCompetitor, setSelectedCompetitor] = useState<'Us' | 'Competitor'>('Us');
  const [leadList, setLeadList] = useState<LeadItem[]>(mockLeads);

  const activeLead = leadList.find((l) => l.id === selectedLeadId) ?? leadList[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'agent' as const,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLeadList((prev) =>
      prev.map((lead) => {
        if (lead.id === activeLead.id) {
          return {
            ...lead,
            messages: [...lead.messages, newMsg],
          };
        }
        return lead;
      })
    );
    setChatInput('');
  };

  const toggleChecklist = (index: number) => {
    setLeadList((prev) =>
      prev.map((lead) => {
        if (lead.id === activeLead.id) {
          const updatedChecklist = [...lead.checklist];
          updatedChecklist[index] = {
            ...updatedChecklist[index],
            checked: !updatedChecklist[index].checked,
          };
          return { ...lead, checklist: updatedChecklist };
        }
        return lead;
      })
    );
  };

  return (
    <div className="w-full h-full flex flex-col xl:flex-row gap-4 max-w-[1600px] mx-auto pb-4">
      {/* ========================================================================= */}
      {/* COLUMN 1: METRICS & WORKLIST (LEFT COLUMN ~300px-340px) */}
      {/* ========================================================================= */}
      <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-4">
        {/* 2x2 Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Worklist Card */}
          <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-xl rounded-[22px] p-3.5 flex flex-col justify-between h-[96px] hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#FFD043]" />
              <span className="text-[12px] font-medium text-white/70">Worklist</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-light text-white tracking-tight">6</span>
            </div>
          </div>

          {/* New leads Card */}
          <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-xl rounded-[22px] p-3.5 flex flex-col justify-between h-[96px] hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#FF5A5A]" />
              <span className="text-[12px] font-medium text-white/70">New leads</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-light text-white tracking-tight">27</span>
            </div>
          </div>

          {/* Updates Card */}
          <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-xl rounded-[22px] p-3.5 flex flex-col justify-between h-[96px] hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#4CD7E0]" />
              <span className="text-[12px] font-medium text-white/70">Updates</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-light text-white tracking-tight">22</span>
            </div>
          </div>

          {/* Assigned Card */}
          <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-xl rounded-[22px] p-3.5 flex flex-col justify-between h-[96px] hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#A89AE8]" />
              <span className="text-[12px] font-medium text-white/70">Assigned</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-light text-white tracking-tight">3</span>
            </div>
          </div>
        </div>

        {/* Worklist Section */}
        <div className="flex flex-col gap-2.5 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#FFD043]" />
              <span className="text-sm font-semibold text-white/90">Worklist</span>
            </div>
            <button className="text-white/40 hover:text-white transition-colors" aria-label="Toggle worklist">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Worklist Cards List */}
          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[calc(100vh-250px)] pr-0.5">
            {leadList.map((lead) => {
              const isSelected = lead.id === activeLead.id;

              if (isSelected) {
                // ACTIVE SELECTED CARD: Solid Neon Lime (#D8FF3F) with crisp dark typography!
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className="cursor-pointer bg-[#D8FF3F] text-black rounded-[22px] p-4 shadow-[0_10px_25px_rgba(216,255,63,0.18)] transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={lead.avatar}
                          alt={lead.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-black/10 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-[14px] leading-tight text-black">{lead.name}</h4>
                          <p className="text-[11px] font-medium text-black/70 leading-tight mt-0.5">
                            {lead.role} - {lead.company}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-black/60 flex-shrink-0 mt-0.5" />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/10 text-black text-[11px] font-semibold border border-black/5">
                        <FileText className="w-3 h-3" />
                        <span>{lead.statusText}</span>
                      </div>
                      <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#FF5A5A] text-white shadow-sm">
                        {lead.priority}
                      </span>
                    </div>
                  </div>
                );
              }

              // INACTIVE CARDS: Dark translucent glass card
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className="cursor-pointer bg-[#17181F]/60 border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] rounded-[22px] p-4 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={lead.avatar}
                        alt={lead.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-semibold text-[14px] leading-tight text-white">{lead.name}</h4>
                        <p className="text-[11px] font-medium text-white/50 leading-tight mt-0.5">
                          {lead.role} - {lead.company}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] text-white/70 text-[11px] font-medium border border-white/[0.05]">
                      {lead.statusText.includes('call') ? (
                        <Phone className="w-3 h-3 text-white/50" />
                      ) : lead.statusText.includes('Follow') ? (
                        <Mail className="w-3 h-3 text-white/50" />
                      ) : (
                        <FileText className="w-3 h-3 text-white/50" />
                      )}
                      <span>{lead.statusText}</span>
                    </div>
                    <span
                      className="px-3 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{
                        backgroundColor: lead.priorityColor,
                        color: lead.priorityColor === '#FF5A5A' ? '#FFFFFF' : '#000000',
                      }}
                    >
                      {lead.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COLUMN 2: CENTER MAIN CONTENT (PROFILE HERO, TIMELINE, CHAT) */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Center Glass Container */}
        <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[28px] p-5 sm:p-6 flex flex-col gap-5 flex-1 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow spot behind avatar */}
          <div className="pointer-events-none absolute top-4 left-16 w-44 h-44 rounded-full bg-[#D8FF3F]/[0.08] blur-[70px]" />

          {/* Top Profile Presentation Header */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-2 border-b border-white/[0.06]">
            {/* Left: Avatar + Floating Dock Actions + Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar + Floating Action Capsule underneath */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-xl">
                    <img
                      src={activeLead.avatar}
                      alt={activeLead.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Docked Action Bar: 5 circular buttons (Phone, Chat, Mail, Calendar, Add) */}
                <div className="mt-[-16px] z-10 flex items-center gap-1 bg-[#D8FF3F] p-1 rounded-full shadow-[0_4px_16px_rgba(216,255,63,0.3)]">
                  <button
                    onClick={() => setCommMode('phone')}
                    className="w-6 h-6 rounded-full bg-black/10 hover:bg-black/25 flex items-center justify-center text-black transition-all"
                    title="Phone"
                  >
                    <Phone className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setCommMode('chat')}
                    className="w-6 h-6 rounded-full bg-black/10 hover:bg-black/25 flex items-center justify-center text-black transition-all"
                    title="Chat"
                  >
                    <MessageSquare className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setCommMode('email')}
                    className="w-6 h-6 rounded-full bg-black/10 hover:bg-black/25 flex items-center justify-center text-black transition-all"
                    title="Email"
                  >
                    <Mail className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setCommMode('calendar')}
                    className="w-6 h-6 rounded-full bg-black/10 hover:bg-black/25 flex items-center justify-center text-black transition-all"
                    title="Calendar"
                  >
                    <Calendar className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setCommMode('doc')}
                    className="w-6 h-6 rounded-full bg-black/10 hover:bg-black/25 flex items-center justify-center text-black transition-all"
                    title="More actions"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Lead Info Text */}
              <div className="flex flex-col gap-1.5">
                <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-white">
                  {activeLead.name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-white/50 font-normal">
                  <p>
                    {activeLead.role} - {activeLead.company} ({activeLead.employees})
                  </p>
                  <p className="text-white/80">{activeLead.phone}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-white/50 font-normal">
                  <p>{activeLead.address}</p>
                  <p className="text-white/80">{activeLead.email}</p>
                </div>
              </div>
            </div>

            {/* Right: Manager Pill + Status Tags */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 flex-shrink-0 self-start md:self-auto">
              {/* Manager card pill */}
              <div className="flex items-center gap-2.5 bg-[#1F212B]/80 border border-white/[0.08] px-3 py-1.5 rounded-full">
                <img
                  src={activeLead.managerAvatar}
                  alt={activeLead.manager}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-xs font-medium text-white/80">
                  <span className="text-white/40 mr-1">Manager</span>
                  {activeLead.manager}
                </span>
                <MoreHorizontal className="w-3.5 h-3.5 text-white/40 ml-1 cursor-pointer hover:text-white" />
              </div>

              {/* Status Capsules */}
              <div className="flex items-center gap-1.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#FF5A5A] text-white">
                  {activeLead.priority}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#FFD043] text-black">
                  {activeLead.temperature}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs Bar */}
          <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
            {/* Left: Deal ID + Tabs */}
            <div className="flex items-center gap-4 text-xs font-medium text-white/60">
              {/* Deal pill badge */}
              <div className="flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] px-3 py-1.5 rounded-full text-white font-semibold">
                <Briefcase className="w-3.5 h-3.5 text-[#D8FF3F]" />
                <span>{activeLead.dealId}</span>
              </div>

              {/* Navigation Tabs */}
              {['Summary', 'Analytics', 'Details', 'Files', 'History'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-1 px-2.5 rounded-lg transition-colors ${
                    activeTab === tab
                      ? 'text-white font-bold bg-white/[0.07]'
                      : 'hover:text-white text-white/60'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Right: Quick Tool icons (Filter, Calendar, Search) */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.1] flex items-center justify-center text-white/60 hover:text-white transition-all">
                <Filter className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.1] flex items-center justify-center text-white/60 hover:text-white transition-all">
                <Calendar className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.1] flex items-center justify-center text-white/60 hover:text-white transition-all">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Activity Timeline List (Connected Process Cards) */}
          <div className="flex flex-col gap-2.5">
            {activeLead.timeline.map((item) => (
              <div
                key={item.id}
                className="bg-[#1C1E26]/50 border border-white/[0.05] rounded-[20px] p-3.5 flex items-center justify-between gap-4 hover:bg-white/[0.04] transition-all"
              >
                {/* Left: Date + Icon Circle + Text */}
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-xs font-semibold text-white/50 w-12 flex-shrink-0">
                    {item.date}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80 flex-shrink-0">
                    {item.icon === 'phone' ? (
                      <Phone className="w-3.5 h-3.5" />
                    ) : item.icon === 'chat' ? (
                      <MessageSquare className="w-3.5 h-3.5" />
                    ) : (
                      <Mail className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h5 className="text-[13px] font-medium text-white leading-tight truncate">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-white/50 leading-tight mt-0.5 truncate">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right: Manager + Stage Badge + Arrow */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/70">
                    <img
                      src={activeLead.managerAvatar}
                      alt={item.manager}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span>{item.manager}</span>
                  </div>

                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                    style={{ backgroundColor: item.tagColor, color: '#000000' }}
                  >
                    {item.tag}
                  </span>

                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Live Chat Hub Container */}
          <div className="bg-[#14151C]/90 border border-white/[0.08] rounded-[24px] p-4 flex flex-col gap-3.5 flex-1 shadow-inner">
            {/* Communication Mode Tabs Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                {[
                  { mode: 'phone' as const, icon: Phone },
                  { mode: 'email' as const, icon: Mail },
                  { mode: 'chat' as const, icon: MessageSquare },
                  { mode: 'task' as const, icon: CheckCircle2 },
                  { mode: 'calendar' as const, icon: Calendar },
                  { mode: 'doc' as const, icon: FileText },
                ].map(({ mode, icon: Icon }) => (
                  <button
                    key={mode}
                    onClick={() => setCommMode(mode)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      commMode === mode
                        ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>

              <button className="text-white/40 hover:text-white transition-colors" title="Expand chat">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Recipient status bar */}
            <div className="flex items-center gap-2.5 px-1">
              <img
                src={activeLead.avatar}
                alt={activeLead.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10"
              />
              <span className="text-xs font-semibold text-white">{activeLead.name}</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-[#D8FF3F] bg-[#D8FF3F]/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF3F]" />
                Online
              </span>
            </div>

            {/* Chat Thread Messages */}
            <div className="flex flex-col gap-2.5 max-h-[160px] overflow-y-auto pr-1 py-1">
              {activeLead.messages.map((msg) => {
                if (msg.sender === 'user') {
                  // INCOMING USER MESSAGE: Solid Neon Lime (#D8FF3F) bubble with crisp black text!
                  return (
                    <div key={msg.id} className="flex flex-col items-start max-w-[85%] self-start">
                      <div className="bg-[#D8FF3F] text-black text-xs font-medium px-4 py-2.5 rounded-[18px] rounded-tl-sm shadow-[0_4px_16px_rgba(216,255,63,0.15)] leading-relaxed">
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-white/40 mt-1 ml-1">{msg.time}</span>
                    </div>
                  );
                }

                // OUTGOING AGENT MESSAGE: Dark slate bubble
                return (
                  <div key={msg.id} className="flex flex-col items-end max-w-[85%] self-end">
                    <div className="bg-[#222430] border border-white/[0.06] text-white/90 text-xs font-normal px-4 py-2.5 rounded-[18px] rounded-tr-sm shadow-sm leading-relaxed">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-white/40 mt-1 mr-1">{msg.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar with Neon Lime Send Button */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 bg-[#1C1E28] border border-white/[0.08] rounded-full px-3 py-1.5 mt-auto focus-within:border-[#D8FF3F]/50 transition-colors"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Enter message..."
                className="flex-1 bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none px-2"
              />

              <button
                type="button"
                className="text-white/40 hover:text-white transition-colors p-1"
                title="Attach image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="text-white/40 hover:text-white transition-colors p-1"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#D8FF3F] hover:bg-[#E8FF78] flex items-center justify-center text-black font-bold shadow-[0_0_12px_rgba(216,255,63,0.3)] transition-all"
                title="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COLUMN 3: DEAL INSIGHTS & TASK CARDS (RIGHT COLUMN ~300px-340px) */}
      {/* ========================================================================= */}
      <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-4">
        {/* ========================================================= */}
        {/* CARD 1: SOFT LAVENDER / LILAC DEAL CARD (#A89AE8) */}
        {/* ========================================================= */}
        <div className="bg-[#A89AE8] text-black rounded-[26px] p-5 flex flex-col justify-between gap-4 shadow-xl relative overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-[15px] leading-tight text-black pr-2">
              {activeLead.dealName}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-black/60 flex-shrink-0 cursor-pointer" />
          </div>

          {/* Stage Switcher Capsule Slider */}
          <div className="flex items-center p-1 bg-black/10 rounded-full border border-black/5">
            <button
              onClick={() => setDealStage('Negotiation')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold transition-all ${
                dealStage === 'Negotiation'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-black/70 hover:text-black'
              }`}
            >
              {dealStage === 'Negotiation' && <Check className="w-3 h-3 text-black" />}
              <span>Negotiation</span>
            </button>
            <button
              onClick={() => setDealStage('Close')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold transition-all ${
                dealStage === 'Close'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-black/70 hover:text-black'
              }`}
            >
              {dealStage === 'Close' && <Check className="w-3 h-3 text-black" />}
              <span>Close</span>
            </button>
          </div>

          {/* Potential profit amount */}
          <div>
            <span className="text-[11px] font-semibold text-black/60 uppercase tracking-wide block">
              Potential profit
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mt-0.5">
              {activeLead.dealValue}
            </div>
          </div>

          {/* Checklist items */}
          <div className="flex flex-col gap-1.5">
            {activeLead.checklist.map((item, index) => (
              <div
                key={index}
                onClick={() => toggleChecklist(index)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                    item.checked ? 'bg-black text-[#A89AE8]' : 'bg-black/15 text-black/40'
                  }`}
                >
                  {item.checked ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                </div>
                <span className="text-xs font-medium text-black/80 group-hover:text-black">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* CARD 2: ELECTRIC NEON LIME TASK CARD (#D8FF3F) */}
        {/* ========================================================= */}
        <div className="bg-[#D8FF3F] text-black rounded-[26px] p-5 flex flex-col justify-between gap-4 shadow-xl">
          {/* Header */}
          <div>
            <h3 className="font-extrabold text-base leading-tight text-black">Task</h3>
            <p className="text-xs font-semibold text-black/70 mt-0.5">{activeLead.taskTitle}</p>
          </div>

          {/* Downloadable Proposal Attachment Card */}
          <div className="bg-white/90 backdrop-blur rounded-[16px] p-3 flex items-center justify-between shadow-sm hover:bg-white transition-all cursor-pointer">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-black" />
              <span className="text-xs font-bold text-black">{activeLead.taskFile}</span>
            </div>
            <Download className="w-4 h-4 text-black/60 hover:text-black transition-colors" />
          </div>

          {/* Customer Choice Comparison */}
          <div>
            <span className="text-[11px] font-semibold text-black/70 block mb-2">
              The customer chooses between
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedCompetitor('Us')}
                className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCompetitor === 'Us'
                    ? 'bg-white text-black shadow-md'
                    : 'bg-black/10 text-black/70 hover:text-black'
                }`}
              >
                Us
              </button>
              <button
                onClick={() => setSelectedCompetitor('Competitor')}
                className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCompetitor === 'Competitor'
                    ? 'bg-white text-black shadow-md'
                    : 'bg-black/10 text-black/70 hover:text-black'
                }`}
              >
                {activeLead.competitors[1]?.name ?? "Alberto's"}
              </button>
            </div>
          </div>

          {/* Pros & Cons comparison */}
          <div className="flex flex-col gap-1.5">
            {activeLead.prosCons.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    item.positive ? 'bg-black text-[#D8FF3F]' : 'bg-black/15 text-black/60'
                  }`}
                >
                  {item.positive ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                </div>
                <span className="text-xs font-medium text-black/80">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons Floating Dock */}
          <div className="flex items-center gap-2.5 pt-1">
            <button
              className="flex-1 bg-black text-white hover:bg-black/80 py-2.5 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Send to client"
            >
              <Send className="w-4 h-4" />
            </button>
            <button
              className="flex-1 bg-white text-black hover:bg-white/90 py-2.5 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Mark completed"
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}