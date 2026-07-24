import { LitElement } from "lit";
/**
 * Used to focus content modally. By default, on large screens the
 * dialog content is centered horizontally near the top of the
 * screen. On small screens, the content always tries to take up
 * the full screen width.
 *
 * When opened, the dialog:
 * - Moves focus to the first `[autofocus]` element inside the slotted
 *   content, then the first focusable element (or the dialog container
 *   itself if none is found).
 * - Traps focus so that `Tab` and `Shift+Tab` cycle only through
 *   elements inside the dialog.
 * - Closes when the user presses `Escape`.
 * - Marks all sibling content as `inert` to prevent screen reader
 *   and keyboard access to the page behind the overlay.
 * - Restores focus to the element that was focused before the
 *   dialog was opened.
 *
 * @slot - Place content to show modally in the default slot.
 *
 * ```html
 * <esp-dialog>
 *   <esp-box>
 *     <h2>Showing something</h2>
 *     <p>There could be controls or a confirmation or anything here.</p>
 *     <esp-button variant="danger" label="Close"></esp-button>
 *   </esp-box>
 * </esp-dialog>
 * <esp-button label="Show Dialog"></esp-button>
 * <script>
 *   const theDialog = findByTagName("esp-dialog")[0];
 *   const buttons = findByTagName("esp-button");
 *   buttons[0].addEventListener("clicked", () => {
 *     theDialog.toggleOpen();
 *   });
 *   buttons[1].addEventListener("clicked", () => {
 *     theDialog.toggleOpen();
 *   });
 * </script>
 * ```
 *
 * Dialogs work well as containers for complex forms. Picker menus,
 * inputs, and other interactive controls render correctly inside
 * the dialog overlay.
 *
 * ```html
 * <esp-dialog>
 *   <esp-box>
 *     <h2>Add Item</h2>
 *     <esp-form-item label="Name" autofocus>
 *       <esp-input placeholder="Enter a name"></esp-input>
 *     </esp-form-item>
 *     <esp-form-item label="Category">
 *       <esp-pick-one placeholder="Choose a category">
 *         <esp-picker-item text="Electronics" value="electronics"></esp-picker-item>
 *         <esp-picker-item text="Clothing" value="clothing"></esp-picker-item>
 *         <esp-picker-item text="Books" value="books"></esp-picker-item>
 *         <esp-picker-item text="Home & Garden" value="home-garden"></esp-picker-item>
 *       </esp-pick-one>
 *     </esp-form-item>
 *     <esp-form-item label="Notes">
 *       <esp-textarea placeholder="Optional notes"></esp-textarea>
 *     </esp-form-item>
 *     <esp-button variant="success" label="Save"></esp-button>
 *     <esp-button variant="danger" label="Cancel"></esp-button>
 *   </esp-box>
 * </esp-dialog>
 * <esp-button label="Open Form"></esp-button>
 * <script>
 *   const dialog = findByTagName("esp-dialog")[0];
 *   const buttons = findByTagName("esp-button");
 *   const openBtn = buttons[buttons.length - 1];
 *   const cancelBtn = buttons[1];
 *   openBtn.addEventListener("clicked", () => {
 *     dialog.toggleOpen();
 *   });
 *   cancelBtn.addEventListener("clicked", () => {
 *     dialog.toggleOpen();
 *   });
 * </script>
 * ```
 *
 * @event {CustomEvent<{}>} esp-dialog-opened - Fired after the dialog
 * has been promoted to its final DOM position, rendered, and focus
 * has moved in. Safe to initialize third-party widgets (e.g. Stripe
 * Elements) or measure layout at this point.
 *
 * @event {CustomEvent<{ reason: "escape" | "close-dialog" | "api" }>} esp-dialog-closing -
 * Fired before the dialog begins closing.
 * Call `event.preventDefault()` to cancel the close (e.g. for
 * unsaved-changes confirmation). The `reason` indicates what
 * triggered the close: `"escape"` for the Escape key,
 * `"close-dialog"` for a `closeDialog` event from slotted content
 * (typically `<esp-form method="dialog">`), or `"api"` for a
 * direct `toggleOpen()` call.
 *
 * @event {CustomEvent<{ reason: "escape" | "close-dialog" | "api" }>} esp-dialog-closed -
 * Fired after the dialog has fully closed,
 * inert state has been restored, and focus has returned to the
 * previously focused element. Safe to tear down resources.
 *
 * @cssprop --esp-color-dialog-bg - The background color of the dialog overlay.
 * @cssprop --esp-dialog-bg-opacity - The opacity of the dialog overlay background.
 * @customElement esp-dialog
 * @docPageTitle Dialog
 * @docUrl /components/dialog
 * @menuGroup Structure
 * @menuOrder 6
 * @menuLabel Dialog
 * @menuIcon focus-centered
 */
export declare class EspalierDialog extends LitElement {
    /**
     * If true, the dialog will take up the full screen. On
     * small screens, the dialog will always be full screen.
     *
     * ```html
     * <esp-dialog full-screen>
     *   <esp-box full-screen>
     *     <h2>Full screen dialog</h2>
     *     <p>There could be controls or a confirmation or anything here.</p>
     *     <esp-button variant="danger" label="Close"></esp-button>
     *   </esp-box>
     * </esp-dialog>
     * <esp-button label="Show Dialog"></esp-button>
     * <script>
     *   const theDialog = findByTagName("esp-dialog")[0];
     *   const buttons = findByTagName("esp-button");
     *   buttons[0].addEventListener("clicked", () => {
     *     theDialog.toggleOpen();
     *   });
     *   buttons[1].addEventListener("clicked", () => {
     *     theDialog.toggleOpen();
     *   });
     * </script>
     * ```
     *
     * @type {boolean}
     */
    fullScreen: boolean;
    /**
     * Show or hide the dialog content. When opening, focus moves
     * into the dialog and sibling content is marked `inert`. When
     * closing, focus is restored to the element that was focused
     * before the dialog opened.
     *
     * Dispatches lifecycle events:
     * - `esp-dialog-opened` after the dialog is fully rendered and
     *   focus has moved in.
     * - `esp-dialog-closing` (cancelable) before the close begins.
     * - `esp-dialog-closed` after the close completes.
     */
    toggleOpen(): void;
    protected firstUpdated(): void;
    disconnectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-dialog": EspalierDialog;
    }
}
