# EasyShoot website

The site at <https://easyshoot.haythamasalama.me>: the landing page (`index.html`) in five languages (English, Arabic with right-to-left layout, French, Spanish and German), plus `privacy.html` and `support.html` in English, with Arabic copies in `ar/` (`ar/privacy.html`, `ar/support.html`). App Store Connect links to `privacy.html` and `support.html`, so they must stay online at those paths.

- **No build step.** Open a file in a browser to preview it.
- **Deploy:** GitHub Pages publishes the `main` branch as it is. `CNAME` holds the custom domain and `.nojekyll` turns off Jekyll.
- **Translations:** in the `I18N` object at the bottom of `index.html`. The English text also lives in the HTML itself; change both.
- **App Store link:** set `APP_STORE_URL` at the top of the script in `index.html` once the app is live. Every link with the `store-link` class then opens the App Store, and the labels with a `data-i18n-live` key switch from "Coming soon" to their download text (`hero.badgeLive`, `hero.ctaLive`). Until then the buttons scroll to the download section.
- **Screenshots:** `editor-en.png` and `editor-ar.png` show the editor; the page swaps to the Arabic one when the language is Arabic. Replace both when the app's look changes.
- **Look:** IBM Plex Sans, IBM Plex Sans Arabic and IBM Plex Mono on every page, one blue accent (`--signal`), dark first with a light mode.

The app's source is in a separate, private repository.
