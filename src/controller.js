const clientStorageKey = "very-big-adventure.controller-id";
const roomStorageKey = "very-big-adventure.controller-room";
const playerStorageKey = "very-big-adventure.controller-player";
const defaultControllerMode = "full";
const controllerModes = new Set([defaultControllerMode, "big-button"]);
const bigChoiceActionKinds = new Set(["board-choice", "card-choice", "preroll", "prompt-choice", "shop"]);
const shakeThreshold = 14;
const shakeSettleMs = 420;

const ui = {
  actions: document.querySelector("#controllerActions"),
  claimPanel: document.querySelector("#claimPanel"),
  joinBtn: document.querySelector("#joinRoomBtn"),
  joinPanel: document.querySelector("#joinPanel"),
  playerCard: document.querySelector("#controllerPlayerCard"),
  playerClaimList: document.querySelector("#playerClaimList"),
  playerPanel: document.querySelector("#playerPanel"),
  roomCodeInput: document.querySelector("#roomCodeInput"),
  status: document.querySelector("#controllerStatus"),
};

const params = new URLSearchParams(window.location.search);
const initialRoomCode = cleanRoomCode(params.get("room") || window.localStorage.getItem(roomStorageKey) || "");
const controller = {
  clientId: loadClientId(),
  connectionError: "",
  eventSource: null,
  playerId: readStoredPlayerId(),
  reconnectTimer: null,
  room: null,
  roomCode: initialRoomCode,
  snapshot: null,
};
const shake = {
  actionKey: "",
  consumedActionKey: "",
  enabled: false,
  listenerAttached: false,
  permission: "unknown",
  rolling: false,
  settleTimer: null,
};

if (ui.roomCodeInput) ui.roomCodeInput.value = controller.roomCode;
if (controller.roomCode) void connectRoom(controller.roomCode);

ui.joinBtn?.addEventListener("click", () => {
  void connectRoom(ui.roomCodeInput?.value || "");
});

ui.roomCodeInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  void connectRoom(ui.roomCodeInput.value);
});

function loadClientId() {
  const existing = window.localStorage.getItem(clientStorageKey);
  if (existing) return existing;
  const next = `ctrl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  window.localStorage.setItem(clientStorageKey, next);
  return next;
}

function readStoredPlayerId() {
  const stored = window.localStorage.getItem(playerStorageKey);
  if (stored === null) return null;
  const value = Number(stored);
  return Number.isInteger(value) ? value : null;
}

function cleanRoomCode(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

window.addEventListener("pageshow", () => reconnectCurrentRoom({ immediate: true }));
window.addEventListener("focus", () => reconnectCurrentRoom());
window.addEventListener("online", () => reconnectCurrentRoom({ immediate: true }));
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) reconnectCurrentRoom({ immediate: true });
});
window.addEventListener("vba-controller-smoke-render", (event) => {
  if (!["localhost", "127.0.0.1"].includes(location.hostname)) return;
  controller.room = event.detail?.room || controller.room;
  controller.snapshot = event.detail?.snapshot || controller.snapshot;
  controller.connectionError = "";
  render();
});

function reconnectCurrentRoom({ immediate = false } = {}) {
  if (!controller.roomCode) return;
  window.clearTimeout(controller.reconnectTimer);
  controller.reconnectTimer = window.setTimeout(() => {
    void connectRoom(controller.roomCode, { reconnect: true, silent: true });
  }, immediate ? 0 : 700);
}

async function connectRoom(value, { reconnect = false, silent = false } = {}) {
  const code = cleanRoomCode(value);
  if (!code) {
    setStatus("Введи код комнаты.");
    return false;
  }

  controller.roomCode = code;
  window.localStorage.setItem(roomStorageKey, code);
  if (ui.roomCodeInput) ui.roomCodeInput.value = code;
  if (!silent) setStatus(`${reconnect ? "Восстанавливаю связь" : "Подключение"} к комнате ${code}...`);

  const roomResponse = await getJson(`/api/rooms/${encodeURIComponent(code)}`);
  if (!roomResponse.ok) {
    controller.connectionError = roomClosedError(roomResponse.error)
      ? "Комната закрыта на большом экране. Подключись по новой ссылке."
      : roomResponse.error === "room-not-found"
      ? "Комната не найдена. Проверь большой экран: возможно, комнату нужно создать заново."
      : "Нет связи с комнатой. Пробую восстановить подключение.";
    controller.eventSource?.close();
    controller.eventSource = null;
    if (roomClosedError(roomResponse.error)) {
      controller.room = null;
      controller.snapshot = null;
    }
    render();
    if (!["room-not-found", "room-closed"].includes(roomResponse.error)) reconnectCurrentRoom();
    return false;
  }

  controller.eventSource?.close();
  controller.room = roomResponse.room || controller.room;
  controller.snapshot = roomResponse.room?.snapshot || controller.snapshot;
  controller.connectionError = "";
  controller.eventSource = new EventSource(`/api/rooms/${encodeURIComponent(code)}/events?role=controller&clientId=${encodeURIComponent(controller.clientId)}`);
  controller.eventSource.addEventListener("room", (event) => {
    const data = parseEventData(event);
    controller.room = data;
    controller.snapshot = data.snapshot || controller.snapshot;
    controller.connectionError = "";
    render();
  });
  controller.eventSource.addEventListener("snapshot", (event) => {
    const data = parseEventData(event);
    controller.snapshot = data.snapshot || null;
    controller.connectionError = "";
    render();
  });
  controller.eventSource.addEventListener("room-closed", () => {
    controller.connectionError = "Комната закрыта на большом экране. Подключись по новой ссылке.";
    controller.eventSource?.close();
    controller.eventSource = null;
    controller.room = null;
    controller.snapshot = null;
    render();
  });
  controller.eventSource.onerror = () => {
    controller.connectionError = "Связь с комнатой потерялась. Восстанавливаю подключение...";
    render();
    reconnectCurrentRoom();
  };

  render();
  return true;
}

function parseEventData(event) {
  try {
    return JSON.parse(event.data || "{}");
  } catch {
    return {};
  }
}

async function claimPlayer(playerId) {
  const response = await postJson(`/api/rooms/${encodeURIComponent(controller.roomCode)}/claim`, {
    clientId: controller.clientId,
    playerId,
  });
  if (!response.ok) {
    if (roomClosedError(response.error)) {
      controller.connectionError = "Комната закрыта на большом экране. Подключись по новой ссылке.";
      controller.room = null;
      controller.snapshot = null;
      render();
    }
    setStatus(errorText(response.error) || "Не удалось занять игрока.");
    return;
  }
  controller.playerId = playerId;
  window.localStorage.setItem(playerStorageKey, String(playerId));
  controller.room = response.room || controller.room;
  render();
}

async function sendAction(action, { retry = true } = {}) {
  if (controller.playerId === null) return;
  if (controller.connectionError) {
    const reconnected = await connectRoom(controller.roomCode, { reconnect: true, silent: true });
    if (!reconnected) return;
  }
  setStatus("Отправляю действие...");
  const response = await postJson(`/api/rooms/${encodeURIComponent(controller.roomCode)}/action`, {
    action,
    clientId: controller.clientId,
    playerId: controller.playerId,
  });
  if (!response.ok && retry && ["network", "room-not-found"].includes(response.error)) {
    controller.connectionError = "Связь с комнатой потерялась. Восстанавливаю подключение...";
    render();
    const reconnected = await connectRoom(controller.roomCode, { reconnect: true, silent: true });
    if (reconnected) return sendAction(action, { retry: false });
  }
  if (!response.ok) {
    controller.connectionError = roomClosedError(response.error)
      ? "Комната закрыта на большом экране. Подключись по новой ссылке."
      : response.error === "room-not-found"
      ? "Комната не найдена. Проверь большой экран: возможно, комнату нужно создать заново."
      : "";
    if (roomClosedError(response.error)) {
      controller.room = null;
      controller.snapshot = null;
    }
    setStatus(errorText(response.error) || "Действие не принято.");
    render();
    return;
  }
  controller.connectionError = "";
  setStatus("Действие отправлено. Ждем большой экран.");
}

function sendControllerAction(action, player = null) {
  markShakeConsumed(action, player);
  void sendAction(actionPayload(action));
}

function roomClosedError(error) {
  return error === "room-closed";
}

async function getJson(url) {
  try {
    const response = await window.fetch(url, { method: "GET" });
    const data = await response.json().catch(() => ({}));
    return { ...data, ok: response.ok };
  } catch {
    return { ok: false, error: "network" };
  }
}

async function postJson(url, body) {
  try {
    const response = await window.fetch(url, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const data = await response.json().catch(() => ({}));
    return { ...data, ok: response.ok };
  } catch {
    return { ok: false, error: "network" };
  }
}

function render() {
  const snapshot = controller.snapshot;
  const room = controller.room;
  const connectionError = controller.connectionError;
  const players = snapshot?.players || [];
  const mode = controllerMode();
  const claimedIds = new Map((room?.controllers || []).map((item) => [item.playerId, item.clientId]));
  const ownClaim = (room?.controllers || []).find((item) => item.clientId === controller.clientId) || null;
  if (ownClaim) controller.playerId = ownClaim.playerId;
  const player = ownClaim ? players.find((item) => item.id === controller.playerId) || null : null;
  const activePlayer = players.find((item) => item.id === snapshot?.activePlayerId) || null;

  ui.joinPanel.hidden = Boolean(room);
  ui.claimPanel.hidden = !room || Boolean(player);
  ui.playerPanel.hidden = !player;
  ui.playerPanel?.classList.toggle("is-big-button", mode === "big-button");
  ui.playerPanel?.classList.toggle("is-full-controller", mode !== "big-button");
  document.body.dataset.controllerMode = mode;

  if (!room) {
    setControllerState("join");
    setStatus(connectionError || "Подключись к комнате на большом экране.");
    clearControllerPanels();
    syncShake(null, null);
    return;
  }

  if (!snapshot) {
    setControllerState("waiting");
    setStatus(`Комната ${room.code}. Ждем данные от большого экрана.`);
    renderClaimList(players, claimedIds);
    syncShake(null, null);
    return;
  }

  if (!player) {
    setControllerState("claim");
    setStatus(`Комната ${room.code}. Выбери своего игрока.`);
    renderClaimList(players, claimedIds);
    syncShake(null, null);
    return;
  }

  const actions = connectionError ? [] : snapshot.availableActions?.[player.id] || [];
  const activeText = player.isActive ? "Твой ход" : "Ждем ход";
  setControllerState(actions.length ? "active" : "waiting");
  setStatus(connectionError || `${room.code} - ${activeText}`);
  const shakeAction = shakeActionForPlayer(player, actions);
  const diceRoll = shouldShowPhoneDice() ? controllerDiceRollForPlayer(snapshot.diceRoll, player.id) : null;
  syncShake(player, shakeAction);
  if (mode === "big-button") {
    renderBigButtonPlayerCard(player, activeText);
    renderBigButtonAction(player, activePlayer, actions, shakeAction, diceRoll);
  } else {
    renderPlayerCard(player, activeText);
    renderActions(actions, { diceRoll, shakeAction });
  }
}

function clearControllerPanels() {
  if (ui.actions) ui.actions.innerHTML = "";
  if (ui.playerCard) ui.playerCard.innerHTML = "";
  if (ui.playerClaimList) ui.playerClaimList.innerHTML = "";
}

function controllerMode() {
  const value = controller.snapshot?.controllerMode || controller.room?.mode || defaultControllerMode;
  return controllerModes.has(value) ? value : defaultControllerMode;
}

function roomShakeEnabled() {
  return Boolean(controller.snapshot?.shakeEnabled ?? controller.room?.shakeEnabled);
}

function renderClaimList(players, claimedIds) {
  ui.playerClaimList.innerHTML = "";
  if (!players.length) {
    ui.playerClaimList.innerHTML = '<p class="controller-muted">Большой экран еще не прислал игроков.</p>';
    return;
  }

  for (const player of players) {
    const claimedBy = claimedIds.get(player.id);
    const isMine = claimedBy === controller.clientId;
    const button = document.createElement("button");
    button.className = "player-claim-button";
    button.type = "button";
    button.disabled = Boolean(claimedBy && !isMine);
    button.style.setProperty("--player-color", player.color || "#ffd470");
    button.innerHTML = `
      <span class="controller-avatar"><img src="${escapeAttribute(player.token)}" alt=""></span>
      <span class="claim-player-copy">
        <b>${escapeHtml(player.name)}</b>
        <small>${player.bot ? "бот" : claimedBy ? isMine ? "твой игрок" : "занят" : "свободен"}</small>
      </span>
    `;
    button.addEventListener("click", () => claimPlayer(player.id));
    ui.playerClaimList.append(button);
  }
}

function renderBigButtonPlayerCard(player, activeText) {
  const shopCards = controllerShopCardsMarkup(player.items);
  const artifacts = controllerArtifactsMarkup(player.artifacts);
  ui.playerCard.style.setProperty("--player-color", player.color || "#ffd470");
  ui.playerCard.innerHTML = `
    <div class="controller-big-card">
      <span class="controller-avatar"><img src="${escapeAttribute(player.token)}" alt=""></span>
      <div class="controller-big-identity">
        <strong>${escapeHtml(player.name)}</strong>
        <small>${escapeHtml(activeText)}</small>
      </div>
      <div class="controller-big-stats">
        <span><b>${player.coins}</b><small>монеты</small></span>
        <span><b>${player.totalDice}</b><small>кубики</small></span>
        <span><b>${signed(player.battleBonus)}</b><small>сила</small></span>
        <span><b>${signed(player.stepBonus)}</b><small>шаги</small></span>
      </div>
      <div class="controller-shop-cards controller-big-shop-cards"><small>Лавка Джо</small><div>${shopCards}</div></div>
      ${artifacts}
      ${controllerCardPreviewMarkup(controller.snapshot?.cardPreview, player.id)}
      ${player.nextMonsterBattleBonus ? `<div class="controller-rage controller-big-rage">Зелье ярости +${player.nextMonsterBattleBonus}</div>` : ""}
      ${controllerNextBattlePenaltyMarkup(player.nextBattlePenalty)}
    </div>
  `;
}

function renderPlayerCard(player, activeText) {
  const cards = controllerShopCardsMarkup(player.items);
  const artifacts = controllerArtifactsMarkup(player.artifacts);
  ui.playerCard.style.setProperty("--player-color", player.color || "#ffd470");
  ui.playerCard.innerHTML = `
    <div class="controller-turn-badge ${player.isActive ? "is-active" : "is-waiting"}">${escapeHtml(activeText)}</div>
    <div class="controller-player-head">
      <span class="controller-avatar large"><img src="${escapeAttribute(player.token)}" alt=""></span>
      <div>
        <strong>${escapeHtml(player.name)}</strong>
        <small>${player.isActive ? "Большой экран ждет твое действие" : "Следи за партией на большом экране"}</small>
      </div>
    </div>
    <div class="controller-stat-grid">
      <span class="controller-stat stat-coins"><b>${player.coins}</b><small>монеты</small></span>
      <span class="controller-stat stat-dice"><b>${player.totalDice}</b><small>кубики</small></span>
      <span class="controller-stat stat-steps"><b>${signed(player.stepBonus)}</b><small>шаги</small></span>
      <span class="controller-stat stat-strength"><b>${signed(player.battleBonus)}</b><small>сила</small></span>
    </div>
    ${player.nextMonsterBattleBonus ? `<div class="controller-rage">Зелье ярости +${player.nextMonsterBattleBonus}</div>` : ""}
    ${controllerNextBattlePenaltyMarkup(player.nextBattlePenalty)}
    ${artifacts}
    <div class="controller-shop-cards"><small>Лавка Джо</small><div>${cards}</div></div>
    ${controllerCardPreviewMarkup(controller.snapshot?.cardPreview, player.id)}
  `;
}

function controllerNextBattlePenaltyMarkup(status) {
  if (!status?.count) return "";
  const count = status.count > 1 ? ` x${status.count}` : "";
  return `<div class="controller-curse">Сглаз ${signed(status.penalty)}${count} к след. бою</div>`;
}

function controllerArtifactsMarkup(artifacts = []) {
  if (!Array.isArray(artifacts) || artifacts.length === 0) return "";
  return `
    <div class="controller-artifacts">
      <small>Артефакты</small>
      <div>
        ${artifacts.map((artifact) => `
          <span class="controller-artifact-chip" title="${escapeAttribute(`${artifact.title || "Артефакт"}: ${artifact.hint || ""}`)}">
            ${artifact.icon ? `<img src="${escapeAttribute(artifact.icon)}" alt="" aria-hidden="true">` : ""}
            <b>${escapeHtml(artifact.shortTitle || artifact.title || "Артефакт")}</b>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function controllerShopCardsMarkup(items = []) {
  if (!items.length) return '<span class="controller-shop-card empty-card">нет карт</span>';
  return items.map((item) => {
    const count = Math.max(1, Number(item.count) || 1);
    const label = item.shortTitle || item.title || "Карта";
    const countText = count > 1 ? ` x${count}` : "";
    const title = `${item.title || label}${countText}`;
    return `
      <span class="controller-shop-card" title="${escapeAttribute(title)}">
        ${escapeHtml(label)}${count > 1 ? `<b class="controller-shop-count">x${count}</b>` : ""}
      </span>
    `;
  }).join("");
}

function controllerCardPreviewMarkup(preview, playerId) {
  if (!preview || (preview.playerId !== null && preview.playerId !== playerId)) return "";
  const deckClass = controllerCardPreviewClass(preview.deck);
  const title = preview.revealed ? preview.title || "Карта" : `Карта ${preview.deck || ""}`.trim();
  const body = preview.revealed
    ? preview.description || preview.title || "Карта открыта."
    : `Нажми «Открыть», чтобы увидеть текст карты.`;
  return `
    <article class="controller-card-preview controller-card-preview-${deckClass} ${preview.revealed ? "is-revealed" : "is-hidden"}">
      <span>${escapeHtml(preview.deck || "Карта")}</span>
      <strong>${escapeHtml(title || "Карта")}</strong>
      <p>${escapeHtml(body)}</p>
    </article>
  `;
}

function controllerCardPreviewClass(deck) {
  const normalized = String(deck || "").trim().toLocaleLowerCase("ru");
  if (normalized.includes("хорош")) return "good";
  if (normalized.includes("плох")) return "bad";
  if (normalized.includes("тадам")) return "tadam";
  if (normalized.includes("событ")) return "event";
  if (normalized.includes("лавк")) return "shop";
  return "card";
}

function controllerDiceRollForPlayer(roll, playerId) {
  if (!roll) return null;
  if (roll.playerId !== null && roll.playerId !== playerId) return null;
  return roll;
}

function shouldShowPhoneDice() {
  const snapshot = controller.snapshot || {};
  const room = controller.room || {};
  if ("diceVisible" in snapshot) return snapshot.diceVisible !== false;
  if ("displayDice" in snapshot) return Boolean(snapshot.displayDice);
  if ("showDice" in snapshot) return Boolean(snapshot.showDice);
  if ("phoneDisplayDice" in snapshot) return Boolean(snapshot.phoneDisplayDice);
  if ("phoneDiceVisible" in snapshot) return Boolean(snapshot.phoneDiceVisible);
  if ("diceVisible" in room) return room.diceVisible !== false;
  return true;
}

function createPhoneDiceRollStage(roll, { big = false, full = false } = {}) {
  const stage = document.createElement("section");
  stage.className = [
    "controller-dice-roll-stage",
    big ? "is-big" : "",
    full ? "is-full" : "",
    roll.rolling ? "is-rolling" : "is-result",
  ].filter(Boolean).join(" ");

  const count = Math.max(1, Number(roll.count) || (Array.isArray(roll.rolls) ? roll.rolls.length : 0) || 1);
  const title = roll.rolling ? "Кубики крутятся" : "Результат броска";
  const note = roll.rolling
    ? `Большой экран бросает ${count} ${diceCountLabel(count)}.`
    : diceRollResultText(roll);
  stage.innerHTML = `
    <div class="controller-dice-roll-faces" aria-hidden="true">
      ${diceRollFacesMarkup(roll)}
    </div>
    <div class="controller-dice-roll-copy">
      ${roll.label ? `<span>${escapeHtml(roll.label)}</span>` : ""}
      <b>${escapeHtml(title)}</b>
      <small>${escapeHtml(note)}</small>
    </div>
  `;
  return stage;
}

function diceRollFacesMarkup(roll) {
  const count = Math.max(1, Number(roll.count) || (Array.isArray(roll.rolls) ? roll.rolls.length : 0) || 1);
  const values = Array.isArray(roll.rolls) && roll.rolls.length
    ? roll.rolls
    : Array.from({ length: count }, () => null);
  return values.slice(0, 8).map((value, index) => `
    <span class="field-die controller-field-die" aria-label="${value ? `Кубик ${value}` : "Кубик крутится"}" style="${phoneDieStyle(value, index, values.length)}">
      ${diceCubeMarkup(value || ((index % 6) + 1))}
    </span>
  `).join("");
}

function phoneDieStyle(value, index, count) {
  const dieSize = count > 4 ? 54 : 64;
  const depth = dieSize / 2;
  const finalRotation = diceCubeRotations[Math.max(1, Math.min(6, Number(value) || ((index % 6) + 1)))] || diceCubeRotations[1];
  const spinX = rotationDegrees(finalRotation.x) + 360 * (6 + (index % 2));
  const spinY = rotationDegrees(finalRotation.y) + 360 * (6 + ((index + 1) % 2));
  const spinZ = rotationDegrees(finalRotation.z) + 360 * (4 + (index % 2));
  return [
    `--die-index: ${index}`,
    `--die-size: clamp(48px, 17vw, ${dieSize}px)`,
    `--die-depth: clamp(24px, 8.5vw, ${depth}px)`,
    `--final-x: ${finalRotation.x}`,
    `--final-y: ${finalRotation.y}`,
    `--final-z: ${finalRotation.z}`,
    `--spin-x: ${spinX}deg`,
    `--spin-y: ${spinY}deg`,
    `--spin-z: ${spinZ}deg`,
  ].join("; ");
}

function diceCubeMarkup(value) {
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
    <span class="die-cube" data-value="${Math.max(1, Math.min(6, Number(value) || 1))}">
      ${faces.map(([side, faceValue]) => `<span class="die-face die-face-${side}">${diceFaceDots(faceValue)}</span>`).join("")}
    </span>
  `;
}

function diceFaceDots(value) {
  return Array.from({ length: 9 }, (_, index) => diceDotMap[value]?.includes(index + 1) ? '<i aria-hidden="true"></i>' : "<b></b>").join("");
}

function diceRollResultText(roll) {
  if (!Array.isArray(roll.rolls) || !roll.rolls.length) return "Бросок завершен.";
  const rolled = roll.rolls.reduce((sum, value) => sum + Number(value || 0), 0);
  const bonus = Number(roll.bonus || 0);
  if (bonus) return `${roll.rolls.join(" + ")} ${bonus > 0 ? "+" : "-"} ${Math.abs(bonus)} = ${roll.total ?? rolled + bonus}`;
  return roll.rolls.length > 1 ? `${roll.rolls.join(" + ")} = ${roll.total ?? rolled}` : `${roll.total ?? rolled}`;
}

function rotationDegrees(value) {
  return Number.parseFloat(value) || 0;
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

function diceCountLabel(count) {
  const value = Math.abs(Number(count) || 0) % 100;
  const tail = value % 10;
  if (value > 10 && value < 20) return "кубиков";
  if (tail === 1) return "кубик";
  if (tail >= 2 && tail <= 4) return "кубика";
  return "кубиков";
}

function renderActions(actions, { diceRoll = null, shakeAction = null } = {}) {
  ui.actions.innerHTML = "";
  if (diceRoll) {
    ui.actions.append(createPhoneDiceRollStage(diceRoll, { full: true }));
    return;
  }
  if (shakeAction) {
    ui.actions.append(createShakeStage(shakeAction, { compact: true }));
  }
  if (!actions.length) {
    ui.actions.innerHTML = `
      <div class="controller-wait-card">
        <span class="controller-wait-sigil" aria-hidden="true"></span>
        <p class="controller-muted">Ждем ход или решение на большом экране.</p>
      </div>
    `;
    return;
  }

  const hasSinglePrimaryAction = actions.length === 1 && isFullControllerPrimaryAction(actions[0]);
  for (const action of actions) {
    const button = document.createElement("button");
    button.className = [
      "controller-action",
      `controller-action-${escapeClassName(action.kind || action.type || "default")}`,
      hasSinglePrimaryAction ? "is-full-primary" : "",
      hasSinglePrimaryAction ? bigButtonToneClass(action) : "",
    ].filter(Boolean).join(" ");
    button.type = "button";
    button.innerHTML = `
      <b>${escapeHtml(action.label || "Действие")}</b>
      ${action.note ? `<small>${escapeHtml(action.note)}</small>` : ""}
    `;
    button.addEventListener("click", () => {
      const snapshot = controller.snapshot;
      const player = snapshot?.players?.find((item) => item.id === controller.playerId) || null;
      sendControllerAction(action, player);
    });
    ui.actions.append(button);
  }
}

function renderBigButtonAction(player, activePlayer, actions, shakeAction, diceRoll = null) {
  ui.actions.innerHTML = "";
  if (diceRoll) {
    ui.actions.append(createPhoneDiceRollStage(diceRoll, { big: true }));
    return;
  }
  const model = bigButtonActionModel(actions);

  if (model.type === "rest") {
    renderBigRestChoice(player, model);
    return;
  }

  if (model.type === "detail-list") {
    renderBigDetailChoice(player, model);
    return;
  }

  if (model.type === "split") {
    renderBigSplitChoice(player, model);
    return;
  }

  const stage = createShakeStage(model.primary, { big: true, disabled: !model.primary });
  const button = stage.querySelector(".controller-big-button");
  if (model.cancel) stage.prepend(createBigCancelButton(model.cancel, player));
  if (button && model.primary) {
    button.addEventListener("click", () => sendControllerAction(model.primary, player));
  }

  if (!model.primary) {
    const hasMeaningfulChoice = actions.length > 0;
    const activeName = activePlayer?.name || "другого игрока";
    const label = hasMeaningfulChoice ? "Выбор на большом экране" : player.isActive ? "Ждите решения" : "Ждите хода";
    const note = hasMeaningfulChoice
      ? "Телефон не показывает варианты в этом режиме."
      : player.isActive
      ? "Большой экран готовит следующее действие."
      : `Сейчас ходит ${activeName}.`;
    button.innerHTML = `<b>${escapeHtml(label)}</b><small>${escapeHtml(note)}</small>`;
    button.disabled = true;
  }

  ui.actions.append(stage);
}

function renderBigSplitChoice(player, model) {
  const wrapper = document.createElement("div");
  wrapper.className = "controller-big-choice-stage";
  if (model.cancel) wrapper.append(createBigCancelButton(model.cancel, player));

  const zones = document.createElement("div");
  zones.className = "controller-choice-zones";
  for (const [index, action] of model.options.entries()) {
    const button = document.createElement("button");
    button.className = `controller-choice-zone ${index === 0 ? "is-left" : "is-right"}`;
    button.type = "button";
    const badge = bigZoneBadge(action, index);
    button.innerHTML = `
      ${badge ? `<span>${escapeHtml(badge)}</span>` : ""}
      <b>${escapeHtml(bigZoneLabel(action, index))}</b>
      ${bigZoneNote(action) ? `<small>${escapeHtml(bigZoneNote(action))}</small>` : ""}
    `;
    button.addEventListener("click", () => sendControllerAction(action, player));
    zones.append(button);
  }
  wrapper.append(zones);
  ui.actions.append(wrapper);
}

function renderBigDetailChoice(player, model) {
  const wrapper = document.createElement("div");
  wrapper.className = "controller-big-detail-stage";

  const context = bigChoiceContext(model.options);
  if (context.kicker || context.title || context.summary) {
    const copy = document.createElement("div");
    copy.className = "controller-detail-copy";
    copy.innerHTML = `
      ${context.kicker ? `<span>${escapeHtml(context.kicker)}</span>` : ""}
      ${context.title ? `<b>${escapeHtml(context.title)}</b>` : ""}
      ${context.summary ? `<small>${escapeHtml(context.summary)}</small>` : ""}
    `;
    wrapper.append(copy);
  }

  const list = document.createElement("div");
  list.className = "controller-detail-list";
  for (const action of model.options) {
    const button = document.createElement("button");
    button.className = "controller-detail-choice";
    button.type = "button";
    button.innerHTML = `
      <b>${escapeHtml(action.label || "Выбрать")}</b>
      ${detailOwnerMarkup(action)}
    `;
    button.addEventListener("click", () => sendControllerAction(action, player));
    list.append(button);
  }
  wrapper.append(list);

  if (model.cancel) wrapper.append(createBigCancelButton(model.cancel, player));
  ui.actions.append(wrapper);
}

function renderBigRestChoice(player, model) {
  const wrapper = document.createElement("div");
  wrapper.className = "controller-big-rest-stage";

  for (const action of model.options) {
    const button = document.createElement("button");
    button.className = `controller-rest-choice controller-rest-choice-${escapeClassName(action.id)}`;
    button.type = "button";
    button.innerHTML = `
      <b>${escapeHtml(restChoiceLabel(action))}</b>
      ${action.note ? `<small>${escapeHtml(action.note)}</small>` : ""}
    `;
    button.addEventListener("click", () => sendControllerAction(action, player));
    wrapper.append(button);
  }

  ui.actions.append(wrapper);
}

function createBigCancelButton(action, player) {
  const button = document.createElement("button");
  button.className = "controller-big-cancel";
  button.type = "button";
  button.innerHTML = `
    <b>${escapeHtml(action.label || "Пропустить")}</b>
    ${action.note ? `<small>${escapeHtml(action.note)}</small>` : ""}
  `;
  button.addEventListener("click", () => sendControllerAction(action, player));
  return button;
}

function bigZoneBadge(action, index) {
  return isShopLikeBigChoice(action) ? "" : index === 0 ? "Лево" : "Право";
}

function bigZoneLabel(action, index) {
  return isShopLikeBigChoice(action) ? (index === 0 ? "Левая карта" : "Правая карта") : action.label || "Выбрать";
}

function bigZoneNote(action) {
  return isShopLikeBigChoice(action) ? "" : action.note || "";
}

function isShopLikeBigChoice(action) {
  const kind = actionKind(action);
  const displayKind = String(action?.displayKind || "");
  const note = String(action?.note || "").trim().toLocaleLowerCase("ru");
  return (
    kind === "shop" ||
    displayKind === "shop-card" ||
    (kind === "prompt-choice" && ["выбрать карту", "купить карту"].includes(note))
  );
}

function isDetailedBigChoice(action) {
  return String(action?.displayKind || "") === "shop-card-owner";
}

function bigChoiceContext(actions) {
  const action = actions.find((item) => item.contextKicker || item.contextTitle || item.contextSummary) || {};
  return {
    kicker: action.contextKicker || "",
    summary: action.contextSummary || "",
    title: action.contextTitle || "",
  };
}

function detailOwnerMarkup(action) {
  const ownerName = action.ownerName || (action.noteClass === "choice-player-note" ? action.note : "");
  if (!ownerName) {
    return action.note ? `<small>${escapeHtml(action.note)}</small>` : "";
  }
  const ownerColor = action.ownerColor || "#d8b15d";
  const ownerToken = action.ownerToken || "";
  return `
    <span class="controller-detail-owner" style="--player-color: ${escapeAttribute(ownerColor)}">
      ${ownerToken ? `<img src="${escapeAttribute(ownerToken)}" alt="" aria-hidden="true">` : ""}
      <span>${escapeHtml(ownerName)}</span>
    </span>
  `;
}

function isRestChoiceSet(actions) {
  const ids = new Set(actions.map((action) => String(action.id)));
  return actions.length === 3 && ["recover", "train", "speed"].every((id) => ids.has(id));
}

function orderRestChoices(actions) {
  const byId = new Map(actions.map((action) => [String(action.id), action]));
  return ["recover", "train", "speed"].map((id) => byId.get(id)).filter(Boolean);
}

function restChoiceLabel(action) {
  const labels = {
    recover: "Восстановиться",
    speed: "Ускориться",
    train: "Потренироваться",
  };
  return labels[action.id] || action.label || "Выбрать";
}

function bigButtonActionModel(actions) {
  if (actions.length === 1) {
    return { cancel: null, options: [], primary: bigPrimaryAction(actions[0]), type: "primary" };
  }

  if (isRestChoiceSet(actions)) {
    return { cancel: null, options: orderRestChoices(actions), primary: null, type: "rest" };
  }

  if (actions.some(isDetailedBigChoice) && actions.every((action) => isDetailedBigChoice(action) || isCancelStyleAction(action))) {
    const cancelActions = actions.filter(isCancelStyleAction);
    const detailedActions = actions.filter(isDetailedBigChoice);
    return { cancel: cancelActions[0] || null, options: detailedActions, primary: null, type: "detail-list" };
  }

  if (actions.length >= 3) {
    const cancelActions = actions.filter(isCancelStyleAction);
    const meaningfulActions = actions.filter((action) => isBigChoiceAction(action) && !cancelActions.includes(action));
    if (meaningfulActions.length === 2 && cancelActions.length >= 1) {
      return { cancel: cancelActions[0], options: meaningfulActions, primary: null, type: "split" };
    }
  }

  const choiceActions = actions.filter(isBigChoiceAction);
  if (actions.length !== choiceActions.length) {
    return { cancel: null, options: [], primary: null, type: "fallback" };
  }

  if (choiceActions.length === 2) {
    return { cancel: null, options: choiceActions, primary: null, type: "split" };
  }

  const cancelActions = choiceActions.filter(isCancelStyleAction);
  const meaningfulActions = choiceActions.filter((action) => !isCancelStyleAction(action));

  if (meaningfulActions.length === 2 && cancelActions.length === 0) {
    return { cancel: null, options: meaningfulActions, primary: null, type: "split" };
  }

  if (meaningfulActions.length === 2 && cancelActions.length >= 1) {
    return { cancel: cancelActions[0], options: meaningfulActions, primary: null, type: "split" };
  }

  if (meaningfulActions.length === 1 && cancelActions.length >= 1) {
    return { cancel: cancelActions[0], options: [], primary: meaningfulActions[0], type: "primary" };
  }

  return { cancel: null, options: [], primary: null, type: "fallback" };
}

function bigPrimaryAction(action) {
  const kind = action.kind || action.type || "";
  return kind === "roll" ? action : null;
}

function isBigChoiceAction(action) {
  return bigChoiceActionKinds.has(actionKind(action));
}

function isCancelStyleAction(action) {
  const id = String(action?.id || "").toLocaleLowerCase("ru");
  const label = String(action?.label || "").trim().toLocaleLowerCase("ru");
  if (id === "no" || label === "нет") return true;
  const text = `${action?.id || ""} ${action?.label || ""} ${action?.note || ""}`.toLocaleLowerCase("ru");
  return [
    "cancel",
    "decline",
    "skip",
    "отмена",
    "отказ",
    "отказаться",
    "откаж",
    "пропустить",
    "не покупать",
    "не платить",
    "уйти",
    "0 монет",
  ].some((marker) => text.includes(marker));
}

function shakeActionForPlayer(player, actions) {
  if (!roomShakeEnabled() || !player?.isActive || controller.connectionError) return null;
  const action = actions.find(isSafeShakeRollAction);
  if (!action) return null;
  const actionKey = shakeActionKey(player, action);
  return actionKey === shake.consumedActionKey ? null : action;
}

function isSafeShakeRollAction(action) {
  const kind = String(action?.kind || action?.type || "");
  const id = String(action?.id || "");
  const label = String(action?.label || "").trim();
  return kind === "roll" && id === "roll" && label.toLocaleLowerCase("ru").startsWith("бросить");
}

function createShakeStage(action, { big = false, compact = false, disabled = false } = {}) {
  const stage = document.createElement("div");
  stage.className = [
    "controller-shake-stage",
    big ? "is-big" : "",
    compact ? "is-compact" : "",
    shake.rolling ? "is-rolling" : "",
  ].filter(Boolean).join(" ");

  const canShake = Boolean(action && roomShakeEnabled() && isSafeShakeRollAction(action));
  const permissionNeeded = canShake && motionPermissionNeeded() && !["granted", "denied"].includes(shake.permission);
  const permissionDenied = canShake && shake.permission === "denied";
  const sensorUnavailable = canShake && !motionSupported();
  const secureContextMissing = canShake && !isMotionSecureContext();

  if (big) {
    const button = document.createElement("button");
    button.className = `controller-big-button ${bigButtonToneClass(action)}`;
    button.type = "button";
    button.disabled = disabled;
    button.innerHTML = action
      ? `<b>${escapeHtml(action.label || "Бросить")}</b><small>${shakeHintText({ canShake, permissionNeeded, permissionDenied, secureContextMissing, sensorUnavailable })}</small>`
      : "<b>Ждите хода</b><small>Большой экран подскажет действие.</small>";
    stage.append(button);
  } else if (canShake || permissionDenied || sensorUnavailable) {
    stage.innerHTML = `
      <div class="controller-shake-dice" aria-hidden="true"><span>⚂</span><span>⚄</span></div>
      <div>
        <b>${shake.rolling ? "Кубики крутятся" : "Можно трясти телефон"}</b>
        <small>${shakeHintText({ canShake, permissionNeeded, permissionDenied, secureContextMissing, sensorUnavailable })}</small>
      </div>
    `;
  }

  if (permissionNeeded) {
    const permissionButton = document.createElement("button");
    permissionButton.className = "controller-shake-permission";
    permissionButton.type = "button";
    permissionButton.textContent = "Разрешить шейк";
    permissionButton.addEventListener("click", requestMotionPermission);
    stage.append(permissionButton);
  }

  return stage;
}

function bigButtonToneClass(action) {
  if (!action) return "is-idle";
  return isRollLikeAction(action) ? "is-roll" : "is-action";
}

function isRollLikeAction(action) {
  const kind = String(action?.kind || action?.type || "");
  const id = String(action?.id || "");
  const label = String(action?.label || "").trim().toLocaleLowerCase("ru");
  return kind === "roll" || id === "roll" || label.startsWith("бросить");
}

function isFullControllerPrimaryAction(action) {
  const kind = String(action?.kind || action?.type || "").toLocaleLowerCase("ru");
  const id = String(action?.id || "").toLocaleLowerCase("ru");
  const label = String(action?.label || "").trim().toLocaleLowerCase("ru");
  return (
    isRollLikeAction(action) ||
    kind === "continue" ||
    id === "continue" ||
    id === "next" ||
    label === "далее" ||
    label.startsWith("далее ")
  );
}

function shakeHintText({ canShake, permissionNeeded, permissionDenied, secureContextMissing, sensorUnavailable }) {
  if (!canShake) return "Нажми, когда будешь готов.";
  if (secureContextMissing) return "На этом адресе шейк может требовать HTTPS, кнопка работает.";
  if (sensorUnavailable) return "Сенсор недоступен, кнопка работает.";
  if (permissionDenied) return "Шейк запрещен, кнопка работает.";
  if (permissionNeeded) return "Разреши датчик движения или нажми кнопку.";
  return shake.rolling ? "Остановись, и бросок отправится." : "Тряси телефон для броска или нажми кнопку.";
}

function actionPayload(action) {
  return { id: action.id, kind: actionKind(action) || "action" };
}

function actionKind(action) {
  return String(action?.kind || action?.type || "");
}

function markShakeConsumed(action, player) {
  if (!player || !isSafeShakeRollAction(action)) return;
  const key = shakeActionKey(player, action);
  if (key === shake.actionKey) shake.consumedActionKey = key;
}

function syncShake(player, action) {
  const enabled = Boolean(action && roomShakeEnabled() && isSafeShakeRollAction(action) && player?.isActive && !controller.connectionError);
  shake.enabled = enabled;
  shake.actionKey = enabled ? shakeActionKey(player, action) : "";
  if (!enabled) {
    if (!action || action.id !== "roll") shake.consumedActionKey = "";
    stopShakeRolling();
    return;
  }
  if (shake.actionKey !== shake.consumedActionKey && motionSupported() && !motionPermissionNeeded()) {
    attachMotionListener();
  }
}

function shakeActionKey(player, action) {
  return `${controller.roomCode}:${player?.id}:${controller.snapshot?.round}:${player?.position || ""}:${action.kind || action.type}:${action.id}:${action.label || ""}`;
}

function motionSupported() {
  return typeof window.DeviceMotionEvent !== "undefined";
}

function isMotionSecureContext() {
  return window.isSecureContext || location.hostname === "localhost" || location.hostname === "127.0.0.1";
}

function motionPermissionNeeded() {
  return motionSupported() && typeof window.DeviceMotionEvent.requestPermission === "function";
}

async function requestMotionPermission() {
  if (!motionPermissionNeeded()) {
    shake.permission = motionSupported() ? "granted" : "denied";
    if (shake.permission === "granted") attachMotionListener();
    render();
    return;
  }
  try {
    const result = await window.DeviceMotionEvent.requestPermission();
    shake.permission = result === "granted" ? "granted" : "denied";
    if (shake.permission === "granted") attachMotionListener();
  } catch {
    shake.permission = "denied";
  }
  render();
}

function attachMotionListener() {
  if (shake.listenerAttached || !motionSupported()) return;
  window.addEventListener("devicemotion", handleMotionEvent);
  shake.listenerAttached = true;
}

function handleMotionEvent(event) {
  if (!shake.enabled || !shake.actionKey || shake.actionKey === shake.consumedActionKey) return;
  const amount = motionAmount(event);
  if (amount >= shakeThreshold) {
    startShakeRolling();
    window.clearTimeout(shake.settleTimer);
    shake.settleTimer = window.setTimeout(finishShakeRoll, shakeSettleMs);
  }
}

function motionAmount(event) {
  const acceleration = event.accelerationIncludingGravity || event.acceleration || {};
  const accelerationAmount = Math.hypot(Number(acceleration.x) || 0, Number(acceleration.y) || 0, Number(acceleration.z) || 0);
  const rotation = event.rotationRate || {};
  const rotationAmount = Math.hypot(Number(rotation.alpha) || 0, Number(rotation.beta) || 0, Number(rotation.gamma) || 0) / 12;
  return Math.max(accelerationAmount, rotationAmount);
}

function startShakeRolling() {
  if (shake.rolling) return;
  shake.rolling = true;
  updateShakeStage();
}

function stopShakeRolling() {
  window.clearTimeout(shake.settleTimer);
  shake.settleTimer = null;
  if (!shake.rolling) return;
  shake.rolling = false;
  updateShakeStage();
}

function finishShakeRoll() {
  const snapshot = controller.snapshot;
  const player = snapshot?.players?.find((item) => item.id === controller.playerId) || null;
  const action = player ? shakeActionForPlayer(player, snapshot.availableActions?.[player.id] || []) : null;
  if (!action || shake.actionKey === shake.consumedActionKey) {
    stopShakeRolling();
    return;
  }
  shake.consumedActionKey = shake.actionKey;
  stopShakeRolling();
  void sendAction(actionPayload(action));
}

function updateShakeStage() {
  for (const stage of document.querySelectorAll(".controller-shake-stage")) {
    stage.classList.toggle("is-rolling", shake.rolling);
    const title = stage.querySelector("b");
    if (title && stage.classList.contains("is-compact")) {
      title.textContent = shake.rolling ? "Кубики крутятся" : "Можно трясти телефон";
    }
    const hint = stage.querySelector("small");
    if (hint && roomShakeEnabled()) {
      hint.textContent = shake.rolling
        ? "Остановись, и бросок отправится."
        : shakeHintText({
          canShake: shake.enabled,
          permissionDenied: shake.permission === "denied",
          permissionNeeded: motionPermissionNeeded() && !["granted", "denied"].includes(shake.permission),
          secureContextMissing: shake.enabled && !isMotionSecureContext(),
          sensorUnavailable: shake.enabled && !motionSupported(),
        });
    }
  }
}

function setControllerState(state) {
  document.body.dataset.controllerState = state;
}

function setStatus(text) {
  if (ui.status) ui.status.textContent = text;
}

function signed(value) {
  const amount = Number(value) || 0;
  return amount >= 0 ? `+${amount}` : String(amount);
}

function errorText(error) {
  const labels = {
    "controller-not-claimed": "Сначала выбери игрока.",
    "invalid-claim": "Не удалось выбрать игрока.",
    "network": "Нет связи с сервером.",
    "player-already-claimed": "Этот игрок уже занят другим телефоном.",
    "player-not-found": "Такого игрока нет в комнате.",
    "room-closed": "Комната закрыта. Подключись по новой ссылке.",
    "room-not-found": "Комната не найдена.",
    "wrong-player": "Этот телефон привязан к другому игроку.",
  };
  return labels[error] || "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function escapeClassName(value) {
  return String(value || "default").replace(/[^a-z0-9_-]/gi, "-").toLowerCase();
}
