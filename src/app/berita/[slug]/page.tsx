import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { getNews, toNewsSummary } from "@/lib/content";
import { newsToLedeHtml } from "@/lib/news-html";
import { newsToText } from "@/lib/news-text";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { absoluteUrl } from "@/lib/url";

import BeritaDetail from "./BeritaDetail";

type Params = Promise<{ slug: string }>;

function toISODate(date: string): string | undefined {
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = getNews().find((n) => n.slug === slug);

  if (!news) {
    return { title: "Berita tidak ditemukan", robots: { index: false } };
  }

  const text = newsToText(news.content);
  const description =
    text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;

  return pageMetadata({
    title: news.title,
    description,
    path: `/berita/${news.slug}/`,
    image: news.image || null,
    type: "article",
    publishedTime: toISODate(news.date),
  });
}

export async function generateStaticParams() {
  const items = getNews();
  if (items.length === 0) return [{ slug: "belum-ada-berita" }];
  return items.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export default async function BeritaDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const items = getNews();
  const news = items.find((n) => n.slug === slug) || null;

  const relatedNews = items
    .filter((n) => n.slug !== slug)
    .slice(0, 3)
    .map((n) => toNewsSummary(n));

  const isoDate = news ? toISODate(news.date) : undefined;
  const contentHtml = news ? newsToLedeHtml(news.content) : null;

  const articleLd = news
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: news.title,
        ...(isoDate ? { datePublished: isoDate, dateModified: isoDate } : {}),
        author: { "@type": "Person", name: news.author },
        ...(news.image ? { image: absoluteUrl(SITE_URL, news.image) } : {}),
        publisher: {
          "@type": "Organization",
          name: "INTI Kepri",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/images/Logo-INTI-512.png`,
          },
        },
        mainEntityOfPage: `${SITE_URL}/berita/${news.slug}/`,
      }
    : null;

  return (
    <main>
      {articleLd && <JsonLd data={articleLd} />}
      <Navbar />
      <div className="pt-16">
        <Breadcrumb
          width="max-w-4xl"
          items={
            news
              ? [{ label: "Berita", to: "/berita" }, { label: news.title }]
              : [
                  { label: "Berita", to: "/berita" },
                  { label: "Tidak ditemukan" },
                ]
          }
        />
        <BeritaDetail
          news={news}
          relatedNews={relatedNews}
          contentHtml={contentHtml}
        />
      </div>
      <Footer />
    </main>
  );
}
