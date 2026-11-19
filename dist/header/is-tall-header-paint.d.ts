/** Whether header controls use the unframed tall-chrome paint at this geometry endpoint. */
export declare function isTallHeaderPaint({ heightMultiplier, minHeightMultiplier, compactSize, complete, }: {
    heightMultiplier: number;
    minHeightMultiplier: number;
    compactSize: "compact" | "standard";
    complete: boolean;
}): boolean;
