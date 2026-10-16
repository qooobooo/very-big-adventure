// Очень Большая Бродилка status band (user's decision, 11 Oct 2026; ported from The Village's village-status): above
// the prompt, who works on what, dev's installed version against main, deliveries and the user's :5173 server. Data:
// `python3 tools/pipeline.py board --json`, run against the session's folder every 15 s; a session opened in the
// parent folder reads the main folder (very-big-adventure-main). PM keeps the board (`board --set/--free`).
// Draws nothing outside a checkout of the project or when the script fails; data of another project's board
// (The Village's mod and this one read the same command) is told apart by `project`.

let snapshot = null
let drawnKey = ''
let failures = 0
let lastSurface = ''
// The desktop card is a sandboxed frame: any change to its markup reloads the frame, which shows as a blink (The
// Village's fix 0.5.5, 16 Oct 2026). So the markup is built once per board state and reused; it ticks its own minutes
// with SMIL, so it only has to be rebuilt when the board changes or the precomputed minutes run out.
const HORIZON_MIN = 30
let drawn = { key: '', source: '', anchor: 0 }
// Folded to one line by default (The Village's band 0.4.0, relayed 13 Oct 2026); the chevron shows the full card
// until the session ends, a new chat starts folded.
let expanded = false

const FALLBACK = 'cd very-big-adventure-main 2>/dev/null && python3 tools/pipeline.py board --json'

async function refresh($) {
  let next = null
  try {
    let out = await $.process.run(['python3', 'tools/pipeline.py', 'board', '--json'])
    if (out.exitCode !== 0) out = await $.process.run(['sh', '-c', FALLBACK])
    next = out.exitCode === 0 ? JSON.parse(out.stdout) : null
  } catch {
    next = null
  }
  // A single failed run (a git lock mid-delivery, a busy machine) keeps the last board instead of dropping the band
  // for 15 s; three in a row mean the board is really gone.
  if (next) failures = 0
  else if (++failures < 3 && snapshot) return
  snapshot = next
  // Redraw only when something shown changed, so the animations run on unbroken. The terminal shows plain minutes,
  // so there a passing minute redraws too; the desktop card counts them itself and is rebuilt only past its horizon.
  const tick = lastSurface === 'desktop' ? Math.floor((Date.now() - drawn.anchor) / (HORIZON_MIN * 60000)) : Math.floor(Date.now() / 60000)
  const key = JSON.stringify(snapshot) + '|' + tick
  if (key === drawnKey) return
  drawnKey = key
  $.ui.invalidate('ui.render')
}

function minutesSince(since, now = Date.now()) {
  const started = Date.parse(since)
  return Number.isNaN(started) ? null : Math.max(0, Math.round((now - started) / 60000))
}

// Seconds from `anchor` (when the card was built) until `since` reads `min` minutes (rounded, as minutesSince does).
function secondsUntil(since, min, anchor) {
  return Math.max(0, (Date.parse(since) + (min - 0.5) * 60000 - anchor) / 1000).toFixed(1)
}

// Show this element only from `from` until `to` seconds after load (`to` null: for good).
function during(from, to) {
  const show = Number(from) > 0 ? `<set attributeName="visibility" to="visible" begin="${from}s"/>` : ''
  const hide = to === null ? '' : `<set attributeName="visibility" to="hidden" begin="${to}s"/>`
  return { attr: Number(from) > 0 ? ' visibility="hidden"' : '', anim: show + hide }
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

// Terminal look. Rows of segments {text, color?, bg?, bold?, dim?}: the versions, one row per busy chat, the free ones.
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

// The folded line: versions and warnings, then each busy chat as «GD 12м», then how many are free.
function foldedRow(s) {
  const row = rows(s)[0].slice()
  const busy = s.team.filter((c) => c.task)
  for (const c of busy) {
    const min = minutesSince(c.since)
    row.push({ text: '  ' })
    row.push({ text: ' ' + shortName(c.name) + ' ', bg: 'success', color: 'inverseText', bold: true })
    if (min !== null) row.push({ text: ' ' + min + 'м', color: min > 60 ? 'warning' : 'subtle' })
  }
  const free = s.team.length - busy.length
  if (free) row.push({ text: '  ○ ' + (busy.length ? free + ' своб.' : 'все свободны'), color: 'inactive' })
  return row
}

// Desktop look (The Village's card, user's choice, 11 Oct 2026): one opaque SVG card, readable whatever scheme the
// frame reports, drawn in a sandboxed frame so CSS and SMIL animate. Calm on purpose: a slow breathing halo on each
// busy chat, a soft sheen across its time bar, a pulsing dot while a delivery runs; nothing blinks.
const CHAT_HUES = { GD: '#5B8DEF', 'Art / UI': '#A77BE0' }
const W = 640
const SHOWN_W = 750

function altText(s) {
  const busy = s.team.filter((c) => c.task).map((c) => c.name + ': ' + c.task)
  return s.base + ' ' + (s.installed || '—') + ', ' + s.shared + ' ' + (s.shared_version || '—') +
    (busy.length ? '; ' + busy.join('; ') : '; все свободны')
}

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function hue(name) {
  return CHAT_HUES[name] || '#8A8F98'
}

// A pill: rounded rect plus label; returns [svg, width]. Width from a rough 7 px per character at 12 px.
function pill(x, y, label, cls, extra = '') {
  const w = Math.round(label.length * 6.9) + 20 + (extra ? 12 : 0)
  const dot = extra ? `<circle cx="${x + 11}" cy="${y + 11}" r="3.2" class="${cls}-dot">${extra}</circle>` : ''
  const tx = x + 10 + (extra ? 10 : 0)
  return [`<rect x="${x}" y="${y}" width="${w}" height="22" rx="11" class="${cls}"/>${dot}<text x="${tx}" y="${y + 15}" class="${cls}-t">${esc(label)}</text>`, w]
}

function card(s, folded = false, anchor = Date.now()) {
  const busy = s.team.filter((c) => c.task)
  const free = s.team.filter((c) => !c.task)
  const parts = []
  let x = 14
  for (const [label, cls, extra] of [
    [s.base + '  ' + (s.installed || '—'), 'p-dev'],
    [s.shared + '  ' + (s.shared_version || '—'), 'p-main'],
    s.rolled_back ? ['⟲ откат', 'p-warn'] : null,
    s.unpublished ? ['↑ ' + s.unpublished + (folded ? '' : ' не в ' + s.shared), 'p-warn'] : null,
    s.foreign ? ['↓ ' + s.foreign + (folded ? '' : ' чужое'), 'p-warn'] : null,
    s.queue !== 'free' || s.app !== 'free'
      ? ['доставка', 'p-live', '<animate attributeName="opacity" values="1;.25;1" dur="2.4s" repeatCount="indefinite"/>']
      : null,
    s.server ? ['▶ :5173', 'p-ok'] : ['■ :5173', 'p-main'],
  ].filter(Boolean)) {
    const [svg, w] = pill(x, 12, label, cls, extra)
    parts.push(svg)
    x += w + 8
  }
  if (folded) {
    // One row: after the pills, a dot and short name per busy chat (minutes are in the full card), «+N» for those
    // that do not fit, then the free count.
    let hidden = 0
    for (const c of busy) {
      const label = shortName(c.name)
      const w = Math.round(label.length * 6.9) + 28
      if (hidden || x + w > W - 92) {
        hidden++
        continue
      }
      const late = (minutesSince(c.since) ?? 0) > 60
      parts.push(
        `<rect x="${x}" y="12" width="${w}" height="22" rx="11" class="p-free"/>`,
        `<circle cx="${x + 11}" cy="23" r="3.6" fill="${hue(c.name)}"><animate attributeName="opacity" values="1;.35;1" dur="3.6s" repeatCount="indefinite"/></circle>`,
        `<text x="${x + 19}" y="27" class="p-free-t${late ? ' late' : ''}">${esc(label)}</text>`,
      )
      x += w + 6
    }
    if (hidden) parts.push(`<text x="${x + 2}" y="27" class="muted">+${hidden}</text>`)
    parts.push(`<text x="${W - 16}" y="27" class="muted" text-anchor="end">${busy.length ? '○ ' + free.length + ' своб.' : 'все свободны'}</text>`)
    busy.length = 0
  }
  let y = 46
  busy.forEach((c, i) => {
    const min = minutesSince(c.since, anchor)
    const color = hue(c.name)
    const cy = y + 14
    const late = min !== null && min > 60
    const fill = min === null ? 0 : Math.max(0.06, Math.min(1, min / 60))
    const delay = (i * 0.7).toFixed(1)
    parts.push(
      `<circle cx="27" cy="${cy}" r="9" fill="${color}" opacity=".18"><animate attributeName="r" values="7;11;7" dur="3.6s" begin="${delay}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".28;0;.28" dur="3.6s" begin="${delay}s" repeatCount="indefinite"/></circle>`,
      `<circle cx="27" cy="${cy}" r="5" fill="${color}"/>`,
      `<text x="42" y="${cy + 4.5}" class="name">${esc(c.name)}</text>`,
      `<text x="118" y="${cy + 4.5}" class="task" clip-path="url(#taskclip)">${esc(clip(c.task, 54))}</text>`,
    )
    if (min !== null) {
      const bx = W - 160
      const bw = 92
      const fw = Math.round(bw * fill)
      const barColor = late ? 'var(--warn)' : color
      // The bar grows and the minutes count on by themselves for the next HORIZON_MIN minutes (SMIL from the card's
      // load), so the frame is not reloaded each minute.
      const last = min + HORIZON_MIN + 5
      const endW = Math.round(bw * Math.max(0.06, Math.min(1, last / 60)))
      const span = secondsUntil(c.since, last, anchor)
      const grow = endW > fw ? `<animate attributeName="width" from="${fw}" to="${endW}" dur="${span}s" fill="freeze"/>` : ''
      // Past an hour the bar turns warning-coloured: an overlay that appears then and grows with it.
      const warn = !late && last > 60 ? during(secondsUntil(c.since, 61, anchor), null) : null
      parts.push(
        `<rect x="${bx}" y="${cy - 3}" width="${bw}" height="6" rx="3" class="track"/>`,
        `<rect x="${bx}" y="${cy - 3}" width="${fw}" height="6" rx="3" fill="${barColor}">${grow}</rect>`,
        warn ? `<rect x="${bx}" y="${cy - 3}" width="${fw}" height="6" rx="3" class="warnbar"${warn.attr}>${grow}${warn.anim}</rect>` : '',
        `<rect x="${bx}" y="${cy - 3}" width="${fw}" height="6" rx="3" fill="url(#sheen)">${grow}</rect>`,
      )
      for (let m = min; m <= last; m++) {
        const shown = during(m === min ? 0 : secondsUntil(c.since, m, anchor), m === last ? null : secondsUntil(c.since, m + 1, anchor))
        parts.push(`<text x="${W - 16}" y="${cy + 4.5}" class="time${m > 60 ? ' late' : ''}" text-anchor="end"${shown.attr}>${m} мин${shown.anim}</text>`)
      }
    }
    y += 30
  })
  if (busy.length) y += 4
  const fy = y + 2
  if (!folded) parts.push(`<text x="16" y="${fy + 15}" class="muted">${busy.length ? 'свободны' : 'все свободны'}</text>`)
  let fx = busy.length ? 82 : 102
  for (const c of folded ? [] : free) {
    const w = Math.round(c.name.length * 6.1) + 28
    parts.push(
      `<rect x="${fx}" y="${fy}" width="${w}" height="22" rx="11" class="p-free"/>`,
      `<circle cx="${fx + 11}" cy="${fy + 11}" r="3" fill="${hue(c.name)}" opacity=".75"/>`,
      `<text x="${fx + 19}" y="${fy + 15}" class="p-free-t">${esc(c.name)}</text>`,
    )
    fx += w + 6
  }
  const H = folded ? 46 : fy + 34
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<style>
:root{--fg:#1F2328;--muted:#6E7781;--card:#FFFFFF;--line:rgba(0,0,0,.08);--track:rgba(0,0,0,.07);--warn:#D4882B;--accent:#D97757;--ok:#2E9E6E}
@media (prefers-color-scheme: dark){:root{--fg:#E6E8EB;--muted:#8B929B;--card:#30302E;--line:rgba(255,255,255,.08);--track:rgba(255,255,255,.08);--warn:#E8A44A;--ok:#4CC38A}}
text{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",sans-serif;font-size:12px;fill:var(--fg)}
.card{fill:var(--card);stroke:var(--line)}
.p-dev{fill:var(--accent)} .p-dev-t{fill:#fff;font-weight:650;letter-spacing:.2px}
.p-main{fill:none;stroke:var(--line);stroke-width:1.2} .p-main-t{fill:var(--muted);font-weight:600}
.p-warn{fill:var(--warn);fill-opacity:.14} .p-warn-t{fill:var(--warn);font-weight:600}
.p-live{fill:#5B8DEF;fill-opacity:.14} .p-live-t{fill:#5B8DEF;font-weight:600} .p-live-dot{fill:#5B8DEF}
.p-ok{fill:var(--ok);fill-opacity:.14} .p-ok-t{fill:var(--ok);font-weight:600}
.p-free{fill:none;stroke:var(--line)} .p-free-t{fill:var(--muted);font-size:11.5px}
.name{font-weight:650} .task{fill:var(--fg);opacity:.82}
.muted{fill:var(--muted);font-size:11.5px}
.track{fill:var(--track)} .warnbar{fill:var(--warn)}
.time{fill:var(--muted);font-variant-numeric:tabular-nums;font-size:11.5px} .late{fill:var(--warn);font-weight:600}
</style>
<defs>
<clipPath id="taskclip"><rect x="118" y="0" width="${W - 160 - 118 - 14}" height="${H}"/></clipPath>
<linearGradient id="sheen" x1="0" x2="1" gradientUnits="objectBoundingBox">
<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
<animateTransform attributeName="gradientTransform" type="translate" values="-1 0;1 0;1 0" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/>
</linearGradient>
</defs>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="14" class="card"/>
${parts.join('\n')}
</svg>`
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    refresh($)
    $.clock.every(15000, () => refresh($))
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (!snapshot || snapshot.project !== 'vba' || !Array.isArray(snapshot.team)) return next(e)
    const { Box, Text, Svg, Button } = $.ui.resolve(e)
    lastSurface = e.surface
    const theirs = await next(e)
    const toggle = Button
      ? Button({
          key: 'vba-fold',
          plain: true,
          // Dim at rest, full under the pointer: a quiet secondary control, not a chip that competes with the card.
          dimColor: true,
          onPress: () => {
            expanded = !expanded
            $.ui.invalidate('ui.render')
          },
          // The glyph shows what a press does (The Village's 0.4.3, 15 Oct 2026). The band sits above the prompt, so the
          // card unfolds upward: ▴ while folded, ▾ to fold it back. No `label`: a desktop draws it as the button's text.
          children: [expanded ? '▾' : '▴'],
        })
      : null
    const folded = !expanded && toggle !== null
    if (e.surface === 'desktop' && Svg) {
      // Without a size the frame takes the default 150 px height and centres the card in empty space; draw it at the
      // scale the band showed it (about 750 px wide) with the height that keeps its proportions.
      // Same board, same fold, still within the horizon: hand over the very markup drawn before, so the frame stays.
      const key = JSON.stringify(snapshot) + '|' + folded
      if (drawn.key !== key || Date.now() - drawn.anchor > HORIZON_MIN * 60000) {
        const anchor = Date.now()
        drawn = { key, source: card(snapshot, folded, anchor), anchor }
      }
      const source = drawn.source
      const height = Number(source.match(/height="(\d+)"/)[1])
      const drawn = Svg({ alt: altText(snapshot), source, isInteractive: true, width: SHOWN_W, height: Math.round((height * SHOWN_W) / W) })
      // The card keeps one width folded and unfolded, so the chevron stays put beside its top row.
      const band = toggle ? Box({ flexDirection: 'row', alignItems: 'flex-start', gap: 1, children: [drawn, toggle] }) : drawn
      return theirs ? Box({ flexDirection: 'column', children: [band, theirs] }) : band
    }
    const lines = (folded ? [foldedRow(snapshot)] : rows(snapshot)).map((row) =>
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
    if (toggle) lines[0] = Box({ justifyContent: 'space-between', paddingRight: 5, children: [lines[0], toggle] })
    return Box({ flexDirection: 'column', children: theirs ? [...lines, theirs] : lines })
  })
}
