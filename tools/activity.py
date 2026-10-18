"""A local log of probes and checks, per worktree, for the line `pipeline.py deliver` adds to its message.

Each finished probe (tools/probe.py, tools/shot.mjs, `node --test`) appends a row to
<git common dir>/vba-pipeline/activity.jsonl: worktree, kind, name, start, secs, ok, and whether `deliver` ran it.
The same folder keeps the other journals: deliveries.jsonl, effort.jsonl, metrics.jsonl.
Nothing leaves the Mac; a failure to write never fails the probe. Ported from The Village (tools/village_activity.py
and pipeline.py work_summary), minus Unity builds: `node --check` takes seconds and is not logged.
"""
import atexit
import datetime
import json
import os
from pathlib import Path
import subprocess
import time

TOOLS = Path(__file__).resolve().parent


def _git(*args):
    try:
        return subprocess.run(['git', *args], cwd=TOOLS.parent, text=True, capture_output=True).stdout.strip()
    except OSError:
        return ''


FOLDER = _git('rev-parse', '--show-toplevel') or str(TOOLS.parent)  # this worktree, as deliveries.jsonl names it
STATE = Path(_git('rev-parse', '--path-format=absolute', '--git-common-dir') or TOOLS.parent / '.git') / 'vba-pipeline'
try:
    STATE.mkdir(exist_ok=True)
except OSError:
    pass


def _moment(started):
    """A start given as time.time(), a datetime or local ISO text, as a naive local datetime."""
    if isinstance(started, (int, float)):
        return datetime.datetime.fromtimestamp(started)
    if isinstance(started, str):
        started = datetime.datetime.fromisoformat(started)
    if started.tzinfo:
        started = started.astimezone().replace(tzinfo=None)
    return started


def record(kind, name, started, seconds, ok):
    """One finished probe ('probe') or other check ('check'). started: time.time(), a datetime or local ISO text;
    seconds: its length, or None for now − started."""
    try:
        start = _moment(started)
        if seconds is None:
            seconds = (datetime.datetime.now() - start).total_seconds()
        row = {'worktree': FOLDER, 'kind': kind, 'name': name, 'start': start.isoformat(timespec='seconds'),
               'secs': round(seconds, 1),
               'ok': bool(ok), 'deliver': os.environ.get('VBA_DELIVER') == '1'}
        with (STATE / 'activity.jsonl').open('a', encoding='utf-8') as log:
            log.write(json.dumps(row, ensure_ascii=False) + '\n')
    except Exception:
        pass


class track:
    """Record this process as one probe or check when it exits; call .passed() on success."""

    def __init__(self, kind, name):
        self.kind, self.name, self.started, self.ok = kind, name, time.time(), False
        atexit.register(lambda: record(self.kind, self.name, self.started, None, self.ok))

    def passed(self):
        self.ok = True


def since(worktree, start):
    """Rows of one worktree from a moment on (ISO text)."""
    rows = []
    try:
        for line in (STATE / 'activity.jsonl').read_text(encoding='utf-8').splitlines():
            try:
                rows.append(json.loads(line))
            except ValueError:
                pass
    except OSError:
        return []
    return [row for row in rows if row.get('worktree') == str(worktree) and row.get('start', '') >= start]


def work_summary(started):
    """Probes and checks of this worktree since its previous delivery, and this delivery (started: its time.time()).
    The delivery's own probes (VBA_DELIVER=1) are left out."""
    previous = ''
    try:
        for line in (STATE / 'deliveries.jsonl').read_text(encoding='utf-8').splitlines():
            row = json.loads(line) if line.strip() else {}
            if row.get('worktree') == FOLDER:
                previous = row.get('installed', previous)
    except (OSError, ValueError):
        pass
    rows = [row for row in since(FOLDER, previous) if not row.get('deliver')]
    probes = [row for row in rows if row.get('kind') == 'probe']
    checks = [row for row in rows if row.get('kind') != 'probe']
    first = min((row['start'] for row in rows if row.get('start')), default=None)
    work = {'probes': len(probes), 'probe_min': round(sum(r.get('secs') or 0 for r in probes) / 60, 1),
            'probe_fails': sum(1 for r in probes if not r.get('ok')),
            'checks': len(checks), 'check_min': round(sum(r.get('secs') or 0 for r in checks) / 60, 1),
            'check_fails': sum(1 for r in checks if not r.get('ok')),
            'deliver_min': round((time.time() - started) / 60, 1)}
    if first:
        try:
            work['from_first_check_min'] = round(
                (datetime.datetime.now() - datetime.datetime.fromisoformat(first)).total_seconds() / 60)
        except (TypeError, ValueError):
            first = None

    def m(value):
        return f'{value:.1f}'.replace('.', ',')

    def part(word, count, spent, fails):
        return f'{word} {count} ({m(spent)} мин' + (f', упало {fails}' if fails else '') + ')' if count else f'{word} 0'

    work['text'] = ('Проверки до доставки: '
                    + part('проб', work['probes'], work['probe_min'], work['probe_fails'])
                    + (', ' + part('других проверок', work['checks'], work['check_min'], work['check_fails'])
                       if checks else '')
                    + (f"; от первой проверки до доставки {work['from_first_check_min']} мин" if first else '')
                    + f"; сама доставка {m(work['deliver_min'])} мин.")
    return work
