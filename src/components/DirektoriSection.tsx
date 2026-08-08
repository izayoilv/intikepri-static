"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, Mail, MapPin, Store } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { Business } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function DirektoriSection({
  initialItems,
}: {
  initialItems: Business[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const businesses = initialItems.slice(0, 3);

  useEffect(() => {
    if (!ref.current || businesses.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".direktori-reveal").forEach((el, i) => {
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
  }, [businesses.length]);

  // Data kosong (CMS belum mengisi) -> section disembunyikan dari homepage
  if (businesses.length === 0) return null;

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-12 direktori-reveal">
          <div>
            <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Direktori Bisnis
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              Bisnis Komunitas
            </h2>
          </div>
          <Link
            href="/direktori"
            className="hidden md:inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium hover:gap-3 transition-all"
          >
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businesses.map((biz, i) => (
            <div
              key={`${biz.name}-${i}`}
              className="direktori-reveal group bg-white border border-[#E5E5E5] border-t-2 border-t-[#A42A28] hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Logo + identitas */}
              <div className="p-5 pb-0 flex items-start gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-[#F7F7F7] border border-[#E5E5E5] overflow-hidden flex items-center justify-center">
                  {biz.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={biz.image}
                      alt={`Logo ${biz.name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Store size={22} className="text-[#CCCCCC]" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] leading-snug line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                    {biz.name}
                  </h3>
                  <p className="font-sans text-xs mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="bg-[#A42A28]/10 text-[#A42A28] px-2 py-0.5">
                      {biz.category || "Lainnya"}
                    </span>
                    <span className="text-[#999999]">{biz.location}</span>
                  </p>
                </div>
              </div>

              {/* Deskripsi */}
              <p className="px-5 mt-4 font-sans text-sm text-[#666666] leading-relaxed line-clamp-2">
                {biz.description}
              </p>

              {/* Meta */}
              <div className="px-5 mt-3 space-y-1.5">
                {biz.address && (
                  <p className="font-sans text-xs text-[#999999] flex items-start gap-1.5">
                    <MapPin size={12} className="mt-0.5 flex-shrink-0 text-[#C8956C]" />
                    <span className="line-clamp-1">{biz.address}</span>
                  </p>
                )}
                {biz.email && (
                  <p className="font-sans text-xs text-[#999999] flex items-center gap-1.5">
                    <Mail size={12} className="flex-shrink-0 text-[#C8956C]" />
                    <span className="truncate">{biz.email}</span>
                  </p>
                )}
              </div>

              {/* CTA website — elemen paling menonjol di kartu */}
              <div className="p-5 mt-auto">
                {biz.website ? (
                  <a
                    href={biz.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#A42A28] text-white px-4 py-2 font-sans text-xs font-medium hover:bg-[#8a2320] transition-colors"
                  >
                    <Globe size={14} /> Kunjungi Website
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 border border-dashed border-[#DDDDDD] text-[#BBBBBB] px-4 py-2 font-sans text-xs">
                    <Globe size={14} /> Website belum tersedia
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/direktori"
            className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium"
          >
            Lihat Semua Bisnis <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
