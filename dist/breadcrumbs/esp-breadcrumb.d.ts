import { LitElement } from "lit";
/**
 * Represents a single breadcrumb to use in
 * [esp-breadcrumbs](/components/breadcrumbs/) to show breadcrumb
 * navigation.
 *
 * @cssprop --esp-breadcrumb-color - The text color of the breadcrumb link. Defaults to
 * `var(--esp-color-link)`, so a trail reads as navigation in the same ink as the links in
 * the surrounding content.
 * @cssprop --esp-breadcrumb-hover-color - The text color on hover. Defaults to
 * `var(--esp-color-link-hover)`.
 * @cssprop --esp-breadcrumb-hover-background - The background behind a hovered link.
 * Defaults to `var(--esp-color-link-hover-bg)`.
 * @cssprop --esp-breadcrumb-current-color - The text color of the current-page crumb, which
 * is not a link. Defaults to `--esp-breadcrumb-color` when that is set, then to
 * `var(--esp-color-headings)`, keeping the current page distinct from the links beside it.
 * @cssprop --esp-breadcrumb-separator-color - The color of the separator icons. Defaults to
 * `oklch(from var(--esp-color-link) l c calc(h + 90))`, an accent that takes the link ink's
 * scheme-adapted lightness and chroma at a different hue, so the arrows are their own color
 * rather than the heading color. Set it on `esp-breadcrumbs` to recolor a whole trail, or on
 * one `esp-breadcrumb` to recolor a single arrow.
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
     * Marks this crumb as the end of the trail. The parent
     * `esp-breadcrumbs` sets it to pick the down-arrow separator and
     * the current-crumb styling. It does not decide link versus label —
     * a crumb that carries a `url` stays clickable wherever it sits, so
     * a trail can end at its deepest folder.
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
