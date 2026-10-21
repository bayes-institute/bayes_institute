import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../../../components/page-hero';
import { SectionDivider } from '../../../components/section-divider';

export const metadata: Metadata = {
  title: 'Quantitative Finance — Bayes Institute',
  description:
    'Rigorous mathematical training in financial theory, derivatives pricing, and systematic trading.',
};

const phases = [
  {
    num: 'I',
    title: 'Stochastic Calculus & Probability Theory',
    desc: "Measure-theoretic probability, Brownian motion, Ito's lemma, stochastic differential equations, and martingale theory. The mathematical language of modern finance.",
  },
  {
    num: 'II',
    title: 'Financial Markets & Instruments',
    desc: 'Equity, fixed income, foreign exchange, and derivatives markets. Institutional structure, market microstructure, order flow, and the economics of price formation.',
  },
  {
    num: 'III',
    title: 'Derivatives Pricing',
    desc: 'The Black-Scholes framework, risk-neutral pricing, Monte Carlo simulation, finite difference methods, and calibration of vol surfaces. Both theory and practical implementation.',
  },
  {
    num: 'IV',
    title: 'Statistical Methods & Time Series Analysis',
    desc: 'Regression for finance, ARMA, GARCH, cointegration, factor models, and the statistical challenges specific to financial data: fat tails, non-stationarity, and overfitting.',
  },
  {
    num: 'V',
    title: 'Risk Management & Portfolio Construction',
    desc: 'Value at Risk, Expected Shortfall, stress testing, mean-variance optimisation, factor decomposition, transaction costs, and the practice of systematic portfolio management.',
  },
  {
    num: 'VI',
    title: 'Research Project & Strategy Development',
    desc: 'A six-week independent research project: develop, backtest, and present an original quantitative strategy or research finding to a panel of industry practitioners.',
  },
];

export default function QuantFinancePage() {
  return (
    <>
      <PageHero
        eyebrow="Programme"
        title="Quantitative Finance"
        subtitle="Rigorous mathematical training in financial theory, derivatives pricing, and systematic trading."
        image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80&auto=format&fit=crop"
      />

      <section className="page-section">
        <div className="contained">
          <div className="split">
            <div className="overview-stats">
              {[
                { label: 'Duration', value: '6 months' },
                { label: 'Format', value: 'Cohort — hybrid' },
                { label: 'Cohort size', value: '20 learners' },
                { label: 'Next start', value: 'January 2025' },
                { label: 'Programme fee', value: '£21,500' },
              ].map((s) => (
                <div key={s.label} className="overview-stat">
                  <p className="overview-stat__label">{s.label}</p>
                  <p className="overview-stat__value">{s.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="section-label">About this programme</p>
              <h2 className="section-title">Mathematics at the speed of markets.</h2>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                Quantitative finance sits at the intersection of mathematics, statistics, and
                financial markets. This programme gives you the theoretical grounding and practical
                tools to work at that intersection at the highest level.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.75 }}>
                The smallest of our three cohorts, this programme attracts mathematically exceptional
                learners from backgrounds in physics, mathematics, engineering, and computer science.
                Faculty include practitioners from leading systematic hedge funds, sell-side quant
                desks, and academic finance.
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

      <section className="page-section page-section--alt">
        <div className="contained">
          <p className="section-label">Curriculum</p>
          <h2 className="section-title">From probability to portfolio.</h2>
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

      <section className="page-section">
        <div className="contained">
          <p className="section-label">Tuition & fees</p>
          <h2 className="section-title">Transparent pricing.</h2>
          <div className="pricing-grid">
            <div className="pricing-card pricing-card--featured">
              <p className="pricing-card__label">Quantitative Finance — Full programme fee</p>
              <p className="pricing-card__amount">£21,500</p>
              <p className="pricing-card__period">One-time payment or instalment plan</p>
              <ul className="pricing-card__features">
                {[
                  'All learning materials including proprietary data sets',
                  'Faculty-led sessions, seminars, and office hours',
                  'Research project support and independent panel assessment',
                  'Programme certification upon successful completion',
                  'Bayes alumni network access for life',
                  'Access to practitioner speaker series',
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
              <p className="pricing-card__amount">£3,584</p>
              <p className="pricing-card__period">Per month over 6 months</p>
              <ul className="pricing-card__features">
                {[
                  'Same full programme access as single payment',
                  'First instalment due at acceptance',
                  'No interest or administrative fee',
                  'Scholarships applied before instalment calculations',
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

      <section className="page-section page-section--dark">
        <div className="contained cta-block">
          <h2>Apply for January 2025.</h2>
          <p>20 places available. A mathematically demanding selection process.</p>
          <Link href="/admissions" className="button--white">Begin your application</Link>
        </div>
      </section>
    </>
  );
}
