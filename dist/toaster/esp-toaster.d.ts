import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A toast notification container that listens for `"show-toast"`
 * events on `EspBus` and renders them as stacked `esp-info`
 * components. Place one `<esp-toaster>` in your page layout
 * (it is included automatically inside `<esp-page>`).
 *
 * If more than one toaster is connected — for example a page that
 * nests several `<esp-page>`s, each of which injects its own — all
 * toasts live in one shared stack rendered by a single toaster, so
 * each `showToast()` renders once, not once per toaster. The renderer
 * is re-chosen whenever a toast arrives, a toaster connects or
 * disconnects, or a toaster's size collapses or expands, preferring a
 * **visible** instance, and the whole live stack migrates with it —
 * a hidden toaster never swallows toasts, and the stack never
 * fragments across instances. This needs no configuration.
 *
 * The migration timing contract: routing always skips instances
 * hidden by `display`, `visibility`, `opacity: 0`, or
 * `content-visibility` at decision time, and a live stack re-routes
 * **immediately** when its renderer is collapsed via `display` (the
 * collapse resizes the toaster, which is observed). A pure
 * `visibility` or `opacity` flip produces no resize, so an
 * already-rendered stack under one re-routes on the **next** toast,
 * connect/disconnect, or resize instead. (The related `esp-flyout`
 * uses an explicit `standalone` opt-out rather than routing, because
 * its instances are distinct surfaces you target individually.)
 *
 * Toasts auto-dismiss after their `duration` (default 5 seconds).
 * A duration of `0` creates a persistent toast that the user must
 * dismiss manually.
 *
 * ```ts
 * import { showToast } from "@taprootio/espalier";
 *
 * showToast({ message: "Saved!", variant: "success" });
 * showToast({ message: "Connection lost", variant: "danger", duration: 0 });
 * ```
 *
 * Try it out — type a message and click a button to fire a toast:
 *
 * ```html
 * <esp-box>
 *   <h3>Toast Playground</h3>
 *   <div style="display: flex; flex-wrap: wrap; gap: var(--esp-size-small); align-items: end;">
 *     <esp-form-item label="Message" style="flex: 1; min-width: 200px;">
 *       <esp-input id="toast-msg" value="Hello from the toaster!"></esp-input>
 *     </esp-form-item>
 *     <esp-form-item label="Duration (seconds)" style="width: 160px;">
 *       <esp-input id="toast-dur" value="5" type="number"></esp-input>
 *     </esp-form-item>
 *   </div>
 *   <div style="display: flex; flex-wrap: wrap; gap: var(--esp-size-small); margin-top: var(--esp-size-small);">
 *     <esp-button id="fire-toast" label="Show Toast" variant="primary" collapsed></esp-button>
 *     <esp-button id="fire-persistent" label="Show Persistent Toast" variant="warning" collapsed></esp-button>
 *     <esp-button id="fire-success" label="Success!" variant="success" collapsed></esp-button>
 *     <esp-button id="fire-danger" label="Error!" variant="danger" collapsed></esp-button>
 *   </div>
 * </esp-box>
 * <script>
 *   const msgInput = findById("toast-msg");
 *   const durInput = findById("toast-dur");
 *   findById("fire-toast").addEventListener("clicked", () => {
 *     showToast({
 *       message: msgInput.value,
 *       duration: Number(durInput.value) || 5,
 *       icon: "bread"
 *     });
 *   });
 *   findById("fire-persistent").addEventListener("clicked", () => {
 *     showToast({
 *       message: msgInput.value,
 *       duration: 0,
 *       icon: "bread",
 *       variant: "warning"
 *     });
 *   });
 *   findById("fire-success").addEventListener("clicked", () => {
 *     showToast({
 *       message: "Operation completed successfully!",
 *       variant: "success",
 *       icon: "bread"
 *     });
 *   });
 *   findById("fire-danger").addEventListener("clicked", () => {
 *     showToast({
 *       message: "Something went wrong!",
 *       variant: "danger",
 *       duration: 0,
 *       icon: "bread"
 *     });
 *   });
 * </script>
 * ```
 *
 * @cssprop --esp-toaster-z-index - Stack order of the toaster
 * container. Defaults to `5000`.
 * @cssprop --esp-toaster-gap - Gap between stacked toasts.
 * Defaults to `var(--esp-size-tiny-to-small)`.
 * @cssprop --esp-toaster-padding - Padding around the toaster
 * container. Defaults to `var(--esp-size-padding)`.
 *
 * @docPageTitle Toaster
 * @docUrl /components/toaster
 * @menuGroup Feedback
 * @menuLabel Toaster
 * @menuIcon bread
 */
export declare class EspalierToaster extends EspalierElementBase {
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-toaster": EspalierToaster;
    }
}
