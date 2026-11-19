import { type PaintColor } from "./paint-color.js";
import type { PaintColorEnvironment, PaintDerivation, PaintDerivations, PaintEntriesByRole, PaintEntry, PaintKind, PaintNavigationFact, PaintRegistration, PaintSchemeFeatures, PaintTarget, PaintTargetsByRole } from "./paint-types.js";
export declare const PAINT_TOKEN_IDS: readonly string[];
export declare const BRAND_PAINT_ID = "brand-color";
export declare function paintTokenProperty(identifier: string): string | undefined;
export declare function isPaintName(value: unknown): value is string;
export declare function isPaintRole(value: unknown): value is string;
export declare function isPaintKind(value: unknown): value is PaintKind;
export declare function isPaintFlags(value: unknown): value is readonly string[];
export declare function isPaintNavigationFact(value: unknown): value is PaintNavigationFact;
export declare function validatePaintEntries(entriesByRole: unknown, derivations?: PaintDerivations): asserts entriesByRole is PaintEntriesByRole;
interface PaintCatalog {
    entriesByRole: PaintEntriesByRole;
    targets: PaintTargetsByRole;
    derivations: PaintDerivations;
}
/** Assemble component registrations without giving any role special treatment. */
export declare function createPaintCatalog(registrations: readonly PaintRegistration[]): PaintCatalog;
export declare const PAINT_CATALOG: Readonly<Record<string, readonly PaintEntry[]>>;
export declare const PAINT_TARGETS: Readonly<Record<string, readonly PaintTarget[]>>;
export declare const PAINT_DERIVATIONS: Readonly<Record<string, PaintDerivation>>;
/** Select rendered entries and resolve brand ink using the active scheme's configured override. */
export declare function enabledPaintEntries(role: string, features: PaintSchemeFeatures, entriesByRole?: PaintEntriesByRole, { brandColor }?: {
    brandColor?: string;
}): readonly PaintEntry[];
export declare function resolvePaintColor(identifier: string, environment: PaintColorEnvironment, derivations?: PaintDerivations): PaintColor | null;
export {};
