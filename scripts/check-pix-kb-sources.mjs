/**
 * Fails if archive or legacy material has reached the assistant's knowledge base.
 *
 * WHY THIS EXISTS. Old-website content is a HARD architectural exclusion: nothing
 * from a previous site may be ingested, indexed or made available for grounding.
 * Today that often holds for a structural reason rather than a declared one -
 * build.mjs walks static `page.tsx` routes, and migrated articles reach the site
 * through a dynamic route the builder does not index.
 *
 * A PROPERTY THAT HOLDS BY ACCIDENT OF STRUCTURE IS THE ONE THAT BREAKS
 * SILENTLY. Give an archive article a static route, or teach the builder to
 * read content files, and the previous site's marketing copy enters the
 * corpus with nothing to say so. The counts would still look healthy: the KB
 * would simply have more documents in it.
 *
 * SO THIS CHECKS CONTENT, NOT PATHS. A path check would pass a file that had
 * archive prose pasted into a current page, which is the interesting failure
 * rather than the obvious one. Distinctive sentences are taken from every
 * archive article and looked for in the KB's own text.
 *
 *     pix-agent check-sources --file src/content/pix-kb.json --archive src/content/archive
 *     pix-agent check-sources --file ... --archive ... --allowlist ./my-allowlist.mjs
 *
 * WHAT IS DELIBERATELY ALLOWED. The /insights/archive INDEX page may appear.
 * The brief permits the agent to say an archive exists, navigate to it, and
 * describe it as historical - and that page's own description does exactly
 * that. What may not appear is any archive ARTICLE's content.
 *
 * EMPTY ARCHIVE. If --archive exists but contains no article files (e.g. a
 * Marketing site with no migrated archive), the prose probe is skipped rather
 * than failing vacuously. If --archive does not exist at all, the check fails.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import {
  ALLOWED_SOURCE_PREFIXES as DEFAULT_ALLOWED,
  FORBIDDEN_SOURCE_PREFIXES as DEFAULT_FORBIDDEN,
  isAllowedSource as defaultIsAllowedSource,
} from '../src/agent/allowlist.mjs';

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const DEFAULT_ALLOWLIST_PATH = path.resolve(HERE, '../src/agent/allowlist.mjs');
const DEFAULT_ALLOWLIST_TS = path.resolve(HERE, '../src/agent/allowlist.ts');

/** The index page is a signpost to the archive, which the brief permits. */
const ALLOWED_ARCHIVE_PATHS = new Set(['/insights/archive']);

/**
 * @param {string[]} argv
 * @returns {{ file: string, archive: string, allowlist: string | null }}
 */
export function parseCheckSourcesArgs(argv) {
  const opts = {
    file: 'src/content/pix-kb.json',
    archive: 'src/content/archive',
    allowlist: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--file' && argv[i + 1]) opts.file = argv[++i];
    else if (a === '--archive' && argv[i + 1]) opts.archive = argv[++i];
    else if (a === '--allowlist' && argv[i + 1]) opts.allowlist = argv[++i];
    else if (a === '--help' || a === '-h') {
      process.stdout.write(
        'Usage: node scripts/check-pix-kb-sources.mjs --file <kb> --archive <dir> [--allowlist <mjs|json>]\n',
      );
      process.exit(0);
    }
  }
  return opts;
}

/**
 * Load allowlist arrays from a .mjs/.js module or a .json file.
 * @param {string} allowlistPath
 * @returns {Promise<{ ALLOWED_SOURCE_PREFIXES: readonly string[], FORBIDDEN_SOURCE_PREFIXES: readonly string[], isAllowedSource: (p: string) => boolean }>}
 */
async function loadAllowlist(allowlistPath) {
  const abs = path.resolve(allowlistPath);
  const ext = path.extname(abs).toLowerCase();

  if (ext === '.json') {
    const data = JSON.parse(fs.readFileSync(abs, 'utf8'));
    const ALLOWED_SOURCE_PREFIXES = data.ALLOWED_SOURCE_PREFIXES ?? [];
    const FORBIDDEN_SOURCE_PREFIXES = data.FORBIDDEN_SOURCE_PREFIXES ?? [];
    return {
      ALLOWED_SOURCE_PREFIXES,
      FORBIDDEN_SOURCE_PREFIXES,
      isAllowedSource: makeIsAllowed(ALLOWED_SOURCE_PREFIXES, FORBIDDEN_SOURCE_PREFIXES),
    };
  }

  if (ext === '.mjs' || ext === '.js') {
    const mod = await import(url.pathToFileURL(abs).href);
    const ALLOWED_SOURCE_PREFIXES = mod.ALLOWED_SOURCE_PREFIXES ?? [];
    const FORBIDDEN_SOURCE_PREFIXES = mod.FORBIDDEN_SOURCE_PREFIXES ?? [];
    const isAllowedSource =
      typeof mod.isAllowedSource === 'function'
        ? mod.isAllowedSource
        : makeIsAllowed(ALLOWED_SOURCE_PREFIXES, FORBIDDEN_SOURCE_PREFIXES);
    return { ALLOWED_SOURCE_PREFIXES, FORBIDDEN_SOURCE_PREFIXES, isAllowedSource };
  }

  if (ext === '.ts') {
    // Mirror prefixes by reading the TypeScript source as text (no TS loader required).
    const src = fs.readFileSync(abs, 'utf8');
    const ALLOWED_SOURCE_PREFIXES = extractStringArray(src, 'ALLOWED_SOURCE_PREFIXES');
    const FORBIDDEN_SOURCE_PREFIXES = extractStringArray(src, 'FORBIDDEN_SOURCE_PREFIXES');
    if (!ALLOWED_SOURCE_PREFIXES.length) {
      process.stderr.write(`could not read ALLOWED_SOURCE_PREFIXES from ${abs}\n`);
      process.exit(1);
    }
    return {
      ALLOWED_SOURCE_PREFIXES,
      FORBIDDEN_SOURCE_PREFIXES,
      isAllowedSource: makeIsAllowed(ALLOWED_SOURCE_PREFIXES, FORBIDDEN_SOURCE_PREFIXES),
    };
  }

  process.stderr.write(`unsupported allowlist format: ${ext} (use .mjs, .js, .json, or .ts)\n`);
  process.exit(1);
}

function extractStringArray(src, name) {
  const re = new RegExp(
    `(?:export\\s+)?const\\s+${name}[^=]*=\\s*\\[([\\s\\S]*?)\\]`,
  );
  const m = src.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map(x => x[1] || x[2]);
}

function makeIsAllowed(ALLOWED, FORBIDDEN) {
  return function isAllowedSource(routePath) {
    const p = (routePath || '').trim();
    if (!p.startsWith('/')) return false;
    if (FORBIDDEN.some(f => p === f || p.startsWith(f.endsWith('/') ? f : `${f}/`))) {
      return false;
    }
    if (p === '/') return true;
    return ALLOWED.some(a => a !== '/' && (p === a || p.startsWith(`${a}/`)));
  };
}

/**
 * @param {{ file?: string, archive?: string, allowlist?: string | null, cwd?: string }} [options]
 */
export async function checkSources(options = {}) {
  const cwd = options.cwd || process.cwd();
  const KB = path.resolve(cwd, options.file || 'src/content/pix-kb.json');
  const ARCHIVE = path.resolve(cwd, options.archive || 'src/content/archive');

  let ALLOWED_SOURCE_PREFIXES = DEFAULT_ALLOWED;
  let FORBIDDEN_SOURCE_PREFIXES = DEFAULT_FORBIDDEN;
  let isAllowedSource = defaultIsAllowedSource;

  if (options.allowlist) {
    const loaded = await loadAllowlist(path.resolve(cwd, options.allowlist));
    ALLOWED_SOURCE_PREFIXES = loaded.ALLOWED_SOURCE_PREFIXES;
    FORBIDDEN_SOURCE_PREFIXES = loaded.FORBIDDEN_SOURCE_PREFIXES;
    isAllowedSource = loaded.isAllowedSource;
  }

  const failures = [];

  if (!fs.existsSync(KB)) {
    process.stdout.write(`knowledge base not found: ${KB}\n`);
    process.exit(1);
  }

  const kb = JSON.parse(fs.readFileSync(KB, 'utf8'));
  const docs = kb.docs ?? [];
  if (docs.length === 0) {
    failures.push('the knowledge base is empty, so this check would pass vacuously');
  }

  /* ---- 1. no forbidden route may contribute a document -------------------- */
  for (const d of docs) {
    const p = d.path ?? '';
    if (
      FORBIDDEN_SOURCE_PREFIXES.some(
        f => p === f || p.startsWith(f.endsWith('/') ? f : `${f}/`),
      )
    ) {
      // The archive INDEX is an intentional exception (signpost only).
      if (ALLOWED_ARCHIVE_PATHS.has(p)) continue;
      failures.push(`forbidden route in the KB: ${p}`);
    }
    if (p.startsWith('/insights/archive/')) {
      failures.push(`an archive ARTICLE is in the KB: ${p}`);
    }
  }

  /* ---- 2. no archive ARTICLE text may appear in any document --------------
     The real test. Sentences are taken from the articles themselves, so this
     keeps working as the archive changes and cannot be satisfied by renaming a
     route.

     Softened for sites without an archive corpus: if the archive directory
     exists but has no article files, skip the prose probe (do not fail
     vacuously). If the directory is missing entirely, fail. */
  const kbText = docs.map(d => `${d.title ?? ''} ${d.text ?? ''}`).join('\n').toLowerCase();

  let articles = [];
  let sentencesChecked = 0;
  if (!fs.existsSync(ARCHIVE)) {
    failures.push(`archive directory does not exist: ${ARCHIVE}`);
  } else {
    articles = fs
      .readdirSync(ARCHIVE)
      .filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');

    if (articles.length === 0) {
      // Empty archive: skip prose probe (Marketing / sites with no migrated articles).
      process.stdout.write(
        'archive directory is empty; skipping archive prose probe\n',
      );
    } else {
      for (const file of articles) {
        const src = fs.readFileSync(path.join(ARCHIVE, file), 'utf8');
        // Paragraph literals, as the migration writes them: ["p", "…"].
        const paras = [...src.matchAll(/\["p",\s*"((?:[^"\\]|\\.){80,})"\]/g)].map(m => m[1]);
        for (const para of paras.slice(0, 3)) {
          // A long, specific run of words. Short fragments would collide with
          // ordinary English and report a leak that is not one.
          const probe = para
            .replace(/\\[nrt"']/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ')
            .slice(0, 12)
            .join(' ')
            .toLowerCase();
          if (probe.split(' ').length < 10) continue;
          sentencesChecked += 1;
          if (kbText.includes(probe)) {
            failures.push(`archive prose is in the KB, from ${file}: "${probe.slice(0, 70)}…"`);
          }
        }
      }
    }
  }

  /* ---- 3. every indexed route must be on the explicit allowlist ------------
     When using the default allowlist, also assert allowlist.ts still lists the
     same prefixes so the .ts and .mjs twins cannot drift silently. */
  if (!options.allowlist) {
    const allowedSrc = fs.readFileSync(DEFAULT_ALLOWLIST_TS, 'utf8');
    for (const a of ALLOWED_SOURCE_PREFIXES) {
      if (a === '/') continue;
      if (!allowedSrc.includes(`'${a}'`)) {
        failures.push(`allowlist.mjs allows ${a} but allowlist.ts does not; they have drifted`);
      }
    }
  }

  for (const d of docs) {
    const p = d.path ?? '';
    if (ALLOWED_ARCHIVE_PATHS.has(p)) continue;
    if (!isAllowedSource(p)) {
      failures.push(`route not on the approved allowlist: ${p}`);
    }
  }

  /* ---- 4. the one permitted archive entry must still be a signpost -------- */
  const archiveDocs = docs.filter(d => (d.path ?? '').includes('archive'));
  for (const d of archiveDocs) {
    if (!ALLOWED_ARCHIVE_PATHS.has(d.path)) {
      failures.push(`unexpected archive-related doc: ${d.path}`);
    }
  }
  const indexDoc = archiveDocs.find(d => d.path === '/insights/archive');
  if (indexDoc && !/historical/i.test(indexDoc.text ?? '')) {
    failures.push(
      'the archive index page no longer describes itself as historical, so the agent could ' +
        'present it as current guidance',
    );
  }

  /* ---- report ------------------------------------------------------------- */
  process.stdout.write(
    `pix-kb sources: ${docs.length} docs, ${articles.length} archive articles, ` +
      `${sentencesChecked} probe sentences` +
      (options.allowlist ? ` (allowlist: ${options.allowlist})` : ` (allowlist: ${path.relative(cwd, DEFAULT_ALLOWLIST_PATH) || 'packages/kb/src/allowlist.mjs'})`) +
      `\n`,
  );

  if (failures.length === 0) {
    process.stdout.write('pix-kb sources: no archive or legacy content in the grounding corpus\n');
    process.exit(0);
  }

  process.stdout.write(`\nSOURCE VIOLATIONS: ${failures.length}\n\n`);
  for (const f of failures) process.stdout.write(`  ${f}\n`);
  process.stdout.write(
    '\nPrevious-site content is a hard exclusion: it may not ground the agent.\n',
  );
  process.exit(1);
}

const isDirect =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(url.fileURLToPath(import.meta.url));

if (isDirect) {
  await checkSources(parseCheckSourcesArgs(process.argv.slice(2)));
}
