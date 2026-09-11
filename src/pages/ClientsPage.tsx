import { useMemo, useState } from 'react';
import { AddressBook, MagnifyingGlass } from '@phosphor-icons/react';
import { useClosingBook } from '../hooks/useClosingBook';
import { useLeadsDB } from '../hooks/useLeadsDB';
import { useDashboard } from '../contexts/DashboardContext';
import { formatIDR } from '../data/businessSnapshot';

export function ClientsPage() {
  const { items } = useClosingBook();
  const { leads } = useLeadsDB();
  const { clientContacts } = useDashboard();
  const [q, setQ] = useState('');

  const book = useMemo(() => {
    const rows = items.map((c) => {
      const lead = leads.find((l) => l.bisnis.toLowerCase() === c.namaBisnis.toLowerCase() || l.id === c.idLead);
      return {
        nama: c.namaBisnis,
        id: c.idLead,
        paket: c.paket,
        nilai: c.nilai,
        wa: lead?.wa ?? '-',
        fu: lead?.nextFU || c.deadline,
        status: c.statusPelunasan === 'Lunas' ? 'Lunas' : 'Aktif',
      };
    });
    // tambah kontak lama dari dashboard context biar lengkap
    clientContacts.forEach((cc) => {
      if (!rows.some((r) => r.nama.toLowerCase() === cc.company.toLowerCase() || r.nama.toLowerCase() === cc.name.toLowerCase())) {
        rows.push({ nama: `${cc.name} (${cc.company})`, id: cc.id, paket: cc.role, nilai: 0, wa: cc.phone, fu: cc.followUpDate, status: cc.status });
      }
    });
    if (!q) return rows;
    return rows.filter((r) => `${r.nama} ${r.wa}`.toLowerCase().includes(q.toLowerCase()));
  }, [items, leads, clientContacts, q]);

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 pb-6">
      <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#A89AE8]/10 flex items-center justify-center">
          <AddressBook size={20} weight="bold" className="text-[#A89AE8]" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white">Buku Klien</h1>
          <p className="text-[11px] text-white/40">{book.length} klien · kontak + FU + nilai project</p>
        </div>
      </div>

      <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] px-5 py-3 flex items-center gap-2">
        <MagnifyingGlass size={14} className="text-white/30" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari klien / WA..." className="bg-transparent outline-none text-[12px] text-white w-full placeholder:text-white/25" />
      </div>

      <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_140px_130px_120px_90px] gap-2 px-5 py-2.5 text-[10px] font-bold text-white/30 uppercase tracking-wider border-b border-white/5">
          <span>Klien</span><span>WA</span><span>FU / Deadline</span><span className="text-right">Nilai</span><span className="text-center">Status</span>
        </div>
        {book.map((b) => (
          <div key={b.id + b.nama} className="grid md:grid-cols-[1fr_140px_130px_120px_90px] gap-1 px-5 py-3 border-b border-white/[0.03] items-center">
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-white truncate">{b.nama}</p>
              <p className="text-[10px] text-white/35">{b.paket}</p>
            </div>
            <span className="text-[11px] text-white/50">{b.wa}</span>
            <span className="text-[11px] text-white/50">{b.fu || '-'}</span>
            <span className="text-[12px] font-bold text-white md:text-right">{b.nilai ? formatIDR(b.nilai) : '-'}</span>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full text-center ${b.status === 'Lunas' ? 'bg-[#D8FF3F]/15 text-[#D8FF3F]' : 'bg-[#4CD7E0]/15 text-[#4CD7E0]'}`}>{b.status}</span>
          </div>
        ))}
        {book.length === 0 && <p className="text-center text-white/25 text-[12px] py-10">Belum ada klien.</p>}
      </div>
      <p className="text-[11px] text-white/30 px-1">Klien otomatis terisi dari halaman Closing + kontak lama. Ubah nilai/DP di Closing, kontak muncul di sini.</p>
    </div>
  );
}
