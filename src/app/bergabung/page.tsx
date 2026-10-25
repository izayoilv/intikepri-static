import {
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { bidangPengurus, branches, visiMisi } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cara Bergabung",
  description:
    "Cara bergabung dan menghubungi Perhimpunan Indonesia Tionghoa (INTI) Provinsi Kepulauan Riau: kontak sekretariat, alamat kantor, dan jaringan cabang se-Kepri.",
  path: "/bergabung/",
});

const JOIN_MESSAGE =
  "Halo INTI Kepri, saya ingin mengetahui cara bergabung.\n\nNama:\nDomisili (kota/kabupaten):\nNomor telepon:";

const MAIL_HREF = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "Bergabung dengan INTI Kepri",
)}&body=${encodeURIComponent(JOIN_MESSAGE)}`;

const WA_HREF = CONTACT.whatsapp
  ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(JOIN_MESSAGE)}`
  : null;

const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT.address,
)}`;

const STEPS = [
  {
    title: "Hubungi sekretariat",
    body: `Kirim pesan berisi nama, domisili, dan nomor telepon Anda melalui ${
      CONTACT.whatsapp ? "email atau WhatsApp" : "email"
    }.`,
  },
  {
    title: "Dapatkan informasi keanggotaan",
    body: "Sekretariat akan membalas dengan informasi keanggotaan dan cabang INTI terdekat di daerah Anda.",
  },
  {
    title: "Ikut berkegiatan",
    body: "Bergabunglah dalam kegiatan sosial, budaya, pendidikan, dan ekonomi bersama INTI Kepri.",
  },
];

export default function BergabungPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <Breadcrumb items={[{ label: "Cara Bergabung" }]} />

        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-[#8F6440] font-sans text-sm tracking-[0.3em] uppercase mb-3">
                Bergabung
              </p>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6">
                Bergabung Bersama INTI Kepri
              </h1>
              <p className="font-sans text-base text-[#555555] leading-relaxed max-w-2xl">
                INTI Kepri adalah wadah masyarakat untuk berkarya bersama di
                bidang sosial, budaya, pendidikan, dan ekonomi, dengan{" "}
                {branches.length} cabang di seluruh Kepulauan Riau. Semangat
                kami: <em>{visiMisi.motto.toLowerCase()}</em>.
              </p>

              <ol className="mt-10 space-y-6">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-[#A42A28] text-white font-serif font-bold"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h2 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                        {step.title}
                      </h2>
                      <p className="font-sans text-sm text-[#555555] leading-relaxed mt-1">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="lg:col-span-5">
              <div className="bg-[#F9F3EA] border-t-2 border-[#A42A28] p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-5">
                  Hubungi Sekretariat
                </h2>
                <div className="flex flex-col gap-3">
                  {WA_HREF && (
                    <a
                      href={WA_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#1F8F4E] text-white px-5 py-3 font-sans text-sm font-semibold hover:bg-[#187540] transition-colors"
                    >
                      <SiWhatsapp size={16} /> Chat via WhatsApp
                    </a>
                  )}
                  <a
                    href={MAIL_HREF}
                    className="inline-flex items-center justify-center gap-2 bg-[#A42A28] text-white px-5 py-3 font-sans text-sm font-semibold hover:bg-[#8a2320] transition-colors"
                  >
                    <Mail size={16} aria-hidden="true" /> Kirim Email
                  </a>
                </div>
                <p className="font-sans text-sm text-[#555555] mt-4 break-all">
                  {CONTACT.email}
                </p>

                <div className="border-t border-[#E8DCCB] mt-6 pt-6">
                  <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#6B6B6B] mb-2">
                    Kantor Sekretariat
                  </h3>
                  <address className="not-italic font-sans text-sm text-[#1A1A1A] leading-relaxed flex items-start gap-2">
                    <MapPin
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-[#A42A28]"
                      aria-hidden="true"
                    />
                    {CONTACT.address}
                  </address>
                  <a
                    href={MAPS_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#A42A28] font-sans text-sm font-medium mt-3 hover:gap-2.5 transition-all"
                  >
                    Lihat di Google Maps{" "}
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>

                <div className="border-t border-[#E8DCCB] mt-6 pt-6 flex items-center gap-2">
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook INTI Kepri"
                    className="w-10 h-10 flex items-center justify-center border border-[#E8DCCB] text-[#555555] hover:text-[#A42A28] hover:border-[#A42A28]/40 transition-colors"
                  >
                    <SiFacebook size={16} />
                  </a>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram INTI Kepri"
                    className="w-10 h-10 flex items-center justify-center border border-[#E8DCCB] text-[#555555] hover:text-[#A42A28] hover:border-[#A42A28]/40 transition-colors"
                  >
                    <SiInstagram size={16} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#F7F7F7]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <p className="text-[#8F6440] font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Bidang Kegiatan
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8">
              Tempat Anda Bisa Berkontribusi
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bidangPengurus.map((b) => (
                <li
                  key={b.name}
                  className="bg-white border border-[#E5E5E5] p-5"
                >
                  <h3 className="font-serif text-base font-semibold text-[#1A1A1A]">
                    {b.name}
                  </h3>
                  <p className="font-sans text-sm text-[#6B6B6B] mt-1">
                    {b.desc}
                  </p>
                </li>
              ))}
            </ul>
            <p className="font-sans text-sm text-[#555555] mt-8">
              Ingin mengenal kami lebih dulu?{" "}
              <Link
                href="/tentang-kami"
                className="text-[#A42A28] font-medium underline underline-offset-4"
              >
                Baca profil INTI Kepri
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
      <Footer showCta={false} />
    </main>
  );
}
