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
