import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * Headless provider for URL-addressable help documents. Place one provider
 * inside the same `<esp-root>` as the page's shared `<esp-flyout>`. It
 * services `requestHelp()` calls, fetches and normalizes the document, and
 * swaps an internal help view into the generic flyout surface.
 *
 * Successful documents are cached by absolute source URL. A newer request
 * aborts an older in-flight fetch, so help always reflects the most recent
 * trigger. If no flyout services the provider's presentation request, the
 * original URL opens in a new tab. Fetch failures stay in the flyout and
 * offer an explicit "Open help document" action.
 *
 * ```html
 * <esp-root>
 *   <esp-help-provider></esp-help-provider>
 *   <esp-page help-src="/help/account.html">
 *     <esp-flyout slot="flyout"></esp-flyout>
 *     <!-- page content -->
 *   </esp-page>
 * </esp-root>
 * ```
 *
 * @docPageTitle Help Provider
 * @docUrl /components/help/provider
 * @menuGroup Feedback
 * @menuLabel Help Provider
 * @menuIcon info
 */
export declare class EspalierHelpProvider extends EspalierElementBase {
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): symbol;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-help-provider": EspalierHelpProvider;
    }
}
