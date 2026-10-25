import fs from "fs";
import path from "path";

import { agendaEndMs, sortAgenda } from "@/lib/agenda";
import { newsToText } from "@/lib/news-text";
import type {
  AgendaEvent,
  Business,
  DocumentItem,
  GalleryPhoto,
  News,
  NewsSummary,
  VideoItem,
} from "@/types";

function readData<T>(name: string): T[] {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "src", "data", `${name}.json`),
      "utf-8",
    );
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export const getNews = () => readData<News>("news");
export const getGallery = () => readData<GalleryPhoto>("gallery");
export const getBusinesses = () => readData<Business>("business");
export const getAgenda = () => readData<AgendaEvent>("agenda");
export const getDocuments = () => readData<DocumentItem>("document");
export const getVideos = () =>
  readData<VideoItem>("video").filter((v) =>
    /^[\w-]{6,20}$/.test(v.youtube_id ?? ""),
  );

/** Events that have not ended yet at build time, soonest first. */
export function getUpcomingAgenda(now = Date.now()): AgendaEvent[] {
  return sortAgenda(getAgenda().filter((e) => agendaEndMs(e) >= now));
}

/** Strips the article body so list pages don't ship full content to the browser. */
export function toNewsSummary(news: News, max = 170): NewsSummary {
  const { content, ...rest } = news;
  const text = newsToText(content);
  const excerpt = text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
  return { ...rest, excerpt };
}
