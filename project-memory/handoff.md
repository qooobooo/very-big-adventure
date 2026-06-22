# Project Handoff

Last updated: 2026-06-09 by GD.

## Очень Большая Бродилка

Main folder: `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`

Active chats:

- `Important`: project memory, summaries, status, and coordination.
- `Dev 1`: main implementation chat.
- `Dev 2`: additional implementation chat.
- `Dev 3`: additional implementation chat.
- `GD`: game design, contracts, rules, balance, and implementation-ready specs for Dev roles.
- `Art / UI 1`: visual assets and UI direction.
- `Art / UI 2`: additional visual assets and UI direction.
- `QA 1`: testing, smoke checks, regression checks, and bug reports for Dev roles.
- `QA 2`: additional testing chat for smoke checks, regression checks, and bug reports.

Current shape: a local web prototype of a board-game race with players, dice, seals, route cells, good/bad cards, green/red fields, TADAM cards, and Joe's Shop.

Key files:

- `index.html`
- `styles.css`
- `src/game.js`
- `src/cards.config.js`
- `src/game.config.js`
- `cards-google-sheet.csv`
- `server.js`

Current important state:

- Required task lifecycle for implementation/design tasks:
  1. For planning/executing multi-role work, GD routes tasks through specialists by default: Dev for implementation, Art / UI for visual assets/UI polish, and QA only when the user explicitly asks.
  2. GD should not directly implement cross-role plans unless the user explicitly asks GD to do the implementation personally or the change is an urgent tiny documentation/memory edit.
  3. GD plans and multi-role tasks must include explicit `Ownership`: which role/chat owns each part of the work.
  4. If a task is split into waves, every wave must have an assigned owner before it is sent to development.
  5. GD creates an implementation-ready task for the executor.
  6. Default pipeline: the executor completes it, writes a handback, updates `updates.md`, and sends it to GD as a context note only.
     - If GD or another active role needs to react soon, the executor also sends a direct message to that active Codex thread; the inbox note alone is not enough for expected handbacks.
  7. GD does not verify or approve handbacks by default; GD only keeps them in mind.
  8. GD approval/checking/rework happens only when the user explicitly asks for review/approval/checking.
  9. QA is skipped by default and is involved only when the user explicitly asks, for example says `привлеки QA`.
  10. If QA is explicitly requested, use the QA-gated pipeline: executor -> QA approval/rework -> GD context note, unless the user also asks GD for approval.
- Google Sheet `Cards Config` is the canonical card-edit source:
  `https://docs.google.com/spreadsheets/d/1dv8cOcoY9P1WZOw2UQ-prUccte2BprZMp0DFCSL0pME/edit`
- Sheets/tabs: `good`, `bad`, `tadam`, `event`, `shop`. Card names use `title`; Good-card face text uses `description`.
- Current sheet/local CSV order is `deck,id,title,shortTitle,effect_type,amount,steps,cost,dice,mode,target_deck,notes,count,description`.
- Card update workflow: update `title` and matching effect fields/logic directly, then sync `src/cards.config.js` and `cards-google-sheet.csv`.
- If edited title/rules change numbers (for example coin cost), also update the matching effect fields/logic, not only text.
- `cards-google-sheet.csv` is a local mirror of the Google Sheet column order, not the canonical source.
- `src/cards.config.js` and `cards-google-sheet.csv` should stay aligned with Google Sheet when card balance or text changes.
- Card text style rule: player-facing card text in `title`, `shortTitle`, and `description` must not end with a final period. Internal periods between sentences stay. Internal `notes` may keep punctuation unless displayed on a card.
- Card face layout rule: keep top art compact, use the lower half for readable text, split long descriptions into clear lines/paragraphs, and avoid large empty lower areas.
- `src/game.config.js` contains game-level config such as door/enemy strengths.
- The active source folder is now the git repository at `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.
- Remote: `https://github.com/qooobooo/very-big-adventure.git`.
- Historical note from the old folder: last known clean commit was `97332b9 Initial game prototype`.

## Chat Discovery

Only these chats are active in this project memory right now:

- `Dev 1`
- `Dev 2`
- `Dev 3`
- `GD`
- `Important`
- `Art / UI 1`
- `Art / UI 2`
- `QA 1`
- `QA 2`

If more context is needed, local Codex records may be inspected read-only:

- `~/.codex/session_index.jsonl`
- `~/.codex/sessions`
- `~/.codex/archived_sessions`

Do not edit local Codex `.jsonl` files.
