import { type EspalierFormField } from "../form-item/esp-form-item.js";
import { type EspalierPickerMenu } from "./esp-picker-menu.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type PickerItem } from "./esp-picker-item.js";
import { type PropertyValues } from "lit";
import { FormFieldController } from "../shared/form-field-controller.js";
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
    /** Re-run constraint validation and dispatch `validity-changed`. */
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
    protected updated(changedProperties: PropertyValues): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
}
