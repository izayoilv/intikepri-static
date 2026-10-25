"use client";

import { useState } from "react";

import SectionHeading from "@/components/SectionHeading";
import { branches } from "@/lib/data";

/** Approximate positions on an illustrated (not to scale) map of Kepri. */
const SPOTS: Record<string, { label: string; x: string; y: string }> = {
  Batam: { label: "Batam", x: "34%", y: "50%" },
  "Tanjung Balai Karimun": { label: "Karimun", x: "18%", y: "56%" },
  Tanjungpinang: { label: "Tanjungpinang", x: "50%", y: "58%" },
  Daik: { label: "Lingga", x: "40%", y: "80%" },
  Tarempa: { label: "Anambas", x: "66%", y: "32%" },
  Ranai: { label: "Natuna", x: "84%", y: "16%" },
};

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function JaringanSection() {
  const [active, setActive] = useState(1);
  const activeRegion = branches[active]?.region;
  const regions = Array.from(new Set(branches.map((b) => b.region))).filter(
    (r) => SPOTS[r],
  );

  return (
    <section id="jaringan" className="bg-[#FAF6EF] px-4 md:px-8 py-20 md:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-12 lg:gap-20 items-center">
        <div className="min-w-0">
          <SectionHeading
            index="04"
            label="Jaringan"
            title={
              <>
                {branches.length} cabang di seluruh{" "}
                <span className="italic text-[#A42A28]">Kepulauan Riau</span>.
              </>
            }
          />
          <ul className="mt-9 flex flex-col gap-2">
            {branches.map((b, i) => {
              const on = i === active;
              return (
                <li key={b.name}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 text-left border transition-colors ${on ? "bg-white border-[#A42A28]" : "border-[#E5DBCD] hover:bg-white/60"}`}
                  >
                    <span className="flex items-center gap-3.5 min-w-0">
                      <span className="font-serif italic text-[13px] text-[#8F6440] w-5 flex-shrink-0">
                        {pad2(i + 1)}
                      </span>
                      <span className="font-sans text-[15px] font-semibold text-[#1C1714]">
                        {b.name}
                      </span>
                    </span>
                    <span className="font-sans text-[13px] text-[#6B6B6B] text-right">
                      {b.region}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="min-w-0 m-0">
          <div className="relative aspect-[1/0.86] bg-[#120D0C] overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(232,179,124,0.16)_1px,transparent_1px)] [background-size:22px_22px]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[8%_6%] border border-[#E8B37C]/20"
            />
            {regions.map((r) => {
              const s = SPOTS[r];
              const on = r === activeRegion;
              return (
                <div
                  key={r}
                  aria-hidden="true"
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: s.x, top: s.y }}
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "w-[22px] h-[22px] bg-[#E0393A] shadow-[0_0_0_12px_rgba(196,40,40,0.25),0_0_30px_rgba(232,179,124,0.35)]" : "w-3 h-3 bg-[#E8B37C] shadow-[0_0_0_5px_rgba(196,40,40,0.2)]"}`}
                  />
                  <span
                    className={`absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap font-sans text-xs tracking-[0.08em] ${on ? "text-white" : "text-white/60"}`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
            <div className="absolute left-5 right-5 bottom-4 sm:left-6 sm:right-6 sm:bottom-5 flex flex-wrap items-end justify-between gap-3">
              <p className="text-white" aria-live="polite">
                <span className="block font-sans text-[11px] tracking-[0.2em] uppercase text-[#D9A56F]">
                  Cabang terpilih
                </span>
                <span className="block mt-1.5 font-serif text-xl sm:text-2xl font-bold">
                  {branches[active]?.name}
                </span>
              </p>
            </div>
          </div>
          <figcaption className="mt-3 font-sans text-xs text-[#6B6B6B]">
            Peta ilustrasi, tidak berskala.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
