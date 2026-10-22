// Очень Большая Бродилка status band (user's decision, 11 Oct 2026; ported from The Village's village-status): above
// the prompt, who works on what, dev's installed version against main, deliveries and the user's :5173 server. Data:
// `python3 tools/pipeline.py board --json`, run against the session's folder every 15 s; a session opened in the
// parent folder reads the main folder (very-big-adventure-main). PM keeps the board (`board --set/--free`).
// Draws nothing outside a checkout of the project or when the script fails; data of another project's board
// (The Village's mod and this one read the same command) is told apart by `project`.

let snapshot = null
let drawnKey = ''
let failures = 0
// The desktop card is drawn as a plain image (The Village's fix 0.5.6, 16 Oct 2026: it blinked). A sandboxed frame
// (`isInteractive`) is reloaded on every draw of the band — each turn start and end, each resize — and shows blank while
// it loads; an image of the same markup stays put. The markup is also built once per board state and minute, so
// redraws hand over the very same string.
let drawn = { key: '', source: '' }
// Folded to one line by default (The Village's band 0.4.0, relayed 13 Oct 2026); the chevron shows the full card
// until the session ends, a new chat starts folded.
let expanded = false
// Tabs above the card (user's request via PM Diceborne, 23 Oct 2026, as in diceborne-status 0.1.7): «Текущие» (busy
// chats and the free ones), «Выполненные» (finished tasks, board --json "done", newest first), «Все» (busy, then
// finished) and one per chat (its task, then its finished ones). Finished rows are paged DONE_PAGE at a time.
let view = { tab: 'now', page: 0 }
const DONE_PAGE = 12

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
  // until the next poll; three in a row mean the board is really gone.
  if (next) failures = 0
  else if (++failures < 3 && snapshot) return
  snapshot = next
  // Redraw only when something shown changed (the board, or a minute passed), so the animations run on unbroken.
  const key = JSON.stringify(snapshot) + Math.floor(Date.now() / 60000)
  if (key === drawnKey) return
  drawnKey = key
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

function setView($, patch) {
  view = { ...view, ...patch }
  $.ui.invalidate('ui.render')
}

// What the tab shows: busy chats, the free ones, and the finished tasks (with the page of them on screen).
function sections(s, tab) {
  const chat = tab === 'now' || tab === 'done' || tab === 'all' ? null : tab
  const busy = tab === 'done' ? [] : s.team.filter((c) => c.task && (!chat || c.name === chat))
  const free = tab === 'now' ? s.team.filter((c) => !c.task) : []
  const all = tab === 'now' ? [] : (s.done || []).filter((r) => !chat || r.chat === chat)
  const pages = Math.max(1, Math.ceil(all.length / DONE_PAGE))
  const page = Math.min(view.page, pages - 1)
  return { chat, busy, free, done: all, page, pages, shown: all.slice(page * DONE_PAGE, (page + 1) * DONE_PAGE) }
}

// «23.10 02:09» from «2026-10-23T02:09».
function when(stamp) {
  const m = /^\d{4}-(\d\d)-(\d\d)T(\d\d:\d\d)/.exec(stamp || '')
  return m ? m[2] + '.' + m[1] + ' ' + m[3] : '—'
}

function took(min) {
  if (typeof min !== 'number') return '—'
  if (min < 60) return min + ' мин'
  return Math.floor(min / 60) + ' ч' + (min % 60 ? ' ' + (min % 60) + ' мин' : '')
}

function clip(text, max) {
  return text.length > max ? text.slice(0, max - 1) + '…' : text
}

// Six cells, ten minutes each: how long the task has run, at a glance; past an hour the bar turns warning.
function timeBar(min) {
  const full = Math.min(6, Math.ceil(min / 10))
  return '■'.repeat(full) + '□'.repeat(6 - full)
}

// Terminal look. Rows of segments {text, color?, bg?, bold?, dim?}: the versions, then what the tab shows.
function rows(s, tab = 'now') {
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
  const { chat, busy, free, done, page, pages, shown } = sections(s, tab)
  const width = Math.max(0, ...busy.map((c) => shortName(c.name).length), ...shown.map((r) => shortName(r.chat).length))
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
  if (chat && !busy.length) out.push([{ text: '○ ' + chat + ' свободен', color: 'inactive' }])
  if (free.length) out.push([{ text: (busy.length ? '○ свободны  ' : '○ все свободны  ') + free.map((c) => shortName(c.name)).join(' · '), color: 'inactive' }])
  if (tab !== 'now') {
    out.push([{ text: '✓ выполнено · ' + done.length + (pages > 1 ? ' · стр. ' + (page + 1) + '/' + pages : ''), color: 'subtle' }])
    for (const r of shown) {
      const row = []
      if (!chat) row.push({ text: ' ' + shortName(r.chat).padEnd(width) + ' ', bg: 'subtle', color: 'inverseText' })
      row.push({ text: ' ' + clip(r.task, 34).padEnd(34) + ' ' })
      row.push({ text: when(r.done), color: 'subtle' })
      row.push({ text: '  ' + took(r.min), color: 'success' })
      out.push(row)
    }
    if (!done.length) out.push([{ text: 'пока пусто', color: 'inactive' }])
  }
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
// frame reports, drawn as an image (CSS and SMIL still animate in it). Calm on purpose: a slow breathing halo on each
// busy chat, a soft sheen across its time bar, a pulsing dot while a delivery runs; nothing blinks.
const CHAT_HUES = { GD: '#5B8DEF', 'Art / UI': '#A77BE0' }
const ACCENT = '#D97757'
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

function card(s, folded = false, tab = 'now') {
  const everyBusy = s.team.filter((c) => c.task)
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
    for (const c of everyBusy) {
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
    const freeCount = s.team.length - everyBusy.length
    parts.push(`<text x="${W - 16}" y="27" class="muted" text-anchor="end">${everyBusy.length ? '○ ' + freeCount + ' своб.' : 'все свободны'}</text>`)
  }
  const { chat, busy, free, done, page, pages, shown } = folded
    ? { busy: [], free: [], done: [], shown: [] }
    : sections(s, tab)
  let y = 46
  busy.forEach((c, i) => {
    const min = minutesSince(c.since)
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
      parts.push(
        `<rect x="${bx}" y="${cy - 3}" width="${bw}" height="6" rx="3" class="track"/>`,
        `<rect x="${bx}" y="${cy - 3}" width="${fw}" height="6" rx="3" fill="${barColor}"/>`,
        `<rect x="${bx}" y="${cy - 3}" width="${fw}" height="6" rx="3" fill="url(#sheen)"/>`,
        `<text x="${W - 16}" y="${cy + 4.5}" class="time${late ? ' late' : ''}" text-anchor="end">${min} мин</text>`,
      )
    }
    y += 30
  })
  if (busy.length) y += 4
  if (chat && !busy.length) {
    parts.push(
      `<circle cx="27" cy="${y + 14}" r="5" fill="${hue(chat)}" opacity=".45"/>`,
      `<text x="42" y="${y + 18.5}" class="name">${esc(chat)}</text>`,
      `<text x="118" y="${y + 18.5}" class="muted">свободен</text>`,
    )
    y += 34
  }
  if (tab === 'now' && !folded) {
    const fy = y + 2
    parts.push(`<text x="16" y="${fy + 15}" class="muted">${busy.length ? 'свободны' : 'все свободны'}</text>`)
    let fx = busy.length ? 82 : 102
    for (const c of free) {
      const w = Math.round(c.name.length * 6.1) + 28
      parts.push(
        `<rect x="${fx}" y="${fy}" width="${w}" height="22" rx="11" class="p-free"/>`,
        `<circle cx="${fx + 11}" cy="${fy + 11}" r="3" fill="${hue(c.name)}" opacity=".75"/>`,
        `<text x="${fx + 19}" y="${fy + 15}" class="p-free-t">${esc(c.name)}</text>`,
      )
      fx += w + 6
    }
    y = fy + 32
  }
  if (tab !== 'now' && !folded) {
    // Finished: a quiet heading, then one row each: a dot in the chat's hue, the chat (on shared tabs), the task, when
    // it was done, and how long it took as a bar of the chat's hue (an hour fills it) and in words.
    const label = 'выполнено · ' + done.length + (pages > 1 ? ' · стр. ' + (page + 1) + ' из ' + pages : '')
    const lw = Math.round(label.length * 6.4)
    parts.push(
      `<text x="16" y="${y + 14}" class="muted">${esc(label)}</text>`,
      `<rect x="${24 + lw}" y="${y + 10}" width="${W - 40 - lw}" height="1" class="rule"/>`,
    )
    y += 24
    const taskX = chat ? 42 : 118
    for (const r of shown) {
      const cy = y + 12
      const color = hue(r.chat)
      const min = typeof r.min === 'number' ? r.min : null
      const late = min !== null && min > 60
      const bx = W - 168
      const bw = 68
      const fw = min === null ? 0 : Math.round(bw * Math.max(0.06, Math.min(1, min / 60)))
      parts.push(`<circle cx="27" cy="${cy}" r="4" fill="${color}" opacity=".85"/>`)
      if (!chat) parts.push(`<text x="42" y="${cy + 4.5}" class="done-name">${esc(r.chat)}</text>`)
      parts.push(
        `<text x="${taskX}" y="${cy + 4.5}" class="task" clip-path="url(#doneclip${chat ? 'c' : ''})">${esc(clip(r.task, chat ? 62 : 50))}</text>`,
        `<text x="${bx - 10}" y="${cy + 4.5}" class="time" text-anchor="end">${esc(when(r.done))}</text>`,
        `<rect x="${bx}" y="${cy - 3}" width="${bw}" height="6" rx="3" class="track"/>`,
        `<rect x="${bx}" y="${cy - 3}" width="${fw}" height="6" rx="3" fill="${late ? 'var(--warn)' : color}" opacity=".8"/>`,
        `<text x="${W - 16}" y="${cy + 4.5}" class="time${late ? ' late' : ''}" text-anchor="end">${esc(took(min))}</text>`,
      )
      y += 26
    }
    if (!done.length) {
      parts.push(`<text x="16" y="${y + 14}" class="muted">пока пусто</text>`)
      y += 24
    }
    y += 6
  }
  const H = folded ? 46 : Math.max(y + 6, 60)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<style>
:root{--fg:#1F2328;--muted:#6E7781;--card:#FFFFFF;--line:rgba(0,0,0,.08);--track:rgba(0,0,0,.07);--warn:#D4882B;--accent:${ACCENT};--ok:#2E9E6E}
@media (prefers-color-scheme: dark){:root{--fg:#E6E8EB;--muted:#8B929B;--card:#30302E;--line:rgba(255,255,255,.08);--track:rgba(255,255,255,.08);--warn:#E8A44A;--ok:#4CC38A}}
text{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",sans-serif;font-size:12px;fill:var(--fg)}
.card{fill:var(--card);stroke:var(--line)}
.p-dev{fill:var(--accent)} .p-dev-t{fill:#fff;font-weight:650;letter-spacing:.2px}
.p-main{fill:none;stroke:var(--line);stroke-width:1.2} .p-main-t{fill:var(--muted);font-weight:600}
.p-warn{fill:var(--warn);fill-opacity:.14} .p-warn-t{fill:var(--warn);font-weight:600}
.p-live{fill:#5B8DEF;fill-opacity:.14} .p-live-t{fill:#5B8DEF;font-weight:600} .p-live-dot{fill:#5B8DEF}
.p-ok{fill:var(--ok);fill-opacity:.14} .p-ok-t{fill:var(--ok);font-weight:600}
.p-free{fill:none;stroke:var(--line)} .p-free-t{fill:var(--muted);font-size:11.5px}
.name{font-weight:650} .task{fill:var(--fg);opacity:.82} .done-name{fill:var(--muted);font-weight:600;font-size:11.5px}
.muted{fill:var(--muted);font-size:11.5px} .rule{fill:var(--line)}
.track{fill:var(--track)}
.time{fill:var(--muted);font-variant-numeric:tabular-nums;font-size:11.5px} .late{fill:var(--warn);font-weight:600}
</style>
<defs>
<clipPath id="taskclip"><rect x="118" y="0" width="${W - 160 - 118 - 14}" height="${H}"/></clipPath>
<clipPath id="doneclip"><rect x="118" y="0" width="${W - 168 - 118 - 84}" height="${H}"/></clipPath>
<clipPath id="doneclipc"><rect x="42" y="0" width="${W - 168 - 42 - 84}" height="${H}"/></clipPath>
<linearGradient id="sheen" x1="0" x2="1" gradientUnits="objectBoundingBox">
<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
<animateTransform attributeName="gradientTransform" type="translate" values="-1 0;1 0;1 0" keyTimes="0;.55;1" dur="5s" repeatCount="indefinite"/>
</linearGradient>
</defs>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="14" class="card"/>
${parts.join('\n')}
</svg>`
}

// The tab strip above the card, one look for all: each tab a chip, the chosen one filled (the accent for the shared
// tabs, the chat's hue for a chat), the others its hue on no fill; a busy chat's tab carries a «●». Paging arrows
// (figure spaces give them a chip's width to hit) follow while the tab has more finished rows than a page.
function tabs($, s, Button, Box, Text) {
  const chip = (key, label, color, chosen) =>
    Button({
      key: 'vba-tab-' + key,
      plain: true, // no `label`: a desktop would draw it in place of the coloured chip
      onPress: () => setView($, { tab: key, page: 0 }),
      children: [
        Text({
          bold: chosen,
          color: chosen ? '#FFFFFF' : color,
          backgroundColor: chosen ? color : undefined,
          children: [' ' + label + ' '],
        }),
      ],
    })
  const out = [
    chip('now', 'Текущие', ACCENT, view.tab === 'now'),
    chip('done', 'Выполненные', ACCENT, view.tab === 'done'),
    chip('all', 'Все', ACCENT, view.tab === 'all'),
  ]
  const order = Object.keys(CHAT_HUES)
  const rank = (c) => (order.includes(c.name) ? order.indexOf(c.name) : order.length)
  for (const c of [...s.team].sort((a, b) => rank(a) - rank(b))) out.push(chip(c.name, (c.task ? '● ' : '') + shortName(c.name), hue(c.name), view.tab === c.name))
  const { page, pages } = sections(s, view.tab)
  if (view.tab !== 'now' && pages > 1) {
    out.push(
      Button({ key: 'vba-newer', dimColor: page === 0, onPress: () => setView($, { page: Math.max(0, page - 1) }), children: ['\u2007◀\u2007'] }),
      Button({ key: 'vba-older', dimColor: page >= pages - 1, onPress: () => setView($, { page: Math.min(pages - 1, page + 1) }), children: ['\u2007▶\u2007'] }),
    )
  }
  return Box({ flexDirection: 'row', gap: 1, flexWrap: 'wrap', children: out })
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
    const theirs = await next(e)
    // A chat that left the team takes its tab with it.
    if (!['now', 'done', 'all'].includes(view.tab) && !snapshot.team.some((c) => c.name === view.tab)) view = { tab: 'now', page: 0 }
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
    const strip = !folded && Button ? tabs($, snapshot, Button, Box, Text) : null
    if (e.surface === 'desktop' && Svg) {
      // Without a size the frame takes the default 150 px height and centres the card in empty space; draw it at the
      // scale the band showed it (about 750 px wide) with the height that keeps its proportions.
      // Same board, same fold, same tab and page, same minute: hand over the very markup drawn before.
      const key = JSON.stringify(snapshot) + '|' + folded + '|' + JSON.stringify(view) + '|' + Math.floor(Date.now() / 60000)
      if (drawn.key !== key) drawn = { key, source: card(snapshot, folded, view.tab) }
      const source = drawn.source
      const height = Number(source.match(/height="(\d+)"/)[1])
      const frame = Svg({ alt: altText(snapshot), source, width: SHOWN_W, height: Math.round((height * SHOWN_W) / W) })
      // The card keeps one width folded and unfolded, so the chevron stays put beside its top row.
      let band = toggle ? Box({ flexDirection: 'row', alignItems: 'flex-start', gap: 1, children: [frame, toggle] }) : frame
      if (strip) band = Box({ flexDirection: 'column', gap: 1, children: [strip, band] })
      return theirs ? Box({ flexDirection: 'column', children: [band, theirs] }) : band
    }
    const lines = (folded ? [foldedRow(snapshot)] : rows(snapshot, view.tab)).map((row) =>
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
    if (strip) lines.unshift(strip)
    return Box({ flexDirection: 'column', children: theirs ? [...lines, theirs] : lines })
  })
}
