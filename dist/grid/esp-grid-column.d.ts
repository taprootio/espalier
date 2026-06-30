import { LitElement, type TemplateResult } from "lit";
/** A single row of grid data — intentionally loose since the grid accepts arbitrary JSON. */
export type GridRow = Record<string, any>;
/**
 * Defines grid columns for the [esp-grid](/components/grid).
 * The grid pulls a JSON dataset, then uses column definitions to
 * map data to table cells.
 *
 * @customElement esp-grid-column
 * @slot - Grid column has a default slot for a template to use when
 * rendering the row. For example, use data from three fields to build
 * an email link, and add a button in another column:
 *
 * ```html
 * <esp-grid data-url="/assets/data/grid-data.json" search-fields='["first_name", "last_name"]'>
 *   <esp-grid-column header="Name" sort-field="first_name" sortable>
 *     <a href="mailto:${email}">${first_name} ${last_name}</a>
 *   </esp-grid-column>
 *   <esp-grid-column width="0">
 *     <esp-button icon-only class="grid-demo-button" style="margin: 0 var(--esp-size-tiny-to-small);">
 *       <svg>
 *         <use href="/assets/icons.svg#user-circle" />
 *       </svg>
 *     </esp-button>
 *   </esp-grid-column>
 * </esp-grid>
 * ```
 *
 * @docPageTitle Grid Column
 * @docUrl /components/grid/grid-column
 * @menuGroup Structure
 * @menuOrder 4
 */
export declare class EspalierGridColumn extends LitElement {
    /**
     * The name of the field in the dataset to get the value from.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column field-name="first_name"></esp-grid-column>
     * </esp-grid>
     * ```
     * @type {string}
     */
    fieldName: string;
    /**
     * The header text of the grid column.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column header="First name" field-name="first_name"></esp-grid-column>
     * </esp-grid>
     * ```
     * @type {string}
     */
    header: string;
    /**
     * Whether or not the user can sort on this column.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column header="First name" field-name="first_name" sortable></esp-grid-column>
     * </esp-grid>
     * ```
     * @type {boolean}
     */
    sortable: boolean;
    /**
     * If the column is sortable it will sort on the `field-name`
     * by default. Define a `sort-field` to specify a different
     * field to sort on. Both these columns sort by last name:
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column header="First name" field-name="first_name" sort-field="last_name" sortable></esp-grid-column>
     *   <esp-grid-column header="Last name" field-name="last_name" sort-field="last_name" sortable></esp-grid-column>
     * </esp-grid>
     * ```
     */
    sortField: string;
    /**
     * If sorting on this column, the direction to sort in. By default,
     * the grid will sort on the first column with a sort-order specified.
     */
    sortOrder: "asc" | "desc" | "";
    /**
     * Determines how to parse the value in the field for sort
     * comparisons.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column header="Id" field-name="id" sortable sort-type="number"></esp-grid-column>
     *   <esp-grid-column header="First name" field-name="last_name" sort-column="last_name" sortable></esp-grid-column>
     * </esp-grid>
     * ```
     * @type {string}
     */
    sortType: "string" | "number";
    /**
     * How to align text in the column.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column text-align="right" header="Id" field-name="id" sortable sort-type="number"></esp-grid-column>
     * </esp-grid>
     * ```
     * @type {"center" | "left" | "right"}
     */
    textAlign: "center" | "left" | "right";
    /**
     * The width of the grid column. Set to 0 for the column width to
     * be as small as the value inside will allow.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column header="Id" field-name="id" width="0"></esp-grid-column>
     *   <esp-grid-column header="First name" field-name="last_name"></esp-grid-column>
     * </esp-grid>
     * ```
     * @type {string}
     */
    width: string;
    /**
     * Pin the column to the left or right side of the grid so it
     * remains visible while scrolling horizontally. Pinned columns
     * should have an explicit `width` set when multiple columns are
     * pinned to the same side, so the grid can compute proper offsets.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column pin="left" width="0">
     *     <esp-button icon-only grid-event="action">
     *       <svg><use href="/assets/icons.svg#user-circle" /></svg>
     *     </esp-button>
     *   </esp-grid-column>
     *   <esp-grid-column header="Name" field-name="first_name"></esp-grid-column>
     *   <esp-grid-column header="Email" field-name="email"></esp-grid-column>
     * </esp-grid>
     * ```
     * @type {"left" | "right" | ""}
     */
    pin: "left" | "right" | "";
    /**
     * Allow the column to grow and fill remaining horizontal space.
     * The column keeps its declared `width` as a minimum but expands
     * to absorb any extra room. Multiple growable columns share the
     * extra space equally.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column header="Id" field-name="id" width="60px"></esp-grid-column>
     *   <esp-grid-column header="Email" field-name="email" width="200px" grow></esp-grid-column>
     * </esp-grid>
     * ```
     * @type {boolean}
     */
    grow: boolean;
    template: undefined | ((data: GridRow) => TemplateResult<1>);
    protected firstUpdated(): void;
    protected render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-grid-column": EspalierGridColumn;
    }
}
