'use strict';
// Fenton Forge early-access preview: no network requests, API keys or server-side generation.
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function validatedData(input = {}) {
  const pick=(key,max)=>String(input[key]??'').trim().slice(0,max);
  const accent = pick('accent',7);
  const email = pick('email',180);
  return {
    name:pick('name',80)||'Your Organisation',
    headline:pick('headline',130)||'Welcome to our website',
    description:pick('description',800)||'Tell your customers about your work.',
    services:String(input.services??'').split(/\r?\n/).map(v=>v.trim().slice(0,120)).filter(Boolean).slice(0,10),
    email:/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)?email:'',
    accent:/^#[0-9a-fA-F]{6}$/.test(accent)?accent:'#176f85'
  };
}
function buildHTML(raw) {
  const data=validatedData(raw);
  const name=escapeHTML(data.name),headline=escapeHTML(data.headline),description=escapeHTML(data.description).replace(/\n/g,'<br>');
  const items=data.services.map(x=>'<li>'+escapeHTML(x)+'</li>').join('');
  const contact=data.email ? '<a class="button" href="mailto:'+encodeURIComponent(data.email)+'">Email '+name+'</a>' : '<p>Contact details available on request.</p>';
  return [
    '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; style-src &#39;unsafe-inline&#39;; base-uri &#39;none&#39;; form-action &#39;none&#39;">',
    '<title>'+name+'</title><meta name="description" content="'+escapeHTML(data.description.slice(0,160))+'">',
    '<style>:root{--accent:'+data.accent+'}*{box-sizing:border-box}body{margin:0;color:#1a2937;background:#f6f9fc;font:16px/1.65 system-ui,-apple-system,sans-serif}',
    'header,main,footer{max-width:980px;margin:auto;padding:24px}header{font-weight:800;letter-spacing:.06em}',
    '.hero{padding:65px 0 55px}h1{max-width:720px;font-size:clamp(2.2rem,6vw,4.7rem);letter-spacing:-.045em;line-height:1.1;margin:0 0 25px}',
    '.intro{max-width:680px;font-size:1.17rem;color:#455766}.button{display:inline-block;background:var(--accent);color:white;text-decoration:none;padding:12px 22px;border-radius:9px;font-weight:700;margin-top:18px}',
    'section{padding:20px 0 45px}h2{font-size:1.7rem}ul{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;list-style:none;padding:0}',
    'li{background:white;border:1px solid #e1e6ed;border-radius:12px;padding:20px}footer{border-top:1px solid #d7dfe8;color:#5a6b7e;font-size:.86rem}',
    '@media(max-width:600px){.hero{padding:40px 0 24px}}</style></head><body>',
    '<header>'+name+'</header><main><div class="hero"><h1>'+headline+'</h1><p class="intro">'+description+'</p>'+contact+'</div>',
    items?'<section><h2>What we offer</h2><ul>'+items+'</ul></section>':'','</main><footer>© '+new Date().getFullYear()+' '+name+'</footer></body></html>'
  ].join('');
}
if(typeof module!=='undefined'&&module.exports)module.exports={escapeHTML,validatedData,buildHTML};
if(typeof document!=='undefined'){
  document.addEventListener('DOMContentLoaded',()=>{
    const form=document.getElementById('site-form'),frame=document.getElementById('site-preview'),download=document.getElementById('download'),status=document.getElementById('status');
    if(!form||!frame||!download||!status)return;
    const read=()=>({
      name:form.elements.namedItem('name').value,
      headline:form.elements.namedItem('headline').value,
      description:form.elements.namedItem('description').value,
      services:form.elements.namedItem('services').value,
      email:form.elements.namedItem('email').value,
      accent:form.elements.namedItem('accent').value
    });
    function preview(){frame.srcdoc=buildHTML(read());status.textContent='Preview refreshed. Your content stays on this device.';}
    form.addEventListener('submit',event=>{event.preventDefault();if(form.reportValidity())preview();});
    download.addEventListener('click',()=>{
      if(!form.reportValidity())return;
      const html=buildHTML(read()),url=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'}));
      const a=document.createElement('a');a.href=url;a.download='fenton-forge-website.html';document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1500);
      status.textContent='HTML file downloaded. You can edit or host it wherever you choose.';
    });
    preview();
  });
}