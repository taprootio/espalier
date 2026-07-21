import type { ComplexAttributeConverter } from "lit";
/** A normalized point within an image, from its top-left corner. */
export interface FocusPoint {
    x: number;
    y: number;
}
export declare const CENTER_FOCUS: Readonly<FocusPoint>;
/** Return a safe copy of a normalized focus value, or center when invalid. */
export declare function normalizeFocus(value: unknown): FocusPoint;
/** Parse the public `"x y"` attribute grammar. */
export declare function parseFocus(value: string | null): FocusPoint;
/** Serialize a focus value for HTML without losing round-trip precision. */
export declare function serializeFocus(value: FocusPoint): string;
export declare const focusConverter: ComplexAttributeConverter<FocusPoint>;
/** Clamp an authoring value to the normalized focus range. */
export declare function clampFocus(value: FocusPoint): FocusPoint;
