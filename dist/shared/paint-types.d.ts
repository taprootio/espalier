import type { PaintColor } from "./paint-color.js";
export type PaintScheme = "light" | "dark";
export type PaintKind = "text" | "graphic" | "ring";
export interface PaintNavigationFact {
    depth: "top-level" | "nested";
    kind: "button" | "plain" | "group";
    anchor: boolean;
    canBeCurrent: boolean;
    icon?: boolean;
}
export interface PaintSchemeFeatures {
    flags: readonly string[];
    navigation: readonly PaintNavigationFact[];
}
export interface PaintEntry {
    element: string;
    foreground: string;
    background: string;
    state: string;
    kind: PaintKind;
    flags: readonly string[];
    navigation?: Partial<PaintNavigationFact>;
    indicator?: "blurred-shadow";
    /** Paint coverage applied outside the declared color, such as SVG stroke-opacity. Defaults to 1. */
    paintOpacity?: number;
}
export interface PaintFitSurface {
    role: string;
    /** A null or omitted context selects the root theme. */
    context?: string | null;
    brandColors?: {
        light?: string;
        dark?: string;
        generic?: string;
    };
    features: Record<PaintScheme, PaintSchemeFeatures>;
}
export interface PaintFitPair {
    element: string;
    foreground: string;
    background: string;
    state: string;
    kind: PaintKind;
    ratio: number;
    required: 3 | 4.5;
}
export interface PaintFitSurfaceReport {
    role: string;
    context: string | null;
    pairs: PaintFitPair[];
}
export type PaintFitReport = Record<PaintScheme, PaintFitSurfaceReport[]>;
export interface PaintColorEnvironment {
    scheme: PaintScheme;
    context: string | null;
    readColor(identifier: string): string | undefined;
    readProperty(property: string): string | undefined;
}
export type PaintDerivation = (environment: PaintColorEnvironment) => PaintColor | null;
export type PaintInteraction = "rest" | "hover" | "focus" | "hover-focus";
export interface PaintCandidate {
    element: Element;
    kind: PaintKind;
    source: "text" | "fill" | "stroke" | "shape" | "outline" | "shadow";
    text?: Text;
    indicator?: "blurred-shadow";
}
export interface PaintAttribution {
    element: string;
    owner: Element;
    state?: (interaction: PaintInteraction) => string;
    brandColor?: string;
    foregroundDerivations?: readonly string[];
    backgroundDerivations?: readonly string[];
    /** Semantic identifiers that are equivalent to a named foreground derivation here. */
    foregroundAliases?: readonly string[];
    /** Semantic identifiers that are equivalent to a named background derivation here. */
    backgroundAliases?: readonly string[];
}
export type PaintTarget = (candidate: PaintCandidate) => PaintAttribution | undefined;
export type PaintEntriesByRole = Readonly<Record<string, readonly PaintEntry[]>>;
export type PaintTargetsByRole = Readonly<Record<string, readonly PaintTarget[]>>;
export type PaintDerivations = Readonly<Record<string, PaintDerivation>>;
export interface PaintRegistration {
    entriesByRole: PaintEntriesByRole;
    targets: PaintTargetsByRole;
    derivations?: PaintDerivations;
}
