import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { agendaIso } from "@/lib/agenda";
import { getAgenda } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { absoluteUrl } from "@/lib/url";

import AgendaDetailClient from "./AgendaDetailClient";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getAgenda().find((e) => e.slug === slug);

  if (!event) {
    return { title: "Agenda tidak ditemukan", robots: { index: false } };
  }

  const text = event.description.replace(/\s+/g, " ").trim();
  const description =
    text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;

  return pageMetadata({
    title: event.title,
    description,
    path: `/agenda/${event.slug}/`,
    image: event.image || null,
  });
}

export async function generateStaticParams() {
  const items = getAgenda();
  if (items.length === 0) return [{ slug: "belum-ada-agenda" }];
  return items.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export default async function AgendaDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const items = getAgenda();
  const event = items.find((e) => e.slug === slug) || null;

  const eventLd = event
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: event.description.replace(/\s+/g, " ").slice(0, 300),
        startDate: agendaIso(event.date, event.start_time),
        ...(event.end_date || event.end_time
          ? {
              endDate: agendaIso(
                event.end_date || event.date,
                event.end_time || null,
              ),
            }
          : {}),
        ...(event.image ? { image: absoluteUrl(SITE_URL, event.image) } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
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
          url: `${SITE_URL}/`,
        },
        url: `${SITE_URL}/agenda/${event.slug}/`,
      }
    : null;

  return (
    <main>
      {eventLd && <JsonLd data={eventLd} />}
      <Navbar />
      <div className="pt-16 bg-[#F7F7F7]">
        <Breadcrumb
          width="max-w-4xl"
          items={[
            { label: "Agenda", to: "/agenda" },
            { label: event ? event.title : "Tidak ditemukan" },
          ]}
        />
        <AgendaDetailClient event={event} all={items} />
      </div>
      <Footer />
    </main>
  );
}
