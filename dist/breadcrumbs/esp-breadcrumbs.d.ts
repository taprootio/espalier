import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
export * from "./esp-breadcrumb.js";
/**
 * Used to display breadcrumb navigation. By default, the breadcrumbs
 * will be separated by right-arrows, with the final item having a
 * down-arrow after it.
 * [esp-breadcrumb](/components/breadcrumbs/breadcrumb) instances
 * should be placed in the default slot to build out the navigation.
 *
 * ```html
 * <esp-breadcrumbs>
 *   <esp-breadcrumb label="One" url="#"></esp-breadcrumb>
 *   <esp-breadcrumb label="Two" url="#"></esp-breadcrumb>
 *   <esp-breadcrumb label="Three" url="#"></esp-breadcrumb>
 * </esp-breadcrumbs>
 * ```
 *
 * Custom separators can be specified in the `<esp-breadcrumb>`:
 *
 * ```html
 * <esp-breadcrumbs>
 *   <esp-breadcrumb label="One" url="#"
 *     separator="<svg><use href='/assets/icons.svg#rocket' /></svg>">
 *   </esp-breadcrumb>
 *   <esp-breadcrumb label="Two" url="#"
 *     separator="<svg><use href='/assets/icons.svg#rocket' /></svg>">
 *   </esp-breadcrumb>
 *   <esp-breadcrumb label="Three" url="#"
 *     separator="<svg><use href='/assets/icons.svg#flower' /></svg>">
 *   </esp-breadcrumb>
 * </esp-breadcrumbs>
 * ```
 *
 * @customElement esp-breadcrumbs
 * @slot - `<esp-breadcrumb>` items to display.
 * @cssprop --esp-breadcrumb-separator-color - Set the color of the separator. It defaults
 * to a bright complementary color.
 *
 * ```html
 * <style>
 * esp-breadcrumbs#custom-crumb {
 *   --esp-breadcrumb-separator-color: red;
 * }
 * </style>
 * <esp-breadcrumbs id="custom-crumb">
 *   <esp-breadcrumb label="One" url="#"
 *     separator="<svg><use href='/assets/icons.svg#rocket' /></svg>">
 *   </esp-breadcrumb>
 *   <esp-breadcrumb label="Two" url="#"
 *     separator="<svg><use href='/assets/icons.svg#rocket' /></svg>">
 *   </esp-breadcrumb>
 *   <esp-breadcrumb label="Three" url="#"
 *     separator="<svg><use href='/assets/icons.svg#flower' /></svg>">
 *   </esp-breadcrumb>
 * </esp-breadcrumbs>
 * ```
 *
 * @docPageTitle Breadcrumbs
 * @docUrl /components/breadcrumbs
 * @menuGroup Navigation
 * @menuLabel Breadcrumbs
 * @menuIcon directions
 */
export declare class EspalierBreadcrumbs extends EspalierElementBase {
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-breadcrumbs": EspalierBreadcrumbs;
    }
}
