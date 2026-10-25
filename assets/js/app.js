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
 const need=['site','problems','platforms','playbooks','evolution','clients','faq'],opt=['interactive'];
 const get=(f,o)=>fetch(`data/${f}.json`,{cache:'no-cache'}).then(r=>{if(!r.ok){if(o)return null;throw new Error('data/'+f+'.json is missing ('+r.status+')')}return r.json().catch(()=>{throw new Error('data/'+f+'.json has a formatting error')})});
 const res=await Promise.all([...need.map(f=>get(f)),...opt.map(f=>get(f,1))]);
 D=Object.fromEntries([...need,...opt].map((f,i)=>[f,res[i]]));
}catch(e){
 app.innerHTML=`<div class="loading"><div class="err"><b>Content couldn't load.</b><p>${esc(e.message)}</p><p>Run <code>python3 -m http.server</code> in this folder and open <code>http://localhost:8000</code>, or view the site on GitHub Pages.</p></div></div>`;return;
}
const S=D.site;
if(!S.statements||!S.statements.length)S.statements=(S.rotate||[S.subhead||S.name]).map(h=>({h,s:''}));
if(!D.interactive)D.interactive={diagnose:[],calc:{models:[],note:''},fit:{terms:[],gaps:[],sample:'',note:''}};
D.interactive.fit=D.interactive.fit||{terms:[],gaps:[],sample:'',note:''};
try{
const LAY={martech:'Martech',revops:'RevOps',crm:'CRM and lifecycle',growth:'Growth'};

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
   <p class="role">${esc(S.subhead)}</p>
   <div class="stmt" id="stmt" aria-live="polite"><h1 id="stH">${esc(S.statements[0].h)}</h1><p class="stS" id="stS">${esc(S.statements[0].s)}</p></div>
   <div class="stdots" role="tablist" aria-label="Statements">${S.statements.map((x,i)=>`<button role="tab" aria-selected="${i===0}" data-i="${i}" aria-label="Statement ${i+1}"><i></i></button>`).join('')}</div>
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
  <div class="rw"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" class="rt"/><circle cx="40" cy="40" r="34" class="rf" style="stroke-dasharray:${C};stroke-dashoffset:${C}" data-off="${C*(1-f)}"/></svg>
  <span class="rv num odo" data-v="${x.v>0?'+':'−'}${Math.abs(x.v)}%">${x.v>0?'+':'−'}${Math.abs(x.v)}%</span></div>
  <div><b>${esc(x.p)}</b><small>${esc(x.m)}</small>${x.s?`<small class="rsc">${esc(x.s)}</small>`:''}</div></div>`}).join('')}</div>
</div></section>

<section class="s" id="tryit"><div class="wrap">
 <div class="shead"><h2>Try it on your business</h2><p>Two quick tools. Tell me what's hurting, or plug in your numbers, and see how I'd approach it.</p></div>
 <div class="tt" role="tablist"><button role="tab" aria-selected="true" data-t="dx">Diagnose your funnel</button><button role="tab" aria-selected="false" data-t="calc">Estimate the impact</button><button role="tab" aria-selected="false" data-t="fit">Check fit with your role</button></div>
 <div class="tpane" id="t-dx"><p class="tq">What's hurting most right now?</p><div class="syms" id="syms">${D.interactive.diagnose.map((d,i)=>`<button data-i="${i}" aria-pressed="false">${esc(d.sym)}</button>`).join('')}</div><div class="dxout" id="dxout" aria-live="polite"><p class="dxhint">Pick one to see how I'd tackle it.</p></div></div>
 <div class="tpane" id="t-calc" hidden>
  <div class="cmodels">${D.interactive.calc.models.map((m,i)=>`<button data-m="${i}" aria-pressed="${i===0}">${esc(m.name)}</button>`).join('')}<select id="cur" aria-label="Currency"><option value="INR">₹ INR</option><option value="USD">$ USD</option><option value="GBP">£ GBP</option><option value="EUR">€ EUR</option></select></div>
  <div class="cgrid2"><div id="cin"></div><div class="cout" id="cout" aria-live="polite"></div></div>
  <p class="fine2">${esc(D.interactive.calc.note)}</p>
 </div>
 <div class="tpane" id="t-fit" hidden>
  <p class="tq">Paste a job description to see how my experience lines up.</p>
  <textarea id="jd" rows="7" placeholder="Paste the role's responsibilities and requirements here"></textarea>
  <div class="fitbtns"><button class="btn sm" id="fitGo">Check fit</button><button class="btn sm ghost2" id="fitSample">Try a sample role</button><span class="fitnote">${esc(D.interactive.fit.note)}</span></div>
  <p class="fiterr" id="fitErr" role="alert"></p>
  <div class="fitout" id="fitOut" aria-live="polite"></div>
 </div>
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
 <div class="skills">${Object.entries(S.skills||{}).map(([g,a])=>`<div><h3>${esc(g)}</h3><p>${a.map(t=>`<span class="sk">${esc(t)}</span>`).join('')}</p></div>`).join('')}</div>
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

/* ---------- Statements ---------- */
const ST=S.statements;let sti=0,stT;
function setSt(i){sti=(i+ST.length)%ST.length;const box=$('#stmt');box.classList.add('out');
 setTimeout(()=>{$('#stH').textContent=ST[sti].h;$('#stS').textContent=ST[sti].s;box.classList.remove('out')},RM?0:280);
 $$('.stdots button').forEach(b=>{b.setAttribute('aria-selected',b.dataset.i==sti);b.classList.remove('run');if(b.dataset.i==sti&&!RM){void b.offsetWidth;b.classList.add('run')}})}
const autoSt=()=>{clearInterval(stT);if(!RM)stT=setInterval(()=>setSt(sti+1),2000)};
$$('.stdots button').forEach(b=>b.onclick=()=>{setSt(+b.dataset.i);autoSt()});
$('#stmt').addEventListener('mouseenter',()=>clearInterval(stT));$('#stmt').addEventListener('mouseleave',autoSt);
function fitSt(){const box=$('#stmt'),c=box.cloneNode(true);c.removeAttribute('id');c.style.cssText='position:absolute;visibility:hidden;min-height:0;width:'+box.clientWidth+'px';box.parentNode.appendChild(c);
 let m=0;ST.forEach(x=>{c.querySelector('h1').textContent=x.h;c.querySelector('.stS').textContent=x.s;m=Math.max(m,c.offsetHeight)});c.remove();box.style.minHeight=m+'px'}
fitSt();addEventListener('resize',fitSt);if(document.fonts)document.fonts.ready.then(fitSt);
setSt(0);autoSt();

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

/* ---------- Try it ---------- */
$$('.tt button').forEach(b=>b.onclick=()=>{$$('.tt button').forEach(x=>x.setAttribute('aria-selected',x===b));['dx','calc','fit'].forEach(t=>$('#t-'+t).hidden=b.dataset.t!==t)});
/* Fit check */
const FT=D.interactive.fit,hit=(txt,al)=>al.some(a=>{const re=new RegExp('(^|[^a-z0-9])'+a.replace(/[.*+?^${}()|[\]\\\/]/g,'\\$&')+'($|[^a-z0-9])','i');return re.test(txt)});
function runFit(){const txt=' '+$('#jd').value.toLowerCase()+' ';if($('#jd').value.trim().length<40){$('#fitErr').textContent='Paste a little more of the job description, at least a couple of sentences.';return}
 $('#fitErr').textContent='';const m=FT.terms.filter(t=>hit(txt,t[1])).map(t=>t[0]),g=FT.gaps.filter(t=>hit(txt,t[1])).map(t=>t[0]);
 const tot=m.length+g.length,sc=tot?Math.round(m.length/tot*100):0,C=2*Math.PI*52;
 const rel=D.problems.map((p,i)=>({i,p,n:[p.t,p.p,...p.d,...(p.stack||[])].join(' ').toLowerCase()})).map(o=>({...o,s:FT.terms.filter(t=>m.includes(t[0])&&hit(' '+o.n+' ',t[1])).length})).filter(o=>o.s).sort((a,b)=>b.s-a.s).slice(0,3);
 $('#fitOut').innerHTML=tot?`<div class="fitgrid"><div class="fitscore"><div class="fsw"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="rt"/><circle cx="60" cy="60" r="52" class="rf" style="stroke-dasharray:${C};stroke-dashoffset:${C}" id="fsr"/></svg><b class="num">${sc}%</b></div><span>${m.length} of ${tot} skills and tools this role mentions</span></div>
 <div><h4>Where I match</h4><div class="fchips">${m.map(x=>`<span class="ok">${esc(x)}</span>`).join('')}</div>${g.length?`<h4>Worth a conversation</h4><div class="fchips">${g.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}
 ${rel.length?`<h4>Most relevant proof</h4><ul class="frel">${rel.map(o=>`<li><button data-pi="${o.i}">${esc(o.p.t)}</button><b class="num">${esc(o.p.k)}</b></li>`).join('')}</ul>`:''}
 <a class="btn sm" href="mailto:${S.contact.email}?subject=${encodeURIComponent('Role that matches your experience')}">Send me this role</a></div></div>`:'<p class="dxhint">I couldn\'t find martech, CRM or RevOps terms in that text. Try pasting the requirements section.</p>';
 const r=$('#fsr');if(r)requestAnimationFrame(()=>requestAnimationFrame(()=>r.style.strokeDashoffset=C*(1-sc/100)));
 $$('#fitOut [data-pi]').forEach(b=>b.onclick=()=>{go('problems');showP(+b.dataset.pi)})}
$('#fitGo').onclick=runFit;$('#fitSample').onclick=()=>{$('#jd').value=FT.sample;runFit()};$('#jd').oninput=()=>{$('#fitErr').textContent=''};
const DX=D.interactive.diagnose;
$$('#syms button').forEach(b=>b.onclick=()=>{$$('#syms button').forEach(x=>x.setAttribute('aria-pressed',x===b));const d=DX[b.dataset.i],p=D.problems[d.p],bp=d.b!=null?D.playbooks[d.b]:null;
 $('#dxout').innerHTML=`<div class="dxr"><div class="dxa"><span class="dxl">What I've seen work</span><h3>${esc(p.t)}</h3><p>${esc(p.p)}</p><div class="dxm"><b class="num">${esc(p.k)}</b><span>${esc(p.kl)}</span></div>
 <div class="dxbtns"><button class="btn sm" data-go="p" data-i="${d.p}">Read the full case</button>${bp?`<button class="btn sm ghost2" data-go="b" data-i="${d.b}">Blueprint: ${esc(bp.name)}</button>`:''}</div></div>
 <div class="dxp"><span class="dxl">How I'd run the first 90 days</span><ol>${d.plan.map(x=>{const [w,...t]=x.split(': ');const tx=t.join(': ');return `<li><b>${esc(w)}</b>${esc(tx.charAt(0).toUpperCase()+tx.slice(1))}</li>`}).join('')}</ol></div></div>`;
 $$('#dxout [data-go]').forEach(g=>g.onclick=()=>{if(g.dataset.go==='p'){go('problems');showP(+g.dataset.i)}else{go('blueprints');showPb(+g.dataset.i)}})});
const CM=D.interactive.calc.models;let cmI=0;const vals={};
const fmt=(n,cur)=>{try{return new Intl.NumberFormat(cur==='INR'?'en-IN':'en-GB',{style:'currency',currency:cur,maximumFractionDigits:0,notation:Math.abs(n)>=1e7?'compact':'standard'}).format(n)}catch(e){return Math.round(n).toLocaleString()}};
function renderCalc(){const m=CM[cmI];$$('.cmodels [data-m]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.m==cmI));
 $('#cin').innerHTML=m.inputs.map(x=>{const v=vals[m.id+x.k]??x.v;return `<label class="cin"><span>${esc(x.l)}</span><div><input type="range" min="${x.min}" max="${x.max}" step="${x.step}" value="${v}" data-k="${x.k}"><input type="number" min="${x.min}" max="${x.max}" step="${x.step}" value="${v}" data-k="${x.k}" aria-label="${esc(x.l)}"><em>${x.pct?'%':''}</em></div></label>`}).join('');
 $$('#cin input').forEach(inp=>inp.oninput=()=>{let v=+inp.value;const x=m.inputs.find(i=>i.k===inp.dataset.k);if(isNaN(v))return;v=Math.min(Math.max(v,x.min),x.max);vals[m.id+x.k]=v;$$(`#cin input[data-k="${x.k}"]`).forEach(o=>{if(o!==inp)o.value=v});calcOut()});calcOut()}
function calcOut(){const m=CM[cmI],g=k=>vals[m.id+k]??m.inputs.find(i=>i.k===k).v,cur=$('#cur').value;let base,after,unit,extraU,mo;
 if(m.id==='leads'){const won=g('leads')*g('sql')/100*g('win')/100;base=won*g('deal');extraU=won*m.lift;after=base+extraU*g('deal');unit='extra closed deals a month'}
 else{const rep=g('cust')*g('rep')/100;base=rep*g('aov');extraU=rep*m.lift;after=base+extraU*g('aov');unit='extra repeat orders a month'}
 mo=after-base;
 $('#cout').innerHTML=`<span class="dxl">With ${esc(m.liftLabel)}</span><div class="cbig num">${fmt(mo*12,cur)}</div><span class="csub">extra revenue a year</span>
 <div class="crow"><div><b class="num">${fmt(mo,cur)}</b><span>extra per month</span></div><div><b class="num">${Math.round(extraU).toLocaleString()}</b><span>${unit}</span></div></div>
 <div class="cbar"><i style="width:${base/after*100}%"></i><i class="gain" style="width:${(after-base)/after*100}%"></i></div><div class="cleg"><span>Today ${fmt(base,cur)}/mo</span><span class="g">After ${fmt(after,cur)}/mo</span></div>
 <a class="btn sm" href="mailto:${S.contact.email}?subject=${encodeURIComponent('Let\'s talk about '+m.liftLabel)}">Talk to me about this</a>`}
$$('.cmodels [data-m]').forEach(b=>b.onclick=()=>{cmI=+b.dataset.m;renderCalc()});$('#cur').onchange=calcOut;if(CM.length)renderCalc();

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
const SEC=[['impact','Impact'],['tryit','Try it'],['problems',"Problems I've solved"],['platforms','Platform depth'],['blueprints','Blueprints'],['evolution','How my scope grew'],['clients','Client portfolio'],['skills','Skills and keywords'],['contact','Contact']];
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

/* ================= Motion layer ================= */
const NOW=()=>Date.now(),desk=()=>innerWidth>=1000;

/* Scroll reveals with stagger */
document.documentElement.classList.add('js');
const RVSEL=['.shead p','.big4>div','.ring','.tt','.syms button','.plist li','.ptabs button','.feat','.solved li','.ech','.ind-tabs button','.skills>div','.links a','.ask'];
if(!RM){const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -6% 0px'});
 RVSEL.forEach(sel=>{const g=new Map();$$(sel).forEach(el=>{const k=el.parentElement;const n=g.get(k)||0;g.set(k,n+1);el.classList.add('rvl');el.style.setProperty('--d',Math.min(n,10)*60+'ms');rio.observe(el)})});
 setTimeout(()=>$$('.rvl:not(.in)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('in')}),1500);
 const observeNew=root=>{$$('.feat,.solved li',root).forEach((el,n)=>{el.classList.add('rvl');el.style.setProperty('--d',Math.min(n,10)*50+'ms');requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')))})};
 const _showPl=showPl;window.__obsPl=()=>observeNew($('#ppanel'));
}

/* Section headings: word-by-word reveal */
if(!RM){const hio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');hio.unobserve(e.target)}}),{threshold:.4});
 $$('.shead h2, .contact h2').forEach(h=>{h.innerHTML=h.textContent.split(' ').map((w,i)=>`<span class="w" style="--d:${i*70}ms"><span>${esc(w)}</span></span>`).join(' ');h.classList.add('wrv');hio.observe(h)})}

/* Auto-play while a section is on screen; any click or key in it hands control to the visitor */
function autoplay(secId,next,ms,cond){const sec=document.getElementById(secId);if(!sec||RM)return;let vis=false,hold=0,t0=NOW();
 const head=$('.shead',sec),bar=document.createElement('div');bar.className='cyc';bar.innerHTML='<span class="cyc-t">Auto-playing</span><span class="cyc-b"><i></i></span><button type="button" class="cyc-x">Pause</button>';head.appendChild(bar);
 let paused=false;const btn=$('.cyc-x',bar);btn.onclick=e=>{e.stopPropagation();paused=!paused;btn.textContent=paused?'Play':'Pause';bar.classList.toggle('off',paused);t0=NOW();hold=0};
 const restart=()=>{const i=$('i',bar);i.style.animation='none';void i.offsetWidth;i.style.animation=`cyc ${ms}ms linear forwards`};
 new IntersectionObserver(es=>es.forEach(e=>{vis=e.isIntersecting;if(vis){t0=NOW();restart()}}),{threshold:.35}).observe(sec);
 sec.addEventListener('pointerdown',e=>{if(e.target.closest('.cyc'))return;hold=NOW();bar.classList.add('off');$('.cyc-t',bar).textContent='Paused while you explore'},true);
 setInterval(()=>{const ok=vis&&!paused&&(!cond||cond());bar.hidden=!(!cond||cond());if(!ok)return;
  if(hold&&NOW()-hold<15000)return;if(hold){hold=0;bar.classList.remove('off');$('.cyc-t',bar).textContent='Auto-playing';t0=NOW();restart();return}
  if(NOW()-t0>=ms){next();t0=NOW();restart()}},250)}
autoplay('problems',()=>{const vis=$$('#plist li').filter(x=>!x.hidden),cur=vis.findIndex(x=>x.getAttribute('aria-selected')==='true');const n=vis[(cur+1)%vis.length];if(n)showP(+n.dataset.i)},6500,desk);
autoplay('platforms',()=>{const n=D.platforms.platforms.length,cur=$$('.ptabs button').findIndex(b=>b.getAttribute('aria-selected')==='true');showPl((cur+1)%n);window.__obsPl&&window.__obsPl()},7000);
autoplay('blueprints',()=>{const nodes=$$('.node',$('#pbMain')),cur=nodes.findIndex(n=>n.getAttribute('aria-pressed')==='true');if(cur<nodes.length-1)step(cur+1);else showPb((pbI+1)%D.playbooks.length)},2600);
autoplay('clients',()=>{const n=D.clients.length,cur=$$('#indTabs button').findIndex(b=>b.getAttribute('aria-selected')==='true');showClient((cur+1)%n)},6000);
$$('.ptabs button').forEach(b=>b.addEventListener('click',()=>window.__obsPl&&window.__obsPl()));

/* Uplift chart replays each time it comes back into view */
let upSeen=false;new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&upSeen&&!RM){setFix(0);setTimeout(play,250)}if(!e.isIntersecting&&e.boundingClientRect.top>0)upSeen=true;if(e.isIntersecting)upSeen=true}),{threshold:.5}).observe($('#uplift'));

/* Evolution: scope grows as you scroll through it */
const evo=$('.evo');if(evo){const chs=$$('.ech',evo);evo.insertAdjacentHTML('afterbegin','<div class="evo-track" aria-hidden="true"><i></i></div>');const fill=$('.evo-track i',evo);
 const onS=()=>{const r=evo.getBoundingClientRect(),vh=innerHeight,p=Math.min(Math.max((vh*.75-r.top)/(r.height*.9),0),1);fill.style.width=(p*100)+'%';
  chs.forEach((c,i)=>c.classList.toggle('act',p>=i/3+.05||RM))};addEventListener('scroll',onS,{passive:true});onS()}

/* Portrait tilt */
const pt=$('.portrait');if(pt&&!RM&&matchMedia('(hover:hover)').matches){const h=$('.hero');h.addEventListener('pointermove',e=>{const r=pt.getBoundingClientRect(),x=(e.clientX-(r.left+r.width/2))/r.width,y=(e.clientY-(r.top+r.height/2))/r.height;pt.style.transform=`perspective(900px) rotateY(${Math.max(-1,Math.min(1,x))*7}deg) rotateX(${Math.max(-1,Math.min(1,-y))*7}deg)`});h.addEventListener('pointerleave',()=>pt.style.transform='')}

/* Skills: live search */
const sk=$('#skills .skills');if(sk){
 sk.insertAdjacentHTML('beforebegin','<div class="sksearch"><input id="skq" type="search" placeholder="Search my skills, for example attribution or Braze" aria-label="Search skills"><span id="skn"></span></div>');
 const all=$$('.sk',sk);$('#skn').textContent=all.length+' skills';
 $('#skq').oninput=e=>{const q=e.target.value.trim().toLowerCase();let n=0;
  $$(':scope>div',sk).forEach(g=>{const gm=q&&$('h3',g).textContent.toLowerCase().includes(q);let gh=0;$$('.sk',g).forEach(s=>{const m=q&&(gm||s.textContent.toLowerCase().includes(q));s.classList.toggle('hit',!!m);s.classList.toggle('dim',!!q&&!m);if(m){n++;gh++}});g.hidden=!!q&&!gh});
  sk.classList.toggle('filtered',!!q);$('#skn').textContent=q?(n?`${n} match${n>1?'es':''}`:'No match. Ask me in the box below.'):all.length+' skills'}}

/* Header shrinks after the hero */
const hdr=$('header');addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>40),{passive:true});

}catch(err){console.error(err);app.innerHTML=`<div class="loading"><div class="err"><b>Something went wrong showing this page.</b><p>${esc(err.message)}</p><p>Make sure every file from the latest zip is uploaded, then hard refresh (Ctrl+Shift+R).</p></div></div>`}
})();

(function(){const root=document.documentElement;try{const t=localStorage.getItem('vb-theme');if(t)root.dataset.theme=t}catch(e){}
 document.getElementById('themeBtn').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;root.dataset.theme=d?'light':'dark';try{localStorage.setItem('vb-theme',root.dataset.theme)}catch(e){}}})();
