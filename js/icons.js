/* Ícones SVG originais, minimalistas, em estilo "traço de circuito".
   Usados para ilustrar módulos e questões — nenhum recurso externo. */
const ICONS = {
  network: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="10" r="4" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="36" r="4" stroke="currentColor" stroke-width="2"/><circle cx="38" cy="36" r="4" stroke="currentColor" stroke-width="2"/><path d="M24 14v10M24 24l-11 8M24 24l11 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  chip: `<svg viewBox="0 0 48 48" fill="none"><rect x="14" y="14" width="20" height="20" rx="2" stroke="currentColor" stroke-width="2"/><rect x="20" y="20" width="8" height="8" rx="1" stroke="currentColor" stroke-width="2"/><path d="M18 14V7M24 14V7M30 14V7M18 34v7M24 34v7M30 34v7M14 18H7M14 24H7M14 30H7M34 18h7M34 24h7M34 30h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  gear: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="7" stroke="currentColor" stroke-width="2"/><path d="M24 5v6M24 37v6M43 24h-6M11 24H5M36.6 11.4l-4.2 4.2M15.6 32.4l-4.2 4.2M36.6 36.6l-4.2-4.2M15.6 15.6l-4.2-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  lock: `<svg viewBox="0 0 48 48" fill="none"><rect x="12" y="22" width="24" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M17 22v-6a7 7 0 0 1 14 0v6" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="31" r="2.4" fill="currentColor"/></svg>`,

  sensor: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="4" fill="currentColor"/><path d="M17 17a10 10 0 0 1 14 0M12 12a17 17 0 0 1 24 0M31 31a10 10 0 0 1-14 0M36 36a17 17 0 0 1-24 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  cloud: `<svg viewBox="0 0 48 48" fill="none"><path d="M15 34a8 8 0 0 1 1-16 10 10 0 0 1 19.4-3A7 7 0 0 1 34 34H15z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,

  brain: `<svg viewBox="0 0 48 48" fill="none"><path d="M20 10a5 5 0 0 0-5 5v1a5 5 0 0 0-3 8 5 5 0 0 0 3 8v1a5 5 0 0 0 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M28 10a5 5 0 0 1 5 5v1a5 5 0 0 1 3 8 5 5 0 0 1-3 8v1a5 5 0 0 1-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M24 12v24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  factory: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 40V22l9 6v-6l9 6v-6l9 6V14h5v26H8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 14v-4M20 14v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  city: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 40V16l7-5 7 5v24M22 40V10l7-5 7 5v30" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 24h2M12 30h2M26 20h2M26 26h2M26 32h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  farm: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 40h32M14 40V22l10-8 10 8v18" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M20 40v-8h8v8" stroke="currentColor" stroke-width="2"/><path d="M6 40l6-6M42 40l-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

  home: `<svg viewBox="0 0 48 48" fill="none"><path d="M9 22l15-12 15 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 19v19h22V19" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M20 38v-9h8v9" stroke="currentColor" stroke-width="2"/></svg>`,

  clock: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="15" stroke="currentColor" stroke-width="2"/><path d="M24 15v9l7 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  globe: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="15" stroke="currentColor" stroke-width="2"/><path d="M9 24h30M24 9a22 22 0 0 1 0 30 22 22 0 0 1 0-30z" stroke="currentColor" stroke-width="2"/></svg>`,

  target: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="8" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="2" fill="currentColor"/></svg>`
};

function getIcon(name){
  return ICONS[name] || ICONS.network;
}
