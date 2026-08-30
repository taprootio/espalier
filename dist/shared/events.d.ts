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
export { type FlyoutConfig, type FlyoutCloseReason } from "./flyout-events.js";
export { type HelpRequest, type HelpState } from "./help-events.js";
export { type PickerItem } from "../pickers/esp-picker-item.js";
export { type EspalierUploadImage } from "../image-upload/image-helpers.js";
export { type FontPickerValueChangedDetail, type GoogleFont, type WebSafeFont, } from "../font-picker/esp-font-picker.js";
export { type EspThemeToggleEventDetail } from "../header/esp-header.js";
export { type PageWorkspaceResizeDetail, type PageWorkspaceResizeSource, type PageWorkspaceSeparator, } from "../page/esp-page.js";
import type { EspalierDetails } from "../details/esp-details.js";
import type { ActionMenuSelectDetail } from "../action-menu/esp-action-menu.js";
import type { FocusChangedDetail } from "../focus-picker/esp-focus-picker.js";
import type { FlyoutCloseReason } from "./flyout-events.js";
import { type ValidityChangedDetail } from "./validation.js";
import type { GridClickedEvent, GridItemsChangedEventDetail, GridLoadErrorEventDetail, GridLoadStartEventDetail, GridLoadSuccessEventDetail } from "../grid/esp-grid.js";
import type { DestroyEspalierInfo } from "../info/esp-info.js";
import type { PickerItem } from "../pickers/esp-picker-item.js";
import type { EspalierUploadImage, UploadEventDetail } from "../image-upload/image-helpers.js";
export type { UploadEventDetail } from "../image-upload/image-helpers.js";
import type { FontPickerValueChangedDetail } from "../font-picker/esp-font-picker.js";
import type { EspThemeToggleEventDetail } from "../header/esp-header.js";
import type { PageWorkspaceResizeDetail } from "../page/esp-page.js";
import type { EspTreeEditDetail, EspTreeGraftDetail, EspTreeGraftInputDetail, EspTreeGraftRequestDetail, EspTreeNodeActionDetail, EspTreeSelectDetail, EspTreeToggleDetail } from "../tree/esp-tree.js";
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
    readonly VALUE_CHANGED: "esp-value-changed";
    readonly VALIDITY_CHANGED: "esp-validity-changed";
    readonly CLICKED: "esp-clicked";
    readonly ACTION_MENU_SELECT: "esp-action-menu-select";
    readonly BURGER_OPENED: "esp-burger-opened";
    readonly BURGER_CLOSED: "esp-burger-closed";
    readonly DETAILS_TOGGLE: "esp-details-toggle";
    readonly DETAILS_GROUP_CHANGE: "esp-details-group-change";
    readonly DIALOG_OPENED: "esp-dialog-opened";
    readonly DIALOG_CLOSING: "esp-dialog-closing";
    readonly DIALOG_CLOSED: "esp-dialog-closed";
    readonly FILE_UPLOAD_FILES_SELECTED: "esp-file-upload-files-selected";
    readonly FLYOUT_OPENED: "esp-flyout-opened";
    readonly FLYOUT_CLOSED: "esp-flyout-closed";
    readonly FLYOUT_STATE_CHANGED: "esp-flyout-state-changed";
    readonly FOCUS_PICKER_CHANGED: "esp-focus-picker-changed";
    readonly FORM_DIALOG_CLOSE_REQUESTED: "esp-form-dialog-close-requested";
    readonly FORM_SUBMIT: "esp-form-submit";
    readonly FORM_SUBMIT_RESPONSE: "esp-form-submit-response";
    readonly FORM_SUBMIT_ERROR: "esp-form-submit-error";
    readonly GRID_EVENT: "esp-grid-event";
    readonly GRID_LOAD_START: "esp-grid-load-start";
    readonly GRID_LOAD_SUCCESS: "esp-grid-load-success";
    readonly GRID_LOAD_ERROR: "esp-grid-load-error";
    readonly GRID_ITEMS_CHANGED: "esp-grid-items-changed";
    readonly HEADER_THEME_TOGGLE: "esp-header-theme-toggle";
    readonly IMAGE_UPLOAD_FILE_SELECTED: "esp-image-upload-file-selected";
    readonly IMAGE_UPLOAD_FILE_REMOVED: "esp-image-upload-file-removed";
    readonly IMAGE_UPLOAD_FILES_REJECTED: "esp-image-upload-files-rejected";
    readonly IMAGE_UPLOAD_RETRY: "esp-image-upload-retry";
    readonly IMAGE_UPLOAD_IMAGES_REORDERED: "esp-image-upload-images-reordered";
    readonly INFO_DESTROY: "esp-info-destroy";
    readonly INPUT_ICON_CLICKED: "esp-input-icon-clicked";
    readonly LIGHTBOX_CHANGED: "esp-lightbox-changed";
    readonly MENU_GROUP_TOGGLE: "esp-menu-group-toggle";
    readonly MENU_DRAWER_OPENED: "esp-menu-drawer-opened";
    readonly MENU_DRAWER_CLOSED: "esp-menu-drawer-closed";
    readonly PAGE_WORKSPACE_RESIZE: "esp-page-workspace-resize";
    readonly PICKER_MENU_SELECTION_CHANGED: "esp-picker-menu-selection-changed";
    readonly PICKER_MENU_CLOSE_REQUESTED: "esp-picker-menu-close-requested";
    readonly PICKER_MENU_DISMISS_REQUESTED: "esp-picker-menu-dismiss-requested";
    readonly PICKER_MENU_RANGE_CHANGED: "esp-picker-menu-range-changed";
    readonly POPOVER_OPENED: "esp-popover-opened";
    readonly POPOVER_CLOSED: "esp-popover-closed";
    readonly SEARCH_REQUESTED: "esp-search-requested";
    readonly SEARCH_RESULT_SELECTED: "esp-search-result-selected";
    readonly SEARCH_CLOSED: "esp-search-closed";
    readonly TAB_GROUP_CHANGED: "esp-tab-group-changed";
    readonly TREE_SELECT: "esp-tree-select";
    readonly TREE_TOGGLE: "esp-tree-toggle";
    readonly TREE_GRAFT_REQUEST: "esp-tree-graft-request";
    readonly TREE_GRAFT: "esp-tree-graft";
    readonly TREE_EDIT: "esp-tree-edit";
    readonly TREE_DELETE: "esp-tree-delete";
    readonly TREE_MOVE_UP: "esp-tree-move-up";
    readonly TREE_MOVE_DOWN: "esp-tree-move-down";
    readonly TREE_CUT: "esp-tree-cut";
    readonly TREE_PASTE_CHILD: "esp-tree-paste-child";
    readonly TREE_GRAFT_INPUT: "esp-tree-graft-input";
};
/**
 * Detail for `esp-value-changed` on toggle controls
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
 * Detail for `esp-value-changed` on `esp-color-picker`.
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
 * Detail for `esp-form-submit` on `esp-form`.
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
 * Detail for `esp-form-submit-response` on `esp-form`.
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
 * Detail for `esp-form-submit-error` on `esp-form`.
 *
 * @docUrl /api/esp-submit-error-detail
 * @menuGroup Event Details
 * @menuLabel EspSubmitErrorDetail
 */
export interface EspSubmitErrorDetail {
    error: unknown;
}
/**
 * Detail for `esp-tab-group-changed` on `esp-tab-group`.
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
 * Detail for `esp-details-toggle` on `esp-details`.
 *
 * @docUrl /api/esp-toggle-detail
 * @menuGroup Event Details
 * @menuLabel EspToggleDetail
 */
export interface EspToggleDetail {
    open: boolean;
}
/**
 * Detail for `esp-details-group-change` on `esp-details-group`.
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
    [ESP_EVENTS.INPUT_ICON_CLICKED]: CustomEvent<void>;
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
}
/** Events fired by `<esp-font-picker>`. */
export interface EspalierFontPickerEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<FontPickerValueChangedDetail>;
}
/** Events fired by `<esp-date-picker>`. */
export interface EspalierDatePickerEventMap {
    [ESP_EVENTS.VALUE_CHANGED]: CustomEvent<string>;
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
}
/** Events fired by `<esp-form>`. */
export interface EspalierFormEventMap {
    [ESP_EVENTS.FORM_DIALOG_CLOSE_REQUESTED]: CustomEvent<Record<string, never>>;
    [ESP_EVENTS.FORM_SUBMIT]: CustomEvent<EspSubmitDetail>;
    [ESP_EVENTS.FORM_SUBMIT_RESPONSE]: CustomEvent<EspSubmitResponseDetail>;
    [ESP_EVENTS.FORM_SUBMIT_ERROR]: CustomEvent<EspSubmitErrorDetail>;
}
/** Events fired by `<esp-action-menu>`. */
export interface EspalierActionMenuEventMap {
    [ESP_EVENTS.ACTION_MENU_SELECT]: CustomEvent<ActionMenuSelectDetail>;
}
/** Events fired by `<esp-tab-group>`. */
export interface EspalierTabGroupEventMap {
    [ESP_EVENTS.TAB_GROUP_CHANGED]: CustomEvent<EspTabChangedDetail>;
}
/** Events fired by `<esp-details>`. */
export interface EspalierDetailsEventMap {
    [ESP_EVENTS.DETAILS_TOGGLE]: CustomEvent<EspToggleDetail>;
}
/** Events fired by `<esp-details-group>`. */
export interface EspalierDetailsGroupEventMap {
    [ESP_EVENTS.DETAILS_GROUP_CHANGE]: CustomEvent<EspAccordionChangeDetail>;
}
/** Events fired by `<esp-popover>`. */
export interface EspalierPopoverEventMap {
    [ESP_EVENTS.POPOVER_OPENED]: CustomEvent<void>;
    [ESP_EVENTS.POPOVER_CLOSED]: CustomEvent<void>;
}
/** Events fired by `<esp-dialog>`. */
export interface EspalierDialogEventMap {
    [ESP_EVENTS.DIALOG_OPENED]: CustomEvent<Record<string, never>>;
    [ESP_EVENTS.DIALOG_CLOSING]: CustomEvent<{
        reason: "escape" | "close-dialog" | "api";
    }>;
    [ESP_EVENTS.DIALOG_CLOSED]: CustomEvent<{
        reason: "escape" | "close-dialog" | "api";
    }>;
}
/** Events fired by `<esp-menu>`. */
export interface EspalierMenuEventMap {
    [ESP_EVENTS.MENU_DRAWER_OPENED]: CustomEvent<void>;
    [ESP_EVENTS.MENU_DRAWER_CLOSED]: CustomEvent<void>;
}
/** Events fired by `<esp-menu-group>`. */
export interface EspalierMenuGroupEventMap {
    [ESP_EVENTS.MENU_GROUP_TOGGLE]: CustomEvent<{
        open: boolean;
    }>;
}
/** Events fired by `<esp-menu-item>`. */
export interface EspalierMenuItemEventMap {
    [ESP_EVENTS.CLICKED]: CustomEvent<Record<string, never>>;
}
/** Events fired by `<esp-flyout>`. */
export interface EspalierFlyoutEventMap {
    [ESP_EVENTS.FLYOUT_OPENED]: CustomEvent<Record<string, never>>;
    [ESP_EVENTS.FLYOUT_CLOSED]: CustomEvent<{
        reason: FlyoutCloseReason;
    }>;
    [ESP_EVENTS.FLYOUT_STATE_CHANGED]: CustomEvent<Record<string, never>>;
}
/** Events fired by `<esp-page>`. */
export interface EspalierPageEventMap {
    [ESP_EVENTS.PAGE_WORKSPACE_RESIZE]: CustomEvent<PageWorkspaceResizeDetail>;
}
/** Events fired by `<esp-focus-picker>`. */
export interface EspalierFocusPickerEventMap {
    [ESP_EVENTS.FOCUS_PICKER_CHANGED]: CustomEvent<FocusChangedDetail>;
}
/** Events fired by `<esp-header-button>`. */
export interface EspalierHeaderButtonEventMap {
    [ESP_EVENTS.CLICKED]: CustomEvent<Record<string, never>>;
}
/** Events fired by `<esp-header>`. */
export interface EspalierHeaderEventMap {
    [ESP_EVENTS.HEADER_THEME_TOGGLE]: CustomEvent<EspThemeToggleEventDetail>;
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
    [ESP_EVENTS.INFO_DESTROY]: CustomEvent<DestroyEspalierInfo>;
}
/** Events fired by `<esp-lightbox>`. */
export interface EspalierLightboxEventMap {
    [ESP_EVENTS.LIGHTBOX_CHANGED]: CustomEvent<{
        index: number;
    }>;
}
/**
 * Detail for `esp-image-upload-images-reordered` on `esp-image-upload`.
 *
 * @docUrl /api/images-reordered-detail
 * @menuGroup Event Details
 * @menuLabel ImagesReorderedDetail
 */
export interface ImagesReorderedDetail {
    images: EspalierUploadImage[];
}
/**
 * Detail for `esp-image-upload-files-rejected` on `esp-image-upload`.
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
    [ESP_EVENTS.IMAGE_UPLOAD_FILE_SELECTED]: CustomEvent<UploadEventDetail>;
    [ESP_EVENTS.IMAGE_UPLOAD_FILE_REMOVED]: CustomEvent<EspalierUploadImage>;
    [ESP_EVENTS.IMAGE_UPLOAD_FILES_REJECTED]: CustomEvent<FilesRejectedDetail>;
    [ESP_EVENTS.IMAGE_UPLOAD_RETRY]: CustomEvent<UploadEventDetail>;
    [ESP_EVENTS.IMAGE_UPLOAD_IMAGES_REORDERED]: CustomEvent<ImagesReorderedDetail>;
}
/** Events fired by `<esp-file-upload>`. */
export interface EspalierFileUploadEventMap {
    [ESP_EVENTS.FILE_UPLOAD_FILES_SELECTED]: CustomEvent<FileList>;
}
/** Events fired by `<esp-burger>`. */
export interface EspalierBurgerEventMap {
    [ESP_EVENTS.BURGER_OPENED]: CustomEvent<void>;
    [ESP_EVENTS.BURGER_CLOSED]: CustomEvent<void>;
}
/** Events fired by `<esp-picker-menu>`. */
export interface EspalierPickerMenuEventMap {
    [ESP_EVENTS.PICKER_MENU_SELECTION_CHANGED]: CustomEvent<PickerItem[]>;
    [ESP_EVENTS.PICKER_MENU_CLOSE_REQUESTED]: CustomEvent<PickerItem[]>;
    [ESP_EVENTS.PICKER_MENU_DISMISS_REQUESTED]: CustomEvent<void>;
    [ESP_EVENTS.PICKER_MENU_RANGE_CHANGED]: CustomEvent<{
        first: number;
        last: number;
        items: PickerItem[];
    }>;
}
/**
 * Detail for `esp-search-requested` on `esp-search`.
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
 * Detail for `esp-search-result-selected` on `esp-search`.
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
    [ESP_EVENTS.SEARCH_RESULT_SELECTED]: CustomEvent<ResultSelectedDetail>;
    [ESP_EVENTS.SEARCH_CLOSED]: CustomEvent<Record<string, never>>;
}
/** Events fired by `<esp-tree>`. */
export interface EspalierTreeEventMap {
    [ESP_EVENTS.VALIDITY_CHANGED]: CustomEvent<ValidityChangedDetail>;
    [ESP_EVENTS.TREE_SELECT]: CustomEvent<EspTreeSelectDetail>;
    [ESP_EVENTS.TREE_TOGGLE]: CustomEvent<EspTreeToggleDetail>;
    [ESP_EVENTS.TREE_GRAFT_REQUEST]: CustomEvent<EspTreeGraftRequestDetail>;
    [ESP_EVENTS.TREE_GRAFT]: CustomEvent<EspTreeGraftDetail>;
    [ESP_EVENTS.TREE_EDIT]: CustomEvent<EspTreeEditDetail>;
    [ESP_EVENTS.TREE_DELETE]: CustomEvent<EspTreeNodeActionDetail>;
    [ESP_EVENTS.TREE_MOVE_UP]: CustomEvent<EspTreeNodeActionDetail>;
    [ESP_EVENTS.TREE_MOVE_DOWN]: CustomEvent<EspTreeNodeActionDetail>;
    [ESP_EVENTS.TREE_CUT]: CustomEvent<EspTreeNodeActionDetail>;
    [ESP_EVENTS.TREE_PASTE_CHILD]: CustomEvent<EspTreeNodeActionDetail>;
    [ESP_EVENTS.TREE_GRAFT_INPUT]: CustomEvent<EspTreeGraftInputDetail>;
}
