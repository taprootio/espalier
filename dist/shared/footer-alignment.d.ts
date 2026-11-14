/** Logical placement within a footer region. */
export type FooterPlacement = "start" | "center" | "end";
/** Footer text intent; auto follows the current logical inline placement. */
export type FooterTextAlign = FooterPlacement | "auto" | "justify";
/** Layout selected by the footer's current content-box container profile. */
export type FooterLayout = "wide" | "wrapped" | "stacked";
/** Detail emitted when a footer observes a different layout. */
export interface FooterLayoutChangedDetail {
    layout: FooterLayout;
}
