#!/usr/bin/env node
// A headless Chrome frame of the game for probes (user decision 11 Oct 2026, with The Village PM's advice).
// Its own temporary profile and a fixed window: nothing shows up on the user's screen, no sound. It waits for a
// readiness signal, not a timer: document.documentElement.dataset.vbaReady === '1' when the game sets it, else the
// loaded page with fonts and two frames. Google Sheets and the game's history uploads are blocked, so probes never
// write the user's tables. Usually run through tools/probe.py shot, which also starts a server on its own port.
//
//   node tools/shot.mjs --url http://127.0.0.1:<port>/ --out frame.png [--size 1600x900] [--mobile]
//        [--wait "<js expr>"] [--eval "<js>"]... [--timeout 20] [--allow-errors]
//
// Exit: 0 frame written, 1 uncaught page errors (frame still written), 2 usage or Chrome, 3 timeout.
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BLOCKED = ['*script.google.com*', '*googleusercontent.com*', '*/api/game-history*', '*/api/autoplay-runs*']
const READY = "document.readyState === 'complete' && (document.documentElement.dataset.vbaReady === undefined" +
  " || document.documentElement.dataset.vbaReady === '1')"
const SETTLE = 'document.fonts.ready.then(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))'

class Timeout extends Error {}

function parse(argv) {
  const out = { eval: [], size: '1600x900', timeout: 20 }
  for (let i = 0; i < argv.length; i++) {
    const name = argv[i].replace(/^--/, '')
    if (name === 'mobile' || name === 'allow-errors') out[name] = true
    else if (name === 'eval') out.eval.push(argv[++i])
    else out[name] = argv[++i]
  }
  return out
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url)
    const pending = new Map()
    const listeners = []
    let id = 0
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id && pending.has(msg.id)) {
        const { ok, fail } = pending.get(msg.id)
        pending.delete(msg.id)
        msg.error ? fail(new Error(msg.error.message)) : ok(msg.result)
      } else if (msg.method) {
        for (const listener of listeners) listener(msg)
      }
    }
    ws.onerror = () => reject(new Error('devtools socket error'))
    ws.onopen = () =>
      resolve({
        send: (method, params = {}) =>
          new Promise((ok, fail) => {
            pending.set(++id, { ok, fail })
            ws.send(JSON.stringify({ id, method, params }))
          }),
        on: (listener) => listeners.push(listener),
        close: () => ws.close(),
      })
  })
}

async function main() {
  const args = parse(process.argv.slice(2))
  if (!args.url || !args.out) {
    console.error('usage: node tools/shot.mjs --url <url> --out <frame.png> [--size WxH] [--wait expr] [--eval js]...')
    return 2
  }
  const [width, height] = args.size.split('x').map(Number)
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'vba-shot-'))
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`, '--mute-audio', '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--disable-background-networking', '--hide-scrollbars', 'about:blank'],
  { stdio: ['ignore', 'ignore', 'pipe'] })
  const exited = new Promise((resolve) => chrome.on('exit', resolve))
  const deadline = Date.now() + Number(args.timeout) * 1000
  const errors = []
  let cdp = null
  try {
    const browser = await Promise.race([
      new Promise((resolve) => {
        let text = ''
        chrome.stderr.on('data', (chunk) => {
          text += chunk
          const match = text.match(/DevTools listening on (ws:\/\/\S+)/)
          if (match) resolve(match[1])
        })
      }),
      exited.then((code) => { throw new Error(`Chrome exited (${code}) before DevTools came up: ${CHROME}`) }),
    ])
    const targets = await (await fetch(`http://127.0.0.1:${new URL(browser).port}/json/list`)).json()
    cdp = await connect(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
    cdp.on((msg) => {
      if (msg.method === 'Runtime.exceptionThrown') {
        const details = msg.params.exceptionDetails
        errors.push((details.exception && details.exception.description) || details.text)
      }
    })
    const evaluate = async (expression) => {
      const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
      if (result.exceptionDetails) {
        const details = result.exceptionDetails
        throw new Error('page script failed: ' + ((details.exception && details.exception.description) || details.text))
      }
      return result.result.value
    }
    const until = async (expression) => {
      while (!(await evaluate(expression))) {
        if (Date.now() > deadline) throw new Timeout(`not ready after ${args.timeout} s: ${expression}`)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Network.enable')
    await cdp.send('Network.setBlockedURLs', { urls: BLOCKED })
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: args.mobile ? 2 : 1, mobile: Boolean(args.mobile),
    })
    const loaded = new Promise((resolve) => cdp.on((msg) => msg.method === 'Page.loadEventFired' && resolve()))
    await cdp.send('Page.navigate', { url: args.url })
    await Promise.race([loaded, new Promise((_, reject) =>
      setTimeout(() => reject(new Timeout(`page did not load in ${args.timeout} s`)), Math.max(0, deadline - Date.now())))])
    await until(args.wait || READY)
    await evaluate(SETTLE)
    for (const step of args.eval) {
      await evaluate(step)
      await evaluate(SETTLE)
    }
    const frame = await cdp.send('Page.captureScreenshot', { format: 'png' })
    fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true })
    fs.writeFileSync(args.out, Buffer.from(frame.data, 'base64'))
    console.log(`FRAME ${args.out} (${width}x${height}${args.mobile ? ' mobile' : ''})`)
    if (errors.length) {
      console.log(`page errors (${errors.length}):\n` + errors.slice(0, 5).map((e) => '  ' + e.split('\n')[0]).join('\n'))
      return args['allow-errors'] ? 0 : 1
    }
    return 0
  } catch (error) {
    console.log((error instanceof Timeout ? 'TIMEOUT ' : 'ERROR ') + error.message)
    return error instanceof Timeout ? 3 : 2
  } finally {
    if (cdp) cdp.close()
    chrome.kill('SIGKILL')
    await Promise.race([exited, new Promise((resolve) => setTimeout(resolve, 2000))])
    fs.rmSync(profile, { recursive: true, force: true })
  }
}

process.exitCode = await main()
