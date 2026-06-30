import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierFormField } from "../form-item/esp-form-item.js";
/**
 * Groups multiple [esp-checkbox](/components/checkbox)
 * components and manages their collective state. Works with
 * [esp-form-item](/components/form-item) for label and
 * error message integration.
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Select toppings">
 *     <esp-checkbox-group>
 *       <esp-checkbox value="cheese">Cheese</esp-checkbox>
 *       <esp-checkbox value="pepperoni">Pepperoni</esp-checkbox>
 *       <esp-checkbox value="mushrooms">Mushrooms</esp-checkbox>
 *     </esp-checkbox-group>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Disabled group">
 *     <esp-checkbox-group disabled>
 *       <esp-checkbox value="a">Option A</esp-checkbox>
 *       <esp-checkbox value="b" checked>Option B</esp-checkbox>
 *       <esp-checkbox value="c">Option C</esp-checkbox>
 *     </esp-checkbox-group>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * @slot - Place `esp-checkbox` elements in the default slot.
 *
 * @event {CustomEvent<string[]>} value-changed - Fired when any
 * child checkbox state changes. The detail is an array of the
 * values of all currently checked checkboxes.
 *
 * @docPageTitle Checkbox Group
 * @docUrl /components/checkbox/group
 * @menuGroup Form Controls
 */
export declare class EspalierCheckboxGroup extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    /**
     * The name used when the group participates in a `<form>`.
     *
     * @type {string}
     */
    name: string;
    /**
     * When true, at least one checkbox must be checked before
     * the form can be submitted.
     *
     * @type {boolean}
     */
    required: boolean;
    /**
     * A custom message to display when the group is required but no
     * checkbox is checked. Defaults to
     * `"Please select at least one option."` when not set.
     *
     * @type {string}
     */
    requiredMessage: string;
    /**
     * Disables all child checkboxes in the group.
     */
    disabled: boolean;
    /**
     * Returns the values of all currently checked checkboxes
     * in the group.
     */
    get values(): Array<string>;
    /**
     * Focus the first non-disabled checkbox in the group.
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
        "esp-checkbox-group": EspalierCheckboxGroup;
    }
}
