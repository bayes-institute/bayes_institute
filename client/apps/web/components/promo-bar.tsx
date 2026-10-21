'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const PROMO_KEY = 'promo-jan-2025';
const PROMO_HEIGHT = '2.75rem';

export function PromoBar() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(PROMO_KEY) !== 'dismissed') {
      setVisible(true);
      document.documentElement.style.setProperty('--promo-height', PROMO_HEIGHT);
    }
  }, []);

  const dismiss = () => setLeaving(true);

  const onAnimationEnd = () => {
    if (!leaving) return;
    setVisible(false);
    localStorage.setItem(PROMO_KEY, 'dismissed');
    document.documentElement.style.setProperty('--promo-height', '0px');
  };

  if (!visible) return null;

  return (
    <div
      className={`promo-bar${leaving ? ' promo-bar--leaving' : ''}`}
      onAnimationEnd={onAnimationEnd}
      role="region"
      aria-label="Admissions announcement"
    >
      <div className="promo-bar__inner">
        <p className="promo-bar__message">
          <span className="promo-bar__badge">Admissions open</span>
          <span className="promo-bar__sep" aria-hidden="true">·</span>
          <span className="promo-bar__text">
            Applications are now open for the January 2025 cohort. 
          </span>
          <Link href="/#learners" className="promo-bar__cta">
            Choose your programme
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </p>
      </div>

      <button
        className="promo-bar__dismiss"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        type="button"
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
          <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}
