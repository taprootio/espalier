import { LitElement } from "lit";
/**
 * Shows content in a modal dialog. By default, on large screens the
 * dialog content is centered horizontally near the top of the
 * screen. On small screens, the content always tries to take up
 * the full screen width.
 *
 * A field fills one layer above the surface it sits on.
 * Use `surface-layer="1|2|3|4"` to select the default painted layer.
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
 * ### Bounded dialog
 *
 * A dialog covers the whole viewport by default. Set the four inset custom
 * properties on the `esp-dialog` host to confine it to a rectangle and leave
 * the rest of the page visible, for example to keep a header or a live preview
 * on screen while a full-screen editor is open. The vellum (the dialog's
 * scrolling surface) and its backdrop paint only inside the rectangle, and a
 * slotted `esp-box full-screen` fills exactly that rectangle.
 *
 * The insets are lengths (`0px`, `4rem`, `var(--header-height)`), not unitless
 * numbers, and they are measured from the viewport edges. They are logical, so
 * "inline start" is the left edge in left-to-right text and the right edge in
 * right-to-left text. Because custom properties inherit, a dialog nested inside
 * a bounded dialog's markup is bounded the same way unless it sets its own
 * insets.
 *
 * Bounds change only where the dialog paints. What stays reachable is decided
 * by the same rules as an unbounded dialog:
 *
 * - The dialog has no click-outside dismissal, bounded or not. It closes on
 *   `Escape`, an `esp-form-dialog-close-requested` event, or `toggleOpen()`, so
 *   a click on the uncovered region never counts as an "outside" click.
 * - The dialog marks `inert` the siblings of its anchor element, not the
 *   regions its bounds leave uncovered. The anchor is `esp-page`'s dialog drop
 *   zone when the dialog sits in the page's markup, so there the page's
 *   internal tracks (header, menus, preview, help, footer) are inert and not
 *   clickable even where the dialog does not cover them. A dialog that is a
 *   direct child of another component's shadow root is anchored on the nearest
 *   ancestor host that has a light-DOM parent, and only that host's siblings
 *   go inert; the page around it stays live. A dialog wrapped in an element
 *   inside that shadow root is anchored on itself, so its siblings in the
 *   wrapper go inert instead.
 * - A region that is not inert receives clicks and keyboard focus. The focus
 *   trap wraps `Tab` and `Shift+Tab` at the dialog's first and last focusable
 *   elements, and `Escape` is handled on the dialog, both only while focus is
 *   inside it. A click on an uncovered control moves focus there, and from then
 *   on `Tab` continues through the page and `Escape` no longer closes the
 *   dialog. Set `inert` on the uncovered regions that must not be reachable
 *   while the dialog is open (an inert region is also skipped by screen
 *   readers).
 * - Bounds assume a horizontal writing mode: the insets are logical, but the
 *   dialog's width and height are physical.
 *
 * ```html
 * <style>
 *   esp-dialog.bounded {
 *     --esp-dialog-inset-block-start: 6rem;
 *     --esp-dialog-inset-inline-start: 3rem;
 *     --esp-dialog-inset-inline-end: 3rem;
 *     --esp-dialog-inset-block-end: 2rem;
 *   }
 * </style>
 * <esp-dialog class="bounded" full-screen>
 *   <esp-box full-screen>
 *     <h2>Bounded dialog</h2>
 *     <p>The page above and around this box stays visible.</p>
 *     <esp-button intent="danger" label="Close"></esp-button>
 *   </esp-box>
 * </esp-dialog>
 * <esp-button label="Show Dialog"></esp-button>
 * <script>
 *   const theDialog = findByTagName("esp-dialog")[0];
 *   const buttons = findByTagName("esp-button");
 *   buttons[0].addEventListener("esp-clicked", () => {
 *     theDialog.toggleOpen();
 *   });
 *   buttons[1].addEventListener("esp-clicked", () => {
 *     theDialog.toggleOpen();
 *   });
 * </script>
 * ```
 *
 * @slot - Place content to show modally in the default slot.
 *
 * ```html
 * <esp-dialog>
 *   <esp-box>
 *     <h2>Showing something</h2>
 *     <p>There could be controls or a confirmation or anything here.</p>
 *     <esp-button intent="danger" label="Close"></esp-button>
 *   </esp-box>
 * </esp-dialog>
 * <esp-button label="Show Dialog"></esp-button>
 * <script>
 *   const theDialog = findByTagName("esp-dialog")[0];
 *   const buttons = findByTagName("esp-button");
 *   buttons[0].addEventListener("esp-clicked", () => {
 *     theDialog.toggleOpen();
 *   });
 *   buttons[1].addEventListener("esp-clicked", () => {
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
 *     <esp-button intent="success" label="Save"></esp-button>
 *     <esp-button intent="danger" label="Cancel"></esp-button>
 *   </esp-box>
 * </esp-dialog>
 * <esp-button label="Open Form"></esp-button>
 * <script>
 *   const dialog = findByTagName("esp-dialog")[0];
 *   const buttons = findByTagName("esp-button");
 *   const openBtn = buttons[buttons.length - 1];
 *   const cancelBtn = buttons[1];
 *   openBtn.addEventListener("esp-clicked", () => {
 *     dialog.toggleOpen();
 *   });
 *   cancelBtn.addEventListener("esp-clicked", () => {
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
 * `"close-dialog"` for a `esp-form-dialog-close-requested` event from slotted content
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
 * @cssprop --esp-dialog-inset-block-start - The top edge of the area the dialog covers, as a length from the viewport top. Defaults to `0px`.
 * @cssprop --esp-dialog-inset-inline-start - The leading edge (left in left-to-right text) of the area the dialog covers, as a length from the viewport edge. Defaults to `0px`.
 * @cssprop --esp-dialog-inset-inline-end - The trailing edge (right in left-to-right text) of the area the dialog covers, as a length from the viewport edge. Defaults to `0px`.
 * @cssprop --esp-dialog-inset-block-end - The bottom edge of the area the dialog covers, as a length from the viewport bottom. Defaults to `0px`.
 * @attr {"1"|"2"|"3"|"4"} surface-layer - Declares the painted surface depth; defaults to layer 3.
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
     *     <esp-button intent="danger" label="Close"></esp-button>
     *   </esp-box>
     * </esp-dialog>
     * <esp-button label="Show Dialog"></esp-button>
     * <script>
     *   const theDialog = findByTagName("esp-dialog")[0];
     *   const buttons = findByTagName("esp-button");
     *   buttons[0].addEventListener("esp-clicked", () => {
     *     theDialog.toggleOpen();
     *   });
     *   buttons[1].addEventListener("esp-clicked", () => {
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
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-dialog": EspalierDialog;
    }
}
