"use client";

import { SiFacebook, SiWhatsapp, SiX } from "@icons-pack/react-simple-icons";
import parse, { Element } from "html-react-parser";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SITE_URL } from "@/lib/site";
import type { News } from "@/types";

const IMG_SIZES = "(max-width: 896px) 100vw, 672px";

function ArticleContent({ html }: { html: string }) {
  const content = parse(html, {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "img") {
        const { src, alt, class: cls } = domNode.attribs;
        const sizeClass = cls?.includes("img-s")
          ? "img-s"
          : cls?.includes("img-m")
            ? "img-m"
            : "";
        return (
          <div
            key={domNode.attribs.src}
            className={`article-img-wrap ${sizeClass}`}
          >
            <Image
              src={src ?? ""}
              alt={alt ?? ""}
              width={1280}
              height={720}
              sizes={IMG_SIZES}
            />
          </div>
        );
      }
      return domNode;
    },
  });
  return <>{content}</>;
}

interface Props {
  news: News | null;
  relatedNews?: News[];
  contentHtml?: { lede: string; body: string } | null;
}

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function formatDate(raw: string): string {
  const [y, m, d] = (raw || "").split("-");
  if (!y || !m || !d || !MONTHS_ID[Number(m) - 1]) return raw;
  return `${Number(d)} ${MONTHS_ID[Number(m) - 1]} ${y}`;
}

export default function BeritaDetailClient({
  news,
  relatedNews = [],
  contentHtml = null,
}: Props) {
  const item = news || null;

  if (!item) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-20 text-center">
          <h1 className="font-serif text-2xl font-bold text-[#111111] mb-4">
            Berita tidak ditemukan
          </h1>
          <Link href="/berita" className="text-[#A42A28] font-sans text-sm">
            Kembali ke daftar berita
          </Link>
        </div>
      </div>
    );
  }

  const articleUrl = `${SITE_URL}/berita/${item.slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(item.title);

  const shareLinks = [
    {
      label: "Bagikan ke WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      Icon: SiWhatsapp,
      color: "#25D366",
    },
    {
      label: "Bagikan ke Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: SiFacebook,
      color: "#1877F2",
    },
    {
      label: "Bagikan ke X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      Icon: SiX,
      color: "#000000",
    },
    {
      label: "Bagikan via Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      Icon: Mail,
      color: "#A42A28",
    },
  ];

  return (
    <div className="bg-white pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
        <div className="lg:flex lg:gap-10">
          <aside className="hidden lg:block flex-shrink-0 w-11">
            <div className="sticky top-28 flex flex-col items-center gap-2">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#999999] mb-1 [writing-mode:vertical-rl]">
                Bagikan
              </span>
              {shareLinks.map(({ label, href, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-10 h-10 flex items-center justify-center border border-[#E5E5E5] hover:bg-[#F5F5F5] transition-colors"
                >
                  <Icon size={16} color={color} />
                </a>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
              <span className="font-sans text-xs font-bold tracking-[0.18em] uppercase text-[#A42A28]">
                {item.location}
              </span>
              {item.organization && (
                <span className="font-sans text-xs tracking-[0.18em] uppercase text-[#999999]">
                  {item.organization}
                </span>
              )}
            </div>

            <h1 className="font-serif text-[1.75rem] md:text-[2.6rem] font-bold text-[#111111] leading-[1.15] mb-6">
              {item.title}
            </h1>

            <div className="border-y border-[#E5E5E5] py-3.5 mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <div className="font-sans text-sm">
                <p className="text-[#111111] font-bold">Oleh {item.author}</p>
                <p className="text-[#777777] text-xs mt-0.5 flex items-center gap-1.5">
                  <Calendar size={12} />{" "}
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </p>
              </div>
              <div className="flex items-center gap-1.5 lg:hidden">
                {shareLinks.map(({ label, href, Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] active:bg-[#F5F5F5] transition-colors"
                  >
                    <Icon size={15} color={color} />
                  </a>
                ))}
              </div>
            </div>

            <figure className="mb-8">
              <div className="relative aspect-[16/9] bg-[#EEEEEE] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="font-sans text-xs text-[#888888] leading-relaxed mt-2.5">
                {item.title}. (Dok. INTI Kepri)
              </figcaption>
            </figure>

            <article className="max-w-[42rem]">
              {contentHtml?.lede && (
                <div className="article-lede">
                  <ArticleContent html={contentHtml.lede} />
                </div>
              )}
              {contentHtml?.body && (
                <div className="article-body">
                  <ArticleContent html={contentHtml.body} />
                </div>
              )}
              <span className="inline-block w-3 h-3 bg-[#A42A28] mt-2" />
            </article>
          </div>
        </div>
      </div>

      {relatedNews.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 mt-16">
          <div className="border-b-2 border-[#111111] pb-3 mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#111111]">
              Berita Lainnya
            </h2>
            <Link
              href="/berita"
              className="hidden md:inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-semibold hover:gap-3 transition-all"
            >
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
            {relatedNews.map((rel) => (
              <Link
                key={rel.slug}
                href={`/berita/${rel.slug}`}
                className="group flex gap-3 md:block"
              >
                <div className="relative w-[38%] max-w-44 md:w-full md:max-w-none flex-shrink-0 aspect-[16/10] overflow-hidden bg-[#EEEEEE]">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="min-w-0 flex-1 md:mt-3">
                  <span className="inline-block font-sans text-[11px] font-bold tracking-[0.14em] uppercase text-[#A42A28] mb-1.5">
                    {rel.location}
                  </span>
                  <h3 className="font-serif text-base md:text-lg font-bold text-[#111111] leading-snug line-clamp-3 md:line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="font-sans text-xs text-[#777777] mt-2 flex items-center gap-1.5">
                    <Calendar size={12} />{" "}
                    <time dateTime={rel.date}>{formatDate(rel.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{rel.author}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
