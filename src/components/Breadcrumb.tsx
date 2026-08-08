"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

import { SITE_URL } from "@/lib/site";

interface Item {
  label: string;
  to?: string;
}

export default function Breadcrumb({
  items,
  hideNav = false,
}: {
  items: Item[];

  hideNav?: boolean;
}) {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: `${SITE_URL}/`,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.to
          ? {
              item: `${SITE_URL}${item.to.endsWith("/") ? item.to : `${item.to}/`}`,
            }
          : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {!hideNav && (
        <nav
          className="bg-white border-b border-[#E5E5E5]"
          aria-label="Breadcrumb"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm font-sans">
              <li>
                <Link
                  href="/"
                  className="text-[#999999] hover:text-[#A42A28] transition-colors flex items-center gap-1"
                >
                  <Home size={14} />{" "}
                  <span className="hidden sm:inline">Beranda</span>
                </Link>
              </li>
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 min-w-0">
                  <ChevronRight
                    size={14}
                    className="text-[#CCCCCC] flex-shrink-0"
                  />
                  {item.to ? (
                    <Link
                      href={item.to}
                      className="text-[#999999] hover:text-[#A42A28] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[#A42A28] font-medium truncate max-w-[180px] sm:max-w-xs md:max-w-md inline-block align-middle">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}
    </>
  );
}
