"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SectionHeading from "@/components/SectionHeading";
import { formatDateID } from "@/lib/format";
import { useReveal } from "@/lib/use-reveal";
import type { NewsSummary } from "@/types";

function kicker(n: NewsSummary): string {
  return [n.location, n.organization].filter(Boolean).join(" · ");
}

export default function NewsSection({
  initialItems,
}: {
  initialItems: NewsSummary[];
}) {
  const ref = useReveal<HTMLElement>(".news-reveal", initialItems.length);
  const [featured, ...rest] = initialItems;
  const side = rest.slice(0, 3);

  if (!featured) return null;

  return (
    <section ref={ref} className="bg-white px-4 md:px-8 py-16 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="news-reveal flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-12 pb-5 md:pb-6 border-b border-[#1C1714]">
          <SectionHeading
            index="02"
            label="Berita Terbaru"
            title="Kabar dari kegiatan kami"
          />
          <Link
            href="/berita"
            className="inline-flex items-center gap-2.5 font-sans text-[15px] font-semibold text-[#A42A28] hover:gap-3.5 hover:text-[#7E1F1D] transition-all"
          >
            Semua berita <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-10">
          <Link
            href={`/berita/${featured.slug}`}
            className="news-reveal group flex flex-col min-w-0"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EEE7DD]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
              />
              {kicker(featured) && (
                <span className="absolute left-5 top-5 bg-[#A42A28] text-white font-sans text-[11px] font-bold tracking-[0.16em] uppercase px-2.5 py-1.5">
                  {kicker(featured)}
                </span>
              )}
            </div>
            <h3 className="mt-5 md:mt-6 font-serif text-[1.5rem] md:text-[2.15rem] leading-[1.15] font-bold text-[#1C1714] group-hover:text-[#A42A28] transition-colors text-balance">
              {featured.title}
            </h3>
            {featured.excerpt && (
              <p className="mt-3.5 font-sans text-base leading-[1.7] text-[#4A423C] line-clamp-3">
                {featured.excerpt}
              </p>
            )}
            <p className="mt-4 font-sans text-[13px] text-[#6B6B6B]">
              <time dateTime={featured.date}>
                {formatDateID(featured.date)}
              </time>
              {featured.author && <> · {featured.author}</>}
            </p>
          </Link>

          <div className="flex flex-col min-w-0">
            {side.map((n) => (
              <Link
                key={n.slug}
                href={`/berita/${n.slug}`}
                className="news-reveal group flex gap-5 py-5 first:pt-0 lg:first:pt-5 border-b border-[#E8E0D5]"
              >
                <div className="relative flex-shrink-0 w-28 sm:w-[132px] aspect-[4/3] overflow-hidden bg-[#EEE7DD]">
                  <Image
                    src={n.image}
                    alt=""
                    fill
                    sizes="132px"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <div className="min-w-0">
                  {kicker(n) && (
                    <p className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-[#A42A28]">
                      {kicker(n)}
                    </p>
                  )}
                  <h3 className="mt-2 font-serif text-[17px] sm:text-lg leading-snug font-bold text-[#1C1714] line-clamp-3 group-hover:text-[#A42A28] transition-colors">
                    {n.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-[12.5px] text-[#6B6B6B]">
                    <time dateTime={n.date}>{formatDateID(n.date)}</time>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
