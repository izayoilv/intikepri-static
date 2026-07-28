"use client";

import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";

import Breadcrumb from "@/components/Breadcrumb";
import type { News } from "@/types";

interface Props {
  news: News | null;
}

export default function BeritaDetailClient({ news }: Props) {
  const item = news || null;

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] pt-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 text-center">
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
            Berita tidak ditemukan
          </h1>
          <Link href="/berita" className="text-[#A42A28] font-sans text-sm">
            Kembali ke daftar berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="bg-[#1A1A1A] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-sans text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Berita
          </Link>
          <span className="inline-block bg-[#A42A28] text-white text-xs font-sans px-3 py-1 mb-4">
            {item.location}
          </span>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {item.title}
          </h1>
          <p className="text-white/40 font-sans text-sm flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {item.date}
            </span>
            <span className="flex items-center gap-1">
              <User size={14} /> {item.author}
            </span>
          </p>
        </div>
      </div>
      <Breadcrumb
        items={[{ label: "Berita", to: "/berita" }, { label: item.title }]}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white border border-[#E5E5E5] overflow-hidden mb-8">
          <div
            className="aspect-[16/9] bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        </div>

        <div className="bg-white border border-[#E5E5E5] p-6 md:p-10 mb-8">
          <div className="prose prose-sm max-w-none text-[#666666] font-sans leading-relaxed whitespace-pre-line">
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
}
