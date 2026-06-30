import type { PickerItem } from "./esp-picker-item.js";
/**
 * Async callback for fetching picker items from a remote source.
 *
 * Receives the current query string and an `AbortSignal` that
 * Espalier aborts if a newer query arrives before the request
 * completes.
 */
export type TypeaheadFetchItems = (query: string, signal: AbortSignal) => Promise<PickerItem[]>;
