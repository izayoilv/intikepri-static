import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { getBusinesses } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { absoluteUrl, safeHttpUrl } from "@/lib/url";

import DirektoriListClient from "./DirektoriListClient";

export const metadata: Metadata = pageMetadata({
  title: "Direktori Bisnis",
  description:
    "Direktori bisnis anggota dan komunitas INTI Kepulauan Riau: kuliner, jasa, retail, dan UMKM di Batam, Tanjungpinang, Karimun, dan seluruh Kepri.",
  path: "/direktori/",
});

export default function DirektoriPage() {
  const items = getBusinesses();

  const itemListLd =
    items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Direktori Bisnis INTI Kepri",
          url: `${SITE_URL}/direktori/`,
          itemListElement: items.map((b, i) => {
            const image = b.banner || b.image;
            const website = safeHttpUrl(b.contacts?.website);
            return {
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "LocalBusiness",
                name: b.name,
                description: b.description,
                ...(image ? { image: absoluteUrl(SITE_URL, image) } : {}),
                ...(b.contacts?.phone ? { telephone: b.contacts.phone } : {}),
                ...(website ? { url: website } : {}),
                address: {
                  "@type": "PostalAddress",
                  ...(b.address ? { streetAddress: b.address } : {}),
                  addressLocality: b.location,
                  addressRegion: "Kepulauan Riau",
                  addressCountry: "ID",
                },
              },
            };
          }),
        }
      : null;

  return (
    <main>
      {itemListLd && <JsonLd data={itemListLd} />}
      <Navbar />
      <div className="pt-16">
        <Breadcrumb items={[{ label: "Direktori Bisnis" }]} />
        <DirektoriListClient initialItems={items} />
      </div>
      <Footer />
    </main>
  );
}
