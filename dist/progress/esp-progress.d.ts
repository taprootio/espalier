import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A progress indicator that supports both determinate and
 * indeterminate modes, rendered as a linear bar or a circle.
 *
 * In **determinate** mode, set `value` and optionally `max` to
 * show a fill bar representing progress toward completion:
 *
 * ```html
 * <esp-progress value="42" show-value label="Upload progress"></esp-progress>
 * ```
 *
 * In **indeterminate** mode (the default when no `value` is set),
 * an animated bar communicates that work is happening
 * without a known endpoint:
 *
 * ```html
 * <esp-progress label="Loading data..."></esp-progress>
 * ```
 *
 * The three size presets:
 *
 * ```html
 * <div style="display: grid; gap: var(--esp-size-small);">
 *   <esp-progress value="60" label="Small" size="small"></esp-progress>
 *   <esp-progress value="60" label="Medium" size="medium"></esp-progress>
 *   <esp-progress value="60" label="Large" size="large" show-value></esp-progress>
 * </div>
 * ```
 *
 * Color variants match the design system:
 *
 * ```html
 * <div style="display: grid; gap: var(--esp-size-padding);">
 *   <esp-progress value="80" label="Primary" variant="primary" show-value></esp-progress>
 *   <esp-progress value="60" label="Success" variant="success" show-value></esp-progress>
 *   <esp-progress value="40" label="Warning" variant="warning" show-value></esp-progress>
 *   <esp-progress value="20" label="Danger" variant="danger" show-value></esp-progress>
 * </div>
 * ```
 *
 * Click the button to watch the progress bar fill over ten seconds:
 *
 * ```html
 * <esp-box>
 *   <esp-progress id="demo-progress" value="0" label="Demo progress" variant="success" size="large" show-value></esp-progress>
 *   <div style="display: flex; gap: var(--esp-size-small); margin-top: var(--esp-size-small);">
 *     <esp-button id="start-btn" label="Start" variant="primary" collapsed></esp-button>
 *     <esp-button id="reset-btn" label="Reset" variant="complementary" collapsed></esp-button>
 *   </div>
 * </esp-box>
 * <script>
 *   const progress = findById("demo-progress");
 *   const startBtn = findById("start-btn");
 *   const resetBtn = findById("reset-btn");
 *   let running = false;
 *   startBtn.addEventListener("clicked", () => {
 *     if (running) return;
 *     running = true;
 *     progress.value = 0;
 *     const start = performance.now();
 *     const duration = 10000;
 *     function step(now) {
 *       const elapsed = now - start;
 *       progress.value = Math.min((elapsed / duration) * 100, 100);
 *       if (elapsed < duration) {
 *         requestAnimationFrame(step);
 *       } else {
 *         running = false;
 *         showToast({ message: "Complete!", variant: "success", icon: "bread" });
 *       }
 *     }
 *     requestAnimationFrame(step);
 *   });
 *   resetBtn.addEventListener("clicked", () => {
 *     running = false;
 *     progress.value = 0;
 *   });
 * </script>
 * ```
 *
 * Indeterminate mode with different variants:
 *
 * ```html
 * <div style="display: grid; gap: var(--esp-size-small);">
 *   <esp-progress label="Primary loading" variant="primary"></esp-progress>
 *   <esp-progress label="Success loading" variant="success"></esp-progress>
 *   <esp-progress label="Warning loading" variant="warning"></esp-progress>
 *   <esp-progress label="Danger loading" variant="danger"></esp-progress>
 * </div>
 * ```
 *
 * Circle mode displays a ring that fills clockwise. Set
 * `mode="circle"` and optionally `show-value` to display
 * the percentage in the center:
 *
 * ```html
 * <div style="display: flex; gap: var(--esp-size-padding); align-items: center; flex-wrap: wrap;">
 *   <esp-progress mode="circle" value="80" label="Primary" variant="primary" show-value></esp-progress>
 *   <esp-progress mode="circle" value="60" label="Success" variant="success" show-value></esp-progress>
 *   <esp-progress mode="circle" value="40" label="Warning" variant="warning" show-value></esp-progress>
 *   <esp-progress mode="circle" value="20" label="Danger" variant="danger" show-value></esp-progress>
 * </div>
 * ```
 *
 * Circle size presets:
 *
 * ```html
 * <div style="display: flex; gap: var(--esp-size-padding); align-items: center;">
 *   <esp-progress mode="circle" value="60" label="Small" size="small"></esp-progress>
 *   <esp-progress mode="circle" value="60" label="Medium" size="medium" show-value></esp-progress>
 *   <esp-progress mode="circle" value="60" label="Large" size="large" show-value></esp-progress>
 * </div>
 * ```
 *
 * Indeterminate circle mode:
 *
 * ```html
 * <div style="display: flex; gap: var(--esp-size-padding); align-items: center;">
 *   <esp-progress mode="circle" label="Primary loading" variant="primary"></esp-progress>
 *   <esp-progress mode="circle" label="Success loading" variant="success"></esp-progress>
 * </div>
 * ```
 *
 * Click the button to watch the circle fill over ten seconds:
 *
 * ```html
 * <esp-box>
 *   <div style="display: flex; align-items: center; gap: var(--esp-size-padding);">
 *     <esp-progress id="demo-circle" mode="circle" value="0" label="Circle demo" variant="success" size="large" show-value></esp-progress>
 *     <div style="display: flex; gap: var(--esp-size-small);">
 *       <esp-button id="start-circle-btn" label="Start" variant="primary" collapsed></esp-button>
 *       <esp-button id="reset-circle-btn" label="Reset" variant="complementary" collapsed></esp-button>
 *     </div>
 *   </div>
 * </esp-box>
 * <script>
 *   const circleProgress = findById("demo-circle");
 *   const startCircleBtn = findById("start-circle-btn");
 *   const resetCircleBtn = findById("reset-circle-btn");
 *   let circleRunning = false;
 *   startCircleBtn.addEventListener("clicked", () => {
 *     if (circleRunning) return;
 *     circleRunning = true;
 *     circleProgress.value = 0;
 *     const start = performance.now();
 *     const duration = 10000;
 *     function step(now) {
 *       const elapsed = now - start;
 *       circleProgress.value = Math.min((elapsed / duration) * 100, 100);
 *       if (elapsed < duration) {
 *         requestAnimationFrame(step);
 *       } else {
 *         circleRunning = false;
 *         showToast({ message: "Complete!", variant: "success", icon: "bread" });
 *       }
 *     }
 *     requestAnimationFrame(step);
 *   });
 *   resetCircleBtn.addEventListener("clicked", () => {
 *     circleRunning = false;
 *     circleProgress.value = 0;
 *   });
 * </script>
 * ```
 *
 * @cssprop --esp-progress-border-color - Border color of the track
 * outline. Defaults to `var(--esp-color-border)`.
 * @cssprop --esp-progress-border-radius - Border radius of the
 * track and fill. Defaults to `var(--esp-size-border-radius)`.
 * @cssprop --esp-progress-circle-size - Diameter of the circular
 * progress ring in circle mode. Automatically set by the `size`
 * attribute.
 * @cssprop --esp-progress-fill-color - Color of the progress fill.
 * Defaults to the active action hue at the semantic muted lightness so the
 * filled and unfilled portions remain distinguishable in light and dark themes.
 * @cssprop --esp-progress-font-size - Font size for the value
 * text. Defaults to `var(--esp-type-small)`.
 * @cssprop --esp-progress-height - Height of the progress bar track.
 * Automatically set by the `size` attribute.
 * @cssprop --esp-progress-text-color - Color of the percentage
 * text in both bar and circle modes. Defaults to
 * `var(--esp-color-text)`.
 *
 * @docPageTitle Progress
 * @docUrl /components/progress
 * @menuGroup Feedback
 * @menuLabel Progress
 * @menuIcon progress
 */
export declare class EspalierProgress extends EspalierElementBase {
    /**
     * The current progress value. Set to `null` (or omit) for
     * indeterminate mode. Values are clamped to `0..max`.
     */
    value: number | null;
    /**
     * The maximum value. Defaults to `100`.
     */
    max: number;
    /**
     * An accessible label describing what the progress bar
     * represents. Required for screen readers.
     */
    label: string;
    /**
     * Show the percentage value as text. In bar mode the text
     * appears below the track; in circle mode it appears in the
     * center of the ring.
     */
    showValue: boolean;
    /**
     * Size preset for the progress indicator.
     *
     * In bar mode:
     * - `small` — 6px
     * - `medium` — 12px (default)
     * - `large` — 20px
     *
     * In circle mode:
     * - `small` — 48px diameter
     * - `medium` — 80px diameter (default)
     * - `large` — 120px diameter
     */
    size: "small" | "medium" | "large";
    /**
     * Display mode for the progress indicator.
     *
     * - `bar` — linear progress bar (default)
     * - `circle` — circular SVG ring
     */
    mode: "bar" | "circle";
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-progress": EspalierProgress;
    }
}
