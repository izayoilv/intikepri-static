import Link from "next/link";
import { ChevronRight, MapPin, Mail } from "lucide-react";

const LogoSVG = () => (
  <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="4" fill="white"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => (
      <line key={i} x1="20" y1="20" x2={20+15*Math.cos(a*Math.PI/180)} y2={20+15*Math.sin(a*Math.PI/180)} stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    ))}
  </svg>
);

export default function Footer() {
  const links = [
    { to: "/", label: "Beranda" },
    { to: "/tentang-kami", label: "Tentang Kami" },
    { to: "/berita", label: "Berita" },
  ];

  return (
    <footer className="bg-[#0F0F0F] text-white">
      <div className="bg-[#A42A28] py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">Bergabung Bersama INTI Kepri</h3>
          <p className="text-white/80 font-sans max-w-xl mx-auto mb-6">Mari bersama-sama membangun masyarakat Kepulauan Riau yang lebih baik.</p>
          <Link href="/tentang-kami" className="inline-flex items-center gap-2 bg-white text-[#A42A28] px-6 py-3 font-sans text-sm font-semibold hover:bg-white/90 transition-colors">
            Pelajari Lebih Lanjut <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#A42A28] flex items-center justify-center">
                <LogoSVG />
              </div>
              <div>
                <span className="font-serif font-bold text-sm tracking-wider">INTI KEPRI</span>
                <span className="block text-[9px] text-white/40 font-sans -mt-0.5">PROVINSI KEPULAUAN RIAU</span>
              </div>
            </div>
            <p className="text-white/40 font-sans text-sm leading-relaxed">
              Perhimpunan Indonesia Tionghoa Provinsi Kepulauan Riau — berdedikasi untuk membangun masyarakat yang rukun, sejahtera, dan berkeadilan.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-white/80">Menu</h4>
            <ul className="space-y-2">
              {links.map(l => (
                <li key={l.to}>
                  <Link href={l.to} className="text-white/40 hover:text-white font-sans text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-white/80">Jaringan Kepri</h4>
            <ul className="space-y-2">
              {["Kota Batam", "Kab. Karimun", "Kota Tanjungpinang", "Kab. Lingga", "Kab. Anambas", "Kab. Natuna"].map(loc => (
                <li key={loc} className="text-white/40 font-sans text-sm">{loc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-white/80">Kontak</h4>
            <div className="space-y-3">
              <p className="text-white/40 font-sans text-sm flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#C8956C]" /> Ruko The Capitol Blok B No.42, Batam
              </p>
              <p className="text-white/40 font-sans text-sm flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0 text-[#C8956C]" /> perhimpunanintikepri@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 font-sans text-xs">&copy; {new Date().getFullYear()} Perhimpunan Indonesia Tionghoa Provinsi Kepri. All Rights Reserved.</p>
          <p className="text-white/20 font-sans text-xs">TULUS MEMBERI IKHLAS MENGABDI</p>
        </div>
      </div>
    </footer>
  );
}