import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import type { EspalierGap } from "../stack/esp-stack.js";
/** The first and second region's shares in a two-region layout. */
export type EspalierColumnsRatio = "equal" | "40-60" | "60-40";
/**
 * Places two or three independent regions beside each other when each can
 * remain at least 18rem wide. All regions stack together below that threshold.
 * Requires an `esp-root` ancestor.
 *
 * ```html
 * <esp-columns ratio="40-60" gap="medium">
 *   <div><h2>Visit us</h2><p>Find a class near you.</p></div>
 *   <div><h2>Book a class</h2><p>Your booking form goes here.</p></div>
 * </esp-columns>
 * ```
 *
 * Each rendered direct unnamed-slot element is one region. Elements with
 * `hidden` or computed `display: none`, and script/style/template elements, do
 * not count as regions. Visibility changes retain the original slot nodes.
 * Three rendered regions support only the equal ratio. Other counts, unknown
 * ratios, or non-whitespace direct text
 * use a single stack, retaining all slot content. Regions keep their DOM and
 * reading order; this element adds no landmark or form behavior. Sections and
 * contexts continue to own backgrounds and content wells.
 *
 * @customElement esp-columns
 * @slot - Two or three independent regions in reading order.
 * @csspart columns - The grid containing the original regions.
 * @cssprop --esp-columns-gap - Overrides the selected gap with a non-negative CSS length, including rem, em, calc() and clamp(). Percentage gaps are not supported. Defaults to the `gap` attribute's step, `normal` when unset.
 * @docPageTitle Columns
 * @docUrl /components/columns
 * @menuGroup Structure
 * @menuIcon layout
 */
export declare class EspalierColumns extends EspalierElementBase {
    /** Space-scale gap name. Unknown names use normal. @default "normal" */
    gap: EspalierGap;
    /** Equal regions, or two regions at 40/60 or 60/40. @default "equal" */
    ratio: EspalierColumnsRatio;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-columns": EspalierColumns;
    }
}
