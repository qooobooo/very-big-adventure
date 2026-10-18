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

// The tab «Баланс» (PM task, 16 Oct 2026): balance-google-sheet.csv mirrors src/game.config.js balanceConfig with the
// эталоны of src/game.js, and a number sent from the sheet changes only its line in the config.
test('balance-google-sheet.csv is exactly what src/game.config.js and src/game.js make', async () => {
  const { balanceCsvFromConfig } = await tool();
  assert.equal(await balanceCsvFromConfig(), read('balance-google-sheet.csv'));
});

test('every balance cell passes the sheet checks; the checks stop what the game would not take', async () => {
  const { sheetScript } = await tool();
  const gs = sheetScript();
  const table = gs.parseCsv_(read('balance-google-sheet.csv'));
  assert.deepEqual([...gs.BALANCE_ORDER].sort(), [...gs.BALANCE_COLUMNS].sort());
  for (const row of table.rows) {
    assert.equal(row.value, row.default, `${row.key}: the config value is its эталон`);
    for (const field of gs.BALANCE_ORDER) {
      assert.equal(gs.balanceCsvValue_(gs.balanceSheetValue_(field, row[field])), row[field], `${row.key} ${field}`);
      assert.equal(gs.balanceProblem_(field, row[field], row), '', `${row.key} ${field}`);
    }
  }
  const row = table.rows.find((r) => r.key === 'rest.coins');
  assert.notEqual(gs.balanceProblem_('value', '12.5', row), '');
  assert.notEqual(gs.balanceProblem_('value', '', row), '');
  assert.notEqual(gs.balanceProblem_('value', '101', row), '');
  assert.notEqual(gs.balanceProblem_('value', '-1', row), '');
  assert.equal(gs.balanceProblem_('value', '15', row), '');
  assert.notEqual(gs.balanceProblem_('default', '12', row), '');
  assert.notEqual(gs.balanceProblem_('name', 'Монеты', row), '');
  assert.equal(gs.balanceProblem_('notes', 'что угодно', row), '');
});

test('a balance number sent from the sheet changes only its line, and the config and the CSV still agree', async () => {
  const { sheetScript, balanceCsvFromConfig, loadConfig } = await tool();
  const gs = sheetScript();
  const config = read('src/game.config.js');
  const csv = read('balance-google-sheet.csv');
  const changes = [
    { key: 'rest.coins', field: 'value', to: '12' },
    { key: 'dragon.prefill.p4', field: 'value', to: '4' },
    { key: 'rest.coins', field: 'notes', to: 'проба, с запятой' },
  ];
  const patchedConfig = gs.patchGameConfig_(config, changes);
  const before = config.split('\n');
  const after = patchedConfig.split('\n');
  assert.equal(after.length, before.length);
  const moved = after.filter((line, i) => line !== before[i]);
  assert.equal(moved.length, 2);
  assert.ok(moved[0].startsWith('  { key: "rest.coins", value: 12, name: '), moved[0]);
  assert.ok(moved[1].startsWith('  { key: "dragon.prefill.p4", value: 4, name: '), moved[1]);
  assert.throws(() => gs.patchGameConfig_(config, [{ key: 'rest.coins', field: 'default', to: '3' }]));
  assert.throws(() => gs.patchGameConfig_(config, [{ key: 'no.such', field: 'value', to: '3' }]));
  const patchedCsv = gs.patchBalanceCsv_(csv, changes);
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'vba-balance-'));
  try {
    const file = path.join(folder, 'game.config.js');
    fs.writeFileSync(file, patchedConfig);
    const { balanceConfig, boardDoorConfigs } = await loadConfig(file);
    assert.equal(balanceConfig.find((p) => p.key === 'rest.coins').value, 12);
    assert.equal(balanceConfig.find((p) => p.key === 'dragon.prefill.p4').value, 4);
    assert.equal(boardDoorConfigs.field2.length, 4);
    assert.equal(await balanceCsvFromConfig(file, patchedCsv), patchedCsv);
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});

// A tiny stand-in for one Google spreadsheet: enough of SpreadsheetApp for the «Баланс» tab's own functions.
function fakeBook() {
  const sheets = [];
  const properties = {};
  const sheet = (name) => {
    const s = { name, cells: [[]], maxRows: 1000, maxColumns: 26, hidden: false };
    const range = (row, column, rows = 1, columns = 1) => {
      const grid = (read) => Array.from({ length: rows }, (_, r) => Array.from({ length: columns }, (_, c) => read(row - 1 + r, column - 1 + c)));
      const value = (r, c) => (s.cells[r] && s.cells[r][c] !== undefined ? s.cells[r][c] : '');
      const self = new Proxy({}, { get: (_, key) => ({
        getValues: () => grid(value),
        getDisplayValues: () => grid((r, c) => String(value(r, c))),
        getValue: () => value(row - 1, column - 1),
        getBackgrounds: () => grid(() => null),
        setValues: (values) => { values.forEach((line, r) => line.forEach((v, c) => { (s.cells[row - 1 + r] ||= [])[column - 1 + c] = v; })); return self; },
      })[key] || (() => self) });
      return self;
    };
    Object.assign(s, {
      getName: () => s.name, setName: (n) => { s.name = n; return s; }, setTabColor: () => s,
      getLastRow: () => s.cells.filter((line) => line && line.some((v) => v !== '' && v !== undefined)).length,
      getLastColumn: () => Math.max(0, ...s.cells.map((line) => (line || []).length)),
      getMaxRows: () => s.maxRows, getMaxColumns: () => s.maxColumns,
      insertRowsAfter: (_, n) => { s.maxRows += n; }, insertColumnsAfter: (_, n) => { s.maxColumns += n; },
      clear: () => { s.cells = [[]]; }, getRange: range, hideSheet: () => { s.hidden = true; },
    });
    for (const noop of ['clearNotes', 'showRows', 'showColumns', 'hideColumns', 'hideRows', 'setFrozenRows', 'setFrozenColumns', 'setColumnWidth']) s[noop] = () => s;
    return s;
  };
  const book = {
    sheets,
    getSheetByName: (name) => sheets.find((s) => s.name === name) || null,
    insertSheet: (name, at = sheets.length) => { const s = sheet(name); sheets.splice(at, 0, s); return s; },
    toast: () => {},
  };
  const services = {
    PropertiesService: { getDocumentProperties: () => ({ setProperties: (p) => Object.assign(properties, p), getProperty: (k) => properties[k] ?? null }) },
  };
  return { book, services, properties };
}

test('the «Баланс» tab: laid out, read back without changes, an edit is one honey change', async () => {
  const { sheetScript } = await tool();
  const gs = sheetScript();
  const { book, services, properties } = fakeBook();
  Object.assign(gs, services);
  const table = gs.parseCsv_(read('balance-google-sheet.csv'));
  gs.layoutBalance_(book, table);
  gs.saveBalanceBase_(book, { table, mark: 'm1' });
  assert.equal(book.sheets[0].name, 'Баланс');
  assert.equal(properties.BALANCE_LAID_OUT_MARK, 'm1');
  const base = gs.readBalanceBase_(book);
  let shown = gs.readBalanceSheet_(book);
  assert.equal(Object.keys(shown.cells).length, table.rows.length * gs.BALANCE_ORDER.length);
  assert.deepEqual(Array.from(gs.diffBalance_(shown, base)), []);
  assert.deepEqual(Array.from(gs.balanceProblems_(shown, base)), []);
  const cell = shown.cells['rest.coins/value'];
  assert.equal(book.sheets[0].cells[cell.row - 1][cell.column - 1], 10, 'a number cell holds a number');
  book.sheets[0].cells[cell.row - 1][cell.column - 1] = 15;
  shown = gs.readBalanceSheet_(book);
  const changes = gs.diffBalance_(shown, base);
  assert.deepEqual(JSON.parse(JSON.stringify(changes.map((c) => [c.kind, c.key, c.field, c.from, c.to]))), [['balance', 'rest.coins', 'value', '10', '15']]);
  // The deck tabs never take «Баланс» for a deck.
  assert.equal(gs.ours_(book.sheets[0]), false);
  assert.equal(gs.oursBalance_(book.sheets[0]), true);
});

test('the first auto update with this script makes «Баланс» by itself; the next one with nothing new does nothing', async () => {
  const { sheetScript } = await tool();
  const gs = sheetScript();
  const { book, services, properties } = fakeBook();
  const csv = read('balance-google-sheet.csv');
  const fetched = [];
  Object.assign(gs, services, {
    PropertiesService: { ...services.PropertiesService, getUserProperties: () => ({ getProperty: () => null }) },
    UrlFetchApp: { fetch: (url) => { fetched.push(url); return { getResponseCode: () => 200, getContentText: () => csv }; } },
    Utilities: { DigestAlgorithm: {}, Charset: {}, computeDigest: (_, text) => [text.length & 255, 7] },
  });
  gs.autoUpdateBalance_(book);
  assert.match(fetched[0], /\/dev\/balance-google-sheet\.csv$/);
  assert.equal(book.sheets[0].name, 'Баланс');
  assert.equal(properties.BALANCE_LAID_OUT_WITH, 'repo');
  const laidOut = JSON.stringify(book.sheets[0].cells);
  book.sheets[0].cells[2][2] = 99; // an unsent edit survives a run with nothing new
  gs.autoUpdateBalance_(book);
  assert.equal(book.sheets[0].cells[2][2], 99);
  assert.notEqual(JSON.stringify(book.sheets[0].cells), laidOut);
});
