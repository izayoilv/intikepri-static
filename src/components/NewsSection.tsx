"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { News } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function NewsSection({
  initialItems,
}: {
  initialItems: News[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [featured, ...rest] = initialItems;
  const sideNews = rest.slice(0, 2);

  useEffect(() => {
    if (!ref.current || initialItems.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".news-reveal").forEach((el, i) => {
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
  }, [initialItems]);

  // Data kosong -> section disembunyikan dari homepage
  if (initialItems.length === 0 || !featured) return null;

  return (
    <section ref={ref} className="pt-20 md:pt-32 pb-10 md:pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-12 news-reveal">
          <div>
            <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Berita Terbaru
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              Kegiatan INTI Kepri
            </h2>
          </div>
          <Link
            href="/berita"
            className="hidden md:inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium hover:gap-3 transition-all"
          >
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured: artikel terbaru, besar */}
          <Link
            href={`/berita/${featured.slug}`}
            className="news-reveal group lg:col-span-3"
          >
            <div className="relative border border-[#E5E5E5] overflow-hidden aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px] bg-[#E5E5E5]">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${featured.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/0" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-block bg-[#A42A28] text-white text-xs font-sans px-2 py-1">
                    {featured.location}
                  </span>
                  <span className="inline-block border border-white/30 text-white/80 text-xs font-sans px-2 py-1">
                    {featured.organization}
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-3xl font-bold text-white leading-snug mb-3 group-hover:underline decoration-[#A42A28] decoration-2 underline-offset-4">
                  {featured.title}
                </h3>
                <p className="text-white/60 font-sans text-xs flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={12} /> {featured.author}
                  </span>
                </p>
              </div>
            </div>
          </Link>

          {/* Dua berita berikutnya: baris horizontal */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {sideNews.map((item) => (
              <Link
                key={item.slug}
                href={`/berita/${item.slug}`}
                className="news-reveal group flex-1"
              >
                <div className="bg-white border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow h-full flex">
                  <div
                    className="w-32 md:w-40 flex-shrink-0 bg-cover bg-center bg-[#E5E5E5]"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="p-4 md:p-5 flex flex-col justify-between min-w-0">
                    <div>
                      <span className="inline-block bg-[#A42A28]/10 text-[#A42A28] text-xs font-sans px-2 py-1 mb-2">
                        {item.location}
                      </span>
                      <h3 className="font-serif text-sm md:text-base font-semibold text-[#1A1A1A] line-clamp-3 group-hover:text-[#A42A28] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[#999999] font-sans text-xs flex items-center gap-1 mt-3">
                      <Calendar size={12} /> {item.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium"
          >
            Lihat Semua Berita <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
