import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import BeritaListClient from "./BeritaListClient";
import { categories, fallbackNews } from "@/lib/data";
import type { News } from "@/types";

function getNews(): News[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "news.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed: News[] = JSON.parse(content);
    return parsed.length > 0 ? parsed : fallbackNews;
  } catch {
    return fallbackNews;
  }
}

export default async function BeritaPage() {
  const items = getNews();

  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <Breadcrumb items={[{ label: "Berita" }]} />
        <BeritaListClient initialItems={items} categories={categories} />
      </div>
      <Footer />
    </main>
  );
}
