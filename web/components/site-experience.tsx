"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { SiteHeader } from "./site-header";

type ApplicationStatus = "none" | "inProgress";
type AuthIntent = "account" | "application" | "brochure";
type AuthMode = "signin" | "signup";

type SiteExperienceControls = {
  hasApplication: boolean;
  isAuthenticated: boolean;
  onApply: () => void;
  onDownloadBrochure: () => void;
  onOpenApplications: () => void;
};

type SiteExperienceProps = {
  children: (controls: SiteExperienceControls) => ReactNode;
};

export function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M3.75 10h12.5M11.5 5.25 16.25 10l-4.75 4.75" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="m4.25 4.25 7.5 7.5M11.75 4.25l-7.5 7.5" />
    </svg>
  );
}

function AuthDialog({
  intent,
  mode,
  onClose,
  onComplete,
  onModeChange,
}: {
  intent: AuthIntent;
  mode: AuthMode;
  onClose: () => void;
  onComplete: () => void;
  onModeChange: (mode: AuthMode) => void;
}) {
  const isSignIn = mode === "signin";
  const title = isSignIn ? "Welcome back" : "Create your account";
  const intro =
    intent === "application"
      ? "Save your Founding Cohort application and return whenever you need to finish it."
      : "Access applicant materials, saved downloads, and application history.";
  const submitLabel = isSignIn
    ? intent === "application"
      ? "Sign in and resume"
      : "Sign in"
    : intent === "application"
      ? "Create account and apply"
      : "Create account";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onComplete();
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className="dialog-header">
          <div>
            <p className="dialog-kicker">Bayes account</p>
            <h2 id="auth-title">{title}</h2>
            <p>{intro}</p>
          </div>
          <button className="dialog-close" type="button" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Account mode">
          <button
            type="button"
            role="tab"
            aria-selected={isSignIn}
            onClick={() => onModeChange("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isSignIn}
            onClick={() => onModeChange("signup")}
          >
            Sign up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label className="form-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete={isSignIn ? "current-password" : "new-password"}
              placeholder="Password"
              required
            />
          </label>

          {!isSignIn ? (
            <label className="form-field">
              <span>Full name</span>
              <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
            </label>
          ) : null}

          <button className="button button--primary auth-form__submit" type="submit">
            <span>{submitLabel}</span>
            <ArrowIcon />
          </button>
        </form>
      </section>
    </div>
  );
}

function ApplicationDialog({
  applicationStatus,
  brochureSaved,
  onClose,
  onDownloadBrochure,
  onResumeApplication,
}: {
  applicationStatus: ApplicationStatus;
  brochureSaved: boolean;
  onClose: () => void;
  onDownloadBrochure: () => void;
  onResumeApplication: () => void;
}) {
  const hasApplication = applicationStatus === "inProgress";
  const progress = hasApplication ? 42 : 0;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        className="application-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-title"
      >
        <div className="dialog-header">
          <div>
            <p className="dialog-kicker">Applicant workspace</p>
            <h2 id="application-title">My applications</h2>
            <p>Track your Founding Cohort draft, status, and applicant materials.</p>
          </div>
          <button className="dialog-close" type="button" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="application-progress" aria-label={`Application ${progress}% complete`}>
          <div>
            <span>Bayes Founder Fellowship — Founding Cohort</span>
            <strong>{hasApplication ? `${progress}% complete` : "Not started"}</strong>
          </div>
          <i>
            <span style={{ width: `${progress}%` }} />
          </i>
        </div>

        <div className="application-list">
          <article className="application-row">
            <div>
              <p>Fellowship application</p>
              <span>{hasApplication ? "Draft saved - resume from your last section" : "Ready when you are"}</span>
            </div>
            <button className="application-row__action" type="button" onClick={onResumeApplication}>
              {hasApplication ? "Resume" : "Start"}
            </button>
          </article>

          <article className="application-row">
            <div>
              <p>Application status</p>
              <span>{hasApplication ? "In progress - not yet submitted" : "No active submission"}</span>
            </div>
            <button className="application-row__action" type="button" onClick={onResumeApplication}>
              View
            </button>
          </article>

          <article className="application-row">
            <div>
              <p>Fellowship brochure</p>
              <span>{brochureSaved ? "Saved to your account" : "Available after account access"}</span>
            </div>
            <button className="application-row__action" type="button" onClick={onDownloadBrochure}>
              {brochureSaved ? "Open" : "View"}
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}

export function SiteExperience({ children }: SiteExperienceProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasApplication, setHasApplication] = useState(false);
  const [brochureSaved, setBrochureSaved] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [authIntent, setAuthIntent] = useState<AuthIntent>("account");
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const applicationStatus: ApplicationStatus = hasApplication ? "inProgress" : "none";

  useEffect(() => {
    const dialogOpen = authOpen || applicationsOpen;
    document.body.style.overflow = dialogOpen ? "hidden" : "";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAuthOpen(false);
        setApplicationsOpen(false);
      }
    }

    if (dialogOpen) window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [authOpen, applicationsOpen]);

  function openAuth(mode: AuthMode, intent: AuthIntent = "account") {
    setApplicationsOpen(false);
    setAuthMode(mode);
    setAuthIntent(intent);
    setAuthOpen(true);
  }

  function handleApply() {
    if (!isAuthenticated) {
      openAuth("signup", "application");
      return;
    }

    setHasApplication(true);
    setApplicationsOpen(true);
  }

  function handleOpenApplications() {
    if (!isAuthenticated) {
      openAuth("signin", "account");
      return;
    }

    setApplicationsOpen(true);
  }

  function handleAuthComplete() {
    setIsAuthenticated(true);
    setAuthOpen(false);

    if (authMode === "signin" || authIntent === "application") {
      setHasApplication(true);
    }

    if (authIntent === "brochure") {
      setBrochureSaved(true);
    }

    setApplicationsOpen(true);
  }

  function handleDownloadBrochure() {
    if (!isAuthenticated) {
      openAuth("signin", "brochure");
      return;
    }

    setBrochureSaved(true);
  }

  function handleResumeApplication() {
    setHasApplication(true);
  }

  function handleSignOut() {
    setIsAuthenticated(false);
    setApplicationsOpen(false);
  }

  return (
    <main>
      <SiteHeader
        isAuthenticated={isAuthenticated}
        applicationStatus={applicationStatus}
        onApply={handleApply}
        onOpenApplications={handleOpenApplications}
        onOpenAuth={(mode) => openAuth(mode)}
        onSignOut={handleSignOut}
      />

      {children({
        hasApplication,
        isAuthenticated,
        onApply: handleApply,
        onDownloadBrochure: handleDownloadBrochure,
        onOpenApplications: handleOpenApplications,
      })}

      {authOpen ? (
        <AuthDialog
          intent={authIntent}
          mode={authMode}
          onClose={() => setAuthOpen(false)}
          onComplete={handleAuthComplete}
          onModeChange={setAuthMode}
        />
      ) : null}

      {applicationsOpen && isAuthenticated ? (
        <ApplicationDialog
          applicationStatus={applicationStatus}
          brochureSaved={brochureSaved}
          onClose={() => setApplicationsOpen(false)}
          onDownloadBrochure={handleDownloadBrochure}
          onResumeApplication={handleResumeApplication}
        />
      ) : null}
    </main>
  );
}
