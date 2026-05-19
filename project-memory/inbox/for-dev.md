# Inbox For Dev

For tasks related to "Очень Большая Бродилка" in `/Users/qooobooo/Game Dev/Very Big Adventure/very-big-adventure`.

## Open Items

- Card config workflow:
  - Treat Google Sheet `Cards Config` as the canonical card-edit source: `https://docs.google.com/spreadsheets/d/1dv8cOcoY9P1WZOw2UQ-prUccte2BprZMp0DFCSL0pME/edit`.
  - Tabs are `good`, `bad`, `tadam`, `shop`.
  - In the Google Sheet, `description` is column M and `new description` is column N.
  - When the user asks to apply config changes, read non-empty `new description` cells, copy each into `description`, update `src/cards.config.js`, sync `cards-google-sheet.csv`, then clear `new description` in Google Sheet.
  - If edited text changes numbers/rules, update matching effect fields too, not just text.
  - Keep `src/cards.config.js` and `cards-google-sheet.csv` aligned with Google Sheet when card balance or text changes.
