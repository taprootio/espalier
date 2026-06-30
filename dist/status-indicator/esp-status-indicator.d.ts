import "../popover/esp-popover.js";
import { EspalierIntentElementBase } from "../shared/esp-intent-element-base.js";
import { type EspalierIntentVariant } from "../shared/intent-values.js";
export type EspalierStatusIndicatorVariant = EspalierIntentVariant;
export type EspalierStatusIndicatorPlacement = "top" | "bottom" | "left" | "right";
export type EspalierStatusIndicatorChrome = "pill" | "outline" | "none";
/**
 * A compact, keyboard-accessible status icon that reveals explanatory
 * content in an `esp-popover` on hover, focus, or tap.
 *
 * ```html
 * <esp-status-indicator
 *   variant="warning"
 *   label="Image processing delayed"
 *   placement="right">
 *   The image is still queued. It will retry automatically.
 * </esp-status-indicator>
 *
 * <esp-status-indicator variant="success" label="Published">
 *   This page is live and visible to visitors.
 * </esp-status-indicator>
 * ```
 *
 * ### Chrome modes
 *
 * The `chrome` attribute controls the chip treatment around the icon.
 * `pill` (the default) renders the filled circular background, `outline`
 * keeps only the border, and `none` drops both — leaving just the
 * variant-colored icon and its popover affordance. `chrome="none"` is the
 * right choice when the indicator sits inside dense metadata rows where
 * a full pill would feel heavy.
 *
 * ```html
 * <esp-box style="display: flex; gap: var(--esp-size-normal); align-items: center;">
 *   <esp-status-indicator variant="success" label="Pill (default)">
 *     Pill chrome wraps the icon in a filled circle.
 *   </esp-status-indicator>
 *
 *   <esp-status-indicator chrome="outline" variant="success" label="Outline">
 *     Outline chrome keeps the border but drops the fill.
 *   </esp-status-indicator>
 *
 *   <esp-status-indicator chrome="none" variant="success" label="None">
 *     None drops the chrome entirely — just the variant-colored icon.
 *   </esp-status-indicator>
 * </esp-box>
 * ```
 *
 * ### Wide chip with a non-square SVG
 *
 * The built-in `icon` attribute pulls from the Espalier sprite, which is
 * authored for **square** glyphs at the chip's default size. When you
 * need a non-square mark — a file-type badge, a short token of text, a
 * pill of dimensions — slot your own SVG into the `icon` slot and size
 * the chip through the three CSS hooks: `--esp-status-indicator-width`,
 * `--esp-status-indicator-height`, and `--esp-status-indicator-border-radius`.
 *
 * The slotted SVG fills the chip, so give it a matching `viewBox` and
 * use `chrome="none"` if you don't want the chip's pill background
 * fighting your art.
 *
 * ```html
 * <style>
 *   .file-type-indicator {
 *     --esp-status-indicator-width: calc(var(--esp-size-big-to-large) * 2.5);
 *     --esp-status-indicator-height: var(--esp-size-big-to-large);
 *     --esp-status-indicator-border-radius: var(--esp-size-border-radius);
 *     color: var(--esp-color-link);
 *   }
 *
 *   .file-type-indicator svg text {
 *     fill: var(--esp-color-background);
 *     font-family: var(--esp-font-body);
 *     font-size: 14px;
 *     font-weight: 600;
 *     text-anchor: middle;
 *   }
 * </style>
 *
 * <esp-status-indicator
 *   class="file-type-indicator"
 *   chrome="none"
 *   label="Original file type">
 *   <svg slot="icon" viewBox="0 0 72 32" aria-hidden="true">
 *     <rect x="0" y="0" width="72" height="32" rx="6" ry="6" fill="currentColor"/>
 *     <text x="36" y="21">JPG</text>
 *   </svg>
 *   <strong>Original file type</strong>
 *   <p>Uploaded as a JPEG; responsive variants are generated on demand.</p>
 * </esp-status-indicator>
 * ```
 *
 * ### Rich popover content
 *
 * The default slot accepts any HTML, not just plain text. Small blocks
 * of structured content — a heading, a list of values, a definition
 * list — render inside the popover and are clamped by
 * `--esp-status-indicator-popover-max-width` (default `32ch`). Raise the
 * hook when the content needs more room.
 *
 * ```html
 * <style>
 *   .responsive-layers-indicator {
 *     --esp-status-indicator-popover-max-width: 24rem;
 *   }
 *
 *   .responsive-layers-indicator ul {
 *     margin: var(--esp-size-tiny) 0 0;
 *     padding-left: var(--esp-size-normal);
 *   }
 * </style>
 *
 * <esp-status-indicator
 *   class="responsive-layers-indicator"
 *   variant="success"
 *   icon="layers-intersect"
 *   label="Responsive layers ready">
 *   <strong>Responsive layers ready</strong>
 *   <ul>
 *     <li>320w &mdash; mobile</li>
 *     <li>640w &mdash; tablet</li>
 *     <li>1280w &mdash; desktop</li>
 *     <li>1920w &mdash; large desktop</li>
 *   </ul>
 * </esp-status-indicator>
 * ```
 *
 * @slot - Body of the popover that opens when the indicator is hovered,
 * focused, or tapped. Accepts plain text or arbitrary HTML — small
 * blocks of structured content (lists, key/value pairs) render inside
 * the popover at `--esp-status-indicator-popover-max-width`.
 * @slot icon - Optional custom status icon. When provided, it
 * overrides both the `icon` attribute and built-in variant icon.
 *
 * @cssprop [--esp-status-indicator-width=var(--esp-size-normal-to-medium)] -
 * Width of the indicator chip. Override on the host to render a
 * non-square indicator (for example, a file-type badge).
 * @cssprop [--esp-status-indicator-height=var(--esp-status-indicator-width)] -
 * Height of the indicator chip. Defaults to the width so the chip
 * stays square.
 * @cssprop [--esp-status-indicator-border-radius=999px] - Corner radius
 * of the indicator chip. Lower it (for example, to
 * `var(--esp-size-border-radius)`) for a rounded-rectangle chip.
 * @cssprop [--esp-status-indicator-popover-max-width=32ch] - Maximum
 * width of the popover body. Raise this when slotting structured
 * content such as a `<ul>` of values.
 *
 * @docPageTitle Status Indicator
 * @docUrl /components/status-indicator
 * @menuGroup Feedback
 * @menuLabel Status Indicator
 * @menuIcon info
 */
export declare class EspalierStatusIndicator extends EspalierIntentElementBase {
    /** Optional icon name from the Espalier SVG sprite. */
    icon: string;
    /**
     * Accessible label for the indicator button.
     */
    label: string;
    /**
     * Preferred popover placement.
     */
    get placement(): EspalierStatusIndicatorPlacement;
    set placement(value: EspalierStatusIndicatorPlacement | string | null);
    /**
     * Visual chrome around the status icon. `pill` renders the filled
     * circular treatment, `outline` keeps only the border, and `none`
     * renders the variant-colored icon alone.
     */
    get chrome(): EspalierStatusIndicatorChrome;
    set chrome(value: EspalierStatusIndicatorChrome | string | null);
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-status-indicator": EspalierStatusIndicator;
    }
}
