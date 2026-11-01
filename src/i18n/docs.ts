import { pagePath, type Lang } from "./index";

const files = import.meta.glob<any>("./docs/*.json", { eager: true, import: "default" });
const docs = (lang: Lang) => files[`./docs/${lang}.json`] ?? files["./docs/en.json"];

// The guide's order. A new topic goes here and into docs/<lang>.json; a language without it shows the English text.
export const DOC_GROUPS = [
  { id: "start", slugs: ["getting-started", "capture", "quick-access"] },
  { id: "editor", slugs: ["mark-up", "styles", "hide-details", "text", "background-and-crop", "presets", "export"] },
  { id: "more", slugs: ["shortcuts", "settings", "privacy"] },
];
export const DOC_SLUGS = DOC_GROUPS.flatMap(g => g.slugs);
// Bump when the guide's text changes; search engines and AI assistants read it as the page's last update.
export const DOCS_UPDATED = "2026-11-01";

export const docsUI = (lang: Lang) => ({ ...docs("en").ui, ...docs(lang).ui });
export const docOf = (lang: Lang, slug: string) => docs(lang).topics[slug] ?? docs("en").topics[slug];

export const docsPath = (lang: Lang) => `${pagePath(lang)}docs/`;
export const docPath = (lang: Lang, slug: string) => `${docsPath(lang)}${slug}/`;
