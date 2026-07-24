import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierDialog } from "../dialog/esp-dialog.js";
import "../toaster/esp-toaster.js";
type HeaderPosition = "normal" | "sticky" | "fixed";
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
 * A persistent preview uses spare trailing canvas first. Set a main-well
 * floor to let it reclaim surface width, and opt into collapsing a directly
 * paired header/sidebar navigation to its accessible burger/drawer mode:
 *
 * ```html
 * <esp-page
 *   preview-open
 *   preview-collapse-sidebar
 *   style="--esp-page-preview-width: 20rem; --esp-page-preview-min-main-width: 900px;"
 * >
 *   <esp-header slot="header" drawer-target="site-nav"></esp-header>
 *   <esp-menu id="site-nav" slot="sidebar" mode="vertical"></esp-menu>
 *   <article>Primary content</article>
 *   <aside slot="preview">Preview content</aside>
 * </esp-page>
 * ```
 *
 * @slot sidebar - Contextual navigation placed in the left aside.
 * @slot right - Content to place in the right aside.
 * @slot preview - Persistent preview content that uses spare right canvas
 * width first, then optionally reclaims navigation and main-well width down
 * to `--esp-page-preview-min-main-width`. Unlike flyout content, preview
 * content is never replaced by the flyout request bus.
 * @slot flyout - A transient `esp-flyout` panel that lives on the
 * canvas, outside the content surface. Closed it costs no width; open
 * it claims the right canvas gutter first — the surface keeps its
 * alignment weighting and shifts only as far as the flyout's width
 * requires — then docks as a width-competing right sidebar when no
 * gutter exists, and becomes an overlay drawer on small viewports.
 * The persistent `right` aside and the transient flyout are
 * complementary, not alternatives. A flyout opened with an `anchor`
 * aligns to that trigger and stays in the same document scroll flow.
 * @slot footer - Content to place in the footer. Slot `esp-footer` directly
 * to receive the page's surface-alignment custom-property contract. A wrapper
 * can preserve landmark semantics but does not receive that direct contract.
 * @slot - The main page content. The main content region applies
 * `contain: inline-size` so child components cannot push the
 * content well wider than its grid column. In `narrow` mode,
 * slotted children are constrained to `max-inline-size: 66ch`
 * for optimal reading measure.
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
 * @cssprop --esp-page-max-width - The maximum width of the main content
 * well. Set automatically by the `kind` attribute: `1536px` (wide),
 * `768px` (narrow), or `none` (full). This cap now sizes the main grid
 * track; surplus width beyond it becomes the canvas gutters.
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
 * @cssprop --esp-page-flyout-width - The width of the open flyout
 * track (and of the `esp-flyout` overlay drawer). Defaults to `20rem`.
 * @cssprop --esp-page-preview-width - Width of the persistent preview
 * panel. Defaults to `20rem`.
 * @cssprop --esp-page-preview-min-main-width - Optional minimum width of
 * the main content well while preview is reclaiming canvas/surface space.
 * Unset by default, so preview uses spare canvas only. Set a length such
 * as `900px` to opt into reclaim behavior.
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
     * - `full` — no max-width constraint; the content well spans the
     *   full available space. Optimized for immersive canvases like
     *   maps or design tools.
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
     * Has no effect when `kind="full"` (no cap means no gutters) or on
     * viewports narrower than the cap (the surface already fills the width).
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
     * Whether preview content is currently rendered. Managed by the page's
     * space negotiation; consumers should treat this reflected property as read-only.
     */
    previewVisible: boolean;
    /**
     * Whether preview is currently reserving width and allowing the main well
     * to shrink toward `--esp-page-preview-min-main-width`. Managed by the page.
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
