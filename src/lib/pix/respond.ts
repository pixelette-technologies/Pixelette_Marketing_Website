import type { PixContext } from './context';
import { getRetriever, MIN_COVERAGE, type Match } from './retrieve';
import type { KnowledgeFile, Rule, SitePack, TopicRoute } from './types';

/**
 * Turns one visitor message into one reply. Pure, synchronous, offline.
 *
 * THE ORDER OF THE STAGES IS THE DESIGN:
 *   1. nothing to go on          - ask
 *   2. rules                     - refusals and redirects, which pre-empt everything
 *   3. claim guards              - only where the register says a claim is NOT published
 *   4. publishable facts         - the handful the register does allow
 *   5. retrieval above the floor - the site's own words, with the page it came from
 *   6. topic routes              - the right page's own description, when 5 found nothing
 *   7. too little to go on       - ask, rather than guess at one word
 *   8. an honest "I don't know"  - and a route to a person
 */

export type PixReply = {
  text: string;
  /** A page worth offering alongside the answer. */
  path?: string;
  /** Where the answer came from, shown to the visitor so nothing looks conjured. */
  sourceLabel?: string;
  /** Which stage produced this, for tests and for the transparency note. */
  via:
    | 'ask-more'
    | 'rule'
    | 'claim-guard'
    | 'fact'
    | 'kb'
    | 'pointer'
    | 'route'
    | 'no-answer';
  /** The rule, claim or route id, where one fired. */
  ruleId?: string;
  /** Offer to take the enquiry in the chat, alongside the link. */
  offer?: 'enquiry';
};

/**
 * A readable name for a page the assistant offers.
 * Rules and facts carry a destination but no title.
 */
export function labelForPath(p: string): string {
  if (p.endsWith('security.txt')) return 'security.txt';
  const last = p.split('/').filter(Boolean).pop();
  if (!last) return 'the homepage';
  return last.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/*
 * THE OTHER HALF OF THE TIMELINE GUARD. The rule catches timing questions as
 * they are usually asked; this catches the reply. If the visitor asked WHEN and
 * the passage about to be offered contains a duration, the passage is not
 * offered.
 */
const TIMING_ASKED =
  /\b(when|how (long|soon|quickly|fast)|deadline|ready|timeline|time ?frame|turnaround|go live|asap|urgent(ly)?|in (\d+|a|one|two|three|four|five|six|a few|several) (days?|weeks?|months?))\b/i;
const DURATION =
  /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|a few|several)[- ](days?|weeks?|months?|quarters?|years?)\b/i;

/** A retrieval hit that belongs to the page a topic route named. */
function onRoute(hit: Match, route: TopicRoute): boolean {
  if (hit.doc.path !== route.path || hit.titleHits < 1 || hit.coverage < MIN_COVERAGE) return false;
  if (route.faq) return hit.doc.kind === 'faq' && hit.doc.title === route.faq;
  return hit.doc.kind === 'faq' || hit.doc.kind === 'page';
}

export function respond(
  messageRaw: string,
  ctx: PixContext,
  kb: KnowledgeFile,
  pack: SitePack,
): PixReply {
  const message = String(messageRaw || '')
    .replace(/<[^>]*>/g, ' ')
    .slice(0, 2000)
    .trim();

  if (!message) {
    return { via: 'ask-more', text: pack.emptyPrompt };
  }

  const { search, pageDoc, faqDoc, hasEnoughSignal } = getRetriever(kb);
  const contactPath = pack.contactPath;
  const contactLabel = labelForPath(contactPath);

  const ruleSet = pack.rules(ctx);
  const asReply = (rule: Rule): PixReply => ({
    via: 'rule',
    ruleId: rule.id,
    text: rule.reply,
    path: rule.path,
    sourceLabel: rule.path ? labelForPath(rule.path) : undefined,
    offer: rule.offer,
  });
  const timelineSafe = (reply: PixReply): PixReply => {
    if (!TIMING_ASKED.test(message) || !DURATION.test(reply.text)) return reply;
    const timeline = ruleSet.find(r => r.id === 'timeline');
    return timeline ? asReply(timeline) : reply;
  };

  // ---------------------------------------------------------------- 2. rules
  for (const rule of ruleSet) {
    if (rule.test.test(message)) return asReply(rule);
  }

  // -------------------------------------------------------- 3. claim guards
  for (const guard of pack.claimGuards) {
    if (!ctx.publishable.includes(guard.id) && guard.test.test(message)) {
      return {
        via: 'claim-guard',
        ruleId: guard.id,
        text: guard.whenHeld,
        path: contactPath,
        sourceLabel: contactLabel,
      };
    }
  }

  // ------------------------------------------------------ 4. published facts
  for (const fact of pack.publishableFacts(ctx)) {
    if (fact.test.test(message)) {
      return {
        via: 'fact',
        text: fact.reply,
        path: fact.path,
        sourceLabel: fact.path ? labelForPath(fact.path) : undefined,
      };
    }
  }

  const enoughSignal = hasEnoughSignal(message);

  // ------------------------------------------------------------ 5. retrieval
  if (enoughSignal) {
    const hits = search(message, 8);
    const ranked = hits[0];
    const matchedRoute = pack.topicRoutes.find(r => r.test.test(message));
    const sectionYields = ranked?.doc.kind === 'section' && !!matchedRoute;
    /*
     * BM25 lets a short FAQ win on one rare shared word ("service") and clear
     * the coverage floor, so the page a topic route already named never runs.
     * When that page has a hit that covers the question at least as well, quote
     * the hit on the route's path.
     */
    const routed =
      matchedRoute && ranked && ranked.doc.path !== matchedRoute.path
        ? hits.find(hit => onRoute(hit, matchedRoute) && hit.coverage >= ranked.coverage)
        : undefined;
    const best = routed ?? ranked;
    if (best && !sectionYields && best.coverage >= MIN_COVERAGE && best.titleHits > 0) {
      if (best.doc.kind === 'pointer') {
        return {
          via: 'pointer',
          text: `That one is answered on the ${best.doc.page ?? 'relevant'} page rather than in a single line I can quote back to you, so it is worth reading there.`,
          path: best.doc.path ?? undefined,
          sourceLabel: best.doc.page ?? undefined,
        };
      }
      if (best.doc.text) {
        return timelineSafe({
          via: 'kb',
          text: best.doc.text,
          path: best.doc.path ?? undefined,
          sourceLabel:
            best.doc.kind === 'faq' || best.doc.kind === 'section'
              ? best.doc.page
              : best.doc.title,
        });
      }
    }
  }

  // --------------------------------------------------------- 6. topic routes
  for (const route of pack.topicRoutes) {
    if (!route.test.test(message)) continue;
    const doc = route.faq ? faqDoc(route.path, route.faq) : pageDoc(route.path);
    if (doc?.text) {
      return timelineSafe({
        via: 'route',
        ruleId: route.id,
        text: doc.text,
        path: route.path,
        sourceLabel: route.faq ? doc.page : doc.title.replace(/\s*\|.*$/, ''),
      });
    }
  }

  // ------------------------------------------------------- 7. too little to go on
  if (!enoughSignal) {
    return {
      via: 'ask-more',
      text: pack.askMore,
    };
  }

  // ------------------------------------------------------------ 8. no answer
  return {
    via: 'no-answer',
    text: pack.noAnswer(ctx.contactEmail),
    path: contactPath,
    sourceLabel: contactLabel,
    offer: 'enquiry',
  };
}
