# KLIK design and text update, 2026-11-27

Updated the current KLIK sources without publishing to Blogger or changing Apps Script.

## Changes

- All six section backgrounds end/start on the original blue/yellow ribbon curves. CSS masks apply only to background layers; the six original SVGs, curve coordinates, thicknesses and gradients are unchanged. Each previous background extends through the next ribbon area. Backgrounds meet the appropriate curve without an underlying straight section boundary. No additional JavaScript or network requests are needed for this treatment.
- Replaced the three hero benefits with the approved UA/RU comfort sentence. The how-to ending contains only the approved safety warning.
- Removed the three requested visible captions, retaining truthful visualization alt text, compatibility information and legal documents.
- Added the exact approved UA/RU introduction, followed by the supplied collage, existing comparison subtitle and unchanged comparison cards.
- Exported the exact collage to 800x400 and 1774x887 WebP, with no cropping or composition changes. User confirmed advertising permissions on 2026-11-27. Source PNG is retained locally.

## Checks

- Chromium desktop and mobile viewport checks: 320, 390, 650, 768, 1024, 1440 and 1920 CSS pixels, each in UA and RU (14 combinations). These are browser viewport tests, not physical-device tests.
- Checked language switching, hero/safety text, problem element order, decoded collage proportions, absence of horizontal overflow and browser JavaScript errors.
- Captured 42 local ribbon-detail screenshots across all seven widths. Reviewed desktop/mobile section screenshots and ribbon transitions.
- Opened the order dialog and verified the existing localized city placeholder in each viewport/language combination. No orders were submitted; backend calls were blocked during these visual checks.
- Compared order-dialog markup, both comparison cards and all six ribbon SVGs byte-for-byte with the pre-edit source. Search scripts, directory styles, legal documents and backend files are unchanged.
- Blogger XML parsed successfully as XML. Both builds use the same body, translations and CSS.
- Public WebP URLs return HTTP 200 and `image/webp`; downloaded SHA-256 hashes match the local files. Sizes: 54,370 bytes (800px) and 147,696 bytes (1774px).

## Files and installation

- `template.xml`: complete Blogger template with inline CSS and JavaScript.
- `index.html`: local HTML; keep it beside all CSS/JS files and the assets directory, or use the full project archive.
- `styles-design.css`: scoped presentation changes, included by `build.cjs` in both versions.
- `preview/design-home-*` and `preview/design-problem-*`: desktop/mobile UA/RU screenshots.

Public images are already uploaded in this repository under `assets/problem/`. Blogger uses immutable HTTPS image URLs pinned to asset commit `92456d3ceaa2ce6de5500931e40b2a7896ff46e3`, recorded in `assets.config.json` and `asset-links.json`; no separate Blogger image upload is needed. Local HTML uses relative assets. If hosting changes later, update the asset base and rebuild.

The live Blogger site has not been changed. No Apps Script redeployment is required.
