import { type PaintColor } from "../shared/paint-color.js";
import type { PaintCandidate, PaintTarget } from "../shared/paint-types.js";
export interface ObservePaintOptions {
    role: string;
    extraTargets?: readonly PaintTarget[];
}
export interface PaintObservation {
    role: string;
    element: string;
    state: string;
    kind: PaintCandidate["kind"];
    source: PaintCandidate["source"];
    indicator?: PaintCandidate["indicator"];
    /** Local paint opacity independent of the color's alpha and any shadow blur. Defaults to 1. */
    paintOpacity?: number;
    foreground: string;
    background: string;
    foregroundColor: PaintColor;
    backgroundColor: PaintColor;
    ratio: number;
    required: 3 | 4.5;
    location: string;
}
/**
 * Read visible paint beneath an attached surface. Call after the browser has
 * reached the intended interaction and layout state. Missing or ambiguous
 * attributions and color identities are reported with their DOM locations.
 */
export declare function observePaint(root: Element | ShadowRoot, options: ObservePaintOptions): Promise<PaintObservation[]>;
