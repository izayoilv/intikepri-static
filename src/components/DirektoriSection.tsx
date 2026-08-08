"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, MapPin, Store, User } from "lucide-react";
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
  // Urutan: unggulan selalu di atas
  const businesses = [...initialItems]
    .sort((a, b) => Number(b.featured || false) - Number(a.featured || false))
    .slice(0, 3);

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
      <div className="max-w-5xl mx-auto px-4 md:px-8">
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

        {/* Row horizontal: foto + shade di kiri, ringkasan di kanan */}
        <div className="space-y-4">
          {businesses.map((biz, i) => {
            const photo = biz.banner || biz.image;
            return (
              <Link
                key={`${biz.name}-${i}`}
                href="/direktori"
                className="direktori-reveal group bg-white border border-[#E5E5E5] hover:shadow-lg transition-shadow flex flex-col sm:flex-row overflow-hidden"
              >
                {/* Foto nge-blend ke putih ke arah konten */}
                <div className="relative sm:w-52 md:w-60 flex-shrink-0 aspect-[16/9] sm:aspect-auto sm:min-h-[120px] bg-[#F7F7F7] overflow-hidden">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt={`Foto ${biz.name}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Store size={28} className="text-[#DDDDDD]" />
                    </div>
                  )}
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent from-45% to-white" />
                  <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-transparent from-55% to-white" />
                </div>

                {/* Konten slim */}
                <div className="flex-1 min-w-0 px-4 py-3 md:px-5 flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#A42A28] transition-colors">
                      {biz.name}
                    </h3>
                    {biz.featured && (
                      <span className="bg-[#C8956C]/15 text-[#C8956C] font-sans text-[10px] tracking-wider uppercase px-2 py-0.5 font-medium">
                        Unggulan
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-[#999999] mt-1 flex items-center gap-x-2">
                    <span className="text-[#A42A28]">{biz.category || "Lainnya"}</span>
                    <span className="w-1 h-1 bg-[#DDDDDD] rounded-full" />
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-[#C8956C]" /> {biz.location}
                    </span>
                    {biz.owner && (
                      <>
                        <span className="w-1 h-1 bg-[#DDDDDD] rounded-full" />
                        <span className="flex items-center gap-1">
                          <User size={11} /> {biz.owner}
                        </span>
                      </>
                    )}
                  </p>
                  <p className="mt-1.5 font-sans text-sm text-[#666666] leading-relaxed line-clamp-1">
                    {biz.description}
                  </p>
                  <p className="mt-auto pt-2">
                    {biz.website ? (
                      <span className="inline-flex items-center gap-1.5 text-[#A42A28] font-sans text-xs font-semibold group-hover:gap-2.5 transition-all">
                        <Globe size={13} /> Kunjungi Website <ArrowRight size={12} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[#CCCCCC] font-sans text-xs">
                        <Globe size={13} /> Website belum tersedia
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
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
