# Project Memory

This folder is the shared mailbox for Codex chats working on "Очень Большая Бродилка".

## Routine

1. Before work, read:
   - `handoff.md`
   - `updates.md`
   - your inbox in `inbox/`
   - `prompts/next-chat.md`
   - `prompts/read-news.md`
2. During work, keep edits inside your assigned project folder.
3. After meaningful work, append a short update to `updates.md`.
4. If Dev 1, Dev 2, Dev 3, Important, GD, Art / UI 1, Art / UI 2, QA 1, or QA 2 needs to act, write a note in the matching inbox file.

## Task Lifecycle

1. GD creates a clear implementation-ready task and sends it to the right executor:
   - Dev tasks go to `inbox/for-dev.md` and may also be sent directly to a Dev thread.
   - QA-only verification tasks go to `inbox/for-qa.md`.
   - Art / UI tasks go to the matching Art / UI inbox or thread.
2. The executor completes the task, writes a short handback, updates `updates.md`, and sends the finished task to QA.
3. QA is the first approval gate:
   - If QA does not approve the task, QA sends a reproducible rework task back to the executor.
   - If QA approves the task, QA sends the approved result to GD for final approval.
4. GD reviews the QA-approved task:
   - If approved, GD gives the user a brief report and marks/records the task as accepted.
   - If not approved, GD gives the user a brief report, writes a clear rework task, and sends it back to the executor.
5. This loop continues until GD explicitly approves the task.

## Chat Roles

- `Important`: project memory, summaries, status, and coordination.
- `Dev 1`: main "Очень Большая Бродилка" prototype in `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.
- `Dev 2`: additional implementation chat for the prototype.
- `Dev 3`: additional implementation chat for the prototype.
- `GD`: game design for "Очень Большая Бродилка"; owns rules, contracts, balance, core loop, and implementation-ready design notes for Dev roles.
- `Art / UI 1`: visual assets and UI direction for the prototype.
- `Art / UI 2`: additional visual assets and UI direction chat for the prototype.
- `QA 1`: testing, smoke checks, regression checks, and bug reports for Dev roles.
- `QA 2`: additional testing chat for smoke checks, regression checks, and bug reports.

Do not edit local Codex session logs. They are read-only context.

GitHub link for `next-chat.md`, useful for browser ChatGPT chats without local file access:
`https://github.com/qooobooo/very-big-adventure/blob/main/project-memory/prompts/next-chat.md`

Use `prompts/read-news.md` when the user says "прочти новости".
