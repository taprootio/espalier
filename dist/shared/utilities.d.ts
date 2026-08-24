/**
 * `getSpaceAboveBelow` now lives in `./viewport.js` alongside the rest of the
 * viewport measurement helpers. It is re-exported here because
 * `@taprootio/espalier/shared/utilities` is a published entry point.
 */
export { getSpaceAboveBelow, type SpaceAboveBelow } from "./viewport.js";
/**
 * Traverses up the DOM tree from a given element to find the closest matching element.
 * Handles traversal across Shadow DOM boundaries to locate elements in parent scopes.
 *
 * @template TElement - The expected type of the returned element
 * @param fromElement - The element to start the search from
 * @param selector - The CSS selector to match against
 * @returns The closest matching element, or null if none found
 */
export declare function traverseToClosest<TElement extends HTMLElement>(fromElement: Element, selector: string): TElement | null;
/**
 * Compares two arrays to check if they contain the same values for a specific key.
 * Arrays are compared by extracting values for the given key, sorting them, and checking equality.
 * Order of elements in the original arrays does not matter.
 *
 * @param arr1 - The first array to compare
 * @param arr2 - The second array to compare
 * @param key - The object key to extract and compare values
 * @returns True if both arrays have the same length and matching values for the key, false otherwise
 */
export declare const arrayKeysMatch: (arr1: Array<Record<string, unknown>>, arr2: Array<Record<string, unknown>>, key: string) => boolean;
