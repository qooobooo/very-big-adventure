# Read News Prompt

Use this file when the user says exactly or approximately: "прочти новости".

Meaning of that request: refresh yourself from project memory, summarize what changed recently, and update the user-facing working context without changing game code unless the user separately asks for implementation.

```text
Ты прочитал `project-memory/prompts/read-news.md`. Теперь твоя задача - обновить свой контекст по свежим новостям проекта.

Сначала прочитай:
- `project-memory/README.md`
- `project-memory/handoff.md`
- `project-memory/updates.md`
- inbox своей роли:
  - `Important`: `project-memory/inbox/for-important.md`
  - `Dev`: `project-memory/inbox/for-dev.md`
  - `GD`: `project-memory/inbox/for-gd.md`
  - `UI`: `project-memory/inbox/for-ui.md`, если файл есть
- `project-memory/prompts/new-chat.md`
- `project-memory/prompts/next-chat.md`

Если ты работаешь с файлами проекта, дополнительно проверь:
- `pwd`
- `git status --short`
- `git status --branch --short`
- последние 3-5 коммитов

После чтения дай пользователю краткое обновление:
- свежие изменения по проекту;
- что важно для твоей роли;
- какие файлы/зоны сейчас активны;
- какие локальные незакоммиченные изменения есть, если ты проверял git;
- какие открытые вопросы или риски есть;
- что ты готов делать дальше.

Если `updates.md` очень большой:
- читай свежие записи сверху вниз;
- при необходимости отдельно посмотри `handoff.md` для стабильного состояния;
- не пересказывай всю историю, выделяй только свежие и важные изменения.

Правила:
- Не редактируй игровой код только из-за команды "прочти новости".
- Не редактируй локальные Codex `.jsonl`.
- Не делай `git reset --hard`.
- Если во время чтения новостей понял важное изменение статуса, которое должно попасть в память, предложи или добавь краткую запись в `project-memory/updates.md` согласно роли и ситуации.
- Если не уверен, какие новости считать последними, скажи это явно и используй верхние записи `updates.md`.
```

