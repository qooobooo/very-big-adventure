/**
 * Very Big Adventure — the cards in the Google Sheet «Cards Config» (PM task, 12 Oct 2026: the sheet keeps up with the
 * game by itself, nobody types configs by hand). Ported from The Village's config sheet (tools/config-sheet there).
 *
 * The source is dev: src/cards.config.js is what the game reads, cards-google-sheet.csv is its mirror, written by
 * tools/cards-sheet/cards-csv.mjs with the functions below. The sheet shows the CSV, a tab per deck.
 * The tab «Баланс» does the same for the balance numbers of the board rules (PM task, 16 Oct 2026): src/game.config.js
 * balanceConfig is what the game reads, balance-google-sheet.csv its mirror with the эталоны from src/game.js.
 *
 * Menu «Very Big Adventure»:
 *   «Взять из игры»     — fills the deck tabs from the CSV in dev and remembers it as the base of your changes;
 *   «Проверить»         — marks wrong cells red and your changes honey, says what changed in the game meanwhile;
 *   «Отправить в игру»  — one commit to dev that changes the same cards in the CSV and in src/cards.config.js;
 *   «Подключить к игре» — once: your GitHub token, kept only in your Google account (user properties);
 *   «Включить автообновление» — once: every 5 minutes the tabs take new cards and this script's look from dev by
 *                          themselves (your unsent changes stay yours).
 *
 * The script reaches the sheet by itself: `tools/pipeline.py deliver` pushes this file with clasp whenever it changed in
 * dev, and SCRIPT_VERSION becomes the commit that last changed it. Setup: tools/cards-sheet/README.md.
 *
 * The part under «The CSV and the config» is pure: node runs it in a vm (cards-csv.mjs, tests/cards-sheet.test.cjs).
 */

var REPO = 'qooobooo/very-big-adventure';
// Our working branch: main is shared and gets dev only by publish.
var BRANCH = 'dev';
var CSV_PATH = 'cards-google-sheet.csv';
var CONFIG_PATH = 'src/cards.config.js';
var BALANCE_CSV_PATH = 'balance-google-sheet.csv';
var BALANCE_CONFIG_PATH = 'src/game.config.js';
var BALANCE_SHEET = 'Баланс';
var BALANCE_BASE_SHEET = '_base_balance';
var MENU = 'Very Big Adventure';
var BASE_SHEET = '_base';
// The commit that last changed this file, written in by `pipeline.py sheet-push`; a new one lays the tabs out again.
var SCRIPT_VERSION = 'repo';
var AUTO_MINUTES = 5;
// The Village sheet's colours: orange header, grey for what only the code changes, honey for your change, red for an error.
var COLORS = { header: '#F9CB9C', fixed: '#EFEFEF', changed: '#FFD966', bad: '#EA9999', backup: '#999999' };

// The CSV's columns in the file's order (AGENTS.md «Числа и карты»).
var CSV_COLUMNS = ['deck', 'id', 'title', 'shortTitle', 'effect_type', 'amount', 'steps', 'cost', 'dice', 'mode',
  'target_deck', 'notes', 'count', 'description', 'artifact_desr', 'moment', 'effect_extra'];
// Effect keys with a column of their own; every other key but type goes to effect_extra as «key=number; key=number».
var EFFECT_COLUMNS = { amount: 'amount', steps: 'steps', cost: 'cost', dice: 'dice', mode: 'mode', target_deck: 'deck' };
// A card's own lines in src/cards.config.js, in the file's order: a new line goes where this order puts it.
var CARD_FIELDS = ['id', 'count', 'title', 'shortTitle', 'description', 'artifact_desr', 'artifact', 'icon', 'frontArt',
  'moment', 'effect'];
// src/cards.config.js shopCardMoments (tests/cards-sheet.test.cjs keeps them equal).
var MOMENTS = { 'turn-start': 'Начало хода', move: 'Ход', battle: 'Бой', shop: 'Лавка', reaction: 'Реакция' };
// The tab's columns in reading order. kind: fixed — only the code changes it; text — card text, no period at the end;
// number — whole, from 1; effect — a whole number the card's code reads; deck — a deck id; extra — effect_extra;
// moment — a Лавка Джо trigger moment; note — anything.
var FIELDS = {
  id: { label: 'id', kind: 'fixed', width: 150, hint: 'Имя карты в коде. Новые карты и удаление — только в коде' },
  title: { label: 'Название', kind: 'text', required: true, width: 170 },
  shortTitle: { label: 'Коротко', kind: 'text', width: 120, hint: 'Короткая надпись на карте' },
  count: { label: 'Копий', kind: 'number', width: 64, hint: 'Сколько таких карт в колоде. Целое число от 1' },
  description: { label: 'Текст карты', kind: 'text', required: true, width: 340, hint: 'Без точки в конце' },
  artifact_desr: { label: 'Текст артефакта', kind: 'text', width: 280, hint: 'Без точки в конце' },
  moment: { label: 'Когда', kind: 'moment', width: 110, hint: 'Когда срабатывает карта Лавки: значок на карте и место на планшете игрока' },
  effect_type: { label: 'Эффект', kind: 'fixed', width: 200, hint: 'Что делает карта в коде. Меняется только в коде' },
  amount: { label: 'Число (amount)', kind: 'effect', width: 84 },
  steps: { label: 'Шаги (steps)', kind: 'effect', width: 84 },
  cost: { label: 'Цена (cost)', kind: 'effect', width: 84 },
  dice: { label: 'Кубики (dice)', kind: 'effect', width: 84 },
  mode: { label: 'Режим (mode)', kind: 'fixed', width: 90, hint: 'Меняется только в коде' },
  target_deck: { label: 'Колода (deck)', kind: 'deck', width: 96 },
  effect_extra: { label: 'Другие числа эффекта', kind: 'extra', width: 220, hint: 'ключ=число; ключ=число. Числа можно менять, ключи — только в коде' },
  notes: { label: 'Заметки', kind: 'note', width: 280, hint: 'Для себя: на карту не выводится' }
};
var SHEET_ORDER = ['id', 'title', 'shortTitle', 'count', 'description', 'artifact_desr', 'moment', 'effect_type', 'amount',
  'steps', 'cost', 'dice', 'mode', 'target_deck', 'effect_extra', 'notes'];
// Shown on every tab; the others only where a card of the deck has a value.
var ALWAYS = { id: true, title: true, count: true, description: true, effect_type: true, notes: true };
// The balance CSV's columns (AGENTS.md «Числа и карты») and the «Баланс» tab: only «Значение» and «Заметки» are yours.
var BALANCE_COLUMNS = ['key', 'name', 'value', 'default', 'unit', 'min', 'max', 'notes'];
var BALANCE_FIELDS = {
  key: { label: 'Ключ', kind: 'fixed', width: 220, hint: 'Имя числа в коде. Новые числа и удаление — только в коде' },
  name: { label: 'Что это', kind: 'fixed', width: 360, hint: 'Описание числа. Меняется в коде' },
  value: { label: 'Значение', kind: 'value', width: 90, hint: 'Это число читает игра. Целое, от «Мин» до «Макс»' },
  default: { label: 'Эталон', kind: 'fixed', width: 70, hint: 'Число в коде: на нём идут тесты и пробы. Меняется в коде' },
  unit: { label: 'Единица', kind: 'fixed', width: 80 },
  min: { label: 'Мин', kind: 'fixed', width: 56 },
  max: { label: 'Макс', kind: 'fixed', width: 56 },
  notes: { label: 'Заметки', kind: 'note', width: 280, hint: 'Для себя: в игру не идёт' }
};
var BALANCE_ORDER = ['name', 'value', 'default', 'unit', 'min', 'max', 'key', 'notes'];
var EFFECT_HINT = 'Целое число. Только у карт, где оно уже есть: новое число код не прочтёт';

function onOpen() {
  SpreadsheetApp.getUi().createMenu(MENU)
    .addItem('Взять из игры', 'takeFromGame')
    .addItem('Проверить', 'checkSheet')
    .addItem('Отправить в игру', 'sendToGame')
    .addSeparator()
    .addItem('Подключить к игре', 'connect')
    .addItem('Включить автообновление', 'enableAutoUpdate')
    .addItem('Выключить автообновление', 'disableAutoUpdate')
    .addToUi();
}

// ---------- The CSV and the config (pure) ----------

/** One CSV line into cells: commas inside double quotes stay in the cell, "" is a quote. Line breaks in a cell are
 *  written as \n, so a line is always one row. */
function csvCells_(line) {
  var cells = [''], quoted = false;
  for (var i = 0; i < line.length; i++) {
    var char = line[i];
    if (char === '"' && quoted && line[i + 1] === '"') { cells[cells.length - 1] += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) cells.push('');
    else cells[cells.length - 1] += char;
  }
  return cells;
}

/** { header, rows }: a row is column → cell text. */
function parseCsv_(text) {
  var lines = text.replace(/\r\n?/g, '\n').replace(/\n+$/, '').split('\n');
  var header = csvCells_(lines[0]);
  var rows = lines.slice(1).filter(function (line) { return line; }).map(function (line) {
    var cells = csvCells_(line), row = {};
    header.forEach(function (column, i) { row[column] = cells[i] === undefined ? '' : cells[i]; });
    return row;
  });
  return { header: header, rows: rows };
}

function csvCell_(value) {
  return /[",]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value;
}

function csvText_(table) {
  return [table.header].concat(table.rows.map(function (row) {
    return table.header.map(function (column) { return row[column] || ''; });
  })).map(function (cells) { return cells.map(csvCell_).join(','); }).join('\n') + '\n';
}

/** «key=number; key=number» → key → number text, sorted by key; null when it does not read. */
function parseExtra_(text) {
  var found = {};
  if (!text) return found;
  var parts = text.split(';').map(function (part) { return part.trim(); }).filter(function (part) { return part; });
  for (var i = 0; i < parts.length; i++) {
    var match = parts[i].match(/^([A-Za-z]\w*)\s*=\s*(-?\d+(?:\.\d+)?)$/);
    if (!match || match[1] in found) return null;
    found[match[1]] = String(Number(match[2]));
  }
  return found;
}

function extraText_(values) {
  return Object.keys(values).sort().map(function (key) { return key + '=' + values[key]; }).join('; ');
}

/** A card of src/cards.config.js as a CSV row. */
function cardRow_(deck, card, notes) {
  var effect = card.effect || {}, column = {}, extra = {};
  Object.keys(EFFECT_COLUMNS).forEach(function (name) { column[EFFECT_COLUMNS[name]] = name; });
  Object.keys(effect).forEach(function (key) { if (key !== 'type' && !(key in column)) extra[key] = String(effect[key]); });
  var row = { deck: deck, id: card.id, title: card.title, shortTitle: card.shortTitle, effect_type: effect.type,
    notes: notes, count: card.count, description: card.description, artifact_desr: card.artifact_desr,
    moment: card.moment, effect_extra: extraText_(extra) };
  Object.keys(EFFECT_COLUMNS).forEach(function (name) { row[name] = effect[EFFECT_COLUMNS[name]]; });
  CSV_COLUMNS.forEach(function (name) {
    row[name] = row[name] === undefined || row[name] === null ? '' : String(row[name]).replace(/\n/g, '\\n');
  });
  return row;
}

/** The whole CSV from cardConfig; notes live only in the CSV and the sheet, so they come from the CSV it replaces. */
function csvFromConfig_(cardConfig, oldText) {
  var notes = {};
  if (oldText) parseCsv_(oldText).rows.forEach(function (row) { notes[row.deck + '/' + row.id] = row.notes || ''; });
  var rows = [];
  Object.keys(cardConfig).forEach(function (deck) {
    cardConfig[deck].forEach(function (card) { rows.push(cardRow_(deck, card, notes[deck + '/' + card.id] || '')); });
  });
  return csvText_({ header: CSV_COLUMNS, rows: rows });
}

/** A sheet cell as the CSV writes it: numbers as digits, text trimmed with line breaks as \n, a moment by its key,
 *  effect_extra sorted. A value that does not read stays as typed, so the checks can name it. */
function csvValue_(field, value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return String(value);
  var text = String(value).replace(/\r\n?/g, '\n').trim(), kind = FIELDS[field].kind;
  if (kind === 'moment') for (var key in MOMENTS) if (MOMENTS[key] === text) return key;
  if (kind === 'extra') { var extra = parseExtra_(text.replace(/\n/g, ' ')); if (extra) return extraText_(extra); }
  return text.replace(/\n/g, '\\n');
}

/** A CSV cell as the sheet shows it. */
function sheetValue_(field, cell) {
  var kind = FIELDS[field].kind;
  if (!cell) return '';
  if (kind === 'number' || kind === 'effect') return isNaN(Number(cell)) ? cell : Number(cell);
  if (kind === 'moment') return MOMENTS[cell] || cell;
  return cell.replace(/\\n/g, '\n');
}

/** What is wrong with a cell (CSV text, against the game's value it was taken from); '' when nothing. */
function problem_(field, value, base, decks) {
  var kind = FIELDS[field].kind;
  if (kind === 'fixed') return value === base ? '' : 'меняется только в коде (в игре «' + base + '»)';
  if (kind === 'note') return '';
  if (kind === 'text') {
    if (!value) return FIELDS[field].required ? 'пусто' : '';
    return /\.$/.test(value) ? 'точка в конце' : '';
  }
  if (kind === 'number') return /^\d+$/.test(value) && Number(value) >= 1 ? '' : 'нужно целое число от 1';
  if (kind === 'moment') return MOMENTS[value] || (!value && !base) ? '' : 'выбери из списка: ' + momentLabels_().join(', ');
  // The effect's values: the code reads only those the card has.
  if (!value !== !base) return base ? 'нельзя стереть: игра ждёт это значение' : 'у этой карты в игре нет такого значения';
  if (!value) return '';
  if (kind === 'effect') return /^-?\d+$/.test(value) ? '' : 'нужно целое число';
  if (kind === 'deck') return decks.indexOf(value) >= 0 ? '' : 'нет такой колоды, есть: ' + decks.join(', ');
  var mine = parseExtra_(value), was = parseExtra_(base) || {};
  if (!mine) return 'формат: ключ=число; ключ=число';
  return Object.keys(mine).sort().join() === Object.keys(was).sort().join() ? '' : 'ключи меняются только в коде: ' + Object.keys(was).join(', ');
}

function momentLabels_() {
  return Object.keys(MOMENTS).map(function (key) { return MOMENTS[key]; });
}

/** The lines of a card in src/cards.config.js: { start: its «    {», end: its «    },» }. */
function cardLines_(lines, deck, id) {
  var open = lines.indexOf('  ' + deck + ': [');
  for (var i = open + 1; open >= 0 && i < lines.length && lines[i] !== '  ],'; i++) {
    if (lines[i] !== '      id: ' + JSON.stringify(id) + ',') continue;
    var start = i, end = i;
    while (lines[start] !== '    {') start--;
    while (lines[end] !== '    },') end++;
    return { start: start, end: end };
  }
  throw new Error('В ' + CONFIG_PATH + ' нет карты ' + deck + '/' + id);
}

function fieldLine_(lines, block, field) {
  for (var i = block.start + 1; i < block.end; i++) if (lines[i].indexOf('      ' + field + ': ') === 0) return i;
  return -1;
}

/** A string as the config writes it: double quotes, single ones when the text has double quotes inside. */
function jsString_(text) {
  return text.indexOf('"') >= 0 && !/['\\\n]/.test(text) ? "'" + text + "'" : JSON.stringify(text);
}

/** «      effect: { type: "x", amount: 10 },» → [[key, value]] in the line's order. */
function parseEffect_(line) {
  var body = line.match(/^      effect: \{ (.*) \},$/);
  if (!body) throw new Error('Не читается строка эффекта: ' + line);
  var pairs = [], pattern = /(\w+): ("(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?|true|false)(?:, |$)/g, match, read = 0;
  while ((match = pattern.exec(body[1])) && match.index === read) {
    pairs.push([match[1], JSON.parse(match[2])]);
    read = pattern.lastIndex;
  }
  if (read !== body[1].length) throw new Error('Не читается строка эффекта: ' + line);
  return pairs;
}

function effectLine_(pairs) {
  return '      effect: { ' + pairs.map(function (pair) {
    return pair[0] + ': ' + (typeof pair[1] === 'string' ? JSON.stringify(pair[1]) : String(pair[1]));
  }).join(', ') + ' },';
}

/** src/cards.config.js with the changes made on the cards' own lines only; c: { deck, id, field, to } in CSV text. */
function patchConfig_(text, changes) {
  var lines = text.split('\n');
  changes.forEach(function (c) {
    if (FIELDS[c.field].kind === 'note') return;
    if (FIELDS[c.field].kind === 'fixed') throw new Error(c.field + ' меняется только в коде');
    var block = cardLines_(lines, c.deck, c.id);
    if (c.field in EFFECT_COLUMNS || c.field === 'effect_extra') { patchEffect_(lines, block, c); return; }
    var at = fieldLine_(lines, block, c.field);
    if (!c.to) { if (at >= 0) lines.splice(at, 1); return; }
    var line = '      ' + c.field + ': ' + (c.field === 'count' ? String(Number(c.to)) : jsString_(c.to.replace(/\\n/g, '\n'))) + ',';
    if (at >= 0) { lines[at] = line; return; }
    var order = CARD_FIELDS.indexOf(c.field), before = block.end;
    for (var i = block.end - 1; i > block.start; i--) {
      var key = lines[i].trim().split(':')[0];
      if (CARD_FIELDS.indexOf(key) > order) before = i;
    }
    lines.splice(before, 0, line);
  });
  return lines.join('\n');
}

function patchEffect_(lines, block, c) {
  var at = fieldLine_(lines, block, 'effect');
  if (at < 0) throw new Error('У карты ' + c.id + ' нет строки effect');
  var pairs = parseEffect_(lines[at]), values = {};
  if (c.field === 'effect_extra') {
    var column = {};
    Object.keys(EFFECT_COLUMNS).forEach(function (name) { column[EFFECT_COLUMNS[name]] = true; });
    var extra = parseExtra_(c.to);
    if (!extra) throw new Error('effect_extra не читается: ' + c.to);
    pairs = pairs.filter(function (pair) { return pair[0] === 'type' || column[pair[0]] || pair[0] in extra; });
    Object.keys(extra).forEach(function (key) { values[key] = extra[key]; });
  } else {
    values[EFFECT_COLUMNS[c.field]] = c.to;
  }
  Object.keys(values).forEach(function (key) {
    var text = values[key], textual = c.field === 'target_deck' || c.field === 'mode';
    var pair = pairs.filter(function (p) { return p[0] === key; })[0];
    if (!text) { pairs = pairs.filter(function (p) { return p[0] !== key; }); return; }
    var value = textual || (pair && typeof pair[1] === 'string') ? text : Number(text);
    if (pair) pair[1] = value; else pairs.push([key, value]);
  });
  lines[at] = effectLine_(pairs);
}

/** The CSV with the changed cells only. */
function patchCsv_(text, changes) {
  var table = parseCsv_(text);
  changes.forEach(function (c) {
    if (table.header.indexOf(c.field) < 0) throw new Error('В ' + CSV_PATH + ' нет колонки ' + c.field);
    var row = table.rows.filter(function (r) { return r.deck === c.deck && r.id === c.id; })[0];
    if (!row) throw new Error('В ' + CSV_PATH + ' нет карты ' + c.deck + '/' + c.id);
    row[c.field] = c.to;
  });
  return csvText_(table);
}

function decksOf_(table) {
  var decks = [];
  table.rows.forEach(function (row) { if (decks.indexOf(row.deck) < 0) decks.push(row.deck); });
  return decks;
}

// ---------- The balance CSV and the config (pure) ----------

/** The balance numbers' эталоны in src/game.js: key → number text, from every balance("key", number) call. */
function balanceDefaults_(gameSource) {
  var found = {}, pattern = /\bbalance\("([^"]+)",\s*(-?\d+(?:\.\d+)?)\)/g, match;
  while ((match = pattern.exec(gameSource))) found[match[1]] = String(Number(match[2]));
  return found;
}

/** The whole balance CSV from balanceConfig; notes come from the CSV it replaces, эталоны from src/game.js. */
function balanceCsvFromConfig_(balanceConfig, defaults, oldText) {
  var notes = {};
  if (oldText) parseCsv_(oldText).rows.forEach(function (row) { notes[row.key] = row.notes || ''; });
  var rows = balanceConfig.map(function (param) {
    var row = { key: param.key, name: param.name, value: param.value, default: defaults[param.key], unit: param.unit,
      min: param.min, max: param.max, notes: notes[param.key] || '' };
    BALANCE_COLUMNS.forEach(function (name) { row[name] = row[name] === undefined || row[name] === null ? '' : String(row[name]); });
    return row;
  });
  return csvText_({ header: BALANCE_COLUMNS, rows: rows });
}

/** A balance cell as the CSV writes it: numbers as digits, text trimmed. */
function balanceCsvValue_(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return String(value);
  return String(value).trim();
}

function balanceSheetValue_(field, cell) {
  return BALANCE_FIELDS[field].kind === 'value' && cell !== '' && !isNaN(Number(cell)) ? Number(cell) : cell;
}

/** What is wrong with a balance cell (CSV text) of the row taken from the game; '' when nothing. */
function balanceProblem_(field, value, row) {
  var kind = BALANCE_FIELDS[field].kind, base = row[field] || '';
  if (kind === 'fixed') return value === base ? '' : 'меняется только в коде (в игре «' + base + '»)';
  if (kind === 'note') return '';
  var min = Number(row.min), max = Number(row.max);
  if (!/^-?\d+$/.test(value)) return 'нужно целое число от ' + min + ' до ' + max;
  return Number(value) >= min && Number(value) <= max ? '' : 'нужно от ' + min + ' до ' + max;
}

/** src/game.config.js with the changed numbers on their own lines only; c: { key, field, to } in CSV text. */
function patchGameConfig_(text, changes) {
  var lines = text.split('\n');
  changes.forEach(function (c) {
    if (BALANCE_FIELDS[c.field].kind === 'note') return;
    if (c.field !== 'value') throw new Error(c.field + ' меняется только в коде');
    var start = '  { key: ' + JSON.stringify(c.key) + ', value: ';
    var at = lines.map(function (line) { return line.indexOf(start); }).indexOf(0);
    var rest = at < 0 ? null : lines[at].slice(start.length).match(/^-?\d+(?:\.\d+)?(,.*)$/);
    if (!rest) throw new Error('В ' + BALANCE_CONFIG_PATH + ' нет строки числа ' + c.key);
    lines[at] = start + String(Number(c.to)) + rest[1];
  });
  return lines.join('\n');
}

/** The balance CSV with the changed cells only. */
function patchBalanceCsv_(text, changes) {
  var table = parseCsv_(text);
  changes.forEach(function (c) {
    var row = table.rows.filter(function (r) { return r.key === c.key; })[0];
    if (!row) throw new Error('В ' + BALANCE_CSV_PATH + ' нет числа ' + c.key);
    row[c.field] = c.to;
  });
  return csvText_(table);
}

// ---------- GitHub ----------

function connect() {
  var ui = SpreadsheetApp.getUi();
  var answer = ui.prompt('Подключить к игре',
    'Вставь токен GitHub (fine-grained: только репозиторий very-big-adventure, право Contents: Read and write). ' +
    'Он сохранится только в твоём аккаунте Google — другие, кто правит таблицу, его не видят.', ui.ButtonSet.OK_CANCEL);
  if (answer.getSelectedButton() !== ui.Button.OK) return;
  var token = answer.getResponseText().trim();
  if (!token) return;
  var properties = PropertiesService.getUserProperties();
  properties.setProperty('GITHUB_TOKEN', token);
  try {
    readHead_();
    ui.alert('Готово: таблица видит игру и может отправлять в неё карты.');
  } catch (error) {
    properties.deleteProperty('GITHUB_TOKEN');
    ui.alert('Не получилось: ' + error.message);
  }
}

function token_() {
  var token = PropertiesService.getUserProperties().getProperty('GITHUB_TOKEN');
  if (!token) throw new Error('Сначала «' + MENU + ' → Подключить к игре».');
  return token;
}

function github_(method, path, payload) {
  var options = {
    method: method, muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + token_(), Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
  };
  if (payload) { options.contentType = 'application/json'; options.payload = JSON.stringify(payload); }
  var response = UrlFetchApp.fetch('https://api.github.com/repos/' + REPO + path, options);
  var code = response.getResponseCode(), body = response.getContentText();
  if (code >= 300) {
    var error = new Error(describe_(code, body));
    error.code = code;
    throw error;
  }
  return JSON.parse(body);
}

function describe_(code, body) {
  if (code === 401) return 'GitHub не принял токен (истёк или неверный) — «Подключить к игре» заново.';
  if (code === 403 || code === 404) return 'Нет доступа к игре: токену нужен репозиторий very-big-adventure и право Contents: Read and write.';
  if (code === 409 || code === 422) return 'Карты в игре только что изменились.';
  return 'GitHub ответил ' + code + ': ' + body.slice(0, 200);
}

function decode_(content) {
  return Utilities.newBlob(Utilities.base64Decode(content.replace(/\s/g, ''))).getDataAsString('UTF-8');
}

/** A CSV in dev (the cards' one by default): { text, mark, table }. With a token through the API (fresh), without one
 *  from the public raw copy (the repository is public; that copy may lag a few minutes). mark tells one text from another. */
function readGame_(path) {
  var text;
  path = path || CSV_PATH;
  if (PropertiesService.getUserProperties().getProperty('GITHUB_TOKEN')) {
    text = decode_(github_('get', '/contents/' + path + '?ref=' + BRANCH).content);
  } else {
    var response = UrlFetchApp.fetch('https://raw.githubusercontent.com/' + REPO + '/' + BRANCH + '/' + path, { muteHttpExceptions: true });
    if (response.getResponseCode() !== 200) throw new Error('GitHub не отдал карты: ' + response.getResponseCode());
    text = response.getContentText('UTF-8');
  }
  return game_(text);
}

function game_(text) {
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, text, Utilities.Charset.UTF_8);
  var mark = digest.map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
  return { text: text, mark: mark, table: parseCsv_(text) };
}

/** dev's head with the card and balance files at it. */
function readHead_() {
  var sha = github_('get', '/git/ref/heads/' + BRANCH).object.sha;
  var at = function (path) { return decode_(github_('get', '/contents/' + path + '?ref=' + sha).content); };
  return { sha: sha, tree: github_('get', '/git/commits/' + sha).tree.sha, csv: at(CSV_PATH), config: at(CONFIG_PATH),
    balanceCsv: at(BALANCE_CSV_PATH), balanceConfig: at(BALANCE_CONFIG_PATH) };
}

/** One commit on dev's head with the files (path → text); throws with code 422 when dev moved meanwhile (never forced). */
function commit_(head, files, message) {
  var tree = github_('post', '/git/trees', { base_tree: head.tree, tree: Object.keys(files).map(function (path) {
    return { path: path, mode: '100644', type: 'blob', content: files[path] };
  }) });
  var commit = github_('post', '/git/commits', { message: message, tree: tree.sha, parents: [head.sha] });
  github_('patch', '/git/refs/heads/' + BRANCH, { sha: commit.sha, force: false });
}

// ---------- Sheets ----------

/** «Взять из игры»: lays every deck tab out from the game's CSV and remembers it as the base of your changes. */
function takeFromGame() {
  withLock_(function () {
    var ui = SpreadsheetApp.getUi(), book = SpreadsheetApp.getActive();
    var base = readBase_(book);
    if (base) {
      var pending = diff_(readSheets_(book), base).concat(diffBalance_(readBalanceSheet_(book), readBalanceBase_(book)));
      if (pending.length) {
        var answer = ui.alert('Взять из игры', 'В таблице есть неотправленные изменения (' + pending.length + '). Они пропадут. Продолжить?', ui.ButtonSet.YES_NO);
        if (answer !== ui.Button.YES) return;
      }
    }
    var game = readGame_();
    layout_(book, game.table);
    saveBase_(book, game);
    var balance = takeBalance_(book);
    book.toast('Карты из игры: ' + game.table.rows.length + ' карт, колоды ' + decksOf_(game.table).join(', ') + '. Баланс: ' + balance.table.rows.length + ' чисел.', MENU, 8);
  });
}

/** Lays the deck tabs out from the table. A tab of the same name that this script did not make is kept under
 *  «<колода> (до синхронизации)». values (key → CSV text) keeps the sheet's own cells instead of the game's. */
function layout_(book, table, values) {
  var decks = decksOf_(table);
  decks.forEach(function (deck) {
    var rows = table.rows.filter(function (row) { return row.deck === deck; });
    var fields = SHEET_ORDER.filter(function (field) {
      return ALWAYS[field] || (table.header.indexOf(field) >= 0 && rows.some(function (row) { return row[field]; }));
    });
    var sheet = deckSheet_(book, deck);
    sheet.clear();
    sheet.clearNotes();
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).clearDataValidations();
    sheet.showRows(1, sheet.getMaxRows());
    sheet.showColumns(1, sheet.getMaxColumns());
    var width = fields.length + 1, height = rows.length + 2;
    if (sheet.getMaxColumns() < width) sheet.insertColumnsAfter(sheet.getMaxColumns(), width - sheet.getMaxColumns());
    if (sheet.getMaxRows() < height) sheet.insertRowsAfter(sheet.getMaxRows(), height - sheet.getMaxRows());

    var grid = [['c:'].concat(fields), [''].concat(fields.map(function (f) { return FIELDS[f].label; }))];
    var formats = [grid[0].map(function () { return '@'; }), grid[1].map(function () { return '@'; })];
    var rules = [grid[0].map(function () { return null; }), grid[1].map(function () { return null; })];
    rows.forEach(function (row) {
      var cells = fields.map(function (field) {
        var key = deck + '/' + row.id + '/' + field;
        return sheetValue_(field, values && key in values ? values[key] : row[field] || '');
      });
      grid.push(['r:' + row.id].concat(cells));
      formats.push(['@'].concat(fields.map(function (field) {
        return FIELDS[field].kind === 'number' || FIELDS[field].kind === 'effect' ? 'General' : '@';
      })));
      rules.push([null].concat(fields.map(function (field, i) {
        var list = FIELDS[field].kind === 'moment' ? momentLabels_() : FIELDS[field].kind === 'deck' && cells[i] ? decks : null;
        return list && SpreadsheetApp.newDataValidation().requireValueInList(list, true).setAllowInvalid(true).build();
      })));
    });
    var range = sheet.getRange(1, 1, height, width);
    range.setNumberFormats(formats);
    range.setValues(grid);
    range.setDataValidations(rules);
    range.setVerticalAlignment('top');

    var header = sheet.getRange(2, 1, 1, width);
    header.setBackground(COLORS.header).setFontWeight('bold').setWrap(true).setVerticalAlignment('middle');
    header.setNotes([[''].concat(fields.map(function (field) {
      var kind = FIELDS[field].kind;
      return FIELDS[field].hint || (kind === 'effect' ? EFFECT_HINT : kind === 'deck' ? 'Колода: ' + decks.join(', ') : '');
    }))]);
    fields.forEach(function (field, i) {
      var column = i + 2, kind = FIELDS[field].kind;
      sheet.setColumnWidth(column, FIELDS[field].width);
      if (!rows.length) return;
      var data = sheet.getRange(3, column, rows.length, 1);
      if (kind === 'fixed') data.setBackground(COLORS.fixed);
      data.setWrap(kind === 'text' || kind === 'note' || kind === 'extra');
    });
    sheet.hideColumns(1);
    sheet.hideRows(1);
    sheet.setFrozenRows(2);
    sheet.setFrozenColumns(3);
  });
}

/** The deck's tab made by this script; a tab of that name made by hand is kept aside under another name. */
function deckSheet_(book, deck) {
  var sheet = book.getSheetByName(deck);
  if (sheet && ours_(sheet)) return sheet;
  if (!sheet) return book.insertSheet(deck, book.getNumSheets());
  var name = deck + ' (до синхронизации)';
  for (var n = 2; book.getSheetByName(name); n++) name = deck + ' (до синхронизации ' + n + ')';
  sheet.setName(name).setTabColor(COLORS.backup);
  return book.insertSheet(deck, sheet.getIndex() - 1);
}

function ours_(sheet) {
  return sheet.getName() !== BASE_SHEET && sheet.getName() !== BALANCE_SHEET && sheet.getLastRow() > 0 && sheet.getRange(1, 1).getValue() === 'c:';
}

/** Every card cell on the deck tabs (or on one): { cells: key → { value: CSV text, sheet, row, column, deck, id,
 *  field }, strays: rows without a card mark (new cards are made in code) }. */
function readSheets_(book, only) {
  var found = { cells: {}, strays: [] };
  (only ? [only] : book.getSheets()).forEach(function (sheet) {
    if (!ours_(sheet)) return;
    var deck = sheet.getName();
    var values = sheet.getRange(1, 1, sheet.getLastRow(), Math.max(1, sheet.getLastColumn())).getValues();
    var columns = values[0];
    values.forEach(function (line, r) {
      var mark = String(line[0]);
      if (mark.indexOf('r:') !== 0) {
        if (r > 1 && line.slice(1).some(function (v) { return v !== ''; })) found.strays.push(deck + ', строка ' + (r + 1));
        return;
      }
      var id = mark.slice(2);
      for (var c = 1; c < line.length; c++) {
        var field = columns[c];
        if (!FIELDS[field]) continue;
        found.cells[deck + '/' + id + '/' + field] = { value: csvValue_(field, line[c]), sheet: sheet, row: r + 1, column: c + 1, deck: deck, id: id, field: field };
      }
    });
  });
  return found;
}

function saveBase_(book, game) {
  var sheet = book.getSheetByName(BASE_SHEET) || book.insertSheet(BASE_SHEET);
  sheet.clear();
  var header = game.table.header;
  var grid = [header].concat(game.table.rows.map(function (row) { return header.map(function (column) { return row[column] || ''; }); }));
  if (sheet.getMaxColumns() < header.length) sheet.insertColumnsAfter(sheet.getMaxColumns(), header.length - sheet.getMaxColumns());
  if (sheet.getMaxRows() < grid.length) sheet.insertRowsAfter(sheet.getMaxRows(), grid.length - sheet.getMaxRows());
  var range = sheet.getRange(1, 1, grid.length, header.length);
  range.setNumberFormat('@');
  range.setValues(grid);
  sheet.hideSheet();
  PropertiesService.getDocumentProperties().setProperty('BASE_MARK', game.mark);
  laidOut_(game);
}

/** The tabs now show this CSV laid out by this script: the auto update has nothing to do until either moves. */
function laidOut_(game) {
  PropertiesService.getDocumentProperties().setProperties({ LAID_OUT_MARK: game.mark, LAID_OUT_WITH: SCRIPT_VERSION });
}

/** The CSV last taken from the game: { table, rows: 'deck/id' → row, decks }; null before the first take. */
function readBase_(book) {
  var sheet = book.getSheetByName(BASE_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return null;
  var values = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  var header = values[0], table = { header: header, rows: [] }, rows = {};
  values.slice(1).forEach(function (line) {
    var row = {};
    header.forEach(function (column, i) { row[column] = line[i]; });
    table.rows.push(row);
    rows[row.deck + '/' + row.id] = row;
  });
  return { table: table, rows: rows, decks: decksOf_(table) };
}

function label_(base, cell) {
  var row = base.rows[cell.deck + '/' + cell.id];
  return cell.deck + ' · ' + (row && row.title || cell.id) + ' · ' + FIELDS[cell.field].label;
}

/** A CSV value for a message: a moment by its name, long text cut. */
function short_(text, field) {
  if (field && FIELDS[field] && FIELDS[field].kind === 'moment' && MOMENTS[text]) return MOMENTS[text];
  text = String(text).replace(/\\n/g, ' ');
  return text === '' ? '(пусто)' : text.length > 60 ? text.slice(0, 57) + '…' : text;
}

/** Your changes against the base: [{ deck, id, field, from, to, cell, label }]. */
function diff_(shown, base) {
  var changes = [];
  Object.keys(shown.cells).forEach(function (key) {
    var cell = shown.cells[key], row = base.rows[cell.deck + '/' + cell.id];
    if (!row || !(cell.field in row)) return;
    var from = row[cell.field] || '';
    if (cell.value !== from) changes.push({ deck: cell.deck, id: cell.id, field: cell.field, from: from, to: cell.value, cell: cell, label: label_(base, cell) });
  });
  return changes;
}

function problems_(shown, base) {
  var problems = [];
  Object.keys(shown.cells).forEach(function (key) {
    var cell = shown.cells[key], row = base.rows[cell.deck + '/' + cell.id];
    if (!row) return;
    var text = problem_(cell.field, cell.value, row[cell.field] || '', base.decks);
    if (text) problems.push({ key: key, cell: cell, text: label_(base, cell) + ': ' + text });
  });
  return problems;
}

/** Cards in the base that have no row on their tab any more: the game keeps them (deleting is done in code). */
function missing_(shown, base) {
  var seen = {};
  Object.keys(shown.cells).forEach(function (key) { var c = shown.cells[key]; seen[c.deck + '/' + c.id] = true; });
  return Object.keys(base.rows).filter(function (key) { return !seen[key]; });
}

function colour_(field) {
  return FIELDS[field].kind === 'fixed' ? COLORS.fixed : null;
}

function mark_(shown, changes, problems) {
  var colours = {};
  Object.keys(shown.cells).forEach(function (key) { colours[key] = colour_(shown.cells[key].field); });
  changes.forEach(function (c) { colours[c.deck + '/' + c.id + '/' + c.field] = COLORS.changed; });
  problems.forEach(function (p) { colours[p.key] = COLORS.bad; });
  // One read and one write of the backgrounds per tab.
  var sheets = {};
  Object.keys(colours).forEach(function (key) {
    var cell = shown.cells[key], id = cell.sheet.getSheetId();
    (sheets[id] = sheets[id] || { sheet: cell.sheet, cells: [] }).cells.push({ cell: cell, colour: colours[key] });
  });
  Object.keys(sheets).forEach(function (id) {
    var sheet = sheets[id].sheet, range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()), now = range.getBackgrounds();
    sheets[id].cells.forEach(function (c) { now[c.cell.row - 1][c.cell.column - 1] = c.colour; });
    range.setBackgrounds(now);
  });
}

/** Highlights a cell you change right away (honey, red for what only the code changes) and clears it when it is
 *  back to the game's value. */
function onEdit(e) {
  var sheet = e.range.getSheet();
  if (oursBalance_(sheet)) { onBalanceEdit_(e); return; }
  if (!ours_(sheet)) return;
  var base = readBase_(e.source);
  if (!base) return;
  var shown = readSheets_(e.source, sheet);
  Object.keys(shown.cells).forEach(function (key) {
    var cell = shown.cells[key], row = base.rows[cell.deck + '/' + cell.id];
    if (!row || !(cell.field in row)) return;
    if (cell.row < e.range.getRow() || cell.row > e.range.getLastRow() || cell.column < e.range.getColumn() || cell.column > e.range.getLastColumn()) return;
    var changed = cell.value !== (row[cell.field] || '');
    sheet.getRange(cell.row, cell.column).setBackground(!changed ? colour_(cell.field) : FIELDS[cell.field].kind === 'fixed' ? COLORS.bad : COLORS.changed);
  });
}

function withLock_(work) {
  var lock = LockService.getDocumentLock();
  if (!lock.tryLock(30000)) { SpreadsheetApp.getUi().alert('Таблица сейчас обновляется из игры. Попробуй через минуту.'); return; }
  try { work(); } finally { lock.releaseLock(); }
}

// ---------- The balance tab ----------

function oursBalance_(sheet) {
  return sheet.getName() === BALANCE_SHEET && sheet.getLastRow() > 0 && sheet.getRange(1, 1).getValue() === 'c:';
}

/** Lays the «Баланс» tab out from the balance table, first among the tabs; values (key/field → CSV text) keeps the
 *  sheet's own cells instead of the game's. A tab of that name made by hand is kept aside under another name. */
function layoutBalance_(book, table, values) {
  var sheet = book.getSheetByName(BALANCE_SHEET);
  if (sheet && !oursBalance_(sheet)) {
    var name = BALANCE_SHEET + ' (до синхронизации)';
    for (var n = 2; book.getSheetByName(name); n++) name = BALANCE_SHEET + ' (до синхронизации ' + n + ')';
    sheet.setName(name).setTabColor(COLORS.backup);
    sheet = null;
  }
  if (!sheet) sheet = book.insertSheet(BALANCE_SHEET, 0);
  sheet.clear();
  sheet.clearNotes();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).clearDataValidations();
  sheet.showRows(1, sheet.getMaxRows());
  sheet.showColumns(1, sheet.getMaxColumns());
  var fields = BALANCE_ORDER, rows = table.rows, width = fields.length + 1, height = rows.length + 2;
  if (sheet.getMaxColumns() < width) sheet.insertColumnsAfter(sheet.getMaxColumns(), width - sheet.getMaxColumns());
  if (sheet.getMaxRows() < height) sheet.insertRowsAfter(sheet.getMaxRows(), height - sheet.getMaxRows());

  var grid = [['c:'].concat(fields), [''].concat(fields.map(function (f) { return BALANCE_FIELDS[f].label; }))];
  var formats = [grid[0].map(function () { return '@'; }), grid[1].map(function () { return '@'; })];
  rows.forEach(function (row) {
    grid.push(['r:' + row.key].concat(fields.map(function (field) {
      var key = row.key + '/' + field;
      return balanceSheetValue_(field, values && key in values ? values[key] : row[field] || '');
    })));
    formats.push(['@'].concat(fields.map(function (field) { return BALANCE_FIELDS[field].kind === 'value' ? 'General' : '@'; })));
  });
  var range = sheet.getRange(1, 1, height, width);
  range.setNumberFormats(formats);
  range.setValues(grid);
  range.setVerticalAlignment('top');

  var header = sheet.getRange(2, 1, 1, width);
  header.setBackground(COLORS.header).setFontWeight('bold').setWrap(true).setVerticalAlignment('middle');
  header.setNotes([[''].concat(fields.map(function (field) { return BALANCE_FIELDS[field].hint || ''; }))]);
  fields.forEach(function (field, i) {
    var column = i + 2, kind = BALANCE_FIELDS[field].kind;
    sheet.setColumnWidth(column, BALANCE_FIELDS[field].width);
    if (!rows.length) return;
    var data = sheet.getRange(3, column, rows.length, 1);
    if (kind === 'fixed') data.setBackground(COLORS.fixed);
    if (kind === 'value') data.setFontWeight('bold');
    data.setWrap(field === 'name' || kind === 'note');
  });
  sheet.hideColumns(1);
  sheet.hideRows(1);
  sheet.setFrozenRows(2);
  sheet.setFrozenColumns(2);
}

/** Every number cell of the «Баланс» tab: { cells: 'key/field' → { value: CSV text, sheet, row, column, key, field },
 *  strays: rows without a number mark (new numbers are made in code) }. */
function readBalanceSheet_(book) {
  var found = { cells: {}, strays: [] }, sheet = book.getSheetByName(BALANCE_SHEET);
  if (!sheet || !oursBalance_(sheet)) return found;
  var values = sheet.getRange(1, 1, sheet.getLastRow(), Math.max(1, sheet.getLastColumn())).getValues(), columns = values[0];
  values.forEach(function (line, r) {
    var mark = String(line[0]);
    if (mark.indexOf('r:') !== 0) {
      if (r > 1 && line.slice(1).some(function (v) { return v !== ''; })) found.strays.push(BALANCE_SHEET + ', строка ' + (r + 1));
      return;
    }
    var key = mark.slice(2);
    for (var c = 1; c < line.length; c++) {
      var field = columns[c];
      if (!BALANCE_FIELDS[field]) continue;
      found.cells[key + '/' + field] = { value: balanceCsvValue_(line[c]), sheet: sheet, row: r + 1, column: c + 1, key: key, field: field };
    }
  });
  return found;
}

function saveBalanceBase_(book, game) {
  var sheet = book.getSheetByName(BALANCE_BASE_SHEET) || book.insertSheet(BALANCE_BASE_SHEET);
  sheet.clear();
  var header = game.table.header;
  var grid = [header].concat(game.table.rows.map(function (row) { return header.map(function (column) { return row[column] || ''; }); }));
  if (sheet.getMaxColumns() < header.length) sheet.insertColumnsAfter(sheet.getMaxColumns(), header.length - sheet.getMaxColumns());
  if (sheet.getMaxRows() < grid.length) sheet.insertRowsAfter(sheet.getMaxRows(), grid.length - sheet.getMaxRows());
  var range = sheet.getRange(1, 1, grid.length, header.length);
  range.setNumberFormat('@');
  range.setValues(grid);
  sheet.hideSheet();
  balanceLaidOut_(game);
}

function balanceLaidOut_(game) {
  PropertiesService.getDocumentProperties().setProperties({ BALANCE_LAID_OUT_MARK: game.mark, BALANCE_LAID_OUT_WITH: SCRIPT_VERSION });
}

/** The balance CSV last taken from the game: { table, rows: key → row }; null before the first take. */
function readBalanceBase_(book) {
  var sheet = book.getSheetByName(BALANCE_BASE_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return null;
  var values = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  var header = values[0], table = { header: header, rows: [] }, rows = {};
  values.slice(1).forEach(function (line) {
    var row = {};
    header.forEach(function (column, i) { row[column] = line[i]; });
    table.rows.push(row);
    rows[row.key] = row;
  });
  return { table: table, rows: rows };
}

/** Your balance changes against the base: [{ kind: 'balance', key, field, from, to, cell, label }]. */
function diffBalance_(shown, base) {
  var changes = [];
  if (!base) return changes;
  Object.keys(shown.cells).forEach(function (id) {
    var cell = shown.cells[id], row = base.rows[cell.key];
    if (!row || !(cell.field in row)) return;
    var from = row[cell.field] || '';
    if (cell.value !== from) {
      changes.push({ kind: 'balance', key: cell.key, field: cell.field, from: from, to: cell.value, cell: cell,
        label: BALANCE_SHEET + ' · ' + (row.name || cell.key) + ' · ' + BALANCE_FIELDS[cell.field].label });
    }
  });
  return changes;
}

function balanceProblems_(shown, base) {
  var problems = [];
  if (!base) return problems;
  Object.keys(shown.cells).forEach(function (id) {
    var cell = shown.cells[id], row = base.rows[cell.key];
    if (!row) return;
    var text = balanceProblem_(cell.field, cell.value, row);
    if (text) problems.push({ key: id, cell: cell, text: BALANCE_SHEET + ' · ' + (row.name || cell.key) + ' · ' + BALANCE_FIELDS[cell.field].label + ': ' + text });
  });
  return problems;
}

function balanceColour_(field) {
  return BALANCE_FIELDS[field].kind === 'fixed' ? COLORS.fixed : null;
}

function markBalance_(shown, changes, problems) {
  var keys = Object.keys(shown.cells);
  if (!keys.length) return;
  var colours = {};
  keys.forEach(function (id) { colours[id] = balanceColour_(shown.cells[id].field); });
  changes.forEach(function (c) { colours[c.key + '/' + c.field] = COLORS.changed; });
  problems.forEach(function (p) { colours[p.key] = COLORS.bad; });
  var sheet = shown.cells[keys[0]].sheet, range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()), now = range.getBackgrounds();
  keys.forEach(function (id) { var cell = shown.cells[id]; now[cell.row - 1][cell.column - 1] = colours[id]; });
  range.setBackgrounds(now);
}

/** The «Баланс» tab after an edit: honey for your change, red for what only the code changes. */
function onBalanceEdit_(e) {
  var base = readBalanceBase_(e.source);
  if (!base) return;
  var shown = readBalanceSheet_(e.source), sheet = e.range.getSheet();
  Object.keys(shown.cells).forEach(function (id) {
    var cell = shown.cells[id], row = base.rows[cell.key];
    if (!row || !(cell.field in row)) return;
    if (cell.row < e.range.getRow() || cell.row > e.range.getLastRow() || cell.column < e.range.getColumn() || cell.column > e.range.getLastColumn()) return;
    var changed = cell.value !== (row[cell.field] || '');
    sheet.getRange(cell.row, cell.column).setBackground(!changed ? balanceColour_(cell.field) : BALANCE_FIELDS[cell.field].kind === 'fixed' ? COLORS.bad : COLORS.changed);
  });
}

/** Lays «Баланс» out from the game and makes it the base of your changes. */
function takeBalance_(book) {
  var game = readGame_(BALANCE_CSV_PATH);
  layoutBalance_(book, game.table);
  saveBalanceBase_(book, game);
  return game;
}

/** The auto update of «Баланс», as autoUpdate does the deck tabs. The first run with this script makes the tab. */
function autoUpdateBalance_(book) {
  var properties = PropertiesService.getDocumentProperties(), game = readGame_(BALANCE_CSV_PATH);
  if (game.mark === properties.getProperty('BALANCE_LAID_OUT_MARK') && properties.getProperty('BALANCE_LAID_OUT_WITH') === SCRIPT_VERSION) return;
  var base = readBalanceBase_(book), shown = readBalanceSheet_(book);
  if (!base || !diffBalance_(shown, base).length) {
    layoutBalance_(book, game.table);
    saveBalanceBase_(book, game);
    book.toast('Баланс из игры: ' + game.table.rows.length + ' чисел.', MENU, 6);
    return;
  }
  var values = {};
  Object.keys(shown.cells).forEach(function (id) { values[id] = shown.cells[id].value; });
  layoutBalance_(book, game.table, values);
  balanceLaidOut_(game);
  var now = readBalanceSheet_(book);
  markBalance_(now, diffBalance_(now, base), balanceProblems_(now, base));
  book.toast('Новые числа баланса и оформление из игры подтянуты, твои правки на месте.', MENU, 6);
}

// ---------- Auto update ----------

/** «Включить автообновление»: a time trigger runs autoUpdate every AUTO_MINUTES minutes as you. */
function enableAutoUpdate() {
  stopAutoUpdate_();
  ScriptApp.newTrigger('autoUpdate').timeBased().everyMinutes(AUTO_MINUTES).create();
  autoUpdate();
  var ui = SpreadsheetApp.getUi();
  ui.alert('Автообновление включено',
    'Раз в ' + AUTO_MINUTES + ' минут таблица сама берёт из игры новые карты и оформление. ' +
    'Неотправленные правки остаются твоими и медовыми, пока ты их не отправишь.', ui.ButtonSet.OK);
}

function disableAutoUpdate() {
  stopAutoUpdate_();
  SpreadsheetApp.getUi().alert('Автообновление выключено. «Взять из игры» работает как раньше.');
}

function stopAutoUpdate_() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'autoUpdate') ScriptApp.deleteTrigger(trigger);
  });
}

/** Runs by the trigger: when the game's CSV or this script changed since the tabs were laid out, lays them out again.
 *  Without unsent changes that is «Взять из игры»; with them the tabs keep all their cells (new cards and columns come
 *  in, the base stays), so nothing of yours is overwritten. Quiet on errors: the next run tries again. */
function autoUpdate() {
  var lock = LockService.getDocumentLock();
  if (!lock.tryLock(5000)) return;
  try {
    var book = SpreadsheetApp.getActive(), properties = PropertiesService.getDocumentProperties();
    var base = readBase_(book);
    if (!base) return; // the first «Взять из игры» stays yours
    removeBackups_(book);
    try { autoUpdateBalance_(book); } catch (error) { console.warn('autoUpdate balance: ' + error.message); }
    var game = readGame_();
    if (game.mark === properties.getProperty('LAID_OUT_MARK') && properties.getProperty('LAID_OUT_WITH') === SCRIPT_VERSION) return;
    var shown = readSheets_(book);
    if (!diff_(shown, base).length) {
      layout_(book, game.table);
      saveBase_(book, game);
      book.toast('Новое из игры: ' + game.table.rows.length + ' карт.', MENU, 6);
      return;
    }
    var values = {};
    Object.keys(shown.cells).forEach(function (key) { values[key] = shown.cells[key].value; });
    layout_(book, game.table, values);
    laidOut_(game);
    var now = readSheets_(book);
    mark_(now, diff_(now, base), problems_(now, base));
    book.toast('Новые карты и оформление из игры подтянуты, твои правки на месте.', MENU, 6);
  } catch (error) {
    console.warn('autoUpdate: ' + error.message);
  } finally {
    lock.releaseLock();
  }
}

// The user's word, 12 Oct 2026: the tabs kept aside at the first take («good (до синхронизации)» and the like) go
// away. Done once, by the first update with this script; Google keeps them in the version history.
function removeBackups_(book) {
  var properties = PropertiesService.getDocumentProperties();
  if (properties.getProperty('BACKUPS_REMOVED')) return;
  book.getSheets().forEach(function (sheet) {
    if (/ \(до синхронизации( \d+)?\)$/.test(sheet.getName())) book.deleteSheet(sheet);
  });
  properties.setProperty('BACKUPS_REMOVED', '1');
}

// ---------- Check and send ----------

function checkSheet() {
  var ui = SpreadsheetApp.getUi(), book = SpreadsheetApp.getActive();
  var base = readBase_(book);
  if (!base) { ui.alert('Сначала «' + MENU + ' → Взять из игры».'); return; }
  var shown = readSheets_(book), balanceBase = readBalanceBase_(book), balanceShown = readBalanceSheet_(book);
  var balanceChanges = diffBalance_(balanceShown, balanceBase), balanceProblems = balanceProblems_(balanceShown, balanceBase);
  var changes = diff_(shown, base), problems = problems_(shown, base);
  mark_(shown, changes, problems);
  markBalance_(balanceShown, balanceChanges, balanceProblems);
  problems = problems.concat(balanceProblems);
  changes = changes.concat(balanceChanges);
  var lines = [];
  if (problems.length) lines.push('Ошибки (красные):\n' + problems.map(function (p) { return '• ' + p.text; }).join('\n'));
  lines.push(changes.length ? 'Твои изменения (медовые):\n' + changes.map(changeLine_).join('\n') : 'Твоих изменений нет.');
  lines = lines.concat(notices_(shown, base, balanceShown));
  try {
    var game = readGame_(), moved = [];
    game.table.rows.forEach(function (row) {
      var was = base.rows[row.deck + '/' + row.id];
      if (!was) { moved.push('• новая карта ' + row.deck + ' · ' + row.title); return; }
      Object.keys(FIELDS).forEach(function (field) {
        if (field in was && (row[field] || '') !== (was[field] || ''))
          moved.push('• ' + row.deck + ' · ' + row.title + ' · ' + FIELDS[field].label + ': ' + short_(was[field], field) + ' → ' + short_(row[field], field));
      });
    });
    if (balanceBase) {
      readGame_(BALANCE_CSV_PATH).table.rows.forEach(function (row) {
        var was = balanceBase.rows[row.key];
        if (!was) { moved.push('• новое число баланса · ' + row.name); return; }
        ['name', 'value', 'default', 'min', 'max'].forEach(function (field) {
          if ((row[field] || '') !== (was[field] || ''))
            moved.push('• ' + BALANCE_SHEET + ' · ' + row.name + ' · ' + BALANCE_FIELDS[field].label + ': ' + short_(was[field]) + ' → ' + short_(row[field]));
        });
      });
    }
    if (moved.length) lines.push('В игре после твоей загрузки поменяли:\n' + moved.join('\n'));
  } catch (error) { lines.push('Игру проверить не удалось: ' + error.message); }
  ui.alert('Проверка', lines.join('\n\n'), ui.ButtonSet.OK);
}

function changeLine_(c) {
  return '• ' + c.label + ': ' + short_(c.from, c.field) + ' → ' + short_(c.to, c.field);
}

function notices_(shown, base, balanceShown) {
  var lines = [];
  var strays = shown.strays.concat(balanceShown ? balanceShown.strays : []);
  if (strays.length) lines.push('Новые строки не отправляются — новые карты и числа добавляют в коде:\n' + strays.map(function (s) { return '• ' + s; }).join('\n'));
  var missing = missing_(shown, base);
  if (missing.length) lines.push('Строк этих карт нет в таблице, в игре они остаются:\n' + missing.map(function (s) { return '• ' + s; }).join('\n'));
  return lines;
}

function sendToGame() {
  withLock_(function () {
    var ui = SpreadsheetApp.getUi(), book = SpreadsheetApp.getActive();
    var base = readBase_(book);
    if (!base) { ui.alert('Сначала «' + MENU + ' → Взять из игры».'); return; }
    var shown = readSheets_(book), problems = problems_(shown, base), changes = diff_(shown, base);
    var balanceBase = readBalanceBase_(book), balanceShown = readBalanceSheet_(book);
    var balanceChanges = diffBalance_(balanceShown, balanceBase), balanceProblems = balanceProblems_(balanceShown, balanceBase);
    mark_(shown, changes, problems);
    markBalance_(balanceShown, balanceChanges, balanceProblems);
    problems = problems.concat(balanceProblems);
    changes = changes.concat(balanceChanges);
    if (problems.length) {
      ui.alert('Не отправлено', 'Исправь красные ячейки:\n' + problems.map(function (p) { return '• ' + p.text; }).join('\n'), ui.ButtonSet.OK);
      return;
    }
    if (!changes.length) { ui.alert('Нечего отправлять: карты и баланс совпадают с теми, что взяты из игры.'); return; }
    var confirm = ui.alert('Отправить в игру', changes.map(changeLine_).concat(notices_(shown, base, balanceShown)).join('\n'), ui.ButtonSet.OK_CANCEL);
    if (confirm !== ui.Button.OK) return;

    var decided = {}, sent = null;
    for (var attempt = 0; attempt < 3 && !sent; attempt++) {
      var head = readHead_(), now = {}, numbers = {};
      parseCsv_(head.csv).rows.forEach(function (row) { now[row.deck + '/' + row.id] = row; });
      parseCsv_(head.balanceCsv).rows.forEach(function (row) { numbers[row.key] = row; });
      var current = function (c) {
        var row = c.kind === 'balance' ? numbers[c.key] : now[c.deck + '/' + c.id];
        return row && c.field in row ? row[c.field] : null;
      };
      // Someone changed the same cell in the game since you took it: ask once whose value stays.
      var conflicts = changes.filter(function (c) {
        var game = current(c);
        return game !== null && game !== c.from && game !== c.to && !(c.label in decided);
      });
      if (conflicts.length) {
        var answer = ui.alert('Эти значения в игре успели поменять',
          conflicts.map(function (c) { return '• ' + c.label + ': у тебя ' + short_(c.to, c.field) + ', в игре уже ' + short_(current(c), c.field) + ' (было ' + short_(c.from, c.field) + ')'; }).join('\n') +
          '\n\nДа — оставить твои, Нет — оставить из игры.', ui.ButtonSet.YES_NO_CANCEL);
        if (answer !== ui.Button.YES && answer !== ui.Button.NO) return;
        conflicts.forEach(function (c) { decided[c.label] = answer === ui.Button.YES; });
      }
      var apply = changes.filter(function (c) { var game = current(c); return game !== null && decided[c.label] !== false && game !== c.to; });
      var cards = apply.filter(function (c) { return c.kind !== 'balance'; }), numbersApply = apply.filter(function (c) { return c.kind === 'balance'; });
      var result = { csv: head.csv, balanceCsv: head.balanceCsv, apply: apply };
      if (!apply.length) { sent = result; break; }
      var files = {};
      if (cards.length) {
        files[CSV_PATH] = result.csv = patchCsv_(head.csv, cards);
        files[CONFIG_PATH] = patchConfig_(head.config, cards);
      }
      if (numbersApply.length) {
        files[BALANCE_CSV_PATH] = result.balanceCsv = patchBalanceCsv_(head.balanceCsv, numbersApply);
        files[BALANCE_CONFIG_PATH] = patchGameConfig_(head.balanceConfig, numbersApply);
      }
      var names = apply.map(function (c) { return (c.kind === 'balance' ? c.key : c.id) + ' ' + c.field; });
      var what = !numbersApply.length ? 'Cards' : !cards.length ? 'Balance' : 'Cards and balance';
      var message = what + ' from the sheet: ' + names.slice(0, 6).join(', ') + (names.length > 6 ? ' and ' + (names.length - 6) + ' more' : '') +
        '\n\n' + apply.map(function (c) { return (c.kind === 'balance' ? c.key : c.deck + '/' + c.id) + ' ' + c.field + ': ' + c.from + ' -> ' + c.to; }).join('\n');
      try {
        commit_(head, files, message);
        sent = result;
      } catch (error) {
        if (error.code !== 409 && error.code !== 422) throw error; // dev moved between reading and writing: again
      }
    }
    if (!sent) { ui.alert('Не отправлено: карты и баланс в игре всё время меняются. Попробуй ещё раз.'); return; }
    var game = game_(sent.csv);
    layout_(book, game.table);
    saveBase_(book, game);
    var balance = game_(sent.balanceCsv);
    layoutBalance_(book, balance.table);
    saveBalanceBase_(book, balance);
    ui.alert('Отправлено в игру',
      sent.apply.length ? 'Изменено: ' + sent.apply.length + '. Правки ушли в ветку dev. Игра на компьютере подтянет их за минуту, увидишь после перезагрузки страницы.'
        : 'Ничего не отправлено: в игре уже эти значения. Таблица снова показывает игру.', ui.ButtonSet.OK);
  });
}
