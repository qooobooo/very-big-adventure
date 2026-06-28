# Project Memory

This folder is the shared mailbox for Codex chats working on "Очень Большая Бродилка".

## Routine

1. Before work, read:
   - `handoff.md`
   - `updates.md`
   - your inbox in `inbox/`
   - `prompts/next-chat.md`
   - `prompts/read-news.md`
2. During work, keep edits inside your assigned project folder.
3. After meaningful work, append a short update to `updates.md`.
4. If Dev 1, Dev 2, Dev 3, Important, GD, Art / UI 1, Art / UI 2, QA 1, or QA 2 needs to act, write a note in the matching inbox file.
5. If a task is handed back to a specific active role/chat, or the next step requires that role to react, also send a direct message to that role's active Codex thread. Do not rely only on the inbox file for urgent or expected handbacks.

## Task Lifecycle

0. For planning and executing multi-role work, GD routes tasks through the appropriate specialists by default:
   - Dev handles implementation.
   - Art / UI handles visual assets, board presentation, and UI polish.
   - QA handles testing only when the user explicitly asks to involve QA.
   - GD should not directly implement cross-role plans unless the user explicitly asks GD to do the implementation personally or an urgent tiny documentation/memory edit is enough.
   - GD plans and multi-role tasks must include explicit `Ownership`: which role/chat owns each part of the work.
   - If a task is split into waves, every wave must have an assigned owner before it is sent to development.
1. GD creates a clear implementation-ready task and sends it to the right executor:
   - Dev tasks go to `inbox/for-dev.md` and may also be sent directly to a Dev thread.
   - QA tasks go to `inbox/for-qa.md` only when the user explicitly asks to involve QA, for example says `привлеки QA`.
   - Art / UI tasks go to the matching Art / UI inbox or thread.
   - For cyclic or one-item-at-a-time task queues, GD owns the queue and sends exactly the next task to the chosen executor. The executor completes that one task, updates the relevant docs, and must ping GD directly in the active GD thread with the handback summary; writing only to inbox/docs is not enough. After that direct handback, GD sends the next task in the cycle. Repeat until GD has no more queued tasks or the user changes direction.
2. By default, QA and GD approval gates are skipped. The executor completes the task, writes a short handback, updates `updates.md`, and sends the finished task to GD only as a context note.
   - If GD or another active role is expected to react, the executor must also ping that role's active Codex thread directly with the handback summary.
3. GD does not verify or approve handbacks by default:
   - GD keeps the result in mind for future design decisions and user reports.
   - GD checks, approves, rejects, or writes rework only when the user explicitly asks for review/approval/checking, or when GD is separately asked to involve QA.
4. If the user explicitly asks to involve QA, use the QA-gated pipeline:
   - The executor sends the finished task to QA first.
   - If QA does not approve the task, QA sends a reproducible rework task back to the executor.
   - If QA approves the task, QA sends the result to GD as a context note unless the user also asked for GD approval.
5. If the user explicitly asks for GD approval/checking, GD reviews the handback:
   - If approved, GD gives the user a brief report and marks/records the task as accepted.
   - If not approved, GD gives the user a brief report, writes a clear rework task, and sends it back to the executor.

## Board-Click UX

- If a task expects the player to click cells on the board, the board must stay actually clickable. Do not leave a large blocking modal or choice dialog over the field while board selection is active.
- Use a small non-blocking HUD, hidden panel, side/phone actions, or safe auto-confirm where appropriate. Existing buttons may remain as fallback only if they do not block board clicks.
- Highlight only valid target cells, make selected/current targets readable, and ensure unrelated cells do not accidentally resolve the choice.

## UI Button Style Rules

- Primary bright gold buttons are reserved for true primary actions such as `Бросить`, start/new-game, or a deliberate main confirmation.
- Utility and icon buttons, including settings, fullscreen, phone-room, reference, history/info, copy, and popup close buttons, should use the shared dark fantasy surface: dark brown/green fill, warm gold border, subtle inset highlight, and restrained shadow.
- Utility button hover/focus states should stay dark and only lift the border/glow slightly. They must not turn into the bright gold primary-button fill.
- Active/toggled utility buttons may use a stronger warm border or ring, but should keep the dark surface.
- New custom utility buttons must override the global `button:hover:not(:disabled)` rule with matching or higher specificity, for example `.my-utility-button:hover:not(:disabled)`, so the generic bright hover cannot leak in.
- Icon-only buttons need a centered glyph/icon, stable square dimensions, and an `aria-label`/`title` when the icon is not self-explanatory.

## Popup Fullscreen Rules

- Every popup/dialog/modal that can be opened from the host UI must also open visibly in fullscreen / big-screen mode.
- Fullscreen mode targets `.app-shell`, so popup DOM should live inside `.app-shell` or be explicitly moved/ported there before opening.
- Any fullscreen CSS that gives `.app-shell > *` a base stacking context must include explicit overlay exceptions for new popup roots, matching the existing `info-history-popup` pattern.
- Popup close paths such as close button, backdrop, and Escape should keep working in fullscreen mode.

## Movement Trigger Rules

- By default, field effects and card/TADAM triggers that say they happen on stopping, landing, passing, jumping, or sharing a cell work only during forward movement.
- Backward movement, return-to-start movement, and direct teleports/swaps do not trigger those effects unless the card/field text explicitly says otherwise.
- If an effect explicitly says the destination field triggers after backward movement, only that destination field effect should trigger; unrelated forward-only TADAM/card triggers such as same-cell battle or jump/pass effects should still stay gated unless explicitly named.
- When adding movement code, pass enough movement context to landing/pass-through resolvers so they can distinguish forward, backward, return-to-start, teleport, swap, and forced movement.

## Chat Roles

- `Important`: project memory, summaries, status, and coordination.
- `Dev 1`: main "Очень Большая Бродилка" prototype in `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.
- `Dev 2`: additional implementation chat for the prototype.
- `Dev 3`: additional implementation chat for the prototype.
- `GD`: game design for "Очень Большая Бродилка"; owns rules, contracts, balance, core loop, and implementation-ready design notes for Dev roles.
- `Art / UI 1`: visual assets and UI direction for the prototype.
- `Art / UI 2`: additional visual assets and UI direction chat for the prototype.
- `QA 1`: testing, smoke checks, regression checks, and bug reports for Dev roles.
- `QA 2`: additional testing chat for smoke checks, regression checks, and bug reports.

Do not edit local Codex session logs. They are read-only context.

GitHub link for `next-chat.md`, useful for browser ChatGPT chats without local file access:
`https://github.com/qooobooo/very-big-adventure/blob/main/project-memory/prompts/next-chat.md`

Use `prompts/read-news.md` when the user says "прочти новости".

## Shared Google Sheets

- `Cards Config`: `https://docs.google.com/spreadsheets/d/1dv8cOcoY9P1WZOw2UQ-prUccte2BprZMp0DFCSL0pME/edit`
  - Tabs: `good`, `bad`, `tadam`, `shop`, `event`.
  - Canonical card-edit source; keep it synced with `src/cards.config.js` and `cards-google-sheet.csv`.
- `Games Log`: `https://docs.google.com/spreadsheets/d/1uC1xUk52IbpHfm9tNtHT2_cmFSNQIKCkct88TsqmmV8/edit`
  - Tabs: `Games`, `Players`.
  - Used by the game-history save/export flow and stats/reporting work.

## Card Text Style

- Player-facing card text never ends with a final period.
- If a card has several sentences, periods may stay between sentences, but the final sentence must have no trailing period.
- Do not mention `лицом вверх` / `лицом вниз` in player-facing text unless the mechanic specifically depends on that state.
  - If an effect can use any owned `Лавка Джо` card, write simply `карта Лавки Джо` / `карты Лавки Джо`.
  - If a mechanic excludes face-up or face-down cards, the UI text, disabled reasons, logs, and actual behavior must all say that clearly.
  - When unsure whether face state is part of the rule or just leftover implementation wording, ask GD/user before changing the rule.
- Apply this to `Cards Config` player-facing fields such as `title`, `shortTitle`, and `description`, and keep Google Sheet, `src/cards.config.js`, and `cards-google-sheet.csv` aligned.
- Internal config notes may keep normal punctuation unless they are displayed on a card.

## Card Face Layout

- Card faces should use the card area tightly: keep clean edge padding, but avoid large empty lower areas.
- The top illustration should be compact, roughly the upper 40-45% of the face at most, so long text can stay readable.
- Text should start around the middle of the card, fill the lower half, and keep a small bottom margin instead of floating near the top.
- Split multi-sentence card descriptions into separate visual lines/paragraphs where possible.
- Prefer larger readable text with balanced wrapping; avoid clipped text, one-letter wraps, and excessive shrinking.
- Gameplay revealed cards and settings reference cards must share the same `cardFaceStageMarkup(...)` / `cardFaceMarkupForDeck(...)` path and CSS variables (`--card-face-width`, `--card-face-gap`). Do not add reference-only card-face sizing or manual per-card reference layout; new cards in existing decks should appear in settings through the same renderer automatically.
- Card text CSS must target visual text lines as direct children (`> span`) and keep nested icon wrappers such as `.coin-amount`, `.dice-amount`, and `.card-text-nowrap` inline inside `.card-face-stage`; descendant-wide `span` rules can break settings/gameplay parity.
- Revealed card titles must stay in a fixed top row inside the card text block; dense/long card variants may shrink title/body type and gaps, but must not move the title vertically from card to card.
- Card face titles must stay plain text: do not run coin/dice/step/strength icon replacement inside titles. If a title concept includes an icon-like word, write it out as text, for example `Кубик судьбы`; keep coin/dice icons for descriptions and rules text only.
- Cards that grant persistent artifacts should be marked in `src/cards.config.js` with `artifact: true`; use that flag for artifact-specific card face styling instead of hard-coded title checks.

## TADAM Card Infographics

Full rules for continuing this work are in `project-memory/tadam-infographic-rules.md`.

- Add TADAM infographics gradually per card. Do not replace `assets/cards/tadam_front.png` globally unless the user explicitly asks for a full-deck visual redesign.
- For a converted TADAM card, create a card-specific face asset named by id, for example `assets/cards/tadam_<card-id>_front.png`, and connect it with a relative `frontArt` field on that exact card in `src/cards.config.js`.
- Cards without `frontArt` must keep the standard TADAM face and logo.
- The infographic should sit in the upper part of the card and leave a visible breathing gap before the title. Keep the art compact enough that the title and description remain readable, roughly within the upper 35-40% of the card face when possible.
- Current accepted TADAM infographic slot on a `744x1039` face is approximately `x=82 y=84 w=580 h=336`, with a shared warm parchment backing. New generated top art should keep outer/background areas close to `#D8910F` / `rgb(216, 145, 15)` so the backing does not become noticeably darker, redder, or larger than the accepted cards.
- Preserve the normal DOM-rendered title and description below the art. The infographic should replace the generic TADAM logo/art area, not bake the card title or full rules text into the image.
- The infographic must match the actual current config/effect values. If the effect gives `3` coins, the visual must say `+3`, not an older concept value.
- Show the essence of the effect, not every rule detail. Use clear symbols, arrows, coins, dice, routes, or player tokens only when they reduce confusion.
- Avoid misleading economy direction. If coins are awarded by the game/bank, show them coming from a neutral source, not from other players, unless the card actually steals or transfers coins.
- Player figures in TADAM infographics should read as board-game pawns/classes, not animal characters. Use clothing and accessories for class identity; avoid references to specific animals.
- For player states: the receiving/benefiting pawn may smile or be highlighted; other players should usually have neutral faces unless the effect explicitly harms them.
- Use low-to-medium detail and strong silhouettes so the image reads at card size. Prefer simple composition over many small props.
- Keep the style in the current fantasy board-game look: warm parchment, gold accents, soft magic glow, clean readable outlines, and no modern UI-like panels.
- Avoid hard rectangular backing blocks. If generated art has a parchment rectangle, blend or mask it into the card texture with soft edges.
- Keep safe padding from the card border and from text. Do not let art touch the title row or card frame.
- Icons may appear inside the infographic, but card titles must remain plain text. Do not place coin/dice/step/strength icons inside title text.
- Do not change card rules, balance, counts, deck lifecycle, or descriptions while adding an infographic unless the user separately asks for a gameplay/text change.
- After adding or changing a card-specific infographic, bump the asset cache key, `cards.config.js` import cache key, and host `game.js` cache key so the browser picks up the new art.
