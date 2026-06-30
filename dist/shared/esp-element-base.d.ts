import { LitElement, type PropertyValues } from "lit";
import { type SeedColorRoot } from "./bus-events.js";
import { type ColorSource } from "./theme.js";
export type EspalierVariant = "analogous-left" | "analogous-right" | "complementary" | "danger" | "info" | "neutral" | "primary" | "split-complementary-left" | "split-complementary-right" | "success" | "triadic-left" | "triadic-right" | "warning" | "";
/**
 * Shared base class for Espalier elements.
 *
 * The reusable `.esp-field` shell used by text inputs, textareas,
 * pickers, date pickers, buttons, and similar controls exposes the
 * following shared styling hooks:
 *
 * @cssprop --esp-field-background - Background color of the shared field shell. Defaults to `var(--esp-color-layer-2)`.
 * @cssprop --esp-field-border-color - Border color of the shared field shell. Defaults to `var(--esp-color-border)`.
 * @cssprop --esp-field-border-width - Border width of the shared field shell. Defaults to `1px`.
 * @cssprop --esp-field-text-color - Text color used inside the shared field shell. Defaults to `var(--esp-color-text)`.
 * @cssprop --esp-field-hover-bg - Hover background color of the shared field shell. Derived from `--esp-field-background`.
 * @cssprop --esp-field-focus-bg - Focus background color of the shared field shell. Derived from `--esp-field-background`.
 * @cssprop --esp-field-focus-shadow - Shadow color used for shared field focus treatment. Defaults to `var(--esp-color-shadow)`.
 */
export declare class EspalierElementBase extends LitElement implements SeedColorRoot {
    protected variantBacker: EspalierVariant;
    get seedColor(): string;
    set seedColor(val: string);
    correlationId: `${string}-${string}-${string}-${string}-${string}`;
    protected focusResolvedElementAfterUpdate(resolveTarget: () => HTMLElement | null | undefined, options?: FocusOptions): void;
    protected focusShadowElementAfterUpdate(selector: string, options?: FocusOptions): void;
    protected emitValueChanged<T>(detail: T): void;
    /**
     * The scheme to use for the component. This property is used internally
     * to control the light/dark scheme so it matches the scheme of
     * [esp-root](/components/root). It should not be set manually, it
     * exists as an attribute for styling purposes.
     * @type {"dark" | "light"}
     */
    scheme: "dark" | "light" | "";
    /**
     * The [color variant](/guides/color/variants) of the element.
     * @type {EspalierVariant}
     */
    get variant(): EspalierVariant;
    set variant(val: EspalierVariant);
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * Traverse up the DOM tree to find the closest element that
     * matches the selector. This method is aware of shadow DOM
     * boundaries and will traverse through them to find the element.
     * @param selector The selector of the element to look for
     * @returns The element, if found, or null
     */
    traverseToClosest(selector: string): Element | null;
    /**
     * Compute and apply variant-specific semantic color tokens.
     *
     * For the **primary** variant (or none), all semantic tokens
     * cascade from `<esp-root>` — any previous overrides are cleared.
     *
     * For non-primary variants, semantic tokens whose source is
     * `primary` are recomputed using the variant color and applied
     * as inline styles on the host element.
     */
    protected applyVariantTokens(): void;
    protected getVariantColorSource(): ColorSource | "";
    static styles: import("lit").CSSResult[];
}
