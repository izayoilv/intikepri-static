import fs from "fs";
import path from "path";

import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { fallbackAgenda } from "@/lib/data";
import type { AgendaEvent } from "@/types";

import AgendaListClient from "./AgendaListClient";

export const metadata: Metadata = {
  title: "Agenda Kegiatan",
  description:
    "Agenda dan jadwal kegiatan INTI Kepulauan Riau: bakti sosial, rapat, perayaan budaya, dan program kemasyarakatan yang akan datang.",
  alternates: { canonical: "/agenda/" },
  openGraph: {
    title: "Agenda Kegiatan — INTI Kepri",
    description:
      "Agenda dan jadwal kegiatan INTI Kepulauan Riau: bakti sosial, rapat, perayaan budaya, dan program kemasyarakatan yang akan datang.",
    type: "website",
  },
};

function getAgenda(): AgendaEvent[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "agenda.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed: AgendaEvent[] = JSON.parse(content);
    return parsed.length > 0 ? parsed : fallbackAgenda;
  } catch {
    return fallbackAgenda;
  }
}

export function isUpcoming(e: AgendaEvent, today: string): boolean {
  return (e.endDate || e.date) >= today;
}

export default async function AgendaPage() {
  const items = getAgenda();
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = items
    .filter((e) => isUpcoming(e, today))
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = items
    .filter((e) => !isUpcoming(e, today))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <Breadcrumb items={[{ label: "Agenda" }]} />
        <AgendaListClient upcoming={upcoming} past={past} />
      </div>
      <Footer />
    </main>
  );
}
