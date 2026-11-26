# KLIK v1.3 – Blogger landing page

KLIK — «Магнітна кнопка для води». Один клік – вільні руки!

Standalone Blogger XML theme and buildless local preview. Ukrainian is the default language; Russian is available without reloading, with the choice saved locally. Prices: one button 199 грн, two buttons 299 грн, saving 99 грн.

## Preview and source

Open index.html locally, or run `node serve.cjs` and visit http://127.0.0.1:4173/. `preview/index.html` is an alternate preview entry. Internet access is used for Google Fonts; system-font fallbacks are available.

Version 1.3 contains six landing sections, the approved kiosk hero, photo instructions, product care information and eight localized FAQ entries. See VERIFY-V1.3.md for the Blogger order-dialog diagnosis, browser checks and installation verification. The form previews the selection and validates buyer details locally.

The existing header, navigation, brand typography/colors, decorative waves, eleven-section sequence and approved comparison block are preserved. The remaining eight sections are structural placeholders. Comparison text, frames and arrow are native, localized HTML/CSS/SVG. Reduced motion is supported throughout.

- `body.html`, `site.css`, `styles-v1.2.css`, `site.js`: source; translations are centralized in site.js.
- `build.cjs`: generates index.html, preview/index.html and standalone template.xml with inline CSS/JS.
- `assets.config.json`: central public asset base, pinned to the asset commit.
- `asset-links.json`: all direct public graphic URLs.
- `template.xml`: installable Blogger theme; no Base64 images and no manual image upload required.
- `preview/`: preview, desktop/mobile screenshots and public-link validation report.
- `INSTALL.md`, `PUBLICATION.md`, `VERIFY-V1.2.md`: installation, public scope and validation limits. The v1.1 report/screenshots remain as history.

Run `node build.cjs` after source edits. For a deliberate new asset host, run `node build.cjs --asset-base https://your-host.example/path/`. The trailing assets/ directory is included in source paths; the base points to its parent. Do not use local disk paths in the XML.

The blue product is not yet manufactured; its visualization/availability status appears whenever blue is selected in the dialog. Availability and lead time are not promised. The before/after comparison remains visibly identified as a visualization rather than a documentary product test. Compatibility with a particular station needs real testing. KLIK is independent and no municipal endorsement is asserted.

Earlier water-station photos with unconfirmed rights, original high-resolution images, rejected edits and local working files are not published. The newly supplied and explicitly selected v1.2 transparent kiosk asset is included in two WebP sizes without regeneration. See PUBLICATION.md. Retain old asset paths when releasing updates so earlier themes keep working.

Current Blogger address: https://klickkhua.blogspot.com/ . Future domain: https://klik.kh.ua/ . The future domain is not connected by this project. The Blogger theme has not been published by this work.
