import { LANGS, pagePath, type Lang } from "./index";

const files = import.meta.glob<any>("./articles/*.json", { eager: true, import: "default" });
// Until a language file exists, its pages fall back to English.
export const content = (lang: Lang) => files[`./articles/${lang}.json`] ?? files["./articles/en.json"];
// A single article that isn't translated yet falls back to English too.
export const articleOf = (lang: Lang, slug: string) => content(lang).articles[slug] ?? content("en").articles[slug];

export type Kind = "guides" | "compare";
export interface Article { slug: string; kind: Kind; short: Record<Lang, string> }

const ORDER: Record<Kind, string[]> = {
  guides: ["scrolling-screenshot-mac", "blur-screenshot-mac", "annotate-screenshot-mac", "arabic-text-screenshot-mac"],
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
