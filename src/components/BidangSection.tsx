"use client";

import Image from "next/image";
import { type KeyboardEvent, useId, useRef, useState } from "react";

import SectionHeading from "@/components/SectionHeading";
import { bidangPengurus } from "@/lib/data";

const FALLBACK_PHOTOS = [
  "/images/hero-bg.jpeg",
  "/images/hero-bg-2.jpeg",
  "/images/hero-bg-3.jpeg",
];

const pad2 = (n: number) => String(n).padStart(2, "0");

/** The eight bidang as tabs; the panel shows the selected one with a photo. */
export default function BidangSection({ photos = [] }: { photos?: string[] }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const pool = photos.length > 0 ? photos.slice(0, 8) : FALLBACK_PHOTOS;
  const sel = bidangPengurus[active];

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = bidangPengurus.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <section
      id="bidang"
      className="relative overflow-hidden bg-[#120D0C] text-white px-4 md:px-8 py-20 md:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -left-[10%] -bottom-[30%] w-[60vw] max-w-[800px] aspect-square bg-[radial-gradient(closest-side,rgba(164,42,40,0.35),rgba(164,42,40,0)_70%)]"
      />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          index="03"
          label="Bidang Kegiatan"
          tone="dark"
          className="max-w-3xl mb-12 md:mb-14"
          title={
            <>
              Delapan bidang, satu semangat{" "}
              <span className="italic text-[#E8B37C]">pengabdian</span>.
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 lg:gap-16 items-stretch">
          <div
            role="tablist"
            aria-label="Bidang kegiatan"
            aria-orientation="vertical"
            className="flex flex-col border-t border-white/12"
          >
            {bidangPengurus.map((b, i) => {
              const on = i === active;
              return (
                <button
                  key={b.name}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`flex items-baseline gap-4 w-full text-left border-b border-white/12 py-4 transition-all duration-300 ${on ? "bg-[#A42A28]/90 px-5 text-white" : "px-1 text-white/70 hover:text-white"}`}
                >
                  <span className="font-serif italic text-sm text-[#D9A56F] w-6 flex-shrink-0">
                    {pad2(i + 1)}
                  </span>
                  <span className="font-serif text-[19px] md:text-[23px] font-semibold">
                    {b.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${active}`}
            className="relative min-h-[380px] md:min-h-[460px] overflow-hidden bg-[#1E1715]"
          >
            {pool.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover transition-opacity duration-700 ${i === active % pool.length ? "opacity-50" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,13,12,0.1)_0%,rgba(18,13,12,0.92)_78%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-11">
              <p
                className="font-serif text-[76px] md:text-[120px] leading-[0.9] font-extrabold text-[#E8B37C]/95"
                aria-hidden="true"
              >
                {pad2(active + 1)}
              </p>
              <h3 className="mt-3 font-serif text-[28px] md:text-[40px] leading-[1.1] font-bold">
                {sel.name}
              </h3>
              <p className="mt-3 font-sans text-base md:text-[16.5px] leading-[1.65] text-white/85 max-w-md">
                {sel.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
