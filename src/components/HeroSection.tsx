"use client";

import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Foto-foto slideshow. Tambah/kurangi sesuai file di public/images.
// CATATAN: kalau jumlah foto diubah, sesuaikan juga durasi 18s di globals.css
// (total durasi = jumlah foto x 6 detik).
const SLIDES = [
  "/images/hero-bg.jpeg",
  "/images/hero-bg-2.jpeg",
  "/images/hero-bg-3.jpeg",
];

const SLIDE_SECONDS = 6;

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
      {/* SLIDESHOW — crossfade + ken burns, murni CSS animation (lihat globals.css) */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className="hero-slide absolute inset-0"
            style={{ animationDelay: `${i * SLIDE_SECONDS}s` }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* FRAME — hairline border emas + corner bracket, khas desain heritage */}
      <div
        className="absolute inset-3 md:inset-5 border border-[#C8956C]/25 pointer-events-none z-10"
        aria-hidden="true"
      >
        <span className="absolute -top-px -left-px w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-[#C8956C]" />
        <span className="absolute -top-px -right-px w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-[#C8956C]" />
        <span className="absolute -bottom-px -left-px w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-[#C8956C]" />
        <span className="absolute -bottom-px -right-px w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-[#C8956C]" />
      </div>

      {/* TEKS VERTIKAL — pengisi sisi kosong di layar besar */}
      <p
        className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 z-10 font-sans text-[11px] tracking-[0.5em] text-white/25 [writing-mode:vertical-rl] rotate-180 select-none"
        aria-hidden="true"
      >
        TULUS MEMBERI IKHLAS MENGABDI
      </p>
      <p
        className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 z-10 font-sans text-[11px] tracking-[0.5em] text-white/25 [writing-mode:vertical-rl] select-none"
        aria-hidden="true"
      >
        以诚相予 · 以心相奉
      </p>

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
          Tulus Memberi, Ikhlas Mengabdi.
        </p>
        <p className="text-white/40 font-sans text-xs md:text-sm max-w-xl mx-auto mt-2 italic">
          To give sincerely, to serve selflessly.
        </p>
        <p className="text-white/40 font-sans text-xs md:text-sm max-w-xl mx-auto mt-1 mb-8">
          以诚相予，以心相奉。
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

      {/* PROGRESS BAR SLIDE — sinkron dengan slideshow via timing CSS yang sama */}
      <div
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
        aria-hidden="true"
      >
        {SLIDES.map((src, i) => (
          <span
            key={src}
            className="block w-10 h-[2px] bg-white/15 overflow-hidden"
          >
            <span
              className="hero-progress block w-full h-full bg-[#C8956C]"
              style={{ animationDelay: `${i * SLIDE_SECONDS}s` }}
            />
          </span>
        ))}
      </div>
    </section>
  );
}