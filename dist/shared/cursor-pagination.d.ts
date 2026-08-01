/**
 * @module cursor-pagination
 *
 * Shared vocabulary and the stale-response guard for cursor-paginated
 * components (`esp-grid`, `esp-repeater`).
 *
 * **Why this is types plus one small class, and not a controller.** Both
 * components run the same four-step core — bump a version, fetch, discard the
 * response if a newer request started, replace-or-append — but everything
 * around it differs: the grid dispatches four lifecycle events, rethrows, and
 * resets the virtualizer's scroll; the repeater runs a page-scroll stabilizer
 * and swallows errors into a `loadError` string. A controller covering both
 * would need roughly five configuration hooks to absorb ~36 lines of shared
 * code — more interface than implementation, for two callers.
 *
 * So the parts that genuinely benefit from being shared are extracted: the
 * public type vocabulary, which was duplicated under two sets of names, and the
 * version guard, which is the correctness core and the piece most likely to be
 * subtly wrong when written twice.
 */
/**
 * The request for one page of cursor-paginated data.
 *
 * Components may extend this with their own query context — see `esp-grid`'s
 * `CursorFetchParams`, which adds search and sort.
 */
export interface CursorPageRequest {
    /** Cursor for the page to fetch. `null` means the first page. */
    cursor: string | null;
    /** How many items to request. */
    limit: number;
}
/** One page of cursor-paginated results. */
export interface CursorPageResult<T> {
    /** The items for this page. */
    items: T[];
    /** Cursor for the next page, or `null` when there are none. */
    nextCursor: string | null;
}
/**
 * Monotonic token issuer for discarding superseded async responses.
 *
 * A user typing in a search box, or scrolling fast enough to trigger several
 * page loads, produces overlapping requests that can resolve out of order.
 * Without a guard, a slow early response overwrites a fast later one and the
 * component shows stale data.
 *
 * ```ts
 * const token = this.pageLoads.begin();
 * const result = await fetchPage(params);
 * if (!this.pageLoads.isCurrent(token)) return;   // superseded — drop it
 * ```
 *
 * Every `await` boundary in the load path needs a re-check: being current
 * before the fetch says nothing about being current after it.
 */
export declare class RequestVersionGuard {
    /** Start a request and take its token. Supersedes every outstanding one. */
    begin(): number;
    /** Whether `token` is still the newest request. */
    isCurrent(token: number): boolean;
    /**
     * Supersede every outstanding request without starting a new one.
     *
     * Use when a component disconnects or its data source changes and in-flight
     * responses should be dropped rather than applied.
     */
    invalidate(): void;
}
/**
 * Apply a page of results to an accumulated list: the first page replaces,
 * subsequent pages append.
 *
 * Always returns a new array so Lit sees the change.
 */
export declare function accumulatePage<T>(current: readonly T[], page: readonly T[], cursor: string | null): T[];
