import { cardConfig } from "./cards.config.js";
import { doorConfigs } from "./game.config.js";

const boardEl = document.querySelector("#board");
const scoreStripEl = document.querySelector("#scoreStrip");
const gameLogEl = document.querySelector("#gameLog");
const tadamTableEl = document.querySelector("#tadamTable");

const ui = {
  activePlayerName: document.querySelector("#activePlayerName"),
  activePlayerRole: document.querySelector("#activePlayerRole"),
  choicePanel: document.querySelector("#choicePanel"),
  diceCount: document.querySelector("#diceCount"),
  diceValue: document.querySelector("#diceValue"),
  eventToast: document.querySelector("#eventToast"),
  finalBattleHud: document.querySelector("#finalBattleHud"),
  fieldEffect: document.querySelector("#fieldEffect"),
  newGameBtn: document.querySelector("#newGameBtn"),
  playerCount: document.querySelector("#playerCount"),
  rollBtn: document.querySelector("#rollBtn"),
  roundTitle: document.querySelector("#roundTitle"),
  turnActions: document.querySelector("#turnActions"),
  winnerPopup: document.querySelector("#winnerPopup"),
};

const boardCols = 10;
const boardRows = 10;
const eventToastVisibleMs = 3000;
const eventToastFadeMs = 800;
const eventToastQuickFadeMs = 140;
const startCell = "0-9";
const finishCell = "9-0";
const boardLayout = [
  ["red", "shop", "bad", null, "red", "good", "bad", null, "enemy", "finish"],
  ["green", null, "red", null, "red", null, "bad", "bad", "bad", null],
  ["red", null, "tadam", "enemy", "red", null, null, null, null, null],
  ["bad", null, null, null, null, null, null, "good", "enemy", "bad"],
  ["good", null, "shop", "green", "red", "good", "green", "red", null, "tadam"],
  ["green", null, "green", null, null, null, null, null, null, "green"],
  ["red", null, "bad", null, "good", "shop", "tadam", null, null, "green"],
  ["good", "enemy", "tadam", null, "tadam", null, "good", null, "good", "tadam"],
  [null, null, null, null, "green", null, "green", null, "green", null],
  ["start", "good", "green", "green", "good", null, "good", "tadam", "green", null],
];
const routePath = [
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
];
const fieldCells = buildFieldCells();
const routeCells = buildRouteCells();
const routeIndex = buildRouteIndex(routeCells);
const routeNext = buildRouteNext(routePath);

const cellEvents = buildCellEvents();

const eventIcons = {
  bad: '<img class="tile-icon-image tile-icon-bad" src="./assets/icons/bad_tight.png" alt="Плохо">',
  enemy: '<img class="tile-icon-image tile-icon-enemy" src="./assets/icons/enemy_512.png" alt="Враг">',
  good: '<img class="tile-icon-image tile-icon-good" src="./assets/icons/good_512.png" alt="Хорошо">',
  green: "",
  red: "",
  shop: '<img class="tile-icon-image tile-icon-shop" src="./assets/icons/joes_shop_512.png" alt="Лавка Джо">',
  tadam: '<img class="tile-icon-image tile-icon-tadam" src="./assets/icons/tadam_512.png" alt="ТАДАМ!">',
};

const tileIcons = {
  finish: '<img class="tile-icon-image tile-icon-finish" src="./assets/icons/finish_512.png" alt="Финиш">',
  start: '<img class="tile-icon-image tile-icon-start" src="./assets/icons/start_512.png" alt="Старт">',
};

const goodCards = cardConfig.good;
const badCards = cardConfig.bad;
const tadamCards = cardConfig.tadam;
const shopCards = cardConfig.shop;

const names = [
  { name: "Пес", color: "#2599db", token: "./assets/player-tokens/dog.png" },
  { name: "Кот", color: "#4bc6a8", token: "./assets/player-tokens/cat.png" },
  { name: "Выдра", color: "#765bc2", token: "./assets/player-tokens/otter.png" },
  { name: "Альпака", color: "#f1b72b", token: "./assets/player-tokens/alpaca.png" },
];

let state;
let actionPromptResolver = null;
let actionPromptButtonLabel = "Далее";
let eventToastFadeTimer = null;
let eventToastHideTimer = null;

function newGame() {
  actionPromptResolver = null;
  actionPromptButtonLabel = "Далее";
  const playerCount = Number(ui.playerCount.value);
  const doors = {};
  for (const door of doorConfigs) {
    doors[door.id] = { ...door, openedBy: [] };
  }

  state = {
    activePlayer: 0,
    choiceResolver: null,
    dice: null,
    doors,
    eventDepth: 0,
    finalBattle: null,
    finalBattleProgress: null,
    finished: false,
    isAnimating: false,
    landingCell: null,
    movingPlayerId: null,
    pendingChoice: null,
    pendingPreRoll: null,
    pendingShop: null,
    players: names.slice(0, playerCount).map((hero, index) => ({
      ...hero,
      coins: 10,
      diceBonus: 0,
      id: index,
      items: [],
      position: startCell,
    })),
    round: 1,
    tadams: [],
    turns: 0,
  };

  boardEl.dataset.ready = "false";
  log("<strong>Игра началась.</strong> Побеждайте врагов, чтобы открывать двери.");
  render();
}

async function rollAndMove({ animate = true } = {}) {
  if (state.finished || state.isAnimating || state.pendingChoice || state.pendingPreRoll || state.pendingShop) return;

  const player = currentPlayer();
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

  for (let step = 0; step < totalSteps && player.position !== finishCell; step += 1) {
    const currentPosition = player.position;
    const nextPosition = await chooseNextPosition(currentPosition, totalSteps - step, animate);
    if (!nextPosition) break;

    const blockingDoor = lockedDoorForTransition(player, currentPosition, nextPosition);
    if (blockingDoor) {
      if (animate) {
        await showActionPrompt(
          `${playerName(player)} не может пройти ${blockingDoor.label}: победи врага с уроном <strong>${blockingDoor.damage}</strong>`,
        );
      }
      break;
    }

    player.position = nextPosition;
    if (step < totalSteps - 1) resolveJumpSteal(player);
    if (animate) {
      render();
      await sleep(180);
    }
    if (step < totalSteps - 1) {
      await resolvePassThroughShop(player);
    }
  }

  state.isAnimating = false;
  state.movingPlayerId = null;
  pulseTile(player.position);
  log(`${playerName(player)} бросает <strong>${formatRoll(rolls)}</strong>${totalSteps !== rolled ? ` и идет на ${totalSteps}` : ""}.`);
  await resolveLanding(player);

  if (player.position === finishCell) {
    await resolveFinalBattle(player, animate);
  } else {
    advanceTurn();
  }

  render();
}

async function chooseNextPosition(currentCell, remaining, animate) {
  const choices = getNextOptions(currentCell);
  if (choices.length === 0) return null;
  if (choices.length === 1 || !animate) return choices[0].cell;

  state.pendingChoice = {
    choices,
    currentCell,
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

function advanceTurn() {
  state.dice = null;
  state.turns += 1;
  state.activePlayer = (state.activePlayer + 1) % state.players.length;

  if (state.activePlayer === 0) {
    state.round += 1;
  }
}

function render() {
  renderBoard();
  renderScores();
  renderTurn();
  renderChoicePanel();
  renderFinalBattleHud();
  renderWinnerPopup();
  renderTadams();
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
      const icon = eventIcons[cellEvents[cell]] || tileIcons[type];
      if (icon) {
        tile.innerHTML = `<span class="tile-icon">${icon}</span>`;
      }
      const enemyDoor = type === "enemy" ? doorByEnemyCell(cell) : null;
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

  for (const door of Object.values(state.doors)) {
    const tile = boardEl.querySelector(`[data-cell="${door.enemyCell}"]`);
    if (!tile) continue;

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
    token.classList.toggle("ready-to-roll", isPlayerReadyToRoll(player));
    token.classList.toggle("moving", player.id === state.movingPlayerId);
  }
}

function isPlayerReadyToRoll(player) {
  return (
    player.id === state.activePlayer &&
    !actionPromptResolver &&
    !state.finished &&
    !state.isAnimating &&
    !state.pendingChoice &&
    !state.pendingPreRoll &&
    !state.pendingShop
  );
}

function renderScores() {
  scoreStripEl.innerHTML = "";
  for (const player of state.players) {
    const card = document.createElement("article");
    card.className = `score-card ${player.id === state.activePlayer ? "active" : ""}`;
    card.style.setProperty("--player-color", player.color);
    card.innerHTML = `
      <div class="score-name">
        <span class="score-player-name">
          <img src="${player.token}" alt="" aria-hidden="true">
          <strong>${player.name}</strong>
        </span>
        <span class="pill">${tileTitle(player.position)}</span>
      </div>
      <div class="score-stats">
        <span><b>${player.coins}</b> монет</span>
        <span><b>+${playerDiceBonus(player)}</b> куб.</span>
      </div>
      <div class="score-shop">
        <span>Лавка Джо</span>
        <div>${renderShopBadges(player)}</div>
      </div>
    `;
    scoreStripEl.append(card);
  }
}

function renderShopBadges(player) {
  if (player.items.length === 0) return '<small>нет карт</small>';
  return player.items.map((item) => `<small title="${item.title}">${shortShopTitle(item)}</small>`).join("");
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
    ui.activePlayerRole.textContent = `Клетка ${cellLabel(player.position)}. Монеты: ${player.coins}.${itemText}`;
  }
  ui.fieldEffect.innerHTML = fieldEffectText(player.position);
  ui.turnActions.className = `turn-actions ${state.pendingPreRoll ? "pending-action" : ""}`.trim();
  ui.turnActions.innerHTML = turnActionsText(player);
  ui.diceValue.textContent = state.dice ?? "-";
  ui.rollBtn.textContent = actionPromptResolver ? actionPromptButtonLabel : state.isAnimating ? "Кубик крутится" : "Бросить кубик";
  if (ui.roundTitle) {
    ui.roundTitle.textContent = state.finished ? "Игра завершена" : `Раунд ${state.round}`;
  }
  ui.rollBtn.disabled =
    !actionPromptResolver &&
    (state.finished || state.isAnimating || Boolean(state.pendingChoice) || Boolean(state.pendingPreRoll) || Boolean(state.pendingShop));
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
      summary: `${player.name}: ${player.coins} монет. Можно купить одну карту или пройти мимо.`,
      buttonsClass: "shop-buttons",
    });

    for (const card of state.pendingShop.offer) {
      appendChoiceButton(buttons, {
        className: "shop-choice choice-button-card",
        label: card.title,
        note: "5 монет",
        description: card.description,
        onClick: () => resolveShopChoice(card.id),
      });
    }

    appendChoiceButton(buttons, {
      className: "shop-choice decline",
      label: "Отказаться",
      note: "0 монет",
      description: "Сохранить монеты и закончить посещение Лавки Джо.",
      onClick: () => resolveShopChoice(null),
    });
    return;
  }

  if (!state.pendingChoice) {
    hideChoicePanel();
    return;
  }

  const player = currentPlayer();
  const buttons = renderChoiceDialog({
    kind: "direction",
    kicker: "Развилка",
    title: "Куда идти дальше?",
    summary: `${player.name}: клетка ${cellLabel(state.pendingChoice.currentCell)}. Осталось ${state.pendingChoice.remaining} шага.`,
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
  if (!progress || state.finished) {
    ui.finalBattleHud.hidden = true;
    ui.finalBattleHud.innerHTML = "";
    return;
  }

  const boss = state.players.find((player) => player.id === progress.bossId);
  ui.finalBattleHud.hidden = false;
  ui.finalBattleHud.innerHTML = `
    <div class="final-battle-side players">
      <span>Игроки</span>
      <strong>${progress.playersForce}</strong>
    </div>
    <div class="final-battle-vs">VS</div>
    <div class="final-battle-side boss" style="--player-color: ${boss?.color || "#ff7d5d"}">
      <span>Босс${boss ? ` - ${boss.name}` : ""}</span>
      <strong>${progress.bossForce}</strong>
    </div>
  `;
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
  titleEl.textContent = title;

  const summaryEl = document.createElement("p");
  summaryEl.className = "choice-summary";
  summaryEl.textContent = summary;

  const buttons = document.createElement("div");
  buttons.className = `choice-buttons ${buttonsClass}`.trim();

  copy.append(kickerEl, titleEl, summaryEl);
  dialog.append(copy, buttons);
  ui.choicePanel.append(dialog);

  return buttons;
}

function appendChoiceButton(buttons, { className = "", label, note, description = "", onClick }) {
  const button = document.createElement("button");
  button.className = `choice-button ${className}`.trim();
  button.type = "button";

  const labelEl = document.createElement("b");
  labelEl.textContent = label;

  const noteEl = document.createElement("span");
  noteEl.textContent = note;

  button.append(labelEl, noteEl);

  if (description) {
    const descriptionEl = document.createElement("small");
    descriptionEl.textContent = description;
    button.append(descriptionEl);
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

async function resolveLanding(player) {
  if (state.eventDepth > 5 || player.position === finishCell) return;

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
      drawTadamCard(player);
    } else if (event === "shop") {
      await resolveShop(player);
    } else if (event === "enemy") {
      await resolveEnemyBattle(player);
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
  if (!door || isDoorOpenForPlayer(door, player)) return;

  await showActionPrompt(
    `${playerName(player)} вступает в бой. Нужно нанести <strong>${door.damage} урона</strong>, чтобы открыть ${door.label}.`,
  );

  const extraDice = await chooseExtraDie(player, true);
  const diceCount = totalDiceForPlayer(player, extraDice);
  const rolls = rollDice(diceCount);
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  const bonus = playerStepBonus(player);
  state.isAnimating = true;
  state.dice = null;
  render();
  await animateDice(rolls, { bonus, player });

  const damage = rolled + bonus;
  state.dice = damage;
  state.isAnimating = false;

  const bonusText = bonus ? ` + ${bonus} бонус = <strong>${damage}</strong>` : "";
  if (damage >= door.damage) {
    door.openedBy.push(player.id);
    player.diceBonus = playerDiceBonus(player) + 1;
    log(
      `${playerName(player)} побеждает врага: ${formatRoll(rolls)}${bonusText}. ${door.label} открыта для игрока. Награда: <strong>+1 кубик</strong>.`,
    );
    render();
    await showActionPrompt(
      `${playerName(player)} побеждает врага: ${formatRoll(rolls)}${bonusText}. ${door.label} открыта. Награда: <strong>+1 кубик</strong>.`,
    );
    return;
  }

  log(`${playerName(player)} не побеждает врага: ${formatRoll(rolls)}${bonusText}. Игрок возвращается на старт.`);
  player.position = startCell;
  render();
  pulseTile(player.position);
  await showActionPrompt(`${playerName(player)} не побеждает врага: ${formatRoll(rolls)}${bonusText}. Возврат на <strong>старт</strong>.`);
}

async function resolveFinalBattle(boss, animate = true) {
  const challengers = state.players.filter((player) => player.id !== boss.id);
  state.isAnimating = animate;
  state.movingPlayerId = null;
  state.dice = null;
  state.finalBattleProgress = {
    bossForce: 0,
    bossId: boss.id,
    playersForce: 0,
  };
  render();

  log(`${playerName(boss)} достигает финиша и становится <strong>боссом</strong>. Начинается финальная битва.`);
  if (animate) {
    await showActionPrompt(
      `${playerName(boss)} дошел до финиша и становится <strong>боссом</strong>. Остальные игроки сражаются с ним.`,
    );
  }

  const challengerResults = [];
  for (const challenger of challengers) {
    if (animate) {
      await showActionPrompt(`${playerName(challenger)} готовится бросить кубики.`, { buttonLabel: "Бросить кубик" });
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
  const bossBonus = playerStepBonus(boss) * challengers.length;
  const bossOpponentBonus = challengers.length;
  state.finalBattleProgress.bossForce = bossBonus + bossOpponentBonus;
  render();
  for (let index = 0; index < challengers.length; index += 1) {
    if (animate) {
      await showActionPrompt(`Босс - ${playerName(boss)} готовится бросить кубики ${index + 1}/${challengers.length}.`, {
        buttonLabel: "Бросить кубик",
      });
    }
    const result = await rollFinalBattlePower(boss, animate, { label: `Босс - ${boss.name}` });
    bossRollResults.push(result);
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
  const scores = state.players.map((player) => {
    const damage = challengerResults.find((result) => result.player.id === player.id)?.total || 0;
    return finalBattleScore(player, damage);
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
      await showActionPrompt(`Босс ${playerName(boss)} побеждает: <strong>${bossForce}</strong> против ${playersForce}.`);
    }
  } else {
    const scoreText = scores
      .filter((score) => challengers.some((player) => player.id === score.playerId))
      .map((score) => `${state.players.find((player) => player.id === score.playerId)?.name}: ${score.total}`)
      .join(", ");
    log(
      `<strong>Финальная битва завершена.</strong> Игроки побеждают босса: ${playersForce} против ${bossForce}. По очкам побеждает ${playerName(winner)} (${scoreText}).`,
    );
    if (animate) {
      await showActionPrompt(
        `Игроки побеждают босса: <strong>${playersForce}</strong> против ${bossForce}. По очкам побеждает ${playerName(winner)}.`,
      );
    }
  }
}

async function rollFinalBattlePower(player, animate, { label = "" } = {}) {
  const rolls = rollDice(totalDiceForPlayer(player));
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  const bonus = playerStepBonus(player);
  if (animate) {
    state.dice = null;
    render();
    await animateDice(rolls, { bonus, label, player, isFinalBattle: true });
  }
  const total = rolled + bonus;
  state.dice = total;
  render();
  return { bonus, player, rolled, rolls, total };
}

function finalBonusText(bonus, total) {
  return bonus ? ` + ${bonus} бонус = <strong>${total}</strong>` : "";
}

function finalBattleScore(player, damageToBoss) {
  const coins = player.coins;
  const shop = player.items.length * 5;
  const damage = damageToBoss * 2;
  return {
    coins,
    damage,
    damageToBoss,
    playerId: player.id,
    shop,
    total: coins + shop + damage,
  };
}

function bestFinalScorePlayer(scores, candidates) {
  const candidateIds = new Set(candidates.map((player) => player.id));
  const winnerScore = scores
    .filter((score) => candidateIds.has(score.playerId))
    .sort((a, b) => b.total - a.total || b.coins - a.coins || b.shop - a.shop)[0];
  return state.players.find((player) => player.id === winnerScore?.playerId) || candidates[0] || state.players[0];
}

async function resolveGreenField(player) {
  const effect = activeFieldEffect("green-field");
  if (effect) {
    await applyFieldEffect(player, effect, "зеленое поле");
    return;
  }

  addCoins(player, 3);
  log(`${playerName(player)} получает <strong>3 монеты</strong> на зеленом поле.`, { toast: true });
}

async function resolveRedField(player) {
  const effect = activeFieldEffect("red-field");
  if (effect) {
    await applyFieldEffect(player, effect, "красное поле");
    return;
  }

  addCoins(player, -3);
  log(`${playerName(player)} теряет <strong>3 монеты</strong> на красном поле.`, { toast: true });
}

async function drawAndApplyCard(player, deck, deckName) {
  const card = randomItem(deck);
  log(`${playerName(player)} тянет карту <strong>${deckName}</strong>: ${card.title}.`, { toast: true });
  await applyCardEffect(player, card.effect, { title: card.title });
}

async function applyCardEffect(player, effect, source = {}) {
  if (!effect) return;

  if (effect.type === "coins") {
    addCoins(player, effect.amount);
  } else if (effect.type === "move") {
    await confirmMoveEffect(player, effect.steps, source.title);
    await movePlayerSteps(player, effect.steps);
  } else if (effect.type === "steal-random") {
    stealFromRandomPlayer(player, effect.amount);
  } else if (effect.type === "steal-richest") {
    stealFromRichestPlayer(player, effect.amount);
  } else if (effect.type === "give-random") {
    giveToRandomPlayer(player, effect.amount);
  }
}

async function applyFieldEffect(player, effect, fieldName) {
  if (effect.mode === "draw") {
    await drawAndApplyCard(player, deckById(effect.deck), deckLabel(effect.deck));
  } else if (effect.mode === "move") {
    const direction = effect.steps > 0 ? "вперед" : "назад";
    const message = `${playerName(player)} попадает на ${fieldName} и идет на <strong>${Math.abs(effect.steps)} клеток ${direction}</strong>`;
    log(message);
    await showActionPrompt(message);
    await movePlayerSteps(player, effect.steps);
  }
}

async function confirmMoveEffect(player, steps, sourceTitle = "") {
  const source = sourceTitle ? `<span>${sourceTitle}</span>` : "";
  await showActionPrompt(`${source}<strong>${playerName(player)}: ${moveActionText(steps)}</strong>`);
}

function moveActionText(steps) {
  const direction = steps > 0 ? "вперед" : "назад";
  return `Перейди на ${Math.abs(steps)} клеток ${direction}.`;
}

function drawTadamCard(player) {
  const card = randomItem(tadamCards);
  state.tadams.push(card);
  if (state.tadams.length > 3) state.tadams.shift();
  log(`${playerName(player)} открывает <strong>ТАДАМ!</strong>: ${card.title}.`, { toast: true });
}

async function resolveShop(player) {
  const offer = drawUnique(shopCards, 2);
  if (player.coins < 5) {
    log(`Лавка Джо предлагает: ${offer.map((card) => card.title).join(" / ")}. У ${playerName(player)} не хватает монет.`, {
      toast: true,
    });
    return;
  }

  const bought = await chooseShopCard(player, offer);
  if (!bought) {
    log(`${playerName(player)} отказывается от карт Лавки Джо.`, { toast: true });
    return;
  }

  addCoins(player, -5);
  player.items.push(bought);
  log(`${playerName(player)} покупает в Лавке Джо: <strong>${bought.title}</strong>.`, { toast: true });
}

async function resolvePassThroughShop(player) {
  if (cellEvents[player.position] !== "shop") return;

  log(`${playerName(player)} проходит через <strong>Лавку Джо</strong>.`, { toast: true });
  await resolveShop(player);
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
          `${playerName(player)} не может пройти ${blockingDoor.label}: победи врага с уроном <strong>${blockingDoor.damage}</strong>`,
        );
        break;
      }
      player.position = nextPosition;
      if (step < steps - 1) resolveJumpSteal(player);
      render();
      await sleep(120);
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
  player.coins = Math.max(0, player.coins + amount + bonus);
  return amount + bonus;
}

function stealCoins(fromPlayer, toPlayer, amount) {
  if (!fromPlayer || !toPlayer || fromPlayer.id === toPlayer.id) return 0;
  const taken = Math.min(amount, fromPlayer.coins);
  fromPlayer.coins -= taken;
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

function giveToRandomPlayer(player, amount) {
  const target = randomOpponent(player);
  if (!target) return;
  const given = stealCoins(player, target, amount);
  log(`${playerName(player)} отдает ${playerName(target)} <strong>${given} монет</strong>.`);
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
  if (state.tadams.length === 0) {
    tadamTableEl.innerHTML = '<p class="muted-text">Пока нет активных карт.</p>';
    return;
  }

  for (const card of state.tadams) {
    const item = document.createElement("article");
    item.className = "tadam-item";
    item.innerHTML = `<span>🎉</span><strong>${card.title}</strong>`;
    tadamTableEl.append(item);
  }
}

function tileType(cell) {
  if (fieldCells.has(cell) === false) return "empty";
  if (cell === startCell) return "start";
  if (cell === finishCell) return "finish";
  if (cellEvents[cell]) return cellEvents[cell];
  return "path";
}

function tileTitle(cell) {
  if (cell === startCell) return "Старт";
  if (cell === finishCell) return "Финиш";
  const namesByEvent = {
    bad: "Плохо",
    enemy: "Враг",
    good: "Хорошо",
    green: "Зеленое поле",
    red: "Красное поле",
    shop: "Лавка Джо",
    tadam: "ТАДАМ!",
  };
  return namesByEvent[cellEvents[cell]] || "Клетка";
}

function fieldEffectText(cell) {
  if (cell === startCell) return "<span>Старт</span><strong>Начальная клетка</strong>";
  if (cell === finishCell) return "<span>Финиш</span><strong>финальная битва</strong>";

  const texts = {
    bad: ["Плохо", "тяни карту Плохо"],
    enemy: ["Враг", "эффект появится позже"],
    good: ["Хорошо", "тяни карту Хорошо"],
    green: ["Зеленое поле", greenEffectLabel()],
    red: ["Красное поле", redEffectLabel()],
    shop: ["Лавка Джо", "2 карты на выбор за 5 монет"],
    tadam: ["ТАДАМ!", "новое общее правило"],
  };
  const text = texts[cellEvents[cell]] || ["Обычная клетка", "без эффекта"];
  return `<span>${text[0]}</span><strong>${text[1]}</strong>`;
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
          <b>${card?.shortTitle || card?.title || "Карта Лавки Джо"}${total > 1 ? ` ${current}/${total}` : ""}</b>
          Заплати ${cost} монеты: +${dice} кубик.
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
        <b>${card.effect.cost} монеты</b>
        <span>+${card.effect.dice} кубик</span>
      </span>
    `);
  }

  if (actions.length === 0) return '<span class="action-empty">нет действий</span>';
  return `<span class="action-label">Действия</span>${actions.join("")}`;
}

function greenEffectLabel() {
  const effect = activeFieldEffect("green-field");
  if (effect?.mode === "draw") return `тяни карту ${deckLabel(effect.deck)}`;
  if (effect?.mode === "move") return `${effect.steps > 0 ? "+" : ""}${effect.steps} шагов`;
  return "+3 монеты";
}

function redEffectLabel() {
  const effect = activeFieldEffect("red-field");
  if (effect?.mode === "draw") return `тяни карту ${deckLabel(effect.deck)}`;
  if (effect?.mode === "move") return `${effect.steps > 0 ? "+" : ""}${effect.steps} шагов`;
  return "-3 монеты";
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

function isDoorOpenForPlayer(door, player) {
  return door.openedBy?.includes(player.id);
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
  return player.items
    .filter((item) => item.effect?.type === "passive-step-bonus")
    .reduce((sum, item) => sum + item.effect.steps, 0);
}

function playerDiceBonus(player) {
  return player.diceBonus || 0;
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

function playerName(player) {
  return `<span class="player-name" style="--player-color: ${player.color}">${player.name}</span>`;
}

function log(message, { toast = false } = {}) {
  const item = document.createElement("li");
  item.innerHTML = message;
  gameLogEl.prepend(item);
  while (gameLogEl.children.length > 40) gameLogEl.lastElementChild.remove();

  if (toast) showEventToast(message);
}

function showEventToast(message) {
  if (!ui.eventToast) return;

  window.clearTimeout(eventToastFadeTimer);
  window.clearTimeout(eventToastHideTimer);

  ui.eventToast.hidden = false;
  ui.eventToast.innerHTML = message;
  ui.eventToast.classList.remove("action-prompt", "fading", "quick-fading", "visible");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");

  eventToastFadeTimer = window.setTimeout(() => {
    hideEventToast();
  }, eventToastVisibleMs);
}

function showActionPrompt(message, { buttonLabel = "Далее" } = {}) {
  if (!ui.eventToast) return Promise.resolve();

  window.clearTimeout(eventToastFadeTimer);
  window.clearTimeout(eventToastHideTimer);

  ui.eventToast.hidden = false;
  ui.eventToast.innerHTML = `<div class="event-toast-copy">${message}</div>`;
  ui.eventToast.classList.remove("fading", "quick-fading", "visible");
  ui.eventToast.classList.add("action-prompt");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");
  actionPromptButtonLabel = buttonLabel;

  return new Promise((resolve) => {
    actionPromptResolver = () => {
      actionPromptResolver = null;
      actionPromptButtonLabel = "Далее";
      hideEventToast({ quick: true });
      render();
      resolve();
    };
    render();
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

async function animateDice(rollsOrResult, { bonus = 0, label = "", player = null, isFinalBattle = false } = {}) {
  const rolls = Array.isArray(rollsOrResult) ? rollsOrResult : [rollsOrResult];
  const result = rolls.reduce((sum, value) => sum + value, 0);
  const caption = diceResultCaption(rolls, bonus);
  const playerLabel = dicePlayerLabel(player, label);
  const throwPromise = animateDiceOnBoard(rolls, { caption, playerLabel, isFinalBattle });
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

async function animateDiceOnBoard(rolls, { caption = "", playerLabel = null, isFinalBattle = false } = {}) {
  if (!boardEl || !rolls.length) return;

  boardEl.querySelectorAll(".dice-throw-layer").forEach((layer) => layer.remove());

  const layer = document.createElement("div");
  layer.className = "dice-throw-layer";

  if (playerLabel) {
    const playerEl = document.createElement("span");
    playerEl.className = "dice-player-label";
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
  const dieSize = Math.min(54, Math.max(34, boardRect.width * 0.078));
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
    die.style.setProperty("--center-y", `${49 + (index % 2 === 0 ? -2 : 2)}%`);
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
  return `${rolls.join(" + ")} + ${bonus} бонус = <strong>${rolled + bonus}</strong>`;
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

function triggerRollButtonAction() {
  if (actionPromptResolver) {
    actionPromptResolver();
    return;
  }
  if (ui.rollBtn.disabled) return;
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

ui.newGameBtn.addEventListener("click", newGame);
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

newGame();
