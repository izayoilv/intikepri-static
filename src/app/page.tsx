import fs from "fs";
import path from "path";

import AgendaSection from "@/components/AgendaSection";
import DirektoriSection from "@/components/DirektoriSection";
import Footer from "@/components/Footer";
import GaleriSection from "@/components/GaleriSection";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import StructureSection from "@/components/StructureSection";
import {
  fallbackAgenda,
  fallbackBusinesses,
  fallbackGallery,
  fallbackNews,
} from "@/lib/data";
import type { AgendaEvent, Business, GalleryPhoto, News } from "@/types";
import type { Metadata } from "next";

function getLatestGallery(): GalleryPhoto[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "galeri.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed: GalleryPhoto[] = JSON.parse(content);
    return parsed.length > 0 ? parsed.slice(0, 8) : fallbackGallery;
  } catch {
    return fallbackGallery;
  }
}

function getLatestBusinesses(): Business[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "direktori.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed: Business[] = JSON.parse(content);
    return parsed.length > 0 ? parsed.slice(0, 3) : fallbackBusinesses;
  } catch {
    return fallbackBusinesses;
  }
}

function getUpcomingAgenda(): AgendaEvent[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "agenda.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed: AgendaEvent[] = JSON.parse(content);
    const today = new Date().toISOString().slice(0, 10);
    return parsed
      .filter((e) => (e.endDate || e.date) >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3);
  } catch {
    return fallbackAgenda;
  }
}

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
  const latestGallery = getLatestGallery();
  const latestBusinesses = getLatestBusinesses();
  const upcomingAgenda = getUpcomingAgenda();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <Navbar />
      <HeroSection />
      <IntroSection />
      <AgendaSection initialItems={upcomingAgenda} />
      <NewsSection initialItems={latestNews} />
      <GaleriSection initialItems={latestGallery} />
      <DirektoriSection initialItems={latestBusinesses} />
      <StructureSection />
      <Footer />
    </main>
  );
}
