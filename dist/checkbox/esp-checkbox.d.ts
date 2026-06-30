import { type TemplateResult } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierFormField } from "../form-item/esp-form-item.js";
/**
 * A checkbox control for toggling boolean values. Uses Tabler
 * SVG icons for checked, unchecked, and indeterminate states.
 * Works standalone or inside an
 * [esp-checkbox-group](/components/checkbox/group) for multi-select.
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Terms and conditions">
 *     <esp-checkbox value="agree">
 *       I agree to the terms
 *     </esp-checkbox>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ```html
 * <esp-box>
 *   <esp-checkbox checked value="newsletter">
 *     Subscribe to newsletter
 *   </esp-checkbox>
 *   <esp-checkbox disabled value="disabled-opt">
 *     Disabled option
 *   </esp-checkbox>
 *   <esp-checkbox indeterminate value="partial">
 *     Indeterminate state
 *   </esp-checkbox>
 * </esp-box>
 * ```
 *
 * @slot - The label text for the checkbox.
 *
 * @event {CustomEvent<{ checked: boolean; value: string }>} value-changed -
 * Fired when the checkbox is toggled. The detail contains the new
 * `checked` state and the checkbox `value`.
 *
 * @cssprop --esp-checkbox-size - The width and height of the
 * checkbox icon. Defaults to `var(--esp-size-normal-to-medium)`.
 * @cssprop --esp-checkbox-icon-color - The stroke color of the
 * checkbox icon. Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-checkbox-focus-shadow - The color of the focus
 * ring shadow. Defaults to `var(--esp-color-shadow)`.
 *
 * @docPageTitle Checkbox
 * @docUrl /components/checkbox
 * @menuGroup Form Controls
 * @menuLabel Checkbox
 * @menuIcon checkbox
 */
export declare class EspalierCheckbox extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    /**
     * Whether the checkbox is in the checked state.
     */
    checked: boolean;
    /**
     * The value associated with this checkbox. Used by
     * [esp-checkbox-group](/components/checkbox/group) to track
     * which checkboxes are selected.
     */
    value: string;
    /**
     * The name used when the checkbox participates in a `<form>`.
     *
     * @type {string}
     */
    name: string;
    /**
     * When true, the checkbox must be checked before the form can
     * be submitted.
     *
     * @type {boolean}
     */
    required: boolean;
    /**
     * A custom message to display when the checkbox is required but
     * not checked. Defaults to `"Please check this box to continue."`
     * when not set.
     *
     * ```html
     * <esp-checkbox required required-message="You must accept the terms.">
     *   I accept
     * </esp-checkbox>
     * ```
     *
     * @type {string}
     */
    requiredMessage: string;
    /**
     * Controls whether the checkbox is disabled.
     */
    disabled: boolean;
    /**
     * Displays the checkbox in an indeterminate (partial) state.
     * Clicking the checkbox clears the indeterminate state.
     */
    indeterminate: boolean;
    /**
     * Focus the checkbox control.
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
    protected render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-checkbox": EspalierCheckbox;
    }
}
