import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierFormField } from "../form-item/esp-form-item.js";
/**
 * A radio button control for choosing one option from a set.
 * Uses Tabler SVG icons for selected and unselected states.
 * Should be used inside an
 * [esp-radio-button-group](/components/radio-button/group)
 * for single-select behavior.
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Favorite color">
 *     <esp-radio-button-group>
 *       <esp-radio-button value="red">Red</esp-radio-button>
 *       <esp-radio-button value="green">Green</esp-radio-button>
 *       <esp-radio-button value="blue">Blue</esp-radio-button>
 *     </esp-radio-button-group>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ```html
 * <esp-box>
 *   <esp-radio-button-group>
 *     <esp-radio-button checked value="small">Small</esp-radio-button>
 *     <esp-radio-button value="medium">Medium</esp-radio-button>
 *     <esp-radio-button disabled value="large">Large</esp-radio-button>
 *   </esp-radio-button-group>
 * </esp-box>
 * ```
 *
 * @slot - The label text for the radio button.
 *
 * @event {CustomEvent<{ checked: boolean; value: string }>} value-changed -
 * Fired when the radio button is selected. The detail contains the
 * new `checked` state and the radio button `value`.
 *
 * @cssprop --esp-radio-button-size - The width and height of the
 * radio icon. Defaults to `var(--esp-size-normal-to-medium)`.
 * @cssprop --esp-radio-button-icon-color - The stroke color of the
 * radio icon. Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-radio-button-focus-shadow - The color of the focus
 * ring shadow. Defaults to `var(--esp-color-shadow)`.
 *
 * @docPageTitle Radio Button
 * @docUrl /components/radio-button
 * @menuGroup Form Controls
 * @menuLabel Radio Button
 * @menuIcon circle-dot
 */
export declare class EspalierRadioButton extends EspalierElementBase implements EspalierFormField {
    /**
     * Whether the radio button is in the selected state.
     */
    checked: boolean;
    /**
     * The value associated with this radio button. Used by
     * [esp-radio-button-group](/components/radio-button/group) to
     * track which option is selected.
     */
    value: string;
    /**
     * Controls whether the radio button is disabled.
     */
    disabled: boolean;
    /**
     * Focus the radio button control.
     */
    focus(options?: FocusOptions): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-radio-button": EspalierRadioButton;
    }
}
