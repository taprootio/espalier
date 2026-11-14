import { type FooterPlacement, type FooterTextAlign } from "../shared/footer-alignment.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A labelled group of related links inside [`<esp-footer>`](/components/footer/).
 * Supply ordinary anchors in the default slot; the component provides the
 * compact vertical rhythm and an accessible navigation landmark.
 *
 * ```html
 * <esp-footer-link-group heading="Explore">
 *   <a href="/components">Components</a>
 *   <a href="/guides">Guides</a>
 *   <a href="/api">API</a>
 * </esp-footer-link-group>
 * ```
 *
 * Set inline-align, block-align or text-align for a local override, adding
 * -wrapped or -stacked for narrower profiles. Unset values inherit footer
 * context; a nested group can override its column without changing its tracks.
 * See [footer reference](/components/footer/) for sparse inheritance,
 * logical placement and caller-owned content hooks.
 *
 * @customElement esp-footer-link-group
 * @slot - Links belonging to the group. Native anchors are preferred because
 * footer links do not need application-menu disclosure or drawer behavior.
 * @csspart nav - The group's navigation landmark.
 * @csspart heading - The visible heading used to label the navigation landmark.
 * @csspart links - The link-list container.
 * @cssprop --esp-footer-current-inline-align - Current logical inline placement for caller-owned content. Derived output, unset in the unauthored Default state; use a layout-specific fallback.
 * @cssprop --esp-footer-current-block-align - Current logical block placement for caller-owned content. Derived output, unset in Default and always unset in the bottom region; use a layout-specific fallback.
 * @cssprop --esp-footer-current-text-align - Current non-prose text alignment for caller-owned headings, labels and controls. Derived output; unset in Default so inherited text remains available.
 * @cssprop --esp-footer-current-prose-align - Current paragraph alignment, including justify with an ordinary last line. Derived output; unset in Default so inherited text remains available.
 * @docPageTitle Footer Link Group
 * @docUrl /components/footer/link-group
 * @menuGroup Navigation
 * @menuIcon list-details
 */
export declare class EspalierFooterLinkGroup extends EspalierElementBase {
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
    /**
     * Visible heading for the link group. It also labels the navigation
     * landmark. When omitted, the landmark receives the fallback label
     * “Footer links” without rendering an empty heading.
     */
    heading: string;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-footer-link-group": EspalierFooterLinkGroup;
    }
}
