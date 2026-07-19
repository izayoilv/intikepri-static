"use client";

import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fallbackNews } from "@/lib/data";
import type { News } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function NewsSection({ initialItems }: { initialItems: News[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const displayNews = initialItems.length > 0 ? initialItems : fallbackNews;

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".news-reveal").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          delay: i * 0.1,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [displayNews]);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-12 news-reveal">
          <div>
            <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">Berita Terbaru</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">Kegiatan INTI Kepri</h2>
          </div>
          <Link href="/berita" className="hidden md:inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium hover:gap-3 transition-all">
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayNews.map((item, i) => (
            <Link key={item.id} href={`/berita/${item.id}`} className="news-reveal group">
              <div className="bg-white border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] overflow-hidden bg-[#E5E5E5]">
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${item.image})` }} />
                </div>
                <div className="p-5">
                  <span className="inline-block bg-[#A42A28]/10 text-[#A42A28] text-xs font-sans px-2 py-1 mb-3">{item.category}</span>
                  <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#A42A28] transition-colors">{item.title}</h3>
                  <p className="text-[#999999] font-sans text-xs flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {item.author}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/berita" className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium">
            Lihat Semua Berita <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
