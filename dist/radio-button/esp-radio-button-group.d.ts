import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierFormField } from "../form-item/esp-form-item.js";
/**
 * Groups multiple [esp-radio-button](/components/radio-button)
 * components and ensures only one can be selected at a time.
 * Works with [esp-form-item](/components/form-item) for label
 * and error message integration.
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Choose a size">
 *     <esp-radio-button-group>
 *       <esp-radio-button value="small">Small</esp-radio-button>
 *       <esp-radio-button value="medium" checked>Medium</esp-radio-button>
 *       <esp-radio-button value="large">Large</esp-radio-button>
 *     </esp-radio-button-group>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Disabled group">
 *     <esp-radio-button-group disabled>
 *       <esp-radio-button value="a">Option A</esp-radio-button>
 *       <esp-radio-button value="b" checked>Option B</esp-radio-button>
 *       <esp-radio-button value="c">Option C</esp-radio-button>
 *     </esp-radio-button-group>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * @slot - Place `esp-radio-button` elements in the default slot.
 *
 * @event {CustomEvent<string>} value-changed - Fired when the
 * selected radio button changes. The detail is the value of the
 * newly selected radio button.
 *
 * @docPageTitle Radio Button Group
 * @docUrl /components/radio-button/group
 * @menuGroup Form Controls
 */
export declare class EspalierRadioButtonGroup extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    /**
     * The name used when the group participates in a `<form>`.
     *
     * @type {string}
     */
    name: string;
    /**
     * When true, one radio button must be selected before the
     * form can be submitted.
     *
     * @type {boolean}
     */
    required: boolean;
    /**
     * A custom message to display when the group is required but no
     * radio button is selected. Defaults to
     * `"Please select an option."` when not set.
     *
     * @type {string}
     */
    requiredMessage: string;
    /**
     * Disables all child radio buttons in the group.
     */
    disabled: boolean;
    /**
     * Returns the value of the currently selected radio button,
     * or an empty string if none is selected.
     */
    get value(): string;
    /**
     * Focus the checked radio button, or the first non-disabled
     * radio button if none is checked.
     */
    focus(options?: FocusOptions): void;
    /** Re-run constraint validation and dispatch `validity-changed`. */
    validate(): void;
    /** Check whether the current state is valid (delegates to ElementInternals). */
    checkValidity(): boolean;
    /** Called by the browser when the owning `<form>` is reset. */
    formResetCallback(): void;
    /** Called by the browser to restore form state (bfcache, etc.). */
    formStateRestoreCallback(state: string): void;
    /** Called by the browser when a parent `<fieldset>` is enabled or disabled. */
    formDisabledCallback(isDisabled: boolean): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-radio-button-group": EspalierRadioButtonGroup;
    }
}
