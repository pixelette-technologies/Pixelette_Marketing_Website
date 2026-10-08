"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { applyConsent, readConsent, type ConsentChoice } from "@/lib/consent";

interface ManageCookiesProps {
  label?: string;
  /** Styles the trigger. The footer renders it as one of its links and
   *  /cookie-policy as the filled .btn. */
  className?: string;
}

// --- 18 Sep 2026: the Privacy choices panel ---------------------------------
// Same structure as the Pixelette Technologies panel: a titled dialog, one
// setting — Website analytics — with a plain-language explanation, the current
// state, an On/Off switch, and a link to the cookie policy.
//
// It replaces the old behaviour, which cleared the stored choice and RELOADED
// THE PAGE so the first-visit banner would ask again. That threw away the
// reader's place on the page to answer a two-option question.
//
// THE WORDING IS NOT THEIRS, and deliberately. Their panel says "No analytics
// are currently running on this website", which is true of their site and
// false of this one: this site runs Google Analytics. Every sentence below is
// checked against what the code does — see src/lib/consent.ts for the facts
// and the one sentence this panel must never say.
//
// The dialog is PORTALLED TO <body>. This trigger renders in two places — the
// footer and inside the cookie policy's .prose body — and both would restyle a
// dialog nested in them: .prose gives every h2 the display face at h2 size, and
// the footer colours every link its own pale tone, which is unreadable on the
// panel's white. In <body> the panel is styled by its own partial and nothing
// else. It only mounts once opened, so there is no server render to hydrate.
const ManageCookies = ({
  label = "Change your cookie preferences",
  className
}: ManageCookiesProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const titleId = useId();
  const toggleLabelId = useId();

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
  }, [open]);

  const openPanel = () => {
    setChoice(readConsent());
    setOpen(true);
  };

  const choose = (next: ConsentChoice) => {
    applyConsent(next);
    setChoice(next);
  };

  // No choice yet means analytics_storage is still at its denied default, so
  // Off is the TRUE state and is shown pressed. Pressing neither would suggest
  // an undecided middle state that the tag does not have.
  const isOn = choice === "granted";

  const state = isOn
    ? "Analytics is on. Google Analytics can set its cookies in this browser."
    : choice === "denied"
      ? "Analytics is off. Google Analytics cookies are not set in this browser."
      : "You have not made a choice yet, so analytics is off and Google Analytics cookies are not set.";

  return (
    <>
      <button type='button' onClick={openPanel} className={className}>
        {label}
      </button>

      {open &&
        createPortal(
          <dialog
            ref={dialogRef}
            className='privacyPanel'
            aria-labelledby={titleId}
            onClose={() => setOpen(false)}
            // A click that lands on the dialog itself, not on anything inside
            // it, is a click on the backdrop.
            onClick={event => {
              if (event.target === event.currentTarget) {
                dialogRef.current?.close();
              }
            }}
          >
            <div className='privacyPanel__inner'>
              <div className='privacyPanel__head'>
                <h2 id={titleId} className='h4'>
                  Privacy choices
                </h2>
                <button
                  type='button'
                  className='privacyPanel__close'
                  aria-label='Close privacy choices'
                  onClick={() => dialogRef.current?.close()}
                >
                  ×
                </button>
              </div>

              <h3 className='privacyPanel__sub'>Website analytics</h3>
              <p className='privacyPanel__body'>
                We use Google Analytics to understand how the Pixelette
                Marketing website is used and to improve its content and
                performance. Its cookies are only set if you turn analytics on.
                We do not send your name, email address or enquiry details to
                Google Analytics, and its advertising and ad personalisation
                features are switched off.
              </p>
              <p className='privacyPanel__state' role='status'>
                {state}
              </p>

              <div className='privacyPanel__control'>
                <span id={toggleLabelId}>Website analytics</span>
                <div
                  className='privacyToggle'
                  role='group'
                  aria-labelledby={toggleLabelId}
                >
                  <button
                    type='button'
                    aria-pressed={isOn}
                    onClick={() => choose("granted")}
                  >
                    On
                  </button>
                  <button
                    type='button'
                    aria-pressed={!isOn}
                    onClick={() => choose("denied")}
                  >
                    Off
                  </button>
                </div>
              </div>

              <p className='privacyPanel__note'>
                Your choice is saved in this browser. You can change it at any
                time.
              </p>
              <Link className='privacyPanel__link link' href='/cookie-policy'>
                Learn more about cookies &amp; analytics
              </Link>
            </div>
          </dialog>,
          document.body
        )}
    </>
  );
};

export default ManageCookies;
