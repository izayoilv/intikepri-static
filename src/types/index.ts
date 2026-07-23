export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
  uploadDate: string;
}

export interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  attachments: Attachment[];
  created_at: string;
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
  status: string;
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
