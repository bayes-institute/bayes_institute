"use client";

import { ArrowIcon, SiteExperience } from "./site-experience";

const curriculum = [
  {
    number: "01",
    title: "Founder foundations & opportunity",
    copy: "Build your founder operating system, map the market, and turn broad interests into a sharp opportunity thesis.",
    outcomes: ["Founder OS", "market map", "opportunity thesis"],
  },
  {
    number: "02",
    title: "Customer truth & problem choice",
    copy: "Run disciplined discovery, observe real workflows, and identify a painful problem with an identifiable buyer.",
    outcomes: ["Customer interviews", "workflow evidence", "ideal customer profile"],
  },
  {
    number: "03",
    title: "Product, wedge & validation",
    copy: "Choose a narrow wedge, build what is needed to learn, and test the willingness to pay behind it.",
    outcomes: ["Focused prototype", "experiments", "pricing hypothesis"],
  },
  {
    number: "04",
    title: "Distribution & commercial proof",
    copy: "Develop positioning, launch, outreach, sales conversations, and the habits that turn attention into revenue.",
    outcomes: ["Positioning", "go-to-market plan", "customer pipeline"],
  },
  {
    number: "05",
    title: "Delivery, evidence & the next bet",
    copy: "Serve early customers, collect the evidence that matters, and decide what to pursue with a clear operating plan.",
    outcomes: ["Customer proof", "Bayesian decision memo", "90-day roadmap"],
  },
];

const admissions = [
  ["01", "Learn", "Read the programme details, download the brochure, and attend an applicant briefing when dates are announced."],
  ["02", "Apply", "Share your technical trajectory, evidence of agency, current context, and—if needed—your scholarship request."],
  ["03", "Diagnose", "A founder-led 30–40 minute conversation tests the problem, your working style, and whether Bayes is the right fit."],
  ["04", "Accept", "Successful applicants receive an offer. A ₹5,000 seat-confirmation deposit is due within 48 hours and is credited toward tuition."],
  ["05", "Prepare", "Complete onboarding, receive the cohort handbook, and arrive ready to build, speak to customers, and be challenged."],
];

const faqs = [
  ["Who is the Fellowship for?", "The Founding Cohort is designed primarily for software and product engineers, STEM graduates, and final-year technical students—especially people able to build, learn quickly, and speak directly with potential customers. The current focus is Mumbai and Pune."],
  ["Is this full-time?", "No. It is a 40-week, part-time Fellowship with about five hours of structured live work each week. Fellows should also protect meaningful time outside sessions for customer conversations, building, selling, and experiments."],
  ["What will I leave with?", "The Fellowship is built toward commercial evidence, not a certificate alone. Graduation is tied to either two paying B2B customers or ₹40,000 in collected commercial revenue, alongside a documented Bayesian decision memo or 90-day operating roadmap."],
  ["What does the curriculum cover?", "It moves from opportunity selection and customer discovery through product validation, positioning, distribution, sales, delivery, retention, and an evidence-backed next decision. The detailed weekly plan belongs in the cohort brochure and handbook."],
  ["How selective is admission?", "Admission is selective. The team assesses practical systems competence, agency, capacity for the weekly work, willingness to contact users, and the fit between your ambitions and the programme—not just pedigree."],
  ["What is the tuition?", "The current Founding Cohort tuition anchor is ₹2,50,000. The documented payment plan is a ₹5,000 seat deposit credited to tuition, a first net instalment of ₹36,665, then five monthly instalments of ₹41,667. Your offer letter is the final source of truth."],
  ["Are scholarships available?", "Yes. Scholarship consideration can be requested in the application and is assessed separately from your ability to succeed in the programme. Awards depend on calibre, need, and cohort economics."],
  ["Is there a refund policy?", "Current cohort terms describe a 14-day, 100% money-back window starting after Day 1. Any physical welcome-kit deduction, noted as ₹2,500 in the current terms unless returned unused and pristine, must be confirmed in the signed offer letter before payment."],
  ["Do I give up equity or take a loan?", "No. Bayes does not take equity, and the Fellowship is intentionally not structured as a debt or loan-financing product."],
  ["Does Bayes guarantee funding, a job, or revenue?", "No. Bayes does not promise placement, funding, or commercial outcomes. The work is designed to give you a better decision, stronger evidence, and a more capable operating practice; the outcome still depends on the fellow and the market."],
  ["What is included beyond the live sessions?", "The programme includes guided teaching, critique, feedback, and the Fellowship community. Planned offline events may be included for admitted fellows; confirmed locations, dates, and inclusions will be listed in the cohort handbook."],
  ["When does the next cohort start?", "The Founding Cohort dates, briefing schedule, and application deadline are to be announced. Register interest or start an application to receive the confirmed timetable when it is published."],
];

export function FellowshipDetailPage() {
  return (
    <SiteExperience>
      {({ hasApplication, isAuthenticated, onApply, onDownloadBrochure }) => (
        <div className="fellowship-page">
          <section className="fellowship-hero">
            <div className="page-width fellowship-hero__grid">
              <div>
                <p className="fellowship-kicker">Bayes Founder Fellowship <span>·</span> Founding Cohort</p>
                <h1>Build the proof that gives you the courage to leap.</h1>
                <p className="fellowship-hero__intro">A selective, hybrid 40-week Fellowship for technical people who want to turn first-principles thinking into a business customers will pay for.</p>
                <div className="fellowship-hero__actions">
                  <button className="button button--primary" type="button" onClick={onApply}>
                    <span>{isAuthenticated && hasApplication ? "Resume application" : "Apply to the Founding Cohort"}</span>
                    <ArrowIcon />
                  </button>
                  <button className="fellowship-text-action" type="button" onClick={onDownloadBrochure}>
                    Download the brochure <ArrowIcon />
                  </button>
                </div>
              </div>

              <aside className="fellowship-hero__facts" aria-label="Programme at a glance">
                <p>At a glance</p>
                <dl>
                  <div><dt>Duration</dt><dd>40 part-time weeks</dd></div>
                  <div><dt>Guided learning</dt><dd>200 live hours</dd></div>
                  <div><dt>Format</dt><dd>Hybrid · Mumbai &amp; Pune</dd></div>
                  <div><dt>Next intake</dt><dd>Founding Cohort · dates TBA</dd></div>
                </dl>
              </aside>
            </div>
          </section>

          <section className="fellowship-section fellowship-section--statement">
            <div className="page-width fellowship-statement">
              <p className="fellowship-kicker">The point of the work</p>
              <h2>Not a startup theatre. A practice for finding what is true, then acting on it.</h2>
              <div className="fellowship-capabilities">
                <article><span>01</span><h3>Judgment</h3><p>Make better choices under uncertainty: which market, customer, wedge, and next experiment deserve your time.</p></article>
                <article><span>02</span><h3>Insight</h3><p>Get close enough to a customer’s work to see the constraints, urgencies, and unspoken alternatives that matter.</p></article>
                <article><span>03</span><h3>Distribution</h3><p>Learn to earn attention, start conversations, ask for commitment, and build commercial momentum.</p></article>
              </div>
            </div>
          </section>

          <section className="fellowship-section" id="curriculum">
            <div className="page-width">
              <div className="fellowship-section__heading">
                <div><p className="fellowship-kicker">Curriculum</p><h2>Forty weeks of work that compounds.</h2></div>
                <p>The programme follows the real sequence of building: choose a problem, earn the right to build, find a path to customers, and decide from evidence.</p>
              </div>
              <div className="curriculum-grid">
                {curriculum.map((phase) => (
                  <article className="curriculum-card" key={phase.number}>
                    <span>{phase.number}</span><h3>{phase.title}</h3><p>{phase.copy}</p>
                    <ul>{phase.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
                  </article>
                ))}
              </div>
              <p className="fellowship-footnote">Detailed week-by-week sessions, readings, assignments, and the live calendar are released in the Founding Cohort brochure and admitted-fellow handbook.</p>
            </div>
          </section>

          <section className="fellowship-section fellowship-section--ink">
            <div className="page-width fellowship-format">
              <div><p className="fellowship-kicker">Format &amp; commitment</p><h2>Designed around a serious working life—not around passive consumption.</h2></div>
              <div className="fellowship-format__details">
                <p>Expect around <strong>five hours of structured live instruction, critique, and feedback each week</strong>, across 40 weeks. The real leverage comes from the work between sessions: customer conversations, building, testing, outreach, and reflection.</p>
                <div className="fellowship-checklist"><span>Hybrid delivery for Mumbai &amp; Pune</span><span>Founder-led critique and peer accountability</span><span>Build and sell alongside the programme</span><span>Confirmed calendar supplied before onboarding</span></div>
              </div>
            </div>
          </section>

          <section className="fellowship-section">
            <div className="page-width fellowship-split">
              <div><p className="fellowship-kicker">Who should apply</p><h2>Technical enough to ship. Curious enough to change your mind.</h2></div>
              <div className="fellowship-prose"><p>The Fellowship is for people who want to work from reality rather than just talk about startups. You do not need a finished idea. You do need the ability to make, the willingness to contact users, and the time to follow through.</p><ul><li>Software or product engineers, STEM graduates, and final-year technical students</li><li>Typically 21–30, based in or able to participate from Mumbai or Pune</li><li>A practical grasp of systems and the ability to ship or learn to ship quickly</li><li>Enough weekly capacity to do customer-facing work between live sessions</li></ul><p className="fellowship-muted">This is not a coding bootcamp, degree programme, placement service, or a promise of a startup outcome.</p></div>
            </div>
          </section>

          <section className="fellowship-section fellowship-section--warm">
            <div className="page-width fellowship-split fellowship-split--reverse">
              <div><p className="fellowship-kicker">What completion means</p><h2>Leave with evidence—not merely enthusiasm.</h2></div>
              <div className="fellowship-prose"><p>Graduation is tied to commercial proof and a clear decision. The current standard is:</p><div className="fellowship-outcome"><strong>Two paying B2B customers</strong><span>or</span><strong>₹40,000 collected commercial revenue</strong></div><p>Alongside this, fellows produce a Bayesian decision memo or a 90-day operational roadmap: an honest account of the evidence, the uncertainty, and the next best move.</p></div>
            </div>
          </section>

          <section className="fellowship-section" id="fees">
            <div className="page-width fellowship-section__heading fellowship-section__heading--single"><div><p className="fellowship-kicker">Tuition, scholarships &amp; refunds</p><h2>Make the commercial commitment clear before you apply.</h2></div></div>
            <div className="page-width fellowship-finance-grid">
              <article><p>Founding Cohort tuition</p><strong>₹2,50,000</strong><span>Current tuition anchor. Final tuition and due dates appear in your offer letter.</span></article>
              <article><p>Payment plan</p><strong>₹5,000 + 6 instalments</strong><span>₹5,000 seat deposit, then ₹36,665 and five monthly instalments of ₹41,667. The deposit is credited toward tuition.</span></article>
              <article><p>Scholarship support</p><strong>Available by review</strong><span>Request consideration in your application. Need is assessed separately from capability and fit.</span></article>
            </div>
            <div className="page-width fellowship-policy">
              <div><h3>Refund policy</h3><p>Current terms provide a 14-day, 100% money-back window beginning after Day 1. The exact terms—including any physical kit deduction—must be reviewed in the offer letter before accepting a seat.</p></div>
              <div><h3>What Bayes will not ask for</h3><p>No equity. No loan or debt-financing arrangement. No placement, funding, or revenue guarantee.</p></div>
            </div>
          </section>

          <section className="fellowship-section fellowship-section--ink" id="admissions">
            <div className="page-width"><div className="fellowship-section__heading"><div><p className="fellowship-kicker">Admissions</p><h2>A selective, human process.</h2></div><p>We look for evidence of agency, not polished founder theatre. The process is designed to help both sides decide whether the work is a fit.</p></div>
              <ol className="admissions-list">{admissions.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
              <p className="fellowship-footnote">Application deadline, briefing dates, and the next cohort start date: <strong>to be announced.</strong></p>
            </div>
          </section>

          <section className="fellowship-section fellowship-brochure">
            <div className="page-width fellowship-brochure__inner"><div><p className="fellowship-kicker">Applicant brochure</p><h2>Everything you need to assess the Fellowship properly.</h2><p>The brochure will include the full week-by-week curriculum, confirmed dates, teaching team, cohort calendar, complete fee terms, and application checklist.</p></div><button className="button button--primary" type="button" onClick={onDownloadBrochure}><span>Get the brochure</span><ArrowIcon /></button></div>
          </section>

          <section className="fellowship-section fellowship-faq" id="faq">
            <div className="page-width"><p className="fellowship-kicker">Frequently asked questions</p><h2>Questions worth answering before you commit.</h2><div className="fellowship-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div>
          </section>

          <section className="fellowship-closing"><div className="page-width"><p className="fellowship-kicker">Founding Cohort</p><h2>Ready to find out what the market will actually pay for?</h2><p>Begin an application when you are ready. You can save your progress and return to it.</p><button className="button button--primary" type="button" onClick={onApply}><span>{isAuthenticated && hasApplication ? "Resume application" : "Apply to the Founding Cohort"}</span><ArrowIcon /></button></div></section>
        </div>
      )}
    </SiteExperience>
  );
}
