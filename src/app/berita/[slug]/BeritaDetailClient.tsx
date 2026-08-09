"use client";

import {
  SiFacebook,
  SiWhatsapp,
  SiX,
} from "@icons-pack/react-simple-icons";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { News } from "@/types";

interface Props {
  news: News | null;
  relatedNews?: News[];
}

// Ganti dengan domain final website kamu (dipakai untuk URL share)
const SITE_URL = "https://intikepri.com";

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatDate(raw: string): string {
  const [y, m, d] = (raw || "").split("-");
  if (!y || !m || !d || !MONTHS_ID[Number(m) - 1]) return raw;
  return `${Number(d)} ${MONTHS_ID[Number(m) - 1]} ${y}`;
}

export default function BeritaDetailClient({ news, relatedNews = [] }: Props) {
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

  // Semua share pakai anchor <a> biasa — tanpa JavaScript sama sekali.
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

  // Paragraf pertama jadi lede (lead paragraph) ala artikel berita
  const paragraphs = (item.content || "")
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const lede = paragraphs[0] || "";
  const bodyParagraphs = paragraphs.slice(1);

  return (
    <div className="bg-white pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
        <div className="lg:flex lg:gap-10">
          {/* Share rail — DESKTOP: sticky di samping artikel (ala CNN) */}
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
            {/* Kicker rubrik */}
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

            {/* Judul */}
            <h1 className="font-serif text-[1.75rem] md:text-[2.6rem] font-bold text-[#111111] leading-[1.15] mb-6">
              {item.title}
            </h1>

            {/* Byline + share (mobile) */}
            <div className="border-y border-[#E5E5E5] py-3.5 mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <div className="font-sans text-sm">
                <p className="text-[#111111] font-bold">
                  Oleh {item.author}
                </p>
                <p className="text-[#777777] text-xs mt-0.5 flex items-center gap-1.5">
                  <Calendar size={12} /> {formatDate(item.date)}
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

            {/* Foto utama + keterangan */}
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

            {/* Isi artikel */}
            <article className="max-w-[42rem]">
              {lede && (
                <p className="font-sans text-lg md:text-xl font-medium text-[#111111] leading-relaxed mb-6">
                  {lede}
                </p>
              )}
              {bodyParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-sans text-base md:text-[1.05rem] text-[#1A1A1A] leading-loose mb-5"
                >
                  {p}
                </p>
              ))}
              {/* Endmark ala artikel media */}
              <span className="inline-block w-3 h-3 bg-[#A42A28] mt-2" />
            </article>
          </div>
        </div>
      </div>

      {/* BERITA LAINNYA */}
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
                    <Calendar size={12} /> {formatDate(rel.date)}
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
