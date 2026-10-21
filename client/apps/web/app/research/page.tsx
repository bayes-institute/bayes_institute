import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../../components/page-hero';
import { SectionDivider } from '../../components/section-divider';

export const metadata: Metadata = {
  title: 'Research & Insights — Bayes Institute',
  description: 'Work emerging from Bayes Institute faculty, fellows, and partners.',
};

const posts = [
  {
    slug: 'bayesian-ml',
    tag: 'Machine Learning',
    title: 'The Bayesian Advantage in Modern Machine Learning',
    excerpt:
      'Why uncertainty quantification — long the domain of statisticians — is becoming central to responsible AI development.',
    date: 'November 2024',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'stochastic-calculus',
    tag: 'Quantitative Finance',
    title: 'Stochastic Calculus as a Practitioner Tool',
    excerpt:
      "A practitioner's guide to Ito's lemma, Brownian motion, and why the mathematics of randomness matters more than ever in modern markets.",
    date: 'October 2024',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'distributed-consensus',
    tag: 'Cloud & Systems',
    title: 'Consensus in the Age of Global-Scale Systems',
    excerpt:
      'From Paxos to Raft to the protocols powering today\'s cloud infrastructure — an exploration of distributed agreement under failure.',
    date: 'September 2024',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'cohort-learning',
    tag: 'Pedagogy',
    title: 'Why Cohort Learning Outperforms Individual Study at the Frontier',
    excerpt:
      'The evidence for peer-driven learning in highly technical domains, and how Bayes Institute applies it in practice.',
    date: 'August 2024',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop',
  },
];

const areas = [
  {
    title: 'Bayesian Inference & Decision Theory',
    desc: 'Formal methods for reasoning under uncertainty, from foundational probability theory to decision-making in complex, data-rich environments.',
  },
  {
    title: 'Financial Mathematics',
    desc: 'Stochastic processes, derivatives pricing, risk modelling, and the mathematical structures underlying modern quantitative finance.',
  },
  {
    title: 'Distributed Systems & Cloud Architecture',
    desc: 'Consensus algorithms, fault tolerance, consistency models, and the systems engineering that makes global-scale infrastructure reliable.',
  },
  {
    title: 'Learning Science & Pedagogy',
    desc: 'How expertise is built, how cohort learning accelerates it, and the design of learning environments that produce lasting capability.',
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Research & Insights"
        subtitle="Work emerging from Bayes Institute faculty, fellows, and partners."
        image="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1920&q=80&auto=format&fit=crop"
      />

      <section className="page-section">
        <div className="contained">
          <p className="section-label">Latest</p>
          <h2 className="section-title">From the institute.</h2>
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.slug} className="blog-card">
                <div className="blog-card__img-wrap">
                  <img src={post.img} alt={post.title} className="blog-card__img" />
                </div>
                <p className="blog-card__tag">{post.tag}</p>
                <h3 className="blog-card__title">
                  <Link href={`/research/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <p className="blog-card__meta">{post.date} · 5 min read</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#f7f6f4" />

      <section className="page-section page-section--alt">
        <div className="contained">
          <p className="section-label">Research areas</p>
          <h2 className="section-title">What we study.</h2>
          <div className="research-areas" style={{ marginTop: '2.5rem' }}>
            {areas.map((a) => (
              <div key={a.title} className="research-area">
                <h3 className="research-area__title">{a.title}</h3>
                <p className="research-area__desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
