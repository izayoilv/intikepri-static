"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Store } from "lucide-react";
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
            <Link
              key={`${biz.name}-${i}`}
              href="/direktori"
              className="direktori-reveal group"
            >
              <div className="bg-white border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow h-full">
                {biz.image ? (
                  <div className="aspect-[16/10] overflow-hidden bg-[#E5E5E5]">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${biz.image})` }}
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-white flex items-center justify-center border-b border-[#E5E5E5]">
                    <Store size={40} className="text-[#E5E5E5]" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block bg-[#A42A28]/10 text-[#A42A28] text-xs font-sans px-2 py-1">
                      {biz.category || "Lainnya"}
                    </span>
                    {biz.location && (
                      <span className="inline-block bg-[#1A1A1A]/5 text-[#1A1A1A] text-xs font-sans px-2 py-1">
                        {biz.location}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                    {biz.name}
                  </h3>
                  <p className="font-sans text-sm text-[#666666] leading-relaxed line-clamp-2">
                    {biz.description}
                  </p>
                </div>
              </div>
            </Link>
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
