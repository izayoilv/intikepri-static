"use client";

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";

import Breadcrumb from "@/components/Breadcrumb";
import type { AgendaEvent } from "@/types";

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_ID[m - 1] ?? ""} ${y}`;
}

// CTA partisipasi — bentuk tombol ditentukan field ctaType dari CMS
function resolveCta(e: AgendaEvent): { href: string; external: boolean } | null {
  if (!e.ctaType || !e.ctaUrl) return null;
  if (e.ctaType === "link") return { href: e.ctaUrl, external: true };
  if (e.ctaType === "whatsapp") {
    const text = encodeURIComponent(
      `Halo, saya ingin berpartisipasi dalam agenda "${e.title}" (${e.date}).`,
    );
    return {
      href: `https://wa.me/${e.ctaUrl.replace(/\D/g, "")}?text=${text}`,
      external: true,
    };
  }
  return {
    href: `mailto:${e.ctaUrl}?subject=${encodeURIComponent(`Partisipasi: ${e.title}`)}`,
    external: false,
  };
}

export default function AgendaDetailClient({
  event,
  related = [],
}: {
  event: AgendaEvent | null;
  related?: AgendaEvent[];
}) {
  if (!event) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] pt-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 text-center">
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
            Agenda tidak ditemukan
          </h1>
          <Link href="/agenda" className="text-[#A42A28] font-sans text-sm">
            Kembali ke daftar agenda
          </Link>
        </div>
      </div>
    );
  }

  const cta = resolveCta(event);
  const dateText = event.endDate
    ? `${formatDate(event.date)} – ${formatDate(event.endDate)}`
    : formatDate(event.date);

  const infoGrid = [
    { Icon: Calendar, label: "Tanggal", value: dateText },
    ...(event.time ? [{ Icon: Clock, label: "Waktu", value: event.time }] : []),
    {
      Icon: MapPin,
      label: "Tempat",
      value: event.venue ? `${event.venue}, ${event.location}` : event.location,
    },
    ...(event.organization
      ? [{ Icon: Users, label: "Penyelenggara", value: event.organization }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* HERO */}
      <div className="bg-[#1A1A1A] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link
            href="/agenda"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-sans text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Agenda
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {event.category && (
              <span className="inline-block bg-[#A42A28] text-white text-xs font-sans px-3 py-1">
                {event.category}
              </span>
            )}
            <span className="inline-block border border-white/20 text-white/70 text-xs font-sans px-3 py-1">
              {event.location}
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-white mb-5 leading-tight">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/50 font-sans text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {dateText}
            </span>
            {event.time && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {event.time}
              </span>
            )}
          </div>
        </div>
      </div>
      <Breadcrumb
        items={[{ label: "Agenda", to: "/agenda" }, { label: event.title }]}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* INFO + CTA */}
        <div className="bg-white border border-[#E5E5E5] border-t-2 border-t-[#A42A28] p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {infoGrid.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 flex-shrink-0 bg-[#A42A28]/10 flex items-center justify-center">
                  <Icon size={16} className="text-[#A42A28]" />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#999999]">
                    {label}
                  </p>
                  <p className="font-sans text-sm text-[#1A1A1A] font-medium mt-0.5">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {cta && (
            <div className="border-t border-[#E5E5E5] mt-6 pt-6">
              <a
                href={cta.href}
                {...(cta.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 bg-[#A42A28] text-white px-6 py-3 font-sans text-sm font-semibold hover:bg-[#8a2320] transition-colors"
              >
                {event.ctaLabel || "Daftar / Partisipasi"} <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>

        {/* FOTO + DESKRIPSI: satu blok menyatu, foto flush ke tepi kartu
            (bukan foto yang "dimasukkan" ke dalam kotak) */}
        <article className="bg-white border border-[#E5E5E5] overflow-hidden">
          {event.image && (
            <div
              className="aspect-[16/9] bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
              role="img"
              aria-label={`Foto ${event.title}`}
            />
          )}
          <div className="p-6 md:p-10">
            <div className="prose prose-sm max-w-none text-[#444444] font-sans leading-loose whitespace-pre-line">
              {event.description}
            </div>
          </div>
        </article>

        {/* AGENDA LAINNYA */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[#C8956C] font-sans text-xs tracking-[0.3em] uppercase mb-2">
                  Jangan Lewatkan
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                  Agenda Lainnya
                </h2>
              </div>
              <Link
                href="/agenda"
                className="hidden md:inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium hover:gap-3 transition-all"
              >
                Lihat Semua <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/agenda/${rel.slug}`} className="group">
                  <div className="bg-white border border-[#E5E5E5] hover:shadow-lg transition-shadow h-full p-5">
                    <p className="font-sans text-xs text-[#999999] flex items-center gap-1.5 mb-3">
                      <Calendar size={12} className="text-[#C8956C]" />
                      {formatDate(rel.date)}
                    </p>
                    <h3 className="font-serif text-base font-semibold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="font-sans text-xs text-[#999999] flex items-center gap-1">
                      <MapPin size={12} /> {rel.venue || rel.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
