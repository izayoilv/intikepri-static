import { SITE_URL } from "@/lib/site";

interface Item {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items }: { items: Item[] }) {
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
    />
  );
}
