import type { Metadata } from "next";

import { ORG_NAME, SITE_NAME } from "@/lib/site";

export const DEFAULT_OG_IMAGE = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${ORG_NAME}`,
};

export const baseOpenGraph = {
  siteName: SITE_NAME,
  locale: "id_ID",
  images: [DEFAULT_OG_IMAGE],
};

interface PageMetaInput {
  title: string;
  description: string;
  /** Site-relative canonical path with trailing slash, e.g. "/berita/". */
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noindex,
}: PageMetaInput): Metadata {
  const images = image ? [{ url: image, alt: title }] : [DEFAULT_OG_IMAGE];
  const common = {
    ...baseOpenGraph,
    title,
    description,
    url: path,
    images,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph:
      type === "article"
        ? {
            ...common,
            type: "article",
            ...(publishedTime ? { publishedTime } : {}),
          }
        : { ...common, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
