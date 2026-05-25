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
