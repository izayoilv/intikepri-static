import fs from "fs";
import path from "path";

import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { fallbackNews, locations, organizations } from "@/lib/data";
import type { News } from "@/types";

import BeritaListClient from "./BeritaListClient";

export const metadata: Metadata = {
  title: "Berita & Kegiatan",
  description:
    "Berita terbaru seputar kegiatan INTI Kepulauan Riau: bakti sosial, pertemuan, dan program kemasyarakatan.",
  alternates: { canonical: "/berita/" },
};

function getNews(): News[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "news.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed: News[] = JSON.parse(content);
    return parsed.length > 0 ? parsed : fallbackNews;
  } catch {
    return fallbackNews;
  }
}

export default async function BeritaPage() {
  const items = getNews();

  return (
    <main>
      <Navbar />
      <div className="pt-24">
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
