"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useState } from "react";

import SectionHeading from "@/components/SectionHeading";
import { visiMisi } from "@/lib/data";
import { useReveal } from "@/lib/use-reveal";

const FLAT = "rotateX(0deg) rotateY(0deg)";

export default function IntroSection() {
  const ref = useReveal<HTMLElement>(".intro-reveal");
  const [tilt, setTilt] = useState(FLAT);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt(
      `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`,
    );
  }

  return (
    <section
      ref={ref}
      id="tentang"
      className="bg-[#FAF6EF] px-4 md:px-8 py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="intro-reveal min-w-0">
          <SectionHeading
            index="01"
            label="Tentang Kami"
            title={
              <>
                Membangun masyarakat Kepri yang{" "}
                <span className="italic text-[#A42A28]">lebih baik</span>,
                bersama.
              </>
            }
          />
          <p className="mt-7 font-sans text-[17px] leading-[1.75] text-[#4A423C] max-w-xl">
            {visiMisi.visi}
          </p>
          <p className="mt-4 font-sans text-[15.5px] leading-[1.75] text-[#5A524B] max-w-xl">
            Sejak 2004, INTI Kepri menjadi wadah masyarakat Tionghoa di
            Kepulauan Riau untuk berkarya di bidang sosial, kemanusiaan,
            pendidikan, ekonomi, dan kebudayaan.
          </p>
          <Link
            href="/tentang-kami"
            className="mt-9 inline-flex items-center gap-2.5 border-b border-[#A42A28] pb-1 font-sans text-[15px] font-semibold text-[#A42A28] hover:gap-3.5 hover:text-[#7E1F1D] transition-all"
          >
            Selengkapnya tentang kami
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="intro-reveal min-w-0 [perspective:1200px] pt-8 pb-12 lg:py-0">
          <div
            onMouseMove={onMove}
            onMouseLeave={() => setTilt(FLAT)}
            className="relative [transform-style:preserve-3d] transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: tilt }}
          >
            <div className="relative aspect-[4/3.2] overflow-hidden shadow-[0_40px_80px_-40px_rgba(20,13,12,0.55)]">
              <Image
                src="/images/hero-bg-2.jpeg"
                alt="Pertemuan akbar anggota INTI Kepri"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-2 sm:-left-6 -bottom-9 w-[44%] aspect-[4/3] overflow-hidden border-[6px] sm:border-8 border-[#FAF6EF] shadow-[0_30px_60px_-30px_rgba(20,13,12,0.6)] [transform:translateZ(60px)]">
              <Image
                src="/images/hero-bg-3.jpeg"
                alt="Pengurus INTI Kepri dalam acara resmi"
                fill
                sizes="(max-width: 1024px) 44vw, 22vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-2 sm:-right-4 -top-7 bg-[#120D0C] text-white px-5 py-4 sm:px-6 sm:py-5 max-w-[200px] sm:max-w-[240px] shadow-[0_30px_60px_-30px_rgba(20,13,12,0.7)] [transform:translateZ(90px)]">
              <p className="font-serif italic text-base sm:text-[19px] leading-snug">
                &ldquo;Tulus memberi, ikhlas mengabdi.&rdquo;
              </p>
              <p className="mt-2.5 font-sans text-[10.5px] tracking-[0.22em] uppercase text-[#D9A56F]">
                Motto INTI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
