"use client";

import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Images,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { GalleryPhoto } from "@/types";

const PAGE_SIZE = 12;

export default function GaleriListClient({
  initialItems,
}: {
  initialItems: GalleryPhoto[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [page, setPage] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Kategori diturunkan otomatis dari data, DIKELOMPOKKAN PER TAHUN.
  // Ratusan kegiatan tetap rapi: dropdown menampilkan grup "2026", "2025", ...
  const yearGroups = useMemo(() => {
    const groups = new Map<string, Set<string>>();
    initialItems.forEach((p) => {
      const year = (p.date || "").slice(0, 4) || "Lainnya";
      const cat = (p.category || "Lainnya").trim();
      if (!groups.has(year)) groups.set(year, new Set());
      groups.get(year)!.add(cat);
    });
    return Array.from(groups.entries())
      .sort((a, b) => b[0].localeCompare(a[0])) // tahun terbaru di atas
      .map(([year, cats]) => ({
        year,
        cats: Array.from(cats).sort((a, b) => a.localeCompare(b)),
      }));
  }, [initialItems]);

  const totalCategories = yearGroups.reduce((n, g) => n + g.cats.length, 0);

  const filtered = useMemo(() => {
    return initialItems.filter((p) => {
      const matchCat =
        category === "Semua" || (p.category || "Lainnya") === category;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.location || "").toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [initialItems, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const items = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) =>
        cur === null
          ? null
          : (cur + dir + filtered.length) % filtered.length,
      );
    },
    [filtered.length],
  );

  // Keyboard: Esc tutup, panah kiri/kanan navigasi + kunci scroll body
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, stepLightbox]);

  const active = lightbox !== null ? filtered[lightbox] : null;

  return (
    <section className="py-16 md:py-24 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
            Galeri
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Galeri & Dokumentasi
          </h1>
          <p className="font-sans text-sm text-[#999999] mt-3 max-w-2xl">
            Dokumentasi kegiatan INTI Kepulauan Riau — bakti sosial, pertemuan,
            perayaan budaya, dan program kemasyarakatan.
          </p>
        </div>

        {/* Toolbar: search + dropdown filter, satu baris ramping */}
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Cari foto atau kegiatan..."
              className="w-full border border-[#E5E5E5] bg-white pl-9 pr-4 py-2.5 font-sans text-sm text-[#1A1A1A] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#A42A28]"
            />
          </div>
          {totalCategories > 1 && (
            <div className="relative">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full md:w-64 appearance-none border border-[#E5E5E5] bg-white pl-3 pr-8 py-2.5 font-sans text-sm text-[#666666] focus:outline-none focus:border-[#A42A28] cursor-pointer"
                aria-label="Filter kegiatan"
              >
                <option value="Semua">Semua Kegiatan</option>
                {yearGroups.map((group) => (
                  <optgroup key={group.year} label={group.year}>
                    {group.cats.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999999] pointer-events-none"
              />
            </div>
          )}
        </div>
        <p className="font-sans text-xs text-[#BBBBBB] mb-8">
          {filtered.length} foto ditemukan
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Images size={40} className="mx-auto text-[#E5E5E5] mb-4" />
            <p className="text-[#999999] font-sans">
              {initialItems.length === 0
                ? "Belum ada foto di galeri."
                : "Tidak ada foto yang cocok."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((photo) => {
              const globalIndex = filtered.indexOf(photo);
              return (
                <button
                  key={`${photo.image}-${globalIndex}`}
                  onClick={() => setLightbox(globalIndex)}
                  className="group relative aspect-square overflow-hidden bg-[#E5E5E5] text-left"
                  aria-label={`Perbesar foto: ${photo.title}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${photo.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-sans text-xs font-medium text-white line-clamp-2">
                      {photo.title}
                    </p>
                    <p className="font-sans text-[10px] text-white/60 mt-1">
                      {photo.category || "Lainnya"}
                    </p>
                  </div>
                </button>
              );
            })}
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
            <span className="font-sans text-sm text-[#666666]">
              {currentPage} / {totalPages}
            </span>
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

      {/* LIGHTBOX */}
      {active && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto: ${active.title}`}
          onClick={closeLightbox}
        >
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <span className="font-sans text-xs text-white/50 tracking-widest">
              {(lightbox ?? 0) + 1} / {filtered.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Tutup galeri"
            >
              <X size={24} />
            </button>
          </div>

          <div
            className="flex-1 flex items-center justify-center px-4 md:px-16 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {filtered.length > 1 && (
              <button
                onClick={() => stepLightbox(-1)}
                className="hidden md:flex p-3 text-white/50 hover:text-white transition-colors flex-shrink-0"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft size={32} />
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image}
              alt={active.title}
              className="max-h-full max-w-full object-contain"
            />
            {filtered.length > 1 && (
              <button
                onClick={() => stepLightbox(1)}
                className="hidden md:flex p-3 text-white/50 hover:text-white transition-colors flex-shrink-0"
                aria-label="Foto berikutnya"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>

          <div
            className="px-4 md:px-8 py-5 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif text-base md:text-lg font-semibold text-white">
              {active.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2">
              <span className="inline-block bg-[#A42A28] text-white text-[10px] font-sans px-2 py-0.5">
                {active.category || "Lainnya"}
              </span>
              {active.date && (
                <span className="flex items-center gap-1 font-sans text-xs text-white/50">
                  <Calendar size={12} /> {active.date}
                </span>
              )}
              {active.location && (
                <span className="flex items-center gap-1 font-sans text-xs text-white/50">
                  <MapPin size={12} /> {active.location}
                </span>
              )}
            </div>
            {filtered.length > 1 && (
              <div className="flex md:hidden items-center justify-center gap-6 mt-4">
                <button
                  onClick={() => stepLightbox(-1)}
                  className="p-2 border border-white/20 text-white/70"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => stepLightbox(1)}
                  className="p-2 border border-white/20 text-white/70"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
