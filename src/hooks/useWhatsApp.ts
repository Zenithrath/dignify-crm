import { useState, useEffect } from 'react';
import type { WAConversation, WAStatus } from '../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const MOCK_CONVERSATIONS: WAConversation[] = [
  {
    id: 'WA-001',
    namaKlien: 'PT Maju Jaya',
    nomorWA: '+62 812-3456-7890',
    lastMessage: 'Baik, saya tunggu draft pertamanya ya',
    status: 'Sudah dibalas',
    picHumas: 'Rina',
    lastChatAt: '2026-08-28 14:32',
    unread: 0,
    messages: [
      { id: 'M1', sender: 'humas', text: 'Halo Pak Budi, kabar gimana? Lanjutan project profile ya', timestamp: '2026-08-27 09:15' },
      { id: 'M2', sender: 'client', text: 'Halo Rina, alhamdulillah baik. Iya lanjut, ada progress?', timestamp: '2026-08-27 09:30' },
      { id: 'M3', sender: 'humas', text: 'Alhamdulillah, untuk design sudah 70%. Nanti saya share draft pertama', timestamp: '2026-08-27 09:45' },
      { id: 'M4', sender: 'client', text: 'Oke bagus, ditunggu ya', timestamp: '2026-08-27 10:00' },
      { id: 'M5', sender: 'humas', text: 'Ini draft pertama, tolong review ya Pak 🙏', timestamp: '2026-08-28 14:20' },
      { id: 'M6', sender: 'client', text: 'Baik, saya tunggu draft pertamanya ya', timestamp: '2026-08-28 14:32' },
    ],
  },
  {
    id: 'WA-002',
    namaKlien: 'PT Berkah Sejahtera',
    nomorWA: '+62 813-9876-5432',
    lastMessage: 'Tolong tambahkan foto produk yang terbaru ya',
    status: 'Nunggu respon',
    picHumas: 'Daniel',
    lastChatAt: '2026-08-28 11:20',
    unread: 2,
    messages: [
      { id: 'M7', sender: 'client', text: 'Halo, katalog digitalnya udah jadi belum?', timestamp: '2026-08-28 10:00' },
      { id: 'M8', sender: 'humas', text: 'Halo Pak Andi, alhamdulillah sudah 80%. Tinggal finishing', timestamp: '2026-08-28 10:15' },
      { id: 'M9', sender: 'client', text: 'Oke, tolong tambahkan foto produk yang terbaru ya', timestamp: '2026-08-28 11:20' },
    ],
  },
  {
    id: 'WA-003',
    namaKlien: 'CV Sukses Mandiri',
    nomorWA: '+62 821-5555-1234',
    lastMessage: 'Deadline-nya kapan ya? Kami butuh segera',
    status: 'Perlu follow-up',
    picHumas: 'Rina',
    lastChatAt: '2026-08-27 16:45',
    unread: 1,
    messages: [
      { id: 'M10', sender: 'humas', text: 'Pak Rudi, gimana dengan proposal yang kemarin?', timestamp: '2026-08-26 09:00' },
      { id: 'M11', sender: 'client', text: 'Sudah saya baca, ada beberapa yang perlu dikoreksi', timestamp: '2026-08-26 14:00' },
      { id: 'M12', sender: 'humas', text: 'Baik, apa saja yang perlu dikoreksi?', timestamp: '2026-08-26 14:15' },
      { id: 'M13', sender: 'client', text: 'Deadline-nya kapan ya? Kami butuh segera', timestamp: '2026-08-27 16:45' },
    ],
  },
  {
    id: 'WA-004',
    namaKlien: 'PT Digital Nusantara',
    nomorWA: '+62 856-1111-2222',
    lastMessage: 'Terima kasih, sudah sesuai semua!',
    status: 'Sudah dibalas',
    picHumas: 'Ignas',
    lastChatAt: '2026-08-26 09:10',
    unread: 0,
    messages: [
      { id: 'M14', sender: 'humas', text: 'Pak Heri, invoice sudah kami kirim via email ya', timestamp: '2026-08-25 15:00' },
      { id: 'M15', sender: 'client', text: 'Oke noted, saya cek dulu', timestamp: '2026-08-25 15:30' },
      { id: 'M16', sender: 'client', text: 'Terima kasih, sudah sesuai semua!', timestamp: '2026-08-26 09:10' },
    ],
  },
  {
    id: 'WA-005',
    namaKlien: 'UD Makmur Jaya',
    nomorWA: '+62 878-3333-4444',
    lastMessage: 'Ada promo年终 ga untuk续contract?',
    status: 'Perlu follow-up',
    picHumas: 'Daniel',
    lastChatAt: '2026-08-25 17:30',
    unread: 3,
    messages: [
      { id: 'M17', sender: 'client', text: 'Halo, website kami udah jalan 6 bulan nih', timestamp: '2026-08-25 16:00' },
      { id: 'M18', sender: 'humas', text: 'Iya Pak, alhamdulillah. Ada yang bisa dibantu?', timestamp: '2026-08-25 16:15' },
      { id: 'M19', sender: 'client', text: 'Ada promo年终 ga untuk续contract?', timestamp: '2026-08-25 17:30' },
    ],
  },
  {
    id: 'WA-006',
    namaKlien: 'PT Sejahtera Bersama',
    nomorWA: '+62 811-7777-8888',
    lastMessage: 'Design-nya bagus! Lanjut ya',
    status: 'Sudah dibalas',
    picHumas: 'Rina',
    lastChatAt: '2026-08-28 08:45',
    unread: 0,
    messages: [
      { id: 'M20', sender: 'humas', text: 'Pak Dimas, ini design final untuk company profile', timestamp: '2026-08-28 08:30' },
      { id: 'M21', sender: 'client', text: 'Design-nya bagus! Lanjut ya', timestamp: '2026-08-28 08:45' },
    ],
  },
];

let nextId = 100;

export function useWhatsApp() {
  const [state, setState] = useState<UseApiState<WAConversation[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      setState({ data: MOCK_CONVERSATIONS, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  const updateStatus = (convId: string, status: WAStatus) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((c) => (c.id === convId ? { ...c, status } : c))
        : prev.data,
    }));
  };

  const reassignPIC = (convId: string, newPic: string) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((c) => (c.id === convId ? { ...c, picHumas: newPic } : c))
        : prev.data,
    }));
  };

  const markRead = (convId: string) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((c) => (c.id === convId ? { ...c, unread: 0 } : c))
        : prev.data,
    }));
  };

  const addMessage = (convId: string, sender: 'client' | 'humas', text: string) => {
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((c) => {
            if (c.id !== convId) return c;
            const newMsg = { id: `M${++nextId}`, sender, text, timestamp: now };
            return {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: text,
              lastChatAt: now,
              status: sender === 'client' ? 'Nunggu respon' as WAStatus : c.status,
            };
          })
        : prev.data,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, updateStatus, reassignPIC, markRead, addMessage };
}
