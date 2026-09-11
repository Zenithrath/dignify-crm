import { useEffect, useState } from 'react';
import { closingRows as seedClosing } from '../data/businessSnapshot';

export interface ClosingItem {
  idLead: string;
  namaBisnis: string;
  paket: string;
  nilai: number;
  statusDP: string;
  deadline: string;
  statusProyek: string;
  statusPelunasan: string;
}

const KEY = 'dignify-closing-v1';

function load(): ClosingItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedClosing as ClosingItem[];
    return JSON.parse(raw) as ClosingItem[];
  } catch {
    return seedClosing as ClosingItem[];
  }
}

export function useClosingBook() {
  const [items, setItems] = useState<ClosingItem[]>(() => load());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch { /* abaikan */ }
  }, [items]);

  const toggleDP = (idLead: string) =>
    setItems((prev) =>
      prev.map((c) =>
        c.idLead === idLead
          ? { ...c, statusDP: c.statusDP.includes('Belum') ? 'Lunas (50%)' : 'Belum' }
          : c
      )
    );

  const togglePelunasan = (idLead: string) =>
    setItems((prev) =>
      prev.map((c) =>
        c.idLead === idLead
          ? { ...c, statusPelunasan: c.statusPelunasan === 'Lunas' ? 'Belum' : 'Lunas' }
          : c
      )
    );

  const addClosing = (namaBisnis: string, paket: string, nilai: number, deadline: string) =>
    setItems((prev) => [
      { idLead: `C-${Date.now().toString().slice(-4)}`, namaBisnis, paket, nilai, statusDP: 'Belum', deadline, statusProyek: 'Pengerjaan', statusPelunasan: 'Belum' },
      ...prev,
    ]);

  const totalNilai = items.reduce((s, c) => s + (c.nilai || 0), 0);
  const belumLunas = items.filter((c) => c.statusPelunasan !== 'Lunas').length;

  return { items, toggleDP, togglePelunasan, addClosing, totalNilai, belumLunas };
}
