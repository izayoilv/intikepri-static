"use client";

import { SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  Search,
  Store,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { Business } from "@/types";

const PAGE_SIZE = 6;

const DAFTAR_HREF = `mailto:perhimpunanintikepri@gmail.com?subject=${encodeURIComponent(
  "Pendaftaran Direktori Bisnis — INTI Kepri",
)}&body=${encodeURIComponent(
  `Halo Admin INTI Kepri,

Saya ingin mendaftarkan bisnis saya ke Direktori Bisnis:

Nama Bisnis:
Kategori:
Nama Pemilik:
Lokasi (Kota/Kabupaten):
Alamat:
Telepon / WhatsApp:
Email:
Website / Instagram:
Deskripsi singkat:

(Lampirkan logo atau foto usaha jika ada.)

Terima kasih.`,
)}`;

// Foto utama kartu: banner (foto tempat usaha) -> logo -> placeholder
function businessPhoto(biz: Business): string | null {
  return biz.banner || biz.image || null;
}

export default function DirektoriListClient({
  initialItems,
}: {
  initialItems: Business[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [location, setLocation] = useState("Semua");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Business | null>(null);

  // Kategori & lokasi diturunkan otomatis dari data CMS
  const categories = useMemo(() => {
    const cats = new Set(initialItems.map((b) => (b.category || "Lainnya").trim()));
    return ["Semua", ...Array.from(cats).sort((a, b) => a.localeCompare(b))];
  }, [initialItems]);

  const locations = useMemo(() => {
    const locs = new Set(initialItems.map((b) => (b.location || "").trim()).filter(Boolean));
    return ["Semua", ...Array.from(locs).sort((a, b) => a.localeCompare(b))];
  }, [initialItems]);

  // Urutan: unggulan selalu di atas, sisanya mengikuti urutan CMS
  const sorted = useMemo(
    () =>
      [...initialItems].sort(
        (a, b) => Number(b.featured || false) - Number(a.featured || false),
      ),
    [initialItems],
  );

  const filtered = useMemo(() => {
    return sorted.filter((b) => {
      const matchCat = category === "Semua" || (b.category || "Lainnya") === category;
      const matchLoc = location === "Semua" || b.location === location;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        (b.category || "").toLowerCase().includes(q) ||
        (b.owner || "").toLowerCase().includes(q);
      return matchCat && matchLoc && matchSearch;
    });
  }, [sorted, search, category, location]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const items = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Kunci scroll body + Esc untuk modal
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="py-16 md:py-24 bg-white min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Direktori
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              Direktori Bisnis
            </h1>
            <p className="font-sans text-sm text-[#999999] mt-3 max-w-2xl">
              Usaha dan UMKM dari anggota serta komunitas INTI Kepulauan Riau.
              Dukung bisnis sesama anggota komunitas.
            </p>
          </div>
          <a
            href={DAFTAR_HREF}
            className="inline-flex items-center gap-2 bg-[#A42A28] text-white px-5 py-3 font-sans text-sm font-medium hover:bg-[#8a2320] transition-colors flex-shrink-0"
          >
            <Mail size={16} /> Daftarkan Bisnis Anda
          </a>
        </div>

        {/* Toolbar: search + dropdown filter, satu baris ramping */}
        <div className="flex flex-col md:flex-row gap-3 mb-3">
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
              placeholder="Cari bisnis..."
              className="w-full border border-[#E5E5E5] bg-white pl-9 pr-4 py-2.5 font-sans text-sm text-[#1A1A1A] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#A42A28]"
            />
          </div>
          {categories.length > 2 && (
            <div className="relative">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full md:w-52 appearance-none border border-[#E5E5E5] bg-white pl-3 pr-8 py-2.5 font-sans text-sm text-[#666666] focus:outline-none focus:border-[#A42A28] cursor-pointer"
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
          {locations.length > 2 && (
            <div className="relative">
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setPage(1);
                }}
                className="w-full md:w-52 appearance-none border border-[#E5E5E5] bg-white pl-3 pr-8 py-2.5 font-sans text-sm text-[#666666] focus:outline-none focus:border-[#A42A28] cursor-pointer"
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
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999999] pointer-events-none"
              />
            </div>
          )}
        </div>
        <p className="font-sans text-xs text-[#BBBBBB] mb-8">
          {filtered.length} bisnis ditemukan
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Store size={40} className="mx-auto text-[#E5E5E5] mb-4" />
            <p className="text-[#999999] font-sans mb-6">
              {initialItems.length === 0
                ? "Belum ada bisnis terdaftar. Jadilah yang pertama!"
                : "Tidak ada bisnis yang cocok."}
            </p>
            {initialItems.length === 0 && (
              <a
                href={DAFTAR_HREF}
                className="inline-flex items-center gap-2 text-[#A42A28] font-sans text-sm font-medium"
              >
                <Mail size={16} /> Daftarkan bisnis Anda via email
              </a>
            )}
          </div>
        ) : (
          /* SATU BISNIS = SATU ROW: foto besar di kiri + shade gradient, konten di kanan */
          <div className="space-y-4">
            {items.map((biz, i) => {
              const photo = businessPhoto(biz);
              return (
                <div
                  key={`${biz.name}-${i}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(biz)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelected(biz);
                  }}
                  className="group bg-white border border-[#E5E5E5] hover:shadow-lg transition-shadow flex flex-col sm:flex-row cursor-pointer overflow-hidden"
                  aria-label={`Lihat detail ${biz.name}`}
                >
                  {/* Foto dominan tapi ramping — nge-blend ke putih ke arah konten
                      (ke kanan di desktop, ke bawah di mobile) */}
                  <div className="relative sm:w-56 md:w-64 flex-shrink-0 aspect-[16/9] sm:aspect-auto sm:min-h-[132px] bg-[#F7F7F7] overflow-hidden">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photo}
                        alt={`Foto ${biz.name}`}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Store size={30} className="text-[#DDDDDD]" />
                      </div>
                    )}
                    <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent from-45% to-white" />
                    <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-transparent from-55% to-white" />
                  </div>

                  {/* Konten — slim, satu alur rapat */}
                  <div className="flex-1 min-w-0 px-4 py-3.5 md:px-5 flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h2 className="font-serif text-lg md:text-xl font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#A42A28] transition-colors">
                        {biz.name}
                      </h2>
                      {biz.featured && (
                        <span className="bg-[#C8956C]/15 text-[#C8956C] font-sans text-[10px] tracking-wider uppercase px-2 py-0.5 font-medium">
                          Unggulan
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-[#999999] mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-[#A42A28]">{biz.category || "Lainnya"}</span>
                      <span className="w-1 h-1 bg-[#DDDDDD] rounded-full" />
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-[#C8956C]" /> {biz.location}
                      </span>
                      {biz.owner && (
                        <>
                          <span className="w-1 h-1 bg-[#DDDDDD] rounded-full" />
                          <span className="flex items-center gap-1">
                            <User size={11} /> {biz.owner}
                          </span>
                        </>
                      )}
                    </p>
                    <p className="mt-1.5 font-sans text-sm text-[#666666] leading-relaxed line-clamp-2">
                      {biz.description}
                    </p>
                    <div className="mt-auto pt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      {biz.website ? (
                        <a
                          href={biz.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-[#A42A28] font-sans text-xs font-semibold hover:gap-2.5 transition-all"
                        >
                          <Globe size={13} /> Kunjungi Website <ArrowRight size={12} />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[#CCCCCC] font-sans text-xs">
                          <Globe size={13} /> Website belum tersedia
                        </span>
                      )}
                      {biz.address && (
                        <span className="font-sans text-[11px] text-[#BBBBBB] truncate hidden md:inline">
                          {biz.address}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
      </div>

      {/* MODAL DETAIL BISNIS — hero foto dengan shade, identitas menempel di bawah */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Detail bisnis: ${selected.name}`}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero: banner + shade gradient + identitas overlay */}
            <div className="relative aspect-[16/8] bg-[#1A1A1A] overflow-hidden">
              {selected.banner || selected.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selected.banner || selected.image}
                  alt={`Foto ${selected.name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F7F7F7]">
                  <Store size={48} className="text-[#DDDDDD]" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-2 bg-black/40 text-white hover:bg-black/60 transition-colors"
                aria-label="Tutup detail"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
                <p className="font-sans text-[11px] flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                  <span className="bg-[#A42A28] text-white px-2 py-0.5">
                    {selected.category || "Lainnya"}
                  </span>
                  <span className="text-white/80 flex items-center gap-1">
                    <MapPin size={11} className="text-[#C8956C]" />
                    {selected.location}
                  </span>
                  {selected.featured && (
                    <span className="bg-[#C8956C] text-white px-2 py-0.5 tracking-wider uppercase text-[10px]">
                      Unggulan
                    </span>
                  )}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-snug">
                  {selected.name}
                </h2>
                {(selected.owner || selected.since) && (
                  <p className="font-sans text-xs text-white/70 mt-1.5 flex items-center gap-1">
                    <User size={12} />
                    {selected.owner}
                    {selected.since ? ` • Berdiri ${selected.since}` : ""}
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="font-sans text-sm text-[#444444] leading-relaxed whitespace-pre-line mb-5">
                {selected.description}
              </p>

              {/* Strip foto tambahan — interaktif, scroll horizontal */}
              {selected.photos && selected.photos.length > 0 && (
                <div className="mb-6">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#999999] mb-2">
                    Galeri Bisnis
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selected.photos.map((photo, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={`${photo}-${idx}`}
                        src={photo}
                        alt={`Foto ${selected.name} ${idx + 1}`}
                        className="flex-none w-40 aspect-[4/3] object-cover border border-[#E5E5E5]"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              )}

              {selected.address && (
                <p className="font-sans text-sm text-[#666666] flex items-start gap-2 mb-6">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#C8956C]" />
                  {selected.address}
                </p>
              )}

              {/* Kontak — Website paling menonjol, sisanya sekunder */}
              <div className="flex flex-wrap gap-2">
                {selected.website && (
                  <a
                    href={selected.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#A42A28] text-white px-4 py-2.5 font-sans text-xs font-medium hover:bg-[#8a2320] transition-colors"
                  >
                    <Globe size={14} /> Kunjungi Website
                  </a>
                )}
                {selected.whatsapp && (
                  <a
                    href={`https://wa.me/${selected.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#E5E5E5] text-[#666666] px-4 py-2.5 font-sans text-xs font-medium hover:border-[#A42A28]/40 hover:text-[#A42A28] transition-colors"
                  >
                    <SiWhatsapp size={14} /> WhatsApp
                  </a>
                )}
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 border border-[#E5E5E5] text-[#666666] px-4 py-2.5 font-sans text-xs font-medium hover:border-[#A42A28]/40 hover:text-[#A42A28] transition-colors"
                  >
                    <Phone size={14} /> Telepon
                  </a>
                )}
                {selected.email && (
                  <a
                    href={`mailto:${selected.email}`}
                    className="inline-flex items-center gap-2 border border-[#E5E5E5] text-[#666666] px-4 py-2.5 font-sans text-xs font-medium hover:border-[#A42A28]/40 hover:text-[#A42A28] transition-colors"
                  >
                    <Mail size={14} /> Email
                  </a>
                )}
                {selected.instagram && (
                  <a
                    href={`https://instagram.com/${selected.instagram.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#E5E5E5] text-[#666666] px-4 py-2.5 font-sans text-xs font-medium hover:border-[#A42A28]/40 hover:text-[#A42A28] transition-colors"
                  >
                    <SiInstagram size={14} /> Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
