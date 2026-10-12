// The «Cards Config» sheet sync (PM task, 12 Oct 2026): the CSV is what src/cards.config.js makes, and an edit sent from
// the sheet changes the config and the CSV so that they still agree. Runs the sheet script's pure part in a vm.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const tool = () => import('../tools/cards-sheet/cards-csv.mjs');

test('cards-google-sheet.csv is exactly what src/cards.config.js makes (node tools/cards-sheet/cards-csv.mjs)', async () => {
  const { csvFromConfig } = await tool();
  assert.equal(await csvFromConfig(), read('cards-google-sheet.csv'));
});

test('the sheet script knows the game: moments, columns, every card line reads back', async () => {
  const { sheetScript, loadConfig } = await tool();
  const gs = sheetScript();
  const { cardConfig, shopCardMoments } = await loadConfig();
  assert.deepEqual({ ...gs.MOMENTS }, shopCardMoments);
  assert.deepEqual([...gs.SHEET_ORDER].sort(), [...gs.CSV_COLUMNS].filter((c) => c !== 'deck').sort());
  const lines = read('src/cards.config.js').split('\n');
  for (const [deck, cards] of Object.entries(cardConfig)) {
    for (const card of cards) {
      const block = gs.cardLines_(lines, deck, card.id);
      const effect = Object.fromEntries(gs.parseEffect_(lines[gs.fieldLine_(lines, block, 'effect')]));
      assert.deepEqual(effect, card.effect, card.id);
    }
  }
});

test('every card cell passes the sheet checks and survives the trip CSV → sheet → CSV', async () => {
  const { sheetScript } = await tool();
  const gs = sheetScript();
  const table = gs.parseCsv_(read('cards-google-sheet.csv'));
  const decks = gs.decksOf_(table);
  for (const row of table.rows) {
    for (const field of gs.SHEET_ORDER) {
      const cell = row[field];
      assert.equal(gs.csvValue_(field, gs.sheetValue_(field, cell)), cell, `${row.id} ${field}`);
      assert.equal(gs.problem_(field, cell, cell, decks), '', `${row.id} ${field}: ${cell}`);
    }
  }
});

test('the checks stop what the code would not read', async () => {
  const { sheetScript } = await tool();
  const gs = sheetScript();
  const decks = ['good', 'bad', 'tadam'];
  const bad = (field, value, base) => assert.notEqual(gs.problem_(field, value, base, decks), '', `${field} ${value}`);
  const fine = (field, value, base) => assert.equal(gs.problem_(field, value, base, decks), '', `${field} ${value}`);
  bad('id', 'coins11', 'coins10');
  bad('effect_type', 'move', 'coins');
  bad('title', '', 'Звонкая находка');
  bad('description', 'Получи 10 монет.', 'Получи 10 монет');
  fine('description', 'Брось кубик. Получи 5 монет', 'x');
  bad('count', '0', '2');
  bad('count', '1.5', '2');
  fine('amount', '-12', '10');
  bad('amount', '10.5', '10');
  bad('amount', '', '10');
  bad('cost', '5', '');
  bad('target_deck', 'shop', 'good');
  fine('target_deck', 'bad', 'good');
  bad('moment', 'Обед', 'battle');
  fine('moment', 'move', 'battle');
  bad('effect_extra', 'reward=12', 'penalty=5; reward=10');
  bad('effect_extra', 'reward:12', 'reward=10');
  fine('effect_extra', 'reward=12; penalty=6', 'penalty=5; reward=10');
  fine('shortTitle', '', '+1 к силе');
  assert.equal(gs.csvValue_('moment', 'Бой'), 'battle');
  assert.equal(gs.csvValue_('effect_extra', ' reward = 12 ;penalty=05 '), 'penalty=5; reward=12');
  assert.equal(gs.csvValue_('description', '  Строка\r\nвторая '), 'Строка\\nвторая');
});

test('an edit sent from the sheet changes only its lines, and the config and the CSV still agree', async () => {
  const { sheetScript, csvFromConfig, loadConfig } = await tool();
  const gs = sheetScript();
  const config = read('src/cards.config.js');
  const csv = read('cards-google-sheet.csv');
  const changes = [
    { deck: 'good', id: 'coins10', field: 'amount', to: '12' },
    { deck: 'good', id: 'coins10', field: 'title', to: 'Звонкая "находка"' },
    { deck: 'good', id: 'forward10', field: 'shortTitle', to: '+10 шагов' },
    { deck: 'good', id: 'good-race', field: 'description', to: 'Брось кубик:\\n8 и больше - +25 монет' },
    { deck: 'bad', id: 'back10', field: 'steps', to: '-12' },
    { deck: 'bad', id: 'back10', field: 'count', to: '3' },
    { deck: 'bad', id: 'back10', field: 'notes', to: 'заметка, с запятой' },
    { deck: 'tadam', id: 'green-good', field: 'target_deck', to: 'tadam' },
    { deck: 'event', id: 'unity', field: 'effect_extra', to: 'penalty=6; reward=12; strengthPerDie=4' },
    { deck: 'event', id: 'magic-wallet', field: 'artifact_desr', to: 'Получи 6 монет в начале хода' },
    { deck: 'shop', id: 'battle-plus', field: 'shortTitle', to: '' },
    { deck: 'shop', id: 'battle-plus', field: 'moment', to: 'turn-start' },
  ];
  const patchedConfig = gs.patchConfig_(config, changes);
  const patchedCsv = gs.patchCsv_(csv, changes);

  // Only the edited lines move: one line out (shortTitle cleared), one in (shortTitle added), 9 rewritten.
  const before = config.split('\n');
  const after = patchedConfig.split('\n');
  assert.equal(after.length, before.length);
  const extra = (a, b) => {
    const left = new Map();
    for (const line of b) left.set(line, (left.get(line) || 0) + 1);
    return a.filter((line) => { const n = left.get(line) || 0; left.set(line, n - 1); return n <= 0; });
  };
  assert.equal(extra(after, before).length, 10, extra(after, before).join('\n'));
  assert.equal(extra(before, after).length, 10);

  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'vba-cards-'));
  try {
    const file = path.join(folder, 'cards.config.js');
    fs.writeFileSync(file, patchedConfig);
    const { cardConfig } = await loadConfig(file);
    const card = (deck, id) => cardConfig[deck].find((c) => c.id === id);
    assert.equal(card('good', 'coins10').effect.amount, 12);
    assert.equal(card('good', 'coins10').title, 'Звонкая "находка"');
    assert.equal(card('good', 'forward10').shortTitle, '+10 шагов');
    assert.equal(card('good', 'good-race').description, 'Брось кубик:\n8 и больше - +25 монет');
    assert.deepEqual(card('bad', 'back10').effect, { type: 'move', steps: -12 });
    assert.equal(card('bad', 'back10').count, 3);
    assert.equal(card('tadam', 'green-good').effect.deck, 'tadam');
    assert.deepEqual(card('event', 'unity').effect, { type: 'event-unity', reward: 12, penalty: 6, strengthPerDie: 4 });
    assert.equal(card('event', 'magic-wallet').artifact_desr, 'Получи 6 монет в начале хода');
    assert.equal(card('shop', 'battle-plus').shortTitle, undefined);
    assert.equal(card('shop', 'battle-plus').moment, 'turn-start');
    // A new line goes where the config keeps that field.
    const block = gs.cardLines_(after, 'good', 'forward10');
    assert.deepEqual(after.slice(block.start + 1, block.end).map((line) => line.trim().split(':')[0]),
      ['id', 'count', 'title', 'shortTitle', 'description', 'effect']);
    assert.equal(await csvFromConfig(file, patchedCsv), patchedCsv);
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});
