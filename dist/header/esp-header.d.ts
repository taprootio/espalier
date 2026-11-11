import { type PropertyValues } from "lit";
import "../burger/esp-burger.js";
import { type EspalierBurger } from "../burger/esp-burger.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
declare const HEADER_LAYOUT_VALUES: readonly ["standard", "centered-brand", "centered-menu", "extended", "extended-centered", "minimal"];
declare const HEADER_BRAND_ALIGN_VALUES: readonly ["start", "center", "end"];
declare const HEADER_BRAND_WRAP_VALUES: readonly ["truncate", "wrap", "nowrap"];
declare const HEADER_MENU_DISPLAY_VALUES: readonly ["auto", "inline", "drawer"];
declare const HEADER_THEME_TOGGLE_VALUES: readonly ["hidden", "visible"];
declare const HEADER_COMPACT_SIZE_VALUES: readonly ["compact", "standard"];
export type HeaderLayout = (typeof HEADER_LAYOUT_VALUES)[number];
export type HeaderBrandAlign = (typeof HEADER_BRAND_ALIGN_VALUES)[number];
export type HeaderBrandWrap = (typeof HEADER_BRAND_WRAP_VALUES)[number];
export type HeaderMenuDisplay = (typeof HEADER_MENU_DISPLAY_VALUES)[number];
export type HeaderThemeToggle = (typeof HEADER_THEME_TOGGLE_VALUES)[number];
export type HeaderCompactSize = (typeof HEADER_COMPACT_SIZE_VALUES)[number];
export interface EspThemeToggleEventDetail {
    scheme: "light" | "dark";
}
/**
 * Builds a site's top navigation bar. Use its four slots to add content:
 * `topbar`, `brand`, `menu`, and `buttons`.
 *
 * `height-multiplier="1.8"` enlarges the primary row and logo while preserving
 * control and extra-row sizes. In a fixed `esp-page`, `compact-size="standard"`
 * with `scroll-behavior="compact"` returns to the unscaled baseline. Sticky,
 * normal and standalone hosts retain expanded geometry with these options.
 * Expanded rows above 1.0 center navigation and use unframed icon controls,
 * without the horizontal current-item underline. Compaction restores standard
 * chrome. Navigation buttons keep theme-space margins and a smaller default
 * padding; explicit `--esp-button-padding` still wins. A full-screen drawer's
 * existing close control sits at the viewport's top/end corner.
 * Optional generic/light/dark compact logos fall back to the regular logo until
 * ready; the larger expanded/compact brand width is reserved in either state.
 * `data-esp-compact` reports resolved compaction for paint-only styling and
 * inspection. Hook-keyed layout or typography changes are unsupported. Override
 * the height/logo inputs instead. Compaction holds while header keyboard focus
 * or a header drawer/popover is open. The [`<esp-page>`](/components/page/)
 * readiness method waits for initial geometry. Scope light-DOM anchor clearance
 * to `--esp-page-header-expanded-size`, capped by the usable viewport height.
 *
 * A field fills one layer above the surface it sits on.
 * Use `surface-layer="1|2|3|4"` to select the default painted layer.
 *
 * The header works together with several companion components:
 * [`<esp-menu>`](/components/menu/) provides the navigation
 * container, [`<esp-menu-item>`](/components/menu/item/)
 * renders individual links, and
 * [`<esp-header-button>`](/components/header/button/) adds icon
 * buttons for global actions.
 *
 * ```html
 * <esp-header>
 *   <div slot="brand" style="background-color: red;" class="header-example">brand</div>
 *   <esp-menu slot="menu" mode="horizontal" style="background-color: green;">
 *     <esp-menu-item label="menu" url="#"></esp-menu-item>
 *   </esp-menu>
 *   <div slot="buttons" style="background-color: yellow;" class="header-example">buttons</div>
 * </esp-header>
 * ```
 *
 * @customElement esp-header
 * @slot topbar - Optional utility row displayed above the primary
 * header row. Combine with `scroll-behavior="collapse-topbar"` when
 * the row should collapse after scroll.
 * @slot brand - Place site brand here. Typically an anchor wrapping
 * a logo SVG or image. When omitted, `brand-logo`, `brand-text`, and
 * `brand-href` render a configured brand automatically. The brand
 * container supports vertical alignment via
 * `--esp-header-brand-placement`.
 *
 * ```html
 * <esp-header>
 *   <a href="#" slot="brand" class="nav-logo">
 *     <svg>
 *       <use href="/assets/icons.svg#taproot-logo" />
 *     </svg>
 *   </a>
 *   <esp-menu slot="menu" mode="horizontal" style="background-color: green;">
 *     <esp-menu-item label="menu" url="#"></esp-menu-item>
 *   </esp-menu>
 *   <div slot="buttons" style="background-color: yellow;" class="header-example">buttons</div>
 * </esp-header>
 * ```
 *
 * @slot brand-link - Optional plain `<a href>` copy of the configured brand
 * link (`brand-href`) for HTML-only readers such as crawlers, link previews and
 * readers without JavaScript. Give it the same `href` and the text the
 * configured brand renders: the logo's alt text (`brand-alt`, nothing when
 * there is `brand-text`, or "Site logo" when there is neither) followed by
 * `brand-text`. The brand links only when it has a logo or text and
 * `brand-href` is set. The copy carries no `target` or `rel`. Once the header upgrades, the copy is never
 * rendered, takes no focus and is hidden from assistive technology; the header
 * renders only from the `brand-*` attributes, so keep the copy equal to them.
 * Filling the `brand` slot still replaces the configured brand. Until the
 * header upgrades, the copy is an ordinary visible child. A page that shows
 * content before components load and wants no flash can hide it, at the cost of
 * those readers:
 * `:not(:defined) > [slot="link"], :not(:defined) > [slot="brand-link"] { display: none; }`.
 *
 * ```html
 * <esp-header brand-text="Taproot" brand-href="/">
 *   <a slot="brand-link" href="/">Taproot</a>
 *   <esp-menu slot="menu" mode="horizontal">
 *     <esp-menu-item label="Docs" url="/docs">
 *       <a slot="link" href="/docs">Docs</a>
 *     </esp-menu-item>
 *   </esp-menu>
 * </esp-header>
 * ```
 *
 * @slot menu - Place site navigation here. The `menu` slot
 * should be populated with an [`<esp-menu>`](/components/menu/)
 * containing [`<esp-menu-item>`](/components/menu/item/) children:
 *
 * ```html
 * <esp-header>
 *   <div slot="brand" style="background-color: red;" class="header-example">brand</div>
 *   <esp-menu slot="menu" mode="horizontal">
 *     <esp-menu-item label="Mammals" url="#"></esp-menu-item>
 *     <esp-menu-item label="Reptiles" url="#"></esp-menu-item>
 *     <esp-menu-item label="Amphibians" url="#"></esp-menu-item>
 *   </esp-menu>
 *   <div slot="buttons" style="background-color: yellow;" class="header-example">buttons</div>
 * </esp-header>
 * ```
 *
 * When there are too many `<esp-menu-item>`s on the screen, a
 * burger button automatically appears that slides the full menu
 * into view. Resize the screen to see the responsive behavior:
 *
 * ```html
 * <esp-header>
 *   <div slot="brand" style="background-color: red;" class="header-example">brand</div>
 *   <esp-menu slot="menu" mode="horizontal">
 *     <esp-menu-item label="Primates" url="#"></esp-menu-item>
 *     <esp-menu-item label="Carnivora" url="#"></esp-menu-item>
 *     <esp-menu-item label="Rodentia" url="#"></esp-menu-item>
 *     <esp-menu-item label="Chiroptera" url="#"></esp-menu-item>
 *     <esp-menu-item label="Cetacea" url="#"></esp-menu-item>
 *     <esp-menu-item label="Artiodactyla" url="#"></esp-menu-item>
 *     <esp-menu-item label="Perissodactyla" url="#"></esp-menu-item>
 *     <esp-menu-item label="Lagomorpha" url="#"></esp-menu-item>
 *     <esp-menu-item label="Sirenia" url="#"></esp-menu-item>
 *     <esp-menu-item label="Proboscidea" url="#"></esp-menu-item>
 *     <esp-menu-item label="Marsupialia" url="#"></esp-menu-item>
 *     <esp-menu-item label="Monotremata" url="#"></esp-menu-item>
 *   </esp-menu>
 *   <div slot="buttons" style="background-color: yellow;" class="header-example">buttons</div>
 * </esp-header>
 * ```
 *
 * To place a link beside the header controls, set `header-end` on a direct
 * linked `esp-menu-item` in the primary horizontal menu. Keep the full tree in
 * that menu: inline end links precede the action slot, while auto and forced
 * drawers combine every item in its original order. Nested items, groups and
 * items without a URL retain their ordinary presentation. Explicit Inline
 * keeps both navigation regions reachable and overrides the minimal layout.
 * Every owned primary horizontal menu stays on one nonwrapping row, including
 * menus without end links. Its viewport scrolls when constrained; standalone
 * menus retain their own overflow choices.
 *
 * Put shared navigation styling on the header or a common ancestor. Promoted
 * links inherit that context and forward menu/item inline public presentation
 * tokens and explicit typography. Source-only stylesheet selectors, local
 * context/intent zones and non-public variables are not forwarded. Unmarked
 * links keep their native source styling.
 *
 * ```html
 * <esp-header brand-text="Example" menu-display="auto">
 *   <esp-menu slot="menu" mode="horizontal">
 *     <esp-menu-item label="Join the waitlist" url="/waitlist"></esp-menu-item>
 *     <esp-menu-item header-end label="Sign in" url="/sign-in"></esp-menu-item>
 *   </esp-menu>
 * </esp-header>
 * ```
 *
 * Published-site headers can be configured without custom brand
 * markup. Pair `layout`, `menu-display`, `theme-toggle`, and
 * `scroll-behavior` with `esp-page header-position` when the shell
 * should stay fixed or sticky:
 *
 * ```html
 * <esp-page header-position="fixed">
 *   <esp-header
 *     slot="header"
 *     layout="centered-brand"
 *     light-brand-logo="/assets/logo-light.svg"
 *     dark-brand-logo="/assets/logo-dark.svg"
 *     brand-text="Espalier"
 *     brand-href="/"
 *     brand-alt="Espalier logo"
 *     light-brand-color="oklch(0.35 0.12 216)"
 *     dark-brand-color="oklch(0.9 0.08 216)"
 *     brand-align="center"
 *     menu-display="auto"
 *     theme-toggle="visible"
 *     scroll-behavior="compact elevate progress">
 *     <esp-menu slot="menu" mode="horizontal">
 *       <esp-menu-item label="Shop" url="/shop"></esp-menu-item>
 *       <esp-menu-item label="About" url="/about"></esp-menu-item>
 *     </esp-menu>
 *   </esp-header>
 * </esp-page>
 * ```
 *
 * @slot buttons - Place icon buttons for global actions here. The
 * `buttons` slot should contain
 * [`<esp-header-button>`](/components/header/button/) instances.
 * Each button can reference the configured SVG sprite with `icon`
 * and fires an `esp-clicked` event when activated:
 *
 * ```html
 * <esp-header>
 *   <div slot="brand" style="background-color: red;" class="header-example">brand</div>
 *   <esp-menu slot="menu" mode="horizontal" style="background-color: green;">
 *     <esp-menu-item label="menu" url="#"></esp-menu-item>
 *   </esp-menu>
 *   <esp-header-button slot="buttons" icon="cog" aria-label="Settings"></esp-header-button>
 *   <esp-header-button slot="buttons" icon="user-circle" aria-label="Profile"></esp-header-button>
 * </esp-header>
 * ```
 *
 * The built-in theme toggle emits `esp-header-theme-toggle` only for a visitor
 * activation, so a host can persist explicit choices without treating
 * automatic scheme resolution as intent:
 *
 * ```js
 * const root = document.querySelector("esp-root");
 * root.addEventListener("esp-header-theme-toggle", (event) => {
 *   localStorage.setItem("scheme", event.detail.scheme);
 * });
 * ```
 *
 * @event {CustomEvent<EspThemeToggleEventDetail>} esp-header-theme-toggle - Fired after the built-in theme toggle changes the nearest `esp-root`. Bubbles and crosses the shadow boundary.
 *
 * @attr data-esp-compact - Read-only resolved compaction hook for paint-only styling and inspection. Authored values do not control state; hook-keyed layout changes are unsupported.
 * @cssprop --esp-header-background - The background color of the header bar. Defaults to `var(--esp-color-layer-2)`.
 * @cssprop --esp-header-border-width - The border width of the header. Defaults to `0 0 1px 0`.
 * @cssprop --esp-header-border - The border style of the header. Defaults to `solid var(--esp-color-border)`.
 * @cssprop --esp-header-shadow - The box shadow of the header. Defaults to `0 0 2px var(--esp-color-shadow)`.
 * @cssprop --esp-header-height - The height of the header bar. Defaults to `calc(4.5 * var(--esp-size-small))`.
 * @cssprop --esp-header-color - The text/icon color inherited by header controls. Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-header-z-index - The z-index of the header host. Defaults to `20`.
 * @cssprop --esp-header-content-max-width - Surface-alignment contract set by `esp-page`: the maximum width the bar content is constrained to (the bar background stays full-bleed). Defaults to `100%` (no constraint). `esp-page` sets this to its resolved content cap.
 * @cssprop --esp-header-content-lead - Surface-alignment contract set by `esp-page`: the fraction of the leftover width placed before the content, aligning it (`0` = start, `0.5` = center, `1` = end). Defaults to `0`.
 * @cssprop --esp-header-compact-height - The height of compact scroll-reactive headers. Defaults to `max(44px, calc(3.5 * var(--esp-size-small)))`.
 * @cssprop --esp-header-extended-menu-height - The second-row menu height for extended layouts. Defaults to `calc(3.5 * var(--esp-size-small))`.
 * @cssprop --esp-header-extended-menu-border - The border between the primary row and second-row menu in extended layouts. Defaults to `1px solid var(--esp-color-border)`.
 * @cssprop --esp-header-topbar-height - The maximum height reserved for the optional topbar row. Defaults to `8rem`.
 * @cssprop --esp-header-brand-placement - The CSS `place-content` value for the brand container. Defaults to `center`.
 * @cssprop --esp-header-brand-inline-placement - The CSS `justify-content` value for the brand container. Defaults to `start`.
 * @cssprop --esp-header-brand-padding-inline - Inline padding for the brand container. Defaults to `var(--esp-size-small)`.
 * @cssprop --esp-header-brand-color - The configured brand text/logo color. Defaults to `var(--esp-color-headings)`.
 * @cssprop --esp-header-brand-font-family - The configured brand font family. Defaults through `--esp-font-brand` and `--esp-font-headings` to `--esp-font-body`.
 * @cssprop --esp-header-brand-font-size - The configured brand text size. Defaults to `var(--esp-type-medium)`.
 * @cssprop --esp-header-brand-font-weight - The configured brand font weight. Defaults to `var(--esp-font-weight-brand, var(--esp-font-weight-headings))`.
 * @cssprop --esp-header-brand-gap - Space between a configured logo and brand text. Defaults to `var(--esp-size-tiny-to-small)`.
 * @cssprop --esp-header-brand-logo-size - The configured logo block size. Defaults to `calc(0.72 * var(--esp-header-height, calc(4.5 * var(--esp-size-small))))`.
 * @cssprop --esp-header-brand-logo-max-width - The configured logo maximum inline size. Defaults to `12rem`.
 * @cssprop --esp-header-compact-brand-logo-aspect-ratio - Reserved ratio for a pending compact logo. Defaults to `var(--esp-header-brand-logo-aspect-ratio, 3 / 1)`.
 * @cssprop --esp-header-brand-logo-aspect-ratio - The ratio the configured logo's box is reserved at while the image is still loading or has failed, so alt text never decides the brand region's width. A logo that loads is always laid out at its own ratio, whatever this is set to. Defaults to `3 / 1`.
 * @cssprop --esp-header-brand-max-width - The maximum inline size of configured brand content. Defaults to `min(36ch, 45vw)`.
 * @cssprop --esp-header-brand-hover-color - The configured brand hover color. Defaults to `var(--esp-color-headings-hover)`.
 * @cssprop --esp-header-brand-hover-background - The configured brand hover background. Defaults to `transparent`.
 * @cssprop --esp-header-brand-hover-decoration - The configured brand hover text decoration. Defaults to `none`.
 * @cssprop --esp-header-brand-hover-transform - The configured brand hover transform. Defaults to `none`.
 * @cssprop --esp-header-transparent-background - Background used before scroll for transparent headers. Defaults to `transparent`.
 * @cssprop --esp-header-transparent-color - Brand/action color used before scroll for transparent headers. Defaults to `var(--esp-color-headings)`.
 * @cssprop --esp-header-scrolled-shadow - Box shadow used by elevated scroll headers. Defaults to `0 2px 8px var(--esp-color-shadow)`.
 * @cssprop --esp-header-progress-height - Height of the optional scroll progress bar. Defaults to `3px`.
 * @cssprop --esp-header-progress-background - Background color of the optional scroll progress bar. Defaults to `var(--esp-color-link)`.
 * @cssprop --esp-header-progress-track-background - Track background of the optional scroll progress bar. Defaults to `transparent`.
 * @cssprop --esp-header-button-closed-color - The color of the burger button when the menu is closed. Defaults to `var(--esp-color-headings)`.
 * @cssprop --esp-header-button-closed-hover-color - The hover color of the burger button when the menu is closed. Defaults to `var(--esp-color-headings-hover)`.
 * @cssprop --esp-header-button-open-color - The color of the burger button when the menu is open. Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-header-button-open-hover-color - The hover color of the burger button when the menu is open. Defaults to `var(--esp-color-headings-hover)`.
 * @cssprop --esp-header-button-stroke-width - The stroke width of the burger button lines. Defaults to `0.45rem`.
 * @docPageTitle Header
 * @docUrl /components/header
 * @menuGroup Navigation
 * @menuLabel Header
 * @menuIcon layout-navbar
 */
export declare class EspalierHeader extends EspalierElementBase {
    /**
     * Force the burger button to be visible regardless of the
     * menu width. Use this when the burger controls an external
     * element (e.g. a sidebar drawer) instead of the built-in
     * `<esp-menu>` overlay.
     */
    showBurger: boolean;
    /**
     * Header layout style.
     *
     * - `standard` places brand, menu, and actions on one row.
     * - `centered-brand` centers the brand between left navigation and actions.
     * - `centered-menu` keeps the brand at the start and actions at the end
     *   and centers the navigation on the bar between two equal columns.
     * - `extended` puts navigation on a second row on wide screens.
     * - `extended-centered` centers the brand and second-row navigation.
     * - `minimal` keeps only brand/actions inline and uses the drawer menu unless
     *   `menu-display="inline"` explicitly requests standard inline geometry.
     *
     * ```html
     * <div style="display: grid; gap: var(--esp-size-padding);">
     *   <esp-header
     *     brand-logo="/assets/favicon.svg"
     *     brand-text="Espalier"
     *     brand-href="#"
     *     brand-alt="Espalier logo"
     *     layout="standard"
     *     theme-toggle="visible">
     *     <esp-menu slot="menu" mode="horizontal">
     *       <esp-menu-item label="Components" url="#components"></esp-menu-item>
     *       <esp-menu-item label="Guides" url="#guides"></esp-menu-item>
     *     </esp-menu>
     *   </esp-header>
     *
     *   <div
     *     style="
     *       display: grid;
     *       gap: var(--esp-size-small);
     *     ">
     *     <esp-form-item label="Header layout">
     *       <esp-pick-one>
     *         <esp-picker-item text="Standard" value="standard" selected></esp-picker-item>
     *         <esp-picker-item text="Centered brand" value="centered-brand"></esp-picker-item>
     *         <esp-picker-item text="Centered menu" value="centered-menu"></esp-picker-item>
     *         <esp-picker-item text="Extended" value="extended"></esp-picker-item>
     *         <esp-picker-item text="Extended centered" value="extended-centered"></esp-picker-item>
     *         <esp-picker-item text="Minimal" value="minimal"></esp-picker-item>
     *       </esp-pick-one>
     *     </esp-form-item>
     *   </div>
     * </div>
     * <script>
     *   const header = findByTagName("esp-header")[0];
     *   const picker = findByTagName("esp-pick-one")[0];
     *
     *   function applyLayout(event) {
     *     header.layout = event.detail?.value || picker.value || "standard";
     *   }
     *
     *   picker.addEventListener("esp-value-changed", applyLayout);
     * </script>
     * ```
     *
     * @default "standard"
     */
    layout: HeaderLayout;
    /**
     * Configured brand text used when the `brand` slot is empty.
     */
    brandText: string;
    /**
     * Configured brand logo URL used when the `brand` slot is empty.
     */
    brandLogo: string;
    /**
     * Configured brand logo URL used in light scheme. A non-empty value
     * overrides `brand-logo`; an empty value falls back to it.
     */
    lightBrandLogo: string;
    /**
     * Configured brand logo URL used in dark scheme. A non-empty value
     * overrides `brand-logo`; an empty value falls back to it.
     */
    darkBrandLogo: string;
    /** Compact logo URL; unresolved or failed images retain the regular logo. */
    compactBrandLogo: string;
    /** Compact logo for light scheme; falls back to generic, then dark compact. */
    lightCompactBrandLogo: string;
    /** Compact logo for dark scheme; falls back to generic, then light compact. */
    darkCompactBrandLogo: string;
    /**
     * Scale the primary row from 1.0 to 5.0 in tenths. Controls and extra rows
     * retain their baseline sizes. Invalid values normalize to 1.0.
     * @default 1
     */
    heightMultiplier: number;
    /**
     * `standard` compacts to the unscaled baseline; `compact` retains the legacy
     * absolute compact-height token. New geometry compacts only in a fixed esp-page.
     * @default "compact"
     */
    compactSize: HeaderCompactSize;
    /**
     * Optional brand link used by configured logo/text branding.
     */
    brandHref: string;
    /**
     * Accessible text for a logo-only configured brand. When brand text
     * is also present, the logo is decorative unless this is set.
     */
    brandAlt: string;
    /**
     * Optional configured brand color. Prefer theme fields for
     * product-wide brand typography and this property for a local
     * header override.
     */
    brandColor: string;
    /**
     * Configured brand color used in light scheme. A non-empty value
     * overrides `brand-color`; an empty value falls back to it and then
     * `--esp-header-brand-color`.
     */
    lightBrandColor: string;
    /**
     * Configured brand color used in dark scheme. A non-empty value
     * overrides `brand-color`; an empty value falls back to it and then
     * `--esp-header-brand-color`.
     */
    darkBrandColor: string;
    /**
     * Horizontal placement of the brand content inside its grid area.
     * @default "start"
     */
    brandAlign: HeaderBrandAlign;
    /**
     * Long-brand behavior for configured brand text.
     * @default "truncate"
     */
    brandWrap: HeaderBrandWrap;
    /**
     * Navigation display intent. `auto` tries inline navigation before
     * using a drawer, `drawer` always uses the burger/drawer pattern,
     * and `inline` keeps the primary horizontal navigation on one scrolling row
     * without creating a burger. Explicit `inline` overrides the minimal layout.
     * @default "auto"
     */
    menuDisplay: HeaderMenuDisplay;
    /**
     * Whether the header renders its built-in light/dark toggle.
     * Consumers can still provide their own control in the `buttons`
     * slot when this is `hidden`.
     * @default "hidden"
     */
    themeToggle: HeaderThemeToggle;
    /**
     * Space-separated scroll behavior tokens. Supported tokens:
     * `compact`, `elevate`, `transparent`, `reveal`, `dock`,
     * `collapse-topbar`, and `progress`.
     */
    scrollBehavior: string;
    /**
     * Scroll distance in pixels before scroll-reactive behavior applies.
     */
    scrollThreshold: number;
    /**
     * Scroll distance in pixels before `scroll-behavior="dock"` applies.
     * This is commonly set to the hero height when a transparent header
     * should dock after the first section.
     */
    dockOffset: number;
    /**
     * Optional ID of an external drawer-capable menu controlled by the
     * header burger. When set, burger open/close events call
     * `openDrawer()` / `closeDrawer()` on that element instead of the
     * menu slotted into the header.
     */
    drawerTarget: string;
    /**
     * Opt out of surface alignment. When an `esp-header` is slotted into an
     * `esp-page`, it constrains its bar content to the page's content
     * surface by default (the bar background stays full-bleed). Set this to
     * let the content span the full width instead, as it did before the
     * page grew alignment modes. Standalone headers (outside `esp-page`) are
     * already full-bleed and unaffected.
     */
    fullBleedContent: boolean;
    /**
     * The burger element inside the header. External code can use
     * this to programmatically reset the burger's visual state
     * (e.g. when a drawer is closed via swipe).
     */
    get burger(): EspalierBurger | undefined;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected firstUpdated(props: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-header": EspalierHeader;
    }
}
export {};
