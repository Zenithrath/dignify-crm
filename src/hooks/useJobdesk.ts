import { useEffect, useState } from 'react';
import { JOBDESK_SEED, type JobTask } from '../data/jobdesk';

const KEY = 'dignify-jobdesk-v1';

function load(): JobTask[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return JOBDESK_SEED;
    const parsed = JSON.parse(raw) as JobTask[];
    // merge: kalau seed bertambah, tambahkan yang belum ada
    const ids = new Set(parsed.map((p) => p.id));
    const missing = JOBDESK_SEED.filter((s) => !ids.has(s.id));
    return missing.length ? [...parsed, ...missing] : parsed;
  } catch {
    return JOBDESK_SEED;
  }
}

export function useJobdesk() {
  const [tasks, setTasks] = useState<JobTask[]>(() => load());
  const [loading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch { /* abaikan */ }
  }, [tasks]);

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, done: !t.done, lastDone: !t.done ? new Date().toISOString().slice(0, 10) : t.lastDone }
          : t
      )
    );

  const resetRutin = () =>
    setTasks((prev) => prev.map((t) => (t.tipe === 'Pasif' ? { ...t, done: false } : t)));

  const aktif = tasks.filter((t) => t.tipe === 'Aktif');
  const pasif = tasks.filter((t) => t.tipe === 'Pasif');
  const doneAktif = aktif.filter((t) => t.done).length;
  const donePasif = pasif.filter((t) => t.done).length;

  return { tasks, aktif, pasif, doneAktif, donePasif, totalAktif: aktif.length, totalPasif: pasif.length, toggle, resetRutin, loading };
}
