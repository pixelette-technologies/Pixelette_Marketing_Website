"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { LogoBlack } from "@/assets/common";
import {
  emailMarketingContent,
  emailStages,
  type EmailStageId
} from "@/data/services/emailMarketing";
import {
  EmailIcon,
  PeopleIcon,
  ReengageIcon,
  TargetIcon
} from "./EmailIcons";

const icons = {
  welcome: EmailIcon,
  nurture: PeopleIcon,
  convert: TargetIcon,
  reengage: ReengageIcon
} as const;

const stageById = (id: EmailStageId) =>
  emailStages.find(stage => stage.id === id) ?? emailStages[0];

const EmailPreview = () => {
  const [stageId, setStageId] = useState<EmailStageId>("welcome");
  const [shownId, setShownId] = useState<EmailStageId>("welcome");
  const [fading, setFading] = useState(false);
  const reduceMotion = useRef(false);
  const timer = useRef<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<EmailStageId>("welcome");
  const shown = stageById(shownId);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reduceMotion.current = query.matches;
    };
    apply();
    query.addEventListener("change", apply);
    return () => {
      query.removeEventListener("change", apply);
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const select = (id: EmailStageId, focus = false) => {
    if (id === stageRef.current) return;
    stageRef.current = id;
    setStageId(id);
    if (timer.current !== null) window.clearTimeout(timer.current);

    const reveal = () => {
      setShownId(id);
      setFading(false);
      if (focus) {
        railRef.current
          ?.querySelector<HTMLButtonElement>(`[data-stage="${id}"]`)
          ?.focus();
      }
    };

    if (reduceMotion.current) {
      reveal();
      return;
    }

    setFading(true);
    timer.current = window.setTimeout(reveal, 180);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const backward = event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!forward && !backward) return;
    event.preventDefault();
    const index = emailStages.findIndex(stage => stage.id === stageRef.current);
    const delta = forward ? 1 : -1;
    const next =
      emailStages[(index + delta + emailStages.length) % emailStages.length];
    select(next.id, true);
  };

  return (
    <div className='emPreview'>
      <div className='emPreview__mail'>
        <article className='emMail' aria-label='Illustrative marketing email'>
          <header className='emMail__chrome'>
            <span className='emMail__logo'>
              <LogoBlack />
            </span>
            <span className='emMail__dots' aria-hidden='true'>
              <span />
              <span />
              <span />
            </span>
          </header>
          <div
            className={`emMail__live${fading ? " is-fading" : ""}`}
            aria-live='polite'
          >
            <p className='emMail__meta'>
              <EmailIcon className='emMail__env' />
              <span>From: Pixelette Marketing</span>
              <span>Subject: {shown.subject}</span>
            </p>
            <div className='emMail__panel'>
              <div className='emMail__art' aria-hidden='true'>
                <span />
                <span />
                <span />
              </div>
              <div className='emMail__panelCopy'>
                <p className='emMail__headline'>{shown.headline}</p>
                <p className='emMail__body'>{shown.body}</p>
                <Link href={shown.href} className='emMail__cta'>
                  {shown.cta}
                  <span aria-hidden='true'> →</span>
                </Link>
              </div>
            </div>
          </div>
          <div className='emMail__bars' aria-hidden='true'>
            <span />
            <span />
          </div>
        </article>
        <p className='emPreview__note'>{emailMarketingContent.hero.note}</p>
      </div>

      <div
        ref={railRef}
        className='emRail'
        role='radiogroup'
        aria-label='Email lifecycle stage'
        onKeyDown={onKeyDown}
      >
        {emailStages.map(stage => {
          const Icon = icons[stage.id];
          const selected = stage.id === stageId;
          return (
            <button
              key={stage.id}
              type='button'
              role='radio'
              data-stage={stage.id}
              className='emRail__step'
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(stage.id)}
            >
              <span className='emRail__node' aria-hidden='true' />
              <span className='emRail__pill'>
                <Icon className='emRail__icon' />
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmailPreview;
