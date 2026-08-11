import fs from "fs";
import type { Metadata } from "next";
import path from "path";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { fallbackGallery } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import type { GalleryPhoto } from "@/types";

import GaleriListClient from "./GaleriListClient";

export const metadata: Metadata = {
  title: "Galeri & Dokumentasi",
  description:
    "Dokumentasi kegiatan INTI Kepulauan Riau dalam foto: bakti sosial, pertemuan, perayaan budaya, dan program kemasyarakatan.",
  alternates: { canonical: "/galeri/" },
  openGraph: {
    title: "Galeri & Dokumentasi | INTI Kepri",
    description:
      "Dokumentasi kegiatan INTI Kepulauan Riau dalam foto: bakti sosial, pertemuan, perayaan budaya, dan program kemasyarakatan.",
    type: "website",
  },
};

function getGallery(): GalleryPhoto[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "gallery.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed: GalleryPhoto[] = JSON.parse(content);
    return parsed.length > 0 ? parsed : fallbackGallery;
  } catch {
    return fallbackGallery;
  }
}

const collectionPageLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Galeri & Dokumentasi INTI Kepri",
  url: `${SITE_URL}/galeri/`,
  description:
    "Dokumentasi kegiatan INTI Kepulauan Riau dalam foto: bakti sosial, pertemuan, perayaan budaya, dan program kemasyarakatan.",
  isPartOf: { "@type": "WebSite", url: `${SITE_URL}/` },
};

export default async function GaleriPage() {
  const items = getGallery();

  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <Breadcrumb items={[{ label: "Galeri" }]} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageLd) }}
        />
        <GaleriListClient initialItems={items} />
      </div>
      <Footer />
    </main>
  );
}
