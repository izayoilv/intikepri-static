import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getNews, toNewsSummary } from "@/lib/content";
import { locations, organizations } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

import BeritaListClient from "./BeritaListClient";

export const metadata: Metadata = pageMetadata({
  title: "Berita & Kegiatan",
  description:
    "Berita terbaru seputar kegiatan INTI Kepulauan Riau: bakti sosial, pertemuan, dan program kemasyarakatan.",
  path: "/berita/",
});

export default function BeritaPage() {
  const items = getNews().map((n) => toNewsSummary(n));

  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <Breadcrumb items={[{ label: "Berita" }]} />
        <BeritaListClient
          initialItems={items}
          locations={locations}
          organizations={organizations}
        />
      </div>
      <Footer />
    </main>
  );
}
