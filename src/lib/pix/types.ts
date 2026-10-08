import type { PixContext } from './context';

/** One indexed document from a site knowledge file. */
export type KbDoc = {
  kind: 'page' | 'faq' | 'pointer' | 'section';
  title: string;
  /** Null on a pointer: the question is known, the answer text is not. */
  text: string | null;
  path: string | null;
  page?: string;
};

/** The knowledge file shape written by the knowledge CLI. */
export type KnowledgeFile = {
  builtFrom: string;
  counts: { pages: number; faqs: number; pointers: number; sections: number };
  docs: KbDoc[];
};

/** Per-site visitor-facing config for the widget. */
export type AgentConfig = {
  id: 'technologies' | 'marketing' | 'certified' | 'holdings';
  /** Visitor-facing name. Technologies: "Pix T". */
  name: string;
  /** Technologies: "AI assistant". */
  descriptor: string;
  contactPath: string;
  colors: {
    /** Primary brand — launcher sphere, send button, focus rings. */
    accent: string;
    panel: string;
    text: string;
    muted?: string;
    /** Darker accent for hover. Derived from accent when omitted. */
    hover?: string;
    /** Soft wash behind labelled launcher / chips. Derived when omitted. */
    tint?: string;
    /** Deep tone for signal flash pixels. Derived when omitted. */
    dark?: string;
    /** Sphere highlight stop. Derived when omitted. */
    lift?: string;
    /** Sphere rim stop. Derived when omitted. */
    rim?: string;
  };
  /** Type faces for the widget. Prefer host next/font CSS variables. */
  fonts?: {
    sans?: string;
    serif?: string;
    mono?: string;
  };
  starters: readonly string[];
  questions: {
    objective: string;
    existing: string;
    deadline: string;
    success: string;
  };
  companyQuestion: string;
  /** Optional consent affirmation for sites that require it (Marketing). */
  consent?: { label: string; noticeVersion: string };
  /** Honeypot field name. Technologies: `website`; Marketing: `_website`. */
  honeypotField?: string;
};

export type Rule = {
  id: string;
  /** What the visitor said that triggers this. */
  test: RegExp;
  reply: string;
  /** Offered as a follow-up link where one genuinely helps. */
  path?: string;
  /** Offer to take the enquiry in the chat, alongside the link. */
  offer?: 'enquiry';
};

export type ClaimGuard = {
  id: string;
  test: RegExp;
  whenHeld: string;
};

export type PublishableFact = {
  test: RegExp;
  reply: string;
  path?: string;
};

export type TopicRoute = {
  id: string;
  test: RegExp;
  path: string;
  faq?: string;
};

/**
 * Site-specific guardrails and copy the brain needs.
 * Core owns stage order and retrieval behaviour; the pack supplies the words.
 */
export type SitePack = {
  contactPath: string;
  emptyPrompt: string;
  askMore: string;
  noAnswer: (email: string) => string;
  rules: (ctx: PixContext) => Rule[];
  claimGuards: readonly ClaimGuard[];
  publishableFacts: (ctx: PixContext) => PublishableFact[];
  topicRoutes: readonly TopicRoute[];
  /** Suggested openers; each must be answerable from this site's knowledge. */
  starters?: readonly string[];
};

/** Fields collected by the enquiry flow. */
export type LeadPayload = {
  name: string;
  email: string;
  company: string;
  objective: string;
  existing: string;
  deadline: string;
  success: string;
  source: string;
  /** UUID the website creates once for that submit; used for idempotent delivery. */
  eventId: string;
};

export type LeadResult =
  | { status: 'success'; message: string; ref?: string }
  | { status: 'error'; message: string };
