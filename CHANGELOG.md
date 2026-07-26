# Changelog

All notable changes to the public `@taprootio/espalier` package are documented
here. This file ships in the published npm package. It is a curated public
record and intentionally does not mirror the private `taproot-controls`
development history.

## 2.11.0 — Flexible preview and help workspace

- Arrange the `esp-page` authoring workspace as main, full-viewport preview,
  then help, with independent preview and flyout controls.
- Add min/max width contracts for main, preview, and help. Preview grows first,
  help grows after preview reaches its maximum, and all three participate in
  one spare-canvas, main-reclaim, and safe-navigation-collapse decision.
- Retain a validated collapsed navigation rail whenever its saved width keeps
  the complete workspace visible, restoring it only when all region minimums
  fit with the rail present.
- Bridge anchored help across a visible preview with a non-interactive,
  40%-opacity dotted connector, caret at the main edge, and a short thick
  terminus on the preview/help seam.
- Present preview as a default secondary surface with the main/page background,
  dotted tear-off edge, and outer shadow moved from main to preview.
- Promote auto-mode help to the accessible overlay drawer whenever sidebar +
  main + help minimums cannot fit, even above the mobile breakpoint, and restore
  its in-grid complementary presentation when space returns.
- Allocate preview and help widths from the visible page bounds, so a layout
  box slightly wider than the visual viewport — such as a `100vw` page beside
  a classic scrollbar — narrows help by the hidden sliver instead of promoting
  the modal drawer.
- Keep page-managed drawers stable across scroll-lock width changes, prevent
  rejected preview measurements from flashing, keep candidate tracks mounted
  until their geometry is stably valid or invalid, and raise nested drawers
  above ancestor page headers.
- Let preview and non-modal help scroll their own content first, then hand
  wheel/trackpad motion back to the main document at either boundary or when
  they have no intrinsic overflow.
- Add a live Page example showing an editable field, persistent preview, and
  anchored contextual help together, expanding main to full width when both
  auxiliary surfaces are closed. Help starts closed so the documentation never
  opens with an unsolicited modal drawer.

## 2.10.1 — Full-viewport persistent preview

- Correct `esp-page` persistent previews to begin at viewport top beside the
  application header and remain visible while tall main content scrolls.
- Give preview content an independent `100dvh` scroll surface with a zero sticky
  offset, including pages with normal, sticky, or fixed headers.
- Preserve spare-width negotiation, sidebar collapse, responsive hiding,
  flyout precedence, and the existing `preview` slot and preview-control APIs;
  consumers need no shadow-part styling or new compatibility attribute.

## 2.10.0 — Persistent spare-width preview

- Add a dedicated persistent `preview` slot to `esp-page`, separate from the
  always-present `right` aside and transient `flyout` surface.
- Use spare trailing canvas first, optionally reclaim main and linked navigation
  width down to a configured floor, and automatically hide and restore the
  preview as available space changes.
- Preserve flyout precedence and expose labelled complementary-landmark,
  visibility, toggle, width, and sidebar-collapse contracts for authoring tools.

## 2.8.0 — Popover collision strategies

- Add declarative `flip`, `shift`, and `none` collision strategies to
  `esp-popover`, preserving the existing side-flipping behavior by default.
- Allow placement-sensitive panels to remain on their requested side while
  shifting into the viewport across scroll, resize, and target or content
  geometry changes.
- Keep alignment and string/pixel offsets composable with collision handling,
  including valid negative `offset-x` and `offset-y` expressions.

## 2.7.2 — Popover outside-click dismissal

- Close target-triggered and programmatically opened `esp-popover` surfaces
  when the user clicks outside them.
- Preserve interactions within top-layer content, nested popovers, and picker
  menus while balancing dismissal, resize, and scroll listeners across the
  complete popover lifecycle.

## 2.7.1 — Picker and popover composition

- Keep every containing `esp-popover` open when an `esp-pick-one` or
  `esp-pick-some` menu opens or accepts a selection.
- Preserve normal close coordination for other pickers, unrelated popovers,
  and clicks outside the composed popover hierarchy.

## 2.7.0 — Focal image banners and texture assets

- Add focal-point-aware banner rendering to `esp-image`, with responsive
  ratios, content-positioned scrims, static procedural textures, semantic
  overlay content, and resilience fallbacks.
- Add `esp-focus-picker` for pointer and keyboard focal authoring with live wide
  and compact banner previews.
- Ship three deterministic first-party banner texture tiles, their convenience
  stylesheet, public package subpaths, and provenance/reproducibility checks.
- Consolidate the footer decorative image and banner layers on one neutral
  internal primitive without changing the footer's public styling contract.

## 2.6.0 — Scoped root events and explicit footer columns

- Add typed `esp-root.subscribeScoped()` subscriptions for scheme, seed color,
  theme, and icon-sprite changes so nested preview roots cannot trigger handlers
  owned by an outer application root.
- Make root theme events change-only: mounting a root establishes initial state
  without broadcasting global theme events.
- Clean up the shared document-click bridge and correlation-owned runtime Google
  Font links across root disconnect/reconnect cycles.
- Add `esp-footer-column` for creator-controlled stacks of footer link groups,
  including ordered compact-container stacking without changing bare-group
  auto-flow.

## 2.5.0 — Published-site header and branding contracts

- Export the `esp-header` option unions and normalize unsupported attribute or
  property values to their documented reflected defaults.
- Add light/dark configured logos and brand colors to `esp-header` and
  `esp-footer`, with reactive scheme selection and generic fallbacks.
- Emit `esp-theme-toggle` only when a visitor activates the header's built-in
  theme control, allowing hosts to persist explicit choices safely.

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
