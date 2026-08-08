"use client";

import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  MapPin,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { AgendaEvent } from "@/types";

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function monthLabel(iso: string): string {
  const [y, m] = iso.split("-");
  return `${MONTHS_ID[Number(m) - 1] ?? ""} ${y}`;
}

function dayNum(iso: string): string {
  return String(Number(iso.split("-")[2] || 0));
}

function groupByMonth(items: AgendaEvent[]): [string, AgendaEvent[]][] {
  const map = new Map<string, AgendaEvent[]>();
  items.forEach((e) => {
    const key = e.date.slice(0, 7); // YYYY-MM
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  });
  return Array.from(map.entries()).map(([key, events]) => [
    monthLabel(`${key}-01`),
    events,
  ]);
}

export default function AgendaListClient({
  upcoming,
  past,
}: {
  upcoming: AgendaEvent[];
  past: AgendaEvent[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [status, setStatus] = useState<"Semua" | "Akan Datang" | "Sudah Berlangsung">("Semua");

  const all = useMemo(() => [...upcoming, ...past], [upcoming, past]);

  const categories = useMemo(() => {
    const cats = new Set(all.map((e) => (e.category || "").trim()).filter(Boolean));
    return ["Semua", ...Array.from(cats).sort((a, b) => a.localeCompare(b))];
  }, [all]);

  const applyFilters = (items: AgendaEvent[]) =>
    items.filter((e) => {
      const matchCat = category === "Semua" || e.category === category;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        (e.venue || "").toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

  const showUpcoming = status !== "Sudah Berlangsung" ? applyFilters(upcoming) : [];
  const showPast = status !== "Akan Datang" ? applyFilters(past) : [];
  const total = showUpcoming.length + showPast.length;

  const renderTimeline = (items: AgendaEvent[], dimmed: boolean) => (
    <div className="relative border-l border-[#E5E5E5] ml-2 md:ml-4">
      {groupByMonth(items).map(([month, events]) => (
        <div key={month} className="mb-10 last:mb-0">
          <div className="relative mb-5 -ml-[7px]">
            <span className="inline-block w-3 h-3 bg-[#A42A28] rounded-full align-middle" />
            <span className="ml-3 font-sans text-xs tracking-[0.2em] uppercase text-[#999999]">
              {month}
            </span>
          </div>
          <div className="space-y-4 pl-6 md:pl-8">
            {events.map((e) => (
              <Link
                key={e.slug}
                href={`/agenda/${e.slug}`}
                className={`group flex gap-4 md:gap-6 bg-white border border-[#E5E5E5] hover:border-[#A42A28]/40 hover:shadow-lg transition-all p-4 md:p-5 ${
                  dimmed ? "opacity-60 hover:opacity-100" : ""
                }`}
              >
                {/* Blok tanggal */}
                <div className="flex-shrink-0 w-14 text-center border-r border-[#E5E5E5] pr-4">
                  <p className="font-serif text-2xl md:text-3xl font-bold text-[#A42A28] leading-none">
                    {dayNum(e.date)}
                  </p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-[#999999] mt-1">
                    {MONTHS_ID[Number(e.date.split("-")[1]) - 1]?.slice(0, 3)}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {e.category && (
                      <span className="inline-block bg-[#A42A28]/10 text-[#A42A28] text-[10px] font-sans px-2 py-0.5">
                        {e.category}
                      </span>
                    )}
                    {!dimmed && (
                      <span className="inline-block bg-[#C8956C]/15 text-[#C8956C] text-[10px] font-sans px-2 py-0.5">
                        Akan Datang
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-base md:text-lg font-semibold text-[#1A1A1A] line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                    {e.title}
                  </h2>
                  <p className="font-sans text-xs text-[#999999] mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                    {e.time && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {e.time}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {e.venue || e.location}
                    </span>
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="self-center flex-shrink-0 text-[#DDDDDD] group-hover:text-[#A42A28] transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-white min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
            Agenda
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Agenda Kegiatan
          </h1>
          <p className="font-sans text-sm text-[#999999] mt-3 max-w-2xl">
            Jadwal kegiatan INTI Kepulauan Riau — ikuti dan berpartisipasilah.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari agenda atau tempat..."
              className="w-full border border-[#E5E5E5] bg-white pl-9 pr-4 py-2.5 font-sans text-sm text-[#1A1A1A] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#A42A28]"
            />
          </div>
          {categories.length > 2 && (
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-48 appearance-none border border-[#E5E5E5] bg-white pl-3 pr-8 py-2.5 font-sans text-sm text-[#666666] focus:outline-none focus:border-[#A42A28] cursor-pointer"
                aria-label="Filter kategori"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "Semua" ? "Semua Kategori" : cat}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999999] pointer-events-none"
              />
            </div>
          )}
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="w-full md:w-48 appearance-none border border-[#E5E5E5] bg-white pl-3 pr-8 py-2.5 font-sans text-sm text-[#666666] focus:outline-none focus:border-[#A42A28] cursor-pointer"
              aria-label="Filter status"
            >
              <option value="Semua">Semua Status</option>
              <option value="Akan Datang">Akan Datang</option>
              <option value="Sudah Berlangsung">Sudah Berlangsung</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999999] pointer-events-none"
            />
          </div>
        </div>
        <p className="font-sans text-xs text-[#BBBBBB] mb-10">
          {total} agenda ditemukan
        </p>

        {total === 0 ? (
          <div className="text-center py-20">
            <Calendar size={40} className="mx-auto text-[#E5E5E5] mb-4" />
            <p className="text-[#999999] font-sans">
              {all.length === 0
                ? "Belum ada agenda terjadwal."
                : "Tidak ada agenda yang cocok."}
            </p>
          </div>
        ) : (
          <>
            {showUpcoming.length > 0 && renderTimeline(showUpcoming, false)}
            {showPast.length > 0 && (
              <div className={showUpcoming.length > 0 ? "mt-16" : ""}>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#BBBBBB] mb-6">
                  Sudah Berlangsung
                </p>
                {renderTimeline(showPast, true)}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
