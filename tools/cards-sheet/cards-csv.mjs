#!/usr/bin/env node
// cards-google-sheet.csv from src/cards.config.js (PM task, 12 Oct 2026): dev is the source of the cards, the CSV is
// their mirror for the «Cards Config» sheet. The rows are made by tools/cards-sheet/VbaCards.gs itself, run here in a
// vm, so this tool and the sheet cannot disagree. Notes come from the current CSV: they live only there and in the sheet.
//
//   node tools/cards-sheet/cards-csv.mjs           rewrite the CSV after a change in src/cards.config.js
//   node tools/cards-sheet/cards-csv.mjs --check   exit 1 when the CSV is not what the config makes (deliver runs it)
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const CSV = path.join(ROOT, 'cards-google-sheet.csv')
export const CONFIG = path.join(ROOT, 'src/cards.config.js')
export const SCRIPT = path.join(ROOT, 'tools/cards-sheet/VbaCards.gs')

// The sheet script's functions; only its pure part is called here, Google services are never touched.
export function sheetScript() {
  const context = vm.createContext({})
  vm.runInContext(fs.readFileSync(SCRIPT, 'utf8'), context, { filename: SCRIPT })
  return context
}

export async function loadConfig(file = CONFIG) {
  // A query keeps a patched copy at the same path from coming back out of the module cache.
  return import(`${pathToFileURL(file).href}?read=${Date.now()}-${Math.random()}`)
}

export async function csvFromConfig(configFile = CONFIG, csvText = fs.readFileSync(CSV, 'utf8')) {
  const { cardConfig } = await loadConfig(configFile)
  return sheetScript().csvFromConfig_(cardConfig, csvText)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const have = fs.readFileSync(CSV, 'utf8')
  const want = await csvFromConfig(CONFIG, have)
  if (want === have) {
    console.log('cards-google-sheet.csv matches src/cards.config.js')
  } else if (process.argv.includes('--check')) {
    const a = have.split('\n')
    const b = want.split('\n')
    const lines = []
    for (let i = 0; i < Math.max(a.length, b.length) && lines.length < 6; i += 1) {
      if (a[i] !== b[i]) lines.push(`  line ${i + 1}\n    csv:    ${a[i] ?? '(none)'}\n    config: ${b[i] ?? '(none)'}`)
    }
    console.error('cards-google-sheet.csv is not what src/cards.config.js makes; run node tools/cards-sheet/cards-csv.mjs\n'
      + lines.join('\n'))
    process.exitCode = 1
  } else {
    fs.writeFileSync(CSV, want)
    console.log('cards-google-sheet.csv rewritten from src/cards.config.js')
  }
}
