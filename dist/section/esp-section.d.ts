import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A full-bleed page band with a centered content well — the natural host
 * for a theme zone.
 *
 * `esp-section` paints the local `--esp-color-background` edge to edge
 * and centers its content in a capped well. It carries no card identity:
 * no raised surface, no border radius, no shadow. Give it a `context`
 * (see the theming guide, `/guides/color/theming` on the docs site) and
 * the band renders the zone's complete token table with nothing to
 * neutralize:
 *
 * ```html
 * <esp-section context="inverted">
 *   <h2>The reversed band</h2>
 *   <p>Everything in here renders on the zone's tokens, and the band
 *   spans its container edge to edge.</p>
 * </esp-section>
 * ```
 *
 * Inside `esp-page kind="site"` sections stack full-width and their
 * wells share the page's `--esp-page-well-max-width`, so section
 * content, the header, and the footer all align on one column. Outside
 * a page the well defaults to the same width and the band fills
 * whatever container it is given.
 *
 * The vertical rhythm defaults to the theme's fluid `--esp-size-section`
 * step. For edge-to-edge content (a full-bleed hero image) clear both
 * the well cap and the inline breathing room —
 * `--esp-section-max-width: none; --esp-section-padding-inline: 0;` —
 * and drop `--esp-section-padding-block` too when the media should
 * meet the band's edges; the band's zone behavior is unaffected.
 *
 * A section may also tint one raster alpha mask behind its content.
 * The component owns clipping, no-repeat mask behavior, stacking, and
 * interaction isolation; consumers supply only the image, semantic tint,
 * position, size, and opacity:
 *
 * ```html
 * <esp-section
 *   style="
 *     --esp-section-decoration-image: url('/assets/brand-mark.png');
 *     --esp-section-decoration-position: calc(100% + 2rem) -2rem;
 *     --esp-section-decoration-size: min(34rem, 62%);
 *     --esp-section-decoration-opacity: 0.09;
 *   "
 * >
 *   <h1>Rooted in warmth</h1>
 * </esp-section>
 * ```
 *
 * CSS image values are trusted stylesheet input. Products that accept image
 * references from documents or users must enforce their own asset ownership
 * and URL policy before mapping a value to this hook.
 *
 * @customElement esp-section
 * @slot - The section's content, centered in the well.
 * @csspart section - The full-bleed band.
 * @csspart well - The centered content well.
 * @cssprop --esp-section-background - The band's background. Defaults to the local `--esp-color-background`, which inside a `context` zone is the zone's canvas.
 * @cssprop --esp-section-max-width - The content well's cap. Defaults to `var(--esp-page-well-max-width, 72rem)`; `none` lets content span the band.
 * @cssprop --esp-section-padding-block - Vertical rhythm above and below the well. Defaults to `var(--esp-size-section)`.
 * @cssprop --esp-section-padding-inline - Horizontal breathing room inside the band at narrow viewports. Defaults to `var(--esp-size-medium)`.
 * @cssprop --esp-section-decoration-image - Raster alpha mask painted behind the well. Defaults to `none`.
 * @cssprop --esp-section-decoration-color - Semantic tint applied through the mask. Defaults to the local `--esp-color-headings`.
 * @cssprop --esp-section-decoration-position - Mask position, including responsive or bleeding values. Defaults to `center`.
 * @cssprop --esp-section-decoration-size - Mask size. Defaults to `contain`.
 * @cssprop --esp-section-decoration-opacity - Decoration opacity from `0` through `1`. Defaults to `1`.
 * @docPageTitle Section
 * @docUrl /components/section
 * @menuGroup Structure
 * @menuIcon layout
 */
export declare class EspalierSection extends EspalierElementBase {
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-section": EspalierSection;
    }
}
