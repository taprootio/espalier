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
 *   <div slot="footer" style="background-color: blue;">footer</div>
 *   <div style="background-color: black; overflow: hidden;">
 *     content
 *   </div>
 * </esp-page>
 * ```
 *
 * @slot sidebar - Contextual navigation placed in the left aside.
 * @slot right - Content to place in the right aside.
 * @slot footer - Content to place in the footer.
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
 *   <div slot="footer" style="background-color: blue;">footer</div>
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
 *   <div slot="footer" style="background-color: blue;">footer</div>
 *   <div style="background-color: black; overflow: hidden;">
 *     content
 *   </div>
 * </esp-page>
 * ```
 *
 * @cssprop --esp-page-background - The background color of the page.
 * Defaults to `var(--esp-color-background)`.
 * @cssprop --esp-page-max-width - The maximum width of the main content
 * well. Set automatically by the `kind` attribute: `1536px` (wide),
 * `768px` (narrow), or `none` (full).
 * @cssprop --esp-page-background-image - The background image to
 * display behind page content. Defaults to `none`.
 * @cssprop --esp-page-background-image-opacity - The opacity of the
 * background image layer. Defaults to `1`.
 * @cssprop --esp-page-fixed-header-offset - Offset reserved for fixed
 * headers. Defaults to `var(--esp-header-height)`.
 * @cssprop --esp-page-sticky-header-top - Top inset for sticky headers.
 * Defaults to `0`.
 * @cssprop --esp-page-header-z-index - Z-index for fixed/sticky header
 * regions. Defaults to `20`.
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
 *   <div slot="footer" style="background-color: blue;">footer</div>
 *   <div style="overflow: hidden;">
 *     <h2>With background image</h2>
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
     * Inject an element into a div with the highest z-index so dialogs are
     * rendered on top of everything else.
     *
     * @param dialog The EspalierDialog to show.
     */
    AddDialog(dialog: EspalierDialog | DocumentFragment | HTMLElement): void;
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
