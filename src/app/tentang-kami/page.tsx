import type { Metadata } from "next";
import Image from "next/image";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import JaringanSection from "@/components/JaringanSection";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import StructureSection from "@/components/StructureSection";
import {
  bidangPengurus,
  branches,
  ketuaPeriode,
  sejarah,
  visiMisi,
} from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tentang Kami",
  description:
    "Profil, sejarah, visi misi, kepengurusan, dan jaringan Perhimpunan INTI Provinsi Kepulauan Riau.",
  path: "/tentang-kami/",
});

const FACTS = [
  { value: "2004", label: "Tahun berdiri" },
  { value: String(branches.length), label: "Cabang se-Kepri" },
  { value: String(bidangPengurus.length), label: "Bidang kerja" },
];

export default function TentangKamiPage() {
  const [lede, ...history] = sejarah;

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#120D0C] text-white">
        <Image
          src="/images/hero-bg-3.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,13,12,0.75)_0%,rgba(18,13,12,0.35)_35%,rgba(18,13,12,0.9)_80%,#120D0C_100%)] lg:bg-[linear-gradient(90deg,#120D0C_0%,rgba(18,13,12,0.85)_45%,rgba(18,13,12,0.3)_100%)]"
        />
        <div className="relative pt-16">
          <Breadcrumb items={[{ label: "Tentang Kami" }]} tone="dark" />
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12 md:pb-20">
            <p className="mb-4 md:mb-6 font-sans text-[11px] md:text-xs font-semibold tracking-[0.24em] uppercase text-[#D9A56F]">
              Tentang Kami
            </p>
            <h1 className="max-w-4xl font-serif font-extrabold text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-[4.75rem] lg:leading-[1.02] tracking-[-0.02em] text-balance">
              Perhimpunan Indonesia Tionghoa{" "}
              <span className="italic font-semibold text-[#E8B37C]">
                Provinsi Kepulauan Riau
              </span>
            </h1>
            <p className="mt-5 md:mt-7 max-w-2xl font-sans text-[15.5px] md:text-lg leading-[1.65] text-white/85">
              Organisasi sosial kemasyarakatan bersifat kebangsaan, wadah
              masyarakat Tionghoa di Kepulauan Riau untuk ikut membangun daerah
              dan menjaga kerukunan bangsa.
            </p>

            <dl className="mt-10 md:mt-16 grid grid-cols-3 max-w-2xl border-t border-white/20">
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className={`pt-4 md:pt-5 ${i > 0 ? "pl-4 md:pl-8 border-l border-white/20" : ""}`}
                >
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-serif text-[2rem] md:text-5xl font-bold leading-none">
                    {f.value}
                  </dd>
                  <dd
                    aria-hidden="true"
                    className="mt-2 font-sans text-xs md:text-sm text-white/70"
                  >
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 01 Sejarah */}
      <section className="bg-[#FAF6EF] px-4 md:px-8 py-16 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 lg:gap-24">
          <div className="min-w-0">
            <SectionHeading
              index="01"
              label="Sejarah"
              title={
                <>
                  Dua dekade{" "}
                  <span className="italic text-[#A42A28]">merawat</span>{" "}
                  kebersamaan.
                </>
              }
            />
            <div className="relative mt-8 md:mt-10 aspect-[16/10] overflow-hidden shadow-[0_40px_80px_-40px_rgba(20,13,12,0.55)]">
              <Image
                src="/images/hero-bg-2.jpeg"
                alt="Pertemuan akbar anggota INTI Kepri"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="min-w-0 lg:pt-14">
            <p className="font-serif text-[1.35rem] md:text-[1.7rem] leading-[1.45] text-[#1C1714]">
              {lede}
            </p>
            <div className="mt-6 md:mt-8 space-y-4 font-sans text-[15.5px] md:text-[17px] leading-[1.75] text-[#4A423C]">
              {history.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 Visi & Misi */}
      <section className="bg-[#120D0C] text-white px-4 md:px-8 py-16 md:py-28">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            index="02"
            label="Arah Organisasi"
            tone="dark"
            title="Visi & misi"
          />
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {[
              { label: "Visi", text: visiMisi.visi },
              { label: "Misi", text: visiMisi.misi },
            ].map((v) => (
              <div key={v.label} className="border-t border-white/15 pt-6">
                <h3 className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D9A56F]">
                  {v.label}
                </h3>
                <p className="mt-4 font-serif italic text-xl md:text-[1.6rem] leading-[1.5] text-white/90">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 md:mt-20 border-t border-white/15 pt-8 md:pt-10 flex flex-wrap items-end justify-between gap-4">
            <p className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.02em]">
              <span className="sr-only">Motto: </span>
              Tulus memberi,{" "}
              <span className="italic font-semibold text-[#E8B37C]">
                ikhlas mengabdi.
              </span>
            </p>
            <p
              lang="zh"
              className="font-zh text-base md:text-lg tracking-[0.16em] text-white/60"
            >
              以诚相予 · 以心相奉
            </p>
          </div>
        </div>
      </section>

      {/* 03 Kepemimpinan */}
      <section className="bg-[#FAF6EF] px-4 md:px-8 py-16 md:py-28">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            index="03"
            label="Kepemimpinan"
            title={
              <>
                Ketua dari{" "}
                <span className="italic text-[#A42A28]">masa ke masa</span>.
              </>
            }
          />
          <ol className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-l lg:border-l-0 lg:border-t border-[#E5DBCD]">
            {ketuaPeriode.map((k, i) => {
              const now = i === 0;
              return (
                <li
                  key={k.periode}
                  className="relative pl-6 lg:pl-0 lg:pr-6 pb-8 lg:pb-0 lg:pt-8"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[6px] top-1.5 lg:left-0 lg:-top-[6px] w-[11px] h-[11px] rounded-full ${now ? "bg-[#A42A28]" : "bg-[#FAF6EF] border-2 border-[#C9B8A4]"}`}
                  />
                  <p
                    className={`font-sans text-xs font-semibold tracking-[0.16em] uppercase ${now ? "text-[#A42A28]" : "text-[#8F6440]"}`}
                  >
                    {k.periode.replace("-", " – ")}
                    {now && (
                      <span className="ml-2 normal-case tracking-normal font-medium">
                        · sekarang
                      </span>
                    )}
                  </p>
                  <p className="mt-2 font-serif text-xl md:text-[1.35rem] font-bold leading-snug text-[#1C1714]">
                    {k.nama}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <StructureSection index="04" />

      <JaringanSection index="05" />

      <Footer />
    </main>
  );
}
