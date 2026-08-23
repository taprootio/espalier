# 3.5.0

No unthemed flash when the theme mounts from script.

- `<esp-root theme-pending>` holds the subtree's paint until the theme
  for the active scheme applies — no frame on the default palette, no
  layout shift on reveal. The hold ends on its own (and warns) if no
  theme arrives, so a broken mount shows the wrong colors, never a
  blank page, and the deadline survives a reattach.
- The hold runs from upgrade onward. To close the window before your
  scripts run, add the documented one-liner to your page:
  `esp-root[theme-pending]:not([data-theme-ready]) { visibility: hidden }`.
- Readiness is public: `themeSettled`, `whenThemeSettled()`, and a
  `data-theme-ready` attribute page CSS can gate on.
- The "context is not defined" warning now judges the settled theme, so
  a zone whose context the theme goes on to define stays quiet while a
  genuinely missing one still warns.

# 3.4.0

An offline story for icons: a fully self-contained page renders
Espalier icons with zero network requests.

- `import { installIconSprite } from "@taprootio/espalier/icons"` —
  inline the sprite once (idempotent) and point the root at it:
  `icon-sprite-url="#esp-icons"`.
- The same-document form works for any inline sprite, including your
  own: `<svg id="brand-icons"><symbol id="…">` +
  `icon-sprite-url="#brand-icons"`. Components adopt exactly the
  symbols they reference into their shadow roots; light-DOM
  `<use href="#id">` resolves against the document directly.
- Behavior note: a fragment-only `icon-sprite-url` previously disabled
  icons; it now selects same-document mode.

# 3.3.0

Theme QA: the fit report as a lint over every surface a themed site
has, a CLI that makes fit tables reviewable, and swatch intake.

- `themeFitReportSuite(lightPartial, darkPartial)`: root plus every
  context, both schemes, compiled through the exact zone path a
  `context` attribute uses (`resolveContextTheme`, now exported), with
  cross-token lints — action/canvas separation and link/hover ordering.
- `npx espalier theme check ./theme.json` — validate a pair, print the
  suite, and gate CI on committed fit tables (`--expect`, non-zero on
  drift; refresh deliberately with `--update-expect`).
- The action-surface placement steps past stops indistinguishable from
  the local canvas whenever a separated stop can carry the ink.
- Context declarations accept `semanticMappings` to correct inherited
  root-level pins; the fit report marks pins `declared` / `inherited`.
- New data companions per surface: `--esp-color-series-N-wash` (the
  documented 75% OKLab fill mix, baked against the local background)
  and `--esp-color-series-N-ink` (text-tier contrast).
- `themeFromSwatches` / `deriveLightnessRamp`: brand book in,
  reviewable paired theme starter out (names normalized to anchor
  slugs).
- Fix: `linkHover` is enforced against `linkHoverBg`, the wash hovered
  links actually paint on. Values move only where hover was under tier
  on its rendered wash.

# 3.2.0

Website-tier layout: the pieces a real marketing page proved were
missing (measured: a 297-line style block, 48% layout, none of it
novel).

- `esp-page kind="site"`: sections run edge to edge and the header,
  footer, and every section well share one centered column via
  `--esp-page-well-max-width` (default 72rem).
- `esp-section`: the full-bleed band with a centered well — and the
  natural `context` zone host, with no card identity to neutralize.
  Rhythm defaults to the new fluid `--esp-size-section` step.
- `esp-stack` and `esp-row`: column and wrapping-row flow with
  space-scale gaps. Stacks stretch like block flow while slotted
  buttons keep their natural width — the pairing a plain flex column
  cannot express.
- Layout tokens: `--esp-measure` / `--esp-measure-wide`,
  `--esp-size-section`, `--esp-shadow-1..3` (elevation; level 1 is
  exactly the shadow `esp-box` always painted, now overridable via
  `--esp-box-shadow`), and `--esp-card-min` for the auto-fit card-grid
  recipe.
- `esp-root` accepts theme objects directly: `root.lightTheme = {...}`
  / `root.darkTheme = {...}` encode through the same pipeline as the
  `light-theme` / `dark-theme` attributes.
- New export subpaths: `./section`, `./stack`, `./row`, and dedicated
  entries for `./flyout`, `./progress`, `./toaster`, `./tooltip`.

# Changelog

All notable changes to the public `@taprootio/espalier` package are documented
here. This file ships in the published npm package. It is a curated public
record and intentionally does not mirror the private `taproot-controls`
development history.

## 3.1.0 — Info becomes a real blue family, and intent colors become yours

- Give `intent="info"` its own fixed status family: blue (hue 244), derived
  and emitted like danger/success/warning as `--esp-color-info`. It no
  longer borrows the complementary family, which could render informational
  styling green on complementary-adjacent brand seeds and made `info` mean
  different colors on buttons versus badges.
- Add the `intents` theme field: retune any status family with an absolute
  color — an `anchor:` reference or a supported color form (hex,
  `rgb()`, `hsl()`, `oklch()`; CSS keywords are not parsed)
  (`"intents": { "danger": "#700007", "info": "anchor:sky" }`). One
  override drives the emitted family token, `intent=` pins on controls,
  class-styled chrome, and derived tokens such as `dangerText`; the legacy
  `semanticHues`/`variantChroma` knobs are ignored for an overridden
  family. Overrides retune a family, never reassign one: `validateTheme`
  rejects family names as values and warns when two status colors — or a
  status color and the action color — become hard to distinguish, with
  per-pair remediation advice counterfactual-tested as rendered at
  emitted-token precision: a remedy is offered alone only when it
  separates the pair by itself, as an explicit "widen/move, then
  retune" sequence only when a concrete retune is found under it, and
  never when it cannot work or is not proven to — a retune is
  promised only when a concrete emitted candidate clears the
  threshold, and a pair whose best candidate lands within the audit's
  search margin is flagged as unreliable to retune rather than
  impossible.
- Add the `accent.hover` role slot, so a hover can change family rather
  than only lightness; when absent, `linkHover` follows `accent.text`
  unchanged.
- Warn when an explicit `chroma` band targets an anchor-sourced token and
  would move a declared swatch off its color.

## 3.0.0 — Intent and context replace the variant attribute

- Remove the `variant` attribute. Its two jobs are now separate attributes:
  `intent` (`neutral`, `success`, `warning`, `danger`, `info`) states what an
  element means, and `context` selects a theme-defined zone that re-emits the
  complete, contrast-enforced semantic token table for its subtree.
- Rename status values mechanically (`variant="danger"` becomes
  `intent="danger"`; `variant="primary"` is deleted). Geometric values
  (`complementary`, `triadic-left`, and the rest) have no rename: express each
  usage as a named theme context. A leftover `variant` attribute is inert;
  unknown `intent` values warn once and render as `neutral`, with the
  attribute reflecting the normalized value, and removing the attribute
  restores the element's own default intent.
- Pin the filled-action pair on token-emitting controls to the intent's
  family — fixed status hues for danger/success/warning, the complementary
  family for info — derived over the governing context's theme with APCA
  contrast enforced. Intents never repaint the surrounding zone.
- Replace the `EspalierVariant` type with `EspalierIntentVariant` and
  `ToastConfig.variant` with `ToastConfig.intent`.
- Remove the protected variant hooks from `EspalierElementBase`:
  `variantBacker` becomes `intentBacker`, `applyVariantTokens()` becomes
  `applyScopedColorTokens()`, and `getVariantColorSource()` is gone;
  class-styled chrome opts out of inline emission with
  `intentEmitsTokens = false`.
- Change `esp-info`'s default appearance: instead of re-seeding inline tokens
  from the complementary family it renders a class-based informational surface
  themeable via the `--esp-info-*` custom properties, and toasts without an
  explicit intent render that same treatment.

## 2.14.0 — Stable workspace resizing and trailing-edge controls

- Yield a safely linked navigation rail after auxiliary panes contract and
  before reclaiming main below its natural maximum, then retain the drawer
  presentation whenever restoring the rail would change the settled workspace.
- Add a recovery margin so navigation settlement remains stable across repeated
  layout observation and restores only after expansion or pane contraction can
  preserve the main, preview, and help allocation.
- Keep the Main/Preview separator moving after main reaches its maximum by
  shrinking preview independently and placing the released width in the aligned
  outer canvas, including centered, keyboard, LTR, and RTL interactions.
- Keep separator ARIA accurate through the main-cap transition by capping its
  numeric main range and announcing the changing preview width in value text.
- Keep viewport-height full-document help sticky while the application scrolls
  through its footer, while compact contextual help continues to move with its
  originating field, and add a dedicated full-page workspace documentation lab.
- Expose the trailing edge of the last in-grid Preview or Help pane as an
  independent pointer and keyboard resize separator whenever outer canvas is
  available, with public parts and resize-event separator identities.
- Extend the exported `PageWorkspaceSeparator` union with `"preview-end"` and
  `"flyout-end"`; TypeScript consumers with exhaustive separator switches must
  handle the two new trailing-edge identities.
- Let an outward edge drag consume the complete aligned outside canvas, so
  reaching the page edge maximizes Preview or Help within its configured bound.
- Let Preview/Help consume trailing outside room before contraction, keeping
  Help at its current width until it reaches the page edge. Main/Preview may
  push the trailing group only while main can grow; a capped main instead
  shrinks Preview immediately and releases aligned outside surplus, with
  pointer tracking, centered settlement, keyboard access, and accurate value
  text.
- Control the workspace's logical leading position during pointer resizing so
  the active line follows the cursor through zero-sum and outward growth, then
  smoothly return the completed workspace to its configured alignment.

## 2.13.1 — Workspace allocation and centering

- Honor an explicit finite `--esp-page-main-max-width` on `kind="full"` pages.
- Allocate configured auxiliary defaults and retained resize preferences through
  the same contraction-first responsive path.
- Contract automatic defaults against natural spare canvas without reclaiming
  main merely to preserve them. Re-clamp a retained user choice monotonically
  to the complete capacity available down to main's minimum instead of changing
  policy at the minimum-fit threshold.
- Cap and center the complete main, preview, and in-grid help workspace on
  ultra-wide centered layouts.

Migration: an explicit `--esp-page-main-max-width` now caps a `kind="full"`
page. Consumers that previously relied on `kind="full"` to ignore a shared main
maximum should unset that token on the full page.

## 2.13.0 — Default page workspace widths

- Add `--esp-page-preview-default-width` and
  `--esp-page-flyout-default-width` as independent, min/max-clamped automatic
  allocation targets without changing the legacy fixed-width aliases or the
  established allocation when the new tokens are unset.
- Shrink defaulted help and preview widths toward their independent minimums,
  in help-before-preview order, before reclaiming the main well. Apply the same
  behavior to preview-only and help-only layouts while retaining the existing
  minimum-fit preview hiding and help overlay ladder.
- Keep pointer and keyboard resize preferences authoritative over configured
  defaults, with the existing responsive clamping, hiding, overlay recovery,
  restoration, and independent min/max resize travel.
- Document the new API and add unit and browser coverage for default bounds,
  contraction, one-pane allocation, preference precedence, responsive
  restoration, legacy aliases, and the unset-token fallback.

## 2.12.1 — URL help flyout fixes

- Change contextual help flyouts to the normalized document title when “View
  full document” expands the topic, while retaining the field anchor and
  scrolling the requested section into view.
- Avoid repeating a matching leading document `h1` inside embedded
  full-document help, and start each new unanchored document request at the top
  of the flyout's own scroll surface.

## 2.12.0 — Resizable page workspaces

- Add opt-in `esp-page workspace-resizable` separators for Main → Preview and
  Preview → in-grid Flyout/Help, supporting pointer drag, physical-direction
  Arrow keys, larger Shift+Arrow steps, LTR, and RTL. Both seams press on
  through preview's minimum — Main/Preview into open help, Preview/Help into
  main — and resize sessions apply widths directly, with no mid-interaction
  renegotiation and no track-transition glide, so pointer capture survives in
  every engine, drags track the cursor, each drag lands its complete delta,
  and a focused separator keeps keyboard focus across repeated Arrow steps
  (settling when focus leaves it). Navigation collapse triggered by a resize
  happens during the session, not after it. Separators announce pane widths
  that keep changing across their complete travel — main's width, then
  help's width — and without a visible preview the second seam becomes the
  distinct `main-flyout` separator (own part and event identity) sizing help
  directly against main.
- Retain selected pane sizes for the mounted page instance and feed them back
  through the existing allocator, preserving all main/preview/help min/max
  bounds, navigation collapse, preview hiding, responsive re-clamping and
  restoration, and help overlay promotion.
- Expose both seams as labelled, focusable vertical ARIA separators with live
  min/max/current values, a dashed keyboard-focus line drawn along the seam
  itself (one viewport tall, glowing in the line's own color), comfortable
  transparent hit targets, public parts and CSS interaction tokens, and the
  typed bubbling `esp-page-workspace-resize` event, whose width fields report
  the current allocated pane widths.
- Bound keyboard resize suspension to a short idle window so container/media
  changes resume allocator re-clamping while focus remains on a separator, and
  clean up interrupted measurement/collapse session state across disable,
  disconnect, and reconnect lifecycles.
- Hide unavailable separators when preview is hidden or help becomes an overlay,
  and suppress selection and touch-page scrolling while dragging.
- Hide the thick anchored-help seam terminus when no visible preview separates
  help from its field; the bridge and terminus now appear only for detached help.
- Add Page examples and layout guidance for preview-only and preview-plus-help
  resizing, plus pointer, keyboard, responsive, ordering, navigation, overlay,
  and real-browser regression coverage.

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
