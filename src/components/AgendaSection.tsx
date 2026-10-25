"use client";

import { ArrowRight, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { isAgendaVisible, sortAgenda } from "@/lib/agenda";
import { dayMonthShortID } from "@/lib/format";
import { useNow } from "@/lib/use-now";
import { useReveal } from "@/lib/use-reveal";
import type { AgendaEvent } from "@/types";

export default function AgendaSection({
  initialItems,
}: {
  initialItems: AgendaEvent[];
}) {
  const now = useNow();

  const events = useMemo(() => {
    const visible = now
      ? sortAgenda(initialItems.filter((e) => isAgendaVisible(e, now)))
      : sortAgenda(initialItems);
    return visible.slice(0, 3);
  }, [initialItems, now]);

  const ref = useReveal<HTMLElement>(".agenda-reveal", events.length);

  if (events.length === 0) return null;

  return (
    <section ref={ref} className="py-14 md:py-20 bg-[#FAF6EF]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="agenda-reveal flex items-end justify-between mb-8">
          <div>
            <p className="text-[#8F6440] font-sans text-sm tracking-[0.3em] uppercase mb-2">
              Agenda
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">
              Kegiatan Terdekat
            </h2>
          </div>
          <Link
            href="/agenda"
            className="hidden sm:inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium hover:gap-3 transition-all flex-shrink-0"
          >
            Semua Agenda <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative border-l border-[#DDDDDD] ml-1.5">
          {events.map((e) => {
            const { day, month } = dayMonthShortID(e.date);
            return (
              <Link
                key={e.slug}
                href={`/agenda/${e.slug}`}
                className="agenda-reveal group relative flex items-center gap-4 md:gap-5 pl-5 md:pl-6 py-3.5"
              >
                <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#A42A28] rounded-full ring-4 ring-[#FAF6EF] group-hover:scale-125 transition-transform" />

                <time
                  dateTime={e.date}
                  className="flex-shrink-0 w-12 bg-white border border-[#E5E5E5] group-hover:border-[#A42A28]/40 transition-colors text-center py-1.5"
                >
                  <p className="font-serif text-lg font-bold text-[#A42A28] leading-none">
                    {day}
                  </p>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-[#6B6B6B] mt-0.5">
                    {month}
                  </p>
                </time>

                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-base md:text-lg font-semibold text-[#1A1A1A] truncate group-hover:text-[#A42A28] transition-colors">
                    {e.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6B6B6B] mt-0.5 flex items-center gap-x-3 gap-y-0.5 truncate">
                    {e.start_time && (
                      <span className="flex items-center gap-1 flex-shrink-0">
                        <Clock size={11} /> {e.start_time}
                        {e.end_time ? ` – ${e.end_time}` : ""}
                      </span>
                    )}
                    <span className="flex items-center gap-1 truncate">
                      <MapPin size={11} className="flex-shrink-0" />
                      <span className="truncate">{e.venue || e.location}</span>
                    </span>
                  </p>
                </div>

                <ArrowRight
                  size={15}
                  className="flex-shrink-0 text-[#CCCCCC] group-hover:text-[#A42A28] group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            );
          })}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/agenda"
            className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium"
          >
            Semua Agenda <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
