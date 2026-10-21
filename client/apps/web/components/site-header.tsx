import Link from 'next/link';
import { BrandMark } from './brand-mark';

const audienceLinks = [
  { label: 'For learners', href: '/#learners' },
  { label: 'For institutions', href: '/#institutions' },
  { label: 'For enterprise', href: '/#enterprise' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" aria-label="Bayes Institute home">
          <BrandMark />
        </Link>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          <div className="desktop-navigation__links">
            {audienceLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
            <Link href="/#about">About</Link>
          </div>
          <Link className="header-action" href="/#learners">
            Explore cohorts <span aria-hidden="true">↗</span>
          </Link>
        </nav>

        <details className="mobile-menu">
          <summary>Menu</summary>
          <nav className="mobile-navigation" aria-label="Mobile navigation">
            {audienceLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
            <Link href="/#about">About</Link>
            <Link className="mobile-navigation__action" href="/#learners">
              Explore cohorts
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
