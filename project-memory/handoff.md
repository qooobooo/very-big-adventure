# Project Handoff

Last updated: 2026-05-19 by Dev 2.

## Очень Большая Бродилка

Main folder: `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`

Active chats:

- `Important`: project memory, summaries, status, and coordination.
- `Dev`: main implementation chat.
- `GD`: game design, contracts, rules, balance, and implementation-ready specs for Dev.

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
- Sheets/tabs: `good`, `bad`, `tadam`, `shop`. In the sheet, `description` is column M and `new description` is column N.
- Card update workflow: user writes proposed text in `new description`; Dev applies it into `description`, updates matching local card logic/text in `src/cards.config.js`, syncs `cards-google-sheet.csv`, and clears `new description` in Google Sheet.
- If a `new description` changes numeric rules (for example coin cost), also update the matching effect fields/logic, not only text. Example: `shop/extra-die` text changed from 2 to 5 coins, so `effect.cost` and Google Sheet `cost` were updated to `5`.
- `cards-google-sheet.csv` is a local mirror of the Google Sheet column order, not the canonical source.
- `src/cards.config.js` and `cards-google-sheet.csv` should stay aligned with Google Sheet when card balance or text changes.
- `src/game.config.js` contains game-level config such as door/enemy strengths.
- The active source folder is now the git repository at `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.
- Remote: `https://github.com/qooobooo/very-big-adventure.git`.
- Historical note from the old folder: last known clean commit was `97332b9 Initial game prototype`.

## Chat Discovery

Only these chats are active in this project memory right now:

- `Dev`
- `GD`
- `Important`

If more context is needed, local Codex records may be inspected read-only:

- `~/.codex/session_index.jsonl`
- `~/.codex/sessions`
- `~/.codex/archived_sessions`

Do not edit local Codex `.jsonl` files.
