import "./globals.css";

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "INTI Kepri | Perhimpunan Indonesia Tionghoa Provinsi Kepulauan Riau",
    template: "%s | INTI Kepri",
  },
  description:
    "Perhimpunan Indonesia Tionghoa (INTI) Provinsi Kepulauan Riau - Tulus memberi, ikhlas mengabdi.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "INTI Kepri",
    images: [{ url: "/images/Logo-INTI.png", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
