# Inbox For Dev

For tasks related to "Очень Большая Бродилка" in `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.

## Open Items

- Card config workflow:
  - Treat Google Sheet `Cards Config` as the canonical card-edit source: `https://docs.google.com/spreadsheets/d/1dv8cOcoY9P1WZOw2UQ-prUccte2BprZMp0DFCSL0pME/edit`.
  - Tabs are `good`, `bad`, `tadam`, `shop`.
  - Card names use `title`; Good-card face text uses `description`.
  - Current sheet/local CSV order is `deck,id,title,shortTitle,effect_type,amount,steps,cost,dice,mode,target_deck,notes,count,description`.
  - When the user asks to apply config changes, update `title` and matching effect fields/logic directly, then sync `src/cards.config.js` and `cards-google-sheet.csv`.
  - If edited title/rules change numbers, update matching effect fields too, not just text.
  - Keep `src/cards.config.js` and `cards-google-sheet.csv` aligned with Google Sheet when card balance or text changes.
