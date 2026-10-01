/**
 * Resolve a supported CSS aspect-ratio string, or null when it is invalid.
 * A removed attribute arrives as `null` and is invalid like an empty one.
 */
export declare function parseImageRatio(value: string | null | undefined): string | null;
