import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../../components/page-hero';
import { SectionDivider } from '../../components/section-divider';

export const metadata: Metadata = {
  title: 'Programmes — Bayes Institute',
  description: 'Three six-month cohort programmes in applied AI, quantitative finance, and cloud computing.',
};

const programmes = [
  {
    href: '/programmes/applied-ai',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format&fit=crop',
    tag: '6 months · Cohort-based',
    title: 'Applied Artificial Intelligence',
    meta: 'Next cohort: January 2025 · 25 places',
  },
  {
    href: '/programmes/quantitative-finance',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format&fit=crop',
    tag: '6 months · Cohort-based',
    title: 'Quantitative Finance',
    meta: 'Next cohort: January 2025 · 20 places',
  },
  {
    href: '/programmes/cloud-computing',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&auto=format&fit=crop',
    tag: '6 months · Cohort-based',
    title: 'Cloud Computing & Distributed Systems',
    meta: 'Next cohort: January 2025 · 30 places',
  },
];

const expectations = [
  {
    title: 'Cohort learning',
    desc: 'Every programme runs in a cohort of 20 to 30 learners. You advance together, challenge each other, and build a professional network that outlasts the programme.',
  },
  {
    title: 'Practitioner faculty',
    desc: 'Sessions are led by people who work at the frontier of their field: researchers, senior engineers, quants, and founders with deep practitioner knowledge.',
  },
  {
    title: 'Meaningful outcomes',
    desc: 'Certification is issued on demonstrated competency. Every programme ends with a capstone project assessed by an independent panel, not a multiple-choice exam.',
  },
];

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our programmes"
        title="Learn at the frontier."
        subtitle="Three six-month cohort programmes. Rigorous by design."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80&auto=format&fit=crop"
      />

      <section className="page-section">
        <div className="contained">
          <p className="section-label">Choose your path</p>
          <h2 className="section-title">Three programmes. One standard.</h2>
          <div className="programme-grid">
            {programmes.map((p) => (
              <Link key={p.href} href={p.href} className="programme-card">
                <img src={p.img} alt={p.title} className="programme-card__img" />
                <div className="programme-card__body">
                  <span className="programme-card__tag">{p.tag}</span>
                  <h3 className="programme-card__title">{p.title}</h3>
                  <p className="programme-card__meta">{p.meta}</p>
                  <span className="programme-card__arrow">
                    View programme <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#f7f6f4" />

      <section className="page-section page-section--alt">
        <div className="contained">
          <p className="section-label">What to expect</p>
          <h2 className="section-title">A different kind of learning.</h2>
          <div className="expect-grid" style={{ marginTop: '3rem' }}>
            {expectations.map((e) => (
              <div key={e.title} className="expect-card">
                <h3 className="expect-card__title">{e.title}</h3>
                <p className="expect-card__desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--burgundy">
        <div className="contained cta-block">
          <h2>Ready to apply?</h2>
          <p>Review eligibility criteria and begin your application.</p>
          <Link href="/admissions" className="button--white">
            Admissions & Aid
          </Link>
        </div>
      </section>
    </>
  );
}
