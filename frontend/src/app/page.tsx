import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import NewsSection from "@/components/NewsSection";
import StructureSection from "@/components/StructureSection";
import Footer from "@/components/Footer";
import { fallbackNews } from "@/lib/data";
import type { News } from "@/types";

function getLatestNews(): News[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "news.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed: News[] = JSON.parse(content);
    return parsed.length > 0 ? parsed.slice(0, 3) : fallbackNews;
  } catch {
    return fallbackNews;
  }
}

export default async function HomePage() {
  const latestNews = getLatestNews();

  return (
    <main>
      <Navbar />
      <HeroSection />
      <IntroSection />
      <NewsSection initialItems={latestNews} />
      <StructureSection />
      <Footer />
    </main>
  );
}
