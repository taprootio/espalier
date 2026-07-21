# Asset Provenance

This note summarizes the machine-readable asset manifest in
`licenses/asset-provenance.json`. Keep both files together when adding,
removing, or replacing non-code assets.

## Summary

| Asset area | Provenance | Notice |
|------------|------------|--------|
| `css/fonts/**` | Generated Google Fonts preview CSS with per-family notices generated from upstream Google Fonts metadata links. | `licenses/GOOGLE_FONTS_NOTICES.md` |
| `assets/icons.svg` | Tabler-derived SVG symbols plus Taproot-owned logo symbol. | `licenses/THIRD_PARTY_NOTICES.md` |
| `*.ts` | Inline Tabler-style SVG templates and Taproot rendering helpers. | `licenses/THIRD_PARTY_NOTICES.md` |
| `dist/shared/virtualizer/**` | Vendored Lit Virtualizer runtime source compiled into Espalier's package. | `licenses/THIRD_PARTY_NOTICES.md` |
| Brand favicons/logos | Taproot-owned Espalier brand assets. | None |
| Demo textures | Taproot-owned generated PNG textures created for this repository. | None |
| `css/textures/*.png` | Deterministic 256×256 first-party tiles from `node scripts/generate-banner-textures.js`; byte-for-byte verification uses `--check`. | None |
| Banner preset reference sheets | Taproot-authored browser captures of the locked visual recipes over the provenance-cleared bright and dark canvas images. | None |
| `assets/focus-picker-unsplash.jpg` | Docs-only landscape photograph by Sasha Freemind, downloaded from Unsplash and used to make focal-point movement easy to see. | Attribution is included in the focus-picker demos. |
| `assets/canvas-bg.jpg` | Docs-only light canvas texture — Envato Elements item "Seamless Pattern Design With Colorful Flowers" by yusufdemirci; certificate `licenses/license_certificate_A2BVZ6Y9DN.pdf`; attribution not required; kept out of the published `@taprootio/espalier` package. | None |
| `assets/canvas-bg-dark.jpg` | Docs-only dark canvas texture — Envato Elements item "Nocturnal Garden Pattern" by Webvilla; certificate `licenses/license_certificate_HF5ZVPRNC2.pdf`; attribution not required; kept out of the published package. | None |
| Demo JSON data | Taproot-authored fictitious samples or standards-derived factual color data. | None |

## Texture Replacement

The previous `assets/connectwork.webp` and `assets/papyrus.webp` files had
unclear provenance and were removed. They were replaced with generated,
project-owned assets:

- `assets/espalier-geometric-texture.png`
- `assets/espalier-paper-texture.png`

The generated prompts intentionally requested original, seamless-style demo
textures and avoided named third-party texture patterns.

## Gate

`npm run check-package-artifacts` validates that packaged font assets and
tracked docs assets have matching entries in `licenses/asset-provenance.json`.
When adding a non-code asset, add or update a manifest entry at the same time
and add a third-party notice when the manifest says one is required.
