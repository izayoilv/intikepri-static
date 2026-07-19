"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, User, Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { News } from "@/types";

const PAGE_SIZE = 6;

export default function BeritaListClient({ initialItems, categories }: { initialItems: News[]; categories: string[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return initialItems.filter((n) => {
      const matchCat = category === "Semua" || n.category === category;
      const q = search.trim().toLowerCase();
      const matchSearch = !q || n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [initialItems, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const items = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="py-16 md:py-24 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">Berita</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">Berita & Kegiatan</h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
          <div className="relative md:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Cari berita..."
              className="w-full border border-[#E5E5E5] bg-white pl-9 pr-4 py-2.5 font-sans text-sm text-[#1A1A1A] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#A42A28]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => { setCategory(c); setPage(1); }}
                className={`px-4 py-2 font-sans text-xs tracking-wide border transition-colors ${category === c ? "bg-[#A42A28] text-white border-[#A42A28]" : "bg-white text-[#666666] border-[#E5E5E5] hover:border-[#A42A28]/40"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-[#999999] font-sans py-20">Tidak ada berita yang cocok.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link key={item.id} href={`/berita/${item.id}`} className="group">
                <div className="bg-white border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="aspect-[16/10] overflow-hidden bg-[#E5E5E5]">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${item.image})` }} />
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-[#A42A28]/10 text-[#A42A28] text-xs font-sans px-2 py-1 mb-3">{item.category}</span>
                    <h2 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#A42A28] transition-colors">{item.title}</h2>
                    <p className="text-[#666666] font-sans text-sm mb-3 line-clamp-2">{item.summary}</p>
                    <p className="text-[#999999] font-sans text-xs flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                      <span className="flex items-center gap-1"><User size={12} /> {item.author}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-[#E5E5E5] text-[#666666] disabled:opacity-30 hover:border-[#A42A28]/40"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-sans text-sm text-[#666666]">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-[#E5E5E5] text-[#666666] disabled:opacity-30 hover:border-[#A42A28]/40"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
