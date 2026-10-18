#!/usr/bin/env python3
"""Where the chats' tokens and time go, by kind of action and per delivered task.

    python3 tools/work_profile.py [--since 2026-10-11] [--tasks 8]

Local sources only: Claude Code transcripts of this project and its worktrees (~/.claude/projects/<projects folder>*/
*.jsonl). Every API call re-reads the chat's whole context, so a call's tokens are its context size: the categories
show which kinds of action make the calls (and so cost the tokens), and the average context per call shows how much a
long chat makes every call cost. Checks = probes (tools/probe.py, tools/shot.mjs, `node --test`), reading probe logs,
viewing probe frames (Logs/probes/*.png), waiting/polling and deliveries.
A task runs from a message to the chat (user or another chat) to its delivery — a `deliveries.jsonl` row of the
worktree the chat names most in its tool calls — and the report the chat sends right after it; its minutes leave out
pauses over 30 min.
tools/process_report.py imports the parsing, categories and task split from here. Ported from The Village.
"""
import argparse
import collections
import datetime
import functools
import glob
import json
import os
from pathlib import Path
import re
import statistics

from activity import STATE

CHECKS = {'probe', 'read probe log', 'view frame', 'wait/poll', 'deliver'}
REPORT_WINDOW = datetime.timedelta(minutes=10)  # a report sent this soon after a delivery still belongs to its task
IDLE_MINUTES = 30  # a longer pause inside a task (night, waiting for the user) is not counted in its minutes
MAIN = STATE.parent.parent  # the main checkout (<main>/.git); worktrees sit next to it as <main>-<name>


def transcripts(subagents=False):
    """Transcripts of this project and its worktrees; subagents' runs apart. Claude keeps a chat under the folder it
    started in, every non-alphanumeric character turned into '-'. VBA chats start in the folder that holds the main
    checkout and the worktrees (Very Big Adventure), so its name is the prefix of all of them."""
    project = re.sub(r'[^A-Za-z0-9]', '-', str(MAIN.parent))
    tail = '*/subagents/*.jsonl' if subagents else '*.jsonl'
    return glob.glob(os.path.expanduser(f'~/.claude/projects/{project}*/{tail}'))


def is_pm(title):
    return re.sub(r'\s+', '', title or '').lower() == 'pm'


def read_log(name):
    """Rows of a vba-pipeline log (deliveries.jsonl, activity.jsonl, effort.jsonl…); broken lines are skipped."""
    rows = []
    try:
        with (STATE / name).open(encoding='utf-8') as lines:
            for line in lines:
                try:
                    rows.append(json.loads(line))
                except ValueError:
                    pass
    except OSError:
        pass
    return rows


def moment(text):
    """A log or transcript time as an aware datetime; naive text (deliveries, activity) is local time."""
    return datetime.datetime.fromisoformat(text.replace('Z', '+00:00')).astimezone(datetime.timezone.utc)


def utc(text):
    """Any log time as transcript-style UTC text, so that plain string comparison orders them."""
    return moment(text).strftime('%Y-%m-%dT%H:%M:%S.000Z')


def minutes(start, end):
    return (moment(end) - moment(start)).total_seconds() / 60


@functools.lru_cache()
def worktree_mention():
    """The worktree suffix of a path in a tool call: <main>-<name>, <main>-worktrees/<name> or Claude's own worktree.
    The folders have spaces, so a shell-escaped space (`\\ `, doubled in JSON) counts too."""
    main = r'(?:\\\\)?\ '.join(re.escape(part) for part in str(MAIN).split(' '))
    return re.compile(main + r'(-worktrees/[\w.-]+|-[\w-]+|/\.claude/worktrees/[\w-]+)')


def category(name, args):
    if name == 'Bash':
        command = args.get('command', '')
        if 'pipeline.py deliver' in command:
            return 'deliver' if '--dry-run' not in command else 'probe'
        if re.search(r'tools/probe\.py|tools/shot\.mjs|\bnode\b[^;&|\n]*--test(?![\w-])', command):
            return 'probe'
        if re.search(r'\bsleep\b|\buntil\b|\bwhile\b', command):
            return 'wait/poll'
        if re.search(r'^\s*(cd [^;&]+&&\s*)?git\b', command):
            return 'git'
        reading = re.search(r'\b(grep|rg|sed -n|cat|head|tail|find|ls|wc)\b', command)
        if reading and re.search(r'Logs/|\.log\b|probes/', command):
            return 'read probe log'
        return 'read/search code' if reading else 'other shell'
    if name == 'Read':
        path = args.get('file_path', '')
        if re.search(r'\.(png|jpe?g|webp|gif)$', path, re.I):
            return 'view frame' if 'Logs/probes/' in path else 'view image'  # frames are checks, art is not
        return 'read probe log' if re.search(r'Logs/|\.log$', path) else 'read/search code'
    if name in ('Grep', 'Glob'):
        return 'read/search code'
    if name in ('Edit', 'Write', 'MultiEdit', 'NotebookEdit'):
        return 'edit'
    if name in ('SendMessage', 'SendUserFile') or name.endswith('send_message'):
        return 'messages'
    if name in ('Monitor', 'TaskOutput', 'BashOutput', 'ScheduleWakeup'):
        return 'wait/poll'
    if name in ('Agent', 'Task'):
        return 'subagent'
    return 'other tool'  # MCP tools (browser, editors) included


def calls_of(path, since, until='9999'):
    """The chat's title and its events in order, from `since` to `until` (UTC text): ('in', time) for a message to the
    chat, ('compact', {time, pre}) for a context compaction and ('call', {time, prev, ctx, out, cats, worktrees}) for an
    API call; prev is the time of the row before it (reply latency), worktrees the worktree paths named in its tools."""
    title, order, calls, prev = None, [], {}, None
    mention = worktree_mention()
    with open(path, encoding='utf-8') as lines:
        for line in lines:
            try:
                row = json.loads(line)
            except ValueError:
                continue
            if not isinstance(row, dict):
                continue
            title = row.get('customTitle', title)
            stamp, kind = row.get('timestamp'), row.get('type')
            if not stamp or stamp < since or stamp >= until:
                prev = stamp if kind in ('user', 'assistant') else prev
                continue
            message = row.get('message') or {}
            content = message.get('content')
            if kind == 'system' and row.get('subtype') == 'compact_boundary':
                order.append(('compact', {'time': stamp, 'pre': (row.get('compactMetadata') or {}).get('preTokens')}))
            elif kind == 'user':
                text = content if isinstance(content, str) else ''.join(
                    b.get('text', '') for b in content or [] if isinstance(b, dict) and b.get('type') == 'text')
                result = isinstance(content, list) and any(isinstance(b, dict) and b.get('type') == 'tool_result'
                                                           for b in content)
                if text and not result and '<task-notification>' not in text \
                        and 'This session is being continued' not in text:
                    order.append(('in', stamp))
                prev = stamp
            elif kind == 'assistant':
                key = message.get('id') or stamp
                usage = message.get('usage') or {}
                if key not in calls:
                    calls[key] = {'time': stamp, 'prev': prev, 'cats': set(), 'worktrees': collections.Counter()}
                    order.append(('call', key))
                call = calls[key]
                call['ctx'] = sum(usage.get(k) or 0 for k in ('input_tokens', 'cache_read_input_tokens',
                                                              'cache_creation_input_tokens'))
                call['out'] = usage.get('output_tokens') or 0
                for block in content if isinstance(content, list) else []:
                    if isinstance(block, dict) and block.get('type') == 'tool_use':
                        call['cats'].add(category(block.get('name', ''), block.get('input') or {}))
                        call['worktrees'].update(mention.findall(json.dumps(block.get('input'), ensure_ascii=False)))
                prev = stamp
    return title, [(kind, calls[value] if kind == 'call' else value) for kind, value in order]


def deliveries_by_chat(chats, since, until='9999'):
    """{chat key: [(UTC time, deliveries.jsonl row)]} from `since` to `until`, chats being {key: events}. A worktree's
    deliveries go to the chat that names that worktree most in its tool calls."""
    best, main_folder = {}, str(MAIN)
    for key, events in chats.items():
        named = collections.Counter()
        for kind, value in events:
            if kind == 'call':
                named.update(value['worktrees'])
        for suffix, count in named.items():
            if count > best.get(main_folder + suffix, (0, None))[0]:
                best[main_folder + suffix] = (count, key)
    found = collections.defaultdict(list)
    for row in read_log('deliveries.jsonl'):
        when = row.get('installed') or row.get('started')
        if when and row.get('worktree') in best and since <= utc(when) < until:
            found[best[row['worktree']][1]].append((utc(when), row))
    return {key: sorted(rows, key=lambda pair: pair[0]) for key, rows in found.items()}


def tasks_of(title, events, delivered):
    """A chat's delivered tasks. A task starts with the first message to the chat after the previous task (or right
    after it, for another delivery with no new message) and ends with its delivery; the report the chat sends within
    REPORT_WINDOW after it, before any new message, still counts. Its minutes are active ones: pauses longer than
    IDLE_MINUTES are left out (wall: start to delivery). delivered: [(UTC time, row)], sorted."""
    pending, tasks = list(delivered), []
    task = closing = loose = None

    def new(start):
        return {'chat': title, 'start': start, 'calls': 0, 'ctx': 0, 'checks': 0, 'check_calls': 0, 'compacts': [],
                'minutes': 0.0, 'last': start}

    def tick(target, stamp):
        pause = minutes(target['last'], stamp)
        target['minutes'] += pause if 0 < pause <= IDLE_MINUTES else 0
        target['last'] = max(target['last'], stamp)

    def close(target, when, row):
        tick(target, when)
        target.update(end=when, delivery=row, wall=minutes(target['start'], when),
                      deadline=utc((moment(when) + REPORT_WINDOW).isoformat()))
        return target

    for kind, value in events:
        stamp = value if kind == 'in' else value['time']
        if closing and (kind == 'in' or stamp > closing['deadline'] or (pending and stamp >= pending[0][0])):
            tasks.append(closing)
            closing = None
        while pending and stamp >= pending[0][0]:
            when, row = pending.pop(0)
            if closing:
                tasks.append(closing)
            closing = close(task or loose or new(when), when, row)
            task, loose = None, new(when)
        if kind == 'in':
            if task:
                tick(task, stamp)
            task = task or new(stamp)
        elif kind == 'compact' and task:
            task['compacts'].append(stamp)
        elif kind == 'call' and (closing or task or loose):
            target, cats = closing or task or loose, value['cats'] or {'(answer, thinking)'}
            if not closing:
                tick(target, stamp)
            target['calls'] += 1
            target['ctx'] += value['ctx']
            target['checks'] += value['ctx'] * len(cats & CHECKS) / len(cats)
            target['check_calls'] += len(cats & CHECKS) / len(cats)
            if closing and 'messages' in cats:
                tasks.append(closing)
                closing = None
    if closing:
        tasks.append(closing)
    for when, row in pending:  # delivered after the chat's last event in range
        if task or loose:
            tasks.append(close(task or loose, when, row))
            task = loose = None
    return [t for t in tasks if t['calls']]


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--since', default=(datetime.date.today() - datetime.timedelta(days=2)).isoformat())
    parser.add_argument('--tasks', type=int, default=8, help='show the costliest delivered tasks')
    args = parser.parse_args()
    events_of, titles = {}, {}
    for path in transcripts():
        title, events_of[path] = calls_of(path, args.since)
        titles[path] = title or Path(path).stem[:8]
    delivered = deliveries_by_chat(events_of, args.since)
    by_cat, chats, tasks = collections.defaultdict(collections.Counter), {}, []
    for path, events in events_of.items():
        title, total = titles[path], collections.Counter()
        for kind, value in events:
            if kind != 'call':
                continue
            cats = value['cats'] or {'(answer, thinking)'}
            total['calls'] += 1
            total['ctx'] += value['ctx']
            total['out'] += value['out']
            for cat in cats:
                by_cat[cat]['calls'] += 1 / len(cats)
                by_cat[cat]['ctx'] += value['ctx'] / len(cats)
        if not is_pm(title):
            tasks += tasks_of(title, events, delivered.get(path, []))
        if total['calls']:
            chats[title] = chats.get(title, collections.Counter()) + total
    grand = sum(chats.values(), collections.Counter())
    if not grand['calls'] or not grand['ctx']:
        raise SystemExit('No transcripts since ' + args.since)
    print(f"Since {args.since}: {grand['calls']} API calls, {grand['ctx'] / 1e6:.0f}M context tokens read, "
          f"{grand['out'] / 1e3:.0f}k written; {grand['ctx'] / grand['calls'] / 1e3:.0f}k context per call on average")
    for title, total in sorted(chats.items(), key=lambda kv: -kv[1]['ctx']):
        print(f"  {title:28} {total['calls']:5} calls {total['ctx'] / 1e6:7.0f}M  {total['ctx'] / total['calls'] / 1e3:4.0f}k/call")
    print('\nBy kind of action (share of calls = share of tokens):')
    checks = 0
    for cat, value in sorted(by_cat.items(), key=lambda kv: -kv[1]['ctx']):
        share = 100 * value['ctx'] / grand['ctx']
        checks += share if cat in CHECKS else 0
        print(f"  {cat:22} {share:5.1f}%{'  check' if cat in CHECKS else ''}")
    print(f"  checks together       {checks:5.1f}%")
    if tasks:
        spent = [t['minutes'] for t in tasks]
        ctx = [t['ctx'] / 1e6 for t in tasks]
        print(f"\nDelivered tasks: {len(tasks)}; median {statistics.median(spent):.0f} min, "
              f"{statistics.median([t['calls'] for t in tasks]):.0f} calls, {statistics.median(ctx):.0f}M tokens; "
              f"checks {100 * sum(t['checks'] for t in tasks) / max(1, sum(t['ctx'] for t in tasks)):.0f}% of task tokens")
        for t in sorted(tasks, key=lambda t: -t['ctx'])[:args.tasks]:
            print(f"  {t['chat']:12} {t['minutes']:5.0f} min {t['calls']:4} calls {t['ctx'] / 1e6:5.0f}M  "
                  f"checks {100 * t['checks'] / max(1, t['ctx']):3.0f}%  from {t['start'][:16]}")
    else:
        print('\nDelivered tasks: none yet (deliveries.jsonl has no rows of these chats).')


if __name__ == '__main__':
    main()
