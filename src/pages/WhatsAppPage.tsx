import { useState } from 'react';
import {
  ChatCircle,
  Clock,
  CheckCircle,
  Warning,
  User,
  PaperPlaneTilt,
  CaretLeft,
} from '@phosphor-icons/react';
import { useWhatsApp } from '../hooks/useWhatsApp';
import type { WAConversation, WAStatus } from '../types';
import { WA_STATUSES } from '../types';

const statusConfig: Record<WAStatus, { color: string; bg: string; icon: React.ReactNode }> = {
  'Nunggu respon': { color: 'text-[#FFD043]', bg: 'bg-[#FFD043]/10 border border-[#FFD043]/20', icon: <Clock size={12} weight="fill" /> },
  'Sudah dibalas': { color: 'text-[#D8FF3F]', bg: 'bg-[#D8FF3F]/10 border border-[#D8FF3F]/20', icon: <CheckCircle size={12} weight="fill" /> },
  'Perlu follow-up': { color: 'text-[#FF5A5A]', bg: 'bg-[#FF5A5A]/10 border border-[#FF5A5A]/20', icon: <Warning size={12} weight="fill" /> },
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const d = new Date(dateStr.replace(' ', 'T'));
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}j lalu`;
  const days = Math.floor(hrs / 24);
  return `${days}h lalu`;
}

export function WhatsAppPage() {
  const { data: conversations, loading, updateStatus, reassignPIC, markRead, addMessage } = useWhatsApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<WAStatus | 'Semua'>('Semua');

  const selected = conversations?.find((c) => c.id === selectedId) || null;

  const filtered = (conversations || []).filter((c) => {
    if (filterStatus !== 'Semua' && c.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: conversations?.length || 0,
    nunggu: conversations?.filter((c) => c.status === 'Nunggu respon').length || 0,
    dibalas: conversations?.filter((c) => c.status === 'Sudah dibalas').length || 0,
    followup: conversations?.filter((c) => c.status === 'Perlu follow-up').length || 0,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#D8FF3F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 pb-6">
      {/* Header */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] px-6 py-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#25D366]/[0.03] blur-[80px]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#25D366]/10 flex items-center justify-center">
              <ChatCircle size={20} weight="bold" className="text-[#25D366]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Follow-up WhatsApp</h1>
              <p className="text-[11px] text-white/40">{stats.total} percakapan · {stats.nunggu} menunggu · {stats.followup} perlu follow-up</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/30">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Auto-sync via n8n webhook</span>
          </div>
        </div>
      </div>

      {/* Stats Chips */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterStatus('Semua')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-medium transition-colors cursor-pointer border ${
            filterStatus === 'Semua'
              ? 'bg-white/8 text-white border-white/15'
              : 'bg-transparent text-white/30 border-transparent hover:text-white/50'
          }`}
        >
          Semua
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{stats.total}</span>
        </button>
        <button
          onClick={() => setFilterStatus('Nunggu respon')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-medium transition-colors cursor-pointer border ${
            filterStatus === 'Nunggu respon'
              ? 'bg-[#FFD043]/10 text-[#FFD043] border-[#FFD043]/25'
              : 'bg-transparent text-white/30 border-transparent hover:text-white/50'
          }`}
        >
          <Clock size={12} weight="fill" />
          Nunggu respon
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{stats.nunggu}</span>
        </button>
        <button
          onClick={() => setFilterStatus('Sudah dibalas')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-medium transition-colors cursor-pointer border ${
            filterStatus === 'Sudah dibalas'
              ? 'bg-[#D8FF3F]/10 text-[#D8FF3F] border-[#D8FF3F]/25'
              : 'bg-transparent text-white/30 border-transparent hover:text-white/50'
          }`}
        >
          <CheckCircle size={12} weight="fill" />
          Sudah dibalas
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{stats.dibalas}</span>
        </button>
        <button
          onClick={() => setFilterStatus('Perlu follow-up')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-medium transition-colors cursor-pointer border ${
            filterStatus === 'Perlu follow-up'
              ? 'bg-[#FF5A5A]/10 text-[#FF5A5A] border-[#FF5A5A]/25'
              : 'bg-transparent text-white/30 border-transparent hover:text-white/50'
          }`}
        >
          <Warning size={12} weight="fill" />
          Perlu follow-up
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{stats.followup}</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex gap-4">
        {/* Table */}
        <div className="flex-1 bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] overflow-hidden flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1.5fr_120px_100px_100px] gap-3 px-5 py-2.5 border-b border-white/[0.04] text-[10px] font-semibold text-white/30 uppercase tracking-wider">
            <span>Nama Klien</span>
            <span>Pesan Terakhir</span>
            <span>Status</span>
            <span>PIC Humas</span>
            <span>Waktu</span>
          </div>

          {/* Table Rows */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-[12px] text-white/20">Tidak ada percakapan</div>
            ) : (
              filtered.map((conv) => {
                const sc = statusConfig[conv.status];
                return (
                  <button
                    key={conv.id}
                    onClick={() => { setSelectedId(conv.id); markRead(conv.id); }}
                    className={`w-full grid grid-cols-[1fr_1.5fr_120px_100px_100px] gap-3 px-5 py-3.5 text-left border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer ${selectedId === conv.id ? 'bg-white/[0.03]' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {conv.unread > 0 && (
                        <span className="w-2 h-2 rounded-full bg-[#25D366] flex-shrink-0" />
                      )}
                      <span className={`text-[12px] font-medium truncate ${conv.unread > 0 ? 'text-white/80' : 'text-white/55'}`}>
                        {conv.namaKlien}
                      </span>
                    </div>
                    <span className={`text-[11px] truncate ${conv.unread > 0 ? 'text-white/50' : 'text-white/30'}`}>
                      {conv.lastMessage}
                    </span>
                    <span>
                      <span className={`inline-flex items-center gap-1.5 text-[9px] font-semibold px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                        {sc.icon}
                        {conv.status}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                      <User size={11} weight="fill" className="text-white/25" />
                      {conv.picHumas}
                    </span>
                    <span className="text-[10px] text-white/25 flex items-center">
                      {timeAgo(conv.lastChatAt)}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Detail Drawer */}
        {selected && (
          <DetailDrawer
            conversation={selected}
            onClose={() => setSelectedId(null)}
            onUpdateStatus={(status) => updateStatus(selected.id, status)}
            onReassignPIC={(pic) => reassignPIC(selected.id, pic)}
            onSendMessage={(text) => addMessage(selected.id, 'humas', text)}
          />
        )}
      </div>
    </div>
  );
}

function DetailDrawer({
  conversation,
  onClose,
  onUpdateStatus,
  onReassignPIC,
  onSendMessage,
}: {
  conversation: WAConversation;
  onClose: () => void;
  onUpdateStatus: (status: WAStatus) => void;
  onReassignPIC: (pic: string) => void;
  onSendMessage: (text: string) => void;
}) {
  const [newMsg, setNewMsg] = useState('');
  const [showActions, setShowActions] = useState(false);

  function handleSend() {
    if (newMsg.trim()) {
      onSendMessage(newMsg.trim());
      setNewMsg('');
    }
  }

  return (
    <div className="w-[400px] flex-shrink-0 bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] flex flex-col max-h-[650px] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white cursor-pointer flex-shrink-0">
            <CaretLeft size={14} weight="bold" />
          </button>
          <div className="min-w-0">
            <h3 className="text-[13px] font-bold text-white/80 truncate">{conversation.namaKlien}</h3>
            <p className="text-[10px] text-white/30">{conversation.nomorWA}</p>
          </div>
        </div>
        <button
          onClick={() => setShowActions(!showActions)}
          className="text-[10px] text-white/30 hover:text-white/50 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-white/5"
        >
          Aksi
        </button>
      </div>

      {/* Quick Actions */}
      {showActions && (
        <div className="px-5 py-3 border-b border-white/[0.05] bg-white/[0.015] flex flex-col gap-2.5">
          <span className="text-[9px] text-white/25 uppercase tracking-wider">Quick Action</span>
          <div className="flex gap-2">
            <select
              value={conversation.status}
              onChange={(e) => onUpdateStatus(e.target.value as WAStatus)}
              className="input select !h-7 !text-[11px] flex-1"
            >
              {WA_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <select
              value={conversation.picHumas}
              onChange={(e) => onReassignPIC(e.target.value)}
              className="input select !h-7 !text-[11px] flex-1"
            >
              <option value="Rina">Rina</option>
              <option value="Daniel">Daniel</option>
              <option value="Ignas">Ignas</option>
            </select>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'humas' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                msg.sender === 'humas'
                  ? 'bg-[#25D366]/15 text-white/70 rounded-br-md'
                  : 'bg-white/[0.04] text-white/55 rounded-bl-md'
              }`}
            >
              <p className="text-[12px] leading-relaxed">{msg.text}</p>
              <p className="text-[9px] text-white/20 mt-1">{msg.timestamp.split(' ')[1]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/[0.05] flex items-center gap-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          className="input !h-9 !text-[12px] flex-1"
          placeholder="Ketik pesan..."
        />
        <button
          onClick={handleSend}
          disabled={!newMsg.trim()}
          className="w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#25D366]/90 disabled:opacity-30 flex items-center justify-center transition-colors cursor-pointer"
        >
          <PaperPlaneTilt size={16} weight="bold" className="text-black" />
        </button>
      </div>
    </div>
  );
}
