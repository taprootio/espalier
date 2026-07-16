import { LitElement, type PropertyValues } from "lit";
import { type ValidationError } from "../shared/validation.js";
export type EspalierFormField = {
    focus: (options?: FocusOptions) => void;
    validate?: () => void;
    checkValidity?: () => boolean;
};
/**
 * Wraps fields with label and error message functionality. For more
 * information about forms, read our
 * [guide work working with forms](/guides/forms).
 *
 * ```html
 * <style>
 * esp-box.demo-form::part(box) {
 *   display: grid;
 *   gap: var(--esp-size-tiny-to-small);
 * }
 * </style>
 * <esp-box class="demo-form">
 *   <esp-form-item label="Form item" autofocus>
 *     <esp-input></esp-input>
 *   </esp-form-item>
 *   <esp-button label="Form Things"></esp-button>
 * </esp-box>
 * ```
 *
 * @slot - The single form control the item wraps.
 * @slot hint - Rich hint content; replaces the `hint` attribute text when present.
 *
 * @cssprop --esp-form-item-label-color - The color of the label text.
 * @cssprop --esp-form-item-hint-color - The color of the hint text. Defaults to a muted variant of the body text color.
 * @cssprop --esp-form-item-hint-font-size - The font size of the hint text. Defaults to `var(--esp-type-tiny)`.
 * @cssprop --esp-form-item-error-color - The color of the visible error badge text.
 * @cssprop --esp-form-item-error-background - The background color of the visible error badge.
 * @cssprop --esp-form-item-error-field-background - The background color applied to slotted fields while an error is shown.
 * @cssprop --esp-form-item-error-field-border-color - The border color applied to slotted fields while an error is shown.
 * @cssprop --esp-form-item-error-field-text-color - The text color applied to slotted fields while an error is shown.
 * @cssprop --esp-form-item-error-field-focus-shadow - The focus shadow color applied to slotted fields while an error is shown.
 * @cssprop --esp-form-item-warning-color - The color of the visible warning badge text.
 * @cssprop --esp-form-item-warning-background - The background color of the visible warning badge.
 * @cssprop --esp-form-item-warning-field-background - The background color applied to slotted fields while a warning is shown.
 * @cssprop --esp-form-item-warning-field-border-color - The border color applied to slotted fields while a warning is shown.
 * @cssprop --esp-form-item-warning-field-text-color - The text color applied to slotted fields while a warning is shown.
 * @cssprop --esp-form-item-warning-field-focus-shadow - The focus shadow color applied to slotted fields while a warning is shown.
 * @cssprop --esp-form-item-font - The font family for the form item.
 * @cssprop --esp-form-item-font-size - The font size for the form item.
 * @docPageTitle Form Item
 * @docUrl /components/form-item
 * @menuGroup Form Controls
 */
export declare class EspalierFormItem extends LitElement {
    /**
     * Label text to display for the given form control.
     * @type {string}
     */
    label: string;
    /**
     * When true, the first control where autofocus is true has
     * focus captured.
     */
    autofocus: boolean;
    /**
     * Persistent helper text shown with the field — the bottom rung of
     * the help ladder. Hints are static authored guidance such as an
     * expected format; validation messaging belongs to `error` and
     * `warning` and must not be routed through the hint. The hint stays
     * visible while an error or warning badge is showing, and is
     * announced to assistive technology as the field's description via
     * `aria-describedby`.
     *
     * ```html
     * <esp-box class="demo-form">
     *   <esp-form-item
     *     label="Employer ID"
     *     hint="Use the format XX-XXXXXXX.">
     *     <esp-input></esp-input>
     *   </esp-form-item>
     *   <esp-button label="Form Things"></esp-button>
     * </esp-box>
     * ```
     *
     * For rich hint content, slot markup into the `hint` slot instead;
     * it replaces the attribute text when present.
     *
     * @type {string}
     */
    hint: string;
    /**
     * Where the hint renders. `below` (the default) places it directly
     * under the field, above the error/warning badge rows. `above`
     * places it between the label text and the field. Any other value
     * falls back to `below`.
     *
     * ```html
     * <esp-box class="demo-form">
     *   <esp-form-item
     *     label="Employer ID"
     *     hint="Use the format XX-XXXXXXX."
     *     hint-placement="above">
     *     <esp-input></esp-input>
     *   </esp-form-item>
     *   <esp-button label="Form Things"></esp-button>
     * </esp-box>
     * ```
     */
    hintPlacement: "below" | "above";
    /**
     * An error message to show for the given form control.
     *
     * ```html
     * <esp-box class="demo-form">
     *   <esp-form-item
     *     label="Form item"
     *     error="There's something wrong!">
     *     <esp-input></esp-input>
     *   </esp-form-item>
     *   <esp-button label="Form Things"></esp-button>
     * </esp-box>
     * ```
     *
     * @type {string}
     */
    get error(): string;
    set error(value: string);
    /**
     * A warning message to show for the given form control.
     * Warning is hidden when an error is also present.
     *
     * ```html
     * <esp-box class="demo-form">
     *   <esp-form-item
     *     label="Form item"
     *     warning="This might not be right.">
     *     <esp-input></esp-input>
     *   </esp-form-item>
     *   <esp-button label="Form Things"></esp-button>
     * </esp-box>
     * ```
     *
     * @type {string}
     */
    get warning(): string;
    set warning(value: string);
    /**
     * Identifies this form item's field. Serves two purposes:
     * 1. Filters errors from the bound `errorPool` to show only
     *    errors whose `fieldName` matches.
     * 2. Propagates as the `name` attribute on the slotted form
     *    field, so there is no need to set `name` separately.
     */
    fieldName: string;
    /**
     * Bind to an array of `ValidationError` to automatically filter
     * and show errors whose `fieldName` matches this item's
     * `field-name` attribute.
     *
     * ```html
     * <esp-form-item
     *   label="Path"
     *   field-name="Path"
     *   .errorPool=${this.validationErrors}
     * >
     *   <esp-input .value=${this.pagePath}></esp-input>
     * </esp-form-item>
     * ```
     */
    get errorPool(): Array<ValidationError>;
    set errorPool(errors: Array<ValidationError>);
    protected firstUpdated(): void;
    protected updated(changed: PropertyValues): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Focus the assigned slotted field.
     */
    focus(options?: FocusOptions): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-form-item": EspalierFormItem;
    }
}
