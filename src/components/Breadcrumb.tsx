import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

interface Item {
  label: string;
  to?: Route;
}

export default function Breadcrumb({
  items,
  width = "max-w-7xl",
  tone = "light",
}: {
  items: Item[];
  /** Tailwind max-width class so the trail lines up with the page content. */
  width?: string;
  tone?: "light" | "dark";
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

  const dark = tone === "dark";
  const linkClass = dark
    ? "text-white/70 hover:text-white transition-colors"
    : "text-[#6B6B6B] hover:text-[#A42A28] transition-colors";

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <nav
        aria-label="Breadcrumb"
        className={`${width} mx-auto px-4 md:px-8 pt-5`}
      >
        <ol className="flex items-center gap-1.5 font-sans text-xs min-w-0">
          <li className="flex-shrink-0">
            <Link href="/" className={linkClass}>
              Beranda
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5 min-w-0">
              <ChevronRight
                size={12}
                aria-hidden="true"
                className={`flex-shrink-0 ${dark ? "text-white/40" : "text-[#AAAAAA]"}`}
              />
              {item.to ? (
                <Link
                  href={item.to}
                  className={`${linkClass} whitespace-nowrap`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className={`truncate ${dark ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
