/**
 * Guardrail types used by SitePack. Site-specific rule lists, claim guards,
 * publishable facts and topic routes live in each website's pack (or a test
 * fixture), not in shared core.
 */
export type { ClaimGuard, PublishableFact, Rule, TopicRoute } from './types';

/**
 * Timeline phrasing as people ask it. Packs that keep a timeline refusal can
 * reuse this test; Technologies' pack does.
 */
export const TIMELINE_ASK =
  /\b(how long|timeline|timescale|time ?frame|deadline|how (fast|quickly|soon)|when (can|could|will|would) you|delivery date|turnaround|lead time|in (\d+|a|one|two|three|four|five|six|a few|several) (days?|weeks?|months?)|\d+ (days?|weeks?|months?)|how many (days|weeks|months)|(ready|finished|live|delivered|launched|completed) (by|in|before)|when (would|will|could|can|might) (it|this|that|the (project|app|site|system|build|product)) (be )?(ready|done|finished|live|delivered|built|start|launch|go live)|start (on |this |next )?(monday|tuesday|wednesday|thursday|friday|tomorrow|next week|next month|immediately|straight away|right away)|go live|launch date|by (next|the end of|end of) (week|month|quarter|year)|asap)\b/i;
