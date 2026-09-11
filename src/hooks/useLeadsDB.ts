import { useEffect, useState } from 'react';
import { LEADS_SEED, type LeadDB, type LeadOutreachStatus } from '../data/leads';

const KEY = 'dignify-leadsdb-v1';

function load(): LeadDB[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return LEADS_SEED;
    const parsed = JSON.parse(raw) as LeadDB[];
    const ids = new Set(parsed.map((p) => p.id));
    const missing = LEADS_SEED.filter((s) => !ids.has(s.id));
    return missing.length ? [...parsed, ...missing] : parsed;
  } catch {
    return LEADS_SEED;
  }
}

export function useLeadsDB() {
  const [leads, setLeads] = useState<LeadDB[]>(() => load());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(leads));
    } catch { /* abaikan */ }
  }, [leads]);

  const setStatus = (id: string, status: LeadOutreachStatus) =>
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));

  const setFU = (id: string, nextFU: string, catatan: string) =>
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, nextFU, catatan } : l)));

  const addLead = (bisnis: string, wa: string, kota: string) =>
    setLeads((prev) => [
      {
        id: `L${String(prev.length + 1).padStart(3, '0')}-M`,
        bisnis,
        kategori: 'Manual',
        kota: kota || 'Depok City',
        review: 0,
        wa,
        website: 'Tidak Ada',
        sosmed: '-',
        status: 'Belum',
        nextFU: '',
        catatan: '',
      },
      ...prev,
    ]);

  return { leads, setStatus, setFU, addLead };
}
