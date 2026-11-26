# Install KLIK v1.3 in Blogger

The provided template.xml already contains direct public HTTPS image URLs from the KLIK GitHub repository. No manual image upload to Blogger, URL copying or XML image edits are required.

1. Download template.xml from the main branch of https://github.com/nosmokingset-stack/KLIK . Keep a backup of the existing Blogger theme and settings.
2. Open the intended blog, currently https://klickkhua.blogspot.com/ , then Theme → Edit HTML (or restore/upload XML through the theme menu). Replace the theme with template.xml and save only when ready to publish it.
3. If Blogger offers a separate mobile theme, select the current responsive theme for mobile devices.
4. Verify images, UA/RU, mobile menu, anchor links, both comparison panels and their visualization disclaimer in preview and after saving. Check Console/Network and the ?m=1 variant. Blogger may normalize XML during save, so recheck the rendered result.

This task did not install or publish the theme in Blogger. XML syntax and the local browser version are checked; final platform acceptance must be verified in its editor.

For v1.3 also check the recognizable kiosk behind the products, absence of prices on hero, relocated cards in order, dialog preselection, both independent colors for a pair, blue production status, keyboard/backdrop close, phone mask and required-field messages in both languages. The dialog is client-only: data is not sent and no success is simulated. Do not treat form completion as an actual order. A server integration will be a separate change.

## Asset management

All direct graphic links are listed in asset-links.json. The root URL is centralized in assets.config.json. The release pins it to a specific asset commit on raw.githubusercontent.com; future changes to main cannot alter those referenced files. To publish new graphic variants, add files, commit/push them to KLIK, set baseUrl to that asset commit URL, and run `node build.cjs`. Then commit/push the updated XML and sources. Do not delete image paths used by prior releases.

For local preview, image paths remain relative. For Blogger, the builder makes src/srcset/og:image absolute HTTPS addresses. CSS, JavaScript and vector decorations are inline in the XML; fonts use Google Fonts with system fallbacks. No Base64 images are used.

## SEO and future work

The initial HTML language and SEO metadata are Ukrainian. UA/RU changes the interface, alt and accessible labels; it does not create independent language URLs. In XML, canonical and og:url follow Blogger data; anchor navigation is domain-independent. The future klik.kh.ua domain has not been connected.

Optional favicon, Search Console verification and Analytics insertion points are commented in build.cjs/template.xml. Add future configuration to build.cjs so it survives rebuilding. There are no active analytics integrations, fabricated ratings or working order submission.

Reference: [Blogger layout sections](https://support.google.com/blogger/answer/46888), [b:skin CSS](https://support.google.com/blogger/answer/46871), [theme editing](https://support.google.com/blogger/answer/176245).
