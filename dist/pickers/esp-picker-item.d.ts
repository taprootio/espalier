import { LitElement, type PropertyValues, type TemplateResult } from "lit";
export type PickerItem = {
    text: string;
    value: string;
    selected: boolean;
    /** Icon name from the configured SVG sprite. */
    icon?: string | undefined;
    styles?: Record<string, string> | undefined;
    /** Cloned DOM nodes from the original slot content (icons, badges, etc.). */
    slotNodes?: Node[];
    /** Character ranges to highlight (typeahead match). Each tuple is [start, end). */
    highlightRanges?: Array<[number, number]>;
};
/**
 * An item to display in an Espalier Picker.
 */
export declare class EspalierPickerItem extends LitElement implements PickerItem {
    constructor();
    styles: Record<string, string> | undefined;
    text: string;
    /**
     * Optional icon name from the configured Espalier SVG sprite.
     * Slotted content remains supported and overrides this value.
     */
    icon: string;
    /**
     * Machine-readable value submitted or selected for this item.
     */
    value: string;
    selected: boolean;
    highlightRanges: Array<[number, number]> | undefined;
    protected updated(changedProperties: PropertyValues): void;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-picker-item": EspalierPickerItem;
    }
}
