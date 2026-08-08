import fs from "fs";
import path from "path";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { fallbackDocuments, fallbackVideos } from "@/lib/data";
import type { DocumentItem, VideoItem } from "@/types";
import type { Metadata } from "next";

import PustakaClient from "./PustakaClient";

export const metadata: Metadata = {
  title: "Pustaka & Media",
  description:
    "Rekaman kegiatan dan dokumen resmi Perhimpunan Indonesia Tionghoa (INTI) Provinsi Kepulauan Riau — makalah, laporan, dan publikasi.",
  alternates: { canonical: "https://intikepri.com/pustaka/" },
  openGraph: {
    title: "Pustaka & Media | INTI Kepri",
    description:
      "Rekaman kegiatan dan dokumen resmi INTI Kepulauan Riau — makalah, laporan, dan publikasi.",
    url: "https://intikepri.com/pustaka/",
  },
};

// Kontrak data sama seperti berita: CI mengisi src/data/video.json & dokumen.json
// dari endpoint CMS saat build; bila file belum ada -> array kosong.
function getVideos(): VideoItem[] {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "src/data/video.json"),
      "utf-8",
    );
    return JSON.parse(raw) as VideoItem[];
  } catch {
    return fallbackVideos;
  }
}

function getDocuments(): DocumentItem[] {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "src/data/dokumen.json"),
      "utf-8",
    );
    return JSON.parse(raw) as DocumentItem[];
  } catch {
    return fallbackDocuments;
  }
}

export default function PustakaPage() {
  const videos = getVideos();
  const documents = getDocuments();

  // SEO: CollectionPage + ItemList video (VideoObject bisa muncul di hasil pencarian Google)
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pustaka & Media INTI Kepri",
    url: "https://intikepri.com/pustaka/",
    isPartOf: { "@type": "WebSite", url: "https://intikepri.com/" },
  };
  const videoLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        description: v.description || v.title,
        thumbnailUrl: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
        uploadDate: v.date,
        embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      {videos.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}
      <Navbar />
      <main className="pt-24">
        <Breadcrumb items={[{ label: "Pustaka" }]} />
        <PustakaClient videos={videos} documents={documents} />
      </main>
      <Footer />
    </>
  );
}
