import { EspalierElementBase } from "../shared/esp-element-base.js";
declare const STACK_GAPS: readonly ["none", "tiny", "small", "normal", "medium", "big", "large", "huge"];
/** A named gap step accepted by `esp-stack` and `esp-row`. */
export type EspalierGap = (typeof STACK_GAPS)[number];
declare const STACK_ALIGNS: readonly ["start", "center", "end", "stretch"];
/** A cross-axis alignment accepted by `esp-stack` and `esp-row`. */
export type EspalierAlign = (typeof STACK_ALIGNS)[number];
export { STACK_GAPS, STACK_ALIGNS };
/**
 * A vertical flow: children stack in a column with a themed gap —
 * "column, gap X" without writing flexbox (ADR-010's micro half).
 *
 * ```html
 * <esp-stack gap="medium">
 *   <h2>Title</h2>
 *   <p>Copy under it.</p>
 *   <esp-button label="Act"></esp-button>
 * </esp-stack>
 * ```
 *
 * The default cross-axis alignment is `stretch`, matching normal block
 * flow: grids, form fields, and text fill the column — with one
 * deliberate exception: slotted `esp-button` and `esp-button-group`
 * keep their natural width, because a field should fill its column
 * while the submit button under it should not. That is the pairing a
 * plain flex column cannot express with any single `align-items`
 * value. An explicit `align` — `align="stretch"` included, authored as
 * an attribute or assigned to the property — governs every child
 * uniformly; removing the attribute restores the default state, and
 * `align-self` on any child overrides either way.
 *
 * @customElement esp-stack
 * @slot - The stacked children.
 * @csspart stack - The flex column.
 * @cssprop --esp-stack-gap - Overrides the gap between children. Defaults to the `gap` attribute's step, `normal` when unset.
 * @docPageTitle Stack
 * @docUrl /components/stack
 * @menuGroup Structure
 * @menuIcon layout
 */
export declare class EspalierStack extends EspalierElementBase {
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
     * @default "stretch"
     */
    align: EspalierAlign;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-stack": EspalierStack;
    }
}
