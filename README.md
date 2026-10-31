# EasyShoot website

The site at <https://easyshoot.haythamasalama.me>, built with [Astro](https://astro.build) as static HTML. The landing page exists once per language: `/` (English), `/ar/` (Arabic, right to left), `/fr/`, `/es/` and `/de/`. `privacy.html` and `support.html` are in English, with Arabic copies in `ar/`. App Store Connect links to `privacy.html` and `support.html`, so they must stay online at those paths.

- **Run:** `npm install`, then `npm run dev` (http://localhost:4321) or `npm run build` (output in `dist/`).
- **Deploy:** `.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` to GitHub Pages. In the repository's Settings → Pages, the source must be **GitHub Actions**. `public/CNAME` holds the custom domain.
- **Text:** every string, in all five languages, is in `src/i18n/data.json` (`ui` for the page, `ed` for the drawn editor, `tabs` for the showcase). The page template is `src/components/Home.astro`.
- **App Store link:** set `APP_STORE_URL` in `src/i18n/index.ts` once the app is live. The download buttons then link to the App Store, and keys with a `…Live` twin (`hero.ctaLive`, `a.5Live`) switch to their download text.
- **SEO and GEO:** each language has its own title, description, canonical URL, `hreflang` links, Open Graph tags and JSON-LD (`SoftwareApplication`, `WebSite`, `WebPage`, `FAQPage`) in `src/layouts/Base.astro`. `@astrojs/sitemap` writes `sitemap-index.xml` with language alternates, and `public/llms.txt` is the plain summary for AI search.
- **Images of the app:** drawn in HTML by `src/lib/editor.ts` (a checkout page in the editor, in the page's language), so they stay sharp and follow light and dark. Keep marks to a few, with little pixelation.
- **Motion:** [Motion](https://motion.dev) in `src/scripts/site.ts`: the hero enters, sections rise in on scroll, the tool row springs in, the editor drifts as the hero scrolls away. Everything is skipped when the visitor prefers reduced motion, and the page is fully readable without JavaScript.
- **Look:** Liquid Glass surfaces over a soft backdrop, light and dark each with one colour set (`src/styles/global.css`), the system font with Inter and IBM Plex Sans Arabic as fallbacks, one blue accent that matches the icon (`public/art/icon.svg`).

The app's source is in a separate, private repository.
