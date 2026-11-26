# Pix Vault — agent guide
This project’s knowledge lives in **Pix Vault** via MCP (`pix-vault`). Use MCP for vault work — do not invent notes from memory.
**Vault slug:** `pixelette-marketing`
## Before anything
1. Confirm MCP `pix-vault` is connected (tools visible). If not: human must mint a PAT at `/app/mcp`, set `PIX_VAULT_TOKEN`, keep the app/MCP URL reachable.
2. Always pass `vault_slug` above (except optional global `search`).
3. Cloud PAT = green vaults (+ yellow redacted). Red / `local_only` → deny. Never ask for raw PDF bytes on cloud.
## Optimized read path
| Need | Do this |
|---|---|
| Orient / TOC | `list_index` → pick slugs from titles/summaries (no bodies) |
| Find something | `search` with `query` + `vault_slug`; or `lookup_fact` for short structured answers |
| Read a note | `get_page` with `entry_slug` (use `offset` if truncated) |
| PDF text | `list_file_text` → `read_file_text` with `file_id` (stored text only; yellow may be masked) |
**Rule:** index/search first; open bodies only for hits you need. Prefer `lookup_fact` over dumping many full pages.
## Write path
| Need | Do this |
|---|---|
| New note | `create_note` — distilled Markdown, clear `title` + optional `summary` |
| Edit own note | `get_page` → `update_own_note` with matching `expected_version` (409 → re-read and retry) |
Do not rewrite history or paste secrets. Keep notes dense (decisions, paths, next steps).
## Session habit
When the human says “get latest from the vault” / “check the vault”: `list_index`, then `get_page` / `search` on the newest relevant entries. When they say “update the vault”: write or update a distilled note via MCP — don’t only summarize in chat.

