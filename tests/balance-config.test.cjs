// The balance numbers in src/game.config.js and the balance("key", эталон) calls in src/game.js must name the same keys.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../src/game.js'), 'utf8');

async function balanceConfig() {
  return (await import(path.join(__dirname, '../src/game.config.js'))).balanceConfig;
}

function balanceCalls() {
  const calls = [...source.matchAll(/\bbalance\("([^"]+)",\s*(-?[\d.]+)\)/g)].map(([, key, fallback]) => ({ key, fallback: Number(fallback) }));
  assert.equal(calls.length, (source.match(/\bbalance\(/g) || []).length - 1, 'every balance() call has a literal key and эталон');
  return calls;
}

test('every balance key is in the config once, used by the game, with one эталон', async () => {
  const config = await balanceConfig();
  const keys = config.map((param) => param.key);
  assert.deepEqual(keys.filter((key, index) => keys.indexOf(key) !== index), [], 'duplicate keys');
  const calls = balanceCalls();
  const fallbacks = new Map();
  for (const { key, fallback } of calls) {
    assert.ok(keys.includes(key), `${key} is missing in game.config.js`);
    assert.equal(fallbacks.get(key) ?? fallback, fallback, `${key} has two эталоны`);
    fallbacks.set(key, fallback);
  }
  assert.deepEqual(keys.filter((key) => !fallbacks.has(key)), [], 'config keys the game never reads');
  for (const param of config) {
    assert.ok(Number.isFinite(param.value) && param.name && param.unit, param.key);
    assert.ok(param.min <= param.value && param.value <= param.max, `${param.key} is outside ${param.min}..${param.max}`);
  }
});
