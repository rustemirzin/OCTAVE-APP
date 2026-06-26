/* ============================================================
   O.C.T.A.V.E. — Management / admin dashboard
   Vanilla JS, no deps, offline. Pairs with the participant app.
   ============================================================ */
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const view = $('#view');
let _uid = 0; const uid = () => 'a' + (++_uid);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = n => n.toLocaleString('ru-RU');

/* ---------------- icons ---------------- */
const I = {
  dash:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`,
  users:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1A4 4 0 0 1 16 11"/></svg>`,
  userplus:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>`,
  shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  star:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.8 6.1 21.2l1.2-6.6L2.5 10l6.6-.9Z"/></svg>`,
  cal:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>`,
  group:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="1.4"/><circle cx="12" cy="20" r="1.4"/><circle cx="4.5" cy="8" r="1.4"/><circle cx="19.5" cy="8" r="1.4"/><circle cx="4.5" cy="16" r="1.4"/><circle cx="19.5" cy="16" r="1.4"/></svg>`,
  deal:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="13" rx="2.5"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v3M9.5 13.5h5"/></svg>`,
  wallet:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1"/><path d="M21 12h-5a2 2 0 0 0 0 4h5v-4Z"/><path d="M18 7V5a2 2 0 0 0-2.5-1.9L4.6 5.8A2 2 0 0 0 3 7.7"/></svg>`,
  book:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>`,
  globe:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>`,
  key:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.5 12.5 9-9M16 6l2 2M14 8l2 2"/></svg>`,
  history:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v6h6"/><path d="M3.5 9a9 9 0 1 1-1 6"/><path d="M12 8v4l3 2"/></svg>`,
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  bell:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>`,
  menu:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  plus:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  x:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  up:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg>`,
  down:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  alert:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>`,
  pin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  dl:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>`,
  trend:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>`,
  ruble:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21V4h6a4 4 0 0 1 0 8H7M5 15h7"/></svg>`,
  flag:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V4s2-1 5-1 5 2 8 2 3-1 3-1v9s-1 1-3 1-5-2-8-2-5 1-5 1"/></svg>`,
  scale:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 21h10M5 7l-3 6a3 3 0 0 0 6 0L5 7Zm14 0-3 6a3 3 0 0 0 6 0l-3-6ZM5 7l7-2 7 2"/></svg>`,
};

/* ---------------- avatar ---------------- */
const PAL = [['#46578A','#222B47'],['#6B4A86','#2E1E45'],['#8A6A46','#3C2A19'],['#3E8A77','#163C33'],['#8A4659','#3C1925'],['#4A4A55','#23232B'],['#5E7A46','#28371C'],['#467D8A','#173138']];
const hash = s => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
const initials = n => n.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
function avatar(name) {
  const p = PAL[hash(name) % PAL.length], id = uid();
  return `<div class="av"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient></defs>
    <rect width="100" height="100" fill="url(#${id})"/><circle cx="50" cy="40" r="17" fill="rgba(255,255,255,.16)"/><path d="M22 92c2-17 13-26 28-26s26 9 28 26Z" fill="rgba(255,255,255,.16)"/>
    <text x="50" y="55" font-size="30" font-weight="700" fill="rgba(255,255,255,.92)" text-anchor="middle" font-family="Manrope,sans-serif">${esc(initials(name))}</text></svg></div>`;
}

/* ---------------- chart generators ---------------- */
function lineArea(values, { w = 640, h = 200, min, max, labels = [], gold = true } = {}) {
  const pad = 26, mn = min ?? Math.min(...values) * 0.9, mx = max ?? Math.max(...values) * 1.05;
  const X = i => pad + i * ((w - pad * 2) / (values.length - 1));
  const Y = v => pad / 2 + (1 - (v - mn) / (mx - mn)) * (h - pad * 1.6);
  const pts = values.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  const area = `${pad},${h - pad / 1.4} ${pts} ${w - pad},${h - pad / 1.4}`;
  const id = uid(), c = gold ? '#D9B65F' : '#5AA9FF', c2 = gold ? '217,182,95' : '90,169,255';
  const grid = [0, .25, .5, .75, 1].map(t => { const y = pad / 2 + t * (h - pad * 1.6); return `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="rgba(255,255,255,.05)"/>`; }).join('');
  const lab = labels.map((l, i) => `<text x="${X(i)}" y="${h - 4}" font-size="10" fill="#6E6C76" text-anchor="middle">${l}</text>`).join('');
  const dots = values.map((v, i) => i === values.length - 1 ? `<circle cx="${X(i)}" cy="${Y(v)}" r="4" fill="${gold ? '#F1D894' : '#7FC0FF'}"/>` : '').join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" preserveAspectRatio="none" style="display:block">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(${c2},.3)"/><stop offset="1" stop-color="rgba(${c2},0)"/></linearGradient></defs>
    ${grid}<polygon points="${area}" fill="url(#${id})"/><polyline points="${pts}" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>${dots}${lab}</svg>`;
}
function bars(values, { w = 640, h = 200, labels = [], color = '#D9B65F' } = {}) {
  const pad = 22, mx = Math.max(...values) * 1.08, bw = (w - pad * 2) / values.length;
  const id = uid();
  const rects = values.map((v, i) => {
    const bh = (v / mx) * (h - pad * 1.8), x = pad + i * bw + bw * 0.18, y = h - pad - bh, ww = bw * 0.64;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${ww.toFixed(1)}" height="${Math.max(bh,1).toFixed(1)}" rx="4" fill="url(#${id})"/>`;
  }).join('');
  const lab = labels.map((l, i) => `<text x="${pad + i * bw + bw / 2}" y="${h - 5}" font-size="10" fill="#6E6C76" text-anchor="middle">${l}</text>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="display:block">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}"/><stop offset="1" stop-color="${color}" stop-opacity=".4"/></linearGradient></defs>
    ${rects}${lab}</svg>`;
}
function donut(segs, { size = 168, total } = {}) {
  const sum = total ?? segs.reduce((a, s) => a + s.value, 0);
  const r = size / 2 - 14, cx = size / 2, cy = size / 2, C = 2 * Math.PI * r;
  let off = 0;
  const rings = segs.map(s => {
    const frac = s.value / sum, len = frac * C;
    const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="16" stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 ${cx} ${cy})" stroke-linecap="butt"/>`;
    off += len; return el;
  }).join('');
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="16"/>${rings}
    <text x="${cx}" y="${cy - 2}" font-size="26" font-weight="800" fill="#F4F2EC" text-anchor="middle">${fmt(sum)}</text>
    <text x="${cx}" y="${cy + 16}" font-size="11" fill="#6E6C76" text-anchor="middle">всего</text></svg>`;
}
function spark(values, color = '#46C97E') {
  const w = 120, h = 34, mn = Math.min(...values), mx = Math.max(...values);
  const pts = values.map((v, i) => `${(i * (w / (values.length - 1))).toFixed(1)},${(h - 2 - ((v - mn) / (mx - mn || 1)) * (h - 4)).toFixed(1)}`).join(' ');
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

/* ---------------- DATA ---------------- */
const ADMIN = { name: 'Тимур Гатауллин', role: 'Магистрат · администрация', city: 'Казань' };

const KPIS = [
  { ic: 'users', cls: '', val: '4 820', lab: 'Всего участников', delta: '+6.2%', up: true, spark: [3720,4050,4300,4520,4690,4820] },
  { ic: 'ruble', cls: 'green', val: '48,2 млн ₽', lab: 'Выручка за месяц', delta: '+9.4%', up: true, spark: [37,40,43,45,47,48] },
  { ic: 'userplus', cls: 'blue', val: '240', lab: 'Кандидатов в воронке', delta: '+18', up: true, spark: [180,195,210,222,235,240] },
  { ic: 'star', cls: 'purple', val: '786', lab: 'Средний trust score', delta: '+12', up: true, spark: [742,755,763,772,780,786] },
];
const KPIS2 = [
  { ic: 'wallet', cls: 'green', val: '4 210', lab: 'Активных подписок', delta: '87% от базы', up: true, spark: [3650,3820,3960,4080,4170,4210] },
  { ic: 'deal', cls: '', val: '$4,2 млн', lab: 'Сделок в работе · 64', delta: '+11 за месяц', up: true, spark: [38,44,51,57,61,64] },
  { ic: 'globe', cls: 'blue', val: '18 / 7', lab: 'Городов / стран', delta: '+2 города', up: true, spark: [12,13,14,16,17,18] },
  { ic: 'alert', cls: 'purple', val: '7', lab: 'Открытых жалоб · 3 в арбитраже', delta: '−2', up: false, spark: [11,10,9,9,8,7] },
];
const GROWTH = [1900,2150,2380,2700,3050,3380,3720,4050,4300,4520,4690,4820];
const MONTHS = ['Июл','Авг','Сен','Окт','Ноя','Дек','Янв','Фев','Мар','Апр','Май','Июн'];
const REVENUE = [19,21,24,27,30,34,37,40,43,45,47,48];
const FUNNEL = [
  { name: 'Бриф (заявка)', v: 240 }, { name: 'Поручительство', v: 182 }, { name: 'Собеседование', v: 124 },
  { name: 'Проверка СБ', v: 98 }, { name: 'Присяга и документы', v: 79 }, { name: 'Подписка · активация', v: 64 },
];
const RANKS = [
  { label: 'Бронзовый', value: 2410, color: '#C77B4B', cls: 'bronze' },
  { label: 'Серебряный', value: 1290, color: '#B8C0CC', cls: 'silver' },
  { label: 'Золотой', value: 720, color: '#D9B65F', cls: 'gold' },
  { label: 'Платиновый', value: 320, color: '#7FD9C6', cls: 'plat' },
  { label: 'Сапфировый', value: 80, color: '#6BA8FF', cls: 'sapphire' },
];
const rankCls = r => RANKS.find(x => x.label === r)?.cls || 'muted';

const MEMBERS = [
  { name: 'Дмитрий Воронов', city: 'Дубай', rank: 'Сапфировый', role: 'Сенатор', trust: 950, sub: 'active', joined: '2021' },
  { name: 'Александр Петров', city: 'Казань', rank: 'Золотой', role: 'Капитан', trust: 870, sub: 'active', joined: '2022' },
  { name: 'Екатерина Смирнова', city: 'Казань', rank: 'Золотой', role: 'Наставник', trust: 880, sub: 'active', joined: '2022' },
  { name: 'Анна Коваль', city: 'Лондон', rank: 'Платиновый', role: 'Старейшина', trust: 810, sub: 'active', joined: '2021' },
  { name: 'Артур Халилов', city: 'Стамбул', rank: 'Серебряный', role: 'Участник', trust: 830, sub: 'active', joined: '2023' },
  { name: 'Максим Никитин', city: 'Таллин', rank: 'Серебряный', role: 'Участник', trust: 790, sub: 'grace', joined: '2023' },
  { name: 'Мария Лебедева', city: 'Казань', rank: 'Золотой', role: 'Капитан', trust: 805, sub: 'active', joined: '2022' },
  { name: 'Игорь Соколов', city: 'Казань', rank: 'Серебряный', role: 'Наставник', trust: 760, sub: 'active', joined: '2023' },
  { name: 'Алексей Романов', city: 'Сочи', rank: 'Бронзовый', role: 'Участник', trust: 740, sub: 'overdue', joined: '2024' },
  { name: 'Рустам Сафин', city: 'Казань', rank: 'Платиновый', role: 'Сенатор', trust: 905, sub: 'active', joined: '2020' },
  { name: 'Ольга Дьякова', city: 'Москва', rank: 'Серебряный', role: 'Участник', trust: 770, sub: 'active', joined: '2023' },
  { name: 'Тимур Гатауллин', city: 'Казань', rank: 'Сапфировый', role: 'Магистрат', trust: 930, sub: 'active', joined: '2019' },
  { name: 'Карим Юсупов', city: 'Алматы', rank: 'Бронзовый', role: 'Участник', trust: 712, sub: 'overdue', joined: '2024' },
  { name: 'Виктория Лозовая', city: 'Дубай', rank: 'Золотой', role: 'Капитан', trust: 845, sub: 'active', joined: '2022' },
];
const SUB = { active: ['green', 'Активна'], grace: ['amber', 'Оплата ожидается'], overdue: ['red', 'Просрочена'] };

const CANDIDATES = {
  'Бриф': [
    { n: 'Денис Кравцов', c: 'Казань', src: 'Сайт', warr: '—' },
    { n: 'Лейла Ахметова', c: 'Уфа', src: 'Реферал', warr: 'А. Петров' },
    { n: 'Сергей Бойко', c: 'Москва', src: 'Бот', warr: '—' },
  ],
  'Поручительство': [
    { n: 'Игорь Власов', c: 'Казань', src: 'Реферал', warr: 'М. Лебедева' },
    { n: 'Дарья Орлова', c: 'СПб', src: 'Сайт', warr: 'ожидает' },
  ],
  'Собеседование': [
    { n: 'Тимур Исаев', c: 'Казань', src: 'Реферал', warr: 'Р. Сафин', when: '27 июня' },
  ],
  'Проверка СБ': [
    { n: 'Наталья Гром', c: 'Москва', src: 'Реферал', warr: 'А. Коваль', sb: 'в работе' },
    { n: 'Эмиль Закиров', c: 'Казань', src: 'Реферал', warr: 'Т. Гатауллин', sb: 'в работе' },
  ],
  'Присяга': [
    { n: 'Павел Минин', c: 'Сочи', src: 'Реферал', warr: 'А. Романов' },
  ],
  'Активация': [
    { n: 'Алия Сабитова', c: 'Казань', src: 'Реферал', warr: 'Е. Смирнова' },
  ],
};
const CAND_STAGES = ['Бриф', 'Поручительство', 'Собеседование', 'Проверка СБ', 'Присяга', 'Активация'];

const COMPLAINTS = [
  { who: 'Карим Юсупов', on: 'нарушение кодекса', type: 'Кодекс', status: 'arbitration', arb: 'Старейшина А. Коваль', when: '2 дня назад' },
  { who: 'Алексей Романов', on: 'спор по сделке #D-2024-0451', type: 'Сделка', status: 'arbitration', arb: 'Сенатор Р. Сафин', when: '3 дня назад' },
  { who: 'Аноним', on: 'токсичное поведение в чате', type: 'Поведение', status: 'review', arb: '—', when: '5 ч назад' },
  { who: 'Ольга Дьякова', on: 'невыполнение обещания', type: 'Репутация', status: 'arbitration', arb: 'Магистрат', when: '6 дней назад' },
];
const RISKS = [
  { ic: 'alert', cls: 'red', tx: '<b>Карим Юсупов</b> — флаг репутационного риска: 2 жалобы за 30 дней', tm: 'требует решения' },
  { ic: 'wallet', cls: 'amber', tx: '<b>34 подписки</b> просрочены более 5 дней', tm: 'напомнить о списании' },
  { ic: 'scale', cls: 'blue', tx: 'Спор по сделке <b>#D-2024-0451</b> передан в арбитраж', tm: 'назначен арбитр' },
  { ic: 'shield', cls: 'amber', tx: 'Антифрод: 1 платёж помечен на ручную проверку', tm: '1 ч назад' },
];
const FEED = [
  { tx: '<b>Т. Гатауллин</b> одобрил кандидата А. Сабитову', tm: '12 мин назад' },
  { tx: 'Сделка <b>#D-2024-0438</b> перешла в этап «Выполнение этапа 1»', tm: '40 мин назад' },
  { tx: '<b>Р. Сафин</b> назначен арбитром по спору #D-2024-0451', tm: '2 ч назад' },
  { tx: 'Создано мероприятие <b>«Международный форум O.C.T.A.V.E.»</b>', tm: '5 ч назад' },
  { tx: '<b>СБ</b> завершила проверку кандидата Н. Гром — допущена', tm: 'вчера' },
];

const EVENTS = [
  { t: 'Бизнес-ужин O.C.T.A.V.E.', city: 'Казань', date: '15 мая', reg: 42, cap: 50, checkin: 0, status: 'upcoming' },
  { t: 'Стратегическая сессия Капитанов', city: 'Казань', date: '22 мая', reg: 18, cap: 24, checkin: 0, status: 'upcoming' },
  { t: 'Международный форум O.C.T.A.V.E.', city: 'Дубай', date: '5 июня', reg: 210, cap: 300, checkin: 0, status: 'upcoming' },
  { t: 'Мастермайнд «Рост x10»', city: 'Казань', date: '2 апреля', reg: 30, cap: 30, checkin: 28, status: 'past' },
];
const DEALS = [
  { no: '#D-2024-0438', a: 'А. Петров', b: 'Д. Воронов', sum: '$100 000', fee: '$3 000', status: 'active', label: 'Активна' },
  { no: '#D-2024-0451', a: 'А. Романов', b: 'А. Халилов', sum: '$45 000', fee: '$1 350', status: 'dispute', label: 'В споре' },
  { no: '#D-2024-0399', a: 'А. Петров', b: 'Е. Смирнова', sum: '₽ 600 000', fee: '₽ 18 000', status: 'done', label: 'Выполнена' },
  { no: '#D-2024-0467', a: 'Р. Сафин', b: 'В. Лозовая', sum: '$220 000', fee: '$6 600', status: 'review', label: 'На согласовании' },
];
const DEAL_ST = { active: 'green', dispute: 'red', done: 'blue', review: 'amber' };
const FINANCE = [
  { ic: 'wallet', n: 'Членские взносы (10 000 ₽/мес)', v: '42,1 млн ₽', d: '4 210 активных подписок' },
  { ic: 'deal', n: 'Комиссия с внутренних сделок', v: '4,8 млн ₽', d: 'escrow · 3% средняя' },
  { ic: 'cal', n: 'Мероприятия и билеты', v: '1,3 млн ₽', d: 'офлайн-события' },
  { ic: 'star', n: 'Премиальные привилегии', v: '0,9 млн ₽', d: 'Платина / Сапфир' },
];
const FINANCE_OUT = [
  { n: 'Инвестиционные выплаты участникам', v: '12,4 млн ₽' },
  { n: 'Вознаграждения за вовлечение (1 / 2 ур.)', v: '5,1 млн ₽' },
  { n: 'Операционные расходы сообщества', v: '8,7 млн ₽' },
];
const GROUPS = [
  { n: 'Форум-группа №3', cap: 'А. Петров', mentor: 'И. Соколов', city: 'Казань', m: 8, full: 8, act: 96 },
  { n: 'Форум-группа №7', cap: 'М. Лебедева', mentor: 'Е. Смирнова', city: 'Казань', m: 5, full: 8, act: 71 },
  { n: 'Форум-группа №5', cap: 'Д. Воронов', mentor: 'А. Коваль', city: 'Дубай', m: 8, full: 8, act: 88 },
  { n: 'Форум-группа №12', cap: 'Р. Сафин', mentor: 'Т. Гатауллин', city: 'Казань', m: 7, full: 8, act: 82 },
];
const GEO = [
  { f: '🇷🇺', n: 'Россия', cities: 'Казань, Москва, СПб, Сочи, Уфа', m: 3120, sen: 'Р. Сафин' },
  { f: '🇦🇪', n: 'ОАЭ', cities: 'Дубай, Абу-Даби', m: 720, sen: 'Д. Воронов' },
  { f: '🇰🇿', n: 'Казахстан', cities: 'Алматы, Астана', m: 410, sen: 'вакансия' },
  { f: '🇹🇷', n: 'Турция', cities: 'Стамбул', m: 280, sen: 'А. Халилов' },
  { f: '🇬🇧', n: 'Великобритания', cities: 'Лондон', m: 160, sen: 'А. Коваль' },
  { f: '🇪🇪', n: 'Эстония', cities: 'Таллин', m: 90, sen: 'вакансия' },
  { f: '🇷🇸', n: 'Сербия', cities: 'Белград', m: 40, sen: 'вакансия' },
];
const ROLES = ['Основатель', 'Кардинал', 'Президент', 'Сенатор', 'Старейшина', 'Наставник', 'Капитан', 'Участник', 'Служба безопасности'];
const PERMS = ['Просмотр', 'Модерация', 'Финансы', 'Роли и доступы', 'Проверки СБ', 'Арбитраж'];
const RBAC = {
  'Основатель': [1,1,1,1,1,1], 'Кардинал': [1,1,1,1,0,1], 'Президент': [1,1,1,1,0,1],
  'Сенатор': [1,1,0,0,0,1], 'Старейшина': [1,1,0,0,0,1], 'Наставник': [1,1,0,0,0,0],
  'Капитан': [1,1,0,0,0,0], 'Участник': [1,0,0,0,0,0], 'Служба безопасности': [1,1,0,0,1,0],
};
const AUDIT = [
  { who: 'Т. Гатауллин', act: 'Одобрил кандидата', obj: 'А. Сабитова', tm: 'Сегодня, 18:42', role: 'Магистрат' },
  { who: 'Р. Сафин', act: 'Назначен арбитром', obj: 'спор #D-2024-0451', tm: 'Сегодня, 16:10', role: 'Сенатор' },
  { who: 'Система', act: 'Списание взноса', obj: '128 участников', tm: 'Сегодня, 09:00', role: 'Финансы' },
  { who: 'А. Коваль', act: 'Изменила роль', obj: 'И. Соколов → Наставник', tm: 'Вчера, 14:20', role: 'Старейшина' },
  { who: 'СБ', act: 'Завершила проверку', obj: 'Н. Гром — допущена', tm: 'Вчера, 11:05', role: 'Служба безопасности' },
  { who: 'Т. Гатауллин', act: 'Заблокировал доступ', obj: 'К. Юсупов (риск)', tm: '2 дня назад', role: 'Магистрат' },
];

/* ---------------- nav ---------------- */
const NAV = [
  { group: 'Обзор', items: [['dashboard', 'Дашборд', 'dash']] },
  { group: 'Сообщество', items: [['members', 'Участники', 'users'], ['candidates', 'Кандидаты', 'userplus', 240], ['groups', 'Форум-группы', 'group'], ['events', 'Мероприятия', 'cal']] },
  { group: 'Доверие и безопасность', items: [['reputation', 'Репутация и жалобы', 'scale', 7], ['security', 'Безопасность · СБ', 'shield']] },
  { group: 'Операции', items: [['deals', 'Сделки (escrow)', 'deal'], ['finance', 'Финансы', 'wallet'], ['content', 'Обучение и контент', 'book']] },
  { group: 'Управление', items: [['geography', 'География', 'globe'], ['roles', 'Роли и доступы', 'key'], ['audit', 'Журнал действий', 'history']] },
];
const TITLES = { dashboard: 'Обзор', members: 'Участники', candidates: 'Кандидаты — воронка вступления', groups: 'Форум-группы', events: 'Мероприятия', reputation: 'Репутация и жалобы', security: 'Безопасность · служба безопасности', deals: 'Сделки и безопасные расчёты', finance: 'Финансы сообщества', content: 'Обучение и контент', geography: 'География и отделения', roles: 'Роли и доступы (RBAC)', audit: 'Журнал действий администрации' };

/* ---------------- helpers ---------------- */
function panel(title, body, opts = {}) {
  return `<div class="panel ${opts.cls || ''}"><div class="panel-head"><div><h3>${esc(title)}</h3>${opts.sub ? `<div class="sub">${esc(opts.sub)}</div>` : ''}</div>${opts.action || ''}</div>${body}</div>`;
}
function kpiCard(k) {
  return `<div class="kpi"><div class="k-top"><div class="k-ic ${k.cls}">${I[k.ic]}</div><span class="delta ${k.up ? 'up' : 'down'}">${I[k.up ? 'up' : 'down']}${k.delta}</span></div>
    <div class="k-val">${k.val}</div><div class="k-lab">${k.lab}</div>${spark(k.spark, k.up ? '#46C97E' : '#FF5D5D')}</div>`;
}
const scoreCls = t => t >= 850 ? 'hi' : t >= 760 ? 'mid' : 'lo';

/* ---------------- views ---------------- */
const V = {};

V.dashboard = () => `
  <div class="page-head"><div><div class="pt">Обзор сообщества</div><div class="ps">Ключевые метрики, рост, воронка вступления и зоны внимания</div></div>
    <div class="seg"><button class="on">Месяц</button><button onclick="AD.toast('Период: квартал')">Квартал</button><button onclick="AD.toast('Период: год')">Год</button></div></div>
  <div class="grid cols-4" style="margin-bottom:16px">${KPIS.map(kpiCard).join('')}</div>
  <div class="grid cols-4" style="margin-bottom:16px">${KPIS2.map(kpiCard).join('')}</div>

  <div class="grid cols-2" style="margin-bottom:16px">
    ${panel('Рост сообщества', `<div class="chart-wrap">${lineArea(GROWTH, { labels: MONTHS, max: 5200 })}</div>
      <div class="legend"><div class="lg"><span class="dot" style="background:#D9B65F"></span>Участники, всего</div><div class="lg" style="margin-left:auto;color:var(--gold-1)">Цель: 1 000 000 за 10 лет · 0,48%</div></div>`, { sub: 'Последние 12 месяцев' })}
    ${panel('Выручка', `<div class="chart-wrap">${bars(REVENUE, { labels: MONTHS })}</div>
      <div class="legend"><div class="lg"><span class="dot" style="background:#D9B65F"></span>млн ₽ / мес</div><div class="lg" style="margin-left:auto">Итого за год: <b style="color:var(--tx);margin-left:4px">417 млн ₽</b></div></div>`, { sub: 'Взносы + комиссии + события' })}
  </div>

  <div class="grid cols-3" style="margin-bottom:16px">
    ${panel('Воронка вступления', funnelHTML(), { sub: 'Бриф → активация', cls: 'span-2' })}
    ${panel('Звания участников', `<div class="donut-wrap"><div>${donut(RANKS)}</div><div class="legend" style="flex-direction:column;gap:9px">
      ${RANKS.map(r => `<div class="lg"><span class="dot" style="background:${r.color}"></span>${r.label}<b style="color:var(--tx);margin-left:6px">${fmt(r.value)}</b></div>`).join('')}</div></div>`)}
  </div>

  <div class="grid cols-2">
    ${panel('Зоны внимания', RISKS.map(r => `<div class="alert"><div class="a-ic ${r.cls}">${I[r.ic]}</div><div><div class="a-tx">${r.tx}</div><div class="a-tm">${r.tm}</div></div></div>`).join(''), { sub: 'Требуют решения', action: `<button class="btn ghost sm" onclick="AD.toast('Открываю все уведомления')">Все</button>` })}
    ${panel('Последние действия', `<div class="feed">${FEED.map(f => `<div class="fi"><span class="fd"></span><div><div>${f.tx}</div><div class="ft">${f.tm}</div></div></div>`).join('')}</div>`, { action: `<button class="btn ghost sm" onclick="AD.go('audit')">Журнал</button>` })}
  </div>`;

function funnelHTML() {
  const max = FUNNEL[0].v;
  return `<div class="funnel">${FUNNEL.map((s, i) => {
    const pct = Math.round(s.v / max * 100), conv = i ? Math.round(s.v / FUNNEL[i - 1].v * 100) : 100;
    return `<div class="fstep"><div class="fbar" style="width:${Math.max(pct, 16)}%">${s.v}</div>
      <div class="fmeta"><div class="fname">${esc(s.name)}</div><div class="fconv">${i ? `конверсия ${conv}% с прошлого этапа` : 'все заявки'}</div></div></div>`;
  }).join('')}</div>
  <div class="kv" style="margin-top:14px;border-top:1px solid var(--line);padding-top:14px"><span class="k">Итоговая конверсия в участника</span><span class="v" style="color:var(--gold-1)">27%</span></div>`;
}

V.members = () => {
  const rows = MEMBERS.map(m => `<tr>
    <td><div class="u">${avatar(m.name)}<div><div class="nm">${esc(m.name)}</div><div class="sub">${esc(m.city)} · с ${m.joined}</div></div></div></td>
    <td><span class="tag ${rankCls(m.rank)}">${m.rank}</span></td>
    <td>${esc(m.role)}</td>
    <td class="num"><span class="score ${scoreCls(m.trust)}">${m.trust}</span></td>
    <td><span class="tag ${SUB[m.sub][0]}">${SUB[m.sub][1]}</span></td>
    <td><button class="btn ghost sm" onclick="AD.toast('Карточка участника: ${esc(m.name)}')">Открыть</button></td></tr>`).join('');
  return `<div class="page-head"><div><div class="pt">Участники · ${fmt(4820)}</div><div class="ps">Единая база: звание, роль, репутация, подписка</div></div>
    <button class="btn gold" onclick="AD.toast('Экспорт базы участников (CSV)')">${I.dl} Экспорт</button></div>
    <div class="filter-row">
      <button class="chip on">Все</button><button class="chip" onclick="AD.toast('Фильтр: Сапфир/Платина')">Высокие звания</button>
      <button class="chip" onclick="AD.toast('Фильтр: просрочка')">Просрочка подписки</button><button class="chip" onclick="AD.toast('Фильтр: риск')">Репутационный риск</button>
      <div class="top-search" style="width:auto;margin-left:auto">${I.search}<input placeholder="Поиск участника…" oninput="AD.toast('Поиск по базе')"></div></div>
    ${panel('', `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Участник</th><th>Звание</th><th>Роль</th><th>Trust</th><th>Подписка</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`)}`;
};

V.candidates = () => {
  const cols = CAND_STAGES.map(st => {
    const list = CANDIDATES[st] || [];
    return `<div class="kcol"><div class="kcol-head"><span>${esc(st)}</span><span class="n">${list.length}</span></div>
      ${list.map(c => `<div class="kcard"><div class="kc-top">${avatar(c.n)}<div><div class="kc-nm">${esc(c.n)}</div><div class="kc-sub">${esc(c.c)}</div></div></div>
        <div class="kc-meta">Источник: ${esc(c.src)}<br>Поручитель: ${esc(c.warr)}${c.when ? `<br>Собеседование: ${esc(c.when)}` : ''}${c.sb ? `<br>СБ: ${esc(c.sb)}` : ''}</div>
        <div class="kc-act"><button class="btn green sm" onclick="AD.toast('Кандидат продвинут: ${esc(c.n)}')">${I.check} Дальше</button><button class="btn danger sm icon" onclick="AD.toast('Кандидат отклонён: ${esc(c.n)}')">${I.x}</button></div></div>`).join('') || `<div class="mut3" style="font-size:12px;padding:8px 2px">пусто</div>`}</div>`;
  }).join('');
  return `<div class="page-head"><div><div class="pt">Воронка вступления</div><div class="ps">Бриф → Поручительство → Собеседование → Проверка СБ → Присяга → Активация</div></div>
    <button class="btn gold" onclick="AD.toast('Новая заявка кандидата')">${I.plus} Добавить</button></div>
    <div class="kanban">${cols}</div>
    <div class="grid cols-3" style="margin-top:16px">
      ${panel('Конверсия воронки', funnelHTML())}
      ${panel('Источники заявок', `<div class="kv"><span class="k">Реферал участника</span><span class="v">61%</span></div><div class="kv"><span class="k">Сайт</span><span class="v">24%</span></div><div class="kv"><span class="k">Telegram-бот</span><span class="v">15%</span></div>`, { cls: 'span-2', sub: 'За 30 дней · реферальная ссылка работает' })}
    </div>`;
};

V.groups = () => panel('Форум-группы и восьмёрки', `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Группа</th><th>Капитан</th><th>Наставник</th><th>Город</th><th>Состав</th><th>Активность</th><th></th></tr></thead><tbody>
  ${GROUPS.map(g => `<tr><td><b>${esc(g.n)}</b></td><td>${esc(g.cap)}</td><td>${esc(g.mentor)}</td><td>${esc(g.city)}</td>
    <td><span class="tag ${g.m === g.full ? 'green' : 'amber'}">${g.m}/${g.full}</span></td>
    <td style="min-width:140px"><div class="bar"><i style="width:${g.act}%"></i></div><span class="mut3" style="font-size:11px">${g.act}%</span></td>
    <td><button class="btn ghost sm" onclick="AD.toast('Аналитика группы: ${esc(g.n)}')">Открыть</button></td></tr>`).join('')}
  </tbody></table></div>`, { sub: 'Структура Капитан — Наставник — Старейшина', action: `<button class="btn gold sm" onclick="AD.toast('Создание форум-группы')">${I.plus} Группа</button>` });

V.events = () => `<div class="page-head"><div><div class="pt">Мероприятия</div><div class="ps">Регистрации, приоритет по званию, QR check-in, посещаемость</div></div>
  <button class="btn gold" onclick="AD.toast('Создание мероприятия')">${I.plus} Создать</button></div>
  ${panel('', `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Мероприятие</th><th>Город</th><th>Дата</th><th>Регистрации</th><th>Check-in</th><th>Статус</th></tr></thead><tbody>
  ${EVENTS.map(e => `<tr><td><b>${esc(e.t)}</b></td><td>${esc(e.city)}</td><td>${esc(e.date)}</td>
    <td style="min-width:150px"><div class="bar"><i style="width:${Math.round(e.reg / e.cap * 100)}%"></i></div><span class="mut3" style="font-size:11px">${e.reg}/${e.cap}</span></td>
    <td>${e.status === 'past' ? `<b>${e.checkin}</b> <span class="mut3">(${Math.round(e.checkin / e.reg * 100)}%)</span>` : '<span class="mut3">—</span>'}</td>
    <td><span class="tag ${e.status === 'past' ? 'muted' : 'green'}">${e.status === 'past' ? 'Прошло' : 'Открыта регистрация'}</span></td></tr>`).join('')}
  </tbody></table></div>`)}`;

V.reputation = () => `<div class="page-head"><div><div class="pt">Репутация и жалобы</div><div class="ps">Trust score, жалобы, арбитраж, репутационные риски</div></div></div>
  <div class="grid cols-4" style="margin-bottom:16px">
    ${kpiCard({ ic: 'star', cls: 'purple', val: '786', lab: 'Средний trust score', delta: '+12', up: true, spark: [763,772,780,786] })}
    ${kpiCard({ ic: 'alert', cls: '', val: '7', lab: 'Открытых жалоб', delta: '−2', up: false, spark: [11,9,8,7] })}
    ${kpiCard({ ic: 'scale', cls: 'blue', val: '3', lab: 'Кейсов в арбитраже', delta: '1 новый', up: false, spark: [2,2,3,3] })}
    ${kpiCard({ ic: 'shield', cls: 'green', val: '99,1%', lab: 'Без жалоб за квартал', delta: '+0.3%', up: true, spark: [98.5,98.8,99,99.1] })}
  </div>
  ${panel('Жалобы и арбитраж', `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>На кого</th><th>Суть</th><th>Тип</th><th>Арбитр</th><th>Статус</th><th></th></tr></thead><tbody>
    ${COMPLAINTS.map(c => `<tr><td><b>${esc(c.who)}</b></td><td>${esc(c.on)}</td><td><span class="tag muted">${c.type}</span></td><td>${esc(c.arb)}</td>
      <td><span class="tag ${c.status === 'arbitration' ? 'amber' : 'blue'}">${c.status === 'arbitration' ? 'Арбитраж' : 'На рассмотрении'}</span></td>
      <td><button class="btn ghost sm" onclick="AD.toast('Открываю кейс')">Кейс</button></td></tr>`).join('')}
  </tbody></table></div>`, { sub: 'Влияет на репутацию по итогам решения' })}`;

V.security = () => `<div class="page-head"><div><div class="pt">Безопасность · СБ</div><div class="ps">Проверки кандидатов, поручительства, 2FA, антифрод, аудит</div></div></div>
  <div class="grid cols-4" style="margin-bottom:16px">
    ${kpiCard({ ic: 'shield', cls: 'green', val: '98', lab: 'Пройдено проверок СБ', delta: '+12', up: true, spark: [70,82,95,98] })}
    ${kpiCard({ ic: 'userplus', cls: 'blue', val: '2', lab: 'Проверки в работе', delta: 'в очереди', up: true, spark: [3,3,2,2] })}
    ${kpiCard({ ic: 'key', cls: 'purple', val: '100%', lab: '2FA у критических ролей', delta: 'включено', up: true, spark: [88,94,99,100] })}
    ${kpiCard({ ic: 'alert', cls: '', val: '1', lab: 'Антифрод-флаг', delta: 'ручная проверка', up: false, spark: [3,2,1,1] })}
  </div>
  <div class="grid cols-2">
    ${panel('Проверки кандидатов (СБ)', `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Кандидат</th><th>Поручитель</th><th>Статус</th></tr></thead><tbody>
      <tr><td>Наталья Гром</td><td>А. Коваль</td><td><span class="tag amber">В работе</span></td></tr>
      <tr><td>Эмиль Закиров</td><td>Т. Гатауллин</td><td><span class="tag amber">В работе</span></td></tr>
      <tr><td>Наталья Гром (повтор)</td><td>—</td><td><span class="tag green">Допущена</span></td></tr></tbody></table></div>`)}
    ${panel('Контроль безопасности', `
      <div class="kv"><span class="k">RBAC / ABAC модель прав</span><span class="v" style="color:var(--green)">Активна</span></div>
      <div class="kv"><span class="k">Шифрование данных и сообщений</span><span class="v" style="color:var(--green)">Вкл</span></div>
      <div class="kv"><span class="k">Аудит действий администрации</span><span class="v" style="color:var(--green)">Ведётся</span></div>
      <div class="kv"><span class="k">Антифрод по сделкам и платежам</span><span class="v" style="color:var(--green)">Вкл</span></div>
      <div class="kv"><span class="k">Логи критических операций</span><span class="v" style="color:var(--green)">90 дней</span></div>`, { sub: 'Соответствие требованиям ТЗ' })}
  </div>`;

V.deals = () => `<div class="page-head"><div><div class="pt">Сделки и безопасные расчёты</div><div class="ps">Платформа — гарант (escrow), комиссия, этапы, арбитраж</div></div></div>
  <div class="grid cols-4" style="margin-bottom:16px">
    ${kpiCard({ ic: 'deal', cls: '', val: '64', lab: 'Сделок в работе', delta: '+11', up: true, spark: [51,57,61,64] })}
    ${kpiCard({ ic: 'ruble', cls: 'green', val: '$4,2 млн', lab: 'Объём в escrow', delta: '+14%', up: true, spark: [3.1,3.6,3.9,4.2] })}
    ${kpiCard({ ic: 'wallet', cls: 'blue', val: '4,8 млн ₽', lab: 'Комиссия за месяц', delta: '+9%', up: true, spark: [3.9,4.2,4.5,4.8] })}
    ${kpiCard({ ic: 'scale', cls: 'purple', val: '1', lab: 'Спор в арбитраже', delta: 'назначен арбитр', up: false, spark: [2,2,1,1] })}
  </div>
  ${panel('', `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Сделка</th><th>Стороны</th><th>Сумма</th><th>Комиссия</th><th>Статус</th><th></th></tr></thead><tbody>
    ${DEALS.map(d => `<tr><td><b>${d.no}</b></td><td>${esc(d.a)} ⇄ ${esc(d.b)}</td><td class="num">${d.sum}</td><td class="num" style="color:var(--gold-1)">${d.fee}</td>
      <td><span class="tag ${DEAL_ST[d.status]}">${d.label}</span></td><td><button class="btn ghost sm" onclick="AD.toast('Карточка сделки ${d.no}')">Открыть</button></td></tr>`).join('')}
  </tbody></table></div>`)}`;

V.finance = () => `<div class="page-head"><div><div class="pt">Финансы сообщества</div><div class="ps">Выручка, MRR, взносы, ledger, выплаты</div></div>
  <button class="btn gold" onclick="AD.toast('Финансовый отчёт (PDF)')">${I.dl} Отчёт</button></div>
  <div class="grid cols-4" style="margin-bottom:16px">
    ${kpiCard({ ic: 'ruble', cls: 'green', val: '48,2 млн ₽', lab: 'Выручка за месяц', delta: '+9.4%', up: true, spark: [43,45,47,48] })}
    ${kpiCard({ ic: 'wallet', cls: '', val: '42,1 млн ₽', lab: 'MRR (подписки)', delta: '+6%', up: true, spark: [38,40,41,42] })}
    ${kpiCard({ ic: 'trend', cls: 'blue', val: '417 млн ₽', lab: 'Выручка за год', delta: 'прогноз 560+', up: true, spark: [300,350,390,417] })}
    ${kpiCard({ ic: 'deal', cls: 'purple', val: '3%', lab: 'Средняя комиссия сделок', delta: 'escrow', up: true, spark: [3,3,3,3] })}
  </div>
  <div class="grid cols-2" style="margin-bottom:16px">
    ${panel('Динамика выручки', `<div class="chart-wrap">${bars(REVENUE, { labels: MONTHS })}</div>`, { sub: 'млн ₽ / мес' })}
    ${panel('Структура доходов', FINANCE.map(f => `<div class="kv"><span class="k">${esc(f.n)}<div class="mut3" style="font-size:11px">${esc(f.d)}</div></span><span class="v">${f.v}</span></div>`).join(''))}
  </div>
  ${panel('Выплаты и расходы', FINANCE_OUT.map(f => `<div class="kv"><span class="k">${esc(f.n)}</span><span class="v" style="color:var(--amber)">${f.v}</span></div>`).join('') + `<div class="kv" style="border-top:1px solid var(--line-2);margin-top:6px"><span class="k"><b>Чистый результат месяца</b></span><span class="v" style="color:var(--green)">+21,9 млн ₽</span></div>`, { sub: 'Модель пая, инвестдоход, вознаграждения за вовлечение' })}`;

V.content = () => `<div class="page-head"><div><div class="pt">Обучение и контент</div><div class="ps">Курсы, треки развития, база знаний, материалы по ролям</div></div>
  <button class="btn gold" onclick="AD.toast('Добавить материал')">${I.plus} Материал</button></div>
  <div class="grid cols-3" style="margin-bottom:16px">
    ${kpiCard({ ic: 'book', cls: '', val: '38', lab: 'Материалов опубликовано', delta: '+5', up: true, spark: [28,32,35,38] })}
    ${kpiCard({ ic: 'users', cls: 'green', val: '2 940', lab: 'Активных учеников', delta: '+12%', up: true, spark: [2400,2600,2800,2940] })}
    ${kpiCard({ ic: 'trend', cls: 'blue', val: '64%', lab: 'Средний прогресс трека', delta: '+4%', up: true, spark: [56,59,62,64] })}
  </div>
  ${panel('Материалы', `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Материал</th><th>Тип</th><th>Доступ по роли</th><th>Прогресс</th></tr></thead><tbody>
    <tr><td><b>Трек: Масштабирование до 1 млрд ₽</b></td><td>Трек · 8 модулей</td><td>Капитан+</td><td class="num">72%</td></tr>
    <tr><td><b>Курс капитана форум-группы</b></td><td>Курс</td><td>Капитан</td><td class="num">85%</td></tr>
    <tr><td><b>Безопасные сделки (escrow)</b></td><td>Видео</td><td>Все</td><td class="num">61%</td></tr>
    <tr><td><b>Кодекс сообщества O.C.T.A.V.E.</b></td><td>База знаний</td><td>Все</td><td class="num">94%</td></tr>
    <tr><td><b>Материалы Старейшины</b></td><td>Закрытый</td><td>Старейшина+</td><td class="num">48%</td></tr></tbody></table></div>`)}`;

V.geography = () => {
  const max = Math.max(...GEO.map(g => g.m));
  return `<div class="page-head"><div><div class="pt">География и отделения</div><div class="ps">Страны, города, сенаторы, локальная активность · масштабирование</div></div>
    <button class="btn gold" onclick="AD.toast('Новое отделение')">${I.plus} Отделение</button></div>
    <div class="grid cols-3" style="margin-bottom:16px">
      ${kpiCard({ ic: 'globe', cls: 'blue', val: '7', lab: 'Стран присутствия', delta: '+1', up: true, spark: [5,6,6,7] })}
      ${kpiCard({ ic: 'pin', cls: '', val: '18', lab: 'Городов', delta: '+2', up: true, spark: [14,16,17,18] })}
      ${kpiCard({ ic: 'flag', cls: 'purple', val: '4', lab: 'Вакансии сенаторов', delta: 'нужны лидеры', up: false, spark: [6,5,5,4] })}
    </div>
    ${panel('Отделения по странам', GEO.map(g => `<div class="geo-row"><div class="flag">${g.f}</div>
      <div style="flex:1;min-width:0"><div class="gn">${esc(g.n)}</div><div class="gs">${esc(g.cities)} · сенатор: ${g.sen === 'вакансия' ? '<span style="color:var(--amber)">вакансия</span>' : esc(g.sen)}</div></div>
      <div class="gbar bar"><i style="width:${Math.round(g.m / max * 100)}%"></i></div><div class="gv">${fmt(g.m)}</div></div>`).join(''), { sub: 'Выход в новые города — через доверенную рекомендацию' })}`;
};

V.roles = () => `<div class="page-head"><div><div class="pt">Роли и доступы (RBAC)</div><div class="ps">Иерархия сообщества и матрица прав доступа</div></div></div>
  <div class="grid cols-2" style="margin-bottom:16px;grid-template-columns:1.6fr 1fr">
    ${panel('Матрица доступов', `<div class="tbl-wrap"><table class="rbac"><thead><tr><th>Роль</th>${PERMS.map(p => `<th>${p}</th>`).join('')}</tr></thead><tbody>
      ${ROLES.map(r => `<tr><td>${esc(r)}</td>${RBAC[r].map(v => `<td>${v ? `<span class="ok">${I.check}</span>` : '<span class="no">—</span>'}</td>`).join('')}</tr>`).join('')}
    </tbody></table></div>`, { sub: 'RBAC / ABAC · 2FA для критических ролей' })}
    ${panel('Иерархия', `<div class="feed">${['Основатели', 'Кардиналы', 'Президент', 'Инвестиционный комитет', 'Магистрат', 'Верховный Сенат', 'Сенаторы', 'Старейшины', 'Наставники', 'Капитаны', 'Участники'].map((r, i) => `<div class="fi"><span class="fd" style="background:${i < 4 ? '#D9B65F' : i < 8 ? '#7FD9C6' : '#6E6C76'}"></span><div>${esc(r)}</div></div>`).join('')}</div>`, { sub: 'По кодексу сообщества' })}
  </div>`;

V.audit = () => `<div class="page-head"><div><div class="pt">Журнал действий администрации</div><div class="ps">Полная история критических операций и решений</div></div>
  <button class="btn ghost" onclick="AD.toast('Экспорт журнала')">${I.dl} Экспорт</button></div>
  ${panel('', `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Время</th><th>Кто</th><th>Роль</th><th>Действие</th><th>Объект</th></tr></thead><tbody>
    ${AUDIT.map(a => `<tr><td class="mut3">${esc(a.tm)}</td><td><b>${esc(a.who)}</b></td><td><span class="tag muted">${esc(a.role)}</span></td><td>${esc(a.act)}</td><td>${esc(a.obj)}</td></tr>`).join('')}
  </tbody></table></div>`, { sub: 'Хранение 90 дней · неизменяемый лог' })}`;

/* ---------------- router ---------------- */
let current = 'dashboard';
function renderNav() {
  $('#nav').innerHTML = NAV.map(g => `<div class="nav-group">${g.group}</div>` + g.items.map(([id, label, ic, badge]) =>
    `<a href="#${id}" class="${id === current ? 'on' : ''}" onclick="AD.go('${id}');return false">${I[ic]}<span>${label}</span>${badge ? `<span class="badge-n">${badge}</span>` : ''}</a>`).join('')).join('');
  $('#sideUser').innerHTML = `${avatar(ADMIN.name)}<div><div class="nm">${esc(ADMIN.name)}</div><div class="rl">${esc(ADMIN.role)}</div></div>`;
}
function render() {
  $('#pageTitle').textContent = TITLES[current] || 'Обзор';
  view.innerHTML = (V[current] || V.dashboard)();
  renderNav();
  $('#view').scrollTop = 0;
  document.querySelector('.main').scrollTop = 0;
}
let toastTimer;
const AD = {
  go(id) { current = id; closeNav(); render(); window.scrollTo(0, 0); },
  toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200); },
};
window.AD = AD;
function openNav() { $('#admin').classList.add('nav-open'); $('#scrim').classList.add('show'); }
function closeNav() { $('#admin').classList.remove('nav-open'); $('#scrim').classList.remove('show'); }

/* ---------------- boot ---------------- */
$('#searchIco').innerHTML = I.search;
$('#bellBtn').innerHTML = I.bell;
$('#burger').innerHTML = I.menu;
$('#burger').addEventListener('click', openNav);
$('#scrim').addEventListener('click', closeNav);
$('#bellBtn').addEventListener('click', () => AD.toast('4 новых события требуют внимания'));
$('#topSearch')?.addEventListener('input', () => AD.toast('Глобальный поиск по кабинету'));
if (location.hash && V[location.hash.slice(1)]) current = location.hash.slice(1);
render();
