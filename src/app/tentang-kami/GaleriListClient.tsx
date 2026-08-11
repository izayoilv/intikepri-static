"use client";

import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import Image from "next/image";
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
        cur === null
          ? null
          : (cur + dir + initialItems.length) % initialItems.length,
      );
    },
    [initialItems.length],
  );

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

  const active = lightbox !== null ? initialItems[lightbox] : null;

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

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Images size={40} className="mx-auto text-[#E5E5E5] mb-4" />
            <p className="text-[#999999] font-sans">
              Belum ada foto di galeri.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((photo, globalIndex) => (
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
              {(lightbox ?? 0) + 1} / {initialItems.length}
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
            {initialItems.length > 1 && (
              <button
                onClick={() => stepLightbox(-1)}
                className="hidden md:flex p-3 text-white/50 hover:text-white transition-colors flex-shrink-0"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft size={32} />
              </button>
            )}
            <Image
              src={active.image}
              alt={active.title}
              width={1600}
              height={900}
              className="max-h-full max-w-full object-contain"
            />
            {initialItems.length > 1 && (
              <button
                onClick={() => stepLightbox(1)}
                className="hidden md:flex p-3 text-white/50 hover:text-white transition-colors flex-shrink-0"
                aria-label="Foto berikutnya"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>

          {initialItems.length > 1 && (
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
      )}
    </section>
  );
}
