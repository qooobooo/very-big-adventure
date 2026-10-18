// Summary of a tools/autoplay.mjs run: game length, movement, battles, coins, final. summarize(data) returns text lines;
// line 1 is the short one the runner prints. Chronicle counts read the game's log texts, so a reworded log line reads 0.
const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)
const max = (xs) => (xs.length ? Math.max(...xs) : 0)
const q = (xs, p) => {
  if (!xs.length) return 0
  const s = [...xs].sort((a, b) => a - b)
  return s[Math.min(s.length - 1, Math.round(p * (s.length - 1)))]
}
const f = (x, d = 1) => Number(x).toFixed(d)
const pct = (n, d) => (d ? `${f((100 * n) / d, 0)}%` : '-')
const top = (counts, per, limit = 8) => Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit)
  .map(([k, v]) => `${k} ${f(v / per, 0)}`).join(', ')

const CHRONICLE = {
  shopPass: /проходит через Лавку Джо/,
  shopBuy: /покупает|платит .* за карту|получает карту Лавка Джо/,
  shopDecline: /отказывается от карт Лавки/,
  good: /тянет карту Хорошо/,
  bad: /тянет карту Плохо/,
  event: /тянет карту Событие/,
  tadam: /тянет карту ТАДАМ/,
  payDouble: /Удвой свои/,
  rage: /Ярость монстров: все монстры/,
  otherLoss: /Чужая расплата/,
}

// Coin gains between a player's consecutive turn records: on their own turn they go to the landing type, otherwise to
// «чужой ход» (reactive cards, effects from others).
function coinSources(turns) {
  const all = {}
  const rich = {}
  let players = 0
  let richPlayers = 0
  for (const run of [...new Set(turns.map((t) => t.run))]) {
    const ts = turns.filter((t) => t.run === run)
    const prev = {}
    const gain = {}
    for (const t of ts) {
      for (const p of t.players) {
        const delta = p.coins - (prev[p.id] ?? 0)
        prev[p.id] = p.coins
        if (delta <= 0) continue
        const source = p.id === t.pid ? t.land : 'чужой ход'
        gain[p.id] ||= {}
        gain[p.id][source] = (gain[p.id][source] || 0) + delta
      }
    }
    for (const p of ts.at(-1).players) {
      players += 1
      const isRich = p.coins > 120
      if (isRich) richPlayers += 1
      for (const [source, v] of Object.entries(gain[p.id] || {})) {
        all[source] = (all[source] || 0) + v
        if (isRich) rich[source] = (rich[source] || 0) + v
      }
    }
  }
  return { all, rich, players, richPlayers }
}

export function summarize(data, label = '') {
  const { turns, battles, snapshots } = data
  const n = snapshots.length || 1
  const finished = snapshots.filter((s) => s.autoRun?.status === 'finished').length
  const runs = [...new Set(turns.map((t) => t.run))]
  const perRun = runs.map((run) => turns.filter((t) => t.run === run))
  const turnsPerGame = perRun.map((ts) => ts.length)
  const rounds = snapshots.map((s) => Number(s.game?.round) || 0)
  const steps = turns.map((t) => t.total)
  const cellsPerPlayer = snapshots.map((s) => avg(Object.values(s.history?.players || {}).map((p) => p.cellsPassed || 0)))
  const lost = battles.filter((b) => !b.won && !b.final).length
  const finals = snapshots.map((s) => s.game?.finalSummary).filter(Boolean)
  const bossWins = finals.filter((x) => x.bossWon).length
  const endPlayers = snapshots.flatMap((s) => s.players || [])
  const coinsEnd = endPlayers.map((p) => p.coins)
  const lines = [
    `## ${label}: ${data.players} players, ${snapshots.length} games, seed ${data.seed}, ${data.seconds}s${data.set ? `, set: ${data.set}` : ''}`,
    `finished ${finished}/${snapshots.length}; turns/game ${f(avg(turnsPerGame), 0)} (rounds ${f(avg(rounds), 0)}); steps/turn ${f(avg(steps))} (max ${max(steps)}); ` +
      `cells/player ${f(avg(cellsPerPlayer), 0)}; back to start ${f(lost / n)}/game; boss wins ${pct(bossWins, finals.length)}; ` +
      `coins at end avg ${f(avg(coinsEnd), 0)}, max ${max(coinsEnd)}, >120 ${pct(coinsEnd.filter((c) => c > 120).length, coinsEnd.length)}`,
  ]
  const aborts = snapshots.map((s) => s.autoRun?.abortReason).filter(Boolean)
  if (aborts.length) lines.push(`aborts: ${aborts.slice(0, 3).join(' | ')}`)
  if (data.errors?.length) lines.push(`page errors: ${data.errors.slice(0, 3).join(' | ')}`)

  lines.push('### movement')
  lines.push(`turns/game p10 ${q(turnsPerGame, 0.1)} p90 ${q(turnsPerGame, 0.9)}; steps/turn p50 ${q(steps, 0.5)} p90 ${q(steps, 0.9)}; ` +
    `turns with 20+ steps ${pct(steps.filter((s) => s >= 20).length, steps.length)}, 30+ ${pct(steps.filter((s) => s >= 30).length, steps.length)}`)
  const phased = perRun.flatMap((ts) => ts.map((t, i) => ({ ...t, phase: Math.min(2, Math.floor((3 * i) / ts.length)) })))
  for (const phase of [0, 1, 2]) {
    const ts = phased.filter((t) => t.phase === phase)
    const me = ts.map((t) => t.players.find((p) => p.id === t.pid))
    lines.push(`  third ${phase + 1}: dice ${f(avg(ts.map((t) => t.dice)))} (max ${max(ts.map((t) => t.dice))}), step bonus ${f(avg(ts.map((t) => t.bonus)))} ` +
      `(max ${max(ts.map((t) => t.bonus))}), steps ${f(avg(ts.map((t) => t.total)))} (max ${max(ts.map((t) => t.total))}), ` +
      `strength ${f(avg(me.map((p) => p.str)))}, coins ${f(avg(me.map((p) => p.coins)), 0)} (max ${max(me.map((p) => p.coins))})`)
  }
  const lands = {}
  for (const t of turns) lands[t.land] = (lands[t.land] || 0) + 1
  lines.push(`landings: ${Object.entries(lands).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${pct(v, turns.length)}`).join(', ')}`)
  lines.push(`bookkeeping/turn: log lines ${f(avg(turns.map((t) => t.logs)))} (p90 ${q(turns.map((t) => t.logs), 0.9)}), ` +
    `coin changes ${f(avg(turns.map((t) => t.coinOps)))} (p90 ${q(turns.map((t) => t.coinOps), 0.9)})`)
  const memory = turns.map((t) => { const p = t.players.find((x) => x.id === t.pid); return p.items + p.arts + p.held })
  lines.push(`own lasting effects at turn (shop + artifacts + held): avg ${f(avg(memory))} p90 ${q(memory, 0.9)} max ${max(memory)}`)

  lines.push('### battles')
  const byDoor = {}
  for (const b of battles) (byDoor[b.final ? 'final' : b.door] ||= []).push(b)
  lines.push(`battles/game ${f(battles.length / n)}; lost (back to start) ${f(lost / n)}/game`)
  for (const [door, bs] of Object.entries(byDoor)) {
    lines.push(`  ${door}: ${bs.length}, won ${pct(bs.filter((b) => b.won).length, bs.length)}, needs ${f(avg(bs.map((b) => b.required)))} ` +
      `(max ${max(bs.map((b) => b.required))}), dice ${f(avg(bs.map((b) => b.dice)))}, bonus ${f(avg(bs.map((b) => b.bonus)))}, ` +
      `numbers to add ${f(avg(bs.map((b) => b.dice + b.terms)))} (max ${max(bs.map((b) => b.dice + b.terms))})`)
  }
  lines.push(`monster rage avg ${f(avg(turns.map((t) => t.rage)))} max ${max(turns.map((t) => t.rage))}; ` +
    `ТАДАМ on the table avg ${f(avg(turns.map((t) => t.tadams)))} max ${max(turns.map((t) => t.tadams))}`)

  lines.push('### coins and cards')
  const coins = coinSources(turns)
  lines.push(`coins at end p50 ${q(coinsEnd, 0.5)} p90 ${q(coinsEnd, 0.9)}; ended >120: ${coins.richPlayers}/${coins.players}`)
  lines.push(`  gained per player by source: ${top(coins.all, coins.players || 1)}`)
  if (coins.richPlayers) lines.push(`  players ending >120 gained: ${top(coins.rich, coins.richPlayers)}`)
  const items = endPlayers.map((p) => (p.items || []).length)
  const arts = endPlayers.map((p) => (p.artifacts || []).length)
  lines.push(`at end: shop cards ${f(avg(items))} (max ${max(items)}), artifacts ${f(avg(arts))} (max ${max(arts)}), ` +
    `dice ${f(avg(endPlayers.map((p) => 1 + (p.diceBonus || 0))))}, strength ${f(avg(endPlayers.map((p) => p.battleBonus || 0)))} ` +
    `(max ${max(endPlayers.map((p) => p.battleBonus || 0))}), step bonus max ${max(endPlayers.map((p) => p.stepBonus || 0))}`)
  const chron = Object.fromEntries(Object.entries(CHRONICLE).map(([key, re]) =>
    [key, avg(snapshots.map((s) => (s.chronicle || []).filter((line) => re.test(line)).length))]))
  lines.push(`per game: ${Object.entries(chron).map(([k, v]) => `${k} ${f(v)}`).join(', ')}`)

  lines.push('### final')
  lines.push(`boss wins ${bossWins}/${finals.length}; boss force ${f(avg(finals.map((x) => x.bossForce || 0)), 0)}, ` +
    `players force ${f(avg(finals.map((x) => x.playersForce || 0)), 0)}; winner score ${f(avg(snapshots.map((s) => s.game?.finalWinnerScore || 0)), 0)}`)
  const scores = finals.flatMap((x) => (x.players || []).map((p) => p.score).filter(Boolean))
  if (scores.length) {
    const parts = ['coins', 'shop', 'damage', 'steps', 'position'].filter((k) => scores.some((s) => s[k] !== undefined))
      .map((k) => `${k} ${f(avg(scores.map((s) => Number(s[k]) || 0)), 0)}`)
    lines.push(`player score avg ${f(avg(scores.map((s) => Number(s.total) || 0)), 0)} = ${parts.join(' + ')}`)
  }
  return lines
}
