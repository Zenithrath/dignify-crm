import { useState, useEffect } from 'react';
import type { DevProject, DevStatus, DevSwimlane } from '../types';
import { DEV_ROLES } from '../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const MOCK_PROJECTS: DevProject[] = [
  {
    id: 'DEV-2026-0001',
    namaProject: 'Company Profile Video',
    namaKlien: 'PT Maju Jaya',
    deadline: '2026-09-15',
    createdAt: '2026-08-10',
    updatedAt: '2026-08-27',
    swimlanes: [
      {
        role: 'Web Dev',
        status: 'Progress',
        pic: 'Daniel',
        progress: 40,
        tasks: [
          { id: 'T1', title: 'Setup hosting & domain', done: true },
          { id: 'T2', title: 'Integrasi video player', done: true },
          { id: 'T3', title: 'Responsive layout', done: false },
          { id: 'T4', title: 'SEO meta tags', done: false },
        ],
        catatanTerakhir: 'Hosting sudah aktif, tinggal deploy',
      },
      {
        role: 'UI/UX',
        status: 'Review',
        pic: 'Ignas',
        progress: 85,
        tasks: [
          { id: 'T5', title: 'Wireframe homepage', done: true },
          { id: 'T6', title: 'Design mockup', done: true },
          { id: 'T7', title: 'Prototyping', done: true },
          { id: 'T8', title: 'Revisi dari klien', done: false },
        ],
        catatanTerakhir: 'Menunggu feedback revisi dari klien',
      },
      {
        role: 'n8n Automation',
        status: 'Belum mulai',
        pic: '-',
        progress: 0,
        tasks: [
          { id: 'T9', title: 'Setup webhook', done: false },
          { id: 'T10', title: 'Notifikasi WhatsApp', done: false },
        ],
        catatanTerakhir: '',
      },
      {
        role: 'SEO',
        status: 'Belum mulai',
        pic: '-',
        progress: 0,
        tasks: [
          { id: 'T11', title: 'Keyword research', done: false },
          { id: 'T12', title: 'On-page SEO', done: false },
        ],
        catatanTerakhir: '',
      },
    ],
  },
  {
    id: 'DEV-2026-0002',
    namaProject: 'Katalog Produk Digital',
    namaKlien: 'PT Berkah Sejahtera',
    deadline: '2026-09-11',
    createdAt: '2026-08-17',
    updatedAt: '2026-08-28',
    swimlanes: [
      {
        role: 'Web Dev',
        status: 'Progress',
        pic: 'Daniel',
        progress: 65,
        tasks: [
          { id: 'T13', title: 'Setup Next.js project', done: true },
          { id: 'T14', title: 'Product listing page', done: true },
          { id: 'T15', title: 'Detail produk modal', done: true },
          { id: 'T16', title: 'Search & filter', done: false },
          { id: 'T17', title: 'PDF export', done: false },
        ],
        catatanTerakhir: 'Product listing sudah jalan, next: search & filter',
      },
      {
        role: 'UI/UX',
        status: 'Selesai',
        pic: 'Ignas',
        progress: 100,
        tasks: [
          { id: 'T18', title: 'Design system', done: true },
          { id: 'T19', title: 'All halaman', done: true },
          { id: 'T20', title: 'Dark mode variant', done: true },
        ],
        catatanTerakhir: 'Semua desain sudah final dan di-approve',
      },
      {
        role: 'n8n Automation',
        status: 'Progress',
        pic: 'Ignas',
        progress: 30,
        tasks: [
          { id: 'T21', title: 'Webhook form kontak', done: true },
          { id: 'T22', title: 'Email notifikasi', done: false },
          { id: 'T23', title: 'Google Sheets sync', done: false },
        ],
        catatanTerakhir: 'Webhook sudah nyala, tinggal email notif',
      },
      {
        role: 'SEO',
        status: 'Progress',
        pic: 'Daniel',
        progress: 20,
        tasks: [
          { id: 'T24', title: 'Audit SEO existing', done: true },
          { id: 'T25', title: 'Keyword mapping', done: false },
          { id: 'T26', title: 'Schema markup', done: false },
        ],
        catatanTerakhir: 'Audit selesai, ada 12 issue critical',
      },
    ],
  },
];

let nextId = 100;

function makeSwimlaneDefaults(): DevSwimlane[] {
  return DEV_ROLES.map((role) => ({
    role,
    status: 'Belum mulai' as DevStatus,
    pic: '-',
    progress: 0,
    tasks: [],
    catatanTerakhir: '',
  }));
}

export function useDevelopment() {
  const [state, setState] = useState<UseApiState<DevProject[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      setState({ data: MOCK_PROJECTS, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  const addProject = (namaProject: string, namaKlien: string, deadline: string) => {
    const now = new Date().toISOString().slice(0, 10);
    const newProject: DevProject = {
      id: `DEV-${++nextId}`,
      namaProject,
      namaKlien,
      deadline,
      createdAt: now,
      updatedAt: now,
      swimlanes: makeSwimlaneDefaults(),
    };
    setState((prev) => ({
      ...prev,
      data: prev.data ? [...prev.data, newProject] : [newProject],
    }));
  };

  const updateProject = (projectId: string, updates: Partial<Pick<DevProject, 'namaProject' | 'namaKlien' | 'deadline'>>) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((p) => (p.id === projectId ? { ...p, ...updates, updatedAt: new Date().toISOString().slice(0, 10) } : p))
        : prev.data,
    }));
  };

  const deleteProject = (projectId: string) => {
    setState((prev) => ({
      ...prev,
      data: prev.data ? prev.data.filter((p) => p.id !== projectId) : prev.data,
    }));
  };

  const toggleTask = (projectId: string, swimlaneRole: string, taskId: string) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((p) => {
            if (p.id !== projectId) return p;
            return {
              ...p,
              updatedAt: new Date().toISOString().slice(0, 10),
              swimlanes: p.swimlanes.map((sl) => {
                if (sl.role !== swimlaneRole) return sl;
                const updatedTasks = sl.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t));
                const doneCount = updatedTasks.filter((t) => t.done).length;
                const newProgress = Math.round((doneCount / updatedTasks.length) * 100);
                return { ...sl, tasks: updatedTasks, progress: newProgress };
              }),
            };
          })
        : prev.data,
    }));
  };

  const addTask = (projectId: string, swimlaneRole: string, title: string) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((p) => {
            if (p.id !== projectId) return p;
            return {
              ...p,
              updatedAt: new Date().toISOString().slice(0, 10),
              swimlanes: p.swimlanes.map((sl) => {
                if (sl.role !== swimlaneRole) return sl;
                const newTask = { id: `T${++nextId}`, title, done: false };
                const updatedTasks = [...sl.tasks, newTask];
                const doneCount = updatedTasks.filter((t) => t.done).length;
                const newProgress = Math.round((doneCount / updatedTasks.length) * 100);
                return { ...sl, tasks: updatedTasks, progress: newProgress };
              }),
            };
          })
        : prev.data,
    }));
  };

  const deleteTask = (projectId: string, swimlaneRole: string, taskId: string) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((p) => {
            if (p.id !== projectId) return p;
            return {
              ...p,
              updatedAt: new Date().toISOString().slice(0, 10),
              swimlanes: p.swimlanes.map((sl) => {
                if (sl.role !== swimlaneRole) return sl;
                const updatedTasks = sl.tasks.filter((t) => t.id !== taskId);
                const doneCount = updatedTasks.filter((t) => t.done).length;
                const newProgress = updatedTasks.length > 0 ? Math.round((doneCount / updatedTasks.length) * 100) : 0;
                return { ...sl, tasks: updatedTasks, progress: newProgress };
              }),
            };
          })
        : prev.data,
    }));
  };

  const editTaskTitle = (projectId: string, swimlaneRole: string, taskId: string, newTitle: string) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((p) => {
            if (p.id !== projectId) return p;
            return {
              ...p,
              updatedAt: new Date().toISOString().slice(0, 10),
              swimlanes: p.swimlanes.map((sl) => {
                if (sl.role !== swimlaneRole) return sl;
                return { ...sl, tasks: sl.tasks.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t)) };
              }),
            };
          })
        : prev.data,
    }));
  };

  const updateSwimlane = (projectId: string, swimlaneRole: string, updates: Partial<{ status: DevStatus; pic: string; catatanTerakhir: string }>) => {
    setState((prev) => ({
      ...prev,
      data: prev.data
        ? prev.data.map((p) => {
            if (p.id !== projectId) return p;
            return {
              ...p,
              updatedAt: new Date().toISOString().slice(0, 10),
              swimlanes: p.swimlanes.map((sl) => (sl.role === swimlaneRole ? { ...sl, ...updates } : sl)),
            };
          })
        : prev.data,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    ...state,
    refetch: fetchData,
    addProject,
    updateProject,
    deleteProject,
    toggleTask,
    addTask,
    deleteTask,
    editTaskTitle,
    updateSwimlane,
  };
}
