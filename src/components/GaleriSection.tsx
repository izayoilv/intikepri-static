"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { GalleryPhoto } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function GaleriSection({
  initialItems,
}: {
  initialItems: GalleryPhoto[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const photos = initialItems.slice(0, 10);

  useEffect(() => {
    if (!ref.current || photos.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".galeri-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            delay: i * 0.08,
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [photos.length]);

  if (photos.length === 0) return null;

  const track = [...photos, ...photos];

  return (
    <section
      ref={ref}
      className="pt-10 md:pt-14 pb-20 md:pb-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-12 galeri-reveal">
          <div>
            <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Galeri
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              Dokumentasi Kegiatan
            </h2>
          </div>
          <Link
            href="/galeri"
            className="hidden md:inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium hover:gap-3 transition-all"
          >
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="marquee-pause relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="marquee-track flex gap-3 w-max pr-3">
          {track.map((photo, i) => (
            <Link
              key={`${photo.image}-${i}`}
              href="/galeri"
              className="group relative flex-none w-56 md:w-72 aspect-[4/3] overflow-hidden bg-[#E5E5E5]"
              aria-label={`Buka galeri: ${photo.title}`}
              tabIndex={i >= photos.length ? -1 : 0}
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${photo.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-0 left-0 right-0 p-3 font-sans text-xs font-medium text-white line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href="/galeri"
          className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium"
        >
          Lihat Semua Foto <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
