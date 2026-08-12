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
import { useMemo } from "react";

import Breadcrumb from "@/components/Breadcrumb";
import { agendaStatus, isAgendaVisible, sortAgenda } from "@/lib/agenda";
import { useNow } from "@/lib/use-now";
import type { AgendaEvent } from "@/types";

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

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_ID[m - 1] ?? ""} ${y}`;
}

export default function AgendaDetailClient({
  event,
  all = [],
}: {
  event: AgendaEvent | null;
  all?: AgendaEvent[];
}) {
  const now = useNow();

  const related = useMemo(() => {
    if (!event) return [];
    const others = now
      ? sortAgenda(
          all.filter((e) => e.slug !== event.slug && isAgendaVisible(e, now)),
        )
      : sortAgenda(all.filter((e) => e.slug !== event.slug));
    return others.slice(0, 3);
  }, [all, event, now]);

  const isPast = now && event ? agendaStatus(event, now) === "past" : false;

  if (!event || isPast) {
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

  const timeText = event.end_time
    ? `${event.start_time} – ${event.end_time}`
    : event.start_time;

  const infoGrid = [
    {
      Icon: Calendar,
      label: "Tanggal",
      value: <time dateTime={event.date}>{formatDate(event.date)}</time>,
    },
    ...(event.start_time
      ? [{ Icon: Clock, label: "Waktu", value: timeText }]
      : []),
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
      <Breadcrumb
        items={[{ label: "Agenda", to: "/agenda" }, { label: event.title }]}
      />

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
              <Calendar size={14} />{" "}
              <time dateTime={event.date}>{formatDate(event.date)}</time>
            </span>
            {event.start_time && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {timeText}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
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
        </div>

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
                <Link
                  key={rel.slug}
                  href={`/agenda/${rel.slug}`}
                  className="group"
                >
                  <div className="bg-white border border-[#E5E5E5] hover:shadow-lg transition-shadow h-full p-5">
                    <p className="font-sans text-xs text-[#999999] flex items-center gap-1.5 mb-3">
                      <Calendar size={12} className="text-[#C8956C]" />
                      <time dateTime={rel.date}>{formatDate(rel.date)}</time>
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
