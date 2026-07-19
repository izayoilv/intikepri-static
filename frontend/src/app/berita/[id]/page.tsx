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
  return items.map((n) => ({ id: String(n.id) }));
}

export const dynamicParams = false;

export default async function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const items = getAllNews();
  const news = items.find((n) => String(n.id) === id) || null;
  return <BeritaDetailClient news={news} id={Number(id)} />;
}
