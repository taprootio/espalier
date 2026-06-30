import "../pickers/esp-pick-one.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierFormField } from "../form-item/esp-form-item.js";
import { type PropertyValues } from "lit";
export type GoogleFont = {
    family: string;
    variants: string[];
    subsets: string[];
    version: string;
    lastModified: string;
    files?: Record<string, string>;
    category: FontCategory;
    kind: string;
};
export type FontCategory = "serif" | "sans-serif" | "display" | "handwriting" | "monospace" | "not-display";
export type FontSource = "google" | "web-safe";
export type WebSafeFont = {
    family: string;
    stack: string;
    category: Extract<FontCategory, "serif" | "sans-serif" | "monospace">;
    kind: "web-safe";
};
export type FontPickerFont = GoogleFont | WebSafeFont;
export type FontPickerValueChangedDetail = FontPickerFont | undefined;
export declare const WEB_SAFE_FONTS: Array<WebSafeFont>;
/**
 * Load the font catalog from the build-generated `font-definitions.json`
 * file served alongside the font CSS files.  The JSON is fetched from
 * `{fontCSSRoot}font-definitions.json` where `fontCSSRoot` comes from
 * the nearest `<esp-root>` element's `font-css-root` attribute.
 *
 * Results are cached at the module level so only one fetch occurs per page.
 */
export declare const getGoogleFonts: () => Promise<Array<GoogleFont>>;
/**
 * Build the CSS `font-family` value used by picker items.
 * Consumers should reference this when setting `styles.fontFamily`
 * on picker items to match the preview `@font-face` name.
 */
export declare const previewFontFamily: (family: string) => string;
/**
 * Font picker component backed by the Google Fonts catalog by default.
 *
 * The font catalog is loaded at runtime from a build-generated
 * `font-definitions.json` file served alongside the individual font CSS
 * files.  Run `npm run build-fonts` to generate both assets.
 *
 * Set `font-source="web-safe"` for email editors or other places where
 * the picker should offer only CSS font stacks that do not need font
 * downloads.
 *
 * **Required setup:**
 * 1. Serve the `css/fonts/` directory under a public path.
 * 2. Point `<esp-root font-css-root="/your/path/">` at that path.
 *
 * ```html
 * <esp-root font-css-root="/css/fonts/">
 *   <esp-form-item label="Pick a font">
 *     <esp-font-picker></esp-font-picker>
 *   </esp-form-item>
 * </esp-root>
 * ```
 *
 * ```html
 * <esp-form-item label="Email font">
 *   <esp-font-picker font-source="web-safe"></esp-font-picker>
 * </esp-form-item>
 * ```
 *
 * @event {CustomEvent<FontPickerValueChangedDetail>} value-changed - Fired
 * when the user selects a font
 *
 * @customElement esp-font-picker
 * @docPageTitle Font Picker
 * @docUrl /components/font-picker
 * @menuGroup Form Controls
 * @menuLabel Font Picker
 * @menuIcon typography
 */
export declare class EspalierFontPicker extends EspalierElementBase implements EspalierFormField {
    /**
     * Category of fonts to display in the picker.
     *
     * If not set, all font categories are displayed.
     *
     * ```html
     * <esp-box>
     *   <h2>Monospace Fonts</h2>
     *   <esp-form-item label="Pick a font">
     *     <esp-font-picker category="monospace"></esp-font-picker>
     *   </esp-form-item>
     * </esp-box>
     * ```
     */
    category: FontCategory | null;
    /**
     * Source of fonts to display. `google` preserves the default Google
     * Fonts catalog behavior. `web-safe` shows email-safe/system CSS
     * font stacks and does not load Google font assets.
     *
     * ```html
     * <esp-box>
     *   <h2>Email-safe fonts</h2>
     *   <esp-form-item label="Pick a font stack">
     *     <esp-font-picker font-source="web-safe"></esp-font-picker>
     *   </esp-form-item>
     * </esp-box>
     * ```
     */
    fontSource: FontSource;
    /**
     * The selected font family or CSS font stack.
     *
     * In the default Google Fonts mode this is the font family name, such
     * as `"Aclonica"`. In `font-source="web-safe"` mode this is the full CSS
     * font stack, such as `"Arial, Helvetica, sans-serif"`, so pre-selection
     * via the `value` attribute must use the stack value.
     *
     * ```html
     * <esp-box>
     *   <h2>Have Aclonica pre-selected</h2>
     *   <esp-form-item label="Pick a font">
     *     <esp-font-picker value="Aclonica"></esp-font-picker>
     *   </esp-form-item>
     * </esp-box>
     * ```
     */
    value: string;
    /**
     * The placeholder text for the picker input.
     *
     * @type {string}
     */
    placeholder: string;
    /**
     * Focus the picker input.
     */
    focus(): void;
    protected getUpdateComplete(): Promise<boolean>;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
}
/**
 * Reset the module-level font cache.  Exposed for test cleanup so each
 * test starts with a fresh slate.
 */
export declare const resetFontCache: () => void;
declare global {
    interface HTMLElementTagNameMap {
        "esp-font-picker": EspalierFontPicker;
    }
}
