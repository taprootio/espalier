/**
 * @module viewport
 *
 * Shared viewport measurement for anchored surfaces (picker menus, popovers,
 * date-picker calendars).
 *
 * Before this module the expression
 * `window.innerHeight || document.documentElement.clientHeight` appeared in six
 * files, and the `spaceAbove` / `spaceBelow` pair was recomputed inline at three
 * call sites even though `getSpaceAboveBelow` already existed and had no
 * callers.
 *
 * **On `visualViewport`:** `esp-page` deliberately measures against
 * `window.visualViewport` so a pinch-zoomed or split-pane page allocates panes
 * against what is actually visible. The anchored surfaces here intentionally do
 * **not**: `visualViewport.height` shrinks when the software keyboard opens,
 * and the pickers' keyboard-avoidance logic (`KEYBOARD_THRESHOLD` in
 * `esp-picker-base`) is tuned against `innerHeight` staying stable. Unifying the
 * two is a real improvement but a behavioural change, so it is deliberately not
 * bundled into this refactor.
 */
export interface ViewportSize {
    width: number;
    height: number;
}
export interface SpaceAboveBelow {
    spaceAbove: number;
    spaceBelow: number;
}
/**
 * The layout viewport in CSS pixels.
 *
 * `innerHeight` / `innerWidth` are the primary source; the `documentElement`
 * client dimensions are the fallback for environments that report zero (notably
 * happy-dom in tests).
 */
export declare function viewportSize(): ViewportSize;
/**
 * Space above and below an already-measured rect.
 *
 * Prefer this over {@link getSpaceAboveBelow} in scroll- or resize-driven paths
 * where the caller already holds a rect — it avoids a second forced layout.
 *
 * @param rect - A rect in viewport coordinates
 * @param height - Viewport height; measured when omitted
 */
export declare function spaceAroundRect(rect: DOMRect, height?: number): SpaceAboveBelow;
/**
 * Space above and below an element, relative to the viewport.
 *
 * @param element - The element to measure
 */
export declare function getSpaceAboveBelow(element: HTMLElement): SpaceAboveBelow;
/**
 * Whether the user has asked the platform to reduce motion.
 *
 * Defaults to `false` where `matchMedia` is missing or returns nothing, so a
 * constrained runtime gets ordinary motion rather than a thrown error.
 */
export declare function prefersReducedMotion(): boolean;
/**
 * The scroll behavior to use for programmatic scrolling — `"auto"` when the
 * user prefers reduced motion, `"smooth"` otherwise.
 *
 * Every programmatic scroll in the library should go through this rather than
 * hard-coding `behavior: "smooth"`.
 */
export declare function scrollBehavior(): ScrollBehavior;
/**
 * Gap left between an anchored surface and the viewport edge after scrolling it
 * back into view, so the surface does not sit flush against the edge.
 */
export declare const ANCHORED_SURFACE_SCROLL_MARGIN = 8;
/**
 * Scroll the page so that an anchor (a trigger field) and its anchored surface
 * (a dropdown, menu, or calendar) are both visible.
 *
 * Called when the viewport shrinks out from under an open surface — most often
 * a software keyboard appearing on mobile. Does nothing when the pair already
 * fits.
 *
 * `onReposition` runs on the next frame so the caller can re-run its own
 * placement math against the new scroll offset.
 *
 * @param anchor - The trigger element
 * @param surface - The open surface anchored to it
 * @param onReposition - Re-placement callback, invoked only when a scroll happened
 */
export declare function scrollToContainAnchoredSurface(anchor: HTMLElement, surface: HTMLElement, onReposition: () => void): void;
