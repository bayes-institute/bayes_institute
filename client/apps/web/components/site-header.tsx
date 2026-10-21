'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* ── Navigation data ─────────────────────────────────────────────── */

type NavLink = { label: string; href: string; desc?: string };
type NavSection = { heading: string; links: NavLink[] };
type NavItem = { label: string; sections: NavSection[] };

const NAV: NavItem[] = [
  {
    label: 'Programs',
    sections: [
      {
        heading: 'Explore',
        links: [
          { label: 'All programmes', href: '#programmes', desc: 'Browse by format, duration, and focus area' },
          { label: 'Programme formats', href: '#formats', desc: 'Cohort, intensive, and executive tracks' },
          { label: 'Curriculum', href: '#curriculum', desc: 'What you will learn and practise' },
          { label: 'Faculty', href: '#faculty', desc: 'Practitioners and researchers who teach' },
        ],
      },
      {
        heading: 'Your learning',
        links: [
          { label: 'Learner outcomes', href: '#outcomes', desc: 'What our graduates go on to do' },
          { label: 'Alumni community', href: '#community', desc: 'A network of continuing practice' },
          { label: 'Upcoming cohorts', href: '#cohorts', desc: 'Next intake dates and how to prepare' },
        ],
      },
    ],
  },
  {
    label: 'Admissions & Aid',
    sections: [
      {
        heading: 'The process',
        links: [
          { label: 'How to apply', href: '#apply', desc: 'Step-by-step application guide' },
          { label: 'Eligibility', href: '#eligibility', desc: 'Who our programmes are designed for' },
          { label: 'Cohort dates', href: '#dates', desc: 'Upcoming intakes and key deadlines' },
        ],
      },
      {
        heading: 'Finance',
        links: [
          { label: 'Tuition & fees', href: '#tuition', desc: 'Full cost breakdown and what is included' },
          { label: 'Scholarships', href: '#scholarships', desc: 'Need- and merit-based support' },
          { label: 'Financing options', href: '#financing', desc: 'Payment plans and third-party funding' },
          { label: 'FAQs', href: '#faqs', desc: 'Common questions about admissions' },
        ],
      },
    ],
  },
  {
    label: 'Partnerships',
    sections: [
      {
        heading: 'For organisations',
        links: [
          { label: 'Institutional partners', href: '#institutions', desc: 'Universities and academic bodies' },
          { label: 'Enterprise partnerships', href: '#enterprise', desc: 'Upskilling and capability building' },
          { label: 'Custom programmes', href: '#custom', desc: 'Tailored learning for your organisation' },
        ],
      },
      {
        heading: 'Collaborate',
        links: [
          { label: 'Faculty collaboration', href: '#faculty-collab', desc: 'Joint teaching and curriculum design' },
          { label: 'Research partnerships', href: '#research-collab', desc: 'Shared inquiry and publication' },
          { label: 'Contact partnerships', href: '#contact-partners', desc: 'Start a conversation with our team' },
        ],
      },
    ],
  },
  {
    label: 'Research',
    sections: [
      {
        heading: 'Our work',
        links: [
          { label: 'Research areas', href: '#research', desc: 'Probability, inference, and decision-making' },
          { label: 'Publications', href: '#publications', desc: 'Papers, preprints, and working notes' },
          { label: 'Reports & insights', href: '#reports', desc: 'Applied findings for practitioners' },
        ],
      },
      {
        heading: 'People',
        links: [
          { label: 'Research fellows', href: '#fellows', desc: 'Our resident research community' },
          { label: 'Visiting faculty', href: '#visiting-faculty', desc: 'Practitioners and scholars in residence' },
        ],
      },
    ],
  },
  {
    label: 'About',
    sections: [
      {
        heading: 'The institute',
        links: [
          { label: 'Mission & values', href: '#mission', desc: 'Why Bayes Institute exists' },
          { label: 'Leadership', href: '#leadership', desc: 'Founders, faculty, and advisory board' },
          { label: 'Academic standards', href: '#standards', desc: 'Our approach to quality and rigour' },
        ],
      },
      {
        heading: 'Connect',
        links: [
          { label: 'Careers', href: '#careers', desc: 'Open roles at Bayes Institute' },
          { label: 'Press & media', href: '#press', desc: 'Coverage, assets, and press enquiries' },
          { label: 'Contact us', href: '#contact', desc: 'Get in touch with the right team' },
        ],
      },
    ],
  },
];

/* ── Component ───────────────────────────────────────────────────── */

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      if (window.scrollY > 10) setActiveNav(null);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveNav(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveNav(label);
  };

  const close = () => {
    closeTimer.current = setTimeout(() => setActiveNav(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      {/* Page overlay — dims content while dropdown is open */}
      <div
        className={`nav-overlay${activeNav ? ' nav-overlay--active' : ''}`}
        onClick={() => setActiveNav(null)}
        aria-hidden="true"
      />

      {/* Dropdown panels — fixed siblings to the header */}
      {NAV.map((item) => (
        <div
          key={item.label}
          className={`dropdown${activeNav === item.label ? ' dropdown--active' : ''}`}
          onMouseEnter={cancelClose}
          onMouseLeave={close}
          role="region"
          aria-label={`${item.label} navigation`}
        >
          <div className="dropdown__inner">
            {item.sections.map((section) => (
              <div key={section.heading} className="dropdown__section">
                <p className="dropdown__heading">{section.heading}</p>
                <ul className="dropdown__links" role="list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="dropdown__link"
                        onClick={() => setActiveNav(null)}
                      >
                        <span className="dropdown__link-label">{link.label}</span>
                        {link.desc && (
                          <span className="dropdown__link-desc">{link.desc}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Header */}
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="site-header__inner">

          {/* Logo bookmark */}
          <div className="site-header__logo-block">
            <Link href="/" className="site-header__bookmark" aria-label="Bayes Institute home">
              <span className="site-header__logo-wrap">
                <Image
                  src="/brand/full-inverse.svg"
                  alt="Bayes Institute"
                  width={1483}
                  height={505}
                  className="site-header__logo site-header__logo--inverse"
                  priority
                />
                <Image
                  src="/brand/full-primary.svg"
                  alt=""
                  width={1483}
                  height={505}
                  className="site-header__logo site-header__logo--primary"
                  priority
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="desktop-nav" aria-label="Primary navigation">
            <ul className="desktop-nav__list" role="list">
              {NAV.map((item) => {
                const isActive = activeNav === item.label;
                return (
                  <li key={item.label} className="desktop-nav__item">
                    <button
                      className={`desktop-nav__trigger${isActive ? ' is-active' : ''}`}
                      onMouseEnter={() => open(item.label)}
                      onMouseLeave={close}
                      onFocus={() => open(item.label)}
                      aria-expanded={isActive}
                      aria-haspopup="true"
                      type="button"
                    >
                      {item.label}
                      <svg
                        className="desktop-nav__chevron"
                        width="9"
                        height="5"
                        viewBox="0 0 9 5"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1l3.5 3L8 1"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right-side persistent actions */}
          <div className="nav-actions">
            <Link href="#apply" className="nav-actions__apply">
              Apply now
            </Link>
            <span className="nav-actions__sep" aria-hidden="true">·</span>
            <Link href="/login" className="nav-actions__login">
              Learner login
            </Link>
          </div>

          {/* Mobile menu */}
          <details className="mobile-menu">
            <summary aria-label="Toggle navigation menu">Menu</summary>
            <nav className="mobile-navigation" aria-label="Mobile navigation">
              {NAV.map(({ label, sections }) => (
                <div key={label} className="mobile-nav__group">
                  <p className="mobile-nav__group-label">{label}</p>
                  {sections.flatMap((s) => s.links).map((link) => (
                    <Link href={link.href} key={link.label}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Link className="mobile-navigation__action" href="#apply">
                Apply now
              </Link>
              <Link href="/login" className="mobile-nav__login">
                Learner login
              </Link>
            </nav>
          </details>

        </div>
      </header>
    </>
  );
}
