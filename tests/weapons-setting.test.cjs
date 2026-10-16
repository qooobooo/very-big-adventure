// Narrow deterministic checks of the production functions, without booting the DOM app.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../src/game.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const functions = [
  'weaponsEnabledSetting', 'legendaryWeaponsEnabled', 'weaponsSettingLocked',
  'syncWeaponsSettingControl', 'applyWeaponsSetting', 'legendaryWeaponSnapshot',
  'legendaryWeaponHeldByMonster', 'legendaryWeaponHeldByPlayer', 'isDoomScytheWeapon',
  'isGoldenExecutionerWeapon', 'legendaryWeaponStatusText', 'legendaryOpponentCoinStrength',
  'legendaryOpponentCoinStrengthText', 'legendaryWeaponForceBreakdownText',
  'monsterLegendaryStrengthBonus', 'monsterBattleTargetStrength', 'convertSixesToOnes',
  'applyDoomScytheToOpponentRoll', 'ensureFinalMonsterLegendaryWeapon', 'transferLegendaryWeaponToPlayer',
  'discardCardToDeck', 'resolveFinalBattle', 'setFinalBattleRoller', 'buildFinalBattleSummary',
  'finalHistoryOpponentBonusText', 'collectGameSettings', 'snapshotAutoPlaytestControls',
  'restoreAutoPlaytestControls', 'phoneGameSnapshot', 'renderFinalBattleHud', 'shopModeSetting', 'shopMarketEnabled',
];
function extract(name) {
  const start = source.search(new RegExp(`^(?:async )?function ${name}\\(`, 'm'));
  assert.ok(start >= 0, name);
  const rest = source.slice(start);
  return rest.slice(0, rest.search(/^}$/m) + 1);
}
function fixture(enabled = false, count = 2) {
  const players = Array.from({ length: count }, (_, id) => ({ id, name: `P${id}`, coins: 25 + id * 10, color: 'red' }));
  const logs = [];
  const c = {
    state: { players, weaponsEnabled: enabled, legendaryWeapon: null, gameSettings: { weaponsEnabled: enabled }, decks: { legendary: { draw: [], discard: [] }, good: { draw: ['unchanged'], discard: [] } }, history: {}, round: 1 },
    ui: { weaponsEnabled: { checked: enabled, parentElement: {} }, playerCount: { value: String(count) }, finalBattleHud: {} },
    movementActionInProgress: false, actionPromptResolver: null, transientUiResetToken: 0,
    logs, log: text => logs.push(text), render: () => {}, balance: (_key, fallback) => fallback,
    cloneData: value => JSON.parse(JSON.stringify(value)),
    plainText: String, escapeHtml: String, cardDisplayText: card => card.title,
    phoneCardSnapshot: card => ({ id: card.id }), doomScytheIconSrc: 'scythe.png',
    playerName: p => p.name, formatRoll: rolls => rolls.join(','), finalBonusText: () => '',
    finalPositionBonuses: ps => new Map(ps.map(p => [p.id, 1])),
    finalBattleScore: (p, damage, position) => ({ playerId: p.id, total: damage + position, damage, damageToBoss: damage, position, coins: 0, shop: 0, steps: 0 }),
    bestFinalScorePlayer: (_scores, ps) => ps[0], finalScoreFormulaText: () => 'score',
    rollFinalBattlePower: async (p, _animate, { withoutBaseBonus = false } = {}) => {
      const baseBonus = withoutBaseBonus ? 0 : 3;
      return { player: p, rolls: [4], rawRolls: [4], weaponAdjustedRolls: [4], rolled: 4, baseBonus, bonus: baseBonus, total: 4 + baseBonus };
    },
    showActionPrompt: async () => {}, revealLegendaryWeaponCard: async () => true,
    drawCardFromDeck: () => { throw Error('unexpected weapon draw'); },
    effectiveMonsterStrength: () => 30,
    gameDeck: id => c.state.decks[id], isReferenceRuntimeCard: () => false,
    selectedBotCount: () => 0, dragonDisabledSetting: () => true, exactMoveControlAmount: () => 4,
    selectedFontStyle: () => 'standard', gameModeFrom: ({ playerCount }) => playerCount === 1 ? 'solo' : 'multiplayer',
    monsterStrengthMode: () => 'standard', selectedStartingCoins: () => 10, selectedUiStyle: () => 'classic', syncBotCountOptions: () => {},
    currentPlayer: () => c.state.players[0], phoneActionsForPlayer: () => [], activeBoardConfig: { id: 'field2' },
    phoneCardPreviewSnapshot: () => null, phoneDiceRollSnapshot: () => null, dragonSnapshot: () => null,
    monsterRageBonus: () => 0, phoneRoom: {}, phonePlayerSnapshot: p => ({ id: p.id }), actionPromptRollContextSnapshot: () => null,
    legendaryWeaponStatusMarkup: () => '', playerBattleStrengthBadge: () => '', playerBattleStrengthText: () => '',
  };
  vm.createContext(c);
  vm.runInContext(functions.map(extract).join('\n'), c);
  return c;
}
const scythe = { id: 'doom-scythe', title: 'Коса Рока', _copyId: 'legendary:doom-scythe:1', effect: { type: 'legendary-opponent-sixes-to-ones' } };
const gold = { id: 'golden-executioner', title: 'Золотой Палач', effect: { type: 'legendary-opponent-coins-strength', amount: 1, coinsPerStrength: 10 } };

test('fresh/missing/legacy settings default off; control snapshots and current settings preserve both values', () => {
  assert.match(html, /id="weaponsEnabled" type="checkbox"\s*\/>/);
  assert.match(source, /weaponsEnabled: gameSettings.weaponsEnabled/);
  const c = fixture();
  delete c.state.weaponsEnabled;
  assert.equal(c.legendaryWeaponsEnabled(), false);
  c.restoreAutoPlaytestControls({});
  assert.equal(c.ui.weaponsEnabled.checked, false);
  for (const enabled of [true, false]) {
    c.ui.weaponsEnabled.checked = enabled;
    assert.equal(c.collectGameSettings().weaponsEnabled, enabled);
    const snapshot = c.snapshotAutoPlaytestControls();
    c.ui.weaponsEnabled.checked = !enabled;
    c.restoreAutoPlaytestControls(snapshot);
    assert.equal(c.ui.weaponsEnabled.checked, enabled);
  }
  delete c.ui.weaponsEnabled;
  assert.equal(c.weaponsEnabledSetting(), false);
});

test('disabled blocks reveal/draw/ownership/snapshot and both effects even if stale weapon exists', async () => {
  const c = fixture();
  for (const card of [scythe, gold]) {
    c.state.legendaryWeapon = { card, owner: 'monster' };
    assert.equal(await c.ensureFinalMonsterLegendaryWeapon(c.state.players[0], { isFinalBoss: true }), true);
    assert.equal(c.legendaryWeaponHeldByMonster(), null);
    assert.equal(c.transferLegendaryWeaponToPlayer(c.state.players[0]), null);
    assert.equal(c.legendaryWeaponSnapshot(), null);
    assert.equal(c.legendaryOpponentCoinStrength(c.state.legendaryWeapon, c.state.players).total, 0);
    assert.equal(c.applyDoomScytheToOpponentRoll(c.state.players[0], [6, 3], 'test').adjustedRolls.join(','), '6,3');
    assert.equal(c.monsterBattleTargetStrength({ isFinalBoss: true }, c.state.players[0]), 30);
  }
});

test('enabled weapons reveal once, persist, transfer and retain Scythe / Golden Executioner effects', async () => {
  for (const card of [scythe, gold]) {
    const c = fixture(true);
    let draws = 0, reveals = 0;
    c.drawCardFromDeck = () => { draws++; return card; };
    c.revealLegendaryWeaponCard = async () => { reveals++; return true; };
    await c.ensureFinalMonsterLegendaryWeapon(c.state.players[0], { isFinalBoss: true });
    await c.ensureFinalMonsterLegendaryWeapon(c.state.players[0], { isFinalBoss: true });
    assert.equal(draws, 1); assert.equal(reveals, 1);
    assert.equal(c.legendaryWeaponHeldByMonster().card.id, card.id);
    assert.equal(c.monsterLegendaryStrengthBonus({ isFinalBoss: true }, c.state.players[0]).total, card === gold ? 2 : 0);
    assert.equal(c.monsterLegendaryStrengthBonus({ isFinalBoss: false }, c.state.players[0]).total, 0);
    assert.equal(c.applyDoomScytheToOpponentRoll(c.state.players[0], [6, 3], 'test').adjustedRolls.join(','), card === scythe ? '1,3' : '6,3');
    c.transferLegendaryWeaponToPlayer(c.state.players[0]);
    assert.equal(c.legendaryWeaponHeldByMonster(), null);
    assert.equal(c.legendaryWeaponHeldByPlayer(c.state.players[0]).card.id, card.id);
    assert.equal(c.legendaryWeaponHeldByPlayer(c.state.players[1]), null);
    assert.equal(c.phoneGameSnapshot().legendaryWeapon.id, card.id);
  }
});

test('live off clears ownership, conserves card/decks, preserves started settings, and blocks in-flight changes', () => {
  const c = fixture(true);
  c.state.legendaryWeapon = { card: scythe, owner: 'monster' };
  c.ui.weaponsEnabled.checked = false;
  for (const key of ['enemyBattleProgress', 'finalBattleProgress', 'pendingDiceControl', 'pendingShop']) {
    c.state[key] = {};
    c.ui.weaponsEnabled.checked = false;
    c.applyWeaponsSetting();
    assert.equal(c.state.weaponsEnabled, true);
    assert.equal(c.ui.weaponsEnabled.checked, true);
    assert.equal(c.ui.weaponsEnabled.disabled, true);
    c.state[key] = null;
  }
  c.movementActionInProgress = true;
  c.ui.weaponsEnabled.checked = false; c.applyWeaponsSetting();
  assert.equal(c.state.weaponsEnabled, true);
  c.movementActionInProgress = false;
  c.ui.weaponsEnabled.checked = false; c.applyWeaponsSetting();
  assert.equal(c.state.weaponsEnabled, false);
  assert.equal(c.state.legendaryWeapon, null);
  assert.equal(c.state.decks.legendary.discard.length, 1);
  assert.equal(c.state.decks.good.draw.join(','), 'unchanged');
  assert.equal(c.state.gameSettings.weaponsEnabled, true);
  assert.equal(c.collectGameSettings().weaponsEnabled, false);
  assert.equal(c.phoneGameSnapshot().legendaryWeapon, null);
  c.ui.weaponsEnabled.checked = true; c.applyWeaponsSetting();
  assert.equal(c.state.legendaryWeapon, null);
  assert.equal(c.state.decks.legendary.discard.length, 1);
});

// Tabletop review, 12 Oct 2026: the boss rolls once per challenger, adds its bonus (3 here) once and gets +10 for every
// challenger after the first, in both weapon modes.
for (const count of [1, 2, 3, 4]) {
  test(`final battle ${count} players: boss bonus once, +${10 * Math.max(0, count - 2)} for challengers after the first; history/phone agree`, async () => {
    for (const enabled of [false, true]) {
      const c = fixture(enabled, count);
      if (enabled) c.state.legendaryWeapon = { card: gold, owner: 'player', ownerId: 0 };
      const opponents = c.state.players.slice(1);
      const classic = 10 * Math.max(0, opponents.length - 1);
      const legendary = enabled ? opponents.reduce((sum, p) => sum + Math.floor(p.coins / 10), 0) : 0;
      const expected = opponents.length * 4 + (opponents.length ? 3 : 0) + classic + legendary;
      const observed = [];
      c.render = () => { if (c.state.finalBattleProgress) { c.renderFinalBattleHud(); observed.push({ progress: { ...c.state.finalBattleProgress }, html: c.ui.finalBattleHud.innerHTML }); } };
      await c.resolveFinalBattle(c.state.players[0], false);
      assert.equal(c.state.finalBattle.bossForce, expected);
      assert.equal(c.state.finalBattle.opponentBonus, classic);
      const summary = c.state.finalBattle.finalSummary;
      const bossForce = summary.players[0].force;
      assert.equal(bossForce.total, expected);
      assert.equal(bossForce.opponentBonus, classic);
      assert.equal(bossForce.opponentBonusPerExtra, 10);
      assert.equal(bossForce.bonus, opponents.length ? 3 : 0);
      assert.equal(summary.players[1]?.force.total ?? 7, 7);
      assert.equal(bossForce.legendaryBonus, legendary);
      assert.equal(c.state.history.finalSummary, summary);
      assert.equal(c.phoneGameSnapshot().finalBattle.bossForce, expected);
      assert.equal(c.phoneGameSnapshot().weaponsEnabled, enabled);
      assert.equal(observed.at(-1).progress.bossForce, expected);
      assert.equal(observed[0].progress.opponentBonus, classic);
      if (classic) {
        assert.match(observed.at(-1).html, new RegExp(`\\+${classic}: по 10 за противника после первого`));
        assert.match(c.finalHistoryOpponentBonusText(bossForce), /\+10 за каждого после первого/);
      }
      const frozenSummary = JSON.stringify(summary);
      c.ui.weaponsEnabled.checked = !enabled; c.applyWeaponsSetting();
      assert.equal(JSON.stringify(c.state.history.finalSummary), frozenSummary);
      assert.equal(JSON.stringify(c.phoneGameSnapshot().finalBattle), frozenSummary);
    }
  });
}

test('history of games played before the change keeps «+3 каждый»', () => {
  const c = fixture();
  assert.equal(c.finalHistoryOpponentBonusText({ opponentBonus: 9, opponentBonusPerPlayer: 3 }), 'противники 9 (+3 каждый)');
  assert.equal(c.finalHistoryOpponentBonusText({ opponentBonus: 20, opponentBonusPerExtra: 10 }), 'противники 20 (+10 за каждого после первого)');
});
