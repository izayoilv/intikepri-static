"use client";

import { SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";
import {
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

  const filtered = useMemo(() => {
    return initialItems.filter((b) => {
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
  }, [initialItems, search, category, location]);

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
      <div className="max-w-7xl mx-auto px-4 md:px-8">
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

        {/* Search */}
        <div className="relative md:w-80 mb-6">
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

        {/* Filter */}
        <div className="flex flex-col gap-4 mb-10">
          {categories.length > 2 && (
            <div>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#999999] mb-2">
                Kategori
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setPage(1);
                    }}
                    className={`px-4 py-2 font-sans text-xs tracking-wide border transition-colors ${
                      category === cat
                        ? "bg-[#A42A28] text-white border-[#A42A28]"
                        : "bg-white text-[#666666] border-[#E5E5E5] hover:border-[#A42A28]/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
          {locations.length > 2 && (
            <div>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#999999] mb-2">
                Lokasi
              </p>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setPage(1);
                    }}
                    className={`px-4 py-2 font-sans text-xs tracking-wide border transition-colors ${
                      location === loc
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "bg-white text-[#666666] border-[#E5E5E5] hover:border-[#1A1A1A]/40"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((biz, i) => (
              <button
                key={`${biz.name}-${i}`}
                onClick={() => setSelected(biz)}
                className="group text-left"
                aria-label={`Lihat detail ${biz.name}`}
              >
                <div className="bg-white border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  {biz.image ? (
                    <div className="aspect-[16/10] overflow-hidden bg-[#E5E5E5]">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${biz.image})` }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-[#F7F7F7] flex items-center justify-center">
                      <Store size={40} className="text-[#E5E5E5]" />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-block bg-[#A42A28]/10 text-[#A42A28] text-xs font-sans px-2 py-1">
                        {biz.category || "Lainnya"}
                      </span>
                      {biz.location && (
                        <span className="inline-block bg-[#1A1A1A]/5 text-[#1A1A1A] text-xs font-sans px-2 py-1">
                          {biz.location}
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#A42A28] transition-colors">
                      {biz.name}
                    </h2>
                    <p className="font-sans text-sm text-[#666666] leading-relaxed line-clamp-3 flex-1">
                      {biz.description}
                    </p>
                    <p className="font-sans text-xs text-[#A42A28] font-medium mt-4">
                      Lihat Detail &rarr;
                    </p>
                  </div>
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
      </div>

      {/* MODAL DETAIL BISNIS */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Detail bisnis: ${selected.name}`}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.image ? (
              <div
                className="aspect-[16/9] bg-cover bg-center"
                style={{ backgroundImage: `url(${selected.image})` }}
              />
            ) : (
              <div className="aspect-[16/9] bg-[#F7F7F7] flex items-center justify-center">
                <Store size={48} className="text-[#E5E5E5]" />
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block bg-[#A42A28]/10 text-[#A42A28] text-xs font-sans px-2 py-1">
                      {selected.category || "Lainnya"}
                    </span>
                    {selected.location && (
                      <span className="inline-block bg-[#1A1A1A]/5 text-[#1A1A1A] text-xs font-sans px-2 py-1">
                        {selected.location}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                    {selected.name}
                  </h2>
                  {selected.owner && (
                    <p className="font-sans text-xs text-[#999999] mt-1 flex items-center gap-1">
                      <User size={12} /> {selected.owner}
                      {selected.since ? ` • Berdiri ${selected.since}` : ""}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 text-[#999999] hover:text-[#1A1A1A] transition-colors flex-shrink-0"
                  aria-label="Tutup detail"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="font-sans text-sm text-[#444444] leading-relaxed whitespace-pre-line mb-6">
                {selected.description}
              </p>

              {selected.address && (
                <p className="font-sans text-sm text-[#666666] flex items-start gap-2 mb-6">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#C8956C]" />
                  {selected.address}
                </p>
              )}

              {/* Kontak — hanya tampil yang diisi admin */}
              <div className="flex flex-wrap gap-2">
                {selected.whatsapp && (
                  <a
                    href={`https://wa.me/${selected.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#A42A28] text-white px-4 py-2.5 font-sans text-xs font-medium hover:bg-[#8a2320] transition-colors"
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
                {selected.website && (
                  <a
                    href={selected.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#E5E5E5] text-[#666666] px-4 py-2.5 font-sans text-xs font-medium hover:border-[#A42A28]/40 hover:text-[#A42A28] transition-colors"
                  >
                    <Globe size={14} /> Website
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
