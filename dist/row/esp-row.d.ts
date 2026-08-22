import { EspalierElementBase } from "../shared/esp-element-base.js";
import type { EspalierAlign, EspalierGap } from "../stack/esp-stack.js";
declare const ROW_JUSTIFIES: readonly ["start", "center", "end", "between"];
/** A main-axis distribution accepted by `esp-row`. */
export type EspalierJustify = (typeof ROW_JUSTIFIES)[number];
export { ROW_JUSTIFIES };
/**
 * A horizontal flow: children sit in a wrapping row with a themed gap —
 * "row, wrap, gap Y" without writing flexbox (ADR-010's micro half).
 *
 * ```html
 * <esp-row gap="small" justify="between">
 *   <span>Yoga · 60 min</span>
 *   <esp-button label="Book"></esp-button>
 * </esp-row>
 * ```
 *
 * Rows wrap by default, so a button row or badge cluster degrades to
 * multiple lines at narrow widths instead of overflowing; set `nowrap`
 * for toolbars that must stay on one line. Cross-axis alignment
 * defaults to `center` — the icon-beside-label, text-beside-button
 * case a row exists for.
 *
 * @customElement esp-row
 * @slot - The row children.
 * @csspart row - The flex row.
 * @cssprop --esp-row-gap - Overrides the gap between children. Defaults to the `gap` attribute's step, `normal` when unset.
 * @docPageTitle Row
 * @docUrl /components/row
 * @menuGroup Structure
 * @menuIcon layout
 */
export declare class EspalierRow extends EspalierElementBase {
    /**
     * Gap between children as a space-scale step name
     * (`none`, `tiny`, `small`, `normal`, `medium`, `big`, `large`,
     * `huge`).
     * @default "normal"
     */
    gap: EspalierGap;
    /**
     * Cross-axis alignment of children: `start`, `center`, `end`, or
     * `stretch`.
     * @default "center"
     */
    align: EspalierAlign;
    /**
     * Main-axis distribution: `start`, `center`, `end`, or `between`.
     * @default "start"
     */
    justify: EspalierJustify;
    /**
     * Keeps every child on one line instead of wrapping.
     * @default false
     */
    nowrap: boolean;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-row": EspalierRow;
    }
}
