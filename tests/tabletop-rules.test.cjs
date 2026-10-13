// Narrow checks of the rules picked in the tabletop review (12 Oct 2026), run on the production functions without the DOM app.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../src/game.js'), 'utf8');

function extract(name) {
  const start = source.search(new RegExp(`^(?:async )?function ${name}\\(`, 'm'));
  assert.ok(start >= 0, name);
  const rest = source.slice(start);
  return rest.slice(0, rest.search(/^}$/m) + 1);
}

function load(functions, context) {
  vm.createContext(context);
  vm.runInContext(functions.map(extract).join('\n'), context);
  return context;
}

// One CSV line into cells: commas inside double quotes stay in the cell, "" is a quote.
function csvCells(line) {
  const cells = [''];
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"' && quoted && line[i + 1] === '"') { cells[cells.length - 1] += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) cells.push('');
    else cells[cells.length - 1] += char;
  }
  return cells;
}

function shopPromptFixture(botPick, { fast = true } = {}) {
  const delays = [];
  const button = { dataset: { shopCardId: botPick }, addEventListener() {} };
  const toast = {
    hidden: true, innerHTML: '', offsetWidth: 0,
    classList: { add() {}, remove() {} },
    querySelectorAll: () => [button], querySelector: () => null,
  };
  return load(['chooseShopCardFromFace', 'chooseRevealedShopCard', 'finishBotShopCardChoice', 'shopCardButton', 'isBot'], {
    ui: { eventToast: toast }, delays,
    window: { setTimeout: (fn, ms) => { delays.push(ms); return setTimeout(fn, 0); }, clearTimeout },
    eventToastFadeTimer: null, eventToastHideTimer: null, transientUiResetToken: 0,
    actionPromptResolver: null, actionPromptChoiceResolver: null, actionPromptRollContext: null,
    actionPromptButtonLabel: '', actionPromptAutoPlayerId: null, actionPromptChoiceOptions: [],
    botShopOfferChoices: new WeakMap(), joeCouponShopChoiceId: 'coupon',
    cardFaceStageMarkup: String, shopCardsMarkup: () => '', cardDisplayText: (card) => card.title,
    canUseJoeCouponInShop: () => false, joeCouponShopActionOptions: () => [],
    onTransientReset: () => () => {}, markSelectedShopCard() {}, hideEventToast() {}, render() {},
    scheduleBotAction() {}, botChoiceDelay: () => 0, fastModeActive: () => fast,
    chooseBotShopCard: () => botPick,
  });
}

test('a bot auto-resolving the shop prompt buys its own pick instead of declining', async () => {
  const offer = [{ id: 'battle-plus', title: 'Тренировочный меч' }, { id: 'step-plus', title: 'Быстрые сапоги' }];
  for (const name of ['chooseShopCardFromFace', 'chooseRevealedShopCard']) {
    const bot = shopPromptFixture('step-plus');
    const picked = bot[name](offer, { id: 1, bot: true }, { cost: 5 });
    bot.actionPromptResolver();
    assert.equal((await picked)?.id, 'step-plus', name);
    // Fast autoplay counts every waiting frame as an action, so the pick's highlight must not wait there.
    assert.equal(bot.delays.at(-1), 0, name);

    const slow = shopPromptFixture('step-plus', { fast: false });
    const shown = slow[name](offer, { id: 1, bot: true }, { cost: 5 });
    slow.actionPromptResolver();
    assert.equal((await shown)?.id, 'step-plus', name);
    assert.equal(slow.delays.at(-1), 260, name);

    const human = shopPromptFixture('step-plus');
    const declined = human[name](offer, { id: 0, bot: false }, { cost: 5 });
    human.actionPromptResolver();
    assert.equal(await declined, null, name);
  }
});

test('every Лавка Джо card has one known trigger moment, in the config and in the sheet CSV', async () => {
  const { cardConfig, shopCardMoments } = await import('../src/cards.config.js');
  assert.deepEqual(Object.keys(shopCardMoments), ['turn-start', 'move', 'battle', 'shop', 'reaction']);
  const [header, ...rows] = fs.readFileSync(path.join(__dirname, '../cards-google-sheet.csv'), 'utf8').trim().split('\n')
    .map(csvCells);
  const moment = header.indexOf('moment');
  assert.ok(moment > 0);
  // A description with unquoted commas spills into later columns, moment among them.
  for (const cells of rows) assert.equal(cells.length, header.length, cells[1]);
  for (const cells of rows) if (cells[0] !== 'shop') assert.equal(cells[moment], '', cells[1]);
  const sheet = new Map(rows.filter((cells) => cells[0] === 'shop').map((cells) => [cells[1], cells[moment]]));
  // Чужая расплата left the shop on the user's word (12 Oct 2026), to come back as an artifact.
  assert.equal(cardConfig.shop.length, 19);
  assert.ok(!cardConfig.shop.some((card) => card.id === 'others-loss-income'));
  for (const card of cardConfig.shop) {
    assert.ok(shopCardMoments[card.moment], card.id);
    assert.equal(sheet.get(card.id), card.moment, card.id);
  }
  const c = load(['shopCardMoment', 'shopCardMomentLabel'], { cardConfig, shopCardMoments });
  assert.equal(c.shopCardMomentLabel({ id: 'tadam-income' }), 'Реакция');
  assert.equal(c.shopCardMoment(null), null);
});

test('paying for your own card is a purchase: Чужая расплата answers other coin losses only', async () => {
  const losses = [];
  const c = load(['applyCoinDelta', 'addCoins', 'resolveTurnShopBuy', 'resolveShopMonsterStrengthBoosts'], {
    state: { turns: 1 }, playerCoinBonus: () => 0, consumePendingBadCard: () => null, recordCoinDelta() {}, showCoinFloat() {},
    notifyOtherPlayerCoinLoss: (player) => losses.push(player.id),
    activeShopEffectItems: (player, type) => player.items.filter((item) => item.effect.type === type),
    isBot: (player) => player.bot, chooseBotTurnShopBuy: () => true, chooseBotMonsterStrengthBoost: () => true,
    log() {}, render() {}, playerName: (player) => player.name, coinAmount: String,
  });
  const bot = { id: 1, name: 'Бот', bot: true, coins: 40, items: [
    { title: 'Платная тренировка', effect: { type: 'turn-strength-buy', amount: 1, cost: 10 } },
    { title: 'Платный марш', effect: { type: 'turn-steps-buy', steps: 2, cost: 10 } },
    { title: 'Боевой эликсир', effect: { type: 'monster-strength-plus3', amount: 3, cost: 5 } },
  ] };
  const gained = [];
  for (const type of ['turn-strength-buy', 'turn-steps-buy']) {
    await c.resolveTurnShopBuy(bot, type, { add: (player, amount) => gained.push(amount), label: '', usedKey: '_usedAt' });
  }
  assert.equal(await c.resolveShopMonsterStrengthBoosts(bot, 'битве'), 3);
  assert.deepEqual(gained, [1, 2]);
  assert.equal(bot.coins, 15);
  assert.deepEqual(losses, []);
  c.addCoins(bot, -4);
  assert.deepEqual(losses, [1]);
});

test('the final count is short: coins plus 5 per shop card, damage to the boss breaks a tie', () => {
  const players = [{ id: 0, coins: 20, items: [1, 2] }, { id: 1, coins: 25, items: [1] }, { id: 2, coins: 12, items: [1, 2, 3] }];
  const c = load(['finalBattleScore', 'bestFinalScorePlayer', 'finalScoreFormulaText'], {
    state: { players }, activeShopItems: (player) => player.items,
  });
  const scores = players.map((player, index) => c.finalBattleScore(player, [9, 14, 30][index]));
  assert.deepEqual(scores.map((score) => score.total), [30, 30, 27]);
  assert.equal(c.bestFinalScorePlayer(scores, players.slice(0, 2)).id, 1);
  assert.equal(c.finalScoreFormulaText(scores[0]), '30 = 20 монеты + 10 Лавка Джо');
  const saved = { total: 57, coins: 20, shop: 10, damage: 18, steps: 6, position: 3 };
  assert.equal(c.finalScoreFormulaText(saved), '57 = 20 монеты + 10 Лавка Джо + 18 урон боссу + 6 за шаги + 3 позиция');
});

test('tools/autoplay.mjs still fits game.js: every statistics hook finds its place, Google saving is cut off', async () => {
  const { instrument } = await import('../tools/autoplay.mjs');
  const served = instrument(source);
  for (const hook of ['__vbaTurns', '__vbaBattles', '__vbaCoinOpsTurn']) assert.ok(served.includes(hook), hook);
  assert.ok(!served.includes('script.google.com'));
  assert.doesNotThrow(() => new vm.Script(served.replace(/^(import|export) .*$/gm, '')));
});

function marketFixture({ ids = ['a', 'b', 'c', 'd', 'e', 'f'], coins = 20, privilege = false, coupon = false, picks = [] } = {}) {
  const shown = [];
  const draw = ids.map((id, index) => ({ id, title: id.toUpperCase(), _copyId: `shop:${id}:${index}`, _deckId: 'shop' })).reverse();
  const player = { id: 0, name: 'Аня', coins, items: [] };
  const c = load([
    'resolveShopMarket', 'refillShopMarket', 'shopMarketEnabled', 'shopModeSetting', 'applyShopModeSetting',
    'syncShopModeControl', 'drawCardsFromDeck', 'drawCardFromDeck', 'returnCardsToDraw', 'gameDeck',
    'discardCardsToDeck', 'discardCardToDeck', 'canUseJoeCouponInShop', 'joeShopOfferCount', 'takeJoeCouponShopOffer',
  ], {
    state: { shopMode: 'market', shopMarket: [], decks: { shop: { draw, discard: [] } } },
    ui: { shopMode: { value: 'market', parentElement: {} } },
    shopMarketSize: 2, joeCouponShopChoiceId: 'coupon', botShopOfferChoices: new WeakMap(),
    shuffleCards: (cards) => [...cards], deckLabel: String, isReferenceRuntimeCard: () => false,
    joeShopCardCost: () => 5, hasActiveShopEffect: () => privilege, hasJoeCouponArtifact: () => coupon,
    weaponsSettingLocked: () => false,
    chooseRevealedShopCard: async (offer) => {
      shown.push(Array.from(offer, (card) => card.id));
      const pick = picks.shift();
      return pick === 'coupon' ? 'coupon' : offer.find((card) => card.id === pick) || null;
    },
    claimShopCardsOneByOne: async (owner, cards) => cards.forEach((card) => owner.items.push(card)),
    addCoins: (owner, amount) => { owner.coins += amount; }, ownedShopItem: (card) => card, recordShopCards() {},
    log() {}, render() {}, playerName: (owner) => owner.name, playerChoiceBadge: () => '',
    cardNameMarkup: String, cardNameStrong: String, coinAmount: String,
  });
  // Arrays made inside the vm have its own prototype, so copy them out before deepEqual.
  const ids_ = (cards) => Array.from(cards, (card) => card.id);
  const where = () => ({
    market: ids_(c.state.shopMarket), draw: ids_(c.state.decks.shop.draw).reverse(), discard: ids_(c.state.decks.shop.discard),
    items: ids_(player.items),
  });
  return { c, player, shown, where };
}

test('open market: 2 cards for the whole game, a bought one is replaced at once, the other stays', async () => {
  const { c, player, shown, where } = marketFixture({ picks: ['b', null, 'a'] });
  c.refillShopMarket();
  assert.deepEqual(where().market, ['a', 'b']);
  assert.equal(await c.resolveShopMarket(player), 0);
  assert.deepEqual(shown.at(-1), ['a', 'b']);
  assert.deepEqual(where(), { market: ['a', 'c'], draw: ['d', 'e', 'f'], discard: [], items: ['b'] });
  assert.equal(player.coins, 15);
  await c.resolveShopMarket(player);
  assert.deepEqual(where(), { market: ['a', 'c'], draw: ['d', 'e', 'f'], discard: [], items: ['b'] });
  await c.resolveShopMarket(player);
  assert.deepEqual(where(), { market: ['c', 'd'], draw: ['e', 'f'], discard: [], items: ['b', 'a'] });
});

test('open market with Привилегия Джо: the third card comes from the deck and is discarded unless bought', async () => {
  const { c, player, shown, where } = marketFixture({ privilege: true, picks: [null, 'd', 'a'] });
  c.refillShopMarket();
  await c.resolveShopMarket(player);
  assert.deepEqual(shown.at(-1), ['a', 'b', 'c']);
  assert.deepEqual(where(), { market: ['a', 'b'], draw: ['d', 'e', 'f'], discard: ['c'], items: [] });
  await c.resolveShopMarket(player);
  assert.deepEqual(where(), { market: ['a', 'b'], draw: ['e', 'f'], discard: ['c'], items: ['d'] });
  await c.resolveShopMarket(player);
  assert.deepEqual(shown.at(-1), ['a', 'b', 'e']);
  assert.deepEqual(where(), { market: ['b', 'f'], draw: [], discard: ['c', 'e'], items: ['d', 'a'] });
});

test('open market: no money means no draw; the market never shows one card twice; Купон Джо takes all and refills', async () => {
  const poor = marketFixture({ coins: 4, privilege: true });
  poor.c.refillShopMarket();
  assert.equal(await poor.c.resolveShopMarket(poor.player), 0);
  assert.deepEqual(poor.shown, []);
  assert.deepEqual(poor.where(), { market: ['a', 'b'], draw: ['c', 'd', 'e', 'f'], discard: [], items: [] });

  const twins = marketFixture({ ids: ['a', 'a', 'b', 'c'] });
  twins.c.refillShopMarket();
  assert.deepEqual(twins.where().market, ['a', 'b']);
  assert.deepEqual(twins.where().draw.sort(), ['a', 'c']);

  const rich = marketFixture({ coupon: true, privilege: true, picks: ['coupon'] });
  rich.c.refillShopMarket();
  await rich.c.resolveShopMarket(rich.player);
  assert.deepEqual(rich.where(), { market: ['d', 'e'], draw: ['f'], discard: [], items: ['a', 'b', 'c'] });
  assert.equal(rich.player.coins, 10);
});

test('Лавка setting: market by default, classic puts the market into the discard, back to market lays out 2 cards', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert.match(html, /<select id="shopMode">\s*<option value="market" selected>Рынок<\/option>\s*<option value="classic">Классика<\/option>/);
  assert.match(source, /shopMode: gameSettings\.shopMode,\s*shopMarket: \[\],/);
  const { c, where } = marketFixture();
  c.refillShopMarket();
  c.ui.shopMode.value = 'classic';
  c.applyShopModeSetting();
  assert.equal(c.shopMarketEnabled(), false);
  assert.deepEqual(where(), { market: [], draw: ['c', 'd', 'e', 'f'], discard: ['a', 'b'], items: [] });
  c.ui.shopMode.value = 'market';
  c.applyShopModeSetting();
  assert.deepEqual(where().market, ['c', 'd']);
  c.weaponsSettingLocked = () => true;
  c.ui.shopMode.value = 'classic';
  c.applyShopModeSetting();
  assert.equal(c.ui.shopMode.value, 'market');
  assert.equal(c.ui.shopMode.disabled, true);
  assert.equal(c.shopMarketEnabled(), true);
});

// Bug 13 Oct 2026 (the user, classic UI with bots): bots with 10–15 coins declined almost every Лавка. A human takes
// seat 1, so bots get the thrifty personalities, and the decline score counted economy twice. The Кот case from the trace.
function shopDeclineFixture({ gatePressure = 0.9, cardScores = { 'speed-cluster': 4, 'shop-choice-3-cost-3': 35 } } = {}) {
  return load(['scoreShopDecline', 'botPersonality'], {
    monsterGatePressure: () => ({ pressure: gatePressure }),
    joeShopCardCost: () => 5,
    finalDistance: () => 60,
    scoreShopCard: (player, card) => cardScores[card.id] ?? 0,
  });
}

test('a thrifty bot with 13 coins scores a good shop card above declining', () => {
  const game = shopDeclineFixture();
  const offer = [{ id: 'speed-cluster' }, { id: 'shop-choice-3-cost-3', effect: { type: 'shop-choice-3-cost-3' } }];
  const kot = { id: 1, coins: 13 };
  assert.ok(game.scoreShopDecline(kot, offer) < 35, `decline ${game.scoreShopDecline(kot, offer)}`);
  assert.ok(game.scoreShopDecline({ id: 2, coins: 15 }, offer) < 33);
});

test('a bot left nearly broke by the purchase still prefers to keep its coins', () => {
  const game = shopDeclineFixture();
  const offer = [{ id: 'shop-choice-3-cost-3' }];
  assert.ok(game.scoreShopDecline({ id: 1, coins: 7 }, offer) > 35);
  assert.ok(game.scoreShopDecline({ id: 0, coins: 4 }, offer) > 35);
});
