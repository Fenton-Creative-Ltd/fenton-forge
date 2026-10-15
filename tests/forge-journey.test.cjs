'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const forge = require('../launch/builder.js');
const folder = path.join(__dirname, '../launch');
const read = file => fs.readFileSync(path.join(folder, file), 'utf8');

const state = forge.validatedState({
  name: 'Haven Studio',
  headline: 'A world made by you',
  about: 'We turn a clear idea into a warm, useful website.',
  services: 'Creative thinking\nBeautiful results\nPersonal service',
  email: 'hello@example.com',
  words: ['calm', 'friendly', 'modern'],
  accent: '#34d2cf',
  palette: 'ocean',
  layout: 'waves',
  layoutStyle: 'centred',
  motion: 'standard',
  speed: 0.82,
  seed: 231897
});

test('release-candidate launch payload exists', () => {
  assert.ok(fs.statSync(path.join(folder, 'index.html')).size > 3000);
  assert.ok(fs.statSync(path.join(folder, 'builder.js')).size > 10000);
  assert.ok(fs.statSync(path.join(folder, 'styles.css')).size > 4000);
  assert.ok(fs.statSync(path.join(folder, 'README.md')).size > 1000);
});

test('full journey is available in the launch application', () => {
  const html = read('index.html');
  for (const word of ['Discover', 'Imagine', 'Transform', 'Customise', 'Export']) assert.ok(html.includes(word), word);
  assert.match(html, /word1/);
  assert.match(html, /transform/);
  assert.match(html, /download/);
  assert.match(html, /site-preview/);
});

test('visual meaning is deterministic even with capitalisation', () => {
  const first = forge.stateFromWords(['calm', 'friendly', 'modern']);
  const second = forge.stateFromWords(['CALM', 'friendly', 'modern']);
  assert.strictEqual(first.palette, second.palette);
  assert.strictEqual(first.layout, second.layout);
  assert.strictEqual(first.speed, second.speed);
  assert.strictEqual(first.seed, second.seed);
});

test('different words produce a different visual result', () => {
  const calm = forge.stateFromWords(['calm', 'friendly', 'modern']);
  const bold = forge.stateFromWords(['bold', 'creative', 'future']);
  assert.notDeepStrictEqual(calm, bold);
});

test('export is independent and contains the configured site', () => {
  const html = forge.buildHTML(state);
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html lang="en-GB">/);
  assert.match(html, /Haven Studio/);
  assert.match(html, /A world made by you/);
  assert.match(html, /Creative thinking/);
  assert.match(html, /mailto:hello%40example\.com/);
  assert.match(html, /--bg:#021016/);
  assert.match(html, /--speed:/);
  assert.ok(!/https?:\/\//.test(html));
  assert.ok(!/<script/i.test(html));
  assert.ok(!/<link/i.test(html));
});

test('export escapes unsafe text and rejects unsafe email', () => {
  const attack = '<img src=x onerror=alert(1)>';
  const html = forge.buildHTML({
    ...state,
    name: attack,
    headline: '<script>alert(1)</script>',
    about: '"><svg onload=alert(1)>',
    services: 'x\n' + attack,
    email: 'javascript:alert(1)'
  });
  assert.ok(!html.includes(attack));
  assert.ok(!html.includes('<script>alert(1)</script>'));
  assert.ok(!html.includes('<svg onload=alert(1)>'));
  assert.match(html, /&lt;img/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /Content-Security-Policy/);
  assert.ok(!html.includes('javascript:alert(1)'));
  assert.ok(!html.includes('<script '));
});

test('input limits and visual controls are enforced', () => {
  const controlled = forge.validatedState({
    name: 'x'.repeat(400),
    headline: 'y'.repeat(500),
    about: 'z'.repeat(1000),
    services: Array.from({length: 50}, () => 'A'.repeat(200)).join('\n'),
    palette: 'nonsense',
    layout: 'nonsense',
    accent: 'red;}body{display:none',
    speed: 999,
    seed: -1
  });
  assert.equal(controlled.name.length, 80);
  assert.equal(controlled.headline.length, 130);
  assert.equal(controlled.about.length, 700);
  assert.equal(controlled.services.length, 8);
  assert.equal(controlled.services[0].length, 110);
  assert.match(controlled.accent, /^#[0-9a-f]{6}$/i);
  assert.ok(Object.keys(forge.PALETTES).includes(controlled.palette));
  assert.ok(forge.LAYOUTS.includes(controlled.layout));
  assert.ok(controlled.speed >= 0.25 && controlled.speed <= 1.6);
  assert.ok(Number.isSafeInteger(controlled.seed));
});

test('launch application avoids backend calls and external claims', () => {
  const html = read('index.html');
  const js = read('builder.js');
  for (const phrase of ['fetch(', 'XMLHttpRequest', 'STRIPE_SECRET', 'VENICE_API_KEY', 'navigator.sendBeacon']) {
    assert.ok(!js.includes(phrase), phrase);
    assert.ok(!html.includes(phrase), phrase);
  }
  assert.match(js, /URL\.createObjectURL/);
  assert.match(js, /frame\.srcdoc/);
  assert.match(html, /sandbox=""/);
});

test('accessibility, mobile and reduced-motion support is present', () => {
  const css = read('styles.css');
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\(max-width:900px\)/);
  assert.match(css, /@media\(max-width:620px\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(read('index.html'), /Skip to content/);
});

test('starter cards are semantic and selectable in the builder', () => {
  const html = read('index.html');
  const js = read('builder.js');
  for (const category of ['agency', 'small-business', 'public-sector']) {
    assert.match(html, new RegExp(`data-category="${category}"`));
  }
  assert.match(html, /<button type="button" class="card" data-category="agency">/);
  assert.match(html, /<button type="button" class="card" data-category="small-business">/);
  assert.match(html, /<button type="button" class="card" data-category="public-sector">/);
  assert.match(js, /starterWords/);
  assert.match(js, /card\.addEventListener\('click'/);
  assert.match(js, /form\.elements\.word1/);
  assert.ok(!fs.existsSync(path.join(folder, 'index.css')));
});

test('no external assets in launch application', () => {
  for (const file of ['index.html', 'styles.css']) {
    const text = read(file);
    assert.ok(!/src="https?:\/\//.test(text), file);
    assert.ok(!/href="https?:\/\//.test(text), file);
  }
});

test('starter cards are semantic and selectable in the builder', () => {
  const html = read('index.html');
  const js = read('builder.js');
  for (const category of ['agency', 'small-business', 'public-sector']) {
    assert.match(html, new RegExp(`data-category="${category}"`));
    assert.match(js, new RegExp(`starterWords\\.${category.replace(/-/g, '\\-')}|starterWords\\['${category}'\\]`));
  }
  assert.match(js, /addEventListener\('click'/);
  assert.match(js, /form\.elements\.word1/);
});

test('no secret-like strings in release payload', () => {
  const pattern = /(?:BEGIN (?:RSA )?PRIVATE KEY|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{24,}|ghp_[A-Za-z0-9]{36,})/g;
  for (const file of ['index.html', 'builder.js', 'styles.css']) assert.ok(!pattern.test(read(file)), file);
});