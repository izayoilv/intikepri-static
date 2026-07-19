import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { visiMisi, sejarah, ketuaPeriode, branches } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Profil, sejarah, visi misi, dan jaringan Perhimpunan INTI Provinsi Kepulauan Riau.",
};

export default function TentangKamiPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <Breadcrumb items={[{ label: "Tentang Kami" }]} />

        {/* Header */}
        <section className="bg-[#1A1A1A] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">Tentang Kami</p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Perhimpunan Indonesia Tionghoa<br />Provinsi Kepulauan Riau
            </h1>
            <p className="text-white/60 font-sans max-w-2xl leading-relaxed">
              Berdedikasi untuk membangun masyarakat yang rukun, sejahtera, dan berkeadilan.
            </p>
          </div>
        </section>

        {/* Sejarah */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">Sejarah</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">Sejarah INTI Kepri</h2>
              <div className="space-y-4 text-[#666666] font-sans text-sm leading-relaxed">
                {sejarah.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Ketua dari masa ke masa */}
            <div>
              <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">Kepemimpinan</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">Ketua dari Masa ke Masa</h2>
              <ol className="relative border-l border-[#E5E5E5] ml-2 space-y-6">
                {ketuaPeriode.map((k, i) => (
                  <li key={i} className="pl-6 relative">
                    <span className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 ${i === 0 ? "bg-[#A42A28] border-[#A42A28]" : "bg-white border-[#CCCCCC]"}`} />
                    <p className="font-sans text-xs tracking-widest text-[#999999] uppercase">{k.periode}</p>
                    <p className="font-serif text-lg font-semibold text-[#1A1A1A]">{k.nama}</p>
                    <p className={`font-sans text-xs mt-0.5 ${i === 0 ? "text-[#A42A28] font-medium" : "text-[#999999]"}`}>{k.status}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Visi Misi */}
        <section className="py-16 md:py-24 bg-[#F7F7F7]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">Visi & Misi</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">Arah dan Tujuan Organisasi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E5E5E5] p-8">
                <h3 className="font-serif text-xl font-semibold text-[#A42A28] mb-4">Visi</h3>
                <p className="text-[#666666] font-sans text-sm leading-relaxed">{visiMisi.visi}</p>
              </div>
              <div className="bg-white border border-[#E5E5E5] p-8">
                <h3 className="font-serif text-xl font-semibold text-[#A42A28] mb-4">Misi</h3>
                <p className="text-[#666666] font-sans text-sm leading-relaxed">{visiMisi.misi}</p>
              </div>
            </div>
            <div className="mt-6 bg-[#A42A28] p-8 text-center">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/60 mb-2">Motto</p>
              <p className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">{visiMisi.motto}</p>
            </div>
          </div>
        </section>

        {/* Jaringan */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <p className="text-[#C8956C] font-sans text-sm tracking-[0.3em] uppercase mb-3">Jaringan</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">Jaringan INTI di Kepulauan Riau</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {branches.map((b, i) => (
                <div key={i} className="flex items-center gap-4 bg-[#F7F7F7] border border-[#E5E5E5] p-5">
                  <span className="font-serif text-2xl font-light text-[#A42A28]/40">0{i + 1}</span>
                  <div>
                    <p className="font-serif font-semibold text-[#1A1A1A]">{b.name}</p>
                    <p className="font-sans text-xs text-[#999999]">{b.region}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
