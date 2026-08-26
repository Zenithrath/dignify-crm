import { useState, useEffect } from 'react';
import type { Lead, Client, Project, Task, Payment, DashboardData, Work, ContentItem, Rotation } from '../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useLeads() {
  const [state, setState] = useState<UseApiState<Lead[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      // In development, use mock data
      const mockData: Lead[] = [
        {
          id: 'LEAD-2026-0001',
          businessName: 'PT Maju Jaya',
          contactPerson: 'Budi Santoso',
          whatsapp: '628123456789',
          email: 'budi@majujaya.com',
          instagramWebsite: 'majujaya.com',
          category: 'Company',
          leadSource: 'Instagram',
          interestedService: 'Website Development',
          pic: 'Daniel',
          estimatedValue: 75000000,
          priority: 'High',
          pipelineStage: 'Proposal',
          lastContact: '2026-08-25',
          nextFollowUp: '2026-08-26',
          nextAction: 'Send proposal document',
          notes: 'Interested in corporate website',
          createdAt: '2026-08-20',
          updatedAt: '2026-08-25',
        },
        {
          id: 'LEAD-2026-0002',
          businessName: 'StartupHub Indonesia',
          contactPerson: 'Arlene McCoy',
          whatsapp: '628123456790',
          email: 'arlene@startuphub.id',
          instagramWebsite: '@startuphub.id',
          category: 'Startup',
          leadSource: 'Event',
          interestedService: 'Mobile App Design',
          pic: 'Daniel',
          estimatedValue: 120000000,
          priority: 'High',
          pipelineStage: 'Qualified',
          lastContact: '2026-08-26',
          nextFollowUp: '2026-08-27',
          nextAction: 'Discovery call',
          notes: 'Met at Tech Summit Jakarta',
          createdAt: '2026-08-11',
          updatedAt: '2026-08-26',
        },
        {
          id: 'LEAD-2026-0003',
          businessName: 'UMKM Bakery Kita',
          contactPerson: 'Sari Dewi',
          whatsapp: '628123456791',
          email: 'sari@bakerykita.com',
          instagramWebsite: '@bakerykita',
          category: 'UMKM Small',
          leadSource: 'WhatsApp',
          interestedService: 'Instagram Design',
          pic: 'Ignas',
          estimatedValue: 15000000,
          priority: 'Medium',
          pipelineStage: 'Won',
          lastContact: '2026-08-24',
          nextFollowUp: '2026-09-01',
          nextAction: 'Kickoff project',
          notes: 'DP already received',
          createdAt: '2026-07-28',
          updatedAt: '2026-08-24',
        },
        {
          id: 'LEAD-2026-0004',
          businessName: 'Klinik Sehat Prima',
          contactPerson: 'Devon Lane',
          whatsapp: '628123456792',
          email: 'devon@kliniksehat.id',
          instagramWebsite: 'kliniksehat.id',
          category: 'UMKM Medium',
          leadSource: 'Referral',
          interestedService: 'Website Development',
          pic: 'Daniel',
          estimatedValue: 45000000,
          priority: 'High',
          pipelineStage: 'Negotiation',
          lastContact: '2026-08-23',
          nextFollowUp: '2026-08-27',
          nextAction: 'Final pricing discussion',
          notes: 'Referred by PT Berkah Sejahtera',
          createdAt: '2026-07-30',
          updatedAt: '2026-08-23',
        },
        {
          id: 'LEAD-2026-0005',
          businessName: 'Kampus Tech Community',
          contactPerson: 'Rizky Pratama',
          whatsapp: '628123456793',
          email: 'rizky@kampustech.org',
          instagramWebsite: '@kampustech',
          category: 'Education',
          leadSource: 'Campus',
          interestedService: 'Landing Page',
          pic: 'Ignas',
          estimatedValue: 10000000,
          priority: 'Low',
          pipelineStage: 'Contacted',
          lastContact: '2026-08-18',
          nextFollowUp: '2026-08-29',
          nextAction: 'Send service catalog',
          notes: 'Seminar audience',
          createdAt: '2026-08-05',
          updatedAt: '2026-08-18',
        },
        {
          id: 'LEAD-2026-0006',
          businessName: 'Personal Brand Kevin',
          contactPerson: 'Kevin Anggara',
          whatsapp: '628123456794',
          email: 'kevin@creator.id',
          instagramWebsite: '@kevinanggara',
          category: 'Personal Brand',
          leadSource: 'Instagram',
          interestedService: 'Content Package',
          pic: 'Daniel',
          estimatedValue: 25000000,
          priority: 'Medium',
          pipelineStage: 'Lost',
          lastContact: '2026-08-10',
          nextFollowUp: '',
          nextAction: '',
          notes: 'Chose competitor offer',
          createdAt: '2026-06-15',
          updatedAt: '2026-08-10',
        },
      ];
      setState({ data: mockData, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
}

export function useClients() {
  const [state, setState] = useState<UseApiState<Client[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const mockData: Client[] = [
        {
          id: 'CLI-2026-0001',
          businessName: 'PT Berkah Sejahtera',
          contactPerson: 'Rudi Hartono',
          whatsapp: '6281111222333',
          email: 'rudi@berkah.co.id',
          industry: 'Manufacturing',
          pic: 'Daniel',
          clientSince: '2026-07-15',
          totalProjectValue: 85000000,
          notes: 'Long-term client',
        },
      ];
      setState({ data: mockData, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
}

export function useProjects() {
  const [state, setState] = useState<UseApiState<Project[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const mockData: Project[] = [
        {
          id: 'PRJ-2026-0001',
          projectName: 'PT Berkah - Company Profile',
          clientId: 'CLI-2026-0001',
          service: 'Website Development',
          pic: 'Daniel',
          teamMembers: ['Daniel', 'Ignas'],
          startDate: '2026-07-20',
          deadline: '2026-09-15',
          stage: 'Development',
          status: 'On Track',
          progress: 65,
          projectValue: 85000000,
          driveLink: 'https://drive.google.com/folder/berkah',
          notes: 'Corporate website',
        },
      ];
      setState({ data: mockData, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
}

export function useTasks() {
  const [state, setState] = useState<UseApiState<Task[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const mockData: Task[] = [
        {
          id: 'TASK-2026-0001',
          title: 'Design homepage wireframe',
          description: 'Create wireframe for PT Berkah homepage',
          projectId: 'PRJ-2026-0001',
          assignedTo: 'Ignas',
          priority: 'High',
          status: 'In Progress',
          dueDate: '2026-08-28',
          createdAt: '2026-08-20',
        },
      ];
      setState({ data: mockData, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
}

export function usePayments() {
  const [state, setState] = useState<UseApiState<Payment[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const mockData: Payment[] = [
        {
          id: 'PAY-2026-0001',
          projectId: 'PRJ-2026-0001',
          clientId: 'CLI-2026-0001',
          type: 'DP',
          amount: 25000000,
          dueDate: '2026-07-25',
          paidDate: '2026-07-24',
          status: 'Paid',
          paymentMethod: 'Bank Transfer',
          notes: 'DP received via BCA',
        },
      ];
      setState({ data: mockData, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
}

export function useDashboard() {
  const [state, setState] = useState<UseApiState<DashboardData>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const mockData: DashboardData = {
        totalLeads: 24,
        qualifiedLeads: 12,
        dealsWon: 8,
        conversionRate: 33,
        pipelineValue: 450000000,
        activeProjects: 3,
        revenueReceived: 180000000,
        outstandingPayment: 75000000,
        followUpsToday: 5,
        overdueFollowUps: 2,
        pipelineByStage: {
          Prospect: 8,
          Contacted: 6,
          Responded: 4,
          Qualified: 3,
          Meeting: 2,
          Proposal: 2,
          Negotiation: 1,
          Won: 1,
          Lost: 1,
        },
        monthlyRevenue: [
          { month: 'Jan', revenue: 50000000 },
          { month: 'Feb', revenue: 45000000 },
          { month: 'Mar', revenue: 80000000 },
          { month: 'Apr', revenue: 55000000 },
          { month: 'May', revenue: 90000000 },
          { month: 'Jun', revenue: 70000000 },
          { month: 'Jul', revenue: 85000000 },
          { month: 'Aug', revenue: 180000000 },
        ],
        leadBySource: {
          Instagram: 10,
          WhatsApp: 6,
          Referral: 4,
          Website: 2,
          LinkedIn: 1,
          Campus: 1,
          'Cold Outreach': 0,
          Event: 0,
          Other: 0,
        },
        upcomingActions: [
          { type: 'Follow-up', title: 'PT Maju Jaya - Proposal review', date: 'Today', leadId: 'LEAD-2026-0001' },
          { type: 'Meeting', title: 'StartupHub - Discovery call', date: 'Today', leadId: 'LEAD-2026-0002' },
          { type: 'Deadline', title: 'UMKM Bakery - Website delivery', date: 'Tomorrow', projectId: 'PRJ-2026-0001' },
        ],
      };
      setState({ data: mockData, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
}

export function useWorks() {
  const [state, setState] = useState<UseApiState<Work[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const mockData: Work[] = [
        {
          id: 'WORK-2026-0001',
          name: 'PT Maju Jaya - Company Profile Video',
          type: 'Paid Outbound',
          partner: 'PT Maju Jaya',
          pic: 'Daniel',
          teamMembers: ['Daniel', 'Ignas'],
          value: 35000000,
          benefit: 'Company profile untuk website dan investor',
          startDate: '2026-08-10',
          deadline: '2026-09-04',
          stage: 'Development',
          driveLink: 'https://drive.google.com/drive/folders/majujaya-profile',
          notes: 'Revisi naskah round 2 dari klien',
          createdAt: '2026-08-08',
          updatedAt: '2026-08-25',
        },
        {
          id: 'WORK-2026-0002',
          name: 'PT Berkah Sejahtera - Katalog Produk Digital',
          type: 'Paid Inbound',
          partner: 'PT Berkah Sejahtera',
          pic: 'Ignas',
          teamMembers: ['Ignas', 'Daniel'],
          value: 18000000,
          benefit: 'Katalog produk digital untuk tim sales',
          startDate: '2026-08-17',
          deadline: '2026-09-11',
          stage: 'Development',
          driveLink: 'https://drive.google.com/drive/folders/berkah-katalog',
          notes: 'Menunggu approval desain final',
          createdAt: '2026-08-14',
          updatedAt: '2026-08-24',
        },
        {
          id: 'WORK-2026-0003',
          name: 'Kampus Tech Community - Seminar Konten Collab',
          type: 'Collab',
          partner: 'Kampus Tech Community',
          pic: 'Daniel',
          teamMembers: ['Daniel', 'Ignas'],
          value: 0,
          benefit: 'Exposure ke audiens kampus dan lead generation',
          startDate: '2026-08-20',
          deadline: '2026-09-18',
          stage: 'Production',
          driveLink: 'https://drive.google.com/drive/folders/kampustech-collab',
          notes: 'Barter konten seminar nasional',
          createdAt: '2026-08-15',
          updatedAt: '2026-08-26',
        },
        {
          id: 'WORK-2026-0004',
          name: 'UMKM Bakery Kita - Instagram Content Pack',
          type: 'Paid Outbound',
          partner: 'UMKM Bakery Kita',
          pic: 'Daniel',
          teamMembers: ['Daniel'],
          value: 12000000,
          benefit: '12 konten Instagram per bulan',
          startDate: '2026-08-03',
          deadline: '2026-08-31',
          stage: 'Deal',
          driveLink: 'https://drive.google.com/drive/folders/bakerykita-content',
          notes: 'Batch akhir bulan tinggal 2 desain',
          createdAt: '2026-07-30',
          updatedAt: '2026-08-26',
        },
        {
          id: 'WORK-2026-0005',
          name: 'Personal Brand Kevin - YouTube Editing Series',
          type: 'Paid Inbound',
          partner: 'Kevin Anggara',
          pic: 'Ignas',
          teamMembers: ['Ignas'],
          value: 9000000,
          benefit: 'Editing 8 video YouTube per bulan',
          startDate: '2026-08-24',
          deadline: '2026-09-30',
          stage: 'Request',
          driveLink: 'https://drive.google.com/drive/folders/kevin-youtube',
          notes: 'Kickoff brief sudah dijadwalkan',
          createdAt: '2026-08-22',
          updatedAt: '2026-08-24',
        },
      ];
      setState({ data: mockData, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
}

export function useContentItems() {
  const [state, setState] = useState<UseApiState<ContentItem[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const mockData: ContentItem[] = [
        {
          id: 'CONTENT-2026-0001',
          title: 'Tips UMKM: Branding Murah yang Terasa Mahal',
          platform: 'Instagram',
          designPic: 'Daniel',
          editorPic: 'Ignas',
          copywriter: 'Ignas',
          status: 'Published',
          publishDate: '2026-08-25',
          isLive: true,
          notes: 'Carousel 5 slide, engagement bagus',
        },
        {
          id: 'CONTENT-2026-0002',
          title: 'Behind the Scenes Agency Agustus',
          platform: 'TikTok',
          designPic: 'Daniel',
          editorPic: 'Ignas',
          copywriter: 'Ignas',
          status: 'Scheduled',
          publishDate: '2026-08-28',
          isLive: false,
          notes: 'Format video pendek 45 detik',
        },
        {
          id: 'CONTENT-2026-0003',
          title: 'Testimoni Klien: Klinik Sehat Prima',
          platform: 'Instagram',
          designPic: 'Daniel',
          editorPic: 'Ignas',
          copywriter: 'Daniel',
          status: 'Review',
          publishDate: '2026-09-01',
          isLive: false,
          notes: 'Menunggu review copy final',
        },
        {
          id: 'CONTENT-2026-0004',
          title: 'Tutorial Editing CapCut untuk Pemula',
          platform: 'YouTube',
          designPic: 'Ignas',
          editorPic: 'Ignas',
          copywriter: 'Ignas',
          status: 'Designing',
          publishDate: '2026-09-05',
          isLive: false,
          notes: 'Thumbnail belum final',
        },
        {
          id: 'CONTENT-2026-0005',
          title: 'Pengumuman Layanan Baru: Company Profile Video',
          platform: 'LinkedIn',
          designPic: 'Daniel',
          editorPic: 'Ignas',
          copywriter: 'Daniel',
          status: 'Draft',
          publishDate: '2026-09-10',
          isLive: false,
          notes: 'Target audiens HRD dan founder',
        },
        {
          id: 'CONTENT-2026-0006',
          title: 'Reels Produk Unggulan UMKM Bakery Kita',
          platform: 'Instagram',
          designPic: 'Daniel',
          editorPic: 'Ignas',
          copywriter: 'Ignas',
          status: 'Scheduled',
          publishDate: '2026-08-27',
          isLive: false,
          notes: 'Jadwal prime time jam 19.00',
        },
      ];
      setState({ data: mockData, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
}

export function useRotation() {
  const [state, setState] = useState<UseApiState<Rotation>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const mockData: Rotation = {
        designPic: 'Daniel',
        designQuarter: 'Q3 2026',
        editorPic: 'Ignas',
        editorWeekStart: '2026-08-24',
        weeklyTarget: 1,
      };
      setState({ data: mockData, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
}
