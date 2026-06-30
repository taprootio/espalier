/**
 * @module events
 *
 * Central registry for every CustomEvent dispatched by Espalier
 * components.  Provides:
 *
 * 1. **Event name constants** — `ESP_EVENTS` for stringly-typed safety.
 * 2. **Detail types** — one interface per distinct payload shape.
 * 3. **Per-component event maps** — typed maps for `addEventListener`.
 * 4. **Re-exports** — types that already exist in component files,
 *    gathered here for single-import convenience.
 *
 * ```ts
 * import {
 *   ESP_EVENTS,
 *   type EspalierInputEventMap,
 * } from "@taprootio/espalier";
 *
 * const input = document.querySelector("esp-input")!;
 * input.addEventListener(ESP_EVENTS.VALUE_CHANGED, (e) => {
 *   // e.detail is typed as `string`
 * });
 * ```
 */
export { type GridClickedEvent, type GridDataStateEventDetail, type GridItemsChangedEventDetail, type GridLoadErrorEventDetail, type GridLoadStartEventDetail, type GridLoadSuccessEventDetail, } from "../grid/esp-grid.js";
export { type DestroyEspalierInfo } from "../info/esp-info.js";
export { type ValidityChangedDetail, type ValidationError, VALIDITY_CHANGED_EVENT, } from "./validation.js";
export { type ToastConfig } from "./toast-events.js";
export { type PickerItem } from "../pickers/esp-picker-item.js";
export { type EspalierUploadImage } from "../image-upload/image-helpers.js";
export { type FontPickerValueChangedDetail, type GoogleFont, type WebSafeFont, } from "../font-picker/esp-font-picker.js";
import type { EspalierDetails } from "../details/esp-details.js";
import type { ValidityChangedDetail } from "./validation.js";
import type { GridClickedEvent, GridItemsChangedEventDetail, GridLoadErrorEventDetail, GridLoadStartEventDetail, GridLoadSuccessEventDetail } from "../grid/esp-grid.js";
import type { DestroyEspalierInfo } from "../info/esp-info.js";
import type { PickerItem } from "../pickers/esp-picker-item.js";
import type { EspalierUploadImage, UploadEventDetail } from "../image-upload/image-helpers.js";
export type { UploadEventDetail } from "../image-upload/image-helpers.js";
import type { FontPickerValueChangedDetail } from "../font-picker/esp-font-picker.js";
/**
 * Canonical event name strings for every CustomEvent in the library.
 *
 * Use these instead of raw strings to catch typos at compile time:
 *
 * ```ts
 * el.addEventListener(ESP_EVENTS.VALUE_CHANGED, handler);
 * ```
 *
 * @docUrl /api/esp-events
 * @menuGroup Event Constants
 * @menuLabel ESP_EVENTS
 */
export declare const ESP_EVENTS: {
    readonly VALUE_CHANGED: "value-changed";
    readonly VALIDITY_CHANGED: "validity-changed";
    readonly CLICKED: "clicked";
    readonly ESP_SUBMIT: "esp-submit";
    readonly ESP_SUBMIT_RESPONSE: "esp-submit-response";
    readonly ESP_SUBMIT_ERROR: "esp-submit-error";
    readonly ESP_TAB_CHANGED: "esp-tab-changed";
    readonly ESP_TAB_UPDATED: "esp-tab-updated";
    readonly ESP_TOGGLE: "esp-toggle";
    readonly ESP_ACCORDION_CHANGE: "esp-accordion-change";
    readonly DRAWER_OPENED: "drawer-opened";
    readonly DRAWER_CLOSED: "drawer-closed";
    readonly POPOVER_OPENED: "popover-opened";
    readonly POPOVER_CLOSED: "popover-closed";
    readonly GRID_EVENT: "grid-event";
    readonly GRID_LOAD_START: "esp-grid-load-start";
    readonly GRID_LOAD_SUCCESS: "esp-grid-load-success";
    readonly GRID_LOAD_ERROR: "esp-grid-load-error";
    readonly GRID_ITEMS_CHANGED: "esp-grid-items-changed";
    readonly DESTROY: "destroy";
    readonly FILE_SELECTED: "file-selected";
    readonly FILE_REMOVED: "file-removed";
    readonly FILES_SELECTED: "files-selected";
    readonly FILES_REJECTED: "files-rejected";
    readonly UPLOAD_RETRY: "upload-retry";
    readonly RETRY_UPLOAD: "retry-upload";
    readonly IMAGES_REORDERED: "images-reordered";
    readonly SEARCH_REQUESTED: "search-requested";
    readonly RESULT_SELECTED: "result-selected";
    readonly SEARCH_CLOSED: "search-closed";
    readonly SELECTION_CHANGED: "selection-changed";
    readonly CLOSE_MENU: "close-menu";
    readonly REMOVE_IMAGE: "remove-image";
};
/**
 * Detail for `value-changed` on toggle controls
 * (`esp-checkbox`, `esp-switch`, `esp-radio-button`).
 *
 * @docUrl /api/toggle-value-changed-detail
 * @menuGroup Event Details
 * @menuLabel ToggleValueChangedDetail
 */
export interface ToggleValueChangedDetail {
    /** The new checked state for the control. */
    checked: boolean;
    /** The associated control value submitted with the event. */
    value: string;
}
/**
 * Detail for `value-changed` on `esp-color-picker`.
 *
 * @docUrl /api/color-value-changed-detail
 * @menuGroup Event Details
 * @menuLabel ColorValueChangedDetail
 */
export interface ColorValueChangedDetail {
    seedColor: string;
    hue: number;
    chroma: number;
    lightness: number;
}
/**
 * Detail for `esp-submit` on `esp-form`.
 *
 * @docUrl /api/esp-submit-detail
 * @menuGroup Event Details
 * @menuLabel EspSubmitDetail
 */
export interface EspSubmitDetail {
    formData: FormData;
    form: HTMLFormElement;
}
/**
 * Detail for `esp-submit-response` on `esp-form`.
 *
 * @docUrl /api/esp-submit-response-detail
 * @menuGroup Event Details
 * @menuLabel EspSubmitResponseDetail
 */
export interface EspSubmitResponseDetail {
    response: Response;
    ok: boolean;
}
/**
 * Detail for `esp-submit-error` on `esp-form`.
 *
 * @docUrl /api/esp-submit-error-detail
 * @menuGroup Event Details
 * @menuLabel EspSubmitErrorDetail
 */
export interface EspSubmitErrorDetail {
    error: unknown;
}
/**
 * Detail for `esp-tab-changed` on `esp-tab-group`.
 *
 * @docUrl /api/esp-tab-changed-detail
 * @menuGroup Event Details
 * @menuLabel EspTabChangedDetail
 */
export interface EspTabChangedDetail {
    index: number;
    label: string;
}
/**
 * Detail for `esp-toggle` on `esp-details`.
 *
 * @docUrl /api/esp-toggle-detail
 * @menuGroup Event Details
 * @menuLabel EspToggleDetail
 */
export interface EspToggleDetail {
    open: boolean;
}
/**
 * Detail for `esp-accordion-change` on `esp-details-group`.
 *
 * @docUrl /api/esp-accordion-change-detail
 * @menuGroup Event Details
 * @menuLabel EspAccordionChangeDetail
 */
export interface EspAccordionChangeDetail {
    openItem: EspalierDetails | null;
}
/** Events fired by `<esp-button>`. */
export interface EspalierButtonEventMap {
    [ESP_EVENTS.CLICKED]: CustomEvent<Record<string, never>>;
}
/** Events fired by `<esp-input>`. */
export interface EspalierInputEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<string>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-textarea>`. */
export interface EspalierTextareaEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<string>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-checkbox>`. */
export interface EspalierCheckboxEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<ToggleValueChangedDetail>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-checkbox-group>`. */
export interface EspalierCheckboxGroupEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<string[]>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-switch>`. */
export interface EspalierSwitchEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<ToggleValueChangedDetail>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-radio-button>`. */
export interface EspalierRadioButtonEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<ToggleValueChangedDetail>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-radio-button-group>`. */
export interface EspalierRadioButtonGroupEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<string>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-pick-one>`. */
export interface EspalierPickOneEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<PickerItem | undefined>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-pick-some>`. */
export interface EspalierPickSomeEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<PickerItem[]>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-color-picker>`. */
export interface EspalierColorPickerEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<ColorValueChangedDetail>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-font-picker>`. */
export interface EspalierFontPickerEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<FontPickerValueChangedDetail>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-date-picker>`. */
export interface EspalierDatePickerEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<string>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-form>`. */
export interface EspalierFormEventMap {
    [ESP_EVENTS.ESP_SUBMIT]: CustomEvent<EspSubmitDetail>;
    [ESP_EVENTS.ESP_SUBMIT_RESPONSE]: CustomEvent<EspSubmitResponseDetail>;
    [ESP_EVENTS.ESP_SUBMIT_ERROR]: CustomEvent<EspSubmitErrorDetail>;
}
/** Events fired by `<esp-tab-group>`. */
export interface EspalierTabGroupEventMap {
    [ESP_EVENTS.ESP_TAB_CHANGED]: CustomEvent<EspTabChangedDetail>;
}
/** Events fired by `<esp-details>`. */
export interface EspalierDetailsEventMap {
    [ESP_EVENTS.ESP_TOGGLE]: CustomEvent<EspToggleDetail>;
}
/** Events fired by `<esp-details-group>`. */
export interface EspalierDetailsGroupEventMap {
    [ESP_EVENTS.ESP_ACCORDION_CHANGE]: CustomEvent<EspAccordionChangeDetail>;
}
/** Events fired by `<esp-popover>`. */
export interface EspalierPopoverEventMap {
    [ESP_EVENTS.POPOVER_OPENED]: CustomEvent<void>;
    [ESP_EVENTS.POPOVER_CLOSED]: CustomEvent<void>;
}
/** Events fired by `<esp-menu>`. */
export interface EspalierMenuEventMap {
    [ESP_EVENTS.DRAWER_OPENED]: CustomEvent<void>;
    [ESP_EVENTS.DRAWER_CLOSED]: CustomEvent<void>;
}
/** Events fired by `<esp-header-button>`. */
export interface EspalierHeaderButtonEventMap {
    [ESP_EVENTS.CLICKED]: CustomEvent<Record<string, never>>;
}
/** Events fired by `<esp-grid>`. */
export interface EspalierGridEventMap {
    [ESP_EVENTS.GRID_EVENT]: CustomEvent<GridClickedEvent>;
    [ESP_EVENTS.GRID_LOAD_START]: CustomEvent<GridLoadStartEventDetail>;
    [ESP_EVENTS.GRID_LOAD_SUCCESS]: CustomEvent<GridLoadSuccessEventDetail>;
    [ESP_EVENTS.GRID_LOAD_ERROR]: CustomEvent<GridLoadErrorEventDetail>;
    [ESP_EVENTS.GRID_ITEMS_CHANGED]: CustomEvent<GridItemsChangedEventDetail>;
}
/** Events fired by `<esp-info>`. */
export interface EspalierInfoEventMap {
    [ESP_EVENTS.DESTROY]: CustomEvent<DestroyEspalierInfo>;
}
/**
 * Detail for `images-reordered` on `esp-image-upload`.
 *
 * @docUrl /api/images-reordered-detail
 * @menuGroup Event Details
 * @menuLabel ImagesReorderedDetail
 */
export interface ImagesReorderedDetail {
    images: EspalierUploadImage[];
}
/**
 * Detail for `files-rejected` on `esp-image-upload`.
 *
 * Fired when some of the user's selected files are skipped. Route it to a
 * toast or inline message if the component's built-in notice is not enough.
 *
 * @docUrl /api/files-rejected-detail
 * @menuGroup Event Details
 * @menuLabel FilesRejectedDetail
 */
export interface FilesRejectedDetail {
    /** Files skipped because their type is not in `accept`. */
    unsupported: File[];
    /** Files skipped because they could not be read or decoded. */
    unreadable: File[];
}
/** Events fired by `<esp-image-upload>`. */
export interface EspalierImageUploadEventMap {
    [ESP_EVENTS.FILE_SELECTED]: CustomEvent<UploadEventDetail>;
    [ESP_EVENTS.FILE_REMOVED]: CustomEvent<EspalierUploadImage>;
    [ESP_EVENTS.FILES_REJECTED]: CustomEvent<FilesRejectedDetail>;
    [ESP_EVENTS.UPLOAD_RETRY]: CustomEvent<UploadEventDetail>;
    [ESP_EVENTS.IMAGES_REORDERED]: CustomEvent<ImagesReorderedDetail>;
}
/** Events fired by `<esp-file-upload>`. */
export interface EspalierFileUploadEventMap {
    [ESP_EVENTS.FILES_SELECTED]: CustomEvent<FileList>;
}
/** Events fired by `<esp-burger>`. */
export interface EspalierBurgerEventMap {
    [ESP_EVENTS.DRAWER_OPENED]: CustomEvent<void>;
    [ESP_EVENTS.DRAWER_CLOSED]: CustomEvent<void>;
}
/**
 * Detail for `search-requested` on `esp-search`.
 *
 * @docUrl /api/search-requested-detail
 * @menuGroup Event Details
 * @menuLabel SearchRequestedDetail
 */
export interface SearchRequestedDetail {
    /** The current query string. May be empty when the user clears the input. */
    query: string;
}
/**
 * Detail for `result-selected` on `esp-search`.
 *
 * @docUrl /api/result-selected-detail
 * @menuGroup Event Details
 * @menuLabel ResultSelectedDetail
 */
export interface ResultSelectedDetail {
    /** The URL of the selected search result. */
    url: string;
}
/** Events fired by `<esp-slider>`. */
export interface EspalierSliderEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<string>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-search>`. */
export interface EspalierSearchEventMap {
    [ESP_EVENTS.SEARCH_REQUESTED]: CustomEvent<SearchRequestedDetail>;
    [ESP_EVENTS.RESULT_SELECTED]: CustomEvent<ResultSelectedDetail>;
    [ESP_EVENTS.SEARCH_CLOSED]: CustomEvent<Record<string, never>>;
}
