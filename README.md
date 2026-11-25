# KLIK v1.1 — Blogger landing page

KLIK — «Магнітна кнопка для води». Один клік – вільні руки!

Standalone Blogger XML theme and buildless local preview. Ukrainian is the default language; Russian is available without reloading, with the choice saved locally. Prices: one button 199 грн, two buttons 299 грн, saving 99 грн.

## Preview and source

Open index.html locally, or run `node serve.cjs` and visit http://127.0.0.1:4173/. `preview/index.html` is an alternate preview entry. Internet access is used for Google Fonts; system-font fallbacks are available.

The header and hero retain v1.0 design. Version 1.1 implements the second section «Знайома ситуація?» with native localized titles/captions, cropped approved comparison images, blue frames, a yellow SVG transition arrow and sequential reveal animation. On mobile the comparison becomes vertical. Reduced motion is supported. The remaining nine sections are structural placeholders only; order submission is not enabled.

- `body.html`, `site.css`, `site.js`: source; translations are centralized in site.js.
- `build.cjs`: generates index.html, preview/index.html and standalone template.xml with inline CSS/JS.
- `assets.config.json`: central public asset base, pinned to the asset commit.
- `asset-links.json`: all direct public graphic URLs.
- `template.xml`: installable Blogger theme; no Base64 images and no manual image upload required.
- `preview/`: preview, desktop/mobile screenshots and public-link validation report.
- `INSTALL.md`, `PUBLICATION.md`, `VERIFY-V1.1.md`: installation, public scope and validation limits.

Run `node build.cjs` after source edits. For a deliberate new asset host, run `node build.cjs --asset-base https://your-host.example/path/`. The trailing assets/ directory is included in source paths; the base points to its parent. Do not use local disk paths in the XML.

The blue product and the before/after comparison are digital visualizations. The comparison is not a documentary product test. Compatibility with a particular station needs real testing. KLIK is an independent brand and no municipal endorsement is asserted.

Water-station photos with unconfirmed rights, original high-resolution images, rejected edits and local working files are not published. See PUBLICATION.md. Retain old asset paths when releasing updates so earlier themes keep working.

Current Blogger address: https://klickkhua.blogspot.com/ . Future domain: https://klik.kh.ua/ . The future domain is not connected by this project. The Blogger theme has not been published by this work.
