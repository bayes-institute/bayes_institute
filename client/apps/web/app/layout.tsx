import type { Metadata } from 'next';
import { EB_Garamond, Manrope } from 'next/font/google';
import { PromoBar } from '../components/promo-bar';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import './styles.css';

const displayFont = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Bayes Institute',
  description: 'Learning through inquiry, practice, and community.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Bayes Institute',
    description: 'Learning through inquiry, practice, and community.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <PromoBar />
        <div className="site-shell">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
