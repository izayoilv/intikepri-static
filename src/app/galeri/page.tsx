import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { getGallery } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

import GaleriListClient from "./GaleriListClient";

const DESCRIPTION =
  "Dokumentasi kegiatan INTI Kepulauan Riau dalam foto: bakti sosial, pertemuan, perayaan budaya, dan program kemasyarakatan.";

export const metadata: Metadata = pageMetadata({
  title: "Galeri & Dokumentasi",
  description: DESCRIPTION,
  path: "/galeri/",
});

const collectionPageLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Galeri & Dokumentasi INTI Kepri",
  url: `${SITE_URL}/galeri/`,
  description: DESCRIPTION,
  isPartOf: { "@type": "WebSite", url: `${SITE_URL}/` },
};

export default function GaleriPage() {
  const items = getGallery();

  return (
    <main>
      <JsonLd data={collectionPageLd} />
      <Navbar />
      <div className="pt-16">
        <Breadcrumb items={[{ label: "Galeri" }]} />
        <GaleriListClient initialItems={items} />
      </div>
      <Footer />
    </main>
  );
}
