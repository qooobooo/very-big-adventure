#!/usr/bin/env python3
"""Narrow probes for deliveries (user decision 11 Oct 2026): one command, one result line to read.

    python3 tools/probe.py test tests/<file>.test.mjs [more files] [--out Logs/probes/{run}]
    python3 tools/probe.py shot --out Logs/probes/{run} [--path "/?seed=1"] [--size 1600x900] [--mobile]
                                [--wait "<js expr>"] [--eval "<js>"]... [--name frame] [--timeout 20]

Prints PASS … or FAIL … as the last line; the full output stays in the --out folder (read it only on a failure,
with a narrow grep). `shot` starts the game's server from this worktree on a port of its own (never the user's
:5173), takes a headless Chrome frame (tools/shot.mjs) and stops the server. A timeout is retried once: false
failures come from a loaded machine (The Village's experience), only a second one counts as a regression.
Each run is logged to the activity journal (tools/activity.py) for the «Проверки до доставки» line.
"""
import argparse
import os
from pathlib import Path
import re
import socket
import subprocess
import sys
import time
import zlib

ROOT = Path(__file__).resolve().parent.parent
USER_PORT = 5173


def stamp():
    return time.strftime('%Y%m%d-%H%M%S')


def log_activity(name, started, ok):
    try:
        sys.path.insert(0, str(ROOT / 'tools'))
        from activity import record
        record('probe', name, started, time.time() - started, ok)
    except Exception:  # the journal never breaks a probe
        pass


def free(port):
    with socket.socket() as probe:
        return probe.connect_ex(('127.0.0.1', port)) != 0


def own_port():
    """A port per worktree, stable between runs: 5174 + a hash of the folder name, the next free one if taken."""
    port = 5174 + zlib.crc32(ROOT.name.encode()) % 800
    while port == USER_PORT or not free(port):
        port += 1
    return port


def cmd_test(args, out):
    log = out / 'test.log'
    result = subprocess.run(['node', '--test', '--test-reporter=spec', *args.files], cwd=ROOT, text=True,
                            capture_output=True)
    text = result.stdout + result.stderr
    log.write_text(text, encoding='utf-8')
    counts = {name: int(value) for name, value in re.findall(r'ℹ (tests|pass|fail) (\d+)', text)}
    files = ' '.join(args.files)
    if result.returncode == 0:
        return True, f"PASS test {files} ({counts.get('pass', '?')}/{counts.get('tests', '?')})"
    failing = text.split('failing tests:', 1)[-1].strip().splitlines()[:30] if 'failing tests:' in text else text.strip().splitlines()[-20:]
    print('\n'.join(failing))
    return False, f"FAIL test {files} ({counts.get('fail', '?')} of {counts.get('tests', '?')} failed; log {log.relative_to(ROOT)})"


def cmd_shot(args, out):
    port = own_port()
    server_log = (out / 'server.log').open('w', encoding='utf-8')
    server = subprocess.Popen(['node', 'server.js'], cwd=ROOT, env={**os.environ, 'PORT': str(port), 'HOST': '127.0.0.1'},
                              stdin=subprocess.DEVNULL, stdout=server_log, stderr=subprocess.STDOUT, start_new_session=True)
    try:
        for _ in range(100):
            if not free(port) or server.poll() is not None:
                break
            time.sleep(0.1)
        if server.poll() is not None or free(port):
            return False, f'FAIL shot: the server did not start on :{port} (log {(out / "server.log").relative_to(ROOT)})'
        frame = out / f'{args.name}.png'
        command = ['node', 'tools/shot.mjs', '--url', f'http://127.0.0.1:{port}{args.path}', '--out', str(frame),
                   '--size', args.size, '--timeout', str(args.timeout)]
        command += ['--mobile'] if args.mobile else []
        command += ['--wait', args.wait] if args.wait else []
        for step in args.eval:
            command += ['--eval', step]
        for attempt in (1, 2):
            result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True)
            (out / 'shot.log').write_text(result.stdout + result.stderr, encoding='utf-8')
            if result.returncode != 3 or attempt == 2:
                break
            print('timeout, one retry: ' + result.stdout.strip().splitlines()[-1])
        lines = result.stdout.strip().splitlines()
        if result.returncode == 0:
            return True, f'PASS shot {frame.relative_to(ROOT)} ({args.size}{" mobile" if args.mobile else ""})'
        print('\n'.join(lines[-8:]))
        return False, f'FAIL shot {args.path}: ' + (lines[-1] if lines else f'exit {result.returncode}')
    finally:
        server.terminate()
        try:
            server.wait(5)
        except subprocess.TimeoutExpired:
            server.kill()
        server_log.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest='kind', required=True)
    test = sub.add_parser('test', help='node --test on the given files')
    test.add_argument('files', nargs='+')
    test.add_argument('--out')
    shot = sub.add_parser('shot', help='a headless Chrome frame of the game served from this worktree')
    shot.add_argument('--out')
    shot.add_argument('--path', default='/')
    shot.add_argument('--size', default='1600x900')
    shot.add_argument('--mobile', action='store_true')
    shot.add_argument('--wait')
    shot.add_argument('--eval', action='append', default=[])
    shot.add_argument('--name', default='frame')
    shot.add_argument('--timeout', type=int, default=20)
    args = parser.parse_args()
    out = ROOT / (args.out or f'Logs/probes/{stamp()}-{args.kind}')
    out.mkdir(parents=True, exist_ok=True)
    started = time.time()
    ok, line = (cmd_test if args.kind == 'test' else cmd_shot)(args, out)
    log_activity(f"{args.kind} {' '.join(getattr(args, 'files', [])) or args.path}", started, ok)
    print(line, flush=True)
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
