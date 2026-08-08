import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import type { AgendaEvent, News } from "@/types";

export const dynamic = "force-static";

const BASE = "https://intikepri.com";

function toISODate(date: string): string | undefined {
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  let news: News[] = [];
  try {
    news = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "src", "data", "news.json"), "utf-8")
    );
  } catch {}

  let agenda: AgendaEvent[] = [];
  try {
    agenda = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "src", "data", "agenda.json"), "utf-8")
    );
  } catch {}

  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/tentang-kami/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/berita/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/agenda/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/galeri/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/direktori/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/pustaka/`, changeFrequency: "weekly", priority: 0.7 },
    ...news.map((n) => ({
      url: `${BASE}/berita/${n.slug}/`,
      lastModified: toISODate(n.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...agenda.map((e) => ({
      url: `${BASE}/agenda/${e.slug}/`,
      lastModified: toISODate(e.date),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
