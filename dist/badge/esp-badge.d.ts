import { EspalierIntentElementBase } from "../shared/esp-intent-element-base.js";
import { type EspalierIntentVariant } from "../shared/intent-values.js";
export type EspalierBadgeVariant = EspalierIntentVariant;
export type EspalierBadgeSize = "small" | "medium";
/**
 * A compact status chip for counts, labels, and semantic state.
 *
 * Badges truncate long labels with an ellipsis when their container
 * constrains them. Leave enough inline space for critical status text
 * that must remain fully visible.
 *
 * ```html
 * <div style="display: flex; flex-wrap: wrap; gap: var(--esp-size-tiny);">
 *   <esp-badge>Draft</esp-badge>
 *   <esp-badge variant="success" icon="circle-dot">Published</esp-badge>
 *   <esp-badge variant="warning">Pending review</esp-badge>
 *   <esp-badge variant="danger" icon="circle-x">Banned</esp-badge>
 *   <esp-badge variant="info" size="medium" icon="info-i">12 updates</esp-badge>
 * </div>
 * ```
 *
 * @slot - Badge label text.
 * @slot icon - Optional custom icon. When provided, it overrides
 * the generated SVG from the `icon` attribute.
 *
 * @cssprop --esp-badge-border-radius - Border radius of the badge
 * shell. Defaults to `999px`.
 *
 * @docPageTitle Badge
 * @docUrl /components/badge
 * @menuGroup Data Display
 * @menuLabel Badge
 * @menuIcon tags
 */
export declare class EspalierBadge extends EspalierIntentElementBase {
    /**
     * Semantic visual treatment for the badge. Supported values are
     * `neutral`, `success`, `warning`, `danger`, and `info`.
     */
    /** Optional icon name from the Espalier SVG sprite. */
    icon: string;
    /**
     * Badge size.
     */
    get size(): EspalierBadgeSize;
    set size(value: EspalierBadgeSize | string | null);
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-badge": EspalierBadge;
    }
}
