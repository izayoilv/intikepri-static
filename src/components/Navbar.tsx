"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { to: "/", label: "Beranda" },
  { to: "/tentang-kami", label: "Tentang Kami" },
  { to: "/berita", label: "Berita" },
  { to: "/agenda", label: "Agenda" },
  { to: "/galeri", label: "Galeri" },
  { to: "/direktori", label: "Direktori" },
  { to: "/pustaka", label: "Pustaka" },
] as const;

function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = normalize(usePathname() || "/");
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || mobileOpen;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Section pages stay highlighted on their detail pages (e.g. /berita/<slug>/).
  const isActive = (to: string) =>
    to === "/"
      ? pathname === "/"
      : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header>
      <nav
        aria-label="Navigasi utama"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${solid ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group min-w-0">
              <div
                className={`w-10 h-10 flex-shrink-0 flex items-center justify-center transition-colors ${solid ? "bg-[#A42A28]" : "bg-white/20 backdrop-blur-sm"}`}
              >
                <Image
                  src="/images/Logo-INTI.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <span
                  className={`block font-serif font-bold text-sm tracking-wider whitespace-nowrap transition-colors ${solid ? "text-[#1A1A1A]" : "text-white"}`}
                >
                  INTI KEPRI
                </span>
                <span
                  className={`hidden sm:block text-[9px] -mt-0.5 font-sans whitespace-nowrap transition-colors ${solid ? "text-[#6B6B6B]" : "text-white/70"}`}
                >
                  PERHIMPUNAN INDONESIA TIONGHOA
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {LINKS.map((l) => {
                const active = isActive(l.to);
                return (
                  <Link
                    key={l.to}
                    href={l.to}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-3 xl:px-4 py-2 font-sans text-sm tracking-wide whitespace-nowrap transition-all ${active ? (solid ? "text-[#A42A28] font-medium" : "text-white font-medium") : solid ? "text-[#555555] hover:text-[#A42A28]" : "text-white/80 hover:text-white"}`}
                  >
                    {l.label}
                    {active && (
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 ${solid ? "bg-[#A42A28]" : "bg-white"}`}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              className={`lg:hidden -mr-2 w-11 h-11 flex items-center justify-center ${solid ? "text-[#333333]" : "text-white"}`}
            >
              {mobileOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            id="menu-mobile"
            className="lg:hidden bg-white border-t border-[#E5E5E5] shadow-lg max-h-[calc(100svh-4rem)] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-1">
              {LINKS.map((l) => {
                const active = isActive(l.to);
                return (
                  <Link
                    key={l.to}
                    href={l.to}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`block font-sans text-base py-3 px-4 ${active ? "text-[#A42A28] font-medium bg-[#A42A28]/5" : "text-[#555555]"}`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                href="/bergabung"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center bg-[#A42A28] text-white font-sans text-sm font-medium py-3 px-4"
              >
                Cara Bergabung
              </Link>
            </div>
          </div>
        )}
      </nav>
      {mobileOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 top-16 z-30 bg-black/40"
        />
      )}
    </header>
  );
}
