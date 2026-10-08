import type { ThemeOptions } from '@/components/pix/theme';
import type { AgentConfig } from '@/lib/pix';

/**
 * Visitor-facing agent config for Pixelette Marketing.
 *
 * Colours, fonts and layout come from this file (site tokens in
 * `src/scss/globels/_tokens.scss`), not from the package's Technologies
 * purple defaults. Name "Pix M" is a placeholder until the company chooses.
 */
export const marketingAgentConfig: AgentConfig = {
  id: 'marketing',
  name: 'Pix M',
  descriptor: 'AI Assistant',
  contactPath: '/contactus',
  colors: {
    // Brand layer from _tokens.scss
    accent: '#b3063c', // --color-brand
    hover: '#8c0430', // --color-brand-hover
    tint: '#f9ebf0', // --color-brand-tint
    dark: '#2b0612', // --color-footer-bg (deep brand ground)
    lift: '#d44a6e', // lighter stop for the signal sphere
    rim: '#8c0430', // darker rim — same as hover
    panel: '#ffffff', // --color-page
    text: '#0a0a0a', // --color-ink
    muted: '#7d5d67', // --color-muted
  },
  fonts: {
    // Same roles as the Marketing site (Newsreader / Outfit / Plex Mono)
    sans: 'var(--font-body)',
    serif: 'var(--font-display)',
    mono: 'var(--font-mono)',
  },
  starters: [
    'How do you help with demand generation?',
    'What does pipeline and conversion work cover?',
    'What marketing services do you offer?',
    'How do you approach growth strategy?',
  ],
  questions: {
    objective: 'What are you trying to grow or improve?',
    existing: 'What does demand, pipeline or conversion look like today?',
    deadline: 'Is there a deadline?',
    success: 'What would a successful result look like for growth?',
  },
  companyQuestion: 'Which company are you enquiring on behalf of?',
  honeypotField: '_website',
  consent: {
    label:
      process.env.NEXT_PUBLIC_CONTACT_CONSENT_TEXT?.trim() ||
      'I agree that Pixelette Marketing may use my name, email and enquiry details to respond to this request.',
    noticeVersion:
      process.env.NEXT_PUBLIC_CONTACT_PRIVACY_NOTICE_VERSION?.trim() || '1.0',
  },
};

/**
 * Layout: same 20px inset as pixelettetech.com. z-index sits above
 * CookieConsent (9999) so the launcher is not trapped under the banner.
 */
export const marketingThemeOptions: ThemeOptions = {
  zIndex: 10000,
  bottom: '20px',
  right: '20px',
};

export default marketingAgentConfig;
