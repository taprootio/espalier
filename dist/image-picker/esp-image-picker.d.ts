import { type PropertyValues } from "lit";
import "../pickers/esp-pick-one.js";
import type { EspalierFormField } from "../form-item/esp-form-item.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/** A thumbnail candidate shown by {@link EspalierImagePicker}. */
export type ImagePickerImage = {
    /** Stable identity reported in `value` and `esp-value-changed`. */
    id: string;
    /** URL of the thumbnail to render. */
    src: string;
    /** Optional option name. Falls back to alt text, then Image 1, Image 2, etc. */
    label?: string;
    /** Alternative text for the selected-image preview. */
    alt?: string;
};
/**
 * A form-associated image picker with large image choices and a selected preview.
 *
 * The component is controlled: set `images` and `value` from consumer state,
 * then use `esp-value-changed` to persist a user's next selection. An empty
 * `value` means the Automatic choice. Labels are optional; unlabeled images use
 * their alternative text or a numbered name. Images are shown without cropping.
 *
 * The large preview sits above the control by default. Set
 * `preview-placement="beside"` for a compact preview beside the control.
 * Size the preview and option images with the CSS properties below.
 *
 * ```html
 * <esp-form-item label="Page cover">
 *   <esp-image-picker name="cover" value="field"></esp-image-picker>
 * </esp-form-item>
 * <script>
 *   const picker = document.querySelector("esp-image-picker");
 *   picker.images = [
 *     { id: "field", src: "/assets/focus-picker-unsplash.jpg" },
 *     { id: "paper", src: "/assets/espalier-paper-texture.png" },
 *   ];
 *   picker.addEventListener("esp-value-changed", (event) => {
 *     picker.value = event.detail;
 *   });
 * </script>
 * ```
 *
 * @event {CustomEvent<string>} esp-value-changed - Fired when a user chooses an image or Automatic. The detail is the selected image ID, or an empty string for Automatic.
 * @event {CustomEvent<{ valid: boolean; message: string }>} esp-validity-changed - Fired whenever form validation runs.
 *
 * @cssprop --esp-image-picker-preview-height - Height of the large preview above the control. Default 16rem.
 * @cssprop --esp-image-picker-option-width - Width of dropdown images, capped at 40vw on narrow screens. Default 12rem.
 * @cssprop --esp-image-picker-option-height - Height of dropdown images. Images retain their aspect ratio. Default 8rem.
 *
 * @docPageTitle Image Picker
 * @docUrl /components/image-picker
 * @menuGroup Form Controls
 * @menuLabel Image Picker
 *
 * @customElement esp-image-picker
 */
export declare class EspalierImagePicker extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    /** Image candidates, kept in the supplied order. */
    images: ImagePickerImage[];
    /** Selected image ID. An empty string selects Automatic. */
    value: string;
    /** Preview placement: above (default, large) or beside (compact). */
    previewPlacement: "above" | "beside";
    /** Disables the picker trigger. */
    disabled: boolean;
    /** Shows a loading state while candidates are being fetched. */
    loading: boolean;
    /** Message shown when no image candidates are available. */
    emptyMessage: string;
    /** Label for the empty-value choice. */
    automaticLabel: string;
    /** The name used when this picker participates in a `<form>`. */
    name: string;
    /** Focus the composed picker trigger. */
    focus(options?: FocusOptions): void;
    /** Re-run form validation. */
    validate(): void;
    /** Check form validity. */
    checkValidity(): boolean;
    /** Called by the browser when the owning form resets. */
    formResetCallback(): void;
    /** Called by the browser when form state is restored. */
    formStateRestoreCallback(state: string): void;
    /** Called by the browser when an ancestor fieldset changes disabled state. */
    formDisabledCallback(isDisabled: boolean): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-image-picker": EspalierImagePicker;
    }
}
