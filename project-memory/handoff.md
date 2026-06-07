# Project Handoff

Last updated: 2026-06-07 by Important.

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
  1. GD creates an implementation-ready task for the executor.
  2. The executor completes it, writes a handback, updates `updates.md`, and sends it to QA.
  3. QA approves first or sends reproducible rework back to the executor.
  4. GD gives final approval only after QA approval, or sends clear rework back to the executor.
  5. A task is not final until GD explicitly approves it.
- Google Sheet `Cards Config` is the canonical card-edit source:
  `https://docs.google.com/spreadsheets/d/1dv8cOcoY9P1WZOw2UQ-prUccte2BprZMp0DFCSL0pME/edit`
- Sheets/tabs: `good`, `bad`, `tadam`, `event`, `shop`. Card names use `title`; Good-card face text uses `description`.
- Current sheet/local CSV order is `deck,id,title,shortTitle,effect_type,amount,steps,cost,dice,mode,target_deck,notes,count,description`.
- Card update workflow: update `title` and matching effect fields/logic directly, then sync `src/cards.config.js` and `cards-google-sheet.csv`.
- If edited title/rules change numbers (for example coin cost), also update the matching effect fields/logic, not only text.
- `cards-google-sheet.csv` is a local mirror of the Google Sheet column order, not the canonical source.
- `src/cards.config.js` and `cards-google-sheet.csv` should stay aligned with Google Sheet when card balance or text changes.
- Card text style rule: player-facing card text in `title`, `shortTitle`, and `description` must not end with a final period. Internal periods between sentences stay. Internal `notes` may keep punctuation unless displayed on a card.
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
