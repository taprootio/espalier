import type { EspalierIntentVariant } from "./intent-values.js";
/**
 * Configuration for a toast notification.
 *
 * @docUrl /api/toast-config
 * @menuGroup Configuration
 * @menuLabel ToastConfig
 */
export type ToastConfig = {
    /**
     * The duration, in seconds, to show the toast. 0 if it should
     * show until the user dismisses it. Defaults to 5 seconds.
     */
    duration?: number | undefined;
    /**
     * The message to show in the toast.
     */
    message: string;
    /**
     * Icon name from the configured Espalier SVG sprite.
     *
     * Prefer this for icons from the shared sprite; `<esp-toaster>`
     * resolves it through the nearest `<esp-root icon-sprite-url>`.
     */
    icon?: string | undefined;
    /**
     * Full SVG href to use as the icon, for example:
     * "/assets/icons.svg#info-i"
     *
     * This remains available for custom sprites or fully controlled
     * hrefs. When both `icon` and `svgPath` are provided, `svgPath`
     * takes precedence.
     */
    svgPath?: string | undefined;
    /**
     * The intent of the toast — `neutral`, `success`, `warning`, `danger`,
     * or `info` (the default treatment when omitted).
     */
    intent?: EspalierIntentVariant;
    /**
     * Callback fired when the toast is closed.
     */
    onClosed?: (() => void) | undefined;
};
/**
 * Show a toast notification. Publishes a `"show-toast"` event on
 * `EspBus` which is picked up by `<esp-toaster>`.
 *
 * ```ts
 * import { showToast } from "@taprootio/espalier";
 *
 * showToast({ message: "Saved!", intent: "success" });
 * showToast({ message: "Error!", intent: "danger", duration: 0 });
 * ```
 *
 * @param config - Toast configuration.
 * @docUrl /api/show-toast
 * @menuGroup Functions
 * @menuLabel showToast
 */
export declare function showToast(config: ToastConfig): void;
