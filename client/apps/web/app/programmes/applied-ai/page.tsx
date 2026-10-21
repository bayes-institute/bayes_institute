import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../../../components/page-hero';
import { SectionDivider } from '../../../components/section-divider';

export const metadata: Metadata = {
  title: 'Applied Artificial Intelligence — Bayes Institute',
  description:
    'A six-month cohort programme for practitioners ready to move beyond the surface of AI.',
};

const phases = [
  {
    num: 'I',
    title: 'Mathematical Foundations',
    desc: 'Probability theory, statistical inference, linear algebra, and calculus for machine learning. This phase ensures every learner has the mathematical fluency to understand what models are actually doing.',
  },
  {
    num: 'II',
    title: 'Machine Learning Core',
    desc: 'Supervised and unsupervised learning from first principles. Regression, classification, clustering, dimensionality reduction, model evaluation, and the craft of feature engineering.',
  },
  {
    num: 'III',
    title: 'Deep Learning',
    desc: 'Neural network architecture, backpropagation, convolutional networks, recurrent networks, and training at scale. Emphasis on implementation and understanding, not just API calls.',
  },
  {
    num: 'IV',
    title: 'NLP & Generative AI',
    desc: 'Transformer architecture from the ground up. Large language models, fine-tuning strategies, retrieval-augmented generation, prompt engineering, and evaluation at production scale.',
  },
  {
    num: 'V',
    title: 'Applied AI Systems',
    desc: 'Taking models from notebook to production. MLOps, serving infrastructure, monitoring, responsible AI practices, governance frameworks, and working within institutional constraints.',
  },
  {
    num: 'VI',
    title: 'Capstone Project',
    desc: 'An industry-partnered research project, scoped and delivered over eight weeks. Assessed by an independent panel of faculty and practitioners. Presented publicly at the Bayes Symposium.',
  },
];

export default function AppliedAIPage() {
  return (
    <>
      <PageHero
        eyebrow="Programme"
        title="Applied Artificial Intelligence"
        subtitle="A six-month cohort programme for practitioners ready to move beyond the surface."
        image="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=80&auto=format&fit=crop"
      />

      {/* ── Overview ──────────────────────────────────────────── */}
      <section className="page-section">
        <div className="contained">
          <div className="split">
            <div className="overview-stats">
              {[
                { label: 'Duration', value: '6 months' },
                { label: 'Format', value: 'Cohort — hybrid' },
                { label: 'Cohort size', value: '25 learners' },
                { label: 'Next start', value: 'January 2025' },
                { label: 'Programme fee', value: '£18,500' },
              ].map((s) => (
                <div key={s.label} className="overview-stat">
                  <p className="overview-stat__label">{s.label}</p>
                  <p className="overview-stat__value">{s.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="section-label">About this programme</p>
              <h2 className="section-title">AI as a rigorous discipline.</h2>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                Most AI education teaches you to use tools. This programme teaches you to understand
                them. Over six months you will build genuine fluency in the mathematics, systems, and
                judgement that separate practitioners who can apply AI from those who can push it
                forward.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.75 }}>
                The cohort structure means you advance alongside peers who take the work as seriously
                as you do. Faculty are researchers and senior practitioners who bring current problems
                into the classroom. Assessment is demanding and consequential.
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/admissions" className="button--primary">Apply now</Link>
                <Link href="/admissions#faqs" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.8rem', color: 'var(--burgundy)', fontWeight: 650 }}>
                  Admissions FAQ <span aria-hidden="true" style={{ marginLeft: '0.3rem' }}>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider color="#f7f6f4" />

      {/* ── Curriculum ────────────────────────────────────────── */}
      <section className="page-section page-section--alt">
        <div className="contained">
          <p className="section-label">Curriculum</p>
          <h2 className="section-title">Six phases. One coherent arc.</h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            Each phase builds on the last. By the end, you will have moved from mathematical
            foundations to production systems to independent research.
          </p>
          <div className="phase-list">
            {phases.map((ph) => (
              <div key={ph.num} className="phase-item">
                <div className="phase-item__num">0{ph.num}</div>
                <div className="phase-item__body">
                  <h3 className="phase-item__title">Phase {ph.num} — {ph.title}</h3>
                  <p className="phase-item__desc">{ph.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#ffffff" flip />

      {/* ── Tuition ───────────────────────────────────────────── */}
      <section className="page-section">
        <div className="contained">
          <p className="section-label">Tuition & fees</p>
          <h2 className="section-title">Transparent pricing.</h2>
          <div className="pricing-grid">
            <div className="pricing-card pricing-card--featured">
              <p className="pricing-card__label">Applied AI — Full programme fee</p>
              <p className="pricing-card__amount">£18,500</p>
              <p className="pricing-card__period">One-time payment or instalment plan</p>
              <ul className="pricing-card__features">
                {[
                  'All learning materials and software licences',
                  'Faculty-led sessions and office hours',
                  'Capstone project support and panel assessment',
                  'Programme certification upon successful completion',
                  'Bayes alumni network access for life',
                  'Two cohort intakes per year',
                ].map((f) => (
                  <li key={f} className="pricing-card__feature">{f}</li>
                ))}
              </ul>
              <div className="pricing-card__action">
                <Link href="/admissions" className="button--primary">Apply now</Link>
              </div>
            </div>
            <div className="pricing-card">
              <p className="pricing-card__label">Instalment plan</p>
              <p className="pricing-card__amount">£3,100</p>
              <p className="pricing-card__period">Per month over 6 months</p>
              <ul className="pricing-card__features">
                {[
                  'Same full programme access as single payment',
                  'First instalment due at acceptance',
                  'No interest or administrative fee',
                  'Instalment schedule fixed at enrolment',
                  'Scholarships and grants applied before instalments are calculated',
                ].map((f) => (
                  <li key={f} className="pricing-card__feature">{f}</li>
                ))}
              </ul>
              <div className="pricing-card__action">
                <Link href="/admissions#scholarships" style={{ fontSize: '0.8rem', color: 'var(--burgundy)', fontWeight: 650 }}>
                  View scholarships & aid <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="page-section page-section--dark">
        <div className="contained cta-block">
          <h2>Apply for January 2025.</h2>
          <p>25 places available. Applications reviewed on a rolling basis.</p>
          <Link href="/admissions" className="button--white">Begin your application</Link>
        </div>
      </section>
    </>
  );
}
