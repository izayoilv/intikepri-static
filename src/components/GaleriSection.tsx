"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useRef, useState } from "react";

import SectionHeading from "@/components/SectionHeading";
import type { GalleryPhoto } from "@/types";

const pad2 = (n: number) => String(n).padStart(2, "0");

/** 3D carousel of recent gallery photos: arrows, click, or swipe to browse. */
export default function GaleriSection({
  initialItems,
}: {
  initialItems: GalleryPhoto[];
}) {
  const photos = initialItems.slice(0, 8);
  const total = photos.length;
  const [current, setCurrent] = useState(Math.min(2, Math.max(total - 1, 0)));
  const startX = useRef<number | null>(null);

  if (total === 0) return null;

  const go = (d: number) => setCurrent((c) => (c + d + total) % total);

  function onDown(e: PointerEvent<HTMLDivElement>) {
    startX.current = e.clientX;
  }
  function onUp(e: PointerEvent<HTMLDivElement>) {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  }

  return (
    <section
      id="galeri"
      className="bg-[#120D0C] text-white py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap items-end justify-between gap-5">
        <SectionHeading
          index="05"
          label="Galeri"
          tone="dark"
          title="Momen kebersamaan"
        />
        <div className="flex items-center gap-2.5">
          <Link
            href="/galeri"
            className="mr-3 hidden sm:inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#E8B37C] hover:text-white transition-colors"
          >
            Lihat semua <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto sebelumnya"
            className="w-12 h-12 md:w-[52px] md:h-[52px] flex items-center justify-center border border-white/30 hover:border-white/70 transition-colors"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Foto berikutnya"
            className="w-12 h-12 md:w-[52px] md:h-[52px] flex items-center justify-center bg-[#A42A28] border border-[#A42A28] hover:bg-[#8a2320] transition-colors"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className="relative mt-12 md:mt-14 h-[260px] sm:h-[38vw] sm:max-h-[480px] sm:min-h-[300px] [perspective:1400px] touch-pan-y select-none"
        onPointerDown={onDown}
        onPointerUp={onUp}
        aria-roledescription="carousel"
        aria-label="Foto kegiatan"
      >
        {photos.map((p, i) => {
          let off = i - current;
          if (off > total / 2) off -= total;
          if (off < -total / 2) off += total;
          const a = Math.abs(off);
          const hidden = a > 2;
          return (
            <button
              key={`${p.image}-${i}`}
              type="button"
              onClick={() => (off === 0 ? undefined : setCurrent(i))}
              aria-label={
                off === 0
                  ? `Foto aktif: ${p.title}`
                  : `Tampilkan foto: ${p.title}`
              }
              aria-hidden={hidden || undefined}
              tabIndex={hidden ? -1 : 0}
              className="absolute left-1/2 top-0 h-full w-[72vw] sm:w-[34vw] max-w-[560px] -ml-[36vw] sm:-ml-[17vw] lg:-ml-[min(17vw,280px)] overflow-hidden bg-[#1E1715] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
              style={{
                transform: `translateX(${off * 62}%) translateZ(${-a * 180}px) rotateY(${-off * 32}deg)`,
                zIndex: 20 - a,
                opacity: hidden ? 0 : a === 0 ? 1 : a === 1 ? 0.85 : 0.5,
                filter: a === 0 ? "none" : "brightness(0.55) saturate(0.8)",
              }}
            >
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(max-width: 640px) 72vw, 560px"
                className="object-cover pointer-events-none"
                draggable={false}
              />
            </button>
          );
        })}
      </div>

      <p
        className="max-w-3xl mx-auto mt-9 px-4 text-center font-sans text-[15px] leading-relaxed text-white/85 min-h-[3em]"
        aria-live="polite"
      >
        {photos[current].title}
      </p>
      <p className="mt-2 text-center font-sans text-xs tracking-[0.2em] text-white/60">
        {pad2(current + 1)} / {pad2(total)}
      </p>
      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/galeri"
          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#E8B37C]"
        >
          Lihat semua foto <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
