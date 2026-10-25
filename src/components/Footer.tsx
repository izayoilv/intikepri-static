import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CONTACT } from "@/lib/site";

const LINKS = [
  { to: "/tentang-kami", label: "Tentang Kami" },
  { to: "/berita", label: "Berita" },
  { to: "/agenda", label: "Agenda" },
  { to: "/galeri", label: "Galeri" },
  { to: "/direktori", label: "Direktori" },
  { to: "/pustaka", label: "Pustaka" },
  { to: "/bergabung", label: "Cara Bergabung" },
] as const;

const SOCIALS = [
  { label: "Facebook INTI Kepri", href: CONTACT.facebook, Icon: SiFacebook },
  { label: "Instagram INTI Kepri", href: CONTACT.instagram, Icon: SiInstagram },
];

export default function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <>
      {showCta && (
        <section
          id="bergabung"
          className="relative overflow-hidden bg-[#A42A28] text-white"
        >
          <Image
            src="/images/footer-bg.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-35 mix-blend-luminosity"
          />
          <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32 flex flex-wrap items-end justify-between gap-8 md:gap-10">
            <div className="flex-[1_1_560px] min-w-0">
              <p className="mb-4 font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#FFE2C2]">
                Mari berkarya bersama
              </p>
              <h2 className="font-serif text-[2.6rem] leading-none sm:text-6xl lg:text-[4.6rem] font-extrabold tracking-[-0.02em] text-balance">
                Bergabung bersama{" "}
                <span className="italic font-semibold">INTI Kepri</span>
              </h2>
              <p className="mt-5 font-sans text-[17px] leading-[1.7] text-white/90 max-w-xl">
                Ikut membangun masyarakat Kepulauan Riau yang rukun, maju, dan
                saling percaya melalui kegiatan sosial, budaya, pendidikan, dan
                ekonomi.
              </p>
            </div>
            <div className="w-full sm:w-auto grid grid-cols-1 sm:flex gap-3">
              <Link
                href="/bergabung"
                className="justify-center inline-flex items-center gap-2.5 bg-white text-[#A42A28] px-7 py-4 font-sans text-[15px] font-bold hover:bg-white/90 transition-colors"
              >
                Cara Bergabung <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/tentang-kami"
                className="justify-center inline-flex items-center border border-white/60 px-7 py-4 font-sans text-[15px] font-medium hover:bg-white/10 transition-colors"
              >
                Kenali kami dulu
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[#0D0908] text-white px-4 md:px-8 pt-16 md:pt-[72px] pb-9">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr] gap-10 md:gap-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/Logo-INTI.png"
                  alt=""
                  width={44}
                  height={44}
                />
                <span className="font-serif text-lg font-extrabold tracking-[0.06em]">
                  INTI KEPRI
                </span>
              </div>
              <p className="mt-4 font-sans text-sm leading-[1.7] text-white/70">
                Perhimpunan Indonesia Tionghoa Provinsi Kepulauan Riau — tulus
                memberi, ikhlas mengabdi.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/75 hover:bg-[#A42A28] hover:border-[#A42A28] hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="Menu footer">
              <h2 className="mb-4 font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D9A56F]">
                Menu
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-2.5">
                {LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      href={l.to}
                      className="font-sans text-sm text-white/75 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-w-sm">
              <h2 className="mb-4 font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D9A56F]">
                Sekretariat
              </h2>
              <address className="not-italic font-sans text-sm leading-[1.7] text-white/75">
                {CONTACT.address}
              </address>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-block mt-3 font-sans text-sm text-white/75 hover:text-white transition-colors break-all"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-3 font-sans text-[12.5px] text-white/60">
            <p>
              &copy; {new Date().getFullYear()} Perhimpunan Indonesia Tionghoa
              Provinsi Kepulauan Riau
            </p>
            <p lang="zh" className="font-zh tracking-[0.12em]">
              以诚相予 · 以心相奉
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
