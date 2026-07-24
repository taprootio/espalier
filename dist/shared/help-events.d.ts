/**
 * A request for one topic in a URL-addressable help document.
 *
 * @docUrl /api/help-request
 * @menuGroup Configuration
 * @menuLabel HelpRequest
 */
export type HelpRequest = {
    /** Absolute document URL without a fragment. */
    src: string;
    /** Stable heading id to show first. */
    anchor?: string | undefined;
    /** Explicit flyout title. */
    title?: string | undefined;
    /** Element whose bounds the contextual flyout should align with. */
    placementTarget?: HTMLElement | undefined;
    /** Originating control used for focus restoration. */
    trigger?: HTMLElement | undefined;
};
/**
 * Current help-topic state published by `esp-help-provider`.
 *
 * @docUrl /api/help-state
 * @menuGroup Event Details
 * @menuLabel HelpState
 */
export type HelpState = {
    src: string;
    anchor?: string | undefined;
    open: boolean;
};
/**
 * Request help through the shared provider. Relative `src` values are
 * resolved against the current document; a fragment becomes `anchor`
 * unless the explicit property wins. When no provider is connected,
 * the resolved topic opens in a new tab.
 *
 * ```ts
 * import { requestHelp } from "@taprootio/espalier";
 *
 * requestHelp({
 *   src: "/help/account.html",
 *   anchor: "display-name",
 *   title: "Account help",
 *   placementTarget: document.querySelector<HTMLElement>("#display-name") ?? undefined,
 *   trigger: document.querySelector("#account-help") ?? undefined,
 * });
 * ```
 *
 * @param config - Help document, topic, title, and optional placement/focus targets.
 * @docUrl /api/request-help
 * @menuGroup Functions
 * @menuLabel requestHelp
 */
export declare function requestHelp(config: HelpRequest): void;
