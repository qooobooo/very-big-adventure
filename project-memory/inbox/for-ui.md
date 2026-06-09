# Inbox For Art / UI 1 / Art / UI 2

For UI/UX and art-asset tasks related to "Очень Большая Бродилка" in `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.

## Open Items

- DONE 2026-06-09 02:14 - `Игра Джо` tile icon:
  - Owner: `Art / UI 2`.
  - Status:
    - Completed by `Art / UI 2`.
    - Handback sent to GD as context only.
    - QA was not involved.
  - User request:
    - Create art for the new field `Игра Джо`.
    - Art/UI 1 is busy, so use Art/UI 2.
  - Expected asset:
    - `assets/icons/joe_game_512.png`.
    - Transparent PNG, 512x512.
  - Visual direction:
    - Field name: `Игра Джо`.
    - Rule fantasy: Joe runs a dice mini-game where players get assigned dice numbers and a winner can receive 2 Joe Shop cards.
    - Art/UI 2 may choose the final image freely.
    - Suggested motifs: Joe mascot/merchant sign, dice, cards/chest of `Лавка Джо`, lucky game table.
    - Must be readable on a small `field2` tile.
    - Must be visually distinct from ordinary `Лавка Джо` and `Аукцион Джо`.
    - Keep the current game icon style: bright fantasy board-game asset, transparent cutout, strong silhouette.
  - Constraints:
    - Visual-only task unless a tiny cache-key update is needed.
    - Do not change gameplay rules, board placement, card configs, or unrelated assets.
    - Preserve unrelated local changes and untracked `outputs/`.
  - Verification:
    - PNG is 512x512 RGBA with transparent corners.
    - Visual read at small tile size.
    - `git diff --check`.
  - Handback:
    - Update `project-memory/updates.md`.
    - Send GD a context note only; no QA unless the user explicitly asks.

- UI PIPELINE RULE 2026-06-09 01:10 - GD routes visual work through Art/UI:
  - For future planning and plan execution, GD must send visual/UI/asset work to Art/UI specialists by default.
  - GD should not directly produce final visual assets for cross-role plans unless the user explicitly asks GD to do it personally or the change is an urgent tiny documentation/memory edit.
  - Art/UI handbacks still follow the current pipeline: send to GD as context only, no QA unless the user explicitly asks.

- ACTIVE ART/UI 2026-06-09 01:08 - Final `Очень Плохо` tile icon:
  - Owner: `Art/UI 1` or `Art/UI 2`.
  - Context:
    - User asked that the `Очень Плохо` art be handled through Art/UI.
    - GD mistakenly created a working placeholder directly while implementing the vertical slice.
    - Current placeholder file exists at `assets/icons/very_bad_512.png` and is already wired into the game.
  - Task:
    - Review the current icon and either approve it as final visual art or replace it with a better final asset.
    - Expected final path must stay: `assets/icons/very_bad_512.png`.
    - Export transparent PNG, 512x512.
  - Visual direction:
    - New field: `Очень Плохо` / take 3 `Плохо` cards.
    - It should read as “Плохо x3” on a small `field2` tile.
    - Suggested motif: three cursed Bad chests/cards/skulls, or another clear triple-Bad symbol.
    - Must differ from ordinary `Плохо`, not blend into the gray tile backing, and match the current board icon style.
  - Constraints:
    - Do not change gameplay code unless you need a tiny cache-key/image reference update.
    - Preserve unrelated local changes.
  - Verification:
    - Visual check on `field2` cells `8-7`, `9-7`, `10-7`.
    - Confirm the image remains 512x512 with transparency.
  - Task lifecycle:
    - Current pipeline: send handback to GD as a context note only; no GD approval required by default and no QA unless the user explicitly asks.

- UI PIPELINE RULE 2026-06-09 00:18 - Handback to GD is context, not approval:
  - By default, after Art/UI completes a task, write a short handback, update `project-memory/updates.md`, and send it to GD as a context note only.
  - GD does not verify or approve Art/UI handbacks by default.
  - GD review/approval happens only if the user explicitly asks for review/approval/checking.
  - QA is also skipped by default and is involved only when the user explicitly asks, for example `привлеки QA`.

- UI owns visual style, board presentation, icon/art assets, and clean PNG exports for the web prototype.
- Keep generated/processed assets inside the project folder and document changes in `project-memory/updates.md`.
- If an implementation task is needed from Dev, write it in `project-memory/inbox/for-dev.md`.
- Do not edit local Codex `.jsonl` session files.
