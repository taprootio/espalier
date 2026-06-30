import { type PropertyValues, type TemplateResult } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { FormFieldController } from "../shared/form-field-controller.js";
import "../box/esp-box.js";
import "../action-menu/esp-action-menu.js";
import "../button/esp-button.js";
import "../dialog/esp-dialog.js";
import "../form-item/esp-form-item.js";
import "../info/esp-info.js";
import "../input/esp-input.js";
import "./esp-tree-item.js";
/**
 * A node in the data-driven `nodes` API. Each node contributes one
 * path segment beneath the tree's root; with the default web path
 * builder, a selected child value looks like `/weddings/2026`.
 */
export interface EspTreeNode {
    /** Stable identity for the node. */
    id: string;
    /** The path segment this node contributes below its parent. */
    segment: string;
    /**
     * Opaque host-owned data carried through tree events. The same
     * reference is surfaced on events; the tree never copies or reads it.
     */
    data?: unknown;
    /** Display label. Falls back to `segment` when omitted. */
    label?: string;
    /** Optional icon name from the configured Espalier SVG sprite. */
    icon?: string;
    /** Whether the node can be selected. Defaults to `true`. */
    selectable?: boolean;
    /** Whether the node exposes an edit affordance. Defaults to `false`. */
    editable?: boolean;
    /** Whether the node exposes a delete action. Defaults to `false`. */
    deletable?: boolean;
    /** Whether the node exposes a move-up action. Defaults to `false`. */
    movableUp?: boolean;
    /** Whether the node exposes a move-down action. Defaults to `false`. */
    movableDown?: boolean;
    /** Whether the node exposes a cut action. Defaults to `false`. */
    cuttable?: boolean;
    /** Whether the node can receive a paste-as-child action. Defaults to `false`. */
    pasteChildTarget?: boolean;
    /** Eagerly-provided children. */
    children?: EspTreeNode[];
    /** Marks a branch whose children load lazily via `loadChildren`. */
    hasChildren?: boolean;
}
/** Argument passed to the async `loadChildren` callback. */
export interface EspTreeLoadContext {
    id: string;
    segment: string;
    data?: unknown;
    label: string;
    path: string;
    level: number;
}
/** Callback that lazy-loads the children of a `hasChildren` branch. */
export type EspTreeLoadChildren = (node: EspTreeLoadContext) => Promise<EspTreeNode[]>;
export interface EspTreeSelectDetail {
    path: string;
    node: EspTreeNode;
}
export interface EspTreeToggleDetail {
    path: string;
    node: EspTreeNode;
    open: boolean;
}
export interface EspTreeGraftDetail {
    parentPath: string;
    segment: string;
    path: string;
    node: EspTreeNode;
}
export interface EspTreeGraftRequestDetail {
    parentPath: string;
    parentNode: EspTreeNode | null;
}
export interface EspTreeNodeActionDetail {
    path: string;
    node: EspTreeNode;
}
export type EspTreeEditDetail = EspTreeNodeActionDetail;
export interface EspTreeGraftInputDetail {
    parentPath: string;
    /** The raw, un-normalized text the user typed. */
    raw: string;
    /** The normalized, slug-valid segment derived from `raw`. */
    segment: string;
    /** The would-be full path if this graft were committed. */
    path: string;
    /** The component's offline verdict for `segment`. */
    valid: boolean;
    /** `""`, `"empty"`, or `"duplicate"` — the offline rejection reason. */
    reason: GraftReason;
}
type GraftReason = "" | "empty" | "duplicate";
export interface EspTreePathBuilderContext {
    parentPath: string;
    segment: string;
    node: EspTreeNode;
    parentNode: EspTreeNode | null;
    rootPath: string;
}
export type EspTreePathBuilder = (context: EspTreePathBuilderContext) => string;
export interface EspTreeSegmentNormalizerContext {
    raw: string;
    parentPath: string;
}
export type EspTreeSegmentNormalizer = (context: EspTreeSegmentNormalizerContext) => string;
/**
 * Normalize free text to a conservative, offline-validatable web-path
 * segment: lowercase ASCII `[a-z0-9-]`, runs of any other character
 * collapsed to a single hyphen, with leading/trailing hyphens trimmed.
 *
 * This is a deliberately conservative subset. The server's slugifier
 * remains the source of truth at save time; this only keeps users from
 * building an obviously invalid path offline.
 */
export declare function normalizeSegment(raw: string): string;
export declare function buildWebTreePath({ parentPath, segment, rootPath, }: EspTreePathBuilderContext): string;
/**
 * A form-associated hierarchy primitive for displaying and selecting
 * from a slug-structured tree — a folder/path picker, a category
 * chooser, or any place a flat field should become an expandable tree.
 * For static declarative node definitions, see
 * [`<esp-tree-item>`](/components/tree/item/).
 *
 * The name is apt: an espalier is a tree trained flat against a frame,
 * so the visual language — branches trained to vertical guide wires,
 * grafting a new shoot onto an existing limb — is the component's own
 * metaphor.
 *
 * ## Data-driven first, composition-capable
 *
 * Bind a hierarchy to the `nodes` property for the primary, data-driven
 * API. For static trees, nest
 * [`<esp-tree-item>`](/components/tree/item) children instead — they are
 * parsed into the same model, so the keyboard and accessibility model is
 * identical either way. When both are supplied, `nodes` wins. Data-driven
 * nodes must provide stable, unique `id` values; the tree keys expansion,
 * lazy loading, focus, and host re-feeds by `id` so relabeling or moving a
 * node can change its path without changing its identity.
 *
 * ```html
 * <esp-form-item label="Folder">
 *   <esp-tree name="folder" required></esp-tree>
 * </esp-form-item>
 * <script>
 *   const tree = findByTagName("esp-tree")[0];
 *   tree.nodes = [
 *     { id: "weddings", segment: "weddings", label: "Weddings", children: [
 *       { id: "w2026", segment: "2026", label: "2026" },
 *     ] },
 *     { id: "portraits", segment: "portraits", label: "Portraits" },
 *   ];
 * </script>
 * ```
 *
 * Nodes may also carry opaque host data. The tree never reads into `data`;
 * it carries the value through select, edit, toggle, and graft events so a
 * host can round-trip its own model without a side lookup.
 *
 * ```html
 * <esp-tree id="navigation"></esp-tree>
 * <script>
 *   const tree = findById("navigation");
 *   tree.nodes = [
 *     {
 *       id: "nav-about",
 *       segment: "about",
 *       label: "About Us",
 *       data: { target: { kind: "page", pageId: "about-us" } },
 *       editable: true,
 *     },
 *   ];
 *   tree.addEventListener("esp-tree-select", (event) => {
 *     console.log(event.detail.node.id, event.detail.node.data);
 *   });
 * </script>
 * ```
 *
 * ## Selection and form value
 *
 * Single-select for v1. Clicking a selectable row selects it; selecting
 * a branch opens it, and clicking an already-selected branch toggles it
 * open or closed. Selecting a row outside the open selected branch
 * collapses that branch unless `keep-expanded` is set. Branches can also
 * expand and collapse through the leading icon button or with keyboard:
 * `ArrowRight` expands closed branches first, then focuses a row's
 * trailing action button when one is present; `ArrowLeft` collapses or
 * moves to the parent. `Enter` and `Space` select the focused row. The
 * submitted form value is the selected node's full path
 * (defaulting to root-inclusive web paths like `/weddings/2026`), or
 * `null` when nothing is selected. The root row is always present,
 * defaults to label and path `/`, and is selectable by default; set
 * `root-selectable="false"` when the root should be navigation-only.
 * Validity reflects the committed selection through the standard
 * Espalier form flow.
 *
 * ## Lazy loading
 *
 * Mark a branch with `hasChildren` and set the `loadChildren` callback to
 * fetch its children on first expand. Expansion state is stable across
 * re-renders and reloads.
 *
 * ```html
 * <esp-tree id="lazy"></esp-tree>
 * <script>
 *   const tree = findById("lazy");
 *   tree.nodes = [{ id: "root", segment: "library", label: "Library", hasChildren: true }];
 *   tree.loadChildren = async () => {
 *     const res = await fetch("/assets/data/tree-library-children.json");
 *     return await res.json();
 *   };
 * </script>
 * ```
 *
 * ## Grafting a new branch
 *
 * Set `allow-graft` to expose inline `+` affordances at the level where
 * a new child would appear. Clicking one opens the built-in graft
 * dialog, which shows the parent and resulting path while the value is
 * normalized to a valid web-path segment. Enter commits, Escape
 * cancels. Keyboard users can press `Insert` on the focused row to add
 * beneath it. Newly grafted branches are ephemeral client state the
 * host reads back via events — the component persists nothing.
 *
 * ```html
 * <esp-tree id="graftable" allow-graft></esp-tree>
 * <script>
 *   const tree = findById("graftable");
 *   tree.nodes = [
 *     { id: "weddings", segment: "weddings", label: "Weddings", children: [
 *       { id: "w2026", segment: "2026", label: "2026" },
 *     ] },
 *     { id: "portraits", segment: "portraits", label: "Portraits" },
 *   ];
 *   tree.addEventListener("esp-tree-graft", (e) => {
 *     console.log("grafted", e.detail.path);
 *   });
 * </script>
 * ```
 *
 * As the input changes, the tree emits a live `esp-tree-graft-input`
 * event. A consumer can run an async check the offline component cannot
 * (most importantly a server-side duplicate not present in the loaded
 * children) and push the result back with `setGraftError(message)`; the
 * tree then shows it inline and blocks the commit until it is cleared.
 * For advanced add flows, listen for the cancelable
 * `esp-tree-graft-request` event and call `preventDefault()` to skip
 * the default dialog.
 *
 * Replace the `buildPath` property to use non-web path semantics, and
 * replace `normalizeGraftSegment` to loosen, tighten, or completely
 * skip the default web-slug normalization used by the graft dialog.
 *
 * ## Node actions
 *
 * Mark a node with `editable: true` to render an edit action on the
 * trailing side of the row. Clicking it, or pressing `F2` on the
 * focused row, emits `esp-tree-edit` with the node path and public node
 * data so the host can open its own editor. Optional flags
 * (`deletable`, `movableUp`, `movableDown`, `cuttable`, and
 * `pasteChildTarget`) expose the matching built-in editing actions for
 * host-owned tree workflows.
 *
 * If a row has exactly one action, the tree renders one trailing
 * icon-only `esp-button` with an accessible label such as `Edit About`.
 * If a row has more than one action, the actions collapse into one
 * trailing `esp-action-menu` trigger so rows never accumulate multiple
 * visible action buttons. The tree only emits events — it does not
 * delete, move, cut, paste, mutate source nodes, or own clipboard state.
 *
 * ```html
 * <esp-tree id="navigation"></esp-tree>
 * <script>
 *   const tree = findById("navigation");
 *   tree.nodes = [
 *     {
 *       id: "about",
 *       segment: "about",
 *       label: "About",
 *       editable: true,
 *       deletable: true,
 *       movableDown: true,
 *       cuttable: true,
 *       children: [
 *         {
 *           id: "team",
 *           segment: "team",
 *           label: "Team",
 *           editable: true,
 *         },
 *       ],
 *     },
 *     {
 *       id: "services",
 *       segment: "services",
 *       label: "Services",
 *       pasteChildTarget: true,
 *     },
 *   ];
 *   tree.addEventListener("esp-tree-cut", (event) => {
 *     console.log("cut requested", event.detail.path);
 *   });
 *   tree.addEventListener("esp-tree-paste-child", (event) => {
 *     console.log("paste as child requested", event.detail.path);
 *   });
 * </script>
 * ```
 *
 * ## Expand/collapse icon
 *
 * The expand/collapse caret ships inline with the component, so unlike
 * node `icon`s it needs no icon sprite to be hosted. Override it by
 * setting the `expandIcon` property to your own (trusted) SVG markup; it
 * renders on every branch toggle and is rotated 90° when the branch is
 * open, so provide a right-pointing icon. For icon pairs that should not
 * rotate, set `collapseIcon` to the trusted SVG markup to use while the
 * branch is open.
 *
 * ```html
 * <esp-tree id="custom-caret"></esp-tree>
 * <script>
 *   const tree = findById("custom-caret");
 *   tree.nodes = [
 *     { id: "weddings", segment: "weddings", label: "Weddings", children: [
 *       { id: "w2026", segment: "2026", label: "2026" },
 *     ] },
 *   ];
 *   // A filled triangle caret instead of the default outline chevron.
 *   tree.expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
 *     fill="currentColor" stroke="none"><path d="M9 6l6 6l-6 6z" /></svg>`;
 * </script>
 * ```
 *
 * @slot - Optional static `esp-tree-item` children describing the tree.
 *
 * @cssprop --esp-tree-indent-step - Horizontal indent added per nesting level. Defaults to `1.25rem`.
 * @cssprop --esp-tree-guide-color - Color of the branch guide path. Defaults to `var(--esp-color-border)`.
 * @cssprop --esp-tree-node-padding - Vertical padding of each node row. Defaults to `var(--esp-size-small)`.
 * @cssprop --esp-tree-action-size - Hit target size for tree icon actions. Defaults to `1.75rem`.
 * @cssprop --esp-tree-row-bg - Background color of an unselected row. Defaults to `var(--esp-color-layer-1)`.
 * @cssprop --esp-tree-row-border-color - Border color of an unselected row. Defaults to `var(--esp-color-border)`.
 * @cssprop --esp-tree-action-bg - Background color of the expand/collapse action rail. Defaults to a derived layer color.
 * @cssprop --esp-tree-action-hover-bg - Hover background color of the expand/collapse action rail. Defaults to `var(--esp-color-layer-2)`.
 * @cssprop --esp-tree-hover-bg - Background color of a node row on hover. Defaults to `var(--esp-color-layer-2)`.
 * @cssprop --esp-tree-selected-bg - Background color of the selected node row. Defaults to `var(--esp-color-layer-3)`.
 * @cssprop --esp-tree-icon-color - Color of the expand/collapse action and node icons. Defaults to `var(--esp-color-headings)`.
 *
 * @event {CustomEvent<EspTreeSelectDetail>} esp-tree-select - Fired when a node is selected.
 * @event {CustomEvent<EspTreeToggleDetail>} esp-tree-toggle - Fired when a branch is expanded or collapsed.
 * @event {CustomEvent<EspTreeGraftRequestDetail>} esp-tree-graft-request - Cancelable event fired before the default graft dialog opens.
 * @event {CustomEvent<EspTreeGraftDetail>} esp-tree-graft - Fired when a new branch is committed.
 * @event {CustomEvent<EspTreeEditDetail>} esp-tree-edit - Fired when an editable node's edit affordance is invoked.
 * @event {CustomEvent<EspTreeNodeActionDetail>} esp-tree-delete - Fired when a deletable node's delete action is invoked.
 * @event {CustomEvent<EspTreeNodeActionDetail>} esp-tree-move-up - Fired when a movable-up node's move-up action is invoked.
 * @event {CustomEvent<EspTreeNodeActionDetail>} esp-tree-move-down - Fired when a movable-down node's move-down action is invoked.
 * @event {CustomEvent<EspTreeNodeActionDetail>} esp-tree-cut - Fired when a cuttable node's cut action is invoked.
 * @event {CustomEvent<EspTreeNodeActionDetail>} esp-tree-paste-child - Fired when a paste child target node's paste-as-child action is invoked.
 * @event {CustomEvent<EspTreeGraftInputDetail>} esp-tree-graft-input - Fired live as the graft input changes.
 *
 * @docPageTitle Tree
 * @docUrl /components/tree
 * @menuGroup Form Controls
 * @menuLabel Tree
 * @menuIcon sitemap
 */
export declare class EspalierTree extends EspalierElementBase {
    static formAssociated: boolean;
    protected internals: ElementInternals;
    protected formCtrl: FormFieldController;
    /**
     * The hierarchy to display, as the primary data-driven API. When
     * non-empty this takes precedence over slotted `esp-tree-item`
     * children.
     *
     * @type {Array<EspTreeNode>}
     */
    nodes: EspTreeNode[];
    /**
     * The selected node's full path (segments joined by `/`), or the
     * empty string when nothing is selected. This is also the form
     * submission value.
     *
     * @type {string}
     */
    value: string;
    /**
     * The name used when the tree participates in a `<form>`.
     *
     * @type {string}
     */
    name: string;
    /**
     * When true, a selection must be made before the form can submit.
     *
     * @type {boolean}
     */
    required: boolean;
    /**
     * A custom message shown when the tree is required but nothing is
     * selected. Defaults to `"Please select an option."`.
     *
     * @type {string}
     */
    requiredMessage: string;
    /**
     * When true, the tree is disabled and cannot be interacted with.
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * When true, an inline `+` affordance is shown on every node and at
     * the root for grafting a new child branch.
     *
     * @type {boolean}
     */
    allowGraft: boolean;
    /**
     * Label shown for the always-rendered root ancestor row.
     *
     * @type {string}
     */
    rootLabel: string;
    /**
     * Path submitted when the root row is selected. Defaults to `/`.
     *
     * @type {string}
     */
    rootPath: string;
    /**
     * Whether the root row can be selected. Defaults to true. Set
     * `root-selectable="false"` to make it navigation-only.
     *
     * @type {boolean}
     */
    rootSelectable: boolean;
    /**
     * An accessible name for the tree. Usually unnecessary inside an
     * `esp-form-item`, which provides the label; set it for standalone
     * use.
     *
     * @type {string}
     */
    label: string;
    /**
     * A consumer-supplied error for the in-progress graft, shown inline
     * and blocking commit until cleared. Set it with `setGraftError`,
     * typically in response to an `esp-tree-graft-input` event after an
     * async check. Mirrored as the `graft-error` attribute.
     *
     * @type {string | null}
     */
    graftError: string | null;
    /**
     * Async callback to lazy-load the children of a branch marked
     * `hasChildren`, on first expand.
     *
     * @type {EspTreeLoadChildren}
     */
    loadChildren?: EspTreeLoadChildren;
    /**
     * Builds a child path from a parent path and segment. Defaults to a
     * web URL style builder (`/parent/child`) and can be replaced for
     * filesystem or application-specific path semantics.
     */
    buildPath: EspTreePathBuilder;
    /**
     * Normalizes graft input into the segment passed to `buildPath`.
     * Defaults to `normalizeSegment`; replace it to allow a different
     * character set or no client-side normalization.
     */
    normalizeGraftSegment: EspTreeSegmentNormalizer;
    /**
     * Keep already-expanded branches open when selecting a row outside of
     * the selected branch. By default, selecting outside an open selected
     * branch collapses that branch.
     *
     * @type {boolean}
     */
    keepExpanded: boolean;
    /**
     * Raw SVG markup for the expand/collapse caret. Defaults to an
     * inline Tabler-style caret, so the tree ships its own icon and the
     * host does not need to provide an icon sprite for it. Leave it empty
     * to use the built-in caret, or set it to trusted SVG markup to use a
     * different icon. It is rendered on every branch's toggle button and
     * rotated 90° when the branch is expanded unless `collapseIcon` is
     * set, so supply a right-pointing icon.
     *
     * @type {string}
     */
    expandIcon: string;
    /**
     * Optional raw SVG markup shown while the branch is open (expanded),
     * in place of rotating `expandIcon`. This allows non-rotatable glyph
     * pairs such as `+` and `-`. Leave unset to preserve the default
     * rotate-90° behavior.
     *
     * @type {string}
     */
    collapseIcon: string;
    protected willUpdate(changed: PropertyValues): void;
    protected firstUpdated(changed: PropertyValues): void;
    protected updated(changed: PropertyValues): void;
    /** Called by the browser when the owning `<form>` is reset. */
    formResetCallback(): void;
    /** Called by the browser to restore form state (bfcache, etc.). */
    formStateRestoreCallback(state: string): void;
    /** Called by the browser when a parent `<fieldset>` is en/disabled. */
    formDisabledCallback(isDisabled: boolean): void;
    /** Re-run constraint validation and dispatch `validity-changed`. */
    validate(): void;
    /** Check whether the current state is valid. */
    checkValidity(): boolean;
    /** Move focus to the active tree row. */
    focus(): void;
    /**
     * Push a consumer-supplied error for the in-progress graft (or clear
     * it with `null`). While set, the error is shown inline and the graft
     * commit is blocked. Call this in response to an `esp-tree-graft-input`
     * event after an async server check.
     */
    setGraftError(message: string | null): void;
    protected render(): TemplateResult;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-tree": EspalierTree;
    }
}
export {};
