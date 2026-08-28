import { useState, useEffect } from 'react';
import type { CalendarEvent } from '../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'EVT-001', title: 'Deadline Company Profile Video', type: 'Deadline Project', date: '2026-09-15', time: '23:59', description: 'Final delivery ke PT Maju Jaya', relatedProject: 'Company Profile Video' },
  { id: 'EVT-002', title: 'Post Carousel Tips WFH', type: 'Jadwal Posting', date: '2026-08-30', time: '09:00', description: 'Instagram carousel, caption sudah ACC' },
  { id: 'EVT-003', title: 'Briefing Konten September', type: 'Briefing', date: '2026-08-29', time: '10:00', description: 'Meeting规划 konten bulan depan' },
  { id: 'EVT-004', title: 'Update Progress ke PT Berkah', type: 'Update Klien', date: '2026-08-28', time: '14:00', description: 'Share progress katalog produk digital' },
  { id: 'EVT-005', title: 'Deadline Katalog Produk', type: 'Deadline Project', date: '2026-09-11', time: '23:59', description: 'Final delivery katalog digital', relatedProject: 'Katalog Produk Digital' },
  { id: 'EVT-006', title: 'Post Reels Behind the Scene', type: 'Jadwal Posting', date: '2026-08-30', time: '19:00', description: 'Instagram Reels BTS office' },
  { id: 'EVT-007', title: 'Sprint Review Dev', type: 'Briefing', date: '2026-09-01', time: '09:00', description: 'Review sprint bulanan' },
  { id: 'EVT-008', title: 'Update PT Digital Nusantara', type: 'Update Klien', date: '2026-09-02', time: '11:00', description: 'Follow-up invoice dan feedback' },
  { id: 'EVT-009', title: 'Post Video Tutorial n8n', type: 'Jadwal Posting', date: '2026-09-05', time: '10:00', description: 'YouTube tutorial workflow automation' },
  { id: 'EVT-010', title: 'Deadline Giveaway Kejar Target', type: 'Deadline Project', date: '2026-09-01', time: '00:00', description: 'Post giveaway harus live' },
];

let nextId = 100;

export function useCalendar() {
  const [state, setState] = useState<UseApiState<CalendarEvent[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      setState({ data: MOCK_EVENTS, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = { ...event, id: `EVT-${++nextId}` };
    setState((prev) => ({
      ...prev,
      data: prev.data ? [...prev.data, newEvent] : [newEvent],
    }));
  };

  const updateEvent = (eventId: string, updates: Partial<CalendarEvent>) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((e) => (e.id === eventId ? { ...e, ...updates } : e))
        : prev.data,
    }));
  };

  const deleteEvent = (eventId: string) => {
    setState((prev) => ({
      ...prev,
      data: prev.data ? prev.data.filter((e) => e.id !== eventId) : prev.data,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, addEvent, updateEvent, deleteEvent };
}
