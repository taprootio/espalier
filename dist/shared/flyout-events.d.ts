/**
 * The reason a flyout closed, carried on the `flyout-closed`
 * event detail.
 *
 * - `"escape"` — the user pressed the Escape key
 * - `"vellum"` — the user clicked the overlay-mode backdrop
 * - `"button"` — the user clicked the flyout's close button
 * - `"programmatic"` — `close()` was called from code (including
 *   the `"close-flyout"` bus event)
 *
 * @docUrl /api/flyout-close-reason
 * @menuGroup Event Details
 * @menuLabel FlyoutCloseReason
 */
export type FlyoutCloseReason = "escape" | "vellum" | "button" | "programmatic";
/**
 * Configuration for opening a flyout via {@link showFlyout}.
 *
 * @docUrl /api/flyout-config
 * @menuGroup Configuration
 * @menuLabel FlyoutConfig
 */
export type FlyoutConfig = {
    /**
     * Heading text shown in the flyout's header. Also becomes the
     * flyout's accessible name unless an `aria-label` was set by
     * the author. When omitted, the flyout keeps its current
     * heading.
     */
    heading?: string | undefined;
    /**
     * Content to show. A string is rendered as plain text; pass a
     * `Node` (element or fragment) for rich content. The flyout's
     * existing light-DOM children are **replaced** — a second
     * `showFlyout` swaps content in place, it never stacks. When
     * omitted, the flyout opens with whatever content it already
     * has (e.g. declaratively slotted markup).
     */
    content?: string | Node | undefined;
    /**
     * Triggering element whose block-start edge the in-grid flyout
     * should align with. The flyout stays in the page's normal scroll
     * flow, shifting upward only while needed to fit the visible
     * scrollport. Content taller than that scrollport scrolls inside the
     * panel. Overlay drawers ignore this geometry and remain
     * viewport-fixed. When omitted, the flyout starts at the top of the
     * page's content row.
     */
    anchor?: HTMLElement | undefined;
    /**
     * Element to return focus to when the flyout closes — pass the
     * triggering control. In the in-grid modes (where opening never
     * moves focus) it is focused only if focus is inside the panel at
     * close; in the overlay-drawer mode (a modal, which does move focus
     * in) it overrides the automatic restore-to-opener.
     */
    returnFocusTo?: HTMLElement | undefined;
};
/**
 * Open the page's flyout surface. Publishes a `"show-flyout"`
 * event on `EspBus` which is picked up by `<esp-flyout>`.
 *
 * ```ts
 * import { showFlyout } from "@taprootio/espalier";
 *
 * showFlyout({ heading: "Details", content: detailsFragment });
 * ```
 *
 * If no `<esp-flyout>` is connected, the event goes unserviced —
 * callers that need a fallback (e.g. opening a URL in a new tab)
 * should check for a connected flyout themselves.
 *
 * @param config - Flyout configuration.
 * @docUrl /api/show-flyout
 * @menuGroup Functions
 * @menuLabel showFlyout
 */
export declare function showFlyout(config?: FlyoutConfig): void;
/**
 * Close the page's flyout surface. Publishes a `"close-flyout"`
 * event on `EspBus`.
 *
 * @docUrl /api/close-flyout
 * @menuGroup Functions
 * @menuLabel closeFlyout
 */
export declare function closeFlyout(): void;
