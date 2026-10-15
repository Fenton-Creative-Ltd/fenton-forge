'use strict';
// Fenton Forge early-access RC: browser-only journey from three words to an independent HTML export.
// No accounts, remote AI, payment processing, managed hosting or network API calls.

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

function hashValue(text) {
  const value = String(text ?? '').toLocaleLowerCase('en-GB');
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 1000000) / 1000000;
}

const PALETTES = {
  ocean: { name: 'Ocean', bg: '#021016', fg: '#f4fbff', accent: '#34d2cf', muted: '#b9fbff' },
  violet: { name: 'Violet', bg: '#05050c', fg: '#f8f7ff', accent: '#a479ff', muted: '#d9d0ff' },
  ember: { name: 'Ember', bg: '#130706', fg: '#fff4ea', accent: '#ff936c', muted: '#ffe0b5' },
  forest: { name: 'Forest', bg: '#04120d', fg: '#f2fff8', accent: '#8fdaa6', muted: '#d6f5ec' },
  dawn: { name: 'Dawn', bg: '#140a11', fg: '#fff8f8', accent: '#ffcc70', muted: '#ffd9d9' },
  graphite: { name: 'Graphite', bg: '#0b0d10', fg: '#f5f6f8', accent: '#d8dde6', muted: '#c3c9d2' },
  amber: { name: 'Amber', bg: '#170f01', fg: '#fff8e8', accent: '#ffd166', muted: '#ffeab5' },
  frost: { name: 'Frost', bg: '#04101c', fg: '#f6fbff', accent: '#9fd8ff', muted: '#dff0ff' }
};

const LAYOUTS = ['waves', 'particles', 'aurora', 'grid'];

const WORD_PRESETS = {
  nature: { palette: 'forest', layout: 'waves', speed: 0.80 },
  ocean: { palette: 'ocean', layout: 'waves', speed: 0.82 },
  water: { palette: 'frost', layout: 'waves', speed: 0.78 },
  forest: { palette: 'forest', layout: 'particles', speed: 0.86 },
  future: { palette: 'violet', layout: 'grid', speed: 1.20 },
  futuristic: { palette: 'violet', layout: 'grid', speed: 1.24 },
  modern: { palette: 'graphite', layout: 'grid', speed: 1.05 },
  bright: { palette: 'amber', layout: 'particles', speed: 1.10 },
  warm: { palette: 'ember', layout: 'particles', speed: 0.90 },
  calm: { palette: 'frost', layout: 'waves', speed: 0.58 },
  creative: { palette: 'dawn', layout: 'aurora', speed: 1.12 },
  bold: { palette: 'dawn', layout: 'aurora', speed: 1.18 },
  friendly: { palette: 'amber', layout: 'particles', speed: 0.92 },
  professional: { palette: 'graphite', layout: 'waves', speed: 1.00 }
};

function pick(list, hash) {
  return list[Math.floor(hash * list.length) % list.length];
}

function stateFromWords(words) {
  const values = (Array.isArray(words) ? words : [words]).filter(Boolean).slice(0, 3)
    .map(value => String(value).trim().slice(0, 40)).filter(Boolean);
  const preset = values.reduce((merged, word) => Object.assign({}, merged, WORD_PRESETS[word.toLocaleLowerCase('en-GB')] || {}), {});
  const hashes = [0, 1, 2].map(index => hashValue(values[index] || ['still', 'balanced', 'modern'][index]));
  const palette = preset.palette || pick(Object.keys(PALETTES), hashes[0]);
  const layout = preset.layout || pick(LAYOUTS, hashes[1]);
  const speed = Number((preset.speed || Number((0.68 + hashes[2] * 0.72).toFixed(2))).toFixed(2));
  const seed = Math.round((hashValue(values.join(' ')) * 900000 + 100000));
  return { words: values, palette, layout, speed, seed };
}

function validatedState(input = {}) {
  const trimmed = (key, maximum) => String(input[key] ?? '').trim().slice(0, maximum);
  const words = stateFromWords(input.words ?? []).words;
  const email = trimmed('email', 180);
  const accent = trimmed('accent', 7);
  const paletteName = PALETTES[input.palette] ? input.palette : stateFromWords(words).palette;
  const layout = LAYOUTS.includes(input.layout) ? input.layout : stateFromWords(words).layout;
  const parsedSpeed = Number(input.speed);
  const speed = Number.isFinite(parsedSpeed) && parsedSpeed >= 0.25 && parsedSpeed <= 1.60
    ? Math.round(parsedSpeed * 100) / 100
    : stateFromWords(words).speed;
  const parsedSeed = Number(input.seed);
  const seed = Number.isSafeInteger(parsedSeed) && parsedSeed > 0 && parsedSeed < 1000000
    ? parsedSeed
    : stateFromWords(words).seed;

  return {
    name: trimmed('name', 80) || 'Your Organisation',
    headline: trimmed('headline', 130) || 'Welcome to your website',
    about: trimmed('about', 700) || 'Tell visitors what makes your work valuable.',
    services: String(input.services ?? '').split(/\r?\n/)
      .map(line => line.trim().slice(0, 110)).filter(Boolean).slice(0, 8),
    email: /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ? email : '',
    accent: /^#[0-9a-fA-F]{6}$/.test(accent) ? accent : PALETTES[paletteName].accent,
    palette: paletteName,
    layout,
    motion: input.motion === 'calm' ? 'calm' : 'standard',
    layoutStyle: input.layoutStyle === 'centred' ? 'centred' : 'editorial',
    speed,
    seed,
    words
  };
}

function sceneStyles(state) {
  const palette = PALETTES[state.palette] || PALETTES.ocean;
  const durations = { waves: ['17.5s', '23.8s'], particles: ['12.8s', '29.2s'], aurora: ['19.6s', '31.1s'], grid: ['24.1s', '18.9s'] };
  const values = state.layout === 'grid'
    ? 'repeating-linear-gradient(90deg, rgba(255,255,255,.045) 0 1px, transparent 1px 58px), repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 1px, transparent 1px 42px)'
    : 'conic-gradient(from 210deg at 18% 20%, ' + palette.accent + '22, transparent 40%), radial-gradient(circle at 78% 20%, ' + palette.accent + '33, transparent 45%)';
  return `.scene{position:relative;overflow:hidden;background:${palette.bg};color:${palette.fg}}
.scene:before{content:'';position:absolute;inset:-35%;background:${values};opacity:.42;transform:rotate(8deg)}
.scene:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,${palette.bg}f2,transparent 60%)}
.motion-layer{position:absolute;inset:-34%;background:${values};opacity:.35;filter:blur(26px);animation:forgeMotion ${durations[state.layout][0]} var(--speed) ease-in-out infinite alternate}
.motion-layer.secondary{animation-duration:${durations[state.layout][1]};transform:scale(1.18) rotate(-11deg)}
.copy{position:relative;z-index:2}
.motes{position:absolute;inset:0;z-index:1}
.motes span{position:absolute;border-radius:999px;background:${palette.muted};opacity:.18}
.motes span:nth-child(1){left:9%;top:27%;width:5px;height:5px;animation:rise ${5 + (state.seed % 7)}s linear infinite}
.motes span:nth-child(2){left:27%;top:59%;width:7px;height:7px;animation-delay:1.2s;animation:rise ${6 + (state.seed % 5)}s linear infinite}
.motes span:nth-child(3){left:64%;top:31%;width:4px;height:4px;animation-delay:.5s;animation:rise ${7 + (state.seed % 3)}s linear infinite}
.motes span:nth-child(4){left:81%;top:68%;width:6px;height:6px;animation-delay:2.1s;animation:rise ${6 + (state.seed % 4)}s linear infinite}
.motes span:nth-child(5){left:45%;top:76%;width:3px;height:3px;animation-delay:.9s;animation:rise ${8 + (state.seed % 2)}s linear infinite}
@keyframes forgeMotion{from{transform:rotate(4deg) scale(1)}to{transform:rotate(16deg) scale(1.22)}}
@keyframes rise{from{transform:translateY(0)}to{transform:translateY(-420px)}}`;
}

function buildHTML(input) {
  const site = validatedState(input);
  const palette = PALETTES[site.palette] || PALETTES.ocean;
  const name = escapeHTML(site.name);
  const headline = escapeHTML(site.headline);
  const about = escapeHTML(site.about).replace(/\r?\n/g, '<br>');
  const services = site.services.map(line => '<li>' + escapeHTML(line) + '</li>').join('');
  const contact = site.email
    ? '<a class="button" href="mailto:' + encodeURIComponent(site.email) + '">Email ' + name + '</a>'
    : '<p>Contact details available on request.</p>';
  const centred = site.layoutStyle === 'centred';
  const words = site.words.map(word => escapeHTML(word)).join(', ');
  const motionSeconds = Math.round(100 / site.speed) / 100;
  const sceneCSS = sceneStyles(site);
  const visualNote = site.motion === 'calm'
    ? 'Motion is deliberately reduced and the same layout works with a system preference for reduced motion.'
    : 'The visual environment is created from the selected words. It is deterministic, portable and can be edited in plain HTML.';

  return [
    '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:; connect-src \'none\'; base-uri \'none\'; form-action \'none\'">',
    '<title>' + name + '</title><meta name="description" content="' + escapeHTML(site.headline.slice(0, 160)) + '">',
    '<style>:root{--bg:' + palette.bg + ';--fg:' + palette.fg + ';--muted:' + palette.muted + ';--surface:#ffffff10;--accent:' + site.accent + ';--speed:' + motionSeconds + 's}',
    '*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.62 system-ui,-apple-system,"Segoe UI",sans-serif}',
    'a{color:inherit}:focus-visible{outline:3px solid #ffe1a0;outline-offset:4px}.wrap{width:min(1080px,calc(100% - 40px));margin:auto}',
    '.brand{padding:22px 0;font-weight:850;border-bottom:3px solid var(--accent)}',
    '.scene{position:relative;isolation:isolate;padding:clamp(42px,8vw,96px) 0;min-height:520px}',
    '.copy{max-width:' + (centred ? '820px;margin-left:auto;margin-right:auto;text-align:center' : '780px') + '}',
    '.eyebrow{color:var(--accent);font-size:.76rem;font-weight:850;letter-spacing:.13em}',
    '.copy h1{font-size:clamp(2.4rem,6.5vw,5rem);line-height:1.05;letter-spacing:-.05em;margin:14px 0 18px}',
    '.copy h1:after{content:"";display:$' + (centred ? 'auto' : 'none') + ';width:88px;height:5px;background:var(--accent);border-radius:10px;margin:16px 0}',
    '.copy p{font-size:clamp(1rem,2vw,1.25rem);color:var(--muted);max-width:700px}',
    '.button{display:inline-block;background:var(--accent);color:#04121a;padding:12px 22px;text-decoration:none;font-weight:800;border-radius:999px;margin-top:18px}',
    '.services-area{padding:64px 0 80px}.services-area ul{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;list-style:none;padding:0}',
    '.services-area li{background:var(--surface);border-top:3px solid var(--accent);padding:22px;border-radius:12px}',
    'footer{border-top:1px solid #ffffff26;padding:26px 0;color:var(--muted)}',
    '@media(max-width:620px){.copy{text-align:var(--copy-align,left)}.copy{text-align:left}.copy h1:after{width:64px}}',
    '@media(prefers-reduced-motion:reduce){.motion-layer,.motes span{animation:none!important;transform:none!important}}',
    sceneCSS,
    '</style></head><body><header class="wrap brand">' + name + '</header>',
    '<main><div class="scene"><div class="motion-layer" aria-hidden="true"></div><div class="motion-layer secondary" aria-hidden="true"></div><div class="motes" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>',
    '<div class="wrap"><div class="copy"><p class="eyebrow">WELCOME TO ' + name.toUpperCase() + '</p><h1>' + headline + '</h1><p>' + about + '</p>' + contact + '</div></div></div></main>',
    '<section class="wrap services-area"><p class="eyebrow">WHAT WE OFFER</p><h2>What we can do for you</h2><ul>' + services + '</ul></section>',
    '</main><footer><div class="wrap">&copy; ' + new Date().getFullYear() + ' ' + name + ' · Made with Fenton Forge · Visual words: ' + words + '</div></footer>',
    '<p class="visually-hidden">' + visualNote + '</p>'].join('').replace('$' + (centred ? 'auto' : 'none'), 'auto');
}

const DEFAULT_SERVICE_STATE = {
  name: 'Haven Studio',
  headline: 'A world made by you',
  about: 'We turn a clear idea into a warm, useful website. This page is an editable starting point you own.',
  services: 'Creative thinking\nBeautiful results\nPersonal service',
  email: 'hello@example.com',
  accent: '#34d2cf',
  palette: 'ocean',
  layout: 'waves',
  motion: 'standard',
  layoutStyle: 'centred',
  speed: 0.82,
  seed: 231897,
  words: ['calm', 'friendly', 'modern']
};

module.exports = {
  DEFAULT_SERVICE_STATE,
  escapeHTML,
  validatedState,
  stateFromWords,
  buildHTML,
  sceneStyles
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('site-form');
    const frame = document.getElementById('site-preview');
    const status = document.getElementById('status');
    const download = document.getElementById('download');
    if (!form || !frame || !status || !download) return;

    const read = () => ({
      name: form.elements.name?.value ?? '',
      headline: form.elements.headline?.value ?? '',
      about: form.elements.about?.value ?? '',
      services: form.elements.services?.value ?? '',
      email: form.elements.email?.value ?? '',
      accent: form.elements.accent?.value ?? '',
      palette: form.elements.palette?.value ?? '',
      layout: form.elements.layout?.value ?? '',
      layoutStyle: form.elements.layoutStyle?.value ?? '',
      motion: form.elements.motion?.value ?? '',
      speed: form.elements.speed?.value ?? '',
      words: [form.elements.word1?.value, form.elements.word2?.value, form.elements.word3?.value]
    });

    function preview() {
      const html = buildHTML(read());
      frame.dataset.layout = read().layout;
      frame.dataset.palette = read().palette;
      frame.dataset.words = read().words.join(', ');
      frame.dataset.name = read().name;
      frame.dataset.headline = read().headline;
      frame.dataset.email = read().email;
      frame.dataset.services = read().services;
      frame.dataset.about = read().about;
      frame.dataset.accent = read().accent;
      frame.dataset.layoutStyle = read().layoutStyle;
      frame.dataset.motion = read().motion;
      frame.dataset.speed = read().speed;
      frame.dataset.seed = stateFromWords(read().words).seed;
      frame.srcdoc = html;
      status.textContent = 'Preview refreshed. Your content and visual words stay on this device.';
      return html;
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (form.reportValidity()) preview();
    });

    download.addEventListener('click', () => {
      if (!form.reportValidity()) return;
      const html = buildHTML(read());
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'fenton-forge-website.html';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1800);
      status.textContent = 'HTML downloaded. It is an independent file you can edit or host anywhere.';
    });

    const transform = document.getElementById('transform');
    if (transform) transform.addEventListener('click', event => {
      event.preventDefault();
      const transformed = stateFromWords(read().words);
      form.elements.palette.value = transformed.palette;
      form.elements.layout.value = transformed.layout;
      form.elements.speed.value = transformed.speed;
      const palette = PALETTES[transformed.palette];
      form.elements.accent.value = palette.accent;
      preview();
      status.textContent = 'Transformed. Please customise the visual and website details.';
    });

    [
      'name', 'headline', 'about', 'services', 'email', 'palette', 'layout', 'accent',
      'layoutStyle', 'motion', 'speed'
    ].forEach(name => {
      const field = form.elements[name];
      if (field?.type === 'checkbox') field.addEventListener('change', preview);
      else if (field) field.addEventListener('input', preview);
    });

    const wordFields = [form.elements.word1, form.elements.word2, form.elements.word3];
    wordFields.forEach(field => field?.addEventListener('input', event => {
      const all = wordFields.filter(Boolean).map(item => item.value.trim());
      if (all.every(Boolean)) {
        const transformed = stateFromWords(all);
        form.elements.palette.value = transformed.palette;
        form.elements.layout.value = transformed.layout;
        form.elements.speed.value = transformed.speed;
        form.elements.accent.value = PALETTES[transformed.palette].accent;
        preview();
      }
    }));

    preview();
  });
}