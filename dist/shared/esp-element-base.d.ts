import { LitElement, type PropertyValues } from "lit";
import { type SeedColorRoot } from "./bus-events.js";
import { type EspalierIntentVariant } from "./intent-values.js";
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
    protected intentBacker: EspalierIntentVariant;
    /**
     * Whether a non-neutral intent emits its inline tokens
     * (`--esp-color-primary` and the filled-action pair). Interactive
     * controls need them; chrome whose intent treatment is class-based
     * (badges, callouts, status pills — see `intentSurfaceTokens`) opts
     * out so a decorative intent never rewrites inherited tokens for
     * slotted content.
     */
    protected intentEmitsTokens: boolean;
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
     * The element's [intent](/espalier-guides/) — its meaning: `neutral`
     * (no pin), or `success`, `warning`, `danger`, `info` — each pinned
     * to its fixed status family (blue for `info`), retunable per theme
     * via `intents`. On token-emitting controls a non-neutral intent pins the
     * filled-action pair to that family, derived over the governing
     * zone's theme; class-styled chrome (badges, callouts, status pills)
     * opts out of inline emission and renders its treatment from CSS
     * classes instead. An intent never repaints the surrounding zone,
     * which is what contexts are for. Removing the attribute restores
     * the element's own default intent.
     * @type {EspalierIntentVariant}
     */
    get intent(): EspalierIntentVariant;
    set intent(value: EspalierIntentVariant | string | null);
    /**
     * A theme-defined color zone. The selected context rebinds designer-facing
     * roles and emits a complete, contrast-enforced semantic token table on this
     * host for descendants to inherit.
     */
    get context(): string;
    set context(value: string);
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    constructor();
    /**
     * Traverse up the DOM tree to find the closest element that
     * matches the selector. This method is aware of shadow DOM
     * boundaries and will traverse through them to find the element.
     * @param selector The selector of the element to look for
     * @returns The element, if found, or null
     */
    traverseToClosest(selector: string): Element | null;
    /**
     * Compute and apply context- and intent-specific semantic color tokens.
     *
     * With no context and a `neutral` intent, all semantic tokens cascade
     * from `<esp-root>` and previous overrides are cleared. A context
     * emits the zone's complete nineteen-token table; a non-neutral intent
     * then overlays the filled-action pair, derived over the governing
     * zone's theme — this host's own context, or the nearest ancestor
     * zone's — so its APCA enforcement runs against the zone's actual
     * action surface.
     */
    protected applyScopedColorTokens(): void;
    static styles: import("lit").CSSResult[];
}
