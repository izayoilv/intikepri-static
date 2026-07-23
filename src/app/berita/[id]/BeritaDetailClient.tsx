"use client";

import { ArrowLeft, Calendar, FileText, ImageIcon, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Breadcrumb from "@/components/Breadcrumb";
import PdfViewer from "@/components/PdfViewer";
import { fallbackNews } from "@/lib/data";
import type { Attachment, News } from "@/types";

interface Props {
  id: number;
  news: News | null;
}

export default function BeritaDetailClient({ id, news }: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const item = news || fallbackNews.find((n) => Number(n.id) === id) || null;

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

  const attachments: Attachment[] = item.attachments || [];
  const images = attachments.filter((a: Attachment) => a.type === "image");
  const pdfs = attachments.filter((a: Attachment) => a.type === "pdf");

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
            {item.category}
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
          <p className="font-serif text-lg text-[#1A1A1A] mb-6 leading-relaxed">
            {item.summary}
          </p>
          <div className="prose prose-sm max-w-none text-[#666666] font-sans leading-relaxed whitespace-pre-line">
            {item.content}
          </div>
        </div>

        {images.length > 0 && (
          <div className="bg-white border border-[#E5E5E5] p-6 mb-8">
            <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-[#A42A28]" /> Lampiran Gambar
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img: Attachment) => (
                <a
                  key={img.id}
                  href={img.dataUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-cover bg-center border border-[#E5E5E5] hover:border-[#A42A28] transition-colors"
                  style={{ backgroundImage: `url(${img.dataUrl})` }}
                />
              ))}
            </div>
          </div>
        )}

        {pdfs.length > 0 && (
          <div className="bg-white border border-[#E5E5E5] p-6">
            <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <FileText size={18} className="text-[#A42A28]" /> Dokumen PDF
            </h3>
            <div className="space-y-2">
              {pdfs.map((pdf: Attachment) => (
                <button
                  key={pdf.id}
                  onClick={() => setPdfUrl(pdf.dataUrl)}
                  className="w-full flex items-center gap-3 p-3 bg-[#F7F7F7] hover:bg-[#A42A28]/5 transition-colors text-left border border-[#E5E5E5]"
                >
                  <FileText size={18} className="text-red-500 flex-shrink-0" />
                  <span className="font-sans text-sm text-[#1A1A1A] flex-1 truncate">
                    {pdf.name}
                  </span>
                  <span className="font-sans text-xs text-[#999999]">
                    {(pdf.size / 1024).toFixed(0)} KB
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {pdfUrl && <PdfViewer dataUrl={pdfUrl} onClose={() => setPdfUrl(null)} />}
    </div>
  );
}
