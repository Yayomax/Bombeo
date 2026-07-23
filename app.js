/* ============================================================
   BOMBEO — lógica compartida (multi-página)
   ============================================================ */
(function(){
'use strict';
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const prefersReduced = ()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- DATOS ---------------- */
const conceptos = [
  {t:"Tensión mecánica", tag:"El motor principal", d:"El principal impulsor del crecimiento muscular. Se produce cuando el músculo genera fuerza contra una resistencia significativa a lo largo de un rango de movimiento completo. No es el ardor ni el cansancio: es la carga."},
  {t:"Sobrecarga progresiva", tag:"Lo que sostiene el progreso", d:"El músculo se adapta a lo que se le exige. Si la exigencia no aumenta con el tiempo, la adaptación se detiene. Aumentar peso, repeticiones o calidad de ejecución sesión a sesión es lo que sostiene el progreso."},
  {t:"Volumen efectivo", tag:"10 a 20 series semanales", d:"El volumen se mide en series semanales por grupo muscular llevadas cerca del fallo. La mayoría de los grupos responden bien entre 10 y 20 series semanales. Menos subestimula; mucho más acumula fatiga sin retorno proporcional."},
  {t:"Frecuencia", tag:"Por qué full body", d:"Repartir el volumen semanal en dos o tres sesiones por grupo permite mantener mejor calidad en cada serie y mantiene la síntesis proteica elevada más veces por semana. Por eso la rutina es full body y no una división por partes."},
  {t:"Proximidad al fallo", tag:"0 a 3 reps en reserva", d:"Las series deben acercarse al fallo muscular para ser efectivas — típicamente dejando entre 0 y 3 repeticiones en reserva. Una serie muy alejada del fallo aporta poco estímulo."},
];

const distribucion = [
  { grupo:"Hombros",    series:18.0, pct:14.6, frec:"4×" },
  { grupo:"Espalda",    series:16.5, pct:13.4, frec:"5×" },
  { grupo:"Pecho",      series:15.0, pct:12.2, frec:"5×" },
  { grupo:"Tríceps",    series:13.0, pct:10.6, frec:"3×" },
  { grupo:"Bíceps",     series:12.5, pct:10.2, frec:"3×" },
  { grupo:"Glúteos",    series:11.5, pct: 9.3, frec:"2×" },
  { grupo:"Cuádriceps", series:11.0, pct: 8.9, frec:"4×" },
  { grupo:"Core",       series:10.0, pct: 8.1, frec:"2×" },
  { grupo:"Isquios",    series: 9.5, pct: 7.7, frec:"3×" },
  { grupo:"Gemelos",    series: 6.0, pct: 4.9, frec:"2×" },
];
const colores = ["#B8F04A","#A9E24A","#9AD44E","#8CC658","#7FBA62","#74AE6C","#6AA374","#63997C","#5C8F82","#557F7B"];
const frecuencia = [
  ["Pecho","5×"],["Espalda","5×"],["Cuádriceps","4×"],["Hombros","4×"],
  ["Isquios","3×"],["Bíceps","3×"],["Tríceps","3×"],["Core","2×"],
  ["Gemelos","2×"],["Glúteos","2×"],
];

const dias = [
  {n:1, ejercicios:[
    {e:"Sentadilla trasera",sr:"3 × 6-8",rir:"2",d:"3 min"},
    {e:"Press banca plano",sr:"3 × 6-8",rir:"2",d:"3 min"},
    {e:"Remo con barra",sr:"3 × 8-10",rir:"2",d:"2-3 min"},
    {e:"Press militar con mancuernas",sr:"2 × 8-10",rir:"2",d:"2 min"},
    {e:"Curl femoral acostado",sr:"2 × 10-12",rir:"1",d:"2 min"},
    {e:"Elevaciones laterales",sr:"2 × 12-15",rir:"1",d:"90 s"},
    {e:"Plancha con peso",sr:"3 × 30-45 s",rir:"—",d:"60 s"},
  ]},
  {n:2, ejercicios:[
    {e:"Peso muerto rumano",sr:"3 × 8-10",rir:"2",d:"3 min"},
    {e:"Dominadas o jalón al pecho",sr:"3 × 6-10",rir:"2",d:"3 min"},
    {e:"Press inclinado con mancuernas",sr:"3 × 8-10",rir:"2",d:"2-3 min"},
    {e:"Prensa 45°",sr:"2 × 10-12",rir:"1-2",d:"2 min"},
    {e:"Curl de bíceps con barra",sr:"2 × 8-12",rir:"1",d:"90 s"},
    {e:"Extensión de tríceps en polea",sr:"2 × 10-12",rir:"1",d:"90 s"},
    {e:"Gemelos de pie",sr:"3 × 10-15",rir:"1",d:"90 s"},
  ]},
  {n:3, ejercicios:[
    {e:"Press banca inclinado con barra",sr:"3 × 6-8",rir:"2",d:"3 min"},
    {e:"Remo sentado en polea",sr:"3 × 10-12",rir:"2",d:"2-3 min"},
    {e:"Sentadilla búlgara",sr:"3 × 8-10",rir:"2",d:"2-3 min"},
    {e:"Hip thrust",sr:"3 × 8-12",rir:"1-2",d:"2-3 min"},
    {e:"Elevaciones laterales",sr:"3 × 12-15",rir:"1",d:"90 s"},
    {e:"Face pull",sr:"2 × 15-20",rir:"1",d:"90 s"},
    {e:"Rueda abdominal",sr:"3 × 8-12",rir:"1",d:"90 s"},
  ]},
  {n:4, ejercicios:[
    {e:"Peso muerto convencional",sr:"3 × 4-6",rir:"2-3",d:"3-4 min"},
    {e:"Press militar con barra",sr:"3 × 6-8",rir:"2",d:"3 min"},
    {e:"Jalón agarre neutro",sr:"3 × 10-12",rir:"2",d:"2-3 min"},
    {e:"Aperturas en polea",sr:"2 × 12-15",rir:"1",d:"90 s"},
    {e:"Curl martillo",sr:"2 × 10-12",rir:"1",d:"90 s"},
    {e:"Fondos o press cerrado",sr:"2 × 8-12",rir:"1-2",d:"2 min"},
    {e:"Gemelos sentado",sr:"3 × 12-15",rir:"1",d:"90 s"},
  ]},
  {n:5, ejercicios:[
    {e:"Hack squat o prensa",sr:"3 × 8-12",rir:"1-2",d:"2-3 min"},
    {e:"Remo con mancuerna unilateral",sr:"3 × 10-12",rir:"2",d:"2 min"},
    {e:"Press plano con mancuernas",sr:"3 × 8-12",rir:"1-2",d:"2-3 min"},
    {e:"Puente de glúteo o patada en polea",sr:"3 × 12-15",rir:"1",d:"2 min"},
    {e:"Elevaciones laterales en polea",sr:"3 × 12-20",rir:"1",d:"90 s"},
    {e:"Curl predicador",sr:"2 × 10-12",rir:"1",d:"90 s"},
    {e:"Extensión de tríceps sobre cabeza",sr:"2 × 10-15",rir:"1",d:"90 s"},
  ]},
];

/* ---------------- NAVBAR: menú mobile + submenú ---------------- */
function initNav(){
  const toggle = $('.nav-toggle');
  const links = $('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', ()=>{
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true':'false');
    });
    links.addEventListener('click', e=>{ if(e.target.tagName==='A') links.classList.remove('open'); });
    document.addEventListener('click', e=>{
      if(!links.contains(e.target) && !toggle.contains(e.target)) links.classList.remove('open');
    });
  }
}

/* ---------------- reveal + stagger ---------------- */
function initReveal(){
  const els = $$('.reveal, .stagger');
  if(!els.length) return;
  if(prefersReduced()){ els.forEach(el=>el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const el = en.target;
        if(el.classList.contains('stagger')){
          Array.from(el.children).forEach((child,i)=>{ child.style.transitionDelay = (i*55)+'ms'; });
        }
        el.classList.add('in');
        io.unobserve(el);
      }
    });
  },{threshold:0.12});
  els.forEach(el=>io.observe(el));
}

/* ---------------- MÉTODO: conceptos ---------------- */
function renderConceptos(){
  const cg = $('#concepts');
  if(!cg) return;
  conceptos.forEach((c,i)=>{
    const el = document.createElement('div');
    el.className = 'concept';
    el.innerHTML = `<div class="idx">${String(i+1).padStart(2,'0')}</div>
      <h3>${c.t}</h3><p>${c.d}</p><span class="tag">${c.tag}</span>`;
    cg.appendChild(el);
  });
}

/* ---------------- VOLUMEN: donut + leyenda + frecuencia ---------------- */
function renderVolumen(){
  const segG = $('#donut-segments');
  if(!segG) return;
  const R = 78, C = 2*Math.PI*R;
  const legend = $('#legend');
  const center = $('#donut-center');
  const centerDefault = {big:"100%", cap:"Del volumen semanal"};
  let offset = 0;
  const circles = [];

  distribucion.forEach((d,i)=>{
    const len = (d.pct/100)*C;
    const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx","100"); c.setAttribute("cy","100"); c.setAttribute("r",R);
    c.setAttribute("stroke",colores[i]);
    c.setAttribute("stroke-dasharray",`${len} ${C-len}`);
    c.setAttribute("stroke-dashoffset", -offset);
    c.dataset.i = i;
    segG.appendChild(c); circles.push(c); offset += len;

    const b = document.createElement('button');
    b.className = 'leg-item'; b.dataset.i = i;
    b.innerHTML = `<span class="dot" style="background:${colores[i]}"></span>
      <span class="txt"><span class="g">${d.grupo}</span><span class="s">${d.series} series · ${d.frec} por semana</span></span>
      <span class="p">${d.pct}%</span>`;
    legend.appendChild(b);
  });

  function highlight(i){
    circles.forEach(c=>{c.classList.toggle('active',+c.dataset.i===i);c.classList.toggle('dim',+c.dataset.i!==i);});
    const d = distribucion[i];
    center.classList.add('show-detail');
    center.querySelector('.big').textContent = d.pct+"%";
    center.querySelector('.cap').textContent = `${d.grupo} · ${d.series} series · ${d.frec}`;
  }
  function clear(){
    circles.forEach(c=>{c.classList.remove('active');c.classList.remove('dim');});
    center.classList.remove('show-detail');
    center.querySelector('.big').textContent = centerDefault.big;
    center.querySelector('.cap').textContent = centerDefault.cap;
  }
  function bind(el){
    const i = +el.dataset.i;
    el.addEventListener('mouseenter',()=>highlight(i));
    el.addEventListener('mouseleave',clear);
    el.addEventListener('focus',()=>highlight(i));
    el.addEventListener('blur',clear);
    el.addEventListener('click',()=>highlight(i));
  }
  circles.forEach(bind);
  $$('.leg-item',legend).forEach(bind);

  const ftb = $('#freq-table tbody');
  if(ftb) frecuencia.forEach(([g,f])=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${g}</td><td><span class="fq">${f}</span></td>`;
    ftb.appendChild(tr);
  });

  // animación de dibujado al entrar en viewport
  if(!prefersReduced()){
    circles.forEach(c=>{ c.dataset.dash = c.getAttribute('stroke-dasharray'); c.setAttribute('stroke-dasharray',`0 ${C}`); c.style.transition='stroke-dasharray 1s var(--ease-out, cubic-bezier(.16,1,.3,1))'; });
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if(en.isIntersecting){ circles.forEach((c,idx)=>setTimeout(()=>c.setAttribute('stroke-dasharray',c.dataset.dash),80*idx)); io.disconnect(); } });
    },{threshold:0.3});
    io.observe($('.donut-wrap'));
  }
}

/* ---------------- RUTINA: 10 semanas + tabs ---------------- */
function renderRutina(){
  const tabsEl = $('#tabs');
  if(!tabsEl) return;
  const NUM_WEEKS = 9, DELOAD_WEEK = NUM_WEEKS+1;
  const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
  const panelsEl = $('#panels');
  const navWeeksEl = $('#nav-weeks');
  const state = { week:1 };

  function parseSR(sr){
    const m = sr.match(/^(\d+)\s*×\s*(\d+)(?:-(\d+))?(\s*s)?$/);
    return {series:+m[1], repMin:+m[2], repMax:m[3]?+m[3]:+m[2], unit:m[4]?' s':''};
  }
  function parseRIR(rir){
    if(rir==='—') return null;
    const m = rir.match(/^(\d+)(?:-(\d+))?$/);
    return {low:+m[1], high:m[2]?+m[2]:+m[1]};
  }
  const fmtRIR = (l,h)=> l===h ? String(l) : `${l}-${h}`;

  function computeWeek(base, week){
    const {series,repMin,repMax,unit} = parseSR(base.sr);
    const rr = parseRIR(base.rir);
    if(week <= NUM_WEEKS){
      const t = NUM_WEEKS>1 ? (week-1)/(NUM_WEEKS-1) : 1;
      const repOut = Math.round(repMin + (repMax-repMin)*t);
      let rirOut = '—';
      if(rr){ const delta = Math.round(2 - 2*t); rirOut = fmtRIR(clamp(rr.low+delta,0,4), clamp(rr.high+delta,0,4)); }
      return {sr:`${series} × ${repOut}${unit}`, rir:rirOut, d:base.d};
    }
    const seriesOut = Math.max(1, Math.round(series/2));
    const rirOut = rr ? fmtRIR(clamp(rr.low+2,0,4), clamp(rr.high+2,0,4)) : '—';
    return {sr:`${seriesOut} × ${repMin}${unit}`, rir:rirOut, d:base.d};
  }

  // pills de semana en navbar
  const pills = [];
  for(let w=1; w<=DELOAD_WEEK; w++){
    const b = document.createElement('button');
    b.className = 'week-pill' + (w===DELOAD_WEEK ? ' deload':'');
    b.type = 'button'; b.dataset.week = w;
    b.setAttribute('aria-pressed', w===1 ? 'true':'false');
    b.textContent = w===DELOAD_WEEK ? 'DESCARGA' : `SEM ${w}`;
    b.title = w===DELOAD_WEEK ? 'Semana de descarga' : `Semana ${w} de ${NUM_WEEKS}`;
    b.addEventListener('click', ()=>{ setWeek(w); $('#rutina').scrollIntoView({behavior:prefersReduced()?'auto':'smooth',block:'start'}); });
    navWeeksEl.appendChild(b); pills.push(b);
  }

  function updateHead(){
    const badge = $('#week-badge'), sub = $('#week-sub'), prog = $('#week-progress');
    if(state.week===DELOAD_WEEK){
      badge.textContent='DESCARGA'; badge.classList.add('deload');
      sub.textContent='Cerrás el programa con la mitad de las series y cargas más livianas. Llegás recuperado, no exprimido.';
    } else {
      badge.textContent=`SEMANA ${state.week}`; badge.classList.remove('deload');
      sub.textContent = state.week===1
        ? 'Arrancás el programa: técnica primero, lejos del fallo y en la parte baja del rango de reps.'
        : `Semana ${state.week} de ${NUM_WEEKS}: sumás reps y te acercás un poco más al fallo, sin pasar nunca el RIR de la tabla.`;
    }
    prog.innerHTML='';
    for(let w=1; w<=DELOAD_WEEK; w++){
      const dot = document.createElement('div');
      dot.className = 'week-dot' + (w===DELOAD_WEEK?' deload-dot':'') + (w<=state.week?' filled':'');
      prog.appendChild(dot);
    }
  }

  // tabs + paneles
  dias.forEach((dia,idx)=>{
    const tab = document.createElement('button');
    tab.className='tab'; tab.setAttribute('role','tab'); tab.id=`tab-${dia.n}`;
    tab.setAttribute('aria-controls',`panel-${dia.n}`);
    tab.setAttribute('aria-selected', idx===0?'true':'false');
    tab.tabIndex = idx===0?0:-1;
    tab.innerHTML = `<span class="big">Día ${dia.n}</span>`;
    tabsEl.appendChild(tab);
    const panel = document.createElement('div');
    panel.className='day-panel'; panel.id=`panel-${dia.n}`;
    panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby',`tab-${dia.n}`);
    if(idx!==0) panel.hidden = true;
    panelsEl.appendChild(panel);
  });

  function renderPanels(){
    dias.forEach(dia=>{
      const panel = $(`#panel-${dia.n}`);
      const comp = dia.ejercicios.map(x=>({e:x.e, ...computeWeek(x,state.week)}));
      const rows = comp.map(x=>`<tr><td class="name">${x.e}</td><td class="sr">${x.sr}</td><td class="num-col">${x.rir}</td><td class="num-col">${x.d}</td></tr>`).join('');
      const cards = comp.map(x=>`<div class="ex-card"><div class="name">${x.e}</div><div class="row">
        <div class="cell"><span class="k">Series × Reps</span><span class="v">${x.sr}</span></div>
        <div class="cell"><span class="k">RIR</span><span class="v">${x.rir}</span></div>
        <div class="cell"><span class="k">Descanso</span><span class="v small">${x.d}</span></div></div></div>`).join('');
      panel.innerHTML = `<table class="ex-table"><thead><tr><th>Ejercicio</th><th>Series × Reps</th><th>RIR</th><th>Descanso</th></tr></thead><tbody>${rows}</tbody></table><div class="ex-cards">${cards}</div>`;
    });
  }

  function setWeek(w){
    if(w===state.week) return;
    state.week = w;
    pills.forEach(p=>p.setAttribute('aria-pressed', +p.dataset.week===w?'true':'false'));
    updateHead();
    if(prefersReduced()){ renderPanels(); return; }
    panelsEl.classList.add('swapping');
    setTimeout(()=>{ renderPanels(); panelsEl.classList.remove('swapping'); }, 150);
  }

  renderPanels(); updateHead();

  const tabButtons = $$('.tab',tabsEl);
  function selectTab(i){
    tabButtons.forEach((t,j)=>{
      const on = i===j;
      t.setAttribute('aria-selected', on?'true':'false');
      t.tabIndex = on?0:-1;
      $(`#panel-${dias[j].n}`).hidden = !on;
    });
  }
  tabButtons.forEach((t,i)=>{
    t.addEventListener('click',()=>selectTab(i));
    t.addEventListener('keydown',e=>{
      let ni=null;
      if(e.key==='ArrowRight'||e.key==='ArrowDown') ni=(i+1)%tabButtons.length;
      else if(e.key==='ArrowLeft'||e.key==='ArrowUp') ni=(i-1+tabButtons.length)%tabButtons.length;
      else if(e.key==='Home') ni=0;
      else if(e.key==='End') ni=tabButtons.length-1;
      if(ni!==null){e.preventDefault();selectTab(ni);tabButtons[ni].focus();}
    });
  });
}

/* ---------------- init ---------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  initNav();
  renderConceptos();
  renderVolumen();
  renderRutina();
  initReveal();
});
})();
