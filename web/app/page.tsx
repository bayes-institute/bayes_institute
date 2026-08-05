"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, SiteExperience } from "../components/site-experience";

export default function Home() {
  return (
    <SiteExperience>
      {({ hasApplication, isAuthenticated, onApply }) => (
        <>
          <section className="hero" id="top">
            <div className="hero__grid-lines" aria-hidden="true" />

            <div className="hero__content page-width">
              <div className="hero-copy">
                <h1 className="hero-title hero-reveal hero-reveal--two">
                  <span className="hero-title__lead">Building software has never been easier.</span>
                  <span className="hero-title__main">Building something <em>customers pay for</em> is still rare.</span>
                </h1>

                <p className="hero-intro hero-reveal hero-reveal--three">
                  The Founder Fellowship bridges this gap. Over <strong>40 part-time weeks</strong>, working professionals and technical minds validate market demand, launch a focused software product, and gather the revenue evidence needed to transition full-time.
                </p>

                <div className="hero-actions hero-reveal hero-reveal--four">
                  <button className="button button--primary" type="button" onClick={onApply}>
                    <span>{isAuthenticated && hasApplication ? "Resume application" : "Apply to the Founding Cohort"}</span>
                    <ArrowIcon />
                  </button>
                  <Link className="button button--secondary" href="/fellowship">
                    <span>Explore the 40-Week Curriculum</span>
                  </Link>
                </div>
              </div>

              <figure className="hero-visual">
                <div className="hero-visual__board">
                  <Image
                    src="/assets/img/homepage_hero_illustration.png"
                    alt="Hand-drawn Bayes Founder Fellowship graph showing a founder journey rising beyond a corporate job path."
                    width={1277}
                    height={1231}
                    priority
                    sizes="(max-width: 768px) 96vw, (max-width: 1200px) 48vw, 49rem"
                  />
                </div>
              </figure>
            </div>
          </section>

          <div className="future-layouts" id="landing-preview" aria-label="Future page sections">
            <section className="future-section future-section--split" aria-label="Fellowship preview" />
            <section className="future-section future-section--columns" aria-label="Theses preview" />
            <section className="future-section future-section--focus" aria-label="Library preview" />
          </div>
        </>
      )
      }
    </SiteExperience >
  );
}
