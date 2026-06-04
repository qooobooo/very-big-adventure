const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT) || 5173;
const root = __dirname;
const rooms = new Map();
const closedRooms = new Map();
const roomCodeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const maxBodyBytes = 1024 * 1024;
const roomTtlMs = 1000 * 60 * 60 * 6;
const defaultRoomMode = "full";
const roomModes = new Set([defaultRoomMode, "big-button"]);

const types = {
  ".css": "text/css;charset=utf-8",
  ".html": "text/html;charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript;charset=utf-8",
  ".json": "application/json;charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json;charset=utf-8" });
  response.end(JSON.stringify(data));
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxBodyBytes) {
        reject(new Error("Body too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

function randomRoomCode() {
  let code = "";
  for (let index = 0; index < 4; index += 1) {
    code += roomCodeAlphabet[Math.floor(Math.random() * roomCodeAlphabet.length)];
  }
  return code;
}

function createRoomCode() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const code = randomRoomCode();
    if (!rooms.has(code) && !closedRooms.has(code)) return code;
  }
  return `${Date.now()}`.slice(-4);
}

function publicHost(request) {
  const forwarded = request.headers["x-forwarded-host"];
  return String(forwarded || request.headers.host || `localhost:${port}`);
}

function originForRequest(request) {
  return `http://${publicHost(request)}`;
}

function controllerUrl(request, code) {
  return `${originForRequest(request)}/controller.html?room=${encodeURIComponent(code)}`;
}

function getLanUrls(code = null) {
  const urls = [];
  for (const entries of Object.values(os.networkInterfaces())) {
    for (const entry of entries || []) {
      if (entry.family !== "IPv4" || entry.internal) continue;
      urls.push(`http://${entry.address}:${port}${code ? `/controller.html?room=${encodeURIComponent(code)}` : ""}`);
    }
  }
  return urls;
}

function serializeRoom(room, request = null) {
  return {
    code: room.code,
    controllers: [...room.controllers.values()],
    createdAt: room.createdAt,
    joinUrl: request ? controllerUrl(request, room.code) : `/controller.html?room=${encodeURIComponent(room.code)}`,
    lanUrls: getLanUrls(room.code),
    mode: normalizeRoomMode(room.mode),
    shakeEnabled: Boolean(room.shakeEnabled),
    snapshot: room.snapshot,
    updatedAt: room.updatedAt,
  };
}

function normalizeRoomMode(mode) {
  return roomModes.has(mode) ? mode : defaultRoomMode;
}

function sendSse(client, type, data) {
  const response = client.response || client;
  try {
    if (!response || response.destroyed || response.writableEnded) return false;
    response.write(`event: ${type}\n`);
    response.write(`data: ${JSON.stringify(data)}\n\n`);
    return true;
  } catch {
    return false;
  }
}

function broadcast(room, type, data) {
  for (const client of [...room.clients]) {
    if (!sendSse(client, type, data)) room.clients.delete(client);
  }
}

function broadcastRoom(room, request = null) {
  broadcast(room, "room", serializeRoom(room, request));
}

function cleanupRooms() {
  const now = Date.now();
  for (const [code, room] of rooms) {
    if (room.clients.size > 0) continue;
    if (now - room.updatedAt > roomTtlMs) rooms.delete(code);
  }
  for (const [code, closedAt] of closedRooms) {
    if (now - closedAt > roomTtlMs) closedRooms.delete(code);
  }
}

function closeRoom(room, { reason = "room-closed" } = {}) {
  if (!room || !rooms.has(room.code)) return;
  room.closed = true;
  room.updatedAt = Date.now();
  closedRooms.set(room.code, room.updatedAt);
  broadcast(room, "room-closed", {
    code: room.code,
    reason,
  });
  for (const client of [...room.clients]) {
    try {
      client.response.end();
    } catch {
      // Client cleanup is best-effort; failed writes are already pruned by broadcast.
    }
  }
  room.clients.clear();
  rooms.delete(room.code);
}

function createRoom(request, { mode = defaultRoomMode, shakeEnabled = false } = {}) {
  const code = createRoomCode();
  const room = {
    clients: new Set(),
    code,
    controllers: new Map(),
    createdAt: Date.now(),
    hostId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    mode: normalizeRoomMode(mode),
    shakeEnabled: Boolean(shakeEnabled),
    snapshot: null,
    updatedAt: Date.now(),
  };
  rooms.set(code, room);
  return room;
}

function roomFromPath(pathname) {
  const match = pathname.match(/^\/api\/rooms\/([^/]+)(?:\/([^/]+))?$/);
  if (!match) return null;
  const code = decodeURIComponent(match[1]).toUpperCase();
  return { code, action: match[2] || "" };
}

async function handleApi(request, response, url) {
  cleanupRooms();

  if (request.method === "POST" && url.pathname === "/api/rooms") {
    const body = await readJsonBody(request);
    const room = createRoom(request, { mode: body.mode, shakeEnabled: body.shakeEnabled });
    sendJson(response, 201, {
      hostId: room.hostId,
      room: serializeRoom(room, request),
    });
    return true;
  }

  const route = roomFromPath(url.pathname);
  if (!route) return false;

  const room = rooms.get(route.code);
  if (!room) {
    sendJson(response, closedRooms.has(route.code) ? 410 : 404, { error: closedRooms.has(route.code) ? "room-closed" : "room-not-found" });
    return true;
  }

  if (request.method === "GET" && route.action === "") {
    sendJson(response, 200, { room: serializeRoom(room, request) });
    return true;
  }

  if (request.method === "GET" && route.action === "events") {
    response.writeHead(200, {
      "Content-Type": "text/event-stream;charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    const client = {
      id: url.searchParams.get("clientId") || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      response,
      role: url.searchParams.get("role") || "controller",
    };
    let heartbeat = null;
    const closeClient = () => {
      if (heartbeat) clearInterval(heartbeat);
      room.clients.delete(client);
    };
    room.clients.add(client);
    sendSse(client, "room", serializeRoom(room, request));
    heartbeat = setInterval(() => {
      if (!sendSse(client, "ping", { now: Date.now() })) closeClient();
    }, 15000);
    request.on("close", closeClient);
    response.on("error", closeClient);
    return true;
  }

  if (request.method === "POST" && route.action === "snapshot") {
    const body = await readJsonBody(request);
    if (body.hostId !== room.hostId) {
      sendJson(response, 403, { error: "invalid-host" });
      return true;
    }
    room.snapshot = body.snapshot || null;
    room.updatedAt = Date.now();
    broadcast(room, "snapshot", { snapshot: room.snapshot });
    broadcastRoom(room, request);
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (request.method === "POST" && route.action === "close") {
    const body = await readJsonBody(request);
    if (body.hostId !== room.hostId) {
      sendJson(response, 403, { error: "invalid-host" });
      return true;
    }
    closeRoom(room, { reason: "host-recreated-room" });
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (request.method === "POST" && route.action === "claim") {
    const body = await readJsonBody(request);
    const clientId = String(body.clientId || "").trim();
    const playerId = Number(body.playerId);
    if (!clientId || !Number.isInteger(playerId)) {
      sendJson(response, 400, { error: "invalid-claim" });
      return true;
    }
    const players = room.snapshot?.players || [];
    const player = players.find((item) => item.id === playerId);
    if (!player) {
      sendJson(response, 404, { error: "player-not-found" });
      return true;
    }
    for (const [otherClientId, controller] of room.controllers) {
      if (otherClientId !== clientId && controller.playerId === playerId) {
        sendJson(response, 409, { error: "player-already-claimed" });
        return true;
      }
    }
    room.controllers.set(clientId, {
      clientId,
      claimedAt: Date.now(),
      lastSeenAt: Date.now(),
      playerId,
      playerName: player.name,
    });
    room.updatedAt = Date.now();
    broadcastRoom(room, request);
    sendJson(response, 200, { ok: true, room: serializeRoom(room, request) });
    return true;
  }

  if (request.method === "POST" && route.action === "action") {
    const body = await readJsonBody(request);
    const clientId = String(body.clientId || "").trim();
    const controller = room.controllers.get(clientId);
    if (!controller) {
      sendJson(response, 403, { error: "controller-not-claimed" });
      return true;
    }
    const playerId = Number(body.playerId);
    if (playerId !== controller.playerId) {
      sendJson(response, 403, { error: "wrong-player" });
      return true;
    }
    controller.lastSeenAt = Date.now();
    room.updatedAt = Date.now();
    broadcast(room, "controller-action", {
      action: body.action || {},
      clientId,
      playerId,
      sentAt: Date.now(),
    });
    broadcastRoom(room, request);
    sendJson(response, 202, { ok: true });
    return true;
  }

  sendJson(response, 404, { error: "not-found" });
  return true;
}

function serveStatic(request, response, url) {
  let file = path.join(root, decodeURIComponent(url.pathname));

  if (!file.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${publicHost(request)}`);
  handleApi(request, response, url)
    .then((handled) => {
      if (!handled) serveStatic(request, response, url);
    })
    .catch((error) => {
      sendJson(response, 500, { error: error.message || "server-error" });
    });
});

server.listen(port, host, () => {
  console.log(`Game is running: http://localhost:${port}`);
  console.log(`Host bind: http://${host}:${port}`);
  const lanUrls = getLanUrls();
  if (lanUrls.length > 0) {
    console.log("Phone controller LAN URLs:");
    for (const url of lanUrls) console.log(`- ${url}/controller.html`);
  }
});
