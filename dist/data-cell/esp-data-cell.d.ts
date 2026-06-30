import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A two-line grid/list cell layout with optional leading visual content.
 *
 * ```html
 * <esp-data-cell truncate>
 *   <esp-avatar slot="icon" name="Ada Lovelace" size="small"></esp-avatar>
 *   <span slot="primary">Ada Lovelace</span>
 *   <span slot="secondary">ada@example.com</span>
 * </esp-data-cell>
 * ```
 *
 * @slot primary - Main cell line.
 * @slot secondary - Supporting metadata line.
 * @slot icon - Optional leading icon or avatar.
 *
 * @docPageTitle Data Cell
 * @docUrl /components/data-cell
 * @menuGroup Data Display
 * @menuLabel Data Cell
 * @menuIcon list-details
 */
export declare class EspalierDataCell extends EspalierElementBase {
    /**
     * Truncates both text lines to a single ellipsized line.
     */
    truncate: boolean;
    protected firstUpdated(changedProperties: PropertyValues<this>): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-data-cell": EspalierDataCell;
    }
}
