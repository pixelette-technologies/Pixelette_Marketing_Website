# Session Vault

This folder is the **project memory vault**. It preserves context across AI coding sessions so nothing important is lost when a chat ends.

**Git:** `docs/` is committed as the decision/session record (Obsidian editor state is not).

## Layout

```
docs/
  README.md              ← you are here (how the vault works)
  index.md               ← master log / table of contents
  sessions/
    YYYY-MM-DD.md        ← one file per calendar day (local date)
```

**Do not** invent copy, deploy live, or open a production PR without explicit approval.

## When the user says “update the vault”

Do **all** of the following in the same turn:

1. **Write or append today’s session file**  
   Path: `docs/sessions/YYYY-MM-DD.md` (use the user’s local date).  
   If the file already exists, **append** a new session block; do not overwrite earlier sessions that day.

2. **Update `docs/index.md`**  
   Add a short log line (or section) pointing at that day file, summarizing what was captured. Keep `## Active threads` current.

3. **Keep entries dense and useful**  
   Prefer decisions, constraints, open questions, and next steps over chat transcripts.

## Session file format

Use this template for each session block:

```markdown
## Session — HH:MM (timezone if known)

### Goal
What the user wanted this session.

### Done
- Concrete outcomes (files changed, decisions made, bugs fixed).

### Decisions
- Choice → rationale (only if it affects future work).

### Context to keep
- Facts an agent would otherwise lose (APIs, env quirks, naming, links, IDs).

### Open / next
- [ ] Unfinished work or follow-ups.

### Notes
Optional: pitfalls, rejected approaches, useful commands.
```

If the day file is new, start it with:

```markdown
# YYYY-MM-DD

```

## Index format (`index.md`)

Newest entries **at the top** under `## Log`.

```markdown
- **YYYY-MM-DD** — one-line summary of the day’s work. → [sessions/YYYY-MM-DD.md](sessions/YYYY-MM-DD.md)
```

If the same day already has an index line, **extend or rewrite that day’s summary** instead of duplicating the date.

Optional: keep a short `## Active threads` section at the top of `index.md` for multi-day themes with links into session files.

## What belongs in the vault

Include:

- Product/architecture decisions and why
- Non-obvious constraints (hosting, auth, brand rules, locked handoffs)
- Current plan / milestones and blockers
- Commands, URLs, commit SHAs that are safe to store
- Explicit “do not do X” preferences

Exclude:

- Secrets, tokens, passwords, private keys
- Full chat dumps or huge code pastes (link to paths instead)
- PDF / HTML reference dumps (not kept in this vault)
- Noise that won’t help the next session

## Tips for agents

- Read `index.md` first when the user asks for continuity (“get the latest from the vault”); open the linked day file(s) as needed.
- For build work: use Active threads + the relevant day file.
- Gates: `npx tsc --noEmit && npm run test:contact`.
- One day file can hold multiple sessions; separate them with `## Session — …` headings.
- Prefer absolute clarity over length. A tight half-page beats a vague essay.
- Do not deploy to the live domain or open a production PR unless the user explicitly asks.
