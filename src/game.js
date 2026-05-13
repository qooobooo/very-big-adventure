import { cardConfig } from "./cards.config.js";

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
  fieldEffect: document.querySelector("#fieldEffect"),
  newGameBtn: document.querySelector("#newGameBtn"),
  playerCount: document.querySelector("#playerCount"),
  rollBtn: document.querySelector("#rollBtn"),
  roundTitle: document.querySelector("#roundTitle"),
};

const boardCols = 10;
const boardRows = 10;
const eventToastVisibleMs = 5000;
const eventToastFadeMs = 800;
const startCell = "9-9";
const finishCell = "4-3";
const fieldCells = buildFieldCells();
const routeCells = buildRouteCells();
const routeIndex = buildRouteIndex(routeCells);

const doorConfigs = [
  { id: "top", cell: "2-0", edge: "bottom", label: "верхняя дверь", multiplier: 1 },
  { id: "middle", cell: "2-5", edge: "bottom", label: "средняя дверь", multiplier: 1 },
  { id: "finish", cell: "7-5", edge: "top", label: "дверь к финишу", multiplier: 2 },
];

const cellEvents = {
  "0-0": "good",
  "1-0": "good",
  "2-0": "seal",
  "3-0": "bad",
  "4-0": "shop",
  "5-0": "good",
  "6-0": "tadam",
  "7-0": "bad",
  "8-0": "red",
  "9-0": "shop",
  "0-1": "green",
  "2-1": "green",
  "9-1": "good",
  "0-2": "tadam",
  "2-2": "green",
  "4-2": "bad",
  "5-2": "bad",
  "6-2": "bad",
  "7-2": "bad",
  "9-2": "bad",
  "0-3": "shop",
  "2-3": "shop",
  "7-3": "bad",
  "9-3": "tadam",
  "0-4": "green",
  "2-4": "green",
  "7-4": "bad",
  "9-4": "red",
  "0-5": "tadam",
  "2-5": "seal",
  "3-5": "red",
  "4-5": "red",
  "5-5": "red",
  "6-5": "red",
  "7-5": "red",
  "9-5": "red",
  "0-6": "bad",
  "2-6": "good",
  "4-6": "good",
  "7-6": "good",
  "9-6": "shop",
  "0-7": "good",
  "2-7": "good",
  "3-7": "good",
  "4-7": "good",
  "7-7": "good",
  "8-7": "tadam",
  "9-7": "bad",
  "0-8": "shop",
  "7-8": "good",
  "0-9": "good",
  "1-9": "tadam",
  "2-9": "good",
  "3-9": "green",
  "4-9": "good",
  "5-9": "shop",
  "6-9": "green",
  "7-9": "green",
  "8-9": "good",
};

const eventIcons = {
  bad: "👎",
  good: "🎁",
  green: "",
  red: "",
  seal: "🗝️",
  shop: "🛒",
  tadam: "🎉",
};

const goodCards = cardConfig.good;
const badCards = cardConfig.bad;
const tadamCards = cardConfig.tadam;
const shopCards = cardConfig.shop;

const names = [
  { name: "Борис Двуручный", color: "#f07e59" },
  { name: "Мира Ловкачка", color: "#61c3d9" },
  { name: "Клим Алхимик", color: "#95d96d" },
  { name: "Веста Чёрный Плащ", color: "#c795ff" },
];

let state;
let eventToastFadeTimer = null;
let eventToastHideTimer = null;

function newGame() {
  const playerCount = Number(ui.playerCount.value);
  const doors = {};
  for (const door of doorConfigs) {
    doors[door.id] = {
      ...door,
      seals: playerCount * door.multiplier,
    };
  }

  state = {
    activePlayer: 0,
    choiceResolver: null,
    dice: null,
    doors,
    eventDepth: 0,
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
      id: index,
      items: [],
      position: startCell,
      sealsRemoved: 0,
    })),
    round: 1,
    tadams: [],
    turns: 0,
  };

  boardEl.dataset.ready = "false";
  log("<strong>Игра началась.</strong> Снимайте печати, проходя через запечатанные клетки.");
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

  const rolls = rollDice(Number(ui.diceCount.value) + extraDice);
  const rolled = rolls.reduce((sum, value) => sum + value, 0);
  if (animate) await animateDice(rolled);
  const totalSteps = rolled + playerStepBonus(player);
  state.dice = totalSteps;

  for (let step = 0; step < totalSteps && player.position !== finishCell; step += 1) {
    const currentPosition = player.position;
    const nextPosition = await chooseNextPosition(currentPosition, totalSteps - step, animate);
    if (!nextPosition) break;

    removeSealIfNeeded(player, currentPosition);
    player.position = nextPosition;
    if (step < totalSteps - 1) resolveJumpSteal(player);
    if (animate) {
      render();
      await sleep(180);
    }
  }

  state.isAnimating = false;
  state.movingPlayerId = null;
  pulseTile(player.position);
  log(`${player.name} бросает <strong>${formatRoll(rolls)}</strong>${totalSteps !== rolled ? ` и идет на ${totalSteps}` : ""}.`);
  await resolveLanding(player);

  if (player.position === finishCell) {
    addCoins(player, 20);
    state.finished = true;
    const winner = findWinner();
    log(`${player.name} достигает финиша и получает <strong>20 монет</strong>.`);
    log(`<strong>Игра завершена.</strong> Побеждает ${winner.name}: ${winner.coins} монет.`);
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

  if (cell === "2-0") {
    const choices = [{ cell: "3-0", label: "вправо" }];
    if (isDoorOpen("top")) choices.unshift({ cell: "2-1", label: "вниз" });
    return choices;
  }

  if (cell === "2-5") {
    const choices = [{ cell: "3-5", label: "вправо" }];
    if (isDoorOpen("middle")) choices.unshift({ cell: "2-6", label: "вниз" });
    return choices;
  }

  if (cell === "7-5") {
    const choices = [{ cell: "7-6", label: "вниз" }];
    if (isDoorOpen("finish")) choices.unshift({ cell: "7-4", label: "к финишу" });
    return choices;
  }

  const nextCell = defaultNextCell(cell);
  return nextCell ? [{ cell: nextCell, label: "вперёд" }] : [];
}

function defaultNextCell(cell) {
  const [col, row] = parseCell(cell);

  if (row === 9 && col > 0) return cellKey(col - 1, row);
  if (col === 0 && row > 0) return cellKey(col, row - 1);
  if (row === 0 && col < 9) return cellKey(col + 1, row);
  if (col === 9 && row < 7) return cellKey(col, row + 1);
  if (row === 7 && col > 7) return cellKey(col - 1, row);
  if (col === 7 && row >= 6 && row < 9) return cellKey(col, row + 1);

  if (col === 2 && row > 0 && row < 5) return cellKey(col, row + 1);
  if (row === 5 && col >= 3 && col < 7) return cellKey(col + 1, row);
  if (col === 2 && row >= 5 && row < 7) return cellKey(col, row + 1);
  if (row === 7 && col >= 2 && col < 4) return cellKey(col + 1, row);
  if (col === 4 && row > 5 && row <= 7) return cellKey(col, row - 1);
  if (row === 5 && col >= 4 && col < 7) return cellKey(col + 1, row);

  if (col === 7 && row > 2 && row < 5) return cellKey(col, row - 1);
  if (row === 2 && col > 4 && col <= 7) return cellKey(col - 1, row);
  if (cell === "4-2") return finishCell;

  return null;
}

function removeSealIfNeeded(player, cell) {
  const door = doorByCell(cell);
  if (!door || door.seals <= 0) return;

  door.seals -= 1;
  player.sealsRemoved += 1;
  log(`${player.name} снимает печать с клетки ${cellLabel(cell)}. Осталось: <strong>${door.seals}</strong>.`);
  if (door.seals === 0) {
    log(`<strong>${door.label} открыта.</strong>`);
  }
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
  renderTadams();
}

function renderBoard() {
  if (boardEl.dataset.ready !== "true") buildBoardShell();
  renderDoors();
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
      tile.className = `tile tile-${tileType(cell)}`;
      tile.dataset.cell = cell;
      tile.title = tileTitle(cell);
      const door = doorByCell(cell);
      if (door) {
        tile.classList.add(`door-edge-${door.edge}`);
        tile.innerHTML = '<span class="seal-mark" aria-label="Печати">🗝️</span><span class="seal-count"></span>';
      } else if (eventIcons[cellEvents[cell]]) {
        tile.innerHTML = `<span class="tile-icon">${eventIcons[cellEvents[cell]]}</span>`;
      }
      tileGrid.append(tile);
    }
  }

  const tokenLayer = document.createElement("div");
  tokenLayer.className = "token-layer";
  boardEl.append(tileGrid, tokenLayer);
  boardEl.dataset.ready = "true";
}

function renderDoors() {
  for (const door of Object.values(state.doors)) {
    const tile = boardEl.querySelector(`[data-cell="${door.cell}"]`);
    if (!tile) continue;

    tile.classList.toggle("door-open", door.seals === 0);
    tile.classList.toggle("door-closed", door.seals > 0);
    tile.querySelector(".seal-count").textContent = door.seals > 0 ? String(door.seals) : "";
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
    token.textContent = "";
    token.classList.toggle("active", player.id === state.activePlayer);
    token.classList.toggle("moving", player.id === state.movingPlayerId);
  }
}

function renderScores() {
  scoreStripEl.innerHTML = "";
  for (const player of state.players) {
    const card = document.createElement("article");
    card.className = `score-card ${player.id === state.activePlayer ? "active" : ""}`;
    card.style.setProperty("--player-color", player.color);
    card.innerHTML = `
      <div class="score-name"><strong>${player.name}</strong><span class="pill">Клетка ${cellLabel(player.position)}</span></div>
      <div class="score-stats">
        <span><b>${cellLabel(player.position)}</b> позиция</span>
        <span><b>${player.coins}</b> монет</span>
        <span><b>${player.sealsRemoved}</b> печатей</span>
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
  ui.activePlayerName.textContent = player.name;
  const itemText = player.items.length ? ` Лавка: ${player.items.map((item) => item.title).join(", ")}.` : "";
  ui.activePlayerRole.textContent = `Клетка ${cellLabel(player.position)}. Монеты: ${player.coins}.${itemText}`;
  ui.fieldEffect.innerHTML = fieldEffectText(player.position);
  ui.diceValue.textContent = state.dice ?? "-";
  ui.rollBtn.textContent = state.isAnimating ? "Кубик крутится" : "Бросить кубик";
  ui.roundTitle.textContent = state.finished ? "Игра завершена" : `Раунд ${state.round}`;
  ui.rollBtn.disabled =
    state.finished || state.isAnimating || Boolean(state.pendingChoice) || Boolean(state.pendingPreRoll) || Boolean(state.pendingShop);
}

function renderChoicePanel() {
  if (state.pendingPreRoll) {
    const player = state.players.find((item) => item.id === state.pendingPreRoll.playerId) || currentPlayer();
    const card = player.items.find((item) => item.effect?.type === "optional-extra-die");
    const cost = card?.effect?.cost ?? 2;
    const dice = card?.effect?.dice ?? 1;
    const buttons = renderChoiceDialog({
      kind: "use-card",
      kicker: "Карта Лавки Джо",
      title: card?.shortTitle || card?.title || "Дополнительный кубик",
      summary: `${player.name} может заплатить ${cost} монеты и бросить на ${dice} кубик больше.`,
    });

    for (const choice of [
      { id: "yes", label: `Заплатить ${cost} монеты`, note: `+${dice} кубик` },
      { id: "no", label: "Не платить", note: "обычный бросок" },
    ]) {
      appendChoiceButton(buttons, {
        label: choice.label,
        note: choice.note,
        onClick: () => resolvePreRollChoice(choice.id === "yes"),
      });
    }
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
    }

    resolveLandSteal(player);
  } finally {
    state.eventDepth -= 1;
  }
}

async function resolveGreenField(player) {
  const effect = activeFieldEffect("green-field");
  if (effect) {
    await applyFieldEffect(player, effect, "зеленое поле");
    return;
  }

  addCoins(player, 3);
  log(`${player.name} получает <strong>3 монеты</strong> на зеленом поле.`, { toast: true });
}

async function resolveRedField(player) {
  const effect = activeFieldEffect("red-field");
  if (effect) {
    await applyFieldEffect(player, effect, "красное поле");
    return;
  }

  addCoins(player, -3);
  log(`${player.name} теряет <strong>3 монеты</strong> на красном поле.`, { toast: true });
}

async function drawAndApplyCard(player, deck, deckName) {
  const card = randomItem(deck);
  log(`${player.name} тянет карту <strong>${deckName}</strong>: ${card.title}.`, { toast: true });
  await applyCardEffect(player, card.effect);
}

async function applyCardEffect(player, effect) {
  if (!effect) return;

  if (effect.type === "coins") {
    addCoins(player, effect.amount);
  } else if (effect.type === "move") {
    await movePlayerSteps(player, effect.steps);
  } else if (effect.type === "steal-random") {
    stealFromRandomPlayer(player, effect.amount);
  } else if (effect.type === "give-random") {
    giveToRandomPlayer(player, effect.amount);
  }
}

async function applyFieldEffect(player, effect, fieldName) {
  if (effect.mode === "draw") {
    await drawAndApplyCard(player, deckById(effect.deck), deckLabel(effect.deck));
  } else if (effect.mode === "move") {
    const direction = effect.steps > 0 ? "вперед" : "назад";
    log(`${player.name} попадает на ${fieldName} и идет на <strong>${Math.abs(effect.steps)} клеток ${direction}</strong>.`, {
      toast: true,
    });
    await movePlayerSteps(player, effect.steps);
  }
}

function drawTadamCard(player) {
  const card = randomItem(tadamCards);
  state.tadams.push(card);
  if (state.tadams.length > 3) state.tadams.shift();
  log(`${player.name} открывает <strong>ТАДАМ!</strong>: ${card.title}.`, { toast: true });
}

async function resolveShop(player) {
  const offer = drawUnique(shopCards, 2);
  if (player.coins < 5) {
    log(`Лавка Джо предлагает: ${offer.map((card) => card.title).join(" / ")}. У ${player.name} не хватает монет.`, {
      toast: true,
    });
    return;
  }

  const bought = await chooseShopCard(player, offer);
  if (!bought) {
    log(`${player.name} отказывается от карт Лавки Джо.`, { toast: true });
    return;
  }

  addCoins(player, -5);
  player.items.push(bought);
  log(`${player.name} покупает в Лавке Джо: <strong>${bought.title}</strong>.`, { toast: true });
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
  if (steps > 0) {
    for (let step = 0; step < steps && player.position !== finishCell; step += 1) {
      const nextPosition = getNextOptions(player.position)[0]?.cell;
      if (!nextPosition) break;
      removeSealIfNeeded(player, player.position);
      player.position = nextPosition;
      if (step < steps - 1) resolveJumpSteal(player);
      render();
      await sleep(120);
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
  await resolveLanding(player);
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
  log(`${player.name} забирает у ${target.name} <strong>${taken} монет</strong>.`);
}

function giveToRandomPlayer(player, amount) {
  const target = randomOpponent(player);
  if (!target) return;
  const given = stealCoins(player, target, amount);
  log(`${player.name} отдает ${target.name} <strong>${given} монет</strong>.`);
}

function resolveJumpSteal(player) {
  const effect = activeTadamEffect("jump-steal");
  if (!effect) return;
  for (const target of state.players) {
    if (target.id === player.id || target.position !== player.position) continue;
    const taken = stealCoins(target, player, effect.amount);
    if (taken > 0) log(`${player.name} перепрыгивает ${target.name} и забирает <strong>${taken} монет</strong>.`);
  }
}

function resolveLandSteal(player) {
  const effect = activeTadamEffect("land-steal");
  if (!effect) return;
  for (const target of state.players) {
    if (target.id === player.id || target.position !== player.position) continue;
    const taken = stealCoins(target, player, effect.amount);
    if (taken > 0) log(`${player.name} останавливается рядом с ${target.name} и забирает <strong>${taken} монет</strong>.`);
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
    good: "Хорошо",
    green: "Зеленое поле",
    red: "Красное поле",
    seal: "Печать",
    shop: "Лавка Джо",
    tadam: "ТАДАМ!",
  };
  return namesByEvent[cellEvents[cell]] || "Клетка";
}

function fieldEffectText(cell) {
  if (cell === startCell) return "<span>Старт</span><strong>Начальная клетка</strong>";
  if (cell === finishCell) return "<span>Финиш</span><strong>+20 монет и конец игры</strong>";

  const texts = {
    bad: ["Плохо", "тяни карту Плохо"],
    good: ["Хорошо", "тяни карту Хорошо"],
    green: ["Зеленое поле", greenEffectLabel()],
    red: ["Красное поле", redEffectLabel()],
    seal: ["Печать", "снимается при выходе"],
    shop: ["Лавка Джо", "2 карты на выбор за 5 монет"],
    tadam: ["ТАДАМ!", "новое общее правило"],
  };
  const text = texts[cellEvents[cell]] || ["Обычная клетка", "без эффекта"];
  return `<span>${text[0]}</span><strong>${text[1]}</strong>`;
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

function isDoorOpen(id) {
  return state.doors[id].seals === 0;
}

function doorByCell(cell) {
  return state?.doors ? Object.values(state.doors).find((door) => door.cell === cell) : doorConfigs.find((door) => door.cell === cell);
}

function buildFieldCells() {
  const cells = new Set();
  addLineToSet(cells, 0, 0, 9, 0);
  addLineToSet(cells, 0, 1, 0, 9);
  addLineToSet(cells, 0, 9, 9, 9);
  addLineToSet(cells, 9, 1, 9, 7);
  addLineToSet(cells, 2, 1, 2, 7);
  addLineToSet(cells, 4, 2, 7, 2);
  addLineToSet(cells, 7, 3, 7, 8);
  addLineToSet(cells, 2, 5, 7, 5);
  addLineToSet(cells, 2, 7, 4, 7);
  addLineToSet(cells, 4, 6, 4, 7);
  addLineToSet(cells, 7, 7, 9, 7);
  cells.add(finishCell);
  return cells;
}

function buildRouteCells() {
  const cells = [];
  addLine(cells, 9, 9, 0, 9);
  addLine(cells, 0, 8, 0, 0);
  addLine(cells, 1, 0, 9, 0);
  addLine(cells, 9, 1, 9, 7);
  addLine(cells, 8, 7, 7, 7);
  addLine(cells, 7, 6, 7, 5);
  addLine(cells, 7, 4, 7, 2);
  addLine(cells, 6, 2, 4, 2);
  addLine(cells, 4, 3, 4, 3);
  return cells;
}

function buildRouteIndex(cells) {
  return new Map(cells.map((cell, index) => [cellKey(cell.col, cell.row), index + 1]));
}

function addLineToSet(cells, startCol, startRow, endCol, endRow) {
  const line = [];
  addLine(line, startCol, startRow, endCol, endRow);
  line.forEach((cell) => cells.add(cellKey(cell.col, cell.row)));
}

function addLine(cells, startCol, startRow, endCol, endRow) {
  const colStep = Math.sign(endCol - startCol);
  const rowStep = Math.sign(endRow - startRow);
  let col = startCol;
  let row = startRow;
  cells.push({ col, row });
  while (col !== endCol || row !== endRow) {
    col += colStep;
    row += rowStep;
    cells.push({ col, row });
  }
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

function playerCoinBonus(player) {
  return player.items
    .filter((item) => item.effect?.type === "passive-coin-bonus")
    .reduce((sum, item) => sum + item.effect.amount, 0);
}

function optionalExtraDieEffect(player) {
  return player.items.find((item) => item.effect?.type === "optional-extra-die")?.effect || null;
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

function chooseExtraDie(player, animate) {
  const effect = optionalExtraDieEffect(player);
  if (!animate || !effect || player.coins < effect.cost) return false;

  state.pendingPreRoll = { playerId: player.id };
  render();

  return new Promise((resolve) => {
    state.preRollResolver = (useExtraDie) => {
      state.pendingPreRoll = null;
      state.preRollResolver = null;
      if (useExtraDie) {
        addCoins(player, -effect.cost);
        log(`${player.name} платит <strong>${effect.cost} монеты</strong> за дополнительный кубик.`);
      }
      resolve(useExtraDie ? effect.dice : 0);
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
  ui.eventToast.classList.remove("fading", "visible");
  void ui.eventToast.offsetWidth;
  ui.eventToast.classList.add("visible");

  eventToastFadeTimer = window.setTimeout(() => {
    ui.eventToast.classList.add("fading");
  }, eventToastVisibleMs);

  eventToastHideTimer = window.setTimeout(() => {
    ui.eventToast.hidden = true;
    ui.eventToast.classList.remove("visible", "fading");
    ui.eventToast.innerHTML = "";
  }, eventToastVisibleMs + eventToastFadeMs);
}

async function animateDice(result) {
  ui.diceValue.classList.add("rolling");
  const startedAt = performance.now();
  while (performance.now() - startedAt < 520) {
    ui.diceValue.textContent = d6();
    await sleep(70);
  }
  ui.diceValue.textContent = result;
  ui.diceValue.classList.remove("rolling");
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

function formatRoll(rolls) {
  const total = rolls.reduce((sum, value) => sum + value, 0);
  return rolls.length === 1 ? String(total) : `${rolls.join(" + ")} = ${total}`;
}

ui.newGameBtn.addEventListener("click", newGame);
ui.rollBtn.addEventListener("click", () => rollAndMove());

newGame();
