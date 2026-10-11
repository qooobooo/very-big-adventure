#!/usr/bin/env python3
"""Daily report of seven process metrics, for a scheduled session to forward as is. Ported from The Village (its eight
metrics, picked by the user on 5 Oct 2026, minus Codex runs).

    python3 tools/process_report.py [--day 2026-10-11] [--usage-week 36] [--usage-5h-peak 80] [--json]

The day defaults to yesterday, local time. Plan usage can't be read locally: the scheduled session passes it from its
get_usage tool. The rest comes from the chats' transcripts (parsed by tools/work_profile.py: categories, checks,
delivered tasks) and the vba-pipeline logs: deliveries.jsonl, activity.jsonl (probes, checks), effort.jsonl. One row
per day goes to <git common dir>/vba-pipeline/metrics.jsonl (a rerun replaces the day's row); the report sets the day
against the previous reported day and the baseline (BASE: none yet, shown as «база —»). --json prints that row
instead of the report.
"""
import argparse
import collections
import datetime
import json
import os
from pathlib import Path
import re
import statistics
import subprocess

from work_profile import (STATE, calls_of, deliveries_by_chat, is_pm, moment, read_log, tasks_of, transcripts, utc)

CHAT_ORDER = ['gd1', 'gd2', 'gd3', 'dev1', 'dev2', 'dev3', 'art/ui1', 'art/ui2', 'art/ui3', 'qa1', 'qa2', 'pm']
WEEK_RESET = datetime.date(2026, 10, 9)  # the plan's week restarts every 7 days from here (the plan The Village uses)
BINS = [('до 100k', 0, 100e3), ('100–200k', 100e3, 200e3), ('200–300k', 200e3, 300e3), ('от 300k', 300e3, 1e12)]
# Baselines: VBA has no history yet. Fill in from the first quiet week; until then every «база» prints «—» and no
# «лучше/хуже базы» verdict is drawn. task: {'min', 'calls', 'tokens_m'}, like a by_chat entry.
BASE = {'usage_pace': None, 'task': None, 'task_tokens_m': None, 'pm_pct': None, 'ctx_k': None, 'checks_pct': None,
        'deliver_s': None}
MONTHS = 'янв фев мар апр мая июн июл авг сен окт ноя дек'.split()
WEEKDAYS = 'пн вт ср чт пт сб вс'.split()
LEVELS = ['max', 'xhigh', 'high', 'medium', 'low']


def norm(name):
    return re.sub(r'\s+', '', name or '').lower()


def median(values):
    values = [v for v in values if v is not None]
    return statistics.median(values) if values else None


def share(part, whole):
    return 100 * part / whole if whole else None


def r1(value):
    return None if value is None else round(value, 1)


def num(value, digits=0, unit=''):
    if value is None:
        return '—'
    text = f'{value:.{digits}f}'.replace('.', ',').replace('-', '−')
    return text + unit


def verdict(value, base, tolerance=0.15, points=None):
    """лучше базы, хуже базы or так же for a lower-is-better value against the baseline; empty when unclear."""
    if value is None or base is None:
        return ''
    if points is not None:
        delta = value - base
        word = 'лучше базы' if delta <= -points else 'хуже базы' if delta >= points else 'так же, как база'
    elif base == 0:
        word = 'так же, как база' if value <= 1 else 'хуже базы'
    else:
        ratio = value / base
        word = 'лучше базы' if ratio <= 1 - tolerance else 'хуже базы' if ratio >= 1 + tolerance else 'так же, как база'
    return f' → {word}'


def task_cost(tasks):
    return {'tasks': len(tasks), 'min': r1(median(t['minutes'] for t in tasks)),
            'calls': r1(median(t['calls'] for t in tasks)), 'tokens_m': r1(median(t['ctx'] / 1e6 for t in tasks))}


def cost_text(cost):
    if not cost or cost.get('tasks') == 0:
        return '—'
    return f"{num(cost.get('min'))} мин · {num(cost.get('calls'))} выз. · {num(cost.get('tokens_m'), 1)} млн"


def repeated(rows):
    """Keys of deliveries that redo one of the same worktree's last 24 h: the same task slug or that slug extended."""
    seen, found = collections.defaultdict(list), set()
    for row in sorted(rows, key=lambda r: utc(r.get('installed') or r.get('started'))):
        when, slug = moment(row.get('installed') or row.get('started')), row.get('task') or ''
        earlier = seen[row.get('worktree')]
        if slug and any(when - at < datetime.timedelta(days=1) and (slug == s or slug.startswith(s + '-'))
                        for at, s in earlier):
            found.add(key_of(row))
        earlier.append((when, slug))
    return found


ASKED = re.compile(r'\buser\b|пользовател', re.I)


def asked(row):
    """A repeat the user asked for (another round of his tweaks) rather than the chat fixing its own work: the
    delivered commit says so, as executors write «(user via PM)» or «просьба пользователя»."""
    if not row.get('commit'):
        return False
    try:
        text = subprocess.run(['git', 'log', '-1', '--format=%B', row['commit']], capture_output=True,
                              text=True, cwd=Path(__file__).resolve().parent).stdout
    except OSError:
        return False
    return bool(ASKED.search(text))


def key_of(row):
    return row.get('worktree'), row.get('installed') or row.get('started'), row.get('task')


def match_effort(tasks, rows, since):
    """Each effort.jsonl row from `since` on goes to its chat's first delivered task that ends after it and has no
    level yet, so a level set for a queued task lands on that task."""
    ordered = sorted(tasks, key=lambda t: t['end'])
    for row in sorted(rows, key=lambda r: r['at']):
        if row['at'] < since:
            continue
        for task in ordered:
            if norm(task['chat']) == norm(row.get('chat')) and task['end'] > row['at'] and 'effort' not in task:
                task['effort'] = row.get('level') or row.get('effort') or '?'
                break


def collect(day):
    start_local = datetime.datetime.combine(day, datetime.time())
    start, end = utc(start_local.isoformat()), utc((start_local + datetime.timedelta(days=1)).isoformat())
    since = utc((start_local - datetime.timedelta(days=1)).isoformat())  # tasks delivered today may start yesterday
    in_day = lambda stamp: stamp and start <= stamp < end  # noqa: E731
    fresh = lambda path: os.path.getmtime(path) >= start_local.timestamp()  # noqa: E731

    events_of, titles = {}, {}
    for path in filter(fresh, transcripts()):
        title, events_of[path] = calls_of(path, since, end)
        titles[path] = title or Path(path).stem[:8]  # PM is the chat titled "PM"
    by_session = {Path(path).stem: title for path, title in titles.items()}
    tokens, calls_n = collections.Counter(), 0
    day_calls, compactions = [], []
    for path, events in events_of.items():
        for kind, value in events:
            if kind == 'call' and in_day(value['time']):
                tokens[titles[path]] += value['ctx']
                calls_n += 1
                day_calls.append(value)
            elif kind == 'compact' and in_day(value['time']):
                compactions.append((titles[path], value))
    sub_tokens = collections.Counter()
    for path in filter(fresh, transcripts(subagents=True)):
        owner = by_session.get(Path(path).parents[1].name, '?')
        for kind, value in calls_of(path, start, end)[1]:
            if kind == 'call':
                sub_tokens[owner] += value['ctx']

    delivered = deliveries_by_chat(events_of, since, end)
    tasks = []
    for path, events in events_of.items():
        if not is_pm(titles[path]):
            tasks += tasks_of(titles[path], events, delivered.get(path, []))
    efforts = []
    for row in read_log('effort.jsonl'):
        try:
            efforts.append(dict(row, at=utc(row['time'])))
        except (KeyError, TypeError, ValueError, AttributeError):
            pass
    match_effort(tasks, efforts, since)
    all_deliveries = []
    for row in read_log('deliveries.jsonl'):
        try:
            if utc(row.get('installed') or row.get('started')):
                all_deliveries.append(row)
        except (TypeError, ValueError, AttributeError):
            pass
    redo = repeated(all_deliveries)
    day_tasks = [t for t in tasks if in_day(t['end'])]
    for task in day_tasks:
        task['repeat'] = key_of(task['delivery']) in redo
        task['fix'] = task['repeat'] and not asked(task['delivery'])
    deliveries = [r for r in all_deliveries if in_day(utc(r.get('installed') or r.get('started')))]
    app = [r for r in deliveries if r.get('app', True)]  # app: False = tools/docs only, no game probes
    checked = [r['work'] for r in app if isinstance(r.get('work'), dict)]

    row = {'day': day.isoformat(), 'made': datetime.datetime.now().isoformat(timespec='seconds'),
           'day_calls': calls_n, 'deliveries': len(deliveries), 'deliveries_app': len(app)}
    row.update(task_cost(day_tasks))
    by_chat = collections.defaultdict(list)
    for task in day_tasks:
        by_chat[task['chat']].append(task)
    row['by_chat'] = {chat: task_cost(items) for chat, items in by_chat.items()}
    everything = sum(tokens.values()) + sum(sub_tokens.values())
    pm_tokens = sum(n for title, n in tokens.items() if is_pm(title)) + \
        sum(n for title, n in sub_tokens.items() if is_pm(title))
    row['pm_pct'] = r1(share(pm_tokens, everything))
    row['pm_tokens_m'] = r1(pm_tokens / 1e6)
    row['all_tokens_m'] = r1(everything / 1e6)

    row['ctx_k'] = r1(sum(c['ctx'] for c in day_calls) / len(day_calls) / 1e3) if day_calls else None
    latency = collections.defaultdict(list)
    for call in day_calls:
        if call.get('prev') and call['ctx']:
            seconds = (moment(call['time']) - moment(call['prev'])).total_seconds()
            if 0 < seconds < 600:
                latency[next(name for name, low, high in BINS if low <= call['ctx'] < high)].append(seconds)
    row['latency_s'] = {name: [r1(median(latency[name])), len(latency[name])] for name, _, _ in BINS
                        if latency[name]}
    row['compactions'] = len(compactions)
    row['compaction_pre_k'] = r1(median((c['pre'] or 0) / 1e3 for _, c in compactions))
    row['compactions_mid_task'] = sum(1 for t in tasks for stamp in t['compacts'] if in_day(stamp))
    worker_compactions = sum(1 for title, _ in compactions if not is_pm(title))
    row['tasks_per_window'] = r1(len(day_tasks) / worker_compactions) if worker_compactions else None

    row['checks_pct'] = r1(share(sum(t['checks'] for t in day_tasks), sum(t['ctx'] for t in day_tasks)))
    row['check_calls_pct'] = r1(share(sum(t['check_calls'] for t in day_tasks), sum(t['calls'] for t in day_tasks)))
    row['probes_before'] = r1(median(w.get('probes') for w in checked))
    row['other_checks_before'] = r1(median(w.get('checks') for w in checked))
    row['first_check_min'] = r1(median(w.get('from_first_check_min') for w in checked))
    row['straight_pct'] = r1(share(sum(1 for w in checked if not w.get('probes') and not w.get('checks')),
                                   len(checked)))

    levels = collections.defaultdict(list)
    for task in day_tasks:
        levels[task.get('effort', 'без записи')].append(task)
    row['effort'] = {level: dict(task_cost(items), repeat_pct=r1(share(sum(t['repeat'] for t in items), len(items))),
                                 fix_pct=r1(share(sum(t['fix'] for t in items), len(items))))
                     for level, items in levels.items()}

    row['deliver_s'] = r1(median(r.get('total_s') for r in app))
    row['probe_s'] = r1(median(r.get('probe_s') for r in app))
    row['queue_s'] = r1(median(r.get('queue_wait_s') for r in app))
    row['redone_pct'] = r1(share(sum(1 for r in deliveries if r.get('redone')), len(deliveries)))
    row['repeat_pct'] = r1(share(sum(1 for r in deliveries if key_of(r) in redo), len(deliveries)))
    row['fix_pct'] = r1(share(sum(1 for r in deliveries if key_of(r) in redo and not asked(r)), len(deliveries)))
    return row


def metrics_path():
    return STATE / 'metrics.jsonl'


def save(row):
    path = metrics_path()
    rows = [r for r in read_log('metrics.jsonl') if isinstance(r, dict) and r.get('day') and r['day'] != row['day']]
    path.parent.mkdir(exist_ok=True)
    temporary = path.with_suffix('.tmp')
    temporary.write_text(''.join(json.dumps(r, ensure_ascii=False) + '\n' for r in sorted(rows + [row],
                                                                                        key=lambda r: r['day'])),
                         encoding='utf-8')
    temporary.replace(path)


def date_text(day):
    return f'{day.day} {MONTHS[day.month - 1]}'


def report(row, prev):
    day = datetime.date.fromisoformat(row['day'])
    p = prev or {}
    was = f"пред. {date_text(datetime.date.fromisoformat(p['day']))}" if prev else 'пред. —'
    lines = [f"**Процесс за {date_text(day)} ({WEEKDAYS[day.weekday()]})**: {row['day_calls']} вызовов, "
             f"{num(row['all_tokens_m'], 0)} млн токенов, доставок {row['deliveries']} "
             f"(с игрой {row['deliveries_app']}). В скобках — {was} и база.", '']

    week, peak = row.get('usage_week'), row.get('usage_5h_peak')
    reset = WEEK_RESET + datetime.timedelta(days=7 * max(0, -(-(day - WEEK_RESET).days // 7)))
    if week is None and peak is None:
        lines.append('1. **Бюджет плана**: не передан (`--usage-week`, `--usage-5h-peak` из get_usage).')
    else:
        pace, note = None, ''
        if p.get('usage_week') is not None and week is not None:
            gap = (day - datetime.date.fromisoformat(p['day'])).days or 1
            pace = (week - p['usage_week']) / gap
            note = f"; за день {num(pace, 0, ' п.п.')}" if pace >= 0 else '; неделя сброшена'
        lines.append(f"1. **Бюджет плана**: неделя {num(week, 0, ' %')}{note}, пик 5 ч {num(peak, 0, ' %')} "
                     f"(пред. {num(p.get('usage_week'), 0, ' %')} и {num(p.get('usage_5h_peak'), 0, ' %')}; "
                     f"база {num(BASE['usage_pace'], 0, ' п.п./день')}, норма недели 14); сброс {date_text(reset)}"
                     f"{verdict(pace, BASE['usage_pace']) if pace is not None and pace >= 0 else ''}.")

    clear = row['tasks'] >= 3
    lines.append(f"2. **Цена задачи** ({row['tasks']} задач, медиана): {cost_text(row)} "
                 f"(пред. {cost_text(p)}; база {cost_text(BASE['task'])})"
                 f"{verdict(row['tokens_m'], BASE['task_tokens_m']) if clear else ''}.")
    ordered = sorted(row['by_chat'].items(), key=lambda kv: (CHAT_ORDER.index(norm(kv[0]))
                                                              if norm(kv[0]) in CHAT_ORDER else 99, kv[0]))
    for chat, cost in ordered:
        lines.append(f"   - {chat} ×{cost['tasks']}: {cost_text(cost)}")

    lines.append(f"3. **Доля PM**: {num(row['pm_pct'], 0, ' %')} токенов дня ({num(row['pm_tokens_m'], 0)} из "
                 f"{num(row['all_tokens_m'], 0)} млн, с субагентами; пред. {num(p.get('pm_pct'), 0, ' %')}; "
                 f"база {num(BASE['pm_pct'], 0, ' %')}).")

    lines.append(f"4. **Контекст**: {num(row['ctx_k'], 0)} тыс. на вызов (пред. {num(p.get('ctx_k'), 0)}; "
                 f"база {num(BASE['ctx_k'], 0)}){verdict(row['ctx_k'], BASE['ctx_k'])}.")
    bins = ' · '.join(f"{name} {num(row['latency_s'][name][0], 1, ' с')}" for name, _, _ in BINS
                      if name in row['latency_s'])
    lines.append(f"   - задержка ответа (медиана): {bins or '—'} (база —)")
    lines.append(f"   - сжатий {row['compactions']} (посреди задачи {row['compactions_mid_task']}, "
                 f"медиана до сжатия {num(row['compaction_pre_k'], 0)} тыс.), задач на окно "
                 f"{num(row['tasks_per_window'], 1)} (пред. {p.get('compactions', '—')} и "
                 f"{num(p.get('tasks_per_window'), 1)}; база —)")

    lines.append(f"5. **Проверки**: {num(row['checks_pct'], 0, ' %')} токенов задачи, "
                 f"{num(row['check_calls_pct'], 0, ' %')} вызовов (пред. {num(p.get('checks_pct'), 0, ' %')}; "
                 f"база {num(BASE['checks_pct'], 0, ' %')})"
                 f"{verdict(row['checks_pct'], BASE['checks_pct'], points=5) if clear else ''}.")
    lines.append(f"   - до доставки (медиана): проб {num(row['probes_before'], 1)}, других проверок "
                 f"{num(row['other_checks_before'], 1)}, от первой проверки {num(row['first_check_min'], 0, ' мин')}; "
                 f"сразу в deliver {num(row['straight_pct'], 0, ' %')} (пред. {num(p.get('straight_pct'), 0, ' %')})")

    lines.append('6. **Размышления** (база —):' + ('' if row['effort'] else ' задач нет.'))
    for level in sorted(row['effort'], key=lambda name: LEVELS.index(name) if name in LEVELS else 9):
        cost, old = row['effort'][level], (p.get('effort') or {}).get(level, {})
        lines.append(f"   - {level} ×{cost['tasks']}: {cost_text(cost)}, повторов {num(cost['repeat_pct'], 0, ' %')}"
                     f", из них исправлений {num(cost.get('fix_pct'), 0, ' %')} (пред. {cost_text(old)})")

    lines.append(f"7. **Доставка** ({row['deliveries_app']} с игрой, медиана): {num(row['deliver_s'], 0, ' с')} "
                 f"(пробы {num(row['probe_s'], 0)}), очередь {num(row['queue_s'], 0, ' с')}, переделок на новом dev "
                 f"{num(row['redone_pct'], 0, ' %')}, повторов {num(row['repeat_pct'], 0, ' %')}, из них исправлений "
                 f"{num(row['fix_pct'], 0, ' %')} (пред. {num(p.get('deliver_s'), 0, ' с')}, "
                 f"{num(p.get('redone_pct'), 0, ' %')}; база {num(BASE['deliver_s'], 0, ' с')})"
                 f"{verdict(row['deliver_s'], BASE['deliver_s']) if row['deliveries_app'] >= 3 else ''}.")
    lines.append('')
    lines.append('_Повтор — доставка той же задачи или её продолжения (`slug-…`) из той же папки за сутки. '
                 'Исправление — повтор, в коммите которого нет просьбы пользователя: чат чинит своё, а не '
                 'дорабатывает по новым словам пользователя._')
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--day', default=(datetime.date.today() - datetime.timedelta(days=1)).isoformat(),
                        help='local day, YYYY-MM-DD (default: yesterday)')
    parser.add_argument('--usage-week', type=float, help='weekly plan used, %% (from get_usage)')
    parser.add_argument('--usage-5h-peak', type=float, help='peak of the 5-hour window that day, %% (from get_usage)')
    parser.add_argument('--json', action='store_true', help="print the day's metrics.jsonl row instead of the report")
    args = parser.parse_args()
    day = datetime.date.fromisoformat(args.day)
    history = [r for r in read_log('metrics.jsonl') if isinstance(r, dict) and r.get('day')]
    old = next((r for r in history if r['day'] == args.day), {})
    row = collect(day)
    row['usage_week'] = args.usage_week if args.usage_week is not None else old.get('usage_week')
    row['usage_5h_peak'] = args.usage_5h_peak if args.usage_5h_peak is not None else old.get('usage_5h_peak')
    save(row)
    prev = max((r for r in history if r['day'] < args.day), key=lambda r: r['day'], default=None)
    print(json.dumps(row, ensure_ascii=False, indent=1) if args.json else report(row, prev))


if __name__ == '__main__':
    main()
