# EasyShoot website

The site at <https://easyshoot.haythamasalama.me>: the landing page (`index.html`) in five languages (English, Arabic with right-to-left layout, French, Spanish and German), plus `privacy.html` and `support.html` in English and Arabic. App Store Connect links to the last two, so they must stay online.

- **No build step.** Open a file in a browser to preview it.
- **Deploy:** GitHub Pages publishes the `main` branch as it is. `CNAME` holds the custom domain and `.nojekyll` turns off Jekyll.
- **Translations:** in the `I18N` object at the bottom of `index.html`. The English text also lives in the HTML itself; change both.
- **App Store link:** the download buttons point to `#install` until the app is live. Then point them, and the card in the install section, at the App Store page.

The app's source is in a separate, private repository.
