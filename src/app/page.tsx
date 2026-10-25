import type { Metadata } from "next";

import AgendaSection from "@/components/AgendaSection";
import BidangSection from "@/components/BidangSection";
import DirektoriSection from "@/components/DirektoriSection";
import Footer from "@/components/Footer";
import GaleriSection from "@/components/GaleriSection";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import JaringanSection from "@/components/JaringanSection";
import JsonLd from "@/components/JsonLd";
import MottoBand from "@/components/MottoBand";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import {
  getBusinesses,
  getGallery,
  getNews,
  getUpcomingAgenda,
  toNewsSummary,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CONTACT, ORG_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `INTI Kepri | ${ORG_NAME}`,
    description:
      "Perhimpunan Indonesia Tionghoa (INTI) Provinsi Kepulauan Riau - Tulus memberi, ikhlas mengabdi.",
    path: "/",
  }),
  title: { absolute: `INTI Kepri | ${ORG_NAME}` },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: ORG_NAME,
  alternateName: "INTI Kepri",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/Logo-INTI-512.png`,
  email: CONTACT.email,
  description:
    "Perhimpunan Indonesia Tionghoa (INTI) Provinsi Kepulauan Riau - Tulus memberi, ikhlas mengabdi.",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Ruko The Capitol Blok B No. 42, Superblok Imperium, Jl. Jend. Sudirman, Kel. Taman Baloi, Kec. Batam Kota",
    addressLocality: "Kota Batam",
    postalCode: "29432",
    addressRegion: "Kepulauan Riau",
    addressCountry: "ID",
  },
  areaServed: "Kepulauan Riau",
  sameAs: [CONTACT.facebook, CONTACT.instagram],
};

export default function HomePage() {
  const latestNews = getNews()
    .slice(0, 4)
    .map((n) => toNewsSummary(n));
  const gallery = getGallery();
  const latestBusinesses = getBusinesses();
  const upcomingAgenda = getUpcomingAgenda();

  return (
    <main>
      <JsonLd data={organizationLd} />
      <Navbar />
      <HeroSection latest={latestNews[0] ?? null} />
      <MottoBand />
      <IntroSection />
      <AgendaSection initialItems={upcomingAgenda} />
      <NewsSection initialItems={latestNews} />
      <BidangSection photos={gallery.map((g) => g.image)} />
      <JaringanSection />
      <GaleriSection initialItems={gallery.slice(0, 8)} />
      <DirektoriSection initialItems={latestBusinesses} />
      <Footer />
    </main>
  );
}
