import fs from "fs";
import type { MetadataRoute } from "next";
import path from "path";

import { SITE_URL } from "@/lib/site";
import type { AgendaEvent, News } from "@/types";

export const dynamic = "force-static";

function toISODate(date: string): string | undefined {
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  let news: News[] = [];
  try {
    news = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "src", "data", "news.json"),
        "utf-8",
      ),
    );
  } catch {}

  let agenda: AgendaEvent[] = [];
  try {
    agenda = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "src", "data", "agenda.json"),
        "utf-8",
      ),
    );
  } catch {}

  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/tentang-kami/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/berita/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/agenda/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/galeri/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/direktori/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/pustaka/`, changeFrequency: "weekly", priority: 0.7 },
    ...news.map((n) => ({
      url: `${SITE_URL}/berita/${n.slug}/`,
      lastModified: toISODate(n.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...agenda.map((e) => ({
      url: `${SITE_URL}/agenda/${e.slug}/`,
      lastModified: toISODate(e.date),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
