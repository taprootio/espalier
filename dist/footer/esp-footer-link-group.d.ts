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
 * @customElement esp-footer-link-group
 * @slot - Links belonging to the group. Native anchors are preferred because
 * footer links do not need application-menu disclosure or drawer behavior.
 * @csspart nav - The group's navigation landmark.
 * @csspart heading - The visible heading used to label the navigation landmark.
 * @csspart links - The link-list container.
 * @docPageTitle Footer Link Group
 * @docUrl /components/footer/link-group
 * @menuGroup Navigation
 * @menuIcon list-details
 */
export declare class EspalierFooterLinkGroup extends EspalierElementBase {
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
