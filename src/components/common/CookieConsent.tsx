"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  applyConsent,
  CONSENT_EVENT,
  readConsent,
  type ConsentChoice
} from "@/lib/consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (readConsent() === null) setVisible(true);
    }, 0);

    // A choice made in the Privacy choices panel answers this banner's
    // question too. Without this the banner would stay up asking something
    // the visitor has already answered a few centimetres above it.
    const onChange = () => setVisible(false);
    window.addEventListener(CONSENT_EVENT, onChange);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, onChange);
    };
  }, []);

  // src/lib/consent.ts is the one definition of what a choice does. It fires
  // CONSENT_EVENT, which the listener above uses to close the banner.
  const decide = (choice: ConsentChoice) => applyConsent(choice);

  if (!visible) return null;

  return (
    <div
      className='cookie-banner'
      role='dialog'
      aria-label='Cookie consent'
      aria-live='polite'
    >
      <div className='cookie-banner__inner'>
        <p className='cookie-banner__text'>
          We use analytics cookies to understand how visitors use our site so we
          can improve it. We only set them with your consent. Read our{" "}
          <Link href='/cookie-policy' className='cookie-banner__link'>
            Cookie Policy
          </Link>
          .
        </p>
        <div className='cookie-banner__actions'>
          <button
            type='button'
            className='cookie-banner__btn cookie-banner__btn--reject'
            onClick={() => decide("denied")}
          >
            Reject
          </button>
          <button
            type='button'
            className='cookie-banner__btn cookie-banner__btn--accept'
            onClick={() => decide("granted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
