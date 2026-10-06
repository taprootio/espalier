import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/** The HLS master-playlist media type, and the default `type`. */
export declare const HLS_MEDIA_TYPE = "application/vnd.apple.mpegurl";
/** The `aspect-ratio` used when the attribute is absent or invalid. */
export declare const DEFAULT_VIDEO_ASPECT_RATIO = "16 / 9";
export type VideoPreload = "none" | "metadata" | "auto";
export type VideoControls = "native" | "none";
export type VideoCrossOrigin = "" | "anonymous" | "use-credentials";
/**
 * How the playing source reached the video: `native` is playing `src`, and
 * `fallback` is playing `fallback-src`.
 */
export type VideoSourceMode = "native" | "fallback";
/**
 * Why playback failed: `unsupported` when no `src` is set, or the browser
 * cannot play `type`, and there is no fallback; `media` when the video element
 * reported an error while loading or playing.
 */
export type VideoErrorReason = "unsupported" | "media";
/**
 * Detail of `esp-video-ready` on `esp-video`.
 *
 * @docUrl /api/video-ready-detail
 * @menuGroup Event Details
 * @menuLabel VideoReadyDetail
 */
export interface VideoReadyDetail {
    /** The element's `src`. */
    src: string;
    /** How the source was attached. */
    mode: VideoSourceMode;
    /** The media duration in seconds; `Infinity` for a live stream. */
    duration: number;
}
/**
 * Detail of `esp-video-play` on `esp-video`.
 *
 * @docUrl /api/video-play-detail
 * @menuGroup Event Details
 * @menuLabel VideoPlayDetail
 */
export interface VideoPlayDetail {
    /** The element's `src`. */
    src: string;
    /** How the source was attached. */
    mode: VideoSourceMode;
    /** The playback position, in seconds, at which playback started. */
    currentTime: number;
    /** Whether `autoplay` started this playback rather than the visitor. */
    autoplay: boolean;
}
/**
 * Detail of `esp-video-error` on `esp-video`.
 *
 * @docUrl /api/video-error-detail
 * @menuGroup Event Details
 * @menuLabel VideoErrorDetail
 */
export interface VideoErrorDetail {
    /** The element's `src`. */
    src: string;
    /** The attachment that failed, or `null` when nothing was attached. */
    mode: VideoSourceMode | null;
    /** Why playback failed. */
    reason: VideoErrorReason;
    /** A short developer-facing description; not shown to visitors. */
    message: string;
    /** Whether the element is now trying `fallback-src`. */
    fallback: boolean;
}
/**
 * A native video player: a `<video>` element with a lazy poster, a fixed
 * aspect ratio, captions, native controls, and visible loading and error
 * states. It is never an iframe and never loads a third-party player.
 *
 * Nothing but the poster loads until the visitor presses play, so a page of
 * videos costs one image request each. The play affordance over the poster is
 * a real button named from `label` or `poster-alt`.
 *
 * ```html
 * <esp-video
 *   src="/assets/esp-video/espalier-sample.mp4"
 *   type="video/mp4"
 *   poster="/assets/esp-video/espalier-sample-poster.jpg"
 *   poster-alt="Espalier's palette drifting across a trellis grid"
 *   playsinline
 * ></esp-video>
 * ```
 *
 * ### Sources
 *
 * The element plays `src` only where the browser reports it can play `type`.
 * `type` is an HLS master playlist by default, which Safari, iOS, and current
 * Chrome play natively; elsewhere `fallback-src` (an MP4) plays instead.
 * Espalier attaches no streaming library, so for a source every browser can
 * play, set `type="video/mp4"`.
 *
 * ### Captions
 *
 * Give the element `<track>` children. A media element only reads its own
 * child tracks, so the element mirrors them into its video when it attaches
 * the source; `kind`, `srclang`, `label`, and `default` carry through. With
 * the default `preload="none"`, no caption file loads before the visitor
 * presses play.
 *
 * ```html
 * <esp-video
 *   src="/assets/esp-video/espalier-sample.mp4"
 *   type="video/mp4"
 *   poster="/assets/esp-video/espalier-sample-poster.jpg"
 *   poster-alt="The trellis sample, with English captions"
 *   aspect-ratio="21 / 9"
 * >
 *   <track kind="captions" src="/assets/esp-video/espalier-sample.en.vtt" srclang="en" label="English" default />
 * </esp-video>
 * ```
 *
 * ### Autoplay
 *
 * `autoplay` starts playback once the element is admitted (immediately, or
 * near the viewport with `defer-offscreen`). It always plays muted: while
 * `autoplay` is set the video stays muted whatever `muted` says, so a page
 * never starts sound unprompted. It does not start for a visitor who prefers
 * reduced motion, or where the browser blocks it; the poster and play button
 * remain.
 *
 * @slot - `<track>` elements for captions, subtitles, descriptions, and chapters.
 * @slot error - Replaces the error message shown over the poster.
 * @csspart frame - The element's full box.
 * @csspart video - The native `<video>` element.
 * @csspart poster - The layer over the video holding the poster, play button, and messages.
 * @csspart poster-image - The poster `<img>`.
 * @csspart play - The play `<button>`, which covers the poster.
 * @csspart play-icon - The visible play disc inside the button.
 * @csspart message - The error message.
 * @cssprop --esp-video-surface - Background behind the video and an absent poster. Defaults to a near-black derived from `--esp-color-text`.
 * @cssprop --esp-video-border-radius - Corner radius. Defaults to `var(--esp-size-border-radius)`.
 * @cssprop --esp-video-object-fit - How the video fills its box. Defaults to `contain`; the poster always covers.
 * @cssprop --esp-video-accent - `accent-color` for the native controls, where the browser honors it. Defaults to `var(--esp-color-primary)`.
 * @cssprop --esp-video-focus-outline - Focus-visible outline on the play button, the video, and the error message. Defaults to `3px solid var(--esp-color-link)`.
 * @cssprop --esp-video-play-size - Diameter of the play disc. Defaults to `var(--esp-size-huge)`.
 * @cssprop --esp-video-play-background - Fill of the play disc. Defaults to `var(--esp-color-background)` at 90% opacity.
 * @cssprop --esp-video-play-color - Play glyph and loading-indicator color. Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-video-message-background - Error message background. Defaults to `var(--esp-color-background)`.
 * @cssprop --esp-video-message-color - Error message text color. Defaults to `var(--esp-color-text)`.
 * @event {CustomEvent<VideoReadyDetail>} esp-video-ready - Bubbles across shadow boundaries once the attached source has loaded its metadata; `detail` is `{ src, mode, duration }`. Fires once per attached source.
 * @event {CustomEvent<VideoPlayDetail>} esp-video-play - Bubbles across shadow boundaries each time playback starts, or resumes after a pause, on the media's `playing`. Recovery from buffering or a seek is not reported, and a source that fails first reports no play; `detail` is `{ src, mode, currentTime, autoplay }`.
 * @event {CustomEvent<VideoErrorDetail>} esp-video-error - Bubbles across shadow boundaries when a source fails; `detail` is `{ src, mode, reason, message, fallback }`. When `fallback` is true the element is already trying `fallback-src`.
 * @docPageTitle Video
 * @docUrl /components/video
 * @menuGroup Media
 * @menuLabel Video
 * @menuIcon photo
 */
export declare class EspalierVideo extends EspalierElementBase {
    /** The media URL: an HLS master playlist by default, or a file matching `type`. */
    src: string;
    /**
     * The media type of `src`, checked with `canPlayType` to choose between
     * `src` and `fallback-src`. `video/mp4` plays as a plain file.
     */
    type: string;
    /** Poster image URL, shown until playback starts and behind error messages. */
    poster: string;
    /** Describes the poster; names the play button when `label` is unset. */
    posterAlt: string;
    /**
     * The play button's accessible name. Defaults to `Play video: <poster-alt>`,
     * or `Play video` with no poster text.
     */
    label: string;
    /**
     * The box's aspect ratio, as a positive number or `number / number`. Invalid
     * values fall back to `16 / 9`.
     */
    aspectRatio: string;
    /**
     * How much media to load before play intent. `none` (the default) loads
     * only the poster. `metadata` and `auto` apply where the browser plays
     * `type`; the choice of the fallback over it still waits for play intent.
     * A preloaded source that fails switches to `fallback-src` at once.
     */
    preload: VideoPreload;
    /** Start muted playback once admitted. Implies `muted`. */
    autoplay: boolean;
    /**
     * Start muted. Always on while `autoplay` is set. Clearing it (or
     * `autoplay`) unmutes only a paused video; a playing one stays muted until
     * the visitor unmutes it.
     */
    muted: boolean;
    /** Restart from the beginning when playback ends. */
    loop: boolean;
    /** Play inline on iOS rather than entering full screen. Needed for inline autoplay there. */
    playsinline: boolean;
    /**
     * `native` (the default) shows the browser's controls once playback starts.
     * `none` shows none; use it only for short decorative loops, since a visitor
     * then has no way to pause.
     */
    controls: VideoControls;
    /**
     * Defer everything — the poster, `preload`, and `autoplay` — until the
     * element is within 200px of the viewport. The poster is not rendered
     * before then, so the browser's own lazy-loading distance cannot fetch it
     * early.
     */
    deferOffscreen: boolean;
    /**
     * An MP4 played when the browser cannot play `type`, and tried once when
     * the primary source fails.
     */
    fallbackSrc: string;
    /**
     * CORS mode for the video's requests, as on `<video crossorigin>`. Needed
     * for caption tracks served from another origin.
     */
    crossOrigin: VideoCrossOrigin;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-video": EspalierVideo;
    }
}
