import { type PropertyValues, type TemplateResult } from "lit";
import "./esp-picker-item.js";
import "./esp-picker-menu.js";
import { type PickerItem } from "./esp-picker-item.js";
import { EspalierPickerBase } from "./esp-picker-base.js";
import type { TypeaheadFetchItems } from "./types.js";
/**
 * Component for selecting multiple options from a list of options.
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Pick some fruit">
 *     <esp-pick-some>
 *       <esp-picker-item text="Apple" value="apple" icon="apple"></esp-picker-item>
 *       <esp-picker-item text="Cherry" value="cherry" icon="cherry"></esp-picker-item>
 *       <esp-picker-item text="Lemon" value="banana" icon="lemon"></esp-picker-item>
 *     </esp-pick-some>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ### Initial state (HTML)
 *
 * Set the initially selected items using the `selected` attribute
 * on the `esp-picker-item` elements:
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Pick a fruit">
 *     <esp-pick-some>
 *       <esp-picker-item text="Apple" value="apple" icon="apple"></esp-picker-item>
 *       <esp-picker-item text="Cherry" value="cherry" icon="cherry" selected></esp-picker-item>
 *       <esp-picker-item text="Lemon" value="lemon" icon="lemon" selected></esp-picker-item>
 *     </esp-pick-some>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ### Initial state (programmatic / pickerItems)
 *
 * When populating options via the `pickerItems` property (common
 * in Lit templates that load data from an API), set `selected: true`
 * on items that should be pre-selected. The picker automatically
 * detects items with `selected: true` and renders them as chips:
 *
 * ```ts
 * const allTopics = await fetchTopics();
 * const mySelectedIds = new Set(user.topicIds);
 *
 * picker.pickerItems = allTopics.map(t => ({
 *   text: t.name,
 *   value: t.id,
 *   selected: mySelectedIds.has(t.id),
 * }));
 * ```
 *
 * This works with all modes — plain, typeahead (local), and
 * typeahead (remote via `fetchItems`). The component reads the
 * `selected` flag from `pickerItems` during `willUpdate()` and
 * populates `selectedItems` automatically. **Do not** separately
 * assign `selectedItems` — just set `selected: true` on the
 * items in `pickerItems`.
 *
 * ### Typeahead (local filtering)
 *
 * Add the `typeahead` attribute to let the user type to filter
 * the option list. The input becomes editable and the picker
 * switches to a filter icon on focus:
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Pick some fruit">
 *     <esp-pick-some typeahead>
 *       <esp-picker-item text="Apple" value="apple"></esp-picker-item>
 *       <esp-picker-item text="Cherry" value="cherry"></esp-picker-item>
 *       <esp-picker-item text="Lemon" value="lemon"></esp-picker-item>
 *       <esp-picker-item text="Banana" value="banana"></esp-picker-item>
 *       <esp-picker-item text="Mango" value="mango"></esp-picker-item>
 *     </esp-pick-some>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ### Typeahead (remote filtering)
 *
 * Set the `fetchItems` property to a callback that returns
 * matching items from a server. The picker debounces input
 * (300 ms by default) and shows a loading indicator while
 * the request is in flight. Use the provided `AbortSignal`
 * to cancel stale requests:
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Search users">
 *     <esp-pick-some typeahead placeholder="Type a name…">
 *     </esp-pick-some>
 *   </esp-form-item>
 * </esp-box>
 * <script>
 *   const picker = findByTagName("esp-pick-some")[0];
 *   picker.fetchItems = async (query, signal) => {
 *     const res = await fetch("/assets/data/grid-data.json", { signal });
 *     const all = await res.json();
 *     const q = query.toLowerCase();
 *     return all
 *       .filter(u =>
 *         u.first_name.toLowerCase().includes(q) ||
 *         u.last_name.toLowerCase().includes(q))
 *       .slice(0, 20)
 *       .map(u => ({
 *         text: `${u.first_name} ${u.last_name}`,
 *         value: String(u.id),
 *       }));
 *   };
 * </script>
 * ```
 *
 * ### Add new value
 *
 * Set the `addNewValue` property to a callback that creates
 * a new picker item from the typed text. When the user types
 * a value that does not match any existing item, the dropdown
 * caret becomes a plus icon. Clicking the plus (or pressing
 * Enter) invokes the callback and adds the returned item as
 * a checked selection:
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Pick some tags">
 *     <esp-pick-some typeahead placeholder="Type to search or add…">
 *       <esp-picker-item text="Bug" value="bug"></esp-picker-item>
 *       <esp-picker-item text="Feature" value="feature"></esp-picker-item>
 *       <esp-picker-item text="Docs" value="docs"></esp-picker-item>
 *     </esp-pick-some>
 *   </esp-form-item>
 * </esp-box>
 * <script>
 *   const picker = findByTagName("esp-pick-some")[0];
 *   picker.addNewValue = (text) => ({
 *     text,
 *     value: text.toLowerCase().replace(/\s+/g, "-"),
 *     selected: true,
 *   });
 * </script>
 * ```
 *
 * @event {CustomEvent<PickerItem[]>} value-changed - Fired when
 * the user adds or removes a selected picker item.
 *
 * @docPageTitle Pick Some
 * @docUrl /components/pickers/pick-some
 * @menuGroup Form Controls
 *
 * @customElement esp-pick-some
 */
export declare class EspalierPickSome extends EspalierPickerBase {
    /**
     * The values of all currently selected items.
     */
    get values(): Array<string>;
    /**
     * When true, the picker input becomes a typeahead search field.
     * The user types to filter the option list.
     *
     * @type {boolean}
     */
    typeahead: boolean;
    /**
     * Async callback for fetching items from a remote source.
     * When set alongside `typeahead`, the picker delegates to this
     * callback instead of filtering locally.
     *
     * The callback receives the current query string and an
     * `AbortSignal` that the component will abort when a newer
     * query arrives before the previous request completes.
     */
    fetchItems: TypeaheadFetchItems | null;
    /**
     * Debounce delay in milliseconds for typeahead input. Defaults
     * to `0` for local filtering and `300` for remote fetching.
     *
     * @type {number}
     */
    debounceMs: number | undefined;
    /**
     * Callback for adding a new value when the user types text
     * that does not match any existing item. The callback receives
     * the typed text and should return a `PickerItem` (or a
     * `Promise<PickerItem>`). The returned item is immediately
     * added to the list as a checked selection.
     *
     * Requires `typeahead` to be enabled.
     */
    addNewValue: ((text: string) => PickerItem | Promise<PickerItem>) | null;
    protected getPickerFormValue(): string | null;
    protected getPickerValidity(): {
        flags: ValidityStateFlags;
        message: string;
    } | null;
    protected handlePickerReset(): void;
    protected handlePickerRestore(state: string): void;
    protected set showOptions(val: boolean);
    protected get showOptions(): boolean;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-pick-some": EspalierPickSome;
    }
}
