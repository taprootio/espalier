import { type EspalierFormField } from "../form-item/esp-form-item.js";
import { type EspalierPickerMenu } from "./esp-picker-menu.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type PickerItem } from "./esp-picker-item.js";
import { type PropertyValues } from "lit";
import { FormFieldController } from "../shared/form-field-controller.js";
import type { TypeaheadFetchItems } from "./types.js";
/** Keys that drive the picker menu rather than the input's text. */
export type PickerNavigationKey = "ArrowDown" | "ArrowUp" | "Enter" | "Home" | "End";
export declare abstract class EspalierPickerBase extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    protected internals: ElementInternals;
    protected formCtrl: FormFieldController;
    /** Return the form submission value. Override in subclasses. */
    protected getPickerFormValue(): string | null;
    /** Return validity state. Override in subclasses. */
    protected getPickerValidity(): {
        flags: ValidityStateFlags;
        message: string;
    } | null;
    /** Handle form reset. Override in subclasses. */
    protected handlePickerReset(): void;
    /** Handle form state restore. Override in subclasses. */
    protected handlePickerRestore(_state: string): void;
    /** Called by the browser when the owning `<form>` is reset. */
    formResetCallback(): void;
    /** Called by the browser to restore form state (bfcache, etc.). */
    formStateRestoreCallback(state: string): void;
    /** Called by the browser when a parent `<fieldset>` is enabled or disabled. */
    formDisabledCallback(isDisabled: boolean): void;
    protected _showOptions: boolean;
    protected itemsSlot: import("lit-html/directives/ref.js").Ref<HTMLSlotElement>;
    protected pickerMenu: import("lit-html/directives/ref.js").Ref<EspalierPickerMenu>;
    protected theInput: import("lit-html/directives/ref.js").Ref<HTMLInputElement>;
    protected get showOptions(): boolean;
    protected set showOptions(val: boolean);
    protected typeaheadLoading: boolean;
    protected filteredItems: PickerItem[];
    protected inputFocused: boolean;
    /**
     * Copy the picker's current selection onto a freshly filtered item list so
     * the menu renders the right checkmarks.
     *
     * Implementations **must not** mutate `items` — `pickerItems` carries
     * `selected` flags that the update lifecycle reads, and the filtered list may
     * alias it.
     */
    protected abstract decorateFilteredItems(items: PickerItem[]): PickerItem[];
    /** Text the input reverts to when a typeahead query is discarded. */
    protected abstract get typeaheadRestoreText(): string;
    /**
     * Whether discarding a query should keep the last remote result set instead
     * of restoring the full canonical list. Multi-select overrides this so a user
     * can keep picking from the same server results without retyping.
     */
    protected get preservesRemoteResultsOnReset(): boolean;
    /** Whether typeahead is sourcing items from `fetchItems` rather than locally. */
    protected get typeaheadIsRemote(): boolean;
    /** Re-seed the typeahead controller with the current canonical items. */
    protected refreshTypeaheadItems(): void;
    /** Fetch the default remote result set. */
    protected fetchInitialTypeaheadItems(): void;
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
    /** Revert the input text to the current selection and drop the query. */
    protected resetTypeaheadInput(): void;
    /** Feed typed text to the controller, opening the menu on first keystroke. */
    protected handleTypeaheadInput: (ev: InputEvent) => void;
    /**
     * Close the menu when focus genuinely leaves the picker.
     *
     * A click on a menu item reports `relatedTarget: null`, because items in the
     * top layer are not focusable. That is indistinguishable from focus leaving
     * the document, so the close is deferred a frame: by then either the item's
     * click has closed the menu itself, or focus really is gone.
     */
    protected handleInputBlur: (event: FocusEvent) => void;
    /**
     * Handle the keys both pickers treat identically.
     *
     * @returns `true` when the key was consumed and the caller should stop.
     */
    protected handleSharedPickerKeydown(ev: KeyboardEvent): boolean;
    /** Open the menu, or forward a navigation key to the open menu. */
    protected handleMenuNavigationKey(key: PickerNavigationKey, ev: KeyboardEvent): void;
    /** Items the menu should render — the filtered set while typing ahead. */
    protected get menuItems(): Array<PickerItem>;
    /**
     * The name used when the picker participates in a `<form>`.
     *
     * @type {string}
     */
    name: string;
    /**
     * When true, a selection must be made before the form can
     * be submitted.
     *
     * @type {boolean}
     */
    required: boolean;
    /**
     * A custom message to display when the picker is required but no
     * selection has been made. Defaults to
     * `"Please select an option."` for `esp-pick-one` and
     * `"Please select at least one option."` for `esp-pick-some`
     * when not set.
     *
     * @type {string}
     */
    requiredMessage: string;
    /**
     * When true, the picker is disabled and cannot be interacted with.
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * The list of picker items to display in the picker.
     * It can either be bound programmatically or computed
     * from the child `esp-picker-item` elements.
     *
     * @type {Array<PickerItem>}
     */
    pickerItems: Array<PickerItem>;
    /**
     * The text that is displayed in the input prompting the user
     * to choose options.
     *
     * @type {string}
     */
    placeholder: string;
    /**
     * An explicit width for the picker trigger. Accepts any valid
     * CSS width value (e.g. `"5em"`, `"80px"`). When set, the host
     * element is sized to this width while the dropdown menu is
     * allowed to be wider to accommodate longer items.
     *
     * ```html
     * <esp-pick-one width="5em">
     *   <esp-picker-item text="Apple" value="apple"></esp-picker-item>
     * </esp-pick-one>
     * ```
     *
     * @type {string}
     */
    width: string;
    /**
     * Focus the picker.
     */
    focus(): void;
    /** Re-run constraint validation and dispatch `esp-validity-changed`. */
    validate(): void;
    /** Check whether the current state is valid (delegates to ElementInternals). */
    checkValidity(): boolean;
    /**
     * Update `ariaActiveDescendantElement` on the input to point
     * at the currently highlighted picker item.
     */
    protected updateActiveDescendant(): void;
    /**
     * Clear `ariaActiveDescendantElement` on the input.
     */
    protected clearActiveDescendant(): void;
    /**
     * Resolve this picker's own selection from `pickerItems`.
     *
     * Runs **before** the typeahead controller is re-seeded, because
     * `setAllItems` synchronously re-emits the filtered list and
     * {@link decorateFilteredItems} reads the selection to mark the menu copies.
     * Reversing the order decorates them against a stale selection, which drops
     * the checkmark for a `.value` set before the items arrived.
     */
    protected syncSelectionFromItems(_changedProperties: PropertyValues): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * The field shell shared by every picker: the trigger grid, the icon slot,
     * the disabled treatment, and the typeahead text cursor.
     *
     * Subclasses spread this into their own `static styles` and add only what is
     * genuinely theirs (`esp-pick-some`'s selection chips, for example).
     */
    static pickerFieldStyles: import("lit").CSSResult;
}
