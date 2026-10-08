'use client';

import {
  ASK_NAME,
  createEnquiryHelpers,
  DISCOVERY_OPENING,
  EMPTY_DRAFT,
  ENQUIRY_MAX,
  askEmail,
  greeting,
  looksLikeQuestion,
  respond,
  type AgentConfig,
  type EnquiryDraft,
  type KnowledgeFile,
  type LeadPayload,
  type LeadResult,
  type PixContext,
  type PixReply,
  type SitePack,
} from '@/lib/pix';
import { type FormEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Signal, type PixPhase } from './Signal';
import { applyTheme, type ThemeOptions } from './theme';

/* Server render has no layout phase. The client applies colour before paint. */
const useClientLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
import './agent.css';
import './signal.css';

/**
 * The shared site agent widget.
 *
 * Adapted from Technologies' SiteAssistant. Website-only imports (server
 * actions, branding constants, enquiry question modules) are replaced by
 * props. Behaviour for a Technologies-shaped config matches production Pix T.
 *
 * WHAT IT STILL DOES NOT KEEP. No cookie, no localStorage, no sessionStorage:
 * the conversation lives in React state and is gone on reload.
 */

export type AgentProps = {
  config: AgentConfig;
  context: PixContext;
  knowledge: KnowledgeFile;
  sitePack: SitePack;
  onIdentify: (input: { name: string; email: string }) => Promise<{ ref: string | null }>;
  onLead: (input: LeadPayload) => Promise<LeadResult>;
  themeOptions?: ThemeOptions;
};

type Turn = {
  id: number;
  role: 'visitor' | 'assistant';
  text: string;
  path?: string;
  sourceLabel?: string;
  offer?: PixReply['offer'];
};

/** Discovery in progress: which question is next, and the answers so far. */
type Flow = { step: number; draft: EnquiryDraft; reviewing: boolean };

/** Who the visitor said they are. `ref` names the recorded contact, once known. */
type Visitor = { name: string; email: string; ref: string | null };

const FIRST_TURN: Turn = { id: 0, role: 'assistant', text: ASK_NAME };

/** The brief's MESSAGE_MAX_CHARS (section 70); respond() also truncates at this. */
const MESSAGE_MAX = 2000;

/**
 * The website's answer to the enquiry, or `unconfirmed` when no answer arrived.
 */
type ReviewState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  ref?: string;
  unconfirmed?: boolean;
};

const INITIAL_ENQUIRY: ReviewState = { status: 'idle', message: '' };

/** When a Send has taken long enough that the visitor should be offered a way out. */
const SLOW_SEND_MS = 15000;

/** What is true when the visitor closes an enquiry, which decides what the agent says. */
type CancelKind = 'unsent' | 'refused' | 'unconfirmed';

/* 2s, with a visible "… is thinking" bubble (founder, 2026-10-02). */
const THINK_MS = 2000;
const RESPOND_MS = 900;
const FINISH_MS = 650;

/** How long the ball is shown alone before "Ask …" opens out beside it. */
const LABEL_DELAY_MS = 2500;

/** How close, in px from the ball's centre, counts as "approaching", and
    how far it must go again to count as having left. */
const NEAR_PX = 170;
const LEAVE_PX = 200;

/* Guardrails that hold during discovery too: what they catch is never saved
   as an answer to one of the team's questions. */
const GUARD_RULES = new Set(['abuse', 'injection', 'off-topic']);

const replyTurn = (reply: PixReply): Omit<Turn, 'id'> => ({
  role: 'assistant',
  text: reply.text,
  path: reply.path,
  sourceLabel: reply.sourceLabel,
  offer: reply.offer,
});

function leadSource(): string {
  if (typeof window === 'undefined') return 'assistant';
  return `${window.location.hostname}/assistant`;
}

export function Agent({
  config,
  context,
  knowledge,
  sitePack,
  onIdentify,
  onLead,
  themeOptions,
}: AgentProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const helpers = useMemo(
    () =>
      createEnquiryHelpers({
        ...config.questions,
        company: config.companyQuestion,
      }),
    [config.companyQuestion, config.questions],
  );
  const { DISCOVERY_STEPS, checkAnswer, checkName, checkEmail } = helpers;

  const honeypotField = config.honeypotField || 'website';
  const starters = config.starters;
  const agentName = config.name;
  const agentDescriptor = config.descriptor;
  const contactPath = config.contactPath;
  const questions = config.questions;

  /* Stylesheet defaults are Technologies purple. They paint before this effect
     replaces them, so the launcher stays hidden until the site colours are on
     the root. useLayoutEffect runs before the browser paints that frame. */
  const [themed, setThemed] = useState(false);
  useClientLayoutEffect(() => {
    applyTheme(rootRef.current, config, themeOptions);
    setThemed(true);
  }, [config, themeOptions]);

  const [open, setOpen] = useState(false);
  /* Once opened, the panel is hidden rather than unmounted when closed, so an
     enquiry being sent, and edits in the review form, survive Close and Escape.
     Until then it is not rendered, so the page's first HTML is unchanged. */
  const [opened, setOpened] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([FIRST_TURN]);
  const [draft, setDraft] = useState('');
  /* The two steps before the chat, then null for the rest of it. */
  const [identify, setIdentify] = useState<'name' | 'email' | null>('name');
  const [pendingName, setPendingName] = useState('');
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  /* Whether the visitor has sent anything since the greeting: the first message
     is what starts discovery. */
  const [chatted, setChatted] = useState(false);
  /* One enquiry per conversation. Once it is delivered the offers go. */
  const [leadSent, setLeadSent] = useState(false);
  const [flow, setFlow] = useState<Flow | null>(null);
  /* Remounts the review form for each new enquiry, so its server state starts clean. */
  const [reviewKey, setReviewKey] = useState(0);
  const [phase, setPhase] = useState<PixPhase>('idle');
  const [busy, setBusy] = useState(false);
  const [near, setNear] = useState(false);
  const [labelled, setLabelled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pendingQuestion = useRef<string | null>(null);
  const [details, setDetails] = useState<{ name: string; email: string; problem: string } | null>(null);
  const held = useRef<Omit<Turn, 'id'>[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const thinking = useRef(false);
  const reducedMotion = useRef(false);
  const launchRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const append = useCallback((added: Omit<Turn, 'id'>[]) => {
    if (added.length) setTurns(prev => [...prev, ...added.map(t => ({ ...t, id: nextId.current++ }))]);
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const release = useCallback(() => {
    clearTimers();
    thinking.current = false;
    const out = held.current;
    held.current = [];
    append(out);
    setPhase('responding');
    timers.current.push(
      setTimeout(() => setPhase('finished'), RESPOND_MS),
      setTimeout(() => setPhase('idle'), RESPOND_MS + FINISH_MS),
    );
    const active = document.activeElement;
    const panel = document.getElementById('site-assistant-panel');
    if (!active || active === document.body || panel?.contains(active)) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [append, clearTimers]);

  const say = useCallback(
    (...added: Omit<Turn, 'id'>[]) => {
      const mine = added.filter(t => t.role === 'visitor');
      const theirs = added.filter(t => t.role === 'assistant');
      if (mine.length && held.current.length) release();
      append(mine);
      if (!theirs.length) return;
      if (reducedMotion.current) {
        if (held.current.length) release();
        append(theirs);
        return;
      }
      held.current.push(...theirs);
      if (thinking.current) return;
      clearTimers();
      thinking.current = true;
      setPhase('thinking');
      timers.current.push(setTimeout(release, THINK_MS));
    },
    [append, clearTimers, release],
  );

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = m.matches;
    const onChange = () => {
      reducedMotion.current = m.matches;
      if (m.matches && held.current.length) release();
    };
    m.addEventListener('change', onChange);
    return () => {
      m.removeEventListener('change', onChange);
      clearTimers();
    };
  }, [clearTimers, release]);

  useEffect(() => {
    if (!themed) return;
    const t = setTimeout(() => setLabelled(true), LABEL_DELAY_MS);
    return () => clearTimeout(t);
  }, [themed]);

  useEffect(() => {
    if (open) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let cx = 0;
    let cy = 0;
    const place = () => {
      const r = launchRef.current?.getBoundingClientRect();
      if (r) {
        cx = r.right - r.height / 2;
        cy = r.top + r.height / 2;
      }
    };
    place();
    const onMove = (e: PointerEvent) => {
      const d = Math.hypot(e.clientX - cx, e.clientY - cy);
      setNear(prev => (prev ? d < LEAVE_PX : d < NEAR_PX));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', place);
    };
  }, [open]);

  const focusInput = useCallback(() => setTimeout(() => inputRef.current?.focus(), 0), []);

  const recordIdentity = useCallback(
    (name: string, email: string) => {
      /* Filled honeypot: pretend success, store nothing. */
      if (honeypotRef.current?.value) return;
      void onIdentify({ name, email }).then(
        (result: { ref: string | null }) => {
          if (result.ref) setVisitor(v => (v ? { ...v, ref: result.ref } : v));
        },
        () => undefined,
      );
    },
    [onIdentify],
  );

  const startDiscovery = useCallback(
    (objective = '') => {
      if (!visitor) return;
      const step = objective ? 1 : 0;
      const ask = DISCOVERY_STEPS[step];
      setChatted(true);
      setFlow({
        step,
        draft: { ...EMPTY_DRAFT, name: visitor.name, email: visitor.email, objective },
        reviewing: false,
      });
      say(
        { role: 'assistant', text: DISCOVERY_OPENING },
        { role: 'assistant', text: ask.optional ? `${ask.ask} (optional)` : ask.ask },
      );
      focusInput();
    },
    [DISCOVERY_STEPS, focusInput, say, visitor],
  );

  const cancelEnquiry = useCallback(
    (kind: CancelKind) => {
      setFlow(null);
      say({
        role: 'assistant',
        text:
          kind === 'unsent'
            ? 'Stopped. Those answers were not sent. Ask me anything, or start again with Send an enquiry below.'
            : kind === 'refused'
              ? `Enquiry closed. It did not reach the team. You can email ${context.contactEmail} instead.`
              : `Enquiry closed. It may still have reached the team. If you do not hear back, please email ${context.contactEmail}.`,
      });
      focusInput();
    },
    [context.contactEmail, focusInput, say],
  );

  const identifyStep = useCallback(
    (text: string) => {
      const echo = text ? [{ role: 'visitor' as const, text }] : [];
      if (identify === 'name') {
        const check = checkName(text);
        if (!check.ok) {
          say(...echo, { role: 'assistant', text: check.problem });
          return;
        }
        setPendingName(check.value);
        setIdentify('email');
        say({ role: 'visitor', text: check.value }, { role: 'assistant', text: askEmail(check.value) });
        return;
      }
      const check = checkEmail(text);
      if (!check.ok) {
        say(...echo, { role: 'assistant', text: check.problem });
        return;
      }
      setVisitor({ name: pendingName, email: check.value, ref: null });
      setIdentify(null);
      say({ role: 'visitor', text: check.value }, { role: 'assistant', text: greeting(pendingName) });
      recordIdentity(pendingName, check.value);
    },
    [checkEmail, checkName, identify, pendingName, recordIdentity, say],
  );

  const submitDetails = useCallback(() => {
    if (!details) return;
    const name = checkName(details.name.trim());
    if (!name.ok) return setDetails({ ...details, problem: name.problem });
    const email = checkEmail(details.email.trim());
    if (!email.ok) return setDetails({ ...details, problem: email.problem });
    setVisitor({ name: name.value, email: email.value, ref: null });
    setIdentify(null);
    setDetails(null);
    setTurns([]);
    setExpanded(true);
    recordIdentity(name.value, email.value);
  }, [checkEmail, checkName, details, recordIdentity]);

  const answer = useCallback(
    (raw: string) => {
      if (!flow || flow.reviewing) return;
      const step = DISCOVERY_STEPS[flow.step];
      const text = raw.trim();
      const reask = {
        role: 'assistant' as const,
        text: `Back to my question: ${step.optional ? `${step.ask} (optional)` : step.ask}`,
      };
      if (text) {
        const reply = respond(text, context, knowledge, sitePack);
        const guarded = reply.via === 'rule' && GUARD_RULES.has(reply.ruleId ?? '');
        const answered = looksLikeQuestion(text) && reply.via !== 'no-answer' && reply.via !== 'ask-more';
        if (guarded || (answered && step.field !== 'objective')) {
          say({ role: 'visitor', text }, replyTurn(reply), reask);
          setDraft('');
          return;
        }
        if (answered) {
          const check = checkAnswer(step, text);
          if (check.ok) {
            const ask = DISCOVERY_STEPS[flow.step + 1];
            setFlow({ step: flow.step + 1, draft: { ...flow.draft, [step.field]: check.value }, reviewing: false });
            say(
              { role: 'visitor', text },
              replyTurn(reply),
              { role: 'assistant', text: ask.optional ? `${ask.ask} (optional)` : ask.ask },
            );
            setDraft('');
            return;
          }
        }
      }
      const check = checkAnswer(step, raw);
      if (!check.ok) {
        say(...(text ? [{ role: 'visitor' as const, text }] : []), { role: 'assistant', text: check.problem });
        setDraft('');
        return;
      }
      const nextDraft = { ...flow.draft, [step.field]: check.value };
      const next = flow.step + 1;
      const shown = { role: 'visitor' as const, text: check.value || 'Skip' };
      if (next < DISCOVERY_STEPS.length) {
        const ask = DISCOVERY_STEPS[next];
        setFlow({ step: next, draft: nextDraft, reviewing: false });
        say(shown, { role: 'assistant', text: ask.optional ? `${ask.ask} (optional)` : ask.ask });
      } else {
        setFlow({ step: next, draft: nextDraft, reviewing: true });
        setReviewKey(k => k + 1);
        say(shown, { role: 'assistant', text: 'Thank you. Sending this to the team now.' });
      }
      setDraft('');
    },
    [DISCOVERY_STEPS, checkAnswer, context, flow, knowledge, say, sitePack],
  );

  const send = useCallback(
    (raw: string) => {
      if (thinking.current) return;
      const text = raw.trim();
      if (!expanded) {
        if (!text) return;
        setDraft('');
        if (identify) {
          pendingQuestion.current = text;
          setDetails({ name: '', email: '', problem: '' });
          return;
        }
        setExpanded(true);
      }
      if (identify) {
        identifyStep(text);
        setDraft('');
        focusInput();
        return;
      }
      if (flow && !flow.reviewing) {
        answer(text);
        focusInput();
        return;
      }
      if (!text) return;
      const reply: PixReply = respond(text, context, knowledge, sitePack);
      if (!chatted && !leadSent && !flow) {
        setChatted(true);
        if (looksLikeQuestion(text)) {
          say({ role: 'visitor', text }, replyTurn(reply));
          startDiscovery();
        } else {
          const answered = reply.via !== 'no-answer' && reply.via !== 'ask-more';
          say({ role: 'visitor', text }, answered ? replyTurn(reply) : { role: 'assistant', text: 'Thanks, that helps.' });
          startDiscovery(text.slice(0, ENQUIRY_MAX.objective));
        }
      } else {
        say({ role: 'visitor', text }, replyTurn(reply));
      }
      setDraft('');
      focusInput();
    },
    [
      answer,
      chatted,
      context,
      expanded,
      flow,
      focusInput,
      identify,
      identifyStep,
      knowledge,
      leadSent,
      say,
      sitePack,
      startDiscovery,
    ],
  );

  useEffect(() => {
    if (visitor && phase === 'idle' && !thinking.current && pendingQuestion.current) {
      const q = pendingQuestion.current;
      pendingQuestion.current = null;
      send(q);
    }
  }, [phase, send, visitor]);

  const finishEnquiry = useCallback(
    (message: string) => {
      setFlow(null);
      setLeadSent(true);
      say({ role: 'assistant', text: message });
      focusInput();
    },
    [focusInput, say],
  );

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, flow?.reviewing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, labelled]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const inPanel = document.getElementById('site-assistant-panel')?.contains(document.activeElement);
      setOpen(false);
      if (inPanel) launchRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const asking = flow && !flow.reviewing ? DISCOVERY_STEPS[flow.step] : null;
  const input = !expanded
    ? { label: `Ask ${agentName} a question`, placeholder: 'Hello! How can I help you?', autoComplete: 'off', type: 'text', max: MESSAGE_MAX }
    : identify === 'name'
      ? { label: 'Your name', placeholder: 'Your name', autoComplete: 'name', type: 'text', max: ENQUIRY_MAX.name }
      : identify === 'email'
        ? { label: 'Your work email', placeholder: 'you@company.com', autoComplete: 'email', type: 'email', max: ENQUIRY_MAX.email }
        : asking
          ? {
              label: asking.ask,
              placeholder: 'Type your answer',
              autoComplete: asking.field === 'company' ? 'organization' : 'off',
              type: 'text',
              max: ENQUIRY_MAX[asking.field],
            }
          : { label: `Ask ${agentName} a question`, placeholder: 'Type your message', autoComplete: 'off', type: 'text', max: MESSAGE_MAX };
  const stepping = identify !== null || asking !== null;
  const holding = phase === 'thinking';
  const canOffer = visitor !== null && !flow && !leadSent && !holding;

  return (
    <div className={`asst-root${themed ? ' is-themed' : ''}`} ref={rootRef}>
      <button
        aria-expanded={open}
        aria-controls={opened ? 'site-assistant-panel' : undefined}
        aria-label={open ? `Close ${agentName}` : `Ask ${agentName}, ${agentDescriptor}`}
        className={`asst-launch asst-launch--signal${labelled ? ' is-labelled' : ''}${open ? ' asst-launch--open' : ''}`}
        onClick={() => {
          setOpened(true);
          setOpen(v => !v);
          setNear(false);
        }}
        ref={launchRef}
        type="button"
      >
        <span aria-hidden className="asst-launch__label">
          Ask {agentName}
        </span>
        <Signal near={near && !open} phase={busy ? 'thinking' : phase} />
        {open ? (
          <svg aria-hidden className="asst-launch__x" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : null}
      </button>

      {opened ? (
        <div
          aria-label={`${agentName}, ${agentDescriptor}`}
          className={`asst-panel${expanded ? '' : ' asst-panel--dock'}${details ? ' asst-panel--details' : ''}`}
          hidden={!open}
          id="site-assistant-panel"
          role="dialog"
        >
          {!expanded ? (
            <div className="asst-dock">
              <button aria-label={`Close ${agentName}`} className="asst-dock__close" onClick={() => setOpen(false)} type="button">
                <svg aria-hidden viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              {details ? (
                <form
                  className="asst-details"
                  noValidate
                  onSubmit={e => {
                    e.preventDefault();
                    submitDetails();
                  }}
                >
                  <p className="asst-details__lead">Happy to help. Before I answer, may I take your name and work email?</p>
                  <label htmlFor="asst-details-name">Your name</label>
                  <input
                    autoComplete="name"
                    autoFocus
                    id="asst-details-name"
                    maxLength={ENQUIRY_MAX.name}
                    onChange={e => setDetails({ ...details, name: e.target.value, problem: '' })}
                    value={details.name}
                  />
                  <label htmlFor="asst-details-email">Work email</label>
                  <input
                    autoComplete="email"
                    id="asst-details-email"
                    maxLength={ENQUIRY_MAX.email}
                    onChange={e => setDetails({ ...details, email: e.target.value, problem: '' })}
                    type="email"
                    value={details.email}
                  />
                  {details.problem ? (
                    <p className="asst-details__error" role="alert">
                      {details.problem}
                    </p>
                  ) : null}
                  <button className="asst-send" type="submit">
                    Continue
                  </button>
                  <p className="asst-details__notice">
                    We record your name and email as soon as you give them, so the team can reply even if you leave
                    before finishing. See our{' '}
                    <a href="/privacy" onClick={() => setOpen(false)}>
                      Privacy Notice
                    </a>
                    .
                  </p>
                </form>
              ) : null}
              <div className="asst-dock__questions" hidden={details !== null}>
                {starters.slice(0, 3).map(q => (
                  <button className="asst-dock__q" key={q} onClick={() => send(q)} type="button">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="asst-head" hidden={!expanded}>
            <Signal phase={busy ? 'thinking' : phase} size="sm" />
            <div>
              <p className="asst-title">{agentName}</p>
              <p className="asst-sub">{agentDescriptor}</p>
            </div>
          </div>

          <div aria-busy={holding} aria-live="polite" className="asst-log" hidden={!expanded} ref={logRef}>
            {turns.map(t => (
              <div className={`asst-turn asst-turn--${t.role}`} key={t.id}>
                <p className="asst-bubble">{t.text}</p>
                {t.role === 'assistant' && t.path ? (
                  <p className="asst-source">
                    Relevant:{' '}
                    <a href={t.path} onClick={() => setOpen(false)}>
                      {t.sourceLabel ?? 'Open the page'} &rarr;
                    </a>
                  </p>
                ) : null}
                {t.role === 'assistant' && t.offer === 'enquiry' && canOffer ? (
                  <button className="asst-offer" onClick={() => startDiscovery()} type="button">
                    Send an enquiry here
                  </button>
                ) : null}
              </div>
            ))}

            {holding ? (
              <div aria-hidden className="asst-turn asst-turn--assistant">
                <p className="asst-bubble asst-typing">
                  <span className="asst-typing__label">{agentName} is thinking</span>
                  <i />
                  <i />
                  <i />
                </p>
              </div>
            ) : null}

            {flow?.reviewing && visitor && !holding ? (
              <EnquiryReview
                autoSubmit={!config.consent}
                consent={config.consent}
                contactEmail={context.contactEmail}
                onBusy={setBusy}
                draft={flow.draft}
                honeypotField={honeypotField}
                key={reviewKey}
                onCancel={cancelEnquiry}
                onDelivered={finishEnquiry}
                onLead={onLead}
                questions={questions}
              />
            ) : null}
          </div>

          {expanded && visitor && !chatted && !flow && !holding ? (
            <div className="asst-starters">
              {starters.map(s => (
                <button className="asst-chip" key={s} onClick={() => send(s)} type="button">
                  {s}
                </button>
              ))}
            </div>
          ) : null}

          {asking && !holding ? (
            <div className="asst-flowbar">
              <span>
                Question {flow!.step + 1} of {DISCOVERY_STEPS.length}
              </span>
              <span>
                {asking.optional ? (
                  <button onClick={() => answer('')} type="button">
                    Skip
                  </button>
                ) : null}{' '}
                <button onClick={() => cancelEnquiry('unsent')} type="button">
                  Stop
                </button>
              </span>
            </div>
          ) : null}

          {flow?.reviewing || details ? null : (
            <form
              className="asst-form"
              noValidate
              onSubmit={e => {
                e.preventDefault();
                send(draft);
              }}
            >
              <label className="visually-hidden-heading" htmlFor="asst-input">
                {input.label}
              </label>
              <input
                autoComplete={input.autoComplete}
                className="asst-input"
                id="asst-input"
                maxLength={input.max}
                onChange={e => setDraft(e.target.value)}
                placeholder={holding ? `${agentName} is thinking…` : input.placeholder}
                readOnly={holding}
                ref={inputRef}
                type={input.type}
                value={draft}
              />
              {expanded ? (
                <button className="asst-send" disabled={holding || (!stepping && !draft.trim())} type="submit">
                  {stepping ? 'Next' : 'Ask'}
                </button>
              ) : (
                <button aria-label="Send" className="asst-send asst-send--icon" disabled={!draft.trim()} type="submit">
                  <svg aria-hidden viewBox="0 0 24 24">
                    <path d="M4 12l16-8-6 16-2.5-6.5L4 12z" />
                  </svg>
                </button>
              )}
            </form>
          )}

          <div aria-hidden className="honeypot">
            <label>
              Website
              <input autoComplete="off" name={honeypotField} ref={honeypotRef} tabIndex={-1} type="text" />
            </label>
          </div>

          <p className="asst-foot" hidden={!expanded}>
            {identify ? (
              <>
                We record your name and email as soon as you give them, so the team can reply even if you leave before
                finishing. See our{' '}
                <a href="/privacy" onClick={() => setOpen(false)}>
                  Privacy Notice
                </a>{' '}
                for more information.{' '}
              </>
            ) : (
              <>
                Your name, email and answers to {agentName}&rsquo;s questions go to the team. The rest of this chat is
                not stored.{' '}
              </>
            )}
            {canOffer ? (
              <>
                <button className="asst-linkbtn" onClick={() => startDiscovery()} type="button">
                  Send an enquiry
                </button>
                {' · '}
              </>
            ) : null}
            <a href={contactPath} onClick={() => setOpen(false)}>
              Contact page
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}

/**
 * The enquiry, as it is sent - and, if sending fails, as it can be corrected
 * and sent again.
 */
function EnquiryReview({
  autoSubmit = false,
  consent,
  contactEmail,
  draft,
  honeypotField,
  onBusy,
  onDelivered,
  onCancel,
  onLead,
  questions,
}: {
  autoSubmit?: boolean;
  consent?: AgentConfig['consent'];
  contactEmail: string;
  draft: EnquiryDraft;
  honeypotField: string;
  onBusy?: (busy: boolean) => void;
  onDelivered: (message: string) => void;
  onCancel: (kind: CancelKind) => void;
  onLead: (input: LeadPayload) => Promise<LeadResult>;
  questions: AgentConfig['questions'];
}) {
  const [state, setState] = useState<ReviewState>(INITIAL_ENQUIRY);
  const [pending, setPending] = useState(false);
  const [slow, setSlow] = useState(false);
  const [consented, setConsented] = useState(false);
  const inFlight = useRef(false);
  const reported = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const autoSent = useRef(false);
  const honeypotReviewRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoSubmit || autoSent.current) return;
    if (consent) return;
    autoSent.current = true;
    formRef.current?.requestSubmit();
  }, [autoSubmit, consent]);

  useEffect(() => {
    if (state.status !== 'success' || reported.current) return;
    reported.current = true;
    onDelivered(state.message);
  }, [state, onDelivered]);

  useEffect(() => {
    onBusy?.(pending);
  }, [onBusy, pending]);
  useEffect(() => () => onBusy?.(false), [onBusy]);

  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setSlow(true), SLOW_SEND_MS);
    return () => clearTimeout(timer);
  }, [pending]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    if (consent && !consented) return;
    /* Filled honeypot: pretend success, store nothing. */
    if (honeypotReviewRef.current?.value) {
      setState({
        status: 'success',
        message: 'Thank you. Your enquiry has been sent to the team.',
      });
      return;
    }
    inFlight.current = true;
    const data = new FormData(event.currentTarget);
    const eventId = crypto.randomUUID();
    const payload: LeadPayload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      company: String(data.get('company') ?? ''),
      objective: String(data.get('objective') ?? ''),
      existing: String(data.get('existing') ?? ''),
      deadline: String(data.get('deadline') ?? ''),
      success: String(data.get('success') ?? ''),
      source: leadSource(),
      eventId,
    };
    setPending(true);
    let next: ReviewState;
    try {
      const result = await onLead(payload);
      next = result;
    } catch {
      next = { status: 'error', message: '', unconfirmed: true };
    }
    inFlight.current = false;
    setPending(false);
    setSlow(false);
    setState(next);
  };

  const unconfirmedMessage =
    `We could not confirm that your enquiry was sent: the connection may have dropped. It may still have reached us. ` +
    `Please email ${contactEmail} so it is not lost; your answers are still here to copy.`;
  const message = state.unconfirmed ? unconfirmedMessage : state.message;
  const cancelKind: CancelKind =
    pending || state.unconfirmed ? 'unconfirmed' : state.status === 'error' ? 'refused' : 'unsent';

  const field = (
    name: keyof EnquiryDraft,
    label: string,
    options: { rows?: number; type?: 'email'; optional?: boolean; autoComplete?: string } = {},
  ) => {
    const id = `asst-review-${name}`;
    const common = {
      autoComplete: options.autoComplete ?? 'off',
      defaultValue: draft[name],
      id,
      maxLength: ENQUIRY_MAX[name],
      name: name as string,
    };
    return (
      <label htmlFor={id}>
        {options.optional ? `${label} (optional)` : label}
        {options.rows ? <textarea rows={options.rows} {...common} /> : <input type={options.type ?? 'text'} {...common} />}
      </label>
    );
  };

  const sendBlocked = pending || (Boolean(consent) && !consented);

  return (
    <form className="asst-review" noValidate onSubmit={submit} ref={formRef}>
      {field('objective', questions.objective, { rows: 3 })}
      {field('existing', questions.existing, { rows: 2, optional: true })}
      {field('deadline', questions.deadline, { optional: true })}
      {field('success', questions.success, { rows: 2, optional: true })}
      {field('name', 'Name', { autoComplete: 'name' })}
      {field('email', 'Work email', { type: 'email', autoComplete: 'email' })}
      {field('company', 'Company', { optional: true, autoComplete: 'organization' })}

      <div aria-hidden className="honeypot">
        <label>
          Website
          <input autoComplete="off" name={honeypotField} ref={honeypotReviewRef} tabIndex={-1} type="text" />
        </label>
      </div>

      {consent ? (
        <label className="asst-consent" htmlFor="asst-consent">
          <input
            checked={consented}
            id="asst-consent"
            onChange={e => setConsented(e.target.checked)}
            type="checkbox"
          />{' '}
          {consent.label}
        </label>
      ) : null}

      {!pending && state.status === 'error' && message ? (
        <p className="asst-review-error" role="status">
          {message}
        </p>
      ) : null}
      {slow ? (
        <p className="asst-review-error" role="status">
          This is taking longer than it should. It may still arrive. If you would rather not wait, close it and
          email {contactEmail}.
        </p>
      ) : null}
      <div className="asst-review-actions">
        <button className="asst-send" disabled={sendBlocked} type="submit">
          {pending ? 'Sending…' : 'Send'}
        </button>
        <button
          className="asst-linkbtn"
          disabled={pending && !slow}
          onClick={() => onCancel(cancelKind)}
          type="button"
        >
          Cancel
        </button>
      </div>
      <p className="asst-notice">
        We use the information you provide to respond to your enquiry. See our <a href="/privacy">Privacy Notice</a>{' '}
        for more information.
      </p>
    </form>
  );
}
