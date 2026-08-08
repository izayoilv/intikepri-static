"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { bidangPengurus, branches, visiMisi } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".intro-reveal").forEach((el, i) => {
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
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="intro-reveal">
            <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Tentang Kami
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 leading-tight">
              Membangun Masyarakat Kepri yang Lebih Baik
            </h2>
            <div className="space-y-4 text-[#666666] font-sans text-sm leading-relaxed">
              <p>{visiMisi.visi}</p>
              <p>{visiMisi.misi}</p>
            </div>

            {/* Fakta singkat: informatif tanpa kotak-kotak angka */}
            <p className="mt-8 pt-6 border-t border-[#E5E5E5] font-sans text-xs tracking-wide text-[#999999] flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>
                Berdiri <span className="text-[#1A1A1A] font-medium">2004</span>
              </span>
              <span className="w-1 h-1 bg-[#A42A28] rounded-full" />
              <span>
                <span className="text-[#1A1A1A] font-medium">
                  {branches.length} cabang
                </span>{" "}
                se-Kepri
              </span>
              <span className="w-1 h-1 bg-[#A42A28] rounded-full" />
              <span>
                <span className="text-[#1A1A1A] font-medium">
                  {bidangPengurus.length} bidang
                </span>{" "}
                pengurus
              </span>
            </p>

            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium mt-6 hover:gap-3 transition-all"
            >
              Pelajari Lebih Lanjut <ArrowRight size={16} />
            </Link>
          </div>

          {/* Komposisi foto + kartu motto (rumah baru motto setelah blok gelap dihapus) */}
          <div className="intro-reveal relative">
            <div className="aspect-[4/3] bg-[#E5E5E5] overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-bg-2.jpeg')" }}
              />
            </div>
            <div className="hidden md:block absolute -bottom-10 -left-10 w-56 aspect-[4/3] border-8 border-white bg-[#E5E5E5] overflow-hidden shadow-lg">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-bg-3.jpeg')" }}
              />
            </div>
            <div className="hidden md:block absolute -top-6 -right-6 bg-white border-l-2 border-[#A42A28] shadow-lg px-6 py-5 max-w-[240px]">
              <p className="font-serif italic text-base text-[#1A1A1A] leading-snug">
                &ldquo;{visiMisi.motto}&rdquo;
              </p>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#999999] mt-2">
                Motto INTI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
