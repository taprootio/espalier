import { LitElement, type PropertyValues } from "lit";
import { type SchemeEvents, type SeedColorRoot } from "../shared/bus-events.js";
import { type EspalierTheme, type PartialTheme } from "../shared/theme.js";
import { type ImageTextureDefinition } from "../shared/image-texture-registry.js";
export { registerImageTexture, registeredImageTextures, BUILT_IN_IMAGE_TEXTURES, type ImageTextureDefinition, } from "../shared/image-texture-registry.js";
export type GoogleFontLoadingPolicy = "auto" | "none";
export type { SchemeEvents } from "../shared/bus-events.js";
/**
 * Root container for the Espalier design system.
 *
 * Provides the full design-token pipeline — colors, scales, and
 * fonts — to every descendant component.  All tokens are
 * JS-computed from a pair of Base64-encoded theme objects and
 * emitted as CSS custom properties on the host element.
 *
 * ### Theme API
 *
 * Supply a `light-theme` and/or `dark-theme` attribute containing
 * a **Base64-encoded JSON** partial theme.  Fields you omit fall
 * back to built-in defaults.  Switch between them with `scheme`.
 *
 * ```html
 * <esp-root
 *   light-theme="eyJzZWVkQ29sb3IiOiJva2xjaCgwLjcgMC4yIDE1NSkifQ=="
 *   scheme="light">
 *   <esp-box>
 *     <h2>Themed content</h2>
 *   </esp-box>
 * </esp-root>
 * ```
 *
 * ### Nested theme previews and scoped events
 *
 * A nested root creates a scoped theme for its descendants. It does not create
 * a separate event bus: every root publishes theme changes through the same
 * Espalier singleton. Subscribe through the root whose changes you own so a
 * nested preview cannot be mistaken for an application-level theme change.
 *
 * ```ts
 * const applicationRoot = document.querySelector<EspalierRoot>("#application-theme")!;
 *
 * const unsubscribe = applicationRoot.subscribeScoped("scheme-changed", ({ scheme }) => {
 *   localStorage.setItem("scheme", scheme);
 * });
 *
 * // Initial state is read directly; scoped events report later changes only.
 * renderScheme(applicationRoot.scheme);
 *
 * // Call when the owning integration is disposed.
 * unsubscribe();
 * ```
 *
 * This contract covers `scheme-changed`, `seed-color-changed`,
 * `theme-changed`, and `icon-sprite-url-changed`. Components derived from
 * `EspalierElementBase` use the same closest-root filter internally.
 *
 * The root also owns the application's banner-texture vocabulary:
 * `EspalierRoot.registerTexture(name, definition)` registers an
 * image-backed texture preset that any
 * [esp-image](/components/image) banner in the application selects with
 * `texture="<name>"`, and `EspalierRoot.registeredTextures()` enumerates
 * the presets for building texture pickers.
 *
 * @customElement esp-root
 * @slot - Place Espalier components and content here.
 * @cssprop --esp-color-series-1 - First categorical data-series color.
 * @cssprop --esp-color-series-2 - Second categorical data-series color.
 * @cssprop --esp-color-series-3 - Third categorical data-series color.
 * @cssprop --esp-color-series-4 - Fourth categorical data-series color.
 * @cssprop --esp-color-series-5 - Fifth categorical data-series color.
 * @cssprop --esp-color-series-6 - Sixth categorical data-series color.
 * @cssprop --esp-color-series-7 - Seventh categorical data-series color.
 * @cssprop --esp-color-series-8 - Eighth categorical data-series color.
 * @cssprop --esp-color-series-1-wash - First series washed toward the local background (75% identity in OKLab) for large fills; theme zones re-emit it against their own canvas.
 * @cssprop --esp-color-series-1-ink - First series pushed to the text contrast tier against the local background (best-contrast pole when a mid-lightness surface makes the tier unreachable).
 * @cssprop --esp-color-series-2-wash - Second series washed toward the local background (75% identity in OKLab) for large fills; theme zones re-emit it against their own canvas.
 * @cssprop --esp-color-series-2-ink - Second series pushed to the text contrast tier against the local background (best-contrast pole when a mid-lightness surface makes the tier unreachable).
 * @cssprop --esp-color-series-3-wash - Third series washed toward the local background (75% identity in OKLab) for large fills; theme zones re-emit it against their own canvas.
 * @cssprop --esp-color-series-3-ink - Third series pushed to the text contrast tier against the local background (best-contrast pole when a mid-lightness surface makes the tier unreachable).
 * @cssprop --esp-color-series-4-wash - Fourth series washed toward the local background (75% identity in OKLab) for large fills; theme zones re-emit it against their own canvas.
 * @cssprop --esp-color-series-4-ink - Fourth series pushed to the text contrast tier against the local background (best-contrast pole when a mid-lightness surface makes the tier unreachable).
 * @cssprop --esp-color-series-5-wash - Fifth series washed toward the local background (75% identity in OKLab) for large fills; theme zones re-emit it against their own canvas.
 * @cssprop --esp-color-series-5-ink - Fifth series pushed to the text contrast tier against the local background (best-contrast pole when a mid-lightness surface makes the tier unreachable).
 * @cssprop --esp-color-series-6-wash - Sixth series washed toward the local background (75% identity in OKLab) for large fills; theme zones re-emit it against their own canvas.
 * @cssprop --esp-color-series-6-ink - Sixth series pushed to the text contrast tier against the local background (best-contrast pole when a mid-lightness surface makes the tier unreachable).
 * @cssprop --esp-color-series-7-wash - Seventh series washed toward the local background (75% identity in OKLab) for large fills; theme zones re-emit it against their own canvas.
 * @cssprop --esp-color-series-7-ink - Seventh series pushed to the text contrast tier against the local background (best-contrast pole when a mid-lightness surface makes the tier unreachable).
 * @cssprop --esp-color-series-8-wash - Eighth series washed toward the local background (75% identity in OKLab) for large fills; theme zones re-emit it against their own canvas.
 * @cssprop --esp-color-series-8-ink - Eighth series pushed to the text contrast tier against the local background (best-contrast pole when a mid-lightness surface makes the tier unreachable).
 *
 * @docPageTitle Root
 * @docUrl /components/root
 * @menuGroup Structure
 * @menuOrder 1
 * @menuLabel Root
 * @menuIcon building
 *
 */
export declare class EspalierRoot extends LitElement implements SeedColorRoot {
    /**
     * Register (or replace) a named, image-backed banner-texture preset.
     * Any `esp-image` banner under a root selects it with `texture="<name>"`;
     * banners already pointing at the name re-render, so registration at
     * mount and markup order never race. Static delegate to
     * `registerImageTexture` so script-only contexts (docs demos, published
     * sites) can reach it from the root element without module imports.
     */
    static registerTexture(name: string, definition: ImageTextureDefinition): void;
    /** Snapshot of the registered texture presets, for building pickers. */
    static registeredTextures(): Map<string, Readonly<ImageTextureDefinition>>;
    /** Unique ID for correlating bus events across multiple roots. */
    correlationId: `${string}-${string}-${string}-${string}-${string}`;
    /**
     * Subscribe to a theme event published by this root only.
     *
     * All roots share Espalier's global bus. This method filters foreign and
     * nested-root payloads by `correlationId` and returns a cleanup function.
     * It reports changes after mount; read initial state from this root.
     *
     * @param event Root-scoped theme event to observe.
     * @param handler Callback invoked with that event's typed payload.
     */
    subscribeScoped<K extends keyof SchemeEvents>(event: K, handler: (payload: SchemeEvents[K]) => void): () => void;
    /**
     * Base64-encoded JSON partial theme for the **light** scheme.
     *
     * Only fields you wish to override need to be present — all
     * others inherit from the built-in light defaults.
     *
     * ```html
     * <esp-root
     *   light-theme="eyJzZWVkQ29sb3IiOiJva2xjaCgwLjcgMC4xNSAyODUpIn0="
     *   scheme="light">
     *   <esp-box><h2>Purple light theme</h2></esp-box>
     * </esp-root>
     * ```
     *
     * @type {string}
     */
    lightThemeAttr: string;
    /**
     * Base64-encoded JSON partial theme for the **dark** scheme.
     *
     * ```html
     * <esp-root
     *   dark-theme="eyJzZWVkQ29sb3IiOiJva2xjaCgwLjcgMC4xNSAyODUpIn0="
     *   scheme="dark">
     *   <esp-box><h2>Purple dark theme</h2></esp-box>
     * </esp-root>
     * ```
     *
     * @type {string}
     */
    darkThemeAttr: string;
    /**
     * Object form of the light theme (ESP0174). Assigning a partial theme
     * object encodes it into {@link lightThemeAttr} — the same pipeline
     * the `light-theme` attribute feeds, so both entry points stay one
     * source of truth. Reading decodes the currently mounted partial, or
     * `null` when none is set.
     *
     * Registered as a reactive property (not just an accessor pair) so a
     * value assigned BEFORE the element upgrades — the classic
     * pre-definition own-property shadow — is captured and re-applied
     * through this setter when the upgrade runs.
     *
     * ```js
     * document.querySelector("esp-root").lightTheme = { seedColor: "#78486A" };
     * ```
     */
    get lightTheme(): PartialTheme | null;
    set lightTheme(theme: PartialTheme | null);
    /**
     * Object form of the dark theme (ESP0174) — see {@link lightTheme}.
     */
    get darkTheme(): PartialTheme | null;
    set darkTheme(theme: PartialTheme | null);
    /**
     * Root path for locally-cached font CSS files used by
     * `<esp-font-picker>` to load font previews.
     *
     * The directory must contain the individual font CSS files
     * generated by `npm run build-fonts`.  These files must be
     * served at stable, predictable paths (no filename hashing)
     * because the picker constructs URLs by font family name.
     *
     * @type {string}
     */
    fontCSSRoot: string;
    /**
     * Full URL to the `font-definitions.json` catalog used by
     * `<esp-font-picker>`.
     *
     * When set, the picker fetches from this URL instead of
     * `{fontCSSRoot}font-definitions.json`.  This allows the JSON
     * to be served through a cache-busting asset pipeline while
     * the individual font CSS files remain at stable paths.
     *
     * @type {string}
     */
    fontDefinitionsUrl: string;
    /**
     * Controls whether Espalier may inject runtime Google Fonts CDN
     * stylesheet links for selected Google Fonts.
     *
     * `auto` preserves the default behavior: theme font families and
     * selected Google font-picker values may load full fonts from
     * `fonts.googleapis.com`.  `none` prevents those runtime Google
     * Fonts links, leaving local preview CSS and web-safe font stacks
     * available for locked-down, offline, or strict-CSP environments.
     *
     * @type {"auto" | "none"}
     * @default "auto"
     */
    googleFontLoading: GoogleFontLoadingPolicy;
    /**
     * Full URL to the SVG sprite used by component-owned `icon`
     * attributes.
     *
     * Components append the validated icon name as a fragment, so
     * this should point to the sprite file itself, without `#icon`.
     * Use this when your application serves the sprite from a
     * subpath, CDN, or cache-busted asset pipeline. Set it to an
     * empty string to disable generated sprite icon URLs for this root.
     *
     * ```html
     * <esp-root icon-sprite-url="/dist/icons.abc123.svg">
     *   <esp-button icon="save" label="Save"></esp-button>
     * </esp-root>
     * ```
     *
     * @type {string}
     */
    iconSpriteUrl: string;
    /**
     * Hold descendant paint until the first author theme resolves
     * (ESP0177) — opt in when the theme is assigned from script.
     *
     * A script-mounted theme lands after the elements upgrade, so without
     * this the page paints one frame on the default palette and then
     * repaints on the brand's. Declaring `theme-pending` keeps the
     * subtree invisible (it still takes its space, so nothing shifts)
     * until the theme applies.
     *
     * Server-rendered `light-theme` / `dark-theme` attributes close a
     * different window: the theme is present when the root upgrades, so
     * it settles on its first update and never renders the defaults. They
     * do not cover the frame before this module runs, when the host is
     * still an unknown element painting its light DOM unstyled — a
     * server-rendered page whose bundle may load after first paint wants
     * this attribute too, plus the page-level gate, and its hold releases
     * the moment it upgrades.
     *
     * The hold always ends: if no theme arrives within
     * {@link THEME_SETTLE_TIMEOUT_MS} the root reveals anyway and warns,
     * so a broken mount degrades to the default palette instead of a
     * blank page.
     */
    themePending: boolean;
    /**
     * `true` once the theme this root will render with is the theme it
     * has — an author theme resolved, or the pre-theme window closed with
     * none. Mirrored to the `data-theme-ready` attribute so page CSS can
     * gate on it. Pair it with the opt-in attribute —
     * `esp-root[theme-pending]:not([data-theme-ready]) { visibility: hidden }`
     * — which is the only frame-zero cover for the window before this
     * module runs, and which scopes the hold to roots that asked for it:
     * unscoped, the rule would also blank a page that never mounts a
     * theme, until its deadline closes the window.
     */
    get themeSettled(): boolean;
    /**
     * Resolves when {@link themeSettled} turns true — the honest moment
     * to judge whether a named context is genuinely missing rather than
     * merely not mounted yet.
     */
    whenThemeSettled(): Promise<void>;
    /**
     * Initial color scheme to apply when `scheme` is not set.
     *
     * Use `light` or `dark` for a fixed published-site default, or
     * `system` to follow the visitor's `prefers-color-scheme` before
     * they toggle the active `scheme`.
     *
     * @type {"light" | "dark" | "system"}
     * @default "light"
     */
    defaultScheme: "light" | "dark" | "system";
    /**
     * The active color scheme.
     *
     * Light scheme
     *
     * ```html
     * <esp-root scheme="light">
     *   <esp-box>
     *     <h2>Light Scheme</h2>
     *     <esp-button label="I am light"></esp-button>
     *   </esp-box>
     * </esp-root>
     * ```
     *
     * Dark scheme
     *
     * ```html
     * <esp-root scheme="dark">
     *   <esp-box>
     *     <h2>Dark Scheme</h2>
     *     <esp-button label="I am dark"></esp-button>
     *   </esp-box>
     * </esp-root>
     * ```
     *
     * @type {"dark" | "light"}
     * @default "light"
     */
    get scheme(): "dark" | "light" | "";
    set scheme(val: "light" | "dark" | "");
    /**
     * The effective seed color from the active theme.
     *
     * Read-only — supply a theme attribute with a different
     * `seedColor` value to change.
     */
    get seedColor(): string;
    /** Returns the resolved theme for the active scheme. */
    get activeTheme(): EspalierTheme;
    connectedCallback(): void;
    protected willUpdate(changed: PropertyValues): void;
    protected firstUpdated(): void;
    protected updated(changedProperties: PropertyValues): void;
    disconnectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    /**
     * Light-DOM styles injected into `document.head` so that
     * slotted content (headings, links, code blocks, lists, etc.)
     * inherits the design-system tokens defined on `:host`.
     * Selectors are scoped to `esp-root` descendants to avoid
     * leaking into content outside the root.
     */
    static lightDomStyles: string;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-root": EspalierRoot;
    }
}
