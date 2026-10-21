import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroCarousel } from '../components/hero-carousel';
import { SectionDivider } from '../components/section-divider';

export const metadata: Metadata = {
  title: 'Bayes Institute — Where Rigour Meets Purpose',
  description:
    'Cohort-based programmes in applied AI, quantitative finance, and cloud computing for ambitious practitioners.',
};

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80&auto=format&fit=crop',
    alt: 'Learners in a seminar setting',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80&auto=format&fit=crop',
    alt: 'Collaborative group work',
  },
  {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80&auto=format&fit=crop',
    alt: 'Modern learning environment',
  },
];

const programmes = [
  {
    href: '/programmes/applied-ai',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format&fit=crop',
    tag: '6 months · Cohort-based',
    title: 'Applied Artificial Intelligence',
    meta: 'Next cohort: January 2025',
  },
  {
    href: '/programmes/quantitative-finance',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format&fit=crop',
    tag: '6 months · Cohort-based',
    title: 'Quantitative Finance',
    meta: 'Next cohort: January 2025',
  },
  {
    href: '/programmes/cloud-computing',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&auto=format&fit=crop',
    tag: '6 months · Cohort-based',
    title: 'Cloud Computing & Distributed Systems',
    meta: 'Next cohort: January 2025',
  },
];

const features = [
  {
    num: '01',
    title: 'Cohort-based',
    desc: 'You learn alongside 20 to 40 peers selected for their seriousness. Accountability, challenge, and lasting professional relationships come from the people beside you.',
  },
  {
    num: '02',
    title: 'Practitioner faculty',
    desc: 'Every session is led by someone who does the work. No adjuncts, no outdated syllabi. Real knowledge from people operating at the frontier.',
  },
  {
    num: '03',
    title: 'Rigorous assessment',
    desc: 'We certify what you can do, not how many hours you attended. Assessment is demanding, double-marked, and tied to outcomes that matter in the field.',
  },
];

const researchPosts = [
  {
    href: '/research/bayesian-ml',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
    tag: 'Machine Learning',
    title: 'The Bayesian Advantage in Modern Machine Learning',
    excerpt:
      'Why uncertainty quantification is becoming central to responsible AI development.',
    date: 'November 2024',
  },
  {
    href: '/research/stochastic-calculus',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80&auto=format&fit=crop',
    tag: 'Quantitative Finance',
    title: 'Stochastic Calculus as a Practitioner Tool',
    excerpt:
      "A practitioner's guide to Ito's lemma and why the mathematics of randomness matters more than ever.",
    date: 'October 2024',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <HeroCarousel slides={slides}>
        <span className="carousel-eyebrow">Est. 2024 · London</span>
        <h1 className="carousel-title">Where rigour meets purpose.</h1>
        <p className="carousel-sub">
          Bayes Institute offers cohort-based programmes in applied AI, quantitative finance, and
          cloud computing, designed for ambitious people who learn by doing.
        </p>
        <div className="carousel-actions">
          <Link href="/programmes" className="button--primary">
            Explore programmes
          </Link>
          <Link href="/admissions" className="carousel-link">
            Learn about admissions
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </HeroCarousel>

      {/* ── Programmes ───────────────────────────────────────── */}
      <section className="page-section">
        <div className="contained">
          <p className="section-label">Our programmes</p>
          <h2 className="section-title">Three programmes. One standard of rigour.</h2>
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

      {/* ── Why Bayes ─────────────────────────────────────────── */}
      <section className="page-section page-section--alt">
        <div className="contained">
          <p className="section-label">Our approach</p>
          <h2 className="section-title">Learning that holds up to scrutiny.</h2>
          <p className="lead">
            We design every programme around one question: what does it actually take to work at the
            frontier of a field?
          </p>
          <div className="feature-grid">
            {features.map((f) => (
              <div key={f.num} className="feature-card">
                <span className="feature-card__num">{f.num}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#430a13" flip />

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="page-section page-section--dark">
        <div className="contained">
          <h2 className="section-title section-title--light">
            Built for the people who want to go further.
          </h2>
          <div className="stats-row">
            {[
              { value: '40', label: 'Maximum cohort size' },
              { value: '6', label: 'Months per programme' },
              { value: '3', label: 'Programmes available' },
              { value: '92%', label: 'Learner satisfaction' },
            ].map((s) => (
              <div key={s.label} className="stat">
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/admissions" className="button--white">
              View admissions
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider color="#ffffff" />

      {/* ── Research ──────────────────────────────────────────── */}
      <section className="page-section">
        <div className="contained">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p className="section-label">Research & insights</p>
              <h2 className="section-title">From the institute.</h2>
            </div>
            <Link href="/research" style={{ fontSize: '0.78rem', fontWeight: 650, color: 'var(--burgundy)', whiteSpace: 'nowrap' }}>
              View all insights <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="blog-grid">
            {researchPosts.map((post) => (
              <article key={post.href} className="blog-card">
                <div className="blog-card__img-wrap">
                  <img src={post.img} alt={post.title} className="blog-card__img" />
                </div>
                <p className="blog-card__tag">{post.tag}</p>
                <h3 className="blog-card__title">
                  <Link href={post.href}>{post.title}</Link>
                </h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <p className="blog-card__meta">{post.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application CTA ───────────────────────────────────── */}
      <section className="page-section page-section--burgundy">
        <div className="contained cta-block">
          <h2>Applications are open for January 2025.</h2>
          <p>Limited places across all three programmes.</p>
          <Link href="/admissions" className="button--white">
            Apply now
          </Link>
        </div>
      </section>
    </>
  );
}
