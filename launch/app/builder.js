'use strict';
const PALETTES = {
  violet:['#05050c','#181238','#5d3bd1','#a479ff','#5dd9ff'],
  ocean:['#021016','#063450','#0d758d','#34d2cf','#b9fbff'],
  aqua:['#020e11','#08414b','#078e90','#62e2bd','#d6fff2'],
  ember:['#130706','#4a1712','#a73c25','#ff936c','#ffe0b5'],
  surrey:['#031521','#004276','#006b88','#29b6a6','#d8f5ec'],
  mono:['#040404','#151515','#3d3d3d','#939393','#f0f0f0'],
  cosmos:['#02030a','#0e1535','#243274','#6c5cff','#63dcff'],
  nebula:['#07040d','#2c103f','#70217f','#d95fc9','#81ecff']
};
const slug = s => String(s ?? '').replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').toLowerCase();
const pick = (v,f) => v === undefined ? f : v;
const escapeHTML = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp = (n,a,b) => Math.max(a, Math.min(b,n));

function resolveRecipe(words, world){
  const w = words.map(x=>String(x??'').toLowerCase());
  const n = hash01(hash01(w[0]) + hash01(w[1]) + hash01(w[2]));
  return { words:w, world };
}

function hash01(n){
  const x=Math.sin(n*12.9898+78.233)*43758.5453;
  return x-Math.floor(x);
}

function buildHTML(raw){
  const d = validatedData(raw);
  return [
    '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="description" content="'+escapeHTML(d.description.slice(0,160))+'">',
    '<title>'+escapeHTML(d.name)+'</title>',
    '<meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; style-src &#39;unsafe-inline&#39;; base-uri &#39;none&#39;; form-action &#39;none&#39;">',
    '<style>:root{--accent:'+(d.accent||'#67dbf0')}</style></head><body>',
    '<header class="wrap brand">'+escapeHTML(d.name)+'</header>',
    '<main id="main" class="wrap"><h1>'+escapeHTML(d.headline)+'</h1><p class="intro">'+escapeHTML(d.description).replace(/\n/g,'<br>')+'</p></main>',
    '</body></html>'
  ].join('');
}

function validatedData(raw){
  const pick=(key,max)=>String(raw[key]??'').trim().slice(0,max);
  return {
    name:pick('name',80)||'Your Organisation',
    headline:pick('headline',130)||'Welcome to our website',
    description:pick('description',800)||'Tell your customers about your work.',
    services:String(raw.services??'').split(/\r?\n/).map(s=>s.trim().slice(0,120)).filter(Boolean).slice(0,10),
    accent: /^[0-9a-f]{6}$/i.test(String(raw.accent).replace('#','')) ? raw.accent : '#67dbf0'
  };
}

module.exports = { resolveRecipe, buildHTML, escapeHTML, validatedData };