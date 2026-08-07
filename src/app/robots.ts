import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // needed for output: 'export'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://intikepri.or.id/sitemap.xml",
  };
}