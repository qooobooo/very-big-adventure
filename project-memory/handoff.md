# Project Handoff

Last updated: 2026-05-19 by Dev 2.

## Очень Большая Бродилка

Main folder: `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`

Active chats:

- `Important`: project memory, summaries, status, and coordination.
- `Dev`: main implementation chat.
- `Dev 2`: additional implementation chat.
- `Dev 3`: additional implementation chat.
- `GD`: game design, contracts, rules, balance, and implementation-ready specs for Dev.
- `Art / UI`: visual assets and UI direction.

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

- Google Sheet `Cards Config` is the canonical card-edit source:
  `https://docs.google.com/spreadsheets/d/1dv8cOcoY9P1WZOw2UQ-prUccte2BprZMp0DFCSL0pME/edit`
- Sheets/tabs: `good`, `bad`, `tadam`, `shop`. Card names use `title`; Good-card face text uses `description`.
- Current sheet/local CSV order is `deck,id,title,shortTitle,effect_type,amount,steps,cost,dice,mode,target_deck,notes,count,description`.
- Card update workflow: update `title` and matching effect fields/logic directly, then sync `src/cards.config.js` and `cards-google-sheet.csv`.
- If edited title/rules change numbers (for example coin cost), also update the matching effect fields/logic, not only text.
- `cards-google-sheet.csv` is a local mirror of the Google Sheet column order, not the canonical source.
- `src/cards.config.js` and `cards-google-sheet.csv` should stay aligned with Google Sheet when card balance or text changes.
- `src/game.config.js` contains game-level config such as door/enemy strengths.
- The active source folder is now the git repository at `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.
- Remote: `https://github.com/qooobooo/very-big-adventure.git`.
- Historical note from the old folder: last known clean commit was `97332b9 Initial game prototype`.

## Chat Discovery

Only these chats are active in this project memory right now:

- `Dev`
- `Dev 2`
- `Dev 3`
- `GD`
- `Important`
- `Art / UI`

If more context is needed, local Codex records may be inspected read-only:

- `~/.codex/session_index.jsonl`
- `~/.codex/sessions`
- `~/.codex/archived_sessions`

Do not edit local Codex `.jsonl` files.
