import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierFormField } from "../form-item/esp-form-item.js";
/**
 * A toggle switch for boolean on/off values. Uses a CSS-only
 * track-and-thumb design with a smooth sliding transition.
 * Functionally equivalent to a checkbox but visually communicates
 * an immediate state change rather than a deferred selection.
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Notifications">
 *     <esp-switch value="notifications">
 *       Enable notifications
 *     </esp-switch>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ```html
 * <esp-box>
 *   <esp-switch checked value="dark-mode">
 *     Dark mode
 *   </esp-switch>
 *   <esp-switch disabled value="disabled-opt">
 *     Disabled option
 *   </esp-switch>
 * </esp-box>
 * ```
 *
 * ### Text mode
 *
 * Set `mode="text"` with `off-label` and `on-label` to render a
 * two-option text toggle instead of a track and thumb. This is
 * ideal for binary choices like a billing-period selector:
 *
 * ```html
 * <esp-box>
 *   <esp-switch
 *     mode="text"
 *     off-label="Monthly"
 *     on-label="Annual"
 *     value="annual"
 *   >Billing period</esp-switch>
 * </esp-box>
 * ```
 *
 * The slotted text is visually hidden in text mode and folded
 * into the control's accessible label together with the current
 * selected option. Screen readers will announce both the label
 * and the active choice while the `off-label` / `on-label`
 * text is presented visually.
 *
 * @slot - The label text for the switch. In default mode this
 * renders beside the track; in text mode it is visually hidden
 * and included in the control's accessible label.
 *
 * @event {CustomEvent<{ checked: boolean; value: string }>} value-changed -
 * Fired when the switch is toggled. The detail contains the new
 * `checked` state and the switch `value`.
 *
 * @cssprop --esp-switch-width - The width of the switch track.
 * Defaults to `calc(var(--esp-size-normal-to-medium) * 1.75)`.
 * @cssprop --esp-switch-height - The height of the switch track.
 * Defaults to `var(--esp-size-normal-to-medium)`.
 * @cssprop --esp-switch-thumb-size - The diameter of the thumb.
 * Defaults to `calc(var(--esp-switch-height) - 4px)`.
 * @cssprop --esp-switch-track-color - The track background color
 * when the switch is off. Defaults to `var(--esp-color-border)`.
 * @cssprop --esp-switch-track-color-on - The track background color
 * when the switch is on. Defaults to `var(--esp-color-action-background)`.
 * @cssprop --esp-switch-thumb-color - The thumb color.
 * Defaults to `var(--esp-color-layer-1)`.
 * @cssprop --esp-switch-focus-shadow - The color of the focus
 * ring shadow. Defaults to `var(--esp-color-shadow)`.
 * @cssprop --esp-switch-text-padding - Padding inside each text-mode
 * label cell. Defaults to `var(--esp-size-tiny) var(--esp-size-small)`.
 * @cssprop --esp-switch-text-font-size - Font size for text-mode labels.
 * Defaults to `var(--esp-size-font)`.
 * @cssprop --esp-switch-text-active-color - Text color of the active
 * label in text mode. Defaults to `var(--esp-color-action-text)`.
 * @cssprop --esp-switch-text-inactive-color - Text color of the inactive
 * label in text mode. Defaults to `var(--esp-color-layer-1)`.
 * @cssprop --esp-switch-text-highlight-color - Background color of the
 * sliding highlight in text mode. Defaults to `var(--esp-color-action-background)`.
 *
 * @docPageTitle Switch
 * @docUrl /components/switch
 * @menuGroup Form Controls
 * @menuLabel Switch
 * @menuIcon button
 */
export declare class EspalierSwitch extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    /**
     * The visual presentation of the switch.
     * - `"switch"` (default) renders a track-and-thumb toggle.
     * - `"text"` renders two side-by-side text labels with a
     *   sliding highlight behind the active one.
     */
    mode: "switch" | "text";
    /**
     * Label shown for the unchecked (off) state when
     * `mode="text"`.
     */
    offLabel: string;
    /**
     * Label shown for the checked (on) state when
     * `mode="text"`.
     */
    onLabel: string;
    /**
     * Whether the switch is in the on state.
     */
    checked: boolean;
    /**
     * The value associated with this switch. Submitted with the
     * form when the switch is on.
     */
    value: string;
    /**
     * The name used when the switch participates in a `<form>`.
     *
     * @type {string}
     */
    name: string;
    /**
     * When true, the switch must be on before the form can
     * be submitted.
     *
     * @type {boolean}
     */
    required: boolean;
    /**
     * A custom message to display when the switch is required but
     * not on. Defaults to `"Please toggle this switch to continue."`
     * when not set.
     *
     * ```html
     * <esp-switch required required-message="You must accept the terms.">
     *   I accept
     * </esp-switch>
     * ```
     *
     * @type {string}
     */
    requiredMessage: string;
    /**
     * Controls whether the switch is disabled.
     */
    disabled: boolean;
    /**
     * Focus the switch control.
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
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-switch": EspalierSwitch;
    }
}
