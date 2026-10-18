export const boardDoorConfigs = {
  field1: [
  { id: "left", cell: "1-7", edge: "left", enemyCell: "1-7", toCell: "0-7", damage: 12, label: "дверь 2" },
  { id: "middle", cell: "7-9", edge: "center", enemyCell: "7-9", toCell: "8-9", damage: 6, label: "дверь 1" },
  { id: "center", cell: "3-2", edge: "right", enemyCell: "3-2", toCell: "4-2", damage: 20, label: "центральная дверь" },
  { id: "finish", cell: "9-0", edge: "right", enemyCell: "9-0", toCell: null, damage: 30, label: "финальный монстр", isFinalBoss: true },
  ],
  field2: [
    { id: "bottom", cell: "9-14", edge: "center", enemyCell: "9-14", toCell: "10-14", damage: 6, label: "монстр 1" },
    { id: "middle", cell: "8-9", edge: "center", enemyCell: "8-9", toCell: "8-10", damage: 12, label: "монстр 2" },
    { id: "upper", cell: "1-0", edge: "center", enemyCell: "1-0", toCell: "2-0", damage: 20, label: "монстр 3" },
    { id: "finish", cell: "10-6", edge: "center", enemyCell: "10-6", toCell: null, damage: 30, label: "финальный монстр", isFinalBoss: true },
  ],
};

export const doorConfigs = boardDoorConfigs.field1;

// Balance numbers of the board rules: one line per number. The game reads them by key via balance("key", эталон) in
// src/game.js; the эталон there is the value tests and probes rely on. The Google Sheet tab «Баланс» edits only `value`.
// Card numbers (events, artifacts, Лавка Джо cards) stay with the cards in cards.config.js and the cards sheet.
export const balanceConfig = [
  { key: "setup.startingCoins", value: 10, name: "Монеты на старте партии", unit: "монет", min: 0, max: 100 },
  { key: "rest.coins", value: 10, name: "Привал «Восстановиться»: монеты", unit: "монет", min: 0, max: 100 },
  { key: "rest.strength", value: 1, name: "Привал «Потренироваться»: сила", unit: "силы", min: 0, max: 20 },
  { key: "rest.steps", value: 2, name: "Привал «Ускориться»: прибавка к шагам", unit: "шагов", min: 0, max: 20 },
  { key: "field.green.coins", value: 3, name: "Зеленое поле: монеты", unit: "монет", min: 0, max: 50 },
  { key: "field.red.loss", value: 3, name: "Красное поле: потеря монет", unit: "монет", min: 0, max: 50 },
  { key: "field.veryBad.cards", value: 3, name: "Очень Плохо: сколько карт Плохо тянуть", unit: "карт", min: 1, max: 10 },
  { key: "field.tadam.coins", value: 5, name: "ТАДАМ: монеты за открытие карты", unit: "монет", min: 0, max: 50 },
  { key: "field.tadam.maxActive", value: 3, name: "ТАДАМ: сколько карт действует одновременно", unit: "карт", min: 1, max: 3 },
  { key: "field.vs.ante", value: 10, name: "VS: сколько скидывает каждый в банк", unit: "монет", min: 0, max: 100 },
  { key: "blackMarket.strength.cards", value: 1, name: "Черный рынок, сила: сколько карт Лавки отдать", unit: "карт", min: 1, max: 10 },
  { key: "blackMarket.strength.bonus", value: 2, name: "Черный рынок, сила: прибавка к силе", unit: "силы", min: 0, max: 50 },
  { key: "blackMarket.coins.cards", value: 2, name: "Черный рынок, монеты: сколько карт Лавки отдать", unit: "карт", min: 1, max: 10 },
  { key: "blackMarket.coins.reward", value: 30, name: "Черный рынок, монеты: награда", unit: "монет", min: 0, max: 200 },
  { key: "blackMarket.rush.cards", value: 3, name: "Черный рынок, рывок: сколько карт Лавки отдать", unit: "карт", min: 1, max: 10 },
  { key: "blackMarket.rush.bonus", value: 10, name: "Черный рынок, рывок: сила в следующем бою с монстром", unit: "силы", min: 0, max: 50 },
  { key: "blackMarket.rush.steps", value: 30, name: "Черный рынок, рывок: шаги вперед", unit: "шагов", min: 0, max: 100 },
  { key: "diceFortune.diceCount", value: 6, name: "Кубик удачи: сколько кубиков бросать", unit: "кубиков", min: 1, max: 12 },
  { key: "diceFortune.coinsPerSix", value: 10, name: "Кубик удачи: монеты за каждую 6", unit: "монет", min: 0, max: 100 },
  { key: "diceFortune.stepsBackPerOne", value: 10, name: "Кубик удачи: шаги назад за каждую 1", unit: "шагов", min: 0, max: 100 },
  { key: "shop.cardCost", value: 5, name: "Лавка Джо: цена карты", unit: "монет", min: 0, max: 100 },
  { key: "shop.offerCount", value: 2, name: "Лавка Джо (классика): сколько карт на выбор", unit: "карт", min: 1, max: 6 },
  { key: "shop.marketSize", value: 2, name: "Лавка Джо (рынок): сколько открытых карт", unit: "карт", min: 1, max: 6 },
  { key: "shop.buybackCost", value: 5, name: "Лавка Джо: выкуп перевернутой карты", unit: "монет", min: 0, max: 100 },
  { key: "monster.winDice", value: 1, name: "Победа над монстром: прибавка кубиков", unit: "кубиков", min: 0, max: 4 },
  { key: "monster.defeatStrength.tier1", value: 1, name: "Поражение от 1-го монстра: утешительная сила", unit: "силы", min: 0, max: 20 },
  { key: "monster.defeatStrength.tier2", value: 2, name: "Поражение от 2-го монстра: утешительная сила", unit: "силы", min: 0, max: 20 },
  { key: "monster.defeatStrength.tier3", value: 3, name: "Поражение от 3-го монстра: утешительная сила", unit: "силы", min: 0, max: 20 },
  { key: "monster.defeatStrength.tier4", value: 5, name: "Поражение от финального монстра: утешительная сила", unit: "силы", min: 0, max: 20 },
  { key: "dragon.segments", value: 32, name: "Дракон: делений счетчика до пробуждения", unit: "делений", min: 1, max: 100 },
  { key: "dragon.strengthPerPlayer", value: 35, name: "Дракон: сила за каждого игрока", unit: "силы", min: 0, max: 200 },
  { key: "dragon.prefill.p1", value: 22, name: "Дракон: заполнено делений на старте, 1 игрок", unit: "делений", min: 0, max: 100 },
  { key: "dragon.prefill.p2", value: 16, name: "Дракон: заполнено делений на старте, 2 игрока", unit: "делений", min: 0, max: 100 },
  { key: "dragon.prefill.p3", value: 8, name: "Дракон: заполнено делений на старте, 3 игрока", unit: "делений", min: 0, max: 100 },
  { key: "dragon.prefill.p4", value: 0, name: "Дракон: заполнено делений на старте, 4 игрока", unit: "делений", min: 0, max: 100 },
  { key: "boss.bonusPerOpponent", value: 3, name: "Финальная битва: сила босса за каждого противника", unit: "силы", min: 0, max: 100 },
  { key: "score.perShopCard", value: 5, name: "Итоговые очки: за каждую карту Лавки Джо", unit: "очков", min: 0, max: 50 },
];
