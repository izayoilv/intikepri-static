"use client";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Images,
  MapPin,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { GalleryPhoto } from "@/types";

const PAGE_SIZE = 12;

export default function GaleriListClient({
  initialItems,
}: {
  initialItems: GalleryPhoto[];
}) {
  const [page, setPage] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Album murni: semua foto tampil apa adanya, tanpa search/filter
  const totalPages = Math.max(1, Math.ceil(initialItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const items = initialItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) =>
        cur === null ? cur : (cur + dir + items.length) % items.length,
      );
    },
    [items.length],
  );

  // Keyboard: Esc tutup, panah kiri/kanan pindah foto; kunci scroll body
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, stepLightbox]);

  return (
    <section className="py-16 md:py-24 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
            Galeri
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Galeri & Dokumentasi
          </h1>
          <p className="font-sans text-sm text-[#999999] mt-3 max-w-2xl">
            Dokumentasi kegiatan INTI Kepulauan Riau: bakti sosial, pertemuan,
            perayaan budaya, dan momen kebersamaan komunitas.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Images size={40} className="mx-auto text-[#E5E5E5] mb-4" />
            <p className="text-[#999999] font-sans">
              Belum ada dokumentasi yang dipublikasikan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {items.map((photo, i) => (
              <button
                key={`${photo.image}-${i}`}
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/3] bg-[#F7F7F7] overflow-hidden text-left"
                aria-label={`Perbesar foto: ${photo.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <p className="font-sans text-xs font-medium text-white line-clamp-1">
                    {photo.title}
                  </p>
                  <p className="font-sans text-[10px] text-white/70 mt-0.5">
                    {photo.category}
                  </p>
                </div>
              </button>
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
      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto: ${items[lightbox].title}`}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Tutup galeri"
          >
            <X size={24} />
          </button>
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stepLightbox(-1);
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stepLightbox(1);
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Foto berikutnya"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={items[lightbox].image}
              alt={items[lightbox].title}
              className="w-full max-h-[75vh] object-contain"
            />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-serif text-lg font-semibold text-white">
                  {items[lightbox].title}
                </h2>
                <p className="font-sans text-xs text-white/60 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{items[lightbox].category}</span>
                  {items[lightbox].date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {items[lightbox].date}
                    </span>
                  )}
                  {items[lightbox].location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {items[lightbox].location}
                    </span>
                  )}
                </p>
              </div>
              <span className="font-sans text-xs text-white/40 flex-shrink-0">
                {lightbox + 1} / {items.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
