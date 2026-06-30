import { LitElement } from "lit";
/**
 * Represents a single breadcrumb to use in
 * [esp-breadcrumbs](/components/breadcrumbs/) to show breadcrumb
 * navigation.
 *
 * @cssprop --esp-breadcrumb-color - The text color of the breadcrumb link.
 * @cssprop --esp-breadcrumb-hover-color - The text color on hover.
 * @docPageTitle Breadcrumb
 * @docUrl /components/breadcrumbs/breadcrumb
 * @menuGroup Navigation
 */
export declare class EspalierBreadcrumb extends LitElement {
    /** The label to display in the breadcrumb
     * @type {string}
     **/
    label: string;
    /** The url the breadcrumb points to
     * @type {string}
     **/
    url: string;
    /**
     * Used to override the SVG separator displayed after the
     * breadcrumb.
     * @type {string}
     */
    separator: string;
    /**
     * Used internally to render the item using a label
     * instead of a link.
     * @type {boolean}
     */
    isLastElement: boolean;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-breadcrumb": EspalierBreadcrumb;
    }
}
