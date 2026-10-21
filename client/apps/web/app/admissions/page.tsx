import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../../components/page-hero';
import { SectionDivider } from '../../components/section-divider';

export const metadata: Metadata = {
  title: 'Admissions & Aid — Bayes Institute',
  description:
    'A selective, cohort-based process designed to identify people who are ready to go deep.',
};

const steps = [
  {
    num: '1',
    title: 'Choose your programme',
    desc: 'Review the three programmes and select the one that best fits your goals, background, and where you want to be in two years. If you are uncertain, our admissions team can help you decide.',
  },
  {
    num: '2',
    title: 'Complete the application',
    desc: 'Submit the online application including a statement of purpose (500 to 800 words) explaining your motivation, your relevant background, and what you intend to do with the learning.',
  },
  {
    num: '3',
    title: 'Provide references',
    desc: 'Two professional or academic references who can speak directly to your capacity for rigorous, independent work. References are contacted only after you submit your application.',
  },
  {
    num: '4',
    title: 'Complete the technical assessment',
    desc: 'A short, programme-specific exercise sent to all applicants who meet initial eligibility criteria. Submitted within five days. Designed to take two to four hours.',
  },
  {
    num: '5',
    title: 'Attend an interview',
    desc: 'Shortlisted candidates are invited to a 30-minute conversation with a programme faculty member. We want to understand how you think, not test what you have memorised.',
  },
  {
    num: '6',
    title: 'Receive your decision',
    desc: 'Decisions are issued within three to four weeks of a complete application. All applicants receive a written outcome. Accepted applicants have 14 days to confirm their place.',
  },
];

const faqs = [
  {
    q: 'Can I apply to more than one programme?',
    a: 'Yes, but we recommend selecting the programme most aligned to your current goals and background. If you are genuinely undecided, our admissions team can help you choose before you apply. Applying to multiple programmes in the same cycle is permitted but unusual.',
  },
  {
    q: 'Do I need a mathematics background?',
    a: 'Each programme has different prerequisites. Applied AI and Quantitative Finance require strong quantitative ability — equivalent to undergraduate-level mathematics. Cloud Computing requires solid programming experience. None of our programmes assume prior finance or domain knowledge.',
  },
  {
    q: 'Is the programme in-person or online?',
    a: 'Programmes are delivered in a hybrid format. Core sessions — typically two full days per month — are in-person in London. All other structured learning, project work, and faculty office hours take place asynchronously or via video. You must be able to attend the in-person sessions.',
  },
  {
    q: 'How large are the cohorts?',
    a: 'Between 20 and 30 learners depending on the programme. Cohort size is intentionally small. This is what makes the peer learning, the faculty attention, and the standard of discourse possible.',
  },
  {
    q: 'Can I defer my place?',
    a: 'Yes, once per cycle. If you are accepted and need to defer to the following intake, you may do so by notifying us within 14 days of your acceptance. Deferred places are not guaranteed and are subject to cohort availability.',
  },
  {
    q: 'What happens if I am not accepted?',
    a: 'We provide brief written feedback on every application that reaches the assessment stage. We actively encourage reapplication in a future cycle. Many of our learners applied more than once.',
  },
];

const scholarships = [
  {
    name: 'Excellence Award',
    amount: '25% fee reduction',
    desc: 'Awarded on academic and professional merit. Applied automatically during the review process — no separate application required.',
  },
  {
    name: 'Equity Grant',
    amount: 'Up to 50% of fees',
    desc: 'For learners who demonstrate financial need alongside strong merit. Requires supporting financial documentation submitted with the application.',
  },
  {
    name: 'Partner Discount',
    amount: '15% reduction',
    desc: 'Available to employees of Bayes institutional and enterprise partners. Verified through the partnership agreement at the time of application.',
  },
  {
    name: 'Alumni Referral',
    amount: '10% fee reduction',
    desc: 'For learners referred by a Bayes alumnus in good standing. The referring alumnus must confirm the referral directly with the admissions office.',
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions & Aid"
        title="A process built for seriousness."
        subtitle="Selective, cohort-based, and designed to identify people who are ready to go deep."
        image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80&auto=format&fit=crop"
      />

      {/* ── Intakes ───────────────────────────────────────────── */}
      <section className="page-section">
        <div className="contained">
          <p className="section-label">Intakes</p>
          <h2 className="section-title">Two cohorts per year.</h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            We run January and September intakes across all three programmes. Applications open
            approximately three months before each cohort start date.
          </p>
          <div className="intake-grid">
            <div className="intake-card">
              <h3 className="intake-card__name">January 2025</h3>
              <ul className="intake-timeline">
                <li>
                  <span className="intake-timeline__date">September 2024</span>
                  <span className="intake-timeline__event">Applications open</span>
                </li>
                <li>
                  <span className="intake-timeline__date">30 November 2024</span>
                  <span className="intake-timeline__event">Application deadline</span>
                </li>
                <li>
                  <span className="intake-timeline__date">December 2024</span>
                  <span className="intake-timeline__event">Decisions issued</span>
                </li>
                <li>
                  <span className="intake-timeline__date">6 January 2025</span>
                  <span className="intake-timeline__event">Cohort begins</span>
                </li>
              </ul>
            </div>
            <div className="intake-card">
              <h3 className="intake-card__name">September 2025</h3>
              <ul className="intake-timeline">
                <li>
                  <span className="intake-timeline__date">May 2025</span>
                  <span className="intake-timeline__event">Applications open</span>
                </li>
                <li>
                  <span className="intake-timeline__date">31 July 2025</span>
                  <span className="intake-timeline__event">Application deadline</span>
                </li>
                <li>
                  <span className="intake-timeline__date">August 2025</span>
                  <span className="intake-timeline__event">Decisions issued</span>
                </li>
                <li>
                  <span className="intake-timeline__date">8 September 2025</span>
                  <span className="intake-timeline__event">Cohort begins</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider color="#f7f6f4" />

      {/* ── How to apply ──────────────────────────────────────── */}
      <section className="page-section page-section--alt" id="apply">
        <div className="contained">
          <p className="section-label">How to apply</p>
          <h2 className="section-title">Six steps.</h2>
          <div className="steps">
            {steps.map((s) => (
              <div key={s.num} className="step">
                <div className="step__num">{s.num}</div>
                <div className="step__body">
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#ffffff" flip />

      {/* ── Eligibility ───────────────────────────────────────── */}
      <section className="page-section" id="eligibility">
        <div className="contained">
          <div className="split">
            <div>
              <p className="section-label">Eligibility</p>
              <h2 className="section-title">Who we are looking for.</h2>
              <p style={{ marginTop: '1.25rem', fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.75 }}>
                We do not require a specific academic background. We do require evidence of the
                capacity and commitment to work at a high level. Most of our learners come from
                quantitative or technical backgrounds; some do not.
              </p>
              <ul className="eligibility-list">
                <li>Bachelor's degree in any discipline, or three or more years of relevant professional experience</li>
                <li>Strong quantitative or technical aptitude appropriate to your chosen programme</li>
                <li>Willingness to commit fully to the cohort structure and in-person sessions</li>
                <li>Demonstrated capacity for independent, self-directed learning</li>
                <li>English language proficiency at IELTS 7.0 or equivalent for non-native speakers</li>
              </ul>
            </div>
            <div>
              <p className="section-label">Programme prerequisites</p>
              <div className="prereq-list">
                <div className="prereq">
                  <p className="prereq__programme">Applied AI</p>
                  <p className="prereq__desc">Undergraduate-level mathematics (probability, linear algebra, calculus). Programming experience in Python. No prior ML experience required.</p>
                </div>
                <div className="prereq">
                  <p className="prereq__programme">Quantitative Finance</p>
                  <p className="prereq__desc">Strong mathematical background equivalent to a quantitative undergraduate degree. Comfort with calculus, probability, and linear algebra at an advanced level.</p>
                </div>
                <div className="prereq">
                  <p className="prereq__programme">Cloud Computing</p>
                  <p className="prereq__desc">At least two years of professional software development experience. Familiarity with Linux command line. No prior cloud certification required.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider color="#f7f6f4" />

      {/* ── Tuition ───────────────────────────────────────────── */}
      <section className="page-section page-section--alt" id="tuition">
        <div className="contained">
          <p className="section-label">Tuition & fees</p>
          <h2 className="section-title">Clear and complete.</h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            All fees are all-inclusive. There are no hidden costs, no textbook purchases, and no
            platform subscriptions.
          </p>
          <div className="pricing-grid">
            {[
              { label: 'Applied AI', amount: '£18,500', featured: false },
              { label: 'Quantitative Finance', amount: '£21,500', featured: true },
              { label: 'Cloud Computing', amount: '£17,500', featured: false },
            ].map((p) => (
              <div key={p.label} className={`pricing-card${p.featured ? ' pricing-card--featured' : ''}`}>
                <p className="pricing-card__label">{p.label}</p>
                <p className="pricing-card__amount">{p.amount}</p>
                <p className="pricing-card__period">Full programme · one-time or instalment</p>
                <ul className="pricing-card__features">
                  {[
                    'All learning materials',
                    'Assessment and capstone evaluation',
                    'Programme certification',
                    'Alumni network access for life',
                    'Instalment plan available',
                  ].map((f) => (
                    <li key={f} className="pricing-card__feature">{f}</li>
                  ))}
                </ul>
                <div className="pricing-card__action">
                  <Link href="/admissions#apply" style={{ fontSize: '0.8rem', color: 'var(--burgundy)', fontWeight: 650 }}>
                    Apply for this programme <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#ffffff" flip />

      {/* ── Scholarships ──────────────────────────────────────── */}
      <section className="page-section" id="scholarships">
        <div className="contained">
          <p className="section-label">Scholarships & aid</p>
          <h2 className="section-title">Financial support for those who need it.</h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            We do not want financial barriers to prevent serious learners from joining. The following
            support is available to eligible applicants.
          </p>
          <div className="aid-grid">
            {scholarships.map((s) => (
              <div key={s.name} className="aid-card">
                <h3 className="aid-card__name">{s.name}</h3>
                <p className="aid-card__amount">{s.amount}</p>
                <p className="aid-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#f7f6f4" />

      {/* ── FAQs ──────────────────────────────────────────────── */}
      <section className="page-section page-section--alt" id="faqs">
        <div className="contained" style={{ maxWidth: '56rem' }}>
          <p className="section-label">Frequently asked questions</p>
          <h2 className="section-title">Common questions.</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>{faq.q}</summary>
                <div className="faq-item__body">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="page-section page-section--dark">
        <div className="contained cta-block">
          <h2>Ready to apply?</h2>
          <p>Applications for January 2025 are now open. Places are limited.</p>
          <Link href="#apply" className="button--white">Begin your application</Link>
        </div>
      </section>
    </>
  );
}
