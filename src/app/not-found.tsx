import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-white flex items-center justify-center px-4 pt-24 pb-16">
        <div className="text-center">
          <p
            className="font-serif text-7xl font-bold text-[#A42A28]/20 mb-4"
            aria-hidden="true"
          >
            404
          </p>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
            Halaman tidak ditemukan
          </h1>
          <p className="font-sans text-sm text-[#6B6B6B] mb-8">
            Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#A42A28] text-white px-6 py-3 font-sans text-sm font-medium hover:bg-[#8a2320] transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 border border-[#E5E5E5] text-[#1A1A1A] px-6 py-3 font-sans text-sm font-medium hover:border-[#A42A28]/40 transition-colors"
            >
              Baca Berita Terbaru
            </Link>
          </div>
        </div>
      </main>
      <Footer showCta={false} />
    </>
  );
}
