import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierDialog } from "../dialog/esp-dialog.js";
import "../toaster/esp-toaster.js";
type HeaderPosition = "normal" | "sticky" | "fixed";
export type PageWorkspaceSeparator = "main-preview" | "preview-flyout" | "main-flyout";
export type PageWorkspaceResizeSource = "keyboard" | "pointer";
/** Detail emitted while an `esp-page` workspace separator changes pane sizes. */
export interface PageWorkspaceResizeDetail {
    /**
     * Separator that initiated the resize. The second physical seam reports
     * `"preview-flyout"` while preview is visible and `"main-flyout"` when it
     * sits directly between main and help because preview is hidden or closed.
     */
    separator: PageWorkspaceSeparator;
    /** Input modality that initiated the resize. */
    source: PageWorkspaceResizeSource;
    /** Currently allocated preview width in CSS pixels, or zero while preview is hidden. */
    previewWidth: number;
    /** Currently allocated in-grid flyout/help width in CSS pixels, or zero when closed. */
    flyoutWidth: number;
}
/**
 * Used to lay out standard page structure.
 *
 * @slot header - Global navigation content (typically an `esp-header`).
 *
 * ```html
 * <esp-page class="docs">
 *   <esp-header slot="header">
 *     <a href="#" slot="brand" class="nav-logo">
 *       <svg>
 *         <use href="/assets/icons.svg#taproot-logo" />
 *       </svg>
 *     </a>
 *     <esp-menu slot="menu" mode="horizontal">
 *       <esp-menu-item label="Mammals" url="#"></esp-menu-item>
 *       <esp-menu-item label="Reptiles" url="#"></esp-menu-item>
 *       <esp-menu-item label="Amphibians" url="#"></esp-menu-item>
 *     </esp-menu>
 *     <esp-header-button slot="buttons" icon="cog" aria-label="Settings"></esp-header-button>
 *   </esp-header>
 *   <esp-menu slot="sidebar" mode="drawer"></esp-menu>
 *   <div slot="right" style="background-color: purple;">right</div>
 *   <esp-footer slot="footer" brand-text="Espalier"></esp-footer>
 *   <div style="background-color: black; overflow: hidden;">
 *     content
 *   </div>
 * </esp-page>
 * ```
 *
 * The authoring workspace is ordered main, preview, then help. Each region
 * negotiates between public minimum and maximum widths; preview grows first,
 * then help. Set `workspace-resizable` to expose accessible drag and keyboard
 * separators on the dotted seams. Preferred pane sizes remain attached to the
 * mounted page instance and are re-clamped by the same allocator whenever the
 * available inline size changes. Opt into collapsing a directly paired
 * header/sidebar navigation to its accessible burger/drawer mode when the
 * combined workspace needs it.
 *
 * @slot sidebar - Contextual navigation placed in the left aside.
 * @slot right - Content to place in the right aside.
 * @slot preview - Persistent preview content placed after the main surface and
 * before help. It grows from `--esp-page-preview-min-width` to
 * `--esp-page-preview-max-width`, starting at
 * `--esp-page-preview-default-width` when that token is set. It starts at
 * viewport top and gives its content an independent `100dvh` vertical scroller. At
 * either scroll boundary, wheel and trackpad motion chains back to the main
 * document. Unlike flyout content, preview content is never replaced by the
 * flyout request bus.
 * @slot flyout - A transient `esp-flyout` panel that lives on the
 * canvas after preview. Closed it costs no width; open it grows from
 * `--esp-page-flyout-min-width` to `--esp-page-flyout-max-width`, starting at
 * `--esp-page-flyout-default-width` when that token is set. It receives
 * remaining flexible space after preview when no default is set, then docks as
 * a width-competing right sidebar when no gutter exists and becomes an overlay
 * drawer on small viewports.
 * The persistent `right` aside and the transient flyout are
 * complementary, not alternatives. A flyout opened with an `anchor`
 * aligns to that trigger and stays in the same document scroll flow. When a
 * preview is visible, its caret and non-interactive dotted bridge cross the
 * preview back to the anchor, ending at a short thick marker on the
 * preview/help seam.
 * @slot footer - Content to place in the footer. Slot `esp-footer` directly
 * to receive the page's surface-alignment custom-property contract. A wrapper
 * can preserve landmark semantics but does not receive that direct contract.
 * @slot - The main page content. The main content region applies
 * `contain: inline-size` so child components cannot push the
 * content well wider than its grid column. In `narrow` mode,
 * slotted children are constrained to `max-inline-size: 66ch`
 * for optimal reading measure.
 *
 * @event {CustomEvent<PageWorkspaceResizeDetail>} esp-page-workspace-resize -
 * Fired while a pointer or keyboard interaction changes a preferred workspace
 * allocation. `separator` is `"main-preview"`, `"preview-flyout"`, or
 * `"main-flyout"` (the second seam without a visible preview). Bubbles and
 * crosses the shadow boundary.
 *
 * ```html
 * <esp-page class="docs">
 *   <esp-header slot="header">
 *     <a href="#" slot="brand" class="nav-logo">
 *       <svg>
 *         <use href="/assets/icons.svg#taproot-logo" />
 *       </svg>
 *     </a>
 *     <esp-menu slot="menu" mode="horizontal">
 *       <esp-menu-item label="Mammals" url="#"></esp-menu-item>
 *       <esp-menu-item label="Reptiles" url="#"></esp-menu-item>
 *       <esp-menu-item label="Amphibians" url="#"></esp-menu-item>
 *     </esp-menu>
 *     <esp-header-button slot="buttons" icon="cog" aria-label="Settings"></esp-header-button>
 *   </esp-header>
 *   <esp-footer slot="footer" brand-text="Espalier"></esp-footer>
 *   <section style="overflow: hidden;">
 *     <h2>Long content</h2>
 *     <p populate-from="longParagraph"></p>
 *   </section>
 * </esp-page>
 * ```
 *
 * @csspart wrapper - The page wrapper. It defaults to a grid with a
 * height of 100vh. For the demo page, the height is set to 400px by
 * styling the CSS part:
 *
 * ```html
 * <style>
 * esp-page.docs {
 *   &::part(wrapper) {
 *     min-height: 400px;
 *     height: 400px;
 *   }
 *   > div {
 *     height: 100%;
 *     color: yellow;
 *     padding: var(--esp-size-padding);
 *   }
 * }
 * .demo-wrapper {
 *   border: 2px solid var(--esp-color-border);
 * }
 * </style>
 * <esp-page class="docs">
 *   <div slot="header" style="background-color: red;">header</div>
 *   <div slot="sidebar" style="background-color: green;">sidebar</div>
 *   <div slot="right" style="background-color: purple;">right</div>
 *   <esp-footer slot="footer" brand-text="Espalier"></esp-footer>
 *   <div style="background-color: black; overflow: hidden;">
 *     content
 *   </div>
 * </esp-page>
 * ```
 *
 * @cssprop --esp-page-background - The background color of the page. Fills
 * both the surface and the canvas gutters; the canvas tokens paint over it
 * in the gutters only. Defaults to `var(--esp-color-background)`.
 * @cssprop --esp-page-main-min-width - Minimum width of the main content well
 * while preview or in-grid help competes for space. Defaults to `30rem`.
 * @cssprop --esp-page-main-max-width - Maximum width of the main content well.
 * Defaults from `kind`: `1536px` (wide), `768px` (narrow), or unbounded (full).
 * An explicit value overrides every kind default, including `full`. Surplus
 * width beyond it becomes canvas gutters.
 * @cssprop --esp-page-max-width - Legacy fallback for
 * `--esp-page-main-max-width`.
 * @cssprop --esp-page-background-image - The background image to
 * display behind page content. Defaults to `none`.
 * @cssprop --esp-page-background-image-opacity - The opacity of the
 * background image layer. Defaults to `1`.
 * @cssprop --esp-page-canvas-background - The background color of the
 * canvas gutters (the outer regions revealed when the viewport exceeds
 * the cap). Defaults to `transparent`, so gutters match the page until
 * styled and narrow viewports are unaffected.
 * @cssprop --esp-page-canvas-background-image - A background image for the
 * canvas gutters, mirroring the page background-image knob. Defaults to
 * `none`.
 * @cssprop --esp-page-canvas-background-image-opacity - The opacity of the
 * canvas gutter image layer. Defaults to `1`.
 * @cssprop --esp-page-surface-shadow - The box shadow drawn on the left
 * and right edges of the content surface. On by default; casts into the
 * gutters and is clipped away when the surface fills the viewport, so it
 * only shows above the cap. Set to `none` to remove it.
 * @cssprop --esp-page-surface-border - An optional border on the inline
 * edges of the surface, for themes preferring a hairline over a shadow.
 * Defaults to `none` (e.g. `1px solid var(--esp-color-border)`). Combine
 * with `--esp-page-surface-shadow: none` to switch the content frame
 * from a drop shadow to a hairline, or turn both off for no frame.
 * @cssprop --esp-page-main-background - The background of the main
 * content well. Defaults to `transparent` (the well shows the page
 * background). Set it to give the content well its own card color, or
 * pair the transparent default with `--esp-page-surface-shadow: none`
 * for content that floats directly on the page with no frame.
 * @cssprop --esp-page-preview-background - Background of the persistent
 * preview surface. Defaults to the main background, then the page background.
 * @cssprop --esp-page-preview-border - Leading tear-off edge between main and
 * preview. Defaults to `1px dotted var(--esp-color-border)`.
 * @cssprop --esp-page-preview-shadow - Shadow cast from the preview's trailing
 * edge. Defaults to the page surface edge shadow. Set to `none` for a flat
 * additive surface.
 * @cssprop --esp-page-preview-min-width - Minimum preview width. Defaults to
 * `22.5rem` (360px, a reasonable mobile-device surface).
 * @cssprop --esp-page-preview-default-width - Initial automatic preview
 * target, clamped between the preview minimum and maximum. When unset, the
 * established preview-first flexible allocation remains in effect. A retained
 * pointer or keyboard resize preference supersedes this target.
 * @cssprop --esp-page-preview-max-width - Maximum preview width. Defaults to
 * `48rem`. Preview receives flexible trailing space before help grows.
 * @cssprop --esp-page-flyout-min-width - Minimum in-grid help width. Defaults
 * to `20rem`.
 * @cssprop --esp-page-flyout-default-width - Initial automatic in-grid help
 * target, clamped between the help minimum and maximum. When unset, the
 * established flexible allocation remains in effect. A retained pointer or
 * keyboard resize preference supersedes this target.
 * @cssprop --esp-page-flyout-max-width - Maximum help width and overlay drawer
 * cap before the `85vw` viewport cap. Defaults to `30rem`.
 * @cssprop --esp-page-resize-step - Arrow-key resize step. Defaults to `1rem`.
 * @cssprop --esp-page-resize-large-step - Shift+Arrow resize step. Defaults to
 * `4rem`.
 * @cssprop --esp-page-resize-handle-hit-size - Transparent inline hit target
 * centered on each dotted seam. Defaults to `2.75rem`.
 * @cssprop --esp-page-resize-focus-outline - Keyboard-focus line drawn along
 * the focused seam, spanning the visible dotted edge up to one viewport
 * height. Defaults to `2px dashed var(--esp-color-link)`.
 * @cssprop --esp-page-resize-focus-shadow - Glow cast by the focused seam
 * line, in the line's color. Defaults to `0 0 0.75rem var(--esp-color-link)`.
 * @cssprop --esp-page-preview-width - Legacy fixed-width alias that pins both
 * preview bounds.
 * @cssprop --esp-page-flyout-width - Legacy fixed-width alias that pins both
 * help bounds.
 * @cssprop --esp-page-preview-min-main-width - Legacy fallback for
 * `--esp-page-main-min-width`.
 * @cssprop --esp-page-fixed-header-offset - Offset reserved for fixed
 * headers. Defaults to `var(--esp-header-height)`.
 * @cssprop --esp-page-sticky-header-top - Top inset for sticky headers.
 * Defaults to `0`.
 * @cssprop --esp-page-header-z-index - Z-index for fixed/sticky header
 * regions. Defaults to `20`.
 *
 * @csspart canvas - The two canvas gutter regions flanking the surface.
 * @csspart surface - The surface backdrop carrying the edge shadow/border.
 * @csspart preview - The persistent preview complementary landmark.
 * @csspart preview-content - The sticky wrapper around preview content.
 * @csspart main-preview-resize-handle - Separator between main and preview.
 * Announces main's width.
 * @csspart preview-flyout-resize-handle - Separator between preview and
 * in-grid flyout/help while preview is visible. Announces help's width.
 * @csspart main-flyout-resize-handle - The same physical seam while preview
 * is hidden or closed: it then sits between main and in-grid help, sizes
 * help directly against main, and reports `separator: "main-flyout"`.
 *
 * ```html
 * <style>
 * esp-page.with-background {
 *   --esp-page-background-image: url(/assets/espalier-paper-texture.png);
 *   --esp-page-background-image-opacity: .5;
 * }
 * </style>
 * <esp-page class="docs with-background">
 *   <div slot="header" style="background-color: red;">header</div>
 *   <div slot="sidebar" style="background-color: green;">sidebar</div>
 *   <div slot="right" style="background-color: purple;">right</div>
 *   <esp-footer slot="footer" brand-text="Espalier"></esp-footer>
 *   <div style="overflow: hidden;">
 *     <h2>With background image</h2>
 *   </div>
 * </esp-page>
 * ```
 *
 * Use `align` to place the surface within the page once it hits its cap,
 * and the canvas tokens to style the gutters. A low `--esp-page-max-width`
 * is set here only so the gutters are visible inside the narrow demo
 * frame; the surface edge shadow is on by default.
 *
 * ```html
 * <style>
 * esp-page.align-demo {
 *   --esp-page-max-width: 520px;
 *   --esp-page-canvas-background: var(--esp-color-layer-1);
 * }
 * </style>
 * <esp-page class="docs align-demo" align="center">
 *   <div slot="header" style="background-color: red;">header</div>
 *   <div slot="sidebar" style="background-color: green;">sidebar</div>
 *   <div slot="right" style="background-color: purple;">right</div>
 *   <esp-footer slot="footer" brand-text="Espalier"></esp-footer>
 *   <div style="background-color: black; overflow: hidden;">
 *     content
 *   </div>
 * </esp-page>
 * ```
 *
 * @docPageTitle Page
 * @docUrl /components/page
 * @menuGroup Structure
 * @menuOrder 2
 * @menuLabel Page
 * @menuIcon layout
 *
 *
 * @example Resizable preview
 * ```html
 * <style>
 * .page-preview-resize-demo {
 *   --esp-page-main-min-width: 100px;
 *   --esp-page-main-max-width: 100vw;
 *   --esp-page-preview-min-width: 100px;
 *   --esp-page-preview-max-width: 100vw;
 * }
 *
 * .page-preview-resize-demo > main,
 * .page-preview-resize-demo > [slot="preview"] {
 *   box-sizing: border-box;
 *   padding: var(--esp-size-padding-page);
 * }
 * </style>
 *
 * <esp-page
 *   class="page-preview-resize-demo"
 *   preview-open
 *   preview-label="Article preview"
 *   workspace-resizable
 * >
 *   <main>
 *     <h2>Article editor</h2>
 *     <p>
 *       Preview starts at its minimum width. Drag the dotted seam left to
 *       enlarge it, then resize in either direction. You can also focus the
 *       seam and use Left/Right Arrow.
 *     </p>
 *   </main>
 *   <article slot="preview">
 *     <h2>Article preview</h2>
 *     <p>The selected width stays with this mounted page and adapts when its container changes.</p>
 *   </article>
 * </esp-page>
 * ```
 *
 * @example Main, preview, and contextual help
 * ```html
 * <style>
 * .page-workspace-demo {
 *   --esp-page-main-min-width: 100px;
 *   --esp-page-main-max-width: 100vw;
 *   --esp-page-preview-min-width: 100px;
 *   --esp-page-preview-max-width: 100vw;
 *   --esp-page-flyout-min-width: 100px;
 *   --esp-page-flyout-max-width: 100vw;
 * }
 *
 * .page-workspace-demo > main,
 * .page-workspace-demo > [slot="preview"] {
 *   box-sizing: border-box;
 *   padding: var(--esp-size-padding-page);
 * }
 *
 * .page-workspace-demo > main {
 *   min-block-size: 120vh;
 * }
 * </style>
 *
 * <esp-page
 *   id="page-workspace-demo"
 *   class="page-workspace-demo"
 *   preview-open
 *   preview-label="Rendered page preview"
 *   workspace-resizable
 * >
 *   <main>
 *     <h2>Page details</h2>
 *     <esp-form-item label="Site title">
 *       <esp-input id="page-workspace-title" name="title" value="Field notes"></esp-input>
 *     </esp-form-item>
 *     <p>
 *       Help is anchored to the title field in this main editor. Its caret and
 *       dotted connector cross the persistent preview without blocking it.
 *       Both dotted pane seams are resize handles while their panes are in-grid.
 *     </p>
 *     <esp-button id="page-workspace-preview-toggle" label="Toggle preview"></esp-button>
 *     <esp-button id="page-workspace-help-toggle" label="Toggle title help"></esp-button>
 *   </main>
 *
 *   <article slot="preview">
 *     <h2>Field notes</h2>
 *     <p>This preview is a full-viewport secondary surface with its own scroller.</p>
 *   </article>
 *
 *   <esp-flyout
 *     id="page-workspace-help"
 *     slot="flyout"
 *     heading="Site title help"
 *     standalone
 *   >
 *     <p>Use a short, recognizable title. It appears in navigation and browser tabs.</p>
 *   </esp-flyout>
 * </esp-page>
 *
 * <script>
 * const page = findById("page-workspace-demo");
 * const title = findById("page-workspace-title");
 * const help = findById("page-workspace-help");
 * help.anchor = title;
 *
 * const syncMainWidth = () => {
 *   page.kind = page.previewOpen || help.open ? "wide" : "full";
 * };
 *
 * findById("page-workspace-preview-toggle").addEventListener("clicked", () => {
 *   page.togglePreview();
 *   syncMainWidth();
 * });
 * findById("page-workspace-help-toggle").addEventListener("clicked", () => {
 *   help.anchor = title;
 *   help.toggle();
 *   syncMainWidth();
 * });
 * help.addEventListener("flyout-opened", syncMainWidth);
 * help.addEventListener("flyout-closed", syncMainWidth);
 * syncMainWidth();
 * </script>
 * ```
 */
export declare class EspalierPage extends EspalierElementBase {
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * The layout mode of the page.
     *
     * - `wide` (default) — constrains the main content well to 1536px.
     *   Optimized for high-density dashboards and complex data grids.
     * - `narrow` — constrains the main content well to 768px and applies
     *   a `max-inline-size: 66ch` reading measure. Optimized for
     *   long-form reading content.
     * - `full` — no max-width constraint unless
     *   `--esp-page-main-max-width` is explicitly configured. Optimized for
     *   immersive canvases like maps or design tools and finite authoring
     *   workspaces that opt back into a cap.
     */
    kind: "wide" | "narrow" | "full";
    /**
     * Horizontal alignment of the content **surface** (left aside + main
     * well + right aside) within the page once the viewport is wider than
     * the content cap. The surplus width becomes styleable **canvas**
     * gutters on the outer edges, weighted by this attribute.
     *
     * - `start` (default) — the surface hugs the leading edge; all spare
     *   width collects in the trailing gutter. This reproduces today's
     *   layout.
     * - `center` — spare width is split evenly into both gutters, centering
     *   the surface.
     * - `end` — the surface hugs the trailing edge; spare width collects in
     *   the leading gutter.
     *
     * Has no effect when an unconfigured `kind="full"` leaves main unbounded,
     * or on viewports narrower than the complete visible workspace cap.
     */
    align: "start" | "center" | "end";
    /**
     * When set, the header and footer sit **on** the content surface —
     * the same width as the left aside + main well + right aside — instead
     * of spanning the full viewport. Combined with a styled canvas this
     * frames the whole page as one contained band floating on the canvas,
     * with a single continuous surface edge shadow running from the header
     * through the content to the footer.
     *
     * Below the cap there are no gutters, so a contained page renders
     * identically to the default full-bleed chrome. Designed for
     * `header-position="normal"` or `"sticky"`; a fixed header cannot be
     * banded to the surface.
     */
    contained: boolean;
    /**
     * Header positioning behavior for the `header` slot.
     *
     * - `normal` lets the header scroll with content.
     * - `sticky` keeps the header stuck to the top after it reaches it.
     * - `fixed` pins the header to the viewport and offsets page content.
     *
     * `fixed-menus` remains as a compatibility alias for `fixed`.
     */
    headerPosition: HeaderPosition;
    /**
     * Compatibility alias for the original fixed header/sidebar behavior.
     * Prefer `header-position="fixed"` for new code.
     */
    fixedMenus: boolean;
    /**
     * Whether the persistent preview is logically open. The page may keep the
     * preview hidden while space is unavailable; `preview-visible` reflects its
     * actual presentation and the preview restores automatically when room returns.
     */
    previewOpen: boolean;
    /** Accessible name for the preview's complementary landmark. */
    previewLabel: string;
    /**
     * Allow a directly slotted, safely linked vertical menu/header pair to
     * collapse to its burger/drawer presentation when preview needs more room.
     */
    previewCollapseSidebar: boolean;
    /**
     * Expose accessible pointer and keyboard separators for the visible
     * Main → Preview → Flyout/Help workspace seams. Preferred sizes remain on
     * this mounted instance and are continuously re-clamped by page allocation.
     */
    workspaceResizable: boolean;
    /**
     * Whether preview content is currently rendered. Managed by the page's
     * space negotiation; consumers should treat this reflected property as read-only.
     */
    previewVisible: boolean;
    /**
     * Whether preview is currently reserving width and allowing the main well
     * to shrink toward `--esp-page-main-min-width`. Managed by the page.
     */
    previewReclaiming: boolean;
    /** Request the persistent preview without moving focus. */
    showPreview(): void;
    /** Close the persistent preview without moving focus. */
    closePreview(): void;
    /** Toggle the persistent preview without moving focus. */
    togglePreview(): void;
    /**
     * Inject an element into a div with the highest z-index so dialogs are
     * rendered on top of everything else.
     *
     * @param dialog The EspalierDialog to show.
     */
    AddDialog(dialog: EspalierDialog | DocumentFragment | HTMLElement): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-page": EspalierPage;
    }
}
export {};
