"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

let Document: any, Page: any, pdfjs: any;
let loaded = false;

async function loadPdfLib() {
  if (loaded || typeof window === "undefined") return;
  const mod = await import("react-pdf");
  Document = mod.Document;
  Page = mod.Page;
  pdfjs = mod.pdfjs;
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
  loaded = true;
}

export default function PdfViewer({ dataUrl, onClose }: { dataUrl: string; onClose: () => void }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [ready, setReady] = useState(false);

  useEffect(() => { loadPdfLib().then(() => setReady(true)); }, []);

  return (
    <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1A1A1A] w-full max-w-4xl max-h-[90vh] flex flex-col rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 bg-[#0F0F0F] border-b border-white/10">
          <div className="flex items-center gap-3">
            <button onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1} className="p-1.5 text-white/60 hover:text-white disabled:opacity-30">
              <ChevronLeft size={18} />
            </button>
            <span className="text-white/80 font-sans text-sm">{pageNumber} / {numPages || "?"}</span>
            <button onClick={() => setPageNumber(p => Math.min(numPages, p + 1))} disabled={pageNumber >= numPages} className="p-1.5 text-white/60 hover:text-white disabled:opacity-30">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setScale(s => Math.max(0.5, s - 0.2))} className="p-1.5 text-white/60 hover:text-white"><ZoomOut size={18} /></button>
            <span className="text-white/60 font-sans text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(s => Math.min(3, s + 0.2))} className="p-1.5 text-white/60 hover:text-white"><ZoomIn size={18} /></button>
            <button onClick={onClose} className="ml-3 p-1.5 text-white/60 hover:text-red-400"><X size={18} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-auto flex justify-center p-6">
          {!ready ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-[#A42A28] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Document
              file={dataUrl}
              onLoadSuccess={({ numPages: np }: any) => setNumPages(np)}
              loading={
                <div className="flex items-center justify-center h-64">
                  <div className="w-8 h-8 border-2 border-[#A42A28] border-t-transparent rounded-full animate-spin" />
                </div>
              }
              error={<div className="text-white/60 font-sans text-center py-10">Gagal memuat PDF.</div>}
            >
              <Page pageNumber={pageNumber} scale={scale} className="shadow-xl" />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}