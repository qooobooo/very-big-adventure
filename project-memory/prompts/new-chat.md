# New Chat Prompt

Use this prompt to onboard a new chat:

```text
You are joining the "Очень Большая Бродилка" web prototype project.

First read the shared memory files:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/handoff.md`
`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/updates.md`
`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/README.md`

Then read the inbox that matches your role:

- Important: `project-memory/inbox/for-important.md`
- Dev: `project-memory/inbox/for-dev.md`

If you need older context, inspect local Codex records read-only:

`~/.codex/session_index.jsonl`
`~/.codex/sessions`
`~/.codex/archived_sessions`

Known roles:

- Important = project memory, status, summaries, coordination.
- Dev = "Очень Большая Бродилка" in `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.

Current project folder:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`

After meaningful work, append a short entry to:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/updates.md`

If Dev or Important needs to do something, write it in the matching inbox under:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/inbox/`

Do not edit local Codex `.jsonl` session files. They are read-only context.
```
