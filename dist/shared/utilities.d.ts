type SpaceAboveBelow = {
    spaceAbove: number;
    spaceBelow: number;
};
/**
 * Calculates the available space above and below an element relative to the viewport.
 *
 * @param element - The HTML element to measure
 * @returns An object containing spaceAbove and spaceBelow in pixels
 */
export declare function getSpaceAboveBelow(element: HTMLElement): SpaceAboveBelow;
/**
 * Scrolls an element into view within a scrollable container.
 * Handles scrolling up or down based on the direction flag.
 *
 * @param container - The scrollable container element
 * @param element - The element to scroll into view
 * @param up - If true, scroll upward; if false, scroll downward
 */
export declare function scrollElementIntoView(container: HTMLElement, element: HTMLElement, up: boolean): void;
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
 * Checks if an element or any of its ancestors have a fixed position within a Shadow DOM.
 * Recursively traverses the Shadow DOM tree to detect fixed positioning.
 *
 * @param element - The element to check
 * @returns True if the element or any ancestor is fixed-positioned within Shadow DOM, false otherwise
 */
export declare function isFixedInShadowDom(element: HTMLElement): boolean;
/**
 * Checks if an element has a fixed position or if any of its ancestors are fixed-positioned.
 * Traverses up the DOM tree to detect fixed positioning at any level.
 *
 * @param element - The element to check
 * @returns True if the element or any ancestor has position: fixed, false otherwise
 */
export declare function isFixedOrAncestorFixed(element: HTMLElement): boolean;
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
export {};
