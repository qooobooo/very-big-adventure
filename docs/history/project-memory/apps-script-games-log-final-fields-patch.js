// Patch for the live Games Log Apps Script save endpoint.
// Target spreadsheet: 1uC1xUk52IbpHfm9tNtHT2_cmFSNQIKCkct88TsqmmV8
//
// Replace the deployed Web App doPost handler with this version, then deploy
// a new Web App version. It reads the live header rows and writes values by
// header name, so the final columns keep working after column insert/delete
// changes such as ID/Дата/Время/Длительность and removed passThroughMode.

const GAMES_LOG_SPREADSHEET_ID = "1uC1xUk52IbpHfm9tNtHT2_cmFSNQIKCkct88TsqmmV8";

function doPost(e) {
  const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  const spreadsheet = SpreadsheetApp.openById(GAMES_LOG_SPREADSHEET_ID);
  const gamesSheet = spreadsheet.getSheetByName("Games");
  const playersSheet = spreadsheet.getSheetByName("Players");
  const savedAt = parseSavedAt(payload);
  const gameRecordId = nextNumericId(gamesSheet);

  appendMappedRow(gamesSheet, (header) => gameLogValue(payload, header, { gameRecordId, savedAt }));
  (payload.players || []).forEach((player) => {
    appendMappedRow(playersSheet, (header) => playerLogValue(payload, player, header, { gameRecordId, savedAt }));
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, gameId: payload.id, rowId: gameRecordId }))
    .setMimeType(ContentService.MimeType.JSON);
}

function appendMappedRow(sheet, valueForHeader) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map((header) => valueForHeader(String(header || "").trim())));
}

function gameLogValue(payload, header, context) {
  const game = payload.game || {};
  const settings = payload.settings || {};
  const currentSettings = settings.current || {};
  const startedSettings = settings.startedWith || {};
  const sheetGame = (payload.sheetExport && payload.sheetExport.game) || {};
  const players = payload.players || [];
  const history = payload.history || {};

  const values = {
    ID: context.gameRecordId,
    id: payload.id || "",
    savedAt: payload.savedAt || "",
    "Дата": context.savedAt,
    "Время": context.savedAt,
    elapsedMs: game.elapsedMs ?? "",
    "Длительность": "",
    finished: game.finished ?? "",
    board: game.activeBoard || currentSettings.board || startedSettings.board || "",
    playerCount: currentSettings.playerCount ?? startedSettings.playerCount ?? players.length,
    botCount: currentSettings.botCount ?? startedSettings.botCount ?? players.filter((player) => player.bot).length,
    diceCount: currentSettings.diceCount ?? startedSettings.diceCount ?? "",
    botSpeed: currentSettings.botSpeed ?? startedSettings.botSpeed ?? "",
    tadamPlayed: history.tadamPlayed ?? "",
    round: game.round ?? "",
    turns: game.turns ?? "",
    Minutes: game.elapsedMs !== undefined ? Number(game.elapsedMs) / 60000 : "",
    finalOutcome: firstValue(sheetGame.finalOutcome, game.finalOutcome),
    finalOutcomeText: firstValue(sheetGame.finalOutcomeText, game.finalOutcomeText),
    finalWinnerName: firstValue(sheetGame.finalWinnerName, game.finalWinnerName),
    finalWinnerRole: firstValue(sheetGame.finalWinnerRole, game.finalWinnerRole),
    finalWinnerRoleId: firstValue(sheetGame.finalWinnerRoleId, game.finalWinnerRoleId),
    finalWinnerScore: firstValue(sheetGame.finalWinnerScore, game.finalWinnerScore),
    finalPlayersForce: firstValue(sheetGame.finalPlayersForce, game.finalPlayersForce),
    finalBossForce: firstValue(sheetGame.finalBossForce, game.finalBossForce),
    finalBossWon: firstValue(sheetGame.finalBossWon, game.finalBossWon),
    finalSummaryJson: firstValue(sheetGame.finalSummaryJson, game.finalSummaryJson),
  };

  return valueOrBlank(values[header] ?? game[header] ?? sheetGame[header]);
}

function playerLogValue(payload, player, header, context) {
  const history = playerHistory(payload, player);
  const sheetPlayer = sheetPlayerExport(payload, player);
  const values = {
    "ID партии": context.gameRecordId,
    gameId: payload.id || "",
    "Дата": context.savedAt,
    "Время": context.savedAt,
    playerId: player.id ?? "",
    name: player.name || "",
    bot: player.bot ?? "",
    coins: player.coins ?? "",
    position: player.position ?? "",
    turns: history.turns ?? "",
    cellsPassed: history.cellsPassed ?? "",
    coinsEarned: history.coinsEarned ?? "",
    coinsSpent: history.coinsSpent ?? "",
    maxShopCards: history.maxShopCards ?? "",
    shopCardsLeft: Array.isArray(player.items) ? player.items.length : "",
    effectsReceived: history.effectsReceived ?? "",
    maxDiceThrown: history.maxDiceThrown ?? "",
    finalStrength: player.battleBonus ?? "",
    finalSteps: player.stepBonus ?? "",
    fieldVisitsJson: JSON.stringify(history.fieldVisits || {}),
    monsterBattlesJson: JSON.stringify(history.monsterBattles || {}),
    itemsJson: JSON.stringify(player.items || []),
    finalRole: firstValue(sheetPlayer.finalRole, player.finalRole),
    finalRoleId: firstValue(sheetPlayer.finalRoleId, player.finalRoleId),
    finalWinner: firstValue(sheetPlayer.finalWinner, player.finalWinner),
    finalScoreTotal: firstValue(sheetPlayer.finalScoreTotal, player.finalScoreTotal),
    finalScoreCoins: firstValue(sheetPlayer.finalScoreCoins, player.finalScoreCoins),
    finalScoreShop: firstValue(sheetPlayer.finalScoreShop, player.finalScoreShop),
    finalScoreDamage: firstValue(sheetPlayer.finalScoreDamage, player.finalScoreDamage),
    finalScoreDamageToBoss: firstValue(sheetPlayer.finalScoreDamageToBoss, player.finalScoreDamageToBoss),
    finalScorePosition: firstValue(sheetPlayer.finalScorePosition, player.finalScorePosition),
    finalBattleForce: firstValue(sheetPlayer.finalBattleForce, player.finalBattleForce),
    finalForceBreakdown: firstValue(sheetPlayer.finalForceBreakdown, player.finalForceBreakdown),
    finalScoreBreakdown: firstValue(sheetPlayer.finalScoreBreakdown, player.finalScoreBreakdown),
    finalScoreJson: firstValue(sheetPlayer.finalScoreJson, player.finalScoreJson),
    finalForceJson: firstValue(sheetPlayer.finalForceJson, player.finalForceJson),
  };

  return valueOrBlank(values[header] ?? player[header] ?? sheetPlayer[header]);
}

function nextNumericId(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 1;
  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
  const maxId = values.reduce((max, value) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? Math.max(max, numeric) : max;
  }, 0);
  return maxId + 1;
}

function parseSavedAt(payload) {
  const savedAt = payload.savedAt ? new Date(payload.savedAt) : new Date();
  return Number.isNaN(savedAt.getTime()) ? new Date() : savedAt;
}

function playerHistory(payload, player) {
  const playersHistory = (payload.history && payload.history.players) || {};
  return playersHistory[String(player.id)] || playersHistory[player.id] || {};
}

function sheetPlayerExport(payload, player) {
  const sheetPlayers = (payload.sheetExport && payload.sheetExport.players) || [];
  return sheetPlayers.find((item) => String(item.playerId) === String(player.id)) || {};
}

function firstValue(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return "";
}

function valueOrBlank(value) {
  if (value === undefined || value === null) return "";
  return typeof value === "object" && !(value instanceof Date) ? JSON.stringify(value) : value;
}
