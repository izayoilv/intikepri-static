import fs from "fs";
import path from "path";

import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { News } from "@/types";

import BeritaDetailClient from "./BeritaDetailClient";

// Helper untuk membaca data berita (sesuaikan dengan implementasi asli di tokomu jika berbeda)
function getAllNews(): News[] {
  try {
    const filePath = path.join(process.cwd(), "src/data/news.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch {
    return [];
  }
}

const BASE = "https://intikepri.com";

function toISODate(date: string): string | undefined {
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

// SEO: metadata unik per artikel (title, description, Open Graph untuk share preview)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = getAllNews().find((n) => n.slug === slug);

  if (!news) return { title: "Berita tidak ditemukan | INTI Kepri" };

  const description = news.content.replace(/\s+/g, " ").slice(0, 160);

  return {
    title: `${news.title} | INTI Kepri`,
    description,
    alternates: { canonical: `/berita/${news.slug}/` },
    openGraph: {
      title: news.title,
      description,
      type: "article",
      images: [{ url: news.image, width: 1200, height: 630 }],
    },
  };
}

export async function generateStaticParams() {
  const items = getAllNews();
  if (items.length === 0) return [{ slug: "belum-ada-berita" }];
  return items.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = getAllNews();
  const news = items.find((n) => n.slug === slug) || null;

  // Berita lainnya: semua berita selain yang sedang dibuka, ambil 3 teratas
  const relatedNews = items.filter((n) => n.slug !== slug).slice(0, 3);

  const isoDate = news ? toISODate(news.date) : undefined;

  const articleLd = news
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: news.title,
        ...(isoDate ? { datePublished: isoDate, dateModified: isoDate } : {}),
        author: { "@type": "Person", name: news.author },
        image: news.image?.startsWith("http")
          ? news.image
          : `${BASE}${news.image}`,
        publisher: {
          "@type": "Organization",
          name: "INTI Kepri",
          logo: {
            "@type": "ImageObject",
            url: `${BASE}/images/Logo-INTI.png`,
          },
        },
        mainEntityOfPage: `${BASE}/berita/${news.slug}/`,
      }
    : null;

  return (
    <main>
      {articleLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
      )}
      <Navbar />
      <div className="pt-24">
        <Breadcrumb
          items={
            news
              ? [{ label: "Berita", to: "/berita" }, { label: news.title }]
              : [{ label: "Berita", to: "/berita" }, { label: "Tidak ditemukan" }]
          }
        />
        <BeritaDetailClient news={news} relatedNews={relatedNews} />
      </div>
      <Footer />
    </main>
  );
}
