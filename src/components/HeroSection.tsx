"use client";

import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1A1A1A]"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/images/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="hero-content relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mx-auto mb-8">
          <Image
            src="/images/Logo-INTI.png"
            alt="Logo INTI Kepri"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-4">
          Perhimpunan Indonesia Tionghoa
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          PROVINSI
          <br />
          KEPULAUAN RIAU
        </h1>
        <p className="text-white/60 font-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Berdedikasi untuk membangun masyarakat yang rukun, sejahtera, dan
          berkeadilan.
        </p>
        <p className="text-white/40 font-sans text-xs md:text-sm max-w-xl mx-auto mt-2 italic">
          Dedicated to building a harmonious, prosperous, and just society.
        </p>
        <p className="text-white/40 font-sans text-xs md:text-sm max-w-xl mx-auto mt-1 mb-8">
          致力于建设一个和谐、繁荣、公正的社会。
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/tentang-kami"
            className="inline-flex items-center gap-2 bg-[#A42A28] text-white px-6 py-3 font-sans text-sm font-medium hover:bg-[#8a2320] transition-colors"
          >
            Tentang Kami <ChevronRight size={16} />
          </Link>
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 font-sans text-sm hover:bg-white/10 transition-colors"
          >
            Berita
          </Link>
        </div>
      </div>
    </section>
  );
}
