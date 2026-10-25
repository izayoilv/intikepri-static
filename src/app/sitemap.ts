import type { MetadataRoute } from "next";

import { getAgenda, getNews } from "@/lib/content";
import { NEWS_PAGE_SIZE, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function toISODate(date: string): string | undefined {
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const news = getNews();
  const agenda = getAgenda();
  const newsPages = Math.ceil(news.length / NEWS_PAGE_SIZE);

  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/tentang-kami/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/berita/`, changeFrequency: "weekly", priority: 0.9 },
    ...Array.from({ length: Math.max(0, newsPages - 1) }, (_, i) => ({
      url: `${SITE_URL}/berita/halaman/${i + 2}/`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    { url: `${SITE_URL}/agenda/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/galeri/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/direktori/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/pustaka/`, changeFrequency: "weekly", priority: 0.7 },
    {
      url: `${SITE_URL}/bergabung/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...news.map((n) => ({
      url: `${SITE_URL}/berita/${n.slug}/`,
      lastModified: toISODate(n.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...agenda.map((e) => ({
      url: `${SITE_URL}/agenda/${e.slug}/`,
      lastModified: toISODate(e.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
