import { type PropertyValues } from "lit";
import "./esp-picker-item.js";
import "./esp-picker-menu.js";
import { EspalierPickerBase } from "./esp-picker-base.js";
import type { TypeaheadFetchItems } from "./types.js";
/**
 * Component for selecting a single option from a list of
 * options. For selecting multiple options, see
 * [esp-pick-some](/components/pickers/pick-some/).
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Pick a fruit">
 *     <esp-pick-one>
 *       <esp-picker-item text="Apple" value="apple" icon="apple"></esp-picker-item>
 *       <esp-picker-item text="Cherry" value="cherry" icon="cherry"></esp-picker-item>
 *       <esp-picker-item text="Lemon" value="lemon" icon="lemon"></esp-picker-item>
 *     </esp-pick-one>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ### Initial state
 *
 * Set the initially selected item using the `selected` attribute
 * on the `esp-picker-item`:
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Pick a fruit">
 *     <esp-pick-one>
 *       <esp-picker-item text="Apple" value="apple" icon="apple"></esp-picker-item>
 *       <esp-picker-item text="Cherry" value="cherry" icon="cherry"></esp-picker-item>
 *       <esp-picker-item text="Lemon" value="lemon" icon="lemon" selected></esp-picker-item>
 *     </esp-pick-one>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ### Variable-height items
 *
 * Items with longer text wrap naturally. The menu sizes itself
 * to fit the actual content height of each item:
 *
 * ```html
 * <div style="width: 260px">
 *   <esp-box>
 *     <esp-form-item label="Pick a plan">
 *       <esp-pick-one>
 *         <esp-picker-item
 *           text="Basic - includes core features only"
 *           value="basic">
 *         </esp-picker-item>
 *         <esp-picker-item
 *           text="Pro - adds analytics, priority support, and advanced integrations for growing teams"
 *           value="pro">
 *         </esp-picker-item>
 *         <esp-picker-item
 *           text="Enterprise - everything in Pro plus SSO, audit logs, dedicated account management, and custom SLAs"
 *           value="enterprise">
 *         </esp-picker-item>
 *         <esp-picker-item
 *           text="Starter"
 *           value="starter">
 *         </esp-picker-item>
 *       </esp-pick-one>
 *     </esp-form-item>
 *   </esp-box>
 * </div>
 * ```
 *
 * ### Typeahead (local filtering)
 *
 * Add the `typeahead` attribute to let the user type to filter
 * the option list. The input becomes editable and the picker
 * switches to a filter icon on focus:
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Pick a fruit">
 *     <esp-pick-one typeahead>
 *       <esp-picker-item text="Apple" value="apple"></esp-picker-item>
 *       <esp-picker-item text="Cherry" value="cherry"></esp-picker-item>
 *       <esp-picker-item text="Lemon" value="lemon"></esp-picker-item>
 *     </esp-pick-one>
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
 *     <esp-pick-one typeahead placeholder="Type a name\u2026">
 *     </esp-pick-one>
 *   </esp-form-item>
 * </esp-box>
 * <script>
 *   const picker = findByTagName("esp-pick-one")[0];
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
 * @event {CustomEvent<PickerItem | undefined>} value-changed - Fired when
 * the user selects a picker item.
 *
 * @docPageTitle Pick One
 * @docUrl /components/pickers/pick-one
 * @menuGroup Form Controls
 * @menuLabel Pickers
 * @menuIcon select
 *
 * @customElement esp-pick-one
 */
export declare class EspalierPickOne extends EspalierPickerBase {
    /**
     * The currently selected item value, or `undefined` when no item
     * is selected.
     *
     * Setting this updates the selected state across the canonical
     * picker items and any active filtered menu items.
     */
    get value(): string | undefined;
    set value(val: string | undefined);
    /**
     * When true, the picker input becomes a typeahead search field.
     * The user types to filter the option list. The match is
     * constrained — the user must pick from the filtered results.
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
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-pick-one": EspalierPickOne;
    }
}
