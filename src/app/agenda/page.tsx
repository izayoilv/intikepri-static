import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAgenda } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

import AgendaListClient from "./AgendaListClient";

export const metadata: Metadata = pageMetadata({
  title: "Agenda Kegiatan",
  description:
    "Agenda dan jadwal kegiatan INTI Kepulauan Riau: bakti sosial, rapat, perayaan budaya, dan program kemasyarakatan yang akan datang.",
  path: "/agenda/",
});

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
