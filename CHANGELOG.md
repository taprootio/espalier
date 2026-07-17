# Changelog

All notable changes to the public `@taprootio/espalier` package are documented
here. This file ships in the published npm package. It is a curated public
record and intentionally does not mirror the private `taproot-controls`
development history.

## 2.4.0 — Customizable footer and page-shell refinements

- Add `esp-footer` and `esp-footer-link-group` with responsive brand, media,
  link-group, aside, bottom, background-pattern, and large-image regions.
- Align footer content to `esp-page` surfaces while keeping footer backgrounds
  full-bleed, with an explicit full-bleed content opt-out.
- Keep expanded inline sidebar navigation reachable through ordinary document
  scrolling instead of requiring a separate pointer-hovered rail scroller.

### Migration note

Inline `esp-menu mode="vertical"` rails no longer cap themselves to the
viewport or create an internal vertical scroller. This lets page shells move a
tall rail naturally as the document scrolls. Standalone menus in fixed-height
or overflow-hidden shells can retain the old bounded presentation by setting
`max-height` and `overflow-y: auto` on the `esp-menu` host.

## 2.3.1 — Lightbox reliability and semantic contrast

- Keep projected lightbox images constrained across repeated close and reopen
  cycles, including projected `<picture>` and bare `<img>` sources.
- Size portrait, landscape, square, and panoramic lightbox images explicitly to
  their largest contained box and advertise the visible width to responsive
  image selection across viewport changes.
- Keep lightbox focus, scroll locking, observers, captions, and gallery
  navigation synchronized across lifecycle and source-gallery changes.
- Increase the default contrast of breadcrumb separators, image-upload drop
  boundaries, and progress fills in light and dark themes while preserving
  public CSS overrides.

## 2.0.0 — Initial public release

The first public release of Espalier, Taproot's enterprise-grade web component
design system, distributed as the `@taprootio/espalier` npm package.

- Compiled, obfuscated ES module components built on Lit and browser standards.
- Public TypeScript declarations for every supported component subpath.
- Machine-readable API surface: `custom-elements.json`,
  `espalier.token-manifest.json`, and `espalier.css-data.json`.
- Runtime CSS reset and generated font preview assets under `css/`.
- Third-party notices and asset provenance under `licenses/`.

The package ships compiled artifacts only. See `LICENSE` for license terms;
production use requires a paid order form or another written agreement with
Taproot unless the license expressly allows the use case.
