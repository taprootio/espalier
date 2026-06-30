import { type PropertyValues } from "lit";
import "../burger/esp-burger.js";
import { type EspalierBurger } from "../burger/esp-burger.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
type HeaderLayout = "standard" | "centered-brand" | "extended" | "extended-centered" | "minimal";
type HeaderBrandAlign = "start" | "center" | "end";
type HeaderBrandWrap = "truncate" | "wrap" | "nowrap";
type HeaderMenuDisplay = "auto" | "inline" | "drawer";
type HeaderThemeToggle = "hidden" | "visible";
/**
 * Used to build the top navigation for a site. An empty header
 * displays a bar. It has three slots for populating header content:
 * `topbar`, `brand`, `menu`, and `buttons`.
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
 *     brand-logo="/assets/favicon.svg"
 *     brand-text="Espalier"
 *     brand-href="/"
 *     brand-alt="Espalier logo"
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
 * and fires a `clicked` event when activated:
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
 * @cssprop --esp-header-background - The background color of the header bar. Defaults to `var(--esp-color-layer-2)`.
 * @cssprop --esp-header-border-width - The border width of the header. Defaults to `0 0 1px 0`.
 * @cssprop --esp-header-border - The border style of the header. Defaults to `solid var(--esp-color-border)`.
 * @cssprop --esp-header-shadow - The box shadow of the header. Defaults to `0 0 2px var(--esp-color-shadow)`.
 * @cssprop --esp-header-height - The height of the header bar. Defaults to `calc(4.5 * var(--esp-size-small))`.
 * @cssprop --esp-header-color - The text/icon color inherited by header controls. Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-header-z-index - The z-index of the header host. Defaults to `20`.
 * @cssprop --esp-header-compact-height - The height of compact scroll-reactive headers. Defaults to `max(44px, calc(3.5 * var(--esp-size-small)))`.
 * @cssprop --esp-header-extended-menu-height - The second-row menu height for extended layouts. Defaults to `calc(3.5 * var(--esp-size-small))`.
 * @cssprop --esp-header-extended-menu-border - The border between the primary row and second-row menu in extended layouts. Defaults to `1px solid var(--esp-color-border)`.
 * @cssprop --esp-header-topbar-height - The maximum height reserved for the optional topbar row. Defaults to `8rem`.
 * @cssprop --esp-header-brand-placement - The CSS `place-content` value for the brand container. Defaults to `center`.
 * @cssprop --esp-header-brand-inline-placement - The CSS `justify-content` value for the brand container. Defaults to `start`.
 * @cssprop --esp-header-brand-padding-inline - Inline padding for the brand container. Defaults to `var(--esp-size-small)`.
 * @cssprop --esp-header-brand-color - The configured brand text/logo color. Defaults to `var(--esp-color-headings)`.
 * @cssprop --esp-header-brand-font-family - The configured brand font family. Defaults to `var(--esp-font-brand, var(--esp-font-headings))`.
 * @cssprop --esp-header-brand-font-size - The configured brand text size. Defaults to `var(--esp-type-medium)`.
 * @cssprop --esp-header-brand-font-weight - The configured brand font weight. Defaults to `var(--esp-font-weight-brand, var(--esp-font-weight-headings))`.
 * @cssprop --esp-header-brand-gap - Space between a configured logo and brand text. Defaults to `var(--esp-size-tiny-to-small)`.
 * @cssprop --esp-header-brand-logo-size - The configured logo block size. Defaults to `calc(0.72 * var(--esp-header-height, calc(4.5 * var(--esp-size-small))))`.
 * @cssprop --esp-header-brand-logo-max-width - The configured logo maximum inline size. Defaults to `12rem`.
 * @cssprop --esp-header-brand-max-width - The maximum inline size of configured brand content. Defaults to `min(36ch, 45vw)`.
 * @cssprop --esp-header-brand-hover-color - The configured brand hover color. Defaults to `var(--esp-color-headings-hover)`.
 * @cssprop --esp-header-brand-hover-background - The configured brand hover background. Defaults to `transparent`.
 * @cssprop --esp-header-brand-hover-decoration - The configured brand hover text decoration. Defaults to `none`.
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
     * - `extended` puts navigation on a second row on wide screens.
     * - `extended-centered` centers the brand and second-row navigation.
     * - `minimal` keeps only brand/actions inline and uses the drawer menu.
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
     *   picker.addEventListener("value-changed", applyLayout);
     * </script>
     * ```
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
     * Horizontal placement of the brand content inside its grid area.
     */
    brandAlign: HeaderBrandAlign;
    /**
     * Long-brand behavior for configured brand text.
     */
    brandWrap: HeaderBrandWrap;
    /**
     * Navigation display intent. `auto` tries inline navigation before
     * using a drawer, `drawer` always uses the burger/drawer pattern,
     * and `inline` leaves overflow handling to the slotted menu.
     */
    menuDisplay: HeaderMenuDisplay;
    /**
     * Whether the header renders its built-in light/dark toggle.
     * Consumers can still provide their own control in the `buttons`
     * slot when this is `hidden`.
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
     * The burger element inside the header. External code can use
     * this to programmatically reset the burger's visual state
     * (e.g. when a drawer is closed via swipe).
     */
    get burger(): EspalierBurger | undefined;
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
