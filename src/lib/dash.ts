import data from "../i18n/data.json";

const DASH: Record<string, Record<string, string>> = data.dash;

// The daily cost chart from the App Store captures; bar 15 is the lowest day the arrow points at.
const BARS = [78, 52, 82, 86, 88, 86, 90, 84, 58, 86, 82, 92, 86, 88, 80, 45, 92, 84, 88, 64, 90, 86, 82, 88, 92, 60, 86];
const LOW = 15;

const ico = (d: string) => `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const I = {
  grid: ico("M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM11 11h5v5h-5z"),
  people: ico("M7.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 16c.6-2.6 2.3-4 4.5-4s3.9 1.4 4.5 4M13 4.5a2.5 2.5 0 0 1 0 4.8M14.5 12c1.3.5 2.2 1.9 2.5 4"),
  gear: ico("M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4"),
  chat: ico("M4 15.5l1-3A6 6 0 1 1 7.6 15z"),
  bill: ico("M5 3h10v14H5zM8 7h4M8 10h4M8 13h2"),
  send: ico("M3 10l14-6-5 14-2.5-5.5z"),
  tpl: ico("M4 4h12v5H4zM4 11h5v5H4zM11 11h5v5h-5z"),
  bell: ico("M6 8a4 4 0 0 1 8 0v4l1.5 2h-11L6 12zM8.5 16.5a1.5 1.5 0 0 0 3 0"),
  sync: ico("M15.5 8A6 6 0 0 0 4.6 6.5M4.5 12a6 6 0 0 0 10.9 1.5M4 3.5v3h3M16 16.5v-3h-3"),
  out: ico("M8 4H4v12h4M12 6.5L15.5 10 12 13.5M15.5 10H8"),
  sun: ico("M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.3 4.3l1 1M14.7 14.7l1 1M4.3 15.7l1-1M14.7 5.3l1-1"),
  x: ico("M7 7l6 6M13 7l-6 6"),
};

export function dashHTML(lang: string) {
  const s = DASH[lang], dir = lang === "ar" ? "rtl" : "ltr";
  const card = (cls: string, icon: string, label: string, value: string, sub: string, marks = "") =>
    `<div class="d-card ${cls}"><div class="d-card-top"><span>${label}</span><i>${icon}</i></div><b class="num">${value}</b><small>${sub}</small>${marks}</div>`;
  const acct = (name: string, phone: string, sel = "") =>
    `<div class="d-acct"><i>${I.chat}</i><div><b>${name}</b><span class="d-phone"><span class="num">${phone}</span>${sel}</span></div></div>`;
  const share = (name: string, value: string, sub: string, pct: number) =>
    `<div class="d-share"><div><b>${name}</b><span class="num">${value}</span></div><i style="--w:${pct}%"></i><small>${sub}</small></div>`;
  return `<div class="dash-wrap"><div class="shot dash" dir="${dir}">
  <aside class="d-side">
    <div class="d-app"><i>${I.chat}</i><b>${s.app}</b></div>
    <nav><span class="on">${I.grid}${s.nav1}</span><span>${I.people}${s.nav2}</span><span>${I.gear}${s.nav3}</span></nav>
    <small>${s.accts}</small>
    ${acct(s.s1, "+966 55 214 7781", '<span class="mk mk-sel"><i></i><i></i><i></i><i></i></span>')}
    ${acct(s.s2, "+966 54 903 1126")}
  </aside>
  <div class="d-main">
    <div class="d-head"><div><h5>${s.title}</h5><span>${s.since}</span></div><span class="d-tools">${I.sync}<b>EN</b>${I.out}${I.sun}</span></div>
    <div class="d-cards">
      ${card("d-cost", I.bill, s.c1, "$186.09", s.c1s, '<span class="mk mk-box"><i></i><i></i><i></i><i></i></span><span class="mk mk-n mk-n1">1</span>')}
      ${card("", I.send, s.c2, "12,823", s.c2s)}
      ${card("", I.tpl, s.c3, "16", s.c3s)}
      ${card("", I.bell, s.c4, "6", s.c4s)}
    </div>
    <div class="d-row">
      <div class="d-panel d-daily">
        <div class="d-ph"><b>${s.daily}</b><span class="d-tog"><i class="on">${s.cost}</i><i>${s.msgs}</i></span></div>
        <div class="d-chart"><span class="d-yax num"><i>$8</i><i>$4</i><i>$0</i></span><div class="d-bars">${BARS.map((h, i) => `<i class="${i === LOW ? "low" : ""}" style="--h:${h}%"></i>`).join("")}</div></div>
        <div class="d-xax"><span>${s.d1}</span><span>${s.d2}</span><span>${s.d3}</span></div>
      </div>
      <div class="d-panel d-by">
        <div class="d-ph"><b>${s.byAcct}</b></div>
        ${share(s.s1, "$130.89", s.m1, 70)}
        ${share(s.s2, "$55.20", s.m2, 30)}
        <span class="mk mk-low">${s.low}</span>
      </div>
      <svg class="mk mk-curve" viewBox="0 0 438 120" aria-hidden="true"><path d="M295 88C285 30 212 22 158 68" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M159 54l-2 15 14 1" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="d-panel d-table">
      <div class="d-ph"><b>${s.table}</b></div>
      <div class="d-tr d-th"><span>${s.h1}</span><span>${s.h2}</span><span>${s.h3}</span><span>${s.h4}</span><span>${s.h5}</span><span>${s.h6}</span></div>
      <div class="d-tr"><span class="d-who"><i>${I.chat}</i>${s.s1}</span><span class="num"><b>$130.89</b></span><span class="num">9,022</span><span><b>8</b><small>${s.appr}</small></span><span><em class="d-rej">${I.x}${s.rej}<span class="mk mk-ell"></span><span class="mk mk-n mk-n2">2</span></em></span><span><em class="d-high">${s.high}</em></span></div>
    </div>
  </div>
</div></div>`;
}
