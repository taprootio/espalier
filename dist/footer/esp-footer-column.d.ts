import { type FooterPlacement, type FooterTextAlign } from "../shared/footer-alignment.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A layout-only column for creator-controlled link-group stacking inside
 * [`<esp-footer>`](/components/footer/).
 *
 * Use bare `esp-footer-link-group` children when each group should occupy
 * one track in the footer row. Wrap ordered groups in
 * `esp-footer-column` when they must remain together as one region. Set `span="2"` for two tracks:
 *
 * ```html
 * <esp-footer brand-span="2">
 *   <esp-footer-column span="2">
 *     <esp-footer-link-group heading="Product">
 *       <a href="/features">Features</a>
 *       <a href="/pricing">Pricing</a>
 *     </esp-footer-link-group>
 *     <esp-footer-link-group heading="Company">
 *       <a href="/about">About</a>
 *       <a href="/careers">Careers</a>
 *     </esp-footer-link-group>
 *   </esp-footer-column>
 * </esp-footer>
 * ```
 *
 * The component adds no heading, landmark, or chrome. It preserves the
 * slotted order of its child groups and uses `--esp-footer-row-gap`, defaulting
 * to `var(--esp-size-big)`, for its vertical rhythm.
 *
 * Set inline-align, block-align or text-align for a local override, adding
 * -wrapped or -stacked for narrower profiles. Unset values inherit footer
 * context; a nested group can override its column without changing its tracks.
 * See [footer reference](/components/footer/) for sparse inheritance,
 * logical placement and caller-owned content hooks.
 *
 * @customElement esp-footer-column
 * @slot - Ordered `esp-footer-link-group` children belonging to this column.
 * @cssprop --esp-footer-row-gap - Vertical gap between footer rows and
 * link groups stacked in `esp-footer-column`. Defaults to `var(--esp-size-big)`.
 * @cssprop --esp-footer-current-inline-align - Current logical inline placement for caller-owned content. Derived output, unset in the unauthored Default state; use a layout-specific fallback.
 * @cssprop --esp-footer-current-block-align - Current logical block placement for caller-owned content. Derived output, unset in Default and always unset in the bottom region; use a layout-specific fallback.
 * @cssprop --esp-footer-current-text-align - Current non-prose text alignment for caller-owned headings, labels and controls. Derived output; unset in Default so inherited text remains available.
 * @cssprop --esp-footer-current-prose-align - Current paragraph alignment, including justify with an ordinary last line. Derived output; unset in Default so inherited text remains available.
 * @docPageTitle Footer Column
 * @docUrl /components/footer/column
 * @menuGroup Structure
 * @menuLabel Footer Column
 * @menuIcon columns
 */
export declare class EspalierFooterColumn extends EspalierElementBase {
    /** Logical inline placement in the wide layout; unset inherits. */
    get inlineAlign(): FooterPlacement | undefined;
    set inlineAlign(value: FooterPlacement | undefined);
    /** Logical inline placement in the wrapped layout; unset inherits. */
    get inlineAlignWrapped(): FooterPlacement | undefined;
    set inlineAlignWrapped(value: FooterPlacement | undefined);
    /** Logical inline placement in the stacked layout; unset inherits. */
    get inlineAlignStacked(): FooterPlacement | undefined;
    set inlineAlignStacked(value: FooterPlacement | undefined);
    /** Logical block placement in the wide layout; unset inherits. */
    get blockAlign(): FooterPlacement | undefined;
    set blockAlign(value: FooterPlacement | undefined);
    /** Logical block placement in the wrapped layout; unset inherits. */
    get blockAlignWrapped(): FooterPlacement | undefined;
    set blockAlignWrapped(value: FooterPlacement | undefined);
    /** Logical block placement in the stacked layout; unset inherits. */
    get blockAlignStacked(): FooterPlacement | undefined;
    set blockAlignStacked(value: FooterPlacement | undefined);
    /** Text alignment in the wide layout; unset inherits. */
    get textAlign(): FooterTextAlign | undefined;
    set textAlign(value: FooterTextAlign | undefined);
    /** Text alignment in the wrapped layout; unset inherits. */
    get textAlignWrapped(): FooterTextAlign | undefined;
    set textAlignWrapped(value: FooterTextAlign | undefined);
    /** Text alignment in the stacked layout; unset inherits. */
    get textAlignStacked(): FooterTextAlign | undefined;
    set textAlignStacked(value: FooterTextAlign | undefined);
    /** Tracks occupied in the footer row (1–2); invalid values read as 1. Ignored when stacked.
     * @default 1
     */
    get span(): number;
    set span(value: number);
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-footer-column": EspalierFooterColumn;
    }
}
