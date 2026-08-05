import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bayes Institute",
    template: "%s — Bayes Institute",
  },
  description: "A home for rigorous thinking, ambitious inquiry, and the people shaping what comes next.",
  manifest: "/assets/logos/site.webmanifest",
  icons: {
    icon: [
      { url: "/assets/logos/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/logos/favicon.ico" },
    ],
    shortcut: "/assets/logos/favicon.ico",
    apple: "/assets/logos/apple-touch-icon.png",
  },
  openGraph: {
    title: "Bayes Institute",
    description: "The future belongs to better questions.",
    images: [
      {
        url: "/assets/logos/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bayes Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayes Institute",
    description: "The future belongs to better questions.",
    images: ["/assets/logos/twitter-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFEFA",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  );
}
