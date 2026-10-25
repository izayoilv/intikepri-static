import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import HeroEmblem from "@/components/HeroEmblem";
import { bidangPengurus, branches } from "@/lib/data";
import type { NewsSummary } from "@/types";

const SLIDES = [
  "/images/hero-bg.jpeg",
  "/images/hero-bg-2.jpeg",
  "/images/hero-bg-3.jpeg",
];

const SLIDE_SECONDS = 6;

const STATS = [
  { label: "Berdiri", value: "2004" },
  { label: "Cabang", value: String(branches.length) },
  { label: "Bidang", value: String(bidangPengurus.length) },
];

export default function HeroSection({
  latest,
}: {
  latest?: Pick<NewsSummary, "slug" | "title"> | null;
}) {
  return (
    <section className="relative min-h-svh flex flex-col overflow-hidden bg-[#120D0C] text-white">
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className="hero-slide absolute inset-0"
            style={{ animationDelay: `${i * SLIDE_SECONDS}s` }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover opacity-55 blur-[2px] saturate-[0.9] scale-105"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(18,13,12,0.97)_0%,rgba(18,13,12,0.86)_42%,rgba(18,13,12,0.62)_100%)]" />
        <div className="absolute -right-[12%] top-[6%] w-[70vw] max-w-[980px] aspect-square bg-[radial-gradient(closest-side,rgba(196,40,40,0.42),rgba(196,40,40,0.12)_55%,rgba(196,40,40,0)_75%)]" />
        <div className="absolute inset-0 bg-[#120D0C]/55 lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#120D0C]" />
      </div>

      <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-8 lg:pt-32 lg:pb-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-2 lg:gap-10">
        <div className="hero-content max-w-[680px]">
          <p className="flex items-center gap-3.5 mb-6 font-sans text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#D9A56F]">
            <span
              className="inline-block w-9 h-px bg-[#D9A56F]"
              aria-hidden="true"
            />
            Sejak 2004 · Provinsi Kepulauan Riau
          </p>
          <h1 className="font-serif font-extrabold text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.5rem] xl:leading-[0.98] tracking-[-0.02em] text-balance">
            Perhimpunan Indonesia{" "}
            <span className="italic font-semibold text-[#E8B37C]">
              Tionghoa
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-7 gap-y-2 border-l-2 border-[#A42A28] pl-4">
            <p className="font-serif italic text-lg md:text-[22px] text-white/90">
              Tulus memberi, ikhlas mengabdi.
            </p>
            <p
              lang="zh"
              className="font-zh text-base md:text-[17px] tracking-[0.12em] text-white/75"
            >
              以诚相予，以心相奉
            </p>
          </div>

          <div className="mt-8 lg:mt-10 flex flex-wrap gap-3.5">
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2.5 bg-[#A42A28] text-white px-6 py-4 font-sans text-[15px] font-semibold hover:bg-[#8a2320] hover:-translate-y-px transition"
            >
              Kenali INTI Kepri <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/bergabung"
              className="inline-flex items-center border border-white/35 text-white px-6 py-4 font-sans text-[15px] font-medium hover:bg-white/10 hover:border-white/70 transition"
            >
              Cara Bergabung
            </Link>
          </div>

          <dl className="mt-9 lg:mt-14 flex flex-wrap">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={
                  i < STATS.length - 1
                    ? "pr-6 mr-6 sm:pr-8 sm:mr-8 border-r border-white/15"
                    : ""
                }
              >
                <dt className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/60">
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-serif text-3xl sm:text-[34px] font-bold">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-content order-first lg:order-none w-[min(62vw,260px)] lg:w-full lg:max-w-none mx-auto lg:mx-0 -mb-2 lg:mb-0 [animation-delay:0.3s]">
          <HeroEmblem />
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pb-7 flex flex-wrap items-center justify-between gap-4">
        {latest ? (
          <Link
            href={`/berita/${latest.slug}`}
            className="group flex items-center gap-3.5 min-w-0 flex-[1_1_420px] max-w-3xl border-t border-white/15 pt-4"
          >
            <span className="flex-shrink-0 bg-[#A42A28] px-2.5 py-1 font-sans text-[10.5px] font-bold tracking-[0.18em]">
              TERBARU
            </span>
            <span className="truncate font-sans text-sm text-white/85 group-hover:text-white transition-colors">
              {latest.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-5" aria-hidden="true">
          <div className="flex gap-1.5">
            {SLIDES.map((src, i) => (
              <span
                key={src}
                className="block w-7 h-[2px] bg-white/20 overflow-hidden"
              >
                <span
                  className="hero-progress block w-full h-full bg-[#D9A56F]"
                  style={{ animationDelay: `${i * SLIDE_SECONDS}s` }}
                />
              </span>
            ))}
          </div>
          <span className="hero-cue hidden lg:flex flex-col items-center font-sans text-[10px] tracking-[0.24em] text-white/60">
            GULIR
            <ArrowDown size={16} />
          </span>
        </div>
      </div>
    </section>
  );
}
