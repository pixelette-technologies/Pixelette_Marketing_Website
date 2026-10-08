import type { AgentConfig } from '@/lib/pix';

/** Layout knobs each site sets in its own config (Technologies: 20px / z 60). */
export type ThemeOptions = {
  zIndex?: number;
  bottom?: string;
  right?: string;
};

const DEFAULT_MUTED = '#6b6570';
const DEFAULT_Z = 60;
const DEFAULT_BOTTOM = '20px';
const DEFAULT_RIGHT = '20px';

type Rgb = { r: number; g: number; b: number };

function parseHex(hex: string): Rgb | null {
  const raw = hex.trim().replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return null;
  return {
    r: Number.parseInt(raw.slice(0, 2), 16),
    g: Number.parseInt(raw.slice(2, 4), 16),
    b: Number.parseInt(raw.slice(4, 6), 16),
  };
}

function toHex({ r, g, b }: Rgb): string {
  const h = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

const WHITE: Rgb = { r: 255, g: 255, b: 255 };
const BLACK: Rgb = { r: 0, g: 0, b: 0 };

/**
 * Apply each site's AgentConfig colors/fonts and ThemeOptions onto the widget
 * root. Hardcoded purple in CSS is only a Technologies-shaped fallback until
 * applyTheme runs.
 */
export function applyTheme(
  el: HTMLElement | null,
  config: Pick<AgentConfig, 'colors' | 'fonts'>,
  options: ThemeOptions = {},
): void {
  if (!el) return;
  const { accent, panel, text, muted, hover, tint, dark, lift, rim } = config.colors;
  const rgb = parseHex(accent);

  const brandHover = hover ?? (rgb ? toHex(mix(rgb, BLACK, 0.18)) : accent);
  const brandTint = tint ?? (rgb ? toHex(mix(rgb, WHITE, 0.88)) : '#eadcf2');
  const brandDark = dark ?? (rgb ? toHex(mix(rgb, BLACK, 0.55)) : '#27033b');
  const sigLift = lift ?? (rgb ? toHex(mix(rgb, WHITE, 0.28)) : '#8a4ab0');
  const sigRim = rim ?? (rgb ? toHex(mix(rgb, BLACK, 0.22)) : '#55137a');
  const accentRgb = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '102, 26, 143';

  el.style.setProperty('--agent-accent', accent);
  el.style.setProperty('--agent-panel', panel);
  el.style.setProperty('--agent-text', text);
  el.style.setProperty('--agent-muted', muted ?? DEFAULT_MUTED);
  el.style.setProperty('--agent-z', String(options.zIndex ?? DEFAULT_Z));
  el.style.setProperty('--agent-bottom', options.bottom ?? DEFAULT_BOTTOM);
  el.style.setProperty('--agent-right', options.right ?? DEFAULT_RIGHT);
  el.style.setProperty('--agent-accent-rgb', accentRgb);

  el.style.setProperty('--brand', accent);
  el.style.setProperty('--brand-hover', brandHover);
  el.style.setProperty('--brand-tint', brandTint);
  el.style.setProperty('--paper', panel);
  el.style.setProperty('--ink', text);
  el.style.setProperty('--muted', muted ?? DEFAULT_MUTED);
  el.style.setProperty('--dark', brandDark);
  el.style.setProperty('--sig-lift', sigLift);
  el.style.setProperty('--sig-rim', sigRim);

  if (config.fonts?.sans) el.style.setProperty('--sans', config.fonts.sans);
  if (config.fonts?.serif) el.style.setProperty('--serif', config.fonts.serif);
  if (config.fonts?.mono) el.style.setProperty('--mono', config.fonts.mono);
}
