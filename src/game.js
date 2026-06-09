import { cardConfig } from "./cards.config.js?v=20260609-0407";
import { boardDoorConfigs, doorConfigs } from "./game.config.js?v=20260531-0271";

const boardEl = document.querySelector("#board");
const scoreStripEl = document.querySelector("#scoreStrip");
const gameLogEl = document.querySelector("#gameLog");
const gameHistoryEl = document.querySelector("#gameHistory");
const tadamTableEl = document.querySelector("#tadamTable");
const appShellEl = document.querySelector(".app-shell");
const playAreaEl = document.querySelector(".play-area");
const sidePanelEl = document.querySelector(".side-panel");
const wideLayoutQuery = window.matchMedia("(min-width: 1200px)");
const phoneLayoutQuery = window.matchMedia("(max-width: 680px) and (hover: none) and (pointer: coarse)");
const savedGamesStorageKey = "very-big-adventure.saved-games";
const googleSheetsSaveUrl = "https://script.google.com/macros/s/AKfycbxNXmGjR9w3U0vmUd9xS5Rc2KHwR8Q7ViB5Pcl70qIOEhwIJp_M_1faO7RvpDtuPLqkdQ/exec";
const defaultUiStyle = "classic";
const uiStyleValues = new Set(["tabletop", "classic"]);
const defaultPhoneRoomMode = "big-button";
const phoneRoomModeValues = new Set(["full", "big-button"]);

const ui = {
  activePlayerName: document.querySelector("#activePlayerName"),
  activePlayerRole: document.querySelector("#activePlayerRole"),
  autoRevealCards: document.querySelector("#autoRevealCards"),
  botCount: document.querySelector("#botCount"),
  botSpeed: document.querySelector("#botSpeed"),
  boardSelect: document.querySelector("#boardSelect"),
  choicePanel: document.querySelector("#choicePanel"),
  copyPhoneRoomUrlBtn: document.querySelector("#copyPhoneRoomUrlBtn"),
  createPhoneRoomBtn: document.querySelector("#createPhoneRoomBtn"),
  diceCount: document.querySelector("#diceCount"),
  diceValue: document.querySelector("#diceValue"),
  eventToast: document.querySelector("#eventToast"),
  exactMoveAmount: document.querySelector("#exactMoveAmount"),
  exactMoveBtn: document.querySelector("#exactMoveBtn"),
  finalBattleHud: document.querySelector("#finalBattleHud"),
  fieldEffect: document.querySelector("#fieldEffect"),
  fullscreenBtn: document.querySelector("#fullscreenBtn"),
  logToggle: document.querySelector("#logToggle"),
  modifierPlayerStatus: document.querySelector("#modifierPlayerStatus"),
  monsterRageIndicator: document.querySelector("#monsterRageIndicator"),
  passThroughMode: document.querySelector("#passThroughMode"),
  newGameBtn: document.querySelector("#newGameBtn"),
  phoneRoomCode: document.querySelector("#phoneRoomCode"),
  phoneRoomControllers: document.querySelector("#phoneRoomControllers"),
  phoneRoomDetails: document.querySelector("#phoneRoomDetails"),
  phoneRoomDice: document.querySelector("#phoneRoomDice"),
  phoneRoomMode: document.querySelector("#phoneRoomMode"),
  phoneRoomShake: document.querySelector("#phoneRoomShake"),
  phoneRoomStatus: document.querySelector("#phoneRoomStatus"),
  phoneRoomUrl: document.querySelector("#phoneRoomUrl"),
  phoneRoomUrlHint: document.querySelector("#phoneRoomUrlHint"),
  playerCount: document.querySelector("#playerCount"),
  rollBtn: document.querySelector("#rollBtn"),
  roundTitle: document.querySelector("#roundTitle"),
  saveHistoryBtn: document.querySelector("#saveHistoryBtn"),
  settingsPanel: document.querySelector("#settingsPanel"),
  settingsToggle: document.querySelector("#settingsToggle"),
  showWalkPath: document.querySelector("#showWalkPath"),
  turnActions: document.querySelector("#turnActions"),
  uiStyle: document.querySelector("#uiStyle"),
  usePhoneControllers: document.querySelector("#usePhoneControllers"),
  winnerPopup: document.querySelector("#winnerPopup"),
};

const boardConfigs = {
  field1: {
    id: "field1",
    cols: 10,
    rows: 10,
    startCell: "0-9",
    finishCell: "9-0",
    layout: [
      ["red", "shop", "bad", null, "red", "good", "bad", null, "bad", "enemy"],
      ["green", null, "red", null, "red", null, "bad", "bad", "bad", null],
      ["dice-fortune", null, "tadam", "enemy", "red", null, null, null, null, null],
      ["bad", null, null, null, null, null, null, "good", "vs", "bad"],
      ["good", null, "shop", "pay-double", "red", "good", "green", "red", null, "tadam"],
      ["green", null, "green", null, null, null, null, null, null, "green"],
      ["red", null, "bad", null, "good", "shop", "tadam", null, null, "green"],
      ["good", "enemy", "tadam", null, "tadam", null, "good", null, "good", "tadam"],
      [null, null, null, null, "green", null, "green", null, "green", null],
      ["start", "good", "green", "green", "good", null, "good", "enemy", "green", null],
    ],
    route: [
      "0-9",
      "1-9",
      "2-9",
      "3-9",
      "4-9",
      "4-8",
      "4-7",
      "4-6",
      "5-6",
      "6-6",
      "6-7",
      "6-8",
      "6-9",
      "7-9",
      "8-9",
      "8-8",
      "8-7",
      "9-7",
      "9-6",
      "9-5",
      "9-4",
      "9-3",
      "8-3",
      "7-3",
      "7-4",
      "6-4",
      "5-4",
      "4-4",
      "3-4",
      "2-4",
      "2-5",
      "2-6",
      "2-7",
      "1-7",
      "0-7",
      "0-6",
      "0-5",
      "0-4",
      "0-3",
      "0-2",
      "0-1",
      "0-0",
      "1-0",
      "2-0",
      "2-1",
      "2-2",
      "3-2",
      "4-2",
      "4-1",
      "4-0",
      "5-0",
      "6-0",
      "6-1",
      "7-1",
      "8-1",
      "8-0",
      "9-0",
    ],
  },
  field2: {
    id: "field2",
    cols: 15,
    rows: 15,
    startCell: "0-14",
    finishCell: "10-6",
    pathCells: [
      "0-0", "1-0", "2-0", "4-0", "5-0", "6-0", "12-0", "13-0", "14-0",
      "0-1", "2-1", "4-1", "6-1", "12-1", "14-1",
      "0-2", "2-2", "4-2", "6-2", "7-2", "8-2", "9-2", "10-2", "11-2", "12-2", "14-2",
      "0-3", "2-3", "4-3", "14-3",
      "0-4", "2-4", "3-4", "4-4", "8-4", "9-4", "10-4", "11-4", "12-4", "14-4",
      "0-5", "8-5", "12-5", "14-5",
      "0-6", "1-6", "2-6", "3-6", "4-6", "5-6", "6-6", "8-6", "10-6", "12-6", "14-6",
      "6-7", "8-7", "9-7", "10-7", "12-7", "13-7", "14-7",
      "0-8", "1-8", "2-8", "3-8", "4-8", "5-8", "6-8",
      "0-9", "8-9", "9-9", "10-9", "11-9", "12-9", "13-9", "14-9",
      "0-10", "1-10", "2-10", "3-10", "4-10", "5-10", "6-10", "7-10", "8-10", "14-10",
      "10-11", "11-11", "12-11", "14-11",
      "6-12", "7-12", "8-12", "10-12", "12-12", "14-12",
      "6-13", "8-13", "10-13", "12-13", "14-13",
      "0-14", "1-14", "2-14", "3-14", "4-14", "5-14", "6-14", "8-14", "9-14", "10-14", "12-14", "13-14", "14-14",
    ],
    events: {
      "0-14": "start",
      "0-0": "very-bad",
      "0-1": "good",
      "0-2": "green",
      "0-3": "big-rest",
      "0-4": "green",
      "0-5": "good",
      "0-6": "bad",
      "0-8": "good",
      "0-9": "vs",
      "0-10": "tadam",
      "1-0": "enemy",
      "1-6": "red",
      "1-8": "red",
      "1-10": "green",
      "1-14": "good",
      "2-0": "tadam",
      "2-1": "good",
      "2-2": "red",
      "2-3": "red",
      "2-4": "bad",
      "2-6": "black-market",
      "2-8": "chaos-portal",
      "2-10": "event",
      "2-14": "green",
      "3-4": "event",
      "3-6": "red",
      "3-8": "red",
      "3-10": "green",
      "3-14": "good",
      "4-0": "green",
      "4-1": "green",
      "4-2": "red",
      "4-3": "red",
      "4-4": "bad",
      "4-6": "bad",
      "4-8": "tadam",
      "4-10": "good",
      "4-14": "good",
      "5-0": "shop",
      "5-6": "event",
      "5-8": "green",
      "5-10": "red",
      "5-14": "green",
      "6-0": "green",
      "6-1": "green",
      "6-2": "event",
      "6-6": "green",
      "6-7": "shop",
      "6-8": "green",
      "6-10": "red",
      "6-12": "green",
      "6-13": "tadam",
      "6-14": "good",
      "7-2": "red",
      "7-10": "bad",
      "7-12": "shop",
      "8-2": "green",
      "8-4": "bad",
      "8-5": "bad",
      "8-6": "bad",
      "8-7": "very-bad",
      "8-9": "enemy",
      "9-14": "enemy",
      "8-10": "bad",
      "8-12": "green",
      "8-13": "event",
      "8-14": "good",
      "9-2": "dice-fortune",
      "9-4": "bad",
      "9-7": "very-bad",
      "9-9": "big-rest",
      "10-2": "green",
      "10-4": "event",
      "10-6": "enemy",
      "10-7": "very-bad",
      "10-9": "event",
      "10-11": "red",
      "10-12": "event",
      "10-13": "red",
      "10-14": "tadam",
      "11-2": "red",
      "11-4": "bad",
      "11-9": "joe-game",
      "11-11": "pay-double",
      "12-0": "good",
      "12-1": "good",
      "12-2": "good",
      "12-4": "bad",
      "12-5": "bad",
      "12-6": "bad",
      "12-7": "bad",
      "12-9": "good",
      "12-11": "tadam",
      "12-12": "bad",
      "12-13": "green",
      "12-14": "green",
      "13-0": "joe-auction",
      "13-7": "chaos-portal",
      "13-9": "good",
      "13-14": "shop",
      "14-0": "tadam",
      "14-1": "red",
      "14-2": "red",
      "14-3": "red",
      "14-4": "big-rest",
      "14-5": "red",
      "14-6": "red",
      "14-7": "red",
      "14-9": "tadam",
      "14-10": "red",
      "14-11": "red",
      "14-12": "good",
      "14-13": "tadam",
      "14-14": "green",
    },
    route: [
      "0-14", "1-14", "2-14", "3-14", "4-14", "5-14", "6-14", "6-13", "6-12", "7-12", "8-12", "8-13", "8-14", "9-14", "10-14", "10-13", "10-12", "10-11", "11-11", "12-11", "12-12", "12-13", "12-14", "13-14", "14-14", "14-13", "14-12", "14-11", "14-10", "14-9", "13-9", "12-9", "11-9", "10-9", "9-9", "8-9", "8-10", "7-10", "6-10", "5-10", "4-10", "3-10", "2-10", "1-10", "0-10", "0-9", "0-8", "1-8", "2-8", "3-8", "4-8", "5-8", "6-8", "6-7", "6-6", "5-6", "4-6", "3-6", "2-6", "1-6", "0-6", "0-5", "0-4", "0-3", "0-2", "0-1", "0-0", "1-0", "2-0", "2-1", "2-2", "2-3", "2-4", "3-4", "4-4", "4-3", "4-2", "4-1", "4-0", "5-0", "6-0", "6-1", "6-2", "7-2", "8-2", "9-2", "10-2", "11-2", "12-2", "12-1", "12-0", "13-0", "14-0", "14-1", "14-2", "14-3", "14-4", "14-5", "14-6", "14-7", "13-7", "12-7", "12-6", "12-5", "12-4", "11-4", "10-4", "9-4", "8-4", "8-5", "8-6", "8-7", "9-7", "10-7", "10-6",
    ],
  },
};

let activeBoardConfig;
let boardCols;
let boardRows;
let startCell;
let finishCell;
let boardLayout;
let routePath;
let fieldCells;
let routeCells;
let routeIndex;
let routeNext;
let cellEvents;

const eventToastVisibleMs = 3000;
const eventToastFadeMs = 800;
const eventToastQuickFadeMs = 140;
const humanRollCooldownMs = 650;
const blackMarketShopCost = 5;
const blackMarketTrainingCost = 10;
const blackMarketRageCost = 15;
const blackMarketRageBonus = 10;
const diceFortuneDiceCount = 6;
const diceFortuneCoinReward = 10;
const diceFortuneBackwardStepPenalty = 10;
const coinIconSrc = "./assets/icons/coin.png?v=20260524-0155";
const diceIconSrc = "./assets/icons/dice.png?v=20260524-0305";
const enemyIconSrc = "./assets/icons/enemy_512.png";
const magicWalletIconSrc = "./assets/icons/artifact_magic_wallet_512.png";
const finalEnemyIconSrc = "./assets/icons/final_enemy.png?v=20260525-0146";
const blackMarketIconSrc = "./assets/icons/black_market_ultra_simple_512.png?v=20260609-0409";
const chaosPortalIconSrc = "./assets/icons/chaos_portal_1254.png?v=20260601-0276";
const eventIconSrc = "./assets/icons/event_quest_512.png";
const joeAuctionIconSrc = "./assets/icons/joe_auction_512.png?v=20260609-0401";
const portalIconSrc = "./assets/icons/portal_1254.png?v=20260530-0222";
const vsIconSrc = "./assets/icons/vs_1254.png?v=20260531-0233";
const eventIcons = {
  bad: '<img class="tile-icon-image tile-icon-bad" src="./assets/icons/bad_tight.png" alt="Плохо">',
  "very-bad": '<img class="tile-icon-image tile-icon-very-bad" src="./assets/icons/very_bad_512.png?v=20260609-0412" alt="Очень Плохо">',
  "big-rest": '<img class="tile-icon-image tile-icon-big-rest" src="./assets/icons/big_rest_fire_512.png" alt="Большой привал">',
  "black-market": `<img class="tile-icon-image tile-icon-black-market" src="${blackMarketIconSrc}" alt="Черный рынок">`,
  "chaos-portal": `<img class="tile-icon-image tile-icon-chaos-portal" src="${chaosPortalIconSrc}" alt="Портал хаоса">`,
  enemy: '<img class="tile-icon-image tile-icon-enemy" src="./assets/icons/enemy_512.png" alt="Враг">',
  event: `<img class="tile-icon-image tile-icon-event" src="${eventIconSrc}" alt="Событие">`,
  good: '<img class="tile-icon-image tile-icon-good" src="./assets/icons/good_512.png" alt="Хорошо">',
  green: "",
  "joe-game": '<img class="tile-icon-image tile-icon-joe-game" src="./assets/icons/joe_game_512.png?v=20260609-0400" alt="Игра Джо">',
  red: "",
  "dice-fortune": '<img class="tile-icon-image tile-icon-dice-fortune" src="./assets/tiles/dice_fortune_1254.png?v=20260521-0035" alt="Кубик удачи">',
  "pay-double": '<img class="tile-icon-image tile-icon-pay-double" src="./assets/tiles/pay_double_1024.png?v=20260521-1205" alt="Удвой монеты">',
  "joe-auction": `<img class="tile-icon-image tile-icon-joe-auction" src="${joeAuctionIconSrc}" alt="Аукцион Джо">`,
  shop: '<img class="tile-icon-image tile-icon-shop" src="./assets/icons/joes_shop_512.png" alt="Лавка Джо">',
  tadam: '<img class="tile-icon-image tile-icon-tadam" src="./assets/icons/tadam_512.png" alt="ТАДАМ!">',
  vs: `<img class="tile-icon-image tile-icon-vs" src="${vsIconSrc}" alt="VS">`,
};

const tileIcons = {
  finish: '<img class="tile-icon-image tile-icon-finish" src="./assets/icons/finish_512.png" alt="Финиш">',
  start: '<img class="tile-icon-image tile-icon-start" src="./assets/icons/start_512.png" alt="Старт">',
};

applyUiStyle();
applyBoardConfig(ui.boardSelect?.value || "field2");

const shopCards = expandDeck(cardConfig.shop);
const finiteDeckIds = ["good", "bad", "tadam", "event", "shop"];

const names = [
  { name: "Пес", color: "#8b1713", token: "./assets/player-tokens/dog.png?v=20260520-0310" },
  { name: "Кот", color: "#4b1a78", token: "./assets/player-tokens/cat.png?v=20260520-0310" },
  { name: "Выдра", color: "#0b748b", token: "./assets/player-tokens/otter.png?v=20260520-0310" },
  { name: "Альпака", color: "#d56b00", token: "./assets/player-tokens/alpaca.png?v=20260520-0310" },
];

const historyFieldLabels = {
  bad: "Плохо",
  "very-bad": "Очень Плохо",
  "big-rest": "Большой привал",
  "black-market": "Черный рынок",
  "chaos-portal": "Портал хаоса",
  "dice-fortune": "Кубик удачи",
  enemy: "Враг",
  event: "Событие",
  finish: "Финиш",
  good: "Хорошо",
  green: "Зеленое",
  "joe-auction": "Аукцион Джо",
  "joe-game": "Игра Джо",
  "pay-double": "Удвой свои монеты",
  path: "Обычное",
  red: "Красное",
  shop: "Лавка Джо",
  start: "Старт",
  tadam: "ТАДАМ",
  vs: "VS",
};

let state;
const phoneRoom = {
  code: null,
  controllers: [],
  eventSource: null,
  hostId: null,
  inFlight: false,
  joinUrl: "",
  lanUrls: [],
  localJoinUrl: "",
  lastSnapshotJson: "",
  diceVisible: false,
  mode: defaultPhoneRoomMode,
  shakeEnabled: false,
  snapshotTimer: null,
};
let actionPromptResolver = null;
let actionPromptButtonLabel = "Далее";
let actionPromptAutoPlayerId = null;
let actionPromptChoiceOptions = [];
let actionPromptChoiceResolver = null;
let actionPromptRollContext = null;
let botActionTimer = null;
const botShopOfferChoices = new WeakMap();
let eventToastFadeTimer = null;
let eventToastHideTimer = null;
let logExpanded = false;
let movementActionInProgress = false;
let humanRollCooldownUntil = 0;
let phoneRoomCopyTimer = null;
let phoneDiceRollClearTimer = null;

function applyBoardConfig(boardId) {
  const config = boardConfigs[boardId] || boardConfigs.field2;
  activeBoardConfig = {
    ...config,
    doors: boardDoorConfigs[config.id] || doorConfigs,
  };
  boardCols = config.cols;
  boardRows = config.rows;
  startCell = config.startCell;
  finishCell = config.finishCell;
  boardLayout = config.layout || buildBoardLayout(config);
  routePath = config.route;
  fieldCells = buildFieldCells();
  routeCells = buildRouteCells();
  routeIndex = buildRouteIndex(routeCells);
  routeNext = buildRouteNext(routePath);
  cellEvents = buildCellEvents();
}

function selectedUiStyle() {
  const value = ui.uiStyle?.value || document.body?.dataset.uiStyle || defaultUiStyle;
  return uiStyleValues.has(value) ? value : defaultUiStyle;
}

function selectedPhoneRoomMode() {
  const value = ui.phoneRoomMode?.value || phoneRoom.mode || defaultPhoneRoomMode;
  return normalizePhoneRoomMode(value);
}

function normalizePhoneRoomMode(value) {
  return phoneRoomModeValues.has(value) ? value : defaultPhoneRoomMode;
}

function phoneRoomShakeEnabled() {
  return Boolean(ui.phoneRoomShake?.checked);
}

function phoneRoomDiceVisible() {
  return Boolean(ui.phoneRoomDice?.checked);
}

function applyUiStyle() {
  if (document.body) document.body.dataset.uiStyle = selectedUiStyle();
  syncSettingsToggleLabel();
  syncWideScoreStripPlacement();
}

function syncSettingsToggleLabel() {
  if (!ui.settingsToggle) return;
  ui.settingsToggle.textContent = phoneLayoutQuery.matches ? "Настр." : "Настройки";
  ui.settingsToggle.setAttribute("aria-label", "Настройки");
}

function fullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

function fullscreenTarget() {
  return appShellEl || document.documentElement;
}

function fullscreenSupported() {
  const target = fullscreenTarget();
  return Boolean(target?.requestFullscreen || target?.webkitRequestFullscreen);
}

function syncFullscreenButton() {
  const active = Boolean(fullscreenElement());
  document.body?.classList.toggle("is-game-fullscreen", active);
  if (!ui.fullscreenBtn) return;
  ui.fullscreenBtn.disabled = !fullscreenSupported();
  ui.fullscreenBtn.title = active ? "Выйти из полноэкранного режима" : "Открыть игру на весь экран";
  ui.fullscreenBtn.setAttribute("aria-label", active ? "Выйти из полноэкранного режима" : "На весь экран");
  ui.fullscreenBtn.classList.toggle("active", active);
  ui.fullscreenBtn.setAttribute("aria-pressed", String(active));
}

async function toggleFullscreen() {
  if (!fullscreenSupported()) {
    log("Браузер не поддерживает полноэкранный режим.", { toast: true });
    syncFullscreenButton();
    return;
  }

  try {
    if (fullscreenElement()) {
      const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
      await exitFullscreen?.call(document);
    } else {
      const target = fullscreenTarget();
      const requestFullscreen = target.requestFullscreen || target.webkitRequestFullscreen;
      await requestFullscreen.call(target);
    }
  } catch {
    log("Не удалось включить полноэкранный режим.", { toast: true });
  } finally {
    syncFullscreenButton();
  }
}

function newGame() {
  applyUiStyle();
  syncFullscreenButton();
  syncBotCountOptions();
  actionPromptResolver = null;
  actionPromptButtonLabel = "Далее";
  actionPromptAutoPlayerId = null;
  actionPromptChoiceOptions = [];
  actionPromptChoiceResolver = null;
  actionPromptRollContext = null;
  window.clearTimeout(botActionTimer);
  botActionTimer = null;
  movementActionInProgress = false;
  humanRollCooldownUntil = 0;
  applyBoardConfig(ui.boardSelect?.value || "field2");
  const playerCount = Number(ui.playerCount.value);
  const botCount = selectedBotCount(playerCount);
  const doors = {};
  for (const door of activeBoardConfig.doors) {
    doors[door.id] = { ...door, openedBy: [] };
  }

  state = {
    activePlayer: 0,
    choiceResolver: null,
    dice: null,
    decks: buildDeckState(),
    doors,
    enemyBattleProgress: null,
    eventMonsterRage: 0,
    eventDepth: 0,
    finalBattle: null,
    finalBattleProgress: null,
    finished: false,
    gameSettings: collectGameSettings(),
    botTurnPlayerId: null,
    isAnimating: false,
    landingCell: null,
    modifierPlayerId: 0,
    movingPlayerId: null,
    extraTurnPlayerId: null,
    cardChoiceResolver: null,
    pendingCardChoice: null,
    pendingChoice: null,
    phoneCardPreview: null,
    phoneDiceRoll: null,
    pendingPreRoll: null,
    pendingShop: null,
    preRollResolver: null,
    players: names.slice(0, playerCount).map((hero, index) => ({
      ...hero,
      battleBonus: 0,
      bot: index >= playerCount - botCount,
      coins: 10,
      diceBonus: 0,
      id: index,
      items: [],
      nextMonsterBattleBonus: 0,
      nextBadExtraDrawCards: [],
      nextBattlePenaltyCards: [],
      position: startCell,
      stepBonus: 0,
    })),
    round: 1,
    tadams: [],
    artifacts: {
      magicWalletOwnerId: null,
    },
    turns: 0,
    unityBattleProgress: null,
    vsBattleProgress: null,
    walkPath: [],
  };
  state.history = createGameHistory(state.players);

  boardEl.dataset.ready = "false";
  boardEl.dataset.boardId = activeBoardConfig.id;
  boardEl.style.setProperty("--board-cols", String(boardCols));
  boardEl.style.setProperty("--board-rows", String(boardRows));
  log("<strong>Игра началась.</strong> Побеждайте врагов, чтобы открывать двери.");
  render();
}

function createGameHistory(players) {
  return {
    finalSummary: null,
    finishedAt: null,
    startedAt: Date.now(),
    tadamPlayed: 0,
    players: Object.fromEntries(players.map((player) => [player.id, createPlayerHistory()])),
  };
}

function collectGameSettings() {
  const playerCount = Number(ui.playerCount?.value) || 0;
  return {
    autoRevealCards: Boolean(ui.autoRevealCards?.checked),
    board: ui.boardSelect?.value || "field2",
    botCount: selectedBotCount(playerCount),
    botSpeed: ui.botSpeed?.value || "standard",
    diceCount: Number(ui.diceCount?.value) || 1,
    exactMoveAmount: exactMoveControlAmount(),
    passThroughMode: passThroughMode(),
    playerCount,
    showWalkPath: Boolean(ui.showWalkPath?.checked),
    uiStyle: selectedUiStyle(),
  };
}

function createPlayerHistory() {
  return {
    cellsPassed: 0,
    coinsEarned: 0,
    coinsSpent: 0,
    effectsReceived: 0,
    fieldVisits: {},
    maxDiceThrown: 0,
    maxShopCards: 0,
    monsterBattles: {},
    turns: 0,
  };
}

function playerHistory(player) {
  if (!state?.history || !player) return null;
  if (!state.history.players[player.id]) state.history.players[player.id] = createPlayerHistory();
  return state.history.players[player.id];
}

function recordTurnStarted(player) {
  const history = playerHistory(player);
  if (history) history.turns += 1;
}

function recordPlayerMoved(player, cell = player?.position) {
  const history = playerHistory(player);
  if (!history || !cell) return;
  history.cellsPassed += 1;
}

function recordPlayerStopped(player, cell = player?.position) {
  const history = playerHistory(player);
  if (!history || !cell) return;
  const fieldType = tileType(cell);
  const label = historyFieldLabels[fieldType] || fieldType || "Поле";
  history.fieldVisits[label] = (history.fieldVisits[label] || 0) + 1;
}

function recordCoinDelta(player, delta) {
  const history = playerHistory(player);
  if (!history || !delta) return;
  if (delta > 0) history.coinsEarned += delta;
  else history.coinsSpent += Math.abs(delta);
}

function recordShopCards(player) {
  const history = playerHistory(player);
  if (!history) return;
  history.maxShopCards = Math.max(history.maxShopCards, player.items.length);
}

function recordDiceThrown(player, diceCount) {
  const history = playerHistory(player);
  if (!history) return;
  history.maxDiceThrown = Math.max(history.maxDiceThrown, diceCount);
}

function recordEffectReceived(target, actor = null) {
  if (!target || !actor || target.id === actor.id) return;
  const history = playerHistory(target);
  if (history) history.effectsReceived += 1;
}

function recordMonsterBattle(player, door, force, won) {
  const history = playerHistory(player);
  if (!history || !door) return;
  const requiredForce = effectiveMonsterStrength(door);
  const key = door.label || `Монстр ${requiredForce}`;
  const battle = history.monsterBattles[key] || {
    attempts: 0,
    clearedForce: null,
    damage: requiredForce,
    wins: 0,
  };
  battle.attempts += 1;
  if (won) {
    battle.wins += 1;
    battle.clearedForce = force;
  }
  history.monsterBattles[key] = battle;
}

function recordTadamPlayed() {
  if (state?.history) state.history.tadamPlayed += 1;
}

async function rollAndMove({ animate = true } = {}) {
  if (
    movementActionInProgress ||
    state.finished ||
    state.isAnimating ||
    state.pendingCardChoice ||
    state.pendingChoice ||
    state.pendingPreRoll ||
    state.pendingShop
  ) {
    return;
  }

  movementActionInProgress = true;
  const player = currentPlayer();
  const botTurnPlayerId = isBot(player) ? player.id : null;
  state.botTurnPlayerId = botTurnPlayerId;
  recordTurnStarted(player);
  applyTurnStartArtifacts(player);

  try {
    const extraDice = await chooseExtraDie(player, animate);
    state.isAnimating = animate;
    state.movingPlayerId = animate ? player.id : null;
    state.dice = null;
    render();

    const rolls = rollDice(totalDiceForPlayer(player, extraDice));
    recordDiceThrown(player, rolls.length);
    const rolled = rolls.reduce((sum, value) => sum + value, 0);
    const bonus = playerStepBonus(player);
    if (animate) await animateDice(rolls, { bonus, player });
    const totalSteps = rolled + bonus;
    state.dice = totalSteps;
    state.walkPath = animate && ui.showWalkPath?.checked ? buildWalkPath(player, totalSteps) : [];
    renderTileStates();
    if (animate && state.walkPath.length > 0) await sleep(160);

    for (let step = 0; step < totalSteps && player.position !== finishCell; step += 1) {
      const currentPosition = player.position;
      const nextPosition = await chooseNextPosition(player, currentPosition, totalSteps - step, animate);
      if (!nextPosition) break;

      const blockingDoor = lockedDoorForTransition(player, currentPosition, nextPosition);
      if (blockingDoor) {
        if (animate) {
          await showActionPrompt(
            `${playerName(player)} не может пройти ${blockingDoor.label}: победи врага с силой <strong>${monsterStrengthText(blockingDoor)}</strong>`,
            { autoFor: player },
          );
        }
        break;
      }

      const beforeMoveCell = player.position;
      player.position = nextPosition;
      recordPlayerMoved(player, nextPosition);
      resolveMagicWalletOvertake(player, beforeMoveCell, nextPosition);
      consumeWalkPathCell(nextPosition);
      if (step < totalSteps - 1) await resolveJumpSteal(player);
      if (animate) {
        render();
        await sleep(180);
      }
      const enemyBattle = await resolvePassThroughEnemy(player);
      if (state.finished || player.position !== nextPosition) break;
      if (enemyBattle?.winner === "player" && !enemyBattle.isFinalBoss && !passThroughAllEnabled()) break;
      await resolvePortalAtCurrentCell(player, { animate, remaining: totalSteps - step - 1 });
      if (step < totalSteps - 1) {
        await resolvePassThroughShop(player);
      }
    }

    state.isAnimating = false;
    state.movingPlayerId = null;
    state.walkPath = [];
    pulseTile(player.position);
    log(`${playerName(player)} бросает <strong>${formatRoll(rolls)}</strong>${totalSteps !== rolled ? ` и идет на ${totalSteps}` : ""}.`);
    await resolveLanding(player);

    completeMovementTurn(player);
  } finally {
    movementActionInProgress = false;
    if (botTurnPlayerId === null) startHumanRollCooldown();
    if (state.botTurnPlayerId === botTurnPlayerId) state.botTurnPlayerId = null;
    state.isAnimating = false;
    state.movingPlayerId = null;
    state.walkPath = [];
    render();
  }
}

async function chooseNextPosition(player, currentCell, remaining, animate) {
  const choices = getNextOptions(currentCell);
  if (choices.length === 0) return null;
  if (choices.length === 1 || !animate) return choices[0].cell;

  state.pendingChoice = {
    choices,
    currentCell,
    playerId: player.id,
    remaining,
  };
  state.isAnimating = false;
  render();

  return new Promise((resolve) => {
    state.choiceResolver = (nextCell) => {
      state.pendingChoice = null;
      state.choiceResolver = null;
      state.isAnimating = true;
      resolve(nextCell);
    };
    scheduleBotAction(botChoiceDelay("choice"), { replace: true });
  });
}

function getNextOptions(cell) {
  if (cell === finishCell) return [];

  const nextCell = defaultNextCell(cell);
  return nextCell ? [{ cell: nextCell, label: "вперёд" }] : [];
}

function defaultNextCell(cell) {
  return routeNext.get(cell) || null;
}

function buildWalkPath(player, steps) {
  const path = [];
  let currentCell = player.position;

  for (let step = 0; step < steps && currentCell !== finishCell; step += 1) {
    const nextCell = defaultNextCell(currentCell);
    if (!nextCell) break;
    if (lockedDoorForTransition(player, currentCell, nextCell)) break;

    path.push(nextCell);
    currentCell = nextCell;
  }

  return path;
}

function consumeWalkPathCell(cell) {
  if (!state.walkPath?.length) return;

  const index = state.walkPath.indexOf(cell);
  if (index < 0) return;
  state.walkPath = state.walkPath.slice(index + 1);
}

function advanceTurn() {
  state.dice = null;
  state.turns += 1;
  state.activePlayer = (state.activePlayer + 1) % state.players.length;

  if (state.activePlayer === 0) {
    state.round += 1;
  }
}

function completeMovementTurn(player) {
  if (state.finished) {
    state.extraTurnPlayerId = null;
  } else if (state.extraTurnPlayerId === player.id) {
    state.extraTurnPlayerId = null;
    state.dice = null;
    state.turns += 1;
    log(`${playerName(player)} получает <strong>еще один ход</strong>.`, { toast: true });
  } else {
    advanceTurn();
  }
}

function selectedBotCount(playerCount = Number(ui.playerCount?.value) || 2) {
  const count = Number(ui.botCount?.value) || 0;
  return Math.max(0, Math.min(playerCount, count));
}

function syncBotCountOptions() {
  if (!ui.botCount) return;

  const playerCount = Number(ui.playerCount?.value) || 2;
  const previous = selectedBotCount(playerCount);
  ui.botCount.innerHTML = "";
  for (let count = 0; count <= playerCount; count += 1) {
    const option = document.createElement("option");
    option.value = String(count);
    option.textContent = String(count);
    ui.botCount.append(option);
  }
  ui.botCount.value = String(Math.min(previous, playerCount));
}

function isBot(player) {
  return Boolean(player?.bot);
}

function isBotPlayerId(playerId) {
  return isBot(state?.players?.find((player) => player.id === playerId));
}

function randomChoice(items) {
  return items.length ? items[Math.floor(Math.random() * items.length)] : null;
}

function botDelay(kind = "default") {
  if (fastBotsEnabled()) return 0;

  const ranges = {
    choice: [1800, 2800],
    card: [450, 850],
    preRoll: [250, 500],
    prompt: [1500, 2300],
    result: [2200, 3400],
    roll: [1800, 2800],
  };
  const [min, max] = ranges[kind] || [1500, 2400];
  return min + Math.floor(Math.random() * (max - min + 1));
}

function botPersonality(player) {
  const profiles = {
    0: { battle: 1.22, chaos: 0.72, economy: 0.88, progress: 1.18, risk: 1.12, shop: 0.96, steal: 0.9 },
    1: { battle: 0.92, chaos: 0.58, economy: 1.28, progress: 1, risk: 0.72, shop: 1.22, steal: 0.9 },
    2: { battle: 0.98, chaos: 0.86, economy: 1, progress: 1, risk: 0.94, shop: 1.08, steal: 1.36 },
    3: { battle: 1.18, chaos: 1.38, economy: 0.76, progress: 0.96, risk: 1.34, shop: 0.92, steal: 1.06 },
  };
  return profiles[player?.id] || { battle: 1, chaos: 1, economy: 1, progress: 1, risk: 1, shop: 1, steal: 1 };
}

function chooseWeightedBotOption(options, player = currentPlayer()) {
  const legal = options.filter((option) => option && option.id !== undefined);
  if (legal.length === 0) return null;
  if (legal.length === 1) return legal[0];

  const personality = botPersonality(player);
  const noise = 3 + 8 * personality.chaos;
  const scored = legal.map((option) => ({
    ...option,
    finalScore: Number(option.score || 0) + (Math.random() * 2 - 1) * noise,
  }));
  scored.sort((a, b) => b.finalScore - a.finalScore);

  const spread = Math.abs(scored[0].finalScore - scored[scored.length - 1].finalScore);
  if (spread < 0.75) return randomChoice(scored);

  const bestChance = Math.max(0.72, Math.min(0.86, 0.82 - (personality.chaos - 1) * 0.08));
  if (Math.random() < bestChance) return scored[0];

  const cutoff = scored[0].finalScore - Math.max(8, 14 * personality.chaos);
  const close = scored.filter((option) => option.finalScore >= cutoff).slice(0, 3);
  return randomChoice(close.length ? close : scored.slice(0, Math.min(3, scored.length)));
}

function botChoiceDelay(kind = "choice") {
  if (kind === "card") return botDelay("card");
  if (kind === "preRoll") return botDelay("preRoll");
  return botDelay(kind);
}

function fastBotsEnabled() {
  return ui.botSpeed?.value === "fast";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function monsterRageBonus() {
  return Math.max(0, Number(state?.eventMonsterRage) || 0);
}

function effectiveMonsterStrength(door) {
  if (!door) return 0;
  return Math.max(0, (Number(door.damage) || 0) + monsterRageBonus());
}

function monsterStrengthText(door) {
  const effective = effectiveMonsterStrength(door);
  const rage = monsterRageBonus();
  if (!rage) return String(effective);
  return `${effective} (база ${door.damage} + ярость ${rage})`;
}

function chanceThresholdScore(before, after, scale = 1) {
  const thresholds = [
    [0.35, 12],
    [0.5, 16],
    [0.65, 20],
    [0.8, 16],
  ];
  return thresholds.reduce((score, [threshold, amount]) => (
    before < threshold && after >= threshold ? score + amount * scale : score
  ), 0);
}

function winChanceDeltaScore(before, after, scale = 1) {
  const gain = Math.max(0, after - before);
  let score = gain * 100 * scale + chanceThresholdScore(before, after, scale);
  if (before >= 0.82) score -= 18 * scale;
  if (after < 0.18) score -= 12 * scale;
  return score;
}

function monsterGateWeight(door) {
  if (!door) return 1;
  const strength = effectiveMonsterStrength(door);
  if (door.isFinalBoss) return 1.65;
  if (strength >= 16) return 1.45;
  if (strength >= 10) return 1.15;
  return 1;
}

function monsterGatePressure(player) {
  const door = nextUnbeatenEnemy(player);
  if (!door) return null;

  const distance = Math.max(0, (routeIndex.get(door.enemyCell) ?? routeProgress(player)) - routeProgress(player));
  const dice = totalDiceForPlayer(player);
  const bonus = playerMonsterBattleBonus(player);
  const target = effectiveMonsterStrength(door);
  const chance = estimateWinChance(dice, bonus, target);
  const weight = monsterGateWeight(door);
  const nearby = distance <= 32;
  const hardGate = door.isFinalBoss || target >= 16;
  const failedAttempts = playerHistory(player)?.monsterBattles?.[door.label]?.attempts || 0;
  const pressure = (
    clamp((0.68 - chance) * 1.7, 0, 1.15) * weight +
    (nearby ? 0.28 : 0) +
    (hardGate ? 0.22 : 0) +
    Math.min(0.35, failedAttempts * 0.08)
  );

  return { bonus, chance, dice, distance, door, failedAttempts, hardGate, nearby, pressure, target, weight };
}

function shopDuplicatePenalty(player, card) {
  if (!player || !card) return 0;
  const effectType = card.effect?.type;
  const copies = player.items.filter((item) => item.id === card.id || item.effect?.type === effectType).length;
  if (copies <= 0) return 0;
  if (effectType === "passive-step-bonus") return [0, 8, 28, 50, 72][Math.min(copies, 4)] || 72;
  if (effectType === "passive-battle-bonus") return [0, 4, 9, 16, 24][Math.min(copies, 4)] || 24;
  if (effectType === "optional-extra-die") return [0, 7, 18, 30, 42][Math.min(copies, 4)] || 42;
  return 5 * copies;
}

function coinReservePenalty(player, coinsAfter, context = {}) {
  const personality = botPersonality(player);
  const gate = monsterGatePressure(player);
  let penalty = 0;

  if (coinsAfter < 5) penalty += (context.critical ? 16 : 34) * personality.economy;
  else if (coinsAfter < 10) penalty += (context.critical ? 6 : 18) * personality.economy;
  else if (coinsAfter < 12 && gate?.pressure > 0.8) penalty += 7 * personality.economy;

  if (context.movement && player.coins < 10) penalty += 14 * personality.economy;
  if (context.movement && gate?.pressure > 0.7) penalty += 5 * gate.pressure * personality.economy;
  if (context.battle && gate?.door?.isFinalBoss) penalty *= 0.75;
  return penalty;
}

function chooseBotPreRoll(player, card) {
  const effect = card?.effect;
  if (!effect || player.coins < effect.cost) return false;

  const personality = botPersonality(player);
  const currentDice = totalDiceForPlayer(player);
  const nextDice = currentDice + effect.dice;
  const coinsAfter = player.coins - effect.cost;
  const door = cellEvents[player.position] === "enemy" ? doorByEnemyCell(player.position) : null;

  let payScore = -6;
  let declineScore = 0;

  if (door && !isDoorOpenForPlayer(door, player)) {
    const target = effectiveMonsterStrength(door);
    const currentChance = estimateWinChance(currentDice, playerMonsterBattleBonus(player), target);
    const nextChance = estimateWinChance(nextDice, playerMonsterBattleBonus(player), target);
    const gateWeight = monsterGateWeight(door);
    payScore += winChanceDeltaScore(currentChance, nextChance, gateWeight) * personality.battle;
    if (currentChance < 0.6 && nextChance >= 0.6) payScore += 16 * gateWeight * personality.battle;
    if (currentChance < 0.08 && nextChance > 0.2) payScore += 10 * personality.risk;
    if (currentChance >= 0.82) declineScore += 24 * personality.economy;
    if (nextChance < 0.18) declineScore += 18 / personality.risk;
    if (door.isFinalBoss) payScore += 12 * personality.battle;
    payScore -= coinReservePenalty(player, coinsAfter, { battle: true, critical: nextChance >= 0.5 });
  } else {
    const leader = leadingPlayer();
    const lag = leader && leader.id !== player.id ? routeProgress(leader) - routeProgress(player) : 0;
    const expectedExtraSteps = effect.dice * 3.5;
    const currentReach = currentDice * 3.5 + playerStepBonus(player);
    const nextReach = nextDice * 3.5 + playerStepBonus(player);
    const currentCells = nearbyInterestingCells(player, Math.ceil(currentReach)).score;
    const nextCells = nearbyInterestingCells(player, Math.ceil(nextReach)).score;
    const cellGain = nextCells - currentCells;
    payScore += Math.min(12, Math.max(0, lag * 0.35)) * personality.progress;
    payScore += cellGain * 1.6 * personality.risk;
    if (lag >= 18) payScore += 8 * personality.progress;
    if (finalDistance(player) <= currentReach + expectedExtraSteps + 4) payScore += 9 * personality.progress;
    if (leader?.id === player.id) declineScore += 8 * personality.economy;
    payScore -= coinReservePenalty(player, coinsAfter, { movement: true });
  }

  if (coinsAfter <= 2) declineScore += 28 * personality.economy;
  else if (coinsAfter <= 6) declineScore += 14 * personality.economy;
  if (player.coins >= 18 && coinsAfter >= 10) payScore += 5;

  const choice = chooseWeightedBotOption(
    [
      { id: "pay", score: payScore },
      { id: "decline", score: declineScore },
    ],
    player,
  );
  return choice?.id === "pay";
}

function chooseBotShopCard(player, offer, { allowDecline = true } = {}) {
  const options = offer.map((card) => ({
    id: card.id,
    score: scoreShopCard(player, card),
  }));

  if (allowDecline) {
    options.push({ id: null, score: scoreShopDecline(player, offer) });
  }

  return chooseWeightedBotOption(options, player)?.id ?? null;
}

function chooseBotDirection(player, choices, context = {}) {
  if (context?.kind === "portal") return chooseBotPortalDestination(player, choices, context);
  const options = choices.map((choice) => ({
    id: choice.cell,
    score: scoreCellForBot(player, choice.cell, context) + (choice.className === "decline" ? 4 * botPersonality(player).economy : 0),
  }));
  return chooseWeightedBotOption(options, player)?.id ?? randomChoice(choices)?.cell ?? null;
}

function chooseBotPortalDestination(player, choices, pending = {}) {
  const scored = choices.map((choice) => {
    const projectedCell = projectedPortalEndCell(player, choice.cell, pending.remaining);
    return {
      choice,
      projectedCell,
      projectedProgress: routeIndex.get(projectedCell) ?? routeIndex.get(choice.cell) ?? routeProgress(player),
    };
  });
  const bestProgress = Math.max(...scored.map((item) => item.projectedProgress));
  const secondProgress = scored
    .map((item) => item.projectedProgress)
    .sort((a, b) => b - a)[1] ?? bestProgress;
  const options = scored.map((item) => ({
    id: item.choice.cell,
    score: scorePortalChoiceForBot(player, item.choice, pending, {
      bestProgress,
      projectedCell: item.projectedCell,
      progressLead: item.projectedProgress - secondProgress,
      projectedProgress: item.projectedProgress,
    }),
  }));
  return chooseWeightedBotOption(options, player)?.id ?? randomChoice(choices)?.cell ?? null;
}

function scorePortalChoiceForBot(player, choice, pending = {}, context = {}) {
  const personality = botPersonality(player);
  const currentProgress = routeProgress(player);
  const exitProgress = routeIndex.get(choice.cell) ?? currentProgress;
  const projectedCell = context.projectedCell || projectedPortalEndCell(player, choice.cell, pending.remaining);
  const projectedProgress = context.projectedProgress ?? routeIndex.get(projectedCell) ?? exitProgress;
  const progressGain = Math.max(0, projectedProgress - currentProgress);
  const exitGain = Math.max(0, exitProgress - currentProgress);
  const currentDistance = finalDistance(player);
  const projectedDistance = finalDistanceFromCell(projectedCell);
  const distanceGain = Math.max(0, currentDistance - projectedDistance);
  const phase = gamePhase();
  const endgameUrgency = portalEndgameUrgency(player, projectedDistance);
  const isDecline = choice.className === "decline";

  let score = 0;
  score += scoreCellForBot(player, choice.cell, { ...pending, portalExit: true }) * 0.25;
  score += scoreCellForBot(player, projectedCell, { ...pending, portalProjection: true }) * 0.8;
  score += exitGain * 0.45 * personality.progress;
  score += progressGain * (phase === "late" ? 1.95 : phase === "mid" ? 1.25 : 0.85) * personality.progress;
  score += distanceGain * (1.2 + endgameUrgency * 1.4) * personality.progress;
  score += resourceScaledPortalRiskAdjustment(player, projectedCell, { projected: true });
  if (projectedCell !== choice.cell) score += resourceScaledPortalRiskAdjustment(player, choice.cell, { projected: false }) * 0.35;

  const bestGap = Math.max(0, (context.bestProgress ?? projectedProgress) - projectedProgress);
  const lead = Math.max(0, context.progressLead || 0);
  if (!isDecline && bestGap <= 0 && progressGain >= 8) {
    score += (20 + Math.min(58, progressGain * 0.62) + Math.min(36, lead * 1.4)) * endgameUrgency * personality.progress;
  } else if (!isDecline && bestGap > 0) {
    score -= bestGap * (0.55 + endgameUrgency * 0.95) * personality.progress;
  }

  if (isDecline) {
    score += 4 * personality.economy;
    if (context.bestProgress > currentProgress + 6) {
      score -= (18 + Math.min(52, (context.bestProgress - currentProgress) * 0.82)) * endgameUrgency * personality.progress;
    }
    if (currentDistance <= 24) score -= 12 * personality.progress;
  }

  const danger = portalCatastrophicDanger(player, projectedCell);
  score -= danger;
  if (danger >= 70) score -= 18 / personality.risk;

  if (player.coins >= 20 && progressGain >= 14) score += 12 * personality.progress;
  else if (player.coins >= 15 && progressGain >= 10) score += 7 * personality.progress;
  if (player.coins <= 5 && ["red", "bad", "very-bad"].includes(cellEvents[projectedCell])) score -= 12 * personality.economy;

  return score;
}

function portalEndgameUrgency(player, projectedDistance) {
  const currentDistance = finalDistance(player);
  let urgency = gamePhase() === "late" ? 1.25 : gamePhase() === "mid" ? 0.78 : 0.45;
  if (currentDistance <= 18) urgency += 1.05;
  else if (currentDistance <= 36) urgency += 0.72;
  else if (currentDistance <= 58) urgency += 0.42;
  if (projectedDistance <= 18) urgency += 0.35;
  return clamp(urgency, 0.45, 2.6);
}

function finalDistanceFromCell(cell) {
  const current = routeIndex.get(cell) ?? 0;
  const finish = routeIndex.get(finishCell) || routePath.length;
  return Math.max(0, finish - current);
}

function resourceScaledPortalRiskAdjustment(player, cell, { projected = false } = {}) {
  const event = cellEvents[cell];
  if (!event) return 0;
  const personality = botPersonality(player);
  const coinComfort = player.coins >= 20 ? 1 : player.coins >= 15 ? 0.72 : player.coins >= 10 ? 0.35 : 0;
  const lowCoinFear = player.coins <= 4 ? 1 : player.coins <= 7 ? 0.62 : 0;
  const weight = projected ? 1 : 0.55;
  if (event === "red") return (12 * coinComfort - 12 * lowCoinFear) * weight * personality.risk;
  if (event === "bad") return (8 * coinComfort - 16 * lowCoinFear) * weight / personality.risk;
  if (event === "very-bad") return (24 * coinComfort - 48 * lowCoinFear) * weight / personality.risk;
  if (event === "green") return 4 * weight;
  if (event === "good") return 6 * weight;
  if (event === "shop" && player.coins >= 5) return 5 * weight * personality.shop;
  return 0;
}

function portalCatastrophicDanger(player, cell) {
  if (cell === finishCell) return 0;
  const event = cellEvents[cell];
  if (event !== "enemy") return 0;
  const door = doorByEnemyCell(cell);
  if (!door || isDoorOpenForPlayer(door, player)) return 0;
  const chance = estimateWinChance(totalDiceForPlayer(player), playerMonsterBattleBonus(player), effectiveMonsterStrength(door));
  const weight = monsterGateWeight(door);
  if (chance < 0.12) return 95 * weight;
  if (chance < 0.24) return 68 * weight;
  if (chance < 0.38) return 36 * weight;
  return 0;
}

function chooseBotChaosPortalDestination(player, choices) {
  const options = choices.map((choice) => ({
    id: choice.cell,
    score: scoreChaosPortalChoice(player, choice),
  }));
  return chooseWeightedBotOption(options, player)?.id ?? randomChoice(choices)?.cell ?? null;
}

function scoreChaosPortalChoice(player, choice) {
  const personality = botPersonality(player);
  const base = scoreCellForBot(player, choice.cell, { chaosPortal: true });
  const leader = leadingPlayer();
  const lag = leader && leader.id !== player.id ? routeProgress(leader) - routeProgress(player) : 0;
  let score = base;

  if (choice.id === "shop") {
    score += player.coins >= 5 ? 20 * personality.shop : -12 * personality.economy;
    if (player.items.length <= 1 && player.coins >= 5) score += 8 * personality.shop;
    if (monsterGatePressure(player)?.pressure > 0.7 && player.coins >= 10) score += 5 * personality.economy;
  } else if (choice.id === "good") {
    score += 14 + 8 * personality.progress;
    if (lag > 14) score += Math.min(18, lag * 0.45) * personality.risk;
    if (player.coins < 8) score += 5 * personality.chaos;
  } else if (choice.id === "monster") {
    const door = doorByEnemyCell(choice.cell);
    if (!door) {
      score += player.coins < 5 ? 10 * personality.economy : -12;
    } else if (isDoorOpenForPlayer(door, player)) {
      score += 8 * personality.progress;
    } else {
      const chance = estimateWinChance(totalDiceForPlayer(player), playerMonsterBattleBonus(player), effectiveMonsterStrength(door));
      score += chance >= 0.55 ? 22 * chance * personality.battle : -20 / personality.risk;
      if (player.coins < 5) score += 8 * personality.economy;
    }
    if (choice.cell === startCell) score -= 8 * personality.progress;
  }

  return score;
}

function chooseBotCardAction(player, pending) {
  const choices = availableCardChoices(pending);
  if (choices.length === 0) return null;

  const options = choices.map((choice) => ({
    id: choice.id,
    score: scoreCardChoice(player, pending, choice),
  }));
  return chooseWeightedBotOption(options, player)?.id ?? randomChoice(choices)?.id ?? null;
}

function availableCardChoices(pending) {
  return (pending?.choices || []).filter((choice) => !choice?.disabled);
}

function scoreCardChoice(player, pending, choice) {
  if (choice?.disabled) return -Infinity;
  if (pending?.kind === "big-rest") return scoreBigRestChoice(player, choice.id);
  if (pending?.kind === "black-market") return scoreBlackMarketChoice(player, choice.id);
  if (Number.isFinite(choice.score)) return choice.score;

  const personality = botPersonality(player);
  if (choice.id === "decline") {
    return player.coins <= 7 ? 18 * personality.economy : 4;
  }
  if (choice.id === "pay") {
    return player.coins >= 12 ? 24 : player.coins >= 6 ? 12 : -10;
  }
  if (String(choice.id).includes(":")) {
    const [targetIdText, cardId] = String(choice.id).split(":");
    const target = state.players.find((item) => item.id === Number(targetIdText));
    const card = target?.items.find((item) => item.id === cardId);
    let score = scoreShopCard(player, card) + 6 * personality.steal;
    if (target) score += leaderPressureScore(target) * 0.45 + Math.min(10, target.coins * 0.25);
    if (player.coins <= 6) score -= 18 * personality.economy;
    return score;
  }
  const target = state.players.find((item) => item.id === Number(choice.id));
  if (target) {
    if (target.id === player.id) return -18 / personality.chaos;
    return leaderPressureScore(target) * personality.steal + Math.min(18, target.coins * 0.7);
  }
  return 0;
}

function scoreShopCard(player, card) {
  if (!card) return 0;
  const personality = botPersonality(player);
  const phase = gamePhase();
  const effect = card.effect || {};
  const gate = monsterGatePressure(player);
  let score = 0;

  if (card.id === "step-plus" || effect.type === "passive-step-bonus") {
    const stepBonus = playerStepBonus(player);
    const leader = leadingPlayer();
    const lag = leader && leader.id !== player.id ? routeProgress(leader) - routeProgress(player) : 0;
    score = phase === "late" ? 20 : 28;
    if (stepBonus === 0) score += 4;
    else if (stepBonus === 1) score -= 8;
    else if (stepBonus === 2) score -= lag > 18 ? 20 : 34;
    else score -= lag > 28 ? 38 : 64;
    if (lag > 18) score += 8 * personality.progress;
    if (gate?.pressure > 0.55) {
      const lowStrength = playerCombatBonus(player) <= 1;
      score -= (22 + gate.pressure * 30 + (lowStrength ? 18 : 0)) * gate.weight;
      if (gate.hardGate && lowStrength) score -= 24 * gate.weight;
      if (stepBonus >= 2 && lag <= 30) score -= 28 * gate.weight;
    }
    score *= personality.progress;
  } else if (card.id === "battle-plus" || effect.type === "passive-battle-bonus") {
    score = 28 * personality.battle;
    if (gate) {
      const afterChance = estimateWinChance(gate.dice, gate.bonus + (effect.amount || 1), gate.target);
      score += winChanceDeltaScore(gate.chance, afterChance, gate.weight) * personality.battle;
      if (gate.chance < 0.6) score += (28 + gate.pressure * 36) * gate.weight * personality.battle;
      if (gate.hardGate) score += 22 * personality.battle;
      if (gate.failedAttempts > 0) score += Math.min(22, gate.failedAttempts * 5) * personality.battle;
    }
  } else if (card.id === "coin-plus" || effect.type === "passive-coin-bonus") {
    score = phase === "early" ? 28 : phase === "mid" ? 18 : 8;
    score *= personality.economy;
  } else if (card.id === "extra-die" || effect.type === "optional-extra-die") {
    score = 22 * personality.risk;
    if (gate) {
      const afterChance = estimateWinChance(gate.dice + (effect.dice || 1), gate.bonus, gate.target);
      score += winChanceDeltaScore(gate.chance, afterChance, gate.weight) * 0.75 * personality.battle;
      if (gate.chance < 0.6 && afterChance >= 0.35) score += 8 * gate.weight * personality.risk;
    }
    if (player.coins <= 7) score -= 10 * personality.economy;
    if (player.coins >= 15) score += 5;
  } else {
    score = 12;
  }

  score -= shopDuplicatePenalty(player, card);
  score -= coinReservePenalty(player, player.coins - 5, {
    critical: (card.id === "battle-plus" || effect.type === "passive-battle-bonus") && gate?.pressure > 0.65,
  }) * 0.45;
  return score * personality.shop;
}

function scoreShopDecline(player, offer = []) {
  const personality = botPersonality(player);
  const gate = monsterGatePressure(player);
  let score = player.coins <= 4 ? 52 : player.coins <= 7 ? 30 : player.coins < 10 ? 18 : player.coins > 15 ? 4 : 10;
  if (finalDistance(player) <= 8) score += 8;
  const bestCardScore = Math.max(0, ...offer.map((card) => scoreShopCard(player, card)));
  if (player.coins - 5 < 5) score += 22 * personality.economy;
  else if (player.coins - 5 < 10 && bestCardScore < 42) score += 12 * personality.economy;
  if (gate?.pressure > 0.75 && !offer.some((card) => card.effect?.type === "passive-battle-bonus")) {
    score += 16 * personality.economy;
  }
  if (bestCardScore < score + 5) score += 5;
  return score * personality.economy;
}

function chooseBotAuctionBid(player, offer = []) {
  const personality = botPersonality(player);
  const prizeScore = offer.reduce((sum, card) => sum + Math.max(0, scoreShopCard(player, card)), 0);
  const leader = leadingPlayer();
  const lag = leader && leader.id !== player.id ? routeProgress(leader) - routeProgress(player) : 0;
  const gate = monsterGatePressure(player);
  const affordableBids = auctionBidOptions(player);
  const options = affordableBids.map((bid) => {
    if (bid === 0) {
      const passScore = player.coins < 5
        ? 35
        : prizeScore < 26
          ? 18 * personality.economy
          : 4 * personality.economy;
      return { id: bid, score: passScore };
    }

    const coinsAfter = player.coins - bid;
    let score = prizeScore * 0.72 - bid * 1.7;
    score += Math.min(12, Math.max(0, lag * 0.28)) * personality.progress;
    score += (personality.shop - 1) * 8 + (personality.risk - 1) * 6;
    if (gate?.pressure > 0.75 && offer.some((card) => card.effect?.type === "passive-battle-bonus")) {
      score += 16 * gate.weight * personality.battle;
    }
    if (prizeScore >= 90 && coinsAfter >= 10) score += bid >= 15 ? 10 : 4;
    if (prizeScore >= 62 && bid <= 10) score += 8;
    score -= coinReservePenalty(player, coinsAfter, { critical: prizeScore >= 80 }) * 0.8;
    if (coinsAfter < 5) score -= 28 * personality.economy;
    else if (coinsAfter < 10) score -= 12 * personality.economy;
    return { id: bid, score };
  });
  return chooseWeightedBotOption(options, player)?.id ?? 0;
}

function chooseBotBigRestOption(player) {
  const options = bigRestChoices().map((choice) => ({
    id: choice.id,
    score: scoreBigRestChoice(player, choice.id),
  }));
  return chooseWeightedBotOption(options, player)?.id || "recover";
}

function scoreBlackMarketChoice(player, choiceId) {
  const personality = botPersonality(player);
  const gate = monsterGatePressure(player);
  const cost = blackMarketDealCost(choiceId);
  if (cost > player.coins) return -120;
  const coinsAfter = player.coins - cost;
  let score = 0;

  if (choiceId === "shop-card") {
    const shopScores = shopCards.map((card) => scoreShopCard(player, card));
    const averageShopScore = shopScores.reduce((sum, item) => sum + item, 0) / Math.max(1, shopScores.length);
    score = 22 * personality.shop + Math.max(8, averageShopScore * 0.42) + 8 * personality.chaos;
    if (player.items.length === 0) score += 16 * personality.shop;
    else if (player.items.length <= 2) score += 8 * personality.shop;
    if (gate?.pressure > 0.7) score += 5 * personality.economy;
    score -= coinReservePenalty(player, coinsAfter, { critical: averageShopScore > 45 }) * 0.55;
  } else if (choiceId === "secret-training") {
    score = 24 * personality.battle + 8 * personality.chaos;
    if (gate) {
      const afterChance = estimateWinChance(gate.dice, gate.bonus + 1, gate.target);
      score += winChanceDeltaScore(gate.chance, afterChance, gate.weight) * personality.battle;
      if (gate.chance < 0.65) score += (24 + gate.pressure * 34) * gate.weight * personality.battle;
      if (gate.hardGate) score += 18 * personality.battle;
      if (gate.failedAttempts > 0) score += Math.min(18, gate.failedAttempts * 5) * personality.battle;
    } else {
      score += gamePhase() === "late" ? 8 * personality.battle : 0;
    }
    score -= coinReservePenalty(player, coinsAfter, { critical: gate?.pressure > 0.65 }) * 0.72;
  } else if (choiceId === "rage-potion") {
    if (nextMonsterBattleBonus(player) > 0) return -120;
    score = gate ? 8 * personality.risk : -18 * personality.economy;
    if (gate) {
      const afterChance = estimateWinChance(gate.dice, gate.bonus + blackMarketRageBonus, gate.target);
      score += winChanceDeltaScore(gate.chance, afterChance, gate.weight) * 1.2 * personality.battle;
      if (gate.chance < 0.45 && afterChance >= 0.65) score += 34 * gate.weight * personality.battle;
      if (gate.chance < 0.6 && afterChance >= 0.8) score += 22 * gate.weight * personality.battle;
      if (gate.hardGate) score += 20 * personality.battle;
      if (gate.distance <= 18) score += 10 * personality.progress;
      if (afterChance < 0.35) score -= 18 / personality.risk;
    }
    score -= coinReservePenalty(player, coinsAfter, { battle: true, critical: gate?.pressure > 0.7 }) * 0.82;
    if (coinsAfter < 5 && gate?.chance > 0.55) score -= 18 * personality.economy;
  } else {
    score = player.coins < 5 ? 52 : player.coins < 10 ? 26 : player.coins < 15 ? 15 : 7;
    if (!gate) score += 10 * personality.economy;
    if (nextMonsterBattleBonus(player) > 0) score += 18 * personality.economy;
    if (gate?.chance >= 0.75 && player.coins < 20) score += 12 * personality.economy;
    if (finalDistance(player) <= 8) score += 6;
  }

  return score;
}

function blackMarketDealCost(choiceId) {
  if (choiceId === "shop-card") return blackMarketShopCost;
  if (choiceId === "secret-training") return blackMarketTrainingCost;
  if (choiceId === "rage-potion") return blackMarketRageCost;
  return 0;
}

function scoreBigRestChoice(player, choiceId) {
  const personality = botPersonality(player);
  const gate = monsterGatePressure(player);
  const leader = leadingPlayer();
  const lag = leader && leader.id !== player.id ? routeProgress(leader) - routeProgress(player) : 0;
  const coins = player.coins;
  const stepBonus = playerStepBonus(player);
  const strength = playerCombatBonus(player);
  const distanceToFinish = finalDistance(player);
  let score = 0;

  if (choiceId === "recover") {
    score = 12 * personality.economy;
    if (coins < 5) score += 48 * personality.economy;
    else if (coins < 10) score += 34 * personality.economy;
    else if (coins < 15) score += 17 * personality.economy;
    if (gate?.pressure > 0.65) score += (8 + gate.pressure * 10) * personality.economy;
    if (player.items.some((item) => item.effect?.type === "optional-extra-die") && coins < 12) score += 8 * personality.risk;
  } else if (choiceId === "train") {
    score = 20 * personality.battle;
    if (gate) {
      const afterChance = estimateWinChance(gate.dice, gate.bonus + 1, gate.target);
      score += winChanceDeltaScore(gate.chance, afterChance, gate.weight) * personality.battle;
      if (gate.chance < 0.6) score += (26 + gate.pressure * 34) * gate.weight * personality.battle;
      if (gate.hardGate) score += 18 * personality.battle;
      if (gate.failedAttempts > 0) score += Math.min(20, gate.failedAttempts * 5) * personality.battle;
      if (afterChance >= 0.8 && strength >= 3) score -= 8 * personality.battle;
    } else if (distanceToFinish <= 24) {
      score += 12 * personality.battle;
    }
  } else if (choiceId === "speed") {
    score = 18 * personality.progress;
    if (lag > 12) score += Math.min(30, lag * 0.7) * personality.progress;
    if (distanceToFinish <= 28) score += 14 * personality.progress;
    if (gate) {
      if (gate.chance >= 0.65) score += 10 * personality.progress;
      else score -= (12 + gate.pressure * 22) * gate.weight;
      if (strength <= 1 && gate.hardGate) score -= 22 * gate.weight;
    }
    if (stepBonus >= 2) score -= 10 + stepBonus * 8;
    if (stepBonus >= 4 && lag <= 24) score -= 24;
  }

  return score;
}

function scoreCellForBot(player, cell, context = {}) {
  const personality = botPersonality(player);
  if (!cell) return -100;
  if (cell === finishCell) return 1000;

  let score = (routeIndex.get(cell) ?? routeProgress(player)) * 0.35 * personality.progress;
  const event = cellEvents[cell];
  if (!event) return score + 2;

  if (event === "good") score += 18;
  else if (event === "big-rest") score += Math.max(
    scoreBigRestChoice(player, "recover"),
    scoreBigRestChoice(player, "train"),
    scoreBigRestChoice(player, "speed"),
  ) * 0.72;
  else if (event === "tadam") score += 10 + 3 * personality.chaos;
  else if (event === "event") score += 15 + 2 * personality.chaos;
  else if (event === "shop") score += player.coins >= 5 ? 16 * personality.shop : -4;
  else if (event === "black-market") score += Math.max(
    scoreBlackMarketChoice(player, "shop-card"),
    scoreBlackMarketChoice(player, "secret-training"),
    scoreBlackMarketChoice(player, "rage-potion"),
    scoreBlackMarketChoice(player, "leave"),
  ) * 0.72;
  else if (event === "joe-auction") score += player.coins >= 5 ? 14 * personality.shop + Math.min(10, player.coins * 0.35) : 2;
  else if (event === "joe-game") score += 16 * personality.shop + 8 * personality.chaos;
  else if (event === "chaos-portal") score += 8 * personality.chaos + (player.coins < 5 ? 4 : 0);
  else if (event === "green") score += 10 + scoreFieldTadamEffect("green-field");
  else if (event === "red") score += -11 + scoreFieldTadamEffect("red-field");
  else if (event === "bad") score -= 16 / personality.risk;
  else if (event === "very-bad") score -= 48 / personality.risk;
  else if (event === "pay-double") score += Math.min(36, player.coins * 1.2);
  else if (event === "dice-fortune") score += (personality.chaos - 0.8) * 16 + (player.coins < 8 ? 5 : 0);
  else if (event === "vs") score += player.coins >= 10 ? 4 * personality.risk : -8;
  else if (event === "enemy") {
    const door = doorByEnemyCell(cell);
    if (!door || isDoorOpenForPlayer(door, player)) score += 10;
    else {
      const chance = estimateWinChance(totalDiceForPlayer(player), playerMonsterBattleBonus(player), effectiveMonsterStrength(door));
      if (chance >= 0.6) score += 32 * chance * personality.battle;
      else if (chance >= 0.35) score += (chance * 22 - 8) * personality.risk * personality.battle;
      else score -= 28 / personality.risk;
      if (door.isFinalBoss) score += 12 * personality.battle;
    }
  }

  if (context.remaining && routeIndex.has(cell)) score += Math.min(8, context.remaining * 0.25);
  return score;
}

function scoreFieldTadamEffect(type) {
  const effect = activeFieldEffect(type);
  if (!effect) return 0;
  if (effect.mode === "draw") return effect.deck === "good" ? 10 : -10;
  if (effect.mode === "move") return effect.steps;
  return 0;
}

function estimateWinChance(diceCount, bonus, target) {
  const dice = Math.max(0, Math.min(8, Math.floor(diceCount)));
  if (dice <= 0) return bonus >= target ? 1 : 0;

  let distribution = new Map([[0, 1]]);
  for (let index = 0; index < dice; index += 1) {
    const next = new Map();
    for (const [sum, count] of distribution) {
      for (let value = 1; value <= 6; value += 1) {
        next.set(sum + value, (next.get(sum + value) || 0) + count);
      }
    }
    distribution = next;
  }

  let wins = 0;
  let total = 0;
  for (const [sum, count] of distribution) {
    total += count;
    if (sum + bonus >= target) wins += count;
  }
  return total ? wins / total : 0;
}

function routeProgress(player) {
  return routeIndex.get(player?.position) ?? 0;
}

function leadingPlayer() {
  return [...state.players].sort((a, b) => getLeaderScore(b) - getLeaderScore(a))[0] || null;
}

function getLeaderScore(player) {
  const defeated = Object.values(state.doors || {}).filter((door) => isDoorOpenForPlayer(door, player)).length;
  return routeProgress(player) * 3 + player.coins * 0.35 + playerDiceBonus(player) * 8 + player.items.length * 5 + defeated * 14;
}

function leaderPressureScore(target) {
  const leader = leadingPlayer();
  const base = getLeaderScore(target) * 0.08;
  return base + (leader?.id === target.id ? 18 : 0);
}

function gamePhase() {
  const finish = routeIndex.get(finishCell) || routePath.length || 1;
  const best = Math.max(0, ...state.players.map((player) => routeProgress(player)));
  const ratio = best / finish;
  if (ratio < 0.34) return "early";
  if (ratio < 0.72) return "mid";
  return "late";
}

function nextUnbeatenEnemy(player) {
  const current = routeProgress(player);
  return Object.values(state.doors || {})
    .filter((door) => !isDoorOpenForPlayer(door, player) && (routeIndex.get(door.enemyCell) ?? -1) >= current)
    .sort((a, b) => (routeIndex.get(a.enemyCell) ?? 0) - (routeIndex.get(b.enemyCell) ?? 0))[0] || null;
}

function nearbyInterestingCells(player, steps) {
  let score = 0;
  let cell = player.position;
  for (let index = 0; index < steps && cell !== finishCell; index += 1) {
    cell = defaultNextCell(cell);
    if (!cell) break;
    const event = cellEvents[cell];
    if (["good", "green", "shop", "black-market", "joe-auction", "joe-game", "pay-double", "event"].includes(event)) score += 3;
    if (["bad", "red"].includes(event)) score -= 2;
    if (event === "very-bad") score -= 6;
    if (event === "chaos-portal") score += 2 * botPersonality(player).chaos;
    if (event === "enemy") score += 2 * botPersonality(player).battle;
    if (event === "dice-fortune") score += 2 * botPersonality(player).chaos;
  }
  return { score };
}

function shouldAutoResolvePrompt() {
  if (!actionPromptResolver) return false;
  if (actionPromptAutoPlayerId !== null) return isBotPlayerId(actionPromptAutoPlayerId);
  return isBotPlayerId(state?.botTurnPlayerId);
}

function botControlsLocked() {
  if (!state || state.finished) return false;
  if (actionPromptResolver) return shouldAutoResolvePrompt();
  if (isBotPlayerId(state.botTurnPlayerId)) return true;
  return isBot(currentPlayer());
}

function scheduleBotAction(delay = botDelay(), { replace = false } = {}) {
  if (replace) {
    window.clearTimeout(botActionTimer);
    botActionTimer = null;
  }
  if (botActionTimer || !state || state.finished) return;

  botActionTimer = window.setTimeout(() => {
    botActionTimer = null;
    runBotAction();
  }, delay);
}

function runBotAction() {
  if (!state || state.finished) return;

  if (actionPromptResolver) {
    if (shouldAutoResolvePrompt()) actionPromptResolver();
    return;
  }

  if (state.pendingPreRoll && isBotPlayerId(state.pendingPreRoll.playerId)) {
    const player = state.players.find((item) => item.id === state.pendingPreRoll.playerId);
    resolvePreRollChoice(chooseBotPreRoll(player, state.pendingPreRoll.card));
    return;
  }

  if (state.pendingShop && isBotPlayerId(state.pendingShop.playerId)) {
    const player = state.players.find((item) => item.id === state.pendingShop.playerId);
    resolveShopChoice(chooseBotShopCard(player, state.pendingShop.offer, { allowDecline: true }));
    return;
  }

  if (state.pendingCardChoice && isBotPlayerId(state.pendingCardChoice.playerId)) {
    const player = state.players.find((item) => item.id === state.pendingCardChoice.playerId);
    const choiceId = state.pendingCardChoice.kind === "joe-auction-bid"
      ? chooseBotAuctionBid(player, state.pendingCardChoice.offer)
      : state.pendingCardChoice.kind === "joe-auction-prize"
        ? chooseBotShopCard(player, state.pendingCardChoice.offer, { allowDecline: false })
        : chooseBotCardAction(player, state.pendingCardChoice);
    if (choiceId !== null && choiceId !== undefined) resolveCardChoice(choiceId);
    return;
  }

  if (state.pendingChoice) {
    const playerId = state.pendingChoice.playerId ?? currentPlayer()?.id;
    if (isBotPlayerId(playerId)) {
      const player = state.players.find((item) => item.id === playerId);
      const cell = state.pendingChoice.kind === "chaos-portal"
        ? chooseBotChaosPortalDestination(player, state.pendingChoice.choices)
        : chooseBotDirection(player, state.pendingChoice.choices, state.pendingChoice);
      if (cell) resolveChoice(cell);
    }
    return;
  }

  const player = currentPlayer();
  if (
    isBot(player) &&
    !state.isAnimating &&
    !state.pendingCardChoice &&
    !state.pendingChoice &&
    !state.pendingPreRoll &&
    !state.pendingShop
  ) {
    triggerRollButtonAction({ fromBot: true });
  }
}

function render() {
  renderBoard();
  renderScores();
  renderModifierPlayerStatus();
  renderTurn();
  renderChoicePanel();
  renderFinalBattleHud();
  renderMonsterRageIndicator();
  renderHistory();
  renderWinnerPopup();
  renderTadams();
  renderPhoneRoomPanel();
  schedulePhoneSnapshot();
  scheduleBotAction();
}

function renderModifierPlayerStatus() {
  if (!ui.modifierPlayerStatus || !state?.players?.length) return;
  const selected = currentModifierPlayer();
  ui.modifierPlayerStatus.style.setProperty("--player-color", selected.color);
  ui.modifierPlayerStatus.style.setProperty("--player-count", String(state.players.length));
  ui.modifierPlayerStatus.classList.toggle("is-compact", state.players.length >= 4);
  ui.modifierPlayerStatus.innerHTML = state.players
    .map((player) => {
      const isSelected = player.id === selected.id;
      return `
        <button class="modifier-player-card ${isSelected ? "selected" : ""}" type="button" data-modifier-player-id="${player.id}" style="--player-color: ${player.color}" aria-pressed="${isSelected}">
          <span class="modifier-player">
            <img src="${player.token}" alt="" aria-hidden="true">
          </span>
          <span class="modifier-values">
            <b>${stepBonusText(playerStepBonus(player), state.players.length >= 4)}</b>
            <b>${battleForceText(playerBattleBonus(player), state.players.length >= 4)}</b>
          </span>
        </button>
      `;
    })
    .join("");
}

function renderBoard() {
  if (boardEl.dataset.ready !== "true") buildBoardShell();
  renderEnemyLocks();
  renderTileStates();
  renderTokens();
}

function buildBoardShell() {
  boardEl.innerHTML = "";

  const tileGrid = document.createElement("div");
  tileGrid.className = "tile-grid";

  for (let row = 0; row < boardRows; row += 1) {
    for (let col = 0; col < boardCols; col += 1) {
      const cell = cellKey(col, row);
      const tile = document.createElement("span");
      const type = tileType(cell);
      tile.className = `tile tile-${type}`;
      tile.dataset.cell = cell;
      tile.title = tileTitle(cell);
      const enemyDoor = type === "enemy" ? doorByEnemyCell(cell) : null;
      const icon = enemyDoor?.isFinalBoss
        ? `<img class="tile-icon-image tile-icon-enemy tile-icon-final-enemy" src="${finalEnemyIconSrc}" alt="Финальный монстр">`
        : eventIcons[cellEvents[cell]] || tileIcons[type];
      if (icon) {
        tile.innerHTML = `<span class="tile-icon">${icon}</span>`;
      }
      if (enemyDoor) {
        tile.insertAdjacentHTML("beforeend", `<span class="monster-power">${effectiveMonsterStrength(enemyDoor)}</span>`);
      }
      tileGrid.append(tile);
    }
  }

  const tokenLayer = document.createElement("div");
  tokenLayer.className = "token-layer";
  boardEl.append(tileGrid, tokenLayer);
  boardEl.dataset.ready = "true";
}

function renderEnemyLocks() {
  boardEl.querySelectorAll(".enemy-victory-marks").forEach((item) => item.remove());
  boardEl.querySelectorAll(".portal-gate").forEach((item) => item.remove());
  boardEl.querySelectorAll(".tile-portal-active").forEach((tile) => {
    tile.classList.remove("tile-portal-active");
    const door = doorByEnemyCell(tile.dataset.cell);
    const icon = tile.querySelector(".tile-icon");
    if (door && icon) {
      icon.innerHTML = door.isFinalBoss
        ? `<img class="tile-icon-image tile-icon-enemy tile-icon-final-enemy" src="${finalEnemyIconSrc}" alt="Финальный монстр">`
        : `<img class="tile-icon-image tile-icon-enemy" src="${enemyIconSrc}" alt="Враг">`;
    }
  });

  for (const door of Object.values(state.doors)) {
    const tile = boardEl.querySelector(`[data-cell="${door.enemyCell}"]`);
    if (!tile) continue;

    if (!door.isFinalBoss && isDoorOpenForAllPlayers(door)) {
      const icon = tile.querySelector(".tile-icon");
      if (icon) {
        icon.innerHTML = `<img class="tile-icon-image tile-icon-portal" src="${portalIconSrc}" alt="Открытый портал">`;
      }
      tile.querySelector(".monster-power")?.remove();
      tile.classList.add("tile-portal-active");
      tile.insertAdjacentHTML("beforeend", `<span class="portal-gate" aria-label="Открытый портал"></span>`);
      continue;
    }

    const power = tile.querySelector(".monster-power");
    if (power) {
      power.textContent = String(effectiveMonsterStrength(door));
      power.title = `Сила монстра: ${monsterStrengthText(door)}`;
    }

    const victoriousPlayers = state.players.filter((player) => isDoorOpenForPlayer(door, player));
    if (victoriousPlayers.length === 0) continue;

    const marks = document.createElement("span");
    marks.className = "enemy-victory-marks";
    marks.dataset.count = String(victoriousPlayers.length);
    marks.title = `Победили врага: ${victoriousPlayers.map((player) => player.name).join(", ")}`;
    marks.setAttribute("aria-label", marks.title);
    for (const player of victoriousPlayers) {
      const dot = document.createElement("i");
      dot.style.setProperty("--player-color", player.color);
      dot.title = `${player.name} победил этого врага`;
      dot.setAttribute("aria-label", dot.title);
      marks.append(dot);
    }
    tile.append(marks);
  }
}

function renderTileStates() {
  boardEl.querySelectorAll(".tile-landing").forEach((tile) => tile.classList.remove("tile-landing"));
  boardEl.querySelectorAll(".walk-path-outline, .portal-preview-outline").forEach((outline) => outline.remove());

  if (state.walkPath?.length) {
    const finalCell = state.walkPath[state.walkPath.length - 1];
    for (const cell of state.walkPath) {
      const tile = boardEl.querySelector(`[data-cell="${cell}"]`);
      if (!tile) continue;

      const outline = document.createElement("span");
      outline.className = `walk-path-outline ${cell === finalCell ? "is-final" : ""}`.trim();
      tile.append(outline);
    }
  }

  if (portalPreviewActive()) {
    renderPortalPreviewOutlines();
  }

  if (!state.landingCell) return;

  const tile = boardEl.querySelector(`[data-cell="${state.landingCell}"]`);
  if (tile) tile.classList.add("tile-landing");
}

function renderPortalPreviewOutlines() {
  const previewCells = portalPreviewEndCells();
  for (const { cell, label } of previewCells) {
    const tile = boardEl.querySelector(`[data-cell="${cell}"]`);
    if (!tile) continue;

    const outline = document.createElement("span");
    outline.className = "portal-preview-outline";
    outline.title = `${label}: финиш хода`;
    tile.append(outline);
  }
}

function renderTokens() {
  const tokenLayer = boardEl.querySelector(".token-layer");
  if (!tokenLayer) return;

  const aliveIds = new Set(state.players.map((player) => String(player.id)));
  tokenLayer.querySelectorAll(".map-token").forEach((token) => {
    if (!aliveIds.has(token.dataset.playerId)) token.remove();
  });

  const stackByPosition = {};
  for (const player of state.players) {
    stackByPosition[player.position] = stackByPosition[player.position] || [];
    stackByPosition[player.position].push(player.id);
  }

  for (const player of state.players) {
    let token = tokenLayer.querySelector(`[data-player-id="${player.id}"]`);
    if (!token) {
      token = document.createElement("span");
      token.className = "map-token";
      token.dataset.playerId = player.id;
      token.innerHTML = '<img class="map-token-image" alt="">';
      tokenLayer.append(token);
    }

    const [col, row] = parseCell(player.position);
    const stack = stackByPosition[player.position];
    const stackIndex = stack.indexOf(player.id);
    const offsets = [
      [-13, -13],
      [13, -13],
      [-13, 13],
      [13, 13],
    ];
    const [offsetX, offsetY] = offsets[stackIndex] || [0, 0];

    token.style.left = `${((col + 0.5) / boardCols) * 100}%`;
    token.style.top = `${((row + 0.5) / boardRows) * 100}%`;
    token.style.setProperty("--player-color", player.color);
    token.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    token.title = player.name;
    const image = token.querySelector(".map-token-image");
    if (image) {
      image.src = player.token;
      image.alt = player.name;
    }
    token.classList.toggle("active", player.id === state.activePlayer);
    token.classList.toggle("turn-active", isPlayerTurnActive(player));
    token.classList.toggle("moving", player.id === state.movingPlayerId);
  }
}

function isPlayerTurnActive(player) {
  return (
    player.id === state.activePlayer &&
    !state.finished &&
    !state.pendingCardChoice &&
    !state.pendingChoice
  );
}

function renderScores() {
  scoreStripEl.innerHTML = "";
  const compactBonusLabels = isPhoneLayout();
  for (const player of state.players) {
    const battleBonus = playerBattleBonus(player);
    const rageBonus = nextMonsterBattleBonus(player);
    const curseStatus = nextBattlePenaltyStatus(player);
    const badExtraStatus = nextBadExtraDrawStatus(player);
    const stepBonus = playerStepBonus(player);
    const card = document.createElement("article");
    card.className = `score-card ${player.id === state.activePlayer ? "active" : ""}`;
    card.style.setProperty("--player-color", player.color);
    card.innerHTML = `
      <div class="score-name">
        <span class="score-player-avatar">
          <img src="${player.token}" alt="" aria-hidden="true">
          <small class="score-bot-badge ${isBot(player) ? "" : "is-empty"}" title="${isBot(player) ? "Бот" : ""}">${isBot(player) ? "Бот" : "Бот"}</small>
        </span>
        <span class="score-player-name">
          <strong>${player.name}</strong>
          ${stepBonus ? `<span class="score-bonus score-step-bonus" title="Шаги">${stepBonusText(stepBonus, compactBonusLabels)}</span>` : ""}
          ${battleBonus ? `<span class="score-battle-bonus" title="Сила">${battleForceText(battleBonus, compactBonusLabels)}</span>` : ""}
          ${rageBonus ? `<span class="score-rage-bonus" title="Зелье ярости: +${rageBonus} в следующей битве с монстром">Зелье +${rageBonus}</span>` : ""}
          ${curseStatus ? `<span class="score-curse-bonus" title="Сглаз сработает в следующем бою">${nextBattlePenaltyText(curseStatus, true)}</span>` : ""}
          ${badExtraStatus ? `<span class="score-curse-bonus" title="Следующая карта Плохо даст еще одну">${nextBadExtraDrawText(badExtraStatus, true)}</span>` : ""}
          ${playerArtifactBadges(player)}
        </span>
      </div>
      <span class="score-cell-ribbon">${iconizeHtml(tileTitle(player.position))}</span>
      <div class="score-stats">
        <span>${coinAmount(player.coins)}</span>
        <span>${diceAmount(`+${playerDiceBonus(player)}`)}</span>
      </div>
      <div class="score-shop">
        <span>Лавка Джо</span>
        <div>${renderShopBadges(player)}</div>
      </div>
    `;
    scoreStripEl.append(card);
  }
}

function phoneControllersEnabled() {
  return Boolean(ui.usePhoneControllers?.checked);
}

function phonePlayerSnapshot(player) {
  return {
    battleBonus: playerBattleBonus(player),
    bot: Boolean(player.bot),
    coins: player.coins,
    color: player.color,
    diceBonus: playerDiceBonus(player),
    id: player.id,
    isActive: player.id === currentPlayer()?.id && !state.finished,
    items: groupedShopItems(player.items).map(({ count, item }) => ({
      count,
      id: item.id,
      shortTitle: item.shortTitle || item.title,
      title: item.title,
    })),
    artifacts: playerArtifacts(player),
    name: player.name,
    nextMonsterBattleBonus: nextMonsterBattleBonus(player),
    nextBadExtraDraw: nextBadExtraDrawStatus(player),
    nextBattlePenalty: nextBattlePenaltyStatus(player),
    position: player.position,
    positionLabel: cellLabel(player.position),
    stepBonus: playerStepBonus(player),
    tileTitle: tileTitle(player.position),
    token: player.token,
    totalDice: totalDiceForPlayer(player),
  };
}

function phoneGameSnapshot() {
  if (!state?.players?.length) return null;
  return {
    activePlayerId: currentPlayer()?.id ?? null,
    availableActions: Object.fromEntries(state.players.map((player) => [player.id, phoneActionsForPlayer(player)])),
    board: activeBoardConfig?.id || null,
    cardPreview: phoneCardPreviewSnapshot(),
    controllerMode: phoneRoom.mode,
    diceVisible: phoneRoom.diceVisible,
    diceRoll: phoneDiceRollSnapshot(),
    eventMonsterRage: monsterRageBonus(),
    finished: Boolean(state.finished),
    players: state.players.map(phonePlayerSnapshot),
    rollContext: actionPromptRollContextSnapshot(),
    round: state.round,
    shakeEnabled: phoneRoom.shakeEnabled,
    turnLabel: actionPromptResolver ? actionPromptButtonLabel : ui.rollBtn?.textContent?.trim() || "Бросить",
    updatedAt: Date.now(),
  };
}

function actionPromptRollContextSnapshot() {
  if (!actionPromptRollContext) return null;
  const context = normalizeRollContext(actionPromptRollContext);
  if (!context) return null;
  return {
    criterion: plainText(context.criterion || ""),
    kicker: plainText(context.kicker || ""),
    participants: context.participants.map(plainText),
    reason: plainText(context.reason || ""),
    result: plainText(context.result || ""),
    title: plainText(context.title || ""),
  };
}

function phoneCardPreviewSnapshot() {
  const preview = state?.phoneCardPreview;
  if (!preview?.card) return null;
  return {
    deck: preview.deck || "",
    description: plainText(cardDisplayText(preview.card)),
    playerId: preview.playerId ?? null,
    revealed: Boolean(preview.revealed),
    title: plainText(preview.card.title || preview.card.shortTitle || ""),
  };
}

function setPhoneCardPreview(player, deck, card, revealed) {
  if (!state) return;
  state.phoneCardPreview = {
    card,
    deck,
    playerId: player?.id ?? null,
    revealed,
  };
  render();
}

function clearPhoneCardPreview() {
  if (!state?.phoneCardPreview) return;
  state.phoneCardPreview = null;
  render();
}

function phoneDiceRollSnapshot() {
  const roll = state?.phoneDiceRoll;
  if (!roll) return null;
  return {
    bonus: roll.bonus || 0,
    count: roll.count || (Array.isArray(roll.rolls) ? roll.rolls.length : 0),
    label: roll.label || "",
    playerId: roll.playerId ?? null,
    rolling: Boolean(roll.rolling),
    rolls: Array.isArray(roll.rolls) ? roll.rolls : [],
    total: roll.total ?? null,
    updatedAt: roll.updatedAt || Date.now(),
  };
}

function setPhoneDiceRoll({ bonus = 0, label = "", player = null, rolling = false, rolls = [], total = null } = {}) {
  if (!state) return;
  window.clearTimeout(phoneDiceRollClearTimer);
  const visibleRolls = rolling ? [] : rolls;
  state.phoneDiceRoll = {
    bonus,
    count: rolls.length || 1,
    label,
    playerId: player?.id ?? currentPlayer()?.id ?? null,
    rolling,
    rolls: visibleRolls,
    total,
    updatedAt: Date.now(),
  };
  render();
  if (!rolling) {
    phoneDiceRollClearTimer = window.setTimeout(clearPhoneDiceRoll, 2200);
  }
}

function clearPhoneDiceRoll() {
  window.clearTimeout(phoneDiceRollClearTimer);
  if (!state?.phoneDiceRoll) return;
  state.phoneDiceRoll = null;
  render();
}

function phoneActionsForPlayer(player) {
  if (!player || isBot(player) || state.finished) return [];
  if (state.pendingPreRoll?.playerId === player.id) {
    return [
      {
        id: "yes",
        kind: "preroll",
        label: "Заплатить",
        note: state.pendingPreRoll.card?.shortTitle || state.pendingPreRoll.card?.title || "+1 кубик",
      },
      {
        id: "no",
        kind: "preroll",
        label: "Не платить",
        note: "оставить бросок как есть",
      },
    ];
  }

  if (state.pendingShop?.playerId === player.id) {
    return [
      ...state.pendingShop.offer.map((card) => ({
        id: card.id,
        kind: "shop",
        label: cardDisplayText(card),
        note: "5 монет",
      })),
      {
        id: "decline",
        kind: "shop",
        label: "Отказаться",
        note: "0 монет",
      },
    ];
  }

  if (state.pendingCardChoice?.playerId === player.id && !state.pendingCardChoice.previewField) {
    return state.pendingCardChoice.choices.map((choice) => ({
      contextKicker: plainText(state.pendingCardChoice.kicker || ""),
      contextSummary: plainText(state.pendingCardChoice.summary || ""),
      contextTitle: plainText(state.pendingCardChoice.title || ""),
      disabled: Boolean(choice.disabled),
      displayKind: phoneCardChoiceDisplayKind(state.pendingCardChoice, choice),
      id: choice.id,
      kind: "card-choice",
      label: plainText(choice.label),
      note: plainText(choice.note || ""),
      noteClass: choice.noteClass || "",
      ownerColor: choice.ownerColor || "",
      ownerName: choice.ownerName || "",
      ownerToken: choice.ownerToken || "",
      price: choice.price ?? null,
    }));
  }

  if (state.pendingChoice?.playerId === player.id && !state.pendingChoice.previewField) {
    return state.pendingChoice.choices.map((choice) => ({
      id: choice.cell,
      kind: "board-choice",
      label: plainText(choice.label),
      note: plainText(choice.note || `клетка ${cellLabel(choice.cell)}`),
    }));
  }

  if (actionPromptChoiceOptions.length > 0 && actionPromptAutoPlayerId === player.id) {
    return actionPromptChoiceOptions.map((choice) => ({
      displayKind: choice.displayKind || "",
      id: choice.id,
      kind: "prompt-choice",
      label: plainText(choice.label),
      note: plainText(choice.note || ""),
    }));
  }

  if (actionPromptResolver && (actionPromptAutoPlayerId === player.id || (actionPromptAutoPlayerId === null && player.id === currentPlayer()?.id))) {
    const rollContextNote = phoneRollContextNote();
    return [
      {
        id: "continue",
        kind: "roll",
        label: actionPromptButtonLabel,
        note: rollContextNote || "подтвердить на большом экране",
      },
    ];
  }

  if (player.id === currentPlayer()?.id && !ui.rollBtn?.disabled) {
    return [
      {
        id: "roll",
        kind: "roll",
        label: ui.rollBtn?.textContent?.trim() || "Бросить",
        note: "основное действие",
      },
    ];
  }

  return [];
}

function phoneRollContextNote() {
  const context = actionPromptRollContextSnapshot();
  if (!context) return "";
  return context.result || context.criterion || context.reason || context.title || "";
}

function phoneCardChoiceDisplayKind(pending, choice) {
  if (choice?.displayKind) return choice.displayKind;
  if (pending?.displayKind) return pending.displayKind;
  if (String(choice?.id || "") === "decline") return "";
  const kind = String(pending?.kind || "");
  const buttonsClass = String(pending?.buttonsClass || "");
  const title = plainText(pending?.title || "");
  if (choice?.noteClass === "choice-player-note" && title.includes("Лавка Джо")) {
    return "shop-card-owner";
  }
  if (
    kind === "joe-auction-prize" ||
    buttonsClass.includes("auction-prize-buttons") ||
    buttonsClass.includes("shop-buttons") ||
    title.includes("Лавка Джо")
  ) {
    return "shop-card";
  }
  return "";
}

function plainText(html) {
  const container = document.createElement("span");
  container.innerHTML = String(html || "");
  return container.textContent.trim();
}

function renderPhoneRoomPanel() {
  const panel = document.querySelector(".phone-room-panel");
  if (!panel) return;

  const enabled = phoneControllersEnabled();
  panel.hidden = !enabled;
  if (!enabled) {
    if (ui.phoneRoomStatus) ui.phoneRoomStatus.textContent = "Телефонный режим выключен";
    return;
  }

  if (ui.createPhoneRoomBtn) {
    ui.createPhoneRoomBtn.disabled = phoneRoom.inFlight;
    ui.createPhoneRoomBtn.textContent = phoneRoom.code ? "Пересоздать комнату" : "Создать комнату";
  }
  if (ui.phoneRoomMode && !phoneRoom.code) ui.phoneRoomMode.value = selectedPhoneRoomMode();

  if (!phoneRoom.code) {
    if (ui.phoneRoomStatus) ui.phoneRoomStatus.textContent = "Комната не создана";
    if (ui.phoneRoomDetails) ui.phoneRoomDetails.hidden = true;
    return;
  }

  const modeLabel = phoneRoom.mode === "big-button" ? "Большая кнопка" : "Полный контроллер";
  const shakeLabel = phoneRoom.shakeEnabled ? ", шейк" : "";
  const diceLabel = phoneRoom.diceVisible ? "" : ", без кубиков";
  if (ui.phoneRoomStatus) {
    ui.phoneRoomStatus.textContent = `Комната ${phoneRoom.code}: телефонов ${phoneRoom.controllers.length}, ${modeLabel}${shakeLabel}${diceLabel}`;
  }
  if (ui.phoneRoomDetails) ui.phoneRoomDetails.hidden = false;
  if (ui.phoneRoomCode) ui.phoneRoomCode.textContent = phoneRoom.code;
  const fallbackJoinUrl = `${window.location.origin}/controller.html?room=${phoneRoom.code}`;
  const phoneJoinUrl = phoneRoom.joinUrl || fallbackJoinUrl;
  if (ui.phoneRoomUrl) ui.phoneRoomUrl.value = phoneJoinUrl;
  if (ui.copyPhoneRoomUrlBtn) ui.copyPhoneRoomUrlBtn.disabled = !phoneJoinUrl;
  if (ui.phoneRoomUrlHint) {
    const localUrl = phoneRoom.localJoinUrl || fallbackJoinUrl;
    const showLocalDebug = isLocalJoinUrl(localUrl) && localUrl !== phoneJoinUrl;
    ui.phoneRoomUrlHint.innerHTML = showLocalDebug
      ? `Откройте на телефоне в той же Wi-Fi сети. Локально: <code>${escapeHtml(localUrl)}</code>`
      : "Откройте на телефоне в той же Wi-Fi сети.";
  }
  if (ui.phoneRoomControllers) {
    const controllerNames = phoneRoom.controllers
      .map((controller) => controller.playerName || `Игрок ${controller.playerId + 1}`)
      .join(", ");
    ui.phoneRoomControllers.textContent = controllerNames ? `Подключены: ${controllerNames}` : "Телефоны пока не подключены";
  }
}

async function createPhoneRoom() {
  if (!phoneControllersEnabled()) {
    if (ui.usePhoneControllers) ui.usePhoneControllers.checked = true;
  }
  phoneRoom.inFlight = true;
  renderPhoneRoomPanel();
  try {
    await closeCurrentPhoneRoom({ silent: true });
    const response = await fetchJson("/api/rooms", {
      body: JSON.stringify({
        diceVisible: phoneRoomDiceVisible(),
        mode: selectedPhoneRoomMode(),
        shakeEnabled: phoneRoomShakeEnabled(),
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    if (!response.ok) throw new Error(response.error || "room-create-failed");
    applyPhoneRoom(response.room, response.hostId);
    connectPhoneHostEvents();
    publishPhoneSnapshot({ force: true });
    log(`Создана комната для телефонов: <strong>${phoneRoom.code}</strong>.`, { toast: true });
  } catch {
    if (ui.phoneRoomStatus) ui.phoneRoomStatus.textContent = "Не удалось создать комнату. Проверь сервер.";
  } finally {
    phoneRoom.inFlight = false;
    renderPhoneRoomPanel();
  }
}

async function closeCurrentPhoneRoom({ silent = false } = {}) {
  if (!phoneRoom.code || !phoneRoom.hostId) return;
  const code = phoneRoom.code;
  const hostId = phoneRoom.hostId;
  stopPhoneRoomEvents();
  resetPhoneRoomState();
  if (!silent) renderPhoneRoomPanel();
  await fetchJson(`/api/rooms/${encodeURIComponent(code)}/close`, {
    body: JSON.stringify({ hostId }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
}

function resetPhoneRoomState() {
  phoneRoom.code = null;
  phoneRoom.controllers = [];
  phoneRoom.hostId = null;
  phoneRoom.inFlight = false;
  phoneRoom.joinUrl = "";
  phoneRoom.lanUrls = [];
  phoneRoom.localJoinUrl = "";
  phoneRoom.lastSnapshotJson = "";
  phoneRoom.diceVisible = phoneRoomDiceVisible();
  phoneRoom.mode = selectedPhoneRoomMode();
  phoneRoom.shakeEnabled = phoneRoomShakeEnabled();
  if (ui.phoneRoomUrl) ui.phoneRoomUrl.value = "";
  if (ui.phoneRoomCode) ui.phoneRoomCode.textContent = "-";
  if (ui.phoneRoomUrlHint) ui.phoneRoomUrlHint.textContent = "";
  if (ui.copyPhoneRoomUrlBtn) {
    ui.copyPhoneRoomUrlBtn.disabled = true;
    ui.copyPhoneRoomUrlBtn.textContent = "Скопировать ссылку";
  }
}

function applyPhoneRoom(room, hostId = null) {
  if (!room) return;
  phoneRoom.code = room.code;
  phoneRoom.controllers = room.controllers || [];
  phoneRoom.hostId = hostId || phoneRoom.hostId;
  phoneRoom.lanUrls = Array.isArray(room.lanUrls) ? room.lanUrls : [];
  phoneRoom.localJoinUrl = room.joinUrl || `${window.location.origin}/controller.html?room=${room.code}`;
  phoneRoom.joinUrl = pickBestPhoneJoinUrl(phoneRoom.lanUrls, phoneRoom.localJoinUrl, room.code);
  if ("diceVisible" in room) {
    phoneRoom.diceVisible = room.diceVisible !== false;
    if (ui.phoneRoomDice) ui.phoneRoomDice.checked = phoneRoom.diceVisible;
  }
  phoneRoom.mode = normalizePhoneRoomMode(room.mode);
  phoneRoom.shakeEnabled = Boolean(room.shakeEnabled);
}

function pickBestPhoneJoinUrl(lanUrls = [], localJoinUrl = "", code = "") {
  const candidates = [...new Set(lanUrls.filter(Boolean))];
  const privateLan = candidates.find(isPrivateLanJoinUrl);
  if (privateLan) return privateLan;

  const nonLocalLan = candidates.find((url) => !isLocalJoinUrl(url));
  if (nonLocalLan) return nonLocalLan;

  return localJoinUrl || `${window.location.origin}/controller.html?room=${code}`;
}

function isPrivateLanJoinUrl(url) {
  try {
    const host = new URL(url, window.location.origin).hostname;
    return (
      /^192\.168\.\d{1,3}\.\d{1,3}$/.test(host) ||
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host) ||
      /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(host)
    );
  } catch {
    return false;
  }
}

function isLocalJoinUrl(url) {
  try {
    const host = new URL(url, window.location.origin).hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "::1";
  } catch {
    return false;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function connectPhoneHostEvents() {
  if (!phoneRoom.code) return;
  phoneRoom.eventSource?.close();
  phoneRoom.eventSource = new EventSource(`/api/rooms/${encodeURIComponent(phoneRoom.code)}/events?role=host`);
  phoneRoom.eventSource.addEventListener("room", (event) => {
    applyPhoneRoom(parseSseData(event));
    renderPhoneRoomPanel();
  });
  phoneRoom.eventSource.addEventListener("controller-action", (event) => {
    if (!phoneControllersEnabled()) return;
    handlePhoneControllerAction(parseSseData(event));
  });
  phoneRoom.eventSource.onerror = () => {
    if (ui.phoneRoomStatus && phoneControllersEnabled()) ui.phoneRoomStatus.textContent = "Связь с телефонной комнатой потерялась";
  };
}

function parseSseData(event) {
  try {
    return JSON.parse(event.data || "{}");
  } catch {
    return {};
  }
}

function schedulePhoneSnapshot() {
  if (!phoneControllersEnabled() || !phoneRoom.code || !phoneRoom.hostId) return;
  window.clearTimeout(phoneRoom.snapshotTimer);
  phoneRoom.snapshotTimer = window.setTimeout(() => publishPhoneSnapshot(), 80);
}

async function publishPhoneSnapshot({ force = false } = {}) {
  if (!phoneControllersEnabled() || !phoneRoom.code || !phoneRoom.hostId) return;
  const snapshot = phoneGameSnapshot();
  if (!snapshot) return;
  const json = JSON.stringify(snapshot);
  if (!force && json === phoneRoom.lastSnapshotJson) return;
  phoneRoom.lastSnapshotJson = json;
  await fetchJson(`/api/rooms/${encodeURIComponent(phoneRoom.code)}/snapshot`, {
    body: JSON.stringify({ hostId: phoneRoom.hostId, snapshot }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  return { ...data, ok: response.ok };
}

function handlePhoneControllerAction(message) {
  const player = state.players.find((item) => item.id === Number(message.playerId));
  const action = message.action || {};
  if (!player) return;

  const allowed = phoneActionsForPlayer(player).find((item) => String(item.kind) === String(action.kind) && String(item.id) === String(action.id));
  if (!allowed || allowed.disabled) {
    log(`Телефон ${playerName(player)} отправил недоступное действие. Оно отклонено.`);
    publishPhoneSnapshot({ force: true });
    return;
  }

  if (action.kind === "roll") {
    triggerRollButtonAction();
  } else if (action.kind === "preroll") {
    resolvePreRollChoice(action.id === "yes");
  } else if (action.kind === "shop") {
    resolveShopChoice(action.id === "decline" ? null : action.id);
  } else if (action.kind === "card-choice") {
    resolveCardChoice(action.id);
  } else if (action.kind === "board-choice") {
    resolveChoice(action.id);
  } else if (action.kind === "prompt-choice") {
    actionPromptChoiceResolver?.(action.id);
  }
}

function stopPhoneRoomEvents() {
  phoneRoom.eventSource?.close();
  phoneRoom.eventSource = null;
  window.clearTimeout(phoneRoom.snapshotTimer);
}

async function copyPhoneRoomUrl() {
  const url = ui.phoneRoomUrl?.value || phoneRoom.joinUrl || "";
  if (!url) return;

  try {
    if (!navigator.clipboard?.writeText) throw new Error("clipboard-unavailable");
    await navigator.clipboard.writeText(url);
    setPhoneRoomCopyFeedback("Скопировано");
  } catch {
    selectPhoneRoomUrl();
    setPhoneRoomCopyFeedback("Выделено");
  }
}

function selectPhoneRoomUrl() {
  if (!ui.phoneRoomUrl) return;
  ui.phoneRoomUrl.focus();
  ui.phoneRoomUrl.select();
  ui.phoneRoomUrl.setSelectionRange?.(0, ui.phoneRoomUrl.value.length);
}

function setPhoneRoomCopyFeedback(label) {
  if (!ui.copyPhoneRoomUrlBtn) return;
  window.clearTimeout(phoneRoomCopyTimer);
  ui.copyPhoneRoomUrlBtn.textContent = label;
  phoneRoomCopyTimer = window.setTimeout(() => {
    if (ui.copyPhoneRoomUrlBtn) ui.copyPhoneRoomUrlBtn.textContent = "Скопировать ссылку";
  }, 1300);
}

function renderHistory() {
  if (!gameHistoryEl || !state?.history) return;

  const historyEnd = state.history.finishedAt || Date.now();
  const elapsed = formatDuration(historyEnd - state.history.startedAt);
  const finalSummary = renderFinalHistorySummary(state.history.finalSummary);
  const playerCards = state.players.map((player) => renderPlayerHistory(player)).join("");
  gameHistoryEl.innerHTML = `
    <div class="history-summary">
      <span><b>${elapsed}</b><small>время игры</small></span>
      <span><b>${state.history.tadamPlayed}</b><small>ТАДАМ разыграно</small></span>
    </div>
    ${finalSummary}
    <div class="history-players">${playerCards}</div>
  `;
}

function renderFinalHistorySummary(summary) {
  if (!summary || !Array.isArray(summary.players)) return "";
  const rows = summary.players.map((player) => renderFinalHistoryPlayer(player)).join("");
  const outcomeLabel = summary.bossWon ? "Босс удержал победу" : "Игроки победили босса";
  const winnerRole = summary.winnerRole === "boss" ? "Босс" : "Игрок";
  return `
    <section class="history-final">
      <div class="history-final-head">
        <div>
          <h3>Итог партии</h3>
          <p>${outcomeLabel}. Победитель: <strong>${summary.winnerName}</strong> (${winnerRole}).</p>
        </div>
        <span><b>${summary.winnerScore}</b><small>счет победителя</small></span>
      </div>
      <div class="history-final-force">
        <span><b>${summary.playersForce}</b><small>сила игроков</small></span>
        <span><b>${summary.bossForce}</b><small>сила босса</small></span>
      </div>
      <div class="history-final-players">${rows}</div>
    </section>
  `;
}

function renderFinalHistoryPlayer(player) {
  const score = player.score || {};
  const force = player.force || {};
  const role = player.role === "boss" ? "Босс" : "Игрок";
  const scoreFormula = player.scoreFormula || finalScoreFormulaText(score);
  const forceParts = [
    force.rolled !== undefined ? `кубики ${force.rolled}` : "",
    force.bonus ? `бонус ${force.bonus}` : "",
    force.opponentBonus ? `противники ${force.opponentBonus}` : "",
  ].filter(Boolean);
  const rollText = Array.isArray(force.rolls) && force.rolls.length
    ? force.rolls.map((rolls) => `[${rolls.join(", ")}]`).join(" ")
    : "";
  const forceText = force.total === null || force.total === undefined ? "0" : String(force.total);
  return `
    <article class="history-final-player${player.winner ? " is-winner" : ""}" style="--player-color: ${player.color}">
      <div class="history-final-player-title">
        <strong>${player.name}</strong>
        <small>${role}${player.winner ? " · победитель" : ""}</small>
      </div>
      <dl class="history-final-stats">
        <div><dt>Очки</dt><dd>${score.total ?? 0}</dd></div>
        <div><dt>Монеты</dt><dd>${score.coins ?? 0}</dd></div>
        <div><dt>Лавки</dt><dd>${score.shop ?? 0}</dd></div>
        <div><dt>Урон</dt><dd>${score.damage ?? 0}</dd></div>
        <div><dt>Позиция</dt><dd>${score.position ?? 0}</dd></div>
        <div><dt>Сила</dt><dd>${forceText}</dd></div>
      </dl>
      <p class="history-final-score-text">${scoreFormula}</p>
      <p class="history-final-force-text">${forceParts.join(" + ") || "без бонусов"}${rollText ? ` · ${rollText}` : ""}</p>
    </article>
  `;
}

function finalScoreFormulaText(score = {}) {
  const total = score.total ?? 0;
  const coins = score.coins ?? 0;
  const shop = score.shop ?? 0;
  const damage = score.damage ?? 0;
  const position = score.position ?? 0;
  return `${total} = ${coins} монеты + ${shop} Лавка Джо + ${damage} урон боссу + ${position} позиция`;
}

function finalHistorySummaryForSnapshot() {
  return state?.history?.finalSummary || state?.finalBattle?.finalSummary || null;
}

function finalHistoryOutcomeText(summary) {
  if (!summary) return "";
  return summary.bossWon ? "Босс удержал победу" : "Игроки победили босса";
}

function finalHistoryRoleText(role) {
  if (!role) return "";
  return role === "boss" ? "Босс" : "Игрок";
}

function finalHistoryForceBreakdownText(force = {}) {
  const parts = [
    force.rolled !== undefined ? `кубики ${force.rolled}` : "",
    force.bonus ? `бонус ${force.bonus}` : "",
    force.opponentBonus ? `противники ${force.opponentBonus}` : "",
  ].filter(Boolean);
  const rollsText = Array.isArray(force.rolls) && force.rolls.length
    ? force.rolls.map((rolls) => `[${rolls.join(", ")}]`).join(" ")
    : "";
  return `${parts.join(" + ") || "без бонусов"}${rollsText ? ` · ${rollsText}` : ""}`;
}

function buildFinalHistorySheetExport(summary = finalHistorySummaryForSnapshot()) {
  const game = summary ? {
    finalBossForce: summary.bossForce ?? "",
    finalBossWon: Boolean(summary.bossWon),
    finalOutcome: summary.outcome || "",
    finalOutcomeText: finalHistoryOutcomeText(summary),
    finalPlayersForce: summary.playersForce ?? "",
    finalSummaryJson: JSON.stringify(summary),
    finalWinnerName: summary.winnerName || "",
    finalWinnerRole: finalHistoryRoleText(summary.winnerRole),
    finalWinnerRoleId: summary.winnerRole || "",
    finalWinnerScore: summary.winnerScore ?? "",
  } : {
    finalBossForce: "",
    finalBossWon: "",
    finalOutcome: "",
    finalOutcomeText: "",
    finalPlayersForce: "",
    finalSummaryJson: "",
    finalWinnerName: "",
    finalWinnerRole: "",
    finalWinnerRoleId: "",
    finalWinnerScore: "",
  };
  const playerSummaryById = new Map((summary?.players || []).map((player) => [player.id, player]));
  const players = state.players.map((player) => {
    const finalPlayer = playerSummaryById.get(player.id);
    const score = finalPlayer?.score || {};
    const force = finalPlayer?.force || {};
    return {
      finalBattleForce: force.total ?? "",
      finalForceBreakdown: finalPlayer ? finalHistoryForceBreakdownText(force) : "",
      finalForceJson: finalPlayer ? JSON.stringify(force) : "",
      finalRole: finalHistoryRoleText(finalPlayer?.role),
      finalRoleId: finalPlayer?.role || "",
      finalScoreBreakdown: finalPlayer?.scoreFormula || (finalPlayer ? finalScoreFormulaText(score) : ""),
      finalScoreCoins: score.coins ?? "",
      finalScoreDamage: score.damage ?? "",
      finalScoreDamageToBoss: score.damageToBoss ?? "",
      finalScoreJson: finalPlayer ? JSON.stringify(score) : "",
      finalScorePosition: score.position ?? "",
      finalScoreShop: score.shop ?? "",
      finalScoreTotal: score.total ?? "",
      finalWinner: finalPlayer ? Boolean(finalPlayer.winner) : "",
      playerId: player.id,
    };
  });
  return { game, players };
}

function renderPlayerHistory(player) {
  const history = playerHistory(player) || createPlayerHistory();
  const fields = renderHistoryPairs(history.fieldVisits, "нет");
  const monsters = renderMonsterHistory(history.monsterBattles);
  return `
    <article class="history-player" style="--player-color: ${player.color}">
      <div class="history-player-title">
        <span class="history-avatar"><img src="${player.token}" alt="" aria-hidden="true"></span>
        <strong>${player.name}</strong>
      </div>
      <dl class="history-stats">
        <div><dt>Ходы</dt><dd>${history.turns}</dd></div>
        <div><dt>Клетки</dt><dd>${history.cellsPassed}</dd></div>
        <div><dt>Монеты +</dt><dd>${history.coinsEarned}</dd></div>
        <div><dt>Монеты -</dt><dd>${history.coinsSpent}</dd></div>
        <div><dt>Макс. Лавок</dt><dd>${history.maxShopCards}</dd></div>
        <div><dt>Лавок сейчас</dt><dd>${player.items.length}</dd></div>
        <div><dt>Эффекты игроков</dt><dd>${history.effectsReceived}</dd></div>
        <div><dt>Макс. кубиков</dt><dd>${history.maxDiceThrown}</dd></div>
        <div><dt>Итоговая сила</dt><dd>${battleForceText(playerBattleBonus(player))}</dd></div>
        <div><dt>Итоговые шаги</dt><dd>${stepBonusText(playerStepBonus(player))}</dd></div>
      </dl>
      <div class="history-detail">
        <h3>Поля</h3>
        <p>${fields}</p>
      </div>
      <div class="history-detail">
        <h3>Монстры</h3>
        <p>${monsters}</p>
      </div>
    </article>
  `;
}

function renderHistoryPairs(data, emptyText) {
  const entries = Object.entries(data || {}).filter(([, count]) => count > 0);
  if (entries.length === 0) return emptyText;
  return entries
    .sort(([a], [b]) => a.localeCompare(b, "ru"))
    .map(([label, count]) => `<span>${label}: <b>${count}</b></span>`)
    .join("");
}

function renderMonsterHistory(monsters) {
  const entries = Object.entries(monsters || {});
  if (entries.length === 0) return "нет боев";
  return entries
    .map(([label, item]) => {
      const force = item.clearedForce === null ? "не пройден" : `пройден силой ${item.clearedForce}`;
      return `<span>${label}: <b>${item.attempts}</b> боев, ${force}</span>`;
    })
    .join("");
}

function buildGameHistorySnapshot() {
  const savedAt = new Date().toISOString();
  const historyEnd = state.history.finishedAt || Date.now();
  const finalSummary = finalHistorySummaryForSnapshot();
  const sheetExport = buildFinalHistorySheetExport(finalSummary);
  return cloneData({
    id: `game-${savedAt}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt,
    version: 2,
    settings: {
      current: collectGameSettings(),
      startedWith: state.gameSettings,
    },
    game: {
      activeBoard: activeBoardConfig.id,
      artifacts: state.artifacts,
      elapsedMs: historyEnd - state.history.startedAt,
      eventMonsterRage: monsterRageBonus(),
      finished: state.finished,
      finalBattle: state.finalBattle,
      finalSummary,
      ...sheetExport.game,
      round: state.round,
      turns: state.turns,
    },
    players: state.players.map((player) => {
      const finalPlayerFields = sheetExport.players.find((item) => item.playerId === player.id) || {};
      return {
        battleBonus: playerBattleBonus(player),
        bot: player.bot,
        coins: player.coins,
        diceBonus: playerDiceBonus(player),
        id: player.id,
        artifacts: playerArtifacts(player),
        items: player.items.map((item) => ({ id: item.id, title: item.title })),
        name: player.name,
        nextMonsterBattleBonus: nextMonsterBattleBonus(player),
        nextBadExtraDraw: nextBadExtraDrawStatus(player),
        nextBattlePenalty: nextBattlePenaltyStatus(player),
        position: player.position,
        stepBonus: playerStepBonus(player),
        ...finalPlayerFields,
      };
    }),
    history: state.history,
    sheetExport,
    chronicle: Array.from(gameLogEl?.children || []).map((item) => item.textContent.trim()),
  });
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function readSavedGames() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(savedGamesStorageKey) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveCurrentGameHistory() {
  if (!state?.history) return;
  const snapshot = buildGameHistorySnapshot();
  const savedGames = [snapshot, ...readSavedGames()].slice(0, 50);
  try {
    window.localStorage.setItem(savedGamesStorageKey, JSON.stringify(savedGames));
  } catch {
    flashSaveHistoryButton("Ошибка");
    showEventToast("Не удалось сохранить историю в браузере.");
    return;
  }

  flashSaveHistoryButton("Отправка");
  try {
    await sendGameHistoryToGoogleSheets(snapshot);
    flashSaveHistoryButton("Сохранено");
    showEventToast("История партии сохранена локально и отправлена в Google Таблицу.");
  } catch {
    flashSaveHistoryButton("Локально");
    showEventToast("История сохранена локально. В Google Таблицу отправить не удалось.");
  }
}

function sendGameHistoryToGoogleSheets(snapshot) {
  return window.fetch(googleSheetsSaveUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(snapshot),
  });
}

function flashSaveHistoryButton(text) {
  if (!ui.saveHistoryBtn) return;
  const defaultText = "Сохранить";
  ui.saveHistoryBtn.textContent = text;
  ui.saveHistoryBtn.disabled = true;
  window.setTimeout(() => {
    ui.saveHistoryBtn.textContent = defaultText;
    ui.saveHistoryBtn.disabled = false;
  }, 1300);
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function isPhoneLayout() {
  return phoneLayoutQuery.matches;
}

function renderShopBadges(player) {
  if (player.items.length === 0) return '<small>нет карт</small>';
  return groupedShopItems(player.items)
    .map(({ count, item }) => {
      const label = count > 1 ? `${shortShopTitle(item)} x${count}` : shortShopTitle(item);
      const title = count > 1 ? `${item.title} x${count}` : item.title;
      return `<small title="${title}">${iconizeHtml(label)}</small>`;
    })
    .join("");
}

function playerArtifactBadges(player) {
  return playerArtifacts(player)
    .map((artifact) => `
      <span class="score-artifact-badge" title="${artifact.title}: ${artifact.hint}">
        <img src="${artifact.icon}" alt="" aria-hidden="true">
        <span>${artifact.shortTitle}</span>
      </span>
    `)
    .join("");
}

function playerArtifacts(player) {
  if (!state?.artifacts || !player) return [];
  const artifacts = [];
  if (state.artifacts.magicWalletOwnerId === player.id) {
    artifacts.push({
      hint: "+5 монет в начале своего хода",
      icon: magicWalletIconSrc,
      id: "magic-wallet",
      shortTitle: "+5/ход",
      title: "Волшебный кошель",
    });
  }
  return artifacts;
}

function applyTurnStartArtifacts(player) {
  if (!player || state?.artifacts?.magicWalletOwnerId !== player.id) return;
  addCoins(player, 5);
  log(`${playerName(player)} получает <strong>${coinAmount(5)}</strong> от артефакта <strong>Волшебный кошель</strong>.`, { toast: true });
}

function resolveMagicWalletOvertake(player, fromCell, toCell) {
  if (!player || !state?.artifacts) return;
  const owner = state.players.find((item) => item.id === state.artifacts.magicWalletOwnerId);
  if (!owner || owner.id === player.id) return;
  const ownerProgress = routeProgress(owner);
  const fromProgress = routeProgress({ position: fromCell });
  const toProgress = routeProgress({ position: toCell });
  if (fromProgress <= ownerProgress && toProgress > ownerProgress) {
    transferMagicWallet(player, `${playerName(player)} обгоняет ${playerName(owner)}`);
  }
}

function transferMagicWallet(target, reason = "") {
  if (!target || !state?.artifacts) return false;
  const previous = state.players.find((player) => player.id === state.artifacts.magicWalletOwnerId);
  if (previous?.id === target.id) {
    log(`<strong>Волшебный кошель</strong> остается у ${playerName(target)}.`, { toast: true });
    return false;
  }
  state.artifacts.magicWalletOwnerId = target.id;
  const reasonText = reason ? `${reason}. ` : "";
  const previousText = previous ? ` от ${playerName(previous)}` : "";
  log(`${reasonText}<strong>Волшебный кошель</strong> переходит${previousText} к ${playerName(target)}.`, { toast: true });
  render();
  return true;
}

function groupedShopItems(items) {
  const groups = new Map();
  for (const item of items) {
    const key = item.id || item.title;
    const group = groups.get(key);
    if (group) {
      group.count += 1;
    } else {
      groups.set(key, { count: 1, item });
    }
  }
  return [...groups.values()];
}

function shortShopTitle(item) {
  return item.shortTitle || item.title;
}

function cardDisplayText(card) {
  return card.description || card.text || card.effectText || card.body || card.title || "";
}

function renderTurn() {
  const player = currentPlayer();
  if (ui.activePlayerName) {
    ui.activePlayerName.textContent = player.name;
  }
  const itemText = player.items.length ? ` Лавка: ${player.items.map((item) => item.title).join(", ")}.` : "";
  const rageText = nextMonsterBattleBonus(player) ? ` Зелье ярости: +${nextMonsterBattleBonus(player)} к следующему монстру.` : "";
  const curseStatus = nextBattlePenaltyStatus(player);
  const curseText = curseStatus ? ` ${nextBattlePenaltyText(curseStatus)}.` : "";
  const badExtraStatus = nextBadExtraDrawStatus(player);
  const badExtraText = badExtraStatus ? ` ${nextBadExtraDrawText(badExtraStatus)}.` : "";
  const artifactText = playerArtifacts(player).length ? ` Артефакты: ${playerArtifacts(player).map((artifact) => artifact.title).join(", ")}.` : "";
  const monsterRageText = monsterRageBonus() ? ` Ярость монстров: +${monsterRageBonus()}.` : "";
  if (ui.activePlayerRole) {
    ui.activePlayerRole.innerHTML = iconizeHtml(`Клетка ${cellLabel(player.position)}. ${player.coins} монет.${itemText}${rageText}${curseText}${badExtraText}${artifactText}${monsterRageText}`);
  }
  ui.fieldEffect.innerHTML = fieldEffectText(player.position);
  ui.turnActions.className = `turn-actions ${state.pendingPreRoll ? "pending-action" : ""}`.trim();
  ui.turnActions.innerHTML = turnActionsText(player);
  ui.diceValue.textContent = state.dice ?? "-";
  ui.rollBtn.innerHTML = iconizeHtml(
    actionPromptResolver
      ? actionPromptButtonLabel
      : choiceFieldPreviewActive()
        ? "К выбору"
      : portalPreviewActive()
        ? "Портал"
        : state.isAnimating
          ? "Кубик крутится"
          : "Бросить кубик",
  );
  if (ui.roundTitle) {
    ui.roundTitle.textContent = state.finished ? "Игра завершена" : `Раунд ${state.round}`;
  }
  ui.rollBtn.disabled =
    !choiceFieldPreviewActive() &&
    (botControlsLocked() ||
      (!actionPromptResolver &&
        (state.finished ||
          state.isAnimating ||
          Boolean(state.pendingCardChoice) ||
          (Boolean(state.pendingChoice) && !portalPreviewActive()) ||
          Boolean(state.pendingPreRoll) ||
          Boolean(state.pendingShop))));
}

function renderMonsterRageIndicator() {
  if (!ui.monsterRageIndicator) return;
  const rage = monsterRageBonus();
  ui.monsterRageIndicator.hidden = rage <= 0;
  ui.monsterRageIndicator.textContent = rage > 0 ? `Ярость монстров +${rage}` : "";
}

function renderChoicePanel() {
  if (state.pendingPreRoll) {
    hideChoicePanel();
    return;
  }

  if (state.pendingShop) {
    const player = state.players.find((item) => item.id === state.pendingShop.playerId) || currentPlayer();
    const buttons = renderChoiceDialog({
      kind: "shop",
      kicker: "Лавка Джо",
      title: "Выбери карту за 5 монет",
      summary: `${playerChoiceBadge(player)}: ${player.coins} монет. Можно купить одну карту или пройти мимо.`,
      buttonsClass: "shop-buttons",
    });

    for (const card of state.pendingShop.offer) {
      appendChoiceButton(buttons, {
        className: "shop-choice choice-button-card",
        label: cardDisplayText(card),
        note: coinAmount(5),
        onClick: () => resolveShopChoice(card.id),
      });
    }

    appendChoiceButton(buttons, {
      className: "shop-choice decline",
      label: "Отказаться",
      note: coinAmount(0),
      onClick: () => resolveShopChoice(null),
    });
    return;
  }

  if (state.pendingCardChoice) {
    const pending = state.pendingCardChoice;
    if (pending.previewField) {
      hideChoicePanel();
      return;
    }

    const panelKind = pending.kind || "card-action";
    const buttons = renderChoiceDialog({
      kind: panelKind,
      kicker: pending.kicker,
      title: pending.title,
      summary: pending.summary,
      bodyHtml: pending.bodyHtml || "",
      buttonsClass: pending.buttonsClass || "",
    });

    for (const choice of pending.choices) {
      appendChoiceButton(buttons, {
        className: choice.className || "",
        disabled: Boolean(choice.disabled),
        label: choice.label,
        note: choice.note,
        noteClass: choice.noteClass || "",
        onClick: () => resolveCardChoice(choice.id),
      });
    }
    if (cardChoiceCanPreviewField(pending)) {
      appendChoiceButton(buttons, {
        className: "field-map-preview",
        label: "Показать поле",
        note: "вернуться кнопкой «К выбору»",
        onClick: () => setChoiceFieldPreviewMode(true),
      });
    }
    return;
  }

  if (!state.pendingChoice) {
    hideChoicePanel();
    return;
  }

  if (state.pendingChoice.kind === "portal") {
    if (state.pendingChoice.previewField) {
      hideChoicePanel();
      return;
    }

    const player = state.players.find((item) => item.id === state.pendingChoice.playerId) || currentPlayer();
    const buttons = renderChoiceDialog({
      kind: "portal",
      kicker: "Портал",
      title: "Куда переместиться?",
      summary: `${playerChoiceBadge(player)} стоит на открытом портале. Осталось ${state.pendingChoice.remaining} шага.`,
    });

    for (const choice of state.pendingChoice.choices) {
      appendChoiceButton(buttons, {
        className: choice.className || "",
        label: choice.label,
        note: choice.note,
        onClick: () => resolveChoice(choice.cell),
      });
    }
    appendChoiceButton(buttons, {
      className: "portal-map-preview",
      label: "Показать поле",
      note: "финиши хода",
      onClick: () => setPortalPreviewMode(true),
    });
    return;
  }

  if (state.pendingChoice.kind === "chaos-portal") {
    const player = state.players.find((item) => item.id === state.pendingChoice.playerId) || currentPlayer();
    const buttons = renderChoiceDialog({
      kind: "chaos-portal",
      kicker: "Портал хаоса",
      title: "Куда отправиться?",
      summary: `${playerChoiceBadge(player)} выбросил 6 и удерживает портал открытым.`,
    });

    for (const choice of state.pendingChoice.choices) {
      appendChoiceButton(buttons, {
        className: `chaos-portal-choice choice-${choice.id}`,
        label: choice.label,
        note: choice.note,
        onClick: () => resolveChoice(choice.cell),
      });
    }
    return;
  }

  const player = currentPlayer();
  const buttons = renderChoiceDialog({
    kind: "direction",
    kicker: "Развилка",
    title: "Куда идти дальше?",
    summary: `${playerChoiceBadge(player)}: клетка ${cellLabel(state.pendingChoice.currentCell)}. Осталось ${state.pendingChoice.remaining} шага.`,
  });

  for (const choice of state.pendingChoice.choices) {
    appendChoiceButton(buttons, {
      label: choice.label,
      note: `клетка ${cellLabel(choice.cell)}`,
      onClick: () => resolveChoice(choice.cell),
    });
  }
}

function renderWinnerPopup() {
  if (!ui.winnerPopup) return;

  if (!state.finished) {
    ui.winnerPopup.hidden = true;
    ui.winnerPopup.innerHTML = "";
    return;
  }

  const winner = findWinner();
  const confetti = Array.from(
    { length: 18 },
    (_, index) =>
      `<i style="--i: ${index}; --left: ${8 + index * 5}%; --hue: ${(index * 47) % 360}; --x: ${-34 + index * 4}px"></i>`,
  ).join("");
  ui.winnerPopup.hidden = false;
  const battle = state.finalBattle;
  const battleSummary = battle
    ? `<small>${battle.bossWon ? "Босс победил" : "Игроки победили"}: игроки ${battle.playersForce}, босс ${battle.bossForce}</small>`
    : "";
  ui.winnerPopup.innerHTML = `
    <div class="winner-confetti" aria-hidden="true">${confetti}</div>
    <div class="winner-card">
      <p>Победил - <span class="player-name" style="--player-color: ${winner.color}">${winner.name}</span>!</p>
      ${battleSummary}
    </div>
  `;
}

function renderFinalBattleHud() {
  if (!ui.finalBattleHud) return;

  const progress = state.finalBattleProgress;
  const enemyProgress = state.enemyBattleProgress;
  const vsProgress = state.vsBattleProgress;
  const unityProgress = state.unityBattleProgress;
  if (enemyProgress && !state.finished) {
    renderEnemyBattleHud(enemyProgress);
    return;
  }
  if (vsProgress && !state.finished) {
    renderVsBattleHud(vsProgress);
    return;
  }
  if (unityProgress && !state.finished) {
    renderUnityBattleHud(unityProgress);
    return;
  }

  if (!progress || state.finished) {
    ui.finalBattleHud.hidden = true;
    ui.finalBattleHud.className = "final-battle-hud";
    ui.finalBattleHud.innerHTML = "";
    return;
  }

  const boss = state.players.find((player) => player.id === progress.bossId);
  const challengers = state.players.filter((player) => player.id !== progress.bossId);
  const bossDisplayForce = progress.bossBonusApplied || progress.bossRollsStarted ? progress.bossForce : "?";
  ui.finalBattleHud.hidden = false;
  ui.finalBattleHud.className = "final-battle-hud";
  ui.finalBattleHud.innerHTML = `
    <div class="final-battle-side players">
      <span>Игроки</span>
      <div class="battle-strength-list">
        ${challengers.map((player) => playerBattleStrengthBadge(player, { showName: true })).join("")}
      </div>
      <strong>${progress.playersForce}</strong>
    </div>
    <div class="final-battle-vs">VS</div>
    <div class="final-battle-side boss" style="--player-color: ${boss?.color || "#ff7d5d"}">
      <span>Босс${boss ? ` - ${boss.name}` : ""}</span>
      ${boss ? playerBattleStrengthText(boss) : ""}
      <strong>${bossDisplayForce}</strong>
    </div>
  `;
}

function renderUnityBattleHud(progress) {
  const results = progress.results || {};
  const teamWon = progress.winner === "team";
  const monsterWon = progress.winner === "monster";
  const battleState = teamWon ? "is-victory" : monsterWon ? "is-defeat" : progress.isRolling ? "is-rolling" : "is-ready";
  const cards = state.players
    .map((participant) => {
      const result = results[participant.id];
      const isRolling = participant.id === progress.rollingPlayerId;
      const isComplete = result !== undefined;
      const force = isComplete ? result : "?";
      const status = isRolling ? "Бросает" : isComplete ? "Сила" : "Ждет";
      return `
        <div class="final-battle-side enemy-battle-side player vs-battle-card unity-battle-card ${isRolling ? "is-rolling" : ""} ${isComplete ? "is-complete" : ""}" style="--player-color: ${participant.color}">
          <span class="enemy-battle-portrait player-portrait">
            <img src="${participant.token}" alt="" aria-hidden="true">
          </span>
          <span class="enemy-battle-name">${participant.name}</span>
          ${playerBattleStrengthBadge(participant)}
          <small>${status}</small>
          <strong>${force}</strong>
        </div>
      `;
    })
    .join("");

  ui.finalBattleHud.hidden = false;
  ui.finalBattleHud.className = `final-battle-hud enemy-battle-hud vs-battle-hud unity-battle-hud ${battleState}`;
  ui.finalBattleHud.innerHTML = `
    <div class="enemy-battle-panel vs-battle-panel unity-battle-panel">
      <div class="vs-battle-header unity-battle-header">
        <div class="vs-battle-title">
          <span>Сплочение</span>
          <strong>Командная битва</strong>
        </div>
        <div class="vs-battle-emblem">Σ</div>
        <div class="vs-battle-pot">
          <span>Цель: сила ${progress.target}</span>
          <strong>${progress.teamTotal || 0} / ${progress.target}</strong>
        </div>
      </div>
      <div class="vs-battle-grid unity-battle-grid">
        ${cards}
      </div>
      <div class="final-battle-result enemy-battle-result ${progress.outcome ? "is-visible" : ""}">
        ${iconizeHtml(progress.outcome || `Команда собирает силу против цели ${progress.target}`)}
      </div>
    </div>
  `;
}

function renderVsBattleHud(progress) {
  const results = progress.results || {};
  const winnerId = progress.winnerId || null;
  const tiedIds = new Set(progress.tiedIds || []);
  const battleState = winnerId ? "is-victory" : progress.isRolling ? "is-rolling" : tiedIds.size ? "is-tie" : "is-ready";
  const activeIds = new Set(progress.contenderIds || []);
  const cards = state.players
    .map((participant) => {
      const isActive = activeIds.has(participant.id);
      const isWinner = participant.id === winnerId;
      const isTied = tiedIds.has(participant.id);
      const isRolling = participant.id === progress.rollingPlayerId;
      const force = results[participant.id] ?? "?";
      const status = isWinner ? "Победитель" : isRolling ? "Бросает" : isTied ? "Переигровка" : isActive ? "Сила" : "Ждет";
      return `
        <div class="final-battle-side enemy-battle-side player vs-battle-card ${isWinner ? "is-winning" : ""} ${isTied ? "is-tied" : ""} ${isRolling ? "is-rolling" : ""} ${isActive ? "" : "is-inactive"}" style="--player-color: ${participant.color}">
          <span class="enemy-battle-portrait player-portrait">
            <img src="${participant.token}" alt="" aria-hidden="true">
          </span>
          <span class="enemy-battle-name">${participant.name}</span>
          ${playerBattleStrengthBadge(participant)}
          <small>${status}</small>
          <strong>${force}</strong>
        </div>
      `;
    })
    .join("");

  ui.finalBattleHud.hidden = false;
  ui.finalBattleHud.className = `final-battle-hud enemy-battle-hud vs-battle-hud ${battleState}`;
  ui.finalBattleHud.innerHTML = `
    <div class="enemy-battle-panel vs-battle-panel">
      <div class="vs-battle-header">
        <div class="vs-battle-title">
          <span>VS-битва</span>
          <strong>Раунд ${progress.round}</strong>
        </div>
        <div class="vs-battle-emblem">VS</div>
        <div class="vs-battle-pot">
          <span>Банк</span>
          <strong>${coinAmount(progress.pot || 0)}</strong>
        </div>
      </div>
      <div class="vs-battle-grid">
        ${cards}
      </div>
      <div class="final-battle-result enemy-battle-result ${progress.outcome ? "is-visible" : ""}">
        ${iconizeHtml(progress.outcome || "Игроки бросают силу за общий банк")}
      </div>
    </div>
  `;
}

function clearEnemyBattleHud() {
  state.enemyBattleProgress = null;
  render();
}

function renderEnemyBattleHud(progress) {
  const player = state.players.find((item) => item.id === progress.playerId);
  const enemyIcon = progress.isFinalBoss ? finalEnemyIconSrc : enemyIconSrc;
  const enemyLabel = progress.isFinalBoss ? "Финальный монстр" : "Враг";
  const playerWon = progress.winner === "player";
  const enemyWon = progress.winner === "enemy";
  const battleState = playerWon ? "is-victory" : enemyWon ? "is-defeat" : progress.isRolling ? "is-rolling" : "is-ready";
  ui.finalBattleHud.hidden = false;
  ui.finalBattleHud.className = `final-battle-hud enemy-battle-hud ${battleState}`;
  ui.finalBattleHud.innerHTML = `
    <div class="enemy-battle-panel">
      <div class="enemy-battle-duel">
        <div class="final-battle-side enemy-battle-side player ${playerWon ? "is-winning" : ""}" style="--player-color: ${player?.color || "#65bdc2"}">
          <span class="enemy-battle-portrait player-portrait">
            ${player ? `<img src="${player.token}" alt="" aria-hidden="true">` : ""}
          </span>
          <span class="enemy-battle-name">${player?.name || "Игрок"}</span>
          ${player ? playerBattleStrengthBadge(player) : ""}
          <small>Итог броска</small>
          <strong>${progress.playerForce || "?"}</strong>
        </div>
        <div class="enemy-battle-center">
          <div class="final-battle-vs">VS</div>
        </div>
        <div class="final-battle-side enemy-battle-side monster ${enemyWon ? "is-winning" : ""}">
          <span class="enemy-battle-portrait">
            <img src="${enemyIcon}" alt="" aria-hidden="true">
          </span>
          <span class="enemy-battle-name">${enemyLabel}</span>
          <small>Порог победы</small>
          <strong>${progress.enemyForce}</strong>
        </div>
      </div>
      <div class="final-battle-result enemy-battle-result ${progress.winner ? "is-visible" : ""}">
        ${iconizeHtml(progress.outcome || "Брось кубики, чтобы определить силу игрока")}
      </div>
    </div>
  `;
}

function playerBattleStrengthBadge(player, { showName = false } = {}) {
  const name = showName ? `${player.name} ` : "";
  return `<span class="battle-strength-badge" title="Сила игрока">${name}${battleForceText(playerBattleBonus(player))}</span>`;
}

function playerBattleStrengthText(player, { showName = false } = {}) {
  const name = showName ? `${player.name} ` : "";
  return `<span class="battle-strength-text" title="Сила игрока">${name}${battleForceText(playerBattleBonus(player))}</span>`;
}

function renderChoiceDialog({ bodyHtml = "", buttonsClass = "", kind, kicker, title, summary }) {
  ui.choicePanel.hidden = false;
  ui.choicePanel.className = `choice-panel choice-panel-${kind}`;
  ui.choicePanel.setAttribute("aria-label", title);
  ui.choicePanel.innerHTML = "";

  const dialog = document.createElement("div");
  dialog.className = "choice-dialog";

  const copy = document.createElement("div");
  copy.className = "choice-copy";

  const kickerEl = document.createElement("p");
  kickerEl.className = "choice-kicker";
  kickerEl.textContent = kicker;

  const titleEl = document.createElement("h3");
  titleEl.innerHTML = iconizeHtml(title);

  const summaryEl = document.createElement("p");
  summaryEl.className = "choice-summary";
  summaryEl.innerHTML = iconizeHtml(summary);

  const bodyEl = document.createElement("div");
  bodyEl.className = "choice-body";
  bodyEl.innerHTML = iconizeHtml(bodyHtml);

  const buttons = document.createElement("div");
  buttons.className = `choice-buttons ${buttonsClass}`.trim();

  copy.append(kickerEl, titleEl, summaryEl);
  if (bodyHtml) copy.append(bodyEl);
  dialog.append(copy, buttons);
  ui.choicePanel.append(dialog);

  return buttons;
}

function appendChoiceButton(buttons, { className = "", disabled = false, label, note, noteClass = "", onClick }) {
  const button = document.createElement("button");
  button.className = `choice-button ${className}`.trim();
  button.disabled = Boolean(disabled);
  button.type = "button";

  const labelEl = document.createElement("b");
  labelEl.innerHTML = iconizeHtml(label);

  button.append(labelEl);
  if (note) {
    const noteEl = document.createElement("span");
    noteEl.className = noteClass;
    noteEl.innerHTML = iconizeHtml(note);
    button.append(noteEl);
  }

  if (!button.disabled) button.addEventListener("click", onClick);
  buttons.append(button);
}

function hideChoicePanel() {
  ui.choicePanel.hidden = true;
  ui.choicePanel.className = "choice-panel";
  ui.choicePanel.removeAttribute("aria-label");
  ui.choicePanel.innerHTML = "";
}

function resolveChoice(nextCell) {
  if (!state.choiceResolver) return;
  if (!state.pendingChoice?.choices.some((choice) => choice.cell === nextCell)) return;
  state.choiceResolver(nextCell);
  render();
}

function portalPreviewActive() {
  return Boolean(state?.pendingChoice?.kind === "portal" && state.pendingChoice.previewField);
}

function setPortalPreviewMode(enabled) {
  if (state?.pendingChoice?.kind !== "portal") return;
  state.pendingChoice.previewField = Boolean(enabled);
  render();
}

function choiceFieldPreviewActive() {
  return Boolean(state?.pendingCardChoice?.previewField);
}

function setChoiceFieldPreviewMode(enabled) {
  if (!state?.pendingCardChoice || !cardChoiceCanPreviewField(state.pendingCardChoice)) return;
  state.pendingCardChoice.previewField = Boolean(enabled);
  render();
}

function cardChoiceCanPreviewField(pending) {
  return Boolean(
    pending?.canPreviewField ||
    pending?.choices?.some((choice) =>
      String(choice.label || "").includes("choice-player-badge") ||
      String(choice.note || "").includes("choice-player-badge") ||
      choice.noteClass === "choice-player-note",
    ),
  );
}

function resolveShopChoice(cardId) {
  if (!state.shopResolver) return;
  state.shopResolver(cardId);
  render();
}

function resolvePreRollChoice(useExtraDie) {
  if (!state.preRollResolver) return;
  state.preRollResolver(useExtraDie);
  render();
}

function resolveCardChoice(choiceId) {
  if (!state.cardChoiceResolver) return;
  const choice = state.pendingCardChoice?.choices.find((item) => String(item.id) === String(choiceId));
  if (choice?.disabled) return;
  state.cardChoiceResolver(choiceId);
  render();
}

async function resolveLanding(player) {
  if (state.eventDepth > 5) return;

  recordPlayerStopped(player);
  const event = cellEvents[player.position];
  if (!event) return;

  const landedPosition = player.position;
  state.eventDepth += 1;
  try {
    if (event === "green") {
      await resolveGreenField(player);
    } else if (event === "red") {
      await resolveRedField(player);
    } else if (event === "good") {
      await drawAndApplyCard(player, "good", "Хорошо");
    } else if (event === "bad") {
      await drawAndApplyCard(player, "bad", "Плохо");
    } else if (event === "very-bad") {
      for (let index = 0; index < 3; index += 1) {
        await drawAndApplyCard(player, "bad", "Плохо");
      }
    } else if (event === "event") {
      await drawAndApplyCard(player, "event", "Событие");
    } else if (event === "big-rest") {
      await resolveBigRest(player);
    } else if (event === "black-market") {
      await resolveBlackMarket(player);
    } else if (event === "chaos-portal") {
      await resolveChaosPortal(player);
    } else if (event === "tadam") {
      await drawTadamCard(player);
    } else if (event === "shop") {
      await resolveShop(player);
    } else if (event === "joe-auction") {
      await resolveJoeAuction(player);
    } else if (event === "joe-game") {
      await resolveJoeGame(player);
    } else if (event === "enemy") {
      await resolveEnemyBattle(player);
    } else if (event === "dice-fortune") {
      await resolveDiceFortuneField(player);
    } else if (event === "pay-double") {
      await resolvePayDoubleField(player);
    } else if (event === "vs") {
      await resolveVsField(player);
    }

    if (player.position === landedPosition) {
      await resolveLandSteal(player);
    }
  } finally {
    state.eventDepth -= 1;
  }
}

function bigRestChoices() {
  return [
    {
      id: "recover",
      label: "Восстановиться",
      note: "+10 монет",
    },
    {
      id: "train",
      label: "Потренироваться",
      note: "+1 силе",
    },
    {
      id: "speed",
      label: "Ускориться",
      note: "+2 к шагам",
    },
  ];
}

async function resolveBigRest(player) {
  const choice = await chooseCardAction({
    buttonsClass: "big-rest-buttons",
    choices: bigRestChoices(),
    kicker: "Большой привал",
    kind: "big-rest",
    playerId: player.id,
    summary: `${playerChoiceBadge(player)} может восстановиться, потренироваться или ускориться перед финальным рывком.`,
    title: "Большой привал. Выбери, как подготовиться к дороге.",
  });

  let message = "";
  if (choice === "train") {
    addBattleBonus(player, 1);
    message = `${playerName(player)} использует <strong>Большой привал</strong>: тренируется и получает <strong>+1 силе</strong>.`;
  } else if (choice === "speed") {
    addStepBonus(player, 2);
    message = `${playerName(player)} использует <strong>Большой привал</strong>: ускоряется и получает <strong>+2 к шагам</strong>.`;
  } else {
    addCoins(player, 10);
    message = `${playerName(player)} использует <strong>Большой привал</strong>: восстанавливается и получает <strong>${coinAmount(10)}</strong>.`;
  }

  render();
  log(message, { toast: true });
  await showActionPrompt(message, { autoFor: player });
}

function blackMarketChoices(player) {
  const rageActive = nextMonsterBattleBonus(player) > 0;
  const choices = [
    blackMarketChoice({
      cost: blackMarketShopCost,
      id: "shop-card",
      label: "Карта Лавки Джо",
      note: "Лавка Джо + Событие",
      player,
    }),
    blackMarketChoice({
      cost: blackMarketTrainingCost,
      id: "secret-training",
      label: "Тайная тренировка",
      note: "+1 к силе + Событие",
      player,
    }),
    blackMarketChoice({
      cost: blackMarketRageCost,
      disabledReason: rageActive ? "Зелье уже активно" : "",
      id: "rage-potion",
      label: "Зелье ярости",
      note: `+${blackMarketRageBonus} к монстру`,
      player,
    }),
  ];
  choices.push({
    className: "decline",
    id: "leave",
    label: "Уйти",
    note: coinAmount(0),
  });
  return choices;
}

function blackMarketChoice({ cost, disabledReason = "", id, label, note, player }) {
  const missing = Math.max(0, cost - player.coins);
  const disabled = Boolean(disabledReason) || missing > 0;
  return {
    className: disabled ? "unavailable" : "",
    disabled,
    id,
    label,
    note: disabledReason || (missing > 0 ? `Не хватает ${missing} монет` : `${coinAmount(cost)} • ${note}`),
  };
}

function blackMarketSummary(player) {
  const rage = nextMonsterBattleBonus(player);
  const activePotion = rage ? ` Активно: Зелье ярости даст +${rage} в следующей битве с монстром.` : "";
  return `${playerChoiceBadge(player)}: ${player.coins} монет. Платные сделки доступны только если хватает монет.${activePotion}`;
}

async function resolveBlackMarket(player) {
  log(`${playerName(player)} попадает на <strong>Черный рынок</strong>. Опасные сделки открыты.`);
  const choice = await chooseCardAction({
    buttonsClass: "black-market-buttons",
    choices: blackMarketChoices(player),
    kicker: "Черный рынок",
    kind: "black-market",
    playerId: player.id,
    summary: blackMarketSummary(player),
    title: "Черный рынок предлагает опасные сделки. Что покупаешь?",
  });

  if (choice === "shop-card") {
    addCoins(player, -blackMarketShopCost);
    log(`${playerName(player)} выбирает <strong>Карта Лавки Джо + Событие</strong> на Черном рынке и платит <strong>${coinAmount(blackMarketShopCost)}</strong>.`);
    await drawFreeShopCard(player, "получает на Черном рынке карту Лавка Джо");
    await drawAndApplyCard(player, "event", "Событие");
    return;
  }

  if (choice === "secret-training") {
    addCoins(player, -blackMarketTrainingCost);
    addBattleBonus(player, 1);
    const message = `${playerName(player)} выбирает <strong>Тайная тренировка + Событие</strong> на Черном рынке, платит <strong>${coinAmount(blackMarketTrainingCost)}</strong> и получает <strong>+1 к силе</strong>.`;
    render();
    log(message, { toast: true });
    await showActionPrompt(message, { autoFor: player });
    await drawAndApplyCard(player, "event", "Событие");
    return;
  }

  if (choice === "rage-potion") {
    addCoins(player, -blackMarketRageCost);
    setNextMonsterBattleBonus(player, blackMarketRageBonus);
    const message = `${playerName(player)} выбирает <strong>Зелье ярости</strong> на Черном рынке, платит <strong>${coinAmount(blackMarketRageCost)}</strong>. Следующая битва с монстром получит <strong>+${blackMarketRageBonus}</strong> к силе.`;
    render();
    log(message, { toast: true });
    await showActionPrompt(message, { autoFor: player });
    return;
  }

  const message = `${playerName(player)} уходит с <strong>Черного рынка</strong> без сделки.`;
  log(message, { toast: true });
  await showActionPrompt(message, { autoFor: player });
}

async function resolveEnemyBattle(player) {
  const door = doorByEnemyCell(player.position);
  if (!door || isDoorOpenForPlayer(door, player)) return false;
  const requiredStrength = effectiveMonsterStrength(door);

  state.enemyBattleProgress = {
    enemyForce: requiredStrength,
    outcome: `Нужно набрать силу ${monsterStrengthText(door)}`,
    isFinalBoss: Boolean(door.isFinalBoss),
    playerForce: 0,
    playerId: player.id,
    winner: null,
  };
  render();
  await showActionPrompt(
    `${playerName(player)} вступает в битву. Нужно набрать силу <strong>${monsterStrengthText(door)}</strong>, чтобы ${door.isFinalBoss ? "стать боссом" : `открыть ${door.label}`}.`,
    { autoFor: player },
  );

  const extraDice = await chooseExtraDie(player, true);
  const diceCount = totalDiceForPlayer(player, extraDice);
  const rolls = rollDice(diceCount);
  recordDiceThrown(player, diceCount);
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  const baseBonus = playerCombatBonus(player);
  const rageBonus = consumeNextMonsterBattleBonus(player);
  const curse = consumeNextBattlePenalty(player);
  const bonus = baseBonus + rageBonus + curse.penalty;
  if (rageBonus > 0) {
    log(`${playerName(player)} использует <strong>Зелье ярости</strong>: <strong>+${rageBonus}</strong> к этой битве с монстром. Зелье сгорает.`);
  }
  if (curse.penalty < 0) {
    log(`${playerName(player)} сбрасывает <strong>Сглаз</strong> (${curse.cards.length}): <strong>${curse.penalty}</strong> к этой битве.`, {
      toast: true,
    });
  }
  state.isAnimating = true;
  state.dice = null;
  state.enemyBattleProgress = {
    ...state.enemyBattleProgress,
    isRolling: true,
    outcome: `${player.name} бросает кубики`,
  };
  render();
  await animateDice(rolls, { bonus, player, isEnemyBattle: true });

  const damage = Math.max(0, rolled + bonus);
  recordMonsterBattle(player, door, damage, damage >= requiredStrength);
  state.dice = damage;
  state.isAnimating = false;

  const bonusText = monsterBattleBonusFormulaText(baseBonus, rageBonus, curse.penalty, damage);
  if (damage >= requiredStrength) {
    state.enemyBattleProgress = {
      bonus,
      enemyForce: requiredStrength,
      isFinalBoss: Boolean(door.isFinalBoss),
      outcome: door.isFinalBoss ? `${player.name} побеждает и становится боссом` : `${player.name} побеждает и получает +1 кубик`,
      playerForce: damage,
      playerId: player.id,
      rolled,
      rolls,
      winner: "player",
    };
    door.openedBy.push(player.id);
    if (door.isFinalBoss) {
      const monsterHuntReward = awardMonsterHuntReward(player);
      const monsterHuntText = monsterHuntRewardText(monsterHuntReward);
      log(`${playerName(player)} побеждает финального монстра: ${formatRoll(rolls)}${bonusText}. Игрок становится <strong>боссом</strong>.${monsterHuntText}`);
      render();
      await showActionPrompt(
        `${playerName(player)} побеждает финального монстра: ${formatRoll(rolls)}${bonusText}. Игрок становится <strong>боссом</strong>.${monsterHuntText}`,
        { autoFor: player },
      );
      clearEnemyBattleHud();
      await resolveFinalBattle(player, true);
      return { isFinalBoss: true, resolved: true, winner: "player" };
    }
    addDiceBonus(player, 1);
    const monsterHuntReward = awardMonsterHuntReward(player);
    const monsterHuntText = monsterHuntRewardText(monsterHuntReward);
    log(
      `${playerName(player)} побеждает врага: ${formatRoll(rolls)}${bonusText}. ${door.label} открыта для игрока. Награда: <strong>+1 кубик</strong>.${monsterHuntText}`,
    );
    render();
    await showActionPrompt(
      `${playerName(player)} побеждает врага: ${formatRoll(rolls)}${bonusText}. ${door.label} открыта. Награда: <strong>+1 кубик</strong>.${monsterHuntText}`,
      { autoFor: player },
    );
    clearEnemyBattleHud();
    return { isFinalBoss: false, resolved: true, winner: "player" };
  }

  state.enemyBattleProgress = {
    bonus,
    enemyForce: requiredStrength,
    isFinalBoss: Boolean(door.isFinalBoss),
    outcome: `Враг побеждает. ${player.name} возвращается на старт и получает Лавку Джо`,
    playerForce: damage,
    playerId: player.id,
    rolled,
    rolls,
    winner: "enemy",
  };
  player.position = startCell;
  render();
  pulseTile(player.position);
  log(
    `${playerName(player)} не побеждает врага: ${formatRoll(rolls)}${bonusText}. Игрок возвращается на старт и получает карту <strong>Лавка Джо</strong>.`,
  );
  await showActionPrompt(
    `${playerName(player)} не побеждает врага: ${formatRoll(rolls)}${bonusText}. Возврат на <strong>старт</strong>. Получает карту <strong>Лавка Джо</strong>.`,
    { autoFor: player },
  );
  clearEnemyBattleHud();
  await drawFreeShopCard(player, "получает карту Лавка Джо за возвращение на старт");
  return { isFinalBoss: Boolean(door.isFinalBoss), resolved: true, winner: "enemy" };
}

async function resolveChaosPortal(player) {
  const options = chaosPortalOptions(player);
  await showActionPrompt(chaosPortalPromptMarkup(player, options), {
    buttonLabel: "Бросить кубик",
    autoFor: player,
  });

  const rolls = rollDice(1);
  recordDiceThrown(player, 1);
  state.isAnimating = true;
  state.dice = null;
  render();
  showRollContextStatus({
    criterion: "Кубик выбирает один из исходов.",
    kicker: "Портал хаоса",
    outcomes: [
      { label: "1-2", effect: "назад к монстру/порталу" },
      { label: "3-4", effect: "к Лавке Джо" },
      { label: "5", effect: "к Хорошо" },
      { label: "6", effect: "вперед к монстру/порталу" },
    ],
    participants: [playerChoiceBadge(player)],
    reason: "Кубик решает, куда портал отправит игрока.",
    result: `${playerName(player)} бросает кубик портала.`,
    title: "Портал выбирает путь",
  });
  await animateDice(rolls, { label: "Портал хаоса", player });
  state.isAnimating = false;

  const roll = rolls[0];
  const result = roll <= 2
    ? options.find((option) => option.id === "monster")
    : roll <= 4
      ? options.find((option) => option.id === "shop")
      : roll === 5
        ? options.find((option) => option.id === "good")
        : options.find((option) => option.id === "forward-monster");

  const destination = result || options.find((option) => option.id === "monster") || {
    cell: startCell,
    id: "monster",
    label: "Старт",
    note: "запасной выход",
  };
  log(`${playerName(player)} бросает <strong>Портал хаоса</strong>: <strong>${roll}</strong>.`);
  log(`${playerName(player)} исчезает в портале: ${chaosPortalRollLabel(roll)} → <strong>${destination.label}</strong> (${cellTitleWithLabel(destination.cell)}).`, {
    toast: true,
  });
  await showActionPrompt("", {
    autoFor: player,
    rollContext: {
      criterion: "Кубик выбирает один из исходов.",
      kicker: "Портал хаоса",
      outcomes: [
        { label: "1-2", effect: "назад к монстру/порталу" },
        { label: "3-4", effect: "к Лавке Джо" },
        { label: "5", effect: "к Хорошо" },
        { label: "6", effect: "вперед к монстру/порталу" },
      ],
      participants: [playerChoiceBadge(player)],
      reason: "Кубик решает, куда портал отправит игрока.",
      result: `Выпало ${roll}: ${chaosPortalRollLabel(roll)} → <strong>${destination.label}</strong> (${cellTitleWithLabel(destination.cell)}).`,
      title: "Результат портала",
    },
  });

  await teleportFromChaosPortal(player, destination);
}

function chaosPortalPromptMarkup(player, options) {
  const optionById = Object.fromEntries(options.map((option) => [option.id, option]));
  const monster = optionById.monster || { cell: startCell, label: "Старт" };
  const shop = optionById.shop || { cell: startCell };
  const good = optionById.good || { cell: startCell };
  const forwardMonster = optionById["forward-monster"] || { cell: startCell, label: "Старт" };

  return rollEventPromptMarkup({
    kicker: "Портал хаоса",
    title: "Портал хаоса мерцает",
    intro: `${playerChoiceBadge(player)} бросает кубик и узнает, куда портал его отправит.`,
    rules: [
      {
        roll: "1-2",
        effect: `назад к монстру/порталу: <strong>${monster.label}</strong> (${cellLabel(monster.cell)})`,
      },
      {
        roll: "3-4",
        effect: `к Лавке Джо: <strong>${cellLabel(shop.cell)}</strong>`,
      },
      {
        roll: "5",
        effect: `к Хорошо: <strong>${cellLabel(good.cell)}</strong>`,
      },
      {
        roll: "6",
        effect: `вперед к монстру/порталу: <strong>${forwardMonster.label}</strong> (${cellLabel(forwardMonster.cell)})`,
      },
    ],
    footer: "Прыжок мгновенный: клетки между порталом и целью не срабатывают.",
  });
}

function chaosPortalOptions(player) {
  const currentCell = player.position;
  const monster = nearestMonsterOrPortalOption(currentCell, "backward");
  return [
    monster,
    {
      cell: nearestForwardEventCell(currentCell, "shop") || nearestEventCell(currentCell, "shop") || startCell,
      id: "shop",
      label: "Лавка Джо",
      note: "3-4: к ближайшей лавке",
    },
    {
      cell: nearestForwardEventCell(currentCell, "good") || nearestEventCell(currentCell, "good") || startCell,
      id: "good",
      label: "Хорошо",
      note: "5: к ближайшему Хорошо",
    },
    nearestMonsterOrPortalOption(currentCell, "forward"),
  ];
}

function nearestMonsterOrPortalOption(cell, direction) {
  const current = routeIndex.get(cell) ?? 0;
  const isForward = direction === "forward";
  const door = Object.values(state.doors || {})
    .filter((item) => {
      const progress = routeIndex.get(item.enemyCell) ?? -1;
      return isForward ? progress > current : progress < current;
    })
    .sort((a, b) => {
      const aProgress = routeIndex.get(a.enemyCell) ?? 0;
      const bProgress = routeIndex.get(b.enemyCell) ?? 0;
      return isForward ? aProgress - bProgress : bProgress - aProgress;
    })[0];

  if (!door) {
    return {
      cell: startCell,
      id: isForward ? "forward-monster" : "monster",
      label: "Старт",
      note: isForward ? "6: монстра/портала впереди нет" : "1-2: монстра/портала сзади нет",
    };
  }

  const portalLabel = isDoorOpenForAllPlayers(door) ? "Портал" : (door.label || "Монстр");
  return {
    cell: door.enemyCell,
    id: isForward ? "forward-monster" : "monster",
    label: portalLabel,
    note: isForward ? "6: вперед к монстру/порталу" : "1-2: назад к монстру/порталу",
  };
}

function nearestForwardEventCell(cell, eventType) {
  const current = routeIndex.get(cell) ?? 0;
  return routePath
    .filter((candidate) => cellEvents[candidate] === eventType && (routeIndex.get(candidate) ?? -1) > current)
    .sort((a, b) => (routeIndex.get(a) ?? 0) - (routeIndex.get(b) ?? 0))[0] || null;
}

function nearestEventCell(cell, eventType) {
  const current = routeIndex.get(cell) ?? 0;
  return routePath
    .filter((candidate) => cellEvents[candidate] === eventType)
    .sort((a, b) => Math.abs((routeIndex.get(a) ?? 0) - current) - Math.abs((routeIndex.get(b) ?? 0) - current))[0] || null;
}

function chooseChaosPortalDestination(player, options) {
  state.pendingChoice = {
    choices: options.map((option) => ({
      ...option,
      note: `${option.note}; клетка ${cellLabel(option.cell)}`,
    })),
    kind: "chaos-portal",
    playerId: player.id,
  };
  state.isAnimating = false;
  render();

  return new Promise((resolve) => {
    state.choiceResolver = (cell) => {
      const choice = state.pendingChoice?.choices.find((option) => option.cell === cell) || null;
      state.pendingChoice = null;
      state.choiceResolver = null;
      state.isAnimating = true;
      resolve(choice);
    };
    scheduleBotAction(botChoiceDelay("choice"), { replace: true });
  });
}

async function teleportFromChaosPortal(player, destination) {
  const targetCell = destination?.cell || startCell;
  if (!fieldCells.has(targetCell)) return;

  player.position = targetCell;
  recordPlayerMoved(player, targetCell);
  state.walkPath = [];
  render();
  pulseTile(targetCell);
  await sleep(180);

  if (cellEvents[targetCell] === "chaos-portal") {
    log(`<strong>Портал хаоса</strong> гаснет на клетке ${cellTitleWithLabel(targetCell)}, чтобы не запустить бесконечную цепочку.`);
    return;
  }

  await resolveLanding(player);
}

function chaosPortalRollLabel(roll) {
  if (roll <= 2) return "назад к монстру/порталу";
  if (roll <= 4) return "к Лавке Джо";
  if (roll === 5) return "к Хорошо";
  return "вперед к монстру/порталу";
}

async function resolveDiceFortuneField(player) {
  await showActionPrompt(diceFortunePromptMarkup(player), {
    buttonLabel: "Бросить кубик",
    autoFor: player,
  });

  const rolls = rollDice(diceFortuneDiceCount);
  recordDiceThrown(player, diceFortuneDiceCount);
  const sixes = rolls.filter((value) => value === 6).length;
  const ones = rolls.filter((value) => value === 1).length;
  const coins = sixes * diceFortuneCoinReward;
  const backwardSteps = ones * diceFortuneBackwardStepPenalty;

  state.dice = null;
  render();
  showRollContextStatus({
    criterion: "Кубики считают награды и откаты.",
    kicker: "Кубик удачи",
    outcomes: [
      { label: "6", effect: `+${diceFortuneCoinReward} монет за каждую шестерку` },
      { label: "1", effect: `-${diceFortuneBackwardStepPenalty} шагов за каждую единицу` },
      { label: "2-5", effect: "без эффекта" },
    ],
    participants: [playerChoiceBadge(player)],
    reason: "Шесть кубиков одновременно считают награды и откаты.",
    result: `${playerName(player)} бросает ${diceFortuneDiceCount} кубиков удачи.`,
    title: "Удача выбирает исход",
  });
  await animateDice(rolls, { player });

  if (coins > 0) addCoins(player, coins);

  const resultParts = [
    sixes ? `<strong>${coinAmount(coins)}</strong>` : "",
    backwardSteps ? `<strong>${backwardSteps} шагов назад</strong>` : "",
  ].filter(Boolean);
  const resultText = resultParts.length ? resultParts.join(" и ") : "ничего не происходит";
  const message = `${playerName(player)} бросает кубик удачи: ${formatRoll(rolls)}. Результат: ${resultText}.`;
  log(message, { toast: !backwardSteps });
  await showActionPrompt("", {
    autoFor: player,
    rollContext: {
      criterion: "Кубики считают награды и откаты.",
      kicker: "Кубик удачи",
      outcomes: [
        { label: "6", effect: `+${diceFortuneCoinReward} монет за каждую шестерку` },
        { label: "1", effect: `-${diceFortuneBackwardStepPenalty} шагов за каждую единицу` },
        { label: "2-5", effect: "без эффекта" },
      ],
      participants: [playerChoiceBadge(player)],
      reason: "Шесть кубиков одновременно считают награды и откаты.",
      result: `${formatRoll(rolls)} → ${resultText}.`,
      title: "Результат удачи",
    },
  });

  if (backwardSteps > 0) {
    await movePlayerSteps(player, -backwardSteps);
  } else {
    render();
  }
}

function diceFortunePromptMarkup(player) {
  return rollEventPromptMarkup({
    kicker: "Кубик удачи",
    title: "Испытай удачу",
    intro: `${playerChoiceBadge(player)} бросает ${diceFortuneDiceCount} кубиков. Каждый кубик может дать награду или откат.`,
    rules: [
      {
        roll: "6",
        effect: `<strong>${coinAmount(diceFortuneCoinReward)}</strong> за каждую шестерку`,
      },
      {
        roll: "1",
        effect: `<strong>${diceFortuneBackwardStepPenalty} шагов назад</strong> за каждую единицу`,
      },
      {
        roll: "2-5",
        effect: "без эффекта",
      },
    ],
    footer: "Все результаты считаются сразу после броска.",
  });
}

function rollEventPromptMarkup({ kicker, title, intro, rules, footer = "" }) {
  const rows = rules
    .map((rule) => `
      <div class="roll-event-row">
        <b>${rule.roll}</b>
        <span>${rule.effect}</span>
      </div>
    `)
    .join("");

  return `
    <section class="roll-event-card">
      <p class="roll-event-kicker">${kicker}</p>
      <h3>${title}</h3>
      <p class="roll-event-intro">${intro}</p>
      <div class="roll-event-rules">${rows}</div>
      ${footer ? `<p class="roll-event-footer">${footer}</p>` : ""}
    </section>
  `;
}

function normalizeRollContext(context) {
  if (!context) return null;
  const participants = (context.participants || []).filter(Boolean);
  const outcomes = (context.outcomes || []).filter((item) => item?.label || item?.effect);
  return {
    criterion: context.criterion || "",
    kicker: context.kicker || "Жребий",
    outcomes,
    participants,
    reason: context.reason || "",
    result: context.result || "",
    title: context.title || "Случайный бросок",
  };
}

function rollContextPromptMarkup(message, contextInput) {
  const context = normalizeRollContext(contextInput);
  if (!context) return message;
  const participants = context.participants.length
    ? `
      <div class="roll-context-participants">
        ${context.participants.map((item) => `<span>${item}</span>`).join("")}
      </div>
    `
    : "";
  const outcomes = context.outcomes.length
    ? `
      <div class="roll-context-outcomes">
        ${context.outcomes.map((item) => `
          <span>
            ${item.label ? `<b>${item.label}</b>` : ""}
            ${item.effect ? `<em>${item.effect}</em>` : ""}
          </span>
        `).join("")}
      </div>
    `
    : "";
  const result = context.result ? `<p class="roll-context-result">${context.result}</p>` : "";
  const detail = [context.reason, context.criterion].filter(Boolean).join(" ");
  return `
    <section class="roll-context-card">
      <p class="roll-context-kicker">${context.kicker}</p>
      <h3>${context.title}</h3>
      ${detail ? `<p class="roll-context-detail">${detail}</p>` : ""}
      ${participants}
      ${outcomes}
      ${result}
      ${message ? `<div class="roll-context-message">${message}</div>` : ""}
    </section>
  `;
}

async function resolvePayDoubleField(player) {
  const before = player.coins;
  player.coins *= 2;
  const gained = player.coins - before;
  if (gained > 0) showCoinFloat(player, gained);
  const message = `${playerName(player)} попадает на <strong>Удвой свои монеты</strong>. Было <strong>${coinAmount(before)}</strong>, стало <strong>${coinAmount(player.coins)}</strong> <span class="nowrap">(${coinAmount(`+${gained}`)})</span>.`;

  log(message, { toast: true });
  await showActionPrompt(message, { autoFor: player });
  render();
}

async function resolveVsField(player) {
  const ante = 10;
  const contributions = state.players.map((participant) => {
    const amount = Math.min(ante, participant.coins);
    if (amount > 0) addCoins(participant, -amount);
    return { amount, player: participant };
  });
  const pot = contributions.reduce((sum, item) => sum + item.amount, 0);
  const contributionText = contributions
    .map(({ amount, player: participant }) => `${playerName(participant)} ${coinAmount(-amount)}`)
    .join(", ");

  log(`${playerName(player)} попадает на <strong>VS</strong>. Все игроки скидывают по ${coinAmount(ante)}: ${contributionText}. Банк: <strong>${coinAmount(pot)}</strong>.`);
  state.vsBattleProgress = {
    contenderIds: state.players.map((participant) => participant.id),
    isRolling: false,
    outcome: `${playerName(player)} запускает VS-битву за банк <strong>${coinAmount(pot)}</strong>`,
    pot,
    results: {},
    rollingPlayerId: null,
    round: 1,
    tiedIds: [],
    winnerId: null,
  };
  render();
  await showActionPrompt(
    `${playerName(player)} попадает на <strong>VS</strong>. Все игроки скидывают по ${coinAmount(ante)}, затем начинается битва за банк <strong>${coinAmount(pot)}</strong>.`,
    { autoFor: player },
  );

  let contenders = [...state.players];
  let round = 1;
  let winner = null;
  state.isAnimating = true;
  state.dice = null;

  while (!winner) {
    const roundResults = [];
    state.vsBattleProgress = {
      contenderIds: contenders.map((contender) => contender.id),
      isRolling: false,
      outcome: round > 1 ? "Переигровка: бросают только игроки с ничьей" : "Все игроки бросают силу за банк",
      pot,
      results: {},
      rollingPlayerId: null,
      round,
      tiedIds: [],
      winnerId: null,
    };
    render();
    for (const contender of contenders) {
      state.vsBattleProgress = {
        ...state.vsBattleProgress,
        isRolling: true,
        outcome: `${playerName(contender)} бросает силу в VS-битве${round > 1 ? " (переигровка)" : ""}`,
        rollingPlayerId: contender.id,
      };
      render();
      await showActionPrompt(`${playerName(contender)} бросает силу в VS-битве${round > 1 ? " (переигровка)" : ""}.`, {
        autoFor: contender,
        buttonLabel: "Бросить кубик",
      });
      const result = await rollPlayerBattlePower(contender, true, { label: `VS - ${contender.name}` });
      roundResults.push(result);
      state.vsBattleProgress = {
        ...state.vsBattleProgress,
        isRolling: false,
        outcome: `${playerName(contender)} выбрасывает силу <strong>${result.total}</strong>`,
        results: {
          ...state.vsBattleProgress.results,
          [contender.id]: result.total,
        },
        rollingPlayerId: null,
      };
      render();
      log(`${playerName(contender)} в VS-битве: ${formatRoll(result.rolls)}${combatBonusFormulaText(result.baseBonus, result.cursePenalty, result.total)}. Сила: <strong>${result.total}</strong>.`);
    }

    const bestForce = Math.max(...roundResults.map((result) => result.total));
    const bestResults = roundResults.filter((result) => result.total === bestForce);
    if (bestResults.length === 1) {
      winner = bestResults[0].player;
      state.vsBattleProgress = {
        ...state.vsBattleProgress,
        isRolling: false,
        outcome: `${playerName(winner)} побеждает с силой <strong>${bestForce}</strong>`,
        rollingPlayerId: null,
        tiedIds: [],
        winnerId: winner.id,
      };
      render();
      break;
    }

    contenders = bestResults.map((result) => result.player);
    const tiedNames = contenders.map((contender) => playerName(contender)).join(", ");
    state.vsBattleProgress = {
      ...state.vsBattleProgress,
      isRolling: false,
      outcome: `Ничья по силе <strong>${bestForce}</strong>. Переигровка: ${tiedNames}`,
      rollingPlayerId: null,
      tiedIds: contenders.map((contender) => contender.id),
      winnerId: null,
    };
    render();
    log(`VS-битва: ничья по силе <strong>${bestForce}</strong> между ${tiedNames}. Переигровка.`);
    await showActionPrompt(`Ничья по силе <strong>${bestForce}</strong>. Переигровка: ${tiedNames}.`, {
      autoFor: contenders.every((contender) => isBot(contender)) ? contenders[0] : null,
    });
    round += 1;
  }

  state.isAnimating = false;
  state.dice = null;
  if (pot > 0) {
    winner.coins += pot;
    showCoinFloat(winner, pot);
  }
  const message = `${playerName(winner)} выигрывает VS-битву и забирает банк <strong>${coinAmount(pot)}</strong>`;
  state.vsBattleProgress = {
    ...state.vsBattleProgress,
    outcome: message,
    winnerId: winner.id,
  };
  render();
  log(message, { toast: true });
  await showActionPrompt(message, { autoFor: winner });
  state.vsBattleProgress = null;
  render();
}

async function resolveFinalBattle(boss, animate = true) {
  const challengers = state.players.filter((player) => player.id !== boss.id);
  state.isAnimating = animate;
  state.movingPlayerId = null;
  state.dice = null;
  state.finalBattleProgress = {
    bossBonusApplied: false,
    bossForce: 0,
    bossId: boss.id,
    bossRollsStarted: false,
    playersForce: 0,
  };
  render();

  log(`${playerName(boss)} становится <strong>боссом</strong>. Начинается финальная битва.`);
  if (animate) {
    await showActionPrompt(
      `${playerName(boss)} становится <strong>боссом</strong>. Остальные игроки сражаются с ним.`,
      { autoFor: boss },
    );
  }

  const challengerResults = [];
  for (const challenger of challengers) {
    if (animate) {
      await showActionPrompt(`${playerName(challenger)} готовится бросить кубики.`, {
        autoFor: challenger,
        buttonLabel: "Бросить кубик",
      });
    }
    const result = await rollFinalBattlePower(challenger, animate);
    challengerResults.push(result);
    state.finalBattleProgress.playersForce += result.total;
    render();
    log(
      `${playerName(challenger)} атакует босса: ${formatRoll(result.rolls)}${finalBonusText(result.baseBonus, result.cursePenalty, result.total)}. Сила: <strong>${result.total}</strong>.`,
    );
  }

  const playersForce = challengerResults.reduce((sum, result) => sum + result.total, 0);
  state.finalBattleProgress.playersForce = playersForce;
  log(`Итоговая сила игроков: <strong>${playersForce}</strong>.`);

  const bossRollResults = [];
  const bossOpponentBonus = challengers.length;
  const bossOpponentBonusLabel = bossOpponentBonus > 0 ? `+${bossOpponentBonus}` : String(bossOpponentBonus);
  const bossOpponentBonusBreakdown = bossOpponentBonus ? ` (${bossOpponentBonusLabel} за противников)` : "";
  if (animate) {
    await showActionPrompt(
      `Босс ${playerName(boss)} добавляет стартовый бонус: <strong>${bossOpponentBonusLabel}</strong>${bossOpponentBonusBreakdown}.`,
      {
        autoFor: boss,
        buttonLabel: "Добавить бонус",
      },
    );
  }
  state.finalBattleProgress.bossForce = bossOpponentBonus;
  state.finalBattleProgress.bossBonusApplied = true;
  render();
  log(`Босс ${playerName(boss)} получает стартовый бонус: <strong>${bossOpponentBonusLabel}</strong>${bossOpponentBonusBreakdown}.`);
  if (animate) await sleep(400);
  for (let index = 0; index < challengers.length; index += 1) {
    if (animate) {
      await showActionPrompt(`Босс - ${playerName(boss)} готовится бросить кубики ${index + 1}/${challengers.length}.`, {
        autoFor: boss,
        buttonLabel: "Бросить кубик",
      });
    }
    const result = await rollFinalBattlePower(boss, animate, { label: `Босс - ${boss.name}` });
    bossRollResults.push(result);
    state.finalBattleProgress.bossRollsStarted = true;
    state.finalBattleProgress.bossForce += result.total;
    render();
    log(
      `${playerName(boss)} бросает как босс ${index + 1}/${challengers.length}: ${formatRoll(result.rolls)}${finalBonusText(result.baseBonus, result.cursePenalty, result.total)}. Сила броска: <strong>${result.total}</strong>. Сила босса: <strong>${state.finalBattleProgress.bossForce}</strong>.`,
    );
  }

  const bossRolled = bossRollResults.reduce((sum, result) => sum + result.rolled, 0);
  const bossBonus = bossRollResults.reduce((sum, result) => sum + (result.baseBonus || 0), 0);
  const bossCursePenalty = bossRollResults.reduce((sum, result) => sum + (result.cursePenalty || 0), 0);
  const bossRollTotal = bossRollResults.reduce((sum, result) => sum + result.total, 0);
  const bossForce = bossOpponentBonus + bossRollTotal;
  state.finalBattleProgress.bossForce = bossForce;
  const bossForceBreakdown = [
    bossOpponentBonus ? `${bossOpponentBonusLabel} за противников` : "",
    bossRolled ? `${bossRolled} кубики` : "",
    bossBonus ? `${bossBonus} обычные бонусы` : "",
    bossCursePenalty ? `Сглаз ${bossCursePenalty}` : "",
  ].filter(Boolean).join(" + ");
  log(
    `Сила босса: <strong>${bossForce}</strong>${bossForceBreakdown ? ` (${bossForceBreakdown})` : ""}.`,
  );

  const bossWon = bossForce >= playersForce;
  const positionBonuses = finalPositionBonuses(state.players);
  const scores = state.players.map((player) => {
    const damage = challengerResults.find((result) => result.player.id === player.id)?.total || 0;
    return finalBattleScore(player, damage, positionBonuses.get(player.id) || 1);
  });
  const winner = bossWon ? boss : bestFinalScorePlayer(scores, challengers);
  const finalSummary = buildFinalBattleSummary({
    boss,
    bossBonus,
    bossCursePenalty,
    bossForce,
    bossOpponentBonus,
    bossRollResults,
    bossWon,
    challengerResults,
    playersForce,
    scores,
    winner,
  });

  state.finalBattle = {
    bossId: boss.id,
    bossForce,
    bossRolls: bossRollResults.map((result) => result.rolls),
    finalSummary,
    bossWon,
    playersForce,
    scores,
    winnerId: winner.id,
  };
  state.finished = true;
  if (state.history) {
    state.history.finalSummary = finalSummary;
    state.history.finishedAt = Date.now();
  }
  state.isAnimating = false;
  state.finalBattleProgress = null;
  state.dice = null;

  if (bossWon) {
    log(`<strong>Финальная битва завершена.</strong> Босс ${playerName(boss)} побеждает: ${bossForce} против ${playersForce}.`);
    if (animate) {
      await showActionPrompt(`Босс ${playerName(boss)} побеждает: <strong>${bossForce}</strong> против ${playersForce}.`, {
        autoFor: boss,
      });
    }
  } else {
    const scoreText = scores
      .filter((score) => challengers.some((player) => player.id === score.playerId))
      .map((score) => `${state.players.find((player) => player.id === score.playerId)?.name}: ${score.total} (+${score.position} за позицию)`)
      .join(", ");
    log(
      `<strong>Финальная битва завершена.</strong> Игроки побеждают босса: ${playersForce} против ${bossForce}. По очкам побеждает ${playerName(winner)} (${scoreText}).`,
    );
    if (animate) {
      await showActionPrompt(
        `Игроки побеждают босса: <strong>${playersForce}</strong> против ${bossForce}. По очкам побеждает ${playerName(winner)}.`,
        { autoFor: winner },
      );
    }
  }
}

function buildFinalBattleSummary({
  boss,
  bossBonus,
  bossCursePenalty = 0,
  bossForce,
  bossOpponentBonus,
  bossRollResults,
  bossWon,
  challengerResults,
  playersForce,
  scores,
  winner,
}) {
  const challengerById = new Map(challengerResults.map((result) => [result.player.id, result]));
  const scoreById = new Map(scores.map((score) => [score.playerId, score]));
  const bossRolled = bossRollResults.reduce((sum, result) => sum + result.rolled, 0);
  return {
    bossForce,
    bossId: boss.id,
    bossWon,
    outcome: bossWon ? "boss-won" : "players-won",
    playersForce,
    players: state.players.map((player) => {
      const score = scoreById.get(player.id) || finalBattleScore(player, 0, 0);
      const challengerResult = challengerById.get(player.id);
      const isBoss = player.id === boss.id;
      return {
        color: player.color,
        force: isBoss
          ? {
              bonus: bossBonus + bossCursePenalty,
              opponentBonus: bossOpponentBonus,
              rolled: bossRolled,
              rolls: bossRollResults.map((result) => result.rolls),
              total: bossForce,
            }
          : {
              bonus: challengerResult?.bonus || 0,
              opponentBonus: 0,
              rolled: challengerResult?.rolled || 0,
              rolls: challengerResult ? [challengerResult.rolls] : [],
              total: challengerResult?.total || 0,
            },
        id: player.id,
        name: player.name,
        role: isBoss ? "boss" : "player",
        score: {
          coins: score.coins,
          damage: score.damage,
          damageToBoss: score.damageToBoss,
          position: score.position,
          shop: score.shop,
          total: score.total,
        },
        scoreFormula: finalScoreFormulaText(score),
        winner: player.id === winner.id,
      };
    }),
    winnerId: winner.id,
    winnerName: winner.name,
    winnerRole: winner.id === boss.id ? "boss" : "player",
    winnerScore: scoreById.get(winner.id)?.total ?? 0,
  };
}

async function rollFinalBattlePower(player, animate, { label = "" } = {}) {
  return rollPlayerBattlePower(player, animate, { label, isFinalBattle: true });
}

async function rollPlayerBattlePower(player, animate, { label = "", isFinalBattle = false } = {}) {
  const diceCount = totalDiceForPlayer(player);
  const rolls = rollDice(diceCount);
  recordDiceThrown(player, diceCount);
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  const baseBonus = playerCombatBonus(player);
  const curse = consumeNextBattlePenalty(player);
  const bonus = baseBonus + curse.penalty;
  if (curse.penalty < 0) {
    log(`${playerName(player)} сбрасывает <strong>Сглаз</strong> (${curse.cards.length}): <strong>${curse.penalty}</strong> к этой битве.`, {
      toast: true,
    });
  }
  if (animate) {
    state.dice = null;
    render();
    await animateDice(rolls, { bonus, label, player, isFinalBattle });
  }
  const total = Math.max(0, rolled + bonus);
  state.dice = total;
  render();
  return { baseBonus, bonus, cursePenalty: curse.penalty, player, rolled, rolls, total };
}

async function rollPlayerMonsterBattlePower(player, animate, { label = "" } = {}) {
  const diceCount = totalDiceForPlayer(player);
  const rolls = rollDice(diceCount);
  recordDiceThrown(player, diceCount);
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  const baseBonus = playerCombatBonus(player);
  const rageBonus = consumeNextMonsterBattleBonus(player);
  const curse = consumeNextBattlePenalty(player);
  const bonus = baseBonus + rageBonus + curse.penalty;
  if (rageBonus > 0) {
    log(`${playerName(player)} использует <strong>Зелье ярости</strong> в событии <strong>Сплочение</strong>: <strong>+${rageBonus}</strong>. Зелье сгорает.`);
  }
  if (curse.penalty < 0) {
    log(`${playerName(player)} сбрасывает <strong>Сглаз</strong> в событии <strong>Сплочение</strong> (${curse.cards.length}): <strong>${curse.penalty}</strong>.`, {
      toast: true,
    });
  }
  if (animate) {
    state.dice = null;
    render();
    await animateDice(rolls, { bonus, label, player, isEnemyBattle: true });
  }
  const total = Math.max(0, rolled + bonus);
  state.dice = total;
  render();
  return { baseBonus, bonus, cursePenalty: curse.penalty, player, rageBonus, rolled, rolls, total };
}

function finalBonusText(baseBonus, cursePenalty, total) {
  return combatBonusFormulaText(baseBonus, cursePenalty, total);
}

function finalBattleScore(player, damageToBoss, position = 1) {
  const coins = player.coins;
  const shop = player.items.length * 5;
  const damage = damageToBoss * 2;
  return {
    coins,
    damage,
    damageToBoss,
    playerId: player.id,
    position,
    shop,
    total: coins + shop + damage + position,
  };
}

function bestFinalScorePlayer(scores, candidates) {
  const candidateIds = new Set(candidates.map((player) => player.id));
  const winnerScore = scores
    .filter((score) => candidateIds.has(score.playerId))
    .sort((a, b) => b.total - a.total || b.position - a.position || b.coins - a.coins || b.shop - a.shop)[0];
  return state.players.find((player) => player.id === winnerScore?.playerId) || candidates[0] || state.players[0];
}

function finalPositionBonuses(players) {
  const rankedGroups = [...players]
    .map((player) => ({
      distance: finalDistance(player),
      player,
    }))
    .sort((a, b) => a.distance - b.distance || a.player.id - b.player.id)
    .reduce((groups, item) => {
      const group = groups[groups.length - 1];
      if (group && group.distance === item.distance) {
        group.players.push(item.player);
      } else {
        groups.push({ distance: item.distance, players: [item.player] });
      }
      return groups;
    }, []);

  const bonusesByRank = [6, 3, 1];
  const result = new Map();
  rankedGroups.forEach((group, index) => {
    const bonus = bonusesByRank[index] || 1;
    group.players.forEach((player) => result.set(player.id, bonus));
  });
  return result;
}

function finalDistance(player) {
  const current = routeIndex.get(player.position) || 0;
  const finish = routeIndex.get(finishCell) || routePath.length;
  return Math.max(0, finish - current);
}

async function resolveGreenField(player) {
  addCoins(player, 3);
  log(`${playerName(player)} получает <strong>3 монеты</strong> на зеленом поле.`, { toast: true });

  const effect = activeFieldEffect("green-field");
  if (effect) {
    await applyFieldEffect(player, effect, "зеленое поле");
  }
}

async function resolveRedField(player) {
  addCoins(player, -3);
  log(`${playerName(player)} теряет <strong>3 монеты</strong> на красном поле.`, { toast: true });

  const effect = activeFieldEffect("red-field");
  if (effect) {
    await applyFieldEffect(player, effect, "красное поле");
  }
}

async function drawAndApplyCard(player, deckId, deckName = deckLabel(deckId), { skipNextBadExtraDraw = false } = {}) {
  const card = drawCardFromDeck(deckId);
  if (!card) {
    log(`В колоде <strong>${deckName}</strong> нет доступных карт.`, { toast: true });
    return;
  }
  if (deckName === "Хорошо") {
    log(`${playerName(player)} тянет карту <strong>${deckName}</strong>: ${card.title}`);
    await revealGoodCard(player, card);
  } else if (deckName === "Плохо") {
    log(`${playerName(player)} тянет карту <strong>${deckName}</strong>: ${card.title}`);
    await revealBadCard(player, card);
  } else if (deckName === "Событие") {
    log(`${playerName(player)} тянет карту <strong>${deckName}</strong>: ${card.title}`);
    await revealEventCard(player, card);
  } else {
    log(`${playerName(player)} тянет карту <strong>${deckName}</strong>: ${card.title}`, { toast: true });
  }
  let shouldDiscard = true;
  try {
    const result = await applyCardEffect(player, card.effect, { card, deckId, title: card.title });
    shouldDiscard = result?.discard !== false;
  } finally {
    if (shouldDiscard) discardResolvedCard(deckId, card);
  }
  if (deckId === "bad" && !skipNextBadExtraDraw) {
    await resolveNextBadExtraDraw(player);
  }
}

async function revealGoodCard(player, card) {
  setPhoneCardPreview(player, "Хорошо", card, false);
  const backPrompt = showActionPrompt(goodCardMarkup(player, card, { revealed: false }), {
    autoFor: player,
    buttonLabel: "Открыть",
  });
  const backResolver = actionPromptResolver;
  wireGoodCardClick(backResolver);
  if (ui.autoRevealCards?.checked) {
    window.setTimeout(() => {
      if (actionPromptResolver === backResolver) backResolver?.();
    }, 200);
  }
  await backPrompt;

  setPhoneCardPreview(player, "Хорошо", card, true);
  const facePrompt = showActionPrompt(goodCardMarkup(player, card, { revealed: true }), {
    autoFor: player,
    buttonLabel: "Применить",
  });
  wireGoodCardClick(actionPromptResolver);
  await facePrompt;
  clearPhoneCardPreview();
  log(`${playerName(player)} применяет карту <strong>Хорошо</strong>: ${card.title}`, { toast: true });
}

function wireGoodCardClick(resolver) {
  wireCardRevealClick(".good-card-preview", resolver);
}

function wireBadCardClick(resolver) {
  wireCardRevealClick(".bad-card-preview", resolver);
}

function wireTadamCardClick(resolver) {
  wireCardRevealClick(".tadam-card-preview", resolver);
}

function wireEventCardClick(resolver) {
  wireCardRevealClick(".event-card-preview", resolver);
}

function wireShopCardClick(resolver) {
  wireCardRevealClick(".shop-card-preview", resolver);
}

function wireCardRevealClick(selector, resolver) {
  ui.eventToast?.querySelectorAll(selector).forEach((cardPreview) => cardPreview.addEventListener("click", () => {
    if (actionPromptResolver === resolver) resolver?.();
  }));
}

function goodCardMarkup(player, card, { revealed }) {
  const description = cardDisplayText(card);
  const textClass = `good-card-text ${cardFaceTextDensityClass(description)}`.trim();
  const cardText = revealed
    ? `
      <span class="${textClass}">
        ${cardFaceDescriptionMarkup(description)}
      </span>
    `
    : "";
  return `
    <article class="good-card-reveal ${revealed ? "is-revealed" : "is-hidden"}">
      <button class="good-card-preview" type="button" aria-label="${revealed ? "Применить карту Хорошо" : "Открыть карту Хорошо"}">
        ${cardText}
      </button>
    </article>
  `;
}

function cardFaceTextDensityClass(description) {
  const text = String(description || "");
  if (text.length > 125) return "is-long";
  if (text.length > 90) return "is-dense";
  return "";
}

function cardFaceDescriptionMarkup(description) {
  const lines = cardFaceDescriptionLines(description);
  return (lines.length ? lines : [description])
    .map((line) => `<span>${iconizeHtml(line)}</span>`)
    .join("");
}

function cardFaceDescriptionLines(description) {
  return (String(description || "").match(/[^.!?]+[.!?]?/g) || [])
    .map((line) => line.trim())
    .filter(Boolean);
}

async function revealBadCard(player, card) {
  setPhoneCardPreview(player, "Плохо", card, false);
  const backPrompt = showActionPrompt(badCardMarkup(card, { revealed: false }), {
    autoFor: player,
    buttonLabel: "Открыть",
  });
  const backResolver = actionPromptResolver;
  wireBadCardClick(backResolver);
  await backPrompt;

  setPhoneCardPreview(player, "Плохо", card, true);
  const facePrompt = showActionPrompt(badCardMarkup(card, { revealed: true }), {
    autoFor: player,
    buttonLabel: "Применить",
  });
  wireBadCardClick(actionPromptResolver);
  await facePrompt;
  clearPhoneCardPreview();
  log(`${playerName(player)} применяет карту <strong>Плохо</strong>: ${card.title}`, { toast: true });
}

function badCardMarkup(card, { revealed }) {
  const description = cardDisplayText(card);
  const cardText = revealed
    ? `
      <span class="bad-card-text">
        <span>${iconizeHtml(description)}</span>
      </span>
    `
    : "";
  return `
    <article class="bad-card-reveal ${revealed ? "is-revealed" : "is-hidden"}">
      <button class="bad-card-preview" type="button" aria-label="${revealed ? "Применить карту Плохо" : "Открыть карту Плохо"}">
        ${cardText}
      </button>
    </article>
  `;
}

async function revealTadamCard(player, card) {
  setPhoneCardPreview(player, "ТАДАМ", card, false);
  const backPrompt = showActionPrompt(tadamCardMarkup(card, { revealed: false }), {
    autoFor: player,
    buttonLabel: "Открыть",
  });
  const backResolver = actionPromptResolver;
  wireTadamCardClick(backResolver);
  await backPrompt;

  setPhoneCardPreview(player, "ТАДАМ", card, true);
  const facePrompt = showActionPrompt(tadamCardMarkup(card, { revealed: true }), {
    autoFor: player,
    buttonLabel: "Применить",
  });
  wireTadamCardClick(actionPromptResolver);
  await facePrompt;
  clearPhoneCardPreview();
}

function tadamCardMarkup(card, { revealed }) {
  const description = cardDisplayText(card);
  const cardText = revealed
    ? `
      <span class="tadam-card-text">
        <span>${iconizeHtml(description)}</span>
      </span>
    `
    : "";
  return `
    <article class="tadam-card-reveal ${revealed ? "is-revealed" : "is-hidden"}">
      <button class="tadam-card-preview" type="button" aria-label="${revealed ? "Применить карту ТАДАМ" : "Открыть карту ТАДАМ"}">
        ${cardText}
      </button>
    </article>
  `;
}

async function revealEventCard(player, card) {
  setPhoneCardPreview(player, "Событие", card, false);
  const backPrompt = showActionPrompt(eventCardMarkup(card, { revealed: false }), {
    autoFor: player,
    buttonLabel: "Открыть",
  });
  const backResolver = actionPromptResolver;
  wireEventCardClick(backResolver);
  await backPrompt;

  setPhoneCardPreview(player, "Событие", card, true);
  const facePrompt = showActionPrompt(eventCardMarkup(card, { revealed: true }), {
    autoFor: player,
    buttonLabel: "Применить",
  });
  wireEventCardClick(actionPromptResolver);
  await facePrompt;
  clearPhoneCardPreview();
  log(`${playerName(player)} применяет карту <strong>Событие</strong>: ${card.title}`, { toast: true });
}

function eventCardMarkup(card, { revealed }) {
  const description = cardDisplayText(card);
  const icon = card.icon ? `<img class="event-card-artifact-icon" src="${card.icon}" alt="" aria-hidden="true">` : "";
  const textClass = `event-card-text ${eventCardTextDensityClass(description)}`.trim();
  const cardText = revealed
    ? `
      <span class="${textClass}">
        <strong class="event-card-title">${icon}${iconizeHtml(card.title || "Событие")}</strong>
        ${eventCardDescriptionMarkup(description)}
      </span>
    `
    : "";
  return `
    <article class="event-card-reveal ${revealed ? "is-revealed" : "is-hidden"}">
      <button class="event-card-preview" type="button" aria-label="${revealed ? "Применить карту Событие" : "Открыть карту Событие"}">
        ${cardText}
      </button>
    </article>
  `;
}

function eventCardTextDensityClass(description) {
  const text = String(description || "");
  const lines = eventCardDescriptionLines(text).length;
  if (text.length > 175 || lines >= 4) return "is-long";
  if (text.length > 120 || lines >= 3) return "is-dense";
  return "";
}

function eventCardDescriptionMarkup(description) {
  const lines = eventCardDescriptionLines(description);
  const descriptionLines = (lines.length ? lines : [description])
    .map((line) => `<span class="event-card-description-line">${iconizeHtml(line)}</span>`)
    .join("");
  return `<span class="event-card-description">${descriptionLines}</span>`;
}

function eventCardDescriptionLines(description) {
  return (String(description || "").match(/[^.!?]+[.!?]?/g) || [])
    .map((line) => line.trim())
    .filter(Boolean);
}

async function revealShopCards(cards, player = null) {
  const singleCard = cards.length === 1 ? cards[0] : null;
  if (singleCard) setPhoneCardPreview(player, "Лавка Джо", singleCard, false);
  const backPrompt = showActionPrompt(shopCardsMarkup(cards, { revealed: false }), {
    autoFor: player,
    buttonLabel: "Открыть",
  });
  const backResolver = actionPromptResolver;
  wireShopCardClick(backResolver);
  await backPrompt;

  if (singleCard) setPhoneCardPreview(player, "Лавка Джо", singleCard, true);
  const facePrompt = showActionPrompt(shopCardsMarkup(cards, { revealed: true }), {
    autoFor: player,
    buttonLabel: "Далее",
  });
  wireShopCardClick(actionPromptResolver);
  await facePrompt;
  if (singleCard) clearPhoneCardPreview();
}

async function revealSelectableShopCards(cards, player = null) {
  const backPrompt = showActionPrompt(shopCardsMarkup(cards, { revealed: false }), {
    autoFor: player,
    buttonLabel: "Открыть",
  });
  const backResolver = actionPromptResolver;
  wireShopCardClick(backResolver);
  await backPrompt;

  return chooseShopCardFromFace(cards, player);
}

function chooseShopCardFromFace(offer, player = null) {
  if (!ui.eventToast) return Promise.resolve(null);

  window.clearTimeout(eventToastFadeTimer);
  window.clearTimeout(eventToastHideTimer);

  actionPromptRollContext = null;
  ui.eventToast.hidden = false;
  ui.eventToast.innerHTML = `<div class="event-toast-copy">${shopCardsMarkup(offer, {
    revealed: true,
    selectable: true,
  })}</div>`;
  ui.eventToast.classList.remove("fading", "quick-fading", "visible");
  ui.eventToast.classList.add("action-prompt");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");
  actionPromptButtonLabel = "Далее";
  actionPromptAutoPlayerId = player?.id ?? null;
  actionPromptChoiceOptions = [
    ...offer.map((card) => ({
      displayKind: "shop-card",
      id: card.id,
      label: cardDisplayText(card),
      note: "выбрать карту",
    })),
    {
      id: "decline",
      label: "Далее",
      note: "не выбирать сейчас",
    },
  ];

  return new Promise((resolve) => {
    let completed = false;
    const finish = (cardId, { selectedButton = null } = {}) => {
      if (completed) return;
      completed = true;
      const card = offer.find((item) => item.id === cardId) || null;
      if (selectedButton) markSelectedShopCard(selectedButton);
      window.setTimeout(() => {
        actionPromptResolver = null;
        actionPromptButtonLabel = "Далее";
        actionPromptAutoPlayerId = null;
        actionPromptChoiceOptions = [];
        actionPromptChoiceResolver = null;
        hideEventToast({ quick: true });
        render();
        resolve(card);
      }, selectedButton ? 260 : 0);
    };

    actionPromptResolver = () => finish(null);
    actionPromptChoiceResolver = (cardId) => finish(cardId === "decline" ? null : cardId);
    ui.eventToast.querySelectorAll("[data-shop-card-id]").forEach((button) => {
      button.addEventListener("click", () => finish(button.dataset.shopCardId, { selectedButton: button }));
    });
    render();
    if (isBot(player)) {
      window.setTimeout(() => finishBotShopCardChoice(player, offer, finish), botChoiceDelay("card"));
    } else {
      scheduleBotAction(botChoiceDelay("choice"), { replace: true });
    }
  });
}

function chooseRevealedShopCard(offer, player = null) {
  if (!ui.eventToast) return Promise.resolve(null);

  window.clearTimeout(eventToastFadeTimer);
  window.clearTimeout(eventToastHideTimer);

  ui.eventToast.hidden = false;
  ui.eventToast.innerHTML = `<div class="event-toast-copy">${shopCardsMarkup(offer, {
    revealed: true,
    selectable: true,
    showDecline: true,
  })}</div>`;
  ui.eventToast.classList.remove("fading", "quick-fading", "visible");
  ui.eventToast.classList.add("action-prompt");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");
  actionPromptButtonLabel = "Отказаться";
  actionPromptAutoPlayerId = player?.id ?? null;
  actionPromptChoiceOptions = [
    ...offer.map((card) => ({
      displayKind: "shop-card",
      id: card.id,
      label: cardDisplayText(card),
      note: "купить карту",
    })),
    {
      id: "decline",
      label: "Отказаться",
      note: "не покупать",
    },
  ];

  return new Promise((resolve) => {
    let completed = false;
    const finish = (cardId, { selectedButton = null } = {}) => {
      if (completed) return;
      completed = true;
      const card = offer.find((item) => item.id === cardId) || null;
      if (selectedButton) markSelectedShopCard(selectedButton);
      window.setTimeout(() => {
        actionPromptResolver = null;
        actionPromptButtonLabel = "Далее";
        actionPromptAutoPlayerId = null;
        actionPromptChoiceOptions = [];
        actionPromptChoiceResolver = null;
        hideEventToast({ quick: true });
        render();
        resolve(card);
      }, selectedButton ? 260 : 0);
    };

    actionPromptResolver = () => finish(null);
    actionPromptChoiceResolver = (cardId) => finish(cardId === "decline" ? null : cardId);
    ui.eventToast.querySelectorAll("[data-shop-card-id]").forEach((button) => {
      button.addEventListener("click", () => finish(button.dataset.shopCardId, { selectedButton: button }));
    });
    ui.eventToast.querySelector("[data-shop-decline]")?.addEventListener("click", () => finish(null));
    render();
    if (isBot(player)) {
      window.setTimeout(() => finishBotShopCardChoice(player, offer, finish), botChoiceDelay("card"));
    } else {
      scheduleBotAction(botChoiceDelay("choice"), { replace: true });
    }
  });
}

function finishBotShopCardChoice(player, offer, finish) {
  let offerChoices = botShopOfferChoices.get(offer);
  if (!offerChoices) {
    offerChoices = new Map();
    botShopOfferChoices.set(offer, offerChoices);
  }
  if (!offerChoices.has(player.id)) {
    offerChoices.set(player.id, chooseBotShopCard(player, offer, { allowDecline: true }));
  }
  const cardId = offerChoices.get(player.id);
  const selectedButton = cardId ? shopCardButton(cardId) : null;
  finish(cardId, { selectedButton });
}

function shopCardButton(cardId) {
  return Array.from(ui.eventToast?.querySelectorAll("[data-shop-card-id]") || [])
    .find((button) => button.dataset.shopCardId === String(cardId)) || null;
}

function markSelectedShopCard(selectedButton) {
  const reveal = selectedButton.closest(".shop-card-reveal");
  reveal?.classList.add("is-choice-locked");
  reveal?.querySelectorAll("[data-shop-card-id], [data-shop-decline]").forEach((control) => {
    if (control !== selectedButton) control.disabled = true;
  });
  selectedButton.classList.add("is-selected");
  selectedButton.setAttribute("aria-pressed", "true");
}

function shopCardsMarkup(cards, { revealed, selectable = false, showDecline = false } = {}) {
  const className = `shop-card-reveal ${revealed ? "is-revealed" : "is-hidden"} ${selectable ? "is-selectable" : ""}`.trim();
  const cardsMarkup = cards
    .map((card) => {
      const description = cardDisplayText(card);
      const cardText = revealed
        ? `
          <span class="shop-card-text">
            <span>${iconizeHtml(description)}</span>
          </span>
        `
        : "";

      return `
        <button class="shop-card-preview" type="button" ${selectable ? `data-shop-card-id="${card.id}"` : ""} aria-label="${revealed ? "Выбрать карту Лавка Джо" : "Открыть карту Лавка Джо"}">
          ${cardText}
        </button>
      `;
    })
    .join("");

  return `
    <article class="${className}">
      <div class="shop-card-row">${cardsMarkup}</div>
      ${
        showDecline
          ? `<button class="shop-card-decline" type="button" data-shop-decline="true">Отказаться</button>`
          : ""
      }
    </article>
  `;
}

async function applyCardEffect(player, effect, source = {}) {
  if (!effect) return;

  if (effect.type === "coins") {
    addCoins(player, effect.amount);
  } else if (effect.type === "move") {
    await confirmMoveEffect(player, effect.steps);
    await movePlayerSteps(player, effect.steps);
  } else if (effect.type === "steal-random") {
    stealFromRandomPlayer(player, effect.amount);
  } else if (effect.type === "steal-richest") {
    await stealFromRichestPlayer(player, effect.amount);
  } else if (effect.type === "steal-chosen-player") {
    await stealFromChosenPlayer(player, effect.amount);
  } else if (effect.type === "give-chosen-player") {
    await giveToChosenPlayer(player, effect.amount);
  } else if (effect.type === "give-poorest") {
    await giveToPoorestPlayer(player, effect.amount);
  } else if (effect.type === "extra-turn") {
    grantExtraTurn(player);
  } else if (effect.type === "optional-extra-turn") {
    await resolveOptionalExtraTurn(player, effect.cost);
  } else if (effect.type === "draw-free-shop") {
    await drawFreeShopCard(player);
  } else if (effect.type === "buy-shop-card-from-player") {
    await resolveBuyShopCardFromPlayer(player, effect.cost);
  } else if (effect.type === "choose-player-back-roll") {
    await resolveChoosePlayerBackRoll(player);
  } else if (effect.type === "give-next-battle-penalty") {
    return resolveGiveNextBattlePenalty(player, source.card, effect.amount ?? -3);
  } else if (effect.type === "give-next-bad-extra-draw") {
    return resolveGiveNextBadExtraDraw(player, source.card);
  } else if (effect.type === "coins-if-poorest") {
    resolveCoinsIfPoorest(player, effect.amount ?? 8, effect.poorestAmount ?? 15);
  } else if (effect.type === "choose-forward-or-back") {
    await resolveChooseForwardOrBack(player, effect.steps ?? 5);
  } else if (effect.type === "event-race") {
    await resolveEventRace(player);
  } else if (effect.type === "event-generous-rain") {
    resolveEventGenerousRain(effect.amount ?? 20);
  } else if (effect.type === "event-portal-swap") {
    await resolveEventPortalSwap(player);
  } else if (effect.type === "event-balance") {
    await resolveEventBalance(player, effect.amount ?? 10);
  } else if (effect.type === "event-justice") {
    await resolveEventJustice(player);
  } else if (effect.type === "event-free-step") {
    await resolveEventFreeStep(player);
  } else if (effect.type === "event-unity") {
    await resolveEventUnity(player);
  } else if (effect.type === "event-magic-wallet") {
    await resolveEventMagicWallet(player);
  } else if (effect.type === "event-monster-rage") {
    resolveEventMonsterRage(effect.amount ?? 1);
  }
}

function grantExtraTurn(player) {
  state.extraTurnPlayerId = player.id;
  log(`${playerName(player)} готовит <strong>еще один ход</strong>.`, { toast: true });
}

async function resolveEventRace(player) {
  const rolls = rollDice(1);
  const bonus = playerStepBonus(player);
  await animateDice(rolls, { bonus, label: "Гонка", player });
  const total = rolls[0] + bonus;
  const reward = total >= 8 ? 20 : total >= 5 ? 10 : 5;
  addCoins(player, reward);
  log(
    `${playerName(player)} проходит событие <strong>Гонка</strong>: ${rolls[0]}${bonus ? ` + ${bonus}` : ""} = <strong>${total}</strong>. Награда: <strong>${coinAmount(reward)}</strong>.`,
    { toast: true },
  );
}

function resolveEventGenerousRain(amount = 20) {
  const targets = state.players.filter((player) => player.coins === 0);
  if (!targets.length) {
    const fallbackAmount = 5;
    for (const player of state.players) {
      addCoins(player, fallbackAmount);
    }
    log(`<strong>Щедрый дождь</strong>: монеты есть у всех, поэтому все получают <strong>${coinAmount(fallbackAmount)}</strong>.`, {
      toast: true,
    });
    return;
  }
  for (const target of targets) {
    addCoins(target, amount);
  }
  log(`<strong>Щедрый дождь</strong>: без монет ${targets.map(playerName).join(", ")} получают <strong>${coinAmount(amount)}</strong>.`, {
    toast: true,
  });
}

async function resolveEventPortalSwap(player) {
  const choices = state.players
    .filter((target) => target.id !== player.id)
    .map((target) => ({
      id: String(target.id),
      label: playerChoiceBadge(target),
      note: `клетка ${cellLabel(target.position)}`,
      noteClass: "choice-player-note",
    }));
  if (!choices.length) {
    log(`<strong>Портальный обмен</strong>: нет другого игрока для обмена.`, { toast: true });
    return;
  }
  const choice = await chooseCardAction({
    kicker: "Событие",
    playerId: player.id,
    title: "Портальный обмен",
    summary: `${playerChoiceBadge(player)} выбирает игрока и меняется с ним местами.`,
    choices,
  });
  const target = state.players.find((item) => item.id === Number(choice));
  if (!target) return;
  const playerPosition = player.position;
  player.position = target.position;
  target.position = playerPosition;
  render();
  log(`${playerName(player)} и ${playerName(target)} меняются местами через <strong>Портальный обмен</strong>.`, { toast: true });
}

async function resolveEventBalance(player, amount = 10) {
  const richest = await richestPlayerByCoins({ reason: "Равновесие: самый богатый игрок", autoFor: player });
  const poorest = await poorestPlayerByCoins({ excludeIds: richest ? [richest.id] : [], reason: "Равновесие: самый бедный игрок", autoFor: player });
  if (!richest || !poorest) {
    log(`<strong>Равновесие</strong>: не хватает игроков для передачи монет.`, { toast: true });
    return;
  }
  const given = stealCoins(richest, poorest, amount);
  if (given > 0) recordEffectReceived(poorest, richest);
  log(`${playerName(richest)} отдает ${playerName(poorest)} <strong>${coinAmount(given)}</strong> по событию <strong>Равновесие</strong>.`, {
    toast: true,
  });
}

async function resolveEventJustice(player) {
  const first = await routeExtremePlayer("first", { reason: "Справедливость: первый по маршруту", autoFor: player });
  const last = await routeExtremePlayer("last", { reason: "Справедливость: последний по маршруту", autoFor: player, excludeIds: first ? [first.id] : [] });
  const movedIds = new Set([first?.id, last?.id].filter((id) => id !== undefined));
  if (first) {
    log(`<strong>Справедливость</strong>: ${playerName(first)} идет на 10 клеток назад.`, { toast: true });
    await movePlayerSteps(first, -10);
  }
  if (last) {
    log(`<strong>Справедливость</strong>: ${playerName(last)} идет на 10 клеток вперед.`, { toast: true });
    await movePlayerSteps(last, 10);
  }
  const others = state.players.filter((target) => !movedIds.has(target.id));
  for (const target of others) {
    addCoins(target, 5);
  }
  if (others.length) {
    log(`<strong>Справедливость</strong>: остальные получают <strong>${coinAmount(5)}</strong>: ${others.map(playerName).join(", ")}.`, {
      toast: true,
    });
  }
}

async function resolveEventFreeStep(player) {
  const rolls = rollDice(1);
  const bonus = playerStepBonus(player);
  await animateDice(rolls, { bonus, label: "Вольный шаг", player });
  const total = Math.max(0, rolls[0] + bonus);
  const steps = await chooseEventFreeStepAmount(player, total);
  log(`${playerName(player)} выбирает <strong>${steps}</strong> из ${total} шагов по событию <strong>Вольный шаг</strong>.`, { toast: true });
  if (steps > 0) await movePlayerSteps(player, steps);
}

async function chooseEventFreeStepAmount(player, total) {
  if (isBot(player)) return total;
  const choices = Array.from({ length: total + 1 }, (_, steps) => ({
    id: String(steps),
    label: `${steps}`,
    note: steps === 0 ? "остаться на месте" : `вперед на ${steps}`,
  }));
  const choice = await chooseCardAction({
    canPreviewField: true,
    kicker: "Событие",
    playerId: player.id,
    title: "Вольный шаг",
    summary: `${playerChoiceBadge(player)} может пройти от 0 до ${total} клеток вперед.`,
    choices,
  });
  return clamp(Number(choice) || 0, 0, total);
}

async function resolveEventUnity(player) {
  const monsterStrength = 6 * state.players.length;
  const results = [];
  state.unityBattleProgress = {
    isRolling: false,
    outcome: `Цель: сила <strong>${monsterStrength}</strong>. Все игроки участвуют`,
    results: {},
    rollingPlayerId: null,
    target: monsterStrength,
    teamTotal: 0,
    winner: null,
  };
  render();
  log(`<strong>Сплочение</strong>: все игроки сражаются с монстром силой <strong>${monsterStrength}</strong>.`, { toast: true });
  for (const contender of state.players) {
    state.unityBattleProgress = {
      ...state.unityBattleProgress,
      isRolling: true,
      outcome: `${playerName(contender)} бросает силу для команды`,
      rollingPlayerId: contender.id,
    };
    render();
    const result = await rollPlayerMonsterBattlePower(contender, true, { label: `Сплочение - ${contender.name}` });
    results.push(result);
    const teamTotal = results.reduce((sum, item) => sum + item.total, 0);
    state.unityBattleProgress = {
      ...state.unityBattleProgress,
      isRolling: false,
      outcome: `${playerName(contender)} добавляет силу <strong>${result.total}</strong>. Команда: <strong>${teamTotal}</strong> / ${monsterStrength}`,
      results: {
        ...state.unityBattleProgress.results,
        [contender.id]: result.total,
      },
      rollingPlayerId: null,
      teamTotal,
    };
    render();
    log(`${playerName(contender)} в событии <strong>Сплочение</strong>: ${formatRoll(result.rolls)}${monsterBattleBonusFormulaText(result.baseBonus, result.rageBonus, result.cursePenalty, result.total)}. Сила: <strong>${result.total}</strong>.`);
  }
  const teamTotal = results.reduce((sum, result) => sum + result.total, 0);
  if (teamTotal >= monsterStrength) {
    for (const target of state.players) addCoins(target, 10);
    const message = `<strong>Сплочение</strong>: команда побеждает ${teamTotal} против ${monsterStrength}. Все получают <strong>${coinAmount(10)}</strong>.`;
    state.unityBattleProgress = {
      ...state.unityBattleProgress,
      isRolling: false,
      outcome: message,
      rollingPlayerId: null,
      teamTotal,
      winner: "team",
    };
    render();
    log(message, { toast: true });
    await showActionPrompt(message, { autoFor: player });
  } else {
    for (const target of state.players) addCoins(target, -5);
    const message = `<strong>Сплочение</strong>: команда проигрывает ${teamTotal} против ${monsterStrength}. Все теряют <strong>${coinAmount(5)}</strong>.`;
    state.unityBattleProgress = {
      ...state.unityBattleProgress,
      isRolling: false,
      outcome: message,
      rollingPlayerId: null,
      teamTotal,
      winner: "monster",
    };
    render();
    log(message, { toast: true });
    await showActionPrompt(message, { autoFor: player });
  }
  state.unityBattleProgress = null;
  render();
}

async function resolveEventMagicWallet(player) {
  const target = await routeExtremePlayer("last", {
    autoFor: player,
    reason: "Волшебный кошель: последний по маршруту",
  });
  if (!target) return;
  transferMagicWallet(target, `${playerName(player)} разыгрывает событие`);
}

function resolveEventMonsterRage(amount = 1) {
  state.eventMonsterRage = monsterRageBonus() + Math.max(1, Number(amount) || 1);
  log(`<strong>Ярость монстров</strong>: все монстры получают <strong>+${monsterRageBonus()}</strong> к силе.`, { toast: true });
  render();
}

async function resolveOptionalExtraTurn(player, cost) {
  if (player.coins < cost) {
    log(`${playerName(player)} не может купить еще один ход: нужно <strong>${cost} монет</strong>.`, { toast: true });
    return;
  }

  const choice = await chooseCardAction({
    kicker: "Хорошо",
    playerId: player.id,
    title: "Сделать еще один ход?",
    summary: `${playerChoiceBadge(player)}: ${player.coins} монет. Можно заплатить ${cost} монет и оставить ход за собой.`,
    choices: [
      {
        id: "pay",
        label: "Заплатить",
        note: coinAmount(cost),
      },
      {
        id: "decline",
        label: "Отказаться",
        note: coinAmount(0),
      },
    ],
  });

  if (choice !== "pay") {
    log(`${playerName(player)} отказывается покупать дополнительный ход.`, { toast: true });
    return;
  }

  addCoins(player, -cost);
  state.extraTurnPlayerId = player.id;
  log(`${playerName(player)} платит <strong>${cost} монет</strong> и готовит еще один ход.`, { toast: true });
}

async function drawFreeShopCard(player, reason = "бесплатно получает карту Лавка Джо") {
  const card = drawCardFromDeck("shop");
  if (!card) {
    log("В колоде <strong>Лавка Джо</strong> нет доступных карт.", { toast: true });
    return;
  }
  await revealShopCards([card], player);
  player.items.push(ownedShopItem(card));
  discardCardToDeck("shop", card);
  recordShopCards(player);
  render();
  log(`${playerName(player)} ${reason}: <strong>${card.title}</strong>`, { toast: true });
}

function ownedShopItem(card) {
  if (!card) return null;
  const item = { ...card };
  delete item._copyId;
  delete item._deckId;
  return item;
}

async function resolveBuyShopCardFromPlayer(player, cost) {
  if (player.coins < cost) {
    addCoins(player, 5);
    log(
      `${playerName(player)} не может купить карту Лавка Джо у игрока: нужно <strong>${cost} монет</strong>. Получает <strong>${coinAmount(5)}</strong>.`,
      { toast: true },
    );
    return;
  }

  const choices = state.players
    .filter((target) => target.id !== player.id && target.items.length > 0)
    .flatMap((target) =>
      target.items.map((card) => ({
        displayKind: "shop-card-owner",
        id: `${target.id}:${card.id}`,
        label: cardDisplayText(card),
        note: playerChoiceBadge(target),
        noteClass: "choice-player-note",
        ownerColor: target.color,
        ownerName: target.name,
        ownerToken: target.token,
        price: cost,
      })),
    );

  if (choices.length === 0) {
    addCoins(player, 5);
    log(`У других игроков нет карт Лавка Джо для покупки. ${playerName(player)} получает <strong>${coinAmount(5)}</strong>.`, {
      toast: true,
    });
    return;
  }

  choices.push({
    id: "decline",
    label: "Отказаться",
    note: "",
  });

  const choice = await chooseCardAction({
    kicker: "Хорошо",
    playerId: player.id,
    title: "Купить карту Лавка Джо у игрока",
    summary: `${playerChoiceBadge(player)}: ${player.coins} монет. Выбери карту и заплати ее владельцу ${cost} монет.`,
    buttonsClass: "shop-buttons",
    choices,
  });

  if (!choice || choice === "decline") {
    log(`${playerName(player)} не покупает карту Лавка Джо у другого игрока.`, { toast: true });
    return;
  }

  const [targetIdText, cardId] = choice.split(":");
  const target = state.players.find((item) => item.id === Number(targetIdText));
  const cardIndex = target?.items.findIndex((item) => item.id === cardId) ?? -1;
  if (!target || cardIndex < 0) return;

  const [card] = target.items.splice(cardIndex, 1);
  addCoins(player, -cost);
  addCoins(target, cost);
  player.items.push(card);
  recordShopCards(player);
  recordEffectReceived(target, player);
  log(`${playerName(player)} платит ${playerName(target)} <strong>${cost} монет</strong> и забирает карту Лавка Джо: <strong>${card.title}</strong>`, {
    toast: true,
  });
}

async function resolveChoosePlayerBackRoll(player) {
  const choices = state.players.map((target) => ({
    id: String(target.id),
    label: playerChoiceBadge(target),
    note: `${diceAmount(totalDiceForPlayer(target))} ${moveBonusText(playerStepBonus(target))}`.trim(),
    noteClass: "choice-player-note",
  }));

  const choice = await chooseCardAction({
    kicker: "Хорошо",
    playerId: player.id,
    title: "Кого отправить назад?",
    summary: `${playerChoiceBadge(player)} выбирает игрока, который бросит все свои кубики и пойдет назад с бонусами передвижения.`,
    choices,
  });

  const target = state.players.find((item) => item.id === Number(choice));
  if (!target) return;

  const diceCount = totalDiceForPlayer(target);
  const rolls = rollDice(diceCount);
  recordDiceThrown(target, diceCount);
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  const bonus = playerStepBonus(target);
  const total = rolled + bonus;
  log(
    `${playerName(player)} отправляет ${playerName(target)} назад: ${formatRoll(rolls)}${bonus ? ` + ${bonus} бонус = <strong>${total}</strong>` : ""}.`,
  );
  await animateDice(rolls, { bonus, label: "Назад", player: target });
  await showActionPrompt(`${playerName(target)} идет назад на <strong>${total}</strong>.`, { autoFor: player });
  recordEffectReceived(target, player);
  await movePlayerSteps(target, -total);
}

async function resolveGiveNextBattlePenalty(player, card, amount = -3) {
  if (!card) return { discard: true };

  const choices = state.players.map((target) => ({
    id: String(target.id),
    label: playerChoiceBadge(target),
    note: nextBattlePenaltyChoiceNote(target),
    noteClass: "choice-player-note",
    score: scoreNextBattlePenaltyTarget(player, target),
  }));

  const choice = await chooseCardAction({
    choices,
    kicker: "Хорошо",
    kind: "next-battle-penalty",
    playerId: player.id,
    summary: `${playerChoiceBadge(player)} передает сглаз. Цель получит ${amount} к силе в следующем бою.`,
    title: "Сглаз. Кого проклясть?",
  });
  const target = state.players.find((item) => item.id === Number(choice));
  if (!target) return { discard: true };

  giveNextBattlePenaltyCard(target, card, amount);
  recordEffectReceived(target, player);
  render();
  log(`${playerName(player)} отдает <strong>Сглаз</strong> игроку ${playerName(target)}. В следующем бою: <strong>${amount}</strong> к силе.`, {
    toast: true,
  });
  return { discard: false };
}

function nextBattlePenaltyChoiceNote(target) {
  const penalty = nextBattlePenaltyAmount(target);
  const active = penalty ? `, уже ${penalty}` : "";
  return `${battleForceText(playerBattleBonus(target), true)}${active}`;
}

function scoreNextBattlePenaltyTarget(actor, target) {
  const personality = botPersonality(actor);
  if (!target) return -100;
  if (target.id === actor.id && state.players.length > 1) return -24 / personality.chaos;

  const gate = monsterGatePressure(target);
  const leader = leaderPressureScore(target);
  const heldPenalty = Math.abs(nextBattlePenaltyAmount(target));
  let score = leader * (0.9 + personality.steal * 0.28);
  if (gate) {
    score += (gate.nearby ? 18 : 6) * gate.weight;
    score += Math.max(0, 24 - gate.distance) * 0.8 * gate.weight;
    if (gate.chance >= 0.35 && gate.chance <= 0.82) score += 10 * gate.weight;
  }
  score -= heldPenalty * 3.5;
  if (target.bot) score -= 3;
  return score;
}

function giveNextBattlePenaltyCard(target, card, amount = -3) {
  if (!target) return;
  if (!Array.isArray(target.nextBattlePenaltyCards)) target.nextBattlePenaltyCards = [];
  target.nextBattlePenaltyCards.push({
    ...card,
    effect: { ...(card.effect || {}), amount },
  });
}

async function resolveGiveNextBadExtraDraw(player, card) {
  if (!card) return { discard: true };

  const targets = state.players.filter((target) => target.id !== player.id);
  if (!targets.length) {
    log(`${playerName(player)} не может передать <strong>Двойное Плохо</strong>: нет другого игрока.`, { toast: true });
    return { discard: true };
  }

  const choices = targets.map((target) => ({
    id: String(target.id),
    label: playerChoiceBadge(target),
    note: nextBadExtraDrawChoiceNote(target),
    noteClass: "choice-player-note",
    score: scoreNextBadExtraDrawTarget(player, target),
  }));

  const choice = await chooseCardAction({
    choices,
    kicker: "Хорошо",
    kind: "next-bad-extra-draw",
    playerId: player.id,
    summary: `${playerChoiceBadge(player)} передает Двойное Плохо. Цель в следующий раз возьмет дополнительную карту Плохо.`,
    title: "Двойное Плохо. Кому отдать?",
  });
  const target = targets.find((item) => item.id === Number(choice));
  if (!target) return { discard: true };

  giveNextBadExtraDrawCard(target, card);
  recordEffectReceived(target, player);
  render();
  log(`${playerName(player)} отдает <strong>Двойное Плохо</strong> игроку ${playerName(target)}. Следующая карта Плохо заставит взять еще одну.`, {
    toast: true,
  });
  return { discard: false };
}

function nextBadExtraDrawChoiceNote(target) {
  const status = nextBadExtraDrawStatus(target);
  const active = status ? `, уже ${status.count}` : "";
  return `${target.coins} монет${active}`;
}

function scoreNextBadExtraDrawTarget(actor, target) {
  const personality = botPersonality(actor);
  if (!target) return -100;
  const held = nextBadExtraDrawCards(target).length;
  const leader = leaderPressureScore(target);
  const comfort = Math.max(0, target.coins) * 0.35;
  const pressure = monsterGatePressure(target);
  let score = leader * (0.8 + personality.steal * 0.25) + comfort;
  if (pressure) score += pressure.weight * (pressure.nearby ? 8 : 3);
  score -= held * 7;
  if (target.bot) score -= 2;
  return score;
}

function giveNextBadExtraDrawCard(target, card) {
  if (!target) return;
  if (!Array.isArray(target.nextBadExtraDrawCards)) target.nextBadExtraDrawCards = [];
  target.nextBadExtraDrawCards.push({ ...card });
}

function resolveCoinsIfPoorest(player, amount = 8, poorestAmount = 15) {
  const isStrictPoorest = state.players
    .filter((target) => target.id !== player.id)
    .every((target) => player.coins < target.coins);
  const reward = isStrictPoorest ? poorestAmount : amount;
  addCoins(player, reward);
  log(
    `${playerName(player)} бросает <strong>Монетку из фонтана</strong>: ${isStrictPoorest ? "меньше всех монет" : "не единственный самый бедный"}. Награда: <strong>${coinAmount(reward)}</strong>.`,
    { toast: true },
  );
}

async function resolveChooseForwardOrBack(player, steps = 5) {
  const amount = Math.max(1, Math.abs(Number(steps) || 5));
  const forwardCell = projectedRouteCell(player, amount);
  const backwardCell = projectedRouteCell(player, -amount);
  const choices = [
    {
      id: "forward",
      label: `Вперед на ${amount}`,
      note: cellTitleWithLabel(forwardCell),
      score: scorePathSignDestination(player, forwardCell, amount),
    },
    {
      id: "backward",
      label: `Назад на ${amount}`,
      note: cellTitleWithLabel(backwardCell),
      score: scorePathSignDestination(player, backwardCell, -amount),
    },
  ];
  const choice = await chooseCardAction({
    choices,
    kicker: "Хорошо",
    kind: "path-sign",
    playerId: player.id,
    summary: `${playerChoiceBadge(player)} выбирает направление. Если пойдет назад, поле на финише сработает.`,
    title: "Путевой знак",
  });
  const direction = choice === "backward" ? -amount : amount;
  const directionText = direction > 0 ? "вперед" : "назад";
  log(`${playerName(player)} выбирает <strong>Путевой знак</strong>: ${Math.abs(direction)} клеток ${directionText}.`, { toast: true });
  await movePlayerSteps(player, direction, { resolveBackwardLanding: direction < 0 });
}

function projectedRouteCell(player, steps) {
  const currentIndex = Math.max(0, (routeIndex.get(player?.position) || 1) - 1);
  const targetIndex = clamp(currentIndex + steps, 0, Math.max(0, routeCells.length - 1));
  const target = routeCells[targetIndex];
  return target ? cellKey(target.col, target.row) : player?.position || startCell;
}

function scorePathSignDestination(player, cell, steps) {
  const personality = botPersonality(player);
  const progressDelta = (routeIndex.get(cell) || routeProgress(player)) - routeProgress(player);
  let score = scoreCellForBot(player, cell, { cardMove: true });
  score += progressDelta * (steps > 0 ? 0.9 : 0.55) * personality.progress;
  if (steps < 0) score -= 5 * personality.progress;
  return score;
}

function moveBonusText(bonus) {
  return bonus ? `+${bonus} бонус` : "";
}

async function applyFieldEffect(player, effect, fieldName) {
  if (effect.mode === "draw") {
    await drawAndApplyCard(player, effect.deck, deckLabel(effect.deck));
  } else if (effect.mode === "move") {
    const direction = effect.steps > 0 ? "вперед" : "назад";
    const message = `${playerName(player)} попадает на ${fieldName} и идет на <strong>${Math.abs(effect.steps)} клеток ${direction}</strong>`;
    log(message);
    await showActionPrompt(message, { autoFor: player });
    await movePlayerSteps(player, effect.steps);
  }
}

async function confirmMoveEffect(player, steps) {
  await showActionPrompt(`<strong>${playerName(player)}: ${moveActionText(steps)}</strong>`, { autoFor: player });
}

function moveActionText(steps) {
  const direction = steps > 0 ? "вперед" : "назад";
  return `Перейди на ${Math.abs(steps)} клеток ${direction}.`;
}

async function drawTadamCard(player) {
  const card = drawCardFromDeck("tadam");
  if (!card) {
    log("В колоде <strong>ТАДАМ!</strong> нет доступных карт.", { toast: true });
    return;
  }
  log(`${playerName(player)} тянет карту <strong>ТАДАМ!</strong>: ${card.title}`);
  await revealTadamCard(player, card);
  addCoins(player, 5);
  state.tadams.push(card);
  recordTadamPlayed();
  if (state.tadams.length > 3) discardCardToDeck("tadam", state.tadams.shift());
  log(`${playerName(player)} получает <strong>${coinAmount(5)}</strong> за открытие <strong>ТАДАМ!</strong>.`, { toast: true });
  log(`${playerName(player)} применяет карту <strong>ТАДАМ!</strong>: ${card.title}`, { toast: true });
}

async function resolveShop(player) {
  const offer = drawCardsFromDeck("shop", 2, { uniqueIds: true });
  if (!offer.length) {
    log("<strong>Лавка Джо</strong>: в колоде нет доступных карт.", { toast: true });
    return;
  }
  if (player.coins < 5) {
    log(`Лавка Джо предлагает: ${offer.map((card) => card.title).join(" / ")}. У ${playerName(player)} не хватает монет.`, {
      toast: true,
    });
    discardCardsToDeck("shop", offer);
    return;
  }

  const directChoice = await revealSelectableShopCards(offer, player);
  const bought = directChoice || (await chooseRevealedShopCard(offer, player));
  if (!bought) {
    discardCardsToDeck("shop", offer);
    log(`${playerName(player)} отказывается от карт Лавки Джо.`, { toast: true });
    return;
  }

  addCoins(player, -5);
  player.items.push(ownedShopItem(bought));
  discardCardsToDeck("shop", offer);
  recordShopCards(player);
  log(`${playerName(player)} покупает в Лавке Джо: <strong>${bought.title}</strong>`, { toast: true });
}

async function resolveJoeAuction(player) {
  const offer = drawCardsFromDeck("shop", 3, { uniqueIds: true });
  if (!offer.length) {
    log("<strong>Аукцион Джо</strong>: в колоде нет доступных карт.", { toast: true });
    return;
  }
  const cardNames = offer.map((card) => `<strong>${card.title}</strong>`).join(" / ");
  log(`Аукцион Джо открывает ${offer.length} карты: ${cardNames}. Игроки делают ставки от активного игрока. Победитель забирает все 3 карты, проигравшие ничего не платят.`);
  await showActionPrompt(
    `
      <strong>Аукцион Джо</strong> открывает ${offer.length} карты. Игроки делают ставки от активного игрока. Победитель забирает все 3 карты.
      ${shopCardsMarkup(offer, { revealed: true })}
    `,
    { autoFor: player },
  );

  const bids = [];
  for (const bidder of auctionBidderOrder(player)) {
    const bid = await chooseAuctionBid(bidder, offer);
    bids.push({ bid, player: bidder });
  }
  log(`Ставки аукциона: ${bids.map(({ bid, player }) => `${playerName(player)} - <strong>${formatAuctionBid(bid)}</strong>`).join(", ")}.`);

  const highestBid = Math.max(0, ...bids.map((item) => item.bid));
  if (highestBid <= 0) {
    discardCardsToDeck("shop", offer);
    log("Все спасовали. Аукцион закрыт.", { toast: true });
    return;
  }

  let leaders = bids.filter((item) => item.bid === highestBid).map((item) => item.player);
  if (leaders.length > 1) {
    leaders = await resolveJoeAuctionTie(leaders, highestBid);
  }
  const winner = leaders[0];
  addCoins(winner, -highestBid);
  winner.items.push(...offer.map(ownedShopItem).filter(Boolean));
  discardCardsToDeck("shop", offer);
  recordShopCards(winner);
  log(
    `${playerName(winner)} выигрывает <strong>Аукцион Джо</strong>, платит в банк <strong>${coinAmount(highestBid)}</strong> и забирает все 3 карты: ${cardNames}.`,
    { toast: true },
  );
}

function auctionBidderOrder(activePlayer) {
  const start = state.players.findIndex((item) => item.id === activePlayer.id);
  if (start < 0) return [...state.players];
  return [...state.players.slice(start), ...state.players.slice(0, start)];
}

async function chooseAuctionBid(player, offer) {
  const choices = auctionBidOptions(player).map((bid) => ({
    id: bid,
    label: formatAuctionBid(bid),
    note: bid === 0 ? "без оплаты" : `${coinAmount(bid)} если победишь`,
  }));
  const choice = await chooseCardAction({
    bodyHtml: shopCardsMarkup(offer, { revealed: true }),
    buttonsClass: "auction-bid-buttons",
    choices,
    kicker: "Аукцион Джо",
    kind: "joe-auction-bid",
    offer,
    playerId: player.id,
    summary: `${playerChoiceBadge(player)} делает закрытую ставку. Монеты сейчас: ${coinAmount(player.coins)}. Проигравшие и пасующие не платят.`,
    title: "Сделай ставку",
  });
  return Number(choice) || 0;
}

async function resolveJoeAuctionTie(players, bid) {
  let tied = [...players];
  let round = 1;
  while (tied.length > 1) {
    log(`Ничья в аукционе за <strong>${coinAmount(bid)}</strong>: ${tied.map(playerName).join(", ")} бросают 1 кубик.`);
    const rolls = [];
    const participants = tied.map(playerChoiceBadge);
    for (const player of tied) {
      const rollContext = {
        criterion: "Больший бросок выигрывает аукцион. При равенстве игроки перебрасывают.",
        kicker: "Жребий аукциона",
        participants,
        reason: `Ничья по ставке ${coinAmount(bid)}.`,
        title: round > 1 ? `Аукцион: переброс ${round}` : "Аукцион: ничья ставок",
      };
      await showActionPrompt(`${playerName(player)} бросает кубик за победу в аукционе.`, {
        autoFor: player,
        buttonLabel: "Бросить кубик",
        rollContext,
      });
      const roll = d6();
      state.dice = null;
      render();
      showRollContextStatus({
        ...rollContext,
        result: `${playerName(player)} бросает кубик аукциона.`,
      });
      await animateDice([roll], { label: `Аукцион Джо ${round}`, player });
      state.dice = roll;
      rolls.push({ player, roll });
    }
    log(`Переигровка аукциона: ${rolls.map(({ player, roll }) => `${playerName(player)} - <strong>${roll}</strong>`).join(", ")}.`);
    const best = Math.max(...rolls.map((item) => item.roll));
    tied = rolls.filter((item) => item.roll === best).map((item) => item.player);
    const resultText = tied.length === 1
      ? `${playerName(tied[0])} выигрывает жребий по броску ${best}.`
      : `Снова ничья на ${best}: ${tied.map(playerName).join(", ")} переигрывают.`;
    if (tied.length > 1) log(`Снова ничья: ${tied.map(playerName).join(", ")} переигрывают.`);
    await showActionPrompt("", {
      autoFor: tied[0],
      rollContext: {
        criterion: "Больший бросок выигрывает аукцион.",
        kicker: "Жребий аукциона",
        participants: rolls.map(({ player, roll }) => `${playerChoiceBadge(player)} <strong>${roll}</strong>`),
        reason: `Ставка ${coinAmount(bid)}.`,
        result: resultText,
        title: "Результат жребия",
      },
    });
    round += 1;
  }
  return tied;
}

function auctionBidOptions(player) {
  return [0, 5, 10, 15, 20].filter((bid) => bid === 0 || player.coins >= bid);
}

function formatAuctionBid(bid) {
  return bid > 0 ? coinAmount(bid) : "Пас";
}

async function resolveJoeGame(player) {
  const assignments = isBot(player)
    ? randomJoeGameAssignments(player)
    : await chooseJoeGameAssignments(player);
  const summary = joeGameAssignmentsText(assignments);

  log(`${playerName(player)} запускает <strong>Игру Джо</strong>: ${summary}.`);
  await showActionPrompt(
    `<strong>Игра Джо</strong>: ${summary}. Теперь Джо бросает кубик.`,
    { autoFor: player, buttonLabel: "Бросить кубик" },
  );

  const rollContext = {
    criterion: "Если выпала назначенная цифра, этот игрок получает 2 карты Лавки Джо.",
    kicker: "Игра Джо",
    outcomes: joeGameRollOutcomes(assignments),
    participants: joeGameRollParticipants(assignments),
    reason: `${playerChoiceBadge(player)} назначил цифры.`,
    title: "Джо бросает кубик",
  };
  const roll = rollDice(1)[0];
  recordDiceThrown(player, 1);
  state.dice = null;
  state.isAnimating = true;
  render();
  showRollContextStatus({
    ...rollContext,
    result: "Кубик Джо катится.",
  });
  await animateDice([roll], { label: "Игра Джо", player });
  state.isAnimating = false;
  state.dice = roll;

  const winner = assignments.byNumber.get(roll) || null;
  if (!winner) {
    const message = `В <strong>Игре Джо</strong> выпало <strong>${roll}</strong>. Эта цифра никому не назначена, награды нет.`;
    log(message, { toast: true });
    await showActionPrompt("", {
      autoFor: player,
      rollContext: {
        ...rollContext,
        result: message,
        title: "Пустая цифра",
      },
    });
    render();
    return;
  }

  const cards = drawCardsFromDeck("shop", 2);
  const rewardText = await awardJoeGameShopCards(winner, cards);
  const message = `В <strong>Игре Джо</strong> выпало <strong>${roll}</strong>: ${playerName(winner)} получает ${rewardText}.`;
  log(message, { toast: true });
  await showActionPrompt("", {
    autoFor: winner,
    rollContext: {
      ...rollContext,
      result: message,
      title: "Результат Игры Джо",
    },
  });
  render();
}

async function chooseJoeGameAssignments(activePlayer) {
  const byNumber = new Map();
  const byPlayerId = new Map(state.players.map((player) => [player.id, []]));
  const remaining = [1, 2, 3, 4, 5, 6];
  const steps = [
    { player: activePlayer, title: "Игра Джо. Первая цифра себе", summary: "Выбери первую цифру для себя." },
    { player: activePlayer, title: "Игра Джо. Вторая цифра себе", summary: "Выбери вторую цифру для себя." },
    ...auctionBidderOrder(activePlayer).slice(1).map((player) => ({
      player,
      title: `Игра Джо. Цифра для ${player.name}`,
      summary: `Выбери цифру для ${playerChoiceBadge(player)}.`,
    })),
  ];

  for (const step of steps) {
    if (remaining.length === 0) break;
    const number = await chooseJoeGameNumber(activePlayer, step.player, remaining, step);
    assignJoeGameNumber({ byNumber, byPlayerId, number, player: step.player, remaining });
  }

  return { byNumber, byPlayerId };
}

function randomJoeGameAssignments(activePlayer) {
  const byNumber = new Map();
  const byPlayerId = new Map(state.players.map((player) => [player.id, []]));
  const remaining = shuffleCards([1, 2, 3, 4, 5, 6]);
  const order = [activePlayer, activePlayer, ...auctionBidderOrder(activePlayer).slice(1)];

  for (const player of order) {
    if (remaining.length === 0) break;
    const number = remaining[0];
    assignJoeGameNumber({ byNumber, byPlayerId, number, player, remaining });
  }

  return { byNumber, byPlayerId };
}

async function chooseJoeGameNumber(activePlayer, targetPlayer, remaining, step) {
  const takenText = joeGameAssignmentsShortText(remaining);
  const choice = await chooseCardAction({
    buttonsClass: "joe-game-buttons",
    choices: remaining.map((number) => ({
      id: String(number),
      label: String(number),
      note: targetPlayer.id === activePlayer.id ? "себе" : targetPlayer.name,
      score: 0,
    })),
    kicker: "Игра Джо",
    kind: "joe-game-number",
    playerId: activePlayer.id,
    summary: `${step.summary} ${takenText}`,
    title: step.title,
  });
  const number = Number(choice);
  return remaining.includes(number) ? number : remaining[0];
}

function assignJoeGameNumber({ byNumber, byPlayerId, number, player, remaining }) {
  byNumber.set(number, player);
  byPlayerId.get(player.id)?.push(number);
  const index = remaining.indexOf(number);
  if (index >= 0) remaining.splice(index, 1);
}

function joeGameAssignmentsText(assignments) {
  return state.players
    .map((player) => `${playerName(player)}: <strong>${joeGamePlayerNumbers(assignments, player).join(", ") || "-"}</strong>`)
    .join("; ");
}

function joeGameAssignmentsShortText(remaining) {
  const taken = [1, 2, 3, 4, 5, 6].filter((number) => !remaining.includes(number));
  return taken.length ? `Уже заняты: ${taken.join(", ")}.` : "Все цифры свободны.";
}

function joeGamePlayerNumbers(assignments, player) {
  return [...(assignments.byPlayerId.get(player.id) || [])].sort((a, b) => a - b);
}

function joeGameRollParticipants(assignments) {
  return state.players.map((player) => `${playerChoiceBadge(player)} <strong>${joeGamePlayerNumbers(assignments, player).join(", ") || "-"}</strong>`);
}

function joeGameRollOutcomes(assignments) {
  return [1, 2, 3, 4, 5, 6].map((number) => {
    const player = assignments.byNumber.get(number);
    return {
      label: String(number),
      effect: player ? `${plainText(playerName(player))}: 2 карты Лавки Джо` : "пусто",
    };
  });
}

async function awardJoeGameShopCards(player, cards) {
  if (!cards.length) return "ничего: в колоде Лавки Джо нет доступных карт";

  await revealShopCards(cards, player);
  player.items.push(...cards.map(ownedShopItem).filter(Boolean));
  discardCardsToDeck("shop", cards);
  recordShopCards(player);
  render();

  const cardNames = cards.map((card) => `<strong>${card.title}</strong>`).join(" / ");
  if (cards.length < 2) return `только 1 карту Лавки Джо: ${cardNames}`;
  return `2 карты Лавки Джо: ${cardNames}`;
}

async function resolvePassThroughShop(player) {
  if (cellEvents[player.position] !== "shop") return;
  if (passThroughAllEnabled()) return;

  log(`${playerName(player)} проходит через <strong>Лавку Джо</strong>.`, { toast: true });
  await resolveShop(player);
}

async function resolvePassThroughEnemy(player) {
  if (cellEvents[player.position] !== "enemy") return false;
  if (passThroughAllEnabled()) return false;
  return resolveEnemyBattle(player);
}

function chooseShopCard(player, offer) {
  state.pendingShop = { offer, playerId: player.id };
  render();

  return new Promise((resolve) => {
    state.shopResolver = (cardId) => {
      const card = offer.find((item) => item.id === cardId) || null;
      state.pendingShop = null;
      state.shopResolver = null;
      resolve(card);
    };
    scheduleBotAction(botChoiceDelay("preRoll"), { replace: true });
  });
}

function chooseCardAction(config) {
  state.pendingCardChoice = { ...config, previewField: false };
  render();

  return new Promise((resolve) => {
    state.cardChoiceResolver = (choiceId) => {
      state.pendingCardChoice = null;
      state.cardChoiceResolver = null;
      resolve(choiceId);
    };
    scheduleBotAction(botChoiceDelay("card"), { replace: true });
  });
}

async function movePlayerSteps(player, steps, { resolveBackwardLanding = false } = {}) {
  let shouldResolveLanding = steps > 0 || (steps < 0 && resolveBackwardLanding);

  if (steps > 0) {
    for (let step = 0; step < steps && player.position !== finishCell; step += 1) {
      const currentPosition = player.position;
      const nextPosition = getNextOptions(player.position)[0]?.cell;
      if (!nextPosition) break;
      const blockingDoor = lockedDoorForTransition(player, currentPosition, nextPosition);
      if (blockingDoor) {
        await showActionPrompt(
          `${playerName(player)} не может пройти ${blockingDoor.label}: победи врага с силой <strong>${monsterStrengthText(blockingDoor)}</strong>`,
          { autoFor: player },
        );
        break;
      }
      const beforeMoveCell = player.position;
      player.position = nextPosition;
      recordPlayerMoved(player, nextPosition);
      resolveMagicWalletOvertake(player, beforeMoveCell, nextPosition);
      if (step < steps - 1) await resolveJumpSteal(player);
      render();
      await sleep(120);
      const enemyBattle = await resolvePassThroughEnemy(player);
      if (state.finished || player.position !== nextPosition) break;
      if (enemyBattle?.winner === "player" && !enemyBattle.isFinalBoss && !passThroughAllEnabled()) break;
      await resolvePortalAtCurrentCell(player, { remaining: steps - step - 1 });
      if (step < steps - 1) {
        await resolvePassThroughShop(player);
      }
    }
  } else if (steps < 0) {
    const currentIndex = routeCells.findIndex((cell) => cellKey(cell.col, cell.row) === player.position);
    if (currentIndex >= 0) {
      const targetIndex = Math.max(0, currentIndex + steps);
      for (let index = currentIndex - 1; index >= targetIndex; index -= 1) {
        recordPlayerMoved(player, cellKey(routeCells[index].col, routeCells[index].row));
      }
      player.position = cellKey(routeCells[targetIndex].col, routeCells[targetIndex].row);
      render();
      await sleep(160);
    }
  }

  pulseTile(player.position);
  if (shouldResolveLanding) {
    await resolveLanding(player);
  }
}

function addCoins(player, amount) {
  const bonus = amount > 0 ? playerCoinBonus(player) : 0;
  const before = player.coins;
  player.coins = Math.max(0, player.coins + amount + bonus);
  const delta = player.coins - before;
  recordCoinDelta(player, delta);
  if (delta !== 0) showCoinFloat(player, delta);
  return amount + bonus;
}

function awardMonsterHuntReward(player) {
  const amount = activeTadamEffects("monster-win-coins")
    .reduce((sum, effect) => sum + Math.max(0, Number(effect.amount) || 0), 0);
  if (amount <= 0) return 0;
  addCoins(player, amount);
  return amount;
}

function monsterHuntRewardText(amount) {
  if (amount <= 0) return "";
  return ` ТАДАМ: <strong>Охота на монстра</strong> дает <strong>${coinAmount(amount)}</strong>.`;
}

function stealCoins(fromPlayer, toPlayer, amount) {
  if (!fromPlayer || !toPlayer || fromPlayer.id === toPlayer.id) return 0;
  const taken = Math.min(amount, fromPlayer.coins);
  fromPlayer.coins -= taken;
  if (taken > 0) {
    recordCoinDelta(fromPlayer, -taken);
    showCoinFloat(fromPlayer, -taken);
  }
  addCoins(toPlayer, taken);
  return taken;
}

function stealFromRandomPlayer(player, amount) {
  const target = randomOpponent(player);
  if (!target) return;
  const taken = stealCoins(target, player, amount);
  if (taken > 0) recordEffectReceived(target, player);
  log(`${playerName(player)} забирает у ${playerName(target)} <strong>${taken} монет</strong>.`);
}

async function stealFromRichestPlayer(player, amount) {
  const target = await richestOpponent(player);
  if (!target) return;
  const taken = stealCoins(target, player, amount);
  if (taken > 0) recordEffectReceived(target, player);
  log(`${playerName(player)} забирает у самого богатого игрока ${playerName(target)} <strong>${taken} монет</strong>.`);
}

async function stealFromChosenPlayer(player, amount) {
  const targets = state.players.filter((target) => target.id !== player.id);
  if (!targets.length) {
    log(`${playerName(player)} не может выбрать цель для кражи монет.`, { toast: true });
    return;
  }

  const choices = targets.map((target) => ({
    id: String(target.id),
    label: playerChoiceBadge(target),
    note: coinAmount(target.coins),
    noteClass: "choice-player-note",
    score: target.coins * 2 + leaderPressureScore(target),
  }));
  const choice = await chooseCardAction({
    choices,
    kicker: "Хорошо",
    kind: "steal-chosen-player",
    playerId: player.id,
    summary: `${playerChoiceBadge(player)} выбирает другого игрока и забирает у него до ${coinAmount(amount)}.`,
    title: "У кого забрать монеты?",
  });
  const target = targets.find((item) => item.id === Number(choice));
  if (!target) return;

  const taken = stealCoins(target, player, amount);
  if (taken > 0) recordEffectReceived(target, player);
  log(`${playerName(player)} выбирает ${playerName(target)} и забирает <strong>${coinAmount(taken)}</strong>.`, { toast: true });
}

async function giveToChosenPlayer(player, amount) {
  const targets = state.players.filter((target) => target.id !== player.id);
  if (!targets.length) {
    log(`${playerName(player)} не может выбрать игрока для передачи монет.`, { toast: true });
    return;
  }

  const choices = targets.map((target) => ({
    id: String(target.id),
    label: playerChoiceBadge(target),
    note: coinAmount(target.coins),
    noteClass: "choice-player-note",
    score: 100 - target.coins * 2 - leaderPressureScore(target) * 0.2,
  }));
  const choice = await chooseCardAction({
    choices,
    kicker: "Плохо",
    kind: "give-chosen-player",
    playerId: player.id,
    summary: `${playerChoiceBadge(player)} выбирает другого игрока и отдает ему до ${coinAmount(amount)}.`,
    title: "Кому отдать монеты?",
  });
  const target = targets.find((item) => item.id === Number(choice));
  if (!target) return;

  const given = stealCoins(player, target, amount);
  if (given > 0) recordEffectReceived(target, player);
  log(`${playerName(player)} выбирает ${playerName(target)} и отдает <strong>${coinAmount(given)}</strong>.`, { toast: true });
}

async function giveToPoorestPlayer(player, amount) {
  const target = await poorestOpponent(player);
  if (!target) return;
  const given = stealCoins(player, target, amount);
  if (given > 0) recordEffectReceived(target, player);
  log(`${playerName(player)} отдает самому бедному игроку ${playerName(target)} <strong>${given} монет</strong>.`);
}

async function resolveJumpSteal(player) {
  const effect = activeTadamEffect("jump-steal");
  if (!effect) return;
  const targets = state.players.filter((target) => target.id !== player.id && target.position === player.position);
  if (!targets.length) return;

  const results = targets.map((target) => {
    const taken = stealCoins(target, player, effect.amount);
    if (taken > 0) recordEffectReceived(target, player);
    return { taken, target };
  });
  const total = results.reduce((sum, result) => sum + result.taken, 0);
  const details = results
    .map(({ taken, target }) => `${playerName(target)} - <strong>${coinAmount(taken)}</strong>`)
    .join(", ");
  if (total > 0) {
    log(`${playerName(player)} перепрыгивает игроков и забирает монеты: ${details}. Всего: <strong>${coinAmount(total)}</strong>.`);
  } else {
    log(`${playerName(player)} перепрыгивает игроков, но забрать монеты не удалось: ${details}.`);
  }
}

async function resolveLandSteal(player) {
  const effect = activeTadamEffect("land-steal");
  if (!effect) return;
  const candidates = state.players.filter((target) => target.id !== player.id && target.position === player.position);
  const target = await resolveOnePlayerTieByDie(candidates, {
    autoFor: player,
    reason: "остановка на клетке с другим игроком",
  });
  if (!target) return;
  const taken = stealCoins(target, player, effect.amount);
  if (taken > 0) {
    recordEffectReceived(target, player);
    log(`${playerName(player)} останавливается рядом с ${playerName(target)} и забирает <strong>${taken} монет</strong>.`);
  }
}

function renderTadams() {
  tadamTableEl.innerHTML = "";
  const visibleCards = visibleTadamCards();

  for (let index = 0; index < 3; index += 1) {
    const card = visibleCards[index] || null;
    const item = document.createElement("article");
    item.className = `tadam-slot ${card ? "is-filled" : "is-empty"}`;
    item.innerHTML = card
      ? `
        <span class="tadam-slot-text">
          <span>${iconizeHtml(cardDisplayText(card))}</span>
        </span>
      `
      : `<span class="tadam-slot-empty">${index + 1}</span>`;
    tadamTableEl.append(item);
  }
}

function visibleTadamCards() {
  return state.tadams.slice(-3).reverse();
}

function tileType(cell) {
  if (fieldCells.has(cell) === false) return "empty";
  if (cell === startCell) return "start";
  if (cellEvents[cell]) return cellEvents[cell];
  if (cell === finishCell) return "finish";
  return "path";
}

function tileTitle(cell) {
  if (cell === startCell) return "Старт";
  if (doorByEnemyCell(cell)?.isFinalBoss) return "Финальный монстр";
  if (cell === finishCell) return "Финиш";
  const namesByEvent = {
    bad: "Плохо",
    "very-bad": 'Очень Плохо — возьми 3 карты "Плохо"',
    "big-rest": "Большой привал — выбери: восстановиться +10 монет; потренироваться +1 силе; ускориться +2 к шагам",
    "black-market": "Черный рынок — заплати 5, получи карту Лавки Джо и карту Событие; заплати 10, получи +1 к силе и карту Событие; заплати 15, получи +10 к силе в следующей битве с монстром",
    "chaos-portal": "Портал хаоса — 1-2: назад к ближайшему монстру/порталу; 3-4: к ближайшей Лавке Джо; 5: к ближайшему Хорошо; 6: вперед к ближайшему монстру/порталу",
    "dice-fortune": `Кубик удачи — кинь кубик ${diceFortuneDiceCount} раз, получи ${diceFortuneCoinReward} монет за каждую 6, походи на ${diceFortuneBackwardStepPenalty} шагов назад за каждую 1`,
    enemy: "Враг — Сразись с врагом",
    event: "Событие",
    good: "Хорошо",
    green: "Зеленое поле",
    "joe-auction": "Аукцион Джо — открываются 3 карты Лавки Джо. Все игроки, начиная с активного игрока, делают ставки монетами либо пасуют. Победитель забирает все 3 карты Лавка Джо. Остальные игроки забирают свои поставленные монеты",
    "joe-game": "Игра Джо — выбери 2 цифры себе и по 1 каждому другому игроку. Брось кубик: игрок с выпавшей цифрой получает 2 карты Лавки Джо",
    "pay-double": "Удвой свои монеты",
    red: "Красное поле",
    shop: "Лавка Джо",
    tadam: "ТАДАМ!",
    vs: "VS — все игроки скидывают по 10 монет, затем между ними происходит битва. Игрок с наибольшей силой забирает все скинутые монеты",
  };
  return namesByEvent[cellEvents[cell]] || "Клетка";
}

function fieldEffectText(cell) {
  if (cell === startCell) return "<span>Старт</span><strong>Начальная клетка</strong>";
  if (doorByEnemyCell(cell)?.isFinalBoss) return "<span>Финальный монстр</span><strong>победи и стань боссом</strong>";
  if (cell === finishCell) return "<span>Финиш</span><strong>финальная битва</strong>";

  const texts = {
    bad: ["Плохо", "тяни карту Плохо"],
    "very-bad": ["Очень Плохо", 'Возьми 3 карты "Плохо"'],
    "big-rest": ["Большой привал", "Выбери: восстановиться +10 монет; потренироваться +1 силе; ускориться +2 к шагам"],
    "black-market": ["Черный рынок", "Можешь купить: 5 - Лавка Джо + Событие; 10 - +1 к силе + Событие; 15 - +10 к следующему монстру"],
    "chaos-portal": ["Портал хаоса", "1-2: назад к монстру/порталу; 3-4: к Лавке; 5: к Хорошо; 6: вперед к монстру/порталу"],
    "dice-fortune": ["Кубик удачи", `6 бросков: 6 = +${diceFortuneCoinReward} монет, 1 = -${diceFortuneBackwardStepPenalty} шагов`],
    enemy: ["Враг", "Сразись с врагом"],
    event: ["Событие", "тяни карту Событие"],
    good: ["Хорошо", "тяни карту Хорошо"],
    green: ["Зеленое поле", greenEffectLabel()],
    "joe-auction": ["Аукцион Джо", "3 карты Лавки Джо. Ставки от активного игрока. Победитель забирает все 3"],
    "joe-game": ["Игра Джо", "Выбери цифры. Выпавший игрок получает 2 Лавки Джо"],
    "pay-double": ["Удвой свои монеты", "Удвой свои монеты"],
    red: ["Красное поле", redEffectLabel()],
    shop: ["Лавка Джо", "2 карты на выбор за 5 монет"],
    tadam: ["ТАДАМ!", "новое общее правило"],
    vs: ["VS", "Все скидывают по 10 монет и сражаются за банк"],
  };
  const text = texts[cellEvents[cell]] || ["Обычная клетка", "без эффекта"];
  return iconizeHtml(`<span>${text[0]}</span><strong>${text[1]}</strong>`);
}

function turnActionsText(player) {
  if (state.pendingPreRoll?.playerId === player.id) {
    const card = state.pendingPreRoll.card || player.items.find((item) => item.effect?.type === "optional-extra-die");
    const cardTitle = card?.shortTitle || card?.title || "Карта Лавки Джо";
    const cost = card?.effect?.cost ?? 2;
    const dice = card?.effect?.dice ?? 1;
    const current = state.pendingPreRoll.index + 1;
    const total = state.pendingPreRoll.total;
    return `
      <div class="pre-roll-action">
        <span>
          <b><span>${cardTitle}</span>${total > 1 ? `<em class="pre-roll-count">${current}/${total}</em>` : ""}</b>
          <span class="pre-roll-copy">Заплати ${coinAmount(cost)}: ${diceAmount(`+${dice}`)}</span>
        </span>
        <div>
          <button type="button" data-preroll-choice="yes">Заплатить</button>
          <button type="button" data-preroll-choice="no">Не платить</button>
        </div>
      </div>
    `;
  }

  const actions = [];
  const rageBonus = nextMonsterBattleBonus(player);
  const curseStatus = nextBattlePenaltyStatus(player);
  if (rageBonus > 0) {
    actions.push(`
      <span class="action-chip rage-action-chip" title="Зелье ярости сработает в следующей битве с монстром">
        <b>+${rageBonus}</b>
        <span>зелье ярости</span>
      </span>
    `);
  }
  if (curseStatus) {
    actions.push(`
      <span class="action-chip curse-action-chip" title="Сглаз сработает в следующем бою">
        <b>${curseStatus.penalty}</b>
        <span>сглаз</span>
      </span>
    `);
  }
  const extraDiceCards = optionalExtraDieCards(player);
  const extraDiceGroups = new Map();
  for (const card of extraDiceCards) {
    const cost = card.effect.cost;
    const dice = card.effect.dice;
    const key = `${cost}:${dice}`;
    const group = extraDiceGroups.get(key) || { cost, dice, count: 0 };
    group.count += 1;
    extraDiceGroups.set(key, group);
  }
  for (const group of extraDiceGroups.values()) {
    const canPay = player.coins >= group.cost;
    const countText = group.count > 1 ? `<em class="action-chip-count">x${group.count}</em>` : "";
    actions.push(`
      <span class="action-chip extra-die-action-chip ${canPay ? "" : "disabled"}">
        <span class="action-chip-cost">${coinAmount(group.cost)}</span>
        <span>${diceAmount(`+${group.dice}`)}</span>
        ${countText}
      </span>
    `);
  }

  if (actions.length === 0) return '<span class="action-empty">нет действий</span>';
  return `<span class="action-label">Действия</span><div class="action-chip-list">${actions.join("")}</div>`;
}

function greenEffectLabel() {
  const effect = activeFieldEffect("green-field");
  const base = `+${coinAmount(3)}`;
  if (effect?.mode === "draw") return [base, `карта ${deckLabel(effect.deck)}`].filter(Boolean).join(" + ");
  if (effect?.mode === "move") return [base, `${effect.steps > 0 ? "+" : ""}${effect.steps} шагов`].filter(Boolean).join(" + ");
  return base;
}

function redEffectLabel() {
  const effect = activeFieldEffect("red-field");
  const base = coinAmount(-3);
  if (effect?.mode === "draw") return [base, `карта ${deckLabel(effect.deck)}`].filter(Boolean).join(" + ");
  if (effect?.mode === "move") return [base, `${effect.steps > 0 ? "+" : ""}${effect.steps} шагов`].filter(Boolean).join(" + ");
  return base;
}

function doorByCell(cell) {
  return state?.doors ? Object.values(state.doors).find((door) => door.cell === cell) : doorConfigs.find((door) => door.cell === cell);
}

function doorByEnemyCell(cell) {
  return state?.doors
    ? Object.values(state.doors).find((door) => door.enemyCell === cell)
    : doorConfigs.find((door) => door.enemyCell === cell);
}

function doorForTransition(fromCell, toCell) {
  const doors = state?.doors ? Object.values(state.doors) : doorConfigs;
  return doors.find(
    (door) => (door.enemyCell === fromCell && door.toCell === toCell) || (door.enemyCell === toCell && door.toCell === fromCell),
  );
}

function lockedDoorForTransition(player, fromCell, toCell) {
  const door = doorForTransition(fromCell, toCell);
  return door && !isDoorOpenForPlayer(door, player) ? door : null;
}

async function resolvePortalAtCurrentCell(player, { animate = true, remaining = 0 } = {}) {
  const door = doorByEnemyCell(player.position);
  if (!door || door.isFinalBoss || !isDoorOpenForAllPlayers(door)) return false;

  const targetCell = animate ? await choosePortalDestination(player, door, remaining) : null;
  if (!targetCell || targetCell === player.position) return false;

  player.position = targetCell;
  recordPlayerMoved(player, targetCell);
  state.walkPath = [];
  if (animate) {
    render();
    await sleep(120);
  }
  return true;
}

function choosePortalDestination(player, currentDoor, remaining) {
  const portalDoors = Object.values(state.doors).filter(
    (door) => !door.isFinalBoss && door.enemyCell !== currentDoor.enemyCell && isDoorOpenForAllPlayers(door),
  );
  if (portalDoors.length === 0) return null;

  state.pendingChoice = {
    kind: "portal",
    currentCell: currentDoor.enemyCell,
    playerId: player.id,
    previewField: false,
    remaining,
    choices: [
      ...portalDoors.map((door) => ({
        cell: door.enemyCell,
        label: door.label,
        note: `клетка ${cellLabel(door.enemyCell)}`,
      })),
      {
        cell: currentDoor.enemyCell,
        className: "decline",
        label: "Не входить",
        note: "пройти дальше",
      },
    ],
  };
  state.isAnimating = false;
  render();

  return new Promise((resolve) => {
    state.choiceResolver = (cell) => {
      state.pendingChoice = null;
      state.choiceResolver = null;
      state.isAnimating = true;
      resolve(cell);
    };
    scheduleBotAction(botChoiceDelay("choice"), { replace: true });
  });
}

function portalPreviewEndCells() {
  const pending = state?.pendingChoice;
  if (pending?.kind !== "portal") return [];

  const player = state.players.find((item) => item.id === pending.playerId) || currentPlayer();
  const usedCells = new Set();
  return pending.choices
    .map((choice) => ({
      cell: projectedPortalEndCell(player, choice.cell, pending.remaining),
      label: choice.label,
    }))
    .filter((item) => {
      if (!item.cell || usedCells.has(item.cell)) return false;
      usedCells.add(item.cell);
      return true;
    });
}

function projectedPortalEndCell(player, exitCell, remaining = 0) {
  let currentCell = exitCell;
  const steps = Math.max(0, Number(remaining) || 0);

  for (let step = 0; step < steps && currentCell !== finishCell; step += 1) {
    const nextCell = defaultNextCell(currentCell);
    if (!nextCell) break;
    if (lockedDoorForTransition(player, currentCell, nextCell)) break;
    currentCell = nextCell;
  }

  return currentCell;
}

function isDoorOpenForPlayer(door, player) {
  return door.openedBy?.includes(player.id);
}

function isDoorOpenForAllPlayers(door) {
  return state.players.every((player) => isDoorOpenForPlayer(door, player));
}

function buildBoardLayout(config) {
  const layout = Array.from({ length: config.rows }, () => Array.from({ length: config.cols }, () => null));
  for (const cell of config.pathCells || config.route || []) {
    const [col, row] = parseCell(cell);
    if (layout[row]) layout[row][col] = "path";
  }
  for (const [cell, type] of Object.entries(config.events || {})) {
    const [col, row] = parseCell(cell);
    if (layout[row]) layout[row][col] = type;
  }
  return layout;
}

function buildFieldCells() {
  const cells = new Set();
  for (let row = 0; row < boardRows; row += 1) {
    for (let col = 0; col < boardCols; col += 1) {
      if (boardLayout[row]?.[col]) cells.add(cellKey(col, row));
    }
  }
  return cells;
}

function buildRouteCells() {
  return routePath.map((cell) => {
    const [col, row] = parseCell(cell);
    return { col, row };
  });
}

function buildRouteIndex(cells) {
  return new Map(cells.map((cell, index) => [cellKey(cell.col, cell.row), index + 1]));
}

function buildRouteNext(cells) {
  const next = new Map();
  for (let index = 0; index < cells.length - 1; index += 1) {
    next.set(cells[index], cells[index + 1]);
  }
  return next;
}

function buildCellEvents() {
  const events = {};
  for (let row = 0; row < boardRows; row += 1) {
    for (let col = 0; col < boardCols; col += 1) {
      const type = boardLayout[row]?.[col];
      if (!type || type === "path" || type === "start" || type === "finish") continue;
      events[cellKey(col, row)] = type;
    }
  }
  return events;
}

function cellKey(col, row) {
  return `${col}-${row}`;
}

function parseCell(cell) {
  return cell.split("-").map(Number);
}

function cellLabel(cell) {
  if (routeIndex.has(cell)) return routeIndex.get(cell);
  const [col, row] = parseCell(cell);
  return `${col + 1}:${row + 1}`;
}

function cellTitleWithLabel(cell) {
  return `${tileTitle(cell)} ${cellLabel(cell)}`;
}

function currentPlayer() {
  return state.players[state.activePlayer];
}

function currentModifierPlayer() {
  const selected = state.players.find((player) => player.id === state.modifierPlayerId);
  if (selected) return selected;
  const fallback = currentPlayer();
  state.modifierPlayerId = fallback.id;
  return fallback;
}

function selectModifierPlayer(playerId) {
  if (!state?.players?.some((player) => player.id === playerId)) return;
  state.modifierPlayerId = playerId;
  render();
}

function findWinner() {
  if (state.finalBattle?.winnerId !== undefined) {
    return state.players.find((player) => player.id === state.finalBattle.winnerId) || state.players[0];
  }
  return [...state.players].sort((a, b) => b.coins - a.coins || cellLabel(b.position) - cellLabel(a.position))[0];
}

function hasTadam(id) {
  return state.tadams.some((card) => card.id === id);
}

function activeTadamEffect(type) {
  return state.tadams.find((card) => card.effect?.type === type)?.effect || null;
}

function activeTadamEffects(type) {
  return state.tadams
    .filter((card) => card.effect?.type === type)
    .map((card) => card.effect);
}

function activeFieldEffect(type) {
  const card = state.tadams.find((item) => item.effect?.type === type);
  return card?.effect || null;
}

function playerStepBonus(player) {
  return playerManualStepBonus(player) + player.items
    .filter((item) => item.effect?.type === "passive-step-bonus")
    .reduce((sum, item) => sum + item.effect.steps, 0);
}

function playerManualStepBonus(player) {
  return player?.stepBonus || 0;
}

function playerBattleBonus(player) {
  return playerManualBattleBonus(player) + player.items
    .filter((item) => item.effect?.type === "passive-battle-bonus")
    .reduce((sum, item) => sum + item.effect.amount, 0);
}

function playerManualBattleBonus(player) {
  return player?.battleBonus || 0;
}

function playerCombatBonus(player) {
  return playerBattleBonus(player);
}

function nextBattlePenaltyCards(player) {
  return Array.isArray(player?.nextBattlePenaltyCards) ? player.nextBattlePenaltyCards : [];
}

function nextBattlePenaltyAmount(player) {
  return nextBattlePenaltyCards(player)
    .reduce((sum, card) => sum + (Number(card.effect?.amount) || -3), 0);
}

function nextBattlePenaltyStatus(player) {
  const cards = nextBattlePenaltyCards(player);
  if (!cards.length) return null;
  return {
    count: cards.length,
    penalty: nextBattlePenaltyAmount(player),
  };
}

function consumeNextBattlePenalty(player) {
  const cards = nextBattlePenaltyCards(player);
  if (!cards.length) return { cards: [], penalty: 0 };
  player.nextBattlePenaltyCards = [];
  const penalty = cards.reduce((sum, card) => sum + (Number(card.effect?.amount) || -3), 0);
  discardCardsToDeck("good", cards);
  return { cards, penalty };
}

function nextBattlePenaltyText(status, compact = false) {
  if (!status?.count) return "";
  const countText = status.count > 1 ? ` x${status.count}` : "";
  return compact ? `Сглаз ${status.penalty}${countText}` : `Сглаз ${status.penalty} к след. бою${countText}`;
}

function nextBadExtraDrawCards(player) {
  return Array.isArray(player?.nextBadExtraDrawCards) ? player.nextBadExtraDrawCards : [];
}

function nextBadExtraDrawStatus(player) {
  const cards = nextBadExtraDrawCards(player);
  if (!cards.length) return null;
  return { count: cards.length };
}

function consumeNextBadExtraDrawCard(player) {
  const cards = nextBadExtraDrawCards(player);
  if (!cards.length) return null;
  const [card] = cards.splice(0, 1);
  player.nextBadExtraDrawCards = cards;
  discardCardsToDeck("good", [card]);
  return card;
}

function nextBadExtraDrawText(status, compact = false) {
  if (!status?.count) return "";
  const countText = status.count > 1 ? ` x${status.count}` : "";
  return compact ? `Двойное Плохо${countText}` : `Двойное Плохо при след. Плохо${countText}`;
}

async function resolveNextBadExtraDraw(player) {
  const card = consumeNextBadExtraDrawCard(player);
  if (!card) return;
  render();
  log(`${playerName(player)} сбрасывает <strong>Двойное Плохо</strong> и берет еще одну карту <strong>Плохо</strong>.`, {
    toast: true,
  });
  await drawAndApplyCard(player, "bad", "Плохо", { skipNextBadExtraDraw: true });
}

function nextMonsterBattleBonus(player) {
  return Math.max(0, Number(player?.nextMonsterBattleBonus) || 0);
}

function playerMonsterBattleBonus(player) {
  return playerCombatBonus(player) + nextMonsterBattleBonus(player);
}

function setNextMonsterBattleBonus(player, amount) {
  if (!player) return;
  player.nextMonsterBattleBonus = Math.max(0, Number(amount) || 0);
}

function consumeNextMonsterBattleBonus(player) {
  const bonus = nextMonsterBattleBonus(player);
  if (bonus > 0) player.nextMonsterBattleBonus = 0;
  return bonus;
}

function battleForceText(amount, compact = false) {
  return `${compact ? "С" : "Сила"} ${amount >= 0 ? "+" : ""}${amount}`;
}

function stepBonusText(amount, compact = false) {
  return `${compact ? "Ш" : "Шаги"} ${amount >= 0 ? "+" : ""}${amount}`;
}

function bonusFormulaText(bonus, total) {
  if (!bonus) return "";
  return ` ${bonus > 0 ? "+" : "-"} ${Math.abs(bonus)} бонус = <strong>${total}</strong>`;
}

function combatBonusFormulaText(baseBonus, cursePenalty, total) {
  const parts = [];
  if (baseBonus) parts.push(`${baseBonus > 0 ? "+" : "-"} ${Math.abs(baseBonus)} бонус`);
  if (cursePenalty) parts.push(`Сглаз ${cursePenalty}`);
  return parts.length ? ` ${parts.join(" ")} = <strong>${total}</strong>` : "";
}

function monsterBattleBonusFormulaText(baseBonus, rageBonus, cursePenaltyOrTotal, maybeTotal) {
  const cursePenalty = maybeTotal === undefined ? 0 : cursePenaltyOrTotal;
  const total = maybeTotal === undefined ? cursePenaltyOrTotal : maybeTotal;
  const parts = [];
  if (baseBonus) parts.push(`${baseBonus > 0 ? "+" : "-"} ${Math.abs(baseBonus)} бонус`);
  if (rageBonus) parts.push(`+ ${rageBonus} зелье ярости`);
  if (cursePenalty) parts.push(`Сглаз ${cursePenalty}`);
  return parts.length ? ` ${parts.join(" ")} = <strong>${total}</strong>` : "";
}

function playerDiceBonus(player) {
  return player.diceBonus || 0;
}

function addDiceBonus(player, amount) {
  if (!player || amount <= 0) return;
  player.diceBonus = playerDiceBonus(player) + amount;
  showDiceFloat(player, amount);
}

function addBattleBonus(player, amount) {
  if (!player || !Number.isFinite(amount) || amount === 0) return;
  player.battleBonus = playerManualBattleBonus(player) + amount;
}

function addStepBonus(player, amount) {
  if (!player || !Number.isFinite(amount) || amount === 0) return;
  player.stepBonus = playerManualStepBonus(player) + amount;
}

function addSelectedPlayerBattleBonus(amount) {
  if (!state?.players?.length) return;
  const player = currentModifierPlayer();
  if (!player || !Number.isFinite(amount) || amount === 0) return;
  addBattleBonus(player, amount);
  log(`${playerName(player)}: сила ${amount > 0 ? "+" : "-"}<strong>${Math.abs(amount)}</strong>. Сейчас: <strong>${battleForceText(playerBattleBonus(player))}</strong>.`);
  render();
}

function addSelectedPlayerStepBonus(amount) {
  if (!state?.players?.length) return;
  const player = currentModifierPlayer();
  if (!player || !Number.isFinite(amount) || amount === 0) return;
  addStepBonus(player, amount);
  log(`${playerName(player)}: шаги ${amount > 0 ? "+" : "-"}<strong>${Math.abs(amount)}</strong>. Сейчас: <strong>${stepBonusText(playerStepBonus(player))}</strong>.`);
  render();
}

function exactMoveControlAmount() {
  const amount = Number(ui.exactMoveAmount?.value);
  return Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 4;
}

function passThroughMode() {
  return ui.passThroughMode?.checked ? "all" : "default";
}

function passThroughAllEnabled() {
  return passThroughMode() === "all";
}

async function moveActivePlayerExactSteps() {
  if (
    movementActionInProgress ||
    state.finished ||
    state.isAnimating ||
    state.pendingCardChoice ||
    state.pendingChoice ||
    state.pendingPreRoll ||
    state.pendingShop ||
    actionPromptResolver
  ) {
    return;
  }

  movementActionInProgress = true;
  const player = currentPlayer();
  const steps = exactMoveControlAmount();
  recordTurnStarted(player);
  state.isAnimating = true;
  state.movingPlayerId = player.id;
  state.dice = null;
  state.walkPath = [];
  log(`${playerName(player)} идет читом ровно на <strong>${steps}</strong> шагов без кубиков и бонусов.`);
  render();

  try {
    if (await movePlayerExactSteps(player, steps)) completeMovementTurn(player);
  } finally {
    movementActionInProgress = false;
    startHumanRollCooldown();
    state.isAnimating = false;
    state.movingPlayerId = null;
    render();
  }
}

async function movePlayerExactSteps(player, steps) {
  const currentIndex = routeCells.findIndex((cell) => cellKey(cell.col, cell.row) === player.position);
  if (currentIndex < 0 || steps <= 0) return false;

  const targetIndex = Math.min(routeCells.length - 1, currentIndex + steps);
  for (let index = currentIndex + 1; index <= targetIndex; index += 1) {
    player.position = cellKey(routeCells[index].col, routeCells[index].row);
    recordPlayerMoved(player, player.position);
    render();
    await sleep(120);
  }

  pulseTile(player.position);
  await resolveLanding(player);
  return true;
}

function totalDiceForPlayer(player, extraDice = 0) {
  return Number(ui.diceCount.value) + playerDiceBonus(player) + extraDice;
}

function playerCoinBonus(player) {
  return player.items
    .filter((item) => item.effect?.type === "passive-coin-bonus")
    .reduce((sum, item) => sum + item.effect.amount, 0);
}

function optionalExtraDieCards(player) {
  return player.items.filter((item) => item.effect?.type === "optional-extra-die");
}

function deckLabel(id) {
  const labels = {
    bad: "Плохо",
    event: "Событие",
    good: "Хорошо",
    shop: "Лавка Джо",
    tadam: "ТАДАМ!",
  };
  return labels[id] || id;
}

async function chooseExtraDie(player, animate) {
  if (!animate) return 0;

  let totalDice = 0;
  const cards = optionalExtraDieCards(player);
  for (const [index, card] of cards.entries()) {
    const effect = card.effect;
    if (player.coins < effect.cost) continue;

    const useExtraDie = await chooseSingleExtraDie(player, card, index, cards.length);
    if (!useExtraDie) break;

    addCoins(player, -effect.cost);
    totalDice += effect.dice;
    log(`${playerName(player)} платит <strong>${effect.cost} монеты</strong> за дополнительный кубик.`);
  }

  return totalDice;
}

function chooseSingleExtraDie(player, card, index, total) {
  state.pendingPreRoll = { card, index, playerId: player.id, total };
  render();

  return new Promise((resolve) => {
    state.preRollResolver = (useExtraDie) => {
      state.pendingPreRoll = null;
      state.preRollResolver = null;
      resolve(useExtraDie);
    };
    scheduleBotAction(botChoiceDelay("card"), { replace: true });
  });
}

function pulseTile(cell) {
  state.landingCell = cell;
  render();
  window.setTimeout(() => {
    if (state.landingCell !== cell) return;
    state.landingCell = null;
    render();
  }, 650);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function expandDeck(cards) {
  return cards.flatMap((card) => Array.from({ length: Math.max(1, Number(card.count) || 1) }, () => card));
}

function buildDeckState() {
  return Object.fromEntries(finiteDeckIds.map((deckId) => [
    deckId,
    {
      discard: [],
      draw: shuffleCards(createDeckCopies(deckId)),
    },
  ]));
}

function createDeckCopies(deckId) {
  return (cardConfig[deckId] || []).flatMap((card) => {
    const count = Math.max(0, Math.floor(Number(card.count) || 1));
    return Array.from({ length: count }, (_, copyIndex) => ({
      ...card,
      _copyId: `${deckId}:${card.id}:${copyIndex + 1}`,
      _deckId: deckId,
    }));
  });
}

function shuffleCards(cards) {
  const shuffled = [...cards];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function gameDeck(deckId) {
  if (!state.decks) state.decks = buildDeckState();
  if (!state.decks[deckId]) {
    state.decks[deckId] = {
      discard: [],
      draw: shuffleCards(createDeckCopies(deckId)),
    };
  }
  return state.decks[deckId];
}

function drawCardFromDeck(deckId) {
  const deck = gameDeck(deckId);
  if (deck.draw.length === 0 && deck.discard.length > 0) {
    deck.draw = shuffleCards(deck.discard);
    deck.discard = [];
    log(`Колода <strong>${deckLabel(deckId)}</strong> перемешана.`, { toast: true });
  }
  return deck.draw.pop() || null;
}

function drawCardsFromDeck(deckId, count, { uniqueIds = false } = {}) {
  const deck = gameDeck(deckId);
  const available = deck.draw.length + deck.discard.length;
  const picked = [];
  const held = [];
  const pickedIds = new Set();
  let attempts = 0;

  while (picked.length < count && attempts < available) {
    const card = drawCardFromDeck(deckId);
    attempts += 1;
    if (!card) break;
    if (uniqueIds && pickedIds.has(card.id)) {
      held.push(card);
      continue;
    }
    picked.push(card);
    pickedIds.add(card.id);
  }

  returnCardsToDraw(deckId, held);
  if (picked.length < count && picked.length > 0) {
    log(`В колоде <strong>${deckLabel(deckId)}</strong> доступно только ${picked.length} из ${count} карт.`, { toast: true });
  }
  return picked;
}

function returnCardsToDraw(deckId, cards) {
  if (!cards.length) return;
  const deck = gameDeck(deckId);
  deck.draw.push(...shuffleCards(cards));
}

function discardResolvedCard(deckId, card) {
  if (!card) return;
  if (deckId === "event" && isPersistentEventArtifact(card)) return;
  discardCardToDeck(deckId, card);
}

function isPersistentEventArtifact(card) {
  return Boolean(card?.icon);
}

function discardCardsToDeck(deckId, cards) {
  for (const card of cards) discardCardToDeck(deckId, card);
}

function discardCardToDeck(deckId, card) {
  if (!card) return;
  const deck = gameDeck(deckId || card._deckId);
  const copyId = card._copyId || `${deckId}:${card.id}`;
  if (deck.discard.some((item) => (item._copyId || item.id) === copyId)) return;
  if (deck.draw.some((item) => (item._copyId || item.id) === copyId)) return;
  deck.discard.push(card);
}

function randomOpponent(player) {
  const opponents = state.players.filter((target) => target.id !== player.id);
  return opponents.length ? randomItem(opponents) : null;
}

async function richestOpponent(player) {
  const opponents = state.players.filter((target) => target.id !== player.id);
  if (!opponents.length) return null;
  const maxCoins = Math.max(...opponents.map((target) => target.coins));
  const candidates = opponents.filter((target) => target.coins === maxCoins);
  return resolveOnePlayerTieByDie(candidates, {
    autoFor: player,
    reason: `самый богатый игрок (${coinAmount(maxCoins)})`,
  });
}

async function poorestOpponent(player) {
  const opponents = state.players.filter((target) => target.id !== player.id);
  if (!opponents.length) return null;
  const minCoins = Math.min(...opponents.map((target) => target.coins));
  const candidates = opponents.filter((target) => target.coins === minCoins);
  return resolveOnePlayerTieByDie(candidates, {
    autoFor: player,
    reason: `самый бедный игрок (${coinAmount(minCoins)})`,
  });
}

async function richestPlayerByCoins({ excludeIds = [], reason = "самый богатый игрок", autoFor = null } = {}) {
  const excluded = new Set(excludeIds);
  const candidatesPool = state.players.filter((target) => !excluded.has(target.id));
  if (!candidatesPool.length) return null;
  const maxCoins = Math.max(...candidatesPool.map((target) => target.coins));
  const candidates = candidatesPool.filter((target) => target.coins === maxCoins);
  return resolveOnePlayerTieByDie(candidates, {
    autoFor,
    reason: `${reason} (${coinAmount(maxCoins)})`,
  });
}

async function poorestPlayerByCoins({ excludeIds = [], reason = "самый бедный игрок", autoFor = null } = {}) {
  const excluded = new Set(excludeIds);
  const candidatesPool = state.players.filter((target) => !excluded.has(target.id));
  if (!candidatesPool.length) return null;
  const minCoins = Math.min(...candidatesPool.map((target) => target.coins));
  const candidates = candidatesPool.filter((target) => target.coins === minCoins);
  return resolveOnePlayerTieByDie(candidates, {
    autoFor,
    reason: `${reason} (${coinAmount(minCoins)})`,
  });
}

async function routeExtremePlayer(kind, { excludeIds = [], reason = "позиция на маршруте", autoFor = null } = {}) {
  const excluded = new Set(excludeIds);
  const candidatesPool = state.players.filter((target) => !excluded.has(target.id));
  if (!candidatesPool.length) return null;
  const progressValues = candidatesPool.map((target) => routeProgress(target));
  const extreme = kind === "last" ? Math.min(...progressValues) : Math.max(...progressValues);
  const candidates = candidatesPool.filter((target) => routeProgress(target) === extreme);
  return resolveOnePlayerTieByDie(candidates, {
    autoFor,
    reason: `${reason} (клетка маршрута ${extreme})`,
  });
}

async function resolveOnePlayerTieByDie(candidates, { reason = "спор за цель", autoFor = null } = {}) {
  let tied = [...new Map((candidates || []).filter(Boolean).map((player) => [player.id, player])).values()];
  if (tied.length <= 1) return tied[0] || null;

  let round = 1;
  while (tied.length > 1) {
    const participants = tied.map(playerChoiceBadge);
    const results = [];
    for (const player of tied) {
      const rollContext = {
        criterion: "Больший бросок выбирает игрока. При равенстве игроки перебрасывают.",
        kicker: "Жребий",
        participants,
        reason,
        title: round > 1 ? `Переброс ${round}` : "Ничья за цель",
      };
      await showActionPrompt(`${playerName(player)} бросает кубик для жребия.`, {
        autoFor: autoFor || player,
        buttonLabel: "Бросить кубик",
        rollContext,
      });
      const roll = rollDice(1)[0];
      state.dice = null;
      render();
      showRollContextStatus({
        ...rollContext,
        result: `${playerName(player)} бросает кубик жребия.`,
      });
      await animateDice([roll], { label: reason || "Жребий", player });
      state.dice = roll;
      results.push({ player, roll });
    }
    const maxRoll = Math.max(...results.map((result) => result.roll));
    const winners = results.filter((result) => result.roll === maxRoll).map((result) => result.player);
    const resultText = results.map((result) => `${playerName(result.player)}: <strong>${result.roll}</strong>`).join(", ");
    const reasonText = reason ? ` (${reason})` : "";
    const roundText = round > 1 ? `, переброс ${round}` : "";
    if (winners.length === 1) {
      log(`Спор за цель${reasonText}${roundText}: ${resultText}. Выбран ${playerName(winners[0])}.`, { toast: true });
      await showActionPrompt("", {
        autoFor: autoFor || winners[0],
        rollContext: {
          criterion: "Больший бросок выбирает игрока.",
          kicker: "Жребий",
          participants: results.map((result) => `${playerChoiceBadge(result.player)} <strong>${result.roll}</strong>`),
          reason,
          result: `${playerName(winners[0])} выбран по броску ${maxRoll}.`,
          title: "Результат жребия",
        },
      });
      return winners[0];
    }
    log(`Спор за цель${reasonText}${roundText}: ${resultText}. Ничья, перебрасывают ${winners.map(playerName).join(", ")}.`, {
      toast: true,
    });
    await showActionPrompt("", {
      autoFor: autoFor || winners[0],
      rollContext: {
        criterion: "Больший бросок выбирает игрока.",
        kicker: "Жребий",
        participants: results.map((result) => `${playerChoiceBadge(result.player)} <strong>${result.roll}</strong>`),
        reason,
        result: `Ничья на ${maxRoll}: ${winners.map(playerName).join(", ")} перебрасывают.`,
        title: "Нужен переброс",
      },
    });
    tied = winners;
    round += 1;
    if (autoFor) await sleep(isBot(autoFor) ? 180 : 360);
  }
  return tied[0] || null;
}

function playerName(player) {
  return `<span class="player-name" style="--player-color: ${player.color}">${player.name}</span>`;
}

function playerChoiceBadge(player) {
  return `
    <span class="choice-player-badge" style="--player-color: ${player.color}">
      <img src="${player.token}" alt="" aria-hidden="true">
      <span>${player.name}</span>
    </span>
  `;
}

function coinIcon() {
  return `<img class="coin-icon" src="${coinIconSrc}" alt="" aria-hidden="true">`;
}

function coinAmount(amount) {
  return `<span class="coin-amount"><b>${amount}</b>${coinIcon()}</span>`;
}

function diceIcon() {
  return `<img class="dice-icon" src="${diceIconSrc}" alt="" aria-hidden="true">`;
}

function diceAmount(amount) {
  return `<span class="dice-amount"><b>${amount}</b>${diceIcon()}</span>`;
}

function coinizeHtml(value) {
  return String(value)
    .replace(/([+-]?\d+)\s*монет(?:ами|ам|ах|а|ы|у)?/gi, (_, amount) => coinAmount(amount))
    .replace(/монет(?:ами|ам|ах|а|ы|у)?/gi, coinIcon());
}

function diceizeHtml(value) {
  return String(value)
    .replace(/([+-]?\d+)\s*куб(?:иков|иках|икам|иками|ика|ики|ик|ов|а|ы|у|\.)?/giu, (_, amount) => diceAmount(amount))
    .replace(/куб(?:иков|иках|икам|иками|ика|ики|ик|ов|а|ы|у|\.)?/giu, diceIcon());
}

function iconizeHtml(value) {
  return diceizeHtml(coinizeHtml(value));
}

function showCoinFloat(player, amount) {
  if (!player || amount === 0) return;

  const token = boardEl.querySelector(`.map-token[data-player-id="${player.id}"]`);
  if (!token) return;

  const float = document.createElement("span");
  const sign = amount > 0 ? "+" : "-";
  float.className = `coin-float ${amount < 0 ? "is-negative" : "is-positive"}`;
  float.innerHTML = `${sign}${coinAmount(Math.abs(amount))}`;
  token.append(float);
  window.setTimeout(() => float.remove(), 1200);
}

function showDiceFloat(player, amount) {
  if (!player || amount <= 0) return;

  const token = boardEl.querySelector(`.map-token[data-player-id="${player.id}"]`);
  if (!token) return;

  const float = document.createElement("span");
  float.className = "dice-float";
  float.innerHTML = `+${diceAmount(amount)}`;
  token.append(float);
  window.setTimeout(() => float.remove(), 1200);
}

function log(message, { toast = false } = {}) {
  const renderedMessage = iconizeHtml(message);
  const item = document.createElement("li");
  item.innerHTML = renderedMessage;
  gameLogEl.prepend(item);
  while (gameLogEl.children.length > 40) gameLogEl.lastElementChild.remove();
  updateLogLimit();

  if (toast) showEventToast(trimToastTrailingDot(renderedMessage));
}

function updateLogLimit() {
  if (!gameLogEl) return;
  gameLogEl.classList.toggle("is-expanded", logExpanded);
  gameLogEl.dataset.limit = logExpanded ? "20" : "5";
  if (ui.logToggle) {
    ui.logToggle.textContent = logExpanded ? "Показать 5" : "Показать 20";
    ui.logToggle.setAttribute("aria-expanded", String(logExpanded));
  }
}

function trimToastTrailingDot(message) {
  return String(message).replace(/\.(\s*)$/, "$1");
}

function showEventToast(message) {
  if (!ui.eventToast) return;

  window.clearTimeout(eventToastFadeTimer);
  window.clearTimeout(eventToastHideTimer);

  ui.eventToast.hidden = false;
  ui.eventToast.innerHTML = `<div class="event-toast-copy">${iconizeHtml(message)}</div>`;
  ui.eventToast.classList.remove("action-prompt", "roll-event-prompt", "roll-context-prompt", "roll-context-status", "fading", "quick-fading", "visible");
  ui.eventToast.style.removeProperty("top");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");

  eventToastFadeTimer = window.setTimeout(() => {
    hideEventToast();
  }, eventToastVisibleMs);
}

function showRollContextStatus(contextInput) {
  const context = normalizeRollContext(contextInput);
  if (!ui.eventToast || !context) return;

  window.clearTimeout(eventToastFadeTimer);
  window.clearTimeout(eventToastHideTimer);
  actionPromptRollContext = null;

  ui.eventToast.hidden = false;
  ui.eventToast.innerHTML = `<div class="event-toast-copy">${iconizeHtml(rollContextPromptMarkup("", context))}</div>`;
  ui.eventToast.classList.remove("action-prompt", "fading", "quick-fading", "visible");
  ui.eventToast.classList.add("roll-event-prompt", "roll-context-prompt", "roll-context-status");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");
  syncRollEventPromptViewport();
}

function showActionPrompt(message, { buttonLabel = "Далее", autoFor = null, rollContext = null } = {}) {
  if (!ui.eventToast) return Promise.resolve();

  window.clearTimeout(eventToastFadeTimer);
  window.clearTimeout(eventToastHideTimer);

  actionPromptRollContext = normalizeRollContext(rollContext);
  ui.eventToast.hidden = false;
  ui.eventToast.innerHTML = `<div class="event-toast-copy">${iconizeHtml(rollContextPromptMarkup(message, actionPromptRollContext))}</div>`;
  ui.eventToast.classList.toggle("roll-event-prompt", Boolean(ui.eventToast.querySelector(".roll-event-card, .roll-context-card")));
  ui.eventToast.classList.toggle("roll-context-prompt", Boolean(actionPromptRollContext));
  ui.eventToast.classList.remove("roll-context-status", "fading", "quick-fading", "visible");
  ui.eventToast.classList.add("action-prompt");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");
  syncRollEventPromptViewport();
  actionPromptButtonLabel = buttonLabel;
  actionPromptAutoPlayerId = autoFor?.id ?? null;
  actionPromptChoiceOptions = [];
  actionPromptChoiceResolver = null;

  return new Promise((resolve) => {
    actionPromptResolver = () => {
      actionPromptResolver = null;
      actionPromptButtonLabel = "Далее";
      actionPromptAutoPlayerId = null;
      actionPromptChoiceOptions = [];
      actionPromptChoiceResolver = null;
      actionPromptRollContext = null;
      hideEventToast({ quick: true });
      render();
      resolve();
    };
    render();
    const promptDelay = ["Открыть", "Применить"].includes(buttonLabel)
      ? "card"
      : buttonLabel === "Бросить кубик"
        ? "roll"
        : buttonLabel === "Далее"
          ? "result"
          : "prompt";
    scheduleBotAction(botDelay(promptDelay), { replace: true });
  });
}

function hideEventToast({ quick = false } = {}) {
  if (!ui.eventToast || ui.eventToast.hidden) return;

  window.clearTimeout(eventToastFadeTimer);
  window.clearTimeout(eventToastHideTimer);

  ui.eventToast.classList.toggle("quick-fading", quick);
  ui.eventToast.classList.add("fading");
  ui.eventToast.classList.remove("visible");

  eventToastHideTimer = window.setTimeout(() => {
    ui.eventToast.hidden = true;
    ui.eventToast.classList.remove("action-prompt", "roll-event-prompt", "roll-context-prompt", "roll-context-status", "visible", "fading", "quick-fading");
    ui.eventToast.innerHTML = "";
    ui.eventToast.style.removeProperty("top");
  }, quick ? eventToastQuickFadeMs : eventToastFadeMs);
}

function syncRollEventPromptViewport() {
  if (!ui.eventToast) return;

  const isRollEventPrompt = ui.eventToast.classList.contains("roll-event-prompt");
  const needsViewportOffset = isRollEventPrompt && window.matchMedia("(max-width: 1180px)").matches;
  if (!needsViewportOffset) {
    ui.eventToast.style.removeProperty("top");
    return;
  }

  ui.eventToast.style.top = "10px";
  const rect = ui.eventToast.getBoundingClientRect();
  if (rect.top < 10) {
    ui.eventToast.style.top = `${Math.round(20 - rect.top)}px`;
  }
}

async function animateDice(rollsOrResult, { bonus = 0, label = "", player = null, isEnemyBattle = false, isFinalBattle = false } = {}) {
  const rolls = Array.isArray(rollsOrResult) ? rollsOrResult : [rollsOrResult];
  const result = rolls.reduce((sum, value) => sum + value, 0);
  const caption = diceResultCaption(rolls, bonus);
  const playerLabel = dicePlayerLabel(player, label);
  setPhoneDiceRoll({ bonus, label, player, rolling: true, rolls });
  const throwPromise = animateDiceOnBoard(rolls, { caption, playerLabel, isEnemyBattle, isFinalBattle });
  ui.diceValue.classList.add("rolling");
  ui.diceValue.textContent = "-";
  const startedAt = performance.now();
  while (performance.now() - startedAt < 960) {
    ui.diceValue.textContent = d6();
    await sleep(55);
  }
  ui.diceValue.textContent = result;
  ui.diceValue.classList.remove("rolling");
  setPhoneDiceRoll({ bonus, label, player, rolling: false, rolls, total: result + bonus });
  await throwPromise;
}

async function animateDiceOnBoard(rolls, { caption = "", playerLabel = null, isEnemyBattle = false, isFinalBattle = false } = {}) {
  if (!boardEl || !rolls.length) return;

  boardEl.querySelectorAll(".dice-throw-layer").forEach((layer) => layer.remove());

  const layer = document.createElement("div");
  layer.className = "dice-throw-layer";
  if (isEnemyBattle) layer.classList.add("enemy-battle-dice");

  if (playerLabel) {
    const playerEl = document.createElement("span");
    playerEl.className = "dice-player-label";
    if (isEnemyBattle) playerEl.classList.add("enemy-battle-label");
    if (isFinalBattle) playerEl.classList.add("final-battle-label");
    playerEl.style.setProperty("--player-color", playerLabel.color);
    if (playerLabel.icon) {
      const iconEl = document.createElement("img");
      iconEl.className = "dice-player-label-icon";
      iconEl.src = playerLabel.icon;
      iconEl.alt = "";
      iconEl.setAttribute("aria-hidden", "true");
      playerEl.append(iconEl);
    }
    const textEl = document.createElement("span");
    textEl.className = "dice-player-label-text";
    textEl.textContent = playerLabel.text;
    playerEl.append(textEl);
    layer.append(playerEl);
  }

  const boardRect = boardEl.getBoundingClientRect();
  const baseDieSize = Math.min(54, Math.max(34, boardRect.width * 0.078));
  const dieSize = baseDieSize * (isEnemyBattle ? 1.18 : 1);
  const dieDepth = dieSize / 2;
  const centerStep = rolls.length > 2 ? 11 : 13;
  const centerStart = -((rolls.length - 1) * centerStep) / 2;
  for (const [index, value] of rolls.entries()) {
    const die = document.createElement("span");
    die.className = "field-die";
    die.setAttribute("aria-label", `Кубик ${value}`);
    die.style.setProperty("--die-size", `${dieSize}px`);
    die.style.setProperty("--die-depth", `${dieDepth}px`);
    const centerOffset = centerStart + index * centerStep;
    die.style.setProperty("--center-x", `${50 + centerOffset}%`);
    const centerY = isEnemyBattle ? 42 : 49;
    die.style.setProperty("--center-y", `${centerY + (index % 2 === 0 ? -2 : 2)}%`);
    const finalRotation = diceCubeRotations[value] ?? diceCubeRotations[1];
    const spinX = rotationDegrees(finalRotation.x) + 360 * (6 + Math.floor(Math.random() * 2));
    const spinY = rotationDegrees(finalRotation.y) + 360 * (6 + Math.floor(Math.random() * 2));
    const spinZ = rotationDegrees(finalRotation.z) + 360 * (4 + Math.floor(Math.random() * 2));
    die.style.setProperty("--spin-x", `${spinX}deg`);
    die.style.setProperty("--spin-y", `${spinY}deg`);
    die.style.setProperty("--spin-z", `${spinZ}deg`);
    die.innerHTML = diceCube(value);
    layer.append(die);
  }
  if (caption) {
    const captionEl = document.createElement("span");
    captionEl.className = "dice-result-caption";
    captionEl.innerHTML = caption;
    layer.append(captionEl);
  }

  boardEl.append(layer);
  await sleep(960);
  await sleep(813);
  layer.classList.add("leaving");
  await sleep(280);
  layer.remove();
}

function dicePlayerLabel(player, label = "") {
  const text = label || player?.name || "";
  if (!text) return null;
  return {
    color: player?.color || "#fff4d6",
    icon: player?.token || "",
    text,
  };
}

function diceResultCaption(rolls, bonus = 0) {
  if (!bonus) return "";
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  return `${rolls.join(" + ")} ${bonus > 0 ? "+" : "-"} ${Math.abs(bonus)} бонус = <strong>${rolled + bonus}</strong>`;
}

function rotationDegrees(value) {
  return Number.parseFloat(value) || 0;
}

function diceCube(value) {
  const faces = [
    ["front", 1],
    ["right", 2],
    ["top", 3],
    ["bottom", 4],
    ["left", 5],
    ["back", 6],
  ];
  return `
    <span class="die-shadow" aria-hidden="true"></span>
    <span class="die-cube" data-value="${value}">
      ${faces.map(([side, faceValue]) => `<span class="die-face die-face-${side}">${diceFace(faceValue)}</span>`).join("")}
    </span>
  `;
}

function diceFace(value) {
  return Array.from({ length: 9 }, (_, index) => {
    const dot = diceDotMap[value]?.includes(index + 1) ? '<i aria-hidden="true"></i>' : "<b></b>";
    return dot;
  }).join("");
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function d6() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice(count) {
  return Array.from({ length: count }, d6);
}

const diceDotMap = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

const diceCubeRotations = {
  1: { x: "0deg", y: "0deg", z: "0deg" },
  2: { x: "0deg", y: "-90deg", z: "0deg" },
  3: { x: "-90deg", y: "0deg", z: "0deg" },
  4: { x: "90deg", y: "0deg", z: "0deg" },
  5: { x: "0deg", y: "90deg", z: "0deg" },
  6: { x: "0deg", y: "180deg", z: "0deg" },
};

function formatRoll(rolls) {
  const total = rolls.reduce((sum, value) => sum + value, 0);
  return rolls.length === 1 ? String(total) : `${rolls.join(" + ")} = ${total}`;
}

function startHumanRollCooldown() {
  humanRollCooldownUntil = performance.now() + humanRollCooldownMs;
}

function humanRollCooldownActive() {
  return performance.now() < humanRollCooldownUntil;
}

function triggerRollButtonAction({ fromBot = false } = {}) {
  if (!fromBot && choiceFieldPreviewActive()) {
    setChoiceFieldPreviewMode(false);
    return;
  }
  if (!fromBot && portalPreviewActive()) {
    setPortalPreviewMode(false);
    return;
  }
  if (!fromBot && !actionPromptResolver && humanRollCooldownActive()) return;
  if (!fromBot && (botControlsLocked() || ui.rollBtn.disabled)) return;
  if (actionPromptResolver) {
    actionPromptResolver();
    return;
  }
  if (!fromBot && ui.rollBtn.disabled) return;
  hidePassiveEventToast();
  rollAndMove();
}

function hidePassiveEventToast() {
  if (!ui.eventToast || ui.eventToast.hidden || ui.eventToast.classList.contains("action-prompt")) return;
  hideEventToast({ quick: true });
}

function shouldIgnoreEnterShortcut(event) {
  const target = event.target;
  return target instanceof Element && Boolean(target.closest("input, select, textarea"));
}

function syncWideScoreStripPlacement() {
  if (!scoreStripEl || !sidePanelEl || !appShellEl || !playAreaEl) return;
  const rageIndicator = ui.monsterRageIndicator;
  const tadamSection = sidePanelEl.querySelector(".tadam-card");

  if (wideLayoutQuery.matches) {
    if (scoreStripEl.parentElement !== sidePanelEl) sidePanelEl.prepend(scoreStripEl);
    if (rageIndicator && rageIndicator.nextElementSibling !== tadamSection) {
      sidePanelEl.insertBefore(rageIndicator, tadamSection || null);
    }
    return;
  }

  if (scoreStripEl.parentElement !== appShellEl) appShellEl.insertBefore(scoreStripEl, playAreaEl);
  if (rageIndicator && rageIndicator.nextElementSibling !== playAreaEl) {
    appShellEl.insertBefore(rageIndicator, playAreaEl);
  }
}

ui.newGameBtn.addEventListener("click", newGame);
ui.boardSelect?.addEventListener("change", newGame);
ui.uiStyle?.addEventListener("change", () => {
  applyUiStyle();
});
ui.playerCount?.addEventListener("change", syncBotCountOptions);
ui.settingsPanel?.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest("[data-step-bonus-preset], [data-battle-bonus-preset]") : null;
  if (!button) return;

  if (button.dataset.stepBonusPreset) {
    addSelectedPlayerStepBonus(Number(button.dataset.stepBonusPreset));
  } else if (button.dataset.battleBonusPreset) {
    addSelectedPlayerBattleBonus(Number(button.dataset.battleBonusPreset));
  }
});
ui.exactMoveBtn?.addEventListener("click", () => {
  moveActivePlayerExactSteps();
});
ui.modifierPlayerStatus?.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest("[data-modifier-player-id]") : null;
  if (!button) return;
  selectModifierPlayer(Number(button.dataset.modifierPlayerId));
});
ui.settingsToggle?.addEventListener("click", () => {
  if (!ui.settingsPanel) return;

  const nextHidden = !ui.settingsPanel.hidden;
  ui.settingsPanel.hidden = nextHidden;
  ui.settingsToggle.setAttribute("aria-expanded", String(!nextHidden));
});
ui.fullscreenBtn?.addEventListener("click", () => {
  void toggleFullscreen();
});
document.addEventListener("fullscreenchange", syncFullscreenButton);
document.addEventListener("webkitfullscreenchange", syncFullscreenButton);
ui.logToggle?.addEventListener("click", () => {
  logExpanded = !logExpanded;
  updateLogLimit();
});
ui.saveHistoryBtn?.addEventListener("click", () => {
  void saveCurrentGameHistory();
});
ui.usePhoneControllers?.addEventListener("change", () => {
  if (!phoneControllersEnabled()) {
    void closeCurrentPhoneRoom({ silent: true });
  }
  renderPhoneRoomPanel();
  schedulePhoneSnapshot();
});
ui.createPhoneRoomBtn?.addEventListener("click", () => {
  void createPhoneRoom();
});
ui.phoneRoomDice?.addEventListener("change", () => {
  phoneRoom.diceVisible = phoneRoomDiceVisible();
  renderPhoneRoomPanel();
  schedulePhoneSnapshot();
});
ui.copyPhoneRoomUrlBtn?.addEventListener("click", () => {
  void copyPhoneRoomUrl();
});
ui.rollBtn.addEventListener("click", () => {
  triggerRollButtonAction();
});
ui.turnActions.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest("[data-preroll-choice]") : null;
  if (!button) return;
  resolvePreRollChoice(button.dataset.prerollChoice === "yes");
});
ui.eventToast?.addEventListener("click", (event) => {
  if (ui.eventToast.classList.contains("action-prompt")) return;
  hideEventToast({ quick: true });
});
ui.eventToast?.addEventListener("keydown", (event) => {
  if (ui.eventToast.classList.contains("action-prompt")) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    hideEventToast({ quick: true });
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || shouldIgnoreEnterShortcut(event)) return;
  if (event.repeat) return;
  if (!actionPromptResolver && ui.rollBtn.disabled) return;

  event.preventDefault();
  triggerRollButtonAction();
});

syncWideScoreStripPlacement();
wideLayoutQuery.addEventListener("change", syncWideScoreStripPlacement);
phoneLayoutQuery.addEventListener("change", syncSettingsToggleLabel);
syncSettingsToggleLabel();
window.setInterval(renderHistory, 1000);
updateLogLimit();

newGame();
