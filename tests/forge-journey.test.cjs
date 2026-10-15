'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const module = require('../launch/builder.js');
const folder = path.join(__dirname, '../launch');
const read = file => fs.readFileSync(path.join(folder, file), 'utf8');

const state = module.validatedState({
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

test('launch files exist', () => {
  assert.equal(module.DEFAULT_SERVICE_STATE.name, 'Haven Studio');
  assert.ok(fs.statSync(path.join(folder, 'index.html')).size > 300);
  assert.ok(fs.statSync(path.join(folder, 'builder.js')).size > 12000);
  assert.ok(fs.statSync(path.join(folder, 'styles.css')).size > 12000);
  assert.ok(fs.statSync(path.join(folder, 'README.md')).size > 1000);
});

test('full journey is represented', () => {
  const html = read('index.html');
  for (const word of ['Discover', 'Imagine', 'Transform', 'Customise', 'Export']) {
    assert.match(html, new RegExp(word, 'i'));
  }
  assert.match(html, /#word1/);
  assert.match(html, /#transform/);
  assert.match(html, /#download/);
  assert.match(html, /#site-preview/);
});

test('three words are deterministic', () => {
  const first = module.stateFromWords(['calm', 'friendly', 'modern']);
  const second = module.stateFromWords(['CALM', 'friendly', 'modern']);
  assert.equal(first.palette, second.palette);
  assert.equal(first.layout, second.layout);
  assert.equal(first.speed, second.speed);
  assert.equal(first.seed, second.seed);
});

test('different words produce a different visual result', () => {
  const calm = module.stateFromWords(['calm', 'friendly', 'modern']);
  const bold = module.stateFromWords(['bold', 'creative', 'future']);
  assert.notEqual(calm.palette, bold.palette);
  assert.notEqual(calm.layout, bold.layout);
  assert.notEqual(calm.speed, bold.speed);
});

test('export is independent and contains the journey result', () => {
  const html = module.buildHTML(state);
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html lang="en-GB">/);
  assert.match(html, /Haven Studio/);
  assert.match(html, /A world made by you/);
  assert.match(html, /Creative thinking/);
  assert.match(html, /mailto:test%40example.com/);
  assert.match(html, /--bg:#021016/);
  assert.match(html, /--speed:/);
  assert.ok(!/https?:\\/\\//.test(html));
  assert.ok(!/<script/i.test(html));
  assert.ok(!/<link/i.test(html));
});

test('untrusted text is escaped', () => {
  const attack = '<img src=x onerror=alert(1)>';
  const html = module.buildHTML({
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
  assert.match(html,/Content-Security-Policy/);
  assert.ok(!html.includes('javascript:alert(1)'));
});

test('input limits and visual controls are enforced', () => {
  const controlled = module.validatedState({
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
  assert.ok(Object.keys(module.PALETTES ?? {}).length > 4);
  assert.ok(Object.keys(module.LAYOUTS ?? {}).length > 2);
  assert.match(controlled.accent, /^#[0-9a-f]{6}$/i);
  assert.ok(controlled.speed >= 0.25 && controlled.speed <= 1.6);
  assert.ok(Number.isSafeInteger(controlled.seed));
});

test('launch application avoids backend calls and claims only available features', () => {
  const html = read('index.html');
  const js = read('builder.js');
  assert.match(html, /Early-access release candidate/i);
  assert.match(html, /No remote AI generation/i);
  assert.match(html, /No payment/i);
  assert.ok(!/(fetch\(|XMLHttpRequest|STRIPE_SECRET|VENICE_API_KEY|navigator\.sendBeacon)/.test(js));
  assert.ok(!/(fetch\(|XMLHttpRequest|STRIPE_SECRET|VENICE_API_KEY|navigator\.sendBeacon)/.test(html));
  assert.match(js, /URL\.createObjectURL/);
  assert.match(js, /frame\.srcdoc/);
});

test('mobile and reduced-motion requirements are present', () => {
  const css = read('styles.css');
  assert.match(css, /@media\(max-width:960px\)/);
  assert.match(css, /@media\(max-width:620px\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css, /:focus-visible/);
  assert.match(read('index.html'), /Skip to content/);
});

test('no secret-like strings remain in launch files', () => {
  const files = ['index.html', 'builder.js', 'styles.css', 'README.md'];
  const patterns = /(?:BEGIN (?:RSA )?PRIVATE KEY|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{24,}|ghp_[A-Za-z0-9]{36,})/g;
  for (const file of files) assert.ok(!patterns.test(read(file)), file);
});