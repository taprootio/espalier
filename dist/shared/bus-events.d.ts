/**
 * @module bus-events
 *
 * Central registry for every event published on the singleton
 * {@link EspBus}.  All bus event maps live here so that consumers
 * can import a single, fully-typed accessor instead of scattering
 * generic parameters across the codebase.
 *
 * ```ts
 * import { getEspBus } from "@taprootio/espalier";
 *
 * // Use the global bus for application-global Espalier events:
 * const bus = getEspBus();
 * bus.publish("show-toast", { message: "Done!" });
 *
 * // Theme events are root-scoped. Subscribe through the owning root so
 * // nested preview roots cannot trigger an application-level handler:
 * const root = document.querySelector("esp-root")!;
 * const unsubscribe = root.subscribeScoped("scheme-changed", ({ scheme }) => { … });
 *
 * // Or extend with your own application events:
 * type MyAppEvents = EspBusEventMap & {
 *   "sse-notification": { type: string; payload: unknown };
 * };
 * const appBus = getEspBus<MyAppEvents>();
 * appBus.subscribe("sse-notification", (data) => { … });
 * ```
 */
import { EspBus } from "./esp-bus.js";
import type { ToastConfig } from "./toast-events.js";
import type { FlyoutConfig } from "./flyout-events.js";
/**
 * Contract for elements that provide a seed color to their subtree.
 * Implemented by `EspalierRoot` (the global provider) and
 * `EspalierElementBase` (per-component variant overrides).
 *
 * @docUrl /api/seed-color-root
 * @menuGroup Bus Events
 * @menuLabel SeedColorRoot
 */
export interface SeedColorRoot {
    readonly seedColor: string;
    readonly correlationId: string;
}
/**
 * Theme coordination events.
 *
 * Published by `<esp-root>` after initial mount and subscribed to by every
 * `EspalierElementBase` descendant so that scheme, seed, and full-theme changes
 * propagate to variant-aware children. All roots share one global bus, so
 * consumers should use `EspalierRoot.subscribeScoped()` instead of subscribing
 * to these events directly. Read initial values from the root; these events are
 * change-only and are not replayed for late subscribers.
 *
 * @docUrl /api/scheme-events
 * @menuGroup Bus Events
 * @menuLabel SchemeEvents
 */
export interface SchemeEvents {
    /** Fired when the effective seed color changes. */
    "seed-color-changed": {
        seedColor: string;
        correlationId: string;
    };
    /** Fired when the active scheme flips between light and dark. */
    "scheme-changed": {
        scheme: "light" | "dark";
        correlationId: string;
    };
    /**
     * Fired when either resolved theme object changes (e.g. a new
     * `light-theme` or `dark-theme` attribute is set).  Variant-aware
     * children re-apply their tokens in response.
     */
    "theme-changed": {
        correlationId: string;
    };
    /**
     * Fired when the configured component icon sprite URL changes.
     * Consumers that need the initial value should read it from the
     * nearest `<esp-root>`; this event is change-only and is not replayed
     * for late subscribers.
     */
    "icon-sprite-url-changed": {
        iconSpriteUrl: string;
        correlationId: string;
    };
}
/**
 * Toast notification events.
 *
 * Published by the `showToast()` helper and subscribed to by
 * `<esp-toaster>`.
 *
 * @docUrl /api/toast-events
 * @menuGroup Bus Events
 * @menuLabel ToastEvents
 */
export interface ToastEvents {
    "show-toast": ToastConfig;
}
/**
 * Flyout surface events.
 *
 * Published by the `showFlyout()` / `closeFlyout()` helpers and
 * subscribed to by `<esp-flyout>`. This is how components that
 * cannot know where the flyout lives (form items, help buttons,
 * dialog content) request the page's flyout surface.
 *
 * @docUrl /api/flyout-events
 * @menuGroup Bus Events
 * @menuLabel FlyoutEvents
 */
export interface FlyoutEvents {
    "show-flyout": FlyoutConfig;
    "close-flyout": Record<string, never>;
}
/**
 * Cross-popover coordination events.
 *
 * Every component that participates in cross-popover coordination
 * should use this type.
 *
 * - `source`        – the component instance that is about to open.
 *                     Subscribers using the **source-identity** strategy
 *                     ignore events whose source is themselves or a
 *                     descendant.
 * - `skipPopovers`  – an array of `esp-popover` instances that should
 *                     remain open. Subscribers using the **skip-list**
 *                     strategy ignore events that include themselves.
 *
 * @docUrl /api/popover-events
 * @menuGroup Bus Events
 * @menuLabel PopoverEvents
 */
export interface PopoverEvents {
    "close-popovers": {
        source?: object;
        skipPopovers?: HTMLElement[];
    };
}
/**
 * Screen size events.
 *
 * Published by `<esp-root>` via its ResizeObserver.
 *
 * @docUrl /api/size-events
 * @menuGroup Bus Events
 * @menuLabel SizeEvents
 */
export interface SizeEvents {
    /** Fired when the window is resized. */
    "window-resized": {
        emWidth: number;
        emHeight: number;
        pxWidth: number;
        pxHeight: number;
    };
}
/**
 * Page-level layout events.
 *
 * Published by `<esp-page>` when the fixed-menu state changes.
 *
 * @docUrl /api/page-event-map
 * @menuGroup Bus Events
 * @menuLabel PageEventMap
 */
export interface PageEventMap {
    "fixed-menus-changed": {
        fixed: boolean;
    };
}
/**
 * Every event published on the singleton EspBus.
 *
 * Pass this to `EspBus.getInstance<EspBusEventMap>()` or,
 * preferably, call {@link getEspBus} for a pre-typed reference.
 *
 * @docUrl /api/esp-bus-event-map
 * @menuGroup Bus Events
 * @menuLabel EspBusEventMap
 */
export type EspBusEventMap = SchemeEvents & ToastEvents & FlyoutEvents & PopoverEvents & SizeEvents & PageEventMap;
/**
 * Typed accessor for the singleton bus.
 *
 * Called without a type parameter it knows every built-in Espalier
 * event.  Consuming applications can extend the map with their own
 * events so that a single bus instance carries both sets of types:
 *
 * ```ts
 * // Internal Espalier usage — no type parameter needed:
 * const bus = getEspBus();
 * bus.publish("show-toast", { message: "Saved!" });
 *
 * // Application usage — extend with custom events:
 * type AppBusEvents = EspBusEventMap & {
 *   "sse-notification": { type: string; payload: unknown };
 *   "cart-updated":     { itemCount: number };
 * };
 *
 * const bus = getEspBus<AppBusEvents>();
 * bus.publish("sse-notification", { … });   // ✓ app event
 * bus.publish("show-toast", { … });          // ✓ Espalier event
 * ```
 *
 * @returns Pre-typed bus instance.
 * @docUrl /api/get-esp-bus
 * @menuGroup Functions
 * @menuLabel getEspBus
 */
export declare function getEspBus<T extends EspBusEventMap = EspBusEventMap>(): EspBus<T>;
