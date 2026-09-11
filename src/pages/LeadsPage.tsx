import { useMemo, useState } from 'react';
import { Database, Plus, X, MagnifyingGlass, ArrowSquareOut } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useLeadsDB } from '../hooks/useLeadsDB';
import { LEADS_TOTAL_DI_SHEET } from '../data/leads';
import type { LeadOutreachStatus } from '../data/leads';

const statusColor: Record<LeadOutreachStatus, string> = {
  Belum: 'bg-white/5 text-white/40',
  'Sudah Kontak': 'bg-[#4CD7E0]/15 text-[#4CD7E0]',
  'Minta Proposal': 'bg-[#FFD043]/15 text-[#FFD043]',
  Deal: 'bg-[#D8FF3F]/15 text-[#D8FF3F]',
  Ditolak: 'bg-[#FF5A5A]/15 text-[#FF5A5A]',
};

const STATUS: LeadOutreachStatus[] = ['Belum', 'Sudah Kontak', 'Minta Proposal', 'Deal', 'Ditolak'];

export function LeadsPage() {
  const { leads, setStatus, addLead } = useLeadsDB();
  const [q, setQ] = useState('');
  const [fStatus, setFStatus] = useState<'Semua' | LeadOutreachStatus>('Semua');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ bisnis: '', wa: '', kota: 'Depok City' });

  const filtered = useMemo(() => {
    let r = [...leads];
    if (q) r = r.filter((l) => `${l.bisnis} ${l.id} ${l.kota}`.toLowerCase().includes(q.toLowerCase()));
    if (fStatus !== 'Semua') r = r.filter((l) => l.status === fStatus);
    return r.sort((a, b) => b.review - a.review);
  }, [leads, q, fStatus]);

  const belum = leads.filter((l) => l.status === 'Belum').length;

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 pb-6">
      <div className="bg-[#17181F]/70 border border-white/[0.07] backdrop-blur-2xl rounded-[22px] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#4CD7E0]/10 flex items-center justify-center">
            <Database size={20} weight="bold" className="text-[#4CD7E0]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Leads Database</h1>
            <p className="text-[11px] text-white/40">{LEADS_TOTAL_DI_SHEET} di Sheet · {leads.length} sampel dimuat · {belum} belum dihubungi</p>
          </div>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-[#D8FF3F] text-black text-[12px] font-bold px-4 py-2.5 rounded-xl cursor-pointer">
          <Plus size={14} weight="bold" /> Tambah
        </button>
      </div>

      <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] px-5 py-3 flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 flex-1">
          <MagnifyingGlass size={14} className="text-white/30" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari bisnis / ID / kota..." className="bg-transparent outline-none text-[12px] text-white w-full placeholder:text-white/25" />
        </div>
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value as typeof fStatus)} className="input select !h-9 !text-[12px] !w-[180px]">
          <option value="Semua">Semua status</option>
          {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-[11px] text-white/30">{filtered.length} hasil · urut review terbesar</span>
      </div>

      <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] overflow-hidden">
        <div className="hidden md:grid grid-cols-[64px_1fr_110px_130px_150px] gap-2 px-5 py-2.5 text-[10px] font-bold text-white/30 uppercase tracking-wider border-b border-white/5">
          <span>ID</span><span>Bisnis</span><span className="text-right">Review</span><span>Kontak</span><span>Status</span>
        </div>
        <div className="flex flex-col">
          {filtered.map((l) => (
            <div key={l.id} className="grid md:grid-cols-[64px_1fr_110px_130px_150px] gap-2 px-5 py-3 border-b border-white/[0.03] items-center hover:bg-white/[0.02]">
              <span className="text-[11px] font-bold text-white/30">{l.id}</span>
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-white truncate">{l.bisnis}</p>
                <p className="text-[10px] text-white/35">{l.kota} · {l.website}{l.nextFU ? ` · FU: ${l.nextFU}` : ''}</p>
              </div>
              <span className="text-[12px] font-extrabold text-[#D8FF3F] md:text-right">{l.review.toLocaleString('id-ID')}</span>
              <span className="text-[11px] text-white/45 truncate">{l.wa}</span>
              <select value={l.status} onChange={(e) => setStatus(l.id, e.target.value as LeadOutreachStatus)} className={`text-[11px] font-bold rounded-full px-2.5 py-1.5 outline-none cursor-pointer ${statusColor[l.status]}`}>
                {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-[12px] text-white/25 py-10">Tidak ada hasil.</p>}
        </div>
      </div>

      <p className="text-[11px] text-white/30 flex items-center gap-1.5 px-1">
        <ArrowSquareOut size={12} /> Full 884 baris tetap di Google Sheet. Yang Deal otomatis masuk
        <Link to="/pipeline" className="text-[#D8FF3F] font-bold"> Pipeline →</Link>
      </p>

      {showAdd && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-[#17181F] border border-white/10 rounded-[22px] w-full max-w-md p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-white">Tambah Lead</h2>
              <button onClick={() => setShowAdd(false)} className="p-1.5 text-white/40 cursor-pointer"><X size={16} weight="bold" /></button>
            </div>
            <input value={form.bisnis} onChange={(e) => setForm({ ...form, bisnis: e.target.value })} placeholder="Nama bisnis" className="input" autoFocus />
            <input value={form.wa} onChange={(e) => setForm({ ...form, wa: e.target.value })} placeholder="No WA" className="input" />
            <input value={form.kota} onChange={(e) => setForm({ ...form, kota: e.target.value })} placeholder="Kota" className="input" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAdd(false)} className="text-[12px] text-white/40 px-4 py-2.5 cursor-pointer">Batal</button>
              <button disabled={!form.bisnis.trim()} onClick={() => { addLead(form.bisnis.trim(), form.wa.trim(), form.kota.trim()); setShowAdd(false); setForm({ bisnis: '', wa: '', kota: 'Depok City' }); }} className="bg-[#D8FF3F] text-black text-[12px] font-bold px-5 py-2.5 rounded-xl disabled:opacity-30 cursor-pointer">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
