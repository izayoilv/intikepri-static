import type { Bidang, Branch, Ketua, News, Pengurus, VisiMisi } from "@/types";

export const visiMisi: VisiMisi = {
  visi: "Menjadi organisasi yang maju, modern, bercitra internasional, berorientasi pada Kebangsaan Indonesia, menghargai hak asasi manusia, egaliter, pluralis, inklusif, demokratis, dan transparan.",
  misi: "Berperan aktif dalam dinamika proses pembangunan bangsa, antara lain penuntasan masalah Tionghoa di Indonesia, menuju terwujudnya bangsa Indonesia yang kokoh, rukun bersatu dalam keharmonisan, kebinekaan, saling menghargai dan saling percaya.",
  motto: "TULUS MEMBERI IKHLAS MENGABDI",
};

export const branches: Branch[] = [
  { name: "INTI Provinsi Kepri", region: "Batam" },
  { name: "INTI Kota Batam", region: "Batam" },
  { name: "INTI Kab. Karimun", region: "Tanjung Balai Karimun" },
  { name: "INTI Kota Tanjungpinang & Kab. Bintan", region: "Tanjungpinang" },
  { name: "INTI Kab. Lingga", region: "Daik" },
  { name: "INTI Kab. Anambas", region: "Tarempa" },
  { name: "INTI Kab. Natuna", region: "Ranai" },
];

export const ketuaPeriode: Ketua[] = [
  {
    periode: "2026-2030",
    nama: "Piter Tanjaya S.H.",
    status: "Ketua Saat Ini",
  },
  { periode: "2024-2026", nama: "Piter Tanjaya S.H.", status: "Mantan Ketua" },
  {
    periode: "2010-2018",
    nama: "Beny Suwandi S.H., M.H",
    status: "Mantan Ketua",
  },
  { periode: "2006-2010", nama: "Dato Harsono", status: "Mantan Ketua" },
  { periode: "2002-2006", nama: "Eddy C Lummawie", status: "Ketua Pendiri" },
];

export const pengurusKSB: Pengurus[] = [
  { jabatan: "Ketua", nama: "Piter Tanjaya" },
  { jabatan: "Wakil Ketua I", nama: "" },
  { jabatan: "Wakil Ketua II", nama: "" },
  { jabatan: "Wakil Ketua III", nama: "" },
  { jabatan: "Wakil Ketua IV", nama: "" },
  { jabatan: "Sekretaris I", nama: "" },
  { jabatan: "Sekretaris II", nama: "" },
  { jabatan: "Sekretaris III", nama: "" },
  { jabatan: "Bendahara I", nama: "" },
  { jabatan: "Bendahara II", nama: "" },
  { jabatan: "Bendahara III", nama: "" },
];

export const bidangPengurus: Bidang[] = [
  {
    name: "Bidang Sosial",
    desc: "Bakti sosial, pengobatan gratis, bantuan bencana",
  },
  {
    name: "Bidang Humas & HLP",
    desc: "Hubungan masyarakat dan relasi antar lembaga",
  },
  {
    name: "Bidang Ekonomi & HLN",
    desc: "Pemberdayaan UMKM, kerja sama ekonomi, investasi",
  },
  {
    name: "Bidang Pendidikan & Seni Budaya",
    desc: "Program beasiswa, pelestarian seni budaya Tionghoa-Indonesia",
  },
  {
    name: "Bidang IT, Sosmed & Multimedia",
    desc: "Website, media sosial, dan publikasi digital",
  },
  {
    name: "Bidang Hukum & Organisasi",
    desc: "Advokasi hukum, konsolidasi, dan kaderisasi organisasi",
  },
  {
    name: "Bidang Pemuda & Olah Raga",
    desc: "Pembinaan generasi muda dan kegiatan olahraga",
  },
  {
    name: "Bidang Lain-Lain",
    desc: "Program dan kegiatan di luar bidang utama",
  },
];

export const sejarah = [
  "Perhimpunan Indonesia Tionghoa (INTI) Provinsi Kepulauan Riau didirikan pada tahun 2004 sebagai wadah organisasi masyarakat Tionghoa di wilayah Kepulauan Riau.",
  "Sebagai organisasi sosial kemasyarakatan bersifat kebangsaan, INTI Kepri berkomitmen untuk memperkuat peran masyarakat Tionghoa dalam pembangunan daerah dan menjaga kerukunan serta persatuan bangsa.",
  "INTI Kepri telah aktif dalam berbagai bidang termasuk sosial, kemanusiaan, pendidikan, ekonomi, dan kebudayaan untuk memperkuat integrasi bangsa.",
  "Seiring perkembangannya, INTI Kepri telah memiliki jaringan di hampir seluruh wilayah administratif di Kepulauan Riau.",
];

export const categories = [
  "Semua",
  "Batam",
  "TPI & Bintan",
  "Karimun",
  "Lingga",
  "Anambas",
  "Natuna",
];
export const imageOptions = [
  "/images/hero-bg.jpg",
  "/images/news-1.jpg",
  "/images/news-2.jpg",
  "/images/news-3.jpg",
];

export const fallbackNews: News[] = [];
