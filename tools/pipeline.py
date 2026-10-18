#!/usr/bin/env python3
"""Parallel work in git worktrees and a short delivery to the main folder: Очень Большая Бродилка.

Ported from The Village pipeline (user decision 11 Oct 2026). Every chat works in its own worktree
../very-big-adventure-<name> on work/<name>. The main folder is the worktree that has dev checked out
(very-big-adventure-main): it only mirrors origin/dev and serves the user's game on :5173. dev is ours,
main is shared: only `publish` writes main, through a pull request, on the user's word. Rules: AGENTS.md,
details: docs/development/DELIVERY_PIPELINE.md.

    python3 tools/pipeline.py status
    python3 tools/pipeline.py new <name>               # ../very-big-adventure-<name>, branch work/<name>
    python3 tools/pipeline.py deliver --task <slug> --probe "python3 tools/probe.py test tests/<file>"
    python3 tools/pipeline.py deliver --no-app         # tools/docs/tests only: no version, check or probe
    python3 tools/pipeline.py sync-main                # main folder to origin/dev (also back from a rollback)
    python3 tools/pipeline.py rollback [--to <commit>] # main folder to the previously installed delivery
    python3 tools/pipeline.py serve [--restart|--stop] # the user's game server on :5173 from the main folder
    python3 tools/pipeline.py follow [--once]          # serve runs it: card edits from the sheet into the main folder
    python3 tools/pipeline.py merge-main               # bring the shared main (others' work) into this branch
    python3 tools/pipeline.py publish [--dry-run] [--notes file] [--probe ...]   # dev -> main by a pull request
    python3 tools/pipeline.py board [--set NAME TASK | --free NAME...] [--json]
    python3 tools/pipeline.py chats [--set NAME ID --zone ZONE]
    python3 tools/pipeline.py effort --chat NAME --task TEXT --level medium|high|xhigh --why TEXT
    python3 tools/pipeline.py sheet-push [--script-id ID] [--force]   # the cards sheet's script by clasp (deliver does it)

deliver, from a worktree with everything committed on its branch:
fetch -> squash the branch onto origin/dev (one commit; a merged origin/main stays a second parent)
-> version = origin/dev + 1 in src/version.js -> node --check of the changed JS -> probes -> [lock: push;
rejected with game changes? redo on the new dev] -> fast-forward the main folder (its previous commit is
the backup: rollback) -> restart the :5173 server if server.js changed and nobody is connected.
"""
import argparse
import contextlib
import datetime
import fcntl
import json
import os
from pathlib import Path
import re
import shlex
import shutil
import signal
import subprocess
import sys
import tempfile
import time

PROJECT = 'very-big-adventure'  # worktrees are ../very-big-adventure-<name>
VERSION_FILE = 'src/version.js'
VERSION_RE = re.compile(r'(export const GAME_VERSION = ")(\d+\.\d+\.\d+)(";)')
VERSION_TEXT = ('// The game version. tools/pipeline.py deliver sets it to dev + 1; never edit it by hand.\n'
                'export const GAME_VERSION = "{}";\n')
FIRST_VERSION = '0.1.0'  # before the first delivery with a version
SUBJECT_VERSION_RE = re.compile(r'\s*\(\d+\.\d+\.\d+\)$')
# What the game is made of: changes here need a version, a check and a probe. tools/, docs/, tests/ and the
# rules go with --no-app.
GAME_PATHS = ('src/', 'assets/', 'styles/', 'index.html', 'controller.html', 'styles.css', 'server.js',
              'cards-google-sheet.csv', 'balance-google-sheet.csv')
PORT = 5173  # the user's game; probes never touch it (tools/probe.py takes a port of its own)
PUSH = ['git', '-c', 'http.postBuffer=524288000', 'push']
SHARED = 'main'  # shared: only `publish` writes it, through a pull request
REPO = 'qooobooo/very-big-adventure'


def git(*args, cwd=None, check=True, capture=True):
    result = subprocess.run(['git', *args], cwd=cwd or ROOT, text=True, encoding='utf-8', errors='replace',
                            capture_output=capture)
    if check and result.returncode != 0:
        raise SystemExit('git ' + ' '.join(args) + ' failed:\n' + (result.stderr or '') + (result.stdout or ''))
    return result.stdout.strip() if capture else ''


def say(message):
    print('PIPELINE ' + message, flush=True)


def toplevel():
    result = subprocess.run(['git', 'rev-parse', '--show-toplevel'], text=True, capture_output=True)
    if result.returncode != 0:
        raise SystemExit('Run from inside a checkout of the project')
    return Path(result.stdout.strip())


ROOT = toplevel()
COMMON = Path(git('rev-parse', '--path-format=absolute', '--git-common-dir'))
STATE = COMMON / 'vba-pipeline'
STATE.mkdir(exist_ok=True)
CHATS = STATE / 'chats.json'  # chat name -> send_message id and zone, for delivery notes (`chats`)
BOARD = STATE / 'board.json'  # chat name -> the task it is on, kept by PM (`board`), shown by the status mod
INSTALLED = STATE / 'installed.json'  # what the main folder runs: version, commit, the previous one
SERVER = STATE / 'server.json'  # the :5173 server started by `serve`
FOLLOW = STATE / 'follow.json'  # its companion `follow`: card edits sent from the sheet reach the main folder
FOLLOW_EVERY = 60  # seconds
BASE = os.environ.get('VBA_BASE') or 'dev'


def now():
    return datetime.datetime.now()


def stamp():
    return now().strftime('%Y%m%d-%H%M%S')


def worktrees():
    found, current = [], {}
    for line in git('worktree', 'list', '--porcelain').splitlines() + ['']:
        if not line:
            if current:
                found.append(current)
            current = {}
        elif ' ' in line:
            key, value = line.split(' ', 1)
            current[key] = value
        else:
            current[line] = True
    return found


def main_folder():
    """The worktree with dev checked out; remembered, so a rollback (detached HEAD) keeps it the main folder."""
    remembered = STATE / 'main-folder'
    for tree in worktrees():
        if tree.get('branch') == 'refs/heads/' + BASE:
            path = Path(tree['worktree'])
            if not remembered.exists() or remembered.read_text(encoding='utf-8').strip() != str(path):
                remembered.write_text(str(path) + '\n', encoding='utf-8')
            return path
    if remembered.exists() and Path(remembered.read_text(encoding='utf-8').strip()).is_dir():
        return Path(remembered.read_text(encoding='utf-8').strip())
    raise SystemExit(f'No folder has {BASE} checked out: the main folder is the one on {BASE}')


MAIN = main_folder()


def read_json(path, default=None):
    try:
        return json.loads(Path(path).read_text(encoding='utf-8'))
    except (OSError, ValueError):
        return default


def write_json(path, data):
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')


# ---------------------------------------------------------------- versions

def version_at(rev):
    """The version in src/version.js at rev; None before the first delivery with a version."""
    result = subprocess.run(['git', 'show', f'{rev}:{VERSION_FILE}'], cwd=ROOT, text=True, capture_output=True)
    match = VERSION_RE.search(result.stdout) if result.returncode == 0 else None
    return match.group(2) if match else None


def key(version):
    return tuple(int(part) for part in version.split('.'))


def bump(version):
    major, minor, patch = key(version)
    return f'{major}.{minor}.{patch + 1}'


def release_floor(upstream):
    """The highest version on dev and the shared main: a number is never reused."""
    versions = [v for v in (version_at(upstream), version_at('origin/' + SHARED) if has_ref('origin/' + SHARED) else None) if v]
    return max(versions, key=key) if versions else FIRST_VERSION


def write_version(version):
    path = ROOT / VERSION_FILE
    text = path.read_text(encoding='utf-8') if path.exists() else VERSION_TEXT.format(FIRST_VERSION)
    updated, count = VERSION_RE.subn(lambda m: m.group(1) + version + m.group(3), text, count=1)
    if count != 1:
        raise SystemExit('Cannot write the version into ' + VERSION_FILE)
    path.write_text(updated, encoding='utf-8')
    git('add', VERSION_FILE)


def with_version(message, version):
    lines = message.splitlines() or ['Delivery']
    lines[0] = SUBJECT_VERSION_RE.sub('', lines[0]) + (f' ({version})' if version else '')
    return '\n'.join(lines) + '\n'


# ---------------------------------------------------------------- squash

def has_ref(ref):
    return subprocess.run(['git', 'rev-parse', '--verify', '-q', ref], cwd=ROOT, capture_output=True).returncode == 0


def is_ancestor(older, newer, cwd=None):
    return subprocess.run(['git', 'merge-base', '--is-ancestor', older, newer], cwd=cwd or ROOT).returncode == 0


def extra_parents(head, upstream):
    """The newest commit of the shared main that this branch merged, while dev lacks it.

    It stays a second parent of the squashed delivery, so dev records that it contains main's work
    and the next merge of main starts from there instead of replaying old conflicts."""
    if not has_ref('origin/' + SHARED):
        return []
    merged = git('merge-base', head, 'origin/' + SHARED, check=False)
    return [merged] if merged and not is_ancestor(merged, upstream) else []


def commit_message(base, head, subject):
    """One message for the squashed commits: the chat's subject, the others as a list, trailers kept."""
    exclude = ['^origin/' + SHARED] if has_ref('origin/' + SHARED) else []
    hashes = [h for h in git('rev-list', '--reverse', '--no-merges', head, '^' + base, *exclude).splitlines()
              if not git('log', '-1', '--format=%s', h).startswith('pipeline:')]
    if not hashes and extra_parents(head, 'origin/' + BASE):
        return (subject or f'Merge {SHARED} into {BASE}') + '\n'
    if not hashes:
        raise SystemExit(f'Nothing to deliver: the branch has no commits over origin/{BASE}')
    messages = [git('log', '-1', '--format=%B', h) for h in hashes]
    trailers = []
    for message in messages:
        for line in message.splitlines():
            if re.match(r'^Co-Authored-By: ', line, re.I) and line not in trailers:
                trailers.append(line)
    bodies = [[line for line in m.splitlines() if not re.match(r'^Co-Authored-By: ', line, re.I)] for m in messages]
    if len(messages) == 1 and (not subject or SUBJECT_VERSION_RE.sub('', bodies[0][0]).strip() == subject.strip()):
        lines = bodies[0]  # also a previous delivery attempt being redone
    elif subject:
        lines = [subject, '', 'Squashed commits:'] + ['- ' + SUBJECT_VERSION_RE.sub('', b[0]) for b in bodies]
    else:
        raise SystemExit('The branch has several commits; pass --message "<subject>" for the delivery commit')
    while lines and not lines[-1].strip():
        lines.pop()
    if trailers:
        lines += [''] + trailers
    return '\n'.join(lines) + '\n'


def neutralize_version(base):
    """Put the version line back to the merge base so it never conflicts with dev."""
    wanted, mine = version_at(base), version_at('HEAD')
    if not wanted or not mine or wanted == mine:
        return
    path = ROOT / VERSION_FILE
    path.write_text(VERSION_RE.sub(lambda m: m.group(1) + wanted + m.group(3), path.read_text(encoding='utf-8'),
                                   count=1), encoding='utf-8')
    git('add', VERSION_FILE)
    git('commit', '-q', '-m', 'pipeline: version line follows dev')


def squash_onto(upstream, subject):
    base = git('merge-base', 'HEAD', upstream)
    neutralize_version(base)
    head = git('rev-parse', 'HEAD')
    if is_ancestor(head, upstream):
        raise SystemExit(f'Nothing to deliver: the branch is already in origin/{BASE}')
    message = commit_message(base, head, subject)
    merged = subprocess.run(['git', 'merge-tree', '--write-tree', '--name-only', upstream, head],
                            cwd=ROOT, text=True, capture_output=True)
    if merged.returncode != 0:
        raise SystemExit(f'Conflict with origin/{BASE}. Merge it into your branch, resolve, commit and rerun:\n'
                         f'    git merge origin/{BASE}\n' + merged.stdout)
    tree = merged.stdout.splitlines()[0]
    extra = extra_parents(head, upstream)
    if tree == git('rev-parse', upstream + '^{tree}') and not extra:
        raise SystemExit(f'Nothing to deliver: origin/{BASE} already contains these changes')
    commit = commit_tree(tree, [upstream, *extra], message)
    git('reset', '-q', '--keep', commit)
    return commit


def commit_tree(tree, parents, message):
    with tempfile.NamedTemporaryFile('w', encoding='utf-8', delete=False) as handle:
        handle.write(message)
    try:
        return git('commit-tree', tree, *[arg for parent in parents for arg in ('-p', parent)], '-F', handle.name)
    finally:
        os.unlink(handle.name)


def amend(message):
    with tempfile.NamedTemporaryFile('w', encoding='utf-8', delete=False) as handle:
        handle.write(message)
    try:
        git('commit', '-q', '--amend', '-F', handle.name)
    finally:
        os.unlink(handle.name)
    return git('rev-parse', 'HEAD')


def reuse_checks(commit, upstream, head):
    """Put a checked delivery on top of a dev that moved only outside the game (tools, docs, tests).

    The checks stay valid when the game files of the result equal those that were checked; then the
    commit is recreated on the new dev without rerunning them. None means: redo."""
    moved = git('diff', '--name-only', upstream, head).splitlines()
    if any(f.startswith(GAME_PATHS) for f in moved) or version_at(head) != version_at(upstream):
        return None
    merged = subprocess.run(['git', 'merge-tree', '--write-tree', head, commit], cwd=ROOT, text=True, capture_output=True)
    if merged.returncode != 0:
        return None
    extra = git('log', '-1', '--format=%P', commit).split()[1:]  # a merged main stays a parent
    rebased = commit_tree(merged.stdout.splitlines()[0], [head, *extra], git('log', '-1', '--format=%B', commit) + '\n')
    same = subprocess.run(['git', 'diff', '--quiet', commit, rebased, '--', *[p.rstrip('/') for p in GAME_PATHS]], cwd=ROOT)
    if same.returncode != 0:
        return None
    git('reset', '-q', '--keep', rebased)
    return rebased


# ---------------------------------------------------------------- locks

class Lock:
    """flock: released by the system when the holder exits, so it can never go stale.

    name 'app' — the seconds-long push and main folder sync (every delivery);
    name 'queue' — one game delivery at a time, held from squash to sync (probes share the CPU)."""

    def __init__(self, owner, timeout, name='app'):
        self.owner, self.timeout, self.name, self.handle = owner, timeout, name, None

    def __enter__(self):
        self.handle = (STATE / f'{self.name}.lock').open('a+')
        started = time.time()
        deadline, told = started + self.timeout, False
        while True:
            try:
                fcntl.flock(self.handle, fcntl.LOCK_EX | fcntl.LOCK_NB)
                break
            except BlockingIOError:
                if not told:
                    self.handle.seek(0)
                    say(f'waiting for the {self.name} lock: ' + (self.handle.read().strip() or 'holder is starting'))
                    told = True
                if time.time() > deadline:
                    raise SystemExit(f'The {self.name} lock is still busy after {self.timeout} s')
                time.sleep(1)
        self.handle.seek(0)
        self.handle.truncate()
        json.dump({'owner': self.owner, 'pid': os.getpid(), 'since': now().isoformat(timespec='seconds')},
                  self.handle, ensure_ascii=False)
        self.handle.flush()
        self.acquired = time.time()
        self.waited = self.acquired - started
        return self

    def __exit__(self, *_):
        self.handle.seek(0)
        self.handle.truncate()
        self.handle.flush()
        fcntl.flock(self.handle, fcntl.LOCK_UN)
        self.handle.close()


def lock_state(name='app'):
    path = STATE / f'{name}.lock'
    if not path.exists():
        return 'free'
    with path.open('a+') as handle:
        try:
            fcntl.flock(handle, fcntl.LOCK_EX | fcntl.LOCK_NB)
            fcntl.flock(handle, fcntl.LOCK_UN)
            return 'free'
        except BlockingIOError:
            handle.seek(0)
            return 'busy ' + handle.read().strip()


# ---------------------------------------------------------------- main folder and the game server

def sync_main(target=None):
    """Fast-forward the main folder to origin/dev (or to `target`, a commit just pushed there); a rolled-back
    (detached) main folder comes back to dev."""
    target = target or 'origin/' + BASE
    branch = git('symbolic-ref', '--quiet', '--short', 'HEAD', cwd=MAIN, check=False)
    if not branch and is_ancestor('HEAD', target, cwd=MAIN):
        git('switch', '-q', BASE, cwd=MAIN, check=False)
        branch = git('symbolic-ref', '--quiet', '--short', 'HEAD', cwd=MAIN, check=False)
    if branch != BASE:
        say('main folder not synced: it is on ' + (branch or 'a detached HEAD') + f', not {BASE}')
        return False
    result = subprocess.run(['git', 'merge', '--ff-only', '-q', target], cwd=MAIN, text=True, capture_output=True)
    if result.returncode != 0:
        say('main folder not synced (local commits or uncommitted files there):\n' + result.stderr.strip())
        return False
    say('main folder at ' + git('log', '-1', '--format=%h %s', cwd=MAIN))
    return True


def lsof(*args):
    return subprocess.run(['lsof', '-nP', *args], text=True, capture_output=True).stdout


def listener(port=PORT):
    pids = lsof(f'-iTCP:{port}', '-sTCP:LISTEN', '-t').split()
    return int(pids[0]) if pids else None


def cwd_of(pid):
    for line in lsof('-a', '-p', str(pid), '-d', 'cwd', '-Fn').splitlines():
        if line.startswith('n'):
            return Path(line[1:])
    return None


def connected(port=PORT):
    """Someone has the game open (a browser or a phone holds a connection): a restart would drop their room."""
    return bool(lsof(f'-iTCP:{port}', '-sTCP:ESTABLISHED', '-t').split())


def start_server():
    log = (STATE / 'server.log').open('a', encoding='utf-8')
    process = subprocess.Popen(['node', 'server.js'], cwd=MAIN, env={**os.environ, 'PORT': str(PORT)},
                               stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
    for _ in range(50):
        if listener() == process.pid:
            break
        time.sleep(0.1)
    write_json(SERVER, {'pid': process.pid, 'since': now().isoformat(timespec='seconds'),
                        'commit': git('rev-parse', '--short', 'HEAD', cwd=MAIN)})
    say(f'server :{PORT} started from {MAIN.name} (pid {process.pid}, log {STATE.name}/server.log)')
    start_follow()


def alive(pid):
    try:
        os.kill(pid, 0)
        return True
    except (ProcessLookupError, PermissionError, TypeError):
        return False


def start_follow():
    """The companion of the :5173 server (PM, 12 Oct 2026): «Отправить в игру» in the cards sheet commits to dev
    without a delivery, and the user should see the edit on reload, not after the next delivery. One per Mac; it
    stops by itself with the server."""
    if alive(read_json(FOLLOW, {}).get('pid')):
        return
    log = (STATE / 'follow.log').open('a', encoding='utf-8')
    process = subprocess.Popen([sys.executable, str(MAIN / 'tools/pipeline.py'), 'follow'], cwd=MAIN,
                               stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
    write_json(FOLLOW, {'pid': process.pid, 'since': now().isoformat(timespec='seconds')})


def follow_once():
    """Fast-forward the main folder when dev moved only in the cards or the balance numbers (a sheet edit). Anything
    else comes with its delivery; a rolled-back main folder and a running delivery are left alone."""
    if git('symbolic-ref', '--quiet', '--short', 'HEAD', cwd=MAIN, check=False) != BASE or lock_state() != 'free':
        return
    if subprocess.run(['git', 'fetch', '-q', 'origin'], cwd=MAIN, capture_output=True).returncode != 0:
        return
    head = git('rev-parse', 'HEAD', cwd=MAIN)
    target = git('rev-parse', 'origin/' + BASE, cwd=MAIN)
    if head == target or not is_ancestor(head, target, cwd=MAIN):
        return
    if not set(git('diff', '--name-only', head, target, cwd=MAIN).splitlines()) <= set(CARD_FILES):
        return
    if sync_main(target):
        record_installed(target, version_at(target), 'sheet', head)


def cmd_follow(args):
    # A long-lived loop keeps the code it started with; when a delivery changes this file (CARD_FILES grew with the
    # balance sheet, 16 Oct 2026), restart on the new code. Same pid, so follow.json stays right.
    me = Path(__file__).resolve()
    started = me.stat().st_mtime
    while True:
        try:
            follow_once()
        except (SystemExit, subprocess.SubprocessError, OSError) as exc:
            say(f'follow: {exc}')
        if args.once or listener() is None:
            return 0
        time.sleep(FOLLOW_EVERY)
        with contextlib.suppress(OSError):
            if me.stat().st_mtime != started:
                os.execv(sys.executable, [sys.executable, str(me), 'follow'])


def stop_server(pid):
    with contextlib.suppress(ProcessLookupError):
        os.kill(pid, signal.SIGTERM)
    for _ in range(50):
        if listener() != pid:
            return
        time.sleep(0.1)
    with contextlib.suppress(ProcessLookupError):
        os.kill(pid, signal.SIGKILL)


def server_note(files):
    """After a sync: static files are read from disk on every request, only server.js needs a restart."""
    if 'server.js' not in files:
        return ''
    pid = listener()
    if not pid:
        return ''
    if cwd_of(pid) != MAIN:
        return f'На :{PORT} работает сервер не из основной папки ({cwd_of(pid)}): server.js в нём старый.'
    if connected():
        return (f'server.js изменился, но игра открыта: сервер :{PORT} не перезапущен. '
                'После партии — python3 tools/pipeline.py serve --restart.')
    stop_server(pid)
    start_server()
    return f'Сервер :{PORT} перезапущен с новым server.js.'


def cmd_serve(args):
    pid = listener()
    if pid and cwd_of(pid) != MAIN:
        raise SystemExit(f':{PORT} is served by pid {pid} from {cwd_of(pid)}, not the main folder; stop it there first')
    if args.stop or args.restart:
        if pid:
            stop_server(pid)
            say(f'server :{PORT} stopped (pid {pid})')
        if args.stop:
            return 0
    elif pid:
        say(f'server :{PORT} already runs from {MAIN.name} (pid {pid})')
        start_follow()
        return 0
    start_server()
    return 0


def record_installed(commit, version, task, previous):
    write_json(INSTALLED, {'version': version or version_at(commit), 'commit': commit, 'task': task,
                           'installed': now().isoformat(timespec='seconds'), 'previous': previous})


def cmd_rollback(args):
    """The backup of a delivery is the commit the main folder ran before it: go back there, detached."""
    record = read_json(INSTALLED, {})
    target = args.to or record.get('previous')
    if not target:
        raise SystemExit('No previous delivery recorded; pass --to <commit>')
    if git('status', '--porcelain', '--untracked-files=no', cwd=MAIN):
        raise SystemExit('The main folder has uncommitted changes; it only mirrors dev, find out whose they are first')
    current = git('rev-parse', 'HEAD', cwd=MAIN)
    git('checkout', '-q', '--detach', target, cwd=MAIN)
    files = git('diff', '--name-only', current, target, cwd=MAIN).splitlines()
    record_installed(git('rev-parse', 'HEAD', cwd=MAIN), version_at(target), 'rollback', current)
    say('main folder rolled back to ' + git('log', '-1', '--format=%h %s', cwd=MAIN)
        + f'; dev is unchanged, back with: python3 tools/pipeline.py sync-main')
    note = server_note(files)
    if note:
        say(note)
    return 0


def cmd_sync_main(_args):
    git('fetch', '-q', 'origin')
    before = git('rev-parse', 'HEAD', cwd=MAIN)
    if sync_main():
        after = git('rev-parse', 'HEAD', cwd=MAIN)
        if after != before:
            record_installed(after, version_at(after), 'sync-main', before)
            note = server_note(git('diff', '--name-only', before, after, cwd=MAIN).splitlines())
            if note:
                say(note)
    return 0


# ---------------------------------------------------------------- commands

def cmd_status(_args):
    say('here   ' + str(ROOT) + ' [' + (git('branch', '--show-current') or 'detached') + ']')
    lag = git('rev-list', '--count', f'HEAD..origin/{BASE}', cwd=MAIN, check=False)
    dirty = git('status', '--porcelain', '--untracked-files=no', cwd=MAIN, check=False)
    say('main   ' + str(MAIN) + ' at ' + git('log', '-1', '--format=%h %s', cwd=MAIN) +
        (f' = origin/{BASE}' if lag == '0' else f' ({lag} behind origin/{BASE}: sync-main)') +
        (', uncommitted changes' if dirty else ''))
    ahead = git('rev-list', '--left-right', '--count', f'origin/{BASE}...HEAD', check=False)
    if ahead and ROOT != MAIN:
        behind, over = ahead.split()
        say(f'branch {over} commit(s) over origin/{BASE}, {behind} behind (last fetch)')
    if has_ref('origin/' + SHARED):
        unpublished = git('rev-list', '--count', '--first-parent', f'origin/{SHARED}..origin/{BASE}', check=False)
        foreign = git('rev-list', '--count', '--no-merges', f'origin/{BASE}..origin/{SHARED}', check=False)
        say(f'shared {SHARED}: {unpublished} delivery(ies) of {BASE} not published'
            + (f'; {foreign} commit(s) of others not in {BASE} (merge-main)' if foreign not in ('', '0') else ''))
    say('queue     ' + lock_state('queue'))
    say('app lock  ' + lock_state())
    record = read_json(INSTALLED)
    if record:
        say(f"installed {record['version'] or 'no version'} {record['commit'][:9]} {record['task']} at {record['installed']}")
    pid = listener()
    say(f'server :{PORT} ' + (f'pid {pid} from {cwd_of(pid)}' + (', someone connected' if connected() else '')
                              if pid else 'not running (python3 tools/pipeline.py serve)'))
    for tree in worktrees():
        say(f"worktree {tree['worktree']} [{tree.get('branch', 'detached').replace('refs/heads/', '')}]")
    return 0


def cmd_new(args):
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]*', args.name):
        raise SystemExit('Name: lowercase latin letters, digits and dashes')
    path = MAIN.parent / f'{PROJECT}-{args.name}'
    branch = args.branch or f'work/{args.name}'
    if path.exists():
        raise SystemExit(str(path) + ' already exists')
    git('fetch', '-q', 'origin')
    git('worktree', 'add', '-q', '-b', branch, str(path), 'origin/' + BASE)
    git('branch', '-q', '--unset-upstream', branch, cwd=path, check=False)
    say(f'worktree ready: {path} [{branch}] from ' + git('log', '-1', '--format=%h %s', 'origin/' + BASE))
    return 0


def run_probes(probes, version, attempt):
    # {run} is unique per probe (a fresh output folder each); {run1}, {run2}… name earlier probes' runs.
    base, done, runs = f'{stamp()}-{attempt}', [], {}
    for index, template in enumerate(probes, 1):
        runs[f'{{run{index}}}'] = f'{base}-{index}'
        command = template.replace('{version}', version or 'no-version').replace('{run}', runs[f'{{run{index}}}'])
        for name, value in runs.items():
            command = command.replace(name, value)
        say('probe: ' + command)
        try:
            failed = subprocess.run(shlex.split(command), cwd=ROOT).returncode != 0
        finally:
            tidy_probe_output(runs[f'{{run{index}}}'])
        if failed:
            raise SystemExit('Probe failed, nothing was pushed or installed: ' + command)
        done.append(command)
    return done


def tidy_probe_output(label):
    # {run} is a label, not a path: a probe given `--out {run}` writes into the worktree root, and the next
    # deliver stops on «git status is not clean». Move such a folder under the ignored Logs/probes.
    stray = ROOT / label
    if not stray.is_dir() or git('ls-files', '--', label):
        return
    target = ROOT / 'Logs/probes' / label
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(stray), str(target))
    say(f'probe output {label}/ moved to Logs/probes/{label}/ (next time: --out Logs/probes/{{run}})')


def check(files):
    """The build of a game without a build: node --check of every changed script (seconds). A change in the cards or
    the balance numbers (their эталоны are in src/game.js) also needs the CSVs the code makes: the «Cards Config» sheet
    reads the CSVs (tools/cards-sheet/README.md)."""
    scripts = [f for f in files if f.endswith(('.js', '.mjs', '.cjs')) and (ROOT / f).exists()]
    for script in scripts:
        result = subprocess.run(['node', '--check', script], cwd=ROOT, text=True, capture_output=True)
        if result.returncode != 0:
            raise SystemExit(f'node --check {script} failed, nothing was pushed or installed:\n' + result.stderr.strip()[-2000:])
    say(f'check: node --check of {len(scripts)} script(s) passed')
    if any(f in CARD_FILES or f == 'src/game.js' for f in files):
        result = subprocess.run(['node', CARDS_CSV_TOOL, '--check'], cwd=ROOT, text=True, capture_output=True)
        if result.returncode != 0:
            raise SystemExit('The cards or balance CSV is stale, nothing was pushed or installed:\n'
                             + (result.stderr or result.stdout).strip()[-2000:])
        say('check: cards-google-sheet.csv and balance-google-sheet.csv match the code')
    # The whole node:test suite runs in a fraction of a second, so every delivery that touches code runs all of it, not
    # only its own narrow probe (18 Oct 2026: 0.1.44 left 6 tests of another file red for three deliveries).
    if scripts or any(f in CARD_FILES for f in files):
        suite = sorted(str(p.relative_to(ROOT)) for p in (ROOT / 'tests').glob('*.test.*js'))
        if suite:
            result = subprocess.run(['node', '--test', *suite], cwd=ROOT, text=True, capture_output=True, timeout=180)
            if result.returncode != 0:
                failed = [line.strip() for line in result.stdout.splitlines() if line.lstrip().startswith('✖')][:10]
                raise SystemExit('Tests failed, nothing was pushed or installed:\n' + '\n'.join(failed or [result.stdout.strip()[-2000:]]))
            say(f'check: node --test of {len(suite)} file(s) passed')


# What the «Cards Config» sheet sends to dev: the cards (12 Oct 2026) and the balance numbers, tab «Баланс» (16 Oct 2026).
CARD_FILES = ('src/cards.config.js', 'cards-google-sheet.csv', 'src/game.config.js', 'balance-google-sheet.csv')
CARDS_CSV_TOOL = 'tools/cards-sheet/cards-csv.mjs'
SHEET_SCRIPT = 'tools/cards-sheet/VbaCards.gs'
SHEET_MANIFEST = 'tools/cards-sheet/appsscript.json'
# The user's «Cards Config» sheet: {"scriptId": …, "pushed": <commit>}; the Script ID stays on this Mac, out of the
# shared repository.
SHEET_STATE = STATE / 'cards-sheet.json'


def sheet_push(ref, force=False):
    """The cards sheet's Apps Script at ref (dev) into the user's sheet by clasp, when it changed (PM task, 12 Oct 2026:
    nobody pastes it by hand; as The Village does). Never stops a delivery: on any trouble it says so and the sheet keeps
    its script."""
    if not SHEET_STATE.exists():
        return
    state = json.loads(SHEET_STATE.read_text(encoding='utf-8'))
    version = git('log', '-1', '--format=%h', ref, '--', SHEET_SCRIPT)
    if not version or (state.get('pushed') == version and not force):
        return
    clasp = shutil.which('clasp') or str(Path.home() / '.npm-global/bin/clasp')
    if not Path(clasp).exists():
        say('sheet: clasp is not installed; the sheet keeps its script')
        return
    code = git('show', f'{ref}:{SHEET_SCRIPT}').replace("var SCRIPT_VERSION = 'repo';", f"var SCRIPT_VERSION = '{version}';", 1)
    with tempfile.TemporaryDirectory() as folder:
        root = Path(folder)
        (root / '.clasp.json').write_text(json.dumps({'scriptId': state['scriptId'], 'rootDir': ''}), encoding='utf-8')
        (root / 'appsscript.json').write_text(git('show', f'{ref}:{SHEET_MANIFEST}') + '\n', encoding='utf-8')
        (root / 'VbaCards.js').write_text(code + '\n', encoding='utf-8')
        result = subprocess.run([clasp, 'push', '--force'], cwd=root, text=True, capture_output=True)
    if result.returncode != 0:
        say('sheet: clasp push failed, the sheet keeps its script: ' + (result.stderr or result.stdout).strip()[-400:])
        return
    state.update(pushed=version, time=now().isoformat(timespec='seconds'))
    SHEET_STATE.write_text(json.dumps(state, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    say(f'sheet: script {version} pushed into the cards sheet')


def cmd_sheet_push(args):
    if args.script_id:
        state = json.loads(SHEET_STATE.read_text(encoding='utf-8')) if SHEET_STATE.exists() else {}
        state['scriptId'] = args.script_id
        SHEET_STATE.write_text(json.dumps(state, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    if not SHEET_STATE.exists():
        raise SystemExit('No Script ID yet: python3 tools/pipeline.py sheet-push --script-id <the sheet\'s Script ID>')
    git('fetch', '-q', 'origin')
    sheet_push('origin/' + BASE, force=args.force or bool(args.script_id))
    return 0


def work_summary(started):
    try:
        from activity import work_summary as summary  # tools/activity.py: probes of this folder since its last delivery
        return summary(started)
    except Exception as exc:  # the delivery stands even if the activity journal cannot be read
        return {'text': '', 'error': str(exc)}


def cmd_deliver(args):
    if ROOT == MAIN:
        raise SystemExit('Deliver from your own worktree (python3 tools/pipeline.py new <name>); '
                         f'the main folder only mirrors origin/{BASE}')
    branch = git('branch', '--show-current')
    if not branch or branch in (BASE, SHARED):
        raise SystemExit('Check out your work branch in this worktree first (' + (branch or 'detached HEAD') + ' is not one)')
    if git('status', '--porcelain'):
        raise SystemExit('Commit your work first (git status is not clean):\n' + git('status', '--short'))
    app = not args.no_app
    if app and not args.probe and not args.dry_run:
        raise SystemExit('A game delivery needs one narrow probe: --probe "python3 tools/probe.py test tests/<file>"')
    task = args.task or branch.split('/')[-1]
    if not re.fullmatch(r'[A-Za-z0-9._-]+', task):
        raise SystemExit('--task: latin letters, digits, dot, dash, underscore')
    started = time.time()
    os.environ['VBA_DELIVER'] = '1'  # tools/activity.py tags this delivery's own probes
    timing = {'build_s': 0.0, 'probe_s': 0.0, 'queue_wait_s': 0.0, 'lock_wait_s': 0.0, 'lock_hold_s': 0.0,
              'redone': 0, 'reused_build': 0}
    owner = f'{task} {ROOT.name}'
    with contextlib.ExitStack() as outer:
        # Game deliveries go one at a time: no redo races and no two Chrome probes fighting for the CPU.
        # Tools/docs deliveries (--no-app) skip the queue; they only take the seconds-long app lock.
        queued = app and not args.dry_run
        if queued:
            queue = outer.enter_context(Lock(owner + ' (delivering)', args.queue_timeout, name='queue'))
            timing['queue_wait_s'] += queue.waited
        for attempt in range(1, args.attempts + 1):
            with contextlib.ExitStack() as stack:
                lock = None
                if attempt > 1 and not args.dry_run and not queued:
                    lock = stack.enter_context(Lock(owner + ' (redo under the lock)', args.lock_timeout))
                    timing['lock_wait_s'] += lock.waited
                git('fetch', '-q', 'origin')
                upstream = git('rev-parse', 'origin/' + BASE)
                commit = squash_onto(upstream, args.message)
                files = git('diff', '--name-only', upstream, commit).splitlines()
                version = None
                if not app:
                    game = [f for f in files if f.startswith(GAME_PATHS)]
                    if game:
                        raise SystemExit('--no-app is for tools/docs/tests only; these need a version and a probe:\n  '
                                         + '\n  '.join(game))
                else:
                    version = bump(release_floor(upstream))
                    write_version(version)
                    commit = amend(with_version(git('log', '-1', '--format=%B'), version))
                    files = git('diff', '--name-only', upstream, commit).splitlines()
                    say(f'attempt {attempt}: {version} on ' + git('log', '-1', '--format=%h %s', upstream))
                    mark = time.time()
                    check(files)
                    timing['build_s'] += time.time() - mark
                mark = time.time()
                probes = run_probes(args.probe, version, attempt) if app else []
                timing['probe_s'] += time.time() - mark
                if git('status', '--porcelain', '--untracked-files=no'):
                    raise SystemExit('A probe changed tracked files; nothing was pushed:\n' + git('status', '--short'))
                if args.dry_run:
                    say('dry run: checked ' + git('log', '-1', '--format=%h %s') + '; nothing pushed or installed')
                    return 0
                if lock is None:
                    lock = stack.enter_context(Lock(f'{owner} {version or "no-app"}', args.lock_timeout))
                    timing['lock_wait_s'] += lock.waited
                pushed_ok = False
                for _ in range(3):
                    git('fetch', '-q', 'origin')
                    head = git('rev-parse', 'origin/' + BASE)
                    if head != upstream:
                        reused = reuse_checks(commit, upstream, head)
                        if reused is None:
                            break
                        say(f'{BASE} moved only in tools/docs/tests; the checks stay valid, pushing on top of '
                            + git('log', '-1', '--format=%h %s', head))
                        commit, upstream = reused, head
                        files = git('diff', '--name-only', upstream, commit).splitlines()
                        timing['reused_build'] += 1
                    pushed = subprocess.run(PUSH + ['origin', f'{commit}:refs/heads/{BASE}'], cwd=ROOT,
                                            text=True, capture_output=True)
                    if pushed.returncode == 0:
                        pushed_ok = True
                        break
                    say('push rejected, checking what moved:\n' + pushed.stderr.strip())
                if not pushed_ok:
                    say(f'origin/{BASE} moved with game changes; redoing the delivery on top of it')
                    timing['redone'] += 1
                    timing['lock_hold_s'] += time.time() - lock.acquired
                    continue
                previous = git('rev-parse', 'HEAD', cwd=MAIN)
                # No fetch here: right after a push GitHub may still serve the old dev, and a fetch winds origin/dev
                # back to it (12 Oct 2026: 0.1.4 was pushed, the main folder stayed on 0.1.3). Sync to what we pushed.
                synced = sync_main(commit)
                if synced:
                    record_installed(git('rev-parse', 'HEAD', cwd=MAIN), version or version_at(commit), task, previous)
                timing['lock_hold_s'] += time.time() - lock.acquired
            note = server_note(files) if synced else ''
            work = work_summary(started)
            record = {'version': version, 'commit': commit, 'branch': branch, 'task': task, 'worktree': str(ROOT),
                      'app': app, 'started': datetime.datetime.fromtimestamp(started).isoformat(timespec='seconds'),
                      'installed': now().isoformat(timespec='seconds'), 'attempts': attempt,
                      'total_s': round(time.time() - started, 1), **{k: round(v, 1) for k, v in timing.items()},
                      'backup': previous if synced else None, 'probes': probes, 'work': work}
            with (STATE / 'deliveries.jsonl').open('a', encoding='utf-8') as log:  # read by tools/process_report.py
                log.write(json.dumps(record, ensure_ascii=False) + '\n')
            summary = git('log', '-1', '--format=%h %s', commit)
            say('DELIVERED ' + summary)
            if note:
                say(note)
            try:
                sheet_push(commit)
            except Exception as exc:  # the delivery is done; the sheet keeps its script
                say(f'sheet: {exc}')
            print('\nSend it yourself to PM and to the chats whose zones or files this touches, not everyone '
                  '(addresses: python3 tools/pipeline.py chats):\n'
                  f'Доставлено в {BASE}{" и в основную папку" if synced else ""}: {summary}. '
                  + (f'Версия {version}. ' if version else '')
                  + 'Файлы: ' + ', '.join(files) + '. '
                  + ('' if synced else 'Основная папка не подтянута (см. вывод pipeline). ')
                  + 'Ваши ветки подхватят это сами при следующем deliver.'
                  + (' ' + note if note else '')
                  + (' ' + work['text'] if work.get('text') else ''), flush=True)
            return 0
    raise SystemExit(f'origin/{BASE} kept moving; gave up after {args.attempts} attempts')


def cmd_board(args):
    """Who works on what (PM sets and frees it) and the shared state, for tools/mods/vba-status."""
    board = read_json(BOARD, {})
    if args.set or args.free:
        if args.set:
            board[args.set[0]] = {'task': args.set[1], 'since': now().isoformat(timespec='minutes')}
        for name in args.free or []:
            board.pop(name, None)
        write_json(BOARD, board)
    table = read_json(CHATS, {})
    names = [name for name in table if name != 'PM'] + [name for name in board if name not in table]
    if not args.json:
        for name in names:
            print(f"{name:12} {board[name]['task'] + ' (since ' + board[name]['since'][11:] + ')' if name in board else 'free'}")
        return 0
    tag = lambda ref: (git('describe', '--tags', '--abbrev=0', ref, cwd=MAIN, check=False) or '').lstrip('v')
    unpublished = git('rev-list', '--count', '--first-parent', f'origin/{SHARED}..origin/{BASE}', cwd=MAIN, check=False)
    foreign = git('rev-list', '--count', '--no-merges', f'origin/{BASE}..origin/{SHARED}', cwd=MAIN, check=False)
    installed = (read_json(INSTALLED) or {}).get('version') or version_at(git('rev-parse', 'HEAD', cwd=MAIN))
    detached = not git('symbolic-ref', '--quiet', 'HEAD', cwd=MAIN, check=False)
    # 'project' and 'team' (not 'chats'): The Village's own status mod, installed on this Mac too, reads the same
    # command in any folder; this shape keeps each band to its own project.
    print(json.dumps({'project': 'vba', 'base': BASE, 'shared': SHARED, 'installed': installed, 'rolled_back': detached,
                      'shared_version': tag('origin/' + SHARED),
                      'unpublished': int(unpublished) if unpublished.isdigit() else None,
                      'foreign': int(foreign) if foreign.isdigit() else None,
                      'queue': lock_state('queue'), 'app': lock_state(), 'server': bool(listener()),
                      'team': [dict(name=name, **board.get(name, {})) for name in names]}, ensure_ascii=False))
    return 0


def cmd_chats(args):
    """Addresses of this machine's chats, so an executor tells PM and file owners about its delivery itself."""
    table = read_json(CHATS, {})
    if args.set:
        name, chat_id = args.set
        table[name] = {'id': chat_id, 'zone': args.zone or table.get(name, {}).get('zone', '')}
        write_json(CHATS, table)
    for name, row in table.items():
        print(f"{name:12} {row.get('id', '')}  {row.get('zone', '')}")
    if not table:
        print('no chats recorded: python3 tools/pipeline.py chats --set "<name>" <session id> --zone "<zone>"')
    return 0


def cmd_effort(args):
    """PM's journal of reasoning levels (user decision 11 Oct 2026): one line per task, read by process_report."""
    row = {'time': now().isoformat(timespec='seconds'), 'chat': args.chat, 'task': args.task, 'level': args.level,
           'why': args.why}
    with (STATE / 'effort.jsonl').open('a', encoding='utf-8') as log:
        log.write(json.dumps(row, ensure_ascii=False) + '\n')
    print(f"{row['time'][11:16]}  {args.chat}  {args.level}  {args.task} — {args.why}")
    return 0


HOOK = """#!/bin/sh
# Очень Большая Бродилка (user decision 11 Oct 2026): main is shared and gets work only through
# `python3 tools/pipeline.py publish` (a pull request); dev and main never take a force push or a deletion.
# Installed by tools/pipeline.py into the repository's shared hooks (every worktree of this Mac).
zero=0000000000000000000000000000000000000000
while read local_ref local_sha remote_ref remote_sha; do
  case "$remote_ref" in
    refs/heads/main)
      echo "main is shared: deliver into dev (python3 tools/pipeline.py deliver); it reaches main by pipeline.py publish." >&2
      exit 1 ;;
    refs/heads/dev)
      if [ "$local_sha" = "$zero" ]; then
        echo "dev cannot be deleted" >&2
        exit 1
      fi
      if [ "$remote_sha" != "$zero" ] && ! git merge-base --is-ancestor "$remote_sha" "$local_sha" 2>/dev/null; then
        echo "dev takes no force push: git merge origin/dev in your worktree, then deliver again" >&2
        exit 1
      fi ;;
  esac
done
exit 0
"""


def ensure_hook():
    """No push of this Mac's checkouts goes to the shared main or rewrites dev by mistake."""
    hooks = Path(git('config', '--get', 'core.hooksPath', check=False) or COMMON / 'hooks')
    hook = (hooks if hooks.is_absolute() else ROOT / hooks) / 'pre-push'
    if hook.exists() and hook.read_text(encoding='utf-8', errors='replace') == HOOK:
        return
    if hook.exists() and 'Очень Большая Бродилка' not in hook.read_text(encoding='utf-8', errors='replace'):
        say('warning: ' + str(hook) + ' exists and is not ours; main is not guarded')
        return
    hook.parent.mkdir(parents=True, exist_ok=True)
    hook.write_text(HOOK, encoding='utf-8')
    hook.chmod(0o755)


def cmd_merge_main(args):
    """Bring the shared main (other people's work) into this worktree's branch, to deliver like any change."""
    if ROOT == MAIN:
        raise SystemExit('Merge main from your own worktree; the main folder only mirrors origin/' + BASE)
    if git('status', '--porcelain'):
        raise SystemExit('Commit your work first (git status is not clean)')
    git('fetch', '-q', 'origin')
    shared, upstream = 'origin/' + SHARED, 'origin/' + BASE
    if is_ancestor(shared, upstream):
        say(f'{BASE} already contains {SHARED}; nothing to merge')
        return 0
    others = git('log', '--no-merges', '--format=  %h %an: %s', f'{upstream}..{shared}')
    say(f'{SHARED} has work that {BASE} lacks:\n' + others)
    for ref in (upstream, shared):
        result = subprocess.run(['git', 'merge', '--no-edit', '-q', '-m', f'Merge {ref} into ' + git('branch', '--show-current'), ref],
                                cwd=ROOT, text=True, capture_output=True)
        if result.returncode != 0:
            say('conflict merging ' + ref + ':\n' + git('diff', '--name-only', '--diff-filter=U'))
            raise SystemExit('Resolve the conflicts (art and files of their owners: ask them, keep their side by default), '
                             'git commit, then deliver as below.')
    game = [f for f in git('diff', '--name-only', upstream, 'HEAD').splitlines() if f.startswith(GAME_PATHS)]
    subject = f'Merge {SHARED} into {BASE}: ' + ', '.join(sorted(set(
        git('log', '--no-merges', '--format=%an', f'{upstream}..{shared}').splitlines())))
    say('merged. Deliver it' + (' with a probe touching what came in:' if game else ' (tools/docs only):'))
    print(f'    python3 tools/pipeline.py deliver --task merge-main --message "{subject}"'
          + (' --probe "python3 tools/probe.py test tests/<file>"' if game else ' --no-app'))
    return 0


def changelog(shared, upstream):
    rows = []
    for line in git('log', '--first-parent', '--format=%h\t%s', f'{shared}..{upstream}').splitlines():
        sha, subject = line.split('\t', 1)
        version = re.search(r'\((\d+\.\d+\.\d+)\)$', subject)
        short = SUBJECT_VERSION_RE.sub('', subject)
        short = re.split(r'(?<=[a-z0-9»)])[.:] ', short, maxsplit=1)[0][:160]
        rows.append(f"- {version.group(1) + ' · ' if version else ''}{short} ({sha})")
    return rows


def cmd_publish(args):
    """dev -> the shared main, by a pull request merged on GitHub (only when the user says so)."""
    git('fetch', '-q', 'origin')
    shared, upstream = 'origin/' + SHARED, 'origin/' + BASE
    if not is_ancestor(shared, upstream):
        others = git('log', '--no-merges', '--format=  %h %an: %s', f'{upstream}..{shared}')
        raise SystemExit(f'{SHARED} has work {BASE} lacks; run merge-main in your worktree and deliver it first:\n' + others)
    if is_ancestor(upstream, shared):
        say(f'nothing to publish: {SHARED} already has {BASE}')
        return 0
    version = version_at(upstream)
    if not version:
        raise SystemExit(f'{BASE} has no version yet: publish after the first game delivery')
    if git('rev-parse', 'HEAD', cwd=MAIN) != git('rev-parse', upstream):
        raise SystemExit(f'The main folder is not at origin/{BASE} ({version}): sync-main first '
                         '(publish checks run on what the user plays)')
    rows = changelog(shared, upstream)
    notes = Path(args.notes).read_text(encoding='utf-8').strip() + '\n\n' if args.notes else ''
    body = (notes + f'## {BASE} {version} into {SHARED}\n\n{len(rows)} deliveries since the last publish:\n\n'
            + '\n'.join(rows) + '\n\nPublished by tools/pipeline.py publish (the owner\'s go).\n')
    for template in args.probe:
        command = template.replace('{main}', str(MAIN)).replace('{run}', f'publish-{stamp()}')
        say('probe: ' + command)
        if subprocess.run(shlex.split(command), cwd=ROOT).returncode != 0:
            raise SystemExit('Probe failed; nothing published: ' + command)
    if args.dry_run:
        print(body)
        say(f'dry run: {len(rows)} deliveries would go from {BASE} {version} into {SHARED}; nothing published')
        return 0
    with tempfile.NamedTemporaryFile('w', encoding='utf-8', suffix='.md', delete=False) as handle:
        handle.write(body)
    try:
        title = f'{BASE} {version} into {SHARED}'
        url = subprocess.run(['gh', 'pr', 'create', '--repo', REPO, '--base', SHARED, '--head', BASE,
                              '--title', title, '--body-file', handle.name], cwd=ROOT, text=True, capture_output=True)
        if url.returncode != 0 and 'already exists' not in url.stderr:
            raise SystemExit('gh pr create failed:\n' + url.stderr)
        pr = url.stdout.strip() or re.search(r'https://\S+', url.stderr).group(0)
        merged = subprocess.run(['gh', 'pr', 'merge', pr, '--repo', REPO, '--merge', '--subject', f'Publish {version}: {BASE} into {SHARED}',
                                 '--body', f'{len(rows)} deliveries; list in the pull request.'], cwd=ROOT, text=True, capture_output=True)
        if merged.returncode != 0:
            raise SystemExit('gh pr merge failed (the pull request stays open: ' + pr + '):\n' + merged.stderr)
    finally:
        os.unlink(handle.name)
    git('fetch', '-q', 'origin')
    tag = 'v' + version
    if not has_ref('refs/tags/' + tag):
        git('tag', '-a', tag, shared, '-m', f'{BASE} {version} published into {SHARED}')
        subprocess.run(PUSH + ['origin', tag], cwd=ROOT, text=True, capture_output=True)
    # dev takes main's merge commit (same files) so the next publish starts from it.
    forward = subprocess.run(PUSH + ['origin', f'{shared}:refs/heads/{BASE}'], cwd=ROOT, text=True, capture_output=True)
    if forward.returncode != 0:
        say(f'{BASE} moved meanwhile; the merge commit comes into {BASE} with the next merge-main')
        git('fetch', '-q', 'origin')
    sync_main()  # after a push no fetch: GitHub may still serve the old dev (see cmd_deliver)
    with (STATE / 'publishes.jsonl').open('a', encoding='utf-8') as log:
        log.write(json.dumps({'time': now().isoformat(timespec='seconds'), 'version': version, 'pr': pr,
                              'deliveries': len(rows), 'tag': tag}, ensure_ascii=False) + '\n')
    say(f'PUBLISHED {BASE} {version} into {SHARED}: {pr} ({len(rows)} deliveries, tag {tag})')
    return 0


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('status').set_defaults(run=cmd_status)
    new = sub.add_parser('new', help=f'create ../{PROJECT}-<name> on work/<name> from origin/{BASE}')
    new.add_argument('name')
    new.add_argument('--branch')
    new.set_defaults(run=cmd_new)
    deliver = sub.add_parser('deliver', help='squash, version, check, probe, push, sync the main folder')
    deliver.add_argument('--task', help='short latin slug (default: branch name)')
    deliver.add_argument('--message', help='subject of the delivery commit (needed for several commits)')
    deliver.add_argument('--probe', action='append', default=[],
                         help='narrow probe command, run in this worktree; {run} = unique label per probe (output: Logs/probes/{run}), '
                              '{run1}, {run2}... = run of probe 1, 2..., {version} = the version')
    deliver.add_argument('--no-app', action='store_true', help='tools/docs/tests only: no version, check or probe')
    deliver.add_argument('--dry-run', action='store_true', help='squash, check and probe, but do not push or sync')
    deliver.add_argument('--attempts', type=int, default=4)
    deliver.add_argument('--lock-timeout', type=int, default=1800)
    deliver.add_argument('--queue-timeout', type=int, default=3600, help='how long to wait in the delivery queue')
    deliver.set_defaults(run=cmd_deliver)
    sub.add_parser('sync-main', help=f'fast-forward the main folder to origin/{BASE}').set_defaults(run=cmd_sync_main)
    rollback = sub.add_parser('rollback', help='main folder back to the previously installed delivery (dev stays)')
    rollback.add_argument('--to', help='a commit instead of the previous delivery')
    rollback.set_defaults(run=cmd_rollback)
    serve = sub.add_parser('serve', help=f'the user\'s game server on :{PORT} from the main folder')
    serve.add_argument('--restart', action='store_true')
    serve.add_argument('--stop', action='store_true')
    serve.set_defaults(run=cmd_serve)
    sub.add_parser('merge-main', help=f'merge the shared {SHARED} (others\' work) into this branch').set_defaults(run=cmd_merge_main)
    publish = sub.add_parser('publish', help=f'{BASE} -> {SHARED} by a pull request, on the owner\'s go')
    publish.add_argument('--notes', help='a markdown file with a human summary for the pull request')
    publish.add_argument('--probe', action='append', default=[],
                         help='check before publishing; {main} = the main folder, {run} = unique name')
    publish.add_argument('--dry-run', action='store_true', help='print the pull request body, publish nothing')
    publish.set_defaults(run=cmd_publish)
    board = sub.add_parser('board', help='who works on what, for the status mod (--set NAME TASK, --free NAME)')
    board.add_argument('--set', nargs=2, metavar=('NAME', 'TASK'))
    board.add_argument('--free', nargs='+', metavar='NAME')
    board.add_argument('--json', action='store_true')
    board.set_defaults(run=cmd_board)
    chat = sub.add_parser('chats', help='chat addresses for delivery notes (send_message ids)')
    chat.add_argument('--set', nargs=2, metavar=('NAME', 'ID'))
    chat.add_argument('--zone')
    chat.set_defaults(run=cmd_chats)
    follow = sub.add_parser('follow', help='serve runs it: sheet card edits on dev into the main folder')
    follow.add_argument('--once', action='store_true', help='one look, then exit')
    follow.set_defaults(run=cmd_follow)
    sheet = sub.add_parser('sheet-push', help='the cards sheet\'s script from dev into the sheet by clasp (deliver does it too)')
    sheet.add_argument('--script-id', help='the sheet\'s Script ID (Apps Script → Project Settings), kept on this Mac')
    sheet.add_argument('--force', action='store_true', help='push even when this version was pushed already')
    sheet.set_defaults(run=cmd_sheet_push)
    effort = sub.add_parser('effort', help='PM: log the reasoning level given to a chat for a task')
    effort.add_argument('--chat', required=True)
    effort.add_argument('--task', required=True)
    effort.add_argument('--level', required=True, choices=('low', 'medium', 'high', 'xhigh', 'max'))
    effort.add_argument('--why', required=True)
    effort.set_defaults(run=cmd_effort)
    args = parser.parse_args()
    ensure_hook()
    return args.run(args)


if __name__ == '__main__':
    sys.exit(main())
