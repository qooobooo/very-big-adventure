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

0. For planning and executing multi-role work, GD routes tasks through the appropriate specialists by default:
   - Dev handles implementation.
   - Art / UI handles visual assets, board presentation, and UI polish.
   - QA handles testing only when the user explicitly asks to involve QA.
   - GD should not directly implement cross-role plans unless the user explicitly asks GD to do the implementation personally or an urgent tiny documentation/memory edit is enough.
   - GD plans and multi-role tasks must include explicit `Ownership`: which role/chat owns each part of the work.
   - If a task is split into waves, every wave must have an assigned owner before it is sent to development.
1. GD creates a clear implementation-ready task and sends it to the right executor:
   - Dev tasks go to `inbox/for-dev.md` and may also be sent directly to a Dev thread.
   - QA tasks go to `inbox/for-qa.md` only when the user explicitly asks to involve QA, for example says `привлеки QA`.
   - Art / UI tasks go to the matching Art / UI inbox or thread.
2. By default, QA and GD approval gates are skipped. The executor completes the task, writes a short handback, updates `updates.md`, and sends the finished task to GD only as a context note.
3. GD does not verify or approve handbacks by default:
   - GD keeps the result in mind for future design decisions and user reports.
   - GD checks, approves, rejects, or writes rework only when the user explicitly asks for review/approval/checking, or when GD is separately asked to involve QA.
4. If the user explicitly asks to involve QA, use the QA-gated pipeline:
   - The executor sends the finished task to QA first.
   - If QA does not approve the task, QA sends a reproducible rework task back to the executor.
   - If QA approves the task, QA sends the result to GD as a context note unless the user also asked for GD approval.
5. If the user explicitly asks for GD approval/checking, GD reviews the handback:
   - If approved, GD gives the user a brief report and marks/records the task as accepted.
   - If not approved, GD gives the user a brief report, writes a clear rework task, and sends it back to the executor.

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

## Card Text Style

- Player-facing card text never ends with a final period.
- If a card has several sentences, periods may stay between sentences, but the final sentence must have no trailing period.
- Apply this to `Cards Config` player-facing fields such as `title`, `shortTitle`, and `description`, and keep Google Sheet, `src/cards.config.js`, and `cards-google-sheet.csv` aligned.
- Internal config notes may keep normal punctuation unless they are displayed on a card.

## Card Face Layout

- Card faces should use the card area tightly: keep clean edge padding, but avoid large empty lower areas.
- The top illustration should be compact, roughly the upper 40-45% of the face at most, so long text can stay readable.
- Text should start around the middle of the card, fill the lower half, and keep a small bottom margin instead of floating near the top.
- Split multi-sentence card descriptions into separate visual lines/paragraphs where possible.
- Prefer larger readable text with balanced wrapping; avoid clipped text, one-letter wraps, and excessive shrinking.
