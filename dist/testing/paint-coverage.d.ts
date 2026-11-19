import type { PaintEntriesByRole, PaintEntry } from "../shared/paint-types.js";
import type { PaintObservation } from "./observe-paint.js";
type ExpectedPaint = PaintEntry & {
    role: string;
};
export interface PaintCoverageAudit {
    /** Visible pairs absent from the enabled catalog. */
    unlisted: PaintObservation[];
    /** Enabled catalog pairs for which there was no visible observation. */
    unobserved: ExpectedPaint[];
}
/** Compare driven states with enabled entries, keeping one witness per missing paint pair. */
export declare function auditPaintCoverage(observations: readonly PaintObservation[], expected: PaintEntriesByRole): PaintCoverageAudit;
export {};
