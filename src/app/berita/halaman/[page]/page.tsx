import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getNews, toNewsSummary } from "@/lib/content";
import { locations, organizations } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { NEWS_PAGE_SIZE } from "@/lib/site";

import BeritaListClient from "../../BeritaListClient";

type Params = Promise<{ page: string }>;

function totalPages(): number {
  return Math.max(1, Math.ceil(getNews().length / NEWS_PAGE_SIZE));
}

export async function generateStaticParams() {
  const total = totalPages();
  // Static export needs at least one path; page 2 renders an empty, noindex list
  // when there is only one page of news.
  return Array.from({ length: Math.max(1, total - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  return pageMetadata({
    title: `Berita & Kegiatan — Halaman ${n}`,
    description: `Arsip berita kegiatan INTI Kepulauan Riau, halaman ${n}.`,
    path: `/berita/halaman/${n}/`,
    noindex: n > totalPages(),
  });
}

export default async function BeritaHalamanPage({
  params,
}: {
  params: Params;
}) {
  const { page } = await params;
  const items = getNews().map((n) => toNewsSummary(n));

  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <Breadcrumb
          items={[
            { label: "Berita", to: "/berita" },
            { label: `Halaman ${page}` },
          ]}
        />
        <BeritaListClient
          initialItems={items}
          initialPage={Number(page)}
          locations={locations}
          organizations={organizations}
        />
      </div>
      <Footer />
    </main>
  );
}
