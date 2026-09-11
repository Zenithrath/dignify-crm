// ─── Leads Database: sampel real dari 01_Lead_Scraping (total 884 di Sheet)
// Kolom Sheet: ID, Bisnis, Kategori, Kota, Rating, Review, WA, Status Website, Sosmed, Catatan, Website.
// Tracking di app: statusOutreach (Belum / Sudah Kontak / Minta Proposal / Deal / Ditolak) + nextFU + catatan.
// Simpan di localStorage biar centang tidak hilang.

export type LeadOutreachStatus = 'Belum' | 'Sudah Kontak' | 'Minta Proposal' | 'Deal' | 'Ditolak';

export interface LeadDB {
  id: string;
  bisnis: string;
  kategori: string;
  kota: string;
  review: number;
  wa: string;
  website: string;
  sosmed: string;
  status: LeadOutreachStatus;
  nextFU: string;
  catatan: string;
}

export const LEADS_SEED: LeadDB[] = [
  { id: 'L001', bisnis: 'Arsitek Studio Malang', kategori: 'Jasa & Layanan', kota: 'Malang', review: 85, wa: '8123456789', website: 'Tidak Ada', sosmed: '@arsitek.studiomlg', status: 'Minta Proposal', nextFU: '2026-09-07', catatan: 'Minta contoh template portofolio.' },
  { id: 'L003', bisnis: 'Cemerlang Studio Foto Margonda', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 2194, wa: '(021) 78880942', website: 'Tidak Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L007', bisnis: 'Limatiga Studio Foto', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 348, wa: '0822-1017-5353', website: 'Ada (Bagus)', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L009', bisnis: 'MariPro Photo Studio Margonda', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 1046, wa: '0811-826-731', website: 'Tidak Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L010', bisnis: 'Flaner - Studio & Self Photo', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 600, wa: '0878-6936-6162', website: 'Tidak Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L013', bisnis: 'Papyrus Photo Margocity', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 9265, wa: '0811-2096-304', website: 'Ada (Bagus)', sosmed: '-', status: 'Belum', nextFU: '', catatan: 'Review terbesar, prioritas.' },
  { id: 'L021', bisnis: 'Lenstha Photo Studio', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 391, wa: '0877-2199-1270', website: 'Ada (Google Sites)', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L024', bisnis: 'Click Five Studio', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 333, wa: '0812-9895-4337', website: 'Tidak Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L026', bisnis: 'ETIVE Depok', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 1711, wa: '0851-9938-7532', website: 'Ada (Bagus)', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L029', bisnis: 'Selfie Time Margo City', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 21729, wa: '0878-7815-6740', website: 'Tidak Ada', sosmed: '@selfietimeid', status: 'Belum', nextFU: '', catatan: 'Review paling besar.' },
  { id: 'L037', bisnis: '@yoonjaespace', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 251, wa: '0823-1011-0156', website: 'Tidak Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L068', bisnis: 'Studio Foto Sinar Mentari', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 551, wa: '0822-4630-7658', website: 'Tidak Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L076', bisnis: 'Studio Rumah Louie Project', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 32, wa: '0852-1060-8913', website: 'Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L083', bisnis: 'Arkamaya Self Photo Studio', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 642, wa: '0877-8734-2288', website: 'Tidak Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L089', bisnis: 'Potret Studio Depok', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 1422, wa: '0811-1176-489', website: 'Tidak Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
  { id: 'L094', bisnis: 'Studio Foto Depok Cemerlang Nusantara', kategori: 'STUDIO FOTO', kota: 'Depok City', review: 569, wa: '(021) 7521253', website: 'Tidak Ada', sosmed: '-', status: 'Belum', nextFU: '', catatan: '' },
];

export const LEADS_TOTAL_DI_SHEET = 884;
