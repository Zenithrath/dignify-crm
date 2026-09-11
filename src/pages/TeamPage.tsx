import { useState } from 'react';
import { Users, CheckCircle, Circle, ArrowClockwise } from '@phosphor-icons/react';
import { useJobdesk } from '../hooks/useJobdesk';
import { CADENCE_ORDER, cadenceColor, type JobCadence } from '../data/jobdesk';
import { roadmap90 } from '../data/businessSnapshot';

export function TeamPage() {
  const { tasks, aktif, pasif, doneAktif, donePasif, totalAktif, totalPasif, toggle, resetRutin } = useJobdesk();
  const [nama, setNama] = useState<string>('Semua');
  const [cadence, setCadence] = useState<'Semua' | JobCadence>('Semua');

  const names = ['Semua', ...Array.from(new Set(tasks.map((t) => t.nama)))];

  const listAktif = aktif.filter((t) => (nama === 'Semua' || t.nama === nama));
  const listPasif = pasif.filter(
    (t) => (nama === 'Semua' || t.nama === nama) && (cadence === 'Semua' || t.cadence === cadence)
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 pb-6">
      <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#A89AE8]/10 flex items-center justify-center">
            <Users size={20} weight="bold" className="text-[#A89AE8]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Tim & Jobdesk</h1>
            <p className="text-[11px] text-white/40">Aktif {doneAktif}/{totalAktif} · Rutin {donePasif}/{totalPasif} · centang = selesai</p>
          </div>
        </div>
        <div className="flex gap-2">
          <select value={nama} onChange={(e) => setNama(e.target.value)} className="input select !h-9 !text-[12px] !w-[140px]">
            {names.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <button onClick={resetRutin} title="Reset semua tugas rutin (Pasif) jadi belum selesai" className="flex items-center gap-1.5 text-[11px] font-bold text-white/50 hover:text-white bg-white/5 px-3 py-2 rounded-xl cursor-pointer">
            <ArrowClockwise size={13} /> Reset rutin
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AKTIF = projectan */}
        <div className="bg-[#D8FF3F]/[0.04] border border-[#D8FF3F]/20 rounded-[22px] p-5 flex flex-col gap-2">
          <h2 className="text-sm font-bold text-white">Aktif — Projectan <span className="text-[11px] font-medium text-white/40">({doneAktif}/{totalAktif} selesai · ada awal-akhir)</span></h2>
          <p className="text-[11px] text-white/40">Contoh: API, wireframe, coding, workflow. Selesai = done, tidak berulang.</p>
          {listAktif.map((t) => (
            <button key={t.id} onClick={() => toggle(t.id)} className="flex items-center gap-3 bg-[#17181F]/70 border border-white/[0.06] rounded-[14px] px-4 py-3 text-left cursor-pointer hover:bg-white/[0.03]">
              {t.done ? <CheckCircle size={18} weight="fill" className="text-[#D8FF3F] flex-shrink-0" /> : <Circle size={18} className="text-white/30 flex-shrink-0" />}
              <span className="flex-1 min-w-0">
                <span className={`text-[13px] font-bold block truncate ${t.done ? 'text-white/35 line-through' : 'text-white'}`}>{t.tugas}</span>
                <span className="text-[10px] text-white/35">{t.nama} · {t.role} · Per Project · {t.target}</span>
              </span>
            </button>
          ))}
          {listAktif.length === 0 && <p className="text-[12px] text-white/25 py-6 text-center">Tidak ada tugas aktif.</p>}
        </div>

        {/* PASIF = rutin */}
        <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h2 className="text-sm font-bold text-white">Pasif — Rutin <span className="text-[11px] font-medium text-white/40">({donePasif}/{totalPasif} · berulang terus)</span></h2>
            <select value={cadence} onChange={(e) => setCadence(e.target.value as typeof cadence)} className="input select !h-8 !text-[11px] !w-[130px]">
              <option value="Semua">Semua periode</option>
              {CADENCE_ORDER.filter((c) => c !== 'Per Project').map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <p className="text-[11px] text-white/40">Contoh: konten mingguan, pantau server, audit & laporan bulanan. Reset tiap periode.</p>
          {(CADENCE_ORDER.filter((c) => c !== 'Per Project') as JobCadence[])
            .filter((c) => cadence === 'Semua' || cadence === c)
            .map((c) => {
              const rows = listPasif.filter((t) => t.cadence === c);
              if (!rows.length) return null;
              return (
                <div key={c} className="mt-1">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">{c} · {rows.filter((r) => r.done).length}/{rows.length}</p>
                  <div className="flex flex-col gap-1.5">
                    {rows.map((t) => (
                      <button key={t.id} onClick={() => toggle(t.id)} className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-[12px] px-3.5 py-2.5 text-left cursor-pointer hover:bg-white/[0.04]">
                        {t.done ? <CheckCircle size={16} weight="fill" className="text-[#D8FF3F] flex-shrink-0" /> : <Circle size={16} className="text-white/30 flex-shrink-0" />}
                        <span className="flex-1 min-w-0">
                          <span className={`text-[12px] font-bold block truncate ${t.done ? 'text-white/35 line-through' : 'text-white/80'}`}>{t.tugas}</span>
                          <span className="text-[10px] text-white/30">{t.nama} · {t.role} · {t.target}</span>
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${cadenceColor(t.cadence)}`}>{t.cadence}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Roadmap mini biar tetap kelihatan tanpa halaman sendiri */}
      <div className="bg-[#17181F]/70 border border-white/[0.07] rounded-[22px] p-5">
        <h2 className="text-sm font-bold text-white mb-3">Roadmap 90 hari (mini)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {roadmap90.map((r, i) => (
            <div key={r.minggu} className="bg-white/[0.02] border border-white/5 rounded-[14px] p-3.5">
              <p className="text-[11px] font-bold text-white/40">{i + 1}. {r.minggu} · {r.fase}</p>
              <p className="text-[12px] text-white/70 mt-1">{r.target}</p>
              <span className={`inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${r.status === 'Jalan' ? 'bg-[#D8FF3F]/15 text-[#D8FF3F]' : 'bg-white/5 text-white/30'}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
