import { cardConfig } from "./cards.config.js?v=20260531-0241";
import { boardDoorConfigs, doorConfigs } from "./game.config.js";

const boardEl = document.querySelector("#board");
const scoreStripEl = document.querySelector("#scoreStrip");
const gameLogEl = document.querySelector("#gameLog");
const tadamTableEl = document.querySelector("#tadamTable");
const appShellEl = document.querySelector(".app-shell");
const playAreaEl = document.querySelector(".play-area");
const sidePanelEl = document.querySelector(".side-panel");
const wideLayoutQuery = window.matchMedia("(min-width: 1200px)");

const ui = {
  activePlayerName: document.querySelector("#activePlayerName"),
  activePlayerRole: document.querySelector("#activePlayerRole"),
  autoRevealCards: document.querySelector("#autoRevealCards"),
  botCount: document.querySelector("#botCount"),
  botSpeed: document.querySelector("#botSpeed"),
  boardSelect: document.querySelector("#boardSelect"),
  choicePanel: document.querySelector("#choicePanel"),
  diceCount: document.querySelector("#diceCount"),
  diceValue: document.querySelector("#diceValue"),
  eventToast: document.querySelector("#eventToast"),
  exactMoveAmount: document.querySelector("#exactMoveAmount"),
  exactMoveBtn: document.querySelector("#exactMoveBtn"),
  finalBattleHud: document.querySelector("#finalBattleHud"),
  fieldEffect: document.querySelector("#fieldEffect"),
  modifierPlayerStatus: document.querySelector("#modifierPlayerStatus"),
  passThroughMode: document.querySelector("#passThroughMode"),
  newGameBtn: document.querySelector("#newGameBtn"),
  playerCount: document.querySelector("#playerCount"),
  rollBtn: document.querySelector("#rollBtn"),
  roundTitle: document.querySelector("#roundTitle"),
  settingsPanel: document.querySelector("#settingsPanel"),
  settingsToggle: document.querySelector("#settingsToggle"),
  showWalkPath: document.querySelector("#showWalkPath"),
  turnActions: document.querySelector("#turnActions"),
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
      "0-0": "bad",
      "0-1": "good",
      "0-2": "green",
      "0-3": "red",
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
      "2-6": "red",
      "2-8": "red",
      "2-10": "green",
      "2-14": "green",
      "3-4": "bad",
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
      "5-6": "green",
      "5-8": "green",
      "5-10": "red",
      "5-14": "green",
      "6-0": "green",
      "6-1": "green",
      "6-2": "dice-fortune",
      "6-6": "green",
      "6-7": "shop",
      "6-8": "green",
      "6-10": "red",
      "6-12": "green",
      "6-13": "green",
      "6-14": "good",
      "7-2": "red",
      "7-10": "bad",
      "7-12": "shop",
      "8-2": "green",
      "8-4": "bad",
      "8-5": "bad",
      "8-6": "bad",
      "8-7": "bad",
      "8-9": "enemy",
      "9-14": "enemy",
      "8-10": "bad",
      "8-12": "green",
      "8-13": "green",
      "8-14": "tadam",
      "9-2": "bad",
      "9-4": "bad",
      "9-7": "bad",
      "9-9": "bad",
      "10-2": "green",
      "10-4": "bad",
      "10-6": "enemy",
      "10-7": "bad",
      "10-9": "bad",
      "10-11": "red",
      "10-12": "red",
      "10-13": "red",
      "10-14": "red",
      "11-2": "red",
      "11-4": "bad",
      "11-9": "good",
      "11-11": "bad",
      "12-0": "good",
      "12-1": "good",
      "12-2": "good",
      "12-4": "bad",
      "12-5": "bad",
      "12-6": "bad",
      "12-7": "bad",
      "12-9": "good",
      "12-11": "tadam",
      "12-12": "pay-double",
      "12-13": "green",
      "12-14": "green",
      "13-0": "good",
      "13-7": "red",
      "13-9": "good",
      "13-14": "shop",
      "14-0": "red",
      "14-1": "red",
      "14-2": "red",
      "14-3": "red",
      "14-4": "red",
      "14-5": "red",
      "14-6": "red",
      "14-7": "red",
      "14-9": "tadam",
      "14-10": "red",
      "14-11": "red",
      "14-12": "good",
      "14-13": "green",
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
const coinIconSrc = "./assets/icons/coin.png?v=20260524-0155";
const diceIconSrc = "./assets/icons/dice.png?v=20260524-0305";
const enemyIconSrc = "./assets/icons/enemy_512.png";
const finalEnemyIconSrc = "./assets/icons/final_enemy.png?v=20260525-0146";
const portalIconSrc = "./assets/icons/portal_1254.png?v=20260530-0222";
const vsIconSrc = "./assets/icons/vs_1254.png?v=20260531-0233";
const eventIcons = {
  bad: '<img class="tile-icon-image tile-icon-bad" src="./assets/icons/bad_tight.png" alt="Плохо">',
  enemy: '<img class="tile-icon-image tile-icon-enemy" src="./assets/icons/enemy_512.png" alt="Враг">',
  good: '<img class="tile-icon-image tile-icon-good" src="./assets/icons/good_512.png" alt="Хорошо">',
  green: "",
  red: "",
  "dice-fortune": '<img class="tile-icon-image tile-icon-dice-fortune" src="./assets/tiles/dice_fortune_1254.png?v=20260521-0035" alt="Кубик удачи">',
  "pay-double": '<img class="tile-icon-image tile-icon-pay-double" src="./assets/tiles/pay_double_1024.png?v=20260521-1205" alt="Удвоение монет">',
  shop: '<img class="tile-icon-image tile-icon-shop" src="./assets/icons/joes_shop_512.png" alt="Лавка Джо">',
  tadam: '<img class="tile-icon-image tile-icon-tadam" src="./assets/icons/tadam_512.png" alt="ТАДАМ!">',
  vs: `<img class="tile-icon-image tile-icon-vs" src="${vsIconSrc}" alt="VS">`,
};

const tileIcons = {
  finish: '<img class="tile-icon-image tile-icon-finish" src="./assets/icons/finish_512.png" alt="Финиш">',
  start: '<img class="tile-icon-image tile-icon-start" src="./assets/icons/start_512.png" alt="Старт">',
};

applyBoardConfig(ui.boardSelect?.value || "field1");

const goodCards = expandDeck(cardConfig.good);
const badCards = expandDeck(cardConfig.bad);
const tadamCards = expandDeck(cardConfig.tadam);
const shopCards = expandDeck(cardConfig.shop);

const names = [
  { name: "Пес", color: "#8b1713", token: "./assets/player-tokens/dog.png?v=20260520-0310" },
  { name: "Кот", color: "#4b1a78", token: "./assets/player-tokens/cat.png?v=20260520-0310" },
  { name: "Выдра", color: "#0b748b", token: "./assets/player-tokens/otter.png?v=20260520-0310" },
  { name: "Альпака", color: "#d56b00", token: "./assets/player-tokens/alpaca.png?v=20260520-0310" },
];

let state;
let actionPromptResolver = null;
let actionPromptButtonLabel = "Далее";
let actionPromptAutoPlayerId = null;
let botActionTimer = null;
let eventToastFadeTimer = null;
let eventToastHideTimer = null;

function applyBoardConfig(boardId) {
  const config = boardConfigs[boardId] || boardConfigs.field1;
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

function newGame() {
  syncBotCountOptions();
  actionPromptResolver = null;
  actionPromptButtonLabel = "Далее";
  actionPromptAutoPlayerId = null;
  window.clearTimeout(botActionTimer);
  botActionTimer = null;
  applyBoardConfig(ui.boardSelect?.value || "field1");
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
    doors,
    enemyBattleProgress: null,
    eventDepth: 0,
    finalBattle: null,
    finalBattleProgress: null,
    finished: false,
    botTurnPlayerId: null,
    isAnimating: false,
    landingCell: null,
    modifierPlayerId: 0,
    movingPlayerId: null,
    extraTurnPlayerId: null,
    cardChoiceResolver: null,
    pendingCardChoice: null,
    pendingChoice: null,
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
      position: startCell,
      stepBonus: 0,
    })),
    round: 1,
    tadams: [],
    turns: 0,
    vsBattleProgress: null,
    walkPath: [],
  };

  boardEl.dataset.ready = "false";
  boardEl.dataset.boardId = activeBoardConfig.id;
  boardEl.style.setProperty("--board-cols", String(boardCols));
  boardEl.style.setProperty("--board-rows", String(boardRows));
  log("<strong>Игра началась.</strong> Побеждайте врагов, чтобы открывать двери.");
  render();
}

async function rollAndMove({ animate = true } = {}) {
  if (state.finished || state.isAnimating || state.pendingCardChoice || state.pendingChoice || state.pendingPreRoll || state.pendingShop) return;

  const player = currentPlayer();
  const botTurnPlayerId = isBot(player) ? player.id : null;
  state.botTurnPlayerId = botTurnPlayerId;

  try {
    const extraDice = await chooseExtraDie(player, animate);
    state.isAnimating = animate;
    state.movingPlayerId = animate ? player.id : null;
    state.dice = null;
    render();

    const rolls = rollDice(totalDiceForPlayer(player, extraDice));
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
            `${playerName(player)} не может пройти ${blockingDoor.label}: победи врага с силой <strong>${blockingDoor.damage}</strong>`,
            { autoFor: player },
          );
        }
        break;
      }

      player.position = nextPosition;
      consumeWalkPathCell(nextPosition);
      if (step < totalSteps - 1) resolveJumpSteal(player);
      if (animate) {
        render();
        await sleep(180);
      }
      const enemyBattle = await resolvePassThroughEnemy(player);
      if (state.finished || player.position !== nextPosition) break;
      if (enemyBattle?.winner === "player" && !enemyBattle.isFinalBoss && !monstersDontStopEnabled()) break;
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
  } finally {
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

function chooseBotPreRoll(player, card) {
  const effect = card?.effect;
  if (!effect || player.coins < effect.cost) return false;

  const personality = botPersonality(player);
  const currentDice = totalDiceForPlayer(player);
  const nextDice = currentDice + effect.dice;
  const coinsAfter = player.coins - effect.cost;
  const door = cellEvents[player.position] === "enemy" ? doorByEnemyCell(player.position) : null;

  let payScore = -2;
  let declineScore = 0;

  if (door && !isDoorOpenForPlayer(door, player)) {
    const currentChance = estimateWinChance(currentDice, playerCombatBonus(player), door.damage);
    const nextChance = estimateWinChance(nextDice, playerCombatBonus(player), door.damage);
    const gain = nextChance - currentChance;
    payScore += gain * 95 * personality.battle;
    if (nextChance >= 0.58) payScore += 15 * personality.battle;
    if (currentChance < 0.08 && nextChance > 0.2) payScore += 10 * personality.risk;
    if (currentChance >= 0.82) declineScore += 18;
    if (nextChance < 0.18) declineScore += 14 / personality.risk;
    if (door.isFinalBoss) payScore += 10 * personality.battle;
  } else {
    const leader = leadingPlayer();
    const lag = leader && leader.id !== player.id ? routeProgress(leader) - routeProgress(player) : 0;
    payScore += Math.min(14, Math.max(0, lag * 0.45)) * personality.progress;
    payScore += Math.min(10, player.coins * 0.45) * personality.economy;
    payScore += nearbyInterestingCells(player, nextDice).score * personality.risk;
    if (finalDistance(player) <= 14) payScore += 10 * personality.progress;
    if (leader?.id === player.id) declineScore += 7 * personality.economy;
  }

  if (coinsAfter <= 2) declineScore += 22 * personality.economy;
  else if (coinsAfter <= 6) declineScore += 10 * personality.economy;
  if (player.coins >= 18) payScore += 6;

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
  const options = choices.map((choice) => ({
    id: choice.cell,
    score: scoreCellForBot(player, choice.cell, context) + (choice.className === "decline" ? 4 * botPersonality(player).economy : 0),
  }));
  return chooseWeightedBotOption(options, player)?.id ?? randomChoice(choices)?.cell ?? null;
}

function chooseBotCardAction(player, pending) {
  const choices = pending?.choices || [];
  if (choices.length === 0) return null;

  const options = choices.map((choice) => ({
    id: choice.id,
    score: scoreCardChoice(player, pending, choice),
  }));
  return chooseWeightedBotOption(options, player)?.id ?? randomChoice(choices)?.id ?? null;
}

function scoreCardChoice(player, pending, choice) {
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
  let score = 0;

  if (card.id === "step-plus" || effect.type === "passive-step-bonus") {
    score = phase === "late" ? 25 : 35;
    score += nextUnbeatenEnemy(player) ? 5 : 0;
    score *= personality.progress;
  } else if (card.id === "battle-plus" || effect.type === "passive-battle-bonus") {
    score = 24 * personality.battle;
    const enemy = nextUnbeatenEnemy(player);
    if (enemy) score += Math.min(14, enemy.damage * 0.55) * personality.battle;
  } else if (card.id === "coin-plus" || effect.type === "passive-coin-bonus") {
    score = phase === "early" ? 28 : phase === "mid" ? 18 : 8;
    score *= personality.economy;
  } else if (card.id === "extra-die" || effect.type === "optional-extra-die") {
    score = 25 * personality.risk;
    if (nextUnbeatenEnemy(player)) score += 10 * personality.battle;
    if (player.coins <= 7) score -= 10 * personality.economy;
    if (player.coins >= 15) score += 6;
  } else {
    score = 12;
  }

  if (player.items.some((item) => item.id === card.id)) score -= 5;
  return score * personality.shop;
}

function scoreShopDecline(player, offer = []) {
  const personality = botPersonality(player);
  let score = player.coins <= 4 ? 40 : player.coins <= 7 ? 18 : player.coins > 10 ? 5 : 10;
  if (finalDistance(player) <= 8) score += 8;
  const bestCardScore = Math.max(0, ...offer.map((card) => scoreShopCard(player, card)));
  if (bestCardScore < score + 5) score += 5;
  return score * personality.economy;
}

function scoreCellForBot(player, cell, context = {}) {
  const personality = botPersonality(player);
  if (!cell) return -100;
  if (cell === finishCell) return 1000;

  let score = (routeIndex.get(cell) ?? routeProgress(player)) * 0.35 * personality.progress;
  const event = cellEvents[cell];
  if (!event) return score + 2;

  if (event === "good") score += 18;
  else if (event === "tadam") score += 10 + 3 * personality.chaos;
  else if (event === "shop") score += player.coins >= 5 ? 16 * personality.shop : -4;
  else if (event === "green") score += 10 + scoreFieldTadamEffect("green-field");
  else if (event === "red") score += -11 + scoreFieldTadamEffect("red-field");
  else if (event === "bad") score -= 16 / personality.risk;
  else if (event === "pay-double") score += Math.min(36, player.coins * 1.2);
  else if (event === "dice-fortune") score += (personality.chaos - 0.8) * 16 + (player.coins < 8 ? 5 : 0);
  else if (event === "vs") score += player.coins >= 10 ? 4 * personality.risk : -8;
  else if (event === "enemy") {
    const door = doorByEnemyCell(cell);
    if (!door || isDoorOpenForPlayer(door, player)) score += 10;
    else {
      const chance = estimateWinChance(totalDiceForPlayer(player), playerCombatBonus(player), door.damage);
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
    if (["good", "green", "shop", "pay-double"].includes(event)) score += 3;
    if (["bad", "red"].includes(event)) score -= 2;
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
    const choiceId = chooseBotCardAction(player, state.pendingCardChoice);
    if (choiceId !== null && choiceId !== undefined) resolveCardChoice(choiceId);
    return;
  }

  if (state.pendingChoice) {
    const playerId = state.pendingChoice.playerId ?? currentPlayer()?.id;
    if (isBotPlayerId(playerId)) {
      const player = state.players.find((item) => item.id === playerId);
      const cell = chooseBotDirection(player, state.pendingChoice.choices, state.pendingChoice);
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
  renderWinnerPopup();
  renderTadams();
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
        tile.insertAdjacentHTML("beforeend", `<span class="monster-power">${enemyDoor.damage}</span>`);
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

    const victoriousPlayers = state.players.filter((player) => isDoorOpenForPlayer(door, player));
    if (victoriousPlayers.length === 0) continue;

    const marks = document.createElement("span");
    marks.className = "enemy-victory-marks";
    for (const player of victoriousPlayers) {
      const dot = document.createElement("i");
      dot.style.setProperty("--player-color", player.color);
      dot.title = `${player.name} победил этого врага`;
      marks.append(dot);
    }
    tile.append(marks);
  }
}

function renderTileStates() {
  boardEl.querySelectorAll(".tile-landing").forEach((tile) => tile.classList.remove("tile-landing"));
  boardEl.querySelectorAll(".walk-path-outline").forEach((outline) => outline.remove());

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

  if (!state.landingCell) return;

  const tile = boardEl.querySelector(`[data-cell="${state.landingCell}"]`);
  if (tile) tile.classList.add("tile-landing");
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
        </span>
        <span class="pill">${iconizeHtml(tileTitle(player.position))}</span>
      </div>
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

function isPhoneLayout() {
  return window.matchMedia?.("(max-width: 680px) and (hover: none) and (pointer: coarse)")?.matches ?? false;
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

function renderTurn() {
  const player = currentPlayer();
  if (ui.activePlayerName) {
    ui.activePlayerName.textContent = player.name;
  }
  const itemText = player.items.length ? ` Лавка: ${player.items.map((item) => item.title).join(", ")}.` : "";
  if (ui.activePlayerRole) {
    ui.activePlayerRole.innerHTML = iconizeHtml(`Клетка ${cellLabel(player.position)}. ${player.coins} монет.${itemText}`);
  }
  ui.fieldEffect.innerHTML = fieldEffectText(player.position);
  ui.turnActions.className = `turn-actions ${state.pendingPreRoll ? "pending-action" : ""}`.trim();
  ui.turnActions.innerHTML = turnActionsText(player);
  ui.diceValue.textContent = state.dice ?? "-";
  ui.rollBtn.innerHTML = iconizeHtml(actionPromptResolver ? actionPromptButtonLabel : state.isAnimating ? "Кубик крутится" : "Бросить кубик");
  if (ui.roundTitle) {
    ui.roundTitle.textContent = state.finished ? "Игра завершена" : `Раунд ${state.round}`;
  }
  ui.rollBtn.disabled =
    botControlsLocked() ||
    (!actionPromptResolver &&
      (state.finished ||
        state.isAnimating ||
        Boolean(state.pendingCardChoice) ||
        Boolean(state.pendingChoice) ||
        Boolean(state.pendingPreRoll) ||
        Boolean(state.pendingShop)));
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
        label: card.title,
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
    const buttons = renderChoiceDialog({
      kind: "card-action",
      kicker: pending.kicker,
      title: pending.title,
      summary: pending.summary,
      buttonsClass: pending.buttonsClass || "",
    });

    for (const choice of pending.choices) {
      appendChoiceButton(buttons, {
        className: choice.className || "",
        label: choice.label,
        note: choice.note,
        noteClass: choice.noteClass || "",
        onClick: () => resolveCardChoice(choice.id),
      });
    }
    return;
  }

  if (!state.pendingChoice) {
    hideChoicePanel();
    return;
  }

  if (state.pendingChoice.kind === "portal") {
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
  if (enemyProgress && !state.finished) {
    renderEnemyBattleHud(enemyProgress);
    return;
  }
  if (vsProgress && !state.finished) {
    renderVsBattleHud(vsProgress);
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
  const bossDisplayForce = progress.bossRollsStarted ? progress.bossForce : "?";
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

function renderChoiceDialog({ kind, kicker, title, summary, buttonsClass = "" }) {
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

  const buttons = document.createElement("div");
  buttons.className = `choice-buttons ${buttonsClass}`.trim();

  copy.append(kickerEl, titleEl, summaryEl);
  dialog.append(copy, buttons);
  ui.choicePanel.append(dialog);

  return buttons;
}

function appendChoiceButton(buttons, { className = "", label, note, noteClass = "", onClick }) {
  const button = document.createElement("button");
  button.className = `choice-button ${className}`.trim();
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

  button.addEventListener("click", onClick);
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
  state.cardChoiceResolver(choiceId);
  render();
}

async function resolveLanding(player) {
  if (state.eventDepth > 5) return;

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
      await drawAndApplyCard(player, goodCards, "Хорошо");
    } else if (event === "bad") {
      await drawAndApplyCard(player, badCards, "Плохо");
    } else if (event === "tadam") {
      await drawTadamCard(player);
    } else if (event === "shop") {
      await resolveShop(player);
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
      resolveLandSteal(player);
    }
  } finally {
    state.eventDepth -= 1;
  }
}

async function resolveEnemyBattle(player) {
  const door = doorByEnemyCell(player.position);
  if (!door || isDoorOpenForPlayer(door, player)) return false;

  state.enemyBattleProgress = {
    enemyForce: door.damage,
    outcome: `Нужно набрать силу ${door.damage}`,
    isFinalBoss: Boolean(door.isFinalBoss),
    playerForce: 0,
    playerId: player.id,
    winner: null,
  };
  render();
  await showActionPrompt(
    `${playerName(player)} вступает в битву. Нужно набрать силу <strong>${door.damage}</strong>, чтобы ${door.isFinalBoss ? "стать боссом" : `открыть ${door.label}`}.`,
    { autoFor: player },
  );

  const extraDice = await chooseExtraDie(player, true);
  const diceCount = totalDiceForPlayer(player, extraDice);
  const rolls = rollDice(diceCount);
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  const bonus = playerCombatBonus(player);
  state.isAnimating = true;
  state.dice = null;
  state.enemyBattleProgress = {
    ...state.enemyBattleProgress,
    isRolling: true,
    outcome: `${player.name} бросает кубики`,
  };
  render();
  await animateDice(rolls, { bonus, player, isEnemyBattle: true });

  const damage = rolled + bonus;
  state.dice = damage;
  state.isAnimating = false;

  const bonusText = bonusFormulaText(bonus, damage);
  if (damage >= door.damage) {
    state.enemyBattleProgress = {
      bonus,
      enemyForce: door.damage,
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
    log(`${playerName(player)} побеждает финального монстра: ${formatRoll(rolls)}${bonusText}. Игрок становится <strong>боссом</strong>.`);
      render();
      await showActionPrompt(
        `${playerName(player)} побеждает финального монстра: ${formatRoll(rolls)}${bonusText}. Игрок становится <strong>боссом</strong>.`,
        { autoFor: player },
      );
      clearEnemyBattleHud();
      await resolveFinalBattle(player, true);
      return { isFinalBoss: true, resolved: true, winner: "player" };
    }
    addDiceBonus(player, 1);
    log(
      `${playerName(player)} побеждает врага: ${formatRoll(rolls)}${bonusText}. ${door.label} открыта для игрока. Награда: <strong>+1 кубик</strong>.`,
    );
    render();
    await showActionPrompt(
      `${playerName(player)} побеждает врага: ${formatRoll(rolls)}${bonusText}. ${door.label} открыта. Награда: <strong>+1 кубик</strong>.`,
      { autoFor: player },
    );
    clearEnemyBattleHud();
    return { isFinalBoss: false, resolved: true, winner: "player" };
  }

  state.enemyBattleProgress = {
    bonus,
    enemyForce: door.damage,
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

async function resolveDiceFortuneField(player) {
  await showActionPrompt(
    `${playerName(player)} попадает на кубик удачи: брось 6 кубиков. Каждая 6 дает <strong>${coinAmount(20)}</strong>, каждая 1 отправляет на <strong>5 шагов назад</strong>.`,
    { autoFor: player },
  );

  const rolls = rollDice(6);
  const sixes = rolls.filter((value) => value === 6).length;
  const ones = rolls.filter((value) => value === 1).length;
  const coins = sixes * 20;
  const backwardSteps = ones * 5;

  state.dice = null;
  render();
  await animateDice(rolls, { player });

  if (coins > 0) addCoins(player, coins);

  const resultParts = [
    sixes ? `<strong>${coinAmount(coins)}</strong>` : "",
    backwardSteps ? `<strong>${backwardSteps} шагов назад</strong>` : "",
  ].filter(Boolean);
  const resultText = resultParts.length ? resultParts.join(" и ") : "ничего не происходит";
  const message = `${playerName(player)} бросает кубик удачи: ${formatRoll(rolls)}. Результат: ${resultText}.`;
  log(message, { toast: !backwardSteps });
  await showActionPrompt(message, { autoFor: player });

  if (backwardSteps > 0) {
    await movePlayerSteps(player, -backwardSteps);
  } else {
    render();
  }
}

async function resolvePayDoubleField(player) {
  const before = player.coins;
  player.coins *= 2;
  const gained = player.coins - before;
  if (gained > 0) showCoinFloat(player, gained);
  const message = `${playerName(player)} попадает на удвоение и удваивает свое количество монет. Было <strong>${coinAmount(before)}</strong>, стало <strong>${coinAmount(player.coins)}</strong> <span class="nowrap">(${coinAmount(`+${gained}`)})</span>.`;

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
      log(`${playerName(contender)} в VS-битве: ${formatRoll(result.rolls)}${bonusFormulaText(result.bonus, result.total)}. Сила: <strong>${result.total}</strong>.`);
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
      `${playerName(challenger)} атакует босса: ${formatRoll(result.rolls)}${finalBonusText(result.bonus, result.total)}. Сила: <strong>${result.total}</strong>.`,
    );
  }

  const playersForce = challengerResults.reduce((sum, result) => sum + result.total, 0);
  state.finalBattleProgress.playersForce = playersForce;
  log(`Итоговая сила игроков: <strong>${playersForce}</strong>.`);

  const bossRollResults = [];
  const bossBonus = playerCombatBonus(boss) * challengers.length;
  const bossOpponentBonus = challengers.length;
  state.finalBattleProgress.bossForce = bossBonus + bossOpponentBonus;
  render();
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
    state.finalBattleProgress.bossForce += result.rolled;
    render();
    log(
      `${playerName(boss)} бросает как босс ${index + 1}/${challengers.length}: ${formatRoll(result.rolls)}. Кубики: <strong>${result.rolled}</strong>.`,
    );
  }

  const bossRolled = bossRollResults.reduce((sum, result) => sum + result.rolled, 0);
  const bossForce = bossRolled + bossBonus + bossOpponentBonus;
  state.finalBattleProgress.bossForce = bossForce;
  const bossBonusText = [
    bossBonus ? `${bossBonus} модификаторы` : "",
    bossOpponentBonus ? `${bossOpponentBonus} за противников` : "",
  ].filter(Boolean);
  log(
    `Сила босса: <strong>${bossForce}</strong> (${bossRolled} кубики${bossBonusText.length ? ` + ${bossBonusText.join(" + ")}` : ""}).`,
  );

  const bossWon = bossForce >= playersForce;
  const positionBonuses = finalPositionBonuses(state.players);
  const scores = state.players.map((player) => {
    const damage = challengerResults.find((result) => result.player.id === player.id)?.total || 0;
    return finalBattleScore(player, damage, positionBonuses.get(player.id) || 1);
  });
  const winner = bossWon ? boss : bestFinalScorePlayer(scores, challengers);

  state.finalBattle = {
    bossId: boss.id,
    bossForce,
    bossRolls: bossRollResults.map((result) => result.rolls),
    bossWon,
    playersForce,
    scores,
    winnerId: winner.id,
  };
  state.finished = true;
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

async function rollFinalBattlePower(player, animate, { label = "" } = {}) {
  return rollPlayerBattlePower(player, animate, { label, isFinalBattle: true });
}

async function rollPlayerBattlePower(player, animate, { label = "", isFinalBattle = false } = {}) {
  const rolls = rollDice(totalDiceForPlayer(player));
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  const bonus = playerCombatBonus(player);
  if (animate) {
    state.dice = null;
    render();
    await animateDice(rolls, { bonus, label, player, isFinalBattle });
  }
  const total = rolled + bonus;
  state.dice = total;
  render();
  return { bonus, player, rolled, rolls, total };
}

function finalBonusText(bonus, total) {
  return bonusFormulaText(bonus, total);
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

async function drawAndApplyCard(player, deck, deckName) {
  const card = randomItem(deck);
  if (deckName === "Хорошо") {
    log(`${playerName(player)} тянет карту <strong>${deckName}</strong>: ${card.title}`);
    await revealGoodCard(player, card);
  } else if (deckName === "Плохо") {
    log(`${playerName(player)} тянет карту <strong>${deckName}</strong>: ${card.title}`);
    await revealBadCard(player, card);
  } else {
    log(`${playerName(player)} тянет карту <strong>${deckName}</strong>: ${card.title}`, { toast: true });
  }
  await applyCardEffect(player, card.effect, { title: card.title });
}

async function revealGoodCard(player, card) {
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

  const facePrompt = showActionPrompt(goodCardMarkup(player, card, { revealed: true }), {
    autoFor: player,
    buttonLabel: "Применить",
  });
  wireGoodCardClick(actionPromptResolver);
  await facePrompt;
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

function wireShopCardClick(resolver) {
  wireCardRevealClick(".shop-card-preview", resolver);
}

function wireCardRevealClick(selector, resolver) {
  ui.eventToast?.querySelectorAll(selector).forEach((cardPreview) => cardPreview.addEventListener("click", () => {
    if (actionPromptResolver === resolver) resolver?.();
  }));
}

function goodCardMarkup(player, card, { revealed }) {
  const description = card.description || "";
  const cardText = revealed
    ? `
      <span class="good-card-text">
        <span>${iconizeHtml(description)}</span>
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

async function revealBadCard(player, card) {
  const backPrompt = showActionPrompt(badCardMarkup(card, { revealed: false }), {
    autoFor: player,
    buttonLabel: "Открыть",
  });
  const backResolver = actionPromptResolver;
  wireBadCardClick(backResolver);
  await backPrompt;

  const facePrompt = showActionPrompt(badCardMarkup(card, { revealed: true }), {
    autoFor: player,
    buttonLabel: "Применить",
  });
  wireBadCardClick(actionPromptResolver);
  await facePrompt;
  log(`${playerName(player)} применяет карту <strong>Плохо</strong>: ${card.title}`, { toast: true });
}

function badCardMarkup(card, { revealed }) {
  const cardText = revealed
    ? `
      <span class="bad-card-text">
        <span>${iconizeHtml(card.title)}</span>
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
  const backPrompt = showActionPrompt(tadamCardMarkup(card, { revealed: false }), {
    autoFor: player,
    buttonLabel: "Открыть",
  });
  const backResolver = actionPromptResolver;
  wireTadamCardClick(backResolver);
  await backPrompt;

  const facePrompt = showActionPrompt(tadamCardMarkup(card, { revealed: true }), {
    autoFor: player,
    buttonLabel: "Применить",
  });
  wireTadamCardClick(actionPromptResolver);
  await facePrompt;
}

function tadamCardMarkup(card, { revealed }) {
  const cardText = revealed
    ? `
      <span class="tadam-card-text">
        <span>${iconizeHtml(card.title)}</span>
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

async function revealShopCards(cards, player = null) {
  const backPrompt = showActionPrompt(shopCardsMarkup(cards, { revealed: false }), {
    autoFor: player,
    buttonLabel: "Открыть",
  });
  const backResolver = actionPromptResolver;
  wireShopCardClick(backResolver);
  await backPrompt;

  const facePrompt = showActionPrompt(shopCardsMarkup(cards, { revealed: true }), {
    autoFor: player,
    buttonLabel: "Далее",
  });
  wireShopCardClick(actionPromptResolver);
  await facePrompt;
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

  return new Promise((resolve) => {
    let completed = false;
    const finish = (cardId) => {
      if (completed) return;
      completed = true;
      const card = offer.find((item) => item.id === cardId) || null;
      actionPromptResolver = null;
      actionPromptButtonLabel = "Далее";
      actionPromptAutoPlayerId = null;
      hideEventToast({ quick: true });
      render();
      resolve(card);
    };

    actionPromptResolver = () => finish(null);
    ui.eventToast.querySelectorAll("[data-shop-card-id]").forEach((button) => {
      button.addEventListener("click", () => finish(button.dataset.shopCardId));
    });
    render();
    if (isBot(player)) {
      window.setTimeout(() => finish(chooseBotShopCard(player, offer, { allowDecline: true })), botChoiceDelay("card"));
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

  return new Promise((resolve) => {
    let completed = false;
    const finish = (cardId) => {
      if (completed) return;
      completed = true;
      const card = offer.find((item) => item.id === cardId) || null;
      actionPromptResolver = null;
      actionPromptButtonLabel = "Далее";
      actionPromptAutoPlayerId = null;
      hideEventToast({ quick: true });
      render();
      resolve(card);
    };

    actionPromptResolver = () => finish(null);
    ui.eventToast.querySelectorAll("[data-shop-card-id]").forEach((button) => {
      button.addEventListener("click", () => finish(button.dataset.shopCardId));
    });
    ui.eventToast.querySelector("[data-shop-decline]")?.addEventListener("click", () => finish(null));
    render();
    if (isBot(player)) {
      window.setTimeout(() => finish(chooseBotShopCard(player, offer, { allowDecline: true })), botChoiceDelay("card"));
    } else {
      scheduleBotAction(botChoiceDelay("choice"), { replace: true });
    }
  });
}

function shopCardsMarkup(cards, { revealed, selectable = false, showDecline = false } = {}) {
  const className = `shop-card-reveal ${revealed ? "is-revealed" : "is-hidden"} ${selectable ? "is-selectable" : ""}`.trim();
  const cardsMarkup = cards
    .map((card) => {
      const cardText = revealed
        ? `
          <span class="shop-card-text">
            <span>${iconizeHtml(card.title)}</span>
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
    stealFromRichestPlayer(player, effect.amount);
  } else if (effect.type === "give-poorest") {
    giveToPoorestPlayer(player, effect.amount);
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
  }
}

function grantExtraTurn(player) {
  state.extraTurnPlayerId = player.id;
  log(`${playerName(player)} готовит <strong>еще один ход</strong>.`, { toast: true });
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
  const card = randomItem(shopCards);
  await revealShopCards([card], player);
  player.items.push(card);
  render();
  log(`${playerName(player)} ${reason}: <strong>${card.title}</strong>`, { toast: true });
}

async function resolveBuyShopCardFromPlayer(player, cost) {
  if (player.coins < cost) {
    log(`${playerName(player)} не может купить карту Лавка Джо у игрока: нужно <strong>${cost} монет</strong>.`, { toast: true });
    return;
  }

  const choices = state.players
    .filter((target) => target.id !== player.id && target.items.length > 0)
    .flatMap((target) =>
      target.items.map((card) => ({
        id: `${target.id}:${card.id}`,
        label: card.title,
        note: playerChoiceBadge(target),
        noteClass: "choice-player-note",
      })),
    );

  if (choices.length === 0) {
    log(`У других игроков нет карт Лавка Джо для покупки.`, { toast: true });
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

  const rolls = rollDice(totalDiceForPlayer(target));
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  const bonus = playerStepBonus(target);
  const total = rolled + bonus;
  log(
    `${playerName(player)} отправляет ${playerName(target)} назад: ${formatRoll(rolls)}${bonus ? ` + ${bonus} бонус = <strong>${total}</strong>` : ""}.`,
  );
  await animateDice(rolls, { bonus, label: "Назад", player: target });
  await showActionPrompt(`${playerName(target)} идет назад на <strong>${total}</strong>.`, { autoFor: player });
  await movePlayerSteps(target, -total);
}

function moveBonusText(bonus) {
  return bonus ? `+${bonus} бонус` : "";
}

async function applyFieldEffect(player, effect, fieldName) {
  if (effect.mode === "draw") {
    await drawAndApplyCard(player, deckById(effect.deck), deckLabel(effect.deck));
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
  const card = randomItem(tadamCards);
  log(`${playerName(player)} тянет карту <strong>ТАДАМ!</strong>: ${card.title}`);
  await revealTadamCard(player, card);
  state.tadams.push(card);
  if (state.tadams.length > 3) state.tadams.shift();
  log(`${playerName(player)} применяет карту <strong>ТАДАМ!</strong>: ${card.title}`, { toast: true });
}

async function resolveShop(player) {
  const offer = drawUnique(shopCards, 2);
  if (player.coins < 5) {
    log(`Лавка Джо предлагает: ${offer.map((card) => card.title).join(" / ")}. У ${playerName(player)} не хватает монет.`, {
      toast: true,
    });
    return;
  }

  const directChoice = await revealSelectableShopCards(offer, player);
  const bought = directChoice || (await chooseRevealedShopCard(offer, player));
  if (!bought) {
    log(`${playerName(player)} отказывается от карт Лавки Джо.`, { toast: true });
    return;
  }

  addCoins(player, -5);
  player.items.push(bought);
  log(`${playerName(player)} покупает в Лавке Джо: <strong>${bought.title}</strong>`, { toast: true });
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
  state.pendingCardChoice = config;
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

async function movePlayerSteps(player, steps) {
  let shouldResolveLanding = steps > 0;

  if (steps > 0) {
    for (let step = 0; step < steps && player.position !== finishCell; step += 1) {
      const currentPosition = player.position;
      const nextPosition = getNextOptions(player.position)[0]?.cell;
      if (!nextPosition) break;
      const blockingDoor = lockedDoorForTransition(player, currentPosition, nextPosition);
      if (blockingDoor) {
        await showActionPrompt(
          `${playerName(player)} не может пройти ${blockingDoor.label}: победи врага с силой <strong>${blockingDoor.damage}</strong>`,
          { autoFor: player },
        );
        break;
      }
      player.position = nextPosition;
      if (step < steps - 1) resolveJumpSteal(player);
      render();
      await sleep(120);
      const enemyBattle = await resolvePassThroughEnemy(player);
      if (state.finished || player.position !== nextPosition) break;
      if (enemyBattle?.winner === "player" && !enemyBattle.isFinalBoss && !monstersDontStopEnabled()) break;
      await resolvePortalAtCurrentCell(player, { remaining: steps - step - 1 });
      if (step < steps - 1) {
        await resolvePassThroughShop(player);
      }
    }
  } else if (steps < 0) {
    const currentIndex = routeCells.findIndex((cell) => cellKey(cell.col, cell.row) === player.position);
    if (currentIndex >= 0) {
      const targetIndex = Math.max(0, currentIndex + steps);
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
  if (delta !== 0) showCoinFloat(player, delta);
  return amount + bonus;
}

function stealCoins(fromPlayer, toPlayer, amount) {
  if (!fromPlayer || !toPlayer || fromPlayer.id === toPlayer.id) return 0;
  const taken = Math.min(amount, fromPlayer.coins);
  fromPlayer.coins -= taken;
  if (taken > 0) showCoinFloat(fromPlayer, -taken);
  addCoins(toPlayer, taken);
  return taken;
}

function stealFromRandomPlayer(player, amount) {
  const target = randomOpponent(player);
  if (!target) return;
  const taken = stealCoins(target, player, amount);
  log(`${playerName(player)} забирает у ${playerName(target)} <strong>${taken} монет</strong>.`);
}

function stealFromRichestPlayer(player, amount) {
  const target = richestOpponent(player);
  if (!target) return;
  const taken = stealCoins(target, player, amount);
  log(`${playerName(player)} забирает у самого богатого игрока ${playerName(target)} <strong>${taken} монет</strong>.`);
}

function giveToPoorestPlayer(player, amount) {
  const target = poorestOpponent(player);
  if (!target) return;
  const given = stealCoins(player, target, amount);
  log(`${playerName(player)} отдает самому бедному игроку ${playerName(target)} <strong>${given} монет</strong>.`);
}

function resolveJumpSteal(player) {
  const effect = activeTadamEffect("jump-steal");
  if (!effect) return;
  for (const target of state.players) {
    if (target.id === player.id || target.position !== player.position) continue;
    const taken = stealCoins(target, player, effect.amount);
    if (taken > 0) log(`${playerName(player)} перепрыгивает ${playerName(target)} и забирает <strong>${taken} монет</strong>.`);
  }
}

function resolveLandSteal(player) {
  const effect = activeTadamEffect("land-steal");
  if (!effect) return;
  for (const target of state.players) {
    if (target.id === player.id || target.position !== player.position) continue;
    const taken = stealCoins(target, player, effect.amount);
    if (taken > 0) log(`${playerName(player)} останавливается рядом с ${playerName(target)} и забирает <strong>${taken} монет</strong>.`);
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
          <span>${iconizeHtml(card.title)}</span>
        </span>
      `
      : `<span class="tadam-slot-empty">${index + 1}</span>`;
    tadamTableEl.append(item);
  }
}

function visibleTadamCards() {
  return state.tadams.slice(-3);
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
    "dice-fortune": "Кубик удачи",
    enemy: "Враг",
    good: "Хорошо",
    green: "Зеленое поле",
    "pay-double": "Удвоение монет",
    red: "Красное поле",
    shop: "Лавка Джо",
    tadam: "ТАДАМ!",
    vs: "VS",
  };
  return namesByEvent[cellEvents[cell]] || "Клетка";
}

function fieldEffectText(cell) {
  if (cell === startCell) return "<span>Старт</span><strong>Начальная клетка</strong>";
  if (doorByEnemyCell(cell)?.isFinalBoss) return "<span>Финальный монстр</span><strong>победи и стань боссом</strong>";
  if (cell === finishCell) return "<span>Финиш</span><strong>финальная битва</strong>";

  const texts = {
    bad: ["Плохо", "тяни карту Плохо"],
    "dice-fortune": ["Кубик удачи", "6 бросков: 6 = +20 монет, 1 = -5 шагов"],
    enemy: ["Враг", "битва с монстром"],
    good: ["Хорошо", "тяни карту Хорошо"],
    green: ["Зеленое поле", greenEffectLabel()],
    "pay-double": ["Удвоение монет", "удвой свое количество монет"],
    red: ["Красное поле", redEffectLabel()],
    shop: ["Лавка Джо", "2 карты на выбор за 5 монет"],
    tadam: ["ТАДАМ!", "новое общее правило"],
    vs: ["VS", "все скидывают 10 монет и сражаются за банк"],
  };
  const text = texts[cellEvents[cell]] || ["Обычная клетка", "без эффекта"];
  return iconizeHtml(`<span>${text[0]}</span><strong>${text[1]}</strong>`);
}

function turnActionsText(player) {
  if (state.pendingPreRoll?.playerId === player.id) {
    const card = state.pendingPreRoll.card || player.items.find((item) => item.effect?.type === "optional-extra-die");
    const cost = card?.effect?.cost ?? 2;
    const dice = card?.effect?.dice ?? 1;
    const current = state.pendingPreRoll.index + 1;
    const total = state.pendingPreRoll.total;
    return `
      <div class="pre-roll-action">
        <span>
          <b>${card?.title || "Карта Лавки Джо"}${total > 1 ? ` ${current}/${total}` : ""}</b>
          Заплати ${coinAmount(cost)}: ${diceAmount(`+${dice}`)}.
        </span>
        <div>
          <button type="button" data-preroll-choice="yes">Заплатить</button>
          <button type="button" data-preroll-choice="no">Не платить</button>
        </div>
      </div>
    `;
  }

  const actions = [];
  const extraDiceCards = optionalExtraDieCards(player);
  for (const card of extraDiceCards) {
    const canPay = player.coins >= card.effect.cost;
    actions.push(`
      <span class="action-chip ${canPay ? "" : "disabled"}">
        <b>${coinAmount(card.effect.cost)}</b>
        <span>${diceAmount(`+${card.effect.dice}`)}</span>
      </span>
    `);
  }

  if (actions.length === 0) return '<span class="action-empty">нет действий</span>';
  return `<span class="action-label">Действия</span>${actions.join("")}`;
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

function playerDiceBonus(player) {
  return player.diceBonus || 0;
}

function addDiceBonus(player, amount) {
  if (!player || amount <= 0) return;
  player.diceBonus = playerDiceBonus(player) + amount;
  showDiceFloat(player, amount);
}

function addSelectedPlayerBattleBonus(amount) {
  if (!state?.players?.length) return;
  const player = currentModifierPlayer();
  if (!player || !Number.isFinite(amount) || amount === 0) return;
  player.battleBonus = playerManualBattleBonus(player) + amount;
  log(`${playerName(player)}: сила ${amount > 0 ? "+" : "-"}<strong>${Math.abs(amount)}</strong>. Сейчас: <strong>${battleForceText(playerBattleBonus(player))}</strong>.`);
  render();
}

function addSelectedPlayerStepBonus(amount) {
  if (!state?.players?.length) return;
  const player = currentModifierPlayer();
  if (!player || !Number.isFinite(amount) || amount === 0) return;
  player.stepBonus = playerManualStepBonus(player) + amount;
  log(`${playerName(player)}: шаги ${amount > 0 ? "+" : "-"}<strong>${Math.abs(amount)}</strong>. Сейчас: <strong>${stepBonusText(playerStepBonus(player))}</strong>.`);
  render();
}

function exactMoveControlAmount() {
  const amount = Number(ui.exactMoveAmount?.value);
  return Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 4;
}

function passThroughMode() {
  return ui.passThroughMode?.value || "default";
}

function monstersDontStopEnabled() {
  return passThroughMode() === "monsters" || passThroughMode() === "all";
}

function passThroughAllEnabled() {
  return passThroughMode() === "all";
}

async function moveActivePlayerExactSteps() {
  if (
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

  const player = currentPlayer();
  const steps = exactMoveControlAmount();
  state.isAnimating = true;
  state.movingPlayerId = player.id;
  state.dice = null;
  state.walkPath = [];
  log(`${playerName(player)} идет читом ровно на <strong>${steps}</strong> шагов без кубиков и бонусов.`);
  render();

  try {
    await movePlayerExactSteps(player, steps);
  } finally {
    state.isAnimating = false;
    state.movingPlayerId = null;
    render();
  }
}

async function movePlayerExactSteps(player, steps) {
  const currentIndex = routeCells.findIndex((cell) => cellKey(cell.col, cell.row) === player.position);
  if (currentIndex < 0 || steps <= 0) return;

  const targetIndex = Math.min(routeCells.length - 1, currentIndex + steps);
  for (let index = currentIndex + 1; index <= targetIndex; index += 1) {
    player.position = cellKey(routeCells[index].col, routeCells[index].row);
    render();
    await sleep(120);
  }

  pulseTile(player.position);
  await resolveLanding(player);
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

function deckById(id) {
  return cardConfig[id] || [];
}

function deckLabel(id) {
  const labels = {
    bad: "Плохо",
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
    if (!useExtraDie) continue;

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

function drawUnique(items, count) {
  const pool = [...items];
  const picked = [];
  while (pool.length > 0 && picked.length < count) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}

function randomOpponent(player) {
  const opponents = state.players.filter((target) => target.id !== player.id);
  return opponents.length ? randomItem(opponents) : null;
}

function richestOpponent(player) {
  const opponents = state.players.filter((target) => target.id !== player.id);
  return opponents.sort((a, b) => b.coins - a.coins || a.id - b.id)[0] || null;
}

function poorestOpponent(player) {
  const opponents = state.players.filter((target) => target.id !== player.id);
  return opponents.sort((a, b) => a.coins - b.coins || a.id - b.id)[0] || null;
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

  if (toast) showEventToast(trimToastTrailingDot(renderedMessage));
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
  ui.eventToast.classList.remove("action-prompt", "fading", "quick-fading", "visible");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");

  eventToastFadeTimer = window.setTimeout(() => {
    hideEventToast();
  }, eventToastVisibleMs);
}

function showActionPrompt(message, { buttonLabel = "Далее", autoFor = null } = {}) {
  if (!ui.eventToast) return Promise.resolve();

  window.clearTimeout(eventToastFadeTimer);
  window.clearTimeout(eventToastHideTimer);

  ui.eventToast.hidden = false;
  ui.eventToast.innerHTML = `<div class="event-toast-copy">${iconizeHtml(message)}</div>`;
  ui.eventToast.classList.remove("fading", "quick-fading", "visible");
  ui.eventToast.classList.add("action-prompt");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");
  actionPromptButtonLabel = buttonLabel;
  actionPromptAutoPlayerId = autoFor?.id ?? null;

  return new Promise((resolve) => {
    actionPromptResolver = () => {
      actionPromptResolver = null;
      actionPromptButtonLabel = "Далее";
      actionPromptAutoPlayerId = null;
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
    ui.eventToast.classList.remove("action-prompt", "visible", "fading", "quick-fading");
    ui.eventToast.innerHTML = "";
  }, quick ? eventToastQuickFadeMs : eventToastFadeMs);
}

async function animateDice(rollsOrResult, { bonus = 0, label = "", player = null, isEnemyBattle = false, isFinalBattle = false } = {}) {
  const rolls = Array.isArray(rollsOrResult) ? rollsOrResult : [rollsOrResult];
  const result = rolls.reduce((sum, value) => sum + value, 0);
  const caption = diceResultCaption(rolls, bonus);
  const playerLabel = dicePlayerLabel(player, label);
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

function triggerRollButtonAction({ fromBot = false } = {}) {
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

  if (wideLayoutQuery.matches) {
    if (scoreStripEl.parentElement !== sidePanelEl) sidePanelEl.prepend(scoreStripEl);
    return;
  }

  if (scoreStripEl.parentElement !== appShellEl) appShellEl.insertBefore(scoreStripEl, playAreaEl);
}

ui.newGameBtn.addEventListener("click", newGame);
ui.boardSelect?.addEventListener("change", newGame);
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
  if (!actionPromptResolver && ui.rollBtn.disabled) return;

  event.preventDefault();
  triggerRollButtonAction();
});

syncWideScoreStripPlacement();
wideLayoutQuery.addEventListener("change", syncWideScoreStripPlacement);

newGame();
