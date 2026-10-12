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

function shopPromptFixture(botPick) {
  const toast = {
    hidden: true, innerHTML: '', offsetWidth: 0,
    classList: { add() {}, remove() {} },
    querySelectorAll: () => [], querySelector: () => null,
  };
  return load(['chooseShopCardFromFace', 'chooseRevealedShopCard', 'finishBotShopCardChoice', 'shopCardButton', 'isBot'], {
    ui: { eventToast: toast }, window: { setTimeout, clearTimeout },
    eventToastFadeTimer: null, eventToastHideTimer: null, transientUiResetToken: 0,
    actionPromptResolver: null, actionPromptChoiceResolver: null, actionPromptRollContext: null,
    actionPromptButtonLabel: '', actionPromptAutoPlayerId: null, actionPromptChoiceOptions: [],
    botShopOfferChoices: new WeakMap(), joeCouponShopChoiceId: 'coupon',
    cardFaceStageMarkup: String, shopCardsMarkup: () => '', cardDisplayText: (card) => card.title,
    canUseJoeCouponInShop: () => false, joeCouponShopActionOptions: () => [],
    onTransientReset: () => () => {}, markSelectedShopCard() {}, hideEventToast() {}, render() {},
    scheduleBotAction() {}, botChoiceDelay: () => 0,
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

    const human = shopPromptFixture('step-plus');
    const declined = human[name](offer, { id: 0, bot: false }, { cost: 5 });
    human.actionPromptResolver();
    assert.equal(await declined, null, name);
  }
});
