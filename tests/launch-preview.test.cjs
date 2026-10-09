'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {escapeHTML,validatedData,buildHTML}=require('../launch/builder.js');
const folder=path.join(__dirname,'../launch');
const read=(file)=>fs.readFileSync(path.join(folder,file),'utf8');

test('launch contains accessible static files',()=>{
  for(const file of ['index.html','builder.html','builder.js','styles.css','privacy.html','terms.html']){
    assert.ok(fs.statSync(path.join(folder,file)).size>100,file);
  }
  assert.match(read('index.html'),/Early-access preview/);
  assert.match(read('builder.html'),/sandbox=""/);
  assert.match(read('builder.html'),/id="download"/);
  assert.match(read('builder.html'),/aria-live="polite"/);
});
test('builder escapes dangerous HTML supplied in text fields',()=>{
  const attack='<img src=x onerror=alert(1)>';
  const output=buildHTML({name:attack,headline:'<script>alert(1)</script>',description:'"><svg onload=alert(1)>',services:'x\n'+attack,email:'test@example.com'});
  assert.ok(!output.includes(attack));
  assert.ok(!output.includes('<script>alert(1)</script>'));
  assert.ok(!output.includes('<svg onload=alert(1)>'));
  assert.ok(output.includes('&lt;img'));
  assert.ok(output.includes('&lt;script&gt;'));
  assert.match(output,/Content-Security-Policy/);
  assert.ok(!output.includes('<script '));
});
test('standalone export contains valid contact link and no external fetches',()=>{
  const output=buildHTML({name:'Test & Sons',headline:'Welcome',description:'First\nSecond',services:'A\nB',email:'test@example.com'});
  assert.match(output,/<html lang="en-GB">/);
  assert.match(output,/<meta name="viewport"/);
  assert.match(output,/Test &amp; Sons/);
  assert.match(output,/First<br>Second/);
  assert.match(output,/mailto:test%40example.com/);
  assert.ok(!/https?:\/\/|<script|<link/.test(output));
  assert.match(output,/<li>A<\/li><li>B<\/li>/);
});
test('invalid email and CSS colours cannot inject code',()=>{
  const data=validatedData({email:'javascript:alert(1)',accent:'red;}body{display:none',services:'a\nb'});
  assert.equal(data.email,'');
  assert.equal(data.accent,'#176f85');
  const output=buildHTML({name:'Hello',email:'javascript:alert(1)',accent:'red;}body{display:none'});
  assert.ok(!output.includes('javascript:alert(1)'));
  assert.ok(!output.includes('red;}body{display:none'));
});
test('field length and maximum services enforced',()=>{
  const data=validatedData({name:'x'.repeat(400),headline:'y'.repeat(500),services:Array(50).fill('Z'.repeat(200)).join('\n')});
  assert.equal(data.name.length,80);
  assert.equal(data.headline.length,130);
  assert.equal(data.services.length,10);
  assert.equal(data.services[0].length,120);
});
test('marketing labels unavailable features accurately',()=>{
  const landing=read('index.html'),privacy=read('privacy.html'),terms=read('terms.html');
  assert.match(landing,/AI-assisted design, accounts and managed publishing/);
  assert.match(landing,/In development/);
  assert.match(landing,/not accepting automated migration jobs or payments/);
  assert.match(privacy,/processed locally in your browser/);
  assert.match(terms,/No domain registration, hosting/);
});
test('preview does not initiate backend calls or claim to publish',()=>{
  const js=read('builder.js');
  for(const prohibited of ['fetch(', 'XMLHttpRequest', 'STRIPE_SECRET', 'VENICE_API_KEY', 'localStorage.setItem', 'navigator.sendBeacon']){
    assert.ok(!js.includes(prohibited),prohibited);
  }
  assert.match(js,/URL.createObjectURL/);
  assert.match(js,/frame.srcdoc=buildHTML/);
  assert.match(js,/reportValidity/);
});
test('CSS provides visible keyboard focus and reduced-motion support',()=>{
  const css=read('styles.css');
  assert.match(css,/:focus-visible/);
  assert.match(css,/prefers-reduced-motion/);
  assert.match(css,/@media/);
  assert.equal(escapeHTML("&<>\"'"),'&amp;&lt;&gt;&quot;&#39;');
});