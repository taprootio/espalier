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
| Brand favicons/logos | Taproot-owned Espalier brand assets. | None |
| Demo textures | Taproot-owned generated PNG textures created for this repository. | None |
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
