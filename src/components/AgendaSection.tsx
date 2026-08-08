"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { AgendaEvent } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const MONTHS_ID = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

export default function AgendaSection({
  initialItems,
}: {
  initialItems: AgendaEvent[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const events = initialItems.slice(0, 3);

  useEffect(() => {
    if (!ref.current || events.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".agenda-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            delay: i * 0.1,
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [events.length]);

  // Tidak ada agenda mendatang -> section disembunyikan dari homepage
  if (events.length === 0) return null;

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Kolom kiri: judul */}
          <div className="agenda-reveal">
            <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Agenda
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-5">
              Kegiatan yang Akan Datang
            </h2>
            <p className="font-sans text-sm text-[#666666] leading-relaxed mb-6">
              Ikuti kegiatan INTI Kepri — dari bakti sosial hingga perayaan
              budaya. Semua terbuka untuk anggota dan masyarakat.
            </p>
            <Link
              href="/agenda"
              className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium hover:gap-3 transition-all"
            >
              Lihat Semua Agenda <ArrowRight size={16} />
            </Link>
          </div>

          {/* Kolom kanan: timeline */}
          <div className="lg:col-span-2 relative border-l border-[#E5E5E5] ml-2">
            {events.map((e) => {
              const [y, m, d] = e.date.split("-");
              return (
                <Link
                  key={e.slug}
                  href={`/agenda/${e.slug}`}
                  className="agenda-reveal group relative flex gap-5 md:gap-6 pl-6 md:pl-8 pb-8 last:pb-0"
                >
                  <span className="absolute -left-[7px] top-1 w-3 h-3 bg-[#A42A28] rounded-full group-hover:scale-125 transition-transform" />
                  <div className="flex-shrink-0 w-14 text-center">
                    <p className="font-serif text-2xl md:text-3xl font-bold text-[#A42A28] leading-none">
                      {Number(d)}
                    </p>
                    <p className="font-sans text-[10px] tracking-widest uppercase text-[#999999] mt-1">
                      {MONTHS_ID[Number(m) - 1]} {y}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1 bg-white border border-[#E5E5E5] group-hover:border-[#A42A28]/40 group-hover:shadow-lg transition-all p-5">
                    {e.category && (
                      <span className="inline-block bg-[#A42A28]/10 text-[#A42A28] text-[10px] font-sans px-2 py-0.5 mb-2">
                        {e.category}
                      </span>
                    )}
                    <h3 className="font-serif text-base md:text-lg font-semibold text-[#1A1A1A] line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                      {e.title}
                    </h3>
                    <p className="font-sans text-xs text-[#999999] mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      {e.time && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {e.time}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {e.venue || e.location}
                      </span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
