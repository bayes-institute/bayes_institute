"use client";

import Link from "next/link";
import { ArrowIcon, SiteExperience } from "./site-experience";

type RoutePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  note: string;
  supportingPoints: string[];
};

export function RoutePage({ eyebrow, title, intro, note, supportingPoints }: RoutePageProps) {
  return (
    <SiteExperience>
      {({ onApply }) => (
        <section className="route-page">
          <div className="route-page__grid page-width">
            <div className="route-page__copy">
              <p className="route-page__eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{intro}</p>
              <div className="route-page__actions">
                <button className="button button--primary" type="button" onClick={onApply}>
                  <span>Apply to the Founding Cohort</span>
                  <ArrowIcon />
                </button>
                <Link className="button button--text" href="/">
                  <span>Back to home</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <aside className="route-page__panel" aria-label={`${title} highlights`}>
              <p>{note}</p>
              <ul>
                {supportingPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      )}
    </SiteExperience>
  );
}
