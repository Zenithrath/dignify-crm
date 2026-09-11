import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Warning, Calendar, Phone, FunnelSimple, Briefcase,
  CurrencyCircleDollar, Article, UsersThree, CheckCircle, Circle,
} from '@phosphor-icons/react';
import { useDashboard } from '../contexts/DashboardContext';
import { useJobdesk } from '../hooks/useJobdesk';
import { useLeadsDB } from '../hooks/useLeadsDB';
import { useClosingBook } from '../hooks/useClosingBook';
import {
  businessKPI, funnel, businessProjects,
  contentRolling, rateCard, formatShortIDR, formatIDR,
} from '../data/businessSnapshot';

type Tab = 'hari' | 'jualan' | 'uang' | 'konten';

const TABS: { id: Tab; label: string }[] = [
  { id: 'hari', label: 'Hari Ini' },
  { id: 'jualan', label: 'Jualan' },
  { id: 'uang', label: 'Project & Uang' },
  { id: 'konten', label: 'Konten & Tim' },
];

export function DashboardPage() {
  const [tab, setTab] = useState<Tab>('hari');
  const { contentWeek, contentMonth } = useDashboard();
  const { pasif, aktif, donePasif, doneAktif, totalPasif, totalAktif, toggle } = useJobdesk();
  const { leads } = useLeadsDB();
  const { items, totalNilai, belumLunas } = useClosingBook();

  const overdueFU = leads.filter((l) => l.status === 'Minta Proposal' || (l.nextFU && l.nextFU < '2026-09-10'));
  const rutinHariIni = pasif.filter((t) => !t.done).slice(0, 4);
  const aktifJalan = aktif.filter((t) => !t.done).slice(0, 4);

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 pb-6">
      {/* Header ramping */}
      <div className="bg-[#D8FF3F] text-black rounded-[22px] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-black/50">Dignify · Hari ini</p>
          <h1 className="text-lg font-extrabold tracking-tight">Kerjakan yang overdue dulu, sisanya ngikutin</h1>
        </div>
        <div className="flex gap-2 text-[12px] font-bold">
          <Link to="/leads" className="bg-black text-[#D8FF3F] px-4 py-2.5 rounded-xl">Leads</Link>
          <Link to="/pipeline" className="bg-black/10 px-4 py-2.5 rounded-xl">Pipeline</Link>
          <Link to="/closing" className="bg-black/10 px-4 py-2.5 rounded-xl">Closing</Link>
        </div>
      </div>

      {/* 5 KPI saja */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { l: 'FU perlu aksi', v: String(Math.max(overdueFU.length, businessKPI.followUpOverdue)), s: 'overdue, hubungi dulu' },
          { l: 'Leads belum sentuh', v: String(leads.filter((x) => x.status === 'Belum').length), s: `dari ${businessKPI.totalLeads} di Sheet` },
          { l: 'Project aktif', v: String(businessProjects.length), s: '1 pengerjaan + 2 waiting' },
          { l: 'Belum lunas', v: String(belumLunas), s: formatIDR(totalNilai) },
          { l: 'Rutin vs Aktif', v: `${donePasif + doneAktif}/${totalPasif + totalAktif}`, s: 'tugas selesai' },
        ].map((k) => (
          <div key={k.l} className="bg-[#17181F]/70 border border-white/[0.07] rounded-[18px] p-4">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{k.l}</p>
            <p className="text-2xl font-extrabold text-white mt-1">{k.v}</p>
            <p className="text-[10px] text-white/35 mt-0.5">{k.s}</p>
          </div>
        ))}
      </div>

      {/* Tab */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[18px] p-1.5 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 whitespace-nowrap px-4 py-2 rounded-xl text-[12px] font-bold cursor-pointer ${tab === t.id ? 'bg-[#D8FF3F] text-black' : 'text-white/50 hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'hari' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#17181F]/70 border border-[#FF5A5A]/20 rounded-[22px] p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><Warning size={16} className="text-[#FF5A5A]" /> Wajib hari ini</h2>
              <Link to="/pipeline" className="text-[11px] font-bold text-[#D8FF3F]">Pipeline →</Link>
            </div>
            {overdueFU.slice(0, 3).map((l) => (
              <div key={l.id} className="bg-white/[0.03] border border-white/5 rounded-[14px] px-4 py-3">
                <p className="text-[13px] font-bold text-white">{l.bisnis} <span className="text-white/30">· {l.id}</span></p>
                <p className="text-[11px] text-white/45 mt-0.5">FU {l.nextFU || 'segera'} · {l.wa} · {l.catatan || l.status}</p>
              </div>
            ))}
            <div className="bg-white/[0.03] border border-white/5 rounded-[14px] px-4 py-3">
              <p className="text-[13px] font-bold text-white">Tagih pelunasan Arsitek Studio Malang</p>
              <p className="text-[11px] text-white/45 mt-0.5">DP lunas 50% · sisa 50% · deadline 20/09 · <Link to="/closing" className="text-[#D8FF3F] font-bold">Buka Closing →</Link></p>
            </div>
          </div>
          <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><Calendar size={16} className="text-[#4CD7E0]" /> Rutin hari ini (Pasif)</h2>
              <Link to="/team" className="text-[11px] font-bold text-[#D8FF3F]">Tim →</Link>
            </div>
            {rutinHariIni.map((t) => (
              <button key={t.id} onClick={() => toggle(t.id)} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-[12px] px-3.5 py-2.5 text-left cursor-pointer">
                {t.done ? <CheckCircle size={16} className="text-[#D8FF3F]" /> : <Circle size={16} className="text-white/30" />}
                <span className="flex-1 min-w-0"><span className="text-[12px] text-white/70 block truncate">{t.tugas}</span><span className="text-[10px] text-white/30">{t.nama} · {t.cadence} · {t.target}</span></span>
              </button>
            ))}
            <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-wider mt-1">Aktif jalan (Per Project)</h3>
            {aktifJalan.map((t) => (
              <button key={t.id} onClick={() => toggle(t.id)} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-[12px] px-3.5 py-2.5 text-left cursor-pointer">
                {t.done ? <CheckCircle size={16} className="text-[#D8FF3F]" /> : <Circle size={16} className="text-white/30" />}
                <span className="flex-1 min-w-0"><span className="text-[12px] text-white/70 block truncate">{t.tugas}</span><span className="text-[10px] text-white/30">{t.nama} · {t.role}</span></span>
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'jualan' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-3"><FunnelSimple size={16} className="text-[#D8FF3F]" /> Funnel</h2>
            {funnel.map((f) => (
              <div key={f.label} className="mb-3">
                <div className="flex justify-between text-[12px] mb-1"><span className="text-white font-bold">{f.label}</span><span className="text-[#D8FF3F] font-extrabold">{f.value}</span></div>
                <div className="h-2 bg-white/5 rounded-full"><div className="h-full bg-[#D8FF3F] rounded-full" style={{ width: `${Math.max((f.value / 884) * 100, 2)}%` }} /></div>
              </div>
            ))}
            <Link to="/leads" className="text-[11px] font-bold text-[#D8FF3F]">Buka Leads →</Link>
          </div>
          <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-3"><Phone size={16} className="text-[#FFD043]" /> Perlu dihubungi</h2>
            {leads.filter((l) => l.status === 'Belum').slice(0, 4).map((l) => (
              <p key={l.id} className="text-[12px] text-white/60 py-1.5 border-b border-white/5">{l.bisnis} <span className="text-white/30">· {l.review.toLocaleString('id-ID')} review · {l.wa}</span></p>
            ))}
            <Link to="/pipeline" className="text-[11px] font-bold text-[#D8FF3F]">Buka Pipeline →</Link>
          </div>
          <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5">
            <h2 className="text-sm font-bold text-white mb-3">Contekan harga</h2>
            {rateCard.slice(0, 5).map((r) => (
              <p key={r.kategori} className="text-[12px] text-white/60 py-1 border-b border-white/5">{r.kategori} <span className="text-[#D8FF3F] font-bold float-right">{formatShortIDR(r.hargaMin)}–{formatShortIDR(r.hargaMax)}</span></p>
            ))}
            <Link to="/pipeline" className="text-[11px] font-bold text-[#D8FF3F]">Pakai saat nawar →</Link>
          </div>
        </div>
      )}

      {tab === 'uang' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><Briefcase size={16} className="text-[#A89AE8]" /> Project</h2>
              <Link to="/development" className="text-[11px] font-bold text-[#D8FF3F]">Development →</Link>
            </div>
            {businessProjects.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-2 border-b border-white/5">
                <div className="flex-1 min-w-0"><p className="text-[12px] font-bold text-white truncate">{p.namaProject}</p><p className="text-[10px] text-white/35">{p.klien} · {p.pic} · {p.deadline}</p></div>
                <span className="text-[12px] font-extrabold text-[#D8FF3F]">{p.progress}%</span>
              </div>
            ))}
          </div>
          <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><CurrencyCircleDollar size={16} className="text-[#D8FF3F]" /> Uang</h2>
              <Link to="/closing" className="text-[11px] font-bold text-[#D8FF3F]">Closing →</Link>
            </div>
            {items.map((c) => (
              <div key={c.idLead} className="flex items-center gap-3 py-2 border-b border-white/5">
                <p className="flex-1 text-[12px] text-white/70 truncate">{c.namaBisnis}</p>
                <p className="text-[12px] font-bold text-white">{formatShortIDR(c.nilai)}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.statusPelunasan === 'Lunas' ? 'bg-[#D8FF3F]/15 text-[#D8FF3F]' : 'bg-[#FF5A5A]/15 text-[#FF5A5A]'}`}>{c.statusPelunasan}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'konten' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><Article size={16} className="text-[#E1306C]" /> Konten</h2>
              <Link to="/content" className="text-[11px] font-bold text-[#D8FF3F]">Konten →</Link>
            </div>
            <p className="text-[12px] text-white/60">Minggu ini: <b className="text-white">{contentWeek.length}</b> · Bulan ini: <b className="text-white">{contentMonth.length}</b></p>
            {contentRolling.slice(0, 3).map((r) => (
              <p key={r.periode} className="text-[12px] text-white/50 py-1.5 border-b border-white/5">{r.periode} · {r.pj} {r.aktif && <span className="text-[9px] bg-[#D8FF3F] text-black px-1.5 py-0.5 rounded-full ml-1">AKTIF</span>}</p>
            ))}
          </div>
          <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><UsersThree size={16} className="text-[#A89AE8]" /> Tim: {doneAktif}/{totalAktif} aktif · {donePasif}/{totalPasif} rutin</h2>
              <Link to="/team" className="text-[11px] font-bold text-[#D8FF3F]">Tim →</Link>
            </div>
            <p className="text-[11px] text-white/40">Aktif = projectan (selesai = done). Pasif = rutin harian/mingguan/bulanan (reset tiap periode). Detail + centang ada di halaman Tim.</p>
          </div>
        </div>
      )}
    </div>
  );
}
