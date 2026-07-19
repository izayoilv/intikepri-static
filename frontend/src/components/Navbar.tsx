"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LogoSVG = () => (
  <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="4" fill="white"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => (
      <line key={i} x1="20" y1="20" x2={20+15*Math.cos(a*Math.PI/180)} y2={20+15*Math.sin(a*Math.PI/180)} stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    ))}
  </svg>
);

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

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const links = [
    { to: "/", label: "Beranda" },
    { to: "/tentang-kami", label: "Tentang Kami" },
    { to: "/berita", label: "Berita" },
  ];

  const isActive = (p: string) => pathname === p;

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isHome && !scrolled ? "bg-black/30 backdrop-blur-sm" : "bg-[#1A1A1A]"} ${scrolled ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-8">
          <span className="text-white/50 text-xs font-sans flex items-center gap-1">
            <span className="w-1 h-1 bg-[#A42A28] rounded-full" /> INTI Provinsi Kepri
          </span>
          <span className="text-white/30 text-xs font-sans">perhimpunanintikepri@gmail.com</span>
        </div>
      </div>

      <nav className={`fixed left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "top-0 bg-white/95 backdrop-blur-md shadow-sm" : isHome ? "top-8 bg-transparent" : "top-8 bg-white/95 backdrop-blur-sm shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`w-10 h-10 flex items-center justify-center transition-colors ${scrolled || !isHome ? "bg-[#A42A28]" : "bg-white/20 backdrop-blur-sm"}`}>
                <LogoSVG />
              </div>
              <div className="hidden sm:block">
                <span className={`font-serif font-bold text-sm tracking-wider transition-colors ${scrolled || !isHome ? "text-[#1A1A1A]" : "text-white"}`}>INTI KEPRI</span>
                <span className={`block text-[9px] -mt-0.5 font-sans transition-colors ${scrolled || !isHome ? "text-[#666666]" : "text-white/60"}`}>PERHIMPUNAN INDONESIA TIONGHOA</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <Link key={l.to} href={l.to} className={`relative px-4 py-2 font-sans text-sm tracking-wide transition-all ${isActive(l.to) ? (scrolled || !isHome ? "text-[#A42A28] font-medium" : "text-white font-medium") : (scrolled || !isHome ? "text-[#666666] hover:text-[#A42A28]" : "text-white/70 hover:text-white")}`}>
                  {l.label}
                  {isActive(l.to) && <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 ${scrolled || !isHome ? "bg-[#A42A28]" : "bg-white"}`} />}
                </Link>
              ))}
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 ${scrolled || !isHome ? "text-[#666666]" : "text-white"}`}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[#E5E5E5] shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <Link key={l.to} href={l.to} className={`block font-sans text-base py-3 px-4 ${isActive(l.to) ? "text-[#A42A28] font-medium bg-[#A42A28]/5" : "text-[#666666]"}`}>
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
