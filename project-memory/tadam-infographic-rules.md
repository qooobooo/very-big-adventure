# TADAM Infographic Rules

Use this file when creating or replacing card-specific `ТАДАМ!` infographics.

These rules are meant to be enough for any active chat to continue the TADAM art pass without reading the full chat history.

## Workflow

- Work strictly one TADAM card at a time unless the user explicitly asks for a batch.
- Treat older full-deck TADAM infographic assets as drafts unless a card has been explicitly accepted in the current style.
- Do not start the next TADAM card until GD or the user sends it.
- If the task came from GD or another active role, write the inbox handback and also send a direct message to that role's active Codex thread.
- QA is not involved unless the user explicitly asks.

## Files

- Card data lives in `src/cards.config.js`.
- Card-specific TADAM art files live at `assets/cards/tadam_<card-id>_front.png`.
- Do not replace `assets/cards/tadam_front.png` globally unless the user explicitly asks for a full-deck redesign.
- Connect the art only on the matching TADAM card with:
  `frontArt: "./assets/cards/tadam_<card-id>_front.png?v=<cache-key>"`
- After changing an infographic, bump:
  - the card's `frontArt` cache key in `src/cards.config.js`;
  - the `cards.config.js` import cache key in `src/game.js`;
  - the host `src/game.js` cache key in `index.html`.

## Card Face Format

- Final card face asset must be `744x1039` PNG with RGBA.
- Preserve the existing TADAM card frame and lower parchment/text area.
- Preserve normal DOM-rendered title and description below the art.
- Do not bake the card title, description, or full rule text into the image.
- The infographic replaces only the generic top-art area.
- Accepted top-art slot on a `744x1039` face:
  - `x=82`
  - `y=84`
  - `w=580`
  - `h=336`
- Keep a visible breathing gap before the DOM title row.
- Do not let art touch the title row, description, or card frame.

## Backing And Color

- Use one consistent warm parchment backing across all accepted TADAM infographics.
- Outer/background areas of the top-art slot should stay close to:
  - `#D8910F`
  - `rgb(216, 145, 15)`
- Small variance is fine; a recent accepted `Красная беда` edge/background average was about `#DA920F`.
- Keep red, green, magic, and danger colors localized to effect elements. Do not tint or darken the whole backing.
- If generated art has a hard rectangular panel, blend or mask it into the card texture with soft edges.
- Avoid modern UI panels, flat badges, or hard rectangular blocks.

## Accepted Style

Current accepted references:

- `Зеленый попутчик` / `green-forward`
- `Красный откат` / `red-back`
- `Зеленая удача` / `green-good`
- `Красная беда` / `red-bad`

Style direction:

- Rich warm fantasy board-game illustration.
- Golden parchment, gold accents, soft magic glow.
- Cute board-game pawns/classes, not animal characters.
- Thick clean outlines and strong silhouettes.
- Low-to-medium detail so the image reads at card size.
- The effect should be understandable at a glance.

## Pawn Rules

- Player figures should read as board-game pawns/classes.
- Current accepted direction for the knight-like pawn: no shield unless the specific effect requires one.
- Do not put a shield on the belly, chest, clothing emblem, or as a floating accessory.
- If a class prop is needed, make it clearly held or worn in a sensible way.
- If an infographic needs several players, keep the active pawn in the established red-cape knight style and make other players visually distinct while staying in the same pawn/figurine language, for example a purple mage, green hunter, or orange barbarian.
- Benefiting pawns may smile or glow.
- Other players should usually look neutral unless the effect explicitly harms them.

## Effect Accuracy

- Match the actual current config/effect values.
- If the effect gives `+3`, the visual must say `+3`, not an older value.
- If the effect moves `+5` or `-5`, direction must be visually clear.
- If the effect grants a card, show a miniature card of the right deck.
- Use the actual deck concept:
  - `Хорошо`: warm/golden card, chest-like good-card motif.
  - `Плохо`: darker/cursed card, cursed chest/skull-marked motif.
  - `Лавка Джо`: shop/Joe card motif.
- Do not show coin transfer unless the card actually steals/transfers coins.
- If coins are awarded by the game/bank, show a neutral source, not another player.
- If a player receives coins, show the numeric amount with a coin icon, for example `+3` plus a small gold coin icon, not just a bare `+3`.
- If a player loses coins, show the loss as a red numeric amount with a coin icon near that losing player, for example red `-3` plus a small gold coin icon.
- Avoid loose/flying coin trails unless they are specifically needed for clarity. Prefer clear `+N` / `-N` markers with coin icons over extra coins moving through the scene.
- Do not use green or red board tiles unless the card text/effect is specifically about green or red fields. For other movement/position examples, use neutral tan/gold route tiles.
- If route tiles/cells are shown, keep visible cells equal-size and in the same perspective; do not enlarge an occupied cell unless the card is explicitly about a special field.
- Show the essence of the effect, not every rule detail.

## Prompt Template

Use this shape for image generation:

```text
Use case: stylized-concept
Asset type: top illustration for a fantasy board-game card infographic
Primary request: Create new art for the TADAM card effect "<title>": <plain effect>.
Critical color requirement: the parchment/gold background backing must match the accepted TADAM art backing color, approximately #D8910F / RGB 216,145,15 at the outer background areas. Keep effect colors localized; do not darken or tint the whole panel.
Critical character rule: the board-game pawn must have no shield unless the effect specifically requires one. No shield in hand, on belly, on chest, or as a clothing emblem.
Style reference: match the accepted rich warm fantasy board-game TADAM card arts: golden parchment background, cute board-game pawn/class miniature, thick clean outlines, soft magic glow, polished tabletop figurines, gold accents, readable at small card size.
Subject: <specific visual metaphor for the card effect>.
Composition: wide horizontal card-art composition, centered, generous side padding, all important elements inside the middle 80%, designed to be placed in the upper 35-40% of a vertical playing card. Keep lower edge visually clean so card title can sit below it.
Avoid: no Russian or English words, no card title, no full rules text, no unrelated numbers, no unrelated coins/cards, no modern UI panels, no hard rectangular backing blocks, no photorealism, no animals, no watermark.
```

## Compositing

- Use the accepted top-art slot: `x=82 y=84 w=580 h=336`.
- Use a soft rounded/feathered mask so generated art blends into the card face.
- Preserve the card's outer frame and the lower parchment area.
- If the generated backing is too dark or saturated, regenerate or normalize before committing.
- Do not solve a bad global backing by darkening the whole card.

## Verification

Required checks:

- `node --check src/cards.config.js`
- `node --check src/game.js`
- `git diff --check`
- PNG static check: changed TADAM asset is `744x1039 RGBA`.
- Visual check:
  - title and description remain readable;
  - art does not overlap title, description, or frame;
  - effect is not misleading;
  - backing size matches accepted cards;
  - outer/background color is close to `#D8910F`;
  - no unwanted shield or prop appears on the pawn.

## Handback

After a completed card:

- Update `project-memory/updates.md`.
- Mark the task done in `project-memory/inbox/for-ui.md`.
- Add a context note to `project-memory/inbox/for-gd.md` when GD assigned the card.
- Send a direct handback to the active GD thread if GD needs to react or send the next card.
- Mention:
  - exact card id/title;
  - changed files;
  - whether rules/text/counts/CSV/Google Sheet were untouched;
  - checks passed;
  - whether QA was involved.
