# Chat Updates

Append new entries at the top.

Format:

```md
## YYYY-MM-DD HH:MM - Chat Name

Changed:
- ...

Files:
- ...

Notes for others:
- ...

Open questions:
- ...
```

## 2026-05-14 01:26 - Dev

Changed:
- Made the turn-info HUD popup dismissible by click.
- Click, Enter, or Space now hides the popup with a very quick fade instead of waiting for the 5-second timer.
- Verified the behavior in the in-app browser with a 2-player game; no browser errors were reported.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Existing project-memory changes from Important were left intact.

Open questions:
- None.

## 2026-05-14 01:20 - Important

Changed:
- Added `GD` as the active game-design chat for "Очень Большая Бродилка".
- Created `project-memory/inbox/for-gd.md`.
- Updated shared memory and onboarding prompt with the GD role.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- `GD` owns game-design direction and writes implementation-ready tasks for Dev in `project-memory/inbox/for-dev.md`.
- Active chats are now `Important`, `Dev`, and `GD`.

Open questions:
- None.

## 2026-05-14 00:41 - Dev

Changed:
- Renamed the visible project title from "Печати Славы" to "Очень Большая Бродилка".
- Updated active project-memory references to the new project name.

Files:
- `index.html`
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Keep "Печати" as the in-game seal mechanic; only the project/game title was renamed.

Open questions:
- None.

## 2026-05-14 00:36 - Dev

Changed:
- Moved the active "Pechati Slavy" project files into the git-connected folder `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.
- Updated shared project memory and the new-chat prompt so the active folder is the git repository.
- Added `.gitignore` for `.DS_Store` and `node_modules/`.

Files:
- `.gitignore`
- `cards-google-sheet.csv`
- `index.html`
- `outputs/`
- `project-memory/`
- `server.js`
- `src/`
- `start-localhost.command`
- `steam_report_work/`
- `styles.css`

Notes for others:
- Work from `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure` now.
- The parent folder should only be treated as a container for the repository folder.

Open questions:
- None.

## 2026-05-14 00:32 - Dev

Changed:
- Fixed hover styling for popup choice cards so the card background no longer turns bright gold.
- Hover/focus now keeps the dark readable card surface and highlights only the border and glow.
- Verified the Joe's Shop popup in the in-app browser after reloading the page.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The active source folder still is not covered by git; changes were made directly in the active project files.

Open questions:
- None.

## 2026-05-14 00:25 - Dev

Changed:
- Increased the field HUD message hold time from 3 seconds to 5 seconds before fade-out.
- Replaced the toast timing numbers with named constants in `src/game.js`.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The active source folder still is not covered by git; changes were made directly in the active project files.

Open questions:
- None.

## 2026-05-14 00:24 - Dev

Changed:
- Added a transient field message layer above the board for important cell-event chronicle messages.
- Green/red fields, drawn good/bad cards, TADAM events, and Joe's Shop outcomes can now appear as a short HUD message.
- Messages stay visible for 3 seconds, then fade out and clear.
- Verified the message layer in the in-app browser with a 2-player game; no browser errors were reported.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The active source folder still is not covered by git; changes were made directly in the active project files.

Open questions:
- None.

## 2026-05-14 00:18 - Dev

Changed:
- Moved interactive decisions into an overlay layer on top of the game field.
- Direction choices, Joe's Shop purchases, and optional extra-die card use now render as field popups instead of sitting in the dice panel.
- Verified the Joe's Shop popup in the in-app browser with a 2-player game; no browser errors were reported.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The active source folder still is not covered by git; changes were made directly in the active project files.

Open questions:
- None.

## 2026-05-14 00:03 - Important

Changed:
- Cleaned shared memory so only the currently active chats remain: `Dev` and `Important`.
- Removed inactive chat/role references from the handoff, README, and new-chat prompt.
- Deleted inactive inbox files.
- Removed old update blocks that were only about inactive chats.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/updates.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/inbox/for-dev.md`

Notes for others:
- Current active chats are only `Dev` and `Important`.
- New chats should use `project-memory/prompts/new-chat.md` and only the matching active inbox.

Open questions:
- Should the game files be moved into the nested repo, or should git be initialized/restored in `/Users/qooobooo/Game Dev/Very Big Adventure`?

## 2026-05-14 00:02 - Dev

Changed:
- Checked whether git appeared in the active project folder.
- Confirmed the active source folder still is not a git repository.
- Found a nested clean repo at `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure` on branch `main`, commit `febc9db Initial commit`, remote `https://github.com/qooobooo/very-big-adventure.git`.
- Noted that the nested repo currently contains only `.git` and `.gitattributes`, not the game source files.

Files:
- `project-memory/handoff.md`
- `project-memory/updates.md`

Notes for others:
- Do not treat the nested repo as covering the current game files until the project files are moved into it or git is initialized around the active source folder.

Open questions:
- Should the game files be moved into the nested repo, or should git be initialized/restored in `/Users/qooobooo/Game Dev/Very Big Adventure`?

## 2026-05-13 23:53 - Important

Changed:
- Accepted this chat as `Important` for project memory and coordination in the current project folder.
- Confirmed current project path with `pwd`: `/Users/qooobooo/Game Dev/Very Big Adventure`.
- Read `project-memory/README.md`, `handoff.md`, `updates.md`, and all files in `project-memory/inbox/`.
- Checked `project-memory/` for stale legacy Documents-project path references; none were found.
- Confirmed a fresh transfer/path update already exists in the 2026-05-13 23:49 Dev entry.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-important.md`
- `project-memory/inbox/for-dev.md`

Notes for others:
- Use `/Users/qooobooo/Game Dev/Very Big Adventure` as the active "Pechati Slavy" project folder.
- Treat the previous Documents-project folder as historical only.

Open questions:
- Should the git repository be reinitialized or restored in the new project folder?

## 2026-05-13 23:49 - Dev

Changed:
- Accepted this chat as the main Dev chat for "Pechati Slavy" in the current project folder.
- Read shared project memory and all inbox files before further work.
- Updated stale "Pechati Slavy" absolute paths from the old folder to `/Users/qooobooo/Game Dev/Very Big Adventure`.
- Checked for a git repository in the current folder; `.git` was not found.
- Verified `good / coins10` is still 10 coins in both card sources.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/updates.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/inbox/for-dev.md`

Notes for others:
- Do not use the previous project folder as the active "Pechati Slavy" folder.
- Re-check git setup before relying on commits or status in the new folder.

Open questions:
- Should the git repository be reinitialized or restored in the new project folder?

## 2026-05-12 23:45 - Important

Changed:
- Created shared project-memory mailbox for cross-chat coordination.
- Added handoff, inbox files, chat prompts, and update format.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/updates.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/inbox/for-important.md`
- `project-memory/inbox/for-dev.md`

Notes for others:
- Read this folder before starting work.
- Leave tasks for active chats in `project-memory/inbox/`.

Open questions:
- None.
