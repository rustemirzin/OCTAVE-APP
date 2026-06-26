/* ============================================================
   O.C.T.A.V.E. — interactive mobile demo
   Vanilla JS. No build step. Fully offline.
   ============================================================ */
'use strict';

/* ---------- tiny helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const app = $('#app');
const tabbar = $('#tabbar');
const device = $('#device');
let _uid = 0;
const uid = () => 'g' + (++_uid);

/* ============================================================
   ICONS  (24x24 feather-style strokes unless noted)
   ============================================================ */
const I = {
  bell:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>`,
  gear:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/></svg>`,
  back:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
  chev:`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  filter:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>`,
  star:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.2l1.2-6.6L2.5 9l6.6-.9Z"/></svg>`,
  calendar:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>`,
  pin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  users:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1A4 4 0 0 1 16 11"/></svg>`,
  plus:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  chat:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.7L3 21l1.8-5.4A8.4 8.4 0 1 1 21 11.5Z"/></svg>`,
  heart:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.7-10-9.3C.4 8.4 2 4.8 5.4 4.4 7.5 4.1 9.3 5.2 12 8c2.7-2.8 4.5-3.9 6.6-3.6C22 4.8 23.6 8.4 22 11.7 19.5 16.3 12 21 12 21Z"/></svg>`,
  x:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  send:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
  edit:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  swap:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4 3 8l4 4"/><path d="M3 8h14a4 4 0 0 1 0 8h-2"/></svg>`,
  bulb:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/></svg>`,
  shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>`,
  trend:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>`,
  wallet:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1"/><path d="M21 12h-5a2 2 0 0 0 0 4h5v-4Z"/><path d="M18 7V5a2 2 0 0 0-2.5-1.9L4.6 5.8A2 2 0 0 0 3 7.7"/></svg>`,
  book:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>`,
  gift:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9"/><path d="M12 8S11 2 8 2a2.5 2.5 0 0 0 0 6Zm0 0s1-6 4-6a2.5 2.5 0 0 1 0 6Z"/></svg>`,
  cap:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m22 9-10-5L2 9l10 5 10-5Z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg>`,
  life:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m4.9 4.9 4.6 4.6m5 5 4.6 4.6M19.1 4.9l-4.6 4.6m-5 5-4.6 4.6"/></svg>`,
  logout:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg>`,
  target:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>`,
  bookmark:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/></svg>`,
  trophy:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M6 4h12v5a6 6 0 0 1-12 0Z"/><path d="M9 20h6M10 16v4M14 16v4"/></svg>`,
  doc:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>`,
  rocket:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 .8Z"/><path d="M12 15 9 12c1-4 4-8 9-9 1 5-3 8-7 9Z"/><path d="M15 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/></svg>`,
  globe:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>`,
  briefcase:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="13" rx="2.5"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2.5 12h19"/></svg>`,
  copy:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  // crown for ranks
  crown:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 7l4 4 5-7 5 7 4-4-1.5 12h-15L3 7Z"/></svg>`,
  graph:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 3-3 3 3 5-6"/></svg>`,
  // tab icons
  t_home:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/></svg>`,
  t_people:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14.5a4.6 4.6 0 0 1 4.5 5"/></svg>`,
  t_msg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.7L3 21l1.8-5.4A8.4 8.4 0 1 1 21 11.5Z"/></svg>`,
  t_deal:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="13" rx="2.5"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v3M9.5 13.5h5"/></svg>`,
  t_profile:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg>`,
  menu:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
};

/* ---------- rank badge ---------- */
function rankBadge(text){ return `<span class="rank">${I.crown}${esc(text)}</span>`; }
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* ============================================================
   SVG ASSET GENERATORS (offline)
   ============================================================ */
const AV_PALETTE = [
  ['#46578A','#222B47'], ['#6B4A86','#2E1E45'], ['#8A6A46','#3C2A19'],
  ['#3E8A77','#163C33'], ['#8A4659','#3C1925'], ['#4A4A55','#23232B'],
  ['#5E7A46','#28371C'], ['#467D8A','#173138'],
];
function hash(str){ let h=0; for(let i=0;i<str.length;i++){ h=(h*31+str.charCodeAt(i))>>>0; } return h; }
function initials(name){
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0]||'') + (p[1]?.[0]||'')).toUpperCase();
}
function avatar(person, cls='av-md'){
  const name = typeof person === 'string' ? person : person.name;
  const seed = typeof person === 'string' ? person : (person.id || person.name);
  const pair = AV_PALETTE[hash(seed) % AV_PALETTE.length];
  const id = uid();
  const fs = cls.includes('xl')?34 : cls.includes('lg')?20 : cls.includes('sm')?14 : 17;
  return `<div class="av ${cls}">
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${pair[0]}"/><stop offset="1" stop-color="${pair[1]}"/>
      </linearGradient></defs>
      <rect width="100" height="100" fill="url(#${id})"/>
      <circle cx="50" cy="40" r="17" fill="rgba(255,255,255,.16)"/>
      <path d="M22 92c2-17 13-26 28-26s26 9 28 26Z" fill="rgba(255,255,255,.16)"/>
      <text x="50" y="${cls.includes('xl')?'56':'54'}" font-size="${fs}" font-weight="700" fill="rgba(255,255,255,.92)" text-anchor="middle" font-family="Manrope,sans-serif">${esc(initials(name))}</text>
    </svg></div>`;
}

const COVERS = {
  dinner:['#7A5A2A','#1A1206','#E7B84B'],
  strategy:['#2A456E','#0B1424','#5AA9FF'],
  forum:['#4A2A6E','#170B24','#B07BE8'],
  network:['#6E2A45','#240B14','#FF7BA0'],
  city:['#2A5E6E','#0B1E24','#5AD0E8'],
};
function cover(theme){
  const c = COVERS[theme] || COVERS.dinner;
  const id = uid();
  // simple skyline
  const bars = [16,28,20,40,26,52,34,46,22,38,18,30].map((h,i)=>{
    const w = 100/12;
    return `<rect x="${i*w}" y="${100-h}" width="${w-1}" height="${h}" fill="rgba(0,0,0,.28)"/>`;
  }).join('');
  return `<svg viewBox="0 0 320 130" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/>
    </linearGradient></defs>
    <rect width="320" height="130" fill="url(#${id})"/>
    <circle cx="250" cy="36" r="40" fill="${c[2]}" opacity="0.18"/>
    <circle cx="250" cy="36" r="22" fill="${c[2]}" opacity="0.22"/>
    <g transform="translate(0,42) scale(3.2,0.68)">${bars}</g>
  </svg>`;
}
/* tall portrait for recommendation hero */
function portrait(person){
  const pair = AV_PALETTE[hash(person.id||person.name) % AV_PALETTE.length];
  const id = uid();
  return `<svg viewBox="0 0 360 300" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${pair[0]}"/><stop offset="1" stop-color="${pair[1]}"/>
    </linearGradient></defs>
    <rect width="360" height="300" fill="url(#${id})"/>
    <circle cx="180" cy="120" r="62" fill="rgba(255,255,255,.14)"/>
    <path d="M60 320c8-58 50-92 120-92s112 34 120 92Z" fill="rgba(255,255,255,.14)"/>
    <text x="180" y="138" font-size="64" font-weight="800" fill="rgba(255,255,255,.9)" text-anchor="middle" font-family="Manrope,sans-serif">${esc(initials(person.name))}</text>
  </svg>`;
}

/* ============================================================
   DATA
   ============================================================ */
const ME = {
  id:'me', name:'Александр Петров', rank:'Золотой участник', role:'Капитан', city:'Казань',
  rating:870,
  about:'Предприниматель, инвестор, ментор. Помогаю запускать и масштабировать бизнесы в сфере технологий.',
  aboutMore:'15 лет в технологическом бизнесе. Основатель двух компаний в сферах SaaS и финтех, выход на международные рынки. В сообществе — капитан форум-группы №3, наставник для предпринимателей ранней стадии. Активно инвестирую в проекты на стыке технологий и образования.',
  fields:['Технологии','Инвестиции','Менторство','SaaS'],
};

const PEOPLE = [
  { id:'voronov', name:'Дмитрий Воронов', role:'Инвестор', city:'Дубай', field:'Инвестиции · Недвижимость · FinTech',
    rating:950, match:90, online:true,
    seek:'Партнёров для новых инвестиций в Европе и Азии',
    goals:['Масштабирование бизнеса','Выход на новые рынки','Инвестиции'],
    about:'Частный инвестор и партнёр венчурного фонда. Более 40 сделок в недвижимости и технологиях. Помогаю с привлечением капитала и выходом на рынки Ближнего Востока.',
    tags:['Инвестиции','Недвижимость','FinTech'] },
  { id:'smirnova', name:'Екатерина Смирнова', role:'CEO', city:'Казань', field:'Маркетинг · Стратегия',
    rating:880, match:84, online:false,
    seek:'Сильную команду роста и партнёрства в e-commerce',
    goals:['Кратный рост выручки','Сильный бренд'],
    about:'CEO маркетингового агентства полного цикла. Построила бренды для 30+ компаний. Эксперт по позиционированию и стратегии роста.',
    tags:['Маркетинг','Стратегия','Бренд'] },
  { id:'halilov', name:'Артур Халилов', role:'Предприниматель', city:'Стамбул', field:'E-commerce · Логистика',
    rating:830, match:79, online:true,
    seek:'Поставщиков и партнёров для трансграничной торговли',
    goals:['Логистика в ЕС','Новые поставщики'],
    about:'Основатель e-commerce холдинга с оборотом 20+ млн $. Выстраиваю трансграничную логистику между Турцией, ЕС и СНГ.',
    tags:['E-commerce','Логистика','Импорт'] },
  { id:'koval', name:'Анна Коваль', role:'Финансовый директор', city:'Лондон', field:'Финансы · Инвестиции',
    rating:810, match:76, online:false,
    seek:'Проекты для структурирования и привлечения финансирования',
    goals:['M&A сделки','Структурирование'],
    about:'CFO с опытом в private equity. Структурирую сделки, привлекаю долговое и долевое финансирование для растущих компаний.',
    tags:['Финансы','PE','M&A'] },
  { id:'nikitin', name:'Максим Никитин', role:'Технологический эксперт', city:'Таллин', field:'IT · Продукты',
    rating:790, match:72, online:true,
    seek:'Сооснователя по продукту для AI-стартапа',
    goals:['Запуск AI-продукта','Сильная команда'],
    about:'CTO и архитектор продуктов. Запустил 5 SaaS-продуктов. Сейчас строю AI-инструменты для предпринимателей.',
    tags:['IT','AI','Продукты'] },
  { id:'sokolov', name:'Игорь Соколов', role:'Предприниматель', city:'Казань', field:'Производство · Опт',
    rating:760, match:92, online:true,
    seek:'Дистрибьюторов в регионах и партнёров по производству',
    goals:['Расширение производства','Дистрибуция'],
    about:'Владелец производственной компании. Наставник в форум-группе №3. Помогаю выстраивать операционные процессы и масштабировать производство.',
    tags:['Производство','Опт','Операции'] },
  { id:'lebedeva', name:'Мария Лебедева', role:'Маркетинг-директор', city:'Казань', field:'Маркетинг · PR',
    rating:805, match:88, online:false,
    seek:'Амбициозные бренды для запуска и кампаний',
    goals:['Запуск брендов','Сильный PR'],
    about:'CMO и капитан форум-группы №7. 12 лет в маркетинге и PR крупных брендов.',
    tags:['Маркетинг','PR','Бренд'] },
  { id:'romanov', name:'Алексей Романов', role:'Девелопер', city:'Сочи', field:'Недвижимость · Девелопмент',
    rating:740, match:70, online:false,
    seek:'Соинвесторов в курортную недвижимость',
    goals:['Новые объекты','Соинвестиции'],
    about:'Девелопер курортной недвижимости на юге России. Реализовал 8 проектов.',
    tags:['Недвижимость','Девелопмент'] },
];
const byId = id => id==='me' ? ME : PEOPLE.find(p=>p.id===id);

const EVENTS = [
  { id:'e1', theme:'dinner', title:'Бизнес-ужин O.C.T.A.V.E.', city:'Казань', loc:'Казань, Корстон', date:'15 мая, 19:00',
    badge:'Закрытое', when:'upcoming', going:42, cap:50,
    desc:'Камерный ужин для участников уровня «Золото» и выше. Нетворкинг, разбор кейсов и неформальное общение в кругу сильных предпринимателей.' },
  { id:'e2', theme:'strategy', title:'Стратегическая сессия Капитанов', city:'Казань', loc:'Казань, Офис OCTAVE', date:'22 мая, 14:00',
    badge:'Для капитанов', when:'upcoming', going:18, cap:24,
    desc:'Рабочая сессия капитанов форум-групп: обмен практиками управления группами, постановка целей квартала.' },
  { id:'e3', theme:'forum', title:'Международный форум O.C.T.A.V.E.', city:'Дубай, ОАЭ', loc:'Дубай, ОАЭ', date:'5 июня, 10:00',
    badge:'Флагман', when:'upcoming', going:210, cap:300,
    desc:'Главное международное событие сообщества. Спикеры мирового уровня, инвест-питчи, выход на рынки Ближнего Востока.' },
  { id:'e4', theme:'network', title:'Вечер знакомств в Санкт-Петербурге', city:'Санкт-Петербург', loc:'Санкт-Петербург', date:'12 июня, 19:00',
    badge:'Нетворкинг', when:'upcoming', going:64, cap:80,
    desc:'Вечер целевых знакомств: ИИ подберёт вам 5 релевантных участников для личного общения.' },
  { id:'e5', theme:'city', title:'Мастермайнд «Рост x10»', city:'Казань', loc:'Казань, IT-парк', date:'2 апреля, 19:00',
    badge:'Прошло', when:'past', going:30, cap:30,
    desc:'Групповой разбор стратегий кратного роста. Запись доступна в базе знаний.' },
];

const DEALS = [
  { id:'d1', no:'#D-2024-0438', with:'voronov', status:'active', statusLabel:'Активна',
    amount:'$100 000', amountLabel:'Инвестиции в проект', share:'10%', stage:'Разработка MVP',
    steps:[
      {t:'Согласование условий', s:'done', when:'15 апр'},
      {t:'Резервирование средств', s:'done', when:'18 апр'},
      {t:'Выполнение этапа 1', s:'active', when:'В процессе'},
      {t:'Выполнение этапа 2', s:'pending', when:'Ожидает'},
      {t:'Завершение сделки', s:'pending', when:'Ожидает'},
    ] },
  { id:'d2', no:'#D-2024-0451', with:'halilov', status:'review', statusLabel:'На согласовании',
    amount:'$45 000', amountLabel:'Поставка партии товара', share:'—', stage:'Согласование условий',
    steps:[
      {t:'Создание сделки', s:'done', when:'20 мая'},
      {t:'Согласование условий', s:'active', when:'В процессе'},
      {t:'Резервирование средств', s:'pending', when:'Ожидает'},
      {t:'Поставка', s:'pending', when:'Ожидает'},
      {t:'Завершение сделки', s:'pending', when:'Ожидает'},
    ] },
  { id:'d3', no:'#D-2024-0399', with:'smirnova', status:'done', statusLabel:'Выполнена',
    amount:'₽ 600 000', amountLabel:'Маркетинговая кампания', share:'—', stage:'Завершено',
    steps:[
      {t:'Согласование условий', s:'done', when:'2 мар'},
      {t:'Резервирование средств', s:'done', when:'4 мар'},
      {t:'Выполнение работ', s:'done', when:'28 мар'},
      {t:'Приёмка результата', s:'done', when:'30 мар'},
      {t:'Завершение сделки', s:'done', when:'31 мар'},
    ] },
];
const dealStatusPill = d => ({
  active:'green', review:'gold', done:'blue'
}[d.status] || '');

const CHATS = [
  { id:'c1', who:'sokolov', last:'Отлично! Давайте созвонимся', time:'14:20', unread:2, type:'dm',
    msgs:[
      {t:'Александр, привет! Видел твой профиль — впечатляет.', mine:false, time:'13:40'},
      {t:'Привет, Игорь! Спасибо. ИИ порекомендовал тебя — у нас совпадают цели по производству.', mine:true, time:'13:52'},
      {t:'Точно. Я как раз ищу партнёров по дистрибуции в регионах.', mine:false, time:'14:05'},
      {t:'Давай обсудим. У меня есть выходы на сети в трёх городах.', mine:true, time:'14:12'},
      {t:'Отлично! Давайте созвонимся', mine:false, time:'14:20'},
    ] },
  { id:'c2', who:'lebedeva', last:'Спасибо за рекомендацию!', time:'Вчера', unread:0, type:'dm',
    msgs:[
      {t:'Мария, рекомендую тебе Екатерину — сильный стратег по бренду.', mine:true, time:'Вчера 11:10'},
      {t:'Спасибо за рекомендацию!', mine:false, time:'Вчера 11:30'},
    ] },
  { id:'c3', name:'Форум-группа №3', last:'Александр: Напомню о встрече', time:'Вчера', unread:0, type:'group', members:8,
    msgs:[
      {t:'Коллеги, встреча группы 16 мая в 19:00, офис OCTAVE.', mine:true, time:'Вчера 18:00', author:'Александр'},
      {t:'Буду! Подготовлю отчёт по целям квартала.', mine:false, time:'Вчера 18:20', author:'Игорь Соколов'},
      {t:'Александр: Напомню о встрече', mine:false, time:'Вчера 21:00', author:'Александр'},
    ] },
  { id:'c4', name:'Капитаны Казани', last:'Дмитрий: Новый участник в группе', time:'12 мая', unread:0, type:'group', members:14,
    msgs:[
      {t:'Добавил нового капитана в чат. Знакомьтесь!', mine:false, time:'12 мая', author:'Дмитрий Воронов'},
      {t:'Дмитрий: Новый участник в группе', mine:false, time:'12 мая', author:'Дмитрий Воронов'},
    ] },
  { id:'c5', who:'romanov', last:'Хорошо, договорились', time:'10 мая', unread:0, type:'dm',
    msgs:[
      {t:'Алексей, по объекту в Сочи — пришлю расчёты завтра.', mine:true, time:'10 мая'},
      {t:'Хорошо, договорились', mine:false, time:'10 мая'},
    ] },
];

const REQUESTS = [
  { id:'r1', author:'me', text:'Ищу партнёра в ОАЭ для запуска EdTech проекта', tags:['Партнёрство','EdTech','ОАЭ'], time:'2 дня назад' },
  { id:'r2', author:'voronov', text:'Нужен сильный маркетолог для финтех-продукта, бюджет есть', tags:['Маркетинг','FinTech'], time:'5 ч назад' },
  { id:'r3', author:'nikitin', text:'Ищу сооснователя по продукту для AI-стартапа', tags:['Сооснователь','AI'], time:'1 день назад' },
  { id:'r4', author:'halilov', text:'Ищу контакты надёжных логистов на маршруте Турция → ЕС', tags:['Логистика','Партнёрство'], time:'3 дня назад' },
];

const NOTIFS = [
  { id:'n1', ic:'heart', text:'<b>Дмитрий Воронов</b> ответил взаимностью на знакомство', time:'10 мин назад', fresh:true },
  { id:'n2', ic:'star', text:'Ваш рейтинг вырос до <b>870</b> — высокий уровень', time:'2 ч назад', fresh:true },
  { id:'n3', ic:'calendar', text:'Напоминание: <b>Бизнес-ужин O.C.T.A.V.E.</b> через 3 дня', time:'5 ч назад', fresh:false },
  { id:'n4', ic:'briefcase', text:'Сделка <b>#D-2024-0438</b> перешла в этап «Выполнение этапа 1»', time:'Вчера', fresh:false },
  { id:'n5', ic:'wallet', text:'Начислен инвестиционный доход <b>+25 300 ₽</b>', time:'Вчера', fresh:false },
  { id:'n6', ic:'users', text:'Встреча форум-группы №3 — <b>16 мая, 19:00</b>', time:'2 дня назад', fresh:false },
];

const FIN = {
  balance:'125 000 ₽', profit:'+25 300 ₽',
  items:[
    { ic:'shield', name:'Подписка', sub:'Активна до 15.08.2024', val:'', valClass:'pill green', pill:'Активна' },
    { ic:'wallet', name:'Ежемесячный взнос', sub:'Списание 15 числа', val:'10 000 ₽' },
    { ic:'briefcase', name:'Накопительная часть', sub:'Часть пая', val:'85 000 ₽' },
    { ic:'trend', name:'Инвестиционный доход', sub:'За период', val:'25 300 ₽', valClass:'g' },
    { ic:'gift', name:'Вознаграждение 1 уровня', sub:'За приглашённых', val:'12 500 ₽', valClass:'g' },
    { ic:'gift', name:'Вознаграждение 2 уровня', sub:'Сеть приглашений', val:'3 200 ₽', valClass:'g' },
  ]
};

const REP = {
  score:870, level:'Высокий уровень',
  chart:[ {m:'Дек',v:600},{m:'Янв',v:640},{m:'Фев',v:690},{m:'Мар',v:770},{m:'Апр',v:820},{m:'Май',v:870} ],
  metrics:[
    {ic:'shield', name:'Деловая надёжность', v:920},
    {ic:'users', name:'Социальный вклад', v:850},
    {ic:'heart', name:'Вовлечённость', v:880},
    {ic:'bulb', name:'Экспертность', v:890},
    {ic:'check', name:'Этичность', v:840},
  ]
};

const GOALS = [
  { title:'Масштабирование бизнеса на рынки Ближнего Востока', p:75 },
  { title:'Привлечь раунд инвестиций для нового проекта', p:45 },
  { title:'Запустить EdTech-направление с партнёром', p:20 },
  { title:'Провести 10 менторских сессий в квартале', p:60 },
];

const ACHIEVEMENTS = [
  { ic:'cap', name:'Капитан группы', sub:'Ведёт форум-группу №3', got:true },
  { ic:'users', name:'100 знакомств', sub:'Сеть из 100+ участников', got:true },
  { ic:'trophy', name:'Топ-10 рейтинга', sub:'Казань, Q2', got:true },
  { ic:'calendar', name:'10 мероприятий', sub:'Посетил 10 событий', got:true },
  { ic:'briefcase', name:'Первая сделка', sub:'Закрыта успешно', got:true },
  { ic:'rocket', name:'Наставник года', sub:'Ещё 2 сессии', got:false },
];

const FORUM = {
  my:{ id:'fg3', name:'Форум-группа №3', captain:'Александр Петров', mentor:'Игорь Соколов',
       members:8, cap:8, meetDate:'16 мая, 19:00', meetLoc:'Казань, Офис OCTAVE',
       people:['voronov','smirnova','sokolov','lebedeva','halilov','koval','nikitin'] },
  others:[
    { id:'fg7', name:'Форум-группа №7', captain:'Мария Лебедева', members:5, cap:8 },
    { id:'fg5', name:'Форум-группа №5', captain:'Дмитрий Воронов', members:8, cap:8 },
  ]
};

const KNOWLEDGE = [
  { ic:'rocket', name:'Трек: Масштабирование до 1 млрд ₽', sub:'8 модулей · по вашим целям', pill:'Рекомендовано' },
  { ic:'cap', name:'Курс капитана форум-группы', sub:'Управление группой 8–10 человек' },
  { ic:'briefcase', name:'Безопасные сделки внутри сообщества', sub:'Escrow, этапы, арбитраж' },
  { ic:'globe', name:'Выход на рынки Ближнего Востока', sub:'Разбор кейсов участников' },
  { ic:'doc', name:'Кодекс сообщества O.C.T.A.V.E.', sub:'Ценности, ранги, правила' },
];

const REF_LINK = 'octave.club/i/alexandr-petrov';

/* ============================================================
   APP STATE & ROUTER
   ============================================================ */
const TABS = [
  { id:'home',     label:'Главная',    icon:I.t_home },
  { id:'people',   label:'Люди',       icon:I.t_people },
  { id:'messages', label:'Сообщения',  icon:I.t_msg },
  { id:'deals',    label:'Сделки',     icon:I.t_deal },
  { id:'profile',  label:'Профиль',    icon:I.t_profile },
];
const TAB_ROOT = { home:'home', people:'people', messages:'messages', deals:'deals', profile:'profile' };

const state = {
  stack: [{ view:'onboarding' }],
  tab: 'home',
};
const ui = {
  msgTab:'chats', recTab:'foryou', eventTab:'upcoming', dealTab:'all',
  peopleQuery:'', recIndex:0, aboutOpen:false,
  swiped:{},          // recommendation decisions
  liked:{},           // bookmarked people
};

function topView(){ return state.stack[state.stack.length-1]; }

function nav(view, id, tab){
  if(tab) state.tab = tab;
  state.stack.push({ view, id });
  render();
}
function back(){
  if(state.stack.length>1){ state.stack.pop(); render(); }
}
function tab(id){
  state.tab = id;
  state.stack = [{ view: TAB_ROOT[id] }];
  render();
}
function rerender(){ render(); }

/* ---------- render ---------- */
function render(){
  const t = topView();
  const def = (VIEWS[t.view] || VIEWS.home)(t.id);
  app.innerHTML = def.html;
  app.scrollTop = 0;
  app.classList.toggle('no-scroll', !!def.noScroll);

  const hideTab = !!def.hideTab;
  tabbar.classList.toggle('hidden', hideTab);
  renderTabbar();
  if(def.mount) def.mount();
}

function renderTabbar(){
  tabbar.innerHTML = TABS.map(t=>`
    <button class="tab ${t.id===state.tab?'on':''}" onclick="OCT.tab('${t.id}')">
      ${t.icon}<span>${t.label}</span>
    </button>`).join('');
}

/* ---------- header helper ---------- */
function header(title, { back:showBack=false, action='', sub='' } = {}){
  return `<div class="app-header">
    ${showBack?`<button class="icon-btn back-btn" onclick="OCT.back()">${I.back}</button>`:''}
    <div style="flex:1"><h1>${esc(title)}</h1>${sub?`<div class="h-sub">${esc(sub)}</div>`:''}</div>
    ${action}
  </div>`;
}

/* ============================================================
   VIEWS
   ============================================================ */
const VIEWS = {};

/* ---------- onboarding ---------- */
VIEWS.onboarding = () => ({
  hideTab:true, noScroll:true,
  html:`<div class="onb">
    <div class="onb-glow"></div>
    <div class="onb-spacer"></div>
    <div class="onb-omega">Ω</div>
    <h1 class="onb-title">O.C.T.A.V.E.</h1>
    <p class="onb-tag">Сообщество сильных людей и возможностей</p>
    <div class="onb-spacer"></div>
    <div class="onb-dots"><i class="on"></i><i></i><i></i></div>
    <button class="btn btn-gold" onclick="OCT.enter()">Войти</button>
    <button class="btn btn-ghost" onclick="OCT.toast('Заявка на вступление — отдельный модуль воронки')">Стать участником</button>
  </div>`
});

/* ---------- HOME ---------- */
VIEWS.home = () => {
  const ev = EVENTS[0];
  const recs = [PEOPLE.find(p=>p.id==='sokolov'), PEOPLE.find(p=>p.id==='lebedeva')];
  const req = REQUESTS[0];
  return { html:`<div class="screen">
    ${header('Главная',{ action:`<button class="icon-btn badge" onclick="OCT.nav('notifications',null,'home')">${I.bell}</button>` })}

    <div class="hero card tap" onclick="OCT.tab('profile')">
      ${avatar(ME,'av-lg ring')}
      <div style="flex:1;min-width:0">
        <div class="h-name">${esc(ME.name)}</div>
        <div style="margin-top:5px">${rankBadge(ME.rank)}</div>
        <div class="h-meta">${esc(ME.role)} · ${esc(ME.city)}</div>
      </div>
      <div class="score-ring" style="--p:87"><b>${ME.rating}</b><small>рейтинг</small></div>
    </div>

    <div class="section-head"><h2>Ближайшее мероприятие</h2><a class="link" onclick="OCT.nav('events',null,'home')">Все</a></div>
    <div class="event-card tap" onclick="OCT.nav('event','${ev.id}','home')">
      <div class="event-cover">${cover(ev.theme)}<span class="pill gold ev-badge">${esc(ev.badge)}</span></div>
      <div class="event-body">
        <div class="ev-title">${esc(ev.title)} · ${esc(ev.city)}</div>
        <div class="event-meta">
          <span class="m">${I.calendar}${esc(ev.date)}</span>
          <span class="m">${I.pin}${esc(ev.loc)}</span>
        </div>
      </div>
    </div>

    <div class="section-head"><h2>Рекомендации для вас</h2><a class="link" onclick="OCT.nav('recommendations',null,'home')">Все</a></div>
    <div class="stack">
      ${recs.map(p=>`
        <div class="card pad tap" onclick="OCT.nav('person','${p.id}','home')">
          <div class="flex">
            ${avatar(p,'av-md')}
            <div style="flex:1;min-width:0">
              <div class="r-title">${esc(p.name)}</div>
              <div class="r-sub">${esc(p.role)}</div>
              <div class="pill gold" style="margin-top:6px">${p.match}% релевантности</div>
            </div>
            <button class="btn btn-soft btn-sm" onclick="event.stopPropagation();OCT.connect('${p.id}')">Познакомиться</button>
          </div>
        </div>`).join('')}
    </div>

    <div class="section-head"><h2>Запросы</h2><a class="link" onclick="OCT.nav('requests',null,'home')">Все</a></div>
    <div class="req-card card">
      <div class="req-text">${esc(req.text)}</div>
      <div class="req-foot">
        <div class="req-author">${avatar(ME,'av-sm')} Ваш активный запрос</div>
        <button class="add-circle" onclick="OCT.nav('requests',null,'home')">${I.plus}</button>
      </div>
    </div>
  </div>`};
};

/* ---------- PEOPLE / SEARCH ---------- */
function peopleListHTML(){
  const q = ui.peopleQuery.trim().toLowerCase();
  const list = PEOPLE.filter(p=> !q ||
    (p.name+' '+p.role+' '+p.city+' '+p.field+' '+p.tags.join(' ')).toLowerCase().includes(q));
  if(!list.length) return `<div class="empty">${I.search}<div>Никого не найдено по запросу</div></div>`;
  return `<div class="rows">${list.map(p=>`
    <div class="row tap person-row" onclick="OCT.nav('person','${p.id}','people')">
      ${avatar(p,'av-md')}
      <div class="r-main">
        <div class="r-title">${esc(p.name)}</div>
        <div class="r-sub">${esc(p.role)} · ${esc(p.city)}</div>
        <div class="r-sub" style="color:var(--tx-3)">${esc(p.field)}</div>
      </div>
      <div class="r-end"><span class="stars">${I.star}${p.rating}</span>${p.online?'<span class="pill green">онлайн</span>':''}</div>
    </div>`).join('')}</div>`;
}
VIEWS.people = () => ({ html:`<div class="screen">
    ${header('Поиск людей',{ back:true })}
    <div class="search">
      ${I.search}
      <input id="peopleInput" placeholder="Поиск по имени, сфере, запросу…" value="${esc(ui.peopleQuery)}" oninput="OCT.searchPeople(this.value)"/>
    </div>
    <div class="chip-row" style="margin-bottom:12px">
      <button class="chip" onclick="OCT.toast('Фильтр по городу')">${I.pin}Город</button>
      <button class="chip" onclick="OCT.toast('Фильтр по сфере')">Сфера</button>
      <button class="chip" onclick="OCT.toast('Фильтр по компетенциям')">Компетенции</button>
      <button class="chip" onclick="OCT.openFilters()">${I.filter}</button>
    </div>
    <div class="note" style="margin-bottom:14px">${I.bulb}<div>Попробуйте умный поиск: «найди инвестора в Дубае в сфере недвижимости»</div></div>
    <div id="peopleList">${peopleListHTML()}</div>
  </div>`,
  mount(){ const el=$('#peopleInput'); if(el){ el.focus({preventScroll:true}); el.setSelectionRange(el.value.length,el.value.length); } }
});

/* ---------- PERSON PROFILE (other user) ---------- */
VIEWS.person = (id) => {
  const p = byId(id); if(!p) return VIEWS.people();
  const liked = ui.liked[id];
  return { html:`<div class="screen">
    ${header('Профиль',{ back:true, action:`<button class="icon-btn" onclick="OCT.toggleLike('${id}')">${liked?`<span style="color:var(--gold-2)">${I.bookmark}</span>`:I.bookmark}</button>` })}
    <div class="prof-top">
      <div class="prof-avatar">${avatar(p,'av-xl ring')}</div>
      <div class="prof-name">${esc(p.name)}</div>
      <div style="margin-top:6px"><span class="pill gold">★ ${p.rating}</span> ${p.online?'<span class="pill green">онлайн</span>':''}</div>
      <div class="prof-meta">${esc(p.role)} · ${esc(p.city)}</div>
    </div>

    <div class="flex" style="gap:10px;margin:18px 0 4px">
      <button class="btn btn-gold" onclick="OCT.connect('${p.id}')">${I.chat}<span style="margin-left:6px">Познакомиться</span></button>
      <button class="icon-btn" style="width:52px;height:52px" onclick="OCT.openChatWith('${p.id}')">${I.send}</button>
    </div>

    <div class="section-head"><h2>О себе</h2></div>
    <div class="card pad"><div class="muted" style="line-height:1.55">${esc(p.about)}</div>
      <div class="wrap-tags mt-3">${p.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
    </div>

    <div class="section-head"><h2>Сейчас ищет</h2></div>
    <div class="card pad"><div class="flex" style="align-items:flex-start;gap:11px">${I.search}<div style="flex:1;line-height:1.5">${esc(p.seek)}</div></div></div>

    <div class="section-head"><h2>Цели</h2></div>
    <div class="card pad"><div class="wrap-tags">${p.goals.map(g=>`<span class="tag">${esc(g)}</span>`).join('')}</div></div>

    <div class="section-head"><h2>Сфера</h2></div>
    <div class="card pad"><div class="muted">${esc(p.field)}</div></div>
  </div>`};
};

/* ---------- PROFILE (me) ---------- */
VIEWS.profile = () => {
  const aboutText = ui.aboutOpen ? ME.about+' '+ME.aboutMore : ME.about;
  return { html:`<div class="screen">
    ${header('Профиль',{ action:`<button class="icon-btn" onclick="OCT.nav('menu',null,'profile')">${I.gear}</button>` })}
    <div class="prof-top">
      <div class="prof-avatar">${avatar(ME,'av-xl ring')}<button class="prof-edit" onclick="OCT.toast('Редактирование профиля')">${I.edit}</button></div>
      <div class="prof-name">${esc(ME.name)}</div>
      <div style="margin-top:6px">${rankBadge(ME.rank)}</div>
      <div class="prof-meta">${esc(ME.role)} · ${esc(ME.city)}</div>
    </div>

    <div class="quad">
      <button onclick="OCT.toast('Редактирование профиля')"><span class="q-ic">${I.t_profile}</span><span class="q-lab">Профиль</span></button>
      <button onclick="OCT.nav('finances',null,'profile')"><span class="q-ic">${I.wallet}</span><span class="q-lab">Финансы</span></button>
      <button onclick="OCT.nav('reputation',null,'profile')"><span class="q-val" style="color:var(--gold-1)">${ME.rating}</span><span class="q-lab">Репутация</span></button>
      <button onclick="OCT.nav('achievements',null,'profile')"><span class="q-ic">${I.trophy}</span><span class="q-lab">Достижения</span></button>
    </div>

    <div class="section-head"><h2>О себе</h2></div>
    <div class="card pad">
      <div class="muted" style="line-height:1.55">${esc(aboutText)}</div>
      <a class="link" style="display:inline-block;margin-top:10px;color:var(--gold-2);font-weight:600" onclick="OCT.toggleAbout()">${ui.aboutOpen?'Свернуть':'Показать больше'}</a>
      <div class="wrap-tags mt-3">${ME.fields.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
    </div>

    <div class="section-head"><h2>Текущие цели</h2><a class="link" onclick="OCT.nav('goals',null,'profile')">Все</a></div>
    <div class="card pad stack">
      ${GOALS.slice(0,1).map(g=>`
        <div>
          <div class="between" style="margin-bottom:9px"><span style="font-size:14px;line-height:1.35;padding-right:10px">${esc(g.title)}</span><b style="color:var(--gold-1)">${g.p}%</b></div>
          <div class="bar"><i style="width:${g.p}%"></i></div>
        </div>`).join('')}
    </div>

    <div class="section-head"><h2>Форум-группа</h2><a class="link" onclick="OCT.nav('forum',null,'profile')">Открыть</a></div>
    <div class="card pad tap" onclick="OCT.nav('forum',null,'profile')">
      <div class="flex"><div class="fg-ico">${I.users}</div>
        <div style="flex:1"><div class="fg-name">${esc(FORUM.my.name)}</div><div class="fg-roles">${FORUM.my.members}/${FORUM.my.cap} участников · вы капитан</div></div>
        ${I.chev}</div>
    </div>
  </div>`};
};

/* ---------- MESSAGES ---------- */
function chatTitle(c){ return c.type==='group' ? c.name : byId(c.who).name; }
function chatAvatar(c){ return c.type==='group' ? `<div class="av av-md" style="display:grid;place-items:center;background:var(--gold-soft);color:var(--gold-2)">${I.users}</div>` : avatar(byId(c.who),'av-md'); }

VIEWS.messages = () => {
  const segs = [['chats','Чаты'],['requests','Запросы'],['notifs','Уведомления']];
  let body = '';
  if(ui.msgTab==='chats'){
    body = `<div class="search">${I.search}<input placeholder="Поиск в сообщениях…" oninput="OCT.toast('Поиск по сообщениям')"/></div>
      <div class="rows">${CHATS.map(c=>`
        <div class="row tap chat-row" onclick="OCT.nav('chat','${c.id}','messages')">
          ${chatAvatar(c)}
          <div class="r-main"><div class="r-title">${esc(chatTitle(c))}</div><div class="r-sub">${esc(c.last)}</div></div>
          <div class="r-end"><span class="c-time">${esc(c.time)}</span>${c.unread?`<span class="unread">${c.unread}</span>`:''}</div>
        </div>`).join('')}</div>`;
  } else if(ui.msgTab==='requests'){
    body = `<div class="stack">${REQUESTS.filter(r=>r.author!=='me').map(r=>requestCard(r)).join('')}</div>`;
  } else {
    body = notifsHTML();
  }
  return { html:`<div class="screen">
    ${header('Сообщения')}
    <div class="segment">${segs.map(s=>`<button class="${ui.msgTab===s[0]?'on':''}" onclick="OCT.setUI('msgTab','${s[0]}')">${s[1]}</button>`).join('')}</div>
    <div style="margin-top:14px">${body}</div>
    ${ui.msgTab==='chats'?`<button class="fab" onclick="OCT.nav('people',null,'messages')">${I.plus}</button>`:''}
  </div>`};
};

/* ---------- CHAT VIEW ---------- */
VIEWS.chat = (id) => {
  const c = CHATS.find(x=>x.id===id); if(!c) return VIEWS.messages();
  c.unread = 0;
  const title = chatTitle(c);
  const statusLine = c.type==='group' ? `${c.members} участников` : (byId(c.who).online?'в сети':'был(а) недавно');
  const bubbles = c.msgs.map(m=>`
    <div class="bubble ${m.mine?'out':'in'}">
      ${(c.type==='group' && !m.mine && m.author)?`<div style="font-size:11px;font-weight:700;color:var(--gold-1);margin-bottom:2px">${esc(m.author)}</div>`:''}
      ${esc(m.t)}<span class="b-time">${esc(m.time||'')}</span>
    </div>`).join('');
  return { hideTab:true, noScroll:true, html:`
    <div class="chat-view">
      <div class="chat-head">
        <button class="icon-btn back-btn" onclick="OCT.back()">${I.back}</button>
        ${chatAvatar(c)}
        <div style="flex:1"><div class="ch-name">${esc(title)}</div><div class="ch-status" style="color:${c.type==='group'?'var(--tx-2)':'var(--green)'}">${esc(statusLine)}</div></div>
        <button class="icon-btn" onclick="OCT.toast('Профиль / меню чата')">${I.menu}</button>
      </div>
      <div class="chat-scroll" id="chatScroll">
        <div class="day-sep">Сегодня</div>
        ${bubbles}
      </div>
      <div class="chat-input">
        <input id="chatField" placeholder="Сообщение…" onkeydown="if(event.key==='Enter')OCT.sendMsg('${c.id}')"/>
        <button class="send" onclick="OCT.sendMsg('${c.id}')">${I.send}</button>
      </div>
    </div>`,
    mount(){ const s=$('#chatScroll'); if(s) s.scrollTop=s.scrollHeight; }
  };
};

/* ---------- RECOMMENDATIONS (swipe) ---------- */
VIEWS.recommendations = () => {
  const segs = [['foryou','Для вас'],['mutual','Взаимные'],['useful','Вы можете быть полезны']];
  const pool = PEOPLE.filter(p=>['voronov','smirnova','nikitin','halilov','koval'].includes(p.id));
  const remaining = pool.filter(p=>!ui.swiped[p.id]);
  const p = remaining[0];
  let cardHTML;
  if(!p){
    cardHTML = `<div class="rec-empty"><div style="font-size:42px;margin-bottom:10px">✦</div>На сегодня рекомендации закончились.<br/>ИИ подберёт новых людей завтра.<div style="margin-top:18px"><button class="btn btn-soft btn-sm" onclick="OCT.resetRecs()">Показать снова</button></div></div>`;
  } else {
    cardHTML = `<div class="rec-card" id="recCard">
      <div class="rec-photo">${portrait(p)}<div class="rec-match"><b>${p.match}%</b><span>совпадение</span></div></div>
      <div class="rec-body">
        <div class="rec-name">${esc(p.name)}</div>
        <div class="rec-role">${esc(p.role)} · ${esc(p.city)}</div>
        <div class="rec-role" style="color:var(--tx-3);margin-top:2px">${esc(p.field)}</div>
        <div class="rec-seek">${I.search} <b>Ищет:</b> ${esc(p.seek)}</div>
        <div style="font-size:13px;color:var(--tx-2);margin-top:14px;font-weight:600">Цели совпадают</div>
        <div class="rec-tags">${p.goals.map(g=>`<span class="tag">${esc(g)}</span>`).join('')}</div>
        <div class="rec-actions">
          <button class="rec-fab no" onclick="OCT.swipe('${p.id}','no')">${I.x}</button>
          <button class="rec-fab chat" onclick="OCT.openChatWith('${p.id}')">${I.chat}</button>
          <button class="rec-fab yes" onclick="OCT.swipe('${p.id}','yes')">${I.heart}</button>
        </div>
      </div>
    </div>`;
  }
  return { html:`<div class="screen">
    ${header('Рекомендации',{ back:true })}
    <div class="segment scroll">${segs.map(s=>`<button class="${ui.recTab===s[0]?'on':''}" onclick="OCT.setUI('recTab','${s[0]}')">${s[1]}</button>`).join('')}</div>
    <div style="margin-top:16px">${cardHTML}</div>
  </div>`};
};

/* ---------- EVENTS ---------- */
VIEWS.events = () => {
  const segs = [['upcoming','Ближайшие'],['past','Прошедшие']];
  const list = EVENTS.filter(e=>e.when===ui.eventTab);
  return { html:`<div class="screen">
    ${header('Мероприятия',{ back:true })}
    <div class="segment">${segs.map(s=>`<button class="${ui.eventTab===s[0]?'on':''}" onclick="OCT.setUI('eventTab','${s[0]}')">${s[1]}</button>`).join('')}</div>
    <div class="stack mt-3">
      ${list.length?list.map(e=>`
        <div class="card tap event-mini" onclick="OCT.nav('event','${e.id}','home')">
          <div class="thumb">${cover(e.theme)}</div>
          <div style="flex:1;min-width:0">
            <div class="r-title">${esc(e.title)}</div>
            <div class="event-meta" style="margin-top:7px">
              <span class="m">${I.calendar}${esc(e.date)}</span>
              <span class="m">${I.pin}${esc(e.loc)}</span>
            </div>
          </div>
        </div>`).join('') : `<div class="empty">${I.calendar}<div>Здесь пока пусто</div></div>`}
    </div>
  </div>`};
};

VIEWS.event = (id) => {
  const e = EVENTS.find(x=>x.id===id) || EVENTS[0];
  return { flush:true, html:`<div class="screen flush">
    <div style="position:relative">
      <div class="event-cover" style="height:200px">${cover(e.theme)}</div>
      <button class="icon-btn back-btn" style="position:absolute;top:14px;left:16px;background:rgba(8,8,10,.55);backdrop-filter:blur(6px)" onclick="OCT.back()">${I.back}</button>
      <span class="pill gold" style="position:absolute;top:18px;right:16px">${esc(e.badge)}</span>
    </div>
    <div style="padding:18px">
      <h1 style="font-size:23px;font-weight:800;margin:0 0 12px">${esc(e.title)}</h1>
      <div class="card pad stack-sm">
        <div class="flex">${I.calendar}<span>${esc(e.date)}</span></div>
        <div class="flex">${I.pin}<span>${esc(e.loc)}</span></div>
        <div class="flex">${I.users}<span>${e.going} из ${e.cap} мест занято</span></div>
      </div>
      <div class="section-head"><h2>О мероприятии</h2></div>
      <div class="muted" style="line-height:1.6">${esc(e.desc)}</div>

      <div class="section-head"><h2>Кто идёт</h2></div>
      <div class="fg-members">${['voronov','smirnova','sokolov','lebedeva'].map(pid=>avatar(byId(pid),'av-md')).join('')}<span class="fg-count">+${e.going-4} участников</span></div>

      ${e.when==='upcoming'
        ? `<button class="btn btn-gold mt-4" onclick="OCT.toast('Вы зарегистрированы. Приоритет допуска — по званию')">Зарегистрироваться</button>`
        : `<button class="btn btn-soft mt-4" onclick="OCT.toast('Открываю запись и материалы')">Смотреть запись</button>`}
    </div>
  </div>`};
};

/* ---------- DEALS ---------- */
VIEWS.deals = () => {
  const segs = [['all','Все'],['active','Активные'],['done','Завершённые']];
  const list = DEALS.filter(d=> ui.dealTab==='all' || (ui.dealTab==='active'? d.status!=='done' : d.status==='done'));
  return { html:`<div class="screen">
    ${header('Сделки',{ action:`<button class="icon-btn" onclick="OCT.toast('Создание новой сделки')">${I.plus}</button>` })}
    <div class="note" style="margin-bottom:14px">${I.shield}<div>Платформа выступает гарантом расчётов и безопасно резервирует средства до выполнения этапов.</div></div>
    <div class="segment">${segs.map(s=>`<button class="${ui.dealTab===s[0]?'on':''}" onclick="OCT.setUI('dealTab','${s[0]}')">${s[1]}</button>`).join('')}</div>
    <div class="stack mt-3">
      ${list.map(d=>{ const w=byId(d.with); const doneN=d.steps.filter(s=>s.s==='done').length; return `
        <div class="card pad tap" onclick="OCT.nav('deal','${d.id}','deals')">
          <div class="between"><span class="deal-id" style="font-size:16px">${esc(d.no)}</span><span class="pill ${dealStatusPill(d)}">${esc(d.statusLabel)}</span></div>
          <div class="flex mt-3">${avatar(w,'av-sm')}<div style="flex:1"><div class="r-title" style="font-size:14px">${esc(w.name)}</div><div class="r-sub">${esc(d.amountLabel)}</div></div><b style="color:var(--gold-1)">${esc(d.amount)}</b></div>
          <div class="bar mt-3"><i style="width:${Math.round(doneN/d.steps.length*100)}%"></i></div>
          <div class="muted" style="font-size:12px;margin-top:8px">Этап ${doneN}/${d.steps.length} · ${esc(d.stage)}</div>
        </div>`;}).join('')}
    </div>
  </div>`};
};

VIEWS.deal = (id) => {
  const d = DEALS.find(x=>x.id===id) || DEALS[0];
  const w = byId(d.with);
  return { html:`<div class="screen">
    ${header('Сделка',{ back:true })}
    <div class="deal-status-row"><span class="deal-id">${esc(d.no)}</span><span class="pill ${dealStatusPill(d)}">${esc(d.statusLabel)}</span></div>

    <div class="card pad mt-3">
      <div class="deal-parties">
        <div class="deal-party">${avatar(ME,'av-md')}<div class="dp-role">Вы</div><div class="dp-name">${esc(ME.name)}</div></div>
        <div class="deal-swap">${I.swap}</div>
        <div class="deal-party">${avatar(w,'av-md')}<div class="dp-role">${esc(w.role)}</div><div class="dp-name">${esc(w.name)}</div></div>
      </div>
    </div>

    <div class="section-head"><h2>Условия сделки</h2></div>
    <div class="card pad" style="padding-top:4px;padding-bottom:4px">
      <div class="kv"><span class="k">${esc(d.amountLabel)}</span><span class="v" style="color:var(--gold-1)">${esc(d.amount)}</span></div>
      <div class="kv"><span class="k">Доля в проекте</span><span class="v">${esc(d.share)}</span></div>
      <div class="kv"><span class="k">Этап</span><span class="v">${esc(d.stage)}</span></div>
    </div>

    <div class="section-head"><h2>Прогресс сделки</h2></div>
    <div class="card pad">
      <div class="timeline">
        ${d.steps.map(s=>`
          <div class="tl-step ${s.s}">
            <div class="tl-dot">${s.s==='done'?I.check:(s.s==='active'?I.clock:'')}</div>
            <div class="tl-main"><span class="tl-title">${esc(s.t)}</span><span class="tl-when">${s.s==='done'?I.check:''}${esc(s.when)}</span></div>
          </div>`).join('')}
      </div>
    </div>

    <button class="btn btn-gold mt-4" onclick="OCT.openChatWith('${w.id}')">${I.chat}<span style="margin-left:6px">Открыть чат по сделке</span></button>
    <button class="btn btn-ghost mt-3" onclick="OCT.toast('Открыт арбитражный кейс по сделке')">Открыть спор / арбитраж</button>
  </div>`};
};

/* ---------- FINANCES ---------- */
VIEWS.finances = () => ({ html:`<div class="screen">
  ${header('Финансы',{ back:true })}
  <div class="fin-cards">
    <div class="fin-card gold"><div class="f-lab">Баланс пая</div><div class="f-val">${FIN.balance}</div></div>
    <div class="fin-card green card"><div class="f-lab">Начисленная прибыль</div><div class="f-val">${FIN.profit}</div></div>
  </div>
  <div class="list-card mt-3">
    ${FIN.items.map(it=>`
      <div class="row">
        <div class="row-ico">${I[it.ic]}</div>
        <div class="r-main"><div class="r-title" style="font-size:14px">${esc(it.name)}</div><div class="r-sub">${esc(it.sub)}</div></div>
        <div class="r-end">${it.pill?`<span class="pill green">${esc(it.pill)}</span>`:`<span class="r-amt" style="${it.valClass==='g'?'color:var(--green)':''}">${esc(it.val)}</span>`}</div>
      </div>`).join('')}
  </div>
  <button class="btn btn-gold mt-4" onclick="OCT.toast('Запрос на вывод прибыли отправлен')">Вывести прибыль</button>
  <div class="note mt-3">${I.gift}<div>Приглашайте участников и получайте вознаграждение 1 и 2 уровня. <a class="link" style="color:var(--gold-2);font-weight:700" onclick="OCT.nav('referral',null,'profile')">Реферальная ссылка →</a></div></div>
</div>`});

/* ---------- REPUTATION ---------- */
function repChart(){
  const W=300,H=110,pad=10;
  const vals=REP.chart.map(c=>c.v), min=400,max=1000;
  const x=i=> pad + i*((W-2*pad)/(REP.chart.length-1));
  const y=v=> pad + (1-(v-min)/(max-min))*(H-2*pad);
  const pts=REP.chart.map((c,i)=>`${x(i)},${y(c.v)}`).join(' ');
  const area=`${pad},${H-pad} ${pts} ${W-pad},${H-pad}`;
  const id=uid();
  return `<svg viewBox="0 0 ${W} ${H+22}" width="100%">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(217,182,95,.32)"/><stop offset="1" stop-color="rgba(217,182,95,0)"/></linearGradient></defs>
    ${[1000,800,600,400].map(g=>`<line x1="${pad}" y1="${y(g)}" x2="${W-pad}" y2="${y(g)}" stroke="rgba(255,255,255,.05)"/><text x="0" y="${y(g)+3}" font-size="8" fill="var(--tx-3)">${g}</text>`).join('')}
    <polygon points="${area}" fill="url(#${id})"/>
    <polyline points="${pts}" fill="none" stroke="#D9B65F" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    ${REP.chart.map((c,i)=>`<circle cx="${x(i)}" cy="${y(c.v)}" r="${i===REP.chart.length-1?4:2.6}" fill="${i===REP.chart.length-1?'#F1D894':'#D9B65F'}"/>`).join('')}
    <text x="${x(REP.chart.length-1)}" y="${y(REP.chart[REP.chart.length-1].v)-8}" font-size="9" font-weight="700" fill="#F1D894" text-anchor="end">${REP.score}</text>
    ${REP.chart.map((c,i)=>`<text x="${x(i)}" y="${H+14}" font-size="8" fill="var(--tx-3)" text-anchor="middle">${c.m}</text>`).join('')}
  </svg>`;
}
VIEWS.reputation = () => ({ html:`<div class="screen">
  ${header('Репутация',{ back:true })}
  <div class="rep-hero"><div class="rep-score">${REP.score}</div><div class="rep-level">${esc(REP.level)}</div></div>
  <div class="card rep-chart">${repChart()}</div>
  <div class="section-head"><h2>Из чего складывается</h2></div>
  <div class="card pad" style="padding-top:2px;padding-bottom:2px">
    ${REP.metrics.map(m=>`
      <div class="rep-metric">
        <div class="rm-ic">${I[m.ic]}</div>
        <div class="rm-name">${esc(m.name)}</div>
        <div class="rm-bar bar"><i style="width:${(m.v/1000*100)}%"></i></div>
        <div class="rm-val">${m.v}</div>
      </div>`).join('')}
  </div>
  <div class="note mt-3">${I.bulb}<div>Рейтинг растёт за счёт помощи участникам, выполненных сделок, активности в форум-группе и отсутствия жалоб.</div></div>
</div>`});

/* ---------- ACHIEVEMENTS ---------- */
VIEWS.achievements = () => ({ html:`<div class="screen">
  ${header('Достижения',{ back:true })}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    ${ACHIEVEMENTS.map(a=>`
      <div class="card pad center" style="${a.got?'':'opacity:.5'}">
        <div style="width:48px;height:48px;border-radius:14px;margin:2px auto 10px;display:grid;place-items:center;background:${a.got?'var(--gold-soft)':'var(--card-3)'};border:1px solid ${a.got?'var(--gold-line)':'var(--line)'};color:var(--gold-2)">${I[a.ic]}</div>
        <div style="font-weight:700;font-size:14px">${esc(a.name)}</div>
        <div class="muted" style="font-size:12px;margin-top:4px">${esc(a.sub)}</div>
        ${a.got?'<div class="pill green" style="margin-top:8px">Получено</div>':'<div class="pill" style="margin-top:8px">В процессе</div>'}
      </div>`).join('')}
  </div>
</div>`});

/* ---------- FORUM GROUPS ---------- */
VIEWS.forum = () => {
  const g = FORUM.my;
  return { html:`<div class="screen">
    ${header('Форум-группы',{ back:true })}
    <div class="section-head"><h2>Моя группа</h2></div>
    <div class="fg-card card">
      <div class="fg-top"><div class="fg-ico">${I.users}</div>
        <div style="flex:1"><div class="fg-name">${esc(g.name)}</div><div class="fg-roles">Капитан: ${esc(g.captain)}<br/>Наставник: ${esc(g.mentor)}</div></div>
      </div>
      <div class="fg-members">${g.people.slice(0,6).map(pid=>avatar(byId(pid),'av-sm')).join('')}<span class="fg-count">${g.members}/${g.cap} участников</span></div>
      <div class="fg-meet">
        <div class="fm-when"><span class="lab">Ближайшая встреча</span>${esc(g.meetDate)}<div class="muted" style="font-size:12px">${esc(g.meetLoc)}</div></div>
        <button class="btn btn-gold btn-sm" onclick="OCT.nav('chat','c3','profile')">Открыть чат</button>
      </div>
    </div>

    <div class="section-head"><h2>Другие группы</h2></div>
    <div class="stack">
      ${FORUM.others.map(o=>`
        <div class="card pad"><div class="flex"><div class="fg-ico" style="width:42px;height:42px">${I.users}</div>
          <div style="flex:1"><div class="fg-name" style="font-size:15px">${esc(o.name)}</div><div class="fg-roles">Капитан: ${esc(o.captain)} · ${o.members}/${o.cap}</div></div>
          ${o.members<o.cap?`<button class="btn btn-soft btn-sm" onclick="OCT.toast('Запрос на вступление в ${esc(o.name)} отправлен')">Подать запрос</button>`:`<span class="pill">Заполнена</span>`}
        </div></div>`).join('')}
    </div>
  </div>`};
};

/* ---------- MENU ---------- */
VIEWS.menu = () => {
  const items = [
    ['target','Запросы','', "OCT.nav('requests',null,'profile')"],
    ['bulb','Мои цели','', "OCT.nav('goals',null,'profile')"],
    ['calendar','Мои мероприятия','', "OCT.nav('events',null,'profile')"],
    ['bookmark','Избранное','', "OCT.nav('favorites',null,'profile')"],
    ['gift','Пригласить участника','Реферальная ссылка', "OCT.nav('referral',null,'profile')"],
    ['book','Обучение','', "OCT.nav('knowledge',null,'profile')"],
    ['doc','База знаний','', "OCT.nav('knowledge',null,'profile')"],
    ['gear','Настройки','', "OCT.nav('settings',null,'profile')"],
    ['life','Поддержка','', "OCT.toast('Чат с поддержкой сообщества')"],
    ['shield','Кабинет администрации','Демо для управляющих сообщества', "location.href='admin.html'"],
  ];
  return { html:`<div class="screen">
    ${header('Меню',{ back:true })}
    <div class="list-card">
      ${items.map(it=>`
        <div class="row tap" onclick="${it[3]}">
          <div class="row-ico">${I[it[0]]}</div>
          <div class="r-main"><div class="r-title" style="font-size:15px">${esc(it[1])}</div>${it[2]?`<div class="r-sub">${esc(it[2])}</div>`:''}</div>
          ${I.chev}
        </div>`).join('')}
      <div class="row tap" onclick="OCT.logout()">
        <div class="row-ico" style="color:var(--red);background:rgba(255,93,93,.1);border-color:rgba(255,93,93,.2)">${I.logout}</div>
        <div class="r-main"><div class="r-title" style="font-size:15px;color:var(--red)">Выход</div></div>
      </div>
    </div>
  </div>`};
};

/* ---------- REQUESTS ---------- */
function requestCard(r){
  const a = byId(r.author);
  return `<div class="req-card card">
    <div class="req-text">${esc(r.text)}</div>
    <div class="wrap-tags mt-3">${r.tags.map(t=>`<span class="pill gold">${esc(t)}</span>`).join('')}</div>
    <div class="req-foot">
      <div class="req-author">${avatar(a,'av-sm')}<div>${esc(a.name)}<div style="font-size:11px;color:var(--tx-3)">${esc(r.time)}</div></div></div>
      ${r.author==='me'?`<span class="pill">Ваш запрос</span>`:`<button class="btn btn-soft btn-sm" onclick="OCT.openChatWith('${r.author}')">Откликнуться</button>`}
    </div>
  </div>`;
}
VIEWS.requests = () => ({ html:`<div class="screen">
  ${header('Запросы',{ back:true, action:`<button class="icon-btn" onclick="OCT.newRequest()">${I.plus}</button>` })}
  <div class="note" style="margin-bottom:14px">${I.bulb}<div>Сформулируйте запрос — ИИ найдёт участников, которые могут помочь.</div></div>
  <div class="stack">${REQUESTS.map(r=>requestCard(r)).join('')}</div>
</div>`});

/* ---------- GOALS ---------- */
VIEWS.goals = () => ({ html:`<div class="screen">
  ${header('Мои цели',{ back:true, action:`<button class="icon-btn" onclick="OCT.toast('Добавление новой цели')">${I.plus}</button>` })}
  <div class="stack">
    ${GOALS.map(g=>`
      <div class="card pad">
        <div class="between" style="margin-bottom:10px"><span style="font-size:15px;line-height:1.35;padding-right:10px;font-weight:600">${esc(g.title)}</span><b style="color:var(--gold-1)">${g.p}%</b></div>
        <div class="bar"><i style="width:${g.p}%"></i></div>
      </div>`).join('')}
  </div>
</div>`});

/* ---------- FAVORITES ---------- */
VIEWS.favorites = () => {
  const likedIds = Object.keys(ui.liked).filter(k=>ui.liked[k]);
  const list = likedIds.length? likedIds.map(byId).filter(Boolean) : [byId('voronov'), byId('nikitin')];
  return { html:`<div class="screen">
    ${header('Избранное',{ back:true })}
    ${list.length?`<div class="rows">${list.map(p=>`
      <div class="row tap" onclick="OCT.nav('person','${p.id}','profile')">
        ${avatar(p,'av-md')}
        <div class="r-main"><div class="r-title">${esc(p.name)}</div><div class="r-sub">${esc(p.role)} · ${esc(p.city)}</div></div>
        <span class="stars">${I.star}${p.rating}</span>
      </div>`).join('')}</div>`:`<div class="empty">${I.bookmark}<div>Здесь появятся сохранённые участники</div></div>`}
  </div>`};
};

/* ---------- REFERRAL ---------- */
VIEWS.referral = () => ({ html:`<div class="screen">
  ${header('Пригласить участника',{ back:true })}
  <div class="card pad center" style="background:linear-gradient(140deg,rgba(217,182,95,.14),rgba(20,20,23,.4))">
    <div style="width:64px;height:64px;border-radius:18px;margin:6px auto 14px;display:grid;place-items:center;background:var(--gold-soft);border:1px solid var(--gold-line);color:var(--gold-2)">${I.gift}</div>
    <h2 style="margin:0;font-size:18px">Приведите сильных людей</h2>
    <p class="muted" style="margin:8px 0 0;line-height:1.5">За каждого принятого участника — вознаграждение 1 уровня, за их приглашения — 2 уровня.</p>
  </div>
  <div class="section-head"><h2>Ваша реферальная ссылка</h2></div>
  <div class="card pad flex" style="gap:10px">
    <div style="flex:1;font-size:14px;color:var(--gold-1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${REF_LINK}</div>
    <button class="btn btn-gold btn-sm" onclick="OCT.copyRef()">${I.copy}<span style="margin-left:6px">Копировать</span></button>
  </div>
  <div class="fin-cards mt-4">
    <div class="fin-card card"><div class="f-lab">Приглашено</div><div class="f-val">7</div></div>
    <div class="fin-card gold"><div class="f-lab">Заработано</div><div class="f-val">15 700 ₽</div></div>
  </div>
  <button class="btn btn-ghost mt-4" onclick="OCT.toast('Открываю меню «Поделиться»')">Поделиться приглашением</button>
</div>`});

/* ---------- KNOWLEDGE / EDUCATION ---------- */
VIEWS.knowledge = () => ({ html:`<div class="screen">
  ${header('Обучение и база знаний',{ back:true })}
  <div class="note" style="margin-bottom:14px">${I.bulb}<div>Материалы подобраны под ваши цели и роль капитана.</div></div>
  <div class="list-card">
    ${KNOWLEDGE.map(k=>`
      <div class="row tap" onclick="OCT.toast('Открываю: ${esc(k.name)}')">
        <div class="row-ico">${I[k.ic]}</div>
        <div class="r-main"><div class="r-title" style="font-size:15px">${esc(k.name)}</div><div class="r-sub">${esc(k.sub)}</div></div>
        ${k.pill?`<span class="pill gold">${esc(k.pill)}</span>`:I.chev}
      </div>`).join('')}
  </div>
</div>`});

/* ---------- SETTINGS ---------- */
VIEWS.settings = () => {
  const toggles = [
    ['Видимость профиля','Виден участникам по рангу',true],
    ['Входящие запросы на знакомство','Разрешены',true],
    ['Показывать контакты','Только для уровня «Золото»+',false],
    ['Push-уведомления','Включены',true],
    ['Двухфакторная защита (2FA)','Включена',true],
  ];
  return { html:`<div class="screen">
    ${header('Настройки',{ back:true })}
    <div class="section-head"><h2>Приватность и доступ</h2></div>
    <div class="list-card">
      ${toggles.map((t,i)=>`
        <div class="row">
          <div class="r-main"><div class="r-title" style="font-size:14px">${esc(t[0])}</div><div class="r-sub">${esc(t[1])}</div></div>
          <button class="tgl ${t[2]?'on':''}" data-i="${i}" onclick="OCT.toggleSetting(this)" style="width:46px;height:28px;border-radius:999px;background:${t[2]?'var(--gold-grad)':'var(--card-3)'};border:1px solid var(--line);position:relative;flex:0 0 auto">
            <span style="position:absolute;top:2px;${t[2]?'right:2px':'left:2px'};width:22px;height:22px;border-radius:50%;background:#fff;transition:.2s"></span>
          </button>
        </div>`).join('')}
    </div>
    <div class="section-head"><h2>Аккаунт</h2></div>
    <div class="list-card">
      <div class="row tap" onclick="OCT.toast('Управление подпиской')"><div class="row-ico">${I.wallet}</div><div class="r-main"><div class="r-title" style="font-size:15px">Подписка</div><div class="r-sub">Активна до 15.08.2024</div></div>${I.chev}</div>
      <div class="row tap" onclick="OCT.toast('Смена языка')"><div class="row-ico">${I.globe}</div><div class="r-main"><div class="r-title" style="font-size:15px">Язык</div><div class="r-sub">Русский</div></div>${I.chev}</div>
    </div>
  </div>`};
};

/* ---------- NOTIFICATIONS ---------- */
function notifsHTML(){
  return `<div class="list-card">${NOTIFS.map(n=>`
    <div class="row ${n.fresh?'':''}">
      <div class="row-ico" style="${n.fresh?'background:var(--gold-soft);border-color:var(--gold-line)':''}">${I[n.ic]||I.bell}</div>
      <div class="r-main"><div class="r-title" style="font-size:14px;font-weight:500;white-space:normal;line-height:1.4">${n.text}</div><div class="r-sub" style="margin-top:4px">${esc(n.time)}</div></div>
      ${n.fresh?'<span style="width:8px;height:8px;border-radius:50%;background:var(--gold-2);flex:0 0 auto"></span>':''}
    </div>`).join('')}</div>`;
}
VIEWS.notifications = () => ({ html:`<div class="screen">
  ${header('Уведомления',{ back:true })}
  ${notifsHTML()}
</div>`});

/* ============================================================
   INTERACTIONS  (window.OCT)
   ============================================================ */
let toastTimer;
const OCT = {
  tab, nav, back,
  enter(){ tab('home'); },
  logout(){ state.stack=[{view:'onboarding'}]; render(); },

  toast(msg){
    const t=$('#toast'); t.textContent=msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
  },

  setUI(key,val){ ui[key]=val; render(); },
  toggleAbout(){ ui.aboutOpen=!ui.aboutOpen; render(); },

  searchPeople(v){ ui.peopleQuery=v; const c=$('#peopleList'); if(c) c.innerHTML=peopleListHTML(); },

  connect(id){ const p=byId(id); OCT.toast(`Запрос на знакомство отправлен: ${p.name.split(' ')[0]}`); },
  openChatWith(id){
    let c = CHATS.find(x=>x.type==='dm' && x.who===id);
    if(!c){ c={ id:'c_'+id, who:id, type:'dm', last:'', time:'сейчас', unread:0, msgs:[] }; CHATS.unshift(c); }
    nav('chat', c.id, 'messages');
  },

  swipe(id,dir){
    const card=$('#recCard');
    if(card){ card.classList.add('swiping'); card.style.transform=`translateX(${dir==='yes'?'120%':'-120%'}) rotate(${dir==='yes'?12:-12}deg)`; card.style.opacity='0'; }
    ui.swiped[id]=dir;
    if(dir==='yes'){ ui.liked[id]=true; OCT.toast('Отправлено! Ждём взаимности 🤝'); }
    setTimeout(()=>render(),330);
  },
  resetRecs(){ ui.swiped={}; render(); },

  toggleLike(id){ ui.liked[id]=!ui.liked[id]; OCT.toast(ui.liked[id]?'Добавлено в избранное':'Убрано из избранного'); render(); },

  sendMsg(chatId){
    const f=$('#chatField'); if(!f||!f.value.trim()) return;
    const c=CHATS.find(x=>x.id===chatId); if(!c) return;
    const txt=f.value.trim();
    c.msgs.push({t:txt,mine:true,time:'сейчас'}); c.last=txt;
    f.value='';
    const s=$('#chatScroll');
    s.insertAdjacentHTML('beforeend',`<div class="bubble out">${esc(txt)}<span class="b-time">сейчас</span></div>`);
    s.scrollTop=s.scrollHeight;
    // auto-reply
    setTimeout(()=>{
      const reply = c.type==='group' ? 'Принято, спасибо!' : 'Отлично, на связи 👍';
      const author = c.type==='group' ? 'Игорь Соколов' : null;
      c.msgs.push({t:reply,mine:false,time:'сейчас',author});
      const cur=$('#chatScroll'); if(!cur) return;
      cur.insertAdjacentHTML('beforeend',`<div class="bubble in">${author?`<div style="font-size:11px;font-weight:700;color:var(--gold-1);margin-bottom:2px">${esc(author)}</div>`:''}${esc(reply)}<span class="b-time">сейчас</span></div>`);
      cur.scrollTop=cur.scrollHeight;
    },1100);
  },

  newRequest(){ OCT.sheet(`
    <h3>Новый запрос</h3>
    <div class="s-sub">ИИ найдёт релевантных участников, которые могут помочь.</div>
    <div class="search" style="background:var(--card)"><input id="reqField" placeholder="Например: ищу маркетолога в финтех…"/></div>
    <button class="btn btn-gold mt-3" onclick="OCT.submitRequest()">Опубликовать запрос</button>
    <button class="btn btn-ghost mt-2" onclick="OCT.closeSheet()">Отмена</button>
  `); setTimeout(()=>$('#reqField')?.focus(),300); },
  submitRequest(){
    const v=$('#reqField')?.value.trim();
    if(v){ REQUESTS.unshift({id:'r'+Date.now(),author:'me',text:v,tags:['Новый'],time:'только что'}); }
    OCT.closeSheet(); OCT.toast('Запрос опубликован. ИИ подбирает людей…'); setTimeout(render,200);
  },

  openFilters(){ OCT.sheet(`
    <h3>Фильтры поиска</h3>
    <div class="s-sub">Сузьте круг по параметрам сообщества.</div>
    ${['Город','Страна','Сфера бизнеса','Компетенции','Звание','Уровень рейтинга','Доступность для контакта'].map(f=>
      `<div class="row" style="border-color:var(--line)"><div class="r-main"><div class="r-title" style="font-size:14px">${f}</div></div>${I.chev}</div>`).join('')}
    <button class="btn btn-gold mt-3" onclick="OCT.closeSheet();OCT.toast('Фильтры применены')">Применить</button>
  `); },

  copyRef(){
    const t=`https://${REF_LINK}`;
    if(navigator.clipboard) navigator.clipboard.writeText(t).catch(()=>{});
    OCT.toast('Реферальная ссылка скопирована');
  },

  toggleSetting(btn){
    const on=!btn.classList.contains('on'); btn.classList.toggle('on',on);
    btn.style.background = on?'var(--gold-grad)':'var(--card-3)';
    const dot=btn.querySelector('span'); dot.style.left=on?'auto':'2px'; dot.style.right=on?'2px':'auto';
  },

  sheet(html){
    const s=$('#sheet'), sc=$('#scrim');
    s.innerHTML=`<div class="sheet-grip"></div>`+html;
    s.classList.add('show'); sc.classList.add('show');
  },
  closeSheet(){ $('#sheet').classList.remove('show'); $('#scrim').classList.remove('show'); },
};
window.OCT = OCT;

/* scrim closes sheet */
$('#scrim').addEventListener('click', ()=>OCT.closeSheet());

/* ---------- boot ---------- */
render();
