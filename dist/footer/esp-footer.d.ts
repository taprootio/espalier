import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import "./esp-footer-column.js";
import "./esp-footer-link-group.js";
export type FooterColumns = "auto" | "1" | "2" | "3" | "4" | "5" | "6";
/**
 * A responsive site footer with structured spaces for branding, feature
 * artwork, link groups, supporting actions, and legal or utility content.
 * Its background remains full-bleed while its content automatically aligns
 * to the surface of a containing [`<esp-page>`](/components/page/).
 *
 * Use bare [`<esp-footer-link-group>`](/components/footer/link-group/) children
 * when navigation groups should auto-flow independently through the grid.
 * `columns` is a maximum: the grid always drops columns when they no longer fit.
 *
 * ```html
 * <esp-footer
 *   light-brand-logo="/assets/logo-light.svg"
 *   dark-brand-logo="/assets/logo-dark.svg"
 *   brand-text="Espalier"
 *   brand-href="/"
 *   brand-alt="Espalier logo"
 *   light-brand-color="oklch(0.35 0.12 216)"
 *   dark-brand-color="oklch(0.9 0.08 216)"
 *   columns="3">
 *   <esp-footer-link-group heading="Explore">
 *     <a href="/components">Components</a>
 *     <a href="/api">API</a>
 *   </esp-footer-link-group>
 *   <esp-footer-link-group heading="Learn">
 *     <a href="/guides/getting-started">Getting started</a>
 *     <a href="/guides/styling">Styling</a>
 *   </esp-footer-link-group>
 *   <p slot="aside">Themeable web components built on web standards.</p>
 *   <div slot="bottom">Copyright 2026 Example Organization</div>
 * </esp-footer>
 * ```
 *
 * For creator-controlled columns, wrap each ordered stack of groups in
 * [`<esp-footer-column>`](/components/footer/column/). Each wrapper is one grid
 * item at wide sizes; below the footer's compact container breakpoint, the
 * columns become full-width rows in their slotted order. `columns` remains the
 * maximum number of grid items per row:
 *
 * ```html
 * <esp-footer columns="3">
 *   <esp-footer-column>
 *     <esp-footer-link-group heading="Product">
 *       <a href="/features">Features</a>
 *       <a href="/pricing">Pricing</a>
 *     </esp-footer-link-group>
 *     <esp-footer-link-group heading="Company">
 *       <a href="/about">About</a>
 *       <a href="/careers">Careers</a>
 *     </esp-footer-link-group>
 *   </esp-footer-column>
 *   <esp-footer-column>
 *     <esp-footer-link-group heading="Resources">
 *       <a href="/docs">Documentation</a>
 *       <a href="/support">Support</a>
 *     </esp-footer-link-group>
 *   </esp-footer-column>
 * </esp-footer>
 * ```
 *
 * A slotted brand replaces configured branding, while the media slot accepts
 * a responsive `picture`, native image, or `esp-image`. Media spans the
 * surface-aligned content well; use the decorative background layer for
 * edge-to-edge artwork:
 *
 * ```html
 * <esp-footer columns="4">
 *   <picture slot="media">
 *     <source media="(prefers-color-scheme: dark)" srcset="/assets/canvas-bg-dark.jpg" />
 *     <img
 *       src="/assets/canvas-bg.jpg"
 *       alt="A colorful floral pattern"
 *       style="display: block; width: 100%; height: auto;" />
 *   </picture>
 *   <a slot="brand" href="/" aria-label="Espalier home">
 *     <img src="/assets/espalier-logo.svg" alt="Espalier" />
 *   </a>
 *   <esp-footer-link-group heading="Product">
 *     <a href="/components">Components</a>
 *   </esp-footer-link-group>
 * </esp-footer>
 * ```
 *
 * Decorative art uses an image layer independent of the base color. The same
 * API supports a repeating landscape band or one large cover image:
 *
 * ```html
 * <style>
 *   esp-footer.mountains {
 *     --esp-footer-background: oklch(0.48 0.12 145);
 *     --esp-footer-background-image-opacity: 0.55;
 *     --esp-footer-background-image:
 *       linear-gradient(to bottom, transparent 8rem, oklch(0.48 0.12 145)),
 *       url("/assets/espalier-geometric-texture.png");
 *     --esp-footer-background-repeat: no-repeat, repeat-x;
 *     --esp-footer-background-position: 0 0, top;
 *     --esp-footer-background-size: 100% 100%, auto 10rem;
 *     --esp-footer-padding-block: 6rem;
 *   }
 *
 *   esp-footer.photo {
 *     --esp-footer-background: oklch(0.2 0.04 216);
 *     --esp-footer-heading-color: white;
 *     --esp-footer-background-image:
 *       linear-gradient(oklch(0.1 0 0 / 0.55), oklch(0.1 0 0 / 0.55)),
 *       url("/assets/canvas-bg.jpg");
 *     --esp-footer-background-repeat: no-repeat;
 *     --esp-footer-background-position: center;
 *     --esp-footer-background-size: cover;
 *   }
 * </style>
 * <esp-footer class="mountains" brand-text="Mountain Studio"></esp-footer>
 * <esp-footer class="photo" brand-text="Photo Studio"></esp-footer>
 * ```
 *
 * Surface alignment is automatic inside `esp-page`; opt out only when the
 * footer's content should also span the entire bar:
 *
 * ```html
 * <esp-page align="center" style="--esp-page-max-width: 36rem;">
 *   <main>Surface-aligned page content</main>
 *   <esp-footer slot="footer" brand-text="Aligned Studio" columns="3">
 *     <esp-footer-link-group heading="Explore">
 *       <a href="/work">Work</a>
 *       <a href="/about">About</a>
 *     </esp-footer-link-group>
 *   </esp-footer>
 * </esp-page>
 *
 * <esp-footer full-bleed-content brand-text="Full-width Studio"></esp-footer>
 * ```
 *
 * @customElement esp-footer
 * @slot media - Meaningful artwork spanning the surface-aligned content well,
 * preferably responsive `<picture>` markup or an `esp-image` with appropriate
 * alternative text.
 * @slot brand - Custom brand identity. Overrides configured brand properties.
 * @slot - Bare `esp-footer-link-group` children for automatic flow, or
 * `esp-footer-column` children for creator-controlled group stacks.
 * @slot aside - Supporting content such as a newsletter, call to action,
 * contact details, social links, or locale controls.
 * @slot bottom - Copyright, legal/utility links, attribution, accessibility
 * controls, site credit, or a final wordmark.
 * @csspart footer - The native footer landmark and full-bleed base surface.
 * @csspart background - The independent decorative image layer.
 * @csspart content - The surface-aligned content wrapper.
 * @csspart media - The media region spanning the aligned content well.
 * @csspart primary - The grid containing brand, link groups, and aside content.
 * @csspart brand - The brand region.
 * @csspart groups - The link-group grid.
 * @csspart aside - The supporting-content region.
 * @csspart bottom - The final legal/utility region.
 * @cssprop --esp-footer-background - Base footer color. Defaults to `var(--esp-color-layer-2)`.
 * @cssprop --esp-footer-color - Body text color. Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-footer-heading-color - Heading and configured-brand color. Defaults to `var(--esp-color-headings)`.
 * @cssprop --esp-footer-link-color - Link color. Defaults to `var(--esp-color-link)`.
 * @cssprop --esp-footer-link-hover-color - Hovered link color. Defaults to `var(--esp-color-link-hover)`.
 * @cssprop --esp-footer-focus-outline - Focus-visible outline. Defaults to `2px solid var(--esp-color-link)`.
 * @cssprop --esp-footer-border - Block-start footer border. Defaults to `1px solid var(--esp-color-border)`.
 * @cssprop --esp-footer-padding-block - Content block padding. Defaults to `var(--esp-size-padding-page)`.
 * @cssprop --esp-footer-padding-inline - Content inline padding. Defaults to `var(--esp-size-padding-page)`.
 * @cssprop --esp-footer-section-gap - Gap between media, primary, and bottom regions. Defaults to `var(--esp-size-big)`.
 * @cssprop --esp-footer-column-gap - Gap between link-group columns and major primary regions. Defaults to `var(--esp-size-padding-page)`.
 * @cssprop --esp-footer-row-gap - Vertical gap between footer grid rows and
 * link groups stacked in `esp-footer-column`. Defaults to `var(--esp-size-big)`.
 * @cssprop --esp-footer-link-group-min-width - Intrinsic minimum link-group column width. Defaults to `10rem`.
 * @cssprop --esp-footer-link-group-gap - Space between a link-group heading and its links. Defaults to `var(--esp-size-small)`.
 * @cssprop --esp-footer-brand-logo-size - Configured logo block size. Defaults to `3rem`.
 * @cssprop --esp-footer-brand-logo-max-width - Configured logo maximum inline size. Defaults to `12rem`.
 * @cssprop --esp-footer-background-image - Decorative image or gradient layer. Defaults to `none`.
 * @cssprop --esp-footer-background-image-opacity - Decorative layer opacity. Defaults to `1`.
 * @cssprop --esp-footer-background-repeat - Decorative layer repeat behavior. Defaults to `repeat`.
 * @cssprop --esp-footer-background-position - Decorative layer position. Defaults to `0 0`.
 * @cssprop --esp-footer-background-size - Decorative layer size. Defaults to `auto`.
 * @cssprop --esp-footer-background-blend-mode - Decorative layer blend mode. Defaults to `normal`.
 * @cssprop --esp-footer-content-max-width - Surface-alignment cap published by `esp-page`. Defaults to `100%`.
 * @cssprop --esp-footer-content-lead - Fraction of surplus placed before content (`0`, `0.5`, or `1`). Defaults to `0`.
 * @docPageTitle Footer
 * @docUrl /components/footer
 * @menuGroup Structure
 * @menuLabel Footer
 * @menuIcon layout
 */
export declare class EspalierFooter extends EspalierElementBase {
    /** Configured brand text used when the `brand` slot is empty. */
    brandText: string;
    /** Configured brand logo URL used when the `brand` slot is empty. */
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
    /** Optional configured-brand link target. */
    brandHref: string;
    /** Accessible text for a configured logo. */
    brandAlt: string;
    /**
     * Optional configured brand color. Scheme-specific colors override it;
     * when all configured colors are empty, `--esp-footer-heading-color`
     * remains the fallback.
     */
    brandColor: string;
    /**
     * Configured brand color used in light scheme. A non-empty value
     * overrides `brand-color`; an empty value falls back to it and then
     * `--esp-footer-heading-color`.
     */
    lightBrandColor: string;
    /**
     * Configured brand color used in dark scheme. A non-empty value
     * overrides `brand-color`; an empty value falls back to it and then
     * `--esp-footer-heading-color`.
     */
    darkBrandColor: string;
    /**
     * Maximum number of link-group columns. Numeric values cap the wide layout;
     * the intrinsic grid still renders fewer columns when space is limited.
     */
    columns: FooterColumns;
    /**
     * Opt out of the `esp-page` surface-alignment contract and allow footer
     * content to use the full bar width. The background is always full-bleed.
     */
    fullBleedContent: boolean;
    /** Optional accessible label for pages containing multiple footer landmarks. */
    landmarkLabel: string;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-footer": EspalierFooter;
    }
}
