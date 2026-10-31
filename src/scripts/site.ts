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

// Showcase tabs: every mode is in the HTML already; only one is shown.
const tabs = [...document.querySelectorAll<HTMLButtonElement>("[data-tab]")];
function showTab(i: number) {
  tabs.forEach(b => b.setAttribute("aria-selected", String(+b.dataset.tab! === i)));
  document.querySelectorAll<HTMLElement>("[data-panel]").forEach(p => {
    const on = +p.dataset.panel! === i;
    p.hidden = !on;
    if (on && !reduce) animate(p, { opacity: [0, 1], y: [10, 0], scale: [0.985, 1] }, { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] });
  });
}
tabs.forEach(b => b.addEventListener("click", () => showTab(+b.dataset.tab!)));

// Tool row: one pressed tool at a time, with a small spring.
const tools = [...document.querySelectorAll<HTMLButtonElement>(".tool")];
tools.forEach(b => b.addEventListener("click", () => {
  tools.forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  if (!reduce) animate(b.querySelector(".ic")!, { scale: [0.86, 1] }, { type: "spring", bounce: 0.5, duration: 0.5 });
}));

// Every button and control gives a small spring when pressed.
if (!reduce) {
  press(".btn, .chip-btn, .tabs button, .faq summary, .lang-menu a, .links a, .foot a", el => {
    animate(el, { scale: 0.94 }, { type: "spring", stiffness: 600, damping: 30 });
    return () => animate(el, { scale: 1 }, { type: "spring", bounce: 0.55, duration: 0.45 });
  });
}

if (reduce) {
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

  // Floating tool icons settle into place one after another.
  inView(".toolrow", row => {
    animate(row.querySelectorAll(".tool"), { opacity: [0, 1], y: [18, 0], scale: [0.9, 1] }, { type: "spring", bounce: 0.35, duration: 0.7, delay: stagger(0.05) });
  });
}
