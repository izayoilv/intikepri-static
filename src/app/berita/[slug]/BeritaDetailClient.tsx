"use client";

import { SiFacebook, SiWhatsapp, SiX } from "@icons-pack/react-simple-icons";
import { ArrowLeft, ArrowRight, Calendar, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL } from "@/lib/site";
import type { News } from "@/types";

interface Props {
  news: News | null;
  relatedNews?: News[];
}

export default function BeritaDetailClient({ news, relatedNews = [] }: Props) {
  const item = news || null;

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] pt-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 text-center">
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
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
    <div className="min-h-screen bg-[#F7F7F7]">
      <Breadcrumb
        items={[{ label: "Berita", to: "/berita" }, { label: item.title }]}
      />

      <div className="bg-[#1A1A1A] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-sans text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Berita
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-block bg-[#A42A28] text-white text-xs font-sans px-3 py-1">
              {item.location}
            </span>
            {item.organization && (
              <span className="inline-block border border-white/20 text-white/70 text-xs font-sans px-3 py-1">
                {item.organization}
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-white mb-5 leading-tight">
            {item.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/50 font-sans text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {item.date}
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <User size={14} /> {item.author}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 pb-24 lg:pb-12">
        <div className="lg:flex lg:gap-10">
          <aside className="hidden lg:block flex-shrink-0">
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
                  style={{ "--brand": color } as CSSProperties}
                  className="w-11 h-11 flex items-center justify-center bg-white border border-[#E5E5E5] hover:border-(--brand) hover:bg-[#F7F7F7] transition-colors"
                >
                  <Icon size={18} color={color} />
                </a>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="bg-white border border-[#E5E5E5] overflow-hidden mb-8">
              <div className="relative aspect-[16/9]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <article className="bg-white border border-[#E5E5E5] p-6 md:p-10">
              <div className="prose prose-sm max-w-none text-[#444444] font-sans leading-loose whitespace-pre-line">
                {item.content}
              </div>

              <div className="border-t border-[#E5E5E5] mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="font-sans text-xs text-[#999999]">
                  Ditulis oleh{" "}
                  <span className="text-[#1A1A1A] font-medium">
                    {item.author}
                  </span>{" "}
                  · {item.date}
                </p>
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-xs font-medium hover:gap-3 transition-all"
                >
                  Berita lainnya <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          </div>
        </div>

        {relatedNews.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[#C8956C] font-sans text-xs tracking-[0.3em] uppercase mb-2">
                  Baca Juga
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                  Berita Lainnya
                </h2>
              </div>
              <Link
                href="/berita"
                className="hidden md:inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium hover:gap-3 transition-all"
              >
                Lihat Semua <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/berita/${rel.slug}`}
                  className="group"
                >
                  <div className="bg-white border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#E5E5E5]">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="inline-block bg-[#A42A28]/10 text-[#A42A28] text-xs font-sans px-2 py-1 mb-3">
                          {rel.location}
                        </span>
                        <h3 className="font-serif text-base font-semibold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                          {rel.title}
                        </h3>
                      </div>
                      <p className="text-[#999999] font-sans text-xs flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {rel.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} /> {rel.author}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[#E5E5E5]">
        <div className="flex items-center justify-center gap-2 px-4 py-2.5">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#999999] mr-2">
            Bagikan
          </span>
          {shareLinks.map(({ label, href, Icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ "--brand": color } as CSSProperties}
              className="w-10 h-10 flex items-center justify-center border border-[#E5E5E5] active:border-(--brand) active:bg-[#F7F7F7] transition-colors"
            >
              <Icon size={17} color={color} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
