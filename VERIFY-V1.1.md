# KLIK v1.1 validation

- XML parsed successfully with System.Xml.XmlDocument; JavaScript syntax checked by Node.js.
- Header and hero body markup match the local v1.0 release exactly. Previous header/hero CSS rules are unchanged; new comparison rules are scoped separately.
- Chrome: 320, 390, 650, 768 and 1440 px for the comparison; general navigation and localization also tested at 1024 px.
- Verified two comparison images, localized native titles/captions/alt/disclaimer, horizontal desktop and vertical mobile order, no horizontal overflow, loaded images, working anchors and menu.
- Verified saved language after reload and functioning UI when localStorage is blocked.
- Verified animation sequence heading → before (0.15 s) → arrow (0.35 s) → after (0.55 s), final visibility, reduced motion and visible comparison content without JavaScript.
- No uncaught JavaScript exceptions in tested scenarios.
- Desktop and mobile comparison screenshots are in preview/. Full local reports are retained outside the public Git allowlist.

Public asset verification is recorded in preview/public-links-report.json after upload: unauthenticated GET, final HTTP status, Content-Type, body decode and hash match against the local file. That report is generated from asset-links.json; it does not contain credentials.

Release result: **36/36 direct graphic URLs passed** unauthenticated GET (HTTP 200), expected image MIME, SHA-256 equality and Chrome image decoding. The landing also rendered successfully with its images loaded from those public URLs. Asset commit: `5033f677e78f983f8606be90cf0887c4ca699b03`.

Limits: no Blogger editor/server transformation test, no real mobile-device/Safari test, no Lighthouse score claimed. The comparison is a visualization; device compatibility is not validated by this software work. Station-photo rights remain unconfirmed and those photographs are excluded.
