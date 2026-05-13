import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const workbook = Workbook.create();

const SOURCE_URL = "https://store.steampowered.com/stats/stats/";
const SNAPSHOT = "9 May 2026 @ 7:30pm";
const GENERATED = "10 May 2026";
const OUTPUT_DIR = "/Users/qooobooo/Documents/New project/outputs/steam_popularity_report";
const OUTPUT_FILE = path.join(OUTPUT_DIR, "steam_popularity_report_2026-05-10.xlsx");

const platformStats = {
  currentUsers: 27099787,
  peakUsers: 39902498,
};

const data = [
  [1, "Counter-Strike 2", 662196, 1446014],
  [2, "Dota 2", 334828, 646792],
  [3, "PUBG: BATTLEGROUNDS", 175099, 822514],
  [4, "FiveM", 131443, 203196],
  [5, "Slay the Spire 2", 129208, 233369],
  [6, "Bongo Cat", 118031, 147772],
  [7, "Apex Legends", 113968, 325502],
  [8, "Rust", 105979, 189577],
  [9, "Marvel Rivals", 82380, 87270],
  [10, "Tom Clancy's Rainbow Six Siege", 81534, 95029],
  [11, "R.E.P.O.", 78256, 116059],
  [12, "Delta Force", 77840, 183612],
  [13, "ARC Raiders", 69598, 95927],
  [14, "Wallpaper Engine", 68918, 124225],
  [15, "Windrose", 66773, 99478],
  [16, "Overwatch®", 61575, 77453],
  [17, "Warframe", 61057, 79276],
  [18, "VRChat", 58632, 62716],
  [19, "Geometry Dash", 58507, 93160],
  [20, "Crimson Desert", 55262, 77954],
  [21, "Stardew Valley", 53765, 98580],
  [22, "Baldur's Gate 3", 51304, 64956],
  [23, "Dead by Daylight", 50926, 71495],
  [24, "War Thunder", 49134, 100075],
  [25, "Grand Theft Auto V Legacy", 46888, 102697],
  [26, "Team Fortress 2", 45810, 54476],
  [27, "Limbus Company", 44041, 64437],
  [28, "EA SPORTS FC™ 26", 41802, 75529],
  [29, "HELLDIVERS™ 2", 41743, 52762],
  [30, "Grand Theft Auto V Enhanced", 41335, 77866],
  [31, "Diablo® IV", 39958, 59072],
  [32, "Battlefield™ 6", 39277, 53126],
  [33, "Call of Duty®", 38745, 44787],
  [34, "Left 4 Dead 2", 36030, 36066],
  [35, "DayZ", 35488, 64165],
  [36, "Gamble With Your Friends", 35089, 42848],
  [37, "Crosshair X", 33894, 45343],
  [38, "ELDEN RING", 33625, 47152],
  [39, "Hearts of Iron IV", 33396, 69366],
  [40, "Spacewar", 32783, 74486],
  [41, "FINAL FANTASY XIV Online", 32161, 34810],
  [42, "Sid Meier's Civilization VI", 31681, 52297],
  [43, "Counter-Strike: Source", 29613, 30670],
  [44, "Far Far West", 29515, 34912],
  [45, "Conan Exiles Enhanced", 29370, 44064],
  [46, "Cyberpunk 2077", 29303, 45785],
  [47, "RimWorld", 27468, 37549],
  [48, "Project Zomboid", 27354, 38241],
  [49, "Terraria", 25064, 39857],
  [50, "PAYDAY 2", 24885, 27241],
  [51, "The Elder Scrolls V: Skyrim Special Edition", 24727, 30507],
  [52, "The Sims™ 4", 24529, 33966],
  [53, "NBA 2K26", 24408, 44854],
  [54, "Counter-Strike:Global Offensive", 24243, 31384],
  [55, "ARK: Survival Ascended", 24192, 30951],
  [56, "Red Dead Redemption 2", 22715, 37561],
  [57, "tModLoader", 22020, 38026],
  [58, "7 Days to Die", 21196, 31387],
  [59, "BidKing", 21039, 40136],
  [60, "Garry's Mod", 21006, 37502],
  [61, "Don't Starve Together", 20870, 51667],
  [62, "Rocket League", 20431, 30421],
  [63, "Total War: WARHAMMER III", 19268, 31112],
  [64, "Age of Empires II: Definitive Edition", 19227, 26622],
  [65, "Black Desert", 19044, 23239],
  [66, "Mount & Blade II: Bannerlord", 18868, 35902],
  [67, "Heroes of Might and Magic: Olden Era", 18682, 49712],
  [68, "BeamNG.drive", 18634, 32429],
  [69, "Crusader Kings III", 18306, 28728],
  [70, "ELDEN RING NIGHTREIGN", 18287, 42756],
  [71, "Football Manager 26", 18108, 44569],
  [72, "Valheim", 17716, 29241],
  [73, "Stellaris", 17634, 23615],
  [74, "Street Fighter™ 6", 17610, 38513],
  [75, "Palworld", 17322, 25812],
  [76, "Phasmophobia", 17153, 24422],
  [77, "The Binding of Isaac: Rebirth", 16918, 25192],
  [78, "Wuthering Waves", 16869, 26698],
  [79, "Arena Breakout: Infinite", 16797, 30046],
  [80, "Schedule I", 16745, 22736],
  [81, "Satisfactory", 16517, 27080],
  [82, "Farming Simulator 25", 16393, 43523],
  [83, "Resident Evil Requiem", 16381, 23713],
  [84, "ARK: Survival Evolved", 16287, 27443],
  [85, "PEAK", 16261, 20518],
  [86, "Euro Truck Simulator 2", 16236, 46504],
  [87, "Factorio", 16120, 24673],
  [88, "Where Winds Meet", 16101, 32647],
  [89, "Heartopia", 15958, 27690],
  [90, "NARAKA: BLADEPOINT", 15629, 71175],
  [91, "Unturned", 15466, 27544],
  [92, "Kerbal Space Program", 15299, 21190],
  [93, "Yu-Gi-Oh! Master Duel", 14993, 20188],
  [94, "THE FINALS", 14409, 20228],
  [95, "Enshrouded", 14326, 23797],
  [96, "The Isle", 14218, 19692],
  [97, "Arma Reforger", 14188, 21922],
  [98, "Marathon", 14153, 15378],
  [99, "OBS Studio", 14123, 30233],
  [100, "Sid Meier's Civilization V", 13964, 19418],
];

const totalCurrent = data.reduce((sum, row) => sum + row[2], 0);
const totalDailyPeak = data.reduce((sum, row) => sum + row[3], 0);
const top10Current = data.slice(0, 10).reduce((sum, row) => sum + row[2], 0);
const top20Current = data.slice(0, 20).reduce((sum, row) => sum + row[2], 0);

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function fmtInt(value) {
  return Math.round(value).toLocaleString("en-US");
}

function fmtPct(value) {
  return `${(value * 100).toFixed(1)}%`;
}

const medianCurrent = median(data.map((row) => row[2]));
const medianStickiness = median(data.map((row) => row[2] / row[3]));

const topByStickiness = [...data]
  .map((row) => ({ rank: row[0], game: row[1], current: row[2], peak: row[3], ratio: row[2] / row[3] }))
  .sort((a, b) => b.ratio - a.ratio)
  .slice(0, 10);

const topByDrop = [...data]
  .map((row) => ({ rank: row[0], game: row[1], current: row[2], peak: row[3], gap: row[3] - row[2] }))
  .sort((a, b) => b.gap - a.gap)
  .slice(0, 10);

function ws(name) {
  return workbook.worksheets.add(name);
}

function range(sheet, address) {
  return sheet.getRange(address);
}

function safe(label, fn) {
  try {
    return fn();
  } catch (error) {
    console.warn(`Skipped ${label}: ${error.message}`);
    return undefined;
  }
}

function values(sheet, address, matrix) {
  range(sheet, address).values = matrix;
}

function formulas(sheet, address, matrix) {
  range(sheet, address).formulas = matrix;
}

function styleRange(sheet, address, style) {
  const r = range(sheet, address);
  safe(`style ${sheet.name}!${address}`, () => {
    if (style.fill && r.format?.fill) r.format.fill.color = style.fill;
    if (style.fontColor && r.format?.font) r.format.font.color = style.fontColor;
    if (style.bold !== undefined && r.format?.font) r.format.font.bold = style.bold;
    if (style.fontSize !== undefined && r.format?.font) r.format.font.size = style.fontSize;
    if (style.wrap !== undefined && r.format) r.format.wrapText = style.wrap;
    if (style.hAlign && r.format) r.format.horizontalAlignment = style.hAlign;
    if (style.vAlign && r.format) r.format.verticalAlignment = style.vAlign;
  });
}

function width(sheet, col, px) {
  safe(`column width ${sheet.name}!${col}`, () => {
    range(sheet, `${col}:${col}`).format.columnWidthPx = px;
  });
}

function height(sheet, row, px) {
  safe(`row height ${sheet.name}!${row}`, () => {
    range(sheet, `${row}:${row}`).format.rowHeightPx = px;
  });
}

function colNumber(col) {
  return [...col].reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0);
}

function rangeDimensions(address) {
  const clean = address.includes("!") ? address.split("!").pop() : address;
  const [start, end = start] = clean.split(":");
  const startMatch = start.match(/^([A-Z]+)(\d+)$/);
  const endMatch = end.match(/^([A-Z]+)(\d+)$/);
  if (!startMatch || !endMatch) return { rows: 1, cols: 1 };
  return {
    rows: Number(endMatch[2]) - Number(startMatch[2]) + 1,
    cols: colNumber(endMatch[1]) - colNumber(startMatch[1]) + 1,
  };
}

function numberFormat(sheet, address, formatCode) {
  safe(`number format ${sheet.name}!${address}`, () => {
    const dims = rangeDimensions(address);
    range(sheet, address).numberFormat = Array.from({ length: dims.rows }, () =>
      Array.from({ length: dims.cols }, () => formatCode),
    );
  });
}

function border(sheet, address, color = "#D7DEE8") {
  safe(`border ${sheet.name}!${address}`, () => {
    const borders = range(sheet, address).format.borders;
    for (const key of ["InsideHorizontal", "InsideVertical", "EdgeBottom", "EdgeTop", "EdgeLeft", "EdgeRight"]) {
      const b = borders.getItem(key);
      b.color = color;
    }
  });
}

function addChart(sheet, type, config) {
  safe(`chart ${config.title}`, () => {
    const chart = sheet.charts.add(type, config);
    return chart;
  });
}

function shortName(name) {
  return name
    .replace("Tom Clancy's Rainbow Six Siege", "Rainbow Six Siege")
    .replace("Counter-Strike:Global Offensive", "CS:GO")
    .replace("Grand Theft Auto V", "GTA V")
    .replace("The Elder Scrolls V: Skyrim Special Edition", "Skyrim SE")
    .replace("Sid Meier's Civilization", "Civilization")
    .replace("PUBG: BATTLEGROUNDS", "PUBG");
}

const dashboard = ws("Dashboard");
const top100 = ws("Top100");
const chartData = ws("ChartData");
const sources = ws("Sources");

for (const sheet of [dashboard, top100, chartData, sources]) {
  safe(`gridlines ${sheet.name}`, () => {
    sheet.showGridlines = false;
  });
}

values(top100, "A1:I1", [[
  "Ранг",
  "Игра / приложение",
  "Текущие игроки",
  "Пик сегодня",
  "Текущие / пик",
  "Доля в топ-100",
  "Запас до дневного пика",
  "Сегмент",
  "Источник",
]]);

values(top100, `A2:D${data.length + 1}`, data);
formulas(
  top100,
  `E2:H${data.length + 1}`,
  data.map((row, index) => {
    const r = index + 2;
    return [
      `=IF(D${r}=0,0,C${r}/D${r})`,
      `=C${r}/SUM($C$2:$C$${data.length + 1})`,
      `=D${r}-C${r}`,
      `=IFS(C${r}>=100000,"100k+",C${r}>=50000,"50-100k",C${r}>=25000,"25-50k",TRUE,"<25k")`,
    ];
  }),
);
values(top100, `I2:I${data.length + 1}`, data.map(() => [SOURCE_URL]));

styleRange(top100, "A1:I1", { fill: "#1F4E79", fontColor: "#FFFFFF", bold: true, hAlign: "Center", vAlign: "Center" });
styleRange(top100, `A2:I${data.length + 1}`, { fill: "#FFFFFF", vAlign: "Center" });
styleRange(top100, "B2:B101", { bold: true });
border(top100, `A1:I${data.length + 1}`);
numberFormat(top100, "C2:D101", "#,##0");
numberFormat(top100, "E2:F101", "0.0%");
numberFormat(top100, "G2:G101", "#,##0");
width(top100, "A", 58);
width(top100, "B", 270);
width(top100, "C", 125);
width(top100, "D", 115);
width(top100, "E", 110);
width(top100, "F", 115);
width(top100, "G", 150);
width(top100, "H", 90);
width(top100, "I", 300);
height(top100, "1", 30);

safe("freeze Top100", () => {
  top100.freezePanes.freezeRows(1);
});
safe("autofilter Top100", () => {
  top100.autoFilter.apply(range(top100, "A1:I101"));
});

values(chartData, "A1:B1", [["Игра", "Текущие игроки"]]);
values(chartData, "A2:B16", data.slice(0, 15).map((row) => [shortName(row[1]), row[2]]));
values(chartData, "D1:F1", [["Игра", "Текущие игроки", "Пик сегодня"]]);
values(chartData, "D2:F11", data.slice(0, 10).map((row) => [shortName(row[1]), row[2], row[3]]));
values(chartData, "H1:I1", [["Группа", "Текущие игроки"]]);
values(chartData, "H2:I4", [
  ["Топ-10", top10Current],
  ["11-20", top20Current - top10Current],
  ["21-100", totalCurrent - top20Current],
]);
values(chartData, "K1:N1", [["Ранг", "Игра", "Текущие / пик", "Текущие игроки"]]);
values(chartData, "K2:N11", topByStickiness.map((row) => [row.rank, shortName(row.game), row.ratio, row.current]));
values(chartData, "P1:S1", [["Ранг", "Игра", "Пик минус текущие", "Пик сегодня"]]);
values(chartData, "P2:S11", topByDrop.map((row) => [row.rank, shortName(row.game), row.gap, row.peak]));
styleRange(chartData, "A1:S1", { fill: "#1F4E79", fontColor: "#FFFFFF", bold: true, hAlign: "Center" });
border(chartData, "A1:S11");
numberFormat(chartData, "B2:B16", "#,##0");
numberFormat(chartData, "E2:F11", "#,##0");
numberFormat(chartData, "I2:I4", "#,##0");
numberFormat(chartData, "M2:M11", "0.0%");
numberFormat(chartData, "N2:N11", "#,##0");
numberFormat(chartData, "R2:S11", "#,##0");
for (const [col, px] of Object.entries({ A: 180, B: 120, D: 170, E: 120, F: 115, H: 110, I: 120, K: 58, L: 170, M: 110, N: 120, P: 58, Q: 170, R: 145, S: 115 })) {
  width(chartData, col, px);
}

values(sources, "A1:D1", [["Раздел", "Значение", "Источник / примечание", "URL"]]);
values(sources, "A2:D9", [
  ["Основной источник", "Steam & Game Stats", "Официальная страница Steam Stats, блок Top games by current player count", SOURCE_URL],
  ["Дата обновления источника", SNAPSHOT, "Время указано так, как его публикует Steam", SOURCE_URL],
  ["Дата подготовки отчета", GENERATED, "Локальная дата подготовки файла", ""],
  ["Метрика: текущие игроки", "Current Players", "Игроки онлайн на момент среза Steam Stats", SOURCE_URL],
  ["Метрика: пик сегодня", "Peak Today", "Максимум игроков за текущий день по каждой игре; пики не складываются как одновременная аудитория", SOURCE_URL],
  ["Охват", "Топ-100 по текущим игрокам", "Рейтинг отсортирован по Current Players на странице Steam Stats", SOURCE_URL],
  ["Оговорка", "В топ могут попадать приложения", "Steam Stats показывает продукты Steam; например, среди позиций есть Wallpaper Engine и OBS Studio", SOURCE_URL],
  ["Методика", "Формулы в листах", "Доли, сегменты и разрывы считаются внутри топ-100 из исходных чисел", ""],
]);
styleRange(sources, "A1:D1", { fill: "#1F4E79", fontColor: "#FFFFFF", bold: true, hAlign: "Center" });
border(sources, "A1:D9");
width(sources, "A", 190);
width(sources, "B", 210);
width(sources, "C", 470);
width(sources, "D", 330);
styleRange(sources, "A2:D9", { wrap: true, vAlign: "Top" });

values(dashboard, "A1:A1", [["Популярность игр в Steam"]]);
values(dashboard, "A2:A2", [[`Срез Steam Stats: ${SNAPSHOT}; отчет подготовлен ${GENERATED}`]]);
values(dashboard, "A4:B4", [["Ключевые показатели", "Значение"]]);
values(dashboard, "A5:A13", [
  ["Текущие пользователи Steam"],
  ["Пиковые пользователи Steam за 48 часов"],
  ["Сумма текущих игроков в топ-100"],
  ["Сумма дневных пиков топ-100"],
  ["Доля топ-10 в текущих игроках топ-100"],
  ["Доля топ-20 в текущих игроках топ-100"],
  ["Лидер по текущим игрокам"],
  ["Медиана текущих игроков"],
  ["Медианный коэффициент текущие/пик"],
]);
values(dashboard, "B5:B6", [
  [platformStats.currentUsers],
  [platformStats.peakUsers],
]);
formulas(dashboard, "B7:B13", [
  ["=SUM(Top100!C2:C101)"],
  ["=SUM(Top100!D2:D101)"],
  ["=SUM(Top100!C2:C11)/SUM(Top100!C2:C101)"],
  ["=SUM(Top100!C2:C21)/SUM(Top100!C2:C101)"],
  ["=INDEX(Top100!B2:B101,MATCH(MAX(Top100!C2:C101),Top100!C2:C101,0))"],
  ["=MEDIAN(Top100!C2:C101)"],
  ["=MEDIAN(Top100!E2:E101)"],
]);

values(dashboard, "D4:F4", [["Вывод", "Число", "Комментарий"]]);
values(dashboard, "D5:F9", [
  ["Лидер", data[0][2], `${data[0][1]} уверенно возглавляет рейтинг: ${Math.round(data[0][2] / data[1][2] * 10) / 10}x к Dota 2 по текущим игрокам.`],
  ["Концентрация", top10Current / totalCurrent, "Топ-10 собирает большую долю аудитории внутри топ-100, но длинный хвост остается заметным."],
  ["Дневной запас", data[0][3] - data[0][2], "У лидера разрыв до дневного пика больше, чем текущая аудитория большинства игр в топе."],
  ["Высокая удержанность", topByStickiness[0].ratio, `${topByStickiness[0].game} ближе всех к своему дневному пику на момент среза.`],
  ["Порог топ-100", data[99][2], "Нижняя граница топ-100 на этом срезе остается выше 13 тыс. текущих игроков."],
]);

values(dashboard, "A16:A16", [["Топ-15 по текущим игрокам"]]);
values(dashboard, "A17:C17", [["Ранг", "Игра / приложение", "Текущие игроки"]]);
values(dashboard, "A18:C32", data.slice(0, 15).map((row) => [row[0], row[1], row[2]]));
values(dashboard, "E16:E16", [["Топ-10 с самым высоким текущие/пик"]]);
values(dashboard, "E17:G17", [["Ранг", "Игра / приложение", "Текущие/пик"]]);
values(dashboard, "E18:G27", topByStickiness.map((row) => [row.rank, row.game, row.ratio]));

styleRange(dashboard, "A1:F1", { fill: "#17324D", fontColor: "#FFFFFF", bold: true, fontSize: 20, hAlign: "Center" });
styleRange(dashboard, "A2:F2", { fill: "#EAF1F8", fontColor: "#17324D", bold: true, hAlign: "Center" });
styleRange(dashboard, "A4:B4", { fill: "#2F75B5", fontColor: "#FFFFFF", bold: true, hAlign: "Center" });
styleRange(dashboard, "D4:F4", { fill: "#2F75B5", fontColor: "#FFFFFF", bold: true, hAlign: "Center" });
styleRange(dashboard, "A16:C17", { fill: "#1F4E79", fontColor: "#FFFFFF", bold: true, hAlign: "Center" });
styleRange(dashboard, "E16:G17", { fill: "#1F4E79", fontColor: "#FFFFFF", bold: true, hAlign: "Center" });
border(dashboard, "A4:B13");
border(dashboard, "D4:F9");
border(dashboard, "A16:C32");
border(dashboard, "E16:G27");
styleRange(dashboard, "A5:A13", { fill: "#F6F8FB", bold: true });
styleRange(dashboard, "D5:F9", { fill: "#FFFFFF", wrap: true, vAlign: "Top" });
styleRange(dashboard, "A18:C32", { fill: "#FFFFFF" });
styleRange(dashboard, "E18:G27", { fill: "#FFFFFF" });
numberFormat(dashboard, "B5:B8", "#,##0");
numberFormat(dashboard, "B9:B10", "0.0%");
numberFormat(dashboard, "B12:B12", "#,##0");
numberFormat(dashboard, "B13:B13", "0.0%");
numberFormat(dashboard, "E5:E5", "#,##0");
numberFormat(dashboard, "E6:E6", "0.0%");
numberFormat(dashboard, "E7:E7", "#,##0");
numberFormat(dashboard, "E8:E8", "0.0%");
numberFormat(dashboard, "E9:E9", "#,##0");
numberFormat(dashboard, "C18:C32", "#,##0");
numberFormat(dashboard, "G18:G27", "0.0%");

for (const [col, px] of Object.entries({ A: 340, B: 260, C: 145, D: 150, E: 145, F: 430, G: 120, H: 30, I: 250, J: 150, K: 150, L: 30, M: 250, N: 150, O: 150 })) {
  width(dashboard, col, px);
}
for (const [row, px] of Object.entries({ 1: 38, 2: 24, 4: 26, 16: 26, 17: 24 })) {
  height(dashboard, row, px);
}

addChart(dashboard, "bar", {
  title: "Топ-15 по текущим игрокам",
  titleTextStyle: { fontSize: 13, bold: true },
  categories: data.slice(0, 15).map((row) => shortName(row[1])),
  series: [
    {
      name: "Текущие игроки",
      values: data.slice(0, 15).map((row) => row[2]),
      fill: { type: "solid", color: "#2F75B5" },
    },
  ],
  hasLegend: false,
  dataLabels: { showValue: false },
  xAxis: { textStyle: { fontSize: 9 } },
  yAxis: { numberFormatCode: "#,##0", majorGridlines: { fill: "#D9E2F3", style: "solid", width: 1 } },
  from: { row: 2, col: 8 },
  extent: { widthPx: 640, heightPx: 370 },
});

addChart(dashboard, "ColumnClustered", {
  title: "Текущие игроки vs дневной пик: топ-10",
  titleTextStyle: { fontSize: 13, bold: true },
  categories: data.slice(0, 10).map((row) => shortName(row[1])),
  series: [
    { name: "Текущие игроки", values: data.slice(0, 10).map((row) => row[2]), fill: { type: "solid", color: "#2F75B5" } },
    { name: "Пик сегодня", values: data.slice(0, 10).map((row) => row[3]), fill: { type: "solid", color: "#70AD47" } },
  ],
  hasLegend: true,
  legend: { position: "bottom", textStyle: { fontSize: 9 } },
  dataLabels: { showValue: false },
  xAxis: { textStyle: { fontSize: 8 }, tickLabelInterval: 1 },
  yAxis: { numberFormatCode: "#,##0", majorGridlines: { fill: "#D9E2F3", style: "solid", width: 1 } },
  from: { row: 22, col: 8 },
  extent: { widthPx: 640, heightPx: 330 },
});

addChart(dashboard, "pie", {
  title: "Доли текущих игроков: топ-100",
  titleTextStyle: { fontSize: 13, bold: true },
  categories: ["Топ-10", "11-20", "21-100"],
  series: [
    {
      name: "Текущие игроки",
      values: [top10Current, top20Current - top10Current, totalCurrent - top20Current],
    },
  ],
  hasLegend: true,
  legend: { position: "right", textStyle: { fontSize: 9 } },
  dataLabels: { showValue: false },
  from: { row: 2, col: 13 },
  extent: { widthPx: 420, heightPx: 270 },
});

addChart(dashboard, "bar", {
  title: "Запас до дневного пика",
  titleTextStyle: { fontSize: 13, bold: true },
  categories: topByDrop.map((row) => shortName(row.game)),
  series: [
    {
      name: "Пик минус текущие",
      values: topByDrop.map((row) => row.gap),
      fill: { type: "solid", color: "#C55A11" },
    },
  ],
  hasLegend: false,
  xAxis: { textStyle: { fontSize: 9 } },
  yAxis: { numberFormatCode: "#,##0", majorGridlines: { fill: "#F4B183", style: "solid", width: 1 } },
  from: { row: 17, col: 13 },
  extent: { widthPx: 420, heightPx: 330 },
});

const dashboardCheck = await workbook.inspect({
  kind: "table",
  range: "Dashboard!A1:G27",
  include: "values,formulas",
  tableMaxRows: 28,
  tableMaxCols: 7,
});
console.log("DASHBOARD_CHECK");
console.log(dashboardCheck.ndjson.slice(0, 3000));

const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log("ERROR_SCAN");
console.log(errorScan.ndjson);

await fs.mkdir(OUTPUT_DIR, { recursive: true });

for (const [sheetName, address] of [
  ["Dashboard", "A1:O38"],
  ["Top100", "A1:I35"],
  ["ChartData", "A1:S16"],
  ["Sources", "A1:D9"],
]) {
  try {
    const blob = await workbook.render({ sheetName, range: address, scale: 1.5 });
    await fs.writeFile(path.join(OUTPUT_DIR, `${sheetName}.png`), Buffer.from(await blob.arrayBuffer()));
    console.log(`RENDERED ${sheetName}`);
  } catch (error) {
    console.error(`RENDER_FAILED ${sheetName}: ${error.message}`);
  }
}

try {
  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(OUTPUT_FILE);
  console.log(`EXPORTED ${OUTPUT_FILE}`);
} catch (error) {
  console.error(`EXPORT_FAILED: ${error.message}`);
  process.exitCode = 1;
}
