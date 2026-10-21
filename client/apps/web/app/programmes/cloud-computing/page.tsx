import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../../../components/page-hero';
import { SectionDivider } from '../../../components/section-divider';

export const metadata: Metadata = {
  title: 'Cloud Computing & Distributed Systems — Bayes Institute',
  description: 'Design, build, and operate systems that scale — from first principles to production.',
};

const phases = [
  {
    num: 'I',
    title: 'Cloud Architecture Fundamentals',
    desc: 'Core services across AWS, GCP, and Azure: compute, storage, networking, identity, and cost management. Designed for learners who want to understand the platform, not just use the console.',
  },
  {
    num: 'II',
    title: 'Container Orchestration',
    desc: 'Docker, Kubernetes, and Helm from the ground up. Pod scheduling, service mesh, ingress, autoscaling, and the operational model of modern container-native infrastructure.',
  },
  {
    num: 'III',
    title: 'Distributed Systems Theory',
    desc: 'CAP theorem, consistency models, consensus algorithms (Paxos, Raft), distributed transactions, and failure models. The theory that underpins every large-scale system.',
  },
  {
    num: 'IV',
    title: 'Cloud Security & Governance',
    desc: 'Identity and access management, zero-trust architecture, secrets management, compliance frameworks (SOC 2, ISO 27001), and the practice of building security into systems from the start.',
  },
  {
    num: 'V',
    title: 'Data Engineering & MLOps on Cloud',
    desc: 'Building data pipelines, stream processing (Kafka, Flink), data lakehouse architecture, and the infrastructure for deploying and monitoring machine learning systems in production.',
  },
  {
    num: 'VI',
    title: 'Capstone: Production System Design',
    desc: 'Design, build, and document a production-grade distributed system addressing a real-world brief. Presented to a panel of senior engineers from Bayes partner organisations.',
  },
];

export default function CloudComputingPage() {
  return (
    <>
      <PageHero
        eyebrow="Programme"
        title="Cloud Computing & Distributed Systems"
        subtitle="Design, build, and operate systems that scale — from first principles to production."
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop"
      />

      <section className="page-section">
        <div className="contained">
          <div className="split">
            <div className="overview-stats">
              {[
                { label: 'Duration', value: '6 months' },
                { label: 'Format', value: 'Cohort — hybrid' },
                { label: 'Cohort size', value: '30 learners' },
                { label: 'Next start', value: 'January 2025' },
                { label: 'Programme fee', value: '£17,500' },
              ].map((s) => (
                <div key={s.label} className="overview-stat">
                  <p className="overview-stat__label">{s.label}</p>
                  <p className="overview-stat__value">{s.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="section-label">About this programme</p>
              <h2 className="section-title">Systems thinking at scale.</h2>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                Cloud infrastructure is everywhere. Genuine expertise in it is rare. This programme
                takes you from cloud fundamentals to distributed systems design, giving you the
                depth to build systems that are not just functional but robust, secure, and
                operationally sound.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.75 }}>
                The programme is suited to software engineers, DevOps practitioners, and technical
                architects who want to move from familiarity with cloud tools to genuine mastery of
                the underlying systems. Faculty include senior engineers and architects from
                hyperscalers, platform companies, and infrastructure-focused startups.
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
          <h2 className="section-title">From fundamentals to production.</h2>
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
              <p className="pricing-card__label">Cloud Computing — Full programme fee</p>
              <p className="pricing-card__amount">£17,500</p>
              <p className="pricing-card__period">One-time payment or instalment plan</p>
              <ul className="pricing-card__features">
                {[
                  'Cloud platform credits across AWS, GCP, and Azure',
                  'All learning materials and lab environments',
                  'Faculty-led sessions and office hours',
                  'Capstone project support and panel assessment',
                  'Programme certification upon successful completion',
                  'Bayes alumni network access for life',
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
              <p className="pricing-card__amount">£2,917</p>
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
          <p>30 places available. Applications reviewed on a rolling basis.</p>
          <Link href="/admissions" className="button--white">Begin your application</Link>
        </div>
      </section>
    </>
  );
}
