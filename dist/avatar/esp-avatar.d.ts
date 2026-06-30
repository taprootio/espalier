import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierAvatarCrossOrigin, type EspalierAvatarLoading, type EspalierAvatarPresence, type EspalierAvatarReferrerPolicy, type EspalierAvatarSize } from "./avatar-values.js";
export type { EspalierAvatarCrossOrigin, EspalierAvatarLoading, EspalierAvatarPresence, EspalierAvatarReferrerPolicy, EspalierAvatarSize, } from "./avatar-values.js";
/**
 * User or persona avatar with image, initials fallback, and optional
 * presence indicator.
 *
 * ```html
 * <div style="display: flex; gap: var(--esp-size-small); align-items: center;">
 *   <esp-avatar
 *     src="https://i.pravatar.cc/160?img=12"
 *     name="Ada Lovelace"
 *     presence="online">
 *   </esp-avatar>
 *   <esp-avatar name="Grace Hopper" presence="away"></esp-avatar>
 *   <esp-avatar name="Katherine Johnson" presence="busy"></esp-avatar>
 * </div>
 * ```
 *
 * Size presets can be combined with a border-radius override when
 * an application needs rounded-square avatars instead of circles:
 *
 * ```html
 * <esp-avatar
 *   name="Taproot Admin"
 *   size="large"
 *   style="--esp-avatar-border-radius: var(--esp-size-border-radius);">
 * </esp-avatar>
 * ```
 *
 * @cssprop --esp-avatar-border-radius - Border radius of the image
 * and initials fallback. Defaults to `50%`.
 * @cssprop --esp-avatar-size - Width and height of the avatar.
 * Automatically set by the `size` attribute.
 *
 * @docPageTitle Avatar
 * @docUrl /components/avatar
 * @menuGroup Media
 * @menuLabel Avatar
 * @menuIcon user-circle
 */
export declare class EspalierAvatar extends EspalierElementBase {
    /**
     * Image URL for the avatar.
     */
    src: string;
    /**
     * Display name used for image alt text and initials fallback.
     */
    name: string;
    /**
     * Size preset for the avatar.
     */
    get size(): EspalierAvatarSize;
    set size(value: EspalierAvatarSize | string | null);
    /**
     * Optional presence state. When omitted, no presence indicator is
     * rendered.
     */
    get presence(): EspalierAvatarPresence | "";
    set presence(value: EspalierAvatarPresence | string | null);
    /**
     * Native image loading behavior. Defaults to `lazy` for list usage.
     */
    get loading(): EspalierAvatarLoading;
    set loading(value: EspalierAvatarLoading | string | null);
    /**
     * Optional `crossorigin` value forwarded to the internal image.
     */
    get crossOrigin(): EspalierAvatarCrossOrigin;
    set crossOrigin(value: EspalierAvatarCrossOrigin | string | null);
    /**
     * Referrer policy forwarded to the internal image. Defaults to
     * `no-referrer`.
     */
    get referrerPolicy(): EspalierAvatarReferrerPolicy;
    set referrerPolicy(value: EspalierAvatarReferrerPolicy | string | null);
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    /**
     * Clear a failed image state and attempt to render the current `src`
     * again. Useful when retrying the same URL after a temporary network
     * failure.
     */
    retryImage(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-avatar": EspalierAvatar;
    }
}
