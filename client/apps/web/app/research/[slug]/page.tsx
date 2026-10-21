import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '../../../components/page-hero';

type Post = {
  slug: string;
  tag: string;
  title: string;
  date: string;
  img: string;
  body: { heading: string; paragraphs: string[] }[];
};

const posts: Post[] = [
  {
    slug: 'bayesian-ml',
    tag: 'Machine Learning',
    title: 'The Bayesian Advantage in Modern Machine Learning',
    date: 'November 2024',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80&auto=format&fit=crop',
    body: [
      {
        heading: 'Why uncertainty is the central problem',
        paragraphs: [
          'Every prediction a machine learning model makes is, in some sense, an expression of uncertainty. The question is whether the model is explicit about that uncertainty or hides it behind a point estimate. Classical frequentist approaches to machine learning have generally preferred the latter: a model outputs a single number, and the practitioner is left to guess how much to trust it.',
          'The Bayesian approach takes a different view. Rather than seeking the single best parameter setting, Bayesian inference characterises the entire distribution over plausible parameter values given the observed data. The output of prediction is not a number but a distribution. This representation of uncertainty is not merely philosophically satisfying; it is practically indispensable in any domain where the cost of overconfident errors is high.',
          'Applications in medicine, finance, and autonomous systems all share this property. A drug efficacy model that cannot express its own uncertainty about a prediction provides systematically worse guidance than one that can. The last decade of machine learning has increasingly recognised this, and Bayesian methods have moved from the periphery to the mainstream of serious AI research.',
        ],
      },
      {
        heading: 'The computational challenge and its resolution',
        paragraphs: [
          'For most of the history of statistics, the Bayesian approach was computationally intractable for large models. Computing the posterior distribution exactly requires integrating over the entire parameter space, a calculation that is feasible only for a small class of conjugate prior-likelihood pairs. For neural networks with millions of parameters, exact Bayesian inference is simply not possible.',
          'Two families of approximation have changed this picture. Variational inference reformulates the posterior computation as an optimisation problem: instead of computing the true posterior, we find the member of a tractable family of distributions that is closest to it under the Kullback-Leibler divergence. Markov Chain Monte Carlo methods, and particularly the No-U-Turn Sampler, make it possible to draw samples from complex posteriors efficiently. Both approaches are now implemented in mature probabilistic programming frameworks including Pyro, NumPyro, and TensorFlow Probability.',
          'The emergence of deep learning has added a third path: approximate Bayesian inference through techniques such as Monte Carlo dropout and deep ensembles. These methods do not derive from Bayesian first principles, but they produce calibrated uncertainty estimates that are useful in practice and computationally tractable at the scale of large neural networks.',
        ],
      },
      {
        heading: 'What this means for responsible AI',
        paragraphs: [
          'The responsible AI literature has increasingly converged on uncertainty quantification as a core requirement for high-stakes deployments. A model that expresses appropriate uncertainty about its own predictions enables a different kind of human-machine interaction: one where the model flags its own limitations and defers to human judgment in the cases where it should.',
          'Calibration, the property that a model\'s expressed confidence matches its actual accuracy, turns out to be difficult to achieve and easy to measure. A well-calibrated model that says it is 90% confident should be correct 90% of the time across many such predictions. Many modern deep learning models are systematically miscalibrated, overconfident in their predictions even when those predictions are wrong. Bayesian approaches and their approximations offer principled paths to better calibration.',
          'For practitioners at Bayes Institute, uncertainty quantification is not an add-on to AI work but a core competency. Understanding when a model does not know what it does not know is as important as understanding what it has learned. This is why our Applied AI programme devotes significant time to probabilistic methods, Bayesian inference, and the practical evaluation of model calibration.',
        ],
      },
    ],
  },
  {
    slug: 'stochastic-calculus',
    tag: 'Quantitative Finance',
    title: 'Stochastic Calculus as a Practitioner Tool',
    date: 'October 2024',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1920&q=80&auto=format&fit=crop',
    body: [
      {
        heading: "Ito's lemma and why it matters",
        paragraphs: [
          "Stochastic calculus is the branch of mathematics concerned with integration and differentiation of functions of stochastic processes. For the practitioner in finance, the key object is Brownian motion and the key tool is Ito's lemma: a chain rule for functions of stochastic processes that differs from the classical chain rule by a correction term proportional to the quadratic variation of the process.",
          "This correction term, the Ito correction, is not a mathematical curiosity. It is the reason that the Black-Scholes equation takes the form it does, and why the replicating portfolio argument that underlies risk-neutral pricing works. Practitioners who treat the Black-Scholes formula as a black box and do not understand where it comes from are poorly equipped to reason about when and why it fails.",
          "The intuition behind Ito's lemma is straightforward: Brownian motion has non-zero quadratic variation, meaning that the cumulative squared increments of the process converge to a finite limit even as the time steps shrink to zero. This is in contrast to any deterministic function of bounded variation, where the quadratic variation is zero. It is this property that makes the stochastic correction necessary.",
        ],
      },
      {
        heading: 'From theory to pricing',
        paragraphs: [
          'The passage from Ito calculus to derivatives pricing runs through the concept of a martingale and the change of measure theorem known as Girsanov\'s theorem. Under the physical measure, risky assets earn a risk premium. Under the risk-neutral measure, all assets earn the risk-free rate. The insight of Black, Scholes, and Merton was that derivatives can be priced under the risk-neutral measure, eliminating the need to estimate risk premia.',
          'In practice, the risk-neutral measure is calibrated to observed market prices. The implied volatility surface is the market\'s risk-neutral probability distribution over future asset prices, extracted from option prices via the inverse of the pricing formula. Reading, interpolating, and stress-testing the implied vol surface is a daily task for practitioners on derivatives desks and in risk management.',
          'Beyond Black-Scholes, the stochastic calculus framework supports an enormous family of more sophisticated models: stochastic volatility models such as Heston and SABR, interest rate models such as Hull-White and Libor Market Model, and jump-diffusion models for assets subject to discontinuous price movements. Each requires the same foundational tools applied in different configurations.',
        ],
      },
      {
        heading: 'The practitioner perspective',
        paragraphs: [
          'For the quant practitioner, stochastic calculus is not primarily a mathematical object of study but a language for expressing and communicating ideas about risk and uncertainty in financial markets. The ability to derive a pricing equation, to understand its assumptions, and to reason about how those assumptions fail in stressed market conditions is what separates a quant analyst from someone who can run a pricing model.',
          'At Bayes Institute, we teach stochastic calculus from the measure-theoretic foundations upward. We do this not to be pedantic, but because practitioners who do not understand the mathematical structure of the models they use make systematic errors that are invisible from the surface. The 2008 financial crisis involved, among other things, the widespread misapplication of the Gaussian copula model by practitioners who did not understand its assumptions or their consequences.',
          'Our Quantitative Finance programme devotes the first two months to the mathematical infrastructure: probability theory, measure theory, and stochastic calculus. Learners who come to us with this foundation leave with the ability to read, derive, and critically evaluate models. Those who skip this step spend their careers implementing models they cannot fully reason about.',
        ],
      },
    ],
  },
  {
    slug: 'distributed-consensus',
    tag: 'Cloud & Systems',
    title: 'Consensus in the Age of Global-Scale Systems',
    date: 'September 2024',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop',
    body: [
      {
        heading: 'The consensus problem',
        paragraphs: [
          'The consensus problem is one of the fundamental problems in distributed computing: given a set of processes that can communicate by message passing, each starting with an initial value, reach agreement on a single value even in the presence of process failures and network partitions. The problem sounds simple. The theory reveals it to be surprisingly deep.',
          "The FLP impossibility result, proved by Fischer, Lynch, and Paterson in 1985, established that no deterministic algorithm can solve consensus in an asynchronous distributed system if even a single process can fail by stopping. This result is often misinterpreted as meaning that consensus is impossible; what it actually says is that it is impossible to guarantee both safety (all correct processes agree on the same value) and liveness (all correct processes eventually decide) in an asynchronous system with any failures at all.",
          'Practical consensus algorithms resolve this tension by making additional timing assumptions or probabilistic guarantees. Paxos, introduced by Leslie Lamport, assumes that the system is eventually synchronous: there exists some unknown time after which messages are delivered within some unknown but finite bound. Under this assumption, Paxos provides safety always and liveness when the system is eventually synchronous.',
        ],
      },
      {
        heading: 'From Paxos to Raft',
        paragraphs: [
          "Paxos is notoriously difficult to understand and implement correctly. The original paper, \"The Part-Time Parliament,\" was submitted in 1989 and rejected by reviewers who did not understand it. When Lamport resubmitted it in 1998, he described it in an author's note as \"the simplest and most obvious distributed algorithm.\" The gap between these two characterisations captures something real about the algorithm.",
          'Raft, introduced by Ongaro and Ousterhout in 2014, was designed explicitly to be more understandable than Paxos. It achieves this through a more rigid decomposition of the consensus problem into leader election, log replication, and safety. Raft is now the consensus algorithm at the heart of most modern distributed databases, including etcd (the backing store for Kubernetes) and CockroachDB.',
          'The choice between Paxos variants and Raft-based systems involves practical engineering trade-offs. Multi-Paxos can be more efficient in stable operation because the leader role is more flexible. Raft\'s strict log ordering and strong leader semantics make it easier to reason about correctness, at some cost in throughput under certain workloads. Understanding both is essential for cloud engineers who operate distributed systems at scale.',
        ],
      },
      {
        heading: 'Consensus in practice',
        paragraphs: [
          'For the cloud engineer, consensus algorithms appear in concrete forms: the etcd cluster that Kubernetes relies on for all cluster state, the ZooKeeper or Kafka cluster that coordinates distributed stream processing, the distributed database that must maintain consistency across multiple availability zones. The theory matters because failures in these systems are not random; they follow patterns that the theory predicts.',
          'Network partitions, in particular, produce failure modes that surprise engineers who have not thought carefully about the CAP theorem and its implications. A system that provides linearisable reads and writes cannot remain available during a partition; it must choose to reject requests from the partitioned minority. Systems that choose availability over consistency during partitions must expose mechanisms for detecting and resolving conflicting writes.',
          'Our Cloud Computing programme treats distributed systems theory not as an academic prerequisite but as a practical tool for reasoning about the systems learners will operate. The Raft protocol is not interesting because it is theoretically elegant; it is interesting because understanding it tells you what will happen when your etcd cluster loses quorum, and what you need to do to recover without data loss.',
        ],
      },
    ],
  },
  {
    slug: 'cohort-learning',
    tag: 'Pedagogy',
    title: 'Why Cohort Learning Outperforms Individual Study at the Frontier',
    date: 'August 2024',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80&auto=format&fit=crop',
    body: [
      {
        heading: 'The limits of individual learning',
        paragraphs: [
          'Self-directed learning has never been more accessible. The internet provides near-universal access to lecture videos, textbooks, and interactive coding environments. And yet expertise in technically demanding fields remains stubbornly difficult to acquire outside of formal programmes and practitioner communities. The abundance of content has not eliminated the problem of learning; it has made the problem of learning in isolation more visible.',
          'The cognitive science literature offers a partial explanation. Expertise involves not just the acquisition of declarative knowledge but the development of pattern recognition, calibrated intuition, and the ability to apply knowledge fluidly under time pressure and uncertainty. These competencies are developed through practice with feedback, a process that benefits from the presence of more expert practitioners and of peers at similar stages of development.',
          'Individual study, however disciplined, lacks the social infrastructure that makes this practice-with-feedback possible. The learner who studies alone has no one to correct their misconceptions, no one to model better reasoning, and no one to hold them accountable to the demands of the domain. This is why learning at the frontier of a technical field has historically required immersion in communities of practice: universities, research labs, and trading floors.',
        ],
      },
      {
        heading: 'What cohort structure provides',
        paragraphs: [
          'A cohort is a group of learners who advance through a curriculum together, on the same schedule, with shared accountability. The cohort structure recreates several of the social conditions that make community-based learning effective. Peers at similar stages of development provide calibration: they share the same confusions, ask the questions that clarify shared misconceptions, and notice when a peer\'s reasoning has gone wrong in ways that an expert might miss.',
          'Research on peer learning in higher education consistently shows that students learn more in active, collaborative environments than in passive lecture settings. The effect is not uniform: it is strongest in domains where the application of knowledge is complex and where understanding cannot be verified by simple recall. Mathematics, statistics, programming, and financial modelling all fall into this category.',
          'The accountability mechanism of cohort learning is underappreciated. Knowing that peers are advancing at the same rate, and that your progress will be visible to them, creates a consistent motivational pull that is absent from self-directed study. The research on completion rates in online courses is sobering: most learners who enrol in self-paced online courses do not complete them. Cohort-based programmes consistently achieve higher completion rates.',
        ],
      },
      {
        heading: 'The Bayes approach',
        paragraphs: [
          'At Bayes Institute, the cohort is not an organisational convenience but a designed learning environment. We select cohort members with care, not only for their individual capability but for the collective dynamic they will create. We limit cohort sizes to between 20 and 30 learners to ensure that every member can form meaningful relationships with most of the cohort. We structure the programme to require genuine collaboration, not just parallel individual work.',
          'The evidence from our first two cohorts is consistent with the broader literature. Learners consistently report that the cohort dynamic was the most valuable aspect of the programme: more valuable than the curriculum, the faculty, or the certification. The relationships formed during a cohort persist long after the programme ends, creating the alumni network that is one of the lasting outputs of the institute.',
          'We also take seriously the selection challenge. A cohort is only as strong as its members, and the peer learning benefit depends on the quality of the peer community. Our admissions process is designed to identify not just capable individuals but people who are likely to contribute to a demanding intellectual community. This is a hard balance to strike; we are still learning how to do it well.',
        ],
      },
    ],
  },
];

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Bayes Institute`,
    description: post.body[0]?.paragraphs[0]?.slice(0, 155),
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.tag}
        title={post.title}
        image={post.img}
      />

      <div className="article-wrap">
        <div className="contained">
          <div className="article-meta">
            <span>{post.tag}</span>
            <span>{post.date}</span>
            <span>5 min read</span>
          </div>

          <div className="article-body">
            {post.body.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
