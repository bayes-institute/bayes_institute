import Link from 'next/link';
import { BrandMark } from './brand-mark';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="about">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href="/" aria-label="Bayes Institute home">
              <BrandMark inverse />
            </Link>
            <p className="site-footer__statement">
              Thoughtful learning for people, institutions, and organisations moving forward.
            </p>
          </div>

          <nav className="footer-navigation" aria-label="Audience links">
            <p>For</p>
            <Link href="/#learners">Learners</Link>
            <Link href="/#institutions">Institutions</Link>
            <Link href="/#enterprise">Enterprise</Link>
          </nav>

          <nav className="footer-navigation" id="contact" aria-label="Institute links">
            <p>Institute</p>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Bayes Institute</span>
          <span>Learning with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
