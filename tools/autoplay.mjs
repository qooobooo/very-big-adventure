#!/usr/bin/env node
// Headless bot games for balance checks (tabletop review, 12 Oct 2026): the game's own autoplay (the «Авто» buttons)
// in headless Chrome against this worktree, plus per-turn and per-battle statistics the snapshots lack.
// Its own static server on a free port (never the user's :5173): /api/* is answered here and never forwarded, game.js is
// served with googleSheetsSaveUrl pointed nowhere and Chrome blocks Google hosts, so runs never write the user's tables.
// Temporary profile, no window, no sound, Chrome at low priority.
//
//   node tools/autoplay.mjs [--players 2,3,4] [--games 20] [--out Logs/autoplay/{run}] [--seed 7]
//        [--set "<js run on the page before the start>"] [--variant <module.mjs>] [--timeout 1200]
//   node tools/autoplay.mjs report Logs/autoplay/<run>/p3.json [...]
//
// Player counts run side by side, one Chrome each; 20 games take ~3 min at 2 players and ~8 min at 4.
// Writes p<N>.json (turns, battles, end snapshots) and summary.txt into --out, prints one line per player count and a
// last line PASS … / FAIL … (FAIL: aborted games, page errors, hook errors after a game.js change, timeout).
// --seed replaces Math.random with a seeded generator, restarted for every game: the same code and seed replay the same
// games (rarely one drifts on timing inside a game).
// --variant tries a rule without touching the code: a module whose default export maps served paths to source transforms,
//   export default { 'src/game.js': (src) => src.replace('…', '…') }
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { summarize } from './autoplay-report.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BLOCKED = ['*google*', '*/api/game-history*']
const TYPES = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg' }

function parse(argv) {
  const out = { players: '2,3,4', games: 20, timeout: 1200 }
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) { (out._ ||= []).push(argv[i]); continue }
    out[argv[i].slice(2)] = argv[++i]
  }
  return out
}

// Statistics hooks, spliced into the served copy of game.js. An anchor gone after a game.js change stops the run with
// its name; a renamed local inside a hook only counts a hook error, which also makes the run FAIL.
const HOOKS = [
  ['turn start', '  recordTurnStarted(player);\n\n  try {',
    '  recordTurnStarted(player);\n  const __logStart = gameLogEntries.length; window.__vbaCoinOpsTurn = 0;\n\n  try {'],
  ['before the walk', '    let shouldResolveLanding = totalSteps > 0;\n',
    '    let shouldResolveLanding = totalSteps > 0;\n    const __cellsBefore = playerHistory(player)?.cellsPassed || 0;\n'],
  ['after the landing', '    if (shouldResolveLanding) await resolveLanding(player, landingContext);\n\n    completeMovementTurn(player);',
    `    const __walked = (playerHistory(player)?.cellsPassed || 0) - __cellsBefore; const __land = tileType(player.position);
    if (shouldResolveLanding) await resolveLanding(player, landingContext);
    try {
      (window.__vbaTurns ||= []).push({
        run: state.autoRun?.runIndex ?? 0, round: state.round, pid: player.id,
        dice: rolls.length, rolled, bonus, dup: duplicateSteps, post: postRollSteps, total: totalSteps, walked: __walked, land: __land,
        logs: gameLogEntries.length - __logStart, coinOps: window.__vbaCoinOpsTurn || 0,
        players: state.players.map((p) => ({ id: p.id, coins: p.coins, items: (p.items || []).length, arts: playerArtifacts(p).length,
          held: (p.eventCards || []).length + (p.nextBattlePenaltyCards || []).length + (p.nextBadExtraDrawCards || []).length,
          step: playerStepBonus(p), str: playerCombatBonus(p), diceN: totalDiceForPlayer(p) })),
        tadams: (state.tadams || []).length, rage: monsterRageBonus(),
      });
    } catch (error) { window.__vbaHookErrors = (window.__vbaHookErrors || 0) + 1 }

    completeMovementTurn(player);`],
  ['monster battle', '  const damage = Math.max(0, rolled + bonus);\n  recordMonsterBattle(player, door, damage, damage >= requiredStrength, {',
    `  const damage = Math.max(0, rolled + bonus);
  try {
    const terms = [baseBonus, strengthBonus, shopStrengthBonus, rageBonus, curse.penalty, badPenalty, heroSwordBonus].filter((v) => Number(v)).length;
    (window.__vbaBattles ||= []).push({ run: state.autoRun?.runIndex ?? 0, round: state.round, pid: player.id,
      door: door.label, required: requiredStrength, rage: monsterRageBonus(), dice: rolls.length, rolled, bonus, terms, damage,
      won: damage >= requiredStrength, final: Boolean(door.isFinalBoss) });
  } catch (error) { window.__vbaHookErrors = (window.__vbaHookErrors || 0) + 1 }
  recordMonsterBattle(player, door, damage, damage >= requiredStrength, {`],
  ['game seed', 'function autoPlaytestSeed(runId, runIndex) {\n',
    'function autoPlaytestSeed(runId, runIndex) {\n  window.__vbaReseed?.(runIndex);\n'],
  ['coin change', 'function recordCoinDelta(player, delta) {\n  const history = playerHistory(player);\n  if (!history || !delta) return;\n',
    'function recordCoinDelta(player, delta) {\n  const history = playerHistory(player);\n  if (!history || !delta) return;\n  window.__vbaCoinOpsTurn = (window.__vbaCoinOpsTurn || 0) + 1;\n'],
]

export function instrument(src) {
  const sheets = /const googleSheetsSaveUrl = "[^"]+";/
  if (!sheets.test(src)) throw new Error('anchor not found: googleSheetsSaveUrl (update HOOKS in tools/autoplay.mjs)')
  src = src.replace(sheets, 'const googleSheetsSaveUrl = "http://127.0.0.1:9/blocked";')
  for (const [name, anchor, replacement] of HOOKS) {
    const first = src.indexOf(anchor)
    if (first < 0 || src.indexOf(anchor, first + 1) >= 0) {
      throw new Error(`anchor ${first < 0 ? 'not found' : 'not unique'}: ${name} (update HOOKS in tools/autoplay.mjs)`)
    }
    src = src.slice(0, first) + replacement + src.slice(first + anchor.length)
  }
  return src
}

// mulberry32: small, fast, good enough to replay bot games. Each game starts from its own state (the «game seed» hook),
// because animations between games draw a timing-dependent number of values.
const seededRandom = (seed) => `(() => { let a = ${seed >>> 0}; Math.random = function () {
  a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  window.__vbaReseed = (game) => { a = (${seed >>> 0} + Math.imul(game, 0x9e3779b1)) | 0 } })()`

function serve(transforms, snapshots) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://x')
    if (url.pathname.startsWith('/api/')) {
      let body = ''
      req.on('data', (chunk) => { body += chunk })
      req.on('end', () => {
        if (url.pathname === '/api/autoplay-runs' && req.method === 'POST') {
          try { snapshots.push(JSON.parse(body)) } catch {}
        }
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end('{"ok":true}')
      })
      return
    }
    const rel = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname).replace(/^\/+/, '')
    const file = path.resolve(ROOT, rel)
    if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); res.end(); return }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end(); return }
      const transform = transforms[rel]
      const body = transform ? transform(data.toString('utf8')) : data
      res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' })
      res.end(body)
    })
  })
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)))
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url)
    const pending = new Map()
    const listeners = []
    let id = 0
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id && pending.has(msg.id)) {
        const { ok, fail } = pending.get(msg.id)
        pending.delete(msg.id)
        msg.error ? fail(new Error(msg.error.message)) : ok(msg.result)
      } else if (msg.method) for (const listener of listeners) listener(msg)
    }
    ws.onerror = () => reject(new Error('devtools socket error'))
    ws.onopen = () => resolve({
      send: (method, params = {}) => new Promise((ok, fail) => { pending.set(++id, { ok, fail }); ws.send(JSON.stringify({ id, method, params })) }),
      on: (listener) => listeners.push(listener),
      close: () => ws.close(),
    })
  })
}

async function runCount({ players, games, seed, set, transforms, timeoutMs }) {
  const snapshots = []
  const errors = []
  const server = await serve(transforms, snapshots)
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'vba-autoplay-'))
  const chrome = spawn('nice', ['-n', '10', CHROME, '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--window-size=1600,900', '--mute-audio', '--no-first-run', '--no-default-browser-check', '--disable-extensions',
    '--disable-background-networking', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', 'about:blank'],
  { stdio: ['ignore', 'ignore', 'pipe'] })
  let cdp
  const started = Date.now()
  let status = ''
  try {
    const browser = await new Promise((resolve, reject) => {
      let text = ''
      chrome.stderr.on('data', (chunk) => { text += chunk; const m = text.match(/DevTools listening on (ws:\/\/\S+)/); if (m) resolve(m[1]) })
      chrome.on('exit', (code) => reject(new Error(`chrome exited ${code}`)))
    })
    const targets = await (await fetch(`http://127.0.0.1:${new URL(browser).port}/json/list`)).json()
    cdp = await connect(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
    cdp.on((msg) => {
      if (msg.method === 'Runtime.exceptionThrown') {
        const details = msg.params.exceptionDetails
        errors.push(details?.exception?.description || details?.text)
      }
    })
    const evaluate = async (expression) => {
      const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
      if (result.exceptionDetails) throw new Error('page: ' + (result.exceptionDetails.exception?.description || result.exceptionDetails.text))
      return result.result.value
    }
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Network.enable')
    await cdp.send('Network.setBlockedURLs', { urls: BLOCKED })
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: seededRandom(seed + players) })
    const loaded = new Promise((resolve) => cdp.on((msg) => msg.method === 'Page.loadEventFired' && resolve()))
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${server.address().port}/` })
    await loaded
    await evaluate(`new Promise((resolve) => { const t0 = Date.now(); (function wait() {
      if (document.querySelector('[data-auto-playtest-runs]') && document.querySelector('#playerCount')) resolve(true)
      else if (Date.now() - t0 > 20000) resolve(false); else setTimeout(wait, 100) })() })`)
    await evaluate(`(() => { const s = document.querySelector('#playerCount'); s.value = '${players}';
      s.dispatchEvent(new Event('change', { bubbles: true })); return s.value })()`)
    if (set) await evaluate(set)
    await evaluate(`(() => { const b = document.querySelector('[data-auto-playtest-runs]'); b.dataset.autoPlaytestRuns = '${games}'; b.click(); return true })()`)
    while (Date.now() - started < timeoutMs) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      status = await evaluate(`document.querySelector('#autoPlaytestStatus')?.textContent || ''`)
      if (status.startsWith('Готово')) break
    }
    return {
      players, games, seed, set: set || null, status, timedOut: !status.startsWith('Готово'),
      seconds: Math.round((Date.now() - started) / 1000), errors,
      hookErrors: await evaluate('window.__vbaHookErrors || 0'),
      turns: await evaluate('window.__vbaTurns || []'),
      battles: await evaluate('window.__vbaBattles || []'),
      snapshots,
    }
  } finally {
    if (cdp) cdp.close()
    const exited = chrome.exitCode !== null ? Promise.resolve() : new Promise((resolve) => chrome.once('exit', resolve))
    chrome.kill('SIGKILL')
    server.close()
    // Chrome's helpers may still write the profile for a moment after the kill.
    await Promise.race([exited, new Promise((resolve) => setTimeout(resolve, 3000))])
    try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 }) } catch {}
  }
}

// The numbers for the PASS line: finished games, game length, final, richest end.
function headline(data) {
  const games = data.snapshots
  const finals = games.map((s) => s.game?.finalSummary).filter(Boolean)
  const turns = games.map((s) => Number(s.game?.turns) || 0)
  const coins = games.flatMap((s) => (s.players || []).map((p) => p.coins))
  const share = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '-')
  return `${games.filter((s) => s.autoRun?.status === 'finished').length}/${data.games} games, ` +
    `${Math.round(turns.reduce((a, b) => a + b, 0) / (turns.length || 1))} turns, ` +
    `boss wins ${share(finals.filter((x) => x.bossWon).length, finals.length)}, coins max ${coins.length ? Math.max(...coins) : 0}`
}

function verdict(data) {
  const aborted = data.snapshots.filter((s) => s.autoRun?.status !== 'finished').length
  const problems = [
    data.timedOut && `timeout after ${data.seconds}s at «${data.status}»`,
    aborted && `${aborted} aborted`,
    data.errors.length && `${data.errors.length} page errors`,
    data.hookErrors && `${data.hookErrors} hook errors`,
    data.snapshots.length < data.games && `${data.snapshots.length}/${data.games} games saved`,
  ].filter(Boolean)
  return problems
}

async function main() {
  const args = parse(process.argv.slice(2))
  if (args._?.[0] === 'report') {
    for (const file of args._.slice(1)) console.log(summarize(JSON.parse(fs.readFileSync(file, 'utf8')), file).join('\n'))
    return 0
  }
  if (!fs.existsSync(CHROME)) { console.error(`no Chrome at ${CHROME} (set CHROME)`); return 2 }
  const counts = String(args.players).split(',').map(Number).filter((n) => n >= 1 && n <= 6)
  const games = Math.max(1, Math.min(1000, Number(args.games) || 20))
  const seed = args.seed !== undefined ? Number(args.seed) : Math.floor(Math.random() * 1e9)
  const run = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15)
  const out = path.resolve(ROOT, String(args.out || 'Logs/autoplay/{run}').replace('{run}', run))
  const transforms = { 'src/game.js': instrument }
  if (args.variant) {
    const variant = (await import(pathToFileURL(path.resolve(args.variant)).href)).default
    for (const [file, change] of Object.entries(variant)) {
      const before = transforms[file]
      transforms[file] = before ? (src) => change(before(src)) : change
    }
  }
  instrument(fs.readFileSync(path.join(ROOT, 'src/game.js'), 'utf8'))
  fs.mkdirSync(out, { recursive: true })
  console.log(`autoplay: players ${counts.join(',')} × ${games} games, seed ${seed}${args.variant ? `, variant ${args.variant}` : ''} → ${path.relative(ROOT, out)}`)

  const results = await Promise.all(counts.map((players) =>
    runCount({ players, games, seed, set: args.set, transforms, timeoutMs: Number(args.timeout) * 1000 })
      .catch((error) => ({ players, games, failed: error.message }))))
  const summary = []
  const failures = []
  const figures = []
  for (const data of results) {
    if (data.failed) { failures.push(`p${data.players}: ${data.failed}`); continue }
    const file = path.join(out, `p${data.players}.json`)
    fs.writeFileSync(file, JSON.stringify(data))
    const lines = summarize(data, path.relative(ROOT, file))
    summary.push(...lines, '')
    console.log(`p${data.players}: ${lines[1]}`)
    figures.push(`p${data.players} ${headline(data)}`)
    const problems = verdict(data)
    if (problems.length) failures.push(`p${data.players}: ${problems.join(', ')}`)
  }
  fs.writeFileSync(path.join(out, 'summary.txt'), summary.join('\n'))
  const where = path.relative(ROOT, path.join(out, 'summary.txt'))
  console.log(failures.length
    ? `FAIL autoplay seed ${seed}: ${failures.join('; ')} (${where})`
    : `PASS autoplay seed ${seed}: ${figures.join('; ')} (${where})`)
  return failures.length ? 1 : 0
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then((code) => process.exit(code), (error) => { console.error(error.message); process.exit(2) })
}
