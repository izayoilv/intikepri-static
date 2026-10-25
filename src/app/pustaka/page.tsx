import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { getDocuments, getVideos } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { safeHttpUrl } from "@/lib/url";

import PustakaClient from "./PustakaClient";

export const metadata: Metadata = pageMetadata({
  title: "Pustaka & Media",
  description:
    "Rekaman kegiatan dan dokumen resmi Perhimpunan Indonesia Tionghoa (INTI) Provinsi Kepulauan Riau: makalah, laporan, dan publikasi.",
  path: "/pustaka/",
});

export default function PustakaPage() {
  const videos = getVideos();
  // Only documents with an absolute http(s) or site-relative link are listed.
  const documents = getDocuments().filter(
    (d) => d.file_url?.startsWith("/") || safeHttpUrl(d.file_url),
  );

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pustaka & Media INTI Kepri",
    url: `${SITE_URL}/pustaka/`,
    isPartOf: { "@type": "WebSite", url: `${SITE_URL}/` },
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
        thumbnailUrl: `https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg`,
        uploadDate: v.date,
        embedUrl: `https://www.youtube.com/embed/${v.youtube_id}`,
      },
    })),
  };

  return (
    <main>
      <JsonLd data={collectionLd} />
      {videos.length > 0 && <JsonLd data={videoLd} />}
      <Navbar />
      <div className="pt-16">
        <Breadcrumb items={[{ label: "Pustaka" }]} />
        <PustakaClient videos={videos} documents={documents} />
      </div>
      <Footer />
    </main>
  );
}
