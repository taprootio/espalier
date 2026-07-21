import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type FocusPoint } from "../image/image-focus.js";
import "../image/esp-image.js";
export declare const FOCUS_CHANGED_EVENT = "focus-changed";
export type FocusChangedDetail = FocusPoint;
/**
 * A keyboard- and pointer-operable focal-point authoring control with live
 * banner-cover previews.
 *
 * The HTML value is `focus="x y"`. In JavaScript use `.focusPoint`; the name
 * avoids replacing the platform's required `HTMLElement.focus()` method.
 *
 * ```html
 * <esp-focus-picker
 *   src="/assets/focus-picker-unsplash.jpg"
 *   alt="A woman standing in a sunlit field with her back to the camera"
 *   focus="0.65 0.55"
 *   ratio="3/1"
 *   compact-ratio="3/2"
 * ></esp-focus-picker>
 * <p>
 *   Photo by <a href="https://unsplash.com/@sashafreemind?utm_source=espalier&utm_medium=referral">Sasha Freemind</a>
 *   on <a href="https://unsplash.com/?utm_source=espalier&utm_medium=referral">Unsplash</a>.
 * </p>
 * <script>
 *   const picker = findByTagName("esp-focus-picker")[0];
 *   picker.addEventListener("focus-changed", (event) => {
 *     localStorage.setItem("banner-focus", JSON.stringify(event.detail));
 *   });
 * </script>
 * ```
 *
 * @event {CustomEvent<{x: number, y: number}>} focus-changed - Bubbles across
 * shadow boundaries after every pointer or keyboard adjustment.
 * @csspart picker - The complete control layout.
 * @csspart stage - The source-image authoring surface.
 * @csspart image - The source image.
 * @csspart marker - The focusable focal-point marker.
 * @csspart previews - The live preview group.
 * @csspart preview - A live `esp-image` preview cell.
 * @cssprop --esp-focus-picker-gap - Gap between the stage and previews.
 * @cssprop --esp-focus-picker-stage-background - Empty/loading stage color.
 * @cssprop --esp-focus-picker-marker-size - Focal marker diameter.
 * @cssprop --esp-focus-picker-marker-color - Focal marker fill.
 * @cssprop --esp-focus-picker-marker-border - Focal marker border.
 * @cssprop --esp-focus-picker-marker-shadow - Focal marker shadow.
 * @cssprop --esp-focus-picker-focus-outline - Marker focus-visible outline.
 * @docPageTitle Focus Picker
 * @docUrl /components/focus-picker
 * @menuGroup Media
 * @menuLabel Focus Picker
 * @menuIcon target
 */
export declare class EspalierFocusPicker extends EspalierElementBase {
    /** Image URL shown in the authoring surface and live previews. */
    src: string;
    /** Alternative text for the source-image authoring surface. */
    alt: string;
    /** Normalized current value. Its HTML attribute is named `focus`. */
    focusPoint: FocusPoint;
    /** Aspect ratio for the wide live preview. */
    ratio: string;
    /** Aspect ratio for the compact live preview. */
    compactRatio: string;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-focus-picker": EspalierFocusPicker;
    }
    interface HTMLElementEventMap {
        "focus-changed": CustomEvent<FocusChangedDetail>;
    }
}
