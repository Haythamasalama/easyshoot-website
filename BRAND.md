# EasyShoot brand

![EasyShoot icon](public/icon.png)

This file describes the brand as the website ships it (November 2026). The values below are read from the live tokens in `src/styles/global.css`; change them there and here together. The app repository still has the older "Graphite Crosshair" guide in `Branding/BRAND.md`; this one replaces it for the website and marketing until the app adopts the new icon.

## Idea

**A clear lens on your screen.** Four selection corners frame a camera lens: the moment you choose what to capture. The brand should feel like a native Mac tool that a careful person made: calm, bright, precise and friendly. Colour is used sparingly so the screenshots and the marks inside them carry the attention.

Principles:

1. **Content first.** The product and its marks are the most colourful thing on a page. Everything around them is neutral glass.
2. **One blue.** A single sky-to-sapphire blue. No second accent colour, no purple, no rainbow gradients.
3. **Light is light, dark is dark.** Each theme has one complete colour set. Nothing white inside dark mode, nothing black inside light mode (the main download button is the only deliberate inverse).
4. **Native, not decorated.** System font, macOS window shapes, Liquid Glass surfaces. No ornaments that macOS wouldn't use.
5. **Every language is first class.** Arabic reads right to left with its own spacing; no page mixes languages.

## Logo

| File | Use |
|:--|:--|
| `public/art/icon.svg` | Master icon, 1024 × 1024 on the macOS squircle grid (tile 824 × 824 at 100, 100; corner radius 185) |
| `public/icon.png` | 1024 px render with a transparent background (headless Chrome) for the site, Apple touch icon and social |
| `public/favicon.svg` | Simplified icon for browser tabs: same tile, corners and lens without the fine reflections |
| `public/og.png` | 1200 × 630 share image: icon, wordmark, tagline |

**Construction**

- **Tile:** vertical gradient `#62C6FF` → `#2C8CF4` → `#1650D0`, a soft white sheen from the top left, and a light rim (white at the top, fading out, a faint return at the bottom).
- **Corners:** four rounded L shapes, stroke 60 on the 1024 grid, frosted white (`#FFFFFF` → `#DCEBFF`), lifted with a soft blue-black shadow and a bright top edge.
- **Lens:** metal rim (`#5E6577` → `#23262F` → `#3A4256`), dark barrel, black ring, blue glass (`#2F7CF0` → `#123C96` → `#050C24`) with a faint coating tint (cyan top left, violet bottom right), a dark core, a wide soft reflection, one sharp highlight and a thin blue light along the lower edge.

**Use**

- Keep at least a quarter of the icon's width clear around it.
- Smallest size: 16 px, use `favicon.svg`. From 64 px up, use the full icon.
- Don't recolour it, outline it, add effects, put text on it, or place it on a busy photo.
- For a real macOS Liquid Glass icon in the app, rebuild these layers (tile, corners, lens) in Icon Composer so the system can light them; the SVG is the drawing they come from.

**Wordmark:** **Easy**Shoot, one word with a capital S. "Easy" in ink, "Shoot" in the accent ink. It stays left to right inside Arabic text (`dir="ltr"`).

## Colour

All pairs below meet WCAG AA for the text sizes they are used at.

### Accent

| Token | Light | Dark | Use |
|:--|:--|:--|:--|
| `--accent` | `#2C8CF4` | `#4FA6FF` | Selection, focus ring, selected tool, small graphic details |
| `--accent-ink` | `#1A63D6` (5.5:1 on white) | `#8CC4FF` (10.8:1 on `#0A0A0B`) | Accent text: "Shoot", links |
| `--accent-fill` | `#1A63D6` | `#1A63D6` | Any fill with white text on it (5.5:1). Never put white text on `--accent` (3.4:1) |
| `--grad` | `#1650D0` → `#62C6FF` | same | Icon tile and rare decorative accents only |

### Neutrals

| Token | Light | Dark | Use |
|:--|:--|:--|:--|
| `--bg` | `#FFFFFF` | `#0A0A0B` | Page |
| `--surface` | `#F6F8FA` | `#121214` | Quiet panels, keys |
| `--card` | `#FFFFFF` | `#151517` | Selected chips and solid cards |
| `--ink` | `#0A0A0B` | `#F5F5F7` | Headings and body |
| `--ink2` | `#2E3036` | `#D1D2D6` | Secondary strong text |
| `--muted` | `#565A63` (6.9:1) | `#9A9CA4` (7.2:1) | Descriptions |
| `--eyebrow` | `#5B6170` | `#8C909A` | Small uppercase section labels |
| `--line` / `--line2` | `#E4E7EC` / `#D9DBE1` | `#232327` / `#303036` | Hairlines and borders |
| `--cta-bg` / `--cta-ink` | `#0A0A0B` / `#FFFFFF` | `#F5F5F7` / `#0A0A0B` | The main download button (the one inverse element) |

### Annotation marks (inside drawn screenshots)

| Colour | Hex | Use |
|:--|:--|:--|
| Mark red | `#E5534B` | Boxes, arrows, numbered steps and notes in the drawn editor. Softer than system red; thin strokes, never a large fill |
| macOS blue | `#0A84FF` | Only inside the drawn Mac window (selected tool, Save), because that is what macOS shows |

## Liquid Glass

Surfaces are translucent layers over a soft backdrop, not flat boxes.

| Token | Light | Dark |
|:--|:--|:--|
| `--glass` | `rgba(255,255,255,.74)` | `rgba(28,30,36,.5)` |
| `--glass-strong` (nav, menus) | `rgba(255,255,255,.86)` | `rgba(34,36,42,.68)` |
| `--glass-line` (border) | `rgba(15,35,70,.08)` | `rgba(255,255,255,.08)` |
| `--rim` (top highlight) | `#FFFFFF` | `rgba(255,255,255,.14)` |
| `--frame` (picture backdrop) | `#F7F9FB` → `#E6EBF1` | `#2A2D33` → `#17191D` |
| Backdrop blobs | `#DCEBFA`, `#E6F0FB`, `#EEF4FB` at 55% | `#1B2A44`, `#172338`, `#121B2C` at 50% |

Rules:

- Glass = the glass colour + `backdrop-filter: blur(24px) saturate(180%)` + a 1 px glass line + an inset 1 px rim at the top + a soft shadow.
- Glass needs something behind it: the drifting backdrop blobs, the wallpaper or a picture. Never glass on glass on glass.
- Keep text on glass at full ink colour; don't fade it further.
- Browsers ignore a parent's rounded clip for blurred children: give blurred layers their own matching radius (see the hero menu bar).

## Shape and space

| Element | Radius |
|:--|:--|
| Hero desktop | 28 px (18 px on phones) |
| Cards, showcase, panels | 24 px |
| Glass tiles (tool icons) | 20 px |
| Inputs, small cards | 12 px |
| Buttons, nav, chips | Full pill (999 px) |

- Content width 1200 px with 24 px side padding; sections 150 px apart; card padding 28–36 px.
- Shadows are soft and cool-toned (`rgba(15,35,70,…)`), never pure black blobs.

## Type

- **Family:** the system font first (SF Pro and SF Arabic on Apple devices), then Inter for Latin and IBM Plex Sans Arabic for Arabic on other systems. Mono: `ui-monospace`, SF Mono, Menlo for keys and sizes.
- **Display:** 900 weight, tight tracking (−0.045 em) for the hero name; section titles 800 weight, −0.03 em.
- **Arabic:** weight 700 for headings, letter spacing 0, line height 1.2–1.25. Never inherit Latin tracking.
- **Body:** 16–19 px, line height 1.5. Descriptions in `--muted`.

## Imagery

- The app is shown as a **drawn** macOS editor (`src/lib/editor.ts`) holding an everyday page (a checkout), in the page's language and theme. It stays sharp at any size and has no stale captures.
- The hero puts that window on a vivid macOS-style wallpaper (`public/art/wallpaper.svg`, night version `wallpaper-dark.svg`): deep blue sky, warm orange and violet waves. These are original drawings, not Apple's wallpapers.
- Marks inside pictures: one box, two numbered steps, one short arrow, one short note. Pixelation in one small place at most. Steps sit beside what they mark, never on text.
- Feature pictures share one frame size and the `--frame` backdrop so they read as one family.

## Motion

Library: Motion (`src/scripts/site.ts`).

| Moment | Motion |
|:--|:--|
| Page load | Text rises in (stagger 80 ms), then the desktop slides up, the window follows, marks appear one by one |
| Scroll | Sections rise 26 px and fade in once; siblings stagger 70 ms; the hero window drifts up 36 px |
| Press | Every button and control springs to 94% and back (stiffness 600, bounce 0.55) |
| Theme | The new theme grows from the toggle in a circle (650 ms, view transition); the sun/moon icon spins in |
| Language | Pages cross-fade (cross-document view transition) |
| Tabs | The new panel fades and lifts 10 px |

- Easing for movement: `cubic-bezier(.2, .8, .2, 1)`. Springs for things the visitor touched.
- Durations 0.35–1 s. Nothing loops except the slow backdrop drift and the scrolling-capture demo.
- `prefers-reduced-motion` turns all of it off, and the page is complete without JavaScript.

## Voice

Short, confident and plain. *Capture. Mark up. Share.* — *التقط، وضّح، وشارك.*

- Lead with what the person gets: "Point, number and explain", not "powerful annotation engine".
- Privacy is the promise: no account, no cloud, no tracking. Say only what is true for the build.
- No superlatives, no exclamation marks, no emoji (the changelog is the one exception: one emoji per feature). Name features the same everywhere: Capture Area, Capture Window, Capture Fullscreen, Scrolling Capture, Quick Access, Presets.
- Each language is written for its readers, not translated word for word.

## Search and AI

- One static page per language (`/`, `/ar/`, `/fr/`, `/es/`, `/de/`) with its own title, description, canonical, `hreflang`, Open Graph tags and JSON-LD.
- The page title pattern is "EasyShoot: screenshot app for Mac" in each language; the visible heading carries the same words for search engines and screen readers.
- `public/llms.txt` is the plain summary for AI search; keep it in step with features.
