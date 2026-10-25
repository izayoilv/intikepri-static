"use client";

import Image from "next/image";

import SectionHeading from "@/components/SectionHeading";
import { bidangPengurus, pengurusKSB } from "@/lib/data";
import { useReveal } from "@/lib/use-reveal";

const pad2 = (n: number) => String(n).padStart(2, "0");

function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="48" height="48" fill="#F0E6DC" />
      <circle cx="24" cy="18" r="8" fill="#D8C3B0" />
      <path d="M8 48c0-9 7-15 16-15s16 6 16 15" fill="#D8C3B0" />
    </svg>
  );
}

/** Current committee (filled positions only) and the eight working fields. */
export default function StructureSection({ index }: { index?: string }) {
  const ref = useReveal<HTMLElement>(".struct-reveal");
  const filled = pengurusKSB.filter((p) => p.nama.trim() !== "");
  const hasVacancies = filled.length < pengurusKSB.length;

  return (
    <section ref={ref} className="bg-white px-4 md:px-8 py-16 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="struct-reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <SectionHeading
            index={index}
            label="Pengurus"
            title={
              <>
                Susunan pengurus{" "}
                <span className="italic text-[#A42A28]">2026–2030</span>.
              </>
            }
          />
          {hasVacancies && (
            <p className="max-w-sm font-sans text-sm leading-relaxed text-[#6B6B6B]">
              Susunan pengurus lengkap periode 2026–2030 akan segera diperbarui.
            </p>
          )}
        </div>

        <ul className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filled.map((p) => (
            <li
              key={p.jabatan}
              className="struct-reveal flex items-center gap-4 bg-[#FAF6EF] border border-[#E5DBCD] p-4"
            >
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-[#F0E6DC]">
                {p.foto ? (
                  <Image
                    src={p.foto}
                    alt={p.nama}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <PortraitPlaceholder />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase text-[#A42A28]">
                  {p.jabatan}
                </p>
                <p className="mt-1 font-serif text-lg font-bold text-[#1C1714] truncate">
                  {p.nama}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="struct-reveal mt-16 md:mt-24 font-serif text-2xl md:text-[2rem] font-bold text-[#1C1714]">
          {bidangPengurus.length} bidang kerja
        </h3>
        <ol className="mt-6 md:mt-8 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-[#E5DBCD]">
          {bidangPengurus.map((b, i) => (
            <li
              key={b.name}
              className="struct-reveal p-4 md:p-6 border-r border-b border-[#E5DBCD] hover:bg-[#FAF6EF] transition-colors"
            >
              <span className="font-serif italic text-[15px] text-[#8F6440]">
                {pad2(i + 1)}
              </span>
              <h4 className="mt-2 md:mt-3 font-serif text-base md:text-lg leading-snug font-bold text-[#1C1714]">
                {b.name.replace(/^Bidang\s+/, "")}
              </h4>
              <p className="mt-1.5 font-sans text-[13px] md:text-sm leading-relaxed text-[#6B6B6B]">
                {b.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
