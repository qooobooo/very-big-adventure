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

## 2026-06-22 11:28 - Dev 3

Changed:
- Completed `ACTIVE BOARD PREVIEW UX 2026-06-22 11:27 - Кубик неприятностей backward target preview`.
- `Кубик неприятностей` now highlights the target cell only when the resolved penalty is backward movement.
- Added compact non-clickable board label `-8` for the destination.
- Roll `1-2` shows the preview after the roll result resolves into backward movement.
- Roll `5-6` shows the preview only if the chosen player selects the backward movement penalty.
- Coin-loss branches do not add any board target preview.
- The preview is brief/non-blocking and clears before movement starts.
- Did not add confirmation and did not change card rules, die branches, target-player choice, penalty choice, movement amount, coin loss amount, landing resolution, Bad deck lifecycle, route order, bots, phone/controller behavior, or unrelated previews.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run because `127.0.0.1:5173` was unavailable.

Open questions:
- None.

## 2026-06-22 11:27 - GD

Changed:
- Accepted Dev 3 direct handback for `Назад к сопернику` target preview as context in the board-preview UX cycle.
- Assigned the next board-preview task to `Dev 3`: `Кубик неприятностей` backward target preview.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- QA is not involved.
- `Art / UI 1` remains on hold; no next TADAM card is dispatched.

Open questions:
- None.

## 2026-06-22 11:21 - Dev 3

Changed:
- Completed `ACTIVE BOARD PREVIEW UX 2026-06-22 11:19 - Назад к сопернику target preview`.
- `Назад к сопернику` now highlights the destination cell with the nearest player behind before automatic movement.
- Added compact non-clickable board label `Игрок` for the target cell.
- If several players are tied on that nearest cell, the board still shows one target highlight while the existing result text names the tied players.
- If the active player is last and the card only applies the fallback coin loss, no target preview is shown.
- The preview is brief/non-blocking and clears before movement starts.
- Did not add confirmation and did not change card rules, nearest-player search, fallback coin loss, movement, landing resolution, Bad deck lifecycle, route order, bots, phone/controller behavior, or unrelated previews.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run because `127.0.0.1:5173` was unavailable.

Open questions:
- None.

## 2026-06-22 11:19 - GD

Changed:
- Accepted Dev 3 direct handback for `Красная дорожка` target preview as context in the board-preview UX cycle.
- Assigned the next board-preview task to `Dev 3`: `Назад к сопернику` target preview.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- QA is not involved.
- `Art / UI 1` remains on hold; no next TADAM card is dispatched.

Open questions:
- None.

## 2026-06-22 11:13 - Dev 3

Changed:
- Completed `ACTIVE BOARD PREVIEW UX 2026-06-22 11:11 - Красная дорожка target preview`.
- `Красная дорожка` now highlights the valid backward red destination cell before automatic movement.
- Added compact non-clickable board label `Красное` for the target cell.
- If there is no valid red field behind the player, the existing no-movement/log flow remains unchanged and no target preview is shown.
- The preview is brief/non-blocking and clears before movement starts.
- Did not add confirmation and did not change card rules, backward target search, movement, red-field resolution, Bad deck lifecycle, route order, bots, phone/controller behavior, or unrelated previews.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run because `127.0.0.1:5173` was unavailable.

Open questions:
- None.

## 2026-06-22 11:11 - GD

Changed:
- Accepted Dev 3 direct handback for `Зеленая тропа` target preview as context in the board-preview UX cycle.
- Assigned the next board-preview task to `Dev 3`: `Красная дорожка` target preview.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- QA is not involved.
- `Art / UI 1` remains on hold; no next TADAM card is dispatched.

Open questions:
- None.

## 2026-06-22 03:20 - Dev 3

Changed:
- Completed `ACTIVE BOARD PREVIEW UX 2026-06-22 03:18 - Зеленая тропа target preview`.
- `Зеленая тропа` now highlights the valid forward green destination cell before automatic movement.
- Added compact non-clickable board label `Зеленое` for the target cell.
- If there is no valid green field ahead, the existing no-movement/log flow remains unchanged and no target preview is shown.
- The preview is brief/non-blocking and clears before movement starts.
- Did not add confirmation and did not change card rules, target search direction, movement, green-field resolution, Good deck lifecycle, route order, bots, phone/controller behavior, or unrelated previews.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run because `127.0.0.1:5173` was unavailable.

Open questions:
- None.

## 2026-06-22 03:18 - GD

Changed:
- Accepted Dev 3 direct handback for `Кубик удачи` backward target preview as context in the board-preview UX cycle.
- Assigned the next board-preview task to `Dev 3`: `Зеленая тропа` target preview.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- QA is not involved.
- `Art / UI 1` remains on hold; no next TADAM card is dispatched.

Open questions:
- None.

## 2026-06-22 03:16 - Dev 3

Changed:
- Completed `ACTIVE BOARD PREVIEW UX 2026-06-22 03:12 - Кубик удачи backward target preview`.
- After all 6 `Кубик удачи` rolls are resolved, if at least one `1` creates backward movement, the destination cell is highlighted before movement.
- The preview label uses the actual total penalty, e.g. `-10`, `-20`, etc.
- If no `1`s are rolled, no board target preview is added.
- The preview remains visible through the existing result/action step and is cleared just before the automatic backward movement.
- Did not add a new confirmation and did not change rewards, penalties, dice count, random, movement, landing resolution, route order, cards, or unrelated previews.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run because `127.0.0.1:5173` was unavailable.

Open questions:
- None.

## 2026-06-22 03:12 - GD

Changed:
- Accepted Dev 3 direct handback for `Портал хаоса` target preview as context in the board-preview UX cycle.
- Assigned the next board-preview task to `Dev 3`: `Кубик удачи` backward target preview.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- QA is not involved.
- `Art / UI 1` remains on hold; no next TADAM card is dispatched.

Open questions:
- None.

## 2026-06-22 03:08 - Art/UI 1

Changed:
- Added a standalone TADAM infographic continuation guide so any chat can pick up future card-specific infographic work.
- Linked the new guide from `project-memory/README.md`.
- Captured the accepted workflow, one-card-at-a-time rule, asset paths, cache bumps, shared top-art slot, backing color target, no-shield pawn direction, prompt template, verification, and direct handback rule.

Files:
- `project-memory/tadam-infographic-rules.md`
- `project-memory/README.md`
- `project-memory/updates.md`

Notes for others:
- Documentation-only change; gameplay, card configs, assets, CSV, Google Sheet, and UI code were not changed.

Open questions:
- None.

## 2026-06-22 03:10 - Dev 3

Changed:
- Completed `ACTIVE BOARD PREVIEW UX 2026-06-22 03:02 - Портал хаоса target preview`.
- After the Chaos Portal die result is known and the destination cell is calculated, that target cell is highlighted on the board before movement.
- Added compact non-clickable labels for the result: `назад`, `Лавка`, `Хорошо`, or `вперед` / `Портал`.
- The preview remains visible through the existing result/action step and is cleared just before teleport movement.
- Did not add a new confirmation or change automatic movement.
- Rules, nearest-target logic, movement, landing resolution, routes, card effects, and other board-click previews were not changed.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run because `127.0.0.1:5173` was unavailable.

Open questions:
- None.

## 2026-06-22 03:08 - GD

Changed:
- Sent the active `Портал хаоса` target preview task directly to `Dev 3` thread.
- Clarified that docs-only queue entries are not enough for active work: direct dispatch and direct handback are required for cyclic tasks.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `Art / UI 1` remains on hold; no next TADAM card is dispatched.
- QA is not involved.

Open questions:
- None.

## 2026-06-22 03:02 - GD

Changed:
- Accepted direct handbacks from `Dev 3` for `Черный рынок` 30-step rush target preview and from `Art / UI 1` for TADAM infographic `Красная беда`.
- Assigned next cyclic board-preview task to `Dev 3`: `Портал хаоса` target preview.
- Drafted next single-card TADAM infographic item `Плата за обгон`, then put it on hold because the user asked not to send Art/UI the next card yet.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- QA is not involved.
- These are cyclic one-task-at-a-time queues: each executor must ping GD directly after completion before GD sends the next item.

Open questions:
- None.

## 2026-06-22 02:59 - Dev 3

Changed:
- Completed `ACTIVE BOARD PREVIEW UX 2026-06-22 02:54 - Черный рынок 30-step rush target preview`.
- When a human player has enough face-up Joe Shop cards for the 3-card Black Market rush exchange, the `+30` destination cell is highlighted on the board before confirmation.
- Clicking the highlighted `+30` cell resolves the same `rush` option as the existing button and then enters the existing Shop-card exchange/payment selection flow.
- The existing Black Market choice buttons remain available as fallback in a compact non-blocking preview panel.
- If the 3-card rush option is unavailable, no clickable rush target is created.
- Existing exchange rules, card removal semantics, next-monster `+10`, 30-step movement, landing resolution, bot choices, route, Shop lifecycle, field text, CSV, and Google Sheet were not changed.
- Added a shared compact `.choice-panel-board-preview` style for board-click choices that need visible fallback buttons without blocking the field.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run because `127.0.0.1:5173` was unavailable.

Open questions:
- None.

## 2026-06-22 02:54 - GD

Changed:
- Accepted Dev 3 direct handback for `Разворот` as context in the board-click UX cycle.
- Assigned the next board-preview UX queue task to `Dev 3`: `Черный рынок` 30-step rush target preview.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- The 30-step target preview must follow the no-blocking board-click rule.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-22 02:53 - Dev 3

Changed:
- Completed `ACTIVE BOARD CLICK UX 2026-06-22 02:50 - Разворот board target preview`.
- `Разворот` now starts with board preview enabled for human players when backward movement can be reversed.
- Normal backward and reversed forward target cells are highlighted directly on the board with compact `-N` / `+N` labels.
- Clicking the backward target resolves the same as declining `Разворот`; clicking the forward target resolves the same as using/discarding `Разворот`.
- If both options collapse onto the same cell, the board click prefers the non-consuming `keep` option to avoid accidentally discarding the held card.
- Generalized phone/controller preview actions for clickable board-choice cards, covering `Путевой знак` and `Разворот`.
- Bumped host `game.js` cache key again so the no-blocking `Путевой знак` / `Разворот` code is not hidden by stale browser cache.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run because `127.0.0.1:5173` was unavailable.
- Direct user report noted that `Путевой знак` still showed a blocking window in-browser; the cache key was bumped after the no-blocking fix.

Open questions:
- None.

## 2026-06-22 02:50 - GD

Changed:
- Added a `Board-Click UX` rule to `project-memory/README.md`: board selection must not be blocked by a large modal/dialog over the field.
- Accepted Dev 3 direct rework handback for `Золотые метки` / `Путевой знак` no-blocking-preview fix as context.
- Assigned the next board-click UX queue task to `Dev 3`: `Разворот` board target preview.

Files:
- `project-memory/README.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Similar board-click effects should use non-blocking HUD/panels or safe auto-confirm instead of covering the board.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-22 02:48 - Dev 3

Changed:
- Fixed the blocking board-click window for `Золотые метки`.
- While `Золотые метки` is in board-selection preview, the large choice dialog is now hidden so the board remains clickable.
- Selecting the 5th marker cell now auto-confirms and places the markers; no blocking confirm window is needed.
- Applied the same no-blocking-preview rule to `Путевой знак`: its large choice dialog is hidden while board targets are active, so highlighted cells are actually clickable.
- Bumped host `game.js` cache key.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Direct user bugfix after the board-click UX queue.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Similar board-click previews should not keep a large modal over the board unless that modal is non-blocking.

Open questions:
- None.

## 2026-06-22 02:46 - Dev 3

Changed:
- Completed `ACTIVE BOARD CLICK UX 2026-06-22 02:42 - Путевой знак board target selection`.
- `Путевой знак` now starts with board preview enabled for human players.
- Forward/backward target cells are highlighted directly on the board with compact `+5` / `-5` labels.
- Clicking a highlighted target resolves the same choice as the existing forward/backward buttons.
- The existing choice buttons remain visible as fallback while the board targets are clickable.
- Phone/controller actions still expose the forward/backward choices while the board preview is open.
- Bot choice behavior, card data, CSV, Google Sheet, Good deck lifecycle, movement distance, and backward landing-field resolution were not changed.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run because `127.0.0.1:5173` was unavailable.

Open questions:
- None.

## 2026-06-22 02:31 - Art/UI 1

Changed:
- Completed `ACTIVE 2026-06-22 01:49 - TADAM infographic step 2: Красная беда`.
- Replaced the `Красная беда` / `red-bad` TADAM infographic in the accepted rich fantasy board-game style.
- The new `red-bad` art shows a red field activating a miniature `Плохо` card with a cursed chest, without baked title/rules text.
- Normalized the top-art backing color so the edge/background areas match the accepted TADAM cards (`red-bad` edge average is about `#DA920F`, target standard is `#D8910F`).
- Added the accepted TADAM art slot and backing color standard to `project-memory/README.md`.
- Bumped the `red-bad` `frontArt` cache key plus the `cards.config.js` / `game.js` cache chain.

Files:
- `assets/cards/tadam_red-bad_front.png`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `project-memory/README.md`
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Direct Art/UI task from GD; QA was not involved.
- Rules, text, counts, CSV, Google Sheet, deck lifecycle, and unrelated UI were not changed.
- Checks passed: `assets/cards/tadam_red-bad_front.png` is `744x1039 RGBA`; `node --check src/cards.config.js`; `node --check src/game.js`; `git diff --check -- assets/cards/tadam_red-bad_front.png src/cards.config.js src/game.js index.html project-memory/README.md project-memory/handoff.md project-memory/prompts/next-chat.md`.

Open questions:
- None.

## 2026-06-22 02:45 - Dev 2

Changed:
- Tuned the TADAM activation highlight after user feedback: smoother visible ramp-in, brighter peak, and 2800ms fade.
- Preserved the one-pulse behavior and the negative-delay re-render guard from the previous fix.
- Bumped the host `styles.css` cache key.

Files:
- `styles.css`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.
- Browser smoke on `localhost:5173` passed: opacity ramped `0.18 -> 0.999`, then continued down after simulated re-render `0.32 -> 0.25 -> 0.046`, with no second pulse.

Open questions:
- None.

## 2026-06-22 02:42 - GD

Changed:
- Added a Task Lifecycle rule for cyclic / one-item-at-a-time task queues.
- Clarified that GD owns the queue, sends exactly the next task, the executor completes one task, updates docs, and must ping GD directly with the handback.
- Clarified that docs/inbox-only handback is not enough for cyclic work; GD sends the next task only after the direct handback.
- Assigned the next board-click UX queue task to `Dev 3`: `Путевой знак` board target selection.

Files:
- `project-memory/README.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This applies to TADAM infographic one-card flow, board-click UX queue, and similar repeated task cycles.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-22 02:41 - Dev 2

Changed:
- Fixed the TADAM activation highlight restarting on re-render by storing each flashed card's start time.
- Re-rendered TADAM slots now receive a negative animation delay, so the visible highlight continues fading instead of starting a second pulse.
- Made the single pulse brighter at the start and extended the fade to 2400ms.
- Bumped host `styles.css` and `game.js` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.
- Browser smoke on `localhost:5173` passed: after simulated TADAM-slot re-render during the animation, measured opacity continued down (`1 -> 0.32 -> 0.21 -> 0.067`) instead of returning to a second bright pulse.

Open questions:
- None.

## 2026-06-22 02:40 - Dev 3

Changed:
- Completed `ACTIVE BOARD CLICK UX 2026-06-22 02:34 - Золотые метки board-cell selection`.
- Human `Золотые метки` resolution now opens board-selection mode instead of asking for one cell five times.
- Valid route cells are highlighted on the board; clicking a valid cell selects it, clicking a selected cell removes it.
- Selection progress is shown as `Выбрано X/5`; confirm stays disabled until exactly 5 different cells are selected.
- Confirm places the selected markers through the existing `goldenMarkers` state/lifecycle.
- Bot marker placement, marker collection for 10 coins, new-game cleanup, card data, CSV, and Google Sheet were not changed.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run; static/source checks covered the board-click flow.

Open questions:
- None.

## 2026-06-22 02:34 - GD

Changed:
- Assigned the first board-click UX queue task to `Dev 3`: `Золотые метки` board-cell selection.
- Specified direct board selection for 5 marker cells: click to select, click again to unselect, confirm only at exactly 5 selected cells.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This continues the one-task-at-a-time UX improvement queue proposed by Dev 3.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-22 02:30 - Dev 2

Changed:
- Simplified the TADAM activation animation to one external pulse only.
- Removed the card-scale animation and extended the fade to 2200ms so the highlight disappears more slowly without extra visual beats.
- Bumped host `styles.css` and `game.js` cache keys.

Files:
- `styles.css`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`, static single-keyframe/cache-key check.

Open questions:
- None.

## 2026-06-22 02:28 - Dev 2

Changed:
- Tuned the TADAM activation highlight into a single softer pulse with a slower fade.
- Matched the TADAM flash timeout to the 1650ms CSS animation so the fade is not cut off early.
- Bumped the host `game.js` cache key; `styles.css` was already bumped for this animation tune.

Files:
- `styles.css`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`, static duration/cache-key check.

Open questions:
- None.

## 2026-06-22 02:26 - Dev 3

Changed:
- Added board-click selection during `Вольный шаг` field preview.
- `event-free-step` choices now carry their destination cell using the same movement target helper as post-roll movement.
- While `Вольный шаг` is in `Просмотр поля`, highlighted destination cells become clickable/focusable and selecting a cell resolves the matching step choice.
- Added compact step-number labels inside clickable preview outlines.
- Kept this board-click behavior scoped to `event-free-step`, so other card-choice previews are unchanged.
- Bumped host `game.js` and `styles.css` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Direct user follow-up; QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was attempted but `127.0.0.1:5173` was unavailable.

Open questions:
- Suggested follow-up candidates for similar board-click selection: `Золотые метки`, `Путевой знак`, `Разворот`, `Черный рынок` rush option, and roll/random movement result previews such as `Портал хаоса` / `Кубик удачи`.

## 2026-06-22 02:18 - Dev 1

Changed:
- Removed Good card `dice-control` / `Контроль кубика` with text `Оставь эту карту себе. После броска кубиков можешь поменять значение на одном кубике на любое другое и сбросить эту карту`.
- Deleted the card from local `src/cards.config.js`.
- Deleted the corresponding row from `cards-google-sheet.csv`.
- Deleted the corresponding row from Google Sheet `Cards Config` / tab `good`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- Google Sheet `Cards Config` / `good`
- `project-memory/updates.md`

Notes for others:
- Runtime dice-control helper code remains in `src/game.js` for now, but the card is no longer present in the Good deck data sources.
- Checks passed: `node --check src/cards.config.js`; `node --check src/game.js`; `git diff --check`; local data scan; Google Sheet readback confirmed no `good/dice-control` row.

Open questions:
- None.

## 2026-06-22 02:11 - Dev 2

Changed:
- Added a short visual activation flash for visible TADAM cards when their active effects trigger.
- Green/red field TADAM effects now pulse the matching card in the TADAM block before applying draw/move/coin effects.
- Added the same flash helper to several other active TADAM triggers, including Good cashout, Bad consolation, start-turn effects, monster-hunt reward, same-cell duel, jump steal, and land steal.
- Bumped host `styles.css` / `game.js` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- The animation is CSS-only on `.tadam-slot.is-activating`, with a reduced-motion fallback.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`; static source/CSS scan; browser host smoke at `localhost:5173`.

Open questions:
- None.

## 2026-06-22 02:08 - Dev 3

Changed:
- Updated monster tile corner numbers per direct user request.
- `monster-power` and `monster-defeat-reward` now render as plain corner text without chip border/background.
- Kept top-right monster strength and bottom-left defeat reward positions.
- Bumped host `styles.css` cache key.

Files:
- `styles.css`
- `index.html`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Direct UI follow-up to monster defeat reward display; QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.

Open questions:
- None.

## 2026-06-22 02:05 - Dev 3

Changed:
- Added a monster-cell UI badge for the defeat strength reward requested by the user.
- Enemy tiles now render a bottom-left `.monster-defeat-reward` badge showing `+1`, `+2`, `+3`, or `+5` from `monsterDefeatStrengthReward(door)`.
- The badge is removed when a non-final monster tile becomes an opened portal.
- The badge title/aria-label says `Награда за поражение: Сила +N`.
- Added compact styling for the main board and `field2`, and bumped host `styles.css` / `game.js` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Direct user follow-up to the monster defeat reward task; QA was not involved.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was attempted but the local static server could not bind a port in this sandbox (`PermissionError: Operation not permitted`).

Open questions:
- None.

## 2026-06-22 01:55 - Dev 3

Changed:
- Completed `ACTIVE MONSTER DEFEAT REWARD 2026-06-22 01:52 - Strength-only defeat rewards by monster tier`.
- Changed monster defeat reward helper to tiered permanent strength only: tier 1 `Сила +1`, tier 2 `Сила +2`, tier 3 `Сила +3`, tier 4/final monster door `Сила +5`.
- Removed `monsterDefeatCoinReward(...)` from live reward logic and removed defeat coin payout from `resolveEnemyBattle(...)`.
- Kept monster defeat return-to-Start behavior and existing separate `start-strength` Shop-card trigger.
- Defeat branch no longer draws/grants a free `Лавка Джо`.
- Defeat HUD/result/log/toast now uses strength-only wording via `monsterDefeatRewardText(door)`.
- Applied the permanent defeat strength through `addBattleBonus(...)` before result render/prompt so player status updates immediately.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved per current pipeline.
- No card data, monster strength, win rewards, door opening rules, final boss PvP, Event monster battles, Shop deck/discard lifecycle, CSV, or Google Sheet rows were changed.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source checks passed: no `monsterDefeatCoinReward` / `defeatCoins` live code; defeat branch no longer calls free Shop reward; defeat result text no longer mentions defeat coins or `Лавка Джо`.
- Browser smoke was not run in this pass.

Open questions:
- None.

## 2026-06-22 01:52 - GD

Changed:
- Created Dev 3 task `ACTIVE MONSTER DEFEAT REWARD 2026-06-22 01:52 - Strength-only defeat rewards by monster tier`.
- New monster defeat rewards: tier 1 `Сила +1`, tier 2 `Сила +2`, tier 3 `Сила +3`, tier 4/final door `Сила +5`.
- Explicitly removed defeat coin rewards and free `Лавка Джо` from the new contract.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 3`.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-22 01:49 - GD

Changed:
- Sent next one-card TADAM infographic task to `Art / UI 1`: `Красная беда` / `red-bad`.
- Kept the one-card-at-a-time workflow: Art/UI 1 should finish this card and hand back before GD dispatches another.

Files:
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- Existing `assets/cards/tadam_red-bad_front.png` from the old mass pass should be treated as replaceable draft art, not accepted final art.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-22 01:45 - Dev 3

Changed:
- Completed `ACTIVE SHOP TIMING 2026-06-22 01:41 - Purchased Joe Shop cards apply immediately`.
- Ordinary Joe Shop purchases still add the bought card to owned Shop cards immediately and render before the visit continues, so passive strength/step status updates right away.
- `resolveShop(player)` now tracks only `step-plus` / `passive-step-bonus` cards bought during that specific Shop visit.
- After an ordinary Shop landing closes, newly bought `Быстрые сапоги` grant immediate extra forward movement equal to the newly gained step amount.
- Multiple newly bought step cards stack into one grouped extra movement after the visit; pre-owned step cards are not counted again.
- Immediate extra movement uses the existing `movePlayerSteps(...)` path, so the new destination resolves normal landing effects and Shop-field chains still use the existing `eventDepth` guard.
- Free/debug/reference Shop rewards and pass-through Shop purchases update owned-card UI/status immediately but do not add extra current movement under this task.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved per current pipeline.
- No card data, counts, prices, deck/discard lifecycle, CSV, or Google Sheet rows were changed for this task.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `node --check src/cards.config.js`; `git diff --check`.
- Browser smoke was not run in this pass.

Open questions:
- None.

## 2026-06-22 01:41 - GD

Changed:
- Created Dev 3 task `ACTIVE SHOP TIMING 2026-06-22 01:41 - Purchased Joe Shop cards apply immediately`.
- Specified that newly bought Joe Shop cards become active immediately after purchase.
- Added special movement contract for newly bought `+2 к шагам`: after the Shop visit, the player moves the newly gained step amount during the same turn.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 3`, continuing recent Shop behavior work.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-22 01:35 - Dev 3

Changed:
- Completed `ACTIVE GOOD CARD 2026-06-22 01:31 - Limit Защитный знак to Bad and Red fields`.
- Updated `field-shield` / `Защитный знак` description to `Оставь эту карту себе. Когда остановился на клетке Плохо или Красное поле, можешь сбросить эту карту и отменить действие поля`.
- Synced the new description in `src/cards.config.js`, `cards-google-sheet.csv`, and Google Sheet `Cards Config` / `good`.
- Added an explicit shield eligibility gate so `Защитный знак` prompts/uses only on ordinary `Плохо` and `Красное поле`.
- Ordinary `Плохо` shield use now returns before the Bad draw path; red-field shield use returns before `resolveRedField(...)`, skipping base red and stacked red-field TADAM effects for that stop.
- Removed prior effective coverage for `Очень Плохо`, Events, monsters, VS, Shop, TADAM, portals, start/finish, and other fields.
- Bumped `cards.config.js` import and host `game.js` cache keys.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- Google Sheet `Cards Config` / `good`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved per current pipeline.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `node --check src/controller.js`; `git diff --check`.
- Static readback passed: local config, CSV, and Google Sheet all show the new exact description with `count: 2`.
- Browser smoke was not run in this pass.

Open questions:
- None.

## 2026-06-22 01:31 - GD

Changed:
- Created Dev 3 task `ACTIVE GOOD CARD 2026-06-22 01:31 - Limit Защитный знак to Bad and Red fields`.
- New `Защитный знак` description: `Оставь эту карту себе. Когда остановился на клетке Плохо или Красное поле, можешь сбросить эту карту и отменить действие поля`.
- Specified that the held shield should only trigger on ordinary `Плохо` and `Красное поле`, not on every field.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 3`.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-22 01:28 - Dev 3

Changed:
- Completed `ACTIVE SHOP DECK 2026-06-22 01:21 - Add fixed 3-coin Joe tariff and remove 3 Shop cards`.
- Added new Shop card `shop-fixed-cost-3` / `Тариф Джо`, `shortTitle: Цена 3`, `count: 3`, description `Во время покупок карт Лавка Джо плати только 3 монеты`.
- Removed `pre-roll-step-plus5`, `reroll-one-move-die`, and `move-one-farther` from playable Shop data in local config, CSV, and Google Sheet.
- Ordinary Joe Shop purchases now cost exactly `3` coins for owners of `Тариф Джо`, overriding TADAM Shop discount/surcharge modifiers for that ordinary purchase path.
- Kept `Привилегия Джо` as 3-card offer size only and `Безлимит Джо` as repeat-buy from the same opened offer; with `Тариф Джо`, those purchases cost `3` each.
- Removed active roll-flow calls, action chip, and bot valuation hooks for the deleted pre-roll/post-roll Shop cards.
- Bumped `cards.config.js` import and host `game.js` cache keys.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `src/controller.js`
- `index.html`
- Google Sheet `Cards Config` / `shop`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA was not involved per current pipeline.
- Defensive legacy helper functions for old saved states remain in code, but new games and playable Shop offers cannot create the removed cards and the movement flow no longer calls their prompts.
- Static readback shows 13 Shop rows / 53 physical Shop copies after removing counts `4 + 3 + 3` and adding `3`.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not run in this pass.

Open questions:
- None.

## 2026-06-22 01:26 - Art/UI 1

Changed:
- Completed `ACTIVE 2026-06-22 00:51 - TADAM infographic step 1: Зеленая удача`.
- Replaced the `Зеленая удача` / `green-good` TADAM infographic in the accepted rich fantasy board-game style.
- The new `green-good` art shows a green field activating a miniature `Хорошо` card with a chest, without baked title/rules text.
- Followed the user's additional correction and removed shields completely from the pawn art on `Зеленый попутчик`, `Красный откат`, and `Зеленая удача`.
- Kept the shared upper-art backing size consistent with the accepted `Зеленый попутчик` slot.
- Bumped `green-forward`, `red-back`, and `green-good` `frontArt` cache keys plus the `cards.config.js` / `game.js` cache chain.

Files:
- `assets/cards/tadam_green-forward_front.png`
- `assets/cards/tadam_red-back_front.png`
- `assets/cards/tadam_green-good_front.png`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Direct Art/UI task from GD plus user correction; QA was not involved.
- Rules, text, counts, CSV, Google Sheet, deck lifecycle, and unrelated UI were not changed.
- Checks passed: changed TADAM assets are `744x1039 RGBA`; `node --check src/cards.config.js`; `node --check src/game.js`; `git diff --check -- assets/cards/tadam_green-forward_front.png assets/cards/tadam_red-back_front.png assets/cards/tadam_green-good_front.png src/cards.config.js src/game.js index.html`.

Open questions:
- None.

## 2026-06-22 01:21 - GD

Changed:
- Created Dev 3 task `ACTIVE SHOP DECK 2026-06-22 01:21 - Add fixed 3-coin Joe tariff and remove 3 Shop cards`.
- New `Лавка Джо` card to add: `Тариф Джо` / `shop-fixed-cost-3`, count `3`, description `Во время покупок карт Лавка Джо плати только 3 монеты`.
- Cards to remove from playable Shop deck: `Дорожный рывок`, `Ещё раз`, `Еще шажок`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 3`, because this follows recent Shop deck/card behavior work.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-22 01:06 - Dev 3

Changed:
- Reworked `Ещё шажок` boosted target cost display to use floating coin-marker UI instead of a static chip.
- Added persistent `.post-roll-target-cost-float.coin-float.is-negative` on the boosted target with `-${coinAmount(pending.cost)}`.
- Disabled the coin-float animation for this preview and set `opacity: 1`, so it stays visible until the pending choice resolves.
- Kept normal target textless and clickable.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- No card config, cost, steps, movement math, or resolver behavior changed.

Open questions:
- None.

## 2026-06-22 01:01 - Dev 3

Changed:
- Updated `Ещё шажок` target UI copy per user request.
- Boosted board target now displays `-3 монеты` instead of `С картой +1`.
- Normal board target keeps its outline/click behavior but no longer renders a `Без карты` text badge.
- Action panel legend now shows the boosted coin cost instead of `С картой`.
- Skip action text changed from `Без карты` to `Не платить` in host and phone/controller labels.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static source check passed: no `С картой` / `Без карты` strings remain in `src/game.js`.

Open questions:
- None.

## 2026-06-22 00:56 - Dev 3

Changed:
- Hotfixed `Ещё шажок` board click after user clarified that press animation happened but the action still did not apply.
- Fixed the resolver blocker: target cell ids are strings such as `10-14`, but the board handler was converting `dataset.moveFartherCell` through `Number(...)`, producing `NaN`.
- `resolveMoveOneFartherBoardCell(...)` now compares string cell ids directly.
- Kept the coordinate fallback for clicks that arrive from token/overlay layers.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not completed because local `127.0.0.1:5173` is unavailable in this environment.

Open questions:
- None.

## 2026-06-22 00:51 - GD

Changed:
- Switched TADAM infographic work to a one-card-at-a-time Art/UI 1 workflow.
- Created `ACTIVE 2026-06-22 00:51 - TADAM infographic step 1: Зеленая удача` for `Art / UI 1`.
- Queued `Красная беда` as the next GD-dispatched card, but did not send it yet.

Files:
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- Treat the earlier broad full-deck TADAM infographic pass as draft/superseded for future corrections.
- Art/UI 1 should finish and hand back exactly one TADAM card before GD sends the next.
- Already accepted style references: `Зеленый попутчик`, `Красный откат`, `Монеты бедняку`.

Open questions:
- None.

## 2026-06-22 00:51 - Dev 3

Changed:
- Reworked `Ещё шажок` board-click target after user reported that clicking the highlighted field did nothing.
- Expanded click handling from the outline span to the highlighted tile itself.
- Target tiles now receive `data-move-farther-target`, `data-move-farther-cell`, button semantics, title/aria-label, focusability, and pointer cursor while `state.pendingMoveOneFarther` is active.
- Board click/keyboard handling still resolves through `resolveMoveOneFartherChoice(...)`; boosted tile resolves `pay`, normal tile resolves `skip`, combined same-cell tile resolves `skip`.
- Tile-level interactive state is cleaned up on each tile-state render.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke was not completed because local `127.0.0.1:5173` is unavailable in this environment.

Open questions:
- None.

## 2026-06-22 00:38 - Art/UI 1

Changed:
- Unified the upper TADAM art backing size for `Монеты бедняку` / `poorest-start-coins` to match the larger `Зеленый попутчик` slot.
- Added a new rich fantasy board-game style infographic for `Красный откат` / `red-back`.
- The `Красный откат` art shows red fields, a backward path, and a clear `-5` movement cue.
- Kept existing card-frame format and DOM-rendered titles/descriptions; no rules, text, counts, or balance changed.
- Bumped `poorest-start-coins` and `red-back` `frontArt` cache keys plus the `cards.config.js` / `game.js` cache chain.

Files:
- `assets/cards/tadam_poorest_start_coins_front.png`
- `assets/cards/tadam_red-back_front.png`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Direct user visual task; no GD/QA handback requested.
- Used built-in image generation for the new `Красный откат` top illustration, then composited it into the existing 744x1039 card-face format.
- Checks passed: changed TADAM assets are `744x1039 RGBA`; `node --check src/cards.config.js`; `node --check src/game.js`; `git diff --check -- assets/cards/tadam_poorest_start_coins_front.png assets/cards/tadam_red-back_front.png src/cards.config.js src/game.js index.html`.

Open questions:
- None.

## 2026-06-22 00:37 - Dev 3

Changed:
- Completed `ACTIVE MOVE ONE FARTHER BOARD CLICK 2026-06-22 00:33 - Click highlighted field to choose Ещё шажок`.
- Made `Ещё шажок` post-roll target outlines clickable/focusable while `state.pendingMoveOneFarther` is active.
- Boosted target click resolves as `pay`; normal target click resolves as `skip`.
- Combined same-cell target click defaults to `skip`, so no coins are spent when destination would not change.
- Kept existing buttons and phone/controller actions on the same `resolveMoveOneFartherChoice(...)` path.
- Added pointer/hover/focus styling only for clickable post-roll target outlines.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source checks passed: board click handler only targets `[data-move-farther-target]`; stale/no pending state does nothing; combined target uses `skip`; button/phone resolver path remains.
- Browser smoke was not completed because local `127.0.0.1:5173` is unavailable in this environment.

Open questions:
- None.

## 2026-06-22 00:33 - GD

Changed:
- Added `ACTIVE MOVE ONE FARTHER BOARD CLICK 2026-06-22 00:33 - Click highlighted field to choose Ещё шажок` for `Dev 3`.
- Specified that clicking the boosted target should choose `pay`, clicking the normal target should choose `skip`, and combined same-target clicks should not charge coins.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Current code already has `state.pendingMoveOneFarther`, `renderPostRollTargetOutlines()`, and `resolveMoveOneFartherChoice(...)`; this task adds board-click affordance without changing card balance.

Open questions:
- None.

## 2026-06-22 00:26 - Art/UI 1

Changed:
- Replaced the `Зеленый попутчик` / `green-forward` TADAM infographic with a new rich fantasy board-game style art pass matching the newer `Монеты бедняку` direction.
- The new art shows a pawn on green fields, a forward path, and a clear `+5` movement cue.
- Kept the existing card-frame format and DOM-rendered title/description; no rules, text, counts, or balance changed.
- Bumped the `green-forward` `frontArt` cache key and the `cards.config.js` import cache key in `src/game.js`; kept the current host `game.js` cache key from the latest local UI update.

Files:
- `assets/cards/tadam_green-forward_front.png`
- `src/cards.config.js`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Direct user visual task; no GD/QA handback requested.
- Used built-in image generation for the new top illustration, then composited it into the existing 744x1039 card-face format.
- Checks passed: asset is `744x1039 RGBA`; `node --check src/cards.config.js`; `node --check src/game.js`; `git diff --check -- assets/cards/tadam_green-forward_front.png src/cards.config.js src/game.js index.html`.

Open questions:
- None.

## 2026-06-22 00:24 - Art/UI 2

Changed:
- Updated the player score cards to show the current total dice count instead of the dice bonus delta.
- The score stat now shows `1` by default instead of `+0`, and follows the shared dice-count setting/bonuses.
- Bumped the `src/game.js` cache key in `index.html`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- UI display-only change for the shared score card renderer; applies to both `Классический` and `Настольный`.
- Gameplay dice calculation, movement rules, card configs, and settings behavior were not changed.

Open questions:
- None.

## 2026-06-22 00:15 - Art/UI 2

Changed:
- Updated `Настольный` UI to use the same icons as `Классический`.
- Removed tabletop-only header/reference/action SVG usage from `index.html` and `styles.css`.
- Removed the unused `assets/ui/tabletop/*.svg` custom icon set from the workspace.
- Kept the lightweight tabletop color/material styling from the previous pass.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI/visual-only change; gameplay, card configs, board placement, card renderer, and `src/game.js` behavior were not changed.
- `Настольный` now reuses the existing standard header icons, reference card-back icons, and start-field icon.

Open questions:
- None.

## 2026-06-22 00:15 - Art/UI 1

Changed:
- Replaced the `Монеты бедняку` / `poorest-start-coins` TADAM infographic with the user-provided richer coin-transfer art.
- Kept the existing card-frame format and DOM-rendered title/description; no rules, text, counts, or balance changed.
- Bumped the `poorest-start-coins` `frontArt` cache key and the `cards.config.js` / `game.js` cache chain.

Files:
- `assets/cards/tadam_poorest_start_coins_front.png`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Direct user visual task; no GD/QA handback requested.
- Checks passed: asset is `744x1039 RGBA`; `node --check src/cards.config.js`; `node --check src/game.js`; `git diff --check -- assets/cards/tadam_poorest_start_coins_front.png src/cards.config.js src/game.js index.html`.

Open questions:
- None.

## 2026-06-22 00:05 - Art/UI 2

Changed:
- Reworked the final `Настольный` UI attempt into one lightweight tabletop theme block instead of layered experimental overrides.
- Removed the old competing tabletop CSS stack that styled board tiles and piled up radial/repeating gradients, heavy shadows, and icon filters.
- Kept tabletop styling scoped to UI shells, controls, settings/reference/log/history/phone surfaces, score cards, and dialogs; card faces and board tile visuals are no longer targeted by tabletop overrides.
- Simplified tabletop icon usage in `index.html`: header/reference/action affordances only, with noisy settings-label icons removed.
- Rebuilt all `assets/ui/tabletop/*.svg` as cleaner 64x64 SVGs without SVG filters or drop shadows.
- Bumped the `styles.css` and tabletop SVG cache keys in `index.html` / CSS URLs.

Files:
- `styles.css`
- `index.html`
- `assets/ui/tabletop/*.svg`
- `project-memory/updates.md`

Notes for others:
- This is the requested last careful attempt for `Настольный`; gameplay, card configs, card text, board placement, renderer logic, and `src/game.js` behavior were not changed.
- Checks passed: SVG XML parse for all `assets/ui/tabletop/*.svg`; no SVG filters/drop-shadows in the tabletop icon set; tabletop CSS block scan found no `backdrop-filter`, `blur()`, `drop-shadow`, `repeating-linear-gradient`, `.tile-*`, or card-face selectors; CSS brace balance; `node --check src/game.js`; `git diff --check -- styles.css index.html assets/ui/tabletop project-memory/updates.md`.
- Browser visual/performance smoke could not run because the environment blocks local port binding (`listen EPERM` on `127.0.0.1:5173`).
- If the user still sees unacceptable performance/visual quality locally, the next recommended step is to temporarily remove/hide `Настольный` from the UI selector and keep `Классический`.

Open questions:
- None.

## 2026-06-21 23:56 - Art/UI 2

Changed:
- Deepened the `Настольный` UI pass into a fantasy cartoon GUI layer: darker tavern/tabletop background, stronger carved wood surfaces, inset control areas, cream/gold typography, chunkier beveled buttons, active/hover/focus/disabled states, wooden score cards, and protected revealed-card overlays.
- Added a new original tabletop SVG icon set and wired it only into tabletop UI/header/settings/reference surfaces; `Классический` keeps the existing icons via hidden tabletop-only markup/CSS.
- Added tabletop-only icons for setup labels, reference toggles, phone/settings actions, log/history buttons, exact move, and top header actions.
- Kept card-face coin/dice icons and gameplay renderers unchanged so card text/layout is not affected.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `assets/ui/tabletop/reference.svg` — 64x64 SVG, visual-only, wired for tabletop header/reference.
- `assets/ui/tabletop/phone.svg` — 64x64 SVG, visual-only, wired for tabletop header/phone UI.
- `assets/ui/tabletop/settings.svg` — 64x64 SVG, visual-only, wired for tabletop header/settings UI.
- `assets/ui/tabletop/fullscreen.svg` — 64x64 SVG, visual-only, wired for tabletop header.
- `assets/ui/tabletop/coin.svg` — 64x64 SVG, visual-only, wired for tabletop setup labels.
- `assets/ui/tabletop/dice.svg` — 64x64 SVG, visual-only, wired for tabletop setup labels.
- `assets/ui/tabletop/new_game.svg` — 64x64 SVG, visual-only, wired for tabletop new game button.
- `assets/ui/tabletop/copy.svg` — 64x64 SVG, visual-only, wired for tabletop phone copy button.
- `assets/ui/tabletop/save.svg` — 64x64 SVG, visual-only, wired for tabletop history save button.
- `assets/ui/tabletop/log.svg` — 64x64 SVG, visual-only, wired for tabletop log/font UI.
- `assets/ui/tabletop/players.svg` — 64x64 SVG, visual-only, wired for tabletop setup labels.
- `assets/ui/tabletop/bots.svg` — 64x64 SVG, visual-only, wired for tabletop setup labels.
- `assets/ui/tabletop/steps.svg` — 64x64 SVG, visual-only, wired for tabletop move/steps UI.
- `assets/ui/tabletop/strength.svg` — 64x64 SVG, visual-only, wired for tabletop strength UI.
- `assets/ui/tabletop/field.svg` — 64x64 SVG, visual-only, wired for tabletop field/reference UI.
- `assets/ui/tabletop/cards.svg` — 64x64 SVG, visual-only, wired for tabletop card/reference UI.
- `assets/ui/tabletop/history.svg` — 64x64 SVG, visual-only, available for tabletop history UI.
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- This is UI/visual work only; gameplay, card configs, board placement, card art, field icons, card renderer, rules, and balance were not changed.
- New tabletop SVGs are original analogues in the reference direction, not copied from the reference image.
- Checks passed: SVG XML parse for all `assets/ui/tabletop/*.svg`; `node --check src/game.js`; CSS brace balance; `git diff --check -- styles.css index.html src/game.js project-memory/updates.md assets/ui/tabletop`.
- Browser visual smoke could not run because the environment blocks local port binding (`listen EPERM` on `127.0.0.1:5173`).

Open questions:
- None.

## 2026-06-21 23:50 - Art/UI

Changed:
- Rebuilt all 20 TADAM card-specific front infographics as clean parchment-native diagrams.
- Removed hard rectangular backing blocks and old TADAM-logo remnants from the custom TADAM face assets.
- Replaced invented card symbols with project-card miniatures for Good/Bad/Joe Shop references; `Плохо` now uses the actual Bad card visual instead of the purple skull card.
- Bumped TADAM `frontArt` cache keys and the `cards.config.js` / `game.js` cache chain.

Files:
- `assets/cards/tadam_*_front.png`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Direct user task; no GD/QA handback requested.
- Gameplay/card text/effects/counts were not changed.
- Preview contact sheet: `outputs/tadam_infographics_contact_sheet.png`.

Open questions:
- None.

## 2026-06-21 23:21 - Art/UI 2

Changed:
- Reworked the `Настольный` UI mode into a warm wooden cartoon board-game style.
- Added a final tabletop design-system override: wood/cream/gold variables, carved panels, chunky beveled buttons, dark inset controls, golden primary roll button, wooden score cards, reference/settings/phone/log/history surfaces, empty TADAM slots, and dialog/toast surfaces.
- Kept `Классический` scoped out by using only `body[data-ui-style="tabletop"]` selectors.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- CSS-only UI pass; gameplay, layout structure, card configs, board placement, rules, card renderer, and visual assets were not changed.
- The override intentionally avoids broad card-face button styling so revealed card faces keep their own layout and artwork.
- Checks passed: `git diff --check -- styles.css index.html project-memory/updates.md`.
- Browser smoke was not completed because the environment blocks local port binding (`listen EPERM` on `127.0.0.1:5173`).

Open questions:
- None.

## 2026-06-21 23:07 - Art/UI 2

Changed:
- Added small card-back icons before each card section label in the `Показать карты и поля` toggle panel.
- Added the `Старт` field icon before the `Поля` label.
- Adjusted reference toggle button layout so icons and text sit centered with stable spacing.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI-only markup/style update; reference behavior, cards, fields, gameplay, and configs were not changed.
- Checks passed: `git diff --check -- index.html styles.css project-memory/updates.md`.

Open questions:
- None.

## 2026-06-21 23:05 - Art/UI 2

Changed:
- Redrew `assets/icons/fullscreen_button.svg` as four thin golden corner marks without the heavy inner frame or arrow diagonals.
- Bumped the fullscreen icon cache key in `index.html`.

Files:
- `assets/icons/fullscreen_button.svg`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual-only SVG update; fullscreen behavior and layout were not changed.
- Checks passed: SVG XML parse; `git diff --check -- assets/icons/fullscreen_button.svg index.html project-memory/updates.md`.

Open questions:
- None.

## 2026-06-21 22:57 - Art/UI 2

Changed:
- Redrew the header phone icon as a thinner, cleaner line-art silhouette.
- Redrew `assets/icons/settings_gear.svg` as a lighter, more even line-art gear to match the other compact header icons.
- Changed the phone room copy feedback timing to show for 2 seconds, then fade out smoothly for 1 second before hiding.
- Bumped `styles.css`, `src/game.js`, and settings icon cache keys in `index.html`.

Files:
- `assets/icons/settings_gear.svg`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI-only visual/timing update; phone room copy behavior, room creation, gameplay, and configs were not changed.
- Checks passed: SVG XML parse; `node --check src/game.js`; `git diff --check -- assets/icons/settings_gear.svg index.html src/game.js styles.css project-memory/updates.md`.

Open questions:
- None.

## 2026-06-21 22:51 - Art/UI 2

Changed:
- Repositioned the phone room copy feedback so `Комната скопирована` appears centered above the phone header button.
- Removed the visible border from the feedback label and kept only a small soft backing with a float-up animation.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- UI-only styling change; phone room behavior, copying logic, and gameplay were not changed.
- Checks passed: `git diff --check -- styles.css index.html project-memory/updates.md`.

Open questions:
- None.

## 2026-06-21 17:06 - Art/UI

Changed:
- Redrew the full TADAM `frontArt` infographic set in a single warmer fantasy board-game style, using the successful `Монеты бедняку` direction as the reference.
- Replaced the previous tiny diagram/TADAM-burst-style visuals with larger top-card scenes: board pawns, tiles, cards, shop, portal, monster, coins, arrows, and readable effect values.
- Rebuilt all 20 TADAM face assets as `744x1039` RGBA PNGs.
- Updated all TADAM `frontArt` cache keys to `20260621-1626`.
- Bumped `cards.config.js` import and host `game.js` cache keys to `20260621-1626`.
- Saved review/source previews in `outputs/tadam_redrawn_frontart_contact_v8.png` and `outputs/tadam_infographic_sheet_redrawn_20260621.png`.

Files:
- `assets/cards/tadam_bad-consolation_front.png`
- `assets/cards/tadam_good-cashout_front.png`
- `assets/cards/tadam_green-extra-coins_front.png`
- `assets/cards/tadam_green-forward_front.png`
- `assets/cards/tadam_green-good_front.png`
- `assets/cards/tadam_jump-steal_front.png`
- `assets/cards/tadam_land-steal_front.png`
- `assets/cards/tadam_last-good-start_front.png`
- `assets/cards/tadam_last-step-plus_front.png`
- `assets/cards/tadam_monster-bribe_front.png`
- `assets/cards/tadam_monster-hunt_front.png`
- `assets/cards/tadam_poorest_start_coins_front.png`
- `assets/cards/tadam_portal-bad_front.png`
- `assets/cards/tadam_red-back_front.png`
- `assets/cards/tadam_red-bad_front.png`
- `assets/cards/tadam_red-extra-loss_front.png`
- `assets/cards/tadam_rich-weakness_front.png`
- `assets/cards/tadam_same-cell-duel_front.png`
- `assets/cards/tadam_shop-discount_front.png`
- `assets/cards/tadam_shop-surcharge_front.png`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual-only task: no TADAM rules, descriptions, counts, deck lifecycle, card effects, board logic, phone controller, or balance changed.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; all 20 TADAM `frontArt` PNGs are `744x1039` RGBA; `git diff --check`.
- Per user preference, no GD/QA handback was sent.

Open questions:
- None.

## 2026-06-21 17:02 - Art/UI 2

Changed:
- Centered the gear artwork inside `assets/icons/settings_gear.svg` by shifting the SVG gear group upward.

Files:
- `assets/icons/settings_gear.svg`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual-only SVG alignment tweak; no layout, JS behavior, or gameplay changed.
- Bumped the settings icon asset cache key in `index.html`.
- Checks passed: SVG XML parse; `git diff --check -- assets/icons/settings_gear.svg index.html project-memory/updates.md`.

Open questions:
- None.

## 2026-06-21 14:27 - Art/UI 2

Changed:
- Redrew `assets/icons/reference_cards.svg` as a minimal two-card silhouette icon.
- Removed the previous board/grid badge, suit symbols, and card ranks per user correction.

Files:
- `assets/icons/reference_cards.svg`
- `project-memory/updates.md`

Notes for others:
- Visual-only SVG asset update; no gameplay, layout, JS behavior, card config, or cache keys changed.
- Checks passed: SVG XML parse; `git diff --check -- assets/icons/reference_cards.svg`.

Open questions:
- None.

## 2026-06-21 14:19 - Art/UI 2

Changed:
- Completed `ACTIVE 2026-06-21 13:46 - Full TADAM infographic pass`.
- Created card-specific TADAM front-art PNG infographics for all 19 remaining TADAM cards.
- Kept the existing `poorest-start-coins` / `Монеты бедняку` baseline asset unchanged.
- Added `frontArt` fields to the matching TADAM card configs only.
- Bumped the `cards.config.js` import cache key in `src/game.js` and host `game.js` cache key in `index.html`.
- Marked the UI task DONE and added GD context handback; QA was not involved.

Files:
- `assets/cards/tadam_green-forward_front.png`
- `assets/cards/tadam_red-back_front.png`
- `assets/cards/tadam_green-good_front.png`
- `assets/cards/tadam_red-bad_front.png`
- `assets/cards/tadam_jump-steal_front.png`
- `assets/cards/tadam_land-steal_front.png`
- `assets/cards/tadam_monster-hunt_front.png`
- `assets/cards/tadam_same-cell-duel_front.png`
- `assets/cards/tadam_last-good-start_front.png`
- `assets/cards/tadam_last-step-plus_front.png`
- `assets/cards/tadam_shop-discount_front.png`
- `assets/cards/tadam_shop-surcharge_front.png`
- `assets/cards/tadam_portal-bad_front.png`
- `assets/cards/tadam_green-extra-coins_front.png`
- `assets/cards/tadam_red-extra-loss_front.png`
- `assets/cards/tadam_good-cashout_front.png`
- `assets/cards/tadam_bad-consolation_front.png`
- `assets/cards/tadam_monster-bribe_front.png`
- `assets/cards/tadam_rich-weakness_front.png`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- PNG dimension/mode check passed: all 20 TADAM `frontArt` assets exist as `744x1039` RGBA.
- Static source check passed: all 20 TADAM cards have `frontArt`; global `assets/cards/tadam_front.png` was not replaced.
- Checks passed: `node --check src/cards.config.js`; `node --check src/game.js`; `git diff --check`.
- No TADAM rules, balance, counts, descriptions, deck lifecycle, Google Sheet/CSV, or global TADAM face asset changed.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 13:46 - GD

Changed:
- Added `ACTIVE 2026-06-21 13:46 - Full TADAM infographic pass` for `Art / UI 2`.
- Defined an autonomous full-deck TADAM infographic pass using `Монеты бедняку` as the baseline.
- Listed all remaining TADAM cards to convert with card-specific `frontArt` assets.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- The task should follow `project-memory/README.md` / `TADAM Card Infographics`.
- Do not change TADAM rules, counts, descriptions, deck lifecycle, Google Sheet/CSV, or global `tadam_front.png`.

Open questions:
- None.

## 2026-06-21 13:43 - Art/UI

Changed:
- Added permanent TADAM infographic creation rules to `project-memory/README.md`.
- Documented the per-card `frontArt` approach, so new TADAM infographics replace the generic logo only on specific cards and do not affect the rest of the deck.
- Captured visual rules: compact upper-card infographic, visible gap before title, no hard rectangular backing, exact effect values, neutral-source coin flow, class-style player pawns, and no baked title/full rules text inside the image.

Files:
- `project-memory/README.md`
- `project-memory/updates.md`

Notes for others:
- Documentation-only update; no gameplay, card config, assets, layout CSS, or cache keys changed.
- Per user preference, no GD/QA handback was sent.

Open questions:
- None.

## 2026-06-21 14:04 - Art/UI 2

Changed:
- Updated the active `ТАДАМ!` panel slots to render filled cards through the shared revealed TADAM card face (`tadamCardMarkup`) instead of the older compact slot text.
- Reused the inert card-face wrapper helper so active TADAM panel cards keep the same title, custom front art, icon rendering, and text placement as gameplay revealed cards.
- Removed the filled-slot extra background/border when a real card face is rendered inside it.
- Bumped `styles.css` and `src/game.js` cache keys.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 13:36 - Art/UI 2

Changed:
- Added the new reference header icon asset `assets/icons/reference_cards.svg`.
- Marked `ACTIVE 2026-06-21 13:16 - Reference cards/fields header icon` as DONE in the UI inbox.
- Added GD context handback for the reference icon; QA was not involved.
- Added `artifact_desr` to the local card CSV mirror and live Google Sheet `Cards Config` headers.
- Split `event/magic-wallet` text so `description` is `Последний игрок получает артефакт` and `artifact_desr` is `Получи 5 монет в начале хода. Если тебя обгоняет игрок, передай артефакт ему`.
- Added local `artifact_desr` values for `Меч Героя` and `Анти-Плохо`, and made the shared card-face renderer prefer explicit `artifact_desr`.
- Bumped `src/game.js` / `src/cards.config.js` cache keys.

Files:
- `assets/icons/reference_cards.svg`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `cards-google-sheet.csv`
- Google Sheet `Cards Config`
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Google Sheet readback passed for `event!A9:O9`: `artifact_desr` has the requested wallet artifact text.
- Google Sheet header readback passed for `good`, `bad`, `tadam`, `shop`, and `event`: column O is `artifact_desr`.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; SVG XML parse; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 13:24 - Dev 1

Changed:
- Completed `ACTIVE REFERENCE HEADER PANEL 2026-06-21 13:16 - Move cards/fields reference out of settings`.
- Removed the `Показать карты и поля` category selector from `settingsPanel`.
- Added a separate header icon button `referenceHeaderBtn` wired to `assets/icons/reference_cards.svg`, placed between settings and phone.
- Moved the reference category buttons into the lower reference panel and kept the reference output before `Хроника`.
- Completed `ACTIVE FULLSCREEN LOWER SPACING 2026-06-21 13:21 - Add roll-strip-sized gap before lower panels in fullscreen`.
- Added fullscreen-only spacing above `.lower-grid`, so `Хроника`, `История`, the reference panel, and lower content start after a control-strip-sized gap.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Did not change reference card/field effects, card configs/counts/texts, phone room behavior, fullscreen API/button behavior, board/routes, gameplay rules, or controller protocol.
- Checks passed: `node --check src/game.js`; `git diff --check`; static/source checks for header order, settings/reference separation, category controls, reference toggle state, fullscreen-only `.lower-grid` spacing, and unchanged normal `.lower-grid` margin.
- Browser smoke was not completed in this environment.
- `assets/icons/reference_cards.svg` is still expected from Art/UI if not present locally; the button is wired to that path.

Open questions:
- None.

## 2026-06-21 13:21 - GD

Changed:
- Added `ACTIVE FULLSCREEN LOWER SPACING 2026-06-21 13:21 - Add roll-strip-sized gap before lower panels in fullscreen` for `Dev 1`.
- Specified that fullscreen lower panels should start after a vertical gap roughly equal to the board control strip / roll button block height.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is fullscreen layout spacing only. Normal layout, panel visibility, gameplay, phone controller, and reference behavior should remain unchanged.

Open questions:
- None.

## 2026-06-21 13:16 - GD

Changed:
- Added Art/UI task `ACTIVE 2026-06-21 13:16 - Reference cards/fields header icon` for `Art / UI 2`.
- Added Dev task `ACTIVE REFERENCE HEADER PANEL 2026-06-21 13:16 - Move cards/fields reference out of settings` for `Dev 1`.
- Specified that `Показать карты и поля` should become a separate header icon button left of the phone button.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Art/UI 2 owns only the icon asset `assets/icons/reference_cards.svg`; Dev 1 owns the panel move and button wiring.

Open questions:
- None.

## 2026-06-21 13:12 - Art/UI

Changed:
- Slightly reduced the custom infographic art on `poorest-start-coins` / `Монеты бедняку` so there is a cleaner gap between the top art and the card title.
- Updated the card-specific `frontArt` cache key to `20260621-0343`.
- Bumped the `cards.config.js` import and host `game.js` cache keys to `20260621-0343`.

Files:
- `assets/cards/tadam_poorest_start_coins_front.png`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual-only adjustment; no TADAM rules, payout amount, deck counts, board logic, phone controller, or balance changed.
- Other TADAM cards still use the standard `assets/cards/tadam_front.png`.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; PNG dimensions check; source scan for the single `frontArt`; `git diff --check`.
- Per user preference, no GD/QA handback was sent.

Open questions:
- None.

## 2026-06-21 03:42 - Art/UI 2

Changed:
- Added automatic artifact effect text on revealed artifact Event cards, so `Меч Героя` and `Анти-Плохо` now explain what the artifact gives after the acquisition condition.
- Kept the artifact effect as part of the shared card-face renderer, so settings reference cards inherit the same text without separate manual layout.
- Added compact styling for the artifact-effect line and included it in Event card density calculation.
- Bumped `styles.css` and `src/game.js` cache keys in `index.html`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 03:32 - Art/UI

Changed:
- Added a card-specific TADAM face asset for `poorest-start-coins` / `Монеты бедняку`: `assets/cards/tadam_poorest_start_coins_front.png`.
- Connected that asset through `frontArt` in `src/cards.config.js`, so only this card replaces the generic TADAM icon with the coin-reward infographic.
- Kept the standard `assets/cards/tadam_front.png` path as the default for all other TADAM cards.
- Used `+3` in the infographic to match the current card effect amount in config.
- Bumped the `cards.config.js` import key to `20260621-0326`; the host `game.js` cache key remains on the fresher `20260621-0342` from the parallel header-control update.

Files:
- `assets/cards/tadam_poorest_start_coins_front.png`
- `src/cards.config.js`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual/config hook only; no TADAM rules, payout amount, deck counts, phone controller, board logic, or balance changed.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; PNG dimensions check; source scan that `frontArt` is only on `poorest-start-coins`; `git diff --check`.
- Per user preference, no GD/QA handback was sent.

Open questions:
- None.

## 2026-06-21 03:31 - Art/UI 2

Changed:
- Swapped the top header order of phone and settings controls so the icon group now reads phone, settings, fullscreen.
- Moved `settingsToggle` into the shared header icon group and updated the setup-row grid for three icon buttons.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 03:25 - Dev 3

Changed:
- Completed `ACTIVE SHOP CHOICE CARD SPLIT 2026-06-21 03:20 - Split 3-card choice from unlimited buying`.
- Updated `shop-choice-3-cost-3` / `Привилегия Джо` so it only gives a 3-card Joe Shop offer.
- Changed `Привилегия Джо` shortTitle to `Выбор из 3` and description to `Во время покупок карт Лавка Джо выбирай из 3 карт`.
- Removed fixed `cost: 3` from the card effect, CSV, and Google Sheet row.
- Removed the runtime `joeShopCardCost(player)` override that forced this card's price to 3 coins.
- Kept `joeShopOfferCount(player)` and `shop-unlimited-buy` behavior unchanged.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `src/cards.config.js`
- `cards-google-sheet.csv`
- Google Sheet `Cards Config` / `shop!A10:N10`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source checks passed: player-facing local config/CSV no longer says `плати только 3 монеты`; `shop-choice-3-cost-3` still makes the ordinary Shop offer size 3 but no longer forces cost 3.
- Google Sheet readback passed for `shop!A10:N10`: shortTitle `Выбор из 3`, empty `cost`, notes `amount offer count only; ordinary Shop price still applies`, count `3`, description `Во время покупок карт Лавка Джо выбирай из 3 карт`.
- Browser smoke was not completed because the local server is unavailable in this environment.

Open questions:
- None.

## 2026-06-21 03:20 - GD

Changed:
- Added `ACTIVE SHOP CHOICE CARD SPLIT 2026-06-21 03:20 - Split 3-card choice from unlimited buying` for `Dev 3`.
- Clarified that `Привилегия Джо` should only make ordinary Joe Shop show 3 cards and should no longer set price to 3 coins.
- Kept `Безлимит Джо` as the separate unlimited-buy card.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Sync local config, CSV, and Google Sheet. Do not change Joe Auction, Black Market, free Shop rewards, or finite Shop lifecycle.

Open questions:
- None.

## 2026-06-21 03:24 - Art/UI 2

Changed:
- Fixed card face title iconization regression: `iconizeHtml(...)` now protects `.card-face-title` markup before replacing coin/dice words with icons.
- Confirmed `Кубик судьбы` remains plain text in title while description text still gets dice/coin icons.
- Bumped the `src/game.js` cache key in `index.html`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Added a local string-level smoke check for protected title iconization.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 03:08 - Dev 1

Changed:
- Completed `ACTIVE FULLSCREEN FULL UI 2026-06-21 03:06 - Fullscreen should keep normal UI panels`.
- Removed fullscreen-only hiding of `.log-panel`, `.history-panel`, and `.lower-grid`.
- Kept fullscreen app-shell background/viewport/overflow behavior, so fullscreen can scroll with the normal UI.
- Added GD context handback only; QA was not involved.

Files:
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No fullscreen button/API behavior, game rules, board routes/layout, phone controller, log/history content, settings behavior, cards, deck behavior, or dice logic changed.
- Checks passed: `node --check src/game.js`; `git diff --check`; static/source checks that fullscreen no longer hides `log-panel`, `history-panel`, or `lower-grid`, while fullscreen `app-shell` overflow remains.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 03:15 - Art/UI 2

Changed:
- Centered gameplay card reveal prompts within the map area instead of inheriting the regular top toast position.
- Added card-reveal-specific `visible` and `fading` transforms so the reveal animation stays centered.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 03:06 - GD

Changed:
- Added `ACTIVE FULLSCREEN FULL UI 2026-06-21 03:06 - Fullscreen should keep normal UI panels` for `Dev 1`.
- Clarified that fullscreen should preserve the normal interface, including `Хроника`, `История`, and lower UI blocks.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Current CSS hides `.log-panel`, `.history-panel`, and `.lower-grid` in fullscreen. This task should remove/override that field-only behavior without changing fullscreen button logic or gameplay.

Open questions:
- None.

## 2026-06-21 03:07 - Art/UI 2

Changed:
- Set the default font mode back to `Стандартный`.
- Updated the initial body font dataset, settings dropdown selected option, and JS fallback default.
- Bumped the `src/game.js` cache key in `index.html`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 03:03 - Art/UI 2

Changed:
- Replaced the `Приключение` font implementation from `Alegreya Sans SC` to `Rubik` for stronger readability.
- Removed the old Alegreya-specific visual size compensation by resetting `font-size-adjust` for `Приключение`.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 02:57 - Art/UI 2

Changed:
- Moved the dice count selector from the top setup row into the settings panel.
- Changed the main settings panel grid to 3 columns so the setting blocks sit three per row on wider layouts.
- Updated responsive setup-row columns after removing dice count from the header row.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 02:45 - Art/UI 2

Changed:
- Increased the visual size of the `Приключение` font mode with `font-size-adjust`, so Alegreya Sans SC reads closer to the standard font at the same UI sizes.
- Kept the correction scoped to `body[data-font-style="adventure"]`; `Стандартный` resets to normal font sizing.
- Bumped the `styles.css` cache key in `index.html`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 02:35 - Dev 1

Changed:
- Completed direct user follow-up for the phone settings compact block.
- Replaced the always-visible grouped phone settings card with a separate `Настройки телефонов` button.
- The button toggles the settings body below it inside the phone-room panel.
- Preserved `#phoneRoomMode`, `#phoneRoomDice`, current mode options/default, and dice-hide checkbox behavior.
- Bumped the stylesheet cache key in `index.html` to `20260621-0226`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- No phone room create/recreate behavior, room code/link/copy UI, controller mode values/defaults, dice display behavior, phone protocol, or gameplay changed.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`; static/source checks for toggle button, hidden body, preserved ids/options, JS toggle refs/listener, and mobile stack.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 02:39 - Art/UI 2

Changed:
- Fixed the settings header button so it keeps the SVG settings icon instead of being overwritten with text by responsive JS.
- Kept the accessible label and tooltip as `Настройки`.
- Bumped the `src/game.js` cache key in `index.html`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding.

Open questions:
- None.

## 2026-06-21 02:34 - Art/UI 2

Changed:
- Added the `Alegreya Sans SC` Google Font as the new `Приключение` font mode.
- Added a `Шрифт` dropdown in settings with `Стандартный` and `Приключение`; `Приключение` is selected by default.
- Added shared `data-font-style` switching so gameplay cards, settings reference cards, and the rest of the UI inherit the selected font from one place.
- Added the selected font mode to collected game settings/history snapshots.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke was not completed because this environment blocks local port binding (`python3 -m http.server` failed with `Operation not permitted`).

Open questions:
- None.

## 2026-06-21 02:25 - Dev 3

Changed:
- Completed direct user override: monster defeat reward should give `Сила +1` instead of a Joe Shop card.
- Updated monster defeat reward text to `Сила +1` plus the existing unchanged coin tiers.
- Removed the monster-defeat `drawFreeShopCard(...)` reward call and replaced it with `addBattleBonus(player, 1)`.
- Kept `resolveStartStrengthReward(player)` / `Домашний старт` separate, so any return-to-start strength bonus still logs/stacks independently.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- This supersedes the 2026-06-21 02:15 Dev 3 handback that restored Joe Shop card rewards on monster defeat.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source checks passed: defeat reward text is `Сила +1` plus unchanged coins; monster defeat no longer calls free Shop reward; start-strength remains separate.
- Browser smoke was not completed because the local server is unavailable in this environment.

Open questions:
- None.

## 2026-06-21 02:15 - Dev 3

Changed:
- Completed `ACTIVE MONSTER DEFEAT SHOP REWARD 2026-06-21 02:10 - Defeat reward must grant Joe Shop card, not only +1 strength`.
- Fixed `drawFreeShopCard(player, ...)` so free Joe Shop rewards keep the drawn physical Shop card with the player instead of immediately returning it to Shop discard.
- Preserved monster defeat coin rewards and tier text: `Лавка Джо`, `Лавка Джо + 5 монет`, `Лавка Джо + 10 монет`, `Лавка Джо + 20 монет`.
- Confirmed `resolveStartStrengthReward(player)` remains a separate return-to-start `Домашний старт` trigger and does not replace/suppress the Joe Shop reward.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source checks passed: monster defeat still calls the Shop-card reward path, coin reward path is unchanged, start-strength remains separate, and free Shop reward no longer discards the drawn card immediately after adding it to owned Shop cards.
- Browser smoke was not completed because the local server is unavailable in this environment (`127.0.0.1:5173` unreachable; fresh `server.js` starts fail with `listen EPERM`).

Open questions:
- None.

## 2026-06-21 02:10 - GD

Changed:
- Added `ACTIVE MONSTER DEFEAT SHOP REWARD 2026-06-21 02:10 - Defeat reward must grant Joe Shop card, not only +1 strength` for `Dev 3`.
- Clarified that monster-defeat coin rewards stay unchanged; the fix is about preserving/communicating the Joe Shop card reward.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Inspect both the Shop-card reveal/grant path and the separate `Домашний старт` start-return strength trigger. Do not change Shop deck counts or defeat coin amounts.

Open questions:
- None.

## 2026-06-21 02:09 - Art/UI

Changed:
- Redrew `assets/icons/settings_gear.svg` for the compact settings header button.
- New icon uses a simpler, larger gear silhouette with dark medallion backing and warm gold face for better small-size readability.
- Bumped the settings icon cache key in `index.html` to `20260621-0205`.

Files:
- `assets/icons/settings_gear.svg`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Icon asset/cache-only; no settings toggle behavior, layout sizing, phone room behavior, gameplay, cards, dice, or active card text work changed.
- Checks passed: settings icon SVG/source check, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-21 02:08 - Art/UI 2

Changed:
- Fixed card-face description line splitting so punctuation cannot become its own visual line.
- Added shared `mergeLeadingPunctuationLines(...)` for normal and Event card description renderers.
- Problem case `Каждый раз, когда кто-то разыгрывает карту Тадам!, получи 3 монеты` now keeps `, получи...` attached to the previous text instead of rendering a standalone comma line.
- Bumped host script cache key to `20260621-0126`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- UI renderer-only fix; no card text, card config, rules, rewards, deck lifecycle, assets, phones, dice, or balance changed.
- Checks passed: local text-splitting readback for `Эхо ТАДАМ!`; `node --check src/game.js`; `git diff --check`.
- Browser smoke was not run in this pass.

Open questions:
- None.

## 2026-06-21 02:07 - Dev 1

Changed:
- Completed `ACTIVE PHONE SETTINGS COMPACT BLOCK 2026-06-21 02:04 - Merge phone mode and dice display settings`.
- Wrapped `Режим` and `Не отображать кубики` into one grouped `Настройки телефонов` block inside the phone-room panel.
- Preserved `#phoneRoomMode`, `#phoneRoomDice`, current mode options/default, and dice-hide checkbox behavior.
- Added desktop two-column layout inside the grouped card and mobile one-column stacking with no horizontal-scroll intent.
- Bumped the stylesheet cache key in `index.html` to `20260621-0204`.
- Added GD context handback only; QA was not involved.

Files:
- `index.html`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No phone room create/recreate behavior, room code/link/copy UI, controller mode values/defaults, dice display behavior, phone protocol, gameplay, cards, routes, or deck logic changed.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`; static/source checks for grouped settings block, preserved ids/options/defaults, desktop two-column layout, and mobile stack override.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 02:04 - GD

Changed:
- Added `ACTIVE PHONE SETTINGS COMPACT BLOCK 2026-06-21 02:04 - Merge phone mode and dice display settings` for `Dev 1`.
- Required the phone-room panel to combine `Режим` and `Не отображать кубики` into one grouped phone settings block.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is phone-room layout polish only. Do not change room lifecycle, controller mode values/defaults, dice display behavior, phone protocol, or gameplay.

Open questions:
- None.

## 2026-06-21 01:43 - Art/UI

Changed:
- Converted the `Настройки` header control from a text button into a compact icon button using `assets/icons/settings_gear.svg`.
- Rebalanced the top settings grid so the compact settings button frees horizontal space for a wider `Новая игра` button.
- Bumped the stylesheet cache key to `20260621-0134`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI/layout-only; settings toggle behavior, phone room behavior, reference debug actions, gameplay rules, cards, dice, and balance unchanged.
- Checks passed: settings icon/new game stretch source check, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-21 01:42 - Dev 1

Changed:
- Completed `ACTIVE REFERENCE APPLY EFFECTS 2026-06-21 01:36 - Click reference cards/fields to trigger effects`.
- Made reference cards and field items keyboard/click activatable with `role="button"`, `tabindex="0"`, data hooks, pointer cursor, hover/focus ring, and applying state.
- Added reference action guard so clicks are ignored while another reference effect/prompt, animation, pending choice, shop, or roll/action prompt is active.
- Good/Bad/Event reference cards now create runtime reference copies, reveal through the existing card UI, and resolve through `applyCardEffect(...)` without drawing/removing physical deck cards.
- Shop reference cards now grant the selected Shop item to the active player for free/debug without touching Shop deck/discard.
- TADAM reference cards now reveal and activate through the existing active TADAM lifecycle/max-3 behavior.
- Reference runtime copies are marked and skipped by `discardCardToDeck(...)`, so they do not pollute physical deck discard piles.
- Field reference items now trigger supported field effects for the active player without moving them first; context-only fields such as `Старт`, `Финиш`, and `Враг` show a short log/toast instead of crashing.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No card configs/counts/texts, Google Sheet/CSV, normal draw/shop purchase/field landing behavior, phone controller, history/autosave, dice math, routes, or balance changed.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`; static/source checks for reference data hooks, panel listeners, runtime reference copy marking, discard guard, Shop grant path, TADAM lifecycle path, field trigger path, and clickable CSS.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 01:37 - Art/UI

Changed:
- Darkened the `Играть с телефонами` header icon stroke and reduced its warm glow.
- Bumped the stylesheet cache key to `20260621-0133`.

Files:
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- CSS-only visual tweak; no phone room behavior, controller protocol, gameplay rules, reference/debug actions, or active GD task changed.
- Checks passed: phone icon darker source check, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-21 01:36 - GD

Changed:
- Added `ACTIVE REFERENCE APPLY EFFECTS 2026-06-21 01:36 - Click reference cards/fields to trigger effects` for `Dev 1`.
- Defined reference-panel clicks as debug/playtest actions targeting the current active player.
- Specified that reference card clicks should not consume physical deck copies, except normal active TADAM lifecycle behavior if used.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This should reuse real effect resolvers where possible, but must not alter card configs, Google Sheet/CSV, or normal draw/shop/landing behavior.

Open questions:
- None.

## 2026-06-21 01:35 - Dev 1

Changed:
- Completed `ACTIVE BOARD CONTROL STRIP BELOW FIELD 2026-06-21 01:32 - Move board header controls under board`.
- Moved the existing `.board-header` block below `.map-wrap` inside `.board-panel`.
- Kept the existing dice value, current-field card, turn action chips/pending action UI, and `Бросить` button markup and ids intact.
- Changed the base `.board-header` divider from a bottom border to a top border so it reads as a lower control strip.
- Updated the coarse mobile board grid so the order is map first, then dice/current field/actions, then roll button.
- Bumped the stylesheet cache key in `index.html` to `20260621-0132`.
- Added GD context handback only; QA was not involved.

Files:
- `index.html`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No gameplay rules, control text/content, dice logic, phone controller behavior, active-player animation, cards/decks, board routes/layout, history, or log behavior changed.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`; static/source checks for `.map-wrap` before `.board-header`, CSS cache bump, bottom-strip border, and mobile map-before-controls grid order.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 01:32 - GD

Changed:
- Added `ACTIVE BOARD CONTROL STRIP BELOW FIELD 2026-06-21 01:32 - Move board header controls under board` for `Dev 1`.
- Specified that the current `.board-header` block should move below `.map-wrap` without changing dice, controls, phone behavior, rules, cards, or board layout.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a layout-only change. The control strip should remain functionally identical and adapt on desktop/mobile.

Open questions:
- None.

## 2026-06-21 01:26 - Art/UI 2

Changed:
- Reworked the embedded TADAM `+5` coin cue after user feedback.
- Made the whole TADAM tile icon art larger inside the 512px canvas while keeping transparent margins.
- Made the `+5` and coin larger relative to the full art.
- Removed the UI-pill look: the reward cue is now chunky game-style lettering with dark ink outline, gold fill, a project coin, and burst strokes integrated into the TADAM explosion.
- Bumped the TADAM icon URL and host script cache keys to `20260621-0118`.

Files:
- `assets/icons/tadam_512.png` — 512x512 PNG RGBA, transparent, status: `wired`.
- `outputs/tadam_512_before_large_plus5_rework_20260621_0118.png` — previous embedded-marker version backup.
- `outputs/tadam_512_large_plus5_preview.png` — large/small readability preview.
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual asset/cache-only pass; no TADAM reward logic, card lifecycle, active TADAM panel, movement, dice, phones, or balance changed.
- The icon was edited by deterministic local raster compositing from the existing TADAM art and project coin asset.
- Checks passed: PNG audit `512x512 RGBA`, transparent corners, alpha bbox `(24, 60, 488, 453)`; `node --check src/game.js`; `git diff --check`; no remaining `tile-reward-badge` / `tileRewardBadgeMarkup` references.

Open questions:
- None.

## 2026-06-21 01:24 - Dev 1

Changed:
- Completed `ACTIVE PHONE ROOM REOPEN TOAST 2026-06-21 01:21 - Do not show copy toast on simple panel reopen`.
- Header phone button now records whether a room existed before opening the panel.
- If the room already existed, reopening the panel reuses it and publishes a phone snapshot without copying the link or showing `Комната скопирована`.
- First header open with no room still creates/copies and can show the single-instance toast.
- Explicit `Скопировать ссылку` now shows the same single-instance header toast.
- Explicit `Пересоздать комнату` now recreates, copies the new link, and can show the single-instance toast.
- Kept room reuse/recreate contract, controller modes, clipboard/link formatting, and gameplay unchanged.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`; static/source checks for no-toast existing-room reopen, explicit copy toast, recreate-copy path, and retained single-instance timer behavior.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 01:21 - GD

Changed:
- Added `ACTIVE PHONE ROOM REOPEN TOAST 2026-06-21 01:21 - Do not show copy toast on simple panel reopen` for `Dev 1`.
- Clarified that `Комната скопирована` should not appear when the phone panel is reopened for an already-existing room.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Preserve single-instance toast behavior, but trigger it only on actual copy/create-copy actions, not on ordinary existing-room reuse.

Open questions:
- None.

## 2026-06-21 01:16 - Dev 1

Changed:
- Completed `ACTIVE PHONE ROOM COPY TOAST 2026-06-21 01:13 - Show one Комната скопирована toast at a time`.
- Made the phone-room header copy feedback use one fixed text source: `Комната скопирована`.
- `setPhoneRoomHeaderFeedback()` now always reuses the existing `#phoneRoomHeaderFeedback` element, clears the old hide timer, resets visibility state, and starts a fresh 2-second timer from the latest copy action.
- Kept create/recreate room behavior, clipboard/link selection mechanics, controller modes, room code/link formatting, and gameplay unchanged.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`; static/source checks for fixed toast text, single existing toast element reuse, old timer clearing, and 2-second hide timer.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 01:14 - Art/UI 2

Changed:
- Embedded the `+5` coin reward cue directly into the TADAM tile icon art.
- Replaced `assets/icons/tadam_512.png` in place with a 512x512 transparent PNG that includes a gold `+5` marker and the existing project coin icon.
- Added an image cache key for the TADAM icon URL and bumped the host script cache key to `20260621-0112`.
- Confirmed the separate overlay `tile-reward-badge` implementation is gone from `src/game.js` / `styles.css`.

Files:
- `assets/icons/tadam_512.png` — 512x512 PNG RGBA, transparent, status: `wired`.
- `outputs/tadam_512_before_plus5_embedded_20260621_0110.png` — previous icon backup.
- `outputs/tadam_512_plus5_embedded_preview.png` — large/small readability preview.
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual asset/cache-only pass; no TADAM reward logic, card lifecycle, active TADAM panel, movement, dice, phones, or balance changed.
- The icon was edited by deterministic local raster compositing, not generative redraw, to preserve the existing TADAM art.
- Checks passed: PNG audit `512x512 RGBA` with transparent corners; `node --check src/game.js`; `git diff --check`; `rg` found no remaining `tile-reward-badge` / `tileRewardBadgeMarkup` references.

Open questions:
- None.

## 2026-06-21 01:13 - GD

Changed:
- Added `ACTIVE PHONE ROOM COPY TOAST 2026-06-21 01:13 - Show one Комната скопирована toast at a time` for `Dev 1`.
- Required phone-room copy confirmation to reuse/refresh a single visible toast instead of stacking duplicates.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a small phone-room UI polish task only. It should not affect room creation, clipboard/link logic beyond toast timing, controller modes, or gameplay.

Open questions:
- None.

## 2026-06-21 01:12 - Dev 1

Changed:
- Completed `ACTIVE REMOVE TADAM TILE BADGES 2026-06-21 01:09 - Remove overlay +5 badges from TADAM tiles`.
- Removed the separate overlay `+5` coin badge insertion from board tile rendering.
- Removed the now-unused `tileRewardBadgeMarkup(...)` helper.
- Removed `.tile-reward-badge` CSS and its field2/coin-icon sizing rules.
- Kept normal TADAM icon rendering and kept tooltip/current-field text that mentions the 5-coin reward.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No TADAM reward/rules, deck/card lifecycle, active TADAM panel, card faces, movement, dice, phones, or balance changed.
- Checks passed: `node --check src/game.js`; `git diff --check`; `rg` found no remaining `tileRewardBadge` / `tile-reward-badge` / `reward-badge` references in `src/game.js` or `styles.css`.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 01:09 - GD

Changed:
- Added `ACTIVE REMOVE TADAM TILE BADGES 2026-06-21 01:09 - Remove overlay +5 badges from TADAM tiles` for `Dev 1`.
- Updated direction: Art/UI will put the coin cue directly into the TADAM icon, so the separate tile overlay badge should be removed.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Remove only the overlay badge implementation. Keep TADAM reward/rules and normal TADAM tile rendering intact.

Open questions:
- None.

## 2026-06-21 01:09 - Dev 1

Changed:
- Completed `ACTIVE PHONE ROOM REOPEN 2026-06-21 01:04 - Do not recreate existing room on panel reopen`.
- Split phone-room creation into explicit recreate vs idempotent ensure behavior.
- Header phone button now uses the non-recreate path: if a room code already exists, reopening the panel reuses the same room/link and connected-phone state instead of closing and replacing it.
- Explicit `Пересоздать комнату` still calls the default recreate path and remains the only way to replace an existing room.
- Added a guard so the header button ignores clicks while a phone room request is already in flight.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No controller modes, connected-phone protocol, room code/link formatting, `Не отображать кубики`, fullscreen, gameplay rules, cards, dice, or board logic changed.
- Checks passed: `node --check src/game.js`; `git diff --check`; static/source checks for non-recreate header path and explicit recreate button path.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 01:05 - Art/UI

Changed:
- Equalized the horizontal widths of the phone-room `Ссылка` block and `Скопировать ссылку` button.
- Kept the room code as a compact highlighted column and made the link/copy columns share the remaining space equally.
- Bumped the stylesheet cache key to `20260621-0057`.

Files:
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- CSS/layout-only; no phone room behavior, protocol, room recreation logic, controller actions, or active GD reopen task changed.
- Checks passed: phone details equal columns source check, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-21 01:04 - GD

Changed:
- Added `ACTIVE PHONE ROOM REOPEN 2026-06-21 01:04 - Do not recreate existing room on panel reopen` for `Dev 1`.
- Clarified that reopening/toggling the phone panel must reuse an existing room; only `Пересоздать комнату` may create a replacement room.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a phone-room lifecycle/UI bugfix only. It should not affect controller modes, phone protocol, fullscreen, or gameplay.

Open questions:
- None.

## 2026-06-21 01:04 - Dev 1

Changed:
- Completed `ACTIVE TADAM TILE COIN BADGE 2026-06-21 01:00 - Show +5 coin bait on TADAM fields`.
- Added a permanent compact `+5` coin badge to every board tile whose type is `tadam`.
- Badge uses the existing coin icon via `coinIcon()` and is inserted during board shell construction, so it is visible before landing.
- Styled the badge as a small gold reward marker in the lower-left corner, below route/preview outlines and token layer so it should not cover path outlines, monster numbers, or player tokens.
- Updated TADAM tile tooltip/title to `ТАДАМ! — возьми карту Тадам и получи 5 монет`.
- Updated current-field effect text to `возьми карту Тадам и получи 5 монет`.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No TADAM deck/card lifecycle, reward logic, active TADAM panel, card faces, other field types, dice, movement, phones, or balance changed.
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Static/source checks passed: badge is only for `tadam`, uses existing coin icon, tooltip/effect text mention 5 coins, and landing still calls existing `drawTadamCard(player)`.
- Browser smoke was not completed: `127.0.0.1:5173` returned no page and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 01:00 - GD

Changed:
- Added `ACTIVE TADAM TILE COIN BADGE 2026-06-21 01:00 - Show +5 coin bait on TADAM fields` for `Dev 1`.
- Chose a small permanent `+5` coin badge on TADAM board tiles so players know before landing that the field gives 5 coins.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a board readability/UI task only. It should not change TADAM card lifecycle or the active TADAM panel.

Open questions:
- None.

## 2026-06-21 00:57 - Art/UI

Changed:
- Polished the phone-room settings panel after the header-button move.
- Made the active phone header button less bright with a softer border/glow and muted light phone icon.
- Removed the visible `Шейк` settings block from the phone-room panel.
- Made the room code block larger and more visually important.
- Equalized the vertical size of the code, link, and copy blocks in the phone-room details row.
- Bumped the stylesheet cache key to `20260621-0056`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI/layout-only; phone room protocol still treats missing `#phoneRoomShake` as shake off through the existing optional lookup.
- No controller actions, room API, gameplay rules, cards, dice, balance, or Dev 1 phone field preview behavior changed.
- Checks passed: phone panel polish source check, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-21 00:56 - Dev 1

Changed:
- Completed `ACTIVE PHONE FIELD PREVIEW 2026-06-21 00:50 - Show Показать поле on phone controller`.
- Added explicit phone actions `field-preview` / `field-preview-return`.
- Phone snapshot now shows `Показать поле` to the active owner of a host card/portal choice when the host choice offers field preview.
- While preview is active, the same owner phone gets `Вернуться к выбору`.
- Phone action reuses existing host handlers: card-choice preview calls `setChoiceFieldPreviewMode(...)`; portal preview calls `setPortalPreviewMode(...)`.
- Inactive phones do not receive preview actions because all preview actions are gated by `playerId`.
- Updated controller rendering so both full controller and big-button layouts can show preview/return actions, including larger/more complex choice sets and auction bid prompts.
- Bumped host `game.js` and phone `controller.js` cache keys to `20260621-0055`.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `src/controller.js`
- `index.html`
- `controller.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No gameplay rules, card effects, movement, dice math, room creation/copy flow, controller defaults, board placement, or balance changed.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source checks passed: preview actions exist; owner gating uses `pendingCardChoice.playerId` / `pendingChoice.playerId`; host preview handlers are reused; full and big-button controller paths include preview kinds; controller/host cache keys are fresh.
- Browser smoke was not completed: `127.0.0.1:5173` was unreachable in this pass and starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 00:51 - Art/UI 2

Changed:
- Renamed Shop card `reroll-one-move-die` from `Переброс маршрута` to `Ещё раз`.
- Synced the title in local card config, local CSV mirror, and Google Sheet `Cards Config` / `shop`.
- Bumped card config import and host script cache keys to `20260621-0048`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- Google Sheet `Cards Config` / `shop`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Title-only card data change; shortTitle, description, cost, count, effect id, gameplay behavior, UI layout, and assets were not changed.
- Readback passed: Google Sheet `shop!A15:N15` now has title `Ещё раз`.
- Checks passed: `node --check src/cards.config.js`; `node --check src/game.js`; `git diff --check`.

Open questions:
- None.

## 2026-06-21 00:50 - GD

Changed:
- Added `ACTIVE PHONE FIELD PREVIEW 2026-06-21 00:50 - Show Показать поле on phone controller` for `Dev 1`.
- Required phone controller to expose the same field-preview action as the host choice/prompt overlays when relevant.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a phone-controller UI/protocol task only; it should not change gameplay rules, card effects, dice, movement, or room creation.

Open questions:
- None.

## 2026-06-21 00:45 - Art/UI

Changed:
- Cleaned up the phone-room settings block layout after moving it under the header controls.
- Made the phone-room details area use a tidy full-width grid: code, link, copy button, then full-width hint and controller status rows.
- Changed the header phone button into a real panel toggle: first click opens/creates/copies, second click hides the settings block without closing the room.
- Centered the phone icon inside its header button and changed it to a light stroke so it reads on the dark/gold button.
- Bumped host CSS/JS cache keys to `20260621-0038`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- UI/layout/toggle-only; no phone protocol, controller actions, room API, gameplay rules, cards, dice, balance, or active Shop multi-buy task changed.
- Checks passed: phone room UI/toggle source check, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-21 00:44 - GD

Changed:
- Added `ACTIVE SHOP MULTI-BUY 2026-06-21 00:44 - Keep one Joe Shop offer during unlimited buys` for `Dev 3`.
- Clarified that ordinary Joe Shop should draw one offer per visit, not refresh after every purchase.
- Required repeat purchases from `shop-unlimited-buy` to use the same opened offer until it is empty, declined, or unaffordable.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Current source clue: `resolveShop(player)` draws a fresh offer inside its repeat-buy loop.
- This should not affect Joe Auction, Black Market, or free Shop rewards.

Open questions:
- None.

## 2026-06-21 00:37 - Dev 1

Changed:
- Completed `ACTIVE PHONE ROOM HEADER UI 2026-06-21 00:28 - Move phone room to top header button`.
- Replaced the single fullscreen slot with two small matching header icon buttons: phone controllers and fullscreen.
- Moved `.phone-room-panel` out of hidden settings and directly under `.season-controls`, spanning the `game-settings` block width.
- Phone header button now enables the phone room, opens the panel, creates a room if needed, copies the current link, and shows floating `Комната скопирована` feedback for about 2 seconds.
- Removed the old settings checkbox entry point `Играть с телефонами`.
- Changed phone room default mode to `Полный контроллер`.
- Changed dice checkbox text/semantics to `Не отображать кубики`: unchecked means dice visible, checked means dice hidden.
- Kept manual create/recreate and manual copy controls working inside the moved panel.
- Bumped host CSS/JS cache keys to `20260621-0037`.
- Added GD context handback only; QA was not involved.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `server.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No phone controller action protocol, gameplay rules, cards, board, history save behavior, final battle, reference panel, or unrelated settings were intentionally changed.
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `node --check server.js`; `git diff --check`.
- Static/source checks passed: phone button exists; panel is before `#settingsPanel`; old `#usePhoneControllers` is gone; default mode is `full`; `Не отображать кубики` is present; dice checkbox inversion maps to `diceVisible`; server fallback default is full mode with dice visible.
- Browser smoke was not completed: in-app browser bridge failed with sandbox metadata error; existing `127.0.0.1:5173` was a stale server without fresh files; starting a fresh `server.js` on `5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 00:29 - Art/UI

Changed:
- Added an artifact-style backing plate behind the face icons on artifact Event cards so `Волшебный кошель`, `Меч Героя`, and `Анти-Плохо` read as more important.
- Marked those three cards in `src/cards.config.js` with `artifact: true`.
- Updated Event artifact face rendering to use the new `artifact: true` marker, with existing ids kept as fallback for compatibility.
- Added a project memory rule: persistent artifact cards should be marked with `artifact: true` and artifact-specific UI should use that flag.
- Bumped host CSS/JS cache keys and the `cards.config.js` import cache key to `20260621-0012`.

Files:
- `src/cards.config.js`
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/README.md`
- `project-memory/updates.md`

Notes for others:
- Visual/config marker only; no artifact effects, event rules, balance, ownership behavior, assets, phone controller behavior, or active GD task behavior changed.
- Checks passed: artifact config/backing source check, `node --check src/game.js`, `node --check src/cards.config.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-21 00:28 - GD

Changed:
- Added `ACTIVE PHONE ROOM HEADER UI 2026-06-21 00:28 - Move phone room to top header button` for `Dev 1`.
- Requested replacing the single fullscreen slot with two small matching icon buttons: phone controllers and fullscreen.
- Requested moving the phone room panel directly under the top controls, full width of the game-settings block.
- Requested one-click phone room creation, automatic link copy, and `Комната скопирована` floating feedback.
- Requested default `Полный контроллер` mode and inverted `Не отображать кубики` checkbox semantics.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a Dev 1 UI+JS implementation task, not just visual polish.
- Preserve existing phone controller protocol/actions unless the inverted dice option needs snapshot wiring.

Open questions:
- None.

## 2026-06-21 00:13 - Art/UI

Changed:
- Increased the Event artifact card-face icon size one more step for `Волшебный кошель`, `Меч Героя`, and `Анти-Плохо`.
- Added per-artifact classes to the Event card text block so individual artifact visuals can be tuned without changing rules or card data.
- Scaled the `Волшебный кошель` icon slightly inside its larger slot so it reads closer in visual size to the other artifact icons.
- Bumped host CSS/JS cache keys to `20260621-0011`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual sizing only; no event rules, artifact behavior, card data, balance, assets, phone controller behavior, or history/autosave work changed.
- Checks passed: artifact icon sizing source check, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-21 00:13 - Art/UI 2

Changed:
- Completed `ACTIVE 2026-06-21 00:05 - Brighter walk-path outline`.
- Made `.walk-path-outline` noticeably brighter with a stronger warm border, full opacity, and stronger gold glow.
- Made `.walk-path-outline.is-final` slightly more prominent than intermediate path cells with tighter inset, solid 3px border, and stronger final glow.
- Left portal, card-choice, and post-roll target outline styles unchanged.
- Bumped host CSS/JS cache keys to `20260621-0011`.
- Added GD context handback only; QA was not involved.

Files:
- `styles.css`
- `index.html`
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Visual CSS/cache-only pass; no movement rules, route calculation, dice logic, cards, board placement, or toggle behavior changed.
- Checks passed: `git diff --check`; `node --check src/game.js`.
- Browser visual smoke was not completed because the in-app browser bridge failed with an environment-side sandbox metadata error during setup.

Open questions:
- None.

## 2026-06-21 00:48 - Dev 3

Changed:
- Completed `ACTIVE SHOP MULTI-BUY 2026-06-21 00:44 - Keep one Joe Shop offer during unlimited buys`.
- Reworked ordinary `resolveShop(player)` so one Joe Shop visit draws one offer before the buy loop.
- `shop-unlimited-buy` repeat buys now reuse the same opened offer, remove bought cards from that offer, and do not draw replacement cards during the visit.
- Remaining unbought offer cards are discarded only once when the visit ends.
- Kept Joe Auction, Black Market, free Shop rewards, card data/counts/titles/effects unchanged.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source checks passed: ordinary Shop offer is drawn once before the buy loop, bought cards are spliced out of that same offer, and only remaining unbought cards are returned through `discardCardsToDeck("shop", offer)`.
- Browser smoke was not completed in this environment because `127.0.0.1:5173` was unreachable and starting `server.js` on `127.0.0.1:5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 00:12 - Dev 3

Changed:
- Completed `ACTIVE HISTORY AUTOSAVE 2026-06-21 00:05 - Auto-save finished games after first winner popup`.
- Added one-shot finished-game history autosave after the first visible winner popup render.
- Reused the existing `saveCurrentGameHistory()` snapshot/export path for autosave, with status return values and autosave-specific non-blocking messages.
- Added per-game autosave guard fields in `state.history`; new games reset them through fresh history initialization.
- Kept manual `Сохранить` available after autosave.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source checks passed: autosave guard resets on new game, autosave only schedules after `state.finished` plus final summary fields plus visible winner popup render, duplicate renders are guarded by `autoSaveRequestedAt`, and the autosave calls `saveCurrentGameHistory({ autosave: true })`.
- Browser smoke was not completed in this environment: in-app browser connection failed with sandbox metadata error, direct HTTP check could not reach `127.0.0.1:5173`, and starting `server.js` on `127.0.0.1:5174` failed with `listen EPERM`.

Open questions:
- None.

## 2026-06-21 00:05 - GD

Changed:
- Added `ACTIVE HISTORY AUTOSAVE 2026-06-21 00:05 - Auto-save finished games after first winner popup` for `Dev 3`.
- Requested automatic game save once per finished game after the first winner popup is visible.
- Required reuse of the existing manual history save/export path and duplicate-save guard.
- Added `ACTIVE 2026-06-21 00:05 - Brighter walk-path outline` for `Art / UI 2`.
- Requested brighter visual styling for `Показывать контур хода` route outlines.
- Kept QA out of both flows per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- Autosave should not run before final summary fields exist and should reset on new game.
- Walk-path styling should target `.walk-path-outline` / `.walk-path-outline.is-final` and avoid changing portal/card/post-roll preview outlines.

Open questions:
- None.

## 2026-06-20 00:01 - Art/UI

Changed:
- Made the face icons larger on the Event artifact cards `Волшебный кошель`, `Меч Героя`, and `Анти-Плохо`.
- Added a dedicated `has-large-artifact-icon` card-face class for those three cards instead of enlarging every Event card icon.
- Adjusted dense/long Event card icon rows so long descriptions still keep room inside the card.
- Bumped host CSS/JS cache keys to `20260620-0001`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual card-face sizing only; no event rules, artifact ownership, card data, balance, phone controller behavior, or assets changed.
- Checks passed: artifact icon sizing source check, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-19 02:27 - Art/UI 2

Changed:
- Moved Event artifact icons out of the card title row and into their own centered row directly under the title.
- `Волшебный кошель`, `Меч Героя`, and `Анти-Плохо` now render as: fixed title row, artifact icon row, description row.
- Event description lines now inherit the shared card-face description typography instead of overriding it with older Event-only font sizes.
- Tightened the long-card artifact layout on narrow viewports so long artifact descriptions fit with clean gaps.
- Kept card titles plain text per README: dice/coin/artifact icons do not render inside `.card-face-title`.
- Bumped host CSS/JS cache keys to `20260619-0227`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- UI/layout-only; no card configs/texts, gameplay rules, deck lifecycle, controller behavior, or art assets changed in this pass.
- This supersedes the earlier 2026-06-19 01:56 note that mentioned Event-style title iconization for `Кубик`: titles are now intentionally plain text, while coin/dice icons stay in descriptions/rules text only.
- Browser smoke on `http://127.0.0.1:5173/` with the updated card-face layout, then bumped cache keys to `20260619-0227`: artifact icons were below title, centered, no title images, no overflow on desktop or `390x844`, no console errors.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `git diff --check`.
- GD context handback only; QA was not involved.

Open questions:
- None.

## 2026-06-19 02:06 - Art/UI

Changed:
- Fixed the shared card-face title renderer after `iconizeHtml(title)` had been reintroduced.
- Card titles now render through `cardFaceTitleMarkup(...)`, which strips/normalizes dice/coin icon HTML and emoji into plain title text.
- `Контроль кубика` and `Кубик судьбы` stay written out in card titles; description/rules text keeps coin/dice icons.
- Bumped host script cache key to `20260619-0206`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- UI rendering/cache-only; no card config data, gameplay rules, deck lifecycle, balance, assets, or controller behavior changed.
- Checks passed: title renderer source check, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-19 02:05 - Dev 1

Changed:
- Fixed Joe Shop reveal/action prompt centering after the card-face/reference layout changes.
- Card action prompts now center their card stage/copy across the board area instead of shrinking to an off-center content box.
- Joe Shop card rows now use a centered wrapping flex row, so 2-card and 3-card offers stay centered and can wrap cleanly on narrow screens.
- Bumped host CSS/JS cache keys to `20260619-0202`.
- Added GD context handback only; QA was not involved.

Files:
- `styles.css`
- `index.html`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No card data, Shop rules, deck lifecycle, card draw/apply behavior, field placement, dice, phones, or balance changed.
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke on `http://127.0.0.1:5173/`: triggered a real 2-card Joe Shop prompt via exact movement; board/map/toast/card-row centers all measured at `350px`.
- The 3-card case uses the same `.shop-card-row` centered/wrapping layout; no separate gameplay state was forced for a 3-card runtime prompt in this pass.
- Browser console error check after smoke: no errors.

Open questions:
- None.

## 2026-06-19 02:02 - Art/UI

Changed:
- Fixed card face titles so they render as plain text and no longer replace words like `Кубик` with dice icons.
- `Кубик судьбы` now remains written out in the title; coin/dice iconization stays in card descriptions/rules text.
- Added the card-title plain-text rule to project memory.
- Bumped the host script cache key to `20260619-0155`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/README.md`
- `project-memory/updates.md`

Notes for others:
- UI rendering/memory-rule only; no card data, effects, rules, deck lifecycle, balance, or assets changed.
- Checks passed: title source/readback, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-19 01:56 - Art/UI 2

Changed:
- Added visible `title` to revealed Good, Bad, TADAM, and Shop card faces using the existing artistic card titles.
- Kept Event cards on the same title/body structure and connected them to shared base card-face title/description classes.
- Added shared card-face text renderer that uses `title || shortTitle || deck fallback` for the title and only `description/text/effectText/body` for the body, avoiding title duplication.
- Reworked card-face CSS so title lives in a fixed top grid row and no longer jumps vertically between cards; dense/long variants shrink typography and spacing without moving title Y.
- Preserved inline icon wrappers for coin/dice/nowrap spans.
- Bumped host CSS/JS cache keys to `20260619-0156`.
- Added a project memory rule for fixed card title positioning.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/README.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No card configs/texts, gameplay rules, deck lifecycle, phone controller behavior, settings values, or art assets were intentionally changed.
- Settings reference cards update automatically because they already use the shared gameplay card-face renderer.
- Desktop browser smoke on `http://127.0.0.1:5173/`: Good/Bad/Shop/TADAM/Event reference sections all showed titles, had `0` missing titles, `0` overflow cards, `0` focusable reference buttons, and fixed title Y `130px`.
- Long-card desktop spot checks stayed inside the card: `Торговый перехват`, `Разворот`, `Реванш монстра`, `Закрытая лавка`, `Дуэль на клетке`, `Темная взятка`, `Переброс маршрута`, `Перетасовка Лавки`, `Волшебный кошель`.
- Mobile browser smoke at `390x844`: Good/Bad/Shop/TADAM/Event reference sections all had fixed title Y `72px`, no overflow, and long-card samples stayed inside the card.
- `Кубик неприятностей` displays the word `Кубик` as a dice icon through the same `iconizeHtml(...)` title behavior Event cards already used.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `git diff --check`.

Open questions:
- None.

## 2026-06-19 01:43 - Dev 3

Changed:
- Completed `ACTIVE SHOP COUNTS 2026-06-19 01:39 - Update Joe Shop card copy counts`.
- Updated only `count` values for all 15 `Лавка Джо` cards in local config, CSV, and Google Sheet `Cards Config` / `shop`.
- New physical Shop deck total is `60`.
- Left current artistic titles, shortTitles, descriptions, effects, ids, order, rules, UI, and assets unchanged.
- Added GD context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- Google Sheet `Cards Config` / `shop`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/cards.config.js`; `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static local config and CSV readback passed: required Shop counts exactly match the task and total `60`.
- Google Sheet readback passed for `shop!A1:N20`: required Shop counts exactly match the task and total `60`.

Open questions:
- None.

## 2026-06-19 01:39 - GD

Changed:
- Added `ACTIVE SHOP COUNTS 2026-06-19 01:39 - Update Joe Shop card copy counts` for `Dev 3`.
- Set the new requested `Лавка Джо` copy counts from the user's sheet.
- Marked the task as data-only: update counts without changing current artistic titles, descriptions, effects, ids, order, rules, UI, or assets.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 3 should sync Google Sheet `Cards Config`, `src/cards.config.js`, and `cards-google-sheet.csv`.
- New physical Shop deck total should be `60`.

Open questions:
- None.

## 2026-06-19 01:38 - Art/UI 2

Changed:
- Redrew the active `Черный рынок` tile icon in the current fantasy board-game style with fewer, larger elements.
- New visual reads as a dark market stall with one large gold coin and one bundled item for sale, to communicate that something can be bought there.
- Avoided purple/violet/magenta/blue palette; used dark wood/black cloth/gold/amber instead.
- Exported final active asset as transparent PNG, 512x512 RGBA.
- Bumped `blackMarketIconSrc` cache key to `20260619-0138`.
- Added GD context handback only; QA was not involved.

Files:
- `assets/icons/black_market_ultra_simple_512.png` — 512x512 PNG RGBA, transparent, status: `wired`.
- `src/game.js`
- `outputs/black_market_redraw_chroma_512.png`
- `outputs/black_market_redraw_alpha_512.png`
- `outputs/black_market_redraw_final_512.png`
- `outputs/black_market_redraw_small_preview.png`
- `outputs/black_market_before_redraw_20260619_0128.png`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Built-in imagegen was used for the source art, then chroma-key removal and local 512x512 export were done with the bundled Python runtime.
- Validation passed: final active PNG is `512x512 RGBA`, transparent corners, alpha bbox `(27, 25, 485, 487)`, `0` detected purple-like pixels, `0` detected chroma-green pixels.
- Small-size preview was saved at `outputs/black_market_redraw_small_preview.png`.
- Checks passed: `node --check src/game.js`; `git diff --check`.
- No gameplay rules, card data, balance, or controller behavior changed.

Open questions:
- None.

## 2026-06-19 01:31 - Art/UI

Changed:
- Replaced the active `Аукцион Джо` icon with the user-provided gavel icon.
- Cropped by alpha, resized to 512x512 with tile-safe padding, and preserved transparency.
- Bumped Joe Auction icon and host script cache keys to `20260619-0120`.
- Updated active market/auction preview sheet.

Files:
- `assets/icons/joe_auction_512.png`
- `src/game.js`
- `index.html`
- `outputs/active_market_auction_icons_preview.png`
- `outputs/joe_auction_user_icon_tile_preview.png`
- `project-memory/updates.md`

Notes for others:
- Visual asset/cache-only pass; no gameplay, rules, card data, balance, or controller behavior changed.
- Checks passed: PNG dimension/alpha validation, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-19 01:26 - Dev 3

Changed:
- Completed `ACTIVE CARD TITLES 2026-06-19 01:15 - Add artistic titles where titles are still effect text`.
- Updated GD-provided artistic `title` values for Good, Bad, TADAM, and Shop cards in local config, CSV, and Google Sheet `Cards Config`.
- Left Event card titles unchanged.
- Left descriptions, effects, counts, ids, deck membership, icons, rules, and behavior unchanged.
- Left existing compact Shop `shortTitle` values unchanged because they are not duplicates of old long rule titles.
- Added GD context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- Google Sheet `Cards Config` / `good`, `bad`, `tadam`, `shop`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/cards.config.js`; `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static local config and CSV readback passed: 61 expected title updates and no final periods in `title`, `shortTitle`, or `description`.
- Google Sheet readback passed for the updated tabs.
- Browser smoke was not completed in this environment because local server bind is sandbox-denied and `file://` navigation is blocked by Browser policy.

Open questions:
- None.

## 2026-06-19 01:25 - Art/UI 2

Changed:
- Fixed follow-up mismatch where settings reference cards could split nested coin/dice icon wrappers differently from gameplay revealed cards.
- Scoped card-face icon amount rules to `.card-face-stage` so `.coin-amount`, `.dice-amount`, and `.card-text-nowrap` remain inline in both gameplay and settings.
- Changed Good/Bad/TADAM/Shop/Event card text CSS from descendant `span` selectors to direct-child line selectors, preventing nested icon wrappers from becoming their own visual text lines.
- Bumped host CSS cache key to `20260619-0122`.
- Added a project memory rule against descendant-wide card text `span` rules that can break settings/gameplay parity.
- Added GD context handback only; QA was not involved.

Files:
- `styles.css`
- `index.html`
- `project-memory/README.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- No card configs/texts, gameplay rules, deck lifecycle, phone controller behavior, settings values, or art assets were intentionally changed by this follow-up.
- Browser smoke loaded `http://127.0.0.1:5173/` and confirmed the target Good card `Получи 8...15` renders in settings with 2 visual lines and `.coin-amount` as `inline-flex`; the visual capture shows `Получи 8🪙.` intact on one line.
- All reference decks were toggled (`Хорошо`, `Плохо`, `Лавка Джо`, `Тадам!`, `События`): all card-face coin/dice amounts stayed inline, all card stages remained inert, and no focusable gameplay buttons were present inside reference cards.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `git diff --check`.

Open questions:
- None.

## 2026-06-19 01:18 - Art/UI

Changed:
- Replaced the bad redrawn Joe Auction icon with an old-art cleanup version.
- Preserved the original gavel/base/coin art style and removed the Joe Shop cards from the background.
- Kept the already-applied non-purple minimal Black Market icon.
- Bumped the Joe Auction icon URL cache key to `20260619-0106`.

Files:
- `assets/icons/joe_auction_512.png`
- `src/game.js`
- `outputs/joe_auction_old_art_cards_removed_candidate.png`
- `outputs/joe_auction_old_art_cards_removed_preview.png`
- `outputs/active_market_auction_icons_preview.png`
- `project-memory/updates.md`

Notes for others:
- Visual asset/cache-only pass; no gameplay, rules, card data, balance, or controller behavior changed.
- Checks passed: PNG dimension/alpha validation, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-19 01:15 - GD

Changed:
- Added `ACTIVE CARD TITLES 2026-06-19 01:15 - Add artistic titles where titles are still effect text` for `Dev 3`.
- Reviewed current local `cardConfig` titles across Good, Bad, TADAM, Event, and Shop decks.
- Provided an explicit GD title map for cards whose `title` is still an effect/rule sentence.
- Kept Event titles unchanged because they already read as artistic card names.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 3 should update only title-like fields and preserve descriptions, effects, counts, ids, deck membership, icons, and behavior.
- Sync Google Sheet `Cards Config`, `src/cards.config.js`, and `cards-google-sheet.csv`.

Open questions:
- None.

## 2026-06-19 01:16 - Dev 3

Changed:
- Completed `ACTIVE SHOP CARDS 2026-06-19 01:06 - Add 2 post-roll Joe Shop cards and movement target highlight`.
- Added two `Лавка Джо` cards to local config, CSV, and Google Sheet `Cards Config` / `shop`: `reroll-one-move-die` and `move-one-farther`, both `count: 2`.
- Updated physical Shop deck total to `40`.
- Implemented owner-turn-only post-roll movement die reroll for `reroll-one-move-die`: pay `3`, choose one movement die, reroll it before dice control, duplicate rewards, and movement.
- Implemented `move-one-farther`: pay `3` after movement dice are finalized and before movement starts, adding `+1` step for that movement.
- Added host and phone post-roll actions for both cards; bots can use both with simple scoring.
- Added two-color target-cell overlays during `move-one-farther`: normal landing target and boosted `+1` target, with combined handling when both targets are the same.
- Bumped host/controller CSS/JS cache keys to `20260619-0116`.
- Added GD context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `src/game.js`
- `src/controller.js`
- `cards-google-sheet.csv`
- `index.html`
- `controller.html`
- `styles.css`
- Google Sheet `Cards Config` / `shop`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `node --check src/controller.js`; `git diff --check`.
- Static local config/CSV readback passed: 15 Shop rows, total count `40`, both new ids present with `count: 2`, no final periods.
- Google Sheet readback passed for `shop!A1:N18`: 15 Shop rows, total count `40`, both new cards present.
- Browser smoke was not completed in this environment because local server bind is sandbox-denied and `file://` navigation is blocked by Browser policy.

Open questions:
- None.

## 2026-06-19 01:10 - Art/UI 2

Changed:
- Completed direct user follow-up for guaranteed parity between gameplay revealed cards and settings reference cards.
- Added shared `cardFaceStageMarkup(...)` / `cardFaceMarkupForDeck(...)` flow so gameplay reveal prompts and settings reference cards use the same card-face renderer.
- Updated reference deck rendering so new cards from existing decks automatically appear in settings through the shared renderer instead of a reference-only card template.
- Moved card-face sizing into shared CSS variables `--card-face-width` and `--card-face-gap`; reference grid now sizes cells from the same card-face width.
- Removed reference-only card-face width overrides that could cause different text wrapping.
- Added the shared card-face rule to `project-memory/README.md`.
- Bumped host CSS/JS cache keys to `20260619-0110`.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/README.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- No card configs/texts, gameplay rules, deck lifecycle, phone controller behavior, settings values, or art assets were intentionally changed by this pass.
- Reference cards remain informational only: browser smoke confirmed Shop/Good reference cards use `.card-face-stage.is-inert`, `tabindex="-1"`, and `aria-disabled="true"`.
- Browser smoke loaded `http://127.0.0.1:5173/` with `styles.css?v=20260619-0110` and `game.js?v=20260619-0110`; `Лавка Джо` reference showed shared stage/card width `218px`, 15 cards, and no console errors; the screenshot Good-card text case was found in `Хорошо` reference with shared stage/card width `218px` and no console errors.
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `git diff --check`.
- Recovery note: during this pass a malformed local search command clobbered `src/game.js`; it was restored by replaying 88 post-HEAD `src/game.js` patch diffs from local Codex session logs onto `HEAD:src/game.js`, then reapplying this shared card-face change. The restored file has `11806` lines, imports `cards.config.js?v=20260619-0105`, and passed `node --check src/game.js`.

Open questions:
- None.

## 2026-06-19 01:06 - GD

Changed:
- Added `ACTIVE SHOP CARDS 2026-06-19 01:06 - Add 2 post-roll Joe Shop cards and movement target highlight` for `Dev 3`.
- Requested two new `Лавка Джо` cards with `count: 2` each: one movement-die reroll card and one `+1` movement step card.
- Requested two-color target-cell highlighting during the `+1` step card choice pause.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 3 should sync Google Sheet `Cards Config`, `src/cards.config.js`, and `cards-google-sheet.csv`.
- Expected physical Shop deck total after this addendum is `40`.
- The highlight must show both normal and boosted landing cells before the player chooses.

Open questions:
- None.

## 2026-06-19 01:05 - Art/UI

Changed:
- Applied the approved non-purple minimal `Черный рынок` icon to the active asset.
- Redrew and applied `Аукцион Джо` as a centered gavel-only icon, removing the Joe Shop cards from the tile art.
- Bumped the in-game icon URL cache keys for Black Market and Joe Auction.
- Added active icon preview sheet for quick visual comparison.

Files:
- `assets/icons/black_market_ultra_simple_512.png`
- `assets/icons/joe_auction_512.png`
- `src/game.js`
- `outputs/active_market_auction_icons_preview.png`
- `outputs/joe_auction_hammer_centered_512.png`
- `outputs/joe_auction_hammer_centered_preview.png`
- `project-memory/updates.md`

Notes for others:
- Visual asset/cache-only pass; no gameplay, rules, card data, balance, or controller behavior changed.
- Checks passed: PNG dimension/alpha validation, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-19 01:00 - Dev 3

Changed:
- Completed `ACTIVE SHOP DECK 2026-06-19 00:39 - Replace Joe Shop deck with new 36-card list`.
- Replaced playable `Лавка Джо` deck with 13 cards / 36 physical copies in local config, CSV, and Google Sheet `Cards Config` / `shop`.
- Removed old playable `coin-plus` / `passive-coin-bonus` and `extra-die` / `optional-extra-die` Shop cards from card data.
- Neutralized stale runtime hooks for old receive-coin and extra-die Shop effects.
- Added runtime hooks for the new Shop effects: green field +5, monster self-buff +3 for 5 coins, pre-roll +5 steps for 5 coins, anti-self repeatable monster bribe, duplicate-dice reward choice, TADAM income, 3-card/3-coin ordinary Shop offers, unlimited ordinary Shop buys, once-per-turn permanent strength/steps buys, and Start strength reward.
- Kept `shop-choice-3-cost-3` and `shop-unlimited-buy` scoped to ordinary Joe Shop cells, not Auction, Black Market, or free Shop rewards.
- Bumped `game.js` / `cards.config.js` cache keys to `20260619-0105`.
- Added GD context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `src/game.js`
- `cards-google-sheet.csv`
- `index.html`
- Google Sheet `Cards Config` / `shop`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `node --check src/controller.js`; `git diff --check`.
- Static local config/CSV readback passed: 13 Shop rows, total count `36`, no final periods, no stale `coin-plus` / `extra-die`.
- Google Sheet readback passed for `shop!A1:N16`: new 13-row Shop deck is present and old playable rows are cleared.
- Browser smoke was blocked by environment: sandbox denied local server bind, and Browser policy blocked `file://` navigation.

Open questions:
- None.

## 2026-06-19 00:52 - Art/UI

Changed:
- Drew a new preview candidate for the `Черный рынок` icon: no purple palette, fewer details, stronger small-size silhouette.
- Kept it as an output-only candidate and did not connect/replace the in-game icon.
- Added a preview sheet with 128/96/64/48px checks.

Files:
- `outputs/black_market_no_purple_minimal_512.png`
- `outputs/black_market_no_purple_minimal_preview.png`
- `project-memory/updates.md`

Notes for others:
- Visual asset candidate only; no gameplay, CSS, JS, settings, rules, balance, or active assets changed.
- Per user request, the new icon was not applied to `assets/icons` and no GD/QA handback was sent.

Open questions:
- None.

## 2026-06-19 00:45 - Art/UI 2

Changed:
- Completed `ACTIVE ART/UI 2026-06-19 00:14 - Align settings reference card faces with in-game card layout`.
- Adjusted settings reference card CSS so Good/Bad/Shop/TADAM/Event reference cards use the same revealed-card width metric as gameplay cards.
- Prevented reference grid cells from stretching/compressing the card face, improving text wrapping, card proportions, art placement, and spacing parity with the in-game revealed card.
- Kept the full-size non-overlapping grid with small gaps and left `Поля` reference behavior unchanged.
- Bumped the host CSS cache key to `20260619-0045`.
- Sent GD a context handback only under the current pipeline; QA was not involved.

Files:
- `index.html`
- `styles.css`
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- CSS-only visual pass; no gameplay code, card configs/texts, assets, deck lifecycle, phone controller behavior, settings values, or rules were changed.
- Check passed: `git diff --check`.
- Browser smoke was not completed because Playwright Chromium is missing from the local cache; `src/game.js` was not touched, so `node --check src/game.js` was not required.

Open questions:
- None.

## 2026-06-19 00:39 - GD

Changed:
- Added `ACTIVE SHOP DECK 2026-06-19 00:39 - Replace Joe Shop deck with new 36-card list` for `Dev 3`.
- Set the new canonical `Лавка Джо` deck composition and counts from the user's sheet.
- Requested removal of old `coin-plus` / `passive-coin-bonus` and `extra-die` / `optional-extra-die` cards.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 3 must sync Google Sheet `Cards Config`, `src/cards.config.js`, and `cards-google-sheet.csv`.
- Total physical Shop deck size should become `36`.
- Work on top of the current dirty tree and do not revert unrelated changes.

Open questions:
- None.

## 2026-06-19 00:14 - GD

Changed:
- Added `ACTIVE ART/UI 2026-06-19 00:14 - Align settings reference card faces with in-game card layout` for `Art / UI 2`.
- Set the in-game revealed card face as the visual source of truth for settings reference cards.
- Requested Art/UI alignment of card face proportions, text block position, line wrapping, art placement, and spacing.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- Dev 1 already made the reference cards full-size/non-overlapping, but the user still sees visual mismatch versus gameplay cards.
- Art/UI may adjust CSS/reference classes, but must preserve gameplay rules and reference click safety.

Open questions:
- None.

## 2026-06-19 00:08 - Dev 1

Changed:
- Completed `ACTIVE SETTINGS REFERENCE REWORK 2026-06-18 23:58 - Full-size non-overlapping card reference`, including the 2026-06-19 00:01 green/red field follow-up.
- Reworked card reference layout so Good/Bad/Shop/TADAM/Event render as full-size revealed gameplay cards instead of compact thumbnails.
- Changed the reference card grid to full-width cells with 16px gaps, full card height, no transforms/negative margins, and `xN` badges above the card face so they do not cover card text.
- Kept reference card clicks informational only; no draw/reveal/apply/discard/log behavior is attached.
- Fixed `Поля` green/red rows: added small board-style green/red tile previews and rendered coin effect HTML normally instead of escaped raw `<span ...>` text.
- Bumped host CSS/JS cache keys to `20260619-0002`.
- Added GD context handback only; QA was not involved.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke on `http://127.0.0.1:5173/` with `styles.css?v=20260619-0002` and `game.js?v=20260619-0002` passed.
- Desktop smoke: Good/Bad/Shop/TADAM/Event cards render at 218px width, 305px face height, 4 cards per row, 16px row/column gaps, no card overlaps, and no badge/card-face overlap.
- Mobile smoke at 390x844: Good reference wraps to 1 column, card face is 158x221, row height is 272px, page scrolls vertically, no overlaps, no badge/card-face overlap.
- Field smoke: `Поля` still shows 19 unique field types, no coordinate list; `Зеленое поле` and `Красное поле` show tile previews, coin icons render, and no raw HTML text is visible.
- Click safety smoke: clicking a reference card keeps the action popup hidden, does not add log entries, and does not change visible reference state; console errors: none.
- No card configs/texts, art assets, deck lifecycle, gameplay reveal/apply behavior, phone controller behavior, settings values, or game rules were changed.

Open questions:
- None.

## 2026-06-19 00:01 - GD

Changed:
- Added follow-up requirements to `ACTIVE SETTINGS REFERENCE REWORK 2026-06-18 23:58` for `Dev 1`.
- Requested green/red field icons in the settings `Поля` reference.
- Requested fixing raw escaped HTML in green/red field effect text so coin icons render normally.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Source clue: `renderReferenceFields()` currently combines `iconizeHtml(escapeHtml(field.effect))`, and `green`/`red` use board tile CSS rather than entries in `eventIcons` / `tileIcons`.
- Expected: green/red reference rows show mini tile icons matching board art and no raw `<span ...>` text.

Open questions:
- None.

## 2026-06-18 23:58 - GD

Changed:
- Added `ACTIVE SETTINGS REFERENCE REWORK 2026-06-18 23:58 - Full-size non-overlapping card reference` for `Dev 1`.
- Requested full-size settings reference cards using gameplay card layout, not compact overlapping thumbnails.
- Set layout requirements: responsive grid, each card in its own cell, 12-16px gaps, vertical growth/scroll instead of clipping.
- Kept field reference, card configs, game rules, and QA flow unchanged.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This reworks the visual output of `DONE SETTINGS REFERENCE VISUALS 2026-06-18 23:49`.
- Reference cards remain informational only and must not trigger gameplay actions.

Open questions:
- None.

## 2026-06-18 23:49 - Dev 1

Changed:
- Completed `ACTIVE SETTINGS UI FOLLOW-UP 2026-06-18 23:45 - Move phone mode toggle beside walk-path toggle`.
- Completed `ACTIVE SETTINGS REFERENCE VISUALS 2026-06-18 23:48 - Show cards as card images in settings reference`.
- Moved `Играть с телефонами` into the right-hand slot beside `Показывать контур хода`.
- Kept `Показать карты и поля` below that row and preserved the existing phone-room panel/id/listeners.
- Changed card reference categories from text rows to compact revealed card faces using existing gameplay card markup helpers for Good/Bad/Shop/TADAM/Event.
- Kept `Поля` as the existing field-type reference, not cards and not coordinates.
- Added GD context handback only; QA was not involved.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke on `http://127.0.0.1:5173/` passed: phone toggle is right of `Показывать контур хода`, reference block remains below, phone toggle still shows/hides phone room controls, card categories render revealed card thumbnails/faces with `xN` badges, Event artifact icons render, clicking a reference thumbnail does not open/apply/reveal anything or change log state, `Поля` still has 19 unique field types with no coordinate list, console errors: none.
- No card configs/texts, art assets, deck lifecycle, gameplay reveal/apply behavior, field reference content, phone controller behavior, room protocol, settings values, or game rules were changed.

Open questions:
- None.

## 2026-06-18 23:48 - GD

Changed:
- Added `ACTIVE SETTINGS REFERENCE VISUALS 2026-06-18 23:48 - Show cards as card images in settings reference` for `Dev 1`.
- Requested that settings reference card categories render actual card face thumbnails instead of text-only rows.
- Kept `Поля` as the current field-type reference.
- Allowed Dev 1 to combine this with the active phone-toggle layout follow-up if it is still in progress.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Reference cards are informational only and must not trigger card draw/reveal/apply behavior.
- Use existing gameplay card face art/layout where practical.

Open questions:
- None.

## 2026-06-18 23:45 - GD

Changed:
- Added `ACTIVE SETTINGS UI FOLLOW-UP 2026-06-18 23:45 - Move phone mode toggle beside walk-path toggle` for `Dev 1`.
- Requested moving `Играть с телефонами` from below `Показать карты и поля` to the empty right-hand slot beside `Показывать контур хода`.
- Kept phone-room behavior, reference panel behavior, and game rules unchanged.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a visual/layout follow-up to Dev 1's settings reference UI work.
- GD should not edit implementation directly.

Open questions:
- None.

## 2026-06-18 23:31 - Dev 1

Changed:
- Completed `ACTIVE SETTINGS REFERENCE 2026-06-18 23:23 - Add card and field reference block`.
- Added settings block `Показать карты и поля` with independent toggles for `Хорошо`, `Плохо`, `Лавка Джо`, `Тадам!`, `События`, and `Поля`.
- Added `#referencePanel` between settings and `Хроника`; it stays hidden while no categories are selected and matches Chronicle width.
- Rendered unique configured cards from `cardConfig` with title, player-facing text, `xN`, and Event artifact icons when present.
- Rendered a unique field-type reference for base/special fields, not a coordinate list.
- Bumped host CSS/JS cache keys to `20260618-2323`.
- Added GD context handback only; QA was not involved.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke on `http://127.0.0.1:5173/` passed: settings block appears, toggles open/close independently, active states and `aria-pressed` update, multiple sections can stay open, reference panel is before `Хроника` and width-matches it, Event artifact icons render, field reference has 19 unique field types and no coordinate list, console errors: none.
- Dev 3 later preserved this settings reference work while completing the active-token task.

Open questions:
- None.

## 2026-06-18 23:29 - Dev 3

Changed:
- Completed `WAITING ACTIVE TOKEN UI 2026-06-18 23:25 - Keep active player token animation during all turn choices`.
- Updated `isPlayerTurnActive(player)` so pending turn-choice states no longer remove `turn-active` from the active player's map token.
- Preserved the existing final battle guard: during final battle, normal active-turn token animation stays suppressed so current-roller/highlight logic remains in charge.
- Left rules, prompts, movement, dice results, bot behavior, score-card highlights, and settings/reference UI untouched.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Dev 1's settings reference UI changes were already present in the working tree (`#referencePanel`, `visibleReferenceSections`, reference toggles/styles), so Dev 3 preserved them and only changed the active-token predicate.
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Static/source check passed: `isPlayerTurnActive(...)` no longer mentions `pendingPreRoll`, `pendingDiceControl`, `pendingShop`, `pendingChoice`, or `pendingCardChoice`, while still checking active player, finished state, and final battle progress.
- Browser smoke at `http://127.0.0.1:5173/` loaded `game.js?v=20260618-2323`; board, score cards, roll button, and one `.map-token.turn-active` for the active player were present; console errors: none.
- Forced browser scenarios for extra-die, dice-control, Shop, portal/path choices, movement, and final battle were not run; static check covers the predicate change.

Open questions:
- None.

## 2026-06-18 23:25 - GD

Changed:
- Added `WAITING ACTIVE TOKEN UI 2026-06-18 23:25 - Keep active player token animation during all turn choices` for `Dev 3`.
- Set the task to wait behind Dev 1's active settings-reference UI work to avoid overlapping `src/game.js` changes.
- Clarified desired behavior: the active player's map token keeps its turn animation during pre-roll and turn-choice prompts, including extra-die `Лавка Джо` choices.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Source clue: `isPlayerTurnActive(player)` currently suppresses `turn-active` for pending turn states; this likely causes the missing token animation.
- Do not change game rules, prompts, movement, dice, or final-battle current-roller highlighting.

Open questions:
- None.

## 2026-06-18 23:23 - GD

Changed:
- Added `ACTIVE SETTINGS REFERENCE 2026-06-18 23:23 - Add card and field reference block` for `Dev 1`.
- Requested a new settings block `Показать карты и поля` with toggles for `Хорошо`, `Плохо`, `Лавка Джо`, `Тадам!`, `События`, and `Поля`.
- Defined the output panel location: between settings and `Хроника`, same width as `Хроника`, hidden when no category is active.
- Defined `Поля` as a unique field-type reference, not a coordinate list.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 1 owns implementation because this continues the settings UI work completed at 2026-06-18 23:03.
- GD should not edit implementation directly.

Open questions:
- None.

## 2026-06-18 23:03 - Dev 1

Changed:
- Completed `ACTIVE SETTINGS UI 2026-06-18 22:59 - Reorder modifier presets and swap settings blocks`.
- Reordered selected-player modifier preset buttons for both rows:
  - `Шаги`: `-5`, `+5`, `-50`, `+50`.
  - `Сила`: `-5`, `+5`, `-50`, `+50`.
- Swapped settings panel placement so `Пройти` / `Идти` appears above the modifier rows in the former `Поле` / `UI` position, and `Поле` / `UI` now appears lower in the former exact-move position.
- Kept ids/data attributes/control values unchanged, so modifier math, exact move, board select, and UI mode behavior stay on existing paths.
- Added GD context handback only; QA was not involved.

Files:
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke on `http://127.0.0.1:5173/` passed: settings panel opens; modifier orders are correct; `Пройти` / `Идти` is above `Поле` / `UI`; console errors: none.

Open questions:
- None.

## 2026-06-18 22:59 - GD

Changed:
- Added `ACTIVE SETTINGS UI 2026-06-18 22:59 - Reorder modifier presets and swap settings blocks` for `Dev 1`.
- Requested modifier preset order `-5`, `+5`, `-50`, `+50` for both `Шаги` and `Сила`.
- Requested swapping settings panel blocks: `Пройти`/`Идти` above `Поле`/`UI`.
- Reaffirmed that GD should not implement directly; implementation goes through executors.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is UI layout only. Do not change modifier values, exact-move logic, field selection logic, UI mode behavior, or game rules.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-15 02:18 - Dev 3

Changed:
- Completed `ACTIVE EVENT ARTIFACTS 2026-06-15 02:07 - Add Меч Героя and Анти-Плохо`.
- Added Event cards `hero-sword` / `Меч Героя` and `anti-bad` / `Анти-Плохо`, both `count: 1`, with icon metadata and no final periods.
- Synced local `src/cards.config.js`, `cards-google-sheet.csv`, and Google Sheet `Cards Config` / `event!A20:N21`.
- Implemented `Меч Героя`: draw flow is a 1-die battle against strength 6; win grants the artifact and keeps the Event card out of discard; loss discards normally.
- Implemented `Меч Героя` passive through shared combat paths: every rolled 6 by the owner adds +3 force in monster fights, final monster, VS, final boss PvP, same-cell duel, and team/shared Event battles.
- Implemented `Анти-Плохо`: poorest-player tie-break selects the candidate; human can choose exact 2 face-up Shop cards, bot pays the least valuable 2; paid cards are removed from inventory only.
- Implemented `Анти-Плохо` passive: ordinary `Плохо` field becomes +5 coins for the owner; `Очень Плохо` and Bad draws from cards/events are unchanged.
- Added host/phone artifact chips via the existing `playerArtifacts(...)` snapshot path.
- Tightened persistent Event artifact discard logic so new icon cards only stay out of Event discard after successful acquisition; failed/refused artifacts discard normally.
- Bumped host game/card config cache keys to `20260615-0207`.

Files:
- `src/game.js`
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `node --check src/controller.js`; `git diff --check`.
- Static readback passed: local config, CSV, and Google Sheet show both Event artifacts with `count: 1`, icon paths, exact descriptions, and no final periods.
- Browser smoke at `http://127.0.0.1:5173/` loaded `game.js?v=20260615-0207`; board, score cards, roll button, and new game button were present; console errors: none.
- Full forced gameplay scenarios for artifact win/loss/payment/refusal/ordinary Bad replacement were not run.
- Preserved Dev 1 TADAM hooks and the recent `monster-bribe` active-fighter exclusion.

Open questions:
- None.

## 2026-06-15 02:07 - GD

Changed:
- Activated `ACTIVE EVENT ARTIFACTS 2026-06-15 02:07 - Add Меч Героя and Анти-Плохо` for `Dev 3`.
- Confirmed both Art/UI 2 icon files are present:
  - `assets/icons/artifact_hero_sword_512.png`
  - `assets/icons/artifact_anti_bad_512.png`
- Confirmed the prerequisite `Подкуп монстра` rework is done, so the artifact implementation can start now.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 3 should preserve recent Dev 1 TADAM hooks and recent TADAM/monster-bribe changes while implementing the artifacts.

Open questions:
- None.

## 2026-06-15 02:03 - Dev 3

Changed:
- Completed `ACTIVE TADAM REWORK 2026-06-15 01:59 - Monster Bribe excludes active fighter`.
- Updated `resolveMonsterBribes(player, door, baseStrength)` so only other human players with enough coins are eligible to pay; the active fighter is excluded by `participant.id !== player.id` and never receives a pay/skip prompt for their own monster battle.
- Preserved existing behavior: active `monster-bribe` copies still stack, 2-player payment still gives monster `+2`, and bots still auto-decline by being excluded from human prompts.
- Updated `tadam/monster-bribe` title and description to the shorter canonical text: `Перед битвой с монстром другие игроки могут заплатить 3 монеты: монстр +1 к силе`.
- Synced local config, CSV, and Google Sheet `Cards Config` / `tadam!A20:N20`.
- Bumped host game/card config cache keys to `20260615-0159`.

Files:
- `src/game.js`
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source check passed: `resolveMonsterBribes` contains the active-fighter exclusion.
- Static local readback and Google Sheet readback confirmed id `monster-bribe`, effect type `monster-bribe`, amount `1`, cost `3`, count `2`, and exact new text with no final period.
- Browser smoke at `http://127.0.0.1:5173/` loaded `game.js?v=20260615-0159`; board, player cards, and roll button were present; console errors: none.
- Forced browser scenario for active fighter/no prompt and 2-player +2 payment was not run.
- `WAITING EVENT ARTIFACTS` can now be picked up next; Art/UI 2 icons are present.

Open questions:
- None.

## 2026-06-15 01:59 - GD

Changed:
- Added `ACTIVE TADAM REWORK 2026-06-15 01:59 - Monster Bribe excludes active fighter` for `Dev 3`.
- Clarified the rule: in `Подкуп монстра`, only other players may pay to strengthen the monster; the active fighter cannot pay against themselves.
- Set a shorter canonical `tadam/monster-bribe` text: `Перед битвой с монстром другие игроки могут заплатить 3 монеты: монстр +1 к силе`.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This rework should happen before Dev 3 starts the queued Event artifact implementation.
- Art/UI 2 has already provided the two artifact icons.

Open questions:
- None.

## 2026-06-15 01:56 - Art/UI 2

Changed:
- Completed `ACTIVE ART/UI 2026-06-15 01:45 - Artifact icons for Меч Героя and Анти-Плохо`.
- Created two transparent artifact PNGs for upcoming Event artifacts.
- `Меч Героя`: enchanted heroic sword with silver blade, gold guard, blue gem, and magic aura.
- `Анти-Плохо`: protective purple-gold ward/amulet blocking a dark cursed card silhouette, without copying the existing `Плохо` chest icon.
- Added a combined small-size preview for chip/card-face readability.
- Sent GD a context handback only under the current pipeline; QA was not involved.

Files:
- `assets/icons/artifact_hero_sword_512.png`
- `assets/icons/artifact_anti_bad_512.png`
- `outputs/artifact-icons-0615-preview.png`
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Asset status: visual-only / not wired.
- Both final assets are PNG, 512x512, RGBA with transparent corners.
- Preview: `outputs/artifact-icons-0615-preview.png`.
- Checks passed: PNG dimension/alpha validation; small-size preview; `git diff --check`.

Open questions:
- None.

## 2026-06-15 01:55 - Dev 1

Changed:
- Completed `ACTIVE TADAM TEXT/BALANCE 2026-06-15 01:53 - Poorest start coins to 3`.
- Updated `tadam/poorest-start-coins` canonical title/description to `Игрок с наименьшим количеством монет в начале хода получает 3 монеты`.
- Changed `poorest-start-coins` amount from `5` to `3`; the existing Wave 2 start-of-turn hook reads `effect.amount`, so the payout now follows the new balance.
- Synced Google Sheet `Cards Config` / `tadam!A11:N11`, `src/cards.config.js`, and `cards-google-sheet.csv`.
- Bumped the card config import and host script cache keys to `20260615-0153`.
- Added GD context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Google Sheet readback confirmed `tadam!A11:N11`: id `poorest-start-coins`, amount `3`, count `2`, exact title/description text.
- Local static readback confirmed config/CSV have amount `3`, count `2`, exact title/description text.
- Checks passed: `node --check src/cards.config.js`; `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser forced scenario smoke was not run; this was a data/balance text change and the existing Wave 2 hook already reads the updated amount.

Open questions:
- None.

## 2026-06-15 01:53 - GD

Changed:
- Added `ACTIVE TADAM TEXT/BALANCE 2026-06-15 01:53 - Poorest start coins to 3` for `Dev 1`.
- Set new canonical `tadam/poorest-start-coins` text to `Игрок с наименьшим количеством монет в начале хода получает 3 монеты`.
- Clarified that amount should change from current local `5` to `3`.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `Dev 1` owns this because Dev 1 just implemented the TADAM Wave 2 start-of-turn hook.

Open questions:
- None.

## 2026-06-15 01:47 - Dev 3

Changed:
- Completed `ACTIVE EVENT CARDS 2026-06-15 01:40 - Add 4 new Event cards`.
- Added 4 Event cards with `count: 2` and no final periods: `golden-markers`, `rich-tax`, `monster-banner`, `winner-takes-all`.
- Synced local card data and Google Sheet `Cards Config` / `event!A16:N19`.
- Implemented `golden-markers`: 5 visible route-cell coin markers, human field-preview choice, bot forward placement, collect for 10 coins before normal landed field effect, clear on new game.
- Implemented `rich-tax`: resolves players from active player; `20+` coins draws/resolves `Плохо`, others gain 5 coins.
- Implemented `monster-banner`: visible owner Event status, active copies stack +2 monster strength through ordinary/final monster door strength, owner victory over individual monster/final door draws `Хорошо` then discards the Event card.
- Implemented `winner-takes-all`: all players manually roll 1d6 + step bonuses, tied leaders reroll, winner gets `Хорошо`, free `Лавка Джо`, then `ТАДАМ`.
- Fixed the parallel-work browser error noted by Dev 1: `goldenMarkerCells` is now defined and browser reload has no console errors.
- Preserved Dev 1 TADAM Wave 2 shared hooks in `src/game.js`.
- Checked queued `WAITING EVENT ARTIFACTS`: `assets/icons/artifact_hero_sword_512.png` and `assets/icons/artifact_anti_bad_512.png` are not present yet, so that task remains waiting for Art/UI 2.

Files:
- `src/game.js`
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/cards.config.js`; `node --check src/controller.js`; `git diff --check`.
- Static local checks passed for all 4 Event card ids/counts/texts in config and CSV.
- Google Sheet readback confirmed all 4 rows in `event!A16:N19` with `count: 2`.
- Browser smoke at `http://127.0.0.1:5173/` loaded `game.js?v=20260615-0142` and `styles.css?v=20260615-0142`; board, player cards, roll button present; console errors: none.
- Full forced scenario smoke for each new Event branch was not run; only boot/no-console browser smoke was practical in this pass.

Open questions:
- Waiting Event artifacts can start only after Art/UI 2 provides both artifact PNGs.

## 2026-06-15 01:45 - GD

Changed:
- Added Art/UI task for two new Event artifact icons: `Меч Героя` and `Анти-Плохо`.
- Added waiting Dev 3 task `WAITING EVENT ARTIFACTS 2026-06-15 01:45 - Add Меч Героя and Анти-Плохо`.
- Set both new Event artifact cards to `count: 1` by design.
- Kept Dev 3 sequencing after the active 4-card Event pack and after Art/UI 2 icon handback.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `Art / UI 2` owns `assets/icons/artifact_hero_sword_512.png` and `assets/icons/artifact_anti_bad_512.png`.
- `Dev 3` owns implementation after dependencies are ready.
- `Dev 1` already completed TADAM Wave 2; Dev 3 should preserve those shared-hook changes.

Open questions:
- None.

## 2026-06-15 01:42 - Dev 1

Changed:
- Completed `ACTIVE TADAM PACK WAVE 2 2026-06-15 01:36 - Non-battle TADAM hooks after Dev 3`.
- Implemented non-battle TADAM hooks:
  - `last-good-start`: last-by-route player(s) draw `Хорошо` at the start of their turn.
  - `poorest-start-coins`: poorest player(s) gain start-of-turn coins.
  - `last-step-plus`: last-by-route player(s) get turn-only step bonus before pre-roll.
  - `shop-discount` / `shop-surcharge`: ordinary Joe Shop card price is modified with minimum 0; Joe Auction, Black Market, buyback, and player-to-player purchases are unchanged.
  - `portal-bad`: ordinary open portal movement and `Портал хаоса` draw `Плохо`; `Портальный обмен` is not hooked.
  - `green-extra-coins` / `red-extra-loss`: green/red base field coin effects get stacked extra amounts.
  - `good-cashout`: after revealing `Хорошо`, player may apply it or discard for coins.
  - `bad-consolation`: after resolving `Плохо`, player gains consolation coins.
- Active duplicate TADAM copies stack through shared helpers.
- Bumped host script cache key to `20260615-0142`.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Static/source checks passed for every Wave 2 effect id in local config/CSV and runtime hook.
- Browser smoke loaded a local Wave 2 build, board and roll button were present. The dev-log capture surfaced a `ReferenceError: goldenMarkerCells is not defined` during parallel Dev 3 Event-pack work, so I did not count this as a clean no-console/full scenario browser verification for Wave 2.
- Intersection note: Dev 1 edited `src/game.js` while Dev 3's Event pack also has in-progress changes there; no Event card data/CSV/config changes were made by Dev 1.

Open questions:
- None.

## 2026-06-15 01:40 - GD

Changed:
- Released `ACTIVE TADAM PACK WAVE 2 2026-06-15 01:36 - Non-battle TADAM hooks after Dev 3` to `Dev 1` after Dev 3 Wave 1 handback.
- Added `ACTIVE EVENT CARDS 2026-06-15 01:40 - Add 4 new Event cards` for `Dev 3`.
- Assigned new Event cards: `Золотые метки`, `Налог на богатых`, `Знамя монстров`, `Большой приз`.
- Kept QA out of the flow per current pipeline.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `Dev 1` owns TADAM Wave 2.
- `Dev 3` owns the new Event pack and must preserve fresh Dev 1 changes if shared hooks overlap.
- `Dev 2` is not involved.

Open questions:
- None.

## 2026-06-15 01:36 - Dev 3

Changed:
- Implemented `ACTIVE TADAM PACK WAVE 1 2026-06-15 01:04 - Add 13 TADAM cards and battle hooks`.
- Added all 13 new TADAM cards to local config, CSV mirror, and Google Sheet `Cards Config` / `tadam!A9:N21`.
- Preserved `tadam/monster-hunt` balance: amount `10`, description `За победу над монстром игрок получает 10 монет`.
- Implemented `same-cell-duel` as a stop-before-cell-effect battle:
  - active copies stack;
  - multiple same-cell targets use existing die tie selection;
  - battle uses shared player battle rolls and VS-style HUD state;
  - winner chooses up to 10 coins or one face-up Shop card from loser;
  - existing `land-steal` still resolves after the landed cell effect.
- Implemented `monster-bribe` for individual monster/final monster door fights:
  - active copies stack;
  - each human player may pay 3 coins before the roll;
  - each payment adds +1 monster strength, or +2 in 2-player games;
  - bots auto-decline;
  - team/shared battles, VS, and final boss PvP are not affected.
- Implemented `rich-weakness` through shared `playerCombatBonus(...)`:
  - each active copy gives -2 force to players with 20+ coins;
  - applies to monster fights, final monster, final boss, VS, and team/shared battle rolls.
- Bumped `src/game.js` import cache for `cards.config.js` and host `index.html` game script cache to `20260615-0104`.
- Marked Dev 1 Wave 2 as ready after this handback.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- Google Sheet `Cards Config` / `tadam!A8:N21`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check -- src/game.js src/cards.config.js cards-google-sheet.csv index.html project-memory/updates.md project-memory/inbox/for-dev.md project-memory/inbox/for-gd.md`.
- CSV parse check passed: all rows have 14 columns.
- Static config/CSV check passed: all 13 new card ids exist with `count: 2`; no final period in title/description.
- Google Sheet readback confirmed `tadam!A8:N21`: `monster-hunt` remains amount `10`; all 13 new rows are present with `count: 2`.
- Browser smoke was not run; this sandbox rejects local server binding with `EPERM`.
- Dev 1 can now start `READY TADAM PACK WAVE 2 2026-06-15 01:36 - Non-battle TADAM hooks after Dev 3`.

Open questions:
- None.

## 2026-06-15 01:04 - GD

Changed:
- Added two tasks for the new 13-card `Тадам` pack.
- Assigned Wave 1 data + battle hooks to `Dev 3`.
- Assigned Wave 2 non-battle hooks to `Dev 1`, waiting for Dev 3 handback.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 2 is not involved.
- QA is not involved unless the user explicitly asks.
- Dev 3 must preserve the fresh unpushed `tadam/monster-hunt` 10-coin balance changes.
- Dev 1 must not start Wave 2 until Dev 3 finishes Wave 1 and syncs all card data.

Open questions:
- None.

## 2026-06-15 00:52 - Dev 3

Changed:
- Implemented `ACTIVE TADAM BALANCE 2026-06-15 00:39 - Monster victory reward 15 to 10`.
- Updated `tadam/monster-hunt` player-facing description to exactly `За победу над монстром игрок получает 10 монет`.
- Changed `monster-win-coins` amount from `15` to `10`, so the runtime reward is now `10`.
- Synced local config, CSV mirror, and Google Sheet `Cards Config` tab `tadam`, row `8`.
- Kept id `monster-hunt`, title `Охота на монстра`, effect type `monster-win-coins`, and count `2`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- Google Sheet `Cards Config` / `tadam!A8:N8`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `git diff --check -- src/cards.config.js cards-google-sheet.csv project-memory/updates.md project-memory/inbox/for-dev.md project-memory/inbox/for-gd.md`.
- Static/source checks passed: local config and CSV show `monster-win-coins` amount `10`, description has no final period, and stale `monster-win-coins,15` / `получает 15 монет` for this card is gone.
- Google Sheet readback confirmed `tadam!A8:N8`: `monster-hunt`, amount `10`, count `2`, description `За победу над монстром игрок получает 10 монет`.
- Browser smoke was not run; this sandbox previously rejects local server binding with `EPERM`.

Open questions:
- None.

## 2026-06-15 00:39 - GD

Changed:
- Added `ACTIVE TADAM BALANCE 2026-06-15 00:39 - Monster victory reward 15 to 10`.
- Assigned owner `Dev 3`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- TADAM monster victory reward card should award `10` coins instead of `15`.
- Sync local config, CSV, and Google Sheet.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 18:33 - Art/UI

Changed:
- Adjusted all card face art to better match the user reference: icons are slightly larger and placed a bit lower than the previous compact pass.
- Preserved the clean parchment face without the strange inner backing/panel.
- Bumped card-face asset cache keys to `20260612-1800`; the stylesheet itself is already cache-bumped by Dev to `20260612-1811`.
- Added an updated preview sheet for the bigger/lower art pass.

Files:
- `assets/cards/good_front.png`
- `assets/cards/bad_front.png`
- `assets/cards/tadam_front.png`
- `assets/cards/event_front.png`
- `assets/cards/shop_front.png`
- `styles.css`
- `outputs/card_faces_art_bigger_lower_preview.png`
- `project-memory/updates.md`

Notes for others:
- Visual asset/layout only; no card effects/text/rules, gameplay, decks, dice, saves, or protocol changed.
- Checks passed: PNG dimensions/load validation, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-12 18:28 - Dev 3

Changed:
- Implemented `ACTIVE BATTLE UI 2026-06-12 18:11 - Animated combat roll formula`.
- Added a shared battle-only compact formula in the common dice animation path.
- Formula appears after dice stop and is held briefly before/while the battle result is committed to HUD state.
- Formula covers positive, negative, and zero bonuses, e.g. `Кубики: 6 + 4 = 10 · Бонусы: +3 · Итог: 13`.
- Ordinary movement and non-battle random/event rolls remain uncluttered.
- VS/final boss player rolls now explicitly mark the shared player battle roll as battle-only for formula display.
- Ordinary monster, final monster, `Сплочение`, and `Бой за старт` use existing battle dice paths and show formula for the current roller.
- Phone/controller dice result now displays the same compact formula.
- Bumped host/controller CSS and script cache keys to `20260612-1811`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check -- src/game.js src/controller.js styles.css index.html controller.html`.
- Static/source checks passed: formula text is created only for `isBattleRoll`, `isEnemyBattle`, or `isFinalBattle`; ordinary movement/random event calls do not pass those flags.
- Browser smoke was not run because this sandbox rejects local server binding with `EPERM`.

Open questions:
- None.

## 2026-06-12 18:11 - GD

Changed:
- Added `ACTIVE BATTLE UI 2026-06-12 18:11 - Animated combat roll formula`.
- Assigned owner `Dev 3`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- During all battle dice animations, show a compact formula like `Кубики: 6 + 4 = 10 · Бонусы: +3 · Итог: 13`.
- Scope includes ordinary monsters, final monster/boss, VS, and team battles.
- Ordinary movement/random-event rolls should stay uncluttered.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 17:50 - Art/UI

Changed:
- Restored the card face art placement/scale to the compact reference arrangement requested by the user.
- Replaced the briefly lowered art pass on all face PNGs.
- Bumped card-face asset cache keys to `20260612-1750`.
- Added an updated reference-position preview sheet.

Files:
- `assets/cards/good_front.png`
- `assets/cards/bad_front.png`
- `assets/cards/tadam_front.png`
- `assets/cards/event_front.png`
- `assets/cards/shop_front.png`
- `styles.css`
- `index.html`
- `outputs/card_faces_reference_position_preview.png`
- `project-memory/updates.md`

Notes for others:
- Visual asset/layout only; no card effects/text/rules, gameplay, decks, dice, saves, or protocol changed.
- Checks passed: PNG dimensions/load validation, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-12 17:40 - Art/UI

Changed:
- Moved the small baked card-face art slightly lower on all face PNGs to add more top padding.
- Preserved the current smaller art scale and clean no-backing parchment look.
- Bumped card-face asset cache keys to `20260612-1740`.
- Added an updated preview sheet for the lowered small-art card faces.

Files:
- `assets/cards/good_front.png`
- `assets/cards/bad_front.png`
- `assets/cards/tadam_front.png`
- `assets/cards/event_front.png`
- `assets/cards/shop_front.png`
- `styles.css`
- `index.html`
- `outputs/card_faces_small_art_lower_preview.png`
- `project-memory/updates.md`

Notes for others:
- Visual asset/layout only; no card effects/text/rules, gameplay, decks, dice, saves, or protocol changed.
- Checks passed: PNG dimensions/load validation, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-12 17:34 - Dev 3

Changed:
- Implemented `ACTIVE JOE AUCTION 2026-06-12 17:25 - Allow any bid amount`.
- Human Joe Auction bids now validate arbitrary whole-number amounts instead of only fixed multiples of `5`.
- Host auction prompt now has a numeric bid form with integer `step=1`, min/max, validation text, and submit button.
- Phone/controller now has an `auction-bid` direct numeric entry flow plus pass.
- Phone action payload now carries `amount` for custom auction bids.
- Legal bids are `0` for pass or any integer from `1` through the bidder's available coins.
- Bots still use simple rounded quick bids through a bot-only helper, capped by available coins.
- Winner logic, all-pass behavior, tie dice roll-off, winner payment, and winner receiving all 3 Shop cards were not changed.
- Losing/pass players still pay nothing.
- Bumped host CSS/JS cache keys to `20260612-1725`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Quick bid buttons remain for convenience, but the host and phone both have direct numeric entry for arbitrary integer bids.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check -- src/game.js src/controller.js styles.css index.html project-memory/updates.md project-memory/inbox/for-gd.md project-memory/inbox/for-dev.md`.
- Static/source checks passed: no human modulo-5-only bid path remains; legal `7`/`13` bid strings normalize successfully; bids above player coins are rejected; pass resolves to `0`.
- Browser smoke was not run because this sandbox rejects local server binding with `EPERM`.

Open questions:
- None.

## 2026-06-12 17:30 - Art/UI

Changed:
- Reduced the baked art size on all card face PNGs back toward the smaller layout requested by the user.
- Kept the clean parchment face without the strange inner backing/panel.
- Bumped card-face asset cache keys to `20260612-1725`.
- Added an updated preview sheet for the small-art/no-backing card faces.

Files:
- `assets/cards/good_front.png`
- `assets/cards/bad_front.png`
- `assets/cards/tadam_front.png`
- `assets/cards/event_front.png`
- `assets/cards/shop_front.png`
- `styles.css`
- `index.html`
- `outputs/card_faces_small_art_no_backing_preview.png`
- `project-memory/updates.md`

Notes for others:
- Visual asset/layout only; no card rules/effects/text, gameplay, decks, dice, bots, saves, or phone protocol changed.
- Checks passed: PNG dimensions/load validation, `node --check src/game.js`, `git diff --check`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-12 17:25 - GD

Changed:
- Added `ACTIVE JOE AUCTION 2026-06-12 17:25 - Allow any bid amount`.
- Assigned owner `Dev 3`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Joe Auction bids should allow any legal whole-number coin amount, not only multiples of `5`.
- Pass/winner/3-card reward rules should stay the same.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 17:24 - Dev 1

Changed:
- Completed `ACTIVE PORTAL LABEL 2026-06-12 17:22 - Open portal choice says Портал N`.
- Updated the open-portal destination label helper so both `монстр N` and `Монстр N` display as `Портал N`.
- Preserved destination cells/options/mechanics; only the choice label text changes.
- Bumped host script cache key to `20260612-1722`.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Static check confirmed `монстр 2 => Портал 2`, `Монстр 2 => Портал 2`, and existing `Портал 3` remains unchanged.
- Browser smoke passed on `http://localhost:5173`: page loaded with `game.js?v=20260612-1722`, board/roll button present, no console errors.
- Full manual open-portal prompt was not forced.

Open questions:
- None.

## 2026-06-12 17:22 - GD

Changed:
- Added `ACTIVE PORTAL LABEL 2026-06-12 17:22 - Open portal choice says Портал N`.
- Assigned owner `Dev 1`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Open-portal destination choices must say `Портал N` with a capital `П`, not `монстр N`.
- Mechanics and destination options must not change.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 17:21 - Dev 1

Changed:
- Completed `ACTIVE BOT STRATEGY 2026-06-12 17:18 - Spend extra-die Shop cards aggressively in final monster fight`.
- Added a final-monster-specific bot rule for `optional-extra-die` Shop cards:
  - If a bot is fighting the final monster, has an affordable usable extra-die card, and the base roll is not already guaranteed to win, the bot uses the card.
  - Because pre-roll cards are processed one by one, the reported `18 coins + 3 cards costing 5` case now uses all 3 cards and spends 15 coins.
- Ordinary non-final monster/movement extra-die strategy remains on the previous scoring formula.
- Bumped host script cache key to `20260612-1718`.
- Added GD context handback only; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke passed on `http://localhost:5173`: page loaded with `game.js?v=20260612-1718`, board/roll button present, no console errors.
- Full forced final-monster scenario was not run; static/source check confirms the reported case resolves to 3 uses while affordable.

Open questions:
- None.

## 2026-06-12 17:18 - GD

Changed:
- Added `ACTIVE BOT STRATEGY 2026-06-12 17:18 - Spend extra-die Shop cards aggressively in final monster fight`.
- Assigned owner `Dev 1`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- In final monster fights, bots should not hoard coins when usable `extra-die` Shop cards substantially improve their chance to win.
- Reported case `18 coins + 3 extra-die cards` must result in using all three and spending `15` coins.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 17:16 - Art/UI

Changed:
- Removed the strange baked inner backing from card faces by restoring the clean parchment face PNGs for `Хорошо`, `Плохо`, `TADAM`, `Событие`, and `Лавка Джо`.
- Bumped card-face asset cache keys so the browser reloads the clean no-backing versions.
- Kept the card text punctuation fix so coin/dice icons stay attached to following punctuation instead of leaving a comma on a separate line.
- Added a quick visual preview contact sheet for checking all clean card faces together.

Files:
- `assets/cards/good_front.png`
- `assets/cards/bad_front.png`
- `assets/cards/tadam_front.png`
- `assets/cards/event_front.png`
- `assets/cards/shop_front.png`
- `styles.css`
- `index.html`
- `src/game.js`
- `outputs/card_faces_no_backing_preview.png`
- `project-memory/updates.md`

Notes for others:
- Visual/layout only: no card effects, rules, decks, balance, dice, bots, saves, or protocols changed.
- Checks passed: PNG dimensions/load validation, `node --check src/game.js`.
- Per user preference, no GD/QA handback was sent for this direct user task.

Open questions:
- None.

## 2026-06-12 17:11 - Dev 3

Changed:
- Implemented `ACTIVE MONSTER LOSS REWARDS 2026-06-12 17:03 - Tiered defeat rewards by monster`.
- Added monster defeat reward helpers with map: tier `1` -> free `Лавка Джо`, tier `2` -> free `Лавка Джо` + `5` coins, tier `3` -> free `Лавка Джо` + `10` coins, tier `4` -> free `Лавка Джо` + `20` coins.
- Tier lookup uses board door base `damage` ordering, with route order as tie-break, so `Сильные` mode does not change reward tier.
- Last/final board monster with base `24` counts as tier `4`.
- Defeat coins use normal reward `addCoins(...)`, so Joe Shop receive-coin bonus still applies to this bank/reward gain.
- Free Shop card reward still uses existing `drawFreeShopCard(...)` finite Shop deck lifecycle.
- Defeat reward is granted only after `resolveSecondChance(...)` does not retry the fight.
- Battle HUD outcome/log/prompt now show the tiered defeat reward.
- Bumped host script cache key to `20260612-1703`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- `monster-rematch` victory retry path was not changed.
- Team/shared battle losses (`Сплочение`, `Бой за старт`) and final boss PvP rewards were not changed.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check -- src/game.js index.html project-memory/updates.md project-memory/inbox/for-gd.md project-memory/inbox/for-dev.md`.
- Static/source checks passed for reward map, base-damage tier lookup, existing free Shop helper, and retry-before-reward ordering.
- Browser smoke was not run because this sandbox rejects local server binding with `EPERM`.

Open questions:
- None.

## 2026-06-12 17:03 - GD

Changed:
- Added `ACTIVE MONSTER LOSS REWARDS 2026-06-12 17:03 - Tiered defeat rewards by monster`.
- Assigned owner `Dev 3`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Monster defeat rewards now scale by monster tier: `1 -> Лавка Джо`, `2 -> Лавка Джо + 5`, `3 -> Лавка Джо + 10`, `4 -> Лавка Джо + 20`.
- Tier is based on monster identity/order, not modified strength.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 16:44 - Dev 1

Changed:
- Completed `ACTIVE SETTINGS 2026-06-12 16:42 - Starting coins dropdown`.
- Added settings dropdown `Монет на старте` with options `10` and `20`; default remains `10`.
- New game initialization now gives every player/bot the selected starting coin amount.
- Added safe fallback so missing/unknown values resolve to `10`.
- Included `startingCoins` in collected game settings/history snapshot path.
- Bumped host script cache key to `20260612-1642`.
- Added GD context handback only; QA was not involved.

Files:
- `index.html`
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke passed on `http://localhost:5173`: selecting `10` then `Новая игра` showed players at 10 coins; selecting `20` then `Новая игра` showed players at 20 coins; no console errors.
- Scope stayed on settings/new-game initialization; economy transfer bonus logic was not touched.

Open questions:
- None.

## 2026-06-12 16:52 - Dev 3

Changed:
- Implemented `ACTIVE ECONOMY FIX 2026-06-12 16:39 - No receive-coin bonus on player-to-player transfers`.
- Added `addCoins(player, amount, { skipReceiveBonus })` so direct transfers can suppress only the Joe Shop receive-coin bonus.
- `stealCoins(...)` now credits the receiver with `skipReceiveBonus: true`.
- Covered transfer cards/effects that use `stealCoins(...)`: chosen steal, chosen give, `Равновесие`, `Сбор монет`, TADAM `jump-steal`, and TADAM `land-steal`.
- Buying a Shop card from another player now pays the owner without triggering the owner's receive-coin bonus.
- Normal bank/reward gains still use default `addCoins(...)`, so the receive-coin bonus still applies to ordinary positive gains.
- Bumped host script cache key to `20260612-0427`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- VS pot and Joe Auction bank payments were not changed; they are still treated as bank/pot flows rather than direct player-to-player receive-bonus transfers.
- Transfer logs still report exact `taken` / `given` / `cost` amounts.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check -- src/game.js index.html project-memory/updates.md project-memory/inbox/for-gd.md project-memory/inbox/for-dev.md`.
- Static/source checks passed: transfer paths suppress the receive-coin bonus; non-transfer reward paths still allow it.
- Browser smoke was not run because this sandbox still rejects local server binding with `EPERM`.

Open questions:
- None.

## 2026-06-12 16:42 - GD

Changed:
- Added `ACTIVE SETTINGS 2026-06-12 16:42 - Starting coins dropdown`.
- Assigned owner `Dev 1`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Add `Монет на старте` setting with dropdown values `10` and `20`.
- New game should give every human/bot player the selected starting coins.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 16:43 - Dev 3

Changed:
- Implemented `ACTIVE SETTINGS FIX 2026-06-12 16:37 - Strong monsters affect last monster`.
- Removed the `isFinalBoss` exclusion from `ordinaryMonsterStrengthBonus(...)`.
- `Сильные` mode now applies `+2` to the last/final board monster door, so base `24` displays/fights as `26`.
- `Стандартные` mode keeps that monster at `24`.
- The first ordinary monster still stays at force `6` in `Сильные` mode.
- Bumped host script cache key to `20260612-0426`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- The final boss PvP/opponent bonus formula was not changed.
- Existing labels/tooltips/HUD/logs/bot scoring use `effectiveMonsterStrength(...)`, so the final board monster gets the corrected value consistently.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check -- src/game.js index.html project-memory/updates.md project-memory/inbox/for-gd.md project-memory/inbox/for-dev.md`.
- Static/source checks passed: no `isFinalBoss` exclusion remains in `ordinaryMonsterStrengthBonus(...)`; strong mode converts the final board monster's `24` to `26`; standard mode remains base `24`.
- Browser smoke was not run because this sandbox still rejects local server binding with `EPERM`.

Open questions:
- None.

## 2026-06-12 16:39 - GD

Changed:
- Added `ACTIVE ECONOMY FIX 2026-06-12 16:39 - No receive-coin bonus on player-to-player transfers`.
- Assigned owner `Dev 3`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- The Shop-card bonus `Когда получаешь монеты получай на 2 больше` must not trigger when coins are transferred between players.
- It should still apply to ordinary rewards/gains from non-player sources.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 16:37 - GD

Changed:
- Added `ACTIVE SETTINGS FIX 2026-06-12 16:37 - Strong monsters affect last monster`.
- Assigned owner `Dev 3`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- In `Сильные` mode, the last/strongest board monster must be `26`, not `24`.
- This corrects the previous intentional exclusion of final monster doors from the monster-strength modifier.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 04:42 - Art/UI

Changed:
- Fixed card face wrapping so punctuation after coin/dice icons does not detach onto its own line.
- Added `card-text-nowrap` wrapping for iconized coin/dice punctuation and restored it to inline behavior inside card text blocks.
- Slightly widened dense Joe Shop card text and changed its wrapping behavior to avoid awkward balanced-line punctuation breaks.
- Bumped host CSS/JS cache keys to `20260612-0425`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`
- `outputs/card_punctuation_wrap_preview.html`

Notes for others:
- Visual/text-layout only; no card effects, card text, deck logic, balance, dice, or rules changed.
- Browser preview confirmed the problematic `Когда получаешь [coin], получай...` layout no longer leaves the comma on a separate line.
- Checks passed: `node --check src/game.js`, `git diff --check`.

Open questions:
- None.

## 2026-06-12 04:47 - Dev 3

Changed:
- Implemented `ACTIVE TEAM BATTLE 2026-06-12 04:37 - Manual player rolls in shared/team battles`.
- `Сплочение` now pauses before each player's team-battle roll and gives that contender the `Бросить кубик` action.
- `Бой за старт` now uses the same per-contender manual roll prompt.
- Human players roll one by one; bot contenders continue through the existing bot `autoFor` pacing.
- Existing Unity/team HUD current-roller highlighting stays active while waiting and rolling, previous results remain visible, and win/loss still resolves only after all players have rolled.
- Phone roll actions remain scoped to the current rolling contender through the existing action prompt owner.
- Bumped host script cache key to `20260612-0424`.
- Follow-up to `Сила монстров`: in `Сильные` mode the first ordinary monster now stays at force `6`; later ordinary monsters get the `+2` modifier.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Team rewards, losses, target formulas, individual monster battles, final boss PvP, and VS were not changed.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check -- src/game.js index.html project-memory/updates.md project-memory/inbox/for-gd.md project-memory/inbox/for-dev.md`.
- Static/source checks passed for per-player shared battle prompts, current roller state, bot auto-resolve through `autoFor`, final result after all rolls, and first ordinary monster force `6` in strong mode.
- Browser smoke was not run because this sandbox has been rejecting local server binding with `EPERM`.

Open questions:
- None.

## 2026-06-12 04:37 - GD

Changed:
- Added `ACTIVE TEAM BATTLE 2026-06-12 04:37 - Manual player rolls in shared/team battles`.
- Assigned owner `Dev 3`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- User clarified this is about `Командная битва`, especially `Сплочение`, not ordinary `VS`.
- Human players must roll manually one by one; bots may auto-roll.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 04:36 - Dev 3

Changed:
- Implemented `ACTIVE SETTINGS 2026-06-12 04:28 - Replace Проходить все with monster strength dropdown`.
- Replaced the visible settings checkbox `Проходить все` with a `Сила монстров` dropdown.
- Added dropdown options `Стандартные` and `Сильные` using existing `settings-select` styling.
- Added `monsterStrengthMode` to collected game settings/history snapshots.
- `Сильные` mode keeps the first ordinary monster at force `6` and adds `+2` to later ordinary monster strength through `effectiveMonsterStrength(...)`.
- Follow-up rework at 2026-06-12 16:43 changed the final board monster door to receive the +2 modifier; final boss battle formulas and boss-per-opponent bonus remain unchanged.
- Retired visible `Проходить все` UI; the old pass-through helper now safely falls back to default behavior.
- Bumped host script cache key to `20260612-0424`.
- Sent GD a context handback only; QA was not involved.

Files:
- `index.html`
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Existing ordinary monster displays/logs/HUD/bot scoring already use `effectiveMonsterStrength(...)`, so strong mode flows through the shared monster-strength path.
- Standard mode returns the existing base + monster-rage behavior.
- No settings localStorage persistence was found beyond saved game history snapshots; older saved `passThroughMode` values are ignored safely.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check -- src/game.js index.html`.
- Static/source checks passed: no visible settings label `Проходить все`; settings include `Сила монстров`, `Стандартные`, `Сильные`; strong mode keeps the first ordinary monster at force `6` and adds `+2` to later ordinary monsters.
- Browser smoke was not run because this sandbox rejected local server binding on `127.0.0.1:5173` with `EPERM`.

Open questions:
- None.

## 2026-06-12 04:28 - GD

Changed:
- Added `ACTIVE SETTINGS 2026-06-12 04:28 - Replace Проходить все with monster strength dropdown`.
- Assigned owner `Dev 3`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Replace the `Проходить все` checkbox with a `Сила монстров` dropdown.
- `Стандартные` keeps current monster strength; `Сильные` gives ordinary monsters `+2` strength.
- QA is not involved unless the user explicitly asks.

Open questions:
- Whether final boss should be affected is intentionally left unchanged unless it already shares ordinary monster-strength code.

## 2026-06-12 04:27 - Dev 1

Changed:
- Completed `ACTIVE CHOICE UI 2026-06-12 04:18 - Add board-view button to blocking choice prompts`.
- Added a compact top/header `Контроль кубика` choice before the large value-change popup:
  - `Поменять значение` opens the large value-change popup.
  - `Не менять` resolves immediately without opening the large popup.
- Added `Просмотр поля` to the shared blocking card-choice prompt; it switches to board preview without resolving/canceling the pending choice and returns through `К выбору`.
- Mirrored the compact dice-control intent actions into phone controller actions so phone players are not stuck during the new pre-choice.
- Marked the task done in `for-dev.md` and added GD context handback only under the current pipeline.

Files:
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`; `git diff --check`; Browser smoke on `http://localhost:5173` loaded the game, found board/turn actions/choice panel, and showed no console errors.
- Full manual `Контроль кубика` trigger was not run; behavior was verified statically through `maybeUseDiceControl`, `turnActionsText`, `renderChoicePanel`, and phone action handling.
- QA was not involved.

Open questions:
- None.

## 2026-06-12 04:22 - GD

Changed:
- Added an addendum to `ACTIVE CHOICE UI 2026-06-12 04:18`.
- `Контроль кубика` should first show a compact header/top choice: `Поменять значение` opens the large popup; `Не менять` resolves immediately without opening it.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner remains `Dev 1`.
- The board-view button still belongs in the large value-change popup after `Поменять значение`.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 04:18 - GD

Changed:
- Added `ACTIVE CHOICE UI 2026-06-12 04:18 - Add board-view button to blocking choice prompts`.
- Assigned owner `Dev 1`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- User wants a board-view button inside the large blocking choice prompt, especially the `Контроль кубика: ход` prompt.
- The button must let the player inspect the board and return to the same unresolved choice without selecting/canceling anything.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 04:16 - Art/UI 2

Changed:
- Updated the preview-only `steps` icon candidate per latest user feedback.
- Removed the road/path entirely.
- Kept only the leather boot and added a golden motion/speed swirl effect.
- Kept the asset preview-only; it is not wired into gameplay/UI.
- Sent GD a context handback only under the current pipeline; QA was not involved.

Files:
- `assets/icons/steps_candidate_512.png`
- `outputs/steps-icon-candidate-preview.png`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Asset status: preview-only / not wired.
- Final candidate: `assets/icons/steps_candidate_512.png`, PNG, 512x512, RGBA with transparent corners.
- Preview: `outputs/steps-icon-candidate-preview.png`.
- Checks passed: PNG dimension/alpha validation; `git diff --check`.

Open questions:
- None.

## 2026-06-12 04:10 - Dev 3

Changed:
- Implemented `ACTIVE EVENT TEXT 2026-06-12 04:03 - Update Портальный обмен no-field-effects text`.
- Updated Event card `portal-swap` / `Портальный обмен` description to exactly `Поменяйся местами с любым игроком. Эффекты полей не применяются`.
- Synced Google Sheet `Cards Config` / `event!N8`, local `src/cards.config.js`, and `cards-google-sheet.csv`.
- Updated `Портальный обмен` choice summary/log copy to mention that field effects are not applied.
- Bumped host/card-config cache keys to `20260612-0421`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- `portal-swap` id, title, effect, and count remain unchanged.
- Static source check confirms `resolveEventPortalSwap(...)` swaps `position` values directly and does not call `resolveLanding(...)`, so destination field effects are not applied; behavior was not changed.
- Google Sheet readback confirmed `event!A8:N8` has the updated description.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `git diff --check -- src/game.js src/cards.config.js cards-google-sheet.csv index.html`.
- Browser smoke was not run because this sandbox rejected local server binding on `127.0.0.1:5173` with `EPERM`.

Open questions:
- None.

## 2026-06-12 04:03 - GD

Changed:
- Reassigned `ACTIVE EVENT TEXT 2026-06-12 04:03 - Update Портальный обмен no-field-effects text` from stalled `Dev 2` to `Dev 3`.
- Marked the completed `NEW GAME UI RESET` task as done in `for-dev.md`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is now `Dev 3`.
- Required text remains: `Поменяйся местами с любым игроком. Эффекты полей не применяются`.
- Dev 3 should sync Google Sheet `Cards Config`, `src/cards.config.js`, and `cards-google-sheet.csv`, preserving fresh Art/UI card-face layout/assets.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 03:58 - Dev 1

Changed:
- Implemented `ACTIVE NEW GAME UI RESET 2026-06-12 03:53 - Clear stale transient UI on new game`.
- Added `resetTransientUi()` and call it at the start of `newGame()` before fresh state/render.
- Added immediate hard cleanup for event toast/action prompts/roll contexts, choice panel, battle HUD, dice layers, board preview overlays, pending state/resolvers, timers, phone card preview, and phone dice preview.
- Added a transient reset token guard to `animateDice(...)` so stale dice animations cannot write old results after `Новая игра`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `git diff --check`, static reset coverage scan, and browser smoke pressing `Новая игра` on `localhost:5173`.
- Browser smoke confirmed event toast, choice panel, final battle HUD, dice layers, and board overlays are clear after new game; forced stale DOM injection was not possible because browser evaluate is read-only.

Open questions:
- None.

## 2026-06-12 03:53 - GD

Changed:
- Added and dispatched Dev 1 task `ACTIVE NEW GAME UI RESET 2026-06-12 03:53 - Clear stale transient UI on new game`.
- Marked the completed Chaos Portal nearest-field task as done in `for-dev.md`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 1`.
- Starting a new game must hard-clear stale card reveals/action prompts and all similar transient UI leftovers.
- Scope includes `eventToast`, choice panel, battle HUDs, dice layers, board preview overlays, pending resolvers/timers, and phone/controller previews.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 02:51 - Dev 1

Changed:
- Implemented `ACTIVE CHAOS PORTAL NEAREST 2026-06-12 02:48 - Shop/Good outcomes use true nearest field`.
- Changed Chaos Portal `3-4` and `5` outcomes to use true nearest matching route field in either direction.
- Added explicit equal-distance tie-break toward forward route positions.
- Kept `1-2` backward monster/portal and `6` forward monster/portal behavior unchanged.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `git diff --check`, and static source checks for no forward-first lookup in Chaos Portal shop/good outcomes.
- Browser/manual Chaos Portal destination smoke was not run.

Open questions:
- None.

## 2026-06-12 02:48 - GD

Changed:
- Added and dispatched Dev 1 task `ACTIVE CHAOS PORTAL NEAREST 2026-06-12 02:48 - Shop/Good outcomes use true nearest field`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 1`.
- Source check confirmed `Портал хаоса` currently uses forward-first lookup for `3-4` Лавка Джо and `5` Хорошо.
- Required change: those two outcomes should use the truly nearest matching field by route distance in either direction, with forward as an equal-distance tie-breaker.
- Keep `1-2` backward to monster/portal and `6` forward to monster/portal unchanged.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 02:42 - GD

Changed:
- Added and dispatched Dev 2 task `ACTIVE EVENT TEXT 2026-06-12 02:42 - Update Портальный обмен no-field-effects text`.
- Marked the completed TADAM stacking task as done in `for-dev.md`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 2`.
- Update Event card `portal-swap` / `Портальный обмен` description to `Поменяйся местами с любым игроком. Эффекты полей не применяются`.
- Keep id/effect/count unchanged and sync Google Sheet `Cards Config`, local config, and CSV.
- Preserve fresh Art/UI card-face layout/assets.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 02:29 - Art/UI

Changed:
- Added the card face layout rule to project memory: compact top art, dense lower text area, minimal empty space with clean edge padding.
- Rebuilt all face card PNGs with smaller top art and a cleaner lower text field: `Хорошо`, `Плохо`, `ТАДАМ`, `Событие`, and `Лавка Джо`.
- Updated card face CSS so text starts around the middle, fills the lower half, splits multi-sentence text into readable paragraphs, and uses dense/long sizing across Good/Bad/TADAM/Shop/Event.
- Added density classes to Bad, TADAM, and Shop reveal markup so they follow the same fitting behavior as Good cards.
- Bumped card face asset/style cache references to `20260612-0420`.

Files:
- `assets/cards/good_front.png`
- `assets/cards/bad_front.png`
- `assets/cards/tadam_front.png`
- `assets/cards/event_front.png`
- `assets/cards/shop_front.png`
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/updates.md`
- `outputs/card_face_css_preview.html`
- `outputs/card_faces_dense_layout_preview.png`
- `outputs/card_faces_dense_text_preview.png`

Notes for others:
- Visual/layout-only update; no card text, effects, balance, deck logic, or gameplay rules changed.
- Backups of the previous face PNGs are in `outputs/*_front_before_dense_text_layout.png`.
- Browser CSS preview at `http://localhost:5173/outputs/card_face_css_preview.html` showed no horizontal or vertical text overflow across the five card types.
- Checks passed: PNG validation for all five face images, `node --check src/game.js`, `git diff --check` for touched files.

Open questions:
- None.

## 2026-06-12 01:38 - Dev 3

Changed:
- Implemented `ACTIVE TADAM STACKING 2026-06-12 01:32 - Apply all active field TADAM effects`.
- Red and green field resolution now applies all matching active TADAM field effects via `activeTadamEffects(...)` instead of only the first `activeFieldEffect(...)`.
- Bot field scoring now sums all active red/green TADAM field effects.
- Red/green field labels now summarize stacked move totals and multiple draw effects.
- Bumped host script cache key to `20260612-0420`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Duplicate `red-field` move effects now apply sequentially; two `steps: -5` copies move the player 10 steps back total.
- Duplicate draw effects now draw once per active TADAM copy; mixed move/draw field effects resolve in stored active TADAM order.
- TADAM card data/counts, visible slot order, active TADAM limit/discard lifecycle, and base red/green coin effects were not changed.
- Checks passed: `node --check src/game.js`, `git diff --check -- src/game.js index.html`.
- Static/source check passed: red/green field resolution no longer uses single `activeFieldEffect(...)` and uses `activeTadamEffects(...)`; labels/scoring also use all matching field effects.
- Browser smoke was not run because this sandbox rejected local server binding on `127.0.0.1:5173` with `EPERM`.

Open questions:
- None.

## 2026-06-12 01:32 - GD

Changed:
- Added and dispatched Dev 3 task `ACTIVE TADAM STACKING 2026-06-12 01:32 - Apply all active field TADAM effects`.
- Marked the completed portal popup task as done in `for-dev.md`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 3`.
- All active TADAM cards that affect red/green fields should trigger, including duplicate copies.
- Example bug to fix: two active `Красные поля двигают на 5 клеток назад` cards should move the player 10 steps back on red, not 5.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 01:15 - Dev 2

Changed:
- Implemented `ACTIVE BLACK MARKET REWORK 2026-06-12 01:06 - Exchange Shop cards for rewards`.
- Replaced old coin-payment Black Market deals with owned face-up Shop-card exchanges.
- Added always-visible disabled exchange choices with card-count reasons.
- Implemented 1-card exchange for permanent `+2 к силе`, 2-card exchange for `30 монет`, and 3-card exchange for `+10` next monster battle bonus plus `30` forward steps with normal landing resolution.
- Updated Black Market field tooltip/effect text and bot scoring.

Files:
- `src/game.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Only face-up owned Shop cards are exchangeable; face-down cards from `flip-shop-down` are excluded until bought back.
- Exchanged owned Shop cards are removed from inventory and do not return to the physical Shop deck/discard.
- 3-card exchange uses `setNextMonsterBattleBonus(player, 10)`, so it refreshes/sets to `+10` instead of stacking above it.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`, static Black Market contract scan, and browser host smoke at `localhost:5173`.
- Full manual playthrough of every exchange branch was not run.

Open questions:
- None.

## 2026-06-12 01:13 - Dev 1

Changed:
- Implemented `ACTIVE PORTAL POPUP TEXT 2026-06-12 01:10 - Use Portal labels in portal destination popup`.
- Added `openPortalChoiceLabel(...)` for open-portal destination choices.
- Portal destination popup now shows `Портал 1`, `Портал 2`, etc. when source door labels are `Монстр 1`, `Монстр 2`, etc.
- Kept underlying `door.label` values unchanged, so closed monster labels/logs/tooltips remain `Монстр N`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `git diff --check`, and static source checks for portal choice labels vs unchanged monster labels.
- Browser/manual open-portal popup smoke was not run.

Open questions:
- None.

## 2026-06-12 01:10 - GD

Changed:
- Added and dispatched Dev 1 task `ACTIVE PORTAL POPUP TEXT 2026-06-12 01:10 - Use Portal labels in portal destination popup`.
- Noted Dev 3 final-battle balance handback and marked the corresponding for-dev item as done.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 1`.
- Portal destination popup choices should show `Портал 1`, `Портал 2`, etc. instead of `Монстр 1`, `Монстр 2`, etc.
- Closed monster labels and portal mechanics should remain unchanged.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 01:12 - Dev 3

Changed:
- Implemented `ACTIVE FINAL BATTLE BALANCE 2026-06-12 01:06 - Boss gets +3 per opposing player`.
- Final battle boss start/opponent bonus now uses `challengers.length * 3`.
- Updated final battle prompt/log/final-force breakdown text to describe `+3 за каждого противника`.
- Added `opponentBonusPerPlayer` to the final battle history summary force data and updated history force text for new summaries.
- Bumped host script cache key to `20260612-0419`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Boss still rolls once per challenger; the +3-per-opponent bonus is applied once before boss rolls and is not repeated inside each roll.
- Player/challenger scoring, final battle winner logic beyond the changed boss force, ordinary monster battles, `Сплочение`, `Бой за старт`, and VS were not changed.
- Checks passed: `node --check src/game.js`, `git diff --check -- src/game.js index.html`.
- Static/source check passed: `bossOpponentBonus` uses `challengers.length * 3`; no `+1 ... противник` / old `за противников` final-battle text remains in `src/game.js`.
- Browser smoke was not run because this sandbox rejected local server binding on `127.0.0.1:5173` with `EPERM`.

Open questions:
- None.

## 2026-06-12 01:06 - GD

Changed:
- Added and dispatched Dev 3 task `ACTIVE FINAL BATTLE BALANCE 2026-06-12 01:06 - Boss gets +3 per opposing player`.
- Added and dispatched Dev 2 task `ACTIVE BLACK MARKET REWORK 2026-06-12 01:06 - Exchange Shop cards for rewards`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Ownership:
  - `Dev 3`: final battle boss opponent bonus balance.
  - `Dev 2`: Black Market exchange rework.
- Boss final-battle bonus should become `+3 к силе` for each opposing player, applied once before boss rolls.
- Black Market should stop using coin-payment deals and instead exchange owned face-up Shop cards for +2 strength, 30 coins, or +10 next-monster bonus plus 30 forward steps.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 01:08 - Dev 3

Changed:
- Implemented `ACTIVE FINAL BATTLE ROLL HIGHLIGHT 2026-06-12 00:56 - Animate and highlight current roller`.
- Final battle score-strip/token active highlight now uses `state.finalBattleProgress.rollingPlayerId` while the final battle is active instead of falling back to the last normal-turn active player.
- Added final-battle rolling state updates before challenger prompts, during challenger rolls, before boss prompts, and during boss rolls.
- Added final HUD `is-rolling` class for challenger side and boss side during actual final battle dice animation.
- Bumped stylesheet cache key to `20260612-0418` for the small rolling-highlight CSS addition.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Final battle math, scoring, rewards, history export, boss bonus rules, and ordinary non-final roll highlights were not changed.
- Dice animation still receives the actual rolling player object; boss rolls pass the boss player and label instead of relying on `currentPlayer()`.
- Checks passed: `node --check src/game.js`, `git diff --check -- src/game.js styles.css index.html`.
- Browser smoke was not run because this sandbox rejected local server binding on `127.0.0.1:5173` with `EPERM`.

Open questions:
- None.

## 2026-06-12 01:01 - Dev 2

Changed:
- Implemented `ACTIVE EVENT CARDS 2026-06-12 00:52 - Add 5 new Событие cards`.
- Added 5 ordinary Event cards with `count: 2` and no final periods: `unity-start`, `shop-redistribution`, `fate-draw`, `triple-tadam`, `mass-good-bad`.
- Synced local config, CSV, and Google Sheet `Cards Config` / `event!A11:N15`.
- Implemented effects through central finite deck/lifecycle paths where applicable: shared monster battle, Shop redistribution, random Good/Bad/Shop draw, 3 sequential TADAM draws, and all-player Good/Bad draw.
- Bumped host/card-config cache keys to `20260612-0418`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Preserved Dev 1 `flip-shop-down` / face-down Shop behavior and recent Good/Bad pending status changes.
- `Кубик судьбы` and `Общий жребий` use roll-context prompts and allow `Контроль кубика` because the active player is rolling.
- `Перетасовка Лавки` treats face-down Shop cards as owned and redistributes pooled cards face-up.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`, static local/CSV card checks, Google Sheet readback, and browser host smoke at `localhost:5173`.
- Full manual playthrough of every new Event effect branch was not run.

Open questions:
- None.

## 2026-06-12 00:56 - GD

Changed:
- Added and dispatched Dev 3 task `ACTIVE FINAL BATTLE ROLL HIGHLIGHT 2026-06-12 00:56 - Animate and highlight current roller`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 3`.
- Dev 2 remains owner of the active Event-card pack; Dev 3 should keep the final-battle UI fix narrowly scoped.
- Required behavior: during final battle, dice animation and final-battle card highlight must follow the current roller, including boss rolls, not the last active turn player.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 00:52 - GD

Changed:
- Added ownership rule to the development docs: GD plans and multi-role tasks must explicitly name who owns each part, and every wave must have an owner before dispatch.
- Noted the same lifecycle rule in `handoff.md` for future chats.
- Added and dispatched Dev 2 task `ACTIVE EVENT CARDS 2026-06-12 00:52 - Add 5 new Событие cards`.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 2`.
- Dev 1's `flip-shop-down` blocker is complete as of 2026-06-12 00:31, so Dev 2 may start the Event-card pack.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-12 00:31 - Dev 1

Changed:
- Implemented `ACTIVE BAD CARDS WAVE 3 2026-06-12 00:04 - flip-shop-down face-down Shop cards`.
- Activated local `bad/flip-shop-down` with `count: 2` after adding handlers.
- Added face-down owned Shop state via `item.faceDown`, including host/phone visual chips and history/snapshot fields.
- Added player/bot flow to flip up to 2 face-up owned Shop cards down.
- Added pre-Shop buyback flow for face-down owned Shop cards at 5 coins each; buyback flips owned cards face-up without touching the physical Shop deck.
- Updated passive bonus helpers and final Shop score so face-down Shop cards do not provide passive benefits or final Shop points, while owned-card count effects still see them.
- Bumped host/controller/cache keys to `20260612-0417`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `src/cards.config.js`
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- CSV already had `flip-shop-down` with `count: 2`; no Sheet/CSV card-data change was needed.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`, static contract scan, and browser host/controller smoke at `localhost:5173`.
- Full manual playthrough of 0/1/2 flip cases and buyback branches was not run.

Open questions:
- None.

## 2026-06-12 00:04 - GD

Changed:
- Continued after Dev 2 Good-card handback.
- Added and dispatched Dev 1 task `ACTIVE BAD CARDS WAVE 3 2026-06-12 00:04 - flip-shop-down face-down Shop cards`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is the last deferred piece of the 9-card Bad pack.
- Owner is `Dev 1`.
- `flip-shop-down` should become local `count: 2` only after face-down Shop behavior is implemented.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-11 23:37 - Dev 2

Changed:
- Implemented `ACTIVE GOOD CARDS 2026-06-11 23:23 - Add 9 new Хорошо cards`.
- Added 9 Good cards to local config, CSV, and Google Sheet `Cards Config` / `good` (`good!A13:N21`), all with `count: 2` and no final periods.
- Added held Good status storage/display, phone snapshot status data, and trigger-time discard to the finite `good` discard pile.
- Implemented effects for `field-shield`, `bad-gift`, `green-path`, `second-chance`, `strength-potion`, `speed-potion`, `dice-control`, `backward-reversal`, and `coin-tribute`.
- Bumped host/card-config cache keys to `20260611-0416`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Dev 3 Bad Wave 2 local activation is preserved: the 6 pending Bad cards remain `count: 2`, and `flip-shop-down` remains `count: 0`.
- `dice-control` applies only to own rolls; it is intentionally not hooked into Joe Game's house die.
- CSV quoting was corrected for two existing comma-containing fields without changing card text.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`, static local/CSV card checks, and browser host smoke at `localhost:5173`.
- Full manual playthrough of every new effect was not run.

Open questions:
- None.

## 2026-06-11 23:23 - GD

Changed:
- Added and dispatched Dev 2 task `ACTIVE GOOD CARDS 2026-06-11 23:23 - Add 9 new Хорошо cards`.
- Good pack includes 9 cards: field shield, bad gift, green path, second chance, strength/speed potions, dice control, backward reversal, and coin tribute.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 2 should reuse/align with fresh pending-status patterns from Dev 3's Bad Wave 2.
- Do not implement Bad Wave 3 / `flip-shop-down` in this task.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-11 23:32 - Dev 3

Changed:
- Implemented `ACTIVE BAD CARDS WAVE 2 2026-06-11 23:03 - Pending Bad statuses`.
- Added local pending Bad status storage/display for drawn "Оставь эту карту себе" Bad cards.
- Implemented and activated local `count: 2` for `self-monster-minus3`, `skip-next-good`, `next-turn-pay-or-skip`, `monster-sixes-to-ones`, `block-next-coins`, and `monster-rematch`.
- Kept `flip-shop-down` deferred for Wave 3 with local `count: 0`.
- Bumped card config import cache key to `20260611-0415`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/game.js`
- `src/cards.config.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Pending Bad cards stay visible on the player and are discarded to the finite `bad` discard pile only when their trigger resolves.
- `self-monster-minus3` and `monster-sixes-to-ones` affect ordinary monster gates, final monster gate, and `Сплочение`; they do not affect final PvP boss battle.
- `monster-rematch` affects individual monster/final-monster wins only and repeats the same battle before any reward, door opening, TADAM monster-hunt reward, or final boss transition.
- `skip-next-good` intercepts before drawing from the Good deck, so no Good card is consumed.
- `block-next-coins` cancels the next positive coin gain without coin history/float for the blocked gain.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `git diff --check -- src/game.js src/cards.config.js`.
- Browser smoke was not run because the sandbox rejected local server binding on both `0.0.0.0:5173` and `127.0.0.1:5173` with `EPERM`.

Open questions:
- None.

## 2026-06-11 23:03 - GD

Changed:
- Accepted Dev 2 Wave 1 context handback for the next `Плохо` pack.
- Added and dispatched Dev 3 task `ACTIVE BAD CARDS WAVE 2 2026-06-11 23:03 - Pending Bad statuses`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Wave 2 should implement and locally activate 6 pending Bad cards.
- `flip-shop-down` remains deferred to Wave 3 and should stay local `count: 0`.
- Sheet/CSV already contain all 9 new rows with `count: 2`.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-11 23:02 - Dev 2

Changed:
- Implemented `ACTIVE BAD CARDS WAVE 1 2026-06-11 22:54 - Next Bad pack data and simple effects`.
- Added all 9 Wave 1 Bad-pack rows to Google Sheet `Cards Config` / tab `bad` and `cards-google-sheet.csv` with `count: 2`.
- Added all 9 cards to `src/cards.config.js`, but locally activated only `poorest-steals-shop` and `bad-die-choice` with `count: 2`; deferred Wave 2/3 cards are present with temporary `count: 0`.
- Implemented playable effects for `poorest-steals-shop` and `bad-die-choice`.
- Fixed `createDeckCopies()` so explicit `count: 0` stays non-drawable instead of falling back to 1.
- Bumped host/card-config cache keys to `20260611-0414`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Temporary divergence is intentional: Sheet/CSV are canonical pack data with all 9 cards at `count: 2`; local playable config keeps deferred Wave 2/3 cards at `count: 0` so they cannot silently draw/no-op.
- Deferred local `count: 0`: `self-monster-minus3`, `skip-next-good`, `next-turn-pay-or-skip`, `monster-sixes-to-ones`, `flip-shop-down`, `block-next-coins`, `monster-rematch`.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Static checks passed for local config/CSV; live Google Sheet readback confirmed `bad!A13:N21`.
- Browser smoke loaded `http://localhost:5173/` with `src/game.js?v=20260611-0414`, board present, no console errors.
- Full per-card browser playthrough for `poorest-steals-shop` and all `bad-die-choice` branches was not run.

Open questions:
- None.

## 2026-06-11 22:54 - GD

Changed:
- Split the next 9-card `Плохо` pack into 3 implementation waves to reduce conflicts:
  - Wave 1: Dev 2 handles card data and simple effects.
  - Wave 2: Dev 3 handles pending Bad statuses.
  - Wave 3: Dev 1 or Dev 2 handles face-down `Лавка Джо`.
- Added and dispatched `ACTIVE BAD CARDS WAVE 1 2026-06-11 22:54 - Next Bad pack data and simple effects` to Dev 2.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Do not start wave 2 or wave 3 until wave 1 handback.
- Wave 1 must not leave unimplemented cards silently drawable/discardable in the local playable deck.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-11 21:25 - Dev 2

Changed:
- Implemented `ACTIVE BAD CARDS 2026-06-11 21:04 - Add 8 new Плохо cards`.
- Added 8 new `bad` cards with `count: 2` to local config, CSV, and Google Sheet `Cards Config` / tab `bad`.
- Wired effects for Joe Shop debt, backward movement to red/player, harmless no-op, owned Shop discard, other-player coin gain, other-player Shop offers, and moving non-last players backward.
- Bumped host/card-config cache keys to `20260611-0413`.
- Sent GD a context handback only; QA was not involved.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Static checks passed for local config/CSV, and live Google Sheet readback confirmed the 8 new `bad` rows in `bad!A5:N12` with `count: 2`.
- Browser smoke loaded `http://localhost:5173/` with `src/game.js?v=20260611-0413`, board present, no console errors.
- Full per-card manual browser playthrough was not run.

Open questions:
- None.

## 2026-06-11 21:04 - GD

Changed:
- Added and dispatched Dev 2 task `ACTIVE BAD CARDS 2026-06-11 21:04 - Add 8 new Плохо cards`.
- New Bad cards cover Shop-card loss/debt, backward movement to red/player, harmless miss, rewards for other players, Shop offers for other players, and moving all non-last players backward.
- Decision: all 8 new Bad cards have `count: 2`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Owner is `Dev 2`.
- Art/UI is not needed.
- QA is not involved unless the user explicitly asks.
- Dev must sync Google Sheet `Cards Config`, `src/cards.config.js`, and `cards-google-sheet.csv`.

Open questions:
- None.

## 2026-06-09 22:22 - Art/UI

Changed:
- Restored the `Очень Плохо` skull icon to the approved green-wisp skull version after the user asked to return it.
- Bumped the `very_bad_512.png` and host `src/game.js` cache keys to `20260609-0412`.

Files:
- `assets/icons/very_bad_512.png`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual-only asset restore; no rules, cells, balance, card behavior, or layout logic changed.
- Per user preference, no GD/QA handback was sent.
- Checks passed: PNG validation for 512x512 RGBA with transparent corners, `node --check src/game.js`, `git diff --check`.

Open questions:
- None.

## 2026-06-09 22:05 - Dev 3

Changed:
- Implemented `ACTIVE FINAL BATTLE UI/RULE CLARITY 2026-06-09 21:58 - Boss force display flow`.
- Final battle boss pre-roll/start force now applies only `+N за противников`.
- Ordinary boss combat bonuses are now counted per boss roll through `result.total`, alongside any per-roll `Сглаз` penalty.
- Boss cumulative HUD/progress force now increases by each boss roll's displayed total.
- Final boss force now computes as `bossOpponentBonus + sum(bossRollResults.total)`.
- Boss logs now show the start opponent bonus separately, then each boss roll's dice/ordinary bonus/penalty, roll total, and cumulative boss force.
- Final summary breakdown still separates rolled dice, ordinary boss bonuses/penalties, opponent bonus, and total boss force.
- Bumped host `src/game.js` cache key to `20260609-0411`.
- Sent GD a context handback only under the current pipeline; QA was not involved.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.
- Static/source check passed: old `playerCombatBonus(boss) * challengers.length` pre-roll flow is gone; pre-roll force uses `bossOpponentBonus`; per-roll cumulative force adds `result.total`; final boss force is `bossOpponentBonus + bossRollTotal`.
- Browser smoke loaded `http://127.0.0.1:5173/` with `src/game.js?v=20260609-0411`, board ready, and no console errors.
- Full browser final-battle smoke was attempted with 4 players and exact movement, but the long exact move landed in a `Плохо` card flow instead of quickly reaching final battle; no direct state mutation was used.
- Did not change final battle trigger, number of boss rolls, winner/scoring formula, card effects, deck lifecycle, board placement, dice count rules, bots, phone protocol, or the Games Log blocker.

Open questions:
- None for Dev 3. GD review/approval not requested by default; handback is context only.

## 2026-06-09 21:58 - GD

Changed:
- Reviewed final battle boss-force flow after user concern about confusing boss bonus display.
- Current implementation pre-applies `playerCombatBonus(boss) * challengers.length` together with `+1 per challenger`, then each boss roll visually adds mostly dice/penalty, which is mathematically close but confusing.
- Clarified intended GD flow:
  - first apply only the boss bonus for opponents/other players;
  - then the boss rolls once per other player;
  - each boss roll displays and contributes `dice + ordinary boss bonuses/penalties`;
  - opponent/player-count bonus is not repeated inside each roll.
- Added and dispatched Dev 3 task `ACTIVE FINAL BATTLE UI/RULE CLARITY 2026-06-09 21:58 - Boss force display flow`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a final battle clarity/display/math-structure task, not a scoring redesign.
- Do not touch the separate `Games Log` Apps Script blocker.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-09 21:55 - Dev 2

Changed:
- Investigated `ACTIVE HISTORY SHEET 2026-06-09 21:49 - Final party fields still blank in Games Log`.
- Confirmed local `src/game.js` already sends final History fields in `snapshot.game.final*`, `snapshot.players[].final*`, and `snapshot.sheetExport`.
- Confirmed the target Sheet headers exist for `Games!O:X` and `Players!T:AG`.
- Searched Drive for the deployed Apps Script source by `Games Log`, project keywords, the web app deployment id, and `application/vnd.google-apps.script`; only the Sheet was accessible, no Apps Script project/source was found.
- Added a concrete Apps Script mapping patch for the endpoint owner: `project-memory/apps-script-games-log-final-fields-patch.js`.

Files:
- `project-memory/apps-script-games-log-final-fields-patch.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Product behavior is still blocked until someone with Apps Script source/deployment access updates and redeploys the live web app `AKfycbxNXmGjR9w3U0vmUd9xS5Rc2KHwR8Q7ViB5Pcl70qIOEhwIJp_M_1faO7RvpDtuPLqkdQ`.
- Required endpoint change: keep old/basic `Games!A:N` and `Players!A:S`, and append the already-sent final fields into `Games!O:X` and `Players!T:AG`.
- Patch file maps exact current headers:
  - `Games`: `finalOutcome`, `finalOutcomeText`, `finalWinnerName`, `finalWinnerRole`, `finalWinnerRoleId`, `finalWinnerScore`, `finalPlayersForce`, `finalBossForce`, `finalBossWon`, `finalSummaryJson`;
  - `Players`: `finalRole`, `finalRoleId`, `finalWinner`, `finalScoreTotal`, `finalScoreCoins`, `finalScoreShop`, `finalScoreDamage`, `finalScoreDamageToBoss`, `finalScorePosition`, `finalBattleForce`, `finalForceBreakdown`, `finalScoreBreakdown`, `finalScoreJson`, `finalForceJson`.
- Checks passed: `node --check project-memory/apps-script-games-log-final-fields-patch.js` and `git diff --check`.
- No real finished-game `Сохранить` verification was possible because the live Apps Script deployment could not be edited/redeployed from this environment.
- Did not backfill existing rows and did not touch final battle rules/scoring/history UI/cards/decks/board/dice/bots/phone behavior.

Open questions:
- Who can open and redeploy the live Apps Script web app for `Games Log`?

## 2026-06-09 21:52 - Art/UI

Changed:
- Reduced the working `Очень Плохо` skull icon by 20% inside the 512x512 PNG.
- Bumped `very_bad_512.png` and host `src/game.js` cache keys to `20260609-0410`.
- Saved the previous larger skull version at `outputs/very_bad_512_before_skull_20pct_smaller.png`.

Files:
- `assets/icons/very_bad_512.png`
- `src/game.js`
- `index.html`
- `outputs/very_bad_512_before_skull_20pct_smaller.png`
- `project-memory/updates.md`

Notes for others:
- Visual-only update; no rules, cells, balance, or card behavior changed.
- Per user preference, no GD context note was sent.
- Checks passed: PNG validation for 512x512 RGBA with transparent corners, `node --check src/game.js`, `git diff --check`.

Open questions:
- None.

## 2026-06-09 21:49 - GD

Changed:
- Investigated the user report that final party info is blank in the stats Google Sheet.
- Live-read `Games Log`:
  - `Games!A1:X20` has final headers `finalOutcome` through `finalSummaryJson`;
  - latest finished rows, including `game-2026-06-09T00:09:09.257Z-7myl7q`, still stop at `Minutes` and leave `Games!O:X` blank;
  - `Players!A1:AG12` has final headers, but player rows stop at `itemsJson` and leave `Players!T:AG` blank.
- Added and dispatched Dev 2 task `ACTIVE HISTORY SHEET 2026-06-09 21:49 - Final party fields still blank in Games Log`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Local `src/game.js` already builds `snapshot.game.final*`, `snapshot.players[].final*`, and `snapshot.sheetExport`.
- This matches the old 2026-06-07 blocker: the deployed Apps Script/save endpoint likely still maps only old/basic fields.
- Required fix is readable Google Sheet persistence for `Games!O:X` and `Players!T:AG`, with live Sheet readback after a real save.
- Do not backfill existing rows unless the user explicitly asks.

Open questions:
- Who has live Apps Script/deployment access if Dev 2 cannot access it from the current environment?

## 2026-06-09 21:49 - Art/UI

Changed:
- Replaced the working `Очень Плохо` tile icon with the approved simple skull draft.
- Kept the icon at `assets/icons/very_bad_512.png`.
- Bumped `very_bad_512.png` and host `src/game.js` cache keys to `20260609-0409`.
- Saved the previous working icon backup at `outputs/very_bad_512_before_skull_upload.png`.

Files:
- `assets/icons/very_bad_512.png`
- `src/game.js`
- `index.html`
- `outputs/very_bad_512_before_skull_upload.png`
- `project-memory/updates.md`

Notes for others:
- Visual-only update; no rules, cells, balance, or card behavior changed.
- Per user preference, no GD context note was sent.
- Checks passed: PNG validation/view, `node --check src/game.js`, `git diff --check`.

Open questions:
- None.

## 2026-06-09 21:45 - Art/UI 2

Changed:
- Wired the new simplified `Черный рынок` icon into the current game asset path after user approval.
- Replaced `assets/icons/black_market_ultra_simple_512.png` with the buy-focused candidate: dark stall, one mystery item/card, large gold coin/price token.
- Kept the candidate copy and tile preview for comparison.
- Bumped cache keys for `black_market_ultra_simple_512.png` and host `src/game.js`.
- Sent GD a context handback only under the current pipeline; QA was not involved.

Files:
- `assets/icons/black_market_ultra_simple_512.png`
- `assets/icons/black_market_buy_candidate_512.png`
- `outputs/black-market-buy-candidate-preview.png`
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Asset status: wired via existing `black-market` icon path.
- Final asset: `assets/icons/black_market_ultra_simple_512.png`, PNG, 512x512, RGBA with transparent corners.
- Cache key: `assets/icons/black_market_ultra_simple_512.png?v=20260609-0409`; host `src/game.js?v=20260609-0409`.
- Checks passed: PNG dimension/alpha validation; `node --check src/game.js`; `git diff --check`.

Open questions:
- None.

## 2026-06-09 03:03 - Dev 2

Changed:
- Implemented `ACTIVE TADAM UI 2026-06-09 03:00 - New TADAM appears in first slot`.
- `visibleTadamCards()` now renders active TADAM cards newest-first.
- Preserved `state.tadams.push(card)` storage and `state.tadams.shift()` oldest-card discard lifecycle.
- Bumped host `src/game.js` cache key to `20260609-0408`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- TADAM effects, counts, deck lifecycle, discard reshuffle, and card text were not changed.
- Static check for A/B/C/D sequence returns `[A]`, `[B,A]`, `[C,B,A]`, `[D,C,B]`.
- Checks passed: `node --check src/game.js` and `git diff --check`.
- Browser smoke loaded host at `http://localhost:5173/` with `src/game.js?v=20260609-0408`; console error log was empty.
- Browser smoke did not force live TADAM draws; visual ordering was verified by source/static checks.

Open questions:
- None.

## 2026-06-09 03:00 - GD

Changed:
- Added and dispatched a Dev 2 task to change visible TADAM slot ordering.
- New visual rule: every new TADAM appears in the first/left slot and existing visible cards shift one slot right.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Preserve current TADAM storage/discard lifecycle if possible: newest should render left, but the oldest active card should still be discarded when a fourth card appears.
- Do not change TADAM card effects, counts, deck lifecycle, discard reshuffle, or card text.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-09 02:57 - Dev 2

Changed:
- Implemented `ACTIVE EVENT CARD 2026-06-09 02:52 - Remove extra top-damage reward from Сплочение`.
- Event card `unity` / `Сплочение` now has description exactly `Общий бой с монстром. При победе все игроки получают 10 монет, при проигрыше все теряют 5 монет`.
- Removed the top-force/best-damage tie-break from `resolveEventUnity(...)`.
- Team win now gives every player exactly `+10` coins and no additional `+10` to any top-damage player.
- Team loss still makes every player lose `5` coins.
- Synced local card config, CSV mirror, and Google Sheet `Cards Config` tab `event`.
- Bumped host `src/game.js` cache key to `20260609-0407` and `cards.config.js` import key to `20260609-0407`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Kept `unity` id, deck, title, count `2`, and effect type `event-unity`.
- Kept the existing `Сплочение` battle HUD, monster target, dice flow, `Зелье ярости`, and `Сглаз` interactions.
- Google Sheet readback for `event!A4:N4`: `unity`, title `Сплочение`, effect `event-unity`, count `2`, description exactly matches the requested text and has no final period.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`, static local config/CSV checks, static old-text search in card sources, and source check that `resolveEventUnity(...)` no longer calls top-force tie-break or awards top-player extra `+10`.
- Browser smoke loaded host at `http://localhost:5173/` with `src/game.js?v=20260609-0407`; console error log was empty.
- Browser smoke did not force a full `Сплочение` roll; win/loss reward logic was verified by source/static checks.

Open questions:
- None.

## 2026-06-09 02:53 - Dev 2

Changed:
- Implemented `ACTIVE BAD CARD 2026-06-09 02:47 - Change give5 to chosen recipient`.
- Bad card `give5` now uses player-facing text `Выбери игрока и отдай ему 5 монет`.
- Changed `give5` effect from `give-poorest` to `give-chosen-player`.
- Added chosen-target Bad-card resolution: active player chooses another player, self is excluded, and transfers up to 5 available coins to the target.
- Bot card choice uses per-choice score that favors poorer opponents for this Bad-card transfer.
- Synced local card config, CSV mirror, and Google Sheet `Cards Config` tab `bad`.
- Bumped host `src/game.js` cache key to `20260609-0406` and `cards.config.js` import key to `20260609-0406`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Kept `give5` id, deck, count `2`, and amount `5`.
- Kept the old `give-poorest` runtime branch for compatibility; no current `give5` card data points at it.
- Google Sheet readback for `bad!A4:N4`: `give5`, title/description `Выбери игрока и отдай ему 5 монет`, effect `give-chosen-player`, amount `5`, count `2`.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`, static local config/CSV checks, static old-text search in card sources.
- Browser smoke loaded host at `http://localhost:5173/` with `src/game.js?v=20260609-0406`; console error log was empty.
- Browser smoke did not force a random deck draw of `give5`; target-choice behavior was covered by source/static checks.

Open questions:
- None.

## 2026-06-09 02:48 - Dev 2

Changed:
- Implemented `ACTIVE BLACK MARKET UI 2026-06-09 02:42 - Show all options even when unaffordable`.
- `Черный рынок` now always builds all three deal choices: `Карта Лавки Джо`, `Тайная тренировка`, and `Зелье ярости`.
- Unaffordable deals are visible but disabled with `Не хватает N монет`.
- `Зелье ярости` is visible but disabled with `Зелье уже активно` when a next-monster rage bonus is already active.
- `Уйти` remains selectable.
- Added shared disabled-choice handling for card-choice UI, bot choice filtering, phone snapshots, phone host rejection, and controller buttons.
- Bumped host `src/game.js` and controller `src/controller.js` cache keys to `20260609-0405`.

Files:
- `src/game.js`
- `src/controller.js`
- `index.html`
- `controller.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Black Market costs, rewards, balance, cards, Sheet/CSV, board placement, and other fields were not changed.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`, and source checks for all three always-present deals plus disabled guards.
- Browser smoke loaded host and controller with cache keys `20260609-0405`; no console errors appeared.
- Browser smoke did not force every coin-count state; those paths were covered by source/static checks.

Open questions:
- None.

## 2026-06-09 02:52 - GD

Changed:
- Added and dispatched a Dev 2 task to simplify Event card `Сплочение`.
- New description removes the top-damage extra reward.
- Required behavior: team win gives every player exactly 10 coins; no extra +10 for best/top damage and no top-force tie-break.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Keep `event/unity` id, count, and effect type.
- Keep `Сплочение` battle HUD, target, dice, `Зелье ярости`, and `Сглаз` interactions.
- Source sync should cover Google Sheet `Cards Config`, `src/cards.config.js`, and `cards-google-sheet.csv`.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-09 02:47 - GD

Changed:
- Added and dispatched a Dev 2 task to change Bad card `give5`.
- New player-facing text: `Выбери игрока и отдай ему 5 монет`.
- Required behavior changes from automatic poorest target to chosen target.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Keep card id `give5`, deck `bad`, count `2`, and amount `5`.
- Suggested new effect type: `give-chosen-player`.
- Source sync should cover Google Sheet `Cards Config`, `src/cards.config.js`, and `cards-google-sheet.csv`.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-09 02:42 - GD

Changed:
- Added and dispatched a Dev 2 task for Black Market choice visibility.
- Requirement: `Черный рынок` must show all three deal options even when the player lacks coins.
- Unaffordable or otherwise unavailable deals should be visible but disabled/unselectable with a clear reason.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Do not change Black Market costs/rewards/balance.
- `Уйти` remains selectable.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-09 02:30 - Art/UI

Changed:
- Fixed long Good-card face text fitting for `buy-shop-card`.
- Good card face markup now adds density classes based on description length.
- Long Good descriptions are split into sentence lines instead of one dense span.
- Added compact/dense CSS for long Good card text: smaller font, tighter line-height, wider vertical text area, balanced wrapping.
- Bumped `styles.css` cache key to `20260609-0404`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual/layout-only update; card text, rules, config, CSV, and Google Sheet were not changed.
- Per user preference, no GD context note was sent.
- Checks passed: `node --check src/game.js`, `git diff --check`.

Open questions:
- None.

## 2026-06-09 02:26 - Dev 2

Changed:
- Implemented `ACTIVE BOARD TWEAK 2026-06-09 02:24 - Restore Joe Shop at field2 6-7`.
- Changed `boardConfigs.field2.events["6-7"]` from `green` back to `shop`.
- Bumped host `src/game.js` cache key to `20260609-0402`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Route/path order, adjacent cells, Joe Shop deck/cards, and Joe Auction were not changed.
- Checks passed: `node --check src/game.js`, `git diff --check`, static `6-7 shop` check.
- Browser smoke on `http://localhost:5173/`: `field2 6-7` rendered as `tile-shop`, tooltip `Лавка Джо`, shop icon loaded, no console errors.

Open questions:
- None.

## 2026-06-09 02:24 - Art/UI 2

Changed:
- Redrew the `Аукцион Джо` tile icon to be simpler and more readable.
- Replaced the old busy composition with three real `Лавка Джо` card backs from `assets/cards/shop_back.png` plus one large auction gavel and a few coins.
- Replaced `assets/icons/joe_auction_512.png` in place and bumped its image cache key in `src/game.js`.
- Added a small tile-size preview for visual readability checks.
- Sent GD a context handback only under the current pipeline; QA was not involved.

Files:
- `assets/icons/joe_auction_512.png`
- `outputs/joe-auction-redraw-tile-preview.png`
- `src/game.js`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Asset status: wired via existing `joe-auction` icon path.
- Final asset: `assets/icons/joe_auction_512.png`, PNG, 512x512, RGBA with transparent corners.
- Cache key: `assets/icons/joe_auction_512.png?v=20260609-0401`.
- Checks passed: PNG dimension/alpha validation; `node --check src/game.js`; `git diff --check`.

Open questions:
- None.

## 2026-06-09 02:24 - GD

Changed:
- Added and dispatched a small board fix to Dev 2.
- User reported that `Лавка Джо` disappeared from the marked cell.
- GD coordinate read: restore `field2 6-7` from `green` to `shop`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This corrects the previous screenshot placement sync item that changed `6-7` to `green`.
- Route/path order, adjacent cells, Joe Shop cards/deck, and Joe Auction should not change.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-09 02:22 - Dev 2

Changed:
- Implemented `ACTIVE BOARD TWEAK 2026-06-09 02:21 - Change field2 4-14 to Good`.
- Changed `boardConfigs.field2.events["4-14"]` from `event` to `good`.
- Bumped host `src/game.js` cache key to `20260609-0401`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Route/path order, neighboring cells, Event deck, and Good deck were not changed.
- Checks passed: `node --check src/game.js`, `git diff --check`, static `4-14 good` check.
- Browser smoke on `http://localhost:5173/`: `field2 4-14` rendered as `tile-good`, tooltip `Хорошо`, Good icon loaded, no console errors.

Open questions:
- None.

## 2026-06-09 02:21 - GD

Changed:
- Added and dispatched a small board tweak to Dev 2.
- User-marked field from screenshot is interpreted as `field2 4-14`.
- Required change: `field2 4-14` from `event` to `good`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Route/path order should not change.
- Adjacent bottom-row cells should not change.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-09 02:14 - Art/UI 2

Changed:
- Completed `ACTIVE ART/UI 2026-06-09 02:05 - Игра Джо tile icon`.
- Created a new transparent tile icon for `Игра Джо`: a lucky game table with a large die, fantasy cards, and a Joe Shop chest accent.
- Added a small tile-size preview for visual readability checks.
- Sent GD a context handback only under the current pipeline; QA was not involved.

Files:
- `assets/icons/joe_game_512.png`
- `outputs/joe-game-icon-tile-preview.png`
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Asset status: created by Art/UI; Dev 2 has already wired the path in the current local work.
- Final asset: `assets/icons/joe_game_512.png`, PNG, 512x512, RGBA with transparent corners.
- Preview: `outputs/joe-game-icon-tile-preview.png`.
- Checks passed: PNG dimension/alpha validation; `git diff --check`.

Open questions:
- None.

## 2026-06-09 02:07 - Art/UI

Changed:
- Adjusted `Очень Плохо` tile icon per user request.
- Changed the glow from purple necromantic to swamp green.
- Set `field2` `.tile-icon-very-bad` art size to `100%` instead of `112%`.
- Set general `.tile-icon-very-bad` art size to `100%`.
- Bumped cache keys to `20260609-0400`.

Files:
- `assets/icons/very_bad_512.png`
- `styles.css`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual-only update; no rules, cells, balance, or card behavior changed.
- Per user preference, no GD context note was sent.
- Checks passed: PNG validation for 512x512 RGBA with transparent corners, `node --check src/game.js`, `git diff --check`.

Open questions:
- None.

## 2026-06-09 02:13 - Dev 2

Changed:
- Implemented `ACTIVE FIELD 2026-06-09 02:05 - Add Игра Джо field` as a context handback to GD, no QA requested.
- Added new event type `joe-game` / `Игра Джо`.
- Placed `Игра Джо` on `field2 11-9`, replacing the previous `Большой привал` there.
- Applied the latest screenshot placement sync: `0-0 very-bad`, `6-2 event`, `9-2 dice-fortune`, `6-7 green`, `9-9 big-rest`, `11-9 joe-game`.
- Added title/tooltip, field-effect text, history label, bot field scoring, tile CSS groups, and `.tile-icon-joe-game` styling.
- Wired `eventIcons["joe-game"]` to `assets/icons/joe_game_512.png?v=20260609-0400`; the 512x512 PNG is present locally from Art/UI work.
- Added `Игра Джо` mechanics: active player assigns unique numbers, gets 2 numbers, each other player gets 1, then a 1d6 roll resolves reward/no reward.
- Bot active player assigns random unique numbers: two to self, then one to other players in table order from active.
- Reward uses finite Shop deck helpers and grants owned Shop items; source physical cards return to Shop discard/stock like other free Shop rewards.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- `assets/icons/joe_game_512.png` exists locally as a 512x512 RGBA PNG and is now loaded by the board; Art/UI owns the asset itself.
- Browser smoke on `http://localhost:5173/` confirmed `field2 11-9` is `tile-joe-game`, the icon loads at 512px, all six synced placements match, cache keys are `20260609-0400`, and no console errors appeared.
- Deep deterministic gameplay browser paths for forced die outcomes were not automated; static checks cover resolver/placement and browser smoke covers render.

Open questions:
- None.

## 2026-06-09 02:05 - GD

Changed:
- Added and dispatched the new `Игра Джо` field work through Art/UI 2 and Dev 2.
- Art/UI 2 owns `assets/icons/joe_game_512.png`.
- Dev 2 owns the `joe-game` field type, `field2 11-9` placement, digit-assignment mini-game, Shop-card reward flow, UI prompts, and roll context.
- Added the latest screenshot placement sync to the Dev task.

Files:
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Final `Игра Джо` placement: `field2 11-9`.
- Digits are unique: active player gets 2 unique digits, each other player gets 1 unique digit.
- Additional screenshot field sync expected in Dev task:
  - `0-0 very-bad`;
  - `6-2 event`;
  - `9-2 dice-fortune`;
  - `6-7 green`;
  - `9-9 big-rest`;
  - `11-9 joe-game`.
- QA is not involved unless the user explicitly asks.

Open questions:
- None.

## 2026-06-09 02:02 - Art/UI

Changed:
- Made `Очень Плохо` much more visually distinct from ordinary `Плохо`.
- Rebuilt `assets/icons/very_bad_512.png` with a larger/brighter purple-green necromantic glow.
- Added a `field2`-specific `.tile-icon-very-bad` override so `Очень Плохо` no longer gets compressed by the generic `field2` 72% icon rule.
- Increased `Очень Плохо` display on `field2` to `112%` with extra glow drop-shadows; general `.tile-icon-very-bad` is `104%`.
- Bumped cache keys to `20260609-0399`.

Files:
- `assets/icons/very_bad_512.png`
- `styles.css`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual-only update; no rules, cells, balance, or card behavior changed.
- Per user request, this was not sent to GD because the task did not come from GD and the user did not ask for GD handback.
- Checks passed: PNG validation for 512x512 RGBA with transparent corners, `node --check src/game.js`, `git diff --check`.

Open questions:
- None.

## 2026-06-09 01:46 - Art/UI

Changed:
- Made the `Очень Плохо` tile icon brighter and more distinct from ordinary `Плохо`.
- Increased the necromantic purple/green glow around the three Bad chests.
- Made the chest art larger in the PNG and increased `.tile-icon-very-bad` from `88%` to `96%` so it reads bigger on the board.
- Bumped cache keys to `20260609-0398`.

Files:
- `assets/icons/very_bad_512.png`
- `styles.css`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Visual-only update; no rules, cells, balance, or card behavior changed.
- Checks passed: PNG validation for 512x512 RGBA with transparent corners, `node --check src/game.js`, `git diff --check`.
- Previous glow version kept at `outputs/very_bad_512_before_bright_necro_glow.png`.

Open questions:
- None.

## 2026-06-09 01:45 - Dev 2

Changed:
- Renamed the player-facing field/event name `Аукцион Лавки Джо` to `Аукцион Джо`.
- Updated host alt text, history label, prompts, logs, dice animation label, tooltip, and field-effect title.
- Kept internal id `joe-auction` and all auction rules/mechanics unchanged.
- Left card/object wording `карты Лавки Джо` unchanged where it describes the prize cards.

Files:
- `src/game.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Host cache key already stands at `src/game.js?v=20260609-0397` from the latest Art/UI bump, so no additional cache-key edit was needed.
- Checks passed: `node --check src/game.js`, `git diff --check`, and static search in `src/game.js` found no remaining `Аукцион Лавки Джо`.

Open questions:
- None.

## 2026-06-09 01:31 - Art/UI

Changed:
- Updated `Очень Плохо` tile icon with a contained necromantic purple/green glow around the three Bad chests.
- Made the chest art slightly larger inside the 512x512 PNG while keeping transparent padding so it fits inside the board tile.
- Bumped `very_bad_512.png` cache key in `src/game.js` to `20260609-0397`.
- Bumped host `src/game.js` cache key in `index.html` to `20260609-0397`.
- Kept pre-glow backup in `outputs/very_bad_512_before_necro_glow.png`.

Files:
- `assets/icons/very_bad_512.png`
- `src/game.js`
- `index.html`
- `outputs/very_bad_512_before_necro_glow.png`
- `project-memory/updates.md`

Notes for others:
- Visual-only update; `Очень Плохо` rules, cells, and balance were not changed.
- Checks passed: PNG validation for 512x512 RGBA with transparent corners, `node --check src/game.js`, `git diff --check`.

Open questions:
- None.

## 2026-06-09 01:32 - Dev 2

Changed:
- Implemented `ACTIVE FIELD RULE/TEXT SYNC 2026-06-09 01:20` as a context handback to GD, no QA requested.
- Aligned player-facing special-field names/tooltips/field-effect/log text for `Враг`, `Кубик удачи`, `Удвой свои монеты`, `VS`, `Очень Плохо`, `Портал хаоса`, `Большой привал`, `Аукцион Лавки Джо`, and `Черный рынок`.
- Changed `Кубик удачи` reward to 10 coins per rolled 6.
- Kept `pay-double` simple: doubles current coins, with no 5-coin cost and no insufficient-coins branch.
- Changed `Портал хаоса` roll 6 to automatic forward teleport to nearest monster/portal; roll 1-2 now targets nearest backward monster/portal.
- Changed `Аукцион Лавки Джо` so bidding starts from the active player and the winner receives all 3 revealed Shop cards; source offer copies return to Shop discard/stock and losers are not charged.
- Changed `Черный рынок` 5-cost and 10-cost deals to also draw/resolve one Event card.
- Bumped host `src/game.js` cache key to `20260609-0396`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- `Портал хаоса` treats “портал” as a monster-door enemy cell that is open for all players; unopened enemy cells are treated as monsters.
- Joe Auction still charges only the winner at the end; losing/pass bids are never subtracted, which matches the “others get their coins back” rule in the current architecture.
- Browser smoke on `http://localhost:5173/` loaded the board, saw the updated field titles, found no stale title strings, and reported no console errors.

Open questions:
- None.

## 2026-06-09 01:25 - GD

Changed:
- Updated the active Dev 2 special-field sync task per user correction.
- `pay-double` must stay/return to the simple rule text and behavior: `Удвой свои монеты`.
- Removed the earlier `Заплати 5 монет и удвой свои монеты` requirement from the Dev task.
- Dev 2 was asked to start the task now.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Do not add a 5-coin cost or insufficient-coins branch to `pay-double`.
- The rest of the special-field sync task remains active.

Open questions:
- None.

## 2026-06-09 01:20 - GD

Changed:
- Added and dispatched a Dev 2 task to align special field rows with the user's reference screenshot.
- Scope includes both text/name formatting and rule changes for several fields.
- Fields covered: `Враг`, `Кубик удачи`, `pay-double`, `VS`, `Очень Плохо`, `Портал хаоса`, `Большой привал`, `Аукцион Лавки Джо`, and `Черный рынок`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is intentionally routed through Dev under the new pipeline rule.
- Important expected rule changes:
  - `Кубик удачи`: reward should be 10 coins per 6, not 20.
  - `pay-double`: keep/return to `Удвой свои монеты`, without a 5-coin cost.
  - `Портал хаоса`: roll 6 should move forward to nearest monster/portal, not player choice.
  - `Аукцион Лавки Джо`: winner should receive all 3 revealed Shop cards.
  - `Черный рынок`: 5/10 coin options should also grant an Event card.
- QA is not involved unless the user explicitly asks.

Open questions:
- Dev should document the exact interpretation of `монстр/портал` for `Портал хаоса` if current open-portal data makes this ambiguous.

## 2026-06-09 01:10 - GD

Changed:
- Added a project rule for future planning and plan execution.
- GD must route implementation work through Dev and visual/UI/asset work through Art/UI by default.
- GD should not directly implement cross-role plans unless the user explicitly asks GD to implement personally or the change is an urgent tiny documentation/memory edit.
- Duplicated the rule in shared memory, handoff, Dev inbox, and Art/UI inbox.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- This rule is a correction after the `Очень Плохо` task, where GD implemented a working slice directly instead of routing through Dev/ArtUI first.
- Current handback pipeline remains unchanged: executor handbacks go to GD as context only; QA is on-demand only.

Open questions:
- None.

## 2026-06-09 01:08 - GD

Changed:
- Corrected process handling for the `Очень Плохо` field/art task.
- Marked GD's direct implementation as a working slice rather than the final Art/UI-owned asset pass.
- Added an Art/UI task to review or replace `assets/icons/very_bad_512.png` as the final `Очень Плохо` tile icon.
- Added Dev context so Dev roles do not duplicate or overwrite the current implementation without a new user instruction.

Files:
- `project-memory/inbox/for-ui.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- The user explicitly wanted the art path to go through Art/UI.
- Current `Очень Плохо` mechanics remain in place as a working vertical slice.
- Art/UI should keep the final path `assets/icons/very_bad_512.png` so no code change is needed unless cache keys/reference details change.

Open questions:
- None.

## 2026-06-09 00:57 - GD

Changed:
- Implemented the new `Очень Плохо` field type directly in the game.
- Replaced `field2` cells `8-7`, `9-7`, and `10-7` with `very-bad`.
- Added `assets/icons/very_bad_512.png`: transparent 512x512 icon with three cursed Bad chests/skulls and `x3`.
- Landing on `Очень Плохо` now draws and resolves 3 central `Плохо` cards in sequence.
- Added `Очень Плохо` title/field-effect text and tile styling.
- Added `Очень Плохо` to history field labels.
- Updated bot scoring so `very-bad` is treated as roughly triple Bad risk.
- Bumped host cache keys to `styles.css?v=20260609-0394` and `src/game.js?v=20260609-0394`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `assets/icons/very_bad_512.png`
- `project-memory/updates.md`

Notes for others:
- `Очень Плохо` uses the central Bad draw path, so finite deck/discard reshuffle and `Двойное Плохо` stay on the existing lifecycle.
- If `Двойное Плохо` is pending, it should trigger on the first Bad draw inside `Очень Плохо`, producing 4 total Bad cards.
- If one Bad card moves the player, the remaining `Очень Плохо` Bad draws still continue.
- Checks passed: `node --check src/game.js`, `git diff --check`, static readback for `field2` cells `8-7`/`9-7`/`10-7`, and PNG validation for 512x512 transparent `assets/icons/very_bad_512.png`.

Open questions:
- Browser smoke could not run in this environment: starting a local server was denied by permissions, and Playwright Chromium failed with macOS `MachPortRendezvous` permission denied.

## 2026-06-09 00:40 - Dev 2

Changed:
- Implemented `ACTIVE GOOD CARD 2026-06-09 00:34 - Add Двойное Плохо next-bad extra draw card`.
- Added Good card `Двойное Плохо` / `next-bad-extra-draw`, count `2`, effect `give-next-bad-extra-draw`.
- Card text: `Отдай эту карту любому игроку. В следующий раз, когда он берет карту Плохо, он берет ещё одну`.
- Playing the card makes the active player choose another player; the target receives a pending physical Good-card effect.
- The next central `bad` deck draw for that target consumes exactly one pending copy, discards it to the Good discard pile, then draws/resolves exactly one extra Bad card with re-trigger disabled.
- Multiple pending copies resolve one per future Bad draw event.
- Added host score/turn status and phone controller chip for `Двойное Плохо`.
- Synced `src/cards.config.js`, `cards-google-sheet.csv`, and Google Sheet `Cards Config` / `good`.
- Bumped cache keys to `20260609-0393`.
- Sent handback to GD as context note only under the current pipeline.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `src/controller.js`
- `index.html`
- `controller.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Static local config and CSV checks passed for `good/next-bad-extra-draw`.
- Google Sheet readback confirmed row in `good` with id `next-bad-extra-draw`, effect `give-next-bad-extra-draw`, count `2`, and no final period.
- Browser load smoke passed on `http://localhost:5173/` with `src/game.js?v=20260609-0393`, board ready, no console errors.

Open questions:
- Full manual browser flow for drawing/playing the exact card was not forced; implementation hooks the central `drawAndApplyCard(..., "bad")` path.

## 2026-06-09 00:34 - GD

Changed:
- Added and dispatched a new Good-card task to Dev 2.
- New card concept: `Двойное Плохо`.
- Effect: give the card to another player; the next time that player draws `Плохо`, they draw one additional `Плохо`, then the pending effect is discarded.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Suggested id: `next-bad-extra-draw`.
- Suggested effect type: `give-next-bad-extra-draw`.
- Count should be `2`; this is not an artifact.
- Use the existing `Сглаз` / pending-effect pattern where practical.
- Under the current pipeline, Dev 2 handback goes to GD as context only, no approval needed by default.

Open questions:
- None.

## 2026-06-09 00:18 - GD

Changed:
- Updated the project pipeline again per user instruction.
- New default: executor handbacks to GD are context notes only, not approval requests.
- GD no longer checks, approves, rejects, or writes rework for handbacks by default.
- GD review/approval/checking happens only when the user explicitly asks.
- QA remains on-demand only, when the user explicitly asks to involve QA.
- Recorded the rule in README, handoff, Dev inbox, QA inbox, and Art/UI inbox.
- Notified Dev 1, Dev 2, Dev 3, Art/UI 1, and Art/UI 2.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- The previous 2026-06-08 rule `handback goes directly to GD for approval` is superseded.
- New handbacks should not wait for GD approval unless the user explicitly asks for it.

Open questions:
- None.

## 2026-06-09 00:16 - GD

Changed:
- Reviewed Art/UI handback for Event card face readability and text fidelity.
- Gave GD approval for the Event card face layout/fidelity fix.
- Confirmed by static check that all `event` descriptions round-trip through the current sentence-splitting renderer without losing text.
- Live browser checked one revealed Event card (`Портальный обмен`): visible face text matched the config description and was not clipped.
- Marked the fallback Dev 3 Event text-fidelity task as covered by the Art/UI handback.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `Волшебный кошель` config text is still the full three-sentence text:
  `Последний игрок по маршруту получает артефакт. В начале своего хода владелец получает 5 монет. Если другой игрок обгоняет владельца, артефакт переходит к нему`
- Generated all-card preview was blocked by browser URL policy, and `Волшебный кошель` did not appear during a quick random live draw.
- Approval is based on the shared Event render path plus static all-card text fidelity and one live reveal check; if the user still sees clipping on `Волшебный кошель`, reopen as a focused UI rework.

Open questions:
- None.

## 2026-06-09 00:10 - GD

Changed:
- Checked Event card config against the user's `Волшебный кошель` screenshot.
- Confirmed `src/cards.config.js` has the full three-sentence `magic-wallet` description, including the transfer sentence.
- Added a fallback Dev 3 task to audit/fix Event card face rendering so every Event card displays the exact configured `description` without clipping or shortened copy.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a UI/text fidelity task, not an Event balance/copy rewrite.
- `Волшебный кошель` must show: `Если другой игрок обгоняет владельца, артефакт переходит к нему`.
- Under the new pipeline, Dev 3 should hand back directly to GD unless QA is explicitly requested.

Open questions:
- Superseded by Art/UI handback and GD approval at 2026-06-09 00:16 unless the user still sees clipping.

## 2026-06-09 00:42 - Art/UI

Changed:
- Reworked Event card face layout for readability.
- Event card descriptions now split into separate sentence lines instead of one dense paragraph.
- Added density classes for long Event texts so cards like `Гонка`, `Сплочение`, and `Волшебный кошель` get smaller text, tighter gaps, and more usable description height.
- Fixed Event text CSS specificity so old generic card text rules no longer override the new Event title/description sizing or clip long lines.
- Follow-up correction after user screenshot: Event text groups now center within the lower card area instead of sticking to the top; short cards start lower with more air between art and title, while long cards keep compact sizing.
- Bumped `index.html` cache keys for `styles.css` and `src/game.js`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- No Event rules/effects/card data were changed.
- Checks passed: `node --check src/game.js`, `git diff --check`.
- Browser opened local game, but a separate generated Event-card preview page was blocked by browser URL policy; visual correction is based on the live screenshots and the confirmed CSS clipping/specificity cause.

Open questions:
- GD/user should visually approve the new Event face layout in live card reveal, especially the longest `Волшебный кошель` text.

## 2026-06-08 23:57 - GD

Changed:
- Updated the project development pipeline.
- New default: executor completes task, writes handback, updates `updates.md`, and sends the finished task directly to GD for approval.
- QA is skipped by default.
- QA is involved only when the user explicitly asks, for example `привлеки QA`; in that case the previous QA-gated pipeline applies.
- Added the rule to the shared README, handoff, Dev inbox, and QA inbox.
- Notified Dev 1, Dev 2, and Dev 3 directly.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Older QA-gated records can remain as historical/open records unless GD or the user redirects them.
- New handbacks should go to GD by default.

Open questions:
- None.

## 2026-06-08 23:48 - QA 1

Changed:
- Picked up `QA READY 2026-06-08 23:43 - Dev 2 handback for Shop step-plus / battle-plus tune`.
- QA gate result: blocked by local browser automation environment, not approved yet.
- Verified static/config side:
  - `shop/step-plus` is `+2 к шагам`, effect `passive-step-bonus`, `steps: 2`, count `2`;
  - `shop/battle-plus` is `+1 к силе`, effect `passive-battle-bonus`, `amount: 1`, count `2`;
  - Shop physical configured copies total remains `8`;
  - no final periods on the checked player-facing Shop texts.
- Verified code-path arithmetic with imported config and the same bonus formulas:
  - owning one `step-plus` gives movement totals `roll + 2`;
  - owning one `battle-plus` gives battle totals `roll + 1`.
- Confirmed `index.html` loads `src/game.js?v=20260608-0390`, and `src/game.js` imports `cards.config.js?v=20260608-0390`.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Checks passed in QA: `node --check src/cards.config.js`, `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.
- Full independent browser gameplay smoke is still required before QA approval: Joe Shop reveal in browser, owning `step-plus` movement through an actual dice turn, and owning `battle-plus` battle strength in an actual battle.
- Browser automation was blocked in this QA environment: Playwright Chromium launch failed with macOS `MachPortRendezvous` permission errors; starting a new local server on another port was also denied by sandbox permissions. Existing port `5173` responded to HEAD but returned empty bodies to `curl` in this session.
- No Dev rework is filed from QA yet because no product bug was found; this is a QA environment blocker.

Open questions:
- Can another QA/browser-capable thread run the remaining independent visual/gameplay smoke?

## 2026-06-08 23:43 - Dev 2

Changed:
- Implemented `ACTIVE SHOP CARD TUNE 2026-06-08 23:40 - Buff step-plus to +2 к шагам and shorten battle-plus text`.
- Updated `shop/step-plus` to title/shortTitle/description `+2 к шагам`, kept effect `passive-step-bonus`, changed `steps` from `1` to `2`, kept count `2`.
- Updated `shop/battle-plus` description to `+1 к силе`, kept title/shortTitle/effect/amount/count unchanged.
- Synced local `src/cards.config.js`, `cards-google-sheet.csv`, and Google Sheet `Cards Config` tab `shop`.
- Bumped cache keys to `src/game.js?v=20260608-0390` and `cards.config.js?v=20260608-0390`.
- Sent handback to QA first per Task Lifecycle.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Google Sheet readback confirmed `shop/step-plus` has `steps=2`, count `2`, and `+2 к шагам` in title/shortTitle/description.
- Google Sheet readback confirmed `shop/battle-plus` has description `+1 к силе`, amount `1`, count `2`.
- Checks passed: `node --check src/cards.config.js`, `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.
- Browser smoke loaded `http://localhost:5173/` with `src/game.js?v=20260608-0390`, board ready, no console errors.

Open questions:
- Waiting for QA approval before GD final approval.

## 2026-06-08 23:40 - GD

Changed:
- Added and dispatched a Shop card balance/text task to Dev 2.
- `shop/step-plus` should become `+2 к шагам` in title, shortTitle, description, and effect amount.
- `shop/battle-plus` should keep amount `1` but shorten description to `+1 к силе`.
- Added QA coverage for local config, CSV, Google Sheet readback, Joe Shop reveal, movement bonus, and battle strength regression.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- This is a Shop card tuning task only.
- Keep Shop counts at `2` per card and preserve finite deck / Joe Shop stock lifecycle.
- Apply current card text style rule: no final period.

Open questions:
- Waiting for Dev 2 handback to QA.

## 2026-06-07 17:42 - Dev 3

Changed:
- Implemented `ACTIVE UI 2026-06-07 16:16 - Add battle HUD for Event Сплочение`.
- Added `state.unityBattleProgress` and a `renderUnityBattleHud(...)` path on existing `#finalBattleHud`.
- `Сплочение` now shows target force, team total, all participating players, per-player `?` / rolling / final force states, player strength badges, and final win/loss outcome.
- Kept Event rules/rewards/dice flow unchanged; only added HUD progress and a final `Далее` prompt so the result remains visible.
- Bumped host cache keys to `styles.css?v=20260607-0389` and `src/game.js?v=20260607-0389`.
- Sent handback to QA first per Task Lifecycle.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Browser desktop smoke on `http://127.0.0.1:5173/`, 3 players: found `Сплочение`, applied it, HUD showed target `18`, all 3 players, rolling highlight, completed player forces, updating team total, final defeat `8 / 18`, and cleared after `Далее`; no console errors.
- Browser mobile smoke at `390x844`, 3 players: found `Сплочение`, HUD stayed visible/readable, did not overlap measured dice/action button rects, showed final defeat `4 / 18`; no console errors.
- Regression spot-check: existing asset cache keys loaded as expected; enemy/VS/final battle code paths were not intentionally changed beyond adding Unity as a separate HUD branch.

Open questions:
- Waiting for QA approval/rework before GD final approval.

## 2026-06-07 17:03 - QA 1

Changed:
- Reviewed `QA BLOCKED 2026-06-07 17:01 - Dev 2 partial handback for final History summary save`.
- QA gate result: not approved / blocked.
- Confirmed the remaining blocker is outside the current client-side handback: the deployed Apps Script mapping still writes only old/basic columns and leaves new final columns blank.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/inbox/for-dev.md`

Notes for others:
- Do not forward this task to GD approval yet.
- Required next implementation: update/deploy the Apps Script save mapping for the new final History fields in `Games!O:X` and `Players!T:AG`.
- QA approval requires a real browser `Сохранить` flow from a finished game and Google Sheet readback with non-empty final columns matching the visible `История -> Итог партии` UI.
- QA did not change game code.

Open questions:
- Who has access to the live Apps Script source/deployment?

## 2026-06-07 17:01 - Dev 2

Changed:
- Partially implemented `ACTIVE HISTORY SHEET 2026-06-07 16:51 - Save final History summary to Games Log`.
- Extended `buildGameHistorySnapshot()` to `version: 2` and added flattened final History fields for Google Sheets:
  - game-level `finalOutcome`, `finalOutcomeText`, winner fields, force fields, boss-won flag, and `finalSummaryJson`;
  - player-level final role/winner/score parts/force/breakdown/JSON fields.
- Added `sheetExport` to the payload while preserving existing `game`, `players`, `history`, and old analytics fields.
- Updated `Games Log` headers:
  - `Games!O:X` final summary columns;
  - `Players!T:AG` per-player final columns.
- Bumped host cache key to `src/game.js?v=20260607-0388`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Browser smoke loaded `http://localhost:5173/`, picked up `src/game.js?v=20260607-0388`, and had no console errors.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Live Apps Script source/deployment is not available in repo, Drive search, or local `clasp`; `clasp` is not installed.
- Endpoint smoke with a finished-like v2 payload wrote old `Games`/`Players` columns only and left the new final columns blank, proving the live Apps Script mapping still needs an update.
- Smoke test rows `DEV2_HISTORY_SHEET_SMOKE_*` were removed from `Games Log` after verification.

Open questions:
- Blocked on Apps Script source/deployment access. Required next edit: update the web app mapping to write `payload.game.final*` and `payload.players[].final*` / `payload.sheetExport` into the new headers.

## 2026-06-07 16:51 - GD

Changed:
- Checked the provided Google Sheet `Games Log` for the in-game `История` save path.
- Confirmed the table already has basic saved rows in `Games` and per-player rows in `Players`.
- Identified a gap: the new final `Итог партии` protocol shown in the History UI is not persisted as readable Sheet columns yet.
- Added and dispatched a Dev 2 task to extend the Sheet/Apps Script save mapping for final History summaries.
- Added QA coverage requiring Sheet readback after pressing `Сохранить`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Target Sheet: `Games Log`, id `1uC1xUk52IbpHfm9tNtHT2_cmFSNQIKCkct88TsqmmV8`.
- Local snapshot already includes final summary through `state.history.finalSummary` / `state.finalBattle.finalSummary`; the missing piece is readable Google Sheet persistence.
- `mode: "no-cors"` send success is not enough for approval; QA must verify an actual new row and matching final fields in the Sheet.

Open questions:
- Waiting for Dev 2 handback to QA.

## 2026-06-07 16:37 - Dev 1

Changed:
- Implemented `ACTIVE UI BUG 2026-06-07 16:31 - Show all monster-clear player markers`.
- Kept monster clear state/rules unchanged and adjusted marker rendering/layout only.
- Added marker count metadata and container aria/title text in `renderEnemyLocks()`.
- Reworked `.enemy-victory-marks` into compact grid layout, including explicit 3/4-marker 2x2 support and smaller field2 sizing.
- Sent handback to QA first per Task Lifecycle.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Static checks confirm render still appends one dot per victorious player and CSS has explicit 3/4 marker selectors.
- Browser app smoke loaded `http://localhost:5173/` with no console errors; forced synthetic 1/2/3/4 browser layout via `data:` URL was blocked by browser policy, so QA should cover the full visual matrix in-app.

Open questions:
- Waiting for QA approval/rework before GD final approval.

## 2026-06-07 16:37 - GD

Changed:
- Gave final GD approval for Dev 2 / QA 1 task `card text final-period cleanup`.
- Closed the card text style cleanup gate.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Approved scope: player-facing `title`, `shortTitle`, and `description` fields no longer end with final `.` in local config, CSV mirror, and Google Sheet `Cards Config`.
- Internal sentence periods, `!`, and `?` are preserved.
- Dev 1's plural `tadam/jump-steal` text remains `Перепрыгивая игроков, забери у каждого по 3 монеты`.
- Separate QA gates remain open for TADAM `jump-steal` behavior, Event `Сплочение` HUD, and monster-clear markers.

Open questions:
- None for this card text style task.

## 2026-06-07 16:35 - QA 1

Changed:
- QA-approved Dev 2 handback `card text final-period cleanup` and forwarded it to GD for final approval per Task Lifecycle.
- Verified local `src/cards.config.js` and `cards-google-sheet.csv`: no player-facing `title`, `shortTitle`, or `description` ends with a final period.
- Verified Google Sheet `Cards Config` tabs `good`, `bad`, `tadam`, `event`, and `shop`: readback of player-facing fields showed no final trailing period.
- Browser-smoked card face reveal for Good, Event, TADAM, Shop, and Bad.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Checks passed: `node --check src/cards.config.js`, `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.
- Browser face samples had no final period:
  - Good: `Сделай еще один ход`;
  - Event: `Волшебный кошель ... артефакт переходит к нему`;
  - TADAM: `Красные поля дают карту Плохо`;
  - Shop: `Перед броском можешь заплатить 5 и кинуть на 1 больше` / `+1 к силе только в битвах`;
  - Bad: `Потеряй 10`.
- Internal punctuation stayed readable; Event `Волшебный кошель` kept internal sentence periods while dropping the final trailing period.
- Dev 1's fresh plural `tadam/jump-steal` text remains `Перепрыгивая игроков, забери у каждого по 3 монеты`.
- Browser console errors: none observed in the checked reveal flows.
- QA did not find a rework item for Dev 2.

Open questions:
- Waiting for GD final approval.

## 2026-06-07 16:31 - GD

Changed:
- Added and dispatched a UI bug task for monster-clear player markers.
- Assigned implementation to `Dev 1`.
- Added QA follow-up to verify 1/2/3/4 cleared-player marker states and opened-portal regression.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- User reported: three players cleared a monster, but only two victory markers were visible.
- Contract: visible marker count must match `door.openedBy.length` for non-final monsters until the monster becomes a fully opened portal.
- Likely area: `renderEnemyLocks()` and `.enemy-victory-marks` layout.
- Do not change monster battle/opening rules, rewards, dice math, card effects, or portal rules.

Open questions:
- Waiting for Dev 1 handback to QA.

## 2026-06-07 16:30 - Dev 2

Changed:
- Implemented `ACTIVE CARD STYLE 2026-06-07 16:22 - Remove final periods from all card text`.
- Removed final trailing periods from player-facing card descriptions in local `cardConfig`, CSV mirror, and Google Sheet `Cards Config` tabs `good`, `bad`, `tadam`, `event`, and `shop`.
- Preserved internal sentence periods and existing `!` / `?` punctuation.
- Preserved Dev 1's fresh `tadam/jump-steal` plural text from the Sheet/local mirror: `Перепрыгивая игроков, забери у каждого по 3 монеты`.
- Sent handback to QA first per Task Lifecycle.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Google Sheet readback confirmed no `title`, `shortTitle`, or `description` in the checked tabs ends with a final `.`.
- Only text cleanup was intended; no card ids/counts/effects/amounts/rules/deck lifecycle/UI were changed by this task.
- Browser reveal smoke is left for QA card-face verification.

Open questions:
- Waiting for QA approval before GD final approval.

## 2026-06-07 16:29 - Dev 1

Changed:
- Updated TADAM `jump-steal` so it steals from every other player on the jumped-over cell.
- Removed the one-target 1d6 tie-break from `resolveJumpSteal(...)` only.
- Kept `land-steal` singular and still using the existing one-target 1d6 tie-break.
- Updated `tadam/jump-steal` player-facing text to `Перепрыгивая игроков, забери у каждого по 3 монеты`.
- Synced local `src/cards.config.js`, `cards-google-sheet.csv`, and Google Sheet `Cards Config` tab `tadam`.
- Sent handback to QA first per Task Lifecycle.

Files:
- `src/game.js`
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Google Sheet readback confirmed `tadam!A6:N6`: id/effect `jump-steal`, amount `3`, count `2`, plural title/description with no final period.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `git diff --check`.
- Static check passed: `resolveJumpSteal(...)` no longer references `resolveOnePlayerTieByDie(...)`; `resolveLandSteal(...)` still does.

Open questions:
- QA browser smoke still needed for multi-target same-cell jump and low-coin target cap.

## 2026-06-07 16:25 - GD

Changed:
- Added and dispatched a TADAM rule update for `jump-steal`.
- Assigned implementation to `Dev 1`.
- Added QA follow-up for multi-target jumped-over-cell behavior and `land-steal` regression.
- Marked the older one-player tie-break instruction for `jump-steal` as superseded.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- New rule: when active TADAM `jump-steal` triggers on a jumped-over cell with multiple other players, it applies to all those players, not one chosen by tie-break.
- Suggested player-facing text: `Перепрыгивая игроков, забери у каждого по 3 монеты`.
- Keep id/effect/count/amount unchanged: `jump-steal`, effect `jump-steal`, count `2`, amount `3`.
- This supersedes the older 2026-06-06 tie-break rule for `jump-steal` only; `land-steal` stays singular with one-target tie-break.
- Dev 1 should coordinate with Dev 2's active card-style cleanup so no-final-period text is preserved.

Open questions:
- Waiting for Dev 1 handback to QA.

## 2026-06-07 16:22 - GD

Changed:
- Added card text style rule: player-facing card text must not end with a final period.
- Added and dispatched a bulk card text cleanup task.
- Assigned implementation to `Dev 2`.
- Added QA follow-up for Google Sheet/local config sync and reveal smoke.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Rule applies to `Cards Config` player-facing fields `title`, `shortTitle`, and `description`.
- Internal periods between sentences stay; only a trailing final `.` is removed.
- Do not strip `!` or `?`, and do not rewrite internal `notes` unless they are displayed on cards.
- Dev must sync canonical Google Sheet `Cards Config` tabs `good`, `bad`, `tadam`, `event`, `shop`, plus `src/cards.config.js` and `cards-google-sheet.csv`.

Open questions:
- Waiting for Dev 2 handback to QA.

## 2026-06-07 16:16 - GD

Changed:
- Added and dispatched a UI task for Event `Сплочение` battle HUD.
- Assigned implementation to `Dev 3`.
- Added QA follow-up for desktop/mobile battle HUD readability and battle regression smoke.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- User wants `Сплочение` to show battle UI with target and current player results, like other battles.
- Contract: show `Сплочение`, target `6 * playerCount`, current team total, all players, rolling state, per-player force results, and final win/loss.
- Do not change `Сплочение` rules/rewards, Event card data, dice math, deck lifecycle, `Зелье ярости`, or `Сглаз` behavior.

Open questions:
- Waiting for Dev 3 handback to QA.

## 2026-06-07 15:45 - GD

Changed:
- Gave final GD approval for Dev 2 / QA 1 task `Good steal5 chosen-target steal`.
- Closed the card-tune gate for `good/steal5`.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Approved contract: `steal5` keeps id `steal5` and count `2`; title/description are `Выбери игрока, забери у него 5 монет`; active player chooses another player and steals up to 5 coins.
- QA confirmed chosen-target transfer, active-player exclusion, low-coin cap, local/CSV/Google Sheet sync, and no console errors.

Open questions:
- None for this `steal5` task.

## 2026-06-07 15:43 - QA 1

Changed:
- QA-approved Dev 2 handback `Good steal5 chosen-target steal` and forwarded it to GD for final approval per Task Lifecycle.
- Verified card data for `good/steal5`: id unchanged, count `2`, title/description `Выбери игрока, забери у него 5 монет`, effect `steal-chosen-player`, amount `5`.
- Browser-smoked 3-player classic/no-phone flow: drew/revealed `steal5`, applied it, confirmed choice popup shows only other players (`Кот`, `Выдра`) and excludes active `Пес`, chose `Выдра`, and verified `Пес` gained 5 while `Выдра` lost 5.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Static source check: `stealFromChosenPlayer()` builds choices from all opponents, not richest-only, and `stealCoins()` caps the transfer at the target's available coins.
- Isolated edge proof: a target with 3 coins gives exactly 3; self-transfer returns 0.
- Browser console errors: none observed in the checked `steal5` flow.
- QA did not find a rework item for Dev 2.

Open questions:
- Waiting for GD final approval.

## 2026-06-07 15:38 - Dev 2

Changed:
- Tuned Good card `steal5` from automatic richest-player steal to chosen-target steal.
- Updated `steal5` title/description to `Выбери игрока, забери у него 5 монет`.
- Added `steal-chosen-player` resolution: active player chooses another player, steals up to 5 coins, and logs the chosen target plus actual amount.
- Synced local card config, local CSV mirror, and Google Sheet `Cards Config` / `good`.
- Bumped host game cache key to `src/game.js?v=20260607-0387`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Card id remains `steal5`; count remains `2`.
- Google Sheet readback confirmed `good!A4:N4` has `steal-chosen-player`, amount `5`, count `2`, and the new text.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `git diff --check`.
- Did not touch unrelated cards, Joe Shop stock, finite decks, dice UI, Monster Rage indicator, or `outputs/`.
- Direct QA dispatch sent to `QA 1` (`019e9ef2-389c-78a3-bc66-9f38f69988f9`).

Open questions:
- Sent to QA first per Task Lifecycle; waiting for QA approval or reproducible rework.

## 2026-06-07 15:35 - GD

Changed:
- Added and dispatched a Good-card tuning task for `good/steal5`.
- Assigned implementation to `Dev 2`.
- Added QA follow-up for chosen-target steal behavior and card-data sync.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- User requested text: `Выбери игрока, забери у него 5 монет`.
- Design interpretation: the active player chooses another player, not themselves.
- If the chosen target has fewer than 5 coins, steal the available amount through the existing coin transfer path.
- Keep card id `steal5` and count `2`; sync Google Sheet `Cards Config` / `good` if available.

Open questions:
- Waiting for Dev 2 handback to QA.

## 2026-06-07 15:25 - GD

Changed:
- Gave final GD approval for Dev 3 / QA 1 fix `Random-choice roll UI overlaps dice animation`.
- Closed the specific UI overlap gate for random-choice dice rolls.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Approval covers only the overlap rework: compact rolling status no longer covers dice/action UI in checked `Кубик удачи` and `Портал хаоса` flows.
- Separate gates remain open for `Кубик удачи` rule/balance QA and `Ярость монстров` indicator placement QA.

Open questions:
- None for this overlap task.

## 2026-06-07 15:23 - QA 1

Changed:
- QA-approved Dev 3 rework `Random-choice roll UI overlaps dice animation` and forwarded it to GD for final approval per Task Lifecycle.
- Browser-smoked `Кубик удачи` rolling context on desktop `1440x900` and mobile `390x844`.
- Browser-smoked additional random-choice flow `Портал хаоса` on desktop `1440x900`.
- Verified normal movement roll remains uncluttered and does not get random-choice context classes.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `git diff --check`.
- `Кубик удачи` desktop: compact rolling status did not intersect dice faces, dice player label, result/action button; result context also did not intersect action button.
- `Кубик удачи` mobile: compact rolling status did not intersect dice faces, dice player label, or action button; no console errors.
- `Портал хаоса` desktop: compact rolling status did not intersect the portal die, dice player label, or action button; no console errors.
- Residual note: mobile result-state was checked for no overlap; exact-move testing left the page scroll in an artificial state, so QA did not treat a transient horizontal rect offset after result as a blocking rework item for this overlap bug.

Open questions:
- Waiting for GD final approval.

## 2026-06-07 15:16 - Dev 3

Changed:
- Reworked random-choice rolling-context layout so it no longer covers animated dice.
- Kept full explanatory context before the roll and after the result; during dice animation it collapses to a compact rolling status.
- Desktop status now sits at the bottom of the board area; mobile status uses a constrained compact safe column.
- Sent rework handback to QA first per Task Lifecycle.

Files:
- `styles.css`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- UI/layout only; no dice math, random generation, `Кубик удачи` amounts, movement, cards, decks, or normal movement roll behavior changed.
- Stylesheet cache key is now `styles.css?v=20260607-0386`.
- Checks passed: `node --check src/game.js`, `git diff --check`.
- Browser smoke passed:
  - `Кубик удачи` desktop `1440x900`: rolling context did not intersect dice/player label; no console errors.
  - `Кубик удачи` mobile `390x844`: rolling context did not intersect dice/player label or action button; no console errors.
  - `Портал хаоса` desktop `1440x900`: rolling context did not intersect dice/player label; no console errors.

Open questions:
- Waiting for QA approval before GD final approval.

## 2026-06-07 15:03 - Dev 1

Changed:
- Moved persistent `Ярость монстров +N` indicator out of the board/map area.
- `#monsterRageIndicator` now starts after `#scoreStrip` in `index.html` and is moved by layout sync into `.side-panel` between player cards and `.tadam-card` on wide layouts.
- Restyled `.monster-rage-indicator` as a normal info/status strip instead of an absolute board overlay.
- Kept Monster Rage rules, stacking, strength math, labels/tooltips, Event card data, and decks unchanged.
- Sent handback to QA first per Task Lifecycle.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `git diff --check`.
- Static check passed: `#monsterRageIndicator` is no longer inside `.map-wrap`.
- Browser smoke on `http://localhost:5173/`: indicator exists, hidden at `+0`, parent is `.side-panel`, `#scoreStrip` and `.tadam-card` are also in `.side-panel`, no console errors.

Open questions:
- QA still needs to apply/stack `Ярость монстров` and verify visible `+1/+2` placement.

## 2026-06-07 14:58 - GD

Changed:
- Gave GD final approval to the QA-approved `Joe Shop replenishing stock` task from `Dev 2`.
- Added and dispatched a UI placement task for the persistent `Ярость монстров +N` indicator.
- Assigned the Monster Rage UI task to `Dev 1`.
- Added and dispatched a Dev 3 rework item for random-choice roll UI overlapping dice, reported by the user during `Кубик удачи`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Approved Joe Shop scope: owned Shop items no longer deplete the Shop's 2-copy stock while the Shop card pool is small; source offer copies return to Shop discard/stock while players receive separate owned inventory copies.
- New Monster Rage UI request: show `Ярость монстров +N` between player cards and the TADAM block, and remove the chip from the field/board area.
- Monster Rage UI task is placement-only; do not change Monster Rage rules, stacking, or monster strength math.
- Random-choice roll context must stay useful but must not cover animated dice or result captions on desktop/mobile.

Open questions:
- Waiting for Dev 1 handback to QA on Monster Rage UI placement.
- Waiting for Dev 3 rework handback to QA on random-choice dice UI overlap.

## 2026-06-07 14:57 - Dev 3

Changed:
- Tuned field `Кубик удачи` to the final requested rule: 6 dice, each `6` gives `20` coins, each `1` moves `10` steps backward.
- Updated `resolveDiceFortuneField(...)` behavior plus prompt, roll context/status, result context, field-effect text, and tile tooltip.
- Added local constants for the `Кубик удачи` dice count/reward/penalty.
- Sent handback to QA first per Task Lifecycle.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Did not change board placement, dice random generation, other fields/cards, Event/Good/Joe Shop active tasks, or deck lifecycle.
- Host game cache key is now `src/game.js?v=20260607-0379`.
- Checks passed: `node --check src/game.js`, `git diff --check`, static old-text search, static formula check.
- Browser reload at `http://localhost:5173/` loaded `src/game.js?v=20260607-0379`; tooltip shows `6 = +20 монет, 1 = -10 шагов`; no console errors observed.

Open questions:
- Waiting for QA approval before GD final approval.

## 2026-06-07 14:57 - QA 1

Changed:
- QA-approved Dev 2 handback `Joe Shop replenishing stock` and forwarded it to GD for final approval per Task Lifecycle.
- Verified source lifecycle: regular Shop buy, free Shop draw, and Joe Auction winner all return source Shop offer copies to Shop discard/stock while inventory receives separate owned copies without `_copyId` / `_deckId`.
- Browser-smoked regular Joe Shop at `http://127.0.0.1:5173/`: bought `extra-die`, then the next Shop offer could show `extra-die` again despite the player owning it; visible offer cards stayed unique.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Static config check: Shop remains `8` physical configured copies (`2` each for `step-plus`, `battle-plus`, `coin-plus`, `extra-die`).
- Browser console errors: none observed in checked Shop flows.
- Good/Bad/TADAM/Event finite lifecycle was not changed by this task; QA checked the changed Shop paths and did not find a Dev 2 rework item.

Open questions:
- Waiting for GD final approval.

## 2026-06-07 14:55 - Dev 1

Changed:
- Updated Event card `Щедрый дождь` / `event/generous-rain` text and behavior.
- New behavior: if any players have 0 coins, only those players receive 20; if all players have coins, everyone receives 5.
- Synced local `src/cards.config.js`, `cards-google-sheet.csv`, and Google Sheet `Cards Config` tab `event`.
- Sent handback to QA first per Task Lifecycle.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Google Sheet readback confirmed `event!N7` description matches the requested text and `event!M7` count remains `2`.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `git diff --check`.
- Static local config check passed: `event/generous-rain` keeps id/title/count/effect and has the updated description.

Open questions:
- None.

## 2026-06-07 14:54 - GD

Changed:
- Added and dispatched a `Кубик удачи` tuning task.
- Assigned implementation to `Dev 3`.
- Added QA follow-up for updated reward/penalty amounts and prompt/context text.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- User requested final rule: roll 6 dice; each `6` gives `20` coins; each `1` moves `10` steps backward.
- Current code appears to have an older `+10` per `6` tune; this task should align implementation and UI to the user's final text.
- Do not change dice count, board placement, other field events/cards, or deck lifecycle.

Open questions:
- Waiting for Dev 3 handback to QA.

## 2026-06-07 14:52 - GD

Changed:
- Added and dispatched an Event-card tuning task for `Щедрый дождь`.
- Assigned implementation to `Dev 1`.
- Added QA follow-up for both payout branches and updated card text.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- New requested text: `Все игроки без монет получают 20 монет. Если монеты есть у всех, все получают 5 монет`.
- Behavior: if any player has 0 coins, only 0-coin players get 20; if all players have coins, everyone gets 5.
- Keep `event/generous-rain` id/title/count unchanged.

Open questions:
- Waiting for Dev 1 handback to QA.

## 2026-06-07 14:52 - Dev 2

Changed:
- Implemented the temporary replenishing Joe Shop stock rule.
- Shop offer source copies now return to Shop discard/stock even when bought, taken for free, or won in Joe Auction.
- Players receive separate owned Shop item copies without `_copyId` / `_deckId`, so owned inventory no longer depletes the Shop's 2-copy offer stock.
- Player-to-player Shop card transfer remains an owned-item transfer and does not touch Shop stock.

Files:
- `src/game.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Did not change Shop card data/counts/text/effects or non-Shop finite deck lifecycle.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Static check passed: Shop configured copies remain `8`; owned item copies strip deck-copy metadata; free draw, regular Shop buy, and Joe Auction all return source offer copies to Shop discard.
- Direct QA dispatch sent to `QA 1` (`019e9ef2-389c-78a3-bc66-9f38f69988f9`).

Open questions:
- Sent to QA first per Task Lifecycle; waiting for QA approval or reproducible rework.

## 2026-06-07 14:49 - GD

Changed:
- Added and dispatched a new temporary Joe Shop stock rule: while the Shop card pool is small, player-owned Shop items do not deplete the Shop's 2-copy stock.
- Assigned the implementation to `Dev 2`, since this touches the finite deck lifecycle he recently implemented.
- Added QA follow-up for Shop replenishing stock and non-Shop finite deck regression.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- This supersedes only the Shop-owned-card part of the finite deck lifecycle.
- Good/Bad/TADAM/Event remain physical decks with out-of-deck active/owned cards where applicable.
- Shop offers still use configured `count = 2`, but bought/free/auction-won source offer copies return to Shop discard/stock while the player receives a separate owned item.
- Multiple players may own more than 2 total copies of the same Shop item during this temporary small-card-pool phase.

Open questions:
- Waiting for Dev 2 handback to QA.

## 2026-06-07 03:28 - Dev 2

Changed:
- Implemented the new Good-card package: `Сглаз`, `Монетка из фонтана`, and `Путевой знак`.
- Added local card data for all three cards with `count: 2` and synced the Google Sheet `Cards Config` / `good` tab.
- Added `Сглаз` as a physical next-battle penalty card that stays out of the Good discard while held, stacks on one player, applies in the next personal battle, then discards to Good.
- Added host and phone compact `Сглаз` status chips.
- Added `Монетка из фонтана` strict-poorest payout logic (`15`, otherwise `8`) and `Путевой знак` forward/backward choice with backward landing resolution.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Google Sheet readback confirmed rows for `next-battle-minus3`, `fountain-coin`, and `path-sign` in tab `good`.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Static config check passed: each new Good card has `count: 2`; Good expanded count is now `20`.
- Did not touch unrelated Event/Shop source drift.
- Direct QA dispatch sent to `QA 1` (`019e9ef2-389c-78a3-bc66-9f38f69988f9`).

Open questions:
- Sent to QA first per Task Lifecycle; waiting for QA approval or reproducible rework.

## 2026-06-07 03:27 - Dev 3

Changed:
- Implemented contextual UI for non-movement/random-choice dice rolls.
- Added reusable roll-context markup/state around action prompts and a rolling status card near the active dice prompt.
- Covered `resolveOnePlayerTieByDie(...)`, Joe Auction tie rolls, `Портал хаоса`, and `Кубик удачи` with reason/participants/outcomes/result context.
- Sent handback to QA first per Task Lifecycle.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Normal movement rolls were intentionally left uncluttered.
- Browser reload at `http://localhost:5173/` loaded `styles.css?v=20260607-0378` and `src/game.js?v=20260607-0378`; no console errors observed.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.
- Parallel uncommitted card/Good-card changes are present in the worktree and were not reverted or claimed by Dev 3.

Open questions:
- Waiting for QA approval before GD final approval.

## 2026-06-07 03:26 - QA 2

Changed:
- Browser-smoked the Art/UI handback for `Событие / Вольный шаг` field preview button.
- QA-approved the handback and sent it to GD for final approval per Task Lifecycle.

Files:
- `project-memory/inbox/for-qa.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Browser target: `http://127.0.0.1:5173/`.
- Flow passed: `Вольный шаг` step-choice popup shows `0..N` plus `Показать поле`; `Показать поле` hides the popup and shows the board; main button becomes `К выбору`; `К выбору` restores the same popup/options.
- Regression passed: choosing `0` logs the zero-step choice and does not draw/trigger another Event; choosing `1` moves forward and resolves the green landing field (`+3`).
- No browser console warnings/errors observed in the checked tab.
- Checks passed: `node --check src/game.js`, `git diff --check`.

Open questions:
- Waiting for GD final approval of the QA-approved `Вольный шаг` field-preview handback.

## 2026-06-07 03:23 - Important

Changed:
- Renamed the active `Art / UI` role to `Art / UI 1`.
- Added `Art / UI 2` as an active additional visual/UI chat.
- Updated shared onboarding, read-news, next-chat, handoff, and UI inbox wording for `Art / UI 1` / `Art / UI 2`.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/prompts/read-news.md`
- `project-memory/prompts/next-chat.md`
- `project-memory/inbox/for-ui.md`
- `project-memory/updates.md`

Notes for others:
- `Art / UI 1` and `Art / UI 2` share `project-memory/inbox/for-ui.md`.
- Direct cross-thread messaging tools were unavailable in this session, so this notice is published through `updates.md` and onboarding docs.

Open questions:
- None.

## 2026-06-07 03:19 - GD

Changed:
- Added and dispatched a new Good-card task: `Сглаз`, a temporary next-battle `-3` status given to any player.
- Added two more Good cards to the same Dev 2 task: `Монетка из фонтана` and `Путевой знак`.
- Assigned implementation to `Dev 2`.
- Added QA follow-up for all three new Good cards, card data sync, status UI, battle consumption, movement choice, and finite deck lifecycle.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Card text requested by user: `Отдай эту карту любому игроку, в следующем бою он получает -3 к силе, затем сбрасывает эту карту`.
- GD working title/id: `Сглаз` / `next-battle-minus3`.
- Additional requested cards:
  - `Монетка из фонтана`: `Получи 8 монет. Если у тебя меньше всех монет, получи 15.`
  - `Путевой знак`: `Выбери: идти вперед на 5 или назад на 5. После перемещения назад сработает поле.`
- Count should be `2` for each new card; all three are non-artifact Good cards.
- The physical card stays out of the Good deck/discard while held and only goes to Good discard after the target's next battle consumes it.
- Multiple copies stack for the next battle.
- Do not fix unrelated card source drift in this task.

Open questions:
- Waiting for Dev 2 handback to QA.

## 2026-06-07 03:15 - GD

Changed:
- Added and dispatched a new UX task: show nearby explanatory context for dice rolls that randomly choose an action/player/outcome.
- Assigned the task to `Dev 3`.
- Added QA follow-up for random-choice dice context and desktop/mobile layout checks.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- This is not about the normal movement roll.
- Priority coverage: `resolveOnePlayerTieByDie(...)`, Joe Auction tie rolls, and random outcome rolls such as `Портал хаоса` / `Кубик удачи`.
- Requirement: explain reason, participants/options, selection criterion/outcomes, and result near the dice/action prompt.
- Do not change rules, dice math, card effects, deck behavior, or board placement.

Open questions:
- Waiting for Dev 3 handback to QA.

## 2026-06-07 03:04 - Art/UI

Changed:
- Added a field-view option to the Event `Вольный шаг` step-choice flow.
- Extended the existing card-choice preview mechanism with explicit `canPreviewField` support.
- Marked `chooseEventFreeStepAmount()` as previewable, so its popup can show `Показать поле`.
- Bumped host game cache key to `game.js?v=20260607-0376`.
- Sent the completed task to QA first per the updated Task Lifecycle.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- UI-only flow change; Event rules, dice math, step choice values, bot behavior, and movement resolution were not changed.
- The feature reuses existing behavior: `Показать поле` hides the choice popup, main action button becomes `К выбору`, and `К выбору` returns to the same choice.
- Checks passed: `node --check src/game.js`; `git diff --check`.

Open questions:
- Waiting for QA approval/rework before GD final approval.

## 2026-06-07 03:01 - GD

Changed:
- Gave GD final approval to the QA-approved finite decks/discard reshuffle task from `Dev 2`.
- Marked the Dev, QA, and GD inbox entries for the finite deck lifecycle task as approved/complete.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Approved scope: finite draw piles for `good`, `bad`, `tadam`, `event`, `shop`; discard reshuffle when draw pile ends; no-repeat-before-exhaustion behavior; graceful empty-deck handling.
- Approved lifecycle details: `magic-wallet` stays out while owned, `monster-rage` discards after applying, active TADAM/owned Shop cards stay out while active/owned, unchosen Shop offers discard.
- This approval is only for Dev 2 finite deck lifecycle; Dev 1 Event Phase 2 Monster Rage indicator recheck remains separate.

Open questions:
- Waiting for separate QA/GD closure on Event Phase 2 Monster Rage indicator.

## 2026-06-07 03:01 - QA 1

Changed:
- Completed QA-gate for `Dev 2` finite decks/discard reshuffle handback.
- QA-approved the handback and sent it to GD for final approval per Task Lifecycle.
- Updated Dev/QA/GD inbox statuses for the finite deck task.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `node --check server.js`, `git diff --check`.
- Host browser loaded `./src/game.js?v=20260607-0375` with no console errors.
- Physical deck counts from local `cardConfig`: `good 14`, `bad 6`, `tadam 14`, `event 17`, `shop 8`.
- Isolated execution of the current `src/game.js` deck helper functions confirmed draw-without-replacement, discard reshuffle, empty draw+discard null handling, `magic-wallet` out-of-discard, `monster-rage` to Event discard, and low-availability Shop offers returning fewer unique cards gracefully.
- Browser smoke passed for Good/Bad/TADAM/Event/Joe Shop back -> face reveal and Event Phase 2 `Вольный шаг` choose-0 flow.

Open questions:
- Waiting for GD final approval of the QA-approved finite deck lifecycle handback.
- Separate QA item still remains for Dev 1 Event Phase 2 Monster Rage persistent indicator recheck.

## 2026-06-07 02:59 - QA 2

Changed:
- Read QA 2 onboarding/project memory and checked active folder/git state before work.
- QA-approved `Dev 3` card deck copy counts and sent the approved result to GD for final approval.
- Ran static re-check for `Dev 1` Event Phase 2 Monster Rage rework; persistent indicator wiring is present, but browser verification is still blocked in this environment.
- Added a separate Dev follow-up for card source sync drift between live Google Sheet non-count columns and local card mirror/config.

Files:
- `project-memory/inbox/for-qa.md`
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Count QA evidence: `src/cards.config.js`, `cards-google-sheet.csv`, and live Google Sheet count column all match the rule: non-artifacts `count = 2`; `event/magic-wallet` stays `count = 1`; expanded sizes are `good 14`, `bad 6`, `tadam 14`, `event 17`, `shop 8`.
- Checks passed: `node --check src/cards.config.js`, `node --check src/game.js`, `node --check src/controller.js`, `node --check server.js`, `git diff --check`.
- Event Phase 2 static rework evidence: `#monsterRageIndicator` exists, `renderMonsterRageIndicator()` hides at `+0` and shows `Ярость монстров +N`, `render()` calls it, and `resolveEventMonsterRage()` stacks `state.eventMonsterRage` then renders.
- Browser smoke limitation: local server bind failed with `listen EPERM 127.0.0.1:5173`; in-app Browser policy also blocked `file://.../index.html`. QA 2 did not give browser-based Event Phase 2 approval.

Open questions:
- Waiting for GD final approval of the QA-approved card-count task.
- Event Phase 2 still needs a browser-capable QA re-check before GD final approval unless QA 1/another QA pass already covers it.

## 2026-06-07 02:56 - Dev 2

Changed:
- Sent a direct follow-up to the `QA 1` Codex thread for the finite decks/discard reshuffle QA gate.
- Clarified that `QA READY 2026-06-07 02:54 - Dev 2 handback for finite decks/discard reshuffle` is ready for immediate QA review.

Files:
- `project-memory/updates.md`

Notes for others:
- The QA handback was already in `project-memory/inbox/for-qa.md`; this update records the direct thread dispatch after the user noted QA had not started.
- Direct target thread: `QA 1` (`019e9ef2-389c-78a3-bc66-9f38f69988f9`).

Open questions:
- Waiting for QA 1 approval or rework task.

## 2026-06-07 02:54 - Dev 2

Changed:
- Implemented finite physical card decks with draw/discard piles for `good`, `bad`, `tadam`, `event`, and `shop`.
- New games rebuild all deck piles from current `cardConfig.*.count`.
- Draws now take physical card copies without replacement; empty draw piles reshuffle their discard pile and continue.
- Good/Bad/instant Event cards discard after resolving; `event/monster-rage` discards after applying; `event/magic-wallet` stays out of the Event deck while owned/in play.
- Active TADAM cards stay out of the deck while active; when the active TADAM table rotates past 3, the removed physical card goes to TADAM discard.
- Joe Shop offers draw finite cards; unchosen offers discard, bought/free/auction-won/owned cards stay out of the Shop deck.
- Shop and auction gracefully handle too-few/no available cards.
- Bumped host `src/game.js` cache key to `20260607-0375`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Did not change card counts, ids, titles, descriptions, effects, board placement, route order, dice math, Event effect behavior, `src/cards.config.js`, or controller protocol.
- Preserved Dev 1 Event Phase 2 and Dev 3 count work; implementation uses current `cardConfig` counts.
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `git diff --check`.
- Static proof passed:
  - `good`: configured 14 physical copies, drew 14 unique before reshuffle;
  - `bad`: configured 6 physical copies, drew 6 unique before reshuffle;
  - `tadam`: configured 14 physical copies, drew 14 unique before reshuffle;
  - `event`: configured 17 physical copies, drew 17 unique before repeat, Event discard had 16 because `magic-wallet` stayed out;
  - `shop`: configured 8 physical copies, drew 8 unique before reshuffle.

Open questions:
- Sent to QA first per Task Lifecycle; browser/regression smoke still needed by QA.

## 2026-06-07 02:49 - GD

Changed:
- Added a new deck lifecycle contract: decks are finite draw piles with discard piles, and an empty draw pile reshuffles its discard.
- Assigned implementation to `Dev 2` to avoid mixing it with Dev 1's Event Phase 2 rework and Dev 3's count QA loop.
- Added QA follow-up for finite decks, reshuffle behavior, and persistent/owned card lifecycle.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Covered decks: `good`, `bad`, `tadam`, `event`, `shop`.
- Deck piles must be built from `cardConfig` using current `count` values.
- `good`, `bad`, and instant `event` cards go to discard after resolving.
- `event/magic-wallet`, active TADAM cards, and owned Shop cards stay out of their source deck while in play/owned.
- `event/monster-rage` is not an artifact and should discard after applying its global bonus.

Open questions:
- Waiting for Dev 2 handback to QA.

## 2026-06-07 02:49 - Dev 1

Changed:
- Completed QA rework for Event Phase 2: added a persistent host indicator for global `Ярость монстров +N`.
- Added `#monsterRageIndicator` to the board/map status area so the indicator remains visible after the toast fades.
- Added `renderMonsterRageIndicator()` to update/hide the chip on every render; stacking should update the same chip to `+2`, `+N`.
- Styled the indicator for desktop and narrow board layouts.
- Sent the rework handback back to QA first per Task Lifecycle.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `git diff --check`.
- Static check passed: `#monsterRageIndicator`, `.monster-rage-indicator`, and `renderMonsterRageIndicator()` are present and connected.
- Browser re-check needed by QA: apply `Ярость монстров`, wait for toast fade, confirm visible `Ярость монстров +1`; apply again and confirm `+2`.

Open questions:
- None.

## 2026-06-07 02:18 - QA 1

Changed:
- Ran QA-gate browser/static smoke for `Dev 1` Event deck Phase 2 handback.
- Returned Event Phase 2 to Dev 1 instead of forwarding to GD, because `Ярость монстров` lacks a persistent global host indicator after the toast fades.
- Added a reproducible Dev rework item with expected/actual/result notes.
- Marked the Event Phase 2 QA item as returned to Dev 1 and recorded completed coverage.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Passed in browser: `Вольный шаг` 0 and >0, `Сплочение` win/loss, `Волшебный кошель` assignment/+5/overtake/host chip/phone Big Button chip, `Ярость монстров` monster power labels/tooltips, and Good/Bad/TADAM/Joe Shop reveal regression smoke.
- Static checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `node --check server.js`, `git diff --check`.
- Static Event config check found all 9 Event card ids/effect branches present; note that Dev 3 count changes later expand the Event deck size beyond 9 physical copies.
- QA fail detail: after `Ярость монстров`, monster powers update (`16 -> 17`, `24 -> 25`, `10 -> 11`, `6 -> 7`) and tooltips show base + rage, but after the toast disappears the only visible `Ярость монстров` text is in Chronicle/log. `src/game.js` writes `monsterRageText` to `#activePlayerRole`, but `index.html` has no such element.

Open questions:
- Waiting for Dev 1 rework handback, then QA should re-check persistent rage indicator and stacking to `+2` before sending to GD.

## 2026-06-07 02:10 - Dev 3

Changed:
- Completed count-only card deck config task and sent handback to QA first per Task Lifecycle.
- Set every non-artifact card in `good`, `bad`, `tadam`, `event`, and `shop` to `count = 2`.
- Kept `event/magic-wallet` / `Волшебный кошель` at `count = 1` because it is the current artifact.
- Set `event/monster-rage` / `Ярость монстров` to `count = 2` because it is a global Event, not an artifact.
- Synced local `src/cards.config.js`, local CSV mirror, and Google Sheet `Cards Config` count column.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Google Sheet `Cards Config` was updated only in column `M` / `count` for tabs `good`, `bad`, `tadam`, `event`, and `shop`; readback confirmed the expected counts.
- Count matrix passed locally:
  - `good` expanded size `14`;
  - `bad` expanded size `6`;
  - `tadam` expanded size `14`;
  - `event` expanded size `17`;
  - `shop` expanded size `8`.
- Verification passed:
  - `node --check src/cards.config.js`;
  - `git diff --check`;
  - static matrix found no count mismatches.
- Data/config count-only: no ids, titles, descriptions, effect types, amounts, Event logic, board placement, routes, UI, controller protocol, or dice math changed by Dev 3.

Open questions:
- Waiting for QA approval/rework, then QA should forward approved result to GD.

## 2026-06-07 02:07 - Important

Changed:
- Renamed the active `QA` role to `QA 1`.
- Added `QA 2` as an active additional testing chat.
- Updated shared onboarding, read-news, next-chat, handoff, and QA inbox wording for `QA 1` / `QA 2`.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/prompts/read-news.md`
- `project-memory/prompts/next-chat.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- `QA 1` and `QA 2` share `project-memory/inbox/for-qa.md`.
- QA approval remains the required first gate before GD final approval.

Open questions:
- None.

## 2026-06-07 02:06 - GD

Changed:
- Added and dispatched a new card-count task: all non-artifact cards should have 2 copies; artifacts stay at 1 copy.
- Assigned the task to `Dev 3` to keep it separate from Dev 1's Event Phase 2 implementation/QA loop.
- Added QA follow-up for card deck copy counts.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Covered decks: `good`, `bad`, `tadam`, `event`, `shop`.
- Current known artifact: `event/magic-wallet`; it stays `count = 1`.
- `event/monster-rage` is global Event, not artifact, so it should become `count = 2`.
- This is data/config only; do not change card logic while Event Phase 2 is in QA.

Open questions:
- Waiting for Dev 3 handback to QA.

## 2026-06-07 02:02 - GD

Changed:
- Gave GD final approval to the QA-approved field2 Event placement + Event tile backing task.

Files:
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- Approved scope:
  - all 9 screenshot Event cells on field2;
  - Event gray tile backing/border styling;
  - route order and adjacent sample cells preserved;
  - normal Event reveal still opens on landing.
- This approval is separate from Event deck Phase 2, which is implemented by Dev 1 and currently awaiting QA approval.

Open questions:
- Waiting for QA result on Event deck Phase 2.

## 2026-06-07 02:00 - QA

Changed:
- Read updated `project-memory/README.md` Task Lifecycle and fresh `updates.md`; adopted the process rule that QA is the first approval gate before GD final approval.
- Ran QA-gate browser/static verification for Dev 1 handback: field2 Event screenshot placement + Event tile backing.
- QA-approved the handback and sent the approved result to GD for final approval.
- Marked the matching QA follow-up as QA-approved/sent to GD.

Files:
- `project-memory/inbox/for-gd.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Verified all 9 field2 Event cells, Event gray backing in classic/tabletop styles, adjacent sample cells unchanged, and landing on newly changed `8-13` opens normal Event back -> face reveal.
- Static checks passed: `node --check src/game.js`, `node --check server.js`, `node --check src/controller.js`, `node --check src/cards.config.js`.
- No host console errors in tested browser flow.

Open questions:
- Waiting for GD final approval of the QA-approved Event board/tile-backing handback.

## 2026-06-07 02:00 - Dev 1

Changed:
- Finished Event deck Phase 2 implementation and sent it to QA first per the new Task Lifecycle.
- Enabled all 9 Event cards in the draw pool by using full `cardConfig.event`.
- Implemented `Вольный шаг`, `Сплочение`, `Волшебный кошель`, and `Ярость монстров`.
- Added Magic Wallet as a separate player artifact with icon chip on host player status and phone controller player card.
- Added stacked global monster-rage state and effective monster strength labels/checks for board monster battles, including the final monster gate.
- Added artifact/global rage fields to game history and phone snapshots.

Files:
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `index.html`
- `controller.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-qa.md`

Notes for others:
- Checks passed: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `git diff --check`.
- Static Event-pool check passed: 9 Event cards, all expected effect types present, no Phase 1-only filter remains.
- Browser smoke was attempted but blocked in this environment: local bind failed with `PermissionError: [Errno 1] Operation not permitted`, and in-app browser blocked `localhost`/`127.0.0.1` with `net::ERR_BLOCKED_BY_CLIENT`.
- QA should browser-smoke the Phase 2 card flows and phone artifact chip before forwarding to GD.

Open questions:
- None.

## 2026-06-07 01:58 - Important

Changed:
- Synced the new required task lifecycle into handoff and onboarding context.
- Reinforced the process: executor handback goes to QA first, then QA-approved work goes to GD for final approval.

Files:
- `project-memory/handoff.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/updates.md`

Notes for others:
- Implementation/design tasks should follow: executor -> QA approval -> GD final approval.
- A task is not final until GD explicitly approves it.

Open questions:
- None.

## 2026-06-07 01:58 - GD

Changed:
- Sent direct read-notice prompts to all active role threads: `Important`, `Dev 1`, `Dev 2`, `Dev 3`, `Art / UI`, and `QA`.
- Asked everyone to read updated `project-memory/README.md`, especially `Task Lifecycle`, and follow the QA-first approval flow.

Files:
- `project-memory/updates.md`

Notes for others:
- Process reminder sent: executor -> QA approval -> GD final approval.

Open questions:
- None.

## 2026-06-07 01:57 - GD

Changed:
- Tightened the shared task lifecycle: QA is now the first approval gate before GD final approval.
- Updated the flow so executors send completed tasks to QA; QA either returns them to the executor for rework or forwards QA-approved results to GD.

Files:
- `project-memory/README.md`
- `project-memory/updates.md`

Notes for others:
- GD final approval should happen after QA approval for implementation tasks.
- If GD still rejects a QA-approved task, GD sends a rework task back to the executor and the loop repeats.

Open questions:
- None.

## 2026-06-07 01:55 - GD

Changed:
- Approved Dev 2's `server.js` fix for phone room `full` mode normalization.
- Confirmed the design contract is satisfied: `big-button` remains the default/fallback, and `full` is a valid selectable mode.

Files:
- `project-memory/inbox/for-gd.md`
- `project-memory/updates.md`

Notes for others:
- QA is not required before GD approval for this minimal server allow-list fix.
- A browser/server restart smoke is still useful before release/commit if QA is already doing a phone-controller pass.

Open questions:
- None.

## 2026-06-07 01:55 - GD

Changed:
- Added the shared task lifecycle to `project-memory/README.md`.
- Formalized the loop: GD task -> executor implementation -> QA when needed -> GD approval -> brief report or rework -> repeat until GD approval.

Files:
- `project-memory/README.md`
- `project-memory/updates.md`

Notes for others:
- Inbox handback alone is not final acceptance.
- A task is considered finished only after GD explicitly approves it.

Open questions:
- None.

## 2026-06-07 01:48 - Dev 2

Changed:
- Fixed the current-source phone room mode normalization bug in `server.js`.
- `full` is now a valid room mode while `big-button` remains the default/fallback mode.

Files:
- `server.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Minimal server-only change: updated `roomModes` from duplicate `big-button` entries to `new Set([defaultRoomMode, "full"])`.
- Did not touch Event deck / `src/game.js` / `src/controller.js`, to avoid conflicts with Dev 1 Event Phase 2 work.
- Pre-existing uncommitted `server.js` changes from other work are still present in the worktree; Dev 2 only changed the allowed modes line.
- Checks passed: `node --check server.js`, `git diff --check`.
- Static normalization check passed:
  - `normalizeRoomMode("full") => full`;
  - `normalizeRoomMode("unknown") => big-button`;
  - `normalizeRoomMode("big-button") => big-button`.

Open questions:
- None.

## 2026-06-07 01:48 - GD

Changed:
- Redistributed current Dev load across available Dev chats.
- Kept `Dev 1` on Event deck Phase 2 because that work touches shared game state, movement, battle, UI, and controller surfaces.
- Sent independent `server.js` phone-room `full` mode regression directly to `Dev 2`.
- Left `Dev 3` idle for now to avoid concurrent edits in the same `src/game.js` Event implementation surface.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Current split:
  - `Dev 1`: Event Phase 2 cards.
  - `Dev 2`: `server.js` room mode allow-list, keep `big-button` default and allow `full`.
  - `Dev 3`: reserve for follow-up QA/review or a clearly independent task.

Open questions:
- Waiting for Dev 1 and Dev 2 handbacks.

## 2026-06-07 01:43 - GD

Changed:
- Added implementation-ready Dev task for Event deck Phase 2: `Вольный шаг`, `Сплочение`, `Волшебный кошель`, `Ярость монстров`.
- Clarified artifact rule: Event cards with icons are persistent player artifacts, not Joe Shop cards.
- Specified `Волшебный кошель` must use `assets/icons/artifact_magic_wallet_512.png` and display as a player artifact chip.
- Added QA follow-up checklist for Phase 2 Event cards.
- Sent the Phase 2 implementation task directly to the existing `Dev 1` Codex thread.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- After Phase 2 implementation, all 9 Event cards should be in the draw pool.
- Artifacts should not be buyable/stealable through Joe Shop card flows and should not count as Joe Shop cards for final scoring unless GD later changes that rule.
- `Ярость монстров` is a persistent global Event, not an artifact.

Open questions:
- Waiting for Dev implementation/handback.

## 2026-06-07 01:42 - Dev 1

Changed:
- Updated field2 Event placement from the user/GD screenshot.
- Set these field2 cells to `event`:
  - `9-2`
  - `3-4`
  - `10-4`
  - `5-6`
  - `10-9`
  - `2-10`
  - `10-12`
  - `8-13`
  - `4-14` remains `event`.
- Fixed Event tile visual backing by adding `.tile-event` / `.tile-event::before` to the shared icon-tile selector groups in classic and tabletop styles.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Board placement/CSS only.
- Did not change `pathCells`, `route`, field1, doors/monsters, dice math, card data, Event draw pool, or Event effects.
- Static verification confirmed all 9 listed field2 cells now map to `event`, Event still uses `Событие`/`event_quest_512.png`, and adjacent non-listed sample cells remain unchanged.
- Verification passed: `node --check src/game.js`; `git diff --check`.

Open questions:
- Browser visual smoke was not run in this environment.

## 2026-06-07 01:36 - QA

Changed:
- Added QA working rule from user: send reproducible implementation tasks to Dev immediately when QA finds a bug/regression or development-needed issue, unless the user explicitly says otherwise.

Files:
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- QA still should not edit gameplay code without a direct request; this rule is about sending tasks to Dev promptly.

Open questions:
- None.

## 2026-06-07 01:36 - GD

Changed:
- Sent the active Event board update directly to the existing `Dev 1` Codex thread.
- Included the related QA Event tile-backing bug in the same Dev dispatch so the expanded Event cells do not inherit the missing gray tile background.
- Marked the Dev inbox task as dispatched to `Dev 1`, not merely queued.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `Dev 1` was idle when the dispatch was sent.
- Expected Dev work: update 8 additional `field2` cells to `event`, keep `4-14` as `event`, fix `.tile-event` styling coverage, and hand back to GD.

Open questions:
- Waiting for `Dev 1` implementation/handback.

## 2026-06-07 01:34 - QA

Changed:
- Confirmed user-reported visual issue: Event cells render the Event quest icon but lack the gray tile backing/border used by other icon cells.
- Added a reproducible Dev task for the Event tile backing bug.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Likely styling coverage issue: `.tile-event` is missing from the shared tile background/border selector groups in `styles.css`.
- This should be fixed alongside or before expanding all black-exclamation cells on field2 to Event, otherwise the same visual issue will repeat on all new Event cells.

Open questions:
- Waiting for Dev fix/handback.

## 2026-06-07 01:34 - GD

Changed:
- Added working rule from user: GD should send implementation-ready tasks to Dev immediately when a design decision requires development, unless the user explicitly says otherwise.

Files:
- `project-memory/updates.md`

Notes for others:
- Default GD behavior: do not wait for extra approval before writing Dev inbox tasks for clear implementation work.
- Keep the existing safety rule: GD should not edit gameplay code without a direct request.

Open questions:
- None.

## 2026-06-07 01:31 - GD

Changed:
- Translated the user's field screenshot into exact `field2` Event-cell coordinates.
- Added a Dev task to update all black-exclamation cells on `field2` to `event`.
- Added a QA follow-up checklist for the Event-cell placement after Dev handback.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- Target Event cells on `field2`: `9-2`, `3-4`, `10-4`, `5-6`, `10-9`, `2-10`, `10-12`, `8-13`, `4-14`.
- `4-14` is already `event`; the new implementation work is mainly the other 8 cells.
- This is board placement only: keep route order unchanged and do not expand Event Phase 2 draw pool.

Open questions:
- Waiting for Dev implementation/handback.

## 2026-06-07 01:29 - Important

Changed:
- Updated `next-chat` archive rename instruction to use the short date format `<role> - DD.MM`.

Files:
- `project-memory/prompts/next-chat.md`
- `project-memory/updates.md`

Notes for others:
- When handing work to a replacement chat, write the archive rename line like `GD - 07.06`.

Open questions:
- None.

## 2026-06-07 01:28 - GD

Changed:
- Onboarded replacement GD chat after the previous GD context-compaction failure.
- Reviewed project memory, role inboxes, current git status, and the implemented Event deck slice.
- Accepted Event deck Phase 1 as the current MVP vertical slice from a GD perspective after Dev 1 handback and QA smoke: field2 `4-14`, Event reveal with title, phone preview, and Phase 1 effects are enough to proceed.
- Prioritized the current-source phone-room `full` mode regression as the next Dev blocker before treating the local Event/phone work as clean for handoff/push.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`

Notes for others:
- Phase 2 Event cards remain backlog: `free-step`, `unity`, `magic-wallet`, `monster-rage`.
- `Волшебный кошель` icon now exists at `assets/icons/artifact_magic_wallet_512.png`; use it when Phase 2 artifact logic/UI is implemented.
- Do not expand the Event draw pool until the matching Phase 2 effect/UX is implemented, so drawn cards never silently do nothing.

Open questions:
- Waiting for Dev fix of `server.js` mode allow-list: `full` must remain supported while `big-button` stays the default.
- After that, decide whether the next GD priority is Event Phase 2 or cleanup/commit coordination.

## 2026-06-07 01:16 - Art/UI

Changed:
- Prepared the `Волшебный кошель` artifact icon as `assets/icons/artifact_magic_wallet_512.png`.
- Checked Event card face assets and confirmed `event_front.png` is suitable for explicit title + effect text.
- Adjusted Event card reveal CSS so the title/body text sits in the lower clean parchment area, not over the upper exclamation emblem.
- Added Dev visual notes for Event title/body layout and compact artifact chip display.
- Bumped stylesheet cache key to `styles.css?v=20260607-0372`.

Files:
- `assets/icons/artifact_magic_wallet_512.png`
- `assets/cards/event_front.png`
- `assets/cards/event_back.png`
- `assets/icons/event_quest_512.png`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Icon sizes verified: artifact and Event field icon are 512x512 RGBA PNG; Event front/back are 744x1039 RGBA PNG.
- Event text safe-zone direction: `.event-card-text` uses lower card area around `top: 57%`, `bottom: 11%`; title is intended for up to about 2 lines, body uses smaller text below.
- Artifact display suggestion for Dev: compact icon-first chip near player statuses/shop cards, with short `+5 монет/ход` hint where space allows.
- Verification passed: `git diff --check`.

Open questions:
- Needs Dev implementation/visual QA after Event artifact transfer UI is in place.

## 2026-06-07 01:15 - QA

Changed:
- Ran browser smoke for Dev 1 Event deck vertical slice Phase 1 after handback.
- Field/board checks passed on desktop:
  - selected board is `field2`;
  - `4-14` is `tile-event`, title `Событие`, icon `./assets/icons/event_quest_512.png`;
  - `3-14` remains `Хорошо`;
  - previous top-right swap still visible: `13-0` is Joe Auction, `14-0` is TADAM.
- Event reveal checks passed after fresh CSS load:
  - landing on `4-14` opens Event back -> face reveal;
  - desktop face is normal card size (`218x305`), title/body visible, text inside card bounds;
  - mobile `390x844` face is readable; tested with `Равновесие`.
- Phone controller check passed for Big Button:
  - controller preview renders `controller-card-preview-event`;
  - preview text includes deck `Событие`, title `Гонка`, and body text;
  - no controller console errors.
- Phase-1 effect smoke:
  - `Гонка` gameplay pass: roll total `4`, reward `+5`, player coins went from 10 to 15, Chronicle logged the result.
  - `Щедрый дождь` no-op pass: with no 0-coin players, Chronicle logged `игроков с 0 нет` and coins stayed unchanged.
  - Static pass confirmed implemented branches for `Портальный обмен`, `Равновесие`, `Справедливость`; Phase 2 cards remain excluded from draw pool.
- Non-regression smoke:
  - Good reveal still normal (`218x305`);
  - TADAM reveal still normal (`218x305`);
  - Joe Shop offer reveal still normal;
  - no host/controller console errors in tested flows.
- Updated Dev inbox note for the phone `full` mode source-regression with a clarification that the already-running server is stale and still accepts `full`, while current `server.js` would normalize it to `big-button` after restart.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`

Notes for others:
- No gameplay source code was edited by QA.
- Bad-card reveal was not reached through full gameplay in this pass because nearest convenient Bad landings are behind route complications; Good/Bad share the existing reveal implementation, and Good/TADAM/Shop were checked live.

Open questions:
- Dev should still fix current-source `server.js` room mode allow-list before restart/commit: `roomModes` must include `full`.
- Optional follow-up: deterministic/browser coverage for remaining Event Phase-1 effects (`Портальный обмен`, `Равновесие`, `Справедливость`) with controlled state.

## 2026-06-07 01:12 - Dev 1

Changed:
- Added Event deck vertical slice Phase 1.
- Synced local Event card data into `src/cards.config.js` and `cards-google-sheet.csv`.
- Added field2 Event placement: `4-14` changed from `good` to `event`; route/path order unchanged; `3-14` left unchanged.
- Wired Event board/UI plumbing:
  - tile type/event icon `assets/icons/event_quest_512.png`;
  - tile title/tooltip/history label `Событие`;
  - landing behavior draws one Event card;
  - reveal uses Event back/front assets and shows the card `title` plus description on the face;
  - phone card preview supports Event deck title/body and gets an Event accent class.
- Added Phase 1 Event draw pool only:
  - `race`;
  - `generous-rain`;
  - `portal-swap`;
  - `balance`;
  - `justice`.
- Implemented Phase 1 effects:
  - `Гонка`: 1d6 + step bonus, reward tiers +20/+10/+5 coins;
  - `Щедрый дождь`: players with 0 coins receive +20;
  - `Портальный обмен`: active player chooses another player and swaps positions;
  - `Равновесие`: richest gives 10 coins to poorest, using 1d6 tie-break when needed;
  - `Справедливость`: first by route moves 10 back, last by route moves 10 forward, others receive +5; route ties use 1d6 tie-break.
- Added cache bumps:
  - host/controller CSS `styles.css?v=20260607-0371`;
  - host game `game.js?v=20260607-0368`;
  - controller JS `controller.js?v=20260607-0364`;
  - cards import `cards.config.js?v=20260607-0322`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `assets/icons/event_quest_512.png`
- `assets/cards/event_back.png`
- `assets/cards/event_front.png`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Phase 2 Event cards are present in local sources but intentionally excluded from `eventCards` draw pool to avoid silent no-op cards:
  - `free-step`;
  - `unity`;
  - `magic-wallet`;
  - `monster-rage`.
- No Good/Bad/TADAM/Joe Shop card behavior changed for this Event task beyond shared reveal/preview helpers.
- Monster base config, dice math, routes, phone room protocol, saves transport, and unrelated bot AI were not changed.
- Verification passed: `node --check src/game.js`; `node --check src/cards.config.js`; `node --check src/controller.js`; `git diff --check`.

Open questions:
- Browser gameplay smoke was not run in this environment.
- Phase 2 remains: `free-step`, `unity`, `magic-wallet`, `monster-rage`; Art/UI artifact icon for `Волшебный кошель` still pending/confirming.

## 2026-06-07 01:02 - QA

Changed:
- Onboarded QA chat: read project memory, active Dev/GD/UI inboxes, new QA inbox, prompts, and recent updates.
- Checked git state first: branch `main` is even with `origin/main`, but the working tree has many uncommitted changes and new Event assets.
- Ran syntax checks: `node --check src/game.js`, `node --check src/cards.config.js`, `node --check src/controller.js`, `node --check server.js` all passed.
- Static QA pass confirmed Dev 1 Event Phase 1 handback is present in current local changes: `field2 4-14` is `event`, Event deck exists, card face markup shows Event title + body, phone preview class recognizes Event.
- Found a phone-room regression: `server.js` rejects/normalizes requested `full` mode to `big-button`, so `Полный контроллер` will not survive server room creation despite host UI allowing it.
- Wrote a reproducible Dev task for this regression.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-dev.md`

Notes for others:
- Browser smoke could not run in this environment: local server binding failed with `EPERM` on `0.0.0.0:5173` and `127.0.0.1:5173`; Browser policy also blocked direct `file://` navigation.
- No gameplay source code was edited by QA.

Open questions:
- Needs Dev fix/handback for the phone `full` mode server allow-list.
- Event deck still needs real browser gameplay smoke in an environment where the local target can be opened.

## 2026-06-07 01:00 - Important

Changed:
- Added `QA` as an active testing chat for "Очень Большая Бродилка".
- Created `project-memory/inbox/for-qa.md`.
- Updated shared memory and onboarding prompt with the QA role.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/inbox/for-qa.md`
- `project-memory/updates.md`

Notes for others:
- `QA` owns smoke checks, regression checks, reproduction notes, and bug reports for Dev roles.
- Active chats now include `Important`, `Dev 1`, `Dev 2`, `Dev 3`, `GD`, `Art / UI`, and `QA`.

Open questions:
- None.

## 2026-06-07 00:53 - GD

Changed:
- Created canonical Google Sheet tab `event` in `Cards Config` with 9 Event cards.
- Added Dev task for first Event deck vertical slice.
- Clarified user requirement: Event card faces must show the card name/title.

Files:
- Google Sheet `Cards Config`, sheet `event`, range `A1:N10`.
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Existing Event assets from Art/UI:
  - `assets/icons/event_quest_512.png`
  - `assets/cards/event_back.png`
  - `assets/cards/event_front.png`
- First Event cell placement for MVP: field2 `4-14`, replacing current `good`; route order unchanged.
- Event cards: `Гонка`, `Вольный шаг`, `Сплочение`, `Справедливость`, `Равновесие`, `Щедрый дождь`, `Портальный обмен`, `Волшебный кошель`, `Ярость монстров`.
- Art/UI should provide/confirm artifact icon for `Волшебный кошель`.

Open questions:
- Waiting for Dev implementation/handback and Art/UI artifact icon handback.

## 2026-06-07 00:51 - Art/UI

Changed:
- Created the Event card front in the shared front-card style: warm parchment, rounded brown border, hand-drawn inner frame, upper quest/event emblem, and a large clean text area below.
- Saved the final card asset as a 744x1039 RGBA PNG to match existing front cards.

Files:
- `assets/cards/event_front.png`
- `project-memory/updates.md`

Notes for others:
- Visual-only asset; not wired into Event card logic/UI yet.
- No Dev task was written because user has not approved integration work.

Open questions:
- Needs approval before asking Dev to connect Event front/back/icon assets in code.

## 2026-06-07 00:40 - Art/UI

Changed:
- Created a new Event card back in the shared card-back style: cream rounded border, black inner frame, textured violet field, and a central golden quest/event exclamation mark.
- Saved the final card asset as a 744x1039 RGBA PNG to match the current card back format.

Files:
- `assets/cards/event_back.png`
- `project-memory/updates.md`

Notes for others:
- Visual-only asset; not wired into Event card logic/UI yet.
- No Dev task was written because user has not approved integration work.

Open questions:
- Needs approval before asking Dev to connect the Event card back in code.

## 2026-06-07 00:32 - Art/UI

Changed:
- Created a new Event card icon: a large golden quest-style exclamation mark over a magical parchment base.
- Saved the final transparent PNG as a 512x512 project asset.

Files:
- `assets/icons/event_quest_512.png`
- `project-memory/updates.md`

Notes for others:
- The icon is visual-only and is not wired into card logic/UI yet.
- No Dev task was written; user asked only to draw the asset.

Open questions:
- Needs approval before asking Dev to connect it to the new Event card type.

## 2026-06-06 23:40 - Dev 1

Changed:
- Added reusable one-player tie-break helper `resolveOnePlayerTieByDie(candidates, { reason, autoFor })`.
- The helper rolls 1d6 for tied candidates, logs participants/results/selected target, and rerolls only tied max candidates until one target remains.
- Applied the rule to known singular one-player effects:
  - Good `steal-richest`: tied richest opponents now resolve by 1d6 instead of player id;
  - Bad `give-poorest`: tied poorest opponents now resolve by 1d6 instead of player id;
  - TADAM `land-steal`: when several other players are on the landing cell, steals from one selected target only;
  - TADAM `jump-steal`: when several other players are on the passed cell, steals from one selected target only for that trigger.
- Converted the affected target/effect functions to async and awaited them in movement/landing/card-effect flow.
- Bumped host cache key to `game.js?v=20260606-0367`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Log-only MVP for tie rolls: Chronicle shows who participated, what each rolled, reroll notices, and who was selected.
- Single-candidate cases return the candidate directly and do not log a tie-break.
- No card text/id/effect id, coin amount, dice math, routes, phone controllers, saves, or unrelated bot AI changes.
- Effects that explicitly apply to all matching players were not changed.
- Verification passed: `node --check src/game.js`; `git diff --check`.

Open questions:
- Browser gameplay smoke was not run in this environment.

## 2026-06-06 23:33 - GD

Changed:
- Added new general rule: if a card/field says a one-player effect applies to one player, but multiple players satisfy the condition, target selection is resolved by a 1d6 tie-break.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Tied candidates each roll 1d6; highest roll becomes the selected target; if tied again, reroll only tied candidates.
- Known current affected cases:
  - Good `steal-richest`;
  - Bad `give-poorest`;
  - TADAM `land-steal`;
  - TADAM `jump-steal`.
- Current deterministic tie by player id for richest/poorest should be replaced.
- Singular TADAM steal effects should target one selected player when multiple players are on the relevant cell, not all of them.

Open questions:
- Waiting for Dev implementation/handback.

## 2026-06-06 23:31 - Dev 1

Changed:
- Synced Good card `buy-shop-card` description from Google Sheet into local card sources.
- Implemented fallback for `buy-shop-card-from-player`:
  - if the player has fewer than 5 coins, they receive `+5` coins;
  - if opponents have no Joe Shop cards, the player receives `+5` coins;
  - if purchase choices are available, the existing selection/purchase flow stays unchanged;
  - manual `Отказаться` from an available purchase still gives no fallback reward.
- Used existing `addCoins()` helper for fallback rewards so coin history and coin float stay on the normal path.
- Bumped cache keys to `cards.config.js?v=20260606-0321` and `game.js?v=20260606-0366`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Cost remains `5`; card id/effect type, target/card choice UI, transfer-purchase logic, other cards, Joe Shop rules, dice, routes, bots, phones, saves, and balance were not changed.
- Verification passed: `node --check src/game.js`; `node --check src/cards.config.js`; `git diff --check`.
- Code/static confirmation:
  - insufficient coins branch calls `addCoins(player, 5)` and returns before opening choices;
  - no-opponent-shop-card branch calls `addCoins(player, 5)` and returns before opening choices;
  - available purchase branch still opens `chooseCardAction()`;
  - decline branch still only logs decline and returns.

Open questions:
- Browser gameplay smoke was not run in this environment.

## 2026-06-06 23:25 - GD

Changed:
- Updated Google Sheet `Cards Config` for Good card `buy-shop-card`.
- Added Dev task to sync local card sources and implement the new fallback behavior.

Files:
- Google Sheet `Cards Config`, sheet `good`, row `7`, cell `N7`.
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- New description in Google Sheet:
  - `Можешь заплатить 5 монет любому игроку и забрать у него любую карту Лавка Джо. Если у тебя не хватает монет или у противников нет Лавок Джо, получи 5 монет`
- GD checked local code: `resolveBuyShopCardFromPlayer()` currently returns without reward when player cannot pay or opponents have no Joe Shop cards.
- Dev should sync `src/cards.config.js` and `cards-google-sheet.csv`, then add fallback `+5 монет` only for the two unavailable-action cases.
- If player manually declines an available purchase choice, do not grant fallback.

Open questions:
- Waiting for Dev implementation/handback.

## 2026-06-06 22:27 - Dev 1

Changed:
- Swapped field2 top-right event assignments:
  - `13-0`: `tadam` -> `joe-auction`;
  - `14-0`: `joe-auction` -> `tadam`.

Files:
- `src/game.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Field2 event placement only; route/path order was not changed.
- Field1, TADAM rules, Joe Auction rules, icons/tooltips logic, dice, cards, bots, phones, saves, and balance were not changed.
- Verification passed: `node --check src/game.js`; `git diff --check`.
- Static check confirmed field2 events now map `13-0` to auction and `14-0` to TADAM.

Open questions:
- Browser visual/landing smoke was not run in this environment.

## 2026-06-06 22:22 - GD

Changed:
- Added Dev task to swap the top-right field2 `ТАДАМ!` and `Аукцион Лавки Джо` cells.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Exact cells: field2 `13-0` currently `tadam`, field2 `14-0` currently `joe-auction`.
- Required result: `13-0` becomes `joe-auction`, `14-0` becomes `tadam`.
- Route/path and event rules should remain unchanged.

Open questions:
- Waiting for Dev implementation/handback.

## 2026-06-06 22:22 - Dev 1

Changed:
- Added final party summary data captured in `resolveFinalBattle()` while final-battle rolls, forces, scores, boss state, and winner are available.
- Stored structured final summary in both `state.history.finalSummary` and `state.finalBattle.finalSummary`, so the existing history/localStorage/Google Sheets snapshot path includes it.
- History now renders an `Итог партии` block after game finish with:
  - outcome and winner role;
  - winner score;
  - total players force vs boss force;
  - one compact row for every player, including the boss;
  - final score total and score parts;
  - explicit score formula like `54 = 22 монеты + 10 Лавка Джо + 18 урон боссу + 4 позиция`;
  - final-battle force/roll breakdown for challengers and boss.
- Added compact responsive styles for the final History block.
- Fixed the phone room mode allow-list so `Полный контроллер` remains selectable after the earlier default switch to `Большая кнопка`.
- Bumped host cache keys to `styles.css?v=20260606-0370` and `game.js?v=20260606-0365`.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- History/statistics/snapshot only for the active final-summary task; final battle rules, winner calculation, score formula, dice math, roll flow, cards, bots, routes, phones, and save transport were not changed.
- Structured summary keeps numeric breakdown fields and a readable `scoreFormula` string for every player.
- Verification passed: `node --check src/game.js`; `git diff --check`.
- Browser smoke could not be launched because the local `python3 -m http.server` attempt was blocked by the system Apple SDK/Xcode license prompt; the process was stopped.

Open questions:
- Real browser finish-flow smoke is still useful for the two final scenarios: boss wins, and players beat boss with point winner.

## 2026-06-06 22:17 - GD

Changed:
- Clarified final History task: when players beat the boss, the final result must spell out what each player's points came from.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Do not show only a total like `54`.
- Show readable score composition for every player, e.g. `54 = 22 монеты + 10 Лавка Джо + 18 урон боссу + 4 позиция`.
- This should be visible in the final History block and preferably stored in the structured final summary snapshot.

Open questions:
- Waiting for Dev implementation/handback.

## 2026-06-06 22:14 - GD

Changed:
- Added Dev task for a final party summary in History/statistics and saved snapshots.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Final summary should show winner, winning score, total players force vs boss force, each player's final-battle strength, and every player's final score/breakdown even if they lost.
- Capture the data from `resolveFinalBattle()` while `challengerResults`, `bossRollResults`, `scores`, `playersForce`, and `bossForce` are available.
- Keep current final battle rules and score formula unchanged.
- The same final summary should be included in saved history/localStorage/Google Sheets snapshot.

Open questions:
- Waiting for Dev implementation/handback.

## 2026-06-06 22:09 - Dev 1

Changed:
- Added dedicated bot AI scoring for ordinary opened portal choices (`pendingChoice.kind === "portal"`).
- Bot portal scoring now evaluates the portal exit and projected end cell after remaining movement, route progress gain, final-distance gain, endgame urgency, and resource-scaled landing risk.
- Best-progress/latest portal receives a strong endgame shortcut bonus when the progress gap is meaningful, but is not unconditional.
- Red/bad projected landings are softened for healthy coin reserves and harsher at low coins.
- Catastrophic closed enemy landings with very low win chance can still override shortcut value.
- Bumped host script cache key to `game.js?v=20260606-0364`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Bot AI only; portal rules, human choice UI, routes, cards, dice math, phone controllers, saves, and balance values were not changed.
- Confirmed by code path/static smoke:
  - portal pending choices now route through `chooseBotPortalDestination()`;
  - high-progress portal gets endgame progress/distance bonus;
  - high coins soften red/bad risk;
  - low coins increase red/bad caution;
  - closed enemy projection with low win chance applies a large danger penalty;
  - decline is penalized in endgame when a clearly progressive portal exists.
- Verification passed: `node --check src/game.js`; `node --check src/controller.js`; `node --check server.js`; `git diff --check`.

Open questions:
- A real gameplay repro with multiple opened portals near endgame is still useful to tune score weights if bots feel too bold or too cautious.

## 2026-06-06 22:06 - GD

Changed:
- Added Dev task to improve bot AI for ordinary opened portal choice near endgame.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Current issue: bots can choose a weaker/non-last portal even when the final stretch is close, they have enough coins, and the alternative does not offer a clear tactical benefit.
- GD contract: score portals as strategic shortcuts using projected end cell after remaining movement, progress toward finish, endgame urgency, and resource-scaled landing risk.
- Do not make the last portal unconditional; it should strongly win in endgame when progress gap is meaningful and downside is not catastrophic.
- Bot AI only; do not change portal rules, human choice UI, routes, cards, dice, phone controllers, saves, or balance values.

Open questions:
- Waiting for Dev implementation/handback.

## 2026-06-06 21:49 - Dev 1

Changed:
- Fixed `Отображать кубики` checkbox re-checking itself after the user turns it off.
- `applyPhoneRoom()` now preserves local/manual `diceVisible` state when room sync payload does not include `diceVisible`.
- Explicit `room.diceVisible === false` still wins when present.

Files:
- `src/game.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Bugfix only; no dice math, random generation, phone action payloads, rules, cards, bots, saves, routes, or balance changed.
- Root cause: missing/undefined room field was coerced to `true` during room sync, which re-checked the host checkbox when relay payloads lacked `diceVisible`.
- Verification passed: `node --check src/game.js`; `node --check src/controller.js`; `node --check server.js`; `git diff --check`.
- Browser smoke passed: fresh off; check stays on; uncheck stays off; create/recreate room after off stays `без кубиков`; no console errors.

Open questions:
- None.

## 2026-06-06 14:24 - GD

Changed:
- Added regression bug report: `Отображать кубики` checkbox re-checks itself after user turns it off.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Manual explicit `false` must persist and must not be overwritten by defaults/sync.
- Fresh default remains off.
- Bugfix only; do not change dice math, phone action payloads, rules, cards, saves, routes, or balance.

Open questions:
- Waiting for Dev 1 bugfix/handback.

## 2026-06-06 14:21 - Dev 1

Changed:
- Changed default phone room mode back to `Большая кнопка`.
- Changed `Отображать кубики` default to off/unchecked.
- Updated host/server default room mode to `big-button` and default `diceVisible` to false.
- Bumped host script cache key to `game.js?v=20260606-0363`.

Files:
- `index.html`
- `src/game.js`
- `server.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- UI/initial-defaults only; no dice math, random generation, phone action payloads, rules, cards, bots, saves, routes, or balance changed.
- `Полный контроллер` remains selectable and room creation still reads the selected mode.
- `Отображать кубики` remains manually enableable and uses the existing `diceVisible` pipeline.
- Verification passed: `node --check src/game.js`; `node --check src/controller.js`; `node --check server.js`; `git diff --check`.
- Browser smoke confirmed fresh host page defaults: mode `Большая кнопка`, `Отображать кубики` unchecked, no console errors.

Open questions:
- None.

## 2026-06-06 14:18 - GD

Changed:
- Added user request to change phone-room defaults:
  - default phone mode should be `Большая кнопка`;
  - `Отображать кубики` should be off by default.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `Полный контроллер` remains available/selectable.
- `Отображать кубики` remains available and should work when manually enabled.
- Phone controllers remain opt-in behind `Играть с телефонами`.
- UI/initial-state only; do not change dice math, phone protocol semantics, rules, cards, bots, saves, routes, or balance.

Open questions:
- Waiting for Dev 1 implementation/handback.

## 2026-06-06 13:55 - Art/UI

Changed:
- Centered the phone dice visual by replacing the inherited board `field-die-center` wrapper animation with a controller-specific animation that does not apply `translate(-50%, -50%)`.
- Matched phone dice spin/settle behavior closer to the board timing: phone dice no longer loop their rolling animation indefinitely while the board dice have already settled.
- Added display-toggle compatibility in the phone controller: if future snapshots expose `displayDice`, `showDice`, `phoneDisplayDice`, or `phoneDiceVisible` as false, the dice roll stage is skipped and the controller falls back to the normal action/wait UI.
- Bumped cache keys to `styles.css?v=20260606-0368` and `controller.js?v=20260606-0362`.

Files:
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- Board-style dice look, host-provided final values, grouped Joe Shop chips, card preview, Big Button layout, and Full Controller layout are preserved.
- No gameplay, dice math, action ids, protocol, balance, cards, saves, or phone-room rules changed.
- Verification passed: `node --check src/controller.js`; `git diff --check`.

Open questions:
- Real-phone visual check is still recommended for 390x844 and 360x760, especially with Dev 1's final `Отображать кубики` setting name.

## 2026-06-06 13:58 - Dev 1

Changed:
- Added host phone-room setting `Отображать кубики` next to `Шейк`; default is enabled.
- Threaded `diceVisible` through room creation, server serialization, host phone snapshot, and controller rendering.
- When `diceVisible` is false, phone controllers ignore `snapshot.diceRoll` and fall back to the normal action/shake UI.
- Adjusted phone dice result state so final host-provided dice faces are static immediately and do not keep spinning after result arrives.
- Kept Art/UI centering work and verified phone dice stage centers in both controller modes.
- Bumped cache keys to `styles.css?v=20260606-0369`, `game.js?v=20260606-0362`, and `controller.js?v=20260606-0363`.

Files:
- `index.html`
- `controller.html`
- `server.js`
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Settings/snapshot/UI only; dice math, random generation, bonuses, card rules, inventory state, bots, routes, saves, phone action payload semantics, and balance were not changed.
- `Шейк` and `Отображать кубики` are independent.
- Preserve grouped Joe Shop counts and card-preview behavior.
- Verification passed: `node --check src/game.js`; `node --check src/controller.js`; `node --check server.js`; `git diff --check`.
- Browser smoke passed:
  - host page has `Отображать кубики` checked by default;
  - `diceVisible:false` hides dice-stage and falls back to shake/action UI;
  - `diceVisible:true` shows dice-stage;
  - 360x760 Big Button and 390x844 Full Controller center measurements were `centerDelta: 0`;
  - result dice cubes use `animation-name: none` and show final host values.

Open questions:
- A real-phone retest is still recommended for motion feel and screenshot confirmation.
- Could not runtime-test the new server field on a fresh port because this sandbox denied binding a second local server; `server.js` syntax check passed and snapshot behavior was verified via existing server.

## 2026-06-06 13:51 - GD

Changed:
- Added phone dice follow-up from real-phone screenshot:
  - center the dice visual on phone;
  - match phone dice animation duration to board/field animation duration;
  - add phone-room setting `Отображать кубики` near `Шейк`, default enabled.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- If `Отображать кубики` is off, phone should fall back to the previous non-dice visual/wait/action state.
- Setting applies to both `Полный контроллер` and `Большая кнопка`.
- `Шейк` and `Отображать кубики` are independent settings.
- Do not change dice math, random generation, bonuses, cards, saves, action payload semantics, or balance.

Open questions:
- Waiting for Dev 1 and Art/UI handbacks.

## 2026-06-06 00:20 - Dev 1

Changed:
- Updated phone dice-roll UI to use the same 3D dice cube markup/classes as the board throw animation.
- Phone rolling state now shows board-style spinning/settling dice in both `Полный контроллер` and `Большая кнопка`; result state keeps host-provided final faces/total.
- Phone player info now shows grouped Joe Shop inventory counts in both controller modes.
- Added Joe Shop chips to `Большая кнопка` player info and count badges like `x4`, `x3`.
- Bumped phone CSS/controller cache keys to `styles.css?v=20260606-0367` and `controller.js?v=20260606-0361`.

Files:
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Display/UI only; no dice math, random generation, card rules, inventory state, bots, routes, saves, phone action payloads, or balances changed.
- Big Button Joe Shop choice labels remain handled by the existing choice model and were not expanded with card text.
- Verification passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.
- Browser smoke passed at 390x844 full-controller rolling state and 360x760 Big Button result state: 3 dice rendered as `.field-die`/`.die-cube`, final values came from snapshot, grouped shop counts showed, and no horizontal overflow was detected.

Open questions:
- Real-phone visual check is still recommended to judge whether the phone throw feels close enough to the board animation in motion.

## 2026-06-06 00:20 - Art/UI

Changed:
- Reviewed and handed back the phone polish task for dice roll visuals and Joe Shop grouped inventory.
- Phone dice roll UI now uses the same field-style 3D dice markup/classes (`die-cube`, `die-face`, `field-die` styling adapted for controller) in both `Полный контроллер` and `Большая кнопка`.
- Rolling state keeps final values hidden until host-provided results arrive; result state shows authoritative dice values and total/bonus text.
- Phone Joe Shop inventory chips show grouped identical cards with compact `xN` counters in both controller modes.

Files:
- `src/controller.js`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- No gameplay, dice math, card effects, action ids, protocol, balance, saves, or phone-room behavior changed.
- Big Button Joe Shop choice labels remain `Левая карта` / `Правая карта`; long card text is not reintroduced into those choice zones.
- Verification passed: `node --check src/controller.js`; `node --check src/game.js`; `git diff --check`.

Open questions:
- Real-phone visual check is still useful for multi-dice rolls and long Joe Shop inventories at 390x844 / 360x760.

## 2026-06-06 00:16 - GD

Changed:
- Added phone polish task:
  - phone dice roll visual should match the board/field dice animation as closely as practical;
  - phone player info should group identical Joe Shop cards/items with counts like the field/player panel.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Applies to `Полный контроллер` and `Большая кнопка`.
- Host remains authoritative for dice results; phone must not generate final random values.
- Joe Shop grouping is display-only; do not merge/remove inventory state.
- Preserve Big Button Joe Shop choice labels `Левая карта` / `Правая карта` and existing card-preview behavior.

Open questions:
- Waiting for Dev 1 and Art/UI handbacks.

## 2026-06-06 00:05 - Dev 1

Changed:
- Onboarded replacement Dev 1 from project memory and current git state.
- Reviewed the local uncommitted diff from Dev 1 / Dev 3 / Art/UI handoff without changing gameplay code.
- Smoke-checked the latest phone controller UI locally: host defaults, full-controller dice/card preview, Big Button dice/card preview, and 390x844 / 360x760 horizontal overflow.

Files:
- `project-memory/updates.md`

Notes for others:
- `main` is still even with `origin/main`; local changes remain uncommitted.
- Top inbox items for phone dice roll, default Full Controller mode, single-card phone text, full-controller primary button, and fullscreen background appear implemented locally, but the inbox still lists them as ACTIVE.
- Verification passed: `node --check src/game.js`; `node --check src/controller.js`; `node --check server.js`; `git diff --check`.
- Browser smoke passed for controller dice/card states in both `Полный контроллер` and `Большая кнопка`; no horizontal overflow at 390x844 or 360x760.

Open questions:
- Real-phone visual check is still recommended for card/dice states.
- Browser automation could not enter real fullscreen; fullscreen background still needs manual fullscreen visual check.

## 2026-06-05 23:47 - Art/UI

Changed:
- Added phone dice-roll snapshot data during host `animateDice`: rolling state, dice count, final host rolls, bonus, and total.
- Both phone modes now show a large dice-roll visual in the lower action area while dice are rolling.
- Full Controller dice visual fills the large lower action zone; Big Button dice visual uses the existing big action height.
- Rolling state shows animated neutral dice faces; result state shows only authoritative host-provided dice values.
- Bumped cache keys to `styles.css?v=20260605-0366`, `game.js?v=20260605-0361`, and `controller.js?v=20260605-0360`.

Files:
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- Phone does not generate random dice values; rolling placeholders are neutral and final values come from host `rolls`.
- Rules, dice math, action ids, payloads, protocol, cards, bots, saves, routes, phone-room behavior, and balance were not changed.
- Shake-to-roll UI remains separate and unchanged.
- Verification passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.

Open questions:
- Needs real-phone visual check in both `Полный контроллер` and `Большая кнопка` during a roll at ~390x844 and 360x760.

## 2026-06-05 23:47 - Dev 3

Changed:
- Added host-authoritative dice-roll snapshots for phone controllers: rolling state sends dice count without revealing faces, result state sends final host dice values/total.
- Phone controller now shows a large dice-roll stage in both `Полный контроллер` and `Большая кнопка`, including multiple dice and final results when available.
- Updated controller dice visual to animate the exact dice count during rolling and stagger multiple dice cleanly.
- Bumped JS/CSS cache keys for host and controller pages.

Files:
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- Display/snapshot/UI only; dice math, random generation, shake action triggering, cards, routes, bots, saves, phone actions, and balances unchanged.
- Verification passed:
  - `node --check src/game.js`;
  - `node --check src/controller.js`;
  - `git diff --check`.
- In-app browser mock snapshot smoke was attempted, but this browser's read-only evaluation sandbox cannot construct/dispatch the custom smoke event (`CustomEvent`/`document.createEvent` unavailable). Ready for real-phone retest.

Open questions:
- None.

## 2026-06-05 23:44 - Dev 1

Changed:
- Renamed the main implementation role from `Dev` to `Dev 1` in current project-memory role docs.
- Updated onboarding/read-news/next-chat prompts so successor prompts preserve the official `Dev 1` role name.
- Left historical `updates.md` entries unchanged; they keep their original author names.

Files:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/prompts/read-news.md`
- `project-memory/prompts/next-chat.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `project-memory/inbox/for-dev.md` remains the shared inbox for `Dev 1`, `Dev 2`, and `Dev 3`.

Open questions:
- None.

## 2026-06-05 23:40 - GD

Changed:
- Added phone feature task: show dice/dice-roll visual on the phone while the host is rolling.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Applies to `Полный контроллер` and `Большая кнопка`.
- Host remains authoritative; the phone must not generate random dice results itself.
- If final dice faces/values are available in snapshot, show them; otherwise show rolling animation and do not invent values.
- Preserve shake-to-roll behavior and current dice math/balance.

Open questions:
- Waiting for Dev 3 and Art/UI handbacks.

## 2026-06-05 23:38 - Dev 3

Changed:
- Returned default phone room mode to `Полный контроллер` in the host `Телефоны` selector.
- Kept `Большая кнопка` available/selectable.

Files:
- `index.html`
- `project-memory/updates.md`

Notes for others:
- UI/initial state only; phone protocol, controller rendering, actions, rules, dice, cards, bots, saves, routes, and balance unchanged.
- Verification passed:
  - `node --check src/game.js`;
  - `node --check src/controller.js`;
  - `git diff --check`;
  - static assertion confirmed HTML default is `full`, `big-button` remains available, JS default is `full`, and room creation still reads the selector value.

Open questions:
- None.

## 2026-06-05 23:37 - GD

Changed:
- Added user request to make phone room mode default back to `Полный контроллер`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `Большая кнопка` remains available/selectable.
- Phone controllers remain opt-in behind `Играть с телефонами`.
- UI/initial state only; do not change phone protocol, actions, rules, cards, dice, bots, saves, routes, or balance.

Open questions:
- Waiting for Dev 3 implementation/handback.

## 2026-06-05 23:26 - Dev 3

Changed:
- Reviewed and reconciled the phone single-card preview work from Art/UI.
- Kept one snapshot/UI contract: `snapshot.cardPreview`.
- Added safer player-facing card text fallback in `cardDisplayText`: `description`, `text`, `effectText`, `body`, then title.
- Confirmed Good/Bad/TADAM and single Joe Shop reveal flows publish card preview state; multi-card shop choices remain choice-only.
- Bumped host game JS cache key to `20260605-0360`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Display/snapshot only; no card rules, deck contents, draw/effect timing, dice, bots, routes, saves, phone action payloads, or balance changed.
- Big Button Joe Shop multi-choice labels remain `Левая карта` / `Правая карта`.
- Verification passed:
  - `node --check src/game.js`;
  - `node --check src/controller.js`;
  - `git diff --check`;
  - static assertion confirmed Good/Bad/TADAM/single-Shop preview wiring, controller render hook, card CSS, cache key, and preserved Big Button shop labels.

Open questions:
- Real-phone smoke still recommended for Good, Bad, TADAM, and single Joe Shop reveal in both controller modes.

## 2026-06-05 23:24 - Art/UI

Changed:
- Added phone card preview data for single-card reveal moments: Good, Bad, TADAM, and single Joe Shop reveal.
- Both phone modes now render the current single card as a readable card-like panel in the player info area.
- Closed card state shows only the deck/type and prompt to open; revealed state shows the card title and effect text.
- Added compact responsive card-preview styling with deck accent colors, clean wrapping, and internal scroll for long text.
- Bumped host/controller stylesheet cache key to `20260605-0365`, host script cache key to `20260605-0359`, and controller script cache key to `20260605-0359`.

Files:
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- Display-only; card rules/effects/deck content/action ids/payloads/protocol/dice/balance were not changed.
- Big Button Joe Shop multi-choice zones still use only `Левая карта` / `Правая карта`; multi-card shop choices were not re-expanded with long text.
- Verification passed: `node --check src/game.js`; `node --check src/controller.js`; `git diff --check`.

Open questions:
- Needs real-phone visual check at ~390x844 and 360x760 for Good/Bad/TADAM/single Shop reveal text.

## 2026-06-05 23:19 - GD

Changed:
- Added phone feature task: in all phone modes, when a player receives/is shown one concrete card, the phone should display that card's player-facing text.
- Added UI requirement: card text must be neatly fitted and readable on phone.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Applies to `Полный контроллер` and `Большая кнопка`.
- Preserve Joe Shop multi-card choice behavior in Big Button: choices still show only `Левая карта` / `Правая карта`.
- For Good cards, use `title` for name and `description` for face/body text.
- Display only; do not change card rules, deck contents, draw/effect timing, dice, bots, saves, phone flow, or balance.

Open questions:
- Waiting for Dev 3 and Art/UI handbacks.

## 2026-06-05 23:08 - Art/UI

Changed:
- In phone mode `Полный контроллер`, a single primary action now gets a large bottom-anchored treatment.
- `Бросить` and `Далее`/continue-style single actions fill the lower action area while player stats/cards remain above.
- Multi-choice states stay on regular full-controller buttons, so shop/rest/choice layouts are not blindly enlarged.
- Bumped host/controller stylesheet cache key to `20260605-0364` and controller script cache key to `20260605-0358`.

Files:
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- UI/rendering only; action ids, payloads, protocol, rules, dice, cards, bots, routes, saves, phone-room behavior, and balance were not changed.
- `Большая кнопка` split/rest/Joe Shop layouts were not touched.
- Verification passed: `node --check src/controller.js`; `git diff --check`.

Open questions:
- Needs quick phone check in `Полный контроллер` for `Бросить` and `Далее` states.

## 2026-06-05 23:05 - GD

Changed:
- Added UI task for phone mode `Полный контроллер`: make the primary roll/continue button large and bottom-anchored so it fills the empty lower space, similar to `Большая кнопка`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a full-controller layout improvement, not a gameplay change.
- Keep stats/cards visible above the button.
- Do not regress `Большая кнопка`, Joe Shop labels, or Rest layout.

Open questions:
- Waiting for Art/UI implementation/handback.

## 2026-06-05 12:59 - Art/UI

Changed:
- Added the normal decorative game background to the fullscreen `.app-shell` so fullscreen/big-screen mode is not plain black behind panels.
- Added fullscreen overlay texture on `.app-shell::before`, with a tabletop-specific variant matching the dark tabletop background.
- Preserved fullscreen layout decisions: `Хроника`/`История` remain hidden via existing rules, settings/top controls remain untouched.
- Bumped host/controller stylesheet cache key to `20260605-0363`.

Files:
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- CSS/layout only; gameplay, board logic, dice, cards, bots, saves, phone protocol, and balance were not changed.
- Root cause: fullscreen targets `.app-shell`, which was transparent, so browser fullscreen showed a black backdrop instead of the normal body background.
- `git diff --check` passed.

Open questions:
- In-app automation could not enter real fullscreen from the local page, so needs a quick manual fullscreen visual check.

## 2026-06-05 12:53 - GD

Changed:
- Added fullscreen/big-screen visual fix: background behind panels should match the normal game background instead of becoming plain black.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- CSS/layout only.
- Preserve existing fullscreen decisions: `Настройки` visible, `Хроника`/`История` hidden, top controls usable.
- Do not change gameplay, board logic, dice, cards, saves, phone protocol, or balance.

Open questions:
- Waiting for Art/UI implementation/handback.

## 2026-06-05 01:07 - Art/UI

Changed:
- Fixed Big Button split choices without a cancel button so they occupy the full large action area instead of the old compact `auto` row.
- Choices like `Заплатить` / `Не платить` should now render as two tall halves of the big button area.
- Kept split choices with a cancel button as `cancel` row plus tall lower choice area.
- Bumped host/controller stylesheet cache key to `20260605-0362`.

Files:
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- CSS/layout only; action ids, payloads, controller protocol, rules, prices, dice, cards, bots, and balances were not changed.
- Root cause was `controller-big-choice-stage` using `auto minmax(0, 1fr)` even when no cancel button existed.
- `git diff --check` passed.

Open questions:
- Needs real-phone refresh/check for the pay/not-pay pre-roll choice.

## 2026-06-05 01:00 - Art/UI

Changed:
- Made Big Button split choices use the same action height as the single big action button.
- Two-option choices now fill the lower Big Button action area as two tall halves instead of compact cards.
- Bumped host/controller stylesheet cache key to `20260605-0361`.

Files:
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- CSS/layout only; action ids, payloads, controller protocol, rules, prices, dice, cards, bots, and balances were not changed.
- Intended for choices like `Заплатить` / `Не платить` in phone controller mode `Большая кнопка`.
- `git diff --check` passed.

Open questions:
- Needs quick real-phone/browser check that the two halves now visually match the large single button height.

## 2026-06-05 00:48 - Art/UI

Changed:
- Matched the fullscreen icon button's visual height to neighboring top controls.
- `.fullscreen-toggle` now uses the normal button min-height (`40px`) instead of the previous smaller `34px`.
- Enlarged the fullscreen SVG inside the button from `1.45rem` to `1.78rem`.
- Host/controller stylesheet cache key is `20260605-0360`.

Files:
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- CSS/layout only; fullscreen behavior and JS were not changed.
- Dev 3's mobile rule hiding fullscreen was preserved; this pass targets desktop/tablet top controls.
- `git diff --check` passed.

Open questions:
- Needs quick browser visual check that `Настройки`, fullscreen icon, and `Новая игра` now look equal in size.

## 2026-06-05 00:46 - Dev 3

Changed:
- Hid the fullscreen / `На весь экран` control on mobile widths.
- Reformatted the mobile top controls block to 5 visible columns: 3 compact setup selects, `Настр.`, and `Новая игра`.
- Tightened mobile select/button sizing so the row fits visually at ~390px without text overflow.
- Bumped host/controller stylesheet cache key to `20260605-0360`.

Files:
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- CSS/layout only; fullscreen behavior, settings behavior, rules, dice, cards, bots, routes, saves, phone controller protocol, balances, and history/chronicle data collection unchanged.
- Verification passed:
  - `git diff --check`;
  - static assertion confirmed mobile fullscreen hiding rule and cache keys;
  - browser DOM check at 390x844 confirmed 5 visible controls, fullscreen button hidden, and no visible control text overflow.

Open questions:
- None.

## 2026-06-05 00:45 - Art/UI

Changed:
- Added a standalone SVG gear icon for future `Настройки` button use.
- Icon is not connected anywhere yet, per user request.

Files:
- `assets/icons/settings_gear.svg`
- `project-memory/updates.md`

Notes for others:
- Asset is vector, 512x512 viewBox, golden fantasy-board UI style matching the fullscreen icon direction.
- `git diff --check` passed.

Open questions:
- Waiting for approval/request before applying it to the actual settings button.

## 2026-06-05 00:40 - Art/UI

Changed:
- Matched the icon-only fullscreen button size to the neighboring `Настройки` and `Новая игра` buttons in the top controls row.
- The last three controls now use equal grid columns.
- Kept the fullscreen icon centered and preserved the icon-only button behavior.
- Bumped/kept host and controller stylesheet cache key at `20260605-0359`.

Files:
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- CSS/layout only; fullscreen behavior and JS were not changed in this pass.
- `git diff --check` passed.

Open questions:
- Needs quick browser visual smoke to confirm the three buttons read as equal width.

## 2026-06-05 00:39 - Dev 3

Changed:
- Returned `Настройки` in fullscreen / big-screen mode.
- Removed `#settingsPanel` from the fullscreen hide rule.
- Kept `Хроника` and `История` collapsed in fullscreen via `.log-panel`, `.history-panel`, and `.lower-grid`.
- Synced controller stylesheet cache key to `20260605-0359`.

Files:
- `styles.css`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- UI/layout only; no settings behavior, rules, dice, cards, bots, routes, saves, phone controller protocol, balances, or history/chronicle data collection changed.
- Verification passed:
  - `git diff --check`;
  - static assertion confirmed settings are no longer hidden by fullscreen CSS, while chronicle/history remain hidden and CSS cache keys are current.

Open questions:
- Manual fullscreen smoke still recommended: enter fullscreen, open/use `Настройки`, confirm `Хроника`/`История` are hidden, exit with `Esc`.

## 2026-06-05 00:38 - GD

Changed:
- Added user correction for fullscreen/big-screen layout: return `Настройки` in fullscreen mode.
- New fullscreen layout should keep `Настройки` visible/usable while `Хроника` and `История` remain hidden.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a follow-up to Dev 3's fullscreen panel-hiding task.
- UI/layout only; do not change settings behavior, rules, saves, phones, balance, or history/chronicle data collection.

Open questions:
- Waiting for Dev 3 follow-up/handback.

## 2026-06-05 00:37 - Art/UI

Changed:
- Added a new SVG fullscreen icon for the top `На весь экран` control.
- Replaced visible fullscreen button text with the icon while preserving `title`, `aria-label`, and `aria-pressed`.
- Updated fullscreen sync logic so it no longer overwrites the icon with text when entering/exiting fullscreen.
- Added compact icon-button styling and active-state highlight.
- Bumped controller stylesheet cache key to `20260605-0358`; host CSS/JS keys already use `20260605-0358`.

Files:
- `assets/icons/fullscreen_button.svg`
- `index.html`
- `controller.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI/icon-only change; fullscreen behavior remains the same.
- Checks passed: `node --check src/game.js`, `git diff --check`.

Open questions:
- Needs browser visual smoke to confirm the icon reads well in the top controls row.

## 2026-06-05 00:36 - Dev 3

Changed:
- Added fullscreen/big-screen layout state on `body` via `is-game-fullscreen`.
- While browser fullscreen is active, the expanded `Настройки` panel, `Хроника`, and `История` are visually hidden/collapsed.
- The top controls strip, including `На весь экран`, stays visible and usable.
- Exiting fullscreen via `Esc` / `fullscreenchange` removes the layout state and restores the normal panels.
- Bumped host CSS/JS cache keys to `20260605-0358`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI/layout only; no rules, dice, board routes, cards, bots, saves, phone controller protocol, balances, or history/chronicle data collection changed.
- Verification passed:
  - `node --check src/game.js`;
  - `git diff --check`;
  - static assertion confirmed fullscreen body state, panel hiding CSS, `fullscreenchange` wiring, and cache keys.
- Browser automation click did not enter real fullscreen in this environment (`document.fullscreenElement` stayed false), so manual click/Esc smoke is still recommended.

Open questions:
- None.

## 2026-06-05 00:34 - Art/UI

Changed:
- Added a dedicated detailed Big Button layout for Joe Shop cards owned by other players.
- In phone controller mode `Большая кнопка`, `Купить карту Лавка Джо у игрока` now shows:
  - the choice title/summary from the host popup;
  - full text of every available Joe Shop card;
  - the owning player's name, token, and color badge;
  - a separate `Отказаться` action.
- Kept the simpler no-look behavior for ordinary two-card Joe Shop choices: those still show only `Левая карта` / `Правая карта`.
- Detail-list choices use an internal scroll area so more cards can fit on phone screens.
- Bumped host/controller CSS, host game JS, and controller JS cache keys to `20260605-0357`.

Files:
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- Display/routing metadata only; selected card ids and phone action payloads are unchanged.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.

Open questions:
- Needs real-phone visual smoke on the `Купить карту Лавка Джо у игрока` prompt, especially with 3+ available cards.

## 2026-06-05 00:33 - GD

Changed:
- Added fullscreen/big-screen layout task:
  - hide `Настройки`, `Хроника`, and `История` blocks while browser fullscreen is active;
  - restore them after exiting fullscreen via `Esc` or fullscreen state change.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is layout-only; do not delete data or stop chronicle/history recording.
- `На весь экран` and `Большой экран` refer to the same fullscreen state.
- Normal non-fullscreen layout should remain unchanged.

Open questions:
- Waiting for Dev 3 implementation/handback.

## 2026-06-05 00:28 - Dev 3

Changed:
- Kept the top game controls block on one row after the fullscreen button was added.
- Updated `.season-controls` to a 6-column layout with compact select columns and wider button columns.
- Prevented top-control button text wrapping and reduced only that block's button font size enough to avoid overflow.
- Bumped CSS cache key to `20260605-0357`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI layout only; no game rules, dice, cards, bots, routes, saves, phone controller protocol, or balances changed.
- Verification passed:
  - browser DOM check on `localhost:5173` confirmed `Настройки`, `На весь экран`, and `Новая игра` are on one line with no button text overflow;
  - `git diff --check`.

Open questions:
- None.

## 2026-06-05 00:25 - Dev 3

Changed:
- Added `На весь экран` button to the top game controls block near `Настройки` / `Новая игра`.
- Button uses the browser Fullscreen API to enter fullscreen.
- `fullscreenchange` / `webkitfullscreenchange` sync button label/state after entering or exiting fullscreen, including normal `Esc` exit.
- Active button state changes text to `Выйти из экрана`, sets title, and updates `aria-pressed`.
- Fullscreen API unavailable/denied paths fail gracefully with a toast log and no game breakage.
- Bumped host game script cache key to `20260605-0355`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- UI/runtime only; no game rules, board layout logic, dice math, cards, bots, routes, saves, phone controller protocol, or balances changed.
- Verification passed:
  - `node --check src/game.js`;
  - `git diff --check`;
  - static assertion confirmed button markup, label, Fullscreen API wiring, `fullscreenchange` sync, and cache key.
- In-app browser smoke was not completed because the Browser plugin runtime path changed in this session; real click/Esc should be checked manually or by Dev 2 QA.

Open questions:
- Ready for QA/browser smoke: click `На весь экран`, press `Esc`, verify label returns.

## 2026-06-05 00:24 - Art/UI

Changed:
- Slightly reduced the unified phone `Большая кнопка` action block so the full player panel should fit above mobile browser chrome.
- Kept one shared size source for all primary/idle Big Button states, avoiding the previous "sometimes small, sometimes large" behavior.
- New Big Button action height:
  - base: `clamp(380px, 64dvh, 660px)`;
  - narrow phones: `clamp(360px, 62dvh, 560px)`.
- Bumped host/controller stylesheet cache key to `20260605-0356`.

Files:
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- CSS/layout only; no JS, action ids, payloads, rules, or balance changed.
- `git diff --check` passed.
- Dev 3's fullscreen JS/cache-key changes were preserved.

Open questions:
- Needs real-phone visual confirmation that the panel now fully fits on the shown Safari viewport.

## 2026-06-05 00:20 - GD

Changed:
- Added Dev task for fullscreen mode:
  - add `На весь экран` button to the top game controls block;
  - clicking it should enter browser fullscreen;
  - pressing `Esc` exits fullscreen normally;
  - user may call this mode `На весь экран` or `Большой экран`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is UI/runtime only.
- Reuse existing top-control button styling.
- Do not change rules, dice, cards, bots, routes, saves, phone controller protocol, or balances.

Open questions:
- Waiting for Dev implementation/handback.

## 2026-06-05 00:15 - Art/UI

Changed:
- Fixed Joe Shop card choice display in phone controller mode `Большая кнопка`.
- Big Button split zones now hide Joe Shop card effect text and notes for shop-like choices, showing only `Левая карта` / `Правая карта`.
- Added `displayKind: "shop-card"` to Joe Shop prompt-choice snapshots so action-prompt shop choices are recognized even when their action kind stays `prompt-choice`.
- Removed the `Лево` / `Право` badge for shop-like Big Button zones so the visible card choice text is only the requested left/right card label.
- Bumped host game JS cache key to `20260605-0354` and controller JS cache key to `20260605-0354`.

Files:
- `src/game.js`
- `src/controller.js`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- Display-only change: phone still sends the same action id/kind, so selected cards and payload routing are unchanged.
- Covered both direct `shop` actions and Joe Shop action-prompt choices such as `выбрать карту` / `купить карту`.
- Checks passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.

Open questions:
- Needs real-phone smoke on the shown Joe Shop purchase screen to confirm only `Левая карта` / `Правая карта` are visible.

## 2026-06-05 00:11 - Art/UI

Changed:
- Fixed phone `Большая кнопка` primary/idle size inconsistency from user screenshots.
- Big Button mode now uses one shared `--controller-big-action-height` for the lower action area, the big shake stage, and the primary/idle button itself.
- `Ждите хода`, `Ждите решения`, `Далее`, and `Бросить` should now stay equally large instead of sometimes rendering as a shorter card.
- Bumped host/controller stylesheet cache key to `20260605-0353`.

Files:
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- CSS/layout only; no controller JS, action ids, payloads, protocol, rules, or balance changed.
- `git diff --check` passed.

Open questions:
- Needs real-phone visual confirmation that all primary/idle states now keep the same large height.

## 2026-06-05 00:03 - Art/UI

Changed:
- Increased single primary `Большая кнопка` height for actions like `Далее` / `Бросить` so the button remains bottom-anchored and reaches upward toward the visual middle of the phone controller panel.
- Preserved previous split-zone and Rest lower-half layout improvements.
- Bumped host/controller stylesheet cache key to `20260604-0352`.

Files:
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- CSS/layout only; no controller logic, action ids, payloads, protocol, rules, or balance changed.
- `git diff --check` passed.
- `src/controller.js` was not touched in this pass, so no JS syntax check was needed.

Open questions:
- Needs real-phone visual confirmation for `Далее` / `Бросить` at 390x844.

## 2026-06-05 00:02 - GD

Changed:
- Clarified Big Button layout again from user screenshot: single primary action buttons like `Далее` / `Бросить` should be slightly larger and reach up to about the middle of the controller panel/screen while remaining bottom-anchored.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Previous Art/UI pass improved bottom anchoring, but the latest screenshot shows the primary action button still too short.
- Apply this to primary Big Button action, not only split/two-option zones.
- Keep text fitting and no gameplay/protocol changes.

Open questions:
- Waiting for Art/UI follow-up.

## 2026-06-05 00:00 - Art/UI

Changed:
- Refined phone `Большая кнопка` layout per user clarification: action zones are anchored at the bottom and stretch upward toward the visual middle of the controller panel.
- Two-option split choices now use a tall lower-half stage instead of compact cards floating too high.
- Rest three-choice Big Button stage now shares the lower-half/tall-button behavior once those actions are exposed by controller logic.
- Primary big action keeps the same large lower action treatment.
- Bumped host/controller stylesheet cache key to `20260604-0351`.

Files:
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- CSS/layout only; no action ids, payloads, protocol, server behavior, rules, prices, dice math, cards, bots, routes, or balances changed.
- Joe Shop display labels remain controlled by existing controller logic: `Левая карта` / `Правая карта`.
- Checks passed: `node --check src/controller.js`, `git diff --check`.
- Browser/mobile screenshots were not captured in this environment; real-phone 390x844 and 360x760 smoke is still recommended.

Open questions:
- Waiting for real-phone visual confirmation that the bottom edge/top edge feel matches the user's screenshot target.

## 2026-06-04 23:52 - GD

Changed:
- Clarified Big Button layout requirement from user screenshot: action buttons/zones should sit at the bottom of the phone screen/controller panel and stretch upward from the bottom to about the middle of the screen.
- For two-option split choices, avoid compact cards floating in the upper half; make tall bottom-anchored left/right zones.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This refines the active Big Button bottom-zone UI task.
- Keep text fitting requirements and Joe Shop `Левая карта` / `Правая карта` behavior.

Open questions:
- Waiting for Art/UI implementation/handback.

## 2026-06-04 23:51 - Dev 3

Changed:
- Fixed pre-roll optional extra-die prompt chain.
- Pressing `Не платить` now declines the remaining pre-roll extra-die opportunity window for that roll and starts the normal roll flow instead of prompting through additional eligible Joe Shop extra-die cards.
- `Заплатить` still applies the selected extra-die card normally and preserves the existing accepted-card flow.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- This is a shared flow fix for host UI, full phone controller, and phone `Большая кнопка`, because all paths use `resolvePreRollChoice(false)`.
- No price, dice math, random result, inventory rules, bots, routes, balances, or unrelated Joe Shop effects changed.
- Verification passed: `node --check src/game.js`, `node --check src/controller.js`, `git diff --check`.

Open questions:
- Ready for QA/real-phone retest with a player holding multiple eligible `+1 кубик за 5` cards.

## 2026-06-04 23:50 - GD

Changed:
- Added flow-fix task: in the pre-roll extra-die flow, pressing `Не платить` once should skip all remaining eligible Joe Shop pre-roll prompts and start the roll immediately.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Design meaning: `Не платить` means the player declines buying/using an extra die for this roll, not just declining one specific card prompt.
- Applies to host UI, full phone controller, and phone `Большая кнопка`.
- Do not change price, dice math, card inventory rules, roll randomness, bots, routes, or balances.

Open questions:
- Waiting for Dev 3 implementation/handback.

## 2026-06-04 13:12 - Dev 3

Changed:
- Phone room mode now defaults to `Большая кнопка` in the host `Телефоны` selector.
- `Полный контроллер` remains available/selectable.
- Added special Big Button support for `Привал` / Rest choices:
  - three large stacked buttons: `Восстановиться`, `Потренироваться`, `Ускориться`;
  - each button sends the original `card-choice` action object/id (`recover`, `train`, `speed`);
  - buttons are bottom-aligned within the Big Button action area and use compact labels.
- Preserved Joe Shop Big Button labels: `Левая карта` / `Правая карта`.
- Bumped controller script cache key to `20260604-0349`.

Files:
- `index.html`
- `controller.html`
- `src/controller.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- No rules, dice math, cards, bots, routes, balances, server relay contract, full-controller behavior, or classic/no-phone play changed.
- Current Rest recover reward in code is still `+10 монет`; Dev 3 did not change it to `+15` because the task explicitly said not to silently change balance.
- Verification passed:
  - `node --check src/controller.js`;
  - `node --check src/game.js`;
  - `node --check server.js`;
  - `git diff --check`;
  - static assertion confirmed Big Button is default, Full controller option remains, Rest labels exist, and Joe Shop labels remain.

Open questions:
- GD should confirm whether Rest recover reward should later change from current `+10 монет` to intended `+15 монет`.

## 2026-06-04 23:49 - Art/UI

Changed:
- Polished the host/big-screen `Привал` choice UI so the three options have a cleaner button layout: title first, reward chip below.
- Added text-fitting guards for `Привал` choices to avoid awkward word splits like `Потр / енир / овать / ся` and clipped labels.
- Continued `Большая кнопка` visual/layout polish:
  - main action area remains bottom-anchored for thumb reach;
  - split choice labels keep responsive sizing and no single-letter/orphan wrapping;
  - added CSS support for future three-zone Big Button choices so `Привал` can stack cleanly once Dev 3 wires the functional actions.
- Bumped host/controller stylesheet cache key to `20260604-0350`.

Files:
- `styles.css`
- `index.html`
- `controller.html`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Visual/layout only in this pass; no rules, action ids, payloads, controller protocol, prices, dice math, cards, bots, routes, or balances changed.
- Joe Shop Big Button wording remains owned by existing controller logic: `Левая карта` / `Правая карта`.
- Checks passed: `node --check src/controller.js`, `git diff --check`.
- Browser/mobile screenshots were not captured in this environment because the available browser automation remains blocked; real-phone 360-430px smoke is still recommended.

Open questions:
- Waiting for Dev 3 functional support for three Rest choices in `Большая кнопка` and default phone mode changes.

## 2026-06-04 13:07 - GD

Changed:
- Added user request for `Привал` UX and phone flow:
  - clean host/big-screen Rest prompt UI with neatly fitting text;
  - Rest choices selectable from phone mode `Большая кнопка`;
  - `Большая кнопка` should be the default phone room mode, while full controller remains available.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Rest design intent remains: stepped-on player chooses one of three outcomes: recover coins, permanent strength, permanent speed.
- Phone Big Button may need a special three-option layout for Rest, since left/right alone cannot represent all three choices.
- Coordinate with active Art/UI task for bottom-anchored Big Button actions and text fitting.
- Keep phone mode opt-in; classic/no-phone game must remain unchanged.

Open questions:
- Waiting for Dev 3 and Art/UI handbacks.

## 2026-06-04 13:03 - GD

Changed:
- Added UI/layout fix task from user screenshot: in `Большая кнопка`, all main action buttons/zones should be anchored in the lower part of the phone screen/controller panel for easier tapping.
- Added text-fitting requirement for all Big Button buttons/zones: no overflow, no clipped text, no awkward single-letter/orphan wrapping.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is UI/layout only.
- Keep existing action ids/payloads, protocol, server behavior, rules, prices, dice math, cards, bots, routes, and balances unchanged.
- Do not regress Joe Shop wording: shop split zones still show only `Левая карта` / `Правая карта`.

Open questions:
- Waiting for Art/UI implementation/handback; Dev 3 can assist only if behavior contract needs adjustment.

## 2026-06-04 13:00 - Dev 3

Changed:
- Superseded the previous `Карта 1` / `Карта 2` Big Button Joe Shop labels.
- In `Большая кнопка`, Joe Shop left/right zones now show only `Левая карта` and `Правая карта`.
- Joe Shop zone supporting text is hidden, so card effect/description text and price notes do not appear inside the large zones.
- Underlying original shop action objects are still used for taps; only display label/note is changed.
- Bumped controller script cache key to `20260604-0348`.

Files:
- `controller.html`
- `src/controller.js`
- `project-memory/updates.md`

Notes for others:
- Full controller mode, host shop UI, reveal logic, prices, rules, bots, dice, routes, and balances are unchanged.
- Non-shop binary choices still use real labels/notes.
- Verification passed:
  - `node --check src/controller.js`;
  - `git diff --check`;
  - static assertion confirmed `Левая карта` / `Правая карта`, blank shop note, and original `sendControllerAction(action, player)` use.
- Browser smoke was not rerun because the previous `/private/tmp` smoke script had been cleaned up and approval policy is currently `never`; no escalated browser launch is available in this turn.

Open questions:
- Ready for QA/real-phone retest.

## 2026-06-04 12:58 - GD

Changed:
- Clarified user correction for Big Button Joe Shop labels: phone left/right zones should show only `Левая карта` and `Правая карта`.
- Card effect/description text should not appear in the Big Button zones.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This supersedes the earlier `Карта 1` / `Карта 2` wording.
- Keep original shop actions/payloads unchanged; only the phone Big Button display text changes.
- Full controller, host shop UI, reveal logic, rules, prices, bots, dice, and balances stay unchanged.

Open questions:
- Waiting for Dev 3 follow-up patch/handback.

## 2026-06-04 12:55 - Dev 3

Changed:
- In `Большая кнопка`, Joe Shop split-zone options now display main labels as `Карта 1` and `Карта 2`.
- This is display-only for phone Big Button left/right zones; underlying shop action ids/payloads are unchanged.
- Non-shop binary choices keep their original labels.
- Bumped controller script cache key to `20260604-0347`.

Files:
- `controller.html`
- `src/controller.js`
- `project-memory/updates.md`

Notes for others:
- No full-controller UI, host shop UI, reveal logic, prices, rules, bots, dice, routes, or balances changed.
- Verification passed:
  - `node --check src/controller.js`;
  - `git diff --check`;
  - room/snapshot smoke shows shop zones as `Карта 1` / `Карта 2`, while non-shop binary remains `Заплатить` / `Не платить`.

Open questions:
- Ready for QA/real-phone retest.

## 2026-06-04 12:52 - GD

Changed:
- Added a small Dev task from user request: in `Большая кнопка`, Joe Shop two-card choices should display main labels as `Карта 1` and `Карта 2`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is display text only for phone Big Button left/right zones.
- Underlying Joe Shop actions/payloads, full controller mode, host shop UI, card rules, prices, bots, dice, and balances should stay unchanged.

Open questions:
- Waiting for Dev 3 implementation/handback.

## 2026-06-04 12:45 - Dev 3

Changed:
- Extended `Большая кнопка` controller behavior with large left/right choice zones for safe two-option prompts.
- Two-option choices now work for binary prompts such as pre-roll extra die yes/no and simple two-option shop/card/prompt actions.
- Prompts with exactly two meaningful options plus a cancel/skip/decline action now show cancel as a smaller top button and keep the two meaningful choices as large left/right zones.
- Prompts with more than two meaningful non-cancel options still fall back to `Выбор на большом экране`.
- Fixed cancel detection bug where substring `нет` matched inside `монет`, causing shop actions to be misclassified.
- Removed production `window.__vbaControllerDebug` motion hook.
- Improved shake fallback/diagnostics:
  - shake threshold reduced from 18 to 14;
  - rotationRate now contributes to shake amount;
  - UI warns that shake may require HTTPS/secure context on LAN `http://...` while keeping the normal button fallback.
- Bumped controller script cache key to `20260604-0346`.

Files:
- `controller.html`
- `src/controller.js`
- `styles.css`
- `project-memory/updates.md`
- `outputs/phone-big-choice-zones.png`

Notes for others:
- No gameplay rules, dice math, cards, bots, routes, balances, or classic/non-phone play changed.
- Art/UI tone classes for Big Button were preserved; Dev 3 only added behavior zones and supporting CSS.
- Browser smoke via real room/snapshot API passed:
  - binary pre-roll style actions render 2 large zones;
  - shop-style 2 options + `Отказаться` renders cancel top button + 2 large zones;
  - 3 meaningful shop options render fallback `Выбор на большом экране`;
  - mobile 390px overflow false.
- Checks pass: `node --check src/controller.js`, `node --check src/game.js`, `node --check server.js`, `git diff --check`.
- Shake real-device limitation: current LAN URL is `http://192.168.31.41:5173/...`; per current DeviceMotion API docs, `devicemotion`/permission can require a secure context, so Safari/Chrome may block motion sensors on plain LAN HTTP. Button fallback remains available. Real-phone retest should verify whether target devices emit motion on LAN HTTP; if not, next technical step is HTTPS/local cert or another trusted-origin strategy.

Open questions:
- Ready for Dev 2 combined QA and real-phone retest, especially shake behavior on iPhone/Safari and Android/Chrome.

## 2026-06-04 12:44 - Dev 2

Changed:
- Ran final combined QA/regression pass for the current mobile-controller batch.
- No gameplay/protocol/UI code changes were made.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- PASS, with environment limits: no blocking regression found in current files.
- Real browser smoke completed for host-created `Большая кнопка + Шейк` room at 360px: controller claimed player, `Телефон игрока` was hidden in Big Button mode, roll button rendered as `is-roll` with no measured overflow, shake hint was visible, and tapping `Бросить` produced `Действие отправлено. Ждем большой экран.`
- Host UI smoke confirmed phone room creation status `Большая кнопка, шейк`; CSS order has TADAM before settings (`tadam-card` order 1, `game-settings` order 2).
- Static/model QA confirmed Big Button action modeling: single `Бросить`/`Далее` => primary, two safe choices => left/right split, two meaningful choices + cancel/decline => split with upper cancel, 3 meaningful options => host fallback.
- Static QA confirmed wrong-player remains server-rejected (`403 wrong-player` path unchanged), shake safe-roll guard uses `id=roll`, roll kind, and Cyrillic-safe `startsWith("бросить")`, with HTTPS/secure-context fallback copy.
- Checks passed: `node --check src/controller.js`, `node --check src/game.js`, `node --check server.js`, `git diff --check`.
- Could not complete the full synthetic browser matrix for split/cancel/fallback because shell access to the existing `5173` process became intermittently unable to connect after POST, the sandbox blocks starting a second local server, and the in-app browser evaluate bridge lacks `fetch`/XHR constructors. The in-app browser itself can load the host/controller pages.

Open questions:
- Real-phone retest remains recommended for iPhone/Safari motion permission and Android/Chrome shake sensitivity on LAN/HTTPS context.

## 2026-06-04 12:40 - Art/UI

Changed:
- Finished Art/UI part of the mobile controllers batch from GD.
- Big Button now has visual tone classes: roll actions get an energetic orange/magic dice style, non-roll actions get a calmer green action style, and idle/waiting states are muted.
- Removed `Телефон игрока` from the visible controller header while in `Большая кнопка` mode.
- Reduced Big Button label sizing and removed letter-level wrapping from Big Button, cancel, split-choice, and normal controller action labels so words like `Применить` do not orphan a final letter.
- Swapped host side-panel visual order so TADAM cards appear before Settings; mobile keeps the same sane order.
- Bumped host/controller CSS cache keys to `20260604-0340` and controller JS cache key to `20260604-0341`.

Files:
- `controller.html`
- `index.html`
- `src/controller.js`
- `styles.css`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- UI-only pass except for adding CSS tone classes in `src/controller.js`; no gameplay rules, dice math, card logic, room protocol, server behavior, or action payload contracts changed.
- Checks pass: `node --check src/controller.js`, `node --check src/game.js`, `node --check server.js`, `git diff --check`.
- Browser screenshots could not be captured in this session because Chromium launch is blocked by macOS MachPort permissions and approval is disabled.

Open questions:
- None from Art/UI; ready for Dev 2 combined QA / real-device pass.

## 2026-06-04 12:33 - GD

Changed:
- Split the user's mobile-controller polish/fix list across Dev 3, Art/UI, and Dev 2 QA.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 3 owns Big Button behavior changes and the reported `Шейк не работает` bug.
- Art/UI owns Big Button colors/readability/removing `Телефон игрока` and swapping settings with TADAM cards.
- Dev 2 should do combined QA after Dev 3 and Art/UI hand back.

Open questions:
- None.

## 2026-06-04 12:03 - Dev 2

Changed:
- Reconciled against Dev 3's latest `Большая кнопка` + `Шейк` handback and did not duplicate implementation.
- Performed a QA/feel review pass over the current mobile controller stack.

Files:
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Current `src/controller.js` already uses Cyrillic-safe `startsWith("бросить")` detection for shake, matching Dev 3's note about avoiding JS `\b`.
- Static checks still pass: `node --check src/controller.js`, `node --check src/game.js`, `node --check server.js`, `git diff --check`.
- CSS review for 360-430px found no obvious overflow risk in Big Button/shake layout: stats use `minmax(0, 1fr)`, long labels can wrap, and the huge button keeps stable height.
- Local browser screenshots/motion simulation remain unavailable in this Dev 2 environment due the same macOS Chromium permission block.

Open questions:
- Real-phone retest remains the next useful validation step for iPhone/Safari permission UX and Android/Chrome shake sensitivity.

## 2026-06-04 00:35 - Dev 3

Changed:
- Added second mobile controller room mode `Большая кнопка`.
- Host `Телефоны` block now has room mode selector: `Полный контроллер` (default/current behavior) and `Большая кнопка`.
- Recreated rooms use the currently selected mode; server stores `room.mode`, exposes it in room state, and host snapshots include `controllerMode`.
- `Большая кнопка` controller mode shows compact player stats at the top and one huge lower-half action button.
- In `Большая кнопка`, phone sends only safe single primary actions (`Бросить` / `Далее`); meaningful 2+ choice states show `Выбор на большом экране` and expose no phone choice list.
- Added `Шейк` room setting for both controller modes.
- Server stores `shakeEnabled`, host includes it in snapshots, and controllers enable shake only for the active claimed player with current safe `Бросить`.
- Shake shows dice motion feedback, requests iOS motion permission when required, falls back to the normal button if sensors are unavailable/denied, and debounces one shake gesture to one roll.
- Fixed Cyrillic roll label detection for shake by avoiding JS `\b` word boundary with `Бросить`.
- Bumped host/controller cache keys to `20260604-0335` / `20260604-0338`.

Files:
- `index.html`
- `controller.html`
- `server.js`
- `src/game.js`
- `src/controller.js`
- `styles.css`
- `project-memory/updates.md`
- `outputs/phone-big-button-host.png`
- `outputs/phone-big-button-controller.png`
- `outputs/phone-shake-full-controller.png`

Notes for others:
- No gameplay rules, dice math, cards, bots, routes, balance, or board logic changed.
- Phone mode remains opt-in/off by default; classic play is unchanged while `Играть с телефонами` is off.
- Browser smoke passed with host + multiple controller contexts:
  - default/full mode still renders normal controller actions;
  - `Большая кнопка + Шейк` renders compact stats + huge button, no overflow at 390px/360px;
  - huge button can send primary roll and continue;
  - 2+ choice state does not show options on phone and host-screen choice still works;
  - simulated motion event in full mode triggers host roll state (`turnLabel: крутится`);
  - wrong-player action returns `403 wrong-player`;
  - LAN URL shown as `http://192.168.31.41:5173/controller.html?room=...`.
- `node --check src/game.js`, `node --check src/controller.js`, `node --check server.js`, and `git diff --check` pass.

Open questions:
- Ready for real-phone retest, especially iPhone/Safari motion permission and Android/Chrome shake sensitivity.

## 2026-06-04 00:31 - Dev 2

Changed:
- Hardened the phone controller `Шейк` input layer for shake-to-roll.
- Shake now arms only for the safe primary roll action: `kind/type=roll`, `id=roll`, and label starting with `Бросить`.
- Shake is blocked for waiting/not-active states, closed/error states, `Далее`, and meaningful choice/prompt states.
- Normal roll button and Big Button taps now consume the current shake action key, preventing a tap plus motion from sending a duplicate roll.
- Shake debounce key now includes room, player, round, position, action kind/id, and label, so the same roll state cannot fire twice but a later real roll state can re-arm.
- Removed the controller debug motion hook from production code.

Files:
- `src/controller.js`
- `project-memory/updates.md`
- `project-memory/inbox/for-gd.md`

Notes for others:
- Host/server room setting plumbing for `Шейк` (`index.html`, `src/game.js`, `server.js`) was already present in the current worktree; Dev 2 preserved it and did not change gameplay rules, dice math, cards, bots, routes, balance, room lifecycle, or server message contracts.
- Checks passed: `node --check src/controller.js`, `node --check src/game.js`, `node --check server.js`, `git diff --check`.
- Browser screenshot/motion simulation could not be completed in this session because headless Chromium launch is blocked by macOS MachPort permissions while approvals are disabled.

Open questions:
- Ready for real-phone retest, especially iPhone/Safari motion permission and Android/Chrome shake feel.

## 2026-06-04 00:25 - GD

Changed:
- Redirected the `Шейк` shake-to-roll phone room task from Dev 3 to Dev 2 because Dev 3 is busy.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev 2 should implement `Шейк` as controller input/juice and check latest updates before editing.
- Dev 3 remains owner of room architecture / `Большая кнопка` unless separately coordinated.
- Avoid duplicate work or conflicts in `src/game.js`, `src/controller.js`, `index.html`, `controller.html`, and `styles.css`.

Open questions:
- None.

## 2026-06-04 00:24 - GD

Changed:
- Added a Dev 3 feature task for phone room setting `Шейк`, enabling shake-to-roll in both controller modes.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- `Шейк` is an input/juice layer only: host remains authoritative for roll results, and dice math/rules must not change.
- Normal button remains available as fallback.
- MVP scope should focus shake on the safe `Бросить` action, not on choices or `Далее`.

Open questions:
- None.

## 2026-06-04 00:22 - Dev 3

Changed:
- Hardened mobile phone room lifecycle so a host/session keeps one active phone room at a time.
- `Пересоздать комнату` now closes the previous room before creating the next room.
- Server now supports explicit room close via host-authenticated `/api/rooms/:code/close`.
- Closed room codes are remembered for the room TTL window and old links return `410 { error: "room-closed" }` for GET, claim, and action requests.
- Controllers connected to a closed room receive `room-closed`, show `Комната закрыта на большом экране. Подключись по новой ссылке.`, and clear old player/action UI.
- Turning `Играть с телефонами` off also closes the active phone room.
- Bumped host/controller script cache keys to `20260604-0328`.

Files:
- `server.js`
- `src/game.js`
- `src/controller.js`
- `index.html`
- `controller.html`
- `project-memory/updates.md`
- `outputs/phone-room-recreate-host.png`
- `outputs/phone-room-old-controller-closed.png`
- `outputs/phone-room-new-controller.png`

Notes for others:
- No gameplay rules, dice math, cards, bots, routes, balance, or board logic changed.
- Phone mode remains opt-in/off by default; classic play is unchanged while `Играть с телефонами` is off.
- Verification passed: created room A, joined controller, clicked `Пересоздать комнату`, created room B, old controller showed closed state with zero action buttons, old room GET/claim/action all returned `410 room-closed`, new room accepted controller claim, and copy button copied the new LAN URL.
- `node --check src/game.js`, `node --check src/controller.js`, `node --check server.js`, and `git diff --check` pass.

Open questions:
- Ready for real-phone retest with repeated room recreation.

## 2026-06-04 00:21 - GD

Changed:
- Added a Dev 3 feature task for a second phone-controller room mode: `Большая кнопка`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Existing/full phone controller mode should remain default and preserve current behavior.
- New `Большая кнопка` mode is for no-look party play: compact stats at top, huge primary action button from mid-screen to bottom.
- In `Большая кнопка` mode, meaningful 2+ option choices stay on the host screen; the phone should show a waiting/disabled state like `Выбор на большом экране`.

Open questions:
- None.

## 2026-06-04 00:17 - GD

Changed:
- Added a Dev 3 hardening task for mobile phone rooms: keep one active room per host session and close/invalidate the previous room when recreating.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This is a lifecycle/cleanup task for repeated real-phone testing.
- Main desired behavior: old room links stop working after `Пересоздать комнату`, old controllers show closed/lost state, and the new room works normally.
- Optional `Закрыть комнату` host control is allowed only if low-risk and compatible with current Art/UI polish.

Open questions:
- None.

## 2026-06-04 00:17 - Art/UI

Changed:
- Aligned the host settings phone toggle card with the adjacent `Телефоны` room panel by removing the extra top offset on `.phone-mode-toggle`.
- Bumped the host page CSS cache key to `20260604-0327`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI-only alignment fix; phone room behavior, copy-link behavior, controller protocol, and gameplay were not changed.
- `git diff --check` passes.

Open questions:
- None.

## 2026-06-04 00:08 - Dev 3

Changed:
- Added a `Скопировать ссылку` button to the host `Телефоны` room block.
- The button copies the player-facing LAN controller URL from the main URL field, not the secondary local/debug URL.
- Successful Clipboard API copy shows `Скопировано` briefly, then restores the normal label.
- If Clipboard API is unavailable, the URL field is focused and selected for manual copy, and the button briefly shows `Выделено`.
- Bumped host JS/CSS cache keys to `20260604-0326`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`
- `outputs/phone-copy-link-desktop.png`
- `outputs/phone-copy-link-mobile.png`

Notes for others:
- Functional affordance only; no gameplay rules, dice math, cards, bots, routes, controller protocol, or server behavior changed.
- Phone mode remains opt-in/off by default, so classic host-screen play remains unchanged when `Играть с телефонами` is off.
- Verified copied text was `http://192.168.31.41:5173/controller.html?room=...`, matching the displayed LAN URL and not `localhost` / `127.0.0.1`.
- Verified fallback selection by mocking Clipboard API unavailable.
- Verified no phone-room block overflow at desktop 1440px and mobile 390px.
- `node --check src/game.js`, `node --check src/controller.js`, `node --check server.js`, and `git diff --check` pass.

Open questions:
- Ready for real-phone retest.

## 2026-06-04 00:05 - Art/UI

Changed:
- Restyled the host settings `Телефоны` / phone room panel so it matches the dark settings UI instead of rendering as a pale grey block.
- Added dark card background, warm thin borders, compact header button, readable muted status text, dark URL input, and styled room detail rows.
- Added tabletop-specific overrides for phone room panel rows, hint code, and URL input.
- Bumped the host page CSS cache key to `20260604-0325`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI-only host settings fix; phone controller protocol, room creation, server logic, gameplay rules, and balance were not changed.
- `git diff --check` passes.
- Browser screenshot verification could not run in this sandbox because Chromium launch is blocked by macOS MachPort permissions and approval is disabled in this session.

Open questions:
- None.

## 2026-06-04 00:02 - Dev

Changed:
- Fixed sticky iPhone hover/highlight on mobile controller buttons after tapping.
- Touch/coarse-pointer controller buttons now keep their normal background on `:hover`; pressed feedback stays limited to `:active`.
- Removed non-keyboard focus outline on controller buttons while keeping `:focus-visible` available for keyboard accessibility.
- Bumped controller page stylesheet cache key to `20260603-0323`.

Files:
- `styles.css`
- `controller.html`
- `project-memory/updates.md`

Notes for others:
- This is controller CSS only; no protocol, gameplay, dice, cards, board, bots, or host UI layout changed.
- Checks pass: `node --check src/controller.js`, `node --check server.js`, `git diff --check`.
- Mobile-style Playwright smoke loaded `styles.css?v=20260603-0323` and confirmed touch hover no longer changes the controller button background to the gold hover state.

Open questions:
- Retest on real iPhone Safari/Chrome: tap `Открыть`/`Бросить`, then confirm the button does not stay highlighted after the tap ends.

## 2026-06-04 00:01 - GD

Changed:
- Added a Dev task for a copy-link button in the `Телефоны` room block.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Art/UI is already assigned to polish this block visually; this task is the functional copy affordance.
- The button must copy the player-facing LAN controller URL, not the secondary local/debug URL.
- Phone mode remains opt-in/off by default and classic play should not change.

Open questions:
- None.

## 2026-06-03 23:55 - Dev

Changed:
- Fixed mobile controller reconnect behavior after the phone browser is backgrounded / reopened.
- Controller now probes the room before opening SSE, reconnects on `pageshow`, focus, `online`, and visible-tab return, and retries one action after reconnect for transient network/room errors.
- Lost-room states no longer leave stale active action buttons enabled on the controller.
- Hardened the server SSE relay: dead controller/host streams are removed and failed SSE writes no longer risk crashing the server.
- Bumped the controller script cache key to `20260603-0322`.

Files:
- `server.js`
- `controller.html`
- `src/controller.js`
- `project-memory/updates.md`

Notes for others:
- Phone mode remains opt-in/off by default; no gameplay rules, card effects, dice math, board route, bot logic, or controller visual polish changed.
- Required checks pass: `node --check src/game.js`, `node --check src/controller.js`, `node --check server.js`, `git diff --check`.
- Focused Playwright smoke passed: controller reload kept the claimed player, action after reconnect reached host, missing room disabled actions, and server stayed alive after controller disconnect/reload.
- If the Node server process itself is restarted, in-memory rooms are still lost; the controller now reports that clearly instead of showing stale usable controls. Durable room recovery would be a separate future task.

Open questions:
- Retest on the real phone by switching to another app and returning to Safari/Chrome.

## 2026-06-03 23:41 - Dev 3

Changed:
- Fixed the player-facing phone controller join URL so host UI prefers a phone-connectable LAN URL over `localhost` / `127.0.0.1`.
- Added LAN URL selection in `src/game.js`: prefer private LAN candidates (`192.168.*`, `10.*`, `172.16-31.*`), then any non-local LAN URL, then local fallback.
- Added a small host hint under the phone URL: `Откройте на телефоне в той же Wi-Fi сети`; local debug URL is shown only as secondary text when it differs from the phone URL.
- Bumped host JS/CSS cache keys to `20260603-0322`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`
- `outputs/phone-lan-url-host-check.png`
- `outputs/phone-lan-url-controller-check.png`

Notes for others:
- Phone mode remains opt-in/off by default; classic play is unchanged when `Играть с телефонами` is off.
- Verified from host opened at `http://127.0.0.1:5173`: the displayed/copyable phone URL was `http://192.168.31.41:5173/controller.html?room=...`, not localhost/127.
- Verified the controller page opened from that displayed LAN URL and showed player claim buttons.
- `node --check src/game.js`, `node --check server.js`, `node --check src/controller.js`, and `git diff --check` pass.

Open questions:
- Ready for real-phone retest on the same Wi-Fi network.

## 2026-06-03 23:35 - GD

Changed:
- Added an urgent Dev 3 task for the phone-controller MVP: the game must display a phone-connectable LAN join URL instead of `localhost` / `127.0.0.1`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- User confirmed `http://192.168.31.41:5173/` opens from the phone, while the URLs currently shown by the game (`http://127.0.0.1:5173` and `http://127.0.0.1:5173/controller.html?room=7RN6`) do not.
- Diagnosis: server exposes LAN URLs, but host UI appears to present the origin-based local URL as the primary phone URL.
- Dev 3 should prefer `room.lanUrls` for the player-facing phone join link and keep phone mode opt-in/off by default.

Open questions:
- None.

## 2026-06-03 23:24 - GD

Changed:
- Added a Dev coordination rule for GD-originated tasks: if GD assigned/coordinated a task, Dev should hand completion/status back to GD after finishing.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- This applies only to tasks GD explicitly assigned or coordinated.
- Dev should still write the normal project-memory update.
- Handback to GD should include implementation/verification summary, changed files, tests/checks, remaining GD decisions, and readiness for playtest or next Dev/UI pass.

Open questions:
- None.

## 2026-06-03 23:22 - Dev 2

Changed:
- Polished the mobile phone controller UI as a fantasy player dashboard without changing server message shapes or action contracts.
- Added controller body state markers for join/waiting/claim/active UI styling.
- Improved player identity presentation with larger avatar, active/waiting badge, player-color glow, compact stat plaques, and readable Joe Shop card chips.
- Made controller action/choice buttons larger and touch-friendly, with clearer disabled/waiting styling.
- Bumped controller CSS/JS cache keys to `20260603-0321`.

Files:
- `controller.html`
- `src/controller.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- UI-only controller polish: no protocol, room logic, gameplay rules, cards, dice math, bot logic, board routes, or host action validation changed.
- `node --check src/controller.js`, `node --check src/game.js`, `node --check server.js`, and `git diff --check` pass.
- Browser checks used real room API snapshots and passed at 390px for waiting, active roll/continue, and choice states; 360px choice state also had no horizontal overflow.
- Host page with phone mode off still loads with `.phone-room-panel` hidden, roll button visible, no broken images, and no horizontal overflow at 1440px.
- Screenshots: `outputs/controller-waiting-polish.png`, `outputs/controller-active-polish.png`, `outputs/controller-choice-polish.png`, `outputs/controller-choice-360-polish.png`, `outputs/controller-host-phone-off-check.png`.

Open questions:
- None.

## 2026-06-03 23:15 - GD

Changed:
- Chose the next mobile-controller MVP step after Dev 3's first vertical slice.
- Added two parallel follow-up tasks: Dev for QA/regression/harder choice flows, Dev 2 for mobile controller UI polish.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Do both next steps in parallel, but keep ownership separate:
  - Dev checks stability, classic-flow isolation, and harder controller flows.
  - Dev 2 polishes controller UI only, without changing protocol or rules.
- Dev 3 remains owner of the first protocol architecture unless a protocol bug is discovered.
- The hard constraint remains: `Играть с телефонами` is opt-in/off by default and must not affect classic play.

Open questions:
- After QA/UI polish, decide whether QR code or real-phone LAN testing is the next highest-value slice.

## 2026-06-03 23:11 - Dev 3

Changed:
- Added the first MVP slice for Jackbox-style local mobile phone controllers.
- Extended `server.js` into a no-dependency HTTP + SSE relay with room creation, room code/join URL, controller slot claims, host snapshots, and controller action forwarding.
- Added `controller.html` and `src/controller.js` for phone joining, player claiming, player stats/cards display, and action buttons.
- Added an opt-in `Играть с телефонами` settings checkbox, off by default, plus a hidden `Телефоны` room panel with room code, join URL, and connected controller names.
- Added host-side controller snapshots and validation for roll/continue, pre-roll extra die yes/no, pending board/card choices, shop choices, and selectable Joe Shop card prompts.
- Kept the host browser authoritative for all rules; the server only relays messages.
- Bumped JS/CSS cache keys to `20260603-0320`.

Files:
- `server.js`
- `controller.html`
- `src/controller.js`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`
- `outputs/phone-controllers-host-smoke.png`
- `outputs/phone-controller-c1-smoke.png`

Notes for others:
- Phone controllers are strictly opt-in. With `Играть с телефонами` off, no room is created, no snapshots are sent, and phone actions do not affect the game.
- Verified `node --check src/game.js`, `node --check src/controller.js`, `node --check server.js`, and `git diff --check`.
- Browser smoke on `localhost:5173` passed for: phone mode off by default, create room, join two controller tabs as `Пес` and `Кот`, roll from controller, make a `Привал` choice from controller, advance `Далее` from controller, and wrong-player POST rejected with `403 wrong-player`.
- `server.js` now binds `0.0.0.0` and printed LAN controller hints including `http://192.168.31.41:5173/controller.html`.

Open questions:
- Dev 2 should polish the mobile controller UI after this protocol slice.
- Dev should expand QA/regression coverage and help cover harder choice flows such as long Joe Shop/pre-roll chains and auction variants.

## 2026-06-03 22:47 - GD

Changed:
- Added the user's correction to the mobile phone controllers MVP task.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Phone-controller work must not affect the current/classic game flow.
- If any implementation change could affect normal host-screen play, it must be gated behind a Settings checkbox/toggle such as `Играть с телефонами`.
- Default behavior must preserve the current game.

Open questions:
- None.

## 2026-06-03 22:41 - GD

Changed:
- Planned the MVP for Jackbox-style mobile phone controllers.
- Added an active high-priority Dev task for local-network phone controllers: host board + room code/join URL + controller page + action relay.
- Coordination decision: start with Dev 3 as implementation lead for the vertical slice; bring Dev 2 in for controller UI polish after the protocol works; bring Dev in for QA/regression and expanded choice support.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- MVP should be local network only for now.
- Host browser remains authoritative for game rules/state; `server.js` should act as a relay.
- Prefer no npm dependencies if possible; SSE/EventSource or polling+POST is acceptable for MVP.
- First supported actions should include roll/action prompt, pre-roll extra die yes/no, and generic choices where possible.

Open questions:
- Whether QR generation is needed in the first slice or whether join URL + room code is enough for MVP.

## 2026-06-03 01:09 - Dev 3

Changed:
- Updated the Joe Shop `extra-die` card description to say `Перед броском кубиков можешь заплатить 5 монет и кинуть на 1 кубик больше.`
- Kept the card title, short title, cost, dice amount, and mechanics unchanged.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/updates.md`

Notes for others:
- Google Sheet `Cards Config`, tab `shop`, already had the same `extra-die` description; no sheet write was needed.

Open questions:
- None.

## 2026-06-03 00:53 - Art/UI

Changed:
- Compactified the VS-battle HUD so it fits inside the field area during VS fights and no longer covers the dice throw zone.
- Desktop/tablet VS cards now use a lower panel, smaller header/emblem, compact participant cards, and bounded result text.
- Mobile touch VS layout switches to four compact participant cards in one row, with the result visible below and no internal scroll.
- Let VS dice render above the board stacking layer by removing the board z-index only while `.vs-battle-hud` is active.
- Bumped the CSS cache key to `20260602-0319`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`
- `outputs/vs-hud-fit-desktop.png`
- `outputs/vs-hud-fit-mobile.png`
- `outputs/vs-panel-element-mobile.png`

Notes for others:
- UI-only fix; no VS battle rules, dice logic, rewards, or balance changed.
- Verified with headless Chromium stress states: desktop panel fits with 4 participants in one row; mobile panel has no internal scroll and dice rects do not overlap the panel.
- `git diff --check` passes.

Open questions:
- None.

## 2026-06-02 16:55 - Art/UI

Changed:
- Fixed the mobile setup button label so `Настройки` becomes exactly `Настр.` instead of rendering as `НастройкиНастр.`.
- Replaced the CSS pseudo-label approach with JS label sync based on the existing phone media query.
- Bumped JS/CSS cache keys to `20260602-0318`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`
- `outputs/mobile-settings-toggle-label.png`

Notes for others:
- UI-only fix; no settings behavior, rules, layout structure, or Dev inbox tasks changed.
- Mobile touch check confirmed `#settingsToggle.textContent === "Настр."`, `aria-label="Настройки"`, no `::after` content, and no broken images.

Open questions:
- None.

## 2026-06-02 16:55 - Dev

Changed:
- Fixed a turn-order race where repeated roll input could start another move over the previous one or immediately consume the next player's turn.
- Added a synchronous `movementActionInProgress` guard that is set before any awaited pre-roll/card logic.
- Applied the same movement guard to the exact-move dev control.
- Added a short human roll cooldown after a human movement completes, and ignored repeated Enter keydown events.
- Bumped the game script cache key to `20260602-0317`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- No movement rules, dice math, bot logic, field effects, or card effects were changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser regression with fixed d6=2 verified: two synchronous roll clicks only moved `Пес` once and left `Кот` active; repeated Enter with `event.repeat=true` did not start another turn. Active token count stayed 1 and moving token count returned to 0.
- Screenshot saved as `outputs/double-roll-lock-check.png`.

Open questions:
- None.

## 2026-06-02 16:06 - Art/UI

Changed:
- Fixed the pre-roll extra-die action UI so multiple `+1 кубик за 5` cards no longer break the `turn-actions` panel.
- Grouped identical optional extra-die actions into one compact chip with a count badge.
- Shortened the pre-roll payment prompt to use `shortTitle`, added a compact progress badge, and made the mobile layout stack text/buttons inside the same panel.
- Bumped JS/CSS cache keys to `20260602-0315`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`
- `outputs/extra-die-actions-desktop-normal.png`
- `outputs/extra-die-actions-desktop-pending.png`
- `outputs/extra-die-actions-mobile-normal.png`
- `outputs/extra-die-actions-mobile-pending.png`

Notes for others:
- UI-only fix: no card cost, dice math, pre-roll sequence, bot logic, or balance changed.
- Stress test checked six grouped extra-die actions plus a rage chip, and pending state `5/6`, on desktop 1440px and mobile 390px.
- Live in-app browser reload confirmed `./src/game.js?v=20260602-0315`, `./styles.css?v=20260602-0315`, and no broken images.

Open questions:
- None.

## 2026-06-02 15:58 - Dev 2

Changed:
- Reduced `Кубик удачи` reward for each rolled 6 from `+20 монет` to `+10 монет`.
- Updated the pre-roll rule card and field-effect text to show `+10 монет`.
- Bumped the game script cache key; current loaded key is `20260602-0315`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- The 6-dice roll count and the `1 = -5 шагов` rule were not changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser check on `localhost:5173` confirmed the field/prompt show `6 = +10 монет`; with forced sixes, six rolled 6s awarded `60` coins and raised the active player from 10 to 70 coins.
- Screenshot saved under `outputs/dice-fortune-10-coins-check.png`.

Open questions:
- None.

## 2026-06-02 15:57 - Dev

Changed:
- Fixed final battle boss scoring so the boss bonus is applied as a separate pre-roll action instead of first appearing together with the first boss roll.
- Final battle HUD now shows the boss counter after the bonus action using `bossBonusApplied`, while boss rolls still add only rolled dice values.
- Added log/action prompt text for the boss pre-roll bonus breakdown.
- Current game script cache key is `20260602-0315` after parallel updates.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Final battle math is unchanged: boss total remains boss dice + boss combat modifiers per challenger + +1 per challenger.

Open questions:
- None.

## 2026-06-02 13:57 - Dev

Changed:
- Added a field-preview button to card choice popups whose options target players.
- Player-choice popups now show `Показать поле`; clicking it hides the popup and lets the player inspect the board.
- While field preview is active, the main roll button becomes `К выбору` and returns to the same choice popup.
- Reused the portal map-preview button styling for the new player-choice preview button.
- Bumped the stylesheet cache key to `styles.css?v=20260602-0306`; the current game script cache key is `game.js?v=20260602-0311` after the parallel portal-preview update.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- This is UI-only; card effects, bot choices, movement, and dice math were not changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser smoke forced the Good card `choose-player-back-roll`: the `Кого отправить назад?` popup showed `Показать поле`, preview hid the popup and showed the board, `К выбору` was enabled, and returning restored the same popup.
- Screenshot saved as `outputs/player-choice-field-preview.png`.

Open questions:
- None.

## 2026-06-02 13:56 - Dev

Changed:
- Portal field preview now also highlights the projected finish cell for choosing `Не входить`, so players can see where they land if they do not move through a portal.
- Bumped the game script cache key to `20260602-0311`.

Files:
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Portal choice mechanics, movement, enemy gates, and remaining-step projection were not changed.

Open questions:
- None.

## 2026-06-02 13:50 - Dev 2

Changed:
- Renamed the `big-rest` field player-facing label from `Большой привал` to `Привал`.
- Reduced the `Восстановиться` reward from `+15 монет` to `+10 монет`.
- Updated the choice note, prompt title, log/toast messages, tile tooltip, and field-effect text.
- Bumped the game script cache key; current loaded key is `20260602-0310`.
- Removed the stale already-implemented Big Rest task from `project-memory/inbox/for-dev.md` so the old `Большой привал` / `+15 монет` spec no longer appears as an open Dev item.

Files:
- `src/game.js`
- `index.html`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Internal event id stays `big-rest`; placement, icon, bot choice model, `+1 сила`, and `+2 шаги` options were not changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser check on `localhost:5173` confirmed the field tooltip/choice panel say `Привал` and `+10`; choosing `Восстановиться` after a 32-step exact move raised the active player's coins from 10 to 20.
- Screenshot saved under `outputs/rest-rename-reward-check.png`.

Open questions:
- None.

## 2026-06-02 13:49 - Art/UI

Changed:
- Removed unused project asset files from `assets/`: old icon variants, source PNGs, unused background arts, an unused player token, and `.DS_Store`.
- Kept every asset currently referenced by `index.html`, `styles.css`, `src/`, and `cards-google-sheet.csv`.

Files:
- `assets/.DS_Store`
- `assets/backgrounds/adventure_gap_1254.png`
- `assets/backgrounds/adventure_gap_2_1254.png`
- `assets/backgrounds/sky_gap_1254.png`
- `assets/backgrounds/soft_forest_gap_1254.png`
- `assets/icons/bad_512.png`
- `assets/icons/big_rest_1254.png`
- `assets/icons/big_rest_512.png`
- `assets/icons/big_rest_fire_1254.png`
- `assets/icons/big_rest_fire_source.png`
- `assets/icons/big_rest_source.png`
- `assets/icons/black_market_1254.png`
- `assets/icons/black_market_1254_cleantry.png`
- `assets/icons/black_market_512.png`
- `assets/icons/black_market_simple_1254.png`
- `assets/icons/black_market_simple_source.png`
- `assets/icons/black_market_source.png`
- `assets/icons/black_market_ultra_simple_1254.png`
- `assets/icons/black_market_ultra_simple_source.png`
- `assets/icons/chaos_portal_1024.png`
- `assets/icons/chaos_portal_512.png`
- `assets/icons/chaos_portal_source.png`
- `assets/icons/joe_auction_1254.png`
- `assets/icons/joe_auction_simple_1254.png`
- `assets/icons/joe_auction_simple_512.png`
- `assets/icons/joe_auction_simple_source.png`
- `assets/icons/joe_auction_source.png`
- `assets/player-tokens/squirrel.png`
- `project-memory/updates.md`

Notes for others:
- No game code, UI code, rules, card config, field layout, or Dev inbox tasks were changed.
- `outputs/` was left untouched; this cleanup only removed unused `assets/` files.
- Asset reference audit now reports 34 remaining asset files, 0 unused assets, and 0 missing referenced assets.
- Browser reload on `localhost:5173` reported 84 loaded images, no broken images, and confirmed key event icons still load from the remaining files.

Open questions:
- None.

## 2026-06-02 13:45 - Dev 2

Changed:
- Replaced the `Аукцион Лавки Джо` tile icon source with the dedicated `assets/icons/joe_auction_512.png` asset.
- Bumped the game script cache key to `20260602-0307`.
- Updated project memory to include the active `Dev 2`, `Dev 3`, and `Art / UI` roles.
- Removed completed/stale Joe Auction and Big Rest icon tasks from `project-memory/inbox/for-dev.md`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- No `joe-auction` rules, placement, bid options, bot scoring, History, Chronicle, or tooltip text changed.
- Current field2 has the Joe Auction tile at `14-0`; the older inbox verification coordinate `6-7` is currently an ordinary `Лавка Джо` tile.
- Current field2 Big Rest cells are `0-3`, `14-4`, and `11-9`; all already load `assets/icons/big_rest_fire_512.png`.
- `node --check src/game.js` and `git diff --check` pass.
- Browser check on `localhost:5173` confirmed `./src/game.js?v=20260602-0307`, `assets/icons/joe_auction_512.png?v=20260602-0307` loading at 512x512 on field2 `14-0`, no broken images, and no console/page errors.
- Screenshot saved under `outputs/joe-auction-dedicated-icon-check.png`.

Open questions:
- None.

## 2026-06-02 00:46 - Dev

Changed:
- Made multiple active TADAM cards `Охота на монстра` stack.
- `awardMonsterHuntReward()` now sums every active `monster-win-coins` TADAM effect instead of using only the first one.
- Added `activeTadamEffects(type)` helper for multi-card TADAM effects.
- Bumped the game script cache key to `20260602-0306`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Two active `Охота на монстра` cards now grant 30 coins on a monster victory; three grant 45.
- Other TADAM effects that intentionally use the first active matching rule still use `activeTadamEffect()`.
- `node --check src/game.js` and `git diff --check` pass.
- Browser reload confirmed `./src/game.js?v=20260602-0306` and no broken images.

Open questions:
- None.

## 2026-06-02 00:44 - Dev

Changed:
- Added a `Показать поле` button to the regular opened-monster portal choice.
- In portal field-preview mode the portal-choice UI is hidden, the main roll button changes to `Портал`, and clicking it returns to the portal-choice UI.
- Added pulsing `portal-preview-outline` markers on cells where the player would finish after exiting each available portal.
- Bumped the stylesheet cache key to `styles.css?v=20260602-0305`; the game script cache key is now `game.js?v=20260602-0306` after the later TADAM stacking update.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- This applies to ordinary portals created from enemies defeated by all players, not to `Портал хаоса`.
- The endpoint preview follows the current default route and locked-door checks from the chosen exit for the remaining steps.
- `node --check src/game.js` and `git diff --check` pass.
- Browser smoke on `localhost:5173` opened two field2 portals in a one-player test setup, landed on an opened portal, confirmed `Показать поле`, confirmed the hidden choice panel + `Портал` roll button + one preview outline, then confirmed the portal-choice UI returns and outlines are removed.
- Screenshot saved under `outputs/portal-preview-check.png`.

Open questions:
- None.

## 2026-06-02 00:23 - Dev

Changed:
- Restored the Shop card `extra-die` / `Перед ходом можешь заплатить 5 монет и кинуть на 1 кубик больше` after it was mistakenly removed.
- Restored the matching `shop,extra-die` row in `cards-google-sheet.csv`.
- Wrote the same `extra-die` row back to Google Sheet `Cards Config`, tab `shop`, row 5.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/updates.md`

Notes for others:
- The old passive `+1 к броску кубика` text remains removed: local search and Google Sheet search for `броску кубика` return no rows.
- Shop card config is now: `step-plus` / `+1 к шагам`, `battle-plus` / `+1 к силе`, `coin-plus` / `+2 к монетам`, and `extra-die` / paid +1 die before a turn.
- Local config/CSV comparison reports 21 cards total, Shop 4, with no mismatches.
- `node --check src/cards.config.js`, `node --check src/game.js`, and `git diff --check` pass.

Open questions:
- None.

## 2026-06-02 00:19 - Dev

Changed:
- Fixed roll-event rule prompts overlapping the dice roll button, especially in the `Настольный` UI.
- Added an explicit `roll-event-prompt` class for dice-event prompts so layout no longer depends only on CSS `:has(...)`.
- Made the roll-event card narrower, anchored it away from the roll button on desktop/tablet, and kept a narrower mobile width.
- Extended viewport correction to one-column layouts up to `1180px` so the prompt stays visible after page scroll.
- Bumped cache keys to `styles.css?v=20260602-0304` and `game.js?v=20260602-0302`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- No gameplay mechanics were changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser smoke on `localhost:5173` with `Настольный` UI checked Chaos Portal prompt at 1116px, 1440px, and 390px; `overlapRoll` was false, card stayed within viewport, and no broken images/errors were reported.
- Screenshots saved under `outputs/roll-event-no-overlap-1116.png`, `outputs/roll-event-no-overlap-1440.png`, and `outputs/roll-event-no-overlap-390.png`.

Open questions:
- None.

## 2026-06-02 00:16 - Dev

Changed:
- Removed the old Shop card `extra-die` / `+1 кубик за 5` from `src/cards.config.js`.
- Removed the matching `shop,extra-die` row from `cards-google-sheet.csv`.
- Synced Google Sheet `Cards Config` tab `shop` to the current three cards: `step-plus` / `+1 к шагам`, `battle-plus` / `+1 к силе`, and `coin-plus` / `+2 к монетам`.
- Fixed the Google Sheet `shop` tab row that still showed `+1 к броску кубика` for `step-plus`.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/updates.md`

Notes for others:
- Local comparison now reports 20 cards in both `src/cards.config.js` and `cards-google-sheet.csv`: Good 7, Bad 3, TADAM 7, Shop 3, with no mismatches.
- Google Sheet `shop` tab was reread after update and no longer contains `броску кубика`; `battle-plus` is present on row 3.
- `node --check src/cards.config.js`, `node --check src/game.js`, and `git diff --check` pass.

Open questions:
- None.

## 2026-06-02 00:15 - Art/UI

Changed:
- Made the field2 final monster tile icon slightly larger while keeping a stricter max-height inset guard so it stays inside the cell.
- Bumped the stylesheet cache key to `20260602-0303`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- No monster rules, final boss stats, route cells, door logic, or battle UI changed.
- Browser verification confirmed field2 final boss cell `10-6` renders `final_enemy.png` at about `22.94x26.15` inside a `35x35` tile, with about `6px` left/right/top inset and about `2.7px` bottom inset; no broken images.

Open questions:
- None.

## 2026-06-02 00:08 - Dev

Changed:
- Added reusable roll-event rule cards for action prompts where a field asks the player to roll before the effect resolves.
- `Портал хаоса` now shows its actual 1-2 / 3-4 / 5 / 6 outcomes and destination cells before the roll.
- `Кубик удачи` now shows its 6 / 1 / 2-5 rules before rolling and uses the `Бросить кубик` action button.
- Added responsive styling and a viewport correction so roll-event cards remain visible on mobile after page scroll.
- Bumped CSS/JS cache keys to `styles.css?v=20260601-0297` and `game.js?v=20260601-0299`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Mechanics, dice math, destinations, and card/shop/portal rules were not changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser smoke on `localhost:5173` checked desktop 1440px Chaos Portal, mobile 390px Chaos Portal, and desktop Dice Fortune; all showed the rules card, no viewport overflow, no console/page errors, and no broken images.
- Screenshots saved under `outputs/roll-event-desktop-chaos.png`, `outputs/roll-event-mobile-chaos.png`, and `outputs/roll-event-desktop-dice-fortune.png`.

Open questions:
- None.

## 2026-06-01 23:52 - Dev

Changed:
- Changed visual card text rendering to use `description` with fallback to `title`.
- Applied it to Good, Bad, TADAM, Joe Shop reveal cards, TADAM side-panel slots, and card choice buttons in Shop / player-card purchase / Joe Auction prize selection.
- Kept logs, Chronicle names, saved item titles, and compact player inventory badges on `title` / `shortTitle`.
- Bumped the game script cache key to `20260601-0295`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- This is a display-only change; card effects, card config, decks, Google Sheet/CSV contents, and bot logic were not changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser reload confirmed the game loads the updated script cache key and has no broken images.

Open questions:
- None.

## 2026-06-01 23:52 - Art/UI

Changed:
- Replaced the `Черный рынок` board tile icon with a more minimal black-market symbol focused on one large violet lantern/sign silhouette.
- Saved a chroma-key source, transparent high-res PNG, and 512px board-ready PNG.
- Bumped the game script cache key to `20260601-0294`.

Files:
- `assets/icons/black_market_ultra_simple_source.png`
- `assets/icons/black_market_ultra_simple_1254.png`
- `assets/icons/black_market_ultra_simple_512.png`
- `outputs/black-market-ultra-simple-preview.png`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- No Dev inbox task was added; this was applied directly after user approval to continue the replacement.
- The previous `black_market_512.png` asset was left in place.
- Browser check confirmed field2 cell `2-6` loads `./assets/icons/black_market_ultra_simple_512.png?v=20260601-0294` at 512x512, with no broken images, under `./src/game.js?v=20260601-0294`.

Open questions:
- None.

## 2026-06-01 22:31 - Dev

Changed:
- Changed `Портал хаоса` outcome `5` from nearest TADAM to nearest `Хорошо`.
- Updated the chaos-portal player choice option for roll `6` from TADAM to `Хорошо`.
- Updated chaos-portal roll label, tile tooltip, and field text from `5: к TADAM` to `5: к Хорошо`.
- Bumped the game script cache key to `20260601-0292`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- No chaos portal placement, icon, dice ranges, monster/shop outcomes, or Good-card mechanics changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser check confirmed field2 chaos portal tiles now show tooltip `5: к Хорошо` and load `./src/game.js?v=20260601-0292`.

Open questions:
- None.

## 2026-06-01 22:30 - Dev

Changed:
- Made `Классический` the default UI style.
- Updated initial body style, UI selector default option, and JS fallback default from `tabletop` to `classic`.
- Bumped the game script cache key to `20260601-0291`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- No game rules, field layout, cards, bot logic, History, Chronicle, or visual assets changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser check confirmed a fresh load has `body[data-ui-style="classic"]`, `#uiStyle.value === "classic"`, script `./src/game.js?v=20260601-0291`, field2 still active, and no broken images.

Open questions:
- None.

## 2026-06-01 22:25 - Art / UI

Changed:
- Applied the simplified `Аукцион Лавки Джо` icon in game rendering.
- Updated `joeAuctionIconSrc` to use `assets/icons/joe_auction_simple_512.png?v=20260601-0290`.
- Bumped the game script cache key in `index.html` to `20260601-0290`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The previous detailed `joe_auction_512.png` asset remains in `assets/icons/` as an alternate; the game now uses the simpler version.
- No `joe-auction` mechanics, placement, bid options, tie roll-off, bot scoring, History, Chronicle, or tooltip text changed.
- Browser check confirmed the tile loads `./assets/icons/joe_auction_simple_512.png?v=20260601-0290` at 512x512.
- `node --check src/game.js` and `git diff --check` pass.

Open questions:
- None.

## 2026-06-01 22:20 - Art / UI

Changed:
- Proposed a simpler alternate `Аукцион Лавки Джо` icon focused on one large gavel, one gold bid token, and two large card silhouettes.
- Saved transparent PNG variants: high-res `joe_auction_simple_1254.png` and tile-friendly `joe_auction_simple_512.png`.
- Added a small visual comparison image for old/new 512px and simulated 35px tile readability.

Files:
- `assets/icons/joe_auction_simple_source.png`
- `assets/icons/joe_auction_simple_1254.png`
- `assets/icons/joe_auction_simple_512.png`
- `outputs/joe-auction-icon-comparison.png`
- `project-memory/updates.md`

Notes for others:
- Per user instruction, no Dev inbox/task note was added without approval.
- The simple variant is intended to read better at field tile size than the current detailed gavel/cards/coin/stall composition.

Open questions:
- Awaiting user approval before replacing the current `joe_auction_512.png` or writing any Dev-facing instruction.

## 2026-06-01 22:15 - Dev

Changed:
- Updated field2 event layout to match the new 15x15 reference image sent by the user.
- Moved `black-market` to `2-6`.
- Moved `joe-auction` to `14-0`.
- Set `5-0` and `6-7` back to ordinary Joe Shop cells.
- Added/moved `big-rest` cells to `0-3`, `14-4`, and `11-9`; `12-0` is now a Good cell.
- Updated smaller reference differences: `6-13` and `14-13` are TADAM, `8-14` is Good.
- Bumped the game script cache key to `20260601-0289`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`
- `outputs/field-reference-update.png`

Notes for others:
- The field2 route path, monster gate positions, door config, mechanics, cards, bot logic, History, Chronicle, and tooltips were not changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser check confirmed field2 renders as 15x15 with 115 route cells, loads `./src/game.js?v=20260601-0289`, has no broken images, and all checked reference cells match their expected event classes.

Open questions:
- None.

## 2026-06-01 16:51 - Art / UI

Changed:
- Reduced board tile icon rendering sizes so event art no longer touches or overlaps tile borders.
- Added a max-size guard for `.tile-icon-image` and reduced oversized field2/special icon rules, including `black-market`, `joe-auction`, `big-rest`, portals, TADAM, shop, good/bad, start/finish, and enemy icons.
- Bumped the stylesheet cache key to `20260601-0288`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- No gameplay rules, routes, cards, History, Chronicle, tooltip, or bot logic changed.
- Browser check confirmed black market, Joe auction, big rest, chaos portal, shop, TADAM, good/bad, and enemy icons now have about 5-6px visual inset inside 35px field2 tiles.
- `node --check src/game.js` and `git diff --check` pass.

Open questions:
- None.

## 2026-06-01 16:33 - Art / UI

Changed:
- Redrew `Черный рынок` as a simpler small-tile icon focused on a large purple lantern, black-purple awning, and gold secret emblem.
- Replaced the working `black_market_512.png` / `black_market_1254.png` assets with the simplified version.
- Bumped the black market icon cache key in `src/game.js` to `20260601-0287` and the module cache key in `index.html` to `20260601-0287`.
- Removed the now-completed black market icon task from Dev inbox.

Files:
- `assets/icons/black_market_source.png`
- `assets/icons/black_market_1254.png`
- `assets/icons/black_market_512.png`
- `index.html`
- `src/game.js`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- No `black-market` mechanics, placement, choices, costs, rewards, bot scoring, History, Chronicle, or tooltip text were changed.
- Browser check confirmed field2 cell `5-0` loads `./assets/icons/black_market_512.png?v=20260601-0287` at 512x512 and is more readable at the 35px tile size.
- `node --check src/game.js` and `git diff --check` pass.

Open questions:
- None.

## 2026-06-01 16:30 - Dev

Changed:
- Normalized tabletop tile outlines so landing-only special tiles use the same standard border/shadow as ordinary cells.
- Removed colored outline/glow exceptions from `joe-auction`, `big-rest`, `black-market`, and `chaos-portal` tile frames while keeping their icons/background identity.
- Kept accent tile outlines only for pass-through effect cells: `shop` and `enemy`.

Files:
- `styles.css`
- `project-memory/updates.md`
- `outputs/tile-border-normalization.png`

Notes for others:
- No gameplay rules, placement, movement, card, History, Chronicle, tooltip, or bot logic changed.
- `git diff --check` and `node --check src/game.js` pass.
- Browser check on field2 confirmed `black-market`, `joe-auction`, `big-rest`, and `chaos-portal` computed borders/shadows match standard green/TADAM tiles; `shop` and `enemy` remain visually accented.

Open questions:
- None.

## 2026-06-01 15:56 - Dev 2

Changed:
- Restored classic-style tile outlines in `Настольный` UI.
- Reapplied the classic border and shadow treatment for normal tiles and special tiles like Joe Shop, Joe Auction, Big Rest, Black Market, Chaos Portal, and enemies.
- Bumped the CSS cache key to `20260601-0286`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- In-app browser check confirmed stylesheet `./styles.css?v=20260601-0286` and classic-style computed borders/shadows on green, shop, auction, big-rest, and enemy tiles in tabletop mode.

Open questions:
- None.

## 2026-06-01 15:51 - Dev

Changed:
- Replaced the CSS-drawn `Черный рынок` tile icon with dedicated PNG `assets/icons/black_market_512.png`.
- Removed the old black-market tent/counter/lantern CSS icon pieces from tile rendering.
- Bumped the JS cache key to `20260601-0285`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`
- `outputs/black-market-tile-check.png`

Notes for others:
- No `black-market` mechanics, placement, choices, costs, rewards, bot scoring, History/Chronicle labels, or tooltip text were changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser check on field2 confirmed cell `5-0` is `tile-black-market`, loads `./assets/icons/black_market_512.png?v=20260601-0285` at 512x512, has no old CSS icon remnants, keeps the existing tooltip, and remains visually distinct from Joe Shop / Joe Auction / Big Rest / TADAM / Chaos Portal icon sources.

Open questions:
- None.

## 2026-06-01 15:48 - Art / UI

Changed:
- User approved writing the `Черный рынок` icon instruction for Dev.
- Added a Dev inbox task to replace the current CSS-drawn black market tile icon with `black_market_512.png` / `black_market_1254.png`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev-facing notes should continue to be written only after user approval.
- The task is asset-only: no `black-market` mechanics, placement, choices, costs, rewards, bot scoring, History, Chronicle, or tooltip changes.

Open questions:
- None.

## 2026-06-01 15:38 - Art / UI

Changed:
- Generated a dedicated `Черный рынок` icon asset.
- Saved transparent PNG variants: high-res `black_market_1254.png` and tile-friendly `black_market_512.png`.

Files:
- `assets/icons/black_market_source.png`
- `assets/icons/black_market_1254.png`
- `assets/icons/black_market_512.png`
- `project-memory/updates.md`

Notes for others:
- Per user instruction, no Dev inbox/task note was added without approval.
- The icon uses a black/purple market awning, purple lantern, secret emblem, coins, bottles, and shady goods so it reads as black market rather than ordinary Joe Shop or Joe Auction.

Open questions:
- Awaiting user approval before writing any Dev-facing instruction to use this asset.

## 2026-06-01 15:31 - Dev 2

Changed:
- Polished the `Настольный` UI player cards by hiding the current-cell ribbon inside score cards.
- Recolored the tabletop roll/action button from cyan to a warmer orange-gold fantasy treatment, including hover/active states.
- Bumped the CSS cache key to `20260601-0285`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- In-app browser check confirmed `body[data-ui-style="tabletop"]`, stylesheet `./styles.css?v=20260601-0285`, `.score-cell-ribbon` computed as `display: none`, and `#rollBtn` using the new orange gradient.

Open questions:
- None.

## 2026-06-01 15:30 - Dev

Changed:
- Replaced the `Аукцион Лавки Джо` tile icon treatment with dedicated PNG `assets/icons/joe_auction_512.png`.
- Removed the old composite auction icon presentation based on `joes_shop_512.png` plus coin overlay.
- Bumped JS/CSS cache keys to `20260601-0284`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`
- `outputs/joe-auction-tile-check.png`

Notes for others:
- No `joe-auction` mechanics, placement, bid options, tie roll-off, bot scoring, History/Chronicle labels, or tooltip text were changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser check on field2 confirmed cell `6-7` is `tile-joe-auction`, loads `./assets/icons/joe_auction_512.png?v=20260601-0284` at 512x512, keeps the existing tooltip, and remains visually distinct from ordinary Joe Shop / Big Rest / TADAM / Chaos Portal icon sources.

Open questions:
- None.

## 2026-06-01 15:26 - Art / UI

Changed:
- User approved writing the `Аукцион Лавки Джо` icon instruction for Dev.
- Added a Dev inbox task to replace the current auction tile icon treatment with `joe_auction_512.png` / `joe_auction_1254.png`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev-facing notes should continue to be written only after user approval.
- The task is asset-only: no `joe-auction` mechanics, placement, bid options, tie roll-off, bot scoring, History, Chronicle, or tooltip changes.

Open questions:
- None.

## 2026-06-01 15:24 - Dev

Changed:
- Replaced the CSS-drawn `Большой привал` tile icon with the fire-focused PNG `assets/icons/big_rest_fire_512.png`.
- Removed the old CSS tent/fire sub-shapes for that tile icon.
- Bumped JS/CSS cache keys to `20260601-0283`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- No `big-rest` mechanics, rewards, placement, History/Chronicle labels, or tooltip text were changed.
- `node --check src/game.js` and `git diff --check` pass.
- Browser check on field2 confirmed cell `12-0` is `tile-big-rest`, loads `./assets/icons/big_rest_fire_512.png` at 512x512, keeps the existing tooltip, and does not use the shop/TADAM/chaos portal icon classes.

Open questions:
- None.

## 2026-06-01 15:23 - Art / UI

Changed:
- Generated a dedicated `Аукцион Лавки Джо` icon asset.
- Saved transparent PNG variants: high-res `joe_auction_1254.png` and tile-friendly `joe_auction_512.png`.

Files:
- `assets/icons/joe_auction_source.png`
- `assets/icons/joe_auction_1254.png`
- `assets/icons/joe_auction_512.png`
- `project-memory/updates.md`

Notes for others:
- Per user instruction, no Dev inbox/task note was added without approval.
- The icon uses a large auction gavel, three shop-card lots, coins, and a small Joe-shop-style sign/accent so it reads as an auction rather than an ordinary shop.

Open questions:
- Awaiting user approval before writing any Dev-facing instruction to use this asset.

## 2026-06-01 15:20 - Art / UI

Changed:
- User approved writing the `Большой привал` fire-icon instruction for Dev.
- Updated the Dev inbox task to use `big_rest_fire_512.png` / `big_rest_fire_1254.png` instead of the earlier tent version.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Dev-facing notes should continue to be written only after user approval.

Open questions:
- None.

## 2026-06-01 15:18 - Art / UI

Changed:
- Redrew the `Большой привал` icon as a more readable fire-focused variant with no tent.
- Saved transparent PNG variants: high-res `big_rest_fire_1254.png` and tile-friendly `big_rest_fire_512.png`.

Files:
- `assets/icons/big_rest_fire_source.png`
- `assets/icons/big_rest_fire_1254.png`
- `assets/icons/big_rest_fire_512.png`
- `project-memory/updates.md`

Notes for others:
- Per user instruction, no Dev inbox/task note was added without approval.
- The new variant emphasizes a large campfire, stone ring, logs, small bedroll/backpack/sign details, and golden beneficial glow.

Open questions:
- Awaiting user approval before writing any Dev-facing instruction to use this variant.

## 2026-06-01 14:58 - Art / UI

Changed:
- Generated a dedicated `Большой привал` icon asset in the existing hand-painted board-game style.
- Saved transparent PNG variants for Dev: high-res `big_rest_1254.png` and tile-friendly `big_rest_512.png`.
- Added a Dev inbox task to replace the current CSS-drawn `big-rest` tile icon with the new PNG without changing event rules or placement.

Files:
- `assets/icons/big_rest_source.png`
- `assets/icons/big_rest_1254.png`
- `assets/icons/big_rest_512.png`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- The icon uses a cozy campfire/tent/bedroll/backpack composition with a golden beneficial aura, intended to read as rest/preparation and not as Joe Shop, TADAM, or portal.
- `big_rest_source.png` is the chroma-key source; use the transparent PNGs in game UI.

Open questions:
- None.

## 2026-06-01 11:08 - Dev 2

Changed:
- Implemented and verified the new field wow moment `big-rest` / `Большой привал`.
- Placed `Большой привал` only on field2 at `12-0`, replacing the previous `good` cell; field1 was not changed.
- Added the camp-style tile icon/CSS, tooltip/field text, History field label, Chronicle logs, and the landing choice flow.
- Added the three landing-player-only rewards: `Восстановиться` gives +15 coins, `Потренироваться` gives permanent `Сила +1`, and `Ускориться` gives permanent `Шаги +2`.
- Added smart-random bot scoring for `big-rest`: bots weigh money reserve, monster/final gate pressure, speed/strength balance, catch-up pressure, and race-to-finish context.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser smoke on field2 confirmed exact landing on `12-0`, all three human choices, landing-player-only rewards, bot auto-choice, `Шаги +2` affecting subsequent dice movement, `Сила +1` affecting a final-monster battle, and strength flowing into the final battle bonus pipeline.
- Source audit confirmed VS uses the same `rollPlayerBattlePower` / `playerCombatBonus` path as the other battle modes, so the permanent `Сила +1` applies there too.
- `node --check src/game.js`, `node --check src/game.config.js`, and `git diff --check` pass.

Open questions:
- None.

## 2026-06-01 11:04 - Dev

Changed:
- Completed browser smoke verification for `joe-auction` / `Аукцион Лавки Джо` after the earlier implementation.

Files:
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` still pass.
- Browser smoke on field2 confirmed: exact move to `6-7`, tile/tooltip rendering, all-pass outcome, one clear human winner, human winner card choice, tied bids with 1d6 roll-off, bot winner card choice, passers/losers paying 0, and only the final winner paying the bid and receiving exactly 1 Joe Shop card.

Open questions:
- None for the auction implementation.

## 2026-06-01 02:03 - Dev 3

Changed:
- Added the new field event `black-market` / `Черный рынок` on field 2 at `5-0`, replacing the previous normal Joe Shop cell.
- Implemented landing-only Black Market choices:
  - `Карта Лавки Джо` for 5 coins, revealing and granting exactly 1 random Joe Shop card.
  - `Тайная тренировка` for 10 coins, granting permanent `Сила +1`.
  - `Зелье ярости` for 15 coins, granting one-use `+10` in the next ordinary/final monster gate battle.
  - `Уйти` for 0 coins.
- Paid Black Market choices are shown only when affordable; `Зелье ярости` is hidden while the player already has an active one-use potion.
- Added potion consume logic to monster gate battles only, with formula/log text `+10 зелье ярости`; it burns on the next monster battle whether the player wins or loses.
- Confirmed the potion does not affect VS or the final players-vs-boss battle.
- Added Black Market bot scoring using existing smart-random/reserve-coin/monster-gate-pressure patterns.
- Added Black Market tile tooltip, history field label, CSS-only tent/lantern tile icon, dark-market choice styling, and compact active potion badges in player/action UI.
- Bumped JS/CSS cache keys to `20260601-0282`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Browser smoke covered 9 scenarios: all 4 human choices, insufficient coins, bot auto-choice, Joe Shop card cost/card count, permanent training, rage potion purchase, ordinary monster win/loss burn, final monster gate burn, VS ignored potion, and final players-vs-boss battle ignored potion.
- Smoke screenshots saved at `outputs/black-market-field2.png` and `outputs/black-market-choice.png`.

Open questions:
- None.

## 2026-06-01 01:54 - Dev

Changed:
- Added the new field event `joe-auction` / `Аукцион Лавки Джо`.
- Placed `joe-auction` on field2 at `6-7`, replacing the previous ordinary Joe Shop cell; field1 was not changed.
- Added tile icon/style, tooltip/field text, History field label, and bot cell scoring for the auction.
- Implemented landing-only auction flow with 3 unique revealed Joe Shop cards, closed bids `0/5/10/15/20`, all-pass outcome, highest-bid winner, 1d6 tie roll-off, and winner card choice.
- Preserved the economic contract: bids do not charge during selection, passers/losers pay nothing, and only the final winner pays the winning bid before receiving exactly one Joe Shop card.
- Bot bidding uses smart-random over current shop-card valuation, coin reserve pressure, comeback pressure, gate pressure, and personality modifiers; bot prize choice uses existing shop-card scoring without decline.
- Bumped JS/CSS cache keys to `20260601-0281`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Browser check confirmed field2 cell `6-7` renders as `tile-joe-auction` with the correct tooltip.
- Full browser smoke through every auction branch still needs a cleaner debug path or careful manual run; exact-move smoke is slowed by legitimate monster gates and intervening prompts.

Open questions:
- Add a temporary/local-only debug harness for event-branch smoke tests, or verify the remaining auction branches manually in browser.

## 2026-06-01 01:45 - GD

Changed:
- Turned the proposed wow moment `Черный рынок` into an implementation-ready Dev task.
- Spec defines a landing-player-only market with deals for 5/10/15 coins, including the requested `15 монет -> +10 к силе в следующей битве с монстром`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Suggested internal id: `black-market`.
- `Зелье ярости` should be a one-use stored effect for the next ordinary/final monster gate battle only; it should not affect VS or the player-vs-boss final battle.
- First playtest placement: replace field 2 `5-0`, currently a normal Joe Shop, to keep shop-like event density stable.

Open questions:
- After implementation, verify whether `+10` for 15 coins is too reliable on the final monster gate or if the price/effect needs tuning.

## 2026-06-01 01:41 - Dev 3

Changed:
- Added a new TADAM card `Охота на монстра`: after the card is active, a player who defeats a monster receives 15 coins.
- Implemented the card as effect type `monster-win-coins` with amount `15`, applying to ordinary monster victories and final monster victories.
- Synced the card across Google Sheet `Cards Config` tab `tadam`, `src/cards.config.js`, and `cards-google-sheet.csv`.
- Bumped the game/card cache keys to `20260601-0281`.

Files:
- `index.html`
- `src/game.js`
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js`, `node --check src/cards.config.js`, and `git diff --check` pass.
- Browser smoke confirmed the page loads the new game/card cache keys, the new TADAM card is present, and a monster victory with active `Охота на монстра` logs/grants the 15-coin reward.

Open questions:
- None.

## 2026-06-01 01:38 - Art / UI

Changed:
- Reviewed the updated dark tabletop UI in browser.
- Added a Dev prompt focused on making `#rollBtn` bright and attractive while fitting the dark fantasy board-game style.
- Included secondary action-strip polish notes so the current cell/status/button area feels like one fantasy tabletop control bar.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Diagnosis: dark UI works overall, but the roll button still reads too much like a modern cyan web CTA.
- Direction: enchanted dice artifact / rune plaque with deeper teal core, antique gold rim, warm ivory text, violet shadow, tactile pressed states, and no layout drift.

Open questions:
- None.

## 2026-06-01 01:28 - Dev 3

Changed:
- Implemented the Art/UI dark fantasy `Настольный` skin as a CSS-only tabletop override.
- Converted the page/table, panels, settings, score cards, TADAM empty slots, Chronicle, and History to dark walnut / smoky violet graphite surfaces with antique gold borders and warm ivory text.
- Kept the board and route tiles bright/readable while giving the map frame a darker tabletop surround.
- Strengthened `#rollBtn` as the brightest teal-blue CTA with a gold rim, including hover/disabled states.
- Preserved the dedicated chaos portal icon and violet/gold glow on the darker UI.
- Bumped JS/CSS cache keys to `20260601-0278`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `git diff --check` passes. JS gameplay was not changed for this skin pass.
- Desktop 1440px tabletop/classic rect comparison stayed at `0` drift for app shell, play area, board/map, roll button, score strip, settings, TADAM, Chronicle, and History.
- Mobile touch 390px check confirmed the roll button is below the board/map, visible, and hit-testable.
- Browser screenshots saved at `outputs/dark-fantasy-tabletop-desktop.png`, `outputs/dark-fantasy-tabletop-mobile.png`, and `outputs/dark-fantasy-mobile-rollbtn.png`.

Open questions:
- None.

## 2026-06-01 01:27 - GD

Changed:
- Turned the proposed wow moment `Аукцион Лавки Джо` into an implementation-ready Dev task.
- Spec defines a safe participation auction: all players can bid, losers/passers pay nothing, and only the final winner pays the winning bid.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Suggested internal id: `joe-auction`.
- First playtest placement: replace field 2 `6-7`, currently a normal Joe Shop, to keep shop-like event density stable.
- Auction uses 3 revealed Joe Shop cards and sealed fixed bids `0/5/10/15/20`; ties above 0 resolve by roll-off.

Open questions:
- After implementation, check if max bid `20` is too high or if the auction needs a lower cap such as `15`.

## 2026-06-01 01:19 - Art / UI

Changed:
- Reviewed the updated tabletop UI in browser after the recent portal/TADAM/control changes.
- Added a Dev prompt to turn `Настольный` UI into a dark fantasy tabletop skin while keeping the board bright and preserving the stabilized layout geometry.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Direction: dark walnut/charcoal/violet UI shell, antique gold borders, ivory text, bright readable board, `#rollBtn` as the strongest CTA.
- The task explicitly asks Dev not to change rules, balance, routes, cards, bots, events, or current control availability.

Open questions:
- Whether dark tabletop should replace the current light `Настольный` skin or eventually become a third UI option.

## 2026-06-01 01:18 - Dev

Changed:
- Updated field 2 to match the latest reference image for `Портал Хаоса` placement.
- Moved chaos portals from `7-10` and `14-6` to `2-8` and `13-7`.
- Restored old chaos-portal cells to the reference types: `7-10` is `Плохо`, `14-6` is `Красное`.
- Bumped JS/CSS cache keys to `20260601-0277`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Browser reload confirmed field 2 has chaos portals at `2-8` and `13-7`; `7-10` renders as bad and `14-6` renders as red.

Open questions:
- None.

## 2026-06-01 01:18 - Dev 3

Changed:
- Replaced the chaos portal tile icon with the dedicated `chaos_portal_1254.png` asset.
- Adjusted the chaos portal icon CSS to use the asset's yellow-violet palette and glow instead of recoloring the old portal art.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Browser check confirmed both visible chaos portal tiles load `./assets/icons/chaos_portal_1254.png?v=20260601-0276` with no broken images.
- Screenshot saved at `outputs/chaos-portal-icon-check.png`.

Open questions:
- None.

## 2026-06-01 01:15 - Dev 2

Changed:
- Polished the `Настольный` UI skin without changing stable layout dimensions: stronger fantasy roll/action button, more printed-card material on panels, clearer player-card accents, and stronger empty TADAM card slots.
- Kept the tabletop/classic geometry invariant: desktop 1440px rect comparison still shows no drift for key app, board, action, score, settings, and TADAM blocks.
- Fixed manual `Пройти` / `Идти` movement so a completed exact move now finishes the turn and changes the active player using the same movement-turn completion path as normal dice movement.
- Bumped JS/CSS cache keys to `20260601-0276`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js`, `node --check src/game.config.js`, and `git diff --check` pass.
- Browser verification: desktop tabletop/classic rect diff max is `0`; `Далее` remains visible/hit-testable; exact move test changed active player from `Пес` to `Кот` after `Идти` and `Далее`; mobile touch width stays at `390px` with the roll button below the board.
- Saved QA screenshots under `outputs/tabletop-polish-desktop.png` and `outputs/tabletop-polish-mobile.png`.

Open questions:
- None.

## 2026-06-01 01:15 - Art / UI

Changed:
- Generated a distinct `Портал хаоса` icon asset that does not reuse the visual language of the ordinary blue stone portal.
- Saved transparent PNG variants for Dev: high-res `chaos_portal_1254.png` and tile-friendly `chaos_portal_512.png`.
- Added the asset paths to the existing Dev task for `Портал хаоса`.

Files:
- `assets/icons/chaos_portal_source.png`
- `assets/icons/chaos_portal_1024.png`
- `assets/icons/chaos_portal_1254.png`
- `assets/icons/chaos_portal_512.png`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- The final icon uses a violet/gold jagged rift plus a die cue, intentionally avoiding the existing blue/cyan stone-arch portal style.
- `chaos_portal_source.png` is the chroma-key source; use the transparent PNGs in game UI.

Open questions:
- Whether Dev should use the 512 or 1254 variant in the field tile renderer.

## 2026-06-01 01:07 - Dev

Changed:
- Replaced the `Проход` dropdown with a single unchecked checkbox: `Проходить все`.
- Removed the `Монстры не останавливают` option and its separate behavior path.
- Kept default movement rules when the checkbox is off; when on, pass-through-all behavior still skips stopping-cell effects such as Joe Shop and enemies.
- Bumped JS/CSS cache keys to `20260601-0276`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Browser reload confirmed `#passThroughMode` is an unchecked checkbox labeled `Проходить все`, and the old `Монстры не останавливают` text is gone.

Open questions:
- None.

## 2026-06-01 00:57 - GD

Changed:
- Turned the proposed wow moment `Большой привал` into an implementation-ready Dev task.
- Spec defines a landing-player-only choice between `+15 монет`, permanent `+1 к силе`, and permanent `+2 к скорости/шагам`.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Suggested internal id: `big-rest`.
- First playtest placement: replace field 2 `12-0` currently `good`; this places the rest after `монстр 3` and before the late red/bad canyon/final push.
- `+2 к скорости` should use the existing permanent step/movement bonus system, currently surfaced as `Шаги +N`.

Open questions:
- After implementation, test whether `+2 к скорости` is too strong compared with `+1 к силе` and `+15 монет`.

## 2026-06-01 00:56 - Dev 3

Changed:
- Added a new field event type `chaos-portal` / `Портал хаоса`, separate from opened-monster portals.
- Placed chaos portals on field2 at `7-10` and `14-6`, replacing the previous `bad` and `red` cells.
- Added chaos portal UI: reused portal art with separate cyan/purple glow, tile title, field text, and history field label.
- Implemented the chaos portal landing flow: prompt, 1d6 roll, branches `1-2` previous monster/start, `3-4` nearest Joe Shop, `5` nearest TADAM, `6` player choice.
- Teleports are instant jumps, clear walk path, pulse the destination, avoid pass-through effects, process the destination landing once, and guard against portal-to-portal chains.
- Added Chronicle logs for portal roll and destination.
- Added bot scoring for roll `6`, preserving smart-random choice style while valuing Joe Shop, TADAM comeback, and monster/start escape differently.
- Bumped JS/CSS cache keys to `20260601-0275`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Browser smoke on field2 covered both chaos portal cells, roll branches `1-2`, `3-4`, `5`, human `6` choice, bot `6` auto-choice, and a separate old opened-monster portal activation after both players opened `монстр 1`.
- Smoke screenshot saved at `outputs/chaos-portal-smoke.png`.

Open questions:
- None.

## 2026-06-01 00:50 - Art / UI

Changed:
- Reviewed the new `Настольный` UI in the in-app browser against the style direction: board-game "Большая Бродилка" plus bright fantasy.
- Added a Dev 2 prompt for tabletop UI polish focused on the roll/action button, player score cards, tabletop panel material, TADAM empty card slots, and future `Портал хаоса` visual direction.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- The prompt explicitly preserves current rules, balance, board routes, bot logic, and the recent no-layout-drift invariant between `Настольный` and `Классический`.

Open questions:
- Whether Dev 2 should implement the UI polish before or after the `Портал хаоса` gameplay task.

## 2026-06-01 00:42 - Dev 2

Changed:
- Softened the `Настольный` UI palette so the new skin is less bright and less saturated.
- Removed the tabletop font/layout drift: the new theme no longer changes the measured sizes of the main app shell, play area, board header, map, score cards, settings, or roll/action button compared with `Классический`.
- Kept wide score cards in the same side-panel placement as the classic layout.
- Made the roll/action button explicitly visible in tabletop mode so `Далее` renders with contrast when the button label changes.
- Bumped CSS/JS cache keys to `20260601-0274`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js`, `node --check src/game.config.js`, and `git diff --check` pass.
- Browser verification: at 1440px, tabletop/classic key element rects match exactly; `#rollBtn` with text `Далее` is visible and hit-testable; mobile touch viewport stays at document width 390px with the roll button below the board.

Open questions:
- None.

## 2026-06-01 00:40 - GD

Changed:
- Turned the proposed wow moment `Портал хаоса` into an implementation-ready Dev task.
- Spec includes roll table, teleport behavior, bot choice for result 6, UI/Chronicle needs, first field 2 placement, and verification notes.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Internal event id should be distinct from existing opened-monster portals; suggested `chaos-portal`.
- First playtest placement: replace field 2 `7-10` bad and `14-6` red with `Портал хаоса`.

Open questions:
- After implementation, test whether two chaos portals is enough frequency or whether field 2 wants only one.

## 2026-06-01 00:27 - Dev

Changed:
- Tuned bot AI scoring after the GD audit without changing rules, cards, monster values, costs, or dice math.
- Joe Shop bot scoring now values `+1 к силе` more when an unbeaten monster gate is ahead, especially for damage 16 and the final monster.
- Added win-chance threshold scoring around ~35%, 50%, 65%, and 80% for strength and extra-die decisions.
- Added stronger diminishing returns for repeated `+1 к шагам`, especially when a low-strength bot is approaching a hard monster.
- Made `+1 кубик за 5` more conservative for ordinary movement and more chance-driven in monster/final-monster battles.
- Added reserve-coin pressure to shop decline decisions.
- Cached a bot's Joe Shop choice per offer so it cannot decline on the first reveal and reconsider on the follow-up reveal.
- Bumped JS/CSS cache keys to `20260601-0273`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Ran a 4-bot fast field 2 party in the browser. Result: Kот won after clearing the final monster with `Шаги +3`, `Сила +1`; Выдра ended `Шаги +1`, `Сила +2`; Альпака ended `Шаги +1`, `Сила +1`; no bot repeated the audited failure pattern of `Шаги +4` with `Сила +0` before hard gates.

Open questions:
- More long-run bot telemetry would still be useful before final balance, because smart-random can produce outlier parties.

## 2026-06-01 00:12 - GD

Changed:
- Ran a broader gameplay audit from current rules/config: field 2 route, event density, cards, monster gates, VS, final battle, History, and recent bot-playtest evidence.
- Added Dev-facing follow-ups for balance telemetry, optional monster checkpoint mode, and a future Events deck prototype.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Field 2 route has 115 cells: 18 Good, 24 Green, 9 TADAM, 4 Shop, 4 Enemy, 26 Red, 26 Bad, 1 VS, 1 x2 coins, 1 Dice Fortune.
- GD diagnosis: the game has strong chaotic adventure texture, but needs more mid-term agency, better balance observability, and a way to test whether full-start monster resets are too punishing in late game.
- Do not implement checkpoint mode or Events deck without user confirmation; telemetry is safe and useful regardless.

Open questions:
- Which experiment should be prioritized after bot AI: telemetry, checkpoint mode, Events deck, or shop deck expansion.

## 2026-06-01 00:08 - Dev 2

Changed:
- Added a `UI` selector with `Настольный` default and `Классический` fallback.
- Added `body[data-ui-style]` theme switching; changing UI style does not restart the game.
- Added a first-pass `Настольный` CSS layer with parchment panels, illustrated-board framing, tabletop buttons, light player cards, and current-cell ribbons visible only in the new UI.
- On wide tabletop layout, player cards move into the settings column between top controls and numeric setup controls.
- Added `uiStyle` to collected game settings and bumped JS/CSS cache keys to `20260531-0272`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `Классический` is intended to preserve the current dark UI.
- Built on top of existing uncommitted History/Google Sheets/field/config/GD notes changes; do not revert them.

Open questions:
- Art/UI can replace the v1 CSS approximation with dedicated parchment/tile/button assets later.

## 2026-06-01 00:05 - GD

Changed:
- Audited current bot scoring logic in `src/game.js` and watched a full 4-bot fast field 2 party in browser.
- Added a Dev-ready bot AI tuning task focused on shop card valuation, strength-vs-steps balance, coin reserves, and optional extra-die spending.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Playtest evidence: a bot with `Шаги +4` and `Сила +0` failed `монстр 3` six times and never cleared it; the winner had `Сила +3` and cleared the final monster.
- Design direction: keep smart-random personalities, but make bots value strength as a monster-gate insurance purchase and spend optional extra dice conservatively outside battles.
- Browser screenshot from the observed party was saved at `outputs/bot-audit-party-1.png`.

Open questions:
- After Dev tunes bot AI, run another 4-bot field 2 party and compare repeated step stacking, coin reserves, and monster clear rates.

## 2026-05-31 23:51 - GD

Changed:
- Accepted fresh GD handoff context about bot decision logic, future Event cards, final scoring, and battle UI direction.
- Added two implementation-ready Dev tasks: stable per-visit Joe Shop bot decision and enemy battle UI polish without rule changes.

Files:
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Bot choices should stay smart-random, not deterministic-optimal.
- Event cards are a design direction, not yet a Dev-ready implementation request.
- Before documenting final scoring, re-check current code because position bonuses may now be included.

Open questions:
- Which first 3-5 Event cards should enter the prototype once the user wants that mechanic implemented.

## 2026-05-31 23:45 - Dev

Changed:
- Updated field 2 event layout to match the new 15x15 reference image.
- Preserved the existing field 2 route and monster/final monster positions.
- Bumped JS/CSS and `game.config.js` import cache keys to `20260531-0271`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Browser reload confirmed field 2 renders as 15x15 with start at `0-14`, VS at `0-9`, and enemies at `1-0`, `8-9`, `9-14`, `10-6`.

Open questions:
- None.

## 2026-05-31 23:36 - Dev

Changed:
- Added new TADAM rule: the player who opens a TADAM card immediately gains 5 coins.
- The coin gain uses `addCoins`, so it updates coin floats and History earned-coins stats.
- Bumped JS/CSS cache keys to `20260531-0270`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 22:57 - Dev

Changed:
- Renamed field 2 ordinary monster labels from `нижний монстр`, `средний монстр`, `верхний монстр` to `монстр 1`, `монстр 2`, `монстр 3`.
- Portal choices use the same door labels, so opened portal choices now use the new monster names too.
- Added a cache key to the `game.config.js` import and bumped JS/CSS cache keys to `20260531-0269`.

Files:
- `index.html`
- `src/game.js`
- `src/game.config.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` passes.
- Search found no remaining `нижн/средн/верхн` labels in `src/game.config.js` or `src/game.js`.

Open questions:
- None.

## 2026-05-31 22:39 - Dev 2

Changed:
- Bot Joe Shop card choices now run through the same selected-card glow animation as human choices.
- Added a small helper to map the bot's chosen card id back to the visible card button before resolving the prompt.
- Bumped JS/CSS cache keys to `20260531-0268`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Declines still close immediately; the glow applies when a bot chooses one of the visible cards.

Open questions:
- None.

## 2026-05-31 22:36 - Dev 2

Changed:
- Made `Поле 2` the default board in the board selector.
- Updated JS board fallback paths so initial load, new game, and settings snapshots default to `field2`.
- Bumped JS/CSS cache keys to `20260531-0267`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Built on top of existing local Chronicle/History save changes, Google Sheets save wiring, and selected-card animation.

Open questions:
- None.

## 2026-05-31 22:35 - Dev

Changed:
- Connected the `Сохранить` history button to the provided Google Apps Script Web App URL.
- Save now writes the snapshot to localStorage first, then sends the same snapshot to Google Sheets using a no-CORS POST.
- Save button shows `Отправка`, `Сохранено`, `Локально`, or `Ошибка` depending on the save path.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Because the browser uses `mode: "no-cors"`, success means the request was sent, but the app cannot inspect the Apps Script JSON response.

Open questions:
- Confirm rows appear in the Google Sheet after clicking `Сохранить`.

## 2026-05-31 22:31 - Dev 2

Changed:
- Added a light selected-card animation for choosing one of several revealed Joe Shop cards.
- The selected shop card briefly glows around the contour while other choices dim/lock before the prompt closes.
- Bumped JS/CSS cache keys to `20260531-0266`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Built on top of existing local Chronicle/History save changes.

Open questions:
- None.

## 2026-05-31 22:23 - Dev

Changed:
- Added a `Сохранить` button to the `История` block.
- Saving creates a party snapshot in browser `localStorage` under `very-big-adventure.saved-games`.
- Snapshot includes save time, started/current settings, game state, players, full history stats, and current Chronicle text.
- Saved games are kept as a local archive capped at 50 snapshots.
- Bumped JS/CSS cache keys to `20260531-0265`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- This is the local-save layer; Google Sheets can use the same snapshot payload later via Apps Script.

Open questions:
- None.

## 2026-05-31 22:12 - Dev

Changed:
- Fixed Chronicle ordered-list numbering so two-digit markers are not clipped in expanded view.
- Bumped JS/CSS cache keys to `20260531-0264`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- CSS-only fix; no JS behavior changed.

Open questions:
- None.

## 2026-05-31 17:27 - Dev

Changed:
- Chronicle now shows 5 latest events by default.
- Added a `Показать 20` / `Показать 5` toggle in the Chronicle header.
- Expanded Chronicle view shows up to 20 latest events while the internal log still keeps up to 40 entries.
- Bumped JS/CSS cache keys to `20260531-0263`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.

Open questions:
- None.

## 2026-05-31 17:23 - Dev

Changed:
- Changed `История` field stats to count only fields where a player stops, not every field passed through.
- Split history movement tracking into passed-cell totals and stopped-field visits.
- Bumped JS/CSS cache keys to `20260531-0262`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 13:54 - Dev

Changed:
- Added a new `История` block below `Хроника`.
- Added game history state with elapsed game time, total played TADAM cards, and per-player stats.
- Per-player history now tracks turns, passed cells, coins earned/spent, field visits by type, max Joe Shop cards, current Joe Shop cards, monster battle attempts and winning force, effects received from other players, max dice thrown, final strength, and final steps.
- Hooked history counters into movement, rolls, coins, TADAM, Joe Shop cards, monster battles, portals, steal/give effects, and player-targeting card effects.
- Backward movement records each traversed route cell for field-visit stats instead of repeating only the final cell.
- Bumped JS/CSS cache keys to `20260531-0261`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` and `git diff --check` pass.
- Browser visual verification was not run in this turn.

Open questions:
- None.

## 2026-05-31 12:39 - Dev

Changed:
- Removed the current-cell pill from player score cards.
- Changed score-card header alignment back to left-packed, so player names sit closer to avatars.
- Bumped JS/CSS cache keys to `20260531-0260`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 04:42 - Dev

Changed:
- Adjusted the bot-control lock so disabled `Далее` / `Бросить кубик` blocks human clicks/Enter but still allows bot auto-actions.
- Bot roll starts now call the shared button action with an internal `fromBot` flag.
- Bumped JS/CSS cache keys to `20260531-0259`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 04:36 - Dev 2

Changed:
- On touch-phone layout, top player card bonus chips now show compact labels `Ш +N` and `С +N` instead of `Шаги +N` and `Сила +N`.
- Desktop/Codex layouts keep the full labels.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- There were already local uncommitted `0258` cache and bot-control lock changes in `index.html`/`src/game.js` before this update.

Open questions:
- None.

## 2026-05-31 04:35 - Dev

Changed:
- Added a bot-control lock so the main `Далее` / `Бросить кубик` button is disabled while a bot owns the current prompt or turn.
- Guarded the button handler too, so click/Enter cannot manually advance bot prompts.
- Bumped JS/CSS cache keys to `20260531-0258`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 04:23 - Dev 2

Changed:
- Tightened the touch-phone enemy battle HUD further so the result row and duel cards fit inside the board overlay.
- On touch phones, the `Настройки` button is visually shortened to `Настр.` without changing the desktop/Codex label.
- Kept the existing local cache key `20260531-0257`.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- There were already local uncommitted `Скорость ботов` changes in `index.html`, `src/game.js`, and this updates file before this entry.

Open questions:
- None.

## 2026-05-31 04:20 - Dev

Changed:
- Added a settings dropdown `Скорость ботов` with `Стандартно` default and `Быстро`.
- In fast bot speed mode, bot thinking delays return `0`, so choices, card actions, pre-roll decisions, and prompt confirmations happen as fast as the current animations allow.
- Bumped JS/CSS cache keys to `20260531-0257`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 03:59 - Dev 2

Changed:
- On touch phones, card reveal prompts for Good/Bad/TADAM/Joe Shop now use fixed positioning in the center of the visible screen.
- Kept desktop/Codex reveal positioning unchanged by keeping the rule scoped to the phone-only touch media query.
- Bumped JS/CSS cache keys to `20260531-0256`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- This replaces the previous phone-only bottom anchoring for reveal cards.

Open questions:
- None.

## 2026-05-31 03:56 - Dev 2

Changed:
- On touch phones, card reveal prompts for Good/Bad/TADAM/Joe Shop now anchor to the bottom of the board instead of appearing high over the playfield.
- Kept the existing desktop/Codex reveal positioning unchanged by scoping the rule to `@media (max-width: 680px) and (hover: none) and (pointer: coarse)`.
- Bumped JS/CSS cache keys to `20260531-0255`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- This builds on the previous phone-only compact enemy battle HUD change in the same local commit.

Open questions:
- None.

## 2026-05-31 03:53 - Dev 2

Changed:
- Added phone-only compact enemy battle HUD rules so battle UI fits inside the visible board area on touch phones.
- On phones, enemy battle HUD anchors near the bottom of the board and uses smaller cards, portraits, VS marker, strength chip, and result text.
- Bumped JS/CSS cache keys to `20260531-0254`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Rules are inside `@media (max-width: 680px) and (hover: none) and (pointer: coarse)`, so Codex/desktop layouts are not targeted.

Open questions:
- None.

## 2026-05-31 03:48 - Dev 2

Changed:
- Restricted the phone-only layout to touch devices: `max-width: 680px` plus `hover: none` and `pointer: coarse`.
- This prevents the mobile TADAM/settings order and under-board roll button from applying to narrow Codex/desktop windows.
- Bumped JS/CSS cache keys to `20260531-0253`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Do not push yet; user explicitly asked to fix locally first.

Open questions:
- None.

## 2026-05-31 03:43 - Dev 2

Changed:
- On phone-only layout, swapped the mobile order of TADAM and setup/settings so TADAM appears above setup controls.
- Reduced the mobile `Настройки` button text size so it fits in the one-row setup layout.
- Bumped JS/CSS cache keys to `20260531-0252`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- This is limited to `@media (max-width: 680px)` and should not affect desktop/Codex layouts.

Open questions:
- None.

## 2026-05-31 03:34 - Dev 2

Changed:
- Made `Поле 1` the default board again in the board selector and JS fallbacks.
- Bumped JS/CSS cache keys to `20260531-0251`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `Поле 2` remains available in the selector.

Open questions:
- None.

## 2026-05-31 03:28 - Dev 2

Changed:
- Added a phone-only layout at `max-width: 680px` that moves the roll/action button below the board.
- Kept tablet, desktop, and Codex-sized layouts unchanged.
- Bumped JS/CSS cache keys to `20260531-0250`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The mobile board panel uses CSS grid areas with status controls above the map, the map in the middle, and `#rollBtn` below the map.

Open questions:
- None.

## 2026-05-31 03:24 - Dev 2

Changed:
- Reserved bot-label space under every score-card avatar so adding `Бот` does not shift card layout.
- Non-bot cards render an invisible placeholder with the same height.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- This fixes coin/dice rows shifting when bot labels appear.

Open questions:
- None.

## 2026-05-31 03:20 - Dev 2

Changed:
- Final-battle boss strength now renders as plain text instead of a chip.
- Added a reusable text style for battle strength display where chip styling is too heavy.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- VS/enemy battle player strength chips are unchanged.

Open questions:
- None.

## 2026-05-31 03:16 - Dev 2

Changed:
- Moved the `Бот` label under the player avatar on score cards.
- Restyled `Бот` as a small text label instead of a chip to prevent overlap with step/strength chips and the tile label.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Score-card bonus chips remain in the name row; bot status is now part of the avatar column.

Open questions:
- None.

## 2026-05-31 03:14 - Dev

Changed:
- Bot action prompts for enemy battles, field/card effects, VS/final battle, and locked doors now carry explicit `autoFor` where relevant, so bot turns do not wait for a human `Далее`.
- Bot card reveal/apply prompts and card decisions now use faster card timing: about 0.45-0.85 seconds.
- Added a separate fast bot delay for paid extra-die choices before a roll: about 0.25-0.5 seconds.
- Kept normal route choices and roll/result prompts slower so bot turns remain readable.
- Bumped JS/CSS cache keys to `20260531-0249`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 03:02 - Dev 2

Changed:
- Setup controls now place all five controls in one row: `Игроков`, `Ботов`, dice count, `Настройки`, `Новая игра`.
- Narrow layout also keeps the row at five compact columns with smaller button text.
- Bumped JS/CSS cache keys to `20260531-0248`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Removed the previous two-row layout for setup buttons.

Open questions:
- None.

## 2026-05-31 02:59 - Dev

Changed:
- Slowed down bot auto-click timing so bot turns are easier to follow.
- Bot choices now wait about 1.8-2.8 seconds, roll prompts about 1.8-2.8 seconds, and result/`Далее` prompts about 2.2-3.4 seconds.
- Bumped JS/CSS cache keys to `20260531-0247`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser reload confirmed `game.js?v=20260531-0247` and `styles.css?v=20260531-0247` are loaded with no console warnings/errors.
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 02:51 - Dev

Changed:
- Replaced fully random bot choices with lightweight heuristic AI.
- Added bot personalities for Dog, Cat, Otter, and Alpaca that affect risk, economy, shop value, battle preference, progress, and stealing.
- Added scored smart-random choice helpers with noise and occasional near-best picks.
- Added exact dice probability estimation for bot decisions about paying for optional extra dice, especially in monster battles.
- Added heuristic scoring for Joe's Shop cards, shop decline, route/portal choices, card-action choices, leader pressure, and target selection.
- Improved bot action timing ranges and fixed stale bot timers so prompts/choices are re-scheduled reliably.
- Bumped JS/CSS cache keys to `20260531-0246`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Rules, card balance, field events, monster strengths, and dice mechanics were not changed; only bot choice logic changed.
- Browser verification with 4 bots on field1 confirmed bots continued playing, bought/declined shop cards, used optional extra dice, targeted another player with a card, and did not leave choice panels open.
- Browser loaded `game.js?v=20260531-0246` and `styles.css?v=20260531-0246`; console warnings/errors were empty.
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 02:24 - Dev 2

Changed:
- Kept `Настройки` and `Новая игра` in one shared row below the numeric setup controls.
- On narrow layouts, the two buttons now split the row into equal halves instead of stacking vertically.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Numeric setup controls remain in the row above: `Игроков`, `Ботов`, dice count.

Open questions:
- None.

## 2026-05-31 02:21 - Dev 2

Changed:
- Settings top controls now keep the numeric blocks `Игроков`, `Ботов`, and dice count in one row.
- Settings action buttons move below them without widening the UI.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Mobile/narrow layout uses three compact numeric columns and full-width buttons below.

Open questions:
- None.

## 2026-05-31 02:18 - Dev 2

Changed:
- Score-card strength chips are now hidden while the player's strength bonus is zero.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Battle HUD strength chips still show strength during battles.

Open questions:
- None.

## 2026-05-31 02:15 - Dev 2

Changed:
- Restyled score-card step bonus chips to match the quieter strength chip style.
- Step chips still stay hidden while the player has no step bonus.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The score-card logic already hid step bonuses at `0`; this update is visual only.

Open questions:
- None.

## 2026-05-31 02:12 - Dev 2

Changed:
- Battle HUDs now show player strength badges during enemy battles, VS battles, and the final battle.
- Added compact `Сила +N` chips inside battle cards and a final-battle strength list for non-boss players.
- Bumped JS/CSS cache keys to `20260531-0242`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Strength badges use `playerBattleBonus(player)`, so Joe's Shop `+1 к силе` is visible during battles.

Open questions:
- None.

## 2026-05-31 02:08 - Dev 2

Changed:
- Restyled the score-card strength badge to look closer to Joe's Shop item chips with a quieter fill and a slightly brighter player-colored outline.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Step bonus chips keep their previous stronger styling.

Open questions:
- None.

## 2026-05-31 02:05 - Dev 2

Changed:
- Player score cards now always show the current strength badge, including `Сила +0`.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Step badges are still hidden when the step bonus is zero.

Open questions:
- None.

## 2026-05-31 02:01 - Dev 2

Changed:
- Removed the Joe's Shop card text `+1 к броску кубика`.
- Added Joe's Shop cards `+1 к силе` and `+1 к шагам`.
- Added `passive-battle-bonus`; battle strength now uses battle bonuses only, while step bonuses apply to dice-based movement.
- Synced local card config and CSV mirror; bumped JS/cards cache keys to `20260531-0241`.

Files:
- `index.html`
- `src/game.js`
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/updates.md`

Notes for others:
- `+1 к силе` uses `effect.type = passive-battle-bonus` and applies only in enemy/VS/final battle strength.
- `+1 к шагам` uses `effect.type = passive-step-bonus` and applies when movement distance is based on dice rolls.

Open questions:
- Google Sheet canonical source still needs the same card rows if it was not edited separately.

## 2026-05-31 01:52 - Dev 2

Changed:
- Changed the two user-marked bottom-row field2 cells `3-14` and `4-14` from green to `Хорошо`.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The cells were identified from the red rectangle on the screenshot.

Open questions:
- None.

## 2026-05-31 02:34 - Dev

Changed:
- Added a `Ботов` selector next to the player-count setting; bot options are capped by the current player count.
- New games mark the last N players as bots and show a `Бот` badge on their score cards.
- Bots automatically roll on their turns, advance action prompts, make random pre-roll/card/shop/route/portal choices, and can roll automatically during VS/final battle prompts when the prompt belongs to that bot.
- Bumped JS/CSS cache keys to `20260531-0244`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification with 2 bots confirmed they started playing by themselves, drew/applied cards, displayed bot badges, and did not produce console warnings/errors.
- Browser reload confirmed `styles.css?v=20260531-0244`, `game.js?v=20260531-0244`, and the `#botCount` selector are loaded.
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 01:51 - Dev

Changed:
- Compacted the VS player-battle HUD so it fits inside the visible board window.
- Moved the VS HUD to the lower edge of the board and changed player cards from large duel cards to compact horizontal cards.
- Removed trailing periods from VS HUD result messages so no stray dot appears after the coin icon.
- Bumped JS/CSS cache keys to `20260531-0240`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed the VS HUD loads with `game.js?v=20260531-0240` / `styles.css?v=20260531-0240`, the result text no longer ends with a dot, and no console warnings/errors appeared.
- `node --check src/game.js` passes.

Open questions:
- None.

## 2026-05-31 01:42 - Dev 2

Changed:
- Rebuilt `Поле 2` cell events from the user screenshot legend while keeping the existing 15x15 size and route.
- Made `Поле 2` the default board in the settings select and JS fallbacks.
- Moved the field2 middle monster from `8-10` to `8-9`; its door transition now leads to `8-10`.
- Bumped JS/CSS cache keys to `20260531-0239`.

Files:
- `index.html`
- `src/game.js`
- `src/game.config.js`
- `project-memory/updates.md`

Notes for others:
- Static validation confirms field2 has 115 path cells, 115 event cells, no events outside the path, and enemies at `1-0`, `8-9`, `9-14`, `10-6`.
- `10-6` remains the final monster / finish cell.

Open questions:
- None.

## 2026-05-31 01:23 - Dev

Changed:
- Added a VS player-battle HUD using the existing monster-battle overlay style.
- VS battles now show the round, shared bank, all player portraits, current rolling player, per-player strength results, tie rerolls, and the winner.
- Bumped JS/CSS cache keys to `20260531-0237`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification used exact movement to land on the field1 VS cell, confirmed the VS HUD appears during the battle and winner prompt, and found no console warnings/errors.
- `node --check src/game.js` and `node --check src/game.config.js` pass.

Open questions:
- None.

## 2026-05-31 01:14 - Dev 2

Changed:
- Fixed exact movement from the settings `Пройти` control to move exactly the entered number of route steps.
- Exact movement now resolves only the final landing cell, so `22` steps from the shown start position lands on the marked VS cell at `8-3` instead of stopping one cell early.
- Added working convention: red arrows drawn on user screenshots mark the primary cell/UI area to inspect or change.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed `Пройти 22` lands on tile `8-3` (`VS`) and shows the VS prompt.
- Treat future red arrows in screenshots as the user's exact focus marker unless the text says otherwise.

Open questions:
- None.

## 2026-05-31 01:09 - Dev

Changed:
- Replaced the `Монстры не останавливают` checkbox with a three-option pass-through mode select: `По умолчанию`, `Монстры не останавливают`, `Проходить все`.
- `По умолчанию`: pass-through monster victory stops remaining movement, and pass-through shops still trigger.
- `Монстры не останавливают`: pass-through monster victory allows remaining movement to continue.
- `Проходить все`: pass-through monsters and shops do not trigger their effects during movement.
- Bumped JS/CSS cache keys to `20260531-0236`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirms the select exists, defaults to `По умолчанию`, has all three options, and loads `game.js?v=20260531-0236` with no warnings/errors.
- `node --check src/game.js` and `node --check src/game.config.js` pass.

Open questions:
- None.

## 2026-05-31 00:57 - Dev 2

Changed:
- Changed selected-player modifier presets to `+5`, `+50`, `-5`, `-50` for both `Шаги` and `Сила`.
- Removed the `+10` preset.
- Updated modifier preset logic to allow negative values.
- Bumped JS/CSS cache keys to `20260531-0235`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed both modifier rows fit in one line and negative presets update selected player values correctly.

Open questions:
- None.

## 2026-05-31 00:55 - Dev

Changed:
- Added a settings checkbox `Монстры не останавливают`, default off.
- When off, winning a pass-through monster battle stops the remaining movement for ordinary rolls and exact/forced forward movement.
- When on, winning a pass-through monster battle lets the player continue the remaining movement.
- Bumped JS/CSS cache keys to `20260531-0234`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirms the checkbox exists, is unchecked by default, and the page loads `game.js?v=20260531-0234` without warnings/errors.
- `node --check src/game.js` and `node --check src/game.config.js` pass.

Open questions:
- None.

## 2026-05-31 00:48 - Dev 2

Changed:
- Replaced custom amount inputs for selected-player modifiers with preset buttons only: `Шаги +5 +10 +50` and `Сила +5 +10 +50`.
- Added an exact-move cheat row below modifiers with default value `4` and an `Идти` button.
- Exact move uses the active turn player and moves exactly the typed number of steps without dice or movement bonuses.
- Bumped JS/CSS cache keys to `20260531-0233`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed old modifier amount inputs are gone, presets update the selected modifier player, exact move default is `4`, and exact move ignored an existing `Шаги +10` bonus.

Open questions:
- None.

## 2026-05-31 00:45 - Dev

Changed:
- Swapped the highlighted field1 VS and red cells per user correction.
- Field1 `8-3` is now `vs`; field1 `7-4` is now `red`.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser DOM verification confirms `8-3` renders as `tile-vs` and `7-4` renders as `tile-red`.

Open questions:
- None.

## 2026-05-31 00:43 - Dev

Changed:
- Added a new `VS` field type on field1 at `7-4`, replacing the marked red cell.
- Copied the provided VS icon into `assets/icons/vs_1254.png` and wired it into board rendering.
- Restored `8-3` as a red field after briefly placing VS there during implementation.
- Added VS field rules: all players discard up to 10 coins into a shared pot, then all players roll battle strength; the highest strength wins the pot.
- Added tie rerolls among only tied top-strength players.
- Updated battle wording toward the new concepts: battle strength is dice plus bonuses, and monster prompts now refer to strength instead of damage/урон.
- Bumped JS/CSS cache keys to `20260531-0233`.

Files:
- `assets/icons/vs_1254.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirms `7-4` renders as `tile-vs` using `./assets/icons/vs_1254.png?v=20260531-0233`, and `8-3` is red.
- `node --check src/game.js` and `node --check src/game.config.js` pass.

Open questions:
- None.

## 2026-05-31 00:31 - Dev 2

Changed:
- Fixed enemy pass-through handling: entering an enemy cell during ordinary dice movement or forced forward movement now immediately resolves the enemy battle.
- This fixes field2 lower monster not triggering when a player crosses it via a green-field forward movement effect.
- If the battle sends the player away or finishes the game, remaining movement stops; if the player wins and stays on the enemy cell, remaining movement can continue.
- Bumped JS/CSS cache keys to `20260531-0232`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser reload verification passed with `game.js?v=20260531-0232` and no warnings/errors.

Open questions:
- None.

## 2026-05-31 00:26 - Dev

Changed:
- Corrected the previous field1 cell swap.
- Restored red on `7-4`.
- Moved the first field1 monster (`damage: 6`, door `middle`) from `8-3` to `7-9`.
- Changed the old monster cell `8-3` to red.

Files:
- `src/game.js`
- `src/game.config.js`
- `project-memory/updates.md`

Notes for others:
- Browser DOM verification confirms `7-4` is red, `7-9` is enemy with power 6, and `8-3` is red.

Open questions:
- None.

## 2026-05-31 00:03 - Dev

Changed:
- Swapped two field1 cells from the user screenshot: `7-4` is now `tadam`, and `7-9` is now `red`.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser DOM verification on field1 confirms `7-4` renders as `ТАДАМ!` and `7-9` renders as `Красное поле`.

Open questions:
- None.

## 2026-05-30 23:52 - Dev 2

Changed:
- Removed player names from the modifier player cards; they now show avatar plus step/strength values only.
- Swapped modifier controls so `Шаги` appears above `Сила`.
- Prevented modifier player cards from using the global gold button hover fill; hover now preserves the dark card background.
- Bumped JS/CSS cache keys to `20260530-0231`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed control order is `Шаги` then `Сила`, and selected-card hover keeps the same dark background.

Open questions:
- None.

## 2026-05-30 23:47 - Dev 2

Changed:
- Renamed modifier labels from `Бой` to `Сила` and from `Шаг` to `Шаги`.
- Kept 4-player compact modifier cards short as `С +N` / `Ш +N`.
- Put modifier amount inputs and `-` / `+` controls in one horizontal row matching the player modifier row height.
- Changed selected modifier-card styling to use only border/outline highlighting without color-filling the full card.
- Bumped JS/CSS cache keys to `20260530-0229`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed modifier control rows and player-card row are each `58px` tall, controls stay on one line, and selected-card background matches unselected cards.

Open questions:
- None.

## 2026-05-30 23:43 - Dev 2

Changed:
- Added compact 4-player styling for the modifier player row.
- In 4-player games, modifier cards use smaller avatar/text and compact labels `Ш +N` / `Б +N`.
- Bumped JS/CSS cache keys to `20260530-0226`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification with 4 players confirmed all four modifier cards stay in one row without overflow.

Open questions:
- None.

## 2026-05-30 23:39 - Dev 2

Changed:
- Replaced the single active-player modifier status with a compact row of clickable modifier cards for every player in the current party.
- Added selected-player state for step/battle modifier controls; `-` / `+` now apply to the selected modifier card, not the active turn player.
- Highlighted the selected modifier card and kept all modifier cards in one row.
- Bumped JS/CSS cache keys to `20260530-0225`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed selecting player 2 and pressing both `+` buttons updates only player 2 to `Шаг +5` / `Бой +5`; player 1 remains at `0`.

Open questions:
- None.

## 2026-05-30 23:33 - Dev 2

Changed:
- Added step-bonus settings matching the battle-force controls: amount input plus `-` / `+` buttons for the active player.
- Added an active-player status row in settings with avatar, name, current `Шаг` value, and current `Бой` value.
- Step and battle badges still appear next to the player name in score cards only when nonzero.
- Bumped JS/CSS cache keys to `20260530-0224`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed the settings row starts at `Шаг +0` / `Бой +0`, and clicking both `+` buttons updates status and score-card badges to `+5`.

Open questions:
- None.

## 2026-05-30 23:29 - Dev 2

Changed:
- Open portal rendering now removes the monster strength badge from the tile instead of only hiding it.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser reload verification passed with no warnings/errors.

Open questions:
- None.

## 2026-05-30 23:08 - Dev 2

Changed:
- Fixed regular enemy battles to include the player's full combat bonus: passive step bonus plus battle-force bonus.
- Fixed normal movement to use only passive step bonus, so battle-force edits no longer change walk distance.
- Fixed boss final-battle modifier setup to include battle-force bonus alongside passive step bonus.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser reload verification passed with no warnings/errors.

Open questions:
- None.

## 2026-05-30 23:01 - Dev 2

Changed:
- Moved the battle-force bonus display from score stats to a small badge next to the player's name.
- Hidden the battle-force badge when the player's battle bonus is `0`.
- Made `field1` the default board in the board selector and JS fallback.
- Bumped JS/CSS cache keys to `20260530-0223`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed default board is `field1`, the rendered board is 10x10, and no battle bonus badges render at `0`.

Open questions:
- None.

## 2026-05-30 22:56 - Dev 2

Changed:
- Added the new portal image as `assets/icons/portal_1254.png`.
- Open portal cells now replace the defeated monster icon with the portal icon and hide the monster strength badge.
- Bumped JS/CSS cache keys to `20260530-0222`.

Files:
- `assets/icons/portal_1254.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Portal travel logic is unchanged; this update is visual only.

Open questions:
- None.

## 2026-05-30 22:52 - Dev

Changed:
- Added battle-force controls to settings: a numeric amount input defaulting to 5 and `-` / `+` buttons for the active player.
- Added per-player `battleBonus`, shown in score cards as `Бой +N`.
- Included battle bonus in regular enemy battles and final-battle rolls, alongside existing passive step bonuses.
- Updated bonus text formatting so negative battle bonuses display cleanly.
- Bumped `index.html` stylesheet and game script cache keys to `20260530-0197`.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser verification confirmed settings controls exist, default amount is `5`, `+` changes the active player from `Бой +0` to `Бой +5`, and `-` returns it to `Бой +0`.

Open questions:
- None.

## 2026-05-30 22:39 - Dev 2

Changed:
- Continued the interrupted portal rule work from the previous Dev 2 chat.
- Added open portals on monster cells once every current player has defeated that monster.
- Portal cells now ask the moving player to choose any other open portal or skip when stepped on or passed through, then continue remaining forward movement from the chosen portal.
- Added visible portal styling and kept final monster excluded from ordinary portal travel.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `field2` still renders as 15x15 with monsters at `9-14`, `8-10`, `1-0`, and final monster `10-6`.
- Verified switching to `field1` renders 10x10 and browser console has no warnings/errors after reload and board switch.

Open questions:
- None.

## 2026-05-30 21:51 - Dev

Changed:
- Moved field2 monsters to match the latest reference image.
- Field2 monster cells are now `9-14` strength 6, `8-10` strength 10, `1-0` strength 16, and final monster `10-6` strength 24.
- Removed enemy events from the old field2 monster cells `11-11`, `0-9`, and `3-4`.

Files:
- `src/game.js`
- `src/game.config.js`
- `project-memory/updates.md`

Notes for others:
- Browser DOM verification confirms new monster powers and old cells are normal path tiles.
- Field2 monster spacing by route order is now 22, 30, 46 cells between consecutive monsters.

Open questions:
- None.

## 2026-05-30 21:48 - Dev

Changed:
- Removed the remaining extra visual tile on field2 at `14-8`.
- Kept the field2 route unchanged because `14-8` was only in `pathCells`, not in the route.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser DOM verification confirms `14-8` now renders as empty while `14-7` and `14-9` remain path tiles.

Open questions:
- None.

## 2026-05-30 21:46 - Dev

Changed:
- Corrected the field2 final approach to match the original 15x15 reference drawing.
- Restored the lower bridge cells `12-7` and `13-7` that were removed by mistake.
- Removed the actual extra shortcut cell `11-6`.
- Routed the final segment through the drawn central block: `12-7 -> 12-6 -> 12-5 -> 12-4 -> 11-4 -> 10-4 -> 9-4 -> 8-4 -> 8-5 -> 8-6 -> 8-7 -> 9-7 -> 10-7 -> 10-6`.
- Rechecked field2 route continuity; all route steps are adjacent. Field2 monster spacing is now 26, 27, 40 cells.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Previous 21:41 update removed the wrong cells; this entry supersedes that field2 route note.
- Browser DOM verification confirms `11-6` is empty, `12-7` and `13-7` are path tiles, and there are no browser warnings/errors.

Open questions:
- None.

## 2026-05-30 21:41 - Dev

Changed:
- Removed two extra tiles from field2 near the final-monster area: `12-7` and `13-7`.
- Rerouted the final approach through `13-6` so the visible route remains continuous into the final monster.
- Rechecked field2 monster spacing after the change: 26, 27, 28 cells between consecutive monsters.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Browser DOM verification confirmed `12-7` and `13-7` now render as empty tiles and there are no browser warnings/errors.

Open questions:
- None.

## 2026-05-30 21:37 - Dev

Changed:
- Continued the interrupted field-selection work from the previous Dev.
- Added dynamic board grid sizing in CSS so `field1` renders as 10x10 and `field2` renders as 15x15 from `--board-cols` / `--board-rows`.
- Kept `field2` as the default board in settings and added compact icon/token sizing for the 15x15 board.
- Bumped `index.html` stylesheet and game script cache keys to `20260530-0196`.
- Calculated monster spacing by route order: field1 has 10, 12, 9 cells between consecutive monsters; field2 has 26, 27, 30 cells between consecutive monsters.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `src/game.config.js`
- `project-memory/updates.md`

Notes for others:
- In-app Browser blocked direct navigation to local `127.0.0.1`; verification used `node --check`, local server `curl`, and route/config calculations instead.

Open questions:
- None.

## 2026-05-25 22:38 - Dev

Changed:
- Made green/red field coin rules permanent again: green always gives `+3`, red always takes `-3`.
- Removed starter TADAM display cards from the initial TADAM panel.
- Removed `green-coins` and `red-coins` from the TADAM deck locally and from Google Sheet `Cards Config` tab `tadam`.
- Removed TADAM `mode: "coins"` field handling because coin rules are now global field defaults, not cards.
- Bumped `cards.config.js` and game script cache keys to `20260525-0195`.

Files:
- `cards-google-sheet.csv`
- `index.html`
- `src/cards.config.js`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The TADAM side panel now starts with three empty slots; green/red base coin effects are shown via field labels and always resolve before any drawn TADAM move/draw field effect.

Open questions:
- None.

## 2026-05-25 22:11 - Dev

Changed:
- Added the starter green/red coin rules as real TADAM deck cards: `green-coins` and `red-coins`.
- Added TADAM `mode: "coins"` support for green/red field effects.
- Green/red base coin rule is now active when either its starter TADAM display card is visible or its matching coin-rule TADAM card is active in the drawn TADAM set.
- Synced `src/cards.config.js`, `cards-google-sheet.csv`, and Google Sheet `Cards Config` tab `tadam`.
- Bumped `cards.config.js` and game script cache keys to `20260525-0194`.

Files:
- `cards-google-sheet.csv`
- `index.html`
- `src/cards.config.js`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `activeFieldEffect()` ignores `mode: "coins"` because coin rules are handled as the base field rule through `isFieldCoinRuleActive()`, allowing coin cards to coexist with move/draw field TADAM effects.

Open questions:
- None.

## 2026-05-25 21:30 - Dev

Changed:
- Added a new Good card: `Выбери игрока, он делает ход назад используя все свои кубики и бонусы передвижения`.
- Added effect type `choose-player-back-roll`: the active player chooses a target, the target rolls all normal dice, adds movement bonuses, and moves backward by the total.
- Synced `src/cards.config.js`, `cards-google-sheet.csv`, and Google Sheet `Cards Config` tab `good`.
- Bumped `cards.config.js` and game script cache keys to `20260525-0193`.

Files:
- `cards-google-sheet.csv`
- `index.html`
- `src/cards.config.js`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The effect uses `totalDiceForPlayer(target)` plus `playerStepBonus(target)`; optional paid extra-die cards are not prompted because the card says the target uses their own current dice/bonuses, not optional purchases.

Open questions:
- None.

## 2026-05-25 21:08 - Dev

Changed:
- Active player token animation now stays on throughout the player's turn, including Joe's Shop pre-roll card prompts.
- Replaced the narrow `ready-to-roll` token class with `turn-active`, which remains while the active player is deciding pre-roll actions.
- Bumped stylesheet and script cache keys to `20260525-0192`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `isPlayerTurnActive()` still suppresses the active animation during card/direction modal choices, but no longer suppresses it for `pendingPreRoll`.

Open questions:
- None.

## 2026-05-25 19:18 - Dev

Changed:
- Changed Bad card `give5` from giving 5 coins to a random player to giving 5 coins to the player with the fewest coins.
- Updated local card config, local Google Sheet CSV mirror, and game effect logic from `give-random` to `give-poorest`.
- Added `poorestOpponent()` with deterministic tie break by player id.
- Updated the Google Sheet `Cards Config`, tab `bad`, row `give5` with the new title, effect type, amount/count, and description.
- Bumped `cards.config.js` and game script cache keys to `20260525-0191`.

Files:
- `cards-google-sheet.csv`
- `index.html`
- `src/cards.config.js`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Google Sheet write returned success. A follow-up read verification hit a Google Sheets API read quota limit, so local files are verified and the sheet write is assumed from the successful batch response.

Open questions:
- None.

## 2026-05-25 15:56 - Dev

Changed:
- Replaced `assets/cards/tadam_front.png` with the updated TADAM face art from `Downloads/card_art_moved_up_20pct.png`.
- Moved TADAM card text zones slightly lower on reveal cards and side-panel mini cards to fit the updated face art.
- Bumped the stylesheet cache key and TADAM front asset cache keys to `20260525-0190`.

Files:
- `assets/cards/tadam_front.png`
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Source art remains `744x1039`, matching the existing TADAM back/front canvas size.

Open questions:
- None.

## 2026-05-25 15:29 - Dev 2

Changed:
- Fixed wide-screen spacing between player cards and settings for 2-player games.
- On screens `>=1200px`, the player score strip is moved into the right side panel above settings, so side-panel gap is consistent for 2/3/4 players.
- Simplified the wide layout back to a normal two-column `play-area` now that score cards live in the side panel in wide mode.
- Bumped stylesheet and script cache keys to `20260525-0189`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `syncWideScoreStripPlacement()` moves the existing `#scoreStrip` element between `.app-shell` and `.side-panel`; it does not duplicate player cards.

Open questions:
- None.

## 2026-05-25 13:59 - Dev 2

Changed:
- Reworked the wide-screen layout so the board occupies the full left column from the top.
- Moved player score cards into the right column above settings/TADAM on screens `>=1200px`.
- Increased wide board sizing now that the player strip no longer consumes vertical space above the board.
- Bumped stylesheet and script cache keys to `20260525-0188`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- This is CSS-only layout work using the existing DOM; narrow/tablet layouts are unchanged.

Open questions:
- None.

## 2026-05-25 13:56 - Dev 2

Changed:
- Fixed final-battle HUD so boss points are hidden until the boss actually rolls dice.
- Added display-only `bossRollsStarted` progress flag; boss-force calculation itself is unchanged.
- Bumped stylesheet and script cache keys to `20260525-0187`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `state.finalBattleProgress.bossForce` still accumulates the same base/opponent bonuses before boss rolls; only `renderFinalBattleHud()` displays `?` until the first boss roll has happened.

Open questions:
- None.

## 2026-05-25 13:50 - Dev 2

Changed:
- Added wide-screen battle panel sizing so the monster-battle window fits inside the visible board area.
- On screens `>=1200px`, the battle panel is raised and made more compact while keeping the same layout.
- Bumped stylesheet and script cache keys to `20260525-0186`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The compacting lives in the existing `@media (min-width: 1200px)` block and only affects enemy battle HUD presentation.

Open questions:
- None.

## 2026-05-25 13:35 - Dev 2

Changed:
- Swapped monster-battle card positions so the player card appears on the left and the enemy card appears on the right.
- Bumped stylesheet and script cache keys to `20260525-0185`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The central `VS`, winner highlight, and battle result logic are unchanged.

Open questions:
- None.

## 2026-05-25 13:33 - Dev 2

Changed:
- Added a short winner animation around the victorious monster/player portrait in the battle panel.
- The winner portrait now pops with a green-gold ring and ray burst when `.is-winning` is applied.
- Bumped stylesheet and script cache keys to `20260525-0184`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The animation is CSS-only and uses the existing `is-winning` class; battle logic is unchanged.

Open questions:
- None.

## 2026-05-25 13:27 - Dev 2

Changed:
- Removed the post-roll formula/comparison chip from the center of the monster battle panel.
- Strengthened the winning combatant card outline so the winner is indicated by the frame.
- Monster battle result text now runs through icon replacement, so `+1 кубик` renders with the dice icon.
- Bumped stylesheet and script cache keys to `20260525-0183`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Removed the now-unused `enemyBattleRollSummary()` helper and `.enemy-battle-formula` styles.

Open questions:
- None.

## 2026-05-25 13:22 - Dev 2

Changed:
- Removed the center phase label and pending roll chip from the monster battle panel.
- The battle center now shows only `VS` until an actual roll result exists.
- Moved battle dimming onto the board layer so dice are no longer dimmed by the overlay.
- Bumped stylesheet and script cache keys to `20260525-0182`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Roll formula/comparison still appears after a roll because it uses actual `enemyBattleProgress.rolls`.

Open questions:
- None.

## 2026-05-25 13:00 - Dev 2

Changed:
- Restored battle-mode dice face and pip colors to match normal dice throws.
- Kept battle dice positioning/size behavior, but removed the separate battle-only face/pip recoloring that made dice look dull.
- Bumped stylesheet and script cache keys to `20260525-0180`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Battle dice still use `.enemy-battle-dice` for placement and layer-specific treatment, but no longer override `.die-face` or `.die-face i` colors.

Open questions:
- None.

## 2026-05-25 12:54 - Dev 2

Changed:
- Strengthened the monster-battle scene without changing combat rules.
- Added a large monster portrait area in the battle panel and moved the victory threshold into the monster side only.
- Made battle-mode dice larger, brighter, higher-contrast, and more shadowed while leaving normal dice styling mostly separate.
- Reduced duplicate threshold text in the center panel; roll details now show as secondary dice formula plus a compact comparison.
- Made the battle toast more compact so it does not compete with the battle panel.
- Bumped stylesheet and script cache keys to `20260525-0179`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- No combat mechanics changed; `rolls` was added to `enemyBattleProgress` only for UI formula display.
- Existing uncommitted Dev changes in the same files are preserved.

Open questions:
- None.

## 2026-05-25 12:26 - Dev 2

Changed:
- Reworked the normal monster battle presentation into a single adventure-style battle panel.
- Battle UI now has clear ready/rolling/victory/defeat states, a focused background overlay, combatant cards, central VS, threshold, roll summary, and result text.
- Enemy-battle dice now animate a little higher, leaving the battle panel below the dice instead of competing with it.
- Bumped stylesheet and script cache keys to `20260525-0178`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- No battle mechanics were changed; added presentation-only fields (`rolled`, `bonus`, `isRolling`) to `state.enemyBattleProgress` so the HUD can display the existing calculation cleanly.
- Existing uncommitted Dev changes around visible starter TADAM card logic are still present in the same files and were not reverted.

Open questions:
- None.

## 2026-05-25 12:16 - Dev

Changed:
- Corrected green/red base coin rules to depend on visible starter TADAM cards.
- Green gives `+3` only while the starter green TADAM card is still visible; red takes `-3` only while the starter red TADAM card is still visible.
- Once a starter TADAM card is covered by drawn TADAM cards, its base coin rule stops applying.
- Active drawn TADAM field effects can still apply even after a starter card is covered.
- Bumped the game script cache key to `20260525-0178`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `isStarterTadamVisible(kind)` uses the same 3-card visible TADAM list as the side panel, so logic follows what players see.

Open questions:
- None.

## 2026-05-25 12:10 - Dev 2

Changed:
- Moved the normal enemy-battle HUD below the dice area so the VS panels no longer overlap the dice animation.
- Enemy-battle outcome/status text now renders under the enemy/player force row.
- Bumped stylesheet and script cache keys to `20260525-0175`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Added an `enemy-battle-hud` class on `#finalBattleHud` only for normal enemy-battle rendering; final-battle HUD keeps its previous class/layout.

Open questions:
- None.

## 2026-05-25 12:09 - Dev

Changed:
- Player score-card Joe's Shop badges now group identical shop cards by `id`.
- Duplicate shop cards display as a single short badge with a multiplier, for example `+1 к броску x2`.
- Badge tooltips also include the multiplier when grouped.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Grouping is display-only; player inventory still keeps individual card instances.

Open questions:
- None.

## 2026-05-25 02:26 - Dev 2

Changed:
- Slightly enlarged the final monster tile icon while keeping it contained inside the cell.
- Bumped the stylesheet cache key to `20260525-0174`.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Only `.tile-icon-final-enemy` sizing changed; normal enemy icons are unchanged.

Open questions:
- None.

## 2026-05-25 02:25 - Dev

Changed:
- Joe's Shop revealed offer cards can now be selected immediately on the face-card screen while the main button still says `Далее`.
- Clicking `Далее` without choosing a card keeps the previous flow: the main button changes to `Отказаться`, and the separate `Отказаться` button appears under the cards.
- Bumped the game script cache key to `20260525-0173`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `resolveShop()` now uses `revealSelectableShopCards()` for normal paid shop offers; free shop-card rewards still use the non-selecting reveal flow.

Open questions:
- None.

## 2026-05-25 02:18 - Dev 2

Changed:
- Centered and contained the final monster icon inside its tile so the full art fits without edge clipping.
- Added an enemy-battle-specific dice player label position so the rolling player's name no longer overlaps the VS/avatar/HUD panels.
- Bumped stylesheet and script cache keys to `20260525-0172`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Monster-fight dice animation now passes `isEnemyBattle: true`; final battle label behavior is unchanged.

Open questions:
- None.

## 2026-05-25 02:17 - Dev

Changed:
- Restored `shortTitle` display for Joe's Shop cards in player score cards.
- Full Joe's Shop card titles remain available in tooltips and other larger card/choice surfaces.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `renderShopBadges()` uses `shortShopTitle()`, now `shortTitle || title`, so long shop rules do not overflow player cards.

Open questions:
- None.

## 2026-05-25 02:08 - Dev 2

Changed:
- Fixed free Joe's Shop card reveal flow.
- Cards gained from actions now show the back first, then flip to the face before the reward toast/log appears.
- Bumped stylesheet and script cache keys to `20260525-0166`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `revealShopCards()` now mirrors Good/Bad/TADAM reveal flow: back prompt, face prompt, then return.

Open questions:
- None.

## 2026-05-25 02:03 - Dev 2

Changed:
- Added final scoring position bonus: closest player group to finish gets 6 points, next closest group gets 3, all others get 1.
- Tied players at the same distance receive the same position bonus.
- Final score totals now include `position`, and the player-victory score log shows the position bonus per challenger.
- Bumped stylesheet and script cache keys to `20260525-0159`.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Distance uses `routeIndex` against `finishCell`, so it follows the actual route order.

Open questions:
- None.

## 2026-05-25 01:56 - Dev 2

Changed:
- Added `assets/icons/final_enemy.png` for the final monster.
- Moved the final monster from `8-0` to the former finish cell `9-0`; changed `8-0` to a `Плохо` cell.
- Marked the finish door config as `isFinalBoss` and moved its enemy cell to `9-0`.
- Final monster victory now starts the final battle and does not grant +1 dice.
- Normal monster victories still grant +1 dice.
- Bumped stylesheet and script cache keys to `20260525-0146`.

Files:
- `assets/icons/final_enemy.png`
- `index.html`
- `src/game.config.js`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `9-0` remains `finishCell`, but its board event is now `enemy`; final battle starts from `resolveEnemyBattle()` after killing the `isFinalBoss` enemy.
- Keep asset paths relative for GitHub Pages.

Open questions:
- None.

## 2026-05-25 01:44 - Dev 2

Changed:
- Moved the enemy-battle result text above the enemy/player force panels so it no longer overlaps dice during monster fights.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The change targets `.enemy-battle-result`; dice animation remains centered.
- Current asset cache keys in `index.html` are `20260525-0138` from parallel UI work.

Open questions:
- None.

## 2026-05-25 01:43 - Dev 2

Changed:
- Added a GitHub Pages path rule for future work.

Files:
- `project-memory/updates.md`

Notes for others:
- For GitHub Pages, all JS/CSS/assets paths must be relative: `./src/...`, `./assets/...`, `./styles.css`.
- Do not use `/assets/...` or absolute local paths like `/Users/...`.

Open questions:
- None.

## 2026-05-25 01:38 - Dev 2

Changed:
- Fixed passive event toast layout by wrapping normal toast text in `.event-toast-copy`.
- Removed the broad `.event-toast-copy > span` rule that could turn inline spans, including coin/dice amounts, into separate lines.
- Bumped stylesheet and script cache keys to `20260525-0138`.
- Verified the page reloads with current cache keys and no browser console errors.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The root cause was `.event-toast` using grid layout while passive toasts inserted text/inline elements directly into the grid container.
- Action prompts already used `.event-toast-copy`; passive toasts now use the same wrapper.

Open questions:
- None.

## 2026-05-25 01:31 - Dev 2

Changed:
- Added two starter TADAM display cards for the default green/red field rules.
- Starter TADAM cards are separate from the TADAM deck and only appear through the side-panel display.
- The TADAM panel now shows the last 3 visible cards from `[starter green, starter red, drawn TADAM cards]`, so drawn cards gradually cover the starter cards.
- Bumped stylesheet and script cache keys to `20260525-0061`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `starterTadamCards` is display-only; do not add these cards to `cardConfig.tadam` or Google Sheet.

Open questions:
- None.

## 2026-05-25 01:24 - Dev 2

Changed:
- Added an enemy-battle HUD that reuses the final-battle area for normal monster fights.
- Monster fights now show enemy icon/strength on one side and the rolling player icon/name/strength on the other.
- After the roll, the stronger side is highlighted and the result text says who won and what the player receives.
- Bumped stylesheet and script cache keys to `20260525-0056`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Enemy battle HUD uses `state.enemyBattleProgress`; final battle HUD behavior is unchanged unless this state is active.

Open questions:
- None.

## 2026-05-25 00:44 - Dev 2

Changed:
- Added player avatars to player-name badges in choice popups.
- Choice popup summaries now use the same avatar/name badge for the active player.
- "Buy Joe's Shop card from another player" choices now show the card owner's avatar next to their name.
- Bumped stylesheet and script cache keys to `20260525-0043`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Use `playerChoiceBadge(player)` for player labels inside choice panels.

Open questions:
- None.

## 2026-05-25 00:30 - Dev 2

Changed:
- Reworked the side-panel TADAM block into three visible card slots.
- Active TADAM rules now render as mini TADAM cards instead of text list rows.
- Empty TADAM slots show subtle placeholders so it is clear up to three cards can be active.
- Bumped stylesheet and script cache keys.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Side-panel TADAM mini-cards use `assets/cards/tadam_front.png` as their face art and show card `title`.

Open questions:
- None.

## 2026-05-25 00:28 - Dev 2

Changed:
- Widened action prompt toasts and set a stable readable text size for long field-effect messages.
- Restored no-wrap inline icon groups in event toasts so coin/dice amounts stay together.
- Wrapped the pay-double gained amount as one unbreakable group.
- Bumped `index.html` asset cache keys to `20260525-0038`.

Files:
- `styles.css`
- `src/game.js`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Card reveal toasts keep their transparent/card-sized styling through the existing `:has(...)` rule.

Open questions:
- None.

## 2026-05-25 00:20 - Dev 2

Changed:
- Removed trailing sentence dots from toast popups to avoid orphan `.` lines.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The cleanup is toast-only; chronicle log entries keep their original text.

Open questions:
- None.

## 2026-05-25 00:16 - Dev 2

Changed:
- Removed cost text from the right-side badges in the "buy Joe's Shop card from another player" choice popup.
- Card choices now show only the card owner's name on the right.
- The decline choice no longer shows a `0 coins` badge.
- Empty choice notes no longer render an empty right-side badge.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The summary text still tells the player the purchase costs 5 coins; only the per-choice right badge was simplified.

Open questions:
- None.

## 2026-05-25 00:09 - Dev 2

Changed:
- Shop-card UI now uses full `title` text instead of `shortTitle`.
- Player shop-card badges, revealed Joe's Shop cards, and pre-roll shop-card prompts all show `title`.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `shortTitle` can remain in card config data, but game UI no longer reads it.

Open questions:
- None.

## 2026-05-25 00:08 - Dev 2

Changed:
- Removed the source-card title line from movement action prompts.
- Movement prompts now show only the player/action line.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- This affects move-effect prompts such as Good card forward/backward movement.

Open questions:
- None.

## 2026-05-25 00:02 - Dev 2

Changed:
- Monster loss reward changed from 10 coins to a Joe's Shop card.
- After returning to start from a monster loss, the player now opens and receives a `Лавка Джо` card through the existing shop-card reveal flow.
- Free Joe's Shop card awards now re-render player cards immediately after adding the item.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The previous 10-coin consolation reward is no longer used for monster losses.

Open questions:
- None.

## 2026-05-24 23:58 - Dev 2

Changed:
- Added TADAM card back/front assets.
- Added TADAM reveal flow: a TADAM card now shows its back first, then flips to the face by card click or the action button before applying the global rule.
- TADAM cards use the shared revealed-card size and lower safe text area.
- Bumped stylesheet and script cache keys.

Files:
- `assets/cards/tadam_back.png`
- `assets/cards/tadam_front.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- TADAM card assets are both 744x1039, same source canvas size as Good/Bad/Joe's Shop card faces.
- Active TADAM rules still appear in the side panel after the reveal flow completes.

Open questions:
- None.

## 2026-05-24 23:54 - Dev 2

Changed:
- Added a cross-chat UI QA rule for future hover/focus/selected/active states.

Files:
- `project-memory/updates.md`

Notes for others:
- For future UI changes, check hover/focus/selected/active states for unwanted glow/fill.
- Default highlight style should be a clean contour, subtle shadow, or thin edge glow.
- Do not replace important art, dark plaques, or readable surfaces with bright gold/light fills unless explicitly requested.
- Pay special attention to card buttons, choice cards, decline/action buttons, and overlays above the board.
- After UI changes, verify hover/focus states in the browser when feasible.

Open questions:
- None.

## 2026-05-24 23:41 - Dev 2

Changed:
- Moved the normal Joe's Shop `Отказаться` button below the revealed shop cards.
- Strengthened the decline-button hover/focus selector so it keeps its dark background and only gets a contour highlight.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Do not add the cross-chat highlight QA rule until the user approves the proposed news prompt.
- Stylesheet cache key is `20260524-2341`.

Open questions:
- Awaiting user approval to send the highlight-QA rule into project news.

## 2026-05-24 23:31 - Dev 2

Changed:
- Added Bad card back/front assets.
- Added Bad card reveal flow: a Bad card now shows its back first, then flips to the face by card click or the action button before applying the effect.
- Bad cards use the shared revealed-card size and lower safe text area.
- Bumped stylesheet and script cache keys.

Files:
- `assets/cards/bad_back.png`
- `assets/cards/bad_front.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Bad card assets are both 744x1039, same source canvas size as the latest Good/Joe's Shop card faces.
- Bad card text uses `title`, consistent with the current title-only card text direction.

Open questions:
- None.

## 2026-05-24 23:28 - Important

Changed:
- Added `project-memory/prompts/read-news.md` for the short command "прочти новости".
- Updated onboarding docs so new chats know about the news-refresh prompt.

Files:
- `project-memory/prompts/read-news.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/README.md`
- `project-memory/updates.md`

Notes for others:
- "Прочти новости" means: read project memory, role inbox, recent updates, and git status when relevant; summarize fresh context without changing game code.

Open questions:
- None.

## 2026-05-24 23:14 - Dev 2

Changed:
- Unified reveal card sizing for Good and Joe's Shop cards.
- Added shared `--reveal-card-width` sizing so future revealed cards can use the same dimensions.
- Bumped the stylesheet cache key.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Base revealed card size now follows the former Good-card size: `clamp(158px, 24vw, 218px)`.
- Narrow-screen revealed card size uses the shared variable too.

Open questions:
- None.

## 2026-05-24 20:19 - Dev 2

Changed:
- Removed the separate Joe's Shop purchase choice popup from the normal shop flow.
- After Shop cards are revealed, the visible cards themselves are clickable purchase choices.
- Added an `Отказаться` button beside the revealed Shop cards.
- Kept Shop offer cards horizontal and added compact sizing for narrow screens.
- Bumped stylesheet and script cache keys.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `chooseShopCard`/`pendingShop` are now legacy helpers for the old popup and are not used by `resolveShop`.
- Free Shop card reveal still uses one card and no purchase/decline controls.

Open questions:
- None.

## 2026-05-24 17:42 - Dev 2

Changed:
- Added Joe's Shop card back/front assets.
- Added Joe's Shop reveal flow: shop offers show card backs first, then flip to faces by card click or the action button before the purchase choice appears.
- Free Joe's Shop card draws now reveal one Shop card back, then face, before adding it to the player.
- Added card-face CSS for Shop cards with text constrained to the lower safe area.
- Bumped stylesheet and script cache keys.

Files:
- `assets/cards/shop_back.png`
- `assets/cards/shop_front.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Shop card assets are both 744x1039, matching the latest Good card face canvas and effectively 63:88.
- Shop reveal is separate from Good reveal but uses the same action-prompt interaction pattern.

Open questions:
- None.

## 2026-05-24 17:18 - Dev 2

Changed:
- Reverted the steps icon experiment.
- Step text now stays as text again instead of rendering as an icon.

Files:
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Removed the temporary `assets/icons/steps.png` asset.

Open questions:
- None.

## 2026-05-24 17:24 - Dev 2

Changed:
- Updated the Good card front art to the latest provided file.
- Added fresh cache keys for the Good card front and stylesheet link.

Files:
- `assets/cards/good_front.png`
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- New front canvas is 744x1039, about 0.023% wider than exact 63:88 by canvas ratio.
- Visible alpha area at high threshold is 742x1039, about 0.246% narrower than exact 63:88.

Open questions:
- None.

## 2026-05-24 17:11 - Dev 2

Changed:
- Added a shared steps icon asset.
- Text that says `1 шаг`, `2 шага`, or `5 шагов` now renders as a number with the steps icon across game UI messages.
- Bumped the game script cache key.

Files:
- `assets/icons/steps.png`
- `src/game.js`
- `styles.css`
- `index.html`
- `project-memory/updates.md`

Notes for others:
- Step icon rendering is part of `iconizeHtml`, after coin and dice icon rendering.
- Script cache key is `20260524-1714`.

Open questions:
- None.

## 2026-05-24 17:12 - Dev 2

Changed:
- Replaced the Good card front art with the provided open-chest card face.
- Moved and narrowed Good card text lower on the face so it stays off the chest art and away from card edges.
- Added fresh cache keys for the Good card front and stylesheet link.

Files:
- `assets/cards/good_front.png`
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- New front source canvas is 1061x1482, essentially exact 63:88 by canvas ratio.
- Text box is now constrained to the lower safe area of the card face.

Open questions:
- None.

## 2026-05-24 17:06 - Dev 2

Changed:
- Verified the Good card back asset already matches the provided chest-back image.
- Set the Good card reveal UI to the exact 63:88 aspect ratio.
- Added cache keys for the Good card front/back CSS backgrounds and stylesheet link.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Measured source art ratios: `good_back.png` is 1059x1485, about 0.39% narrower than 63:88; `good_front.png` is 1024x1536, about 6.88% narrower than 63:88.
- The UI display ratio is exact 63:88; source art files are not all exact-ratio exports.

Open questions:
- Whether to re-export/normalize `good_front.png` itself to a true 63:88 source asset.

## 2026-05-24 16:46 - Dev 2

Changed:
- Replaced the inline `Сразу открывать карты` setup checkbox with a `Настройки` toggle button.
- Added a collapsible cheat settings menu below the setup controls.
- Moved `Сразу открывать карты` into the menu and added `Показывать контур хода`.
- Walking path outlines now appear only when `Показывать контур хода` is enabled.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Both cheat checkboxes are unchecked by default.

Open questions:
- None.

## 2026-05-24 16:35 - Dev 2

Changed:
- Replaced walking path dots with a lightly highlighted cell outline.
- Final destination cell now uses a slightly stronger outline.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The route marker still disappears from each cell as the player reaches it.

Open questions:
- None.

## 2026-05-24 16:18 - Dev 2

Changed:
- Added walking path dots after a movement dice roll.
- Dots are rendered on each cell the player is about to traverse; each dot disappears when the player reaches that cell.
- The final destination dot is slightly larger while staying translucent.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The path preview is only for normal dice walking, not forced card/field movement.
- Path preview stops before locked doors.

Open questions:
- None.

## 2026-05-24 16:15 - Dev 2

Changed:
- Losing to a monster now sends the player back to start and awards coins.
- The monster-loss coin reward uses the existing coin popup near the player's token.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The base reward is 10 coins; existing coin bonuses still apply through `addCoins`.

Open questions:
- None.

## 2026-05-24 16:02 - Dev 2

Changed:
- Added a negative coin popup near the player token when coins are spent or stolen.
- Styled negative coin popups with a red-tinted badge while keeping positive coin popups unchanged.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `addCoins` now shows a popup for any non-zero delta; `stealCoins` also shows the loss on the victim because it mutates coins directly.

Open questions:
- None.

## 2026-05-24 15:11 - Dev 2

Changed:
- Strengthened the Good-card preview hover selector so the global button hover cannot replace the card art with a gold fill.
- Reduced Good-card hover to a thin contour highlight only.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `button.good-card-preview:hover:not(:disabled)` intentionally mirrors the normal card background to beat the generic `button:hover:not(:disabled)` rule.

Open questions:
- None.

## 2026-05-24 14:59 - Dev 2

Changed:
- Kept Good-card hover to contour-only by overriding the global button hover background on card previews.
- Good-card face text uses `description` only and remains in the lower safe text area.
- Fixed event/TADAM plaque icon layout so coin/dice icons do not force awkward centered line breaks.
- Removed trailing periods after card-title toasts to avoid orphan punctuation lines.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Generic `title` is still used for logs/lists; Good-card face rendering uses `description`.

Open questions:
- None.

## 2026-05-24 03:01 - Dev 2

Changed:
- Fixed score-card coin layout so the coin icon stays to the right of the number.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The issue was caused by `.score-stats span` overriding inline icon layout; it now targets only direct stat cells.

Open questions:
- None.

## 2026-05-24 02:56 - Dev 2

Changed:
- Added the provided dice icon as a shared UI asset.
- Replaced visible `кубик`/`кубики`/`куб.` wording in rendered game UI with the dice icon, following the existing coin icon pattern.
- Added a dice bonus float over the player's token when they receive a permanent +1 die from defeating an enemy.
- Bumped the game script cache key.

Files:
- `assets/icons/dice.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `iconizeHtml()` now applies both coin and dice icon replacement for rendered game text.
- Source card/config strings still keep human-readable dice words; the visible UI transforms them at render time.

Open questions:
- None.

## 2026-05-24 02:43 - Dev 2

Changed:
- Removed `description` fields from all local card config entries.
- Removed card description rendering from Good-card faces and choice buttons; card UI now uses only `title`.
- Updated local `cards-google-sheet.csv` to remove `description` and `new description`; current columns end with `notes,count`.
- Updated Google Sheet `Cards Config` tabs `good`, `bad`, `tadam`, and `shop` to the same title-only schema.
- Synced Google Sheet `good` tab with all 6 current Good cards.
- Updated project memory handoff/inbox to reflect the new card config workflow.

Files:
- `cards-google-sheet.csv`
- `project-memory/handoff.md`
- `project-memory/inbox/for-dev.md`
- `src/cards.config.js`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Current card config columns are `deck,id,title,shortTitle,effect_type,amount,steps,cost,dice,mode,target_deck,notes,count`.
- Google Sheet tabs now have 13 columns; `description` and `new description` are intentionally gone.

Open questions:
- None.

## 2026-05-24 02:21 - Dev 2

Changed:
- Added `count` to Good cards in `src/cards.config.js` and made the game expand decks by `count`.
- Added `count` to the local `cards-google-sheet.csv` mirror as a trailing column, keeping `description` as column M and `new description` as column N.
- Changed Good card `Можешь заплатить 5 монет и сделать еще один ход` to `Сделай еще один ход`.
- Added a new free `extra-turn` effect that grants the next turn without payment or a choice dialog.
- Bumped the game script cache key.

Files:
- `cards-google-sheet.csv`
- `index.html`
- `src/cards.config.js`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Current Good card counts are all `1`.
- The old `optional-extra-turn` effect remains for compatibility but is no longer used by the Good card.

Open questions:
- None.

## 2026-05-24 02:08 - Dev 2

Changed:
- Added a shared coin icon asset and replaced visible coin wording in game UI with inline coin icons.
- Added a floating `+N` coin gain popover near the player's token when coins are received.
- Bumped the game script cache key for the new coin UI.

Files:
- `assets/icons/coin.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Coin wording in source/config strings remains as data, but rendered UI runs through `coinizeHtml()`.
- Coin-gain popovers are triggered from `addCoins()` and the direct pay-double field doubling.

Open questions:
- None.

## 2026-05-24 01:44 - Dev 2

Changed:
- Reworked the Good-card reveal prompt to show only the card itself instead of a separate text panel.
- Moved Good-card title and description onto the revealed card face.
- Changed Good-card hover/focus from brightness shift to a subtle contour glow.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Hidden Good cards are now textless backs; the `Далее` button still opens/applies cards as before.

Open questions:
- None.

## 2026-05-24 01:34 - Dev 2

Changed:
- Changed the `pay-double` field rule: it now doubles the player's current coins without charging 5 coins first.
- Updated the field help text to match the new rule.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The pay-double icon/placement is unchanged.

Open questions:
- None.

## 2026-05-24 01:28 - Dev 2

Changed:
- Brightened player name colors in score cards, dice labels, final battle boss force, and event messages.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Token/player accent colors are unchanged; only text rendering was lightened.

Open questions:
- None.

## 2026-05-24 01:05 - Dev 2

Changed:
- Added visual reveal flow for `good` cards: card back first, then card face, then effect application.
- Added `assets/cards/good_back.png` and `assets/cards/good_front.png` for the Good card back/front art.
- Added the `Сразу открывать карты` cheat checkbox beside game setup controls.
- When the cheat is enabled, Good cards still appear face-down first, then auto-flip after 0.2 seconds.
- Good card front still waits for player click or `Далее` before applying the effect.
- Bumped the game script cache key.

Files:
- `assets/cards/good_back.png`
- `assets/cards/good_front.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The reveal flow is currently applied only when `deckName === "Хорошо"`.
- The card preview itself resolves the prompt on click; the normal `Далее` button still works.

Open questions:
- None.

## 2026-05-21 12:05 - Dev 2

Changed:
- Replaced the `pay-double` field icon with the new coin bag x2 art.
- Added a fresh asset cache key for the updated icon and bumped the game script cache key.

Files:
- `assets/tiles/pay_double_1024.png`
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The field still uses the standard gray tile backing and frame.

Open questions:
- None.

## 2026-05-21 00:48 - Dev 2

Changed:
- Removed trailing periods after Joe's Shop card names in toast/log messages.
- Prevents a lone period from wrapping onto its own line when a shop card title is long.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- This affects free shop-card draw, normal shop purchase, and paid transfer of another player's shop card.

Open questions:
- None.

## 2026-05-21 00:40 - Dev 2

Changed:
- Made player name colors brighter while keeping them readable on dark UI.
- Reduced the light mix in player-name CSS and added subtle color glow to score names, dice labels, event toasts, and log names.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Base player colors in `src/game.js` are still matched to character art backgrounds.

Open questions:
- None.

## 2026-05-21 00:35 - Dev 2

Changed:
- Replaced the `dice-fortune` field icon with the new white die x6 art.
- Added an asset cache key for the updated icon and bumped the game script cache key.

Files:
- `assets/tiles/dice_fortune_1254.png`
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The field remains on the standard gray tile backing and frame per the custom-field convention.

Open questions:
- None.

## 2026-05-21 00:30 - Dev 2

Changed:
- Replaced the `pay-double` field icon with the new coin bag x2 art.
- Added an asset cache key for the updated icon and bumped the game script cache key.

Files:
- `assets/tiles/pay_double_1024.png`
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The field remains on the standard gray tile backing and frame per the custom-field convention.

Open questions:
- None.

## 2026-05-21 00:25 - Dev 2

Changed:
- Added three new `good` cards: paid extra turn, free Joe's Shop card, and paid shop-card transfer from another player.
- Implemented new card effect types: `optional-extra-turn`, `draw-free-shop`, and `buy-shop-card-from-player`.
- Added a generic card-action choice dialog for optional card effects.
- Synced `src/cards.config.js` and `cards-google-sheet.csv`.
- Bumped the game script cache key.

Files:
- `cards-google-sheet.csv`
- `index.html`
- `src/cards.config.js`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Paid extra turn keeps the active player after the current turn resolves.
- Buying another player's Joe's Shop card pays 5 coins to that card's owner and transfers the selected card.

Open questions:
- None.

## 2026-05-21 00:15 - Dev 2

Changed:
- Moved the `pay-double` field from bottom cell `4-9` to the mid-route cell `3-4` shown in the reference.
- Restored the `good` field at bottom cell `4-9`.
- Put all custom new fields on the standard gray tile backing with the same fantasy frame as regular fields.
- Reduced custom field art to sit as an icon inside the framed tile.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Default convention for future custom fields: use a gray tile backing and standard field frame unless the user explicitly asks otherwise.
- Current custom framed fields are `dice-fortune` and `pay-double`.

Open questions:
- None.

## 2026-05-21 00:05 - Dev 2

Changed:
- Added a new `pay-double` board field on bottom route cell `4-9`.
- Added the new field art asset `assets/tiles/pay_double_1024.png`.
- Landing on the field pays up to 5 coins, then doubles the remaining coins.
- Added title/effect text for the new field and bumped the game script cache key.

Files:
- `assets/tiles/pay_double_1024.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- If the player has fewer than 5 coins, they pay what they have and then double the remaining amount, which will be 0.
- This replaces the `good` field at board cell `4-9`.

Open questions:
- None.

## 2026-05-20 23:59 - Dev 2

Changed:
- Moved the new `dice-fortune` field from the bottom route to the left vertical route cell shown in the reference.
- Restored the previous `good` field at board cell `4-9`.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `dice-fortune` now sits at board cell `0-2`, replacing the previous red field there.

Open questions:
- None.

## 2026-05-20 23:56 - Dev 2

Changed:
- Added a new `dice-fortune` board field on the bottom route cell shown in the design reference.
- Added the new field art asset `assets/tiles/dice_fortune_1254.png`.
- Landing on the field rolls 6 dice: each 6 grants 20 coins, each 1 moves the player 5 steps backward.
- Added title/effect text for the new field and bumped the game script cache key.

Files:
- `assets/tiles/dice_fortune_1254.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The new field replaces the previous `good` field at board cell `4-9`, which is the fifth route cell from start.
- Backward movement from this field does not resolve the landing effect of the destination cell, matching existing backward movement behavior.

Open questions:
- None.

## 2026-05-20 23:45 - Dev 2

Changed:
- Lightened player name text while keeping base player colors unchanged for tokens and markers.
- Applied the lighter color treatment to score cards, dice roll labels, event toasts, and log player names.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Player colors in `src/game.js` remain matched to the character backgrounds; CSS mixes them with `#fff7d4` for readable names.

Open questions:
- None.

## 2026-05-20 23:39 - Dev 2

Changed:
- Replaced all active player character token PNGs with the simplified icon set.
- Updated player colors to match the simplified icon backgrounds: dog red, cat purple, otter teal-blue, alpaca orange.
- Bumped token asset cache keys and the game script cache key.

Files:
- `assets/player-tokens/alpaca.png`
- `assets/player-tokens/cat.png`
- `assets/player-tokens/dog.png`
- `assets/player-tokens/otter.png`
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- This supersedes the earlier 2026-05-20 21:36 character token update.

Open questions:
- None.

## 2026-05-20 21:36 - Dev 2

Changed:
- Replaced all active player character token PNGs with the new class-themed character art.
- Updated player colors to match the new character backgrounds: dog red, cat purple, otter teal, alpaca orange.
- Added token asset cache keys and bumped the game script cache key.

Files:
- `assets/player-tokens/alpaca.png`
- `assets/player-tokens/cat.png`
- `assets/player-tokens/dog.png`
- `assets/player-tokens/otter.png`
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The fourth player remains named `Альпака`; the source file is `04_llama_barbarian.png`.

Open questions:
- None.

## 2026-05-20 18:36 - Dev 2

Changed:
- Raised the dice player label only during the final battle.
- Added a final-battle-specific dice label class so the player name sits above the force counter HUD.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Normal dice throw labels still use the original centered position.

Open questions:
- None.

## 2026-05-20 18:22 - Dev 2

Changed:
- Applied Google Sheet `good` card config update for `steal5`.
- Changed `steal5` from stealing from a random opponent to stealing from the opponent with the most coins.
- Updated matching local card config and `cards-google-sheet.csv`.
- Updated Google Sheet row: title, `effect_type`, `description`, and cleared `new description`.
- Bumped the game script cache key.

Files:
- `cards-google-sheet.csv`
- `index.html`
- `src/cards.config.js`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- If multiple opponents tie for most coins, the earliest player by id/order is selected.
- Verified Google Sheet row `good!A4:N4`: `new description` is empty and `effect_type` is `steal-richest`.
- Verified `node --check src/game.js`.
- Verified in the in-app browser that the game loads cache key `20260520-0235` with no console errors.

Open questions:
- None.

## 2026-05-20 16:34 - Dev 2

Changed:
- Aligned map player token images by removing the extra CSS-drawn circular token backing.
- Map tokens now use the circular PNG art itself as the token image at 100% size.
- Updated player colors to match token art backgrounds: dog blue, cat teal, otter purple, alpaca yellow.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser with 4 players: token image and token container sizes match, object position is centered, colors are updated, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 16:30 - Dev 2

Changed:
- Replaced all active player token icons with the new 1024px circle RGBA animal tokens.
- Changed the fourth player from `Белка` to `Альпака`, keeping the same purple player color.
- Updated player token mapping to dog/cat/otter/alpaca in order.
- Bumped the game script cache key.

Files:
- `assets/player-tokens/alpaca.png`
- `assets/player-tokens/cat.png`
- `assets/player-tokens/dog.png`
- `assets/player-tokens/otter.png`
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `assets/player-tokens/squirrel.png` remains in the folder but is no longer referenced.
- Verified `node --check src/game.js`.
- Verified in the in-app browser with 4 players: score cards and map tokens show `Пес`, `Кот`, `Выдра`, `Альпака` with 1024px icons, roll label uses the active player's new icon, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 15:35 - Dev 2

Changed:
- Adjusted map player token image alignment inside the round token.
- Reduced token image size from 140% to 118% and set explicit centered object positioning.
- Bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: cache key is `20260520-0220`, token image object position is centered, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 15:31 - Dev 2

Changed:
- Changed final battle boss opponent bonus from +5 force per opponent to +1 force per opponent.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Existing older memory entries mention the previous +5 boss bonus; this latest entry supersedes that rule.
- Verified `node --check src/game.js`.

Open questions:
- None.

## 2026-05-20 14:40 - Dev 2

Changed:
- Moved the final battle force HUD lower on the board to avoid overlapping the final battle action prompt.
- Bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- HUD top position now uses `clamp(118px, 19vh, 156px)`.
- Verified `node --check src/game.js`.
- Verified in the in-app browser: cache key is `20260520-0210`, computed HUD top is about `135px` in the current viewport, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 12:59 - Dev 2

Changed:
- Added a final battle force HUD on the board.
- During final battle it shows total player force on the left and boss force on the right.
- The HUD updates after each challenger roll and each boss roll, then hides when the battle resolves.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Boss force HUD includes the boss fixed bonuses (+modifiers per opponent and +5 per opponent) once the boss phase begins, then adds boss dice rolls as they happen.
- Verified `node --check src/game.js`.
- Verified in the in-app browser: the new HUD node exists, is hidden outside final battle, the cache key is `20260520-0205`, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 12:31 - Dev 2

Changed:
- Reversed enemy player-dot logic: enemy tiles now show dots only for players who have already defeated that enemy.
- Renamed the marker class from lock wording to `enemy-victory-marks`.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: fresh game starts with 4 enemy tiles and 0 victory marks; old `enemy-locks` markers are gone; no console errors appeared.

Open questions:
- None.

## 2026-05-20 03:28 - Dev 2

Changed:
- Passive event/card toast messages now hide immediately when the player starts a dice roll.
- The behavior is wired through the shared roll button action, so it applies to both button clicks and Enter.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Action prompts are not affected; they still require `Далее`/Enter.
- Verified `node --check src/game.js`.
- Verified in the in-app browser that Enter still starts a dice throw on the new cache key and no console errors appeared.

Open questions:
- None.

## 2026-05-20 03:24 - Dev 2

Changed:
- Added player token icons next to player names in the top score cards.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: score cards render player icons next to names, icons load at 512px natural width, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 03:23 - Dev 2

Changed:
- Added an Enter keyboard shortcut for the primary turn button.
- Enter now rolls the dice when rolling is available and advances action prompts when the button says `Далее`.
- The shortcut ignores form fields such as player/dice count selects.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: pressing Enter from the page starts a dice throw, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 03:13 - Dev 2

Changed:
- Unified the active-player preparation animation with the actual roll/move animation.
- `ready-to-roll` now uses the same `token-hop` animation as `moving`.
- Removed the separate ready pulse/icon rocking animations.
- Bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: before roll and during roll both report `token-hop`, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 03:10 - Dev 2

Changed:
- Added a `ready-to-roll` token state for the active player when it is their turn and the roll button is available.
- The ready player token now pulses and the character icon lightly rocks before the dice roll starts.
- Kept movement animation separate: during actual roll/move the token uses the existing `moving` hop.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: active token starts with `ready-to-roll` and `token-ready-*` animations; after pressing roll it switches to `moving`/`token-hop`; no console errors appeared.

Open questions:
- None.

## 2026-05-20 03:06 - Dev 2

Changed:
- Swapped the cat and otter token assignments so `Кот` and `Выдра` use the intended icons.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: loaded script cache key is `20260520-0130`, `Кот` now uses `otter.png`, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 03:04 - Dev 2

Changed:
- Added the player's token icon next to their name in the dice-roll label.
- Boss dice labels keep the `Босс - Имя` text and use the boss player's icon.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: the roll label uses flex layout, shows `Пес`, loads `dog.png` at 512px natural width, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 03:03 - Dev 2

Changed:
- Changed automatic event/card toast display time from 5 seconds to 3 seconds.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- This affects `showEventToast`; action prompts that require pressing the button still wait for user input.
- Verified `node --check src/game.js`.
- Verified in the in-app browser that the loaded script cache key is `20260520-0120`, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 03:00 - Dev 2

Changed:
- Added PNG player token assets for dog, cat, otter, and squirrel.
- Replaced plain colored map-token circles with the new character icons.
- Kept player color as the token ring/glow for readability and active-player emphasis.
- Bumped the game script cache key.

Files:
- `assets/player-tokens/cat.png`
- `assets/player-tokens/dog.png`
- `assets/player-tokens/otter.png`
- `assets/player-tokens/squirrel.png`
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: visible player tokens load 512px PNG icons from `assets/player-tokens`, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 02:56 - Dev 2

Changed:
- Made Joe's Shop tile outlines more expressive.
- Added a similarly expressive red outline to enemy tiles.
- Removed visual door bars/locks from the board while keeping the underlying enemy/door progression logic.
- Enemy tiles now show colored player dots for players who have not yet defeated that enemy.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: 4 enemy tiles render with player dots, no door visuals remain, the cache key is `20260520-0105`, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 02:41 - Important

Changed:
- Updated `project-memory/prompts/next-chat.md` so handoff output includes an archive-name line with chat role/name, current date, and chat age in days.

Files:
- `project-memory/prompts/next-chat.md`
- `project-memory/updates.md`

Notes for others:
- When preparing a successor prompt, include `Archive name: <role/name> - <YYYY-MM-DD> - <N days since creation>` after the prompt so the user can rename the old chat before archiving.

Open questions:
- None.

## 2026-05-20 02:14 - Dev 2

Changed:
- Made the 3D dice spin 20% slower, from 800ms to 960ms.
- Kept the JS dice timing and CSS cube animations synchronized.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser that the loaded script cache key is `20260520-0045`, `.die-cube` uses `960ms`, and no console errors appeared.

Open questions:
- None.

## 2026-05-20 01:47 - Important

Changed:
- Updated `project-memory/prompts/next-chat.md` so successor prompts tell new chats to inspect Git/GitHub state and get familiar with the game before continuing work.

Files:
- `project-memory/prompts/next-chat.md`
- `project-memory/updates.md`

Notes for others:
- New role chats should not rely only on handoff text; they should also understand repository state and the current game surface.

Open questions:
- None.

## 2026-05-20 01:40 - Important

Changed:
- Updated `project-memory/prompts/next-chat.md` so replacement chats keep the same role name without numbering.

Files:
- `project-memory/prompts/next-chat.md`
- `project-memory/updates.md`

Notes for others:
- `Dev` should prepare a prompt for `Dev`, `UI` for `UI`, `GD` for `GD`, etc.; do not name successors `Dev 2`, `Dev 3`, and so on.

Open questions:
- None.

## 2026-05-20 01:31 - Important

Changed:
- Added `next-chat.md` to the startup reading list for new chats.
- Added the GitHub link for `next-chat.md` so browser ChatGPT chats can open it without local file access.

Files:
- `project-memory/README.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/updates.md`

Notes for others:
- Every new role chat should see `project-memory/prompts/next-chat.md` at least once.
- Browser ChatGPT chats should use the GitHub URL if local paths are unavailable.

Open questions:
- None.

## 2026-05-20 01:19 - Important

Changed:
- Clarified `project-memory/prompts/next-chat.md` so the short request "прочитай next-chat" is enough.
- Made the file explicitly instruct the current role chat to prepare a successor prompt for the same role.

Files:
- `project-memory/prompts/next-chat.md`
- `project-memory/updates.md`

Notes for others:
- Users can now simply write: "Прочитай next-chat".

Open questions:
- None.

## 2026-05-20 01:16 - Important

Changed:
- Replaced the Dev-specific successor prompt with a universal next-chat prompt for any role.
- Replaced the old Dev-specific prompt file with `project-memory/prompts/next-chat.md`.
- Updated the new-chat onboarding prompt to reference `next-chat.md`.

Files:
- `project-memory/prompts/next-chat.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/updates.md`

Notes for others:
- Users can now tell any role chat: "прочитай next-chat"; it should prepare a successor prompt for the same role.
- The successor prompt must include fresh project-memory, inbox, and git status when relevant.

Open questions:
- None.

## 2026-05-20 01:07 - Important

Changed:
- Added a reusable prompt for preparing the next Dev handoff when Dev chats are replaced.
- Updated the new-chat onboarding prompt to point old Dev chats to the reusable handoff prompt.

Files:
- `project-memory/prompts/next-dev-handoff.md`
- `project-memory/prompts/new-chat.md`
- `project-memory/updates.md`

Notes for others:
- Future Dev chats should pass this handoff prompt forward when they are replaced by Dev N+1.
- The generated successor prompt should include fresh project-memory, git status, uncommitted files, and post-push context.

Open questions:
- None.

## 2026-05-20 00:43 - Dev 2

Changed:
- Added a colored player-name label above animated dice throws.
- Final battle now pauses before each challenger and boss roll so the user can press `Бросить кубик` for every participant.
- Boss dice throws are labeled as `Босс - Имя` above the dice.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified normal roll in the in-app browser: player label appears above dice in the player's color, and no console errors appeared.

Open questions:
- Full final-battle browser path was not manually played through; final battle prompt flow was checked in code.

## 2026-05-20 00:26 - Dev 2

Changed:
- Replaced instant finish victory with a final boss battle.
- The player who reaches finish becomes the boss.
- All other players roll their dice and passive modifiers; their totals combine into player force.
- Boss rolls once per opponent, uses their own dice, passive modifiers multiplied by opponent count, and gets +5 force per opponent.
- If boss force is greater or equal, boss wins; otherwise players win and the highest final score among challengers wins.
- Final score = coins + 5 per Joe's Shop card + 2 per damage dealt to boss.
- Updated finish field text to `финальная битва`.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Paid optional extra-die shop prompts are not used during final battle; permanent dice bonuses and passive step modifiers are used.
- Verified `node --check src/game.js`.
- Verified in the in-app browser: board loads with no console errors.

Open questions:
- Tie rule currently favors the boss (`bossForce >= playersForce`).

## 2026-05-19 13:42 - Dev 2

Changed:
- Made all animated dice faces use the same white/gray face color.
- Removed per-face color overrides so values like 3 and 6 no longer differ by brightness.
- Bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: all six faces on the sample die share the same computed background and border, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 13:37 - Dev 2

Changed:
- Changed animated dice faces from warm brown/gold to white/gray.
- Kept dark pips for readability.
- Bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: dice faces use white/gray gradients, pips remain dark, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 13:36 - Dev 2

Changed:
- Documented the Google Sheet `Cards Config` workflow in project memory.
- Added the workflow to `project-memory/handoff.md` and `project-memory/inbox/for-dev.md`.

Files:
- `project-memory/handoff.md`
- `project-memory/inbox/for-dev.md`
- `project-memory/updates.md`

Notes for others:
- Google Sheet `Cards Config` is canonical for card edits.
- Dev should read non-empty `new description` cells, apply them to `description`, update local card config / CSV mirror, update mechanics when numbers change, and clear `new description`.

Open questions:
- None.

## 2026-05-19 13:35 - Dev 2

Changed:
- Updated `extra-die` card logic to cost 5 coins, not only its description.
- Updated `extra-die` title and short title to say 5 coins.
- Synced Google Sheet `Cards Config`, `src/cards.config.js`, and `cards-google-sheet.csv`.

Files:
- `cards-google-sheet.csv`
- `src/cards.config.js`
- `project-memory/updates.md`

Notes for others:
- Spreadsheet: `Cards Config`, sheet `shop`, row 4 (`extra-die`).
- Google Sheet row now has title `Перед ходом можешь заплатить 5 монет...`, short title `+1 кубик за 5`, cost `5`, dice `1`, and empty `new description`.
- Verified `node --check src/cards.config.js`.
- Verified local CSV with a quote-aware Node parser: 16 rows and 14 columns on every row.

Open questions:
- None.

## 2026-05-19 13:17 - Dev 2

Changed:
- Treated the Google Sheet `Cards Config` as the canonical card-edit source.
- Applied `shop!N4` (`new description`) into `shop!M4` (`description`) in Google Sheet.
- Applied the same description to `src/cards.config.js` and `cards-google-sheet.csv`.
- Cleared `shop!N4` after applying it.
- Reordered local `cards-google-sheet.csv` columns to match Google Sheet: `description` and `new description` are now columns M and N.

Files:
- `cards-google-sheet.csv`
- `src/cards.config.js`
- `project-memory/updates.md`

Notes for others:
- Spreadsheet: `Cards Config`, sheet `shop`, row 4 (`extra-die`).
- New description: `Перед броском владелец может заплатить 5 монет, чтобы бросить на 1 кубик больше.`
- The card effect still has `cost: 2`, because the Google Sheet `cost` column remains `2`; only description was changed.
- Verified `node --check src/cards.config.js`.
- Verified local CSV with a quote-aware Node parser: 16 rows and 14 columns on every row.

Open questions:
- Should `cost` also become 5, or is this text-only for now?

## 2026-05-19 13:12 - Dev 2

Changed:
- Added a `new description` column to `cards-google-sheet.csv` immediately after `description`.
- Left all `new description` cells empty so it can be used as an edit queue.

Files:
- `cards-google-sheet.csv`
- `project-memory/updates.md`

Notes for others:
- Workflow: user can write proposed card text in `new description`; Dev applies it into `description` / `src/cards.config.js`, then clears `new description`.
- Verified the CSV has 14 columns on every row after adding the new column.

Open questions:
- None.

## 2026-05-19 13:09 - Dev 2

Changed:
- Added `src/game.config.js` for game-level configuration.
- Moved door/enemy strength config out of `src/game.js` into `src/game.config.js`.
- `src/game.js` now imports `doorConfigs` from the config file.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `src/game.config.js`
- `project-memory/updates.md`

Notes for others:
- Current configured monster strengths are 6, 10, 16, and 24.
- Verified `node --check src/game.js` and `node --check src/game.config.js`.
- Verified in the in-app browser: enemy badges still show 24, 16, 6, and 10 with no console errors.

Open questions:
- None.

## 2026-05-19 13:03 - Dev 2

Changed:
- Updated monster strengths to 6, 10, 16, and 24.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Door 1 remains 6, door 2 is now 10, the central door is 16, and the finish door is 24.
- Verified `node --check src/game.js`.
- Verified in the in-app browser: enemy badges show 24, 16, 6, and 10 at their board positions with no console errors.

Open questions:
- None.

## 2026-05-19 12:59 - Dev 2

Changed:
- Removed the numeric route position from player score cards.
- Adjusted score stats back to two columns for coins and dice bonus.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: score cards show player name, current tile pill, coins, dice bonus, and shop cards; no `позиция` stat remains and no console errors appeared.

Open questions:
- None.

## 2026-05-19 12:18 - Dev 2

Changed:
- Shortened dice spin duration by 20%, from 1000ms to 800ms.
- Kept the post-spin result hold unchanged at 813ms.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: `.die-cube` duration is `0.8s`, timing remains `linear`, result appears after the shorter spin, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 02:09 - Dev 2

Changed:
- Fixed dice visual/result mismatch for values 3 and 4.
- Swapped the final CSS cube rotations for the top and bottom faces.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Root cause: the CSS cube's top and bottom face rotations were mirrored on the X axis, so a logical 4 could visually settle as 3.
- Verified `node --check src/game.js`.
- Verified in the in-app browser: dice layer renders, 3D face transforms remain active, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 02:06 - Dev 2

Changed:
- Extended the post-spin visible hold for rolled dice by another 25%, from 650ms to 813ms.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: dice remain visible after the 1-second spin and clean up afterward with no console errors.

Open questions:
- None.

## 2026-05-19 02:04 - Dev 2

Changed:
- Extended the post-spin visible hold for rolled dice by 25%, from 520ms to 650ms.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: dice remain visible after the 1-second spin and the layer cleans up afterward with no console errors.

Open questions:
- None.

## 2026-05-19 01:59 - Dev 2

Changed:
- Added a bonus formula caption under the animated dice when a roll has a step/damage bonus.
- The caption appears on the board after the dice spin, e.g. `2 + 2 бонус = 4`.
- Multi-die bonus captions now format as `2 + 3 + 2 бонус = 7`.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser that normal no-bonus rolls do not show an extra caption and no console errors appeared.
- Browser module scope is sealed, so a direct artificial bonus-roll test was not possible from the in-app browser; the bonus caption path was checked by code inspection.

Open questions:
- None.

## 2026-05-19 01:52 - Dev 2

Changed:
- Added a permanent `+1` dice reward when a player defeats an enemy.
- Player dice bonuses now apply to both normal movement rolls and enemy battle rolls.
- Player score cards now show the current dice bonus.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser that the board loads, score cards show `+0 куб.`, and no console errors appeared.
- Deterministic browser battle test was blocked because the page does not allow overriding `Math.random`; the battle reward path was checked by code inspection.

Open questions:
- None.

## 2026-05-19 01:48 - Dev 2

Changed:
- Reverted the heavy blur on the whole 3D dice cube because it flattened the cube visually.
- Added a much smaller blur to individual die faces during spin instead.
- Bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: cube filter is `none`, face blur is `0.35px` mid-spin and `0px` on result, 3D face transforms remain active, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 01:45 - Dev 2

Changed:
- Added motion blur to dice while they spin.
- Dice return to sharp focus on the final rolled face.
- Bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser: `.die-cube` runs `die-cube-spin, die-cube-motion-blur`; mid-spin filter is `blur(1.8px)`, final result is `blur(0px)`, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 01:41 - Dev 2

Changed:
- Doubled the centered dice spin speed while keeping the 1-second duration.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser with 3 dice: duration remains `1s`, timing remains `linear`, spin angles are roughly doubled, result appears after the spin, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 01:39 - Dev 2

Changed:
- Shortened the centered dice spin from 2 seconds to 1 second.
- Increased the dice number ticker pace during the shorter spin.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser with 3 dice: `die-cube-spin` duration is `1s`, timing is `linear`, result appears after the spin, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 01:37 - Dev 2

Changed:
- Simplified the centered dice spin to one continuous linear rotation phase.
- Removed the intermediate spin keyframes and staged slowdowns.
- Final spin angles now include full turns plus the rolled face orientation, so the cube lands directly on the result after 2 seconds.
- Kept a short result hold before fading the dice layer.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser with 3 dice: `die-cube-spin` duration is `2s`, timing is `linear`, dice remain centered, result appears after the spin, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 01:33 - Dev 2

Changed:
- Removed dice throw physics from the board animation.
- Dice now appear around the center of the board, rotate in place for 2 seconds, then settle on the rolled result.
- Kept multi-die spacing so dice do not overlap.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser with 3 dice: animation duration is `2s`, dice stay centered, face transforms remain 3D, result appears after the spin, and no console errors appeared.

Open questions:
- None.

## 2026-05-19 01:24 - Dev 2

Changed:
- Continued the interrupted dice-animation work from the previous Dev chat.
- Fixed the board dice throw so each die is a real CSS 3D cube with six offset faces instead of a flat rotating tile.
- Made die size/depth calculated in pixels from the board width so `translateZ` works reliably.
- Added stronger face shading, edge definition, larger pips, and kept multi-die center landing without overlap.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified `node --check src/game.js`.
- Verified in the in-app browser with 3 dice: three `.field-die` elements, three `.die-cube` elements, 18 `.die-face` elements, pixel `--die-depth`, non-`none` face `matrix3d(...)` transforms, no console errors, and the throw layer removes after animation.
- Local server on `127.0.0.1:5173` was already running.

Open questions:
- None.

## 2026-05-18 23:05 - Dev

Changed:
- Reworked board dice throw animation to land near the center of the board.
- Spread multiple dice so they do not overlap.
- Added 3D rotation on X/Y/Z axes and a light bounce/impact feel.
- Increased dice pip size.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Dice animation now uses board-relative `left/top` percentages instead of transform percentages, so the throw path covers the board.
- Tested with 3 dice in the in-app browser: three `.field-die` elements appeared, used `matrix3d(...)` transforms, then the layer was removed.
- No browser console errors appeared.

Open questions:
- None.

## 2026-05-18 22:55 - Dev

Changed:
- Added a board-level dice throw animation before movement and enemy battle rolls.
- Multiple dice now render as separate animated dice with final pip values.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `animateDice()` now accepts the actual roll array, animates dice on the board, and still updates `#diceValue` with the total.
- The temporary `.dice-throw-layer` is appended inside `#board`, fades out, then removes itself.
- Verified in the in-app browser: a roll creates `.dice-throw-layer` with `.field-die`, removes it after animation, and no console errors appeared.

Open questions:
- None.

## 2026-05-18 22:45 - Dev

Changed:
- Reduced monster strength badges by about 30%.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Badge height is now 13px and font size is 8px in the current board viewport.
- Verified in the in-app browser: all four monster badges remain readable and smaller.

Open questions:
- None.

## 2026-05-18 22:42 - Dev

Changed:
- Updated monster strengths to 6, 8, 12, and 18 damage.
- Added a top-right strength badge to monster tiles.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Door 1 is 6, door 2 is 8, the central door is 12, and the finish door is 18.
- Monster badges are rendered from `doorConfigs.damage`, so UI and battle logic share the same values.
- Verified in the in-app browser: enemy cells show badges 6, 8, 12, and 18.

Open questions:
- None.

## 2026-05-18 22:36 - Dev

Changed:
- Swapped the board gap background to the forest-and-rocks artwork.

Files:
- `assets/backgrounds/forest_rocks_gap_1254.png`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `--board-gap-art` now points to `forest_rocks_gap_1254.png`.
- Verified in the in-app browser: the new background loads under transparent board gaps.

Open questions:
- None.

## 2026-05-18 01:52 - Dev

Changed:
- Replaced the "Плохо" icon with the tighter cropped version.
- Swapped the board gap background to the softer forest/rock artwork.

Files:
- `assets/icons/bad_tight.png`
- `assets/backgrounds/soft_forest_gap_1254.png`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `eventIcons.bad` now points to `bad_tight.png`.
- `.tile-icon-bad` returned to `88%` because the new source has much less transparent padding.
- Verified in the in-app browser: the new bad icon and background both load correctly.

Open questions:
- None.

## 2026-05-18 01:45 - Dev

Changed:
- Increased the "Плохо" icon by another 10%.
- Removed the manual offset so the icon centers inside the tile.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `.tile-icon-bad` is now `135%` with no transform; tile overflow still clips the large transparent image box.
- Verified in the in-app browser: the icon renders larger and centered in its tile.

Open questions:
- None.

## 2026-05-18 01:42 - Dev

Changed:
- Added a fantasy brown contour around playable board tiles.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Playable tiles now have a 2px brown border plus darker/light inset shadows.
- Empty background cells stay borderless, and Joe's Shop dashed outline remains visible.
- Verified in the in-app browser: playable tiles have `2px solid rgb(111, 69, 36)`, empty tiles have no border, and tile dimensions remain equal.

Open questions:
- None.

## 2026-05-18 01:37 - Dev

Changed:
- Swapped the board gap artwork to the second adventure background.
- Increased the "Плохо" icon by another 10%.

Files:
- `assets/backgrounds/adventure_gap_2_1254.png`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `--board-gap-art` now points to `adventure_gap_2_1254.png`.
- `.tile-icon-bad` is now `123%` because the source image has large transparent padding.
- Verified in the in-app browser: the new background and larger bad icon render correctly.

Open questions:
- None.

## 2026-05-18 01:32 - Dev

Changed:
- Replaced the board gap sky background with the new adventure map artwork.

Files:
- `assets/backgrounds/adventure_gap_1254.png`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `.tile-grid` still uses `--board-gap-art` with `cover`; the variable now points to `adventure_gap_1254.png`.
- Verified in the in-app browser: new artwork appears through transparent empty cells.

Open questions:
- None.

## 2026-05-18 01:25 - Dev

Changed:
- Added sky artwork behind the board grid to replace the flat blue gaps.

Files:
- `assets/backgrounds/sky_gap_1254.png`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Empty board cells stay transparent; `.tile-grid` now renders the sky background with `cover`.
- Verified in the in-app browser: sky art appears through the gaps and tile art remains on top.

Open questions:
- None.

## 2026-05-18 01:15 - Dev

Changed:
- Centered the "Плохо" icon visually inside its tile.
- Removed CSS grid divider lines between board cells.
- Filled empty board space with one continuous light-blue background.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `.tile-grid` owns the light-blue background; empty tiles are transparent to avoid seams.
- `.tile-icon-bad` has a slight transform because the source PNG has uneven transparent padding.
- Verified in the in-app browser: tile borders are 0px, empty cells are transparent, and the grid background is `rgb(217, 245, 255)`.

Open questions:
- None.

## 2026-05-18 01:10 - Dev

Changed:
- Moved door rendering anchors onto the enemy tiles.
- Door bars now sit on the enemy cell edge for all four doors.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Door mechanics still use `enemyCell` and `toCell`; only the render anchor `cell`/`edge` was adjusted in `doorConfigs`.
- Verified in the in-app browser: all closed doors are on `.tile-enemy` cells (`1-7`, `8-3`, `3-2`, `8-0`).

Open questions:
- None.

## 2026-05-18 01:05 - Dev

Changed:
- Locked the board grid to equal-size cells even when large PNG icons are inside.
- Expanded tile art backgrounds so gray, green, and red field art fills the whole cell.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `.tile-grid` now uses `minmax(0, 1fr)` tracks; `.tile` clips overflow and `.tile-icon` has fixed 100% bounds.
- Field backgrounds use `background-size: 112% 112%` to cover transparent PNG margins.
- Verified in the in-app browser: all 100 tiles report equal dimensions up to sub-pixel rounding, and tile art fills the cells.

Open questions:
- None.

## 2026-05-18 01:00 - Dev

Changed:
- Increased the "Плохо" icon so its visible size matches the "Хорошо" chest better.
- Changed start and finish cells to use the gray field art background.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `bad_512.png` has more transparent padding than the chest icon, so its CSS box is larger than `good` to match visual weight.
- Verified in the in-app browser: start/finish use `empty_field_512.png`, and bad/good icons look closer in size.

Open questions:
- None.

## 2026-05-18 00:55 - Dev

Changed:
- Added illustrated PNG icons for start, finish, bad, and TADAM board cells.
- Start and finish now render their own icons on the board.

Files:
- `assets/icons/start_512.png`
- `assets/icons/finish_512.png`
- `assets/icons/bad_512.png`
- `assets/icons/tadam_512.png`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `tileIcons` handles non-event start/finish cells; `eventIcons` handles bad/tadam/good/shop/enemy cells.
- Verified in the in-app browser: all four new images load and fit inside board cells.

Open questions:
- None.

## 2026-05-18 00:50 - Dev

Changed:
- Replaced the "Хорошо" board emoji with a chest PNG icon.
- Increased illustrated board icon sizes by about 20%.

Files:
- `assets/icons/good_512.png`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- `good`, `enemy`, and `shop` cells now render PNG icons through `eventIcons`.
- Verified in the in-app browser: all three images load and fit inside board cells.

Open questions:
- None.

## 2026-05-18 00:45 - Dev

Changed:
- Replaced enemy and Joe's Shop board emoji with illustrated PNG icons.

Files:
- `assets/icons/enemy_512.png`
- `assets/icons/joes_shop_512.png`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Enemy and shop icons are now rendered as image HTML from `eventIcons`.
- Verified in the in-app browser: both images load at 512px source size and fit inside board cells.

Open questions:
- None.

## 2026-05-17 23:40 - Dev

Changed:
- Added illustrated tile art for gray route/event cells, green cells, and red cells.
- Kept start, finish, and blank board gaps on the existing styling.

Files:
- `assets/tiles/empty_field_512.png`
- `assets/tiles/green_512.png`
- `assets/tiles/red_512.png`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Tile art is applied through CSS variables in `styles.css`; old generic tile grain is disabled for textured cells.
- Verified in the in-app browser: gray, green, red, and event tiles load the new PNG backgrounds and icons remain visible.

Open questions:
- None.

## 2026-05-17 19:20 - Dev

Changed:
- Removed the inline "Далее" button from action-prompt toasts.
- Action prompts now temporarily turn the main roll button into "Далее".
- Clicking the main "Далее" button resolves the prompt, hides the toast, and restores the normal roll button state.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- `showActionPrompt()` now stores an `actionPromptResolver`; `renderTurn()` uses it to switch `#rollBtn` text and enabled state.
- Verified in the in-app browser: no `.event-toast-next` remains after reload, the script cache key is updated, and no JS errors appeared.
- Verified syntax with `node --check src/game.js`.

Open questions:
- None.

## 2026-05-17 19:01 - Dev

Changed:
- Enlarged the wide-browser board again: `calc(100dvh - 205px)` with `880px` max.
- Reduced wide-mode board header height to 58px.
- Reworked wide-mode choice/shop popups so the overlay is no longer square and the dialog scrolls inside the available map area.
- Tightened wide-mode shop choice cards so popups fit better vertically.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Codex compact mode remains unchanged; verified current in-app browser width `562px` still has a 72px header and 528px board.
- Verified syntax with `node --check src/game.js` and reloaded the in-app browser with no JS errors.
- External Chrome cannot be directly inspected from this Codex browser session; this was tuned from the user's Chrome screenshot plus in-app regression checks.

Open questions:
- None.

## 2026-05-17 18:56 - Dev

Changed:
- Enlarged the wide-browser board sizing after the first wide layout proved too conservative.
- Wide board now uses `min(100%, calc(100dvh - 255px), 820px)` instead of `calc(100dvh - 330px)` / `720px`.
- Tightened wide-mode top cards, board header, map padding, and chronicle height to give the field more room.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Codex compact mode remains unchanged; verified current in-app browser width `562px` still has a 72px header and 528px board.
- Verified syntax with `node --check src/game.js` and reloaded the in-app browser with no JS errors.

Open questions:
- None.

## 2026-05-17 18:50 - Dev

Changed:
- Added a wide-browser responsive layout for viewports `1200px+`.
- Wide layout reduces player-card height, board header height, map padding, and sizes the board from available viewport height.
- Wide layout expands the app shell and right info column so regular Chrome uses more available space.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The Codex compact view remains under the existing `max-width: 820px` rules; verified current in-app browser width `562px` keeps the same 72px header and 528px board.
- Verified syntax with `node --check src/game.js` and reloaded the in-app browser with no JS errors.

Open questions:
- Wide Chrome should now fit substantially better, but exact browser-toolbar height can vary; tune `calc(100dvh - 330px)` if the board is still too tall/short on a specific setup.

## 2026-05-17 18:39 - Dev

Changed:
- Added the rule that landing cell effects only resolve after forward movement.
- Backward forced movement now only moves and highlights the final cell; it does not trigger that cell's effect.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Normal dice movement and positive forced movement still resolve landing effects.
- Negative `movePlayerSteps()` no longer calls `resolveLanding()`.
- Verified syntax with `node --check src/game.js` and reloaded the in-app browser with no JS errors.

Open questions:
- None.

## 2026-05-17 18:31 - Dev

Changed:
- Fixed optional extra-die handling so multiple bought Joe's Shop extra-die cards each prompt separately.
- Added `1/2`, `2/2`, etc. numbering to the inline pre-roll prompt when multiple extra-die cards are available.
- The chosen extra dice now sum across all accepted cards before the roll or enemy battle.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Replaced the old single `optionalExtraDieEffect()` lookup with `optionalExtraDieCards()` and a sequential `chooseSingleExtraDie()` flow.
- Verified syntax with `node --check src/game.js` and reloaded the in-app browser with no JS errors.

Open questions:
- None.

## 2026-05-17 18:25 - Dev

Changed:
- Added dashed outlines to Joe's Shop tiles.
- Joe's Shop now triggers when a player steps onto it during movement, even if it is not the final landing cell.
- After resolving the shop choice, movement continues with the remaining steps.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Pass-through shop triggers are handled by `resolvePassThroughShop()` in both normal movement and effect-based movement.
- Final landing on a shop still uses the existing `resolveLanding()` flow, so the shop is not double-triggered on the last step.
- Verified in the in-app browser: all three shop tiles have dashed outlines and no JS errors after reload.
- Verified syntax with `node --check src/game.js`.

Open questions:
- None.

## 2026-05-17 17:09 - Dev

Changed:
- Aligned enemy door damage thresholds with the user's numbered map: door 1 = 6 damage, door 2 = 8, door 3 = 10, door 4 = 13.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Door positions verified in the in-app browser: door 1 `7-3/right`, door 2 `0-7/right`, door 3 `4-2/left`, door 4 `8-0/right`.
- All four doors render with two player-color dots by default.
- Verified syntax with `node --check src/game.js`.

Open questions:
- None.

## 2026-05-17 17:04 - Dev

Changed:
- Added personal enemy-gated doors: each door tracks which players have defeated its guarding enemy.
- Added enemy battle on landing: roll dice, apply extra dice from Joe's Shop and passive +1 roll bonuses, then compare against enemy damage.
- Set enemy damage thresholds: 1st enemy 6, 2nd 8, 3rd 10, 4th 13.
- On success, the linked door opens for that player; on failure, the player returns to start.
- Added colored player dots on locked doors and hide a door once every player has opened it.
- Blocked movement through locked doors.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Door mapping: `1-7 -> 0-7` damage 6, `8-3 -> 7-3` damage 8, `3-2 -> 4-2` damage 10, `8-0 -> 9-0` damage 13.
- Verified in the in-app browser: four doors render with two player-color dots by default, no seal text appears, and no JS errors after reload.
- Verified syntax with `node --check src/game.js`.

Open questions:
- None.

## 2026-05-17 16:53 - Dev

Changed:
- Moved the new central door from `4-4` to `4-2`, directly after the enemy cell.
- Bumped the game script cache key.

Files:
- `index.html`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Verified in the in-app browser: `4-2 door-edge-left` exists and the old `4-4` door is gone.
- Verified syntax with `node --check src/game.js`.

Open questions:
- None.

## 2026-05-17 16:46 - Dev

Changed:
- Removed the old seal mechanic from doors and player score cards.
- Removed seal counters, seal-removal logs, and seal-related styling.
- Added a new visual door at cell `4-4` on the left edge.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Doors are now static visual gates, not seal counters.
- Verified in the in-app browser: four doors render, including `4-4 door-edge-left`, and player cards no longer show seal text.
- Verified syntax with `node --check src/game.js`.

Open questions:
- None.

## 2026-05-17 16:06 - Dev

Changed:
- Removed the stray trailing dot from green/red field movement action prompts.
- Changed action-prompt copy layout from grid to normal text flow so punctuation cannot become a separate grid row.
- Ensured player names keep their player color inside action prompts.
- Bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The dot came from the action prompt message ending after a `<strong>` element while `.event-toast-copy` was a grid.
- Verified syntax with `node --check src/game.js`.

Open questions:
- None.

## 2026-05-17 16:02 - Dev

Changed:
- Fixed the board action header height so it no longer grows/shrinks between normal roll state and Joe's Shop pre-roll choice.
- Fixed the roll button column width so action/info blocks do not resize when button text changes.
- Constrained the inline pre-roll action content to fit inside the fixed action block.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified in the in-app browser at the current narrow width: header is 72px high, action block is 230px wide / 55px high, roll button column is fixed at 111px.
- Verified syntax with `node --check src/game.js`.

Open questions:
- None.

## 2026-05-17 15:57 - Dev

Changed:
- Rebalanced the board header columns so the field/card info block is narrower and the actions block is wider.
- Made the bought Joe's Shop extra-die action copy more compact.
- Tightened the inline pre-roll action controls so they fit beside the roll button without expanding the header.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- On the current in-app browser width, the field info block measured 127px and the actions block measured 230px, with a 6px gap before the roll button.
- Verified syntax with `node --check src/game.js`.

Open questions:
- None.

## 2026-05-17 15:43 - Dev

Changed:
- Moved the optional bought "Лавка Джо" pre-roll choice out of the modal overlay and into the actions panel left of the roll button.
- Added compact inline "Заплатить / Не платить" controls for the extra-die card.
- Bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- During `pendingPreRoll`, `choicePanel` is now hidden and `#turnActions` renders the paid extra-die choice.
- Verified syntax with `node --check src/game.js` and reloaded the in-app browser with no JS errors in normal state.

Open questions:
- None.

## 2026-05-17 15:38 - Dev

Changed:
- Added a small end-game popup over the field: "Победил - X!".
- Added a short CSS confetti animation that plays around the winner popup.
- Added the winner popup layer to the board area and bumped the game script cache key.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- The popup is rendered only when `state.finished` is true and uses `findWinner()` after final coin scoring.
- Verified in the in-app browser: the hidden winner layer exists, does not block normal clicks, and no JS errors appeared after reload.

Open questions:
- None.

## 2026-05-17 15:22 - Dev

Changed:
- Removed the "Сейчас ходит" side card.
- Moved the party settings controls into that side-panel slot and stretched them across the available UI width.
- Bumped the game script cache key so the optional removed-card references load reliably.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Verified in the in-app browser at `127.0.0.1:5173`: the old turn card is gone, settings show 2 players / 1 die by default, and no JS errors appeared.

Open questions:
- None.

## 2026-05-17 15:15 - Dev

Changed:
- Removed the visible "Кольцевое поле / Ход" block from the board header.
- Expanded the dice, field info, action, and roll controls into the freed header space.
- Made the old round title DOM reference optional so removing the visible title does not break rendering.

Files:
- `index.html`
- `styles.css`
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Verified in the in-app browser at `127.0.0.1:5173`: the header controls fill the row, no JS errors appeared, and clicking "Бросить кубик" still advances into the next action flow.

Open questions:
- None.

## 2026-05-17 03:28 - Dev

Changed:
- Highlighted player names in game messages with the player's color.
- Applied the color format to event toasts and chronicle log messages.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified in the in-app browser: "Пес" rendered in the orange player color in both the top toast and the latest chronicle entry.

Open questions:
- None.

## 2026-05-17 03:25 - Dev

Changed:
- Renamed the four player presets to "Пес", "Кот", "Выдра", and "Белка".

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Player colors were kept unchanged.
- Verified in the in-app browser: default 2-player game shows "Пес" and "Кот".

Open questions:
- None.

## 2026-05-17 03:21 - Dev

Changed:
- Changed the player-card badge from numeric cell label to cell name.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Numeric position is still shown in the stats row.
- Verified in the in-app browser: starting badges show "Старт" while position stats still show "1".

Open questions:
- None.

## 2026-05-17 03:19 - Dev

Changed:
- Fixed a roll-blocking runtime error in the new turn actions panel.
- `turnActionsText` now calls the existing `optionalExtraDieEffect` helper.

Files:
- `src/game.js`
- `project-memory/updates.md`

Notes for others:
- Verified in the in-app browser: clicking "Бросить кубик" moves the active token, updates the log, and advances the turn.

Open questions:
- None.

## 2026-05-17 03:14 - Dev

Changed:
- Removed the visible title/top setup area from the first game screen.
- Moved player count, dice count, and New Game controls below the main game content.
- Rebalanced the narrow layout so player cards, board header, and the full board fit in the visible Codex browser viewport.

Files:
- `index.html`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- In the 599x711 in-app browser check, player cards start at the top, the board bottom measured 698px, and setup controls are below the screen.

Open questions:
- None.

## 2026-05-17 03:10 - Dev

Changed:
- Refit the main game screen for the user's MacBook/Codex browser viewport.
- Compressed the top project bar, player cards, board header, and board sizing in the narrow layout.
- Made the board size depend on viewport height so player cards plus the full board fit on screen.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Verified in the in-app browser at 599x711: topbar, two player cards, board header, and the full board fit from page top.
- Measured board bottom at 692px with viewport height 711px.

Open questions:
- None.

## 2026-05-17 02:58 - Dev

Changed:
- Compressed the narrow-board header so the game board fits in the visible Codex browser space again.
- Changed the mobile/narrow header controls from a two-row control stack to one compact row.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- In the in-app browser check, the header measured 66px high and the board fit within the visible viewport.

Open questions:
- None.

## 2026-05-17 02:50 - Dev

Changed:
- Reworked the board header controls into a compact layout that keeps the same block footprint while adding room for current-player actions.
- Added a `turnActions` area for available actions such as paying 2 coins for +1 die.
- Added a cache-busting version to the game script URL so reloads pick up fresh UI logic.

Files:
- `index.html`
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The visible action area is informational for now; the actual +1 die choice still appears at roll time through the existing confirmation flow.
- Browser reload could not be fully verified from shell because `127.0.0.1:5173` was not reachable there.

Open questions:
- None.

## 2026-05-17 02:43 - Dev

Changed:
- Added a top-of-field "Далее" prompt before effect-driven movement starts.
- Move cards and TADAM field movement now pause the turn until the player confirms the action.
- Styled the prompt as an actionable variant of the existing event toast.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- Ordinary dice movement still starts immediately; only effect movement is paused.
- Verified the app reloads in the in-app browser with no console errors.

Open questions:
- None.

## 2026-05-17 02:36 - Dev

Changed:
- Updated the Joe's Shop `extra-die` card title to "Перед броском кубика можешь заплатить 2 монеты и кинуть на 1 кубик больше".
- Kept the card mechanic unchanged.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/updates.md`

Notes for others:
- The card remains `optional-extra-die` with cost 2 and +1 die.

Open questions:
- None.

## 2026-05-17 02:33 - Dev

Changed:
- Renamed the Joe's Shop `step-plus` card to "+1 к броску кубика".
- Updated its short title and description in both card sources.

Files:
- `src/cards.config.js`
- `cards-google-sheet.csv`
- `project-memory/updates.md`

Notes for others:
- Mechanics stayed the same: the card still adds 1 to the movement result via `passive-step-bonus`.

Open questions:
- None.

## 2026-05-17 02:28 - Dev

Changed:
- Repositioned field popups so the overlay is centered over the board square instead of the whole map wrapper.
- Kept shop and choice dialogs centered on desktop and mobile, with internal scrolling if the dialog is tall.

Files:
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The popup layer now matches the board width and square aspect ratio.

Open questions:
- None.

## 2026-05-17 02:25 - Dev

Changed:
- Set the default new-game player count to 2 players in the UI.

Files:
- `index.html`
- `project-memory/updates.md`

Notes for others:
- The game logic already reads the selected player count from the UI when starting a new game.

Open questions:
- None.

## 2026-05-17 01:36 - Dev

Changed:
- Replaced the old board layout with the new 10x10 map from the user reference.
- Added visual enemy cells as map markers only; no enemy mechanics were added yet.
- Moved the route, field cells, and cell events to a single board layout config.
- Added vertical door-bar styling for the new door positions.
- Ran syntax and map-structure checks; the sandbox could not start the local server because binding to `127.0.0.1:5173` was denied.

Files:
- `src/game.js`
- `styles.css`
- `project-memory/updates.md`

Notes for others:
- The right-side legend from the reference image is not rendered in the prototype.
- Enemy cells currently only display `😈` and show "effect will appear later" in the field info.

Open questions:
- None.

## 2026-05-17 00:00 - Important

Changed:
- Removed a card-specific balance detail from the current important-state summary.
- Cleaned the project-memory log so this detail is not surfaced as an important event.

Files:
- `project-memory/handoff.md`
- `project-memory/updates.md`

Notes for others:
- Keep important-event summaries focused on project state, roles, folders, workflow, and active implementation direction.

Open questions:
- None.

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
