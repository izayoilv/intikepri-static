import fs from "fs";
import path from "path";

import type { Metadata } from "next";

import type { News } from "@/types";

import BeritaDetailClient from "./BeritaDetailClient";

function getAllNews(): News[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "news.json");
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const items = getAllNews();
  if (items.length === 0) return [{ slug: "untitled" }];
  return items.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

// SEO: metadata unik per artikel (title, description, Open Graph untuk share preview)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = getAllNews().find((n) => n.slug === slug);

  if (!news) return { title: "Berita tidak ditemukan — INTI Kepri" };

  const description = news.content.replace(/\s+/g, " ").slice(0, 160);

  return {
    title: `${news.title} — INTI Kepri`,
    description,
    openGraph: {
      title: news.title,
      description,
      type: "article",
      images: [{ url: news.image }],
    },
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = getAllNews();
  const news = items.find((n) => n.slug === slug) || null;

  // Berita lainnya: semua berita selain yang sedang dibuka, ambil 3 teratas
  // (asumsi news.json sudah terurut dari yang terbaru)
  const relatedNews = items.filter((n) => n.slug !== slug).slice(0, 3);

  return <BeritaDetailClient news={news} relatedNews={relatedNews} />;
}