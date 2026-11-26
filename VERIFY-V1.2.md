# KLIK v1.2 — validation

- Header, navigation, approved problem comparison and the eight other section bodies match the v1.1 source. Eleven sections remain in the same order; existing base CSS and wave artwork are retained.
- Hero includes the newly supplied kiosk at full opacity behind the existing product/water artwork. No price cards or former blue-status caption remain in hero.
- Both original price designs are in order and use native keyboard-operable buttons. Main CTA and price navigation still anchor to order rather than opening the dialog.
- Chrome viewports: 1440, 1024, 768, 390 and 320 px. No page or dialog horizontal overflow. Kiosk loaded; normal and reduced-motion dialog appearance checked.
- Tested both card presets, switching packages without losing fields, all four two-color combinations, both single colors, 199/299 totals and exclusion of delivery charges.
- Blue manufacture/visualization status is shown whenever any active selection is blue. Hidden second-color controls are disabled for a single item; their choice is retained when switching back to a pair.
- Tested UA/RU while the dialog is open, including translated validation errors, labels, color legends and information messages. Entered data and selections survive localization.
- Tested required fields; +380 mask accepts domestic and international input, supports normal typing/deletion, and rejects incomplete numbers.
- Tested native modal focus containment and background inertness, Escape, close button, backdrop close, synchronous scroll unlock and return to the invoking card. Background scroll is blocked; the dialog scrolls internally and its close header stays available.
- Valid client submission displays only an explicit not-sent message. No non-GET requests were made in the form test. Buyer details are not logged, stored in localStorage or sent anywhere by application code.
- No uncaught JavaScript exceptions in the tested scenarios. XML parsed with System.Xml.XmlDocument; every image reference is generated as public HTTPS for Blogger.

Screenshots: preview/hero-1440-v1.2.png, hero-390-v1.2.png, order-1440-v1.2.png, order-390-v1.2.png, modal-one-1440-v1.2.png, modal-two-1440-v1.2.png, modal-one-390-v1.2.png and modal-two-390-v1.2.png. On small screens the modal scrolls to reach the total and action; a bottom-state screenshot is also included.

Public graphics are inventoried in asset-links.json and validated in preview/public-links-report.json: unauthenticated HTTP status, MIME, hash equality, browser decoding and a page rendered with public-image URLs.

Release result: **38/38 assets passed** unauthenticated HTTP 200, expected image MIME, SHA-256 equality and Chrome decoding. Public-image rendering was also checked in the hero and the open two-item dialog. Immutable asset commit: `9177a129b58d0308fb304b2f5bc0c1affcb36e7c`.

Limits: real order delivery/backend, Blogger's editor transformation, Safari and physical-device behavior are not tested or claimed. The supplied kiosk asset is used as directed without regeneration; this work does not establish product compatibility or municipal endorsement. No template was installed in Blogger.
