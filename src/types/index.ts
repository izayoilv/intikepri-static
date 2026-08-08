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
  category: string;
  date: string;
  location?: string;
}

export interface Business {
  name: string;
  category: string;
  description: string;
  owner?: string;
  location?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  instagram?: string;
  image?: string;
  banner?: string;
  photos?: string[];
  since?: string;
}

export interface AgendaEvent {
  title: string;
  slug: string;
  description: string;
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  venue?: string;
  organization?: string;
  category?: string;
  image?: string;
  ctaLabel?: string;
  ctaType?: "link" | "whatsapp" | "email";
  ctaUrl?: string;
}

export interface VideoItem {
  title: string;
  youtubeId: string;
  description?: string;
  date: string;
  duration?: string;
  category?: string;
}

export interface DocumentItem {
  title: string;
  description?: string;
  author: string;
  date: string;
  fileUrl: string;
  pages?: number;
  size?: string;
  category?: string;
}
