// Patch for the live Games Log Apps Script save endpoint.
// Target spreadsheet: 1uC1xUk52IbpHfm9tNtHT2_cmFSNQIKCkct88TsqmmV8
//
// Use this mapping in the deployed Web App doPost handler instead of the old
// A:N / A:S-only append mapping. It preserves the existing basic columns and
// appends the final History fields already sent by src/game.js payload v2.

const GAMES_LOG_SPREADSHEET_ID = "1uC1xUk52IbpHfm9tNtHT2_cmFSNQIKCkct88TsqmmV8";

const GAMES_HEADERS = [
  "id",
  "savedAt",
  "elapsedMs",
  "finished",
  "board",
  "playerCount",
  "botCount",
  "diceCount",
  "passThroughMode",
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

const PLAYERS_HEADERS = [
  "gameId",
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
  const payload = JSON.parse(e.postData.contents || "{}");
  const spreadsheet = SpreadsheetApp.openById(GAMES_LOG_SPREADSHEET_ID);
  const gamesSheet = spreadsheet.getSheetByName("Games");
  const playersSheet = spreadsheet.getSheetByName("Players");

  gamesSheet.appendRow(GAMES_HEADERS.map((header) => gameLogValue(payload, header)));
  (payload.players || []).forEach((player) => {
    playersSheet.appendRow(PLAYERS_HEADERS.map((header) => playerLogValue(payload, player, header)));
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, gameId: payload.id }))
    .setMimeType(ContentService.MimeType.JSON);
}

function gameLogValue(payload, header) {
  const game = payload.game || {};
  const settings = payload.settings || {};
  const currentSettings = settings.current || {};
  const startedSettings = settings.startedWith || {};
  const sheetGame = (payload.sheetExport && payload.sheetExport.game) || {};
  const players = payload.players || [];
  const history = payload.history || {};

  const values = {
    id: payload.id || "",
    savedAt: payload.savedAt || "",
    elapsedMs: game.elapsedMs ?? "",
    finished: game.finished ?? "",
    board: game.activeBoard || currentSettings.board || startedSettings.board || "",
    playerCount: currentSettings.playerCount ?? startedSettings.playerCount ?? players.length,
    botCount: currentSettings.botCount ?? startedSettings.botCount ?? players.filter((player) => player.bot).length,
    diceCount: currentSettings.diceCount ?? startedSettings.diceCount ?? "",
    passThroughMode: currentSettings.passThroughMode ?? startedSettings.passThroughMode ?? "",
    botSpeed: currentSettings.botSpeed ?? startedSettings.botSpeed ?? "",
    tadamPlayed: history.tadamPlayed ?? "",
    round: game.round ?? "",
    turns: game.turns ?? "",
    Minutes: game.elapsedMs !== undefined ? Number(game.elapsedMs) / 60000 : "",
  };

  return valueOrBlank(values[header] ?? game[header] ?? sheetGame[header]);
}

function playerLogValue(payload, player, header) {
  const history = playerHistory(payload, player);
  const sheetPlayer = sheetPlayerExport(payload, player);
  const values = {
    gameId: payload.id || "",
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
  };

  return valueOrBlank(values[header] ?? player[header] ?? sheetPlayer[header]);
}

function playerHistory(payload, player) {
  const playersHistory = (payload.history && payload.history.players) || {};
  return playersHistory[String(player.id)] || playersHistory[player.id] || {};
}

function sheetPlayerExport(payload, player) {
  const sheetPlayers = (payload.sheetExport && payload.sheetExport.players) || [];
  return sheetPlayers.find((item) => String(item.playerId) === String(player.id)) || {};
}

function valueOrBlank(value) {
  if (value === undefined || value === null) return "";
  return typeof value === "object" ? JSON.stringify(value) : value;
}
