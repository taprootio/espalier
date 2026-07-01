import { LitElement, type PropertyValues } from "lit";
import { type EspalierPickerItem, type PickerItem } from "./esp-picker-item.js";
import "../shared/virtualizer/lit-virtualizer.js";
/**
 * A menu used by Espalier pickers when choosing option(s).
 *
 * @event {CustomEvent<Array<PickerItem>>} selection-changed - Emitted when
 * the user changes the selected item(s). If there are initially selected items,
 * emitted on first update.
 * @event {CustomEvent<Array<PickerItem>>} close-menu - Emitted in single-select mode when the menu should close after a selection is made. Bubbles and is composed so parent pickers can observe it across shadow boundaries.
 * @event {CustomEvent<{ first: number; last: number; items: Array<PickerItem> }>} range-changed - Emitted when the virtualized visible item range changes.
 *
 * ```html
 * <esp-box>
 *   <h4>No selected items</h4>
 *   <esp-picker-menu multi-select="true">
 *     <esp-picker-item text="Apple" value="apple"></esp-picker-item>
 *     <esp-picker-item text="Cherry" value="cherry"></esp-picker-item>
 *     <esp-picker-item text="Lemon" value="banana"></esp-picker-item>
 *   </esp-picker-menu>
 * </esp-box>
 * <script>
 *   const theMenu = findByTagName("esp-picker-menu")[0];
 *   const theHeader = findByTagName("h4")[0];
 *   theMenu.addEventListener("selection-changed", (ev) => {
 *     theHeader.innerText = ev.detail.length == 0 ? "No selected items" :
 *       ev.detail.map(pi => pi.text).join(", ");
 *   });
 * </script>
 * ```
 *
 * @cssprop --esp-color-picker-bg - The background color of the picker menu items.
 * @cssprop --esp-color-picker-bg-alt - The alternate background color for picker menu items.
 * @cssprop --esp-color-picker-bg-hover - The hover background color of regular picker menu items.
 * @cssprop --esp-color-picker-bg-alt-hover - The hover background color of alternating picker menu items.
 * @docPageTitle Picker Menu
 * @docUrl /components/pickers/picker-menu
 * @menuGroup Form Controls
 *
 * @customElement esp-picker-menu
 */
export declare class EspalierPickerMenu extends LitElement {
    constructor();
    connectedCallback(): void;
    protected updated(changedProperties: PropertyValues): void;
    /**
     * An accessible label for the listbox, typically passed from
     * the parent picker's placeholder or form-item label.
     */
    label: string;
    /**
     * Whether the menu is in multi or single selection mode.
     *
     * ### Single selection:
     *
     * ```html
     * <esp-picker-menu>
     *   <esp-picker-item text="Apple" value="apple" icon="apple"></esp-picker-item>
     *   <esp-picker-item text="Cherry" value="cherry" icon="cherry"></esp-picker-item>
     *   <esp-picker-item text="Lemon" value="banana" icon="lemon"></esp-picker-item>
     * </esp-picker-menu>
     * ```
     *
     * ### Multi-selection:
     *
     * ```html
     * <esp-picker-menu multi-select="true">
     *   <esp-picker-item text="Apple" value="apple" icon="apple"></esp-picker-item>
     *   <esp-picker-item text="Cherry" value="cherry" icon="cherry"></esp-picker-item>
     *   <esp-picker-item text="Lemon" value="banana" icon="lemon"></esp-picker-item>
     * </esp-picker-menu>
     * ```
     */
    multiSelect: boolean;
    /**
     * When true, the menu shows a "Searching..." indicator instead
     * of the item list. Used by typeahead mode during remote fetch.
     */
    loading: boolean;
    /**
     * Message to display when the item list is empty (e.g.
     * `"No matches"`).  When empty string, no message is shown.
     */
    emptyMessage: string;
    /**
     * Get all picker items in the picker.
     */
    get pickerItems(): Array<PickerItem>;
    set pickerItems(items: Array<PickerItem>);
    /**
     * Reset the highlight index, clearing any visual highlight.
     * Called when the menu is opened to start fresh.
     */
    resetHighlight(): void;
    /**
     * Returns the `esp-picker-item` DOM element at the current
     * `highlightIndex`, or `null` if no element is rendered at
     * that index. Used by the parent picker to set
     * `ariaActiveDescendantElement`.
     */
    getHighlightedElement(): EspalierPickerItem | null;
    selectItemAtPoint(clientX: number, clientY: number): boolean;
    /**
     * Position the picker menu above or below the given element depending
     * on whether or not there is more room above or below the element.
     * Uses the Popover API to render in the top layer, escaping any
     * ancestor `overflow: hidden` clipping.
     *
     * //TODO: Show the menu full screen on mobile...
     *
     * @param relativeTo The element to place the picker above or below.
     */
    positionSelf(relativeTo: HTMLElement): void;
    /**
     * Resize the menu to fit its current content, capped at
     * `maxAvailableHeight`. Called after the virtualizer re-renders
     * due to a filtered item list change (e.g. typeahead).
     *
     * We await `updateComplete` first so that when Lit swaps between
     * the status-message and the virtualizer template, the new DOM
     * (and `virtualizerRef`) is fully committed before we measure.
     */
    /**
     * Lightweight position update for scroll tracking. Only updates
     * the coordinates — and recalculates max-height only when the
     * viewport height itself has changed (e.g. mobile keyboard),
     * not on every scroll tick where only the trigger's rect shifts.
     */
    updatePosition(relativeTo: HTMLElement): void;
    /**
     * Hide the picker menu popover.
     */
    hideMenu(): void;
    /**
     * Used to perform keyboard actions on the menu. `ArrowDown` and `ArrowUp`
     * change the focused item in the menu. `Enter` toggles selection of the
     * focused item.
     *
     * Focus the input and use `ArrowDown`, `ArrowUp`, and `Enter` to interact
     * with the menu.
     *
     * ```html
     * <esp-box>
     *   <input />
     *   <esp-picker-menu multi-select="true">
     *     <esp-picker-item text="Apple" value="apple"></esp-picker-item>
     *     <esp-picker-item text="Cherry" value="cherry"></esp-picker-item>
     *     <esp-picker-item text="Lemon" value="banana"></esp-picker-item>
     *   </esp-picker-menu>
     * </esp-box>
     * <script>
     *   const theMenu = findByTagName("esp-picker-menu")[0];
     *   const theInput = findByTagName("input")[0];
     *   theInput.addEventListener("keydown", (ev) => {
     *     ev.preventDefault();
     *     switch (ev.key) {
     *       case "ArrowDown":
     *       case "ArrowUp":
     *       case "Enter":
     *         theMenu.doKeyboardNav(ev.key);
     *         break;
     *     }
     *   });
     * </script>
     * ```
     *
     * @param key { "ArrowDown" | "ArrowUp" | "Enter" | "Home" | "End" } - The key press
     * to respond to.
     */
    doKeyboardNav(key: "ArrowDown" | "ArrowUp" | "Enter" | "Home" | "End"): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-picker-menu": EspalierPickerMenu;
    }
}
