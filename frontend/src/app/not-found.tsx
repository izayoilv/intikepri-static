import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-serif text-7xl font-bold text-[#A42A28]/20 mb-4">404</p>
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">Halaman tidak ditemukan</h1>
        <p className="font-sans text-sm text-[#999999] mb-8">Halaman yang Anda cari tidak tersedia.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-[#A42A28] text-white px-6 py-3 font-sans text-sm font-medium hover:bg-[#8a2320] transition-colors">
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
