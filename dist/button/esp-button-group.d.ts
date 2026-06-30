import { LitElement, type PropertyValues } from "lit";
/**
 * Groups related buttons into a visually connected segmented control.
 *
 * Child `esp-button` elements lose their individual border-radius and
 * merge into a continuous strip; the group container provides the outer
 * rounded corners and border.
 *
 * ```html
 * <esp-button-group label="Actions">
 *   <esp-button icon-only icon="save" aria-label="Save"></esp-button>
 *   <esp-button icon-only icon="edit" aria-label="Edit"></esp-button>
 *   <esp-button icon-only icon="trash" aria-label="Delete"></esp-button>
 * </esp-button-group>
 * ```
 *
 * Groups can also contain labelled buttons:
 *
 * ```html
 * <esp-button-group label="Navigation">
 *   <esp-button label="Back" icon="arrow-big-left" collapsed></esp-button>
 *   <esp-button label="Forward" icon="arrow-big-right" collapsed></esp-button>
 * </esp-button-group>
 * ```
 *
 * Buttons can be wrapped in `esp-tooltip` or `esp-popover`:
 *
 * ```html
 * <esp-button-group label="With tooltips">
 *   <esp-tooltip text="Save changes">
 *     <esp-button icon-only icon="save" aria-label="Save"></esp-button>
 *   </esp-tooltip>
 *   <esp-tooltip text="Edit item">
 *     <esp-button icon-only icon="edit" aria-label="Edit"></esp-button>
 *   </esp-tooltip>
 *   <esp-tooltip text="Delete item">
 *     <esp-button icon-only icon="trash" aria-label="Delete"></esp-button>
 *   </esp-tooltip>
 * </esp-button-group>
 * ```
 *
 * When the group has a fixed width and contains more buttons than
 * can fit, horizontal scrolling kicks in:
 *
 * ```html
 * <esp-button-group label="Many actions" style="width: 360px;">
 *   <esp-button icon-only icon="save" aria-label="Save"></esp-button>
 *   <esp-button icon-only icon="edit" aria-label="Edit"></esp-button>
 *   <esp-button icon-only icon="upload" aria-label="Upload"></esp-button>
 *   <esp-button icon-only icon="pin" aria-label="Pin"></esp-button>
 *   <esp-button icon-only icon="cog" aria-label="Settings"></esp-button>
 *   <esp-button icon-only icon="user" aria-label="User"></esp-button>
 *   <esp-button icon-only icon="photo" aria-label="Photo"></esp-button>
 *   <esp-button icon-only icon="rocket" aria-label="Rocket"></esp-button>
 *   <esp-button icon-only icon="code" aria-label="Code"></esp-button>
 *   <esp-button icon-only icon="palette" aria-label="Palette"></esp-button>
 *   <esp-button icon-only icon="wand" aria-label="Wand"></esp-button>
 *   <esp-button icon-only icon="tags" aria-label="Tags"></esp-button>
 * </esp-button-group>
 * ```
 *
 * Add the `toolbar` attribute to opt into the WAI-ARIA toolbar
 * pattern. This changes how the group sits in the tab order: instead of
 * every button being its own tab stop, the whole group becomes a *single*
 * tab stop, and the arrow keys (plus `Home`/`End`) move focus between the
 * buttons inside it. Tabbing into the group lands on one button; the next
 * Tab leaves the group entirely. Use it when a group bundles many actions
 * (for example an editor formatting bar) so keyboard users do not have to
 * Tab through every button.
 *
 * The `esp-input` elements below sit before and after the group so the
 * single-tab-stop behavior is easy to see: Tab from the first input lands
 * on one toolbar button, the arrow keys move between the buttons, and the
 * next Tab jumps straight to the second input.
 *
 * ```html
 * <esp-input value="Before"></esp-input>
 * <esp-button-group toolbar label="Document actions">
 *   <esp-button icon-only icon="save" aria-label="Save"></esp-button>
 *   <esp-button icon-only icon="edit" aria-label="Edit"></esp-button>
 *   <esp-button icon-only icon="upload" aria-label="Upload"></esp-button>
 *   <esp-button icon-only icon="trash" aria-label="Delete"></esp-button>
 * </esp-button-group>
 * <esp-input value="After"></esp-input>
 * ```
 *
 * When a button is wrapped in an `esp-tooltip`, the group sets
 * `trigger-tabindex="-1"` on that tooltip automatically so its wrapper span
 * does not reintroduce a tab stop the roving manager is removing:
 *
 * ```html
 * <esp-input value="Before"></esp-input>
 * <esp-button-group toolbar label="Document actions">
 *   <esp-tooltip text="Save">
 *     <esp-button icon-only icon="save" aria-label="Save"></esp-button>
 *   </esp-tooltip>
 *   <esp-tooltip text="Edit">
 *     <esp-button icon-only icon="edit" aria-label="Edit"></esp-button>
 *   </esp-tooltip>
 *   <esp-tooltip text="Upload">
 *     <esp-button icon-only icon="upload" aria-label="Upload"></esp-button>
 *   </esp-tooltip>
 * </esp-button-group>
 * <esp-input value="After"></esp-input>
 * ```
 *
 * @customElement esp-button-group
 * @slot - One or more `esp-button`, `esp-tooltip`, or `esp-popover` elements containing an `esp-button`.
 *
 * @cssprop --esp-button-group-divider - The border style between grouped buttons. Defaults to `1px dotted var(--esp-color-border)`.
 *
 * @docPageTitle Button Group
 * @docUrl /components/button-group
 * @menuGroup Interaction
 * @menuLabel Button Group
 * @menuIcon button
 */
export declare class EspalierButtonGroup extends LitElement {
    /**
     * Accessible label for the group. Screen readers announce this
     * so users understand the purpose of the grouped buttons.
     */
    label: string;
    /**
     * Opt into the WAI-ARIA toolbar pattern. When set, the group renders
     * with `role="toolbar"`, becomes a single tab stop (roving tabindex),
     * and the arrow keys, `Home`, and `End` move focus between the
     * enabled buttons. When unset, every button remains an independent
     * tab stop and behavior is unchanged.
     *
     * @type {boolean}
     */
    toolbar: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(): void;
    protected updated(changed: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-button-group": EspalierButtonGroup;
    }
}
