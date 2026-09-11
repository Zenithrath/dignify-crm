// ─── Jobdesk tracking: Aktif (per project) vs Pasif/Rutin (harian/mingguan/bulanan)
// Aturan simple:
// - AKTIF = projectan, ada awal-akhir, selesai = done. Contoh: bikin API, wireframe, implementasi UI.
// - PASIF/RUTIN = berulang terus. Dibagi Harian / Mingguan / Bulanan. Contoh: konten mingguan,
//   audit SEO bulanan, pantau server, laporan traffic.
// Sumber awal: sheet Jobdesk Tim Monitoring DIGNIFY. Tracking disimpan di localStorage
// via useJobdesk (centang selesai, reset otomatis ikut periode).

export type JobTipe = 'Aktif' | 'Pasif';
export type JobCadence = 'Harian' | 'Mingguan' | 'Bulanan' | 'Per Project';

export interface JobTask {
  id: string;
  nama: string; // orang
  role: string;
  tipe: JobTipe;
  cadence: JobCadence;
  tugas: string;
  target: string; // contoh: "1x/hari", "8 artikel/bln", "tiap ada project"
  done: boolean;
  lastDone: string; // yyyy-mm-dd atau '-'
  projectLink?: string; // kalau Aktif terikat project
}

const seed: JobTask[] = [
  // ── Daniel ──
  { id: 'JB-DAN-01', nama: 'Daniel', role: 'Humas', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Komunikasi klien & mitra per project', target: 'tiap ada project', done: false, lastDone: '-' },
  { id: 'JB-DAN-02', nama: 'Daniel', role: 'Humas', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Tangani keluhan & pertanyaan pengguna', target: 'tiap ada tiket', done: false, lastDone: '-' },
  { id: 'JB-DAN-03', nama: 'Daniel', role: 'Backend', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Kembangkan API aplikasi utama', target: 'ikut deadline project', done: false, lastDone: '-', projectLink: 'PRJ-001' },
  { id: 'JB-DAN-04', nama: 'Daniel', role: 'Backend', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Perbaiki bug backend', target: 'tiap ada bug', done: false, lastDone: '-' },
  { id: 'JB-DAN-05', nama: 'Daniel', role: 'Humas', tipe: 'Pasif', cadence: 'Mingguan', tugas: 'Pantau sentimen publik terhadap brand', target: '1x/minggu', done: false, lastDone: '-' },
  { id: 'JB-DAN-06', nama: 'Daniel', role: 'Backend', tipe: 'Pasif', cadence: 'Mingguan', tugas: 'Pelihara server & database', target: '1x/minggu cek', done: false, lastDone: '-' },
  // ── Ignas ──
  { id: 'JB-IGN-01', nama: 'Ignas', role: 'SEO', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Riset keyword untuk artikel / project', target: 'tiap ada brief', done: false, lastDone: '-' },
  { id: 'JB-IGN-02', nama: 'Ignas', role: 'SEO', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Optimasi on-page artikel', target: 'tiap artikel baru', done: false, lastDone: '-' },
  { id: 'JB-IGN-03', nama: 'Ignas', role: 'Content Writing', tipe: 'Pasif', cadence: 'Mingguan', tugas: 'Tulis artikel blog mingguan', target: '2 artikel/minggu', done: false, lastDone: '-' },
  { id: 'JB-IGN-04', nama: 'Ignas', role: 'Content Writing', tipe: 'Pasif', cadence: 'Harian', tugas: 'Buat copy untuk media sosial', target: '1 copy/hari kerja', done: false, lastDone: '-' },
  { id: 'JB-IGN-05', nama: 'Ignas', role: 'SEO', tipe: 'Pasif', cadence: 'Bulanan', tugas: 'Audit teknikal SEO website', target: '1x/bulan', done: false, lastDone: '-' },
  { id: 'JB-IGN-06', nama: 'Ignas', role: 'Laporan', tipe: 'Pasif', cadence: 'Bulanan', tugas: 'Susun laporan performa + analisis traffic & konversi', target: '1x/bulan', done: false, lastDone: '-' },
  // ── Dzaky ──
  { id: 'JB-DZA-01', nama: 'Dzaky', role: 'UI/UX', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Desain wireframe fitur baru', target: 'ikut deadline project', done: false, lastDone: '-', projectLink: 'PRJ-001' },
  { id: 'JB-DZA-02', nama: 'Dzaky', role: 'UI/UX', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Buat prototype interaktif', target: 'tiap butuh approval', done: false, lastDone: '-' },
  { id: 'JB-DZA-03', nama: 'Dzaky', role: 'Business Analyst', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Kumpulkan requirement + susun spek bisnis', target: 'tiap project baru', done: false, lastDone: '-' },
  { id: 'JB-DZA-04', nama: 'Dzaky', role: 'UI/UX', tipe: 'Pasif', cadence: 'Mingguan', tugas: 'Riset pengguna (user research ringan)', target: '1x/minggu', done: false, lastDone: '-' },
  { id: 'JB-DZA-05', nama: 'Dzaky', role: 'Business Analyst', tipe: 'Pasif', cadence: 'Bulanan', tugas: 'Analisis tren pasar & kompetitor', target: '1x/bulan', done: false, lastDone: '-' },
  { id: 'JB-DZA-06', nama: 'Dzaky', role: 'UI/UX', tipe: 'Pasif', cadence: 'Bulanan', tugas: 'Audit UI yang sudah ada', target: '1x/bulan', done: false, lastDone: '-' },
  // ── Dije ──
  { id: 'JB-DIJ-01', nama: 'Dije', role: 'Frontend', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Implementasi desain UI ke kode', target: 'ikut deadline project', done: false, lastDone: '-', projectLink: 'PRJ-001' },
  { id: 'JB-DIJ-02', nama: 'Dije', role: 'Frontend', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Perbaiki isu tampilan cross-browser', target: 'tiap ada bug UI', done: false, lastDone: '-' },
  { id: 'JB-DIJ-03', nama: 'Dije', role: 'N8N', tipe: 'Aktif', cadence: 'Per Project', tugas: 'Buat workflow otomatisasi + integrasi API', target: 'tiap butuh otomasi', done: false, lastDone: '-' },
  { id: 'JB-DIJ-04', nama: 'Dije', role: 'Frontend', tipe: 'Pasif', cadence: 'Mingguan', tugas: 'Optimasi kecepatan muat halaman', target: '1x/minggu cek', done: false, lastDone: '-' },
  { id: 'JB-DIJ-05', nama: 'Dije', role: 'N8N', tipe: 'Pasif', cadence: 'Harian', tugas: 'Pantau workflow otomatisasi jalan', target: 'cek harian', done: false, lastDone: '-' },
  // ── Konten rutin tim (rolling 2 bulanan, target 8 artikel + 12 postingan) ──
  { id: 'JB-KON-01', nama: 'Dije', role: 'Konten', tipe: 'Pasif', cadence: 'Bulanan', tugas: 'PJ konten Agu–Sep 2026: edukasi produk', target: '8 artikel + 12 postingan', done: false, lastDone: '-' },
  { id: 'JB-KON-02', nama: 'Daniel', role: 'Konten', tipe: 'Pasif', cadence: 'Bulanan', tugas: 'PJ konten Okt–Nov 2026: case study klien', target: '8 artikel + 12 postingan', done: false, lastDone: '-' },
  { id: 'JB-KON-03', nama: 'Dzaky', role: 'Konten', tipe: 'Pasif', cadence: 'Bulanan', tugas: 'PJ konten Des–Jan: tren UI/UX & bisnis', target: '8 artikel + 12 postingan', done: false, lastDone: '-' },
  { id: 'JB-KON-04', nama: 'Ignas', role: 'Konten', tipe: 'Pasif', cadence: 'Bulanan', tugas: 'PJ konten Feb–Mar: teknologi & otomasi', target: '8 artikel + 12 postingan', done: false, lastDone: '-' },
];

export const JOBDESK_SEED = seed;

export const CADENCE_ORDER: JobCadence[] = ['Harian', 'Mingguan', 'Bulanan', 'Per Project'];

export function cadenceColor(c: JobCadence): string {
  if (c === 'Harian') return 'bg-[#4CD7E0]/15 text-[#4CD7E0]';
  if (c === 'Mingguan') return 'bg-[#FFD043]/15 text-[#FFD043]';
  if (c === 'Bulanan') return 'bg-[#A89AE8]/15 text-[#A89AE8]';
  return 'bg-[#D8FF3F]/15 text-[#D8FF3F]';
}
