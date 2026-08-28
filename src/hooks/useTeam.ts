import { useState, useEffect } from 'react';
import type { TeamMember } from '../types';
import { TEAM_MEMBERS } from '../types';

interface WorkloadItem {
  module: string;
  title: string;
  status: string;
  deadline?: string;
}

interface TeamMemberWorkload extends TeamMember {
  projects: WorkloadItem[];
  tasks: WorkloadItem[];
  contents: WorkloadItem[];
}

const MOCK_WORKLOAD: Record<string, TeamMemberWorkload> = {
  Rina: {
    ...TEAM_MEMBERS[0],
    projects: [],
    tasks: [],
    contents: [
      { module: 'Content', title: 'Tips Produktivitas WFH', status: 'Published', deadline: '2026-08-25' },
      { module: 'Content', title: 'Behind the Scene Office', status: 'Terjadwal', deadline: '2026-08-30' },
      { module: 'Content', title: 'Quote Harian Motivasi', status: 'Draft copy' },
      { module: 'Content', title: 'Review Produk Terbaru', status: 'Menunggu ACC Ignas' },
      { module: 'Content', title: 'Giveaway Kejar Target', status: 'Terjadwal', deadline: '2026-09-01' },
    ],
  },
  Daniel: {
    ...TEAM_MEMBERS[1],
    projects: [
      { module: 'Development', title: 'Company Profile Video', status: 'Progress', deadline: '2026-09-15' },
      { module: 'Development', title: 'Katalog Produk Digital', status: 'Progress', deadline: '2026-09-11' },
    ],
    tasks: [
      { module: 'Dev - Web Dev', title: 'Setup hosting & domain', status: 'Selesai' },
      { module: 'Dev - Web Dev', title: 'Responsive layout', status: 'Progress' },
      { module: 'Dev - SEO', title: 'Audit SEO existing', status: 'Selesai' },
      { module: 'Dev - SEO', title: 'Keyword mapping', status: 'Progress' },
    ],
    contents: [
      { module: 'Content', title: 'Infografis Data Q3', status: 'Ide' },
      { module: 'Content', title: 'Hot Take: AI di Industri', status: 'Draft copy' },
    ],
  },
  Ignas: {
    ...TEAM_MEMBERS[2],
    projects: [
      { module: 'Development', title: 'Company Profile Video', status: 'Review', deadline: '2026-09-15' },
    ],
    tasks: [
      { module: 'Dev - UI/UX', title: 'Wireframe homepage', status: 'Selesai' },
      { module: 'Dev - UI/UX', title: 'Revisi dari klien', status: 'Review' },
      { module: 'Dev - n8n', title: 'Webhook form kontak', status: 'Selesai' },
      { module: 'Dev - n8n', title: 'Email notifikasi', status: 'Progress' },
      { module: 'Dev - n8n', title: 'Google Sheets sync', status: 'Progress' },
    ],
    contents: [
      { module: 'Content', title: 'Tutorial Figma Dasar', status: 'Desain' },
      { module: 'Content', title: 'Tutorial n8n Workflow', status: 'Ide' },
    ],
  },
};

export function useTeam() {
  const [members, setMembers] = useState<TeamMemberWorkload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMembers(Object.values(MOCK_WORKLOAD));
    setLoading(false);
  }, []);

  return { members, loading };
}
