export default function Home() {
  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="eyebrow">Learning with purpose</p>
          <h1 id="hero-title">A place to learn deeply and move forward with confidence.</h1>
          <p className="hero__lede">
            Bayes Institute is building thoughtful learning experiences for ambitious learners,
            educational institutions, and forward-looking teams.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#learners">
              Explore for learners
              <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#audiences">
              See who we work with
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <p className="hero__note">
          <span>Bayes Institute</span>
          A new digital home is taking shape.
        </p>
      </section>

      <section className="audiences" id="audiences" aria-labelledby="audiences-title">
        <div className="section-heading">
          <p className="eyebrow">Who we serve</p>
          <h2 id="audiences-title">One institute, built around three perspectives.</h2>
        </div>

        <div className="audience-grid">
          <article className="audience-card" id="learners">
            <p className="audience-card__number">01</p>
            <h3>Learners</h3>
            <p>Join focused cohorts designed around meaningful progress and enduring skills.</p>
            <a href="#learners" aria-label="Learn more for learners">
              For learners <span aria-hidden="true">→</span>
            </a>
          </article>

          <article className="audience-card" id="institutions">
            <p className="audience-card__number">02</p>
            <h3>Institutions</h3>
            <p>Extend learning through considered programmes, partnerships, and shared practice.</p>
            <a href="#institutions" aria-label="Learn more for institutions">
              For institutions <span aria-hidden="true">→</span>
            </a>
          </article>

          <article className="audience-card" id="enterprise">
            <p className="audience-card__number">03</p>
            <h3>Enterprise</h3>
            <p>Develop people and capabilities for organisations navigating meaningful change.</p>
            <a href="#enterprise" aria-label="Learn more for enterprise">
              For enterprise <span aria-hidden="true">→</span>
            </a>
          </article>
        </div>
      </section>
    </div>
  );
}
