import type { KbDoc, KnowledgeFile } from './types';

/**
 * Local retrieval over a site's own published text. No model, no network.
 *
 * THE THRESHOLD IS THE SAFETY MECHANISM. Coverage — how much of the visitor's
 * own question is present in the matched passage, each word weighted by how
 * rare it is — decides whether anything is good enough to say. BM25 picks the
 * order; coverage decides whether to answer.
 */

export type { KbDoc };

/*
 * Words carrying no topical signal. Deliberately short: an over-eager stop list
 * strips the meaning out of a short question, and most visitor questions here
 * are short. "How much does it cost" must keep "cost".
 */
const STOP = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'than', 'that', 'this',
  'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am',
  'do', 'does', 'did', 'doing', 'have', 'has', 'had', 'having', 'i', 'you',
  'we', 'they', 'it', 'he', 'she', 'my', 'your', 'our', 'their', 'its',
  'of', 'in', 'on', 'at', 'to', 'for', 'with', 'from', 'by', 'as', 'about',
  'into', 'over', 'can', 'could', 'would', 'should', 'will', 'shall', 'may',
  'might', 'must', 'me', 'us', 'them', 'so', 'what', 'which', 'who', 'whom',
  'how', 'when', 'where', 'why', 'whose',
  'there', 'here', 'any', 'some', 'all', 'no', 'not', 'please', 'tell',
  'hello', 'hi', 'hey', 'help', 'thanks', 'thank', 'ok', 'okay', 'yes', 'yeah',
  'sure', 'greetings', 'stuff', 'things',
  'actually', 'really', 'just', 'basically', 'simply', 'exactly', 'quite',
  'very', 'also', 'even', 'still', 'well', 'like', 'want', 'need', 'looking',
  'see', 'show', 'offer', 'offers', 'provide', 'provides', 'know', 'find',
  'get', 'give', 'let', 'able', 'currently', 'after', 'before', 'during',
  'within', 'across', 'more', 'other', 'such', 'only', 'own', 'same', 'too',
]);

/**
 * Crude suffix stripping, applied identically to queries and documents.
 */
function stem(word: string): string {
  let w = word.replace(/iz/g, 'is');

  if (w.length > 4 && w.endsWith('ies')) w = `${w.slice(0, -3)}y`;
  else if (w.length > 4 && /(ses|xes|zes|ches|shes)$/.test(w)) w = w.slice(0, -2);
  else if (w.length > 3 && w.endsWith('s') && !/(ss|us|is)$/.test(w)) w = w.slice(0, -1);

  if (w.length > 8 && w.endsWith('isation')) return `${w.slice(0, -6)}s`;
  if (w.length > 5 && w.endsWith('ise')) return w.slice(0, -1);
  if (w.length > 6 && w.endsWith('ation')) return `${w.slice(0, -5)}at`;
  if (w.length > 4 && w.endsWith('ate')) return w.slice(0, -1);
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  return w;
}

export function tokenise(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter(w => w.length > 1 && !STOP.has(w))
    .map(stem);
}

type Indexed = { doc: KbDoc; titleTokens: string[]; bodyTokens: string[]; len: number };

export type Match = {
  doc: KbDoc;
  score: number;
  /** IDF-weighted share of the query's meaning found in this document, 0..1. */
  coverage: number;
  /** How many of the query's distinct words appear in the document's TITLE. */
  titleHits: number;
};

/** The confidence floor. Below this the assistant says it does not know. */
export const MIN_COVERAGE = 0.7;

const K1 = 1.2;
const B = 0.6;
const TITLE_WEIGHT = 3;
const POINTER_PENALTY = 0.8;
const SECTION_PENALTY = 0.7;
const SINGLE_TOKEN_MAX_DF = 0.1;

export type Retriever = {
  search: (query: string, limit?: number) => Match[];
  pageDoc: (pagePath: string) => KbDoc | undefined;
  faqDoc: (pagePath: string, title: string) => KbDoc | undefined;
  hasEnoughSignal: (query: string) => boolean;
  isDistinctive: (token: string) => boolean;
  tokenise: (s: string) => string[];
  MIN_COVERAGE: number;
  kbCounts: KnowledgeFile['counts'];
};

/**
 * Build a retriever over one knowledge file. Call once per site load and reuse.
 */
export function createRetriever(kb: KnowledgeFile): Retriever {
  const DOCS = kb.docs as KbDoc[];

  const INDEX: Indexed[] = DOCS.map(doc => {
    const titleTokens = tokenise(doc.title);
    const bodyTokens = tokenise(doc.text ?? '');
    return { doc, titleTokens, bodyTokens, len: titleTokens.length + bodyTokens.length };
  });

  const BASE = INDEX.filter(d => d.doc.kind !== 'section');
  const AVG_LEN = BASE.reduce((n, d) => n + d.len, 0) / Math.max(1, BASE.length);

  const DF = new Map<string, number>();
  for (const d of BASE) {
    for (const t of new Set([...d.titleTokens, ...d.bodyTokens])) {
      DF.set(t, (DF.get(t) ?? 0) + 1);
    }
  }

  const idf = (t: string) => {
    const df = DF.get(t) ?? 0;
    return Math.log(1 + (BASE.length - df + 0.5) / (df + 0.5));
  };

  function search(query: string, limit = 3): Match[] {
    const qTokens = tokenise(query);
    if (!qTokens.length) return [];
    const unique = [...new Set(qTokens)];
    const qSet = new Set(unique);
    const totalIdf = unique.reduce((n, t) => n + idf(t), 0) || 1;

    const scored = INDEX.map(d => {
      const counts = new Map<string, number>();
      for (const t of d.titleTokens) counts.set(t, (counts.get(t) ?? 0) + TITLE_WEIGHT);
      for (const t of d.bodyTokens) counts.set(t, (counts.get(t) ?? 0) + 1);

      let score = 0;
      let matchedIdf = 0;
      for (const t of unique) {
        const f = counts.get(t) ?? 0;
        if (!f) continue;
        matchedIdf += idf(t);
        const norm = 1 - B + (B * d.len) / (AVG_LEN || 1);
        score += idf(t) * ((f * (K1 + 1)) / (f + K1 * norm));
      }

      const titleSet = new Set(d.titleTokens);
      let titleHit = 0;
      for (const t of titleSet) if (qSet.has(t)) titleHit += 1;
      const containment = titleSet.size ? titleHit / titleSet.size : 0;
      if (containment >= 0.75) score *= 1 + containment;

      if (d.doc.kind === 'pointer') score *= POINTER_PENALTY;
      if (d.doc.kind === 'section') score *= SECTION_PENALTY;

      return { doc: d.doc, score, coverage: matchedIdf / totalIdf, titleHits: titleHit };
    });

    return scored
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
      .slice(0, limit);
  }

  function isDistinctive(token: string): boolean {
    const df = DF.get(token) ?? 0;
    return df > 0 && df <= BASE.length * SINGLE_TOKEN_MAX_DF;
  }

  function hasEnoughSignal(query: string): boolean {
    const tokens = [...new Set(tokenise(query))];
    if (!tokens.length) return false;
    if (tokens.length >= 2) return true;
    return isDistinctive(tokens[0]);
  }

  function pageDoc(pagePath: string): KbDoc | undefined {
    return DOCS.find(d => d.kind === 'page' && d.path === pagePath && !!d.text);
  }

  function faqDoc(pagePath: string, title: string): KbDoc | undefined {
    return DOCS.find(d => d.kind === 'faq' && d.path === pagePath && d.title === title && !!d.text);
  }

  return {
    search,
    pageDoc,
    faqDoc,
    hasEnoughSignal,
    isDistinctive,
    tokenise,
    MIN_COVERAGE,
    kbCounts: kb.counts,
  };
}

/** Cache retrievers by knowledge-file object identity so respond stays cheap. */
const retrieverCache = new WeakMap<KnowledgeFile, Retriever>();

export function getRetriever(kb: KnowledgeFile): Retriever {
  let r = retrieverCache.get(kb);
  if (!r) {
    r = createRetriever(kb);
    retrieverCache.set(kb, r);
  }
  return r;
}
