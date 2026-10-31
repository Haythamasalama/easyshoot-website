import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://easyshoot.haythamasalama.me",
  trailingSlash: "ignore",
  build: { inlineStylesheets: "always" },
  integrations: [
    sitemap({
      customPages: [
        "https://easyshoot.haythamasalama.me/privacy.html",
        "https://easyshoot.haythamasalama.me/support.html",
        "https://easyshoot.haythamasalama.me/ar/privacy.html",
        "https://easyshoot.haythamasalama.me/ar/support.html",
      ],
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", ar: "ar", fr: "fr", es: "es", de: "de" },
      },
    }),
  ],
});
