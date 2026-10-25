"use client";

import Fuse from "fuse.js";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { formatDateID } from "@/lib/format";
import { NEWS_PAGE_SIZE as PAGE_SIZE } from "@/lib/site";
import type { NewsSummary } from "@/types";

function Meta({
  item,
  showAuthor = true,
}: {
  item: NewsSummary;
  showAuthor?: boolean;
}) {
  return (
    <p className="font-sans text-xs flex items-center gap-1.5 text-[#6B6B6B] min-w-0">
      <Calendar size={12} className="flex-shrink-0" aria-hidden="true" />
      <time dateTime={item.date} className="whitespace-nowrap">
        {formatDateID(item.date)}
      </time>
      {showAuthor && item.author && (
        <>
          <span aria-hidden="true">·</span>
          <span className="truncate">{item.author}</span>
        </>
      )}
    </p>
  );
}

const PAGER_BTN =
  "inline-flex w-10 h-10 items-center justify-center border border-[#DDDDDD] text-[#333333] disabled:opacity-30 hover:border-[#111111]";

function pageHref(n: number): Route {
  return (n <= 1 ? "/berita" : `/berita/halaman/${n}`) as Route;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-sans text-[11px] font-bold tracking-[0.14em] uppercase text-[#A42A28]">
      {children}
    </span>
  );
}

export default function BeritaListClient({
  initialItems,
  initialPage = 1,
  locations,
  organizations,
}: {
  initialItems: NewsSummary[];
  initialPage?: number;
  locations: string[];
  organizations: string[];
}) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Semua");
  const [organization, setOrganization] = useState("Semua");
  const [page, setPage] = useState(initialPage);

  const fuse = useMemo(
    () =>
      new Fuse(initialItems, {
        keys: ["title"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [initialItems],
  );

  const filtered = useMemo(() => {
    const base = search.trim()
      ? fuse.search(search).map((r) => r.item)
      : initialItems;
    return base.filter((n) => {
      const matchLoc = location === "Semua" || n.location === location;
      const matchOrg =
        organization === "Semua" || n.organization === organization;
      return matchLoc && matchOrg;
    });
  }, [fuse, search, initialItems, location, organization]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const items = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const filtersActive =
    search.trim() !== "" || location !== "Semua" || organization !== "Semua";
  const isFrontPage = currentPage === 1 && !filtersActive;

  const lead = isFrontPage ? items[0] : null;
  const secondary = isFrontPage ? items.slice(1, 4) : [];
  const rest = isFrontPage ? items.slice(4) : items;

  const resetPage = () => setPage(1);

  return (
    <section className="py-10 md:py-14 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="border-b-2 border-[#111111] pb-4 mb-6">
          <p className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-[#A42A28] mb-1.5">
            Berita
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#111111]">
            Berita & Kegiatan
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              placeholder="Cari berita..."
              aria-label="Cari berita"
              className="w-full border border-[#DDDDDD] bg-white pl-9 pr-4 py-2.5 font-sans text-sm text-[#111111] placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#111111]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:flex">
            <div className="relative">
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  resetPage();
                }}
                className="w-full md:w-48 appearance-none border border-[#DDDDDD] bg-white pl-3 pr-8 py-2.5 font-sans text-sm text-[#333333] focus:outline-none focus:border-[#111111] cursor-pointer"
                aria-label="Filter lokasi"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "Semua" ? "Semua Lokasi" : loc}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] pointer-events-none"
              />
            </div>
            <div className="relative">
              <select
                value={organization}
                onChange={(e) => {
                  setOrganization(e.target.value);
                  resetPage();
                }}
                className="w-full md:w-48 appearance-none border border-[#DDDDDD] bg-white pl-3 pr-8 py-2.5 font-sans text-sm text-[#333333] focus:outline-none focus:border-[#111111] cursor-pointer"
                aria-label="Filter organisasi"
              >
                {organizations.map((org) => (
                  <option key={org} value={org}>
                    {org === "Semua" ? "Semua Organisasi" : org}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] pointer-events-none"
              />
            </div>
          </div>
        </div>
        <p className="font-sans text-xs text-[#6B6B6B] mb-8" aria-live="polite">
          {filtered.length} berita ditemukan
        </p>

        {items.length === 0 ? (
          <p className="text-center text-[#6B6B6B] font-sans py-20">
            Tidak ada berita yang cocok.
          </p>
        ) : (
          <>
            {lead && (
              <Link
                href={`/berita/${lead.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pb-8 mb-8 border-b border-[#E5E5E5]"
              >
                <div className="relative lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#EEEEEE]">
                  <Image
                    src={lead.image}
                    alt={lead.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Kicker>{lead.location}</Kicker>
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#6B6B6B]">
                      {lead.organization}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-[2rem] font-bold text-[#111111] leading-[1.2] mb-3 group-hover:text-[#A42A28] transition-colors">
                    {lead.title}
                  </h2>
                  <p className="font-sans text-sm md:text-[15px] text-[#444444] leading-relaxed mb-4 line-clamp-3">
                    {lead.excerpt}
                  </p>
                  <Meta item={lead} />
                </div>
              </Link>
            )}

            {secondary.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 pb-8 mb-2 border-b border-[#E5E5E5]">
                {secondary.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/berita/${item.slug}`}
                    className="group flex gap-3 md:block"
                  >
                    <div className="relative w-[38%] max-w-44 md:w-full md:max-w-none flex-shrink-0 aspect-[16/10] overflow-hidden bg-[#EEEEEE]">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 38vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="min-w-0 flex-1 md:mt-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Kicker>{item.location}</Kicker>
                      </div>
                      <h2 className="font-serif text-base md:text-lg font-bold text-[#111111] leading-snug line-clamp-3 md:line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                        {item.title}
                      </h2>
                      <div className="mt-2">
                        <Meta item={item} showAuthor={false} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div className={isFrontPage ? "mt-8" : ""}>
                {isFrontPage && (
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-[#111111] mb-2 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-[#A42A28] flex-shrink-0" />
                    Berita Lainnya
                  </h2>
                )}
                <div>
                  {rest.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/berita/${item.slug}`}
                      className="group flex gap-4 py-5 border-b border-[#E5E5E5]"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Kicker>{item.location}</Kicker>
                          <span className="font-sans text-[11px] uppercase tracking-wider text-[#6B6B6B]">
                            {item.organization}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg md:text-xl font-bold text-[#111111] leading-snug line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                          {item.title}
                        </h3>
                        <p className="hidden md:block font-sans text-sm text-[#555555] leading-relaxed mt-1.5 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="mt-2">
                          <Meta item={item} showAuthor={false} />
                        </div>
                      </div>
                      <div className="relative w-28 sm:w-40 md:w-52 flex-shrink-0 aspect-[16/10] overflow-hidden bg-[#EEEEEE] self-start">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="208px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Navigasi halaman berita"
            className="flex items-center justify-center gap-4 mt-12"
          >
            {filtersActive ? (
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={PAGER_BTN}
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
            ) : currentPage > 1 ? (
              <Link
                href={pageHref(currentPage - 1)}
                className={PAGER_BTN}
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </Link>
            ) : (
              <span className={`${PAGER_BTN} opacity-30`} aria-hidden="true">
                <ChevronLeft size={16} />
              </span>
            )}
            <span className="font-sans text-sm text-[#333333]">
              Halaman {currentPage} dari {totalPages}
            </span>
            {filtersActive ? (
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={PAGER_BTN}
                aria-label="Halaman berikutnya"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            ) : currentPage < totalPages ? (
              <Link
                href={pageHref(currentPage + 1)}
                className={PAGER_BTN}
                aria-label="Halaman berikutnya"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            ) : (
              <span className={`${PAGER_BTN} opacity-30`} aria-hidden="true">
                <ChevronRight size={16} />
              </span>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
