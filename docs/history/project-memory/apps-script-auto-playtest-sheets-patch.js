/*
 * Deploy-ready patch for the Games Log Apps Script.
 *
 * Goals:
 * - Regular game history payloads append only to `Games` and `Players`.
 * - Autorun payloads with `sheetTarget.mode === "auto"` append only to
 *   `Games Auto` and `Players Auto`.
 * - Rows are written by header name, never by old positional arrays.
 * - Existing formula columns stay formula-owned; payload values never shift
 *   into `Длительность` or `Minutes`.
 *
 * Integration:
 * - Keep the existing web-app `doPost(e)`.
 * - Parse the incoming JSON payload as before.
 * - Call `appendGameHistoryPayload(payload)`.
 * - Deploy a new web-app version after replacing the old append logic.
 * - Or replace the old `doPost(e)` with the implementation below.
 *
 * Optional live cleanup after deploy:
 * - Run `previewMisroutedAutorunRows()` first.
 * - If the summary matches the known bad autorun rows, run
 *   `repairMisroutedAutorunRows()` once.
 */

const VBA_GAMES_LOG_SPREADSHEET_ID = "1uC1xUk52IbpHfm9tNtHT2_cmFSNQIKCkct88TsqmmV8";
const VBA_SMOKE_MARKER = "__VBA_SMOKE_HISTORY_SAVE__";

const VBA_SHEET_TARGETS = {
  regular: {
    gameSheet: "Games",
    gameSheetId: 0,
    playerSheet: "Players",
    playerSheetId: 211927822,
  },
  auto: {
    gameSheet: "Games Auto",
    gameSheetId: 190000001,
    playerSheet: "Players Auto",
    playerSheetId: 190000002,
  },
};

const VBA_GAME_HEADERS = [
  "ID",
  "Дата",
  "Время",
  "elapsedMs",
  "Длительность",
  "finished",
  "board",
  "playerCount",
  "botCount",
  "diceCount",
  "botSpeed",
  "tadamPlayed",
  "round",
  "turns",
  "Minutes",
  "finalOutcome",
  "finalOutcomeText",
  "finalWinnerName",
  "finalWinnerRole",
  "finalWinnerRoleId",
  "finalWinnerScore",
  "finalPlayersForce",
  "finalBossForce",
  "finalBossWon",
  "finalSummaryJson",
];

const VBA_PLAYER_HEADERS = [
  "ID партии",
  "Дата",
  "Время",
  "playerId",
  "name",
  "bot",
  "coins",
  "position",
  "turns",
  "cellsPassed",
  "coinsEarned",
  "coinsSpent",
  "maxShopCards",
  "shopCardsLeft",
  "effectsReceived",
  "maxDiceThrown",
  "finalStrength",
  "finalSteps",
  "fieldVisitsJson",
  "monsterBattlesJson",
  "itemsJson",
  "finalRole",
  "finalRoleId",
  "finalWinner",
  "finalScoreTotal",
  "finalScoreCoins",
  "finalScoreShop",
  "finalScoreDamage",
  "finalScoreDamageToBoss",
  "finalScorePosition",
  "finalBattleForce",
  "finalForceBreakdown",
  "finalScoreBreakdown",
  "finalScoreJson",
  "finalForceJson",
];

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const result = appendGameHistoryPayload(payload);
    return jsonOutput_({
      ok: true,
      ...result,
    });
  } catch (error) {
    return jsonOutput_({
      error: error && error.stack ? error.stack : String(error),
      ok: false,
    });
  }
}

function appendGameHistoryPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Empty or invalid game history payload");
  }

  const target = isAutoPayload_(payload) ? VBA_SHEET_TARGETS.auto : VBA_SHEET_TARGETS.regular;
  const ss = getGamesLogSpreadsheet_();
  const gameSheet = getRequiredSheet_(ss, target.gameSheet, target.gameSheetId);
  const playerSheet = getRequiredSheet_(ss, target.playerSheet, target.playerSheetId);
  ensureSheetHeaders_(gameSheet, VBA_GAME_HEADERS);
  ensureSheetHeaders_(playerSheet, VBA_PLAYER_HEADERS);
  ensureGameFormulaTemplates_(gameSheet);

  const savedAt = dateFromPayload_(payload);
  const numericGameId = nextNumericGameId_(gameSheet);
  const gameRecord = buildCurrentGameRecord_(payload, numericGameId, savedAt);
  appendMappedRecord_(gameSheet, gameRecord, {
    formulaBuilders: {
      Minutes: (rowNumber) => `=IF(ISBLANK(N${rowNumber});;D${rowNumber}/1000/60)`,
    },
    protectedHeaders: ["Длительность", "Minutes"],
  });

  const players = Array.isArray(payload.players) ? payload.players : [];
  players.forEach((player) => {
    const playerRecord = buildCurrentPlayerRecord_(payload, player, numericGameId, savedAt);
    appendMappedRecord_(playerSheet, playerRecord);
  });

  return {
    mode: isAutoPayload_(payload) ? "auto" : "regular",
    gameId: numericGameId,
    gameSheet: target.gameSheet,
    players: players.length,
    playerSheet: target.playerSheet,
  };
}

function jsonOutput_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function smokeRegularGameHistorySave() {
  return runSmokeGameHistorySave_("regular");
}

function smokeAutoGameHistorySave() {
  return runSmokeGameHistorySave_("auto");
}

function cleanupSmokeGameHistoryRows() {
  const ss = getGamesLogSpreadsheet_();
  const summaries = [
    cleanupSmokeRowsInTarget_(ss, VBA_SHEET_TARGETS.regular),
    cleanupSmokeRowsInTarget_(ss, VBA_SHEET_TARGETS.auto),
  ];
  const result = {
    ok: true,
    marker: VBA_SMOKE_MARKER,
    targets: summaries,
  };
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function runSmokeGameHistorySave_(mode) {
  const payload = buildSmokeGameHistoryPayload_(mode);
  const result = appendGameHistoryPayload(payload);
  const output = {
    ok: true,
    marker: VBA_SMOKE_MARKER,
    mode: result.mode,
    gameId: result.gameId,
    gameSheet: result.gameSheet,
    playerSheet: result.playerSheet,
    players: result.players,
  };
  Logger.log(JSON.stringify(output, null, 2));
  return output;
}

function buildSmokeGameHistoryPayload_(mode) {
  const savedAt = new Date().toISOString();
  const auto = mode === "auto";
  const id = `smoke-${mode}-${Utilities.getUuid()}`;
  const payload = {
    id,
    savedAt,
    version: 2,
    settings: {
      current: {
        board: "smoke-board",
        botCount: auto ? 2 : 0,
        botSpeed: auto ? "fast" : "standard",
        diceCount: 1,
        playerCount: 2,
      },
      startedWith: {
        board: "smoke-board",
        botCount: auto ? 2 : 0,
        botSpeed: auto ? "fast" : "standard",
        diceCount: 1,
        playerCount: 2,
      },
    },
    game: {
      activeBoard: "smoke-board",
      elapsedMs: 1234,
      finished: true,
      finalOutcome: auto ? "auto-smoke" : "regular-smoke",
      finalOutcomeText: `${VBA_SMOKE_MARKER} ${mode}`,
      finalWinnerName: `Smoke ${mode}`,
      finalWinnerRole: "smoke",
      finalWinnerRoleId: "smoke",
      finalWinnerScore: 1,
      finalPlayersForce: 0,
      finalBossForce: 0,
      finalBossWon: false,
      finalSummaryJson: JSON.stringify({ marker: VBA_SMOKE_MARKER, mode }),
      round: 1,
      turns: 1,
    },
    history: {
      startedAt: Date.now() - 1234,
      finishedAt: Date.now(),
      players: {
        0: smokePlayerHistory_(),
        1: smokePlayerHistory_(),
      },
    },
    players: [
      smokePlayerPayload_(0, `Smoke ${mode} A`, auto),
      smokePlayerPayload_(1, `Smoke ${mode} B`, auto),
    ],
  };
  if (auto) {
    payload.autoRun = {
      fastMode: true,
      runId: id,
      runIndex: 1,
      seed: "smoke-seed",
      status: "finished",
    };
    payload.sheetTarget = VBA_SHEET_TARGETS.auto;
  }
  return payload;
}

function smokePlayerPayload_(id, name, bot) {
  return {
    battleBonus: 0,
    bot,
    coins: 0,
    diceBonus: 0,
    finalBattleForce: 0,
    finalForceBreakdown: VBA_SMOKE_MARKER,
    finalForceJson: JSON.stringify({ marker: VBA_SMOKE_MARKER }),
    finalRole: "smoke",
    finalRoleId: "smoke",
    finalScoreBreakdown: VBA_SMOKE_MARKER,
    finalScoreCoins: 0,
    finalScoreDamage: 0,
    finalScoreDamageToBoss: 0,
    finalScoreJson: JSON.stringify({ marker: VBA_SMOKE_MARKER }),
    finalScorePosition: 0,
    finalScoreShop: 0,
    finalScoreTotal: 0,
    finalWinner: id === 0,
    id,
    items: [{ id: "smoke-card", title: VBA_SMOKE_MARKER }],
    name,
    position: "smoke-cell",
    stepBonus: 0,
  };
}

function smokePlayerHistory_() {
  return {
    cellsPassed: 1,
    coinsEarned: 0,
    coinsSpent: 0,
    effectsReceived: 0,
    fieldVisits: { smoke: 1 },
    maxDiceThrown: 1,
    maxShopCards: 1,
    monsterBattles: {},
    turns: 1,
  };
}

function cleanupSmokeRowsInTarget_(ss, target) {
  const gameSheet = getRequiredSheet_(ss, target.gameSheet, target.gameSheetId);
  const playerSheet = getRequiredSheet_(ss, target.playerSheet, target.playerSheetId);
  const gameRows = findRowsContainingMarker_(gameSheet, VBA_SMOKE_MARKER);
  const gameIds = gameRows.map((item) => String(item.values[0] || "")).filter(Boolean);
  const playerRows = findRowsByGameIdsOrMarker_(playerSheet, gameIds, VBA_SMOKE_MARKER);
  deleteRowsBottomUp_(playerSheet, playerRows.map((item) => item.rowNumber));
  deleteRowsBottomUp_(gameSheet, gameRows.map((item) => item.rowNumber));
  ensureGameFormulaTemplates_(gameSheet);
  return {
    gamesDeleted: gameRows.length,
    gameSheet: target.gameSheet,
    playersDeleted: playerRows.length,
    playerSheet: target.playerSheet,
  };
}

function findRowsContainingMarker_(sheet, marker) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 2 || lastColumn < 1) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getDisplayValues();
  const rows = [];
  values.forEach((row, index) => {
    if (row.some((value) => String(value || "").indexOf(marker) !== -1)) {
      rows.push({ rowNumber: index + 2, values: row });
    }
  });
  return rows;
}

function findRowsByGameIdsOrMarker_(sheet, gameIds, marker) {
  const idSet = new Set(gameIds.map(String));
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 2 || lastColumn < 1) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getDisplayValues();
  const rows = [];
  values.forEach((row, index) => {
    const linkedGameId = String(row[0] || "");
    const hasMarker = row.some((value) => String(value || "").indexOf(marker) !== -1);
    if (idSet.has(linkedGameId) || hasMarker) {
      rows.push({ rowNumber: index + 2, values: row });
    }
  });
  return rows;
}

function previewMisroutedAutorunRows() {
  const ss = getGamesLogSpreadsheet_();
  const games = getRequiredSheet_(ss, VBA_SHEET_TARGETS.regular.gameSheet, VBA_SHEET_TARGETS.regular.gameSheetId);
  const players = getRequiredSheet_(ss, VBA_SHEET_TARGETS.regular.playerSheet, VBA_SHEET_TARGETS.regular.playerSheetId);
  const badGames = findLegacyAutorunRows_(games);
  const badPlayers = findLegacyAutorunRows_(players);
  return {
    gamesRows: badGames.map((item) => item.rowNumber),
    gamesRowsCount: badGames.length,
    playersRows: badPlayers.map((item) => item.rowNumber),
    playersRowsCount: badPlayers.length,
  };
}

function repairMisroutedAutorunRows() {
  const ss = getGamesLogSpreadsheet_();
  const regularGames = getRequiredSheet_(ss, VBA_SHEET_TARGETS.regular.gameSheet, VBA_SHEET_TARGETS.regular.gameSheetId);
  const regularPlayers = getRequiredSheet_(ss, VBA_SHEET_TARGETS.regular.playerSheet, VBA_SHEET_TARGETS.regular.playerSheetId);
  const autoGames = getRequiredSheet_(ss, VBA_SHEET_TARGETS.auto.gameSheet, VBA_SHEET_TARGETS.auto.gameSheetId);
  const autoPlayers = getRequiredSheet_(ss, VBA_SHEET_TARGETS.auto.playerSheet, VBA_SHEET_TARGETS.auto.playerSheetId);
  ensureSheetHeaders_(autoGames, VBA_GAME_HEADERS);
  ensureSheetHeaders_(autoPlayers, VBA_PLAYER_HEADERS);
  ensureGameFormulaTemplates_(regularGames);
  ensureGameFormulaTemplates_(autoGames);

  const legacyGameRows = findLegacyAutorunRows_(regularGames);
  const legacyPlayerRows = findLegacyAutorunRows_(regularPlayers);
  const idMap = {};
  const savedAtMap = {};
  let nextId = nextNumericGameId_(autoGames);

  legacyGameRows.forEach((item) => {
    const legacyGameId = String(item.values[0] || "");
    const savedAt = legacySavedAtFromGameRow_(item.values);
    const numericGameId = nextId;
    nextId += 1;
    idMap[legacyGameId] = numericGameId;
    savedAtMap[legacyGameId] = savedAt;
    appendMappedRecord_(autoGames, buildLegacyGameRecord_(item.values, numericGameId, savedAt), {
      formulaBuilders: {
        Minutes: (rowNumber) => `=IF(ISBLANK(N${rowNumber});;D${rowNumber}/1000/60)`,
      },
      protectedHeaders: ["Длительность", "Minutes"],
    });
  });

  legacyPlayerRows.forEach((item) => {
    const legacyGameId = String(item.values[0] || "");
    const numericGameId = idMap[legacyGameId];
    if (!numericGameId) return;
    const savedAt = savedAtMap[legacyGameId] || legacySavedAtFromId_(legacyGameId) || new Date();
    appendMappedRecord_(autoPlayers, buildLegacyPlayerRecord_(item.values, numericGameId, savedAt));
  });

  deleteRowsBottomUp_(regularPlayers, legacyPlayerRows.map((item) => item.rowNumber));
  deleteRowsBottomUp_(regularGames, legacyGameRows.map((item) => item.rowNumber));
  ensureGameFormulaTemplates_(regularGames);
  ensureGameFormulaTemplates_(autoGames);

  return {
    gamesMoved: legacyGameRows.length,
    playersMoved: legacyPlayerRows.filter((item) => idMap[String(item.values[0] || "")]).length,
    targetGames: VBA_SHEET_TARGETS.auto.gameSheet,
    targetPlayers: VBA_SHEET_TARGETS.auto.playerSheet,
  };
}

function isAutoPayload_(payload) {
  return Boolean(payload && payload.sheetTarget && payload.sheetTarget.mode === "auto");
}

function getGamesLogSpreadsheet_() {
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active && active.getId && active.getId() === VBA_GAMES_LOG_SPREADSHEET_ID) return active;
  return SpreadsheetApp.openById(VBA_GAMES_LOG_SPREADSHEET_ID);
}

function getRequiredSheet_(ss, name, sheetId) {
  const sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error(`Missing sheet: ${name}`);
  if (sheetId !== undefined && sheet.getSheetId && sheet.getSheetId() !== sheetId) {
    throw new Error(`Sheet ${name} has unexpected sheetId ${sheet.getSheetId()}, expected ${sheetId}`);
  }
  return sheet;
}

function ensureSheetHeaders_(sheet, requiredHeaders) {
  const headers = headerMap_(sheet).headers;
  const missing = requiredHeaders.filter((header) => !headers.includes(header));
  if (missing.length) {
    throw new Error(`Sheet ${sheet.getName()} is missing headers: ${missing.join(", ")}`);
  }
}

function headerMap_(sheet) {
  const width = Math.max(1, sheet.getLastColumn());
  const headers = sheet.getRange(1, 1, 1, width).getDisplayValues()[0].map((value) => String(value || "").trim());
  const map = {};
  headers.forEach((header, index) => {
    if (header && map[header] === undefined) map[header] = index + 1;
  });
  return { headers, map };
}

function appendMappedRecord_(sheet, record, options) {
  const { headers, map } = headerMap_(sheet);
  const protectedHeaders = new Set((options && options.protectedHeaders) || []);
  const rowNumber = Math.max(sheet.getLastRow() + 1, 2);
  const formulaBuilders = (options && options.formulaBuilders) || {};

  let segmentStart = null;
  let segmentValues = [];
  const flushSegment = () => {
    if (segmentStart === null || !segmentValues.length) return;
    sheet.getRange(rowNumber, segmentStart + 1, 1, segmentValues.length).setValues([segmentValues]);
    segmentStart = null;
    segmentValues = [];
  };

  headers.forEach((header, index) => {
    if (!header || protectedHeaders.has(header) || formulaBuilders[header]) {
      flushSegment();
      return;
    }
    if (segmentStart === null) segmentStart = index;
    segmentValues.push(record[header] === undefined ? "" : record[header]);
  });
  flushSegment();

  Object.keys(formulaBuilders).forEach((header) => {
    const column = map[header];
    if (column) sheet.getRange(rowNumber, column).setFormula(formulaBuilders[header](rowNumber));
  });
  return rowNumber;
}

function ensureGameFormulaTemplates_(sheet) {
  const { map } = headerMap_(sheet);
  if (map["Длительность"]) {
    const cell = sheet.getRange(2, map["Длительность"]);
    const expected = '=ARRAYFORMULA(IF(D2:D=""; ; IF(INT(D2:D/86400000)>0; INT(D2:D/86400000)&"д "; "")&IF(INT(MOD(D2:D;86400000)/3600000)>0; INT(MOD(D2:D;86400000)/3600000)&"ч "; "")&INT(MOD(D2:D;3600000)/60000)&"м"))';
    if (cell.getFormula() !== expected) cell.setFormula(expected);
  }
  if (map.Minutes && sheet.getLastRow() >= 2) {
    const cell = sheet.getRange(2, map.Minutes);
    if (!cell.getFormula()) cell.setFormula("=IF(ISBLANK(N2);;D2/1000/60)");
  }
}

function buildCurrentGameRecord_(payload, numericGameId, savedAt) {
  const game = payload.game || {};
  const auto = payload.autoRun || {};
  const settings = (payload.settings && (payload.settings.startedWith || payload.settings.current)) || {};
  const players = Array.isArray(payload.players) ? payload.players : [];
  return {
    ID: numericGameId,
    Дата: dateOnly_(savedAt),
    Время: timeFraction_(savedAt),
    elapsedMs: firstValue_(game.elapsedMs, auto.elapsedMs),
    finished: firstValue_(game.finished, auto.finished),
    board: firstValue_(game.activeBoard, settings.board),
    playerCount: firstValue_(settings.playerCount, players.length),
    botCount: firstValue_(settings.botCount, countBots_(players)),
    diceCount: firstValue_(settings.diceCount, ""),
    botSpeed: firstValue_(settings.botSpeed, ""),
    tadamPlayed: firstValue_(game.tadamPlayed, ""),
    round: firstValue_(game.round, ""),
    turns: firstValue_(game.turns, ""),
    finalOutcome: firstValue_(game.finalOutcome, game.status, auto.status),
    finalOutcomeText: firstValue_(game.finalOutcomeText, game.abortReason, auto.abortReason),
    finalWinnerName: firstValue_(game.finalWinnerName, ""),
    finalWinnerRole: firstValue_(game.finalWinnerRole, ""),
    finalWinnerRoleId: firstValue_(game.finalWinnerRoleId, ""),
    finalWinnerScore: firstValue_(game.finalWinnerScore, ""),
    finalPlayersForce: firstValue_(game.finalPlayersForce, ""),
    finalBossForce: firstValue_(game.finalBossForce, ""),
    finalBossWon: firstValue_(game.finalBossWon, ""),
    finalSummaryJson: firstValue_(game.finalSummaryJson, JSON.stringify({ autoRun: auto })),
    runId: firstValue_(game.runId, auto.runId),
    runIndex: firstValue_(game.runIndex, auto.runIndex),
    seed: firstValue_(game.seed, auto.seed),
    fastMode: firstValue_(game.fastMode, auto.fastMode),
    abortReason: firstValue_(game.abortReason, auto.abortReason),
  };
}

function buildCurrentPlayerRecord_(payload, player, numericGameId, savedAt) {
  const history = payload.history && payload.history.players ? payload.history.players[player.id] || {} : {};
  return {
    "ID партии": numericGameId,
    Дата: dateOnly_(savedAt),
    Время: timeFraction_(savedAt),
    playerId: player.id,
    name: player.name,
    bot: player.bot,
    coins: player.coins,
    position: player.position,
    turns: firstValue_(history.turns, ""),
    cellsPassed: firstValue_(history.cellsPassed, ""),
    coinsEarned: firstValue_(history.coinsEarned, ""),
    coinsSpent: firstValue_(history.coinsSpent, ""),
    maxShopCards: firstValue_(history.maxShopCards, ""),
    shopCardsLeft: Array.isArray(player.items) ? player.items.length : "",
    effectsReceived: firstValue_(history.effectsReceived, ""),
    maxDiceThrown: firstValue_(history.maxDiceThrown, ""),
    finalStrength: firstValue_(player.battleBonus, ""),
    finalSteps: firstValue_(player.stepBonus, ""),
    fieldVisitsJson: JSON.stringify(history.fieldVisits || {}),
    monsterBattlesJson: JSON.stringify(history.monsterBattles || {}),
    itemsJson: JSON.stringify(player.items || []),
    finalRole: firstValue_(player.finalRole, ""),
    finalRoleId: firstValue_(player.finalRoleId, ""),
    finalWinner: firstValue_(player.finalWinner, ""),
    finalScoreTotal: firstValue_(player.finalScoreTotal, ""),
    finalScoreCoins: firstValue_(player.finalScoreCoins, ""),
    finalScoreShop: firstValue_(player.finalScoreShop, ""),
    finalScoreDamage: firstValue_(player.finalScoreDamage, ""),
    finalScoreDamageToBoss: firstValue_(player.finalScoreDamageToBoss, ""),
    finalScorePosition: firstValue_(player.finalScorePosition, ""),
    finalBattleForce: firstValue_(player.finalBattleForce, ""),
    finalForceBreakdown: firstValue_(player.finalForceBreakdown, ""),
    finalScoreBreakdown: firstValue_(player.finalScoreBreakdown, ""),
    finalScoreJson: firstValue_(player.finalScoreJson, ""),
    finalForceJson: firstValue_(player.finalForceJson, ""),
    runId: firstValue_(player.autoRunId, ""),
    runIndex: firstValue_(player.autoRunIndex, ""),
    seed: firstValue_(player.autoSeed, ""),
    status: firstValue_(player.autoStatus, ""),
  };
}

function buildLegacyGameRecord_(row, numericGameId, savedAt) {
  return {
    ID: numericGameId,
    Дата: dateOnly_(savedAt),
    Время: timeFraction_(savedAt),
    elapsedMs: row[2],
    finished: row[3],
    board: row[4],
    playerCount: row[5],
    botCount: row[6],
    diceCount: row[7],
    botSpeed: row[9],
    tadamPlayed: row[10],
    round: row[11],
    turns: row[12],
    finalOutcome: row[13],
    finalOutcomeText: row[14],
    finalWinnerName: row[15],
    finalWinnerRole: row[16],
    finalWinnerRoleId: row[17],
    finalWinnerScore: row[18],
    finalPlayersForce: row[19],
    finalBossForce: row[20],
    finalBossWon: row[21],
    finalSummaryJson: row[22],
  };
}

function buildLegacyPlayerRecord_(row, numericGameId, savedAt) {
  return {
    "ID партии": numericGameId,
    Дата: dateOnly_(savedAt),
    Время: timeFraction_(savedAt),
    playerId: row[1],
    name: row[2],
    bot: row[3],
    coins: row[4],
    position: row[5],
    turns: row[6],
    cellsPassed: row[7],
    coinsEarned: row[8],
    coinsSpent: row[9],
    maxShopCards: row[10],
    shopCardsLeft: row[11],
    effectsReceived: row[12],
    maxDiceThrown: row[13],
    finalStrength: row[14],
    finalSteps: row[15],
    fieldVisitsJson: row[16],
    monsterBattlesJson: row[17],
    itemsJson: row[18],
    finalRole: row[19],
    finalRoleId: row[20],
    finalWinner: row[21],
    finalScoreTotal: row[22],
    finalScoreCoins: row[23],
    finalScoreShop: row[24],
    finalScoreDamage: row[25],
    finalScoreDamageToBoss: row[26],
    finalScorePosition: row[27],
    finalBattleForce: row[28],
    finalForceBreakdown: row[29],
    finalScoreBreakdown: row[30],
    finalScoreJson: row[31],
    finalForceJson: row[32],
  };
}

function findLegacyAutorunRows_(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 2 || lastColumn < 1) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
  const rows = [];
  values.forEach((row, index) => {
    const firstCell = String(row[0] || "");
    if (firstCell.indexOf("game-") === 0) {
      rows.push({ rowNumber: index + 2, values: row });
    }
  });
  return rows;
}

function deleteRowsBottomUp_(sheet, rowNumbers) {
  const sorted = rowNumbers.slice().sort((a, b) => b - a);
  sorted.forEach((rowNumber) => sheet.deleteRow(rowNumber));
}

function nextNumericGameId_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 1;
  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const maxId = values.reduce((max, row) => {
    const value = Number(row[0]);
    return Number.isFinite(value) && value > max ? value : max;
  }, 0);
  return maxId + 1;
}

function dateFromPayload_(payload) {
  return parseDate_(payload.savedAt || (payload.game && payload.game.savedAt)) || new Date();
}

function legacySavedAtFromGameRow_(row) {
  return parseDate_(row[1]) || legacySavedAtFromId_(row[0]) || new Date();
}

function legacySavedAtFromId_(id) {
  const match = String(id || "").match(/^game-(\d{4}-\d{2}-\d{2}T[0-9:.]+Z)/);
  return match ? parseDate_(match[1]) : null;
}

function parseDate_(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (value === undefined || value === null || value === "") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dateOnly_(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function timeFraction_(date) {
  return (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) / 86400;
}

function firstValue_() {
  for (let index = 0; index < arguments.length; index += 1) {
    const value = arguments[index];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return "";
}

function countBots_(players) {
  return players.reduce((total, player) => total + (player && player.bot ? 1 : 0), 0);
}
