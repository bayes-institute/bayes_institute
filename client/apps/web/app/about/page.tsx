import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '../../components/page-hero';
import { SectionDivider } from '../../components/section-divider';

export const metadata: Metadata = {
  title: 'About — Bayes Institute',
  description: 'An independent institute for people who want to work at the frontier.',
};

const values = [
  {
    icon: '◈',
    title: 'Intellectual honesty',
    desc: 'We pursue truth in our work and in our teaching. We do not simplify for comfort, paper over uncertainty, or present contested ideas as settled ones.',
  },
  {
    icon: '◎',
    title: 'Practice over credential',
    desc: 'Our programmes are measured by what learners can do, not the certificates they hold. Certification is an output of demonstrated competency, not a substitute for it.',
  },
  {
    icon: '◇',
    title: 'Selective by design',
    desc: 'Small cohorts, high standards, and genuine peer learning require selectivity. We are not trying to maximise enrolment; we are trying to build the best learning community we can.',
  },
  {
    icon: '○',
    title: 'Long-term relationships',
    desc: 'Alumni remain part of Bayes. We measure our success over careers, not courses. The relationships formed during a cohort are part of what we are building.',
  },
];

const team = [
  {
    name: 'Dr. A. Mehta',
    role: 'Founder & Academic Director',
    img: 'https://i.pravatar.cc/200?img=11',
    bio: 'Previously a research scientist at a leading AI laboratory and lecturer in statistics at University College London. Founded Bayes Institute to create the kind of programme she wished had existed when she was learning.',
  },
  {
    name: 'Prof. J. Hartley',
    role: 'Programme Director, Applied AI',
    img: 'https://i.pravatar.cc/200?img=32',
    bio: 'Professor of Machine Learning at Imperial College London and former principal research engineer at a major technology company. Research focus: Bayesian deep learning and uncertainty quantification.',
  },
  {
    name: 'Dr. S. Okonkwo',
    role: 'Programme Director, Quantitative Finance',
    img: 'https://i.pravatar.cc/200?img=44',
    bio: 'Former head of quantitative research at a systematic hedge fund. PhD in financial mathematics from Oxford. Writes and teaches on stochastic calculus, derivatives pricing, and systematic strategy development.',
  },
  {
    name: 'R. Chen',
    role: 'Head of Partnerships',
    img: 'https://i.pravatar.cc/200?img=60',
    bio: 'Ten years in technology partnerships at enterprise software companies and research institutes. Leads Bayes\'s institutional and enterprise relationships, custom programme design, and faculty collaboration.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About Bayes Institute"
        subtitle="An independent institute for people who want to work at the frontier."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80&auto=format&fit=crop"
      />

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="page-section">
        <div className="contained">
          <div className="split">
            <div>
              <blockquote className="pull-quote" style={{ margin: 0 }}>
                "We exist because most learning stops where the work gets hard."
              </blockquote>
            </div>
            <div>
              <p className="section-label">Our mission</p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
                Bayes Institute is an independent learning institution built around a single
                conviction: that rigorous, practice-based education in technical fields is
                undersupplied and undervalued. Most programmes that call themselves advanced are
                not. Most courses that promise professional transformation do not deliver it.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink-soft)' }}>
                We are not a university, though we hold ourselves to high academic standards. We are
                not a bootcamp, though our programmes are intensely practical. We are an institution
                that believes the best learning happens in small, demanding communities with
                high-quality faculty and serious peers, and we are building the infrastructure to
                make that possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider color="#f7f6f4" />

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="page-section page-section--alt">
        <div className="contained">
          <p className="section-label">Our values</p>
          <h2 className="section-title">What we stand for.</h2>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title} className="value-card">
                <div className="value-card__icon">{v.icon}</div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#ffffff" flip />

      {/* ── Team ──────────────────────────────────────────────── */}
      <section className="page-section">
        <div className="contained">
          <p className="section-label">People</p>
          <h2 className="section-title">Leadership.</h2>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-card__img-wrap">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="team-card__img"
                  />
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#f7f6f4" />

      {/* ── Academic standards ────────────────────────────────── */}
      <section className="page-section page-section--alt">
        <div className="contained" style={{ maxWidth: '56rem' }}>
          <p className="section-label">Academic standards</p>
          <h2 className="section-title">How we maintain quality.</h2>
          <p className="lead" style={{ marginTop: '1.25rem' }}>
            Our programmes are reviewed annually by an independent academic board composed of
            faculty from research universities and senior practitioners from industry. All
            assessments are double-marked. Certification is issued only upon demonstrated
            competency, not attendance.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
            We publish our assessment criteria publicly. We disclose our pass and distinction rates.
            We invite external examination of our capstone projects. We believe that transparency
            about quality is itself a form of quality.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
            Faculty are selected on demonstrated expertise in their field, not on their ability to
            perform expertise in a classroom. Every session is evaluated by learners. Faculty who do
            not meet our standards are not asked to return.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="page-section page-section--dark">
        <div className="contained cta-block">
          <h2>Join us.</h2>
          <p>Applications for January 2025 are now open across all three programmes.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/admissions" className="button--white">Apply now</Link>
            <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', fontWeight: 650, gap: '0.35rem' }}>
              Work with us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
