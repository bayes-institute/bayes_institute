import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../../components/page-hero';
import { SectionDivider } from '../../components/section-divider';

export const metadata: Metadata = {
  title: 'Careers — Bayes Institute',
  description: 'We are a small, ambitious team building something we believe in.',
};

const roles = [
  {
    title: 'Programme Associate (Academic)',
    type: 'Full-time',
    location: 'London / Hybrid',
    desc: 'Support the design, delivery, and continuous improvement of our three programmes. Work closely with faculty, manage learner progress, and contribute to curriculum development.',
  },
  {
    title: 'Partnerships Manager',
    type: 'Full-time',
    location: 'London / Remote',
    desc: 'Develop and manage relationships with institutional and enterprise partners. Design and scope custom programmes. Represent Bayes to potential partners at the senior level.',
  },
  {
    title: 'Data & Systems Engineer',
    type: 'Full-time',
    location: 'Remote',
    desc: 'Build and maintain the infrastructure that supports programme delivery, learner tracking, and internal operations. Experience with modern data engineering and cloud platforms required.',
  },
  {
    title: 'Faculty (Visiting Lecturer, Applied AI)',
    type: 'Part-time',
    location: 'Flexible',
    desc: 'Teach one or more modules within the Applied AI programme. We are looking for practitioners with deep expertise in machine learning, NLP, or AI systems who can bring real-world problems into the classroom.',
  },
];

const benefits = [
  'Competitive salary benchmarked to market',
  'Flexible working — remote-first with London hub',
  'Annual learning and development stipend',
  'Health and wellbeing support',
  'Annual team retreat',
  'Equity participation for full-time staff',
];

const culturePoints = [
  'Small team, high trust',
  'Results over presence',
  'Intellectually serious',
  'Direct communication',
  'Long-term thinking',
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Work at Bayes Institute"
        subtitle="We are a small, ambitious team building something we believe in."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80&auto=format&fit=crop"
      />

      {/* ── Culture ───────────────────────────────────────────── */}
      <section className="page-section">
        <div className="contained">
          <div className="split">
            <div>
              <p className="section-label">Culture</p>
              <h2 className="section-title">What it is like to work here.</h2>
              <p style={{ marginTop: '1.25rem', fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                We are a small team of people who care deeply about learning and about doing things
                properly. We are remote-first, with a London hub for in-person sessions and
                collaboration. We measure output, not hours. We communicate directly and trust each
                other to use judgment.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                Working at Bayes means being close to the intellectual work of the institution: the
                programmes, the faculty, the learners, and the research. We are not a large
                organisation and we are not trying to become one. We are trying to do one thing very
                well.
              </p>
            </div>
            <div>
              <p className="section-label">How we work</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {culturePoints.map((point) => (
                  <li key={point} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem', fontWeight: 550 }}>
                    <span style={{ color: 'var(--burgundy)', fontWeight: 750 }}>—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider color="#f7f6f4" />

      {/* ── Open roles ────────────────────────────────────────── */}
      <section className="page-section page-section--alt">
        <div className="contained">
          <p className="section-label">Open roles</p>
          <h2 className="section-title">We are hiring.</h2>
          <div className="job-list">
            {roles.map((role) => (
              <div key={role.title} className="job-item">
                <div>
                  <h3 className="job-item__title">{role.title}</h3>
                  <p className="job-item__meta">{role.type} · {role.location}</p>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: '48rem' }}>
                    {role.desc}
                  </p>
                </div>
                <a
                  href={`mailto:careers@bayes.institute?subject=Application: ${role.title}`}
                  className="job-item__link"
                >
                  Apply <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#ffffff" flip />

      {/* ── Benefits ──────────────────────────────────────────── */}
      <section className="page-section">
        <div className="contained">
          <p className="section-label">Benefits</p>
          <h2 className="section-title">What we offer.</h2>
          <div className="benefits-grid">
            {benefits.map((b) => (
              <div key={b} className="benefit-item">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open application ──────────────────────────────────── */}
      <section className="page-section page-section--dark">
        <div className="contained cta-block">
          <h2>Don't see a fit?</h2>
          <p>Send an open application and tell us how you think you could contribute.</p>
          <a
            href="mailto:careers@bayes.institute?subject=Open application"
            className="button--white"
          >
            Send an open application
          </a>
        </div>
      </section>
    </>
  );
}
