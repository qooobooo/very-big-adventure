export const cardConfig = {
  good: [
    {
      id: "coins10",
      title: "Получить 10 монет",
      description: "Игрок сразу получает 10 монет.",
      effect: { type: "coins", amount: 10 },
    },
    {
      id: "forward10",
      title: "Продвинуться на 10 шагов вперед",
      description: "Игрок сразу двигается на 10 шагов вперед по маршруту.",
      effect: { type: "move", steps: 10 },
    },
    {
      id: "steal5",
      title: "Забери 5 монет у игрока с наибольшим количеством монет",
      description: "Забери 5 монет у игрока с наибольшим количеством монет.",
      effect: { type: "steal-richest", amount: 5 },
    },
  ],
  bad: [
    {
      id: "lose10",
      title: "Потерять 10 монет",
      description: "Игрок теряет до 10 монет.",
      effect: { type: "coins", amount: -10 },
    },
    {
      id: "back10",
      title: "Отойти на 10 шагов назад",
      description: "Игрок сразу отходит на 10 шагов назад по основному маршруту.",
      effect: { type: "move", steps: -10 },
    },
    {
      id: "give5",
      title: "Отдать случайному игроку 5 монет",
      description: "Выбирается случайный соперник. Игрок отдает ему до 5 монет.",
      effect: { type: "give-random", amount: 5 },
    },
  ],
  tadam: [
    {
      id: "green-forward",
      title: "Зеленые поля двигают на 5 клеток вперед",
      description: "Пока карта лежит на столе, зеленые поля вместо монет двигают игрока на 5 шагов вперед.",
      effect: { type: "green-field", mode: "move", steps: 5 },
    },
    {
      id: "red-back",
      title: "Красные поля двигают на 5 клеток назад",
      description: "Пока карта лежит на столе, красные поля вместо монет двигают игрока на 5 шагов назад.",
      effect: { type: "red-field", mode: "move", steps: -5 },
    },
    {
      id: "green-good",
      title: 'Зеленые поля дают карту "Хорошо"',
      description: 'Пока карта лежит на столе, зеленые поля дают случайную карту из колоды "Хорошо".',
      effect: { type: "green-field", mode: "draw", deck: "good" },
    },
    {
      id: "red-bad",
      title: 'Красные поля дают карту "Плохо"',
      description: 'Пока карта лежит на столе, красные поля дают случайную карту из колоды "Плохо".',
      effect: { type: "red-field", mode: "draw", deck: "bad" },
    },
    {
      id: "jump-steal",
      title: "Перепрыгивая игрока, забери у него 3 монеты",
      description: "Если во время движения игрок проходит через клетку с другим игроком, он забирает у него до 3 монет.",
      effect: { type: "jump-steal", amount: 3 },
    },
    {
      id: "land-steal",
      title: "Если остановился на клетке с другим игроком, забери у него 10 монет",
      description: "Если игрок заканчивает ход на клетке с другим игроком, он забирает у него до 10 монет.",
      effect: { type: "land-steal", amount: 10 },
    },
  ],
  shop: [
    {
      id: "step-plus",
      title: "+1 к броску кубика",
      shortTitle: "+1 к броску",
      description: "Каждый бросок владельца этой карты получает +1 к результату.",
      effect: { type: "passive-step-bonus", steps: 1 },
    },
    {
      id: "coin-plus",
      title: "Когда получаешь монеты, получай на 2 больше",
      shortTitle: "+2 к монетам",
      description: "Каждый раз, когда владелец получает монеты, он получает дополнительно 2 монеты.",
      effect: { type: "passive-coin-bonus", amount: 2 },
    },
    {
      id: "extra-die",
      title: "Перед ходом можешь заплатить 5 монет и кинуть на 1 кубик больше",
      shortTitle: "+1 кубик за 5",
      description: "Перед броском владелец может заплатить 5 монет, чтобы бросить на 1 кубик больше.",
      effect: { type: "optional-extra-die", cost: 5, dice: 1 },
    },
  ],
};
