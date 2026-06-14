# AGENTS.md

## Project

Project name: **Очень Большая Бродилка**.

Active repository path:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`

GitHub repository:

`qooobooo/very-big-adventure`

This is a local web prototype of a fantasy board-game race with players, dice, routes, cards, monsters, seals, events, phone controllers, History, and Google Sheet integrations.

## First Read

Before doing any work, read:

- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/updates.md`
- the inbox for your role in `project-memory/inbox/`
- `project-memory/prompts/read-news.md`
- `project-memory/prompts/next-chat.md`

If you are joining as a new chat or agent, also read:

- `project-memory/prompts/new-chat.md`

## Shared Memory

`project-memory/` is the source of truth for coordination.

Important files:

- `project-memory/README.md` — process rules and role list.
- `project-memory/handoff.md` — stable project handoff and current architecture notes.
- `project-memory/updates.md` — newest project news, newest entries at the top.
- `project-memory/inbox/for-dev.md` — tasks for Dev roles.
- `project-memory/inbox/for-gd.md` — tasks/questions for GD.
- `project-memory/inbox/for-qa.md` — QA tasks and approval gates.
- `project-memory/inbox/for-ui.md` — Art / UI tasks.
- `project-memory/inbox/for-important.md` — coordination/memory tasks.
- `project-memory/prompts/read-news.md` — what to do when user says “прочти новости”.
- `project-memory/prompts/next-chat.md` — how to prepare handoff prompt for a replacement chat.

## Active Roles

Current active roles:

- `Important`: project memory, summaries, status, coordination.
- `Dev 1`: main implementation.
- `Dev 2`: additional implementation.
- `Dev 3`: additional implementation / isolated tasks.
- `GD`: game design, rules, balance, core loop, implementation-ready specs.
- `Art / UI 1`: visual assets and UI direction.
- `Art / UI 2`: additional visual assets and UI direction.
- `QA 1`: testing, smoke checks, regressions, bug reports.
- `QA 2`: additional testing, smoke checks, regressions, bug reports.

## Task Lifecycle

Mandatory process:

1. GD creates an implementation-ready task.
2. Executor completes the task and writes a handback.
3. Executor updates `project-memory/updates.md`.
4. Executor sends result to QA.
5. QA is the first approval gate:
   - if failed, QA sends reproducible rework back to executor;
   - if approved, QA sends the approved result to GD.
6. GD gives final approval or sends rework back.
7. A task is not final until GD explicitly approves it.

Do not treat Dev handback as final acceptance.

## Key Project Files

Game/runtime:

- `index.html`
- `styles.css`
- `server.js`
- `src/game.js`
- `src/game.config.js`
- `src/cards.config.js`
- `src/controller.js`
- `controller.html`

Cards/data:

- `cards-google-sheet.csv`
- Google Sheet `Cards Config` is canonical for card edits.
- `src/cards.config.js` and `cards-google-sheet.csv` must stay synchronized when card text/balance changes.

Assets:

- `assets/`
- `outputs/`

## Card Rules

Current card data shape/order:

`deck,id,title,shortTitle,effect_type,amount,steps,cost,dice,mode,target_deck,notes,count,description`

Rules:

- Card names use `title`.
- Good-card face/body text uses `description`.
- Player-facing card text in `title`, `shortTitle`, and `description` must not end with a final period.
- Internal sentence periods are allowed.
- Internal `notes` may keep punctuation unless displayed on a card.
- If card text changes numbers, update matching effect fields/logic, not only text.
- Do not silently change card balance.

## Safety Rules

- Do not edit local Codex `.jsonl` session files.
- Do not run `git reset --hard`.
- Do not revert or overwrite unrelated user/agent changes.
- Check `git status` before edits.
- Preserve untracked `outputs/` unless explicitly asked.
- Do not change game code unless the task explicitly requires it.
- Keep edits scoped to the assigned task.
- After meaningful work, add a short entry to `project-memory/updates.md`.
- If another role needs action, write to the matching inbox.

## Git Rules

Before implementation:

- run/check current path;
- inspect `git status --short`;
- inspect `git status --branch --short`;
- know whether changes are local-only or already pushed.

When committing/pushing:

- include only relevant files;
- avoid mixing unrelated project-memory, gameplay, UI, assets, and generated outputs unless the task requires it;
- do not push without user approval unless explicitly instructed.

## Hermes Role

If this file is being read by Hermes:

Hermes should act as a project coordinator and memory assistant first.

Preferred Hermes responsibilities:

- read `project-memory` and summarize current status;
- track active tasks and blockers;
- generate replacement-chat prompts;
- detect stale handbacks that did not pass QA/GD;
- remind agents to follow the task lifecycle;
- help keep `updates.md`, handoff, and inboxes coherent;
- optionally verify GitHub/project-memory/Google Sheet consistency.

Hermes should start in read-only mode unless explicitly granted write access.

Recommended permission levels:

1. Read-only: inspect repository, project-memory, GitHub, and Google Sheets.
2. Memory-write: may edit only `project-memory/`.
3. PR mode: may propose changes via branch/PR.
4. Full implementation mode only after explicit approval.

Hermes must not directly push to `main` or rewrite history without explicit user instruction.

## Replacement Chats

When a role chat is replaced, use:

`project-memory/prompts/next-chat.md`

Archive rename format:

`<role> - DD.MM`

Examples:

- `GD - 07.06`
- `Dev 3 - 07.06`
- `QA 2 - 07.06`
- `Art / UI 2 - 07.06`
