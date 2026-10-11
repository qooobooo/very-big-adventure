// Очень Большая Бродилка status band (user's decision, 11 Oct 2026; ported from The Village's village-status): above
// the prompt, who works on what, dev's installed version against main, deliveries and the user's :5173 server. Data:
// `python3 tools/pipeline.py board --json`, run against the session's folder every 15 s; a session opened in the
// parent folder reads the main folder (very-big-adventure-main). PM keeps the board (`board --set/--free`).
// Draws nothing outside a checkout of the project or when the script fails; data of another project's board
// (The Village's mod and this one read the same command) is told apart by `project`.

let snapshot = null

const FALLBACK = 'cd very-big-adventure-main 2>/dev/null && python3 tools/pipeline.py board --json'

async function refresh($) {
  try {
    let out = await $.process.run(['python3', 'tools/pipeline.py', 'board', '--json'])
    if (out.exitCode !== 0) out = await $.process.run(['sh', '-c', FALLBACK])
    snapshot = out.exitCode === 0 ? JSON.parse(out.stdout) : null
  } catch {
    snapshot = null
  }
  $.ui.invalidate('ui.render')
}

function minutesSince(since) {
  const started = Date.parse(since)
  return Number.isNaN(started) ? null : Math.max(0, Math.round((Date.now() - started) / 60000))
}

// "Art / UI" -> "Art/UI": chips stay narrow.
function shortName(name) {
  return name.replace(/\s*\/\s*/g, '/').replace(/\s+/g, '')
}

function clip(text, max) {
  return text.length > max ? text.slice(0, max - 1) + '…' : text
}

// Six cells, ten minutes each: how long the task has run, at a glance; past an hour the bar turns warning.
function timeBar(min) {
  const full = Math.min(6, Math.ceil(min / 10))
  return '■'.repeat(full) + '□'.repeat(6 - full)
}

// Rows of segments {text, color?, bg?, bold?, dim?}: the versions, one row per busy chat, the free ones.
function rows(s) {
  const head = [
    { text: ' ' + s.base + ' ' + (s.installed || '—') + ' ', bg: 'claude', color: 'inverseText', bold: true },
    { text: ' ' },
    { text: ' ' + s.shared + ' ' + (s.shared_version || '—') + ' ', bg: 'subtle', color: 'inverseText' },
  ]
  if (s.rolled_back) head.push({ text: '  ⟲ откат', color: 'warning', bold: true })
  if (s.unpublished) head.push({ text: '  ↑' + s.unpublished + ' не в ' + s.shared, color: 'warning' })
  if (s.foreign) head.push({ text: '  ↓' + s.foreign + ' чужое', color: 'warning' })
  if (s.queue !== 'free' || s.app !== 'free') head.push({ text: '  ⟳ доставка', color: 'suggestion', bold: true })
  head.push(s.server ? { text: '  ▶ :5173', color: 'success' } : { text: '  ■ :5173', color: 'inactive' })
  const out = [head]
  const busy = s.team.filter((c) => c.task)
  const width = Math.max(0, ...busy.map((c) => shortName(c.name).length))
  for (const c of busy) {
    const min = minutesSince(c.since)
    const row = [
      { text: ' ' + shortName(c.name).padEnd(width) + ' ', bg: 'success', color: 'inverseText', bold: true },
      { text: ' ' + clip(c.task, 34).padEnd(34) + ' ' },
    ]
    if (min !== null) {
      row.push({ text: timeBar(min), color: min > 60 ? 'warning' : 'success' })
      row.push({ text: ' ' + min + ' мин', color: 'subtle' })
    }
    out.push(row)
  }
  const free = s.team.filter((c) => !c.task).map((c) => shortName(c.name))
  if (free.length) out.push([{ text: (busy.length ? '○ свободны  ' : '○ все свободны  ') + free.join(' · '), color: 'inactive' }])
  return out
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    refresh($)
    $.clock.every(15000, () => refresh($))
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (!snapshot || snapshot.project !== 'vba' || !Array.isArray(snapshot.team)) return next(e)
    const { Box, Text } = $.ui.resolve(e)
    const lines = rows(snapshot).map((row) =>
      Text({
        wrap: 'truncate-end',
        children: row.map((seg) => {
          const props = { children: [seg.text] }
          if (seg.color) props.color = seg.color
          if (seg.bg) props.backgroundColor = seg.bg
          if (seg.bold) props.bold = true
          if (seg.dim) props.dimColor = true
          return Text(props)
        }),
      }),
    )
    const theirs = await next(e)
    return Box({ flexDirection: 'column', children: theirs ? [...lines, theirs] : lines })
  })
}
