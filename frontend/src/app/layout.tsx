import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: {
    default: "INTI Kepri — Perhimpunan Indonesia Tionghoa Provinsi Kepulauan Riau",
    template: "%s | INTI Kepri",
  },
  description:
    "Perhimpunan Indonesia Tionghoa (INTI) Provinsi Kepulauan Riau — berdedikasi untuk membangun masyarakat yang rukun, sejahtera, dan berkeadilan.",
  robots: {
    index: false,
    follow: false,
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
