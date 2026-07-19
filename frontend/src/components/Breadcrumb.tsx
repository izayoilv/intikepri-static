"use client";

import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface Item { label: string; to?: string; }

export default function Breadcrumb({ items }: { items: Item[] }) {
  return (
    <nav className="bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <ol className="flex items-center gap-2 text-sm font-sans">
          <li>
            <Link href="/" className="text-[#999999] hover:text-[#A42A28] transition-colors flex items-center gap-1">
              <Home size={14} /> <span className="hidden sm:inline">Beranda</span>
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-[#CCCCCC]" />
              {item.to ? (
                <Link href={item.to} className="text-[#999999] hover:text-[#A42A28] transition-colors">{item.label}</Link>
              ) : (
                <span className="text-[#A42A28] font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}