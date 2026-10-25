"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useState } from "react";

import SectionHeading from "@/components/SectionHeading";
import { bidangPengurus, branches, visiMisi } from "@/lib/data";
import { useReveal } from "@/lib/use-reveal";

const FLAT = "rotateX(0deg) rotateY(0deg)";

const FACTS = [
  { value: "2004", label: "Tahun berdiri" },
  { value: String(branches.length), label: "Cabang se-Kepri" },
  { value: String(bidangPengurus.length), label: "Bidang kerja" },
];

/**
 * Tentang Kami: heading, photo pair and a short read. On phones the photo
 * sits between the heading and the text so the section never turns into a
 * wall of copy; on desktop the photos fill the right column.
 */
export default function IntroSection() {
  const ref = useReveal<HTMLElement>(".intro-reveal");
  const [tilt, setTilt] = useState(FLAT);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt(
      `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`,
    );
  }

  return (
    <section
      ref={ref}
      id="tentang"
      className="bg-[#FAF6EF] px-4 md:px-8 py-14 md:py-28"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-x-24 gap-y-7 md:gap-y-10">
        <SectionHeading
          index="01"
          label="Tentang Kami"
          className="intro-reveal min-w-0 lg:self-end"
          title={
            <>
              Membangun masyarakat Kepri yang{" "}
              <span className="italic text-[#A42A28]">lebih baik</span>,
              bersama.
            </>
          }
        />

        <div className="intro-reveal min-w-0 lg:col-start-2 lg:row-span-2 lg:self-center [perspective:1200px] sm:pb-10 lg:pb-0">
          <div
            onMouseMove={onMove}
            onMouseLeave={() => setTilt(FLAT)}
            className="relative [transform-style:preserve-3d] transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: tilt }}
          >
            <div className="relative aspect-[16/10] sm:aspect-[4/3.1] overflow-hidden shadow-[0_40px_80px_-40px_rgba(20,13,12,0.55)]">
              <Image
                src="/images/hero-bg-2.jpeg"
                alt="Pertemuan akbar anggota INTI Kepri"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -left-6 -bottom-10 w-[42%] aspect-[4/3] overflow-hidden border-8 border-[#FAF6EF] shadow-[0_30px_60px_-30px_rgba(20,13,12,0.6)] [transform:translateZ(60px)]">
              <Image
                src="/images/hero-bg-3.jpeg"
                alt="Pengurus INTI Kepri dalam acara resmi"
                fill
                sizes="(max-width: 1024px) 42vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="intro-reveal min-w-0 lg:row-start-2 lg:self-start">
          <p className="font-sans text-base md:text-[17px] leading-[1.7] text-[#4A423C] max-w-xl">
            Sejak 2004, INTI Kepri menjadi wadah masyarakat Tionghoa di
            Kepulauan Riau untuk berkarya di bidang sosial, kemanusiaan,
            pendidikan, ekonomi, dan kebudayaan.
          </p>

          <figure className="mt-6 md:mt-7 max-w-xl border-l-2 border-[#A42A28] pl-4 md:pl-5">
            <figcaption className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-[#8F6440]">
              Visi
            </figcaption>
            <blockquote className="mt-1.5 font-serif italic text-[17px] md:text-[19px] leading-[1.5] text-[#1C1714]">
              {visiMisi.visi}
            </blockquote>
          </figure>

          <dl className="mt-8 md:mt-10 grid grid-cols-3 max-w-xl border-t border-[#E5DBCD]">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`pt-4 md:pt-5 ${i > 0 ? "pl-4 md:pl-6 border-l border-[#E5DBCD]" : ""}`}
              >
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-[2rem] md:text-[2.6rem] font-bold leading-none text-[#1C1714]">
                  {f.value}
                </dd>
                <dd
                  aria-hidden="true"
                  className="mt-1.5 font-sans text-[12px] md:text-[13px] leading-snug text-[#6B6B6B]"
                >
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/tentang-kami"
            className="mt-8 md:mt-10 inline-flex items-center gap-2.5 border-b border-[#A42A28] pb-1 font-sans text-[15px] font-semibold text-[#A42A28] hover:gap-3.5 hover:text-[#7E1F1D] transition-all"
          >
            Selengkapnya tentang kami
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
