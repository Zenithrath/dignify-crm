import { useState, useEffect } from 'react';
import type { ContentItem, ContentKanbanStage, PlatformPerformance } from '../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const MOCK_CONTENTS: ContentItem[] = [
  {
    id: 'CNT-001',
    title: 'Tips Produktivitas WFH',
    platform: 'Instagram',
    tipe: 'Carousel',
    captionWriter: 'Rina',
    designer: 'Ignas',
    stage: 'Published',
    publishDate: '2026-08-25',
    caption: '5 tips produktivitas saat WFH yang wajib kamu coba!',
    comments: [],
    createdAt: '2026-08-18',
    updatedAt: '2026-08-25',
  },
  {
    id: 'CNT-002',
    title: 'Behind the Scene Office',
    platform: 'Instagram',
    tipe: 'Reels',
    captionWriter: 'Rina',
    designer: 'Ignas',
    stage: 'Terjadwal',
    publishDate: '2026-08-30',
    caption: 'Yuk intip kegiatan kantor kami sehari-hari!',
    comments: [
      { id: 'C1', user: 'Daniel', text: 'Tambahin subtitle ya', timestamp: '2026-08-27' },
    ],
    createdAt: '2026-08-20',
    updatedAt: '2026-08-27',
  },
  {
    id: 'CNT-003',
    title: 'Tutorial Figma Dasar',
    platform: 'YouTube',
    tipe: 'Video',
    captionWriter: 'Ignas',
    designer: 'Ignas',
    stage: 'Desain',
    publishDate: '',
    caption: 'Belajar Figma dari nol untuk pemula',
    comments: [],
    createdAt: '2026-08-22',
    updatedAt: '2026-08-26',
  },
  {
    id: 'CNT-004',
    title: 'Quote Harian Motivasi',
    platform: 'Instagram',
    tipe: 'Feed',
    captionWriter: 'Rina',
    designer: 'Daniel',
    stage: 'Draft copy',
    publishDate: '',
    caption: 'Kesuksesan dimulai dari langkah kecil',
    comments: [],
    createdAt: '2026-08-26',
    updatedAt: '2026-08-26',
  },
  {
    id: 'CNT-005',
    title: 'Review Produk Terbaru',
    platform: 'TikTok',
    tipe: 'Reels',
    captionWriter: 'Rina',
    designer: 'Ignas',
    stage: 'Menunggu ACC Ignas',
    publishDate: '',
    caption: 'Review jujur produk terbaru yang lagi viral',
    comments: [],
    createdAt: '2026-08-25',
    updatedAt: '2026-08-27',
  },
  {
    id: 'CNT-006',
    title: 'Company Culture Video',
    platform: 'LinkedIn',
    tipe: 'Video',
    captionWriter: 'Daniel',
    designer: 'Ignas',
    stage: 'Review',
    publishDate: '',
    caption: 'Kenapa kami mencintai pekerjaan kami',
    comments: [
      { id: 'C2', user: 'Ignas', text: 'Perlu tambahin bagian team bonding', timestamp: '2026-08-28' },
      { id: 'C3', user: 'Rina', text: 'Setuju, bagus untuk employer branding', timestamp: '2026-08-28' },
    ],
    createdAt: '2026-08-20',
    updatedAt: '2026-08-28',
  },
  {
    id: 'CNT-007',
    title: 'Infografis Data Q3',
    platform: 'Instagram',
    tipe: 'Carousel',
    captionWriter: 'Daniel',
    designer: 'Ignas',
    stage: 'Ide',
    publishDate: '',
    caption: 'Ringkasan pencapaian Q3 dalam infografis menarik',
    comments: [],
    createdAt: '2026-08-27',
    updatedAt: '2026-08-27',
  },
  {
    id: 'CNT-008',
    title: 'Hot Take: AI di Industri',
    platform: 'LinkedIn',
    tipe: 'Article',
    captionWriter: 'Daniel',
    designer: '-',
    stage: 'Draft copy',
    publishDate: '',
    caption: 'Panduan kami tentang bagaimana AI mengubah cara kerja',
    comments: [],
    createdAt: '2026-08-26',
    updatedAt: '2026-08-26',
  },
  {
    id: 'CNT-009',
    title: 'Giveaway Kejar Target',
    platform: 'Instagram',
    tipe: 'Reels',
    captionWriter: 'Rina',
    designer: 'Ignas',
    stage: 'Terjadwal',
    publishDate: '2026-09-01',
    caption: 'Giveaway spesial! Follow + share untuk menang',
    comments: [],
    createdAt: '2026-08-23',
    updatedAt: '2026-08-28',
  },
  {
    id: 'CNT-010',
    title: 'Tutorial n8n Workflow',
    platform: 'YouTube',
    tipe: 'Video',
    captionWriter: 'Ignas',
    designer: 'Ignas',
    stage: 'Ide',
    publishDate: '',
    caption: 'Cara otomatisasi workflow dengan n8n',
    comments: [],
    createdAt: '2026-08-28',
    updatedAt: '2026-08-28',
  },
];

const MOCK_PERFORMANCE: PlatformPerformance[] = [
  { platform: 'Instagram', followers: 12400, engagement: 4.2, postsPerWeek: 5, postsPending: 3, growth: 2.1 },
  { platform: 'TikTok', followers: 8700, engagement: 6.8, postsPerWeek: 3, postsPending: 1, growth: 5.4 },
  { platform: 'LinkedIn', followers: 3200, engagement: 3.1, postsPerWeek: 2, postsPending: 2, growth: 1.8 },
  { platform: 'YouTube', followers: 2100, engagement: 5.5, postsPerWeek: 1, postsPending: 1, growth: 3.2 },
];

let nextId = 200;

export function useContent() {
  const [state, setState] = useState<UseApiState<ContentItem[]>>({
    data: null,
    loading: true,
    error: null,
  });
  const [performance] = useState<PlatformPerformance[]>(MOCK_PERFORMANCE);

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      setState({ data: MOCK_CONTENTS, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  const moveContent = (contentId: string, newStage: ContentKanbanStage) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((c) => (c.id === contentId ? { ...c, stage: newStage, updatedAt: new Date().toISOString().slice(0, 10) } : c))
        : prev.data,
    }));
  };

  const addContent = (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const now = new Date().toISOString().slice(0, 10);
    const newItem: ContentItem = {
      ...item,
      id: `CNT-${++nextId}`,
      comments: [],
      createdAt: now,
      updatedAt: now,
    };
    setState((prev) => ({
      ...prev,
      data: prev.data ? [...prev.data, newItem] : [newItem],
    }));
  };

  const updateContent = (contentId: string, updates: Partial<ContentItem>) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((c) => (c.id === contentId ? { ...c, ...updates, updatedAt: new Date().toISOString().slice(0, 10) } : c))
        : prev.data,
    }));
  };

  const deleteContent = (contentId: string) => {
    setState((prev) => ({
      ...prev,
      data: prev.data ? prev.data.filter((c) => c.id !== contentId) : prev.data,
    }));
  };

  const addComment = (contentId: string, user: string, text: string) => {
    const now = new Date().toISOString().slice(0, 10);
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((c) =>
            c.id === contentId
              ? { ...c, comments: [...(c.comments || []), { id: `C${++nextId}`, user, text, timestamp: now }], updatedAt: now }
              : c
          )
        : prev.data,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, performance, moveContent, addContent, updateContent, deleteContent, addComment };
}
