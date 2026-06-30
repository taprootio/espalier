import { EspalierElementBase } from "./esp-element-base.js";
import { type EspalierIntentVariant } from "./intent-values.js";
export declare abstract class EspalierIntentElementBase extends EspalierElementBase {
    protected intentVariantBacker: EspalierIntentVariant;
    /** Semantic visual treatment. One of `neutral`, `success`, `warning`, `danger`, `info`. */
    get variant(): EspalierIntentVariant;
    set variant(value: EspalierIntentVariant | string | null);
    protected getVariantColorSource(): "";
}
export declare const intentSurfaceTokens: import("lit").CSSResult;
