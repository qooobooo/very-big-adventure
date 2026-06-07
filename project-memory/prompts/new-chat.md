# New Chat Prompt

Use this prompt to onboard a new chat:

```text
You are joining the "Очень Большая Бродилка" web prototype project.

First read the shared memory files:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/handoff.md`
`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/updates.md`
`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/README.md`
`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/prompts/next-chat.md`
`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/prompts/read-news.md`

If you are not in Codex and cannot read local files, open `next-chat.md` from GitHub:

`https://github.com/qooobooo/very-big-adventure/blob/main/project-memory/prompts/next-chat.md`

Then read the inbox that matches your role:

- Important: `project-memory/inbox/for-important.md`
- Dev 1 / Dev 2 / Dev 3: `project-memory/inbox/for-dev.md`
- GD: `project-memory/inbox/for-gd.md`
- Art / UI: `project-memory/inbox/for-ui.md`
- QA 1 / QA 2: `project-memory/inbox/for-qa.md`

If you need older context, inspect local Codex records read-only:

`~/.codex/session_index.jsonl`
`~/.codex/sessions`
`~/.codex/archived_sessions`

Known roles:

- Important = project memory, status, summaries, coordination.
- Dev 1 / Dev 2 / Dev 3 = "Очень Большая Бродилка" implementation in `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.
- GD = game design, contracts, rules, balance, core loop, and implementation-ready specs for Dev roles.
- Art / UI = visual assets and UI direction for the prototype.
- QA 1 / QA 2 = testing, smoke checks, regression checks, and bug reports for Dev roles.

Required task lifecycle:

- GD creates implementation-ready tasks for the executor.
- The executor completes the task, writes a handback, updates `updates.md`, and sends the result to QA.
- QA is the first approval gate: approve and forward to GD, or return a reproducible rework task to the executor.
- GD gives final approval only after QA approval, or sends clear rework back to the executor.
- A task is not final until GD explicitly approves it.

Current project folder:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`

After meaningful work, append a short entry to:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/updates.md`

If Dev 1, Dev 2, Dev 3, Important, GD, Art / UI, QA 1, or QA 2 needs to do something, write it in the matching inbox under:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/inbox/`

When replacing an old role chat with a new one, use:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/prompts/next-chat.md`

GitHub link:

`https://github.com/qooobooo/very-big-adventure/blob/main/project-memory/prompts/next-chat.md`

For refreshing current project news, use:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/prompts/read-news.md`

Do not edit local Codex `.jsonl` session files. They are read-only context.
```
