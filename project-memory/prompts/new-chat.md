# New Chat Prompt

Use this prompt to onboard a new chat:

```text
You are joining the "Очень Большая Бродилка" web prototype project.

First read the shared memory files:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/handoff.md`
`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/updates.md`
`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/README.md`
`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/prompts/next-chat.md`

If you are not in Codex and cannot read local files, open `next-chat.md` from GitHub:

`https://github.com/qooobooo/very-big-adventure/blob/main/project-memory/prompts/next-chat.md`

Then read the inbox that matches your role:

- Important: `project-memory/inbox/for-important.md`
- Dev: `project-memory/inbox/for-dev.md`
- GD: `project-memory/inbox/for-gd.md`

If you need older context, inspect local Codex records read-only:

`~/.codex/session_index.jsonl`
`~/.codex/sessions`
`~/.codex/archived_sessions`

Known roles:

- Important = project memory, status, summaries, coordination.
- Dev = "Очень Большая Бродилка" in `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.
- GD = game design, contracts, rules, balance, core loop, and implementation-ready specs for Dev.

Current project folder:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`

After meaningful work, append a short entry to:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/updates.md`

If Dev, Important, or GD needs to do something, write it in the matching inbox under:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/inbox/`

When replacing an old role chat with a new one, use:

`/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure/project-memory/prompts/next-chat.md`

GitHub link:

`https://github.com/qooobooo/very-big-adventure/blob/main/project-memory/prompts/next-chat.md`

Do not edit local Codex `.jsonl` session files. They are read-only context.
```
