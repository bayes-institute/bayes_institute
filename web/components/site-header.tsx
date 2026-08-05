"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ApplicationStatus = "none" | "inProgress";
type AuthMode = "signin" | "signup";

type SiteHeaderProps = {
  isAuthenticated: boolean;
  applicationStatus: ApplicationStatus;
  onApply: () => void;
  onOpenApplications: () => void;
  onOpenAuth: (mode: AuthMode) => void;
  onSignOut: () => void;
};

const navigation = [
  { label: "Fellowship", href: "/fellowship" },
  { label: "Theses", href: "/theses" },
  { label: "Library", href: "/library" },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M10 10.6a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="M4.25 16.4c.7-2.5 2.78-4.08 5.75-4.08s5.05 1.58 5.75 4.08" />
    </svg>
  );
}

export function SiteHeader({
  isAuthenticated,
  applicationStatus,
  onApply,
  onOpenApplications,
  onOpenAuth,
  onSignOut,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [ribbonDismissed, setRibbonDismissed] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const applicationLabel = isAuthenticated
    ? applicationStatus === "inProgress"
      ? "Resume application"
      : "Start application"
    : "Apply to the Founding Cohort";

  useEffect(() => {
    let animationFrame = 0;

    function updateHeader() {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const header = headerRef.current;
        if (!header) return;

        const mobile = window.innerWidth <= 768;
        const expandedHeight = Math.min(98, Math.max(76, window.innerWidth * 0.071));
        const compactHeight = mobile ? 54 : 58;
        const transitionDistance = mobile ? 100 : 140;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const naturalProgress = Math.min(Math.max(window.scrollY / transitionDistance, 0), 1);
        const progress = prefersReducedMotion ? Number(window.scrollY > 64) : naturalProgress;
        const height = expandedHeight + (compactHeight - expandedHeight) * progress;
        const logoScale = 1 - 0.3 * progress;
        const borderAlpha = 0.14 * (1 - progress);

        header.style.setProperty("--header-height", `${height}px`);
        header.style.setProperty("--header-progress", progress.toFixed(4));
        header.style.setProperty("--logo-scale", logoScale.toFixed(4));
        header.style.setProperty("--header-border-alpha", borderAlpha.toFixed(4));
      });
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setAccountOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!accountOpen) return;

    function closeOnPointerDown(event: PointerEvent) {
      const account = accountRef.current;
      if (!account || !(event.target instanceof Node) || account.contains(event.target)) return;

      setAccountOpen(false);
    }

    window.addEventListener("pointerdown", closeOnPointerDown);

    return () => {
      window.removeEventListener("pointerdown", closeOnPointerDown);
    };
  }, [accountOpen]);

  const ribbonHidden = ribbonDismissed;

  function handleApply() {
    setAccountOpen(false);
    setMenuOpen(false);
    onApply();
  }

  function handleOpenApplications() {
    setAccountOpen(false);
    setMenuOpen(false);
    onOpenApplications();
  }

  function handleOpenAuth(mode: AuthMode) {
    setAccountOpen(false);
    setMenuOpen(false);
    onOpenAuth(mode);
  }

  function handleSignOut() {
    setAccountOpen(false);
    setMenuOpen(false);
    onSignOut();
  }

  return (
    <header
      className={`site-header${ribbonDismissed ? " is-ribbon-dismissed" : ""}`}
      ref={headerRef}
    >
      <aside
        className="announcement"
        aria-label="Cohort application announcement"
        aria-hidden={ribbonHidden}
      >
        <div className="announcement__inner page-width">
          <p>
            <span className="announcement__status">Applications open</span>
            <strong>Give the founder in you a real chance.</strong>
            <span>Founding Cohort applications are live in Mumbai &amp; Pune.</span>
            <button
              className="announcement__detail"
              type="button"
              tabIndex={ribbonHidden ? -1 : undefined}
              onClick={handleApply}
            >
              {applicationLabel}
            </button>
          </p>
          <button
            type="button"
            aria-label="Dismiss cohort application announcement"
            tabIndex={ribbonHidden ? -1 : undefined}
            onClick={() => setRibbonDismissed(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </aside>

      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="Bayes Institute home">
          <Image
            className="brand__full"
            src="/assets/logos/logo-primary.svg"
            alt="Bayes Institute"
            width={648}
            height={272}
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <div className="account-menu" ref={accountRef}>
              <button
                className="account-trigger"
                type="button"
                aria-label="Open account menu"
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                onClick={() => setAccountOpen((open) => !open)}
              >
                <UserIcon />
              </button>

              {accountOpen ? (
                <div className="account-dropdown" role="menu">
                  <button type="button" role="menuitem" onClick={handleOpenApplications}>
                    <span>My applications</span>
                    <small>{applicationStatus === "inProgress" ? "1 in progress" : "No active drafts"}</small>
                  </button>
                  <button type="button" role="menuitem" onClick={handleOpenApplications}>
                    <span>Application status</span>
                    <small>{applicationStatus === "inProgress" ? "Draft saved" : "Ready to start"}</small>
                  </button>
                  <button type="button" role="menuitem" onClick={handleOpenApplications}>
                    <span>Saved brochure</span>
                    <small>View or download</small>
                  </button>
                  <button type="button" role="menuitem" onClick={handleOpenApplications}>
                    <span>Profile</span>
                    <small>Account details</small>
                  </button>
                  <button
                    className="account-dropdown__signout"
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                  >
                    <span>Sign out</span>
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <button className="header-sign-in" type="button" onClick={() => handleOpenAuth("signin")}>
              <span>Sign in</span>
              <UserIcon />
            </button>
          )}
        </div>

        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => {
            setAccountOpen(false);
            setMenuOpen((open) => !open);
          }}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`mobile-navigation${menuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              tabIndex={menuOpen ? undefined : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
              <ArrowIcon />
            </Link>
          ))}
        </nav>

        <div className="mobile-navigation__actions">
          <button
            className="mobile-navigation__action mobile-navigation__action--primary"
            type="button"
            tabIndex={menuOpen ? undefined : -1}
            onClick={handleApply}
          >
            {applicationLabel}
            <ArrowIcon />
          </button>

          {isAuthenticated ? (
            <button
              className="mobile-navigation__action"
              type="button"
              tabIndex={menuOpen ? undefined : -1}
              onClick={handleOpenApplications}
            >
              My applications
              <UserIcon />
            </button>
          ) : (
            <button
              className="mobile-navigation__action"
              type="button"
              tabIndex={menuOpen ? undefined : -1}
              onClick={() => handleOpenAuth("signin")}
            >
              Sign in
              <UserIcon />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
