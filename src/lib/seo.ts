import { SITE, LANGS, APP_STORE_URL, useT, type Lang } from "../i18n";

export function appNode(lang: Lang) {
  const t = useT(lang);
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE}/#app`,
    name: "EasyShoot",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Screenshot tool",
    operatingSystem: "macOS 14 or later",
    description: t("seo.desc"),
    url: `${SITE}/`,
    image: `${SITE}/og.png`,
    softwareHelp: `${SITE}/support.html`,
    inLanguage: [...LANGS],
    ...(APP_STORE_URL ? { downloadUrl: APP_STORE_URL } : {}),
    featureList: [
      "Area, window, fullscreen and scrolling capture",
      "Quick Access after every capture",
      "Arrows, boxes, ellipses, text and numbered steps",
      "Highlighter, pen and pixelate",
      "Arabic and right-to-left text in any font",
      "Background tool with padding, corners and shadow",
      "Crop and resize",
      "Presets",
      "PNG, JPEG, HEIC and TIFF export",
      "Custom capture shortcuts",
      "Liquid Glass on macOS 26",
      "No account, no cloud, no tracking",
    ],
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export const faqNode = (url: string, lang: Lang, items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  inLanguage: lang,
  mainEntity: items.map(i => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});

export const breadcrumbNode = (url: string, crumbs: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  "@id": `${url}#crumbs`,
  itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: SITE + c.path })),
});
