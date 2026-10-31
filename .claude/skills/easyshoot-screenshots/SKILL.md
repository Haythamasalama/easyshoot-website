---
name: easyshoot-screenshots
description: Make real screenshots of the EasyShoot app for the website, the App Store or social posts, without asking the user to capture anything. Use when an image on the site shows the app (editor-en.png, editor-ar.png, feature tiles, og.png), when someone says a screenshot looks fake, drawn, low quality or "not the real app", or asks for a new one in English or Arabic. Covers picking real content, opening it in the real editor, annotating it, choosing a calm background and capturing the window.
---

# Real EasyShoot screenshots

Every image of the app is a capture of the real EasyShoot editor showing real content. Never draw the app in HTML or SVG, and never use a mock app with invented data.

## 0. One-time setup (ask the user once, then never again)

The capture step uses `screencapture -l`, which needs **Screen Recording** permission for the app that runs Claude. If `scripts/capture-window.sh` prints "could not create image from window", ask the user once to turn it on: System Settings → Privacy & Security → Screen & System Audio Recording → enable **Claude** (or the terminal running Claude Code), then restart it. Don't change that setting yourself.

Computer-use access to **EasyShoot** is also needed (`request_access` with `EasyShoot`). Work in the background with the `app_*` tools; full-screen control is not needed.

Drags (pixelate, boxes, arrows, sliders) only work when the editor window is on the user's current desktop Space. If `app_list_windows` shows `is_off_space: true` and `app_bring_to_current_space` fails (it can't move windows into a full-screen Space), ask the user once to switch to a normal desktop, or to click the EasyShoot window. Ask before starting, not halfway through.

Make every editor window large before annotating (`app_menu` → `["Window", "Fill"]`, in Arabic `["نافذة", "تعبئة"]`): the capture is only as sharp as the window is big. Use landscape content (wider than tall, about 1.7:1) so it fills the canvas; portrait content ends up small in the middle.

## 1. Pick real content

Use pages whose license allows it, with a fictional or neutral brand:

| Use | Source | Notes |
|:--|:--|:--|
| Hero, English | `https://ui.shadcn.com/examples/dashboard` | MIT. "Acme Inc." dashboard. Crop the app area. |
| Hero / Arabic tile | `https://ui.shadcn.com/examples/rtl` | MIT. Arabic RTL forms (payment method, chat). |
| Maps, routes | OpenStreetMap | ODbL; keep the "© OpenStreetMap contributors" line visible. |

Avoid Wikipedia (looks like a document, not a product), real company dashboards, and anything with real people's data.

Render at 2x in light mode, then crop:

```bash
.claude/skills/easyshoot-screenshots/scripts/render.sh https://ui.shadcn.com/examples/dashboard /tmp/es/full-dashboard.png 1200 1400
sips -c 924 2240 --cropOffset 934 80 /tmp/es/full-dashboard.png --out /tmp/es/dash-en.png   # header + 4 stat cards
sips -c 1440 1470 --cropOffset 930 846 /tmp/es/full-rtl.png --out /tmp/es/dash-ar.png       # Arabic forms, two columns
```

Read the rendered PNG before cropping: those offsets move when the page changes.

## 2. Open it in the real editor

```bash
.claude/skills/easyshoot-screenshots/scripts/clip.sh /tmp/es/dash-en.png
```

Then `app_menu` → `["File", "Annotate Clipboard Image"]` on `com.haythamasalama.easyshoot`, and `app_list_windows` to find the new window (the `is_main` one). Take an `app_screenshot`; the toolbar buttons have stable element indexes (Arrow 2, Rectangle 4, Text 7, Counter 8, Highlighter 9, Pixelate 11, Red 12; Undo is the toolbar's ↶ button).

For the Arabic set, run the app in Arabic first (this closes open editors):

```bash
osascript -e 'quit app "EasyShoot"'; open -a EasyShoot --args -AppleLanguages '(ar)'
```

Relaunch without the argument to go back to the user's language.

## 3. Annotate like a person would

One clear story per image, three or four marks at most:

1. **Pixelate** one private value (an amount, an email, a card number).
2. **Rectangle** around the thing the image is about. Leave padding so the border never crosses text.
3. **Counter** 1 on the rectangle's corner, counter 2 on the next action (a button).
4. **Arrow** pointing at one detail, drawn in one straight drag.

Size every mark from the image's pixel width (shown in the editor's status bar, e.g. "2,496 × 1,180 px"), so arrows, numbers and labels look the same in every image:

| Mark | Setting (Style tab) | Rule | 2,240 px wide | 1,736 px wide |
|:--|:--|:--|:--|:--|
| Arrow, box, line | Thickness | width ÷ 450, at least 3 | 5 | 4 |
| Counter (number) | Size | width ÷ 75 | 30 | 23 |
| Text label | Size | width ÷ 70, Background "Bubble" | 32 | 25 |

Counters go **beside** what they mark (just outside the box's edge, or to the side of a button with a small gap), never on top of text, labels or other fields. A counter should be no taller than a line of text in the screenshot. Prefer two numbered steps and one box; add an arrow only if nothing else shows the point, and never let marks touch each other.

Set the values by dragging the slider knobs and check them with `app_zoom` before drawing. Keep arrows short (a third of the image width at most) and pointing from empty space into the detail.

Known quirks when driving the app remotely:

- **Each counter click places two counters** (the next one would read 3). After every counter click, press Undo once.
- **The highlighter does not draw** from a remote drag. Use a rectangle instead.
- Undo removes marks in reverse order; zoom in after each batch to check.

## 4. Background

Background tab → keep **Show background** on and pick **Graphite** (calm, dark, fits the site). The other gradients (Ocean, Sunset, Lavender, Mint, Indigo, Peach, Flame, Sky) are too loud for the website. For a plain look, switch Show background off. Shadow about 30, corner radius 12.

## 5. Capture the window

```bash
.claude/skills/easyshoot-screenshots/scripts/capture-window.sh <window_id> website-file.png
```

It captures only that window, with its real macOS shadow, rounded corners and a transparent surround, at the display's native resolution (about 3000 px wide for a filled window). Keep that full size on the site so text inside the image stays sharp; pass a third argument (max width) only when a smaller file is really needed. Never use the app's own Capture Window while full-screen control is on: it captures the control overlay instead.

## 6. Put it on the site

- `editor-en.png` and `editor-ar.png` in the repository root are the hero images (full window captures); `index.html` swaps them by language.
- Feature tiles use images in `shots/`, made from the editor's real output: click the editor's **Copy** button, save the clipboard (`osascript … write (the clipboard as «class PNGf»)`), then crop with `sips`:
  - `markup.png`: the finished image (annotations + background), 1800 px wide.
  - `pixelate.png`: a crop around the pixelated value.
  - `before.png` / `after.png`: the source screen and the finished image, 1400 px wide.
  - `arabic.png`: a crop of the canvas from the Arabic capture, 1200 px wide.
- Quick Access: capture the floating thumbnail window with `screencapture -l` the moment it appears (it closes after `quickAccessAutoClose` seconds). In the installed build on 31 Oct 2026 it never appeared after a capture, so that tile is still drawn; check the app before trying again.
- Update the hero `alt` text in every language in the `I18N` object (`hero.alt`) so it describes what the new image shows.
- Check the page in light and dark, English and Arabic, at phone width.
- Close the extra editor windows when done (`app_menu` → `["File", "Close All"]`), then `app_release`.
