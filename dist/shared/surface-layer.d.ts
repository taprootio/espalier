import { type CSSResult } from "lit";
export type SurfaceLayer = 1 | 2 | 3 | 4;
/**
 * Support `surface-layer="1|2|3|4"` on consumer surfaces in a shadow root.
 * Include `surfaceLayerAttributes(":host")` for the consumer component's host,
 * or `surfaceLayerAttributes("[surface-layer]")` for elements inside its shadow
 * tree. Espalier installs these rules for its own hosts and root light DOM.
 * The attribute declares depth; consumer components still paint their surface.
 * A component that always paints a known layer can pass that depth as its
 * default, so callers do not need to declare it on each instance.
 */
export declare function surfaceLayerAttributes(selector: string, defaultLayer?: SurfaceLayer): CSSResult;
