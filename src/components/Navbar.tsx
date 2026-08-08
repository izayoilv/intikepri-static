"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { to: "/", label: "Beranda" },
    { to: "/tentang-kami", label: "Tentang Kami" },
    { to: "/berita", label: "Berita" },
    { to: "/agenda", label: "Agenda" },
    { to: "/galeri", label: "Galeri" },
    { to: "/direktori", label: "Direktori" },
    { to: "/pustaka", label: "Pustaka" },
  ];

  const isActive = (p: string) => pathname === p;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : isHome ? "bg-transparent" : "bg-white/95 backdrop-blur-sm shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={`w-10 h-10 flex items-center justify-center transition-colors ${scrolled || !isHome ? "bg-[#A42A28]" : "bg-white/20 backdrop-blur-sm"}`}
              >
                <Image
                  src="/images/Logo-INTI.png"
                  alt="Logo INTI Kepri"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span
                  className={`font-serif font-bold text-sm tracking-wider transition-colors ${scrolled || !isHome ? "text-[#1A1A1A]" : "text-white"}`}
                >
                  INTI KEPRI
                </span>
                <span
                  className={`block text-[9px] -mt-0.5 font-sans transition-colors ${scrolled || !isHome ? "text-[#666666]" : "text-white/60"}`}
                >
                  PERHIMPUNAN INDONESIA TIONGHOA
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  className={`relative px-4 py-2 font-sans text-sm tracking-wide transition-all ${isActive(l.to) ? (scrolled || !isHome ? "text-[#A42A28] font-medium" : "text-white font-medium") : scrolled || !isHome ? "text-[#666666] hover:text-[#A42A28]" : "text-white/70 hover:text-white"}`}
                >
                  {l.label}
                  {isActive(l.to) && (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 ${scrolled || !isHome ? "bg-[#A42A28]" : "bg-white"}`}
                    />
                  )}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 ${scrolled || !isHome ? "text-[#666666]" : "text-white"}`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[#E5E5E5] shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block font-sans text-base py-3 px-4 ${isActive(l.to) ? "text-[#A42A28] font-medium bg-[#A42A28]/5" : "text-[#666666]"}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
