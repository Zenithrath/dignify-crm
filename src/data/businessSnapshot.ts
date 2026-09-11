// ─── Business Snapshot ─────────────────────────────────────────────────────
// Source of truth diringkas dari 2 Google Sheets patokan:
//
// 1. "Data Pelanggan" (1-5Y1hFzjO-aBtdonlsRUaDYnikqVK9efBXR5Cl-4WXo)
//    - 00_Dashboard: Total Leads 884, Dihubungi 0, Deal 0, Response 0%, Nilai Rp0
//    - 01_Lead_Scraping: ID Lead, Nama Bisnis, Kategori, Kota, Rating, Review,
//      WA, Status Website, Sosmed, Catatan Audit, Website
//    - 02_Outreach_Tracker: ID Lead, Nama Bisnis (VLOOKUP), Kanal, Tgl Dihubungi,
//      Status Outreach, Angle Penawaran, Tgl Follow Up, Catatan
//    - 03_Closing_Clients: ID Lead, Nama Bisnis, Paket, Nilai, Status DP,
//      Deadline, Status Proyek, Status Pelunasan
//
// 2. "Monitoring DIGNIFY" (1AvS1p2FUIhkZDJgKd__U-WKjhUJ3XhgzioPBu53DzTg)
//    - Rate Card: 50 item (Website, UI/UX, AI, N8N, API)
//    - Project Tracker: Nama, Klien, Kategori, PIC, Mulai, Deadline, Progress,
//      Status, Nilai, DP, Pelunasan, Link Drive
//    - Leads & Outreach Tracker, Roadmap 90 Hari, Dashboard Ringkasan, Jobdesk Tim
//
// File ini dipakai DashboardPage sebagai tampilan ringkas "semua info dalam 1 layar".
// Kalau nanti connect API/Sheets live, cukup ganti isi file ini / fetch dari backend.

export interface FunnelStep {
  label: string;
  value: number;
  hint: string;
}

export interface LeadStatusCount {
  label: string;
  value: number;
}

export interface LeadCategoryCount {
  label: string;
  value: number;
}

export interface BusinessProject {
  id: string;
  namaProject: string;
  klien: string;
  kategori: string;
  pic: string;
  tanggalMulai: string;
  deadline: string;
  progress: number;
  status: 'Planning' | 'Pengerjaan' | 'Review' | 'Selesai' | 'Waiting Brief';
  nilaiProject: number;
  dpLunas: boolean;
  pelunasanLunas: boolean;
  driveLink: string;
  paket?: string;
}

export interface OutreachRow {
  idLead: string;
  namaBisnis: string;
  kanal: string;
  tanggalDihubungi: string;
  status: string;
  angle: string;
  tanggalFollowUp: string;
  catatan: string;
  overdue: boolean;
}

export interface ClosingRow {
  idLead: string;
  namaBisnis: string;
  paket: string;
  nilai: number;
  statusDP: string;
  deadline: string;
  statusProyek: string;
  statusPelunasan: string;
}

export interface ContentRolling {
  periode: string;
  bulan: string;
  pj: string;
  target: string;
  fokus: string;
  aktif: boolean;
}

export interface RoadmapItem {
  minggu: string;
  fase: string;
  target: string;
  pic: string;
  status: 'Belum' | 'Jalan' | 'Selesai';
}

export interface RateCardSummary {
  kategori: string;
  jumlahItem: number;
  hargaMin: number;
  hargaMax: number;
  contoh: string;
  color: string;
}

export interface TeamJobdesk {
  nama: string;
  roles: { role: string; tipe: 'Aktif' | 'Pasif'; tugas: string }[];
}

// ─── 00_Dashboard + Dashboard Ringkasan ──────────────────────────────────────
export const businessKPI = {
  totalLeads: 884,
  leadsDihubungi: 1, // L001 sudah dihubungi 04/09/2026
  responseRate: 0,
  jumlahDeal: 1, // L001 closing Arsitek Studio Malang
  dealRate: 100,
  totalNilaiProyek: 2500000,
  belumLunasCount: 1,
  followUpOverdue: 1, // FU 07/09/2026 terlewat (hari ini 10/09/2026)
  projectAktif: 3, // 2 mahasiswa + 1 arsitek
  totalRevenue: 1250000, // DP 50% dari 2.5jt (asumsi)
  conversionRate: 0.11, // 1 deal / 884 leads
  sumber: 'Ringkasan otomatis 01_Lead_Scraping + 02_Outreach + 03_Closing',
};

export const funnel: FunnelStep[] = [
  { label: 'Leads', value: 884, hint: 'dari scraping GMaps' },
  { label: 'Dihubungi', value: 1, hint: 'L001 via WhatsApp' },
  { label: 'Deal', value: 1, hint: 'Arsitek Studio Malang' },
];

export const leadStatus: LeadStatusCount[] = [
  { label: 'Belum Follow Up', value: 883 },
  { label: 'Sudah Kontak', value: 0 },
  { label: 'Nego / Minta Proposal', value: 1 },
  { label: 'Deal', value: 1 },
  { label: 'Ditolak', value: 0 },
];

export const leadKategori: LeadCategoryCount[] = [
  { label: 'Studio Foto (Depok dsk)', value: 880 },
  { label: 'Jasa & Layanan', value: 1 },
  { label: 'Mahasiswa', value: 2 },
  { label: 'UMKM Kecil-Menengah', value: 0 },
  { label: 'UMKM Atas', value: 0 },
  { label: 'Startup/Perusahaan', value: 1 },
];

// ─── Project Tracker (gabungan Project Tracker + 03_Closing) ────────────────
export const businessProjects: BusinessProject[] = [
  {
    id: 'PRJ-001',
    namaProject: 'Company Profile + Portfolio',
    klien: 'Arsitek Studio Malang',
    kategori: 'Jasa & Layanan',
    pic: 'Dije',
    tanggalMulai: '2026-09-05',
    deadline: '2026-09-20',
    progress: 35,
    status: 'Pengerjaan',
    nilaiProject: 2500000,
    dpLunas: true,
    pelunasanLunas: false,
    driveLink: '-',
    paket: 'Company Profile + Portfolio',
  },
  {
    id: 'PRJ-002',
    namaProject: 'Profile HMS ADBIS',
    klien: 'HMS ADBIS',
    kategori: 'Mahasiswa',
    pic: 'Ignas',
    tanggalMulai: 'Waiting Brief',
    deadline: '-',
    progress: 5,
    status: 'Waiting Brief',
    nilaiProject: 0,
    dpLunas: false,
    pelunasanLunas: false,
    driveLink: 'ADBIS - Google Drive',
  },
  {
    id: 'PRJ-003',
    namaProject: 'Profile HMS KEUBANK',
    klien: 'HMPS KEUBANK',
    kategori: 'Mahasiswa',
    pic: 'Dije',
    tanggalMulai: 'Waiting Brief',
    deadline: '-',
    progress: 5,
    status: 'Waiting Brief',
    nilaiProject: 0,
    dpLunas: false,
    pelunasanLunas: false,
    driveLink: 'HMPSKEUBANK - Google Drive',
  },
];

// ─── Outreach terbaru ────────────────────────────────────────────────────────
export const outreachRows: OutreachRow[] = [
  {
    idLead: 'L001',
    namaBisnis: 'Arsitek Studio Malang',
    kanal: 'WhatsApp',
    tanggalDihubungi: '2026-09-04',
    status: 'Minta Proposal',
    angle: 'Website Portofolio Interaktif + Integrasi WA',
    tanggalFollowUp: '2026-09-07',
    catatan: 'Minta dikirimkan contoh template portofolio dulu.',
    overdue: true,
  },
];

export const closingRows: ClosingRow[] = [
  {
    idLead: 'L001',
    namaBisnis: 'Arsitek Studio Malang',
    paket: 'Company Profile + Portfolio',
    nilai: 2500000,
    statusDP: 'Lunas (50%)',
    deadline: '2026-09-20',
    statusProyek: 'Pengerjaan',
    statusPelunasan: 'Belum',
  },
];

// Contoh lead prioritas dari scraping (rating tinggi / review besar = prospek panas)
export const topLeads = [
  { id: 'L013', bisnis: 'Papyrus Photo Margocity', review: 9265, wa: '0811-2096-304', website: 'Ada (Bagus)', kota: 'Depok City' },
  { id: 'L029', bisnis: 'Selfie Time Margo City', review: 21729, wa: '0878-7815-6740', website: 'Tidak Ada', kota: 'Depok City' },
  { id: 'L003', bisnis: 'Cemerlang Studio Foto Margonda', review: 2194, wa: '(021) 78880942', website: 'Tidak Ada', kota: 'Depok City' },
  { id: 'L026', bisnis: 'ETIVE Depok', review: 1711, wa: '0851-9938-7532', website: 'Ada (Bagus)', kota: 'Depok City' },
  { id: 'L089', bisnis: 'Potret Studio Depok', review: 1422, wa: '0811-1176-489', website: 'Tidak Ada', kota: 'Depok City' },
];

// ─── Konten rolling 2 bulanan (Jobdesk Tim sheet) ────────────────────────────
export const contentRolling: ContentRolling[] = [
  { periode: 'Agu – Sep 2026', bulan: 'Agustus, September', pj: 'Dije', target: '8 Artikel, 12 Postingan', fokus: 'Edukasi produk', aktif: true },
  { periode: 'Okt – Nov 2026', bulan: 'Oktober, November', pj: 'Daniel', target: '8 Artikel, 12 Postingan', fokus: 'Case study klien', aktif: false },
  { periode: 'Des 26 – Jan 27', bulan: 'Desember, Januari', pj: 'Dzaky', target: '8 Artikel, 12 Postingan', fokus: 'Tren UI/UX & Bisnis', aktif: false },
  { periode: 'Feb – Mar 2027', bulan: 'Februari, Maret', pj: 'Ignas', target: '8 Artikel, 12 Postingan', fokus: 'Teknologi & otomatisasi', aktif: false },
  { periode: 'Apr – Mei 2027', bulan: 'April, Mei', pj: 'Dije', target: '8 Artikel, 12 Postingan', fokus: 'SEO dan konversi', aktif: false },
];

// ─── Roadmap 90 hari ─────────────────────────────────────────────────────────
export const roadmap90: RoadmapItem[] = [
  { minggu: 'Minggu 1–2', fase: 'Fase 1', target: 'Selesaikan portofolio himpunan', pic: '-', status: 'Jalan' },
  { minggu: 'Minggu 3–4', fase: 'Fase 2', target: 'Mulai outreach aktif target 30–40 kontak', pic: '-', status: 'Belum' },
  { minggu: 'Minggu 5–8', fase: 'Fase 3', target: 'Follow-up dan closing', pic: '-', status: 'Belum' },
  { minggu: 'Minggu 9–12', fase: 'Fase 4', target: 'Evaluasi dan scaling', pic: '-', status: 'Belum' },
];

// ─── Rate Card ringkas (50 item) ─────────────────────────────────────────────
export const rateCard: RateCardSummary[] = [
  { kategori: 'Website Development', jumlahItem: 14, hargaMin: 100000, hargaMax: 8000000, contoh: 'Landing page → E-commerce', color: '#4CD7E0' },
  { kategori: 'UI/UX Design', jumlahItem: 11, hargaMin: 100000, hargaMax: 3000000, contoh: 'Wireframe → Design system', color: '#A89AE8' },
  { kategori: 'AI Solutions', jumlahItem: 8, hargaMin: 300000, hargaMax: 15000000, contoh: 'Chatbot → Fine-tuning', color: '#D8FF3F' },
  { kategori: 'N8N Automation', jumlahItem: 9, hargaMin: 200000, hargaMax: 4000000, contoh: 'Form→Sheet → Multi-API', color: '#FF8A3D' },
  { kategori: 'API Integration', jumlahItem: 8, hargaMin: 200000, hargaMax: 3500000, contoh: 'Payment → Webhook custom', color: '#FFD043' },
];

// ─── Jobdesk tim ─────────────────────────────────────────────────────────────
export const teamJobdesk: TeamJobdesk[] = [
  {
    nama: 'Daniel',
    roles: [
      { role: 'Humas', tipe: 'Aktif', tugas: 'Komunikasi klien & mitra, tangani keluhan' },
      { role: 'Backend', tipe: 'Aktif', tugas: 'API aplikasi utama, fix bug backend' },
      { role: 'Backend', tipe: 'Pasif', tugas: 'Maintain server & database' },
    ],
  },
  {
    nama: 'Ignas',
    roles: [
      { role: 'SEO', tipe: 'Aktif', tugas: 'Riset keyword, optimasi on-page' },
      { role: 'Content Writing', tipe: 'Aktif', tugas: 'Artikel mingguan + copy sosmed' },
      { role: 'Laporan', tipe: 'Pasif', tugas: 'Laporan performa & analisis traffic' },
    ],
  },
  {
    nama: 'Dzaky',
    roles: [
      { role: 'UI/UX', tipe: 'Aktif', tugas: 'Wireframe + prototype interaktif' },
      { role: 'Business Analyst', tipe: 'Aktif', tugas: 'Requirement + spek bisnis' },
      { role: 'Business Analyst', tipe: 'Pasif', tugas: 'Analisis tren & kompetitor' },
    ],
  },
  {
    nama: 'Dije',
    roles: [
      { role: 'Frontend', tipe: 'Aktif', tugas: 'Implementasi UI ke kode, fix cross-browser' },
      { role: 'N8N', tipe: 'Aktif', tugas: 'Workflow marketing + integrasi API' },
      { role: 'N8N', tipe: 'Pasif', tugas: 'Monitoring workflow' },
    ],
  },
];

export function formatIDR(n: number): string {
  if (!n) return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatShortIDR(n: number): string {
  if (n >= 1000000) return `Rp${(n / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })}jt`;
  if (n >= 1000) return `Rp${Math.round(n / 1000)}rb`;
  return formatIDR(n);
}
