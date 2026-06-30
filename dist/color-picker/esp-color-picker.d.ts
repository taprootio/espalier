import { LitElement } from "lit";
export type ColorPickerMode = "hc" | "hcl";
/**
 * Used to choose a seed color for the Espalier color scheme.
 * Espalier uses the [OKLCH](/guides/color/oklch) color notation.
 * By default this picker lets you choose hue and chroma while
 * lightness stays at 0.7 (the design-system default) so variant
 * derivation stays consistent. Set `mode="hcl"` when an editor
 * needs to tune hue, chroma, and lightness directly.
 *
 * @customElement esp-color-picker
 * @event {CustomEvent<{ seedColor: string, hue: number, chroma: number, lightness: number }>} value-changed - Fired
 * when the user changes the color. The event detail contains the seed
 * color OKLCH string, plus raw hue, chroma, and lightness values.
 *
 * ```html
 * <esp-box>
 *   <esp-color-picker></esp-color-picker>
 * </esp-box>
 * <script>
 *   const espRoot = document.getElementsByTagName("esp-root")[0];
 *   const stored = localStorage.getItem("esp-seed-color")
 *     ?? "oklch(0.7 0.125 216)";
 *   const colorPicker = findByTagName("esp-color-picker")[0];
 *
 *   // Parse stored seed-color to set sliders
 *   const parts = stored.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
 *   if (parts) {
 *     colorPicker.hue = +parts[3];
 *     colorPicker.chroma = Math.round(+parts[2] * 100);
 *   }
 *
 *   colorPicker.addEventListener("value-changed", (event) => {
 *     const { seedColor } = event.detail;
 *     localStorage.setItem("esp-seed-color", seedColor);
 *     espRoot.setAttribute("seed-color", seedColor);
 *   });
 * </script>
 * ```
 *
 * @cssprop --esp-size-color-picker-border-width - The border width of the color picker.
 * @docPageTitle Color Picker
 * @docUrl /components/color-picker
 * @menuGroup Form Controls
 * @menuLabel Color Picker
 * @menuIcon palette
 */
export declare class EspalierColorPicker extends LitElement {
    /**
     * Which controls to show. `hc` preserves the original hue/chroma UI;
     * `hcl` also renders a lightness slider.
     *
     * ```html
     * <esp-box>
     *   <h3>Email brand color</h3>
     *   <esp-color-picker mode="hcl" hue="216" chroma="14" lightness="62"></esp-color-picker>
     * </esp-box>
     * ```
     *
     * @type {"hc" | "hcl"}
     */
    mode: ColorPickerMode;
    /** The selected chroma (0-25)
     *
     * @type {number}
     */
    chroma: number;
    /** The selected hue (0-360)
     *
     * ```html
     * <esp-box>
     *   <h3>A color picker with purple selected</h3>
     *   <esp-color-picker hue="300" chroma="18"></esp-color-picker>
     * </esp-box>
     * ```
     *
     * @type {number}
     */
    hue: number;
    /**
     * The selected OKLCH lightness as a percentage (0-100).
     *
     * The emitted `seedColor` converts this value to OKLCH's 0-1
     * lightness scale.
     *
     * @type {number}
     */
    lightness: number;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-color-picker": EspalierColorPicker;
    }
}
