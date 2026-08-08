"use client";

import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Play,
  Search,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { DocumentItem, VideoItem } from "@/types";

const DOC_PAGE_SIZE = 8;

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
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${Number(d)} ${MONTHS_ID[Number(m) - 1]} ${y}`;
}

function ytThumb(id: string, quality: "maxres" | "hq"): string {
  return `https://img.youtube.com/vi/${id}/${quality === "maxres" ? "maxresdefault" : "hqdefault"}.jpg`;
}

export default function PustakaClient({
  videos,
  documents,
}: {
  videos: VideoItem[];
  documents: DocumentItem[];
}) {
  const [tab, setTab] = useState<"video" | "dokumen">("video");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [playing, setPlaying] = useState<VideoItem | null>(null);
  const [previewing, setPreviewing] = useState<DocumentItem | null>(null);

  const filteredVideos = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        (v.description || "").toLowerCase().includes(q) ||
        (v.category || "").toLowerCase().includes(q),
    );
  }, [videos, search]);

  const filteredDocs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        (d.description || "").toLowerCase().includes(q) ||
        (d.author || "").toLowerCase().includes(q) ||
        (d.category || "").toLowerCase().includes(q),
    );
  }, [documents, search]);

  const isVideo = tab === "video";

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDocs.length / DOC_PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const pageDocs = filteredDocs.slice(
    (currentPage - 1) * DOC_PAGE_SIZE,
    currentPage * DOC_PAGE_SIZE,
  );
  const featured = isVideo ? filteredVideos[0] : null;
  const gridVideos = isVideo ? filteredVideos.slice(1) : [];

  useEffect(() => {
    if (!playing && !previewing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPlaying(null);
        setPreviewing(null);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [playing, previewing]);

  return (
    <section className="py-16 md:py-24 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
            Pustaka
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Pustaka & Media
          </h1>
          <p className="font-sans text-sm text-[#999999] mt-3 max-w-2xl">
            Rekaman kegiatan dan dokumen resmi INTI Kepulauan Riau: makalah,
            laporan, dan publikasi yang bisa diakses publik.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
          <div className="inline-flex border border-[#E5E5E5] flex-shrink-0">
            <button
              onClick={() => {
                setTab("video");
                setPage(1);
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 font-sans text-sm transition-colors ${
                isVideo
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white text-[#666666] hover:text-[#1A1A1A]"
              }`}
              aria-pressed={isVideo}
            >
              <Play size={14} /> Video
              <span className={isVideo ? "text-white/60" : "text-[#BBBBBB]"}>
                ({videos.length})
              </span>
            </button>
            <button
              onClick={() => {
                setTab("dokumen");
                setPage(1);
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 font-sans text-sm border-l border-[#E5E5E5] transition-colors ${
                !isVideo
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white text-[#666666] hover:text-[#1A1A1A]"
              }`}
              aria-pressed={!isVideo}
            >
              <FileText size={14} /> Dokumen
              <span className={!isVideo ? "text-white/60" : "text-[#BBBBBB]"}>
                ({documents.length})
              </span>
            </button>
          </div>
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={
                isVideo ? "Cari video..." : "Cari dokumen, penulis..."
              }
              className="w-full border border-[#E5E5E5] bg-white pl-9 pr-4 py-2.5 font-sans text-sm text-[#1A1A1A] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#A42A28]"
            />
          </div>
        </div>

        {isVideo && (
          <>
            {filteredVideos.length === 0 ? (
              <div className="text-center py-20">
                <Play size={40} className="mx-auto text-[#E5E5E5] mb-4" />
                <p className="text-[#999999] font-sans">
                  {videos.length === 0
                    ? "Belum ada video yang dipublikasikan."
                    : "Tidak ada video yang cocok."}
                </p>
              </div>
            ) : (
              <>
                {featured && (
                  <button
                    onClick={() => setPlaying(featured)}
                    className="group relative w-full aspect-video max-h-[480px] bg-[#1A1A1A] overflow-hidden mb-6 text-left"
                    aria-label={`Putar video: ${featured.title}`}
                  >
                    <Image
                      src={ytThumb(featured.youtubeId, "maxres")}
                      onError={(e) => {
                        e.currentTarget.src = ytThumb(featured.youtubeId, "hq");
                      }}
                      alt={featured.title}
                      fill
                      sizes="100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#A42A28] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={26} className="ml-1" />
                    </span>
                    {featured.duration && (
                      <span className="absolute bottom-3 right-3 bg-black/70 text-white font-sans text-[10px] px-2 py-0.5">
                        {featured.duration}
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 p-5 md:p-6 max-w-2xl">
                      {featured.category && (
                        <span className="inline-block bg-[#A42A28] text-white font-sans text-[10px] tracking-wider uppercase px-2 py-0.5 mb-2">
                          {featured.category}
                        </span>
                      )}
                      <h2 className="font-serif text-xl md:text-2xl font-bold text-white leading-snug">
                        {featured.title}
                      </h2>
                      <p className="font-sans text-xs text-white/70 mt-1.5 flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(featured.date)}
                      </p>
                    </div>
                  </button>
                )}

                {gridVideos.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gridVideos.map((v) => (
                      <button
                        key={v.youtubeId}
                        onClick={() => setPlaying(v)}
                        className="group text-left"
                        aria-label={`Putar video: ${v.title}`}
                      >
                        <div className="relative aspect-video bg-[#1A1A1A] overflow-hidden">
                          <Image
                            src={ytThumb(v.youtubeId, "hq")}
                            alt={v.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="w-11 h-11 bg-[#A42A28]/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                              <Play size={18} className="ml-0.5" />
                            </span>
                          </span>
                          {v.duration && (
                            <span className="absolute bottom-2 right-2 bg-black/70 text-white font-sans text-[10px] px-1.5 py-0.5">
                              {v.duration}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-base font-semibold text-[#1A1A1A] leading-snug mt-3 line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                          {v.title}
                        </h3>
                        <p className="font-sans text-xs text-[#999999] mt-1 flex items-center gap-1">
                          <Calendar size={11} /> {formatDate(v.date)}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {!isVideo && (
          <>
            {filteredDocs.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen size={40} className="mx-auto text-[#E5E5E5] mb-4" />
                <p className="text-[#999999] font-sans">
                  {documents.length === 0
                    ? "Belum ada dokumen yang dipublikasikan."
                    : "Tidak ada dokumen yang cocok."}
                </p>
              </div>
            ) : (
              <div className="max-w-5xl space-y-4">
                {pageDocs.map((doc, i) => (
                  <button
                    key={`${doc.title}-${i}`}
                    onClick={() => setPreviewing(doc)}
                    className="group bg-white border border-[#E5E5E5] hover:shadow-lg transition-shadow flex gap-4 md:gap-5 p-4 md:p-5 w-full text-left"
                  >
                    <div className="flex-shrink-0 w-24 sm:w-28 aspect-[3/4] bg-[#F7F7F7] border border-[#DDDDDD] overflow-hidden flex flex-col items-center justify-center">
                      <FileText size={28} className="text-[#C8956C]" />
                      <span className="font-sans text-[9px] tracking-widest uppercase text-[#BBBBBB] mt-1">
                        PDF
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h2 className="font-serif text-lg md:text-xl font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#A42A28] transition-colors">
                          {doc.title}
                        </h2>
                        {doc.category && (
                          <span className="bg-[#A42A28]/10 text-[#A42A28] font-sans text-[10px] px-2 py-0.5">
                            {doc.category}
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-xs text-[#999999] mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="flex items-center gap-1">
                          <User size={11} /> {doc.author}
                        </span>
                        <span className="w-1 h-1 bg-[#DDDDDD] rounded-full" />
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {formatDate(doc.date)}
                        </span>
                        {doc.pages && (
                          <>
                            <span className="w-1 h-1 bg-[#DDDDDD] rounded-full" />
                            <span>{doc.pages} hal.</span>
                          </>
                        )}
                        {doc.size && (
                          <>
                            <span className="w-1 h-1 bg-[#DDDDDD] rounded-full" />
                            <span>{doc.size}</span>
                          </>
                        )}
                      </p>
                      {doc.description && (
                        <p className="mt-1.5 font-sans text-sm text-[#666666] leading-relaxed line-clamp-2">
                          {doc.description}
                        </p>
                      )}
                      <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[#A42A28] font-sans text-xs font-semibold group-hover:gap-2.5 transition-all">
                        <FileText size={13} /> Baca PDF <ArrowRight size={12} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-[#E5E5E5] text-[#666666] disabled:opacity-30 hover:border-[#A42A28]/40"
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="font-sans text-sm text-[#666666]">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#E5E5E5] text-[#666666] disabled:opacity-30 hover:border-[#A42A28]/40"
                  aria-label="Halaman berikutnya"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {playing && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Putar video: ${playing.title}`}
          onClick={() => setPlaying(null)}
        >
          <div
            className="w-full max-w-4xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 bg-[#1A1A1A]">
              <p className="font-sans text-sm text-white/80 truncate">
                {playing.title}
              </p>
              <button
                onClick={() => setPlaying(null)}
                className="p-1.5 text-white/60 hover:text-white transition-colors flex-shrink-0"
                aria-label="Tutup pemutar"
              >
                <X size={18} />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${playing.youtubeId}?autoplay=1&rel=0`}
                title={playing.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
      {previewing && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau dokumen: ${previewing.title}`}
          onClick={() => setPreviewing(null)}
        >
          <div
            className="w-full max-w-4xl bg-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 bg-[#1A1A1A]">
              <p className="font-sans text-sm text-white/80 truncate">
                {previewing.title}
              </p>
              <div className="flex items-center gap-4 flex-shrink-0">
                <a
                  href={previewing.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-white/60 hover:text-white transition-colors"
                >
                  Buka di tab baru
                </a>
                <button
                  onClick={() => setPreviewing(null)}
                  className="p-1.5 text-white/60 hover:text-white transition-colors"
                  aria-label="Tutup pratinjau"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe
              src={previewing.fileUrl}
              title={previewing.title}
              className="w-full h-[70vh] bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
}
