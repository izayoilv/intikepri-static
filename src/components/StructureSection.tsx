"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { bidangPengurus, pengurusKSB } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

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

export default function StructureSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".struct-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            delay: (i % 6) * 0.08,
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 struct-reveal">
          <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
            Pengurus
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Susunan Pengurus
          </h2>
          <p className="text-[#999999] font-sans max-w-2xl mx-auto">
            Perhimpunan INTI Provinsi Kepulauan Riau — Periode 2026–2030.
          </p>
        </div>

        {/* KSB: Ketua, Sekretaris, Bendahara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {pengurusKSB.map((p, i) => (
            <div
              key={i}
              className="struct-reveal flex items-center gap-4 bg-[#F7F7F7] border border-[#E5E5E5] p-4 hover:border-[#A42A28]/30 transition-colors"
            >
              <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-[#F0E6DC]">
                {p.foto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.foto}
                    alt={p.jabatan}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PortraitPlaceholder />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#A42A28] font-medium">
                  {p.jabatan}
                </p>
                <p
                  className={`font-serif text-base font-semibold text-[#1A1A1A] mt-0.5 truncate ${p.nama ? "" : "text-[#BBBBBB] font-normal italic"}`}
                >
                  {p.nama || "—"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-10 struct-reveal">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
            Bidang-Bidang
          </h3>
          <p className="text-[#999999] font-sans max-w-2xl mx-auto text-sm">
            Delapan bidang yang menangani program-program organisasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bidangPengurus.map((b, i) => (
            <div
              key={i}
              className="struct-reveal bg-[#F7F7F7] p-6 border border-[#E5E5E5] hover:border-[#A42A28]/30 transition-colors group"
            >
              <span className="font-serif text-3xl font-light text-[#A42A28]/30 group-hover:text-[#A42A28]/50 transition-colors">
                0{i + 1}
              </span>
              <h4 className="font-serif text-lg font-semibold text-[#1A1A1A] mt-3 mb-2">
                {b.name}
              </h4>
              <p className="text-[#999999] font-sans text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
