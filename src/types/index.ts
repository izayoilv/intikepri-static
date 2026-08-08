export interface News {
  title: string;
  content: string;
  image: string;
  slug: string;
  location: string;
  organization: string;
  author: string;
  date: string;
}

export interface NewsListResponse {
  items: News[];
  total: number;
  page: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
}

export interface VisiMisi {
  visi: string;
  misi: string;
  motto: string;
}

export interface Branch {
  name: string;
  region: string;
}

export interface Ketua {
  periode: string;
  nama: string;
}

export interface Bidang {
  name: string;
  desc: string;
}

export interface Pengurus {
  jabatan: string;
  nama: string;
  foto?: string;
}

export interface UserInfo {
  username: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
}

export interface GalleryPhoto {
  title: string;
  image: string;
  /** Nama kegiatan / sumber upload — otomatis jadi filter di halaman galeri */
  category: string;
  /** Format ISO: YYYY-MM-DD */
  date: string;
  location?: string;
  organization?: string;
}

export interface Business {
  name: string;
  category: string;
  description: string;
  owner?: string;
  /** Kota/Kabupaten, mis. Batam, Karimun, TPI & Bintan */
  location: string;
  address?: string;
  phone?: string;
  /** Format internasional tanpa +, mis. 6281234567890 */
  whatsapp?: string;
  email?: string;
  /** URL lengkap, mis. https://example.com */
  website?: string;
  /** Username tanpa @, mis. toko.saya */
  instagram?: string;
  /** Logo atau foto usaha (URL absolut) */
  image?: string;
  /** Foto wide/banner untuk kartu & popup detail (URL absolut) */
  banner?: string;
  /** Foto tambahan untuk strip galeri di popup detail (URL absolut) */
  photos?: string[];
  /** true = tampil di urutan teratas dengan lencana Unggulan */
  featured?: boolean;
  /** Tahun berdiri, mis. 2015 */
  since?: string;
}

export interface AgendaEvent {
  title: string;
  slug: string;
  description: string;
  /** Tanggal mulai, ISO: YYYY-MM-DD */
  date: string;
  /** Tanggal selesai (opsional, untuk agenda multi-hari), ISO */
  endDate?: string;
  /** Mis. "09:00 - 12:00 WIB" */
  time?: string;
  /** Kota/Kabupaten, mis. Batam, Karimun */
  location: string;
  /** Nama tempat & alamat, mis. "Aula Vihara Duta Maitreya, Batam Centre" */
  venue?: string;
  organization?: string;
  /** Mis. Bakti Sosial, Rapat, Perayaan, Pelatihan */
  category?: string;
  image?: string;
  /** CTA partisipasi — dikustomisasi admin per agenda di CMS */
  ctaLabel?: string;
  /** link = URL bebas (Google Form dsb) | whatsapp = nomor 628xxx | email = alamat email */
  ctaType?: "link" | "whatsapp" | "email";
  ctaUrl?: string;
}
