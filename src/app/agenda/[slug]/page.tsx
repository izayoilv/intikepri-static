import fs from "fs";
import path from "path";

import type { Metadata } from "next";

import type { AgendaEvent } from "@/types";

import AgendaDetailClient from "./AgendaDetailClient";

function getAllAgenda(): AgendaEvent[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "agenda.json");
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

const BASE = "https://intikepri.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getAllAgenda().find((e) => e.slug === slug);

  if (!event) return { title: "Agenda tidak ditemukan | INTI Kepri" };

  const description = event.description.replace(/\s+/g, " ").slice(0, 160);

  return {
    title: `${event.title} | INTI Kepri`,
    description,
    alternates: { canonical: `/agenda/${event.slug}/` },
    openGraph: {
      title: event.title,
      description,
      type: "website",
      ...(event.image ? { images: [{ url: event.image, width: 1200, height: 630 }] } : {}),
    },
  };
}

export async function generateStaticParams() {
  const items = getAllAgenda();
  if (items.length === 0) return [{ slug: "belum-ada-agenda" }];
  return items.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export default async function AgendaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = getAllAgenda();
  const event = items.find((e) => e.slug === slug) || null;

  const today = new Date().toISOString().slice(0, 10);
  const related = items
    .filter((e) => e.slug !== slug)
    .sort((a, b) => {
      const aUp = (a.endDate || a.date) >= today ? 0 : 1;
      const bUp = (b.endDate || b.date) >= today ? 0 : 1;
      return aUp - bUp || a.date.localeCompare(b.date);
    })
    .slice(0, 3);

  // SEO: structured data Event — agenda bisa tampil sebagai rich result di Google
  const eventLd = event
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: event.description.replace(/\s+/g, " ").slice(0, 300),
        startDate: event.date,
        ...(event.endDate ? { endDate: event.endDate } : {}),
        ...(event.image ? { image: event.image } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: event.venue || event.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: event.location,
            addressRegion: "Kepulauan Riau",
            addressCountry: "ID",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "INTI Kepri",
          url: `${BASE}/`,
        },
        url: `${BASE}/agenda/${event.slug}/`,
      }
    : null;

  return (
    <>
      {eventLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
        />
      )}
      <AgendaDetailClient event={event} related={related} />
    </>
  );
}
