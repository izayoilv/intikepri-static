import fs from "fs";
import path from "path";

import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import QuoteSection from "@/components/QuoteSection";
import StructureSection from "@/components/StructureSection";
import { fallbackNews } from "@/lib/data";
import type { News } from "@/types";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Perhimpunan Indonesia Tionghoa Provinsi Kepulauan Riau",
  alternateName: "INTI Kepri",
  url: "https://intikepri.com/",
  logo: "https://intikepri.com/images/Logo-INTI.png",
  description:
    "Perhimpunan Indonesia Tionghoa (INTI) Provinsi Kepulauan Riau - Tulus memberi, ikhlas mengabdi.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ruko The Capitol Blok B No. 42, Superblok Imperium, Jl. Jend. Sudirman, Kel. Taman Baloi, Kec. Batam Kota",
    addressLocality: "Kota Batam",
    postalCode: "29432",
    addressRegion: "Kepulauan Riau",
    addressCountry: "ID",
  },
  areaServed: "Kepulauan Riau",
  sameAs: [
    "https://www.facebook.com/groups/perhimpunanintikepri/",
    "https://www.instagram.com/inti.kepri/",
  ],
};

export default async function HomePage() {
  const latestNews = getLatestNews();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <Navbar />
      <HeroSection />
      <IntroSection />
      <NewsSection initialItems={latestNews} />
      <QuoteSection />
      <StructureSection />
      <Footer />
    </main>
  );
}


