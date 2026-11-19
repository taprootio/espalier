import type { SemanticColorName } from "./theme.js";
/**
 * Which semantic tokens are ink, what surface each sits on, and the
 * APCA contrast each must clear.
 *
 * This pairing lived as an identical hardcoded table inside both
 * `compute-theme-properties.ts` and `esp-element-base.ts` — invisible to
 * themes and duplicated in exactly the way this repository's adoption
 * rules exist to prevent. It belongs to the model: every serious system
 * makes the surface/ink pair the unit designers see (Material's
 * `on-primary`, shadcn's `-foreground`), and the roles layer derives an
 * action's ink from it rather than asking a designer to hand-pick a
 * legible color.
 *
 * Lc targets follow the APCA guidelines (ADR-002):
 *   90 → body text at any size
 *   75 → 16 px+ text (UI labels, links, body)
 *   60 → 24 px+ bold / 28 px+ normal (headings, carets, decorative)
 */
type TokenPairing = Readonly<{
    bg: SemanticColorName;
    targetLc: number;
}>;
export declare const TOKEN_PAIRINGS: Readonly<Record<"actionText" | "linkHover", TokenPairing> & Partial<Record<SemanticColorName, TokenPairing>>>;
export {};
