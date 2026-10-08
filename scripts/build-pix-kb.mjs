/**
 * Builds Marketing's knowledge file from the copy the site actually renders.
 *
 * The shared `pix-agent build` reads Technologies-shaped page.tsx files
 * (pageMetadata, faqs of { q, a }, SectionHead). Marketing keeps that copy in
 * data modules, so that command indexes nothing. This script is the same
 * contract for this site: exact string literals only, one page doc per real
 * URL, one FAQ per published question, one section per published heading and
 * body. It does not run the app and it does not invent a sentence.
 *
 *     node scripts/build-pix-kb.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'content', 'pix-kb.json');
const QUESTIONS = path.join(ROOT, 'src', 'content', 'pix-questions.json');

const SPECIALIST_ROUTES = new Set([
  'social_media_marketing',
  'ads_ppc',
  'influencer_marketing',
  'pr',
  'seo_and_content_marketing',
  'marketing_analytics_and_reporting',
]);

const LEGACY_SERVICE_ROUTES = new Set(['email_marketing', 'lead_generation']);

const docs = [];

function clean(value) {
  if (typeof value !== 'string') return null;
  const text = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text || null;
}

function addPage(title, text, routePath) {
  const t = clean(title);
  const body = clean(text);
  if (!t || !body || !routePath) return;
  if (docs.some(d => d.kind === 'page' && d.path === routePath)) return;
  docs.push({ kind: 'page', title: t, text: body, path: routePath });
}

function addSection(title, text, routePath, page) {
  const t = clean(title);
  const body = clean(text);
  if (!t || !body || body.length < 40 || !routePath) return;
  if (docs.some(d => d.kind === 'section' && d.path === routePath && d.title === t && d.text === body)) return;
  docs.push({ kind: 'section', title: t, text: body, path: routePath, page });
}

function addFaq(question, answer, routePath, page) {
  const t = clean(question);
  const body = clean(answer);
  if (!t || !body || !routePath) return;
  if (docs.some(d => d.kind === 'faq' && d.path === routePath && d.title === t)) return;
  docs.push({ kind: 'faq', title: t, text: body, path: routePath, page });
}

function parse(rel) {
  const file = path.join(ROOT, rel);
  return ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function localBinds(sf) {
  const map = new Map();
  const visit = node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      map.set(node.name.text, node.initializer);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return map;
}

const modules = new Map();
/** Exports already evaluated, so a later file can read an earlier one by name. */
const shared = new Map();

function mod(rel) {
  if (!modules.has(rel)) {
    const sf = parse(rel);
    modules.set(rel, { sf, binds: localBinds(sf), exports: new Map() });
  }
  return modules.get(rel);
}

function unwrap(node) {
  let n = node;
  while (n && (ts.isAsExpression(n) || ts.isSatisfiesExpression(n) || ts.isParenthesizedExpression(n) || ts.isTypeAssertionExpression(n))) {
    n = n.expression;
  }
  return n;
}

/**
 * @param {import('typescript').Node} node
 * @param {Map<string, import('typescript').Node>} binds
 * @param {Map<string, unknown>} globals
 * @param {Set<string>} stack
 */
function evalNode(node, binds, globals, stack) {
  const n = unwrap(node);
  if (!n) return null;
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  if (n.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (n.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (n.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isNumericLiteral(n)) return Number(n.text);
  if (ts.isIdentifier(n)) {
    if (stack.has(n.text)) return null;
    if (binds.has(n.text)) {
      stack.add(n.text);
      const value = evalNode(binds.get(n.text), binds, globals, stack);
      stack.delete(n.text);
      return value;
    }
    if (globals.has(n.text)) return globals.get(n.text);
    return null;
  }
  if (ts.isPropertyAccessExpression(n)) {
    const obj = evalNode(n.expression, binds, globals, stack);
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) return obj[n.name.text] ?? null;
    return null;
  }
  if (ts.isElementAccessExpression(n)) {
    const obj = evalNode(n.expression, binds, globals, stack);
    const key = evalNode(n.argumentExpression, binds, globals, stack);
    if (Array.isArray(obj) && typeof key === 'number') return obj[key] ?? null;
    if (obj && typeof obj === 'object' && (typeof key === 'string' || typeof key === 'number')) return obj[key] ?? null;
    return null;
  }
  if (ts.isTemplateExpression(n)) {
    let out = n.head.text;
    for (const span of n.templateSpans) {
      const bit = evalNode(span.expression, binds, globals, stack);
      if (typeof bit !== 'string' && typeof bit !== 'number') return null;
      out += String(bit) + span.literal.text;
    }
    return out;
  }
  if (ts.isArrayLiteralExpression(n)) {
    return n.elements.map(el => (ts.isSpreadElement(el) ? null : evalNode(el, binds, globals, stack)));
  }
  if (ts.isObjectLiteralExpression(n)) {
    const obj = {};
    for (const prop of n.properties) {
      if (ts.isShorthandPropertyAssignment(prop)) {
        obj[prop.name.text] = evalNode(prop.name, binds, globals, stack);
        continue;
      }
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = prop.name && ts.isIdentifier(prop.name)
        ? prop.name.text
        : ts.isStringLiteral(prop.name)
          ? prop.name.text
          : null;
      if (!name || name === 'retired' || name === 'demo') continue;
      obj[name] = evalNode(prop.initializer, binds, globals, stack);
    }
    return obj;
  }
  if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
    const name = n.expression.text;
    const args = n.arguments.map(a => evalNode(a, binds, globals, stack));
    if (name === 'capability' && typeof args[0] === 'string' && typeof args[1] === 'string') {
      const items = globals.get('growthSystemData')?.items;
      const source = Array.isArray(items) ? items.find(item => item && item.index === args[0]) : null;
      return source ? { index: args[0], title: source.title, body: args[1] } : { index: args[0], body: args[1] };
    }
    if (name === 'approach' && typeof args[0] === 'string' && Array.isArray(args[1])) {
      const titles = ['Diagnose', 'Audit', 'Growth Plan', 'Execute & Optimise'];
      return {
        heading: args[0],
        items: titles.map((title, i) => ({ title, body: args[1][i] })),
      };
    }
    return null;
  }
  return null;
}

function publish(rel) {
  const m = mod(rel);
  const names = [];
  const visit = node => {
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some(modi => modi.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const d of node.declarationList.declarations) {
        if (ts.isIdentifier(d.name)) names.push(d.name.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(m.sf);
  for (const name of names) {
    const init = m.binds.get(name);
    if (!init) continue;
    const value = evalNode(init, m.binds, shared, new Set());
    m.exports.set(name, value);
    shared.set(name, value);
  }
  return m.exports;
}

function pageTitle(routePath) {
  return docs.find(d => d.kind === 'page' && d.path === routePath)?.title ?? routePath;
}

function jsxPlain(node) {
  const n = unwrap(node);
  if (!n) return null;
  if (ts.isJsxText(n)) return n.text;
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  if (ts.isJsxExpression(n)) {
    if (!n.expression) return '';
    const value = evalNode(n.expression, new Map(), new Map(), new Set());
    return typeof value === 'string' ? value : null;
  }
  if (ts.isJsxFragment(n) || ts.isJsxElement(n)) {
    const children = ts.isJsxElement(n) ? n.children : n.children;
    let out = '';
    for (const child of children) {
      const bit = jsxPlain(child);
      if (bit === null) return null;
      out += bit;
    }
    return out;
  }
  if (ts.isJsxSelfClosingElement(n)) return '';
  return null;
}

function tagName(el) {
  if (ts.isJsxOpeningElement(el) || ts.isJsxSelfClosingElement(el)) return el.tagName.getText();
  if (ts.isJsxElement(el)) return el.openingElement.tagName.getText();
  return '';
}

/** Headings in a page file, each followed by the paragraphs under it. */
function jsxSections(rel, routePath) {
  const sf = parse(rel);
  const page = pageTitle(routePath);
  const blocks = [];
  const visit = node => {
    if (ts.isJsxElement(node)) {
      const name = tagName(node);
      const text = clean(jsxPlain(node));
      if (text && (name === 'h2' || name === 'h3' || name === 'Heading')) blocks.push({ heading: name !== 'p' && name !== 'Text', text });
      else if (text && (name === 'p' || name === 'Text')) blocks.push({ heading: false, text });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  let current = null;
  const paras = [];
  const flush = () => {
    if (!current) return;
    const body = paras.join(' ');
    addSection(current, body, routePath, page);
    paras.length = 0;
  };
  for (const block of blocks) {
    if (block.heading) {
      flush();
      current = block.text;
    } else if (current) paras.push(block.text);
  }
  flush();
}

function staticMetadata() {
  const pages = [
    ['src/app/page.tsx', '/'],
    ['src/app/aboutus/page.tsx', '/aboutus'],
    ['src/app/services/page.tsx', '/services'],
    ['src/app/industries/page.tsx', '/industries'],
    ['src/app/contactus/page.tsx', '/contactus'],
    ['src/app/cookie-policy/page.tsx', '/cookie-policy'],
    ['src/app/privacy/page.tsx', '/privacy'],
    ['src/app/blog-list/page.tsx', '/blog-list'],
    ['src/app/results/page.tsx', '/results'],
    ['src/app/strategy-positioning/page.tsx', '/strategy-positioning'],
  ];
  for (const [rel, routePath] of pages) {
    const m = mod(rel);
    const meta = evalNode(m.binds.get('metadata'), m.binds, m.exports, new Set());
    if (meta && typeof meta === 'object') addPage(meta.title, meta.description, routePath);
  }
}

function specialistPages() {
  const files = [
    'src/data/services/specialist/demandPerformance.ts',
    'src/data/services/specialist/searchAuthority.ts',
    'src/data/services/specialist/growthIntelligence.ts',
  ];
  for (const rel of files) {
    const exported = publish(rel);
    for (const value of exported.values()) {
      if (!value || typeof value !== 'object' || Array.isArray(value) || !value.route || !value.meta) continue;
      const routePath = `/services/${value.route}`;
      const page = clean(value.meta.title);
      addPage(value.meta.title, value.meta.description, routePath);
      const heroHeading = typeof value.hero?.heading === 'string'
        ? value.hero.heading
        : [value.hero?.heading?.lead, value.hero?.heading?.accent].filter(Boolean).join(' ');
      addSection(heroHeading || value.label, value.hero?.lead, routePath, page);
      addSection(value.earnsItsPlace?.heading, value.earnsItsPlace?.intro, routePath, page);
      for (const item of value.earnsItsPlace?.items ?? []) addSection(item?.title, item?.body, routePath, page);
      for (const item of value.services?.items ?? []) addSection(item?.title, item?.body, routePath, page);
      addSection(value.measure?.heading, value.measure?.body, routePath, page);
      for (const item of value.connections?.items ?? []) {
        addSection(item?.title, item?.body, routePath, page);
      }
      for (const item of value.process?.steps ?? []) addSection(item?.title, item?.body, routePath, page);
      if (Array.isArray(value.goodLooksLike?.points)) {
        addSection(value.goodLooksLike.heading, value.goodLooksLike.points.filter(Boolean).join(' '), routePath, page);
      }
      addSection(value.cta?.heading, value.cta?.body, routePath, page);
      for (const faq of value.faqs?.items ?? []) addFaq(faq?.question, faq?.answer, routePath, page);
    }
  }
}

function legacyServices() {
  const exported = publish('src/data/services/servicesData.ts');
  const list = exported.get('servicesData');
  if (!Array.isArray(list)) return;
  for (const service of list) {
    if (!service || !LEGACY_SERVICE_ROUTES.has(service.route)) continue;
    const routePath = `/services/${service.route}`;
    const page = clean(service.metaTitle);
    addPage(service.metaTitle, service.metaDescription, routePath);
    addSection(service.mainHeading, service.summary, routePath, page);
    addSection(service.services?.heading, service.services?.text, routePath, page);
    const groups = service.services?.data;
    if (Array.isArray(groups)) {
      for (const group of groups) {
        const cards = group?.data;
        if (!Array.isArray(cards)) continue;
        for (const card of cards) addSection(card?.title, card?.text, routePath, page);
      }
    }
    if (Array.isArray(service.faqs)) {
      for (const faq of service.faqs) addFaq(faq?.question, faq?.answer, routePath, page);
    }
  }
}

function industriesHub() {
  const exported = publish('src/data/industries/industries.ts');
  const page = pageTitle('/industries');
  const hub = exported.get('industriesPage');
  if (hub?.hero) {
    const headline = [hub.hero.headline?.lead, hub.hero.headline?.accent].filter(Boolean).join('. ');
    addSection(headline || 'Industries', hub.hero.lead, '/industries', page);
  }
  const list = exported.get('industries');
  if (!Array.isArray(list)) return;
  for (const market of list) {
    if (!market?.name) continue;
    addSection(`${market.name}: the market`, market.market, '/industries', page);
    addSection(`${market.name}: the challenge`, market.challenge, '/industries', page);
    addSection(`${market.name}: our approach`, market.approach, '/industries', page);
  }
}

function industryPages() {
  const exported = publish('src/data/industries/industriesData.ts');
  const list = exported.get('industriesData');
  if (!Array.isArray(list)) return;
  for (const sector of list) {
    if (!sector?.route) continue;
    const routePath = `/industries/${sector.route}`;
    const page = clean(sector.metaTitle);
    addPage(sector.metaTitle, sector.metaDescription, routePath);
    addSection(sector.mainHeading, sector.summary, routePath, page);
    addSection(sector.challenges?.heading, sector.challenges?.lead, routePath, page);
    for (const item of sector.challenges?.items ?? []) addSection(item?.heading, item?.text, routePath, page);
    if (Array.isArray(sector.help?.body)) addSection(sector.help.heading, sector.help.body.filter(Boolean).join(' '), routePath, page);
    addSection(sector.capabilities?.heading, sector.capabilities?.lead, routePath, page);
    for (const item of sector.capabilities?.items ?? []) addSection(item?.title, item?.body, routePath, page);
    addSection(sector.approach?.heading, null, routePath, page);
    for (const item of sector.approach?.items ?? []) addSection(item?.title, item?.body, routePath, page);
    for (const faq of sector.faqs ?? []) addFaq(faq?.question, faq?.answer, routePath, page);
  }
}

function homeAndServices() {
  const exported = publish('src/data/home/homeContent.ts');
  const home = pageTitle('/');
  const services = pageTitle('/services');
  const hero = exported.get('heroCopy');
  if (hero) {
    const headline = [hero.headline?.lead, hero.headline?.tail].filter(Boolean).join(' ');
    addSection(headline, hero.support, '/', home);
  }
  for (const key of ['activityCopy', 'capabilitiesCopy', 'relevanceCopy']) {
    const block = exported.get(key);
    if (!block) continue;
    const headline = [...(block.headline ?? []), block.accent].filter(Boolean).join(' ');
    addSection(headline, block.lead, '/', home);
  }
  const close = exported.get('finalConversionCopy');
  if (close) addSection(close.heading, [close.lead, close.closing].filter(Boolean).join(' '), '/', home);
  const system = exported.get('growthSystemData');
  if (system) {
    addSection(system.heading, system.lead, '/services', services);
    for (const item of system.items ?? []) {
      const caps = Array.isArray(item.capabilities) ? item.capabilities.filter(Boolean).join(', ') : '';
      addSection(item.title, [item.body, caps].filter(Boolean).join(' '), '/services', services);
    }
  }
}

function about() {
  const exported = publish('src/data/aboutus/aboutContent.ts');
  const page = pageTitle('/aboutus');
  const hero = exported.get('aboutHero');
  if (hero) addSection([hero.headingLead, hero.headingAccent].filter(Boolean).join(' '), hero.lead, '/aboutus', page);
  const why = exported.get('aboutWhy');
  if (why) addSection(why.heading, (why.body ?? []).filter(Boolean).join(' '), '/aboutus', page);
  const built = exported.get('aboutBuilt');
  if (built) addSection(built.heading, [built.lead, ...(built.stages ?? [])].filter(Boolean).join(' '), '/aboutus', page);
  const principles = exported.get('aboutPrinciples');
  if (principles) {
    const lines = (principles.items ?? []).map(item => [item.title, item.body].filter(Boolean).join(': '));
    addSection(principles.heading, lines.join(' '), '/aboutus', page);
  }
  const group = exported.get('aboutGroup');
  if (group) addSection(group.heading, group.body, '/aboutus', page);
  const end = exported.get('aboutClose');
  if (end) addSection(end.heading, end.lead, '/aboutus', page);
}

function contact() {
  const exported = publish('src/data/contactUs/contactPage.ts');
  const page = pageTitle('/contactus');
  const hero = exported.get('contactHero');
  if (hero) addSection(hero.heading ?? hero.eyebrow, [hero.lead, ...(hero.points ?? [])].filter(Boolean).join(' '), '/contactus', page);
  const routes = exported.get('contactRoutes');
  for (const item of routes?.items ?? []) addSection(item.heading, item.text, '/contactus', page);
  const faqs = exported.get('contactFaqs');
  for (const faq of faqs?.items ?? []) addFaq(faq.question, faq.answer, '/contactus', page);
}

function results() {
  const quotes = publish('src/data/teamData.ts');
  const exported = publish('src/data/results/caseStudies.ts');
  const page = pageTitle('/results');
  const list = exported.get('caseStudies');
  if (!Array.isArray(list)) return;
  for (const study of list) {
    addSection(study.heading, study.challenge, '/results', page);
    addSection(study.heading, study.work, '/results', page);
    addSection(study.impactHeading || study.heading, study.closing, '/results', page);
    const quote = study.client === 'BlockGuard' ? quotes.get('blockGuardQuote') : study.client === 'WebBookingPro' ? quotes.get('webBookingProQuote') : null;
    if (quote?.detail) addSection(`${study.client} — ${quote.name}`, quote.detail, '/results', page);
  }
}

function strategy() {
  const exported = publish('src/data/strategy/diagnosticContent.ts');
  const page = pageTitle('/strategy-positioning');
  const hero = exported.get('strategyHero');
  if (hero) {
    addSection([hero.headingLead, hero.headingAccent].filter(Boolean).join(' '), hero.lead, '/strategy-positioning', page);
  }
  const bridge = exported.get('clarityBridge');
  if (bridge) addSection(bridge.heading, bridge.line, '/strategy-positioning', page);
}

function blogs() {
  const m = mod('src/data/blogs/blogsData.ts');
  const posts = evalNode(m.binds.get('posts'), m.binds, shared, new Set());
  if (!Array.isArray(posts)) return;
  const seen = new Set();
  for (const post of posts) {
    if (seen.has(post.id)) continue;
    seen.add(post.id);
    const routePath = `/blog/${post.id}`;
    const title = `${clean(post.heading)} | Pixelette Marketing`;
    addPage(title, post.description, routePath);
    const page = title;
    for (const block of post.dataContent ?? []) {
      const heading = [block.titleOne, block.titleTwo].filter(Boolean).join(' ');
      addSection(heading, block.description, routePath, page);
    }
  }
}

function aliases() {
  const { entries } = JSON.parse(fs.readFileSync(QUESTIONS, 'utf8'));
  const missing = [];
  for (const entry of entries) {
    const target = docs.find(
      d => (d.kind === 'faq' || d.kind === 'page') && d.path === entry.answer.path && d.title === entry.answer.title && d.text,
    );
    if (!target) {
      missing.push(`${entry.answer.path} | ${entry.answer.title}`);
      continue;
    }
    for (const ask of entry.ask) {
      addFaq(ask, target.text, target.path, target.kind === 'faq' ? target.page : target.title);
    }
  }
  if (missing.length) {
    process.stderr.write(`pix-questions.json points at answers that do not exist:\n${missing.map(m => '  - ' + m).join('\n')}\n`);
    process.exit(1);
  }
}

staticMetadata();
jsxSections('src/app/services/page.tsx', '/services');
jsxSections('src/app/privacy/page.tsx', '/privacy');
jsxSections('src/app/cookie-policy/page.tsx', '/cookie-policy');
specialistPages();
legacyServices();
homeAndServices();
about();
strategy();
contact();
results();
industriesHub();
industryPages();
blogs();
aliases();

const kb = {
  builtFrom:
    'Marketing published copy: static page metadata, specialist service configs, legacy email and lead-generation pages, industries hub and sector pages, home, about, contact, results, strategy hero, insights. Exact literals only. Generated by scripts/build-pix-kb.mjs.',
  counts: {
    pages: docs.filter(d => d.kind === 'page').length,
    faqs: docs.filter(d => d.kind === 'faq').length,
    pointers: docs.filter(d => d.kind === 'pointer').length,
    sections: docs.filter(d => d.kind === 'section').length,
  },
  docs,
};

fs.writeFileSync(OUT, JSON.stringify(kb, null, 1) + '\n', 'utf8');
process.stdout.write(
  `pages ${kb.counts.pages}  faqs ${kb.counts.faqs}  sections ${kb.counts.sections}  -> src/content/pix-kb.json\n`,
);
