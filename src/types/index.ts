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
}

export interface BusinessContacts {
  phone?: string;
  whatsapp?: string;
  telegram?: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  x?: string;
  threads?: string;
  shopee?: string;
  line?: string;
  googlemaps?: string;
}

export interface Business {
  name: string;
  category: string;
  description: string;
  owner?: string;
  location: string;
  address?: string;
  contacts?: BusinessContacts;
  image?: string;
  banner?: string;
  photos?: string[];
  is_featured?: boolean;
  sort_order?: number;
  since?: string;
}

export interface AgendaEvent {
  slug: string;
  title: string;
  description: string;
  date: string;
  end_date?: string | null;
  start_time: string;
  end_time?: string | null;
  venue: string;
  location: string;
  organization: string;
  category: string;
  image?: string;
}

export interface VideoItem {
  title: string;
  youtube_id: string;
  description?: string;
  date: string;
}

export interface DocumentItem {
  title: string;
  description?: string;
  author?: string;
  date: string;
  file_url: string;
  file_bytes?: number;
  cover_url?: string;
  pages?: number;
}
