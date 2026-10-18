#!/usr/bin/env node
// cards-google-sheet.csv from src/cards.config.js (PM task, 12 Oct 2026) and balance-google-sheet.csv from
// src/game.config.js balanceConfig with the эталоны of src/game.js (PM task, 16 Oct 2026): dev is the source, the CSVs
// are its mirror for the «Cards Config» sheet. The rows are made by tools/cards-sheet/VbaCards.gs itself, run here in a
// vm, so this tool and the sheet cannot disagree. Notes come from the current CSVs: they live only there and in the sheet.
//
//   node tools/cards-sheet/cards-csv.mjs           rewrite both CSVs after a change in the configs or the эталоны
//   node tools/cards-sheet/cards-csv.mjs --check   exit 1 when a CSV is not what the code makes (deliver runs it)
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const CSV = path.join(ROOT, 'cards-google-sheet.csv')
export const CONFIG = path.join(ROOT, 'src/cards.config.js')
export const SCRIPT = path.join(ROOT, 'tools/cards-sheet/VbaCards.gs')
export const BALANCE_CSV = path.join(ROOT, 'balance-google-sheet.csv')
export const BALANCE_CONFIG = path.join(ROOT, 'src/game.config.js')
export const GAME = path.join(ROOT, 'src/game.js')

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

export async function balanceCsvFromConfig(configFile = BALANCE_CONFIG, csvText = readIfAny(BALANCE_CSV), game = fs.readFileSync(GAME, 'utf8')) {
  const { balanceConfig } = await loadConfig(configFile)
  const gs = sheetScript()
  return gs.balanceCsvFromConfig_(balanceConfig, gs.balanceDefaults_(game), csvText)
}

function readIfAny(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mirrors = [
    { file: CSV, name: 'cards-google-sheet.csv', from: 'src/cards.config.js', make: (have) => csvFromConfig(CONFIG, have) },
    { file: BALANCE_CSV, name: 'balance-google-sheet.csv', from: 'src/game.config.js and src/game.js', make: (have) => balanceCsvFromConfig(BALANCE_CONFIG, have) },
  ]
  for (const { file, name, from, make } of mirrors) {
    const have = readIfAny(file)
    const want = await make(have)
    if (want === have) {
      console.log(`${name} matches ${from}`)
    } else if (process.argv.includes('--check')) {
      const a = have.split('\n')
      const b = want.split('\n')
      const lines = []
      for (let i = 0; i < Math.max(a.length, b.length) && lines.length < 6; i += 1) {
        if (a[i] !== b[i]) lines.push(`  line ${i + 1}\n    csv:    ${a[i] ?? '(none)'}\n    code:   ${b[i] ?? '(none)'}`)
      }
      console.error(`${name} is not what ${from} makes; run node tools/cards-sheet/cards-csv.mjs\n` + lines.join('\n'))
      process.exitCode = 1
    } else {
      fs.writeFileSync(file, want)
      console.log(`${name} rewritten from ${from}`)
    }
  }
}
