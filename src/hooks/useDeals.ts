import { useState, useEffect } from 'react';
import type { Deal } from '../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const MOCK_DEALS: Deal[] = [
  {
    id: 'DEAL-2026-0001',
    namaKlien: 'PT Maju Jaya',
    tipe: 'Paid Outbound',
    estimasiValue: 35000000,
    pic: 'Daniel',
    deadline: '2026-09-15',
    nextAction: 'Kirim proposal revisi',
    stage: 'Prospecting',
    catatan: 'Klien tertarik company profile video',
    activities: [
      { id: 'ACT-001', timestamp: '2026-08-20 09:00', user: 'Daniel', action: 'Deal dibuat', details: 'Prospek dari Instagram DM' },
      { id: 'ACT-002', timestamp: '2026-08-22 14:30', user: 'Daniel', action: 'Brief diterima', details: 'Brief company profile via WhatsApp' },
    ],
    createdAt: '2026-08-20',
    updatedAt: '2026-08-25',
  },
  {
    id: 'DEAL-2026-0002',
    namaKlien: 'StartupHub Indonesia',
    tipe: 'Paid Inbound',
    estimasiValue: 18000000,
    pic: 'Ignas',
    deadline: '2026-09-20',
    nextAction: 'Follow up approval',
    stage: 'Approval Internal',
    catatan: 'Menunggu persetujuan budget dari direktur',
    activities: [
      { id: 'ACT-003', timestamp: '2026-08-18 10:00', user: 'Ignas', action: 'Deal dibuat', details: 'Inbound dari website contact form' },
      { id: 'ACT-004', timestamp: '2026-08-21 11:00', user: 'Daniel', action: 'Internal review', details: 'Diajukan ke tim untuk approval' },
    ],
    createdAt: '2026-08-18',
    updatedAt: '2026-08-24',
  },
  {
    id: 'DEAL-2026-0003',
    namaKlien: 'Kampus Tech Community',
    tipe: 'Kerjasama-Engagement',
    estimasiValue: 0,
    pic: 'Daniel',
    deadline: '2026-09-30',
    nextAction: 'Siapkan materi presentasi',
    stage: 'Development',
    catatan: 'Barter exposure seminar nasional',
    activities: [
      { id: 'ACT-005', timestamp: '2026-08-15 08:00', user: 'Daniel', action: 'Deal dibuat', details: 'Kolaborasi seminar kampus' },
      { id: 'ACT-006', timestamp: '2026-08-19 13:00', user: 'Daniel', action: 'Approved', details: 'Disetujui tim internal' },
      { id: 'ACT-007', timestamp: '2026-08-23 10:00', user: 'Ignas', action: 'Mulai development', details: 'Pengerjaan materi presentasi' },
    ],
    createdAt: '2026-08-15',
    updatedAt: '2026-08-26',
  },
  {
    id: 'DEAL-2026-0004',
    namaKlien: 'UMKM Bakery Kita',
    tipe: 'Paid Outbound',
    estimasiValue: 12000000,
    pic: 'Daniel',
    deadline: '2026-08-31',
    nextAction: 'Review desain final',
    stage: 'Review',
    catatan: 'Batch konten Instagram bulanan',
    activities: [
      { id: 'ACT-008', timestamp: '2026-08-01 09:00', user: 'Daniel', action: 'Deal dibuat', details: 'Paket konten bulanan' },
      { id: 'ACT-009', timestamp: '2026-08-05 14:00', user: 'Daniel', action: 'Development', details: 'Mulai produksi konten' },
      { id: 'ACT-010', timestamp: '2026-08-26 16:00', user: 'Ignas', action: 'Review', details: 'Desain masuk tahap review' },
    ],
    createdAt: '2026-08-01',
    updatedAt: '2026-08-26',
  },
  {
    id: 'DEAL-2026-0005',
    namaKlien: 'PT Berkah Sejahtera',
    tipe: 'Paid Inbound',
    estimasiValue: 25000000,
    pic: 'Ignas',
    deadline: '2026-08-28',
    nextAction: 'Deploy landing page',
    stage: 'Deploy',
    catatan: 'Landing page produk baru',
    invoice: {
      nominal: 25000000,
      status: 'Ditagih',
      jatuhTempo: '2026-09-05',
    },
    maintenance: {
      active: true,
      catatanRequest: 'Update konten bulanan',
    },
    testimonial: {
      status: 'Diminta',
      linkOrText: '',
    },
    briefFile: 'https://drive.google.com/drive/folders/berkah-landing',
    activities: [
      { id: 'ACT-011', timestamp: '2026-08-10 09:00', user: 'Ignas', action: 'Deal dibuat', details: 'Inbound dari referral' },
      { id: 'ACT-012', timestamp: '2026-08-14 11:00', user: 'Ignas', action: 'Approved', details: 'Budget disetujui' },
      { id: 'ACT-013', timestamp: '2026-08-18 15:00', user: 'Ignas', action: 'Development', details: 'Mulai development' },
      { id: 'ACT-014', timestamp: '2026-08-24 10:00', user: 'Daniel', action: 'Review', details: 'Review internal selesai' },
      { id: 'ACT-015', timestamp: '2026-08-26 14:00', user: 'Ignas', action: 'Deploy', details: 'Siap deploy' },
    ],
    createdAt: '2026-08-10',
    updatedAt: '2026-08-26',
  },
  {
    id: 'DEAL-2026-0006',
    namaKlien: 'Klinik Sehat Prima',
    tipe: 'Paid Outbound',
    estimasiValue: 45000000,
    pic: 'Daniel',
    deadline: '2026-10-01',
    nextAction: 'Presentasi final pricing',
    stage: 'Approval Internal',
    catatan: 'Website development + SEO',
    activities: [
      { id: 'ACT-016', timestamp: '2026-08-12 10:00', user: 'Daniel', action: 'Deal dibuat', details: 'Referral dari PT Berkah' },
      { id: 'ACT-017', timestamp: '2026-08-16 09:00', user: 'Daniel', action: 'Brief masuk', details: 'Brief detail diterima' },
      { id: 'ACT-018', timestamp: '2026-08-22 14:00', user: 'Daniel', action: 'Internal review', details: 'Diajukan untuk approval' },
    ],
    createdAt: '2026-08-12',
    updatedAt: '2026-08-22',
  },
  {
    id: 'DEAL-2026-0007',
    namaKlien: 'Personal Brand Kevin',
    tipe: 'Paid Inbound',
    estimasiValue: 9000000,
    pic: 'Ignas',
    deadline: '2026-09-10',
    nextAction: 'Mulai produksi video',
    stage: 'Prospecting',
    catatan: 'YouTube editing series 8 video/bulan',
    activities: [
      { id: 'ACT-019', timestamp: '2026-08-22 11:00', user: 'Ignas', action: 'Deal dibuat', details: 'Inbound dari Instagram' },
    ],
    createdAt: '2026-08-22',
    updatedAt: '2026-08-22',
  },
  {
    id: 'DEAL-2026-0008',
    namaKlien: 'PT Global Teknologi',
    tipe: 'Kerjasama-Engagement',
    estimasiValue: 0,
    pic: 'Daniel',
    deadline: '2026-09-25',
    nextAction: 'Follow up pertemuan',
    stage: 'Prospecting',
    catatan: 'Potensi kolaborasi event tech',
    activities: [
      { id: 'ACT-020', timestamp: '2026-08-25 09:00', user: 'Daniel', action: 'Deal dibuat', details: 'Pertemuan di tech event' },
    ],
    createdAt: '2026-08-25',
    updatedAt: '2026-08-25',
  },
];

export function useDeals() {
  const [state, setState] = useState<UseApiState<Deal[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      setState({ data: MOCK_DEALS, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  const moveDeal = (dealId: string, newStage: Deal['stage']) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((d) =>
            d.id === dealId
              ? { ...d, stage: newStage, updatedAt: new Date().toISOString().slice(0, 10) }
              : d
          )
        : prev.data,
    }));
  };

  const updateDeal = (dealId: string, updates: Partial<Deal>) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((d) =>
            d.id === dealId
              ? { ...d, ...updates, updatedAt: new Date().toISOString().slice(0, 10) }
              : d
          )
        : prev.data,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData, moveDeal, updateDeal };
}
