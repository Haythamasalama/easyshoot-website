import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://easyshoot.haythamasalama.me",
  trailingSlash: "ignore",
  build: { inlineStylesheets: "always", format: "preserve" },
  integrations: [
    sitemap({
      lastmod: new Date(),
      // Home pages first, then comparisons and guides, then hubs and the rest.
      serialize(item) {
        // With build.format "preserve" the sitemap drops trailing slashes and .html; write the URLs the site serves.
        const real = url => {
          const u = new URL(url);
          if (/\/(privacy|support)$/.test(u.pathname)) u.pathname += ".html";
          else if (!u.pathname.endsWith("/") && !u.pathname.endsWith(".html")) u.pathname += "/";
          return u.href;
        };
        item.url = real(item.url);
        item.links = item.links?.map(l => ({ ...l, url: real(l.url) }));
        const path = new URL(item.url).pathname.replace(/^\/(ar|fr|es|de)\//, "/");
        item.priority = path === "/" ? 1 : /^\/(compare|guides|docs)\/[^/]+\/$/.test(path) ? 0.8 : /^\/(compare|guides|docs)\/$/.test(path) ? 0.7 : 0.5;
        item.changefreq = path === "/" ? "weekly" : "monthly";
        return item;
      },
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", ar: "ar", fr: "fr", es: "es", de: "de" },
      },
    }),
  ],
});
