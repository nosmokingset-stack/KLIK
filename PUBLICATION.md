# Publication scope: KLIK v1.4

Public repository: https://github.com/nosmokingset-stack/KLIK

Version 1.4 reuses the published images. It adds the supplied legal texts in Ukrainian and Russian, the specified shop contact details, twelve preview screenshots and an image availability report. No buyer records, seller registration details or return address were added.

Included: the user-approved current KLIK logo, prepared product WebP images, approved demonstration comparison crops, code-native waves/drops/icons, website source and release preview screenshots. Version 1.2 also includes two sizes of the newly supplied transparent kiosk image, at the user's explicit direction. No new kiosk image was generated.

Version 1.3 publishes three cropped demonstration panels and the color-corrected cutout of the supplied yellow product, as WebP images and a transparent PNG master. Source captures stay in the local release archive.

The source comparison and source product PNG/photo files are retained locally. The comparison is a digital demonstration and is not evidence of a real compatibility test. Its visible disclaimer is localized.

Excluded: the earlier three water-station photographs with unconfirmed rights, other rejected generative station edits, local review pages, source screenshots, archives, environment-specific scripts, private attachments and credentials. The single newly supplied v1.2 kiosk asset is the explicit exception above. See assets/water-stations/PUBLIC-STATUS.md.

The public Git allowlist is in .gitignore; public-files.txt lists the intended tracked files. Other repositories are untouched.

Asset URLs are centralized in assets.config.json, generated into template.xml, and inventoried in asset-links.json. The final release pins the asset base to an immutable commit SHA. Keep previously used image paths available for earlier templates.

Yellow and blue availability can be changed independently in the settings sheet. In V1.5, buyer details are submitted by POST only when the owner enables sales using the settings-sheet switch. The public endpoint never returns order lists or keys. While the switch is off, real orders are rejected. No customer data is intentionally logged or saved to localStorage.

The Blogger theme itself has not been installed or published. This GitHub publication was explicitly requested for source control and asset hosting.
