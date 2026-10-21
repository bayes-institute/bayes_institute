import Image from 'next/image';
import Link from 'next/link';

const footerColumns = [
  {
    sections: [
      {
        heading: 'Programs',
        links: [
          { label: 'All programmes', href: '#programmes' },
          { label: 'Programme formats', href: '#formats' },
          { label: 'Faculty', href: '#faculty' },
          { label: 'Upcoming cohorts', href: '#cohorts' },
        ],
      },
      {
        heading: 'Admissions & Aid',
        links: [
          { label: 'How to apply', href: '#apply' },
          { label: 'Cohort dates', href: '#dates' },
          { label: 'Scholarships', href: '#scholarships' },
          { label: 'Tuition & fees', href: '#tuition' },
          { label: 'FAQs', href: '#faqs' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        heading: 'Partnerships',
        links: [
          { label: 'Institutional partners', href: '#institutions' },
          { label: 'Enterprise partnerships', href: '#enterprise' },
          { label: 'Custom programmes', href: '#custom' },
          { label: 'Contact partnerships', href: '#contact-partners' },
        ],
      },
      {
        heading: 'Research',
        links: [
          { label: 'Research areas', href: '#research' },
          { label: 'Publications', href: '#publications' },
          { label: 'Reports & insights', href: '#reports' },
          { label: 'Research fellows', href: '#fellows' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        heading: 'The institute',
        links: [
          { label: 'Mission & values', href: '#mission' },
          { label: 'Leadership', href: '#leadership' },
          { label: 'Academic standards', href: '#standards' },
        ],
      },
      {
        heading: 'Connect',
        links: [
          { label: 'Careers', href: '#careers' },
          { label: 'Contact us', href: '#contact' },
          { label: 'Press & media', href: '#press' },
        ],
      },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" id="about">
      <div className="site-footer__inner">
        <div className="site-footer__top">

          {/* Brand column */}
          <div className="site-footer__brand">
            <Link href="/" aria-label="Bayes Institute home">
              <Image
                src="/brand/full-inverse.svg"
                alt="Bayes Institute"
                width={1483}
                height={505}
                className="site-footer__logo"
              />
            </Link>
            <p className="site-footer__statement">
              Thoughtful learning for people, institutions, and organisations moving forward.
            </p>
            <Link href="#apply" className="site-footer__cta">
              Apply now
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Navigation columns */}
          {footerColumns.map((col, i) => (
            <div key={i} className="site-footer__nav-col">
              {col.sections.map((section) => (
                <div key={section.heading} className="footer-section">
                  <p className="footer-section__heading">{section.heading}</p>
                  <ul className="footer-section__links" role="list">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="footer-section__link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Bayes Institute. All rights reserved.</span>
          <span>Learning with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
