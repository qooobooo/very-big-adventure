export const boardDoorConfigs = {
  field1: [
  { id: "left", cell: "1-7", edge: "left", enemyCell: "1-7", toCell: "0-7", damage: 10, label: "дверь 2" },
  { id: "middle", cell: "7-9", edge: "center", enemyCell: "7-9", toCell: "8-9", damage: 6, label: "дверь 1" },
  { id: "center", cell: "3-2", edge: "right", enemyCell: "3-2", toCell: "4-2", damage: 16, label: "центральная дверь" },
  { id: "finish", cell: "9-0", edge: "right", enemyCell: "9-0", toCell: null, damage: 24, label: "финальный монстр", isFinalBoss: true },
  ],
  field2: [
    { id: "bottom", cell: "9-14", edge: "center", enemyCell: "9-14", toCell: "10-14", damage: 6, label: "нижний монстр" },
    { id: "middle", cell: "8-9", edge: "center", enemyCell: "8-9", toCell: "8-10", damage: 10, label: "средний монстр" },
    { id: "upper", cell: "1-0", edge: "center", enemyCell: "1-0", toCell: "2-0", damage: 16, label: "верхний монстр" },
    { id: "finish", cell: "10-6", edge: "center", enemyCell: "10-6", toCell: null, damage: 24, label: "финальный монстр", isFinalBoss: true },
  ],
};

export const doorConfigs = boardDoorConfigs.field1;
