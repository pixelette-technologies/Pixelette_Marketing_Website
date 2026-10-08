# Security incident — obfuscated payload in eslint.config.mjs

Found 1 September 2026, during Phase A of the revamp. Full report:
https://claude.ai/code/artifact/77554413-022e-4c29-9a59-4c5864be5a01

## Summary

`eslint.config.mjs` carried a **29,980-character obfuscated payload** appended after the legitimate config, hidden behind roughly 5,290 trailing spaces on the `export default` line. It reached `main` through a merged pull request, and the ground was prepared fifteen months earlier in a separate PR.

Found because `npm run lint:check` crashed while I was recording the pre-conversion lint baseline.

## How it was staged

| Date | Commit | Bytes | Longest line | |
|---|---|---|---|---|
| 12 Jan 2025 | `320eef2` Initial commit | 393 | normal | clean |
| 22 May 2025 | `915bc1d` PR #3, fork `asif-hussain-lab/wahab/features` | 5,773 | **5,319** | **staging** |
| 2 Jun 2026 | `3b3146b` PR #17 | 5,794 | 5,319 | runway intact |
| 7 Aug 2026 | `58f3f5c` PR #24 | 5,794 | 5,319 | runway intact |
| 11 Aug 2026 | `020163a` PR #25 | 30,401 | **29,979** | **payload** |
| 1 Sep 2026 | `a9c6379` | 345 | 69 | fixed |

PR #3 added two things a Next.js flat config has no use for: an `import { createRequire } from 'module'` with a matching `const require = createRequire(import.meta.url)`, and 5,290 trailing spaces on the export line. No malicious code — just a dormant capability and a place to hide. PR #25 wrote the payload onto that runway.

`git show --stat` renders the PR #25 config change as `eslint.config.mjs | 23 +-`.

## What it does

Static analysis only; never executed. 323 string literals, fragmented to defeat inspection.

| Indicator | Fragments | Reading |
|---|---|---|
| Command execution | `node:child`, `_process` | `node:child_process` |
| Network | `node:https`, `node:http`, `node:url`, `node:zlib`, `POST`, `hostname`, `maxSockets` | HTTP client with compressed payloads |
| Ethereum JSON-RPC | `jsonrpc`, `eth_blockN…`, `eth_getBlo…`, `eth_getTra…` | `eth_blockNumber`, `eth_getBlockByNumber`, `eth_getTransaction*` |
| RPC providers | `h.drpc.org`, `…stapi.io`, `https://et…hereum-rpc…e.com`, `…pc.io/eth` | drpc.org, blastapi.io, a publicnode-style host |
| Encoding | `base64`, `toString` | payload decoding |

**Assessment: a blockchain dead-drop resolver**, the pattern sometimes called EtherHiding. Rather than embedding a C2 address that can be sinkholed, the loader queries public Ethereum RPC endpoints and reads its next instruction out of on-chain transaction data. The operator rotates the payload by publishing a transaction; the malware needs no update and survives domain takedown.

With `node:child_process` plus HTTP and base64 in the same bundle, the capability is **fetch-and-execute of an arbitrary second stage**.

Confidence: high on the capability set and the resolver pattern — they follow directly from the strings. The specific second-stage behaviour is **not established**; full deobfuscation was not performed, and it lives on-chain where it may since have changed.

## It never ran

The payload declares `createRequire`, and so does the legitimate config three lines from the top of the same file. A duplicate lexical declaration is a **static early error** — Node throws during compilation, before any of the module body is evaluated, on every Node version. So every attempt to load this config since 11 August crashed rather than executed.

**Do not "fix" a crash like this by deduplicating the declaration.** That removes the collision and lets the payload run. Delete the payload.

The corollary: **the lint gate was dead for three weeks** and nobody noticed. That silence is what a working version would have relied on.

This covers *this file via this entry point*. It does not establish that nothing else in the supply chain ran.

## Blast radius checked

| Check | Result |
|---|---|
| Payload markers across all tracked files | Only `eslint.config.mjs` |
| Whitespace runways (>200 trailing spaces), tracked tree | None remaining |
| `node_modules` and `.next` | No marker matches |
| `package-lock.json` working-tree diff | 15 lines, all `"peer": true`; no new resolved URLs, integrity hashes or install scripts |
| Lines >2,000 chars outside the lockfile | Binaries and single-line SVG icon components only |
| Remote `main` | **Still carries the payload** |
| Other Pixelette Group repositories | **Not examined** |

## Outstanding

1. **Get the fix onto `main` and pushed.** It is committed only on `revamp/ui`, local. Every clone and the remote default branch still carry it. *(User chose to commit here for now.)*
2. **Review PR #25 as merged** — attributed to `rana@pixelette.tech`. It also touched `next.config.ts`, `package.json`, a 1,788-line lockfile change and `src/app/api/contact/route.ts`.
3. **Review PR #3 and its source fork** `asif-hussain-lab/wahab/features`, merged by `hamidgujjar33@gmail.com`.
4. **Establish whether an account or token was compromised.** Check GitHub audit logs; check whether commit signing is enforced.
5. **Check CI logs from 11 Aug onward** for lint steps failing with the `createRequire` SyntaxError.
6. **Decide on rotating** `RESEND_API_KEY`, `MARKETING_CONTACT_RATE_LIMIT_SECRET` and contact configuration.
7. **Sweep the other group repositories** — search for long trailing-whitespace runs and unused `createRequire` in config files. The staging pattern is more distinctive than the payload.
8. **Add a CI guard**: fail on any line over ~500 characters outside lockfiles and generated assets. This class of attack depends entirely on nobody scrolling right.

## Lesson for the vault

Recorded in [[Rules]]: read the whole file, do not trust a `--stat`. And a gate that has silently stopped running is worse than no gate — see [[Build and verification]] for the baselines that now exist.
