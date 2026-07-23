"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { visiMisi } from "@/lib/data";

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
    <section ref={ref} className="py-20 md:py-32 bg-white">
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
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium mt-6 hover:gap-3 transition-all"
            >
              Pelajari Lebih Lanjut <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { number: "20+", label: "Tahun Mengabdi" },
              { number: "8", label: "Kota/Kabupaten" },
              { number: "300+", label: "Anggota" },
              { number: "100+", label: "Kegiatan" },
            ].map((stat, i) => (
              <div
                key={i}
                className="intro-reveal bg-[#F7F7F7] p-6 border border-[#E5E5E5]"
              >
                <p className="font-serif text-3xl font-bold text-[#A42A28] mb-1">
                  {stat.number}
                </p>
                <p className="font-sans text-xs text-[#999999]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
