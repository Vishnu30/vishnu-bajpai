/* Vishnu Bajpai portfolio. Content lives in /data/*.json. Edit those, not this file. */
(async function(){
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const li=a=>`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const chips=a=>a&&a.length?`<div class="stk">${a.map(x=>`<span data-p="${esc(x)}">${esc(x)}</span>`).join('')}</div>`:'';
const go=id=>document.getElementById(id)?.scrollIntoView({behavior:RM?'auto':'smooth'});
const app=$('#app');

let D;
try{
 const files=['site','problems','platforms','playbooks','evolution','clients','faq'];
 const res=await Promise.all(files.map(f=>fetch(`data/${f}.json`,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(f+'.json: '+r.status);return r.json()})));
 D=Object.fromEntries(files.map((f,i)=>[f,res[i]]));
}catch(e){
 app.innerHTML=`<div class="loading"><div class="err"><b>Content couldn't load.</b><p>${esc(e.message)}</p><p>Run <code>python3 -m http.server</code> in this folder and open <code>http://localhost:8000</code>, or view the site on GitHub Pages.</p></div></div>`;return;
}
const S=D.site,LAY={martech:'Martech',revops:'RevOps',crm:'CRM and lifecycle',growth:'Growth'};

/* ---------- Splash ---------- */
(function(){let seen=false;try{seen=sessionStorage.getItem('vb-intro')}catch(e){}
 if(seen||RM||!S.splash)return;try{sessionStorage.setItem('vb-intro','1')}catch(e){}
 const sp=document.createElement('div');sp.className='splash';sp.innerHTML=`<div class="sp-in"><img src="${S.photo}" alt=""><p class="sp-l" id="spL"></p><p class="sp-l2" id="spL2"></p></div>`;
 document.body.appendChild(sp);document.body.style.overflow='hidden';
 const done=()=>{sp.classList.add('out');document.body.style.overflow='';setTimeout(()=>sp.remove(),600)};

 $('#spL').textContent=S.splash[0];$('#spL2').textContent=S.splash[1]||'';setTimeout(done,1000)})();

/* ---------- Page ---------- */
$('#brand').innerHTML=`<img src="${S.photo}" alt="">${esc(S.name)}`;
$('#hireBtn').href='mailto:'+S.contact.email;
const U=S.uplift;

app.innerHTML=`
<div id="top" class="hero"><div class="wrap">
 <div class="hero-top">
  <div>
   <a class="pulse" id="pulse" href="#contact"><span class="live"></span><span class="pl-k">Status</span><span class="pl-t">${esc(S.openTo)}</span></a>
   <h1 aria-label="${esc(S.rotate[0])}"><span class="h1a" aria-hidden="true"><em class="rot" id="rot">${esc(S.rotate[0])}</em></span><span>${esc(S.subhead)}</span></h1>
   <p class="intro">${S.intro}</p>
   <div class="pillars">${S.pillars.map(p=>`<span>${esc(p)}</span>`).join('')}</div>
   <div class="btns"><a class="btn solid" href="#problems">See problems I've solved</a><a class="btn ghost" href="${S.contact.linkedin}" target="_blank" rel="noopener">LinkedIn profile</a></div>
  </div>
  <figure class="portrait"><img src="${S.photo}" alt="${esc(S.name)}" width="440" height="503">
   <figcaption><span class="live"></span><span><b>Martech Manager</b>Global fintech group</span></figcaption></figure>
 </div>
 <div class="engine" id="uplift">
  <div class="engine-head"><h2>${esc(U.title)}</h2>
   <div class="fixctl"><label for="fix">Fix applied <b id="fixv">0%</b></label><input type="range" id="fix" min="0" max="100" value="0" step="1"><button class="icon" id="replay">Replay</button></div></div>
  <div class="ucols">${U.stages.map((s,i)=>`<div class="ucol" data-i="${i}">
   <div class="uval num" id="uv${i}">${s.lift>0?'+':'−'}0%</div><div class="umet">${esc(s.metric)}</div>
   <div class="ubar"><div class="ubase"></div><div class="ughost"></div><div class="ufill" id="uf${i}"><div class="udelta" id="ud${i}"></div></div><span class="u100">100</span></div>
   <b class="uname">${esc(s.name)}</b><small class="uprob">${esc(s.problem)}</small></div>`).join('')}</div>
  <p class="fine">${esc(U.note)}</p>
 </div>
</div></div>

<main>
<section class="s" id="impact"><div class="wrap">
 <div class="shead"><h2>Impact, in numbers</h2><p>Problems first, then what changed. Every figure comes from a programme I owned or delivered.</p></div>
 <div class="big4">${S.stats.map(b=>`<div><span class="num odo${b.gold?' gold':''}" data-v="${esc(b.v)}">${esc(b.v)}</span><span>${esc(b.l)}</span></div>`).join('')}</div>
 <div class="rings">${S.impacts.map(x=>{const f=Math.min(Math.abs(x.v)/40,1),C=2*Math.PI*34;return `<div class="ring">
  <svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" class="rt"/><circle cx="40" cy="40" r="34" class="rf" style="stroke-dasharray:${C};stroke-dashoffset:${C}" data-off="${C*(1-f)}"/></svg>
  <span class="rv num odo" data-v="${x.v>0?'+':'−'}${Math.abs(x.v)}%">${x.v>0?'+':'−'}${Math.abs(x.v)}%</span>
  <div><b>${esc(x.p)}</b><small>${esc(x.m)}</small>${x.s?`<small class="rsc">${esc(x.s)}</small>`:''}</div></div>`}).join('')}</div>
</div></section>

<section class="s" id="problems"><div class="wrap">
 <div class="shead"><h2>Problems I've solved</h2><p>Across martech, RevOps, CRM and growth. Some lived inside one platform; most cut across marketing, sales, product and data.</p></div>
 <div class="chips" role="group" aria-label="Filter problems"><button class="chip" data-f="all" aria-pressed="true">All <i>${D.problems.length}</i></button>${Object.entries(LAY).map(([k,v])=>`<button class="chip" data-f="${k}" aria-pressed="false">${v} <i>${D.problems.filter(p=>p.layer===k).length}</i></button>`).join('')}</div>
 <div class="board"><ol class="plist" id="plist" role="listbox" aria-label="Problems">${D.problems.map((p,i)=>`<li role="option" tabindex="0" data-i="${i}" data-f="${p.layer}" aria-selected="false"><span class="pl-l">${LAY[p.layer]}</span><span class="pl-tt">${esc(p.t)}</span><span class="pl-k num">${esc(p.k)}</span></li>`).join('')}</ol>
 <article class="pdet" id="pdet" aria-live="polite"></article></div>
</div></section>

<section class="s" id="platforms"><div class="wrap">
 <div class="shead"><h2>Platform depth</h2><p>Braze and Salesforce are my core, five years each. Here's what I've solved on each and the features I've gone deep on.</p></div>
 <div class="ptabs" role="tablist">${D.platforms.platforms.map((p,i)=>`<button role="tab" data-i="${i}" aria-selected="${i===0}" style="--pc:${p.color}" class="${i<2?'core':''}"><b>${esc(p.id)}</b><span>${esc(p.years)}</span></button>`).join('')}</div>
 <div class="ppanel" id="ppanel" role="tabpanel"></div>
 <p class="also">Also: ${D.platforms.also.map(esc).join(', ')}.</p>
</div></section>

<section class="s" id="blueprints"><div class="wrap">
 <div class="shead"><h2>Blueprints I bring</h2><p>Not past projects: the reusable journey structures I'd set up in your team on day one. Pick one and step through its logic.</p></div>
 <div class="pb"><div class="pb-list" role="tablist" id="pbList">${D.playbooks.map((p,i)=>`<button role="tab" data-i="${i}" aria-selected="${i===0}"><b>${esc(p.name)}</b><span>${esc(p.goal)}</span></button>`).join('')}</div><div class="pb-main" id="pbMain" role="tabpanel"></div></div>
</div></section>

<section class="s" id="evolution"><div class="wrap">
 <div class="shead"><h2>How my scope grew</h2><p>From mapping processes, to building inside the platforms, to deciding which systems a business needs and what they're worth.</p></div>
 <div class="evo">${D.evolution.map((e,i)=>`<article class="ech" style="--lvl:${i}">
  <svg class="scope" viewBox="0 0 120 120" aria-hidden="true">${[0,1,2].map(r=>`<circle cx="60" cy="60" r="${22+r*17}" class="${r<=i?'on':''}"/>`).join('')}</svg>
  <span class="eyr">${esc(e.years)}</span><h3>${esc(e.stage)}</h3><span class="escope">Scope: ${esc(e.scope)}</span>
  <p class="eq">${esc(e.q)}</p>${li(e.did)}
  <div class="em"><b class="num">${esc(e.metric)}</b><span>${esc(e.ml)}</span></div>
  <div class="pills">${e.skills.map(s=>`<span>${esc(s)}</span>`).join('')}</div>
  <small class="eroles">${esc(e.roles)}</small></article>`).join('')}</div>
</div></section>

<section class="s" id="clients"><div class="wrap">
 <div class="shead"><h2>Client portfolio</h2><p>Brands I worked with at a Braze partner agency, one per industry, plus a US spa franchise.</p></div>
 <div class="ind-tabs" role="tablist" id="indTabs">${D.clients.map((c,i)=>`<button role="tab" data-i="${i}" aria-selected="${i===0}"><b>${esc(c.name)}</b><span>${esc(c.industry)}</span></button>`).join('')}</div>
 <div id="clientPanel" role="tabpanel"></div>
</div></section>
<section class="s" id="skills"><div class="wrap">
 <div class="shead"><h2>Skills and keywords</h2><p>The full list, in the terms job descriptions use.</p></div>
 <div class="skills">${Object.entries(S.skills||{}).map(([g,a])=>`<div><h3>${esc(g)}</h3><p>${a.map(esc).join(', ')}</p></div>`).join('')}</div>
</div></section>
</main>

<section class="contact" id="contact"><div class="wrap">
 <h2>Need someone at the intersection of CRM, marketing and tech?</h2>
 <div class="cgrid">
  <div class="links">
   <a href="mailto:${S.contact.email}">Email <span>${esc(S.contact.email)}</span></a>
   <a href="tel:${S.contact.phone.replace(/\s/g,'')}">Phone <span>${esc(S.contact.phone)}</span></a>
   <a href="${S.contact.linkedin}" target="_blank" rel="noopener">LinkedIn <span>in/vishnu-bajpai</span></a>
   <a href="#top">Based in <span>${esc(S.contact.location)}</span></a>
  </div>
  <div class="ask"><h3>Recruiter quick answers</h3>
   <form id="askForm"><input id="askIn" placeholder="Ask about platforms, RevOps, impact…" aria-label="Your question"><button class="go" type="submit">Ask</button></form>
   <div class="qs">${D.faq.map((f,i)=>`<button type="button" data-q="${i}">${esc(f.q)}</button>`).join('')}</div>
   <div class="ans" id="askAns" aria-live="polite">Pick a question or type your own.</div>
  </div>
 </div>
 <footer><span>© ${new Date().getFullYear()} ${esc(S.name)}</span><span>${esc(S.openTo)}</span></footer>
</div></section>`;

/* ---------- Martech pulse (data/news.json, refreshed by GitHub Action) ---------- */
fetch('data/news.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(n=>{
 if(!n||!n.items||!n.items.length)return;const P=$('#pulse');let k=0;
 const show=()=>{const it=n.items[k%n.items.length];P.href=it.link;P.target='_blank';P.rel='noopener';P.classList.add('swap');
  setTimeout(()=>{P.innerHTML=`<span class="live"></span><span class="pl-k">Martech pulse</span><span class="pl-t">${esc(it.title)}</span><span class="pl-s">${esc(it.source)}</span>`;P.classList.remove('swap')},250);k++};
 show();if(!RM)setInterval(show,7000)}).catch(()=>{});

/* ---------- Rotating statements ---------- */
const rot=$('#rot'),W=S.rotate;
if(W.length>1&&!RM){let wi=0;
 const type=(w,i=0)=>{rot.textContent=w.slice(0,i);if(i<w.length)setTimeout(()=>type(w,i+1),40);else setTimeout(()=>erase(w,w.length),2600)};
 const erase=(w,i)=>{rot.textContent=w.slice(0,i);if(i>0)setTimeout(()=>erase(w,i-1),16);else{wi=(wi+1)%W.length;type(W[wi])}};
 setTimeout(()=>erase(W[0],W[0].length),3400)}

/* ---------- Uplift chart ---------- */
const MIN=70,MAX=125,pct=v=>(v-MIN)/(MAX-MIN)*100;
function setFix(t){$('#fixv').textContent=Math.round(t*100)+'%';$('#fix').value=Math.round(t*100);
 U.stages.forEach((s,i)=>{const v=100+s.lift*t,f=$('#uf'+i),d=$('#ud'+i);f.style.height=pct(v)+'%';
  const dv=Math.abs(s.lift*t);d.style.height=(dv/(v-MIN)*100)+'%';d.classList.toggle('down',!!s.goodDown);
  if(s.goodDown){d.style.height='0';f.style.setProperty('--saved',(pct(100)-pct(v))+'%')}
  $('#uv'+i).textContent=(s.lift>0?'+':'−')+Math.round(Math.abs(s.lift*t))+'%'})}
let raf;function play(){cancelAnimationFrame(raf);const st=performance.now(),d=RM?1:1800;(function f(n){const p=Math.min((n-st)/d,1);setFix(1-Math.pow(1-p,3));if(p<1)raf=requestAnimationFrame(f)})(st)}
$('#fix').oninput=e=>{cancelAnimationFrame(raf);setFix(e.target.value/100)};$('#replay').onclick=()=>{setFix(0);setTimeout(play,150)};
setFix(0);new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){o.disconnect();setTimeout(play,RM?0:400)}}),{threshold:.4}).observe($('#uplift'));

/* ---------- Odometers and rings ---------- */
function buildOdo(el){const v=el.dataset.v;el.setAttribute('aria-label',v);
 el.innerHTML=[...v].map(c=>/\d/.test(c)?`<span class="od" aria-hidden="true"><span class="ods" data-d="${c}">${'01234567890123456789'.split('').map(x=>`<span>${x}</span>`).join('')}</span></span>`:`<span aria-hidden="true">${esc(c)}</span>`).join('')}
$$('.odo').forEach(buildOdo);
const oio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;oio.unobserve(e.target);
 $$('.ods',e.target).forEach((s,i)=>{s.style.transitionDelay=(i*120)+'ms';s.style.transform=`translateY(-${10+ +s.dataset.d}em)`});
 const ring=e.target.closest('.ring');if(ring){const c=$('.rf',ring);c.style.strokeDashoffset=c.dataset.off}}),{threshold:.5});
$$('.odo').forEach(el=>{if(RM){$$('.ods',el).forEach(s=>{s.style.transition='none';s.style.transform=`translateY(-${10+ +s.dataset.d}em)`});const r=el.closest('.ring');if(r){const c=$('.rf',r);c.style.transition='none';c.style.strokeDashoffset=c.dataset.off}}else oio.observe(el)});

/* ---------- Problem board ---------- */
const pl=$('#plist'),pd=$('#pdet');
function showP(i){const p=D.problems[i];$$('li',pl).forEach(x=>x.setAttribute('aria-selected',x.dataset.i==i));
 pd.innerHTML=`<span class="pd-l">${LAY[p.layer]}</span><h3>${esc(p.t)}</h3>
 <div class="pd-k"><b class="num">${esc(p.k)}</b><span>${esc(p.kl)}</span></div>${p.scale?`<p class="pd-sc"><span>Scale</span>${esc(p.scale)}</p>`:''}
 <div class="pd-s"><h4>The problem</h4><p>${esc(p.p)}</p></div>
 <div class="pd-s"><h4>What I did</h4>${li(p.d)}</div>
 <div class="pd-s"><h4>Impact</h4>${li(p.i)}</div>${chips(p.stack)}`;
 pd.classList.remove('in');void pd.offsetWidth;pd.classList.add('in')}
$$('li',pl).forEach(x=>{x.onclick=()=>{showP(+x.dataset.i);if(innerWidth<1000)pd.scrollIntoView({behavior:RM?'auto':'smooth',block:'nearest'})};x.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showP(+x.dataset.i)}}});
$$('#problems .chip').forEach(b=>b.onclick=()=>{$$('#problems .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));const f=b.dataset.f;
 $$('li',pl).forEach(x=>x.hidden=f!=='all'&&x.dataset.f!==f);const first=$$('li',pl).find(x=>!x.hidden);if(first)showP(+first.dataset.i)});
showP(0);

/* ---------- Platforms ---------- */
const pp=$('#ppanel');
function showPl(i){const p=D.platforms.platforms[i];$$('.ptabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.i==i));
 pp.style.setProperty('--pc',p.color);
 pp.innerHTML=`<div class="pp-head"><div class="xlogo">${esc(p.id[0])}</div><div><h3>${esc(p.id)}</h3><p>${esc(p.role)}</p></div><div class="pp-yrs"><b class="num">${esc(p.years)}</b>${p.cert?`<span>${esc(p.cert)}</span>`:''}</div></div>
 <div class="pp-body"><div><h4>Problems I've solved with it</h4><ul class="solved">${p.solved.map(s=>`<li>${esc(s)}</li>`).join('')}</ul></div>
 <div><h4>Features I've worked with</h4><div class="feats">${p.features.map(f=>`<div class="feat"><b>${esc(f.n)}</b><span>${esc(f.d)}</span></div>`).join('')}</div></div></div>`}
$$('.ptabs button').forEach(b=>b.onclick=()=>showPl(+b.dataset.i));showPl(0);

/* ---------- Blueprints ---------- */
const pm=$('#pbMain');let pbI=0;
function showPb(i){pbI=i;const p=D.playbooks[i];$$('#pbList button').forEach(b=>b.setAttribute('aria-selected',b.dataset.i==i));
 pm.innerHTML=`<div class="pb-head"><div><h3>${esc(p.name)}</h3><p>Best for: ${esc(p.bestFor)}</p></div><span class="pb-kpi">${esc(p.kpi)}</span></div>
 <div class="journey"><span class="traveller" id="trav"></span>${p.steps.map((s,j)=>`<button class="node" data-j="${j}" aria-pressed="${j===0}"><span class="ring2">${j+1}</span><span class="when">${esc(s.when)}</span><b>${esc(s.title)}</b><span class="ch">${esc(s.channel)}</span></button>`).join('')}</div>
 <div class="pb-detail" id="pbD" aria-live="polite"></div>`;
 $$('.node',pm).forEach(n=>n.onclick=()=>step(+n.dataset.j));step(0)}
function step(j){const s=D.playbooks[pbI].steps[j];$$('.node',pm).forEach(n=>n.setAttribute('aria-pressed',n.dataset.j==j));
 const n=$$('.node',pm)[j],t=$('#trav');if(t&&n)t.style.left=(n.offsetLeft+15)+'px';$('#pbD').innerHTML=`<b>Step ${j+1}: ${esc(s.title)}.</b> ${esc(s.detail)}`}
$$('#pbList button').forEach(b=>b.onclick=()=>showPb(+b.dataset.i));showPb(0);
addEventListener('resize',()=>{const n=$('.node[aria-pressed="true"]',pm);if(n)step(+n.dataset.j)});

/* ---------- Clients ---------- */
function showClient(i){const c=D.clients[i];$$('#indTabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.i==i));
 $('#clientPanel').innerHTML=`<div class="client"><div class="lead"><div><h3>${esc(c.name)}</h3><p>${esc(c.sector)}</p></div><div class="stack">${c.stack.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div>
 <div><h4>The problem</h4>${li(c.problem)}</div><div><h4>What we built</h4>${li(c.built)}</div><div><h4>What we measured</h4>${li(c.measured)}</div></div>`}
$$('#indTabs button').forEach(b=>b.onclick=()=>showClient(+b.dataset.i));showClient(0);

/* ---------- Ask ---------- */
const ans=$('#askAns');$$('[data-q]').forEach(b=>b.onclick=()=>{ans.textContent=D.faq[b.dataset.q].a});
$('#askForm').onsubmit=e=>{e.preventDefault();const q=$('#askIn').value.toLowerCase().trim();if(!q){ans.textContent='Type a question first, or pick one above.';return}
 const h=D.faq.find(f=>f.keywords.some(k=>q.includes(k)));ans.textContent=h?h.a:`No ready answer for that one. Email ${S.contact.email} and I'll reply personally.`};

/* ---------- Command palette ---------- */
const SEC=[['impact','Impact'],['problems',"Problems I've solved"],['platforms','Platform depth'],['blueprints','Blueprints'],['evolution','How my scope grew'],['clients','Client portfolio'],['skills','Skills and keywords'],['contact','Contact']];
const items=[...SEC.map(([id,t])=>({t,k:'Section',go:()=>go(id)})),
 ...D.problems.map((p,i)=>({t:p.t,k:LAY[p.layer],go:()=>{go('problems');showP(i)}})),
 ...D.platforms.platforms.map((p,i)=>({t:p.id,k:'Platform',go:()=>{go('platforms');showPl(i)}})),
 ...D.playbooks.map((p,i)=>({t:p.name,k:'Blueprint',go:()=>{go('blueprints');showPb(i)}})),
 ...D.clients.map((c,i)=>({t:c.name,k:'Client',go:()=>{go('clients');showClient(i)}})),
 {t:'Email Vishnu',k:'Contact',go:()=>location.href='mailto:'+S.contact.email},{t:'Open LinkedIn',k:'Contact',go:()=>open(S.contact.linkedin,'_blank')}];
const cmd=document.createElement('dialog');cmd.className='cmd';cmd.setAttribute('aria-label','Jump to');
cmd.innerHTML='<input id="cmdIn" placeholder="Search problems, platforms, blueprints, clients" autocomplete="off"><ul id="cmdList" role="listbox"></ul><p class="cmdhint">Enter to open, arrows to move, Esc to close</p>';
document.body.appendChild(cmd);let sel=0,res=[];
const list=q=>{q=q.toLowerCase();res=items.filter(x=>(x.t+' '+x.k).toLowerCase().includes(q)).slice(0,9);sel=0;paint()};
const paint=()=>{$('#cmdList').innerHTML=res.map((x,i)=>`<li role="option" aria-selected="${i===sel}" data-i="${i}"><span>${esc(x.t)}</span><small>${esc(x.k)}</small></li>`).join('')||'<li class="none">No match. Try a platform or problem.</li>';$$('#cmdList li[data-i]').forEach(l=>l.onclick=()=>run(+l.dataset.i))};
const run=i=>{const x=res[i];if(!x)return;cmd.close();setTimeout(x.go,60)};
const openCmd=()=>{cmd.showModal();$('#cmdIn').value='';list('');$('#cmdIn').focus()};
$('#cmdIn').oninput=e=>list(e.target.value);
$('#cmdIn').onkeydown=e=>{if(e.key==='ArrowDown'){sel=Math.min(sel+1,res.length-1);paint();e.preventDefault()}else if(e.key==='ArrowUp'){sel=Math.max(sel-1,0);paint();e.preventDefault()}else if(e.key==='Enter')run(sel)};
cmd.addEventListener('click',e=>{if(e.target===cmd)cmd.close()});
document.addEventListener('keydown',e=>{if((e.key==='k'&&(e.metaKey||e.ctrlKey))||(e.key==='/'&&!/input|textarea/i.test(document.activeElement.tagName))){e.preventDefault();openCmd()}});
$('#cmdBtn').onclick=openCmd;

/* ---------- Dots, progress, spotlight, nav ---------- */
const dots=document.createElement('nav');dots.className='dots';dots.setAttribute('aria-label','Page sections');
const DS=[['top','Intro'],...SEC];dots.innerHTML=DS.map(([id,t])=>`<a href="#${id}" data-d="${id}"><span>${esc(t)}</span></a>`).join('');document.body.appendChild(dots);
const nav=$('#nav'),mb=$('#menuBtn');
const so=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const id=e.target.id;$$('a',dots).forEach(a=>a.classList.toggle('on',a.dataset.d===id));$$('a',nav).forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+id))}),{rootMargin:'-45% 0px -50% 0px'});
DS.forEach(([id])=>so.observe(document.getElementById(id)));
const bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.transform=`scaleX(${h.scrollTop/(h.scrollHeight-h.clientHeight)})`},{passive:true});
const hero=$('.hero');if(!RM)hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px')});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const t=document.getElementById(a.getAttribute('href').slice(1));if(!t)return;
 e.preventDefault();t.scrollIntoView({behavior:RM?'auto':'smooth'});nav.classList.remove('open');mb.setAttribute('aria-expanded','false')});
mb.onclick=()=>mb.setAttribute('aria-expanded',nav.classList.toggle('open'));
if(location.hash){const t=document.getElementById(location.hash.slice(1));if(t)setTimeout(()=>t.scrollIntoView(),50)}
})();

(function(){const root=document.documentElement;try{const t=localStorage.getItem('vb-theme');if(t)root.dataset.theme=t}catch(e){}
 document.getElementById('themeBtn').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;root.dataset.theme=d?'light':'dark';try{localStorage.setItem('vb-theme',root.dataset.theme)}catch(e){}}})();
