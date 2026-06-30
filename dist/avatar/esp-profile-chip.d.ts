import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierAvatarPresence, type EspalierAvatarSize } from "./avatar-values.js";
import "./esp-avatar.js";
/**
 * Inline profile summary that composes `esp-avatar` with a display
 * name and optional secondary text.
 *
 * ```html
 * <div style="display: flex; flex-wrap: wrap; gap: var(--esp-size-padding);">
 *   <esp-profile-chip
 *     src="https://i.pravatar.cc/160?img=32"
 *     name="Ada Lovelace"
 *     secondary="Platform engineer"
 *     presence="online">
 *   </esp-profile-chip>
 *   <esp-profile-chip
 *     name="Grace Hopper"
 *     secondary="@grace"
 *     presence="away">
 *   </esp-profile-chip>
 * </div>
 * ```
 *
 * `esp-profile-chip` renders inline so it can sit inside buttons,
 * menus, and navigation rows without adding its own interactive
 * behavior.
 * The composed avatar inherits `--esp-avatar-border-radius`, so set
 * that property on `esp-profile-chip` to use the same avatar shape hook
 * as a standalone `esp-avatar`.
 *
 * @docPageTitle Profile Chip
 * @docUrl /components/profile-chip
 * @menuGroup Media
 * @menuLabel Profile Chip
 * @menuIcon user-circle
 * @cssprop --esp-avatar-border-radius - Border radius of the image
 * and initials fallback. Defaults to `50%`.
 */
export declare class EspalierProfileChip extends EspalierElementBase {
    /**
     * Image URL passed to the internal avatar.
     */
    src: string;
    /**
     * Display name shown beside the avatar and passed to the avatar for
     * accessibility and initials fallback.
     */
    name: string;
    /**
     * Size preset passed to the internal avatar.
     */
    get size(): EspalierAvatarSize;
    set size(value: EspalierAvatarSize | string | null);
    /**
     * Optional secondary line such as a role, handle, or email.
     */
    secondary: string;
    /**
     * Optional presence state passed to the internal avatar.
     */
    get presence(): EspalierAvatarPresence | "";
    set presence(value: EspalierAvatarPresence | string | null);
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-profile-chip": EspalierProfileChip;
    }
}
