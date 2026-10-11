# Dev Task — 10 new Joe's Shop cards

Created: 2026-06-18 by GD.
Status: open.

Implement the following 10 new `shop` cards in the active game, including config, card-sheet mirror/canonical sheet sync, host UI, phone/controller choices where applicable, bot decisions, persistence, and rule text.

Do not alter the existing Shop cards or unrelated game rules.

## Cards

1. `red-cloak`
   - Title: `Красный плащ`
   - Short title: `Красное -3`
   - Count: `2`
   - Text: `Когда останавливаешься на красном поле, потеряй на 3 монеты меньше`
   - Rule: reduces only the coin-loss component caused by landing on a red field; minimum loss is 0. It does not reduce losses from Bad cards, Events, payments, transfers, or other sources. Multiple copies do not stack.

2. `bad-insurance`
   - Title: `Страховка от неприятностей`
   - Short title: `Выбор Плохо за 5`
   - Count: `2`
   - Text: `Когда берёшь карту Плохо, можешь заплатить 5 монет, взять ещё одну и выбрать, какую применить. Вторую сбрось`
   - Rule: ask before either of the two cards is applied. If declined or unaffordable, resolve the original card normally. The unchosen card is discarded without effect. Multiple copies do not create more than one additional choice for the same Bad draw.

3. `safety-rope`
   - Title: `Страховочный трос`
   - Short title: `Назад -5 за 3`
   - Count: `2`
   - Text: `Раз в ход, когда должен двигаться назад, можешь заплатить 3 монеты и уменьшить перемещение на 5 шагов, минимум до 0`
   - Rule: applies to forced backward step movement from cards, fields, and Events. It does not modify return-to-start, portal movement, position swaps, or other teleports. One use per player turn regardless of duplicate copies.

4. `field-repair-kit`
   - Title: `Набор полевого ремонта`
   - Short title: `Ремонт за 3`
   - Count: `2`
   - Text: `В начале хода можешь заплатить 3 монеты и перевернуть одну свою карту Лавка Джо лицом вверх`
   - Rule: only offer the action if the player has at least one face-down Shop card and can pay. One repair per turn regardless of duplicate copies.

5. `hunter-notes`
   - Title: `Записки охотника`
   - Short title: `Реванш +1`
   - Count: `2`
   - Text: `После поражения от монстра получи +1 к силе против этого монстра. Эффект складывается до +3 и исчезает после победы`
   - Rule: track the bonus separately for each player and monster/door id. Bonus applies only to fights against that same monster. Cap is +3 per monster regardless of duplicate copies. On victory against that monster, clear its accumulated bonus. The effect is active only while the player owns at least one face-up copy; if no active copy remains, clear stored hunter-note bonuses.

6. `underdog-medal`
   - Title: `Медаль аутсайдера`
   - Short title: `Бонус последнему`
   - Count: `2`
   - Text: `Если в начале хода ты последний по маршруту, выбери: получить 5 монет или +3 к шагам на этот ход`
   - Rule: ties for last place qualify. Resolve at the start of the owner's turn before normal pre-roll Shop actions. One choice per turn regardless of duplicate copies. Temporary step bonus lasts for the current normal movement roll only and must not affect battle/event rolls.

7. `pocket-compass`
   - Title: `Карманный компас`
   - Short title: `Стоп раньше за 3`
   - Count: `2`
   - Text: `После броска на движение, если ты должен остановиться на красном поле или Плохо, можешь заплатить 3 монеты и остановиться на 1 шаг раньше`
   - Rule: normal movement rolls only. Determine the actual reachable landing cell after route/locked-door constraints. If it is red or Bad and at least one step was possible, offer the choice before movement resolves. Pass-through effects on cells already crossed still resolve normally. One use per turn regardless of duplicate copies.

8. `green-boots`
   - Title: `Зелёные сапоги`
   - Short title: `Проход зелёного +2`
   - Count: `2`
   - Text: `Первый раз за ход, проходя через зелёное поле без остановки, получи 2 монеты`
   - Rule: triggers only when the owner passes through a green field and continues moving. Landing on green does not trigger this card; the normal green-field effect still applies. At most once per turn regardless of duplicate copies.

9. `joe-partner`
   - Title: `Партнёр Джо`
   - Short title: `Чужая покупка +2`
   - Count: `2`
   - Text: `Каждый раз, когда другой игрок покупает карту Лавка Джо, получи 2 монеты`
   - Rule: a paid transaction in which another player acquires one or more Shop cards triggers +2 once per transaction, not per card. Count regular Joe's Shop, Black Market, Joe Auction, and paid purchase/transfer from another player if those paths currently exist. Free Shop draws, steals, redistributions, and non-paid grants do not trigger it. Multiple face-up copies stack.

10. `adventure-ticket`
    - Title: `Билет искателя приключений`
    - Short title: `Событие +3/+7`
    - Count: `2`
    - Text: `После применения карты Событие получи 3 монеты. Если событие дало тебе штраф, получи 7 монет вместо 3`
    - Rule: triggers for the owner when that player is the active player who drew/started the Event. Resolve after the Event finishes. Award 7 if the owner suffered any immediate negative outcome from the Event, such as coin loss, backward movement, loss/disable of a card, negative status, or forced return/teleport that is classified as a penalty; otherwise award 3. Only one payout per Event regardless of duplicate copies. Add an explicit event-resolution outcome flag/helper rather than inferring from rendered text.

## Shared implementation requirements

- Add stable effect types/fields to `src/cards.config.js`; do not implement card behavior by matching Russian display text.
- Sync the canonical Google Sheet and `cards-google-sheet.csv` according to the current card workflow.
- Card count is `2` for every new card.
- Existing face-down Shop rules must disable these cards while face-down.
- Any optional choice must work for:
  - host/local human;
  - phone/controller human;
  - bots without hanging.
- Add lightweight bot valuation and decisions:
  - `red-cloak`: more valuable with red fields ahead / red-field TADAM pressure;
  - `bad-insurance`: use more often for dangerous Bad cards and when coins remain healthy;
  - `safety-rope`: prefer when backward movement is large or would cross major progress;
  - `field-repair-kit`: repair the highest-value face-down Shop card;
  - `hunter-notes`: value increases before undefeated/strong monsters;
  - `underdog-medal`: choose steps when substantially behind, coins when poor;
  - `pocket-compass`: use to avoid costly red/Bad landing when 3 coins is worthwhile;
  - `green-boots`: passive;
  - `joe-partner`: passive;
  - `adventure-ticket`: passive.
- Preserve existing smart-random bot personality behavior.
- Add concise log/toast text for triggers and payments.
- Keep card effects readable on desktop and mobile; avoid nested prompts that overlap battle/card overlays.

## Verification

- `node --check src/game.js`.
- `node --check src/cards.config.js`.
- `node --check src/controller.js` if touched.
- `git diff --check`.
- Verify each card once with a human and once with a bot where a choice is involved.
- Verify duplicate-copy non-stacking/stacking rules exactly as specified.
- Verify face-down Shop cards do not apply or offer actions.
- Verify no unresolved pending prompt can stall an all-bot game.
- Update `project-memory/updates.md` and hand back implementation notes to GD when complete.
