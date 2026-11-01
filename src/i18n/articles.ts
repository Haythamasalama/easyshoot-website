import { LANGS, pagePath, type Lang } from "./index";

const files = import.meta.glob<any>("./articles/*.json", { eager: true, import: "default" });
// Until a language file exists, its pages fall back to English.
export const content = (lang: Lang) => files[`./articles/${lang}.json`] ?? files["./articles/en.json"];
// A single article that isn't translated yet falls back to English too.
export const articleOf = (lang: Lang, slug: string) => content(lang).articles[slug] ?? content("en").articles[slug];

export type Kind = "guides" | "compare";
export interface Article { slug: string; kind: Kind; short: Record<Lang, string> }

const ORDER: Record<Kind, string[]> = {
  guides: ["how-to-use-easyshoot", "blur-screenshot-mac", "annotate-screenshot-mac", "arabic-text-screenshot-mac"],
  compare: ["cleanshot-x-alternative", "shottr-alternative", "snagit-alternative", "lightshot-alternative", "macos-screenshot-alternative"],
};

const make = (kind: Kind, slug: string): Article => ({
  slug, kind,
  short: Object.fromEntries(LANGS.map(l => [l, articleOf(l, slug).short])) as Record<Lang, string>,
});

export const GUIDES = ORDER.guides.map(s => make("guides", s));
export const COMPARES = ORDER.compare.map(s => make("compare", s));
export const ALL = [...GUIDES, ...COMPARES];

export const hubPath = (lang: Lang, kind: Kind) => `${pagePath(lang)}${kind}/`;
export const articlePath = (lang: Lang, a: Article) => `${hubPath(lang, a.kind)}${a.slug}/`;
export const alternatesFor = (path: (l: Lang) => string) => Object.fromEntries(LANGS.map(l => [l, path(l)])) as Record<Lang, string>;

const TAG_NAMES: Record<string, Record<Lang, string>> = {
  mac: { en: "Mac", ar: "ماك", fr: "Mac", es: "Mac", de: "Mac" },
  screenshots: { en: "Screenshots", ar: "لقطات الشاشة", fr: "Captures d’écran", es: "Capturas de pantalla", de: "Screenshots" },
  privacy: { en: "Privacy", ar: "الخصوصية", fr: "Confidentialité", es: "Privacidad", de: "Datenschutz" },
  markup: { en: "Markup", ar: "التوضيح", fr: "Annotation", es: "Anotación", de: "Markieren" },
  arabic: { en: "Arabic and RTL", ar: "العربية ومن اليمين لليسار", fr: "Arabe et RTL", es: "Árabe y RTL", de: "Arabisch und RTL" },
  shortcuts: { en: "Keyboard shortcuts", ar: "اختصارات لوحة المفاتيح", fr: "Raccourcis clavier", es: "Atajos de teclado", de: "Tastenkürzel" },
  comparison: { en: "Comparison", ar: "مقارنة", fr: "Comparatif", es: "Comparativa", de: "Vergleich" },
  alternatives: { en: "Alternatives", ar: "بدائل", fr: "Alternatives", es: "Alternativas", de: "Alternativen" },
  free: { en: "Free apps", ar: "تطبيقات مجانية", fr: "Apps gratuites", es: "Apps gratis", de: "Kostenlose Apps" },
};
const ARTICLE_TAGS: Record<string, string[]> = {
  "how-to-use-easyshoot": ["screenshots", "markup", "shortcuts"],
  "blur-screenshot-mac": ["privacy", "markup", "screenshots"],
  "annotate-screenshot-mac": ["markup", "shortcuts", "screenshots"],
  "arabic-text-screenshot-mac": ["arabic", "markup", "mac"],
  "cleanshot-x-alternative": ["comparison", "alternatives", "free"],
  "shottr-alternative": ["comparison", "alternatives", "free"],
  "snagit-alternative": ["comparison", "alternatives", "free"],
  "lightshot-alternative": ["comparison", "alternatives", "privacy"],
  "macos-screenshot-alternative": ["comparison", "mac", "markup"],
};
export const tagsFor = (lang: Lang, slug: string) => (ARTICLE_TAGS[slug] ?? []).map(k => TAG_NAMES[k][lang]);

const READ: Record<Lang, (n: number) => string> = {
  en: n => `${n} min read`,
  ar: n => (n === 1 ? "دقيقة قراءة" : n === 2 ? "دقيقتا قراءة" : n <= 10 ? `${n} دقائق قراءة` : `${n} دقيقة قراءة`),
  fr: n => `${n} min de lecture`,
  es: n => `${n} min de lectura`,
  de: n => `${n} Min. Lesezeit`,
};
export const TOC_LABEL: Record<Lang, string> = { en: "On this page", ar: "في هذه الصفحة", fr: "Sur cette page", es: "En esta página", de: "Auf dieser Seite" };

// Words in the visible article, for reading time and schema.
export function wordCount(a: any) {
  const parts = [a.intro, ...(a.steps ?? []).flatMap((s: any) => [s.name, s.text]), ...(a.table ?? []).flat(), ...a.sections.flatMap((s: any) => [s.h2, s.html]), ...a.faq.flatMap((f: any) => [f.q, f.a])];
  return parts.join(" ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}
export const readingTime = (lang: Lang, words: number) => READ[lang](Math.max(1, Math.round(words / 200)));
