import data from "../i18n/data.json";

const ED: Record<string, any> = data.ed;

const I = {
  sel: '<path d="M5 3l14 8-6 2-3 6z" fill="currentColor"/>',
  crop: '<path d="M7 2v13a2 2 0 0 0 2 2h13M2 7h13a2 2 0 0 1 2 2v13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  arrow: '<path d="M5 19L19 5M10 5h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  rect: '<rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>',
  oval: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/>',
  text: '<text x="12" y="17" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" font-family="-apple-system, sans-serif">Aa</text>',
  num: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor" font-family="-apple-system, sans-serif">1</text>',
  hl: '<path d="M6 18l9-9 3 3-9 9H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  pix: '<g fill="currentColor"><rect x="4" y="4" width="4.5" height="4.5"/><rect x="14" y="4" width="4.5" height="4.5"/><rect x="9" y="9" width="4.5" height="4.5"/><rect x="4" y="14" width="4.5" height="4.5"/><rect x="14" y="14" width="4.5" height="4.5"/></g>',
  undo: '<path d="M9 7H5V3M5 7a8 8 0 1 1-1 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
};
const svg = k => `<svg viewBox="0 0 24 24">${I[k]}</svg>`;

export function shotHTML(mode, lang) {
  const s = ED[lang], dir = lang === "ar" ? "rtl" : "ltr";
  return `<div class="shot" dir="${dir}">
  <div class="col">
    <div class="brand"><i></i>${s.store}</div>
    <h5>${s.sum}</h5>
    <div class="item"><i></i><div><b>${s.item}</b><span>${s.itemSub}</span></div></div>
    <div class="line"><span>${s.sub}</span><span class="num">$48.00</span></div>
    <div class="line"><span>${s.tax}</span><span class="num">$0.00</span></div>
    <div class="line total"><span>${s.total}</span><span class="num">$48.00</span>
      <svg class="mk mk-arrow" viewBox="0 0 60 44" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4C22 6 38 16 50 34"/><path d="M38 31l12 4 2-12"/></svg>
    </div>
  </div>
  <div class="col">
    <h5>${s.pay}</h5>
    <div><label>${s.email}</label><div class="in"><span class="num">sara@example.com</span></div></div>
    <div class="card"><label>${s.card}</label><div class="in" style="position:relative"><span class="num">4242 4242 4242 4242</span><span class="mosaic"></span><span class="mk mk-pix"></span></div></div>
    <div><label>${s.promo}</label><div class="promo"><div class="in"><span class="ph">${s.promoPh}</span></div><div class="apply">${s.apply}</div><span class="mk mk-box"></span><span class="mk mk-n mk-n1">1</span><span class="mk mk-note">${s.note}</span></div></div>
    <div class="pay">${s.payBtn}<span class="mk mk-n mk-n2">2</span></div>
  </div>
</div>`;
}

function sideHTML(mode, s, lang) {
  const seg = on => `<div class="ed-seg"><span class="${on === 0 ? "on" : ""}">${s.style}</span><span class="${on === 1 ? "on" : ""}">${s.bg}</span><span class="${on === 2 ? "on" : ""}">${s.exp}</span></div>`;
  if (mode === "bg") return seg(1) + `<div class="ed-lbl">${s.bg}</div><div class="ed-card"><div class="ed-sw"><i class="on" style="background:linear-gradient(135deg,#E9EDF2,#C9D1DC)"></i><i style="background:#111827"></i><i style="background:linear-gradient(135deg,#F3EDE4,#D9C9B4)"></i><i style="background:#fff;box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)"></i></div></div>
    <div class="ed-card"><div class="ed-r"><span>${s.padding}</span><em>56</em></div><div class="ed-sl" style="--v:55%"></div><div class="ed-r"><span>${s.radius}</span><em>12</em></div><div class="ed-sl" style="--v:30%"></div><div class="ed-r"><span>${s.shadow}</span><em>30</em></div><div class="ed-sl" style="--v:40%"></div></div>`;
  if (mode === "pixel") return seg(0) + `<div class="ed-lbl">${s.pixel}</div><div class="ed-card"><div class="ed-r"><span>${s.pixel}</span><em>12</em></div><div class="ed-sl" style="--v:35%"></div></div>`;
  if (mode === "ar") return seg(0) + `<div class="ed-lbl">${s.font}</div><div class="ed-card"><div class="ed-r"><span>${s.font}</span><em>${lang === "ar" ? "SF Arabic" : "SF Pro"}</em></div><div class="ed-r"><span>${s.size}</span><em>28</em></div></div><div class="ed-lbl">${s.dir}</div><div class="ed-seg"><span class="on">${s.auto}</span><span>LTR</span><span>RTL</span></div>`;
  return seg(0) + `<div class="ed-lbl">${s.color}</div><div class="ed-card"><div class="ed-r"><span>${s.color}</span><span class="ed-dot"></span></div></div><div class="ed-lbl">${s.thick}</div><div class="ed-card"><div class="ed-r"><span>${s.thick}</span><em>5</em></div><div class="ed-sl" style="--v:30%"></div><div class="ed-r"><span>${s.size}</span><em>30</em></div><div class="ed-sl" style="--v:45%"></div></div>`;
}

export function edHTML(mode, lang) {
  const s = ED[lang];
  const on = { mark: "arrow", pixel: "pix", bg: "sel", ar: "text" }[mode];
  const tools = ["sel", "crop", "|", "arrow", "rect", "oval", "text", "num", "hl", "pix"].map(k => k === "|" ? "<hr>" : `<b class="${k === on ? "on" : ""}">${svg(k)}</b>`).join("");
  const colors = ["#E5534B", "#FF9F0A", "#FFD60A", "#30D158", "#0A84FF", "#1D1D1F", "#FFFFFF"].map((c, i) => `<s class="${i === 0 ? "on" : ""}" style="background:${c};${c === "#FFFFFF" ? "box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)" : ""}"></s>`).join("");
  return `<div class="ed-in">
  <div class="ed-top"><span class="ed-tl"><i></i><i></i><i></i></span><span class="ed-name">EasyShoot</span>
    <div class="ed-tb">${tools}<hr>${colors}<hr><b>${svg("undo")}</b></div></div>
  <div class="ed-mid"><div class="ed-canvas"><div class="frame">${shotHTML(mode, lang)}</div></div><div class="ed-side">${sideHTML(mode, s, lang)}</div></div>
  <div class="ed-foot"><span class="pill">${s.presets} ▾</span><span class="ok">${s.copied}</span><span class="end"><span class="pill">${s.copy}</span><span class="pill pri">${s.save}</span></span></div>
</div>`;
}
