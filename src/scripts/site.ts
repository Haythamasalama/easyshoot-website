import { animate, inView, press, scroll, stagger } from "motion";

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Theme: follows the Mac until the visitor picks one.
const themeBtn = document.getElementById("themeBtn");
const darkQuery = matchMedia("(prefers-color-scheme: dark)");
const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : darkQuery.matches);
function updateThemeLabel() {
  if (!themeBtn) return;
  themeBtn.setAttribute("aria-label", (isDark() ? themeBtn.dataset.toLight : themeBtn.dataset.toDark) ?? "");
}
function applyTheme(next: "light" | "dark") {
  root.dataset.theme = next;
  try { localStorage.setItem("easyshoot-theme", next); } catch {}
  updateThemeLabel();
}
// The new theme grows out of the button in a circle; browsers without view transitions just switch.
themeBtn?.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  if (!themeBtn) return;
  if (!reduce) animate(themeBtn.querySelectorAll("svg"), { rotate: [-90, 0], scale: [0.4, 1] }, { type: "spring", bounce: 0.4, duration: 0.6 });
  const start = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }).startViewTransition;
  if (reduce || !start) return applyTheme(next);
  const r = themeBtn.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const t = start.call(document, () => applyTheme(next));
  t.ready.then(() => {
    root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)", pseudoElement: "::view-transition-new(root)" });
  });
});
darkQuery.addEventListener("change", updateThemeLabel);
updateThemeLabel();

// Language menu closes on outside click and Escape.
const langMenu = document.querySelector<HTMLDetailsElement>("details.lang");
document.addEventListener("click", e => { if (langMenu?.open && !(e.target as Element).closest("details.lang")) langMenu.open = false; });
document.addEventListener("keydown", e => { if (e.key === "Escape" && langMenu?.open) { langMenu.open = false; langMenu.querySelector("summary")?.focus(); } });

// Press kit: copy a ready-made description.
document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach(b => b.addEventListener("click", async () => {
  const text = document.getElementById(b.dataset.copy!)?.textContent ?? "";
  try { await navigator.clipboard.writeText(text); } catch { return; }
  const label = b.textContent;
  b.textContent = b.dataset.done ?? label;
  setTimeout(() => (b.textContent = label), 1600);
}));

// Table of contents follows the section in view.
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>(".doc-toc a")];
if (tocLinks.length && "IntersectionObserver" in window) {
  const byId = new Map(tocLinks.map(a => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    tocLinks.forEach(a => a.classList.remove("on"));
    byId.get(e.target.id)?.classList.add("on");
  }), { rootMargin: "-20% 0px -70% 0px" });
  byId.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
}

// Live inspector in the feature rows: each control sets a CSS variable on its figure, so the window and its close-ups change together.
document.querySelectorAll<HTMLElement>(".feat-art").forEach(fig => {
  fig.querySelectorAll<HTMLButtonElement>("button[data-ctl]").forEach(b => b.addEventListener("click", () => {
    fig.querySelectorAll<HTMLButtonElement>(`button[data-ctl="${b.dataset.ctl}"]`).forEach(x => {
      x.classList.toggle("on", x === b);
      x.setAttribute("aria-pressed", String(x === b));
    });
    fig.style.setProperty(`--${b.dataset.ctl}`, b.dataset.v!);
  }));
  fig.querySelectorAll<HTMLInputElement>("input[data-ctl]").forEach(i => i.addEventListener("input", () => {
    i.style.setProperty("--v", `${i.value}%`);
    fig.style.setProperty(`--${i.dataset.ctl}`, String(+i.value / 100));
  }));
});

// Close-ups: a copy of the drawing beside them (or the first one), magnified and centred on the mark it is about.
// They are filled here rather than in the HTML so the page's text doesn't repeat the drawing many times.
const firstDash = document.querySelector<HTMLElement>(".feat-art .ed .dash-wrap");
document.querySelectorAll<HTMLElement>(".zc").forEach(zc => {
  const source = zc.closest(".feat-art")?.querySelector<HTMLElement>(".ed .dash-wrap") ?? firstDash;
  if (!source) return;
  zc.append(source.cloneNode(true));
  const shot = zc.querySelector<HTMLElement>(".dash"), el = zc.querySelector<HTMLElement>(zc.dataset.focus ?? "");
  if (!shot || !el) return;
  const s = shot.getBoundingClientRect(), r = el.getBoundingClientRect(), em = parseFloat(getComputedStyle(shot).fontSize);
  zc.style.setProperty("--fx", ((r.left + r.width / 2 - s.left) / em).toFixed(2));
  zc.style.setProperty("--fy", ((r.top + r.height / 2 - s.top) / em).toFixed(2));
});

// Quick Access card: Copy and Save confirm, Edit opens the tools, Close slides the thumbnail away and back.
document.querySelectorAll<HTMLElement>(".qa-live").forEach(card => {
  card.querySelectorAll<HTMLButtonElement>("[data-qa]").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.qa === "close") {
      card.classList.add("gone");
      setTimeout(() => card.classList.remove("gone"), 1400);
    } else if (b.dataset.qa === "edit") {
      document.getElementById("tools")?.scrollIntoView();
    } else {
      b.classList.add("done");
      setTimeout(() => b.classList.remove("done"), 1200);
    }
  }));
  // Shows the controls once when the card comes into view, so visitors know they are there.
  inView(card, () => {
    card.classList.add("on");
    setTimeout(() => card.classList.remove("on"), 2600);
  });
});

// Tool row: one pressed tool at a time, with a small spring.
const tools = [...document.querySelectorAll<HTMLButtonElement>(".tool")];
tools.forEach(b => b.addEventListener("click", () => {
  tools.forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  if (!reduce) animate(b.querySelector(".ic")!, { scale: [0.86, 1] }, { type: "spring", bounce: 0.5, duration: 0.5 });
}));

// Every button and control gives a small spring when pressed.
if (!reduce) {
  press(".btn, .chip-btn, .faq summary, .lang-menu a, .links a, .foot-cols a, .foot-langs a, .pill-tag", el => {
    animate(el, { scale: 0.94 }, { type: "spring", stiffness: 600, damping: 30 });
    return () => animate(el, { scale: 1 }, { type: "spring", bounce: 0.55, duration: 0.45 });
  });
}

if (reduce || document.hidden) {
  document.querySelectorAll<HTMLElement>(".reveal").forEach(el => (el.style.opacity = "1"));
} else {
  const ease = [0.2, 0.8, 0.2, 1] as const;

  animate(".desk", { opacity: [0, 1], y: [40, 0], scale: [0.97, 1] }, { duration: 1, delay: 0.55, ease });
  animate(".editor-win", { opacity: [0, 1], y: [24, 0] }, { duration: 0.8, delay: 0.8, ease });
  animate(".editor-win .mk", { opacity: [0, 1] }, { duration: 0.35, delay: stagger(0.18, { startDelay: 1.5 }) });
  animate(".hero-icon", { opacity: [0, 1], y: [36, 0], scale: [0.8, 1] }, { type: "spring", bounce: 0.45, duration: 0.9 });
  animate(".hero-copy > *", { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, delay: stagger(0.08, { startDelay: 0.15 }), ease });

  // The editor drifts up a little as the hero scrolls away.
  const hero = document.querySelector(".hero");
  const win = document.querySelector<HTMLElement>(".editor-win");
  if (hero && win) scroll(animate(win, { y: [0, -36] }, { ease: "linear" }), { target: hero, offset: ["start start", "end start"] });

  // Sections rise in once, with siblings staggered.
  inView(".reveal", el => {
    const siblings = [...(el.parentElement?.children ?? [])].filter(c => c.classList.contains("reveal"));
    const i = Math.max(0, siblings.indexOf(el));
    animate(el, { opacity: [0, 1], y: [26, 0] }, { duration: 0.7, delay: Math.min(i, 6) * 0.07, ease });
  }, { margin: "0px 0px -10% 0px" });

  // If the animation clock stalls (a throttled or background tab), never leave visible content hidden.
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>(".reveal, .hero-copy > *, .hero-icon, .desk, .editor-win").forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight && +getComputedStyle(el).opacity < 0.5) {
        el.getAnimations().forEach(an => an.finish());
        el.style.opacity = "1";
      }
    });
  }, 1800);

  // Floating tool icons settle into place one after another.
  inView(".toolrow", row => {
    animate(row.querySelectorAll(".tool"), { opacity: [0, 1], y: [18, 0], scale: [0.9, 1] }, { type: "spring", bounce: 0.35, duration: 0.7, delay: stagger(0.05) });
  });
}
