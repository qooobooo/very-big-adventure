#!/usr/bin/env python3
"""Keeps the disk from filling up (user's rules from The Village, 11 Oct 2026, relayed by its PM 23 Oct 2026).
deliver runs it at most once in six hours; by hand:

    python3 tools/cleanup_disk.py            # what it would remove, as JSON
    python3 tools/cleanup_disk.py --apply    # remove it

What goes:
- chat folders (../very-big-adventure-<name>) that are clean (no changes, no untracked files), whose HEAD has not
  moved and no file has changed for IDLE_DAYS, and whose chat is not on a task on the board. `git worktree remove`
  keeps the branch, so committed work stays; `pipeline.py new <name>` brings the folder back in seconds;
- probe runs (Logs/probes/*) older than PROBE_DAYS in every folder.
Never: the main folder (dev, the user's game), the git store folder, the folder this runs from.
The Village's backup rule does not apply here: a delivery's backup is the commit before it (pipeline.py rollback).
"""

import argparse
import json
import shutil
import subprocess
import time
from pathlib import Path

IDLE_DAYS = 3
PROBE_DAYS = 7
CHAT_FOLDERS = {'GD': 'gd', 'Art': 'art-ui'}  # board chat -> the prefix of its folders' names


def git(*args, cwd):
    return subprocess.run(['git', *args], cwd=cwd, capture_output=True, text=True).stdout.strip()


def size_mb(path):
    out = subprocess.run(['du', '-sk', str(path)], capture_output=True, text=True).stdout.split()
    return round(int(out[0]) / 1024) if out else 0


def worktrees(here):
    """(path, branch) of every worktree; the first is the git store folder."""
    out, path = [], None
    for line in git('worktree', 'list', '--porcelain', cwd=here).splitlines():
        if line.startswith('worktree '):
            path = Path(line.split(' ', 1)[1])
            out.append([path, None])
        elif line.startswith('branch ') and out:
            out[-1][1] = line.split(' ', 1)[1].removeprefix('refs/heads/')
    return out


def touched_since(path, days):
    """Any file but .git changed within `days`."""
    found = subprocess.run(['find', str(path), '-path', str(path / '.git'), '-prune', '-o', '-mtime', f'-{days}',
                            '-type', 'f', '-print', '-quit'], capture_output=True, text=True).stdout
    return bool(found.strip())


def idle_worktrees(trees, here, busy, now):
    found = []
    store = trees[0][0]
    for path, branch in trees[1:]:
        if path == here or branch == 'dev' or not path.exists() or path.parent != store.parent:
            continue
        name = path.name.removeprefix(store.name + '-')
        if any(name.startswith(CHAT_FOLDERS.get(chat, '\0')) for chat in busy):
            continue
        if git('status', '--porcelain', cwd=path):
            continue
        moved = git('log', '-g', '-1', '--format=%ct', 'HEAD', cwd=path) or git('log', '-1', '--format=%ct', cwd=path)
        days = (now - int(moved or now)) / 86400
        if days >= IDLE_DAYS and not touched_since(path, IDLE_DAYS):
            found.append({'kind': 'worktree', 'path': str(path), 'branch': branch, 'idle_days': round(days, 1)})
    return found


def old_probes(trees, now):
    found = []
    for path, _ in trees:
        for run in sorted((path / 'Logs' / 'probes').glob('*')):
            days = (now - run.stat().st_mtime) / 86400
            if run.is_dir() and days >= PROBE_DAYS:
                found.append({'kind': 'probe run', 'path': str(run), 'age_days': round(days, 1)})
    return found


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    here = Path(git('rev-parse', '--show-toplevel', cwd=Path(__file__).resolve().parent))
    trees = worktrees(here)
    store = trees[0][0]
    try:
        board = json.loads((store / '.git' / 'vba-pipeline' / 'board.json').read_text(encoding='utf-8'))
    except (OSError, ValueError):
        board = {}
    now = time.time()
    gone = idle_worktrees(trees, here, set(board), now)
    items = gone + [p for p in old_probes(trees, now) if not any(p['path'].startswith(w['path'] + '/') for w in gone)]
    for item in items:
        item['mb'] = size_mb(item['path'])
    freed = 0
    if args.apply:
        for item in items:
            if item['kind'] == 'worktree':
                subprocess.run(['git', 'worktree', 'remove', '--force', item['path']], cwd=store, capture_output=True)
            if Path(item['path']).exists():
                shutil.rmtree(item['path'], ignore_errors=True)
            if not Path(item['path']).exists():
                freed += item['mb']
        git('worktree', 'prune', cwd=store)
    free = shutil.disk_usage(store).free / 1024 ** 3
    print(json.dumps({'applied': args.apply, 'candidate_count': len(items), 'candidate_mb': sum(i['mb'] for i in items),
                      'freed_mb': freed, 'disk_free_gb': round(free, 1), 'items': items}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
