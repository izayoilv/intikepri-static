import fs from "fs";
import path from "path";

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

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = getAllNews();
  const news = items.find((n) => n.slug === slug) || null;
  return <BeritaDetailClient news={news} />;
}
