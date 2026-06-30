import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import "../popover/esp-popover.js";
/**
 * A lightweight tooltip wrapper around `esp-popover` that
 * provides ARIA tooltip semantics and sensible defaults for
 * hover/focus-triggered contextual help.
 *
 * The simplest usage provides a `text` property for plain-text
 * content. For rich HTML, nest a `<template>` element inside the
 * tooltip — its content will be cloned into the tooltip bubble.
 *
 * ```html
 * <p>
 *   Hover or focus the icon for more info:
 *   <esp-tooltip text="A unique identifier used for API requests.">
 *     <svg><use href="/assets/icons.svg#info-i" /></svg>
 *   </esp-tooltip>
 * </p>
 * ```
 *
 * Tooltips also work on inline text elements like abbreviations:
 *
 * ```html
 * <p>
 *   The
 *   <esp-tooltip text="The root element that provides theming context.">
 *     <abbr>esp-root</abbr>
 *   </esp-tooltip>
 *   component wraps your application.
 * </p>
 * ```
 *
 * For richer content, use a `<template>` child. Because
 * `<template>` is phrasing content, it works safely inside
 * `<p>` elements — block-level elements like `<div>` inside
 * the template won't break the surrounding DOM:
 *
 * ```html
 * <p>
 *   Learn about
 *   <esp-tooltip>
 *     <abbr>deployment</abbr>
 *     <template>
 *       <strong>Deployment</strong><br>
 *       Publishing your application to production.
 *     </template>
 *   </esp-tooltip>
 *   in the guides.
 * </p>
 * ```
 *
 * When wrapping an already-focusable control (a `<button>` or
 * `<esp-button>`), the tooltip automatically takes its wrapper span out of
 * the tab order so it does not add a second, redundant tab stop. The
 * control itself stays naturally focusable — only the wrapper span leaves
 * the tab order. Hover still reveals the tooltip, and the tooltip's
 * `aria-describedby` is mirrored onto the control so it is still announced
 * on focus. No extra attribute is needed:
 *
 * ```html
 * <esp-tooltip text="Bold">
 *   <esp-button icon-only icon="bold" aria-label="Bold"></esp-button>
 * </esp-tooltip>
 * ```
 *
 * Set `trigger-tabindex` explicitly only to override that auto-detection
 * (see the property docs below).
 *
 * Inside a roving-tabindex toolbar (for example `esp-button-group` in
 * toolbar mode), the toolbar manager owns each button's own `tabindex`
 * (one `0`, the rest `-1`, arrow keys move between them) and sets
 * `trigger-tabindex="-1"` on each direct `esp-tooltip` child for you, so the
 * tooltip wrapper does not reintroduce the extra tab stops the roving
 * manager is removing.
 *
 * @slot - The trigger element (icon, term, abbreviation, etc.).
 *
 * @cssprop --esp-tooltip-background - Background color of the
 * tooltip. Defaults to `var(--esp-color-layer-1)`.
 * @cssprop --esp-tooltip-color - Text color inside the tooltip.
 * Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-tooltip-border - Border of the tooltip.
 * Defaults to `1px solid var(--esp-color-border)`.
 * @cssprop --esp-tooltip-border-radius - Border radius of the
 * tooltip. Defaults to `var(--esp-size-border-radius)`.
 * @cssprop --esp-tooltip-padding - Padding inside the tooltip.
 * Defaults to `var(--esp-size-tiny) var(--esp-size-small)`.
 * @cssprop --esp-tooltip-font-size - Font size of tooltip text.
 * Defaults to `var(--esp-type-small)`.
 * @cssprop --esp-tooltip-max-width - Maximum width of the tooltip.
 * Defaults to `40ch`.
 * @cssprop --esp-tooltip-shadow - Box shadow for the tooltip.
 * Defaults to `2px 2px 4px var(--esp-color-shadow)`.
 * @cssprop --esp-tooltip-focus-outline - Outline used when the trigger
 * receives keyboard focus. Defaults to `2px solid var(--esp-color-link)`.
 *
 * @docPageTitle Tooltip
 * @docUrl /components/tooltip
 * @menuGroup Feedback
 * @menuLabel Tooltip
 * @menuIcon tooltip
 */
export declare class EspalierTooltip extends EspalierElementBase {
    /**
     * Plain-text content to display in the tooltip. For richer
     * HTML, use a `<template>` child element instead.
     */
    text: string;
    /**
     * Which side of the trigger the tooltip appears on.
     */
    attach: "left" | "right" | "above" | "below";
    /**
     * How the tooltip is aligned relative to the trigger.
     */
    align: "start" | "center" | "end";
    /**
     * Distance between the trigger and the tooltip.
     */
    offset: string;
    /**
     * Delay in milliseconds before showing the tooltip.
     */
    showDelay: number;
    /**
     * Delay in milliseconds before hiding the tooltip.
     */
    hideDelay: number;
    /**
     * Tabindex applied to the tooltip trigger span.
     *
     * Leave it unset to get the right default automatically: a tooltip
     * wrapping a focusable button (`<button>` or `<esp-button>`) takes its
     * wrapper span out of the tab order (`-1`) so it does not add a second,
     * redundant tab stop, while a tooltip wrapping non-interactive content
     * (an icon, an abbreviation, plain text) keeps the wrapper focusable
     * (`0`) so keyboard users can still reveal it on focus.
     *
     * Set it explicitly to override that auto-detection — for example
     * `trigger-tabindex="0"` to force a focusable wrapper, or
     * `trigger-tabindex="-1"` to opt a non-button trigger out. An explicit
     * value always wins; a non-numeric or `NaN` value falls back to `0`.
     *
     * When the wrapper leaves the tab order, keyboard focus lands on the
     * slotted control instead, so the tooltip's `aria-describedby` is
     * mirrored onto that control and assistive tech still announces the
     * description on focus.
     */
    get triggerTabindex(): number;
    set triggerTabindex(value: number | null);
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(changedProperties: PropertyValues): void;
    updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-tooltip": EspalierTooltip;
    }
}
