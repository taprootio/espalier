import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A layout-only column for creator-controlled link-group stacking inside
 * [`<esp-footer>`](/components/footer/).
 *
 * Use bare `esp-footer-link-group` children when groups should auto-flow
 * independently through the footer grid. Wrap ordered groups in
 * `esp-footer-column` when they must remain together as one grid item:
 *
 * ```html
 * <esp-footer columns="3">
 *   <esp-footer-column>
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
 * @customElement esp-footer-column
 * @slot - Ordered `esp-footer-link-group` children belonging to this column.
 * @cssprop --esp-footer-row-gap - Vertical gap between footer grid rows and
 * link groups stacked in `esp-footer-column`. Defaults to `var(--esp-size-big)`.
 * @docPageTitle Footer Column
 * @docUrl /components/footer/column
 * @menuGroup Structure
 * @menuLabel Footer Column
 * @menuIcon columns
 */
export declare class EspalierFooterColumn extends EspalierElementBase {
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-footer-column": EspalierFooterColumn;
    }
}
