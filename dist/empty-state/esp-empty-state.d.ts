import { EspalierElementBase } from "../shared/esp-element-base.js";
export type EspalierEmptyStateSize = "medium" | "large";
/**
 * A centered empty-state layout for list, grid, and page-level
 * zero-item states.
 *
 * ```html
 * <esp-empty-state icon="photo-up">
 *   <span slot="heading">No images yet</span>
 *   Upload the first image to start building this library.
 *   <esp-button slot="action" label="Upload Image" variant="primary"></esp-button>
 * </esp-empty-state>
 *
 * <esp-empty-state size="large" icon="users">
 *   <span slot="heading">No members yet</span>
 *   Invite teammates when you are ready to collaborate.
 * </esp-empty-state>
 * ```
 *
 * @slot heading - Primary empty-state message.
 * @slot - Supporting body text.
 * @slot icon - Optional custom icon. When provided, it overrides
 * the generated SVG from the `icon` attribute.
 * @slot action - Optional call-to-action button or link.
 *
 * @docPageTitle Empty State
 * @docUrl /components/empty-state
 * @menuGroup Feedback
 * @menuLabel Empty State
 * @menuIcon box
 */
export declare class EspalierEmptyState extends EspalierElementBase {
    /**
     * Optional icon name from the Espalier SVG sprite.
     */
    icon: string;
    /**
     * Empty-state scale.
     */
    get size(): EspalierEmptyStateSize;
    set size(value: EspalierEmptyStateSize | string | null);
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-empty-state": EspalierEmptyState;
    }
}
