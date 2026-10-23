# Правила дизайна и карт

Живые правила из прежней `project-memory/README.md` (перенесены 11 октября 2026, текст без изменений). Арт и интерфейс — Art, правила ходов и карты — GD.

Ещё: [спящий дракон](dragon-visual-contract.md), [инфографика TADAM](tadam-infographic-rules.md).

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

## Shared Google Sheets

- `Cards Config`: `https://docs.google.com/spreadsheets/d/1dv8cOcoY9P1WZOw2UQ-prUccte2BprZMp0DFCSL0pME/edit`
  - Tabs: one per deck (`good`, `bad`, `tadam`, `event`, `legendary`, `shop`), laid out by the sheet's own script, and `Баланс` first: the balance numbers of the board rules (`src/game.config.js` `balanceConfig`, mirror `balance-google-sheet.csv`, since 16 Oct 2026).
  - Since 12 Oct 2026 (PM task) the source is `src/cards.config.js` in `dev`; `cards-google-sheet.csv` is its mirror (`node tools/cards-sheet/cards-csv.mjs`). The sheet takes the CSV from `dev` by itself and sends the user's edits back as a commit to `dev`: `tools/cards-sheet/README.md`.
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
- Apply this to `Cards Config` player-facing fields such as `title`, `shortTitle`, and `description` (the sheet's «Проверить» flags a final period).
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
