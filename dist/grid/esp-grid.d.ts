import { type PropertyValues, type TemplateResult } from "lit";
import "../input/esp-input.js";
import "../button/esp-button.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type GridRow } from "./esp-grid-column.js";
import "./esp-grid-column.js";
import "@lit-labs/virtualizer";
export type { GridRow };
export type GridClickedEvent = {
    grid: EspalierGrid;
    target: Element;
    event: string;
    data: GridRow;
};
export declare const GRID_LOAD_START_EVENT = "esp-grid-load-start";
export declare const GRID_LOAD_SUCCESS_EVENT = "esp-grid-load-success";
export declare const GRID_LOAD_ERROR_EVENT = "esp-grid-load-error";
export declare const GRID_ITEMS_CHANGED_EVENT = "esp-grid-items-changed";
/**
 * Parameters passed to the `fetchPage` callback when the grid
 * is in cursor-based infinite scroll mode.
 */
export type CursorFetchParams = {
    /** The cursor for the page to fetch. `null` means fetch the first page. */
    cursor: string | null;
    /** The number of items to fetch per page (from `pageSize`). */
    limit: number;
    /** The current search term (empty string if none). */
    search: string;
    /** The field name being sorted on (empty string if none). */
    sortField: string;
    /** The sort direction. */
    sortOrder: "asc" | "desc" | "";
};
/**
 * The shape of the result returned by the `fetchPage` callback.
 */
export type CursorFetchResult<T = GridRow> = {
    /** The items for this page. */
    items: T[];
    /** Cursor for the next page, or `null` if there are no more pages. */
    nextCursor: string | null;
};
export type GridDataStateEventDetail<T = GridRow> = {
    /** The grid's current loaded or filtered item set. */
    items: T[];
    /** The number of items in `items`. */
    itemCount: number;
    /** Whether the current data state represents the first page. */
    isFirstPage: boolean;
    /** Cursor used for the current page load, or `null` for the first page. */
    cursor: string | null;
    /** Cursor for the next page, or `null` when no next page is known. */
    nextCursor: string | null;
    /** Whether the current item set has at least one row. */
    hasRows: boolean;
    /** Whether the current item set is empty. */
    isEmpty: boolean;
    /** The current search term, lower-cased to match grid filtering behavior. */
    search: string;
    /** The active sort field, or an empty string when unsorted. */
    sortField: string;
    /** The active sort order, or an empty string when unsorted. */
    sortOrder: CursorFetchParams["sortOrder"];
};
export type GridLoadStartEventDetail<T = GridRow> = GridDataStateEventDetail<T>;
export type GridLoadSuccessEventDetail<T = GridRow> = GridDataStateEventDetail<T>;
export type GridItemsChangedEventDetail<T = GridRow> = GridDataStateEventDetail<T>;
export type GridLoadErrorEventDetail<T = GridRow> = GridDataStateEventDetail<T> & {
    /** The error thrown while fetching grid data. */
    error: unknown;
};
/**
 * Renders data in a table. Specify grid column definitions by
 * adding [esp-grid-column](/components/grid/grid-column) elements to
 * the default slot.
 *
 * @slot - Grid has a default slot that expects `<esp-grid-column>`
 * elements to define the columns in the grid:
 *
 * ```html
 * <esp-grid data-url="/assets/data/grid-data.json">
 *   <esp-grid-column header="Id" field-name="id" text-align="right" sortable sort-type="number" pin="left" width="60px"></esp-grid-column>
 *   <esp-grid-column header="Name" sort-field="first_name" sortable width="200px">
 *     <a href="mailto:${email}">${first_name} ${last_name}</a>
 *   </esp-grid-column>
 *   <esp-grid-column header="First name" field-name="first_name"></esp-grid-column>
 *   <esp-grid-column header="Last name" field-name="last_name"></esp-grid-column>
 *   <esp-grid-column header="Email" field-name="email" sortable></esp-grid-column>
 *   <esp-grid-column pin="right" width="calc(var(--esp-size-font) + var(--esp-size-tiny) / 3 * 2 + var(--esp-size-tiny-to-small) * 2)">
 *     <esp-action-menu placement="bottom-end" icon-position="right">
 *       <esp-button slot="trigger" icon-only icon="select" variant="complementary" aria-label="Row actions" class="grid-demo-button"></esp-button>
 *       <esp-action-menu-item value="edit" icon="edit" grid-event="edit-user">
 *         Edit
 *       </esp-action-menu-item>
 *       <esp-action-menu-item value="settings" icon="cog" grid-event="user-settings">
 *         Settings
 *       </esp-action-menu-item>
 *       <esp-action-menu-item value="pin" icon="pin" grid-event="pin-user">
 *         Pin
 *       </esp-action-menu-item>
 *       <esp-action-menu-item value="delete" icon="trash" grid-event="delete-user">
 *         Delete
 *       </esp-action-menu-item>
 *     </esp-action-menu>
 *   </esp-grid-column>
 * </esp-grid>
 * <script>
 *   const theGrid = findByTagName("esp-grid")[0];
 *   theGrid.addEventListener("grid-event", (event) => {
 *     showToast({
 *       message: `${event.detail.event} for ${event.detail.data.first_name} ${event.detail.data.last_name}.`,
 *       icon: "info-i",
 *       duration: 0
 *     });
 *   });
 * </script>
 * ```
 *
 * The grid also supports cursor-based infinite scrolling. Instead
 * of fetching all data up front, provide a `fetchPage` callback
 * that returns a page of items and a cursor for the next page.
 * The grid virtualizes the rows and fetches more data as the user
 * scrolls. Search and sort are delegated to the server via the
 * callback parameters.
 *
 * <esp-info variant="warning" icon="info-i">
 *   Every column in an infinite-scroll grid must have an explicit
 *   `width` attribute. Use the `grow` attribute on one or more columns
 *   to fill remaining horizontal space when the grid is wider than its
 *   content.
 * </esp-info>
 *
 * ```html
 * <esp-grid page-size="50">
 *   <esp-grid-column header="Id" field-name="id" text-align="right" sortable sort-type="number" pin="left" width="calc(5ch + var(--esp-size-tiny-to-small) * 2)"></esp-grid-column>
 *   <esp-grid-column header="Name" sort-field="first_name" sortable width="calc(18ch + var(--esp-size-tiny-to-small) * 2)">
 *     <a href="mailto:${email}">${first_name} ${last_name}</a>
 *   </esp-grid-column>
 *   <esp-grid-column header="First name" field-name="first_name" width="calc(12ch + var(--esp-size-tiny-to-small) * 2)"></esp-grid-column>
 *   <esp-grid-column header="Last name" field-name="last_name" width="calc(12ch + var(--esp-size-tiny-to-small) * 2)"></esp-grid-column>
 *   <esp-grid-column header="Email" field-name="email" sortable width="calc(22ch + var(--esp-size-tiny-to-small) * 2)" grow></esp-grid-column>
 *   <esp-grid-column pin="right" width="calc(var(--esp-size-font) + var(--esp-size-tiny) / 3 * 2 + var(--esp-size-tiny-to-small) * 2)">
 *     <esp-button grid-event="user-button-clicked" icon-only icon="user-circle" variant="complementary" class="grid-demo-button"></esp-button>
 *   </esp-grid-column>
 * </esp-grid>
 * <script>
 *   const theGrid = findByTagName("esp-grid")[0];
 *   theGrid.addEventListener("grid-event", (event) => {
 *     showToast({
 *       message: `You clicked on ${event.detail.data.first_name} ${event.detail.data.last_name}.`,
 *       icon: "info-i",
 *       duration: 0
 *     });
 *   });
 *   (async () => {
 *     const allData = await fetch("/assets/data/grid-data.json").then(r => r.json());
 *     theGrid.fetchPage = async ({ cursor, limit, search, sortField, sortOrder }) => {
 *       let data = [...allData];
 *       if (search) {
 *         data = data.filter(item =>
 *           Object.values(item).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
 *         );
 *       }
 *       if (sortField) {
 *         data.sort((a, b) => {
 *           const dir = sortOrder === "desc" ? -1 : 1;
 *           return a[sortField] > b[sortField] ? dir : -dir;
 *         });
 *       }
 *       const startIndex = cursor ? parseInt(cursor) : 0;
 *       const items = data.slice(startIndex, startIndex + limit);
 *       const nextStart = startIndex + limit;
 *       return {
 *         items,
 *         nextCursor: nextStart < data.length ? String(nextStart) : null,
 *       };
 *     };
 *   })();
 * </script>
 * ```
 *
 * When the total number of items is smaller than the configured
 * `grid-height`, the grid automatically shrinks to fit after data
 * loads. This also works after sort, search, and reload — the grid
 * re-measures and adjusts its height each time.
 *
 * ```html
 * <esp-grid page-size="50" grid-height="60vh">
 *   <esp-grid-column header="Id" field-name="id" text-align="right" sortable sort-type="number" width="calc(5ch + var(--esp-size-tiny-to-small) * 2)"></esp-grid-column>
 *   <esp-grid-column header="Tag" field-name="tag" sortable width="calc(18ch + var(--esp-size-tiny-to-small) * 2)" grow></esp-grid-column>
 * </esp-grid>
 * <script>
 *   const theGrid = findByTagName("esp-grid")[0];
 *   const twoItems = [
 *     { id: 1, tag: "infrastructure" },
 *     { id: 2, tag: "documentation" },
 *   ];
 *   theGrid.fetchPage = async ({ cursor, limit, search, sortField, sortOrder }) => {
 *     let data = [...twoItems];
 *     if (search) {
 *       data = data.filter(item =>
 *         Object.values(item).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
 *       );
 *     }
 *     if (sortField) {
 *       data.sort((a, b) => {
 *         const dir = sortOrder === "desc" ? -1 : 1;
 *         return a[sortField] > b[sortField] ? dir : -dir;
 *       });
 *     }
 *     return { items: data, nextCursor: null };
 *   };
 * </script>
 * ```
 *
 * The grid also regrows when a reload returns more items. In this
 * example the grid starts with 1 row (compact), then clicking
 * "Load more" replaces the data with 10 rows and the grid
 * expands to fit.
 *
 * ```html
 * <esp-grid page-size="50" grid-height="60vh">
 *   <esp-grid-column header="Id" field-name="id" text-align="right" sortable sort-type="number" width="calc(5ch + var(--esp-size-tiny-to-small) * 2)"></esp-grid-column>
 *   <esp-grid-column header="Name" field-name="name" sortable width="calc(18ch + var(--esp-size-tiny-to-small) * 2)" grow></esp-grid-column>
 *   <esp-button slot="header-buttons" variant="success" id="load-more-btn" label="Load more"></esp-button>
 * </esp-grid>
 * <script>
 *   const theGrid = findByTagName("esp-grid")[0];
 *   const btn = findById("load-more-btn");
 *   const oneItem = [{ id: 1, name: "Only item" }];
 *   const tenItems = Array.from({ length: 10 }, (_, i) => ({
 *     id: i + 1,
 *     name: "Item " + (i + 1),
 *   }));
 *   let currentData = oneItem;
 *   theGrid.fetchPage = async () => ({
 *     items: currentData,
 *     nextCursor: null,
 *   });
 *   btn.addEventListener("clicked", () => {
 *     currentData = currentData === oneItem ? tenItems : oneItem;
 *     btn.label = currentData === oneItem ? "Load more" : "Load less";
 *     theGrid.reload();
 *   });
 * </script>
 * ```
 *
 * Columns can use a `.template` callback to render custom web
 * components inside each cell. The grid explicitly waits for
 * Lit-based custom elements (those exposing `updateComplete`)
 * to finish rendering before measuring row heights. For other
 * custom elements, a zero-height guard prevents the grid from
 * collapsing if the element hasn't painted yet. In the example
 * below, a `<grid-cell-demo>` custom element renders a two-line
 * contact cell with the person's name and email.
 *
 * ```html
 * <esp-grid page-size="50">
 *   <esp-grid-column header="Contact" sort-field="first_name" sortable width="calc(24ch + var(--esp-size-tiny-to-small) * 2)" grow></esp-grid-column>
 *   <esp-grid-column header="Email" field-name="email" sortable width="calc(22ch + var(--esp-size-tiny-to-small) * 2)"></esp-grid-column>
 * </esp-grid>
 * <script>
 *   if (!customElements.get("grid-cell-demo")) {
 *     class GridCellDemo extends HTMLElement {
 *       connectedCallback() { this._render(); }
 *       set item(v) { this._item = v; this._render(); }
 *       get item() { return this._item; }
 *       _render() {
 *         if (!this._item) return;
 *         const root = this.shadowRoot || this.attachShadow({ mode: "open" });
 *         root.innerHTML = `
 *           <style>:host{display:block} .cell{display:grid;gap:0.15em;padding:0.1em 0}</style>
 *           <div class="cell">
 *             <strong>${this._item.first_name} ${this._item.last_name}</strong>
 *             <span style="font-size:0.85em;opacity:0.7">${this._item.email}</span>
 *           </div>`;
 *       }
 *     }
 *     customElements.define("grid-cell-demo", GridCellDemo);
 *   }
 *
 *   const theGrid = findByTagName("esp-grid")[0];
 *   const contactCol = findByTagName("esp-grid-column")[0];
 *   contactCol.template = (item) =>
 *     html`<grid-cell-demo .item=${item}></grid-cell-demo>`;
 *
 *   (async () => {
 *     const allData = await fetch("/assets/data/grid-data.json").then(r => r.json());
 *     theGrid.fetchPage = async ({ cursor, limit, search, sortField, sortOrder }) => {
 *       let data = [...allData];
 *       if (search) {
 *         data = data.filter(item =>
 *           Object.values(item).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
 *         );
 *       }
 *       if (sortField) {
 *         data.sort((a, b) => {
 *           const dir = sortOrder === "desc" ? -1 : 1;
 *           return a[sortField] > b[sortField] ? dir : -dir;
 *         });
 *       }
 *       const startIndex = cursor ? parseInt(cursor) : 0;
 *       const items = data.slice(startIndex, startIndex + limit);
 *       const nextStart = startIndex + limit;
 *       return {
 *         items,
 *         nextCursor: nextStart < data.length ? String(nextStart) : null,
 *       };
 *     };
 *   })();
 * </script>
 * ```
 *
 * @slot header-buttons - The header buttons slot is for adding buttons next
 * to the search box at the top of the grid. Useful for things like an add
 * item button:
 *
 * ```html
 * <esp-grid data-url="/assets/data/grid-data.json" search-fields='["first_name", "last_name"]' variant="triadic-left">
 *   <esp-grid-column header="Name" sort-field="first_name" sort-order="asc" sortable>
 *     <a href="mailto:${email}">${first_name} ${last_name}</a>
 *   </esp-grid-column>
 *   <esp-grid-column width="0">
 *     <esp-button icon-only icon="user-circle" class="grid-demo-button" variant="triadic-left"></esp-button>
 *   </esp-grid-column>
 *   <esp-button variant="success" icon-only icon="plus" slot="header-buttons"></esp-button>
 * </esp-grid>
 * ```
 *
 * @event {CustomEvent<GridClickedEvent>} grid-event - The
 * grid listens for click events, and if a child element has a `grid-event`
 * attribute, grid publishes an event with the grid, clicked element, and
 * associated data.
 * @event {CustomEvent<GridLoadStartEventDetail>} esp-grid-load-start -
 * Fired before the grid starts fetching a page of data.
 * @event {CustomEvent<GridLoadSuccessEventDetail>} esp-grid-load-success -
 * Fired after fetched items have been applied to the grid.
 * @event {CustomEvent<GridLoadErrorEventDetail>} esp-grid-load-error -
 * Fired when a grid data fetch fails.
 * @event {CustomEvent<GridItemsChangedEventDetail>} esp-grid-items-changed -
 * Fired whenever the grid's current item set changes.
 *
 * @cssprop --esp-grid-border-outer - Border style of the grid's outer edge.
 *   Defaults to `2px solid var(--esp-color-border)`.
 * @cssprop --esp-grid-border-inner - Border style of the grid's internal
 *   section separators. Defaults to `2px solid var(--esp-color-border)`.
 * @cssprop --esp-grid-background - Background color of the grid container.
 *   Defaults to `var(--esp-color-layer-1)`.
 * @cssprop --esp-grid-text-color - Text color used by the grid.
 *   Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-grid-header-background - Background color of header rows and
 *   pinned header cells. Defaults to `var(--esp-color-layer-4)`.
 * @cssprop --esp-grid-header-active-background - Background color used for
 *   sorted or hovered sortable headers. Defaults to `var(--esp-color-layer-3)`.
 * @cssprop --esp-grid-row-background-odd - Background color of odd rows.
 *   Defaults to `var(--esp-color-layer-1)`.
 * @cssprop --esp-grid-row-background-even - Background color of even rows.
 *   Defaults to `var(--esp-color-layer-2)`.
 * @cssprop --esp-grid-row-hover-background - Background color of hovered rows.
 *   Defaults to `var(--esp-color-layer-3)`.
 * @cssprop --esp-grid-cell-border-color - Cell divider color used throughout
 *   the grid. Defaults to `var(--esp-color-layer-3)`.
 * @cssprop --esp-grid-row-hover-border-color - Divider color used while rows
 *   are hovered. Defaults to `var(--esp-color-layer-4)`.
 * @cssprop --esp-grid-link-color - Link color used inside grid cells.
 *   Defaults to `var(--esp-color-link)`.
 * @cssprop --esp-grid-link-hover-color - Link hover decoration color used
 *   inside grid cells. Defaults to `var(--esp-color-link-hover)`.
 * @customElement esp-grid
 * @docPageTitle Grid
 * @docUrl /components/grid
 * @menuGroup Structure
 * @menuOrder 4
 * @menuLabel Grid
 * @menuIcon table
 */
export declare class EspalierGrid extends EspalierElementBase {
    /**
     * If there is a `data-url` specified, the name of the
     * field on the response to get the array of items from.
     * If it is empty, the API response should simply return
     * an array of data items.
     *
     * @type {string}
     */
    dataField: string;
    /**
     * Specify a URL the grid will fetch data from.
     * @type {string}
     */
    dataUrl: string;
    /**
     * If using a `data-url`, the items retrieved are available
     * in the items property. An items array can be assigned
     * instead of using a `data-url`.
     */
    get items(): GridRow[];
    set items(newItems: GridRow[]);
    /**
     * The number of items to display on a page. In paged mode this
     * controls how many rows are shown per page. In infinite scroll
     * mode this controls how many items are fetched per request.
     * @type {number}
     */
    pageSize: number;
    /**
     * The height of the grid when in infinite scroll mode. Accepts
     * any valid CSS height value. Defaults to `60vh`.
     *
     * If the loaded content is shorter than this value (and there
     * are no more pages to fetch), the grid shrinks to fit.
     * @type {string}
     */
    gridHeight: string;
    /**
     * The fields to include when filtering results. It defaults to
     * an empty array, which includes all fields. The test dataset
     * includes an address field that is not displayed, so to only
     * filter results by fields displayed in the grid, specify those
     * fields in the `search-fields` attribute.
     *
     * <esp-info variant="warning" icon="info-i">
     *   When specifying arrays in plain HTML, the attributes should be wrapped in single quotes.
     * </esp-info>
     *
     * ```html
     * <esp-grid
     *   data-url="/assets/data/grid-data.json"
     *   search-fields='["first_name", "last_name"]'>
     *   <esp-grid-column header="Id" field-name="id" text-align="right" sortable sort-type="number"></esp-grid-column>
     *   <esp-grid-column header="Name" sort-field="first_name" sortable>
     *     <a href="mailto:${email}">${first_name} ${last_name}</a>
     *   </esp-grid-column>
     * </esp-grid>
     * ```
     *
     * @type {string[]}
     */
    searchFields: string[];
    /**
     * Provide a callback to enable cursor-based infinite scrolling.
     * When set, the grid virtualizes rows and fetches pages on demand
     * as the user scrolls. Search and sort are delegated to the server
     * via the callback parameters.
     */
    get fetchPage(): ((params: CursorFetchParams) => Promise<CursorFetchResult>) | null;
    set fetchPage(value: ((params: CursorFetchParams) => Promise<CursorFetchResult>) | null);
    /**
     * Deletes items from the grid where the lookup
     * function returns true.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column header="Id" field-name="id" text-align="right" sortable sort-type="number"></esp-grid-column>
     *   <esp-grid-column header="Name" sort-field="first_name" sortable>
     *     <a href="mailto:${email}">${first_name} ${last_name}</a>
     *   </esp-grid-column>
     *   <esp-grid-column header="First name" field-name="first_name"></esp-grid-column>
     *   <esp-grid-column header="Last name" field-name="last_name"></esp-grid-column>
     *   <esp-grid-column header="Email" field-name="email" sortable></esp-grid-column>
     *   <esp-grid-column>
     *     <esp-button grid-event="trash-button-clicked" icon-only icon="trash" variant="danger" class="grid-demo-button"></esp-button>
     *   </esp-grid-column>
     * </esp-grid>
     * <script>
     *   const thePage = document.getElementsByTagName("esp-page")[0];
     *   const theGrid = findByTagName("esp-grid")[0];
     *   theGrid.addEventListener("grid-event", (event) => {
     *     if(event.detail.event === "trash-button-clicked") {
     *       theGrid.delete(item => item.id === event.detail.data.id);
     *     }
     *   });
     * </script>
     * ```
     */
    delete(lookup: (item: GridRow) => boolean): void;
    /**
     * Adds or replaces the item from the grid where the lookup
     * function returns true. If there is more than one match,
     * only the first match is replaced.
     *
     * ```html
     * <esp-grid data-url="/assets/data/grid-data.json">
     *   <esp-grid-column header="Id" field-name="id" text-align="right" sortable sort-type="number"></esp-grid-column>
     *   <esp-grid-column header="Name" sort-field="first_name" sortable>
     *     <a href="mailto:${email}">${first_name} ${last_name}</a>
     *   </esp-grid-column>
     *   <esp-grid-column header="First name" field-name="first_name"></esp-grid-column>
     *   <esp-grid-column header="Last name" field-name="last_name"></esp-grid-column>
     *   <esp-grid-column header="Email" field-name="email" sortable></esp-grid-column>
     *   <esp-grid-column>
     *     <esp-button grid-event="replace-button-clicked" icon-only icon="wand" variant="triadic-left" class="grid-demo-button"></esp-button>
     *   </esp-grid-column>
     * </esp-grid>
     * <script>
     *   const thePage = document.getElementsByTagName("esp-page")[0];
     *   const theGrid = findByTagName("esp-grid")[0];
     *   theGrid.addEventListener("grid-event", (event) => {
     *     if(event.detail.event === "replace-button-clicked") {
     *       const newObject = { ...event.detail.data, first_name: "Replaced", last_name: "User" };
     *       theGrid.addOrReplace(item => item.id === event.detail.data.id, newObject);
     *     }
     *   });
     * </script>
     * ```
     */
    addOrReplace(lookup: (item: GridRow) => boolean, newItem: GridRow): void;
    /**
     * Inserts or replaces an item in sorted order. If an existing item
     * matches the `lookup` function, it is replaced in-place. Otherwise
     * the new item is inserted at the position determined by the
     * `compare` function (same semantics as `Array.prototype.sort`).
     *
     * Returns the index of the inserted or replaced item, which can be
     * passed to {@link scrollToIndex} to scroll the item into view.
     */
    addInOrder(lookup: (item: GridRow) => boolean, newItem: GridRow, compare: (a: GridRow, b: GridRow) => number): number;
    /**
     * Scrolls to the item at the given index.
     *
     * In **infinite mode** this waits for the virtualizer to
     * complete its layout pass, then delegates to its
     * `scrollToIndex` method.
     *
     * In **paged mode** this navigates to the page containing
     * the item at `index`.
     */
    scrollToIndex(index: number, position?: "start" | "center" | "end" | "nearest"): Promise<void>;
    /**
     * Clears all items from the grid.
     */
    clear(): void;
    /**
     * Clears all loaded data and re-fetches from the beginning.
     *
     * In **infinite mode** this resets the cursor and triggers a
     * fresh `fetchPage` call.  In **paged mode** this is a no-op
     * (use the `data-url` attribute to reload).
     */
    reload(): Promise<void>;
    protected firstUpdated(props: PropertyValues): Promise<void>;
    protected updated(props: PropertyValues): void;
    disconnectedCallback(): void;
    protected render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-grid": EspalierGrid;
    }
}
