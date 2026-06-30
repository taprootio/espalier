import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierFormField } from "../form-item/esp-form-item.js";
/**
 * A range slider for selecting numeric values. Built entirely from
 * custom elements with ARIA `role="slider"` — no native
 * `<input type="range">` — for consistent cross-browser styling and
 * intentional touch interaction.
 *
 * On touch devices, only dragging the thumb changes the value.
 * Tapping the track is ignored so the user can scroll the page
 * without accidentally adjusting the slider. On desktop, clicking
 * anywhere on the track jumps to that value and begins a drag.
 *
 * The slider accepts an accessible name from two sources, checked
 * in priority order:
 *
 * 1. Slot content — `<esp-slider>Volume</esp-slider>` renders a
 *    visible label and names the slider via `aria-labelledby`.
 * 2. The `label` attribute — `<esp-slider label="Volume">` applies
 *    an invisible `aria-label` when no slot content is present.
 *
 * ```html
 * <esp-box>
 *   <esp-slider min="0" max="10" step="0.5" value="5">
 *     Rating
 *   </esp-slider>
 *   <esp-slider disabled min="0" max="100" value="30"
 *     label="Disabled slider">
 *   </esp-slider>
 * </esp-box>
 * ```
 *
 * @slot - Label content displayed alongside the slider. When
 * present, it provides the accessible name via `aria-labelledby`.
 *
 * @event {CustomEvent<string>} value-changed -
 * Fired when the slider value changes. The detail is the new value
 * as a string.
 *
 * @cssprop --esp-slider-track-height - Height of the slider track.
 * Defaults to `6px`.
 * @cssprop --esp-slider-track-color - Background color of the
 * unfilled portion of the track.
 * Defaults to `var(--esp-color-border)`.
 * @cssprop --esp-slider-track-fill-color - Background color of the
 * filled portion of the track.
 * Defaults to `var(--esp-color-action-background)`.
 * @cssprop --esp-slider-track-border-radius - Border radius of the
 * track. Defaults to `calc(var(--esp-slider-track-height, 6px) / 2)`.
 * @cssprop --esp-slider-thumb-size - Diameter of the thumb.
 * Defaults to `var(--esp-size-normal-to-medium)`.
 * @cssprop --esp-slider-thumb-color - Fill color of the thumb.
 * Defaults to `var(--esp-color-layer-1)`.
 * @cssprop --esp-slider-thumb-border-color - Border color of the
 * thumb. Defaults to `var(--esp-color-border)`.
 * @cssprop --esp-slider-thumb-shadow - Box shadow of the thumb.
 * Defaults to `0 1px 3px oklch(0 0 0 / 0.2)`.
 * @cssprop --esp-slider-focus-shadow - Color of the focus ring
 * shadow. Defaults to `var(--esp-color-shadow)`.
 *
 * @docPageTitle Slider
 * @docUrl /components/slider
 * @menuGroup Form Controls
 * @menuLabel Slider
 * @menuIcon sliders
 */
export declare class EspalierSlider extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    /** Minimum slider value. */
    min: number;
    /** Maximum slider value. */
    max: number;
    /** Step increment. Values snap to the nearest step. */
    step: number;
    /**
     * Current slider value as a string for form compatibility.
     * Always kept in sync with the rendered state: clamped to
     * `[min, max]` and snapped to `step` whenever the value, min,
     * max, or step properties change.
     */
    value: string;
    /**
     * The name used when the slider participates in a `<form>`.
     *
     * @type {string}
     */
    name: string;
    /** Controls whether the slider is disabled. */
    disabled: boolean;
    /**
     * Accessible label for the slider. Used as `aria-label` on the
     * thumb when no slot content is present. When the default slot
     * has content, `aria-labelledby` takes precedence and this
     * property is ignored.
     */
    label: string;
    /** The value parsed, clamped, and snapped to step. */
    get numericValue(): number;
    /** Fill/thumb position as a percentage of the track width. */
    get percentage(): number;
    protected willUpdate(changed: PropertyValues): void;
    protected firstUpdated(changed: PropertyValues): void;
    /** Focus the slider thumb. */
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
        "esp-slider": EspalierSlider;
    }
}
