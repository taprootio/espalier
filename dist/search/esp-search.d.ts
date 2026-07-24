import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A search result item provided by the consumer via `setResults()`.
 * The `excerpt` field may contain HTML with `<mark>` highlights.
 */
export interface SearchResult {
    /** URL to navigate to when this result is selected. */
    url: string;
    /** Page title. */
    title: string;
    /** Excerpt with `<mark>` highlights (HTML string). */
    excerpt: string;
}
/**
 * Modal search overlay with a Cmd+K / Ctrl+K interaction pattern.
 *
 * `<esp-search>` is a pure UI shell with no search-engine dependency.
 * Consumers wire it to any search backend (Pagefind, MiniSearch, API,
 * etc.) by listening for `search-requested` events and calling
 * `setResults()` with the matches.
 *
 * @fires search-requested - The user changed the query input. Fires on
 *   every keystroke (not debounced) so consumers can track the latest
 *   query and discard stale async results. Consumers that need debouncing
 *   should apply it themselves (e.g. Pagefind's `debouncedSearch()`).
 *   `detail: { query: string }`
 * @fires result-selected - The user chose a result.
 *   `detail: { url: string }`
 * @fires search-closed - The overlay was closed (Escape, backdrop click,
 *   or result selection). Consumers should use this to cancel in-flight
 *   searches or discard pending results.
 *   `detail: {}`
 *
 * @cssprop --esp-search-max-width - Maximum width of the search
 *   panel. Defaults to `40rem`.
 * @cssprop --esp-search-max-height - Maximum height of the results
 *   list. Defaults to `60vh`.
 * @cssprop --esp-search-backdrop - Backdrop color behind the panel.
 *   Defaults to `oklch(0.15 0 0 / 0.6)`.
 * @cssprop --esp-search-panel-background - Background color of the search panel.
 *   Defaults to `var(--esp-color-layer-1)`.
 * @cssprop --esp-search-panel-shadow - Box shadow of the search panel.
 * @cssprop --esp-search-border-color - Divider and loading-track color used
 *   by the search panel. Defaults to `var(--esp-color-border)`.
 * @cssprop --esp-search-text-color - Main text color used by the search UI.
 *   Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-search-muted-color - Muted text color for placeholders,
 *   excerpts, and empty states.
 * @cssprop --esp-search-title-color - Title color for result rows.
 *   Defaults to `var(--esp-color-headings)`.
 * @cssprop --esp-search-active-background - Background color of the active
 *   result row. Defaults to `var(--esp-color-layer-2)`.
 * @cssprop --esp-search-highlight-background - Background color applied to
 *   `<mark>` highlights inside excerpts.
 * @cssprop --esp-search-loading-indicator-color - Accent color of the loading
 *   spinner. Defaults to `var(--esp-color-primary)`.
 * @cssprop --esp-search-loading-indicator-track-color - Track color of the
 *   loading spinner. Defaults to `var(--esp-search-border-color)`.
 *
 * @docUrl /components/search
 * @docPageTitle Search
 * @menuLabel Search
 * @menuGroup Interaction
 * @menuOrder 5
 * @docSections examples,properties,events,cssprops
 *
 * @example Basic search (consumer wiring not shown)
 * ```html
 * <esp-search placeholder="Search docs..."></esp-search>
 * ```
 */
export declare class EspalierSearch extends EspalierElementBase {
    /** Placeholder text for the search input. */
    placeholder: string;
    /** Open the search overlay and focus the input. */
    show(): void;
    /** Close the search overlay and restore focus. */
    hide(): void;
    /** Update the displayed search results. */
    setResults(results: SearchResult[]): void;
    /** Show or hide the loading indicator. */
    setLoading(loading: boolean): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-search": EspalierSearch;
    }
}
