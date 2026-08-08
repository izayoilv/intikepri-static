import fs from "fs";
import path from "path";

import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { fallbackBusinesses } from "@/lib/data";
import type { Business } from "@/types";

import DirektoriListClient from "./DirektoriListClient";

export const metadata: Metadata = {
  title: "Direktori Bisnis",
  description:
    "Direktori bisnis anggota dan komunitas INTI Kepulauan Riau: kuliner, jasa, retail, dan UMKM di Batam, Tanjungpinang, Karimun, dan seluruh Kepri.",
  alternates: { canonical: "/direktori/" },
  openGraph: {
    title: "Direktori Bisnis — INTI Kepri",
    description:
      "Direktori bisnis anggota dan komunitas INTI Kepulauan Riau: kuliner, jasa, retail, dan UMKM di seluruh Kepri.",
    type: "website",
  },
};

function getBusinesses(): Business[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "direktori.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed: Business[] = JSON.parse(content);
    return parsed.length > 0 ? parsed : fallbackBusinesses;
  } catch {
    return fallbackBusinesses;
  }
}

const BASE = "https://intikepri.com";

export default async function DirektoriPage() {
  const items = getBusinesses();

  // SEO: setiap bisnis terdaftar sebagai LocalBusiness dalam ItemList
  const itemListLd =
    items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Direktori Bisnis INTI Kepri",
          url: `${BASE}/direktori/`,
          itemListElement: items.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "LocalBusiness",
              name: b.name,
              description: b.description,
              ...(b.image ? { image: b.image } : {}),
              ...(b.phone ? { telephone: b.phone } : {}),
              ...(b.website ? { url: b.website } : {}),
              address: {
                "@type": "PostalAddress",
                ...(b.address ? { streetAddress: b.address } : {}),
                addressLocality: b.location,
                addressRegion: "Kepulauan Riau",
                addressCountry: "ID",
              },
            },
          })),
        }
      : null;

  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <Breadcrumb items={[{ label: "Direktori Bisnis" }]} />
        {itemListLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
          />
        )}
        <DirektoriListClient initialItems={items} />
      </div>
      <Footer />
    </main>
  );
}
