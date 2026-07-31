# Sleeping Dragon Visual Contract

Phase: `PHASE 1`, visual specification only. Gameplay and state wiring are not part of this document.

## Asset

- Source: `assets/icons/dragon_sleeping_1024.png`.
- Format: `1024x1024 RGBA`, transparent background and corners.
- Visible alpha bounds: `x=32..991`, `y=290..733`; the visible dragon is approximately `2.16:1` and intentionally wide/low.
- No baked title, rules, strength, progress, counter, route, shadow, or scenery.

## Field2 Placement

Use the empty cave terrain above the inner horizontal route. The approved visual preview uses this rectangle on the current `1440x1440` field image:

- visible dragon bounds: approximately `x=732 y=4 w=398 h=184`;
- normalized bounds: `left=50.8% top=0.3% width=27.7% height=12.8%`;
- keep the visible dragon above `y=190` so it never covers the inner route beginning near `y=194`;
- keep the right edge before `x=1140` so it does not touch the upper-right route.

Recommended rendering: use a dedicated non-interactive board overlay wrapper with the visible ratio `398 / 184`. Because the PNG is square with transparent vertical padding, render it as a centered CSS background at roughly `107% auto`, or crop to the recorded alpha bounds at runtime. Do not use `object-fit: contain` on the full square inside the wide wrapper; that would make the dragon unnecessarily small.

Layering:

- background terrain;
- sleeping Dragon and its counter;
- route tiles, pawns, dice, selection outlines, prompts, and battle HUD above it;
- `pointer-events: none` on the complete Dragon overlay.

## Counter

The counter has exactly `32` segments and does not change board geometry.

Desktop/fullscreen arrangement:

- two shallow arcs of `16` compact rounded segments each, one above and one below the Dragon;
- visually group the segments in fours with a slightly larger gap after segments `4`, `8`, `12`, `20`, `24`, and `28`;
- segment size in the placement wrapper: about `4%` width by `3.8%` height;
- the lower arc must end above the inner route; it may hug the Dragon tail but may not touch a tile;
- a compact progress/strength medallion sits immediately left of the Dragon in the narrow empty terrain gap, never over the neighboring green route column.

Compact/mobile arrangement at board viewport widths below `540px`:

- switch the 32 segments to a `4x8` ribbon immediately above the Dragon instead of scaling the two arcs to illegibility;
- keep a minimum physical segment thickness of `3px` and a `2px` gap;
- combine progress and strength in a single `72x28px` pill placed over empty terrain or the Dragon's upper flank, never over route tiles;
- the pill shows `current / 32`, then the shared strength icon and current Dragon strength;
- if necessary, reduce the Dragon to `24-25%` board width before moving either counter element toward a route.

## Segment States

- Empty: dark obsidian fill near `rgba(38,32,31,.8)` with a muted warm outline.
- Baseline prefill: neutral stone-gold near `#B1A069`; never use a player color for the player-count baseline.
- Added token: losing player's existing accent color through `--player-accent`, with the same warm outer rim as all other segments.
- Newly added token: `520ms` scale/glow pulse (`1 -> 1.35 -> 1`) without changing layout.
- Full `32/32`: two restrained red-gold wake pulses around the Dragon and a persistent brighter counter rim. Do not move or shake the board.
- Disabled: Dragon remains visible at about `55%` opacity and the counter dims to about `35%`; no pulse.
- Hidden: remove the Dragon, counter, badge, and hit area together.
- Under `prefers-reduced-motion: reduce`, replace pulses with a single static brightness change.

## Readability And Collision Rules

- Always show progress numerically as `current / 32`; color alone is not sufficient.
- Always show current Dragon strength with `assets/icons/strength_sword_512.png`; do not spell out `Сила` inside the counter.
- Counter labels remain horizontal and must not be baked into the Dragon PNG.
- At `390x844`, the numeric pill is the primary readable indicator; all 32 segments still remain present as compact progress marks.
- Dragon/counter may overlap cave decoration in the background, but never route tiles, pawns, dice layers, board prompts, combat overlays, or control strips.

## Preview References

Ignored working previews:

- `output/dragon_visual_phase1/dragon_field2_placement_preview.png`;
- `output/dragon_visual_phase1/dragon_field2_counter_preview.png`;
- `output/dragon_visual_phase1/dragon_counter_detail.png`;
- `output/dragon_visual_phase1/dragon_128px_readability.png`.
