"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useRef } from "react";

const FALLBACK = [
  "/images/hero-bg.jpeg",
  "/images/hero-bg-2.jpeg",
  "/images/hero-bg-3.jpeg",
  "/images/footer-bg.jpeg",
];

const COLUMNS = [
  { start: 0, aspect: "aspect-[3/4]", anim: "mosaic-up", dur: "46s" },
  { start: 3, aspect: "aspect-[4/5]", anim: "mosaic-down", dur: "52s" },
  { start: 5, aspect: "aspect-[3/4]", anim: "mosaic-up", dur: "60s" },
];

/**
 * "Wajah Komunitas": slow-scrolling columns of real activity photos beside
 * (desktop) or above (phone) the motto. Columns shift slightly with the
 * pointer and pause on hover; nothing moves with reduced motion.
 */
export default function HeroSection({ photos = [] }: { photos?: string[] }) {
  const pool = photos.length >= 4 ? photos.slice(0, 8) : FALLBACK;
  const mosaicRef = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLElement>) {
    const el = mosaicRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", `${Math.round(-x * 30)}px`);
    el.style.setProperty("--py", `${Math.round(-y * 30)}px`);
  }

  return (
    <section
      onMouseMove={onMove}
      className="relative min-h-svh overflow-hidden bg-[#120D0C] text-white flex flex-col"
    >
      <div
        ref={mosaicRef}
        aria-hidden="true"
        className="mosaic absolute flex gap-2.5 lg:gap-[18px] -top-10 -left-8 -right-8 h-[64%] lg:h-[135%] lg:-top-40 lg:left-auto lg:-right-16 lg:w-[60%]"
      >
        {COLUMNS.map((col, ci) => {
          const items = [
            ...pool.slice(col.start % pool.length),
            ...pool.slice(0, col.start % pool.length),
          ].slice(0, 4);
          const track = [...items, ...items];
          return (
            <div key={ci} className="flex-1 min-w-0 overflow-hidden">
              <div
                className={`${col.anim} flex flex-col gap-2.5 lg:gap-[18px]`}
                style={{ animationDuration: col.dur }}
              >
                {track.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className={`relative ${col.aspect} overflow-hidden bg-[#2A201C]`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      priority={ci === 0 && i < 2}
                      sizes="(max-width: 1024px) 34vw, 20vw"
                      className="object-cover brightness-[0.82] saturate-[0.85] transition-[filter,transform] duration-700 hover:brightness-100 hover:saturate-100 hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Phones: fade the photos into the text below. */}
      <div
        aria-hidden="true"
        className="lg:hidden absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(18,13,12,0.55)_0%,rgba(18,13,12,0)_14%,rgba(18,13,12,0)_30%,rgba(18,13,12,0.85)_52%,#120D0C_62%)]"
      />
      {/* Desktop: solid on the left behind the text, photos on the right. */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,#120D0C_0%,#120D0C_34%,rgba(18,13,12,0.82)_50%,rgba(18,13,12,0.15)_72%,rgba(18,13,12,0.35)_100%)]"
      />
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(18,13,12,0.55)_0%,rgba(18,13,12,0)_18%,rgba(18,13,12,0)_80%,rgba(18,13,12,0.85)_100%)]"
      />

      <div className="relative flex-1 w-full max-w-7xl mx-auto px-5 md:px-8 pt-24 pb-8 lg:py-28 flex flex-col justify-end lg:justify-center">
        <div className="hero-content max-w-[620px] lg:max-w-[720px]">
          <p className="mb-3.5 lg:mb-6 font-sans text-[10.5px] lg:text-xs font-semibold tracking-[0.22em] lg:tracking-[0.28em] uppercase text-[#D9A56F]">
            Perhimpunan Indonesia Tionghoa · Kepri
          </p>
          <h1 className="font-serif font-extrabold text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5.25rem] lg:leading-none tracking-[-0.02em]">
            <span className="sr-only">
              Perhimpunan Indonesia Tionghoa Provinsi Kepulauan Riau:{" "}
            </span>
            Tulus memberi,{" "}
            <span className="italic font-semibold text-[#E8B37C]">
              ikhlas mengabdi.
            </span>
          </h1>
          <p className="mt-3.5 lg:mt-7 font-sans text-[15px] lg:text-lg leading-[1.6] lg:leading-[1.65] text-white/85 max-w-[520px]">
            Sejak 2004, anggota di tujuh cabang se-Kepulauan Riau bergerak
            bersama di bidang sosial, budaya, pendidikan, dan ekonomi.
          </p>
          <p
            lang="zh"
            className="font-zh mt-2 lg:mt-3.5 text-sm lg:text-base tracking-[0.14em] text-white/60"
          >
            以诚相予 · 以心相奉
          </p>
          <div className="mt-6 lg:mt-10 grid grid-cols-2 sm:flex gap-2.5 sm:gap-3.5">
            <Link
              href="/tentang-kami"
              className="flex items-center justify-center text-center bg-[#A42A28] text-white px-4 sm:px-6 py-4 font-sans text-[14.5px] sm:text-[15px] font-semibold hover:bg-[#8a2320] transition-colors"
            >
              Kenali INTI Kepri
            </Link>
            <Link
              href="/bergabung"
              className="flex items-center justify-center text-center border border-white/40 text-white px-4 sm:px-6 py-4 font-sans text-[14.5px] sm:text-[15px] font-medium hover:bg-white/10 transition-colors"
            >
              Cara Bergabung
            </Link>
          </div>
        </div>
      </div>

      <p className="hidden lg:block absolute right-16 bottom-8 font-sans text-xs tracking-[0.16em] uppercase text-white/70">
        Foto dari kegiatan INTI Kepri
      </p>
    </section>
  );
}
