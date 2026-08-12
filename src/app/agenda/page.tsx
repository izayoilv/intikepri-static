import fs from "fs";
import type { Metadata } from "next";
import path from "path";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { AgendaEvent } from "@/types";

import AgendaListClient from "./AgendaListClient";

export const metadata: Metadata = {
  title: "Agenda Kegiatan",
  description:
    "Agenda dan jadwal kegiatan INTI Kepulauan Riau: bakti sosial, rapat, perayaan budaya, dan program kemasyarakatan yang akan datang.",
  alternates: { canonical: "/agenda/" },
  openGraph: {
    title: "Agenda Kegiatan | INTI Kepri",
    description:
      "Agenda dan jadwal kegiatan INTI Kepulauan Riau: bakti sosial, rapat, perayaan budaya, dan program kemasyarakatan yang akan datang.",
    type: "website",
  },
};

function getAgenda(): AgendaEvent[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "agenda.json");
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export default function AgendaPage() {
  const items = getAgenda();

  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <Breadcrumb items={[{ label: "Agenda" }]} />
        <AgendaListClient items={items} />
      </div>
      <Footer />
    </main>
  );
}
