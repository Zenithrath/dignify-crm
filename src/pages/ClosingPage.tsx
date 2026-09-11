import { useState } from 'react';
import { CurrencyCircleDollar, Plus, X } from '@phosphor-icons/react';
import { useClosingBook } from '../hooks/useClosingBook';
import { formatIDR, formatShortIDR } from '../data/businessSnapshot';

export function ClosingPage() {
  const { items, toggleDP, togglePelunasan, addClosing, totalNilai, belumLunas } = useClosingBook();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ nama: '', paket: 'Company Profile + Portfolio', nilai: '2500000', deadline: '2026-09-20' });

  const lunas = items.length - belumLunas;
  const revenue = Math.round(totalNilai / 2); // asumsi DP 50% masuk

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 pb-6">
      <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D8FF3F]/10 flex items-center justify-center">
            <CurrencyCircleDollar size={20} weight="bold" className="text-[#D8FF3F]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Closing & Keuangan</h1>
            <p className="text-[11px] text-white/40">{items.length} deal · {formatIDR(totalNilai)} total · {belumLunas} belum lunas</p>
          </div>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-[#D8FF3F] text-black text-[12px] font-bold px-4 py-2.5 rounded-xl cursor-pointer">
          <Plus size={14} weight="bold" /> Tambah deal
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: 'Total nilai', v: formatShortIDR(totalNilai) },
          { l: 'Revenue masuk (±DP)', v: formatShortIDR(revenue) },
          { l: 'Belum lunas', v: String(belumLunas) },
          { l: 'Sudah lunas', v: String(lunas) },
        ].map((k) => (
          <div key={k.l} className="bg-[#17181F]/70 border border-white/[0.07] rounded-[18px] p-4">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{k.l}</p>
            <p className="text-2xl font-extrabold text-white mt-1">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {items.map((c) => (
          <div key={c.idLead} className="bg-[#17181F]/70 border border-white/[0.07] rounded-[18px] p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-white truncate">{c.namaBisnis} <span className="text-white/30 font-medium">· {c.idLead}</span></p>
              <p className="text-[11px] text-white/40 mt-0.5">{c.paket} · Deadline {c.deadline} · {formatIDR(c.nilai)}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleDP(c.idLead)} title="Klik untuk ubah status DP" className={`text-[11px] font-bold px-3 py-1.5 rounded-full cursor-pointer ${c.statusDP.includes('Lunas') ? 'bg-[#D8FF3F]/15 text-[#D8FF3F]' : 'bg-white/5 text-white/40'}`}>
                DP: {c.statusDP}
              </button>
              <button onClick={() => togglePelunasan(c.idLead)} title="Klik untuk ubah pelunasan" className={`text-[11px] font-bold px-3 py-1.5 rounded-full cursor-pointer ${c.statusPelunasan === 'Lunas' ? 'bg-[#D8FF3F]/15 text-[#D8FF3F]' : 'bg-[#FF5A5A]/15 text-[#FF5A5A]'}`}>
                {c.statusPelunasan === 'Lunas' ? 'Lunas' : 'Belum — tagih!'}
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-white/25 text-[12px] py-10">Belum ada deal.</p>}
      </div>
      <p className="text-[11px] text-white/30 px-1">Klik badge DP / pelunasan untuk ubah status. Data tersimpan otomatis di browser.</p>

      {showAdd && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-[#17181F] border border-white/10 rounded-[22px] w-full max-w-md p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-white">Tambah Deal</h2>
              <button onClick={() => setShowAdd(false)} className="p-1.5 text-white/40 cursor-pointer"><X size={16} weight="bold" /></button>
            </div>
            <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama bisnis" className="input" autoFocus />
            <input value={form.paket} onChange={(e) => setForm({ ...form, paket: e.target.value })} placeholder="Paket" className="input" />
            <input value={form.nilai} onChange={(e) => setForm({ ...form, nilai: e.target.value })} placeholder="Nilai (angka)" inputMode="numeric" className="input" />
            <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAdd(false)} className="text-[12px] text-white/40 px-4 py-2.5 cursor-pointer">Batal</button>
              <button disabled={!form.nama.trim()} onClick={() => { addClosing(form.nama.trim(), form.paket.trim(), Number(form.nilai) || 0, form.deadline); setShowAdd(false); }} className="bg-[#D8FF3F] text-black text-[12px] font-bold px-5 py-2.5 rounded-xl disabled:opacity-30 cursor-pointer">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
